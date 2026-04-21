---
slug: passwordless-fido2-windows-hello-deployment
title: "Passwordless Deployment — FIDO2 + Windows Hello for Business"
type: cluster
pillar: 1
url: "/blog/passwordless-fido2-windows-hello-deployment"
hedef_anahtar_kelime: "passwordless fido2 windows hello"
meta_description: "Passwordless kurumsal deployment — FIDO2 security key + Windows Hello for Business + Microsoft Authenticator. Entra ID kurulum, hybrid join."
kelime_sayisi: "~1150"
pillar_linki: "/hizmetler/kimlik-yonetimi"
---

## "Şifre Politikası Can Sıkıyor — Herkes Post-it'e Yazıyor"

Sıradan kurumsal:
- 90 günde bir zorla şifre değişimi
- 14+ karakter, karmaşıklık
- Sonuç: `Kozyatagi2026!`, `Kozyatagi2026@`, `Kozyatagi2026#`...
- Post-it monitor'da
- Helpdesk'e günde 5 "şifre reset" ticket

**Çözüm**: Passwordless. Hiç şifre yok.

## Hızlı Çözüm (TL;DR)

3 yöntem (Microsoft):
1. **Microsoft Authenticator** (phone-based) — en kolay deploy
2. **FIDO2 security key** (YubiKey, Feitian) — en güvenli
3. **Windows Hello for Business** (biometric) — native Windows

Entra ID'de enable → Conditional Access policy → kullanıcı enroll → şifre arka planda kalır.

---

## Neden Passwordless

### Şifre Sorunları

- %80+ veri ihlali credential teft ile (Verizon DBIR 2024)
- Phishing kolay hedef
- Şifre reset maliyeti $70/ticket (Forrester)
- User friction — unutur, kilitler

### FIDO2 Nasıl Çalışır

Public/private key cryptography:
- Kullanıcı enrollment: security key → Entra ID'ye public key gönderir
- Sign-in: Entra challenge → key PIN ile unlock → private key ile sign → verify
- Phishing-resistant (domain binding)
- Şifre hiç transit olmaz

## 10:00 — Ön Koşullar

### Lisans

- Entra ID P1 (M365 Business Premium / E3+)
- Windows 10/11 (Hello için)

### Tenant Config

Entra Admin > Security > Authentication methods:
- FIDO2 Security Key: ON
- Microsoft Authenticator: ON (passwordless)
- Windows Hello for Business: ON
- Temporary Access Pass: ON (onboarding için)

## 10:15 — FIDO2 Security Key Deploy

### Key Seçimi

| Key | Form Factor | Fiyat | Use Case |
|---|---|---|---|
| **YubiKey 5 NFC** | USB-A + NFC | ~$50 | Genel purpose |
| **YubiKey 5C NFC** | USB-C + NFC | ~$55 | Modern laptop |
| **YubiKey Bio** | USB-A + parmak izi | ~$85 | Yüksek güvenlik |
| **Feitian ePass K9** | USB | ~$25 | Bütçe |
| **Token2** | USB | ~$15 | Volume deploy |

Budget: 100 user × $30 ortalama = $3000. 2 key/user (primary + backup) = $6000.

### Enrollment

User journey:
1. Admin ön kayıt: **Temporary Access Pass** (TAP) oluştur
2. User my.microsoft.com > Security info > Add method > Security key
3. Key takılır, PIN setlenir
4. Touch sensor onay
5. Backup key için tekrar

```powershell
# Admin: TAP oluştur
Connect-MgGraph -Scopes "UserAuthenticationMethod.ReadWrite.All"
New-MgUserAuthenticationTemporaryAccessPassMethod `
    -UserId "ayse@domain.com" `
    -LifetimeInMinutes 240 `
    -IsUsableOnce $false
