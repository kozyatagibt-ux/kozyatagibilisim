---
slug: ad-yeni-domain-controller-promote
title: "Yeni Domain Controller Promote — DC01 Yanında DC02 Ekleme"
type: cluster
pillar: 2
url: "/blog/ad-yeni-domain-controller-promote"
hedef_anahtar_kelime: "domain controller promote"
meta_description: "Active Directory'ye yeni DC ekleme — Server Manager + PowerShell adım adım. AD DS install, promote, DNS entegrasyonu, Global Catalog."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "DC Promote"
product_family: "Windows Server & Active Directory"
---

## "Tek DC Var, Yedek Eklemek Gerek"

BT müdürü Osman tek DC ile çalışan bir firmanın deneti:

> "Şu an DC01 tek başına. Giderse şirket iflası. En az 2 DC gerekli. DC02'yi bugün promote ediyorum."

Sunucu hazır (Windows Server 2022, domain'e join değil, RAM yeterli). Osman 35 dakikada promote etti. Bu yazı adımları anlatıyor.

## Hızlı Çözüm (TL;DR)

```powershell
# Yeni server'da (DC02 olacak):

# 1. AD DS role install
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools

# 2. Domain'e promote
Install-ADDSDomainController `
    -DomainName "corp.firma.com.tr" `
    -Credential (Get-Credential) `
    -InstallDns:$true `
    -SafeModeAdministratorPassword (Read-Host -AsSecureString "DSRM Password") `
    -Force:$true

# Otomatik reboot. 10 dk sonra DC olarak up.
```

---

## Ön Hazırlık

### 1. Server Özellikleri

- Windows Server 2019/2022 (Standard yeterli)
- Minimum 4 GB RAM, 2 core
- 80 GB OS disk, 20 GB AD DB disk (ayrı tutmak best practice)
- Static IP (DHCP olmaz)
- Domain'e **join değil** (promote sırasında join olur)

### 2. Network

- DNS server: İç DC01 (10.10.20.10)
- Default gateway: Ağa uygun
- Firewall: Active Directory için gerekli portlar açık (135, 389, 636, 88, 3268, 3269, 445, 49152-65535)

### 3. DC'ler Arası Site-to-Site VPN

Eğer DC02 farklı site'ta (şube ofisi) ise iki ofis arası VPN kurulu olmalı. Aynı LAN'da ise gereksiz.

### 4. Zaman Senkronizasyonu

DC01 ile DC02 saatleri 5 dakika içinde:
```cmd
w32tm /query /status
```

Domain'e katılınca otomatik senkronize olur ama önceden büyük fark varsa düzelt.

### 5. System State Backup

Mevcut DC01'in full backup'ı. Herhangi bir sorun olursa geri dönebiliriz:
```cmd
wbadmin start systemstatebackup -backuptarget:E: -quiet
```

## 10:00 — DC02'de AD DS Role Install

### GUI Yöntem — Server Manager

> 📸 **Ekran 1** — Server Manager dashboard  
> "Add Roles and Features" tıkla  
> Wizard:  
> Role-based or feature-based installation → Next  
> Select destination server → "DC02" → Next  
> Roles list:  
> ☑ **Active Directory Domain Services**  
> Dialog: "Add Roles and Features" → feature'lar otomatik → Add Features  
> Next → Next → Install

3-5 dakika install. "Installation succeeded" mesajı.

Dashboard'da yellow flag: "Promote this server to a domain controller" — tıkla.

### PowerShell Alternatif

```powershell
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
```

Çıktı:
```
Success  Restart Needed   Exit Code   Feature Result
-------  --------------   ---------   --------------
True     No               Success     {Active Directory Domain Services, Group P...}
```

## 10:08 — Promote Wizard

### GUI — Deployment Configuration

> 📸 **Ekran 2** — Deployment Configuration  
> Wizard başladı.  
> Select the deployment operation:  
> ○ Add a domain controller to an existing domain (default, seçili)  
> ○ Add a new domain to an existing forest  
> ○ Add a new forest  
>   
> Domain: corp.firma.com.tr (dropdown, otomatik dolar)  
> Credentials: "Change..." butonu → admin domain hesap  

Next.

### Domain Controller Options

> 📸 **Ekran 3** — DC Options  
> Select domain functional level: Windows Server 2016 (veya güncel)  
>   
> Specify domain controller capabilities:  
> ☑ **Domain Name System (DNS) server** (önerilen)  
> ☑ **Global Catalog (GC)** (önerilen)  
> ☐ Read only domain controller (RODC) — şube ofis için  
>   
> Site name: Default-First-Site-Name (veya spesifik site)  
>   
> Type the Directory Services Restore Mode (DSRM) password:  
> Password: ●●●●●●●●●●●●●●  
> Confirm: ●●●●●●●●●●●●●●

**DSRM şifresi** = "Safe mode administrator" şifresi. Recovery için kritik — güçlü seç, Bitwarden'a kaydet.

Next.

### DNS Options

> 📸 **Ekran 4** — DNS Options  
> Uyarı: "A delegation for this DNS server cannot be created because the authoritative parent zone..."  
> (Normal mesaj — yok sayılabilir)  
> Next

### Additional Options

> 📸 **Ekran 5** — Additional Options  
> Specify the Active Directory database, log files, and SYSVOL location:  
> Database folder: C:\Windows\NTDS  
> Log files folder: C:\Windows\NTDS  
> SYSVOL folder: C:\Windows\SYSVOL  
>   
> Replication options:  
> Replicate from: Any domain controller (default, seçili)  
>   - Veya specific DC (DC01) seç  

**Best practice**: Database, logs ve SYSVOL ayrı disk'lerde olmalı — performance için. Değiştir:
- Database: D:\AD\NTDS
- Log: E:\AD\Logs
- SYSVOL: F:\AD\SYSVOL

Ama küçük/orta ortam için default yeterli.

### Review + Install

Özet ekranı → Next → Prerequisites Check. Tüm checklar "All prerequisite checks passed successfully" olmalı.

**Install** → yaklaşık **8-15 dakika** sürer:
- AD DB file'ları oluşturulur
- DC01'den initial replication
- DNS zones replikate
- SYSVOL replikate
- SPN'ler register
- Otomatik reboot

## 10:22 — DC02 Reboot Sonrası

Server açılınca artık **DC** olarak çalışıyor:
- Login ekran: "CORP" domain görünür
- Services: NTDS, KDC, DFSR, Netlogon — all running
- Event log: AD DS Started (Event 1000)

### Doğrulama

```powershell
# DC02'de
Get-ADDomainController -Identity DC02 | 
    Select Name, Domain, IsGlobalCatalog, IPv4Address, Site
```

Çıktı:
```
Name            : DC02
Domain          : corp.firma.com.tr
IsGlobalCatalog : True
IPv4Address     : 10.10.20.11
Site            : Default-First-Site-Name
```

## 10:25 — Replication Test

```cmd
repadmin /replsummary
```

Çıktı:
```
Source DSA     largest delta  fails/total %% error
DC01                :5m:22s       0 /   5    0
DC02                :5m:22s       0 /   5    0  ← Yeni!
```

Her ikisi senkron.

### AD DB Boyutu

```powershell
Get-ADObject -Filter * -SearchBase "DC=corp,DC=firma,DC=com,DC=tr" | Measure-Object
```

Küçük domain (100-500 user) için birkaç bin obje. DC02'nin DB boyutu DC01'e yakın olmalı.

## 10:30 — DNS Yapılandırma

DC02 DNS server rolü de aldı. Client'ların DNS config'ini update etmek gerekir.

### Client DHCP Scope DNS Güncellemesi

DHCP server'da:
```powershell
Set-DhcpServerv4OptionValue -ScopeId 10.10.10.0 -DnsServer 10.10.20.10, 10.10.20.11
```

Yeni client'lar DC01 primary, DC02 secondary DNS olacak.

### Statik IP Client'lar

Manuel:
```powershell
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 10.10.20.10, 10.10.20.11
```

Ya da GPO ile toplu (daha iyi).

## Site & Subnet Kontrolü

DC02 başka bir site'ta mı?
- Default-First-Site'ta ise önemsiz
- Branch office site'sında ise [site'a taşı](/blog/ad-yeni-site-subnet-olusturma-sube-ofis)

```powershell
Move-ADDirectoryServer -Identity "DC02" -Site "Ankara-Site"
```

## Yaygın Hatalar

### "The specified domain either does not exist or could not be contacted"

DC02 DC01'e ulaşamıyor — DNS veya network sorunu.

Kontrol:
```powershell
nslookup corp.firma.com.tr 10.10.20.10
Test-NetConnection DC01.corp.firma.com.tr -Port 389
```

### "The Active Directory Domain Services schema version is not compatible"

Nadiren — server 2022 bir 2008 schema'yla uyumsuz olabilir. Schema upgrade gerek:
```cmd
adprep /forestprep
adprep /domainprep
```

Ama modern ortamda genelde otomatik.

### "Verification of replica failed" — Replication Sorunu

İlk replikasyon başarısız:
- Network portları (135, 389, 445, 49152-65535)
- DNS çözümleme
- Zaman senkronizasyonu

Debug:
```cmd
dcdiag /v
```

### Prerequisites Check Fail

- OS version uyumsuzluğu: Server 2008 R2+ şart
- Static IP olmalı (DHCP değil)
- Hostname geçerli (boşluk, özel karakter yok)

## Post-Promote İşler

### 1. DSRM Password Kaydet

DSRM şifresi kaybolursa recovery imkansız. **Bitwarden** gibi güvenli yerde:
```
Name: DC02 DSRM
Password: [güçlü]
Created: 5/12/2024
```

### 2. AD Backup

Yeni DC eklendi → backup stratejisi güncellenmeli:
- Her DC'nin System State Backup haftalık
- Dedicated backup server veya Veeam

### 3. Monitoring

PRTG/Zabbix'e DC02 eklenmeli:
- NTDS service durumu
- DNS service durumu
- Event log (Error, Warning)
- AD replication latency
- Disk space

### 4. FSMO Dağıtımı (Gelecek Planlama)

Şimdi tüm FSMO'lar DC01'de. İleride DC01 decommission edilecekse:
- PDC Emulator DC02'ye transfer
- RID Master DC02'ye transfer
- Infrastructure Master DC02'ye transfer

[FSMO transfer rehberi](/blog/ad-fsmo-roles-transfer-dc1-dc2)

## İleri Seviye — RODC Promote

Şube ofisinde **Read-Only DC** istiyorsan:
```powershell
Install-ADDSDomainController `
    -DomainName "corp.firma.com.tr" `
    -ReadOnlyReplica:$true `
    -SiteName "Ankara-Site" `
    -AllowPasswordReplicationAccountName "Ankara-Users" `
    -Credential (Get-Credential) `
    -Force:$true
```

RODC avantajları:
- Şifreler cache'lenmez (şube güvenlik)
- Sadece oku, yazmaz (offshore branch için güvenli)
- Compromise olursa forest etkilenmez

## İlgili Rehberler

- [FSMO roles transfer DC1→DC2](/blog/ad-fsmo-roles-transfer-dc1-dc2)
- [Yeni AD Site + Subnet](/blog/ad-yeni-site-subnet-olusturma-sube-ofis)
- [AD replication error 8524](/blog/active-directory-replication-error-8524)

---

**AD deployment, multi-DC design, RODC ve enterprise domain migration için uzman destek?** Kozyatağı Bilişim AD infrastructure paketimiz. [Teknik görüşme.](/#contact)
