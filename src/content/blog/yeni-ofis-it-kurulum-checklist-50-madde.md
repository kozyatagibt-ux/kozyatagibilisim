---
slug: yeni-ofis-it-kurulum-checklist-50-madde
title: "Yeni Ofis IT Kurulum Rehberi — 50 Maddelik Komple Checklist"
type: cluster
pillar: 4
url: "/blog/yeni-ofis-it-kurulum-checklist-50-madde"
hedef_anahtar_kelime: "yeni ofis it kurulum rehberi"
meta_description: "20-100 kişilik yeni ofis için komple IT kurulum rehberi: elektrik, kablolama, switch, Wi-Fi, sunucu, güvenlik, M365, yazıcı. 50 madde + bütçe aralıkları."
kelime_sayisi: "~2800"
pillar_linki: "/hizmetler/network-altyapi"
---

## Giriş — "Yeni Ofise Taşınıyoruz, Nereden Başlayalım?"

Bu rehber, 20-100 kişilik bir şirketin yeni bir ofise taşınırken IT tarafında sıfırdan kurulum yapması için hazırlandı. Elektrik altyapısından son çalışanın laptop'una kadar **50 madde** + her bölümde bütçe aralığı + tedarikçi önerisi.

Ofis tesliminden **en az 8 hafta önce** başlanmalı. Son dakika telaşı = yanlış cihaz seçimi = yıllarca çekilen pişmanlık.

## Zaman Çizelgesi

| Hafta | Faz |
|---|---|
| -8 ila -6 | Planlama, ihtiyaç analizi, tedarikçi görüşmeleri |
| -6 ila -4 | Satın alma, kablolama başlangıcı, internet hattı başvuru |
| -4 ila -2 | Sunucu kurulum (test ortamında), M365 tenant kurulum |
| -2 ila 0 | Yerinde ekipman kurulum, kablolama test, Wi-Fi site survey |
| 0 (taşınma günü) | Endpoint dağıtımı, DNS switch, go-live |
| +1 ila +4 | Post-go-live troubleshooting, optimizasyon, dokümantasyon |

---

## Bölüm 1: Fiziksel Altyapı (Madde 1-10)

### ☐ 1. Elektrik Projesi Onayı

Ofis elektrik projesi kontrol edilmeli:
- Her iş istasyonunda **min 3 priz** (bilgisayar, monitor, şarj)
- Toplantı odalarında ayrıca **3 priz**
- Kesintisiz prizler (UPS besleme) sunucu odası ve kritik noktalarda
- Topraklama ölçümü yapılmış olmalı (< 5 Ohm ideal)

**Bütçe**: Dahildir genelde (binaya bağlı). Değilse 50 kullanıcılı ofis için ~30-50 bin TL ek elektrik işçilik.

### ☐ 2. Sunucu Odası Planlaması

Min 5-8 m², klima bağımsız split, sıcaklık 18-22°C, nem kontrolü. Ayrı elektrik devresi, ayrı UPS, ayrı jeneratör hattı.

- Klima **çift (redundant)** — biri bozulsa diğeri devreye girer
- Sıcaklık/nem sensörü alarm bağlantılı
- Kapıda kart okuyucu veya en azından kilit + kayıt

**Bütçe**: Sunucu odası kurulum (HVAC dahil): 80-150 bin TL.

### ☐ 3. Ana Dağıtım Kabini (MDF) Yeri

Ofisin **coğrafi merkezi**nde, hava akışı iyi bir nokta. Genelde kat ortasında mutfak/toilet yakınında olmaz — dikkat.

### ☐ 4. Yapısal Kablolama (Cat6A)

Her çalışanın masasına en az **2 RJ45 prizi** (bilgisayar + yedek). Cat6A standart. Minimum 10Gbps destekli, uzun ömürlü.

- Kablo uzunluğu 90 m'yi geçmemeli
- Kablo kanallarda kesintisiz, bükülmeden
- Her kablo **etiketli** (örn. "M12-04" = masa 12, port 4)
- **Fluke DSX test raporu** alınmalı — her kablo için ayrı

**Bütçe**: 50 kullanıcılı ofis ~80-120 bin TL (kablo + prize + işçilik).

### ☐ 5. Patch Panel ve Rack Kurulumu

