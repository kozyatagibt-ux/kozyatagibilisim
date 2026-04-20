---
slug: hikaye-tedarikci-usb-ransomware-cumartesi-gecesi
title: "Tedarikçinin Getirdiği USB ve 14 Saatlik Cumartesi Gecesi — Ransomware Saha Hikayesi"
type: hikaye
pillar: 7
url: "/blog/hikaye-tedarikci-usb-ransomware-cumartesi-gecesi"
hedef_anahtar_kelime: "usb ransomware tedarikçi"
meta_description: "Bir üretim firmasında tedarikçi mühendisin PLC programlamak için getirdiği USB'den yayılan ransomware vakası. 14 saatlik kurtarma süreci, OT/IT segmentasyon dersleri."
kelime_sayisi: "~2300"
pillar_linki: "/kobi-siber-guvenlik"
hikaye: true
---

## Cumartesi 19:40 — "Acil Çağrı"

Bir otomotiv yan sanayi firmasının BT sorumlusu Hasan, ailesiyle akşam yemeğinde telefonu çaldığında göz attı — firma numarası. Cumartesi akşamı aranıyorsa iyi bir haber değildir.

Vardiya amiri Murat Bey:
> "Hasan, üretim ekranlarında bir şeyler var. MES çalışmıyor, kasa terminallerinden biri 'dosyalar şifreli' diyor. Bir kırmızı mesaj var ekranlarda. Okuyayım: 'Your files have been encrypted by LockBit 3.0. Contact us within 72 hours.'"

Hasan durdu. Yemeği orta yerde bırakıp arabasına koştu.

Giderken telefonla:
> "Murat Bey, şu an ne yapmamız lazım — hiçbir bilgisayara dokunmayın. Hiçbir USB çıkarmayın, hiçbir kabloyu çekmeyin. Gelmem 25 dakika. Network cihazlarının kapandığı anahtara ulaşabilir misiniz?"

Murat: "Sunucu odasında? Ulaşabilirim ama..."

Hasan: "Şimdi oraya gidin. Core switch ve internet router'ı fiziksel olarak kapatın. Fiş çekin olur. **Fabrika dışıyla iletişimi tamamen kesin.**"

## 20:05 — Hasan Fabrikada

Fabrikaya ulaştığında BT ekibinin iki kişisi (Emre ve Selin) de çağırılmıştı. Sunucu odası karanlık — fiş çekilmişti. Üretim durmuş, nöbetçi mühendisler lobide bekliyorlardı.

İlk görev: **durumu anla, etki alanını tespit et**.

Hasan laptop'unu açtı — **offline**, fabrika Wi-Fi'sine bağlanmadı — ve 4G hotspot ile internete çıktı. Güvenli bir sandbox ortamdan:

**Sorular:**
1. Enfeksiyon hangi saatte başladı?
2. Hangi sistemler etkilendi?
3. Giriş vektörü ne?

Video güvenlik kayıtlarına baktılar. Kameradan:
- **15:22** — Tedarikçi servis mühendisi (KAL Otomasyon çalışanı, İsmail Bey) giriş yapmış
- **15:40** — Üretim hattı 3'teki PLC kabinetinde çalışıyor, laptop'unu HMI ile bağlamış
- **16:50** — Bakım tamamlanmış, çıkış
- **17:10** — Hat 3 operatörü vardiya değişiminde "ekran donuk" demiş, restart yapmış

Emre: "İsmail Bey'in laptop'u virüslü olabilir mi?"

Hasan: "Mümkün. USB çıkardı mı, HMI'a yazılım yükledi mi? HMI'dan LAN'a geçiş mümkün mü?"

Selin: "Hat 3 HMI'sı production ağında. OT ve IT networkümüz teorik olarak ayrı ama... **gerçekten ayrı mı bakalım.**"

## 20:30 — Network Diyagramı İncelenince

Firma "Purdue model"e göre üretim (OT) ve ofis (IT) ağlarını ayırmış olmalıydı. Ama pratikte:

- **Hat 3 HMI** — Production VLAN 400
- **MES sunucusu** — Production VLAN 400 **ve** Office VLAN 100 (çift-hafif sunucu)
- **Office File Server** — VLAN 100

MES sunucusu iki VLAN'a da bağlıydı — bir bacağı production, bir bacağı ofis. Bu sunucuda **yazılımcısı bir kere koymuş** ("ofis ekibine rapor çıkması için") — ama iki ağ segmentini de geçtirme görevi görüyordu.

Saldırı zamanlaması:
- 15:40 — İsmail'in laptop'u HMI'a bağlandı, sessiz enfeksiyon başladı (HMI Windows XP)
- 16:00-17:00 — Ransomware SMB'den lateral movement
- 17:10 — Hat 3 HMI şifrelendi (ilk semptom)
- 17:40 — MES sunucusu — çift VLAN ile "köprü" — enfekte oldu
- 18:00-19:30 — MES'ten ofis file server'a, oradan 12 ofis bilgisayarına yayıldı
- 19:30 — Hepsinde LockBit ekranları

## 21:00 — Hasar Tespiti

Hasan ve ekibi fiziksel olarak tek tek sistemleri kontrol etti:

### Etkilenen:
- **3 HMI** (Hat 2, Hat 3, Hat 5 — hepsi Windows XP)
- **MES server** — çift VLAN'lı köprü
- **File Server** (ofis)
- **ERP uygulama sunucusu** (Logo Tiger)
- **12 ofis bilgisayarı**
- **2 yönetici laptop'u**

