---
slug: exchange-mailbox-audit-kim-ne-okudu
title: "Exchange Mailbox Audit — 'Kim Kimin Mail'ini Okudu' Denetimi"
type: cluster
pillar: 6
url: "/blog/exchange-mailbox-audit-kim-ne-okudu"
hedef_anahtar_kelime: "exchange mailbox audit kim okudu"
meta_description: "Exchange Online mailbox audit — hangi admin, hangi tarihte, hangi mail'i okudu veya sildi. Search-MailboxAuditLog + Purview eDiscovery."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Mailbox Audit"
product_family: "Microsoft 365 & Outlook"
---

## "CEO Assistant CEO Mail'ini Okuyabilir Mi?"

CEO ofiste yok. Asistan Ayşe [Send As permission ile](/blog/m365-send-as-permission-verme-adim-adim) mail gönderebilir ama **CEO'nun inbox'ını okuyabilir mi?** KVKK + sınır soru.

Denetim için: "Kim ne zaman ne okudu?" log'u.

## Hızlı Çözüm (TL;DR)

```powershell
Connect-ExchangeOnline

# Default mailbox audit aktif mi?
Get-OrganizationConfig | Select AuditDisabled
# AuditDisabled: False ← default aktif

# CEO mailbox için kim ne yaptı?
Search-MailboxAuditLog -Identity ceo@firma.com.tr `
    -LogonTypes Delegate, Admin `
    -ShowDetails `
    -StartDate (Get-Date).AddDays(-7) `
    -EndDate (Get-Date)
```

---

## Mailbox Audit Aktivasyon

Default 2019+ tenant'larda aktif. Kontrol:

```powershell
Get-Mailbox ceo@firma.com.tr | Select AuditEnabled, AuditLogAgeLimit
```

Çıktı:
```
AuditEnabled     : True
AuditLogAgeLimit : 90.00:00:00
```

90 gün saklama default. Uzatma:
```powershell
Set-Mailbox ceo@firma.com.tr -AuditLogAgeLimit 365  # 1 yıl
```

KVKK için 10 yıl? **Unified Audit Log** daha uzun süreli (Purview).

## Audit Operation Types

Hangi işlemler loglanır:
```powershell
Get-Mailbox ceo@firma.com.tr | Select AuditAdmin, AuditDelegate, AuditOwner
```

Kategoriler:
- **Owner** — mailbox sahibi işlemleri
- **Delegate** — başkasına verilmiş Send As / Full Access işlemleri
- **Admin** — M365 admin role ile bağlı işlemler

Her category için log'lanan operations:

```powershell
# Delegate için önemli olanlar
Set-Mailbox ceo@firma.com.tr -AuditDelegate @{Add="SendAs","SendOnBehalf","SoftDelete","HardDelete","Update","Move","MoveToDeletedItems","MailItemsAccessed"}
```

**MailItemsAccessed** kritik — "kim hangi mail'i okudu" log'u (2020 Microsoft E5 ile geldi).

## 10:00 — Search-MailboxAuditLog

```powershell
Search-MailboxAuditLog -Identity ceo@firma.com.tr `
    -LogonTypes Delegate `
    -ShowDetails `
    -StartDate "2024-05-01" `
    -EndDate "2024-05-12" |
    Where Operation -eq "MailItemsAccessed" |
    Select LastAccessed, LogonUserDisplayName, OperationProperties
```

Çıktı:
```
LastAccessed        LogonUserDisplayName  OperationProperties
------------        --------------------  -------------------
5/10/2024 09:15     Ayse Demir            MessageId: ... Subject: "Budget Report Q2"
5/10/2024 09:22     Ayse Demir            MessageId: ... Subject: "Board Meeting"
5/11/2024 14:07     Ayse Demir            MessageId: ... Subject: "Salary proposal"  ← Ahem!
```

Ayşe "Salary proposal" mail'ini açmış. CEO izin vermiş miydi?

## Unified Audit Log (Purview)

Kapsamlı, daha uzun saklama:

Purview > Audit > Search:

> 📸 **Ekran 1** — Audit Log Search  
> Date range: 2024-05-01 to 2024-05-31  
> Activities:  
>   - Accessed mailbox items  
>   - Sent messages using Send As permissions  
>   - Send messages using Send On Behalf permissions  
> Users: ayse.asistan@firma.com.tr  
> File, folder or site: (boş)  

Search. Sonuç CSV export.

## 10:15 — Saldırı Sonrası Forensic

Ransomware / compromise sonrası:
```powershell
# Son 30 gün tüm admin işlemleri
Search-UnifiedAuditLog -StartDate (Get-Date).AddDays(-30) -EndDate (Get-Date) `
    -RecordType ExchangeAdmin -ResultSize 5000

# Şüpheli mailbox permissions
Search-UnifiedAuditLog -StartDate (Get-Date).AddDays(-30) -EndDate (Get-Date) `
    -Operations "Add-MailboxPermission", "Set-Mailbox" `
    -ResultSize 5000
```

Saldırgan mailbox forwarding kurdu mu? Add-MailboxPermission ekledi mi?

## Advanced Audit (Purview E5)

M365 E5 lisans **Advanced Audit**:
- 1 yıl log saklama (10 yıla uzatma mümkün)
- "MailItemsAccessed" detaylı (hangi mesaj, hangi tarih)
- "Search" operation (kullanıcının search query'leri)

```powershell
Search-UnifiedAuditLog -Operations "MailItemsAccessed" `
    -UserIds ayse.asistan@firma.com.tr
```

## Audit Disable — Yasal Olarak Uygun Değil

Bazı kullanıcılar "BT beni izliyor" rahatsızlığı. **Aydınlatma metni** şart:

```
Kurumsal e-posta izlenmektedir:
- Admin operations
- Delegated access
- Mail Items Accessed (E5 kullanıcılarda)

KVKK kapsamında "meşru amaç" (iş sürekliliği, güvenlik) dayanağıyla.
```

Audit'i kapatmak yasal risk. Denetim izi olmadan CEO mail okuma iddiası çürütülemez.

## Alert — Otomatik Bildirim

Purview > Policies > Alert Policies > + New:
- Name: "CEO Mailbox — Delegate Access Alert"
- Trigger: User accesses mailbox items (MailItemsAccessed) on CEO mailbox
- Recipient: security@firma.com.tr

Ayşe CEO mail'e açtığında SecOps anında bilir.

## İlgili Rehberler

- [Send As permission](/blog/m365-send-as-permission-verme-adim-adim)
- [Retention Policy 10 yıl](/blog/m365-retention-policy-10-yil-saklama)
- [Anti-phishing policy](/blog/m365-defender-anti-phishing-policy)

---

**M365 audit + compliance için uzman destek?** [Teknik görüşme.](/#contact)
