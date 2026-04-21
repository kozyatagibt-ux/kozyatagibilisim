---
slug: m365-tenant-to-tenant-migration-birlesme
title: "M365 Tenant-to-Tenant Migration — Şirket Birleşmesi Sonrası"
type: cluster
pillar: 6
url: "/blog/m365-tenant-to-tenant-migration-birlesme"
hedef_anahtar_kelime: "m365 tenant to tenant migration"
meta_description: "M365 iki tenant birleştirme — şirket satın alma, merger sonrası mailbox + OneDrive + Teams migration. Quest, BitTitan, native Microsoft araçları."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "T2T Migration"
product_family: "Microsoft 365 & Outlook"
---

## "Başka Firmayı Satın Aldık, Onların M365 Tenant'ını Taşıyacağız"

Holding yeni şirket satın aldı. İki M365 tenant:
- Ana firma: firma.com.tr (400 user)
- Satın alınan: firmaalt.com.tr (80 user)

Hedef: firmaalt.com.tr tenant'ındaki 80 user + data → firma.com.tr'ye.

## Migration Seçenekleri

### Native Microsoft: MOVE Beta + Cross-Tenant User Data Migration

M365 Admin Center'da "Cross-tenant migration" (2023+ preview):
- Mailbox migration native
- OneDrive migration native
- Teams + SharePoint henüz kısıtlı

### 3rd Party Tools

- **Quest On Demand Migration** — kapsamlı, pahalı
- **BitTitan MigrationWiz** — popüler, kullanıcı başına ücret
- **SkyKick** — SMB'ye yönelik

Enterprise büyük tenant'larda 3rd party, küçükte native.

## Hızlı Çözüm (TL;DR)

Basit senaryo (sadece mailbox):
1. Hedef tenant'ta kullanıcı hesapları aç (AD sync veya manuel)
2. Source tenant'ta mailbox migration batch
3. IMAP migration veya native cross-tenant
4. DNS MX record değişimi → mail artık hedef tenant'a düşer
5. 30 gün cutover + decommission source tenant

---

## 10:00 — Pre-Migration

### Hedef Tenant'ta Kullanıcı Hazırlığı

Her source user için hedef tenant'ta:
- Hesap oluştur (CSV ile bulk)
- Lisans ata
- Mailbox provisioning (boş)

```powershell
# Hedef tenant'ta
Connect-MsolService

Import-Csv source-users.csv | ForEach-Object {
    $upn = $_.DisplayName -replace "\s",""
    $upn = "$upn@firma.com.tr"
    
    New-MsolUser `
        -UserPrincipalName $upn `
        -DisplayName $_.DisplayName `
        -LicenseAssignment "firma:ENTERPRISEPACK"
}
```

### Domain Strategy

İki seçenek:
- **Retain old domain**: firmaalt.com.tr hedef tenant'a taşı (verify + migrate)
- **Retire old domain**: Kullanıcı address değişir ad.soyad@firma.com.tr

Retain → mail trafiği kesintisiz. Retire → alias değişimi external contact'lara bilgi.

## 10:30 — Cross-Tenant User Data Migration (Native)

Microsoft'un yeni native çözümü. Prerequisites:

- Both tenants consent (accept migration agreement)
- Azure AD B2B collaboration enabled
- **Scheduled Migration batch** hedef tenant'ta

Admin Center > Setup > Microsoft Cross-Tenant User Data Migration:

> 📸 **Ekran 1** — Cross-tenant setup  
> Source tenant ID  
> Target tenant ID  
> Trust agreement — her iki taraf consent  
> Migration batch create  
> Users CSV upload

Scheduled migration overnight. Delta sync cutover gün.

## 10:45 — Mailbox Migration — Classic

3rd party / IMAP ile:

### PowerShell (Native M365 to M365)

```powershell
New-MigrationBatch `
    -Name "T2T-Batch-1" `
    -SourceEndpoint (New-MigrationEndpoint -Name "Source-Tenant" -RemoteServer outlook.office365.com -Credentials (Get-Credential)) `
    -CSVData (Get-Content users.csv -Encoding Byte) `
    -TargetDeliveryDomain "firma.mail.onmicrosoft.com" `
    -AutoStart
```

CSV format:
```
EmailAddress
user1@firmaalt.com.tr
user2@firmaalt.com.tr
...
```

## 11:00 — OneDrive / SharePoint Migration

### SharePoint Migration Tool (SPMT) — Microsoft

```
SharePoint Admin Center > Migration > OneDrive/SharePoint
```

- Source: Old tenant user's OneDrive
- Destination: Target user OneDrive
- Incremental migration

SPMT CSV-based, bulk migration.

### Content Considerations

- **Permissions**: External share link'ler yeniden tanımlanmalı
- **File history**: Version history korunur
- **Metadata**: Custom columns migrate
- **Size**: 10+ TB migration günler alır

## 11:30 — Teams Migration

Teams native cross-tenant **kısıtlı**. 3rd party (Quest, AvePoint) daha iyi:
- Channels + messages
- Files (SharePoint backed)
- Apps + tabs

Native:
```powershell
New-CsTeamsMigrationRequest -SourceTenant X -TargetTenant Y
```

**Limitation**: Public channel message history bazen kayıp.

## 12:00 — DNS Cutover

Tüm data migrate edildi → MX kaydı değişimi:

**Source tenant** (firmaalt.com.tr):
- MX: firmaalt-com-tr.mail.protection.outlook.com (Microsoft 365 default)

**Target tenant**:
- firmaalt.com.tr domain add
- Microsoft TXT record verify
- MX: firma-com-tr.mail.protection.outlook.com (hedef tenant)

DNS propagation 1-24 saat.

## Yaygın Problemler

### Mailbox Migration Slow

Network bandwidth kısıtlı. Source tenant'tan hedefe M365 to M365 migration Microsoft throttle uygular — günde 300-1000 mailbox pace. Büyük batch'lerde hafta sürebilir.

### Attribute Loss

Migration sonrası attribute kaybı:
- manager
- department
- employeeId

AD Connect her iki tarafta ise sync korunur. Cloud-only tenant'ta manuel remap.

### License Cost Overlap

Hem source tenant hem target tenant aynı user için lisans taşır geçiş döneminde. 30-60 gün süreyle **iki kat lisans maliyeti**. Planlamada bütçe.

## İlgili Rehberler

- [Azure AD Connect sync](/blog/ad-azure-ad-connect-sync-kurulum-filtering)
- [Exchange Hybrid HCW](/blog/exchange-hybrid-configuration-wizard-hcw)

---

**M365 migration (tenant-to-tenant, on-prem to cloud) uzman destek?** [Teknik görüşme.](/#contact)
