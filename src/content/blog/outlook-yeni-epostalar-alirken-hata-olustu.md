---
slug: outlook-yeni-epostalar-alirken-hata-olustu
title: "Outlook 'Yeni E-postaları Alırken Hata Oluştu' — Tüm Nedenleri ve Çözümleri"
type: cluster
pillar: 6
url: "/blog/outlook-yeni-epostalar-alirken-hata-olustu"
hedef_anahtar_kelime: "outlook yeni e-postaları alırken hata"
meta_description: "Outlook'ta 'Yeni e-postaları alırken hata oluştu' hatası için 12 olası sebep ve adım adım çözüm rehberi. Exchange, M365, IMAP/POP3 hesapları için."
kelime_sayisi: "~2600"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "0x8004010F / 0x80040115"
product_family: "Microsoft 365 & Outlook"
---

## Semptom

Outlook'un sağ altında (status bar) şu ibarelerden biri görünüyor:

- "Yeni e-postaları alırken hata oluştu" (Error occurred while receiving new emails)
- "Bağlantı deneniyor..." ama bağlanamıyor
- "Gönderilenler ve alınanlar klasörüne erişilemiyor" (0x8004010F)
- "Exchange'e bağlantı kesildi" (Disconnected from Exchange)
- Send/Receive butonuna basınca ekranda **hiçbir şey olmuyor**, mail inbox'a düşmüyor

Bu hata **tek bir nedenden** kaynaklanmaz — Outlook'un en geniş semptomlu sorunlarından biridir. Aşağıdaki adımları **sırasıyla** takip edin; çoğu vakada ilk 3 adımda sorun çözülür.

## Hızlı Çözüm (TL;DR)

1. **Outlook'u kapatıp yeniden başlatın** (File → Exit, 10 saniye bekleyin)
2. **Outlook'u "online" moda alın**: Send/Receive sekmesi → Work Offline butonunu kapatın
3. Sorun devam ediyorsa **Control Panel → Mail → Profile → Repair** çalıştırın
4. Hâlâ yoksa **OST dosyasını silin** (Outlook kapalıyken)

Çoğu kullanıcıda bu 4 adım yeterlidir. Çözmediyse devamını okuyun — kök sebebi bulup kalıcı çözelim.

## Hata Neden Oluyor? (Kök Sebepler)

"Mail alırken hata" semptomu 12+ farklı nedenden kaynaklanabilir. Ama Türk kurumsal ortamında en sık karşılaştığımız 6 senaryoyu analiz edelim:

### Senaryo 1: Outlook Work Offline Modunda Kalmış
Kullanıcı yanlışlıkla (veya bir internet kesintisi sonrası) Work Offline butonuna basmış. Outlook "offline" moddayken sunucuya hiç bağlanmaz, dolayısıyla mail çekemez.

**Nasıl anlarız**: Sağ alt köşede "Çalışmıyor: Çevrimdışı Çalış" (Working Offline) yazar.

**Çözüm**: Send/Receive tab → Work Offline butonunu kapat (toggle). Outlook otomatik bağlanır.

### Senaryo 2: OST Dosyası Bozuk (En Yaygın Sebep)

Exchange/M365 hesapları mailleri yerel makinede **OST** (offline storage) dosyasında cache'ler. Bu dosya 30-100 GB'a kadar büyüyebilir. Dosya **fiziksel olarak bozulursa** (kötü kapanma, disk hatası, ani elektrik kesintisi) Outlook mail senkronize edemez.

**Nasıl anlarız**:
- Outlook "senkronize ediliyor" gösteriyor ama saatlerdir sürüyor
- Event Viewer > Applications and Services Logs > Microsoft Office Alerts'te `OST corruption` kayıtları
- Outlook açılırken alışılmadık yavaşlık

**Çözüm**:
```
1. Outlook'u tamamen kapat (Task Manager'da outlook.exe var mı kontrol et)
2. Dosya konumuna git:
   C:\Users\[kullanici]\AppData\Local\Microsoft\Outlook\
3. [email]-Backup.ost olarak yeniden adlandır (siler gibi olmaz, geri dönebilirsin)
4. Outlook'u aç — yeni OST otomatik oluşacak ve sunucudan baştan senkronize edecek
```

