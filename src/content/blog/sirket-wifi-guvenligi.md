---
slug: sirket-wifi-guvenligi
title: "Şirket Wi-Fi Güvenliği Nasıl Sağlanır?"
type: cluster
pillar: 4
url: "/blog/sirket-wifi-guvenligi"
hedef_anahtar_kelime: "şirket wifi güvenliği nasıl sağlanır"
meta_description: "Şirket Wi-Fi'ı nasıl güvenli hale getirilir? WPA3, RADIUS, misafir ağı, 5651 yükümlülüğü ve KOBİ'ler için pratik öneriler."
kelime_sayisi: "~2000"
pillar_linki: "/kurumsal-network-kurulumu"
---

"Wi-Fi Şifresini Müşteriye Veriyoruz, Sorun Yok" Çoğu KOBİ'de şirket Wi-Fi'ı şöyledir: ev tipi bir modem, üzerine yapıştırılmış bir kağıtta WPA2 şifresi yazıyor, herkes — çalışanlar, müşteriler, taşeronlar, kuryeler — aynı ağı kullanıyor. Şifre yıllardır değişmemiş, eski çalışanlar hâlâ biliyor. Misafir bir notebook'unu açtığında aynı ağa bağlanıyor ve şirket sunucusunu görüyor.

Bu yapı çalışıyor mu? Evet, internet veriyor. Güvenli mi?

Hayır. Yasal yükümlülükleri karşılıyor mu? Türkiye'de hayır.

Bu yazıda şirket Wi-Fi'ını gerçekten güvenli hale getirmenin adımlarını anlatıyoruz. 1. Doğru Şifreleme Standardı: WPA3 Wi-Fi şifrelemesi yıllar içinde gelişti: WEP → WPA → WPA2 → WPA3.

Bugün: WEP: Tamamen kırılmış, kullanmayın. Hala bunu kullanan modem varsa derhal değiştirin. WPA: Eski, savunmasız.

WPA2: Hâlâ yaygın, kabul edilebilir minimum. KRACK saldırısından sonra zayıflıkları ortaya çıktı. WPA3: Mevcut altın standart.

Daha güçlü el sıkışma protokolü, brute force saldırılarına dayanıklı. Yeni access point alıyorsanız WPA3 destekli olmalı. Eski cihazlar varsa WPA2/WPA3 mixed mode kullanın.

2. Şirket Ağı ve Misafir Ağını Ayırın En önemli adım: Wi-Fi'ı en az ikiye bölmek. Şirket Ağı: Sadece şirket çalışanlarının kendi cihazlarıyla bağlandığı ağ.

Bu ağdan sunuculara, yazıcılara, dosya paylaşımına erişim var. Misafir Ağı: Müşteri, taşeron, ziyaretçilerin kullandığı ağ. Bu ağdan sadece internete çıkış var, şirket iç ağına geçiş yok.

Bu iki ağ farklı VLAN'larda olmalı, firewall ile birbirinden izole edilmelidir. Modern access point'ler bu özelliği destekler. Misafir ağındaki bir cihaz sunucularınızı bile göremez.

Detaylı network segmentasyonu için [kurumsal network kurulumu] yazımızı okuyun. 3. 1X kimlik doğrulama (kurumsal Wi-Fi modu).

Bu modda her çalışan kendi kullanıcı adı ve şifresiyle (genelde Active Directory hesabı) bağlanır. Hesap kapatıldığında Wi-Fi erişimi de otomatik kesilir. Hangi kullanıcının ne zaman bağlandığı loglanır.

). Kurulumu uzmanlık ister ama 30+ kullanıcılı bir ofis için kesinlikle gerekli. [Active Directory KOBİ rehberi] yazımız bu yapının temel taşını anlatır.

4. 1X Yoksa) Eğer kurumsal mod yoksa, en azından Wi-Fi şifresi düzenli değiştirilmeli.

### 5. SSID Yayınını Gizlemek mi? Hayır

Bazıları "SSID'yi gizlersek güvenlik artar" diyor. Yanlıştır. SSID gizleme güvenlik sağlamaz çünkü ağa bağlı her cihaz SSID'yi sürekli yayınlar — bir saldırgan basit bir araçla 30 saniyede tespit eder.

Üstelik gizli SSID'li cihazlar başka ortamlarda bu SSID'yi sürekli aramaya devam eder, fiziksel takip kolaylaşır. Gizlemeyin. 6.

MAC Filtreleme: Sahte Güvenlik "Sadece izin verilen MAC adresleri bağlanabilir" yapılandırması da güvenlik gibi görünür ama değildir. MAC adresleri spoof edilebilir. Saldırgan ağı dinler, izinli bir MAC adresi görür, kendi cihazını o MAC'e ayarlar, bağlanır.

MAC filtreleme yapacağınıza enerjiyi başka bir yere ayırın. 7. 5651 Sayılı Kanun Yükümlülüğü (Türkiye Özel) Türkiye'de bir önemli yasal yükümlülük: 5651 sayılı kanun, kamuya açık internet erişimi sağlayan yerlerin loglarını tutmasını şart koşar.

Bu kanun çoğu insanın sandığından daha geniş yorumlanır — bir kafedeki Wi-Fi'dan tutun, ofis misafir ağına kadar.

## Talep halinde otoritelere sunulabilmesi

Bu yükümlülük göz ardı edildiğinde idari para cezası gelebilir. Hotspot çözümleri (Antamedia, Cucumber, Yerel hotspot servisleri) bu yükümlülüğü yerine getirmenizi sağlar. 8.

### 9. Düzenli Firmware Güncelleme

Access point firmware'leri güvenlik yamaları içerir. Üreticiler bu yamaları çıkardığında uygulamak şart. Çoğu kurumsal sistem otomatik güncelleme sunar, bunu aktif edin.

10. İzleme "Wi-Fi'a kim bağlı şu an" sorusunun cevabını bilmelisiniz. Modern sistemler bir dashboard sunar.

Hiç görmediğiniz cihazlar varsa bu bir alarm sebebidir.

## Wi-Fi Güvenlik Denetimi

Mevcut Wi-Fi altyapınızı analiz ediyor, güvenlik açıklarını tespit ediyor, kurumsal yapıya geçiş için yol haritası çıkarıyoruz. 5651 uyumluluğu, segmentasyon ve kurumsal kimlik doğrulama dahil.

## Sonuç

Şirket Wi-Fi'ı çoğu KOBİ'nin en zayıf noktasıdır çünkü "çalışıyor" görünür ve unutulur. Ama kötü yapılandırılmış bir Wi-Fi, tüm siber güvenlik altyapınızın baypas edilmesi demek. WPA3, segmentasyon, kurumsal kimlik doğrulama, 5651 uyumlu hotspot — bunların hepsi bir KOBİ için ulaşılabilir adımlar.

Yatırım donanım için bir kerelik 30-100 bin TL civarı, yönetimi yıllık aboneliklerle birkaç bin liraya iner. Karşılığında şirket ağınızın güvenliği temelden farklılaşır.
