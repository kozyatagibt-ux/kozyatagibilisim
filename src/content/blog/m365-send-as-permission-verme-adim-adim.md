---
slug: m365-send-as-permission-verme-adim-adim
title: "Microsoft 365 Send As Permission — Asistan CEO Adına Mail Gönderebilsin"
type: cluster
pillar: 6
url: "/blog/m365-send-as-permission-verme-adim-adim"
hedef_anahtar_kelime: "microsoft 365 send as permission"
meta_description: "Microsoft 365'te Send As permission adım adım — asistanın CEO adına mail gönderebilmesi için Admin Center, Exchange Admin Center ve PowerShell yöntemleri."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Send As Grant"
product_family: "Microsoft 365 & Outlook"
---

## Talep: "CEO'nun Asistanı Onun Adına Mail Göndersin"

İnsan Kaynakları müdürü pazartesi sabahı BT'ye yazdı:

> "Genel Müdürümüzün asistanı Ayşe Hanım, bazı mail'leri onun adına göndermek istiyor. 'Ayşe adına' değil, doğrudan **'Genel Müdür adına'** — imzada da öyle görünsün. Bugün yapılabilir mi?"

BT uzmanı Burak kendine sordu: Send As mı, Send on Behalf mı?

- **Send on Behalf**: Mail'de `Ayşe (asistan) on behalf of Genel Müdür` yazar. Alıcı asistanın yazdığını görür.
- **Send As**: Mail `Genel Müdür <ceo@firma.com>` olarak görünür. Alıcı doğrudan CEO yazmış zanneder.

İK müdürü "Send As" istedi. Burak bu özelliği verdi — 3 dakika sürdü.

## Hızlı Çözüm (TL;DR)

**Yöntem A — Microsoft 365 Admin Center (en kolay)**:
1. `admin.microsoft.com` > Users > Active users > CEO hesabı > **Mail** tab
2. **Mailbox permissions** > Send as > **Add permissions**
3. Ayşe'yi seç > Add

**Yöntem B — Exchange Admin Center (önerilen)**:
1. `admin.exchange.microsoft.com` > Recipients > Mailboxes > CEO > **Delegation**
2. **Send as** > **Edit** > **Add members** > Ayşe > Save

**Yöntem C — PowerShell**:
```powershell
Add-RecipientPermission -Identity ceo@firma.com -Trustee asistan@firma.com -AccessRights SendAs -Confirm:$false
```

Exchange Online **15-60 dakikada** senkronize eder. Outlook yeniden başlatılınca etki.

---

## Yöntem A — Admin Center (GUI, en hızlı)

Burak `admin.microsoft.com` açtı:

> 📸 **Ekran 1** — Microsoft 365 Admin Center ana sayfa  
> Sol menü: Dashboard, Users, Teams, Devices, Billing, Support, Settings...  
> Kullanıcılar (Users) tıklandı → Active users alt menüsü  
> Sağ panelde: Kullanıcı arama kutusu + mevcut kullanıcıların listesi

Arama: "ceo" → "CEO Firma" (veya gerçek adı) bulup tıklandı.

> 📸 **Ekran 2** — User details paneli  
> Sağdan kayıt panel açıldı  
> Üst tabs: Account, Devices, Licenses and apps, Mail, OneDrive  
> **Mail** tab seçildi  
> İçerik: Email aliases, Mailbox size, Mailbox permissions  
> **Mailbox permissions** bölümünde 3 alt başlık:  
> - Read and manage (Full Access)  
> - Send as  
> - Send on behalf

"Send as" altında "Manage mailbox permissions" linki veya doğrudan **"Add permissions"** butonu.

> 📸 **Ekran 3** — Add send as permissions dialog  
> Başlık: "Send as permissions"  
> Input: "Search for a user" — Ayşe yazıldığında autocomplete açılır  
> Asistan Ayşe seçildi, "Add" butonu tıklandı  
> Onay: "Ayşe added. It may take up to 60 minutes for permissions to apply."

Kaydet → dialog kapanır.

## Yöntem B — Exchange Admin Center (kurumsal standart)

EAC daha profesyonel, daha fazla kontrol sunar. `admin.exchange.microsoft.com`:

> 📸 **Ekran 4** — Exchange Admin Center  
> Sol menü: Dashboard, Recipients, Migration, Mail flow, Roles, Mobile, Reports...  
> **Recipients > Mailboxes** tıklandı  
> Sağ panelde kullanıcı listesi (mailbox)

CEO'yu bul, çift tık → detay paneli açılır:

> 📸 **Ekran 5** — Mailbox details paneli  
> Üst tabs: General, Contact information, Organization, Email addresses, Delivery options, **Delegation**, Mailbox policies  
> **Delegation** tab seçildi  
> İçerik: 3 bölüm — Send as, Send on behalf, Read and manage  
> Her bölümde "Edit" butonu

"Send as" altında **Edit** tıkla → Ayşe'yi ekle → Save.

## Yöntem C — PowerShell (toplu ve otomatik)

Eğer bir kerede 10 yönetici için 10 asistan eklenmesi gerekiyorsa GUI çok yorucu. PowerShell ile:

### Bağlantı

```powershell
# Exchange Online Management modülü (bir kez yükle)
Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser

# Bağlan (MFA destekli)
Connect-ExchangeOnline -UserPrincipalName admin@firma.com
```

### Tek Send As ekleme

```powershell
Add-RecipientPermission -Identity ceo@firma.com `
    -Trustee ayse.asistan@firma.com `
    -AccessRights SendAs `
    -Confirm:$false
```

### Toplu ekleme (CSV'den)

```csv
# delegates.csv
SourceMailbox,DelegateUser
ceo@firma.com,ayse@firma.com
cfo@firma.com,mehmet@firma.com
coo@firma.com,elif@firma.com
```

```powershell
Import-Csv .\delegates.csv | ForEach-Object {
    Add-RecipientPermission -Identity $_.SourceMailbox `
        -Trustee $_.DelegateUser `
        -AccessRights SendAs -Confirm:$false
    Write-Host "Granted SendAs: $($_.DelegateUser) -> $($_.SourceMailbox)"
}
```

### Mevcut Send As'leri listeleme

```powershell
Get-RecipientPermission -Identity ceo@firma.com | 
    Where {$_.AccessRights -contains "SendAs" -and $_.Trustee -ne "NT AUTHORITY\SELF"} |
    Format-Table Identity, Trustee, AccessRights
```

### Send As'i kaldırma

```powershell
Remove-RecipientPermission -Identity ceo@firma.com `
    -Trustee ayse.asistan@firma.com `
    -AccessRights SendAs `
    -Confirm:$false
```

## 09:20 — Outlook Tarafında Yapılacaklar

Ayşe'ye permission verildi ama **Outlook'unda otomatik görünmez**. Mail oluştururken "From" alanı manuel eklemeli.

### Outlook Desktop'ta "From" alanını görünür yap

> 📸 **Ekran 6** — Outlook yeni mail penceresi  
> Boş mail compose penceresi  
> Üst ribbon: Message, Insert, Options, Format Text, Review  
> **Options** tab'ı tıklanıyor  
> Ribbon'da "Show Fields" grubunda **From** butonu aktif ediliyor

Artık mail oluştururken yukarıda "From" alanı görünür:

> 📸 **Ekran 7** — Mail with From field  
> Compose penceresinde From alanı aktif  
> Dropdown ikonu tıklanıyor → mevcut hesaplar listelenir  
> "Other E-mail Address..." seçiliyor  
> Dialog açılıyor — CEO'nun e-mail'ini gir: `ceo@firma.com`  
> OK → From artık ceo@firma.com

İlk mail gönderilince sonraki mail'lerde "From" dropdown'da `ceo@firma.com` otomatik listelenir.

### Outlook Web (OWA)

Outlook Web'de aynı özellik:

1. Yeni mail oluştur
2. "From" alanı görünmüyorsa "..." menüsü > "Show From"
3. From dropdown'dan "Other email address" > CEO adresini gir

## 09:30 — Test Gönderimi

Ayşe kendi Outlook'unu açtı. Yeni mail:
- From: `ceo@firma.com` (manuel seçti)
- To: `test@firma.com` (deneme için)
- Subject: "Test"

Send.

Mail geldi → header kontrol:

```
From: CEO Firma <ceo@firma.com>
To: Test <test@firma.com>
```

**Hiçbir yerde "Ayşe" görünmüyor.** Mail sanki CEO'nun kendisi yazmış gibi.

✓ Başarılı.

## Send As vs Send on Behalf — Farkı Net Anlama

### Send As
```
From: CEO <ceo@firma.com>
```
Alıcı: **CEO kendisi yazmış**

### Send on Behalf
```
From: Ayşe Asistan <ayse@firma.com> on behalf of CEO <ceo@firma.com>
Reply-To: CEO <ceo@firma.com>
```
Alıcı: **Ayşe, CEO adına yazdı**

