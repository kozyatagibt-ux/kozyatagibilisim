---
slug: cannot-start-microsoft-outlook-cannot-open-window
title: "'Cannot start Microsoft Outlook. Cannot open the Outlook window' — Çözüm Hikayesi"
type: cluster
pillar: 6
url: "/blog/cannot-start-microsoft-outlook-cannot-open-window"
hedef_anahtar_kelime: "cannot start microsoft outlook cannot open outlook window"
meta_description: "Outlook açılırken 'Cannot start Microsoft Outlook. Cannot open the Outlook window' hatası. Safe mode, navigation pane reset, OST yeniden oluşturma — adım adım."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Cannot Start Outlook"
product_family: "Microsoft 365 & Outlook"
---

## Sabah 08:30 — "Outlook açılmıyor"

Pazartesi sabahı CFO'dan WhatsApp mesajı:

> "Outlook'um bu sabah açılmıyor. 'Cannot start Microsoft Outlook. Cannot open the Outlook window' diye bir kutu çıkıyor. Tam ekran görüntüsü atıyorum."

Ekranda:

```
┌─────────────────────────────────────────────────┐
│ Microsoft Outlook                               │
├─────────────────────────────────────────────────┤
│                                                 │
│  ⚠  Cannot start Microsoft Outlook. Cannot     │
│     open the Outlook window. The set of         │
│     folders cannot be opened. The attempt to    │
│     logon to Microsoft Exchange has failed.     │
│                                                 │
│                                 [ OK ]          │
└─────────────────────────────────────────────────┘
```

BT uzmanı Emre CFO'nun bilgisayarına uzaktan bağlandı. 8 dakikada çözdü. Bu yazı o 8 dakikayı anlatıyor — **4 yaygın çözüm yöntemi**, hangisi çalışıyor hangisi değil.

## Hızlı Çözüm (TL;DR)

