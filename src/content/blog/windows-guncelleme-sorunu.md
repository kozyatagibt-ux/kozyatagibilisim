---
slug: windows-guncelleme-sorunu
title: "Windows Güncelleme Yapılmıyor: Takılan veya Başarısız Güncelleme Çözümleri"
type: cluster
pillar: 8
url: "/blog/windows-guncelleme-sorunu"
hedef_anahtar_kelime: "windows güncelleme yapılmıyor"
meta_title: "Windows Güncelleme Yapılmıyor: Takılan veya Başarısız Güncelleme Çözümleri | Kozyatağı Bilişim"
meta_description: "Windows güncelleme takılıyor, hata veriyor veya başarısız oluyor mu? Güncelleme sorunlarını adım adım çözme rehberi."
kelime_sayisi: "~1700"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Sabah bilgisayarınızı açtınız ve ekranda "Güncellemeler yükleniyor, bilgisayarınızı kapatmayın" yazıyor. 20 dakika geçti, yarım saat geçti, hala aynı ekran. Ya da güncelleme indiriliyor ama %47'de takıldı ve ilerlemiyor. Belki de "Güncelleme yüklenemedi, değişiklikler geri alınıyor" yazısını görüyorsunuz. Windows güncelleme sorunları, ofis bilgisayarlarında en sık karşılaşılan problemlerden biridir ve iş gününüzün yarısını çalabilir.

Bu rehberde Windows güncelleme sorunlarını adım adım nasıl çözeceğinizi, teknik bilgi gerektirmeyen yöntemlerle anlatacağız.

## Güncellemeler Neden Önemli?

Önce şunu bilelim: Windows güncellemeleri sadece "yeni özellik" eklemek için değildir. Güncellemelerin büyük çoğunluğu güvenlik açıklarını kapatır. Bu güvenlik güncellemelerini yüklemezseniz:

- Virüsler ve fidye yazılımları bilgisayarınıza daha kolay girebilir
- Hackerlar bilinen açıklardan yararlanabilir
- Şirket verileriniz tehlikeye girebilir

Yani "güncellemeyi ertele" demek bazen sorun çözer gibi görünür ama uzun vadede daha büyük sorunlara yol açabilir. [Fidye yazılımlarından korunma rehberimize](/blog/fidye-yazilimi-kobi-korunma) göz atarak güvenlik konusunda daha fazla bilgi alabilirsiniz.

## Önce Basit Kontrolleri Yapın

Güncelleme sorunu yaşıyorsanız, karmaşık çözümlere geçmeden önce şu basit kontrolleri yapın:

### 1. Bilgisayarı Yeniden Başlatın

Kulağa çok basit gelecek ama birçok güncelleme sorunu sadece bilgisayarı kapatıp açmakla çözülür. Bazen güncelleme arka planda takılmış olur ve yeniden başlatma bu tıkanıklığı giderir.

- Başlat menüsünden "Yeniden başlat" seçin (kapat değil, yeniden başlat)
- "Güncelle ve yeniden başlat" seçeneği varsa onu tercih edin
- Bilgisayar yeniden açıldıktan sonra tekrar güncelleme kontrolü yapın

### 2. Disk Alanını Kontrol Edin

Windows güncellemeleri yer kaplar. Eğer C: diskinde yeterli boş alan yoksa güncelleme başarısız olur. Kontrol etmek için:

1. Dosya Gezgini'ni açın (Windows + E)
2. "Bu Bilgisayar" bölümüne gidin
3. C: diskinin altında ne kadar boş alan olduğuna bakın
4. En az 15-20 GB boş alan olmalı

Yetersizse gereksiz dosyaları silin. Başlat menüsüne "Disk Temizleme" yazarak Windows'un kendi temizleme aracını kullanabilirsiniz. Bu araç geçici dosyaları, eski güncelleme dosyalarını ve çöp kutusunu temizler.

### 3. İnternet Bağlantınızı Kontrol Edin

Güncelleme dosyaları internetten indirilir. İnternet bağlantınız yavaş veya kesintiliyse güncelleme takılabilir:

- Tarayıcıda bir web sitesi açmayı deneyin
- İnternet yavaşsa modemizi yeniden başlatın
- Wi-Fi bağlantısı sorunluysa kablolu bağlantı deneyin

### 4. Tarifeli Bağlantı Ayarını Kontrol Edin

Windows'ta "tarifeli bağlantı" ayarı açıksa, güncellemeler otomatik indirilmez. Özellikle Wi-Fi bağlantısında bu ayar bazen açık kalabilir:

1. Ayarlar > Ağ ve İnternet > Wi-Fi bölümüne gidin
2. Bağlı olduğunuz ağın adına tıklayın
3. "Tarifeli bağlantı olarak ayarla" seçeneğinin kapalı olduğundan emin olun

## Güncelleme Sorun Gidericisini Çalıştırın

Windows'un kendi güncelleme sorun giderici aracı birçok sorunu otomatik tespit edip düzeltebilir:

1. Başlat menüsüne "Sorun giderme" yazın
2. "Sorun giderme ayarları" seçeneğini açın
3. "Diğer sorun gidericiler" bölümüne girin
4. "Windows Update" satırındaki "Çalıştır" düğmesine tıklayın
5. Araç çalışacak ve bulunan sorunları otomatik düzeltecek
6. İşlem bittiğinde bilgisayarı yeniden başlatın ve güncellemeyi tekrar deneyin

Bu araç çoğu zaman sorunu çözer. Çözmezse bir sonraki adıma geçin.

## Güncelleme Önbelleğini Temizleyin

Windows indirdiği güncelleme dosyalarını bir klasörde saklar. Bu dosyalar bozulmuşsa güncelleme sürekli başarısız olur. Önbelleği temizlemek sorunu çözebilir:

1. Başlat menüsüne "cmd" yazın
2. "Komut İstemi" üzerine sağ tıklayıp "Yönetici olarak çalıştır" seçin
3. Açılan siyah ekranda şu komutları sırayla yazıp her birinden sonra Enter'a basın:

```
net stop wuauserv
net stop bits
```

4. Şimdi Dosya Gezgini'ni açın ve şu klasöre gidin: `C:\Windows\SoftwareDistribution\Download`
5. Bu klasörün içindeki tüm dosya ve klasörleri silin (klasörün kendisini değil, içindekileri)
6. Tekrar komut istemine dönün ve şu komutları yazın:

```
net start wuauserv
net start bits
```

7. Bilgisayarı yeniden başlatın ve güncellemeyi tekrar deneyin

Bu işlem güncelleme dosyalarının sıfırdan indirilmesini sağlar. Bozuk dosya sorunu varsa bu adım çözer.

## Manuel Güncelleme Yükleme

Belirli bir güncelleme sürekli başarısız oluyorsa, o güncellemeyi Microsoft'un web sitesinden manuel olarak indirip yükleyebilirsiniz:

1. Başarısız olan güncellemenin KB numarasını öğrenin: Ayarlar > Windows Update > Güncelleştirme Geçmişi bölümünde hangi güncellemenin başarısız olduğunu ve KB numarasını (örneğin KB5034441) görebilirsiniz.

2. Tarayıcıda "Microsoft Update Catalog" sitesine gidin: catalog.update.microsoft.com

3. Arama kutusuna KB numarasını yazın

4. İşletim sisteminize uygun güncellemeyi bulup "İndir" düğmesine tıklayın

5. İndirilen dosyayı çalıştırıp güncellemeyi yükleyin

6. Bilgisayarı yeniden başlatın

## Kurumsal Ortamda WSUS Sorunu

Eğer şirketinizde IT ekibi varsa ve bilgisayarlar merkezi olarak yönetiliyorsa, güncellemeler muhtemelen WSUS (Windows Server Update Services) üzerinden dağıtılıyordur. Bu durumda:

- Güncellemeler doğrudan Microsoft'tan değil, şirket sunucusundan gelir
- WSUS sunucusu çalışmıyorsa veya doluysa güncellemeler gelmez
- IT ekibinin bazı güncellemeleri onaylamamış olması mümkündür

Bu durumda yapmanız gereken şey IT ekibinize bildirmektir. Bireysel olarak bu sorunu çözmeniz pek mümkün değildir.

## Güncelleme Takıldıysa Ne Yapmalı?

Eğer bilgisayar güncelleme ekranında takılmışsa ve uzun süredir ilerleme yoksa:

### Yüzde Ekranında Takılma

"Güncelleme yükleniyor %XX" ekranında takıldıysanız:

1. **En az 2 saat bekleyin.** Bazen büyük güncellemeler gerçekten uzun sürer ve ilerleme çubuğu uzun süre hareket etmez.
2. 2 saatten fazla beklemenize rağmen ilerleme yoksa, bilgisayarın güç düğmesine 10 saniye basılı tutarak kapatın.
3. Bilgisayarı tekrar açın. Windows "değişiklikler geri alınıyor" mesajı gösterebilir — bu normaldir.
4. Bilgisayar açıldıktan sonra yukarıdaki adımları (önbellek temizleme, sorun giderici) uygulayın.

