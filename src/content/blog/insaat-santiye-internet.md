---
slug: "insaat-santiye-internet"
title: "Şantiye İnternet ve IT Çözümleri: Geçici Network, Kamera ve Sahada Bağlantı"
type: "cluster"
pillar: 4
url: "/blog/insaat-santiye-internet"
hedef_anahtar_kelime: "şantiye internet kurulumu"
meta_description: "İnşaat şantiyesi IT çözümleri: 4G/5G mobil internet, outdoor WiFi, IP kamera, toz/neme dayanıklı ekipman, geçici network kurulumu rehberi."
kelime_sayisi: "1800"
pillar_linki: "/kurumsal-network-kurulumu"
---

# Şantiye İnternet ve IT Çözümleri: Geçici Network, Kamera ve Sahada Bağlantı

İnşaat şantiyeleri, IT açısından en zorlu çalışma ortamlarından biridir. Sabit altyapı yoktur, ortam sürekli değişir, toz ve nem seviyesi yüksektir, ekipmanlar darbelere maruz kalır. Buna rağmen modern inşaat yönetimi internet bağlantısı, güvenlik kameraları ve dijital araçlar olmadan sürdürülemez.

Proje yönetim yazılımları, BIM uygulamaları, puantaj sistemleri, iş güvenliği kameraları — bunların hepsi güvenilir bir IT altyapısına ihtiyaç duyar. Bu rehberde, inşaat şantiyesine özel geçici ama güvenilir bir IT altyapısının nasıl kurulacağını adım adım anlatıyoruz.

## İnternet Bağlantısı: 4G/5G Çözümleri

Şantiyede fiber veya ADSL altyapısı genellikle bulunmaz. Bulunsa bile inşaat süresince geçici bir çözüm olduğundan yatırım yapılması mantıklı olmayabilir. Bu nedenle mobil internet çözümleri şantiyenin birincil bağlantı yöntemidir.

### Endüstriyel 4G/5G Router

Standart ev tipi 4G modemler şantiye koşullarına dayanmaz. Endüstriyel sınıf routerlar tercih edilmelidir:

- **Teltonika RUT950/RUT955:** Çift SIM kart desteği, metal kasa, -40°C ile +75°C çalışma aralığı. Türkiye'de yaygın olarak temin edilebilir.
- **Robustel R1510:** Endüstriyel IoT uygulamaları için tasarlanmış, IP30 koruma, uzaktan yönetim desteği.
- **Huawei B818 veya B535:** Daha bütçe dostu seçenek ancak endüstriyel dayanıklılık sınıfı yoktur. Ofis konteyneri içinde kullanılabilir.

### Çift SIM ve Yük Dengeleme

Şantiyede tek bir operatöre bağımlı kalmak risklidir. Turkcell ve Vodafone veya Turkcell ve Türk Telekom gibi farklı operatörlerden iki SIM kart kullanarak failover (yedekleme) veya load balancing (yük dengeleme) yapılabilir. Baz istasyonlarının kapsama alanı şantiye lokasyonuna göre değişeceğinden, kurulum öncesi her üç operatörün sinyal gücü ölçülmelidir.

### Harici Anten

Şantiye alanının baz istasyonuna uzaklığına bağlı olarak harici yönlü (directional) veya çok yönlü (omni) anten kullanılması sinyal kalitesini önemli ölçüde artırır. Poynting XPOL-1 veya Panorama gibi harici LTE antenler çatıya veya direğe monte edilerek 10-15 dB kazanç sağlayabilir. Bu, pratikte bağlantı hızını iki veya üç katına çıkarabilir.

## Outdoor WiFi: Saha Genelinde Kablosuz Kapsama

Şantiyede internet bağlantısını router'dan sahaya yaymak için outdoor (dış mekan) access pointler kullanılır.

### Cihaz Seçimi

- **IP67 koruma sınıfı zorunlu.** Toz, yağmur ve sıcaklık farkına dayanmalıdır.
- **Ubiquiti UniFi AC Mesh veya UAP-AC-M-PRO:** Fiyat-performans açısından güçlü seçenek. Mesh özelliğiyle kablolama yapılamayan alanlara kablosuz genişleme sağlar.
- **TP-Link EAP225-Outdoor:** Daha bütçe dostu bir alternatif. IP65 koruma.
- **Cambium Networks cnPilot e501S:** Zorlu dış mekan koşulları için tasarlanmış, yüksek kapasite.

### Yerleşim Planı

