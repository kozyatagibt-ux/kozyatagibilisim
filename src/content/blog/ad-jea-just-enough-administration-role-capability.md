---
slug: ad-jea-just-enough-administration-role-capability
title: "JEA (Just Enough Administration) — Helpdesk'e Kısıtlı PowerShell Yetkisi"
type: cluster
pillar: 2
url: "/blog/ad-jea-just-enough-administration-role-capability"
hedef_anahtar_kelime: "just enough administration jea powershell"
meta_description: "Windows Server JEA kurulum — Helpdesk kullanıcılarına sadece 'password reset' komutları sunan restricted PowerShell endpoint. Role Capability + Session Config."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "JEA Setup"
product_family: "Windows Server & Active Directory"
---

## "Helpdesk'e PowerShell Vermek İstiyorum, Ama Domain Admin Değil"

BT müdürü Canan şu ikilem:
- Helpdesk `Unlock-ADAccount` gibi birkaç cmdlet kullanabilse ticket'lar 10 dk'dan 1 dk'ya düşer
- Ama PowerShell erişimi için Domain Admin gerekir — **aşırı yetki**

Çözüm: **JEA (Just Enough Administration)**. PowerShell session "sandboxed" — sadece izin verilen cmdlet'ler çalışır, başkası **block**.

## JEA vs Klasik Delegation

[AD Delegation rehberinde](/blog/ad-password-reset-delegation-helpdesk-grup) OU-bazlı delegation gördük — GUI üzerinden.

**JEA farkı**:
- **Endpoint based**: Özel PowerShell endpoint oluştur
- **Virtual account**: Session boyunca geçici admin hesap
- **Command whitelist**: Sadece izin verilen cmdlet ve parameter
- **Audit rich**: Her komut log'lanır
- **Cross-protocol**: PowerShell remoting üzerinden

Bir nevi "restricted shell" ama tamamen PowerShell native.

## Hızlı Çözüm (TL;DR)

```
1. Role Capability dosyası (.psrc): Hangi cmdlet'ler
2. Session Configuration (.pssc): Endpoint ayarı + role
3. Register-PSSessionConfiguration ile sunucuya kaydet
4. Helpdesk kullanıcı: Enter-PSSession -ConfigurationName HelpdeskEndpoint
5. Sadece tanımlı komutlar çalışır
```

---

## 10:00 — Role Capability Dosyası

"Helpdesk ne yapabilir?" listesi.

```powershell
# PowerShell admin olarak DC'de
New-Item -Path "C:\Program Files\WindowsPowerShell\Modules\HelpdeskModule" -ItemType Directory -Force

# Module manifest
New-ModuleManifest -Path "C:\Program Files\WindowsPowerShell\Modules\HelpdeskModule\HelpdeskModule.psd1"

# Role capability klasör
New-Item -Path "C:\Program Files\WindowsPowerShell\Modules\HelpdeskModule\RoleCapabilities" -ItemType Directory -Force

# Role Capability file
New-PSRoleCapabilityFile -Path "C:\Program Files\WindowsPowerShell\Modules\HelpdeskModule\RoleCapabilities\Helpdesk.psrc"
```

Şimdi `.psrc` dosyasını düzenle:

```powershell
@{
    # Visible cmdlets — kullanıcı bu cmdlet'leri çalıştırabilir
    VisibleCmdlets = 
        'Unlock-ADAccount',
        @{
            Name = 'Set-ADAccountPassword'
            Parameters = @(
                @{Name = 'Identity'}
                @{Name = 'Reset'}
                @{Name = 'NewPassword'}
            )
        },
        @{
            Name = 'Get-ADUser'
            Parameters = @(
                @{Name = 'Identity'}
                @{Name = 'Properties'}
                @{Name = 'Filter'}
            )
        },
        @{
            Name = 'Set-ADUser'
            Parameters = @(
                @{Name = 'Identity'}
                @{Name = 'ChangePasswordAtLogon'}
            )
        }

    # Visible functions
    VisibleFunctions = 'Reset-UserPassword'

    # Import modules
    ModulesToImport = 'ActiveDirectory'

    # Functions available within session
    FunctionDefinitions = @(
        @{
            Name       = 'Reset-UserPassword'
            ScriptBlock = {
                param(
                    [Parameter(Mandatory)]
                    [string]$Username
                )
                $tempPwd = -join ((33..126) | Get-Random -Count 12 | ForEach-Object { [char]$_ })
                Set-ADAccountPassword -Identity $Username -Reset -NewPassword (ConvertTo-SecureString $tempPwd -AsPlainText -Force)
                Set-ADUser -Identity $Username -ChangePasswordAtLogon $true
                Unlock-ADAccount -Identity $Username
                
                [PSCustomObject]@{
                    User         = $Username
                    TempPassword = $tempPwd
                    Status       = "Reset successful. User must change at next logon."
                }
            }
        }
    )
}
```

Bu file'da helpdesk ne yapabilir tam tanımlandı:
- `Unlock-ADAccount` full
- `Set-ADAccountPassword` kısıtlı parameter (sadece Identity, Reset, NewPassword)
- Özel `Reset-UserPassword` function — one-shot reset

## 10:20 — Session Configuration

Endpoint nerede açılacak?

```powershell
New-PSSessionConfigurationFile -Path C:\JEA\HelpdeskEndpoint.pssc
```

`.pssc` dosyasını düzenle:

```powershell
@{
    # Session type
    SessionType = 'RestrictedRemoteServer'

    # Run as virtual account (high privilege)
    RunAsVirtualAccount = $true
    
    # Virtual account admin grubu (sadece bu session için geçerli)
    RunAsVirtualAccountGroups = 'Domain Admins'  # Session boyunca DA haklarıyla ama kısıtlı cmdlet'le

    # Hangi role helpdesk?
    RoleDefinitions = @{
        'CORP\Helpdesk-Operators' = @{ RoleCapabilities = 'Helpdesk' }
    }

    # Transcript — tüm session'ı kaydet
    TranscriptDirectory = 'C:\JEA\Transcripts'

    # Description
    Description = 'Helpdesk password reset endpoint'
}
```

**Kritik**: `RunAsVirtualAccount = $true` ile session kullanıcının değil, **geçici oluşturulan virtual account**'un haklarıyla çalışır (Domain Admin). Ama cmdlet kısıtı var → yetki fiili olarak sınırlı.

## 10:30 — Endpoint Register

```powershell
Register-PSSessionConfiguration -Name "HelpdeskEndpoint" `
    -Path "C:\JEA\HelpdeskEndpoint.pssc" `
    -Force
```

Sunucu PowerShell remoting bu endpoint'i tanır artık.

### Verify

```powershell
Get-PSSessionConfiguration | Where Name -eq "HelpdeskEndpoint"
```

## 10:35 — Helpdesk Kullanıcı Test

Helpdesk üyesi `helpdesk.demo` kullanıcı:

```powershell
# Kendi PC'sinden DC'ye JEA endpoint bağlantı
Enter-PSSession -ComputerName DC01.corp.firma.com.tr `
    -ConfigurationName HelpdeskEndpoint `
    -Credential (Get-Credential)
```

Credentials girdi. Prompt değişti:
```
[DC01.corp.firma.com.tr]: PS>
```

### Sınırları Test

```powershell
# Bu çalışmalı (allowed)
Unlock-ADAccount -Identity mehmet.yilmaz
# OK

Reset-UserPassword -Username mehmet.yilmaz
# OK — yeni şifre döner

Get-ADUser -Identity mehmet.yilmaz -Properties LockedOut
# OK

# Ama bunlar çalışmamalı
Remove-ADUser -Identity mehmet.yilmaz
# Error: The term 'Remove-ADUser' is not recognized

Stop-Service NTDS
# Error: not recognized

Get-Process
# Error: not recognized (JEA session çok sınırlı)
```

