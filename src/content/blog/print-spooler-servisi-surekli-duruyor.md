---
slug: print-spooler-servisi-surekli-duruyor
title: "Print Spooler Servisi Sürekli Duruyor — Kalıcı Çözüm Rehberi"
type: cluster
pillar: 5
url: "/blog/print-spooler-servisi-surekli-duruyor"
hedef_anahtar_kelime: "print spooler servisi duruyor"
meta_description: "Windows Print Spooler servisi sürekli durma sorunu. Registry temizliği, driver sorunları, PrintNightmare CVE, kurumsal ortam GPO çözümleri."
kelime_sayisi: "~2000"
pillar_linki: "/hizmetler/son-kullanici-destek"
troubleshoot: true
error_code: "Service Stopped"
product_family: "Windows Server & Active Directory"
---

## Semptom

- Yazıcıdan çıktı alamıyorsunuz, "yazıcı yanıt vermiyor"
- Services.msc > Print Spooler servisi "Stopped" durumda
- Manuel başlatıyorsunuz, 10-30 saniye çalışıp tekrar duruyor
- Event Viewer'da `Service Control Manager` Event ID 7031 "Print Spooler service terminated unexpectedly"
- Yazıcı listesinde "printer offline"
- Print queue'da takılmış belgeler (görünse bile yazmıyor)
- Kurumsal ortamda 20+ kullanıcıda aynı sorun — sunucu tarafı

Print Spooler sorunu Windows'un en eski ve sinsi sorunlarından. 25 yıllık servis mimarisinde hâlâ düzeltilmemiş çok fazla edge case var.

## Hızlı Çözüm (TL;DR)

1. Print queue'yu temizle: Services durdur → `C:\Windows\System32\spool\PRINTERS\` içeriğini sil → servis başlat
2. Eski/çakışan yazıcı sürücüsünü kaldır (Print Management console)
3. Registry'de eski yazıcı artıklarını temizle (`HKLM\SYSTEM\CurrentControlSet\Control\Print\Printers`)
4. PrintNightmare (CVE-2021-34527) güvenlik yamasını kontrol et
5. Kurumsal ortamda GPO "Point and Print Restrictions" ayarlarını gözden geçir

## Neden Oluyor? (Sebepler)

### Sebep 1: Bozuk Print Job Queue

En yaygın sebep. Print queue'da bir belge bozuk format veya corrupt halde — spooler onu işlerken crash oluyor.

`C:\Windows\System32\spool\PRINTERS\` klasörü spool dosyalarını tutar (.spl, .shd uzantılı). Bunlardan biri bozuksa servis takla atıyor.

### Sebep 2: Bozuk / Eski Yazıcı Sürücüsü

Eski bir yazıcının driver'ı Windows güncellemesiyle uyumsuz. Sürücü crash olunca spooler da gidiyor.

Özellikle:
- **HP Universal Print Driver** farklı versiyon karışımı
- **Konica Minolta KONICA MINOLTA universal** bazı sürümler
- **Canon** eski UFR II sürücüleri
- **Lexmark** Universal PCL XL

### Sebep 3: Windows Güncellemesi Kaynaklı

Microsoft bazen spooler'ı etkileyen KB çıkarır:
- **KB5005565 (Eylül 2021)**: PrintNightmare sonrası "Point and Print" davranışı değişti
- **KB5018410 (Ekim 2022)**: Kerberos ile print queue çakışması
- **KB5034441/5034439 (Ocak 2024)**: Recovery Environment boyutu

Toplu sorun yaşanıyorsa yakın zamanda yüklenen güncellemelere bakın.

### Sebep 4: Malware / Rootkit

PrintNightmare CVE'leri (CVE-2021-1675, CVE-2021-34527, CVE-2022-21999) print spooler üzerinden SYSTEM privilege elde etmeye izin veriyordu. Saldırganlar spooler'ı kötüye kullanıyordu.

### Sebep 5: Registry Artıkları

Silinmiş yazıcılardan kalan registry kayıtları spooler'ı kafa karıştırıyor.

### Sebep 6: Kurumsal Print Server

Print server'dan deploy edilen yazıcılarda sunucu tarafında sorun varsa, tüm client'larda spooler devre dışı kalır.

## Adım Adım Çözüm

### Adım 1: Print Queue Temizliği

```cmd
# Komut istemini yönetici olarak aç