- Ofis konteyneri, yemekhane, güvenlik kulübesi ve bina girişleri öncelikli kapsama alanlarıdır.
- AP'ler vinç kulesi, aydınlatma direği veya çelik konstrüksiyon üzerine monte edilebilir.
- PoE (Power over Ethernet) ile beslenmeleri hem kablo sayısını azaltır hem de UPS koruması altına almayı kolaylaştırır.
- Şantiye alanı büyükse noktadan noktaya (point-to-point) kablosuz köprülerle uzak noktalara bağlantı taşınabilir. Ubiquiti airMAX veya MikroTik LHG serisi bu amaçla yaygın kullanılır.

## IP Kamera Sistemi: Güvenlik ve İş Takibi

Şantiye kameraları iki temel amaca hizmet eder: hırsızlık ve vandalizm önleme ile iş ilerleyişinin uzaktan izlenmesi.

### Kamera Özellikleri

Şantiye ortamı için kamera seçerken standart güvenlik kameralarından farklı kriterlere dikkat edilmelidir:

- **IP66 veya IP67 koruma sınıfı** — yağmur, toz ve çamurun yoğun olduğu ortamda zorunlu.
- **Gece görüşü (IR)** — şantiyede aydınlatma yetersiz olabilir. Minimum 30 metre IR menzili önerilir.
- **Geniş açı** — 110 derece ve üzeri görüş açısı geniş şantiye alanlarını daha az kamerayla kaplamayı sağlar.
- **4G destekli kamera** — internet altyapısı olmayan çok uzak noktalarda doğrudan 4G üzerinden görüntü aktaran kameralar kullanılabilir. Hikvision DS-2CD2043G2-I/4G veya Reolink Go Plus gibi modeller bu kategoridedir.
- **PTZ (Pan-Tilt-Zoom)** — büyük alanlarda tek bir kamerayla geniş alan taraması yapmak için. Uzaktan yönlendirilebilir.

### Kayıt ve İzleme

- **NVR:** Şantiye ofis konteynerinde konumlandırılır. Darbeye dayanıklı HDD (WD Purple veya Seagate SkyHawk) kullanılmalıdır.
- **Bulut izleme:** Proje yöneticileri ve iş sahibinin şantiyeyi uzaktan izleyebilmesi için bulut erişimi yapılandırılmalıdır. Hikvision Hik-Connect veya Dahua DMSS uygulamaları bu imkanı sunar.
- **Time-lapse kayıt:** İnşaat ilerleyişini dönemsel olarak kaydetmek için time-lapse kameralar kullanılabilir. Proje tamamlandığında hızlandırılmış inşaat videosu elde edilir.

## Toz ve Neme Dayanıklı Ekipman

Şantiye ortamı elektronik ekipmanlar için oldukça düşmancadır. Doğru IP koruma sınıfına sahip ekipman seçimi, arıza oranını ve değişim maliyetini doğrudan etkiler.

### IP Koruma Sınıfları

- **IP65:** Toz geçirmez, her açıdan su sıçramasına dayanıklı. Kapalı alanlardaki şantiye ekipmanı için yeterli.
- **IP66:** Güçlü su jetine dayanıklı. Açık alanlardaki AP ve kameralar için minimum standart.
- **IP67:** Geçici su altında kalma (1 metre, 30 dakika) dayanıklılığı. Zemin seviyesinde veya su birikme riski olan noktalardaki ekipmanlar için.

### Portatif Network Dolabı

Şantiyede network ekipmanlarını (router, switch, PoE enjektör, NVR) korumak için portatif, kilitlenebilir ve havalandırmalı bir network dolabı kullanılmalıdır.

- **6U veya 9U duvar tipi kabinet** ofis konteyneri için yeterlidir.
- Kabinetin havalandırma fanı olmalı — konteyner içi sıcaklık yazın 50°C'yi aşabilir.
- Kilitli olması hem güvenlik hem de kazara müdahaleyi engelleme açısından önemlidir.
- UPS ile birlikte konumlandırılmalı — güç dalgalanmaları şantiyede sık yaşanır.

## Güneş Enerjili Çözümler

Uzak şantiye alanlarında veya elektrik altyapısı henüz kurulmamış bölgelerde güneş enerjisi ile çalışan IT ekipmanları kullanılabilir.

### Solar IT Kiti Bileşenleri

- **Solar panel:** 100-200W panel, tek bir AP ve 4G router beslemek için yeterlidir.
- **Şarj kontrol cihazı (MPPT):** Panel verimini maksimize eder.
- **Akü:** 100 Ah jel akü, gece ve bulutlu havalar için enerji deposu.
- **PoE enjektör:** AP ve kameraya tek kablo üzerinden güç ve veri sağlar.

Bu kit ile elektriği olmayan bir şantiye köşesine WiFi kapsama ve kamera yerleştirmek mümkündür. Kurulum tamamen taşınabilir olduğundan proje bitiminde bir sonraki şantiyeye taşınır.

## BIM ve Proje Yönetim Yazılımlarına Sahadan Erişim

