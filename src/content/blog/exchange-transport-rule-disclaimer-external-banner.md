---
slug: exchange-transport-rule-disclaimer-external-banner
title: "Exchange Transport Rule — External Sender Warning Banner + Disclaimer"
type: cluster
pillar: 6
url: "/blog/exchange-transport-rule-disclaimer-external-banner"
hedef_anahtar_kelime: "exchange transport rule external banner"
meta_description: "Exchange Online Transport Rule — dış mail'e 'EXTERNAL' banner + şirket disclaimer ekle. Anti-phishing + legal compliance + KVKK."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Transport Rule"
product_family: "Microsoft 365 & Outlook"
---

## "External Mail Hemen Belli Olsun"

Phishing tehditi karşısında en basit koruma — her dış mail'e **'EXTERNAL SENDER'** banner. Kullanıcı içe-dış ayırt eder.

## Hızlı Çözüm (TL;DR)

Exchange Admin Center > Mail flow > Rules > + Add:
- Apply if: Message is from outside the organization + not from specific IP
- Do: Prepend HTML disclaimer to body
- Save

---

## 10:00 — Transport Rule Create

EAC > Mail flow > Rules > + Create a new rule:

> 📸 **Ekran 1** — New Transport Rule  
> Name: "External Sender Warning Banner"  
>   
> Apply this rule if:  
> - The sender is located... **Outside the organization**  
> AND  
> - The recipient is located... **Inside the organization**  
> AND  
> - The subject or body doesn't include... "[EXTERNAL]" (infinite loop önleme)

## 10:05 — Banner Ekleme

> 📸 **Ekran 2** — Do the following  
> ● **Apply a disclaimer to the message...**  
> ● Prepend a disclaimer  
>   
> Disclaimer text (HTML):

```html
<div style="background-color:#fff4ce; border:2px solid #ffb900; padding:12px; margin:0 0 12px 0; font-family:Segoe UI,sans-serif; font-size:14px; color:#333;">
<strong style="color:#c00;">⚠ EXTERNAL SENDER</strong>
Bu e-posta şirket dışından gelmiştir. Gönderen adresini doğrulayın. 
Ek veya linkleri tıklamadan önce <strong>dikkatli olun</strong>.
Şüphe halinde BT departmanına bildirin: <a href="mailto:security@firma.com.tr">security@firma.com.tr</a>
</div>
```

"Fallback action if the disclaimer can't be applied:"
- **Wrap** (HTML okuma sorunu yaşarsa mail en azından gönderilsin)

## 10:10 — Exceptions

Trusted partner'lardan gelen banner yorma:

> 📸 **Ekran 3** — Exceptions  
> Except if:  
>   The sender's domain is... "trustedpartner.com"  
>   OR  
>   The sender IP is in range... "203.0.113.0/24"

Save.

## Test

Gmail'den test mail gönder → şirket mail'i aç → banner:

```
⚠ EXTERNAL SENDER
Bu e-posta şirket dışından gelmiştir...
[normal mail body]
```

## Company Disclaimer (Compliance)

Outgoing mail'e şirket disclaimer eklemek:

```
Apply this rule if:
- The sender is located Inside the organization
- The recipient is located Outside the organization

Do the following:
- Apply a disclaimer → APPEND (body sonuna)
- HTML:
```

```html
<hr>
<p style="font-size:11px; color:#666;">
<b>Kozyatağı Bilişim Ltd. Şti.</b><br>
Umut Sokak No:8/F2, Quick Tower, Ataşehir, İstanbul<br>
Bu e-posta ve ekleri gizlidir. Yanlış ulaşmışsa silin ve göndericiyi bilgilendirin.<br>
This email and attachments are confidential. If received in error, please delete and notify sender.
</p>
```

Her outbound mail'e yasal disclaimer otomatik.

## Advanced Senaryolar

### VIP Executive için Özel Uyarı

```
Apply this rule if:
- The sender is located Outside
- The recipient is one of... ceo@firma.com.tr, cfo@firma.com.tr

Do:
- Apply disclaimer: "⚠ EXECUTIVE IMPERSONATION CHECK — Gönderenin gerçek olduğunu doğrulayın!"
```

### Country-Based

Belirli ülkelerden gelen mail'e ekstra uyarı:
- The sender's IP address is in range: ... (Rusya, Çin IP range'leri)
- Apply warning: "High-risk country"

IP range listeleri MaxMind veya firewall feed'den.

## İlgili Rehberler

- [Safe Links](/blog/defender-o365-safe-links-policy)
- [Anti-phishing policy](/blog/m365-defender-anti-phishing-policy)
- [DKIM](/blog/m365-dkim-aktif-etme-adim-adim-dns)

---

**Exchange Online + M365 mail security için uzman destek?** [Teknik görüşme.](/#contact)
