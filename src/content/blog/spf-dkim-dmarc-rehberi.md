---
slug: spf-dkim-dmarc-rehberi
title: "SPF, DKIM, DMARC: E-posta Güvenliği İçin Üçlü Kalkan"
type: cluster
pillar: 3
url: "/blog/spf-dkim-dmarc-rehberi"
hedef_anahtar_kelime: "spf dkim dmarc nasıl kurulur"
meta_description: "SPF, DKIM ve DMARC nedir, neden gerekli, nasıl kurulur? E-posta sahteciliğine karşı koruma için DNS kayıt örnekleriyle pratik rehber."
kelime_sayisi: "~2000"
pillar_linki: "/kobi-siber-guvenlik, /sirket-veri-yedekleme"
---

"Müdüründen E-posta Geldi, Para Gönderin Dedi" Her hafta Türkiye'de bir KOBİ'nin başına şu olay geliyor: muhasebe departmanına şirketin CEO'sunun e- posta adresinden bir e-posta geliyor. "Bugün acil bir iş için şu hesaba şu kadar para göndermen lazım, toplantıdayım arayamam, yarın açıklarım" diyor. Muhasebeci güveniyor, parayı gönderiyor.

Ertesi gün CEO'ya soruyor: "haberim yok, ne parası" diye cevap geliyor. Bu bir "Business Email Compromise" (BEC) saldırısıdır ve dünyada her yıl milyarlarca dolar zarara yol açar. Saldırgan CEO'nun e-postasını gerçekten ele geçirmemiştir; sadece e-posta adresini taklit etmiştir.

SMTP protokolü 1980'lerde tasarlandığında kimlik doğrulama düşünülmemişti, bu yüzden bir e-postanın gerçekten iddia edilen adresten gelip gelmediğini doğrulamak doğal olarak mümkün değildir. İşte SPF, DKIM ve DMARC bu sorunu çözmek için tasarlanmış üç DNS kayıt türüdür. Üçü birlikte çalıştığında e-posta sahteciliğine karşı çok güçlü bir koruma oluştururlar.

SPF (Sender Policy Framework) SPF'nin temel mantığı: "şirketimin domain'inden e-posta gönderebilecek sunucuların listesini ben belirlerim". Domain sahibi DNS'e bir TXT kaydı ekler ve "benim adıma sadece şu IP adreslerinden veya şu sunuculardan gelen e-postalar gerçektir" der. Alıcı sunucu e-posta geldiğinde bu kayda bakar ve gönderici sunucunun listede olup olmadığını kontrol eder.

com -all Bu kayıt der ki: "benim domainim için Microsoft (Outlook) ve Google (Gmail) sunucuları meşrudur, başka kimseden gelen e-postaları reddedin (-all)". SPF kayıt parçaları: v=spf1 — versiyon belirteci, sabit include: — yetkilendirilen başka SPF kayıtlarını dahil etme (örn. mail sağlayıcınızın) ip4: veya ip6: — belirli IP adreslerini yetkilendirme a veya mx — domain'in A veya MX kayıtlarını otomatik dahil etme -all — listedeki dışında kimseye izin verme (sıkı) ~all — listedeki dışında olanları "şüpheli" işaretle ama bloklamayın (yumuşak) SPF kaydı tek başına yetersizdir çünkü sadece "envelope from" kısmını kontrol eder, görünen "from" adresini kontrol etmez.

Bu yüzden DKIM ve DMARC'a ihtiyaç vardır. DKIM (DomainKeys Identified Mail) DKIM'in mantığı dijital imza üzerinedir. Gönderen sunucu, gönderilen e-postanın belirli kısımlarını (genellikle başlık + gövde) kriptografik olarak imzalar ve bu imzayı e-postanın başlığına ekler.

Alıcı sunucu da göndericinin DNS'inden public key'i alır, imzayı doğrular. Eğer doğrulanırsa e-postanın iddia edilen domainden geldiğine ve yolda değiştirilmediğine emin olur. com IN TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3..."

Public key uzun bir base64 stringidir, mail sağlayıcınız tarafından üretilir. Sadece DNS'e koyarsınız, diğer her şeyi sağlayıcı yapar. DKIM'in en güçlü yanı: e-postanın yolda değiştirilip değiştirilmediğini de tespit eder.

