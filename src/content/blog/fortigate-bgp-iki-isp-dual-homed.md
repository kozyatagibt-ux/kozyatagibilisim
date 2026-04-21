---
slug: fortigate-bgp-iki-isp-dual-homed
title: "FortiGate BGP — İki ISP ile Dual-Homed Internet (Failover)"
type: cluster
pillar: 4
url: "/blog/fortigate-bgp-iki-isp-dual-homed"
hedef_anahtar_kelime: "fortigate bgp iki isp"
meta_description: "FortiGate BGP konfigürasyonu — iki farklı ISP ile dual-homed internet, otomatik failover, AS number, public IP block announce."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "BGP Setup"
product_family: "Fortinet & Firewall"
---

## "ISP1 Kesildi, Tüm Firma Internetsiz Kaldı"

Firma tek ISP'ye bağımlı. Bir cuma gecesi TTK kazısı fiber kesti — 8 saat internet yok. Üretim + mail + müşteri desteği tamamen durdu.

Çözüm: **Dual-Homed Internet + BGP**. İki farklı ISP'den bağlantı, biri düşünce **anında** diğeri devreye.

## Ön Koşullar

- **AS Number** (Autonomous System Number) — RIPE'den (~1000 EUR/yıl)
- **Portable IP block** (/24 minimum) — public IP'niz ISP'den bağımsız
- İki farklı ISP BGP peering kabul eder

Ana SMB'ler için alternatif: **SD-WAN** (BGP yerine, daha basit). Ama enterprise-grade BGP.

## Hızlı Çözüm (TL;DR)

```
ISP1 BGP peer (AS 1234) ↔ FortiGate (AS 65000) ↔ ISP2 BGP peer (AS 5678)
                     ↓                       ↓
              Public IP /24 announce to both
```

FortiGate kendi /24 bloğunu her iki ISP'ye announce. Biri kesilirse diğeri full route alır.

---

## 10:00 — FortiGate CLI Config

```
config router bgp
    set as 65000                       ← Kurumun private AS
    set router-id 203.0.113.1          ← FortiGate public IP
    
    config neighbor
        edit "198.51.100.1"             ← ISP1 peer IP
            set remote-as 1234           ← ISP1 AS
            set soft-reconfiguration enable
            set description "ISP1 - TurkTelekom"
        next
        edit "203.0.113.253"             ← ISP2 peer IP
            set remote-as 5678            ← ISP2 AS
            set soft-reconfiguration enable
            set description "ISP2 - TurkNet"
        next
    end
    
    config network
        edit 1
            set prefix 203.0.113.0/24    ← Kendi portable IP block
        next
    end
    
end
```

## 10:15 — BGP Sessions Check

```
get router info bgp summary
```

Çıktı:
```
BGP router identifier 203.0.113.1, local AS number 65000

Neighbor        V    AS MsgRcvd MsgSent TblVer  InQ OutQ Up/Down  State/PfxRcd
198.51.100.1    4  1234     12       10     0    0    0 00:02:14    850000    ← ISP1 UP, 850K routes alındı
203.0.113.253   4  5678      8        8     0    0    0 00:01:48    845000    ← ISP2 UP
```

Her iki BGP session **Up** — her ikisi 800K+ internet route gönderiyor. Normal global BGP table ~900K.

## Failover Test

ISP1 fiber kes (test için):
```
get router info bgp summary
```
```
198.51.100.1   4  1234     12       10     0    0    0 00:00:03    Active    ← DOWN
203.0.113.253  4  5678      8        8     0    0    0 00:05:48    845000   ← UP
```

ISP1 DOWN. Trafik otomatik **ISP2 üzerinden** geçer. **Downtime: saniyeler** (BGP convergence).

## Outbound — Path Selection

İki ISP aktifken hangisinden çıksın?

Default BGP seçim kriterleri (sırayla):
1. Highest local preference (tercih edilen çıkış)
2. Shortest AS path
3. Lowest MED
4. eBGP > iBGP
5. Lowest next-hop

### Primary + Secondary Policy

ISP1 primary olsun:
```
config router bgp
    config neighbor
        edit "198.51.100.1"
            set route-map-out "PREFER-ISP1"
        next
    end
end

config router route-map
    edit "PREFER-ISP1"
        config rule
            edit 1
                set set-local-preference 200
            next
        end
    next
end
```

Local preference 200 (ISP1) > 100 (ISP2 default) → outbound ISP1'den.

## Inbound — Traffic Engineering

Internet'ten firmaya gelen trafik — normalde ISP1 (daha kısa path). ISP1 down → ISP2 üzerinden. Manuel kontrol:

**AS Path Prepending**:
```
config router route-map
    edit "ISP2-LESS-PREFERRED"
        config rule
            edit 1
                set set-aspath "65000 65000 65000"    ← 3 kez kendi AS'i ekle
            next
        end
    next
end
```

ISP2'ye bu route-map apply et. Diğer AS'lar "path 65000 65000 65000 → uzun" görür, ISP1 tercih eder.

## IPv6 BGP

IPv4 benzeri:
```
config router bgp
    config neighbor
        edit "2001:db8:1::1"
            set remote-as 1234
            set ip6-ebgp-multihop 2
        next
    end
    
    config network6
        edit 1
            set prefix6 2001:db8::/32
        next
    end
end
```

## Yaygın Hatalar

### BGP Session "Active" State

Peer'a ulaşılamıyor. Kontrol:
```
Test-NetConnection 198.51.100.1 -Port 179
```

TCP 179 açık mı? Firewall / ISP bloğu mu?

### "eBGP peering" yerine iBGP

Aynı AS'te peering iBGP — farklı AS'te eBGP. ISP farklı AS, config doğru olmalı.

### Full Route Table Memory

Full internet table ~900K route. **RAM büyük** gerekir (4 GB+ FortiGate'te). Küçük modellerde:
- Full routes alma: `set capability-default-originate enable`
- Sadece default route: partial internet table

## BGP Community Tagging

ISP'ye özel instruction gönder:
```
config router route-map
    edit "BLACKHOLE-ATTACKER-IP"
        config rule
            edit 1
                set set-community "1234:666"    ← ISP1 blackhole community
            next
        end
    next
end
```

DDoS attacker IP'sini community ile işaretle, ISP upstream'de drop eder.

## SD-WAN Alternatifi

BGP karmaşık + AS number pahalı. SMB için **FortiGate SD-WAN** daha basit:
- Policy-based routing
- Health check + automatic failover
- AS number gereksiz
- Public IP ISP'ye bağlı

BGP = enterprise, SD-WAN = KOBİ.

## İlgili Rehberler

- [Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)
- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)

---

**Enterprise networking + BGP + SD-WAN için uzman destek?** [Teknik görüşme.](/#contact)
