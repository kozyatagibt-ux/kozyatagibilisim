---
slug: e-posta-eki-acilmiyor
title: "E-Posta Eki Açılmıyor: Dosya Formatı, Boyut Limiti ve Güvenlik Çözümleri"
type: cluster
pillar: 6
url: "/blog/e-posta-eki-acilmiyor"
hedef_anahtar_kelime: "e-posta eki açılmıyor"
meta_description: "Mail ekindeki dosya açılmıyor mu? Dosya formatı, boyut limiti, güvenlik engeli ve antivirüs karantina sorunlarının çözümleri."
kelime_sayisi: "~1500"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Bir müşteriniz size teklif dosyası göndermiş. E-postayı açıyorsunuz, eki görüyorsunuz, tıklıyorsunuz ve hiçbir şey olmuyor. Ya da garip bir hata mesajı çıkıyor. Ya da dosya açılıyor ama içi karman çorman görünüyor. E-posta eki açılmaması ofis çalışanlarının en sık karşılaştığı sorunlardan biridir ve neredeyse her seferinde basit bir sebebi vardır. Bu yazıda e-posta eklerinin neden açılmadığını ve her durumda ne yapmanız gerektiğini tek tek anlatıyoruz.

## Sebep 1: Dosyayı Açacak Program Yüklü Değil

En yaygın sebep budur. Birisi size .docx (Word dosyası) göndermiş ama bilgisayarınızda Microsoft Word veya alternatif bir program yüklü değil. Bilgisayar dosyayı açmaya çalışıyor ama hangi programla açacağını bilmiyor.

### Yaygın Dosya Formatları ve Gerekli Programlar

- **.docx** (Word belgesi): Microsoft Word, LibreOffice Writer veya Google Docs
- **.xlsx** (Excel tablosu): Microsoft Excel, LibreOffice Calc veya Google Sheets
- **.pptx** (PowerPoint sunumu): Microsoft PowerPoint, LibreOffice Impress veya Google Slides
- **.pdf** (PDF doküman): Adobe Acrobat Reader, Edge tarayıcı veya Chrome tarayıcı
- **.zip** veya **.rar** (sıkıştırılmış dosya): Windows'un kendi ZIP desteği, WinRAR veya 7-Zip
- **.dwg** (AutoCAD çizimi): AutoCAD veya ücretsiz AutoCAD viewer
- **.psd** (Photoshop dosyası): Adobe Photoshop veya GIMP

### Ne Yapmalısınız:

1. Dosya uzantısına bakın. Dosya adının son kısmındaki nokta ve harfler uzantıdır (ornek: "teklif.docx" dosyasında uzantı ".docx").
2. Eğer uzantı görünmüyorsa: Dosya Gezgini > Görünüm > "Dosya adı uzantıları" kutusunu işaretleyin.
3. Uzantıya göre yukarıdaki listeden uygun programı kurun.
4. Program yüklemek istemiyorsanız, dosyayı Google Drive'a yükleyip orada açabilirsiniz. Google Drive çoğu formatı tarayıcıda açabilir.

## Sebep 2: Dosya Boyutu Çok Büyük

E-posta hizmetlerinin ek boyutu sınırı vardır. Bu sınırı aşan dosyalar ya gönderilmez ya da alıcıda sorun çıkarır.

### E-Posta Boyut Sınırları

- **Gmail:** Tek seferde maksimum 25 MB ek gönderebilirsiniz.
- **Outlook.com / Hotmail:** Maksimum 20 MB.
- **Microsoft 365 (Kurumsal Outlook):** Varsayılan 25 MB, yönetici 150 MB'a kadar artırabilir.
- **Yahoo Mail:** Maksimum 25 MB.

Dikkat: Bu sınırlar hem gönderen hem alıcı tarafı için geçerlidir. Siz 30 MB dosya göndermeye çalışırsanız, e-postanız hiç gitmez.

### Ne Yapmalısınız:

1. Dosya boyutunu kontrol edin. Dosyaya sağ tıklayıp "Özellikler" seçin.
2. Boyut sınırı aşılıyorsa, dosyayı doğrudan e-postaya eklemek yerine bulut bağlantısı ile paylaşın:
   - **OneDrive:** Dosyayı OneDrive'a yükleyin, paylaşım bağlantısı oluşturun, bu bağlantıyı e-postaya yapıştırın.
   - **Google Drive:** Dosyayı Drive'a yükleyin, "Bağlantı al" ile paylaşın.
   - **WeTransfer:** Büyük dosyaları ücretsiz gönderebileceğiniz bir hizmettir.
3. Sıkıştırma da bir seçenektir. Dosyaya sağ tıklayıp "Sıkıştırılmış klasöre gönder" seçeneği ile ZIP yapabilirsiniz.

## Sebep 3: Güvenlik Engeli — Dosya Türü Yasaklanmış

E-posta hizmetleri bazı dosya türlerini güvenlik sebebiyle engeller. Bu dosyalar virüs veya zararlı yazılım taşıyabilir.

### Genellikle Engellenen Dosya Türleri

- **.exe** (program dosyası)
- **.bat** (komut dosyası)
- **.msi** (yükleme dosyası)
- **.js** (JavaScript dosyası)
- **.vbs** (Visual Basic Script)
- **.scr** (ekran koruyucu — aslında program)

Gmail ve Outlook bu dosyaları ekte görürse otomatik engeller. Gönderen "gönderdim" der ama siz eki görmezsiniz.

### Ne Yapmalısınız:

1. Gönderene dosyayı ZIP formatında sıkıştırıp tekrar göndermesini isteyin. ZIP içindeki .exe dosyaları bazen geçebilir (ama her zaman değil).
2. Daha güvenli yol: dosyayı OneDrive, Google Drive veya Dropbox'a yükleyip bağlantı göndermek.
3. Dikkatli olun: Tanımadığınız birinden gelen .exe veya .bat dosyalarını zaten açmamalısınız. Bunlar virüs olabilir.

## Sebep 4: Antivirüs Dosyayı Karantinaya Aldı

Bazen ek dosyayı indirirsiniz ama dosya kaybolmuş gibi görünür. Klasöre bakarsınız, dosya yok. Sebebi genelde antivirüs yazılımınızdır. Antivirüs dosyayı şüpheli bulmuş ve otomatik olarak karantinaya almış olabilir.

### Ne Yapmalısınız:

1. Antivirüs programınızı açın (Windows Defender, Kaspersky, ESET vb.).
2. "Karantina" veya "Geçmiş" bölümüne gidin.
3. Dosyayı orada bulup, güvenli olduğundan eminseniz "Geri Yükle" seçin.
4. Eğer dosyanın güvenli olduğundan emin değilseniz, göndereni arayıp doğrulayın.

Dikkat: Antivirüs bir dosyayı engellediyse, genelde iyi bir sebebi vardır. Emin olmadan geri yüklemeyin.

## Sebep 5: winmail.dat Sorunu

Birisi size dosya göndermiş ama siz ekte sadece "winmail.dat" adlı anlamsız bir dosya görüyorsunuz. Bu çok bilinen bir Outlook uyumsuzluk sorunudur. Gönderen Outlook'un "Rich Text" formatını kullanmışsa ve alıcı farklı bir e-posta istemcisi (Gmail, Thunderbird vb.) kullanıyorsa, ek dosyalar winmail.dat içine paketlenir ve açılamaz.

### Ne Yapmalısınız:

1. Gönderenden e-postayı HTML formatında tekrar göndermesini isteyin. Outlook'ta yeni e-posta yazarken Format > HTML seçilmeli.
2. Eğer gönderen değiştiremiyorsa, winmail.dat dosyasını açan ücretsiz araçlar var: "Winmail Opener" veya "Letter Opener" gibi.
3. Kalıcı çözüm: Gönderenin Outlook ayarlarında varsayılan format "HTML" olarak değiştirilmelidir.

