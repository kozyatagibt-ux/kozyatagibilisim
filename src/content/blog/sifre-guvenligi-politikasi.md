---
slug: "sifre-guvenligi-politikasi"
title: "Şirket Şifre Güvenliği Politikası: Oluşturma ve Uygulama Rehberi"
type: "cluster"
pillar: 2
url: "/blog/sifre-guvenligi-politikasi"
hedef_anahtar_kelime: "şirket şifre güvenliği politikası"
meta_description: "Şirketler için şifre güvenliği politikası rehberi: güçlü şifre kuralları, MFA zorunluluğu, parola yöneticisi, Active Directory politikaları."
kelime_sayisi: "1800"
pillar_linki: "/kobi-siber-guvenlik"
---

# Şirket Şifre Güvenliği Politikası: Oluşturma ve Uygulama Rehberi

Veri ihlallerinin büyük çoğunluğu zayıf veya çalınmış parolalardan kaynaklanır. Bir çalışanın "Ankara2026!" gibi tahmin edilebilir bir şifre kullanması, tüm şirket ağını tehlikeye atabilir. Şifre güvenliği politikası, bu riski minimize etmek için her şirketin oluşturması ve uygulaması gereken temel güvenlik belgesidir.

Bu rehberde güncel NIST standartlarına uygun bir şifre politikasının nasıl oluşturulacağını, MFA zorunluluğunun nasıl hayata geçirileceğini ve Active Directory üzerinden bu politikaların nasıl uygulanacağını adım adım ele alıyoruz.

## Güçlü Şifre Kuralları: NIST 2024 Yaklaşımı

Geleneksel şifre politikaları büyük harf, küçük harf, rakam ve özel karakter zorunluluğu getirirdi. Ancak NIST (National Institute of Standards and Technology) 2024 güncellemesiyle bu yaklaşımı tamamen değiştirdi. Yeni rehbere göre karmaşıklık kuralları yerine şifre uzunluğu ön plana çıkıyor.

### NIST 2024 Temel İlkeleri

- **Minimum 12 karakter zorunluluğu:** Kısa ama karmaşık şifreler yerine uzun şifreler tercih edilmeli. 8 karakterlik karmaşık bir şifre, 16 karakterlik basit bir cümleden çok daha kolay kırılır.
- **Karmaşıklık zorunluluğu kaldırıldı:** Büyük harf, özel karakter gibi zorunluluklar kullanıcıları tahmin edilebilir kalıplara iter. "Sifre123!" gibi şifreler teknik olarak karmaşıklık kurallarını karşılar ama güvenli değildir.
- **Düzenli şifre değişim zorunluluğu kaldırıldı:** 90 günde bir şifre değiştirme zorunluluğu, kullanıcıları şifre sonuna "1", "2", "3" eklemeye iter. Şifre yalnızca bir ihlal şüphesi olduğunda değiştirilmeli.
- **Passphrase kullanımı teşvik ediliyor:** "KediMasadaUyuyorSabahGuneşi" gibi hatırlanması kolay, kırılması zor cümleler en güvenli yaklaşımdır.
- **Sızdırılmış şifre kontrolü:** Yeni belirlenen şifreler, Have I Been Pwned gibi veritabanlarına karşı kontrol edilmeli.

### Kaçınılması Gereken Şifre Kalıpları

Türkiye'deki şirketlerde en sık karşılaşılan zayıf şifre kalıpları şunlardır:

- Şehir adı + yıl kombinasyonları: Istanbul2026, Ankara2025
- Şirket adı varyasyonları: Kozyatagi2026, FirmaAdi123
- Klavye dizilimleri: qwerty123, 123456789
- Kişisel bilgiler: doğum tarihi, plaka numarası, çocuk adı
- Mevsimsel kalıplar: Yaz2026, Bahar2025

Bu kalıpların tamamı saldırganların ilk denediği kombinasyonlardır. Şifre politikanız bu tür kalıpları açıkça yasaklamalıdır.

## MFA Zorunluluğu: İkinci Katman Güvenlik

Güçlü bir şifre tek başına yeterli değildir. Çok faktörlü kimlik doğrulama (MFA), şifreniz ele geçirilse bile hesabınızın korunmasını sağlar. MFA, şirket şifre güvenliği politikasının vazgeçilmez bir parçası olmalıdır.

### MFA Yöntemlerinin Karşılaştırması

| Yöntem | Güvenlik Seviyesi | Kullanım Kolaylığı | Maliyet |
|--------|-------------------|---------------------|---------|
| SMS doğrulama | Düşük | Çok kolay | Ücretsiz |
| Microsoft Authenticator | Yüksek | Kolay | Ücretsiz |
| Google Authenticator | Yüksek | Kolay | Ücretsiz |
| FIDO2 fiziksel anahtar | Çok yüksek | Orta | Anahtar başı 30-60 USD |
| Biyometrik (parmak izi) | Yüksek | Çok kolay | Cihaza bağlı |

