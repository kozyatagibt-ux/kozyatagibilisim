---
slug: ad-recycle-bin-enable-silinmis-user-restore
title: "AD Recycle Bin Aktif Etme + Silinmiş Kullanıcıyı Geri Yükleme"
type: cluster
pillar: 2
url: "/blog/ad-recycle-bin-enable-silinmis-user-restore"
hedef_anahtar_kelime: "active directory recycle bin restore deleted user"
meta_description: "AD Recycle Bin'i aktif edip silinmiş kullanıcı, grup ve OU'ları geri yükleme. ADAC + PowerShell ile step-by-step rehber."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "AD Recycle Bin"
product_family: "Windows Server & Active Directory"
---

## "Yanlışlıkla 5 Kullanıcıyı Sildim"

BT uzmanı Melis cleanup yaparken bir OU'dan **5 kullanıcıyı yanlışlıkla sildi**. Bunlar aktif çalışanlardı — yarın sabah erişim olmayacak.

> "Backup'tan restore saatler sürer. AD Recycle Bin aktif mi?"

Test:
```powershell
Get-ADOptionalFeature -Filter "Name -eq 'Recycle Bin Feature'" | 
    Select Name, EnabledScopes
```

Çıktı:
```
Name                   EnabledScopes
----                   -------------
Recycle Bin Feature    {}
```

**EnabledScopes boş** → Recycle Bin **aktif değil**. Silinen kullanıcılar recovery imkansız, backup'tan restore gerek.

Dersler öğrenildi. Bu yazı hem **Recycle Bin aktif etme** hem **silinmiş obje restore** adımlarını anlatıyor.

## Hızlı Çözüm (TL;DR)

### Recycle Bin Aktif (bir kez, geri alınamaz)
```powershell
Enable-ADOptionalFeature "Recycle Bin Feature" `
    -Scope ForestOrConfigurationSet `
    -Target "corp.firma.com.tr"
```

### Silinmiş User Restore
```powershell
Get-ADObject -Filter {isDeleted -eq $true -and Name -like "*mehmet*"} `
    -IncludeDeletedObjects -Properties * |
    Restore-ADObject
```

---

## AD Recycle Bin Nedir?

Windows Server 2008 R2+ feature. AD objeleri silindiğinde:

**Aktif DEĞİLSE**:
- Obje "tombstone"a döner
- Tüm attribute'lar **temizlenir** (name, displayName, memberOf)
- Sadece sID + GUID kalır
- Restore ederken attribute'lar **geri gelmez** (manuel doldurman gerek)

**Aktif İSE**:
- Obje silinince **"Deleted Objects"** container'ına gider
- Tüm attribute'lar **korunur** (memberOf, description, vs.)
- Tombstone Lifetime (180 gün default) içinde tek komutla **tam restore** mümkün
- Full fidelity — hiçbir manuel çalışma yok

## Aktif Etme — Önemli Notlar

### 1. Forest Functional Level

Minimum **Windows Server 2008 R2**:
```powershell
Get-ADForest | Select ForestMode
```

`Windows2008R2Forest` veya üstü olmalı. Değilse:
```powershell
Set-ADForestMode -ForestMode Windows2008R2Forest -Identity "corp.firma.com.tr"
```

### 2. Geri Dönüşü Yok

Recycle Bin bir kez aktif edilince **kapatılamaz**. Bu yüzden yaygınlık:
- Test ortamında önce dene
- Sonra production'da kalıcı aktif et

### 3. Storage Impact

Silinmiş objeler 180 gün (tombstone lifetime) tutulur. AD DB boyutu ~5-10% artabilir.

## 10:00 — Aktif Etme

### GUI: Active Directory Administrative Center (ADAC)

```cmd
dsac
```

> 📸 **Ekran 1** — ADAC sol panel  
> Sol panel: "corp (local)" domain  
> Üst menü: Tasks panel  
> "Enable Recycle Bin..." linki görünür (henüz aktif değilse)

Tıkla → onay dialog:

> 📸 **Ekran 2** — Confirm dialog  
> "Are you sure you want to enable the Recycle Bin? After enabling, it cannot be disabled."  
> OK

Aktif edildi.

### PowerShell

```powershell
# Aktif et
Enable-ADOptionalFeature "Recycle Bin Feature" `
    -Scope ForestOrConfigurationSet `
    -Target "corp.firma.com.tr"

