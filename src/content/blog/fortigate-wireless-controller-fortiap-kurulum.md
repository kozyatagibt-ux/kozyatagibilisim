---
slug: fortigate-wireless-controller-fortiap-kurulum
title: "FortiGate Wireless Controller + FortiAP — Kurumsal Wi-Fi Kurulum"
type: cluster
pillar: 4
url: "/blog/fortigate-wireless-controller-fortiap-kurulum"
hedef_anahtar_kelime: "fortigate fortiap wireless controller"
meta_description: "FortiGate Wireless Controller ile FortiAP deployment — kurumsal Wi-Fi, SSID, WPA3, captive portal, misafir network kurulumu adım adım."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "FortiAP Setup"
product_family: "Fortinet & Firewall"
---

## "FortiGate'imiz Var, Wi-Fi için Ayrı Controller Gerekiyor mu?"

Hayır. **FortiGate built-in wireless controller** var. FortiAP'leri direkt FortiGate yönetir — UniFi Controller gibi ek yazılım gerekmez.

Small-medium ofis için FortiGate + 4-10 FortiAP = tam enterprise Wi-Fi.

## Hızlı Çözüm (TL;DR)

1. FortiGate wireless controller enable
2. FortiAP'leri PoE switch'e bağla
3. Authorize (FortiGate'e adopt)
4. SSID profile oluştur
5. Security: WPA3 veya WPA2-Enterprise
6. AP'ye SSID broadcast

---

## 10:00 — Wireless Controller

System > Feature Visibility:
```
Show:
☑ Wireless Controller
☑ FortiAP
```

System > Network > WiFi Controller menü gelir.

## 10:10 — FortiAP Discovery

FortiAP'ler:
- Model: FAP-231F, FAP-431F (modern Wi-Fi 6)
- PoE+ beslemeli (switch'te PoE gerekli)
- Ethernet cable LAN switch'e

AP güç aldığında multicast ile FortiGate arar. FortiGate'te:

WiFi & Switch Controller > Managed FortiAPs:

> 📸 **Ekran 1** — Discovered APs  
> Liste:  
> - FortiAP-231F-XXXXXXXXX (unauthorized)  
> - FortiAP-231F-YYYYYYYYY (unauthorized)  
>   
> Sağ tık > **Authorize**

Authorize sonrası AP FortiGate'e register, config push.

## 10:20 — SSID Profile

WiFi Controller > SSIDs > + Create New:

> 📸 **Ekran 2** — SSID Config  
> Name: "Corp-Staff-SSID"  
> Traffic Mode: Tunnel (AP'den FortiGate'e tüm trafik — policy uygulanabilir)  
>   
> Bandwidth:  
>   - Auto: CAPWAP tunnel 5+ GHz  
>   
> IP: 10.10.50.1/24  
> DHCP: enable (10.10.50.100-200)  
>   
> SSID: Corp-WiFi  
> Security Mode: **WPA3-Enterprise** (veya WPA2-Personal küçük ofis)  
> RADIUS Server: 10.10.20.10 (AD radius — NPS)  
> Key (eğer personal): [güçlü]  
>   
> Broadcast SSID: ON (visible)  
> Schedule: always

Save.

## 10:30 — Misafir Wi-Fi (Captive Portal)

Ayrı SSID:
```
Name: "Corp-Guest-SSID"
Security: Open (captive portal'dan auth)
Captive Portal: Enable
Portal Type: Disclaimer + Email
Bandwidth: Limit 10 Mbps/user
Traffic Mode: Tunnel (isolated from corp network)
```

Misafir connects:
- SSID "Corp-Guest" see
- Connect (no password)
- Browser auto-redirect captive portal
- Accept terms + email
- 24 saat access

## 10:45 — AP SSID Assignment

WiFi Controller > FortiAP Profiles:

> 📸 **Ekran 3** — AP Profile  
> Name: "FAP-Standard-Profile"  
> Platform: FAP231F  
>   
> Radio 1 (2.4 GHz):  
>   SSID: Corp-Staff-SSID  
>   Band: 2.4 GHz 802.11n/g  
>   Channel: Auto  
>   TX Power: Auto  
>   
> Radio 2 (5 GHz):  
>   SSID: Corp-Staff-SSID, Corp-Guest-SSID (2 SSID aynı radio)  
>   Band: 5 GHz 802.11ac/ax  
>   Channels: Auto (DFS allowed)  
>   TX Power: Auto

Managed FortiAP > edit AP > Profile: FAP-Standard-Profile.

AP config 10 saniye push, SSID broadcast.

## 11:00 — Client Testi

Laptop Wi-Fi taraması:
- Corp-WiFi (signal -40 dBm, excellent)
- Corp-Guest (signal -42 dBm)

Corp-WiFi connect:
- WPA2-Enterprise: AD credentials prompt
- Success → 10.10.50.x IP alır
- Internet çalışır

## Band Steering + Roaming

Multiple AP deployment:
- 2 AP arasında kullanıcı hareket → AP değişir (roaming)
- 2.4 GHz crowded → 5 GHz'e steer (band steering)

Config otomatik, FortiAP profile'da:
```
Band Steering: Enable (prefer 5 GHz)
802.11k/v/r: Enable (fast roaming)
```

## Monitoring

Dashboard > WiFi:
- Connected clients
- Top users (by bandwidth)
- Signal strength distribution
- Rogue AP detection (unknown Wi-Fi etrafta)

## Advanced — 802.1X + Certificate Auth

WPA2-Enterprise ile certificate based auth:
- Laptop computer certificate (AD CS'den)
- User giriş password'suz bağlanır
- MFA equivalent güvenlik

Config:
```
Security: WPA2-Enterprise
Auth: 802.1X EAP-TLS
Trusted CA: Corp Firma CA
```

## İlgili Rehberler

- [FortiGate ilk kurulum](/blog/fortigate-ilk-kurulum-factory-production)
- [DHCP Server + IP reservation](/blog/fortigate-dhcp-server-ip-reservation)

---

**Enterprise Wi-Fi + FortiAP deployment için?** [Teknik görüşme.](/#contact)
