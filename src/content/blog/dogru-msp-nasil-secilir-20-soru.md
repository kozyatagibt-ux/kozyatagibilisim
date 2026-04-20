---
slug: dogru-msp-nasil-secilir-20-soru
title: "Doğru IT Hizmet Sağlayıcı (MSP) Nasıl Seçilir? Sormanız Gereken 20 Soru"
type: cluster
pillar: 1
url: "/blog/dogru-msp-nasil-secilir-20-soru"
hedef_anahtar_kelime: "doğru msp nasıl seçilir"
meta_description: "Kurumsal yönetilen IT hizmetleri (MSP) seçerken dikkat etmeniz gereken 20 kritik soru ve değerlendirme kriterleri. Kırmızı bayraklar, SLA, fiyat modeli, referans kontrolü."
kelime_sayisi: "~2000"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Giriş — MSP Seçimi Neden Zor?

Türkiye'de "IT hizmetleri" diye kendini tanıtan yüzlerce firma var. Birkaç kişilik freelance ekiplerden 500+ kişilik uluslararası danışmanlıklara kadar. Fiyatlar 10 bin TL/ay ile 500 bin TL/ay arasında — aynı vaatlerle.

Yanlış MSP seçmenin maliyeti:
- **Düşük vaka**: Birkaç aylık verimsizlik, sonra MSP değiştirme maliyeti (migration ~100-300 bin TL)
- **Orta vaka**: Güvenlik açığı, ransomware bulaşması, iş kaybı (milyonlarca TL)
- **Ağır vaka**: Veri kaybı, KVKK cezası, şirket itibarı kaybı

Bu yazı MSP seçerken sormanız gereken 20 soruyu ve kırmızı bayrakları listeliyor. **Bizi (Kozyatağı Bilişim) değerlendiriyor olsanız bile** bu soruların cevabını bilmek sizin lehinize.

---

## Bölüm 1: Teknik Yetkinlik (Soru 1-5)

### 1. "Mevcut müşterilerinizin ortalama büyüklüğü nedir?"

Neden kritik:
- 10 kişilik küçük ofislere bakan MSP, 200 kişilik orta ölçekli şirketin kompleksliğini bilmez
- Tam tersi: Sadece büyük holding müşterileri olan MSP, KOBİ'nin esnekliğini sağlayamaz

Kontrol edilmeli:
- En küçük müşteri kaç kişi?
- En büyük müşteri?
- Sizin boyutunuza yakın kaç müşterisi var?

**Kırmızı bayrak**: "Her boydan müşterimiz var" gibi genel cevap — spesifik örnek sorun.

### 2. "Sertifikalı teknik ekibiniz hangi ürünlerde?"

Sektörde sertifikalar ciddi (pahalı + zor) — firma yatırım yapmışsa teknik yetkinlik işareti:

- **Microsoft MCSE / Microsoft Certified: Azure Solutions Architect**
- **Fortinet NSE 4, 5, 6, 7**
- **VMware VCP-DCV**
- **Cisco CCNA/CCNP**
- **Veeam VMCA**
- **CompTIA Security+, CySA+, CISSP**

**Kırmızı bayrak**: "Deneyimimiz var, sertifikaya gerek yok" — gerçek uzman için sertifika süreç değil, kalite sinyalidir.

### 3. "Hangi ürün markalarıyla çalışıyorsunuz?"

Marka-bağımsız (vendor-agnostic) MSP tercih edilmeli. Tek marka sadık MSP (sadece Fortinet satar, Cisco hiç önermez) = **marka komisyonu motivasyonu** olabilir.

İdeal cevap: "Gereksinimlerinize göre Fortinet/Sophos/Palo Alto, VMware/Hyper-V/Proxmox, Veeam/Commvault seçeriz."

### 4. "Belirli bir hizmette spesyalistiniz var mı?"

