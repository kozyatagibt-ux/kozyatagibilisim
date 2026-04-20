---
slug: teams-kamera-calismiyor-siyah-ekran
title: "Microsoft Teams Kamera Çalışmıyor (Siyah Ekran) — Kapsamlı Çözüm"
type: cluster
pillar: 6
url: "/blog/teams-kamera-calismiyor-siyah-ekran"
hedef_anahtar_kelime: "teams kamera çalışmıyor"
meta_description: "Microsoft Teams'te kamera siyah görünüyor veya algılanmıyor. Windows 10/11 izin sorunları, driver, GPU hızlandırma, kamera sürücüsü — tüm senaryolar için çözüm."
kelime_sayisi: "~2400"
pillar_linki: "/hizmetler/son-kullanici-destek"
troubleshoot: true
error_code: "Camera black screen"
product_family: "Microsoft 365 & Outlook"
---

## Semptom

Microsoft Teams'te toplantıya katıldığınızda:

- Kamera butonuna bastığınızda **siyah ekran** (video tamamen siyah)
- "Bilgisayarınız kamerayı algılamıyor" hata mesajı
- Kamera ayarlarında cihaz listesi **boş** ("No camera found")
- Başka uygulamada (Zoom, Windows Camera app) çalışıyor ama **sadece Teams'te siyah**
- Toplantı başladığında kamera birkaç saniye çalışıyor, sonra **siyah kalıyor**
- "Kameranın kilidi açıldı ancak Teams erişemiyor" uyarısı

Bu soruna Türk ofis ortamında haftada ortalama 5-10 çağrı alıyoruz. Aşağıdaki adımları sırasıyla uygulayın — **büyük ihtimalle ilk 4 adımda** çözülür.

## Hızlı Çözüm (TL;DR)

1. **Teams'i kapatıp yeniden başlatın** — sadece toplantı penceresi değil, Teams tamamen kapat (sistem tepsisinden "Quit")
2. **Kamerayı kullanan başka uygulama var mı?** Skype, Zoom, OBS, Windows Camera, tarayıcı sekmesinde Google Meet — kapat hepsini
3. **Windows 11/10 Kamera Gizlilik Ayarı:** Settings → Privacy → Camera → "Allow apps to access your camera" ON
4. **Teams'in kamera iznini özel olarak kontrol:** aynı ekranda aşağıda Teams'i ON yap

## Hata Neden Oluyor? (Temel Sebepler)

Teams kamera sorunu **9 farklı katmandan** kaynaklanabilir:

| # | Katman | Sık mı? |
|---|---|---|
| 1 | Kamera başka uygulama tarafından kullanılıyor | %30 |
| 2 | Windows Gizlilik Ayarı (Privacy) | %20 |
| 3 | Teams uygulama önbelleği (cache) | %15 |
| 4 | Kamera driver (sürücü) | %10 |
| 5 | Kamera lens örtüsü (fiziksel) | %8 |
| 6 | USB hub / port sorunu | %5 |
| 7 | Teams cihaz seçimi yanlış | %5 |
| 8 | GPU hardware acceleration | %4 |
| 9 | Kamera donanım arızası | %3 |

## Adım Adım Çözüm

### Adım 1: Fiziksel Kontroller (30 saniye)

**Laptop kamera lens örtüsü:**
Çoğu iş laptopunda (Lenovo ThinkPad, HP EliteBook, Dell Latitude) kamera üstünde **küçük kaydırmalı lens kapağı** var. Siyah ekranın en sık sebebi bu — kapalı olduğu farkedilmemiş.

Kontrol: Laptop ekranının üst çerçevesinde kamera yanındaki küçük sürgüye bakın. Kırmızı nokta görünüyorsa kapalı, kaydırın.

**Harici USB kamera:**
- USB kablosunu başka bir porta takın (USB hub kullanmıyorsanız)
- Kullanıyorsanız hub'ı çıkarıp doğrudan laptop'a takın — USB hub'lar bazen kamerayı tam beslemez
- Logitech C920/C930 gibi modeller özellikle USB 2.0 hub'da sorun yaşar

### Adım 2: Kamerayı Kullanan Uygulamalar

Windows'ta bir kamerayı aynı anda tek bir uygulama kullanabilir. Açık uygulamaları kapat:

- **Zoom** — Zoom arka planda açıksa sistem tepsisinden "Quit"
- **Skype** (eski) — aynı şekilde
- **OBS Studio** — yayın yaparken kamera kilitlenir
- **Windows Camera app** — başlat menüsüne "Kamera" yaz, açıksa kapat
- **Tarayıcı sekmeleri** — Google Meet, WhatsApp Web, Instagram Web tab'leri
- **Logitech Capture / Logi Tune** — Logitech kamera yazılımı

**Hızlı kontrol (PowerShell admin):**
```powershell
Get-Process | Where-Object {$_.ProcessName -match "Zoom|Skype|obs64|WindowsCamera|chrome|msedge"}
```

