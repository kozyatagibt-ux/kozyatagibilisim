---
slug: fortigate-ssl-vpn-tunnel-forticlient-mfa-kurulum
title: "FortiGate SSL-VPN Tunnel + FortiClient MFA — Uzaktan Çalışan Kurulumu"
type: cluster
pillar: 4
url: "/blog/fortigate-ssl-vpn-tunnel-forticlient-mfa-kurulum"
hedef_anahtar_kelime: "fortigate ssl vpn tunnel forticlient mfa"
meta_description: "FortiGate'te SSL-VPN Tunnel Mode + FortiClient kurulum + FortiToken MFA zorunluluğu. 25 kullanıcılı uzaktan çalışma altyapısı adım adım."
kelime_sayisi: "~1600"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "SSL-VPN Setup"
product_family: "Fortinet & Firewall"
---

## "25 Kişilik Ekip Tamamen Uzaktan Çalışacak"

Bir danışmanlık firmasının BT müdürü Ceren Kasım 2024'te yeni rol başlattı: ofis tamamen hybrid modele geçiyor, 25 kişilik ekibin 18'i haftada 3 gün evden çalışacak. BT tarafında 2 hafta içinde:

> "Evden şirket ağına güvenli erişim altyapısı. VPN kullanıcı adı + şifre yetmez — **MFA zorunlu**. 5 yönetici FortiToken cihazı, 20 kullanıcı Authenticator mobil app. Production'a bir ay."

Ceren işlemleri FortiGate 100F'te yaptı. Bu yazı tam adım adım kurulumu anlatıyor.

## Hızlı Çözüm (TL;DR)

