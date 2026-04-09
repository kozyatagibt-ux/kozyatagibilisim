---
slug: excel-donuyor-cozum
title: "Excel Çok Yavaş Açılıyor veya Donuyor: Çözüm Rehberi"
type: cluster
pillar: 8
url: "/blog/excel-donuyor-cozum"
hedef_anahtar_kelime: "excel donuyor"
meta_title: "Excel Donuyor veya Çok Yavaş Çalışıyor mu? Çözüm Rehberi | Kozyatağı Bilişim"
meta_description: "Excel açılırken donuyor mu? Büyük dosyalar yavaşlatıyor mu? Yaygın sebepler ve adım adım çözümler. Performans iyileştirme ipuçları."
kelime_sayisi: "~1700"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Excel'i açtınız, dosyayı çift tıkladınız, bekleyin... bekleyin... Excel "yanıt vermiyor" yazdı, sonra "yanıt veriyor" yazdı, sonra yine "yanıt vermiyor". Bir hücreyi değiştirmek istiyorsunuz, 5 saniye dondu. Sayfa kaydırırken takılıyor. Bu sorunlar muhasebe, finans, raporlama yapan herkesin başına gelir ve ciddi zaman kaybı yaratır. Bu yazıda Excel'in donma ve yavaşlama sorunlarının sebeplerini ve pratik çözümleri ele alacağız.

## Önce Hızlı Çözümler

5 dakikada deneyebilecekleriniz:

1. Excel'i kapatın, bilgisayarı yeniden başlatın, tekrar açın

2. Aynı dosya başka bilgisayarda açılıyor mu deneyin (sorun dosyada mı bilgisayarda mı?)

3. Excel'i güvenli modda açın (Windows + R, "excel.exe /safe")

4. Antivirüsünüzü geçici olarak kapatıp deneyin

5. Excel dışındaki gereksiz programları kapatın

Excel'in Donma ve Yavaşlama Sebepleri

1. Dosya Çok Büyük

Excel dosyalarının "doğal sınırı" vardır. 50 MB'ın üzerindeki dosyalar Excel için ciddi yüktür. 100 MB üzeri dosyalar genelde dramatik şekilde yavaşlar. 200+ MB dosyalar çoğu makinede neredeyse kullanılamaz. Sebep: Çok fazla satır/sütun, çok fazla formül, çok fazla biçimlendirme, gömülü resimler, gizli sayfalar.

## Çözüm:

Gereksiz biçimlendirmeyi temizleyin (Giriş > Düzenleme > Temizle > Biçimleri Temizle) Kullanılmayan satır/sütunları silin (sadece "boş" değil, biçimlendirilmiş ama kullanılmayanlar da)

## Resimleri sıkıştırın (Resme tıklayın > Biçim > Resimleri Sıkıştır)

Excel'in kendisi yerine veritabanı kullanmayı düşünün — büyük veriler için Excel doğru araç değildir

2. Çok Karmaşık Formüller

VLOOKUP, INDEX/MATCH, SUMIFS, COUNTIFS gibi fonksiyonlar her hesaplamada tüm aralıkları tarar. Eğer bu formülleri binlerce hücrede kullanırsanız, her küçük değişiklikte Excel her şeyi yeniden hesaplar.

## Çözüm:

Otomatik hesaplamayı kapatın: Formüller > Hesaplama Seçenekleri > El ile. Bu, sadece F9'a bastığınızda hesaplama yapılmasını sağlar. Çok büyük fark yaratır. VLOOKUP yerine XLOOKUP kullanın (Excel 365 / 2021): daha hızlı çalışır Tüm sütunu seçmek yerine belirli aralık kullanın: A:A yerine A1:A1000 yazın Pivot tablolar kullanın: Aynı verileri birçok formülle sürekli hesaplamak yerine pivot tablo daha hızlıdır

3. Koşullu Biçimlendirme Aşırılığı

Koşullu biçimlendirme görsel olarak çok kullanışlıdır ama Excel her hesaplamada tüm koşulları kontrol eder. Binlerce hücreye uygulanmış birden fazla koşullu biçimlendirme dosyayı dramatik yavaşlatır. Çözüm: Giriş > Koşullu Biçimlendirme > Kuralları Yönet — gereksiz veya çakışan kuralları silin. Sadece gerçekten gereken hücrelere uygulayın.

4. Grafikler ve Görseller Çok Fazla

