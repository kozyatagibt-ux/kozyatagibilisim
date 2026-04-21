---
slug: vmware-vm-appears-to-be-in-use-lock-file
title: "VMware 'The virtual machine appears to be in use' — Lock File Sorunu"
type: cluster
pillar: 1
url: "/blog/vmware-vm-appears-to-be-in-use-lock-file"
hedef_anahtar_kelime: "vmware virtual machine appears to be in use"
meta_description: "VMware ESXi/vSphere'de 'The virtual machine appears to be in use' hatası — VM power on yapılamıyor. .lck lock file temizleme ve önleyici stratejiler."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
troubleshoot: true
error_code: "VM in use — Lock File"
product_family: "VMware & Sanallaştırma"
---

## "VM Başlatamıyorum"

Cumartesi sabahı BT uzmanı Burak'a çağrı geldi. Bir müşterinin ESXi host'u gece elektrik kesintisiyle kapanmış, UPS yetersiz kalmış, ani power-off.

Pazartesi sabahı VM'leri başlatmaya çalışırken kritik **SQL-DB-01** VM'i başlamıyor:

```
┌──────────────────────────────────────────────────────┐
│  Unable to power on virtual machine                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  The virtual machine appears to be in use.           │
│                                                      │
│  If this message persists, make sure that no other   │
│  virtual machine is using this file and try again.   │
│                                                      │
│  Cannot open the disk '/vmfs/volumes/...'            │
│  or one of the snapshot disks it depends on.         │
│                                                      │
│                                  [  OK  ]            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

VM power off, ama ESXi "bu VM başka yerde çalışıyor olabilir" diye kilitli görüyor. Cumartesi sabahı iş sürekliliği yok — Logo ERP DB sunucusu bu VM'de.

Burak 8 dakikada çözdü: **.lck lock file temizliği**.

## Hızlı Çözüm (TL;DR)

1. ESXi SSH açık mı kontrol (Host > Services > SSH Start)
2. SSH bağlan: `ssh root@esxi-host`
3. VM klasörüne git: `cd /vmfs/volumes/datastore1/SQL-DB-01`
4. Lock dosyalarını bul: `ls *.lck`
5. Boş ise sil: `find . -name "*.lck" -delete`
6. VM'i power on yap

---

## Hata Neden Oluşuyor?

VMware bir VM çalışırken (veya snapshot aldığında), VMDK ve diğer kritik dosyalarda **".lck" uzantılı lock dosyaları** oluşturur. Bu lock:
- VM çalışırken başka bir hypervisor aynı VM'i açmasın
- vMotion sırasında double-access önlensin
- Snapshot consistency korunsun

Normal shutdown'da ESXi lock'ları temizler. **Ama kontrolsüz kapanma**:
- Elektrik kesintisi
- Host çökmesi (PSOD)
- Network kaybı + storage timeout
- Sanal ortamda VM çöküşü

...lock dosyaları "orphan" kalır. Bir sonraki açılışta ESXi bu dosyaları görür, "VM çalışıyor" zanneder, **power on reddedilir**.

## 10:00 — SSH ile ESXi'ye Bağlantı

Burak vSphere Client'tan host'a gitti:

> 📸 **Ekran 1** — ESXi Host Services  
> vSphere > Hosts > [ESXi host] > Configure > Services  
> Liste: SSH, ESXi Shell, NTP...  
> SSH satırında: Status **Stopped**  
> Action butonu: "Start"

SSH aktif edildi (sonra kapatılmalı — security best practice).

Terminal açıldı:

```bash
ssh root@esxi-01.corp.firma.com
```

İlk login'de host key kabul. Sonra root parolası. Başarılı.

## 10:03 — VM Klasörünü Bul

```bash
cd /vmfs/volumes/
ls

# Datastore'ları listele
# datastore1  datastore-ssd  ...
```

Datastore içinde:
```bash
cd datastore1
ls

