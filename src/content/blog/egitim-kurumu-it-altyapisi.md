---
slug: "egitim-kurumu-it-altyapisi"
title: "Eğitim Kurumu IT Altyapısı: Sınıf Teknolojisi, LMS ve Güvenli Öğrenci Ağı"
type: "cluster"
pillar: 1
url: "/blog/egitim-kurumu-it-altyapisi"
hedef_anahtar_kelime: "eğitim kurumu IT altyapısı"
meta_description: "Okul, kurs ve eğitim merkezleri için IT altyapısı: bilgisayar laboratuvarı, LMS, içerik filtreleme, öğrenci WiFi, interaktif tahta kurulumu."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

# Eğitim Kurumu IT Altyapısı: Sınıf Teknolojisi, LMS ve Güvenli Öğrenci Ağı

Eğitim kurumlarının IT ihtiyaçları, standart bir ofisten çok farklıdır. Yüzlerce öğrencinin aynı anda internete bağlanması, bilgisayar laboratuvarlarının yönetimi, uygunsuz içerikten korunma zorunluluğu ve interaktif eğitim araçları — bunların hepsi özel bir planlama gerektirir.

Okul, kurs merkezi, dershane veya üniversite fark etmeksizin, eğitim kurumlarının IT altyapısını kurarken dikkat etmeniz gereken tüm bileşenleri bu rehberde ele alıyoruz.

## Bilgisayar Laboratuvarı Kurulumu

Bilgisayar laboratuvarı, eğitim kurumlarının en yoğun IT yatırımı gerektiren alanıdır. Doğru mimari seçimi hem başlangıç maliyetini hem de uzun vadeli bakım yükünü belirler.

### Thin Client mi, Tam PC mi?

Bu karar, bütçe ve kullanım senaryosuna göre şekillenir.

**Thin Client (İnce İstemci) Avantajları:**
- Merkezi yönetim kolaylığı — tüm yazılımlar sunucuda çalışır, istemci tarafında bakım gerekmez.
- Düşük enerji tüketimi — bir thin client 10-15 watt tüketirken standart PC 200 watt ve üzeri tüketir.
- Uzun ömür — hareketli parça olmadığı için 7-10 yıl sorunsuz kullanılabilir.
- Hırsızlık riski düşük — tek başına değersiz olduğundan çalınma riski minimumdur.

**Tam PC Tercih Edilmesi Gereken Durumlar:**
- Grafik tasarım, video düzenleme veya CAD yazılımı eğitimi veriliyorsa.
- Oyun geliştirme veya 3D modelleme dersleri varsa.
- GPU gücü gerektiren uygulamalar kullanılıyorsa.

Genel eğitim amaçlı laboratuvarlar (ofis uygulamaları, web araştırması, kodlama temelleri) için thin client çözümü çok daha ekonomik ve yönetilebilirdir. NComputing, Dell Wyse ve HP t-serisi yaygın tercih edilen thin client markalardır.

### Laboratuvar Düzeni

- **Masa yerleşimi:** Öğretmenin tüm ekranları görebileceği U veya sıralı düzen tercih edilmeli.
- **Kablolama:** Her masaya Cat6 ethernet ve en az 2 priz çekilmeli. WiFi'ye bağımlı laboratuvar çok risklidir.
- **Havalandırma:** 20-30 bilgisayarın ürettiği ısı ciddi boyutlara ulaşabilir. Klima kapasitesini IT yüküne göre hesaplayın.
- **Öğretmen kontrol yazılımı:** NetSupport School veya Veyon gibi yazılımlarla öğretmen tüm ekranları izleyebilir, ekran paylaşımı yapabilir ve öğrenci bilgisayarlarını kilitleyebilir.

## Öğrenme Yönetim Sistemi (LMS)

LMS, ders içeriklerinin paylaşılması, ödev takibi, sınav uygulaması ve öğrenci-öğretmen iletişiminin yönetildiği platformdur.

### Yaygın LMS Seçenekleri

- **Google Classroom:** Ücretsiz, kullanımı kolay, Google Workspace for Education ile entegre çalışır. Küçük ve orta ölçekli kurumlar için güçlü bir tercih.
- **Moodle:** Açık kaynaklı, tamamen özelleştirilebilir. Kendi sunucunuzda barındırabilirsiniz. Üniversiteler ve büyük eğitim kurumları tarafından yaygın olarak tercih edilir.
- **Microsoft Teams for Education:** Office 365 ekosistemiyle tam entegrasyon. Zaten Microsoft altyapısı kullanan kurumlar için mantıklı bir seçim.
- **Canvas:** Uluslararası okullar ve yükseköğretim kurumlarında popüler. Kullanıcı deneyimi güçlüdür ancak lisans maliyeti yüksektir.

### LMS Altyapı Gereksinimleri

