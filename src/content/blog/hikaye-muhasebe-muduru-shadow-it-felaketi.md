---
slug: hikaye-muhasebe-muduru-shadow-it-felaketi
title: "Muhasebe Müdürünün Kendi Kurduğu 'Mini Cloud': Shadow IT Felaketi"
type: hikaye
pillar: 7
url: "/blog/hikaye-muhasebe-muduru-shadow-it-felaketi"
hedef_anahtar_kelime: "shadow it felaketi kobi"
meta_description: "Muhasebe departmanının IT'ye sormadan kurduğu Dropbox hesabı, şifresiz NAS ve kişisel cloud'un 2 yılda yarattığı KVKK kâbusu. Gerçek shadow IT vakası."
kelime_sayisi: "~2300"
pillar_linki: "/hizmetler/dosya-paylasim"
hikaye: true
---

## Şubat — "Hızlı Bir Soru"

120 kişilik bir üretim firmasının CFO'su Selma Hanım, BT müdürü Tolga'yı aradı:

> "Tolga Bey, bir şey soracağım. KVKK denetimi için veri envanteri hazırlıyoruz. Müşteri finansal verileri hangi sistemlerde tutuluyor?"

Tolga'nın hazır cevabı vardı:
- Logo Tiger veritabanı (SQL Server)
- Paylaşılan klasör (File Server)
- Outlook / Exchange mailbox'lar
- Bordro için MikroPersonel

"Başka?" diye sordu Selma. Tolga düşündü. "Başka yok. Bunlar standart."

Selma bir an durdu. "Muhasebe ekibinin Dropbox kullandığını duydum. Haberin var mı?"

Tolga şaşırdı. "Dropbox? Firma hesabı değil, değil mi?"

"Evet. Muhasebe müdürü kendisi kurmuş."

Tolga'nın midesi düştü.

## Aynı Gün — 15:30 — Muhasebeyi Ziyaret

Muhasebe müdürü Ömer Bey, 25 yıllık deneyimli bir muhasebeci. BT'yle arası iyi değildi; "bilgisayarcılar her şeyi yavaşlatıyor" tarzında yorumlar yapardı.

Tolga muhasebe odasına girdi:

> "Ömer Bey, KVKK için denetimden veri envanteri istendi. Sizin Dropbox kullandığınızı duydum, doğru mu?"

Ömer hafifçe geriledi:
> "Biz kendi aramızda paylaşıyoruz sadece. Daha pratik. Tedarikçiden gelen fatura resimleri, müşteri kontrat kopyaları, şube raporları... BT sistemimiz çok yavaş, her seferinde IT'yi aramam mümkün değil. Ekiple Dropbox açtık, 4-5 kişi aktif kullanıyor."

Tolga: "Kaç yıldır?"

Ömer: "İki sene olmuştur, üç."

Tolga: "Hangi tür veriler orada?"

Ömer elini salladı: "Her şey. Müşteri sözleşmeleri, çalışanların kimlik fotokopileri, faturalar, bordro PDF'leri, vergi levhaları... Maliye Bakanlığına göndermemiz gereken bazı dosyalar. İK'dan gelen personel dosyaları."

Tolga'nın kalp atışı hızlandı. "Dropbox hesabı kimin adına?"

Ömer: "Benim kişisel Gmail'imle açtım. O zaman şirket Gmail hesabı yoktu, sonra eklemedik..."

## O Gece — Envanter Genişliyor

Tolga ofisten çıkmadı. Departman müdürleriyle tek tek görüşmek için sabahı bekledi. Ertesi gün keşfettikleri:

### Satın Alma Departmanı
- **Google Drive** kişisel hesap. 4 yıldır kullanılıyor. Tüm tedarikçi kotasyonları, ihale dosyaları, kontrat revizyonları orada.

### Üretim Planlama
- **Synology NAS** — "BT satın alamadı, biz aldık" — üretim müdürünün masasının altında. Şifresiz. Tüm CAD çizimleri, üretim planları, kalite raporları.

### Satış Ekibi
- **Microsoft OneDrive kişisel hesaplar** — her satış temsilcisi kendi hesabında müşteri listesi tutuyor. Ayrılan 3 satış temsilcisinden 2'sinin hesabına erişim **yok**. Müşteri verisi dış kişilerde.

### İnsan Kaynakları
- **iCloud Family Sharing** — İK müdürü Mac kullanıyor, iCloud ile senkronize ediyor. Özlük dosyaları, sağlık raporları, ücret tabloları. Ailesiyle Family Sharing'te — yani teoride ailesinin de erişebileceği seviyede.

