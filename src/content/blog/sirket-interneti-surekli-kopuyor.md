---
slug: sirket-interneti-surekli-kopuyor
title: "Şirket İnterneti Sürekli Kopuyor: Sebepleri ve Kalıcı Çözümleri"
type: cluster
pillar: 5
url: "/blog/sirket-interneti-surekli-kopuyor"
hedef_anahtar_kelime: "şirket interneti kopuyor"
meta_title: "Şirket İnterneti Sürekli Kopuyor — Kalıcı Çözüm Rehberi 2026 | Kozyatağı Bilişim"
meta_description: "Ofiste internet sürekli kopuyor mu? Modem, kablo, switch, ISP ve kapasite sorunlarının tespiti ve kalıcı çözüm yolları."
kelime_sayisi: "~1700"
pillar_linki: "/kurumsal-network-kurulumu"
---

Ofisteki herkes aynı anda "İnternet gitti!" diyor. Beş dakika sonra geliyor, on dakika sonra tekrar gidiyor. Toplantılar kesiliyor, bulut uygulamalarına erişilemiyor, e-postalar gönderilemiyor. Bu sorun sadece can sıkıcı değil, doğrudan para kaybettiriyor. 20 kişilik bir ofiste internet 1 saat kopsa, bu 20 adam-saat üretkenlik kaybı demektir. Ayda birkaç kez tekrarlandığında kayıp ciddi boyutlara ulaşır. Bu rehberde internet kopmasının yavaşlamadan farklı olduğunu, gerçek sebeplerini ve kalıcı çözümlerini anlatacağız.

## İnternet Kopması ile Yavaşlama Aynı Şey Değildir

Önce bu ayrımı netleştirmek gerekiyor. İnternet yavaşlaması, bağlantının mevcut olduğu ama hızının düştüğü durumdur. Sayfalar geç açılır, dosyalar yavaş iner ama bağlantı kopmaz. Yavaşlama sorunları için [ofiste internet yavaş rehberimize](/blog/ofiste-internet-yavas) bakabilirsiniz.

İnternet kopması ise bağlantının tamamen kesilmesidir. Hiçbir sayfa açılmaz, ping atılamaz, ağ bağlantısı simgesinde ünlem işareti veya çarpı görünür. Kopma genellikle birkaç saniye ile birkaç dakika arasında sürer ve tekrar gelir. Bu aralıklı kopma durumu, sürekli kopmadan daha zor tespit edilir çünkü sorun her zaman mevcut değildir.

## Modem ve Router Loglarını Kontrol Edin

Sorunu çözmek için önce ne zaman ve ne sıklıkta kopma yaşandığını anlamak gerekir. Modemin veya router'ın yönetim paneli bu bilgiyi size verir.

Tarayıcınıza modem/router IP adresini yazın. Genellikle 192.168.1.1 veya 192.168.0.1'dir. Kullanıcı adı ve şifre ile giriş yapın (varsayılan bilgiler genellikle cihazın altındaki etikette yazar). "Sistem logu", "Olay günlüğü" veya "Log" bölümünü bulun.

Bu loglarda bağlantı kesintilerinin tarih ve saatlerini göreceksiniz. Bu bilgi çok değerlidir çünkü kopmalar belirli saatlerde mi oluyor (mesai saatlerinde yoğunluk), her gün aynı saatte mi (ISP bakım penceresi), rastgele mi (donanım arızası) gibi soruları yanıtlamanıza yardımcı olur.

Logları ISP'ye göstermeniz, sorunu çözme sürecini büyük ölçüde hızlandırır. "İnternetimiz kopuyor" demek yerine "Son 7 günde toplam 23 kopma yaşadık, en uzunu 4 dakika sürdü, genellikle 10:00-12:00 arası oluyor" demek çok daha etkilidir.

## Ethernet Kablolarını ve Portları Test Edin

Ağ kablolarının kalitesi ve durumu, bağlantı kararlılığını doğrudan etkiler.

### Kablo Kalitesi

Eski Cat5 kablolar (genellikle gri, ince) Gigabit Ethernet için tasarlanmamıştır ve uzun mesafelerde veri kaybına yol açabilir. Cat5e minimum gereksinimdir, Cat6 veya Cat6a ideal seçimdir. Kablolarınızın kategorisini kablonun üzerindeki baskıdan okuyabilirsiniz.

### Kablo Fiziksel Durumu

