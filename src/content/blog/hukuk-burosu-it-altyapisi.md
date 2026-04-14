---
slug: "hukuk-burosu-it-altyapisi"
title: "Hukuk Bürosu IT Altyapısı: UYAP, SEGBİS ve Veri Güvenliği Rehberi"
type: "cluster"
pillar: 1
url: "/blog/hukuk-burosu-it-altyapisi"
hedef_anahtar_kelime: "hukuk bürosu IT altyapısı"
meta_description: "Hukuk bürosu IT altyapısı nasıl kurulmalı? UYAP, SEGBİS, e-imza, doküman yönetimi ve müvekkil veri güvenliği için kapsamlı rehber."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Hukuk Büroları Neden Özel Bir IT Altyapısına İhtiyaç Duyar?

Hukuk büroları, Türkiye'nin en kritik IT bağımlılığına sahip meslek gruplarından biridir. UYAP (Ulusal Yargı Ağı Projesi) üzerinden dava takibi, SEGBİS ile duruşmaya katılım, e-tebligat kontrolü, e-imza ile belge onaylama ve müvekkil dosyalarının güvenli saklanması -- tüm bunlar sağlam bir IT altyapısı gerektirir.

Bir avukatın UYAP'a erişememesi, duruşma günü SEGBİS bağlantısının kopması veya müvekkil dosyalarının şifrelenmesi sadece teknik bir aksaklık değil, mesleki sorumluluk ihlalidir. Süre kaçar, dava kaybedilir, müvekkil mağdur olur.

Bu rehberde hukuk bürolarının ihtiyaç duyduğu IT altyapısını tüm bileşenleriyle ele alıyoruz: donanımdan yazılıma, güvenlikten yedeklemeye kadar.

## UYAP Erişimi İçin Gereken Teknik Altyapı

UYAP, Adalet Bakanlığı'nın tüm yargı süreçlerinin dijital olarak yönetildiği platformdur. Avukatlar UYAP Avukat Portal veya UYAP SMS bilgilendirme sistemi üzerinden dava takibi yapar, dilekçe gönderir, duruşma tarihlerini kontrol eder.

### UYAP Erişim Gereksinimleri

- **E-imza veya mobil imza:** UYAP'a giriş e-imza kartı (akıllı kart) veya mobil imza ile yapılır. E-imza için kart okuyucu gereklidir.
- **Java Runtime Environment:** UYAP bazı modüllerde Java gerektirir. Doğru versiyonun yüklü olması ve güncel tutulması kritiktir.
- **Tarayıcı uyumluluğu:** UYAP belirli tarayıcı sürümleriyle uyumludur. Chrome ve Edge genellikle desteklenir ancak sürüm güncellemeleri zaman zaman uyumsuzluk yaratır.
- **Kart okuyucu sürücüleri:** E-imza kartı okuyucularının (Gemalto, ACS, Bit4id gibi markalar) sürücülerinin doğru yüklenmiş olması gerekir.
- **Stabil internet bağlantısı:** UYAP bağlantı koptuğunda işlem yarıda kalır ve tekrar başlamak gerekebilir.

### Sık Yaşanan UYAP Sorunları

- Kart okuyucu tanınmıyor (sürücü veya USB portu sorunu)
- "UYAP'a bağlanılamıyor" hatası (DNS veya güvenlik duvarı kaynaklı)
- Dilekçe yüklenemiyor (dosya boyutu veya format uyumsuzluğu)
- Java güvenlik uyarıları nedeniyle işlem tamamlanamıyor

Bu sorunların çözümü için UYAP erişimi yapacak bilgisayarların standart bir yapılandırmayla kurulması ve düzenli bakımının yapılması gerekir.

## SEGBİS Kurulumu ve Gereksinimleri

SEGBİS (Ses ve Görüntü Bilişim Sistemi), duruşmalara uzaktan video konferans yoluyla katılmayı sağlayan Adalet Bakanlığı sistemidir. 2026 itibarıyla SEGBİS kullanımı yaygınlaşmaya devam etmektedir.

### SEGBİS İçin Gereken Donanım

