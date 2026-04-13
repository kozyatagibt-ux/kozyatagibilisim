---
slug: e-fatura-e-arsiv-it-altyapisi
title: "E-Fatura ve E-Arşiv İçin IT Altyapısı: KOBİ'ler İçin 2026 Rehberi"
type: cluster
pillar: 1
url: "/blog/e-fatura-e-arsiv-it-altyapisi"
hedef_anahtar_kelime: "e-fatura IT altyapısı"
meta_description: "2026'da tüm mükellefler e-arşiv faturaya geçmek zorunda. E-fatura için gerekli IT altyapısı, entegratör seçimi ve kurulum rehberi."
kelime_sayisi: "~1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## 2026'da E-Arşiv Artık Seçenek Değil, Zorunluluk

2026 yılı Türkiye'de e-fatura ve e-arşiv dönüşümünde kritik bir eşik. Gelir İdaresi Başkanlığı (GİB) kapsamı genişletti ve artık neredeyse tüm mükellefler e-arşiv fatura düzenlemek zorunda. Daha önce yalnızca belirli ciro eşiğini aşan şirketler için geçerli olan zorunluluk, artık küçük işletmeleri de kapsıyor.

Bu ne anlama geliyor? Eğer 5 kişilik bir mimarlık ofisi, 10 kişilik bir ithalat firması veya 3 kişilik bir danışmanlık şirketi işletiyorsanız, artık kağıt fatura kesemezsiniz. E-arşiv sisteminizin çalışması gerekiyor.

Ama burada kritik bir ayrım var: e-fatura bir muhasebe meselesi olduğu kadar bir IT altyapısı meselesidir. Entegratör yazılımınız ne kadar iyi olursa olsun, internet bağlantınız kesikse, bilgisayarınız çökerse veya elektrik gidince fatura kesemezsiniz.

Bu rehberde e-fatura ve e-arşiv sisteminin sorunsuz çalışması için gereken IT altyapısını, entegratör seçimini ve sık yapılan hataları detaylıca anlatıyoruz.

## E-Fatura ve E-Arşiv Arasındaki Fark Nedir?

Kısaca hatırlatalım:

- **E-Fatura:** GİB'e kayıtlı iki mükellef arasında kesilen elektronik fatura. Her iki taraf da e-fatura mükellefi olmalı.
- **E-Arşiv Fatura:** Karşı taraf e-fatura mükellefi olmadığında (bireysel müşteriler dahil) düzenlenen elektronik fatura. Kağıt çıktısı verilebilir ama kaynak dijitaldir.

Her iki sistem de GİB üzerinden çalışır ve belirli teknik gereksinimleri vardır.

## E-Fatura İçin Gereken IT Altyapısı: 6 Temel Bileşen

### 1. Kesintisiz ve Stabil İnternet Bağlantısı

E-fatura sisteminiz internet üzerinden GİB sunucularıyla ve entegratörünüzle iletişim kurar. Bağlantı kesildiğinde fatura kesemez, gelen faturaları göremez ve onay süreçleri durur.

Gereken minimum standart:
- **Fiber bağlantı** (ADSL artık yeterli değil — gecikme süreleri sorun yaratır)
- **Yedek internet hattı.** Ana hat kesildiğinde devreye girecek ikinci bir bağlantı. 4G/5G mobil router en pratik çözümdür.
- **Statik IP adresi** (bazı entegratörler ve özel entegrasyon senaryoları için gerekli)

Eğer ofisinizde internet 2-3 günde bir kesintiye uğruyorsa, e-fatura sistemini sağlıklı kullanmanız mümkün değildir.

### 2. Muhasebe/ERP Yazılımı İçin Uygun Bilgisayar veya Sunucu

E-fatura sisteminiz genellikle muhasebe veya ERP yazılımınız üzerinden çalışır. Bu yazılımın performanslı bir donanım üzerinde çalışması şarttır.

Küçük ofisler için minimum öneriler:
- **İşlemci:** Intel i5 veya üzeri (son 3 nesil)
- **RAM:** 16 GB (muhasebe yazılımı + e-fatura modülü + tarayıcı açıkken 8 GB yetmez)
- **Disk:** SSD (250 GB minimum — fatura verileri hızlı biririr)
- **İşletim Sistemi:** Windows 10/11 Pro (Home sürümü ağ paylaşımı ve uzak masaüstü desteklemez)

