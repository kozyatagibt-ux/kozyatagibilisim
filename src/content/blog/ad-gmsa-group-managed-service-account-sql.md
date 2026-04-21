---
slug: ad-gmsa-group-managed-service-account-sql
title: "gMSA (Group Managed Service Account) Oluşturma — SQL Server için"
type: cluster
pillar: 2
url: "/blog/ad-gmsa-group-managed-service-account-sql"
hedef_anahtar_kelime: "group managed service account gmsa sql server"
meta_description: "AD'de gMSA oluşturup SQL Server servisine atama. KDS Root Key, New-ADServiceAccount, Install-ADServiceAccount adım adım."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "gMSA Setup"
product_family: "Windows Server & Active Directory"
---

## "SQL Servis Hesabı Şifresi Yıllardır Değişmedi"

ISO 27001 denetçisi not aldı:

> "SQL Server servis hesabınız `svc_sql`. **Password Last Set: 2019-03-14**. 5 yıldır değişmemiş. Bu servis hesabının şifresi kimlerde? Change management audit trail var mı?"

BT müdürü Burak cevaplayamadı — **şifre eski BT personelinden kaldı, kimse bilmiyor**. Değiştirse SQL service çöker.

Modern çözüm: **gMSA (Group Managed Service Account)**. Windows kendisi otomatik her 30 günde rotate. Kimse şifreyi bilmez — zaten bilmek gerekmez.

## Hızlı Çözüm (TL;DR)

```powershell
# Ön koşul (forest seviyesinde bir kez)
Add-KdsRootKey -EffectiveImmediately

# gMSA oluştur
New-ADServiceAccount -Name "gmsa_sql_prod" `
    -DNSHostName "gmsa_sql_prod.corp.firma.com.tr" `
    -PrincipalsAllowedToRetrieveManagedPassword "SQL-Servers"

# SQL server'da install
Install-ADServiceAccount -Identity "gmsa_sql_prod"

# SQL Service'e ata (SQL Configuration Manager)
# Username: corp\gmsa_sql_prod$   (sonunda $)
# Password: boş bırak
```

---

## gMSA Nedir?

**Group Managed Service Account** — Windows Server 2012+ özelliği:
- Otomatik şifre yönetimi
- 30 günde bir rotation (yapılandırılabilir)
- Birden fazla server kullanabilir
- SPN otomatik kaydı
- Kerberos otomatik

Önceki versiyonlar:
- **MSA** (Managed Service Account) — sadece tek server kullanabilir (Win2008 R2+)
- **sMSA** (standalone MSA) — gMSA'dan önce
- **Service Account (user)** — manuel yönetim, şifre rotate unutulur

Modern kurumsal = **gMSA**.

## Ön Koşullar

### 1. Domain Functional Level

Minimum Windows Server 2012 forest/domain:
```powershell
Get-ADForest | Select ForestMode
Get-ADDomain | Select DomainMode
```

Her ikisi `Windows2012Forest` / `Windows2012Domain` veya üstü olmalı.

### 2. KDS Root Key (Forest-wide, Bir Kez)

KDS Root Key gMSA şifrelerinin kriptografik root'u. Forest'ta bir kez oluşturulur:

```powershell
# Domain Controller'da, admin
Add-KdsRootKey -EffectiveImmediately
```

**Dikkat**: `-EffectiveImmediately` aslında **10 saat sonra** aktif eder (replication propagation için). Test ortamında hızlandırma:
```powershell
# Test ortamı sadece
Add-KdsRootKey -EffectiveTime ((Get-Date).AddHours(-10))
```

## 10:00 — gMSA Oluşturma

### Adım 1: SQL Server'ları Grup Yap

Birden fazla SQL server bu gMSA'yı kullanacaksa AD grubuna topla:
```powershell
New-ADGroup -Name "SQL-Servers" `
    -Path "OU=Groups,OU=IT,DC=corp,DC=firma,DC=com,DC=tr" `
    -GroupScope Global `
    -GroupCategory Security

# SQL server'ları ekle (Computer Accounts)
Add-ADGroupMember -Identity "SQL-Servers" -Members "SQL-PROD-01$", "SQL-PROD-02$", "SQL-DR-01$"
```

**Not**: Computer account sonunda `$`. SQL-PROD-01 bilgisayarını ekliyoruz (user değil).

### Adım 2: gMSA Oluştur

```powershell
New-ADServiceAccount -Name "gmsa_sql_prod" `
    -DNSHostName "gmsa_sql_prod.corp.firma.com.tr" `
    -PrincipalsAllowedToRetrieveManagedPassword "SQL-Servers" `
    -ServicePrincipalNames "MSSQLSvc/sql-prod-01.corp.firma.com.tr:1433","MSSQLSvc/sql-prod-01.corp.firma.com.tr"
```

