---
slug: trust-relationship-workstation-primary-domain-failed
title: "'The trust relationship between this workstation and the primary domain failed' — Çözüm Hikayesi"
type: cluster
pillar: 2
url: "/blog/trust-relationship-workstation-primary-domain-failed"
hedef_anahtar_kelime: "trust relationship workstation primary domain failed"
meta_description: "Windows domain-join bilgisayarında 'The trust relationship between this workstation and the primary domain failed' hatası. Ekran görüntülü adım adım çözüm rehberi."
kelime_sayisi: "~1700"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "Trust Relationship Failed"
product_family: "Windows Server & Active Directory"
---

## Perşembe 09:15 — "Bilgisayarım bozuldu"

Satış temsilcisi Elif pazar tatilindeyken annesinin evindeydi, Cuma akşamı şirket laptop'unu o evde açmış, sonra da iki hafta boyunca tekrar açmamış. Tatilinden döndüğü ilk gün sabahı, Perşembe 09:15'te IT destek hattına çağrı:

> "Bilgisayarım açılıyor ama giriş yapamıyorum. **'The trust relationship between this workstation and the primary domain failed'** yazıyor. İşime başlayamıyorum, müşteri arıyorum acele halledin lütfen."

Elif'in laptop'u IT'nin masasına geldi. Ekranda hata:

```
┌───────────────────────────────────────────────────┐
│                                                   │
│  The trust relationship between this workstation │
│  and the primary domain failed.                   │
│                                                   │
│                    [  OK  ]                       │
│                                                   │
└───────────────────────────────────────────────────┘
```

> 📸 **Ekran 1** — Trust relationship error dialog  
> Windows login ekranından sonra açılan pop-up dialog.  
> Başlık yok, sadece uyarı ikonu (sarı üçgen, siyah ünlem)  
> Mesaj: "The trust relationship between this workstation and the primary domain failed."  
> Tek buton: "OK"  
> Arkaplan: Windows login ekranı karartılmış

IT uzmanı Kerem bu hatayı çok iyi biliyor — Türk ofisinde ayda 2-3 kez görülür. Sorun bilgisayarın **makine hesabı şifresi** ile **AD'deki** şifrenin senkronize olmaması.

Bu yazı Kerem'in 12 dakikada çözdüğü adımları anlatıyor.

## Hızlı Çözüm (TL;DR)

1. Bilgisayara **local admin** hesabıyla giriş yap (domain değil, local)
2. PowerShell admin olarak aç
3. `Test-ComputerSecureChannel -Verbose` ile sorunu doğrula
4. `Reset-ComputerMachinePassword -Credential (Get-Credential)` domain admin şifresi ile
5. Bilgisayarı **yeniden başlat**
6. Elif domain hesabıyla giriş yapabilir

---

## Hata Neden Oluşuyor?

Windows domain-joined bilgisayarlar **her 30 günde bir** kendi makine hesabı şifresini otomatik olarak AD'de yeniler. Bu süreç sessizce arka planda çalışır.

Ama bilgisayar **uzun süre offline** olursa (> 60 gün) veya **AD'de manuel müdahale** (örn. bilgisayar hesabı silindi + yeniden oluşturuldu, veya restore'dan döndü), şifre senkronizasyonu kırılır:

- Bilgisayar: "Şifrem X123"
- AD: "Bu makineye X123 değil, Y456 olmalı"
- Kerberos ticket alınamıyor → trust failed

Elif'in laptop'u 14 gün kullanılmamıştı — bu normalde yeterli değil. Ama daha önce **bir Windows Update sonrası restart'ı kaçırdığı** için makine şifre yenileme denemesi başarısız olmuştu. İki hafta sonra tamamen kırıldı.

## 09:18 — Local Admin Hesabıyla Giriş

Kerem ilk olarak local admin hesabını kullandı. Domain'e giriş yapamaz ama `.\Administrator` (veya LAPS-yönetilen local admin) ile girebilir.

