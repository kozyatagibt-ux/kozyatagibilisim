---
slug: yedek-var-sanilir-yanilgisi
title: "\"Yedeğim Var Sanıyordum\": KOBİ'lerin En Pahalı Yanılgısı"
type: cluster
pillar: 3
url: "/blog/yedek-var-sanilir-yanilgisi"
hedef_anahtar_kelime: "yedek alma hataları"
meta_title: "\"Yedeğim Var Sanıyordum\": KOBİ'lerin En Pahalı IT Yanılgısı | Kozyatağı Bilişim"
meta_description: "Yedek aldığınızı sanıp olay gününde geri yükleyemeyen şirketler için rehber. Yaygın yedekleme hataları, doğru strateji ve hemen yapmanız gerekenler."
kelime_sayisi: "~1800"
pillar_linki: "/sirket-veri-yedekleme"
---

Bir IT danışmanının en sık duyduğu cümle şu: "Bizim yedeğimiz var." Ardından gelen soru hep aynı: "Peki en son ne zaman bir yedeği gerçekten geri yüklediniz?" Cevap genelde ya sessizlik ya da "şey, test etmedik aslında". İşte sorunun kaynağı burada. Yedek almakla yedek tutuyor olmak aynı şey değil; yedek tuttuğunu zannetmek ise en tehlikeli konumdur çünkü insanı kendini güvende hissettirir ama aslında korumasızdır. Bu yazıda KOBİ'lerin yedekleme konusunda düştüğü yaygın hataları, "yedek var" deyip olay anında çaresiz kalmanın sebeplerini ve gerçekten güvende olmak için neler yapmanız gerektiğini anlatacağız.

## Gerçek Bir Hikaye: Muhasebe Firmasının Yedeği

45 çalışanı olan bir muhasebe firmasını düşünün. Ofiste bir sunucu var, üzerinde müşteri verileri, fatura kayıtları, KDV beyannameleri — şirketin kalbi. Sunucunun yanında bir NAS cihazı duruyor ve her gece otomatik olarak sunucudaki dosyaların yedeği bu NAS'a kopyalanıyor. Bu sistem 5 yıldır çalışıyor, kimse bir sorun yaşamadı. Bir Cuma gecesi şirket fidye yazılımı saldırısına uğrar. Pazartesi sabahı çalışanlar geldiğinde tüm sunucu şifrelenmiş. Yönetici sakin: "Yedeğimiz var, pazartesi akşama kadar geri yükleriz." IT desteği çağrılır. Biraz inceledikten sonra kötü haber gelir: NAS'taki yedekler de şifrelenmiş. Çünkü NAS ana ağa bağlıydı, saldırgan onu da görmüş ve şifrelemiş. Yönetici panik halinde "3 ay öncesinin yedekleri olmalı" der. Kontrol edilir: evet 3 aylık döngüde tutuluyor ama 3 ay öncesinin yedeği aynı NAS cihazında, o da şifrelenmiş. "Haftalık harici disk yedeği de vardı" deniyor — çalışanlardan biri hatırlıyor. Arkadaki dolaptan harici disk çıkarılıyor, bağlanıyor: "Son güncelleme 11 ay önce" yazıyor. Meğer disk kullanılmaz olmuş, kimse fark etmemiş, yazılım hata veriyormuş ama uyarıları kimse okumamış. Firma sonuçta fidye ödemeye karar verdi. 180 bin TL fidye, 220 bin TL kurtarma süreci, 14 gün kapalı kalma, iki büyük müşteri kaybı. Toplam zarar tahmini 850 bin TL. Ve en önemlisi, yönetici gerçekten yedekleri olduğunu sanıyordu.

## Yaygın 7 Yedekleme Hatası

Hata 1: Yedeğin Ana Ağa Bağlı Olması Yukarıdaki hikayenin baş nedeni bu. Yedek cihazı (NAS, yedek sunucusu) eğer şirketinizin ana ağında ve normal kullanıcı hesaplarıyla erişilebilir durumdaysa, saldırgan ana ağa girdiğinde onu da bulur ve yok eder. Yedek altyapısının ya fiziksel olarak ayrılmış bir ağda olması, ya offline olması, ya da immutable (değiştirilemez) modda olması gerekir.

## Hata 2: Yedeklerin Hiç Test Edilmemesi

En yaygın hata. Çoğu KOBİ yedek aldığını sanır ama yedeği bir kez bile geri yüklemeye çalışmamıştır. Bu büyük bir yanılgıdır çünkü:

## Yedekleme yazılımı aylar içinde sessizce hata üretmeye başlayabilir

Yedek dosyaları bozuk olabilir (corrupt)

## Yedek alındı diye kaydedilen aslında boş dosyalar olabilir

