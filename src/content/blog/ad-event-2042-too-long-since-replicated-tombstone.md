---
slug: ad-event-2042-too-long-since-replicated-tombstone
title: "AD Event 2042 'Too Long Since Replicated' — Tombstone Lifetime Geçti"
type: cluster
pillar: 2
url: "/blog/ad-event-2042-too-long-since-replicated-tombstone"
hedef_anahtar_kelime: "event 2042 too long since replicated tombstone"
meta_description: "Active Directory Event 2042 — tombstone lifetime aşılan DC replication durdu. Lingering objects, USN rollback, DC demote gerekliliği ve recovery."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "Event 2042"
product_family: "Windows Server & Active Directory"
---

## "DC Yeni Açıldı — Event 2042 Alıyor"

Depo ofisindeki DC03 3 ay önce lokasyon taşınmasında kapatılmıştı, unutulmuştu. Bugün açtılar. Event Viewer > Directory Service:

```
Event ID: 2042
Level: Error
Source: ActiveDirectory_DomainService

It has been too long since this machine replicated.

The time between replications with this source has exceeded the 
tombstone lifetime. Replication has been stopped with this source.

The reason that replication is not allowed to continue is that 
the two machine's views of deleted objects may now be different. 
The source machine may contain objects that have been deleted on 
this machine, but when this machine's tombstone lifetime has 
passed, those objects have been removed from this machine.
```

BT sorumlusu Kerim "DC'yi tekrar devreye al" dediğinde iş zordu: basit reboot yetmiyordu. Bu yazı ne yapılacağını ve neden gerekli olduğunu açıklıyor.

## Hızlı Çözüm (TL;DR)

DC tombstone lifetime'dan (default 180 gün) uzun offline kaldıysa:
- Basit "aç ve çalış" imkansız
- **Seçenek A**: DC'yi **demote et + tekrar promote et** (temiz yaklaşım)
- **Seçenek B**: Metadata cleanup + yeni DC olarak promote

Asla "registry hack ile 2042'yi bypass etme" — **lingering objects** yaratır, AD bütünlüğü bozulur.

---

## Tombstone Lifetime Nedir?

