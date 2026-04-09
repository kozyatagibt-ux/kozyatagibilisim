---
slug: eposta-phishing-engelleme
title: "E-posta Phishing Saldırılarını Engelleme: Pratik Rehber"
type: cluster
pillar: 2
url: "/blog/eposta-phishing-engelleme"
hedef_anahtar_kelime: "e-posta phishing nasıl engellenir"
meta_description: "E-posta phishing saldırılarına karşı şirketinizi nasıl korursunuz? Teknik ve kullanıcı önlemleri için pratik rehber."
kelime_sayisi: "~1900"
pillar_linki: "/kobi-siber-guvenlik, /blog/spf-dkim-dmarc-rehberi"
---

## Phishing Hâlâ Numara Bir Tehdit

Tüm güvenlik ihlallerinin önemli bir kısmı bir phishing e-postası ile başlar. Bu istatistik son 10 yıldır neredeyse hiç değişmedi. Sebep basit: çalışmaya devam ediyor.

Saldırgan için phishing en ucuz, en kolay, en yüksek başarı oranlı saldırı yöntemidir. Bir e-posta yazarsınız, binlerce hedefe gönderirsiniz, içlerinden birkaç tanesi tıklar, oltaya geldi. Bu yazıda phishing'i engellemek için iki katmanı anlatıyoruz: teknik katman (e-postanın ulaşmasını engelleme veya zararsızlaştırma) ve insan katmanı (ulaşırsa fark etme).

Phishing Türleri Klasik phishing: Genel toplu e-posta — banka, kargo, fatura sahteleri Spear phishing: Belirli bir kişiye veya şirkete özel hazırlanmış Whaling: Yöneticileri hedef alan üst düzey phishing BEC (Business Email Compromise): İş e-postası taklidi, ödeme sahteciliği Clone phishing: Gerçek bir e-postanın birebir kopyası, içine zararlı link eklenmiş Vishing: Telefonla arama (e-posta + çağrı kombinasyonu) Smishing: SMS üzerinden phishing Teknik Katman: E-posta Güvenlik Yapılandırması 1. SPF, DKIM, DMARC Bu üç DNS kaydı olmadan e-posta güvenliğiniz yarımdır. Birileri sizin alan adınızı kullanarak sahte e-posta gönderebilir.

Detaylı kurulum [SPF DKIM DMARC rehberi] yazımızda.

### 2. Spam ve Phishing Filtreleri

Office 365 ve Google Workspace'in dahili filtreleri vardır ama bazı phishing'ler bunları geçer. Daha güçlü çözümler için Mimecast, Proofpoint, Barracuda Sentinel gibi ek katmanlar kullanılabilir.

### 3. Sandbox Analizi

E-posta ekleri otomatik olarak sandbox ortamında çalıştırılıp davranışları gözlemlenir. Zararlı davranış tespit edilirse engellenir. Modern e-posta güvenlik ürünleri bu özelliği sunar.

4. URL Yeniden Yazımı (Time-of-Click Protection) E-postadaki linkler güvenlik servisinin proxy'si üzerinden geçer. Tıklandığı anda link yeniden kontrol edilir — e-posta gönderildiğinde temiz ama sonradan zararlı hale gelmiş siteler tespit edilir.

### 5. Display Name Spoofing Koruması

"Ahmet Yılmaz " gibi sahte gönderici adı kullanan e-postaları tespit etme. Birçok BEC saldırısı bu yöntemi kullanır.

### 6. Anti-Spoofing Kuralları

Şirket içi gibi görünen ama dışarıdan gelen e-postaları işaretleme. "Bu e-posta dış kaynaklı" uyarısı bile çalışanın dikkatini artırır. İnsan Katmanı: Çalışan Eğitimi Tüm teknik filtrelerden geçen bir e-posta çalışana ulaşır.

O an çalışanın eğitimi belirleyicidir. tr) Beklenmedik bir ek dosya Linkin üstüne fareyi getirince beklenmedik URL Genel hitap: "Sayın müşterimiz" yerine isim kullanılmaması Şifre, kart numarası, kimlik bilgisi isteyen mesaj Şüpheliyse Ne Yapmalı? Linke tıklamayın, eki açmayın E-postayı doğrudan IT ekibine iletin (yönlendirme butonu) Bir banka, kurum veya şirketin gerçekten yazıp yazmadığını şüpheniz varsa onu telefonla arayın (e- postadaki numarayı değil!)

## Simüle Phishing Testleri

Çalışanlara teorik eğitim yetersizdir. Pratik gerekir. Simüle phishing test platformları (KnowBe4, Proofpoint Security Awareness, Cofense) çalışanlara sahte phishing e-postaları gönderir.

Tıklayanlara anında "bu bir test, dikkat et!" eğitim mesajı çıkar. Bu pratik öğrenme klasik eğitimden çok daha etkilidir.

Simüle test sonuçları zamanla iyileşir: ilk testte %30 çalışan tıklarken, 6 ay sonra %5'in altına iner. Bu KOBİ için ölçülebilir bir güvenlik geliştirmesidir. BEC Özel Önlemler BEC saldırıları en pahalıya patlayanlardır.

Özel önlemler gerekir: İkili onay: Belirli bir tutarın üzerindeki ödemeler iki yöneticinin onayı gerektirsin Sözel doğrulama: Hesap değişikliği veya yüksek tutarlı ödemelerde mutlaka telefonla doğrulama Bilinen iletişim kanalı: Yöneticinin "yeni numara" diye söylediği numarayı kullanmayın, eski bilinen numarayı arayın Banka hesabı değişikliği prosedürü: Tedarikçinin banka hesabı değişti diye gelen e-postaya inanmayın, mutlaka eski iletişim üzerinden doğrulayın E-posta Güvenliğinizi Test Edin Mevcut e-posta yapılandırmanızı (SPF, DKIM, DMARC, filtre kalitesi) ücretsiz kontrol ediyoruz. Şirketinize simüle phishing testi de yapabiliyoruz. İletişime geçin.

## Sonuç

Phishing'i tamamen engellemek mümkün değildir — saldırganlar sürekli yeni yöntemler bulur. Ama doğru teknik katmanlar + iyi eğitilmiş çalışanlar kombinasyonu ile başarılı saldırı oranını dramatik şekilde düşürebilirsiniz. Bu yatırım hem doğrudan finansal kayıpları (BEC dolandırıcılığı), hem de dolaylı ihlal maliyetlerini (ransomware başlangıcı) önler.
