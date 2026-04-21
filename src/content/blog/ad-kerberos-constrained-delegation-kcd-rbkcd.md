---
slug: ad-kerberos-constrained-delegation-kcd-rbkcd
title: "Kerberos Constrained Delegation (KCD) + Resource-Based KCD — SQL Çift-Hop"
type: cluster
pillar: 2
url: "/blog/ad-kerberos-constrained-delegation-kcd-rbkcd"
hedef_anahtar_kelime: "kerberos constrained delegation rbkcd"
meta_description: "AD'de Kerberos Constrained Delegation (KCD) + Resource-Based KCD kurulum. SQL Server çift-hop, SharePoint, IIS scenarios. PowerShell ile detaylı."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "KCD Setup"
product_family: "Windows Server & Active Directory"
---

## "SharePoint'ten SQL'e Kullanıcı Kimliği Gitmiyor"

Yeni SharePoint farm kuruldu. Raporlar SQL Reporting Services'ten geliyor. Ama kullanıcı oturum bilgisi SharePoint → IIS → SQL chain'inde kayıp — her query `nt authority\anonymous` olarak gidiyor.

BT uzmanı Kerem: "Double-hop problemi. Kerberos Constrained Delegation lazım."

Bu yazı KCD + modern **Resource-Based KCD** kurulumunu anlatıyor.

## Double-Hop Problemi

```
User (mehmet) → SharePoint (IIS) → SQL Server
     hop 1        hop 2
```

- Hop 1: Mehmet'in Kerberos ticket'ı SharePoint'e gider → OK
- Hop 2: SharePoint Mehmet adına SQL'e bağlanmak ister → **ticket forward edilmezse anonymous olur**

KCD = "SharePoint, sadece SQL'e Mehmet adına konuş" yetkisi.

## Hızlı Çözüm (TL;DR)

### Klasik KCD (AD admin yetki gerekir)
```powershell
Set-ADComputer -Identity "SHAREPOINT-SRV" `
    -Add @{"msDS-AllowedToDelegateTo"=@(
        "MSSQLSvc/sql-prod.corp.firma.com.tr:1433",
        "MSSQLSvc/sql-prod.corp.firma.com.tr"
    )}

Set-ADAccountControl -Identity "SHAREPOINT-SRV" -TrustedToAuthForDelegation $true
```

### Resource-Based KCD (SQL admin kendi tarafında yapar — modern)
```powershell
Set-ADComputer -Identity "SQL-PROD" `
    -PrincipalsAllowedToDelegateToAccount (Get-ADComputer "SHAREPOINT-SRV")
```

---

## KCD vs RBKCD Farkı

**Klassik KCD** (Windows 2003+):
- "Kime delegate edileceği" **delegating server**'da tanımlı
- AD admin gerekir SPN değişikliği için
- Tek domain

**Resource-Based KCD** (Windows 2012+):
- "Kim delegate edebilir" **target resource**'da tanımlı
- Target admin karar verir
- **Cross-domain** çalışır
- Daha granüler + modern

Modern deployment'ta **RBKCD tercih edilir**.

## 10:00 — Klasik KCD (Senaryo: Tek Domain)

### Adım 1: SQL SPN Kayıtları

SQL Server Kerberos için SPN'ler olmalı. Önce kontrol:
```powershell
setspn -L sql-prod$
```

Eğer eksik:
```powershell
setspn -A MSSQLSvc/sql-prod.corp.firma.com.tr:1433 sql-prod$
setspn -A MSSQLSvc/sql-prod.corp.firma.com.tr sql-prod$
```

### Adım 2: SharePoint Computer'ı Delegation İçin Trust Et

ADUC:
> 📸 **Ekran 1** — ADUC > SHAREPOINT-SRV bilgisayar hesabı  
> Properties > **Delegation** tab  
> Radio: ● **Trust this computer for delegation to specified services only**  
> ● Use Kerberos only  
> Add... butonu → Users or Computers → SQL-PROD computer seç  
> SPN listesi: MSSQLSvc/sql-prod.corp.firma.com.tr:1433 ← seç  
> OK