Parametreler:
- **Name**: gmsa_sql_prod (prefix "gmsa_" opsiyonel, netlik için)
- **DNSHostName**: FQDN
- **PrincipalsAllowedToRetrieveManagedPassword**: Hangi computer/group şifreyi alabilir
- **ServicePrincipalNames**: SPN'ler (Kerberos için)

Gerçekleşen:
- AD'de yeni service account oluşturuldu
- Password Microsoft KDS tarafından random üretildi
- Password hiçbir yerde görünmez — Windows tarafından otomatik yönetiliyor

### Adım 3: Doğrulama

```powershell
Get-ADServiceAccount -Identity "gmsa_sql_prod" -Properties *
```

Çıktı:
```
Name                             : gmsa_sql_prod
Enabled                          : True
PasswordLastSet                  : 5/12/2024 10:05:12 AM
PrincipalsAllowedToRetrieveManagedPassword : {CN=SQL-Servers,...}
SamAccountName                   : gmsa_sql_prod$
ServicePrincipalNames            : {MSSQLSvc/sql-prod-01.corp.firma.com.tr:1433, ...}
```

## 10:10 — SQL Server Tarafı

### Adım 4: SQL-PROD-01'de gMSA Install

SQL server'a RDP ile bağlan, admin PowerShell:

```powershell
# RSAT-AD-PowerShell gerekli
Install-WindowsFeature RSAT-AD-PowerShell

# gMSA install
Install-ADServiceAccount -Identity "gmsa_sql_prod"
```

Başarılı mı?
```powershell
Test-ADServiceAccount -Identity "gmsa_sql_prod"
# True
```

### Adım 5: SQL Service'e gMSA Atama

**Önce SQL Server'ı durdur** (maintenance window içinde):
```powershell
Stop-Service MSSQLSERVER
```

**SQL Server Configuration Manager**:
> 📸 **Ekran 1** — SQL Server Configuration Manager  
> Sol panel: SQL Server Services  
> Sağda servis listesi:  
> - SQL Server (MSSQLSERVER)  
> - SQL Server Agent (MSSQLSERVER)  
> - SQL Server Browser  
> "SQL Server (MSSQLSERVER)" sağ tık > Properties  
>   
> **Log On tab**:  
> Radio: ● This account:  
> Account name: **corp\gmsa_sql_prod$** ← Sonunda $  
> Password: **boş bırak**  
> Confirm password: **boş bırak**  
>   
> Apply  
> Uyarı: "Changes will not take effect until the service is restarted. Do you want to restart now?" → Yes  

SQL service başlatıldı, gMSA ile çalışıyor.

### Adım 6: Doğrulama

```sql
-- SQL Management Studio
SELECT SERVERPROPERTY('ProductVersion') as Version;
SELECT DB_NAME() as CurrentDB;

-- Service account kontrolü
SELECT service_account
FROM sys.dm_server_services
WHERE servicename = 'SQL Server (MSSQLSERVER)';
```

Çıktı:
```
service_account
---------------
corp\gmsa_sql_prod$
```

gMSA atanmış, SQL çalışıyor.

## SQL Agent + Reporting + Analysis

Benzer şekilde SQL Agent, Reporting Services, Analysis Services de gMSA'ya geçirilebilir:

```powershell
# Agent için ayrı gMSA (veya aynı)
New-ADServiceAccount -Name "gmsa_sqlagent_prod" ...
```

Veya tek gMSA hepsi için kullanılabilir — best practice her servis için ayrı gMSA (privilege separation).

## IIS, Web Server, Service için gMSA

Sadece SQL değil — herhangi bir Windows servisine gMSA atanabilir:

### IIS App Pool

```powershell
# AppPool identity'si olarak gMSA
Import-Module WebAdministration
Set-ItemProperty "IIS:\AppPools\MyAppPool" -Name processModel.identityType -Value SpecificUser
Set-ItemProperty "IIS:\AppPools\MyAppPool" -Name processModel.userName -Value "corp\gmsa_web$"
Set-ItemProperty "IIS:\AppPools\MyAppPool" -Name processModel.password -Value ""
```

### Task Scheduler

```powershell
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File C:\Scripts\Backup.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At 2am
Register-ScheduledTask -TaskName "DailyBackup" `
    -Action $action -Trigger $trigger `
    -User "corp\gmsa_backup$" -LogonType ServiceAccount
```

