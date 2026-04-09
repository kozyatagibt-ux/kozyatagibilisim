---
slug: eposta-gelmiyor-gonderilmiyor
title: "E-postalarım Gelmiyor veya Gönderilmiyor: Adım Adım Çözüm"
type: cluster
pillar: 6
url: "/blog/eposta-gelmiyor-gonderilmiyor"
hedef_anahtar_kelime: "e-posta gelmiyor"
meta_title: "E-postalarım Gelmiyor veya Gönderilmiyor — Adım Adım Çözüm | Kozyatağı Bilişim"
meta_description: "E-postalarınız gelmiyor veya gönderilmiyor mu? Yaygın sebepler ve adım adım çözümler. Outlook, Gmail, kurumsal mailler için çalışan rehber."
kelime_sayisi: "~1700"
pillar_linki: "/kobi-siber-guvenlik"
---

Sabah açtığınız e-posta kutusu boş — gelmesi gereken bir sürü e-posta var ama görünmüyor. Veya gönder tuşuna basıyorsunuz, mesaj bir türlü çıkmıyor, "gönderim hatası" alıyorsunuz. E-posta sorunları iş hayatında kabusun adıdır çünkü iletişim duruyor. Bu yazıda gelmeme ve gönderememe sorunlarının yaygın sebeplerini ve hızlı çözüm yollarını anlatacağız.

## Önce sorunu kategorize edelim:

## Kategori A: Gönderdiğiniz mailler karşıya gitmiyor

Kategori B: Size gönderilen mailler size ulaşmıyor Kategori C: Hem alma hem gönderme sorunlu Üçü için de farklı sebepler ve çözümler var.

## Önce Bunları Deneyin (5 Dakika)

## Hızlı kontroller:

1. İnternetiniz çalışıyor mu? Tarayıcıda bir site açın

2. E-posta uygulamanızı kapatıp açın

3. Web tarayıcısından e-posta hesabınıza girin (Gmail.com, outlook.com vs.) — orada sorun var mı?

4. Spam/gereksiz klasörünü kontrol edin

5. Disk alanınız dolu mu? (E-posta hizmeti dolduysa yeni mail kabul etmez)

Bu basit kontroller sorunların yarısını çözer. Devam edemezseniz aşağıdaki bölümlere bakın.

## Kategori A: Mailleriniz Gönderilmiyor

1. SMTP Sunucusu Reddetti (Gönderim Sınırı)

E-posta sağlayıcıları (Gmail, Outlook, hosting firmaları) günlük gönderim sınırı koyar. Eğer kısa sürede çok mail gönderdiyseniz, sağlayıcı sizi geçici olarak engelleyebilir. Bu engelleme genelde 24 saatte kalkar. Belirti: "550 daily sending quota exceeded" veya benzeri bir hata mesajı. Ne yapmalı: 24 saat bekleyin. Bu sürede önemli mailleri başka bir hesaptan gönderebilirsiniz. Düzenli olarak çok mail gönderiyorsanız, e-posta sağlayıcınızla limit artırma konusunda görüşün.

2. Alıcı Sunucusu Sizi Reddediyor (Spam Filtresi)

Gönderdiğiniz mailler karşı tarafa hiç ulaşmıyor. Sebep: alıcının spam filtresi sizi engellemiş. Bu özellikle yeni hesaplarda veya çok mail atan hesaplarda olur. Belirti: Mail "gönderildi" görünür ama alıcıya ulaşmaz, bazen "delivery failed" geri gelir. Ne yapmalı: Alıcıya başka kanaldan ulaşıp spam klasörünü kontrol etmesini isteyin. Çıkıyorsa "spam değil" işaretlemesi yapsın. Sürekli olarak bu sorunu yaşıyorsanız, alan adınızın SPF, DKIM, DMARC kayıtlarının doğru kurulduğunu IT'ye kontrol ettirin — bu kayıtlar spam filtreleri için çok önemlidir.

3. Ek Dosya Çok Büyük

E-posta sağlayıcıları ekli dosya boyutuna sınır koyar. Gmail 25 MB, Outlook 20 MB, çoğu kurumsal sağlayıcı 25-50 MB arası. Daha büyük dosyalar reddedilir. Ne yapmalı: Büyük dosyaları bulut depolama servisine yükleyip (Google Drive, OneDrive, WeTransfer) link gönderin. Hem boyut sorunu çözülür hem alıcı kontrolü size kalır.

4. Gönderici Adresi Doğrulanmamış

