---
slug: outlook-mail-giden-kutusunda-takili-kaliyor
title: "Outlook Mail 'Giden Kutusu'nda Takılı Kalıyor — Gönderilmiyor Çözümü"
type: cluster
pillar: 6
url: "/blog/outlook-mail-giden-kutusunda-takili-kaliyor"
hedef_anahtar_kelime: "outlook mail giden kutusunda takılı"
meta_description: "Outlook'ta mail 'Giden Kutusu' (Outbox) klasöründe takılıp gönderilmiyor. Büyük ek, OST corruption, MFA, SMTP limit ve Exchange queue sorunları için çözüm."
kelime_sayisi: "~1600"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Stuck in Outbox"
product_family: "Microsoft 365 & Outlook"
---

## Semptom

Outlook'ta "Gönder" tuşuna basınca mail **Giden Kutusu (Outbox)** klasörüne düşüyor ama orada kalıyor. Sonraki saatlerde:

- Mail hâlâ Outbox'ta
- **İtalik** yazı tipiyle görünüyor (gönderilmiş olsa normal)
- Send/Receive tuşuna basınca progress bar açılıyor ama ilerlemiyor
- Bazen error: "Task 'mail@firma.com - Sending' reported error (0x80040115)"
- Veya: "Cannot send this item" / "The server is unavailable"

Aynı anda mail alabiliyor olabilirsin — sadece giden taraf takılı.

## Hızlı Çözüm (TL;DR)

1. Outlook'u kapat → Giden Kutusu'nu aç → mail'i silmeyi dene → Outlook'u yeniden aç
2. **Büyük ek (20MB+)** varsa ek'i kaldır, tekrar dene
3. Outlook Work Offline modunda olup olmadığını kontrol et
4. OST/PST dosyası bozuksa SCANPST ile tara
5. Kurumsal ortamda **Exchange transport queue** kontrolü gerekli

## 6 Yaygın Sebep

### Sebep 1: Büyük Ek Dosyası
Exchange Online varsayılan mail boyutu limit **35 MB** (ek + gövde). Office 365 Business Standard → genelde **25 MB**. Bu limiti aşan mail Outbox'ta takılır, sessiz sessiz retry döngüsünde kalır.

### Sebep 2: OST Dosyası Büyüdü ve Bozuldu
OST dosyası 30 GB+ olunca Outlook çok yavaşlıyor, outbox senkronizasyonu bozulabilir. Bozulma belirtileri: Outlook sürekli "Not Responding".

### Sebep 3: MFA Token Expire / Parola Değişikliği
M365 kullanıcısı şifresini değiştirmiş veya MFA token'ı expire olmuş — Outlook arka planda auth yapamıyor, silent fail.

### Sebep 4: SMTP Gönderim Limiti Aşıldı
M365'te kullanıcı başına **saatlik 30 yeni mesaj** ve **günlük 10,000 alıcı** limiti var. Bulk sending yapan bir kullanıcı bu limite takılabilir.

### Sebep 5: Exchange Transport Queue Dolu (Server-Side)
On-prem Exchange'de transport service'de queue takılı — iç sebep DB problem, disk dolu, antispam filter.

### Sebep 6: Internet Bağlantısı / Firewall
VPN üzerinden veya misafir Wi-Fi'da giden SMTP/HTTPS trafiği bloklanmış olabilir.

## Adım Adım Çözüm

### Adım 1: Outlook Work Offline Modu Kontrol

Send/Receive sekmesi > "Work Offline" toggle'ını kontrol et. Kapalı olduğundan emin ol.

### Adım 2: Giden Kutusu'nu İncele

Outbox klasörüne git, takılı mail'leri gör. Her mail için:
- **Boyut**: Sağ tık > Properties > Size. 20 MB+ ise büyük ek sorun.
- **Tarih**: Kaç saat/gün beklemiş? Yeni mi eski mi?

Büyük mail varsa:
- Mail'i aç (Outlook'ta Outbox'tan)
- Ek'i sil veya küçült (OneDrive link'i olarak paylaş)
- Kaydet + Gönder tekrar dene

### Adım 3: Outlook'u Tam Kapat ve Aç

```
Task Manager > Processes > outlook.exe → End Task
```

Yeniden aç. Bazen basit restart outbox'ı flush eder.

### Adım 4: Takılı Mail'i Silme (Trick)

Outbox'ta olan mail'i silmeye çalıştığında "Cannot delete, item is being sent" alabilirsin. Trick:

1. Outlook'u **Offline** moduna al (Send/Receive > Work Offline)
2. Giden Kutusu'na git → mail'e sağ tık > Delete (veya Shift+Delete)
3. Mail silinir
4. Work Offline'ı kapat (online'a geç)
5. Mail'i yeniden yaz (küçük ek ile veya OneDrive link ile)

### Adım 5: OST Dosyası Taraması

Outbox takılma sürekliyse OST bozuk olabilir:

1. Outlook'u tamamen kapat
2. SCANPST.EXE çalıştır:
```
C:\Program Files\Microsoft Office\root\Office16\SCANPST.EXE
```
3. Browse > `%localappdata%\Microsoft\Outlook\<email>.ost` seç
4. Start > Scan → Error varsa Repair

