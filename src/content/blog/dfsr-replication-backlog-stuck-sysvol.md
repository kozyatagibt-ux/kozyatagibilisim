---
slug: dfsr-replication-backlog-stuck-sysvol
title: "DFSR Replication Backlog Stuck — SYSVOL ve File Server Yedekleme Gecikmesi"
type: cluster
pillar: 4
url: "/blog/dfsr-replication-backlog-stuck-sysvol"
hedef_anahtar_kelime: "dfsr replication backlog stuck"
meta_description: "DFSR (Distributed File System Replication) backlog birikmiş, file server veya SYSVOL senkronize olmuyor. Authoritative sync, staging folder ve health monitoring."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/dosya-paylasim"
troubleshoot: true
error_code: "DFSR Backlog / Event 4012"
product_family: "Windows Server & Active Directory"
---

## Semptom

DFS Management konsolu veya PowerShell ile DFSR durumu kontrolünde:

```
Backlog: 45,000+ files between DC01 and DC02
State: Pending
Last sync: 18 hours ago
```

Ya da Event Viewer > Applications and Services Logs > DFS Replication:
```
Event ID 4012
The DFS Replication service stopped replication on volume X
because it has been disconnected for more than 60 days.
```

Veya:
```
Event ID 2213
The DFS Replication service stopped replication because of a 
persistent error condition.
```

Senkronizasyon bozulunca:
- Group Policy değişikliklerin client'larda uygulanmadığı (SYSVOL sync bozuk)
- File server'da bir şubede yazılan dosya başka şubede görünmüyor
- Logon script eski versiyonda kalıyor

## Hızlı Çözüm (TL;DR)

1. DFSR health rapor: `dfsrdiag ReplicationState`
2. Backlog var mı: `dfsrdiag Backlog`
3. Event 4012 gördüysen: **60 günden fazla disconnect** — authoritative sync gerekli
4. Staging quota yetersizse büyüt: `Set-DfsrMembership -StagingPathQuotaInMB 32768`
5. SYSVOL için özel: FRS → DFSR migration tamamlanmış mı kontrol

## DFSR Ne Yapar?

DFSR (Distributed File System Replication), birden fazla sunucu arasında klasör içeriğini senkronize tutan Windows servisidir. En yaygın kullanım:

1. **SYSVOL replication** — Domain Controller'lar arası GPO senkronizasyonu
2. **File server replication** — Şubeler arası ortak dosya paylaşımı
3. **Branch office caching** — DFS Namespace ile

Backlog = senkronize olması gereken ama henüz olmamış dosya sayısı.

## 5 Ana Sebep

### Sebep 1: Uzun Kesinti (60+ Gün)
DFSR default MaxOfflineTimeInDays = 60. Bir node 60+ gün offline'sa replication durur (veri tutarsızlığı riski).

### Sebep 2: Staging Folder Dolu
DFSR her replicate edilen dosyayı "staging folder"a ön kopyalar. Bu klasör dolunca replication takılır. Default quota 4 GB — büyük dosyalar için yetersiz.

### Sebep 3: Database Corruption
`C:\System Volume Information\DFSR` altındaki database bozulmuş. Event ID 2213, 5002 tipik.

### Sebep 4: Disk Dolu / Performance
Source veya destination sunucuda disk %95+ dolu, I/O yavaş.

### Sebep 5: Ağ Gecikmesi / Bandwidth
Şube ile merkez arası WAN yavaş — replication bandwidth throttle'a takılmış.

## Adım Adım Çözüm

### Adım 1: Sağlık Raporu

