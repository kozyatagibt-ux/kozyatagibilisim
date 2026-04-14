---
slug: "is-surekliligi-plani-rehberi"
title: "İş Sürekliliği Planı Nasıl Hazırlanır? KOBİ Rehberi"
type: "cluster"
pillar: 3
url: "/blog/is-surekliligi-plani-rehberi"
hedef_anahtar_kelime: "iş sürekliliği planı"
meta_description: "KOBİ'ler için iş sürekliliği planı hazırlama rehberi: BIA analizi, RTO/RPO belirleme, iletişim planı, test prosedürleri. İstanbul deprem riski dahil."
kelime_sayisi: "1800"
pillar_linki: "/sirket-veri-yedekleme"
---

# İş Sürekliliği Planı Nasıl Hazırlanır? KOBİ Rehberi

Sunucu çöktüğünde, internet kesildiğinde veya ofise ulaşılamadığında ne yaparsınız? Çoğu KOBİ bu sorunun cevabını ancak kriz anında aramaya başlar. Oysa iş sürekliliği planı (BCP - Business Continuity Plan), tam olarak bu anlarda devreye giren ve şirketinizi ayakta tutan bir kılavuz.

İstanbul'da faaliyet gösteren bir KOBİ iseniz, deprem riski tek başına bile bir BCP hazırlamanız için yeterli sebep. Ama deprem dışında da onlarca senaryo var: uzun süreli elektrik kesintileri, siber saldırılar, su baskını, kritik personelin ayrılması, tedarik zinciri kopması... Bu yazıda, karmaşık kurumsal metodolojileri KOBİ ölçeğine indirerek uygulanabilir bir iş sürekliliği planı nasıl hazırlanır anlatıyoruz.

## İş Sürekliliği Planı Nedir?

İş sürekliliği planı, bir kesinti veya felaket durumunda kritik iş fonksiyonlarının belirli bir süre içinde nasıl devam ettirileceğini ve normale nasıl döneceğini tanımlayan dokümante edilmiş bir strateji. Felaket kurtarma (DR) planından farkı, BCP'nin sadece IT sistemlerini değil, tüm iş süreçlerini kapsamasıdır.

Kısaca:
- **Felaket Kurtarma (DR):** Sistemleri tekrar çalışır hale getirme
- **İş Sürekliliği (BC):** Kesinti sırasında iş yapmaya devam etme

Her ikisi de gerekli, ancak BCP daha geniş bir çerçeve sunar.

## Adım 1: İş Etki Analizi (BIA - Business Impact Analysis)

BCP'nin temeli BIA'dır. Bu analiz, hangi iş fonksiyonlarının ne kadar kritik olduğunu ve kesintinin mali etkisini ortaya koyar.

### BIA Nasıl Yapılır?

Her departman ve iş fonksiyonu için şu soruları cevaplayın:

1. Bu fonksiyon durduğunda saatlik/günlük mali kayıp ne olur?
2. Müşteri kaybı riski var mı?
3. Yasal veya düzenleyici yaptırım riski var mı?
4. İtibar kaybı oluşur mu?
5. Bu fonksiyonun bağımlı olduğu sistemler ve kaynaklar neler?

### BIA Sonuç Tablosu Örneği

| İş Fonksiyonu | Kritiklik | Maks. Tolerans | Saatlik Kayıp | Bağımlılıklar |
|---|---|---|---|---|
| Sipariş alma/işleme | Kritik | 2 saat | ~5.000 TL | ERP, internet, telefon |
| E-posta iletişimi | Yüksek | 4 saat | ~2.000 TL | Mail sunucusu, internet |
| Muhasebe/finans | Yüksek | 1 iş günü | ~3.000 TL | Muhasebe yazılımı, veritabanı |
| Dosya paylaşımı | Orta | 1 iş günü | ~1.000 TL | Dosya sunucusu, NAS |
| Web sitesi | Orta | 4 saat | Değişken | Hosting, DNS |
| Üretim/depo | Kritik | 1 saat | ~10.000 TL | ERP, barkod sistemi, elektrik |

Bu tablo, kaynaklarınızı nereye öncelikli olarak ayırmanız gerektiğini net bir şekilde gösterir. Tüm sistemleri aynı anda korumaya çalışmak yerine, kritik fonksiyonlara odaklanmak KOBİ bütçeleri için çok daha gerçekçi.

## Adım 2: RTO ve RPO Belirleme

BIA sonuçlarını kullanarak her kritik sistem için iki temel metriği belirleyin:

**RTO (Recovery Time Objective):** Sistem ne kadar sürede tekrar çalışır hale gelmeli? Örneğin sipariş sisteminiz için RTO 2 saat ise, bir kesintiden sonra 2 saat içinde bu sistemi ayağa kaldırmanız gerekiyor.

**RPO (Recovery Point Objective):** Ne kadarlık veri kaybını tolere edebilirsiniz? RPO 1 saat ise, en fazla 1 saatlik veriyi kaybetmeyi kabul ediyorsunuz demektir. Bu, yedekleme sıklığınızı doğrudan belirler.