Süre: OST boyutuna göre 15 dk - 2 saat.

**Eğer SCANPST yetersiz kalırsa** (Exchange OST için bazen sınırlı):
1. Outlook kapalı
2. OST dosyasını yeniden adlandır: `<email>.ost` → `<email>.ost.bak`
3. Outlook aç — yeni OST otomatik oluşur, sunucudan baştan sync

⚠️ **Uyarı**: Outbox'taki henüz gönderilmemiş mail'ler OST'dedir. Silmeden önce `.bak` olarak sakla.

### Adım 6: M365 Gönderim Limitini Kontrol

M365 Admin Center'da:
```
Users > Active users > kullanıcı > Mail > Manage restrictions
```

"Restricted" statüsü görünüyorsa kullanıcı limitleri aşmış. Remove restriction.

Ya da PowerShell:
```powershell
Get-MailboxStatistics -Identity user@firma.com | 
    Select DisplayName, ItemCount, TotalItemSize
```

### Adım 7: Exchange On-Prem Transport Queue

Exchange sunucuda:

**Queue Viewer** açılmaması için PowerShell:
```powershell
# Tüm queue'ları listele
Get-Queue

# Takılı mesaj sayısı yüksek olan
Get-Message -Queue "EXCHANGE\Submission" | Measure-Object | Select Count

# Retry mesajlarını zorla
Get-Message -Filter "{Queue -eq 'EXCHANGE\Submission'}" | 
    Retry-Queue -Identity "EXCHANGE\Submission"
```

Hâlâ takılıyorsa transport service restart:
```powershell
Restart-Service MSExchangeTransport
```

### Adım 8: Profile Sorunu

Yeni bir Outlook profile test et:
```
Control Panel > Mail (32-bit) > Show Profiles > Add > "TestProfile"
```

Mail'i oluştur ve gönder. Yeni profile'da çalışıyorsa eski profile bozuk, reset et.

### Adım 9: MFA / Modern Auth

Outlook credential güncelleme zorla:
```
Control Panel > Credential Manager > Windows Credentials
```

"MicrosoftOffice", "msa_", "mso_" başlayanları sil. Outlook'u yeniden aç, MFA ile login olmak zorunda.

### Adım 10: Send/Receive Error Log

Detaylı log:
```
File > Options > Advanced > Send/Receive > 
Send/Receive button > Define > Edit >
"Outlook Logging enable"
```

Sonra log:
```
%localappdata%\Temp\Outlook Logging\OPMLOG.log
```

Hata kodlarını oku, Microsoft support ile çapraz kontrol.

## Kurumsal Senaryolar

### Birden Fazla Kullanıcıda Aynı Anda

Tek kişide değil, 30-50 kullanıcıda aynı anda outbox takılıyorsa:
- M365 service health: https://status.office365.com/
- Exchange on-prem: transport service, disk space, DB mount
- Firewall: SMTP/HTTPS outbound blokajı

### Dış Gönderim OK, İç Gönderim Takılı

İç mail delivery'de sorun var. Exchange routing (Send Connectors, Accepted Domains) yanlış yapılandırılmış olabilir.

### VPN'den Send Takılı Ama Ofiste OK

Full-tunnel VPN Microsoft 365 trafiğini VPN üzerinden geçiriyor — Microsoft'un endpoint'lerine optimal rota dışı gidiyor. Split-tunnel öneriyorum:
- M365 trafiği doğrudan internete
- Sadece kurumsal kaynak trafiği VPN üzerinden

## Önleyici Bakım

1. **OST boyut monitoring** — 25 GB üstünde archive policy aktif
2. **Ek boyutu eğitimi** — kullanıcılara OneDrive link paylaşma eğitimi
3. **Outlook güncel** — M365 Apps otomatik update, ama volume license manuel
4. **Send/Receive log** — sorunlu kullanıcılarda log aç, pattern bul

## Sık Sorulan Sorular

### Mail günler sonra kendiliğinden gitti, normal mi?

Outlook 10 dakikada bir retry yapar. Geçici network/Exchange sorunu 30-120 dakikada çözülürse mail çıkar. Günlerce beklemesi normal değil — altta structural sorun var.

### Outbox'taki mail dublicate gitti — alıcı 3 kez aldı

Outlook retry ederken başarısız gibi görünüp aslında gönderebiliyordu. Retry mekanizması sonra tekrar gönderdi. Outbox'ta takılmış görünen mail aslında gidiyordu.

### "Cannot send this item" hata kodu ne anlamına geliyor?

Genelde 0x80040115 (general SMTP failure) veya 0x8004010F (OST corruption). Önce Outlook restart, sonra profile check.

### IMAP hesabımda outbox takılı

IMAP'ta gönderim SMTP üzerinden, alma IMAP üzerinden. SMTP port (587 veya 465) bloklanmış olabilir. Port telnet testi yap.

---

**Kurumsal mail altyapı yönetimi, Exchange troubleshoot ve M365 migration için uzman destek?** Kozyatağı Bilişim M365 sertifikalı ekibimizle managed email hizmeti. [Teknik görüşme talep edin.](/#contact)