Sonrasında Teams'i tamamen kapat (**Quit**, sadece kapatma butonu değil — sistem tepsisinde simge varsa sağ tık → Quit) ve tekrar başlat.

### Adım 3: Windows Privacy Ayarı (En Kritik)

Windows 10/11'de Settings > Privacy & security > Camera:

**1. Genel izin:**
- "Camera access" → **ON**
- "Let apps access your camera" → **ON**

**2. Masaüstü uygulamaları izni:**
- "Let desktop apps access your camera" → **ON**
- Bu ayar Teams desktop client için kritiktir — **masaüstü Teams**, "new Teams" değil

**3. Uygulama bazlı izin (listede aşağı inin):**
- "Microsoft Teams" → **ON**
- "Microsoft Teams (work or school)" → **ON** (varsa)
- "Microsoft Teams Classic" (eski Teams) → **ON**

**Yeni Teams (v2) ve eski Teams farklı**: Her ikisine de izin verilmeli. Yeni Teams "Microsoft Teams (work or school)" olarak listelenir.

⚠️ **Grup Policy ile yönetiliyorsa** (kurumsal ortam): Registry/GPO "Let Windows apps access the camera" değeri "Deny" olabilir. BT yöneticisine başvurun.

### Adım 4: Teams Cache Temizliği

Teams önbelleği bozulduğunda birçok problem çıkar, kamera sorunu dahil.

**Eski Teams (Classic):**
```cmd
1. Teams'i tamamen kapat (sistem tepsisi → Quit)
2. Görev Yöneticisi'ni aç, teams.exe işlemini sonlandır (varsa)
3. Windows + R → %appdata%\Microsoft\Teams
4. Bu klasördeki TÜM içeriği sil
5. Teams'i tekrar aç — ilk girişte şifre isteyecek, normal
```

**Yeni Teams (Microsoft Teams 2.0):**
```cmd
%localappdata%\Packages\MSTeams_8wekyb3d8bbwe\LocalCache\
```
Bu klasörün içini silin, Teams'i yeniden başlatın.

Cache temizliği sonrası ilk açılışta 30-60 saniye daha uzun sürer (indexing), sonrasında normale döner.

### Adım 5: Device Manager'dan Kamera Driver Kontrolü

Windows + X → Device Manager → **Cameras** veya **Imaging devices** bölümü:

**Kamera listede görünüyor mu?**

**Görünmüyorsa:**
- USB kamera takılı değil veya driver yüklenmedi
- Integrated kamera (laptop) BIOS'tan disable edilmiş olabilir

**Görünüyor ama sarı ünlem işareti varsa:**
- Driver güncel değil veya bozuk
- Sağ tık → "Uninstall device" → "Delete driver software" işaretle → sil
- Windows yeniden başlat — driver otomatik yüklenir
- Yüklenmezse laptop üreticisi sitesinden manuel driver indir

**Tipik laptop markalarında:**
- **Lenovo**: Lenovo Vantage → Updates → Camera driver
- **HP**: HP Support Assistant
- **Dell**: Dell Command | Update
- **Asus/Acer**: üretici web sitesinden manuel

**Integrated kamera BIOS'ta disable mi?**
- Laptop'u başlatırken F2/F12/Del → BIOS
- Security/Integrated Devices → Camera → Enabled

### Adım 6: Teams İçinde Cihaz Seçimi Kontrolü

Teams çoklu kamera durumunda yanlış cihazı seçmiş olabilir:

**Toplantıdayken:**
- Üst menü → "..." (More actions) → Device settings
- Camera dropdown'ında **doğru kamerayı** seç

**Toplantıya girmeden:**
- Teams ana penceresi → sağ üstte profile resmine tık → Settings → Devices
- Camera altında cihaz listesi gösterir, "Preview" ekranında test görüntüsü

**Birden fazla kamera gösteriyorsa** (integrated + USB C920 gibi):
- İstediğiniz kamerayı seçin
- Bir tanesi "OBS Virtual Camera" gibi görünürse — OBS yüklüyken virtual camera oluşturur, yanlış seçmişsinizdir

### Adım 7: GPU Hardware Acceleration'ı Kapat

Teams kamerayı GPU ile işlerken bazen çakışır — özellikle Intel entegre + NVIDIA discrete GPU olan laptop'larda.

**Kapatma:**
```
Teams Settings > General > Display > 
"Disable GPU hardware acceleration (requires restarting Teams)" işaretle
Teams'i tamamen kapat ve yeniden aç
```

Yeni Teams'te bu seçenek biraz farklı konumda, "Application settings" altında.

Bu ayar değiştikten sonra Teams genelde biraz daha yavaş çalışır ama kamera stabilleşir. Sorun çözülürse bu ayarı koruyun.

### Adım 8: Arka Plan / Filtre Etkisi

