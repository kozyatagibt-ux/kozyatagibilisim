---
slug: mikrotik-vlan-trunk-access-port-tagging
title: "MikroTik VLAN Trunk + Access Port Tagging — Doğru Yapılandırma"
type: cluster
pillar: 4
url: "/blog/mikrotik-vlan-trunk-access-port-tagging"
hedef_anahtar_kelime: "mikrotik vlan trunk access"
meta_description: "MikroTik'te VLAN tagging — trunk ve access port yapılandırması. Bridge VLAN filtering, PVID, tagged/untagged port farkı."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "VLAN Trunk"
product_family: "Network & Altyapı"
---

## "MikroTik'te VLAN Kafa Karıştırıcı"

Cisco / HP bilenler için MikroTik VLAN farklı. Bridge VLAN filtering model — başlangıçta confusing.

## Hızlı Çözüm (TL;DR)

Modern MikroTik (RouterOS 7.x) Bridge VLAN filtering:

```
# 1. Bridge oluştur (vlan-filtering off)
/interface bridge add name=bridge-vlans vlan-filtering=no

# 2. Port'ları ekle
/interface bridge port add bridge=bridge-vlans interface=ether2 pvid=10  (access)
/interface bridge port add bridge=bridge-vlans interface=ether3 pvid=20  (access VLAN 20)
/interface bridge port add bridge=bridge-vlans interface=ether10 frame-types=admit-only-vlan-tagged  (trunk)

# 3. VLAN'ları tanımla
/interface bridge vlan add bridge=bridge-vlans vlan-ids=10 tagged=bridge-vlans,ether10 untagged=ether2
/interface bridge vlan add bridge=bridge-vlans vlan-ids=20 tagged=bridge-vlans,ether10 untagged=ether3

# 4. VLAN interface'leri (Layer 3)
/interface vlan add name=vlan10-users interface=bridge-vlans vlan-id=10
/interface vlan add name=vlan20-servers interface=bridge-vlans vlan-id=20

/ip address add address=10.10.10.1/24 interface=vlan10-users
/ip address add address=10.10.20.1/24 interface=vlan20-servers

# 5. SON: VLAN filtering aktif et
/interface bridge set bridge-vlans vlan-filtering=yes
```

---

## Konsept

- **Access port** = Tek VLAN, untagged. Normal user PC bağlı.
- **Trunk port** = Birden fazla VLAN, tagged. Switch'ler arası veya sunucu (VLAN-aware).
- **PVID (Port VLAN ID)** = Access port'un default VLAN'ı.

## 10:00 — Senaryo

4 VLAN:
- VLAN 10 — Kullanıcılar (10.10.10.0/24)
- VLAN 20 — Sunucular (10.10.20.0/24)
- VLAN 30 — VoIP (10.10.30.0/24)
- VLAN 40 — Misafir (10.10.40.0/24)

