---
slug: rto-rpo-nedir-kobi
title: "RTO ve RPO Nedir? KOBİ Yöneticileri İçin Sade Anlatım"
type: cluster
pillar: 3
url: "/blog/rto-rpo-nedir-kobi"
hedef_anahtar_kelime: "rto rpo nedir"
meta_title: "RTO ve RPO Nedir? KOBİ'ler İçin Sade Anlatım | Kozyatağı Bilişim"
meta_description: "Felaket kurtarma planlamasının iki temel kavramı: RTO ve RPO. Ne anlama gelir, nasıl hesaplanır, şirketiniz için nasıl belirlenir? Örneklerle anlatım."
kelime_sayisi: "~1800"
pillar_linki: "/sirket-veri-yedekleme"
---

Felaket kurtarma ve yedekleme konularını araştırırken mutlaka karşılaştığınız iki kısaltma var: RTO ve RPO. Teknik dokümanlarda, sağlayıcı teklifnamelerinde, sözleşmelerde sürekli geçer. Ama birçok KOBİ yöneticisi bu iki kavramı tam olarak anlamadığı için doğru kararları veremiyor — ya gereksiz pahalı çözümlere para harcıyor, ya da çok ucuz çözümlerle yetinip kritik risk altında kalıyor. Bu yazı RTO ve RPO'yu teknik jargona boğmadan, somut örneklerle anlatmayı amaçlıyor. Yazının sonunda kendi şirketiniz için bu iki değeri doğru belirleyebilecek ve sağlayıcılardan gelen tekliflerde neye bakacağınızı bilecek seviyede olacaksınız.

## Önce Kısa Tanımlar

RTO (Recovery Time Objective — Kurtarma Süresi Hedefi): Bir felaket sonrası sistemlerinizin ne kadar sürede tekrar çalışır hale gelmesi gerektiğidir. Yani "ne kadar süre kapalı kalabilirsiniz?" RPO (Recovery Point Objective — Kurtarma Noktası Hedefi): En fazla ne kadar veri kaybını tolere edebilirsiniz? Yani "en son yedekleme ile olay anı arasındaki süre ne kadar olabilir?" İlk başta kulağa benzer gibi gelebilir ama tamamen farklı iki şeyi ölçerler. RTO zamanla ilgilidir (ne kadar kapalı), RPO veriyle ilgilidir (ne kadar kaybeder). Bir örnekle ayıralım.

## Bir Örnek: Muhasebe Firması

25 çalışanlı bir muhasebe firmasını düşünelim. Her gün saat 17:00'da otomatik yedek alınıyor. Bir Çarşamba saat 14:00'da sunucu arızalanıyor ve tüm veriler kayboluyor. Sistemi yedekten geri yüklemek 6 saat sürüyor, yani sunucu akşam 20:00'da tekrar çalışır hale geliyor.

## Bu olayda ne oldu?

## Fiili RTO: 6 saat (arıza ile çözüm arasındaki süre)

Fiili RPO: 21 saat (en son yedek önceki gün saat 17:00, arıza bugün saat 14:00, kayıp veri bu aradaki çalışma) Yani firma bu olayda 6 saat kapalı kaldı ve bir günün işini kaybetti. Muhasebe firmasında bu 21 saatlik veri kaybı ne anlama geliyor? O gün yapılan fatura girişleri, güncellenen müşteri kayıtları, hazırlanan beyannameler, gönderilen e-postalar... hepsi yeniden yapılmak zorunda. Eğer bu sektörler için kabul edilebilir değilse, RPO'yu 21 saatten çok daha kısa bir süreye çekmek gerekiyor.

## RTO'yu Nasıl Belirlemeli?

RTO'yu belirlemek için sormanız gereken soru: "Sistemlerim kaç saat kapalı kalırsa iş operasyonum ciddi zarar görmeye başlar?" Cevap sektörünüze ve operasyon tipinize göre çok değişir. Bazı örnekler:

## İşletme Tipi Tipik Kabul Edilebilir RTO Neden

