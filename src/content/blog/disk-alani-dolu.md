---
slug: disk-alani-dolu
title: "Disk Alanı Dolu Uyarısı: C Diski Nasıl Boşaltılır? Güvenli Temizleme Rehberi"
type: cluster
pillar: 5
url: "/blog/disk-alani-dolu"
hedef_anahtar_kelime: "disk alanı dolu"
meta_title: "Disk Alanı Dolu — C Diski Güvenli Temizleme Rehberi 2026 | Kozyatağı Bilişim"
meta_description: "C diski dolmuş, bilgisayar yavaşladı mı? Disk alanı güvenli şekilde nasıl boşaltılır? Silmemeniz gereken dosyalar ve kalıcı çözümler."
kelime_sayisi: "~1700"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Ekranın sağ alt köşesinde bir uyarı belirdi: "Disk alanı düşük." C: sürücünüz kırmızıya dönmüş. Bir dosya kaydetmeye çalışıyorsunuz ama "yeterli alan yok" hatası alıyorsunuz. Bilgisayar her geçen gün biraz daha yavaşlıyor. Bu durumu yaşayan herkes aynı soruyu sorar: "Ben bu kadar dosya mı yükledim? Nereye gitti bu alan?" Aslında disk alanınızı dolduran şeylerin çoğu sizin yüklediğiniz dosyalar değildir. Windows'un kendisi, geçici dosyalar, eski güncellemeler ve görünmeyen sistem dosyaları zamanla birikirek diskinizi doldurur. Bu yazıda adım adım ve güvenli şekilde disk alanı nasıl açılır anlatacağız. Hangi dosyaları silebilirsiniz, hangilerine kesinlikle dokunmamalısınız — hepsini ele alacağız.

## Neden Disk Doluyor?

Disk dolmasının ana sebepleri:

- **Geçici dosyalar:** Windows ve programlar çalışırken geçici dosyalar oluşturur. Bunlar zamanla birikir
- **İndirilenler klasörü:** İnternetten indirdiğiniz her dosya burada birikir ve çoğu insan bu klasörü hiç temizlemez
- **Windows güncelleme artıkları:** Her büyük güncelleme eski sürümün yedeğini tutar (Windows.old klasörü)
- **Geri Dönüşüm Kutusu:** Sildiğiniz dosyalar aslında hala diskte yer kaplar
- **Program önbellekleri:** Tarayıcılar, e-posta programları ve diğer uygulamalar önbellek dosyalarıyla disk yer

## Adım 1: Disk Durumunuzu Kontrol Edin

Önce ne kadar alanınız kaldığını görelim:

1. "Bu Bilgisayar" (veya "Bilgisayarım") simgesine çift tıklayın
2. C: sürücüsüne bakın — altında ne kadar boş alan kaldığı yazar
3. Eğer çubuk kırmızıysa, ciddi bir doluluk var demektir

Genel kural: C: sürücüsünde en az %15-20 boş alan olmalıdır. Bu alandan azsa bilgisayar yavaşlar, [donmalar](/blog/bilgisayar-surekli-donuyor) yaşanır ve hatta bazı programlar çalışmayı reddeder.

## Adım 2: Geri Dönüşüm Kutusunu Boşaltın

En kolay adım. Sildiğiniz dosyalar aslında Geri Dönüşüm Kutusu'na gider ve orada yer kaplamaya devam eder.

1. Masaüstündeki "Geri Dönüşüm Kutusu" simgesine sağ tıklayın
2. "Geri Dönüşüm Kutusunu Boşalt" seçin
3. Onaylayın

Dikkat: Boşalttıktan sonra bu dosyaları geri getiremezsiniz. Emin olmadığınız dosyalar varsa önce kutuyu açıp kontrol edin.

## Adım 3: İndirilenler Klasörünü Temizleyin

İnternetten indirdiğiniz her dosya varsayılan olarak "İndirilenler" (Downloads) klasörüne kaydedilir. Yıllar içinde bu klasör devasa boyutlara ulaşabilir.

