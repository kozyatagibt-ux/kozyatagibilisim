---
slug: mikrotik-mangle-policy-routing-coklu-isp
title: "MikroTik Mangle + Policy Routing — İki ISP ile Trafik Yönlendirme"
type: cluster
pillar: 4
url: "/blog/mikrotik-mangle-policy-routing-coklu-isp"
hedef_anahtar_kelime: "mikrotik mangle policy routing"
meta_description: "MikroTik Mangle ile kaynak/port bazlı trafik yönlendirme. İki ISP arasında akıllı dağıtım, routing-mark, PCC load balance."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "Policy Routing"
product_family: "Network & Altyapı"
---

## "İki ISP Var, Farklı Trafik Farklı Hatlardan Gitsin"

- ISP1: TurkTelekom Fiber (1 Gbps, stabil ama pahalı)
- ISP2: Turkcell Superonline (500 Mbps, ucuz)

İstek:
- **Zoom / Teams**: TurkTelekom (düşük latency)
- **Backup / YouTube**: Superonline (yeterli)
- **Default**: Failover

Çözüm: **Mangle + Policy Routing**.

## Hızlı Çözüm (TL;DR)

```
# 1. Routing tables — iki farklı
/routing table add name=via-isp1 fib
/routing table add name=via-isp2 fib

# 2. Default route her table için
/ip route add dst-address=0.0.0.0/0 gateway=ether1-isp1 routing-table=via-isp1
/ip route add dst-address=0.0.0.0/0 gateway=ether2-isp2 routing-table=via-isp2

# 3. Mangle — trafik işaretle
/ip firewall mangle add chain=prerouting src-address=10.10.10.0/24 protocol=tcp dst-port=443 action=mark-routing new-routing-mark=via-isp1

# 4. Route — işaretli trafik ISP1'den
```

---

## Senaryo

- LAN: 10.10.10.0/24
- ISP1 (ether1): 203.0.113.10/24, gateway 203.0.113.1
- ISP2 (ether2): 198.51.100.10/24, gateway 198.51.100.1

## 10:00 — Routing Tables

```
/routing table add name=via-isp1 fib
/routing table add name=via-isp2 fib
```

### Default Route her Table İçin

```
# Main table (fallback)
/ip route add dst-address=0.0.0.0/0 gateway=203.0.113.1 distance=1 comment="Primary via ISP1"

# Via ISP1 routing table
/ip route add dst-address=0.0.0.0/0 gateway=203.0.113.1 routing-table=via-isp1

# Via ISP2 routing table
/ip route add dst-address=0.0.0.0/0 gateway=198.51.100.1 routing-table=via-isp2
```

## 10:10 — Mangle Rules (Trafik Classification)

### Zoom / Teams → ISP1

Office 365 / Teams IP range'leri (Microsoft publish):

```
# Teams/Zoom UDP ports
/ip firewall mangle add chain=prerouting \
    protocol=udp dst-port=3478-3481,50000-50059 \
    action=mark-routing \
    new-routing-mark=via-isp1 \
    passthrough=no \
    comment="Teams/Zoom → ISP1"

# Teams HTTPS (resim/ses)
/ip firewall mangle add chain=prerouting \
    dst-address-list=TeamsServers \
    protocol=tcp dst-port=443 \
    action=mark-routing \
    new-routing-mark=via-isp1 \
    passthrough=no

# Address list (Microsoft Teams IP'leri)
/ip firewall address-list add address=52.113.0.0/16 list=TeamsServers
/ip firewall address-list add address=52.114.0.0/16 list=TeamsServers
# ... Microsoft Teams IP list (aşağıda)
```

Microsoft'un Teams IP list: https://docs.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges

### Backup / File Transfer → ISP2

```
# Büyük download/upload
/ip firewall mangle add chain=prerouting \
    protocol=tcp dst-port=443 \
    dst-address-list=BackupServers \
    action=mark-routing \
    new-routing-mark=via-isp2 \
    passthrough=no

/ip firewall address-list add address=backblaze.com list=BackupServers
/ip firewall address-list add address=azure.microsoft.com list=BackupServers
```

### YouTube / Streaming → ISP2

