---
slug: yeni-ofis-it-kurulum-rehberi
title: "Yeni Ofis Açıyorsunuz: IT ve Network Kurulum Rehberi (Sıfırdan)"
type: cluster
pillar: 4
url: "/blog/yeni-ofis-it-kurulum-rehberi"
hedef_anahtar_kelime: "yeni ofis IT kurulumu"
meta_description: "Yeni ofis açıyorsunuz ve IT altyapısı nasıl kurulur bilmiyorsunuz? İnternet, bilgisayar, yazıcı, sunucu ve network kurulumu adım adım."
kelime_sayisi: "~1800"
pillar_linki: "/kurumsal-network-kurulumu"
---

Yeni bir ofis kiraladınız, boyası bitti, mobilyalar geldi, masalar dizildi. Artık "iş yapacak" hale getirme zamanı. Ama bir bakıyorsunuz ki önünüzde bir sürü soru var: İnternet nasıl gelecek? Kablolar nerelere çekilecek? Bilgisayarlar ne alınacak? Yazıcıyı herkes nasıl kullanacak? Bu sorular sizi bunaltmasın. Bu rehberde, sıfırdan bir ofis IT altyapısını adım adım nasıl kuracağınızı, teknik bilginiz olmasa bile anlayacağınız bir dille anlatıyoruz. Her adımda neye dikkat etmeniz gerektiğini, nerelerde para tasarrufu yapabileceğinizi ve hangi hataların başınızı ağrıtacağını açıklıyoruz.

## Adım 1: İnternet Bağlantısı — Her Şeyin Temeli

Ofiste ilk kurulacak şey internet bağlantısıdır. İnternet olmadan mail de yok, bulut sistemi de yok, hatta çoğu yazıcı bile düzgün çalışmaz. İşte dikkat etmeniz gerekenler:

### Fiber mi, ADSL mi?

Bugün yeni bir ofis için kesinlikle fiber bağlantı tercih edin. ADSL artık iş dünyasının ihtiyaçlarını karşılamıyor. Fiber bağlantıda 50 Mbps ile 1 Gbps arasında hızlar mevcut. 5-10 kişilik bir ofis için minimum 100 Mbps öneriyoruz.

### ISP (İnternet Servis Sağlayıcı) Seçimi

Turkcell Superonline, Turknet, Turk Telekom gibi sağlayıcılar fiber hizmeti sunuyor. Seçim yaparken sadece fiyata bakmayın. Arıza durumunda ne kadar hızlı müdahale ettiklerini araştırın. Kurumsal tarifelerde genelde SLA (garanti edilen hizmet süresi) daha iyidir. Mümkünse iki farklı sağlayıcıdan bağlantı alın. Biri arızalandığında diğeri devreye girsin. Buna "yedekli bağlantı" denir ve iş sürekliliği için kritiktir.

### Statik IP Gerekiyor mu?

Eğer ofiste bir sunucu çalıştıracaksanız veya dışarıdan VPN ile bağlanılması gerekiyorsa, statik IP adresi almanız gerekir. Değilse standart dinamik IP yeterlidir.

## Adım 2: Network Kablolama — Görünmeyen Ama En Kritik Adım

Kablosuz (WiFi) her yerde var, neden kablo çekelim diye düşünebilirsiniz. Ama ofis ortamında kablolu bağlantı WiFi'dan çok daha güvenilir, hızlı ve kararlıdır. Özellikle masaüstü bilgisayarlar, yazıcılar ve sunucular mutlaka kablolu bağlanmalıdır.

### Ne Tür Kablo Çekilmeli?

Cat6 kablo bugünün standardıdır. Cat5e de çalışır ama Cat6 daha hızlı veri taşır ve geleceğe yatırımdır. Her masaya en az bir network noktası (priz) çekilmelidir. Toplantı odasına ve ortak alanlara da unutmayın.

### Kablo Tesisatı İçin Dikkat Edilecekler

1. Kabloları duvar içinden veya kablo kanalı ile geçirin. Yerde sürünen kablolar hem tehlikeli hem çirkin olur.
2. Her kablo noktasını numaralandırın. Hangi kablonun nereye gittiğini bilmek ileride arıza tespitinde hayat kurtarır.
3. Kablo uzunluğu 90 metreyi geçmesin (Cat6 standardı).
4. Bu işi mutlaka deneyimli bir network kablolama ekibine yaptırın. Kötü çekilmiş kablo, yıllarca sizi uğraştırır.

## Adım 3: Rack Kabin, Switch ve Router

Tüm kablolar bir merkezde toplanır. Bu merkez genelde bir "rack kabin" içindedir.

### Rack Kabin Nedir?