Yedekten geri yükleme süreci hiç denenmediği için olay gününde kimse nasıl yapılacağını bilmeyebilir Bir yedek sistemi aylık olarak test edilmeli. Test şu anlama gelir: rastgele bir dosya seçersiniz, onu yedekten geri yüklemeye çalışırsınız, açarsınız, içindekini kontrol edersiniz. Bu basit işlem sizi pek çok felaketten korur.

## Hata 3: Sadece Tek Bir Yedek Lokasyonu

3-2-1 kuralı diye bir şey var: 3 kopya, 2 farklı medya, 1 offsite. Tek bir yedeğe güvenmek, sepetteki tüm yumurtaları bir yerde tutmak gibidir. Yangın, su basması, hırsızlık, donanım arızası — bunların hepsi tek lokasyondaki yedeği aynı anda yok edebilir. Pratik uygulama: yerel bir NAS (1. kopya) + bulut yedek hizmeti (2. kopya, offsite) + haftalık olarak dönen harici disk (3. kopya, farklı medya). Bu üçlü yapıda bir kopyayı kaybetseniz bile diğer ikisine sahip olursunuz.

## Hata 4: Yedekleme Kapsamının Eksik Olması

"Önemli dosyaları yedekliyoruz" dendiğinde genelde kastedilen dosya sunucusundaki belgelerdir. Ama modern bir iş operasyonunda yedeklenmesi gereken çok daha fazla şey var:

## E-posta hesapları ve içerikleri

Veritabanları (muhasebe programı, CRM, ERP)

## Sunucu yapılandırma dosyaları

Active Directory veya kullanıcı hesapları Sanal makineler bütünüyle Bulut servislerindeki veriler (Microsoft 365, Google Workspace bile yedeklenmeli)

## Sertifikalar, parolalar, konfigürasyonlar

Eğer yedekleme planınız sadece "şu klasörü yedekle" üzerine kuruluysa, olay gününde yarım bir toparlanma yapabilirsiniz ama tam işleyen bir sisteme geri dönemezsiniz.

## Hata 5: SaaS (Bulut) Verilerin Yedeklenmediği Varsayımı

"Verilerimiz Microsoft 365'te, onlar zaten yedekliyor" — çok yaygın bir yanılgı. Microsoft (ve Google, Dropbox, Box) kendi altyapı yedeğini tutar ama bu sizin verilerinizin yedeği değildir. Eğer bir çalışan yanlışlıkla veya kasten dosyaları silerse, 30-90 gün sonra o dosyalar kalıcı olarak silinir ve Microsoft geri getiremez. Bu servisler için ayrıca üçüncü taraf yedekleme çözümleri (Veeam, Acronis, Datto gibi) kullanmanız gerekir.

## Hata 6: Yedek Yaşı ve Rotasyon Planı Yok

Sadece "bugünün yedeği" yetmez. Bazı zararlı yazılımlar sistemi hemen bozmaz — haftalarca sessizce kalır, sonra aktive olur. Sadece son yedeğiniz varsa, yedeğin de enfekte olduğunu anlamanız mümkün değildir.

## İyi bir rotasyon planı şuna benzer:

## Günlük yedek: son 14 gün tutulur

Haftalık yedek: son 8 hafta tutulur Aylık yedek: son 12 ay tutulur Yıllık yedek: en az 3 yıl tutulur Bu yapı size olay öncesindeki bir noktaya dönme esnekliği sağlar. RTO ve RPO kavramlarını ele aldığımız yazımızda bu hedeflerin nasıl belirleneceği anlatılıyor.

## Hata 7: Yedekleme Sürecini Tek Kişiye Bağlamak

Şirkette yedeklerle ilgilenen tek bir kişi varsa ve o kişi izne çıkarsa, ayrılırsa veya hastalanırsa — yedeklerin ne durumda olduğunu kimse bilmez. Bu süreç mutlaka dokümante edilmeli: neyin yedeği alınıyor, nasıl alınıyor, nerede tutuluyor, nasıl geri yükleniyor, sorun çıkarsa kim bakıyor. Bu doküman güncel tutulmalı ve en az iki kişi erişebilmeli.

## Doğru Yedekleme Stratejisinin 5 Adımı

