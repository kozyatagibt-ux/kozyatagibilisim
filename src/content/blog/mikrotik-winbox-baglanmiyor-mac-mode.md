---
slug: mikrotik-winbox-baglanmiyor-mac-mode
title: "MikroTik Winbox 'Could Not Connect' — MAC Mode + Recovery Seçenekleri"
type: cluster
pillar: 4
url: "/blog/mikrotik-winbox-baglanmiyor-mac-mode"
hedef_anahtar_kelime: "mikrotik winbox baglanamiyor"
meta_description: "MikroTik Winbox bağlanamıyor: 'Could not connect' hatası. MAC mode, Neighbor discovery, firmware recovery ve son çare Netinstall."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "Winbox Connect Fail"
product_family: "Network & Altyapı"
---

## "Winbox Açıyorum MikroTik Görmüyor"

İki senaryo:
- A: **Neighbors tab'ta görünüyor** ama "Connect" "could not connect"
- B: **Neighbors tab'ta hiç görünmüyor**

Her biri farklı sebep, farklı çözüm.

## Hızlı Çözüm (TL;DR)

1. Ethernet cable doğru port mu?
2. Winbox > Neighbors tab > MikroTik göründü mü?
3. Gözükmüyor → MAC address ile manuel bağlan (IP vs connect in tab altında)
4. Hâlâ yoksa → Firmware recovery (Netinstall)

---

## Senaryo A: Neighbors'ta Görünüyor, Connect Fail

Winbox MAC ile bulabiliyor ama TCP/IP'den connect olamıyor. Sebep:
- Firewall "drop" Winbox port 8291 (WAN'dan)
- IP address conflict
- Winbox service disabled

### Çözüm 1: MAC Connect

Neighbors tab'ta MikroTik line'a çift tık:
- "Connect To:" alanında MAC adresi seçili
- Username/password gir
- **Connect** butonu (not "Connect to address")

MAC mode Layer 2 — IP'den bağımsız. Firewall rule atlar.

### Çözüm 2: Winbox Service Enable

MAC mode bağlandıktan sonra:
```
/ip service print
```

Winbox service:
- Flags: X → disabled
- Enable:
```
/ip service enable winbox
/ip service set winbox port=8291 address=10.10.10.0/24
```

### Çözüm 3: Firewall Input Check

```
/ip firewall filter print
```

Input chain'de drop all varsa winbox port açık değil:
```
/ip firewall filter add chain=input action=accept src-address=10.10.10.0/24 protocol=tcp dst-port=8291 place-before=0 comment="Winbox LAN"
```

## Senaryo B: Neighbors'ta Hiç Görünmüyor

MikroTik hiç discovery response vermiyor. Daha ciddi.

### Sebep 1: Cable / Physical

- Cable başka port mu?
- Port link light yanıyor mu?
- Farklı cable dene (crossover vs straight)
- Farklı port'a tak (ether2, ether3)

### Sebep 2: Neighbor Discovery Disable

Güvenlik amaçlı bazı eski config'te neighbor discovery disable edilmiş olabilir:
```
/ip neighbor discovery-settings print
```

`discover-interface-list: none` → hiç interface discovery yapmıyor.

Bu durumda Winbox göremez. Ama **direct IP ile bağlantı** dene:
- Winbox "Connect To:" → 192.168.88.1 (veya bilinen IP)
- Port 8291
- Connect

### Sebep 3: Router Boot Stuck

Cihaz açık ama boot hata verdi:
- Power LED var mı?
- User LED yanıyor mu?
- Çok eski firmware olabilir — recovery gerek

## Senaryo C: Sıfırdan Recovery — Netinstall

Hiç cevap yok. Winbox görmüyor, console yok, SSH yok. Son çare:

### Netinstall Nedir?

MikroTik'in "fabrika sıfırla + firmware yeniden yükle" aracı:
- PXE + BOOTP ile router'ı network boot
- Firmware TFTP'den push
- Config sıfır

Windows only tool: `https://mikrotik.com/download` > Netinstall.

### Adımlar

1. **Laptop IP**: 192.168.88.100/24 statik
2. Netinstall aç:
   - "Net booting..." → **Boot Server** ayarı
   - Client IP: 192.168.88.2 (router için alacağı geçici)
   - "Boot Server enabled" tick
3. **MikroTik'i boot modunda başlat**:
   - Power off
   - Reset button **basılı tutarak** power on
   - LED değişim patterni (farklı modellere göre)
   - 10 saniye sonra bırak
   - Router Netinstall'ın boot server'ına gelir
4. Netinstall "Routers" listede MAC'i görür
5. Firmware package seç (latest stable `.npk`)
6. "Install" tıkla
7. 2-5 dakika flash
8. Router reboot
9. Factory defaults, winbox ile bağlan

⚠️ **Config tamamen kayıp**. Sonra baştan config + backup restore (varsa).

## Senaryo D: Hiç Power Yok / LED Yok

Donanım arızası:
- PSU problem (adapter test)
- Port damage (different port)
- Mainboard fail — warranty/replacement

## Önleyici

1. **Config backup** haftalık scheduled:
```
/system scheduler add name=weekly-backup interval=1w on-event="/system backup save name=backup-\$[/system clock get date]"
```

2. **SSH alternative access** (Winbox fail'se):
```
/ip service set ssh port=2222 disabled=no
```

3. **Recovery plan**: Netinstall .npk dosyaları + Winbox handy + laptop MikroTik firmware library.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik Site-to-Site IPsec](/blog/mikrotik-site-to-site-ipsec-vpn)
- [MikroTik Backup otomasyon](/blog/mikrotik-backup-otomatik-scheduled)

---

**MikroTik recovery + production management için destek?** [Teknik görüşme.](/#contact)
