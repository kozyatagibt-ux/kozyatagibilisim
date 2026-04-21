---
slug: mikrotik-site-to-site-ipsec-vpn
title: "MikroTik Site-to-Site IPsec VPN — İki Ofis Arası Şifreli Tünel"
type: cluster
pillar: 4
url: "/blog/mikrotik-site-to-site-ipsec-vpn"
hedef_anahtar_kelime: "mikrotik site to site ipsec vpn"
meta_description: "MikroTik iki router arası Site-to-Site IPsec VPN kurulumu. Peer, proposal, policy config, NAT bypass, firewall exception. Adım adım CLI."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "MikroTik IPsec"
product_family: "Network & Altyapı"
---

## "Şubeler Arası MikroTik VPN"

Merkez (İstanbul) + Şube (Ankara). İki MikroTik. LAN'lar birbirini görmeli — dosya sunucu, ERP erişim. Çözüm: IPsec tunnel.

## Hızlı Çözüm (TL;DR)

### Her MikroTik'te (farklı subnet'ler):
```
# 1. Peer
/ip ipsec peer add name=HQ-to-Branch address=[karşı_public_IP]/32 exchange-mode=ike2

# 2. Identity
/ip ipsec identity add peer=HQ-to-Branch auth-method=pre-shared-key secret="GucluPSK32Karakter"

# 3. Proposal
/ip ipsec proposal add name=s2s-prop auth-algorithms=sha256 enc-algorithms=aes-256-cbc pfs-group=modp2048

# 4. Policy
/ip ipsec policy add peer=HQ-to-Branch src-address=10.10.0.0/16 dst-address=10.20.0.0/16 proposal=s2s-prop tunnel=yes

# 5. NAT bypass
/ip firewall nat add chain=srcnat action=accept src-address=10.10.0.0/16 dst-address=10.20.0.0/16 place-before=0
```

---

## Senaryo

| | İstanbul (HQ) | Ankara (Şube) |
|---|---|---|
| Public IP | 203.0.113.10 | 203.0.113.50 |
| LAN | 10.10.0.0/16 | 10.20.0.0/16 |
| Local MikroTik IP | 10.10.0.1 | 10.20.0.1 |
| PSK | (her iki tarafta aynı) | |

## 10:00 — İstanbul HQ Config

### Peer (Karşı Taraf Bilgisi)

```
/ip ipsec peer add name=to-Ankara \
    address=203.0.113.50/32 \
    exchange-mode=ike2 \
    profile=default
```

IKEv2 — modern, daha güvenli. Eski IKEv1 hâlâ var ama yeni deployment için v2.

### Identity (Auth)

```
/ip ipsec identity add peer=to-Ankara \
    auth-method=pre-shared-key \
    secret="A8xK2mN9pQrS7TuVwXyZ3bEfGhJk4LmN"
```

**PSK minimum 32 karakter**, random. Bitwarden'a kaydet, Ankara tarafına güvenli kanaldan paylaş.

### Proposal (Encryption Parametreleri)

```
/ip ipsec proposal add name=s2s-aes256-sha256 \
    auth-algorithms=sha256 \
    enc-algorithms=aes-256-cbc \
    pfs-group=modp2048 \
    lifetime=1h
```

PFS modp2048 = DH Group 14 (2048-bit). Modern standart.

### Policy (Hangi Trafik Tunneled)

```
/ip ipsec policy add peer=to-Ankara \
    src-address=10.10.0.0/16 \
    dst-address=10.20.0.0/16 \
    proposal=s2s-aes256-sha256 \
    tunnel=yes \
    action=encrypt
```

`src-address` + `dst-address` — her iki LAN. Ankara tarafında **ters** olacak.

### NAT Bypass (Kritik!)

MikroTik default NAT masquerade uygular. Ama IPsec trafiği NAT'lanmamalı — `src-address` iç subnet kalmalı:

```
/ip firewall nat add chain=srcnat action=accept \
    src-address=10.10.0.0/16 dst-address=10.20.0.0/16 \
    place-before=0 \
    comment="IPsec bypass — no NAT for tunnel"
```

**place-before=0** kritik. Masquerade rule'dan **önce** gelmeli. Aksi halde trafik NAT'lanır, IPsec policy match etmez.

### Firewall Input — IKE Port Kabul

WAN'dan gelen IKE (port 500, 4500 NAT-T) paketleri firewall'da drop edilmemeli:

```
/ip firewall filter add chain=input action=accept \
    protocol=udp dst-port=500,4500 \
    place-before=0 \
    comment="IPsec IKE"

/ip firewall filter add chain=input action=accept \
    protocol=ipsec-esp \
    place-before=0 \
    comment="IPsec ESP"
```