Moodle gibi self-hosted bir LMS tercih ediyorsanız:

- En az 4 vCPU, 8 GB RAM sunucu (200 öğrenciye kadar)
- SSD disk — veritabanı performansı için kritik
- SSL sertifikası — HTTPS zorunlu
- Düzenli yedekleme — günlük otomatik yedek alınmalı
- CDN veya önbellekleme — video içerik yoğunsa Cloudflare veya benzeri CDN kullanılmalı

## İçerik Filtreleme ve Güvenli İnternet

Eğitim kurumlarında öğrencilerin uygunsuz içeriğe erişiminin engellenmesi hem yasal hem de etik bir zorunluluktur.

### Filtreleme Katmanları

Etkili bir içerik filtreleme sistemi tek bir katmandan oluşmaz, birden fazla düzeyde uygulanmalıdır:

1. **DNS filtreleme:** Tüm ağ trafiği güvenli DNS sunucuları üzerinden yönlendirilir. OpenDNS Family Shield veya CleanBrowsing gibi servisler ücretsiz temel koruma sunar.
2. **Firewall tabanlı URL filtreleme:** FortiGate, Sophos veya pfSense üzerinde kategori bazlı web filtreleme yapılır. Kumar, şiddet, yetişkin içerik, sosyal medya gibi kategoriler engellenebilir.
3. **SafeSearch zorunluluğu:** Google, Bing ve YouTube'da güvenli arama modunun ağ düzeyinde zorlanması. DNS ayarları veya firewall kurallarıyla bu sağlanabilir.
4. **HTTPS denetimi:** Günümüzde web trafiğinin büyük bölümü şifreli olduğundan, firewall üzerinde SSL/TLS inspection aktif edilmeli. Bu olmadan HTTPS sitelerdeki içerik filtrelenemez.

### Raporlama ve İzleme

Filtreleme sistemi sadece engellemekle kalmamalı, raporlama da sunmalıdır. Hangi kategorilere erişim denenmiş, hangi cihazlardan en çok engelleme tetiklenmiş gibi veriler yönetimin düzenli olarak incelemesi gereken raporlardır.

## Öğrenci WiFi Ağı

Eğitim kurumlarında WiFi ağı, belki de en zorlu IT bileşenidir. Yüzlerce cihazın aynı anda bağlanması, sınırlı bant genişliğinin adil paylaştırılması ve güvenlik gereksinimleri özel bir tasarım gerektirir.

### Ağ Ayrımı (Segmentasyon)

En az üç ayrı VLAN oluşturulmalıdır:

- **Yönetim ağı:** Muhasebe, idari birimler, öğretmen bilgisayarları. Tam internet erişimi.
- **Öğrenci ağı:** Sınırlı internet erişimi, içerik filtreleme aktif, bant genişliği limitli.
- **Misafir ağı:** Veli toplantıları veya etkinlikler için captive portal ile erişim.

### Bant Genişliği Yönetimi

- **Kullanıcı başına limit:** Her öğrenciye 2-3 Mbps sınır koyarak adil kullanım sağlanır.
- **Uygulama bazlı önceliklendirme:** LMS ve eğitim platformlarına yüksek öncelik, video streaming ve sosyal medyaya düşük öncelik verilmelidir (QoS).
- **Toplam hat kapasitesi:** 500 öğrencili bir kurumda minimum 200 Mbps simetrik fiber hat önerilir.

### Access Point Yoğunluğu

Sınıf başına bir access point ideal ölçüdür. Her AP'nin maksimum 30-35 cihaza hizmet vermesi planlanmalıdır. Ubiquiti UniFi, Aruba Instant On veya Cisco Meraki eğitim kurumları için yaygın tercih edilen WiFi çözümleridir.

WiFi güvenlik yapılandırması hakkında ayrıntılı bilgi için [WiFi güvenliği rehberimize](/blog/sirket-wifi-guvenligi) göz atabilirsiniz.

## İnteraktif Tahta ve Sınıf Teknolojisi

Geleneksel kara tahta ve projeksiyon sistemi yerini giderek interaktif tahtalara ve akıllı ekranlara bırakıyor.

### İnteraktif Tahta Seçenekleri

- **Dokunmatik interaktif ekranlar:** Samsung Flip, ViewSonic ViewBoard ve Promethean ActivPanel sektörde öne çıkan markalar. 65 inç ve 75 inç modeller standart sınıf boyutu için uygundur.
- **Projeksiyon + interaktif modül:** Mevcut projeksiyon sistemine Epson veya BenQ interaktif modül eklenerek tahta yüzeyi dokunmatik hale getirilebilir. Daha düşük bütçeli bir alternatif.
- **Kablosuz ekran paylaşımı:** Öğretmenin dizüstü bilgisayarından veya tabletinden tahtaya kablosuz görüntü aktarımı için ScreenBeam veya Airtame gibi çözümler kullanılır.

