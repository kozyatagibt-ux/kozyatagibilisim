---
slug: "e-ticaret-sunucu-ve-altyapi"
title: "E-Ticaret Sitesi IT Altyapısı: Sunucu, Güvenlik ve Performans Rehberi"
type: "cluster"
pillar: 1
url: "/blog/e-ticaret-sunucu-ve-altyapi"
hedef_anahtar_kelime: "e-ticaret sunucu altyapısı"
meta_description: "E-ticaret sitesi için sunucu seçimi, güvenlik, performans optimizasyonu ve ödeme altyapısı rehberi. Yoğun trafik dönemlerinde kesintisiz satış için IT çözümleri."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## E-Ticaret Sitesinde IT Altyapısı Neden Bu Kadar Kritik?

E-ticaret sektöründe IT altyapısı doğrudan gelirle ilişkilidir. Site 1 dakika çökerse satış sıfıra düşer. Sayfa yüklenme süresi 3 saniyeyi aşarsa ziyaretçilerin yüzde ellisinden fazlası siteyi terk eder. Güvenlik ihlali yaşanırsa hem müşteri kaybı hem de hukuki yaptırım kaçınılmazdır.

Türkiye'de e-ticaret hacmi 2026 yılında hızla büyümeye devam ediyor. Black Friday, 11.11, yılbaşı gibi kampanya dönemlerinde trafik normal günlerin 10-20 katına çıkabiliyor. Bu yoğunluğu kaldırabilecek bir IT altyapısı kurmak, e-ticaret girişiminin ayakta kalmasının temel şartıdır.

Bu rehberde e-ticaret sitesi sahiplerine sunucu seçiminden güvenliğe, performans optimizasyonundan ödeme altyapısına kadar ihtiyaç duydukları tüm IT bileşenlerini anlatıyoruz.

## Sunucu Mimarisi Seçimi

E-ticaret sitesi için sunucu seçimi işletmenin ölçeğine, trafiğine ve bütçesine göre yapılmalıdır.

### Paylaşımlı Hosting

- **Uygun olduğu durum:** Günlük 100-500 ziyaretçi, az ürün sayısı
- **Avantaj:** Düşük maliyet (aylık 50-200 TL)
- **Dezavantaj:** Performans garantisi yok, diğer sitelerden etkilenme riski, sınırlı kaynak

E-ticaret için paylaşımlı hosting genellikle yetersizdir. Kampanya dönemlerinde çökme riski çok yüksektir.

### VPS (Virtual Private Server)

- **Uygun olduğu durum:** Günlük 500-5.000 ziyaretçi, orta ölçek
- **Avantaj:** Garantili kaynak, root erişim, ölçeklenebilirlik
- **Dezavantaj:** Sunucu yönetimi bilgisi gerektirir

Türkiye'de Hetzner, DigitalOcean, AWS Lightsail veya yerli sağlayıcılar (Turhost, Natro, Radore) VPS hizmeti sunmaktadır.

### Dedicated Server (Fiziksel Sunucu)

- **Uygun olduğu durum:** Günlük 5.000+ ziyaretçi, yüksek işlem hacmi
- **Avantaj:** Tam kontrol, yüksek performans
- **Dezavantaj:** Yüksek maliyet, sunucu yönetimi sorumluluğu

### Cloud Hosting (Bulut Altyapı)

- **Uygun olduğu durum:** Değişken trafik, hızlı büyüme
- **Avantaj:** Otomatik ölçekleme, kullandığın kadar öde, yüksek erişilebilirlik
- **Dezavantaj:** Yanlış yapılandırma ile beklenmedik yüksek faturalar
- **Sağlayıcılar:** AWS, Google Cloud, Azure, Hetzner Cloud

Kampanya dönemlerinde trafiğin 10 kat artacağını biliyorsanız, cloud hosting en mantıklı seçimdir. Sunucu kapasitesini otomatik olarak artırıp azaltabilirsiniz.

## Yüksek Erişilebilirlik (High Availability)

E-ticaret sitesinin 7/24 erişilebilir olması gerekir. Tek sunucu mimarisi bu garantiyi veremez.

### HA İçin Temel Bileşenler