Eğer e-posta uygulamasında "şu adres olarak gönder" şeklinde başka bir adres ayarladıysanız (örneğin info@firmaniz.com), bu adresin doğrulanmış olması gerekir. Aksi halde çoğu modern sağlayıcı reddeder. Ne yapmalı: Gerçek doğrulanmış adresinizden gönderin. Veya adresi sağlayıcıdan resmi olarak ekletin.

5. Antivirüs Engellemesi

Bazı antivirüs yazılımları "şüpheli" gördüğü mailleri engeller. Özellikle ekli dosya varsa. Ne yapmalı: Geçici olarak antivirüsün e-posta tarama modülünü kapatın ve maili gönderin. Çalışıyorsa antivirüs ayarlarından e-posta uygulamanızı izinli listeye ekleyin.

## Kategori B: Mailler Size Ulaşmıyor

1. Spam Klasörünü Kontrol Etmediniz

En basit ama en sık gözden kaçan. Gelmesi gereken mail spam klasörüne düşmüş olabilir. Özellikle yeni iletişim kurduğunuz biri için yaygın. Ne yapmalı: Spam klasörünüzü kontrol edin. Maili buldunuz ise "spam değil" işaretleyin — sonraki maillerin gelen kutusuna düşmesi sağlanır.

2. E-posta Kutusu Doldu

Eğer e-posta hesabınızın depolama alanı dolduysa, yeni mailler alınmaz. Sağlayıcı reddeder ve gönderene "kutu dolu" hatası gider. Ne yapmalı: E-posta hesabınıza web tarayıcısından girin ve depolama yüzdesine bakın. %100'e yakınsa eski mailleri silin (özellikle ek dosyalı olanlar yer kaplar). Gmail için Çöp Kutusu'nu da boşaltmayı unutmayın.

3. Yanlışlıkla Filtreyle Yönlendirildi

E-posta hesabınızda kurulu olan bir kural (filtre) bazı mailleri otomatik olarak siliyor veya başka bir klasöre yönlendiriyor olabilir. Bu kuralı siz kurmuş ve unutmuş olabilirsiniz. Ne yapmalı: E-posta ayarlarına girip "Filtreler" veya "Kurallar" bölümünü kontrol edin. Şüpheli kuralları silin.

4. Hesabınız Hacklendi (Tehlikeli)

Eğer mailler "geliyor ama yok oluyor" ise, hesabınız hacklenmiş olabilir. Saldırgan mailleri okuyup siliyor veya başka bir hesaba yönlendiriyor olabilir. Ne yapmalı: Şifrenizi acilen değiştirin, iki faktörlü kimlik doğrulamayı aktifleştirin, son giriş aktivitelerini kontrol edin. E-posta hesabım hacklendi mi yazımız bu durumu detaylı ele alıyor.

5. Domain veya MX Kaydı Sorunu (İleri Düzey)

Eğer kendi alan adınızda e-posta kullanıyorsanız (örn: ben@firma.com.tr) ve hiç mail gelmiyorsa, alan adının MX kaydı (mail yönlendirme kaydı) bozulmuş olabilir. Bu teknik bir sorundur ve IT desteği gerekir. Ne yapmalı: Alan adınızın yönetildiği yere (hosting firması) IT'nizi yönlendirin. MX kayıtlarını kontrol etsinler.

## Kategori C: Hem Alma Hem Gönderme Sorunlu

Bu durumda büyük ihtimalle sorun e-posta uygulamasında veya hesap ayarlarındadır.

1. Yanlış Sunucu Ayarları

Outlook, Thunderbird gibi uygulamalarda hesap ekledikten sonra IMAP, POP ve SMTP ayarları girilir. Bunlar yanlışsa hiç çalışmaz. Ne yapmalı: E-posta sağlayıcınızın resmi belgelerinde doğru ayarları bulun ve uygulamada kontrol edin. Hatalı port, yanlış sunucu adı veya yanlış güvenlik ayarı en yaygın hatadır.

2. Şifre Yanlış

Web üzerinden şifre değiştirdiyseniz ama uygulamada eski şifre kayıtlıysa, sürekli "kimlik doğrulama hatası" alırsınız. Ne yapmalı: Uygulamadan hesabı kaldırın ve yeni şifre ile tekrar ekleyin.

3. Senkronizasyon Sorunu

Bazen e-posta uygulaması "yenileme" işlemini yapamaz. Eski mailleri gösterir ama yeni gelen veya gidenleri sunucu ile eşlemez. Ne yapmalı: Uygulamayı kapatıp açın. Çalışmıyorsa hesabı kaldırıp yeniden ekleyin (e-postalar tekrar indirilir).

## İş Mailleri İçin Önemli Notlar

