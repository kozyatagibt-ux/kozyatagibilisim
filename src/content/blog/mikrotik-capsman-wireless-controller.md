---
slug: mikrotik-capsman-wireless-controller
title: "MikroTik CAPsMAN Wireless Controller — Merkezi Wi-Fi Yönetimi"
type: cluster
pillar: 4
url: "/blog/mikrotik-capsman-wireless-controller"
hedef_anahtar_kelime: "mikrotik capsman wireless"
meta_description: "MikroTik CAPsMAN ile merkezi Wi-Fi controller — çoklu AP deployment, SSID broadcast, WPA2-Enterprise, misafir Wi-Fi."
kelime_sayisi: "~800"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "CAPsMAN"
product_family: "Network & Altyapı"
---

## "10 MikroTik AP, Her Birini Ayrı Ayrı Yönetmek Zor"

Büyük ofis + 10 MikroTik wAP AC AP. Her birinde SSID, şifre, radio ayarı... manuel imkansız. Çözüm: **CAPsMAN** — Controller Access Point system Manager.

## Hızlı Çözüm (TL;DR)

```
# Controller (merkez MikroTik)
/interface wireless cap set enabled=no  # kendi wireless'ı disable
/caps-man manager set enabled=yes

# Configuration template
/caps-man configuration add name=Corp-2.4G ssid=Corp-WiFi security.passphrase="..." mode=ap
/caps-man configuration add name=Corp-5G ssid=Corp-WiFi security.passphrase="..." mode=ap

# Provisioning
/caps-man provisioning add action=create-dynamic-enabled master-configuration=Corp-2.4G

# AP'lerde
/interface wireless cap set enabled=yes caps-man-addresses=10.10.10.1
```

AP'ler controller'a otomatik adopt olur, config push.

---

## CAPsMAN Nedir?

- Merkezi Wi-Fi yönetim
- SSID tek yerde tanımla → tüm AP'ler yayın
- Client roaming (AP'ler arası geçiş)
- Central monitoring
- Config change → tüm AP'ler anında

## 10:00 — Controller Kurulumu

Genelde ana router/merkez switch CAPsMAN host:
```
/caps-man manager set enabled=yes
```

## 10:05 — Configuration Profile

```
/caps-man configuration add \
    name=Corp-Staff-2.4 \
    ssid=Corp-WiFi \
    mode=ap \
    country=turkey \
    installation=indoor \
    channel.band=2ghz-b/g/n \
    channel.width=20 \
    channel.tx-power=17 \
    security.authentication-types=wpa2-psk \
    security.encryption=aes-ccm \
    security.passphrase="GucluSifre12345!"

/caps-man configuration add \
    name=Corp-Staff-5 \
    ssid=Corp-WiFi \
    mode=ap \
    country=turkey \
    channel.band=5ghz-a/n/ac \
    channel.width=20/40/80mhz-XXXX \
    security.authentication-types=wpa2-psk \
    security.encryption=aes-ccm \
    security.passphrase="GucluSifre12345!"
```

## 10:15 — Misafir SSID

Ayrı SSID + VLAN izolasyon:
```
/caps-man configuration add \
    name=Corp-Guest \
    ssid=Corp-Guest-WiFi \
    mode=ap \
    security.authentication-types="" \
    datapath.bridge=bridge-guest \
    datapath.vlan-id=40 \
    datapath.vlan-mode=use-tag
```

Misafir → VLAN 40 → captive portal (Hotspot).

## 10:25 — Provisioning Rules

Yeni AP controller'a bağlandığında hangi config?

```
/caps-man provisioning add \
    action=create-dynamic-enabled \
    hw-supported-modes=gn \
    master-configuration=Corp-Staff-2.4 \
    slave-configurations=Corp-Staff-5,Corp-Guest \
    comment="2.4GHz + 5GHz + Guest"
```

## 10:35 — AP Tarafı

Her AP'de:
```
/interface wireless cap \
    set enabled=yes \
    discovery-interfaces=ether1 \
    caps-man-addresses=10.10.10.1 \
    certificate=request
```

AP kendi discovery broadcast + controller'a bağlan.

## 10:45 — Monitoring

```
/caps-man remote-cap print
```

Çıktı:
```
 # ADDRESS     IDENTITY            VERSION   STATE
 0 10.10.10.50  AP-Floor2           7.14.3    running
 1 10.10.10.51  AP-Floor3           7.14.3    running
 2 10.10.10.52  AP-Reception        7.14.3    running
```

Connected client'lar:
```
/caps-man registration-table print
```

## Roaming

Default aktif. Client AP1'den AP2'ye hareket ettikçe otomatik geçer (AP'ler aynı SSID yaydığı için).

Advanced: **802.11r fast transition**:
```
/caps-man configuration set Corp-Staff-5 security.ft-preshared-key-enabled=yes
```

Roaming 100-300ms → VoIP call kopmaz.

## Band Steering

5GHz tercih et (2.4GHz crowded):
```
/caps-man configuration set Corp-Staff-2.4 multicast-helper=full
```

Dual-band client → 5GHz'e steer.

## Yaygın Hatalar

### AP Controller'a Bağlanmıyor

- Discovery interface doğru mu?
- Controller IP erişilebilir mi?
- AP Cap mode enabled mi?

### SSID Görünmüyor

Provisioning rule yoksa config apply olmaz. `provisioning print` kontrol.

### Roaming Yavaş

Fast transition (802.11r) enable. Ya da RSSI threshold set — kötü sinyal'de AP sticky olmasın.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [FortiAP kurulum (karşılaştırma)](/blog/fortigate-wireless-controller-fortiap-kurulum)

---

**Enterprise wireless deployment için destek?** [Teknik görüşme.](/#contact)
