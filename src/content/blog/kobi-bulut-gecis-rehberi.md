---
slug: "kobi-bulut-gecis-rehberi"
title: "KOBİ Bulut Geçiş Rehberi: Adım Adım Cloud Migration"
type: "cluster"
pillar: 1
url: "/blog/kobi-bulut-gecis-rehberi"
hedef_anahtar_kelime: "bulut geçiş rehberi KOBİ"
meta_description: "KOBİ'ler için bulut geçiş rehberi: değerlendirme, planlama, pilot, migration ve optimizasyon adımları. Microsoft 365, Azure, AWS geçiş süreçleri."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

# KOBİ Bulut Geçiş Rehberi: Adım Adım Cloud Migration

Fiziksel sunucuların bakım maliyetleri, lisans yenileme derdi, klima arızasında sunucu odasının kavrulması... Bunları yaşayan her KOBİ sahibi bir noktada "buluta geçsek mi?" sorusunu soruyor. Cevap çoğu zaman evet -- ama nasıl geçeceğiniz, geçişin kendisi kadar kritik.

Bu rehberde, 10-100 çalışanlı şirketler için bulut geçiş sürecini beş somut adımda ele alıyoruz. Amacımız, teknik jargona boğulmadan gerçekçi bir yol haritası çizmek.

## Neden Buluta Geçmeli?

Bulut geçişi sadece bir trend değil, operasyonel bir zorunluluk haline geldi. Yerinde (on-premise) altyapı ile bulut hizmetlerini karşılaştırdığımızda tablo oldukça net:

| Kriter | Yerinde (On-Premise) | Bulut (Cloud) |
|---|---|---|
| Başlangıç maliyeti | Yüksek (sunucu, lisans, kurulum) | Düşük (aylık abonelik) |
| Ölçeklenebilirlik | Haftalarca sürebilir | Dakikalar içinde |
| Bakım sorumluluğu | Tamamen sizde | Sağlayıcıda |
| Felaket kurtarma | Ayrı yatırım gerektirir | Genellikle dahil |
| Uzaktan erişim | VPN kurulumu şart | Varsayılan olarak mevcut |
| Güncelleme yönetimi | Manuel takip | Otomatik |
| Elektrik/soğutma gideri | Aylık sabit maliyet | Sıfır |
| Uptime garantisi | Kendi imkanlarınıza bağlı | SLA ile garanti (%99,9+) |

Tablodan da görüldüğü gibi, özellikle 50 kişinin altındaki şirketler için bulut çoğu senaryoda daha avantajlı. Ancak her iş yükü buluta uygun olmayabilir; bu yüzden değerlendirme aşaması kritik.

## Adım 1: Mevcut Durumu Değerlendirme (Assessment)

Bulut geçişine başlamadan önce elinizdekileri tam olarak bilmeniz gerekiyor. Bu aşamada yapmanız gerekenler:

### Envanter Çıkarma

- Kaç fiziksel sunucu var, hangi işletim sistemlerini kullanıyor?
- Hangi uygulamalar sunucu üzerinde çalışıyor (ERP, muhasebe yazılımı, dosya paylaşımı)?
- Toplam veri hacmi ne kadar? Hangi veriler aktif, hangileri arşiv?
- Mevcut yedekleme düzeniniz ne durumda?

### Bağımlılık Haritası

Uygulamalar arasındaki bağımlılıkları çıkarmak şart. Örneğin muhasebe yazılımınız yerel bir SQL Server veritabanına bağlıysa, bu veritabanını taşımadan yazılımı buluta alamazsınız.

### Maliyet Analizi

Mevcut altyapının yıllık toplam sahip olma maliyetini (TCO) hesaplayın: sunucu amortismanı, elektrik, soğutma, IT personeli zamanı, lisanslar. Bu rakamı bulut abonelik maliyetiyle karşılaştırmanız, yönetim kuruluna sunum yapmanız için kritik.

Yerel depolama ile bulut arasındaki farkları detaylıca incelemek için [NAS mı, Bulut Depolama mı?](/blog/nas-mi-bulut-depolama-mi) yazımıza göz atabilirsiniz.

## Adım 2: Planlama ve Strateji Belirleme

Değerlendirme tamamlandıktan sonra hangi geçiş stratejisini uygulayacağınıza karar vermeniz gerekiyor.

### Geçiş Stratejileri

**Lift & Shift (Yeniden Barındırma):** Mevcut sistemi olduğu gibi buluta taşımak. En hızlı yöntem ama bulutun tüm avantajlarından yararlanamayabilirsiniz. Eski bir Windows Server'ı Azure VM olarak ayağa kaldırmak buna örnek.

