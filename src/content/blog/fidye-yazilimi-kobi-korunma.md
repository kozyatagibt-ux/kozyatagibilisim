---
slug: fidye-yazilimi-kobi-korunma
title: "Fidye Yazılımı ve KOBİ: 2026 Tehdit Haritası ve Korunma Rehberi"
type: pillar
pillar: 3
url: "/blog/fidye-yazilimi-kobi-korunma"
hedef_anahtar_kelime: "fidye yazılımı kobi"
meta_title: "Fidye Yazılımı ve KOBİ: 2026 Tehdit Haritası ve Korunma Rehberi | Kozyatağı Bilişim"
meta_description: "KOBİ'ler artık fidye yazılımı saldırılarının ana hedefi. 2026 tehdit haritası, saldırı anatomisi, korunma katmanları ve kriz anında yapılacaklar. Kapsamlı rehber."
kelime_sayisi: "~2500"
pillar_linki: "/sirket-veri-yedekleme"
---

Birkaç yıl önce fidye yazılımı denince akla gelen şey büyük hastaneler, uluslararası şirketler ve devlet kurumlarına yapılan manşete çıkan saldırılardı. 2024'ten itibaren tablo tamamen değişti. Siber suçlular artık KOBİ'leri ana hedef olarak görüyor — nedeni basit: büyük kurumların savunması güçlendi, ama KOBİ'ler hala korumasız. Ve KOBİ'ler genelde fidyeyi ödeme eğiliminde oluyor çünkü iş kaybetme lüksleri yok. Bu yazıda 2026 itibariyle KOBİ'leri bekleyen fidye yazılımı tehdidini, saldırının nasıl yapıldığını, korunmanın katmanlarını ve bir saldırıyla karşılaştığınızda ilk 24 saatte ne yapmanız gerektiğini anlatacağız. Bu bir korku pompalaması değil — bu, her KOBİ sahibinin veya yöneticisinin bilmesi gereken temel operasyonel bilgi.

## Önce Tanımları Netleştirelim: Fidye Yazılımı Nedir?

Fidye yazılımı (ransomware), bir bilgisayara veya ağa bulaştıktan sonra tüm dosyaları şifreleyerek erişilmez hale getiren ve şifreyi çözmek için genelde kripto para cinsinden fidye talep eden zararlı yazılım türüdür. Modern fidye yazılımı saldırıları tek bir bilgisayarı değil, ağdaki tüm sistemleri aynı anda vurur — sunucular, kullanıcı bilgisayarları, yedek sistemleri, hatta bazen buluttaki verileri bile. Eskiden "şifrele ve fidye iste" modeli basitti. Yeni nesil saldırılarda daha kötü bir şey var: "double extortion" denilen çift baskı modeli. Saldırgan verileri hem şifreler hem de kendi sunucularına kopyalar. Ödeme yapmazsanız verileriniz silinir; ama şifreyi çözseniz bile bu sefer "fidye ödemezseniz verilerinizi internete koyarız" diye ikinci bir baskı başlar. Yani ödeseniz de ödemeseniz de kaybediyorsunuz, ödemeniz sadece kayıp boyutunu azaltıyor.

## 2026 İtibariyle KOBİ Tehdit Manzarası

Siber güvenlik sektöründen gelen veriler son derece net bir tablo çiziyor: Fidye yazılımı saldırılarının %60'ından fazlası artık 500 çalışandan az olan şirketleri hedef alıyor KOBİ'lerin saldırı sonrası ortalama kapalı kalma süresi 10-21 gün arasında Saldırı başına ortalama toplam maliyet (fidye + kurtarma + iş kaybı + hukuki süreçler) KOBİ'ler için 250.000-750.000 TL arasında Saldırıya uğrayan KOBİ'lerin yaklaşık %60'ı saldırıdan 6 ay içinde kapanıyor Fidye ödenen durumların sadece yarısında saldırgan gerçekten şifreyi çözüyor Bu rakamlar size bir şeyi söylüyor: fidye yazılımı bir olasılık değil, olasılık konusunda. Ama bu yazının bir amacı da, kaderci bir bakış yaratmak yerine, neyin neden olup ne yapılabileceğini anlamak. Bir Fidye Yazılımı Saldırısı Nasıl Gerçekleşir? — Saldırının Anatomisi Saldırganlar genellikle aynı senaryoyu izler. Bu senaryoyu bilmek hem korunma noktalarını anlamak hem de saldırının erken aşamalarını tespit edebilmek için kritik önemde.

