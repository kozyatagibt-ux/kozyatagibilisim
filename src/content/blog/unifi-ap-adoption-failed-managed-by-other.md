---
slug: unifi-ap-adoption-failed-managed-by-other
title: "UniFi AP 'Adoption Failed' veya 'Managed by Other' — Çözüm Rehberi"
type: cluster
pillar: 4
url: "/blog/unifi-ap-adoption-failed-managed-by-other"
hedef_anahtar_kelime: "unifi ap adoption failed managed by other"
meta_description: "UniFi access point controller'a adopt olmuyor, 'Adoption Failed' veya 'Managed by Other' durumunda kalıyor. SSH factory reset, L3 adoption ve DNS kaydı çözümü."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "Adoption Failed / Managed by Other"
product_family: "Network & Altyapı"
---

## Semptom

UniFi Controller / Network Application'da yeni bir AP (veya switch, gateway) görünüyor ama:

- **"Managed by Other"** — başka bir controller tarafından yönetiliyor
- **"Adoption Failed"** — adoption başlatıldı ama başarısız
- **"Offline"** — LED yanıyor (mavi veya turkuaz) ama controller göremiyor
- **"Pending"** uzun süre takılı
- **"Updating"** bitmiyor
- LED renkleri:
  - **Mavi** = fabrika ayarları, adoption için hazır
  - **Turkuaz** (yanıp sönen) = adoption devam ediyor
  - **Beyaz** = bağlı ve yönetiliyor
  - **Kırmızı** = fault / provisioning failure

## Hızlı Çözüm (TL;DR)

1. **AP'yi factory reset et** (küçük reset butonu 10+ saniye basılı tut)
2. AP ve Controller **aynı L2 subnet**'te olmalı (ya da L3 adoption yapılandırılmış)
3. DHCP'den IP aldığından emin ol
4. Aynı L2'de değilse **SSH ile manual adoption** komutu
5. Controller'da AP'nin MAC adresi "forgotten devices"ta mı kontrol et

## Adoption Nasıl Çalışır?

UniFi cihazları controller'ı **Layer 2 broadcast** ile bulur (varsayılan). Aynı subnet'te değilse L3 adoption gerekir. Süreç:

1. AP güç alır → kendi IP'sini DHCP'den alır
2. UDP broadcast 10001 ile controller arar (mDNS / inform message)
3. Controller cevap verir: "Ben controller'ım, bana adopt ol"
4. AP "set-inform" komutu ile controller'ın URL'sini kaydeder
5. Controller AP'ye config push eder → AP provisioning yapar
6. Tamamlanınca AP beyaz LED + "Connected" durumu

Bu akışta herhangi bir adımda kesinti → adoption fail.

## 5 Yaygın Sebep

### Sebep 1: "Managed by Other"
AP daha önce başka bir controller'a adopt edilmiş — o controller'ın IP'sini hâlâ hatırlıyor. Fabrika reset gerekli.

### Sebep 2: L3 Ağda Adoption
AP başka subnet'te (farklı VLAN, şube ofisi). Layer 2 broadcast bu subnet'e ulaşmıyor.

### Sebep 3: DNS / `unifi` Hostname
UniFi default olarak `unifi` hostname'ini çözmeye çalışır. DHCP option 43 veya DNS kaydı yoksa çözemez.

### Sebep 4: Controller Sürüm Uyumsuzluğu
Çok yeni AP + eski controller → controller cihazı tanımıyor, firmware yüklemeye çalışıyor ama fail.

### Sebep 5: Firewall / Port Bloğu
Controller ve AP arasında portlar bloklanmış:
- **TCP 8080** — Device management
- **TCP 8443** — Web UI (browser access için)
- **UDP 3478** — STUN
- **UDP 10001** — Device discovery
- **TCP 8880** — Captive Portal (ek)

## Adım Adım Çözüm

### Adım 1: AP LED Durumu

| LED | Anlam | Yapılacak |
|---|---|---|
| Mavi sabit | Fabrika ayar, adoption için hazır | Controller'dan adopt et |
| Mavi yanıp sönen | Upgrade firmware devam | Bekle |
| Turkuaz yanıp sönen | Adoption devam | Bekle (5 dk) |
| Turkuaz sabit | Adoption sorunu | Troubleshoot |
| Beyaz | Normal (başarılı) | Sorun yok |
| Kırmızı yanıp sönen | Bağlantı sorunu | Network check |
| Kapalı / LED yok | Güç veya donanım | PoE check |

### Adım 2: Factory Reset

**Fiziksel reset:**
- AP'nin küçük reset deliğini bul (alt veya arka)
- İğne ile 10+ saniye basılı tut
- LED kapanıp tekrar açılacak → mavi olmalı
- Süreç 30-60 saniye