Kablolar sandalye tekerlekleri altında ezilmiş mi? Keskin köşelerden bükülmüş mü? Kapı arasında sıkışmış mı? Fiziksel hasarlı kablolar aralıklı kopmalara neden olur çünkü kablonun iç telleri tam kopmamış ama temas kaybediyor olabilir. Bu tür sorunlar özellikle sinir bozucudur çünkü bazen çalışır bazen çalışmaz.

### Port Testi

Bilgisayarınızın Ethernet kablosunu switch üzerinde farklı bir porta takarak deneyin. Aynı şekilde bilgisayarın Ethernet portunu da USB Ethernet adaptörüyle test edebilirsiniz. Belirli bir bilgisayarın bağlantısı kopuyorsa ve port değiştirmek sorunu çözüyorsa, arızalı port belirlenmiş demektir.

## Switch Aşırı Yüklenmiş Olabilir

Ofislerde kullanılan yönetilebilir (managed) veya yönetilemeyen (unmanaged) switch'ler, belirli bir kapasiteye sahiptir. 8 portlu ucuz bir switch, 20 cihazın bağlı olduğu bir ofiste sorun çıkarır.

Switch sorunlarının belirtileri:

- Belirli bilgisayarların bağlantısı koparken diğerleri çalışmaya devam ediyor
- Switch'in üzerindeki LED ışıklar düzensiz yanıp sönüyor
- Switch'e dokunduğunuzda aşırı ısındığını hissediyorsunuz
- Switch yeniden başlatıldığında sorun geçici olarak düzeliyor

Switch'in ısınması önemli bir belirtidir. Havalandırmasız bir dolaba kapatılmış veya üzerine başka cihazlar konulmuş switch'ler aşırı ısınır ve performans düşer. Switch'i serin, havalandırmalı bir yere taşıyın.

Kurumsal ortamlar için yönetilebilir switch kullanmanızı öneriyoruz. Bu switch'ler port bazında bant genişliği sınırlama, VLAN yapılandırma ve detaylı loglama imkanı sunar.

## ISP (İnternet Servis Sağlayıcı) Hattında Sorun

Bazen sorun sizin tarafınızda değil, ISP'nin hattındadır. Bu durumu tespit etmek için:

### Doğrudan Modem Testi

