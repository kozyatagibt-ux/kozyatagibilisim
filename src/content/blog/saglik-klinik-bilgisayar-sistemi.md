---
slug: "saglik-klinik-bilgisayar-sistemi"
title: "Klinik ve Muayenehane IT Altyapısı: HBYS, Medula ve Hasta Veri Güvenliği"
type: "cluster"
pillar: 1
url: "/blog/saglik-klinik-bilgisayar-sistemi"
hedef_anahtar_kelime: "klinik bilgisayar sistemi"
meta_description: "Klinik ve muayenehane IT altyapısı nasıl kurulmalı? HBYS, Medula provizyon, tıbbi cihaz entegrasyonu ve hasta veri güvenliği rehberi."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Sağlık Sektöründe IT Altyapısı Neden Farklıdır?

Bir muayenehane veya poliklinik, sıradan bir ofisten çok farklı IT gereksinimlerine sahiptir. Sağlık sektöründe IT altyapısı hasta güvenliğiyle doğrudan ilişkilidir: Medula provizyon sistemi çalışmazsa hasta kabul edilemez, HBYS çökerse reçete yazılamaz, veri güvenliği ihlali yaşanırsa hem KVKK cezası hem de hastanın mahremiyeti tehlikeye girer.

Türkiye'de özel klinikler, poliklinikler, muayenehaneler ve tıp merkezleri 2026 itibarıyla tamamen dijital bir altyapıyla çalışmak zorundadır. E-reçete, e-nabız, Medula provizyon, HBYS entegrasyonu ve tıbbi cihaz bağlantıları hep stabil bir IT altyapısına bağlıdır.

Bu rehberde küçük ve orta ölçekli sağlık kuruluşlarının ihtiyaç duyduğu IT altyapısını, yazılım seçimlerini ve güvenlik gereksinimlerini ele alıyoruz.

## HBYS: Klinik IT Altyapısının Kalbi

HBYS (Hastane Bilgi Yönetim Sistemi), sağlık kuruluşunun tüm dijital süreçlerini yöneten yazılımdır: hasta kayıt, randevu, muayene, reçete, laboratuvar, görüntüleme, faturalandırma ve raporlama.

### Türkiye'deki Yaygın HBYS Yazılımları

- **Probel:** Türkiye'nin en yaygın HBYS sağlayıcılarından biri. Büyük hastanelerden küçük kliniklere kadar geniş ürün yelpazesi sunar.
- **Fonet:** Özellikle üniversite hastaneleri ve kamu hastanelerinde yaygın kullanılır. Özel sektör çözümleri de mevcuttur.
- **Akgün:** Orta ölçekli sağlık kuruluşlarına yönelik çözümler sunar.
- **Meddata:** Poliklinik ve muayenehane ölçeğinde kullanılabilen pratik bir HBYS çözümüdür.
- **AssistANS:** Küçük klinikler için bulut tabanlı alternatif.

### HBYS İçin IT Altyapı Gereksinimleri

- **Sunucu:** HBYS genellikle SQL Server veya PostgreSQL tabanlıdır. Minimum 32 GB RAM, SSD depolama ve yedekli disk yapısı (RAID) gerektirir.
- **Ağ hızı:** HBYS istemcileri ile sunucu arasında Gigabit bağlantı zorunludur. Muayene odalarına kablolu ağ çekilmelidir.
- **Yedekleme:** HBYS veritabanının en az günde iki kez yedeklenmesi gerekir. Sağlık verileri kaybı telafisi olmayan bir durumdur.
- **Kesintisiz çalışma:** UPS ve yedek internet hattı zorunludur. Hasta kabul sırasında sistem çökerse ciddi operasyonel aksaklık yaşanır.

## Medula Provizyon Sistemi

Medula, SGK (Sosyal Güvenlik Kurumu) ile sağlık kuruluşları arasındaki elektronik iletişim platformudur. Hasta provizyon alma, hizmet kayıt, fatura gönderme ve iade işlemleri Medula üzerinden yapılır.

### Medula Erişim Gereksinimleri