```

## 10:30 — Microsoft Authenticator Passwordless

### Deploy

Entra Admin > Authentication methods > Microsoft Authenticator:
- **Authentication mode**: "Passwordless"
- Target: All users / specific group

### User Enrollment

1. Authenticator app install
2. Add account > Work/school
3. Scan QR from my.microsoft.com
4. "Enable phone sign-in" toggle

### Sign-in Flow

- Username girilir
- Phone notification: "1AB — approve?"
- Number matching: ekranda 1AB → user seçer
- Face ID / fingerprint ile approve
- Login OK, şifre sorulmadı

## 10:45 — Windows Hello for Business

### Deploy Modes

1. **Cloud-only** (Azure AD joined) — basit
2. **Hybrid** (Entra Hybrid Join + AD) — klassik
3. **On-prem** (AD FS) — legacy

### Intune Policy

Intune > Devices > Enrollment > Windows Hello for Business:
- Configure: Enabled
- Minimum PIN length: 6
- Require uppercase: Not allowed (PIN, karmaşık olmasın)
- Biometric gestures: Allow
- Enhanced anti-spoofing: Required

### Key Trust vs Cloud Trust

- **Key Trust** — AD'ye cert issue, PKI gerekir, karmaşık
- **Cloud Trust** — Azure AD Kerberos, PKI'sız, önerilir (2022+)

```powershell
# Cloud Trust için: Azure AD Kerberos server object oluştur
Install-Module AzureADHybridAuthenticationManagement
Set-AzureADKerberosServer -Domain "domain.local" `
    -CloudCredential $cloudCred `
    -DomainCredential $domainCred
```

### User Experience

Cihaz Entra join → ilk login password → "Set up Windows Hello" prompt → PIN/face/fingerprint → sonraki login biometric.

## 11:00 — Conditional Access

Passwordless yetmiyor, CA ile zorunlu tut:

```
Policy: Require phishing-resistant MFA for admins
- Users: admin group
- Cloud apps: All
- Grant: Require authentication strength = "Phishing-resistant MFA"
```

Authentication strength built-in:
- MFA — any method
- Passwordless MFA — Authenticator or FIDO2 or WHfB
- Phishing-resistant MFA — FIDO2 or WHfB only (SMS/Authenticator dahil değil)

## 11:15 — Break-Glass

Emergency access account:
- 1-2 kişi (CIO + IT Lead)
- Şifre + FIDO2 key (2 key, 2 farklı safe'te)
- MFA exclude (CA policy'den muaf)
- Aylık login test (audit ile verify)
- Şifre 40+ karakter random, password manager'da değil, fiziksel safe'te

**Break-glass olmadan passwordless deploy ETME**. MFA provider down olursa locked out.

## 11:30 — Migration Plan

### Hafta 1-2: Admin Pilot

- Tüm IT admin FIDO2 key alır
- Privileged account'lar passwordless
- Break-glass kurulur

### Hafta 3-4: Exec + Senior Pilot

- C-level + department head
- Authenticator passwordless + WHfB
- Feedback + fine-tune

### Hafta 5-8: Genel Deploy

- Department by department
- User training 15 dk video
- Helpdesk ready (TAP issuance process)

### Hafta 9-12: Password Elimination

- Entra password policy: 90 day → never expires (passwordless'ta gereksiz)
- Eski self-service password reset log — kim hâlâ şifre kullanıyor
- Final: password remove authentication methods'tan (çok aggressive, opsiyonel)

## Troubleshooting

### "FIDO2 key not recognized"

- Windows 10 1903+ şart
- USB port issue — farklı port test
- Key firmware update (Yubico Manager)

### "Cannot add security key" (Entra portal)

- Authentication methods > FIDO2 > Enabled for "All users" mi?
- AAGUID restriction varsa bu key brand izinli mi?

### "Windows Hello not available"

- Device Entra joined mi (Azure AD joined, not Workgroup)?
- TPM 2.0 + Secure Boot var mı?
- Intune enrollment status > compliance?

## ROI

- Helpdesk password reset ticket ~%70 azalır
- Phishing başarı oranı %99 düşer (FIDO2 ile)
- User productivity: login 8 saniye → 2 saniye
- Cyber insurance indirim

YubiKey yatırımı: 100 user × $60 × 33 TL = ~200K TL bir kereye. Yıllık helpdesk tasarrufu ~300K TL (5 ticket/gün × 30 dk × 350 TL/saat).

## İlgili Rehberler

- [Conditional Access MFA](/blog/m365-conditional-access-require-mfa-admins)
- [Zero Trust Architecture](/blog/zero-trust-architecture-kobi-rehberi)
- [Entra Connect Sync](/blog/entra-connect-ad-sync-kurulum-hibrit)

---

**Passwordless migration + FIDO2 deployment için destek?** [Teknik görüşme.](/#contact)
