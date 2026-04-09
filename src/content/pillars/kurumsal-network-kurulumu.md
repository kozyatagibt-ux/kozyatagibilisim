---
slug: kurumsal-network-kurulumu
title: "Kurumsal Network Kurulumu: A'dan Z'ye Şirket Ağı Rehberi"
type: pillar
pillar: 4
url: "/kurumsal-network-kurulumu"
hedef_anahtar_kelime: "kurumsal network kurulumu"
ikincil_kelimeler: "şirket ağ altyapısı, ofis network kurulumu"
meta_description: "Kurumsal network nasıl kurulur? Switch, router, firewall, kablolama, Wi-Fi, segmentasyon ve güvenlik. Sıfırdan ofis ağı kurulumu için kapsamlı rehber."
kelime_sayisi: "~4000"
ic_linkler: "/blog/sirket-wifi-guvenligi, /blog/kucuk-sirket-firewall-kurulumu, /blog/uzaktan-calisan-vpn-kurulumu, /blog/kucuk-ofis-sunucusu-kurulumu"
---

Giriş: Network Görünmez Olduğunda Doğru Çalışıyor Demektir İyi bir kurumsal network'ün en temel özelliği şudur: kimse onu fark etmez. Çalışanlar bilgisayarlarını açar, dosyalara erişir, internete girer, e-posta gönderir — her şey çalışır ve kimse "network sorunu mu var" demez. Kötü bir network ise her gün varlığını hatırlatır: yazıcı bağlanmıyor, dosya sunucusu yavaş, video toplantı kesik kesik, bazı bilgisayarlar internete giremiyor.

Aradaki fark genelde başlangıçta verilen kararlardır. Maalesef Türkiye'deki birçok KOBİ network kurulumunu hafife alır. "Bir modem koy, switch çek, kabloları bağla, oldu bitti" yaklaşımı yaygındır.

Bu yaklaşımla kurulmuş bir network başlangıçta çalışıyor görünür ama şirket büyüdükçe, kullanıcılar arttıkça, yeni cihazlar eklendikçe sorunlar başlar. Sonunda tamamen yeniden yapılandırma gerekir ve bu yeniden yapılandırma ilk seferinde doğru kurmaktan çok daha pahalı olur. Bu rehber, sıfırdan veya mevcut ağı düzene sokmak isteyen KOBİ'ler için kurumsal network kurulumunun her adımını anlatır.

Çok teknik değil ama ciddi bir karar verici için yeterince derin. Ev Tipi Modemden Kurumsal Network'e Geçiş: Neden Şart? İnternet servis sağlayıcısının verdiği modem bir evi rahatlatabilir.

5 cihaz, biraz Netflix, biraz e-posta. Ama bir KOBİ ağı için ev tipi modem yeterli değildir. Sebepleri çoktur: Eşzamanlı bağlantı sınırı: Ev modemleri 20-30 cihazda zorlanır.

30 kişilik bir ofiste çalışan + telefon + yazıcı + kamera + IoT kolayca 60 cihazı bulur. Wi-Fi kapasitesi: Tek modemin kapsama alanı 100 m²'yi geçmez ve eşzamanlı kullanıcı sayısı kısıtlıdır. Güvenlik: Ev modemlerinin firewall özellikleri çok sınırlıdır.

Gelişmiş tehditlere karşı koruma sağlamaz. Yönetim: Merkezi yönetim, log tutma, izleme gibi kurumsal özellikler yoktur. Segmentasyon: VLAN gibi network ayırma özellikleri olmadığı için tüm cihazlar aynı havuzdadır.

Yedeklilik: Tek modem çöker, tüm şirket çevrim dışı kalır. Kurumsal network bu sınırların hepsini ortadan kaldırır. Profesyonel switch'ler, access point'ler, firewall ve doğru kablolama ile şirket ölçeklenebilir bir altyapıya kavuşur.

## Network Topolojileri

Network topolojisi, cihazların birbirine nasıl bağlandığının fiziksel ve mantıksal düzenidir. KOBİ'ler için pratik olan üç topoloji vardır.

## Yıldız (Star) Topoloji

Tüm cihazlar merkezi bir switch'e bağlanır. En yaygın ve en basit topolojidir. Bir cihaz koparsa diğerleri etkilenmez. Switch çökerse her şey çöker — bu dezavantajdır ama çift switch veya yedekli switch ile aşılabilir.

## Tree (Ağaç) Topolojisi

Birden fazla switch hiyerarşik olarak bağlanır. Çok katlı ofislerde her kat için bir switch, hepsi merkezi bir core switch'e bağlanır. Büyük KOBİ'ler için uygundur.

## Mesh (Örgü) Topolojisi

Cihazlar birden fazla yoldan bağlanır, bir bağlantı koptuğunda alternatif yol vardır. Yüksek kullanılabilirlik gerektiren senaryolar için. Maliyetli ama dayanıklıdır.

Çoğu KOBİ için yıldız veya tree topoloji yeterlidir. Mesh özel ihtiyaçlar için saklanır. Donanım Seçimi: Switch, Router, Access Point, Firewall Switch Switch kabloyla bağlanan cihazlar arasında veri trafiğini yöneten cihazdır.