- **Stabil internet bağlantısı:** Medula bağlantısı koptuğunda provizyon alınamaz ve hasta kabulü durur. Fiber hat ve 4G yedek zorunludur.
- **Medula web servisleri:** HBYS yazılımınız Medula web servisleriyle entegre olmalıdır. Entegrasyon güncellemelerini takip etmek kritik önem taşır.
- **SSL sertifikaları:** Medula bağlantısı SSL üzerinden çalışır. Sertifika sorunları bağlantı hatalarına neden olur.
- **SGK tesis kodu ve kullanıcı bilgileri:** Yapılandırmanın doğru yapılmış olması gerekir.

### Yaygın Medula Sorunları

- "Provizyon alınamıyor" hatası (genellikle internet veya SSL kaynaklı)
- Hizmet kayıt reddedilmesi (SUT kodu uyumsuzluğu)
- Fatura iade oranının yüksek olması (veri girişi hataları)
- Medula güncellemesi sonrası HBYS uyumsuzluğu

Bu sorunların çoğu düzenli IT bakımı ve HBYS güncellemelerinin zamanında yapılmasıyla önlenebilir.

## Tıbbi Cihaz Entegrasyonu

Modern kliniklerde tıbbi cihazlar (laboratuvar analizörleri, röntgen cihazları, ultrason, EKG, odyometre vb.) HBYS ile entegre çalışır. Sonuçlar otomatik olarak hasta dosyasına aktarılır.

### Entegrasyon Türleri

- **HL7 entegrasyonu:** Sağlık sektörünün standart veri değişim protokolüdür. Laboratuvar cihazları genellikle HL7 üzerinden HBYS ile konuşur.
- **DICOM entegrasyonu:** Radyoloji görüntüleri (röntgen, MR, BT) DICOM formatında saklanır ve PACS (Picture Archiving and Communication System) üzerinden yönetilir.
- **Serial/USB bağlantı:** Bazı eski cihazlar seri port veya USB üzerinden veri gönderir. Bu cihazlar için ara yazılım gerekebilir.

### Entegrasyon İçin IT Altyapı Gereksinimleri

- Cihazlar için ayrılmış ağ segmenti (VLAN)
- Cihaz yazılımlarının güncel tutulması
- Entegrasyon sunucusu veya middleware
- Test ortamı (cihaz entegrasyonlarını canlı sistemde test etmemelisiniz)

## Hasta Veri Güvenliği ve KVKK

Sağlık verileri KVKK kapsamında "özel nitelikli kişisel veri" kategorisindedir. Bu, en yüksek koruma seviyesinin uygulanması gerektiği anlamına gelir. Sağlık verisi ihlali durumunda cezalar diğer sektörlere göre çok daha ağırdır.

### Zorunlu Teknik Tedbirler

- **Veri şifreleme:** Hasta verileri hem aktarım sırasında (TLS/SSL) hem de depolama ortamında (disk şifreleme) şifrelenmelidir.
- **Erişim kontrolü:** Her sağlık personeli yalnızca göreviyle ilgili verilere erişebilmelidir. Doktor tüm hasta verilerini görebilir, resepsiyon yalnızca randevu bilgilerini görebilir.
- **Loglama:** Kim, ne zaman, hangi hasta dosyasına erişti -- tüm bunların kaydı tutulmalıdır. KVKK denetiminde bu loglar istenir.
- **Fiziksel güvenlik:** Sunucu odasının kilitli olması, güvenlik kamerası ve erişim kartı sistemi gereklidir.
- **Veri imha:** Eski hasta kayıtlarının saklama süresi dolduğunda güvenli şekilde imha edilmesi gerekir. [KVKK uyumu için IT altyapısı](/blog/kvkk-uyumu-it-altyapisi) rehberimizde bu konuyu detaylıca ele alıyoruz.

### Sağlık Sektörüne Özel KVKK Gereksinimleri

- Hasta onam formlarının dijital ortamda saklanması
- Veri işleme envanterinin çıkarılması
- Veri koruma etki değerlendirmesi yapılması
- Sağlık personeline düzenli KVKK eğitimi verilmesi
- Veri ihlali müdahale planının hazırlanması

## E-Reçete ve E-Nabız Entegrasyonu