### Projeksiyon Sistemi

Hala projeksiyon tercih ediyorsanız:

- **Kısa atım (short-throw) projeksiyon:** Tahtaya yakın monte edilir, gölge sorunu yaşanmaz.
- **Lümen değeri:** Sınıf aydınlatmasına bağlı olarak minimum 3500-4000 lümen önerilir.
- **Lamba ömrü:** LED veya lazer ışık kaynağı olan modeller 20.000+ saat ömür sunar, lamba değişim maliyetini ortadan kaldırır.

## Sınav ve Değerlendirme Sistemleri

Dijital sınav uygulamaları kağıt tasarrufu sağlar ve sonuç analizini kolaylaştırır.

### Online Sınav Altyapısı

- **LMS üzerinden sınav:** Moodle ve Google Classroom yerleşik sınav modülleri sunar.
- **Kilitli tarayıcı (lockdown browser):** Sınav sırasında öğrencinin başka uygulamalara geçmesini engelleyen Safe Exam Browser (SEB) gibi yazılımlar kullanılabilir.
- **Optik form sistemi:** Büyük ölçekli sınavlarda hala optik form okuyucu tercih edilebilir. ABBYY veya yerli çözümler bu ihtiyacı karşılar.

### Sınav Sırasında Ağ Yükü

Yüzlerce öğrencinin aynı anda sınav açması ağda ani yük artışı yaratır. Bu senaryoya hazırlıklı olmak için:

- LMS sunucusu veya bulut planını sınav yükü için ölçeklendirin.
- Sınav zamanlarında video streaming ve güncellemelere bant genişliği kısıtlaması uygulayın.
- Yedek internet hattı bulundurun.

## Öğretmen Cihazları ve Yönetimi

### Dizüstü Bilgisayar Standardizasyonu

Tüm öğretmenlere aynı marka ve model cihaz verilmesi IT yönetimini büyük ölçüde kolaylaştırır. Windows ortamında Active Directory ile merkezi yönetim sağlanabilir. Active Directory yapılandırması hakkında detaylı bilgi için [Active Directory rehberimize](/blog/active-directory-kobi-rehberi) bakabilirsiniz.

### Ortak Yazıcı ve Tarayıcı

Öğretmen odasına çok fonksiyonlu (MFP) bir yazıcı konumlandırılmalıdır. Kartlı veya PIN kodlu baskı sistemi (pull printing) ile gereksiz baskıları azaltabilir ve baskı maliyetlerini kontrol altında tutabilirsiniz.

## Sunucu ve Yedekleme

### Yerel Sunucu İhtiyacı

- **Active Directory domain controller:** Merkezi kullanıcı ve cihaz yönetimi için.
- **Dosya sunucusu:** Öğretmenlerin ders materyallerini paylaştığı ortak alan.
- **Moodle sunucusu (self-hosted tercih ediliyorsa):** Ayrı bir sanal makine olarak çalıştırılabilir.

### Yedekleme Stratejisi

- Günlük otomatik yedek — LMS veritabanı, dosya sunucusu, Active Directory.
- Yedeklerin tesis dışında (offsite) saklanması — bulut yedekleme veya farklı bir lokasyondaki NAS.
- Dönemlik geri yükleme testi — yedeğin gerçekten çalıştığını doğrulayın.

## Güvenlik ve Erişim Kontrolü

### Fiziksel Güvenlik

- Sunucu dolabı kilitli olmalı.
- Bilgisayar laboratuvarına erişim kartlı giriş sistemiyle kontrol edilmeli.
- Switch ve patch panellere öğrenci erişimi engellenmelidir.

### Dijital Güvenlik

- Öğrenci hesapları sınırlı yetkiyle oluşturulmalı — yazılım yükleme, sistem ayarlarını değiştirme engellenmeli.
- USB port kontrolü — zararlı yazılım bulaşmasını önlemek için USB portları devre dışı bırakılabilir veya yalnızca belirli cihazlara izin verilebilir.
- Antivirüs — tüm bilgisayarlarda merkezi yönetimli antivirüs çözümü çalışmalı.

## Sonuç

Eğitim kurumlarının IT altyapısı, öğrenci güvenliğinden ders kalitesine, yönetim verimliliğinden maliyet kontrolüne kadar pek çok boyutu etkiler. Laboratuvar tasarımı, LMS seçimi, içerik filtreleme, WiFi planlaması ve sınıf teknolojisi bir bütün olarak ele alınmalıdır.

Her kurum kendi ölçeğine ve eğitim modeline uygun çözümleri seçerek, hem bugünün ihtiyaçlarını karşılayan hem de gelecek yıllara ölçeklenebilen bir IT altyapısı kurabilir.
