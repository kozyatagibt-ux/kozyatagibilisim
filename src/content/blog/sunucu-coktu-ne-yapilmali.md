---
slug: sunucu-coktu-ne-yapilmali
title: "Sunucunuz Çöktü mü? İlk 60 Dakikada Yapmanız Gerekenler"
type: cluster
pillar: 1
url: "/blog/sunucu-coktu-ne-yapilmali"
hedef_anahtar_kelime: "sunucu çöktü ne yapmalı"
meta_description: "Şirket sunucusu çöktü ve iş durdu mu? Panik yapmayın. İlk 60 dakikada yapmanız gerekenleri, veri kurtarma adımlarını ve acil müdahale planını anlatıyoruz."
kelime_sayisi: "~1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Pazartesi Sabahı 08:30 — Hiçbir Şey Çalışmıyor

Pazartesi sabahı saat 08:30. Muhasebe ekibi Netsis'e giremediğini bildirdi. Satış ekibi paylaşımlı klasörlere ulaşamıyor. Depodan "barkod sistemi çöktü" diye telefon geldi. Ortak nokta: sunucu yanıt vermiyor.

Bu senaryo, her yıl Türkiye'deki binlerce KOBİ'nin başına geliyor. Ve o ilk 60 dakikada yapılan doğru hamleler, şirketin 2 saatte mi yoksa 2 günde mi toparlanacağını belirliyor. Bu rehberde, sunucunuz çöktüğünde adım adım ne yapmanız gerektiğini anlatıyoruz. Sakin olun, bu yazıyı açık tutun ve sırayla ilerleyin.

## Adım 1: Panik Yapmayın, Durumu Belgeleyin (İlk 5 Dakika)

İlk tepkiniz "hemen bir şey deneyelim" olacak. Ama önce durumu kayıt altına alın. Çünkü rastgele müdahale sorunu büyütebilir.

Hemen şunları not edin:

- Sorun tam olarak saat kaçta fark edildi?
- Hangi sistemler etkileniyor? (ERP, dosya paylaşımı, e-posta, yazıcılar)
- Tüm şirket mi etkileniyor yoksa sadece bir departman mı?
- Son 24 saatte herhangi bir güncelleme veya değişiklik yapıldı mı?

Telefonunuzla sunucu odasına gidin. Sunucunun ön panelindeki ışıkları, varsa ekrandaki hata mesajlarını ve UPS durumunu fotoğraflayın. Bu belgeler hem teknik ekibe hem sigorta sürecine hem de olası KVKK bildirimlerine lazım olacak.

## Adım 2: Donanım mı Yazılım mı? Hızlı Teşhis (5-15. Dakika)

Sunucu çökmelerinin kabaca iki kategorisi vardır ve müdahale şekli tamamen farklıdır.

### Donanım Kaynaklı Belirtiler

- Sunucu tamamen sessiz, fan dönmüyor, ışık yanmıyor
- Turuncu veya kırmızı uyarı LED'leri yanıyor
- Bip sesi geliyor
- Sunucu odası normalden sıcak

### Yazılım Kaynaklı Belirtiler

- Sunucu açık ama uzaktan erişim (RDP) yanıt vermiyor
- Mavi ekran (BSOD) veya boot döngüsü
- Servisler çalışıyor ama belirli uygulamalar açılmıyor
- Disk doluluk veya RAM tükenme uyarısı

Bu ayrım kritik. Donanım sorunu varsa sunucuyu zorla yeniden başlatmak diski daha fazla bozabilir. Yazılım sorunuysa kontrollü bir restart çoğu zaman çözüm olabilir.

## Adım 3: UPS ve Elektrik Kontrolü (15-20. Dakika)

Tahmin edemeyeceğiniz kadar sık karşılaşılan neden: elektrik kesintisi veya UPS arızası. Kontrol edin:

- UPS çalışıyor mu? Ekranında hata kodu var mı?
- UPS bataryası kaç yaşında? (2 yıldan eski bataryalar habersiz çökebilir)
- Sunucu odasında prize bağlı başka cihazlar çalışıyor mu?
- Yakın zamanda elektrik kesintisi veya dalgalanması oldu mu?

