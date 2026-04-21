---
slug: ad-logon-server-not-available-no-available-servers
title: "'There Are Currently No Logon Servers Available' — Kullanıcı Giriş Yapamıyor"
type: cluster
pillar: 2
url: "/blog/ad-logon-server-not-available-no-available-servers"
hedef_anahtar_kelime: "no logon servers available"
meta_description: "Windows login'inde 'There are currently no logon servers available' hatası — DC'ye ulaşılamıyor. DNS, network, site config, cached credential çözümleri."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "No Logon Servers"
product_family: "Windows Server & Active Directory"
---

## Sabah 07:45 — "Hiçbir Bilgisayar Giriş Yapamıyor"

Pazartesi sabahı çağrılar patladı:

> "Laptop'umu açtım, şifremi girdim, **'There are currently no logon servers available to service the logon request'** diyor. İç ağdayım, her şey normal görünüyor."

Aynı saat 4 farklı çalışandan aynı şikayet. BT sorumlusu Emre kritik fark etti — **bir DC kapalı değil, ağ yönlendirme** problemi vardı. Gece network ekibi yeni VLAN eklemiş, DC'lere route hiç verilmemişti.

## Hızlı Çözüm (TL;DR)

1. `nslookup corp.firma.com.tr` → DC çözümleniyor mu?
2. `nltest /dsgetdc:corp.firma.com.tr` → Hangi DC yanıt veriyor?
3. `ping dc01.corp.firma.com.tr` → Layer 3 ulaşılıyor mu?
4. Client IP hangi subnet? AD Sites'ta bu subnet kayıtlı mı?
5. Gerekirse yerel cached credential ile giriş, sonra sorunu çöz

---

## Hata Ne Anlama Geliyor?

Windows login:
1. Kullanıcı credential gönderir
2. Windows DC'ye Kerberos ile auth yapar
3. DC ulaşılamıyorsa → bu hata

"Ulaşılamıyor" 4 katmandan gelebilir:
- **DNS**: `corp.firma.com.tr` IP'si bulunamıyor
- **Network**: DC IP'sine route yok
- **AD Site**: Client subnet AD'de tanımlı değil → yanlış DC'ye yönlendiriyor
- **DC down**: Tüm DC'ler gerçekten offline

## Cached Credential ile Giriş (Geçici)

Kullanıcı daha önce bu bilgisayardan giriş yaptıysa Windows credential cache'ler (default son 10 giriş). DC ulaşılamasa bile **cached** ile girilebilir:

1. Kullanıcı adı + şifre gir
2. Windows "logon servers available değil" der
3. **OK** tıkla → alt'ta "**Logging on with cached credentials**" seçeneği çıkar
4. Devam et

Bu giriş mümkün olur ama:
- GPO'lar apply edilmez (fallback old cached GPO)
- Grup üyelik güncellemeleri gelmez
- Şifre değişikliği olmuşsa cached eski şifreyle giriliyor

## 08:00 — Emre Tanı Başlatıyor

### Adım 1: Etkilenen Makineler Ortak Noktası

Emre şikayetçilerle konuştu:
- Kat 3'te çalışan 3 kişi — etkilendi
- Kat 2'de çalışan 2 kişi — OK
- Yönetici katı — OK

**Kat 3 özel**. Network ekibi "yeni VLAN 130'u kat 3'e verdik" dedi. Cumartesi değişikliği.

### Adım 2: Client IP Kontrolü

Kat 3'teki bir laptop'a gittiler (cached ile girildi):

```cmd
ipconfig /all
```

Çıktı:
```
Ethernet adapter Ethernet:
   IPv4 Address............: 10.10.130.45
   Subnet Mask.............: 255.255.255.0
   Default Gateway.........: 10.10.130.1
   DNS Servers.............: 10.10.20.10
                             10.10.20.11
```

Client IP `10.10.130.0/24`. DNS server `10.10.20.10` (DC01).

### Adım 3: DC Erişimi Test

```cmd
ping 10.10.20.10
```

**Fail**: "Request timed out."

Ping yok. Network layer sorun.

### Adım 4: Route Kontrolü

```cmd
route print
```

Çıktı:
```
Default Gateway:           10.10.130.1
```

