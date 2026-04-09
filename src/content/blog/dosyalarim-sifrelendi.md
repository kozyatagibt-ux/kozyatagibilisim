---
slug: dosyalarim-sifrelendi
title: "Dosyalarım Şifrelendi, Açılmıyor: Acil Durum Rehberi"
type: cluster
pillar: 7
url: "/blog/dosyalarim-sifrelendi"
hedef_anahtar_kelime: "dosyalarım şifrelendi açılmıyor"
meta_title: "Dosyalarım Şifrelendi ve Açılmıyor — Acil Durum Rehberi | Kozyatağı Bilişim"
meta_description: "Dosyalarınız aniden şifrelendi mi? Açılmıyor ve fidye notu mu çıktı? Bu acil durum rehberi ilk ne yapmanız gerektiğini adım adım anlatır."
kelime_sayisi: "~1700"
pillar_linki: "/kobi-siber-guvenlik"
---

BU BİR ACİL DURUMDUR. Eğer şu anda dosyalarınızın şifrelendiğini fark ettiyseniz, bu yazıyı baştan sona okumayın — önce aşağıdaki "İLK 5 DAKİKA" bölümüne gidin ve oradaki adımları uygulayın. Sonra geri gelip detayları okuyabilirsiniz. Bilgisayarınızı açtınız, dosyalarınızı bulamıyorsunuz veya açamıyorsunuz. İsimleri değişmiş, garip uzantılar eklenmiş (.locked, .encrypted, .crypto, .help, .recovery gibi). Belki masaüstünüzde "README.txt" veya "RECOVER YOUR FILES.html" gibi bir not var ve içinde "tüm verileriniz şifrelendi, geri almak için Bitcoin ödeyin" yazıyor. Tebrikler — büyük ihtimalle fidye yazılımı (ransomware) saldırısına uğradınız. Bu yazı acil durum içindir. Önce hemen yapmanız gerekenler, sonra durumun daha geniş açıklaması, sonra uzun vadeli kararlar.

## İLK 5 DAKİKA: Hemen Yapın

1. Bilgisayarı KAPATMAYIN. Kapatma içgüdüsel olarak gelir ama yanlış. RAM'de adli inceleme için delil olabilir, kapatınca silinir. Sadece ağdan çıkarın. 2. Ağ kablosunu çekin / Wi-Fi'ı kapatın. En önemli adım. Saldırının yayılmasını durdurur. Ofisteyseniz hemen yapın. 3. Diğer bilgisayarları da kontrol edin. Şirket ağındaysa, diğer çalışanların bilgisayarlarında da aynı durum olabilir. Hepsini ağdan çıkarın.

4. FİDYE ÖDEMEYİN. Şu an karar vermeyin. Sakin olun.

5. Profesyonel yardım çağırın. IT desteğiniz varsa hemen arayın. Yoksa tek başınıza müdahale etmeyin — daha kötüsünü yapma riski yüksek.

## Şu An Ne Olmuş Olabilir?

Eğer fidye notu çıktıysa kesin bir fidye yazılımı saldırısıdır. Saldırgan bir şekilde bilgisayarınıza girmiş, tüm dosyalarınızı şifrelemiş ve şimdi şifre çözme anahtarı için para istiyor. Genelde Bitcoin veya başka kripto para. Talep edilen miktar kişiselse 500-5000 dolar, şirketse 10.000 doların üzerinde olabilir. Saldırgan size 48-72 saat süre verir ve "ödenmezse veriler silinecek" der. Ayrıca son zamanlarda çift baskı (double extortion) yaygın: sadece şifrelemekle kalmazlar, verilerinizi de kopyalarlar ve "ödemezseniz verilerinizi internete koyarız" tehdidi yaparlar.

## Fidye Ödemek Çözüm Müdür? — Açıkça Hayır

Bu en sık sorulan ve en kritik sorudur. Açık cevap: hayır, fidye ödemeyin. Sebepler: 1. Garanti yok: Saldırganların yaklaşık yarısı ödeme alır ve şifreyi vermez veya çalışmayan bir araç gönderir. 2. Tekrar saldırı riski: Bir kere ödeyen müşterinin yine ödeyeceği bilinir. Aynı saldırgan birkaç ay sonra geri gelir. 3. Suç ekosistemini finanse eder: Ödediğiniz para başka şirketlere yapılacak saldırıların finansmanına gider. 4. Yasal sorun: Bazı ülkelerde fidye ödemek yaptırım altındadır. Türkiye'de bu açık olarak yasak değil ama ödediğiniz cüzdanın yaptırım altında bir gruba ait olması durumunda hukuki risk doğar. 5. Çift baskıda yarım çözüm: Ödeseniz bile çalınan veriler hala saldırganın elinde. "Sileceğiz" sözü hiçbir şekilde garanti değildir.