Eğer UPS arızası tespit ederseniz, sunucuyu doğrudan prize bağlayarak (geçici olarak) başlatmayı deneyebilirsiniz. Ama bunu yapmadan önce bir sonraki adımı mutlaka okuyun.

## Adım 4: Uzaktan Erişim Denemesi (20-25. Dakika)

Sunucu fiziksel olarak açık görünüyorsa ama yanıt vermiyorsa, uzaktan erişim yollarını deneyin:

- **RDP (Uzak Masaüstü):** Aynı ağdaki bir bilgisayardan sunucunun IP adresiyle bağlanmayı deneyin.
- **iLO / iDRAC / IPMI:** Kurumsal sunucularda (HP, Dell) donanım seviyesinde uzaktan yönetim kartı bulunur. Bu kartın IP adresini biliyorsanız, tarayıcıdan sunucunun konsol ekranını görebilirsiniz.
- **Ping testi:** Komut satırından `ping sunucu-ip-adresi` yapın. Yanıt geliyorsa sunucu ağda ama servisler çökmüş olabilir.

Eğer hiçbir uzaktan erişim çalışmıyorsa ve sunucu fiziksel olarak yanıt vermiyorsa, profesyonel destek zamanı gelmiş demektir.

## Adım 5: IT Sağlayıcınızı Arayın (25-30. Dakika)

Bu noktada elinizde değerli bilgiler var: sorunun ne zaman başladığı, hangi sistemleri etkilediği, donanım mı yazılım mı olduğuna dair ipuçları ve fotoğraflar. Şimdi IT destek firmanızı arayın.

Arama sırasında şunları aktarın:

- Ne zaman başladı, kaç kişi etkileniyor
- Donanım kontrolünde ne gördünüz
- Son yapılan değişiklikler (güncelleme, yeni yazılım kurulumu vs.)
- UPS durumu

Profesyonel bir IT firması bu bilgilerle 10-15 dakika içinde uzaktan veya yerinde müdahaleye başlayabilir. Eğer IT sağlayıcınız yoksa veya ulaşamıyorsanız, bu yazının sonundaki iletişim bilgilerinden bize ulaşabilirsiniz.

Detaylı acil müdahale adımları için [sunucu çökmesi acil müdahale](/blog/sunucu-coktu-ne-yapilmali) rehberimize bakabilirsiniz.

## Adım 6: Yedekten Kurtarma Planını Devreye Alın (30-45. Dakika)

Sunucu kısa sürede düzeltemiyorsa, B planı devreye girer: yedekten geri yükleme. Ama önce şu soruları cevaplamanız gerekiyor:

- **Yedeğiniz var mı?** (Cevap "sanırım var" ise, aslında emin değilsiniz demektir)
- **Son yedek ne zaman alındı?** Dün gece mi, geçen hafta mı?
- **Yedek nerede?** Aynı sunucuda mı (tehlikeli), harici diskte mi, bulutta mı?
- **Yedek test edildi mi?** Hiç geri yükleme denemesi yapıldı mı?

Bu sorulara net cevap veremiyorsanız, [3-2-1 yedekleme kuralı](/blog/3-2-1-yedekleme-kurali) rehberimizi mutlaka okuyun. 3-2-1 kuralı basittir: 3 kopya, 2 farklı ortam, 1 tanesi offsite (bulut veya farklı lokasyon).

### RTO ve RPO: Bu Kavramları Bilmeniz Şart

İki kavram var ki her işletme sahibinin bilmesi gerekir:

- **RTO (Recovery Time Objective):** Sistemin ne kadar sürede ayağa kalkması gerektiği. Örneğin "2 saat içinde ERP çalışmalı" diyorsanız, RTO'nuz 2 saattir.
- **RPO (Recovery Point Objective):** Ne kadarlık veri kaybını tolere edebileceğiniz. Örneğin "son 4 saatlik veriyi kaybedebiliriz ama daha fazlasını değil" diyorsanız, RPO'nuz 4 saattir.

Bu iki değer, yedekleme stratejinizi ve bütçenizi belirler. Konuyu daha detaylı anlamak için [RTO ve RPO nedir](/blog/rto-rpo-nedir-kobi) yazımıza göz atın.

