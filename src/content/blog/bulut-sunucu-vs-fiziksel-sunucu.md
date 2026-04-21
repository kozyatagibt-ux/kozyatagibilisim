---
slug: "bulut-sunucu-vs-fiziksel-sunucu"
title: "Bulut Sunucu mu Fiziksel Sunucu mu? KOBİ'ler İçin Karar Rehberi"
type: "cluster"
pillar: 1
url: "/blog/bulut-sunucu-vs-fiziksel-sunucu"
hedef_anahtar_kelime: "bulut sunucu vs fiziksel sunucu"
meta_description: "Bulut sunucu mu fiziksel sunucu mu? Maliyet, performans, güvenlik ve ölçeklenebilirlik karşılaştırması. KOBİ'ler için karar matrisi ve 2026 fiyatları."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Sunucu Kararı Neden Bu Kadar Kritik?

Bir KOBİ'nin sunucu tercihi, sadece teknik bir karar değildir. Bu karar; aylık giderlerinizi, veri güvenliğinizi, çalışan verimliliğinizi ve büyüme kapasitenizi doğrudan etkiler.

İstanbul'da faaliyet gösteren 10-100 çalışanlı şirketlerin büyük çoğunluğu, bu iki seçenek arasında net bir analiz yapmadan karar veriyor. Sonuç: ya gereksiz yere pahalı bir fiziksel sunucu satın alınıyor, ya da ihtiyaca uygun olmayan bir bulut çözümüne abone olunuyor.

Bu rehberde iki seçeneği gerçekçi kriterlerle karşılaştıracak ve karar vermenizi kolaylaştıracak bir matris sunacağız.

## Fiziksel Sunucu Nedir?

Fiziksel sunucu, şirketinizin ofisinde veya bir veri merkezinde bulunan, elinizle dokunabileceğiniz gerçek bir bilgisayar donanımıdır. Genellikle rack kabin içinde yer alır ve kendi işlemcisi, RAM'i, diskleri ve ağ kartları vardır.

Yaygın kullanılan modeller:

- **HPE ProLiant DL380 Gen11**: Orta ve büyük ölçekli iş yükleri için
- **Dell PowerEdge R760**: Yüksek performans gerektiren uygulamalar için
- **Lenovo ThinkSystem SR650 V3**: Fiyat-performans dengesi arayanlar için

### Fiziksel Sunucu Maliyeti (2026)

| Kalem | Fiyat Aralığı |
|-------|--------------|
| Giriş seviye sunucu (1 CPU, 32 GB RAM, 2x1 TB SSD) | 120.000 - 180.000 TL |
| Orta seviye sunucu (2 CPU, 64 GB RAM, 4x1.2 TB SAS) | 250.000 - 400.000 TL |
| Rack kabin (12U-42U) | 15.000 - 45.000 TL |
| UPS (online, 3 kVA) | 35.000 - 60.000 TL |
| Windows Server 2022 lisansı | 40.000 - 80.000 TL |
| Kurulum ve konfigürasyon | 15.000 - 30.000 TL |
| **İlk yıl toplam** | **475.000 - 795.000 TL** |
| Yıllık bakım ve elektrik | 30.000 - 60.000 TL |

## Bulut Sunucu Nedir?

Bulut sunucu, fiziksel donanımı bir bulut sağlayıcısının veri merkezinde barındırılan ve internet üzerinden eriştiğiniz sanal bir sunucudur. Donanım satın almaz, kiralar gibi kullanırsınız.

Yaygın sağlayıcılar:

- **Microsoft Azure**: Türkiye'de veri merkezi olan, Microsoft ekosistemiyle uyumlu
- **Amazon Web Services (AWS)**: En geniş hizmet yelpazesi
- **Hetzner**: Avrupa merkezli, uygun fiyatlı VPS ve dedicated sunucular
- **Google Cloud Platform**: Veri analitiği ve yapay zeka projeleri için güçlü

### Bulut Sunucu Maliyeti (2026)

