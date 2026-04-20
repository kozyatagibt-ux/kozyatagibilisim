---
slug: msp-vs-kendi-it-personeli-tco-analizi
title: "MSP mi Yoksa Kendi IT Personeli mi? 50-200 Kişilik Şirket için TCO Analizi"
type: cluster
pillar: 1
url: "/blog/msp-vs-kendi-it-personeli-tco-analizi"
hedef_anahtar_kelime: "msp mi kendi it personeli mi"
meta_description: "50-200 kişilik Türk şirketinde dış kaynak IT (MSP) ile kendi bordrolu IT personeli karşılaştırması: gerçek TCO, gizli maliyet, kapsama boşluğu, hibrit model önerisi."
kelime_sayisi: "~2100"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Genel Müdür'e Aynı Soru: "Kendimize IT alalım mı?"

Her 6 ayda bir bir CFO veya Genel Müdür bize soruyor:

> "Ayda 45 bin TL ödüyoruz size. Bir IT elemanını bordroda tutsak 40 bin TL net alır, bize 55 bin TL maliyeti olur. Fark az. Kendimize alsak mı?"

Cevap basit değil. Reddit r/ITManagers ve r/msp'de bu tartışma haftalık çıkıyor. Aşağıda Türkiye gerçeğini yansıtan dürüst bir analiz bulacaksınız — hem MSP hem kendi personel tarafını savunan.

## 1. Doğru Sayıyı Karşılaştırın — "Maaş vs MSP Ücreti" Yanıltıcı

### Bordrolu IT personeli gerçek maliyet (2024 Türkiye)

Orta seviyede bir sistem yöneticisi (3-5 yıl deneyim):
- **Net maaş**: 40.000 TL
- **Brüt + işveren SGK + vergi**: ~65.000 TL/ay
- **Yıllık**: 65.000 × 12 = 780.000 TL
- **Ek maliyetler**:
  - İkramiye/performans: 2 maaş (130.000 TL/yıl)
  - Yol, yemek, sağlık sigortası, özel hayat sigortası: ~3.000 TL/ay × 12 = 36.000 TL
  - Eğitim (sertifika, konferans): 30.000 TL/yıl
  - Ekipman (laptop, telefon, lisanslar): 50.000 TL amortize
  - Ofis alanı (m² × TL): ~40.000 TL/yıl
  - İşe alım maliyeti (işe alma + oryantasyon): yıllık amortized ~15.000 TL
  - Yıllık izin + hastalık günleri (yaklaşık 25 gün): örtük kayıp ~70.000 TL iş değeri

**Gerçek toplam maliyet: ~1.150.000 TL / yıl = ~96.000 TL / ay**

### MSP (yönetilen IT hizmetleri) ücreti (aynı hizmet kapsamı)

100-150 kişilik şirket için full-managed paket:
- **Sabit aylık ücret**: 40.000-70.000 TL/ay (paketin kapsamına göre)
- **Yıllık ek bir şey yok** — ne eğitim, ne ekipman, ne ofis yeri
- **Gerçek toplam: ~60.000 TL/ay ortalama**

### Kabaca karşılaştırma

| | Bordrolu IT | MSP |
|---|---|---|
| Aylık maliyet | ~96.000 TL | ~60.000 TL |
| Yıllık | ~1.150.000 TL | ~720.000 TL |
| **Fark** | | **430.000 TL / yıl lehte MSP** |

"Biz ona ayda 55 bin TL ödüyoruz, o kadar" hesabı yanlış — **gerçek maliyet net maaşın ~2.4 katı**.

## 2. Ama Salt Para Karar Vermez — Kapsama Boşlukları

### Bordrolu tek IT personeli ne YAPAMAZ?

1. **Tatilde hastalanınca veya ayrılınca**: Tek kişilik IT = tek arıza noktası. 2 hafta tatilde sunucu çökerse şirket felç.
2. **Çok alanda uzmanlık**: Bir kişi firewall + sunucu + network + Exchange + endpoint + cloud + helpdesk + compliance + proje yönetimi — hepsine vakıf olamaz. Birinde derin, diğerlerinde yüzeysel kalır.
3. **Gece / hafta sonu acil durum**: "Cumartesi gece ransomware geldi" — bordrolu IT personeli müsait mi? Müsaitse mesai nasıl ücretlendirilecek?
4. **Vendor koordinasyonu**: Microsoft destek, Fortinet TAC, Veeam engineer — hepsiyle iletişim ayrı bir kanal. Bir kişi zor yürütür.
5. **Stratejik teknoloji kararları**: "Hangi firewall?" "Ne zaman cloud'a geçelim?" — tek kişi objektif kalamaz, kendi tercih önyargısıyla karar verir.

