---
slug: mikrotik-ospf-iki-router-dynamic-routing
title: "MikroTik OSPF — İki Router Arası Dynamic Routing Kurulumu"
type: cluster
pillar: 4
url: "/blog/mikrotik-ospf-iki-router-dynamic-routing"
hedef_anahtar_kelime: "mikrotik ospf kurulum"
meta_description: "MikroTik OSPF kurulum — iki router arası dynamic routing. Area 0 backbone, network statement, authentication, redistribute static."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "OSPF Setup"
product_family: "Network & Altyapı"
---

## "10 Şubemiz Var, Her Route'u Manuel Yazmak İstemiyoruz"

Merkez + 10 şube. Her şubede yeni subnet. Merkez'de 10 tane static route + her şubede 10 tane... Manuel yönetim imkansız.

Çözüm: **OSPF (Open Shortest Path First)** — dynamic routing. Router'lar birbirine "bende şu subnet'ler var" anons eder.

## OSPF Özellikleri

- **Link-state**: Full topology bilgisi
- **Hızlı converge**: 5-30 saniyede yeni route
- **Cost-based**: En düşük maliyet yolu
- **Area**: Büyük network'ü bölerek ölçekle
- **Authentication**: Sahte router anonsları engelleme

## Hızlı Çözüm (TL;DR)

### Her MikroTik'te

```
# Area 0 (backbone)
/routing ospf area add name=backbone area-id=0.0.0.0 instance=default

# Network statement — hangi subnet'leri ospf'e dahil et
/routing ospf network add network=10.10.0.0/16 area=backbone
/routing ospf network add network=10.20.0.0/16 area=backbone  (tunnel interface subnet)

# Instance — router-id
/routing ospf instance set default router-id=1.1.1.1 distribute-default=never
```

Sonra OSPF neighbor'lar otomatik discover, route exchange başlar.

---

## Senaryo

| | HQ | Branch1 | Branch2 |
|---|---|---|---|
| LAN | 10.10.0.0/16 | 10.20.0.0/16 | 10.30.0.0/16 |
| MikroTik IP | 10.10.0.1 | 10.20.0.1 | 10.30.0.1 |
| Router-ID | 1.1.1.1 | 2.2.2.2 | 3.3.3.3 |

Arada [IPsec tunnel](/blog/mikrotik-site-to-site-ipsec-vpn) zaten kurulu (tunnel interface).

## 10:00 — HQ Config

### Instance + Router-ID

```
/routing ospf instance set default \
    router-id=1.1.1.1 \
    redistribute-connected=as-type-1 \
    distribute-default=never
```

Router-ID unique — genelde loopback IP veya router serisinde 1.1.1.1, 2.2.2.2 pattern.

### Area 0 (Backbone)

```
/routing ospf area add \
    name=backbone \
    area-id=0.0.0.0 \
    instance=default
```

Area 0 = backbone — tüm büyük OSPF deployment'larda zorunlu.

### Network Statements

Hangi interface'ler OSPF'de aktif:

```
# HQ LAN (direkt connected)
/routing ospf network add \
    network=10.10.0.0/16 \
    area=backbone

# IPsec tunnel — örn 10.100.100.0/30 point-to-point
/routing ospf network add \
    network=10.100.100.0/30 \
    area=backbone
```

Tunnel subnet gerek — OSPF HELLO paketleri tunnel üzerinden gider.

### Interface Ayarları (opsiyonel — tuning)

```
/routing ospf interface-template add \
    interfaces=ether1 \
    network-type=broadcast \
    hello-interval=10s \
    dead-interval=40s \
    cost=10 \
    area=backbone
```

## 10:15 — Branch1 Config

Aynı pattern, **router-id farklı**:

```
/routing ospf instance set default \
    router-id=2.2.2.2 \
    redistribute-connected=as-type-1

/routing ospf area add name=backbone area-id=0.0.0.0 instance=default

/routing ospf network add network=10.20.0.0/16 area=backbone
/routing ospf network add network=10.100.100.0/30 area=backbone
```