## Dosyalarınızı Geri Almanın Gerçek Yolları

Yöntem 1: Yedeklerinizden Geri Yükleme (En İyi Yöntem) Eğer düzenli ve sağlıklı yedekleriniz varsa — kurtuldunuz. Bilgisayarınızı tamamen formatlayıp temiz Windows kurun, sonra yedeklerden veri geri yükleyin. Tüm süreç 1-3 gün sürer, kayıp minimumdur (en son yedek alma tarihinden bu yana olan değişiklikler). Dikkat: Yedeklerinizin de şifrelenmemiş olduğundan emin olun. Modern fidye yazılımları bilgisayara bağlı yedekleri (NAS, network drive, harici disk) bulup şifreler. Sadece offline veya bulut yedekleri güvenlidir.

## Yöntem 2: Şifre Çözücü Araç Aramak

Bazı eski veya zayıf fidye yazılımları için güvenlik araştırmacıları ücretsiz şifre çözücüler yayınlamıştır.

## Şifre çözücü olup olmadığını kontrol etmek için:

NoMoreRansom.org: Europol ve güvenlik şirketlerinin işbirliğiyle kurulmuş site. Bilgisayarınızdaki şifrelenmiş bir dosyayı yükleyerek hangi türden olduğunu öğrenebilir, varsa şifre çözücüyü indirebilirsiniz. Tamamen ücretsiz. ID Ransomware: Benzer bir hizmet. Fidye notunu veya şifrelenmiş dosyayı yükleyerek tanımlama yapar. Bu yöntem her zaman işe yaramaz çünkü modern fidye yazılımlarının çoğu için çözücü yoktur. Ama denemeye değer — başarısızsa size hiçbir şey kaybettirmez.

## Yöntem 3: Profesyonel Veri Kurtarma

Bazı durumlarda, fidye yazılımı dosyaları tamamen silmeden önce kopyalarını oluşturmuş olabilir. Profesyonel veri kurtarma firmaları bu kopyaları bulabilir. Başarı oranı düşüktür ama bazı vakalarda işe yarar. Maliyet yüksektir (5.000-30.000 TL bandında) ve garanti vermez. Sadece çok kritik veriler için düşünülmeli.

## Yöntem 4: Shadow Copy'leri Kontrol Etmek

Windows'un "Shadow Copy" (Önceki Sürümler) özelliği vardır — sistem otomatik olarak bazı dosyaların eski kopyalarını tutar. Modern fidye yazılımları bunları silmeye çalışır ama bazen başarısız olur. Nasıl kontrol edilir: Dosya gezginini açın, etkilenen klasöre gidin, sağ tıklayın, "Önceki sürümleri geri yükle" seçeneğine bakın. Eğer eski sürümler varsa, onları geri yükleyebilirsiniz.

## Yöntem 5: Bulut Yedeklerinizi Hatırlayın

OneDrive, Google Drive, Dropbox kullanıyorsanız ve dosyalarınızın bir kısmı orada senkron ediliyorsa, bulut servisinin "sürüm geçmişi" özelliği size kurtuluş olabilir. Bulut servisleri genelde silinmiş veya değiştirilmiş dosyaların eski sürümlerini 30-90 gün tutar. Hemen başka bir bilgisayardan (etkilenmemiş olan) bulut hesabınıza girip dosyaların eski sürümlerini geri yükleyin.

## Bilgisayarı Temizleme

Veri kurtarma çabası bittiyse, bilgisayarı temizlemek gerekir. Sadece şifrelenmiş dosyaları silmek yetmez — saldırganın bıraktığı arka kapılar, zararlı yazılım kalıntıları sistemde olabilir. Bu yüzden tek doğru yol tam format ve temiz Windows kurulumudur. Asla "temizleyip kullanmaya devam etmeyin". Bu gizli bir bomba ile yaşamak gibidir — saldırgan ne zaman olursa o zaman tekrar gelebilir.

## Ne Yaptığınızı Belgeleyin

Bu olay sırasında her şeyi belgeleyin:

## Ekran görüntüleri (fidye notu, etkilenen dosyalar)

## Hangi dosyalar etkilendi (mümkünse liste)

## Olay zamanı (yaklaşık)

## Ne yapıldığı (adımlar, zamanlar)

## Etkilenen bilgisayar(lar)

## Bu belgeler için gerekli:

## Sigorta poliçeniz varsa talepte bulunmak için

KVKK bildirimi yapmak için (kişisel veri varsa)

## Polise şikayet için

İleride benzer olay olursa karşılaştırmak için KVKK Bildirimi: Kaçırılmaması Gereken 72 Saat Eğer şirket bilgisayarındaysanız ve etkilenen dosyalar kişisel veri içeriyorsa (müşteri bilgileri, çalışan verileri vs.), KVKK kapsamında 72 saat içinde Kişisel Verileri Koruma Kurulu'na bildirim yapma yükümlülüğünüz vardır. Bu süreyi kaçırmak ek cezalara yol açar. Bildirim için kvkk.gov.tr adresinden başvurabilirsiniz. Bir hukuk danışmanından destek almak en sağlıklısıdır.