## 10:15 — Ankara Şube Config (Ayna)

Aynı komutlar, **subnet'ler ters**:

```
/ip ipsec peer add name=to-Istanbul \
    address=203.0.113.10/32 \
    exchange-mode=ike2

/ip ipsec identity add peer=to-Istanbul \
    auth-method=pre-shared-key \
    secret="A8xK2mN9pQrS7TuVwXyZ3bEfGhJk4LmN"

/ip ipsec proposal add name=s2s-aes256-sha256 \
    auth-algorithms=sha256 \
    enc-algorithms=aes-256-cbc \
    pfs-group=modp2048

/ip ipsec policy add peer=to-Istanbul \
    src-address=10.20.0.0/16 \
    dst-address=10.10.0.0/16 \
    proposal=s2s-aes256-sha256 \
    tunnel=yes

/ip firewall nat add chain=srcnat action=accept \
    src-address=10.20.0.0/16 dst-address=10.10.0.0/16 \
    place-before=0

/ip firewall filter add chain=input action=accept \
    protocol=udp dst-port=500,4500 \
    place-before=0

/ip firewall filter add chain=input action=accept \
    protocol=ipsec-esp \
    place-before=0
```

## 10:25 — Tunnel Kontrol

```
/ip ipsec active-peers print
```

Çıktı:
```
 # ID                                   STATE           UPTIME  
 0 to-Ankara                            established     00:02:14
```

`established` + uptime → tunnel UP.

```
/ip ipsec policy print
```

Her policy için:
- `ph2-state: established`

## 10:30 — Ping Test

İstanbul'daki bir laptop'tan (10.10.10.45):
```
ping 10.20.10.45  (Ankara'daki test laptop)
```

Reply:
```
64 bytes from 10.20.10.45: time=42 ms
```

Success. RTT İstanbul-Ankara fiber üzerinde 40-50ms normal.

## 10:40 — Routing (Gerekirse)

Default MikroTik route table + IPsec policy → trafik otomatik tunnel'a yönlenir. Ama explicit route bazen gerek:

```
/ip route add dst-address=10.20.0.0/16 gateway=ether1 comment="Via IPsec to Ankara"
```

Genelde gerekmez, policy yeterli.

## Yaygın Hatalar

### "Phase 1 negotiation failed"

- PSK her iki tarafta aynı mı? (Case-sensitive)
- IKE version aynı mı (ikev2)?
- Public IP doğru mu (karşı tarafın)?
- Log:
```
/log print where topics~"ipsec"
```

### "Phase 2 failed - No Proposal Chosen"

- Proposal parametreleri her iki tarafta eşit mi?
  - Encryption: aes-256-cbc (exactly)
  - Auth: sha256
  - PFS: modp2048
- Lifetime farkı (genelde sorun değil ama extreme farkta)

### Tunnel UP Ama Ping Gitmiyor

- **NAT bypass rule eksik** (en sık sebep!)
- Order sorunu — NAT bypass masquerade'den önce olmalı
- Firewall filter forward chain'de LAN-to-LAN bloke mu?

Düzelt:
```
/ip firewall filter add chain=forward action=accept \
    src-address=10.10.0.0/16 dst-address=10.20.0.0/16 \
    place-before=0 \
    comment="LAN to Branch LAN"

/ip firewall filter add chain=forward action=accept \
    src-address=10.20.0.0/16 dst-address=10.10.0.0/16 \
    place-before=0 \
    comment="Branch LAN to HQ LAN"
```

### Sadece Tek Yönlü Çalışıyor

Firewall forward her iki yönde allow olmalı. Stateful filter için established+related yeter ama new connection her yönden açılabilmeli.

## Performance Notlar

- **CCR (Cloud Core Router)** AES-NI hardware destekli, 1-2 Gbps IPsec
- **hEX (RB750Gr3)** — 200-400 Mbps IPsec
- **RB5009** — 1 Gbps+ IPsec

Hardware acceleration check:
```
/system resource print
```

CPU load yüksekse CCR modeli düşün.

## Debugging — Log

```
/system logging add topics=ipsec,!debug action=memory
/log print where topics~"ipsec"
```

IPsec handshake detay log'ları.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik QoS Queue Tree](/blog/mikrotik-qos-queue-tree-bandwidth)
- [FortiGate S2S IPsec (karşılaştırma)](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)

---

**MikroTik multi-site VPN + network design için destek?** [Teknik görüşme.](/#contact)
