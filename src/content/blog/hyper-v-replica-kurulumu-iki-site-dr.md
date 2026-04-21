---
slug: hyper-v-replica-kurulumu-iki-site-dr
title: "Hyper-V Replica Kurulumu — İki Site Arası DR Senaryosu"
type: cluster
pillar: 3
url: "/blog/hyper-v-replica-kurulumu-iki-site-dr"
hedef_anahtar_kelime: "hyper-v replica kurulum"
meta_description: "Hyper-V Replica ile ana site + DR site arası VM replication kurulumu — firewall, sertifika, replication interval, failover test. Adım adım."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/felaket-kurtarma-yedekleme"
troubleshoot: true
error_code: "Hyper-V Replica Setup"
product_family: "Windows Server & Active Directory"
---

## "Bir Şubemiz Yanarsa Sıfırdan mı Başlayacağız?"

Genel Müdür Pazartesi sabahı yönetim toplantısında BT'ye döndü:

> "Komşu şirket geçen hafta yangın geçirdi, sunucu odaları tamamen yandı, backup tape'leri de orada tutuyorlardı. İki hafta operasyondaşıydılar. Bizim böyle bir senaryo için ne hazırlığımız var?"

BT müdürü Mehmet cevapladı:
> "Günlük Veeam yedeklerimiz var ama ana site yanarsa donanım + yapılandırma sıfırdan kurulum — 3-5 gün. Ankara şubemizde boş bir Hyper-V sunucumuz var. **Hyper-V Replica** ile kritik VM'lerin canlı kopyasını oraya almak mümkün. Ana site çökerse **30 dakikada** yedek site'ta VM'ler başlar."

"Kur, acil."

Mehmet 1 hafta projelendirdi, 3 günde production'a aldı. Bu yazı kurulumu anlatıyor.

## Hızlı Çözüm (TL;DR)

### Primary (İstanbul) ve Replica (Ankara) Host'ta

1. Hyper-V Manager > Host > Hyper-V Settings > **Replication Configuration**
2. "Enable this computer as a Replica server" ✓
3. Authentication: Kerberos (domain) veya sertifika (workgroup/cross-domain)
4. Allowed replica servers: ana site host IP/FQDN
5. Storage path: `D:\HyperV-Replicas\`
6. Firewall: TCP 80 (Kerberos) veya 443 (HTTPS) açık
7. VM bazlı → sağ tık > Enable Replication > wizard

Replication başlar. 5-15 saniye interval ile değişiklik replike edilir.

---

## Ön Hazırlık

### Network Planı

Mehmet:
- **Primary Site (İstanbul)**: 10.10.0.0/16, Hyper-V host `HYP01.corp.firma.com` (10.10.20.5)
- **Replica Site (Ankara)**: 10.20.0.0/16, Hyper-V host `HYP02.corp.firma.com` (10.20.20.5)
- İki site arası **site-to-site IPsec VPN** (FortiGate — [detay](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma))

### Bandwidth Hesabı

Replike edilecek VM'ler:
- AD DC01 (100 GB disk, düşük değişim oranı)
- File Server (2 TB, orta değişim)
- SQL Server ERP (400 GB, yüksek değişim)
- Exchange mailbox (800 GB, yüksek değişim)

**İlk seed**: Tüm VM diskleri tamamen replike olmalı — ~3.3 TB.
- İstanbul-Ankara arası 500 Mbps fiber → yaklaşık 14 saat (teorik)
- Pratikte 18-24 saat — ilk senkronizasyon için gece + hafta sonu

**Delta replikasyon** (sürekli):
- VM'ler dakikada ortalama 50-200 MB değişim
- 500 Mbps hat yeterli (2-5% kullanım)

### Sertifika vs Kerberos

Domain-joined hosts için **Kerberos** en kolay. Authentication otomatik, port 80.

Farklı domain veya workgroup için **sertifika**:
- CA'dan sertifika al (kendi iç CA veya public)
- SAN (Subject Alternative Name) olarak her iki host FQDN
- HTTPS port 443

Mehmet domain-joined için Kerberos tercih etti.

## 10:00 — Replica Site'da (Ankara) Konfigürasyon

Önce **Replica Host** hazır olmalı. Primary host ancak o zaman bağlanır.

### Adım 1: Replication Configuration

Ankara HYP02 üzerinde Hyper-V Manager:

> 📸 **Ekran 1** — Hyper-V Manager > Host > Hyper-V Settings  
> Sol panelde hosts listesi: HYP02.corp.firma.com seçili  
> Action panel: "Hyper-V Settings..." tıklandı  
> Açılan dialog: "Hyper-V Settings for HYP02"  
> Sol menü:  
> - Physical GPUs  
> - Virtual Hard Disks  
> - Virtual Machines  
> - Physical Memory  
> - NUMA Spanning  
> - Live Migrations  
> - Storage Migrations  
> - Enhanced Session Mode Policy  
> - **Replication Configuration** ← Bu seçili  
> - Default Physical Settings  
> Sağ panelde replication ayarları

> 📸 **Ekran 2** — Replication Configuration paneli  
> Checkbox: **"Enable this computer as a Replica server"** ← işaretli  
> Authentication and ports:  
> ☑ Use Kerberos (HTTP)  
> Port: 80  
> ☐ Use certificate-based Authentication (HTTPS)  
> Authorization and storage:  
> ● Allow replication from any authenticated server (unsafe for production)  
> ● **Allow replication from the specified servers** ← bu seçili  
> Table: Server FQDN + Storage Location + Trust Group  
> "Add..." butonu

Mehmet "Allow from specified" seçti (güvenlik için). Add tıkladı:

> 📸 **Ekran 3** — Add Authorization Entry  
> Input: Primary Server FQDN = `HYP01.corp.firma.com`  
> Input: Storage location = `D:\HyperV-Replicas\`  
> Input: Trust group = "CorpTrust" (opsiyonel etiket)  
> OK

Apply tıkladı.

### Adım 2: Firewall Kuralları

Ankara HYP02'de Windows Firewall:
```powershell
# Kerberos HTTP (80) için inbound
Enable-NetFirewallRule -DisplayName "Hyper-V Replica HTTP Listener (TCP-In)"

