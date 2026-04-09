---
slug: it-destek-sla-rehberi
title: "IT Destek SLA'sı Nedir? Sözleşmede Dikkat Edilmesi Gereken 10 Madde"
type: cluster
pillar: 1
url: "/blog/it-destek-sla-rehberi"
hedef_anahtar_kelime: "it destek sla"
meta_title: "IT Destek SLA'sı Nedir? Sözleşmede Dikkat Edilecek 10 Madde | Kozyatağı Bilişim"
meta_description: "IT destek sözleşmenizdeki SLA maddesini nasıl okumalısınız? Yanıt süresi, çözüm süresi, öncelik seviyeleri ve kaçınılması gereken tuzaklar. KOBİ'ler için rehber."
kelime_sayisi: "~1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

IT destek hizmeti alırken önünüze konulan sözleşmenin belki de en önemli sayfası SLA bölümüdür. Çoğu KOBİ sahibi bu sayfaya şöyle bir bakar, anlamadığı için hızlıca geçer ve imzalar. Sonra bir sorun çıktığında sağlayıcıyı arar, "neden bu kadar geç cevap veriyorsunuz" der, sağlayıcı ise "sözleşmede yazıyor, bu sürenin içindeyiz" der. Taraflar anlaşmazlığa düşer. Oysa sorun başlangıçta sözleşmeyi anlamamaktan kaynaklanmıştı. Bu yazıda SLA'nın ne olduğunu, hangi bileşenlerden oluştuğunu ve sözleşmede tam olarak neye bakmanız gerektiğini 10 somut madde halinde anlatacağım. Yazının sonunda elinizdeki (ya da size önerilen) herhangi bir SLA'yı kendi başınıza değerlendirebilecek seviyede olacaksınız.

## SLA Nedir?

SLA, Service Level Agreement kelimelerinin kısaltmasıdır; Türkçesi "Hizmet Seviyesi Anlaşması". En basit tanımıyla, size hizmet veren sağlayıcının hangi sürede ne kadar kaliteli çalışacağını yazılı olarak taahhüt ettiği belgedir. İyi bir SLA iki tarafa da fayda sağlar: müşteri ne bekleyeceğini bilir, sağlayıcı ise hangi standartları tutturması gerektiğini bilir. IT dünyasında SLA genelde şu konuları kapsar: yanıt süreleri, çözüm süreleri, çalışma saatleri, öncelik sınıflandırmaları, uptime garantileri, raporlama sıklığı, ceza maddeleri ve istisnai durumlar. Bunların her biri net rakamlarla tanımlanmış olmalıdır — muğlaklığı olan SLA, SLA sayılmaz.

1. Yanıt Süresi ≠ Çözüm Süresi (Bu İkisini Karıştırmayın)

SLA'larda en sık karşılaşılan kafa karışıklığı bu. Sağlayıcı "15 dakika içinde yanıt veririz" diye yazar, müşteri bunu "15 dakika içinde sorun çözülür" diye anlar. Oysa bu ikisi tamamen farklı şeylerdir. Yanıt süresi (Response Time): Sizin ticket açtığınız andan itibaren sağlayıcının ilk insanının (otomatik "aldık" mesajı değil, gerçek bir teknik uzmanın) sizinle temasa geçmesine kadar geçen süredir. Bu süre içinde genelde sorunu tarif eder, ek bilgi ister, triaj yapar. Sorun henüz çözülmemiştir. Çözüm süresi (Resolution Time): Ticket'ın açılmasından kapanmasına kadar geçen toplam süredir. Yani sorunun gerçekten ortadan kalktığı andır. Bir sözleşmede sadece yanıt süresi yazıyorsa ve çözüm süresi hiç tanımlı değilse — bu bir kırmızı bayraktır. "Size hemen dönerim ama ne kadar sürede çözerim belli değil" demek aslında hiçbir şey taahhüt etmemek demektir. İyi bir SLA her iki süreyi de içerir.

2. Öncelik Seviyeleri: Her Sorun Aynı Değil

Tüm IT sorunları aynı aciliyette değildir. Sunucunuz çöktü ise bu bir felakettir; birinin masaüstü duvar kağıdı değiştirilemiyor ise bu bekleyebilir. Bu nedenle iyi SLA'lar sorunları öncelik seviyelerine ayırır.