### MSP nede SINIRLI?

1. **Bizim kültürümüzün bir parçası değil**: Şirket kültürü, iç iletişim, resmi olmayan süreçleri MSP ancak dışarıdan gözlemleyebilir. Özellikle büyük projelerde bu dezavantaj.
2. **SLA dışında iş yok**: Sözleşmede yazmayan şeyi yaptırmak için ek fatura. Bordrolu personel "hadi hallet" diye yapar.
3. **Cevap süresi**: İyi MSP 15-30 dakika, ortalama 2-4 saat. Bordrolu personel 5 dakikada cevap verir (eğer müsaitse).
4. **Öncelik paylaşımı**: MSP 30 müşteriye hizmet veriyor — sizin kritik sorununuz başka müşterinin kritiğiyle yarışır.
5. **Küçük işler için overhead**: "Yazıcı kağıdı takma" için teknisyen çağırmak saçma görünür, oysa MSP'de bu dahildir.

## 3. Senaryoya Göre Seçim

### 30 kişi altı KOBİ → MSP net galip

Bir IT personeli "lüks". Yönetilen IT hizmeti 20-35 bin TL/ay bandında — çok daha ekonomik.

### 30-80 kişi → MSP hâlâ önde

Hibrit değer vermiyor; MSP'de tam kapsama, 35-55 bin TL/ay.

### 80-150 kişi → **En zor karar** (seçim burada)

Burada iki yaklaşım mantıklı:

**A) Tek IT + MSP backup**
- Bordroda 1 junior/mid IT (helpdesk + günlük iş)
- MSP "3. seviye destek + compliance + acil durum" rolü
- Maliyet: ~80 bin TL (bordro) + ~25 bin TL (MSP light paket) = ~105 bin TL/ay
- Kapsama: mükemmel

