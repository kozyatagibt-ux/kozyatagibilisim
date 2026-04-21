---
slug: sql-server-error-4064-cannot-open-user-default-database
title: "SQL Server Error 4064 'Cannot open user default database' — Çözüm"
type: cluster
pillar: 8
url: "/blog/sql-server-error-4064-cannot-open-user-default-database"
hedef_anahtar_kelime: "sql server error 4064"
meta_description: "SQL Server 'Cannot open user default database. Login failed. Error 4064' hatası — default database bozuk/offline durumunda çözüm. sqlcmd ile adım adım."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
troubleshoot: true
error_code: "4064"
product_family: "SQL Server & Veritabanı"
---

## "Logo'ya Giremiyorum, SQL Hatası Alıyorum"

Cuma akşamı 17:45. Muhasebe müdürü panikle arıyor:

> "Logo ERP'ye giremiyorum. Pazartesi maaş bordroları için rapor çıkaracaktım, şimdi bu hata:

```
┌────────────────────────────────────────────────────┐
│ Cannot connect to SQLSRV01\LOGODB                  │
├────────────────────────────────────────────────────┤
│                                                    │
│  Cannot open user default database. Login failed.  │
│  Login failed for user 'MUHASEBE\muhasebe.muduru'. │
│                                                    │
│  (Microsoft SQL Server, Error: 4064)               │
│                                                    │
│                                    [  OK  ]        │
│                                                    │
└────────────────────────────────────────────────────┘
```

BT uzmanı Selim kontrol etti. 4 dakikada çözdü — SQL'in kullanıcıya atadığı default database offline durumundaydı. Bu yazı o 4 dakikayı anlatıyor.

## Hızlı Çözüm (TL;DR)

1. `sqlcmd -S sqlsrv01 -U sa -P [password] -d master` — **master'a** bağlan
2. `ALTER LOGIN [MUHASEBE\muhasebe.muduru] WITH DEFAULT_DATABASE = master;`
3. Logo tekrar açılmayı deneyin
4. Sonra problemli DB'yi incele (offline? suspect? silinmiş?)

---

## Error 4064 Ne Anlama Geliyor?

SQL Server her kullanıcıya **default database** atar. Login yaparken:
1. Kullanıcı connection bilgilerini gönderir (username + password)
2. SQL "default database'ini aç" der
3. DB açılamazsa → Error 4064

Sebepler:
- **Default DB silinmiş** (manuel veya yanlışlıkla)
- **Default DB offline** (DBA servise aldı)
- **Default DB suspect mode** (corrupt)
- **Default DB restoring mode** (restore süreci askıda)
- **Kullanıcı default DB'de artık user değil** (DB taşınmış)

## 17:47 — Selim SQL Server'a Bağlandı

RDP ile SQL server'a:
```
mstsc /v:sqlsrv01.corp.firma.com
```

Server yöneticisi olarak login. SQL Server Management Studio (SSMS) açıldı:

> 📸 **Ekran 1** — SSMS Connect dialog  
> Server type: Database Engine  
> Server name: **sqlsrv01\LOGODB**  
> Authentication: Windows Authentication (SA ile de olur)  
> Connect

Ama... **kendisi de 4064 alıyor!**

Çünkü Selim'in admin hesabı da aynı default database'i kullanıyor. Dolaylı yoldan bağlan:

### SQL Options — Alternate Default Database

> 📸 **Ekran 2** — Connect with Options  
> Aynı Connect dialog  
> **Options >>** butonuna tıkla (aşağıda expand)  
> "Connection Properties" tab açılır  
> Connect to database dropdown: **master** (default DB yerine)  
> Network: TCP/IP  
> Connection timeout: 30  
> Connect

Bu sefer bağlandı — çünkü master DB hep açık.

### Alternatif: sqlcmd CLI

GUI'de sorun varsa CLI:
```cmd
sqlcmd -S sqlsrv01\LOGODB -U sa -P [password] -d master
```

Çalışır. Devam.

## 17:48 — Problemli DB'yi Tespit

SSMS'te sol panelde Databases listesi:

> 📸 **Ekran 3** — SSMS Object Explorer > Databases  
> Sol panel: Server > Databases expanded  
> DB listesi:  
> - System Databases (master, model, msdb, tempdb) — normal  
> - LogoERP (User Database) — **(Offline)** ← İşte  
> - LogoERP_Archive (Normal)  
> - IK (Normal)  
> Offline DB ikonu yanında küçük aşağı ok

**LogoERP DB offline.** Sebep ne?

### SQL Error Log Kontrolü

```sql
USE master;
GO
EXEC xp_readerrorlog 0, 1, N'LogoERP';
```

Son 24 saatte LogoERP ile ilgili tüm log satırları:
```
2024-05-10 14:23:42 | Starting up database 'LogoERP'
2024-05-10 14:23:42 | The database 'LogoERP' is marked OFFLINE by user 'sa' (session_id 56)
```

Birisi (sa hesabı) DB'yi manuel offline etmiş. Kim?

