---
slug: logo-tiger-sql-server-baglanti-sorunlari
title: "Logo Tiger SQL Server Bağlantı Sorunları — IT Troubleshoot"
type: cluster
pillar: 1
url: "/blog/logo-tiger-sql-server-baglanti-sorunlari"
hedef_anahtar_kelime: "logo tiger sql bağlantı sorunu"
meta_description: "Logo Tiger + SQL Server bağlantı hataları: 'Database not accessible', timeout, orphaned user. Connection string, TCP/IP, auth ve permission."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
troubleshoot: true
error_code: "Logo SQL Connection"
product_family: "SQL Server & Veritabanı"
---

## "Logo Açılmıyor — 'Database Cannot Be Opened'"

Muhasebe sabah Logo Tiger'ı açamıyor:
```
Error: Cannot open database "LOGODB" requested by the login. 
The login failed.
```

Yıllardır sorunsuz çalışan sistem — neden şimdi?

## Logo Tiger Mimarisi

- Client (Logo.exe) → SQL Server → LOGODB
- SQL Server authentication (genelde)
- Per-user veya shared database

## Hızlı Çözüm (TL;DR)

1. SQL Server servisi çalışıyor mu?
2. TCP/IP protokolü enabled?
3. SQL Browser service running?
4. Firewall TCP 1433 açık?
5. Logo kullanıcısı SQL'de login var mı?
6. Database online mı (offline değil)?

---

## 10:00 — Temel Kontroller

### SQL Server Service

```powershell
Get-Service | Where Name -like "MSSQL*"
```

Çıktı:
```
Name                Status
----                ------
MSSQL$SQLEXPRESS    Running  ← Çalışıyor
MSSQLSERVER         Stopped  ← Durdu!
```

Servis durduysa:
```powershell
Start-Service MSSQLSERVER
```

Her restart sonrası auto-start olması için:
```powershell
Set-Service MSSQLSERVER -StartupType Automatic
```

### TCP/IP Protocol Enabled

SQL Server Configuration Manager:

> 📸 **Ekran 1** — SQL Server Network Configuration  
> Sol ağaç: SQL Server Network Configuration > Protocols for MSSQLSERVER  
> TCP/IP: Status = Enabled  
> Eğer Disabled → Sağ tık > Enable → SQL Server restart

Logo default TCP/IP üzerinden bağlanır. Disabled ise "Named Pipes" denerse bağlanamaz.

### SQL Browser Service

Dynamic port kullanıyorsa (named instance) gerek:
```powershell
Get-Service SQLBrowser
# Running olmalı
Start-Service SQLBrowser
Set-Service SQLBrowser -StartupType Automatic
```

Default instance (MSSQLSERVER) için gerekmez ama zararı yok.

## 10:15 — Firewall

Logo server SQL server farklı makinede ise:
```powershell
Test-NetConnection sql-server.corp.firma.com.tr -Port 1433
```

`False` ise firewall block. Windows Firewall rule:
```powershell
New-NetFirewallRule -DisplayName "SQL Server 1433" `
    -Direction Inbound -Protocol TCP -LocalPort 1433 -Action Allow
```

Ayrıca SQL Browser için:
```powershell
New-NetFirewallRule -DisplayName "SQL Browser 1434" `
    -Direction Inbound -Protocol UDP -LocalPort 1434 -Action Allow
```

## 10:25 — Login + Database User

SQL Server Management Studio (SSMS) ile:
```sql
-- Login var mı?
SELECT name FROM sys.server_principals WHERE name = 'LOGO\muhasebe.user';
```

Yoksa oluştur:
```sql
CREATE LOGIN [LOGO\muhasebe.user] FROM WINDOWS;
GO

USE LOGODB;
CREATE USER [LOGO\muhasebe.user] FOR LOGIN [LOGO\muhasebe.user];
ALTER ROLE db_datareader ADD MEMBER [LOGO\muhasebe.user];
ALTER ROLE db_datawriter ADD MEMBER [LOGO\muhasebe.user];
ALTER ROLE db_executor ADD MEMBER [LOGO\muhasebe.user];  -- Logo stored proc için
```

