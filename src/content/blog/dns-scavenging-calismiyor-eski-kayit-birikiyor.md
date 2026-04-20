---
slug: dns-scavenging-calismiyor-eski-kayit-birikiyor
title: "DNS Scavenging Çalışmıyor — Eski Kayıtlar Silinmiyor (Tam Yapılandırma)"
type: cluster
pillar: 4
url: "/blog/dns-scavenging-calismiyor-eski-kayit-birikiyor"
hedef_anahtar_kelime: "dns scavenging çalışmıyor"
meta_description: "Windows Server DNS scavenging neden çalışmıyor? Aging, refresh interval, timestamp, zone delegation ve domain controller seviyesinde yapılandırma rehberi."
kelime_sayisi: "~1900"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "DNS Stale Records"
product_family: "Windows Server & Active Directory"
---

## Semptom

- Artık ağda olmayan eski laptop'ların DNS kayıtları hâlâ duruyor (nslookup ile çözülüyor)
- Yıllar önce ayrılmış çalışan bilgisayarları DNS'te görünüyor
- "Ayrıldı ama lokasyonu değişti, yeni lokasyonda yeni kayıt açıldı, eski kalmış" — duplicate A kayıtları
- DNS zone'da 1000+ eski kayıt var, 200 canlı host olmasına rağmen
- "Scavenging enabled" gözüküyor ama **hiçbir şey silinmiyor**
- DHCP'den farklı host'a verilen IP, eski hostname ile karışıyor

Scavenging otomatik olmaması çok yaygın bir AD konfigürasyon hatası. Genelde kimse fark etmez — bir gün DNS çözüm sorunu çıkar, incelemede "stale records" orman görünür.

## Hızlı Çözüm (TL;DR)

1. **Tek bir DC'de scavenging etkin olmalı** — genelde PDC Emulator
2. **Zone'da aging aktif olmalı** (No Refresh + Refresh intervals set)
3. **Kayıtların dynamically registered** olması gerekli (timestamp'ı olmalı)
4. Manuel test: `dnscmd DC_NAME /StartScavenging`
5. Beklenen: 5-10 dakika içinde eski kayıtlar silinir

## Scavenging Nedir?

Windows DNS otomatik olarak eski (stale) dynamic record'ları siler. Bu işlem **scavenging**. Yapısı:

| Terim | Anlam |
|---|---|
| **No-Refresh Interval** | Kaydın timestamp'ı ilk yazıldıktan sonra **yenilenmediği** dönem (7 gün default) |
| **Refresh Interval** | No-refresh sonrası, kaydın **silinmeden önce yenilenmesi gereken** pencere (7 gün default) |
| **Scavenging Period** | DNS server'ın stale kayıtları kontrol ettiği sıklık (7 gün default) |
| **Timestamp** | Kaydın en son güncellendiği tarih (dynamic kayıtlar için) |

Toplam silinme süresi default: **No-Refresh (7) + Refresh (7) = 14 gün** inactive olan kayıt silinir.

## Neden Çalışmıyor?

### Sebep 1: Scavenging Server Seviyesinde Etkin Değil

DNS Manager → Server > Properties > Advanced > Enable automatic scavenging of stale records. Eğer unchecked ise hiçbir zaman çalışmaz.

### Sebep 2: Zone Seviyesinde Aging Açık Değil

Zone bazında da "Aging" aktif olmalı. Sadece server seviye yetmez.

### Sebep 3: Manuel Oluşturulmuş Kayıtlar (Static Records)

Manuel eklenen record'larda **timestamp yok** — scavenger bunları "static" sayar ve dokunmaz. Bu doğru davranış (server, gateway gibi sabit kayıtlar silinmemeli) ama eğer bir kayıt yanlışlıkla static olarak görünüyorsa (dynamic olarak oluşmuş ama static'e dönüşmüş) scavenge olmaz.

### Sebep 4: Birden Fazla DC Scavenge Yapıyor — Çakışma

Tüm DC'lerde scavenging aktifse çakışma olabilir. Microsoft tek bir DC'de aktif olmasını önerir.

### Sebep 5: Zone AD-Integrated Değil

Standard Primary zone'larda replication farklı işler. AD-Integrated zone'larda multi-master replikasyon vardır ve scavenging buna göre davranır.

### Sebep 6: Aging/Scavenging Values Kısa Değil

Default 7+7 = 14 gün. Eğer hostlar her gün aynı IP'den register oluyorsa ve DNS'e yazıyorsa zaten silinmiyor. "Hiç tekrar yazılmayan" kayıtlar silinir.

