---
slug: bulten-veeam-12-1-cbt-reset-hyperv
title: "Veeam Backup & Replication 12.1 — Hyper-V Node Restart Sonrası CBT Reset"
type: bulten
pillar: 3
url: "/blog/bulten-veeam-12-1-cbt-reset-hyperv"
hedef_anahtar_kelime: "veeam 12.1 cbt reset hyper-v"
meta_description: "Veeam 12.1 sürümünde Hyper-V cluster node restart sonrası VM'lerin CBT bilgisi resetleniyor, full backup'a zorluyor. Bilinen sorun ve çözüm."
kelime_sayisi: "~800"
pillar_linki: "/hizmetler/felaket-kurtarma-yedekleme"
bulten: true
date: 2024-03-18
last_updated: 2024-06-28
status: cozuldu
severity: orta
product_family: "Veeam & Yedekleme"
affected_versions: "Veeam Backup & Replication 12.1 (Build 12.1.0.2131), Hyper-V 2019/2022 cluster"
fixed_version: "Veeam 12.1.1 (Build 12.1.1.56)"
vendor_advisory: "Veeam KB4526"
workaround_available: true
---

## Özet

Veeam Backup & Replication 12.1'de **Hyper-V cluster node'u restart edildikten sonra**, o node'da çalışan VM'lerin **Change Block Tracking (CBT)** bilgisi reset oluyor. Sonraki incremental backup job yerine **full backup** tetikleniyor.

Büyük ortamlarda (20+ VM, 10 TB+) bu durum:
- Günlük 200-300 GB incremental backup yerine 10 TB full
- Gecelik backup penceresi taşıyor
- Repository storage hızlıca doluyor

## Semptom

Veeam job log'unda:
```
[Warning] Processing [VM_name] Info: Changed block tracking 
information for VM has been reset. Full backup will be performed.
```

Bir sonraki günün job'u beklenen 200 GB yerine 5-10 TB kopyalamaya başlıyor.

## Kök Sebep

Veeam 12.1, Hyper-V cluster node metadata'sına CBT state'ini VM UUID bazında yazıyor. Node restart olunca bu state Windows Event Tracing (ETW) buffer'ından temizleniyor — Veeam "tracking kayıp" diye yorumluyor ve full'a zorluyor.

Veeam 12.0'da (önceki sürüm) metadata cluster shared storage'da tutuluyordu — restart sonrası persist oluyordu. 12.1'deki performance optimizasyonu yan etki yarattı.

## Geçici Çözüm

### Seçenek A: Registry Patch

Veeam KB4526'da yayınlanan hotfix script:

```cmd
# Veeam server'da
HKLM\SOFTWARE\Veeam\Veeam Backup and Replication\
```

Yeni DWORD oluştur:
```
Name: HvCbtPersistMode
Type: DWORD (32-bit)
Value: 1
```

Veeam Backup Service restart:
```powershell
Restart-Service VeeamBackupSvc
```

### Seçenek B: Hyper-V Cluster Node'u Geçici Olarak Live Migration ile Boşalt Restart Öncesi

Planlı restart/patch öncesi:
```powershell
# Node'u boşalt (drain mode)
Suspend-ClusterNode -Name HyperVNode01 -Drain -Wait

# Restart
Restart-Computer -Force

# Resume
Resume-ClusterNode -Name HyperVNode01
```

Bu yöntemde VM'ler başka node'a Live Migration ile geçer, CBT reset olmuyor. Ama planlı bakımı gerektiriyor — acil restart'ta işe yaramıyor.

### Seçenek C: Workaround Job Config

Backup job settings > Storage > Advanced > Backup > "Perform active full backup" = periodic (monthly)

Bu, CBT reset olunca otomatik full'a geçmeyi normal iş akışına çevirir. Ideal değil ama etkiyi azaltır.

## Kalıcı Çözüm

Veeam 12.1.1 Patch 1 (Haziran 2024) bu sorunu **tamamen çözdü**. Cluster shared storage üzerinde persistent CBT state mekanizması geri getirildi.

Upgrade:
1. Veeam Enterprise Manager'dan "Available Updates" kontrol
2. 12.1.1 patch indir
3. Maintenance pencerede yükle (5-10 dk kesinti)
4. Post-upgrade test backup

## Post-Patch Kontrol

Upgrade sonrası bir node'u test restart edip backup job'ı gözlemleyin. "CBT reset" uyarısı **gelmemeli**.

## Etki Seviyesi

- **Hâlâ risk mi?** 12.1.1 yüklediyseniz hayır.
- **12.1'de kalıp yamamadıysam?** Node restart'lar sık olduğunda backup pencereleri kayıyor, repository doluyor.
- **Immutable storage ile etkisi?** S3 Object Lock / Wasabi kullananlar için retention politikasına göre daha fazla kopya saklanıyor — extra maliyet.

## İlgili Kaynaklar

- Veeam KB4526
- Veeam 12.1.1 Release Notes
- Hyper-V Cluster Aware Updating documentation

---

**Veeam backup altyapısında patch management, performance tuning ve proaktif monitoring?** Kozyatağı Bilişim Veeam sertifikalı ekibimizle kurumsal backup-as-a-service hizmeti. [Teknik görüşme talep edin.](/#contact)
