---
slug: "siber-guvenlik-kontrol-listesi"
title: "KOBİ Siber Güvenlik Kontrol Listesi: 30 Adımda Şirketinizi Koruyun"
type: "cluster"
pillar: 2
url: "/blog/siber-guvenlik-kontrol-listesi"
hedef_anahtar_kelime: "siber güvenlik kontrol listesi"
meta_description: "KOBİ'ler için 30 adımlık siber güvenlik kontrol listesi. Acil, önemli ve ileri seviye güvenlik önlemleri ile şirketinizi siber tehditlere karşı koruyun."
kelime_sayisi: "1800"
pillar_linki: "/kobi-siber-guvenlik"
---

## KOBİ'ler Neden Hedef?

"Biz küçük bir firmayız, kim bize saldırır?" Bu cümleyi neredeyse her KOBİ'den duyarsınız. Gerçek çok farklı: siber saldırıların %43'ü küçük ve orta ölçekli işletmeleri hedef alır. Nedeni basit -- büyük şirketlerin aksine KOBİ'ler genellikle zayıf güvenlik altyapısına sahiptir ve saldırganlar bunu bilir.

Türkiye'de 2025 yılında KOBİ'lere yönelik fidye yazılımı saldırıları bir önceki yıla göre %65 arttı. Ortalama fidye talebi 500.000 TL'nin üzerine çıktı. Bunun yanında veri ihlali durumunda KVKK kapsamında 1.000.000 TL'ye kadar idari para cezası uygulanabiliyor.

Bu kontrol listesi, şirketinizin siber güvenlik durumunu değerlendirmenizi ve adım adım güçlendirmenizi sağlar. Maddeler, öncelik seviyelerine göre gruplandırılmıştır.

## Acil Seviye -- Hemen Yapılması Gerekenler

Bu maddeler temel güvenlik hijyenidir. Bunlar eksikse şirketiniz ciddi risk altındadır.

### 1. Kurumsal antivirüs/EDR çözümü kurun

Bireysel ücretsiz antivirüsler kurumsal ortam için yetersizdir. ESET Protect, Bitdefender GravityZone veya Microsoft Defender for Business gibi merkezi yönetimli çözümler kullanın. Tüm bilgisayarlarda aktif olduğunu doğrulayın.

### 2. Tüm sistemleri güncelleyin

Windows, Office, tarayıcılar ve tüm uygulamalar güncel olmalı. Güvenlik yamaları yayınlandıktan sonra en geç 72 saat içinde uygulanmalıdır. Otomatik güncellemeyi mümkünse aktif edin.

### 3. Güçlü parola politikası uygulayın

Minimum 12 karakter, büyük-küçük harf, rakam ve özel karakter zorunluluğu. "Sirket2026!" gibi tahmin edilebilir parolalar kabul edilmemelidir. Parola yöneticisi (Bitwarden, 1Password) kullanımını teşvik edin.

### 4. Çok faktörlü kimlik doğrulama (MFA) aktifleştirin

E-posta, VPN, uzak masaüstü ve bulut hizmetlerinde MFA olmazsa olmazdır. SMS yerine authenticator uygulaması (Microsoft Authenticator, Google Authenticator) tercih edin.

### 5. Firewall aktif ve yapılandırılmış olsun

Sadece modemdeki NAT yeterli değildir. [Kurumsal firewall](/blog/kucuk-sirket-firewall-kurulumu) kullanın: FortiGate, Sophos XGS, WatchGuard veya pfSense. Gereksiz portlar kapatılmış olmalı.

### 6. Yedekleme çalışıyor mu doğrulayın

Yedeklemenin var olması yetmez -- [geri yükleme testi](/blog/yedek-var-sanilir-yanilgisi) yapın. Son başarılı yedekleme tarihini kontrol edin. Yedekler fidye yazılımından korunaklı olmalı (offsite veya immutable).

### 7. E-posta güvenliğini yapılandırın

[SPF, DKIM ve DMARC](/blog/spf-dkim-dmarc-rehberi) kayıtlarını DNS'e ekleyin. Spam filtresi etkin olsun. Şüpheli ekleri otomatik engelleyin (.exe, .scr, .js uzantıları).

