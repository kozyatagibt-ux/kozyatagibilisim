---
slug: active-directory-replication-error-8524
title: "Active Directory Replication Hatası 8524 (DsGetDcNameW) — Tespit ve Çözüm"
type: cluster
pillar: 2
url: "/blog/active-directory-replication-error-8524"
hedef_anahtar_kelime: "active directory replication error 8524"
meta_description: "Active Directory 8524 replication hatası için adım adım teşhis ve çözüm rehberi. DNS, network, SPN, Kerberos ve firewall kontrolü ile kalıcı çözüm."
kelime_sayisi: "~2500"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "8524 / DNS_ERROR_DSGETDC_FAILED"
product_family: "Windows Server & Active Directory"
---

## Semptom

Active Directory replication raporunda (repadmin /showrepl veya dcdiag) şu hata görünüyor:

```
DsReplicaGetInfo() failed with status 8524 (0x214c):
The DSA operation is unable to proceed because of a DNS lookup failure.
```

Ya da:

```
Event ID 2087 (NTDS Replication):
Active Directory Domain Services could not resolve the following DNS host name of 
the source domain controller to an IP address.
```

Replication tamamen durmuş veya kısmi çalışıyor. En sık görünen semptomlar:

- Yeni kullanıcı/bilgisayar hesapları DC'ler arasında senkronize olmuyor
- Şifre değişiklikleri "local DC"de kalıyor, diğer DC'lerde eski şifre geçerli
- GPO değişiklikleri bazı ofislerde uygulanmıyor
- DNS scavenging çalışmıyor, eski kayıtlar birikiyor

## Hızlı Çözüm (TL;DR)

1. `repadmin /showrepl` ile hangi DC'ler arası çalışmadığını tespit et
2. `nslookup` ile DNS'in kaynak DC'yi çözdüğünü doğrula
3. Network connectivity test: `Test-NetConnection <sourceDC> -Port 389`
4. `dcdiag /test:dns /v` DNS problemleri için derin tarama çalıştır
5. Bulunan DNS/network sorununu gider, `repadmin /syncall /AdeP` ile zorla senkronize et

Detaylı adımlar aşağıda. 8524 hatası **%90 DNS kaynaklı** — diğer %10 firewall, SPN veya time sync.

## Error 8524 Ne Anlama Geliyor?

Windows error code 8524 = `DNS_ERROR_DSGETDC_FAILED`. Yani bir DC, replication için başka bir DC'yi DNS üzerinden bulamıyor.

Active Directory replication için DC'lerin birbirini **hostname üzerinden** çözmesi gerekir (IP ile değil). Bu çözüm başarısız olunca replication başlamaz bile.

Problemin kök kaynakları:

