---
slug: ad-password-reset-delegation-helpdesk-grup
title: "AD'de Password Reset Yetkisini Helpdesk Grubuna Delege Etme"
type: cluster
pillar: 2
url: "/blog/ad-password-reset-delegation-helpdesk-grup"
hedef_anahtar_kelime: "active directory password reset delegation"
meta_description: "AD'de helpdesk ekibine sadece 'password reset' yetkisi verme — Domain Admin yetkisi vermeden. Delegation Wizard + OU bazlı kısıtlama."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "AD Delegation"
product_family: "Windows Server & Active Directory"
---

## "Helpdesk Ekibi Şifre Değişiklikleri İçin Geliyor"

BT müdürü Canan Helpdesk ekibinin sürekli kendisine "X kullanıcı şifresini unutmuş, reset eder misin?" dediğini gördü. Günde 5-10 çağrı. Zaman israfı.

> "Helpdesk şifreleri kendisi reset edebilsin. Ama sadece bunu — başka AD değişikliği yapmasın. Domain Admin yetkisi vermek istemiyorum."

Çözüm: **Delegation of Authority**. Bu yazı adımları anlatıyor — kısıtlı yetki, principle of least privilege.

## Hızlı Çözüm (TL;DR)

1. AD'de **"Helpdesk-Operators"** security group oluştur, helpdesk personelini ekle
2. **ADUC > OU sağ tık > Delegate Control**
3. Wizard: Users → "Reset user passwords and force password change at next logon"
4. Test: Helpdesk member şifre reset yapabilir ama kullanıcı silemez

---

## Neden Delegation?

Geleneksel yaklaşım:
- Helpdesk'e Domain Admin → **çok yetki** (AD yıkabilir)
- Helpdesk'e hiç yetki → BT müdürüne her şey gelir (zaman kaybı)

Delegation: **"Principle of Least Privilege"** — sadece gerekli yetki.

AD delegation granular:
- Sadece "password reset"
- Sadece "user account unlock"
- Sadece belirli OU'da
- Sadece belirli user property'lerini değiştirme

## 10:00 — Canan'ın Kurulumu

### Adım 1: Helpdesk Security Group

```powershell
New-ADGroup -Name "Helpdesk-Operators" `
    -Path "OU=Groups,OU=IT,DC=corp,DC=firma,DC=com,DC=tr" `
    -GroupScope Global `
    -GroupCategory Security `
    -Description "Helpdesk team — password reset rights"
```

Üyeleri ekle:
```powershell
Add-ADGroupMember -Identity "Helpdesk-Operators" `
    -Members "helpdesk1.user", "helpdesk2.user", "helpdesk3.user"
```

### Adım 2: Delegation Wizard

ADUC (dsa.msc) açıldı. **Hangi OU'da** delegation verilecek?

Örnek seçim: `OU=Users,DC=corp,DC=firma,DC=com,DC=tr`

> 📸 **Ekran 1** — ADUC > OU sağ tık  
> Sol panel: corp.firma.com.tr > Users OU seçili  
> Sağ tık menu:  
> - Delegate Control...  
> - Find...  
> - New > ...  
> - Properties  
> **Delegate Control...** tıklandı

Delegation wizard:

> 📸 **Ekran 2** — Delegation Wizard — Welcome  
> Başlık: "Welcome to the Delegation of Control Wizard"  
> Açıklama metni  
> Next

> 📸 **Ekran 3** — Users or Groups  
> Bu yetki kime verilecek?  
> "Add..." butonu → "Helpdesk-Operators" grup seçildi  
> Liste: Helpdesk-Operators  
> Next

> 📸 **Ekran 4** — Tasks to Delegate  
> "Delegate the following common tasks:"  
> Checkbox liste:  
> - Create, delete, and manage user accounts  
> - **Reset user passwords and force password change at next logon** ← seçili  
> - Read all user information  
> - Modify the membership of a group  
> - ...  
>   
> Or:  
> ○ Create a custom task to delegate (daha granüler)  
>   
> Next

**Önemli**: "Reset user passwords..." sadece şifre reset yetkisi. Kullanıcı oluşturma/silme YOK.

> 📸 **Ekran 5** — Summary  
> Özet:  
> "The Delegation of Control Wizard will make the following changes..."  
> Helpdesk-Operators group will have the following permissions on OU=Users:  
>   - Reset Password  
>   - Force password change at next logon  
> Finish

Delegation tamamlandı.

## PowerShell Alternative

GUI'nin yaptığını komutla:

```powershell
# ACL al
$ou = "AD:\OU=Users,DC=corp,DC=firma,DC=com,DC=tr"
$acl = Get-Acl -Path $ou

# Helpdesk-Operators grup için yeni ACE
$group = Get-ADGroup "Helpdesk-Operators"
$identity = New-Object System.Security.Principal.SecurityIdentifier $group.SID
$rights = "ExtendedRight"
$resetPwdRight = [System.Guid]::Parse("00299570-246d-11d0-a768-00aa006e0529")
$inherit = "Descendents"
$userClass = [System.Guid]::Parse("bf967aba-0de6-11d0-a285-00aa003049e2")

$ace = New-Object System.DirectoryServices.ActiveDirectoryAccessRule(
    $identity,
    $rights,
    "Allow",
    $resetPwdRight,
    $inherit,
    $userClass
)

$acl.AddAccessRule($ace)
Set-Acl -Path $ou -AclObject $acl
```

Daha karmaşık ama otomasyon için kritik.

## 10:15 — Helpdesk Testi

Helpdesk member `helpdesk1.user` bilgisayarında:

```powershell
# Power reset test
Set-ADAccountPassword -Identity "user.test" -Reset `
    -NewPassword (ConvertTo-SecureString "TempPass!2024" -AsPlainText -Force)

# Next logon'da şifre zorunlu değiştirme
Set-ADUser -Identity "user.test" -ChangePasswordAtLogon $true
```