⚠️ **Uyarı**: Büyük posta kutusunda (50GB+) baştan senkronizasyon 4-8 saat sürebilir. Önce Exchange Online'da mail'lerin zaten var olduğundan emin olun; OST silindiğinde sadece yerel cache silinir, gerçek mail bulutta durur.

### Senaryo 3: Network / Firewall Bloğu

Kurumsal ortamlarda firewall Outlook'un kullandığı portları (TCP 443 - HTTPS, TCP 587 - SMTP Submission, TCP 993 - IMAPS) blokluyor olabilir. Özellikle **yeni kurulan laptop** veya **VPN üzerinden çalışma** senaryolarında sık görünür.

**Nasıl anlarız**:
- Sadece belirli bir kullanıcıda veya belirli bir ağdan (örn. misafir Wi-Fi) olur
- Outlook Connection Status (Ctrl+sağ tık Outlook sistem tepsisi simgesine → Connection Status) tüm bağlantılar "Disconnected"

**Çözüm**:
```powershell
# PowerShell ile port testi
Test-NetConnection outlook.office365.com -Port 443
Test-NetConnection smtp.office365.com -Port 587
Test-NetConnection outlook.office365.com -Port 143
```

443 dönmüyorsa firewall/proxy Microsoft 365 endpoint'lerini bloklamıştır. Yapılacak:
1. Firewall'da Microsoft 365 IP/URL listesini whitelist'e ekle (Microsoft [bu listeyi](https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges) yayınlıyor)
2. SSL inspection yapan NGFW varsa Microsoft 365 trafiğini inspection'dan muaf tutun — Microsoft tavsiyesi

### Senaryo 4: Outlook Profile Bozulmuş

Windows Outlook profile'ı bozuk olunca bağlantı deneyimi tutarsız oluyor. Eğer Outlook sürekli "bağlanıyor... bağlantı kesildi... bağlanıyor..." döngüsündeyse profile sıfırlama çözer.

**Çözüm**:
```
1. Control Panel > Mail (32-bit) > Show Profiles
2. Yeni bir profile oluştur (örn. "Outlook-New")
3. Hesabı ekle
4. "Always use this profile" seçeneğine bu yeni profile'ı ata
5. Outlook'u aç — yeni profile ile test et
```

Yeni profile'da sorun yoksa eski profile silinebilir. Sorun varsa profile değil başka bir sebep.

### Senaryo 5: MFA / Modern Authentication Problemi

**M365 tenant'ı Basic Authentication'ı (eski protokol)** kapattıysa ve Outlook eski versiyonlarında Modern Auth devre dışıysa bağlantı kurulamaz.

**Nasıl anlarız**:
- Outlook 2013/2016 kullanıyorsanız ve sürekli "Password required" penceresi gelip gidiyorsa
- Şifreyi doğru girsen bile kabul etmiyorsa

**Çözüm**:
```powershell
# Registry (kullanıcı ayarı):
# HKCU\Software\Microsoft\Exchange

# EnableADAL=1 (Modern Auth aktif)
# AlwaysUseMSOAuthForAutoDiscover=1
```

Ya da daha kolayı: **Outlook'u güncelle**. Microsoft 365 Apps (Click-to-Run) Outlook'lar otomatik günceldir; Outlook 2016/2019 volume license'lar güncellenmemiş olabilir. Volume license versiyonda son Cumulative Update'i yükleyin.

### Senaryo 6: Autodiscover Yanlış Yönlendirme

Kurumsal Exchange on-prem + M365 hibrit ortamlarında en sık görünür. Outlook hesap eklerken **autodiscover.domain.com** DNS kaydına bağlanır; burada yanlışlık varsa Outlook doğru sunucuyu bulamaz.

**Nasıl anlarız**:
```powershell
# PowerShell
nslookup autodiscover.firmaniz.com.tr
# Beklenen: autodiscover.outlook.com (M365 için) veya kendi Exchange sunucunuz
```

SCP (Service Connection Point) yanlış konfigüre edilmişse iç kullanıcılar eski Exchange'e yönlendiriliyor, bulut hesapları bağlanamıyor olabilir.

