---
slug: ad-gpo-usb-storage-engelleme-adim-adim
title: "GPO ile USB Bellek Erişimini Engelleme — 'Pazartesi Sabahı Kriz' Senaryosu"
type: cluster
pillar: 2
url: "/blog/ad-gpo-usb-storage-engelleme-adim-adim"
hedef_anahtar_kelime: "gpo usb storage engelleme"
meta_description: "Active Directory GPO ile USB bellek erişimi tüm ofiste adım adım nasıl engellenir — gerçek vaka üzerinden Device Installation Restrictions policy path ve ekran görüntüleri."
kelime_sayisi: "~1900"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "GPO USB Block"
product_family: "Windows Server & Active Directory"
---

## Pazartesi 08:47 — Genel Müdürden Gelen WhatsApp

BT sorumlusu Mehmet, haftasonu rahat geçirmişti. Pazartesi sabahı 08:47'de telefonu titriyor. Genel Müdür:

> "Mehmet Bey, Cuma akşamı muhasebeden bir personel elindeki USB ile çıkarken güvenlik durdurmuş. USB'nin içinde bu yılın bütün fatura PDF'leri varmış. Şirketten dışarıya öylece çıkıyor. **Bugün mesai bitimine kadar tüm bilgisayarlarda USB bellek engellenecek.** Klavye, mouse çalışsın, bellek ve telefon bağlanmasın. Yapılacak mı?"

Mehmet iki saniye düşündü. 120 kullanıcılı ofiste 120 bilgisayara tek tek gitmek imkansız. Ama Active Directory GPO var. **Akşama kadar rahatça yetişir.**

"Yaparım Genel Müdürüm."

Bu yazı Mehmet'in o gün yaptıklarıdır — ekran görüntüleri dahil, tam GPO path'leri ve komutlarıyla.

## Hızlı Çözüm (TL;DR)

1. GPMC aç → yeni GPO oluştur → `Computer Config > Admin Templates > System > Device Installation > Device Installation Restrictions`
2. **"Prevent installation of devices that match any of these device setup classes"** policy aktif et
3. Class GUID: `{36fc9e60-c465-11cf-8056-444553540000}` (USB devices) ekle
4. **"Also apply to matching devices that are already installed"** = Enabled
5. GPO'yu Computers OU'suna link et
6. `gpupdate /force` veya 90 dk bekle

Ama detaylar kritik — klavye/mouse çalışmaya devam etmeli, yetkili kullanıcılar istisna tanımlanmalı. Aşağıda adım adım.

## 09:00 — Planlama Aşaması

Mehmet kahveyle masasına oturdu, önce **ne yapmayacağını** not aldı:

- ❌ USB portu BIOS'tan kapatmak → 120 bilgisayara fiziksel erişim gerekir, USB klavye/mouse da çalışmaz
- ❌ `diskpart` ile disk tipini kısıtlamak → kullanıcı bazlı olmaz
- ❌ Antivirus "USB block" özelliği → lisans var mı belli değil, esnek değil
- ✅ **GPO → Device Installation Restrictions** → merkezi, esnek, istisna tanımlanabilir

Ve **neleri engellemek istediğini** belirledi:

**Engellenecek:**
- USB flash bellek (parmak bellek)
- USB harici disk
- Cep telefonu (USB MTP tethering)

**İzin verilecek:**
- USB klavye, mouse
- USB yazıcı
- Smart kart okuyucu
- Bilinen "onaylı" USB cihazlar (3 adet, Hardware ID beyaz listede)

## 09:15 — GPO Konsolunu Açma

Mehmet DC01'e RDP ile bağlandı:

> 📸 **Ekran 1** — Group Policy Management açılışı  
> Başlat Menüsü'nde "gpmc.msc" aranıyor. "Group Policy Management" ikonunun altında "Desktop app" yazısı. Enter basınca pencere açılıyor.  
> Pencere başlığı: "Group Policy Management"  
> Sol panel ağaç yapısında: **Forest: corp.firma.com → Domains → corp.firma.com**  
> Altında: Default Domain Policy, Default Domain Controllers Policy, Group Policy Objects, WMI Filters, Starter GPOs, Sites

## 09:20 — Test OU Oluşturma (Önce Pilot)

**Mehmet'in hatalardan öğrendiği kural**: GPO'yu bir anda 120 bilgisayara uygulama. Önce pilot grupta test et.

ADUC (Active Directory Users and Computers) açıldı:

> 📸 **Ekran 2** — Active Directory Users and Computers  
> Pencere başlığı: "Active Directory Users and Computers"  
> Sol ağaçta "corp.firma.com" expanded. Altındaki "Computers" container ve mevcut OU'lar görünüyor.  
> Sağ tık → "New" → "Organizational Unit" menüsü açılıyor.