# Sertifika HTTPS (443) için (opsiyonel)
Enable-NetFirewallRule -DisplayName "Hyper-V Replica HTTPS Listener (TCP-In)"
```

Kurumsal FortiGate'te Ankara LAN'a:
- TCP 80 ve 443 primary site IP'sinden (10.10.20.5) allow

## 10:30 — Primary Site'da (İstanbul) Replication Enable

### Adım 3: VM Seç + Enable Replication

İstanbul HYP01'de Hyper-V Manager:

> 📸 **Ekran 4** — Hyper-V Manager > VMs  
> Sol panel: HYP01 host  
> Sağda VM listesi:  
> - AD-DC01 (Running)  
> - FILE-SRV01 (Running)  
> - SQL-ERP01 (Running)  
> - EXCH-01 (Running)  
> Mehmet "SQL-ERP01"e sağ tık:  
> Menu: Settings, Connect, Start, Checkpoint, Move..., Export..., Rename..., **Enable Replication**, Delete, Help

**Enable Replication** tıklandı → wizard açıldı:

### Enable Replication Wizard

> 📸 **Ekran 5** — Wizard Page 1: Before You Begin  
> Başlık: "Enable Replication for SQL-ERP01"  
> Açıklama metni + checkbox "Do not show this page again"  
> Next

> 📸 **Ekran 6** — Wizard Page 2: Specify Replica Server  
> Replica Server: `HYP02.corp.firma.com`  
> "Browse..." butonu (veya manuel yaz)  
> Next

> 📸 **Ekran 7** — Wizard Page 3: Specify Connection Parameters  
> Authentication:  
>   ● Use Kerberos authentication (HTTP)  
>   ○ Use certificate-based authentication (HTTPS)  
> Data Compression: ✓ Compress the data  
> Next

> 📸 **Ekran 8** — Wizard Page 4: Choose Replication VHDs  
> Table: Virtual Hard Disks listesi  
> - SQL-ERP01_C.vhdx (OS disk) ✓  
> - SQL-ERP01_D.vhdx (DB disk) ✓  
> - SQL-ERP01_L.vhdx (Log disk) ✓  
> - SQL-ERP01_T.vhdx (TempDB) — ✗ (replicate etme, TempDB kayıp olabilir)  
> Next

**Tempdb kritik uyarı**: SQL Server'ın TempDB'si her restart'ta yeniden oluşur. Replicate etmenin anlamı yok, bandwidth israfı. İşaretini kaldır.

> 📸 **Ekran 9** — Wizard Page 5: Replication Frequency  
> Radio:  
> ○ 30 seconds  
> ● **5 minutes**  
> ○ 15 minutes  
> Next

**Frekans seçimi**:
- **30 saniye**: Çok düşük RPO ama yüksek bandwidth + IOPS
- **5 dakika**: Denge noktası, çoğu workload için yeterli
- **15 dakika**: Düşük bandwidth, yüksek RPO

Mehmet SQL için 5 dakika seçti. Fisher mail için 15 dakika seçecekti.

> 📸 **Ekran 10** — Wizard Page 6: Additional Recovery Points  
> ○ Maintain only the latest recovery point  
> ● **Create additional hourly recovery points**  
>   Coverage: 24 hours (24 recovery points)  
>   Replicate incremental VSS copy frequency: 4 hours  
> Next

Bu ayarlarla son **24 saat boyunca her saat bir checkpoint** saklanır. Ransomware gibi senaryolarda "2 saat önceki" sürüme geri dönebilirsin.

> 📸 **Ekran 11** — Wizard Page 7: Initial Replication Method  
> Nasıl ilk seed alınacak?  
> ● **Send initial copy over the network** ← Default  
> ○ Send initial copy using external media (disk, tape)  
> ○ Use an existing virtual machine on the Replica server (parent disk)  
> Schedule:  
> ● Start replication immediately  
> ○ Start replication at specified time  
> Next

500 GB SQL VM'i network üzerinden seed. 2-4 saat sürer. Hafta içi mesai dışı seçim için schedule kullanılabilir.

> 📸 **Ekran 12** — Wizard Page 8: Summary  
> Özet bilgiler  
> Finish

Finish tıklandı. Replication başladı.

## 10:45 — Replication Status İzleme

> 📸 **Ekran 13** — Hyper-V Manager VM status  
> SQL-ERP01 VM bilgileri  
> Sağ alt panelde "Replication" tab  
> Progress bar: "Initial replication: 8% complete"  
> Estimated time: 4h 20m

İlk 4-8 saat initial sync. Tamamlanınca delta replication devam eder.

### PowerShell ile Status

```powershell
# Tek VM için
Get-VMReplication -VMName "SQL-ERP01"

