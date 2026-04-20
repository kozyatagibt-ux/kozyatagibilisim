---
slug: ransomware-ilk-72-saat-vaka-analizi
title: "Ransomware Saldırısı: İlk 72 Saatte Ne Yapmalı? Gerçek Vaka Analizi"
type: cluster
pillar: 2
url: "/blog/ransomware-ilk-72-saat-vaka-analizi"
hedef_anahtar_kelime: "ransomware ilk müdahale"
meta_description: "Bir Türk orta ölçekli şirketin ransomware saldırısında ilk 72 saatte yapılan her şey: tespit, izolasyon, kurtarma, KVKK bildirimi, veri geri getirme. Gerçek senaryo rehberi."
kelime_sayisi: "~2300"
pillar_linki: "/kobi-siber-guvenlik"
---

## Senaryo

Anonimleştirilmiş gerçek bir vaka. 140 kişilik bir üretim-ticaret şirketi. Cuma sabahı saat 07:20'de vardiya amiri: "Sunucuya ulaşamıyorum, ekranda bir not var." Ekrandaki not LockBit 3.0 fidye talebi. Tüm dosya sunucuları, ERP veritabanı ve 3 uygulama sunucusu şifrelenmiş durumda. Yedekleme sunucusunda da "incremental" yedekler son 6 gündür şifreli.

Bu yazı, o 72 saatte saat saat ne yaptığımızı ve ne öğrendiğimizi anlatıyor. r/sysadmin'de benzer postlar okudum — bu senaryonun Türkiye versiyonu.

## Saat 07:20 — İlk Tespit

Vardiya amiri WhatsApp'tan bildiriyor. IT sorumlusu henüz ofise gelmemiş. Network'e giren saldırgan büyük olasılıkla **dün gece 02:00 ile 05:00 arasında** aktif olmuş — çünkü şifreleme başladıktan sonra günlük çalışma başlayana kadar fark edilmez.

**İlk kural**: Bilgisayarı kapatma. Diskteki fidye notu ve şifreli dosyaların metadata'sı adli analiz için kritik. Ama **ağ kablosunu hemen çek** — saldırganın hala aktif olup olmadığı belli değil.

## Saat 07:45 — Çağrı

Müşteri bizi arıyor. Bizim ekip harekete geçiyor:

1. **İlk önce panik kontrolü**. Yönetim kurulu üyeleri "fidyeyi ödeyelim" diyor. Cevap: "Şu anda karar vermeyin. İlk 24 saatte karar verme baskısı sapla saman ayırmaya engel."
2. **Incident Response sözleşmeli avukat** aranıyor. Türkiye'de KDK (Kişisel Verileri Koruma Kurulu) bildirim yükümlülüğü 72 saat — saat işliyor.
3. Eski IT sorumlusu hâlâ ofise gelmemiş, panikle laptop'unu VPN'e bağlamaya çalışıyor. **"Dur!"** — saldırgan hala içeride olabilir, her bağlanan cihaz yayılma vektörü.

## Saat 08:30 — Fiziki Ofis, Segregation

Ofise vardığımızda yaptığımız ilk şey:

### 1. Tüm network kablolarını çekmek

Sunucu odasında core switch'e giden tüm kablolar çekiliyor. Wi-Fi AP'ler fiziksel olarak kapatılıyor. İnternet bağlantısı (FortiGate WAN) fiziksel kapatıldı.

Amaç: **Saldırgan halen içerideyse, aktif C2 (command & control) bağlantısı kesiliyor**. Çoğu ransomware modern varyantı sonradan "geri dön" kabiliyeti bırakıyor — sadece dosya şifreleme yapmıyor, backdoor bırakıyor.

### 2. Compromise belirtisi tespiti

Firewall loglarında son 72 saat:
- RDP portuna 185.x.x.x (Rusya) IP'sinden 10 bin brute-force denemesi — 3 gün sürmüş
- 72 saat önce başarılı bir login: **kullanıcı "admin"**, şifre muhtemelen "Admin123" gibi bir şey
- "admin" hesabı domain admin yetkisine sahipmiş (klasik hata)
- Saldırgan bu hesapla içeriye girmiş, **Cobalt Strike beacon** yüklemiş, 3 gün boyunca ağı haritalandırmış

### 3. Yedekleme durumu

Veeam sunucusu açılıyor:
- Son 7 gün yedek dosyaları **.lockbit** uzantılı — şifrelenmiş
- Veeam service account domain admin yetkisine sahipmiş, saldırgan bu credential'la yedek repository'sine erişmiş
- Offsite repo (Azure Blob) var ama **immutability kapalı** — saldırgan uzak yedekleri de silmiş
- **8 gün önceki USB tape backup** sayıldığı için değmemiş — **tek kurtarma noktası**

## Saat 10:00 — Kapsam Değerlendirmesi

Müşteriyle toplantı:

**Etkilenen sistemler:**
- 4 sunucu (AD, ERP, File, App) — full encrypt
- 2 sunucu (Email Exchange, Web) — şifrelenmemiş ama credential'ları muhtemelen sızdı
- 120 kullanıcı bilgisayarı — 8 tanesinde LockBit executable var (henüz tetiklenmemiş, tetiklenmiş olsalar zaten full encrypt)
- 3 yıllık müşteri verisi, 2 yıllık finansal veri, tüm ERP/muhasebe hedef