| Sebep | Sıklık |
|---|---|
| DNS server yanlış yapılandırılmış (kendisini göstermiyor, dış DNS göstermiş) | %40 |
| SRV kayıtları eksik / bozuk | %25 |
| Network firewall DNS portunu (TCP 53) blokluyor | %15 |
| Stale DC records (silinmiş DC hâlâ DNS'te) | %10 |
| Time drift — Kerberos auth başarısız | %5 |
| SPN (Service Principal Name) kayıtları eksik | %5 |

## Adım Adım Çözüm

### Adım 1: Replication Durumunu Tespit Et

Kaynak DC'de veya problem olduğu düşünülen DC'de:

```powershell
repadmin /showrepl
```

Çıktıda her partner DC için durum görünür:

```
DC=corp,DC=firma,DC=com
    Default-First-Site-Name\DC02 via RPC
        DSA object GUID: 8dbf0...
        Last attempt @ 2024-03-15 08:12:34 failed, result 8524 (0x214c):
            The DSA operation is unable to proceed because of a DNS lookup failure.
        Last success @ 2024-03-12 14:30:00
```

Bu çıktıdan öğrenilenler:
- **Hangi DC'ye replicate edemiyor** (DC02)
- **Ne kadar süredir** (3 gündür)
- **Hangi protokol** (RPC — diğer alternatif SMTP çok nadir)

Tüm DC'lerin durumunu genel görmek için:

```powershell
repadmin /replsummary
```

### Adım 2: DNS Kaynağını Doğrula

8524'ün kök sebebi DNS. Önce hedef DC'nin **hostname ile çözülüp çözülmediğini** kontrol:

```powershell
# Hedef DC'nin FQDN'sini repadmin /showrepl'den alın
nslookup DC02.corp.firma.com
```

**Beklenen çıktı:**
```
Server:  DNS_server_name
Address: 192.168.1.10

Name:    DC02.corp.firma.com
Address: 192.168.1.11
```

**Başarısızsa:**
```
*** DC02.corp.firma.com: Non-existent domain
```

= DNS çözümü başarısız. Bu **kesin sebep**.

### Adım 3: DNS Server Yapılandırması Kontrol

Problem DC'de DNS client ayarları:

```powershell
Get-DnsClientServerAddress -AddressFamily IPv4
```

**Kritik kural**: Bir DC'nin **kendi DNS server adresi ilk sırada BAŞKA DC olmalı, kendisi ikinci**.

Yanlış (çok sık görünen hata):
```
DC01 DNS settings:
  1. 8.8.8.8 (Google — BU YANLIŞ)
  2. 192.168.1.10 (kendisi)
```

Doğru:
```
DC01 DNS settings:
  1. 192.168.1.11 (DC02 — başka DC)
  2. 192.168.1.10 (kendisi - loopback)
```

Düzeltme:
```powershell
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses "192.168.1.11","192.168.1.10"
ipconfig /flushdns
ipconfig /registerdns
```

**Neden**: Bir DC kendini ilk DNS olarak gösterirse ve kendi DNS service'i restart etmişse veya yeni kurulmuşsa, kendisini bulamaz — ölümcül döngü.

### Adım 4: SRV Kayıtlarını Kontrol Et

AD replication SRV kayıtları kullanır:
```
_ldap._tcp.dc._msdcs.corp.firma.com
_kerberos._tcp.dc._msdcs.corp.firma.com
_kerberos._udp.dc._msdcs.corp.firma.com
_gc._tcp.corp.firma.com
```

Kontrol:
```powershell
nslookup -type=SRV _ldap._tcp.dc._msdcs.corp.firma.com
```

**Beklenen çıktı**: Tüm DC'lerin SRV kayıtları listelenmeli. Eksik varsa:

```powershell
# Sorunlu DC'de çalıştır
ipconfig /flushdns
dcdiag /fix
net stop netlogon
net start netlogon
```

`netlogon` servisi restart olduğunda SRV kayıtlarını otomatik yeniden register eder. 30 saniye sonra:

```powershell
nslookup -type=SRV _ldap._tcp.dc._msdcs.corp.firma.com
```

Kayıtlar geldiyse adım başarılı.

### Adım 5: Stale DC Records (Eski/Silinmiş DC)

Eski bir DC domain'den çıkarılmış ama DNS'te kaydı kalmışsa replication 8524 veriyor olabilir.

```powershell
# Domain'deki geçerli DC'leri listele
Get-ADDomainController -Filter * | Select Name, IPv4Address

# DNS'teki DC kayıtlarını incele (DNS manager konsolu)
# _msdcs.corp.firma.com zone'unda her DC için kayıt olmalı
```

Geçersiz DC kayıtları DNS Manager'dan manuel silinmeli:
1. DNS Manager aç (`dnsmgmt.msc`)
2. Forward Lookup Zones > corp.firma.com > _msdcs > dc
3. Artık var olmayan DC kayıtlarını sil
4. _tcp, _sites klasörlerinde de kontrol et

### Adım 6: Network Connectivity Test

DNS çözümü başarılı ama replication hâlâ başarısızsa:

```powershell
# AD replication için gerekli portlar
Test-NetConnection DC02.corp.firma.com -Port 389    # LDAP
Test-NetConnection DC02.corp.firma.com -Port 636    # LDAPS
Test-NetConnection DC02.corp.firma.com -Port 88     # Kerberos
Test-NetConnection DC02.corp.firma.com -Port 135    # RPC endpoint mapper
Test-NetConnection DC02.corp.firma.com -Port 445    # SMB
Test-NetConnection DC02.corp.firma.com -Port 3268   # Global Catalog
```

**Özellikle 135 kritik** — RPC başlarken önce 135'ten random high port bulur. Firewall'larda 135 açık ama dynamic high portlar (49152-65535) kapalıysa RPC bağlantısı kurulmaz.

Firewall'da şunlar açık olmalı:
- TCP 389, 636, 88 (UDP da), 135, 445, 3268, 3269
- TCP 49152-65535 (dynamic RPC range — Windows Server 2008 sonrası)
- UDP 88 (Kerberos)
- UDP 389 (LDAP, bazı işlemler)

### Adım 7: Time Sync (Kerberos Kritik)

DC'ler arası time drift 5 dakikayı geçerse Kerberos auth fail eder ve replication 8524 verebilir.

```powershell
# Problem DC'de:
w32tm /query /status

# Domain time hierarchy:
w32tm /query /source

# Diğer DC ile kıyaslama:
Invoke-Command -ComputerName DC02 { Get-Date }
Get-Date
```

Fark 5 dakikayı geçiyorsa:
```powershell
# PDC Emulator'a sync yap
w32tm /resync /force
```

PDC Emulator role'ü olan DC dışarıdan (NTP server'dan) time almalı:
```powershell
# PDC Emulator'da çalıştır
w32tm /config /manualpeerlist:"time.windows.com,0x9 pool.ntp.org,0x9" /syncfromflags:manual /reliable:yes /update
Restart-Service w32time
w32tm /resync /force
```

### Adım 8: Comprehensive DCDIAG

Yukarıdakiler işe yaramadıysa tam tanılama:

```powershell
dcdiag /v /e /f:c:\dcdiag.log
```

