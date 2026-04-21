---
slug: ad-yeni-site-subnet-olusturma-sube-ofis
title: "AD'de Yeni Site + Subnet Oluşturma — Ankara Şube Ofisi için"
type: cluster
pillar: 2
url: "/blog/ad-yeni-site-subnet-olusturma-sube-ofis"
hedef_anahtar_kelime: "active directory site subnet olusturma"
meta_description: "Active Directory Sites and Services'te yeni site + subnet ekleme — Ankara şube ofisi senaryosu. Site link, replication schedule, bridgehead server."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "AD Site Setup"
product_family: "Windows Server & Active Directory"
---

## "Ankara Şubemiz Açıldı, AD'ye Tanıtmak Gerek"

BT uzmanı Burak, Ankara'da yeni açılan şubenin AD'ye düzgün tanıtılması için **yeni site + subnet** oluşturmalı. Şu an client'lar auth için yavaş İstanbul DC'sine gidiyordu.

Bu yazı Ankara site'ını nasıl oluşturup DC ve client'ları doğru yönlendirdiğini anlatıyor.

## Neden AD Site?

AD Sites and Services = AD'nin coğrafi topolojisi.
- Site = aynı LAN/düşük-latency grubu
- Subnet = bir site'a bağlı IP range
- Site link = site'lar arası replikasyon yolu

Yanlış/eksik site config:
- Client uzak DC'ye auth → yavaş login
- GPO yavaş uygulanır (büyük dosyalar WAN üzerinden)
- Replication yanlış topology

## Hızlı Çözüm (TL;DR)

1. `dssite.msc` → Sites sağ tık > New Site
2. Subnet ekle: Subnets sağ tık > New Subnet → site'a bağla
3. Yeni Ankara DC'yi (varsa) site'a taşı: Servers > DC sağ tık > Move
4. Site Link edit: DEFAULTIPSITELINK'e Ankara'yı ekle
5. KCC trigger: `repadmin /kcc`

---

## Senaryo — Ankara Şubesi

- **İstanbul**: Ana ofis, `10.10.0.0/16`, Default-First-Site-Name
- **Ankara**: Yeni şube, `10.20.0.0/16`, DC03 mevcut (daha önce promote edildi ama site atanmadı)
- Site-to-site VPN kurulu

## 10:00 — Site Oluşturma

### Adım 1: Sites and Services Aç

```cmd
dssite.msc
```

> 📸 **Ekran 1** — Active Directory Sites and Services  
> Pencere başlığı: "Active Directory Sites and Services"  
> Sol panel: Sites  
> Alt:  
> - Default-First-Site-Name (mevcut İstanbul)  
>   - Servers  
>     - DC01  
>     - DC02  
> - Inter-Site Transports  
>   - IP  
>     - DEFAULTIPSITELINK  
> - Subnets (boş veya minimum)

### Adım 2: Yeni Site Oluştur

"Sites" root'a sağ tık:

> 📸 **Ekran 2** — New Site  
> Menu: "New Site..."  
> Dialog: "New Object - Site"  
> Alan: Name: "Ankara-Site"  
> Select site link object:  
>   - DEFAULTIPSITELINK (default, seçili)  
> OK  
> Bilgi mesajı: "Ensure that you create a subnet object..."  
> OK

Yeni site oluştu, ama boş (hiç DC, hiç subnet).

### PowerShell Alternatifi

```powershell
New-ADReplicationSite -Name "Ankara-Site"
```

## 10:05 — Subnet Oluşturma

### Adım 3: Yeni Subnet

Subnets'e sağ tık:

> 📸 **Ekran 3** — New Subnet  
> Menu: "New Subnet..."  
> Dialog: "New Object - Subnet"  
> Prefix: **10.20.0.0/16**  
> Listeden site seç: **Ankara-Site**  
> OK

**Not**: Subnet prefix = Ankara'nın tüm IP range'ini kapsamalı. 10.20.0.0/16 = 10.20.0.1 - 10.20.255.254 (65534 IP).

