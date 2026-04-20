---
slug: iso-27001-kobi-90-gun-yol-haritasi
title: "ISO 27001 Sertifikası 90 Günde: KOBİ İçin Gerçekçi Yol Haritası"
type: cluster
pillar: 2
url: "/blog/iso-27001-kobi-90-gun-yol-haritasi"
hedef_anahtar_kelime: "iso 27001 kobi sertifika süreç"
meta_description: "ISO 27001 sertifikasyonunu 50-200 kişilik Türk şirketinde 90 günde almak mümkün mü? Gerçek zaman çizelgesi, maliyet, control gap analizi ve yaygın hatalar."
kelime_sayisi: "~2100"
pillar_linki: "/kobi-siber-guvenlik"
---

## Neden Şimdi ISO 27001?

Son 12 ayda orta ölçekli Türk şirketlerinden ISO 27001 danışmanlık talebi ikiye katlandı. Bunun sebebi tek değil:

- **Uluslararası müşteriler** tedarikçilerinden sertifika istiyor (özellikle SaaS, yazılım, BPO, finans)
- **Kurumsal ihaleler**: Büyük holdinglere tedarikçi olmak için ISO 27001 ön koşul
- **KVKK denetim zemini**: Kurul denetiminde "uluslararası güvenlik standartlarına uyumluluk" iyi savunma
- **Sibers sigorta primleri**: Sertifikalı şirkete %20-40 indirim

Bu yazıda 90 gün hedefiyle ISO 27001 sertifikasına giden gerçekçi bir yol haritası çiziyorum. Bazı danışmanlıklar "6-12 ay lazım" der — doğru değil, eğer şirket boyutu ve kapsamı makulse 90 gün mümkün. Ama ciddi disiplin ister.

## Ön Kontrol — Bu Süre Sizin İçin Gerçekçi Mi?

90 gün iddiası şu koşullarda mümkün:

✅ **50-200 kullanıcı** (daha büyükse kapsam genişliyor)  
✅ **Sadece bir iş lokasyonu** (çok şubeli = daha uzun)  
✅ **Kapsam sadece IT + temel iş süreçleri** (üretim hattı dahil ise IEC 62443 ekleyin, uzar)  
✅ **Yönetim kurulu karar verdi** (yürütme sorumluluğu kimde belli)  
✅ **En az 1 kişi tam zamanlı süreç sahibi olabilecek** (genelde IT Manager veya QA)  
✅ **Bütçe ayrıldı** — min. 250-500 bin TL aralığında

Eğer bu listedeki 2+ madde tutmuyorsa 6 aya çıkarın planı.

## Maliyet Gerçeği (2024-2025)

| Kalem | Tahmini TL |
|---|---|
| Dış danışmanlık (gap + implementation + hazırlık) | 150.000 - 350.000 |
| Sertifikasyon firması (TÜRKAK akrediteli) | 100.000 - 200.000 |
| Yazılım/araçlar (SIEM, vulnerability scanner, risk aracı) | 80.000 - 200.000 |
| İç insan kaynağı (eşdeğer mesai) | 150.000 - 300.000 |
| Eğitim (farkındalık + teknik) | 30.000 - 80.000 |
| Sonrası yıllık gözetim denetimi + korunum | 80.000 - 150.000 /yıl |
| **İlk yıl toplam** | **~700.000 - 1.300.000 TL** |

Bu "küçük" bir yatırım değil ama hedef pazarınızın kapısını açar.

## 90 Günlük Gerçek Plan

### Gün 0-15: Hazırlık Fazı

#### Hafta 1: Karar ve ekip oluşturma

- **ISMS Yöneticisi atanır** (Bilgi Güvenliği Yöneticisi). Genelde IT Manager veya CISO; yoksa IT Manager + Kalite Yöneticisi birlikte.
- Yönetim kurulu **ISMS politikasını** resmi olarak onaylar (1 sayfa, ama yüksek seviye karar)
- Danışman firması seçilir — referans sorgulaması, sözleşme imzası

#### Hafta 2: Kapsam belirleme (bu kritik)

- **Sertifika kapsamı** (scope statement) yazılır. "Şirketin hangi birimleri, hangi süreçleri, hangi lokasyonları dahildir?"
- Küçük kapsam tutun: Örneğin "İstanbul Ataşehir ofisi IT altyapısı, ürün geliştirme ve müşteri destek süreçleri"
- **Kapsamı genişletmek denetim sonrası mümkün** — ilk sertifikada fazla iddialı olmayın

#### Hafta 3: Gap analizi

- Danışman mevcut durumu ISO 27001:2022 Annex A 93 control ile karşılaştırır
- Genelde KOBİ'de tutan control sayısı ~25-35 / 93
- **Raporda eksiklikler ve öncelik sıraları** çıkar

### Gün 16-45: İmplementasyon Sprinti

#### Hafta 4-5: Dokümantasyon