Duvar tipi veya yer tipi metal bir dolap düşünün. İçine modem, switch, patch panel ve varsa sunucu konur. Küçük ofisler için 9U veya 12U duvar tipi kabin yeterlidir. Kabini iyi havalandırılan, kilitlenebilir bir yere koyun. Herkesin dokunduğu bir yerde olmamalı.

### Switch

Switch, tüm kablolu cihazları birbirine bağlayan cihazdır. 10 kişilik ofis için 24 portlu yonetilen (managed) bir switch idealdir. TP-Link, Ubiquiti veya Cisco gibi markalar güvenilir seçeneklerdir.

### Router

Router, ofis ağınızı internete bağlayan cihazdır. ISP'nin verdiği modem genelde hem modem hem router işlevi görür, ama ciddi bir ofis ortamında ayrı bir profesyonel router kullanmanız tavsiye edilir. Bu size daha iyi güvenlik, VPN desteği ve trafik yönetimi sağlar.

## Adım 4: WiFi Erişim Noktaları

Kablolu bağlantı temel olsa da, laptop kullanan çalışanlar, toplantı odaları ve misafir interneti için WiFi de şarttır.

### Ev Tipi Modem Yetmez

Ofiste ISP'nin verdiği modem ile WiFi dağıtmaya çalışmayın. Bu modemler 3-5 cihaz için tasarlanmıştır, ofiste 20-30 cihaz bağlanır. Bunun yerine profesyonel erişim noktaları (access point) kullanın. Ubiquiti, TP-Link Omada veya Cisco Meraki gibi markalar ofis ortamı icin uygundur.

### Yerlesim Plani

1. Her 80-100 metrekareye bir erişim noktası koyun.
2. Erişim noktalarını tavana monte edin, sinyal daha iyi yayilir.
3. Misafir WiFi ile calisan WiFi'yi ayirin. Misafirler sirket agina erisemesin.

Ofis WiFi guvenligi hakkinda daha detayli bilgi icin [sirket WiFi guvenligi](/blog/sirket-wifi-guvenligi) yazimizi okuyun.

## Adim 5: Bilgisayar Satin Alma Rehberi

Bilgisayar secimi bütceye, calisma seklina ve kullanim amacina gore degisir.

### Masaüstü mü, Laptop mu?

Masaüstü ofiste sabit calisan, yer degistirmeyen kisiler icin idealdir. Daha ucuzdur, daha kolay tamir edilir ve genelde ayni fiyata daha gucludur. Laptop ise toplantilara giren, dis ziyaretlere cikan veya evden de calisan kisiler icin gereklidir.

### Minimum Ozellikler (2026 icin)

- Islemci: Intel Core i5 veya AMD Ryzen 5 (minimum)
- RAM: 16 GB (8 GB artik yetersiz)
- Disk: 256 GB SSD (minimum), 512 GB SSD ideal
- Ekran: Masaustunde 23-24 inc monitor, laptop'ta 14-15 inc

### Toplu Alimda Tasarruf

5'ten fazla bilgisayar aliyorsaniz, bayilerden toplu alis indirimi isteyin. Ayrica kurumsal modeller (Dell OptiPlex, Lenovo ThinkCentre, HP ProDesk) tuketici modellerinden daha dayanikli ve servisi daha kolaydir.

## Adim 6: Yazici ve Tarayici

Ofiste en az bir yazici sart. Hangi turu secmeniz gerektigini soyle ozetleyelim:

### Lazer mi, Mürekkep Püskürtmeli mi?

Ofis icin lazer yazici secin. Mürekkep püskürtmeli yazicilar renkli foto basimi icin iyidir ama ofis ortaminda toner maliyeti daha düsüktür ve lazer yazicilar cok daha hizlidir.

### Ag Yazicisi

Yaziciyi USB ile tek bir bilgisayara baglamak yerine, aga bagli bir yazici secin. Boylece ofisteki herkes ayni yaziciyi kullanabilir. Cogu modern yazici WiFi veya Ethernet baglantisini destekler.

Yazici paylasim sorunlari yasiyorsaniz [yazici paylasim rehberimizi](/blog/yazici-paylasamiyorum) inceleyin.

## Adim 7: Sunucu — Gerçekten İhtiyacınız Var mı?

"Sunucu" kelimesini duyunca pahalı, karmasik bir sey düsünebilirsiniz. Ama aslinda sunucu, özel bir bilgisayardir ve her ofis buna ihtiyac duymaz.

### Sunucu Gerekli Olan Durumlar

- 10'dan fazla calisan varsa ve ortak dosyalara erisim gerekiyorsa
- Sirket icinde muhasebe programi, ERP veya özel yazilim calisiyorsa
- Active Directory ile kullanici yönetimi yapilacaksa
- Yedekleme icin merkezi bir nokta gerekiyorsa

### Sunucu Gereksiz Olan Durumlar

