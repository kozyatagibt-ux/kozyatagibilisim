---
slug: synology-nas-volume-crashed-dsm-kurtarma
title: "Synology NAS 'Volume Crashed' Hatası — Veri Kurtarma ve Yeniden Oluşturma"
type: cluster
pillar: 3
url: "/blog/synology-nas-volume-crashed-dsm-kurtarma"
hedef_anahtar_kelime: "synology volume crashed çözüm"
meta_description: "Synology NAS DSM'de 'Volume Crashed' veya 'Degraded' durumu. SHR, RAID rebuild, kötü sektör tespit, veri kurtarma ve yedekleme rehberi."
kelime_sayisi: "~1700"
pillar_linki: "/hizmetler/dosya-paylasim"
troubleshoot: true
error_code: "Volume Crashed / Degraded"
product_family: "Network & Altyapı"
---

## Semptom

Synology NAS'ın DSM arayüzünde Storage Manager > Volume kısmında:

- **"Volume Crashed"** — kırmızı uyarı, volume erişilemez
- **"Degraded"** — sarı uyarı, bir veya daha fazla disk kaybı ama volume hâlâ çalışıyor
- **"Read-only mode"** — yazma devre dışı, sadece okuma
- **"Repairing..."** — RAID rebuild devam ediyor (saatler / günler)

Fiziksel olarak:
- NAS önünde kırmızı LED (Status)
- Disk bay'lerinden birinde kırmızı LED
- Sesli uyarı (beep)
- Paylaşılan klasöre erişim kesildi veya yavaşladı

## Hızlı Çözüm (TL;DR)

1. **NAS'ı kapatmayın!** Rebuild sırasında kapatmak veri kaybı riskini artırır
2. DSM > Storage Manager > HDD/SSD → hangi disk arızalı kontrol et
3. **Ne kadar disk arızalı?** → RAID seviyesine göre toleransa bak
4. Arızalı diski değiştir (hot-swap destekleniyorsa running durumda)
5. DSM otomatik rebuild başlatır — süre disk boyutuna göre **6-48 saat**

**Kritik**: Yedekleme varsa rahatsın. Yoksa önce acil yedek al, sonra disk değişimi.

## Volume Crashed Ne Demek?

Synology DSM'de volume:
- **1 fiziksel disk** (Basic)
- **2+ disk RAID** (SHR-1, RAID 1, 5, 6, 10, SHR-2)

"Crashed" volume, RAID'in tolerance limitini aşan disk kaybı yaşadığı zaman oluşur:
- **SHR-1 / RAID 5**: 1 disk kaybı tolere edilir. **2 disk** arızalanırsa → Crashed
- **SHR-2 / RAID 6**: 2 disk kaybı tolere edilir. **3 disk** arızalanırsa → Crashed
- **RAID 1**: 1 disk kaybı. **2 disk** arızalanırsa → Crashed (mirror tamamen gitti)

### 4 Ana Sebep

1. **Multiple disk failure** (en sık) — iki disk aynı anda bozuldu
2. **Rebuild sırasında ikinci disk fail** — rebuild I/O zorlayıcıdır, yıpranmış disk dayanamaz
3. **NAS donanım arızası** — SATA controller veya backplane
4. **Güç kesintisi / kötü kapanma** — UPS yoksa veya yetersizse

## Adım Adım Kurtarma

### Adım 1: Mevcut Durum Değerlendirmesi

**DSM'ye girebiliyorsan:**
```
Storage Manager > HDD/SSD
```

Her diskin durumu:
- **Healthy** — sağlam
- **Warning** — kötü sektörler var ama çalışıyor
- **Crashed / Not Initialized / Failed** — arızalı

Ve:
```
Storage Manager > Storage Pool
```

Pool durumu:
- Healthy / Normal
- Degraded (1+ disk eksik ama tolere ediliyor)
- Crashed (tolere edemiyor)

**DSM'ye giremiyorsan:**
- NAS LED'lerinden başla (hangi bay'de kırmızı?)
- Telnet/SSH ile bağlanmayı dene: `ssh admin@nas-ip`
- Mdadm durumunu kontrol:
  ```bash
  cat /proc/mdstat
  ```

### Adım 2: Disk S.M.A.R.T. Verileri

Herhangi bir diskin S.M.A.R.T. verisine bak:
```
Storage Manager > HDD/SSD > Disk > Health Info
```

Kritik değerler:
- **Reallocated Sectors Count**: 100+ ise disk ölüyor
- **Current Pending Sector Count**: 0 olmalı; yüksekse kötü sektörler sürüyor
- **Uncorrectable Sector Count**: Herhangi bir değer kırmızı bayrak
- **Temperature**: 55°C+ sürekli ise soğutma problemi

### Adım 3: Rebuild Başlat (Degraded Durum)

Sadece 1 disk arızalıysa (RAID 5/SHR-1) veya 2 disk (RAID 6/SHR-2), rebuild mümkün:

1. **Hot-swap destekleyen NAS'ta**: NAS çalışırken arızalı disk bay'inden disk çıkar, yenisini tak
2. Yeni disk eski disk ile **aynı boyutta veya büyük** olmalı
3. DSM otomatik olarak yeni diski tanır ve "Repair" butonu gösterir
4. **Repair** tıkla, confirm et

**Rebuild süresi**:
- 4 TB disk: ~8-12 saat
- 8 TB disk: ~16-24 saat
- 16 TB disk: ~32-48 saat

Rebuild sırasında:
- Volume **degraded** durumda — 2. disk kaybolursa tam veri kaybı
- NAS yavaşlar (I/O rebuild için)
- **Kapatmayın, yeniden başlatmayın**

### Adım 4: Volume Crashed Durumu (Tolerance Aşıldı)

