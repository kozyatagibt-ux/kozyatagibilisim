---
slug: 3-2-1-yedekleme-kurali
title: "3-2-1 Yedekleme Kuralı Nedir ve Nasıl Uygulanır?"
type: cluster
pillar: 3
url: "/blog/3-2-1-yedekleme-kurali"
hedef_anahtar_kelime: "3-2-1 yedekleme kuralı nedir"
meta_description: "3-2-1 yedekleme kuralı nedir, neden çalışır, nasıl uygulanır? KOBİ'ler için somut örneklerle ve maliyet tahminleriyle pratik rehber."
kelime_sayisi: "~2000"
pillar_linki: "/sirket-veri-yedekleme"
---

## Bir Felaket Hikayesiyle Başlayalım

İstanbul'da bir muhasebe bürosu vardı — 8 kişi çalışıyordu, yaklaşık 200 müşterinin defterini tutuyordu. Sahibi yedekleme konusunda titizdi: ofiste duvara monte edilmiş bir NAS cihazı vardı, tüm bilgisayarlar her gece otomatik olarak NAS'a yedekleniyordu. Aylarca düzenli çalıştı sistem.

Bir gece komşu ofiste yangın çıktı. Binanın o katı tamamen kül oldu. Bilgisayarlar gitti, NAS gitti, kağıt belgeler gitti.

10 yıllık müşteri arşivi ve son ayın işlenmemiş kayıtları yandı. Yedekler vardı — ama yedekler de yangında kül olmuştu. Bu hikaye bize 3-2-1 kuralının neden var olduğunu anlatıyor.

Yedek almak yetmez. Yedeği nereye koyduğun da en az o kadar önemlidir. 3-2-1 Kuralı Tam Olarak Ne Diyor?

Kural çok basit ve hatırlaması kolay: 3 kopya verinin olmalı (orijinal + 2 yedek) 2 farklı medya türünde saklanmalı (örneğin disk + bulut) 1 kopya offsite — yani ofis dışında bir yerde olmalı Bu kural 2000'lerin başında fotoğrafçı Peter Krogh tarafından popülerleştirildi. Profesyonel fotoğrafçıların binlerce dijital fotoğrafı koruma ihtiyacından doğdu, sonra tüm IT dünyasına yayıldı. Bugün hâlâ veri koruma konusunda altın standart kabul edilir.

Neden Bu Sayılar? Kuralın her sayısının arkasında bir mantık var: Neden 3 kopya? Çünkü iki kopya yetmez.

Orijinal verin var, bir de yedeğin var diyelim. Eğer yedek alma esnasında bir hata olur ve yedek bozulursa, kurtaracak şey kalmaz. Üçüncü kopya bu riski ortadan kaldırır.

Neden 2 farklı medya? Çünkü her medyanın kendine özgü riskleri vardır. Tüm yedekleri aynı tip cihazda tutarsanız, o cihaz tipinin ortak bir zayıflığı sizi vurabilir.

Örneğin tüm yedekleri SSD'de tutuyorsanız ve aynı parti SSD'lerde firmware bug'ı varsa hepsi birden bozulabilir. NAS'ta ve harici diskte tutarsanız böyle bir risk azalır. Neden 1 kopya offsite?

Çünkü fiziksel felaketler vardır. Yangın, sel, hırsızlık, deprem. Aynı odada üç farklı medyada üç kopyanız da olsa, oda yandığında üçü birden gider.

Offsite kopya bu felaket senaryosuna karşı tek korumandır.

### Senaryo 1

Küçük Ofis (5-15 kişi) Kopya 1 (orijinal): Ofisteki sunucu veya çalışma bilgisayarları Kopya 2 (yerel yedek): Ofisteki NAS cihazı, gece otomatik yedekleme Kopya 3 (offsite): Bulut yedekleme servisi (Backblaze, Acronis, Veeam Cloud Connect, yerel bulut sağlayıcılar) Maliyet: NAS bir kerelik ~15-30 bin TL, bulut yedekleme aylık 1-3 bin TL civarı veri miktarına göre.

### Senaryo 2

