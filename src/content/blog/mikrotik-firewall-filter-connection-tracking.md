---
slug: mikrotik-firewall-filter-connection-tracking
title: "MikroTik Firewall Filter + Connection Tracking — Güvenli Varsayılan Setup"
type: cluster
pillar: 4
url: "/blog/mikrotik-firewall-filter-connection-tracking"
hedef_anahtar_kelime: "mikrotik firewall filter"
meta_description: "MikroTik firewall filter rules + connection tracking — stateful firewall default config, input/forward chain, drop invalid, RAW table."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "Firewall Filter"
product_family: "Network & Altyapı"
---

## "MikroTik Default Firewall Yok — Açıktayız"

Yeni MikroTik factory config minimum firewall. Production'da **stateful firewall** şart:

## Hızlı Çözüm (TL;DR)

Temel production firewall setup — kopyala/uygula:

```
# ============ INPUT CHAIN ============
# 1. Accept established + related
/ip firewall filter add chain=input action=accept connection-state=established,related

# 2. Drop invalid
/ip firewall filter add chain=input action=drop connection-state=invalid

# 3. Accept ICMP (ping)
/ip firewall filter add chain=input action=accept protocol=icmp limit=50,10:packet

# 4. Accept LAN management
/ip firewall filter add chain=input action=accept in-interface=bridge-lan

# 5. Drop all other
/ip firewall filter add chain=input action=drop

# ============ FORWARD CHAIN ============
# 6. Accept established + related
/ip firewall filter add chain=forward action=accept connection-state=established,related

# 7. Drop invalid
/ip firewall filter add chain=forward action=drop connection-state=invalid

# 8. LAN → WAN
/ip firewall filter add chain=forward action=accept in-interface=bridge-lan out-interface=ether1

# 9. Drop all other forward
/ip firewall filter add chain=forward action=drop
```

---

## Stateful Firewall

**Connection tracking** — MikroTik her TCP/UDP connection'ı takip eder:
- **new** — ilk paket
- **established** — handshake tamam
- **related** — related connection (FTP data)
- **invalid** — malformed, attack pattern

Stateful = "Bu response mu yoksa yeni saldırı mı?" ayırt edebilir.

## 10:00 — Default Deny Approach

Philosophy: **Önce her şey drop, sonra izin verdiğin açılsın**.

Yukarıdaki config'te:
- Input: 5 kural (4 accept + 1 drop)
- Forward: 4 kural (3 accept + 1 drop)

Başka her şey reddedilir.

## 10:10 — Spesifik Port Açma

Dışarıdan web server'a erişim (VIP rule'la yönlendirilmiş):
```
/ip firewall filter add chain=forward action=accept \
    in-interface=ether1 out-interface=bridge-lan \
    dst-address=10.10.20.50 protocol=tcp dst-port=80,443 \
    place-before=6 \
    comment="Web server public access"
```

`place-before=6` — sıralama kritik. "Established" rule'ından **önce** değil, "drop all"dan **önce** olmalı.

## 10:20 — SSH Brute Force Koruması

SSH port internet'e açıksa brute force attack:

```
# Tespit: 1 dakikada 5+ başarısız SSH attempt
/ip firewall filter add chain=input protocol=tcp dst-port=22 \
    connection-state=new \
    src-address-list=!ssh-whitelist \
    action=add-src-to-address-list address-list=ssh-attempt-3 address-list-timeout=1m

/ip firewall filter add chain=input protocol=tcp dst-port=22 \
    connection-state=new \
    src-address-list=ssh-attempt-3 \
    action=add-src-to-address-list address-list=ssh-blacklist address-list-timeout=1d

# Blacklist drop
/ip firewall filter add chain=input src-address-list=ssh-blacklist action=drop
```

3 başarısız SSH → 24 saat ban.

## 10:30 — RAW Table (Performance)

Bazı trafik connection tracking'e bile alınmasın — direkt drop:

```
# Known bad IP'leri RAW table'da drop — connection tracking'e ulaşmaz
/ip firewall raw add chain=prerouting action=drop src-address-list=known-bad-ips
```

RAW = connection tracking öncesi. CPU tasarrufu.

DDoS attacker botnet'i RAW'da block:
```
/ip firewall address-list add address=185.x.x.0/24 list=known-bad-ips
```

## 10:40 — Bogon + Spoofing Protection

Private/reserved IP'ler WAN'dan gelmemeli:

```
/ip firewall address-list add list=bogons address=10.0.0.0/8
/ip firewall address-list add list=bogons address=172.16.0.0/12
/ip firewall address-list add list=bogons address=192.168.0.0/16
/ip firewall address-list add list=bogons address=127.0.0.0/8
/ip firewall address-list add list=bogons address=169.254.0.0/16
/ip firewall address-list add list=bogons address=224.0.0.0/4

/ip firewall raw add chain=prerouting in-interface=ether1 \
    src-address-list=bogons action=drop \
    comment="Bogon / spoofing WAN drop"
```

WAN'dan gelen 10.0.0.x = spoofed → drop.

## 10:50 — Connection Limit

Bir IP'den çok fazla bağlantı (DoS):
```
/ip firewall filter add chain=forward connection-state=new \
    protocol=tcp tcp-flags=syn \
    connection-limit=200,32 \
    action=drop \
    comment="Connection flood protection"
```

Tek source IP'den 200+ yeni TCP SYN → drop.

## Logging

Policy hits log:
```
/ip firewall filter add chain=forward action=log \
    log-prefix="DROP-FORWARD: " \
    place-before=end
```

Drop rule'dan **önce** log (son satır log + drop yerine).

Uyarı: Log CPU tüketir. Production'da sadece kritik rules'da.

## Testing

Web'den tester:
```
nmap -sS -p 1-1000 public-ip
```

Default: Çoğu port "filtered" (drop). Sadece açtığın port'lar open.

İç testing:
```
/tool torch interface=ether1
```

Real-time bağlantı monitör.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik IPsec VPN](/blog/mikrotik-site-to-site-ipsec-vpn)

---

**MikroTik security hardening için destek?** [Teknik görüşme.](/#contact)