Jack-of-all-trades yerine derin uzmanlık önemli:
- Kurumsal e-posta: M365 / Exchange uzmanı kim?
- Siber güvenlik: SOC analyst var mı?
- Sanallaştırma: VMware VCP-DCV sertifikalı kim?

**Kırmızı bayrak**: "Tüm ekibimiz her şeyi bilir" — gerçekçi değil.

### 5. "Son 12 ayda ne tür projeler yaptınız?"

Somut vaka örnekleri:
- "X firmasında 200 kullanıcılı M365 migration yaptık, 6 hafta sürdü"
- "Y üretim firmasında OT/IT segmentasyon projesi"

Genel cevap ("birçok proje yaptık") = **kırmızı bayrak**.

---

## Bölüm 2: Hizmet Kapsamı ve SLA (Soru 6-10)

### 6. "SLA (Service Level Agreement) nasıl tanımlı?"

Yazılı olarak isteyin:
- **İlk yanıt süresi** (P1 kritik → 15 dk, P2 → 2 saat, P3 → 4 saat)
- **Çözüm süresi** (hedef, garantili değilse not edin)
- **Uptime %'si** (99.5% = yılda 44 saat kesinti toleransı)
- **SLA ihlali yaptırımı**: Aylık fatura iadesi mi, service credit mi?

**Kırmızı bayrak**: "Elimizden geleni yaparız" — SLA "best effort" ile "ödenen hizmet" arasındaki fark budur.

### 7. "7/24 gerçek destek var mı?"

Detaylar:
- Gece 02:00'de ararsam kim açacak? İsmini söyleyin
- Teknisyen evden mi çalışıyor, 7/24 vardiya mı?
- Yanıt süresi gerçekten gece 15 dakika mı?

**Kırmızı bayrak**: "24/7 destek" pazarlama yazısında ama gece aradığınızda sabah dönüş. Referanslardan doğrulayın.

### 8. "Hizmet kapsamında NE DEĞİL?"

Sözleşmede "hariç tutulanlar" (exclusions) listesi olmalı:
- Donanım değişimi (laptop bozuldu, maliyet ayrı mı?)
- Yeni kullanıcı onboarding (dahil mi, saat başı mı?)
- Yeni ofis taşınması / yeni kurulum (proje ayrı mı?)
- Uygulama seviyesi destek (Logo arıza — MSP mi, üretici mi?)

**Kırmızı bayrak**: "Her şey dahil" sözü — gerçekten her şey değildir, sınırlarını bilmezsiniz fatura şok yaşarsınız.

### 9. "Proaktif monitoring dahil mi, sadece reaktif mi?"

İki farklı yaklaşım:
- **Reaktif**: Siz problem bildirirsiniz, MSP gelir
- **Proaktif**: MSP sürekli izler, problem büyümeden müdahale eder

Proaktif 7/24 monitoring + uyarı dashboard + aylık health report dahil olmalı.

### 10. "Hangi raporları düzenli alacağım?"

Standart rapor seti:
- Aylık ticket özeti (kaç ticket, çözüm süresi)
- Yedekleme başarı raporu
- Güvenlik olay raporu
- Patch compliance raporu
- Hizmet kullanım metrikleri

Sadece fatura gelen MSP = kara kutu = yönetim sıkıntı duyar.

---

## Bölüm 3: Fiyat ve Ticari Model (Soru 11-14)

### 11. "Fiyatlandırma modeli nedir?"

Yaygın modeller:
- **Flat per-user monthly** (kullanıcı × ücret): Basit, öngörülebilir, KOBİ için iyi
- **Tiered**: Temel/orta/üst paketler
- **À la carte**: Her hizmet ayrı, karmaşık ama esnek
- **Block hours**: Ayda X saat, aşan saat fatura

**Kırmızı bayrak**: "Görüşürüz" — net fiyat vermeyen MSP, müşteriye göre fiyatlandırma yapıyor — potansiyel müşteri şüphe etmeli.

