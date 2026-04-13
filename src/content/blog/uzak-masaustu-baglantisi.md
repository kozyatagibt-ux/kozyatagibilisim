---
slug: uzak-masaustu-baglantisi
title: "Uzak Masaüstü Bağlantısı Nasıl Kurulur? Evden Ofis Bilgisayarına Erişim"
type: cluster
pillar: 6
url: "/blog/uzak-masaustu-baglantisi"
hedef_anahtar_kelime: "uzak masaüstü bağlantısı"
meta_title: "Uzak Masaüstü Bağlantısı Nasıl Kurulur? Adım Adım Rehber | Kozyatağı Bilişim"
meta_description: "Evden ofis bilgisayarınıza bağlanmak mı istiyorsunuz? Windows Uzak Masaüstü, AnyDesk ve TeamViewer ile adım adım kurulum rehberi."
kelime_sayisi: "~1700"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Sabah ofise geldiniz, bilgisayarınızda önemli bir dosya üzerinde çalıştınız. Akşam eve gittiniz ve o dosyaya tekrar bakmanız gerekiyor. Ya da evden çalışıyorsunuz ve ofisteki bilgisayarda kurulu olan muhasebe programına erişmeniz lazım. Tam olarak bu an "keşke evden ofis bilgisayarımı açabilsem" dediğiniz andır. İşte uzak masaüstü bağlantısı tam olarak bunu yapar: evdeki bilgisayarınızın ekranında ofisteki bilgisayarınızı görürsünüz, farenizi ve klavyenizi kullanarak sanki ofiste oturuyormuşsunuz gibi çalışırsınız.

Bu rehberde uzak masaüstü bağlantısını kurmanın farklı yollarını, her birinin avantaj ve dezavantajlarını ve güvenlik açısından nelere dikkat etmeniz gerektiğini anlatacağız.

## Uzak Masaüstü Nedir?

Uzak masaüstü, bir bilgisayarın ekranını başka bir bilgisayardan görüp kontrol etme teknolojisidir. Ofisteki bilgisayarınız açık ve internete bağlı olduğu sürece, dünyanın herhangi bir yerinden o bilgisayarı kullanabilirsiniz. Ekranınızda ofisteki bilgisayarın masaüstünü görürsünüz. Fare hareketleriniz ve klavye girişleriniz ofisteki bilgisayara gider. Sanki ofiste oturuyorsunuz gibi çalışırsınız.

Bunun üç yaygın yolu var: Windows'un kendi Uzak Masaüstü özelliği (RDP), AnyDesk ve TeamViewer. Her birini ayrı ayrı anlatacağız.

## Yöntem 1: Windows Uzak Masaüstü (RDP)

Windows'un kendi içinde gelen bu özellik en güvenilir ve en hızlı yöntemdir. Ancak bir şartı var: ofisteki bilgisayarda Windows Pro, Enterprise veya Education sürümü olmalı. Windows Home sürümünde bu özellik bulunmaz.

### Ofisteki Bilgisayarda Yapılacaklar (Bağlanılacak Bilgisayar)

1. **Windows sürümünü kontrol edin:** Başlat menüsüne "Sistem bilgisi" yazın ve açın. "İşletim sistemi adı" satırında "Pro" veya "Enterprise" yazıyorsa devam edebilirsiniz. "Home" yazıyorsa bu yöntemi kullanamazsınız, AnyDesk veya TeamViewer'a geçin.

2. **Uzak Masaüstü'nü aktif edin:**
   - Başlat menüsünden "Ayarlar"ı açın
   - "Sistem" bölümüne girin
   - Sol menüden "Uzak Masaüstü" seçin
   - "Uzak Masaüstü'nü Etkinleştir" düğmesini açık konuma getirin
   - Onay penceresi gelecek, "Onayla" deyin

3. **Bilgisayar adını not edin:** Aynı sayfada "Bu bilgisayar adı" altında bilgisayarın adını göreceksiniz. Bunu not edin, bağlanırken lazım olacak. Ayrıca bilgisayarın IP adresini de öğrenin: komut istemini açın (Windows + R, "cmd" yazıp Enter), "ipconfig" yazıp Enter'a basın. "IPv4 Address" satırındaki numarayı not edin.

4. **Bilgisayarın uyku moduna girmemesini sağlayın:** Ayarlar > Sistem > Güç bölümünde "Ekran kapatma" süresini ayarlayabilirsiniz ama "Uyku" modunu "Hiçbir zaman" olarak ayarlayın. Bilgisayar uyursa uzaktan bağlanamazsınız.