`/e` = tüm enterprise DC'leri test eder
`/v` = verbose
`/f:` = dosyaya yaz

Log dosyasında "FAIL" veya "FATAL" içeren satırları incele. Sık hatalar:

```
Test: Connectivity — FAIL
→ Network/DNS/firewall problemi

Test: Replications — WARNING
→ Replication gecikmesi var ama çalışıyor

Test: MachineAccount — FAIL  
→ Computer account DNS kaydı bozuk

Test: NCSecDesc — FAIL
→ Partition security descriptor bozuk

Test: Kerberos — FAIL
→ SPN veya time sync
```

Her test için Microsoft dokümanında remediation adımları vardır.

### Adım 9: SPN Kontrolü

Service Principal Name bozulmuşsa Kerberos auth başarısız olur:

```powershell
setspn -L DC02$
```

**Beklenen minimum:**
```
HOST/DC02
HOST/DC02.corp.firma.com
LDAP/DC02
LDAP/DC02.corp.firma.com
GC/DC02.corp.firma.com/corp.firma.com
```

Eksik varsa:
```powershell
setspn -S "HOST/DC02.corp.firma.com" DC02$
setspn -S "LDAP/DC02.corp.firma.com" DC02$
```

### Adım 10: Son Çare — Authoritative Restore veya Demote

Bir DC tamamen bozulmuş ve düzeltilemezse:

**Seçenek A**: DC'yi demote et (domain'den çıkar) ve temiz kurulumla tekrar promote et
```powershell
Uninstall-ADDSDomainController -DemoteOperationMasterRole -ForceRemoval
```

**Seçenek B**: Metadata cleanup (DC kapalı durumdaysa)
```powershell
ntdsutil
metadata cleanup
connections
connect to server DC_HEALTHY
quit
select operation target
list domains
select domain 0
list sites
select site 0
list servers in site
select server [index_of_dead_DC]
quit
remove selected server
```

Bu sonrasında yeni bir DC promote edilebilir veya mevcutlar temiz çalışır.

### Adım 11: Replication'ı Zorla Başlat

Düzeltmelerden sonra:

```powershell
repadmin /syncall /AdeP
# A = all partitions
# d = show partition  
# e = enterprise-wide
# P = push from source
```

30 saniye bekleyin, sonra kontrol:
```powershell
repadmin /replsummary
```

Tüm DC'lerde "0" failure gösterirse replication sağlıklı.

## Önleyici Bakım — Tekrar Olmasın

**Haftalık otomatik kontrol** (monitoring sistemi):

```powershell
# Aşağıdakini bir scheduled task olarak kur
$replResult = repadmin /replsummary /bysrc /bydest /sort:delta
if ($replResult -match "error") {
    Send-MailMessage -From monitor@firma.com -To it@firma.com -Subject "AD Replication Failure" -Body $replResult
}
```

**En iyi pratikler:**

1. **DNS ayarlarını standartlaştır** — her DC, başka DC'yi 1. ve kendini 2. olarak göstersin
2. **Site/subnet mapping doğru olsun** — yanlış site'e atanan DC yanlış partner seçer
3. **PDC Emulator'da time source güvenilir** olsun (time.windows.com veya pool.ntp.org)
4. **DC'leri ayrı fiziksel/virtual host'lara koyun** — HA için minimum 2, ideal 3 DC
5. **Log monitoring** — Event ID 1311 (KCC), 1388, 1925 çift kontrol
6. **Yıllık AD health check** — dcdiag + repadmin raporu dosyalanır

## Sık Sorulan Sorular

### Sadece site'lar arası replication bozuk, site içinde çalışıyor

Intersite Topology Generator (ISTG) problemi olabilir. `dcdiag /test:intersite /v` çalıştır. Site link maliyeti veya cost/frequency yanlışsa bridgehead seçimi bozulur.

### Yeni kurduğum DC hiç replicate etmiyor

Promote sırasında DNS yanlış set edilmişse olur. Yeni DC'nin DNS ayarları:
- Primary: Mevcut bir sağlıklı DC
- Secondary: Loopback (127.0.0.1) veya boş

Promote tamamlandıktan sonra DNS primary değiştirilir (yine başka DC).

### Hata 8524 ama nslookup sağlıklı

Muhtemelen DNS cache'te eski kayıt var. `ipconfig /flushdns` çalıştır. Sonra repadmin /showrepl tekrar.

### DC Active Directory Recycle Bin aktif mi kontrol?

```powershell
Get-ADOptionalFeature -Filter {Name -eq "Recycle Bin Feature"}
```
`EnabledScopes` boş ise aktif değil. Aktif etme:
```powershell
Enable-ADOptionalFeature "Recycle Bin Feature" -Scope ForestOrConfigurationSet -Target "corp.firma.com"
```

---

**Active Directory altyapınızda replication/auth sorunları mı yaşıyorsunuz?** Kozyatağı Bilişim olarak AD health check + remediation + monitoring paketimizle kurumsal domain yönetimini üstleniyoruz. [Teknik görüşme talep edin.](/#contact)
