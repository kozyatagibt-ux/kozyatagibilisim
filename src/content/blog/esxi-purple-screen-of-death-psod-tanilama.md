---
slug: esxi-purple-screen-of-death-psod-tanilama
title: "ESXi Purple Screen of Death (PSOD) — Log Analizi ve Çözüm"
type: cluster
pillar: 1
url: "/blog/esxi-purple-screen-of-death-psod-tanilama"
hedef_anahtar_kelime: "esxi purple screen psod"
meta_description: "VMware ESXi Purple Screen of Death (PSOD) ile karşılaştığınızda hangi log'lara bakılır, crash dump nasıl analiz edilir, tekrarlanmaması için ne yapılmalı."
kelime_sayisi: "~2100"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
troubleshoot: true
error_code: "PSOD / Purple Diagnostic Screen"
product_family: "VMware & Sanallaştırma"
---

## Semptom

ESXi host konsolunda mor ekran — "Purple Screen of Death" (PSOD). Windows'un BSOD'si gibi ama VMware versiyonu.

Tipik PSOD ekranı şöyle:

```
VMware ESXi 7.0.3 [Releasebuild-17630552 x86_64]
#PF Exception 14 in world 2097253:vmm1:VM-DB IP 0x418033a8c1f7 addr 0x0

cr0=0x8001003d cr2=0x0 cr3=0x18b40e000 cr4=0x2227e0
frame=0x43b7c4cbe9b0 ip=0x418033a8c1f7 err=0 rflags=0x10202

PCPU 14: HV:0 SH:0 FS:1 FH:1 CS:1 IS:0
Code start: 0x418032e00000 VMK uptime: 15:22:11:34.852
0x43b7c4cbe9f0:[0x418033a8c1f7]Migrate_HaltMPWork@vmkernel#nover+0x247
0x43b7c4cbea40:[0x418033a8c7d8]Migrate_MPWorker@vmkernel#nover+0x1c4
0x43b7c4cbeb00:[0x418032f9e5dd]WorldFunc@vmkernel#nover+0x45

Coredump to disk
```

PSOD = host kernel crash — tüm VM'ler **instantly** duruyor. HA aktifse diğer host'ta otomatik restart olur, yoksa manuel intervention gerekir.

## Hızlı Çözüm (TL;DR)

1. Host'u **hemen yeniden başlatma** — crash dump'ı kaybedersin
2. Ekrandaki **ilk 3-5 stack trace satırını** fotoğrafla veya not et
3. Host restart → vCenter'dan host'a bağlan
4. **Crash dump** dosyasını al: `/var/core/` dizininde
5. VMware Knowledge Base'de stack trace'teki fonksiyon adıyla ara
6. Eğer tekrarlıyorsa host'u cluster'dan ayır, analiz tamamlanana kadar kullanma

## PSOD Neden Oluşur?

PSOD, VMkernel bir fatal error algıladığında otomatik panic yapar. En yaygın sebepler:

### Sebep 1: Bilinen VMware Bug

Her ESXi release'inde bilinen crash bug'ları olabilir. VMware KB'ları:
- **KB 88695** — 7.0 U3 öncesinde NVMe driver crash
- **KB 92953** — ESXi 7.0 U3c + AMD EPYC PSOD
- **KB 93654** — vmxnet3 adapter PSOD on high traffic

Firmware + ESXi uyumsuzluğu sık sebep.

### Sebep 2: Hardware Arızası

- **RAM** ECC hatası — yaygın sebep
- **CPU overheating**
- **NIC** sürücü bozulması
- **HBA / Storage adapter** timeout
- **Disk / SSD** beklenmedik hatası

### Sebep 3: Driver Uyumsuzluğu

ESXi'ye yüklenen 3. parti driver (NIC, HBA, storage vendor driver):
- Intel NIC ixgben driver
- Broadcom bnxtnet (Dell NDC card)
- LSI / Avago MegaRAID

### Sebep 4: VM Seviyesinde Toxic Workload

Nadir, ama bir VM'in olağandışı davranışı (infinite loop in vmxnet3 driver, trigger VMkernel bug) host'u düşürebilir.

### Sebep 5: Memory Pressure / TPS

