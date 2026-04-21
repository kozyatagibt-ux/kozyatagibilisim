---
slug: defender-o365-safe-attachments-policy
title: "Defender for O365 — Safe Attachments Policy Kurulum"
type: cluster
pillar: 6
url: "/blog/defender-o365-safe-attachments-policy"
hedef_anahtar_kelime: "defender o365 safe attachments"
meta_description: "Microsoft Defender for O365 Safe Attachments policy kurulum — mail eklentileri sandbox'ta zararlı test, dynamic delivery, zero-hour auto purge."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Safe Attachments"
product_family: "Microsoft 365 & Outlook"
---

## "Zararlı Eklentiden Şirket Ransomware Aldı"

BT müdürü post-incident raporda:
> "Sahte PDF eklentisi muhasebeye geldi. Kullanıcı açtı. Defender yoktu. 2 saatte 40 makine şifreli."

Çözüm: **Safe Attachments** — her gelen mail eklentisi **sandbox'ta** açılır, zararlı ise **bloklanır**.

## Prerequisite

- **M365 Business Premium** VEYA
- **Defender for Office 365 Plan 1** (standalone)

Basic/Standard tenant'larında Safe Attachments yok.

## Hızlı Çözüm (TL;DR)

1. `security.microsoft.com` > Policies > Threat policies > Safe Attachments
2. New Policy > Name + scope (tüm kullanıcılar)
3. **Dynamic Delivery** mode seç (kullanıcı eki aldığında önce "preview", zararlı ise delete)
4. Save → 5 dk propagation

---

## 10:00 — Policy Oluşturma

Security portal:

> 📸 **Ekran 1** — Safe Attachments  
> Email & collaboration > Policies > Threat policies > Safe Attachments  
> Liste: Default policy + Standard/Strict preset  
> "+ Create" button

New Policy:

> 📸 **Ekran 2** — Policy form  
> Name: "Safe Attachments — Corp"  
> Description: "Sandbox all incoming attachments"  
> Next  
>   
> Recipients:  
> - Users and domains: firma.com.tr  
> - Groups (Exclude): "Safe-Attach-Exception" (opsiyonel)  
> Next  
>   
> **Response**:  
> ○ Off (scan but deliver)  
> ○ Monitor (log only)  
> ○ Block (zararlı ise sil)  
> ● **Dynamic Delivery** (önerilen)  
>   
> Dynamic Delivery: Mail body + safe eki hemen gelir. Eki sandbox'ta scan ediliyor iken "placeholder". Clean ise gerçek eki teslim, değilse bloklanır.

## 10:05 — Redirect (opsiyonel)

Zararlı bulunan eki quarantine veya başka mailbox'a yönlendir:

```
Redirect attachments on detection: ✓
Send to: security@firma.com.tr
```

SecOps bu mailbox'ta zararlı eklerini inceler.

## 10:10 — Apply + Verify

Save → 5 dk M365 global apply.

Test:
- EICAR test file eki gönder: 
  ```
  X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*
  ```
  Txt dosyasında.

Safe Attachments tetiklenir → block.

## Monitoring

Defender > Reports > Mail flow > Threat protection status:
- Detected attachments
- Action taken
- Top attacked users

Haftalık rapor SecOps'a mail.

## ZAP (Zero-Hour Auto Purge)

Safe Attachments complementary feature. **Mail zaten kullanıcı inbox'ında** ama sonradan Microsoft "zararlı" olarak işaretlerse — otomatik inbox'tan siler.

```powershell
Set-AntiPhishPolicy -Identity Default -EnableOrganizationDomainsProtection $true
```

ZAP default aktif ama doğrulama:
```powershell
Get-OrganizationConfig | Select IsDehydrated, ZAP*
```

## Safe Links (Complementary)

Mail içindeki URL'ler için:
- User click ederken URL Microsoft tarafından re-check
- Zararlı ise "This site might be unsafe"

Safe Attachments + Safe Links = modern email protection full stack.

## İlgili Rehberler

- [DKIM aktif etme](/blog/m365-dkim-aktif-etme-adim-adim-dns)
- [Ransomware ilk 72 saat](/blog/ransomware-ilk-72-saat-vaka-analizi)

---

**Defender for O365 full deployment için uzman destek?** [Teknik görüşme.](/#contact)