Birden fazla disk arızalı ve RAID kapasitesini aştıysa:

**Seçenek A: Yedekten Restore**

Önceki yedek varsa:
1. Yeni diskler tak
2. DSM'den **yeni pool + volume** oluştur (crashed olanı sil)
3. Yedekten restore (Hyper Backup, Active Backup for Business, rsync)

**Seçenek B: Profesyonel Veri Kurtarma**

Yedek yoksa ve veri kritikse:
- NAS'ı olduğu gibi bırak (daha fazla yazma yapma)
- Disk'leri çıkarıp professional veri kurtarma servisine (Ontrack, Seagate Recovery, Kroll)
- Türk veri kurtarma firmaları: VeriKurtarma.net, Datahell, bazıları NAS'a özel destek veriyor
- Fiyat: 8-40 bin TL arası (disk sayısı + veri miktarı + acil seviyesine göre)

**Seçenek C: Linux mdadm ile Kendi Başına**

Teknik bilgi + yüksek risk. Sadece alternatif yoksa:
```bash
# NAS'tan diskleri çıkarıp bir Linux PC'ye bağla
# SATA-USB adapter ile
# Tüm diskleri aynı anda

mdadm --assemble --scan
cat /proc/mdstat
# Array geçici olarak assemble olursa:
mount /dev/md0 /mnt/recovery
# Kritik dosyaları kopyala
```

Bu yaklaşım deneyimsiz ellerde veriyi **daha da bozabilir**. Yedek yoksa profesyonele götür.

### Adım 5: Yeni Pool ve Volume Oluştur

Veri kurtarma sonrası veya yeni başlangıç:

1. **Disk seçimi**: Enterprise NAS diski (WD Red Pro, Seagate IronWolf Pro, Toshiba N300) — consumer disk NAS için önerilmiyor
2. **RAID seviyesi**:
   - 4 bay altı NAS: **SHR-1** (esneklik için)
   - 4+ bay NAS ve kritik veri: **SHR-2** (iki disk toleransı)
   - Tam aynı disklerse: **RAID 6**
3. **File system**: 
   - **Btrfs** (önerilen) — snapshot, compression, checksum
   - **ext4** — daha basit, az özellik

4. Oluşturduktan sonra **immediately** yedek planla — ilk dosya kopyalanmadan önce

## Önleyici Bakım — Tekrar Olmasın

### 1. Haftalık S.M.A.R.T. Taraması

```
Control Panel > Storage Manager > HDD/SSD > 
Schedule S.M.A.R.T. Test > Weekly, Extended
```

Reallocated sectors artıyorsa disk değiştir.

### 2. Aylık Data Scrubbing

RAID paritesinin ve dosya bütünlüğünün kontrolü:
```
Storage Manager > Storage Pool > Action > Data Scrubbing > Start
```

Ayda bir gece çalıştır (4-8 saat sürebilir).

### 3. 3-2-1 Yedekleme Kuralı

- **3 kopya** toplam
- **2 farklı medya** (NAS'ta primary, harici USB veya ikinci NAS'ta replica)
- **1 offsite** (bulut: Synology C2, Backblaze B2, Wasabi)

Synology Hyper Backup ile:
```
Package Center > Hyper Backup > 
Create backup task > Synology C2 Storage / Google Drive / Local USB
```

### 4. UPS + Güvenli Kapanma

- Synology UPS bağlantısı yap (USB veya network UPS)
- DSM > Hardware & Power > UPS > "Enable UPS support"
- Güç kesilince 5-10 dk sonra auto-shutdown

### 5. Enterprise-Grade Disk Seç

Consumer (WD Blue, Seagate BarraCuda) vs Enterprise (WD Red Pro, Seagate IronWolf Pro) fark:
- MTBF 600K → 1.2M saat
- Vibration handling (çok bay'li NAS'ta kritik)
- Error recovery timing
- 5 yıl garanti vs 2 yıl
- Consumer maliyetin %30-40 üstünde ama ömrü 2x

### 6. Yedek Diskler Stoklayın

Production NAS için **bir yedek disk** stokta tut. Disk arızalanınca kargo beklemeyin, hemen takın.

## Sık Sorulan Sorular

### Rebuild sürerken NAS'ı kullanabilir miyim?

Evet ama performans %40-60 düşer. Büyük dosya transferi yapmamak önerilir — rebuild yavaşlar.

### İki disk aynı anda nasıl arızalandı?

Genelde aynı batch'ten diskler + aynı ortam (sıcaklık, titreşim) + aynı yaş = aynı anda fail. Bu yüzden NAS'a disk alırken **farklı üretim tarihli veya farklı markalarda** alın.

### Yedeğim NAS'ta — NAS çökünce ne yaparım?

İşte bu yüzden 3-2-1 kuralı. NAS'taki Hyper Backup "başka bir NAS'a" veya "bulut storage'a" gönderilmeli. Aynı NAS'taki yedek hiçbir şey değil.

### SHR-1 mi SHR-2 mi?

SHR-1 1 disk toleransı, SHR-2 2 disk. 6+ bay NAS ve kritik veride SHR-2 öneriyoruz. 4 bay NAS'ta SHR-1 + iyi yedek.

### Synology BTRFS self-healing mi?

BTRFS checksum var, bit-rot'u tespit edebilir. Ama kendi kendine onarmaz — SHR-2 parity ile kombinasyonda onarım mümkün.

---

**NAS / dosya paylaşım altyapısı kurulum, backup stratejisi ve felaket kurtarma için uzman destek?** Kozyatağı Bilişim Synology Certified Partner ekibimizle KOBİ ve orta ölçekli NAS deployment. [Teknik görüşme talep edin.](/#contact)