| Kalem | Aylık Fiyat |
|-------|------------|
| Azure B2s (2 vCPU, 4 GB RAM, 128 GB SSD) | ~2.500 TL |
| Azure D4s v5 (4 vCPU, 16 GB RAM, 256 GB SSD) | ~6.000 TL |
| Azure D8s v5 (8 vCPU, 32 GB RAM, 512 GB SSD) | ~12.000 TL |
| Hetzner CPX31 (4 vCPU, 8 GB RAM, 160 GB SSD) | ~1.800 TL |
| AWS t3.xlarge (4 vCPU, 16 GB RAM) | ~5.500 TL |
| Ek depolama (1 TB managed disk) | 800 - 2.000 TL/ay |
| Windows Server lisansı (bulutta) | Genelde dahil veya +%30 |

## Detaylı Karşılaştırma

### 1. Başlangıç Maliyeti

Fiziksel sunucu yüksek sermaye yatırımı gerektirir. 2026 itibarıyla orta seviye bir kurulumun toplam başlangıç maliyeti 300.000-500.000 TL arasındadır. Bulut sunucuda ise başlangıç maliyeti neredeyse sıfırdır -- sadece aylık kira ödersiniz.

### 2. Aylık İşletme Maliyeti

Fiziksel sunucu: Elektrik, soğutma, bakım, yedek parça -- aylık 2.500-5.000 TL arasında. Bulut sunucu: Seçtiğiniz konfigürasyona göre 2.500-15.000 TL arasında. Kullanım arttıkça maliyet de artar.

Dikkat edilmesi gereken nokta: Bulut sunucuda veri transferi ücretleri (egress) sürpriz maliyetlere yol açabilir. Azure'da aylık 100 GB üzeri çıkış trafiği ücretlendirilir.

### 3. Performans

| Performans Kriteri | Fiziksel Sunucu | Bulut Sunucu |
|-------------------|----------------|--------------|
| CPU performansı | Dedike, tahmin edilebilir | Paylaşımlı (noisy neighbor riski) |
| Disk I/O | NVMe SSD ile çok yüksek | SSD, ama ağ üzerinden erişim gecikmesi var |
| Ağ gecikmesi (ofis içi) | Sub-millisaniye | 5-50 ms (internet bağlantısına bağlı) |
| RAM kapasitesi | 128-512 GB kolayca | Maliyet hızla artar |

Yoğun veritabanı işlemleri, CAD/CAM uygulamaları veya ERP sistemleri çalıştıran şirketler için fiziksel sunucu performans avantajı sağlar. Ofis uygulamaları, e-posta ve dosya paylaşımı gibi standart iş yükleri için bulut yeterlidir.

### 4. Güvenlik

Her iki modelin de kendine özgü güvenlik avantajları vardır:

**Fiziksel sunucu güvenlik avantajları:**
- Veri fiziksel olarak sizin kontrolünüzde
- İnternet bağlantısı kesilse bile erişim mümkün
- [KVKK](/blog/kvkk-icin-nereden-baslamali) açısından verinin Türkiye'de kalması garantisi

**Bulut sunucu güvenlik avantajları:**
- Profesyonel veri merkezi güvenliği (fiziksel + siber)
- Otomatik yedekleme ve felaket kurtarma
- Düzenli güvenlik güncellemeleri
- DDoS koruması dahil

Her iki durumda da [siber güvenlik kontrol listesi](/blog/siber-guvenlik-kontrol-listesi) uygulanmalıdır.

### 5. Ölçeklenebilirlik

Fiziksel sunucu: RAM eklemek veya disk değiştirmek saatler-günler sürer, üst sınır donanım kapasitesiyle belirlenir. Yeni sunucu almak gerekirse tedarik süresi 2-6 hafta.

Bulut sunucu: Dakikalar içinde CPU, RAM, disk artırılabilir. Yeni sunucu birkaç dakikada devreye alınır. Mevsimsel iş yükü artışlarında geçici olarak kapasite artırılıp azaltılabilir.

### 6. Felaket Kurtarma

Bu konu Türkiye'deki şirketler için kritik. İstanbul deprem bölgesi -- ofisteki fiziksel sunucu hasar görürse tüm veriler kaybedilebilir.

Bulut sunucu burada büyük avantaj sağlar: Veriler coğrafi olarak dağıtık veri merkezlerinde tutulur. Azure'da İstanbul verisi otomatik olarak Ankara veya Amsterdam'a replike edilebilir.

Fiziksel sunucu kullananlar mutlaka [3-2-1 yedekleme kuralını](/blog/3-2-1-yedekleme-kurali) uygulamalı ve bulut tabanlı yedekleme çözümü de kullanmalıdır.