İkisini PowerShell'de ayırmak:
```powershell
# Send As
Add-RecipientPermission -Identity ceo@firma.com -Trustee ayse@firma.com -AccessRights SendAs

# Send on Behalf
Set-Mailbox -Identity ceo@firma.com -GrantSendOnBehalfTo @{Add="ayse@firma.com"}
```

Farklı cmdlet, farklı attribute.

## Yaygın Sorular ve Sorunlar

### Permission Verildi Ama Ayşe'de Görünmüyor

**Sebep**: Exchange Online propagation gecikmesi. 15-60 dakika, bazen 2 saat.

**Hızlandırma**:
```powershell
# Ayşe'nin mailbox'ındaki outlook profile cache'ini yenilet
Outlook kapat → açıldığında "Send/Receive All Folders" tıkla
```

Yine olmazsa Outlook restart. En son çare: profile reset.

### "The operation cannot be performed because the message has been changed"

Outlook eski versiyon (2016'dan önce) Send As için sürekli hatalar verebilir. Outlook güncel versiyona yükselt (Office 365 Apps otomatik güncel).

### Ayşe Gönderdikten Sonra Sent Items'ta Mail Yok

**Sebep**: Default olarak "Send As" mail'ler **gönderen kişinin** (Ayşe'nin) Sent Items'ına düşer. CEO'nun Sent Items'ında görünmez.

**Çözüm** (CEO'nun Sent Items'ına da kopyalansın):
```powershell
Set-OrganizationConfig -DelegateSentItemsStyle Sender
```

Bu şirket geneli ayardır. Alternative olarak Outlook'ta registry/GPO ayarı da var — kullanıcı bazlı.

### Bulk Permission Audit

Kim kimin mail'ini göndermeye yetkili, aylık kontrol:

```powershell
Get-Mailbox -ResultSize Unlimited | ForEach-Object {
    $perms = Get-RecipientPermission -Identity $_.UserPrincipalName |
        Where {$_.AccessRights -contains "SendAs" -and $_.Trustee -notlike "NT AUTHORITY*"}
    if ($perms) {
        foreach ($p in $perms) {
            [PSCustomObject]@{
                Mailbox = $_.UserPrincipalName
                Delegate = $p.Trustee
            }
        }
    }
} | Export-Csv -Path "send-as-audit.csv" -NoTypeInformation
```

### KVKK ve Audit Uyarısı

Send As kullanımı **audit log'a** düşer:
```powershell
Search-MailboxAuditLog -Mailboxes ceo@firma.com -LogonTypes Delegate -ShowDetails |
    Select LastAccessed, LogonUserDisplayName, Operation
```

KVKK denetiminde "Kim CEO adına mail gönderdi?" sorulursa bu log ile cevap verilir.

## İleri Seviye — Best Practice

### 1. Delegated Send'i Yazılı Policy ile Belgele

İK'nın yazdığı e-mail dışında **yazılı prosedür** olmalı:
- Kim kimin adına gönderebilir (matris)
- Hangi tür mail'ler (sadece idari, sözleşme değil)
- Audit sıklığı

### 2. MFA Zorunlu Ayşe'nin Hesabında

Ayşe CEO adına mail göndereceği için **kendi hesabı MFA**'lı olmalı. Conditional Access policy:
- "Ayşe" → sign-in risk yüksek → MFA zorunlu

### 3. Mail Flow Rule ile Dış Alıcıya Warning

External mail'e Send As ile gönderim önemli karar olabilir. Transport Rule:
- Kural: "If sender is Ayşe AND From header is ceo@firma.com AND recipient is external → notify CEO"

Böylece CEO her Send As gönderimden haberdar olur.

### 4. Outlook Signature Otomasyonu

Ayşe CEO adına gönderirken **CEO'nun imzası** otomatik eklensin:
- Outlook Signatures'ta "CEO Signature" ayrı kayıt
- Ayşe From dropdown'dan CEO seçince otomatik "CEO Signature" kullan (Options > Signatures > Choose default signature → Associate with From)

## İlgili Rehberler

- [M365 vs Google Workspace karşılaştırması](/blog/microsoft-365-vs-google-workspace-kurumsal)
- [Outlook 'Yeni e-postaları alırken hata' çözümü](/blog/outlook-yeni-epostalar-alirken-hata-olustu)
- [KVKK öz-denetim aracı](/kvkk-oz-denetim)

---

**M365 mailbox yönetimi, delegated permissions ve audit denetimi için uzman destek?** Kozyatağı Bilişim M365 sertifikalı ekibimizle kurumsal mail yönetimi. [Teknik görüşme talep edin.](/#contact)
