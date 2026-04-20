---
slug: veeam-backup-hatasi-0x8007045B-vss
title: "Veeam Backup Hatası 0x8007045B (VSS Error) — Adım Adım Çözüm"
type: cluster
pillar: 3
url: "/blog/veeam-backup-hatasi-0x8007045B-vss"
hedef_anahtar_kelime: "veeam 0x8007045b hatası"
meta_description: "Veeam Backup & Replication'da 0x8007045B VSS hatası için gerçek çözüm. VSS writer sorunları, quiesce failure, disk space, application-aware backup tanılama."
kelime_sayisi: "~2200"
pillar_linki: "/hizmetler/felaket-kurtarma-yedekleme"
troubleshoot: true
error_code: "0x8007045B"
product_family: "Veeam & Yedekleme"
---

## Semptom

Veeam Backup & Replication job log'unda şu hata:

```
Processing [VM_name] Error: VSSControl: -2147212243 Backup job failed. 
Cannot create a shadow copy of the volumes containing writer's data.
A VSS critical writer has failed.
Failed to perform backup.
```

Ya da:

```
Code: 0x8007045B
Description: A system shutdown is in progress.
```

Ya da:

```
VSS provider failed at phase "PreCommit"
VSS writer "Microsoft Exchange Writer" failed with error code 0x800423f4
```

Backup job "Failed" veya "Warning" durumunda kalıyor. Bazı durumlarda:
- İlk gün çalışan job ertesi gün aynı hatayı veriyor
- Sadece belirli bir VM'de hata var, diğerleri normal backup alıyor
- Tam VM yerine sadece "crash-consistent" backup alınıyor (application-aware başarısız)

## Hızlı Çözüm (TL;DR)

1. Hata alan VM içinde `vssadmin list writers` çalıştır
2. "Failed" state'te yazıcı varsa ilgili servisi restart et
3. Disk dolu mu kontrol: minimum **%10 boş alan** gerekiyor VSS için
4. Guest OS içinde: `eventvwr` > Application log'unda VSS error ID'lerini oku
5. Gerekirse Veeam job'unu "crash-consistent" olarak çalıştır geçici

## VSS Nedir ve Neden 0x8007045B?

**VSS (Volume Shadow Copy Service)** Windows'un snapshot mekanizması. Veeam VM backup alırken guest OS içindeki uygulamaları (SQL, Exchange, AD) **quiesce** (durdurma değil, "veri tutarlılığı için bekletme") etmek için VSS kullanır.

VSS başarısız olursa backup:
- Devam edebilir ama **"crash-consistent"** olur (uygulama verisi tutarsız olabilir)
- Tamamen fail edebilir

0x8007045B kodu literal olarak "system shutdown in progress" — ama Veeam context'inde VSS writer'ın takılması veya timeout olması anlamında kullanılır. Yanıltıcı bir hata mesajı.

## Hata Neden Oluyor? (Sebepler)

### Sebep 1: VSS Writer "Failed" State

Guest içinde bir veya daha fazla VSS writer bozulmuş. En sık:
- **Microsoft Exchange Writer** — Exchange sunucu veritabanı sorunu
- **SqlServerWriter** — SQL Server servisi sorunlu
- **System Writer** — Windows güncellemeleri veya disk problemi sonrası

### Sebep 2: Diskte Yetersiz Boş Alan

VSS snapshot için **hedef volume'da minimum %10 boş alan** ister. 500 GB disk'te 450 GB kullanılmışsa VSS oluşturamaz.

### Sebep 3: Guest Disk Problemi (I/O Timeout)

Guest içindeki disk hatası (kötü sektörler, dosya sistemi bozuk) VSS snapshot'ı tamamlamasını engeller.

### Sebep 4: Antivirus Interference

Guest antivirus (Defender, Symantec, Kaspersky) Veeam agent veya VSS writer'ını bloklayabilir.

### Sebep 5: Eski Veeam Agent

Guest içindeki Veeam agent eski versiyonsa yeni Veeam server ile uyumsuzluk olabilir.

### Sebep 6: ChangeTracking (CBT) Bozuk

Veeam incremental backup CBT kullanır. CBT bozulursa full backup mod çalışabilir ama sonraki incremental başarısız.

### Sebep 7: Application-Aware Config Yanlış

Job'ta "Application-aware processing" aktif ama ilgili uygulama (örn. SQL Server) VM'de yok veya servis durdurulmuş.

## Adım Adım Çözüm

### Adım 1: VSS Writer Durumu Kontrol

Hata alan VM'e **yerel admin** olarak bağlan (RDP veya console). PowerShell açık:

```powershell
vssadmin list writers
```

Her writer için **State: [1] Stable** olmalı. Anomaliler:

```
Writer name: 'Microsoft Exchange Writer'
State: [8] Failed
Last error: Non-retryable error
```

**Not alınacaklar**: Hangi writer, hangi state?

En yaygın problemli writer'lar ve çözümleri:

#### "Microsoft Exchange Writer" Failed

