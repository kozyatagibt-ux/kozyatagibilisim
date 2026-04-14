---
slug: "restoran-pos-sistemi-rehberi"
title: "Restoran ve Kafe IT Altyapısı: POS, Adisyon, Misafir WiFi Kurulumu"
type: "cluster"
pillar: 1
url: "/blog/restoran-pos-sistemi-rehberi"
hedef_anahtar_kelime: "restoran POS sistemi kurulumu"
meta_description: "Restoran ve kafe IT altyapısı rehberi: POS terminal seçimi, adisyon yazılımı, yazar kasa entegrasyonu, misafir WiFi, güvenlik kamerası kurulumu."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

# Restoran ve Kafe IT Altyapısı: POS, Adisyon, Misafir WiFi Kurulumu

Yeme-içme sektöründe rekabetin artmasıyla birlikte restoran ve kafelerin IT altyapısı artık lüks değil, operasyonel bir zorunluluk haline geldi. Sipariş karışıklıkları, yazar kasa uyumsuzlukları, yavaş WiFi nedeniyle kötü müşteri deneyimi ve güvenlik açıkları — bunların hepsi doğru kurgulanmış bir IT altyapısıyla çözülebilir.

Bu rehberde, bir restoran veya kafeyi sıfırdan kurarken ya da mevcut sistemi modernize ederken dikkat etmeniz gereken tüm IT bileşenlerini ele alıyoruz.

## POS Terminal Seçimi: İşletmenize Uygun Sistemi Belirleyin

POS (Point of Sale) sistemi, yeme-içme işletmesinin kalbidir. Sipariş almaktan stok takibine, personel yönetiminden raporlamaya kadar her şey bu sistemden geçer.

### Bulut Tabanlı mı, Yerelde mi?

Günümüzde bulut tabanlı POS sistemleri belirgin şekilde öne çıkıyor. İnternet bağlantınız kesilse bile çalışmaya devam eden ve bağlantı geldiğinde senkronize olan sistemler tercih edilmeli. Türkiye pazarında öne çıkan çözümler:

- **Adisyo:** Türkiye'de yaygın kullanılan bulut tabanlı POS. Tablet üzerinden çalışır, mutfak yazıcısı entegrasyonu güçlüdür. Küçük ve orta ölçekli kafeler için ideal.
- **Pos Entegratör:** Özellikle çok şubeli restoran zincirleri için merkezi yönetim sunar. Stok ve maliyet analizi modülleri gelişmiştir.
- **İKAS:** E-ticaret entegrasyonuyla birlikte çalışan POS çözümü. Hem fiziksel mağaza hem online sipariş alan işletmeler için avantajlı.
- **Akinon, Quipu, Tıkla Gelsin entegrasyonları:** Paket servis yapan işletmeler bu entegrasyonları destekleyen bir POS aramalı.

### Donanım Seçimi

POS donanımında dikkat edilmesi gerekenler:

- **Tablet veya dokunmatik terminal:** Yağa, suya ve darbeye dayanıklılık sınıfına bakın. Mutfak tarafında kullanılacaksa IP54 ve üzeri koruma sınıfı tercih edin.
- **Barkod okuyucu:** Paket servis ve market bölümü olan işletmelerde gerekli.
- **Müşteri ekranı:** Fiyat gösterimi ve e-fatura onayı için kullanışlı.
- **Mobil POS cihazı:** Garsonların masada sipariş alabilmesi için el tipi tablet veya özel cihazlar.

## Yazar Kasa Entegrasyonu ve ÖKC Uyumu

Türkiye'de Gelir İdaresi Başkanlığı (GİB) düzenlemeleri gereği, yazar kasa kullanımı zorunludur. Yeni Nesil Ödeme Kaydedici Cihazlar (ÖKC) ile POS sisteminizin sorunsuz konuşması kritik öneme sahiptir.

### ÖKC Entegrasyonunda Dikkat Edilecekler

- **GİB onaylı cihaz listesini kontrol edin.** Ingenico, Profilo ve Hugin markaları Türkiye'de yaygın kullanılan ÖKC üreticileridir.
- **POS yazılımınızın ÖKC API desteği olmalı.** Adisyo ve Pos Entegratör gibi çözümler bu entegrasyonu yerleşik olarak sunar.
- **e-Fatura ve e-Arşiv fatura uyumu:** Kurumsal müşterilere hizmet veriyorsanız e-fatura kesimi zorunlu olabilir. POS sisteminizin bu modülü desteklemesi gerekir.
- **Z raporu otomasyonu:** Gün sonu Z raporunun otomatik oluşturulması muhasebe süreçlerini ciddi şekilde kolaylaştırır.

