---
slug: m365-powershell-bulk-user-import-lisans
title: "M365 PowerShell Bulk User Import + License Assignment"
type: cluster
pillar: 6
url: "/blog/m365-powershell-bulk-user-import-lisans"
hedef_anahtar_kelime: "m365 bulk user import powershell"
meta_description: "M365'e CSV'den toplu user ekleme + lisans ata — PowerShell + Microsoft Graph. Group-based licensing ve sync'ten ayrı cloud-only."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Bulk M365 User"
product_family: "Microsoft 365 & Outlook"
---

## "40 Yaz Stajyeri, 1 Günde M365 Hesapları"

BT müdürü İK'dan CSV aldı: 40 stajyer, 3 ay için M365 Business Basic lisans. Tek tek hesap açmak saatlerce.

PowerShell:

## Hızlı Çözüm (TL;DR)

```powershell
# Connect
Connect-MgGraph -Scopes "User.ReadWrite.All", "Directory.ReadWrite.All"

# CSV import
Import-Csv .\stajyerler.csv | ForEach-Object {
    $params = @{
        AccountEnabled   = $true
        DisplayName      = "$($_.FirstName) $($_.LastName)"
        MailNickName     = "$($_.FirstName).$($_.LastName)".ToLower()
        UserPrincipalName = "$($_.FirstName).$($_.LastName)@firma.com.tr"
        PasswordProfile  = @{
            Password = "Stajyer!$(Get-Random -Max 9999)"
            ForceChangePasswordNextSignIn = $true
        }
        Department       = $_.Department
        UsageLocation    = "TR"  # Lisans atama için zorunlu
    }
    New-MgUser @params
}

# Lisans toplu ata
$sku = Get-MgSubscribedSku | Where SkuPartNumber -eq "SMB_BUSINESS"
$skuId = $sku.SkuId

Get-MgUser -Filter "Department eq 'Intern'" | ForEach-Object {
    Set-MgUserLicense -UserId $_.Id -AddLicenses @(@{SkuId = $skuId}) -RemoveLicenses @()
}
```

40 user 2 dakikada tamam.

---

## CSV Şablonu

```csv
FirstName,LastName,Department,JobTitle
Ahmet,Yılmaz,Intern,Marketing Intern
Ayşe,Demir,Intern,Finance Intern
Mehmet,Kaya,Intern,Engineering Intern
```

## 10:00 — Microsoft Graph PowerShell

MgGraph modern, önerilen modül (eski MsOnline deprecated):

```powershell
# Install
Install-Module Microsoft.Graph -Scope CurrentUser

# Connect (MFA prompt)
Connect-MgGraph -Scopes "User.ReadWrite.All", "Organization.Read.All", "Directory.ReadWrite.All"
```

Browser açılır → MFA → consent → connect.

## Her Stajyer İçin Process

### Türkçe Karakter Handling

```powershell
function ConvertTo-ASCII {
    param([string]$text)
    $text -replace "[ğĞ]","g" -replace "[üÜ]","u" -replace "[şŞ]","s" `
          -replace "[ıİ]","i" -replace "[öÖ]","o" -replace "[çÇ]","c"
}
```

### UPN + Alias

```powershell
$first = ConvertTo-ASCII $_.FirstName
$last = ConvertTo-ASCII $_.LastName
$alias = "$first.$last".ToLower()
$upn = "$alias@firma.com.tr"

# Çakışma kontrolü
$counter = 2
while (Get-MgUser -Filter "UserPrincipalName eq '$upn'" -ErrorAction SilentlyContinue) {
    $alias = "$first.$last.$counter"
    $upn = "$alias@firma.com.tr"
    $counter++
}
```

### Password Üret

```powershell
function New-TempPassword {
    $chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$"
    -join (1..12 | ForEach-Object { $chars[(Get-Random -Max $chars.Length)] })
}
```

## 10:15 — Bulk Create Script

```powershell
$credsPath = "C:\Temp\new-users-credentials.csv"
$results = @()