## Yaygın kullanılan dört seviyeli yapı:

P1 (Kritik / Critical): İş operasyonlarını tamamen durduran sorunlar. Sunucu çökmesi, tüm kullanıcıların internet kaybı, fidye yazılımı saldırısı, veri kaybı. Yanıt 15 dakika, çözüm başlangıcı 1 saat olmalı. P2 (Yüksek / High): Belirli bir bölümü veya fonksiyonu etkileyen büyük sorunlar. Bir departmanın e- postası çalışmıyor, yazıcı ağı düşmüş, belirli bir uygulama açılmıyor. Yanıt 30 dakika, çözüm 4 saat olmalı. P3 (Orta / Medium): Tek kullanıcıyı veya küçük bir grubu etkileyen sorunlar, iş devam edebilir ama bir şey düzgün çalışmıyor. Yanıt 2 saat, çözüm aynı iş günü içinde olmalı. P4 (Düşük / Low): Küçük can sıkıcı şeyler, yeni talepler, bilgi istekleri. Yanıt aynı iş günü, çözüm 2-3 iş günü içinde olmalı. SLA'nızda bu sınıflandırma yoksa, tüm sorunlar aynı sürede ele alınır diye varsayılır. Bu iki taraf için de kötüdür: sağlayıcı küçük sorunlara büyük önem vermek zorunda kalır, siz ise gerçekten acil sorunlarda başkalarıyla sıraya girmiş olursunuz. Dikkat: Sadece öncelik seviyelerinin olması yetmez; sağlayıcının hangi sorunu hangi seviyeye koyduğu da önemli. Bazı sağlayıcılar sizin P1 gördüğünüz sorunu P2'ye düşürerek daha rahat bir süre kazanır. SLA'nızda "öncelik sınıflandırması müşteri ve sağlayıcı mutabakatı ile belirlenir, anlaşmazlık durumunda müşteri görüşü esastır" cümlesinin olması sizi korur.

3. Çalışma Saatleri Tanımı

SLA'daki sürelerin "iş saatleri içinde mi", "takvim saati olarak mı" sayıldığı kritiktir. Örneğin "4 saat çözüm süresi" ifadesi:

- Eğer "iş saati içinde" tanımlıysa ve sorun Cuma saat 17:30'da çıktıysa, 4 iş saati Pazartesi sabah

13:30'a denk gelir.

- Eğer "takvim saati" olarak tanımlıysa, aynı sorun Cuma gece 21:30'da çözülmüş olmalıdır.

Aradaki fark neredeyse 3 gündür. İyi SLA'lar hangi sistemin kullanıldığını net belirtir, ayrıca "kritik P1 sorunları 7/24 çözüm süresi içinde, diğerleri iş saatleri içinde" gibi hibrit kurallar da kullanabilir. Sözleşmenizde bu tanım yoksa mutlaka netleşsin.

4. Uptime Garantisi

Eğer sağlayıcı sizin için sunucu veya bulut hizmeti çalıştırıyorsa, uptime (kullanılabilirlik yüzdesi) garantisi olmalıdır. Yaygın garantiler:

## Uptime Yüzdesi Aylık İzin Verilen Kesinti Yıllık İzin Verilen Kesinti

99.9% ("üç dokuz") ~43 dakika ~8.7 saat 99.95% ~22 dakika ~4.4 saat 99.99% ("dört dokuz") ~4 dakika ~52 dakika KOBİ'ler için genelde 99.9% yeterlidir. Daha yüksek uptime daha pahalı altyapı gerektirir. Ama sözleşmenizde "biz uğraşırız" gibi bir ifade yerine somut bir yüzde yazılmış olmalı.

5. Ceza Maddeleri: SLA'nın Dişleri

