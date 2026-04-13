---
slug: evden-calisma-bilgisayar-guvenligi
title: "Evden Çalışırken Bilgisayar Güvenliği: 10 Altın Kural"
type: cluster
pillar: 2
url: "/blog/evden-calisma-bilgisayar-guvenligi"
hedef_anahtar_kelime: "evden çalışma bilgisayar güvenliği"
meta_description: "Evden çalışırken şirket verilerini nasıl korursunuz? VPN, güçlü şifre, güncellemeler ve 10 pratik güvenlik kuralı."
kelime_sayisi: "~1700"
pillar_linki: "/kobi-siber-guvenlik"
---

Sabah pijamalarınızla kahvenizi aldınız, bilgisayarın başına oturdunuz ve çalışmaya başladınız. Evden çalışmak rahat, pratik ve artık birçok şirket için normal. Ama bir gerçek var ki çoğu kişi bunu düşünmüyor: evde çalışırken şirket verileriniz, ofistekinden çok daha savunmasız durumda. Ofiste IT ekibi, güvenlik duvarı, kurumsal antivirüs ve kontrollü ağ sizi korur. Evde ise bu korumaların çoğu yok. Evinizin WiFi'sı, çocukların tablet'i ve sizin iş bilgisayarınız aynı ağda. Bu yazıda evden çalışırken bilgisayar güvenliğinizi sağlamak için uygulamanız gereken 10 altın kuralı anlatıyoruz. Teknik bilgi gerektirmeyen, herkesin yapabileceği adımlar.

## Kural 1: Ev WiFi Şifrenizi Güçlendirin

Evinizin WiFi şifresi "12345678" veya "internet123" gibi bir şey mi? O zaman ilk iş bunu değiştirmek. Ev WiFi'nız iş bilgisayarınızın internete çıkış kapısıdır. Şifre zayıfsa, komşunuz veya yakındaki biri ağınıza sızabilir ve trafiğinizi izleyebilir.

### Ne yapmalısınız:

1. Modem yönetim paneline girin (genelde tarayıcıda 192.168.1.1 yazarak).
2. WiFi şifrenizi en az 12 karakter, büyük-küçük harf, rakam ve özel karakter içerecek şekilde değiştirin.
3. Şifreleme türünü WPA3 veya en azından WPA2 olarak ayarlayın. WEP kesinlikle kullanmayın.
4. Modem yönetim panelinin varsayılan şifresini de değiştirin (genelde "admin/admin" olarak gelir).

WiFi güvenliği hakkında daha ayrıntılı bilgi için [şirket WiFi güvenliği](/blog/sirket-wifi-guvenligi) rehberimizi okuyun.

## Kural 2: VPN Kullanın

VPN (Sanal Özel Ağ), bilgisayarınız ile şirket ağı arasında şifreli bir tünel oluşturur. Bu tünelden geçen veriler dışarıdan okunamaz. Evden çalışırken şirket dosyalarına, sunuculara veya iç sistemlere erişiyorsanız, mutlaka VPN kullanmalısınız.

### Ne yapmalısınız:

1. Şirketinizin IT birimi veya IT destek sağlayıcısından VPN erişimi isteyin.
2. Size verilen VPN yazılımını bilgisayarınıza kurun.
3. Her çalışma oturumunda VPN'i açarak bağlanın.
4. VPN bağlantısı kesilirse, şirket verilerine erişmeyi durdurun ve tekrar bağlanana kadar bekleyin.

Şirketinizde VPN henüz kurulu değilse, [uzaktan çalışan VPN kurulumu](/blog/uzaktan-calisan-vpn-kurulumu) rehberimiz yol gösterici olacaktır.

## Kural 3: Güçlü ve Benzersiz Şifreler Kullanın

Şifre güvenliği basit gibi görünse de, veri ihlallerinin büyük çoğunluğu zayıf veya tekrar kullanılan şifrelerden kaynaklanır. "Ayse1990" veya "sifre123" gibi şifreler saniyeler içinde kırılabilir.

### Ne yapmalısınız:

1. Her hesap için farklı bir şifre kullanın. E-posta şifreniz ile banka şifreniz aynı olmasın.
2. Şifreler en az 12 karakter uzunluğunda olsun.
3. Büyük harf, küçük harf, rakam ve özel karakter karışımı kullanın.
4. Şifreleri aklınızda tutamıyorsanız bir şifre yöneticisi kullanın. Bitwarden, 1Password veya KeePass gibi araçlar tüm şifrelerinizi güvenli bir kasada saklar.
5. Şifrelerinizi asla bir kağıda veya bilgisayardaki bir metin dosyasına yazmayın.

