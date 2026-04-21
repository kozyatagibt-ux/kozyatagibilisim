---
slug: ad-dynamic-access-control-dac-file-server
title: "Dynamic Access Control (DAC) — Claim-Based File Server Güvenliği"
type: cluster
pillar: 2
url: "/blog/ad-dynamic-access-control-dac-file-server"
hedef_anahtar_kelime: "dynamic access control dac windows server"
meta_description: "AD Dynamic Access Control (DAC) — kullanıcı claim'leri, file classification, central access policy. Departman + sensitivity bazlı otomatik file güvenliği."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "DAC Setup"
product_family: "Windows Server & Active Directory"
---

## "Finans Klasörüne Sadece Finansçılar Erişsin"

Klasik yaklaşım: Her klasöre ayrı AD grup + manuel izin. 200 kullanıcı, 500 klasör = binlerce tek-tek ACL.

Modern yaklaşım: **Dynamic Access Control (DAC)**. Kullanıcı attribute'u (örn. `Department = Finance`) + dosya etiketi (`Confidentiality = High`) = otomatik izin.

Bu yazı DAC kurulumunu anlatıyor.

## Hızlı Çözüm (TL;DR)

1. **Claim Types** tanımla (User Department, File Sensitivity)
2. **Resource Properties** oluştur (dosyaya etiket)
3. **Central Access Rule** yaz (claim + resource property koşulu)
4. **Central Access Policy** paketleyip file server'a GPO ile push
5. File classification ile dosyaları otomatik etiketle

---

## Ön Koşullar

- **Windows Server 2012+** DC + file server
- Forest functional level **2012+**
- **Kerberos armoring** (FAST) enabled
- KDC support for claims GPO aktif

### KDC Claims Desteği

GPO:
```
Computer Config > Policies > Admin Templates > System > KDC >
"KDC support for claims, compound authentication and Kerberos armoring"

Set: **Always provide claims**
```

Bu GPO'yu Domain Controllers OU'suna link.

### Client Tarafı

```
Computer Config > Policies > Admin Templates > System > Kerberos >
"Kerberos client support for claims, compound authentication and Kerberos armoring"

Set: **Enabled**
```

Domain-wide apply.

## 10:00 — Claim Types Oluşturma

ADAC (dsac.exe) > **Dynamic Access Control** container > **Claim Types**:

> 📸 **Ekran 1** — Claim Type create  
> New > Claim Type  
> Source Attribute dropdown: department  
> Display name: User Department  
> Description: "Used for file access control"  
> ☑ User  
> ☐ Computer  
> Suggested values:  
>   - Finance  
>   - HR  
>   - Engineering  
>   - Sales  

OK. User department claim hazır.

Aynı şekilde **Computer**:
```
Source attribute: description (veya custom)
Display: Computer Department
For: Computer
```

## 10:05 — Resource Properties

Dosyalara etiket. ADAC > **Resource Properties**:

> 📸 **Ekran 2** — Resource Property  
> New > Reference Resource Property (veya Create New)  
> Örnek: "Confidentiality" var default, enable et  
> Suggested values:  
>   - Low  
>   - Moderate  
>   - High  
>   - Top Secret  