## 10:35 — Orphaned User

Database restore sonrası SID mismatch:
```sql
USE LOGODB;
EXEC sp_change_users_login 'Report';
```

Orphaned user varsa:
```sql
EXEC sp_change_users_login 'Update_One', 'muhasebe.user', 'LOGO\muhasebe.user';
```

## 10:45 — Database Offline

```sql
SELECT name, state_desc FROM sys.databases WHERE name = 'LOGODB';
```

Çıktı:
```
name     state_desc
----     ----------
LOGODB   OFFLINE
```

Online yap:
```sql
ALTER DATABASE LOGODB SET ONLINE;
```

[SQL Server Error 4064](/blog/sql-server-error-4064-cannot-open-user-default-database) detay var.

## 10:55 — Logo Connection Config

Logo.ini veya ERP config:
```
[LOGO_Connection]
Server=sql-server.corp.firma.com.tr
InstanceName=SQLEXPRESS  (varsa)
Database=LOGODB
AuthType=Windows  (veya SQL Auth)
User=muhasebe.user
```

Yanlış server adı veya instance → connection fail.

Test:
```powershell
# PowerShell
Invoke-Sqlcmd -ServerInstance "sql-server.corp.firma.com.tr" -Database "LOGODB" -Query "SELECT TOP 1 * FROM FIRMA"
```

Başarılıysa Logo da bağlanabilir.

## 11:00 — Performance Sorunları

Logo Tiger yavaş açılıyor / raporlar çok zaman alıyor:

### Index Fragmentation

```sql
-- Fragmentation check
SELECT OBJECT_NAME(object_id), 
       index_id, 
       avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID('LOGODB'), NULL, NULL, NULL, 'SAMPLED')
WHERE avg_fragmentation_in_percent > 30;
```

Rebuild:
```sql
ALTER INDEX ALL ON LG_001_DFTICARI REBUILD;
```

Logo tablolarında maintenance plan önerilir (gece otomatik):
```sql
-- Tüm index'ler haftalık rebuild
EXEC sp_MSforeachtable 'ALTER INDEX ALL ON ? REBUILD';
```

### Statistics Out-of-Date

```sql
EXEC sp_updatestats;
```

### Transaction Log Full

```sql
SELECT name, log_reuse_wait_desc FROM sys.databases WHERE name = 'LOGODB';
```

`LOG_BACKUP` beklenirse log backup al:
```sql
BACKUP LOG LOGODB TO DISK = 'D:\Backup\LOGODB_log.trn';
```

Yoksa `SIMPLE` recovery moduna geç (development için):
```sql
ALTER DATABASE LOGODB SET RECOVERY SIMPLE;
```

Production: Full recovery + regular log backup.

## Çok Kullanıcılı Lisans

Logo Tiger kullanıcı başı lisans:
```
Logo > Tools > Lisans Yönetimi
```

Simultaneous connection limit (örn. 10) varsa 10. kullanıcı "lisans dolu" alır. Lisans artışı Logo firma ile.

## Backup + Restore

Logo database backup (haftalık minimum):
```sql
BACKUP DATABASE LOGODB TO DISK = 'D:\Backup\LOGODB_FULL_20240512.bak' 
    WITH COMPRESSION, CHECKSUM;
```

[Veeam + SQL application-aware backup](/blog/veeam-vmware-backup-job-encryption-kurulum) ideal.

## İlgili Rehberler

- [SQL Server Error 4064](/blog/sql-server-error-4064-cannot-open-user-default-database)
- [SQL Server 18456 Login failed](/blog/sql-server-hatasi-18456-login-failed-state-kodlari)
- [e-Fatura GİB entegrasyon](/blog/e-fatura-gib-portal-entegrasyon-sorunlari)

---

**Logo / Mikro / Netsis ERP + SQL Server yönetimi için destek?** [Teknik görüşme.](/#contact)
