---
slug: ad-event-1311-kcc-could-not-calculate-topology
title: "Event 1311 'KCC Could Not Calculate Ideal Topology' — AD Replication Topology Sorunu"
type: cluster
pillar: 2
url: "/blog/ad-event-1311-kcc-could-not-calculate-topology"
hedef_anahtar_kelime: "event 1311 kcc topology"
meta_description: "Active Directory Event 1311 — 'The Knowledge Consistency Checker (KCC) has detected problems with the following directory partition' hatası tespit ve çözüm."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "Event 1311"
product_family: "Windows Server & Active Directory"
---

## Salı Sabahı — Monitoring Alarm

BT sorumlusu Mert Salı sabahı 08:30'da Zabbix alarm maili aldı:

> **Alert**: DC01 — NTDS KCC Error  
> Event ID 1311 on DC01.corp.firma.com — repeated 12 times overnight

Directory Service log:
```
Event ID: 1311
Source: NTDS KCC
Level: Warning

The Knowledge Consistency Checker (KCC) has detected problems with 
the following directory partition.

Directory partition:
DC=corp,DC=firma,DC=com,DC=tr

There is insufficient site connectivity information in Active 
Directory Sites and Services for the KCC to create a spanning tree 
replication topology. Or, one or more directory servers with this 
directory partition are unable to replicate the directory partition 
information.

This is probably due to inaccessible directory servers.
```

Mert 5 dakikada sebebini buldu — **bir DC'nin kapalı olması + Site link konfigürasyonu eksik**. Bu yazı tanı adımlarını anlatıyor.

## Hızlı Çözüm (TL;DR)

1. `repadmin /replsummary` → hangi DC'ler replication fail
2. `Get-ADDomainController -Filter *` → DC'lerin durumu (accessible?)
3. AD Sites and Services → Site link'ler eksik mi? Yeni site'ın link'i var mı?
4. Offline DC varsa ya aç ya da metadata cleanup
5. `repadmin /kcc` → KCC topology'yi manuel recalculate

---

## KCC Nedir, Neden 1311 Verir?

**KCC (Knowledge Consistency Checker)** her DC'de 15 dakikada bir çalışan arka plan servisi. Görevi:
- Hangi DC'nin hangi DC ile replikasyon yapacağını hesaplar
- "Connection Objects" oluşturur (replication bağlantıları)
- Site'lar arası optimum spanning tree kurar

KCC **topology hesaplayamıyorsa**:
- Bir site diğerine nasıl ulaşacak bilmiyor
- Connection object oluşturamıyor
- Replication durur → yeni değişiklikler yayılmaz → 1311

## 08:35 — Replication Durumu

Mert ilk:

```powershell
repadmin /replsummary
```

Çıktı:
```
Source DSA     largest delta    fails/total %%   error
DC01                 :11m:04s      0 /   5    0
DC02                 :12m:21s      0 /   5    0
DC03-BRANCH1         >60d:00h:00m  4 /   5   80   (1722) The RPC server is unavailable.
```

**DC03-BRANCH1** — branch office'teki DC, 60+ gün replike etmemiş. KCC bu DC'yi kapalı görüyor, topology hesaplanamıyor.

## 08:40 — DC03 Neden Offline?

Branch office aranıyor:
> "DC03 odasını hafta sonu taşıdılar, elektrik bağlantısı yapılmamış."

2 seçenek:
1. DC03'ü **tekrar aç** (en iyi)
2. DC03'ü **domain'den çıkar** (60+ gün offline = tombstone tehlikesi)

Branch office elektriği aynı gün saat 11:00'de açıldı. DC03 boot oldu, replication başladı. Ama...

## 08:42 — Event 2042 Karşılaştı

DC03 açıldı ama başka bir hata verdi:
```
Event ID: 2042
It has been too long since this machine replicated 
with the named source machine.

The time between replications with this source has exceeded the 
tombstone lifetime.
```

60 gün = AD **tombstone lifetime**. DC bu süreden fazla offline kaldıysa:
- Silinmiş nesneleri "tombstone" olarak bilmiyor
- Resync ederse **silinmiş user'ları tekrar ekler** (lingering objects)
- Güvenlik + tutarlılık ihlali

**Çözüm: Bu DC'yi yeniden promote et** — mevcut DC role'ünü temizle + demote + temiz promote.

```powershell
# DC03'te
Uninstall-ADDSDomainController -DemoteOperationMasterRole -ForceRemoval -IgnoreLastDCInDomainMismatch

# Reboot sonra regular server
# Sonra tekrar promote:
Install-ADDSDomainController -DomainName "corp.firma.com.tr" -Credential (Get-Credential) -InstallDns
```

## 09:15 — DC03 Replike Oldu

Promote tamamlandı (45 dk). `repadmin /replsummary`:
```
Source DSA     largest delta    fails/total %%   error
DC01                 :2m:14s       0 /   5    0
DC02                 :2m:33s       0 /   5    0
DC03-BRANCH1         :0m:12s       0 /   5    0  ← Yeni!
```

Tüm DC'ler senkron. Event 1311 kesildi.

## Senaryo B: Yeni Site Eklendi Ama Site Link Yok

Olayın başka bir varyasyonu: Branch office'te yeni DC eklenmiş ama **AD Sites and Services'te site link eksik**.

