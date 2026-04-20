---
slug: onedrive-senkronizasyon-bekliyor-pending
title: "OneDrive Senkronizasyon Bekliyor (Pending) — 7 Senaryoda Çözüm"
type: cluster
pillar: 6
url: "/blog/onedrive-senkronizasyon-bekliyor-pending"
hedef_anahtar_kelime: "onedrive senkronizasyon bekliyor"
meta_description: "OneDrive dosyaları 'Sync pending' / 'Bekliyor' durumunda takılıyor. 7 farklı senaryoda kök sebep ve kalıcı çözüm rehberi — kurumsal / kişisel / SharePoint sync."
kelime_sayisi: "~2200"
pillar_linki: "/hizmetler/dosya-paylasim"
troubleshoot: true
error_code: "Sync Pending"
product_family: "Microsoft 365 & Outlook"
---

## Semptom

OneDrive simgesi sistem tepsisinde:
- Sarı ikon + "senkronize ediliyor" ama **saatlerdir aynı durumda**
- Dosya üzerinde küçük "iki ok" (sync) simgesi sabit, "yeşil onay" olmuyor
- "1250 dosya bekleniyor" sayısı düşmüyor
- OneDrive açıldığında "Changes pending" ama değişiklik ne?
- Tek bir dosya "takılı" — silinmiyor, taşınmıyor, güncellenemiyor

Kurumsal ortamlarda yaygın, özellikle SharePoint sync + OneDrive birleştiğinde. Türkiye'de 50-200 kişilik şirketlerde haftalık 3-5 IT çağrı sebebi.

## Hızlı Çözüm (TL;DR)

1. OneDrive sistem tepsisinden **"Pause" sonra "Resume"** — bazen bekleyen queue kırılır
2. Hala takılıyorsa OneDrive'dan **çıkış yap + yeniden giriş** (Settings > Account > Unlink this PC)
3. Dosya adlarında **geçersiz karakter** mi? (`~ # % & * : < > ? / \ { |`)
4. Dosya yolu **256 karakteri** geçiyor mu?
5. Disk doluluk %90+ mı?
6. Hâlâ yoksa OneDrive reset: `%localappdata%\Microsoft\OneDrive\onedrive.exe /reset`

## Neden Oluyor? (7 Ana Sebep)

### Sebep 1: Dosya Adında Geçersiz Karakter

OneDrive dosya adlarında şu karakterlere **izin vermez**:
```
" * : < > ? / \ |
```

Ve şu isimler rezerve:
```
CON, PRN, AUX, NUL, COM1-COM9, LPT1-LPT9
```

Bir dosya bu kurala uymazsa senkronize olmaz ve tüm queue'yu bloklar.

### Sebep 2: Çok Uzun Dosya Yolu

Windows varsayılanda **260 karakter** (MAX_PATH) sınırı. OneDrive daha da sıkı:
- OneDrive için Business: **400 karakter**
- Ama derin klasör yapıları bu sınırı aşar:
  ```
  C:\Users\mehmet.yilmaz\OneDrive - Firma\Projeler\2024\Q4\Muhasebe\Tedarikçiler\...\fatura_2024_12_tedarikci_ISO_9001_Agustos_2024_nihai_versiyon.pdf
  ```

### Sebep 3: Dosya Başka Uygulama Tarafından Kilitli

Outlook açıkken .pst dosyası, Excel açıkken .xlsx, AutoCAD açıkken .dwg — dosya "locked" olduğu için OneDrive sync edemez.

### Sebep 4: OneDrive Client Crash / Freeze

OneDrive client (exe) takılıp kaldı ama sistem tepsisinde görünüyor. Task Manager'da durumu "Not responding".

### Sebep 5: Network / VPN Araya Giriyor

Kurumsal VPN aktifken OneDrive trafiği VPN üzerinden gidiyor ve yavaşlıyor/takılıyor. Özellikle split-tunnel yok ise.

### Sebep 6: SharePoint / OneDrive Libraries Çakışması

Aynı anda OneDrive kişisel + SharePoint team sites + Teams channel files sync ediliyorsa bazı kütüphaneler birbirini bekler.

### Sebep 7: OneDrive Admin Policy Kısıtı

Kurumsal tenant admin "file type blocking" veya "content types not permitted" kuralı koymuş olabilir.

## Adım Adım Çözüm

### Adım 1: OneDrive Activity Center'ı İncele