SLA kağıt üzerinde çok güzel yazılabilir ama sağlayıcı tutmadığında ne olur? Burada ceza (penalty) maddeleri devreye girer. Profesyonel bir SLA'da sağlayıcı SLA'yı tutmadığı durumlarda müşteriye belirli bir geri ödeme veya kredi vermeyi taahhüt eder. Örnek: "Aylık uptime garantisi 99.9% altına düşerse, her %0.1 düşüş için müşteriye o aya ait faturanın %10'u kadar kredi uygulanır. Maksimum kredi %100'dür." Eğer sözleşmenizde hiçbir ceza maddesi yoksa, SLA sadece bir niyet beyanıdır. Sağlayıcı tutsa da tutmasa da bedeli yoktur. Bu durumda sağlayıcının sadece iyi niyetine güveniyorsunuz demektir.

6. Ne SLA Dışında?

Her SLA'nın istisnaları vardır. İyi bir sözleşme bunları açıkça yazar; kötü bir sözleşme ise "kapsam dahilinde tüm IT sorunları" gibi muğlak bir ifadeyle başlar, sorun çıkınca "ama bu durum istisnalara giriyor" der. Yaygın istisnalar:

## Doğal afetler (force majeure)

## Müşteri tarafındaki donanım arızaları

Müşterinin kendi değişiklikleri (izinsiz yazılım kurulumu, donanım değişikliği)

## İnternet servis sağlayıcısı kaynaklı sorunlar

Üçüncü parti yazılım hataları Siber saldırılar (bazı sağlayıcılar bunu istisna tutar, bazıları tutmaz) Sözleşmenizdeki istisnaları dikkatle okuyun. Özellikle siber saldırıların istisna olup olmadığını sorun — çünkü bir fidye yazılımı olayında SLA'nın devrede olması hayati önem taşır.

7. Raporlama Sıklığı ve İçeriği

SLA'yı sağlayıcının tuttuğunu nasıl anlayacaksınız? Raporlarla. İyi bir SLA raporlama maddesi içerir: "Sağlayıcı her ay sonu aşağıdaki metrikleri içeren bir rapor sunar — açılan ticket sayısı, ortalama yanıt süresi (öncelik bazında), ortalama çözüm süresi, SLA ihlal sayısı, uptime yüzdesi." Raporlama maddesi yoksa, sağlayıcı istediği zaman istediği rakamı söyleyebilir. Sorun çıktığında "kesinti 30 dakika idi" dediğinde, siz "hayır 2 saatti" dediğinizde kimse haklı çıkamaz çünkü kayıt yoktur. İyi bir IT helpdesk sağlayıcısının nasıl seçileceğini detaylandıran yazımızda bu konu daha geniş ele alındı.

8. Değişiklik Yönetimi

Bazı IT işleri acil değildir ama planlama gerektirir. Örneğin bir yazılım güncellemesi, yeni sunucu kurulumu, ağ yapılandırma değişikliği. Bu işler SLA'daki "yanıt/çözüm süresi" maddelerinin dışında tutulur ve genelde ayrı bir "Değişiklik Yönetimi" (Change Management) başlığı altında ele alınır. İyi bir SLA bu süreci tanımlar: değişiklik talebi nasıl açılır, ne kadar sürede planlanır, kullanıcılara nasıl bildirilir, geri alma (rollback) planı ne olacak. Bu maddeler yoksa, sağlayıcı size her "bu bir değişiklik talebiydi, SLA dışıdır" diyerek süreler için bahaneler bulabilir.

9. Eskalasyon Süreci

SLA'nın ihlal edildiğini veya bir sorunun çözüm sürecinin tıkandığını fark ettiğinizde ne yapacaksınız? Kimle konuşacaksınız? İyi SLA'lar eskalasyon (üst makama taşıma) prosedürünü açıkça tanımlar:

1. seviye: Destek ekibi (normal ticket akışı)

2. seviye: Destek ekip lideri (çözüm süresinin yarısı aşılırsa devreye girer)

3. seviye: Operasyon müdürü (SLA ihlal edilirse devreye girer)

4. seviye: Şirket sahibi / CEO (ciddi veya tekrarlayan ihlal durumunda)

Bu yapı yoksa, bir sorununuz olduğunda kimi arayacağınızı bilmezsiniz. "Aradığınız sağlayıcı, kaçmış gibi hissettiriyor" durumunu yaşamamak için eskalasyon süreci yazılı olmalı.

10. Çıkış ve Geçiş Maddeleri

