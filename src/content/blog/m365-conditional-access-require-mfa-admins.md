---
slug: m365-conditional-access-require-mfa-admins
title: "Conditional Access — 'Require MFA for All Admins' Policy Kurulum"
type: cluster
pillar: 6
url: "/blog/m365-conditional-access-require-mfa-admins"
hedef_anahtar_kelime: "conditional access require mfa admins"
meta_description: "Microsoft 365 Conditional Access ile tüm admin rolüne MFA zorunlu policy — step by step Entra portal kurulum, report-only test, enforcement."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "CA MFA Setup"
product_family: "Microsoft 365 & Outlook"
---

## "Admin Hesapları MFA'sız — Acil Risk"

BT denetiminde bulgu: 5 Global Admin hesaptan 3'ü **MFA aktif değil**. Compromise olursa tenant tamamen ele geçer.

Çözüm: **Conditional Access — "Require MFA for Admins"** policy.

## Hızlı Çözüm (TL;DR)

1. Entra Admin Center > Security > Conditional Access
2. New Policy > Assignments:
   - Users: Directory roles > Global Admin + 8 diğer admin rol
   - Apps: All cloud apps
3. Grant: **Require multi-factor authentication**
4. Enable policy: **Report-only** (test)
5. 1 hafta log review, false positive yoksa **On**

---

## 10:00 — Policy Oluşturma

Azure Portal > Entra ID > Security > Conditional Access:

> 📸 **Ekran 1** — Conditional Access dashboard  
> Üstte: "+ New policy" button  
> Mevcut policies listesi  
> Insights + reporting section  

Click "+ New policy":

> 📸 **Ekran 2** — New Policy form  
> Name: "Require MFA for All Admin Roles"  
>   
> **Assignments**:  
> - Users: "What does this policy apply to?"  
> - Cloud apps or actions: "What is this policy for?"  
> - Conditions: "When does it apply?"  
>   
> **Access controls**:  
> - Grant / Block  
> - Session

## 10:05 — Users: Admin Roles

> 📸 **Ekran 3** — Users and groups  
> Include tab:  
> ○ All users  
> ● **Select users and groups**  
>   ☑ Users and groups (none seçili)  
>   ☑ **Directory roles** (preview)  
>   
> Directory roles expand:  
>   - Global Administrator  
>   - Privileged Role Administrator  
>   - User Administrator  
>   - SharePoint Administrator  
>   - Exchange Administrator  
>   - Conditional Access Administrator  
>   - Security Administrator  
>   - Helpdesk Administrator (opsiyonel)  
>   - Billing Administrator  
>   Select all critical roles  
>   
> Exclude tab:  
> ☑ "Break-glass account" ekle — MFA kırılırsa acil erişim için

**Break-glass account** kritik: MFA provider'ı down olsa bile tenant'a erişim kalır. 1 hesap, tokmak şifre (50 karakter), Bitwarden'da, 2 yönetici biliyor.

## 10:10 — Cloud Apps

> 📸 **Ekran 4** — Cloud apps or actions  
> Include: **All cloud apps**  
> Exclude: (boş bırak)

Tüm apps — kullanıcı Entra ID ile authenticate ettiği her yerde MFA.

## 10:15 — Conditions

> 📸 **Ekran 5** — Conditions (opsiyonel)  
> Device platforms: All  
> Locations: All  
> Client apps: All  
> Sign-in risk: All  

Başta hepsi default. Sonra tune edilebilir.

## 10:20 — Grant Control

> 📸 **Ekran 6** — Access controls > Grant  
> ● **Grant access**  
>   ☑ **Require multi-factor authentication**  
>   ☐ Require device to be marked as compliant  
>   ☐ Require Hybrid Azure AD joined device  
>   ☐ Require approved client app  
>   ☐ Require app protection policy  
>   
> For multiple controls: Require one of the selected controls

MFA required = admin login'de her seferinde MFA prompt.

## 10:25 — Enable — Report-Only (Test)

> 📸 **Ekran 7** — Policy enable radio  
> ○ Off  
> ● **Report-only** ← başla burada  
> ○ On

**Report-only** = Policy apply edilmiyor ama loglar "uygulanacaktı" diye.

1 hafta bekle. Sign-in log'larda her admin login'i trace:
- Policy applied
- MFA satisfied? Sometimes no (eski devices)

## 10:30 — Log İnceleme

Azure AD > Sign-ins:

> 📸 **Ekran 8** — Sign-ins log  
> Filter: User = Global Admin  
> Columns: Applied CA Policies  
>   
> Her log satırında "Conditional Access" tab:  
> - Require MFA for All Admin Roles: **Report-only (success)** — policy applied, MFA satisfied  
> - Veya: **Report-only (failure)** — MFA unsatisfied

Failure varsa:
- Admin MFA'sız login attempt — bu scenarinde enforcement engellerdi
- Follow-up: kullanıcıya MFA enroll zorla

## 10:45 — Enable — On (Production)

1 hafta sonra log'lar clean:

> 📸 **Ekran 9** — Policy enable  
> ● **On**  
> Save

Artık **enforcement aktif**. MFA'sız admin login imkansız.

## 11:00 — Admin MFA Enrollment

Adminlere policy enforcement öncesi MFA enroll:

```
https://aka.ms/mfasetup
```

veya sign-in'de otomatik prompt:
- Phone number (SMS)
- Authenticator app (QR code)
- FIDO2 key (YubiKey)

**Best practice**:
- Method 1: Microsoft Authenticator (push notification)
- Method 2: FIDO2 key (backup)
- Method 3: Phone SMS (last resort)

## Emergency — Break-Glass Account

MFA Provider Down senaryosu:
1. Global Admin log in
2. MFA prompt — cevap vermiyor (provider outage)
3. Sign-in fail
4. **Tenant'a hiç erişim yok**

Break-glass account sayesinde:
- "Emergency-Admin" hesap exclusion listesinde
- MFA'sız login yapar
- Acil erişim

Prosedür:
- Şifre 50 karakter random
- Bitwarden'da, 2 admin biliyor
- Kullanım log'lanır (Defender alert)
- Aylık test (yıllık unlock)

## Yaygın Hatalar

### "You must sign in with MFA" ama MFA kurmadım

Admin role'e atanan user için policy hemen apply. Çare:
- Exclude list'e geçici ekle
- MFA enroll, sonra exclude'dan çıkar

### Policy Name Çakışması

CA console'da yüz plus policy olabilir. Naming convention:
- "CA-001-Require-MFA-Admins"
- "CA-002-Block-Legacy-Auth"
- "CA-003-Require-Compliant-Device"

## İleri Seviye

### Block Legacy Auth (ikinci policy)

IMAP, POP3, SMTP AUTH gibi eski protokoller MFA desteklemiyor. Block CA:

Client apps condition:
- ☑ Exchange ActiveSync clients
- ☑ Other clients (legacy auth)

Grant: **Block access**.

Policy enable → legacy auth kullanan device'lar fail. IMAP yerine OAuth2 veya modern auth.

### Risk-Based CA

Sign-in risk:
- High risk: Require password reset + MFA
- Medium: MFA
- Low: No extra

Azure AD Premium P2 gerekli.

## İlgili Rehberler

- [M365 Send As permission](/blog/m365-send-as-permission-verme-adim-adim)
- [M365 DKIM aktif etme](/blog/m365-dkim-aktif-etme-adim-adim-dns)

---

**M365 security hardening, Conditional Access + Identity Protection için uzman destek?** [Teknik görüşme.](/#contact)
