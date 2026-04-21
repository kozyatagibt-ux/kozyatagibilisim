---
slug: veeam-vmware-backup-job-encryption-kurulum
title: "Veeam VMware Backup Job — Encryption + Immutable Repository ile Adım Adım"
type: cluster
pillar: 3
url: "/blog/veeam-vmware-backup-job-encryption-kurulum"
hedef_anahtar_kelime: "veeam vmware backup job encryption"
meta_description: "Veeam B&R'de VMware VM backup job oluşturma — encryption, immutable S3 repository, SureBackup verification. Ekran görüntülü tam rehber."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/felaket-kurtarma-yedekleme"
troubleshoot: true
error_code: "Veeam Backup Job"
product_family: "Veeam & Yedekleme"
---

## "Yedeğimizi Ransomware'dan Kurtarma Garantisi İstiyoruz"

Denetim sonrası iç raporda yazan: *"Veeam yedekleri aynı network'te, ransomware VM'i şifrelese yedekleri de şifreleyebilir."*

BT uzmanı Deniz bu riski kaldırmak için:
- Veeam backup **şifreli**
- Repository **immutable** (silinmez, değiştirilemez) — S3 Object Lock
- **Offsite kopya** (AWS veya Wasabi)
- **SureBackup** ile yedeğin gerçekten çalışır olduğu her ay doğrulanır

Bu yazı Deniz'in yeni backup job kurulumunu anlatıyor — kritik Logo ERP VM'i için.

## Hızlı Çözüm (TL;DR)

1. Backup Infrastructure > Backup Repositories > Add Object Storage (Wasabi/AWS S3 + Object Lock)
2. Home > Backup Job > Virtual Machine > VMware
3. VMs: "SQL-ERP01" + "File-Server" ekle
4. Storage: Repository = Wasabi-Immutable, retention = 30 days, immutable
5. Guest Processing: Application-aware ON, credentials ver
6. Schedule: Daily 02:00
7. **Advanced > Storage > Encryption** enable + password
8. Apply → test run

---

## Ön Hazırlık — Wasabi (veya S3) Bucket

Immutable backup için **Object Lock destekli** bir S3 bucket. Opsiyonlar:

| Provider | Maliyet/TB/ay | Notlar |
|---|---|---|
| **Wasabi** | $6.99 | En ucuz, 90 gün min storage |
| **Backblaze B2** | $6 | Object Lock var |
| **AWS S3 Standard** | $23 | Object Lock + Lifecycle |
| **Azure Blob Immutable** | ~$20 | Office365 hybrid için ideal |

Deniz Wasabi'yi seçti (maliyet + basitlik). Wasabi console:

> 📸 **Ekran 1** — Wasabi Console > Create bucket  
> Sol menü: Buckets  
> "+Create Bucket" butonu  
> Alanlar:  
> - Bucket Name: `firma-veeam-backup-2025`  
> - Region: **eu-central-1** (Frankfurt) — Türkiye'ye en yakın  
> - Object Lock: **Enable** ← KRİTİK, bucket oluşturduktan sonra açılamaz  
> - Default retention: Compliance mode, 30 days  
> Create

Access Key + Secret Key üret (Users > IAM User). Veeam'e bunlar gerekir.

## 10:00 — Veeam Console

### Adım 1: Object Repository Ekleme

Veeam B&R Console aç:

> 📸 **Ekran 2** — Veeam Console > Backup Infrastructure  
> Sol panel: Backup & Replication  
> Sol menü:  
> - Backup Infrastructure  
>   - Backup Proxies  
>   - **Backup Repositories** ← seçili  
>   - External Repositories  
>   - WAN Accelerators  
>   - Service Providers  
> Sağ panel: Mevcut repository'ler

"**Add Repository**" butonuna tıkla:

