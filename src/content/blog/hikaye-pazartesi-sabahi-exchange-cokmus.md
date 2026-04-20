---
slug: hikaye-pazartesi-sabahi-exchange-cokmus
title: "O Pazartesi Sabahı: Exchange Sunucusu Çökmüş, Genel Müdür Yolda — Saha Hikayesi"
type: hikaye
pillar: 7
url: "/blog/hikaye-pazartesi-sabahi-exchange-cokmus"
hedef_anahtar_kelime: "exchange server çökmüş pazartesi"
meta_description: "Bir Pazartesi sabahı saat 06:45'te yaşanan gerçek bir Exchange çöküş vakası. Patch Tuesday sonrası restart, database dismount, 180 kullanıcılı ofisin saat saat kurtarılması."
kelime_sayisi: "~2400"
pillar_linki: "/hizmetler/kurumsal-eposta"
hikaye: true
---

## Cuma 18:00 — Her Şey Normal Görünüyordu

Cuma akşamı 180 kişilik bir şirketin BT sorumlusu Mehmet, haftasını kapatmaya hazırlanıyordu. O ayın güvenlik yamaları WSUS'a düşmüş, onay bekliyordu. İçlerinde Exchange Server 2019 için **CU14 security update**'i de vardı.

"Akşam hiçbir kullanıcı yok, sunucular müsait. Patch'leri onayla, reboot'lar otomatik olsun. Pazartesi rahat gelelim."

Mehmet yamaları onayladı, gitti.

Cumartesi gecesi 02:14'te Exchange sunucusu yamaları yükledi, kendini restart etti. SCOM (System Center Operations Manager) yeşil kaldı çünkü servisler tekrar başlamıştı. Görüntü sağlıklıydı.

Ama bir şey ters gitmişti.

## Pazartesi 06:45 — Telefon

Mehmet'in telefonu çaldı. Arayan, genel müdürün asistanı Ayşe Hanım:

> "Mehmet Bey, hiç kimse mail gönderemiyor. Genel müdür 7:15'te yatırımcı toplantısına girecek, son dakika sunumunu göndermesi lazım. Hiçbir şey gitmiyor. Alma da yok sanırım. Olanlar 3 gün önceden görünüyor."

Mehmet'in kahve henüz hazır değildi. Koşarak masaüstü bilgisayarına gitti, VPN'e bağlandı.

**İlk kontrol: Outlook'u aç.**

Sağ alt: **"Disconnected"**.

**İkinci kontrol: OWA.**

`https://mail.firma.com.tr/owa` → "503 Service Unavailable"

Sıkıntı kesinleşti.

## 06:52 — Sunucuda Ne Oluyor?

RDP ile Exchange sunucusuna bağlandı. İlk gördüğü: **event viewer kırmızı**. Son 12 saatlik kümülatif error:

```
Event ID 1005 (MSExchangeTransport)
The Microsoft Exchange Transport service terminated unexpectedly. 

Event ID 1023 (MSExchangeIS)
Information Store: Unable to mount database "Mailbox Database 01".
Error 0x80004005. 

Event ID 9660 (MSExchangeRepl)
Mailbox Database 01 is in Dirty Shutdown state.
```

"Dirty shutdown." Bu kelimeyi gördüğünde midesine indi.

Dirty shutdown, database düzgün unmount olmadan sunucunun kapandığı anlamına gelir. Transaction log dosyaları (`.log`) ile database dosyası (`.edb`) senkronize değil — database mount olmuyor.

Mehmet Exchange Management Shell'i açtı:

```powershell
Get-MailboxDatabase -Status | Select Name, Mounted, LastFullBackup
```

Çıktı:
```
Name            Mounted  LastFullBackup
----            -------  --------------
MailboxDB01     False    Friday 18:00
MailboxDB02     False    Friday 18:00
MailboxDB03     True     Friday 18:00
```

Üç DB'den ikisi down. 120 kullanıcının maili erişilemez. Üçüncü DB (yönetim ve finans) ayakta — ama içinden mail gönderemiyorlar çünkü transport servisi çökmüş.

## 07:05 — "Basit" Çözüm Deneme

Tipik cevap: `Mount-Database`. Deneyelim:

```powershell
Mount-Database "MailboxDB01"
```

Cevap:
```
Mount-Database : Database 01 couldn't be mounted. 
Error: An internal error occurred.
Error code: 0x80004005
```

Log dosyalarına bak:

```powershell
eseutil /mh "D:\ExchangeDatabases\DB01\MailboxDB01.edb"
```

