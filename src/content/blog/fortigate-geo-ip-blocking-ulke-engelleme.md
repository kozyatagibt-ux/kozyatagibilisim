---
slug: fortigate-geo-ip-blocking-ulke-engelleme
title: "FortiGate Geo-IP Blocking — Türkiye Dışı Trafiği Engelleme"
type: cluster
pillar: 4
url: "/blog/fortigate-geo-ip-blocking-ulke-engelleme"
hedef_anahtar_kelime: "fortigate geo-ip blocking"
meta_description: "FortiGate Geo-IP blocking — Rusya, Çin, Kore vb. yüksek riskli ülkelerden trafiği engelleme. Inbound + outbound country block."
kelime_sayisi: "~700"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Geo-IP Block"
product_family: "Fortinet & Firewall"
---

## "Brute Force Attacker'lar Hep Rusya/Çin'den"

SSL-VPN log'larında:
```
Top failed login sources:
1. 185.x.x.x (Russia) — 12,000 attempts
2. 193.x.x.x (China) — 8,500
3. 5.x.x.x (Ukraine) — 3,000
```

Firmanın Rusya/Çin/Ukrayna'da müşterisi yok. **Block everything except Turkey + necessary countries**.

## Hızlı Çözüm (TL;DR)

1. Address object: "Allowed-Countries" = Turkey + EU + US
2. Firewall policy: wan1 → internal + Source = Allowed-Countries only
3. Block all other countries

---

## 10:00 — Country-Based Address Object

Policy & Objects > Addresses > + Create New:

> 📸 **Ekran 1** — New Country Address  
> Type: **Geography**  
> Name: "Country-Turkey"  
> Country: Turkey  
> Interface: any

Birden fazla country için:
```
Name: "Country-EU-US"
Type: Geography-Group (multi-country)
Members:
  - Turkey
  - Germany, France, Netherlands, Italy (EU müşteriler)
  - United States
  - United Kingdom
```

## 10:10 — Inbound Block Policy

wan1'den internal'a sadece "allowed countries":

```
Policy & Objects > Firewall Policy > + Create:

Name: "Inbound-Allowed-Countries"
Incoming: wan1
Outgoing: internal (veya specific service)
Source: "Country-Turkey", "Country-EU-US" (multi-select)
Destination: VIP-WebShop-443 (veya server subnet)
Service: HTTPS
Action: Accept
```

### Deny Everything Else

Policy sırası önemli. Üst policy yukarıdaki, alt policy **deny all**:
```
Name: "Deny-All-Foreign"
Incoming: wan1
Outgoing: internal
Source: all
Destination: all
Action: Deny
Log: enable
```

Allowed-Countries match eden → geçer. Başkaları → deny.

## 10:20 — Outbound Block (Korumalı User)

Kullanıcılar yanlışlıkla malicious foreign site'a tıklarsa:

```
Policy: internal → wan1
Destination: "Country-Russia", "Country-China", "Country-NorthKorea"
Action: **Deny**
Log: enable
```

Admin mesajla: "Bu ülkeye erişim şirket politikası gereği engellendi."

## Database Update

FortiGate Geo-IP database FortiGuard'dan otomatik:
```
System > FortiGuard > Geo IP Database
Version: 0.01234
Last update: auto
```

Güncel database ile IP'lerin country mapping'i doğru.

## Yaygın Hatalar

### Legitimate Traffic Block Oldu

ISP proxy üzerinden "foreign IP" olabilir. Veya müşteri VPN üzerinden "Russian IP". Whitelist gerekirse:
```
Exception address: specific IP range
Policy order: allow before deny
```

### CDN Performance

Amazon CloudFront, Google CDN'leri `any country` — Geo-IP bazı content'i "US" / "IE" olarak görür. Block ile CDN yüklenmez. Whitelist:
```
Country-CDN-Providers: US, IE, NL, Singapore
```

### FortiGate Hatalı Country Lookup

Nadir. IP range update GEO database güncelle:
```
FG > Check for Updates > Geo-IP Database > Update now
```

## İlgili Rehberler

- [Event 4625 brute force](/blog/event-id-4625-brute-force-tespit-onlem)
- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)

---

**Perimeter security + Geo-IP + brute force koruma?** [Teknik görüşme.](/#contact)