Yeni OU adı: **"Pilot-USB-Block"**. Protect from accidental deletion işaretli.

Sonra Mehmet kendi test laptop'unu bu yeni OU'ya taşıdı:
- ADUC'ta bilgisayarı bul (`PC-Mehmet-Test`)
- Sağ tık → Move → "Pilot-USB-Block" seç

## 09:35 — Yeni GPO Oluşturma

GPMC'ye dönüş:

> 📸 **Ekran 3** — Yeni GPO oluşturma  
> Sol ağaçta "Group Policy Objects" container'ı sağ tıklanıyor. Açılan menüde "New" seçili.  
> Dialog pencere: "New GPO"  
> Input: "Name:" alanına yazılıyor  
> Input: "Source Starter GPO: (none)" default

Mehmet isim girdi: **"USB Storage Block — Corporate"**

OK tıklandı. Yeni GPO oluşturuldu ama henüz boş + hiçbir yere link'lenmemiş.

## 09:40 — GPO İçeriğini Düzenleme

GPMC'de "Group Policy Objects" altında yeni oluşturulan GPO'ya sağ tık → **Edit**.

> 📸 **Ekran 4** — Group Policy Management Editor açılıyor  
> Yeni pencere: "Group Policy Management Editor"  
> Pencere başlığı: "Group Policy Management Editor" - USB Storage Block — Corporate [DC01.corp.firma.com] Policy  
> Sol panelde 2 ana kök: "Computer Configuration" ve "User Configuration"  
> Her ikisi de "Policies" ve "Preferences" alt dalları içeriyor.

### Navigasyon Path

Mehmet sol panelde ilerledi:

```
Computer Configuration
  └─ Policies
     └─ Administrative Templates
        └─ System
           └─ Device Installation
              └─ Device Installation Restrictions
```

> 📸 **Ekran 5** — Device Installation Restrictions policy listesi  
> Sol panel: "Device Installation Restrictions" seçili  
> Sağ panel: Policy'ler listeleniyor:  
> - "Allow administrators to override Device Installation Restriction policies"  
> - "Allow installation of devices that match any of these device IDs"  
> - "Allow installation of devices that match any of these device setup classes"  
> - **"Prevent installation of devices that match any of these device setup classes"** ← Bu kullanılacak  
> - "Prevent installation of removable devices"  
> - "Prevent installation of devices not described by other policy settings"  
> - "Display a custom message when installation is prevented by a policy setting"

### Ana Policy'yi Aktif Etme

**"Prevent installation of devices that match any of these device setup classes"** policy'sine çift tık:

> 📸 **Ekran 6** — Policy edit penceresi  
> Pencere başlığı: "Prevent installation of devices that match any of these device setup classes"  
> Üstte radio butonlar: **Not Configured** (default) / Enabled / Disabled  
> Alt kısım: "Options" bölümünde "Show..." butonu  
> Açıklama: "This policy setting allows you to specify a list of Plug and Play hardware IDs..."

Mehmet yaptıkları:
1. Radio button: **Enabled** seç
2. "Options" altında **"Also apply to matching devices that are already installed"** checkbox'ını işaretle (kritik — mevcut USB sürücüleri de kaldırır)
3. **"Show..."** butonuna tık

> 📸 **Ekran 7** — Show Contents penceresi  
> Dialog: "Show Contents"  
> Başlık: "Prevent installation of devices that match any of these device setup classes"  
> Tablo: "Value" başlığı ile boş satırlar  
> Bottom butonlar: OK / Cancel

Mehmet **Class GUID** ekledi — USB cihazlar için standart GUID:

```
{36fc9e60-c465-11cf-8056-444553540000}
```

Bu GUID **Device Setup Class: USB Devices** anlamına geliyor. Microsoft'un resmi listesi: [https://learn.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors)

Diğer faydalı GUID'ler:

| Cihaz Class | GUID |
|---|---|
| USB Devices | `{36fc9e60-c465-11cf-8056-444553540000}` |
| DVD/CD-ROM | `{4d36e965-e325-11ce-bfc1-08002be10318}` |
| Disk Drives | `{4d36e967-e325-11ce-bfc1-08002be10318}` |
| Floppy Disks | `{4d36e980-e325-11ce-bfc1-08002be10318}` |
| Portable Devices (MTP — telefonlar) | `{eec5ad98-8080-425f-922a-dabf3de3f69a}` |

Mehmet iki GUID ekledi (USB Devices + Portable Devices — telefon bağlantılarını da engellesin diye).

### Kayıt

- OK → Show Contents kapat
- Apply → policy edit penceresi kapat

## 10:15 — İstisna: Klavye ve Mouse Çalışmalı!

Burada **kritik** bir sorun var:

USB klavye, USB mouse, USB dongle'lı wireless klavye → hepsi teknik olarak "USB device". Yukarıdaki policy bunları da engelliyor!