Çok sayıda grafik, özellikle veri etiketleri yüksek olanlar, performansı düşürür. Gömülü resimler de bunu kötüleştirir. Çözüm: Çok kullanılmayan grafikleri silin. Resimleri sıkıştırın. Gerçekten gerekiyorsa grafikleri ayrı sayfalara taşıyın.

5. Add-in (Eklenti) Çakışması

Excel'e yüklü eklentiler (Power Query, Solver, üçüncü parti raporlama araçları) Excel'i yavaşlatabilir veya dondurabilir. Çözüm: Dosya > Seçenekler > Eklentiler > "Yönet: COM Eklentileri" > Git. Tüm eklentileri devre dışı bırakın, sonra teker teker aktifleştirip hangisinin sorun çıkardığını bulun.

6. Disk Alanı Yetersiz

Excel geçici dosyalar oluşturmak için disk alanına ihtiyaç duyar. C: sürücünüz dolup taşıyorsa Excel düzgün çalışamaz. Çözüm: En az 10 GB boş alan olsun. Dolu ise temizleme yapın. Bilgisayar yavaş çalışıyor yazımız disk temizliği için detaylı rehber sunar.

7. RAM Yetersiz

Excel büyük dosyalar açıldığında RAM kullanır. 8 GB RAM'li bir bilgisayarda 50 MB'lık bir dosya bile sıkıntı yaratabilir. 4 GB RAM'li sistemde modern Excel zaten zor çalışır. Çözüm: Görev Yöneticisi'nden RAM kullanımına bakın. Excel sırasında %85'in üzerine çıkıyorsa RAM artırma düşünülmeli.

8. Çok Sayfa Açık (Excel İçinde)

Aynı anda 20-30 Excel dosyası açıksa, hepsi RAM tüketir ve birbirini etkiler. Çoğu kullanıcı kapatmayı unutur ve dosyaları açık bırakır. Çözüm: İhtiyacınız olmayan dosyaları kapatın. Birden fazla sayfayı tek dosyada birleştirin (eğer mantıklıysa).

9. Dosya Bozulmuş

Bir Excel dosyası iç olarak bozulabilir. Açılırken donar veya hata verir.

## Çözüm:

1. Excel'i açın (boş)

2. Dosya > Aç > dosyaya gidin

3. "Aç" butonunun yanındaki ok > "Aç ve Onar"

4. "Onar" seçin (kaybedilen verileri kurtarmaya çalışır)

10. Eski Excel Sürümü

Excel 2010, 2013 gibi çok eski sürümler modern dosyalarla başa çıkmakta zorlanır. Yeni özellikleri (XLOOKUP, dinamik diziler) desteklemez. Çoğu sorun yeni sürüme geçince çözülür. Çözüm: Microsoft 365 aboneliği veya en azından Office 2021'e geçin.

## Çok Büyük Excel Dosyaları İçin İpuçları

Eğer iş gereği büyük Excel dosyalarıyla çalışıyorsanız, performans ipuçları:

## Hesaplamayı Manuel Yapın

Formüller > Hesaplama Seçenekleri > El ile. Artık her küçük değişiklikte dosya yeniden hesaplanmaz, sadece F9'a bastığınızda hesaplanır. Büyük dosyalarda dramatik fark yaratır.

## Gerçek Sayı Olarak Yapıştırın

Bir formülün sonucunu artık değiştirmeyecekseniz, formülü sayıya çevirin. Hücreyi seçin, kopyalayın, sağ tık > "Özel Yapıştır" > "Değerler". Excel artık bu hücreyi her seferinde yeniden hesaplamaz.

## Pivot Tablo Kullanın

20.000 satır veriden binlerce SUMIFS yapmak yerine, pivot tablo aynı işi 100 kat hızlı yapar. Excel'in en güçlü özelliği belki de pivot tablolardır.

## Power Query'yi Öğrenin

Excel'in içindeki Power Query, ETL (veri çekme, dönüştürme, yükleme) işlerini Excel formüllerinden çok daha hızlı yapar. Karmaşık veri temizleme işleri için ideal.

## Çoklu Sayfa Yerine Tek Sayfa

Verilerinizi 12 ay için 12 ayrı sayfaya bölmek yerine tek sayfada "Ay" sütunu ile saklayın. Sonra pivot tablo veya filtre kullanın. Hem performans daha iyi hem de analiz daha kolay olur.

