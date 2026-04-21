---
slug: fortigate-ha-active-passive-cluster
title: "FortiGate HA Active-Passive Cluster — 'Zero Downtime' Kurulumu"
type: cluster
pillar: 4
url: "/blog/fortigate-ha-active-passive-cluster"
hedef_anahtar_kelime: "fortigate ha active passive cluster"
meta_description: "FortiGate HA (High Availability) active-passive cluster kurulumu — iki FortiGate heartbeat + config sync. Session-pickup, hardware monitoring."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "HA Cluster"
product_family: "Fortinet & Firewall"
---

## "FortiGate Çökerse İnternet Gider"

Tek FortiGate = single point of failure. 8 Gbps internet bağlantısı, production trafik, sadece bir cihaz — donanım arızasında tüm firma offline.

Çözüm: **HA Cluster (active-passive)**. İki FortiGate. Biri active (trafik işler), diğeri passive (standby). Active çökerse passive saniyeler içinde devreye.

## Hızlı Çözüm (TL;DR)

### Her FortiGate'te (aynı model + firmware)
```
config system ha
    set group-name "Corp-HA-Cluster"
    set mode a-p
    set password ENC xxxxx  ← güçlü şifre
    set hbdev "port9" 100 "port10" 100    ← heartbeat interfaces
    set session-pickup enable
    set ha-mgmt-status enable
    set override disable
    set priority 200     ← master device (passive'te 100)
end
```

2 dakika içinde cluster aktif.

---

## Ön Koşullar

- **Aynı model** (ör. iki adet FortiGate 100F)
- **Aynı firmware** versiyonu (major+minor+patch)
- **Aynı lisanslar** (UTM paketleri vs.)
- Heartbeat için **2 ayrı interface** (yedek, single cable failure için)
- **Static IP**'ler mevcut config'te

## 10:00 — Device 1 (Primary)

### HA Config

```
FortiGate1 CLI:
config system ha
    set group-name "Corp-HA-Cluster"
    set group-id 10                   ← unique, ikisi aynı
    set mode a-p                       ← active-passive
    set hbdev "port9" 100 "port10" 200  ← 2 heartbeat iface (priority)
    set session-pickup enable          ← failover'da session korunur
    set session-pickup-connectionless enable
    set ha-mgmt-status enable          ← dedicated management interface
    set ha-mgmt-interfaces "port1"     ← management için
    set override disable               ← non-preempt (failover sonrası master değişmez)
    set priority 200                   ← higher = master candidate
    set password [güçlü şifre]
end
```

**priority 200** = yüksek öncelik. Normal koşulda bu master.

## 10:05 — Device 2 (Secondary)

```
FortiGate2 CLI:
config system ha
    set group-name "Corp-HA-Cluster"     ← aynı
    set group-id 10                       ← aynı
    set mode a-p
    set hbdev "port9" 100 "port10" 200
    set session-pickup enable
    set session-pickup-connectionless enable
    set ha-mgmt-status enable
    set ha-mgmt-interfaces "port1"
    set override disable
    set priority 100                      ← düşük öncelik = slave
    set password [aynı şifre]
end
```

## 10:10 — Heartbeat Cabling

Physical wiring:
- FG1 port9 ↔ direct cable ↔ FG2 port9 (primary heartbeat)
- FG1 port10 ↔ direct cable ↔ FG2 port10 (backup heartbeat)

Crossover cable veya switch — switch kullanılırsa dedicated VLAN + no STP.

## 10:15 — Cluster Formation

Her iki cihaz config aldıktan sonra otomatik:
- Heartbeat keşif
- Priority comparison → 200 > 100, **FG1 primary**
- Config sync (FG1 → FG2)
- Session sync table

```
diagnose sys ha status
```

Çıktı:
```
HA Health Status: OK
Model: FortiGate-100F
Mode: HA A-P
Group: 10
Debug: 0
Cluster Uptime: 0 days 00:02:15
Primary: FG1 (192.168.1.1)   ← active
Secondary: FG2 (192.168.1.2)  ← standby
```

## 10:20 — Config Sync Test

FG1 (primary)'de policy ekle:
```
config firewall policy
    edit 99
        set name "test-sync"
        ...
    next
end
```

Otomatik 5 saniye içinde FG2'ye sync. FG2'de:
```
show firewall policy 99
```

Aynı policy görünür ✓

## 10:25 — Failover Test

FG1'i kapat (güç kesme veya `execute reboot`):

```
diagnose sys ha status (FG2'den)
```

1-3 saniye içinde:
```
Primary: FG2   ← takeover
Secondary: FG1 (down)
```

Trafik hiç kesilmez (session-pickup sayesinde). Kullanıcılar devam eder.

FG1 geri açılınca:
- Secondary olarak cluster'a katılır (preempt disabled, master değişmez)
- Session table sync

## 10:40 — HA Management Interface

HA durumunda bireysel cihaza erişim:
```
Primary FG'ye erişim: https://192.168.1.1 (virtual)
Dedicated FG1 management: https://192.168.1.11 (ha-mgmt via port1)
Dedicated FG2 management: https://192.168.1.12
```

Her cihaza direkt log + diagnostics için.

## Session-Pickup — Kritik Ayar

Session-pickup = failover'da **mevcut TCP session'lar** korunur:
- SSH connection
- VoIP call
- Application session

`enable` olmazsa failover'da tüm session'lar drop — kullanıcı notes.

## Monitoring

### HA Heartbeat

```
diagnose sys ha checksum show
```

Her iki cihazın config checksum aynı olmalı.

### Session Sync

```
diagnose sys ha peer sessions
```

Primary'den secondary'e sync edilen session sayısı.

### Config Sync

```
diagnose sys ha checksum cluster
```

Config hash'leri eşit mi?

## Yaygın Hatalar

### "Model/firmware mismatch"

İki cihaz aynı model + firmware olmalı. Minor version farkı bile sorun.

```
get system status
```

Version hat — aynı olana kadar upgrade.

### HA Heartbeat Lost

- Cable sorunu — iki heartbeat link'i test et
- Switch STP (heartbeat VLAN'ında STP yavaş converge)
- `set hbdev` interface listesi doğru mu?

### Master Sürekli Değişiyor (Flapping)

- Heartbeat unstable
- Priority çok yakın
- Override enabled (should be disabled)

### Management Interface Erişilemiyor

HA dedicated management için:
- Her cihazın ayrı static IP
- Subnet farklı (virtual IP ile çakışmasın)

## Firmware Upgrade (HA'da)

HA'da firmware upgrade sıralı:
```
execute ha upgrade {tftp://...}
```

- Primary: trafik alıyor
- Secondary: önce upgrade (trafik yok)
- Failover → yeni primary eski secondary
- Eski primary: upgrade
- Cluster restore

**Downtime: sıfır** (doğru yapılırsa).

## Cost Analysis

FortiGate 100F HA cluster:
- 2x cihaz: 2x fiyat
- Aynı license
- Aynı donanım garanti
- Operational: manyetik downtime sıfır

Premium protection — finans, sağlık, üretim için zorunlu.

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)

---

**FortiGate HA + enterprise network high availability için uzman destek?** [Teknik görüşme.](/#contact)
