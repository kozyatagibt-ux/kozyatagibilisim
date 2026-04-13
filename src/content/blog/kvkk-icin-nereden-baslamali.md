---
slug: kvkk-icin-nereden-baslamali
title: "KVKK İçin Nereden Başlamalıyım? KOBİ'ler İçin Adım Adım Rehber"
type: cluster
pillar: 2
url: "/blog/kvkk-icin-nereden-baslamali"
hedef_anahtar_kelime: "KVKK nereden başlamalı"
meta_description: "KVKK uyumu için nereden başlamalısınız? Veri envanteri, aydınlatma metni, teknik tedbirler ve KOBİ'ler için pratik adım adım rehber."
kelime_sayisi: "~1800"
pillar_linki: "/kobi-siber-guvenlik"
---

## "Biz Küçük Şirketiz, KVKK Bizi İlgilendirmez" — Yanlış

Bu cümleyi son 2 yılda onlarca KOBİ'den duyduk. 8 kişilik bir ithalat firması, 5 kişilik bir mimarlık ofisi, 12 kişilik bir e-ticaret şirketi — hepsi aynı şeyi söyledi. Ve hepsi yanılıyordu.

KVKK (6698 sayılı Kişisel Verilerin Korunması Kanunu) Türkiye'de kişisel veri işleyen her gerçek ve tüzel kişiyi kapsar. Çalışanlarınızın TC kimlik numarasını, müşterilerinizin e-posta adresini veya tedarikçilerinizin banka hesap bilgisini tutuyorsanız — ki tutuyorsunuz — KVKK sizi ilgilendiriyor.

2024'te Kişisel Verileri Koruma Kurulu 189 milyon TL'nin üzerinde idari para cezası kesti. Ve bu cezaların önemli bir kısmı KOBİ'lere verildi. Çünkü büyük şirketler uyum ekipleri kurdu; KOBİ'ler ise "bize bir şey olmaz" deyip erteledi.

Bu rehber, KVKK uyumuna nereden başlamanız gerektiğini, teknik ve idari olarak hangi adımları atmanız gerektiğini sade ve pratik şekilde anlatıyor. Hukuki danışmanlık yerine geçmez ama IT altyapısı tarafında yapmanız gerekenleri net olarak gösterir.

## KVKK Nedir? (30 Saniyede)

KVKK, kişisel verilerin işlenmesinde bireylerin haklarını korumak için çıkarılmış bir kanundur. Temel prensipleri:

- Kişisel verileri hukuka uygun ve belirli amaçlarla toplayın
- Topladığınız verileri güvenli şekilde saklayın
- İhtiyaç kalmadığında silin
- Veri sahibini bilgilendirin (aydınlatma yükümlülüğü)
- İhlal olursa 72 saat içinde Kurul'a bildirin

Kişisel veri nedir? Bir kişiyi doğrudan veya dolaylı olarak tanımlanabilir kılan her bilgi: ad-soyad, TC kimlik, telefon, e-posta, IP adresi, konum bilgisi, banka hesabı, sağlık verisi, biyometrik veri.

## "Bizde Müşteri Verisi Yok Ki" Yanılgısı

Bu en sık duyduğumuz itirazlardan biri. Ama düşünün:

- **Çalışan verileri:** Her çalışanınızın TC kimliği, adresi, maaş bilgisi, banka hesabı, sağlık raporu sizde. Tek bir çalışanınız bile varsa veri işliyorsunuz.
- **Muhasebe verileri:** Fatura kestiğiniz her müşterinin adı, adresi, vergi numarası sizde.
- **E-posta arşivi:** Yılların e-posta yazışmalarında müşteri bilgileri, teklifler, sözleşmeler var.
- **Güvenlik kamerası:** Ofisinizde kamera varsa görüntü kaydı = biyometrik veri = özel nitelikli kişisel veri.
- **Ziyaretçi defteri:** Ofise gelen misafirlerin ismini yazıyorsanız veri topluyorsunuz.

Kısacası: Türkiye'de ticari faaliyet gösteren ve en az 1 çalışanı olan her şirket kişisel veri işlemektedir.

## Adım 1: Veri Envanteri Çıkarın

KVKK uyumunun ilk ve en önemli adımı budur. Hangi kişisel verileri, kimlerden, hangi amaçla, nerede ve ne kadar süre tutuyorsunuz?

Pratik olarak yapmanız gereken:

- **Veri kategorilerini listeleyin:** Çalışan verileri, müşteri verileri, tedarikçi verileri, ziyaretçi verileri.
- **Her kategori için detaylandırın:** Ad-soyad, TC kimlik, adres, telefon, e-posta, banka bilgileri, sağlık bilgileri vb.
- **Saklama yerlerini belirleyin:** Bilgisayar diski, sunucu, bulut (Google Drive, OneDrive), kağıt dosyalar, muhasebe yazılımı, CRM, e-posta sunucusu.
- **Erişim yetkilerini belirleyin:** Bu verilere kimler erişebiliyor?
- **Saklama sürelerini belirleyin:** Ne kadar süre tutmanız gerekiyor? (İş Kanunu, Vergi Usul Kanunu gibi mevzuatlara göre bazı veriler 5-10 yıl saklanmalı)

Bu envanter olmadan neyi korumanız gerektiğini bilemezsiniz.

## Adım 2: Aydınlatma Metni ve Açık Rıza

KVKK'nın en temel yükümlülüklerinden biri, veri sahibini (çalışan, müşteri, ziyaretçi) bilgilendirmektir.

### Aydınlatma Metni

Kişisel veri topladığınız her noktada aydınlatma metni sunmanız gerekiyor:
- Web sitenizde iletişim formu varsa: formun yanında aydınlatma metni
- Çalışanlarınız için: iş sözleşmesine ek aydınlatma metni
- Güvenlik kamerası varsa: giriş kapısında uyarı ve detaylı aydınlatma metni
- E-posta ile veri topluyorsanız: e-posta imzasında veya geri dönüşte bilgilendirme

### Açık Rıza

Bazı veri işleme faaliyetleri için kişinin açık rızasını almanız gerekir. Açık rıza: belirli konuya ilişkin, bilgilendirmeye dayanan ve özgür iradeyle verilen onay. Otomatik kabul, önceden işaretlenmiş kutucuklar veya "devam ederek kabul ediyorsunuz" ifadeleri açık rıza sayılmaz.

## Adım 3: VERBİS Kaydı

Veri Sorumluları Sicil Bilgi Sistemi'ne (VERBİS) kayıt, belirli şartları taşıyan şirketler için zorunludur. Yıllık çalışan sayısı 50'den fazla veya yıllık mali bilanço toplamı 100 milyon TL'den fazla olan şirketler kayıt yükümlüsüdür.

Bu eşiklerin altındaysanız da VERBİS kaydı isteğe bağlı olarak yapılabilir ve kurumsal bir güven sinyali verir.

VERBİS kaydında veri envanteriniz temel alınır — bu yüzden Adım 1 bu kadar önemlidir.

## Adım 4: Teknik Tedbirler (IT Altyapısının Rolü)

KVKK uyumunun yaklaşık %50'si teknik tedbirlerdir. İşte burada IT altyapısı devreye girer. Detaylı bilgi için [KVKK uyumu ve IT altyapısı](/blog/kvkk-uyumu-it-altyapisi) rehberimize bakın.

### Erişim Kontrolü

- Her kullanıcının kendi hesabı olmalı (ortak hesap kullanmayın)
- [Active Directory](/blog/active-directory-kobi-rehberi) ile merkezi yetki yönetimi
- En az yetki ilkesi: herkes sadece işi için gereken verilere erişebilmeli
- Güçlü parola politikası ve MFA (çok faktörlü doğrulama)

### Şifreleme

- Dizüstü bilgisayarlarda BitLocker ile disk şifreleme (kayıp/çalınma durumunda veriler okunamaz)
- E-posta iletişiminde TLS şifreleme
- Wi-Fi ağında WPA3 veya en az WPA2-Enterprise

### Yedekleme

- Düzenli ve otomatik yedekleme (manuel yedekleme unutulur)
- Yedeklerin şifrelenmiş olması
- Yedekten geri dönüş testleri (yedek var ama geri yüklenemiyor = yedek yok)

### Log Kayıtları

- Kim, ne zaman, hangi veriye erişti — bunların kaydı tutulmalı
- Log kayıtları en az 2 yıl saklanmalı
- Anormal erişim denemeleri izlenmeli

### Ağ Güvenliği

- Firewall yapılandırması
- [Antivirüs](/blog/sirket-icin-en-iyi-antivirus) yazılımı tüm cihazlarda aktif
- Güncel güvenlik yamaları
- Misafir Wi-Fi ağı şirket ağından ayrı olmalı

### Fiziksel Güvenlik

- Sunucu odası kilitli ve erişimi sınırlı olmalı
- Kağıt belgeler için kilitli dolap
- Eski sabit diskler ve USB'ler güvenli şekilde imha edilmeli

## Adım 5: Çalışan Eğitimi

Teknik tedbirler ne kadar güçlü olursa olsun, bir çalışan phishing e-postasına tıklarsa veya müşteri verilerini kişisel e-posta adresine iletirse tüm sistem çöker.

Çalışan eğitiminde ele alınması gereken konular:
- KVKK nedir, neden önemlidir
- Kişisel veri nedir, hangi veriler hassastır
- Veri paylaşım kuralları (kime, nasıl, hangi kanaldan)
- Phishing ve sosyal mühendislik saldırılarını tanıma
- Şüpheli durumda kime başvurulacağı
- İhlal durumunda hemen bildirim yükümlülüğü

