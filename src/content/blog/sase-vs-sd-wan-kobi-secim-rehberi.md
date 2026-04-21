---
slug: sase-vs-sd-wan-kobi-secim-rehberi
title: "SASE vs SD-WAN — KOBİ için Hangisi, Ne Zaman?"
type: cluster
pillar: 4
url: "/blog/sase-vs-sd-wan-kobi-secim-rehberi"
hedef_anahtar_kelime: "sase sd-wan karsilastirma"
meta_description: "SASE (Secure Access Service Edge) vs SD-WAN — farklar, kullanım senaryoları, KOBİ için seçim kriterleri. Cloudflare, Zscaler, Fortinet, Cato kıyas."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/network-altyapi"
---

## "MPLS Çok Pahalı, Alternatif Lazım"

Holding IT Manager: "3 şubemiz var, MPLS hattı aylık 45K TL. Cloud'a göçüyoruz ama MPLS trafik hâlâ merkeze döküyor. SD-WAN duydum, SASE duydum — fark ne?"

## Hızlı Çözüm (TL;DR)

- **SD-WAN** — şube-şube network optimizasyon (internet + MPLS karışık, akıllı yönlendirme)
- **SASE** — SD-WAN + security (firewall, CASB, ZTNA, SWG) cloud'da birleşik
- **KOBİ**: 2-5 şube, uzak çalışan varsa → SASE
- **KOBİ**: Tek lokasyon, sadece internet → ikisi de gereksiz, Fortigate yeterli

---

## Tanımlar

### SD-WAN Ne?

**Software-Defined WAN** — MPLS alternatifi. Birden fazla internet hattını (fiber, 4G/5G, satellite) intelligently kullanır.

Özellikler:
- Link aggregation — 2 ADSL = tek fatch 200 Mbps
- App-aware routing — Teams video → low-latency link, backup → high-bandwidth link
- Failover < 1 saniye
- Central orchestration — tüm şubeler tek dashboard

Örnekler: Fortinet Secure SD-WAN, Cisco Viptela, Silver Peak, VMware VeloCloud.

### SASE Ne?

**Secure Access Service Edge** — Gartner 2019 term. SD-WAN + 5 security service cloud-delivered:
1. **SWG** (Secure Web Gateway) — web filter
2. **CASB** (Cloud Access Security Broker) — SaaS control
3. **ZTNA** (Zero Trust Network Access) — VPN alternatifi
4. **FWaaS** (Firewall as a Service)
5. **DLP** (Data Loss Prevention)

Hepsi tek vendor cloud'dan. User/device global nearest PoP'a bağlanır, trafik oradan inspect.

Örnekler: Zscaler, Netskope, Cato Networks, Cloudflare One, Palo Alto Prisma, Fortinet SASE.

## Neden SASE Trending?

