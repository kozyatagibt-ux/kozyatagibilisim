---
slug: ad-sysvol-frs-dfsr-migration
title: "SYSVOL FRS'den DFSR'ye Migration — Eski Domain Modernizasyonu"
type: cluster
pillar: 2
url: "/blog/ad-sysvol-frs-dfsr-migration"
hedef_anahtar_kelime: "sysvol frs dfsr migration"
meta_description: "Eski Windows Server 2003/2008 domain'lerde SYSVOL FRS replikasyonunu DFSR'ye migration — 4 aşama: Prepared, Redirected, Eliminated ve dcdiag doğrulama."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "FRS to DFSR"
product_family: "Windows Server & Active Directory"
---

## "Domain 15 Yaşında, Hâlâ FRS Kullanıyor"

BT müdürü Emre yeni Windows Server 2022 ortamına migration planlıyor. Audit:

```powershell
dfsrmig /getglobalstate
```

Çıktı:
```
Current DFSR global state: 'Start'
Succeeded
```

**FRS hâlâ aktif**. 2008'den beri DFSR var, 2016'dan itibaren Microsoft zorunlu tutuyor. 2022 domain functional level yükseltmek için önce DFSR migration şart.

Bu yazı 4 aşamalı migration'ı anlatıyor.

## FRS vs DFSR

**FRS (File Replication Service)** — Windows 2000 era, legacy:
- Journal wrap sorunları
- Performance zayıf
- Self-healing minimum

**DFSR (Distributed File System Replication)** — Windows Server 2003 R2+, modern:
- Remote Differential Compression
- Conflict/auto-recovery
- Better throughput

## Hızlı Çözüm (TL;DR)

4 aşama + doğrulama:
```cmd
dfsrmig /setglobalstate 1   # Prepared (FRS ve DFSR paralel)
# 1 hafta bekle + doğrulama
dfsrmig /setglobalstate 2   # Redirected (DFSR primary, FRS backup)
# 1 hafta bekle + doğrulama
dfsrmig /setglobalstate 3   # Eliminated (FRS kaldırıldı)
```

---

## Ön Koşullar

### 1. Forest/Domain Functional Level

Minimum **Windows Server 2008**:
```powershell
Get-ADForest | Select ForestMode
Get-ADDomain | Select DomainMode
```

2008 veya üstü ise OK. 2003 ise önce FL upgrade.

### 2. Tüm DC'ler Health

```cmd
repadmin /replsummary
dcdiag /v
```

Hiçbir replication error olmamalı.

### 3. Backup

SYSVOL'ün **system state backup**'ı + **SYSVOL folder backup**'ı:
```cmd
wbadmin start systemstatebackup -backuptarget:E: -quiet

# SYSVOL folder
xcopy "C:\Windows\SYSVOL" "E:\Backup\SYSVOL_$(Get-Date -Format 'yyyyMMdd')" /E /H /K
```

## 10:00 — Aşama 1: Prepared

FRS ve DFSR **paralel** çalışır. SYSVOL hem FRS hem DFSR ile replike olur. Test amaçlı.

```cmd
dfsrmig /setglobalstate 1
```

Çıktı:
```
Current DFSR global state: 'Start'
New DFSR global state: 'Prepared'
Migration will proceed to 'Prepared' state. DFSR service will copy 
the contents of SYSVOL to SYSVOL_DFSR folder. Once all domain 
controllers successfully reach the 'Prepared' state, migration 
command 'dfsrmig /setglobalstate 2' should be run to continue the 
migration process.
Succeeded.
```

### İzleme

```cmd
dfsrmig /getmigrationstate
```

Tüm DC'ler "Prepared" state'e ulaşana kadar bekle. Küçük domain 30 dk, büyük domain 4-12 saat. SYSVOL klasör boyutuna göre değişir.

Çıktı tamamlandığında:
```
Current state: 'Prepared'
All Domain Controllers have migrated successfully to Prepared state.
Migration has reached a consistent state on all domain controllers.
Succeeded.
```

**1 hafta bekle** — production'da herhangi bir sorun belirmezse devam.

### Doğrulama

SYSVOL_DFSR klasörü oluşmuş olmalı:
```powershell
Get-ChildItem "C:\Windows\SYSVOL_DFSR\domain" -Recurse | Measure-Object | Select Count
Get-ChildItem "C:\Windows\SYSVOL\domain" -Recurse | Measure-Object | Select Count
```

Count'lar yakın olmalı.

## 10:15 — Aşama 2: Redirected (1 hafta sonra)

DFSR **primary** olur. Client'lar DFSR-managed SYSVOL kullanır. FRS hâlâ backup olarak çalışır.

```cmd
dfsrmig /setglobalstate 2
```

### İzleme

```cmd
dfsrmig /getmigrationstate
```

Tüm DC'ler "Redirected" olana kadar bekle.

### Doğrulama

```cmd
# SYSVOL share'i DFSR olarak mı?
dfsrmig /getglobalstate
```

`Redirected` göstermeli.

Client tarafında:
```powershell
Get-Item "\\corp.firma.com.tr\SYSVOL"
```

Accessible olmalı, GPO apply olmalı.