Ana kabinde patch panel düzgün etiketlenmiş. Her kabloya 90° açı ile gelen, düzenli. **Cable management arm** kullan.

### ☐ 6. Wi-Fi Kapsama Analizi (Site Survey)

**Yaşanan en sık hata**: AP'leri "öyle tavana takalım" yaklaşımıyla yerleştirmek. Sonuç: 3 ay sonra ölü noktalar.

Profesyonel site survey:
- Ekahau Pro veya NetSpot ile
- Planlamalı: **1 AP / 25 kullanıcı** + toplantı odaları için ek AP'ler
- 2.4GHz + 5GHz + Wi-Fi 6E için 6GHz band
- PoE+ şart (30W)

**Bütçe**: Site survey ~8-15 bin TL. AP ve kabloluklu kablolama ~80-120 bin TL (50 kişi için 4-5 AP).

### ☐ 7. Toplantı Odalarında AV Altyapısı

- Toplantı odasında her masaya Ethernet + USB-C dock
- **Video konferans TV/monitor** — 55"+ 4K
- Kamera + mikrofon (Logitech Rally, Poly Studio, Yealink)
- HDMI/USB-C kablo uzunluğu
- Teams Rooms veya Zoom Rooms yazılımı

**Bütçe**: Toplantı odası başına ~40-80 bin TL.

### ☐ 8. UPS (Kesintisiz Güç)

Kritik nokta:
- **Sunucu odası UPS**: Minimum 15 dk, tercih edilen 30 dk autonomy (APC Smart-UPS 3000VA veya benzer)
- **Network kabini UPS**: 15 dk (1500VA yeterli)
- **SNMP kart** — uzaktan izleme

**Bütçe**: 25-50 bin TL (sunucu odası için).

### ☐ 9. Jeneratör (Opsiyonel — Kritik Ortam)

Sadece üretim, çağrı merkezi, 7/24 operasyon için. Binaya yoksa elektrik kesintilerinde UPS tükenince sunucular kapanır.

Maliyet yüksek (~200-400 bin TL) — alternative: **colocation** (sunucu bulutu/datacenter).

### ☐ 10. Yangın / Güvenlik Sistemleri

- Sunucu odasında **duman dedektörü** (ayrı panel)
- **Kart okuyucu** giriş (HID, Paxton, Salto)
- **IP kamera** ağı (NVR ayrı diskte)
- Hırsız alarmı bina sistemine entegre

**Bütçe**: 50-100 bin TL.

---

## Bölüm 2: İnternet ve Ağ (Madde 11-20)

### ☐ 11. Ana İnternet Hattı

Kurumsal fiber **fiber** (TurkNet, Superonline, Türk Telekom) — minimum 100 Mbps, ideal 500 Mbps. Sabit IP şart.

**Bütçe**: 500 Mbps fiber ~3-6 bin TL/ay.

### ☐ 12. Yedek İnternet Hattı (Failover)

Farklı bir ISP'den ikinci hat. Ana hat kesilince otomatik failover (BGP veya SD-WAN ile). Tipik: Ana = fiber, yedek = 4G/5G router veya başka ISP fiber.

**Bütçe**: Yedek hat ~1-2 bin TL/ay.

### ☐ 13. Firewall (NGFW)

50 kullanıcı için **FortiGate 100F** (veya Sophos XGS 2100) önerisi. IPS + AV + URL filtering + SSL inspection lisansları dahil.

[Fortinet vs Sophos vs Palo Alto karşılaştırması](/blog/fortinet-vs-sophos-vs-palo-alto-kobi-secimi)

**Bütçe**: Cihaz + 3 yıl lisans ~180-280 bin TL.

### ☐ 14. Core Switch

Kurumsal managed switch. 50 kullanıcı için 48 port Gigabit + 4 SFP+ 10Gbps uplink. 
- **UniFi USW-48-PoE** (ekonomik)
- **HPE Aruba 2930F** (orta)
- **Cisco Catalyst 9300** (premium)

**Bütçe**: 40-90 bin TL.

### ☐ 15. Edge Switch'ler (Kat/Bölge Bazlı)

Her kat veya departmana ek switch (24 port veya 48 port PoE+). Merkez switch'e 10Gbps fiber uplink.

### ☐ 16. Wi-Fi Access Point'leri (Adım 6'dan)