5-6 kisilik bir ofiste herkes Google Workspace veya Microsoft 365 kullaniyorsa ve dosyalar bulutta tutuluyorsa, fiziksel sunucuya ihtiyaciniz olmayabilir. NAS (Network Attached Storage) cihazi ile dosya paylasimi yapabilirsiniz. Bu konu hakkinda [NAS mi bulut depolama mi](/blog/nas-mi-bulut-depolama-mi) yazimiz size yol gösterecektir.

## Adim 8: E-Posta Kurulumu

Sirket e-postasi icin info@sirketiniz.com gibi profesyonel adresler kullanmalisiniz. Gmail veya Hotmail adresleri kurumsal imaj acisindan zayif kalir.

### Önerilen Çözümler

1. **Microsoft 365 (Outlook):** Türkiye'de en yaygin kullanilan kurumsal e-posta cözümüdür. Exchange sunucusu, takvim paylasimi, Teams entegrasyonu ile gelir. Kisi basi aylik 80-150 TL bandindadir.
2. **Google Workspace (Gmail):** Daha basit arayüz isteyenler icin idealdir. Google Drive entegrasyonu gücludur. Fiyatlar benzerdir.

Her iki platformda da alan adi (domain) dogrulamasi gerekir. Bu islem icin SPF, DKIM ve DMARC ayarlari yapilmalidir. Detaylar icin [SPF, DKIM, DMARC rehberimizi](/blog/spf-dkim-dmarc-rehberi) okuyabilirsiniz.

## Adim 9: Temel Güvenlik Önlemleri

Ofis kurulumunun son ama en önemli adimi güvenliktir. IT altyapisini kurup güvenligini düsünmemek, evi yapip kapisini kilitlemeyi unutmak gibidir.

### Yapilmasi Gereken Minimum Güvenlik Adimlari

1. **Firewall (güvenlik duvari):** Router'inizde veya ayri bir cihazda mutlaka aktif olmali. Daha fazla bilgi icin [kücük ofis firewall rehberimizi](/blog/kucuk-ofis-firewall-kurulumu) inceleyin.
2. **Antivirüs:** Her bilgisayarda güncel bir antivirüs calismalı. Windows Defender minimum seviye olarak yeterlidir.
3. **Güclü sifreler:** Tüm cihaz ve hesaplarda güclü, benzersiz sifreler kullanin. "123456" veya "sirketadi2026" gibi sifreler kabul edilemez.
4. **Yedekleme:** Ilk günden itibaren yedekleme sistemi kurun. [3-2-1 yedekleme kurali](/blog/3-2-1-yedekleme-kurali) yazimiz bu konuda size rehberlik edecektir.
5. **Fiziksel güvenlik:** Rack kabini kilitli tutun, sunucu odasina herkesin erismesini engelleyin.

## Kurulum Siralama Özeti

Yeni ofis IT kurulumunu su sirayla yapin:

1. ISP basvurusu yapin (internet gelisi 1-2 hafta sürebilir, erken baslayin)
2. Network kablolama ve rack kabin montaji
3. Switch, router ve WiFi erisim noktalari kurulumu
4. Bilgisayarlarin satin alinmasi ve kurulumu
5. Yazici kurulumu ve ag paylasimi
6. E-posta ve bulut hesaplarinin acilmasi
7. Güvenlik yapilandirmasi (firewall, antivirüs, yedekleme)
8. Test: Her sey birbiriyle uyumlu calisiyor mu?

Bu adimlari tek tek kendiniz yapabilirsiniz, ama deneyimsiz ellerde yapilan hatalar ileride çok daha pahaliya mal olur. Özellikle kablolama ve network yapilandirmasi konusunda profesyonel destek almak uzun vadede tasarruf saglar.

## Profesyonel Destek Almak İsterseniz

Yeni ofis IT kurulumu, dogru yapildığında yillarca sorunsuz calisir. Yanlis yapildiginda ise sürekli ariza, yavaslik ve güvenlik açiklari ile ugrasirsiniz. Kozyatagi Bilisim olarak Istanbul'da küçük ve orta ölcekli sirketlere sifirdan ofis IT kurulumu hizmeti veriyoruz. Internet basvurusundan kablolama'ya, bilgisayar temininden güvenlik yapilandirmasina kadar tüm süreci yönetiyoruz. Bizi hemen arayin: **0541 636 77 75** veya [kozyatagibilisim.com](https://kozyatagibilisim.com) adresinden bize ulasin.

## Bu Rehberi de Okuyun:

- [Ofiste İnternet Neden Yavaş? Çözüm Rehberi](/blog/ofiste-internet-yavas)
- [Küçük Ofis Sunucusu Kurulumu](/blog/kucuk-ofis-sunucusu-kurulumu)
- [Şirket WiFi Güvenliği Rehberi](/blog/sirket-wifi-guvenligi)