Modern inşaat projelerinde BIM (Building Information Modeling) kullanımı yaygınlaşıyor. Revit, Navisworks veya BIM 360 gibi uygulamalara sahadan erişim, koordinasyon hatalarını azaltır ve karar süreçlerini hızlandırır.

### Sahada BIM Erişimi İçin Gereksinimler

- **Tablet veya ruggedized laptop:** Panasonic Toughbook veya Dell Latitude Rugged serisi saha koşullarına dayanıklıdır. Daha bütçe dostu alternatif olarak Samsung Galaxy Tab Active serisi IP68 korumaya sahip tabletler kullanılabilir.
- **Yeterli bant genişliği:** BIM modellerinin buluttan yüklenmesi ciddi bant genişliği gerektirir. Minimum 10 Mbps indirme hızı önerilir.
- **Autodesk BIM 360 veya Trimble Connect:** Bulut tabanlı BIM platformları sahadan model inceleme, çakışma kontrolü (clash detection) ve iş emri yönetimi sağlar.

## Puantaj ve Personel Takip Sistemi

Şantiyede günlük işçi sayısının doğru takibi hem maliyet kontrolü hem de iş güvenliği açısından kritiktir.

### Dijital Puantaj Çözümleri

- **Turnike veya kart okuyucu:** Şantiye girişine kurulan turnike ile giriş-çıkış saatleri kaydedilir. HID veya ZKTeco marka cihazlar şantiye koşullarına uygun modeller sunar.
- **Mobil uygulama:** GPS konumlu giriş-çıkış kaydı. Sahada birden fazla noktada çalışan ekipler için pratik.
- **Yüz tanıma:** Kask altında bile çalışabilen termal yüz tanıma sistemleri mevcut ancak maliyeti yüksektir.

Puantaj verileri merkez ofise günlük olarak aktarılmalıdır. 4G bağlantı üzerinden otomatik senkronizasyon yapılandırılabilir.

## Geçici Network Kurulum Adımları

Bir şantiye IT altyapısını kurarken aşağıdaki sırayı takip edin:

1. **Saha keşfi** — baz istasyonu sinyal ölçümü, kamera noktalarının belirlenmesi, elektrik durumu tespiti.
2. **Ofis konteyneri hazırlığı** — network dolabı, UPS, 4G router ve switch kurulumu.
3. **Kablolama** — konteynırdan kamera ve AP noktalarına Cat6 veya fiber kablo çekimi. Kablo kanalı veya zırhlı boru ile koruma.
4. **Outdoor AP montajı** — direğe veya yapı üzerine IP67 erişim noktası yerleştirme.
5. **Kamera montajı** — NVR yapılandırması, bulut erişim testi.
6. **VPN yapılandırması** — merkez ofise güvenli bağlantı kurulumu. Proje dosyalarına ve ERP'ye uzaktan erişim.
7. **Test** — tüm noktalardan WiFi kapsama testi, kamera görüntü kalitesi doğrulaması, bant genişliği ölçümü.

Genel IT kurulum prensipleri hakkında [ofis IT kurulum rehberimize](/blog/yeni-ofis-it-kurulum-rehberi), uzaktan çalışma güvenliği için de [evden çalışma güvenliği rehberimize](/blog/evden-calisma-bilgisayar-guvenligi) göz atabilirsiniz.

## Şantiye IT'sinde Sık Yapılan Hatalar

- **Standart ev tipi router kullanmak:** Sıcaklık, toz ve titreşimden kısa sürede arıza yapar.
- **Tek operatöre bağımlı kalmak:** Baz istasyonu arızasında tüm bağlantı kesilir.
- **Kamera kayıtlarını yedeklememek:** NVR arızasında tüm kayıtlar kaybolur.
- **Kablolama koruması yapmamak:** İnşaat makinelerinin kablo ezmesi en sık karşılaşılan arıza nedenidir.
- **Elektrik dalgalanmalarına karşı UPS kullanmamak:** Jeneratör geçişlerinde oluşan gerilim dalgalanmaları ekipman yakabilir.

## Sonuç

Şantiye IT altyapısı, ofis ortamından tamamen farklı bir yaklaşım gerektirir. Geçici olması, sert çevre koşulları ve sürekli değişen fiziksel yapı, her aşamada dayanıklılık ve esneklik odaklı düşünmeyi zorunlu kılar.

Doğru ekipman seçimi, düzgün kablolama, yedekli internet bağlantısı ve iyi bir kamera planıyla, şantiye ortamında bile güvenilir bir IT altyapısı kurmak mümkündür. Proje bitiminde tüm bu ekipman sökülerek bir sonraki şantiyede tekrar kullanılabilir — bu da yatırımın geri dönüşünü artırır.
