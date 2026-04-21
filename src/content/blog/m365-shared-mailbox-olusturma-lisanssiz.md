---
slug: m365-shared-mailbox-olusturma-lisanssiz
title: "M365 Shared Mailbox Oluşturma — destek@ info@ muhasebe@ Adresleri Lisanssız"
type: cluster
pillar: 6
url: "/blog/m365-shared-mailbox-olusturma-lisanssiz"
hedef_anahtar_kelime: "microsoft 365 shared mailbox oluşturma"
meta_description: "Microsoft 365'te destek@, info@ gibi paylaşımlı mailbox'lar nasıl oluşturulur — lisanssız, delegate erişim, Outlook'a otomatik ekleme. Ekran görüntülü."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Shared Mailbox Setup"
product_family: "Microsoft 365 & Outlook"
---

## "destek@firma.com Mail'lerini Herkes Görebilsin"

Yeni açılan müşteri hizmetleri ekibi 4 kişilik. İK müdürü BT'ye yazdı:

> "Müşterilerden gelen **destek@firma.com** adresindeki mail'leri 4 ekip arkadaşı görecek. Hepsine aynı mail kutusu lazım. Tek tek her birine lisans vermeyelim — bu tür 'genel e-posta kutuları' için başka bir yöntem olmalı."

BT uzmanı Ayşe: "Shared Mailbox. Lisanssız, 50 GB'a kadar ücretsiz, 4 kişi paralel çalışabilir. Bugün yapıyorum."

## Shared Mailbox Nedir, Ne Zaman Kullanılır?

Shared Mailbox = **kendi şifresi ve lisansı olmayan** bir mail adresi. Başka kullanıcılar delegate permission ile erişir.

**Kullanım örnekleri:**
- `destek@`, `info@`, `iletisim@` gibi genel adresler
- `muhasebe@`, `satis@` departman mailboxları
- Ayrılan çalışanın mail'inin 6-12 ay boyunca ekip tarafından erişilebilir tutulması

**Sınırlar:**
- 50 GB (standart), 100 GB (Exchange Online Plan 2 ile)
- Archive için ayrı 50 GB eklenebilir (lisans gerekli)
- Kendi şifresi yok, kimse direkt login olamaz
- Otomatik senkronize kurallar, imza (kısıtlı)

## Hızlı Çözüm (TL;DR)

1. Exchange Admin Center → Recipients → Mailboxes → **Add shared mailbox**
2. İsim: "Destek", E-mail: `destek@firma.com`
3. Delegation → **Read and manage** + **Send as** → 4 kişi ekle
4. Kullanıcıların Outlook'larına **otomatik** mount olur (auto-mapping)

PowerShell tek komut:
```powershell
New-Mailbox -Shared -Name "Destek" -DisplayName "Müşteri Destek" -Alias "destek"
```

---

## 10:00 — Exchange Admin Center'da Yeni Shared Mailbox

Ayşe `admin.exchange.microsoft.com` açtı:

> 📸 **Ekran 1** — Exchange Admin Center > Recipients > Mailboxes  
> Üst navigation: Dashboard, Recipients, Migration, Mail flow, Roles, Mobile, Reports...  
> Sol alt menü: Recipients → Mailboxes seçili  
> Sağ panelde mailbox listesi (user mailboxes)  
> Üst butonlar: "Add a shared mailbox", "Filter", "Export"

**"Add a shared mailbox"** tıklandı:

> 📸 **Ekran 2** — Add shared mailbox panel  
> Sağdan açılan form paneli  
> Alanlar:  
> - Display name: (input)  
> - Email address: (input + domain dropdown)  
> - Alias: (input)  
> Bottom: "Create" butonu

Ayşe doldurdu:
- **Display name**: Müşteri Destek
- **Email address**: destek @ firma.com
- **Alias**: destek

Create → 10 saniye içinde oluştu.

## 10:05 — Üyeleri Ekleme

Yeni oluşturulan "Müşteri Destek" mailbox'a çift tık → detay paneli:

> 📸 **Ekran 3** — Shared mailbox detail panel  
> Üst tabs: General, Delegation, Email addresses, Mailbox policies, Mail flow settings, Automatic replies  
> **Delegation** tab seçildi

Delegation altında 3 bölüm:
- **Read and manage** (Full Access) — mail görme + yanıt verme
- **Send as** — destek@ adresinden mail gönderebilir
- **Send on behalf** — "on behalf of" format

"Read and manage" altında **Edit** → **Add members** → 4 kişiyi ekle:

> 📸 **Ekran 4** — Add members dialog  
> Başlık: "Full access permissions"  
> Search box: Kullanıcı aranıyor  
> Her biri seçilip "Add" tıklanıyor:  
> - Mehmet Yılmaz  
> - Elif Demir  
> - Can Kara  
> - Ayşe Yıldız