Sistem tepsisinden OneDrive ikonuna sol tık. Açılan panel:
- "İşleniyor" sekmesi
- Hata veren dosyalar kırmızı ile listelenir
- Dosya adının yanındaki bilgi tuşuna tık — spesifik hata mesajı

**Tipik hata mesajları ve anlamları:**

| Hata | Anlam |
|---|---|
| "İsim çok uzun" | 400+ karakter yol |
| "İsimde geçersiz karakter var" | : ? * / \ gibi |
| "Dosya kullanımda" | Başka uygulama açık |
| "Bulut kopyalarıyla çakışma" | Aynı dosya başka yerde de değişti |
| "Depolama alanınız dolu" | OneDrive kota dolu |
| "Blok edildi" | Admin policy |

### Adım 2: OneDrive Pause + Resume

Basit ama etkili:
1. Sistem tepsisi > OneDrive > Settings > "Pause syncing" > 2 hours
2. 30 saniye bekle
3. Sistem tepsisi > OneDrive > "Resume syncing"

Bazı durumlarda queue yeniden başlar ve takılmış işlemler geçer.

### Adım 3: Sorun Yaratan Dosyayı Tespit Et

Activity Center hata vermeyip sadece "bekliyor" diyorsa, manuel tespit:

```powershell
# OneDrive klasöründe uzun yolları bul
Get-ChildItem -Path "$env:OneDrive" -Recurse | 
    Where { $_.FullName.Length -gt 256 } | 
    Select FullName, @{N="Length";E={$_.FullName.Length}}
```

Geçersiz karakter olan dosyaları:
```powershell
Get-ChildItem -Path "$env:OneDrive" -Recurse | 
    Where { $_.Name -match '[\\/:*?"<>|]' }
```

Bulunan dosyaları:
- Rename et (karakter veya uzunluk)
- Veya Excluded list'e ekle (OneDrive Settings > Account > Choose folders)

### Adım 4: Disk Doluluk

```powershell
Get-PSDrive -PSProvider FileSystem | 
    Select Name, 
    @{N="Used(GB)";E={[math]::Round($_.Used/1GB,2)}},
    @{N="Free(GB)";E={[math]::Round($_.Free/1GB,2)}}
```

C: sürücüsünde %90+ dolu ise OneDrive geçici dosya yazamaz. Temizle:
- Disk Cleanup aracı: `cleanmgr.exe`
- Downloads klasörü boşalt
- Recycle Bin empty

### Adım 5: Windows Credential Manager Sıfırlama

Bazen OneDrive credential'ları bozulur:

```
Control Panel > Credential Manager > Windows Credentials
```

"OneDrive", "microsoft_onedrive_", "microsoftoffice..." ile başlayan tüm girişleri sil.

OneDrive'dan çıkış yap, sistem restart, OneDrive'a tekrar giriş.

### Adım 6: OneDrive Reset

Tam reset:

```cmd
%localappdata%\Microsoft\OneDrive\onedrive.exe /reset
```

Kısa süre sonra OneDrive otomatik yeniden başlar. Başlamazsa:
```cmd
%localappdata%\Microsoft\OneDrive\onedrive.exe
```

Manuel başlat.

**Reset ne yapar**:
- Tüm sync ayarlarını temizler
- Local cache'i siler (yerel dosyalar kaybolmaz, OneDrive klasörü kalır)
- İlk açılışta yeniden senkronize başlar

İlk tam senkronizasyon büyük klasörlerde (50GB+) saatler sürebilir. Gece çalıştırın.

### Adım 7: OneDrive Tamamen Kaldır + Yeniden Kur

Yukarıdakiler çalışmadıysa:

```powershell
# OneDrive işlemini durdur
taskkill /f /im OneDrive.exe

# Kaldırma
# 32-bit Windows:
%SystemRoot%\System32\OneDriveSetup.exe /uninstall
# 64-bit Windows:
%SystemRoot%\SysWOW64\OneDriveSetup.exe /uninstall

# Artık kalan dosyalar
rd /s /q "%localappdata%\Microsoft\OneDrive"
rd /s /q "%programdata%\Microsoft OneDrive"
rd /s /q "C:\OneDriveTemp"

# Registry temizliği (dikkat)
reg delete "HKEY_CLASSES_ROOT\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f
reg delete "HKEY_CLASSES_ROOT\Wow6432Node\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f

# Yeniden kurulum
# Microsoft Store'dan veya https://onedrive.live.com'dan indir
```

### Adım 8: VPN / Network Kontrolü

