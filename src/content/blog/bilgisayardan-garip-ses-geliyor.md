---
slug: bilgisayardan-garip-ses-geliyor
title: "Bilgisayardan Garip Sesler Geliyor: Hangi Ses Neyin Habercisi?"
type: cluster
pillar: 9
url: "/blog/bilgisayardan-garip-ses-geliyor"
hedef_anahtar_kelime: "bilgisayar ses yapıyor"
meta_title: "Bilgisayardan Garip Ses Geliyor — Hangi Ses Ne Anlama Gelir 2026 | Kozyatağı Bilişim"
meta_description: "Bilgisayarınızdan tıkırtı, vızıltı veya çığlık sesi mi geliyor? Her sesin anlamı farklı. Hangi ses ne anlama gelir ve ne yapmalısınız?"
kelime_sayisi: "~1500"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Ofiste sessizce çalışırken bilgisayarınızdan daha önce duymadığınız bir ses gelmeye başladı. Belki tıkırtı, belki vızıltı, belki de ince bir çığlık sesi. "Acaba normal mi yoksa bir şey mi bozuluyor?" diye düşünüyorsunuz. Bu sorunun cevabı tamamen sesin türüne bağlı. Bazı sesler tamamen zararsızdır ve görmezden gelebilirsiniz. Bazıları ise acil müdahale gerektirir ve ertelemeniz durumunda veri kaybına uğrayabilirsiniz. Bu rehberde bilgisayardan gelen her ses türünü, ne anlama geldiğini ve ne yapmanız gerektiğini anlatacağız.

## Tıkırtı veya Tıklama Sesi (Sabit Diskten)

**Aciliyet: Kritik**

Bilgisayarınızdan ritmik bir tıkırtı sesi geliyorsa ve bu ses özellikle dosya açarken, kaydetirken veya bilgisayar yavaşladığında artıyorsa, bu büyük ihtimalle sabit diskinizin (HDD) arıza sinyalidir. Bu ses, diskin okuma/yazma kafasının plaka üzerinde olması gerektiği yerde konumlanamadığını ve tekrar tekrar denediğini gösterir. IT dünyasında buna "click of death" yani "ölüm tıklaması" denir ve adı boşuna konmamıştır.

**Ne yapmalısınız:**

1. Hemen önemli dosyalarınızı yedekleyin. Harici bir diske veya bulut depolamaya. Her an disk tamamen çalışmayı durdurabilir
2. Bilgisayarı gereksiz yere açıp kapamayın. Her açılış diski biraz daha yıpratır
3. Disk sağlık durumunu kontrol edin. Windows'ta Komut İstemi'ni yönetici olarak açın ve "wmic diskdrive get status" yazın. Ayrıca CrystalDiskInfo gibi ücretsiz bir araçla SMART verilerini kontrol edebilirsiniz
4. Diski en kısa sürede SSD ile değiştirin. SSD'lerde hareketli parça olmadığı için bu tür arızalar yaşanmaz

Tıkırtı sesini duyduğunuzda "biraz daha dayanır" diye ertelemeyin. Disk bugün çalışıyor olabilir ama yarın sabah açılmayabilir. Verilerinizi kurtarmak, disk tamamen bozulduktan sonra çok daha zor ve pahalıdır. Verilerinizi kaybettiyseniz [silinen dosyaları geri getirme rehberimize](/blog/silinen-dosyalari-geri-getirme) bakabilirsiniz ama en iyisi o noktaya gelmeden önlem almaktır.

## Yüksek Fan Sesi (Sürekli veya Aralıklı)

**Aciliyet: Orta**

Bilgisayarınızın fanları normalde sessiz veya hafif bir hışırtıyla çalışır. Ancak fan sesi belirgin şekilde arttıysa, bilgisayar ısınıyor demektir. Fan, işlemciyi ve diğer bileşenleri soğutmak için daha hızlı dönmeye başlar.

Fan sesinin artmasının sebepleri:

Birincisi, toz birikimi. Bu en yaygın sebeptir. Bilgisayarın içi ve fan kanatları toz toplar, hava akışı azalır ve bilgisayar yeterince soğuyamaz. Fanlar bunu telafi etmek için daha hızlı döner.

İkincisi, termal macun kuruması. İşlemci ile soğutucu arasındaki termal macun 3-5 yılda kurur. Isı transferi azalır ve fan sürekli yüksek devirde çalışmak zorunda kalır.