Save. Aynı 4 kişi için **"Send as"** bölümüne de eklenir (destek@ adresinden gönderebilsinler diye).

## 10:15 — Kullanıcı Tarafı: Otomatik Mount

Shared Mailbox'ın sihri: **Auto-mapping**. Kullanıcının Outlook'una otomatik eklenir. Manuel kurulum gerekmez.

### Auto-mapping Çalışma Şekli

Mehmet Outlook'unu açtı. Sol panelde mailbox listesi:

> 📸 **Ekran 5** — Outlook sol panel  
> Üstte: mehmet.yilmaz@firma.com mailbox'ı expanded  
> Inbox, Drafts, Sent, vs. alt klasörler  
> Altında **yeni**: "Müşteri Destek" mailbox'ı expanded  
> Aynı alt klasörler burada da (Inbox, Sent, vs.)

**İki mailbox paralel**. Mehmet kendi mailine de bakabilir, destek'e gelen mail'e de.

Eğer auto-mapping bazı kullanıcılarda 2 saat sonra hâlâ görünmezse:
- Outlook restart
- M365 sign-out + sign-in
- Son çare: manuel ekleme (File > Account Settings > Email Accounts > More Settings > Advanced > Add)

## 10:20 — Send As Testi

Mehmet yeni mail oluşturdu. **From** alanı (Send As permission olduğu için görünür):

> 📸 **Ekran 6** — Outlook yeni mail — From seçimi  
> From dropdown: mehmet.yilmaz@firma.com (default)  
> Altında: destek@firma.com (yeni eklendi)  
> Mehmet destek@'yi seçti  

Mail gönderildi. Alıcı:
```
From: Müşteri Destek <destek@firma.com>
To: test@firma.com
```

Mehmet'in adı görünmüyor. Müşteri direkt "destek" ile iletişim kurmuş gibi.

## 10:25 — "Sent Items" Problemi

Bir kritik detay: Mehmet destek@ adresinden mail gönderdi, ama **bu mail kimin Sent Items'ında?**

Default davranış: **Sadece Mehmet'in** Sent Items. Diğer 3 kişi göremiyor.

### Çözüm: Kuruma Özel Ayar

```powershell
# Tüm organization için shared mailbox Sent Items'ına kopya
Set-OrganizationConfig -DelegateSentItemsStyle DelegateAndSender
```

Bu ayardan sonra:
- Mehmet'in Sent Items'ında: Kopya var
- destek@ Sent Items'ında: Kopya var (diğer 3 kişi görebilir)

**Kritik not**: Bu ayar şirket geneli. Etkilenen tüm shared mailbox'lar. 1 saat içinde etki.

### Alternatif: Registry Ayarı (Kullanıcı Bazlı)

Her kullanıcı makinesinde Outlook registry:
```
HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\Preferences
DelegateSentItemsStyle = 1 (DWORD)
```

GPO ile deploy edilebilir.

## 10:30 — Automatic Replies

"Müşteri Destek" mailbox'ına otomatik reply kurulsun (hafta sonu, mesai saati dışı):

EAC → "Müşteri Destek" detay → **Automatic replies** tab:

> 📸 **Ekran 7** — Automatic replies config  
> Toggle: "Send automatic replies" ON  
> Date/time pickers: "Only send during this time range" opsiyonel  
> Textbox 1: "Send replies only to senders inside your organization"  
> Textbox 2: "Send replies to senders outside your organization"  
> Format: plain text / HTML toggle

İçerik:
```
Merhaba,

Destek talebiniz için teşekkür ederiz. Mesajınızı aldık.

Mesai saatlerimiz: Pazartesi-Cuma 09:00-18:00
Mesai saatleri içinde en geç 2 saat içinde dönüş yapacağız.
Acil durum için: +90 541 636 77 75

Saygılarımızla,
Müşteri Destek Ekibi
```

## 10:40 — PowerShell ile Toplu Kurulum

10+ shared mailbox oluşturmak gerekirse GUI yorucu. PowerShell otomasyon:

### Bağlan

```powershell
Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser
Connect-ExchangeOnline -UserPrincipalName admin@firma.com
```

### Yeni Shared Mailbox + üyeler

```powershell
# 1. Mailbox oluştur
New-Mailbox -Shared -Name "Muhasebe" -DisplayName "Muhasebe" -Alias "muhasebe"

# 2. Full Access permission
Add-MailboxPermission -Identity muhasebe@firma.com `
    -User "muhasebe.ekibi@firma.com" `
    -AccessRights FullAccess `
    -AutoMapping $true

# 3. Send As permission
Add-RecipientPermission -Identity muhasebe@firma.com `
    -Trustee "muhasebe.ekibi@firma.com" `
    -AccessRights SendAs `
    -Confirm:$false
```

`-AutoMapping $true` — Outlook'ta otomatik mount.

### CSV'den toplu

