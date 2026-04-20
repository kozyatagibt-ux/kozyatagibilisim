---
slug: windows-update-hatasi-0x80070643-dongu
title: "Windows Update Hatası 0x80070643 — Sürekli Başarısız Olma Döngüsü"
type: cluster
pillar: 8
url: "/blog/windows-update-hatasi-0x80070643-dongu"
hedef_anahtar_kelime: "windows update 0x80070643 hatası"
meta_description: "Windows Update 0x80070643 'Installation failure' hatası. .NET Framework, WinRE partition, KB5034439, SoftwareDistribution temizliği ve kalıcı çözüm."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/son-kullanici-destek"
troubleshoot: true
error_code: "0x80070643 / ERROR_INSTALL_FAILURE"
product_family: "Windows Server & Active Directory"
---

## Semptom

Windows Update geçmişinde sürekli aynı KB için:

```
Security Update for Windows — KB5034441
Status: Failed
Error: 0x80070643 — ERROR_INSTALL_FAILURE
```

Her ay aynı güncelleme tekrar deneniyor, her ay fail. Bildirim alanında sürekli "Restart required to install updates" gösteriyor ama restart yapsan bile çözülmüyor.

## Hızlı Çözüm (TL;DR)

Hangi KB fail ediyor önemli:

- **KB5034441 / KB5034439** (Ocak 2024) → WinRE partition boyutu, manuel müdahale gerekli
- **.NET Framework güncellemeleri** → .NET Repair Tool
- **Diğer** → SoftwareDistribution klasörü reset

```cmd
# Genel reset (admin)
net stop wuauserv
net stop cryptSvc
net stop bits
net stop msiserver
ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
ren C:\Windows\System32\catroot2 catroot2.old
net start wuauserv
net start cryptSvc
net start bits
net start msiserver
```

## Neden Oluyor?

0x80070643 = "ERROR_INSTALL_FAILURE" — Windows Installer bir nedenle installation'ı tamamlayamıyor. Sebepler çeşitli:

### Sebep 1: .NET Framework Corruption
.NET Framework güncellemeleri en yaygın 0x80070643 kaynağı. Eski versiyon dosyaları bozuk olduğunda yeni patch yüklenemez.

### Sebep 2: KB5034441 — WinRE Partition Yetersiz
Ocak 2024 güvenlik güncellemesi Recovery Partition'a yazmaya çalışır, yer yetmiyor → 0x80070643. [Bu konu ayrı bültende detaylıdır.](/blog/bulten-windows-kb5034439-winre-recovery)

### Sebep 3: SoftwareDistribution Folder Bozuk
Windows Update indirilen dosyaları `C:\Windows\SoftwareDistribution\Download\` klasörüne alır. Bu klasör bozulursa her update fail.

### Sebep 4: Windows System File Bozuk
Kritik Windows DLL/dosya hasarlı. SFC/DISM ile düzeltilmeli.

### Sebep 5: Disk / WinSxS Şişmiş
C: dolu veya WinSxS bileşeni temizlenmemiş.

## Adım Adım Çözüm

### Adım 1: Hangi KB Fail Ediyor?

Windows Update geçmişinde failed olanları listele:
```powershell
Get-HotFix | Sort-Object -Property InstalledOn -Descending

# Daha detaylı
Get-WinEvent -LogName "System" | 
    Where {$_.Id -eq 20 -and $_.Message -match "0x80070643"} | 
    Select TimeCreated, Message | 
    Format-List
```

KB numarasını not al.

### Adım 2: Troubleshoot — KB5034441 İçin (WinRE)

Bu KB için özel çözüm — Recovery Partition genişletme:
```cmd
reagentc /info
```

Recovery Partition boyutuna bak. 500 MB civarında ise:
```cmd
reagentc /disable
diskpart
select disk 0
select partition X (C: partition)
shrink desired=250
select partition Y (Recovery partition)
extend
exit
reagentc /enable
```

Detaylı [bu rehberde](/blog/bulten-windows-kb5034439-winre-recovery) var.

### Adım 3: .NET Framework Sorunu

```cmd
# .NET Framework Repair Tool indir (Microsoft):
# https://www.microsoft.com/download/details.aspx?id=30135