PowerShell (her DFSR member'da çalışabilir):
```powershell
# Genel sağlık raporu
dfsrdiag ReplicationState /member:DC01

# Backlog kontrolü
dfsrdiag Backlog /ReceivingMember:DC01 /SendingMember:DC02 /RGName:"Domain System Volume" /RFName:"SYSVOL Share"

# Yerel DFSR state
Get-DfsrState
```

Backlog 10,000+ ise sorun var. 100,000+ ise ciddi.

### Adım 2: Event Log İncelemesi

```powershell
Get-WinEvent -LogName "DFS Replication" -MaxEvents 50 | 
    Where {$_.LevelDisplayName -eq "Error" -or $_.LevelDisplayName -eq "Warning"} |
    Format-Table TimeCreated, Id, Message -Wrap
```

Kritik Event ID'leri:

| Event ID | Anlam |
|---|---|
| 4012 | 60+ gün disconnected, replication stopped |
| 4004 | DFSR service started |
| 4114 | Replication error — USN rollback |
| 5002 | Database corruption |
| 5014 | Staging quota full |

### Adım 3: Staging Quota Artır

Eğer Event ID 5014 varsa:
```powershell
Get-DfsrMembership | Select GroupName, Path, StagingPath, StagingPathQuotaInMB
```

Quota 4096 MB (4 GB) ise büyüt:
```powershell
Set-DfsrMembership -GroupName "Domain System Volume" `
    -FolderName "SYSVOL Share" `
    -ComputerName "DC01" `
    -StagingPathQuotaInMB 32768  # 32 GB
```

En az **replicate edilen en büyük dosyanın 2 katı** olmalı.

### Adım 4: 60 Gün Kesinti Sonrası Çözüm

Event 4012 varsa replication durmuş. İki seçenek:

**Seçenek A — MaxOfflineTimeInDays Artır:**
```
ADSI Edit > CN=Replication,CN=System,...

dfsrMember objesi > Properties > 
msDFSR-Options > 0x2 (= DisableReplicationIfOutOfDate disable)

# Veya
msDFSR-MaxOfflineTimeInDays = 120 (örn.)
```

Sonra DFSR servisini restart: `Restart-Service DFSR`.

**Seçenek B — Authoritative Sync:**
En güncel node'u "authoritative" ilan et, diğerleri bu node'dan baştan senkronize olur. SYSVOL için klasik senaryo.

```powershell
# 1. En güncel DC'yi seç (genelde PDC Emulator)
# 2. DFSR servisini durdur
Stop-Service DFSR -Force

# 3. ADSI Edit ile değişiklik:
# CN=SYSVOL Subscription,CN=Domain System Volume,CN=DFSR-LocalSettings,CN=<computer>
# msDFSR-Enabled = FALSE

# 4. Diğer DC'lerde de msDFSR-Enabled = FALSE

# 5. AD replication tetikle
repadmin /syncall /AdeP

# 6. Authoritative node'da msDFSR-Enabled = TRUE + msDFSR-Options = 1 (authoritative)

# 7. Authoritative node'da DFSR başlat
Start-Service DFSR

# 8. Other DC'lerde msDFSR-Enabled = TRUE (authoritative değil)
# 9. Other DC'lerde DFSR başlat — bunlar authoritative'ten sync alır
```

Detay: Microsoft KB 2218556.

⚠️ **Uyarı**: Authoritative sync büyük risk — yanlış node'u seçersen veri kaybı. Önce **backup** al.

### Adım 5: Database Corruption

Event 5002 varsa DFSR database bozuk. Çözüm — rebuild:
```powershell
Stop-Service DFSR

# Database klasörünü sil
Remove-Item "C:\System Volume Information\DFSR" -Recurse -Force

Start-Service DFSR
```

DFSR database'i sıfırdan oluşturur (saatler sürebilir büyük file share'lerde). İlk senkronizasyon çok I/O yükü — gece çalıştırın.

### Adım 6: Bandwidth Throttle

Şube ofisler için replication bandwidth sınırlı olabilir:
```powershell
Get-DfsrConnection -GroupName "Domain System Volume"

# Hafta içi gündüz sınırlı, gece full speed
Set-DfsrConnectionSchedule -GroupName "File Share" `
    -SourceComputerName "DC01" `
    -DestinationComputerName "DC02" `
    -ScheduleType Unlimited
```

Günlük iş saatleri dışı replication daha hızlı ilerler.

### Adım 7: Manuel Replication Tetikle

```powershell
# Force replication poll
Sync-DfsReplicationGroup -GroupName "Domain System Volume" -Force
```

Backlog varken tekrar tetiklemek kuyruğu hızlandırır.

## Kurumsal Senaryolar

### Şubeler Arası File Server

Merkez ofis + 4 şube ile DFSR kullanıyoruz. Her şubede local copy, merkez authoritative:

**İdeal kurulum**:
- Hub-and-spoke topology (merkez hub, şubeler spoke)
- Staging quota = en büyük dosya × 2
- Şube→merkez read-only replication (şube dosya ekleyemez)
- Merkez "authoritative" — çakışma olursa merkez kazanır

**Yaygın hata**: Mesh topology (her şube her şubeye). Management cehennemi, conflict çok.

### SYSVOL FRS → DFSR Migration

Çok eski domain'ler (2003 forest functional level) FRS kullanıyor. Windows Server 2012+ için DFSR'e migration şart.

```powershell
# Migration state kontrolü
dfsrmig /GetGlobalState
```

Sırasıyla: Prepared → Redirected → Eliminated. Ara aşamada takılı kalmış domain'ler için ayrı troubleshooting.

### DFS Namespace + DFSR

DFS Namespace kullanıcıya tek URL (`\\corp.firma\Share`) verir, arkada birden fazla target'a load balance yapar. DFSR bu target'lar arası senkronizasyonu sağlar.

Namespace sorunu ≠ DFSR sorunu. Ayrı troubleshoot.

## Önleyici Bakım

1. **Haftalık backlog raporu** otomatik:
```powershell
# scheduled task
$backlog = dfsrdiag Backlog /ReceivingMember:DC01 /SendingMember:DC02 ...
if ($backlog -gt 1000) {
    Send-MailMessage -Subject "DFSR backlog alert" ...
}
```

2. **Staging quota seçimi** — her membership için ayrı

3. **Aylık health report**:
```powershell
Get-DfsrState | Export-Csv "monthly-dfsr-$(Get-Date -Format 'yyyy-MM').csv"
```

4. **SYSVOL backup** — authoritative sync senaryolarında kurtarma noktası

## Sık Sorulan Sorular

### Backlog hiç azalmıyor ama DFSR service çalışıyor

Staging quota yetersiz veya ağ çok yavaş. Bant genişliği test edin (iperf3 ile node'lar arası).

### "USN Rollback" hatası ne?

Event 4114. Genelde VM snapshot revert sonrası — Volume Serial Number database'e göre eski. Çözüm: DFSR restore önceki versiyona. Microsoft KB 875495.

### Birden fazla DC'yi aynı anda offline yaptığım için SYSVOL bozuldu

Domain-wide SYSVOL authoritative sync gerekli. En güvenilir kaynak tek node'u belirle (gel-git, genelde PDC), oradan force replication.

### DFSR için Windows Server 2022 farklı mı?

Çekirdek aynı. Ama Server 2022'de DFSR daha az "önemli" — Microsoft alternatif olarak Azure File Sync, DFS-Namespace + SMB yerine farklı stratejiler öneriyor.

---

**DFSR, file server kurulum ve branch office replication yönetimi için uzman destek?** Kozyatağı Bilişim olarak AD + File Server + DFS altyapı projesi. [Teknik görüşme talep edin.](/#contact)