net stop spooler
del /Q /F %systemroot%\System32\spool\PRINTERS\*.*
net start spooler
```

Bu %60 vakada çözüm. Queue'da bir bozuk belge varsa — artık yok, spooler rahat.

### Adım 2: Problematik Yazıcıyı Tespit

```powershell
Get-Printer | Select Name, DriverName, PortName, PrinterStatus
```

Spooler duruyor olsa bile genelde listeye erişilir. PrinterStatus "Error" olan yazıcıları not alın.

### Adım 3: Spesifik Sürücüyü Kaldır

Print Management Console:
```
printmanagement.msc
```

- All Printers > Problematik yazıcıyı bul > Delete
- All Drivers > İlgili sürücüyü bul > Remove Driver Package (kaldırma)

Veya PowerShell:
```powershell
# Yazıcıyı kaldır
Remove-Printer -Name "Yazici_Adi"

# Sürücüyü kaldır
Remove-PrinterDriver -Name "HP Universal Printing PCL 6"
```

### Adım 4: Registry Temizliği

⚠️ **Önce yedek al!**

```
regedit
```

Navigate:
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Print\Printers
```

Bu klasörde her yazıcı için alt key var. Var olmayan (silinmiş) yazıcıların key'lerini sil.

```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Print\Environments\Windows x64\Drivers\Version-3
```

Burada sürücü-spesifik kayıtlar. Kaldırdığınız sürücünün key'i hâlâ varsa sil.

```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Print\Monitors
```

Üçüncü parti monitor'leri (Xerox TCP/IP, Canon LPR gibi) kaldırmak isteyebilirsin — standart ortam için sadece "Standard TCP/IP Port" bırakılabilir.

Spooler restart:
```cmd
net stop spooler && net start spooler
```

### Adım 5: Spooler Bağımlılıkları Kontrol

Print Spooler şu servislere bağlı:
- **RPC (Remote Procedure Call)**
- **Plug and Play**
- **HTTP**

```powershell
Get-Service Spooler -RequiredServices
```

Bağımlı servisler çalışmıyorsa spooler başlamaz. Tümünü Running yapmak lazım.

### Adım 6: Services Recovery Ayarı

Spooler sürekli çöküyorsa otomatik restart ayarla:

```
services.msc > Print Spooler > Properties > Recovery tab
First failure: Restart the Service
Second failure: Restart the Service
Subsequent failures: Take No Action
Reset fail count after: 1 day
Restart service after: 1 minute
```

Bu **çözüm değil**, semptom yönetimi. Ama kullanıcılara zaman kazandırır.

### Adım 7: SFC / DISM (Sistem Dosya Sağlığı)

Windows dosya bozukluğu spooler DLL'lerini etkilemiş olabilir:

```cmd
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
```

İkinci komut uzun sürer (30-45 dakika). Tamamlanınca restart.

### Adım 8: PrintNightmare / Point and Print Ayarı

2021 CVE sonrası Microsoft default davranışı değiştirdi:
- Kullanıcılar yeni sürücü yükleyemez (admin gerekir)
- Standart print server bağlantıları UAC prompt alabiliyor

Kurumsal ortamda GPO ile tolerans:

```
Computer Configuration > Administrative Templates > 
Printers > Point and Print Restrictions

Disabled
veya
Enabled + "Users can only point and print to these servers" = print server IP
```

Ve:
```
Computer Configuration > Administrative Templates > 
Printers > Package Point and print - Approved servers

Enabled + print server IP listesi
```

Bu, kullanıcıların server'dan yazıcı ekleyebilmesini sağlar.

