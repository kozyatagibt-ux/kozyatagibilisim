---
slug: kerberos-krb-ap-err-modified-event-4771
title: "Kerberos KRB_AP_ERR_MODIFIED / Event 4771 — Kimlik Doğrulama Başarısız"
type: cluster
pillar: 2
url: "/blog/kerberos-krb-ap-err-modified-event-4771"
hedef_anahtar_kelime: "kerberos krb_ap_err_modified 4771"
meta_description: "Kerberos KRB_AP_ERR_MODIFIED hatası ve Event 4771 kayıtları. Duplicate SPN, şifre değişikliği senkronizasyon ve trust relationship sorunları çözüm rehberi."
kelime_sayisi: "~1700"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "KRB_AP_ERR_MODIFIED / Event 4771"
product_family: "Windows Server & Active Directory"
---

## Semptom

Domain Controller güvenlik log'unda sürekli:
```
Event ID: 4771
Kerberos pre-authentication failed.

Account Information:
    Security ID: S-1-5-21-...
    Account Name: user@CORP.FIRMA.COM

Service Information:
    Service Name: krbtgt/CORP.FIRMA.COM

Network Information:
    Client Address: 192.168.1.45

Failure Code: 0x17 (KRB_AP_ERR_MODIFIED)
```

Kullanıcı/bilgisayar tarafında:
- "The trust relationship between this workstation and the primary domain failed"
- "A security package specific error has occurred" 
- Uygulama bağlantısı: "Failed to authenticate"
- Random logon failures, 1-2 saatte bir değişik kullanıcı

## Hızlı Çözüm (TL;DR)

1. DC'de `Get-ADComputer` + `klist` ile bilgisayar hesabı Kerberos ticket'larını incele
2. Duplicate SPN var mı kontrol: `setspn -X`
3. Kaynak bilgisayarda `netdom resetpwd` ile makine hesabı şifresini sıfırla
4. Gerekirse bilgisayarı domain'den çıkar + yeniden join et

## Failure Code 0x17 Ne Anlama Geliyor?

`KRB_AP_ERR_MODIFIED` = "AP request ticket's signing key used for pre-authentication is wrong". Yani:

Kerberos bileti (ticket) şifreleme için bir anahtar kullanır. Bu anahtar, bilgisayarın veya kullanıcının **şifresinden türetilir**. Eğer client'taki şifre ile DC'deki şifre senkronize değilse:
- Client biletini eski şifreyle şifreler
- DC yeni şifreyle çözmeye çalışır
- Çöz(e)mez → **0x17 hatası**

## 5 Ana Sebep

### Sebep 1: Makine Hesabı Şifre Senkronizasyon Bozulması

Windows domain-joined bilgisayarlar **her 30 günde bir** makine hesabı şifresini otomatik değiştirir. Bu süreç bozulunca:
- AD'deki bilgisayar hesabının şifresi farklı
- Bilgisayardaki secrets (LSA) farklı
- Kerberos auth başarısız

Bu tipik "trust relationship failed" hatasıdır.

### Sebep 2: Duplicate SPN (Service Principal Name)

Bir SPN aynı anda iki farklı AD hesabında tanımlıysa, Kerberos "hangisine ticket vereceğini" bilemez — ya yanlış hesaba verir, sonra çözemez.

**En sık senaryo**: SQL Server instance'ı yeniden kurulmuş, eski SPN temizlenmemiş + yeni SPN eklenmiş → aynı `MSSQLSvc/sqlserver.corp.firma.com` iki hesapta.

### Sebep 3: Bilgisayar Sildi + Tekrar Oluşturuldu

AD'de bilgisayar hesabı silinip yeniden oluşturuldu. Eski bilgisayar hâlâ bağlanmaya çalışıyor (aynı hostname) — eski SID ile.

### Sebep 4: Zaman Farkı (Time Skew)

Kerberos 5 dakika tolerans var. Client 6+ dakika önde/arkadaysa fail.

### Sebep 5: Password Replikasyon Gecikmesi

Şifre on-prem bir DC'de değiştirildi, diğer DC'lere replike olmadan kullanıcı başka DC'ye authenticate olmaya çalışıyor. Geçici senaryo.

## Adım Adım Çözüm

### Adım 1: Event 4771 Detaylarını Oku

```
Event ID: 4771
Failure Code: 0x17
Client Address: 192.168.1.45
Account Name: pc-muhasebe01$
```

Notlar:
- Account name sonda `$` varsa → **bilgisayar hesabı** (makine auth)
- `$` yoksa → **kullanıcı hesabı**
- Client Address = sorun yaşayan cihazın IP'si

### Adım 2: Bilgisayar Hesabı Sorun

Eğer `pc-muhasebe01$` gibi makine adı:

**DC'de:**
```powershell
# Bilgisayar hesabı var mı?
Get-ADComputer -Identity "pc-muhasebe01"

# Son şifre değişim zamanı
Get-ADComputer "pc-muhasebe01" -Properties PasswordLastSet | 
    Select Name, PasswordLastSet
```

PasswordLastSet **90+ gün** önce ise senkronizasyon bozulmuş.

**Bilgisayar tarafında (PC-Muhasebe01):**

```powershell
# Domain'de miyim?
(Get-CimInstance Win32_ComputerSystem).PartOfDomain

# Trust durumu
Test-ComputerSecureChannel -Verbose
```

`False` dönerse trust bozuk.

**Çözüm A — Yumuşak sıfırlama:**
```powershell
# PC-Muhasebe01'de, admin PowerShell
Reset-ComputerMachinePassword -Credential (Get-Credential)
```

`Get-Credential` domain admin kullanıcısı ister.

**Çözüm B — Manuel sıfırlama:**
```powershell
netdom resetpwd /s:DC01.corp.firma.com /ud:corp\admin /pd:*
```