**Perfect** — sadece tanımlı 4 cmdlet + 1 function.

## 11:00 — Audit + Transcript

Her session kayıt:

```powershell
Get-ChildItem C:\JEA\Transcripts\
```

Dosya örneği: `20240512-101534-HelpdeskEndpoint-helpdesk.demo.log`

İçerik:
```
Start time: 20240512101534
Username: CORP\helpdesk.demo
RunAs User: WinRM Virtual Users\WinRM VA_...

Command: Reset-UserPassword -Username mehmet.yilmaz

Status: Success

Output:
User: mehmet.yilmaz
TempPassword: xY#8Fr2!qP@3
Status: Reset successful

End time: 20240512101538
```

Audit trail: kim, ne zaman, hangi kullanıcıya ne yaptı — KVKK ve compliance için paha biçilmez.

## Event Log Integration

PowerShell session audit Windows Event Log'a da çıkar:
```
Applications and Services Logs > Microsoft > Windows > PowerShell > Operational
```

Event 4104: Script block logging (her komut).

## Yaygın Hatalar

### "Access denied" Helpdesk Bağlanırken

- JEA endpoint'te helpdesk group listede mi?
- Kullanıcı gerçekten grup üyesi mi? `Get-ADGroupMember "Helpdesk-Operators"`
- PowerShell remoting enabled mi? `Enable-PSRemoting`
- Firewall WinRM port 5985/5986 açık mı?

### Cmdlet Çalışıyor Ama "parameter not recognized"

.psrc'de Parameter kısıtı var. Sadece listelenen parametreler çalışır. İstiyorsan Parameter listesi genişlet.

### Session Timeout

Default 2 saat idle timeout. Değiştirme:
```
.pssc içinde:
IdleTimeoutSec = 7200  # 2 saat
MaxIdleTimeoutSec = 86400  # 24 saat max
```

### Virtual Account Insufficient Rights

Virtual account default Domain Admin hakları alır ama bazı operasyonlarda yetmeyebilir. Custom:
```
RunAsVirtualAccountGroups = 'Domain Admins', 'Enterprise Admins'
```

Ya da named account (gMSA önerilir):
```
GroupManagedServiceAccount = 'gmsa_jea_helpdesk$'
```

## JEA + Delegation Hybrid

JEA Windows Server native. Active Directory delegation yok.

**Best practice**:
1. JEA endpoint → cmdlet scope tanımı
2. `Reset-UserPassword` function → OU bazlı delegation check yap (PowerShell içinde)
3. Helpdesk sadece kendi tier'ındaki user'ları reset edebilir

```powershell
FunctionDefinitions = @(
    @{
        Name = 'Reset-UserPassword'
        ScriptBlock = {
            param($Username)
            
            $user = Get-ADUser $Username -Properties CanonicalName
            
            # Tier check: User Corp-Users OU'sunda mı?
            if ($user.CanonicalName -notlike "*/OU=Corp-Users/*") {
                Write-Error "Access denied: Reset not allowed for this user tier"
                return
            }
            
            # Reset
            # ...
        }
    }
)
```

## JIT (Just-In-Time) + JEA

Advanced: JEA + just-in-time admin activation. **PIM (Privileged Identity Management)** ile kombinasyon — kullanıcı admin yetkisi için "request access" yapar, 4 saat geçerli, audit.

Microsoft Entra PIM + JEA endpoint → enterprise-grade security.

## İlgili Rehberler

- [Password reset delegation](/blog/ad-password-reset-delegation-helpdesk-grup)
- [gMSA Group Managed Service Account](/blog/ad-gmsa-group-managed-service-account-sql)
- [Kerberos Constrained Delegation](/blog/ad-kerberos-constrained-delegation-kcd-rbkcd)

---

**Privileged access management, JEA + PIM deployment ve enterprise security için uzman destek?** Kozyatağı Bilişim AD hardening paketimiz. [Teknik görüşme.](/#contact)