Toplam **7 farklı shadow IT sistemi**. IT envanterine girmemiş. KVKK veri envanterinde yok. Kullanıcı erişim denetimi yok.

## Bir Hafta Sonra — KVKK Danışmanı

Firma KVKK uyum için dış danışman Avukat Canan Hanım'ı tutmuş. Tolga tüm bulgusunu anlatınca Canan Hanım sakin ama kesindi:

> "Bu bulgular VERBİS'e bildirilmesi gerekenler arasında. Kişisel veriler — özellikle kimlik bilgileri ve sağlık verileri — **yetkisiz veri aktarımı** kapsamında. Şirketi Bilgi Teknolojileri denetiminde ciddi idari para cezası bekler. 2024 tarifesi üzerinden hesapladığımızda 2-8 milyon TL arası."

CFO Selma: "Eğer kurul fark etmezse?"

Canan: "Fark etmemek kolay değil. Ayrılan çalışanların biri yarın şikayet ederse — kişisel verisine erişim iptal edilmedi diye — soruşturma başlatılır. İspat yükü de şirkette olur."

Selma: "Ne yapmamız gerek?"

## Sonraki 30 Gün — Yangın Söndürme

### Hafta 1: Kontrol Alma

Tolga ve ekibi acil moda geçti:

1. **Dropbox hesabı Ömer'den transfer edildi** (Dropbox admin console üzerinden):
   - Kurumsal Dropbox Business hesabı açıldı
   - Ömer'in kişisel hesabındaki tüm şirket dosyaları buraya taşındı
   - Ömer'in kişisel hesabında artık bu dosyalar yok (backup için bir süre kaldı)
   - Diğer muhasebe çalışanları kurumsal hesaba davet edildi

2. **Google Drive** için aynı süreç — satın alma müdürünün kişisel hesabından Google Workspace Business hesabına geçiş.

3. **Synology NAS** — fiziksel olarak üretim planlama odasından alındı, sunucu odasına götürüldü, firma AD ile entegre edildi, kullanıcı tabanlı erişim kuruldu.

4. **OneDrive kişisel hesapları** — IT aracılığıyla her satış temsilcisinin kurumsal M365 hesabına veri migration. Ayrılan çalışanların eski hesaplarına **ulaşılamadığı için**, bilinen yeniden oluşturabilecek veri kopyaları kurumsal sisteme girildi. **3 yıllık bazı müşteri konuşma geçmişi kayıp** — risk kabul edildi.

5. **iCloud** — İK müdürünün cihazı Jamf MDM'e enroll edildi, kurumsal OneDrive'a veri migration, iCloud Family Sharing'ten iş dosyaları kaldırıldı.

### Hafta 2-3: Denetim ve Rapor

Canan Hanım ile beraber:
- Veri akış haritası çıkarıldı (her sistemdeki kişisel veri tipleri + hacimleri)
- Aydınlatma metni güncellendi (yeni sistem referansları)
- Çalışanlara veri işleme politikası revize edildi, tekrar imzalatıldı
- VERBİS kaydı güncellendi

### Hafta 4: İç Bildirim

Yönetim kuruluna rapor verildi. Bulgular + düzeltme eylemleri + gelecek önleme.

Canan Hanım CFO Selma'ya son olarak:
> "Şu anda en iyi ihtimalle denetim gelirse proaktif remediation kanıtı gösterebiliriz — ceza düşürülebilir ama ortadan kalkmayabilir. En kötü ihtimal bulunan durum düzeltildiği için ceza hafifler. Ama **2 yıl önce şikayet olmuş olsaydı** durumumuz çok daha kötü olurdu."

## Üç Ay Sonra — Kültürel Değişim

Tolga ve CFO Selma, o dönem sonrası **kültürel değişim programı** başlattılar. Sadece teknik çözüm değildi gereken — tüm şirkette "shadow IT güvensiz, onay alın" kültürü oluşturmak.

Uygulamalar:

### 1. Aylık IT "Office Hours"
Her ayın ilk Çarşamba 14:00-16:00 Tolga ve ekibi açık masa kurar. Çalışanlar "bir dosya paylaşım ihtiyacım var", "bir uygulama kullanmak istiyorum" gibi taleplerle gelir. Onay sürecine girilmeden önce ihtiyaç anlaşılır, çoğu zaman kurumsal alternatif önerilir.

