---
slug: exchange-hybrid-configuration-wizard-hcw
title: "Exchange Hybrid Kurulum — Hybrid Configuration Wizard (HCW) Adım Adım"
type: cluster
pillar: 6
url: "/blog/exchange-hybrid-configuration-wizard-hcw"
hedef_anahtar_kelime: "exchange hybrid configuration wizard"
meta_description: "On-prem Exchange'i M365 ile hybrid moda geçirme — HCW kurulumu, mail flow, free/busy, co-existence. Kullanıcı bazlı migration hazırlığı."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Exchange Hybrid"
product_family: "Microsoft 365 & Outlook"
---

## "Aşamalı M365 Geçişi, Exchange On-Prem Kalacak"

120 kullanıcı firma. M365'e geçiş kararı ama **tek seferde 120 mailbox taşımak** çok risk. Hybrid mode ile kademeli:
- Önce IT ekibi M365'e
- Sonra muhasebe
- Sonra tüm şirket — 3 ay

Bu aşamada mail hybrid çalışır — on-prem user ile M365 user free/busy görebilsin, meeting invite gitsin.

## Hızlı Çözüm (TL;DR)

1. Prerequisites: Exchange 2016+, public DNS, SSL cert
2. Entra Connect kurulu + user sync
3. Exchange Online license tenant'ta
4. Hybrid Configuration Wizard çalıştır
5. Hybrid agreements + mail flow otomatik kurulum

---

## Ön Koşullar

- **Exchange 2013 CU21+**, 2016 CU19+, 2019 CU11+
- Public DNS: `mail.firma.com.tr` (autodiscover), `owa.firma.com.tr`
- SSL sertifika SAN'da: `mail.firma.com.tr`, `autodiscover.firma.com.tr`
- Entra Connect sync aktif ([rehber](/blog/ad-azure-ad-connect-sync-kurulum-filtering))
- M365 tenant + verified domain

## 10:00 — HCW İndir + Çalıştır

```
https://aka.ms/HybridWizard
```

Her seferde Exchange Online'dan en güncel çekilir.

Exchange server'da (tercihen CAS rolü):
```
Right-click > Run as administrator
```

> 📸 **Ekran 1** — HCW Welcome  
> "Welcome to the Exchange Hybrid Configuration Wizard"  
> "The wizard will configure your on-premises Exchange and Exchange Online organizations to work together."  
> Next

## 10:10 — Credentials

İki tür cred:
- On-prem Exchange admin (org admin)
- Exchange Online (M365 global admin)

Her ikisi girilir, test pass.

## 10:15 — Hybrid Configuration

> 📸 **Ekran 2** — Hybrid Features  
> ● **Minimal hybrid** — free/busy + co-existence (30 gün içinde full migration için)  
> ● **Full hybrid** — mail flow + free/busy + extended migration  
>   
> Full hybrid seç (kademeli migration için)  

Minimal hybrid "express" cutover için. Full hybrid uzun co-existence planı için.

## 10:20 — Mail Flow

> 📸 **Ekran 3** — Mail flow  
> Mail flow direction:  
> ○ On-premises Exchange → Exchange Online → Internet  
> ● **On-premises Exchange ↔ Exchange Online ↔ Internet** (her iki taraftan)  
>   
> ☑ Enable centralized mail transport (optional)

Centralized = tüm internet-bound mail on-prem'den çıkar (compliance için — örneğin DLP on-prem'de). Default seçim çok. Küçük-orta için DISABLE.

## 10:25 — Endpoint + Certificate

> 📸 **Ekran 4** — Hybrid endpoint  
> External URL: **mail.firma.com.tr** (MX benzeri public URL)  
> Certificate: public CA cert hangisi?  
> List from Exchange cert store. "Exchange CA - 2024" seç

Bu sertifika M365 ve on-prem arasında TLS handshake için kullanılır.

## 10:30 — Configure

> 📸 **Ekran 5** — Ready to update  
> Review:  
> - Hybrid features: Full hybrid  
> - Mail flow: Bidirectional  
> - Endpoint: mail.firma.com.tr  
> - SSL cert: Exchange CA 2024  
>   
> Update (10-20 dk)