## Adım Adım Çözüm

### Adım 1: Server Seviyesinde Scavenging Etkin mi?

DNS Manager açın (`dnsmgmt.msc`) → DNS Server > Properties > Advanced tab:

✅ **Enable automatic scavenging of stale records** — CHECKED
✅ **Scavenging Period**: 7 days (default yeterli)

PowerShell ile kontrol:
```powershell
Get-DnsServerScavenging
```

Çıktı:
```
NoRefreshInterval : 7.00:00:00
RefreshInterval   : 7.00:00:00
ScavengingInterval: 7.00:00:00
ScavengingState   : True  # Bu kritik
LastScavengeTime  : 26.03.2026 08:00:00
```

`ScavengingState: False` ise:
```powershell
Set-DnsServerScavenging -ScavengingState $true -ScavengingInterval 7.00:00:00
```

### Adım 2: Zone Seviyesinde Aging

Zone > Properties → General tab → **Aging...** butonu:

✅ **Scavenge stale resource records** — CHECKED
- No-refresh interval: 7 days
- Refresh interval: 7 days

PowerShell:
```powershell
Get-DnsServerZoneAging -Name "corp.firma.com"
```

Çıktı:
```
ZoneName         : corp.firma.com
AgingEnabled     : True
RefreshInterval  : 7.00:00:00
NoRefreshInterval: 7.00:00:00
```

Etkin değilse:
```powershell
Set-DnsServerZoneAging -Name "corp.firma.com" -Aging $true `
    -NoRefreshInterval 7.00:00:00 `
    -RefreshInterval 7.00:00:00
```

### Adım 3: Kayıtların Timestamp'ını İncele

DNS Manager'da herhangi bir A kaydına çift tık → "Properties":
- **Timestamp** field'ı: "Static" veya tarih?

Tarih varsa dinamik kayıt, scavenger silebilir.  
"Static" veya boş ise statik kayıt, silinmez.

PowerShell ile inceleme:
```powershell
Get-DnsServerResourceRecord -ZoneName "corp.firma.com" -RRType A | 
    Select HostName, RecordData, Timestamp, TimeToLive
```

`Timestamp` sütunu boş olan kayıtlar static'tir.

### Adım 4: Static Kayıtları Dynamic'e Çevir (İsteğe Bağlı)

Eski bir DC veya printer kaydı manuel oluşturulmuş ama şimdi dinamik olmalı:

```powershell
# Kaydı sil
Remove-DnsServerResourceRecord -ZoneName "corp.firma.com" `
    -Name "old-server" -RRType A -Force

# Host, DNS dynamic update yapıyorsa yeni timestamp'li kayıt yazar
```

Ya da client tarafından:
```cmd
# Host'ta
ipconfig /registerdns
```

Bu host'u kendi kaydını yeniletir, timestamp atanır.

### Adım 5: Manuel Scavenging Başlat

Script değil sadece bir defalık test:
```cmd
dnscmd DC_NAME /StartScavenging
```

Veya DNS Manager'da sağ tık DNS server > "Scavenge Stale Resource Records". Onay iste → OK.

Sonra 5-10 dakika sonra zone kontrol — stale kayıtlar kaybolmalı.

### Adım 6: Stale Kayıtları Raporla (Temizlik Öncesi)

Silmeden önce görmek için:
```powershell
$staleDate = (Get-Date).AddDays(-14)
Get-DnsServerResourceRecord -ZoneName "corp.firma.com" -RRType A |
    Where {$_.Timestamp -ne $null -and $_.Timestamp -lt $staleDate} |
    Select HostName, Timestamp |
    Export-Csv C:\stale_dns.csv -NoTypeInformation
```

14 günden eski kayıtları CSV'ye çıkarır. Bu listede "yanlışlıkla static olması gereken ama yanlışlıkla dynamic kayıt" var mı incele.

### Adım 7: PTR (Reverse) Zone Aging

Forward zone için aging enable ettiyseniz reverse zone için de:
```powershell
Set-DnsServerZoneAging -Name "1.168.192.in-addr.arpa" -Aging $true
```

Yoksa PTR kayıtları birikir.

### Adım 8: DHCP Entegrasyonu

DHCP server DNS kayıtlarını client adına güncelliyor olabilir. Bu entegrasyon doğru set değilse kayıt timestamp'leri yanlış gider.

DHCP Manager > IPv4 > Properties > DNS tab:
- "Enable DNS dynamic updates" — Always dynamically update
- "Discard A and PTR records when lease is deleted" — CHECKED (bu kritik!)

Bu ayarla DHCP lease expire olunca DHCP kayıtları siler — scavenging beklemeye gerek kalmaz.

```powershell
Set-DhcpServerv4DnsSetting -DynamicUpdates Always `
    -DeleteDnsRRonLeaseExpiry $true
```