Adım 1: Verileri Sınıflandırın Her verinin aynı önemde olduğunu düşünmeyin. Kritiklik seviyelerine ayırın: Kritik: Kayıp halinde iş duracak veriler (muhasebe veritabanı, müşteri sözleşmeleri) Önemli: Kayıp halinde ciddi sıkıntı olacak ama iş devam edecek (eski e-postalar, pazarlama materyalleri) Rutin: Kayıp halinde kolayca yeniden üretilebilir (geçici dosyalar, log'lar) Kritik veriler en sık yedeklenmeli ve en hızlı geri yüklenebilir olmalı. Rutin verilere aynı yoğunluğu vermek hem pahalı hem gereksizdir.

## Adım 2: 3-2-1 Kuralını Uygulayın

Yukarıda detaylandırdık ama tekrar vurgulayalım: 3 kopya, 2 farklı medya türü, 1 offsite. Bu kuralın dışına çıkmayın.

## Adım 3: Immutable (Değişmez) Yedek Ekleyin

Modern fidye yazılımları yedekleri bulup silmeye çalışır. Buna karşı en iyi savunma, bir kez yazıldıktan sonra silinemeyen veya değiştirilemeyen yedek kopyasıdır. Bulut tabanlı yedek çözümlerinin çoğu bu özelliği sunar — "air-gapped" veya "immutable" etiketli olanları arayın.

## Adım 4: Yedeği Otomatikleştirin ve İzleyin

Manuel yedek almak çalışmaz çünkü insan unutur. Yedekler otomatik olarak çalışmalı. Ama sadece otomatik çalışıyor olması yetmez — her yedek sonrası bir uyarı sistemi olmalı. Yedek başarısız olursa anında bilgilendirilmelisiniz, sessizce yıllarca devam etmemelidir.

## Adım 5: Her Ay Test Edin

Test etmediğiniz yedek, yedek değildir. Ayda bir gün 1 saatinizi ayırın: rastgele birkaç dosya seçin, yedekten geri yükleyin, açın, kontrol edin. Yılda bir de tam bir geri yükleme tatbikatı yapın — tüm sisteme ne kadar sürede geri dönebileceğinizi ölçün.

## "Sunucuma Fazla Yer Kaplar" İtirazı

Yedekleme hakkında konuşurken sıkça karşılaşılan bir itiraz: "Bütün bu yedekler çok yer kaplar, pahalı olur." Bu genelde artık geçerli bir endişe değil. Bulut depolama maliyetleri son yıllarda çok düştü. Ortalama bir KOBİ'nin kritik verilerinin aylık bulut yedek maliyeti 500-2000 TL bandındadır. Bir günlük iş kaybının maliyetinin yanında bu hiçbir şey değildir. Ayrıca modern yedekleme yazılımları "deduplication" (tekilleştirme) ve "incremental backup" (artımlı yedek) özellikleri sayesinde gerçek depolama ihtiyacını ciddi oranda azaltır. Yani sizin 500 GB'lık sunucunuz için 500 GB yedek yeri gerekmez, 80-120 GB civarı yeterli olabilir.

## Ne Zaman Profesyonel Destek Almalı?

Bazı şirketler kendi yedekleme sistemlerini kurabilir. Ama çoğu KOBİ için profesyonel destek almak daha mantıklıdır. Nedenleri: Modern yedekleme teknolojileri karmaşıktır, doğru yapılandırma uzmanlık ister Yedekleme strateji geliştirme deneyim ister (hangi veri ne sıklıkla, ne kadar süre)

## Düzenli test ve izleme sürekli emek ister

Olay anında hızlı geri yükleme tecrübe ister — tatbikat olmadan öğrenmek risklidir Fidye yazılımı saldırısı sonrası kurtarma süreci uzmanlık ister Bir profesyonel yedekleme hizmeti aylık 5-15 bin TL bandında kurulabilir ve size 3-2-1 kuralı, immutable yedek, otomatik izleme, aylık test ve olay müdahale garantisi sağlar. Bu yatırım, bir fidye yazılımı olayının maliyetinin %5'i bile değildir.

## Yedeklerinizi Ücretsiz Değerlendirelim

Yukarıdaki 7 hatadan kaç tanesi sizde var? Yedek sisteminizin bir profesyonel tarafından incelenmesini ister misiniz? Ücretsiz bir keşif görüşmesinde mevcut yedekleme stratejinizi gözden geçirir, kritik zayıflıkları raporlarız. Hiçbir taahhüt yok.

## Ücretsiz Keşif Planla →

## Sonuç

"Yedeğim var" cümlesi KOBİ dünyasında en yaygın yanılgılardan biridir. Yedeğinizin olması yetmez — çalışıyor olması, kapsamlı olması, test edilmiş olması, ağdan izole olması ve belli bir rotasyon planına uygun olması gerekir. Bu şartlardan biri eksikse, yedeğiniz olay gününde size bir şey ifade etmeyebilir. İyi haber şu ki, doğru yedekleme altyapısı kurmak karmaşık değil — sadece sistematik bir yaklaşım gerektiriyor. Kozyatağı Bilişim'in Felaket Kurtarma & Yedekleme hizmeti tam olarak bu sistematik yaklaşımı sunuyor: analiz, kurulum, otomasyon, izleme ve test. Fidye yazılımı riskinin genel çerçevesini anlamak için KOBİ'ler için fidye yazılımı rehberimizi de okumanızı öneriyoruz.

## CLUSTER

6. RTO ve RPO Nedir? KOBİ Yöneticileri İçin Sade

Anlatım