Default gateway üzerinden gidiyor → DC (10.10.20.10'a) router yönlendirme olmalı. Router tarafında problem.

### Adım 5: Router / L3 Switch Incele

Emre Cisco Catalyst L3 switch'ine bağlandı:

```
show ip route
```

Çıktı:
```
10.10.20.0/24 via 10.10.1.1, Ethernet0/1  ← DC subnet route
10.10.130.0/24 is directly connected       ← Yeni VLAN
```

Yeni VLAN 130 eklendi ama **routing policy**'de kat 3 subnet'inin DC subnet'ine erişimi tanımlanmamış. Access List (ACL) block ediyordu:

```
ip access-list extended VLAN130-OUT
  permit tcp any 10.10.130.0 0.0.0.255 established
  deny ip any any
```

**Yalnız "established TCP"** kabul ediyor — ilk SYN paket drop. Kat 3 kimseye yeni bağlantı kuramıyor.

### Adım 6: ACL Düzeltme

```
ip access-list extended VLAN130-OUT
  permit tcp any 10.10.130.0 0.0.0.255 established
  permit ip 10.10.130.0 0.0.0.255 10.10.20.0 0.0.0.255  ← YENİ
  permit ip 10.10.130.0 0.0.0.255 10.10.10.0 0.0.0.255  ← YENİ
  permit tcp any 10.10.130.0 0.0.0.255 eq 443
  permit tcp any 10.10.130.0 0.0.0.255 eq 80
  deny ip any any
```

Kaydet + apply.

Kat 3'teki laptop:
```cmd
ping 10.10.20.10
```

```
Reply from 10.10.20.10: bytes=32 time=2ms TTL=128
```

**Ping geliyor!**

### Adım 7: Client'a Yeni Giriş

Laptop log out → login screen:
- Kullanıcı + şifre gir
- Bu sefer normal giriş (cached değil)
- GPO'lar apply oldu
- 07:58 itibarıyla çalışmaya hazır

Kat 3'teki diğer 2 laptop da aynı şekilde düzeldi.

## Senaryo B: AD Site Missing Subnet

Başka yaygın senaryo: Kat 3'e yeni VLAN eklendi, network OK ama **AD Sites and Services'te subnet tanımlı değil**.

Client bu durumda:
- DC'ye ulaşabiliyor
- Ama "hangi site'daki DC'ye auth yapacağım?" bilgisi yok
- Uzak DC'ye gidebiliyor (yanlış site)
- Auth çok yavaş veya timeout

### Çözüm: AD Sites'ta Subnet Ekle

> 📸 **Ekran 1** — Active Directory Sites and Services (dssite.msc)  
> Sol panel: Sites expanded  
> Alt: **Subnets** (genelde boş veya minimum)  
> Mevcut subnet'ler:  
> - 10.10.10.0/24 → İstanbul-Site  
> - 10.10.20.0/24 → İstanbul-Site  
> Eksik:  
> - 10.10.130.0/24 ← yeni VLAN, site'a mapped değil

### Yeni Subnet Ekle

> 📸 **Ekran 2** — New Subnet  
> Subnets sağ tık > New Subnet  
> Prefix: 10.10.130.0/24  
> Select a site: İstanbul-Site  
> OK

Subnet artık site'a map'lendi. Client bir dahaki authentication'da doğru DC'yi bulur.

PowerShell:
```powershell
New-ADReplicationSubnet -Name "10.10.130.0/24" -Site "İstanbul-Site"
```

## Senaryo C: DNS Problemi

Client DNS DC'yi çözümleyemiyorsa bu hata gelir:

```cmd
nslookup corp.firma.com.tr
```

Eğer "Non-existent domain" veya "DNS request timed out":
- Client'ın DNS server ayarı yanlış (iç DC yerine 8.8.8.8 kullanıyor)
- DC'deki DNS service durmuş

Çözüm client tarafında:
```powershell
# DNS'i DC'lere ayarla
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 10.10.20.10,10.10.20.11
ipconfig /flushdns
```

## Senaryo D: Tüm DC'ler Gerçekten Offline

Nadir ama olabilir — veri merkezi elektriği, UPS arızası:
- Her iki DC aynı anda kapalı
- Tüm network AD'ye erişemiyor

Bu durumda:
- Fiziksel kontrol
- UPS'i aktive
- DC'leri başlat
- 2-3 dakika boot + service başlama

## Yaygın Hatalar

### Kullanıcı "İnternet bağlantım var, neden olmuyor?"

İnternet çalışıyor demek DC çalışıyor demek değil. İnternet gateway üzerinden, DC yerel subnet'te. Ayrı katmanlar.

### Laptop Domain-Joined Ama Şube Ofisinde VPN Yok

Uzaktan çalışan VPN'e girmeden login yapmaya çalışıyor. Cached credential ile girer ama:
- DC kaynaklarına erişemez
- GPO güncel değil
- Çözüm: VPN + ilk login'de GPO update

Modern alternative: **Always-On VPN** veya **Azure AD Join** — cached problem kaldırılır.

### "No logon server" Sadece Belirli Kullanıcılarda

Belirli kullanıcılar için bu hata sık:
- Kullanıcı AD'de farklı site'a assign edilmiş
- Site affinity doğru değil
- Group membership expand issue

Belirli user için:
```powershell
# Hangi DC ile auth yapıyor?
echo %LOGONSERVER%
nltest /sc_query:corp.firma.com.tr
```

## Önleyici Strateji

### 1. Change Management — Network Değişiklikleri

Her VLAN/subnet değişikliği için:
- AD Sites'a subnet ekle (ilk)
- Routing tabloları güncelle
- Firewall kurallarını ekle
- Test DC'ye ping
- Sonra kullanıcılara geçir

### 2. DC Health Monitoring

```powershell
# Her saatte
Get-ADDomainController -Filter * | ForEach-Object {
    $accessible = Test-NetConnection $_.HostName -Port 389 -InformationLevel Quiet
    if (-not $accessible) {
        Send-MailMessage -To it@firma.com.tr -Subject "DC DOWN: $($_.HostName)" ...
    }
}
```

### 3. Client-Side Fallback

Kritik laptop'lar için cache uzatma:
```
GPO: Computer Config > Administrative Templates > System > Logon > 
"Number of previous logons to cache (in case domain controller is not available)"
Değer: 25 (default 10)
```

Daha fazla kullanıcı cache'lenir, DC geçici yoksa da çalışır.

### 4. Second DC per Site

Her site'ta minimum 2 DC. Biri offline olsa diğeri auth eder.

## İlgili Rehberler

- [Trust relationship failed](/blog/trust-relationship-workstation-primary-domain-failed)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)
- [RPC server unavailable 1722](/blog/ad-rpc-server-unavailable-1722)
- [Kerberos KRB_AP_ERR_MODIFIED](/blog/kerberos-krb-ap-err-modified-event-4771)

---

**AD multi-site architecture + network segmentation + site design için uzman destek?** Kozyatağı Bilişim enterprise AD paketi. [Teknik görüşme.](/#contact)