### Etkilenmemiş:
- **Domain Controller** (Windows Server 2019, EDR aktif — attack'ı durdurdu)
- **Exchange sunucusu**
- **SQL Server** (Logo veritabanı — ERP uygulamasından ayrı sunucuda)
- **Backup sunucusu** (izole segmentte)
- **Vardiya/planlama bilgisayarları** (farklı VLAN)

### Veri Durumu:
- **Üretim 5 günlük yedek** var (Veeam, offsite replica Azure Blob immutable)
- **ERP DB yedeği** saatlik (3 saat önceki temiz)
- **MES veritabanı** — son yedek Cuma 23:00 — 20 saat veri kaybı olabilir

## 22:30 — Kararlar Silsilesi

CEO geldi (telefonla bilgilendirilmişti). CFO arandı. Yönetim ekibiyle hızlı karar:

### Karar 1: Fidye Ödenmeyecek
- 650 bin dolar talep ediyorlar (~22 milyon TL)
- Şirket cyber insurance var (3 milyon TL limitte) — fidyeyi kapsamıyor
- Hukuki risk: LockBit uluslararası yaptırım listesinde; ödeme OFAC ihlali
- Yedekler temiz — restore mümkün

### Karar 2: KVKK Bildirim
- 72 saat içinde KDK'ya bildirim zorunlu
- Müşteri datası: sipariş geçmişi, ödeme bilgileri — kişisel veri kapsamında
- Avukat çağırılacak, Pazar sabah toplantı

### Karar 3: Restoration Plan
- Pazar günü 06:00-18:00 arası full restore
- Pazartesi 08:00'de üretim başlayabilecek hedef
- Müşteri iletişimi: "Bazı teslimat gecikmeleri olabilir" şeffaf bildirim

## Pazar 00:00 — Restore Başlıyor

Hasan, Emre, Selin + Kozyatağı Bilişim IR (Incident Response) ekibi online katıldı (retainer sözleşmesi vardı).

İş bölümü:
- **Hasan + Selin**: Temiz bir "recovery network" kuruyor — ayrı VLAN, sıfır bağlantı eski infrastructure'a
- **Emre**: File Server restore, Veeam'den DB restore  
- **IR ekibi**: Forensics — giriş vektörünü kesin tespit etmek, backdoor var mı

### 00:00-02:00 — Network Segregation
- Sunucu odasında ikinci (yedek) firewall kuruldu — FortiGate 100F cold spare
- Yeni VLAN 500, 501 oluşturuldu (clean server, clean client)
- Eski infrastructure fiziksel izole — güç açık ama network bağlantısı sıfır

### 02:00-05:00 — File Server + ERP Restore
- Veeam'den Cuma 23:00 yedeği seçildi (son temiz)
- 2.5 TB data → yeni File Server'a restore (3 saat)
- Logo ERP: 600 GB DB → yeni SQL Server, restore + integrity check

### 05:00-08:00 — AD ve Client Restore
- Yeni domain controller kuruldu (farklı NetBIOS adıyla: FABRIKA2 yerine FABRIKA3)
- Kullanıcılar re-created, şifre reset zorunlu
- 12 ofis bilgisayarı **format + fresh install** — temiz client image

### 08:00-12:00 — Üretim Sistemleri
- **Kritik karar**: 3 HMI Windows XP idi — upgrade fırsatı. Windows 10 IoT Enterprise LTSC ile reinstall.
- PLC program yedekleri var — HMI tarafı temiz restore
- MES sunucusu → yeni VLAN 500'e, artık **sadece production trafiği**, ofis ağına erişimi kaldırıldı

### 12:00-16:00 — Sağlık Kontrolü
- Her restore edilen sistemde EDR (CrowdStrike) yüklendi
- Sandbox'ta backup'ın mount olup olmadığı test edildi
- Kritik uygulama testleri: Logo açılıyor mu, MES veri alıyor mu, fatura yazılıyor mu

### 16:00-18:00 — Kullanıcı Kabulü
- Pazartesi gelecek çalışanlara yeni şifreleri hazırla
- Dokümentasyon: "Pazartesi kılavuzu" — yeni sistemde ne yapman lazım

## Pazartesi 07:30 — Üretim Başlıyor

Sabah vardiyası geldi. 8 kişilik BT ekibi (Hasan + yardıma gelen arkadaşlar) helpdesk modunda:
- Şifre sıfırlama
- Yazıcı bağlantısı
- Favori klasöre erişim
- Outlook ilk kurulum

Öğleden sonra 14:00'te şirket üretimde, ofiste çalışma normale. **Toplam kesinti 38 saat** (Cumartesi 17:10'dan Pazartesi 07:10'a + ofis tarafında Pazartesi öğleye kadar).

## Bir Hafta Sonra — Forensics Raporu

Incident Response firmasının 10 gün süren analizi:

### Giriş Vektörü (Kesinleşti)
- İsmail Bey'in laptop'u ransomware taşıyıcısıydı
- Kendi şirket laptop'u değil; İsmail Bey arkadaşından ödünç almış (pazar tatili sırasında kendi laptop'u bozuk), enfekte olduğunu bilmiyor
- Laptop Windows 10, güncel değil, antivirus süresi dolmuş
- Saldırı muhtemelen İsmail'in arkadaşının açtığı bir phishing email'inden gelmiş

### Yayılma Mekanizması
- HMI Windows XP **SMBv1** açık — WannaCry'dan beri bilinen exploit (EternalBlue benzeri)
- Lateral movement için Mimikatz + BloodHound kullanıldı
- LockBit 3.0 cihaz başına ortalama 12 dakikada şifreleme tamamlıyor

### Veri Exfiltration
- Evet — yaklaşık 180 GB outbound trafik tespit edildi
- Müşteri sipariş geçmişi, muhasebe kayıtları, çalışan listesi muhtemelen çalındı
- KDK'ya "olası veri sızıntısı" olarak bildirildi

## Bir Yıl Sonra — Nasıl Değişti?

### Teknik Dönüşüm

1. **Windows XP HMI'lar gitti.** 8 HMI yeni Windows 10 IoT Enterprise LTSC ile değiştirildi. Maliyet: ~240 bin TL. Daha önce "üretici desteklemiyor" deniliyordu — gerçekten üretici (Siemens) modern versiyonlar yapıyormuş.

2. **Gerçek OT/IT segmentasyonu.** MES sunucusu tek VLAN'da. Ofis-üretim arası data transferi **data diode** ile tek yönlü. Waterfall Security çözümü kuruldu (~150 bin TL).