# Tüm VM'ler
Get-VMReplication | Select VMName, State, Health, RelationshipType, ReplicationFrequency
```

Çıktı:
```
VMName       State          Health  RelationshipType  ReplicationFrequency
------       -----          ------  ----------------  --------------------
SQL-ERP01    Replicating    Normal  Primary           00:05:00
EXCH-01      Replicating    Warning Primary           00:15:00
FILE-SRV01   Replicating    Normal  Primary           00:15:00
```

**Health**: Normal / Warning / Critical

Warning veya Critical ise detay:
```powershell
Get-VMReplication -VMName "EXCH-01" | Select -ExpandProperty ReplicationHealthDetails
```

Yaygın Warning sebepleri:
- Primary → Replica network slow
- Replica disk IOPS yetersiz
- Checkpoint handle hatası

## 14:00 — İlk Initial Sync Tamamlandı

4 saat sonra "Initial replication: 100%". State: **Replicating** (sürekli delta akıyor).

## 15:00 — Failover Testi

Replication kurulumu yetmez — **failover testi** yapmadan "çalışıyor" denemez.

### Test Failover

**Replica site'ta (Ankara HYP02)** → SQL-ERP01'e sağ tık > Replication > **Test Failover**:

> 📸 **Ekran 14** — Test Failover dialog  
> "Select the recovery point:"  
> Dropdown:  
> - Latest Recovery Point (14:00)  
> - 1 hour ago (13:00)  
> - 2 hours ago (12:00)  
> - ...  
> OK

Hyper-V "SQL-ERP01 - Test" adıyla geçici VM oluşturur. Production VM etkilenmez.

Geçici VM başlatılır → içine RDP ile bağlanıp test yap:
- Windows normal boot oluyor mu?
- SQL Server service açılıyor mu?
- Logo ERP DB erişilebiliyor mu?

Test sonrası temizlik:
> Sağ tık > Replication > **Stop Test Failover**

Test VM silinir.

**Test failover hiçbir trafik etki etmez** — primary VM hâlâ çalışıyor, replika da devam ediyor.

## Gerçek Failover (Afet Durumu)

Ana site gerçekten çöktü → Planlı veya planlanmamış failover:

### Planned Failover (Ana site erişilebilir)

Primary HYP01'de:
```powershell
# Önce VM'i shutdown et
Stop-VM -Name "SQL-ERP01" -Force