# Alternatif — her installed .NET versiyonunu repair:
wmic product where "name like '%%.NET Framework%%'" get name,version
```

Control Panel > Programs and Features > .NET Framework'ı bul > Change > Repair.

### Adım 4: Windows Update Reset

Tam reset (yukarıdaki hızlı çözümün detayı):

```cmd
# 1. Servisleri durdur
net stop wuauserv
net stop cryptSvc
net stop bits
net stop msiserver
net stop appidsvc

# 2. SoftwareDistribution ve catroot2 klasörlerini yeniden adlandır
ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
ren C:\Windows\System32\catroot2 catroot2.old

# 3. Windows Update log'larını temizle
del C:\Windows\WindowsUpdate.log /F /Q
del C:\Windows\Logs\WindowsUpdate\*.etl /F /Q

# 4. WU cache DLL'lerini yeniden kaydet
regsvr32.exe /s atl.dll
regsvr32.exe /s urlmon.dll
regsvr32.exe /s mshtml.dll
regsvr32.exe /s shdocvw.dll
regsvr32.exe /s browseui.dll
regsvr32.exe /s jscript.dll
regsvr32.exe /s vbscript.dll
regsvr32.exe /s scrrun.dll
regsvr32.exe /s msxml.dll
regsvr32.exe /s msxml3.dll
regsvr32.exe /s msxml6.dll
regsvr32.exe /s actxprxy.dll
regsvr32.exe /s softpub.dll
regsvr32.exe /s wintrust.dll
regsvr32.exe /s dssenh.dll
regsvr32.exe /s rsaenh.dll
regsvr32.exe /s gpkcsp.dll
regsvr32.exe /s sccbase.dll
regsvr32.exe /s slbcsp.dll
regsvr32.exe /s cryptdlg.dll
regsvr32.exe /s oleaut32.dll
regsvr32.exe /s ole32.dll
regsvr32.exe /s shell32.dll
regsvr32.exe /s initpki.dll
regsvr32.exe /s wuapi.dll
regsvr32.exe /s wuaueng.dll
regsvr32.exe /s wuaueng1.dll
regsvr32.exe /s wucltui.dll
regsvr32.exe /s wups.dll
regsvr32.exe /s wups2.dll
regsvr32.exe /s wuweb.dll
regsvr32.exe /s qmgr.dll
regsvr32.exe /s qmgrprxy.dll
regsvr32.exe /s wucltux.dll
regsvr32.exe /s muweb.dll
regsvr32.exe /s wuwebv.dll

# 5. Winsock reset
netsh winsock reset
netsh winhttp reset proxy

# 6. Servisleri başlat
net start wuauserv
net start cryptSvc
net start bits
net start msiserver
net start appidsvc

# 7. Restart bilgisayar
shutdown /r /t 0
```

Restart sonrası Windows Update tekrar dene.

### Adım 5: SFC + DISM

System file bozukluğu:
```cmd
# Component store repair
DISM /Online /Cleanup-Image /RestoreHealth