# Doğrula
Get-ADOptionalFeature -Filter "Name -eq 'Recycle Bin Feature'" | 
    Select Name, EnabledScopes
```

Çıktı şimdi:
```
Name                   EnabledScopes
----                   -------------
Recycle Bin Feature    {CN=Partitions,CN=Configuration,DC=corp,...}
```

Aktif. Replication ile tüm DC'lere yayılır (15 dk-2 saat).

## Silinmiş Obje Restore

### GUI Yöntemi — ADAC

> 📸 **Ekran 3** — ADAC Deleted Objects container  
> Sol panelde "corp (local)" > **Deleted Objects**  
> (Recycle Bin aktif olunca görünür)  
> Sağ panelde silinmiş objeler listesi:  
> - Mehmet Yılmaz (user) — silinme tarihi  
> - Can Kara (user) — silinme tarihi  
> - Sales-2022 (group) — silinme tarihi  
> Her satırda: Name, Type, When Deleted, Last Known Parent

User sağ tık:

> 📸 **Ekran 4** — Restore options  
> Menu:  
> - **Restore** (orijinal OU'ya geri yükle)  
> - **Restore To...** (farklı OU'ya)  
> - Properties  
> - Delete (permanent silme)

**Restore** tıkla → 3 saniye → Kullanıcı geri geldi:
- Tüm attribute'ları (isim, e-mail, phone)
- Tüm grup üyelikleri
- Orijinal DN'i
- Aynı SID (önemli — permissions korunur)

### PowerShell Yöntemi

#### Silinmiş Obje Listele

```powershell
Get-ADObject -Filter {isDeleted -eq $true -and Name -ne "Deleted Objects"} `
    -IncludeDeletedObjects -Properties whenChanged, lastKnownParent |
    Select Name, ObjectClass, whenChanged, lastKnownParent |
    Format-Table
```

Çıktı:
```
Name                                             ObjectClass  whenChanged     lastKnownParent
----                                             -----------  -----------     ---------------
Mehmet Yılmaz\0ADEL:xxxxx-xxxx-xxxx-xxxx-xxxxxxxx user         5/12/2024 9:45  OU=Users,DC=corp,...
Can Kara\0ADEL:yyyyy-yyyy-yyyy-yyyy-yyyyyyyy      user         5/12/2024 9:46  OU=Users,DC=corp,...
Sales-2022\0ADEL:zzzzz-zzzz-zzzz-zzzz-zzzzzzzz    group        5/12/2024 9:47  OU=Groups,DC=corp,...
```

#### Tek Obje Restore

```powershell
Get-ADObject -Filter {Name -like "Mehmet*"} -IncludeDeletedObjects | 
    Restore-ADObject
```

#### Toplu Restore (bir OU'dan silinmişleri)

```powershell
$parentOU = "OU=Users,DC=corp,DC=firma,DC=com,DC=tr"

Get-ADObject -Filter {isDeleted -eq $true -and lastKnownParent -eq $parentOU} `
    -IncludeDeletedObjects | Restore-ADObject
```

### Belirli Tarih Aralığındaki Silinmişler

Bugün (5/12/2024) silinenler:
```powershell
$today = (Get-Date).Date

Get-ADObject -Filter {isDeleted -eq $true} -IncludeDeletedObjects -Properties whenChanged |
    Where {$_.whenChanged -ge $today} |
    Select Name, ObjectClass, whenChanged
```

## 10:05 — Melis Restore Yapıyor

```powershell
# Bugün silinen user'ları listele
Get-ADObject -Filter {isDeleted -eq $true -and ObjectClass -eq 'user'} `
    -IncludeDeletedObjects -Properties whenChanged |
    Where {$_.whenChanged -ge (Get-Date).Date} |
    Select Name, whenChanged
```

Çıktı:
```
Name                                              whenChanged
----                                              -----------
Mehmet Yılmaz\0ADEL:xxxxx-xxxx-xxxx-xxxx-xxxxxxxx 5/12/2024 10:01
Can Kara\0ADEL:yyyyy-yyyy-yyyy-yyyy-yyyyyyyy       5/12/2024 10:01
Elif Demir\0ADEL:aaaaa-aaaa-aaaa-aaaa-aaaaaaaa    5/12/2024 10:01
Ahmet Çelik\0ADEL:bbbbb-bbbb-bbbb-bbbb-bbbbbbbb   5/12/2024 10:01
Ayşe Yılmaz\0ADEL:ccccc-cccc-cccc-cccc-cccccccc   5/12/2024 10:01
```

