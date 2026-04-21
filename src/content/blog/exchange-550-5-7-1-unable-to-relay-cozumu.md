---
slug: exchange-550-5-7-1-unable-to-relay-cozumu
title: "Exchange '550 5.7.1 Unable to relay' — SMTP Relay Sorunu Çözümü"
type: cluster
pillar: 6
url: "/blog/exchange-550-5-7-1-unable-to-relay-cozumu"
hedef_anahtar_kelime: "550 5.7.1 unable to relay"
meta_description: "Exchange 'Unable to relay' 550 5.7.1 hatası. Yazıcı, monitoring aracı veya uygulamadan mail gönderirken. Receive Connector, Anonymous relay çözümü — adım adım."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "550 5.7.1"
product_family: "Microsoft 365 & Outlook"
---

## "Yazıcı Tarama Mail'i Gönderemiyor"

Perşembe öğleden sonra muhasebe müdürü BT'ye yazdı:

> "Kat yazıcımız (Konica C308) tara-mail gönderemeye başladı 2 gün önce. Ekrana hata çıkıyor: **'550 5.7.1 Unable to relay'**. Öncesinde çalışıyordu. Muhasebe evrakları tarayıp mail ile yollayamıyoruz."

BT uzmanı Selim cihaza bağlandı. Yazıcı SMTP gönderim ayarları şöyle:
- SMTP server: `mail.firma.com.tr` (on-prem Exchange)
- Port: 25
- Kimlik doğrulama: **Hayır** (anonymous)

Problem net: Exchange 2 gün önce güvenlik güncellemesi aldı, **Anonymous relay** default kapatıldı. Bu yazı Selim'in çözümü — Receive Connector yapılandırması.

## Hızlı Çözüm (TL;DR)

Exchange'de yeni bir **Receive Connector** oluşturmak gerek:
- Adı: "Anonymous Relay — Internal Devices"
- Bind: Exchange IP, Port 25 (veya 587)
- **Remote network settings**: Yazıcı IP'leri listesi (sadece bunlar)
- **Authentication**: Anonymous users
- **Permission groups**: Anonymous users + extended right

PowerShell tek adım:
```powershell
Get-ReceiveConnector "Anonymous Relay" | 
    Add-ADPermission -User "NT AUTHORITY\ANONYMOUS LOGON" `
    -ExtendedRights "Ms-Exch-SMTP-Accept-Any-Recipient"
```

---

## 550 5.7.1 Ne Anlama Geliyor?

SMTP hata kodları:
- **5.7.1** = Delivery not authorized (yetkisiz teslimat)
- **"Unable to relay"** = "Sen bu mail'i dış domain'e göndermemi istiyorsun ama sana bu izin vermedim"

SMTP server genelde şunu yapar:
- **İç alıcılar** (`@firma.com.tr` hedefli): Kabul eder
- **Dış alıcılar** (örn. `@gmail.com`): Sadece **authenticated users** için kabul eder

Yazıcı kimlik doğrulaması yapmıyor → anonymous → dış domain'e relay reddedildi.

## 3 Çözüm Yolu

Hangisi uygun senaryoya bağlı:

| Senaryo | Çözüm |
|---|---|
| Cihaz sadece iç (firma içi) mail gönderiyor | Receive Connector **anonymous internal only** |
| Cihaz dış mail de göndermeli (örn. müşteriye tara-mail) | Receive Connector **anonymous relay for specific IPs** |
| Cihaz authenticate edebilir (kullanıcı hesabı + şifre) | SMTP AUTH ile kimlik doğrulama |

Selim'in vakasında yazıcı sadece iç domain'e (firma içi) mail göndereceği için **Çözüm 1** yeterli olur. Ama muhasebe müdürü "müşteriye de gönderiyoruz bazen" deyince **Çözüm 2** seçildi.

## Çözüm 2: Anonymous Relay Receive Connector (Exchange 2019)

### Adım 1: Exchange Admin Center'ı Aç

On-prem Exchange için: `https://mail.firma.com.tr/ecp`

> 📸 **Ekran 1** — Exchange Admin Center on-prem  
> Sol menü: Recipients, Permissions, Compliance management, Organization, Protection, Mail flow, Mobile, Public folders, Unified messaging, Servers, **Hybrid**  
> **Mail flow** tıklandı → alt tabs: Rules, Delivery reports, Accepted domains, Email address policies, **Receive connectors**, Send connectors  
> **Receive connectors** seçiliyor

### Adım 2: Mevcut Connector'lar

Default Receive Connector'lar:
- **Default Frontend EXCHANGE01** — client submission (port 25, authenticated)
- **Client Frontend EXCHANGE01** — TLS authenticated client (port 587)
- **Default EXCHANGE01** — Hub transport
- **Client Proxy EXCHANGE01** — internal routing

> 📸 **Ekran 2** — Receive connectors listesi  
> Sağ panelde connector listesi (yukarıdaki 4)  
> Üst butonlar: "+ New", "🗑 Delete", "Edit"  
> **"+ New"** tıklandı

### Adım 3: Yeni Connector Oluştur