1. User group oluştur: "SSL-VPN-Users"
2. Kullanıcılar ekle (local veya AD'den)
3. Her kullanıcıya FortiToken Mobile assign
4. SSL-VPN Portal oluştur (tunnel mode)
5. SSL-VPN Settings: interface, port, IP range, DNS
6. Firewall policy: `ssl.root → internal` (SSL-VPN interface → iç network)
7. FortiClient deployment (MSI) — end user'lara
8. Test: kullanıcı login + MFA + iç kaynak erişim

---

## Ön Hazırlık — Kullanıcı ve Grup Planlaması

Ceren 3 kullanıcı grubu tanımladı:

| Grup | Üyeler | Erişim |
|---|---|---|
| SSL-VPN-Admins | 5 BT personeli | Full iç LAN + FortiGate admin |
| SSL-VPN-Standard | 18 çalışan | Dosya sunucu + ERP + M365 |
| SSL-VPN-Contractor | 2 dış danışman | Sadece Project-X sunucu |

Granular erişim → saldırgan birine ulaşsa bile diğer kaynaklar korumalı.

## Adım 1: FortiToken Lisansı ve Kullanıcı Assignment

FortiGate out-of-box 2 adet FortiToken Mobile (free) ile gelir. Fazlası için FortiCare lisans veya FortiToken Mobile Free for 100 kullanıcı (~12.000 TL/yıl).

> 📸 **Ekran 1** — FortiGate > User & Authentication > FortiTokens  
> Sol menü: User & Authentication > FortiTokens  
> Sağ panelde token listesi (seri numarasıyla)  
> Üst butonlar: "+ Create New", "Refresh"

"+ Create New" → Mobile Token seç → kullanıcı adına assign et. Kullanıcıya bir **aktivasyon kodu** gönderilir (email veya QR).

### PowerShell alternatif yok — CLI komutları

FortiGate CLI:
```
config user fortitoken
    edit [seri_numara]
        set user "mehmet.yilmaz"
        set activation-code "[auto-generated]"
    next
end

# Send activation to user email
execute user fortitoken sendactivation mehmet.yilmaz
```

## Adım 2: User & Group Oluşturma

### Local Users (Küçük ortamda)

> 📸 **Ekran 2** — User Definition  
> Sol menü: User & Authentication > User Definition  
> "+ Create New" > User Type wizard  
> Seçenekler:  
> ● **Local User** (küçük ortam)  
> ○ Remote RADIUS User  
> ○ Remote LDAP User  
> ○ Remote TACACS+ User  

Her kullanıcı için:
- Username: `mehmet.yilmaz`
- Password: [ilk giriş için] — kullanıcı değiştirmek zorunda olacak
- Two-factor Authentication: **Enable** + FortiToken Mobile seç
- Email: `mehmet@firma.com.tr` (aktivasyon kodu için)

### LDAP Entegrasyonu (Orta/Büyük Ortam)

Ceren LDAP kullandı (AD'ye zaten kullanıcılar kayıtlı, çoğaltmak anlamsız):

> 📸 **Ekran 3** — LDAP Server config  
> Sol menü: User & Authentication > LDAP Servers  
> "+ Create New"  
> Alanlar:  
> - Name: "AD-Corp"  
> - Server IP/Name: 10.10.20.10 (DC01)  
> - Server Port: 636 (LDAPS)  
> - Common Name Identifier: sAMAccountName  
> - Distinguished Name: DC=corp,DC=firma,DC=com,DC=tr  
> - Bind Type: Regular  
> - Username: corp\ldap-reader  
> - Password: [service account password]  
> - Secure Connection: **LDAPS**  
> - Server Certificate: Fortinet_Factory (veya kurumsal CA)

Test: "Test Connectivity" butonu → yeşil onay.

### Group Oluşturma

> 📸 **Ekran 4** — User Groups  
> Sol menü: User & Authentication > User Groups  
> "+ Create New"  
> Name: "SSL-VPN-Standard"  
> Type: Firewall  
> Members:  
>   - Remote: "AD-Corp"  
>   - Selected groups: `CN=VPN-Users,OU=Groups,DC=corp...`

Bu group AD'deki "VPN-Users" security group'una mapping yapıyor. İK yeni çalışanı AD'de gruba eklediğinde otomatik VPN erişimi.

## Adım 3: SSL-VPN Portal Oluşturma

Portal = kullanıcının VPN üzerinden erişim profile.

> 📸 **Ekran 5** — SSL-VPN Portals  
> Sol menü: VPN > SSL-VPN Portals  
> Mevcut portal'lar: full-access, tunnel-access, web-access (default)  
> "+ Create New"  

Name: "Corp-Standard-Portal"

**Tunnel Mode**: Enable. (Web Mode yerine — Tunnel mode full network erişim verir).

> 📸 **Ekran 6** — Portal detail  
> Name: Corp-Standard-Portal  
> Tunnel Mode: ✓  
> Web Mode: ✗ (portal sadece client ile)  
> Enable Split Tunneling: ✓ (sadece şirket trafiği VPN'den, Facebook/Netflix internet'ten gider)  
> IPv4 Split Tunneling Routing Address: "Corp-LAN" (10.10.0.0/16 object)  
> IP Pools: "SSL-VPN-Pool" (10.10.100.0/24)  
> DNS Server: Use system DNS  
> Allow Access: Full access  

**Split Tunneling kritik**: Açık olmazsa kullanıcının **tüm internet** trafiği VPN'den geçer → FortiGate bant genişliği tükenir, Zoom/Teams yavaşlar. Split tunneling ile sadece `10.10.0.0/16` trafiği VPN'den.

## Adım 4: IP Pool ve Address Object

Portal'a vermek için subnet hazırla.

### IP Pool

```
Policy & Objects > Addresses > +Create New > IP Range
Name: SSL-VPN-Pool
Type: IP Range
Subnet/IP Range: 10.10.100.1-10.10.100.254
Interface: ssl.root
```

### LAN Object

```
Name: Corp-LAN
Type: Subnet
Subnet: 10.10.0.0/16
Interface: internal
```

## Adım 5: SSL-VPN Settings (Global)

> 📸 **Ekran 7** — SSL-VPN Settings  
> Sol menü: VPN > SSL-VPN Settings  
> Alanlar:  
> - Listen on Interface(s): **wan1**  
> - Listen on Port: **443** (default) veya 10443 (alternative)  
> - Redirect HTTP to SSL-VPN: On  
> - Restrict Access: Limit to specific hosts (önerilen)  
> - Idle Logout: 300 seconds  
> - Allow endpoint registration: Optional  
> - Server Certificate: **vpn.firma.com.tr** (Let's Encrypt)  
> - Require Client Certificate: Off  

**Port 10443** önerilir çünkü 443 standart HTTPS. Port 10443'ü public'e açarsan saldırganlar önce 443'e bakar, 10443'te SSL-VPN bulmaları daha zor (security through obscurity).

### Authentication/Portal Mapping

Aynı ekranda alt:

> 📸 **Ekran 8** — Auth/Portal Mapping  
> Tablo:  
> Users/Groups → Portal  
> "+ Create New":  
> - SSL-VPN-Admins → "Corp-Admin-Portal" (full access)  
> - SSL-VPN-Standard → "Corp-Standard-Portal"  
> - SSL-VPN-Contractor → "Contractor-Limited-Portal"  
> All Other Users/Groups → web-access (default, web-only)

## Adım 6: Firewall Policy — SSL-VPN → Internal

SSL-VPN trafik iç network'e firewall policy olmadan geçmez.

```
Policy & Objects > Firewall Policy > +Create New
```

> 📸 **Ekran 9** — Firewall Policy for SSL-VPN  
> Name: "SSL-VPN-Standard-to-LAN"  
> Incoming Interface: **ssl.root** (SSL-VPN tunnel interface)  
> Outgoing Interface: **internal**  
> Source:  
>   - Address: "SSL-VPN-Pool"  
>   - User: **SSL-VPN-Standard** (AD group)  
> Destination: **Corp-LAN**  
> Service: **ALL**  
> Action: ACCEPT  
> Log: All Sessions  

**Security Profiles** aktive et:
- AntiVirus: Default
- Web Filter: Default
- IPS: Default
- SSL Inspection: certificate-inspection (deep değil — performance için)

## Adım 7: FortiToken Mobile Kullanıcıya Deploy

### Kullanıcı Tarafı

1. Kullanıcı **"FortiToken Mobile"** uygulamasını indir (iOS App Store / Google Play)
2. Aktivasyon mail'i açılır:
```
Merhaba Mehmet,
FortiToken Mobile aktivasyonunuz için:
Kod: KGDV-ULRI-MXYZ-PQRS
Son kullanım: 2024-12-15

FortiToken Mobile uygulamasında "+" > "Enter manually" > kodu gir.
```

3. Uygulamada kod girilir → token aktive olur
4. Her 30 saniyede 6 haneli kod üretmeye başlar

## Adım 8: FortiClient MSI Deployment

Kullanıcılar VPN için **FortiClient VPN** ücretsiz kullanır (tam FortiClient EMS lisans gerekmez):

Download: `https://www.fortinet.com/support/product-downloads`

### Centralized Deployment (GPO ile)

**MSI dosyası** paylaşımlı folder'a koyulur. GPO ile computer config'e deploy:

```
Computer Configuration > Policies > Software Settings > Software Installation
> New > Package... > \\server\deploy\FortiClientVPN.msi
```

Veya Intune ile deploy.

### Manual Setup (Küçük ortam)

Kullanıcıya kurulum talimatı + VPN profile:

```
Gateway: vpn.firma.com.tr
Customize port: 10443
Username: AD username
Authentication: Save login + FortiToken prompt
```

### Pre-config XML Profile

Kullanıcılar manuel "Gateway" girmesin, pre-config XML ile dağıt:

```xml
<forticlient_configuration>
    <vpn>
        <sslvpn>
            <options>
                <remember_password>0</remember_password>
            </options>
            <connections>
                <connection>
                    <name>Firma VPN</name>
                    <server>vpn.firma.com.tr:10443</server>
                    <username></username>
                </connection>
            </connections>
        </sslvpn>
    </vpn>
</forticlient_configuration>
```

## 14:00 — Pilot Test

Ceren kendi laptop'unda test etti:

> 📸 **Ekran 10** — FortiClient VPN login  
> FortiClient ana ekran: VPN tab  
> Connection name: "Firma VPN" dropdown  
> Username: `ceren.kaya`  
> Password: [AD şifresi]  
> **Connect** butonu  

Connect tıklandı → 2 saniye sonra:

> 📸 **Ekran 11** — FortiToken MFA prompt  
> Pop-up: "FortiGate has requested Two-factor authentication token"  
> Input: 6 haneli kod  
> Ceren telefonundaki FortiToken Mobile'dan kodu gördü: **348291**  
> Kodu girdi → Submit

Yeşil "Connected" badge. VPN açık.

Test: `ping 10.10.20.50` (iç dosya sunucu) → cevap geldi.  
Test: `\\file-server\muhasebe` → erişilebilir.  
Test: `https://google.com` → doğrudan internet'ten (split tunneling çalışıyor, trafik VPN'den geçmiyor).

## Production'a Rollout

Hafta hafta kullanıcılara açıldı:

- **Hafta 1**: BT ekibi (5 kişi) — eğitim + test
- **Hafta 2**: Yönetim (5 kişi) — VIP onboarding
- **Hafta 3**: Finans + İK (8 kişi)
- **Hafta 4**: Geriye kalan 7 kişi + 2 danışman

Her kullanıcıya 15 dakikalık onboarding:
1. FortiToken Mobile kurulumu
2. Aktivasyon kodu girme
3. FortiClient ilk bağlantı
4. Split tunneling açıklama (sosyal medya VPN kullanmıyor)
5. Hangi iç kaynağa nasıl erişildiği

## Yaygın Hatalar

### "Unable to establish the VPN connection. The VPN server may be unreachable (-14)"

**Sebep 1**: Firewall dışarıdan port 10443'e erişimi bloklamış.
```bash
# Public internet'ten test
nc -vz vpn.firma.com.tr 10443
# Veya:
telnet vpn.firma.com.tr 10443
```

**Sebep 2**: Public IP DNS kaydı yanlış.
```bash
nslookup vpn.firma.com.tr
```

**Sebep 3**: FortiGate WAN interface'inde SSL-VPN bind yapılmamış.

### "Login failed. Permission denied"

- Kullanıcı AD'de VPN-Users grubunda mı?
- FortiGate'te LDAP sync doğru mu?
- Kullanıcının LDAP filtresi user group'a match ediyor mu?

### FortiToken Kodu Kabul Edilmiyor

- Kullanıcı telefonunda saat yanlış olabilir — TOTP time-based; telefon saati ±1 dk kaymış ise kod reddedilir
- Token lisansı expire olmuş olabilir
- Aktivasyon kodu 2. kez kullanılmaya çalışılıyor (sadece 1 kez aktive edilir)

### Split Tunneling Çalışmıyor, Tüm Trafik VPN'den Gidiyor

Portal config'te "Split tunneling" enabled mı? "Split Tunneling Routing Address" doğru mu (sadece 10.10.0.0/16)?

### VPN Connected Ama Ping Çalışmıyor

- Firewall policy eksik
- IP Pool (10.10.100.0/24) iç LAN (10.10.0.0/16) ile çakışıyor olabilir — farklı subnet seç
- Static route SSL-VPN pool'una ipsec interface ile set edilmiş mi

## Güvenlik Best Practices

### 1. Force Password Change İlk Girişte

Local users için:
```
User settings > "Force password change on next login"
```

### 2. Concurrent Session Limit

Bir kullanıcı aynı anda 1 device'tan bağlansın:

```
VPN > SSL-VPN Settings > Allow Access > Limit concurrent sessions: 1
```

### 3. IP Restriction

Sadece belirli coğrafyadan erişime izin:

```
Local-in Policy + Geo-IP blocking
Türkiye, Azerbaycan, KKTC whitelist → diğer ülkeler block
```

### 4. Patch Policy

SSL-VPN CVE'leri (2024 CVE-2024-21762 gibi) çok kritik. Her 30 günde bir firmware güncelle:
- Otomatik patching policy yok, manuel
- Kurumsal müşteriler için aylık bakım penceresi

### 5. Log + SIEM

Kim, ne zaman, hangi IP'den VPN'e bağlandı — SIEM'e akıt:
```
Log Settings > Syslog > Server = SIEM_IP, Format = CEF
```

## İleri Seviye — ZTNA (Zero Trust Network Access)

SSL-VPN modern alternatifi **ZTNA** — kullanıcı cihazı kontrolü + uygulama seviyesi erişim:
- FortiClient EMS + ZTNA gateway
- Cloudflare Zero Trust
- Zscaler Private Access

Klassik VPN → "cihaz ağa girdi, her şeye erişebilir"  
ZTNA → "her uygulama erişimi ayrı onay, cihaz sağlık kontrolü"

2025+ enterprise trend ZTNA yönünde.

## İlgili Rehberler

- [FortiGate Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)
- [FortiGate SSL-VPN Server Certificate](/blog/fortigate-ssl-vpn-server-certificate-hatasi)
- [FortiGate CPU yüksek kullanım](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [FortiOS CVE-2024-21762 bülteni](/blog/bulten-fortios-cve-2024-21762-ssl-vpn)

---

**FortiGate SSL-VPN, FortiClient deployment, MFA ve uzaktan çalışma altyapısı için uzman destek?** Kozyatağı Bilişim Fortinet sertifikalı ekibimizle. [Teknik görüşme talep edin.](/#contact)