Covid sonrası:
- %60+ çalışan hybrid/remote
- SaaS dominant (M365, Google, Salesforce)
- Klassik hub-spoke (tüm trafik merkez DC'ye) eskidi
- User nerede → security orada olmalı

## 10:00 — Karşılaştırma Tablosu

| Özellik | SD-WAN | SASE |
|---|---|---|
| Network optimization | ✓ | ✓ |
| Multi-ISP | ✓ | ✓ |
| Firewall | Appliance'ta | Cloud PoP'ta |
| Web filter | Opsiyonel | Dahil |
| CASB | Yok | Dahil |
| ZTNA | Yok | Dahil |
| Remote user | Yok/limited | Birincil use case |
| Deploy | CPE (on-prem) + controller | Cloud + minimal CPE |
| Maliyet | Medium | Higher (per-user licensing) |
| Yönetim | Appliance-centric | Cloud-centric |

## 10:15 — KOBİ Senaryoları

### Senaryo A: Tek Lokasyon, 30 User, Sadece Internet

**Çözüm**: Fortigate 80F + FortiClient (VPN) + FortiGuard subscription. SD-WAN/SASE gereksiz.

### Senaryo B: 2 Şube Aynı Şehir, 50 User

**SD-WAN** yeterli. Fortinet SD-WAN iki Fortigate arası IPsec + akıllı routing. Maliyet: ~150K TL donanım + yıllık license.

### Senaryo C: 5 Şube Farklı Şehir, 200 User + 50 Remote

**SASE** ideal:
- Şubelere minimal CPE (Fortigate 40F)
- Remote user SASE client (FortiSASE, Cloudflare WARP)
- Trafik nearest PoP'ta inspect
- Merkez DC backhaul yok

Maliyet: ~$8-15/user/month. 250 user × $12 × 12 = $36K/yıl = ~1.2M TL.

### Senaryo D: Saf SaaS Firması, Hiç DC Yok

**SASE** şart. Hiç on-prem yok, tüm workload cloud. SASE = security perimeter yerine geçer.

## 10:30 — Vendor Kıyaslama

### Cloudflare One

+ Giriş seviyesi ucuz ($7/user Zero Trust)
+ Cloudflare Access (ZTNA) mature
+ WARP client hızlı
- CASB/DLP yeni, olgunlaşıyor

### Zscaler

+ Enterprise-grade SWG + ZPA lider
+ 150+ PoP global
- Pahalı, KOBİ için overkill
- Complex deploy

### Cato Networks

+ Single-vendor full SASE
+ Private backbone (130+ PoP)
+ KOBİ dostu pricing
- Türkiye PoP yok (EU nearest)

### Fortinet SASE

+ Mevcut FortiGate customer için natural
+ Single pane (FortiManager)
- Cloud SASE ekosistemi henüz Zscaler kadar mature değil

### Palo Alto Prisma Access

+ Next-gen firewall quality
+ Strong threat prevention
- Premium pricing
- 500+ user için ideal

## 10:45 — Migration Path

### Adım 1: Envanter

- Şube sayısı + user/şube
- Mevcut WAN (MPLS, internet, VPN)
- Remote user sayısı
- SaaS adoption (M365, Salesforce etc)

### Adım 2: POC

Vendor'den 30-90 gün trial:
- 1 pilot şube + 10 user
- Critical apps test (ERP, Teams, SaaS)
- Latency, packet loss ölç
- Security event test (EICAR, phishing sim)

### Adım 3: Phased Rollout

- Önce remote users (quick win)
- Sonra smallest branch
- Last: HQ + critical site

## 11:00 — Türkiye Özel

### PoP Seçimi

SASE vendor'ın Türkiye veya yakın PoP'u olsun:
- Cloudflare — İstanbul PoP var
- Zscaler — Frankfurt, Bucharest nearest
- Cato — Athens nearest
- Cloudflare avantajlı latency

### KVKK + Veri Yerelliği

KVKK işleme bulunuyorsa SASE vendor:
- EU veri işleme sözleşmesi
- Log retention location (EU preferred)
- BTK kısıtlamaları (bazı SASE traffic BTK blokaj listesi ile çakışabilir)

## 11:15 — Pitfalls

### 1. "SD-WAN Alırız, Security Sonra"

SD-WAN'a sonradan SASE eklemek = iki vendor, integration baş ağrısı. Başta tek vendor seç.

### 2. Bandwidth Underestimate

SASE cloud PoP'ta inspect = trafik cloud'a çıkıp dönüyor. Yeterli internet bandwidth şart.

### 3. Per-User Cost Scaling

100 user ok. 500'e ulaşınca fiyat fark eder. Volume discount negotiate.

## ROI Hesap

Mevcut: MPLS 3 şube × 45K/ay = 135K TL/ay = 1.62M TL/yıl.
SASE: 200 user × $12 × 12 × 33 TL/$ = 950K TL/yıl + 3 şube internet 30K × 3 × 12 = 1080K.
Toplam yeni: ~2M TL — biraz daha yüksek.

Ama: Remote user güvenlik + SaaS performance + security consolidation (firewall + WAF + VPN tek yerde) = intangible benefit.

## İlgili Rehberler

- [Zero Trust Architecture](/blog/zero-trust-architecture-kobi-rehberi)
- [Fortinet SD-WAN](/blog/fortigate-sd-wan-coklu-isp-load-balance)
- [Conditional Access](/blog/m365-conditional-access-require-mfa-admins)

---

**SASE/SD-WAN vendor selection + PoC için destek?** [Teknik görüşme.](/#contact)