- **HD webcam:** Minimum 720p, tercihen 1080p çözünürlük. Dahili laptop kamerası genellikle yeterli kalitede değildir.
- **Harici mikrofon veya kulaklık:** Yankı ve gürültü önleme özellikli. Açık mikrofon kullanımı SEGBİS'te sorun yaratır.
- **Yeterli internet hızı:** Minimum 5 Mbps yükleme hızı. Fiber bağlantı şiddetle önerilir.
- **Aydınlatma:** Yüzün net görünmesi yasal zorunluluktur. Arka ışık kullanımından kaçınılmalıdır.
- **Sessiz ortam:** Arka plan gürültüsü tutanağa geçebilir.

### SEGBİS Bağlantı Sorunları

Duruşma anında bağlantı kopması ciddi sonuçlara yol açabilir. Bunu önlemek için:

- Yedek internet hattı (4G/5G) hazır bulundurun
- SEGBİS öncesinde test bağlantısı yapın
- Bilgisayarın yalnızca SEGBİS için kullanılmasını sağlayın (arka plan programlarını kapatın)
- Ethernet kablosu kullanın, WiFi'den kaçının

## Doküman Yönetim Sistemi (DMS)

Hukuk büroları devasa miktarda belge üretir ve saklar: dilekçeler, sözleşmeler, bilirkişi raporları, mahkeme kararları, müvekkil yazışmaları. Bu belgelerin düzenli, aranabilir ve güvenli bir şekilde saklanması zorunludur.

### DMS Seçenekleri

- **Yerel sunucu tabanlı:** Ofis içinde bir sunucuda yapılandırılmış klasör sistemi. SharePoint veya Nextcloud gibi çözümler kullanılabilir.
- **Bulut tabanlı:** Google Workspace veya Microsoft 365 üzerinde bulut depolama. Erişim kolaylığı sağlar ancak veri lokasyonu KVKK açısından değerlendirilmelidir.
- **Hukuk sektörüne özel DMS:** CaseMap, Clio, LegalManager gibi yazılımlar dosya takibi, süre yönetimi ve timesheet entegrasyonu sunar.

### DMS İçin Temel İlkeler

- Dosya isimlendirme standardı belirleyin (tarih-dava_no-belge_tipi formatı gibi)
- Versiyonlama aktif olsun (aynı belgenin farklı versiyonları takip edilebilmeli)
- Arama fonksiyonu kullanılabilir olsun (OCR ile taranmış belgeler de aranabilmeli)
- Erişim yetkilendirmesi yapın (her avukat sadece kendi dosyalarına erişmeli)

## Müvekkil Veri Güvenliği ve KVKK Uyumu

Hukuk büroları KVKK kapsamında veri sorumlusu veya veri işleyendir. Müvekkil bilgileri -- kimlik, adres, sağlık durumu, sabıka kaydı, mali bilgiler -- özel nitelikli kişisel veri kategorisindedir ve en yüksek düzeyde korunması zorunludur.

### Teknik Güvenlik Tedbirleri

- **Disk şifreleme:** Tüm bilgisayarlarda BitLocker (Windows) veya FileVault (Mac) aktif olmalıdır. Laptop çalınsa bile veriye erişilemez.
- **Güçlü parola politikası:** Minimum 12 karakter, karmaşık parola zorunluluğu. Active Directory ile merkezi yönetim ideal çözümdür. [Active Directory KOBİ rehberi](/blog/active-directory-kobi-rehberi) yazımızda detayları bulabilirsiniz.
- **İki faktörlü kimlik doğrulama:** UYAP dışındaki tüm sistemlerde (e-posta, bulut depolama, DMS) iki faktörlü doğrulama aktif edilmelidir.
- **E-posta güvenliği:** Avukat-müvekkil yazışmaları şifreli olmalıdır. S/MIME veya PGP kullanımı önerilir. [SPF, DKIM, DMARC rehberimizi](/blog/spf-dkim-dmarc-rehberi) incelemenizi tavsiye ederiz.
- **Güvenlik duvarı:** Ofis ağına dışarıdan erişimi kontrol eden profesyonel bir firewall kurulmalıdır.
- **VPN:** Dışarıdan ofis ağına erişim yalnızca VPN üzerinden yapılmalıdır. Evden çalışan avukatlar için bu zorunludur.