Bu eğitim yılda en az bir kez tekrarlanmalı ve yeni başlayan her çalışana ilk hafta verilmelidir.

## Adım 6: Veri İhlali Bildirim Süreci

Bir veri ihlali yaşandığında (saldırı, veri sızıntısı, kayıp, yetkisiz erişim) 72 saat içinde Kişisel Verileri Koruma Kurulu'na bildirim yapmanız yasal zorunluluktur.

Önceden hazırlanmanız gerekenler:
- **Olay müdahale planı:** Kim ne yapar, hangi sırayla, kime bildirir
- **İletişim listesi:** IT sorumlusu, yönetim, hukuk danışmanı, gerekirse etkilenen kişiler
- **Bildirim şablonu:** KVKK bildirim formunun önceden incelenmesi
- **Kanıt toplama süreci:** Log kayıtları, etkilenen sistemlerin belirlenmesi

72 saati kaçırmamak için bu süreci önceden tanımlamak şarttır. Kriz anında sıfırdan düşünmek zaman kaybettirir.

## Adım 7: Yıllık Gözden Geçirme

KVKK uyumu tek seferlik bir proje değil, sürekli bir süreçtir. Her yıl gözden geçirin:

- Veri envanteri güncel mi? Yeni veri toplama noktaları eklendi mi?
- Teknik tedbirler yeterli mi? Yeni tehditler ortaya çıktı mı?
- Çalışan eğitimleri yapıldı mı?
- Saklama süreleri aşılan veriler silindi mi?
- Erişim yetkileri güncel mi? (Ayrılan çalışanların erişimi kapatıldı mı?)
- Yedekleme sistemi düzgün çalışıyor mu?

## KOBİ'lerin En Sık Yaptığı 3 KVKK Hatası

### Hata 1: "Biz çok küçüğüz, KVKK bizi bağlamaz"

KVKK'da şirket büyüklüğüne göre muafiyet yoktur. 1 çalışanı olan bir şirket bile KVKK kapsamındadır. Cezalar da küçük şirketler için ayrı tutulmaz — aynı oranlarda uygulanır.

### Hata 2: "Müşteri verimiz yok, sadece muhasebe tutuyoruz"

Muhasebe verisi = kişisel veri. Faturalardaki isimler, adresler, vergi numaraları kişisel veridir. Çalışan maaş bordroları, SGK bildirgeleri, izin kayıtları — hepsi kişisel veri.

### Hata 3: "Muhasebecimiz hallediyor"

Muhasebeciniz mali mevzuat ve VERBİS kaydı konusunda yardımcı olabilir. Ama KVKK uyumunun %50'si teknik tedbirlerdir: şifreleme, erişim kontrolü, yedekleme, log tutma, ağ güvenliği. Bunlar IT işidir. Muhasebecinizden BitLocker konfigürasyonu yapmasını bekleyemezsiniz.

KVKK uyumu = hukuk danışmanı + muhasebeci + IT partneri. Üçü birlikte çalışmalı.

## Kozyatagi Bilisim Olarak KVKK Surecinde Neredeyiz?

Biz hukuk danismanligi yapmiyoruz. Ama KVKK'nin teknik tedbirler ayagini bastan sona yonetiyoruz:

- **IT altyapi denetimi:** Mevcut sisteminizi KVKK teknik tedbirleri acisından degerlendiriyoruz
- **Erisim kontrolu:** Active Directory kurulumu, yetki yonetimi, MFA
- **Sifreleme:** BitLocker, e-posta sifreleme, Wi-Fi guvenlik yapilandirmasi
- **Yedekleme:** Otomatik, sifrelenmis, test edilmis yedekleme sistemi
- **Log yonetimi:** Erisim loglarinin toplanmasi ve saklanmasi
- **Ag guvenligi:** Firewall, antivirus, yama yonetimi
- **Calisan egitimi:** Temel siber guvenlik ve KVKK farkindalik egitimi

KVKK teknik tedbirlerinizi degerlendirmek ve eksiklerinizi belirlemek icin ucretsiz on analiz yapiyoruz. Bizi arayin: **0541 636 77 75** veya [kozyatagibilisim.com](https://kozyatagibilisim.com) uzerinden ulasin.

---

**Bu rehberleri de okuyun:**

- [KVKK Uyumu İçin IT Altyapısı Nasıl Olmalı?](/blog/kvkk-uyumu-it-altyapisi)
- [Active Directory Nedir? KOBİ'ler İçin Rehber](/blog/active-directory-kobi-rehberi)
- [Şirket İçin En İyi Antivirüs Hangisi?](/blog/sirket-icin-en-iyi-antivirus)