Yani sadece gönderici doğrulama değil, içerik bütünlüğü kontrolü de yapar. DMARC (Domain-based Message Authentication, Reporting and Conformance) DMARC, SPF ve DKIM'i bir politika çatısı altında birleştirir. SPF veya DKIM doğrulamasından geçemeyen e-postalar olduğunda alıcı sunucuya ne yapması gerektiğini söyler ve raporlama mekanizması sunar.

com; pct=100" DMARC politika seçenekleri: p=none — hiçbir şey yapma, sadece raporla (başlangıç için) p=quarantine — şüpheli olarak işaretle (spam'a düşür) p=reject — direkt reddet rua alanı, başarısız doğrulama raporlarının gönderileceği adresi belirtir. Bu raporları okuyarak domain'inize karşı yapılan sahtecilik girişimlerini görebilirsiniz. Üçü Birlikte Nasıl Çalışır?

com adresinden e-posta göndermeye çalışıyor. Süreç şöyle işler: 1. com olarak e-posta gönderir 2.

com'un DNS'ine bakar 3. SPF kontrolü: saldırganın sunucusu yetkili IP'ler listesinde mi? Hayır.

SPF başarısız. 4. DKIM kontrolü: e-postada geçerli bir DKIM imzası var mı?

Hayır (saldırgan private key'e sahip değil). DKIM başarısız. 5.

DMARC politikasına bakılır: p=reject. Yani direkt reddet. 6.

E-posta hiç ulaşmaz, alıcı görmez bile. com'dan sahte e-posta gönderebilen tek kişi sizsiniz.

## Pratik Kurulum Adımları

### Adım 1

E-posta sağlayıcınızdan (Microsoft 365, Google Workspace, vs.) SPF ve DKIM kayıtlarınızı alın. Her sağlayıcının kendi kılavuzu var.

### Adım 2

).

### Adım 3

SPF için yeni bir TXT kaydı oluşturun. Host: @, value: SPF stringi.

### Adım 4

DKIM için sağlayıcının verdiği selector'lı TXT kaydını ekleyin. _domainkey, value: public key.

### Adım 5

DMARC için yeni bir TXT kaydı. Host: _dmarc, value: DMARC stringi. Başlangıçta p=none ile başlayın.

Birkaç hafta raporları izleyin, meşru e-postalarınızın doğrulamadan geçtiğini gördükten sonra önce quarantine, sonra reject'e geçin.

### Adım 6

Birkaç saat bekleyip MXToolbox veya Mail-Tester gibi araçlarla doğrulayın.

## Yaygın Hatalar

Birden fazla SPF kaydı: Bir domain için yalnızca bir SPF kaydı olabilir. İki kayıt varsa ikisi de geçersiz sayılır. Çok fazla DNS lookup: SPF kaydı içinde 10'dan fazla "include" varsa standart aşılır.

DMARC'ı doğrudan reject ile başlatmak: Önce none ile izleyin, sonra sıkılaştırın. Yoksa kendi meşru e-postalarınız reddedilebilir. Üçüncü parti gönderenleri unutmak: Mailchimp, SendGrid, CRM sistemi gibi şirket adınıza e-posta gönderen servisleri SPF'e dahil etmemek.

E-posta phishing saldırıları hakkında daha fazla bilgi için [e-posta phishing engelleme] yazımızı okuyun. Konunun siber güvenlik bağlamı için [KOBİ siber güvenlik rehberi] yazımıza bakın. E-posta Yapılandırmanızı Ücretsiz Kontrol Edelim SPF, DKIM ve DMARC kayıtlarınızın doğru kurulu olup olmadığını kontrol edip raporluyoruz.

Eksikleri tespit ediyor, yapılandırmayı sizinle birlikte yapıyoruz.

## Sonuç

E-posta protokolünün doğal olarak güvensiz olduğu gerçeği değişmiyor, ama SPF, DKIM ve DMARC bu boşluğu kapatmak için tasarlandı. Üçü birlikte düzgün yapılandırıldığında, domain'inizden sahte e-posta göndermek pratikte imkansız hale gelir. Kurulumu zor değil — birkaç DNS kaydı eklemekten ibaret.

Ama yapmayan şirketler hala saldırıya uğrayıp para kaybediyor. İki saatlik bir iş, milyonlarca lira değerinde bir koruma sağlıyor.