### Windows Service (custom)

```powershell
$service = Get-WmiObject Win32_Service -Filter "Name='MyCustomService'"
$service.Change($null,$null,$null,$null,$null,$null,"corp\gmsa_service$","")
```

## Şifre Rotation İzleme

```powershell
Get-ADServiceAccount -Identity "gmsa_sql_prod" -Properties PasswordLastSet
```

Çıktı:
```
PasswordLastSet : 5/12/2024 10:05:12 AM
```

Bir sonraki change ~ 6/11/2024 (30 gün sonra). Otomatik — kimse müdahale etmez.

Rotation interval değiştirmek (kurumsal policy):
```powershell
Set-ADServiceAccount -Identity "gmsa_sql_prod" -ManagedPasswordIntervalInDays 15
```

⚠️ **Dikkat**: `-ManagedPasswordIntervalInDays` sadece **oluşturma sırasında** set edilebilir. Sonradan değişmez. Değiştirmek için delete + recreate.

## Yaygın Hatalar

### "The specified service account could not be installed"

Computer AD grubuna eklenmedi. Düzelt:
```powershell
Add-ADGroupMember -Identity "SQL-Servers" -Members "SQL-PROD-01$"

# Computer restart (grup üyelik cache refresh)
Restart-Computer

# Tekrar install
Install-ADServiceAccount -Identity "gmsa_sql_prod"
```

### "KDS Root Key not found"

Root key oluşturulmamış. Domain controller'da:
```powershell
Add-KdsRootKey -EffectiveImmediately
```

10 saat bekle (production'da).

### SQL Service Başlamıyor — "Logon failure: unknown user name or bad password"

SQL Configuration Manager'da gMSA girerken:
- **Username**: `domain\gmsa_name$` (sonunda `$` işareti)
- **Password**: BOŞ — doldurulmamalı

Şifre dolu ise SQL "yanlış şifre" der.

### gMSA SQL'e Login Edemiyor

gMSA **SQL Server'da login olmalı**:
```sql
-- SQL'de login oluştur
USE master;
GO
CREATE LOGIN [corp\gmsa_sql_prod$] FROM WINDOWS;
GO

-- Sysadmin rolü (SQL servis hesabı için zorunlu)
ALTER SERVER ROLE sysadmin ADD MEMBER [corp\gmsa_sql_prod$];
```

### SPN Registration Hatası

gMSA otomatik SPN register etmeye çalışır. Computer account'un "Write servicePrincipalName" yetkisi olmalı.

Manuel SPN:
```cmd
setspn -A MSSQLSvc/sql-prod-01.corp.firma.com.tr:1433 corp\gmsa_sql_prod$
```

## Geçiş Planı — User Account'tan gMSA'ya

Mevcut `svc_sql` user account'tan gMSA'ya geçiş:

1. **Hazırlık**: gMSA oluştur, SQL login ekle, permissions dupe et
2. **Test ortamında** gMSA ile SQL service çalıştır — stabil mi?
3. **Production**: Maintenance window
   - SQL stop
   - Service account gMSA'ya değiştir
   - SQL start
   - Test connectivity
4. **Temizlik**: Eski `svc_sql` user account disable (hemen silme — rollback için)
5. 30 gün sonra disable account delete

## gMSA + SPN Karmaşıklığı

gMSA'yı SQL AlwaysOn, Kerberos delegation için kullanıyorsan extra SPN'ler gerekli. Özel case için:

```powershell
Set-ADServiceAccount -Identity "gmsa_sql_prod" `
    -ServicePrincipalNames @{Add="MSSQLSvc/sql-aag.corp.firma.com.tr:1433", "MSSQLSvc/sql-aag.corp.firma.com.tr"}
```

AlwaysOn listener için tüm node'larda aynı gMSA kullanılırsa SPN delegation clean.

## İlgili Rehberler

- [Kerberos KRB_AP_ERR_MODIFIED](/blog/kerberos-krb-ap-err-modified-event-4771)
- [LDAP Error 49 Invalid Credentials](/blog/ad-ldap-error-49-invalid-credentials)
- [SQL Server 18456 Login failed](/blog/sql-server-hatasi-18456-login-failed-state-kodlari)

---

**gMSA deployment, SQL service account hardening ve Kerberos yapılandırma için uzman destek?** Kozyatağı Bilişim AD + SQL infrastructure paketimiz. [Teknik görüşme.](/#contact)