Hiçbir ilişki sonsuz değildir. Bir gün bu sağlayıcıdan ayrılmak isteyebilirsiniz — kalite düşüklüğü, fiyat, büyüme ihtiyacı, hatta sizin şirketinizin satışı gibi nedenlerle. O gün geldiğinde sözleşmeniz size ne garanti ediyor?

## İyi SLA'lar şu maddeleri içerir:

## Sözleşme fesih süresi (genelde 30-90 gün)

Verilerinizin devri (tüm dokümantasyon, parolalar, yapılandırma dosyaları) Geçiş desteği (yeni sağlayıcıya aktarım için ne kadar süre destek verileceği)

## Gizliliğin sürdürülmesi (sözleşme bittikten sonra da)

Bu maddeleri olmayan bir sözleşme sizi "rehin" alır — ayrılmak istediğinizde karşı taraf işbirliği yapmazsa şirketinizin IT'si haftalarca askıda kalır.

## Örnek: İyi Bir SLA Cümlesi vs Kötü Bir SLA Cümlesi

Kötü: "Sağlayıcı müşteri sorunlarına en kısa sürede yanıt vermeyi taahhüt eder." İyi: "Sağlayıcı P1 kritik öncelikli sorunlarda 15 dakika içinde yanıt verir, 1 saat içinde çözüm başlatır, 4 saat içinde sorunu çözer veya geçici çözüm sunar. Bu sürelere uyulmaması durumunda her aşılan saat için aylık faturanın %5'i oranında kredi uygulanır." Aradaki fark gece ile gündüz kadardır. Sözleşmenizde kötü örnekteki gibi muğlak ifadeler varsa, bunları düzelttirmeniz gerekir. Sağlayıcı kabul etmiyorsa bu başlı başına bir kırmızı bayraktır.

## Sözleşmeyi Kim Hazırladı?

Önemli bir nokta: karşınıza getirilen sözleşme sağlayıcı tarafından hazırlanmıştır, yani sağlayıcının çıkarlarına göre optimize edilmiştir. Bu normaldir ama sizin de kendi çıkarlarınızı koruyacak düzenlemeleri isteme hakkınız var. İyi sağlayıcılar makul değişiklik taleplerine açıktır; kapalı olanlar "bu standart sözleşmemiz, değiştiremeyiz" diye katılaşırlar. Bir sözleşmeyi imzalamadan önce bir saatinizi ayırıp tüm SLA maddelerini sağlayıcıyla birlikte okumaktan çekinmeyin. Sorularınız olsun, somut senaryolar üzerinden ilerleyin: "Cuma akşam 6'da sunucumuz çökerse bu madde nasıl uygulanır?" gibi.

## Sözleşmenizi Okumadan Önce Bir Uzman Gözü

Size sunulan bir IT destek sözleşmeniz varsa ve SLA maddelerini anlamlandıramıyorsanız, ücretsiz bir ön değerlendirme yapabiliriz. Sözleşmenizi gözden geçirip kritik noktaları işaret ederiz — bu hizmeti biz sunmayacak bile olsak, tamamen bilgilendirme amaçlı. IT sözleşmelerinde zayıflık bulunursa sizi uyarırız.

## Ücretsiz Keşif Planla →

## Sonuç

SLA, IT destek ilişkisinin görünmez çerçevesidir. İyi çalışırken fark edilmez ama bir sorun çıktığında tüm oyun kurallarını belirler. İmza atmadan önce 10 maddemizi kontrol listeniz olarak kullanın: yanıt/çözüm süreleri net mi, öncelik seviyeleri tanımlı mı, çalışma saatleri belirli mi, uptime garantisi var mı, ceza maddeleri dişli mi, istisnalar makul mü, raporlama düzenli mi, değişiklik süreci tanımlı mı, eskalasyon prosedürü var mı, çıkış koşulları adil mi? Bu soruların cevapları olumsuzsa sözleşmeyi yeniden müzakere edin veya başka sağlayıcılarla konuşun. Kozyatağı Bilişim'in sunduğu destek paketlerinde tüm bu maddeler açık ve şeffaf şekilde tanımlıdır — çünkü iyi bir ilişkinin temeli net beklentilerdir.

## PİLLAR

4. Fidye Yazılımı ve KOBİ: 2026 Tehdit Haritası ve

Korunma Rehberi