> 📸 **Ekran 2** — Windows logon ekranı, "Other user" seçeneği  
> Altta sol köşede "Other user" linki tıklanıyor.  
> Kullanıcı adı alanı: `.\Administrator` (noktayla local olduğunu belirtir)  
> Şifre: (LAPS'tan alınan veya bilinen local admin şifresi)

Giriş yapıldı. Masaüstü yüklendi.

### Eğer Local Admin Bilinmiyorsa

Bu durumda 3 seçenek:

**A. LAPS kullanıyorsa**: DC'den PowerShell ile makine için local admin şifre çek:
```powershell
Get-LapsADPassword -Identity "PC-Elif-Laptop" -AsPlainText
```

**B. LAPS yoksa, ama başka kurumsal local admin varsa**: Onunla gir.

**C. Hiç local admin bilinmiyor**: Windows installation medyasından Safe Mode + `net user administrator /active:yes` veya offline password reset araçları. Son çare.

## 09:22 — Sorunu Doğrulama

PowerShell admin olarak açıldı (Start → "PowerShell" yaz → sağ tık → "Run as administrator"):

> 📸 **Ekran 3** — PowerShell yükseltme pencere  
> UAC prompt: "Do you want to allow this app to make changes to your device?"  
> Program: "Windows PowerShell"  
> Publisher: "Microsoft Windows"  
> Yes tıklanıyor.  
> Açılan mavi PowerShell penceresi, başlıkta "Administrator: Windows PowerShell"

Komut:
```powershell
Test-ComputerSecureChannel -Verbose
```

Çıktı:
```
VERBOSE: Performing the operation "Test-ComputerSecureChannel" on target "PC-Elif-Laptop".
False
VERBOSE: The Secure channel between the local computer and the domain corp.firma.com is broken.
```

**False** = trust broken. Doğrulandı.

## 09:24 — Reset Operasyonu

En temiz çözüm — manuel komutla makine şifresini reset et. DC ile iletişim gerekir (LAN veya VPN üzerinden).

```powershell
Reset-ComputerMachinePassword -Credential (Get-Credential) -Server DC01.corp.firma.com
```

`Get-Credential` domain admin kullanıcı adı ve şifresi ister:

> 📸 **Ekran 4** — PowerShell credential dialog  
> Pop-up pencere: "Windows PowerShell credential request"  
> Açıklama: "Enter your credentials."  
> Input: "User name:" → `CORP\admin.kerem`  
> Input: "Password:" → ●●●●●●●●  
> OK / Cancel butonları

Kerem kendi admin hesabıyla giriş yaptı. Komut 3 saniye sürdü, sonuç:

```
(hiç hata yok — başarılı)
```

Kontrol:
```powershell
Test-ComputerSecureChannel -Verbose
```

Sonuç:
```
True
VERBOSE: The Secure channel between the local computer and the domain corp.firma.com is in good condition.
```

**True.** Trust onarıldı.

## 09:27 — Restart ve Test

```powershell
Restart-Computer -Force
```

Laptop yeniden başladı. Yaklaşık 90 saniye.

Logon ekranında Elif'in domain hesabı listesi geldi:

> 📸 **Ekran 5** — Windows logon ekranı (restart sonrası)  
> Arkaplan: Şirket kurumsal wallpaper (GPO'dan gelen)  
> Ortada: "Elif Yıldız" (yuvarlak fotoğraf + ad)  
> Altında: "Şifre" alanı + "Sign in" butonu  
> Sol altta: "Other user" linki

Elif şifresini girdi. Normal oturum açıldı. 09:27 itibarıyla çalışmaya hazır.

Toplam süre: **12 dakika** (laptop'u masaya getirmeden dahil).

## 09:30 — Elif'e Kısa Brief

Kerem Elif'e ne olduğunu kısaca anlattı:

> "Elif Hanım, laptop 2 hafta kapalı kaldı diye AD ile güvenli bağlantı bozulmuştu. Şimdi düzeldi. İki önemli şey:
> 
> 1. **En az haftada bir** şirket ağına girin (ofiste veya VPN'le) — bilgisayarınız AD ile sessizce senkronize kalır.
> 2. **Windows Update sonrası restart'ları kaçırmayın** — bazı güncellemeler reboot olmadan tamamlanmıyor, sorun biriktiriyor."

Elif çaya gitti, Kerem kahvaltıya.

---

## Alternatif Çözüm Yöntemleri

Reset-ComputerMachinePassword her zaman çalışmayabilir. Backup yöntemler:

### Yöntem B: `netdom resetpwd`

Eski ama güvenilir:

```cmd
netdom resetpwd /s:DC01.corp.firma.com /ud:corp\admin.kerem /pd:*
```

`/pd:*` şifreyi interactive olarak ister. Enter'dan sonra hata olmadığı raporu:
```
The machine account password for the local machine has been successfully reset.
```

Restart gerekir.

### Yöntem C: Domain'den çıkar + tekrar kat

En ağır topla — ama **bazen gerekli**. Özellikle:
- Makine hesabı AD'de hiç yok (silinmiş)
- Reset-ComputerMachinePassword sürekli hata veriyor

Adımlar:

```powershell
# 1. Workgroup'a al (local admin olarak)
Remove-Computer -UnjoinDomainCredential (Get-Credential) -PassThru -Verbose -Restart

# Restart sonrası bilgisayar "WORKGROUP" olarak geri gelir

# 2. Domain'e tekrar kat
Add-Computer -DomainName "corp.firma.com" -Credential (Get-Credential) -Restart

# Restart sonrası domain hesabıyla giriş mümkün
```

⚠️ **Uyarı — kullanıcı profili**:
Domain'den çıkıp tekrar katıldığında bazı durumlarda **kullanıcı profili yeniden oluşturulur**. Masaüstü, belgeler, Outlook OST sıfırlanabilir.

**Önleme**: Çıkarmadan önce:
1. Elif'in OneDrive Business senkronize edildiğinden emin ol
2. Outlook PST archive varsa yedekle
3. Registry'de ProfileList'teki kullanıcı SID'ini not al, gerekirse aynı SID ile geri dön

### Yöntem D: LAPS + Scheduled Task ile önleme

Kurumsal ortam için proaktif: Laptop'ları belirli aralıklarla VPN/internete bağlanınca otomatik machine password refresh yap.

Group Policy Preferences > Scheduled Tasks:
- Trigger: At boot + weekly
- Command: `powershell.exe -Command Reset-ComputerMachinePassword`

Ama dikkat — gereksiz password change **her durumda** yapmamalı (yeni şifre replicate olmadan DC değişirse sorun).

## Yaygın Hatalar ve Tuzaklar

### "Access is denied" Hatası

```
Reset-ComputerMachinePassword: Access is denied
```

Sebep: Verdiğin credential domain admin değil, sadece kullanıcı hesabı. Domain admin veya "Account Operators" grubundaki hesap gerek.

### "The RPC server is unavailable"

Sebep: DC'ye ulaşamıyor — network bağlantı yok, VPN kapalı, veya firewall portları kapalı.

Kontrol:
```powershell
Test-NetConnection DC01.corp.firma.com -Port 135
Test-NetConnection DC01.corp.firma.com -Port 445
Test-NetConnection DC01.corp.firma.com -Port 389
```

Biri "False" dönüyorsa network sorunu çöz, sonra reset.

### Reset Başarılı Ama Yine "Trust Failed"

DNS sorunu olabilir:
```powershell
nslookup corp.firma.com
nslookup DC01.corp.firma.com
```

Yanlış DNS server kullanıyorsa (8.8.8.8 gibi dış DNS), iç DNS'i iç DC'ye çevir:

```powershell
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 10.10.10.10,10.10.10.11
ipconfig /flushdns
```

### Laptop 6+ Ay Offline

Bu durumda makine hesabı AD'de "Password age > 90 days" durumunda **"Tombstone"** süresine yaklaşmış olabilir. Bazı enterprise ortamlarda tombstone 180 gün — o süre aşılırsa recovery imkansız. Çözüm: domain'den çıkar + tekrar kat.

## İleri Seviye — Önleme

### 1. Machine Password Age Monitoring

Haftalık scheduled task ile:

```powershell
$threshold = (Get-Date).AddDays(-85)
$stale = Get-ADComputer -Filter * -Properties PasswordLastSet | 
    Where-Object {$_.PasswordLastSet -lt $threshold}

if ($stale.Count -gt 0) {
    Send-MailMessage -To it@firma.com -Subject "Stale machine passwords" -Body ($stale | Format-Table | Out-String)
}
```

85+ gün önce password değişen bilgisayarları tespit. IT ekibi takip eder, kullanıcıya "bilgisayarını bugün ofiste/VPN'de aç" der.

### 2. VPN Always-On

Uzaktan çalışanlar için DirectAccess veya Always-On VPN. Bilgisayar internet'e çıktığı an otomatik VPN kurulur, AD erişimi var. Machine password asla kırılmaz.

### 3. Azure AD Join Geçiş

Hibrit veya tamamen Azure AD joined cihazlar için bu sorun **yok**. Machine password Azure AD üzerinden yönetiliyor. Modern workplace migration — uzun vade bakınca güzel çözüm.

## İlgili Rehberler

- [Active Directory replication error 8524](/blog/active-directory-replication-error-8524)
- [Kerberos KRB_AP_ERR_MODIFIED / Event 4771](/blog/kerberos-krb-ap-err-modified-event-4771)
- [LAPS ile local admin şifre yönetimi](/blog/hikaye-domain-admin-sifresi-whiteboardda)
- [DNS scavenging çalışmıyor](/blog/dns-scavenging-calismiyor-eski-kayit-birikiyor)

---

**Active Directory troubleshoot, makine hesabı yönetimi ve toplu remediation için uzman destek?** Kozyatağı Bilişim AD health check + otomasyon paketimiz. [Teknik görüşme talep edin.](/#contact)