### PowerShell

```powershell
# Trust for delegation
Set-ADAccountControl -Identity "SHAREPOINT-SRV" -TrustedToAuthForDelegation $true

# Specific SPN'ler
Set-ADComputer -Identity "SHAREPOINT-SRV" `
    -Replace @{"msDS-AllowedToDelegateTo"=@(
        "MSSQLSvc/sql-prod.corp.firma.com.tr:1433",
        "MSSQLSvc/sql-prod.corp.firma.com.tr"
    )}
```

### Adım 3: Test

SharePoint'ten SQL Reporting Services raporuna git. SQL Server'da:
```sql
SELECT loginame, hostname, auth_scheme FROM sys.sysprocesses
WHERE loginame NOT LIKE 'sa%'
```

Beklenen: `loginame = CORP\mehmet.yilmaz`, `auth_scheme = Kerberos`.

Eğer `auth_scheme = NTLM` → KCD fail, double-hop hâlâ anonymous.

## 10:30 — Resource-Based KCD (RBKCD)

Modern yaklaşım. SQL admin kendi tarafında karar verir — AD admin yetkisi gerekmez.

### Adım 1: SQL'in PrincipalsAllowedToDelegateToAccount'u

```powershell
# SQL-PROD computer account'unu al
$sqlServer = Get-ADComputer "SQL-PROD"

# Kimler delegate edebilir?
$sharepoint = Get-ADComputer "SHAREPOINT-SRV"

# SQL'e "SharePoint delegate edebilir" tanımı
Set-ADComputer -Identity "SQL-PROD" `
    -PrincipalsAllowedToDelegateToAccount $sharepoint
```

### Adım 2: Kontrol

```powershell
Get-ADComputer "SQL-PROD" -Properties PrincipalsAllowedToDelegateToAccount |
    Select -ExpandProperty PrincipalsAllowedToDelegateToAccount
```

Çıktı:
```
CN=SHAREPOINT-SRV,CN=Computers,DC=corp,DC=firma,DC=com,DC=tr
```

### Adım 3: Birden Fazla Delegator

```powershell
$delegators = Get-ADComputer -Filter 'Name -like "SHAREPOINT*" -or Name -like "WEB-FARM*"'

Set-ADComputer -Identity "SQL-PROD" `
    -PrincipalsAllowedToDelegateToAccount $delegators
```

### Adım 4: Cross-Domain

Farklı domain'den delegator:
```powershell
$externalComputer = Get-ADComputer "EXT-APP-01" -Server "external.domain.com"
Set-ADComputer -Identity "SQL-PROD" `
    -PrincipalsAllowedToDelegateToAccount $externalComputer
```

Klasik KCD'de bu mümkün değildi — sadece RBKCD cross-domain destekliyor.

## gMSA ile RBKCD

[gMSA rehberimizden](/blog/ad-gmsa-group-managed-service-account-sql) hatırlarsan — gMSA'lar service account olarak kullanılabilir. RBKCD ile:

```powershell
$gmsa = Get-ADServiceAccount "gmsa_sql_prod"
$sharepoint = Get-ADComputer "SHAREPOINT-SRV"

# gMSA için RBKCD ayarla
Set-ADServiceAccount -Identity "gmsa_sql_prod" `
    -PrincipalsAllowedToDelegateToAccount $sharepoint
```

SharePoint → gMSA → SQL chain delegation.

## IIS App Pool için KCD

IIS web uygulaması için app pool identity gMSA kullanıyor. RBKCD:

```powershell
# Web server WEB-FARM-01 bu SQL'e delegate edebilir
Set-ADComputer -Identity "SQL-PROD" `
    -PrincipalsAllowedToDelegateToAccount (Get-ADComputer "WEB-FARM-01")

# IIS app pool'da gMSA ile çalışıyorsa:
Set-ADServiceAccount -Identity "gmsa_sql_prod" `
    -PrincipalsAllowedToDelegateToAccount (Get-ADComputer "WEB-FARM-01")