7/24 e-ticaret sitesi 15 dakika - 1 saat Her dakika sipariş kaybı Sağlık kuruluşu (klinik) 1-4 saat Hasta verilerine erişim kritik Muhasebe, hukuk bürosu 4-8 saat İş akışı kesintiye tolerans var Üretim tesisi (ERP) 2-4 saat Üretim bandı durması maliyetli Küçük ofis (genel) 1 iş günü Genelde tolerans var Kendi şirketiniz için RTO belirlerken şunu düşünün: "Eğer sistemler 4 saat kapalı kalırsa ne olur?" "8 saat kapalı kalırsa?" "1 gün kapalı kalırsa?" Bu soruların cevabında "kabul edilemez" dediğiniz nokta sizin RTO'nuzdur.

## RTO'nun Maliyet İlişkisi

Bilmeniz gereken önemli bir şey: RTO kısaldıkça maliyet katlanarak artar. 24 saatlik bir RTO için basit bir yedekleme sistemi yeterlidir ve maliyeti düşüktür. 4 saatlik bir RTO için daha hızlı geri yükleme altyapısı gerekir. 15 dakikalık bir RTO için ise neredeyse gerçek zamanlı replikasyon, yedekli sistemler, otomatik failover gerekir — maliyet 20-50 kat artabilir. Dolayısıyla RTO belirlerken "mümkün olan en kısa" değil, "iş için gerçekten gerekli olan" süreyi hedefleyin. Gereksiz kısa RTO paraya zarardır.

## RPO'yu Nasıl Belirlemeli?

RPO için sormanız gereken soru: "En fazla ne kadar süredeki verimi kaybetmeyi tolere edebilirim?" RTO'dan farklı olarak, bu sorunun cevabı şirketinizdeki veri değişim hızına bağlıdır. Günde 10 fatura çıkaran bir firma için 24 saatlik veri kaybı 10 fatura demektir — belki elle yeniden girilebilir. Günde 10.000 işlem yapan bir e-ticaret sitesi için aynı süre kabul edilemezdir.

## Tipik RPO örnekleri:

## Veri Tipi Önerilen RPO Yedekleme Sıklığı

İşlem yoğun sistemler (finans, e-ticaret) 1-15 dakika Sürekli replikasyon Kritik veritabanları (ERP, CRM) 1 saat Saatlik artımlı yedek Ofis dosyaları, e-posta 4-8 saat Günde birkaç yedek Genel dosya sunucusu 24 saat Günlük yedek Arşiv verileri 1 hafta Haftalık yedek Dikkat: bir şirket içinde farklı sistemler için farklı RPO'lar olabilir ve olmalıdır. ERP sisteminiz için 1 saatlik RPO uygun olabilir, ama arşiv klasörleri için günlük RPO yeterli olabilir. Her şeyi en sıkı seviyeye çekmek gerekmez — para yakarsınız.

## RTO ve RPO Birbirinden Bağımsızdır

Bu iki kavramı karıştıran yaygın bir hata var: "Yedekleri saatte bir alıyoruz, demek ki RTO'muz 1 saat." Bu yanlıştır. Yedeğin sık alınması RPO'yu kısaltır ama RTO'yu değiştirmez. RTO, yedekten geri yükleme hızınıza bağlıdır.

## Başka bir deyişle:

Saatte bir yedek + 6 saat geri yükleme süresi = RPO 1 saat, RTO 6 saat Günlük yedek + 30 dakika geri yükleme süresi = RPO 24 saat, RTO 30 dakika Sürekli replikasyon + anlık failover = RPO 0, RTO 1 dakika Bu iki metriği birlikte düşünmeniz gerekiyor çünkü bazen biri diğerini gizliyor.

## Gerçek Hayattan Bir Senaryo

Bir örnek verelim ki bu kavramlar daha net oturabilsin. 60 çalışanlı bir ithalat-ihracat firması düşünün. Şirket özellikle muhasebe ve lojistik yazılımı üzerinde çalışıyor. Yönetim şu değerlendirmeyi yapıyor: Muhasebe sistemi: Çok kritik, iş durursa fatura kesilemez. Maksimum 2 saat kapalı kalabilir. Veri kaybı tolere edilemez, 30 dakikayı geçmemeli. → RTO: 2 saat, RPO: 30 dakika E-posta: Önemli ama biraz tolerans var. 4 saat kapalı kalabilir. 1 saatlik e-posta kaybı tolere edilebilir.

## → RTO: 4 saat, RPO: 1 saat