Ya da custom:
- Department (File's owning department)
- Project Code
- Retention Period

### Enable Resource Property

Global Resource Property List'te aktif et:
```powershell
Set-ADResourceProperty -Identity "Confidentiality" -Enabled $true
```

## 10:10 — Central Access Rule

Koşul yazma. ADAC > **Central Access Rules** > New:

> 📸 **Ekran 3** — Central Access Rule  
> Name: "Finance-Department-Only"  
> Description: "Finance department files — only Finance users"  
>   
> Target Resources:  
>   "All Resources"  
>   VEYA  
>   Add condition: Resource > Department > Equals > **Finance**  
>   
> Permissions:  
>   Use the following permissions as proposed (veya current)  
>   Edit:  
>     Add > User: CORP\Domain Admins — Full Control  
>     Add condition-based:  
>       User > User Department > Equals > Value: "Finance"  
>       → Read, Modify  
>     Deny everyone else

Result: Finance departmanındaki dosyalara SADECE user.department = Finance olanlar erişebilir. Başkaları implicit deny.

## 10:15 — Central Access Policy

Rule'ları paketle:

> 📸 **Ekran 4** — Central Access Policy  
> New Central Access Policy > Name: "Corporate-File-Access"  
> Member Rules: Add >  
>   - Finance-Department-Only  
>   - HR-Department-Only  
>   - Engineering-Department-Only  

## 10:20 — File Server'a Policy Deploy

GPO ile:

> 📸 **Ekran 5** — GPO — Central Access Policies  
> Yeni GPO: "File Servers - DAC Policy"  
> Computer Config > Policies > Windows Settings > Security Settings > File System >  
> **Central Access Policies**  
> Yeni Add > seç: "Corporate-File-Access" policy  
>   
> GPO'yu "File Servers" OU'suna link

File server `gpupdate /force` → artık dosyalar DAC policy için hazır.

## File Classification — Otomatik Etiketleme

Elde binlerce dosya → manuel etiketleme imkansız. **File Server Resource Manager (FSRM)**:

1. File Server'da **FSRM rolü** install
2. **Classification Rules** oluştur:

> 📸 **Ekran 6** — FSRM Classification Rule  
> Classification Management > Classification Rules > Create Classification Rule  
> Name: "Finance-Files-Auto-Tag"  
> Scope: \\fs-01\\Share\\Finance (folder path)  
> Classification Mechanism: Folder Classifier  
> Property: Department = Finance (fixed value)  
> Schedule: Her gün 02:00

Tüm dosyalar otomatik `Department = Finance` etiketi alır. DAC rule otomatik apply.

**Content Classifier**:
- Dosya içinde "Müşteri", "SSN", "IBAN" gibi string ara
- Match ise Confidentiality = High olarak etiketle

## Test

Finance kullanıcısı Mehmet `\\fs-01\\Share\\Finance\\Budget.xlsx` aç → açılır ✓

HR kullanıcısı Ayşe aynı dosyayı aç → **Access denied** (Department mismatch).

## Audit

Access attempts Event Log'da:
```
Event ID: 4656 — A handle to an object was requested
Security Object Source: Security
Object Type: File
Object Name: C:\Share\Finance\Budget.xlsx
Subject: Ayse.Kaya
Access Denied Reason: Central Access Policy Violation
```

KVKK denetimi için altın.

## Yaygın Hatalar

### "Access denied" for Authorized User

User attribute'unda Department doğru set edilmiş mi?
```powershell
Get-ADUser mehmet.yilmaz -Properties Department | Select Department
```

Eğer boş → Department set et:
```powershell
Set-ADUser mehmet.yilmaz -Department "Finance"
```

### Claim Kerberos Ticket'ına Gelmiyor

`klist` kontrolü:
```cmd
klist
```

Tickets içinde claim bilgisi varsa "Client claims" bölümü görünür.

Gelmiyorsa:
- Kerberos armoring GPO aktif değil
- KDC support aktif değil  
- Forest functional level 2012+ değil

### DAC Rule Yazdım Ama Etkili Değil

NTFS permission VE DAC policy ayrı katman — **AND** relation.
- NTFS deny → DAC izin verse de reddeder
- DAC deny → NTFS izin verse de reddeder

Her iki katman policy'e uyumlu olmalı.

## Kurumsal Pratik

DAC tam deploy çok maliyetli. **Hibrit yaklaşım**:
- Kritik klasörler (Finance, HR, Executive) DAC ile
- Genel klasörler klasik NTFS + group ile

Böylece maintainability + security dengeli.

## İlgili Rehberler

- [AD schema extension](/blog/ad-schema-extension-yeni-attribute-ekleme)
- [Password reset delegation](/blog/ad-password-reset-delegation-helpdesk-grup)
- [KVKK öz-denetim aracı](/kvkk-oz-denetim)

---

**DAC deployment, file server security ve KVKK uyum altyapısı için uzman destek?** Kozyatağı Bilişim AD + data governance paketimiz. [Teknik görüşme.](/#contact)