1. Dosya Gezgini'ni açın (Windows + E)
2. Sol panelden "İndirilenler" klasörüne tıklayın
3. İçeriği tarihe göre sıralayın — en eskiler genellikle gereksizdir
4. Artık ihtiyacınız olmayan dosyaları silin
5. Özellikle büyük dosyalara dikkat edin: program kurulum dosyaları (.exe, .msi), eski ZIP dosyaları

Bu adım tek başına birkaç GB yer açabilir.

## Adım 4: Windows Disk Temizleme Aracını Kullanın

Windows'un kendi içinde çok etkili bir temizlik aracı vardır. Bunu kullanmak güvenlidir — Windows neyin silinebileceğini bilir.

1. Başlat menüsüne "Disk Temizleme" yazın ve açın
2. C: sürücüsünü seçin ve Tamam'a tıklayın
3. Analiz bitmesini bekleyin
4. Açılan listede şu kutucukları işaretleyin:
   - Geçici Internet Dosyaları
   - Geçici Dosyalar
   - Geri Dönüşüm Kutusu (henüz boşaltmadıysanız)
   - Küçük Resimler
5. "Sistem dosyalarını temizle" düğmesine tıklayın — bu daha fazla seçenek açar:
   - Windows Update Temizleme (çok büyük olabilir, GB'larca)
   - Önceki Windows Yüklemeleri (Windows.old)
   - Teslim İyileştirme Dosyaları
6. İşaretlediklerinizi onaylayın ve temizlemeyi başlatın

Bu araç genellikle 2-15 GB arası yer açar. Özellikle "Windows Update Temizleme" ve "Önceki Windows Yüklemeleri" çok büyük olabilir.

## Adım 5: Geçici Dosyaları Manuel Temizleyin

Disk Temizleme aracı her şeyi temizlemez. Manuel olarak geçici dosya klasörlerini de temizleyebilirsiniz:

1. Klavyeden Windows + R tuşlarına basın (Çalıştır kutusu açılır)
2. `%temp%` yazın ve Enter'a basın
3. Açılan klasördeki tüm dosyaları seçin (Ctrl+A) ve silin
4. Bazı dosyalar "kullanımda" uyarısı verebilir — "Atla" seçin, sorun değil
5. Tekrar Windows + R basın, bu sefer `temp` yazın ve Enter'a basın
6. Yine tüm dosyaları silin

Bu iki klasördeki dosyalar tamamen geçicidir ve silinmeleri hiçbir soruna yol açmaz.

## Adım 6: Büyük Dosyaları Bulun

Bazen disk alanını dolduran tek bir büyük dosya veya klasör olabilir. Bunu bulmak için:

1. Ayarlar > Sistem > Depolama yolunu izleyin
2. Windows size disk alanının nereye gittiğini kategorilere göre gösterir
3. "Geçici dosyalar", "Uygulamalar", "Diğer" gibi kategorilere tıklayarak detaya inebilirsiniz

Alternatif yöntem: Dosya Gezgini'nde C: sürücüsünü açın, sağ üst köşedeki arama kutusuna `boyut:devasa` yazın. Bu, 128 MB'dan büyük tüm dosyaları listeler.

## Adım 7: Programları Kontrol Edin

Kullanmadığınız programlar da disk alanı kaplar. Bazı programlar 1-5 GB yer tutabilir.

1. Ayarlar > Uygulamalar > Yüklü uygulamalar yoluna gidin
2. "Boyuta göre sırala" seçeneğini kullanın
3. En çok yer kaplayan programları listeleyin
4. Artık kullanmadığınız programları kaldırın

Dikkat: Tanımadığınız bir programı silmeden önce internette adını aratın. Bazı programlar sistem için gereklidir (Microsoft Visual C++, .NET Framework gibi). Bunları silmeyin.

## Silmemeniz Gereken Dosya ve Klasörler

Disk temizlerken bazı dosyalara kesinlikle dokunmayın:

- **Windows klasörü** (C:\Windows): Sisteminizin çalışması için gerekli
- **Program Files ve Program Files (x86):** Kurulu programlarınızın dosyaları
- **Kullanıcı klasörlerinizdeki belgeler:** Kendi dosyalarınız (tabii gereksiz olanları silebilirsiniz)
- **Sistem gizli dosyaları:** pagefile.sys, hiberfil.sys gibi dosyaları manuel silmeyin
- **WinSxS klasörü:** C:\Windows altında çok büyük görünür ama silmeye çalışmayın — Windows bunu kendi yönetir

Genel kural: Eğer bir dosyanın ne olduğunu bilmiyorsanız, silmeyin. Sadece yukarıda anlattığımız güvenli yöntemleri kullanın.

## Hazırda Bekletme Dosyası (Hiberfil.sys)

Eğer çok yer açmanız gerekiyorsa, "hazırda bekletme" özelliğini kapatarak birkaç GB kazanabilirsiniz. Bu dosya genellikle RAM'iniz kadar büyüktür (8 GB RAM = 8 GB dosya).

1. Başlat menüsüne "cmd" yazın, sağ tıklayın "Yönetici olarak çalıştır" seçin
2. Açılan pencereye şunu yazın: `powercfg -h off`
3. Enter'a basın

Bu komut hazırda bekletme özelliğini kapatır ve hiberfil.sys dosyasını siler. Uyku modu hala çalışır, sadece hazırda bekletme (hibernate) kapanır.

## Kalıcı Çözüm: SSD Yükseltme veya Ek Disk

Eğer disk temizliği yaptıktan sonra bile alan yetersiz kalıyorsa, kalıcı çözüm donanım yükseltmesidir:

- **SSD yükseltme:** 256 GB diskiniz varsa 512 GB veya 1 TB SSD'ye geçebilirsiniz. Hem alan artar hem hız artar
- **Ek disk ekleme:** Masaüstü bilgisayarlara ikinci bir disk eklenebilir. Belgelerinizi ve büyük dosyalarınızı ikinci diske taşırsınız
- **Bulut depolama:** OneDrive, Google Drive gibi servisleri kullanarak dosyalarınızın bir kısmını buluta taşıyabilirsiniz. [NAS mı bulut depolama mı](/blog/nas-mi-bulut-depolama-mi) karşılaştırması için rehberimizi okuyun

## Düzenli Temizlik Alışkanlığı Edinin

Disk dolmasını önlemek için ayda bir şu kontrolleri yapın:

1. İndirilenler klasörünü kontrol edin ve gereksizleri silin
2. Geri Dönüşüm Kutusu'nu boşaltın
3. Disk Temizleme aracını çalıştırın
4. Disk doluluk yüzdesini kontrol edin

Bu basit alışkanlık, disk doluluk sorununu kalıcı olarak önler.

## Sonuç

Disk alanı dolu uyarısı sinir bozucu ama çözümü genellikle basittir. Bu rehberdeki adımları sırasıyla uygulayarak ciddi miktarda yer açabilirsiniz. Önemli olan düzenli temizlik alışkanlığı edinmek ve gereksiz dosyaların birikmesine izin vermemektir.

Bu sorunu kendiniz çözemediyseniz veya ofisteki tüm bilgisayarlarda disk doluluk sorunu yaşıyorsanız, profesyonel destek almanın zamanı gelmiş demektir. Kozyatağı Bilişim olarak ofis bilgisayarlarınızın disk yönetimini, SSD yükseltmelerini ve veri taşıma işlemlerini güvenle gerçekleştiriyoruz. Bizi **0541 636 77 75** numarasından arayabilir veya [kozyatagibilisim.com](https://kozyatagibilisim.com) üzerinden ulaşabilirsiniz.

---

Bu rehberleri de okuyun:

- [Bilgisayarım Çok Yavaş, Ne Yapmalıyım?](/blog/bilgisayar-cok-yavas-ne-yapmali)
- [Bilgisayar Sürekli Donuyor ve Takılıyor](/blog/bilgisayar-surekli-donuyor)
- [NAS mı Bulut Depolama mı?](/blog/nas-mi-bulut-depolama-mi)
