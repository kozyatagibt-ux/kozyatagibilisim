---
slug: fortigate-sd-wan-coklu-isp-load-balance
title: "FortiGate SD-WAN — İki ISP Load Balance + Otomatik Failover"
type: cluster
pillar: 4
url: "/blog/fortigate-sd-wan-coklu-isp-load-balance"
hedef_anahtar_kelime: "fortigate sd-wan coklu isp"
meta_description: "FortiGate SD-WAN kurulum — iki ISP load balance, performance SLA health check, session-based failover. BGP alternatif KOBİ için."
kelime_sayisi: "~950"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "SD-WAN Setup"
product_family: "Fortinet & Firewall"
---

## "2 ISP Var, Ama Failover Manuel"

Firma TurkTelekom (1 Gbps) + TurkNet (500 Mbps) aboneliği. Ama config statik — TurkTelekom down olunca manuel ISP değiştiriyor BT.

Çözüm: **SD-WAN** — otomatik **health check + load balance + failover**.

## BGP vs SD-WAN

- **BGP**: Enterprise-grade, full internet table, AS number gerekir (pahalı). [BGP rehberi](/blog/fortigate-bgp-iki-isp-dual-homed)
- **SD-WAN**: KOBİ-friendly, default route + health check, AS number gerekmez

SMB için SD-WAN daha pratik.

## Hızlı Çözüm (TL;DR)

1. SD-WAN interface member'larını tanımla (wan1, wan2)
2. SD-WAN zone oluştur (tüm member'ları grupla)
3. Performance SLA (health check) — 8.8.8.8'e her 500ms ping
4. SD-WAN rule: Hangi trafiği hangi link'ten (application veya source bazlı)
5. Default static route SD-WAN üzerinden
6. Policy'leri SD-WAN'a point et

---

## 10:00 — SD-WAN Setup

Network > SD-WAN > Enable:

> 📸 **Ekran 1** — SD-WAN Setup  
> Status: ON  
> Interface Members:  
>   + Add:  
>     Interface: wan1  
>     Gateway: 198.51.100.1 (TurkTelekom gateway)  
>     Priority: 1  
>     SLA Target: ISP-Health-Check  
>   + Add:  
>     Interface: wan2  
>     Gateway: 203.0.113.1 (TurkNet gateway)  
>     Priority: 2  
>     SLA Target: ISP-Health-Check

Her iki ISP member.

## 10:10 — Performance SLA

Network > SD-WAN > Performance SLAs > + Create:

> 📸 **Ekran 2** — Performance SLA  
> Name: "ISP-Health-Check"  
> Detection Mode: Active  
> Protocol: ICMP  
> Server: 8.8.8.8, 1.1.1.1 (multiple for reliability)  
>   
> Participants: wan1, wan2  
>   
> Failure Threshold: 5  
> Recovery Threshold: 10  
> Probe Interval: 500 ms  
>   
> SLA Targets:  
>   Latency: 150 ms max  
>   Jitter: 30 ms max  
>   Packet Loss: 2% max

Her 500ms ping. 5 fail = link unhealthy. 10 success = recovered.

## 10:20 — SD-WAN Rules

Hangi trafik hangi link? Default tüm trafiği her iki link arasında dağıt (load balance):

> 📸 **Ekran 3** — SD-WAN Rules  
> + Create rule: "Default-Balance"  
>   
> Source: any  
> Destination: any  
> Services: ALL  
>   
> Strategy: **Best Quality** (en iyi metrik)  
>   Measured SLA: ISP-Health-Check  
>   Quality criteria: Latency + Jitter + Packet Loss

Trafik en iyi **SLA'ya** sahip link'ten geçer. Genelde TurkTelekom (fiber) low latency, onu seçer. Down olursa TurkNet.

### Specific App Routing

Zoom/Teams sadece low-latency ISP'den:
```
+ Create rule: "Priority-Video-Calls"
Application: Microsoft.Teams, Zoom.Meetings
Strategy: Lowest Cost (SLA)
Priority link: wan1 (TurkTelekom — fiber)
```

## 10:30 — Static Route

```
Network > Static Routes > + Create New:
Destination: 0.0.0.0/0
Device: **SD-WAN** (spesifik wan1 / wan2 değil)
Administrative Distance: 10
```

Tek default route SD-WAN. FortiGate dinamik karar verir hangi member.

## 10:40 — Firewall Policy

Önceden wan1 için policy + wan2 için policy (2 policy). Şimdi **tek policy** SD-WAN:

```
Source: internal
Destination: all
Outgoing Interface: **SD-WAN** (zone)
NAT: enable
```

Tek policy her iki ISP'yi kapsar.

## 10:50 — Monitoring

Network > SD-WAN > Performance SLAs:

> 📸 **Ekran 4** — SLA Monitoring  
> Real-time:  
> - wan1: Latency 8ms, Jitter 2ms, Loss 0% ✓ Healthy  
> - wan2: Latency 15ms, Jitter 5ms, Loss 0% ✓ Healthy  
>   
> Past 24h:  
> - wan1: 99.9% uptime  
> - wan2: 98.2% uptime (2 saat outage gece)

Dashboard gerçek-zamanlı SLA.

## Failover Scenarios

### Senaryo 1: wan1 Link Failure

- 5 failed ping 2.5 saniye
- wan1 **Unhealthy**
- Tüm trafik otomatik **wan2** üzerinden
- Downtime: ~3 saniye

### Senaryo 2: wan1 High Latency

- wan1 latency 200ms (target 150ms)
- SLA violation
- Best Quality rule → wan2 tercih eder (30ms)
- Yükler balance

### Senaryo 3: Recovery

- wan1 healthy tekrar
- 10 successful ping (5 saniye)
- Traffic gradual migration back

## Yaygın Hatalar

### wan1 Down Ama Trafik Gitmiyor

Default route hâlâ wan1-specific mi? `show router static` kontrol. SD-WAN interface'i hedefle değiştir.

### Asymmetric Routing

User TurkTelekom'dan çıkıyor, dönüş TurkNet'ten. Uygulama reset. Solution: **session stickiness**:
```
set fail-alert-interfaces
set snat true  ← source NAT aktif, return path kontrollü
```

### Health Check False Positive

8.8.8.8 sometimes ICMP rate limit. Multiple targets:
```
Server: 8.8.8.8, 1.1.1.1, 9.9.9.9
Success: ANY (birinden cevap = healthy)
```

## SD-WAN + VPN Combo

IPsec VPN over SD-WAN:
- Primary: wan1 üzerinden IPsec
- Backup: wan2 üzerinden IPsec
- Failover otomatik

```
VPN > IPsec > edit Phase1 > Interface: SD-WAN (zone)
```

## Multi-Site SD-WAN

Merkez + 3 şube. Her şubede FortiGate + SD-WAN:
- Şube-Merkez VPN over best-quality link
- Merkez'de orchestration (FortiManager)
- Yüzlerce kural centralize

**FortiManager** SD-WAN template ile 20 şubeyi 10 dk'da kur.

## İlgili Rehberler

- [BGP iki ISP dual-homed](/blog/fortigate-bgp-iki-isp-dual-homed)
- [Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)
- [Traffic Shaping QoS](/blog/fortigate-traffic-shaping-qos-bandwidth)

---

**SD-WAN multi-site + enterprise deployment için uzman destek?** [Teknik görüşme.](/#contact)