## Kural 4: İki Faktörlü Doğrulama (2FA) Açın

İki faktörlü doğrulama, şifrenizin yanına ikinci bir güvenlik katmanı ekler. Şifrenizi bilseler bile, telefonunuza gelen kodu olmadan hesabınıza giremezler.

### Ne yapmalısınız:

1. E-posta hesabınızda (Outlook, Gmail) 2FA'yı aktif edin.
2. Şirket uygulamalarında varsa 2FA'yı açın.
3. SMS yerine authenticator uygulaması tercih edin (Microsoft Authenticator veya Google Authenticator). SMS ele geçirilebilir, ama authenticator uygulaması çok daha güvenlidir.
4. Yedek kodlarınızı güvenli bir yerde saklayın. Telefonunuzu kaybederseniz hesabınıza geri dönmeniz gerekir.

## Kural 5: Phishing (Oltalama) Saldırılarına Karşı Dikkatli Olun

Phishing, sizi kandırarak şifrenizi, kredi kartı bilginizi veya şirket verilerinizi çalmaya çalışan sahte e-postalardır. "Hesabınız askıya alındı", "Faturanız ekte", "Şifrenizi hemen değiştirin" gibi acil görünen mesajlarla gelirler.

### Ne yapmalısınız:

1. E-postadaki bağlantılara tıklamadan önce fare ile üzerine gelin ve gerçek adresi kontrol edin. Bağlantı garip görünüyorsa tıklamayın.
2. Beklemediğiniz bir ek dosya geldiyse açmayın. Göndereni arayıp doğrulayın.
3. "Acil" veya "hemen" gibi panik yaratan ifadelere karşı temkinli olun. Gerçek kurumlar sizi bu kadar sıkıştırmaz.
4. Şüpheli bir e-posta aldığınızda IT ekibinize veya IT destek sağlayıcınıza bildirin.

Phishing konusunda daha detaylı bilgi için [phishing engelleme rehberimizi](/blog/eposta-phishing-engelleme) okuyun.

## Kural 6: Kişisel ve İş Cihazlarını Ayırın

Çocuğunuzun oyun indirdiği bilgisayarda şirket dosyalarını açmak büyük risk taşır. Kişisel cihazlarda güvenlik kontrolleri genelde daha zayıftır ve zararlı yazılım bulaşma ihtimali çok daha yüksektir.

### Ne yapmalısınız:

1. Mümkünse iş için ayrı bir bilgisayar kullanın. Şirketinizden iş bilgisayarı talep edin.
2. İş bilgisayarında kişisel işlemler yapmaktan kaçının. Sosyal medya, alışveriş, oyun gibi aktiviteleri kişisel cihazınızda yapın.
3. Aile üyelerinin iş bilgisayarınızı kullanmasına izin vermeyin.
4. İş dosyalarını kişisel USB belleklere kopyalamayın.

## Kural 7: Bilgisayarınızı Kilitli Bırakın

Evde yalnız olsanız bile, bilgisayarınızı terk ettiğinizde ekranı kilitleme alışkanlığı edinin. Çocuklar yanlışlıkla bir dosyayı silebilir, misafirler ekranınızı görebilir veya bir anlık dikkatsizlik veri kaybına yol açabilir.

### Ne yapmalısınız:

1. Windows'ta ekranı kilitlemek için **Windows tuşu + L** tuşlarına basın. Bu kadar basit.
2. Bilgisayarı 5 dakika kullanılmadığında otomatik kilitlemeye ayarlayın: Ayarlar > Hesaplar > Oturum açma seçenekleri.
3. Kilit ekranına güçlü bir şifre veya PIN koyun.
4. Toplantı sırasında bile (video görüşmede ekran paylaşırken) masaüstünüzde hassas dosyaların açık olmadığından emin olun.

## Kural 8: Bulut Yedekleme Yapın

Evde çalışırken bilgisayarınız bozulursa, çalınırsa veya bir virüs dosyalarınızı şifrelerse ne olacak? Yedeklemeniz yoksa cevap çok acı: hiçbir şey yapılamaz.

### Ne yapmalısınız:

1. İş dosyalarınızı OneDrive, Google Drive veya şirketinizin kullandığı bulut hizmetine kaydedin.
2. Dosyaları sadece masaüstüne veya "Belgelerim" klasörüne kaydetmeyin. Bunlar bulutla otomatik senkronize olmuyor olabilir.
3. Haftada bir kez yedeklemenin çalıştığını kontrol edin. Bulut uygulamasının senkronize olduğundan emin olun.
4. Fidye yazılımına karşı ek koruma olarak, kritik dosyaların ayrı bir yedeğini de tutun.