## Adisyon Yazıcısı ve Mutfak Yazıcısı Kurulumu

Sipariş akışının hızlı ve hatasız olması, doğru yapılandırılmış yazıcılara bağlıdır.

### Yazıcı Tipleri

- **Termal adisyon yazıcısı:** Kasada fiş basımı için kullanılır. Epson TM-T88 serisi sektör standardıdır. USB veya ethernet bağlantılı modelleri tercih edin.
- **Mutfak yazıcısı (darbe yazıcı):** Mutfakta sıcak ve nemli ortamda çalışacak yazıcılar termal değil, iğne vuruşlu (dot matrix) olmalıdır. Bixolon SRP-275 gibi modeller buhar ve yağa dayanıklıdır.
- **Etiket yazıcısı:** Paket servis yapan işletmelerde sipariş etiketlemesi için gereklidir.

### Bağlantı Topolojisi

Yazıcılar WiFi, ethernet veya USB ile bağlanabilir. Ancak mutfak ortamında **kablolu ethernet bağlantısı** çok daha güvenilirdir. WiFi sinyali mutfaktaki metal ekipmanlardan ve mikrodalga fırınlardan olumsuz etkilenebilir. Her yazıcıya ayrı bir ethernet kablosu çekerek kesintisiz sipariş akışı sağlayın.

## Misafir WiFi Kurulumu ve 5651 Sayılı Kanun Uyumu

Müşterilerinize WiFi sunmak bugün neredeyse standart bir beklenti. Ancak Türkiye'de 5651 sayılı kanun kapsamında misafir WiFi hizmeti sunan işletmelerin log tutma yükümlülüğü vardır.

### Captive Portal Nedir, Neden Gerekli?

Captive portal, müşterilerin WiFi'ye bağlanmadan önce karşılaştığı giriş ekranıdır. Bu ekranda telefon numarası veya sosyal medya hesabıyla kimlik doğrulaması yapılır. Bu sistem hem yasal zorunlulukları karşılar hem de pazarlama amaçlı veri toplamanıza olanak tanır.

### Teknik Gereksinimler

- **Ayrı VLAN:** Misafir ağı, POS ve yönetim ağından mutlaka ayrılmalıdır. Bir müşterinin cihazından POS sisteminize erişilmesi ciddi bir güvenlik açığıdır.
- **Bant genişliği sınırlaması:** Her kullanıcıya 2-5 Mbps sınır koyarak adil kullanım sağlayın. Aksi halde bir müşterinin video izlemesi tüm işletmenin internetini yavaşlatır.
- **Log saklama:** 5651 kanunu gereği bağlantı logları en az 1 yıl (bazı yorumlara göre 2 yıl) saklanmalıdır. FortiGate, Sophos veya UniFi gibi cihazların loglama özellikleri bu ihtiyacı karşılar.
- **Süre sınırı:** Müşteri başına oturum süresi belirleyin (örneğin 2 saat). Bu hem bant genişliğini korur hem de uzun süreli kötüye kullanımı engeller.

WiFi güvenliği hakkında daha detaylı bilgi için [şirket WiFi güvenliği rehberimize](/blog/sirket-wifi-guvenligi) göz atabilirsiniz.

## Güvenlik Kamerası (CCTV) Sistemi

Restoran ve kafelerde güvenlik kamerası hem hırsızlık önleme hem de operasyonel denetim için kullanılır.

### Kamera Yerleşim Planı

- **Kasa bölgesi:** En az 1 adet yüksek çözünürlüklü (4 MP ve üzeri) kamera. Para sayma ve fiş kontrolü için net görüntü şart.
- **Giriş-çıkış:** Yüz tanıma destekli veya geniş açılı kamera.
- **Mutfak:** Hijyen denetimi ve operasyonel verimlilik takibi için. Buhar ve yağa karşı korumalı (IP66) kamera gerekir.
- **Depo alanı:** Stok hareketlerinin kaydı için.
- **Dış mekan (varsa):** Teras, otopark veya bahçe alanları için gece görüşlü (IR) ve hava koşullarına dayanıklı kameralar.