> 📸 **Ekran 3** — New Receive Connector wizard (1/5)  
> Pencere başlığı: "New Receive Connector"  
> Alanlar:  
> - Name: (input)  
> - Server: (dropdown — EXCHANGE01 seçili)  
> - Role: radio button  
>   ○ Frontend Transport  
>   ● **Hub Transport**  
>   ○ Edge Transport  
> - Type: radio  
>   ○ Custom  
>   ○ Internal  
>   ○ Client  
>   ● **Internal Relay**  
>   ○ Partner

Doldur:
- Name: **Anonymous Relay — Internal Devices**
- Role: **Hub Transport**
- Type: **Custom** (tam kontrol için)

Next → 

### Adım 4: Network Settings

> 📸 **Ekran 4** — Network Settings (2/5)  
> "Network adapter bindings" bölümü:  
> Table: Local IP addresses — ports  
> Default: `(All available IPv4)` — 25  
> **"+ Add..."** butonu

Exchange sunucunun IP'si + port 25 seçili kalsın. Aynı IP:port başka connector'da da var ama **Remote Network Settings** ayırt edecek.

Next → 

### Adım 5: Remote Network Settings (KRİTİK)

> 📸 **Ekran 5** — Remote Network Settings (3/5)  
> "Specify the remote IP addresses from which this connector accepts mail"  
> Default: `0.0.0.0-255.255.255.255` (tüm IP'ler)  
> **BU DEFAULT DEĞİŞTİRİLMELİ!**  

Default'u sil. **Sadece yazıcı ve monitoring sunucu IP'leri** ekle:
```
10.10.20.50    # Konica Minolta C308 (kat 2)
10.10.20.51    # Konica Minolta C308 (kat 3)
10.10.10.100   # PRTG monitoring server
10.10.10.101   # Backup notification server
```

**Güvenlik kritik**: Sadece listedeki IP'ler relay yapabilir. 0.0.0.0/0 bırakırsanız tüm internet sizin sunucunuzdan spam gönderir.

Finish.

### Adım 6: Anonymous Permission Ekle

Yeni connector oluştu ama şu an **authenticated kullanıcılar için**. Anonymous cihazların relay yapabilmesi için ek izin:

**PowerShell** (Exchange Management Shell):

```powershell
# 1. Anonymous User'a receive connector üzerinde permission
Get-ReceiveConnector "Anonymous Relay — Internal Devices" | 
    Add-ADPermission -User "NT AUTHORITY\ANONYMOUS LOGON" `
    -ExtendedRights "Ms-Exch-SMTP-Accept-Any-Recipient"
```

Bu komut kritik — connector'a "authenticated olmasa bile dış recipient'a mail kabul et" iznini verir.

```powershell
# 2. Doğrulama
Get-ADPermission -Identity "Anonymous Relay — Internal Devices" | 
    Where {$_.User -like "*ANONYMOUS*"} | 
    Format-Table User, ExtendedRights
```

Sonuç:
```
User                        ExtendedRights
----                        --------------
NT AUTHORITY\ANONYMOUS LOGON {Ms-Exch-SMTP-Accept-Any-Recipient, Ms-Exch-Bypass-Anti-Spam, Ms-Exch-SMTP-Accept-Authoritative-Domain-Sender}
```

### Adım 7: Authentication Settings Doğrulama

EAC'ye dön → yeni connector'ı aç:

> 📸 **Ekran 6** — Connector properties > Security tab  
> Tab: Security  
> Checkbox'lar:  
> **Authentication methods:**  
> ☐ Transport Layer Security (TLS)  
> ☐ Integrated Windows authentication  
> ☐ Basic authentication  
> ☐ Offer Basic authentication only after starting TLS  
> ☐ Exchange Server authentication  
> ☐ Externally secured  
>  
> **Permission groups:**  
> ☐ Exchange users  
> ☐ Exchange servers  
> ☐ Legacy Exchange servers  
> ☐ Partners  
> ☑ **Anonymous users** ← Bu işaretli olmalı  

Save.

## 14:30 — Test

Selim yazıcıya test gönderimi:

```bash
# Exchange server veya yazıcı subnet'inden telnet testi
telnet mail.firma.com.tr 25

# Bağlantı kurulunca
HELO printer.firma.com.tr
MAIL FROM: yazici@firma.com.tr
RCPT TO: test@gmail.com
# Beklenen: 250 2.1.5 Recipient OK (eskiden 550 5.7.1 idi)
DATA
Subject: Test

Test mail
.
QUIT
```

**250 OK** → yazıcı subnet'inden dış domain'e mail gönderim çalışıyor.

Muhasebe müdürüne mesaj:
> "Muhasebe Müdürüm, yazıcı mail sorunu çözüldü. Lütfen bir tarama yaparak müşteri mail'ine göndermeyi deneyin."

5 dakika sonra:
> "Mail gitti, teşekkürler!"

## Çözüm 3: SMTP AUTH Kullanmak (Daha Güvenli)

Anonymous relay güvenlik açısından tercih edilmez. İdeal çözüm: yazıcı kendini authenticate etsin.

Exchange / M365 tarafında **yazıcı için özel kullanıcı hesabı** aç:
- Username: `printer-kat2@firma.com.tr`
- Password: `[randomStrong32char]`
- Lisans: Genelde `Exchange Online Kiosk` (en ucuz)

Yazıcıda SMTP ayarları:
- SMTP server: `smtp.office365.com` (M365) veya `mail.firma.com.tr` (on-prem)
- Port: **587** (STARTTLS) veya 465 (SSL)
- Authentication: Yes
- Username: `printer-kat2@firma.com.tr`
- Password: [ayarlanan]

### M365 için SMTP AUTH

Microsoft 2022'den itibaren default SMTP AUTH disabled. Kullanıcı bazında etkin:

```powershell
Set-CASMailbox -Identity printer-kat2@firma.com.tr -SmtpClientAuthenticationDisabled $false
```

Veya tenant'ta genel aç:
```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

**Not**: Tenant seviyesinde açmak herkes için açar — güvenlik riski. **Sadece belirli hesaplar** açmak daha iyi.

## Çözüm 4: M365 için SMTP Relay (Direct Send)

M365 kullanıcılarının yazıcıdan mail göndermesi için 3 yöntem:

### 1. Direct Send
- Yazıcı `<tenant-name>.mail.protection.outlook.com` kullanır
- Sadece **kendi tenant alıcılarına** gönderir
- Authentication gerekmez
- İç mail için yeterli

### 2. SMTP Client Submission
- smtp.office365.com:587
- Authentication required
- Dış domain'e gönderebilir
- Kullanıcı hesabı + şifre gerekli

### 3. SMTP Relay (Connector)
- Tenant'ta custom Connector oluşturulur
- IP whitelist (public IP'niz)
- SPF kaydınızda `include:spf.protection.outlook.com` + public IP

Detaylar: `https://learn.microsoft.com/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365`

## Yaygın Hatalar

### "550 5.7.1 Client does not have permissions to send as this sender"

Yazıcıdan `user@firma.com` adına gönderim — Exchange "hesap sahibi değilsin" diyor.

Çözüm:
- `Ms-Exch-SMTP-Accept-Authoritative-Domain-Sender` permission eklenmiş mi?
- Veya FROM adresini yazıcı hesabının kendi adresi yap (`printer@firma.com.tr`)

### "550 5.7.3 STARTTLS is required"

TLS bağlantı zorunlu. Yazıcı SMTP config'inde "Use TLS/SSL" ayarı açık olmalı. Port 587 + STARTTLS.

### Test Mail Gidiyor Ama Spam'a Düşüyor

**SPF kaydı** eksik. Yazıcının gönderdiği IP public değilse Exchange `smtp.office365.com` üzerinden relay eder — SPF `include:spf.protection.outlook.com` var mı?

On-prem Exchange ise SPF şirket public IP'sini içermeli:
```
v=spf1 mx ip4:203.0.113.10 include:_spf.firma.com.tr -all
```

### Yazıcı Aynı Anda 50 Mail Gönderiyor, Block Oluyor

Default connector limit:
- Exchange 2019: 100 mesaj/dakika anonymous
- Exchange 2016: 30 mesaj/dakika

Artırmak için:
```powershell
Set-ReceiveConnector "Anonymous Relay — Internal Devices" `
    -MessageRateLimit 500 `
    -MaxInboundConnection 1000
```

## Güvenlik Önlemleri

### 1. IP Whitelist Mutlaka

Asla `0.0.0.0/0` bırakma. Sadece bilinen cihaz IP'leri. Aksi halde **open relay** — saldırganlar sizin üzerinizden spam gönderir, IP'niz blocklist'e düşer.

### 2. Rate Limit

Her IP için rate limit:
- Yazıcı: max 50 msg/min
- Monitoring: max 200 msg/min

Anomalı pattern varsa log'la + alarm.

### 3. Log Forwarding

Anonymous Receive Connector log'larını SIEM'e akıt:
```powershell
Set-ReceiveConnector "Anonymous Relay" -ProtocolLoggingLevel Verbose
```

Log path:
```
C:\Program Files\Microsoft\Exchange Server\V15\TransportRoles\Logs\FrontEnd\ProtocolLog\SmtpReceive\
```

### 4. Public IP Kontrolü

Dışarıdan açık olmadığını doğrula:
```bash
# Dış bir lokasyondan
telnet mail.firma.com.tr 25
```

Eğer dışarıdan bağlanılıyorsa — firewall'da port 25'i sadece iç VLAN'a açın.

## İlgili Rehberler

- [Microsoft 365 Send As permission](/blog/m365-send-as-permission-verme-adim-adim)
- [Shared Mailbox oluşturma](/blog/m365-shared-mailbox-olusturma-lisanssiz)
- [Exchange 2019 CU14 transport queue bülteni](/blog/bulten-exchange-2019-cu14-transport-queue)

---

**Exchange on-prem + Microsoft 365 hybrid mail flow tasarımı ve troubleshooting için uzman destek?** Kozyatağı Bilişim sertifikalı ekibimizle. [Teknik görüşme talep edin.](/#contact)