AD'de obje silindiğinde:
1. Objenin attribute'ları temizlenir (name, displayName)
2. `isDeleted = True` işaretlenir
3. "Deleted Objects" container'ına taşınır
4. **Tombstone lifetime** süresi boyunca saklanır (default 180 gün, eski domain'lerde 60 gün)
5. Süre bitince garbage collection siler

DC offline'ken diğer DC'lerde obje silindi. Tombstone süresi içinde DC geri dönerse **siliniyi öğrenir** ve kendi DB'sinden de siler.

Ama **tombstone süresi geçtikten sonra** DC dönerse:
- Silindiği DC'lerden haberdar olmaz
- Kendi DB'sindeki "eski silinmiş" user/grup hâlâ var
- Replication başlarsa **lingering object** sorunları yaratır
- AD bu durumu görünce replication'ı **durdurur** → Event 2042

## 10:00 — Kerim Olayı Anlıyor

### Adım 1: DC Ne Kadar Offline?

```powershell
# DC03'ün son başarılı replication zamanı
Get-ADReplicationPartnerMetadata -Target DC03 | Select Partner, LastReplicationSuccess
```

Çıktı:
```
Partner          LastReplicationSuccess
-------          ----------------------
DC01.corp...     05.02.2024 14:32:18 ← 3 ay önce
DC02.corp...     05.02.2024 14:32:18
```

3 ay = 90 gün. Tombstone 180 gün (modern default). 2042 vermemeli... Kontrol:

```powershell
(Get-ADObject "CN=Directory Service,CN=Windows NT,CN=Services,CN=Configuration,DC=corp,DC=firma,DC=com,DC=tr" -Properties tombstoneLifetime).tombstoneLifetime
```

Çıktı: `60`. **Bu domain eski** — tombstone 60 gün. 90 gün > 60 → Event 2042.

### Adım 2: Tombstone Ayarı Kontrol

```powershell
Get-ADForest | Select ForestMode
# DomainMode: Windows2003Forest
```

Eski forest. 2003 domain'de default tombstone 60 gün. Modern (2008+) 180 gün.

Manuel artırma mümkün ama **önce 2042 olayını çözmek gerek**.

## Seçenek A: Temiz Demote + Re-Promote

Önerilen yaklaşım:

### Adım A1: DC03'ün Ne Yapıyor Olduğunu Anla

DC03 **tek yol** mu? Şube ofisinde tek DC ise demote sonrası login'ler diğer site'a gidecek. Planlı olmalı.

### Adım A2: AD Manuel Rolleri Alma

DC03 FSMO role taşıyorsa transfer et:
```cmd
netdom query fsmo
```

Çıktı:
```
RID pool manager            DC01  (OK)
Infrastructure master       DC03  ← Transfer gerekli!
```

Infrastructure master DC03'ten DC01'e:
```powershell
Move-ADDirectoryServerOperationMasterRole -Identity DC01 -OperationMasterRole InfrastructureMaster
```

### Adım A3: Demote

Offline modda demote riskli. **DC03'ü hâlâ online kabul et** (network yalıtılı):

```powershell
# Network izole (firewall block)
# Sonra DC03'te
Uninstall-ADDSDomainController -DemoteOperationMasterRole `
    -ForceRemoval `
    -IgnoreLastDCInDomainMismatch
```

`-ForceRemoval` kritik — normal demote tombstone 2042 nedeniyle fail.

Reboot. DC03 artık regular server, domain'e join değil.

### Adım A4: Diğer DC'lerde Metadata Cleanup

```cmd
ntdsutil
metadata cleanup
connections
connect to server DC01.corp.firma.com.tr
quit
select operation target
list domains
select domain 0
list sites
select site 0
list servers in site
select server [dc03_index]
quit
remove selected server
```

Onay: Y. DC03'ün AD'deki tüm izleri temizlendi.

### Adım A5: DC03'ü Tekrar Promote

DNS'e yeni IP, network'e bağla. Sonra:
```powershell
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
Install-ADDSDomainController -DomainName "corp.firma.com.tr" -Credential (Get-Credential) -InstallDns
```

Promote sırasında tüm AD bilgisi DC01'den senkronize olur (temiz state). Reboot.

Yeni DC03 tamamen temiz + güncel domain bilgisine sahip.

## Seçenek B: Lingering Object Repair (Daha Hızlı Ama Riskli)

Bazen demote + re-promote çok zaman alıcı. Alternative: **lingering objects'i manuel temizle**:

```powershell
# Source: DC01 (guvenli kaynak)
# Destination: DC03 (offline kalan)
repadmin /removelingeringobjects dc03.corp.firma.com.tr [dc01_guid] dc=corp,dc=firma,dc=com,dc=tr
```

`dc01_guid` almak için:
```powershell
(Get-ADDomainController DC01).InvocationId
```

**Uyarı**: Bu işlem DC03'ten "DC01'de olmayan obje"leri siler. Yanlış yönde çalıştırırsa **production AD'den obje silebilirsin**. Son derece dikkatli.

Microsoft'un önerdiği parameter:
```
repadmin /removelingeringobjects <destination> <source-dsa-guid> <naming-context> /ADVISORY_MODE
```

`/ADVISORY_MODE` önce ne silineceğini raporlar (silmez). Doğrula → production'da tekrar çalıştır `/ADVISORY_MODE` olmadan.

## "Strict Replication Consistency" Kuralı

Modern AD (2003+) default `strict replication consistency = true`. Yani lingering object tespit edince replication otomatik durur.

Eğer false ise (eski domain'lerde):
- Lingering objects sessizce replike olur
- AD bozuk state'e düşer
- Tespit ederken çok geç

Kontrol:
```powershell
repadmin /regkey dc01 +strict
```

`STRICTREPLICATIONCONSISTENCY 1` olmalı.

## Tombstone Lifetime Artırma (Opsiyonel)

Modern domainlere göre 180 gün standart. 60 gün çok kısa:

```powershell
$config = "CN=Directory Service,CN=Windows NT,CN=Services,CN=Configuration,DC=corp,DC=firma,DC=com,DC=tr"
Set-ADObject $config -Replace @{tombstoneLifetime=180}
```

Dikkat: Bu ayar **replicate olduktan sonra** geçerli — tüm DC'lerde 180 gün sonra yürürlükte.

## Önleyici Strateji

### 1. DC Inventory & Health Check

Offline DC'lerin farkında olma. Aylık:
```powershell
Get-ADDomainController -Filter * | 
    ForEach-Object {
        $accessible = Test-NetConnection $_.HostName -Port 389 -InformationLevel Quiet
        [PSCustomObject]@{
            Name = $_.HostName
            Site = $_.Site
            Accessible = $accessible
        }
    }
```

Inaccessible DC varsa → aksiyon.

### 2. Monitoring — Son Replikasyon Zamanı

PRTG/Zabbix ile her DC için `LastReplicationSuccess` izle. 7 gün aşılırsa alarm.

### 3. DC Taşıma Planı

Fiziksel DC taşınacaksa:
- Önce planlı shutdown
- Hedefte aynı gün açılsın (7 gün içinde maksimum)
- 60+ gün offline kalacaksa **taşımadan önce demote** daha temiz

### 4. Cold DC Tutulmaz

Bazı kurumda "yedek DC kapalı dursun" yaklaşımı yanlış. Her DC düzenli çalışmalı. Offline yedek için **VM snapshot + offline storage** daha iyi.

## İlgili Rehberler

- [AD replication error 8524](/blog/active-directory-replication-error-8524)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)
- [RPC server unavailable 1722](/blog/ad-rpc-server-unavailable-1722)

---

**AD disaster recovery, DC migration ve multi-site domain yönetimi için uzman destek?** Kozyatağı Bilişim AD infrastructure paketimiz. [Teknik görüşme.](/#contact)