ISO 27001 iki şey ister: **yapmak + kağıt üzerinde göstermek**. Minimal dokümantasyon seti:

1. **ISMS Manual** (~20-30 sayfa)
2. **Bilgi Güvenliği Politikası** (üst düzey)
3. **Risk Değerlendirme Metodolojisi**
4. **Risk Register** (tehdit × zafiyet × varlık matrisi)
5. **Statement of Applicability (SoA)** — 93 control'den hangisi uygulandı, hangisi hariç, neden
6. **İş Sürekliliği Planı**
7. **Incident Response Prosedürü**
8. **Access Control Politikası**
9. **Supplier Management Prosedürü** — tedarikçi güvenlik değerlendirmesi
10. **Change Management Prosedürü**
11. **Kabul Edilebilir Kullanım Politikası** (çalışan için)
12. **Şifre Politikası**, **Backup Prosedürü**, **Vulnerability Management**

Bu dokümantasyonun **%80'i danışman hazır template'ten gelir**, %20 sizin şirketinize özelleştirmedir.

#### Hafta 6-7: Teknik kontroller (en yoğun dönem)

Mevcut altyapıya en sık eklenenler:

- **MFA zorunluluğu** — Azure AD / Entra ID ile Conditional Access
- **Disk şifreleme** — BitLocker tüm laptop'larda, Jamf/Intune zorlanarak
- **Endpoint Detection & Response (EDR)** — CrowdStrike, SentinelOne, Microsoft Defender for Business
- **Merkezi log toplama** — Wazuh (açık kaynak) veya Splunk, Azure Sentinel
- **Vulnerability scanning** — Nessus, Qualys, OpenVAS — aylık tarama + remediation
- **Backup immutability** — Veeam + Object Lock veya Azure Immutable Blob
- **Firewall kuralları temizliği** — expired, unused kurallar sıfırlanır
- **Privileged Access Management** — en azından tier model (admin ayrı hesap)

#### Hafta 8: Varlık envanteri + risk register

- Tüm donanım, yazılım, veri varlıkları listelenir (genelde 100-300 kalem bir KOBİ için)
- Her varlık için **sahibi, gizlilik derecesi, risk notu** belirlenir
- Risk register güncellenir: örnek satır: "Dosya sunucusu — Ransomware — Yüksek — Backup immutability + EDR ile düşürüldü orta seviyeye"

#### Hafta 9: Çalışan eğitimi

- Farkındalık eğitimi: phishing, şifre, sosyal mühendislik (KnowBe4 veya kendi hazırlanan)
- Zorunlu eğitim kaydı tutulur — denetimde istenir
- **Phishing simülasyonu** en az 1 kez yapılır, sonuçlar raporlanır

### Gün 46-70: İç Denetim ve İyileştirme

#### Hafta 10-11: İç denetim

- Dış danışman veya bağımsız bir iç denetçi gerçekleştirir
- 93 control tek tek kontrol edilir — uygulanmış mı, dokümante edilmiş mi, kanıt var mı?
- Findings (bulgular) rapor edilir, genelde 10-30 minor + 0-5 major

#### Hafta 12-13: Remediation (bulgular kapatılır)

- Her bulguya **action plan + sorumlu + son tarih** atanır
- Majör bulgular 2 hafta içinde kapatılmalı (aksi halde sertifika ertelenir)
- Dökümantasyon güncellemeleri, ek kontrol implementasyonları

### Gün 71-90: Yönetim Gözden Geçirme + Stage 1 Denetim

#### Hafta 14: Yönetim gözden geçirme toplantısı

- Yönetim kurulu + ISMS yöneticisi + ilgili direktörler
- Geçen dönemin güvenlik olayları, risk değişiklikleri, iyileştirme önerileri
- **Tutanak tutulur** — denetimde istenir

#### Hafta 15-16: Stage 1 Denetim (belge incelemesi)

- Sertifikasyon firması danışmanları dokümantasyonu incelemek için 1-2 gün gelir
- Eksiklikler tespit edilirse Stage 2'ye kadar kapatma süresi tanır
- Genelde Stage 1 sonrası **1-4 haftalık hazırlık dönemi** olur

#### Hafta 17-18: Stage 2 Denetim (uygulama gözlemi)

- Sertifikasyon denetçileri 2-3 gün yerinde gözlem yapar
- Çalışanlarla mülakat, sistemleri gerçekten kontrol, log kayıt incelemesi
- Bulgular: 0 major (hedef), 0-10 minor kabul edilebilir

#### Hafta 19: Sertifikasyon kararı

- Denetim raporu teslim — "uygun" ise sertifika 2-4 hafta içinde basılır
- Ya da küçük bulgular varsa 30 gün içinde kapatılıp tekrar değerlendirme

**Toplam: ~90-100 gün** (standart bir tempoyla)

## Denetim Sırasında En Çok Fail Olan 10 Control

Türk orta ölçekli şirketlerde en sık "nonconformity" çıkan noktalar:

### 1. A.5.10 — Acceptable Use Policy (AUP)
Çalışanlara imzalatılmamış, dosyada yok. **Çözüm**: İK işe alım paketinde AUP eklenmeli, imza dijital veya fiziksel saklanmalı.

### 2. A.5.15 — Access Control Review
Kullanıcı yetkileri düzenli gözden geçirilmiyor. Denetçi "ayrılan X kullanıcısının AD hesabı hâlâ aktif" der. **Çözüm**: Çeyreklik access review süreci, tutanak.

### 3. A.5.19 — Tedarikçi İlişkileri
Kritik tedarikçilere güvenlik soru anketi gönderilmemiş. **Çözüm**: Her yeni tedarikçiye ISO 27001 Supplier Assessment Questionnaire.

### 4. A.5.27 — Olay Yönetimi
"Olay oldu mu?" sorusuna "hayır" cevabı. Denetçi gülümser, çünkü olay olmuştur. **Çözüm**: Her 'garip e-posta bildirim' bile kaydedilir — olay log'u zengin görünür.

### 5. A.5.29 — İş Sürekliliği
BCP yazılı ama **test edilmemiş**. **Çözüm**: Yılda en az 1 kez tabletop exercise (kağıt üstünde senaryo simülasyonu).

### 6. A.5.34 — Kişisel veri koruma
KVKK çakışması var ama ISO tarafında da istiyor. **Çözüm**: KVKK envanter + aydınlatma metni zaten hazırsa ISO kolay geçer.

### 7. A.8.3 — Information Access Restriction
Dosya sunucusunda "herkes → tam yetki" paylaşımları var. **Çözüm**: Role-based access, Robocopy permissions audit.

### 8. A.8.7 — Kötü amaçlı yazılımdan korunma
AV yazılımı kurulu ama **merkezi konsol + raporlama yok**. Tek tek makinede çalışıyor. **Çözüm**: Merkezi EDR + haftalık rapor.

### 9. A.8.16 — Monitoring
Log'lar toplanıyor ama "kimse bakmıyor". **Çözüm**: Haftalık log review tutanağı veya SIEM ile otomatik alarm.

### 10. A.8.24 — Kriptografi kullanımı
Laptop'lar şifresiz, e-posta TLS'siz gönderiliyor. **Çözüm**: BitLocker zorunlu, Office 365 DLP ile dış e-postaya otomatik şifreleme.

## Sertifikasyon Sonrası — Sürdürme

İlk sertifika 3 yıl geçerli, ama **her yıl gözetim denetimi** var:

- **Yıl 1 (ilk gözetim)**: 1-2 gün, küçük güncellemeler
- **Yıl 2 (ikinci gözetim)**: Benzer
- **Yıl 3**: Yenileme denetimi — Stage 1+2 gibi tam denetim

Sürdürme yıllık **80-150 bin TL** (danışmanlık + denetim + araç abonelikleri).

## Yaygın Hatalar — Kaçının

1. **"Sadece kağıt işi halletsek yeter"** — Denetçi dosya inceler ama sistemlerde de kontrol eder. Uygulama olmadan kağıt işe yaramıyor.
2. **"Çalışanlara söyleyelim geçtikten sonra normale dönelim"** — Denetim sonrası aynı disipline devam etmezseniz bir sonraki gözetimde kaybederiz.
3. **"En ucuz danışmanlık"** — 50 bin TL'ye "90 gün ISO 27001" vaat eden firmalardan uzak durun. Template kopyalarlar, uygulamada destek olmazlar.
4. **Kapsamı çok geniş tutmak** — İlk sertifikada "tüm şirket, tüm süreçler" demeyin. 3 yıl sonra yenilemede genişletin.
5. **IT'yi tek başına bırakmak** — ISO 27001 bir yönetim standardı, sadece teknik değil. İK, satın alma, finans, operasyon hepsi katılmalı.

## Sonuç

ISO 27001, doğru planlama ile 90 günde alınabilir. Anahtar:

1. Kapsamı dar tutun (ilk sertifika için)
2. Danışman kaliteli olsun (referans sorgulayın)
3. Yönetim desteği "kağıt" değil aktif olsun
4. IT personeli 90 gün tam mesai verebilmeli
5. Bütçe 700 bin - 1.3 milyon TL aralığında hazır olsun

**En büyük fayda**: Yurt dışı müşteri kapısı açılır, büyük holding ihaleleri girilebilir, siber sigorta primi düşer.

---

**ISO 27001 sertifikasyon sürecinde rehberlik mi arıyorsunuz?** Kozyatağı Bilişim olarak 90 günlük implementasyon paketi + gap analizi + dokümantasyon hazırlama + denetime eşlik tam kapsamlı hizmet veriyoruz. 30 dakikalık ücretsiz değerlendirme görüşmesinde mevcut durumunuzun sertifikaya ne kadar yakın olduğunu birlikte görelim.