### "Değişiklikler Geri Alınıyor" Döngüsü

Bazı bilgisayarlar sürekli güncelleme yüklemeye çalışır, başarısız olur, geri alır, yeniden dener — döngüye girer. Bu durumda:

1. Güncelleme önbelleğini temizleyin (yukarıdaki adımlar)
2. Sorunlu güncellemeyi gizleyin: Microsoft'un "Show or Hide Updates" aracını indirip çalıştırın, sorunlu güncellemeyi gizleyin
3. Bir sonraki toplu güncellemeyi bekleyin — genelde Microsoft bir sonraki ayın güncellemesinde sorunu düzeltir

## Güncelleme Hataları ve Kodları

Windows güncelleme hata kodu veriyorsa bu kodu not edin. Sık karşılaşılan hatalar:

- **0x80070002 veya 0x80070003:** Güncelleme dosyaları eksik veya bozuk. Önbellek temizleme genelde çözer.
- **0x800f0922:** Disk alanı yetersiz veya VPN bağlıyken sorun oluyor. VPN'i kapatıp deneyin.
- **0x80073712:** Sistem dosyaları bozulmuş. Komut isteminde `sfc /scannow` komutunu çalıştırın.
- **0x80240034:** Güncelleme dosyası bozuk indirilmiş. Önbellek temizleme ile çözülür.
- **0x80070005:** İzin sorunu. Yönetici hesabıyla oturum açtığınızdan emin olun.

Hata kodunu internette arattığınızda genelde Microsoft'un resmi çözüm sayfası çıkar.

## Güncellemeleri Nasıl Yönetirsiniz?

Güncelleme sorunlarını yaşamamak için birkaç öneri:

### Güncellemeleri Ertelemeyin

Windows "güncellemeyi 7 gün ertele" seçeneği sunar. Bunu alışkanlık haline getirmeyin. Ne kadar çok ertelerseniz, birikmiş güncellemeler o kadar büyük olur ve sorun çıkma olasılığı artar.

### Mesai Dışında Güncelleme Yapın

Windows'a güncelleme zamanlarını söyleyebilirsiniz: Ayarlar > Windows Update > Etkin saatler bölümünden çalışma saatlerinizi belirleyin. Windows bu saatlerde güncelleme için yeniden başlatma yapmaz, mesai dışında yapar.

### Düzenli Olarak Disk Alanı Temizleyin

Ayda bir "Disk Temizleme" aracını çalıştırın. Gereksiz dosyalar biriktiğinde hem bilgisayar yavaşlar hem güncelleme sorunları artar. [Bilgisayar yavaşlığı konusunda daha fazla çözüm için bu rehbere bakın](/blog/bilgisayar-cok-yavas-ne-yapmali).

## Profesyonel Destek Ne Zaman Gerekli?

Şu durumlarda profesyonel yardım almanız gerekir:

- Güncelleme sorunu haftalardır çözülmüyorsa
- Bilgisayar güncelleme döngüsüne girip çıkamıyorsa
- Aynı sorun birden fazla bilgisayarda yaşanıyorsa
- Kurumsal ortamda WSUS veya grup ilkesi sorunları varsa
- Windows sistem dosyaları bozulmuşsa

**Kozyatağı Bilişim** olarak ofis bilgisayarlarınızın güncelleme yönetimini merkezi olarak yapıyoruz. Tüm bilgisayarların güncel ve güvenli olmasını sağlıyor, güncelleme sorunlarını iş saatlerinizi etkilemeden çözüyoruz. Yönetilen IT hizmetleri kapsamında güncelleme takibi standart hizmetimizdir.

Güncelleme sorunlarınız için bize ulaşın: **0541 636 77 75** | [kozyatagibilisim.com](https://kozyatagibilisim.com)

---

## Bu Rehberi de Okuyun:

- [Bilgisayar Çok Yavaş, Ne Yapmalı?](/blog/bilgisayar-cok-yavas-ne-yapmali)
- [Windows Mavi Ekran Hatası Çözüm Rehberi](/blog/windows-mavi-ekran)
- [Fidye Yazılımından Korunma Rehberi](/blog/fidye-yazilimi-kobi-korunma)
