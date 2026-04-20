---
slug: sql-server-hatasi-18456-login-failed-state-kodlari
title: "SQL Server Hatası 18456 'Login Failed' — State Kodlarına Göre Çözüm"
type: cluster
pillar: 8
url: "/blog/sql-server-hatasi-18456-login-failed-state-kodlari"
hedef_anahtar_kelime: "sql server 18456 login failed"
meta_description: "SQL Server Error 18456 'Login failed for user' çözümü. Tüm state kodları (2, 5, 6, 7, 8, 11, 12, 38, 58) için detaylı tanı ve çözüm rehberi."
kelime_sayisi: "~2200"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
troubleshoot: true
error_code: "18456"
product_family: "SQL Server & Veritabanı"
---

## Semptom

SQL Server Management Studio (SSMS) ile bağlanmaya çalışırken:

```
Login failed for user 'DOMAIN\username'. (Microsoft SQL Server, Error: 18456)
```

Veya uygulama bağlantı string'inde:
```
Cannot open database "muhasebe" requested by the login. The login failed.
Login failed for user 'webapp_user'.
```

Error log'da (`ERRORLOG`) daha detaylı:
```
2026-04-20 14:22:31.45 Logon       Login failed for user 'DOMAIN\user'. 
Reason: Could not find a login matching the name provided. [CLIENT: 192.168.1.45]
Error: 18456, Severity: 14, State: 5.
```

**En kritik bilgi: State: X** kısmı. Her state farklı anlam taşır ve farklı çözüm gerektirir. Genel kullanıcıya `State: 1` gösterilir (güvenlik için), ama SQL error log'da gerçek state yazılır.

## Hızlı Çözüm (TL;DR)

1. SQL Server error log'unu aç: `SSMS > Management > SQL Server Logs`
2. İlgili "18456" satırını bul, **State kodunu** oku
3. Aşağıdaki tabloyla eşleştir:

| State | Anlam | Hızlı Çözüm |
|---|---|---|
| **2** | Kullanıcı adı yanlış | Kullanıcı adını kontrol et |
| **5** | Kullanıcı yok | SQL'de login yoksa oluştur |
| **6** | Windows user, SQL Auth modda | Auth modu değiştir veya user türü |
| **7** | Login disabled | Login'i enable et |
| **8** | Şifre yanlış | Şifreyi sıfırla |
| **11** | Windows user, SPN problemi | SPN register et |
| **12** | Windows user, yetki yok | Database'e erişim ver |
| **38** | DB değişti / offline | DB mount et / yeniden bağlan |
| **58** | SQL Auth off | Mixed mode aktif et |

## State Kodlarına Göre Detaylı Tanı

### State 2 — "Could not find a login matching the name provided"

Kullanıcı adı SQL'de kayıtlı değil.

**Test:**
```sql
SELECT name FROM sys.server_principals WHERE name LIKE '%user%'
```

**Çözüm**: Login yanlış yazılmış (typo) veya Windows login henüz oluşturulmamış.

```sql
-- Windows login oluştur
CREATE LOGIN [DOMAIN\user] FROM WINDOWS;

-- SQL Auth login oluştur
CREATE LOGIN webapp_user WITH PASSWORD = 'StrongPass!2024';
```

### State 5 — "Login invalid"

State 2 ile benzer ama biraz farklı contextte. Kullanıcı bağlantı isteği göndermiş ama SQL kullanıcıyı tanıyamıyor.

**Sık sebep**: Domain trust problem — domain controller'a ulaşılamıyor, SQL kullanıcıyı doğrulayamıyor.

**Test**:
```cmd
# SQL server'dan domain DC'ye ulaşabiliyor musun?
ping domain_dc
nltest /dsgetdc:domain.local
```

Ulaşılamıyorsa network problemi var.

### State 6 — "Attempt to use Windows login with SQL Auth mode"

SQL Server "Mixed Mode" değil sadece "Windows Auth" kullanıyorsa, SQL Auth denemeleri state 6 verir.

**Test**:
```sql
-- Auth mode kontrolü
SELECT SERVERPROPERTY('IsIntegratedSecurityOnly') AS "SQL_AUTH"
-- 0: Mixed Mode, 1: Sadece Windows
```

**Çözüm**: Mixed Mode'a geç.