Import-Csv stajyerler.csv -Encoding UTF8 | ForEach-Object {
    $first = ConvertTo-ASCII $_.FirstName
    $last = ConvertTo-ASCII $_.LastName
    $alias = "$first.$last".ToLower()
    $upn = "$alias@firma.com.tr"
    $password = New-TempPassword
    
    try {
        $userParams = @{
            DisplayName       = "$($_.FirstName) $($_.LastName)"
            GivenName         = $_.FirstName
            Surname           = $_.LastName
            MailNickname      = $alias
            UserPrincipalName = $upn
            AccountEnabled    = $true
            PasswordProfile   = @{
                Password                      = $password
                ForceChangePasswordNextSignIn = $true
            }
            Department        = $_.Department
            JobTitle          = $_.JobTitle
            UsageLocation     = "TR"
        }
        
        $user = New-MgUser @userParams
        
        $results += [PSCustomObject]@{
            Username   = $upn
            Password   = $password
            Status     = "Created"
            UserId     = $user.Id
        }
        Write-Host "✓ Created: $upn" -ForegroundColor Green
    }
    catch {
        $results += [PSCustomObject]@{
            Username = $upn
            Password = "-"
            Status   = "Failed: $($_.Exception.Message)"
            UserId   = $null
        }
        Write-Host "✗ Failed: $upn" -ForegroundColor Red
    }
}

$results | Export-Csv $credsPath -NoTypeInformation -Encoding UTF8
Write-Host "Credentials saved: $credsPath"
```

## 10:30 — License Assignment

Available SKU'ları gör:
```powershell
Get-MgSubscribedSku | Select SkuPartNumber, ConsumedUnits, 
    @{N='Available';E={$_.PrepaidUnits.Enabled - $_.ConsumedUnits}}
```

Çıktı:
```
SkuPartNumber          ConsumedUnits Available
-------------          ------------- ---------
O365_BUSINESS_ESSENTIALS           0        30  ← 30 Business Basic var
ENTERPRISEPACK                    420        80
```

Toplu ata:
```powershell
$sku = Get-MgSubscribedSku | Where SkuPartNumber -eq "O365_BUSINESS_ESSENTIALS"
$skuId = $sku.SkuId

# Yeni user'ları department'tan filtrele
Get-MgUser -Filter "Department eq 'Intern'" | ForEach-Object {
    Set-MgUserLicense -UserId $_.Id `
        -AddLicenses @(@{SkuId = $skuId}) `
        -RemoveLicenses @()
    
    Write-Host "Licensed: $($_.UserPrincipalName)"
}
```

## Group-Based Licensing (Önerilen)

Manuel assignment yerine **dynamic group**:

Entra Admin Center > Groups > + New group:
- Name: "Intern-Licensed"
- Membership: Dynamic
- Rule: `user.department -eq "Intern"`

Licenses tab → "O365 Business Essentials" ekle.

Bu grup'a düşen her user otomatik lisanslı. Intern bitmişse department değiştirince lisans otomatik revoke.

## 10:45 — Group Assignment

Department bazında group:

```powershell
# Marketing group
$marketingGroup = Get-MgGroup -Filter "DisplayName eq 'Marketing-Team'"

# Yeni user'ları gruba ekle
Get-MgUser -Filter "Department eq 'Intern'" | ForEach-Object {
    New-MgGroupMember -GroupId $marketingGroup.Id -DirectoryObjectId $_.Id
}
```

## Export Credentials Güvenli

`new-users-credentials.csv` hassas. **Zippe + şifre**:
```powershell
Compress-Archive -Path $credsPath -DestinationPath "$credsPath.zip" -Force
# Şifre ayrı kanaldan (WhatsApp) İK'ya
```

İK her kullanıcıya kendi credential'ını manager email ile iletir. Stajyer ilk login'de şifre zorla değiştir.

## Temizlik — Ayrılık Sonrası

3 ay sonra internler ayrılıyor. Toplu disable + lisans revoke:

```powershell
Get-MgUser -Filter "Department eq 'Intern'" | ForEach-Object {
    # License remove
    Set-MgUserLicense -UserId $_.Id -AddLicenses @() -RemoveLicenses @($skuId)
    
    # Account disable
    Update-MgUser -UserId $_.Id -AccountEnabled $false
}
```

30 gün sonra delete.

## İlgili Rehberler

- [AD bulk user import CSV](/blog/ad-bulk-user-import-csv-powershell)
- [Onboarding/Offboarding checklist](/blog/calisan-onboarding-offboarding-it-checklist)

---

**M365 automation için uzman destek?** [Teknik görüşme.](/#contact)