Sırasıyla dene (her birinde Outlook'u kapat → dene → çalıştıysa dur):

1. **Safe Mode**: `outlook.exe /safe` ile aç — çalışıyorsa add-in problem
2. **Navigation Pane reset**: `outlook.exe /resetnavpane`
3. **New Profile**: Control Panel > Mail > yeni profile
4. **OST rename**: `%localappdata%\Microsoft\Outlook` içindeki .ost dosyasını yeniden adlandır

## Hata Ne Anlama Geliyor?

Bu hata mesajı **çatı bir hata** — 5-6 farklı alt sebep olabilir:

- Outlook navigation pane (sol paneli) bozuk
- OST dosyası corrupt
- Outlook profile bozuk
- Add-in (eklenti) crash
- Exchange server erişilemez (ağ/DNS/MFA token)
- Outlook versiyonu eski + M365 tenant yeni auth gerekli

Çözüm sırası: **en az invazif**ten en zora doğru.

## 08:32 — Emre Uzaktan Bağlandı

TeamViewer ile CFO'nun bilgisayarında. İlk kontrol:

```cmd
# Görev yöneticisinde outlook.exe çalışıyor mu?
```

> 📸 **Ekran 1** — Task Manager > Processes  
> Ctrl+Shift+Esc ile açılan Görev Yöneticisi  
> "Processes" tab  
> Arama: "outlook"  
> Sonuç: `OUTLOOK.EXE (32 bit)` çalışıyor — 140 MB RAM  
> "End Task" butonu sağ altta

Emre Outlook'u tamamen kapattı (End Task ile).

## 08:34 — Deneme 1: Safe Mode

```
Windows + R → outlook.exe /safe → Enter
```

> 📸 **Ekran 2** — Run dialog with /safe  
> Win+R tuşlarıyla Run penceresi  
> Input: `outlook.exe /safe` yazılıyor  
> OK butonu

Outlook açıldı:

> 📸 **Ekran 3** — Safe Mode notification  
> Outlook açılış penceresi, üst title bar'da "[Safe Mode]" etiketi  
> Dialog: "Choose profile" — Outlook profile seçimi

CFO'nun mevcut profile'ı seçildi. Safe Mode'da **Outlook açıldı**!

**Sonuç**: Normal mode'da crash, safe mode'da açılıyor = **add-in problemi**.

### Add-in'i Tespit Et

Outlook > File > Options > Add-ins:

> 📸 **Ekran 4** — Outlook Options > Add-ins  
> Sol panel: General, Mail, Calendar, Groups, People, Tasks, Search, Language, Ease of Access, **Add-ins**  
> Sağ panel:  
> - "Active Application Add-ins" listesi (çalışan eklentiler)  
> - "Inactive Application Add-ins" (devre dışı)  
> - "Disabled Application Add-ins" (Outlook tarafından otomatik disable edilmiş)  
> Bottom: "Manage: COM Add-ins" dropdown + "Go..." butonu

CFO'nun bilgisayarında aktif add-ins:
- **Adobe PDFMaker Office COM Add-in** ← Şüpheli (eski Adobe versiyonu)
- Microsoft Teams Meeting Add-in
- SharePoint OpenDocuments Class
- **Webex Productivity Tools** ← Şüpheli (2024 deprecated, yeni Webex App'e geçiş gerek)

Emre hipotezi: **Adobe PDFMaker 20xx versiyonu + Outlook M365 uyumsuzluğu**.

"Go..." butonu → COM Add-ins dialog:

> 📸 **Ekran 5** — COM Add-ins dialog  
> Pencere başlığı: "COM Add-ins"  
> Checkboxlar ile aktif/pasif her eklenti  
> Adobe PDFMaker Office COM Add-in checkbox'ını işaretsiz yap  
> OK

Outlook kapa, normal mode'da aç:
```
Windows + R → outlook.exe → Enter
```

**Açıldı.** Normal mode'da çalışıyor.

## 08:41 — Problemin Kökeni

Adobe PDFMaker yıllık lisans yenileme bekliyordu, user dikkate almamış. Plugin bozulmuş, Outlook'u her açılışta crashletiyordu.

**Çözüm A (Emre'nin tercih ettiği)**: Adobe PDFMaker Outlook'ta sürekli devre dışı. CFO Outlook'tan "Save as PDF" zaten yapabiliyor (Office built-in). Adobe eklentisine gerek yok.

**Çözüm B**: Adobe'u yeni versiyona (Acrobat 2024+) güncelle.

Emre çözüm A'yı seçti — gereksiz add-in birikimi.

## 08:45 — CFO'ya Kısa Bilgilendirme

> "Genel Müdür Bey, Outlook'unuzda Adobe eklentisi bozulmuştu. Kapatıldı. 'Save as PDF' yapmanız gerekirse Office kendisi yapar — File > Save As > dosya tipi PDF seçin yeter. Adobe eklentisine ihtiyaç yok. İyi çalışmalar."

---

## Alternatif Senaryolar — Safe Mode Açılmıyorsa

CFO şanslıydı, safe mode ile çözüldü. Ama bazen safe mode'da bile açılmaz. O zaman:

## Deneme 2: Navigation Pane Reset

Outlook sol panel (Mail/Calendar/People ikonları) bozuksa Outlook açılamaz:

```
Windows + R → outlook.exe /resetnavpane → Enter
```

Outlook açılırsa — bu çözmüş demektir. Bu komut `profilename.xml` dosyasını resetler ama mail verilerine dokunmaz.

## Deneme 3: OST Dosyası Rename

Safe mode + resetnavpane çalışmıyor → OST corrupt olabilir.

OST konumu:
```
%localappdata%\Microsoft\Outlook\
```

> 📸 **Ekran 6** — File Explorer — Outlook folder  
> Path: `C:\Users\cfo.firma\AppData\Local\Microsoft\Outlook\`  
> Dosyalar:  
> - cfo.firma@firma.com.ost (28 GB)  
> - cfo.firma@firma.com.ost.bak (varsa eski yedek)  
> - Outlook Data File.pst (eski pst, varsa)  
> - OfflineAddressBook/ klasörü  
> - RoamCache/ klasörü

**Önce Outlook tamamen kapalı** (Task Manager'da outlook.exe yok). Sonra:

```
cfo.firma@firma.com.ost dosyasını → rename → cfo.firma@firma.com.ost.bak
```

Outlook aç. **Yeni OST otomatik oluşturulur** ve Exchange'ten tüm mail'leri yeniden senkronize eder.

**Süre**:
- Küçük mailbox (1-5 GB): 10-30 dk
- Orta (10-25 GB): 1-4 saat
- Büyük (50GB+): 8-12 saat

Büyük mailbox'larda kullanıcı bu süreçte iş yapabilir ama Outlook yavaş. OWA (outlook.office.com) alternative.

## Deneme 4: Yeni Profile

OST rename çalışmazsa profile tamamen bozuk olabilir. Yeni profile:

```
Control Panel > User Accounts > Mail (Microsoft Outlook)
```

> 📸 **Ekran 7** — Mail Setup dialog  
> Pencere başlığı: "Mail Setup - Outlook"  
> 3 buton:  
> - "E-mail Accounts..."  
> - "Data Files..."  
> - **"Show Profiles..."** ← Bu  
> OK, Cancel

**Show Profiles** → yeni profil dialog'u:

> 📸 **Ekran 8** — Profile selector  
> Liste: "Outlook" (mevcut profile)  
> Butonlar: **Add**, Remove, Properties, Copy  
> Bottom radio:  
> ○ Prompt for a profile to be used  
> ● Always use this profile: [dropdown]

**Add** tıkla → yeni profile adı: "Outlook-New" → OK.

Hesap ekleme wizard'ı:
- E-mail address: `cfo@firma.com`
- Next → Autodiscover ile otomatik yapılandırılır
- MFA prompt gelebilir
- Finish

Sonra "Always use this profile" altında **Outlook-New**'u seç. OK.

Outlook aç — yeni profile ile Exchange'e bağlanır. Çalışırsa eski profile silinebilir.

## Deneme 5: Office Quick Repair

Outlook kurulumu bozuk olabilir:

```
Control Panel > Programs > Programs and Features
```

Microsoft 365 Apps (veya Office 2021) > sağ tık > **Change**:

> 📸 **Ekran 9** — Office Repair dialog  
> İki radio:  
> ● **Quick Repair** (internet gerekmez, hızlı)  
> ○ **Online Repair** (tam reinstall, internet gerekli)  
> Repair butonu

Önce **Quick Repair** dene — 5-10 dk. Başarısız olursa Online Repair (30-60 dk).

## Deneme 6: SCANPST.EXE (PST için)

OST Exchange bağlantılıdır, SCANPST'e genelde gerek yok. Ama PST (archive) kullanan kullanıcılarda:

```
C:\Program Files\Microsoft Office\root\Office16\SCANPST.EXE
```

Çalıştır → Browse → `.pst` dosyasını seç → Start scan → Repair.

## Deneme 7: Office Sign Out + Sign In

M365 auth token bozuk olabilir:

```
Outlook File > Office Account > Sign out
```

Bilgisayarı yeniden başlat.

```
Outlook > Sign in → M365 credentials + MFA
```

## Deneme 8: Son Çare — Office Tamamen Kaldır + Kur

```powershell
# Office Uninstall Support Tool
# https://aka.ms/SaRA-officeUninstallFromPC
```

SaRA (Microsoft Support and Recovery Assistant) resmi Microsoft aracı. Office'i tam kaldırır.

Sonra M365 portal'dan yeniden indir + kur.

## Senaryoya Göre Karar Matrisi

| Semptom | Muhtemel Sebep | İlk Dene |
|---|---|---|
| Safe mode'da çalışıyor | Add-in | Add-in'leri disable |
| Safe mode'da da crash | OST veya profile | OST rename |
| Yeni cihazda hiç açılmamış | Profile config | Yeni profile |
| Güncelleme sonrası başladı | Office kurulumu | Quick Repair |
| "Password required" döngüsü | Auth/MFA | Sign out + in |
| OWA çalışıyor, desktop çalışmıyor | Local sorun | OST + profile |

## Önleyici Öneriler

### Add-in Discipline

Shareet için hazır cihazlarda sadece **onaylı add-in'ler** olsun. GPO ile yönetilebilir:
```
Computer Config > Policies > Admin Templates > Microsoft Outlook 2016 > Security > 
"List of managed add-ins"
```

### OST Boyutu Takibi

OST 30 GB üstünde risk artıyor:
```powershell
# OST boyutları
Get-ChildItem "$env:LOCALAPPDATA\Microsoft\Outlook\*.ost" |
    Select Name, @{N='Size(GB)';E={[math]::Round($_.Length/1GB,2)}}
```

GPO ile OST max 25 GB sınırla + archive policy ile eski mail'leri archive mailbox'a taşı.

### Profile Yedekleme

Kritik kullanıcılarda profile ayarları yedekle:
```
Registry: HKCU\Software\Microsoft\Office\16.0\Outlook\Profiles\
```

Export edip yeni bilgisayara import ederek re-config'siz geçiş.

## Kurumsal Ortamda Toplu Sorun

Birden fazla kullanıcıda aynı anda bu hata varsa:

- **M365 service health**: status.office365.com
- **Exchange on-prem**: transport/mailbox services, disk, DB mount
- **Son yüklenen Office update**: KB numarasını bul, Microsoft known issues kontrol
- **Firewall/proxy değişiklikleri**: Microsoft 365 IP listesi bloklanmış olabilir
- **Son Windows Update**: uninstall dene (`wusa /uninstall /kb:X`)

## İlgili Rehberler

- [Outlook 'yeni e-postaları alırken hata'](/blog/outlook-yeni-epostalar-alirken-hata-olustu)
- [Outlook mail giden kutusunda takılı kalıyor](/blog/outlook-mail-giden-kutusunda-takili-kaliyor)
- [M365 Send As permission](/blog/m365-send-as-permission-verme-adim-adim)
- [Outlook yeni client şifre döngüsü bülteni](/blog/bulten-outlook-yeni-client-sifre-sormaya-devam)

---

**M365 / Outlook endpoint support paketi arıyor musunuz?** Kozyatağı Bilişim uzak masaüstü desteği + onboarding paketimizle. [Teknik görüşme talep edin.](/#contact)