**Çözüm**: Exchange admin panelinden SCP'yi sıfırlayın veya Group Policy ile Outlook'a "ExcludeScpLookup=1" parametresi verin. Hibrit ortamda karmaşık — IT yöneticisi dahil edilmeli.

## Adım Adım Tam Troubleshoot Akışı

Yukarıdaki senaryolar kök sebeplerdi. Pratik olarak şu sıralamayla ilerleyin:

### Adım 1: Basit Kontroller

- Outlook'u kapat → tekrar aç
- İnternet bağlantısı var mı? (Tarayıcıda bir site açılıyor mu?)
- Office 365 portalına web üzerinden (outlook.office.com) giriş yapabiliyor musun? Evet ise sorun kesin Outlook'ta
- Başka kullanıcılar aynı ofiste aynı sorunu yaşıyor mu? Evet ise network/sunucu kaynaklı
- Work Offline modunda mı? Send/Receive → Work Offline butonu kontrol

### Adım 2: Connection Status Kontrolü

System tray'da Outlook simgesine `Ctrl + sağ tık` yap → "Connection Status". Göreceklerin:

| Sütun | Anlamı |
|---|---|
| Connection | Connected / Disconnected / Reconnecting |
| Server | Hangi sunucu? (outlook.office365.com normal) |
| Version | Exchange sunucu versiyonu |
| Avg. Resp | Yanıt süresi (500ms üstü yavaş) |

Tümü "Disconnected" ise **network seviyesinde sorun**. Bazı satırlar connected bazı değilse **kısmi hizmet kesintisi** (Microsoft tarafı ya da iç mail routing).

### Adım 3: Send/Receive Error Log

`File > Options > Advanced > Send/Receive button > Define Send/Receive Groups > Edit`

Log'u aç: `File > Info > Tools > Clean up old items` yerine aşağıdaki dosyayı kontrol et:

```
C:\Users\[user]\AppData\Local\Temp\Outlook Logging\
```

`OPMLOG.log` dosyasında son 24 saatin bağlantı hataları var. Hata kodunu bu yazının başındaki tabloyla eşleştir.

### Adım 4: SCANPST.EXE (OST / PST Repair)

Outlook'un içinde gelen "Inbox Repair Tool" aracı:

```
Konum (Outlook 365): C:\Program Files\Microsoft Office\root\Office16\SCANPST.EXE
Konum (Outlook 2016): C:\Program Files (x86)\Microsoft Office\Office16\
```

Çalıştırma:
1. Outlook kapalı
2. SCANPST.EXE çalıştır
3. "Browse" → OST/PST dosyasını seç
4. Start → tarar → Repair

**Not**: SCANPST bazen Exchange OST'lerde yetersiz kalır (Microsoft'un kendi aracı sınırlı). Exchange/M365 OST için en sağlam çözüm yeniden oluşturmaktır (Senaryo 2).

### Adım 5: Outlook Safe Mode

Eklentiler (add-in) bazen bağlantıyı bozar. Outlook'u Safe Mode'da aç:

```
Run penceresi: outlook.exe /safe
```

Safe Mode'da sorun yoksa eklenti kaynaklı. `File > Options > Add-ins > Manage: COM Add-ins > Go` penceresinden eklentileri tek tek devre dışı bırakıp test et. Sık sorun çıkaranlar:

- **Webex Productivity Tools**
- **GoToMeeting**
- **Adobe Acrobat PDFMaker**
- **Eski antivirus email scan eklentisi**
- **Hubspot/Salesforce CRM entegrasyonları**

### Adım 6: Profile Reset (Ağır Top)

Yukarıdakiler çalışmadıysa profile sıfırlama:

```
1. Control Panel > Mail (Microsoft Outlook 2016) (32-bit)
2. Show Profiles > Add > yeni profile adı
3. Hesap ekle (Autodiscover ile otomatik)
4. "Always use this profile" altında yeni profile'ı seç
5. Outlook'u başlat
```

Yeni profile'da sorun yoksa eski profile bozuktu, silinebilir.

### Adım 7: Outlook Yeniden Kurulum