### Test GPO Değişikliği

Bir test GPO oluştur ve tüm DC'lerde replicate ol. SYSVOL_DFSR'ye yazar, FRS'e DEĞİL (redirected state'te).

### 1 Hafta Daha Bekle

Production gözlemi. Sorun varsa geri dönüş mümkün:
```cmd
dfsrmig /setglobalstate 1   # Prepared'e geri dön
# Veya
dfsrmig /setglobalstate 0   # Start'a geri dön (FRS primary)
```

Ama `dfsrmig /setglobalstate 3`'ten sonra geri dönüş YOK.

## 10:30 — Aşama 3: Eliminated (son hafta sonra)

FRS tamamen kaldırılır. DFSR tek replikasyon mekanizması.

```cmd
dfsrmig /setglobalstate 3
```

⚠️ **Uyarı**: "Eliminated" sonrası FRS'e geri dönemezsin. Önceki 2 haftada problem yoksa devam.

### İzleme

```cmd
dfsrmig /getmigrationstate
```

Tüm DC'lerde "Eliminated" ulaştığında:
```
All Domain Controllers have migrated successfully to the Eliminated state.
```

## 10:45 — Post-Migration

### 1. FRS Service Disable

Migration sonrası NTFRS service artık gereksiz:
```powershell
# Her DC'de
Stop-Service NTFRS -Force
Set-Service NTFRS -StartupType Disabled
```

### 2. SYSVOL Klasör Temizliği

Eski `C:\Windows\SYSVOL` klasörü artık boş (SYSVOL_DFSR kullanılıyor). Temizle:
```powershell
# DİKKAT — önce doğrula SYSVOL_DFSR dolu
Get-ChildItem "C:\Windows\SYSVOL\domain" -Recurse | Measure-Object | Select Count
# 0 olmalı

# Sil
Remove-Item "C:\Windows\SYSVOL" -Recurse -Force
```

Aslında sadece junction point — `SYSVOL_DFSR` artık `SYSVOL` adı ile erişilebilir.

### 3. Doğrulama

```cmd
dcdiag /test:sysvolcheck /test:netlogons
```

Her iki test "passed" olmalı.

```cmd
dcdiag /test:advertising
```

DC'nin netlogon + SYSVOL share advertise ettiğini doğrular.

### 4. GPO Replikasyon Testi

Yeni test GPO oluştur:
```powershell
New-GPO -Name "Test-Migration-GPO"
```

5 dk bekle, başka DC'de:
```powershell
Get-GPO -Name "Test-Migration-GPO"
```

Visible mi? Evet ise replication OK.

## Yaygın Hatalar

### Aşama 1 Hiç Tamamlanmıyor

```cmd
dfsrmig /getmigrationstate
```

Bazı DC'ler "Preparing" state'te takılı. Event Viewer > DFS Replication:
```
Event ID: 4614 — DFS Replication is stopping the migration
```

Sebep genelde:
- DC unavailable (offline) — online yap
- Replication backlog — `repadmin /syncall /AdeP`
- Disk dolu — temizle

### SYSVOL Inconsistency

Migration sırasında bazı GPO'lar DC'ler arası farklı. Burflex ile fix:
```cmd
# Authoritative DC (en güncel) seçilip diğerlerinde force resync
dfsrmig /setglobalstate 0   # Start'a dön
# Authoritative restore
ntdsutil
authoritative restore
restore subtree "cn=file replication service,cn=system,dc=corp,dc=firma,dc=com,dc=tr"
```

Sonra migration baştan.

### "The requested name is valid, but no data of the requested type was found"

DNS SRV kayıt problemi. Migration sonrası NETLOGON restart ile re-register:
```powershell
Restart-Service Netlogon
```

## İleri Seviye — Journal Wrap Recovery

FRS "journal wrap" yaşadıysa (eski domain'lerde sık), migration öncesi burflag:
```
Registry: HKLM\SYSTEM\CurrentControlSet\Services\NtFrs\Parameters\Backup/Restore\Process at Startup
BurFlags = D2 (authoritative) veya D4 (non-authoritative)

NTFRS restart
```

D2 = "Ben source'um, herkes benden kopyalasın"  
D4 = "Ben destination'ım, başkasından kopyaladım"

Migration öncesi domain'i clean state'e almak için.

## DFSR Bakım

Post-migration DFSR için düzenli sağlık kontrol:

```powershell
# Backlog kontrolü
dfsrdiag Backlog /RGName:"Domain System Volume" /RFName:"SYSVOL Share" `
    /SendingMember:DC01 /ReceivingMember:DC02
```

Backlog 1000+ ise problem — [DFSR backlog stuck rehberi](/blog/dfsr-replication-backlog-stuck-sysvol).

## İlgili Rehberler

- [DFSR replication backlog stuck](/blog/dfsr-replication-backlog-stuck-sysvol)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)
- [Event 2042 tombstone](/blog/ad-event-2042-too-long-since-replicated-tombstone)

---

**Legacy AD modernization, FRS→DFSR migration ve Windows Server upgrade için uzman destek?** Kozyatağı Bilişim AD migration paketimiz. [Teknik görüşme.](/#contact)