SSMS > SQL Server > Properties > Security:
- Server authentication: "SQL Server and Windows Authentication mode"
- SQL Server servisini restart (gerekli)

### State 7 — "Login is disabled"

Login var ama disable edilmiş.

**Test**:
```sql
SELECT name, is_disabled 
FROM sys.server_principals 
WHERE name = 'webapp_user';
```

`is_disabled = 1` ise disable.

**Çözüm**:
```sql
ALTER LOGIN webapp_user ENABLE;
```

Ayrıca **şifresi expire olmuş** olabilir:
```sql
ALTER LOGIN webapp_user WITH PASSWORD = 'NewPass!2024' OLD_PASSWORD = 'OldPass!2024';
-- Veya check policy disable
ALTER LOGIN webapp_user WITH CHECK_EXPIRATION = OFF, CHECK_POLICY = OFF;
```

### State 8 — "Password mismatch"

En yaygın sebep: kullanıcı yanlış şifre giriyor.

**Çözüm (admin yetkisinde)**:
```sql
ALTER LOGIN webapp_user WITH PASSWORD = 'NewStrongPass!2024' UNLOCK;
```

UNLOCK ekli çünkü çok deneme sonrası lock olmuş olabilir.

Kullanıcıya yeni şifreyi ilet + şifre değişiklik zorunluluğu:
```sql
ALTER LOGIN webapp_user WITH PASSWORD = 'temp_pass' MUST_CHANGE, CHECK_EXPIRATION = ON;
```

### State 11 — "Login valid but server access failed"

Windows login OK, domain trust OK, ama SQL'e gelişte **SPN** (Service Principal Name) veya Kerberos delegation problemi.

**Test**:
```cmd
# SQL Server computer account'ında SPN kaydını kontrol
setspn -L sqlserver_computer_name

# Beklenen:
# MSSQLSvc/sqlserver.domain.local
# MSSQLSvc/sqlserver.domain.local:1433
```

Eksik veya duplicate SPN state 11'e yol açar.

**Çözüm**:
```cmd
# Domain admin olarak
setspn -A MSSQLSvc/sqlserver.domain.local:1433 DOMAIN\sqlservice_account
```

Ya da SQL servis hesabı **self-register** edebilmelidir — "Log on as a service" + "Validated write to service principal name" AD permissions gerek.

### State 12 — "Login valid, database access failed"

Login OK, connection OK, ama belirli bir **database'e yetki yok**.

**Test**:
```sql
USE muhasebe;
GO
SELECT DP.name AS user_name, 
       DP.type_desc,
       DP.default_schema_name
FROM sys.database_principals DP
INNER JOIN sys.server_principals SP ON DP.sid = SP.sid
WHERE SP.name = 'webapp_user';
```

Sonuç boşsa user o database'de yok.

**Çözüm**:
```sql
USE muhasebe;
GO
CREATE USER webapp_user FOR LOGIN webapp_user;
ALTER ROLE db_datareader ADD MEMBER webapp_user;
ALTER ROLE db_datawriter ADD MEMBER webapp_user;
```

Ya da orphaned user:
```sql
USE muhasebe;
GO
-- Check orphaned users
EXEC sp_change_users_login 'Report';

-- Fix orphan
EXEC sp_change_users_login 'Update_One', 'webapp_user', 'webapp_user';
```

### State 38 — "Database context cannot be determined"

Default database erişilemez:
- Database offline
- Database suspect
- Database restricted user mode
- Login default DB silinmiş

**Test**:
```sql
SELECT default_database_name 
FROM sys.server_principals 
WHERE name = 'webapp_user';

-- Default DB durumu
SELECT name, state_desc 
FROM sys.databases 
WHERE name = 'muhasebe';
```

**Çözüm**:
```sql
-- Default DB değiştir
ALTER LOGIN webapp_user WITH DEFAULT_DATABASE = master;

-- Ya da problemli DB online yap
ALTER DATABASE muhasebe SET ONLINE;
ALTER DATABASE muhasebe SET MULTI_USER;
```

### State 58 — "SQL Server Auth not enabled"

Aynı state 6 ile benzer — SQL Server sadece Windows Auth modda, SQL Auth deneniyor.

**Çözüm**: Mixed Mode'a geç (state 6'dakinin aynısı).

