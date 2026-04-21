---
slug: fortigate-dns-filter-safe-search-aile-koruma
title: "FortiGate DNS Filter + Safe Search — Phishing Domain + Aile Koruması"
type: cluster
pillar: 4
url: "/blog/fortigate-dns-filter-safe-search-aile-koruma"
hedef_anahtar_kelime: "fortigate dns filter safe search"
meta_description: "FortiGate DNS filter profile — phishing domain engelleme, Google/YouTube Safe Search zorunlu, kategori bazlı DNS engelleme."
kelime_sayisi: "~700"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "DNS Filter"
product_family: "Fortinet & Firewall"
---

## "HTTPS Decrypt İstemiyoruz, Ama Phishing'i Engelleyelim"

Decrypt (deep SSL inspection) privacy tartışması uzun. Alternatif: **DNS seviyesinde engelleme**. URL henüz DNS query aşamasında "bu domain phishing" cevabı döner — sayfa bile yüklenmez.

## Hızlı Çözüm (TL;DR)

1. Security Profiles > DNS Filter > + Create
2. Categories: Malicious, Phishing, Newly Registered → **Block**
3. Google / YouTube Safe Search: **Force**
4. Policy'ye DNS Filter attach

---

## 10:00 — DNS Filter Profile

Security Profiles > DNS Filter > + Create:

> 📸 **Ekran 1** — DNS Filter  
> Name: "Corp-DNS-Filter"  
>   
> FortiGuard Categories:  
>   - Malicious Websites: **Block**  
>   - Phishing: **Block**  
>   - Newly Registered Domains: **Block**  
>   - Parked Domains: **Monitor** (adsense scam domains)  
>   - Adult Materials: **Block**  
>   - Gambling: **Block**  
>   
> Domain Filter:  
>   + Add pattern: "*.casino.*" → Block  
>   + Add pattern: "shop.firma.com.tr" → Allow (internal)  
>   
> ☑ **Enable FortiGuard Botnet Database**  

## 10:10 — Safe Search

> 📸 **Ekran 2** — Safe Search  
> ☑ **Enforce Google Safe Search**  
> ☑ **Enforce Bing Safe Search**  
> ☑ **Enforce YouTube Restricted Mode** (YouTube'da yetişkin içerik filter)

Bu ayar DNS seviyesinde "safe.google.com" gibi filtered version'a yönlendirir. Arama sonuçlarında adult content görünmez.

## 10:20 — Policy'ye Attach

Firewall Policy > Edit > Security Profiles:
```
DNS Filter: Corp-DNS-Filter
```

Apply. Artık LAN'dan yapılan DNS query'ler FortiGate üzerinden FortiGuard DNS'e.

## Test

User `malware.com`'a gitmek ister:
1. DNS query FortiGate'e
2. FortiGuard "malware.com = malicious"
3. Response: "sinkhole.fortiguard.com" (block page)
4. Browser "site blocked" sayfası

Phishing URL henüz yüklenmeden engel.

## Local DNS Override

Bazı internal domain'ler manuel yazmak:
```
DNS Filter > Domain Filter:
  intranet.firma.com.tr → Allow
  test.firma.com.tr → Allow
```

Ya da FortiGate kendi DNS server olarak kullanılabilir:
```
Network > DNS > DNS Service on Interface: internal → Enable
```

İç DNS'i FortiGate handle eder — external DNS'e gitmeden.

## Sinkhole Mode

Botnet C&C domain'ler için:
```
DNS Filter > Enable Botnet C&C Detection
Response: Sinkhole  (malware'i "tuzak" IP'ye yönlendir)
```

Compromise olmuş cihazlar botnet'e ulaşamaz. Ama traffic log'da görünür → BT tespit eder "bu makine compromise".

## İlgili Rehberler

- [Web Filter + App Control](/blog/fortigate-web-filter-application-control)
- [SSL Inspection](/blog/fortigate-ssl-inspection-deep-certificate)

---

**DNS security + phishing protection için uzman destek?** [Teknik görüşme.](/#contact)