### 12. "Sözleşme süresi ve çıkış şartları?"

Tipik:
- **1 yıl** başlangıç sözleşmesi
- **60-90 gün** çıkış için ön bildirim
- Yıllık yenileme opsiyonu

**Kırmızı bayrak**: "5 yıl taahhüt" + "çıkış ücreti" — müşteriyi kilitleyen sözleşme.

### 13. "Çıkışta dokümantasyon + credential'lar bana teslim edilir mi?"

En kritik soru. Eğer sözleşme biterken:
- Tüm sistem passwordları size teslim edilmiyorsa
- Dokümantasyon verilmiyorsa
- Logları alamıyorsanız

...yeni MSP ile geçiş cehenneme dönüşür. Bu madde sözleşmede net yazılmalı.

### 14. "Yıllık fiyat artışı öngörüsü?"

Enflasyon dönemlerinde kritik. Sözleşmede:
- Sabit mi (infla riski MSP'de)?
- TÜFE'ye bağlı mı?
- Yıllık max %X mi?

Net olmayan = her sene sürpriz zam.

---

## Bölüm 4: Şeffaflık ve Güven (Soru 15-18)

### 15. "Referans müşteri listesi alabilir miyim?"

İyi MSP 3-5 referans müşteri verir (yazılı onaylı). Arayıp:
- Gerçekten memnun musunuz?
- Kritik olay olduğunda nasıl yönettiler?
- Ne kadar süredir çalışıyorsunuz?

**Kırmızı bayrak**: "Gizlilik var, referans veremeyiz" — hiç mi memnun müşteriniz yok?

### 16. "Sigorta durumunuz nedir?"

Professional indemnity (mesleki sorumluluk) sigortası olmalı:
- MSP'nin hatası sonucu şirketinize zarar gelirse (yanlış firewall kuralı → veri sızıntısı) sigorta karşılayabilir
- Türkiye'de standart minimum 5 milyon TL kapsam

**Kırmızı bayrak**: Sigortasız MSP — risk hemen sizde.

### 17. "Alt yüklenici kullanıyor musunuz?"

Küçük MSP'ler bazı işleri dışarı yaptırır (örn. kablolama, özel yazılım entegrasyonu). Bu normal ama:
- Kim alt yüklenici?
- Sizle aynı SLA mı veriyorlar?
- KVKK açısından veri işleyen tanımı yapılmış mı?

### 18. "Data breach / ransomware durumunda sorumluluğunuz?"

Sözleşmede limit of liability (sorumluluk sınırı) olmalı. Genelde:
- Aylık fatura × 3 (düşük, MSP lehine)
- Aylık fatura × 12 (orta)
- Sigorta kapsamı kadar (ideal)

Eğer MSP "biz sorumlu değiliz, tüm risk sizde" diyorsa — bu onunla çalışma sebebi değil, çalışmama sebebi.

---

## Bölüm 5: Kültür ve Uzun Vade (Soru 19-20)

### 19. "İletişim kanallarınız nasıl?"

Olası ihtiyaçlar:
- **Ticket sistemi** (Freshservice, Jira)
- **Slack / Teams** entegrasyon (hızlı soru)
- **Telefon / WhatsApp** acil için
- **E-posta** standart

MSP kendi ticket sisteminde durumu takip edebilmeli, size görünür olmalı.

### 20. "Personel turnover oranınız nedir?"

Sizinle çalışan teknisyen 1 ay sonra giderse = projenin başa sarması. MSP'nin personel sürdürülebilirliği kritik.

- Teknisyen turnover yıllık < %15 sağlıklı
- %30+ = ya iş ortamı kötü ya MSP büyüme yönetemiyor

---

## Kırmızı Bayraklar Özeti

Aşağıdakilerden 2+ işareti varsa alternatif arayın:

❌ Sabit fiyat vermez, "duruma göre" der  
❌ Referans paylaşmaz  
❌ SLA'yi yazılı vermeye çekinir  
❌ Sözleşme 3+ yıl kilit + yüksek çıkış ücreti  
❌ Tek marka distribütörü (objektiflik yok)  
❌ Sertifika yok, "deneyimimiz yeterli" der  
❌ Sigorta yok veya sorulmadıkça söylemez  
❌ Aynı personel 6 ayda bir değişiyor  
❌ Şirket web sitesi çok jenerik, kurumsal detay yok  
❌ Sadece fiyat pazarlık ediyor, süreç konuşmuyor  
❌ Yönetici (C-level) hiç görüşmüyor, sadece satışçı  
❌ "Hiç problem yaşamayız" iddiası — gerçekçi değil

---

## Yeşil Bayraklar (İyi İşaret)

✅ SLA yazılı, ödül-ceza mekanizmalı  
✅ Referanslar açık, arama yapabiliyorsunuz  
✅ Kendi boyutunuza benzer müşteriler var  
✅ Sertifikalı teknik ekip + sürekli eğitim yatırımı  
✅ Kimseye bağımlı olmadığı vendor-agnostic yaklaşım  
✅ Şeffaf fiyat + dahili/harici işler listesi net  
✅ Proaktif monitoring + aylık raporlar  
✅ Incident Response runbook standart müşteri operasyonunda  
✅ KVKK + ISO 27001 kendi uyum durumu ile örnek  
✅ Çıkış şartları makul, dokümantasyon teslimi garanti  
✅ Yöneticilerin süreçte görüşmeye açıklığı  
✅ Teknik blog + içerik üretiyor (= uzmanlık kanıtı)

---

## Karar Matrisi

Son adım — 3 MSP'yi karşılaştırın:

| Kriter | Ağırlık | MSP A | MSP B | MSP C |
|---|---|---|---|---|
| Teknik Yetkinlik | %20 | 8 | 7 | 9 |
| SLA ve Yanıt | %15 | 7 | 9 | 8 |
| Fiyat/Değer | %15 | 9 | 7 | 6 |
| Referans Kalitesi | %10 | 6 | 8 | 9 |
| Şeffaflık | %10 | 8 | 7 | 9 |
| Çıkış Şartları | %10 | 5 | 9 | 8 |
| Sigorta | %5 | 7 | 8 | 9 |
| Kültür/Uyum | %10 | 7 | 7 | 8 |
| Raporlama | %5 | 6 | 8 | 9 |
| **Ağırlıklı Skor** | | **7.1** | **7.7** | **8.2** |

Sadece en ucuzu değil, en değerli'yi seçin.

---

## Pilot Dönem Öneri

Üç aylık "pilot" ile başlayın:
- Tam sözleşme yerine küçük scope (helpdesk veya tek bir proje)
- 3 ay sonra "sürüklendi mi, SLA tutar mı?" değerlendirme
- Memnunsanız tam sözleşme

Büyük MSP'lerin bazıları pilot kabul etmez ama orta ölçekli olanlar esnektir.

---

## Kendi Ekibimizle Geç Olan Karar

Eğer şu anki MSP'niz:
- Ticket cevap süresi > 8 saat
- Aylık raporu yok
- Proaktif monitoring yok
- Geçen yıl aynı problem 3 kez yaşandı
- Sözleşme bitişi 90 gün içinde

...değişmek için **en iyi zaman şu andır**. Migration 2-3 ay sürer, yeni sözleşme öncesi planlanmalı.

---

**Mevcut MSP'nizi değerlendirmek veya alternatif arıyor musunuz?** Kozyatağı Bilişim olarak ücretsiz IT sağlık kontrolü + mevcut altyapı değerlendirmesi sunuyoruz. "Biz size uygun muyuz?" sorusuna objektif cevap vermeye çalışıyoruz — bazen "size bordrolu IT daha uygun" dediğimiz de oluyor. [Ücretsiz keşif görüşmesi.](/#contact)