### NVR ve Depolama

Hikvision ve Dahua, Türkiye'de fiyat-performans açısından en yaygın tercih edilen CCTV markalarıdır. NVR (Network Video Recorder) kapasitesini kamera sayısına ve saklama süresine göre belirleyin. Genel kural olarak 30 gün kayıt saklama kapasitesi yeterlidir. 8 kameralı bir sistem için en az 4 TB HDD önerilir.

## Network Altyapısı: Her Şeyin Temeli

Tüm bu sistemlerin sorunsuz çalışması güçlü bir network altyapısına bağlıdır.

### İnternet Bağlantısı

- **Ana hat:** Fiber bağlantı tercih edin. 50 Mbps simetrik hat çoğu restoran için yeterlidir.
- **Yedek hat:** 4G/5G router ile yedek bağlantı kurun. POS sisteminiz ve yazar kasanız internet kesintisinde bile çalışmalı, ancak bulut senkronizasyonu ve online sipariş platformları yedek hat olmadan duracaktır.

### Switch ve Kablolama

- **Yönetilebilir switch:** VLAN desteği olan bir switch (TP-Link, Ubiquiti veya Cisco Small Business) ile POS, kamera, misafir WiFi ve yönetim ağlarını birbirinden ayırın.
- **Cat6 kablolama:** Yeni kurulumda mutlaka Cat6 veya Cat6a kullanın. Mutfak tarafında kablo kanalı ile korumalı geçiş yapın.

### Firewall

İşletme ağınızı koruyan bir firewall hem yetkisiz erişimi engeller hem de misafir WiFi ile iç ağ arasındaki izolasyonu sağlar. Küçük işletmeler için uygun firewall çözümlerini [firewall kurulum rehberimizde](/blog/kucuk-sirket-firewall-kurulumu) detaylı inceledik.

## UPS ve Elektrik Altyapısı

Elektrik kesintisi, özellikle POS sistemi ve yazar kasa için ciddi sorunlara neden olabilir. İşlem sırasında güç kesilmesi veri kaybına yol açabilir.

- **Kasa bölgesi:** POS terminali, yazar kasa ve switch için en az 15 dakika yedekleme süresi sunan bir UPS kullanın. APC Back-UPS 600-1000 VA yeterlidir.
- **NVR ve kameralar:** Güvenlik sistemi için ayrı bir UPS veya PoE switch ile besleme tercih edin. PoE switch üzerinden kameralar tek kablo ile hem veri hem güç alır.
- **Topraklama:** Tüm IT ekipmanlarının topraklı prize bağlı olduğundan emin olun. Özellikle eski binalarda topraklama eksikliği ekipman arızalarına neden olur.

## Kurulum Aşamaları: Pratik Kontrol Listesi

Bir restoran IT altyapısını kurarken aşağıdaki sırayı takip etmenizi öneriyoruz:

1. **Mekan keşfi ve ihtiyaç analizi** — Masa sayısı, mutfak düzeni, kamera noktaları belirleyin.
2. **Kablolama** — Tadilat aşamasında Cat6 ve elektrik hatlarını birlikte çekin.
3. **Network cihazları kurulumu** — Router, switch, firewall ve access point montajı.
4. **POS ve yazar kasa kurulumu** — Yazılım lisansları, ÖKC entegrasyonu, yazıcı bağlantıları.
5. **WiFi yapılandırması** — VLAN ayrımı, captive portal, bant genişliği limitleri.
6. **CCTV kurulumu** — Kamera montajı, NVR yapılandırması, uzaktan erişim ayarları.
7. **Test ve eğitim** — Tüm sistemlerin birlikte çalıştığını doğrulayın, personele eğitim verin.

## Sonuç

Restoran ve kafe IT altyapısı, birbiriyle entegre çalışan birçok bileşenden oluşur. POS sistemi, yazar kasa uyumu, yazıcılar, WiFi, güvenlik kameraları ve network altyapısı bir bütün olarak planlanmalıdır. Her birini ayrı ayrı kurup sonradan birleştirmeye çalışmak hem daha maliyetli hem de daha sorunlu olur.

Profesyonel bir IT danışmanıyla çalışarak hem yasal uyumluluk hem de operasyonel verimlilik açısından doğru adımları atabilirsiniz.