Çok yüksek memory overcommit + balloon driver çakışması (genelde yeni ESXi sürümlerinde yok ama 6.x'te görünürdü).

## Adım Adım Tanı

### Adım 1: PSOD Ekranını Fotoğrafla

Önemli bilgiler:
- ESXi build numarası (üstte yazar)
- "Exception" tipi (#PF, #GP, #UD, NMI)
- Stack trace — ilk 5-10 satır en kritik
- "PCPU" numarası
- "VMK uptime" (ne kadar süredir up)

### Adım 2: Host'u Başlat + vCenter Erişimi

```
# Host restart
# Console'da CTRL+ALT+DEL ya da fiziksel güç butonu
```

Host up olduktan sonra vCenter'dan host'a bağlan. Cluster içindeyse HA otomatik VM'leri diğer host'ta başlatmış olmalı.

### Adım 3: Crash Dump Dosyası Al

ESXi SSH açık olmalı (Host > Configure > Services > SSH > Start).

SSH bağlantısı:
```bash
ssh root@esxi-host
```

Crash dump'ı bul:
```bash
ls -lh /var/core/
```

Tipik dosya:
```
vmkernel-zdump-2026-04-20-08-45-12.1
```

Boyut genelde 1-4 GB arasında. Bu dosyayı güvenli yere kopyala (scp ile iş istasyonuna):

```bash
scp root@esxi-host:/var/core/vmkernel-zdump-* /tmp/
```

### Adım 4: VMware Support Bundle Oluştur

Detaylı analiz için VMware bundle lazım:
```bash
vm-support
# Çıktı: /var/tmp/vm-support-YYYY-MM-DD--HH.MM.tgz
```

Bu 500MB-2GB arası dosya, crash dump + tüm log'lar + config + health data.

### Adım 5: Stack Trace Analizi

VMware KB'da arama:
```
# İlk stack satırındaki fonksiyon adı
Migrate_HaltMPWork
```

[https://kb.vmware.com/](https://kb.vmware.com/) da ara — benzer crash'ler için KB makaleleri var. Eğer bulursan:
- Affected version
- Workaround
- Fix date

### Adım 6: ESXi Version Kontrolü

```bash
esxcli system version get
# Product: VMware ESXi
# Version: 7.0.3
# Build: 19898904
```

Bu build, en son yayınlanan stable build ile kıyasla. Build notes'ta "PSOD" bug fix'leri varsa update gerekli.

### Adım 7: Hardware Health

```bash
# CPU thermal
esxcli hardware cpu get

# Memory
esxcli hardware memory get

# IPMI sensor (üretici iLO / iDRAC üzerinden)
```

Veya vCenter > Host > Monitor > Hardware Health.

- **CPU Temperature** >75°C sürekli ise soğutma problemi
- **DIMM ECC corrected errors** yüksek ise RAM arızalanmış
- **Voltage regulator** unstable ise güç kaynağı problemi

### Adım 8: Driver Versiyonu Kontrol

```bash
esxcli software vib list | grep -i "net-"
esxcli software vib list | grep -i "raid"
esxcli software vib list | grep -i "nvme"
```

Output örneği:
```
vmkusb-nic-fling  1.11-1vmw.702.0.0.17867351
ixgben            1.12.3.0-1OEM.703.0.0.18644231
lsi-mr3           7.720.03.00-1OEM.703.0.0.18644231
```

Son bölüm build versiyonu. VMware compatibility matrix'te bu driver + ESXi build uyumlu mu? HCL kontrol:
https://www.vmware.com/resources/compatibility/search.php

Eksikse veya mismatch varsa:
```bash
# Yeni driver yüklemek için maintenance mode
esxcli system maintenanceMode set --enable=true

esxcli software vib install -d /path/to/driver.zip
# Veya URL'den:
esxcli software vib install -d https://vendor.com/driver.zip

reboot
```

### Adım 9: Microcode / BIOS Update

CPU microcode (Intel Spectre/Meltdown yamaları, AMD errata) crash'e yol açabilir.
- BIOS/firmware güncel mi? Üretici (Dell iDRAC, HPE iLO, Lenovo XClarity) üzerinden kontrol
- Genelde BIOS minor update'leri bile 6 ayda bir gelir

Güncelleme:
```
Dell Lifecycle Controller > System BIOS > Update
```

### Adım 10: Memory Test

Eğer ECC corrected errors yükseldiyse veya RAM şüpheliyse:
```
# ESXi bootta F2 → Troubleshoot → Memory Test
# Veya 3rd party: memtest86+
```

Memory test 4-8 saat sürer (saat başına 1 pass). En az 2 full pass temiz olmalı.

Arızalı DIMM tespit edilirse değiştir.

## Bilinen PSOD Senaryolarına Özel Çözüm

### Senaryo A: "NMI received"

Genelde hardware kaynaklı. BIOS'ta NMI monitoring disable et (geçici):
```
BIOS > Performance > NMI Watchdog = Disabled
```

Ve hardware parçalarını test et.

### Senaryo B: "VMCIVSock" crash

VMware Tools ile ilgili. VM'lerde VMware Tools güncelle.

### Senaryo C: "Migrate_HaltMPWork"

vMotion sırasında crash. Ağ tarafında packet loss olabilir. vMotion network'ünü test et:
```bash
vmkping -I vmkN [diğer_host_vmk_ip]
```

### Senaryo D: "nvme_ResetDevice"

NVMe driver bug'ı. Driver güncellemesi veya NVMe firmware update.

### Senaryo E: "PF Exception 14" in "vmxnet3"

vmxnet3 ağ kartı driver'ı. VM'lerde vmxnet3'ü e1000e'ye geçirmek geçici çözüm (performans düşürür).

## Önleyici Bakım

### 1. Firmware/Driver Güncellemeleri

6 aylık döngü:
- ESXi patch (her çeyrekte)
- Server BIOS / iDRAC / iLO (yıllık minimum)
- NIC / HBA firmware (her 12 ay)

### 2. VMware vCenter Health Monitor

Alarms > Definitions:
- "Host hardware temperature" > eşik aşıldı
- "Host hardware fan" > hata
- "Host memory usage" > %85
- "Host CPU usage" > %85

### 3. SEL Log Monitoring

IPMI SEL (System Event Log) düzenli temizlenmeli ve izlenmeli:
```bash
/opt/vmware/bin/ipmitool sel elist
```

### 4. vSAN / Storage Health

vSAN varsa vSAN health service panelini düzenli kontrol.

### 5. Stand-by ESXi Host

Cluster'da 1 fazladan host ayırın — PSOD olunca diğerleri üretime devam etmeli (n+1 redundancy).

## Dell / HPE / Lenovo Özel Araçlar

### Dell
- OpenManage Enterprise
- iDRAC Service Module (ESXi içine kurulur, health data paylaşır)
- Dell Firmware Update for ESXi

### HPE
- HPE Agentless Management (AMS)
- HPE iLO integration
- HPE Integrity Offline Firmware Update

### Lenovo
- xClarity Administrator / Integrator
- xClarity Controller

Bu araçlar standart ESXi'den daha derin health data verir.

## Sık Sorulan Sorular

### PSOD sonrası tüm VM'ler neden kayıp?

Host tamamen durduğu için — eğer HA (High Availability) varsa cluster, VM'leri başka host'ta başlatır. HA yoksa manuel.

### Crash dump dosyası olmadan analiz mümkün mü?

Stack trace ekrandan alındıysa kısmen. Ama VMware destek detaylı dump ister. "Dump to disk" olması için /var/core/ yeterli alan olmalı (host kurulumunda zaten default).

### Production'da sık PSOD — ne yapmalı?

VMware Support ticket aç. "Proactive support" veya "Production support" aldıysan mühendis destek alırsın. Ücretsiz desteği olanlar community forum.

### vSAN cluster'ında 1 host PSOD oldu — VM'ler etkilenir mi?

vSAN "FTT=1" (Failure To Tolerate) set edildiyse hayır — veri başka host'larda kopyası var, HA VM'leri başka host'ta başlatır. FTT=0 ise etkilenir.

### Home lab / small ESXi — community desteği yeterli mi?

Küçük ortamlarda evet. VMware Community Forum aktif. Production ortamında mutlaka VMware Support contract olsun.

---

**VMware altyapı yönetimi / crash analizi / performance tuning uzman desteği?** Kozyatağı Bilişim VMware VCP sertifikalı ekibimizle vSphere, vSAN ve vCenter danışmanlığı sunuyoruz. [Teknik görüşme talep edin.](/#contact)