Başarılı.

Başka işlemler test:
```powershell
# Kullanıcı silme
Remove-ADUser -Identity "user.test"
# Hata: "Access denied" ← Delegation'da yetki yok ✓

# Grup üyeliği ekleme
Add-ADGroupMember -Identity "Domain Admins" -Members "user.test"
# Hata: "Access denied" ← Yetki yok ✓
```

Sadece **password reset** ve **force change at next logon** çalışıyor. Başka her şey reddediliyor.

## İleri Seviye — Özelleştirilmiş Delegation

"Reset Password"un yanında başka yetkiler de isteyebilir:
- **Unlock account** (lockout sonrası)
- **Modify user phone/email** (kullanıcı bilgisi güncelleme)
- **Read all user info** (troubleshoot)

### Custom Task Delegation

Wizard'da "Create a custom task to delegate" seçilince:

> 📸 **Ekran 6** — Custom Task  
> Radio:  
> ● Only the following objects in the folder  
>   ☑ User objects  
> Next  
>   
> Permissions:  
> ☐ Full Control  
> ☐ Read  
> ☐ Write  
> ...  
> ☑ Property-specific  
>   ☑ Read lockoutTime  
>   ☑ Write lockoutTime  
>   ☑ Read pwdLastSet  
>   ☑ Write pwdLastSet  

Granular kontrol.

### Unlock Account Yetkisi

```powershell
# Helpdesk-Operators'a lockoutTime attribute write
$ou = "AD:\OU=Users,DC=corp,DC=firma,DC=com,DC=tr"
$acl = Get-Acl -Path $ou

# lockoutTime GUID
$lockoutGuid = [System.Guid]::Parse("28630ebf-41d5-11d1-a9c1-0000f80367c1")
$group = (Get-ADGroup "Helpdesk-Operators").SID

$ace = New-Object System.DirectoryServices.ActiveDirectoryAccessRule(
    $group, "WriteProperty", "Allow", $lockoutGuid, "Descendents", 
    [System.Guid]::Parse("bf967aba-0de6-11d0-a285-00aa003049e2")
)
$acl.AddAccessRule($ace)
Set-Acl -Path $ou -AclObject $acl
```

Veya easy way: ADUC wizard'da "Read and write account information" seç.

## Delegation'ı Geri Alma

Delegation verdin, sonra geri al:

### GUI

> 📸 **Ekran 7** — OU Properties > Security  
> OU sağ tık > Properties > **Security** tab  
> Gel listede Helpdesk-Operators: Reset password permission var  
> Remove → Apply

### PowerShell

```powershell
$ou = "AD:\OU=Users,DC=corp,DC=firma,DC=com,DC=tr"
$acl = Get-Acl -Path $ou

$helpdesk = (Get-ADGroup "Helpdesk-Operators").SID
$acesToRemove = $acl.Access | Where {$_.IdentityReference -like "*Helpdesk-Operators*"}

foreach ($ace in $acesToRemove) {
    $acl.RemoveAccessRule($ace) | Out-Null
}

Set-Acl -Path $ou -AclObject $acl
```

## Yaygın Hatalar

### "Access denied" Password Reset Deneniyor

Permission doğru yayılmadı. 15 dk bekle + `gpupdate /force`. Sonra tekrar dene.

### Helpdesk Şifre Reset Yapabiliyor Ama "Force Change" Yok

Wizard'da sadece "Reset user passwords" seçildi, "force password change" ayrı checkbox. İkisini birlikte seç.

### Delegation Çok Kalabalık — Görüntüleme

Mevcut delegation'ları görmek:
```powershell
$ou = "AD:\OU=Users,DC=corp,DC=firma,DC=com,DC=tr"
(Get-Acl -Path $ou).Access | 
    Where {$_.IdentityReference -notlike "*SYSTEM*" -and $_.IdentityReference -notlike "*Administrator*"} |
    Select IdentityReference, ActiveDirectoryRights, AccessControlType
```

### Tier Model İhlali

Helpdesk'e yetki verirken **Domain Admins** OU'sunda delegation verme. Sadece **User OU'larında**. Domain Admin accounts için helpdesk dokunamamalı.

## Audit — Kim Kimin Şifresini Reset Etti?

KVKK/denetim için önemli:

```powershell
# Event ID 4724 — An attempt was made to reset an account's password
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4724; StartTime=(Get-Date).AddDays(-7)} |
    ForEach-Object {
        $xml = [xml]$_.ToXml()
        [PSCustomObject]@{
            Time = $_.TimeCreated
            ResetBy = ($xml.Event.EventData.Data | Where {$_.Name -eq 'SubjectUserName'}).'#text'
            TargetUser = ($xml.Event.EventData.Data | Where {$_.Name -eq 'TargetUserName'}).'#text'
        }
    } | Format-Table
```

Çıktı: "Helpdesk1 - User.test'in şifresini reset etti" kayıtları.

## İlgili Rehberler

- [Fine-grained Password Policy (PSO)](/blog/ad-fine-grained-password-policy-pso-olusturma)
- [Event ID 4625 Brute Force](/blog/event-id-4625-brute-force-tespit-onlem)
- [Kerberos KRB_AP_ERR_MODIFIED](/blog/kerberos-krb-ap-err-modified-event-4771)

---

**AD delegation, tier model hardening ve BT yetki yönetimi için uzman destek?** Kozyatağı Bilişim AD security paketimiz. [Teknik görüşme.](/#contact)
