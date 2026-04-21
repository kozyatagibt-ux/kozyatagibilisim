---
slug: exchange-ndr-no-such-user-550-5-1-10
title: "Exchange NDR '550 5.1.10 RESOLVER.ADR.RecipientNotFound' — Silinmiş User"
type: cluster
pillar: 6
url: "/blog/exchange-ndr-no-such-user-550-5-1-10"
hedef_anahtar_kelime: "550 5.1.10 recipient not found"
meta_description: "Exchange mail gönderiminde '550 5.1.10 RESOLVER.ADR.RecipientNotFound' NDR — silinmiş user, stale cache, autocomplete sorunu ve çözümü."
kelime_sayisi: "~850"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "550 5.1.10"
product_family: "Microsoft 365 & Outlook"
---

## Ayrılan Çalışana Mail Gönderiyorsun Hâlâ

Satış müdürü Ayşe'ye mail attı:
```
To: emre.demir@firma.com.tr

Undeliverable
Your message to emre.demir@firma.com.tr couldn't be delivered.

emre.demir@firma.com.tr wasn't found at firma.com.tr.

Diagnostic information for administrators:
Generating server: DC01.corp.firma.com.tr
emre.demir@firma.com.tr
Remote Server returned '550 5.1.10 RESOLVER.ADR.RecipientNotFound; 
not found'
```

Emre 2 hafta önce ayrıldı. Mail hesabı silindi. Ayşe Outlook autocomplete'ten seçti.

## Hızlı Çözüm (TL;DR)

Outlook autocomplete cache temizle:
1. Yeni mail compose
2. "emre" yaz → autocomplete dropdown
3. Arrow key ile "emre.demir@..." üzerine gel
4. **Delete** tuşuna bas → autocomplete'ten silinir

Gelecekte bu adres suggest edilmez.

---

## 550 5.1.10 Anlamı

- **RESOLVER** = Exchange recipient resolver
- **ADR** = Address resolver
- **RecipientNotFound** = AD'de bu kullanıcı yok

Exchange hedef user'ı AD/Entra'da bulamıyor. 3 senaryo:

### Senaryo 1: User Silinmiş

Kullanıcı AD'de silinmiş → mail gidemez.

Kontrol:
```powershell
Get-ADUser -Filter "EmailAddress -eq 'emre.demir@firma.com.tr'"
# Boş = user yok
```

**Çözüm**: Gönderici autocomplete temizle.

### Senaryo 2: Shared Mailbox'a Çevrilmiş

User silinmedi ama **Shared Mailbox**'a dönüştürüldü (ayrılan çalışan için standart). Bu durumda adres aktif ama mail ayarı değişti.

Kontrol:
```powershell
Get-Mailbox -Identity emre.demir@firma.com.tr
```

`RecipientTypeDetails: SharedMailbox` → aktif, mail almalı.

Bu durumda NDR 550 5.1.10 genelde gelmez. Gelmişse başka sorun.

### Senaryo 3: UPN Değişmiş

User hâlâ var ama email alias değişti. Mesela yanlış yazılmış:
```
To: emre.demir@firma.com  (.tr eksik)
```

Typo. Doğru adres yaz.

### Senaryo 4: Alias Hâlâ Tanımlı Ama Disabled

```powershell
Get-Mailbox -Identity "emre.demir" -ErrorAction SilentlyContinue
```

Mailbox disabled ise:
```powershell
Get-Mailbox -Filter "DisplayName -eq 'Emre Demir'"
```

Get-MailUser veya Get-Contact da dene.

## Autocomplete Cache Nerede?

Outlook autocomplete eski OST içinde tutulur. Temizleme:

### Spesifik Adres

Yeni mail > "To:" alanına "emre" yaz > dropdown görünür > arrow key > **Delete** (X butonu).

### Tüm Autocomplete

File > Options > Mail > Send Messages > **Empty Auto-Complete List**.

## Server-Side — Stale Addresses

Gelen mail'lerde bulunan eski adresler Outlook "Offline Address Book" (OAB)'tan gelebilir. OAB güncelle:
```powershell
Update-OfflineAddressBook "Default Offline Address Book"
Update-FileDistributionService -Server "Exchange-Mbx-01"
```

Outlook client'ta manuel download:
```
Send/Receive > Send/Receive Groups > Download Address Book
```

## İlgili Rehberler

- [Onboarding / Offboarding IT Checklist](/blog/calisan-onboarding-offboarding-it-checklist)
- [Shared Mailbox oluşturma](/blog/m365-shared-mailbox-olusturma-lisanssiz)

---

**M365 mail flow troubleshoot?** [Teknik görüşme.](/#contact)