### Evdeki Bilgisayardan Bağlanma

1. Başlat menüsüne "Uzak Masaüstü Bağlantısı" yazın ve açın
2. "Bilgisayar" alanına ofisteki bilgisayarın IP adresini veya adını yazın
3. "Bağlan" düğmesine tıklayın
4. Ofisteki bilgisayarın kullanıcı adı ve şifresini girin
5. Sertifika uyarısı gelirse "Evet" deyin
6. Artık ofisteki bilgisayarın masaüstünü görüyorsunuz

**Dikkat:** Bu yöntem sadece aynı ağda (yani ofisteyken başka bir bilgisayara bağlanma gibi) doğrudan çalışır. Evden ofise bağlanmak için VPN kullanmanız veya port yönlendirme yapmanız gerekir. VPN konusunu birazdan anlatacağız.

## Yöntem 2: AnyDesk

AnyDesk, kurulumu çok kolay olan ve VPN gerektirmeden evden ofise bağlanmanızı sağlayan bir programdır. Küçük ofisler için en pratik çözümdür.

### Kurulum Adımları

1. **Her iki bilgisayara da AnyDesk kurun:** anydesk.com adresine gidip programı hem ofisteki hem evdeki bilgisayara indirin ve kurun.

2. **Ofisteki bilgisayarda şifre ayarlayın:**
   - AnyDesk'i açın
   - Sağ üstteki menüden "Ayarlar"a girin
   - "Güvenlik" bölümüne gelin
   - "Katılımsız erişim" altında bir şifre belirleyin
   - Bu şifre sayesinde ofiste kimse olmasa bile bilgisayara bağlanabileceksiniz

3. **AnyDesk ID'sini not edin:** Programın ana ekranında 9 veya 10 haneli bir numara göreceksiniz. Bu, ofisteki bilgisayarın AnyDesk adresidir.

4. **Evden bağlanın:**
   - Evdeki bilgisayarda AnyDesk'i açın
   - "Uzak Masa" alanına ofisteki bilgisayarın AnyDesk ID'sini yazın
   - "Bağlan" butonuna tıklayın
   - Belirlediğiniz şifreyi girin
   - Bağlantı kuruldu

AnyDesk bireysel kullanım için ücretsizdir. Ticari kullanım için lisans gerekir (yılda yaklaşık birkaç yüz dolar).

## Yöntem 3: TeamViewer

TeamViewer, AnyDesk'e çok benzer ve yıllardır kullanılan popüler bir programdır. Kurulum mantığı aynıdır:

1. Her iki bilgisayara TeamViewer kurun
2. Ofisteki bilgisayarda katılımsız erişim ayarlayın
3. TeamViewer ID ve şifresini not edin
4. Evden TeamViewer ID ile bağlanın

TeamViewer de bireysel kullanım için ücretsizdir ancak ticari kullanımda sık bağlanıyorsanız "ticari kullanım tespit edildi" uyarısı vererek bağlantıyı kısa sürede kesebilir. Bu durumda lisans satın almanız gerekir.

## Hangisini Seçmeliyim?

| Durum | Önerilen Yöntem |
|---|---|
| Şirket ağında, IT ekibi var | Windows RDP + VPN |
| Küçük ofis, basit ihtiyaç | AnyDesk |
| Ara sıra bağlanma, destek amaçlı | TeamViewer |
| Yüksek güvenlik gerekli | Windows RDP + VPN |
| Farklı işletim sistemleri (Mac-Windows) | AnyDesk veya TeamViewer |

## Güvenlik: Çok Önemli Uyarılar

Uzak masaüstü bağlantısı çok kullanışlıdır ama güvenlik açısından dikkat etmezseniz bilgisayarınıza yetkisiz kişiler de erişebilir. Şu kurallara mutlaka uyun:

### Port Yönlendirme Yapmayın

Bazı internet kaynakları "modemden 3389 portunu açın" der. Bunu asla yapmayın. RDP portunu internete açmak, bilgisayarınızı tüm dünyaya "buyurun girin" diye açmak gibidir. Hackerlar sürekli bu portu tarar ve kaba kuvvet saldırısı ile şifrenizi kırmaya çalışır.

### VPN Kullanın

Evden ofise güvenli bağlantı kurmanın doğru yolu VPN kullanmaktır. VPN, evdeki bilgisayarınızla ofis ağı arasında şifreli bir tünel kurar. VPN bağlandıktan sonra RDP ile ofisteki bilgisayara bağlanabilirsiniz. Böylece RDP portu internete açık olmaz, sadece VPN tüneli üzerinden erişilir. [VPN bağlantı sorunları için bu rehbere bakın](/blog/vpn-baglanmiyor).