```powershell
# Exchange servislerini yeniden başlat
Restart-Service MSExchangeIS
Restart-Service MSExchangeRepl
Restart-Service MSExchangeMailboxAssistants
# 30 saniye sonra
vssadmin list writers
```

Hâlâ failed ise Exchange DB mount state'i kontrol et:
```powershell
Get-MailboxDatabase -Status | Select Name, Mounted
```

Unmount olmuş DB varsa mount et: `Mount-Database "DB1"`

#### "SqlServerWriter" Failed

```powershell
Restart-Service "SQL Server VSS Writer"
# Ya da tüm SQL servisleri:
Get-Service | Where {$_.Name -like "MSSQL*"} | Restart-Service
```

#### "System Writer" Failed

Windows update veya servis problemi. Eski çözüm:
```cmd
net stop vss
net stop swprv
regsvr32 ole32.dll /s
regsvr32 oleaut32.dll /s
regsvr32 vss_ps.dll /s
vssvc /register
regsvr32 /i swprv.dll
regsvr32 /i eventcls.dll
regsvr32 es.dll /s
regsvr32 stdprov.dll /s
regsvr32 vssui.dll /s
regsvr32 msxml.dll /s
regsvr32 msxml3.dll /s
regsvr32 msxml4.dll /s
net start swprv
net start vss
```

30 saniye bekleyip `vssadmin list writers` tekrar kontrol.

### Adım 2: Guest OS Event Log İnceleme

Daha derin tanılama için:
```
eventvwr.msc
```

Navigate: **Windows Logs > Application**

Filter: Event IDs `8193, 8194, 8229, 12293, 12297, 12302`

Örnek hata:
```
Event ID: 12293
Source: VSS
Volume Shadow Copy Service error: Unexpected error calling routine 
CreateFile for file "\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy...".

hr = 0x80070020, The process cannot access the file because it is 
being used by another process.
```

`0x80070020` = başka bir process dosyaya erişiyor. Genelde antivirus veya open file. Disable edip dene.

### Adım 3: Disk Doluluk Kontrolü

Guest'te tüm volume'ları kontrol:
```powershell
Get-PSDrive | Where {$_.Provider -like "*FileSystem*"} | 
    Select Name, @{N="Used(GB)";E={[math]::Round($_.Used/1GB,2)}}, 
    @{N="Free(GB)";E={[math]::Round($_.Free/1GB,2)}}
```

Herhangi bir volume'da **%90+ dolu**ysa VSS snapshot için yer yok. Temizlik:
- Geçici dosyalar: `cleanmgr.exe` çalıştır
- WinSxS şişmesi: `DISM.exe /Online /Cleanup-Image /StartComponentCleanup`
- Eski log dosyaları
- Pagefile.sys boyutu

### Adım 4: VSS Max Shadow Storage Ayarı

VSS shadow copy için ayrılmış alan:
```cmd
vssadmin list shadowstorage
```

Default genelde disk'in %10'u. Eğer çok düşük set edilmişse:
```cmd
vssadmin resize shadowstorage /for=C: /on=C: /maxsize=20%
```

### Adım 5: Veeam Backup Job Settings

Job settings'de "Guest Processing" sekmesi:

**Option A: Application-aware processing**
- Aktif ve guest credential doğru mu?
- VM içinde Veeam Guest Agent kurulumu gerçekleşmiş mi?

**Option B: Crash-consistent backup (geçici çözüm)**
```
Job Settings > Guest Processing > 
Enable application-aware processing → UNCHECKED
```

Crash-consistent backup VSS kullanmaz — genelde VM seviyesinde snapshot alır. Uygulama verisi tutarsız olabilir ama backup başarılı olur. Geçici çözüm, kalıcı değil.

### Adım 6: Veeam VSS Mode Değiştir

Backup job > Guest Processing > Applications > Edit:

- **Try application processing, but ignore failures** (varsayılan)
- Eğer değilse "Require successful processing" seçili ve başarısızlıkta job fail ediyor

```
Require successful processing = Fail olursa job fail
Try and ignore = Fail olursa crash-consistent'e düş
Disable = VSS hiç kullanma
```

Üretim DB'lerde "Require successful" kullan (consistency kritik). Non-critical dosya sunucularında "Try and ignore" daha pragmatik.

### Adım 7: Guest Credential Doğru mu?

Application-aware processing VM içine login olur, admin yetki ister.

Backup Job > Guest Processing > Credentials:
- Local admin veya domain admin
- Şifre expire olmadı mı?
- Kullanıcı VM içinde gerçekten admin mi?

Test:
```
# Veeam sunucusundan
winrm quickconfig
psexec \\[VM_IP] -u DOMAIN\user -p [şifre] cmd.exe
```

Bağlanabiliyor mu?

### Adım 8: Veeam Log Analiz

Veeam detaylı log'ları:
```
C:\ProgramData\Veeam\Backup\[Job_name]\
```

