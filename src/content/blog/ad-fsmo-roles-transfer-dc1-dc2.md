---
slug: ad-fsmo-roles-transfer-dc1-dc2
title: "AD FSMO Rolleri Transfer — DC01'den DC02'ye Adım Adım"
type: cluster
pillar: 2
url: "/blog/ad-fsmo-roles-transfer-dc1-dc2"
hedef_anahtar_kelime: "fsmo roles transfer"
meta_description: "Active Directory FSMO (Schema, Domain Naming, PDC, RID, Infrastructure) rolleri DC01'den DC02'ye transfer — GUI ve PowerShell ile step-by-step."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "FSMO Transfer"
product_family: "Windows Server & Active Directory"
---

## "Eski DC'yi Decommission Edeceğiz"

BT müdürü Cem 8 yaşındaki DC01'i yeni donanıma migrate ediyor. Yeni DC02 hazır, domain'e promote edildi ve stable. Ama DC01 emekli olmadan **FSMO rollerini transfer etmek** gerekli.

> "5 FSMO rolü var. DC01'de. Transfer nasıl yapılır, güvenli mi?"

Cem 10 dakikada rolleri taşıdı. Bu yazı adım adım GUI ve PowerShell yaklaşımlarını anlatıyor.

## 5 FSMO Rolü

**Forest-wide** (tüm forest için tek):
1. **Schema Master** — AD schema değişiklikleri
2. **Domain Naming Master** — domain ekle/çıkar

**Domain-wide** (her domain için ayrı):
3. **PDC Emulator** — zaman kaynağı, şifre senkronizasyonu, down-level client
4. **RID Master** — RID pool dağıtımı
5. **Infrastructure Master** — cross-domain referans güncelleme

Single-domain deployment'ta genelde hepsi aynı DC'de. Büyük ortamda dağıtılır.

## Hızlı Çözüm (TL;DR)

```powershell
# Tüm 5 rolü DC02'ye transfer
Move-ADDirectoryServerOperationMasterRole -Identity DC02 `
    -OperationMasterRole SchemaMaster, DomainNamingMaster, PDCEmulator, RIDMaster, InfrastructureMaster
```

Prompt: Each role için Yes. Toplam 30 saniye.

---

## Ön Kontroller

### 1. Hangi DC'lerde Hangi Rol?

```cmd
netdom query fsmo
```

Çıktı:
```
Schema master               DC01.corp.firma.com.tr
Domain naming master        DC01.corp.firma.com.tr
PDC                         DC01.corp.firma.com.tr
RID pool manager            DC01.corp.firma.com.tr
Infrastructure master       DC01.corp.firma.com.tr
```

PowerShell:
```powershell
Get-ADDomain | Select PDCEmulator, RIDMaster, InfrastructureMaster
Get-ADForest | Select SchemaMaster, DomainNamingMaster
```

### 2. Her İki DC Online ve Erişilebilir Mi?

```powershell
Test-NetConnection DC01.corp.firma.com.tr -Port 389
Test-NetConnection DC02.corp.firma.com.tr -Port 389
```

Her ikisi `TcpTestSucceeded: True` olmalı.

### 3. Replication Sağlıklı Mı?

```cmd
repadmin /replsummary
```

Çıktıda **0 fails** olmalı. Replication sorunu varsa önce o çözülmeli (transfer sırasında changes aktarılmayabilir).

### 4. DC02 Global Catalog Mi?

PDC ve Infrastructure Master için bazı özel durumlar — Infrastructure Master **tek domain** forest'ta Global Catalog ile aynı DC'de olabilir. Multi-domain forest'ta **Infrastructure Master GC olmayan** bir DC'de olmalı.

Single-domain için endişelenme. Multi-domain için yapılandırma dikkatli.

## Yöntem A: PowerShell (Önerilen, Hızlı)

### Tek Komutta 5 Role Transfer

```powershell
Move-ADDirectoryServerOperationMasterRole -Identity "DC02" `
    -OperationMasterRole SchemaMaster, DomainNamingMaster, PDCEmulator, RIDMaster, InfrastructureMaster
```

Her rol için prompt gelir:
```
Performing the operation "Move SchemaMaster role" on target "DC02.corp.firma.com.tr". 
Are you sure? [Y] Yes [A] Yes to All [N] No [L] No to All: A
```

**A** (Yes to All) → tüm rolleri tek onayla transfer.

### Doğrulama

```cmd
netdom query fsmo
```

Tüm 5 rol DC02'de görünmeli.

### Sadece Belirli Rolleri Transfer

```powershell
# Sadece PDC Emulator
Move-ADDirectoryServerOperationMasterRole -Identity "DC02" -OperationMasterRole PDCEmulator
```

## Yöntem B: GUI (Eski Usul)

### Schema Master

> 📸 **Ekran 1** — Schema Master transfer  
> Run → regsvr32 schmmgmt.dll (ilk sefer schema snap-in register)  
> Run → mmc → File > Add/Remove Snap-in > "Active Directory Schema" ekle  
> Sol panel: "Active Directory Schema" sağ tık  
> Menu: "Change Active Directory Domain Controller..."  
> Dialog: Dilediğin DC'yi seç (DC02.corp.firma.com.tr)  
> OK → snap-in DC02'ye bağlanır  
> Tekrar sağ tık: "Operations Master..."  
> Dialog: "Current Operations Master: DC01..."  
> Butonlar:  
> - Change  
> - Close

