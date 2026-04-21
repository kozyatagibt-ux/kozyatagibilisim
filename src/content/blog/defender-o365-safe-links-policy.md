---
slug: defender-o365-safe-links-policy
title: "Defender for O365 — Safe Links Policy (URL Phishing Koruması)"
type: cluster
pillar: 6
url: "/blog/defender-o365-safe-links-policy"
hedef_anahtar_kelime: "defender o365 safe links"
meta_description: "Defender for O365 Safe Links — mail + Teams + Office link tıklamalarını phishing için real-time tarama. Policy + user click tracking."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Safe Links"
product_family: "Microsoft 365 & Outlook"
---

## "Tıkladığında Bile Güvenli"

Phishing mail'de URL "bugun-kampanya.com" → aslında credential harvesting site. Safe Attachments sadece eki tarar — **link tıklamasını değil**.

**Safe Links**: Her tıklamada URL real-time Microsoft threat intel'e kontrol edilir. Zararlı ise "Blocked" sayfası.

## Hızlı Çözüm (TL;DR)

1. security.microsoft.com > Threat policies > Safe Links
2. + Create > "Safe Links — Corp"
3. Recipients: All users in firma.com.tr
4. URL & click protection: ON
5. Apply real-time protection, track user clicks
6. Save

---

## 10:00 — Policy

Security Portal:

> 📸 **Ekran 1** — Safe Links  
> Email & collaboration > Policies > Threat policies > Safe Links  
>   
> "+ Create" > Name: "Safe Links — Corp"

Next → Recipients:
- Users and domains: firma.com.tr
- (Exception group opsiyonel)

## 10:05 — URL & Click Protection

> 📸 **Ekran 2** — Protection settings  
> Email:  
> ☑ On: Safe Links checks a list of known, malicious links when users click  
> ☑ **Apply Safe Links to email messages sent within the organization**  
> ☑ **Apply real-time URL scanning for suspicious links and links that point to files**  
> ☑ Wait for URL scanning to complete before delivering the message  
>   
> Teams:  
> ☑ **Safe Links in Microsoft Teams**  
>   
> Office 365 apps:  
> ☑ **Safe Links protection for Office**  
>   
> Click protection settings:  
> ☑ Track user clicks  
> ☐ Let users click through to the original URL (uncheck — strict)

Save.

## Dikkat — External Domain Links

Partner'a link gönderiyorsun:
```
https://firmaniz.com/documents.pdf
```

Safe Links bu link'i "sanitize" eder:
```
https://eur05.safelinks.protection.outlook.com/?url=https%3A%2F%2Ffirmaniz.com%2F...
```

Alıcı "rewritten URL" görür. Bazı partnerlar bu format'tan şikayet eder.

### Whitelisted URLs

```
Security Portal > Safe Links > Policy > URLs to not rewrite
Add: firmaniz.com
     partner-api.com
```

Bu domain'ler rewrite edilmez, doğrudan gönderilir.

## User Click Tracking

Defender > Reports > Threat protection status > URL click:
- Kim ne link'e tıkladı
- Result: Allowed / Blocked
- Phishing tren analizi

**KVKK**: User click tracking bazı ülkelerde "kişisel veri" — aydınlatma metninde belirt.

## Test

Kendin mail gönder içinde:
```
https://spamlink.testcategory.com
```

Tıkla → Safe Links `url-safe.protection.outlook.com` benzeri sayfa → scan → "This site is suspicious" uyarı.

## İlgili Rehberler

- [Safe Attachments](/blog/defender-o365-safe-attachments-policy)
- [DMARC + DKIM](/blog/m365-dkim-aktif-etme-adim-adim-dns)

---

**Defender for O365 full stack için uzman destek?** [Teknik görüşme.](/#contact)