**Yeniden Platform Oluşturma (Re-platform):** Uygulamayı küçük değişikliklerle bulut servislerine uyarlamak. SQL Server'ı Azure SQL Database'e taşımak gibi.

**SaaS'a Geçiş:** Uygulamayı tamamen bulut tabanlı bir alternatifle değiştirmek. Yerel Exchange sunucusundan Microsoft 365'e geçmek veya yerel dosya sunucusundan Google Workspace'e geçmek buna örnek.

### Platform Seçimi

Türkiye'deki KOBİ'ler için en yaygın seçenekler:

- **Microsoft 365:** E-posta, dosya paylaşımı, Teams, SharePoint. Office uygulamalarını yoğun kullanan şirketler için ideal.
- **Google Workspace:** Gmail, Drive, Meet, Docs. Ekip işbirliği ağırlıklı, web tabanlı çalışmayı tercih eden şirketler için uygun.
- **Microsoft Azure:** Sunucu iş yüklerini (VM, veritabanı, uygulama) taşımak için. Türkiye bölgesi mevcut.
- **AWS:** Geniş servis yelpazesi, esnek fiyatlandırma. Daha teknik ekiplere sahip firmalar için.

Hangi platformun size uygun olduğuna karar verirken [Office 365 vs Google Workspace karşılaştırmamızı](/blog/microsoft-365-vs-google-workspace-kurumsal) incelemenizi öneriyoruz.

### Zaman Çizelgesi Oluşturma

Gerçekçi olun. 20 kişilik bir ofis için tipik bir geçiş süreci:

- Değerlendirme: 1-2 hafta
- Planlama: 1 hafta
- Pilot: 2 hafta
- Tam geçiş: 2-4 hafta
- Optimizasyon: Sürekli

Toplamda 2-3 aylık bir süre öngörmeniz sağlıklı olacaktır.

## Adım 3: Pilot Proje ile Başlama

Tüm şirketi bir anda buluta taşımak en sık yapılan hatalardan biridir. Bunun yerine küçük bir grupla başlayın.

### Pilot İçin Uygun Alanlar

- IT departmanı veya teknik ekip (sorunları daha hızlı tespit eder)
- E-posta geçişi (en düşük riskli, en yüksek görünürlüklü alan)
- Dosya paylaşımı (OneDrive veya Google Drive ile başlamak)

### Pilot Sürecinde Dikkat Edilecekler

- Kullanıcılardan düzenli geri bildirim toplayın
- Performans metriklerini ölçün (erişim hızı, indirme süreleri)
- Güvenlik yapılandırmalarını test edin (MFA, koşullu erişim)
- Yedekleme ve geri yükleme senaryolarını mutlaka deneyin

Pilot projeden çıkan dersler, tam geçiş planınızı şekillendirecek. Bir sorun çıkarsa 5 kişiyi etkiler, 50 kişiyi değil.

## Adım 4: Tam Geçiş (Migration Execution)

Pilot başarıyla tamamlandıktan sonra kalan departmanları sırayla geçirme zamanı.

### E-posta Geçişi

Microsoft 365'e geçiş yapıyorsanız:

1. DNS MX kayıtlarını hazırlayın (ama henüz değiştirmeyin)
2. Kullanıcı hesaplarını oluşturun ve lisans atayın
3. Mevcut posta kutularını migration aracıyla aktarın
4. Test edin -- hem gelen hem giden posta akışını kontrol edin
5. DNS kayıtlarını güncelleyin
6. SPF, DKIM ve DMARC kayıtlarını yapılandırın

E-posta güvenlik ayarları hakkında detaylı bilgi için [SPF, DKIM, DMARC rehberimize](/blog/spf-dkim-dmarc-rehberi) başvurabilirsiniz.

### Dosya Geçişi

- Dosyaları taşımadan önce temizlik yapın: gereksiz dosyaları silin, klasör yapısını sadeleştirin
- Büyük veri hacimlerinde geceleri transfer yapın (bant genişliğini verimli kullanmak için)
- İzin yapısını (permissions) önceden planlayın
- Taşıma sonrası dosya bütünlüğünü kontrol edin

### Uygulama Geçişi

- Veritabanı uygulamalarını taşırken önce veritabanını, sonra uygulama katmanını taşıyın
- Bağımlı servislerin çalışır durumda olduğundan emin olun
- Geçiş penceresi boyunca eski sistemi de açık tutun (geri dönüş planı)