Hangisi çalışırsa tamam. Sonra bilgisayarı restart.

**Çözüm C — Son çare — Domain'den çıkar/yeniden kat:**
```powershell
Remove-Computer -UnjoinDomainCredential (Get-Credential) -PassThru -Verbose -Restart

# Bilgisayar workgroup'a döner
# Sonra yeniden
Add-Computer -DomainName "corp.firma.com" -Credential (Get-Credential) -Restart
```

### Adım 3: Kullanıcı Hesabı Sorunu

Kullanıcı hesabında (user@CORP.FIRMA.COM):

**DC'de:**
```powershell
Get-ADUser -Identity "user" -Properties PasswordLastSet, LockedOut, PwdLastSet
```

Eğer son şifre değişimi çok eskiyse ve şifre expire olmuşsa:
```powershell
Set-ADAccountPassword -Identity "user" -Reset -NewPassword (ConvertTo-SecureString "NewPass!2024" -AsPlainText -Force)

# Kullanıcıya sonraki girişte şifre değiştirme zorunlu yap
Set-ADUser -Identity "user" -ChangePasswordAtLogon $true
```

### Adım 4: Duplicate SPN Kontrolü

Tüm SPN'leri tara:
```powershell
setspn -X -F
```

`-X` duplicate arar, `-F` forest-wide. Çıktı örneği:
```
Checking forest DC=corp,DC=firma,DC=com
Processing entry 1
MSSQLSvc/sqlserver.corp.firma.com is registered on these accounts:
    CN=sqlservice_old,OU=Service Accounts,DC=corp,DC=firma,DC=com
    CN=sqlservice_new,OU=Service Accounts,DC=corp,DC=firma,DC=com
```

Yukarıdaki örnekte eski servis hesabından SPN'i temizle:
```powershell
setspn -D MSSQLSvc/sqlserver.corp.firma.com sqlservice_old
```

### Adım 5: Time Sync

Tüm node'ları time hierarchy'ye göre sync olduğunu doğrula:
```powershell
# PDC Emulator bul
Get-ADDomain | Select PDCEmulator

# Client'ta
w32tm /query /source
# Beklenen: PDC Emulator veya parent NTP
```

Farklı bir NTP kaynağı veriyorsa:
```powershell
w32tm /config /syncfromflags:DOMHIER /update
w32tm /resync /force
```

### Adım 6: Kerberos Ticket Cache Temizliği

Eski / bozuk ticket'lar:
```cmd
# Client'ta (kullanıcı context)
klist purge

# Admin context (makine ticket'ları)
klist -lh 0 -li 0x3e7 purge
```

Sonra kullanıcıyı logout / login.

### Adım 7: AD Replication Sağlığı

```powershell
repadmin /replsummary
```

Replication bozuksa şifre yeni DC'ye henüz gitmemiş olabilir:
```powershell
repadmin /syncall /AdeP
```

## Kurumsal Ortamda Toplu Sorun

Birden fazla kullanıcıda aynı zamanda 4771:

### Senaryo: Büyük GPO Güncellemesi Sonrası

Bir GPO ile şifre policy değişti (örn. "minimum 14 karakter"). Eski kullanıcılar şifrelerini yenilemek zorunda → Kerberos geçici flood.

**Çözüm**: Şifre policy değişikliğini kademeli uygula (kullanıcı grupları bazında), tek seferde değil.

### Senaryo: Attack — Brute Force Tentative

Dışarıdan bir saldırgan kullanıcı adları deniyor. Event 4771 patlar gibi gelir.

**Tespit**:
```powershell
# Son 24 saat 4771 event'leri — kaynak IP bazında
Get-EventLog -LogName Security -After (Get-Date).AddDays(-1) |
    Where {$_.EventID -eq 4771} |
    Group-Object -Property {($_.ReplacementStrings[6])} |
    Sort Count -Descending |
    Select Count, Name -First 10
```

Bilinmeyen veya toplu IP varsa:
- Firewall'da o IP'yi block
- Kullanıcı hesabını incele (compromise olmuş mu?)
- Incident response başlat

## Önleyici Bakım

1. **Machine password age monitor** — 90+ gün değişmemiş bilgisayarlar haftalık rapor
2. **Duplicate SPN detection** — haftalık `setspn -X` scheduled task
3. **Time sync monitoring** — PRTG/Zabbix ile
4. **AD replication health** — günlük `repadmin /replsummary` + alarm
5. **Security log retention** — 4771 event'leri SIEM'e akıtılıp 90 gün tutulsun (audit trail)

## Sık Sorulan Sorular

### Her sabah 09:15'te aynı kullanıcıda 4771 görüyorum

Scheduled task'ta eski şifre kullanan bir script olabilir. Task Scheduler > o saat çalışan task'ların credentials'ını kontrol et.

### Bilgisayar domain'de ama kullanıcı domain login yaparken 4771

Kullanıcı hesabı bozuk değil, bilgisayar makine hesabı bozuk olabilir. `Test-ComputerSecureChannel` kontrol.

### SQL Server connection'da 4771 spam

SQL servis hesabı SPN'i yanlış. `setspn -L sqlservice_account` → beklenen SPN'ler var mı kontrol.

### LAPS yüklü ortam, 4771 daha sık görülüyor

LAPS local admin şifresini 30 günde bir değiştirir. Remote script'ler eski şifre ile bağlanırsa 4771 tetikler. Scripts LAPS-aware olmalı.

---

**Active Directory Kerberos troubleshooting, SPN yönetimi ve güvenlik denetimi için uzman destek?** Kozyatağı Bilişim AD health check + remediation paketimiz. [Teknik görüşme talep edin.](/#contact)