Tüm 5 kullanıcı. Restore:
```powershell
Get-ADObject -Filter {isDeleted -eq $true -and ObjectClass -eq 'user'} `
    -IncludeDeletedObjects -Properties whenChanged |
    Where {$_.whenChanged -ge (Get-Date).Date} |
    Restore-ADObject
```

Tüm 5'i saniyeler içinde geri geldi. Doğrulama:
```powershell
Get-ADUser mehmet.yilmaz -Properties memberOf | Select Name, Enabled, memberOf
```

Enabled, tüm gruplar korundu.

## Ama... Recycle Bin Aktif Değildiyse

Recycle Bin yokken silinen objeler için **backup'tan authoritative restore** gerek:

### 1. System State Backup Al (bunu yapma kültürü)

```cmd
wbadmin start systemstatebackup -backuptarget:E:
```

### 2. Restore Prosedürü

Directory Services Restore Mode'a gir (DSRM):
- DC'yi reboot
- F8 > Directory Services Restore Mode
- DSRM şifresi ile login

Sonra:
```cmd
wbadmin get versions -backuptarget:E:
wbadmin start systemstaterecovery -version:05/11/2024-23:00 -backuptarget:E: -authsysvol

ntdsutil
authoritative restore
restore subtree "OU=Users,DC=corp,DC=firma,DC=com,DC=tr"
quit
quit
```

Reboot normal mode. Restore edildi ama Recycle Bin olmadan **attribute karmaşıklığı** olabilir.

**Bu yüzden**: Recycle Bin aktif olması hayati.

## Yaygın Hatalar

### "The attribute is not found in the cache" Restore Error

Restore-ADObject sırasında bu hata → hedef OU silinmiş. İki seçenek:

1. Önce parent OU'yu restore et:
```powershell
Get-ADObject -Filter {isDeleted -eq $true -and ObjectClass -eq 'organizationalUnit'} `
    -IncludeDeletedObjects | Restore-ADObject
```

2. Farklı OU'ya restore:
```powershell
Get-ADObject -Filter {...} -IncludeDeletedObjects | 
    Restore-ADObject -TargetPath "OU=Recovered,DC=corp,DC=firma,DC=com,DC=tr"
```

### Recycle Bin Aktif Ama Silinmiş Obje Görünmüyor

- 180 gün geçmiş olabilir (tombstone lifetime aşıldı — permanent delete)
- Replication gecikmesi — `repadmin /syncall /AdeP`

### Group Memberships Eski

Restore sonrası `memberOf` görünüyor ama gerçek grup üye olmamış. **Bi-directional relationship** re-establish gerekli:
```powershell
# User'ın olması gereken gruplarını manuel ekle
Add-ADGroupMember -Identity "Sales-Team" -Members "mehmet.yilmaz"
```

Recycle Bin çoğu durumda bunu otomatik halleder ama edge case'ler olabilir.

## Önleyici Strateji

### 1. "Protect from Accidental Deletion"

Her OU için:
```powershell
Get-ADOrganizationalUnit -Filter * | 
    Set-ADObject -ProtectedFromAccidentalDeletion $true
```

Tüm OU'lar "silme koruması". Silmeye çalışırsan wizard uyarı verir.

User bazında:
```powershell
Get-ADUser -Filter {SamAccountName -eq "ceo.firma"} | 
    Set-ADObject -ProtectedFromAccidentalDeletion $true
```

### 2. Audit — Kim Ne Zaman Sildi?

```powershell
# Event 4726 — User account deleted
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4726} -MaxEvents 100
```

Log'da kim hangi kullanıcıyı silmiş → audit trail.

### 3. Delegation — Helpdesk Sadece Password Reset

[Delegation rehberi](/blog/ad-password-reset-delegation-helpdesk-grup) → sadece yetkili kişiler silme yapar.

## İlgili Rehberler

- [Password reset delegation](/blog/ad-password-reset-delegation-helpdesk-grup)
- [Event 2042 tombstone lifetime](/blog/ad-event-2042-too-long-since-replicated-tombstone)

---

**AD disaster recovery, backup stratejisi ve güvenli silme prosedürü için uzman destek?** Kozyatağı Bilişim AD management paketimiz. [Teknik görüşme.](/#contact)
