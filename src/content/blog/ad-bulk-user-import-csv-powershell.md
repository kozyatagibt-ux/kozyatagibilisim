---
slug: ad-bulk-user-import-csv-powershell
title: "AD Toplu User Import — İK CSV'sinden 50 Çalışan Tek Komutta"
type: cluster
pillar: 2
url: "/blog/ad-bulk-user-import-csv-powershell"
hedef_anahtar_kelime: "bulk user import active directory csv powershell"
meta_description: "AD'ye 50+ kullanıcı toplu ekleme — İK CSV'sinden PowerShell ile. OU placement, password policy uyumu, group membership, email attribute."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "Bulk Import"
product_family: "Windows Server & Active Directory"
---

## "İlk Hafta 50 Stajyer Başlıyor"

İK müdürü bir Excel gönderdi: 50 üniversite stajyeri, her biri için:
- Ad, Soyad
- Departman (Mühendislik, İK, Finans, Pazarlama)
- Başlangıç tarihi
- Yönetici adı
- Iletişim bilgileri

BT uzmanı Zeynep: "Tek tek ADUC ile açsam 3 gün sürer. PowerShell ile 5 dakika."

Bu yazı pratik bulk import örneği — İK formatından AD user'a.

## CSV Şablonu

İK'nın paylaştığı Excel'i **CSV'ye export et** (Save As > CSV UTF-8):

```csv
FirstName,LastName,Department,JobTitle,Manager,StartDate,Email
Ahmet,Çelik,Mühendislik,Junior Developer,ayse.demir,2024-06-01,ahmet.celik@firma.com.tr
Ayşe,Yılmaz,Pazarlama,Marketing Intern,mehmet.kara,2024-06-01,ayse.yilmaz@firma.com.tr
Mehmet,Kara,Finans,Finance Intern,can.aydin,2024-06-01,mehmet.kara@firma.com.tr
...
```

## Hızlı Çözüm (TL;DR)

```powershell
Import-Csv .\stajyerler.csv -Encoding UTF8 | ForEach-Object {
    $password = "Stajyer!2024$(Get-Random -Max 999)"
    $sam = "$($_.FirstName.ToLower()).$($_.LastName.ToLower())" -replace "[ğĞ]","g" -replace "[üÜ]","u" -replace "[şŞ]","s" -replace "[ıİ]","i" -replace "[öÖ]","o" -replace "[çÇ]","c"
    
    New-ADUser `
        -Name "$($_.FirstName) $($_.LastName)" `
        -GivenName $_.FirstName `
        -Surname $_.LastName `
        -SamAccountName $sam `
        -UserPrincipalName "$sam@corp.firma.com.tr" `
        -EmailAddress $_.Email `
        -Department $_.Department `
        -Title $_.JobTitle `
        -Manager (Get-ADUser -Filter "SamAccountName -eq '$($_.Manager)'").DistinguishedName `
        -Path "OU=Interns,OU=Users,DC=corp,DC=firma,DC=com,DC=tr" `
        -AccountPassword (ConvertTo-SecureString $password -AsPlainText -Force) `
        -ChangePasswordAtLogon $true `
        -Enabled $true
    
    Write-Host "Created: $sam — Password: $password"
}
```

---

## Adım 1: Türkçe Karakter Sorunu

AD SamAccountName'de **Türkçe karakter** sorun yaratır:
- `mehmet.yılmaz` → login problem
- `çağatay` → path, search bozulur

**Çözüm**: ASCII translit:

```powershell
function ConvertTo-ASCII {
    param([string]$Input)
    $Input -replace "[ğĞ]","g" -replace "[üÜ]","u" -replace "[şŞ]","s" -replace "[ıİ]","i" -replace "[öÖ]","o" -replace "[çÇ]","c"
}