Üçüncüsü, arka planda çalışan yoğun işlemler. Antivirüs taraması, Windows güncellemesi veya bir program bilgisayarı yoğun şekilde kullanıyorsa fan sesi artar. Bu geçicidir ve normal bir durumdur.

Dördüncüsü, havalandırma deliklerinin kapalı olması. Laptop kullanıyorsanız, cihazı yastık, battaniye gibi havalandırmayı kapatan yüzeylere koymanız sıcaklığı artırır.

**Ne yapmalısınız:**

1. Havalandırma deliklerini kontrol edin, tıkanmış mı bakın
2. Masaüstü bilgisayarlarda kasayı açın ve basınçlı hava ile tozu temizleyin (bilgisayar kapalıyken)
3. Laptop kullanıyorsanız alt kısmındaki havalandırma deliklerinin açık olduğundan emin olun, bir laptop soğutucu standı kullanmayı düşünün
4. Görev Yöneticisi'nden CPU kullanımını kontrol edin. Sürekli yüzde 80-100 kullanım varsa arka planda gereksiz bir işlem çalışıyor olabilir
5. Sorun devam ediyorsa termal macun yenilenmesi gerekebilir, bu işlem için teknik servis desteği alın

Bilgisayarınız aşırı ısınmadan dolayı kendini kapatıyorsa, [bilgisayar kendi kendine kapanıyor rehberimizi](/blog/bilgisayar-kendini-kapatiyor) inceleyin.

## İnce, Yüksek Frekanslı Çığlık Sesi (Coil Whine)

**Aciliyet: Genellikle Düşük**

Bilgisayarınızdan ince, yüksek perdeli bir çığlık veya fısıltı sesi geliyorsa, bu muhtemelen "coil whine" denen bir durumdur. Ekran kartı, anakart veya güç kaynağındaki bobin sargılarının yüksek elektrik akımı altında titreşmesinden kaynaklanır. Bu ses özellikle ekran kartı yoğun çalışırken (oyun, video işleme) artar.

Coil whine genellikle zararsızdır ve donanıma zarar vermez. Ancak bazı durumlarda çok rahatsız edici olabilir. Eğer ses yeniyse ve güç kaynağından geliyorsa, güç kaynağı arızasının habercisi olabilir. Güç kaynağından gelen tuhaf sesler elektrik sorunu anlamına gelebilir ve ciddi olabilir.

**Ne yapmalısınız:**

1. Sesin nereden geldiğini tespit etmeye çalışın (kasanızı açıp kulağınızı yaklaştırarak)
2. Güç kaynağından geliyorsa dikkatli olun, güç kaynağı arızası diğer bileşenlere de zarar verebilir
3. Ekran kartından geliyorsa genellikle zararsızdır, garanti kapsamındaysa değişim talep edebilirsiniz
4. Ses çok rahatsız ediciyse, güç kaynağı değişikliği sorunu azaltabilir

## Taşlama veya Öğütme Sesi

**Aciliyet: Yüksek**

Bilgisayardan taş öğütülüyor gibi bir ses geliyorsa, bu genellikle fan yatağının bozulduğu anlamına gelir. Fan yatağı (bearing) aşındığında fan eksenden kayar ve kanatlar kasaya veya başka parçalara sürtünür. Bu ses zamanla artar.

**Ne yapmalısınız:**

1. Bilgisayarı kapatın ve kasayı açın
2. Hangi fanın ses yaptığını belirleyin (işlemci fanı, kasa fanı, güç kaynağı fanı veya ekran kartı fanı olabilir)
3. Arızalı fanı en kısa sürede değiştirin. Fan çalışmayı durdurursa bileşen aşırı ısınır ve kalıcı hasar görebilir
4. Fan değişimi genellikle basit ve ucuz bir işlemdir ama hangi fanı alacağınızdan emin değilseniz profesyonel destek alın

## Bip Sesleri (Açılışta)

**Aciliyet: Duruma Göre Değişir**

Bilgisayarınız açılırken bip sesleri çıkarıyorsa, bu anakartın size bir hata kodu iletmesidir. Bilgisayar açılışta donanım testi (POST) yapar ve bir sorun bulursa bip sesiyle bildirir.

Yaygın bip kodları (üreticiye göre farklılık gösterir):

