---
slug: fortigate-web-filter-application-control
title: "FortiGate Web Filter + Application Control — Facebook/YouTube Kısıtlama"
type: cluster
pillar: 4
url: "/blog/fortigate-web-filter-application-control"
hedef_anahtar_kelime: "fortigate web filter application control"
meta_description: "FortiGate web filter profile + application control — kategori bazlı engelleme, Facebook/TikTok/BetSite kısıtlama. Schedule ile mesai saati policy."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Web Filter"
product_family: "Fortinet & Firewall"
---

## "Çalışanlar Mesai Saatinde Kumar Sitelerine Girmiş"

HR Defender'a gelen şikayet: Bir çalışan mesai saatinde kumar sitesinde kayıtlı bulundu. Firewall'da kontrol yok.

Çözüm: **Web Filter + Application Control** policy.

## Hızlı Çözüm (TL;DR)

1. Security Profiles > Web Filter > + New Profile
2. Kategoriler: Gambling, Adult, Malicious, Proxy Avoidance → **Block**
3. Social Media: **Monitor only** (mesai saati dışı — schedule ile)
4. Application Control: BetSites, P2P → Block
5. Firewall policy'ye attach

---

## 10:00 — Web Filter Profile

Security Profiles > Web Filter > + Create New:

> 📸 **Ekran 1** — Web Filter Profile  
> Name: "Corp-WebFilter-Standard"  
>   
> FortiGuard Categories:  
> - Potentially Liable:  
>   - Drug Abuse: **Block**  
>   - Hacking: **Block**  
>   - Illegal Content: **Block**  
>   - Malicious Websites: **Block**  
>   
> - Controversial:  
>   - Gambling: **Block**  
>   - Adult Materials: **Block**  
>   - Dating: **Block** (mesai saati)  
>   
> - Potentially Non-Productive:  
>   - Social Media: **Monitor** (mesai dışı izin)  
>   - Entertainment: Monitor  
>   - Shopping: Monitor  
>   
> - Bandwidth Consuming:  
>   - Streaming Media: **Warning** (kullanıcıya uyarı sayfası)  
>   
> - Security Risk:  
>   - Newly Registered Domains: **Block** (phishing pattern)  
>   - Phishing: **Block**  
>   
> - Local Categories:  
>   - (custom URL list) ← aşağıda

## Custom URL List

Belirli URL'leri her zaman block/allow:

```
Web Filter Profile > URL Filter tab > + Add:
Pattern: *.kumar.com
Type: Wildcard
Action: Block

Pattern: banka.com
Type: Simple
Action: Exempt (her zaman izin)
```

## 10:15 — Application Control

Security Profiles > Application Control > + Create:

> 📸 **Ekran 2** — App Control  
> Name: "Corp-AppControl"  
>   
> Categories:  
> - P2P: **Block** (BitTorrent, eDonkey, etc.)  
> - Proxy: **Block** (VPN bypass engelle)  
> - Social.Networking: Monitor (schedule ile)  
> - Storage.Backup (Dropbox, Mega): **Monitor** (shadow IT tespit)  
> - Game: Block  

### Specific App Block

"Facebook" specifically block:

> 📸 **Ekran 3** — Application Override  
> "+ Add Application"  
> Search: "Facebook"  
> Result: Facebook.Chat, Facebook.Message, Facebook.Video  
> Override:  
> - Facebook.Video: Block (office'te Facebook chat izin, video izleme engel)  
> - Facebook.Apps: Block

## 10:25 — Schedule (Mesai Saati)

Policy'ye schedule eklenir:

```
Policy & Objects > Schedules > + Create New:
Name: "Office-Hours"
Type: Recurring
Days: Mon, Tue, Wed, Thu, Fri
Start: 09:00
End: 17:00
```

Policy:
```
Source: LAN
Dest: Internet
Schedule: Office-Hours
Web Filter: Corp-WebFilter-Strict (gaming, social block)
```

İkinci policy mesai dışı:
```
Source: LAN
Dest: Internet  
Schedule: Always (or "Off-Hours")
Web Filter: Corp-WebFilter-Relaxed (social allow)
```

Mesai bitince farklı policy apply, daha gevşek.

## 10:35 — User Warning Page

Bazı kategorilerde **block yerine uyarı**:

Web Filter Profile > Categories > Streaming Media → **Warning**:
```
Action: Warning
Warning Page:
  "Streaming Media bant genişliği yoğun tüketir.
  Mesai saatinde kısıtlıdır. Yine de devam etmek için tıklayın..."
  [Proceed] [Cancel]
```

Kullanıcı Proceed derse site açılır ama log'lanır. Click-through = disincentive.

## 10:45 — Policy Apply

Firewall Policy'ye security profiles:

```
Policy & Objects > Firewall Policy > Edit:

Security Profiles:
  Web Filter: Corp-WebFilter-Standard
  Application Control: Corp-AppControl
  SSL Inspection: Certificate-inspection (veya deep)
  Antivirus: default
  IPS: default
```

Apply.

## 11:00 — Test + Monitoring

FortiGate Logs & Report > Security > Web Filter:
- Block events: user X → gambling site (blocked)
- Monitor: Facebook, YouTube usage tracking

Günlük rapor:
- Top blocked categories
- Top users accessing blocked content (uyarı için HR)
- Block success rate

## Yaygın Hatalar

### YouTube Block Ama Bazı Video Hâlâ Oynar

Embedded YouTube (başka site içinde). URL filter gereken:
```
Block: *youtube.com*
```

### Gmail Engellendi Ama İstenmiyor

Web Filter "Web-based Email" kategorisi block edildi. Ayrı exempt:
```
URL: mail.google.com → Exempt
```

### HTTPS Traffic Category Görünmüyor

SSL inspection aktif değil. Certificate-only en azından — SNI'dan domain görünür, category karar.

### Schedule Calışmıyor

Timezone kontrol:
```
config system global
    set timezone 50  # Istanbul UTC+3
end
```

## İlgili Rehberler

- [Traffic Shaping QoS](/blog/fortigate-traffic-shaping-qos-bandwidth)
- [SSL Inspection](/blog/fortigate-ssl-inspection-deep-certificate)
- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)

---

**FortiGate policy design + productivity management için uzman destek?** [Teknik görüşme.](/#contact)
