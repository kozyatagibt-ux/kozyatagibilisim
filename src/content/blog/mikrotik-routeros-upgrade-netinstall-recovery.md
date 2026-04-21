---
slug: mikrotik-routeros-upgrade-netinstall-recovery
title: "MikroTik RouterOS Upgrade + Netinstall Recovery — Güvenli Firmware Güncelleme"
type: cluster
pillar: 4
url: "/blog/mikrotik-routeros-upgrade-netinstall-recovery"
hedef_anahtar_kelime: "mikrotik routeros upgrade"
meta_description: "MikroTik RouterOS güvenli firmware upgrade. Stable vs long-term vs development channels, package download, upgrade sequence, brick sonrası Netinstall."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "Firmware Upgrade"
product_family: "Network & Altyapı"
---

## "CVE-2024 Çıktı, Firmware Güncellemeliyim"

MikroTik 2024'te kritik CVE açıkladı. Firmware upgrade gerekli. Ama yanlış upgrade → brick riski. Doğru süreç:

## Release Channels

- **Stable**: Production için, test edilmiş
- **Long-term**: LTS, sadece security fix
- **Development**: Beta, production'a koyma!

Production'da **stable** kullan.

## Hızlı Çözüm (TL;DR)

```
# 1. Backup mutlaka
/system backup save name=before-upgrade

# 2. Mevcut version kontrol
/system package print

# 3. Latest stable indir
/system package update check-for-updates
/system package update download

# 4. Reboot (upgrade apply)
/system reboot
```

5 dakika total downtime.

---

## 10:00 — Pre-Upgrade Hazırlık

### Backup

**İki yedek al**:
```
# 1. Binary backup (full state + encrypted password)
/system backup save name=pre-upgrade-$(date +%Y%m%d)

# 2. Export (readable, restore kolay)
/export compact file=pre-upgrade-config
```

Download:
- Winbox > Files > backup file sağ tık > Download

Güvenli yerde sakla (Bitwarden + offsite).

### Compatibility Check

```
/system resource print
```

Current version + architecture. Upgrade path:
- **6.x → 7.x**: **Major version jump** — test ortamında önce dene. Config syntax değişiyor.
- **7.x → 7.y (minor)**: Güvenli, test gerekmez (genelde)
- **7.14 → 7.15** gibi patch: Güvenli

## 10:10 — Upgrade

### Method A: Auto-Download (Winbox)

```
/system package update set channel=stable
/system package update check-for-updates
```

Çıktı:
```
installed-version: 7.14.2
latest-version:    7.14.4
status:            New version is available
```

```
/system package update download
```

Download tamamlandı → reboot:
```
/system reboot
```

Reboot sırasında package install. 2-3 dakika downtime.

Reboot sonrası:
```
/system resource print
```

Version güncel → upgrade başarılı.

### Method B: Manuel .npk Upload

Internet yoksa manuel:

1. `https://mikrotik.com/download` → "Long-term" veya "Stable"
2. Architecture match (ARM, MIPSBE, x86 vs.)
3. `.npk` paketi indir (ör. `routeros-7.14.4-arm.npk`)
4. Winbox > Files > upload .npk
5. `/system reboot` → install

## 10:20 — Post-Upgrade Verification

```
/system package print
```

Tüm packages güncel versiyon mu?

```
/system resource print
```

Uptime yeni başlamış olmalı (reboot sonrası).

### Feature Test

- Internet: `/ping 8.8.8.8`
- LAN: Laptop'tan test
- VPN: IPsec tunnel up mu? `/ip ipsec active-peers print`
- Firewall: `/ip firewall filter print` — rule'lar orada mı?

## Rollback

Upgrade sorun yaratırsa:

```
/system package downgrade
```

Mevcut package'ın bir önceki versiyonu (varsa). Reboot.

Yoksa:
```
/system package print
# Set disable
/system package disable wireless
/system reboot
```

Disabled package başka versiyona upgrade edilebilir.

## Brick — RouterOS Boot Olmuyor

Upgrade sırasında elektrik kesildi veya corrupt paket. Router boot olmuyor.

**Netinstall Recovery**:

1. Netinstall indir (Windows tool):
   `https://mikrotik.com/download` > **Netinstall**

2. Laptop:
   - IP: 192.168.88.100/24 static
   - Ethernet → MikroTik port1

3. Netinstall aç:
   - "Net booting" enable
   - Client IP: 192.168.88.2
   - "Boot Server enabled"

4. MikroTik boot modunda başlat:
   - Power off
   - Reset button basılı tut
   - Power on (button basılı)
   - LED pattern değişince bırak (~10 sn)

5. Netinstall "Routers" listede → MAC ile görür

6. Firmware `.npk` browse > select

7. **"Install"** — 2-5 dakika flash

8. MikroTik reboot, factory defaults

Config backup'tan restore:
```
/system backup load name=pre-upgrade
```

## Scheduled Upgrades

Kritik ortamda auto-upgrade **önerilmez** (test edilmemiş patch production'ı çökertebilir). Ama notification:

```
/system package update set channel=stable
/system scheduler add name=check-updates interval=1w on-event={
    /system package update check-for-updates
    # Mail gönder eğer yeni versiyon var
}
```

## Multi-Device Upgrade

20+ MikroTik var. Script otomasyon:

```bash
# Ansible + RouterOS module
ansible all -m routeros_update -a "check_for_updates=yes"
```

Veya PowerShell + SSH script:
```powershell
$routers = @("rtr-hq", "rtr-branch1", ...)
foreach ($r in $routers) {
    Invoke-SSHCommand -ComputerName $r -Command "/system package update download; /system reboot"
}
```

Batch upgrade, staggered (biri bittikten sonra diğeri).

## Yaygın Hatalar

### "Package is not compatible"

Architecture mismatch. MIPSBE vs ARM vs x86 farklı firmware'ler. Doğru arch indir.

### Upgrade Sonrası Config Kayıp

Config normalde korunur. Kayıp nadir — genelde brick durumu. Backup'tan restore.

### Config Var Ama Interface'ler İsim Değişti

Major version jump (6.x → 7.x) bazen interface naming değişir. Config restore edilince mapping yeniden:
```
/interface ethernet print
# Yeni isimler görünür
```

Rename + update references.

## Security Best Practice

- **Quarterly** upgrade check (3 ayda bir)
- **CVE acil** → 48 saat içinde yama
- **Major (6 → 7)** test lab'da önce
- **Backup her zaman**

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik Winbox bağlantı](/blog/mikrotik-winbox-baglanmiyor-mac-mode)
- [MikroTik backup otomasyon](/blog/mikrotik-backup-otomatik-scheduled)

---

**MikroTik patch management + security için destek?** [Teknik görüşme.](/#contact)