**Veri kaybı riski:**
- 8 günlük tape backup geri yüklenirse **son 8 gün veri kaybı** (yaklaşık 12-15 milyon TL ciro değerinde sipariş/fatura kaydı)
- Ya da fidye ödemesi (ilk pazarlık 380 bin USD — yaklaşık 12-13 milyon TL)

**İş sürekliliği:**
- Her durma saatinin maliyeti ~30 bin TL (ciro + çalışan vakti + tedarikçi gecikmesi)
- Haftalık kapasite düşüşü ~2 milyon TL

## Saat 11:00 — Karar: Fidye Ödemeyeceğiz

Birlikte şu nedenleri değerlendirdik:

1. **Etik & Yasal**: Türkiye'de fidye ödemek yasa dışı değil ama OFAC/AB yaptırım listelerindeki gruplara ödeme uluslararası yaptırımla karşılaşabilir. LockBit 3.0 operatörleri bu listede.
2. **Garanti yok**: FBI ve IC3 verisine göre fidye ödeyenlerin %40'ı veriyi alamıyor, %30'u eksik alıyor.
3. **İkinci saldırı riski**: Ödeyen şirketler 6-12 ay içinde tekrar saldırıya uğrama olasılığı %80+
4. **Sigorta**: Cyber insurance poliçesi var (3 milyon TL kapasiteli) ama fidye değil, **incident response + iş sürekliliği kaybı** ödüyor

Karar: 8 günlük backup'tan restore, son 8 günlük veriyi muhasebe/ERP kağıt kayıtlarından manuel rekonstrüksiyon.

## Saat 12:00 — KDK Bildirim Hazırlığı

KVKK madde 12: **72 saat içinde KDK'ya bildirim** yükümlülüğü var. Gecikirse idari para cezası 4-9 milyon TL.

Avukat ve IT beraber:
- Etkilenen kişisel veri kapsamı: müşteri iletişim bilgileri, çalışan özlük, tedarikçi finansal
- Olası veri sızıntısı mı yoksa sadece şifreleme mi? — Saldırganlar **çoğu kez sızdırıp satıyor** (double extortion). Varsayılan: evet, veri sızdı
- Bildirim formu hazırlanıyor, akşam 18:00 itibarıyla KDK'ya teslim
- Aynı zamanda **olası etkilenen müşterilere bildirim** için şablon hazırlanıyor (100.000+ kayıt)

## Saat 14:00 — İzole Kurtarma Ortamı

Temiz bir ağ kurulumu başlıyor:

### Fiziksel segregation
- Sunucu odasında yeni bir switch + yeni bir firewall (FortiGate 100F yedek cihaz)
- Eski ağ (kontamine) tamamen izole — çalışmıyor, erişilemez
- Yeni ağa sadece "clean" sistemler: yeni Hyper-V host + temiz Windows Server + temiz AD

