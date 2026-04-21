---
slug: m365-retention-policy-10-yil-saklama
title: "M365 Retention Policy — Mail 10 Yıl Saklama (KVKK + Vergi)"
type: cluster
pillar: 6
url: "/blog/m365-retention-policy-10-yil-saklama"
hedef_anahtar_kelime: "m365 retention policy 10 yil"
meta_description: "M365 Purview Retention Policy — KVKK ve Vergi Usul Kanunu gereği mail + dosya 10 yıl saklama. Tenant-wide policy + mailbox/SharePoint scope."
kelime_sayisi: "~950"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Retention Policy"
product_family: "Microsoft 365 & Outlook"
---

## "Muhasebe Mail'lerimizi 10 Yıl Saklamalıyız"

Denetçi not aldı:
> "Vergi Usul Kanunu Madde 253 gereği belge + mail 10 yıl saklanmalı. M365'te retention policy var mı?"

BT müdürü yok dedi. Default Exchange retention 7 yıl — **yetersiz**.

Microsoft Purview **Retention Policy** ile çözüm.

## Hızlı Çözüm (TL;DR)

1. compliance.microsoft.com > Data lifecycle management > Retention policies
2. + New policy > "Corp 10-Year Retention"
3. Scope: Exchange + SharePoint + OneDrive + Teams
4. Retention period: 10 years
5. At end of period: Do nothing (keep forever veya manual review)

---

## 10:00 — Purview Portal

Microsoft Purview > Data Lifecycle Management > Retention:

> 📸 **Ekran 1** — Retention Policies  
> Liste: Existing policies (default Exchange retention)  
> "+ New retention policy" button

## Policy Settings

> 📸 **Ekran 2** — Retention Policy Create  
> Name: "Corp Retention 10 Years"  
> Description: "Mail + SharePoint + OneDrive 10 year hold per Turkish tax law"  
> Next  
>   
> **Locations**:  
>   ☑ Exchange mailboxes  
>   ☑ SharePoint classic + communication sites  
>   ☑ OneDrive accounts  
>   ☑ Teams channel messages  
>   ☑ Teams chats (1:1)  
>   ☐ Yammer community messages (opsiyonel)  
>   
> Apply to: **All** (veya specific users/groups/sites)

## Retention Settings

> 📸 **Ekran 3** — Retain + Delete Settings  
> ● **Retain items for a specific period**  
>   Retain items for: **10 years**  
>   Start the retention period based on: **When items were created**  
>   
> During retention period: ☑ Do nothing (user still sees items, delete korunur)  
>   
> At the end of retention period:  
>   ○ Delete items automatically  
>   ● **Do nothing** (keep forever unless manually deleted)  
>   
> Save

Save.

## Propagation + Etki

Policy 24 saat tenant-wide apply. Etkisi:

- Kullanıcı mail'i siler → **Deleted Items 30 gün** → **Recoverable Items 14 gün** → sonra normalde delete
- Retention policy ile: **Recoverable Items 10 yıl** tutar (hidden folder)
- Kullanıcı göremez ama data var

## Kullanıcı Tarafında Şeffaflık

Kullanıcı Outlook'tan delete yaptığında normal UX:
- Delete → Deleted Items
- Purge → kaybolur (gibi görünür)

Ama arka planda **"Recoverable Items"** folder'da tutulur. eDiscovery ile bulunabilir.

## eDiscovery — Eski Mail Arama

KDK'dan "X kişi hakkında Y tarihinde ne yazıştı?" sorgusu gelir.

Purview > eDiscovery > Cases:
- Case: "KDK-20240512-complaint"
- Custodians: "ceo@firma.com.tr", "cfo@firma.com.tr"
- Content locations: Mailboxes + OneDrive
- Keywords: "xyz müşteri"
- Date range: 2015-2024

Search → export to PST. Legal review.

## Advanced Retention — Label Bazlı

Her mail/dosya farklı retention isteyebilir:
- Müşteri sözleşmesi: 10 yıl
- Genel mail: 3 yıl
- Draft: silinebilir

Retention Labels + Auto-apply:

```
Label: "Customer Contract"
Retention: 10 years
Auto-apply: if message contains keyword "Sözleşme" veya "Contract"
```

User veya policy tarafından etiketlenen dosya ayrı süre.

## Litigation Hold

Dava durumunda policy bypass + tüm dosyalar freeze:
```powershell
Set-Mailbox -Identity ceo@firma.com.tr -LitigationHoldEnabled $true -LitigationHoldDuration 3650
```

3650 gün = 10 yıl. User silse bile korunur.

## Compliance Reporting

Purview > Audit:
- "Retention policy applied" events
- "Item retained due to policy" records

KDK denetçisine gösterilecek kanıt trail.

## KVKK ve Retention İkilemi

KVKK **kişisel veri** için saklama sürelerini **amaçla sınırlı** tutar:
- İş ilişkisi süresince + 10 yıl (vergi)
- Sonra silme zorunluluğu

Çakışma: vergi 10 yıl tut ↔ KVKK 10 yıl sonra sil.

**Çözüm**: Policy "10 yıl sonra delete" seç — vergi süresi sonunda otomatik temizlik. KVKK uyumlu.

```
At end of retention period: ● Delete items automatically
```

## İlgili Rehberler

- [Mailbox full + archive](/blog/m365-mailbox-full-archive-online-archive)
- [KVKK öz-denetim aracı](/kvkk-oz-denetim)
- [ISO 27001 90 gün](/blog/iso-27001-kobi-90-gun-yol-haritasi)

---

**M365 compliance + retention yönetimi için uzman destek?** [Teknik görüşme.](/#contact)