Çıktı:
```
State: Dirty Shutdown
Log Required: 125 (0x7d) - 126 (0x7e)
```

İki transaction log eksik. 125 ve 126 numaralı log'lar. Yama sırasında bu log'lar database'e commit edilmeden sunucu restart olmuş.

Mehmet log klasörüne baktı: `D:\ExchangeLogs\DB01\`

Orada vardı: `E00000000125.log`, `E00000000126.log`. Gözü parladı. "Oh, log'lar duruyor. Soft recovery yaparız."

```powershell
eseutil /r E00 /l "D:\ExchangeLogs\DB01" /d "D:\ExchangeDatabases\DB01"
```

Çalıştı. Birkaç dakika sürdü, sonra:
```
Operation completed successfully with 0 errors
```

Tekrar dene:
```powershell
Mount-Database "MailboxDB01"
```

**Mount oldu.** Mehmet derin nefes aldı.

İkinci DB için aynı süreç:
```powershell
eseutil /r E01 /l "D:\ExchangeLogs\DB02" /d "D:\ExchangeDatabases\DB02"
Mount-Database "MailboxDB02"
```

Bu sefer başarısızdı. Log 134 eksikti. Log klasöründe yoktu.

Genel müdür 25 dakika sonra toplantıya girecekti.

## 07:20 — Eksik Log Log'u

Log 134 neden yok? Mehmet olayın zamanını takip etti:
- **Cumartesi 02:14** → Restart
- **Cumartesi 02:09** → Son log yazımı

Yama yükleyici restart'ı fazla hızlı tetiklemiş. Exchange transport servisi sonlandı ama bir log dosyası flush edilmeden önce sistem reboot olmuş. Log kayıp — fiziksel olarak diskte yok.

Hard recovery (soft recovery başarısızsa) **transaction log olmadan mount etmek** demek, ama **son transaction'lar kaybolur**. DB düzelir ama Cumartesi gecesinden beri gelen mailler kayıp olabilir.

Zor karar:
- **Hard recovery** → DB açılır, veri kaybı (~5-10 saat maillik)
- **Backup'tan restore** → Cuma 18:00 yedekten — 60 saatlik mail kayıp, ama daha güvenli restore

Mehmet genel müdürün asistanı Ayşe'yi aradı:

> "Ayşe Hanım, genel müdüre iletin lütfen. İki seçenek var. Kararı beş dakika içinde vermem lazım."

## 07:25 — Karar ve Uygulama

Genel müdür hızlı kararını bildirdi: **"Hard recovery yap. 5-10 saatlik mail kaybı, 60 saatten iyi."**

Mehmet şunu çalıştırdı:

```powershell
eseutil /p "D:\ExchangeDatabases\DB02\MailboxDB02.edb"
```

`/p` parametresi "repair". DB içindeki tutarsızlıkları düzeltir, ama **veri kaybı içerir** — bozuk page'lar silinir. 45 dakika sürdü.

Paralel olarak Mehmet Exchange 2019 CU14 için Microsoft'un release notes'unu açtı. Kısa bir arama: "CU14 dirty shutdown patch restart". Aradığı bilgi çıktı: **Microsoft KB5027222 — "Do not let patch installer restart Exchange server while Information Store service is running. Shutdown Exchange services manually first."**

Bunu Mehmet daha önce okumamıştı. Cuma yaması onaylarken standart bir "routine security patch" olarak işlemlemişti.

08:15'te `eseutil /p` bitti. Mount denemesi:

```powershell
Mount-Database "MailboxDB02"
```

**Mount oldu.**

Transport servisi restart:
```powershell
Restart-Service MSExchangeTransport
```

Test: Yeni bir test mail gönder.

**Gitti.**

## 08:30 — Normalleşme

OWA açıldı. Outlook kullanıcıları otomatik reconnect oldu. Transport queue'da birikmiş 4200 mail aktıkça akmaya başladı.

Mehmet Ayşe'yi tekrar aradı:
> "Ayşe Hanım, mail sistemi geri geldi. Ama uyarayım: Cumartesi gecesi 02:00-02:30 arası gelen bazı mailler kayıp olabilir. O aralıktaki mailleri göndermiş olan kişilere ulaşıp tekrar göndermelerini rica edin."

Genel müdür 09:00 toplantısına maili göndererek girdi. Mail'in 7:18'de attığı kayıp olabilir miydi? Kontrol ettiler — o saat Cuma 18:00 yedeği sonrasındaydı, öncekinden yoktu. Kayıp yoktu.

Toplam downtime: **1 saat 45 dakika.** 120 kullanıcı, sabah rush hour'una isabet etti.

## 09:30 — Post-Mortem Başlıyor

Mehmet ikinci kahvesini içerken Kevin'i açmaya karar verdi. Bu olay bir daha yaşanmamalıydı. Analiz:

### Ne Yanlış Gitti?

1. **WSUS otomatik onay kuralı Exchange'i de kapsıyordu**. Exchange yamaları için özel policy yoktu.
2. **Patch installer restart order'ı Exchange-aware değildi**. Microsoft'un dokümantasyonu açık ama kullanılmamıştı.
3. **Backup doğru ama restore test edilmemişti.** DB mount failure senaryosunu simüle etmemişti.
4. **Runbook (olay müdahale dokümanı) yoktu**. Mehmet her şeyi hafızasından ve Stack Overflow aramalarından yapıyordu.

### Hemen Yapılanlar

O hafta içinde:

1. **WSUS'ta Exchange server için özel grup oluşturuldu**. Otomatik onay kapatıldı. Manuel onay + kontrollü pencere.
2. **Exchange patching runbook yazıldı.** 8 sayfa. Exchange servislerini graceful durdurma, database'leri dismount etme, snapshot alma, yama yükleme, sağlık kontrolü.
3. **DAG (Database Availability Group) fizibilitesi açıldı.** İkinci Exchange sunucusu + DAG ile Mount failure olunca otomatik failover. Maliyet: ~180 bin TL hardware + lisans. Onaylandı.
4. **Aylık restore test çizelgesi.** Her ay farklı bir DB'nin sandbox ortamında restore + mount testi.
5. **Microsoft Premier Support değerlendirmesi.** Hotline + proactive service.

## 12:00 — Ayşe'nin Öğleden Sonra Ziyareti

Genel müdürün asistanı Ayşe o öğleden sonra Mehmet'in masasına geldi. Elinde bir çikolata kutusu vardı.

> "Mehmet Bey, genel müdürün teşekkürü. Sabah 25 dakikada geri getirdiniz. O toplantı bizim için önemliydi, sunum gittiği için iş bağlandı."

Mehmet gülümsedi. Ama içten içe bir şey biliyordu: 25 dakika değil, 1 saat 45 dakika olmuştu. Ve o 1 saat 45 dakika dahi onu aylarca rahatsız edecek bir şeye dönüştü — kendi altyapısına güvenememek.

## Çıkarılan Dersler — Sizin için özet

Bu hikayeden orta ölçekli Türk şirketlerinin çıkarması gereken 5 ders:

### 1. Patch Management Exchange-aware olmalı

Microsoft Exchange'in yamalanması normal server yamalarından farklıdır. Transport + Information Store graceful stop edilmeden yama yüklenmez. WSUS/SCCM policy'sinde Exchange ayrı grup olmalı.

### 2. Database Availability Group (DAG) kurun

Tek Exchange sunucusu = tek arıza noktası. İkinci sunucu + DAG replication = mount failure'da otomatik failover. Maliyet tek seferlik 150-250 bin TL, değeri milyonlarca TL.

### 3. Aylık restore test şart

"Backup alıyorum" demek yeterli değil. Haftada veya ayda bir, **sandbox'ta** DB mount + mail erişim testi. Kayıt tutulur, denetime sunulur.

### 4. Runbook'u önceden yazın

Kriz anında Stack Overflow'tan araştırmak zaman kaybı. Exchange mount failure, transport queue stuck, network kesintisi gibi senaryolar için 5-10 sayfalık runbook masanızda olmalı.

### 5. Incident Response partner'ınız olsun

Böyle bir an geldiğinde telefonu açtığınızda cevap veren biri olmalı. Biz (Kozyatağı Bilişim) gibi MSP'ler bunun için var — retainer sözleşmesiyle "Pazartesi 6:45'te çağrınıza 15 dakikada yerinde" garantisi.

---

*Bu hikaye, birden fazla gerçek vakadan derlenen kurgusal bir anlatıdır. Kullanılan teknik detaylar, hata kodları ve araçlar gerçektir. Şirket ve kişi isimleri anonimleştirilmiştir.*

**Benzer bir kriz için hazırlıklı mısınız?** Kozyatağı Bilişim Incident Response Retainer programımızla 15 dakika yanıt garantisi, aylık runbook güncellemesi ve proaktif patch management sunuyoruz. [Ücretsiz keşif görüşmesi.](/#contact)