### KVKK Spesifik Gereksinimler

- Kişisel veri envanteri çıkarılmalıdır
- Veri işleme faaliyetleri kayıt altına alınmalıdır
- Veri ihlali durumunda 72 saat içinde bildirim yapılması zorunludur
- Eski müvekkil dosyaları saklama süresi dolduğunda güvenli şekilde imha edilmelidir
- [KVKK uyumu için IT altyapısı](/blog/kvkk-uyumu-it-altyapisi) rehberimizde tüm teknik tedbirleri detaylıca anlatıyoruz

## E-imza ve Mobil İmza Yönetimi

Hukuk bürolarında e-imza günlük hayatın parçasıdır. UYAP işlemleri, e-tebligat, KEP (Kayıtlı Elektronik Posta) ve resmi belge onayları e-imza gerektirir.

### E-imza Yönetimi İçin Öneriler

- Her avukat için ayrı e-imza sertifikası edinin
- Sertifika bitiş tarihlerini merkezi bir takvimde takip edin (genellikle 1-3 yıllık süreler)
- Yedek kart okuyucu bulundurun (arızalanma durumunda)
- Mobil imza alternatif olarak aktif tutun (kart okuyucu sorunu yaşandığında kullanılabilir)
- E-imza kartlarını güvenli saklayın, masaüstünde bırakmayın

## Timesheet ve İş Takip Yazılımı

Hukuk bürolarında zaman takibi hem verimlilik hem de faturalandırma açısından kritiktir. Saatlik ücret bazında çalışan bürolarda timesheet kaydı gelir kaybını önler.

### Önerilen Çözümler

- **Clio:** Uluslararası standart, bulut tabanlı, Türkçe desteği sınırlı
- **PracticePanther:** Benzer özellikler, mobil uygulama desteği güçlü
- **Yerel çözümler:** Excel tabanlı takipten öte, Access veya basit web uygulamalarıyla özelleştirilmiş çözümler
- **Microsoft 365 entegrasyonu:** Outlook takvim ve Teams entegrasyonuyla randevu ve görev takibi

## Hukuk Bürosu İçin Önerilen IT Altyapı Mimarisi

Orta ölçekli bir hukuk bürosu (5-15 avukat) için ideal IT altyapısı:

- **Sunucu:** Windows Server, Active Directory, dosya paylaşımı ve yedekleme
- **İnternet:** Fiber + 4G yedek, statik IP
- **Ağ:** Gigabit switch, kurumsal erişim noktası, misafir WiFi ayrımı
- **Güvenlik:** Profesyonel firewall, kurumsal antivirüs, disk şifreleme
- **Yedekleme:** Yerel NAS + bulut yedek, günlük otomatik yedekleme
- **Yazıcı/tarayıcı:** Ağ bağlantılı çok fonksiyonlu cihaz, hızlı tarayıcı
- **UPS:** Sunucu ve ağ cihazları için kesintisiz güç kaynağı
- **SEGBİS seti:** HD kamera, harici mikrofon, ayrılmış bilgisayar
- **E-imza:** Kart okuyucu, yedek kart okuyucu, mobil imza aktivasyonu

## Sonuç

Hukuk büroları için IT altyapısı bir maliyet kalemi değil, mesleki güvence aracıdır. UYAP erişiminin kopması bir duruşmanın kaçırılmasına, veri güvenliği eksikliği KVKK cezasına ve mesleki sorumluluk davasına yol açabilir.

2026 yılında dijitalleşme hızla ilerlerken, büronuzun IT altyapısının bu dönüşüme hazır olması gerekiyor. Mevcut durumunuzu değerlendirmek için **ucretsiz IT altyapı değerlendirmesi** hizmetimizden faydalanabilirsiniz. Büronuzun özel ihtiyaçlarına uygun bir altyapı planı oluşturuyoruz.