**SSH ile (AP ağa bağlıysa ama controller'a ulaşmıyorsa):**
```bash
# Default credentials: ubnt / ubnt
ssh ubnt@<AP_IP>

# Reset komutu
set-default
```

AP restart olur, factory settings.

### Adım 3: Aynı L2 Subnet'te Mi?

AP ve controller aynı VLAN / subnet'te olmalı. Kontrol:

```bash
# Controller'da
ip addr | grep inet
# Örnek: 192.168.1.100

# AP'de SSH ile
ip addr | grep inet
# AP IP de 192.168.1.x olmalı (aynı subnet)
```

Aynı subnet'te değilse L3 adoption yapılandırma gerekli (Adım 5).

### Adım 4: DHCP Option 43 (Aynı L2'de, Farklı VLAN)

DHCP sunucusuna option 43 ekleyerek AP'ye controller IP'sini söylersin:

**Windows DHCP Server:**
```
DHCP Manager > Server Options > Configure Options > 
043 Vendor Specific Info

Hex değer: 01 04 <controller_ip_hex>
Örnek: Controller IP = 192.168.1.100 → 01 04 C0 A8 01 64
```

**pfSense / OPNsense:**
```
Services > DHCP > [interface] > Additional BOOTP/DHCP Options
Option 43, value: 01:04:C0:A8:01:64
```

**MikroTik RouterOS:**
```
/ip dhcp-server option add code=43 name=unifi value="'0x01040A020164'"
/ip dhcp-server network set [find] dhcp-option=unifi
```

### Adım 5: L3 Adoption (Farklı Subnet)

AP uzak şubede, farklı VLAN'da — L3 adoption yöntemleri:

**Yöntem A: DNS Kaydı**

İç DNS sunucusunda:
```
A record: unifi.corp.firma.com → 192.168.1.100 (controller IP)
```

AP default olarak `unifi` hostname'ini çözmeye çalışır. İç DNS'in suffix'i `corp.firma.com` ise `unifi` → `unifi.corp.firma.com` → controller IP.

**Yöntem B: SSH ile Manuel Inform**

```bash
ssh ubnt@<AP_IP>

# Set inform URL
set-inform http://<controller_IP>:8080/inform
```

Controller'da AP "Pending Adoption" olarak görünmeli. Approve et.

**İlk adoption sonrası bir kez daha:**
```bash
set-inform http://<controller_IP>:8080/inform
```

Bu ikinci komut adoption'ı kalıcı yapar.

### Adım 6: "Managed by Other" Durumu

Bu mesaj = AP başka controller'ı hatırlıyor. Factory reset + manual inform:

```bash
ssh ubnt@<AP_IP>
set-default
# AP restart olur
# Restart sonrası
ssh ubnt@<AP_IP>
set-inform http://<yeni_controller>:8080/inform
```

### Adım 7: Firewall Port Kontrolü

Controller ve AP arası portlar:

```bash
# Controller'da test
nc -zv <AP_IP> 22    # SSH
# AP'den test
nc -zv <controller_IP> 8080   # Inform
nc -zv <controller_IP> 8443   # Web UI
```

Bloklanmışsa firewall policy ekle. UniFi resmi liste:
https://help.ui.com/hc/en-us/articles/218506997

### Adım 8: Firmware Uyumsuzluğu

Controller versiyonuna bak:
```
Settings > Controller > Version
```

Yeni AP (örn. U7-Pro) eski controller (6.x) ile uyumsuz. Minimum controller versiyonu:
- Wi-Fi 6 AP'ler → Controller 6.5+
- Wi-Fi 6E (U7) → Controller 7.5+

Controller'ı güncelleyin.

### Adım 9: Yeniden Adoption — Forget Cihaz

Eski AP envanterinde "Forgotten" olarak kalmış olabilir:

```
UniFi Network App > Settings > System > Forget
```

Veya controller SSH:
```bash
# Controller database'inde AP kaydını sil
mongo --port 27117
use ace
db.device.remove({mac: "<AP_MAC_ADDRESS>"})
```

Sonra AP'yi factory reset → tekrar adoption.

## Önleyici Bakım

1. **L3 adoption stratejisi**: Çok şubeli kurulumlar için DNS kaydı önceden set. Yeni AP geldiğinde plug-and-play olsun.
2. **Controller yedekliliği**: UDM Pro veya Cloud Key Gen2 kullanıyorsanız backup otomatik. Self-hosted Controller için haftalık config export.
3. **Firmware policy**: Controller güncellemesi yapılmadan AP firmware update etmeyin. Uyumsuzluk doğurabilir.
4. **Network monitoring**: UniFi Network App'te uptime dashboard + Slack/email alarm aktif.
5. **Spare AP**: Critical alanlar (toplantı odası, yönetim katı) için yedek AP stokta.

## Sık Sorulan Sorular

### UniFi Cloud adoption (remote) nasıl?

UI.com Cloud hesabı ile controller'ı bağlarsan remote erişim + adoption olur. "unifi.ui.com" üzerinden yönetim.

### Eski Controller (5.x) — yeni AP adopt etmiyor

5.x çok eski. En az 6.x, tercihen 7.x veya 8.x'e güncelle. Self-hosted ise OS'u da güncel (Ubuntu 20.04+ veya Docker).

### Adoption sonra "Provisioning" takılıyor

AP firmware update'a takılıyor olabilir. SSH ile AP'ye:
```bash
upgrade <firmware_url>
```

Manuel firmware yükle. Firmware URL'si UI.com'dan.

### Site-to-site VPN üzerinden adoption çalışmıyor

L3 adoption (DNS veya SSH inform) şart. VPN UDP broadcast iletmez.

### MAC adresi görünüyor ama AP offline

DHCP IP alamıyor olabilir. Switch'te VLAN doğru mu? PoE+ güç (30W) yetmiyor mu? Event log incele.

---

**UniFi network deployment, multi-site Wi-Fi tasarımı ve yönetim için uzman destek?** Kozyatağı Bilişim olarak UniFi Enterprise deployment ve managed Wi-Fi hizmeti. [Teknik görüşme talep edin.](/#contact)