⚠️ **Güvenlik trade-off**: Point and print kısıtlamasını gevşetirseniz PrintNightmare tipi saldırılara açık olursunuz. WDAC veya AppLocker ile ek koruma önerilir.

### Adım 9: Kurumsal Print Server'da Sorun

Eğer Print Spooler server (Windows Server rolünün Print Services) problem yaşıyorsa:

**Event log:**
```
Event Viewer > Microsoft > Windows > PrintService > Operational
```

Çok fazla "The driver '%1' caused a crash" hatası → sürücü problemi.

**Migration alternatifi**: Windows Server 2022+ için Microsoft **Universal Print** hizmetine geçişi tavsiye ediyor. Cloud-based print service, on-prem print server'a gerek yok.

### Adım 10: Son Çare — Temiz Kurulum

Tek bir kullanıcı cihazında hiçbir şey çözmediyse:
```powershell
# Print spooler tam reset
Stop-Service Spooler -Force
Remove-Item "C:\Windows\System32\spool\PRINTERS\*" -Force
Remove-Item "C:\Windows\System32\spool\drivers\x64\3\*" -Force -Recurse
# (Bu sürücüleri siler — DIKKAT!)
Start-Service Spooler

# Yazıcıları yeniden ekle
```

## Özel Senaryolar

### Adobe PDF yazıcısı spooler'ı bozuyor

Adobe PDF virtual printer bazı Windows versiyonlarında çakışıyor. Kaldır, sonra Adobe güncellemesiyle tekrar yükle.

### OneNote 16 yazıcısı bozuk

Varsayılan OneNote yazıcısını sil:
```powershell
Remove-Printer "Send To OneNote 16"
```

### "Windows could not connect to printer" 0x0000007e

Sürücü 32-bit vs 64-bit uyumsuzluğu. Server tarafında x86 sürücüsü yüklenmeli.

### Print Spooler disable mı?

PrintNightmare sonrası Microsoft tavsiyesi: print sunucusu olmayan DC'lerde Spooler'ı **disable** et.

```powershell
Stop-Service Spooler -Force
Set-Service Spooler -StartupType Disabled
```

Ama kullanıcı bilgisayarlarında disable değil — onlar yazıcı kullanır.

### Universal Print'e geçiş

Microsoft'un yeni çözümü:
- On-prem print server yok
- Cloud tarafında queue yönetimi
- Kullanıcı her yerden yazdırabilir
- Azure AD kimlik ile auth

M365 lisansınıza dahil değilse ekstra lisans gerektirir (kullanıcı başına aylık).

## Sık Sorulan Sorular

### Spooler her hafta 2-3 kez çöküyor

Sürekli çöküyorsa kök sebep var (sürücü veya queue). Event Viewer > Applications log'da "spoolsv.exe" crash'i inceleyin — "Faulting module" hangi DLL?

### Sürücü kaldırıp tekrar yüklüyorum, sorun döner

Registry'de artık kalıyor olabilir (Adım 4). Veya sürücü zaten bozuk — üreticinin en son versiyonunu indirip kurun.

### Eski Windows 7/8.1 bilgisayardan yeni yazıcıya bağlanamıyorum

Yazıcı üretici Windows 7 için sürücü desteğini bıraktı. Ya yazıcıyı değiştir ya işletim sistemini güncelle. Geçici çözüm "Type 3 (User Mode)" sürücü manuel.

### Kurumsal print server arıza — 80 kullanıcı yazdıramıyor

Kritik. Print server tek nokta arıza olmamalı. Secondary print server veya DFS print namespace kurulmalı. Ya da Universal Print'e geçiş planı.

### Spooler.exe sürekli CPU yiyor

Malware olabilir. SCVM + Defender tam tarama. Güncel yamaların yüklü olduğunu doğrula.

---

**Kurumsal yazıcı altyapısı / print server yönetimi / spooler sorunları için uzman desteği?** Kozyatağı Bilişim olarak print server kurulum, Universal Print geçişi, GPO policy ve günlük destek sunuyoruz. [Teknik görüşme talep edin.](/#contact)
