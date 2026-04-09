---
slug: harici-disk-gorunmuyor
title: "Harici Diskim Görünmüyor — Sebepleri ve Çözümü"
type: cluster
pillar: 9
url: "/blog/harici-disk-gorunmuyor"
hedef_anahtar_kelime: "harici disk görünmüyor"
meta_title: "Harici Disk Görünmüyor: 8 Sebep ve Çözüm | Kozyatağı Bilişim"
meta_description: "Harici diskiniz bilgisayara takılmasına rağmen görünmüyor mu? Sebepleri ve verilerinizi kaybetmeden çözüm adımları burada."
kelime_sayisi: "~1700"
pillar_linki: "/sirket-veri-yedekleme"
---

Harici diskinizi taktınız, LED yanıyor, motor sesi geliyor ama "Bu Bilgisayar"da görünmüyor. Veya hiç ses gelmiyor, LED bile yanmıyor. İçinde yıllarca biriktirdiğiniz fotoğraflar, projeler, videolar var. Kalp atışlarınız hızlanıyor — anlıyorum. Ama panik yapmadan önce yapılabilecek çok şey var. Bu yazıda harici disk tanınmama sorununun tüm sebeplerini ve verilerinizi kaybetmeden çözüm yöntemlerini anlatacağız. Önemli: Harici diskinizden tıklama, çıtırtı veya garip mekanik sesler geliyorsa, hemen bilgisayardan çıkarın ve tekrar takmayın. Bu sesler diskin fiziksel hasar gördüğünün işaretidir ve her takışta veriler daha çok zarar görebilir. Bu durumda doğrudan profesyonel veri kurtarma servisine gitmek en mantıklısıdır.

## ⚡  Önce Bunları Deneyin (10 Dakika)

1. Farklı USB portu deneyin: Mümkünse arka USB 3.0 portları kullanın (mavi renkli olanlar).

2. Farklı USB kablosu deneyin: Kablo en sık bozulan parçadır.

3. Farklı bir bilgisayar deneyin: Sorun diskte mi bilgisayarda mı anlamak için.

4. Disk Yönetimi'ni açın: Windows tuşu + X → Disk Yönetimi. Disk burada görünüyor mu? 5. 2.5" disk için: Bazı diskler tek USB portundan yeterli güç alamaz. "Y kablosu" (iki USB girişli) kullanın.

## Harici Disk Görünmeme Sebepleri

1. Yetersiz Güç (En Yaygın Sebep)

Özellikle 2.5" harici diskler bilgisayardan elektrik ile çalışır. Bazı bilgisayarların USB portları yeterli amper (genelde 500 mA) sağlayamaz ve disk sürekli yeniden başlar veya hiç çalışmaz. Belirti: Disk dönüyor sonra duruyor, sonra dönüyor sonra duruyor. Çözüm: "Y kablosu" alın (iki USB ucu var, biri güç biri veri için), veya harici güç kaynaklı bir USB hub kullanın.

2. USB Kablosu Bozuk

İkinci en yaygın sebep. Kablonun konektörlerindeki ince teller zamanla kopar. Kablo bükülürken iyi görünebilir ama içeride sorun olabilir. Mümkünse aynı tipte (USB 3.0 mavi konnektör) yedek kablo deneyin. Asla USB 2.0 (siyah) kabloyla USB 3.0 disk kullanmayın — yavaş çalışır ve güç sorunu çıkarır.

3. Sürücü Harfi Atanmamış

Disk Windows tarafından tanınıyor ama sürücü harfi yok. Disk Yönetimi'ne (Windows + X → Disk Yönetimi) bakın. Eğer diski görüyorsanız ama harf yoksa: sağ tık → "Sürücü Harfi ve Yollarını Değiştir" → "Ekle" → harf seçin. Bu çok yaygın bir sorundur.

4. Dosya Sistemi Bozuk

Disk Yönetimi'nde disk görünüyor ama "RAW" yazıyorsa, dosya sistemi bozuktur. Komut İstemi (yönetici) → chkdsk E: /f (E yerine diskinizin harfi). Bu komut dosya sistemini onarmayı dener. Çalışırsa harika, çalışmazsa veri kurtarma yazılımı gerekir.

5. Disk Mac Formatında

Windows, Mac'in HFS+ veya APFS formatlarını okuyamaz. Disk takıldığında "biçimlendirmek istiyor" diyebilir. Sakın biçimlendirmeyin — verileriniz silinir. Çözüm: Bir Mac bulup verileri kopyalayın, sonra diski exFAT formatında biçimlendirin. Veya HFSExplorer (Windows için) gibi bir araçla Mac formatlı diski okuyabilirsiniz.

6. USB Denetleyici Sürücüsü Sorunu

Bilgisayarın USB sürücüleri güncel olmayabilir veya bozulmuş olabilir. Aygıt Yöneticisi → "USB Denetleyicileri" altındaki tüm girişlere sağ tık → "Sürücüyü güncelle" → "Otomatik olarak ara". Sorun devam ederse hepsini "Aygıtı kaldır" yapıp bilgisayarı yeniden başlatın. Windows otomatik yeniden yükler.

7. Disk Fiziksel Olarak Bozulmuş

Diskten tıklama, çıtırtı, motor zorlanma sesleri geliyorsa veya hiç ses gelmiyorsa fiziksel arıza vardır. Bu durumda DIY çözüm yoktur. Disk takılı kaldığı her dakika veriler daha çok zarar görebilir. Hemen çıkarın ve profesyonel veri kurtarma servisine götürün.

8. SMR Disk Sorunu

