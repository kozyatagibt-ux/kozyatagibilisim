---
slug: ad-azure-ad-connect-sync-kurulum-filtering
title: "Azure AD Connect (Entra Connect) Kurulum — Hybrid Identity Sync"
type: cluster
pillar: 2
url: "/blog/ad-azure-ad-connect-sync-kurulum-filtering"
hedef_anahtar_kelime: "azure ad connect entra connect kurulum"
meta_description: "Azure AD Connect / Entra Connect kurulum — on-prem AD ile M365 Entra ID senkronizasyonu. Password Hash Sync, filtering, staging mode."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "Entra Connect Setup"
product_family: "Microsoft 365 & Outlook"
---

## "M365'e Geçiyoruz, AD Kullanıcıları Nasıl Gidecek?"

Firma Microsoft 365 abonesi oldu. 200 kullanıcı AD'de var — M365'te de olmaları gerek. **Manuel 200 kullanıcı açmak absürt**.

Çözüm: **Entra Connect** (eski adı Azure AD Connect). AD'den M365'e otomatik sync.

## Hızlı Çözüm (TL;DR)

1. Ayrı server (DC'de değil) hazırla
2. **Entra Connect** Microsoft'tan indir
3. Express vs Custom kurulum
4. Sign-in: Password Hash Sync (önerilen) veya Pass-through Auth
5. Filtering: OU + attribute-based
6. Initial sync → 200 kullanıcı M365'te

---

## Ön Koşullar

- **Windows Server 2016+** (Entra Connect server)
- **2 GB+ RAM**, 100 GB disk
- Internet erişimi (443 HTTPS M365'e)
- **Domain-joined** ama DC değil
- AD Enterprise Admin yetkisi (ilk kurulum için)
- M365 Global Admin yetkisi
- **Verified domain** M365'te (custom domain)

## 10:00 — M365 Custom Domain Verify

M365'e default `firma.onmicrosoft.com`. Gerçek domain için:

Admin Center > Settings > Domains > Add domain:
- `firma.com.tr`
- Microsoft TXT record verir
- DNS'e ekle, verify

Sonra kullanıcı UPN'leri `firma.com.tr` olacak.

## 10:15 — Entra Connect Install

İndirme: https://www.microsoft.com/download/details.aspx?id=47594

Sunucuda çalıştır:

> 📸 **Ekran 1** — Entra Connect welcome  
> "Welcome to Azure AD Connect"  
> Continue (license agreement)  
>   
> Express Settings vs Custom Installation:  
> ○ Use express settings (hızlı, default)  
> ● **Customize** (tam kontrol)

**Custom önerilir** — production'da.

### Component Installation

- ☑ Install synchronization service
- ☐ SQL Server (default: SQL Express free, <100K user için yeterli)
- Install

## 10:25 — User Sign-In Yöntemi

> 📸 **Ekran 2** — User sign-in  
> Radio:  
> ● **Password Hash Synchronization** (önerilen)  
> ○ Pass-through Authentication  
> ○ Federation with AD FS  
> ○ Federation with PingFederate  
> ○ Do not configure  
>   
> ☑ Enable single sign-on

**Password Hash Sync (PHS)**:
- AD şifre hash'i (hash of hash) Entra ID'ye gönderilir
- Cloud authentication — fast, reliable
- En yaygın modern seçim

**Pass-through Authentication (PTA)**:
- Şifre cloud'a hiç gitmez
- Authentication AD'de yapılır (agent üzerinden)
- DC down = login down

**Federation (AD FS)**:
- On-prem kontrolü maximum
- AD FS kurulum + maintenance (bkz. [AD FS rehberi](/blog/ad-fs-federation-services-kurulum-claims))

PHS tercihi: modern + basic.

## 10:30 — M365 Credentials

> 📸 **Ekran 3** — Azure AD sign-in  
> Azure AD Global Administrator credentials iste  
> Email: admin@firma.onmicrosoft.com  
> Password: [M365 global admin]  
> Sign in  
>   
> Next

## 10:35 — On-Prem Directory

> 📸 **Ekran 4** — Connect directories  
> Forest: corp.firma.com.tr  
> "Add Directory" butonu  
> Enterprise Admin credentials: corp\enterprise.admin  
> Add

Multi-forest support var ama tek forest tipik.

## 10:40 — Domain + OU Filtering

**Kritik**: Hangi AD OU'larından sync edilsin?

> 📸 **Ekran 5** — Domain / OU filtering  
> Listede tüm AD domain/OU'lar:  
> ☑ corp.firma.com.tr  
>   ☑ OU=Users  
>     ☑ OU=Corp-Users  
>     ☑ OU=Interns  
>     ☐ OU=Service-Accounts ← M365'e sync etme  
>   ☐ OU=Computers ← genelde kapalı  
>   ☐ OU=DisabledAccounts ← kapalı  
>   ☐ OU=Admins ← security — kapalı

**Best practice**: Sadece gerçek kullanıcı OU'larını sync. Service account, admin hesapları, disabled user'lar hariç tut.

## 10:45 — Identifying Users

> 📸 **Ekran 6** — Uniquely identifying users  
> Source Anchor: **objectGUID** (recommended, default)  
> UserPrincipalName: **userPrincipalName**  
> ☑ Continue without matching all UPN suffixes to verified domains

Source anchor: Entra ID'de user kim olduğunu tekil tanımlar. objectGUID = AD'de değişmez.

## 10:50 — Optional Features

> 📸 **Ekran 7** — Optional Features  
> ☑ Exchange hybrid deployment (Exchange on-prem + M365 ise)  
> ☑ Exchange Mail Public Folders  
> ☑ Azure AD app and attribute filtering  
> ☑ **Password hash synchronization** (sign-in method seçildi)  
> ☑ **Password writeback** — M365'te şifre değiştirme on-prem AD'ye de yazar  
> ☐ Group writeback (Office 365 Groups → AD'ye yazar)  
> ☐ Device writeback  
> ☑ **Directory extension attribute sync**  

Password writeback → kullanıcı Outlook'ta şifre değiştirirse AD'ye geri yazılır. Çok faydalı.

## 10:55 — Configure + Initial Sync

> 📸 **Ekran 8** — Ready to configure  
> Summary özeti  
> ☑ **Start the synchronization process when configuration completes**  
> ☐ Enable staging mode (default: off, first run için)  
> Install

10-15 dakika sync. 200 kullanıcı:
- Kullanıcı objeleri M365'e upload
- Şifre hash'leri sync
- Groups, contacts

## 11:10 — Doğrulama

### M365 Admin Center

Users > Active users → Listede on-prem AD kullanıcıları görünür.
- Source: **Windows Server AD** (sync'li)
- License: henüz atanmadı — manuel ata

### Entra Connect Dashboard

Sunucuda `Synchronization Service Manager`:

> 📸 **Ekran 9** — Sync Service Manager  
> Operations tab:  
> Run profile geçmişi  
> Durumlar: "Success", "Completed-export-errors", vs.  
> Son run: "Success" ← initial sync OK

## Sync Sıklığı

Default **30 dakikada bir**. Manual tetikleme:
```powershell
Import-Module ADSync
Start-ADSyncSyncCycle -PolicyType Delta  # 30 dk'dan önce hızlı
Start-ADSyncSyncCycle -PolicyType Initial  # Full, saatler sürer
```

Delta: Son sync'ten beri değişenleri
Initial: Tüm objeleri baştan

## Attribute Filtering

Bazı attribute'ları M365'e gönderme — Fine-tuning için:

```
Synchronization Rules Editor > 
Inbound rules > Out to AAD - User Join >
  Transformation: extensionAttribute1 → expression: "" (empty)
```

Default ~100 attribute sync eder. Sensitive bilgi varsa kaldır.

## Staging Mode

Yedek Entra Connect sunucu = **staging mode**:
- Sync eder ama M365'e hiçbir şey yazmaz (read-only)
- Primary server down ise staging'i promote edilir (staging off)

```powershell
Set-ADSyncScheduler -SyncCycleEnabled $true
```

Config:
```
Azure AD Connect > Configure > View current configuration >
"Enable staging mode" checkbox
```

## Password Writeback Gereksinimleri

Self-service password reset + Azure AD → AD writeback için:
- Entra Connect service account'a on-prem AD'de "Reset Password" + "Write Lockout Time" permission
- Tüm Users OU'sunda delegation

Otomatik script:
```powershell
# Entra Connect sunucusunda
Start-PSFScript {
    # Delegation script
}
```

## Monitoring

### Entra Connect Health

Azure Portal > Entra Connect > Connect Health:
- Dashboard sync durumu
- Alert son fail sync
- Ücretsiz (Azure AD Premium P1 ile gelir)

### Son Sync Zamanı

```powershell
Get-ADSyncScheduler | Select LastSyncCycleStartTimeInUTC
```

30 dk'dan eski ise sorun.

## Yaygın Hatalar

### "Insufficient access rights" Entra Connect sunucusunda

Kurulum sırasında verdiğin credential enterprise admin değildi. Yeniden kurulum veya delegation fix.

### Sync Geç Yapıyor

`Set-ADSyncScheduler -CustomizedSyncCycleInterval "00:15:00"` — 15 dakikaya indir.

### User M365'te Görünüyor Ama License Yok

License assignment manuel veya group-based (license license assignment policy). Bulk assignment:
```powershell
# Azure AD PowerShell
Connect-MsolService
Get-MsolUser -All | Set-MsolUserLicense -AddLicenses "firma:ENTERPRISEPACK"
```

### Password Writeback Çalışmıyor

- Permission eksik (Reset Password + Write Lockout Time)
- Password writeback feature enable değil
- User'ın password policy on-prem ile uyumsuz (kompleksite, uzunluk)

## İlgili Rehberler

- [AD FS Federation Services kurulum](/blog/ad-fs-federation-services-kurulum-claims)
- [Bulk user import CSV](/blog/ad-bulk-user-import-csv-powershell)
- [Azure AD Connect sync delay bülteni](/blog/bulten-azure-ad-connect-sync-delay-2-saat)

---

**M365 hybrid identity, Entra Connect deployment ve modern workplace transformation için uzman destek?** Kozyatağı Bilişim identity paketimiz. [Teknik görüşme.](/#contact)
