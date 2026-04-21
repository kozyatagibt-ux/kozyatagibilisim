---
slug: fortigate-dhcp-relay-farkli-subnet
title: "FortiGate DHCP Relay — Farklı Subnet'ten DHCP Server"
type: cluster
pillar: 4
url: "/blog/fortigate-dhcp-relay-farkli-subnet"
hedef_anahtar_kelime: "fortigate dhcp relay"
meta_description: "FortiGate DHCP relay kurulum — farklı subnet'teki DHCP server'a client istekleri relay. Windows DHCP server + multi-VLAN senaryosu."
kelime_sayisi: "~600"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "DHCP Relay"
product_family: "Fortinet & Firewall"
---

## "Windows DHCP Server Kullanıyoruz, FortiGate DHCP Değil"

Kurumsal yapıda Windows Server DHCP:
- Integrated with AD
- DNS dynamic update
- Central scope management
- Audit logging

FortiGate DHCP server yerine **DHCP Relay** — FortiGate sadece istekleri Windows DHCP'ye forward eder.

## Hızlı Çözüm (TL;DR)

```
config system interface
    edit internal
        set mode dhcp-relay
        set dhcp-relay-ip 10.10.20.10    ← Windows DHCP
    next
end
```

---

## Neden Relay?

DHCP broadcast Layer 2 — subnet içinde kalır. Client 10.10.10.100/24'te, DHCP server 10.10.20.10'da (farklı subnet).

Broadcast geçmez → client IP alamaz.

**DHCP Relay**: FortiGate broadcast'i yakalar, unicast olarak DHCP server'a forward eder. Server cevap verir, relay client'a.

## 10:00 — Configuration

```
config system interface
    edit internal
        set mode dhcp-relay
        set dhcp-relay-ip 10.10.20.10   ← Windows DHCP server IP
        set dhcp-relay-service enable
    next
end
```

GUI:
```
Network > Interfaces > internal > 
Addressing mode: DHCP Relay
DHCP server: 10.10.20.10
```

## Multi-VLAN Relay

Her VLAN interface'de relay:

```
config system interface
    edit vlan10-users
        set mode dhcp-relay
        set dhcp-relay-ip 10.10.20.10
    next
    edit vlan20-guests
        set mode dhcp-relay
        set dhcp-relay-ip 10.10.20.10
    next
    edit vlan30-voip
        set mode dhcp-relay
        set dhcp-relay-ip 10.10.20.10
        set dhcp-relay-agent-option enable
        set dhcp-relay-type regular
    next
end
```

Windows DHCP'de her VLAN için **ayrı scope** olmalı:
- Scope1: 10.10.10.0/24 (Users)
- Scope2: 10.10.40.0/24 (Guests)
- Scope3: 10.10.30.0/24 (VoIP + Option 66)

## DHCP Server Tarafı

Windows DHCP:
- Authorize Server (AD'de)
- Scope per VLAN
- Subnet mask, gateway (FortiGate VLAN interface IP)
- DNS server (DC IP)

Client istek → FortiGate yakala → Windows DHCP'ye forward → IP lease → client'a geri.

## Troubleshooting

```
diagnose sniffer packet any "port 67 or port 68" 4 0 l
```

DHCP discovery/offer/request/ack paketleri trace.

Yaygın:
- **Discover geliyor ama Offer yok** → Windows DHCP relay'den geleni reject (Scope yok veya auth sorunu)
- **Offer var ama Client almıyor** → relay response yanlış yönlendirmiş

## DHCP Options via Relay

Option 43 (UniFi controller), Option 66 (VoIP TFTP) Windows DHCP scope'ta tanımlanır, relay ile client'a gider.

## İlgili Rehberler

- [DHCP Server + Reservation](/blog/fortigate-dhcp-server-ip-reservation)
- [FortiGate ilk kurulum](/blog/fortigate-ilk-kurulum-factory-production)

---

**Enterprise network services için?** [Teknik görüşme.](/#contact)