## 10:20 — Neighbor Discovery

```
/routing ospf neighbor print
```

Çıktı:
```
 # INSTANCE  ROUTER-ID   ADDRESS        INTERFACE  STATE    STATE-CHANGES  PRIORITY  DR-ADDRESS
 0 default   2.2.2.2     10.100.100.2   ipsec-tun  Full     6              1         10.100.100.2
```

**State: Full** = tam adjacency. Route exchange başlamış.

## 10:25 — Route Kontrolü

```
/ip route print where dynamic
```

Çıktı:
```
Flags: D — dynamic, o — ospf
  DAo  10.20.0.0/16   10.100.100.2   110
```

`DAo` = Dynamic, Active, OSPF. Route otomatik geldi. Branch1 LAN'ına trafik tunnel üzerinden yönlenecek.

HQ'dan Branch1'e ping:
```
/ping 10.20.10.45
```

Success.

## 10:35 — Authentication (Güvenlik)

OSPF neighborship için PSK:

```
/routing ospf interface-template set [find] \
    auth=md5 \
    auth-key=0 \
    auth-key-value="GucluOSPFKey"
```

Sahte router OSPF anons yapamaz. Her interface'de aynı key.

## 10:45 — Redistribute Static

Bazı route'lar manuel (örn. null route blackhole). OSPF'e dahil et:

```
/routing ospf instance set default \
    redistribute-static=as-type-1 \
    redistribute-connected=as-type-1 \
    redistribute-bgp=no
```

**redistribute-static** → static route'lar OSPF'e yayılır.

## Default Route Origination

HQ internet default gateway. Branch'ler de internet için HQ üzerinden çıksın:

```
# HQ'da
/routing ospf instance set default \
    distribute-default=always-as-type-1
```

Branch otomatik `0.0.0.0/0 → HQ` route alır.

## OSPF Metric / Cost

Birden fazla link varsa en düşük cost seçilir:
```
/routing ospf interface-template set ether1 cost=10
/routing ospf interface-template set ether2 cost=20
```

Primary link ether1 (cost 10), backup ether2 (cost 20). Primary down → ether2 devreye.

## Yaygın Hatalar

### Neighbor "Init" veya "ExStart" State'te Kalıyor

- Hello interval + dead interval farklı mı?
- Auth key uyuşmuyor mu?
- MTU mismatch (tunnel MTU düşük olabilir)

Mismatch log:
```
/log print where topics~"ospf"
```

Hata mesajları güvenlik/adjacency sorunlarını söyler.

### Route Gelmedi

- Network statement eksik (remote subnet)
- Redistribute-connected aktif değil
- `passive-interface` yanlışlıkla set

### Cluster'da Election Problem

Broadcast network'te DR (Designated Router) + BDR seçimi. 2 router için nadir sorun. 3+ router'da priority ayarı:
```
/routing ospf interface-template set priority=10  (higher wins)
```

## Monitoring

```
# OSPF neighbor state
/routing ospf neighbor print

# OSPF topology (link state DB)
/routing ospf lsa print

# OSPF statistics
/routing ospf area print
```

Neighbor flapping (sürekli state değiştiriyor) → link instability. MTU, interface error, bandwidth sorun.

## Area Genişlemesi (10+ Router)

Tek area 0 büyük olur. Area ayırma:
- Area 0 = backbone (HQ + critical routers)
- Area 1 = İstanbul şubeler (5 branch)
- Area 2 = Anadolu şubeler (5 branch)

Her area'nın ayrı SPF calculation → performance iyi.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik IPsec VPN](/blog/mikrotik-site-to-site-ipsec-vpn)
- [MikroTik QoS Queue Tree](/blog/mikrotik-qos-queue-tree-bandwidth)

---

**Dynamic routing + multi-site network için destek?** [Teknik görüşme.](/#contact)
