---
slug: teams-message-not-delivered-system-error
title: "Teams 'This message couldn't be delivered' — Sistem Hatası Çözümü"
type: cluster
pillar: 6
url: "/blog/teams-message-not-delivered-system-error"
hedef_anahtar_kelime: "teams message not delivered"
meta_description: "Microsoft Teams 'This message wasn't sent. Please try again' hatası — Teams client, network, license ve service health sorunları."
kelime_sayisi: "~800"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Teams Message Not Delivered"
product_family: "Microsoft 365 & Outlook"
---

## "Teams'te Mesajlar Gitmiyor"

Satış ekibi kanal mesajı atıyor, kırmızı ünlem:

```
⚠ This message wasn't sent. Please try again.
```

Retry → yine fail. 3 kişi benzer şikayet.

## Hızlı Çözüm (TL;DR)

1. Teams Client restart (sistem tepsisi > Quit → yeniden aç)
2. Network connectivity → `Test-NetConnection teams.microsoft.com -Port 443`
3. Teams status page: https://status.office365.com
4. Cache temizle: `%appdata%\Microsoft\Teams` içeriğini sil
5. Client sign-out + sign-in

---

## Sebep 1: Teams Service Outage

Microsoft side service health:
```
https://status.office365.com/
Admin Center > Service Health > Current issues
```

"Users cannot send messages" gibi incident varsa — **Microsoft çözene kadar bekle**. Genelde 1-4 saat.

## Sebep 2: Client Cache Bozuk

### Classic Teams
```cmd
%appdata%\Microsoft\Teams
```
Folder içeriğini sil. Teams açılınca baştan yükler.

### New Teams (2.0)
```cmd
%localappdata%\Packages\MSTeams_8wekyb3d8bbwe\LocalCache\
```
Aynı şekilde temizle.

## Sebep 3: Network / Firewall

Teams **TCP 443 + UDP 3478-3481** gerektirir. Firewall bloklamış olabilir:

```powershell
Test-NetConnection teams.microsoft.com -Port 443
Test-NetConnection config.teams.microsoft.com -Port 443
```

Başarısızsa network ekibi ile Teams URL listesi (Microsoft docs) whitelist.

## Sebep 4: License Missing

Kullanıcıya Teams lisansı atanmamış veya geçici revoke:
```powershell
Connect-MsolService
Get-MsolUser -UserPrincipalName user@firma.com.tr | 
    Select UserPrincipalName, @{N='Licenses';E={$_.Licenses.AccountSkuId}}
```

Lisans yoksa ekle:
```powershell
Set-MsolUserLicense -UserPrincipalName user@firma.com.tr -AddLicenses "firma:ENTERPRISEPACK"
```

## Sebep 5: Teams Admin Center Messaging Policy

Admin tarafında kanal mesajı kısıtlı olabilir:
```
Teams Admin Center > Messaging policies > Global (or specific)
- Send messages: OFF for a group
```

Bu policy user'a atanmışsa mesaj gönderemez. Global default → Allow.

## Sebep 6: Conditional Access Block

CA policy Teams'i block ediyor olabilir:
- User uyumsuz device'tan connect oluyor
- Location policy dışı

Azure AD > Sign-ins log'unda user için "Microsoft Teams" app failed sign-in:
- "Access has been blocked by Conditional Access"

Policy exception ekle veya kullanıcıya compliant device.

## Sebep 7: Multi-Factor Auth Token Expired

Token eski. Teams sign-out + sign-in:
```
Profile icon > Sign out → Sign in → MFA

Veya
Ctrl+R (app refresh)
```

## Son Çare — Fresh Install

```powershell
# Kaldır
Get-AppxPackage Microsoft.OutlookForWindows | Remove-AppxPackage
# Teams Classic için:
# Control Panel > Uninstall > Teams
# %appdata%\Microsoft\Teams sil

# Yeniden kur
winget install Microsoft.Teams
```

## İlgili Rehberler

- [Teams kamera çalışmıyor](/blog/teams-kamera-calismiyor-siyah-ekran)
- [Teams Classic EOL bülteni](/blog/bulten-teams-classic-eol-temmuz-2025)

---

**M365 endpoint desteği için?** [Teknik görüşme.](/#contact)