Eğer 5+ kişi aynı muhasebe veritabanına erişiyorsa, [küçük bir ofis sunucusu](/blog/kucuk-ofis-sunucusu-kurulumu) kurulumu çok daha sağlıklıdır.

### 3. Kesintisiz Güç Kaynağı (UPS)

Elektrik kesildiğinde bilgisayarınız kapanır. Kapanırken fatura kesiliyorsa veri bozulabilir. Veritabanı zarar görebilir. Saatlerce süren veri onarımı gerekebilir.

Muhasebe bilgisayarınız veya sunucunuz mutlaka UPS'e bağlı olmalıdır. 1000-1500 VA kapasiteli bir UPS, elektrik kesildiğinde size 15-20 dakika kazandırır. Bu sürede işinizi kaydetip sistemi düzgün kapatabilirsiniz.

Modem ve switch'inizi de UPS'e bağlamayı unutmayın — bilgisayar açık ama internet yoksa fatura yine kesilemez.

### 4. Fatura Verisi Yedekleme Sistemi

E-fatura verileri yasal belgelerdir. GİB mevzuatına göre e-faturaları 10 yıl saklamak zorundasınız. Yedekleme olmadan çalışmak, 10 yıllık yasal belge arşivinizi tek bir disk arızasına bırakmak demektir.

[3-2-1 yedekleme kuralını](/blog/3-2-1-yedekleme-kurali) uygulayın:
- **3 kopya:** Orijinal + 2 yedek
- **2 farklı ortam:** Bilgisayar diski + harici disk veya NAS
- **1 offsite:** Bulut yedekleme veya farklı lokasyonda saklanan kopya

Aylık maliyet: Bulut yedekleme için 50-150 TL arası, NAS cihazı için tek seferlik 5.000-15.000 TL yatırım.

### 5. Yazıcı (E-Arşiv Çıktıları İçin)

E-arşiv faturalarını müşteriye fiziksel olarak vermeniz gereken durumlar hala var (perakende satış, müşteri talebi vb.). Termal yazıcı veya lazer yazıcı bu iş için yeterlidir. Mürekkepli yazıcıların baskı kalitesi zamanla bozulabilir — yasal belge olduğu için okunabilirlik önemli.

### 6. Güvenlik Altyapısı

Fatura verileriniz kişisel veri içerir: müşteri adı, adresi, TC kimlik numarası, vergi numarası. Bu nedenle [KVKK kapsamında](/blog/kvkk-uyumu-it-altyapisi) korunması gerekir.

Minimum güvenlik gereksinimleri:
- Güncel antivirüs yazılımı
- Windows güvenlik güncellemelerinin düzenli yapılması
- Muhasebe yazılımına erişimde güçlü parola ve yetki kontrolü
- Firewall (en azından Windows Firewall aktif ve doğru yapılandırılmış olmalı)

## Entegratör Seçimi: GİB Portal mı, Özel Entegratör mü?

E-fatura kesmek için iki yol var:

### GİB Portal (Ücretsiz)

GİB'in kendi portalı üzerinden e-fatura ve e-arşiv kesebilirsiniz. Avantajı ücretsiz olması, dezavantajı tamamen manuel olması. Her faturayı tek tek girersiniz, muhasebe yazılımınızla otomatik entegrasyon yoktur, toplu fatura kesimi zordur.

Aylık 10-20'den fazla fatura kesiyorsanız GİB portal pratik değildir.

### Özel Entegratör

Türkiye'de onlarca GİB onaylı özel entegratör bulunuyor. Yaygın kullanılanlar:

- **Paraşüt:** KOBİ dostu, bulut tabanlı, kolay arayüz. Aylık 150-400 TL arası.
- **Logo (Tiger, Go3):** Kapsamlı ERP ile entegre. Orta ve büyük ölçekli firmalar için. Aylık 300-800 TL.
- **Mikro Yazılım:** KOBİ muhasebe yazılımıyla entegre. Aylık 200-500 TL.
- **Sovos (Foriba):** Kurumsal çözüm, çok sayıda entegrasyon desteği.
- **QNB e-Çözüm, İyzico, Uyumsoft:** Sektöre ve ihtiyaca göre alternatifler.

Entegratör seçerken dikkat edilecekler:
- Mevcut muhasebe yazılımınızla entegrasyon desteği var mı?
- Toplu fatura kesimi yapılabiliyor mu?
- Mobil erişim var mı?
- Teknik destek hızı nasıl?
- GİB onayı güncel mi?

