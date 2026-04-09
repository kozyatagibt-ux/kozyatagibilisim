---
slug: outlook-acilmiyor
title: "Outlook Açılmıyor veya Donuyor: 10 Yaygın Sebep ve Çözüm"
type: cluster
pillar: 8
url: "/blog/outlook-acilmiyor"
hedef_anahtar_kelime: "outlook açılmıyor"
meta_title: "Outlook Açılmıyor veya Donuyor mu? 10 Yaygın Sebep ve Çözüm | Kozyatağı Bilişim"
meta_description: "Outlook açılmıyor, donuyor veya çöküyor mu? Yaygın 10 sebep ve adım adım çözüm yöntemleri. Hızlı düzeltmelerden ileri seviye onarımlara kadar."
kelime_sayisi: "~1700"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Sabah ofise gelirsiniz, bilgisayarı açarsınız, Outlook ikonuna tıklarsınız — ve hiçbir şey olmaz. Veya açılır gibi yapar, sonra donar. Veya açılır ama "veri dosyası yükleniyor" diye sonsuza kadar bekler. Outlook iş hayatının vazgeçilmez aracıdır ve bozulduğunda iş duruyor demektir. Bu yazıda Outlook'un açılmama veya donma sorunlarının en yaygın 10 sebebini ve her biri için pratik çözümleri ele alacağız. Önemli not: Bu yazı Microsoft 365 / Office 2019, 2021 sürümleri için yazılmıştır. Eski sürümlerde (Outlook 2010, 2013) bazı menü adımları farklı olabilir.

## Önce Hızlı Çözümler (5 Dakika)

## Hızlı denenmesi gereken adımlar:

1. Outlook'u kapatıp tekrar açın (sadece pencereyi değil, Görev Yöneticisi'nden Outlook.exe'yi de sonlandırın)

2. Bilgisayarı yeniden başlatın

3. İnternet bağlantınızı kontrol edin

4. Outlook'u "Güvenli Mod"da açın (Windows + R, "outlook.exe /safe" yazın, Enter)

5. Eğer güvenli modda açılıyorsa sorun bir eklentidedir (aşağıda detayı var)

## 10 Yaygın Sebep ve Çözüm

1. Outlook Veri Dosyası (PST/OST) Bozulmuş

Outlook tüm e-postalarınızı, kişilerinizi ve takvim öğelerinizi tek bir veri dosyasında tutar. Bu dosyalar PST (kişisel dosyalar) veya OST (Exchange ile senkron olanlar) uzantısına sahiptir. Boyutları büyüdükçe bozulma riski artar. 50 GB'ın üzerindeki dosyalar özellikle problemlidir. Belirti: Outlook açılırken takılır, "Outlook yanıt vermiyor" hatası, "veri dosyası açılamadı" gibi mesajlar.

## Çözüm: Microsoft'un ScanPST aracını kullanın:

1. Şu klasöre gidin: C:\Program Files\Microsoft Office\root\Office16\ (sürüme göre değişir)

2. SCANPST.EXE dosyasını çalıştırın

3. "Browse" diyerek Outlook veri dosyanızın yolunu seçin (genelde

C:\Users\Kullanıcı\AppData\Local\Microsoft\Outlook\)

4. "Start" diyerek taramayı başlatın

5. Hata bulunursa "Repair" seçin ve onarın

2. Bir Eklenti (Add-in) Outlook'u Çökertiyor

Outlook'a yüklenmiş üçüncü parti eklentiler (Adobe PDF, Skype, Zoom, antivirüs eklentileri vs.) sorun çıkarabilir. Eski veya uyumsuz bir eklenti tüm Outlook'u donabilir. Belirti: Güvenli modda açılıyor ama normal modda açılmıyor.

## Çözüm:

1. Outlook'u güvenli modda açın (Windows + R, "outlook.exe /safe")

2. Dosya > Seçenekler > Eklentiler

3. En altta "Yönet: COM Eklentileri" seçin, "Git" deyin

4. Tüm eklentileri devre dışı bırakın

5. Outlook'u kapatıp normal şekilde açın

6. Çalışıyorsa, eklentileri tek tek aktifleştirip hangisinin sorun çıkardığını bulun

3. Outlook Profili Bozulmuş

Outlook her hesap için bir "profil" tutar. Bu profil içinde hesap ayarları, görünüm tercihleri, kayıtlı şifreler bulunur. Profil bozulduğunda Outlook açılırken takılır.