Orta Ölçek (15-50 kişi) Kopya 1: Sunucudaki canlı veri Kopya 2: Yerel yedekleme sunucusu (dedicated backup server) — kurumsal yedekleme yazılımıyla yönetilen Kopya 3: Bulut yedekleme + ayrıca ayda bir alınan harici diskin başka bir lokasyona götürülmesi

### Senaryo 3

Daha Tutucu Yaklaşım — 3-2-1-1-0 Veeam ve diğer kurumsal yedekleme firmaları kuralı genişletti: 3-2-1-1-0. İlave şartlar: en az 1 kopya immutable olmalı (silinemeyen, fidye yazılımına dayanıklı) ve yedeklemelerde 0 hata olmalı (test edilmiş). Yüksek hassasiyetli sektörler (sağlık, finans, hukuk) için bu genişletilmiş versiyon tercih edilir.

Yaygın Hatalar Hata 1: "Bulut yedekleme zaten her şey demek" — Hayır. Bulut tek başına 3-2-1 değildir. Bulutta sadece 1 kopyan vardır, yerel kopya da gereklidir çünkü internet kesilirse ya da bulut sağlayıcısı sorun yaşarsa erişemezsin.

Hata 2: Aynı NAS'ta iki klasör — "Aynı NAS'ın bir klasörüne yedek alıyorum, başka klasörüne de kopyalıyorum, yani 3 kopyam var" diyenler oluyor. Hayır. Aynı cihazdaki kopyalar tek kopya sayılır çünkü cihaz ölürse hepsi gider.

Hata 3: Yedeği test etmemek — En kötü hata. Yedek var ama açılıyor mu, geri yüklenebiliyor mu hiç denenmemiş. Yedeklerin ayda bir test edilmesi şarttır.

[Şirket veri yedekleme rehberi] yazımızda test prosedürünü detaylı anlattık. Hata 4: Offsite kopyayı sürekli ofiste tutmak — "Harici disk alıyorum yedek alıyorum, akşamları çantama atıp eve götürüyorum" diyenler için iyi haber. Ama bunu unutan, hep ofiste bırakan, ya da çalışan ayrılıp diski yanına götürenler için kötü haber.

Hata 5: Şifrelememek — Offsite götürdüğünüz yedek kaybolur ya da çalınırsa, şifresizse müşteri verileriniz herkese açıktır. KVKK'ya da aykırıdır. Hangi Yedekleme Yazılımı?

Kuralı uygulamak için yedekleme yazılımı kullanmak şart. Başlıca seçenekler: Veeam Backup & Replication: Kurumsal standardı, güçlü, ancak lisans pahalı Acronis Cyber Protect: KOBİ dostu, fiyat/performans iyi, fidye yazılımı koruması entegre Synology Active Backup: Synology NAS'ınız varsa ücretsiz dahil Macrium Reflect: Workstation yedekleme için Restic / Duplicati: Açık kaynak, uzman gerektirir Kontrol Listesi: Sizin Yedekleme Sisteminiz 3-2-1 Uyumlu mu? Üç kopyanız var mı?

(Orijinal + iki yedek) İki farklı medya türünde mi? (Sadece NAS değil, NAS + bulut gibi) En az bir kopya ofis dışında mı? Yedekler şifreli mi?

Son üç ayda en az bir kez geri yükleme testi yaptınız mı? Yedekleme sürecini takip eden ve hatalarda uyarı veren bir sistem var mı? RTO ve RPO değerleriniz tanımlı mı?

Bu sorulardan herhangi birine "hayır" diyorsanız, yedekleme stratejinizde açık var demektir. 3-2-1 Yedekleme Kurulumu Şirketinize uygun yedekleme altyapısını kurup yönetiyoruz. Donanım seçimi, yazılım kurulumu, otomatik yedekleme, periyodik test ve felaket kurtarma planı dahil.

## Sonuç

3-2-1 kuralı 20 yıldır geçerliliğini koruyor çünkü temel mantığı sağlam: tek bir noktaya bağlı kalmamak. Veri kaybının nereden geleceğini önceden bilemezsiniz — donanım arızası mı, fidye yazılımı mı, yangın mı, çalışan hatası mı? 3-2-1 stratejisi bu senaryoların tamamına karşı koruma sağlar.

Kurulumu zor değil, sürdürmesi de pahalı değil. Sadece düzenli yapılması gerek.