Bu kavramların detayları için [RTO ve RPO Nedir? KOBİ Rehberi](/blog/rto-rpo-nedir-kobi) yazımıza göz atabilirsiniz.

### Örnek RTO/RPO Matrisi

| Sistem | RTO | RPO | Yedekleme Yöntemi |
|---|---|---|---|
| E-posta (M365/Gmail) | 1 saat | 0 (anlık) | Bulut tabanlı, otomatik |
| ERP/muhasebe | 4 saat | 1 saat | Veritabanı replikasyonu + günlük yedek |
| Dosya sunucusu | 8 saat | 4 saat | NAS + bulut yedek |
| Web sitesi | 4 saat | 24 saat | Günlük yedek |

Yedekleme stratejinizi bu metriklere göre şekillendirin. [3-2-1 Yedekleme Kuralı](/blog/3-2-1-yedekleme-kurali) bu konuda temel bir çerçeve sunar.

## Adım 3: Risk Değerlendirmesi -- İstanbul Özelinde

İstanbul'da faaliyet gösteren bir KOBİ olarak karşı karşıya olduğunuz başlıca riskler:

### Deprem

İstanbul'da beklenen büyük deprem, iş sürekliliği planlamasında birincil risk faktörü. Değerlendirmeniz gereken konular:

- Bina yapısal dayanıklılığı ve deprem sigortası
- Sunucu ve ağ ekipmanlarının fiziksel sabitleme durumu (rack dolap sabitlenmesi, UPS bağlantıları)
- Alternatif çalışma lokasyonu (Anadolu yakasındaysanız Avrupa yakasında bir yedek nokta veya tam tersi)
- Uzaktan çalışma altyapısı (VPN, bulut erişimi, dizüstü bilgisayarlar)
- Personel ulaşım planı ve acil iletişim ağacı

### Elektrik Kesintileri

İstanbul'da özellikle yaz aylarında ve fırtına dönemlerinde uzun süreli elektrik kesintileri yaşanabiliyor. Hazırlıklarınız:

- UPS kapasitesi: Kritik sistemler için en az 30 dakika
- Jeneratör: 4+ saat kesintiler için (bina genelinde veya taşınabilir)
- Bulut tabanlı sistemlere geçiş: Elektrik gitse bile dizüstü bilgisayar + mobil internet ile çalışmaya devam

### Su Baskını

Özellikle zemin kat ve bodrum kat ofisler için risk taşıyan bir senaryo. Sunucu odanız bodrum kattaysa:

- Ekipmanları yerden en az 30 cm yüksekte konumlandırın
- Su sensörü ve alarm sistemi kurun
- Kritik verilerin bulut yedeğini mutlaka tutun

### Siber Saldırılar

Fidye yazılımı (ransomware), KOBİ'ler için giderek artan bir tehdit. Bir ransomware saldırısı tüm sistemlerinizi kilitleyebilir.

- Offline yedeklerin varlığı kritik (saldırganlar çevrimiçi yedekleri de şifreleyebilir)
- Olay müdahale planı hazırlanmalı
- Siber sigorta değerlendirilmeli

## Adım 4: İletişim Planı

Kriz anında en çok aksayan şey iletişimdir. Herkes birbirini arar, kimse net bilgiye ulaşamaz, karar vericilere erişilemez.

### İletişim Ağacı

Kriz durumunda kimin kimi arayacağını önceden belirleyin:

1. **Kriz yöneticisi (birincil):** Genel Müdür veya COO
2. **Kriz yöneticisi (yedek):** Operasyon Müdürü
3. **IT sorumlusu:** Teknik müdahaleyi koordine eder
4. **Departman yöneticileri:** Kendi ekiplerini bilgilendirir
5. **Dış iletişim:** Müşteriler, tedarikçiler, kamu kurumları

### İletişim Araçları Hiyerarşisi

Ofis telefonları ve e-posta çalışmayabilir. Alternatif kanalları belirleyin:

1. Cep telefonu (birincil)
2. WhatsApp veya Signal grubu (yedek)
3. SMS (internet olmadığında)
4. Fiziksel buluşma noktası (tüm iletişim kesildiğinde)

### Bilgilendirme Şablonları

Kriz anında düşünecek zaman olmaz. Hazır mesaj şablonları oluşturun:

- Personel bilgilendirme mesajı
- Müşteri bilgilendirme mesajı
- Tedarikçi bilgilendirme mesajı
- Sosyal medya açıklaması

## Adım 5: Kurtarma Stratejileri

Her risk senaryosu için somut kurtarma adımları belirleyin.

### Sunucu Çökmesi Senaryosu

1. Arızanın kapsamını tespit et (donanım mı, yazılım mı?)
2. Yedek sunucuyu devreye al veya bulut ortamında VM başlat
3. Son yedekten veri geri yükle
4. Servisleri sırayla başlat (veritabanı > uygulama > kullanıcı erişimi)
5. Veri bütünlüğünü kontrol et
6. Kullanıcıları bilgilendir