Daha granüler istersen:
- 10.20.10.0/24 (LAN)
- 10.20.20.0/24 (Sunucu)
- 10.20.30.0/24 (Misafir)

Her subnet ayrı ayrı eklenebilir, hepsi Ankara-Site'a map'lenir.

### PowerShell

```powershell
New-ADReplicationSubnet -Name "10.20.0.0/16" -Site "Ankara-Site"
```

## 10:10 — DC'yi Yeni Site'a Taşı

Mevcut DC03 (Ankara'da fiziksel) hâlâ Default-First-Site'ta görünüyor. Taşı:

> 📸 **Ekran 4** — Move Server  
> Default-First-Site-Name > Servers > **DC03** sağ tık  
> Menu: "Move..."  
> Dialog: "Move Server"  
> Liste: Tüm site'lar  
>   - Default-First-Site-Name  
>   - **Ankara-Site** ← seç  
> OK

DC03 artık Ankara-Site altında görünür.

### PowerShell

```powershell
Move-ADDirectoryServer -Identity "DC03" -Site "Ankara-Site"
```

## 10:12 — Site Link Yapılandırma

Default "DEFAULTIPSITELINK" replikasyon zamanlama ve cost yönetiyor. Düzenle:

> 📸 **Ekran 5** — Site Link Properties  
> Inter-Site Transports > IP > **DEFAULTIPSITELINK** sağ tık > Properties  
> Tabs: General | Attributes | Object | Security  
> General tab:  
> - Description: "Default IP site link"  
> - Sites in this site link:  
>   - Default-First-Site-Name ✓  
>   - **Ankara-Site** ← bu otomatik eklendi (new site wizard'dan)  
> - Cost: 100 (default)  
> - Replicate every: 180 minutes  
> - Change schedule...: 24/7 enabled

**Cost**: Birden fazla link varsa daha düşük cost tercih edilir. Tek link varsa default 100 OK.

**Replicate every**: Site'lar arası replikasyon sıklığı. Default 180 dk (3 saat) — çoğu ortam için fazla. Genelde **15 dakika** daha pratik:
```powershell
Set-ADReplicationSiteLink -Identity "DEFAULTIPSITELINK" -ReplicationFrequencyInMinutes 15
```

**Schedule**: 24/7 aktif. Bazı kurumlar WAN overload için gündüz kapatır, gece açar — "Change Schedule" butonuyla.

### PowerShell Site Link

```powershell
Set-ADReplicationSiteLink -Identity "DEFAULTIPSITELINK" `
    -ReplicationFrequencyInMinutes 15 `
    -Cost 100
```

## 10:15 — KCC Topology Recalculate

Değişiklikler sonrası KCC otomatik çalışır (15 dk interval). Manuel tetikle:

```powershell
# Tüm DC'lerde
repadmin /kcc
```

Çıktı:
```
Consistency check on DC01 successful.
Consistency check on DC02 successful.
Consistency check on DC03 successful.
```

KCC yeni topology'yi hesapladı. Connection objects güncellendi.

## 10:17 — Doğrulama

### Test 1: Client Site Identification

Ankara'daki bir laptop'ta:
```cmd
nltest /dsgetsite
```

Çıktı:
```
Ankara-Site
```

Eski davranış: "Default-First-Site-Name" (İstanbul — yanlış!).  
Yeni davranış: "Ankara-Site" ✓

### Test 2: Logon DC

```cmd
echo %LOGONSERVER%
```

Beklenen: `\\DC03` (Ankara yerel). Önceden `\\DC01` (İstanbul uzak) olabilirdi.

### Test 3: Replication

```cmd
repadmin /replsummary
```

DC01 ↔ DC03 arası replication her 15 dakikada gerçekleşmeli:
```
Source DSA     largest delta  fails/total %% error
DC01                :3m:24s       0 /   5    0
DC02                :3m:12s       0 /   5    0
DC03                :3m:45s       0 /   5    0
```

## Multi-Subnet + Geniş Ağ

Ankara'da 3 alt-subnet varsa:
- 10.20.10.0/24 (LAN)
- 10.20.20.0/24 (Sunucu)
- 10.20.30.0/24 (Misafir)

Her birini Ankara-Site'a map'le:
```powershell
New-ADReplicationSubnet -Name "10.20.10.0/24" -Site "Ankara-Site"
New-ADReplicationSubnet -Name "10.20.20.0/24" -Site "Ankara-Site"
New-ADReplicationSubnet -Name "10.20.30.0/24" -Site "Ankara-Site" -Description "Guest WiFi"
```

Misafir Wi-Fi bazen AD'ye dahil değil. Bu durumda subnet site'a bağlanmaz — "site-less" kalır.

## Site Link Bridge (Multi-site Mesh)

İstanbul + Ankara + Bursa varsa bridge yapısı:

**Transitive topology** (default):
- İstanbul ↔ Ankara (link)
- İstanbul ↔ Bursa (link)
- Ankara ↔ Bursa: otomatik İstanbul üzerinden transit

**Direct topology**:
- 3 site arasında direct link
- Daha hızlı ama config karmaşık

Site Link Bridge disable:
```powershell
Set-ADReplicationSiteLinkBridge -Identity "AllLinks" -ReplicationFrequencyInMinutes 15
```

## Bridgehead Server Atama (Opsiyonel)

Her site'ta **tek bir DC** replikasyon orchestrator olur (bridgehead). KCC otomatik seçer ama manuel de atanabilir:

> 📸 **Ekran 6** — Bridgehead server config  
> Ankara-Site > Servers > DC03 sağ tık > Properties  
> "General" tab  
> "This server is a preferred bridgehead server for the following transports:"  
> - Add → **IP** seç  
> OK

Bu DC bridgehead — diğer site'larla replikasyon source/dest.

## Yaygın Hatalar

### Client Hâlâ Uzak DC'ye Gidiyor

1. Client IP doğru subnet'te mi?
2. Subnet AD'de doğru site'a map'li mi?
3. `ipconfig /flushdns` + `klist purge`
4. Client restart

### Replication Hiç Olmuyor

- Site link cost çok yüksek olabilir
- Schedule tamamen kapalı (24/7 disabled)
- Firewall bloklamış

### Default-First-Site-Name'i Silmek İstedim, Hata

Default site silinemez — sadece rename edilebilir:
```powershell
Get-ADReplicationSite -Identity "Default-First-Site-Name" | 
    Rename-ADObject -NewName "Istanbul-HQ"
```

## Site Design Best Practices

### 1. Site per Physical Location

Her şube/veri merkezi = 1 site. Küçük şube (< 10 kullanıcı) ana siteye katılabilir ama genelde ayrı daha temiz.

### 2. Subnet Discipline

Her subnet mutlaka bir site'a map'li. "Site-less" subnet'ten gelen client'lar random DC'ye gider, performance sorunu.

### 3. Site Link Cost

Daha yakın/daha hızlı link daha düşük cost:
- Aynı bina: 10
- Aynı şehir: 100
- Şehirler arası fiber: 200
- Uydu bağlantı: 500

### 4. Replication Schedule

Gündüz WAN çok kullanılıyorsa gece replikasyon. Ama AD change'leri yavaş yayılır. Denge: her 15 dk (default 180'den düşür).

### 5. Read-only DC (RODC) Küçük Şubelerde

Küçük şube için **RODC** (sadece okuma) — güvenlik + management avantajı:
- Şifreler cache'lenmez
- Değişiklik yazmaz (sadece auth)
- Security breach riski düşük

## İlgili Rehberler

- [Yeni Domain Controller promote](/blog/ad-yeni-domain-controller-promote)
- [AD replication error 8524](/blog/active-directory-replication-error-8524)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)

---

**Multi-site AD design + şube deployment + topology optimizasyon için uzman destek?** Kozyatağı Bilişim AD infrastructure paketimiz. [Teknik görüşme.](/#contact)
