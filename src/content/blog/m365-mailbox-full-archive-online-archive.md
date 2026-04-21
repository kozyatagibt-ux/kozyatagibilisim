---
slug: m365-mailbox-full-archive-online-archive
title: "'Your Mailbox is Full' — Archive Mailbox Aktivasyonu ve Policy"
type: cluster
pillar: 6
url: "/blog/m365-mailbox-full-archive-online-archive"
hedef_anahtar_kelime: "m365 mailbox full archive online"
meta_description: "M365 mailbox dolu: 'Your mailbox is full and cannot send or receive'. Online Archive aktivasyonu, auto-expanding archive, retention policy ile çözüm."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Mailbox Full"
product_family: "Microsoft 365 & Outlook"
---

## "Mail'im Tıkandı, Tekrar Gönderemiyorum"

CFO'dan panik:

> "Mail kutum dolu. Gönderemiyor, alamıyor. Kritik maili 2 saattir gönderiyorum — hata diyor."

```
Your mailbox has reached its size limit and is no longer able to send 
or receive messages. You have exceeded your mailbox quota.

Your current size: 100.0 GB
Limit: 100.0 GB (Business Premium)
```

BT uzmanı Elif 10 dk'da çözüm — **Online Archive + retention**.

## Hızlı Çözüm (TL;DR)

### Acil: Archive Aktivasyon
```powershell
Connect-ExchangeOnline
Enable-Mailbox -Identity cfo@firma.com.tr -Archive
Set-Mailbox -Identity cfo@firma.com.tr -ArchiveQuota 100GB -ArchiveWarningQuota 90GB
```

### Eski Mail Archive'a Taşı
Outlook'ta:
- File > Tools > Mailbox Cleanup
- Move items older than 180 days to Archive

Veya retention policy.

---

## Mailbox Size Limits (2024+)

| Plan | Primary | Archive |
|---|---|---|
| Business Basic | 50 GB | Yok |
| Business Standard | 50 GB | Yok |
| Business Premium | 50 GB | Yok |
| E3 / E5 | 100 GB | 100 GB (auto-expand 1.5 TB'a) |

CFO **Business Premium** — 50 GB primary. 100 GB dolmamış normalde ama attachments büyük + arşivlenmemiş.

## 10:00 — Archive Mailbox Aktivasyon

Archive = ayrı ek mailbox. Kullanıcı Outlook'ta 2 mailbox görür:
- Primary (50 GB): Son 6 ay mail
- Archive (100 GB+): 6+ ay önce mail

```powershell
Enable-Mailbox -Identity cfo@firma.com.tr -Archive
```

Dashboard'da da:
```
Exchange Admin Center > Recipients > Mailboxes > User > 
Mailbox > Manage archive: Enable
```

5 dakika sonra Outlook'ta "In-Place Archive — cfo@firma.com.tr" klasörü görünür.

## Auto-Expanding Archive (100 GB'dan 1.5 TB'a)

E3/E5 lisansta archive ilk 100 GB. Sonrası auto-expand:

```powershell
Set-OrganizationConfig -AutoExpandingArchive
```

Tenant-wide. Archive mailbox'lar gerektiğinde 100 GB aşıp otomatik büyür (max 1.5 TB).

**Not**: 100 GB'a ulaşana kadar expand başlamaz. Önce archive aktif, sonra full olunca expand.

## 10:15 — Retention Policy — Otomatik Taşıma

Kullanıcı el ile taşımak istemiyor. Policy ile **180 gün sonra** Archive'a otomatik:

```powershell
# Archive Policy
New-RetentionPolicyTag -Name "Archive 6 Months" `
    -Type All `
    -RetentionEnabled $true `
    -AgeLimitForRetention 180 `
    -RetentionAction MoveToArchive

# Policy'ye ekle
New-RetentionPolicy -Name "Corp Default Retention" -RetentionPolicyTagLinks "Archive 6 Months"

# Kullanıcıya atama
Set-Mailbox -Identity cfo@firma.com.tr -RetentionPolicy "Corp Default Retention"
```

### Managed Folder Assistant Tetikle

Policy hemen apply olmaz. Tetikle:
```powershell
Start-ManagedFolderAssistant -Identity cfo@firma.com.tr
```

6 ay+ eski tüm mail Archive'a taşınır. Primary mailbox 50 GB → 20 GB'a iner.

## 10:30 — Kullanıcı Tarafı

Outlook restart. Yeni klasör yapısı:
```
CFO Firma (Online)              ← Primary 50GB
  ├─ Inbox                        (son 6 ay)
  ├─ Sent
  ├─ Deleted
  └─ ...

In-Place Archive - cfo@firma.com.tr  ← 100GB+ archive
  ├─ Inbox (6+ ay önce)
  └─ ...
```

Archive tamamen searchable. Outlook arama her ikisinde de yapar.

## Otomatik Arşivleme Sorunları

### "Archive policy does not apply"

- Kullanıcıya policy atanmadı
- 7 gün içinde Managed Folder Assistant çalışmadı
- `Start-ManagedFolderAssistant` manuel tetikle

### Archive Mailbox Görünmüyor

- Outlook restart dene
- Managed Folder Assistant bekle (24 saat)
- Lisans Archive destekliyor mu? (Business Basic değil)

### Mobile'da Archive Görünmüyor

iOS/Android Outlook archive'ı sınırlı görür. Mobile search zayıf — web interface tam destek.

## Alternative — Large Mail Cleanup

Policy kurmadan acil temizlik. Outlook > Mailbox Cleanup Wizard:

> 📸 **Ekran 1** — Mailbox Cleanup  
> File > Tools > Mailbox Cleanup  
> - View Mailbox Size: Büyük dosyalar görülür  
> - Find items older than X days  
> - Find items larger than X KB  
> - **AutoArchive** (eski Outlook feature)

Büyük ek'lar + eski mailler toplu sil.

## Litigation Hold + Archive

Hukuki saklama zorunluluğu varsa:
```powershell
Set-Mailbox -Identity cfo@firma.com.tr -LitigationHoldEnabled $true
```

Archive'a taşınan mail'ler bile asla silinmez (legal hold). Compliance için kritik.

## İlgili Rehberler

- [Shared Mailbox oluşturma](/blog/m365-shared-mailbox-olusturma-lisanssiz)
- [Outlook 'Cannot start'](/blog/cannot-start-microsoft-outlook-cannot-open-window)

---

**M365 mail arşiv ve compliance yönetimi?** [Teknik görüşme.](/#contact)
