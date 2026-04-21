---
slug: onedrive-file-locked-another-user
title: "OneDrive 'File is Locked by Another User' — Office Online Lock Çözümü"
type: cluster
pillar: 6
url: "/blog/onedrive-file-locked-another-user"
hedef_anahtar_kelime: "onedrive file locked another user"
meta_description: "OneDrive / SharePoint'te 'This file is locked by another user' hatası — check-out state, Office session lock, force unlock çözümleri."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/dosya-paylasim"
troubleshoot: true
error_code: "File Locked"
product_family: "Microsoft 365 & Outlook"
---

## "Belgeyi Açamıyorum, Kimse de Açmamış"

Muhasebe müdürü:
> "Budget.xlsx açamıyorum. 'This file is locked for editing by Ayse.Demir' diyor. Ayşe Hanım 3 gün önce ayrıldı!"

Bu yazı OneDrive/SharePoint'te kilitli dosya açmayı anlatıyor.

## Sebep: Stale Lock

Office dosyalarını editing ederken lock yaratır. Eğer session düzgün kapanmazsa:
- Ayşe Office'i kapatmadan çıktı
- Bilgisayar crash oldu
- Session timeout düzgün process olmadı

Lock 10 dakikada otomatik release olmalı ama bazen "stuck" kalır.

## Hızlı Çözüm (TL;DR)

1. **10 dakika bekle** — auto release
2. Dosyaya "Check Out" ile açmayı dene
3. SharePoint portal'dan lock'u manuel kaldır
4. Admin PowerShell ile force unlock

---

## Çözüm 1: SharePoint Portal'dan Unlock

OneDrive / SharePoint web:

> 📸 **Ekran 1** — File context menu  
> Dosya sağ tık > "Version history"  
> Üst sağda ⚙ ikonu  
> "Unlock file" seçeneği (check-out release)  
> Confirm

Veya admin yetkisiyle:
```
SharePoint Admin Center > "More features" > 
Library Settings > "Manage files which have no checked in version"
```

## Çözüm 2: PowerShell ile Force Unlock

```powershell
Connect-SPOService -Url https://firma-admin.sharepoint.com

# Site collection + library
$site = "https://firma.sharepoint.com/sites/finance"
$library = "Documents"
$fileUrl = "/sites/finance/Documents/Budget.xlsx"

# Check-out bilgisi
Get-SPOSite $site | Select *Lock*

# Force check-in
Set-SPOUser -Site $site -LoginName "Ayse.Demir@firma.com.tr" -IsSiteCollectionAdmin $true

# SharePoint PnP module (daha güçlü)
Install-Module SharePointPnPPowerShellOnline
Connect-PnPOnline -Url $site -Interactive

# Force check-in
Set-PnPListItem -List $library -Identity 123 -Values @{"CheckOutStatus"="None"}
```

## Çözüm 3: Library Default Check-Out Off

Bazı library'lerde "Require Check Out" zorunlu. Kaldır:

> 📸 **Ekran 2** — Library Settings  
> Library > Settings > Versioning settings  
> "Require documents to be checked out before they can be edited?"  
> ● No

Bu ayardan sonra lock sorunu çok azalır.

## Çözüm 4: Co-Authoring Aktif

Office dosyalarını (Word, Excel, PowerPoint) **co-authoring mode**'da açmak lock yaratmaz — birden fazla kullanıcı aynı anda edit eder.

Co-authoring için:
- Dosya OneDrive/SharePoint'te olmalı (local değil)
- Office 365 Apps kullanılıyor olmalı
- Excel için "AutoSave" ON olmalı

Lokal disk'ten açan user diğerini bloklar. OneDrive URL'den açtırmak çözüm.

## Çözüm 5: Ayrılan Çalışan Hesabı

Gerçek sorun — ayrılan çalışanın OneDrive session'ı hâlâ aktif görünüyor.

Admin sign-out tetikle:
```powershell
Connect-MsolService
Get-MsolUser -UserPrincipalName ayse.demir@firma.com.tr | 
    Select -ExpandProperty StrongAuthenticationRequirements

# Force sign-out (tüm session)
Revoke-AzureADUserAllRefreshToken -ObjectId (Get-AzureADUser -SearchString "Ayse.Demir").ObjectId
```

Bu tüm Ayşe'nin session'larını invalidate eder → lock'lar release olur.

## Önleyici Strateji

### Offboarding Checklist

Çalışan ayrılırken:
1. Tüm Office app'leri kapat
2. OneDrive sync pause + sign-out
3. Teams sign-out
4. Password change + session revoke
5. AD hesabı disable

[Onboarding/Offboarding rehberi](/blog/calisan-onboarding-offboarding-it-checklist) detay.

### Auto-Unlock Policy

SharePoint Admin Center:
```powershell
Set-SPOSite -Identity $site -SharingCapability ExternalUserAndGuestSharing
Set-PnPTenantSite -Url $site -CheckOutStatus UnlockTimeout (20) # minutes
```

20 dk inactivity sonra auto unlock.

## İlgili Rehberler

- [OneDrive sync pending](/blog/onedrive-senkronizasyon-bekliyor-pending)
- [Onboarding / Offboarding checklist](/blog/calisan-onboarding-offboarding-it-checklist)

---

**M365 data governance uzman destek?** [Teknik görüşme.](/#contact)