## Çözüm: Yeni profil oluşturma:

1. Denetim Masası > Posta (Mail)

2. "Profilleri Göster"

3. "Ekle" deyip yeni bir profil oluşturun

4. E-posta adresinizi ve şifrenizi girin

5. "Her zaman bu profili kullan" seçin ve yeni profili gösterin

4. Office Kurulumu Bozulmuş

Office kurulumunun bazı dosyaları silinmiş veya bozulmuş olabilir. Bu durumda hızlı onarım denenebilir.

## Çözüm:

1. Ayarlar > Uygulamalar > Yüklü Uygulamalar

2. "Microsoft 365" veya "Microsoft Office"i bulun

3. Üç noktaya tıklayın > Değiştir

4. "Hızlı Onarım" seçin ve başlatın

5. Sorun devam ederse "Çevrimiçi Onarım" deneyin (uzun sürer ama daha kapsamlıdır)

5. OST Dosyası Çok Büyümüş

Eğer Exchange veya Microsoft 365 hesabı kullanıyorsanız, OST dosyanız zamanla büyür. 50 GB'ı aşan OST'ler Outlook'un performansını ciddi şekilde düşürür. Çözüm: Outlook'un "Çevrimdışı tut" süresini kısaltın. Dosya > Hesap Ayarları > Hesap Ayarları > E-posta sekmesi > Hesabınız > Değiştir > "Çevrimdışı tut" 1 yıl veya daha az olarak ayarlayın. Eski mailler hala sunucuda durur, sadece yerelde tutulmazlar.

6. Antivirüs Engellemesi

Bazı antivirüs yazılımları Outlook'a "müdahale" etmeye çalışır (e-postaları taramak için) ve bu süreç Outlook'u dondurabilir. Çözüm: Antivirüs ayarlarına girin, "e-posta tarama" özelliğini kapatın veya Outlook.exe'yi izinli uygulamalar listesine ekleyin. Modern Windows Defender bu işi sorunsuz yapar, başka bir antivirüs gerekmiyorsa kaldırmak da çözüm.

7. Windows Güncellemesi Çakışması

Bazen Windows güncellemesi sonrası Outlook çalışmaz olur. Office ile Windows arasında geçici bir uyumsuzluk olur. Çözüm: Microsoft genelde çabucak yama çıkarır. Office Update ve Windows Update'i kontrol edin, son sürümleri yükleyin. Güncellenecek bir şey yoksa birkaç gün bekleyip tekrar deneyin.

8. Hesap Şifresi Yenilendi ama Outlook Eski Şifreyi Hatırlıyor

Web üzerinden e-posta şifrenizi değiştirdiniz ama Outlook hala eskiyi kullanmaya çalışıyor. Sürekli "kimlik doğrulama hatası" veya açılmama yaşıyorsunuz. Çözüm: Denetim Masası > Kimlik Bilgileri Yöneticisi > Windows Kimlik Bilgileri > E-posta hesabınızla ilgili kayıtları silin. Outlook'u açın, yeni şifreyle yeniden giriş yapın.

9. PST Dosyası Çok Büyümüş veya Yer Yok

Yerel PST dosyanız 50 GB'ı geçtiyse veya bilgisayarınızda yer kalmadıysa Outlook açılırken takılabilir. Çözüm: Disk doluluğunuzu kontrol edin (en az %20 boş alan olmalı). PST'niz çok büyükse arşivleme yapın: eski mailleri ayrı bir PST'ye taşıyın ve ana PST'yi küçültün.

10. İnternet Bağlantısı Sorunu

Outlook açılırken sunucuya bağlanmaya çalışır. Eğer internet yavaşsa veya sürekli kopuyorsa, açılış sürecinde takılabilir. Çözüm: Önce Outlook'u "çevrimdışı modda" açmayı deneyin (Gönder/Al sekmesi > Çevrimdışı Çalış). Eğer bu modda açılıyorsa sorun bağlantıdadır. E-posta gelmiyor sorunları yazımız bağlantı sorunlarını detaylı ele alıyor.

## Hala Çözülmediyse: Son Çareler

Yukarıdaki adımları denediniz ama Outlook hala açılmıyor mu? İki seçenek var:

1. Office'i Tamamen Kaldırıp Yeniden Yükleme