## Adım 7: Geçici Çözümle İşi Döndürün (45-60. Dakika)

Sunucu tamiri veya geri yükleme saatler sürebilir. Bu sürede işin tamamen durması gerekmez. Geçici çözüm seçenekleri:

- **Bulut geçişi:** Kritik dosyaları OneDrive veya Google Drive'a taşıyarak çalışanların erişimini sağlayın
- **Yedek sunucu:** Eğer sanal makine yedekleriniz varsa, başka bir donanımda veya bulutta geçici olarak ayağa kaldırabilirsiniz
- **Hotspot ile çalışma:** İnternet de etkilendiyse, telefon hotspot ile en kritik işleri döndürün
- **Manuel süreçler:** Fatura kesimi, sipariş alma gibi işler geçici olarak Excel veya kağıt üzerinden yürütülebilir

Amaç mükemmel bir çözüm değil, işin tamamen durmaması. Geçici çözüm 1 saat içinde kurulabilir ve sunucu düzelene kadar köprü görevi görür.

## Sunucu Çökmelerini Önlemenin Tek Yolu: Proaktif Yönetim

Sunucu çökmesi her zaman "olabilecek" bir risktir. Ama olma sıklığını ve etkisini minimize edebilirsiniz:

- **7/24 izleme:** Disk doluluk, sıcaklık, RAM kullanımı gibi metrikleri sürekli takip eden sistemler, çoğu çökmeyi önceden haber verir
- **Düzenli bakım:** Aylık güncelleme, disk sağlık kontrolü, log incelemesi
- **Test edilmiş yedekler:** Yedek almak yetmez, her ay geri yükleme testi yapılmalı
- **UPS bakımı:** Batarya ömrünü takip edin, yılda bir test edin
- **Dokümantasyon:** Sunucu IP adresleri, yönetim kartı bilgileri, yedek lokasyonları, şifrelerin güvenli bir yerde kayıtlı olması

Bu işlerin tamamı, profesyonel bir yönetilen IT hizmeti kapsamında düzenli olarak yapılır.

## Neden Bir IT Partneri Bu Anlarda Hayat Kurtarır?

Sunucu çöktüğünde en büyük stres, "ne yapacağımı bilmiyorum" hissidir. Bir IT partneriyle çalıştığınızda:

- Acil destek hattını ararsınız, 15 dakika içinde müdahale başlar
- Sunucunuz zaten izleniyor olduğu için çoğu zaman siz fark etmeden sorun tespit edilir
- Yedekler düzenli olarak test edilmiştir, geri yükleme planı hazırdır
- RTO ve RPO değerleriniz belirlenmiştir, sürpriz yaşamazsınız

Kozyatağı Bilişim olarak İstanbul'daki KOBİ'lere tam da bu hizmeti sunuyoruz. Sunucu izleme, yedekleme yönetimi, acil müdahale ve proaktif bakım — hepsi tek bir aylık anlaşma kapsamında.

## Sunucunuz Çökmeden Harekete Geçin

Eğer şu an sunucunuz çalışıyorsa, harika. Ama şu soruları kendinize sorun:

- Son yedek ne zaman alındı ve test edildi mi?
- UPS bataryanız kaç yaşında?
- Sunucu çökerse kimi arayacaksınız ve ne kadar sürede müdahale edilecek?

Bu sorulara net cevap veremiyorsanız, risk altındasınız demektir. Bize ulaşın, ücretsiz bir ön değerlendirme ile mevcut durumunuzu birlikte inceleyelim.

**Kozyatağı Bilişim — 0541 636 77 75 — [kozyatagibilisim.com](https://kozyatagibilisim.com)**

---

### Bu Rehberleri de Okuyun

- [Sunucu Çökmesi: İlk 30 Dakikada Yapılacak 7 Şey](/blog/sunucu-coktu-ne-yapilmali)
- [3-2-1 Yedekleme Kuralı Nedir?](/blog/3-2-1-yedekleme-kurali)
- [RTO ve RPO Nedir? KOBİ'ler İçin Anlaşılır Rehber](/blog/rto-rpo-nedir-kobi)