## Karar Matrisi

Aşağıdaki matrisi kendi durumunuza göre puanlayın (1-5 arası):

| Kriter | Ağırlık | Fiziksel Sunucu | Bulut Sunucu |
|--------|---------|----------------|--------------|
| Düşük başlangıç maliyeti | Yüksek | 1 | 5 |
| Düşük işletme maliyeti (5 yıl) | Orta | 4 | 3 |
| Yüksek performans | Değişken | 5 | 3 |
| Ölçeklenebilirlik | Yüksek | 2 | 5 |
| Felaket kurtarma | Yüksek | 2 | 5 |
| Veri kontrolü | Orta | 5 | 3 |
| Bakım kolaylığı | Orta | 2 | 5 |
| Uzaktan erişim | Yüksek | 3 | 5 |

## Hangi Şirket Hangisini Seçmeli?

### Bulut sunucu uygun olan şirketler:

- 50'den az çalışanı olan KOBİ'ler
- Ofis uygulamaları ve dosya paylaşımı ağırlıklı iş yükleri
- Uzaktan çalışma modeli uygulayan firmalar
- Hızlı büyüme hedefleyen şirketler
- IT personeli olmayan veya sınırlı olan işletmeler
- [Bulut geçişi](/blog/kobi-bulut-gecis-rehberi) planlayan firmalar

### Fiziksel sunucu uygun olan şirketler:

- Yoğun veritabanı ve ERP operasyonu olan firmalar
- Büyük boyutlu dosyalarla çalışan sektörler (mimarlık, mühendislik, medya)
- İnternet kesintisinin iş durmasına yol açtığı ortamlar
- Düzenleyici gereksinimlerle verinin şirket içinde kalması zorunlu olan işletmeler
- 100+ kullanıcılı, yüksek trafikli iç uygulamalar çalıştıran firmalar

### Hibrit Yaklaşım

Birçok KOBİ için en mantıklı çözüm hibrit modeldir:

- **Dosya sunucusu ve yerel uygulamalar** fiziksel sunucuda
- **E-posta, iş birliği araçları ve yedekleme** bulutta ([Microsoft 365](/blog/microsoft-365-vs-google-workspace-kurumsal) veya Google Workspace)
- **Felaket kurtarma replikasyonu** bulutta

Bu model, performans ve kontrol avantajlarını bulutun esnekliği ve güvenliğiyle birleştirir.

## 5 Yıllık Toplam Maliyet Karşılaştırması (Orta Ölçek)

| Yıl | Fiziksel Sunucu | Bulut Sunucu (Azure D4s) |
|-----|----------------|------------------------|
| 1. Yıl | 475.000 TL (alım + kurulum) | 72.000 TL |
| 2. Yıl | 45.000 TL (bakım) | 72.000 TL |
| 3. Yıl | 45.000 TL | 72.000 TL |
| 4. Yıl | 60.000 TL (garanti bitti, risk artar) | 72.000 TL |
| 5. Yıl | 60.000 TL + yenileme planı | 72.000 TL |
| **5 Yıl Toplam** | **~685.000 TL** | **~360.000 TL** |

Fiziksel sunucu 5 yıl sonunda yenilenmelidir -- bu ek 300.000-500.000 TL demektir. Bulutta ise aynı ücreti ödemeye devam edersiniz, ama donanım yenileme derdiniz olmaz.

## Sonuç

2026 itibarıyla Türkiye'deki KOBİ'lerin büyük çoğunluğu için bulut sunucu daha mantıklı bir tercihtir. Düşük başlangıç maliyeti, esneklik, felaket kurtarma avantajları ve bakım kolaylığı onu öne çıkarır.

Ancak bu genel bir kural -- her şirketin ihtiyaçları farklıdır. Yoğun performans gerektiren iş yükleri, düzenleyici zorunluluklar veya büyük veri hacimleri fiziksel sunucuyu gerekli kılabilir.

Doğru kararı vermek için mevcut altyapınızın ve iş yüklerinizin profesyonel bir değerlendirmesini yaptırmanızı öneriyoruz. Kozyatagı Bilişim olarak ücretsiz altyapı analizi sunuyor, şirketinize en uygun sunucu modelini birlikte belirliyoruz.