Switch portları:
- ether2-5: Access VLAN 10 (user PC'ler)
- ether6-7: Access VLAN 20 (sunucular)
- ether8: Access VLAN 30 (IP telefon)
- ether9: Access VLAN 40 (misafir AP)
- ether10: Trunk (başka switch'e tüm VLAN'lar)

## 10:10 — Bridge Filtering Approach

**Önce bridge oluştur filtering OFF** — baştan ON olursa hiçbir trafik geçmez:

```
/interface bridge add name=bridge-main vlan-filtering=no comment="Main bridge — enable filtering after config"
```

## 10:15 — Port'ları Bridge'e Ekle

### Access Ports

```
/interface bridge port add bridge=bridge-main interface=ether2 pvid=10
/interface bridge port add bridge=bridge-main interface=ether3 pvid=10
/interface bridge port add bridge=bridge-main interface=ether4 pvid=10
/interface bridge port add bridge=bridge-main interface=ether5 pvid=10

/interface bridge port add bridge=bridge-main interface=ether6 pvid=20
/interface bridge port add bridge=bridge-main interface=ether7 pvid=20

/interface bridge port add bridge=bridge-main interface=ether8 pvid=30

/interface bridge port add bridge=bridge-main interface=ether9 pvid=40
```

`pvid=N` = Access port, untagged trafik VLAN N'e tag'lenir.

### Trunk Port

```
/interface bridge port add bridge=bridge-main interface=ether10 \
    frame-types=admit-only-vlan-tagged \
    ingress-filtering=yes
```

Trunk — sadece tagged frame kabul.

## 10:25 — VLAN Membership

Her VLAN için hangi port'lar (tagged/untagged):

```
# VLAN 10
/interface bridge vlan add bridge=bridge-main vlan-ids=10 \
    tagged=bridge-main,ether10 \
    untagged=ether2,ether3,ether4,ether5

# VLAN 20
/interface bridge vlan add bridge=bridge-main vlan-ids=20 \
    tagged=bridge-main,ether10 \
    untagged=ether6,ether7

# VLAN 30
/interface bridge vlan add bridge=bridge-main vlan-ids=30 \
    tagged=bridge-main,ether10 \
    untagged=ether8

# VLAN 40
/interface bridge vlan add bridge=bridge-main vlan-ids=40 \
    tagged=bridge-main,ether10 \
    untagged=ether9
```

**Tagged: bridge-main** kritik! Router'ın kendisi VLAN'ları "görmek" için tagged list'te olmalı (L3 için).

## 10:40 — VLAN Interface'leri (L3 Routing)

Router = inter-VLAN gateway:

```
/interface vlan add name=vlan10-users interface=bridge-main vlan-id=10
/interface vlan add name=vlan20-servers interface=bridge-main vlan-id=20
/interface vlan add name=vlan30-voip interface=bridge-main vlan-id=30
/interface vlan add name=vlan40-guest interface=bridge-main vlan-id=40

/ip address add address=10.10.10.1/24 interface=vlan10-users
/ip address add address=10.10.20.1/24 interface=vlan20-servers
/ip address add address=10.10.30.1/24 interface=vlan30-voip
/ip address add address=10.10.40.1/24 interface=vlan40-guest
```

Her VLAN'ın kendi gateway IP'si. Inter-VLAN routing otomatik (firewall filter varsa onu kontrol et).

## 10:50 — DHCP per VLAN

```
/ip pool add name=pool-users ranges=10.10.10.100-10.10.10.200
/ip dhcp-server add name=dhcp-users interface=vlan10-users address-pool=pool-users disabled=no
/ip dhcp-server network add address=10.10.10.0/24 gateway=10.10.10.1 dns-server=10.10.10.1

# Repeat for VLAN 20, 30, 40
```

## 11:00 — **KRİTİK**: VLAN Filtering Aktifleştir

Config tamam → filtering ON:
```
/interface bridge set bridge-main vlan-filtering=yes
```

Bundan **önce** yapılan config:
- Tüm port'lar PVID ile
- Tüm VLAN'lar tagged/untagged doğru

Aktifleştirmeden önce config yanlışsa **tüm trafik kesilir**. Kontrol + backup.

## 11:10 — Inter-VLAN Firewall

Default tüm VLAN birbirini görür. İzolasyon için firewall:
```
# VLAN 40 (misafir) → diğer VLAN'lara yasak
/ip firewall filter add chain=forward \
    in-interface=vlan40-guest \
    out-interface-list=!guest-allowed \
    action=drop \
    comment="Guest isolated"

/interface list add name=guest-allowed
/interface list member add list=guest-allowed interface=ether1  (WAN)
```

Misafir sadece internet'e çıkabilir, iç VLAN'lara erişmez.

## Troubleshooting

### VLAN Trafik Gitmiyor

```
/interface bridge vlan print
```

Bridge VLAN tablosunda eksik port varsa — trafik drop.

### "Admit-only-vlan-tagged" Yanlış Yerde

Trunk port'ta = OK. Access port'ta hata — untagged frame reject.

### PVID = 1 Default Problem

MikroTik default PVID=1. Eğer VLAN 1 tanımlanmadıysa trafik drop. Her access port için PVID explicit set.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik firewall filter](/blog/mikrotik-firewall-filter-connection-tracking)
- [MikroTik CAPsMAN wireless](/blog/mikrotik-capsman-wireless-controller)

---

**VLAN network design için destek?** [Teknik görüşme.](/#contact)