> 📸 **Ekran 3** — Add Backup Repository wizard  
> Dialog: "Select the type of the backup repository"  
> Seçenekler (ikonlu):  
> ○ Direct attached storage (SAS/iSCSI)  
> ○ Network attached storage (CIFS/NFS)  
> ○ Deduplicating storage appliance (DataDomain, StoreOnce)  
> ● **Object Storage** ← seçili

Object Storage tıklandı → sonraki pencere:

> 📸 **Ekran 4** — Object Storage type  
> ● **S3 Compatible** (Wasabi, MinIO, Cloudian, diğerleri)  
> ○ Amazon S3  
> ○ Microsoft Azure  
> ○ Google Cloud Storage  
> ○ IBM Cloud

S3 Compatible seçildi → Next

### Adım 2: Connection Details

> 📸 **Ekran 5** — S3 Endpoint config  
> Name: "Wasabi-Immutable-Primary"  
> Description: "Production backups — 30 day immutable — Wasabi Frankfurt"  
> Next  
>  
> Servis endpoint:  
> Service point: `https://s3.eu-central-1.wasabisys.com`  
> Region: eu-central-1  
> Credentials: **Access Key + Secret Key** (Wasabi'den alınan)

Test Connection butonu → yeşil tick → Next

### Adım 3: Bucket Seçimi

> 📸 **Ekran 6** — Select bucket  
> Bucket dropdown: otomatik listelenir  
> Seç: `firma-veeam-backup-2025`  
> Folder: `veeam/` (opsiyonel subfolder)  
>   
> **Make recent backups immutable for:** [30] days  
> Limit storage consumption to: [opsiyonel]  

Next → Finish

Repository eklendi.

## 10:15 — Primary Repository + Immutable Copy Strategisi

Deniz **2 repository** tanımladı:

1. **Local-NAS** (Synology) — Primary backup, hızlı restore için (7 gün retention)
2. **Wasabi-Immutable** — Secondary, ransomware koruması (30 gün immutable)

Backup job local'e yazar, sonra "Backup Copy Job" ile Wasabi'ye kopyalanır. Bu yapı:
- Hızlı restore: Local'den (NAS'tan 10 Gbps)
- Ransomware koruması: Wasabi immutable
- Coğrafi redundancy: Farklı lokasyonda (Frankfurt)

## 10:20 — Backup Job Oluşturma

### Adım 4: Home > Jobs > Backup > Virtual Machine

> 📸 **Ekran 7** — Home ribbon > Backup Job  
> Üst ribbon: Home tab  
> Butonlar: Backup Job, Replication Job, Copy Job, SureBackup Job...  
> Backup Job > "Virtual Machine" > VMware seçildi

Wizard açıldı:

> 📸 **Ekran 8** — Backup Job Wizard > Name  
> Name: "Critical-VMs-Daily"  
> Description: "Daily backup — SQL, File, AD — 02:00-05:00 window"  
> ☑ High priority (preempts normal jobs)  
> Next

### Adım 5: VM Seçimi

> 📸 **Ekran 9** — Virtual Machines  
> "Add..." butonuna tıklandı  
> vCenter browser açıldı:  
> vCenter > Datacenter > Cluster > Host > VMs  
> Seçilenler:  
> - SQL-ERP01 (400 GB)  
> - File-Server-01 (2.0 TB)  
> - AD-DC01 (100 GB)  
>   
> Total Size: 2.5 TB

"Add" tıkla → Next

### Adım 6: Storage

> 📸 **Ekran 10** — Storage config  
> Backup proxy: Automatic selection (Veeam seçer)  
> Backup repository: **Local-NAS** ← dropdown  
> Retention Policy:  
>   Restore points: 7 (days)  
> ☑ Configure secondary destination for this job  
> (İleri sayfada secondary repository tanımlanır)  
> Next

### Adım 7: Advanced (KRİTİK — Encryption)

"Advanced..." butonuna tıkla:

> 📸 **Ekran 11** — Advanced Settings dialog  
> Tabs: Backup, Maintenance, Storage, Notifications, vSphere, Integration, Scripts  
> **Storage tab** seçili:  
> ☑ **Enable inline data deduplication** (önerilen)  
> Compression level: Optimal  
> Storage optimization: Local target (16 TB+)  
> ☑ **Enable backup file encryption**  
>   Password: [güçlü şifre]  
>   Hint: "Corporate backup — contact IT"  
> OK

**Encryption şifresi kritik**:
- 20+ karakter, Bitwarden'da saklanır
- Şifreyi kaybedersen **yedeği restore edemezsin** — Veeam backdoor yok
- Hint yazın ama ipucu vermeyin

### Adım 8: Guest Processing

> 📸 **Ekran 12** — Guest Processing  
> ☑ **Enable application-aware processing**  
> ☐ Enable guest file system indexing (büyük job için off)  
> Guest OS credentials:  
>   Add... → Domain: CORP, User: veeam-backup, Password: ...  
> Next

Application-aware processing SQL Server, Exchange, AD için transaction-consistent backup sağlar. Crash-consistent değil.

**Guest credentials**: Veeam VM içine login olup VSS snapshot + application quiesce yapar. Credentials VM'e admin olmalı.

### Adım 9: Schedule

> 📸 **Ekran 13** — Schedule  
> ● **Run the job automatically**  
> Daily at: **02:00** every day  
> ☑ If the job fails, retry automatically: 3 times, wait 10 min between  
>   
> Backup window: 02:00 - 05:00 (3 saat)  
> ☑ Terminate job if it exceeds window  
> Next > Apply → job oluşturuldu

### Adım 10: Test Run

Job listesinde sağ tık > **Start**:

> 📸 **Ekran 14** — Job progress  
> Real-time progress panel  
> Durum: "Running"  
> Processing: SQL-ERP01 (40% - 160/400 GB)  
> Speed: 450 MB/s  
> Throughput: ~3.6 Gbps (10 Gbps network kullanımı %36)

İlk full backup ~90 dakika. Sonraki incremental'lar 5-15 dakika (sadece değişen bloklar).

## 12:00 — Backup Copy Job (Wasabi'ye)

Primary backup tamamlandı. Şimdi Wasabi'ye kopya:

> 📸 **Ekran 15** — Home > Backup Copy Job  
> Sağ tık "Critical-VMs-Daily" > Add to > "Create backup copy job"  
>   
> Wizard:  
> Name: "Critical-VMs-Copy-to-Wasabi"  
> Source: "Critical-VMs-Daily"  
> Target: **Wasabi-Immutable** repository  
> Retention: 30 days (immutable)  
> Schedule: Daily after source job completes  
> Advanced > Encryption: ✓ same password

Finish. Copy job her gün 06:00'da Wasabi'ye göndermeye başlar.

## 14:00 — SureBackup Verification

Backup'ın gerçekten çalıştığını test etmek için SureBackup:

> 📸 **Ekran 16** — SureBackup Application Group  
> Home ribbon: SureBackup > Application Group  
> Add VMs: SQL-ERP01 (backed-up version)  
>   
> Test Scripts:  
> - Ping the VM: ICMP test  
> - TCP connection: port 1433 (SQL)  
> - Custom script: SQL DBCC CHECKDB  
>   
> Recovery Verification Options:  
> - Virtual Lab: Yes (isolated network)  
> - Timeout: 300 seconds

### Virtual Lab

Virtual Lab = VM'in production'dan izole bir sandbox'ta başlatılması:
- IP address production ile çakışmasın
- Gerçek kullanıcı erişmesin
- DB restore test edilsin

> 📸 **Ekran 17** — Virtual Lab config  
> Host: ESXi-01  
> Isolated network: vLab-Network (yeni portgroup)  
> Finish

### Schedule

SureBackup monthly → Her ayın 1'i 03:00:
```
Month 1:  Backup başarılı + SQL CHECKDB OK
Month 2:  Backup başarılı + SQL CHECKDB OK
Month 3:  Backup başarılı + SQL CHECKDB OK
Month 4:  Backup başarılı ama CHECKDB error! ← Alarm
```