UniFi U6-Pro veya U7-Pro (Wi-Fi 6/6E). 4-5 AP, PoE+ besleme switch'ten.

### ☐ 17. VLAN Tasarımı

Minimum VLAN'lar:
- **VLAN 10**: Kullanıcı bilgisayarları
- **VLAN 20**: Sunucu ve DC
- **VLAN 30**: VoIP
- **VLAN 40**: Misafir Wi-Fi (internet-only, iç ağ erişimsiz)
- **VLAN 50**: IoT (kamera, yazıcı, IP hoparlör)
- **VLAN 60**: Management (switch/firewall admin interface)

### ☐ 18. IP Adresleme Planı

Örnek:
- 10.10.10.0/24 — Kullanıcı
- 10.10.20.0/24 — Sunucu
- 10.10.40.0/24 — Misafir
- vs.

Dökümante edilmeli, CMDB'ye girilmeli.

### ☐ 19. DNS İç Yapılandırması

İç DNS kayıtları + hostname eşleme:
- `dc01.corp.firma.com` → 10.10.20.10
- `nas.corp.firma.com` → 10.10.20.20
- `firewall.corp.firma.com` → 10.10.20.1

### ☐ 20. VPN Hazırlığı

Uzaktan çalışma için:
- FortiClient SSL-VPN veya IPsec VPN
- **MFA zorunlu** (FortiToken veya Microsoft Authenticator)
- Split-tunnel ayarı — kurumsal kaynak VPN üzerinden, internet direct

---

## Bölüm 3: Sunucular ve Depolama (Madde 21-28)

### ☐ 21. Sunucu Sayısı ve Rolleri