## Aşama 1: Giriş (Initial Access)

## Saldırgan önce bir giriş noktası bulur. En yaygın üç yöntem:

Phishing e-postası: Çalışana sahte bir e-posta gelir. Bu e-posta bazen bir fatura, bazen bir kargo takibi, bazen bankadan gelmiş gibi görünür. İçinde ya bir ekli dosya vardır (Word, PDF, Excel) ya da bir link. Çalışan tıkladığında arka planda zararlı yazılım indirilir ve çalışanın bilgisayarına yerleşir. Tüm saldırıların %70'inin başlangıç noktası budur. Zayıf RDP bağlantısı: Birçok KOBİ uzaktan bağlantı için Microsoft'un RDP protokolünü kullanır. Bu protokol internete açıldığında ve güçlü parola kullanılmadığında saldırganlar brute force (kaba kuvvet) yöntemiyle giriş yapar. Zayıf parola + internet erişimi = davetiye. Güncellenmemiş yazılım açıkları: Eski Windows sürümleri, güncellenmemiş VPN cihazları, eski web sunucuları — bunların her birinin bilinen güvenlik açıkları vardır ve saldırganlar otomatik tarama araçlarıyla bu açıkları sürekli tararlar.

## Aşama 2: Yerleşme (Persistence)

Saldırgan bir bilgisayara girdikten sonra hemen şifrelemeye başlamaz. Önce sisteme kalıcı olarak yerleşir — Windows'un başlangıç programlarına eklenir, kullanıcı hesapları oluşturur, uzaktan erişim için arka kapılar kurar. Amaç bilgisayar yeniden başlatılsa bile erişimi kaybetmemektir.

## Aşama 3: Keşif (Reconnaissance)

Bu aşama 2-3 hafta sürebilir. Saldırgan ağa yavaş yavaş yayılır, hangi sunucuların olduğunu, hangi verilerin önemli olduğunu, yedeklerin nerede tutulduğunu öğrenir. Bu süre zarfında siz hiçbir şeyin farkında olmazsınız — çünkü saldırgan henüz bir şey bozmuyor, sadece bakıyor.

## Aşama 4: Yedeklerin İmhası