Alarm gelirse **gerçek sorun**: backup corrupt. Daha sonraki günün backup'ı ile değiştir.

## 15:00 — Restore Testi (El ile)

Kurulum ne kadar güzel olsa da **gerçek restore test edilmeden emin olunmaz**.

### File-Level Restore

Veeam Backup & Replication > Home > Backups > "Critical-VMs-Daily":

> 📸 **Ekran 18** — Right-click backup  
> Menu:  
> - Restore entire VM  
> - Restore guest files (Microsoft Windows)  
> - Restore application items (Exchange, SQL, AD)  
> **Restore guest files** tıklandı

File-Level Restore window:
- Browse VM disk like Windows Explorer
- Select folder/file
- "Restore" veya "Copy to" [destination]

Deniz bir dosya restore etti → başarılı.

### Instant Recovery

Tam VM'i **2 dakikada** başlatma:

> 📸 **Ekran 19** — Instant Recovery  
> Sağ tık backup > "Restore entire VM" > **Instant Recovery**  
> Hedef: ESXi Cluster  
> Redirect virtual disks: evet  
>   
> Restore progresi: 30 saniye ← VM Veeam server'ın kendi storage'ından açılıyor  
> VM başladı, erişilebilir

Sonra `Storage vMotion` ile VM'i gerçek datastore'a taşı (30-60 dk).

## Dashboards ve Monitoring

### Email Notification

Advanced > Notifications:
```
SMTP: smtp.office365.com:587
From: veeam@firma.com.tr
To: it@firma.com.tr
Send notifications for: 
  ✓ Jobs failed
  ✓ Jobs completed with warnings
  ☐ Jobs completed successfully (fazla spam)
```

### Veeam ONE (opsiyonel, gelişmiş)

Veeam ONE Monitor ek lisans:
- Real-time dashboard
- Predictive analytics
- Capacity planning

## Yaygın Hatalar

### "Failed to create snapshot. Another task is in progress"

VMware tarafında VM'e başka snapshot operasyonu devam ediyor. Uyarı olabilir, beklet veya kontrol:
```
vim-cmd vmsvc/snapshot.get <vm_id>
```

### "Access is denied" Guest Processing

Guest credentials yanlış veya VM'e admin değil. [Detaylı çözüm](/blog/veeam-failed-to-connect-host-access-denied)

### "Failed to truncate SQL Server logs"

SQL VSS Writer durmuş. VM'e RDP:
```powershell
Restart-Service SQLWriter
```

### Encryption Password Kaybolmuş

Veeam'de şifre recovery yok. **Password hint** sadece ipucu, şifreyi geri getirmez. Bitwarden backup + multiple IT yönetici erişimi öner.

## Ransomware Senaryosu — Test

Deniz ransomware saldırısı simulate etti:
- Lab ortamında bir VM'i "şifreledi" (dosyaları rename)
- Local-NAS repository'sine delete komutu gönderdi — başarılı (NAS'ta dosyalar silindi)
- Wasabi-Immutable'a delete komutu gönderdi — **reddedildi** (Object Lock aktif)

Simülasyon sonucu: **30 gün içindeki herhangi bir yedekten restore mümkün**. Local NAS silinmiş olsa bile.

## İlgili Rehberler

- [Veeam VSS 0x8007045B hatası](/blog/veeam-backup-hatasi-0x8007045B-vss)
- [Veeam "Access is denied"](/blog/veeam-failed-to-connect-host-access-denied)
- [Veeam 12.1 CBT reset Hyper-V bülteni](/blog/bulten-veeam-12-1-cbt-reset-hyperv)
- [Ransomware ilk 72 saat vaka](/blog/ransomware-ilk-72-saat-vaka-analizi)

---

**Veeam backup deployment, immutable storage tasarımı ve disaster recovery stratejisi için uzman destek?** Kozyatağı Bilişim Veeam sertifikalı ekibimizle. [Teknik görüşme talep edin.](/#contact)