**B) Sadece MSP (full managed)**
- MSP tam kapsama + on-site günlük teknisyen (MSP'den)
- Maliyet: ~55-70 bin TL/ay
- Kapsama: çok iyi, ama "bizden değil" hissi olabilir

### 150-300 kişi → Hibrit şart

- Bordroda 1-2 IT (1 senior, 1 helpdesk)
- MSP: vendor koordinasyonu, compliance, projeler
- Maliyet: ~180-250 bin TL/ay
- Bordrolu ekip operasyonel, MSP stratejik

### 300+ kişi → Kendi IT ekibi

Yerli ekip 3-5 kişilik; MSP bazı özel alanlarda (SOC, compliance audit) kalır.

## 4. MSP Seçerken Nelere Dikkat?

### Kırmızı bayraklar

- **"Bizde 7/24 destek var"** diyorlar ama gece araması 24 saat sonra geri dönüyor — SLA'yi ve gerçek yanıt sürelerini yazılı sorun
- **Sabit fiyat + sınırsız ticket** çok mükemmel görünüyor — genelde gizli kısıt var
- **"Her şeyi biz yaparız"** → Hayır, MSP'nin ne yapmayacağını da net yazılı görmek lazım
- **Referans vermeye çekingenler** — iyi MSP 5-10 müşteri ismi verip arayabilmenizi sağlar
- **Teknisyen turnover yüksekse** — sizle bir yıl çalışan teknisyen gidip yerine yenisi geldiğinde tekrar işiniz baştan tanıtılır

### Doğru sorular

1. **"İlk müdahale SLA'nız ne? Peki ulaşılabilirlik %99 olduğunda ödül/ceza var mı?"** — Gerçek MSP SLA'ye sadık, düşüş olursa faturadan düşer
2. **"Sözleşmede sayılan işler ve sayılmayan işler listesi nerede?"** — Şeffaf MSP listeyi gösterir
3. **"Benim şirketimin tipine benzer müşterileriniz kim, kaç yıldır çalışıyorsunuz?"** — Sektörel deneyim önemli
4. **"Bir Cuma akşam saat 21:00'de kritik bir sorun olursa kim açar?"** — Gerçek cevap: kişinin adı, numarası, deneyimi
5. **"Çıkış stratejisi nedir? Bitirmek isteyince ne olur?"** — Sözleşme bitiminde tüm dokümantasyon, credential'lar size teslim edilmeli

## 5. Bordrolu IT Alırken Nelere Dikkat?

### Kırmızı bayraklar

- **CV'de çok sertifika var ama derin tecrübe yok** — sertifika kendi başına yetersiz, hands-on proje sor
- **"Her şeyi bilirim"** diyen aday — bir kişi gerçekten her şeyi yapamaz, dürüst adaylar sınırlarını söyler
- **İletişim beceri zayıf** — teknik iyi olsa bile kullanıcılarla anlaşamıyorsa sorun çıkar
- **Maaş beklentisi piyasa çok altında** — ya deneyim az ya motivasyon geçici (6 ay sonra başka iş)

### Doğru yaklaşım

- **Pozisyonu net tanımla**: "sistem yöneticisi" çok geniş. Firewall + sunucu + cloud mu, yoksa helpdesk + basit işler mi?
- **3-5 yıl deneyim** orta ölçekte ideal — junior çok uğraş, senior "bu şirkete neden geldim?"
- **Sertifika + tecrübe dengesi**: Microsoft MCSA/AZ-104, Fortinet NSE4, CompTIA Security+ orta seviye için iyi
- **Probation dönemi uzat**: 6 ay pratik gözlem — 2 aylık deneme ile yeterince anlayamazsın
- **Backup plan**: O bir gün ayrılacak. Dokümantasyon zorunlu olmalı

## 6. Kendi IT + MSP Hibrit Modeli (En Önerdiğim)

80-200 kişi arasındaki çoğu orta ölçekli şirket için optimum çözüm:

### Bordroda 1 IT Manager (mid-level)
- Günlük operasyon, helpdesk, küçük projeler
- Şirket kültürünün parçası, uzun dönemli ilişki
- MSP ile iş birliği kurar, koordinasyon sağlar

### MSP "stratejik ortak" rolünde
- **Compliance ve denetim**: KVKK, ISO 27001, SOC 2 hazırlık
- **Büyük projeler**: Firewall değişimi, cloud migration, AD tasarımı
- **Vendor koordinasyonu**: Microsoft, Fortinet, Veeam ile escalation
- **Backup kapasitesi**: IT personeli tatile çıktığında 7/24 destek devreye girer
- **Security operations**: SIEM izleme, tehdit avcılığı — iç IT ekibi için çok ihtisas

### Toplam maliyet (120 kişi örneği)
- Bordrolu IT Manager: ~90 bin TL/ay (full maliyet)
- MSP co-managed paket: ~25-35 bin TL/ay
- **Toplam: ~120 bin TL/ay**
- **Karşılaştırma**:
  - Sadece 2 bordrolu IT: ~160 bin TL
  - Sadece full-managed MSP: ~60 bin TL (ama "şirket içi birinin yokluğu" hissi)

Hibrit model pahalı değil — 60 bin TL fazla, ama kapsama ve kültür birleşimi en güçlüsü.

## 7. Karar Matrisi — Tek Sayfalık Özet

| Faktör | Ağırlık | Bordrolu | MSP | Hibrit |
|---|---|---|---|---|
| Maliyet | Orta | Düşük puan | Yüksek | Orta |
| Kapsama (7/24) | Yüksek | Orta | Yüksek | Yüksek |
| Çok alan uzmanlık | Yüksek | Düşük | Yüksek | Yüksek |
| Şirket kültürü uyum | Orta | Yüksek | Düşük | Yüksek |
| Risk (tek kişi ayrılırsa) | Yüksek | Düşük | Yüksek | Yüksek |
| Stratejik proje kapasitesi | Orta | Düşük | Yüksek | Yüksek |
| Küçük işler için esneklik | Düşük | Yüksek | Orta | Yüksek |
| Compliance ve denetim | Duruma göre | Orta | Yüksek | Yüksek |

## Sonuç

- **< 30 kişi**: Sadece MSP
- **30-80 kişi**: MSP öncelikli, iç IT lüks
- **80-200 kişi**: Hibrit en güçlü (1 iç IT + MSP)
- **200+ kişi**: Kendi ekip + MSP niş alanlarda

**En yaygın hata**: 60 kişilik bir şirketin "biz büyüdük, kendi IT'mizi alalım" diye tek IT alıp MSP'yi bitirmesi. 3 ay sonra personel tatile çıktığında veya ayrıldığında kaos yaşar — ve geri MSP aranır.

---

**Kendi şirketinize uygun modeli ücretsiz keşif görüşmesinde birlikte değerlendirelim.** Kozyatağı Bilişim olarak hem full-managed hem co-managed (hibrit) modellerde hizmet veriyoruz. 30 dakikalık görüşmede mevcut yapınıza uygun çözümü objektif öneriyoruz — bazen "size bordrolu IT daha uygun" dediğimiz de oluyor.