> 📸 **Ekran 1** — Active Directory Sites and Services (dssite.msc)  
> Pencere başlığı: "Active Directory Sites and Services"  
> Sol panel: "Sites" > alt site listesi  
> - Default-First-Site-Name (İstanbul)  
> - Ankara-Site  
> - Bursa-Site ← yeni eklendi  
> - Inter-Site Transports  
>   - IP  
>     - DEFAULTIPSITELINK (İstanbul ↔ Ankara bağlı, Bursa bağlı değil!)  

Bursa site'ı DEFAULTIPSITELINK'e eklenmemiş → İstanbul ve Ankara'ya replikasyon yapamaz.

### Çözüm: Site Link'i Düzenle

> 📸 **Ekran 2** — DEFAULTIPSITELINK Properties  
> DEFAULTIPSITELINK'e çift tık  
> General tab:  
> - Sites in this site link:  
>   - Default-First-Site-Name ✓  
>   - Ankara-Site ✓  
>   - Bursa-Site ✗ ← buraya ekle  
> "Add..." butonu > Bursa-Site > OK  
> Cost: 100 (default)  
> Replicate every: 180 minutes (default)

Apply. 15 dakika sonra KCC yeniden hesaplar, Bursa'ya replikasyon connection oluşur.

**Manuel trigger**:
```powershell
repadmin /kcc site:Bursa-Site
```

## KCC'yi Force Run Etmek

Topology değişikliği sonrası KCC'yi zorla:
```powershell
# Tüm DC'lerde
repadmin /kcc

# Veya tek DC için
repadmin /kcc DC01.corp.firma.com.tr
```

Output:
```
Consistency check on DC01 successful.
```

## Senaryo C: Bridgehead Server Sorunu

Her site'ta **bridgehead server** replication orchestrator olur. Eğer bridgehead'i problemli ise KCC alternatif bulamayabilir.

```powershell
# Bridgehead listesini gör
Get-ADReplicationSite -Filter * | 
    Select Name, @{N='Bridgehead';E={(Get-ADReplicationSiteLinkBridge).BridgeheadServers}}
```

Bridgehead offline ise başka DC'yi atamak:

> AD Sites > Bursa-Site > Servers > DC03-Bursa > Properties > Inter-Site Transports: Add "IP"

Bu DC'yi manual bridgehead yapar.

## Yaygın Hatalar

### KCC Topology Hesaplıyor Ama Connection Yok

`repadmin /showrepl` çıktısında connection listelenmiyor:
- DC'ler birbirini ping edebiliyor mu? `Test-NetConnection DC02 -Port 389`
- DNS kayıtları doğru mu? `nslookup DC02.corp.firma.com.tr`
- Firewall 389, 636, 88, 135, 445, 3268, 3269, 49152-65535 açık mı?

### "The request is not supported" Hatası

KCC intra-site topology için problem yok ama **inter-site** topology kuramıyor. Site link'lerini kontrol — schedule Always Replicate aktif mi?

### Legacy DC (Server 2008) Karışıklığı

2008 DC + 2022 DC karışık forest — bazı KCC davranışları eski. **DC role'ü yalnız 2019+**'a standardize et.

## Önleyici Bakım

### 1. Weekly Health Rapor

```powershell
# Scheduled task
$report = @"
AD Replication Health — $(Get-Date)
=====================================

$(repadmin /replsummary)

---

Offline DCs (last 24h):
$(Get-WinEvent -FilterHashtable @{LogName='Directory Service'; Id=1311,2042; StartTime=(Get-Date).AddDays(-1)} | 
  Select TimeCreated, Message | Format-List | Out-String)
"@

Send-MailMessage -To it@firma.com.tr -Subject "AD Health Weekly" -Body $report
```

### 2. DC Monitoring Dashboard

PRTG / Zabbix templates:
- DC service status (NTDS, Netlogon, KDC)
- Event log polling for 1311, 1388, 1925, 2042
- Replication latency thresholds

### 3. Site Documentation

Her site için dokümantasyon:
- Hangi DC'ler var
- Site link cost'u
- Hangi subnet'ler bağlı
- Bridgehead server adı

Değişiklik olursa güncellenen tek doc.

### 4. Tombstone Lifetime Awareness

Default 180 gün (eski domain'lerde 60 gün — değiştirilebilir):
```powershell
(Get-ADObject "CN=Directory Service,CN=Windows NT,CN=Services,CN=Configuration,DC=corp,DC=firma,DC=com,DC=tr" -Properties tombstoneLifetime).tombstoneLifetime
```

DC yok varsaydığından **kısa olan** period tutulur. Kritik: **DC'ler 60 günden fazla offline bırakılmamalı**.

## İlgili Rehberler

- [AD replication error 8524](/blog/active-directory-replication-error-8524)
- [Kerberos KRB_AP_ERR_MODIFIED](/blog/kerberos-krb-ap-err-modified-event-4771)
- [DNS scavenging çalışmıyor](/blog/dns-scavenging-calismiyor-eski-kayit-birikiyor)

---

**AD replication, site link design ve multi-site enterprise domain yönetimi için uzman destek?** Kozyatağı Bilişim AD health check + topology optimizasyon. [Teknik görüşme.](/#contact)