2026 itibarıyla tüm reçeteler elektronik olarak düzenlenmektedir. E-reçete sistemi ve e-nabız platformu HBYS ile entegre çalışmalıdır.

### E-Reçete Gereksinimleri

- HBYS'nin e-reçete modülünün aktif ve güncel olması
- Doktor e-imza sertifikasının geçerli olması
- İlaç veritabanının güncel tutulması
- SGK ilaç listeleriyle uyumlu SUT kodlarının tanımlanmış olması

### E-Nabız Entegrasyonu

- Hasta muayene bilgileri e-nabız'a otomatik aktarılmalıdır
- Entegrasyon API'lerinin güncel tutulması gerekir
- Veri formatı uyumluluğunun kontrol edilmesi önemlidir

## Ağ Altyapısı ve WiFi

Klinik ortamında ağ altyapısı özel dikkat gerektirir:

- **Kablolu ağ:** Muayene odaları, laboratuvar ve resepsiyon kesinlikle kablolu ağ üzerinden bağlanmalıdır. WiFi tıbbi cihaz entegrasyonunda güvenilir değildir.
- **WiFi:** Hasta bekleme alanı ve personel dinlenme alanı için ayrı WiFi ağları oluşturulmalıdır. [Sirket WiFi guvenligi](/blog/sirket-wifi-guvenligi) rehberimizde ağ segmentasyonunu detaylıca anlatıyoruz.
- **VLAN yapılandırması:** Tıbbi cihazlar, HBYS istemcileri, yönetim bilgisayarları ve misafir WiFi ayrı VLAN'larda olmalıdır.
- **Bant genişliği yönetimi:** HBYS ve Medula trafiğine öncelik verilmelidir (QoS yapılandırması).

## Yedekleme Stratejisi

Sağlık verileri için yedekleme stratejisi son derece kritiktir:

- **RPO (Recovery Point Objective):** Maksimum 1 saat veri kaybı kabul edilebilir. Yani en az saatlik yedekleme yapılmalıdır.
- **RTO (Recovery Time Objective):** Maksimum 2 saat içinde sistem tekrar çalışır durumda olmalıdır.
- **Yedekleme planı:** HBYS veritabanı saatlik, tam sistem yedeği günlük, PACS görüntüleri haftalık
- **Test:** Aylık yedek geri yükleme testi zorunludur
- Yedekleme stratejisi hakkında daha fazla bilgi için [3-2-1 yedekleme kuralı](/blog/3-2-1-yedekleme-kurali) rehberimize bakabilirsiniz

## Klinik IT Altyapısı Kontrol Listesi

- **Sunucu:** 32-64 GB RAM, RAID yapılı SSD, Windows Server
- **HBYS:** Medula, e-reçete, e-nabız entegrasyonlu
- **İnternet:** Fiber + 4G yedek, statik IP
- **Ağ:** Gigabit switch, VLAN yapılandırması, kurumsal WiFi
- **Güvenlik:** Firewall, antivirüs, disk şifreleme, erişim kontrolü
- **Yedekleme:** Saatlik veritabanı, günlük tam yedek, bulut kopya
- **UPS:** Sunucu, ağ cihazları ve kritik tıbbi cihazlar için
- **Tıbbi cihaz entegrasyonu:** HL7/DICOM yapılandırması
- **E-imza:** Her doktor için ayrı sertifika
- **KVKK:** Veri envanteri, erişim logları, ihlal müdahale planı

## Sonuç

Sağlık sektöründe IT altyapısı hasta güvenliği ve hizmet kalitesiyle doğrudan ilişkilidir. Medula'nın çökmesi hasta kabulünün durması, HBYS arızası reçete yazılamaması, veri ihlali ise hem cezai hem de mesleki sorumluluk anlamına gelir.

2026 yılında dijitalleşme baskısı artarken, kliniğinizin IT altyapısını profesyonel bir yaklaşımla yönetmek zorunluluktur. Mevcut altyapınızı değerlendirmek ve iyileştirme planı oluşturmak için **ucretsiz IT altyapı değerlendirmesi** hizmetimizden yararlanabilirsiniz. Sağlık sektörüne özel deneyimimizle kliniğinize uygun çözümler sunuyoruz.
