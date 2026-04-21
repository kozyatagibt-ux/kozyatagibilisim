---
slug: mikrotik-hotspot-captive-portal-misafir-wifi
title: "MikroTik Hotspot — Captive Portal ile Misafir Wi-Fi + 5651 Log"
type: cluster
pillar: 4
url: "/blog/mikrotik-hotspot-captive-portal-misafir-wifi"
hedef_anahtar_kelime: "mikrotik hotspot captive portal"
meta_description: "MikroTik Hotspot kurulum — captive portal, T.C. kimlik doğrulama, 5651 yasası log tutma, bandwidth limit, session timeout."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "Hotspot Setup"
product_family: "Network & Altyapı"
---

## "Misafir Wi-Fi + 5651 Yasası Uyumlu Olmalı"

Kafe, otel, kurumsal lobby, hastane — misafir Wi-Fi zorunlu. 5651 sayılı kanun: **log tutma zorunluluğu**.

MikroTik Hotspot:
- Captive portal (login sayfası)
- T.C. kimlik SMS ile doğrulama (5651)
- Kullanıcı başı bandwidth limit
- Session timeout
- Log retention

## Hızlı Çözüm (TL;DR)

```
/ip hotspot setup
# Wizard: interface, IP pool, HTTPS, profile, DNS
```

Wizard tüm temel config'i yapıyor.

---

## 10:00 — Hotspot Setup Wizard

```
/ip hotspot setup
```

Prompt:
- Hotspot interface: bridge-guest (misafir VLAN)
- Local address: 192.168.50.1/24
- Masquerade network: Yes
- Address pool: 192.168.50.100-192.168.50.200
- SSL certificate: none (HTTP captive portal)
- SMTP server: 0.0.0.0
- DNS servers: 8.8.8.8
- DNS name: guest.firma.com.tr
- User name: admin (ilk kullanıcı)
- Password: ...

Finish. Default hotspot aktif.

## 10:10 — Test

Misafir cihaz → SSID "Corp-Guest" connect → otomatik login sayfası açılır:
- Username / password girer
- Internet açık

## 10:15 — 5651 Yasası — Log Retention

Türkiye'de 6 ay log tutma zorunluluğu. MikroTik log:

```
/ip hotspot set [find] log=yes
/system logging action add name=hotspot-disk target=disk disk-file-name=hotspot-log disk-file-count=100
/system logging add topics=hotspot,account action=hotspot-disk
```

Her user login, bağlantı, MAC, IP log'u `/flash/hotspot-log` altında.

Retention check:
```
/file print where name~"hotspot-log"
```

Otomatik rotation + dışa export (günlük SFTP push recommended).

## 10:25 — T.C. Kimlik ile Doğrulama (SMS)

Tam 5651 uyum için:
- Kullanıcı telefon numarası verir
- SMS ile 6 haneli kod
- Kod doğruysa internet

MikroTik native yok — **RADIUS + 3rd party SMS gateway** kullanılır:
- Mobiliz, Mobildev, NetGSM gibi TR SMS API
- RADIUS server (FreeRADIUS)
- MikroTik Hotspot → RADIUS

Basit için: **SMS hotspot plugin** hazır çözümler:
- WiFi Express (TR made)
- Cambium cnPilot
- Meraki Cloud

Küçük kafe için fazla. Otel / AVM / kurumsal için şart.

## 10:40 — Kullanıcı Profili (Bandwidth)

```
/ip hotspot user profile add \
    name=guest-profile \
    rate-limit=5M/2M \
    session-timeout=2h \
    idle-timeout=10m \
    shared-users=1

/ip hotspot user profile add \
    name=vip-profile \
    rate-limit=20M/10M \
    session-timeout=8h \
    shared-users=3
```

Guest: 5 Mbps down, 2 Mbps up, 2 saat session.
VIP: 20 Mbps, 8 saat, aile paylaşımı.

## 10:50 — Misafir Kullanıcı Ekleme

### Static User (bilinen kişi)

```
/ip hotspot user add name=misafir-muhasebe password=temp2024 profile=guest-profile
```

### Generic "Today's Guests"

Çoklu, disposable:
```
/ip hotspot user add name=guest1 password=wifi2024 profile=guest-profile
/ip hotspot user add name=guest2 password=wifi2024 profile=guest-profile
...
```

Veya **guest auto-generator** — kullanıcı portal'da form doldurur, voucher alır.

## Login Page Customization

Captive portal HTML'i MikroTik'te:
```
/file print where name~"hotspot"
```

Dosyalar:
- `hotspot/login.html`
- `hotspot/alogin.html` (after login)
- `hotspot/rlogin.html` (rejected)
- `hotspot/status.html`

FTP ile indir → düzenle (firma logosu, şartlar, link) → upload.

## Bandwidth Monitoring

```
/ip hotspot active print
```

Active user listesi + bandwidth:
```
 # SERVER    USER      ADDRESS         UPTIME       RX-RATE  TX-RATE
 0 hotspot   misafir1  192.168.50.100  00:10:05     300 Kbps 120 Kbps
 1 hotspot   misafir2  192.168.50.101  00:05:32     1.2 Mbps 400 Kbps
```

## Session Timeout + Disconnection

```
/ip hotspot user profile set guest-profile \
    session-timeout=2h \
    idle-timeout=10m \
    keepalive-timeout=2m
```

- Session 2 saat sonra zorla kes
- 10 dk hareketsiz session biter
- Bağlantı kopunca 2 dk keepalive, sonra cleanup

## Hotspot vs Simple Open Wi-Fi

| | Hotspot (Captive) | Open Wi-Fi |
|---|---|---|
| Log 5651 | ✓ var | ✗ yok (yasal risk) |
| Bandwidth limit | ✓ | Queue ile manuel |
| User auth | ✓ | ✗ |
| Session management | ✓ | ✗ |
| Kurulum zorluk | Orta | Kolay |

Kurumsal/ticari ortamda **Hotspot zorunlu** (yasal).

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik firewall filter](/blog/mikrotik-firewall-filter-connection-tracking)

---

**Misafir Wi-Fi + 5651 uyum için destek?** [Teknik görüşme.](/#contact)