```

## Unconstrained Delegation — NEDEN KULLANMAMALI

Eski "Trust this computer for delegation to any service" option — **güvenlik riski**:
- Delegator herhangi bir kaynağa Mehmet adına bağlanabilir
- Compromise olursa saldırgan tüm servislere her kullanıcı adına erişir
- Microsoft 2020+ deprecate ediyor

**Asla** bunu seçme. Constrained ya da RBKCD.

## Test Araçları

### klist — Kullanıcı Ticket'ları

```cmd
klist
```

Output:
```
Ticket Cache: (0x13d8)
Default Principal: mehmet.yilmaz@CORP.FIRMA.COM.TR

#0>     Client: mehmet.yilmaz @ CORP.FIRMA.COM.TR
        Server: MSSQLSvc/sql-prod.corp.firma.com.tr:1433 @ CORP.FIRMA.COM.TR
        Flags 0x40a50000 -> forwardable forwarded pre_authent ok_as_delegate
        ...
```

**forwardable** + **forwarded** flag'leri → KCD çalışıyor.

### Setspn — Duplicate Tespit

```cmd
setspn -X -F
```

Forest-wide duplicate SPN tarar. Duplicate varsa auth fail olur, KCD sessiz fail.

## Yaygın Hatalar

### "Cannot generate SSPI context"

Client SQL'e Kerberos yapmak istedi ama başarısız, NTLM'e fallback olamadı ya da fallback da başarısız.

Sebepler:
- SPN eksik
- Duplicate SPN (başka hesapta da kayıtlı)
- Time skew > 5 dk
- Trust relationship bozuk

### RBKCD "Access Denied"

```powershell
Set-ADComputer -Identity "SQL-PROD" `
    -PrincipalsAllowedToDelegateToAccount (Get-ADComputer "SHAREPOINT-SRV")
```

Error: Access denied.

Sebep: Kullanıcının SQL-PROD computer objesinde **Write** yetkisi yok. Computer's OU'da delegation gerekli ya da bu PowerShell komutu **Domain Admin** veya **SQL-PROD'un admin'i** tarafından çalıştırılmalı.

### KCD Aktif Ama Hâlâ NTLM

Client veya service Kerberos için yapılandırılmamış olabilir. SQL Server'da:
```sql
SELECT net_transport, auth_scheme 
FROM sys.dm_exec_connections
WHERE session_id = @@SPID
```

`auth_scheme = NTLM` ise — Kerberos handshake başarısız. SPN kontrolü + time sync.

### SharePoint "Double-Hop" Hâlâ Fail

SharePoint Farm Account (gMSA) RBKCD listede olmalı, sadece SharePoint server computer değil:

```powershell
$sharepointAccount = Get-ADServiceAccount "gmsa_sharepoint_farm"
$sharepointServer = Get-ADComputer "SHAREPOINT-SRV"

Set-ADComputer -Identity "SQL-PROD" `
    -PrincipalsAllowedToDelegateToAccount @($sharepointAccount, $sharepointServer)
```

## İlgili Rehberler

- [gMSA SQL Server icin](/blog/ad-gmsa-group-managed-service-account-sql)
- [Hyper-V Live Migration 0x8007274D](/blog/hyper-v-live-migration-failed-0x8007274d) (KCD bölümü)
- [Kerberos KRB_AP_ERR_MODIFIED](/blog/kerberos-krb-ap-err-modified-event-4771)

---

**Kerberos deployment, SharePoint-SQL-IIS multi-tier authentication ve RBKCD için uzman destek?** Kozyatağı Bilişim AD + application infrastructure paketimiz. [Teknik görüşme.](/#contact)