### Restore sırası
1. Yeni bir AD domain (eski domain credential'ları güvenli değil, baştan kurulum)
2. Tape backup'tan file server restore — 8 günlük veri
3. ERP veritabanı restore — 8 gün öncesi, finansal mutabakat sonradan
4. Email (Exchange) mail store restore

### Paralel iş
- Her kullanıcı bilgisayarı **format + fresh install** (vektörde olan/olmayan ayrımı zaman kaybı, hepsini temiz kur)
- AD'de tüm şifreler reset
- Tüm SaaS (M365, Salesforce, GitHub) şifreleri + MFA reset

## Saat 18:00 — KDK Bildirimi Gönderildi

Bildirim formu "olası kişisel veri ihlali" olarak gönderildi. Yönetim kurulu üyesi + avukat + IT sorumlusu imzaları.

Akşam yemeği molası: Ekip 11 saattir çalışıyor, kısa mola.

## Gün 2 — Restore

### 00:00 - 08:00: Tape restore
- Fiziksel tape kütüphanesinden 8 gün önceki backup restore
- File server: 4 TB veri, yaklaşık 5 saat
- ERP DB: 600 GB, yaklaşık 2 saat
- Consistency check, verification

### 08:00 - 12:00: AD kurulumu
- Yeni bir Active Directory ormanı (farklı NetBIOS adı)
- Kullanıcı hesapları recreate — şifreler ilk girişte zorunlu değiştirilecek şekilde
- Group Policy baştan: USB kilidi, local admin LAPS, SMBv1 kapalı, RDP sadece belirli hostlardan

### 12:00 - 18:00: Uygulama sunucusu
- ERP uygulaması yeniden kurulum + restore edilen DB ile bağlama
- Test: muhasebe, satın alma, stok modülleri — her birinde 8 gün öncesinin son state'i geliyor
- Manuel veri rekonstrüksiyonu için muhasebe ekibine liste: son 8 günlük kağıt kayıt mutabakatı

## Gün 3 — Production'a Dönüş

### 07:00: Pilot test
- Muhasebe + satın alma + IT ekibinden 8 kişi yeni ortamda çalışmaya başlıyor
- İlk 4 saat minor sorunlar çıkıyor (yazıcı mapping, network drive, mail imza) — hepsi 15-30 dk çözüm

### 11:00: Tam production
- Tüm ofis çalışanları yeni network'e geçiyor
- Bilgisayarlar fresh install + domain join + user profile migration
- Yaklaşık 120 makine için 3 paralel ekip, 4 saatte tamamlanıyor

### 15:00: İlk canlı iş günü
- Satış ekibi telefonları açıyor, müşterilere durum bildirimi
- "8 gün geriden gelen siparişler" için ekstra mesai planlaması
- Bu sürecin toplam kayıp tahmini: 4 iş günü çalışma kaybı + 8 günlük veri rekonstrüksiyon maliyeti = **yaklaşık 4-5 milyon TL iş etkisi**

## Gün 4-14 — Temizlik ve Öğrenme

### Forensics raporu
Dış adli bilişim firması 10 gün süren analiz:
- Giriş vektörü kesinleşti: Açık RDP portu + zayıf "admin" şifresi
- Saldırgan 72 saat içerideymiş — Mimikatz, BloodHound ile ağ haritalandırması
- Cobalt Strike beacon 3 farklı host'a yüklenmişti
- Veri exfiltration: evet, tespit edildi — 380 GB outbound (muhtemelen müşteri DB'si)

### Yapılan iyileştirmeler

**Ağ tarafında:**
- Tüm RDP internet'e kapalı — sadece VPN+MFA üzerinden
- Admin hesapları ayrı, günlük iş ayrı (tier model)
- Network segmentation: her sunucu VLAN, micro-segmentation firewall kurallarıyla
- EDR (CrowdStrike Falcon) tüm endpoint'lerde

**Yedekleme tarafında:**
- **3-2-1-1-0 kuralı**: 3 kopya, 2 farklı medya, 1 offsite, 1 immutable, 0 hata (verified)
- Veeam + Object Lock (S3 immutable) — saldırgan admin olsa bile silemiyor
- Haftalık restore testi otomatik, sandbox'ta
- Tape backup hala aktif — paranoyak seviye ama işe yarıyor

**Kimlik tarafında:**
- Tüm kullanıcılara MFA zorunlu (Entra ID P1)
- Conditional Access: şirket cihazı + Türkiye konumu + MFA
- LAPS: her bilgisayarda benzersiz local admin şifresi
- Privileged Access Management (PAM) just-in-time admin yetkisi

**Süreç tarafında:**
- Incident Response runbook yazıldı (10 sayfa)
- Çalışan siber güvenlik eğitimi (KnowBe4) — her 3 ayda phishing simülasyonu
- Cyber insurance poliçesi artırıldı 3→8 milyon TL

### Toplam hasarın muhasebesi

- İş kaybı + kurtarma işçiliği + forensics + yeni donanım/lisans: **~5.8 milyon TL**
- Tahmini müşteri kaybı (reputational): 1-2 milyon TL (6 ay içinde)
- KDK cezası henüz sonuçlanmadı — 500 bin - 2 milyon TL arası bekleniyor
- Toplam etki: **7-10 milyon TL**

Önleyici altyapı yatırımı 6 ay önce yapılsaydı, yaklaşık **500-700 bin TL** — yaklaşık **%5'i ile** saldırı engellenebilirdi.

## Çıkarılan Dersler

1. **RDP internete asla açık olmasın.** Hala 2024'te Türkiye'de %30+ KOBİ'de RDP dışarıdan erişilebilir. Tek bir VPN+MFA noktasına indir.
2. **Backup repository'si domain admin erişimli değilse** saldırganın şifreleyebildiği bir hedef değil. Separate credential, immutable storage, physical tape (paranoyak ama işe yarıyor).
3. **Offsite immutability pazarlık dışı.** Azure Blob immutability, S3 Object Lock, Wasabi/Backblaze B2 — birini seç ve aktive et.
4. **Incident Response planı yazılı olmalı.** Panik anında "ne yapacağız?" kararı yanlış verilir. Runbook 2 sayfa bile olsa işinize yarar.
5. **Siber sigorta şart ama poliçeyi oku.** Fidye ödüyor mu, iş kaybını ödüyor mu, forensics'i ödüyor mu — her birini ayrı ayrı anla.
6. **Admin hesaplarınızı ayır.** Günlük iş yapan kullanıcı domain admin olmamalı. Tier 0, Tier 1, Tier 2 modeli uygulansın.
7. **Çalışan eğitimi pahalı değil.** KnowBe4 ortalama 50 TL/kul/yıl — phishing simülasyonu + farkındalık, saldırıların %80'i önlenir.

---

**Ransomware karşısında hazır mısınız?** Kozyatağı Bilişim olarak Incident Response Retainer sözleşmesiyle 4 saat içinde yerinde müdahale garantisi veriyoruz. 30 dakikalık ücretsiz risk değerlendirmesinde mevcut altyapınızın ransomware'a karşı ne kadar savunmasız olduğunu birlikte inceleyelim.
