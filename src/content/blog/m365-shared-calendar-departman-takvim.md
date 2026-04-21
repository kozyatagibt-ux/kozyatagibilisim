---
slug: m365-shared-calendar-departman-takvim
title: "M365 Shared Calendar — Departman + Meeting Room Takvim Paylaşımı"
type: cluster
pillar: 6
url: "/blog/m365-shared-calendar-departman-takvim"
hedef_anahtar_kelime: "m365 shared calendar departman"
meta_description: "Microsoft 365'te shared calendar — departman takvimi, meeting room booking, resource mailbox. EAC ve Outlook config adım adım."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Shared Calendar"
product_family: "Microsoft 365 & Outlook"
---

## "Satış Ekibi Ortak Takvim İstiyor"

Satış müdürü:
> "Ekip satış ziyaretleri + müşteri toplantılarını ortak görsün. Hangi gün kim nerede?"

İki yöntem: **Shared Mailbox Calendar** (ücretsiz) veya **Resource Mailbox** (meeting room için).

## Hızlı Çözüm (TL;DR)

### Departman için Shared Mailbox Calendar
1. Shared mailbox oluştur: "Satis-Ekip-Takvim"
2. Ekip üyelerine Full Access + Send As
3. Outlook'a auto-mount olur, calendar görünür

### Meeting Room için Resource Mailbox
1. EAC > Recipients > Resources > + New Room
2. Booking policy: Auto-accept
3. Kullanıcı Outlook'ta "Add Room" — resource listede

---

## Yöntem A: Shared Mailbox Calendar

Shared mailbox aynı zamanda calendar'ı da var. [Shared Mailbox rehberi](/blog/m365-shared-mailbox-olusturma-lisanssiz)'nde kurulum detayı.

### Oluşturma

EAC > Recipients > Mailboxes > + Shared Mailbox:
- Display Name: Satış Ekip Takvim
- Email: satis-takvim@firma.com.tr
- Full Access: Tüm satış ekibi (+ auto-mapping)

### Outlook'ta Kullanım

Auto-mapping sayesinde Outlook açıldığında **iki mailbox** görünür:
- Kendi mailbox
- Satış Ekip Takvim (shared)

Calendar tab > Other calendars > "Satış Ekip Takvim" shown.

Toplantı eklerken takvim olarak shared'ı seç:
```
New Meeting > Calendar dropdown: satis-takvim@firma.com.tr
```

Tüm ekip görür.

## Yöntem B: Resource Mailbox (Meeting Room)

Toplantı odaları için **"Room"** tipi resource mailbox:

EAC > Recipients > Resources > + Add room mailbox:

> 📸 **Ekran 1** — New Room Mailbox  
> Name: "Meeting Room A - 20 kişi"  
> Alias: mra  
> Domain: firma.com.tr  
> Capacity: 20  
> Location: "Kat 3"

Save.

## Room Booking Policy

Resource policy > Booking options:

> 📸 **Ekran 2** — Booking policy  
> ☑ **Allow repeating meetings**  
> ☑ **Allow conflicts** — NO (çakışma olursa reject)  
> Booking window (days): 180  
> Maximum duration: 480 min (8 saat)  
> ☑ **Automatically process meeting requests**  
> ● Accept or decline  

"Automatically process" — kullanıcı oda davet etti, boşsa otomatik accept.

## Outlook'ta Oda Booking

Yeni meeting > Scheduling Assistant tab:
- Rooms button → "Add Rooms"
- Liste açılır: "Meeting Room A - 20 kişi"
- Seç → davet gönder

Oda boşsa 5 dk içinde accept → meeting oluşur. Çakışma varsa reject.

## Delegation — "Oda Müdürü"

Bazı odalar manual approval gerektirir (örn. Boardroom):

```powershell
Set-CalendarProcessing -Identity "boardroom@firma.com.tr" `
    -AutomateProcessing AutoUpdate `
    -ResourceDelegates "yusuf.admin@firma.com.tr"
```

Oda isteği Yusuf'a e-mail olarak gelir. Approve/Reject yapar.

## Departman Contact'ların Takvim Paylaşımı

Birden fazla kişi (manager + assistant + backup):

```powershell
Add-MailboxPermission -Identity satis-takvim@firma.com.tr `
    -User ahmet.yildiz@firma.com.tr `
    -AccessRights FullAccess

Set-MailboxFolderPermission -Identity "satis-takvim@firma.com.tr:\Calendar" `
    -User ahmet.yildiz@firma.com.tr `
    -AccessRights Editor
```

Editor = oluşturma + düzenleme. Reviewer = sadece okuma.

## Yaygın Sorunlar

### "Shared Calendar Görünmüyor"

Auto-mapping ile 5-10 dk bekle. Outlook restart.

Manuel ekleme:
```
Outlook > Calendar > Add Calendar > From Address Book > "satis-takvim"
```

### Oda Booking Conflict Oluşmuş

`Set-CalendarProcessing -AllowConflicts $false` → reject.

Mevcut conflict'leri temizle:
```powershell
Get-CalendarDiagnosticAnalysis -Identity boardroom@firma.com.tr `
    -StartDate "2024-05-01" -EndDate "2024-05-31"
```

## İlgili Rehberler

- [Shared Mailbox oluşturma](/blog/m365-shared-mailbox-olusturma-lisanssiz)
- [Send As permission](/blog/m365-send-as-permission-verme-adim-adim)

---

**M365 departman + room management için uzman destek?** [Teknik görüşme.](/#contact)