**Change** tıkla → Confirm → OK. Schema Master DC02'ye transfer.

### Domain Naming Master

> 📸 **Ekran 2** — Active Directory Domains and Trusts  
> Run → domain.msc  
> Sol panel: "Active Directory Domains and Trusts" root'a sağ tık  
> Menu: "Change Active Directory Domain Controller..."  
> DC02'yi seç  
> OK  
> Tekrar sağ tık: "Operations Master..."  
> Change → Yes

### PDC, RID, Infrastructure Master

> 📸 **Ekran 3** — ADUC Operations Masters  
> Run → dsa.msc (ADUC)  
> Sağ tık domain root: "Change Domain Controller..."  
> DC02'yi seç  
> OK  
> Tekrar sağ tık: "Operations Masters..."  
> 3 tab: PDC | RID | Infrastructure  
> Her tab için "Change" butonu

Her tab'da Change → Yes.

**GUI 5 adımlı**, PowerShell 1 adımda. Modern yaklaşım PowerShell.

## Transfer vs Seize Farkı

Bu yazı **transfer** — planlı, her iki DC online.

**Seize** farklı:
- Hedef DC'den rolü "zorla alırsın"
- Kaynak DC erişilemez veya corrupt
- Kaynak DC **asla tekrar domain'e dönmemeli** (aynı rol iki DC'de → chaos)

Seize komut:
```cmd
ntdsutil
roles
connections
connect to server DC02.corp.firma.com.tr
quit
seize schema master
```

Bu yazının konusu değil — sadece **planlı transfer**.

## FSMO Role Dağıtımı — Best Practice

Küçük/orta domain (1-2 DC): Tüm rolleri tek DC'de — basit.

Büyük ortam (3+ DC, multi-site):

| Rol | Önerilen DC |
|---|---|
| Schema Master | Forest root'un PDC Emulator DC'si |
| Domain Naming Master | Schema Master ile aynı |
| PDC Emulator | Merkez site'ın en güçlü DC'si |
| RID Master | PDC Emulator ile aynı (high-demand) |
| Infrastructure Master | GC **olmayan** bir DC (multi-domain) |

Single-domain forest'ta Infrastructure Master GC olabilir — önemsiz.

## 10:00 — Cem'in Transferi

```powershell
# Mevcut durum
netdom query fsmo
# → tüm 5 rol DC01'de

# Transfer
Move-ADDirectoryServerOperationMasterRole -Identity "DC02" `
    -OperationMasterRole SchemaMaster, DomainNamingMaster, PDCEmulator, RIDMaster, InfrastructureMaster

# Prompts: A (Yes to All)
# 30 saniye bekleme

# Doğrulama
netdom query fsmo
# → tüm 5 rol DC02'de ✓
```

Cem işi bitirdi. Şimdi DC01 decommission için hazır.

## Transfer Sonrası İşler

### 1. Time Source Güncelle

PDC Emulator şimdi DC02. DC02'nin güvenilir dış NTP source'u olmalı:

```powershell
# DC02'de
w32tm /config /manualpeerlist:"time.google.com,time.cloudflare.com" `
    /syncfromflags:manual /reliable:yes /update

Restart-Service w32time
w32tm /resync /force

# Kontrol
w32tm /query /source
```

Diğer DC'ler + domain member'lar PDC'den saat alır.

### 2. GPO/Script Güncellemeleri

Eski "DC01" hardcoded scriptler varsa:
- Logon script'leri
- PowerShell jobs
- Backup paths

DC02 veya genel domain kullanıma geç.

### 3. DC01 Decommission

Rolleri transfer ettin, şimdi DC01 güvenle demote:
```powershell
Uninstall-ADDSDomainController -DemoteOperationMasterRole -Credential (Get-Credential)
```

Reboot → DC01 artık member server. DNS kayıtları temizlenir, metadata güncellenir.

Son olarak güvenlik için:
```powershell
# Eski DC01'i domain'den tamamen çıkar (member server'ken bile)
Remove-Computer -UnjoinDomainCredential (Get-Credential) -Restart
```

Server artık workgroup'ta. Power off veya yeniden amaç değişimi.

## Yaygın Hatalar

### "Access denied" Transfer Sırasında

Yetki yetersiz. Domain Admins + Enterprise Admins üyeliği gerek.

### Transfer Tamamlandı Ama `netdom query fsmo` Eski Gösteriyor

Replication gecikmesi. `repadmin /syncall /AdeP` ile zorla sync + 2 dk sonra tekrar kontrol.

### Schema Master Transfer "RPC server unavailable"

Schema partition replikasyon yapıyor, DC02 görmedi. Schema master transfer öncesi:
```cmd
repadmin /syncall DC02 /AdeP
```

Sonra transfer tekrar dene.

### PDC Emulator Transfer Sonrası Time Drift

DC02 time source yapılandırılmadıysa domain saati kayar. Time source ayarı **anında** yapılmalı (yukarıdaki #1).

## İlgili Rehberler

- [Yeni Domain Controller promote](/blog/ad-yeni-domain-controller-promote)
- [AD replication error 8524](/blog/active-directory-replication-error-8524)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)
- [Event 2042 tombstone lifetime](/blog/ad-event-2042-too-long-since-replicated-tombstone)

---

**AD migration, DC decommission ve FSMO yönetimi için uzman destek?** Kozyatağı Bilişim AD infrastructure paketimiz. [Teknik görüşme.](/#contact)