Son çare:

```powershell
# Office Uninstall Support Tool:
# https://aka.ms/SaRA-officeUninstallFromPC

# Kaldırdıktan sonra
# Office 365 portalından tekrar yükle
```

⚠️ Yeniden kurulum sonrası önceki profile ayarları silinir; tekrar eklemek gerekir.

## Kurumsal Ortamda Toplu Sorunlar

Eğer **birden fazla kullanıcıda aynı anda** bu hata oluşuyorsa Microsoft 365 service health'i kontrol edin:

- https://status.office365.com/
- Admin Center > Service Health

Son 30 günde Türkiye'yi etkileyen Exchange Online incident'ları genelde burada raporlanır. Microsoft problemi çözene kadar (genelde 1-6 saat) beklemek gerekir.

**İç IT sorumluluğundaki sorunlar** (tek tek kullanıcı değil, toplu):
- Azure AD Connect senkronizasyon gecikmiş
- Hybrid ortamda Exchange on-prem server arızalı
- Firewall Microsoft 365 IP'lerini bloklamış
- Gün içinde lisans değişmiş (örneğin "Exchange Online Plan 1" kaldırılmış)

## Nasıl Tekrar Olmaması Sağlanır?

**Bireysel kullanıcı seviyesinde:**
- Outlook'u düzgün kapatın (File > Exit), X butonu değil — özellikle OST büyükse
- Disk doluluğu %85 altında kalsın (Outlook cache kırılıyor)
- Windows ve Office güncellemelerini kaçırmayın

**IT yönetimi seviyesinde:**
- OST boyutunu GPO ile 50 GB üstüne çıkarmayın (Cached Exchange Mode 24 ay yerine 12 ay ayarı)
- Microsoft 365 endpoint listesini aylık firewall whitelist'inde güncelleyin
- Outlook Crash Dump'larını toplayan bir monitoring kurun (Microsoft Defender for Endpoint bu işi yapabilir)
- Yeni cihaz kurulumlarında Autodiscover test'ini checklist'te tutun

## Sık Sorulan Sorular

### 1. OST dosyasını silersem mail'lerim kaybolur mu?

Hayır. OST sadece yerel cache; tüm mail'ler Exchange/M365 sunucusunda durur. Silindiğinde yeniden oluşturulur ve senkronize edilir. Ancak **henüz gönderilmemiş ama "Outbox"'ta bekleyen** mail varsa dikkat — OST'de tutulur. Önce mail'in gönderildiğinden emin olun.

### 2. Outlook "hesap eklenirken otomatik yapılandırılamıyor" hatası veriyor

Autodiscover çalışmıyor. Manuel kurulum:
```
E-posta: ad@firmaniz.com.tr
Manuel config:
- Server: outlook.office365.com (M365 için)
- IMAP: outlook.office365.com:993 SSL
- SMTP: smtp.office365.com:587 STARTTLS
```

### 3. OWA (outlook.office.com) çalışıyor ama masaüstü Outlook çalışmıyor

%95 ihtimalle yerel Outlook problemidir — profile veya OST. Web çalışıyorsa sunucu tarafı sağlam. Profile reset yapın.

### 4. "Yanıt vermiyor" (Not Responding) sürekli oluyor

OST dosyası şişmiş (20GB+ normal değil). Archive politikası kurmanız veya OST boyutunu düşürmeniz gerek. M365'te "Online Mode" (cache'lemeden çalışmak) da seçenek ama yavaş.

### 5. Sadece bazı kullanıcılarda oluyor

İnceleyin:
- Aynı departman mı? → Group Policy veya grup izni
- Aynı laptop markası mı? → Driver veya antivirus problemi
- Aynı lokasyon mu? → Network/firewall

---

**Outlook problemlerinde uzaktan destek mi arıyorsunuz?** Kozyatağı Bilişim olarak M365 / Exchange / Outlook altyapı yönetiminde sertifikalı ekibimizle dakikalar içinde uzaktan müdahale sağlıyoruz. Sorununuz 10 dakikada çözülmezse ziyaret ücretsiz. [Teknik görüşme talep edin.](/#contact)