# Her VM için bir klasör
# SQL-DB-01/
# AD-DC01/
# Exchange-01/
# ...
```

İlgili VM'e git:
```bash
cd SQL-DB-01
ls -la
```

Çıktı:
```
total 85234921
drwxr-xr-x    1 root     root             73728 May 12 02:15 .
drwxr-xr-t    1 root     root              8192 May 12 02:15 ..
-rw-------    1 root     root        107374182400 May 12 02:15 SQL-DB-01-flat.vmdk
-rw-r--r--    1 root     root             568 May 12 02:15 SQL-DB-01.vmdk
-rw-r--r--    1 root     root        4294967296 May 12 02:15 SQL-DB-01-vmx-swap
-rw-------    1 root     root             2684 May 12 02:15 SQL-DB-01.vmx
-rw-------    1 root     root             2684 May 12 02:14 SQL-DB-01.vmx.lck ← LOCK!
-rw-------    1 root     root                0 May 12 02:14 SQL-DB-01.vmdk.lck ← LOCK!
-rw-------    1 root     root                0 May 12 02:14 SQL-DB-01-flat.vmdk.lck ← LOCK!
```

`.lck` uzantılı 3 dosya. Bunlar orphan lock'lar.

## 10:05 — Lock Dosyalarını İncele

Lock dosyaları boş (0 byte) veya çok küçük. İçeriklerini kontrol:

```bash
cat SQL-DB-01.vmx.lck
# (boş veya binary karakterler)

ls -la *.lck
```

`.lck` içinde normalde hangi host'un lock ettiği bilgisi olur. Boşsa veya başka host'un MAC adresi yazıyorsa ama bu host "down" ise — lock orphan.

### Hangi Host Lock Etmiş?

Gelişmiş kontrol:
```bash
vmkfstools -D SQL-DB-01-flat.vmdk
```

Çıktı:
```
Lock [type 10c00001 offset 14688256 v 14, hb offset 3293184
gen 3, mode 2, owner 6423d4e2-aff5eec5-e8a3-0025900efa14 mtime 45
num 0 gblnum 0 gblgen 0 gblbrk 0]
Addr <4, 136, 180>, gen 14, links 1, type reg, flags 0, uid 0, gid 0, mode 600
len 107374182400, nb 25600 tbz 0, cow 0, newSinceEpoch 25600, zla 1, bs 4194304
```

`owner 6423d4e2-...` — bu host'un kendi UUID'si mi başka bir host'un mu?

Kendi host UUID'sini al:
```bash
esxcli system uuid get
# Örnek: 6423d4e2-aff5eec5-e8a3-0025900efa14
```

Eğer **aynı** ise = orphan lock (kendim kilitlemişim ama çöktüm, unlock yapamadım). Silmek güvenli.

Eğer **farklı** ise = başka bir host lock ediyor. Çok dikkatli ol — ya çift mount durumu var, ya o host hâlâ aktif.

## 10:07 — Lock Silme

Kendi host'un UUID'si doğrulanınca:

```bash
# Tek tek sil (güvenli)
rm SQL-DB-01.vmx.lck
rm SQL-DB-01.vmdk.lck
rm SQL-DB-01-flat.vmdk.lck

# Veya hepsi toplu (dikkat)
find /vmfs/volumes/datastore1/SQL-DB-01 -name "*.lck" -delete
```

Ayrıca bazen **.lock klasörleri** de oluşur:
```bash
ls -la
# Eğer .lock klasörleri varsa:
rmdir *.lck
# veya
rm -rf *.lck
```

## 10:09 — VM'i Power On

vSphere Client'a dön:

> 📸 **Ekran 2** — VM power on  
> vSphere > VMs > SQL-DB-01  
> Sağ tık > Power > Power On  
> Progress bar görünür  
> Status: **Powered On** (yeşil)

VM açıldı. Windows boot 2 dakika sürdü. SQL Server service otomatik başladı. Logo ERP bağlandı.

**Ama dikkat**: Kontrolsüz kapanma sonrası açıldığı için Windows "Safe Mode" dialog'u veya chkdsk çalıştırabilir.

## 10:15 — Post-Recovery Check

Burak VM açıldıktan sonra:

### 1. Windows Event Log

Event Viewer > System Log > Son 24 saat:
- "Unexpected shutdown" event ID 41
- "chkdsk completed" event

### 2. SQL Server Database Consistency

```sql
DBCC CHECKDB('LogoERP') WITH PHYSICAL_ONLY
```

Herhangi bir "consistency error" varsa — full DBCC:
```sql
DBCC CHECKDB('LogoERP')
```

Error yoksa DB sağlam. Varsa restore from backup gerekebilir.

### 3. VMware Tools Durumu

```bash
# VM içinde (Windows)
C:\Program Files\VMware\VMware Tools\VMwareToolboxCmd.exe stat balloon
```

Tools çalışıyorsa response gelir. Çalışmıyorsa tekrar kur.

## Senaryo B: Lock Dosyaları Silindi Ama Hâlâ "in use"

Bazen lock sildikten sonra da hata devam eder. Sebepler:

### 1. VMX Process Hâlâ Çalışıyor

```bash
# Zombie vmx process'leri
esxcli vm process list

