---
slug: intune-autopilot-deployment-profile-yeni-laptop
title: "Intune Autopilot Deployment Profile — Yeni Laptop'u Zero-Touch Kur"
type: cluster
pillar: 6
url: "/blog/intune-autopilot-deployment-profile-yeni-laptop"
hedef_anahtar_kelime: "intune autopilot deployment profile"
meta_description: "Intune Autopilot deployment profile kurulum — yeni laptop kutudan çıkıp otomatik domain join, app install, policy apply. Hash upload ve profil atama."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/son-kullanici-destek"
troubleshoot: true
error_code: "Autopilot Profile"
product_family: "Microsoft 365 & Outlook"
---

## "100 Yeni Laptop Geldi, Hepsini Kurmak Kaç Saat?"

Önceki süreç:
- BT kişisi laptop açar, domain join, GPO apply, app install, user profile
- 50 dakika / laptop
- 100 laptop × 50 dk = **83 saat** (2 tam hafta)

Autopilot ile:
- Laptop direkt kullanıcıya kargo
- Kullanıcı kutudan çıkarır, wifi'a bağlar, email girer
- 15 dakika sonra her şey hazır
- IT 0 saat saha işi

## Hızlı Çözüm (TL;DR)

1. Hardware hash toplama (laptop satıcısından veya Windows PowerShell)
2. Intune'a hash upload
3. Deployment profile oluştur (user-driven, self-deploying vs. white-glove)
4. Device'a profile ata (group-based)
5. Yeni laptop OOBE (Out of Box Experience) — Autopilot tetiklenir

---

## Hardware Hash Nedir?

Her cihazın unique ID'si. Laptop satıcısı (Dell, HP, Lenovo) genelde:
- Kurumsal order'da hash'leri CSV olarak verir
- Satıcı direkt Microsoft'un Partner Center'ına upload eder

Eğer satıcı vermiyorsa manuel:
```powershell
# Laptop'ta OOBE'de Shift+F10 → PowerShell
Install-Script -Name Get-WindowsAutoPilotInfo -Force
Get-WindowsAutoPilotInfo.ps1 -OutputFile hash.csv
```

Hash.csv:
```
Device Serial Number,Windows Product ID,Hardware Hash
0123456789,,T0FwAEEAAAA...
```

## 10:00 — Intune'a Hash Upload

Microsoft Intune admin center:

> 📸 **Ekran 1** — Autopilot Devices  
> Devices > Enroll devices > Windows enrollment > **Windows Autopilot Devices**  
> "+ Import" button  
> CSV file select  
> Import

Hash'ler Intune'a yüklenir. 10-15 dk process.

## 10:15 — Deployment Profile

Devices > Enroll devices > Deployment profiles > + Create profile > Windows PC:

> 📸 **Ekran 2** — Create Deployment Profile  
> Name: "Corp Standard - User Driven"  
> Convert all targeted devices to Autopilot: **Yes**  
>   
> **Deployment Mode**:  
> ● User-Driven — user logs in with AAD credentials  
> ○ Self-Deploying — kiosk, display (no user) — manyetik cihaz  
> ○ Pre-provisioning — IT pre-provisions, sonra kullanıcıya teslim

## Out-of-Box Experience Config

> 📸 **Ekran 3** — OOBE settings  
> ☑ Hide privacy settings  
> ☑ Hide change account options (prevent local admin)  
> ☐ Skip keyboard selection page (default Türkçe)  
> User account type: **Standard User** (admin değil)  
> ☑ Allow Windows pre-provisioning  
> ☑ Apply device name template: "CORP-%RAND:5%"

## Join Type

> 📸 **Ekran 4** — Join to Azure AD  
> ● **Azure AD joined** (cloud-only)  
> ○ Hybrid Azure AD joined (on-prem AD + Azure AD)  

Hybrid seçerseniz Entra Connect hazır olmalı + on-prem AD yapılandırması.

Save.

## 10:30 — Device Group + Profile Assignment

Devices > Windows > Autopilot devices'taki cihazlar bir gruba ekle:

```powershell
# Azure AD Dynamic Group
membershipRule:
  (device.devicePhysicalIDs -any _ -startsWith "[ZTDId]")
```

Autopilot cihazlar otomatik bu gruba düşer.

Deployment profile > Assignments > + Select groups to include:
- "Autopilot Devices - Corp Standard"

Save.

## 10:45 — App Assignment (Önceden Kurulum)

Intune'da kurumsal app'ler cihaza önceden kuruluyor olacak:
- Microsoft 365 Apps (Office)
- Corporate VPN client
- Antivirus (Defender otomatik gelir)
- Custom LOB app (Line of Business)

Apps > + Add > (Microsoft 365 Apps — Assignment: Corp Standard group)

## 11:00 — Compliance Policy

Cihaz **compliant** olmalı:
- BitLocker aktif
- Minimum Windows version
- Firewall ON
- Antivirus real-time protection ON

Devices > Compliance policies > + Create policy > Windows 10+:
- Bitlocker encryption: Require
- Password: Min 8 char
- OS version: 10.0.19045.2846+ (Windows 10 22H2 baseline)

Assignment: Corp Standard group.

## 11:15 — Test — İlk Laptop

Fresh laptop kutudan çıkar:
1. Power on
2. WiFi select + connect
3. Language: Türkçe
4. "Sign in with Microsoft account" → `user@firma.com.tr` + password
5. Autopilot identification (hash match bulur)
6. Deployment profile apply:
   - Device name set: CORP-ABCDE
   - Azure AD join
   - Intune enroll
7. **Enrollment Status Page** (ESP) — app'ler kurulum
   - Microsoft 365 Apps: Installing... (8 dk)
   - VPN Client: Installing... (2 dk)
   - Compliance check: Pass ✓
8. Desktop ready. Kullanıcı çalışmaya hazır.

**Toplam: 15-20 dakika.** BT hiç dokunmadı.

## Yaygın Hatalar

### OOBE'de Autopilot Profile Apply Olmuyor

- Hash Intune'da registered mi?
- Profile Device Group'una assigned mi?
- Azure AD sync delay — 15-30 dk bekle

### ESP Takılıyor

App install fail — specific app hatası. ESP config'te:
```
Track installation progress for specific apps: (select only critical)
Timeout: 60 min
```

### "Something went wrong" - 0x801c0003

Bu hata için [dedicated bulten](/blog/bulten-intune-autopilot-white-glove-0x801c0003).

## White Glove Mode

IT tarafından pre-provision, sonra kullanıcıya teslim:
1. BT laptop'u OOBE'de aç
2. Shift+F10 → "Apply custom image"
3. Sign-in with IT admin
4. Autopilot White Glove mode
5. App'ler install, Bitlocker encrypt
6. 30-45 dk sonra "Ready to hand off"
7. Kullanıcı sadece kendi hesabıyla sign-in → hızlı başlangıç

End-user experience: 3 dakika.

## İlgili Rehberler

- [Intune Autopilot 0x801c0003 bülteni](/blog/bulten-intune-autopilot-white-glove-0x801c0003)
- [Conditional Access MFA for Admins](/blog/m365-conditional-access-require-mfa-admins)

---

**Modern workplace + Intune deployment için uzman destek?** [Teknik görüşme.](/#contact)