SMS doğrulaması SIM swap saldırılarına karşı savunmasızdır ve artık önerilmemektedir. Minimum standart olarak authenticator uygulamaları zorunlu tutulmalı, yönetici hesapları ve kritik sistemler için FIDO2 anahtarları (YubiKey gibi) kullanılmalıdır.

### MFA Uygulanması Gereken Sistemler

- E-posta hesapları (Microsoft 365, Google Workspace)
- VPN bağlantıları
- Uzak masaüstü (RDP) erişimleri
- Yönetici panelleri ve admin hesapları
- Bulut depolama hizmetleri
- Muhasebe ve ERP sistemleri
- CRM uygulamaları

## Parola Yöneticisi Kullanımı

Ortalama bir çalışan 50'den fazla farklı hesap kullanır. Her hesap için benzersiz ve güçlü şifre hatırlamak insani olarak mümkün değildir. Parola yöneticileri bu sorunu çözer ve şifre güvenliği politikasının uygulanabilir olmasını sağlar.

### Kurumsal Parola Yöneticisi Seçenekleri

**Bitwarden Teams/Enterprise:** Açık kaynaklı altyapısı, self-hosted kurulum seçeneği ve uygun fiyatıyla KOBİ'ler için güçlü bir tercihtir. Kullanıcı başı aylık 4 USD'den başlar. Active Directory entegrasyonu destekler.

**1Password for Teams:** Kullanıcı dostu arayüzü ve güçlü paylaşım özellikleriyle öne çıkar. Ekip kasaları sayesinde departmanlar arasında güvenli şifre paylaşımı yapılabilir. Kullanıcı başı aylık 7.99 USD'den başlar.

Her iki platform da tarayıcı eklentileri, mobil uygulamalar ve masaüstü istemcileri sunar. Otomatik doldurma özelliği sayesinde çalışanlar şifrelerini yazma zahmetinden kurtulur ve phishing saldırılarına karşı da koruma sağlanır; çünkü parola yöneticisi yalnızca doğru alan adında şifreyi doldurur.

### Parola Yöneticisi Politika Kuralları

- Tüm çalışanlara kurumsal parola yöneticisi hesabı açılmalı
- Ana parola (master password) minimum 16 karakter olmalı
- Ana parola için MFA zorunlu tutulmalı
- Şirket şifreleri kişisel kasalarda değil, ekip kasalarında saklanmalı
- Ayrılan çalışanın hesabı derhal devre dışı bırakılmalı ve paylaştığı şifreler değiştirilmeli

## Active Directory GPO ile Şifre Politikası Uygulama

Windows tabanlı şirket ağlarında Active Directory Group Policy Object (GPO) kullanarak şifre politikalarını merkezi olarak yönetebilirsiniz. Bu sayede politika bir kez tanımlanır ve tüm kullanıcılara otomatik olarak uygulanır. [Active Directory hakkında detaylı bilgi için KOBİ rehberimize bakabilirsiniz.](/blog/active-directory-kobi-rehberi)

### Temel GPO Şifre Ayarları

- **Minimum Password Length:** 12 karakter olarak ayarlanmalı
- **Password History:** Son 24 şifrenin tekrar kullanımını engelleyin
- **Account Lockout Threshold:** 5 başarısız denemeden sonra hesap kilitlensin
- **Account Lockout Duration:** Minimum 30 dakika kilitli kalsın
- **Maximum Password Age:** NIST önerisi doğrultusunda 0 (süresiz) yapılabilir veya kurumsal tercihe göre 365 gün belirlenebilir

### Fine-Grained Password Policy

Active Directory 2008 ve sonrasında farklı kullanıcı grupları için farklı şifre politikaları tanımlanabilir. Örneğin:

- Standart kullanıcılar: minimum 12 karakter
- IT yöneticileri: minimum 16 karakter + FIDO2 zorunluluğu
- Servis hesapları: minimum 24 karakter, rastgele üretilmiş

## SSO (Single Sign-On) ile Şifre Yükünü Azaltma

SSO, çalışanların tek bir kimlik doğrulama ile birden fazla uygulamaya erişmesini sağlar. Bu yaklaşım hem güvenliği artırır hem de kullanıcı deneyimini iyileştirir.

### SSO'nun Şifre Güvenliğine Katkısı

- Çalışanların hatırlaması gereken şifre sayısı azalır
- Merkezi kimlik doğrulama sayesinde MFA tek noktadan uygulanır
- Çalışan ayrıldığında tek bir hesabın devre dışı bırakılması yeterli olur
- Şifre paylaşımı ihtiyacı ortadan kalkar