```csv
# shared-mailboxes.csv
Name,DisplayName,Alias,Members
Destek,Müşteri Destek,destek,"mehmet@firma.com,elif@firma.com"
Muhasebe,Muhasebe,muhasebe,"ayse@firma.com,can@firma.com"
Satis,Satış,satis,"mehmet@firma.com,elif@firma.com,ayse@firma.com"
```

```powershell
Import-Csv shared-mailboxes.csv | ForEach-Object {
    $mbx = New-Mailbox -Shared -Name $_.Name -DisplayName $_.DisplayName -Alias $_.Alias
    
    $_.Members -split "," | ForEach-Object {
        $member = $_.Trim()
        Add-MailboxPermission -Identity $mbx.Identity -User $member -AccessRights FullAccess -AutoMapping $true
        Add-RecipientPermission -Identity $mbx.Identity -Trustee $member -AccessRights SendAs -Confirm:$false
    }
    
    Write-Host "Created: $($_.Name) with $($_.Members.Split(',').Count) members"
}
```

## Yaygın Sorunlar

### Shared Mailbox Outlook'ta Görünmüyor

- Auto-mapping cache gecikmiş. Outlook restart → açılmazsa 2 saat bekle
- Kullanıcıya Full Access verildi mi? (`Get-MailboxPermission -Identity destek@ | Where {$_.User -like "*kullanici*"}`)
- Outlook profile bozuk olabilir: reset + yeni profile

### Manuel Ekleme (Auto-mapping Yok)

File > Account Settings > Double-click account > More Settings > Advanced tab > **Add** > `destek@firma.com`

### Shared Mailbox 50 GB Dolmuş

Archive aktif et (Exchange Online Plan 2 lisans gerekli):
```powershell
Enable-Mailbox -Identity destek@firma.com -Archive
Set-Mailbox -Identity destek@firma.com -ArchiveQuota 100GB
```

### "Shared Mailbox Login Olmuyor" Rica Ediyorum

Shared mailbox'ın kendi şifresi **yok**. Direkt login yapılmaz. Başkası üzerinden (delegate) erişilir.

Bazen SaaS entegrasyonu için "shared mailbox password" gerekli olabilir (eski SMTP AUTH ihtiyaçları). Bu durumda:
```powershell
Set-Mailbox -Identity destek@firma.com -Type Regular  # User mailbox'a dönüştür
# Lisans ekle, şifre ata
# Ama artık "shared mailbox" değil, normal user mailbox oldu
```

### KVKK: Kim destek@'den Mail Gönderdi?

Audit log:
```powershell
Search-UnifiedAuditLog -StartDate (Get-Date).AddDays(-7) -EndDate (Get-Date) `
    -Operations "SendAs,SendOnBehalf" `
    -RecordType ExchangeItem |
    Where {$_.AuditData -like "*destek@firma.com*"}
```

Son 7 gün destek@'den kim mail gönderdi — görebiliriz.

## Best Practices

### 1. Shared Mailbox'a Özel İmza

Kurumsal imza Outlook'ta user bazında tutulur — shared mailbox imzası manuel. Çözüm:
- Transport Rule ile otomatik imza ekle
- Exchange Admin Center → Mail flow → Rules → "Apply disclaimer" kuralı
- If sender is `destek@firma.com` → disclaimer "Müşteri Destek Ekibi - ..."

### 2. Ticketing System Entegrasyonu

Büyük hacim için Shared Mailbox + ticketing:
- Freshdesk, Zendesk, Jira Service Management
- Mail → otomatik ticket oluşturur
- Ekip ticket üzerinden yanıtlar
- Professional + scalable

### 3. KVKK: Müşteri Verisi Saklama

destek@'den gelen mail'ler müşteri verisidir. KVKK 10 yıl saklama:
- Retention Policy: "Customer Support Mail — 10 Year Hold"
- Compliance Center'dan tanımla

### 4. Auto-forward External Engelleme

Shared mailbox compromise olursa dışa forward en hızlı veri sızdırma vektörü:
```powershell
# Tüm shared mailbox'larda dışa forward kapalı
Get-Mailbox -RecipientTypeDetails SharedMailbox | 
    Set-Mailbox -ForwardingSmtpAddress $null -DeliverToMailboxAndForward $false
```

## İlgili Rehberler

- [Send As permission verme](/blog/m365-send-as-permission-verme-adim-adim)
- [Outlook 'yeni e-postaları alırken hata'](/blog/outlook-yeni-epostalar-alirken-hata-olustu)
- [Exchange CU14 transport queue bülteni](/blog/bulten-exchange-2019-cu14-transport-queue)

---

**M365 mailbox deployment, shared mailbox architecture ve delegation yönetimi için uzman destek?** Kozyatağı Bilişim olarak Exchange Online sertifikalı ekibimizle. [Teknik görüşme talep edin.](/#contact)