# Failover komutu
Start-VMFailover -VMName "SQL-ERP01" -ComputerName "HYP02.corp.firma.com"
```

Veya wizard:
> Primary'de SQL-ERP01 > sağ tık > Replication > Planned Failover > Failover

### Unplanned Failover (Ana site tamamen down)

Replica HYP02'de:
```powershell
Start-VMFailover -VMName "SQL-ERP01" -Confirm:$false
```

Veya:
> Replica HYP02'de SQL-ERP01 Replica > sağ tık > Replication > **Failover**

Recovery point seç (latest veya earlier) → VM Ankara'da başlar.

**Kritik**: Failover sonrası:
- VM artık Ankara'da çalışıyor
- DNS kayıtlarını güncelle (eski IP'yi değiştir)
- Kullanıcıları Ankara'ya yönlendir (VPN routing)
- Primary site düzeldiğinde **reverse replication** kur

### Reverse Replication (Ana Site Toparlandıktan Sonra)

```powershell
# Şimdi Ankara primary, İstanbul replica olmalı
Set-VMReplication -VMName "SQL-ERP01" -ReverseReplication
```

Bu komut değişiklikleri Ankara → İstanbul'a gönderir. Sonra tekrar "planned failover" ile ana site'a dönülür.

## Yaygın Hatalar

### "The specified network name is no longer available"

- Ankara HYP02 network sorunu
- Primary/Replica DNS çözümleme doğru mu?
- Firewall TCP 80 (veya 443) açık mı?

### "Replication state: Critical — VM is paused"

- Replica site disk doldu
- Log accumulation 90 GB+ olabilir
- `D:\HyperV-Replicas\SQL-ERP01\` klasörü boyutu kontrol

```powershell
# Replica VM'leri paused mode'dan kurtarma
Resume-VMReplication -VMName "SQL-ERP01"
```

### Initial Sync 48 Saat Sürüyor

Bandwidth yetersiz veya data compression açık değil. Kontrol:
- Data compression: Hyper-V Settings > Replication Configuration
- WAN bandwidth test: iperf3

### "Authentication failed" Kerberos

- Hosts aynı domain'de mi?
- Clock skew 5 dk içinde mi?
- SPN kayıtları doğru mu? (automatik)

Forced SPN registration:
```powershell
# Domain controller'dan
setspn -A "Microsoft Virtual System Migration Service/HYP02" HYP02$
setspn -A "Microsoft Virtual Console Service/HYP02" HYP02$
```

## İleri Seviye

### Replica of Replica (Extended Replication)

İstanbul → Ankara → Azure (üçlü zincir). Bir site yanarsa bile diğer iki kopya var.

```powershell
Set-VMReplication -VMName "SQL-ERP01" -ExtendedReplicaServerName "azure-hyp.firma.cloud"
```

### Azure Site Recovery (ASR)

Hyper-V Replica yerine **Azure Site Recovery** kullanmak — replica site Azure VM. Donanım maliyeti yok.

### Monitoring + Alerting

```powershell
# Scheduled task
$vms = Get-VMReplication | Where Health -ne "Normal"
if ($vms) {
    Send-MailMessage -Subject "Hyper-V Replica health alert" -Body ($vms | Format-Table | Out-String) ...
}
```

## Kritik Not: Replica DR Değildir

Hyper-V Replica sadece **site-level HA** sağlar:
- ✓ Site yangını, elektrik kaybı, donanım arızası
- ✗ Ransomware (şifrelenmiş VM replike edilir, replica da şifreli)
- ✗ Kullanıcı hatası (yanlış silme replike edilir)

Gerçek DR için **offline backup** (Veeam + tape + immutable storage) + Hyper-V Replica birleştirilmeli.

## İlgili Rehberler

- [Veeam VSS backup 0x8007045B](/blog/veeam-backup-hatasi-0x8007045B-vss)
- [Ransomware ilk 72 saat](/blog/ransomware-ilk-72-saat-vaka-analizi)
- [FortiGate Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)

---

**Hyper-V / VMware DR altyapı kurulumu, Azure Site Recovery ve iş sürekliliği projesi için uzman destek?** Kozyatağı Bilişim DRaaS hizmetleri. [Teknik görüşme talep edin.](/#contact)