Microsoft Entra ID (eski adıyla Azure AD) veya Okta gibi platformlar, kurumsal SSO altyapısı için en yaygın tercihlerdir. Microsoft 365 kullanan şirketler için Entra ID doğal entegrasyon avantajı sunar.

## Sık Yapılan Şifre Güvenliği Hataları

Şifre politikası oluşturmak kadar, yaygın hataları bilmek ve önlemek de önemlidir.

### Paylaşılan Şifreler

Departman e-postası, ortak kullanılan yazılım lisansları veya sosyal medya hesapları için tek bir şifrenin herkes tarafından bilinmesi ciddi bir güvenlik açığıdır. Bir çalışan ayrıldığında bu şifreler değiştirilmezse, eski çalışan hala erişim sahibi olmaya devam eder.

Çözüm: Her kullanıcıya bireysel hesap açılmalı, paylaşılan hesaplar için parola yöneticisinin ekip kasası kullanılmalıdır.

### Fiziksel Güvenlik İhmalleri

Monitöre yapıştırılmış post-it üzerindeki şifreler, masa altına gizlenmiş şifre defterleri veya klavyenin altındaki notlar, teknik güvenlik önlemlerinin tamamını anlamsız kılar. Şifre politikası bu tür fiziksel depolama yöntemlerini açıkça yasaklamalıdır.

### Tarayıcıda Şifre Kaydetme

Chrome, Edge veya Firefox'un yerleşik şifre saklama özelliği bireysel kullanım için kabul edilebilir olsa da kurumsal ortamda yeterli güvenlik sağlamaz. Tarayıcı şifreleri genellikle cihaza erişimi olan herkes tarafından görüntülenebilir. GPO ile tarayıcı şifre kaydetme özelliği devre dışı bırakılmalı ve bunun yerine kurumsal parola yöneticisi zorunlu tutulmalıdır.

## Şifre İhlali Durumunda Ne Yapılmalı?

Bir şifrenin ele geçirildiği tespit edildiğinde veya şüphelenildiğinde hızlı hareket etmek gerekir. [E-posta hesabınızın hacklendiğini düşünüyorsanız acil eylem planımıza göz atın.](/blog/eposta-hesabim-hacklendi)

### Acil Müdahale Adımları

1. Ele geçirilen hesabın şifresi derhal değiştirilmeli
2. Aynı şifrenin kullanıldığı tüm hesaplar tespit edilip şifreleri değiştirilmeli
3. Hesabın MFA ayarları kontrol edilmeli; MFA yoksa hemen etkinleştirilmeli
4. Son oturum açma geçmişi incelenmeli; şüpheli erişimler belirlenmeli
5. Hesap üzerinden yapılan son işlemler (e-posta yönlendirme kuralları, dosya paylaşımları) kontrol edilmeli
6. Gerekli durumlarda tüm aktif oturumlar sonlandırılmalı
7. Olay, IT ekibine ve yöneticiye raporlanmalı

### Proaktif İzleme

Microsoft 365 veya Google Workspace yönetici panellerinden şüpheli oturum açma girişimlerini izleyebilir, coğrafi olarak anormal erişimlere otomatik uyarı kurabilirsiniz. Have I Been Pwned API entegrasyonu ile çalışan şifrelerinin sızdırılmış veritabanlarında olup olmadığını düzenli olarak kontrol edebilirsiniz.

## Şifre Politikası Uygulama Kontrol Listesi

Şirketinizde şifre güvenliği politikasını hayata geçirmek için aşağıdaki adımları takip edin:

- Mevcut şifre politikanızı gözden geçirin ve NIST 2024 standartlarına uyumlu hale getirin
- Minimum şifre uzunluğunu 12 karakter olarak belirleyin
- Tüm kritik sistemlerde MFA'yı zorunlu tutun
- Kurumsal bir parola yöneticisi seçin ve tüm çalışanlara dağıtın
- Active Directory GPO ayarlarını güncelleyin
- SSO entegrasyonunu mümkün olan tüm uygulamalar için yapılandırın
- Çalışanlara şifre güvenliği eğitimi verin
- Şifre ihlali müdahale prosedürünü yazılı hale getirin
- Üç ayda bir politika uyumluluğunu denetleyin

Şifre güvenliği, tek başına ele alınmaması gereken bir konudur. [Şüpheli bir bağlantıya tıkladığınızda ne yapmanız gerektiğini](/blog/supheli-linke-tikladim) ve genel siber güvenlik kontrol listenizi de gözden geçirmenizi öneriyoruz. Kapsamlı bir güvenlik yaklaşımı için tüm bu katmanların birlikte çalışması gerekir.
