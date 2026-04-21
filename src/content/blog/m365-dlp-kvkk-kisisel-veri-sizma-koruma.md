---
slug: m365-dlp-kvkk-kisisel-veri-sizma-koruma
title: "M365 DLP Policy — KVKK Kişisel Veri Sızma Koruması"
type: cluster
pillar: 6
url: "/blog/m365-dlp-kvkk-kisisel-veri-sizma-koruma"
hedef_anahtar_kelime: "m365 dlp kvkk kisisel veri"
meta_description: "M365 Purview DLP (Data Loss Prevention) ile KVKK uyumlu koruma — TC kimlik + IBAN + kart no dış mail'de engelleme. Policy + sensitive info type."
kelime_sayisi: "~950"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "DLP Policy"
product_family: "Microsoft 365 & Outlook"
---

## "TC Kimlik'leri Mail ile Dışarı Gitmesin"

BT sorumlusu KVKK denetim sonrası bulgu: Muhasebe müşteri bilgilerini dış mail'e ek olarak gönderdi. TC kimlik + IBAN + adres PDF olarak external'a attı.

KVKK ciddi ihlal. **DLP (Data Loss Prevention) policy** otomatik engel.

## Hızlı Çözüm (TL;DR)

1. compliance.microsoft.com > Data Loss Prevention > Policies
2. + Create policy > "Custom" template
3. Sensitive info types: Turkey TC Identification + IBAN + Credit Card
4. Location: Exchange email + OneDrive + SharePoint + Teams
5. Condition: Content contains TC ID + recipient is external
6. Action: Block with notification

---

## 10:00 — DLP Policy Create

Purview > Data Loss Prevention > Policies > + Create policy:

> 📸 **Ekran 1** — Template selection  
> Start from:  
> ● **Custom** (TR için özel)  
> ○ Financial: PCI DSS, GDPR  
> ○ Privacy: PII, etc.  
> Next

## Name + Scope

> 📸 **Ekran 2** — Policy name  
> Name: "KVKK - Kişisel Veri Sızma Koruması"  
> Description: "TC + IBAN + Kart dış gönderimi engelle"  
> Admin units: (all)  
> Next

## Location

> 📸 **Ekran 3** — Policy location  
> ☑ Exchange email (all mailboxes)  
> ☑ SharePoint sites (all)  
> ☑ OneDrive accounts (all)  
> ☑ Teams chat and channel messages  
> ☑ Devices (endpoint DLP — Windows)  
> ☐ Instances (3rd party)  
> Next

## 10:10 — Sensitive Info Types

> 📸 **Ekran 4** — Conditions  
> Conditions > "+ Create rule":  
>   Name: "External + TC/IBAN"  
>   Conditions:  
>     **Content contains...**  
>       Sensitive info types:  
>         - **Turkey National Identification Number (TC)**  
>         - **IBAN (Turkey)**  
>         - **Credit Card Number**  
>       OR  
>       Minimum 1 match  
>     AND  
>     **Recipient**: External

Bu condition: Mail içinde TC/IBAN var VE dış alıcıya gidiyor.

Sensitive info types **default built-in** Microsoft'ta. Custom types oluşturmak da mümkün:

```
Purview > Data classifiers > Sensitive info types > + Create
Pattern: Türkçe "Müşteri No:" + 6 digit
```

## 10:20 — Actions

> 📸 **Ekran 5** — Actions  
> **Incident reports**:  
>   ☑ Send incident reports to: security@firma.com.tr, compliance@firma.com.tr  
>   
> **Restrict activities**:  
>   ☑ Restrict access or encrypt the content in Microsoft 365 locations  
>   ☑ **Block users from receiving email or accessing shared SharePoint/OneDrive files**  
>   
> **User notifications**:  
>   ☑ Notify users in Office 365 services with policy tip  
>   Policy tip text:  
>   "Bu e-posta TC kimlik veya IBAN bilgisi içeriyor. KVKK gereği dış alıcılara gönderimi engellendi. İzin gerekiyorsa compliance@firma.com.tr ile iletişime geçin."

## 10:25 — Override (User Opsiyonu)

"Gerçekten gönderim gerekli" senaryoları için user override:

> 📸 **Ekran 6** — Override options  
> ☑ Allow users to override  
>   ☑ Require business justification (kullanıcı neden göndermesi gerektiğini yazar)  
>   ☐ Require override approval (manager onayı)  
>   
> Audit log: evet (tüm override'lar log'lanır)

Kullanıcı "Override" tıkladığında:
1. Reason text box: "Müşteri bizzat kart bilgisini istedi, telefonla teyit edildi"
2. Send
3. Log: Security team 24 saat içinde inceler

## Test

Mail compose:
```
To: external@gmail.com
Subject: Hesap bilgileri
Body: TR33 0006 1005 1978 6457 8413 26
```

Send → **anında policy tip** görünür:
```
⚠ This message contains sensitive content that this organization 
doesn't allow you to send externally.
Policy tip text: ...
[Override] [Remove content and send]
```

User seçim yapar. Override → log + send. Remove → edit + send.

## 10:45 — Monitoring

Purview > DLP > Policy:
- Detection count
- Incidents by policy
- Top users (kim ne kadar sıklıkla tetikliyor)

Aylık rapor:
- 5 kişi sürekli TC gönderiyor → eğitim şart
- 0 false positive → policy accurate

## Endpoint DLP — USB'ye Kopyala Engelleme

Mail dışında USB'ye copy engelle:

Purview > Endpoint DLP > + New policy:
- Location: Devices
- Activity: Copy to removable storage → Block
- Sensitive info: TC + IBAN

Kullanıcı USB'ye copy yapamaz (content match'li dosyaları).

## Adaptive Protection

Purview 2024+ AI-based:
- Risky users (data exfiltration pattern)
- Dynamic DLP adjustment

E5 lisans feature.

## İlgili Rehberler

- [KVKK öz-denetim aracı](/kvkk-oz-denetim)
- [Retention Policy 10 yıl](/blog/m365-retention-policy-10-yil-saklama)
- [Anti-phishing policy](/blog/m365-defender-anti-phishing-policy)

---

**M365 DLP + KVKK uyum paketi için uzman destek?** [Teknik görüşme.](/#contact)
