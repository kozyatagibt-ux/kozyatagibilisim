---
slug: ad-rodc-read-only-domain-controller-sube
title: "RODC (Read-Only Domain Controller) — Şube Ofisi Güvenli DC'si"
type: cluster
pillar: 2
url: "/blog/ad-rodc-read-only-domain-controller-sube"
hedef_anahtar_kelime: "read only domain controller rodc"
meta_description: "Active Directory RODC — Şube ofislerinde güvenli read-only DC. Password Replication Policy, credential caching, promote ve kurulum adımları."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "RODC Setup"
product_family: "Windows Server & Active Directory"
---

## "Küçük Şube Ofisimiz Güvensiz, Normal DC Koyamayız"

Firma 3 kişilik bir ofis açtı — doğu ilçelerinde küçük satış ofisi. Merkez-şube WAN bağlantısı olmazsa çalışanlar bekliyor. DC şart ama:
- Ofiste fiziksel güvenlik zayıf (çalınma riski)
- BT personeli yok
- Normal DC compromise olursa tüm domain etkilenir

Çözüm: **RODC (Read-Only Domain Controller)**.

## RODC Avantajları

**Yazma yok**: Kullanıcı şifresi değişikliği RODC'ye değil, merkez DC'ye yazılır.

**Credential cache kısıtlı**: Sadece atanmış kullanıcıların şifresi cache'lenir. Diğer herkes WAN üzerinden merkez DC'ye auth eder.

**Saldırı izole**: RODC compromise edilse bile:
- Sadece cache'li şifreler (şubedeki 3 kişi) risk
- Saldırgan diğer kullanıcı şifrelerini elde edemez

**Admin delegasyon**: RODC admin yetkisi Domain Admin gerektirmez — şube yöneticisi local admin.

## Hızlı Çözüm (TL;DR)

```powershell
# Yeni server'da
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools

Install-ADDSDomainController `
    -DomainName "corp.firma.com.tr" `
    -ReadOnlyReplica:$true `
    -SiteName "Ankara-Sube-Site" `
    -AllowPasswordReplicationAccountName "Ankara-Sube-Users" `
    -DelegatedAdministratorAccountName "ankara.admin" `
    -Credential (Get-Credential) `
    -SafeModeAdministratorPassword (Read-Host -AsSecureString "DSRM Password") `
    -Force:$true
```

---

## Ön Koşullar

- Forest functional level 2003+
- Site Ankara için tanımlı (bkz. [Yeni site + subnet](/blog/ad-yeni-site-subnet-olusturma-sube-ofis))
- Subnet 10.20.0.0/24 → Ankara-Site map
- WAN bağlantısı merkez-şube (VPN veya fiber)

## 10:00 — Password Replication Policy (PRP) Hazırlığı

PRP = "hangi kullanıcıların şifreleri RODC'de cache'lenir?"

### Adım 1: Ankara-Sube-Users Security Group

```powershell
New-ADGroup -Name "Ankara-Sube-Users" `
    -Path "OU=Groups,OU=IT,DC=corp,DC=firma,DC=com,DC=tr" `
    -GroupScope Global `
    -GroupCategory Security `
    -Description "Users whose passwords cache on Ankara RODC"
```

Ankara'daki 3 kişiyi ekle:
```powershell
Add-ADGroupMember -Identity "Ankara-Sube-Users" `
    -Members "emre.yildiz", "ayse.demir", "can.kara"
```

Bu 3 kişinin şifresi RODC'ye cache'lenir. Başka kullanıcı login ederse merkez DC'ye gider (yavaş).

## 10:05 — RODC Promote

```powershell
Install-ADDSDomainController `
    -DomainName "corp.firma.com.tr" `
    -ReadOnlyReplica:$true `
    -SiteName "Ankara-Sube-Site" `
    -AllowPasswordReplicationAccountName "Ankara-Sube-Users" `
    -DenyPasswordReplicationAccountName "Denied RODC Password Replication Group" `
    -DelegatedAdministratorAccountName "corp\emre.yildiz" `
    -Credential (Get-Credential) `
    -SafeModeAdministratorPassword (Read-Host -AsSecureString "DSRM Password") `
    -DatabasePath "D:\AD\NTDS" `
    -LogPath "D:\AD\Logs" `
    -SysvolPath "D:\AD\SYSVOL" `
    -InstallDns:$true `
    -Force:$true
```

Parametreler:
- **ReadOnlyReplica:$true** — RODC flag
- **SiteName** — hangi site'a yerleşsin
- **AllowPasswordReplicationAccountName** — PRP allow list
- **DenyPasswordReplicationAccountName** — hassas accounts (Domain Admins deny liste built-in)
- **DelegatedAdministratorAccountName** — local admin yetkisi şube yöneticisine