VPN aktifse:
- OneDrive Settings > Network tab
- "Limit upload rate to" kısmı — eğer set edilmişse aç
- VPN split tunnel ayarı: Microsoft 365 trafiği doğrudan internete çıksın, VPN üzerinden gitmesin (enterprise VPN admin'e danışın)

Proxy kontrolü:
```powershell
netsh winhttp show proxy
```
Yanlış proxy set edilmişse OneDrive bağlanmaz.

### Adım 9: Dosya Türü Filtreleme (Admin)

M365 Admin Center > Settings > OneDrive:
- "Allow syncing only on PCs joined to specific domains" — aktif mi?
- "Block syncing of specific file types" — hangi uzantılar?

Kullanıcı bu engelleri bilmezse "neden senkronize olmuyor" merak eder.

### Adım 10: SharePoint Library Sync Sayısı

OneDrive client aynı anda sync edebileceği:
- **300,000 öğe** per library
- **25 TB** toplam

Library çok büyükse (üretim firma arşivi gibi) OneDrive sync yerine "Web only access" (cache'siz web tarayıcı) kullanın.

Sync pause edip tek tek library'leri ekle/çıkar:
```
OneDrive > Settings > Account > Folders you're syncing
```

Sadece gerekli klasörleri seç, büyük arşivleri çıkar.

## Adı Gereksiz Uzun Dosyaları Toplu Yeniden Adlandırma

Eğer klasörde 1000+ dosya varsa ve bazılarının adı uzun:

```powershell
# Uzun isimleri kısalt
Get-ChildItem -Path "C:\Users\user\OneDrive - Firma\Projeler" -Recurse -File |
    Where { $_.FullName.Length -gt 250 } |
    ForEach {
        $newName = $_.Name.Substring(0, [Math]::Min(50, $_.Name.Length - $_.Extension.Length)) + $_.Extension
        Rename-Item $_.FullName -NewName $newName -WhatIf
    }
```

`-WhatIf` ile önce test et, sonra kaldır.

## Önleyici Yaklaşım

1. **Klasör yapısı standardı**: Max 4-5 seviye derinlik, kısa klasör isimleri
2. **Dosya adlandırma kuralı**: YYYYMMDD_konu_versiyon.ext (uzun açıklama ADI değil, dosya metadatasında olsun)
3. **Files On-Demand aktif**: Yerel diskte yer tutmaz, sadece açıldığında indirir
4. **Kullanıcı eğitimi**: Geçersiz karakter listesi, 260 karakter sınırı

## SharePoint Specific Sorunlar

### "Çakışma var" (Conflict) uyarısı

Aynı dosya 2 farklı kullanıcı tarafından aynı anda değiştirildi:
- OneDrive bir kopya `dosya_adi_kullanici.xlsx` olarak oluşturur
- Kullanıcı hangisini tutacağına karar vermeli

### "Bu klasöre erişim yok"

SharePoint permissions bozuk. Site admin'den klasöre "Edit" veya "Member" permission kontrolü iste.

### Teams channel files sync edilmiyor

Teams dosyaları SharePoint'tedir aslında. Teams'ten "Open in SharePoint" > Sync butonu manuel başlatılmalı.

## Sık Sorulan Sorular

### OneDrive pause edip resume ediyorum, 5 dakika sonra yine "pending"

OneDrive sürekli döngüde aynı dosyada takılıyor demek. Activity Center'da o dosyayı bul, tek tek çöz.

### Yerel değişikliklerim sunucuya gidiyor ama sunucudan yerele gelmiyor

Tek yönlü sync sorunu genelde dosya permission'u kaynaklı. Sunucu tarafında "read-only" olarak işaretlenmiş olabilir.

### "Files On-Demand" kapalı, açsam mı?

Evet kesinlikle. Disk tasarrufu büyük. Settings > Save space and download files as you use them = ON.

### OneDrive büyük dosyaları nasıl sync eder? Upload saatler sürüyor

250 GB tek dosya limit. Büyük dosyalar (video, VM image) için ayrı çözüm uygun — Azure Blob, AWS S3, dedicated cloud storage.

### Kurumsal tenant'ta "bu dosya türü engellenmiş" — ne yapalım?

IT admin tenant setting'ine ek dosya tipi whitelist ekleyebilir. Ya da dosyayı zip ile sıkıştırıp sync et.

---

**Microsoft 365 / OneDrive / SharePoint yönetimi ve sorun giderme için uzman desteği mi istersiniz?** Kozyatağı Bilişim M365 sertifikalı ekibimizle tenant yönetimi, migration ve günlük destek sunuyoruz. [Teknik görüşme talep edin.](/#contact)