Kişisel e-posta (Gmail, Outlook.com) için çözümler nispeten basittir. Ama kurumsal e-posta (sirket.com.tr alanında) için durum daha karmaşıktır: SPF, DKIM, DMARC kayıtları doğru kurulmuş olmalı (yoksa mailleriniz spam olarak işaretlenir)

## Reverse DNS ayarları yapılmış olmalı

Gönderim sunucunuzun IP'si "kara listede" olmamalı Sağlayıcı seçimi önemli (ucuz hosting'ler genelde teslimat oranı düşük olur) Bu konular IT bilgisi gerektirir. Eğer bunlardan kaynaklı kronik mail sorunları yaşıyorsanız, profesyonel yardım almak yerinde olur.

## Şirketinizde Çalışanlar Sürekli Mail Sorunu Yaşıyorsa

Tek bir kişinin mail sorunu kişisel bir mesele olabilir ama eğer şirketinizde birden fazla çalışan sürekli mail problemleri yaşıyorsa, e-posta altyapınızda kronik bir sorun var demektir. Belki paylaşımlı bir ucuz hosting kullanıyorsunuzdur, belki SPF/DKIM kurulmamıştır, belki kullanıcılarınız yanlış sunucu ayarlarıyla çalışıyordur. Modern bir KOBİ için en sağlıklı çözüm Microsoft 365 veya Google Workspace gibi profesyonel iş e- posta platformlarına geçiştir. Bu platformlar 99.9% uptime garantili, yüksek teslimat oranlı, güçlü spam filtreli ve kurumsal yönetim araçlarıyla gelir. Aylık kullanıcı başına 60-150 TL bandında olur, kronik mail sorunlarının zaman maliyeti yanında çok küçüktür.

## Sıkça Sorulan Sorular

Müşterilerime gönderdiğim mailler spam'e düşüyor, ne yapmalıyım? Bu yaygın bir kurumsal sorundur ve çözümü teknik. Alan adınızın SPF, DKIM ve DMARC kayıtlarının doğru kurulmuş olması gerekir. Bunlar olmadan modern spam filtreleri sizi otomatik olarak güvensiz görür. IT'nizden kontrol etmesini isteyin.

## Gmail mi Outlook mu daha iyi iş için?

Her ikisi de profesyonel düzeyde çalışır. Microsoft 365 (Outlook + diğer Office uygulamaları) genelde Türkiye'de daha yaygın ve KOBİ'ler için tanıdık. Google Workspace daha modern ve bulut tabanlı çalışmaya daha uygun. Çalışanlarınızın hangisini daha rahat kullanacağına göre karar verin.

## Ücretsiz e-posta hizmetleri (Yandex, Yahoo) iş için uygun mu?

Genelde hayır. Profesyonel bir intibah bırakmak için kendi alan adınızda e-posta kullanmanız gerekir (info@firma.com gibi). Ücretsiz hizmetlerin kurumsal kullanımı çoğu sözleşmede yasaktır ve hesabınız bir gün hiçbir uyarı olmadan kapatılabilir.

## Ek dosya gönderemiyorum, alternatifim ne?

Büyük dosyalar için WeTransfer (3 GB'a kadar ücretsiz), Google Drive, OneDrive veya Dropbox kullanın. Dosyayı yükleyip link gönderin. Bu hem boyut sorununu çözer hem de dosyanın kim, ne zaman indirdiğini görebilirsiniz.

## Şirket E-posta Altyapınızı Birlikte Değerlendirelim

Eğer şirketinizde sürekli e-posta sorunları yaşanıyorsa, bireysel müdahalelerden öteye geçip altyapıyı sağlamlaştırmak gerekir. Ücretsiz keşif görüşmesinde mevcut sisteminizi dinleyelim ve modern bir çözüm yol haritası birlikte çıkaralım.

## Ücretsiz Keşif Planla →

## Sonuç

E-posta sorunları çözülmesi gereken acil meselelerdir çünkü iş iletişimini durdurur. Yukarıdaki adımlar büyük çoğunluğu çözer. Çözüm bulamadığınız durumlarda problemin altyapı seviyesinde olduğunu kabul edip profesyonel destek aramak en doğrusu. Şirket e-posta altyapısını modernize etmek istiyorsanız Kozyatağı Bilişim Son Kullanıcı Destek Hattı hizmetimiz Microsoft 365 ve Google Workspace dahil tüm profesyonel e-posta çözümlerinde destek sağlar. Outlook açılmıyor sorunları yaşıyorsanız ayrı yazımıza da bakabilirsiniz.

## GÜVENLİK

7. Bilgisayarıma Virüs Bulaştı mı? Belirtileri ve

Yapılması Gerekenler