```sql
-- Audit log — kim offline etti?
SELECT TOP 10 * FROM sys.fn_get_audit_file('D:\SQLAudit\*.sqlaudit', null, null)
ORDER BY event_time DESC;
```

Eğer audit aktif değilse, Windows Security log'larından (Event 4624 + 4663) çıkarılabilir.

## 17:50 — Muhasebe Müdürünün Girişini Geçici Düzelt

Hemen muhasebe müdürünün Logo'ya girmesi lazım. Default DB değişimi:

```sql
USE master;
GO

ALTER LOGIN [MUHASEBE\muhasebe.muduru] 
    WITH DEFAULT_DATABASE = master;
GO
```

Bu komut kullanıcının default DB'sini master'a çevirir. Login yapabilir ama Logo'nun uygulamasına LogoERP DB gerek — Logo offline olduğu için **uygulama içinde hata alır** yine de.

Ama en azından SQL login 4064 hatası bitti. Logo da daha anlaşılır bir hata verir: "Cannot find table..."

### Tüm Kullanıcılar için Toplu Düzeltme

Benzer şekilde etkilenen başka kullanıcılar:

```sql
-- Default DB'si LogoERP olan tüm kullanıcıları listele
SELECT name, default_database_name 
FROM sys.server_principals 
WHERE default_database_name = 'LogoERP';

-- Toplu default DB değiştir
DECLARE @sql nvarchar(max) = N'';
SELECT @sql += 'ALTER LOGIN [' + name + '] WITH DEFAULT_DATABASE = master;' + CHAR(13)
FROM sys.server_principals
WHERE default_database_name = 'LogoERP' AND name NOT LIKE '##%';

EXEC sp_executesql @sql;
```

## 17:53 — Kritik: LogoERP DB'yi Online Getir

Offline DB'yi online yapma girişimi:

```sql
USE master;
GO
ALTER DATABASE LogoERP SET ONLINE;
GO
```

Başarılı mı? Kontrol:
```sql
SELECT name, state_desc FROM sys.databases WHERE name = 'LogoERP';
```

Eğer `state_desc = ONLINE` → Logo şimdi çalışacak.

Eğer **başka bir state** (SUSPECT, RECOVERY_PENDING, EMERGENCY):

### SUSPECT State

SQL Server DB açarken bozukluk tespit ederse **suspect** durumuna alır.

```sql
-- Emergency mode + single user + DBCC CHECKDB
ALTER DATABASE LogoERP SET EMERGENCY;
ALTER DATABASE LogoERP SET SINGLE_USER;

DBCC CHECKDB(LogoERP, REPAIR_ALLOW_DATA_LOSS);  -- son çare — veri kaybı olabilir

ALTER DATABASE LogoERP SET MULTI_USER;
ALTER DATABASE LogoERP SET ONLINE;
```

⚠️ **REPAIR_ALLOW_DATA_LOSS** adı üstünde — veri kaybı olabilir. Önce mutlaka **yedekten restore** denensin.

### RECOVERY_PENDING State

DB dosyasına erişim yok (permissions, lock, disk sorunu):
```sql
-- Log dosyası erişilebilir mi?
SELECT DB_NAME(database_id), type_desc, physical_name, state_desc 
FROM sys.master_files 
WHERE DB_NAME(database_id) = 'LogoERP';
```

Disk tam dolu mu? Dosya okunabiliyor mu? SQL Service hesabı permission'ı var mı?

### RESTORING State

Bir restore işlemi yarıda kalmış:
```sql
-- Restore'u tamamla veya iptal
RESTORE DATABASE LogoERP WITH RECOVERY;
```

Veya eğer son chunk yüklendiyse:
```sql
-- Son restore point'i al, database online yap
RESTORE DATABASE LogoERP WITH RECOVERY;
```

## 17:56 — Yedekten Restore

Suspect/recovery_pending durumundan kurtarma yoksa → **yedekten restore**:

```sql
-- Mevcut DB'yi yedekle (kayıp data varsa bile)
BACKUP DATABASE LogoERP TO DISK = 'D:\Temp\LogoERP_beforeRestore.bak' WITH COPY_ONLY;

-- DROP ve restore
DROP DATABASE LogoERP;

-- Son yedekten restore (örnek dosya yolu)
RESTORE DATABASE LogoERP FROM DISK = 'E:\Backups\LogoERP_FULL_20240510.bak'
    WITH MOVE 'LogoERP_Data' TO 'F:\SQL\DATA\LogoERP_Data.mdf',
         MOVE 'LogoERP_Log' TO 'G:\SQL\LOG\LogoERP_Log.ldf',
         NORECOVERY;

-- Transaction log'ları uygula (eğer son yedek full ise ve sonrası log yedekleri varsa)
RESTORE LOG LogoERP FROM DISK = 'E:\Backups\LogoERP_LOG_20240510_17.trn' WITH NORECOVERY;
RESTORE LOG LogoERP FROM DISK = 'E:\Backups\LogoERP_LOG_20240510_18.trn' WITH RECOVERY;
```

Full + Transaction Log restore ile son 15-30 dakikalık veriye kadar kurtarılabilir.

## 18:02 — Logo Testi