```
/ip firewall layer7-protocol add name=youtube regexp="^.+(youtube).*$"

/ip firewall mangle add chain=prerouting \
    layer7-protocol=youtube \
    action=mark-routing \
    new-routing-mark=via-isp2 \
    passthrough=no
```

## 10:30 — PCC Load Balance (ISP1 + ISP2 Equal)

Her iki ISP birlikte kullanılsın, %50/%50 (veya ağırlıklı):

```
# PCC = Per Connection Classifier
/ip firewall mangle add chain=prerouting \
    src-address=10.10.10.0/24 \
    dst-address-type=!local \
    per-connection-classifier=both-addresses:2/0 \
    action=mark-routing \
    new-routing-mark=via-isp1 \
    passthrough=no

/ip firewall mangle add chain=prerouting \
    src-address=10.10.10.0/24 \
    dst-address-type=!local \
    per-connection-classifier=both-addresses:2/1 \
    action=mark-routing \
    new-routing-mark=via-isp2 \
    passthrough=no
```

Her yeni TCP connection 2'ye modulo — %50 ISP1, %50 ISP2. Session sticky (connection tracking).

### 70/30 Ağırlıklı

ISP1 daha güçlüyse:
```
# 10'da 7 ISP1
per-connection-classifier=both-addresses:10/0
per-connection-classifier=both-addresses:10/1
per-connection-classifier=both-addresses:10/2
per-connection-classifier=both-addresses:10/3
per-connection-classifier=both-addresses:10/4
per-connection-classifier=both-addresses:10/5
per-connection-classifier=both-addresses:10/6  → ISP1

# 10'da 3 ISP2
per-connection-classifier=both-addresses:10/7
per-connection-classifier=both-addresses:10/8
per-connection-classifier=both-addresses:10/9  → ISP2
```

## 10:45 — Failover

ISP1 kesilirse otomatik ISP2. Health check:

```
# ISP1 kontrol — 8.8.8.8'e ping, her 10 saniye
/tool netwatch add host=8.8.8.8 interval=10s \
    down-script="/ip route set [find gateway=203.0.113.1] distance=10" \
    up-script="/ip route set [find gateway=203.0.113.1] distance=1"
```

ISP1 down → default route distance değişir, main table ISP2'ye fallback.

## Doğrulama

### Mangle Rule Hit Count

```
/ip firewall mangle print stats
```

Her rule için **packets**/**bytes** counter artıyor mu?

### Specific Traffic Test

Teams call başlat:
```
/tool traffic-monitor print
```

Ether1 (ISP1) trafiği artmalı.

### Routing Mark Check

```
/ip firewall connection print where mark="via-isp1"
```

Active Teams session via-isp1 mark'lı görünmeli.

## Yaygın Hatalar

### Trafik Mark'lı Ama Hâlâ Main Route Kullanıyor

`place-before=0` kullanımı yanlış. Mangle order:
1. Daha spesifik kural önce
2. Genel PCC load balance sonra

NAT rule'lardan **önce** mangle işlemesi olmalı (prerouting chain).

### Asymmetric Routing

Request ISP1'den çıkıyor, response ISP2'den geliyor. TCP reset.

Çözüm: **Source NAT ile çıkan interface NAT'lansın**:
```
/ip firewall nat add chain=srcnat action=masquerade out-interface=ether1
/ip firewall nat add chain=srcnat action=masquerade out-interface=ether2
```

Her ISP kendi public IP'sini SNAT eder.

### PCC Session Drop

User yeni connection açtı, sırada ISP değişti, session sticky. Normal. Problem olmaması için TCP sessions stateful.

UDP (VoIP) sticky olmaz — ayrı mangle rule gerekir (port-based).

## Monitoring

PRTG / MRTG ile ether1 + ether2 bandwidth grafik:
- Gün içinde dağılım
- PCC doğru çalışıyor mu (%50/%50)?
- Priority trafik ISP1'e ağırlıklı mı?

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik QoS Queue Tree](/blog/mikrotik-qos-queue-tree-bandwidth)
- [FortiGate SD-WAN (karşılaştırma)](/blog/fortigate-sd-wan-coklu-isp-load-balance)

---

**Multi-ISP + policy routing deployment için destek?** [Teknik görüşme.](/#contact)