Bir bilgisayarı doğrudan modeme Ethernet kablosuyla bağlayın (switch, router ve WiFi'yi devre dışı bırakarak). Bu yapılandırmada da kopma yaşıyorsanız sorun ISP hattındadır.

### Ping Testi

Komut İstemi'ni açın ve sürekli ping testi başlatın:

```
ping 8.8.8.8 -t
```

Bu komut Google'ın DNS sunucusuna sürekli ping atar. Kopma anında "Request timed out" veya "General failure" mesajları görürsünüz. Test bittiğinde Ctrl+C ile durdurun ve istatistikleri not edin. Kayıp (lost) oranı yüzde 1'in üzerindeyse sorun vardır.

### ISP ile İletişim

ISP'yi aradığınızda şu bilgileri hazır bulundurun:

- Kopma logları (tarih, saat, süre)
- Ping testi sonuçları
- Doğrudan modem testi yapıp yapmadığınız
- Hat numaranız ve müşteri numaranız

ISP genellikle uzaktan hat testi yapar. Hat kalitesi kötüyse teknisyen gönderir. Fiber altyapıya geçiş mümkünse, ADSL veya VDSL hatlardan kaynaklanan birçok kopma sorunu fiber ile ortadan kalkar.

## DHCP Havuzu Tükenmesi

Bu teknik bir sorun ama ofislerde şaşırtıcı derecede yaygındır. DHCP, ağdaki cihazlara otomatik olarak IP adresi atar. Modemin veya router'ın DHCP havuzunda belirli sayıda IP adresi bulunur. Bu havuz tükendiğinde yeni cihazlar ağa bağlanamaz veya mevcut cihazlar IP adresi yenileyemez.

Tipik bir modem 32 veya 64 IP adresi atar. 20 kişilik bir ofiste herkesin bilgisayarı, telefonu ve belki tableti varsa 60 cihaz yapar. Buna yazıcılar, IP telefonlar ve misafir cihazları da ekleyin. DHCP havuzu dolabilir.

Çözüm olarak DHCP havuzunun aralığını genişletin (örneğin 192.168.1.10 - 192.168.1.250 gibi) veya yazıcılar ve sunucular gibi sabit cihazlara statik IP atayarak DHCP havuzunu boşaltın. DHCP kiralama süresini de gözden geçirin. Çok uzun kiralama süreleri, artık ağda olmayan cihazların IP adreslerini gereksiz yere meşgul tutmasına neden olur.

## DNS Sorunları

DNS, alan adlarını IP adreslerine çevirir. DNS sunucunuz yanıt vermediğinde internet "kopmuş" gibi görünür ama aslında bağlantı vardır, sadece site adresleri çözümlenemez.

Test etmek için Komut İstemi'nde şunu deneyin:

```
ping 8.8.8.8
```

Bu çalışıyor ama bir web sitesi açılmıyorsa sorun DNS'tedir. DNS sunucunuzu 8.8.8.8 (Google) veya 1.1.1.1 (Cloudflare) olarak değiştirmek geçici bir çözüm sağlar. Kalıcı çözüm için router üzerinden DNS ayarlarını değiştirin ki tüm ağ etkilensin.

## Güç Dalgalanmaları ve UPS İhtiyacı

Ofisteki elektrik şebekesi her zaman sabit değildir. Klima açılıp kapandığında, asansör çalıştığında veya binadaki başka cihazlar devreye girdiğinde kısa süreli voltaj düşüşleri yaşanabilir. Bu düşüşler modem ve switch gibi cihazları yeniden başlamaya zorlayabilir.

Çözüm basittir: modem, router ve switch'lerinizi bir UPS (kesintisiz güç kaynağı) ile besleyin. Küçük bir UPS bile bu cihazları voltaj dalgalanmalarından ve kısa süreli elektrik kesintilerinden korur. 600-800 VA kapasiteli bir UPS, ağ cihazlarınızı 15-20 dakika boyunca çalıştırabilir.

## Çift WAN ile Yedekli İnternet

İş sürekliliği kritikse, tek bir internet hattına bağımlı kalmak risklidir. Çift WAN (dual WAN) destekli bir router kullanarak iki farklı ISP'den hat alabilirsiniz. Ana hat koptuğunda yedek hat otomatik devreye girer ve internet kesintisi yaşanmaz.

Çift WAN yapılandırması iki modda çalışabilir:

Failover modunda bir hat birincil, diğeri yedektir. Birincil koptuğunda yedek devreye girer. Bu mod en yaygın kullanılan moddur.

Load balancing modunda iki hat aynı anda aktiftir ve trafik paylaştırılır. Bu mod hem redundancy hem de toplam bant genişliği artışı sağlar.

WiFi sorunları da internet kopması gibi algılanabilir. Kablolu bağlantıda sorun yokken WiFi üzerinden kopma yaşıyorsanız, [WiFi sinyali zayıf rehberimize](/blog/wifi-sinyali-zayif) bakın.

## Ağ Güvenliği ve Firewall

Bazen internet kopması gibi görünen sorun aslında firewall veya güvenlik yazılımının belirli trafiği engellemesinden kaynaklanır. Firewall kuralları yanlış yapılandırılmışsa meşru trafiği de engelleyebilir. [Küçük şirket firewall kurulumu rehberimiz](/blog/kucuk-sirket-firewall-kurulumu) bu konuda yardımcı olabilir.

## Kalıcı Çözüm: Profesyonel Ağ Altyapısı

Aralıklı internet kopmaları genellikle tek bir sebepten kaynaklanmaz. Kablo, switch, modem, ISP ve DHCP sorunlarının birleşimi olabilir. Kalıcı çözüm için ağ altyapısının bütünsel olarak değerlendirilmesi gerekir.

Kozyatağı Bilişim olarak şirketinizin ağ altyapısını analiz ediyor, sorunlu noktaları tespit ediyor ve kalıcı çözümler uyguluyoruz. Kablo altyapısından switch konfigürasyonuna, UPS kurulumundan çift WAN yapılandırmasına kadar tüm ihtiyaçlarınızı karşılıyoruz.

**Hemen arayın: [0541 636 77 75](tel:05416367775)**
**Web: [kozyatagibilisim.com](https://kozyatagibilisim.com)**

---

Bu rehberi de okuyun:

- [Ofiste İnternet Yavaş: Sebepleri ve Çözümleri](/blog/ofiste-internet-yavas)
- [WiFi Sinyali Zayıf: Çözüm Rehberi](/blog/wifi-sinyali-zayif)
- [Küçük Şirket Firewall Kurulumu](/blog/kucuk-sirket-firewall-kurulumu)