HCW otomatik yapılanlar:
- **Hybrid Send Connector** on-prem'de oluşturulur (→ M365 tenant)
- **Hybrid Receive Connector** on-prem'de (M365'ten gelen mail)
- **Office 365 Connector** M365'te (on-prem'e outbound)
- **Organization Relationships** oluşturulur
- **Federation Trust**
- **OAuth** configuration

## 10:50 — Post-Setup Verification

### Mail Flow Test

On-prem user → M365 user (aynı organization):
```
From: onprem.user@firma.com.tr
To: onprem.user.2@firma.com.tr (but moved to Exchange Online)
```

Mail gidiyor mu? Message header:
```
Received: from mail.firma.com.tr via ... to outlook.office365.com
```

Transit normal.

### Free/Busy Test

On-prem user Outlook'ta M365 user'ın takvim müsaitliğini görebilmeli:
- Outlook > Calendar > Share > Open Calendar
- M365 user seç → free/busy hash görünmeli (detay değil, hash bile OK demek)

Görünmüyorsa Federation Trust sorunu.

## 10:55 — İlk Kullanıcı Migration — Pilot

Küçük grup (IT ekibi, 5 user) M365'e geçir:

Exchange Admin Center (EAC) > Migration > Migrate (+ New > Migrate to Exchange Online):

> 📸 **Ekran 6** — Migration batch  
> Name: "IT-Pilot-Batch"  
> User list (CSV ile):  
>   EmailAddress  
>   it.manager@firma.com.tr  
>   it.tech1@firma.com.tr  
>   ...  
> Batch type: **Remote move migration** (on-prem → online)  
> Target delivery domain: firma.mail.onmicrosoft.com  
> Advanced options:  
> - Bad item limit: 10 (default)  
> - Large item limit: 0 (default)  

Start. Migration:
- Mailbox delta sync 2-8 saat (user bazında)
- Completion user online geçer, on-prem mailbox disabled olur
- Outlook otomatik reconnect M365'e

## Yaygın Hatalar

### HCW Fails — "Unable to establish OAuth"

OAuth config sorunu. Manuel:
```powershell
# On-prem Exchange
.\Configure-OAuth.ps1
```

Scripts Exchange CD'den.

### Free/Busy "Cannot connect to the Exchange server"

Federation Trust bozuk. HCW rerun veya manuel:
```powershell
Get-FederationTrust | Remove-FederationTrust
Get-FederationInformation -DomainName "outlook.com" -BypassAdditionalDomainValidation
New-FederationTrust -Name "Microsoft Federation Gateway"
```

### Public IP M365'ten Blokla

M365 "Suspicious IP" diye on-prem Exchange'e SMTP reject. Tenant allow list:
```powershell
Set-HostedConnectionFilterPolicy -IPAllowList 203.0.113.10
```

Firma public IP'sini allow.

### Migration Batch Fail — "Certificate does not match"

HCW'de seçilen sertifika SAN'da "mail.firma.com.tr" yok. Yeni cert + HCW rerun.

## Geçiş Sonrası

Tüm kullanıcılar M365'e taşındıktan sonra:
- On-prem Exchange **tamamen kaldır** yapılmaz — en az 1 server gerekir AD attribute yönetimi için
- Bu "Exchange Management Server" olarak tutulur — hybrid management
- Microsoft Entra Connect ile yönetilir

Tamamen cloud-only için:
```powershell
# "Cloud only" moda geçiş
Set-MsolDirSyncConfiguration -EnableSoftMatchOnUpn $true
# + extensive cleanup — Microsoft docs
```

## İlgili Rehberler

- [Azure AD Connect sync](/blog/ad-azure-ad-connect-sync-kurulum-filtering)
- [Exchange '550 5.7.1 Unable to relay'](/blog/exchange-550-5-7-1-unable-to-relay-cozumu)
- [Exchange 2019 CU14 transport bülteni](/blog/bulten-exchange-2019-cu14-transport-queue)

---

**Exchange hybrid deployment ve M365 migration için uzman destek?** [Teknik görüşme.](/#contact)