Yedekleme stratejisi hakkında [3-2-1 yedekleme kuralı](/blog/3-2-1-yedekleme-kurali) yazımız çok faydalı olacaktır.

## Kural 9: Halka Açık WiFi Kullanmaktan Kaçının

Kafede, havalimanında veya otelde WiFi'ye bağlanıp çalışmak cazip gelebilir. Ama halka açık WiFi ağları güvenlik açısından en tehlikeli ortamlardandır. Bu ağlarda trafiğiniz kolayca izlenebilir, şifreleriniz ele geçirilebilir.

### Ne yapmalısınız:

1. Halka açık WiFi'da kesinlikle iş e-postanıza veya şirket sistemlerine girmeyin.
2. Mecbursanız mutlaka VPN kullanın.
3. En güvenli alternatif telefonunuzun mobil veri bağlantısını hotspot olarak kullanmaktır.
4. Halka açık WiFi'ya bağlandıysanız "unutma" seçeneği ile çıkın, otomatik bağlanma kalmasın.

## Kural 10: Güncellemeleri Ertelemeyin

"Şimdi değil, sonra hatırlat" düğmesine herkes basıyor. Ama güncellemeler sadece yeni özellik getirmez, çoğunlukla güvenlik açıklarını kapatır. Güncellemeyı ertelemek, kapınızı açık bırakmak gibidir.

### Ne yapmalısınız:

1. Windows Update'i düzenli olarak çalıştırın. Haftada bir kontrol edin.
2. Tarayıcınızı (Chrome, Edge, Firefox) güncel tutun. Tarayıcılar en çok saldırıya uğrayan yazılımlardandır.
3. Office programlarınızı güncelleyin.
4. Antivirüs yazılımınızın güncel olduğundan emin olun.
5. Güncelleme bildirimlerini "sonra" yapmak yerine öğle arasında veya iş bitiminde uygulayın.

## Bonus: USB Bellek Riskleri

Birisi size bir USB bellek verdi. İçinde "toplantı notları" olduğunu söyledi. Bu USB belleği bilgisayarınıza takmadan önce iki kez düşünün. USB bellekler zararlı yazılım taşıyabilir ve bilgisayara takıldığı anda otomatik çalışabilir.

### Ne yapmalısınız:

1. Kaynağını bilmediğiniz USB bellekleri bilgisayarınıza takmayın.
2. Dosya paylaşımı için USB yerine bulut bağlantıları (OneDrive, Google Drive) kullanın.
3. Eğer USB kullanmak zorundaysanız, önce antivirüs taramasından geçirin.

## Evden Çalışma Güvenlik Kontrol Listesi

Hızlı bir kontrol yapalım. Aşağıdakilerin hepsini yapıyor musunuz?

- Ev WiFi şifrem güçlü ve WPA2/WPA3 kullanıyorum
- VPN ile şirket ağına bağlanıyorum
- Her hesabım için farklı ve güçlü şifre kullanıyorum
- 2FA aktif
- Şüpheli e-postalara dikkat ediyorum
- İş ve kişisel cihazlarımı ayırıyorum
- Bilgisayarımı terk ettiğimde kilitleiyorum
- Dosyalarımı buluta yedekliyorum
- Halka açık WiFi kullanmıyorum veya VPN ile kullanıyorum
- Güncellemelerimi ertelemiyorum

Bu listede eksik olan varsa, bugün tamamlayın. Her bir adım tek başına küçük görünebilir ama hepsi bir arada büyük bir güvenlik kalkanı oluşturur.

## Şirketiniz İçin Uzaktan Çalışma Güvenliği Desteği

Evden çalışan ekibiniz var ve güvenlik konusunda endişeleriniz mi var? Kozyatağı Bilişim olarak şirketlere uzaktan çalışma güvenlik altyapısı kuruyoruz. VPN yapılandırması, cihaz güvenlik politikaları, yedekleme sistemleri ve çalışan eğitimi dahil kapsamlı çözümler sunuyoruz. Bizi hemen arayın: **0541 636 77 75** veya [kozyatagibilisim.com](https://kozyatagibilisim.com) adresinden bize ulaşın.

## Bu Rehberi de Okuyun:

- [E-Posta Hesabım Hacklendi, Ne Yapmalıyım?](/blog/eposta-hesabim-hacklendi)
- [Fidye Yazılımından Korunma Rehberi](/blog/fidye-yazilimi-kobi-korunma)
- [VPN Bağlanmıyor: Çözüm Rehberi](/blog/vpn-baglanmiyor)