İki ana tip vardır: yönetilemeyen (unmanaged) ve yönetilen (managed). Yönetilemeyen switch'ler ev kullanımı için, yönetilen switch'ler kurumsal kullanım için. Yönetilen switch'ler VLAN, QoS, port mirroring, güvenlik özellikleri sunar.

Switch seçerken dikkat edilecekler: port sayısı (gelecek için %30 yedek), hız (Gigabit standart, 10 Gigabit büyük dosya işleyen şirketlerde), PoE desteği (telefon ve kamera için), L2/L3 (L3 routing yapabilir), markanın güvenilirliği. KOBİ pazarında popüler markalar: Cisco, HPE Aruba, Mikrotik, TP-Link Omada, Ubiquiti UniFi. Router Router farklı network'ler arasında trafik yönlendirir.

KOBİ'lerin çoğunda ayrı bir router yerine firewall bu işi yapar (UTM cihazları routing özellikleri içerir). Çok bölgeli şirketlerde (şube, depo, fabrika) gelişmiş router gerekebilir. Access Point (AP) Wi-Fi sinyalini dağıtan cihazdır.

Modern KOBİ ofislerinde tek bir AP yetmez, birden fazla AP gerekir. Önemli olan AP'lerin merkezi yönetimle çalışması (controller veya cloud), birbirine geçişin sorunsuz olması (roaming), aynı SSID'yi yayınlaması. Ubiquiti, Aruba, TP-Link, Cisco Meraki, Ruckus iyi seçeneklerdir.

Firewall Network güvenliğinin merkezi cihazıdır. Detaylı bilgi için [küçük şirket firewall kurulumu] yazımıza bakın. KOBİ'ler için Fortinet FortiGate, SonicWall TZ serisi, WatchGuard Firebox, Sophos XG, Cisco Meraki MX iyi seçeneklerdir.

Kablolama Standartları Network'ün omurgasıdır. Yanlış kablolama bütün altyapıyı zayıflatır. Yaygın standartlar: CAT5e: Eski standart, 1 Gbps'e kadar destekler.

Yeni kurulumlarda kullanılmamalıdır. CAT6: Şu an minimum standart. 1 Gbps stabil, 10 Gbps kısa mesafede.

CAT6A: 10 Gbps, 100 metre mesafede. Yeni kurulumlarda tercih edilmelidir. CAT7: Gelişmiş kalkanlama, özel uygulamalar için.

Çoğu KOBİ için gerekli değildir. Fiber: Çok uzun mesafeler veya yüksek hız için. Switch'ler arası bağlantılarda yaygın.

## VLAN ve Network Segmentasyonu

VLAN (Virtual LAN), tek bir fiziksel network'ü mantıksal olarak parçalara ayırma yöntemidir. Aynı switch'e bağlı cihazlar farklı VLAN'larda olabilir ve birbirleriyle iletişim kuramaz (özel olarak izin verilmedikçe).

## Misafir Wi-Fi Ayırma ve Güvenliği

Şirkete gelen ziyaretçilerin internet kullanması meşrudur ama ana ağa erişim verilmemelidir. Bunun için ayrı bir misafir SSID oluşturulur ve farklı VLAN'a bağlanır. Misafir VLAN sadece internete çıkış yapabilir, şirket içi kaynaklara erişemez.

Misafir Wi-Fi için ek güvenlik önlemleri: Captive portal (kullanım koşullarını onaylatma) 5651 sayılı kanun uyumlu loglama Bant genişliği limiti (misafirler şirket internetini boğmasın) Belirli web kategorilerine erişim engeli Geçici erişim kodları, gün sonu otomatik silinme Detaylı bilgi için [şirket Wi-Fi güvenliği] yazımıza göz atın. QoS: Hangi Trafiğe Öncelik? Quality of Service (Hizmet Kalitesi), belirli trafik türlerine öncelik vererek önemli işlerin yavaşlamamasını sağlar.

Her uygulama eşit muamele görmemelidir. Tipik KOBİ önceliklendirmesi: 1. VoIP / Video toplantı: En yüksek öncelik (kesinti kabul etmez) 2.

İş kritik uygulamalar: ERP, CRM, muhasebe 3. E-posta: Orta öncelik 4. Web tarama: Standart öncelik 5.

Dosya indirme, güncellemeler: Düşük öncelik 6. Streaming, sosyal medya: En düşük öncelik QoS olmadan tek bir kullanıcının büyük dosya indirmesi tüm ofisin video toplantısını dondurabilir. QoS ile bu sorun çözülür.

İzleme ve Loglama Kurumsal network'te neler olduğunu görmeden yönetemezsiniz. İzleme katmanı bu yüzden gereklidir. İyi bir izleme şu sorulara cevap verir: Her cihaz çalışıyor mu, ne zaman koptu?

Bant genişliği nasıl kullanılıyor, hangi kullanıcı / uygulama tüketiyor? Anormal trafik var mı? Disk dolu mu, cihazlar sıcaklık tehlikesinde mi?