**Çözüm**: "Allow installation of devices that match any of these device IDs" policy'siyle **klavye ve mouse GUID'lerini whitelist'e** ekle.

Policy: **"Allow installation of devices that match any of these device setup classes"**

Aynı ekran açılır. Enabled + Show → eklenecek class GUID'ler:

| İzin verilecek | GUID |
|---|---|
| Keyboard | `{4d36e96b-e325-11ce-bfc1-08002be10318}` |
| Mouse | `{4d36e96f-e325-11ce-bfc1-08002be10318}` |
| HID (Human Interface Devices) | `{745a17a0-74d3-11d0-b6fe-00a0c90f57da}` |
| USB Hub | `{36fc9e60-c465-11cf-8056-444553540000}` — ❌ hayır, bu USB devices, hariç tutulmayacak |

Not: "Allow..." policy'si "Prevent..." policy'sinden daha yüksek önceliklidir. Çakışma olursa Allow kazanır.

## 10:30 — Custom Message (İsteğe Bağlı ama Güzel)

Kullanıcı USB taktığında "yasak" yerine kurumsal mesaj göstermek için:

**Policy**: "Display a custom message when installation is prevented by a policy setting"

Enabled + Options'ta mesaj:

```
Başlık: Kurumsal Güvenlik Politikası
Mesaj: USB bellek ve telefon cihazları iş verilerinin dış ortama çıkması
       önlenmesi için engellenmiştir. İhtiyacınız için IT destek ekibi
       ile (ext. 4040) iletişime geçin.
```

## 10:45 — GPO'yu Pilot OU'ya Link'le

GPMC'ye dönüş. Yeni oluşturulan **"Pilot-USB-Block"** OU'suna sağ tık:

> 📸 **Ekran 8** — Link an Existing GPO  
> OU sağ tık menüsü: "Link an Existing GPO..." seçili  
> Dialog: "Select GPO"  
> Liste: Tüm domain GPO'ları, "USB Storage Block — Corporate" bulunup seçiliyor

OK tıkla. GPO artık OU'ya link'lenmiş.

## 11:00 — Pilot Testi

Mehmet kendi test laptop'una SSH veya RDP ile bağlandı:

```powershell
gpupdate /force
```

Çıktı:
```
Updating policy...
Computer Policy update has completed successfully.
```

Test:
1. USB bellek tak → **Windows "bu cihazın kurulumu reddedildi" uyarısı** veriyor ✓
2. USB klavye tak → normal çalışıyor ✓
3. Kablolu mouse tak → çalışıyor ✓
4. Cep telefonu tak → **bloklandı, MTP sürücü yüklenmiyor** ✓

Başarılı. Ama "mevcut USB belleği" test etmedim diye düşündü. Zaten takılı bir USB'yi çıkarıp tekrar taktı → sürücü kaldırıldı, tekrar kurulamadı. "Also apply to already installed devices" checkbox'u çalışmış ✓

## 14:00 — Üst Yönetim Geri Bildirimi + İstisna Listesi

Genel Müdür bir şey sordu:
> "CFO'nun bilgisayarında bankayla çalışan özel bir USB token var. O çalışmaya devam etmeli."

Mehmet çözüm düşündü:

### Seçenek A: "Allow specific device IDs"

USB token'ın Hardware ID'sini çıkarıp whitelist'e eklemek.

CFO'nun bilgisayarında:
1. Token'ı tak
2. Device Manager aç (devmgmt.msc)
3. Token'ı bul → sağ tık → Properties → Details tab
4. "Property" dropdown'dan **"Hardware Ids"** seç
5. Listelenen ID'leri kopyala (örn. `USB\VID_0529&PID_0620&REV_0100`)

Sonra GPO'ya:

Policy: **"Allow installation of devices that match any of these device IDs"**

Enabled + Show → Hardware ID ekle:
```
USB\VID_0529&PID_0620
```

(REV kısmı olmadan da olur, tüm firmware versiyonlarını kapsar.)

### Seçenek B: CFO'yu ayrı OU'ya

Daha temiz: CFO için ayrı "Executive-NoUSBBlock" OU'su açıp GPO'yu oraya link etmemek.

Ama güvenlik açısından risk — Genel Müdür CFO'nun USB ile de dosya çıkarabileceğini kabul etmiş demek.

Mehmet **Seçenek A**'yı tercih etti. CFO'nun özel token'ı çalışıyor, ama diğer USB'ler yine bloklu.

## 15:30 — Tüm Şirkete Rollout

Pilot başarılı. Mehmet GPO'yu domain'in "Computers" OU'suna link'ledi + bazı spesifik alt OU'lara.

GPMC'de:

> 📸 **Ekran 9** — Link an Existing GPO — üst seviyeye  
> Domain "corp.firma.com" (veya Computers OU'su) sağ tık  
> "Link an Existing GPO..." → "USB Storage Block — Corporate" seç  
> Confirm

**ADIM ADIM Rollout:**
- Önce **Computers → Accounting** OU'suna link
- 30 dakika sonra destek çağrıları gözlemleyip problem yoksa
- **Computers → Sales** OU'suna link
- 30 dakika sonra...
- Son olarak **Computers → IT** OU'su (kendileri test etsin diye)

Tüm OU'lar 2 saat içinde bitti.

## 17:15 — Genel Müdüre Rapor

```
Sayın Genel Müdürüm,

Bugün uygulanan: USB bellek erişim kısıtlaması

• 118/120 bilgisayarda başarıyla uygulandı
• 2 bilgisayarda sorun var — bunlar 90 dakika içinde gpupdate sonrası 
  otomatik güncellenecek (bilgisayarlar kapalıydı)
• CFO ve Genel Müdür USB token'ları istisna listesinde, çalışıyor
• Güvenlik ekibi şirket girişinde kontrolü kaldırabilir

Kullanıcıya giden mesaj: "Kurumsal Güvenlik Politikası" kutusu 
çıkıyor, IT iletişim bilgisiyle.

Saygılarımla,
Mehmet
```

## Doğrulama ve İzleme

Mehmet ertesi hafta event log'larda kaç kullanıcının USB taktığını izledi:

```powershell
Get-WinEvent -FilterHashtable @{LogName='System'; Id=20001,20003,20005,24579} -MaxEvents 100 |
    Select TimeCreated, @{N='User';E={$_.UserId}}, Message |
    Format-Table -AutoSize
```

Event ID'ler:
- **20001** — Device installation attempted
- **20003** — Blocked by policy
- **24579** — USB Mass Storage denied

İlk hafta 47 engellenmiş USB denemesi. İkinci hafta 12. Üçüncü hafta 4. Kültürel değişim başladı.

## İleri Seviye — Best Practices

### 1. Approved USB Whitelist

Her kurumsal USB (özel olarak şirketin satın aldığı) Hardware ID bazlı whitelist'e eklenir. Çalışan kişisel USB takarsa engellenir.

### 2. BitLocker To Go

USB whitelist'teki cihazlarda zorunlu **BitLocker To Go şifreleme**. USB kaybolsa bile veri güvende.

GPO: `Computer Config > Policies > Admin Templates > Windows Components > BitLocker Drive Encryption > Removable Data Drives`

### 3. Log to SIEM

Event 20003 / 24579'ı SIEM'e akıt. Anormal pattern (gece USB denemesi, aynı kullanıcıdan sık deneme) alarm tetikler.

### 4. Audit Mode Önce

Büyük domain'lerde önce **"audit mode"** ile test — bir policy "block" yerine sadece log'lar. Bir hafta log topla, gerçek etki analizini gör, sonra "enforce" moda al. Microsoft Defender for Endpoint'te built-in bu özellik var.

## Yaygın Hatalar

### GPO Uygulandı ama USB Hala Çalışıyor

Kontrol:
```powershell
gpresult /h c:\gpresult.html
```

Açılan raporda "USB Storage Block — Corporate" listede mi? "Applied GPOs" altında görünmeli. Yoksa:
- Bilgisayar doğru OU'da mı?
- GPO enabled durumunda mı (GPMC'de green iken "disabled" değil)?
- WMI Filter veya Security Filtering ekli mi?

### Kullanıcı "Admin yetkisi olsam takabilirim" Diyor

"Allow administrators to override Device Installation Restriction policies" policy'si **Disabled** olmalı. Aksi halde local admin bypass edebilir.

### USB Printer Çalışmıyor

USB Printer'lar da USB class'tayız kategoriye giriyor. Ayrı GUID whitelist'e eklenebilir:
```
Printer class: {4d36e979-e325-11ce-bfc1-08002be10318}
```

### Klavye Yanıt Vermiyor Policy Sonrası

USB klavye bilinmesi için "HID" class'ı da whitelist'te olmalı. Sadece "Keyboard" class yetmez.

## İlgili Rehberler

- [AD GPO'da "Screen saver timeout" nasıl set edilir](/blog/active-directory-kobi-rehberi)
- [LAPS ile local admin şifre yönetimi](/blog/hikaye-domain-admin-sifresi-whiteboardda)
- [KVKK uyumu için IT kontrolleri](/kvkk-oz-denetim)
- [Shadow IT felaketi — muhasebe müdürünün Dropbox'ı](/blog/hikaye-muhasebe-muduru-shadow-it-felaketi)

---

**Kurumsal GPO yönetimi, endpoint güvenlik politikaları ve KVKK uyumu için profesyonel destek?** Kozyatağı Bilişim olarak AD hardening + endpoint protection paketi sunuyoruz. [Teknik görüşme talep edin.](/#contact)