# SQL-DB-01 listede mi?
```

Görünüyorsa:
```bash
esxcli vm process kill --type=force --world-id=<world_id>
```

### 2. NFS Datastore Sessizce Kopuk

Storage bağlantısı partial hata veriyor olabilir:
```bash
esxcli storage nfs list
```

Datastore "Accessible: false" ise:
```bash
esxcli storage nfs remove -v datastore1
esxcli storage nfs add -H 10.10.30.5 -s /vol1 -v datastore1
```

### 3. VMDK Dosyası Bozuk

```bash
vmkfstools -e SQL-DB-01.vmdk
```

Çıktı bozuk VMDK'yı gösterirse:
```bash
vmkfstools --fix repair SQL-DB-01.vmdk
```

⚠️ Bu komut risk — önce yedek al.

### 4. Son Çare: VM'i Inventory'den Çıkar + Tekrar Ekle

vSphere'de:
- Right-click VM → Remove from inventory (silme değil, sadece kayıttan çıkar)
- Datastore browser'ı aç
- VM klasörünü bul → .vmx dosyasına sağ tık → Register VM
- Power on dene

Bu yöntem VM'in tüm ESXi seviyesindeki metadata'yı resetler.

## Önleyici Stratejiler

### 1. UPS + Güçlü Shutdown Scripti

Elektrik kesintisinde ESXi graceful shutdown:
- APC Network Shutdown (PCNS) ile UPS izleme
- X dakika batarya kaldıysa otomatik VM'leri kapat, sonra host kapat

### 2. Host Clustering + HA

ESXi cluster + vSphere HA:
- Bir host çökerse VM'ler başka host'ta otomatik başlar
- Lock orphan sorunu minimized çünkü VM cluster-level kaydedilmiş

### 3. vSAN + Distributed Storage

Local datastore yerine vSAN veya shared storage:
- Host çökse bile VM data başka host'ta var
- Lock management cluster-wide

### 4. Backup Job'ları Shutdown Scripti İçinde

Backup'lar VM snapshots alır. Snapshot sırasında host çöküşü özellikle tehlikeli:
- Backup window gece + UPS yeterli batarya
- Veeam "Quiesce VM before snapshot" aktif

### 5. Storage Multi-pathing

Storage'a tek path ile bağlanma — failure halinde lock kalır. Multi-pathing (iSCSI) veya NFS v4 ile otomatik failover.

## Proxmox Eşdeğer

Proxmox VE'de benzer senaryo:
```
TASK ERROR: VM is locked (backup)
TASK ERROR: VM is locked (migrate)
TASK ERROR: VM is locked (snapshot-delete)
```

Çözüm:
```bash
# Unlock komutu
qm unlock [VMID]
```

Örnek:
```bash
qm unlock 101
```

Sonra VM normalce başlatılabilir.

Detaylı teşhis:
```bash
# Lock durumunu görmek
cat /etc/pve/qemu-server/101.conf | grep lock
```

## Hyper-V Eşdeğer

Hyper-V'de VM "Saved State" veya "Locked" kalabilir:

```powershell
# VM durumu
Get-VM -Name "SQL-DB-01" | Select Name, State, Status

# Locked ise force remove + re-import
Remove-VM -Name "SQL-DB-01" -Force
Import-VM -Path "C:\VMs\SQL-DB-01\Virtual Machines\xxx.vmcx"
```

## İlgili Rehberler

- [ESXi Purple Screen of Death (PSOD) tanılama](/blog/esxi-purple-screen-of-death-psod-tanilama)
- [Hyper-V Live Migration 0x8007274D](/blog/hyper-v-live-migration-failed-0x8007274d)
- [VMware to Proxmox migration](/blog/vmware-proxmox-gecis-broadcom-sonrasi)
- [Veeam VSS backup hatası 0x8007045B](/blog/veeam-backup-hatasi-0x8007045B-vss)

---

**VMware / Hyper-V sanallaştırma altyapı yönetimi, DR planlama ve troubleshoot için uzman destek?** Kozyatağı Bilişim VCP sertifikalı ekibimizle. [Teknik görüşme talep edin.](/#contact)
