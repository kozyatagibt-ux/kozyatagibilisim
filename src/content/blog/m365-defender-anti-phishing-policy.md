---
slug: m365-defender-anti-phishing-policy
title: "M365 Defender Anti-Phishing Policy — Impersonation Protection"
type: cluster
pillar: 6
url: "/blog/m365-defender-anti-phishing-policy"
hedef_anahtar_kelime: "defender anti-phishing policy"
meta_description: "M365 Defender anti-phishing policy kurulum — CEO impersonation protection, user impersonation, mailbox intelligence, spoof filter."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Anti-Phishing"
product_family: "Microsoft 365 & Outlook"
---

## "CEO'muza Yalancı Mail Geldi — 'Acil Havale Yap' Diye"

Ayşe muhasebe müdürü. CEO'dan mail:
```
From: Ahmet Yılmaz <ahmet.yilmaz@firma-tr.com>  ← firma.com.tr değil, firma-tr.com
Subject: Acil - Havale Talimatı
```

Ayşe farkında değil. Acil demiş, havale yapacak. **Düzgün anti-phishing policy** yoksa bu mail normal inbox'a düşer.

Microsoft Defender **Anti-Phishing Policy** bu senaryoları yakalar.

## Hızlı Çözüm (TL;DR)

1. security.microsoft.com > Threat policies > Anti-phishing
2. New Policy: "Anti-Phishing - Executives"
3. Users to protect: CEO, CFO, CTO (executive list)
4. Custom Domain: firma.com.tr
5. Actions: Quarantine impersonation
6. Mailbox intelligence: ON
7. Spoof filter: Aggressive

---

## 10:00 — Policy Oluşturma

Security Portal > Anti-phishing > + Create:

> 📸 **Ekran 1** — New Anti-phishing Policy  
> Name: "Anti-Phishing - Executives + Impersonation"  
> Priority: 1 (highest)  
>   
> Apply to: Recipients — "All domain" (firma.com.tr)  
> Exceptions: none

## Policy Settings

### Phishing Email Threshold

> 📸 **Ekran 2** — Phishing threshold  
> ○ 1 - Standard  
> ○ 2 - Aggressive  
> ● **3 - More Aggressive**  
> ○ 4 - Most Aggressive  

"More Aggressive" (3) — balanced: yüksek detection, düşük false positive.

### Impersonation

> 📸 **Ekran 3** — Impersonation settings  
> ☑ **User impersonation protection**  
>   Protected users (executive):  
>   - Ahmet Yılmaz (CEO) - ahmet.yilmaz@firma.com.tr  
>   - Seda Demir (CFO) - seda.demir@firma.com.tr  
>   - Cem Kaya (CTO) - cem.kaya@firma.com.tr  
>   
> ☑ **Domain impersonation protection**  
>   Protected domains:  
>   - firma.com.tr (primary domain)  
>   - firma-tr.com.tr (lookalike) ← explicit ekleme  
>   
> ☑ **Mailbox intelligence**  
>   Mailbox intelligence için: ☑ ON  
>   Mailbox intelligence for impersonation: ☑ ON

### Actions

> 📸 **Ekran 4** — Actions  
> If message is detected as user impersonation:  
>   ● **Quarantine the message**  
>   ○ Delete  
>   ○ Move to Junk  
>   ○ Deliver with warning  
>   
> If domain impersonation:  
>   ● **Quarantine the message**  
>   
> Safety tips:  
>   ☑ Show first contact safety tip  
>   ☑ Show user impersonation safety tip  
>   ☑ Show domain impersonation safety tip  
>   ☑ Show user impersonation unusual characters safety tip

### Spoof Intelligence

> 📸 **Ekran 5** — Spoof settings  
> ☑ Enable spoof intelligence  
> If message is detected as spoof: **Quarantine**  

Save.

## 10:15 — Test

Test phishing simulation:
- Gmail'den: `ahmet.y1lmaz@firma.com.tr` (l yerine 1 — homograph)
- Subject: "Urgent — wire transfer"
- To: muhasebe@firma.com.tr

Mail beklenen:
- Quarantine'e düşer
- Kullanıcıya bildirim (security@firma.com.tr'ye)
- Alıcı kutuda görmüyor

Security admin quarantine'den mail'i inceler — malicious ise onaylar (delete), false positive ise release.

## Monitoring

Defender > Reports > Threat protection status > Phishing:
- Daily phishing attempts
- Top impersonated users (CEO başı çeker genelde)
- Action breakdown (quarantine vs delete)

Aylık CISO'ya rapor.

## User Training

Anti-phishing policy teknik koruma. **Kullanıcı eğitimi** tamamlayıcı:
- KnowBe4 veya Defender Attack Simulator
- Aylık phishing simulation
- Yıllık security awareness training

Teknik + insan = holistic phishing defense.

## İlgili Rehberler

- [Safe Attachments](/blog/defender-o365-safe-attachments-policy)
- [Safe Links](/blog/defender-o365-safe-links-policy)
- [DKIM aktivasyon](/blog/m365-dkim-aktif-etme-adim-adim-dns)

---

**Defender for O365 full stack deployment?** [Teknik görüşme.](/#contact)
