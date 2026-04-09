---
slug: fidye-yazilimi-saldirisi-yapilacaklar
title: "Fidye Yazılımı Saldırısı Sonrası Ne Yapmalı? Adım Adım Müdahale"
type: cluster
pillar: 2
url: "/blog/fidye-yazilimi-saldirisi-yapilacaklar"
hedef_anahtar_kelime: "fidye yazılımı saldırısı sonrası yapılacaklar"
meta_description: "Şirketinize fidye yazılımı bulaştı mı? Adım adım acil müdahale rehberi. Ne yapmalı, ne yapmamalı, kimleri aramalı."
kelime_sayisi: "~2000"
pillar_linki: "/kobi-siber-guvenlik, /sirket-veri-yedekleme"
---

İlk Şok Anında: Kontrolü Kaybetmeyin Bilgisayar açıldı ve karşınıza siyah bir ekran çıktı: "Tüm dosyalarınız şifrelendi. 000 USD Bitcoin gönderin." Veya bir çalışanınız panikle aradı: "Dosyaların hepsinin uzantısı değişmiş, açılmıyor."

Fidye yazılımı saldırısı yaşıyorsunuz. İlk dakikalardaki kararlar saldırının yayılmasını ve toplam zararınızı belirleyecek. Bu yazı bir teorik rehber değil, kriz anında okumak için yazılmış pratik bir müdahale kılavuzudur.

Sırayla okuyun ve uygulayın.

### Adım 1

Etkilenen Sistemleri İzole Edin (İlk 5 Dakika) Yapılması gereken en kritik şey budur ve panik halinde unutulur. Etkilenen bilgisayarın ağ bağlantısını kesin — kabloyu çekin, Wi-Fi'sini kapatın, bilgisayarı kapatmayın. Çünkü modern fidye yazılımları ağ üzerinden diğer bilgisayarlara, sunuculara, paylaşılan klasörlere yayılır.

Her geçen dakika başka bir cihaz şifrelenir. İzolasyon yayılmayı durduran tek şeydir. Eğer birden fazla bilgisayarda belirti varsa, ağı tamamen ayırın — internet kablosunu çekin, switch'i kapatın.

Geçici olarak tüm şirketin internetini durdurmak, fidye yazılımının tüm sunuculara yayılmasından çok daha iyidir.

### Adım 2

Bilgisayarı Kapatmayın İçgüdüsel olarak "kapayalım, gitsin" derseniz hata yapmış olursunuz. Çalışan bir şifreleme süreci var — kapatırsanız bazı dosyalar kısmen şifrelenmiş ve kurtarılamaz hale gelir. RAM'de saldırı izleri olabilir, kapatınca bunlar kaybolur.

Bilgisayarı sadece ağdan ayırın, açık bırakın.

### Adım 3

Fidye Notunu ve Belirtileri Belgeleyin Telefonunuzla fidye notunun fotoğrafını çekin. Hangi dosyaların etkilendiğini, hangi uzantıların eklendiğini not edin. Saatini kaydedin.

Bu belgeler ileride çok lazım olacak: forensik analiz, sigorta talebi, KVKK ihlal bildirimi, polis şikayeti, decryptor arama.

### Adım 4

Profesyonel Yardım Çağırın Fidye yazılımı kendi başınıza çözebileceğiniz bir şey değildir. Hemen siber güvenlik uzmanlarına ulaşın. Yönetilen IT sağlayıcınız varsa onu, yoksa acil siber müdahale hizmeti veren bir firmayı arayın.

Çoğu MSP 7/24 acil müdahale hattı tutar.

### Adım 5

Yetkililere Bildirim Yapın Türkiye'de fidye yazılımı saldırısı suçtur ve mağdurun da bazı yükümlülükleri vardır: USOM (Ulusal Siber Olaylara Müdahale Merkezi): Bildirim yapılmalıdır.

### Adım 6

Fidye Ödemeyin FBI, Europol, ABD Hazinesi, Türkiye USOM ve neredeyse tüm güvenlik otoriteleri tek sesle aynı şeyi söyler: fidye ödemeyin.

### Adım 7

Decryptor Araçlarını Araştırın Bazı fidye yazılımı ailelerinin ücretsiz decryptor'ları vardır. org sitesi (Europol ortaklığında) yüzlerce fidye yazılımı için decryptor sunar. Hangi aile size bulaştığını teknik analiz ile tespit edip uygun araçla denersiniz.

%100 başarı garantisi yok ama denemeye değer.

### Adım 8

Yedekten Geri Dönüş Eğer 3-2-1 kuralına uygun yedekleriniz varsa, ana kurtarma yolu burasıdır.

### Adım 9

Saldırı Sonrası Analiz Sistem normale döndükten sonra, saldırının nasıl başladığını anlamak şarttır. Aksi halde aynı yoldan tekrar saldırıya uğrarsınız. Bu analizde şu sorular cevaplanır: İlk bulaşma noktası nereydi?

(E-posta eki, indirme, RDP ile dış erişim, vb.) Ne kadar süredir sistemde gizliydi? Hangi verilere erişti, hangilerini dışarı sızdırdı?

Hangi kullanıcı hesabı tehlikeye girdi? Hangi güvenlik kontrollerimiz başarısız oldu? Hangi önlemleri alırsak tekrarlamaz?

### Adım 10

KVKK İhlal Bildirimi Eğer kişisel veriler etkilendiyse (müşteri bilgileri, çalışan bilgileri, tedarikçi kayıtları) KVKK Kurumu'na 72 saat içinde bildirim yapmak zorunludur. Bildirim yapılmaması ciddi ek cezalara yol açar. İhlal bildiriminde olayın özeti, etkilenen kişi sayısı, alınan tedbirler yer almalıdır.

## Saldırıdan Önce Yapılması Gerekenler

Bu yazı kriz anına odaklı ama gerçek koruma kriz öncesi gelir. [KOBİ siber güvenlik] yazımızda detaylı anlattığımız katmanlı savunma, fidye yazılımının ulaşmasını engellemek için en etkili yöntemdir. Ek olarak iyi yedekleme yapılmadan hiçbir şirket ransomware'den güvende sayılmaz — [3-2-1 yedekleme kuralı] yazımız bunu açıklıyor.

🚨 ŞU ANDA FİDYE YAZILIMI SALDIRISI MI YAŞIYORSUNUZ? ACİL MÜDAHALE HATTI: 0541 636 77 75 Kozyatağı Bilişim siber güvenlik ekibi 7/24 ulaşılabilir. Şimdi arayın, panik yapmadan adım adım yönlendirelim.

## Sonuç

Fidye yazılımı bir KOBİ'nin yaşayabileceği en sarsıcı IT olaylardan biridir ama yönetilebilir. Önemli olan sistematik yaklaşmak, doğru adımları doğru sırayla atmak ve profesyonel destek almaktır. Kriz anında kendi başına karar vermeye çalışan KOBİ sahipleri çoğu zaman yanlış adımlar atar ve durumu kötüleştirir.

Yukarıdaki 10 adımı ezberleyin veya yazıcıdan çıkarıp duvara asın — ihtiyaç halinde rehberiniz olsun.