İlgili job log'unu aç, "VSS" için search. Tipik hatalar:
- `VSS writer list timeout` — timeout değerini artır
- `VSS quiesce failed` — writer problemi (Adım 1'e dön)
- `VSS commit failed` — disk I/O sorunu

Timeout artırma:
```
Veeam server > Registry > 
HKLM\SOFTWARE\Veeam\Veeam Backup and Replication\
Yeni DWORD: VssSnapshotTimeoutSec = 600 (10 dakika)
```

### Adım 9: Veeam Agent Upgrade

VM içinde eski Veeam agent varsa kaldır ve Veeam server current versiyonu ile yeniden deploy et:

```
Veeam Console > Home > Protected Computers > VM >
"Manage Veeam Agent" > Uninstall

Sonra yeniden:
"Install Veeam Agent" (en güncel versiyon otomatik indirilir)
```

### Adım 10: Son Çare — CBT Reset

Change Block Tracking bozuk olabilir:

```powershell
# VM'i kapat (snapshot ve CBT reset için)
Stop-VM "VM_name"

# CBT disable et
Set-VM "VM_name" -ChangeTrackingEnabled $false

# Mevcut CTK dosyalarını sil (VM storage'da)
# *.ctk dosyalarını manuel sil

# CBT tekrar enable
Set-VM "VM_name" -ChangeTrackingEnabled $true

# VM'i aç
Start-VM "VM_name"
```

Sonraki backup job full olacak (incremental için baseline yeniden oluşur).

## Sık Karşılaşılan Özel Senaryolar

### Exchange Server Backup 0x8007045B

Exchange backup için özel:
- Exchange DLL guest'te register edilmeli
- Veeam Exchange Explorer lisansı gerekli
- Circular logging **disable** olmalı (transaction log backup için)

```powershell
Get-MailboxDatabase | Select Name, CircularLoggingEnabled
# Eğer true ise:
Set-MailboxDatabase "DB1" -CircularLoggingEnabled $false
```

### SQL Server Backup 0x8007045B

SQL için kontrol:
- SQL VSS Writer servisi çalışıyor (`SQLWriter` servisi)
- Default instance kullanılıyorsa `MSSQLSERVER`
- Named instance varsa instance ismi job'da doğru girilmiş

### Linux VM Backup Başarısız

Linux'ta VSS yoktur — Veeam farklı mekanizma kullanır (freeze/thaw). Bu için:
- VMware Tools (VMware'de) veya Hyper-V Linux Integration Services
- Guest credentials doğru
- `vmware-tools-services` veya `open-vm-tools-services` çalışıyor mu

### Cluster Shared Volume (CSV) VM'leri

Hyper-V cluster'da CSV üzerindeki VM'ler için VSS daha karmaşık. Gerekirse:
- SMB3 provider kullan
- Off-host backup proxy ile VSS yükünü proxy'e ver

## Önleyici Bakım

1. **Aylık VSS writer sağlık raporu** (scheduled task):
```powershell
$writers = vssadmin list writers
if ($writers -match "Failed") {
    Send-MailMessage -Subject "VSS Writer Failed" -Body $writers ...
}
```

2. **Disk alarm threshold** guest içinde %85'te uyarı

3. **Veeam Agent versiyonunu** Veeam server ile senkronize tut

4. **Haftalık restore test** — sadece backup başarılı demek yetmez, restore edilebilir olmalı

5. **Exchange / SQL restart planlaması** — bakım penceresi dışında sıkı servis restart'larını önle

## Sık Sorulan Sorular

### Her gece 03:00'te bu hatayı alıyorum ama manuel çalıştırdığımda başarılı

Schedule zamanında başka bir iş (antivirus scan, Windows backup, disk defrag) VSS lock alıyor olabilir. Job saatini değiştir veya antivirus scan time'ını kaydır.

### Veeam'da backup mode "SAN" kullanıyorum, VSS yine de gerekli mi?

Evet. SAN transport mod VM disk'ini direkt okur ama guest OS içinde application quiesce hâlâ VSS ile yapılır.

### Backup job "Success" gösteriyor ama aslında crash-consistent — bu ciddi mi?

Crash-consistent = fiziksel server kapanmış gibi. Restore sonrası SQL/Exchange recovery mode'a girer, genelde restore eder ama:
- Transaction commit ortasındaki data kayıp olabilir
- DB consistency check gerekebilir
- İdeal değil ama disaster senaryosunda iş görür

Application-aware backup tercih edilmeli.

### VSS quiesce süresi uzun, kullanıcılar yavaşlık hissediyor

VSS snapshot saniyeler içinde alınır, ama disk I/O yoğunsa yükselir. Backup'ı off-hours (gece) zamanla.

---

**Veeam backup altyapısında sorun mu yaşıyorsunuz?** Kozyatağı Bilişim olarak Veeam sertifikalı ekibimizle backup-as-a-service sunuyoruz: kurulum, job tuning, restore test, monitoring, troubleshooting. [Teknik görüşme talep edin.](/#contact)