3. **Dış servis laptop policy.** KAL Otomasyon gibi tedarikçi mühendisleri artık kendi laptop'larını üretim ağına bağlayamıyor. Firma **kurumsal "jump laptop"** sağlıyor — temiz, EDR'lı, sadece PLC programlama için.

4. **EDR tüm endpoint'lerde** — CrowdStrike Falcon. Aylık maliyet ~130 TL/kullanıcı.

5. **Backup immutability** — Azure Blob Object Lock + offsite replica. Ransomware silemese bile hasar bu kadar olmazdı.

6. **Network monitoring** — Ortada SIEM (Wazuh, open source + Ermetic paid tier).

### Süreç Dönüşümü

- **Tedarikçi onboarding prosedürü** — her tedarikçinin ekibine yıllık güvenlik eğitimi, cihaz security check, NDA.
- **Incident Response Retainer** — biz dahil 2 MSP ile paralel sözleşme (yedeklilik için).
- **Aylık tabletop exercise** — "ransomware geldiyse" senaryosu simüle ediliyor. 2-3 saatlik toplantı, acil müdahale ekibinin memurileşmesi.
- **Cyber insurance** artırıldı 8 milyon TL'ye.

### Finansal Kayıplar (Toplam)

- Üretim kaybı (2 gün): 3.2 milyon TL
- Restore + donanım + yazılım: 1.8 milyon TL
- Forensics + danışmanlık: 420 bin TL
- KDK para cezası: 1.2 milyon TL (proaktif müdahale nedeniyle düşürüldü)
- Müşteri tazminatı + reputational damage: ~2 milyon TL tahmin
- **Toplam: ~8.6 milyon TL**

Önleyici altyapı maliyeti **6 ay önce yapılsaydı**: 800 bin - 1.2 milyon TL. Saldırının **10'da biri**.

## Çıkarılan Dersler

### 1. OT/IT segmentasyonu gerçek olmalı, kağıt üzerinde değil

"Network diyagramımızda ayrı" demek yetmez. Fiziksel cihazlardaki her NIC kablosunu kontrol et — bir köprü varsa segmentasyon yalandır.

### 2. Legacy sistemler tehdit

Windows XP HMI, Windows 7 CAD workstation, 15 yaşındaki SCADA — "üretici destek vermiyor" mazereti tehlikelidir. Compensating control (VLAN izolasyonu + application whitelisting + USB kilidi) ya da upgrade. İkisi olmayan sistem düşüş zamanını bekliyor.

### 3. Tedarikçi ekipmanı = senin güvenlik duvarında delik

Dış servis mühendisleri, bakım firmaları, danışmanlar — hepsi "kimlik yönetilmemiş" cihazlar getirebiliyor. Kurumsal "clean laptop" sağlamak ya da kiosk + data diode ile dosya transferi.

### 4. Backup immutability zorunlu

Veeam/Synology replika alıyorum demek yetmez. Ransomware admin yetkisiyle replikayı da siler. Object Lock, WORM storage, air-gap — birini uygula.

### 5. Incident Response partner'ın hazır olsun

Cumartesi gecesi 19:00'da kim geliyor sana? Retainer sözleşmeli MSP olmazsa "ertesi gün" bile zor. Biz dahil (Kozyatağı Bilişim), bu retainer'ı 4-8 saat yanıt garantisi ile veriyoruz.

---

*Bu hikaye, birden fazla gerçek Incident Response vakasından derlenen kurgusal bir anlatıdır. Teknik detaylar, tehdit aktörleri, araçlar ve KVKK süreçleri gerçektir. Şirket ve kişi isimleri anonimleştirilmiştir.*

**Cyber Incident Response Retainer programımız mı ilginizi çeker?** Kozyatağı Bilişim olarak 4 saat yanıt garantisi, aylık tabletop drill, yıllık restore test ve 24/7 SOC desteği sunuyoruz. [Ücretsiz keşif görüşmesi.](/#contact)