Bu konuda detaylı adımlar için [Sunucu Çöktü, Ne Yapılmalı?](/blog/sunucu-coktu-ne-yapilmali) yazımıza bakabilirsiniz.

### Ofise Erişilememe Senaryosu

1. Uzaktan çalışma planını aktifleştir
2. VPN ve bulut erişimini kontrol et
3. Kritik personelin dizüstü bilgisayar ve internet erişimini teyit et
4. Alternatif çalışma lokasyonunu devreye al
5. Müşterileri alternatif iletişim kanallarından bilgilendir

### Veri Kaybı Senaryosu

1. Kaybın kapsamını belirle
2. Yedeklerden geri yükleme başlat
3. Geri yükleme süresince alternatif iş akışı uygula
4. Geri yükleme tamamlandığında veri doğrulama yap
5. Kök neden analizi yap ve tekrarını önle

## Adım 6: BCP Şablon Taslağı

Aşağıdaki taslak, KOBİ ölçeğinde bir iş sürekliliği planının temel bölümlerini içerir:

### Plan Kapak Sayfası
- Plan sahibi ve onaylayan
- Versiyon numarası ve son güncelleme tarihi
- Dağıtım listesi

### Bölüm 1: Genel Bilgiler
- Planın amacı ve kapsamı
- Tanımlar ve kısaltmalar
- Plan aktivasyon kriterleri

### Bölüm 2: İş Etki Analizi Sonuçları
- Kritik iş fonksiyonları listesi
- RTO/RPO değerleri
- Bağımlılık haritası

### Bölüm 3: Risk Değerlendirmesi
- Tehdit ve risk matrisi
- Olasılık ve etki derecelendirmesi

### Bölüm 4: Kurtarma Stratejileri
- Senaryo bazlı kurtarma prosedürleri
- Kaynak gereksinimleri
- Alternatif çalışma düzenlemeleri

### Bölüm 5: İletişim Planı
- İletişim ağacı ve iletişim bilgileri
- Bilgilendirme şablonları
- Medya iletişim prosedürü

### Bölüm 6: Test ve Bakım
- Test takvimi
- Test senaryoları ve sonuç raporlama
- Plan güncelleme prosedürü

## Adım 7: Test Prosedürleri

Hiç test edilmemiş bir BCP, sadece kağıt üzerinde var demektir. Test etmediğiniz plan sizi korumaz.

### Test Türleri

**Masaüstü Tatbikat (Tabletop Exercise):** Ekip bir masa etrafında toplanır, varsayımsal bir senaryo üzerinden planı tartışır. Maliyetsiz, düşük riskli, her çeyrekte yapılabilir.

**Yedek Geri Yükleme Testi:** Gerçek yedeklerden geri yükleme yaparak süreyi ve başarıyı ölçün. Ayda bir yapılması önerilir.

**Kısmi Kesinti Simülasyonu:** Kontrollü ortamda bir sistemi kapatıp kurtarma prosedürünü uygulayın. Yılda iki kez yapılabilir.

**Tam Ölçekli Tatbikat:** Tüm şirketi kapsayan, gerçeğe yakın bir senaryo. Yılda bir kez yapılması yeterli.

### Test Takvimi Önerisi

| Test Türü | Sıklık | Süre | Katılımcılar |
|---|---|---|---|
| Masaüstü tatbikat | Her çeyrek | 2 saat | Yönetim + IT |
| Yedek geri yükleme | Aylık | 1-4 saat | IT ekibi |
| Kısmi kesinti sim. | 6 ayda bir | Yarım gün | IT + ilgili departman |
| Tam ölçekli tatbikat | Yılda bir | Tam gün | Tüm şirket |

### Test Sonrası

Her testten sonra:
- Süreleri kaydedin (gerçek RTO vs hedef RTO)
- Eksikleri ve aksaklıkları listeleyin
- Planı güncelleyin
- Bir sonraki test tarihini belirleyin

## Planın Güncel Tutulması

BCP yaşayan bir dokümandır. Şu durumlarda güncellenmesi gerekir:

- Yeni bir sistem veya uygulama devreye alındığında
- Personel değişikliğinde (özellikle kritik roller)
- Ofis taşındığında veya yeni şube açıldığında
- Test sonuçlarına göre eksik tespit edildiğinde
- Yılda en az bir kez rutin gözden geçirme

## Sonuç

İş sürekliliği planı, büyük kurumların lüksü değil, her ölçekte şirketin ihtiyacı. Hele İstanbul gibi doğal afet riski yüksek bir şehirde, plan olmadan çalışmak kumar oynamaktan farksız. Karmaşık olması gerekmiyor; yukarıdaki adımları takip ederek, birkaç hafta içinde uygulanabilir bir plan oluşturabilirsiniz.

Kozyatağı Bilişim olarak İstanbul'daki KOBİ'lere iş sürekliliği planı hazırlama, yedekleme stratejisi oluşturma ve felaket kurtarma altyapısı kurma konularında destek veriyoruz. Mevcut durumunuzu değerlendirmek ve riskleri minimize etmek için ücretsiz bir ön görüşme planlayabiliriz.