### State 40 — "Cannot open database"

Database tamamen erişilemez:
- Disk dolu
- Yetkisiz sahip değişikliği
- Recovery'de
- Emergency mode'da

```sql
SELECT name, state_desc, user_access_desc 
FROM sys.databases 
WHERE name = 'muhasebe';
```

State: RECOVERING, RECOVERY_PENDING, SUSPECT, EMERGENCY — hepsi aksiyon gerektirir.

### State 102 — "Protocol error"

Client ve SQL Server arasında network level protocol problemi. Genellikle TLS/SSL handshake veya Shared Memory / Named Pipes / TCP tercihi yanlış.

**Test**:
```
SSMS > File > Connect Object Explorer > Options > Network Protocol
TCP/IP seç
```

## Nereden Log Alırım?

SSMS üzerinden:
```
Object Explorer > [SQL Server] > Management > 
SQL Server Logs > Current
```

Dosya sistemi:
```
C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\Log\ERRORLOG
```

PowerShell:
```powershell
Get-Content "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\Log\ERRORLOG" | 
    Select-String "18456"
```

## SSMS vs Uygulama Bağlantısı Farkı

**SSMS bağlanıyor ama uygulama bağlanamıyor** senaryosu çok yaygın. Sebepleri:

1. **Farklı kullanıcı**: SSMS kendi Windows user'ıyla, uygulama service account'la bağlanır
2. **Farklı protokol**: SSMS Shared Memory, uygulama TCP kullanabilir
3. **Farklı network path**: SSMS local, uygulama farklı segment
4. **Connection string farklı**: Database adı, Integrated Security, Trust Server Certificate

Uygulamanın connection string'ini log'da veya appsettings.json'da gör, SSMS'te aynı string'le dene.

## Önleyici Bakım

### 1. Düzenli şifre politikası yönetimi
```sql
SELECT name, modify_date, is_expiration_checked, is_policy_checked
FROM sys.sql_logins;
```

Şifre expire olan account'ları erkenden uyar.

### 2. Orphaned user temizliği
```sql
-- Her ay çalıştır
EXEC sp_change_users_login 'Report';
```

Orphan user'lar performance çakma yapar.

### 3. Active Directory grup kullan
Kullanıcı bazlı login yerine AD group:
```sql
CREATE LOGIN [DOMAIN\SQL_Users] FROM WINDOWS;
```

Grup üyelik değişince SQL'de de otomatik uyum — manuel yönetim az.

### 4. Audit/monitoring
```sql
-- Failed login'leri izle
CREATE SERVER AUDIT Logon_Audit
TO FILE (FILEPATH = 'C:\SQLAudit\');

CREATE SERVER AUDIT SPECIFICATION Logon_Spec
FOR SERVER AUDIT Logon_Audit
ADD (FAILED_LOGIN_GROUP);
```

## Sık Sorulan Sorular

### Windows Authentication kullanıyorum ama state 2 alıyorum

Kullanıcı veya grubu SQL'e login olarak eklemedin.
```sql
CREATE LOGIN [DOMAIN\user] FROM WINDOWS;
```

### "Always On Availability Group" ile bağlanırken 18456

Listener üzerinden bağlanıyorsan SPN muhtemelen listener için set edilmemiş. `MSSQLSvc/listener_name.domain.local:port` SPN'i kontrol et.

### ODBC Driver güncellendi sonra bağlanamıyorum

ODBC 18 (2022+) varsayılan olarak TLS 1.2+ ve certificate validation ister. Connection string'e ekle:
```
TrustServerCertificate=yes;Encrypt=yes;
```

### Neden state 1 görüyorum SSMS'te?

Güvenlik nedeniyle client tarafa "information disclosure" olmaması için genelleştirilmiş state. Gerçek state SQL error log'da.

### SQL Server Express'te 18456

Aynı troubleshoot adımları Express için de geçerli. Express'te TCP/IP default disabled olabilir — SQL Configuration Manager'dan aç.

---

**SQL Server altyapı yönetimi, tuning, high availability mı gerekiyor?** Kozyatağı Bilişim DBA hizmetleri ile kurulum, bakım, monitoring, backup, disaster recovery sunuyoruz. [Teknik görüşme talep edin.](/#contact)