Dosya sunucusu (genel belge arşivi): Günlük işler için gerekli ama acil değil. 1 iş günü kapalı kalabilir. Günlük yedek yeterli. → RTO: 8 saat, RPO: 24 saat Arşiv veriler (eski projeler): Nadir kullanılır. Haftalık erişilirse sorun değil. → RTO: 1 hafta, RPO: 1 hafta Bu değerlendirmeye göre yedekleme mimarisi tasarlanıyor. Muhasebe sistemi için sürekli replikasyonlu bir çözüm, e-posta için saatlik yedek, dosya sunucusu için günlük yedek, arşiv için haftalık yedek. Bu yapı "her şeye sürekli replikasyon" modelinden 5-10 kat daha ucuz ve her sistemin ihtiyacına uygun.

## Hedeflerinizi Nasıl Ölçeceksiniz?

RTO ve RPO hedeflerini belirledikten sonra önemli bir soru kalıyor: gerçekten bunları tutabiliyor musunuz? Bunu anlamanın tek yolu test yapmaktır. RTO Testi: Bir hafta sonu çalışmayan bir sunucuyu seçin (veya test amaçlı bir kopya oluşturun), tamamen sıfırdan yedekten geri yükleyin. Ne kadar sürdüğünü ölçün. Bu sizin gerçek RTO'nuzdur. Hedef RTO'nuzdan uzunsa ya altyapıyı iyileştirmeniz ya da beklentilerinizi revize etmeniz gerekir. RPO Testi: Bunun için rastgele bir veri tabanına bir satır ekleyin, saati not edin, bir saat sonra "yedekte bu satır var mı" kontrol edin. Yedek stratejinizin gerçekten beklediğiniz sıklıkta çalıştığını doğrulamış olursunuz. Yedeklerin bozuk veya eksik olması sık karşılaşılan bir sorundur, 'Yedeğim Var Yanılgısı' yazımızda bu duruma daha detaylı bakıyoruz.

## Maliyet vs Risk Dengesi

RTO ve RPO hedeflerini belirlerken en önemli soru şudur: "Bir saatlik kapalı kalma maliyetim ne kadar?" Bu rakamı bilmeden doğru karar veremezsiniz.

## Hesaplamak için:

1. Şirketinizin yıllık cirosunu alın

2. Yıllık iş saatine bölün (yaklaşık 2000 saat = 250 iş günü × 8 saat)

3. Saatlik ciro kaybınız çıkar

4. Buna "dolaylı zararları" ekleyin (müşteri kaybı, itibar zararı, çalışanların boş oturması) Örneğin yıllık 20 milyon TL cirolu bir şirkette saatlik doğrudan kayıp 10.000 TL civarındadır. Dolaylı zararlarla birlikte bu 15-25 bin TL'ye çıkabilir. Yani 8 saatlik bir kesinti 120-200 bin TL zarar demektir. Bu rakamı bildiğinizde "2 saatlik RTO için 50 bin TL altyapı yatırımı mantıklı mı" sorusuna cevap verebilirsiniz — evet, çünkü bir olayda zararı 3-4 kat azaltır.

## Şirketiniz İçin Doğru RTO/RPO Hedeflerini Belirleyelim

Şirketinizin hangi sistemleri için ne kadar RTO ve RPO gerektiğini birlikte değerlendirelim. Ücretsiz keşif görüşmemizde mevcut durumu dinleyelim, risk analizinizi yapalım, size uygun yedekleme ve kurtarma stratejisini önerelim.

## Ücretsiz Keşif Planla →

## Sonuç

RTO ve RPO, felaket kurtarma planlamasının iki temel direğidir. Bu iki değeri doğru belirlemeden yapılan yedekleme yatırımları ya gereksiz pahalıdır ya da yetersizdir. Doğru yaklaşım, her sistem için ayrı değerlendirme yapmak ve gerçek iş ihtiyaçlarına göre hedefleri çıkarmaktır. "En iyi" değil, "doğru" olanı hedefleyin. Bir kere hedefleriniz net olduğunda, sağlayıcılardan gelecek tekliflerde neyi aradığınızı bileceksiniz ve yanlış satışa maruz kalmayacaksınız. Kozyatağı Bilişim'in Felaket Kurtarma hizmetinde her müşteri için RTO/RPO hedefleri ayrı belirlenir, sistem bu hedefleri tutacak şekilde tasarlanır. Fidye yazılımı tehditlerini düşünerek bu hedefleri belirlerseniz doğru çözüme ulaşırsınız.

## PİLLAR

7. IT Altyapı Denetimi: Neden, Ne Zaman, Nasıl

Yaptırılmalı?