Switch portları doğru çalışıyor mu, port hataları var mı? Wi-Fi kapsamı yeterli mi, hangi noktalarda zayıf? İzleme araçları: PRTG, Zabbix, LibreNMS, Auvik, Cisco Meraki Dashboard, Ubiquiti UniFi Controller.

Bazıları ücretsiz açık kaynak, bazıları ticari. Loglama açısından 5651 sayılı kanun KOBİ'lere de yükümlülük getirir: internet erişim logları belirli süre tutulmak zorundadır. Bu yükümlülüğü karşılamayan firmalar denetim halinde ciddi cezalarla karşılaşabilir.

Network Güvenlik Katmanları Güvenlik bölümünü detaylı olarak [KOBİ siber güvenlik] yazımızda işledik. 1X kimlik doğrulama WPA3 Wi-Fi şifrelemesi VPN (uzak çalışanlar için) IPS/IDS Düzenli güvenlik güncellemeleri Loglama ve izleme Yaygın Kurulum Hataları (10 Madde) 1. Ev tipi modem ile kurumsal ağ kurmaya çalışmak.

Yetersiz kalır ve sürekli sorun çıkarır. 2. Tüm cihazları aynı network'te tutmak.

Güvenlik ve performans her ikisi de zarar görür. 3. Kabloları etiketlemeden çekmek.

6 ay sonra hangi kablonun nereye gittiğini kimse bilmez. 4. Yedek switch portu bırakmamak.

Şirket büyüyünce her şey yeniden yapılır. 5. Wi-Fi'yi tek noktaya kurmak.

Diğer odalarda sinyal yetersiz kalır. 6. Misafir Wi-Fi'yi ana network ile birleştirmek.

Güvenlik açığı. 7. QoS yapılandırması yapmamak.

Kritik uygulamalar bant genişliği için savaşır. 8. İzleme kurmamak.

Sorunlar fark edilmeden büyür. 9. Loglama yapmamak.

Yasal yükümlülük ihlali ve forensik analiz zorluğu. 10. Dokümante etmemek.

Network'ü kuran kişi ayrılınca kimse bilmez nerede ne var.

## Sıkça Sorulan Sorular

Network kurulumu ne kadar sürer? 30 kişilik bir ofis için tipik kurulum 1-3 hafta sürer. Yeni bir lokasyona sıfırdan kurulum daha hızlı, mevcut karmaşık ağı düzene sokmak daha uzun olabilir.

Ne kadar maliyetlidir? Çok değişken. 000 TL aralığındadır.

Aşırı yüksek görünebilir ama 5-7 yıl kullanılır ve sürekli destek gerektirmez. Kendi ekibim kurabilir mi? Teknik bilgisi varsa kurabilir ama birkaç tehlike vardır: yapılandırma hataları sonradan büyük sorunlara yol açar, profesyonel best practice'leri bilmezse kurum yapı yarım kalır.

Ortalama bir KOBİ için profesyonel destek değer üretir. Mevcut kabloları kullanabilir miyim? CAT5e veya CAT6 ise muhtemelen evet, test edilmesi şartıyla.

CAT5 veya daha eski ise yenilenmesi gerekir. Cloud-managed network mi on-premise mi? Cloud-managed (Meraki, UniFi, Aruba Central) yönetimi kolaylaştırır ve uzaktan müdahale sağlar.

KOBİ'ler için tercih edilen yöntem haline gelmiştir. Network kurulumu sırasında iş duracak mı? İyi planlanırsa hayır.

Geçiş aşamalı yapılır, hafta sonu kritik anahtarlamalar gerçekleştirilir, hafta içi mesai saatleri minimum etkilenir.

## Network Altyapı Keşfi Talep Et

Mevcut ağınızı uzmanlarımız ücretsiz inceliyor. Topoloji çıkarımı, performans testi, güvenlik kontrolü, yapılandırma analizi — tam bir teknik rapor sunuyoruz. Yeni kurulum veya iyileştirme planlaması için iletişime geçin.

## Sonuç

Kurumsal network bir kez doğru kurulduğunda yıllarca arkasını dönüp bakmadan çalışır. Yanlış kurulduğunda ise her gün size bedel ödetir: yavaş bağlantılar, kopan toplantılar, çalışmayan yazıcılar, güvenlik açıkları. İlk seferinde yapılan iyi kurulum, sonradan parçalı yamamanın 5 katına gelir.

Network kararları teknik gibi görünür ama aslında iş kararıdır. İyi bir network çalışan verimliliğini artırır, müşteriye verdiğiniz hizmet kalitesini yükseltir, güvenlik risklerini düşürür, büyümeyi destekler. Kötü bir network ise tüm bunları ters yönde etkiler.

Eğer şu anda "bizim ağımız nasıl, doğru kurulmuş mu" diye düşünüyorsanız, cevabını öğrenmenin en kolay yolu profesyonel bir denetimdir. Mevcut yapınız fotoğraflanır, performansı test edilir, eksikleri raporlanır. Ondan sonrası sizin elinizde — olduğu gibi devam edersiniz, küçük iyileştirmeler yaparsınız veya tam yenileme planlarsınız.

Önemli olan körü körüne değil, gerçek bir resimle karar vermenizdir.