### Yedekleme Stratejisi

Geçiş sırasında mutlaka 3-2-1 yedekleme kuralını uygulayın: 3 kopya, 2 farklı medya, 1 offsite. Geçiş öncesi tam bir yedek almadan kesinlikle başlamayın. Detaylar için [3-2-1 Yedekleme Kuralı](/blog/3-2-1-yedekleme-kurali) yazımıza bakın.

## Adım 5: Geçiş Sonrası Optimizasyon

Geçiş tamamlandı diye iş bitmiyor. İlk 90 gün kritik bir dönem.

### Performans İzleme

- Kullanıcı şikayetlerini sistematik olarak takip edin
- Bulut kaynak kullanımını izleyin (gereksiz VM'leri veya fazla kapasiteyi tespit edin)
- Maliyet optimizasyonu yapın (kullanmadığınız kaynakları kapatın, reserved instance fırsatlarını değerlendirin)

### Güvenlik Sıkılaştırma

- Tüm kullanıcılar için çok faktörlü kimlik doğrulamayı (MFA) aktifleştirin
- Koşullu erişim politikalarını yapılandırın
- Veri kaybı önleme (DLP) kurallarını tanımlayın
- Düzenli güvenlik denetimleri planlayın

### Kullanıcı Eğitimi

Teknoloji değiştiğinde insanların da değişmesi gerekiyor. Eğitim olmadan yapılan geçişlerde verimlilik düşüşü kaçınılmaz. Departman bazlı, kısa ve uygulamalı eğitimler planlayın.

## Sık Yapılan Bulut Geçiş Hataları

Yıllar içinde gördüğümüz en yaygın hatalar:

**1. Yedekleri test etmeden geçişe başlamak:** Yedek almak yeterli değil, geri yükleme testini mutlaka yapın. "Yedeğimiz var" deyip geçiş sırasında yedeğin bozuk olduğunu keşfeden şirketler gördük.

**2. Personeli eğitmemek:** Yeni sistemi tanıtmadan geçiş yapmak, kullanıcı direncini artırır. İlk hafta help desk çağrıları ikiye, hatta üçe katlanır.

**3. Her şeyi tek seferde taşımak:** Aşamalı geçiş yerine "big bang" yaklaşımı tercih etmek risklidir. Bir sorun çıktığında tüm şirket etkilenir.

**4. Eski sistemi erken kapatmak:** Geçiş sonrası en az 30 gün eski sistemi çalışır durumda tutun. Geri dönüş planı hayat kurtarır.

**5. Bant genişliğini hesaplamamak:** 50 kişi aynı anda bulut üzerinden çalışmaya başladığında mevcut internet hattınız yeterli olmayabilir. Geçiş öncesi internet altyapınızı değerlendirin.

**6. Maliyet projeksiyonunu yapmamak:** İlk ay faturası geldiğinde sürprizle karşılaşmamak için detaylı maliyet hesabı yapın. Özellikle Azure ve AWS'de kaynak kullanım maliyetleri hızla artabilir.

## Hangi İş Yükleri Buluta Uygun, Hangileri Değil?

### Buluta Uygun

- E-posta ve ofis uygulamaları
- Dosya paylaşımı ve işbirliği
- CRM ve proje yönetimi araçları
- Yedekleme ve felaket kurtarma
- Web uygulamaları ve API'ler

### Dikkatle Değerlendirilmeli

- Yüksek bant genişliği gerektiren uygulamalar (video düzenleme, CAD)
- Yasal zorunluluk nedeniyle verilerin Türkiye'de kalması gereken iş yükleri
- Çok düşük gecikme süresi (latency) gerektiren endüstriyel sistemler
- Lisans modeli bulut ortamına uygun olmayan eski yazılımlar

## Sonuç

Bulut geçişi, doğru planlandığında KOBİ'ler için ciddi bir rekabet avantajı sağlar. Önemli olan acele etmemek, aşamalı ilerlemek ve her adımda test etmek. "Geçiş yaptık, bitti" diye düşünmek yerine sürekli optimizasyon yaklaşımını benimsemek gerekiyor.

Kozyatağı Bilişim olarak İstanbul'daki KOBİ'lere bulut geçiş süreçlerinde uçtan uca destek veriyoruz. Mevcut altyapınızın değerlendirmesinden pilot projeye, tam geçişten eğitime kadar her aşamada yanınızdayız. Ücretsiz ön değerlendirme görüşmesi için bizimle iletişime geçebilirsiniz.