# Test
ConvertTo-ASCII "mehmet.yılmaz"  # → mehmet.yilmaz
ConvertTo-ASCII "çağatay"        # → cagatay
```

## Adım 2: Username Naming Convention

Standart format seç:
- **Format A**: `ad.soyad` (örn. `mehmet.yilmaz`) — en yaygın
- **Format B**: `asoyad` (örn. `myilmaz`) — kısa ama çakışma riski
- **Format C**: `adsoyad` (ör. `mehmetyilmaz`) — uzun ama net

Zeynep **Format A**'yı seçti.

Çakışma kontrolü:
```powershell
$desired = "mehmet.yilmaz"
if (Get-ADUser -Filter "SamAccountName -eq '$desired'") {
    # Çakışma — ekle suffix
    $desired = "$desired.2"
}
```

## Adım 3: Güvenli Geçici Şifre Üret

Default şifre tüm stajyerlerde aynı → güvenlik riski. Random:

```powershell
function New-TempPassword {
    $chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%"
    -join (1..12 | ForEach-Object { $chars[(Get-Random -Max $chars.Length)] })
}
```

Her kullanıcı için unique + karmaşık şifre. İlk girişte zorla değiştirme.

## Adım 4: OU Placement

Tüm stajyerler tek OU'da:
```
OU=Interns,OU=Users,DC=corp,DC=firma,DC=com,DC=tr
```

**Bu OU'da özel GPO'lar** olabilir:
- İnternet kısıtlı
- Departman spesifik klasörlere read-only
- Stajyer grubuna ek yetki verilemez

Yaşam döngüsü OU'sı avantajı — stajyer ayrılınca tek komutla tamamını ayarla.

## Adım 5: Kapsamlı Script

```powershell
#Requires -Module ActiveDirectory

# Config
$OUPath = "OU=Interns,OU=Users,DC=corp,DC=firma,DC=com,DC=tr"
$Domain = "corp.firma.com.tr"
$DefaultGroup = "Interns-Group"
$OutputCSV = "C:\Temp\yeni-stajyerler-credentials.csv"

$results = @()

