---
slug: bulten-vsphere-8u3-vmotion-nic-driver
title: "VMware vSphere 8.0 U3 — vMotion ix(g)ben Driver ile Takılıyor"
type: bulten
pillar: 1
url: "/blog/bulten-vsphere-8u3-vmotion-nic-driver"
hedef_anahtar_kelime: "vsphere 8 u3 vmotion stuck"
meta_description: "VMware vSphere 8.0 Update 3'te Intel ixgben sürücüsü ile vMotion %98'de takılıyor. Bilinen sorun ve geçici çözüm rehberi."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
bulten: true
date: 2024-11-20
last_updated: 2026-03-10
status: gecici_cozum
severity: yuksek
product_family: "VMware & Sanallaştırma"
affected_versions: "vSphere 8.0 Update 3 (Build 24022510) ESXi host'ları Intel X710/XL710 ixgben driver 1.15.x ile"
fixed_version: "Beklenen: 8.0 U3 Patch 2 (ETA Q2 2026). Şu an kalıcı fix yok."
vendor_advisory: "VMware KB 92993 (topluluk yorumu yoğun)"
workaround_available: true
---

## Özet

VMware vSphere 8.0 Update 3'e geçen kurumsal ortamlarda **vMotion task'ları %98 progress'te takılıyor** — Intel X710 veya XL710 NIC'lere sahip host'larda, özellikle `ixgben` driver 1.15.0 veya 1.15.1 ile.

**Semptom**: vCenter'da vMotion başlıyor, VM kopyalanıyor, son anda "copying memory pages" aşamasında takılıyor. 30+ dakika bekledikten sonra task cancel oluyor, VM kaynak host'ta kalıyor.

**Durum (2026 Nisan)**: VMware bu sorunu doğruladı ama kalıcı fix henüz yayınlanmadı. Geçici çözümler mevcut.

## Etki

- vMotion başarısız — DRS otomatik yük dağıtımı çalışmıyor
- Host maintenance mode'a alınamıyor — kullanıcı müdahalesi gerekiyor
- HA failover normal (farklı kod yolu), ama planlı bakım engelleniyor
- Büyük kurumsal ortamlarda production migration'ları tamamen stop

## Teşhis

### NIC Driver Versiyonu Kontrol

```bash
esxcli software vib list | grep ixgben
```

Çıktı:
```
ixgben    1.15.0-1OEM.703.0.0.18644231
```

`1.15.0` veya `1.15.1` ise — etkilenen sürüm.

### vMotion Log

```bash
# /var/log/hostd.log
grep -i "vmotion" /var/log/hostd.log | tail -50
```

Pattern:
```
VmotionSource: memory copy: iteration N
VmotionSource: memory copy: iteration N (stuck)
...
```

Aynı iteration'ı defalarca yazıyorsa — confirmed.

## Geçici Çözüm

### Seçenek A: Driver Downgrade (Önerilen)

Eski stabil versiyon 1.14.1.0:

```bash
# Host'u maintenance mode'a al
esxcli system maintenanceMode set --enable=true

# Eski driver indir (VMware Customer Connect'ten)
# Intel-ixgben_1.14.1.0-1OEM.703.0.0.18644231.vib

# Kaldır + yeni yükle
esxcli software vib remove -n ixgben
esxcli software vib install -v /tmp/Intel-ixgben_1.14.1.0.vib --force

# Reboot
reboot

# Maintenance mode kapat
esxcli system maintenanceMode set --enable=false
```

### Seçenek B: vMotion Compression Disable

vMotion sırasında memory compression tetikliyor bu bug'ı. Disable:

```bash
esxcli system settings advanced set -o /Migrate/MemChksumOptimization -i 0
```

Kalıcı olmayabilir (reboot sonrası reset). Advanced settings GUI'den de yapılabilir:

vCenter > Host > Configure > System > Advanced System Settings
- `Migrate.MemChksumOptimization` = 0

### Seçenek C: vMotion Network Bandwidth Limit

Agresif bandwidth ile takılıyor. Rate limit:
```bash
# vMotion vmkernel adapter'da
esxcli network vm list
esxcli network nic set -n vmk1 -S 10000 -D full
```

10 Gbps yerine geçici olarak daha düşük.

## Risk ve Dikkat Noktaları

- **Driver downgrade** — Intel firmware kombosu ile uyum garanti değil. Test ortamında önce dene.
- **vMotion disabled** — Production cluster'da DRS otomatik yük dengesi çalışmaz. Manuel monitoring şart.
- **Maintenance mode gecikmesi** — bakım pencereleri daha uzun planlanmalı.

## Uzun Vadeli Planlama

Production ortamlarında:
1. **Yeni host kurulumları** 8.0 U2 Patch 3'te tut (etkilenmeyen sürüm)
2. **Mevcut U3 host'larında** ixgben 1.14.1'e downgrade
3. **VMware resmi fix** gelince (beklenti Q2 2026) tam upgrade yap

Paralel alternatif: **Broadcom bnxtnet** sürücülü NIC'lere migration (Intel yerine Broadcom network kartı). Donanım değişikliği gerektirir.

## Etki Seviyesi

- **Acil mi?** Orta — production etki var ama data loss veya security risk yok.
- **Cluster'ınızda sık vMotion mı?** DRS otomatik balancing kullanıyorsanız — acil.
- **Sadece manual bakım?** Low priority, 1-2 hafta bekleyebilir.

## Bilinen Alternatif Ürünler

Bu tip sürücü-firmware ikilemlerinden kaçınmak isteyenler için:

- **Broadcom bnxtnet** sürücüleri genelde daha stabil (NDC Dell / HPE)
- **Mellanox ConnectX-5/6** daha az bug'lı ama pahalı
- Ayrı vMotion network interface (dedicated NIC) — problemi azaltabilir

## İlgili Kaynaklar

- VMware KB 92993 (topluluk thread'i dahil)
- Intel ixgben driver release notes
- VMware Compatibility Guide

---

**VMware vSphere production tuning ve patch management için uzman destek?** Kozyatağı Bilişim VCP sertifikalı ekibimizle vSphere altyapı yönetimi, upgrade planlama ve troubleshooting. [Teknik görüşme talep edin.](/#contact)
