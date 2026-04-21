---
slug: fortigate-admin-lockout-recovery-root-password
title: "FortiGate 'Admin Lockout' — Şifre Unutuldu Recovery"
type: cluster
pillar: 4
url: "/blog/fortigate-admin-lockout-recovery-root-password"
hedef_anahtar_kelime: "fortigate admin password recovery"
meta_description: "FortiGate admin şifresi unutuldu — Serial console + maintainer account + factory reset ile şifre recovery. Cihaza fiziksel erişim gerek."
kelime_sayisi: "~700"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Admin Lockout"
product_family: "Fortinet & Firewall"
---

## "Admin Şifresini Unuttuk"

BT sorumlusu ayrıldı. "admin" hesap şifresi Bitwarden'a kaydedilmemiş. Cihaza erişim yok.

## Hızlı Çözüm (TL;DR)

**Cihaza fiziksel erişim gerekli**. Maintainer account via serial console.

1. Serial console (9600 baud) bağlan
2. FortiGate reboot
3. Boot sırasında prompt "login:" gelince **30 saniye içinde**:
   - Username: **maintainer**
   - Password: **bcpb + serial number** (örnek: bcpbFGT60F1234567890)
4. Admin şifresini resetle:
   ```
   config system admin
   edit admin
   set password YeniSifre
   end
   ```

---

## Maintainer Account Gereksinimleri

### Serial Number Bul

Cihaz etiketi üzerinde veya:
```
(eğer başka cihazdan erişim varsa)
get system status
```

Örnek: `FGT60F1234567890`

### Maintainer Password Formatı

```
bcpb<serial_number>
```

Örnek: `bcpbFGT60F1234567890`

## 10:00 — Serial Console Hazırlığı

### Donanım

FortiGate serial port:
- Console port (RJ45 veya USB-C modele göre)
- **9600 baud, 8N1, no flow control**

Laptop'a:
- USB-Serial adaptör (FTDI) + RJ45 kablo
- Ya da modern FortiGate'te USB-C → USB-A kablo

### Terminal Yazılım

- **PuTTY** (Windows)
- **screen / minicom** (Linux)
- **Serial** (Mac)

PuTTY config:
```
Serial line: COM3 (varies)
Speed: 9600
Connection type: Serial
```

## 10:05 — Reboot + Login

1. Serial console connected
2. Terminal'de output görünür
3. FortiGate power cycle (güç kes ve yeniden)
4. Boot sequence başlar

Boot sırasında:
```
FortiGate-60F login:
```

**30 saniye sınırı**. Tetikle:
- Username: `maintainer` (küçük harf)
- Password: `bcpbFGT60F1234567890` (küçük b'ler, case-sensitive)

**Timing**: Prompt'tan 30 saniye içinde yazılmalı. Geç kalırsa reboot tekrar dene.

## 10:08 — Şifre Reset

Login başarılıysa CLI prompt:
```
FGT60F1234567890 #
```

```
config system admin
edit admin
set password YeniGuclu!Sifre2024
next
end
```

Sonra `exit` → next login `admin` / `YeniGuclu!Sifre2024`.

## Alternatif: Factory Reset

Maintainer çalışmazsa (bazı yeni firmware'lerde disabled):

### Hardware Reset Button

Bazı FortiGate modellerinde fiziksel **reset button**. 10 saniye basılı tut → factory defaults.

**UYARI**: Tüm config kayıp. Backup varsa restore, yoksa sıfırdan kurulum.

### TFTP Boot

Advanced — firmware TFTP'den boot + config reset:

1. Serial console
2. Reboot
3. Boot menu'ye ENTER'a bas
4. "F" (Format boot device) veya "B" (Boot from TFTP)
5. Firmware TFTP server'dan yüklenir
6. Factory state

## Önleyici — Şifre Yönetimi

- **Bitwarden Business** tenant'ta
- **2 IT kişisi** erişim
- **DSRM-benzeri** dokümantasyon:
  - Cihaz seri numarası
  - Maintainer password formatı
  - Admin şifre hint (Bitwarden'da actual)
  - Acil durum prosedürü

## Güvenlik Notu

Maintainer account "backdoor". Fortinet 6.4+ itibarıyla **config ile disable edilebilir**:
```
config system global
    set maintainer disable
end
```

Tamamen güvenli ama — **şifre kaybolursa factory reset zorunlu**. Yani hassas karar.

Çoğu şirket:
- Maintainer aktif kalır (fiziksel erişim zaten kritik)
- Admin şifresi Bitwarden'da redundant

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [FortiGate HA Active-Passive](/blog/fortigate-ha-active-passive-cluster)

---

**FortiGate emergency recovery + config yönetimi?** [Teknik görüşme.](/#contact)