# Sonra SFC
sfc /scannow
```

DISM 20-60 dk, SFC 15-30 dk. Bitince restart, update tekrar.

### Adım 6: Manuel KB İndirme

Windows Update otomatik olarak indiremiyorsa manuel dene:

1. **Microsoft Update Catalog**: https://catalog.update.microsoft.com
2. KB numarasını ara (örn. "KB5034441")
3. Windows versiyonuna göre (x64, x86, ARM64) doğru paketi indir
4. `.msu` dosyasını double-click — standalone installer açılır

Bu yöntem SoftwareDistribution klasörünü bypass eder — WU servisindeki takıntı olsa bile çalışır.

### Adım 7: Windows Update Troubleshooter (Official Microsoft Tool)

```
Settings > Update & Security > Troubleshoot > 
Additional troubleshooters > Windows Update > Run
```

Microsoft'un official aracı yaygın 10-15 sorunu otomatik fix eder.

### Adım 8: Disk Temizliği

C: dolu mu?
```powershell
Get-PSDrive C | Select Used, Free
```

%90+ dolu ise:
```cmd
# Windows Update cleanup
cleanmgr /sageset:1
cleanmgr /sagerun:1

# Veya direkt:
DISM /online /cleanup-image /startcomponentcleanup /resetbase
```

`/resetbase` eski component'leri tamamen siler — geri almak zor, dikkatli ol.

### Adım 9: In-Place Repair Upgrade

Son çare — Windows'u kendi üzerine "upgrade" ile yeniden kur (dosyalar korunur):

1. Windows 10/11 ISO indir (Media Creation Tool)
2. ISO'yu mount et
3. Setup.exe çalıştır > "Keep personal files and apps" seç
4. Upgrade başlar (~30 dk)
5. Sonunda Windows aynı hali + tüm kritik sistem dosyaları yeniden yazıldı

Çoğu zaman 0x80070643 dahil persistent Windows Update sorunları bu sonrasında çözülür.

## Kurumsal Ortam — WSUS

### WSUS'ta 0x80070643 Toplu Sorun

```powershell
# Etkilenen client sayısı
Get-WsusComputer | Where {$_.UpdateStatus -eq "Failed"} | Measure-Object

# Hangi KB için fail?
Get-WsusUpdate | Where {$_.InstalledOrNotApplicablePercentage -lt 50}
```

Toplu script ile client'larda SoftwareDistribution reset:
```powershell
# PowerShell Remoting ile çoklu client
Invoke-Command -ComputerName (Get-ADComputer -Filter * | Select -ExpandProperty Name) -ScriptBlock {
    Stop-Service wuauserv, cryptSvc, bits, msiserver -Force
    Remove-Item "C:\Windows\SoftwareDistribution\*" -Recurse -Force -ErrorAction SilentlyContinue
    Start-Service wuauserv, cryptSvc, bits, msiserver
    wuauclt /detectnow
}
```

## Önleyici Bakım

1. **Aylık update dashboard** — WSUS veya SCCM ile "patch compliance" raporu
2. **Rollback test** — major updates production'a girmeden önce pilot grup
3. **SFC scheduled task** — aylık sistem dosya bütünlüğü kontrolü
4. **Disk alarm** — %85 doluluğu eşiği aşınca proaktif uyarı

## Sık Sorulan Sorular

### 0x80070643 sadece tek bir bilgisayarda

Muhtemelen o bilgisayarın .NET veya sistem dosyası bozuk. In-place repair upgrade öner.

### 50+ bilgisayarda aynı KB fail

WSUS / altyapı sorunu. Microsoft'ta bilinen bug olabilir — KB5034439 / 5034441 vakasında olduğu gibi.

### WU servis açıldığında CPU %100

WU database (SoftwareDistribution\DataStore) büyümüş. Servis durdur, datastore.edb dosyasını sil, servis başlat — yeniden oluşturur.

### Windows Update'i tamamen disable etsem?

**Önerilmez** — güvenlik yamaları kritik. Disable yerine **WSUS ile onaylı yamaları kontrollü dağıt**. Kurumsal ortam için standart.

### Insider Preview yüklü — update fail

Insider ring production update'leriyle çakışabilir. Settings > Windows Insider Program > Leave the Insider Program.

---

**Endpoint patch management, WSUS / SCCM / Intune update stratejisi için uzman destek?** Kozyatağı Bilişim olarak kurumsal patch management hizmetleri. [Teknik görüşme talep edin.](/#contact)