## Sebep 6: Outlook Korumalı Görünüm

Microsoft Outlook, internetten gelen dosyaları "Korumalı Görünüm" modunda açar. Bu modda dosya salt okunur olarak açılır ve üst kısımda sarı bir uyarı çubuğu görürsünüz: "Korumalı Görünüm - İnternetten kaynaklanan dosyalar virüs içerebilir."

### Ne Yapmalısınız:

1. Dosyanın güvenilir bir kaynaktan geldiğinden eminseniz, sarı çubuktaki **"Düzenlemeyi Etkinleştir"** düğmesine tıklayın.
2. Tanımadığınız bir kaynaktan gelen dosyalarda bu korumayı kaldırmayın.
3. Eğer şirketinizdeki tüm dosyalar sürekli korumalı görünümde açılıyorsa, IT yöneticiniz Güvenilir Konumlar ayarından şirket sunucusunu ekleyebilir.

## Sebep 7: Dosya Bozulmuş

Bazen sorun sizde değil, dosyanın kendisindedir. Dosya gönderilirken bozulmuş olabilir veya gönderen tarafta zaten hasarlı olabilir.

### Belirtileri:

- Dosya açılıyor ama içi boş görünüyor.
- Dosya açılıyor ama karakterler bozuk, okunamıyor.
- "Bu dosya bozuk ve açılamıyor" hatası alıyorsunuz.

### Ne Yapmalısınız:

1. Gönderenden dosyayı tekrar göndermesini isteyin.
2. Dosyayı e-posta yerine bulut bağlantısı ile paylaşmasını isteyin (bozulma riski daha azdır).
3. ZIP içinde gönderilmesini isteyin. ZIP formatı dosya bütünlüğünü korumaya yardımcı olur.

## E-Posta Eki Sorunlarından Kalıcı Olarak Kurtulma

E-posta eki sorunları genelde tekrar eden sorunlardır. Her seferinde tek tek uğraşmak yerine kalıcı çözümler düşünün:

1. **Büyük dosyalar için standart yöntem belirleyin:** Şirketinizde "25 MB üstü dosyalar OneDrive/Drive bağlantısı ile paylaşılır" kuralı koyun.
2. **Gerekli programları tüm bilgisayarlara kurun:** PDF okuyucu, ZIP programı ve Office paketi her bilgisayarda olmalı.
3. **E-posta istemcinizi güncel tutun:** Eski Outlook sürümleri birçok uyumsuzluk sorunu yaşar.
4. **Antivirüsü doğru yapılandırın:** Meşru dosyaları sürekli engelleyen bir antivirüs, iş akışını bozar.

E-posta gönderim ve alım sorunları yaşıyorsanız [e-posta gelmiyor gönderilmiyor](/blog/eposta-gelmiyor-gonderilmiyor) yazımız da faydalı olacaktır.

## Profesyonel Destek

E-posta eki sorunları basit gibi görünse de, bazen arkasında sunucu yapılandırması, güvenlik politikaları veya yazılım uyumsuzlukları yatar. Özellikle şirketinizde birçok kişi aynı sorunu yaşıyorsa, sorun bireysel değil sistemiktir. Kozyatağı Bilişim olarak e-posta yapılandırması, güvenlik ayarları ve Office kurulumu konularında destek sağlıyoruz. Bizi arayın: **0541 636 77 75** veya [kozyatagibilisim.com](https://kozyatagibilisim.com) adresinden bize ulaşın.

## Bu Rehberi de Okuyun:

- [E-Posta Gelmiyor veya Gönderilmiyor: Çözüm Rehberi](/blog/eposta-gelmiyor-gonderilmiyor)
- [Outlook Açılmıyor: Çözüm Rehberi](/blog/outlook-acilmiyor)
- [E-Posta Phishing Engelleme Rehberi](/blog/eposta-phishing-engelleme)