## Excel'in Doğru Aracı Olmadığı Durumlar

Excel inanılmaz güçlü bir araçtır ama her şey için uygun değildir. Aşağıdaki durumlarda farklı araç düşünmelisiniz: 100.000+ satır veri: Excel teknik olarak destekler ama rahatsız edici şekilde yavaşlar. Veritabanı (Access, SQL Server, hatta Power BI) daha uygundur. Çok sayıda kullanıcı eşzamanlı: Excel paylaşılan dosyalar konusunda zayıftır. Bunun için Microsoft 365'in çevrimiçi versiyonu veya doğrudan SharePoint kullanın. Karmaşık iş süreçleri: "Excel ile yönettiğimiz" süreçler aslında uygulamalarda yapılmalıdır. Microsoft Power Apps, Airtable, hatta basit bir Notion uygun olabilir. Kritik finansal hesaplamalar: Excel hatasından dolayı şirketler çok para kaybetmiştir. Önemli hesaplamalar için gerçek finansal yazılımlar düşünülmeli.

## Çalışanlarınız "Excel Çöküyor" Şikayetiyle Geliyorsa

Tek bir kullanıcının Excel sorununu yukarıdaki adımlarla çözebilirsiniz. Ama eğer şirketinizde Excel sorunları sürekli ise, durum daha derin bir şeyi gösterir: muhtemelen Excel'i yapması için tasarlanmadığı işler için kullanıyorsunuz. 50.000 satırlık siparişler, çoklu kullanıcılı muhasebe takipleri, karmaşık raporlama dashboard'ları — bunlar Excel'in güçlü olduğu alanlar değildir. Bir IT danışmanı, mevcut Excel kullanımınızı analiz edip hangilerinin gerçekten Excel'de kalmaya değer, hangilerinin daha iyi araçlara taşınması gerektiğini söyleyebilir. Bu analiz tek seferlik bir yatırımdır ve uzun vadede inanılmaz zaman tasarrufu sağlar.

## Sıkça Sorulan Sorular

Excel açılırken neden dakikalarca bekler? Genelde dosya boyutu, çok karmaşık formüller veya açılışta tarayıcı (Add-in) yüklemeleridir. Güvenli modda hızlı açılıyorsa eklentilerdir. Yavaşlık dosyaya özgüyse, dosyanın iç temizliği gerekir.

## Aynı dosya bir bilgisayarda çalışıyor diğerinde donuyor, neden?

Donanım farkı (RAM, işlemci), Excel sürümü farkı veya farklı eklentiler sebep olabilir. Yavaş bilgisayarda RAM ve disk durumunu kontrol edin.

## Otomatik kaydet özelliği yavaşlatır mı?

OneDrive ile çalışıyorsanız, otomatik kaydetme her değişiklikte dosyayı yükler. Çok büyük dosyalarda bu yavaşlama hissedilebilir. Geçici olarak kapatabilirsiniz ama unutmayın açmayı.

## Excel mi Google Sheets mi daha iyi?

Tek başına çalışıyorsanız ve büyük veri yoksa Google Sheets daha hızlıdır ve ücretsizdir. Ama Excel'in karmaşık formülleri, pivot tabloları, Power Query'si rakipsizdir. Hangisinin daha iyi olduğu kullanım senaryosuna bağlıdır.

## Şirketinizin Excel ve Office Verimliliğini Birlikte İnceleyelim

Eğer çalışanlarınız Excel ve diğer Office araçlarıyla zaman kaybediyorsa, mevcut iş akışınızı değerlendirelim. Hangi süreçler optimize edilebilir, hangileri farklı araçlara taşınmalı — somut öneriler sunalım.

## Ücretsiz Keşif Planla →

## Sonuç

Excel sorunları çoğu durumda çözülebilir. Yukarıdaki adımlar dosya optimizasyonu, donanım iyileştirmesi ve doğru araç seçimi hakkında kapsamlı bir rehber sunar. Çok büyük dosyalar veya çok karmaşık iş süreçleri için Excel'in dışında çözümler düşünmek mantıklıdır. Office uygulamalarının bütününde sorun yaşıyorsanız Outlook açılmıyor yazımıza da göz atın. Profesyonel destek için Son Kullanıcı Destek Hattı hizmetimiz günlük Office sorunlarınızı çözer.

## WİNDOWS

12. Windows Mavi Ekran Hatası: Sebepler ve Çözüm

Yolları
