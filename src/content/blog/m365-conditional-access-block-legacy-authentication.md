---
slug: m365-conditional-access-block-legacy-authentication
title: "Conditional Access — Block Legacy Authentication (IMAP/POP/SMTP AUTH)"
type: cluster
pillar: 6
url: "/blog/m365-conditional-access-block-legacy-authentication"
hedef_anahtar_kelime: "block legacy authentication conditional access"
meta_description: "Conditional Access ile Legacy Auth (IMAP, POP3, SMTP AUTH) blocking — phishing + password spray saldırılarına karşı kritik koruma."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Block Legacy Auth"
product_family: "Microsoft 365 & Outlook"
---

## "Password Spray Saldırısı — 200 Kullanıcıya Brute Force"

M365 Sign-in log'larında bir gecede:
```
80,000 failed logins from IP 185.143.223.47 (Rusya)
Users targeted: 200 unique
Protocol: IMAP4 (legacy)
Result: 3 successful (weak passwords)
```

3 kullanıcı compromise oldu. Sorun: **IMAP modern MFA'yı bilmiyor**. Legacy auth blocking kurulu değildi.

## Neden Legacy Auth Tehlikeli?

- MFA bypass
- OAuth token değil basic username + password
- Password spray saldırı kolay
- Microsoft 2022'de default kapattı ama tenant'a özel "enabled" olabilir

**Microsoft önerisi**: Hemen block.

## Hızlı Çözüm (TL;DR)

Conditional Access policy:
1. Users: All users (exclude break-glass)
2. Apps: All cloud apps
3. **Conditions > Client apps**:
   - Exchange ActiveSync
   - Other clients (IMAP, POP, SMTP AUTH, legacy Outlook)
4. Grant: **Block access**
5. Enable: **Report-only** → **On**

---

## 10:00 — Sign-in Logs — Legacy Auth Tespit

Azure AD > Sign-ins > Filter:
```
Client app: "Other clients" OR "IMAP4" OR "POP3" OR "SMTP Auth"
```

Bir hafta data. Hangi user'lar, hangi protokol:
```powershell
# Entra PowerShell
Get-AzureADAuditSignInLogs | 
    Where ClientAppUsed -match "IMAP|POP|SMTP|Other clients" |
    Group UserDisplayName | Sort Count -Descending
```

Çıktı:
```
Count Name
----- ----
  523 printer-kat2 (SMTP AUTH ile mail gönderiyor)
  187 scanner-depo (SMTP AUTH)
   45 muhasebe.user (IMAP — eski Android mail app)
```

Bu user'lar legacy auth kullanıyor. Block öncesi **modern auth'a geçirmek şart**.

## 10:15 — Modern Auth'a Geçiş

### Yazıcı / Scanner / IoT

Seçenek A: OAuth 2.0 destekleyen firmware'e upgrade.
Seçenek B: SMTP Relay Connector (yazıcılar için, [Relay rehberi](/blog/exchange-550-5-7-1-unable-to-relay-cozumu)).

### Kullanıcılar (Android Eski Mail App)

Android Outlook app indir. Exchange ActiveSync → Graph API modern auth.

## 10:30 — CA Policy Oluştur

```
New Policy > Name: "CA-004-Block-Legacy-Auth"
```

> 📸 **Ekran 1** — Conditions > Client apps  
> Conditions: "Client apps" tab  
> Configure: **Yes**  
> Seçimler:  
> - ☐ Modern authentication clients (Browser, Mobile apps + desktop clients) ← SEÇME  
> - ☑ **Exchange ActiveSync clients**  
>   ☑ Apply to supported platforms only  
> - ☑ **Other clients**  
>   - Authenticated SMTP (SMTP AUTH)  
>   - Auto-discover  
>   - IMAP4  
>   - POP3  
>   - MAPI over HTTP  
>   - Offline Address Book  
>   - Reporting web services  
>   - Other clients

**Modern auth SEÇME** — modern auth hedef değil, legacy hedef.

## 10:35 — Grant: Block

> 📸 **Ekran 2** — Access controls > Grant  
> ○ Grant access  
> ● **Block access**  
> Select

## 10:40 — Exclude Listesi (Önemli)

Legacy auth hâlâ ihtiyaç olan:
- **Printers/scanners** için özel grup (temporary)
- **Break-glass account**

Exclude:
- Users: Break-glass account
- Users: "LegacyAuth-Temporary-Exception" grubu (90 günlük)

## 10:45 — Report-Only → On

1 hafta report-only, log review. Authenticated SMTP kullanan başka bir client unexpected'ı fark etmezsen **On**.

## Monitoring Sonrası

Azure AD Sign-ins:
```powershell
Get-AzureADAuditSignInLogs -Filter "status/errorCode eq 53003" -Top 100
```

Status 53003 = "Access has been blocked by Conditional Access policies".

Legacy auth fail sayıları görülür. Her gün azalmalı — block başarılı.

## Önleyici — Smart Lockout

CA + Smart Lockout:
- 10 failed attempt sonrası hesap 60 dk lock
- Password spray saldırı başarısız
- Default enabled, ama parametre tune:
```powershell
# Entra PowerShell
$policy = Get-AzureADPolicy | Where DisplayName -eq "Smart Lockout"
# Edit thresholds
```

## Tenant-Wide Legacy Auth Disable

CA policy yerine tenant-level:
```powershell
Set-OrganizationConfig -SmtpClientAuthenticationDisabled $true
```

Tüm tenant SMTP AUTH kapalı. Ama user bazlı exception alamaz — CA daha granüler.

## İlgili Rehberler

- [Require MFA for Admins](/blog/m365-conditional-access-require-mfa-admins)
- [Event 4625 Brute Force](/blog/event-id-4625-brute-force-tespit-onlem)

---

**M365 Identity hardening için uzman destek?** [Teknik görüşme.](/#contact)