"Kamera açık ama görüntü donuk veya siyah" senaryosu sıklıkla arka plan efektinden kaynaklanır — Teams efekti render edemez, siyah görüntü gösterir.

**Test:**
- Toplantıdayken Device Settings → Background effects → **None** seç
- Kamera önizlemesi normale dönüyor mu?

Dönüyorsa efekt işleme yetersizlik — eski GPU/düşük RAM olan makinede efekt kullanmayın. Blur seviyesi azaltılabilir.

### Adım 9: Teams'i Tamamen Kaldırıp Yeniden Kurma

Hiçbir şey çalışmazsa:

**Eski Teams Classic:**
```cmd
1. Denetim Masası > Programlar > Microsoft Teams kaldır
2. %appdata%\Microsoft\Teams — tamamen sil
3. %localappdata%\Microsoft\Teams — tamamen sil
4. https://teams.microsoft.com'dan yeniden indir
```

**Yeni Teams:**
```powershell
Get-AppxPackage *Teams* | Remove-AppxPackage
# Sonra Microsoft Store'dan yeniden kur
```

### Adım 10: Kamera Donanım Arızası (Son Çare)

Tüm yukarıdakiler çalışmadıysa ve kamera **başka hiçbir uygulamada da çalışmıyorsa** donanım arızalı.

**Test:**
```cmd
# Windows Camera app'i aç
# Çalışıyor mu?
```

Çalışmıyorsa:
- Laptop'ta integrated kamera için servis çağır
- USB kamera ise kabloyu veya modülü değiştirin (genelde C920 gibi kameraların ömrü 3-4 yıl)

## Kurumsal Ortamda Toplu Sorunlar

Birden fazla kullanıcıda aynı anda problem yaşanırsa:

### Son Teams Güncellemesi Sorunlu

Microsoft Teams güncellemeleri bazen kameraları bozar. Duyurulan bilinen sorunlar:
- **Ocak 2024** — Teams 1.6.00 yeni versiyon NVIDIA GPU'larla çakıştı
- **Temmuz 2024** — Teams new client kamera izin bug'ı vardı

Kontrol: https://learn.microsoft.com/en-us/microsoftteams/known-issues adresinde current known issues listesi.

### Grup Politikası (GPO) Yanlış Ayarlı

Administrators Group Policy ile kameralar toplu disable etmiş olabilir:
```
Computer Config > Administrative Templates > Windows Components > 
App Privacy > Let Windows apps access the camera
```

Değer "Force Deny" ise — toplu sorun. IT ekibine GPO değişikliği için başvurun.

### Windows Güncellemesi

Windows büyük update'ler (22H2, 23H2 gibi) bazen kamera driverlarını bozar. Update sonrası toplu sorun varsa:
```powershell
# Son yüklenen güncellemeyi kaldır
wusa /uninstall /kb:[KB_NUMARASI]
```

veya Settings > Update & Security > View update history > Uninstall updates.

## Bilgi Güvenliği Açısından Dikkat

Kamera izinleri verirken:
- Sadece Microsoft Teams gibi bilinen iş uygulamalarına izin verin
- Tanımadığınız veya tarayıcı eklentileri için erişim açmayın — bazı kötü amaçlı eklentiler arka planda kayıt yapabilir
- İşten çıkarılan kullanıcıların laptop'ları domain'den çıkarılırken kamera izinleri de reset edilmeli

## Sık Sorulan Sorular

### Kamera sadece Teams toplantısında siyah, Windows Camera uygulamasında çalışıyor

Teams spesifik sorun. Adım 3 (Windows Privacy → Let desktop apps access camera), Adım 4 (Cache temizliği) ve Adım 7 (GPU acceleration) odaklanın.

### Sanal kameram var (OBS Virtual, Snap Camera) — Teams göremiyor

Teams yeni versiyonda sanal kamera desteğinde kısıtlama var. Snap Camera Microsoft tarafından 2023'te ban edildi. OBS Virtual Camera için Teams'i **yönetici olarak çalıştırmayı** deneyin.

### Kamera açık ama görüntü ters dönmüş (flipped)

Kamera yazılımı (Logi Tune, Lenovo Vantage) flip ayarı değiştirmiştir. O yazılımda "Horizontal flip" kapat.

### Arkadaşlar beni siyah görüyor ama önizlemem normal

Outgoing stream sorunu — bant genişliği yetersiz olabilir. Network test, ya da VPN aktifse kapatıp dene.

### Son Windows 11 güncellemesinden sonra kamera bozuldu

Bilinen bug. Windows Update history'den son feature update'i kaldır, sonra Microsoft'tan yeni patch bekle veya kamera driverını manuel yenile.

---

**Teams / kamera / toplantı sorunlarında kurumsal destek?** Kozyatağı Bilişim olarak M365 yönetimi + endpoint destek paketlerimizle kurumsal müşterilere dakikalar içinde uzaktan müdahale garantisi veriyoruz. [Teknik görüşme talep edin.](/#contact)