50 kişilik standart ofis için:
- **1 sunucu**: Hyper-V host (içinde AD, File, App VM'leri)
- **1 NAS**: Dosya + yedek
- Opsiyonel 2. sunucu: HA için ikinci Hyper-V host

[Sunucu boyutlandırma hesaplayıcısı](/sunucu-boyutlandirma-hesaplayici)

### ☐ 22. Sunucu Donanımı

Dell PowerEdge R350 veya HPE ProLiant DL325 (1U/2U rack):
- **2 x Xeon / EPYC** CPU (16-32 core)
- **128-256 GB RAM** DDR5 ECC
- **2 x 480GB SSD RAID1** (OS)
- **6 x 2TB SAS SSD RAID10** (Data)
- **iDRAC Enterprise** / iLO Advanced
- **5 yıl 4 saat yanıt garantisi**

**Bütçe**: 250-500 bin TL.

### ☐ 23. Windows Server Lisansları

Windows Server 2022 Standard (16 core base) + CAL:
- Sunucu lisansı: ~35-50 bin TL
- Kullanıcı CAL: ~600-800 TL / kullanıcı

### ☐ 24. Active Directory Kurulumu

- 2 Domain Controller (fiziksel sunucuda VM olarak)
- OU yapısı departman bazlı
- Standart GPO\'lar: USB kısıtlama, ekran kilidi, şifre politikası, BitLocker
- LAPS (local admin password solution) aktif

### ☐ 25. File Server / NAS

Synology RS1221+ veya QNAP TS-873A (8-bay):
- 8 x 8TB Enterprise HDD + 2 x SSD cache
- SHR-2 veya RAID 6
- 10GbE network

**Bütçe**: 70-150 bin TL.

### ☐ 26. Yedekleme Yazılımı

Veeam Backup & Replication Enterprise:
- Lisans ~50-100 bin TL/yıl
- Hedef: ikinci NAS + bulut (Azure Blob, Wasabi, Backblaze)

### ☐ 27. Hypervisor

Sunucu üzerine Hyper-V (Windows Server dahil) veya VMware vSphere. Proxmox VE alternatif.

### ☐ 28. Sunucu Odası Rack Doluluğu

42U rack içinde:
- 2 sunucu (2U her biri = 4U)
- NAS (2U)
- Core switch (1U)
- Firewall (1U)
- UPS (2U)
- KVM (1U)
- Toplam ~12-15U kullanılmış, geri kalanı büyüme için

---

## Bölüm 4: Endpoint ve Kullanıcı (Madde 29-40)

### ☐ 29. Laptop / Masaüstü Standardı

Kurumsal cihaz seçimi:
- **Ofis çalışanı**: Dell Latitude 5540, HP ProBook 450, Lenovo ThinkPad E14 (~30-40 bin TL)
- **Yönetici/tasarım**: Dell Latitude 7440, HP EliteBook, Lenovo ThinkPad T14 (~50-70 bin TL)
- **Yaratıcı (CAD, video)**: Dell Precision, HP ZBook, Lenovo P-serisi (~80-150 bin TL)

Tek marka stratejisi önerilir — driver yönetimi + destek sözleşmesi tek kanaldan.

### ☐ 30. İşletim Sistemi

Windows 11 Pro for Business (veya Enterprise E3/E5 ile). macOS ise iş ayarlarına göre.

### ☐ 31. Microsoft 365 / Google Workspace

M365 Business Premium (MFA + Intune + Defender dahil):
- ~410 TL/kullanıcı/ay
- [M365 vs Google Workspace karşılaştırması](/blog/microsoft-365-vs-google-workspace-kurumsal)

### ☐ 32. Monitör ve Aksesuar

- Masabaşı: **24-27" 1920x1080** veya **27" 2560x1440**
- Yönetici: **Çift 27" 2K** veya **34" ultrawide**
- USB-C dock (Dell WD19S, HP USB-C G5)
- Mekanik klavye + ergonomik mouse

**Bütçe**: Kullanıcı başı ~15-25 bin TL (monitor + aksesuar).

### ☐ 33. Yazıcı (Kurumsal)

Aylık hacim ve tip önemli:
- **50-100 kişi, orta hacim**: Konica Minolta bizhub C300i, Canon imageRUNNER, Xerox AltaLink
- A3 renkli multifonksiyonel (print, scan, fotokopi)
- Kart okuyucu + follow-me print

**Bütçe**: ~200-400 bin TL (veya leasing aylık ~8-15 bin).

### ☐ 34. IP Telefon Sistemi

- **3CX** (PBX, ücretsiz 25 user)
- **Microsoft Teams Phone** (M365 ile entegre)
- **Asterisk / FreePBX** (self-hosted)

Her masaya IP telefon (Yealink, Poly) veya headset.

**Bütçe**: Kullanıcı başına ~2-4 bin TL donanım.

### ☐ 35. Antivirus / EDR

- **Microsoft Defender for Business** (M365 Business Premium'da dahil)
- **CrowdStrike Falcon Go** (~100 TL/kullanıcı/ay)
- **SentinelOne** (benzer)

### ☐ 36. Mobile Device Management (MDM)

Intune (M365'te) veya Jamf (Mac için). Laptop'lar otomatik enroll, politika dağıtımı.

### ☐ 37. Password Manager

Bitwarden Business (~50 TL/kullanıcı/ay). Tüm şirket şifreleri merkezi kasada.

### ☐ 38. Video Konferans Donanımı

Logitech C920/C930 webcam (masa başı). Logitech BRIO veya daha pahalı modeller yönetici için.

Headset: Jabra Evolve 40, Poly Voyager — kulak üstü, noise cancelling.

### ☐ 39. Adobe / Office / Uzmanlaşmış Yazılımlar

- Adobe Creative Cloud Teams (tasarım için)
- AutoCAD, SolidWorks (mühendislik)
- Logo/Mikro/Netsis ERP

### ☐ 40. IT Destek Portalı

- **Freshservice** (ticketing + CMDB + knowledge base)
- **Zendesk**
- **Jira Service Management**

---

## Bölüm 5: Güvenlik ve Uyum (Madde 41-45)

### ☐ 41. KVKK Uyumu

[KVKK öz-denetim aracı](/kvkk-oz-denetim) ile eksiklikleri görün. Temel:
- VERBİS kaydı
- Aydınlatma metni
- Veri envanteri
- İşleyen/İşleten sözleşmeleri

### ☐ 42. Siber Sigorta

Kurumsal cyber insurance:
- **Turklahd, Allianz, Ergo, Sompo** Türkiye'de yaygın
- Poliçe 3-10 milyon TL kapasiteli (kurumsal boyutuna göre)
- Prim yıllık ~30-120 bin TL

### ☐ 43. Backup Test Prosedürü

Haftalık otomatik restore test (sandbox). Aylık tam test raporu.

### ☐ 44. Incident Response Runbook

10-15 sayfalık yazılı prosedür. Senaryolar:
- Ransomware
- Şifreleme kaybı
- Sunucu arızası
- Veri sızıntısı
- Elektrik kesintisi > 2 saat

### ☐ 45. IT Altyapı Dokümantasyonu

CMDB + network diyagramı + rack layout + credentials (password manager'da) + lisans envanteri.

---

## Bölüm 6: Operasyonel (Madde 46-50)

### ☐ 46. IT Destek Sözleşmesi

Kendi personel mi, MSP mi, hibrit mi? [MSP vs bordrolu karar rehberi](/blog/msp-vs-kendi-it-personeli-tco-analizi)

### ☐ 47. Monitoring Kurulumu

- **PRTG** veya **Zabbix** (network, sunucu, NAS izleme)
- **UptimeRobot** (web servisler)
- Alarm kanalları: e-mail + Slack + SMS

### ☐ 48. Patching Politikası

- **Windows Update**: WSUS veya Intune onayıyla ayda bir
- **Firewall firmware**: çeyreklik, test sonrası
- **Sunucu BIOS/iLO**: yıllık
- **Uygulama yazılımları**: üretici release notes takip

### ☐ 49. Kullanıcı Eğitimi

- İlk hafta onboarding (IT araçları, güvenlik temelleri)
- Aylık phishing simülasyonu (KnowBe4, Hoxhunt)
- Yıllık güvenlik farkındalık eğitimi

### ☐ 50. Go-Live Günü

Taşınma günü checklist:
- [ ] Tüm kablolama test raporu onaylandı
- [ ] DHCP aktif, DNS çalışıyor
- [ ] Firewall politikaları uygulandı
- [ ] AD kullanıcı hesapları hazır
- [ ] M365 tenant + mail akışı aktif
- [ ] Printer ağda, driver'lar dağıtıldı
- [ ] Tüm kullanıcı laptop'ları hazır, domain'e joined
- [ ] VPN test edildi
- [ ] Yedekleme ilk testi yapıldı
- [ ] Monitoring alarm aktif
- [ ] IT helpdesk numarası duyuruldu
- [ ] İlk gün için 2 IT uzmanı sahada

---

## Toplam Bütçe Özeti (50 Kişi, Orta Segment)

| Kategori | Aralık (TL) |
|---|---|
| Kablolama + Wi-Fi | 150-250 bin |
| Firewall + Switch + AP | 250-400 bin |
| Sunucu + NAS + Backup | 400-700 bin |
| Lisans (Windows Server, SQL, M365) | 300-500 bin/yıl |
| Laptop + Monitor + Aksesuar | 1.5-2.5 milyon (50 × 30-50 bin) |
| Yazıcı + AV + Toplantı | 300-500 bin |
| UPS + Elektrik + Güvenlik | 100-200 bin |
| Danışmanlık + Kurulum | 100-250 bin |
| **Toplam ilk yıl yatırım** | **~3-5 milyon TL** |
| **Yıllık işletme (lisans + MSP + güncellemeler)** | **~1-1.5 milyon TL** |

---

## Sık Sorulan Sorular

### Tüm bu altyapıyı buluta taşısak?

50-150 kişilik ofis için **hibrit** yaklaşım genelde en ekonomik. Lokal: dosya sunucusu, AD, DHCP. Bulut: mail, Office, CRM, e-ticaret.

### Kurulum kaç hafta sürer?

Projelendirme + tedarik + kurulum: 8-12 hafta tipik. Acil durumlarda 4-6 hafta mümkün ama kaliteden ödün verir.

### Eski ofisten ne taşıyabiliriz?

- Kullanıcı laptop'ları: evet
- Sunucular: 4 yaşına kadar, sonra yenilenmeli
- Network cihazları (switch, AP): eski kurumsal seviyede değilse yeni
- Kablolama: **asla** — yeni ofiste baştan

### MSP ile kurulum mu, kendimiz mi?

Tek seferlik kurulum için MSP kesinlikle önerilir. 50+ kişilik proje deneyimi olmayan in-house ekip 2 katı sürede ve yanlış çözümlerle tamamlar.

---

**Yeni ofis IT kurulumunda uçtan uca projelendirme ve yürütme desteği?** Kozyatağı Bilişim olarak planlama + satın alma + kurulum + eğitim + go-live süreçlerinde yanınızdayız. [Ücretsiz keşif görüşmesi.](/#contact)
