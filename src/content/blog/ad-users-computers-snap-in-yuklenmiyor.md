---
slug: ad-users-computers-snap-in-yuklenmiyor
title: "'Cannot Load Active Directory Users and Computers Snap-in' — MMC Hatası"
type: cluster
pillar: 2
url: "/blog/ad-users-computers-snap-in-yuklenmiyor"
hedef_anahtar_kelime: "cannot load active directory users and computers snap-in"
meta_description: "ADUC açılmıyor, 'Cannot load the Active Directory Users and Computers snap-in' hatası. RSAT, .NET Framework ve MMC cache çözümleri."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "MMC Snap-in Error"
product_family: "Windows Server & Active Directory"
---

## "ADUC Açılmıyor"

BT stajyeri ilk gününde:

> "Active Directory Users and Computers'ı açmaya çalışıyorum, hata veriyor:

```
Microsoft Management Console

The snap-in below, referenced in this document, has been 
restricted by policy. Contact your administrator for details.

Active Directory Users and Computers
```

Veya başka bir varyant:
```
MMC could not create the snap-in. 
The snap-in might not have been installed correctly.

Name: Active Directory Users and Computers
CLSID: {E355E538-1C2E-11D0-8C37-00C04FD8FE93}
```

BT müdürü 3 dakikada çözdü — **RSAT eksik**. Bu yazı tüm yaygın sebepleri anlatıyor.

## Hızlı Çözüm (TL;DR)

1. **RSAT yüklü mü?** Windows 10/11 Optional Features'ta
2. Yüklüyse **GPO restriction** var mı kontrol (`gpresult /h`)
3. MMC cache bozuk olabilir — temizle
4. `.NET Framework` hasarlı olabilir — repair
5. Son çare — `dsa.msc` alternatiflerine geç (PowerShell)

---

## Sebep 1: RSAT Yüklü Değil

Windows'da ADUC default yok. **Remote Server Administration Tools (RSAT)** ayrı yükleme.

### Windows 10/11 için

> 📸 **Ekran 1** — Settings > Optional Features  
> Start > Settings > Apps > Optional Features  
> Veya: `ms-settings:optionalfeatures`  
> "Add an optional feature" tıkla  
> Arama: "RSAT"  
> Liste:  
> - RSAT: Active Directory Domain Services and Lightweight Directory Services Tools  
> - RSAT: DNS Server Tools  
> - RSAT: Group Policy Management Tools  
> - vs.

İhtiyaç olanları seç (genelde ilk 3), Install. 2-5 dakika.

### PowerShell ile RSAT

```powershell
# Tüm RSAT tools
Get-WindowsCapability -Online | Where {$_.Name -like "Rsat*"} | Add-WindowsCapability -Online

# Veya sadece AD tools
Get-WindowsCapability -Online -Name "Rsat.ActiveDirectory.*" | Add-WindowsCapability -Online
```

### Windows Server

Server zaten built-in, ama feature install gerekli:
```powershell
Install-WindowsFeature RSAT-AD-Tools
```

## Sebep 2: GPO Restriction

Kurumsal ortamda standart kullanıcıların MMC snap-in'leri açmasına GPO kısıtı olabilir:
```
Computer Configuration > Administrative Templates > 
Windows Components > Microsoft Management Console > 
Restricted/Permitted snap-ins
```

Check:
```cmd
gpresult /h c:\gpresult.html
```

HTML rapor. "Restricted Snap-ins" bölümüne bak. ADUC listede ise:
- BT admin grubuna eklenmişsin mi?
- Yönetici izin vermediyse BT müdürüne sor

## Sebep 3: MMC Cache Bozuk

`%appdata%\Microsoft\MMC\` klasöründe MMC cache:
```cmd
del /Q "%appdata%\Microsoft\MMC\*"
```

Sonra `dsa.msc` tekrar aç.

## Sebep 4: .NET Framework Hasarlı

MMC .NET tabanlı. Framework bozuksa snap-in yüklenmez.

```cmd
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
```

Sonra restart + ADUC.

## Sebep 5: CLSID Kayıt Bozuk

Registry'de snap-in CLSID kayıtları bozulmuş olabilir:
```
HKEY_CLASSES_ROOT\CLSID\{E355E538-1C2E-11D0-8C37-00C04FD8FE93}
```

Boş veya eksik ise RSAT reinstall gerekli:
```powershell
Remove-WindowsCapability -Online -Name "Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0"
# Reboot
Get-WindowsCapability -Online -Name "Rsat.ActiveDirectory.*" | Add-WindowsCapability -Online
```

## Alternatif: PowerShell ile AD Yönetim

GUI açılmasa bile PowerShell ile AD:

```powershell
# Module import
Import-Module ActiveDirectory

# Yeni user
New-ADUser -Name "Mehmet Yılmaz" -SamAccountName "mehmet.yilmaz" `
    -Path "OU=Users,DC=corp,DC=firma,DC=com,DC=tr" `
    -AccountPassword (ConvertTo-SecureString "TempPass!2024" -AsPlainText -Force) `
    -Enabled $true

# User search
Get-ADUser -Filter {SamAccountName -like "mehmet*"}

# Group üyelik
Add-ADGroupMember -Identity "Sales-Users" -Members mehmet.yilmaz

# Password reset
Set-ADAccountPassword -Identity mehmet.yilmaz -Reset -NewPassword (ConvertTo-SecureString "NewPass!2024" -AsPlainText -Force)

# Unlock
Unlock-ADAccount -Identity mehmet.yilmaz

# Disable
Disable-ADAccount -Identity mehmet.yilmaz

# Group listesi
Get-ADGroupMember -Identity "Domain Admins" | Select Name, SamAccountName
```

**PowerShell GUI'den daha hızlı** — scripting yapabilirsin, toplu işlem mümkün.

### Alternative GUI: Active Directory Administrative Center

Windows Server 2012+ built-in modern arayüz:
```cmd
dsac.exe
```

ADUC'tan daha modern, bazı özellikler daha kolay (Fine-grained password policy, Dynamic Access Control). ADUC açılmıyorsa buna geç.

## Yaygın Yanlışlar

### Windows Home Edition

Windows Home'da RSAT install edilemez — domain-join özelliği yok. BT cihazları **Pro veya Enterprise** olmalı.

### 32-bit / 64-bit Karışıklık

Eski RSAT versiyonları 32-bit. Yeni Windows 64-bit. Uyumsuzluk. Her zaman Windows versiyonuna uygun RSAT yükle.

### Windows Update Eksik

RSAT optional feature — Windows Update engineering'e bağlı. Eski Windows versiyonunda (1703 öncesi) RSAT desteklemiyor. Windows güncel olmalı.

## İlgili Rehberler

- [Trust relationship failed](/blog/trust-relationship-workstation-primary-domain-failed)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)

---

**AD tooling, RSAT deployment ve PowerShell AD automation için destek?** Kozyatağı Bilişim AD management paketi. [Teknik görüşme.](/#contact)