- Tek kısa bip: Her şey normal. Endişelenmenize gerek yok
- Sürekli kısa bipler: Güç kaynağı sorunu veya anakart arızası
- Sürekli uzun bipler: Bellek (RAM) sorunu. RAM çubukları gevşemiş olabilir, çıkarıp tekrar takmayı deneyin
- Bir uzun, iki kısa bip: Ekran kartı sorunu. Ekran kartını yuvasından çıkarıp tekrar takın
- Bir uzun, üç kısa bip: Ekran kartı bellek hatası

Bilgisayarınız bip sesi çıkarıp açılmıyorsa, [bilgisayar açılmıyor rehberimizde](/blog/bilgisayar-acilmiyor) detaylı çözüm adımlarını bulabilirsiniz.

**Ne yapmalısınız:**

1. Bip sayısını ve süresini (kısa mı uzun mu) not edin
2. Bilgisayarın veya anakartın marka ve modelini öğrenin
3. İnternette "marka + BIOS bip kodu" aratarak kodun anlamını bulun
4. RAM ve ekran kartı sorunlarında, bileşenleri çıkarıp temas yüzeylerini temizleyerek tekrar takmayı deneyin

## Vızıltı veya Uğultu Sesi

**Aciliyet: Orta**

Sürekli bir vızıltı veya uğultu sesi genellikle sabit diskten (HDD) veya güç kaynağından gelir. HDD'lerde bu ses diskin plakaların dönmesinden kaynaklanır ve belli bir seviyede normaldir. Ancak ses belirgin şekilde artmışsa, disk yıpranıyor olabilir.

Güç kaynağından gelen vızıltı ise elektriksel bir sorunun işareti olabilir. Özellikle kesintisiz güç kaynağı (UPS) kullanmıyorsanız, şebeke dalgalanmaları güç kaynağını yıpratabilir.

**Ne yapmalısınız:**

1. Sesin HDD'den mi güç kaynağından mı geldiğini belirlemeye çalışın
2. HDD'den geliyorsa disk sağlık kontrolü yapın ve yedeklerinizi güncelleyin
3. Güç kaynağından geliyorsa UPS kullanımını değerlendirin
4. Ses şiddetliyse veya artıyorsa, profesyonel kontrol yaptırın

## Ses Türüne Göre Hızlı Karar Tablosu

Bu tabloyu referans olarak kullanabilirsiniz:

- Tıkırtı (diskten): Kritik aciliyet, hemen yedekleyin, diski değiştirin
- Yüksek fan sesi: Orta aciliyet, toz temizliği yapın, havalandırmayı kontrol edin
- İnce çığlık (coil whine): Düşük aciliyet, genellikle zararsız, güç kaynağından geliyorsa dikkat
- Taşlama sesi: Yüksek aciliyet, fan arızası, fan değiştirin
- Bip sesleri: Duruma göre, hata kodunu tespit edin, ilgili bileşeni kontrol edin
- Vızıltı/uğultu: Orta aciliyet, disk veya güç kaynağı kontrolü yapın

## Genel Kural: Yeni Bir Ses Her Zaman Dikkate Alınmalı

Bilgisayarınız normalde nasıl ses çıkarır bilirsiniz. Alışık olmadığınız yeni bir ses duymaya başladıysanız, bu genellikle bir şeylerin değiştiği anlamına gelir. Yeni sesleri görmezden gelmeyin, özellikle şirket bilgisayarlarında. Zamanında yapılan bir kontrol, pahalı bir tamir veya veri kaybından kurtarabilir.

Bilgisayarınız sürekli donuyor ve bu seslerle birlikte performans sorunları yaşıyorsanız, [bilgisayar sürekli donuyor rehberimize](/blog/bilgisayar-surekli-donuyor) de göz atın.

Kozyatağı Bilişim olarak şirket bilgisayarlarınızın düzenli bakımını, arıza tespitini ve onarımını profesyonel olarak yapıyoruz. Garip sesler duymaya başladığınızda geç kalmadan bize ulaşın.

**Hemen arayın: [0541 636 77 75](tel:05416367775)**
**Web: [kozyatagibilisim.com](https://kozyatagibilisim.com)**

---

Bu rehberi de okuyun:

- [Bilgisayar Açılmıyor: Çözüm Rehberi](/blog/bilgisayar-acilmiyor)
- [Bilgisayar Kendi Kendine Kapanıyor](/blog/bilgisayar-kendini-kapatiyor)
- [Silinen Dosyaları Geri Getirme](/blog/silinen-dosyalari-geri-getirme)