Kritik aşama burası. Saldırgan bir saldırıyı başlatmadan önce mutlaka yedeklerinizi bulur ve siler. Çünkü sağlam bir yedeğiniz varsa fidyeyi ödemenize gerek kalmaz. Bu nedenle yedekleriniz ana ağınıza bağlıysa (mesela aynı sunucuda veya network drive'da), büyük ihtimalle saldırı anında onlar da şifrelenir. Offline veya immutable (değiştirilemez) yedekler bu nedenle kritiktir — 'Yedeğim Var' Yanılgısı yazımızda bu konuyu daha detaylı ele alıyoruz.

## Aşama 5: Şifreleme ve Fidye Talebi

Saldırgan artık hazırdır. Genelde bir hafta sonu gecesi (Cuma gece 23:00 gibi) şifreleme başlar — böylece Pazartesi sabahı iş yerine gelen çalışanlar her şeyin şifrelendiğini görür. Ekranlarda fidye notu çıkar: "Tüm verileriniz şifrelendi. Kurtarmak için şu cüzdana şu kadar Bitcoin gönderin. 72 saat içinde ödemezseniz verileriniz silinecek. Polise bildirirseniz verileriniz internete sızdırılacak."

## Korunma: Katmanlı Savunma Yaklaşımı

Fidye yazılımına karşı tek bir "sihirli değnek" yoktur. Etkili korunma, birden fazla katmanın üst üste çalıştığı bir sistemle mümkündür. Bir katman başarısız olursa diğerleri saldırıyı durdurur. Katmanları sırayla inceleyelim.

## Katman 1: İnsan (Farkındalık ve Eğitim)

Tüm saldırıların büyük kısmı bir çalışanın yanlış e-postaya tıklamasıyla başlar. Dolayısıyla ilk savunma hattınız insan faktörüdür. Çalışanlarınız: Şüpheli e-postaları tanıyabilmeli — yazım hataları, tuhaf gönderici adresleri, aciliyet baskısı Ek dosyaları açmadan önce düşünmeli Link üzerine tıklamadan önce fareyle üzerine gelip URL'yi kontrol etmeli Şüpheli bir durumda hemen IT desteğe bildirmeli, "önce açıp bakayım ne olur" dememeli Bu eğitim tek seferlik olmamalı; 6 ayda bir yenilenmeli, ayrıca simüle phishing testleriyle çalışanların hazırlığı ölçülmeli.

## Katman 2: E-posta Güvenliği

İnsandan önce e-posta güvenlik katmanlarının şüpheli mesajları yakalaması gerekir. Bu:

## SPF, DKIM, DMARC kurulumu (sahte gönderici engelleme)

E-posta filtreleme çözümü (Proofpoint, Mimecast, Microsoft Defender for Office 365 gibi)

## Dışarıdan gelen e-postaların "DIŞ" etiketi ile işaretlenmesi

Ek dosyaların sanal ortamda (sandbox) açılıp test edilmesi Katman 3: Uç Nokta Güvenliği Her bilgisayarda modern bir güvenlik yazılımı bulunmalı. Geleneksel antivirüs artık yeterli değil — saldırganlar antivirüsleri kolayca atlar. Bunun yerine EDR (Endpoint Detection and Response) sınıfı ürünler kullanılmalı. EDR'ler sadece bilinen tehditleri değil, şüpheli davranışları da tespit eder.

## Katman 4: Ağ Güvenliği ve Segmentasyon

Ağınızın kurumsal bir güvenlik duvarı (firewall) ile korunması gerekir. Ama bu kadar yetmez — ağın içinde segmentasyon da olmalı. Yani sunucu ağı, kullanıcı ağı, misafir ağı ayrı bölgeler olarak ayrılmalı. Böylece bir çalışanın bilgisayarına bulaşan zararlı yazılım doğrudan sunuculara geçemez.

## Katman 5: Kimlik ve Erişim Yönetimi

Çok faktörlü kimlik doğrulama (MFA) tüm kritik sistemlerde Güçlü parola politikası ve parola yöneticisi kullanımı "En az yetki" prensibi — kullanıcılar sadece gerektiği kadar erişime sahip olmalı Yönetici hesaplarının ayrılması, günlük kullanım için kullanılmaması Ayrılan çalışanların hesaplarının anında kapatılması Katman 6: Yedekleme — Son Savunma Diğer tüm katmanlar başarısız olsa bile, sağlam bir yedeğiniz varsa fidye yazılımı sizi diz çöktüremez. Kötü haber: KOBİ'lerin çoğunun yedekleri yetersiz, düzensiz veya test edilmemiş. Sağlam yedeklemenin üç kuralı: 3-2-1 Kuralı: 3 kopya veri, 2 farklı medya türünde, 1'i offsite (uzak lokasyon) olarak saklanmalı. Hiçbir zaman tek bir yedeğe güvenmeyin. Immutable (Değişmez) Yedek: Yedeklerinizin en az bir kopyası, bir kere yazıldıktan sonra silinemez veya değiştirilemez olmalı. Modern bulut yedek çözümleri bunu sunar. Saldırgan sisteminize girse bile bu yedeği silemez. Düzenli Geri Yükleme Testi: Yedek almak yetmez, yedeği geri yükleyebildiğinizden emin olmak için düzenli test yapmak gerekir. Çoğu şirket "yedek var" sanır ama olay gününde yedeklerin geri yüklenemediğini öğrenir. RTO ve RPO kavramlarını açıkladığımız yazımız yedekleme hedeflerinizi nasıl belirleyeceğinizi anlatıyor.

## Saldırıya Uğradınız: İlk 24 Saat Eylem Planı

Tüm önlemlerinize rağmen saldırı olduysa — ki teorik olarak her zaman mümkündür — ilk 24 saatte ne yapacağınız kayıp boyutunu belirler. Panik değil, prosedür.

## İlk Saat

1. İzole et: Etkilenen bilgisayarları ağdan anında çıkarın — kablo sökün, Wi-Fi'yi kapatın. Saldırının yayılmasını durdurun. Bilgisayarı kapatmayın — RAM'de delil olabilir, uzmanlar bunu inceleyebilir. 2. IT destek hattını arayın: Profesyonel IT desteğiniz varsa hemen arayın. Yoksa bu ilk kez bir sağlayıcıya ulaşacağınız an değil — panik halinde seçim yapmak zordur. Önceden bir acil müdahale ortağınızın olması hayati. 3. Fotoğraf çekin: Ekrandaki fidye notunu, etkilenen dosyaları fotoğraflayın. Bu hem hukuki hem teknik süreçte gerekli olacak.

## İlk 4 Saat

4. Yayılımı değerlendirin: Hangi bilgisayarlar etkilendi, hangi sunucular, hangi paylaşımlı dosyalar? Ağın temiz olan kısımlarını belirleyin. 5. Yedeğinizi kontrol edin: Yedekleriniz şifrelenmiş mi yoksa temiz mi? Eğer yedekler temizse rahat bir nefes alabilirsiniz; o günden saldırı anına kadar olan veri dışında her şey kurtarılabilir. 6. Kilit personeli bilgilendirin: Şirket sahibi, genel müdür, hukuk danışmanı, KVKK sorumlusu haberdar edilmeli.

## İlk 24 Saat

7. Fidye ödemeyi düşünmeyin: Türk Ceza Kanunu ve uluslararası düzenlemeler açısından fidye ödeme tavsiye edilmez. Ayrıca ödeme garantisi yoktur; saldırganların yarıdan fazlası ödeme alsa bile şifreyi çözmez. 8. KVKK bildirimi: KVKK kapsamında, kişisel veri ihlali durumunda 72 saat içinde Kişisel Verileri Koruma Kurulu'na bildirim yapma yükümlülüğünüz vardır. Süreyi kaçırmayın. 9. Adli makamlara başvuru: Saldırıyı Siber Suçlarla Mücadele'ye bildirin. Bu hem hukuki korunmanız için hem de saldırgan profilinin takibi için gereklidir. 10. Kurtarma planını başlatın: Temiz yedeklerden geri yükleme süreci başlar. Bu süreç şirket büyüklüğüne göre 2-14 gün sürebilir. Profesyonel bir felaket kurtarma hizmeti bu süreyi ciddi oranda kısaltır. Unutmayın: Saldırı sonrası temiz kurulum yapılmadan sistemleri geri açmayın. Saldırgan arka kapılarını bırakmış olabilir; sadece şifrelenmiş dosyaları geri yüklemek yetmez, tüm sistemin baştan temiz kurulması gerekir. Aksi halde birkaç hafta sonra aynı saldırganın yine geldiğini görürsünüz.

## Fidye Yazılımı Hazırlık Kontrol Listesi

Aşağıdaki 12 maddeden kaç tanesi şirketinizde sağlanıyor? Eksik kalan her madde bir risk alanıdır.

1. Çalışanlara düzenli siber güvenlik eğitimi veriliyor

2. Tüm bilgisayarlarda modern güvenlik yazılımı (EDR seviyesi) kurulu

3. E-posta güvenlik çözümü aktif (SPF, DKIM, DMARC + filtreleme)

4. Kurumsal firewall kurulmuş ve düzenli güncelleniyor

5. MFA tüm kritik hesaplarda aktif

6. İşletim sistemi ve yazılım güncellemeleri düzenli uygulanıyor

7. 3-2-1 kuralına uygun yedekleme var

8. Yedeklerden en az biri offline veya immutable

9. Yedekler aylık olarak test ediliyor

10. Felaket kurtarma planı yazılı olarak hazır

11. Acil durumda kimi arayacağınız net belli

12. Ayrılan çalışanların erişimleri anında kapatılıyor

Sıkça Sorulan Sorular Fidyeyi ödesek verilerimizi geri alabilir miyiz? Bazen evet, bazen hayır. Saldırganların yaklaşık yarısı ödeme sonrası çalışan bir şifre çözme aracı gönderir. Diğer yarısı ya hiç göndermez ya da kısmi çözüm sağlar. Ayrıca verilerinizi geri alsanız bile, aynı saldırgan bir sonraki ayda yine gelebilir (bir kere ödeyen müşterinin yine ödeyeceği bilindiği için). Fidye ödeme hiçbir zaman bir strateji değildir, olsa olsa son çare bir taktiktir — ve pratikte neredeyse her zaman yanlış seçimdir.

## Siber sigortam var, bu beni koruyor mu?

Siber sigortalar son yıllarda yaygınlaştı ama önemli sınırları var. Çoğu poliçe sadece belirli koşullarda ödeme yapar ve önkoşul olarak belirli güvenlik standartlarının uygulanmış olmasını ister. Eğer temel güvenlik önlemleriniz yoksa (MFA, yedekleme, güncelleme) sigortanız poliçeyi ödemeyi reddedebilir. Sigorta korunmanın yerine geçmez, tamamlayıcı bir katmandır.

## Küçük şirketiz, bizi kim neden hedef alır?

Günümüzde saldırılar büyük çoğunlukla hedefli değil, otomatiktir. Saldırganlar binlerce şirketi otomatik araçlarla tarar, güvenlik açığı olanları bulur ve sadece onlara saldırır. "Küçüğüm, görünmezim" yanılgısı tehlikelidir — saldırganlar için siz bir hedef değil, bir fırsatsınız. Büyük kurumların sıkı savunması var, sizin savunmanız zayıfsa siz daha kolay lokmasınız.

## Ne kadar sıklıkla yedek almalıyız?

Bu "kaç saatlik veri kaybını tolere edebilirsiniz" sorusunun cevabına bağlıdır. Bu kavrama RPO (Recovery Point Objective) denir. Çoğu KOBİ için günlük tam yedek + saatlik artımlı yedek iyi bir başlangıç noktasıdır. Kritik veriler için daha sık yedekleme gerekebilir.

## Bulut yedek yeterli mi, yoksa yerel yedek de gerekli mi?

Her ikisi de gereklidir. 3-2-1 kuralı bunu zaten söyler: 3 kopya, 2 farklı medya, 1 offsite. Sadece yerel yedek yanlıştır (yerel olay yaşarsanız hepsi gider), sadece bulut yedek de yanlıştır (internet bağlantısı koptuğunda ulaşamazsınız ve geri yükleme yavaş olur). İkisi de olacak, biri olmazsa diğeri olacak.

## Şirketinizin Fidye Yazılımı Hazırlık Durumunu Değerlendirelim

Ücretsiz bir keşif görüşmesinde, yukarıdaki 12 maddelik kontrol listesini birlikte gözden geçirelim. Eksiklerinizi tespit edelim, öncelik sırasıyla aksiyon planı çıkaralım. Tek seferlik bir denetimden aylık yönetilen hizmete kadar seçeneklerinizi netleştirelim.

## Ücretsiz Keşif Planla →

## Sonuç

Fidye yazılımı 2026 itibariyle KOBİ'lerin karşılaştığı en ciddi operasyonel risklerden biri. "Başımıza gelmez" düşüncesi güvenli değil — istatistikler tam tersini söylüyor. Ama panik halinde savunmasız hissetmek de gereksiz; korunmanın katmanları bilinen, uygulanan ve sonuç veren yöntemlerdir. Önemli olan erken davranmak. Saldırı sonrası hazırlık olmaz — hazırlık önceden yapılır. Eğer bugün şirketinizin savunma durumunu objektif bir gözle değerlendirmek istiyorsanız, IT Sağlık Kontrolü hizmetimiz tüm kontrolleri sistematik olarak yapar ve önceliklendirilmiş bir rapor sunar. Sağlam yedekleme ve felaket kurtarma altyapısı kurmak için ise Felaket Kurtarma & Yedekleme hizmetimiz ile ilerleyebilirsiniz.

## CLUSTER

5. "Yedeğim Var Sanıyordum": KOBİ'lerin En Pahalı

Yanılgısı