Son yıllarda üretilen bazı harici diskler "SMR" (Shingled Magnetic Recording) teknolojisi kullanır. Bu diskler büyük dosya yazımlarında çok yavaşlar veya donar gibi görünürler. Eğer disk büyük dosya kopyalarken takılıyorsa SMR olabilir. Çözüm: Yazma işlemini bekleyin (saatler sürebilir) veya CMR (Conventional) bir disk alın.

## Disk Yönetimi'nde Disk Nasıl Görünüyor?

## Disk Yönetimi'nde

Görünen Anlamı Yapılacak Hiç görünmüyor Donanım/kablo/güç sorunu Kablo, port, güç kaynağı kontrolü "Bilinmiyor, Başlatılmadı"

## Disk başlatılmamış (yeni disk

olabilir) Sağ tık → Diski Başlat (DİKKAT: yeni diskse yapın, eski diskse VERİLER GİDER)

## "Çevrimdışı" Disk algılanıyor ama aktif değil Sağ tık → Çevrimiçi yap

"Ayrılmamış" Diskte bölüm yok (veriler silinmiş gibi)

## Veri kurtarma yazılımı ile tara

"RAW" Dosya sistemi bozuk chkdsk veya veri kurtarma yazılımı "Sağlıklı (NTFS)" ama harf yok Sürücü harfi atanmamış Sağ tık → Sürücü Harfi Ekle 🏢  Şirketinizin Önemli Verileri Harici Disklerde Mi Duruyor? Pek çok küçük işletmede şu durumu görüyoruz: Müdürün masasında bir harici disk var, "yedek" diye. Birinci ve son yedek o. Eğer o disk bozulursa şirket için felakettir. Harici diskler şirket yedeklemesi için uygun değildir, çünkü: Tek nokta arızası: Bir disk, bir başarısızlık. Yedek disk yoksa, veri yok. Manuel süreç: Kimse düzenli olarak yedeklemiyor, sadece "ara sıra". Test edilmiyor: Yedek var diye düşünüyorsunuz ama gerçekten geri yüklenebilir mi denenmemiş. Aynı yerde duruyor: Yangın, sel, hırsızlık olunca hem orijinaller hem yedek gider. Şifreli değil: Disk çalınırsa tüm veriler ifşa olur, KVKK ihlali. Versiyon yönetimi yok: 6 ay önceki bir dosyaya geri dönmek imkansız. Gerçek bir yedekleme stratejisi 3-2-1 kuralına uyar: 3 kopya (orijinal + 2 yedek), 2 farklı medyada, 1 tanesi başka lokasyonda. Kozyatağı Bilişim Felaket Kurtarma & Yedekleme hizmeti tam olarak bunu sağlar: otomatik, şifreli, çoklu lokasyonlu, test edilmiş yedekleme.

## Sıkça Sorulan Sorular

Harici diskim düştü, artık tanınmıyor — kurtarılır mı? 2.5" disklerde düşme genelde fiziksel hasara yol açar (kafa diske değer, çiziklere sebep olur). SSD'lerde düşme sorun yaratmaz. HDD düştüyse ve önemli verileriniz varsa, kendiniz açıp tamir etmeye çalışmayın. Profesyonel veri kurtarma servisine götürün — başarı oranı %50-80 arasındadır.

## Harici disk çok ısınıyor, normal mi?

Hafif ısınma normaldir (40-50°C). Ama dokunamayacak kadar sıcaksa sorun var demektir. Havalandırması iyi olan bir yere koyun, üzerini örtmeyin. Sürekli aşırı ısınan diskler kısa sürede bozulur.

## Disk dönmüyor hiç, ne yapmalıyım?

Sırasıyla deneyin: 1) Farklı kablo, 2) Farklı USB portu, 3) Y kablosu (güç için), 4) Farklı bilgisayar. Hiçbiri işe yaramazsa diskin elektronik kartı bozulmuş olabilir. Profesyonel veri kurtarma servisi çözebilir, DIY yöntem yok.

## Disk takıldığında bilgisayar kasıyor, neden?

Disk dosya sistemi bozuk veya bad sector'lı olabilir. Windows diski okumaya çalışırken kilitleniyor demektir. Aygıt Yöneticisi'nden diski hemen çıkarın, sonra kabloyu çıkarın. Profesyonel müdahale gerekir.

## Yeni aldığım harici disk hiç çalışmadı, ne yapmalıyım?

Önce satıcıya götürüp değişimini isteyin. Yeni disklerde garanti süresi içinde fabrika hatası varsa ücretsiz değiştirilir. İçinde veri yoksa zaten kaybedecek bir şeyiniz yok.

## Şirketinizin Veri Yedekleme Stratejisini Sağlamlaştırın

Eğer şirket verileriniz harici disklerde "yedek" tutuluyorsa, ciddi bir risk altındasınız. Ücretsiz keşif görüşmesinde mevcut yedekleme stratejinizi inceleyip 3-2-1 kuralına uygun, otomatik ve test edilmiş bir yedekleme altyapısı önerelim.

## Ücretsiz Keşif Planla →

## Sonuç

Harici disk görünmeme sorunlarının çoğu yazılımsal veya bağlantısaldır — kablo değişimi, sürücü harfi atama, chkdsk gibi yöntemlerle çözülür. Mekanik bozukluklar daha ciddidir ama profesyonel servisler çoğu zaman verileri kurtarabilir. En önemli ders: Harici diskler tek başına yedekleme stratejisi değildir. Önemli verilerinizin mutlaka birden fazla kopyası olmalı, en az biri farklı lokasyonda durmalı. Silinen dosyaları geri getirme ve USB belleğim tanınmıyor yazılarımız da veri kaybı senaryolarına dair faydalıdır. Profesyonel yedekleme stratejisi için Felaket Kurtarma & Yedekleme hizmetimiz mevcut.
