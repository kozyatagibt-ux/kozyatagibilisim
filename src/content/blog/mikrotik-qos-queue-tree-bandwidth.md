---
slug: mikrotik-qos-queue-tree-bandwidth
title: "MikroTik QoS Queue Tree — Kullanıcı Başı Bandwidth Kontrolü"
type: cluster
pillar: 4
url: "/blog/mikrotik-qos-queue-tree-bandwidth"
hedef_anahtar_kelime: "mikrotik queue tree bandwidth"
meta_description: "MikroTik Queue Tree ile bandwidth kontrolü. Simple Queue vs Queue Tree, burst, PCQ per-connection queue, download/upload limit per user."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "MikroTik QoS"
product_family: "Network & Altyapı"
---

## "İnternet Herkes İçin Adil Paylaşılsın"

500 Mbps fiber. 50 kullanıcı. Bir kullanıcı torrent çekmeye başlıyor → herkes için internet yavaş.

Çözüm: **MikroTik QoS — Queue Tree + PCQ**. Her kullanıcı max 20 Mbps download, adil paylaşım.

## Simple Queue vs Queue Tree

### Simple Queue
- Kolay
- IP-başı limit
- Örnek: `/queue simple add target=10.10.10.45/32 max-limit=20M/10M`
- Küçük ofis için yeterli

### Queue Tree
- Karmaşık ama esnek
- Interface bazlı
- HTB (Hierarchical Token Bucket) tree
- Mangle ile işaretlenen paketler
- PCQ ile dinamik per-user queue

Orta ölçek için Queue Tree + PCQ.

## Hızlı Çözüm (TL;DR)

```
# 1. Mangle — LAN trafiğini işaretle
/ip firewall mangle add chain=forward in-interface=bridge-lan action=mark-connection new-connection-mark=LAN-upload
/ip firewall mangle add chain=forward connection-mark=LAN-upload action=mark-packet new-packet-mark=LAN-upload-pkt

/ip firewall mangle add chain=forward out-interface=bridge-lan action=mark-connection new-connection-mark=LAN-download  
/ip firewall mangle add chain=forward connection-mark=LAN-download action=mark-packet new-packet-mark=LAN-download-pkt

# 2. PCQ — Per-connection queue type
/queue type add name=pcq-upload kind=pcq pcq-classifier=src-address pcq-rate=10M
/queue type add name=pcq-download kind=pcq pcq-classifier=dst-address pcq-rate=20M

# 3. Queue Tree
/queue tree add name=Upload-Total parent=ether1 packet-mark=LAN-upload-pkt max-limit=500M queue=pcq-upload
/queue tree add name=Download-Total parent=bridge-lan packet-mark=LAN-download-pkt max-limit=500M queue=pcq-download
```

Sonuç: Her kullanıcı max 20 Mbps down, 10 Mbps up. Boşta kalanı paylaşır.

---

## PCQ Nedir?

**Per-Connection Queue** — dinamik subqueue:
- Her unique source/dest IP için ayrı kuyruk
- Tüm kuyruklar eşit bandwidth
- Yeni kullanıcı → otomatik yeni subqueue

10 user aktif, total 500 Mbps → her user 50 Mbps.  
Ama `pcq-rate=20M` set edilirse max 20 Mbps (fair cap).

## 10:00 — Mangle Traffic Marking

Her trafik tipi işaretlenir:

```
# LAN'dan gelen (upload)
/ip firewall mangle add chain=forward \
    in-interface=bridge-lan \
    action=mark-connection \
    new-connection-mark=LAN-upload \
    passthrough=yes

/ip firewall mangle add chain=forward \
    connection-mark=LAN-upload \
    action=mark-packet \
    new-packet-mark=LAN-upload-pkt \
    passthrough=no

# LAN'a giden (download)
/ip firewall mangle add chain=forward \
    out-interface=bridge-lan \
    action=mark-connection \
    new-connection-mark=LAN-download \
    passthrough=yes

/ip firewall mangle add chain=forward \
    connection-mark=LAN-download \
    action=mark-packet \
    new-packet-mark=LAN-download-pkt \
    passthrough=no
```

## 10:10 — PCQ Queue Type

```
# Upload PCQ — src-address ile grupla
/queue type add name=pcq-up kind=pcq \
    pcq-classifier=src-address \
    pcq-rate=10M \
    pcq-total-limit=2000 \
    pcq-dst-address6-mask=64

# Download PCQ — dst-address ile grupla
/queue type add name=pcq-down kind=pcq \
    pcq-classifier=dst-address \
    pcq-rate=20M \
    pcq-total-limit=2000 \
    pcq-dst-address6-mask=64
```