### 8. Eski/kullanılmayan hesapları kapatın

[Ayrılan çalışanların](/blog/calisan-ayrildiginda-it-sureci) tüm hesapları aynı gün devre dışı bırakılmalıdır. Üç aylık kullanıcı hesap denetimi yapın.

### 9. Admin yetkilerini sınırlandırın

Tüm çalışanlar admin yetkisiyle çalışmamalı. Standart kullanıcı hesapları kullanın, admin erişimini sadece IT personeline verin. Domain admin hesabı günlük işler için kullanılmamalıdır.

### 10. Temel güvenlik farkındalık eğitimi verin

Çalışanlara [phishing](/blog/eposta-phishing-engelleme) tanıma, şüpheli link ve eklere dikkat etme konusunda eğitim verin. Yılda en az 2 kez tekrarlayın.

## Önemli Seviye -- 30 Gün İçinde Tamamlanmalı

Acil maddeler kapatıldıktan sonra bu katman güvenliğinizi önemli ölçüde artırır.

### 11. Ağ segmentasyonu uygulayın

Sunucular, kullanıcılar, misafirler ve IoT cihazları farklı VLAN'larda olmalı. Böylece bir cihaz ele geçirilse bile saldırgan tüm ağa yayılamaz.

### 12. VPN kullanın

Uzaktan erişim için [kurumsal VPN](/blog/uzaktan-calisan-vpn-kurulumu) zorunlu olsun. WireGuard, OpenVPN veya IPsec tabanlı çözümler tercih edin. Split tunneling'den kaçının.

### 13. Disk şifreleme aktifleştirin

Tüm laptoplarda BitLocker (Windows) etkin olmalı. Cihaz çalınsa bile veriler okunamaz hale gelir.

### 14. Güvenlik loglarını merkezi olarak toplayın

Windows Event Log, firewall logları ve antivirüs logları merkezi bir noktada toplanmalı. Anormal aktiviteler (gece yarısı toplu dosya erişimi, başarısız giriş denemeleri) izlenmeli.

### 15. Uzak masaüstü (RDP) güvenliğini sağlayın

RDP doğrudan internete açık olmamalıdır. VPN arkasına alın, MFA ekleyin, NLA (Network Level Authentication) etkin olsun. Brute force koruması uygulayın.

### 16. Mobil cihaz yönetimi (MDM) kullanın

Şirket e-postasına erişen telefonlar ve tabletler yönetilmeli. Microsoft Intune veya benzeri bir MDM çözümü ile cihaz kaybolduğunda uzaktan silinebilmelidir.

### 17. Yedekleme 3-2-1 kuralına uygun olsun

[3 kopya, 2 farklı medya, 1 offsite](/blog/3-2-1-yedekleme-kurali). Bulut yedekleme çözümü ekleyin. Yedeklerin şifreli olduğundan emin olun.

### 18. DNS filtreleme uygulayın

Cisco Umbrella, Cloudflare Gateway veya pfBlockerNG ile zararlı sitelere erişimi engelleyin. Phishing ve malware dağıtan domainler otomatik bloklanır.

### 19. Yazıcı ve IoT cihaz güvenliği

Ağ yazıcıları, IP kameralar ve diğer IoT cihazları varsayılan parolalarla bırakılmamalıdır. Firmware güncellemeleri uygulanmalı. Ayrı VLAN'a alınmalıdır.

### 20. İç tehdit politikası oluşturun

USB ile veri çıkışı, kişisel bulut depolamaya yükleme, ekran görüntüsü alma gibi aktiviteler izlenmeli. DLP (Data Loss Prevention) kuralları belirlenmelidir.

## İleri Seviye -- 90 Gün İçinde Planlanmalı

Bu maddeler olgunlaşmış bir güvenlik yapısı oluşturur.

### 21. SIEM çözümü kurun

Security Information and Event Management sistemi tüm logları analiz eder ve korelasyon yapar. Wazuh (açık kaynak), Microsoft Sentinel veya Splunk gibi çözümler değerlendirilebilir. 50+ çalışanlı firmalar için önerilir.