Reboot. 10 dk.

## 10:20 — Doğrulama

### RODC Durumu

```powershell
Get-ADDomainController -Identity "ANKARA-RODC" | 
    Select Name, IsReadOnly, Site
```

Çıktı:
```
Name         : ANKARA-RODC
IsReadOnly   : True
Site         : Ankara-Sube-Site
```

### Password Replication Policy Check

```powershell
Get-ADDomainControllerPasswordReplicationPolicy -Identity "ANKARA-RODC"
```

Allow + Deny listelerini döner.

### Cached Accounts

Bir kullanıcı RODC'ye login edince şifresi cache'lenir. Kontrol:
```powershell
Get-ADDomainControllerPasswordReplicationPolicyUsage `
    -Identity "ANKARA-RODC" -AuthenticatedAccounts
```

## Şubede Login Testi

Ankara'daki Emre login:
- RODC önce PRP'yi kontrol eder
- Emre allow list'te (Ankara-Sube-Users) → şifre cache'li → hızlı login
- WAN kopsa bile çalışabilir

Başkası (Domain Admin Burak) Ankara'ya gelip login dener:
- Burak allow list'te değil
- Deny list'te (Domain Admins built-in deny)
- RODC merkez DC'ye WAN üzerinden forward eder
- Yavaş login ama güvenli

## Prepopulate Cache

Kullanıcı ilk login yapmadan şifreyi cache'le (WAN problemi öncesi):

```powershell
# Merkez'den ya da ADAC
(Get-ADUser ayse.demir).SID | 
    ForEach-Object { Sync-ADObject -Object $_ -Source DC01 -Destination ANKARA-RODC -PasswordOnly }
```

Veya ADAC'ta user > "Advanced" > **Password Replication** > Add to cache.

## RODC Admin Delegation

`ankara.admin` hesabı RODC'nin local admin'i — ama **Domain Admin değil**:
- RODC'ye RDP ile login
- Lokal işlemler (services, log review, reboot)
- AD değişikliği yapamaz
- Merkez DC'ye erişim tipik kullanıcı

Compromise olursa risk sınırlı.

## Yaygın Hatalar

### Cached Kullanıcı Login Edemiyor

WAN kopuk ve kullanıcı cache'li değil olabilir.
```powershell
Get-ADDomainControllerPasswordReplicationPolicyUsage -Identity "ANKARA-RODC" -AuthenticatedAccounts
```

Bu kullanıcı listede değilse — merkez DC'ye gerek. WAN restore bekle.

### RODC "The local security authority was contacted by a remote caller"

Credential replication issue. DC01'den RODC'ye sync:
```powershell
Sync-ADObject -Object (Get-ADUser emre.yildiz) -Source DC01 -Destination ANKARA-RODC -PasswordOnly
```

### RODC'nin Metadata'sı AD'de Bozuk

Kaldırma:
```powershell
Uninstall-ADDSDomainController -ForceRemoval
```

Metadata cleanup:
```cmd
ntdsutil
metadata cleanup
...
```

[Event 2042 rehberi](/blog/ad-event-2042-too-long-since-replicated-tombstone) demote process'inde.

## Compromise Recovery

RODC fiziksel olarak çalındı / compromise senaryosunda:
1. Merkez DC'de RODC computer account disable
2. Cache'li kullanıcı şifrelerini reset (PRP allow list)
3. AD replication metadata cleanup
4. Yeni RODC promote (farklı hostname ile)

```powershell
# Adım 1
Disable-ADAccount -Identity "ANKARA-RODC$"

# Adım 2: Cache'li user'ları sıfırla
Get-ADDomainControllerPasswordReplicationPolicyUsage -Identity "ANKARA-RODC" -AuthenticatedAccounts |
    ForEach-Object {
        Set-ADAccountPassword -Identity $_ -Reset -NewPassword (ConvertTo-SecureString (New-Guid).Guid -AsPlainText -Force)
    }
```

Bu RODC'deki cache artık işe yaramaz.

## İlgili Rehberler

- [Yeni AD Site + Subnet](/blog/ad-yeni-site-subnet-olusturma-sube-ofis)
- [Yeni Domain Controller promote](/blog/ad-yeni-domain-controller-promote)
- [FSMO roles transfer](/blog/ad-fsmo-roles-transfer-dc1-dc2)

---

**Şube ofisi IT altyapı, RODC deployment ve güvenli uzak ofis için uzman destek?** Kozyatağı Bilişim AD multi-site paketimiz. [Teknik görüşme.](/#contact)