# Türkçe ASCII dönüşüm
function ConvertTo-ASCII {
    param([string]$input)
    $input -replace "[ğĞ]","g" -replace "[üÜ]","u" -replace "[şŞ]","s" `
           -replace "[ıİ]","i" -replace "[öÖ]","o" -replace "[çÇ]","c"
}

# Random password
function New-TempPassword {
    $chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%"
    -join (1..12 | ForEach-Object { $chars[(Get-Random -Max $chars.Length)] })
}

Import-Csv .\stajyerler.csv -Encoding UTF8 | ForEach-Object {
    try {
        # Username üret
        $first = ConvertTo-ASCII $_.FirstName
        $last = ConvertTo-ASCII $_.LastName
        $sam = "$first.$last".ToLower()
        
        # Çakışma varsa suffix ekle
        $originalSam = $sam
        $counter = 2
        while (Get-ADUser -Filter "SamAccountName -eq '$sam'" -ErrorAction SilentlyContinue) {
            $sam = "$originalSam.$counter"
            $counter++
        }
        
        # Şifre
        $tempPassword = New-TempPassword
        
        # Manager DN (varsa)
        $managerDN = $null
        if ($_.Manager) {
            $mgrUser = Get-ADUser -Filter "SamAccountName -eq '$($_.Manager)'" -ErrorAction SilentlyContinue
            if ($mgrUser) { $managerDN = $mgrUser.DistinguishedName }
        }
        
        # User oluştur
        $userParams = @{
            Name                  = "$($_.FirstName) $($_.LastName)"
            GivenName             = $_.FirstName
            Surname               = $_.LastName
            SamAccountName        = $sam
            UserPrincipalName     = "$sam@$Domain"
            EmailAddress          = $_.Email
            Department            = $_.Department
            Title                 = $_.JobTitle
            Path                  = $OUPath
            AccountPassword       = (ConvertTo-SecureString $tempPassword -AsPlainText -Force)
            ChangePasswordAtLogon = $true
            Enabled               = $true
            AccountExpirationDate = (Get-Date $_.StartDate).AddMonths(6) # 6 aylık stajyer
        }
        if ($managerDN) { $userParams.Manager = $managerDN }
        
        New-ADUser @userParams
        
        # Default gruba ekle
        Add-ADGroupMember -Identity $DefaultGroup -Members $sam
        
        # Departman grubu
        $deptGroup = "Dept-$($_.Department)"
        if (Get-ADGroup -Filter "Name -eq '$deptGroup'" -ErrorAction SilentlyContinue) {
            Add-ADGroupMember -Identity $deptGroup -Members $sam
        }
        
        # Sonuç kaydet
        $results += [PSCustomObject]@{
            Username    = $sam
            Password    = $tempPassword
            Email       = $_.Email
            Department  = $_.Department
            Status      = "Created"
        }
        
        Write-Host "✓ Created: $sam" -ForegroundColor Green
    }
    catch {
        $results += [PSCustomObject]@{
            Username    = $sam
            Password    = "-"
            Email       = $_.Email
            Department  = $_.Department
            Status      = "Failed: $($_.Exception.Message)"
        }
        Write-Host "✗ Failed: $sam — $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Credentials'ı secure CSV'ye yaz
$results | Export-Csv $OutputCSV -Encoding UTF8 -NoTypeInformation

Write-Host ""
Write-Host "=== Özet ===" -ForegroundColor Cyan
Write-Host "Toplam:       $($results.Count)"
Write-Host "Başarılı:     $(($results | Where Status -eq 'Created').Count)"
Write-Host "Başarısız:    $(($results | Where Status -ne 'Created').Count)"
Write-Host "Credentials CSV: $OutputCSV"
```

## Çalıştırma

Run:
```powershell
.\Bulk-Import-Interns.ps1
```

Output:
```
✓ Created: ahmet.celik
✓ Created: ayse.yilmaz
✓ Created: mehmet.kara
...

=== Özet ===
Toplam:       50
Başarılı:     48
Başarısız:    2 (Ahmet Çelik - password policy fail, Ali Demir - duplicate sam)
```

Credentials CSV'yi güvenli paylaşım:
- Bitwarden'a import
- Her çalışana **kendi** şifresini kişisel yolla (manager email, güvenli SMS)
- CSV dosyasını sil veya encrypted folder'a taşı

## Rollback

Yanlışlıkla import yapıldıysa hızla geri al:
```powershell
Import-Csv .\stajyerler.csv | ForEach-Object {
    $sam = ConvertTo-ASCII "$($_.FirstName).$($_.LastName)".ToLower()
    
    if (Get-ADUser -Filter "SamAccountName -eq '$sam'" -ErrorAction SilentlyContinue) {
        Remove-ADUser -Identity $sam -Confirm:$false
        Write-Host "Removed: $sam"
    }
}
```

Eğer [AD Recycle Bin aktif](/blog/ad-recycle-bin-enable-silinmis-user-restore) ise restore mümkün.

## İleri Seviye — Idempotent Import

Script tekrar çalıştırılabilir olsun (çakışma olmadan):

```powershell
# Önce var mı kontrol
$existing = Get-ADUser -Filter "SamAccountName -eq '$sam'" -ErrorAction SilentlyContinue

if ($existing) {
    # Update mevcut user
    Set-ADUser -Identity $sam -Department $_.Department -Title $_.JobTitle -EmailAddress $_.Email
    Write-Host "Updated: $sam"
} else {
    # Yeni oluştur
    New-ADUser ...
    Write-Host "Created: $sam"
}
```

Bu pattern "upsert" — var olanı güncelle, yoksa oluştur.

## HR Integration — Otomasyon

Manuel CSV yerine canlı İK integration:
- **Workday API** / SAP SuccessFactors API / BambooHR API
- Scheduled task: her gün yeni çalışanları çek, AD'ye push
- Azure AD Connect veya MIM (Microsoft Identity Manager) enterprise için

Küçük-orta firma için haftalık CSV yeterli.

## Dikkat Edilecek Noktalar

### 1. Password Policy Uyumu

Random password üretirsen domain password policy'sine uyumlu olmalı:
- Min length (örn. 12 karakter)
- Complexity (büyük/küçük/rakam/özel)

Script'imdeki `$chars` kombinasyonu çoğu policy'yi karşılar.

### 2. Email Kontrolü

CSV'deki email doğru formatta mı? Yanlış e-mail → GAL'de yanlış görünür, mail routing bozuk.

```powershell
$emailPattern = "^[\w\.-]+@[\w\.-]+\.\w+$"
if ($_.Email -notmatch $emailPattern) {
    throw "Invalid email: $($_.Email)"
}
```

### 3. License Assignment (M365)

M365 lisansı ayrı — Azure AD Connect sync sonrası veya direct M365 Admin API ile:
```powershell
# Azure AD PowerShell
Connect-MsolService
Set-MsolUserLicense -UserPrincipalName "ahmet.celik@firma.com.tr" -AddLicenses "contoso:ENTERPRISEPACK"
```

### 4. Manager-Direct Report Zinciri

Her stajyerin yöneticisi CSV'de **var olan bir kullanıcı**. Manager atlanıp sonra eklenebilir (2. pass):
```powershell
# 1. Pass: Tüm user oluştur (manager null)
# 2. Pass: Her user için manager attribute ekle
```

## İlgili Rehberler

- [AD schema extension — yeni attribute](/blog/ad-schema-extension-yeni-attribute-ekleme)
- [Çalışan onboarding/offboarding checklist](/blog/calisan-onboarding-offboarding-it-checklist)
- [Password reset delegation](/blog/ad-password-reset-delegation-helpdesk-grup)

---

**AD automation, HR-AD integration ve PowerShell scripting uzman desteği için?** Kozyatağı Bilişim AD management paketimiz. [Teknik görüşme.](/#contact)