### 22. Sızma testi (penetration test) yaptırın

Yılda en az 1 kez profesyonel sızma testi yaptırın. Hem dış hem iç testler yapılmalı. Bulunan açıklar raporlanmalı ve kapatılmalıdır.

### 23. Incident response planı hazırlayın

Bir siber saldırı olduğunda kim ne yapacak? İletişim zinciri, teknik müdahale adımları, yasal bildirimler -- hepsi yazılı ve test edilmiş olmalı.

### 24. E-posta sandbox çözümü kullanın

Gelen e-postalardaki ekleri sanal ortamda açarak zararlı olup olmadığını test eden sandbox çözümleri phishing saldırılarını ciddi ölçüde azaltır.

### 25. Ayrıcalıklı erişim yönetimi (PAM) uygulayın

Admin hesaplarının kullanımını izleyin, kayıt altına alın ve onay mekanizmasıyla kontrol edin. CyberArk, BeyondTrust veya açık kaynak çözümler değerlendirilebilir.

### 26. Zero Trust ağ mimarisi planlayın

"Güvenme, doğrula" prensibiyle her erişim isteğini kimlik, cihaz ve konum bazında değerlendirin. Aşamalı geçiş planı yapın.

### 27. Siber sigorta yaptırın

Türkiye'de siber sigorta ürünleri sunan şirketler artıyor. Fidye yazılımı, veri ihlali ve iş kesintisi kapsamı olan bir poliçe değerlendirin. Yıllık primi 20.000-80.000 TL arasında değişir.

### 28. KVKK uyumluluk denetimi yapın

[KVKK](/blog/kvkk-icin-nereden-baslamali) kapsamında teknik tedbirlerin alındığını belgeleyin. Veri ihlali bildirim prosedürünü test edin. VERBİS kaydınızı güncel tutun.

### 29. Güvenlik metrikleri izleyin

Aylık olarak takip edilmesi gereken metrikler: başarısız giriş denemesi sayısı, phishing e-posta tespit oranı, yama uygulama süresi, yedekleme başarı oranı, açık zafiyet sayısı.

### 30. Düzenli güvenlik tatbikatı yapın

Yılda 2 kez simüle phishing kampanyası, yılda 1 kez masa başı tatbikatı (tabletop exercise) yapın. [İş sürekliliği planınızı](/blog/is-surekliligi-plani-rehberi) test edin.

## Kontrol Listesi Özet Tablosu

| Seviye | Madde Sayısı | Tamamlanma Süresi | Bütçe (Yaklaşık) |
|--------|-------------|-------------------|-----------------|
| Acil | 10 madde | 1-7 gün | 15.000 - 40.000 TL |
| Önemli | 10 madde | 30 gün | 30.000 - 80.000 TL |
| İleri Seviye | 10 madde | 90 gün | 50.000 - 200.000 TL |
| **Toplam** | **30 madde** | **90 gün** | **95.000 - 320.000 TL** |

Bu bütçe büyük görünebilir, ancak tek bir fidye yazılımı saldırısının ortalama maliyetinin 500.000 TL'nin üzerinde olduğunu düşünün. Üstelik KVKK cezaları, itibar kaybı ve müşteri kaybı bu rakamın çok üzerindedir.

## Nereden Başlamalı?

Eğer bu listede "Acil" kategorisindeki maddelerden bile eksikleriniz varsa, hemen harekete geçmelisiniz. Adım adım ilerleyin:

1. Önce acil maddeleri 1 hafta içinde tamamlayın
2. Önemli maddeleri 1 ay içinde planlayıp uygulayın
3. İleri seviye maddeleri 3 aylık plan dahilinde hayata geçirin
4. Her 6 ayda bir bu listeyi tekrar gözden geçirin

Bu süreci kendi başınıza yönetmekte zorlanıyorsanız, profesyonel destek almak hem zamandan hem de paradan tasarruf sağlar. Kozyatagı Bilişim olarak KOBİ'lere özel siber güvenlik değerlendirmesi yapıyor, önceliklendirme ve uygulama desteği sunuyoruz. Ücretsiz güvenlik ön değerlendirmesi için bizimle iletişime geçebilirsiniz.