- **Load Balancer:** Trafiği birden fazla sunucuya dağıtır. Bir sunucu çökse diğerleri hizmet vermeye devam eder.
- **Veritabanı replikasyonu:** Ana veritabanı çökerse yedek veritabanı devreye girer. MySQL Master-Slave veya PostgreSQL Streaming Replication kullanılabilir.
- **Dosya depolama:** Ürün görselleri ve medya dosyaları merkezi bir depolama alanında (S3, MinIO) tutulmalıdır.
- **Session yönetimi:** Redis veya Memcached ile oturum bilgileri paylaşımlı bellek üzerinde tutulmalıdır.

## SSL ve HTTPS Yapılandırması

E-ticaret sitelerinde SSL sertifikası zorunludur. Hem yasal gereklilik hem de müşteri güveni açısından vazgeçilmezdir.

### SSL Türleri

- **DV (Domain Validation):** Temel seviye, Let's Encrypt ile ücretsiz alınabilir
- **OV (Organization Validation):** Şirket doğrulamalı, kurumsal siteler için önerilir
- **EV (Extended Validation):** En yüksek güven seviyesi, şirket adı tarayıcı adres çubuğunda görünür (bazı tarayıcılarda)

### SSL Yapılandırma İpuçları

- TLS 1.2 veya üzerini kullanın (TLS 1.0 ve 1.1 devre dışı bırakılmalı)
- HSTS (HTTP Strict Transport Security) başlığını etkinleştirin
- SSL sertifikasının otomatik yenilenmesini yapılandırın (Let's Encrypt certbot ile)
- Mixed content uyarılarını kontrol edin (tüm kaynaklar HTTPS olmalı)

## CDN (Content Delivery Network)

CDN, sitenizin statik içeriklerini (görseller, CSS, JavaScript) dünya genelindeki sunuculara dağıtarak yükleme hızını artırır.

### CDN Avantajları

- Sayfa yükleme süresini yüzde 40-60 azaltır
- Ana sunucu yükünü düşürür
- DDoS saldırılarına karşı ek koruma sağlar
- Farklı coğrafyalardaki müşterilere hızlı erişim sunar

### Önerilen CDN Sağlayıcıları

- **Cloudflare:** Ücretsiz planı bile e-ticaret için faydalıdır. WAF (Web Application Firewall) ve DDoS koruması dahildir.
- **BunnyCDN:** Uygun fiyatlı, Avrupa sunucu ağı güçlü
- **AWS CloudFront:** AWS altyapısı kullanıyorsanız entegrasyonu kolay

## DDoS Koruması

E-ticaret siteleri DDoS saldırılarının yaygın hedefleridir. Özellikle kampanya dönemlerinde rakipler tarafından yönlendirilen saldırılar görülmektedir.

### DDoS Koruma Stratejileri

- CDN seviyesinde filtreleme (Cloudflare, AWS Shield)
- Rate limiting (saniyede belirli sayıdan fazla istek reddedilir)
- IP bazlı engelleme listeleri
- Bot algılama ve CAPTCHA uygulaması
- Hosting sağlayıcınızın DDoS koruması sunup sunmadığını kontrol edin

## Ödeme Altyapısı Güvenliği

Ödeme altyapısı e-ticaret sitesinin en hassas bileşenidir. Kredi kartı bilgilerinin güvenliği hem yasal zorunluluk hem de müşteri güveni açısından kritiktir.

### PCI DSS Uyumluluğu

Kredi kartı bilgisi işleyen her sistem PCI DSS (Payment Card Industry Data Security Standard) standartlarına uymak zorundadır. Küçük e-ticaret siteleri için en pratik yol ödeme sayfasını sanal POS sağlayıcısına yönlendirmektir.

### Türkiye'de Yaygın Ödeme Altyapıları

- **iyzico:** Kolay entegrasyon, geniş ödeme seçenekleri, KOBİ dostu
- **PayTR:** Sanal POS entegrasyonu, taksit seçenekleri
- **Param (eski Paratika):** Banka sanal POS entegrasyonu
- **Sipay:** Cüzdan ve taksit çözümleri

### Ödeme Güvenliği İçin Teknik Tedbirler

- Kredi kartı bilgisini kendi sunucunuzda saklamayın (tokenization kullanın)
- Ödeme sayfasında 3D Secure zorunluluğu uygulayın
- Fraud algılama sistemi kurun veya ödeme sağlayıcınızın fraud korumasını aktif edin
- Ödeme API anahtarlarını güvenli saklayın (environment variable, vault)

## Veritabanı Optimizasyonu

E-ticaret sitelerinde veritabanı performansı kullanıcı deneyimini doğrudan etkiler. Yavaş sorgular sayfa yükleme süresini uzatır ve kampanya dönemlerinde site çökebilir.

### Optimizasyon Adımları

- **İndeksleme:** Sık sorgulanan alanlar (ürün adı, kategori, fiyat) indekslenmelidir
- **Sorgu optimizasyonu:** Slow query log aktif edilmeli ve yavaş sorgular iyileştirilmelidir
- **Veritabanı önbellekleme:** Redis veya Memcached ile sık erişilen veriler bellekte tutulmalıdır
- **Bağlantı havuzu:** Veritabanı bağlantı sayısı sınırlandırılmalı ve havuzlanmalıdır
- **Yatay ölçekleme:** Read replica kullanarak okuma trafiğini dağıtın

## Yoğun Trafik Dönemi Hazırlıkları

Black Friday, 11.11, yılbaşı gibi kampanya dönemlerinde alınması gereken önlemler:

### Kampanya Öncesi Kontrol Listesi

- **Yük testi:** Beklenen trafiğin 2 katı ile yük testi yapın (Apache JMeter, k6)
- **Otomatik ölçekleme:** Cloud altyapıda auto-scaling kuralları tanımlayın
- **CDN önbellekleme:** Statik sayfaları CDN'de önbelleğe alın
- **Veritabanı bakımı:** İndeks yeniden oluşturma, istatistik güncelleme
- **Monitoring:** Gerçek zamanlı izleme paneli hazırlayın (CPU, RAM, disk I/O, yanıt süresi)
- **Yedekleme:** Kampanya öncesi tam yedek alın
- **Acil durum planı:** Çökme durumunda kim ne yapacak, belirlenmiş olmalı

## İzleme ve Uyarı Sistemi

E-ticaret sitesinin 7/24 izlenmesi gerekir. Sorunlar müşteriden önce tespit edilmelidir.

### İzlenmesi Gereken Metrikler

- Sunucu CPU, RAM ve disk kullanımı
- Sayfa yükleme süresi (frontend ve backend ayrı)
- HTTP hata oranları (5xx, 4xx)
- Veritabanı sorgu süreleri
- Ödeme başarı/başarısızlık oranları
- SSL sertifika süresi

### Önerilen İzleme Araçları

- **Uptime Robot / Better Uptime:** Basit erişilebilirlik kontrolü
- **Grafana + Prometheus:** Detaylı performans izleme
- **New Relic / Datadog:** Uçtan uca uygulama performansı izleme

## Yedekleme Stratejisi

E-ticaret sitesinde veri kaybı doğrudan gelir kaybıdır. Sipariş verileri, müşteri bilgileri ve ürün katalogları düzenli yedeklenmelidir.

- Veritabanı saatlik yedekleme
- Dosya sistemi günlük yedekleme
- Yedekler farklı lokasyona kopyalanmalı (farklı veri merkezi veya bulut)
- Haftalık yedek geri yükleme testi
- [3-2-1 yedekleme kuralı](/blog/3-2-1-yedekleme-kurali) rehberimizi e-ticaret altyapınıza uyarlamanızı öneriyoruz

## KVKK ve Yasal Gereksinimler

E-ticaret siteleri müşteri kişisel verilerini işler: ad, adres, telefon, e-posta, sipariş geçmişi. Bu verilerin KVKK kapsamında korunması zorunludur.

- Aydınlatma metni ve çerez politikası güncel olmalıdır
- Kişisel verilerin yurt dışına aktarımı (bulut sunucu lokasyonu) KVKK'ya uygun olmalıdır
- Veri ihlali müdahale planı hazırlanmalıdır
- [KVKK uyumu için IT altyapısı](/blog/kvkk-uyumu-it-altyapisi) rehberimizi e-ticaret perspektifinden incelemenizi tavsiye ederiz

## Sonuç

E-ticaret sitesi IT altyapısı bir kere kurup unutulacak bir yapı değildir. Trafik arttıkça, ürün sayısı büyüdükçe ve güvenlik tehditleri geliştikçe altyapının da güncellenmesi gerekir.

2026 yılında rekabet avantajı yalnızca ürün ve fiyat ile değil, site hızı, güvenlik ve kesintisiz erişimle de kazanılıyor. E-ticaret altyapınızın mevcut durumunu değerlendirmek için **ucretsiz IT altyapı değerlendirmesi** hizmetimizden yararlanabilirsiniz. Performans, güvenlik ve ölçeklenebilirlik açısından iyileştirme önerilerimizi sunuyoruz.