Microsoft'un "Office Removal Tool"u ile tüm Office izlerini sildirin, sonra yeni Office'i yükleyin. Bu işlem 30- 60 dakika sürer ama çoğu kalıcı sorunu çözer.

2. Geçici Çözüm: Web Outlook Kullanın

Microsoft 365 hesabınız varsa outlook.office.com adresinden web üzerinden Outlook'u kullanabilirsiniz. Tüm e-postalarınız orada. Masaüstü Outlook'unuzu çözene kadar geçici olarak web sürümünü kullanmak iş kaybını engeller.

## Şirketinizde Outlook Sorunları Sürekli Çıkıyorsa

Bir kişide Outlook açılmazsa bir günde çözebilirsiniz. Ama eğer şirketinizde her hafta birkaç çalışan Outlook sorunları yaşıyorsa, durum farklıdır. Bu genelde altta yatan bir altyapı problemini gösterir: kötü yapılandırılmış Microsoft 365, eski Outlook sürümleri, yetersiz disk alanları, sürdürülemez bir e- posta arşivleme stratejisi. Profesyonel bir IT desteği bu sorunları tek tek çözmek yerine kök sebepleri kaldırır. Hangi çalışanların hangi versiyonu kullandığı, hangi profilin nasıl yapılandırıldığı, kimin nereden destek aldığı — hepsi merkezi olarak yönetilir. Her şikayet bir krize dönüşmez, sistemli bir bakım rutinine girer.

## Sıkça Sorulan Sorular

Outlook'u sıfırlamak güvenli mi? Maillerimi kaybeder miyim? Profili sıfırlamak yerel veri dosyasını etkilemez — yeniden hesap eklediğinizde mailler tekrar indirilir (Microsoft 365 / Exchange için bulutta zaten duruyor). PST dosyası kullanıyorsanız önce yedeğini almanız iyi olur. Tam Office onarımı da maillerinizi etkilemez.

## Outlook yerine başka bir e-posta uygulaması kullanabilir miyim?

Evet, Thunderbird (ücretsiz, açık kaynak) iyi bir alternatiftir. Modern alternatifler arasında Mailspring, eM Client de var. Ama eğer şirketiniz Outlook kullanıyor ve takvim/ortak klasör paylaşımları varsa, alternatif uygulamalar bazı özellikleri tam desteklemez.

## Outlook her açılışta neden geç açılıyor?

Birkaç sebepten: çok büyük PST/OST dosyası, çok fazla eklenti, yavaş disk (HDD), büyük gelen kutusu (klasörde çok mail varsa indeksleme zamanı uzar). PST'yi küçültmek, eklentileri temizlemek ve SSD'ye geçmek bu sorunu çözer. Outlook açılırken "veri dosyası kullanılıyor" hatası alıyorum, ne yapayım? Bu, başka bir Outlook süreci hala çalışıyor demektir. Görev Yöneticisi'ni açın (Ctrl+Shift+Esc), tüm Outlook.exe süreçlerini sonlandırın, sonra Outlook'u tekrar açın. Bu işe yaramazsa bilgisayarı yeniden başlatın.

## Şirketinizdeki Outlook ve Office Sorunlarına Sistemli Çözüm

Eğer çalışanlarınız sürekli Outlook ve Office sorunları yaşıyorsa, tek tek müdahale etmek yerine sistemli bir destek hizmeti çok daha verimlidir. Ücretsiz keşif görüşmesinde mevcut Office kurulumunuzu değerlendirelim ve sorunları kalıcı olarak çözelim.

## Ücretsiz Keşif Planla →

## Sonuç

Outlook sorunları sinir bozucudur ama çoğunlukla çözülebilir. Yukarıdaki 10 sebep bir kontrol listesi olarak kullanılabilir. Sorun karmaşık ise (örneğin tüm denemelere rağmen çalışmıyorsa) tam onarım veya yeniden kurulum gündeme gelebilir. Şirket ortamında Outlook sorunları sistemli destek ile çok daha az yaşanır. Excel donuyor sorunları için yazımıza da bakabilirsiniz, çünkü Office uygulamaları benzer sebeplerle sorun çıkarabilir. Profesyonel destek için Son Kullanıcı Destek Hattı hizmetimiz mevcut.

## OFFİCE

11. Excel Çok Yavaş Açılıyor veya Donuyor: Çözüm

Rehberi