## Sık Karşılaşılan E-Fatura Sorunları ve Çözümleri

### "Fatura gönderilemedi" Hatası

Genellikle internet bağlantısı sorunu veya entegratör sunucusundaki geçici kesinti. Önce internet bağlantınızı kontrol edin, sonra entegratörünüzün durum sayfasına bakın.

### "Alıcı bulunamadı" Hatası

Karşı firmanın GİB'de e-fatura mükellefi olarak kaydı yok veya VKN/TCKN hatalı girilmiş. GİB mükellef sorgulama ekranından kontrol edin.

### "Zaman Aşımı" Hatası

Sunucu yanıt vermedi. Yavaş internet bağlantısı, yoğun saatlerde GİB sunucu yükü veya yetersiz bilgisayar performansı sebep olabilir.

### Fatura Verisi Bozulması

Genellikle ani elektrik kesilmesinden kaynaklanır. UPS kullanımı ve düzenli yedekleme bu riski ortadan kaldırır.

## Maliyet Özeti: E-Fatura IT Altyapısı Ne Kadar Tutar?

Küçük bir ofis (3-10 kişi) için tipik maliyetler:

| Kalem | Tek Seferlik | Aylık |
|-------|-------------|-------|
| Fiber internet (yedek hat dahil) | Kurulum: 500-1.500 TL | 400-800 TL |
| UPS (1500 VA) | 3.000-6.000 TL | — |
| Bilgisayar/Sunucu (uygun spec) | 25.000-60.000 TL | — |
| Entegratör aboneliği | — | 150-800 TL |
| Bulut yedekleme | — | 50-150 TL |
| IT destek (kurulum + bakım) | Kurulum: 3.000-8.000 TL | 1.500-4.000 TL |

Toplam başlangıç yatırımı 30.000-75.000 TL arası, aylık işletme maliyeti 2.000-5.000 TL arası. Bu rakamlar büyük görünebilir ama fatura kesemediğiniz her gün gelir kaybı, KVKK ihlali durumunda ise 100.000 TL'den başlayan para cezaları söz konusu.

## Muhasebeci IT'yi, IT'ci Muhasebeyi Bilmez — İkisi Birlikte Çalışmalı

E-fatura dönüşümünde en sık gördüğümüz hata: her şeyin muhasebeciye bırakılması. Muhasebeciniz yazılım seçiminde, fatura düzenleme süreçlerinde ve mali mevzuatta uzmandır. Ama internet altyapısı, sunucu kurulumu, yedekleme, UPS ve güvenlik IT işidir.

Bu iki alan birlikte çalışmadığında olan şudur: muhasebeci yazılımı kurar, ama yedekleme yoktur. Elektrik kesilir, veritabanı bozulur. 3 aylık fatura verisi kaybolur. Kurtarma maliyeti, baştan düzgün kurulumunn 10 katını aşar.

## Kozyatagi Bilisim Ne Yapiyor?

Biz muhasebe yazılımı satmıyoruz ve muhasebe danışmanlığı yapmıyoruz. Bizim işimiz, e-fatura sisteminizin güvenilir şekilde çalışacağı IT altyapısını kurmak ve sürdürmektir:

- Stabil internet altyapısı ve yedek hat kurulumu
- Muhasebe bilgisayarı veya sunucu tedarik ve kurulumu
- UPS kurulumu ve elektrik altyapısı
- Otomatik yedekleme sistemi (yerel + bulut)
- Güvenlik yapılandırması (antivirüs, firewall, erişim kontrolü)
- Sorun anında uzaktan veya yerinde destek

E-fatura altyapınızı kurmak veya mevcut sisteminizi değerlendirmek için bizi arayın: **0541 636 77 75** veya [kozyatagibilisim.com](https://kozyatagibilisim.com) uzerinden ulasin.

---

**Bu rehberleri de okuyun:**

- [3-2-1 Yedekleme Kuralı Nedir?](/blog/3-2-1-yedekleme-kurali)
- [Küçük Ofis Sunucusu Kurulumu](/blog/kucuk-ofis-sunucusu-kurulumu)
- [KOBİ'ler İçin KVKK Uyumu ve IT Altyapısı](/blog/kvkk-uyumu-it-altyapisi)