### 2. "Yes By Default" Kültürü
Önceki Tolga'nın sık tepkisi: "Olmaz, güvenlik riski." Ömer'in Dropbox'a kaçmasının sebebi de buydu. Yeni yaklaşım: Çalışanın talebine "hayır" yerine "şöyle yapalım" cevabı. Hızlı dosya paylaşım için kurumsal SharePoint Guest Link, geçici proje için tam kapsamlı Teams kanalı.

### 3. Shadow IT Detection (Teknik)
IT altyapısına Microsoft Defender for Cloud Apps (MCAS) eklendi. Firewall log'larından çıkış trafiğini analiz edip "hangi SaaS kullanılıyor" raporu çıkarıyor. Dropbox, Google Drive, Trello, Slack gibi trafikler dashboard'da görünür.

Aylık rapor:
- Şirket içinden toplam 47 farklı SaaS'a bağlantı
- 12'si onaylı (M365, Slack, Zoom, Teams, Asana vs.)
- 35'i **unsanctioned**
- Her birini IT ile sahibi konuşuyor — yasak mı, onaylanıyor mu?

### 4. "IT Ambassador" Programı
Her departmandan bir kullanıcı "IT ambassador" olarak gönüllü oluyor. Arkadaşlarına teknoloji konusunda yardım ediyor + IT'yi departmandaki "kötü adam" olmaktan kurtarıyor. BT ekibi ayda bir bu ambassador'lara brief veriyor — yeni araçlar, güvenlik güncellemeleri.

## Bir Yıl Sonra — Denetim Sonucu

KVKK denetimi 1 yıl sonra geldi. Denetçiler:
- Veri envanteri temiz ve güncel
- Erişim kontrol politikaları belgeli
- 2 yıl önceki shadow IT bulgusu **proaktif olarak düzeltilmiş** ve "düzeltme günlüğü" belgelenmiş
- Aydınlatma metni doğru
- VERBİS kaydı eksiksiz

**Sonuç**: Minor bulgular (2 dokümantasyon eksikliği). Para cezası **yok**. Düzeltme süresi 60 gün.

Canan Hanım: "Şansınız yaver gitti. Proaktif olduğunuz için kurul olumlu yaklaştı. Bu denetim 2022'de olsaydı — o zaman ki durumu bilmiyorlardı — 3-5 milyon TL ceza kesilebilirdi."

## Çıkarılan Dersler

Orta ölçekli Türk şirketleri için 5 kritik ders:

### 1. Shadow IT herkeste var

"Bizde yok" diyen IT müdürü ya bilmiyor ya kendini kandırıyor. 50+ kişilik her şirkette 10-30 farklı shadow SaaS var. Soru "var mı?" değil, "hangi ölçekte ve ne risklerle?"

### 2. "Hayır" demek yerine alternatif sun

Çalışanın "X yazılımı kullanmak istiyorum" dediğinde BT'nin "güvenlik riski" demesi shadow IT'yi besler. Bunun yerine: "Şu anda ne problem çözmek istiyorsun? Kurumsal araçlarımızla şöyle yapabiliriz." Genelde alternatif vardır.

### 3. Teknik kontrol + kültürel değişim birlikte

Firewall'da Dropbox'u bloklamak çözüm değil — kullanıcı VPN dışı 4G'de kullanır. Kültürel + teknik birleşimi: shadow IT'yi **tespit et + alternatifini sun + kötü alışkanlığı değiştir**.

### 4. Veri envanteri yaşayan bir doküman

KVKK için bir kez "envanter yaptık" yetmez. Her ay güncel kalmalı. Yeni bir SaaS satın alındığında envantere giriyor mu? Ayrılan çalışanın erişimleri revize ediliyor mu?

### 5. Olay sonrası değil, öncesi hazırlan

Bu hikayede şirket şanslıydı — kendi keşfetti, çalışan şikayeti olmadan. Eğer olsaydı süreç çok daha kötü giderdi. **Proaktif denetim**: IT Cloud App Security, DLP (Data Loss Prevention), periyodik audit. Ücret yüksek değil — cezanın milyonda biri.

---

*Bu hikaye, birden fazla gerçek vakadan derlenen kurgusal bir anlatıdır. Kullanılan araçlar, KVKK süreçleri ve para cezası tarife bilgileri gerçektir. Şirket ve kişi isimleri anonimleştirilmiştir.*

**KVKK uyumu, shadow IT denetimi ve data governance için profesyonel destek?** Kozyatağı Bilişim olarak veri envanteri çıkarma, DLP kurulum, KVKK gap analizi sunuyoruz. [Ücretsiz keşif görüşmesi.](/#contact)