### Adım 9: Multi-DC'de Sadece Bir Sunucuda

Best practice: **tek DC** scavenge yapmalı (PDC Emulator genelde).

Diğer DC'lerde:
```powershell
# Diğer DC'lerde scavenging disable
Set-DnsServerScavenging -ScavengingState $false
```

PDC Emulator'da:
```powershell
Set-DnsServerScavenging -ScavengingState $true
```

Hangi DC PDC Emulator?
```powershell
Get-ADDomain | Select PDCEmulator
```

### Adım 10: LastScavengeTime İzleme

Scavenging'in gerçekten çalışıp çalışmadığını periyodik kontrol:
```powershell
Get-DnsServerScavenging | Select LastScavengeTime
```

`LastScavengeTime` **son 7 gün içinde** olmalı. Değilse scavenging aslında tetiklemiyor demek.

## Dikkat Noktaları

### Yanlışlıkla Kritik Kayıt Silinir mi?

Scavenging **sadece timestamp'li dinamik kayıtları** siler. Static (manuel) kayıtlar dokunulmaz. Yine de:
- Domain controller kayıtları (SRV records) — genelde netlogon her 1 saatte bir register ettiği için silinmez
- Static DNS kayıtları (mail server, gateway) — zaten timestamp'siz, güvende

Ama yine de **ilk çalıştırmadan önce zone backup**:
```powershell
Export-DnsServerZone -Name "corp.firma.com" -FileName "backup-corp-2026-04-21.dns"
```

### Çok Agresif Aging = Mail Problemi

Kısa interval (1 gün + 1 gün) set edilirse laptop'unu 3 gün açmayan kullanıcının hostname'i silinebilir. Sonra açtığında DNS yeniden register etmesi gerekir — birkaç dakika gecikme.

Default 7+7 = 14 gün iyi dengeyi verir. Çok özel senaryolarda farklı set edilebilir.

### Scavenging Aktifken Manuel Yönetim

Manuel olarak static A kaydı eklersen timestamp olmaz — scavenger dokunmaz. Ama dinamik olarak açılmış kaydın timestamp'ını **silmek** (yani static'e çevirmek) istemezsen UI'dan "Delete this record when it becomes stale" checkbox'ı işaretlenmeli.

## Sık Sorulan Sorular

### LastScavengeTime hiç güncellenmemiş

ScavengingState true olsa bile tetiklenmiyor. DNS servisini restart deneyin. `Restart-Service DNS`. Sonra `Start-DnsServerScavenging` ile manuel tetikle. Hâlâ olmuyorsa zone aging ayarı olabilir.

### Aging disable edildi, scavenging neden hâlâ çalışıyor?

İki ayar farklı: Scavenging (server level) + Aging (zone level). Server'da aktif, zone'da değilse o zone'da scavenge olmaz. Diğer zone'larda (başka zone aging aktifse) olabilir.

### 10000+ stale record var, temizlik nasıl?

Kademeli:
1. Önce CSV'ye tüm stale kayıtları çıkar
2. Review et — yanlışlıkla silinmemesi gereken var mı?
3. Aging'i aktif et ama sadece 1 zone'da test et
4. Sonuç iyiyse tüm zone'lara uygula

Hepsini aynı gün silmek yerine günde 1000 silinmesi daha yumuşak geçiş.

### Scavenging + DNSSEC

DNSSEC aktifse zone değişiklikleri re-sign gerektirir. Scavenging çok sık olursa (günlük) DNSSEC sürekli re-sign yapar, performans etkilenir. Default 7 günlük interval sorun değil.

### Reverse zone (PTR) kayıtları dolup taşıyor

PTR için de zone-level aging. Scavenger aynı algoritmayla çalışır. DHCP'nin "discard PTR on lease expiry" ayarı da kritik.

---

**Kurumsal DNS / AD altyapı yönetimi ve optimizasyonu için uzman destek?** Kozyatağı Bilişim AD/DNS health check, migration, monitoring paketimizle hizmet sunuyoruz. [Teknik görüşme talep edin.](/#contact)