## Bu Bir Daha Yaşanmasın Diye

Olay atlatıldıktan sonra, bir daha yaşanmaması için yapılması gerekenler: 1. Sağlam yedekleme altyapısı: 3-2-1 kuralı, immutable (değiştirilemez) yedekler, düzenli test

2. Modern güvenlik yazılımı: EDR sınıfı, davranış tabanlı koruma

3. E-posta filtreleme: Phishing'in önemli kısmını yakalar

4. Güvenlik yamaları: İşletim sistemi ve uygulamalar güncel

5. MFA (iki faktörlü kimlik doğrulama): Tüm kritik hesaplarda

6. Çalışan eğitimi: Phishing farkındalığı düzenli tazelenmeli

7. İş sürekliliği planı: Bir daha olursa hangi adımlar atılacak yazılı olmalı

Bu Olay Bir Uyarıdır — Sonrası Çok Daha Önemli Eğer fidye yazılımı saldırısı yaşadıysanız, bu kötü bir olaydır ama aynı zamanda büyük bir uyarıdır. İstatistikler, fidye yazılımı saldırısı yaşayan şirketlerin %60'ının 6 ay içinde kapandığını söylüyor. Bu rakam korkutucu ama açıklaması var: aynı şirket aynı altyapıyla çalışmaya devam ettiği için ya tekrar saldırıya uğrar ya da iş sürekliliğini kaybeder. Kapanan şirketlerin tersi de var: olay sonrası ciddi şekilde toparlanan, doğru yatırımları yapan ve hatta bu süreçten daha güçlü çıkan şirketler. Aradaki fark, olaydan sonra yapılan kararlardır. Olayı atlatıp "bitti" demek yerine, neden olduğunu anlamak, açıkları kapatmak ve sağlam bir altyapı kurmak şart. Felaket kurtarma ve yedekleme hizmetimiz tam olarak bu çerçevede tasarlanmıştır.

## Sıkça Sorulan Sorular

Fidye notunda 72 saat var, beklemeli miyim? Süre baskısı saldırganın taktiğidir, panik yaratıp ödemenizi sağlamak için. Ödemeden alınacak kararları sakin kafayla değerlendirin. Süre dolsa bile genelde sonradan müzakere yolu açıktır (ama yine de ödememelisiniz).

## Saldırgana karşılık vermeli miyim?

Hayır. Saldırgana hiçbir şekilde mesaj atmayın, e-postalara cevap vermeyin. İletişim kurmak hem psikolojik baskıyı artırır hem de ilave bilgi vermenize sebep olur.

## Şifrelenmiş dosyaları silebilir miyim?

Şu an silmeyin. İleride bir şifre çözücü çıkabilir ve dosyalarınız hala duruyorsa kurtarabilirsiniz. Etkilenen diski bir kenara koyun, yeni bir disk takıp Windows'u temiz kurun. Eski diski 1-2 yıl saklayın.

## Polise gidebilir miyim?

Evet, gidin. Siber Suçlarla Mücadele birimine başvurun. Sizin vakanızı çözmeyebilirler ama saldırgan profillerini takip etmek için bilgi toplarlar. Ayrıca şikayet kaydı sigortanız ve hukuki süreçler için belge olur.

## Acil Durumda Profesyonel Müdahale

Eğer şu anda fidye yazılımı saldırısının ortasındaysanız, bu yazıyı okumayı bırakın ve profesyonel yardım çağırın. Kozyatağı Bilişim olarak fidye yazılımı vakalarına acil müdahale sağlıyoruz. İlk değerlendirme görüşmesi ücretsizdir ve hemen aksiyon alırız.

## Hemen Bizi Arayın →

## Sonuç

Fidye yazılımı saldırısı, kişiler ve şirketler için en kötü siber olaylardan biridir. Ama panik yapmak çözüm getirmez — sakin, sistemli ve doğru adımlar atmak zararı ciddi oranda azaltabilir. Fidye ödeme bir çözüm değildir. Sağlam yedekler ise her zaman kurtuluştur. Eğer bu olayı atlattınızsa, ikinci kez yaşamamak için ciddi önlemler alın. Profesyonel felaket kurtarma ve yedekleme hizmeti bu olayların hem önlenmesi hem de oluştuğunda hızlı kurtarılması için kritiktir. Genel virüs ve zararlı yazılım sorunları için yazımıza da bakabilirsiniz.

## GÜVENLİK

9. E-posta Hesabım Hacklendi mi? Nasıl Anlarım, Ne

Yapmalıyım?