## 10:15 — Queue Tree

```
# Upload — total 500M, her user 10M
/queue tree add name="Upload-Total" \
    parent=ether1 \
    packet-mark=LAN-upload-pkt \
    queue=pcq-up \
    max-limit=500M

# Download — total 500M, her user 20M
/queue tree add name="Download-Total" \
    parent=bridge-lan \
    packet-mark=LAN-download-pkt \
    queue=pcq-down \
    max-limit=500M
```

**Parent**:
- Upload: `ether1` (WAN out — upload ISP'ye)
- Download: `bridge-lan` (LAN out — download user'a)

## 10:25 — Doğrulama

```
/queue tree print
/queue simple print
```

Trafik gelmeye başladığında:
```
/queue tree print stats
```

Her queue'da real-time rate görünür.

## Priority — VoIP Öncelik

VoIP için priority yüksek tut:

```
# Mangle — VoIP işaretle (SIP port 5060, RTP 10000-20000)
/ip firewall mangle add chain=forward \
    protocol=udp port=5060,10000-20000 \
    action=mark-packet \
    new-packet-mark=VoIP-pkt

# Queue Tree — VoIP önce
/queue tree add name="VoIP-Priority" \
    parent=ether1 \
    packet-mark=VoIP-pkt \
    priority=1 \
    limit-at=20M \
    max-limit=50M

# Bulk LAN — düşük priority
/queue tree set "Upload-Total" priority=8
```

Priority 1 = en yüksek. VoIP her zaman önce işlenir, diğer trafik bekleyebilir.

## Burst — Kısa Süreli Yüksek Hız

Web sayfa yükleme için burst allow:

```
/queue type add name=pcq-down-burst kind=pcq \
    pcq-classifier=dst-address \
    pcq-rate=20M \
    pcq-burst-rate=50M \
    pcq-burst-threshold=15M \
    pcq-burst-time=5s
```

İlk 5 saniye 50 Mbps (yüksek), sonra 20 Mbps'e düşer. Interactive browsing hızlı hisseder.

## Schedule — Mesai/Dışı Farklı Limit

Mesai saati strict limit, gece gevşek:

```
/system scheduler add name=enable-strict-qos \
    start-time=09:00 interval=1d \
    on-event="/queue tree set Download-Total max-limit=500M"

/system scheduler add name=disable-strict-qos \
    start-time=18:00 interval=1d \
    on-event="/queue tree set Download-Total max-limit=1000M"
```

Mesai dışı limit 2 kat → backup, update daha rahat.

## Monitoring — Winbox Graph

Winbox > Queues > Queue Tree'ye sağ tık → **Statistics**:

> 📸 **Ekran 1** — Queue Statistics  
> Per-queue bandwidth usage graph  
> Active users + their subqueue rates  
> Drop count (rate exceeded)

## Yaygın Hatalar

### Queue Tree Hiç Çalışmıyor

- Mangle rule işaretleme yapıyor mu? `passthrough=yes`/`no` doğru mu?
- Packet-mark adları tam aynı mı (case-sensitive)?
- Queue tree parent doğru interface mi?

Log:
```
/ip firewall mangle print stats
```

Packets counter artıyor mu?

### Fast İnternet Ama PCQ Slow

`pcq-rate` değeri per-user ceiling. Tek kullanıcı tek başınaysa bile 20 Mbps ile sınırlı.

Burst + rate kombinasyonu daha esnek:
- Tek user: 50 Mbps burst + 20 Mbps sustained
- Çok user: Her biri 20 Mbps sustained, adil paylaşım

### Queue Kullanıyor Ama PCQ Değil

Simple Queue + PCQ de mümkün ama Queue Tree daha esnek. Karışıklık:
- Simple Queue → direct IP target
- Queue Tree + Mangle → tüm trafik sınıflandırılmış

Tek sistem kullan — karışıklık önle.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik IPsec VPN](/blog/mikrotik-site-to-site-ipsec-vpn)
- [FortiGate Traffic Shaping (karşılaştırma)](/blog/fortigate-traffic-shaping-qos-bandwidth)

---

**MikroTik QoS + advanced network tuning için destek?** [Teknik görüşme.](/#contact)