### Güçlü Şifre Kullanın

Uzak masaüstü şifreniz "123456" veya "sifre123" gibi kolay tahmin edilebilir şeyler olmasın. En az 12 karakter, büyük-küçük harf, rakam ve özel karakter içeren bir şifre kullanın. AnyDesk veya TeamViewer'da katılımsız erişim şifresi de aynı şekilde güçlü olmalıdır.

### İki Faktörlü Doğrulama Açın

AnyDesk ve TeamViewer'da iki faktörlü doğrulama (2FA) açabilirsiniz. Bu sayede sadece şifreyi bilmek yetmez, telefonunuza gelen kodu da girmeniz gerekir. Ekstra bir güvenlik katmanıdır.

### Kullanmadığınızda Kapatın

Evden çalışmayı bitirdiğinizde uzak masaüstü bağlantısını kapatın. AnyDesk veya TeamViewer'ı sürekli açık bırakmak gereksiz bir risk oluşturur. Eğer her gün kullanmıyorsanız, programı sadece ihtiyaç olduğunda açın.

## Sık Karşılaşılan Sorunlar

### "Bilgisayara bağlanılamıyor" Hatası

- Ofisteki bilgisayar kapalı veya uyku modunda olabilir
- Internet bağlantısı olmayabilir (ofisin interneti kesilmiş olabilir)
- Güvenlik duvarı (firewall) bağlantıyı engelliyor olabilir
- AnyDesk/TeamViewer programı kapanmış olabilir

### Bağlantı Çok Yavaş

- Evdeki veya ofisteki internet yavaşsa görüntü kalitesini düşürün
- AnyDesk ayarlarından "Performans" modunu seçin
- Arka planda büyük dosya indirme veya video izleme varsa durdurun
- [Internet yavaşlığı konusunda genel çözümler için bu rehbere bakın](/blog/ofiste-internet-yavas)

### Ekran Çözünürlüğü Uymuyor

RDP bağlantısında bağlantı penceresi açılmadan önce "Seçenekleri Göster" diyerek "Ekran" sekmesinden çözünürlüğü ayarlayabilirsiniz. AnyDesk'te ise bağlantı sırasında üst menüden ekran ayarlarını değiştirebilirsiniz.

## Ofis Genelinde Uzak Erişim Nasıl Planlanır?

Eğer şirketinizde birden fazla çalışan evden çalışıyorsa, her birinin ayrı ayrı AnyDesk veya TeamViewer kurması yerine merkezi bir çözüm düşünmek daha mantıklıdır:

1. **VPN sunucusu kurun** — tüm çalışanlar VPN ile ofis ağına bağlansın
2. **RDP ile kendi bilgisayarlarına erişsin** — VPN bağlandıktan sonra herkes kendi bilgisayarını kullansın
3. **Merkezi yönetim yapın** — kimin ne zaman bağlandığını takip edebilirsiniz

Bu tür bir yapı kurmak teknik bilgi gerektirir. [Uzaktan çalışan VPN kurulumu rehberimiz](/blog/uzaktan-calisan-vpn-kurulumu) size genel bir bakış verebilir.

## Profesyonel Destek

Uzak masaüstü bağlantısı bireysel olarak kurulabilir ama ofis genelinde güvenli ve yönetilebilir bir uzak erişim sistemi kurmak profesyonel destek gerektirir. Yanlış yapılandırılmış bir uzak erişim, şirket verilerinizi ciddi tehlikeye atar.

**Kozyatağı Bilişim** olarak şirketiniz için güvenli uzak erişim çözümleri kuruyoruz. VPN altyapısından RDP yapılandırmasına, güvenlik politikalarından çalışan eğitimine kadar tüm süreci yönetiyoruz.

Uzak erişim çözümü için bize ulaşın: **0541 636 77 75** | [kozyatagibilisim.com](https://kozyatagibilisim.com)

---

## Bu Rehberi de Okuyun:

- [VPN Bağlanmıyor: 8 Yaygın Sebep ve Çözümler](/blog/vpn-baglanmiyor)
- [Uzaktan Çalışan VPN Kurulumu Rehberi](/blog/uzaktan-calisan-vpn-kurulumu)
- [Şirket Wi-Fi Güvenliği Rehberi](/blog/sirket-wifi-guvenligi)