Muhasebe müdürü Logo'yu tekrar açtı:

> "Giriş yaptım, raporlar çalışıyor. Çok sağolun!"

Selim rahat nefes aldı. Cuma akşamı 18:00'da kritik vaka kapandı.

## Kök Sebep Araştırması — "Neden Offline Oldu?"

SQL error log:
```
Login history ile birleştir:
17:15 - sa login from 10.10.20.50
17:15 - ALTER DATABASE LogoERP SET OFFLINE
17:15 - sa disconnect
```

10.10.20.50 = Hangi makine?
```
DNS lookup → dev-sqlclient-01
```

**Geliştirme ekibindeki bir kullanıcı** test için DB'yi offline almış, tekrar online etmeyi unutmuş! Cuma 17:15'te.

Selim geliştirici ile konuştu → production DB'ye test amaçlı bağlanmaları tamamen yasak. Production SQL'e sadece **BT onayıyla** erişim.

## Önleyici Strateji

### 1. sa Hesabı Disable Edilmeli

`sa` hesabının production'da aktif olması güvenlik riski:
```sql
-- sa disable
ALTER LOGIN sa DISABLE;

-- Yerine özel admin hesap
CREATE LOGIN sql_admin_corp WITH PASSWORD = '[strong password]';
ALTER SERVER ROLE sysadmin ADD MEMBER sql_admin_corp;
```

Geliştirici sa ile tehlikeli değişiklik yapamaz.

### 2. Production Access Restriction

Geliştirici sadece geliştirme DB'sine erişim:
```sql
-- Dev user production'da sadece read
USE LogoERP;
CREATE USER dev_readonly FROM LOGIN dev.kerem;
ALTER ROLE db_datareader ADD MEMBER dev_readonly;

-- Dev'de full
USE LogoERP_DEV;
CREATE USER dev_full FROM LOGIN dev.kerem;
ALTER ROLE db_owner ADD MEMBER dev_full;
```

### 3. Audit Logging

```sql
-- SQL Audit — tüm ALTER DATABASE komutlarını logla
CREATE SERVER AUDIT DB_Changes_Audit
TO FILE (FILEPATH = 'D:\SQLAudit\', MAXSIZE = 100MB);

CREATE SERVER AUDIT SPECIFICATION DB_Changes_Spec
FOR SERVER AUDIT DB_Changes_Audit
ADD (DATABASE_CHANGE_GROUP);

ALTER SERVER AUDIT DB_Changes_Audit WITH (STATE = ON);
ALTER SERVER AUDIT SPECIFICATION DB_Changes_Spec WITH (STATE = ON);
```

Artık kim ne zaman bir DB state değiştirdi — log'da var.

### 4. Monitoring + Alert

Kritik DB'ler offline olunca anında alarm:
```sql
-- SQL Agent Job — her 5 dk kontrol
IF EXISTS (SELECT 1 FROM sys.databases WHERE name = 'LogoERP' AND state_desc != 'ONLINE')
BEGIN
    EXEC msdb.dbo.sp_send_dbmail 
        @profile_name = 'SQLAlerts',
        @recipients = 'it@firma.com.tr',
        @subject = 'CRITICAL: LogoERP offline',
        @body = 'LogoERP database is not online. Immediate action required.';
END
```

## Diğer Error 4064 Sebepleri

### Database Silinmiş

```sql
-- DB mevcut mu?
SELECT name FROM sys.databases WHERE name = 'LogoERP';
```

Sonuç boş = DB silinmiş. Yedekten restore + default DB'yi master'a çevir.

### Kullanıcı DB'de User Değil

Login server-level var, ama DB-level user yok:
```sql
-- DB'de user kontrolü
USE LogoERP;
SELECT name FROM sys.database_principals WHERE type_desc IN ('SQL_USER', 'WINDOWS_USER');
```

Kullanıcı listede yoksa:
```sql
CREATE USER [MUHASEBE\muhasebe.muduru] FROM LOGIN [MUHASEBE\muhasebe.muduru];
ALTER ROLE db_owner ADD MEMBER [MUHASEBE\muhasebe.muduru]; -- gerekli rol
```

### Orphan User

DB restore edildikten sonra SID uyumsuzluğu:
```sql
USE LogoERP;
EXEC sp_change_users_login 'Report'; -- orphan user'ları listele

-- Fix:
EXEC sp_change_users_login 'Update_One', 'muhasebe.muduru', 'MUHASEBE\muhasebe.muduru';
```

## İlgili Rehberler

- [SQL Server 18456 Login failed](/blog/sql-server-hatasi-18456-login-failed-state-kodlari)
- [Veeam SQL application-aware backup](/blog/veeam-vmware-backup-job-encryption-kurulum)
- [Veeam VSS 0x8007045B hatası](/blog/veeam-backup-hatasi-0x8007045B-vss)

---

**SQL Server yönetimi, DBA hizmetleri, performans tuning ve yedekleme stratejisi için uzman destek?** Kozyatağı Bilişim MCSA Data Platform sertifikalı ekibimizle. [Teknik görüşme talep edin.](/#contact)
