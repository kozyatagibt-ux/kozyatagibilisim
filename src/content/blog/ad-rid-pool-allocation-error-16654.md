---
slug: ad-rid-pool-allocation-error-16654
title: "AD 'Directory Service Unable to Allocate RID' — RID Pool Exhaustion"
type: cluster
pillar: 2
url: "/blog/ad-rid-pool-allocation-error-16654"
hedef_anahtar_kelime: "directory service unable to allocate rid"
meta_description: "Active Directory Event 16654/16653 — 'Directory service unable to allocate a relative identifier'. RID pool exhaustion teşhis ve RID Master role fix."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "Event 16654 / RID Pool"
product_family: "Windows Server & Active Directory"
---

## "Yeni Kullanıcı Oluşturamıyorum"

BT uzmanı Hakan yeni çalışan hesabı açarken:

> "Yeni user oluşturmaya çalışıyorum. Hata: **'The directory service has exhausted the pool of relative identifiers'**. Ne oluyor?"

Event Viewer > Directory Service:
```
Event ID: 16654
Source: NTDS General

The directory service was unable to allocate a relative identifier.
This directory controller has run out of relative identifiers.
```

Hakan 15 dakikada çözdü — **RID pool tükenmesi ve RID Master role'ünün erişilemez olması**. Bu yazı detayları anlatıyor.

## Hızlı Çözüm (TL;DR)

1. `netdom query fsmo` → RID Master kim?
2. RID Master online ve erişilebilir mi kontrol
3. DC'ler arası connection: `repadmin /replsummary`
4. Manuel RID pool invalidate + request:
   ```
   dcdiag /s:dc01 /test:ridmanager /v
   ```
5. Olmazsa seize RID Master role başka DC'ye

---

## RID Pool Nedir?

**RID (Relative Identifier)** = her AD objesinin unique numarası. SID yapısı:
```
S-1-5-21-[domain-id]-[RID]
```

Örn: `S-1-5-21-3623811015-3361044348-30300820-1107`
- Domain ID: `3623811015-3361044348-30300820`
- **RID: 1107**

Her DC kendi "RID pool"undan (500'erlik blok) numara verir:
- DC01 → 1000-1499 (500 numara hazır)
- DC02 → 1500-1999
- DC03 → 2000-2499

DC pool'u tüketince **RID Master** (FSMO role'ünü taşıyan DC)'dan **yeni pool** ister. RID Master DC'ye yeni 500'lük blok atar.

### Problem Nereden Çıkar?

1. **RID Master offline** — DC diğerlerine yeni pool veremiyor
2. **Replication bozuk** — RID Master accessible ama update'ler replike olmuyor
3. **Aşırı user creation** — 1 milyon+ user oluşturulmuş, **global RID limiti** (2^30 ≈ 1 milyar) yaklaşıyor
4. **RID pool size yanlış set edilmiş** — default 500 ama çok düşük bir değere çekilmiş

## 10:00 — Hakan Tanı Başlatıyor

### Adım 1: RID Master Kim?

```cmd
netdom query fsmo
```

Çıktı:
```
Schema master               DC01.corp.firma.com.tr
Domain naming master        DC01.corp.firma.com.tr
PDC                         DC02.corp.firma.com.tr
RID pool manager            DC01.corp.firma.com.tr  ← Bu
Infrastructure master       DC03.corp.firma.com.tr
```

**RID Master: DC01**.

### Adım 2: DC01'e Erişim Var Mı?

```powershell
Test-NetConnection DC01.corp.firma.com.tr -Port 389
```

Sonuç: `TcpTestSucceeded: True`. DC01 online.

### Adım 3: Replication Sağlığı

```cmd
repadmin /replsummary
```

Çıktı:
```
Source DSA     largest delta    fails/total %% error
DC01                 :2m:12s       0 /   5    0
DC02                 :2m:55s       0 /   5    0
DC03                 :2m:33s       0 /   5    0
```

Replication sağlıklı. O halde RID request başarısız olmalı.

### Adım 4: dcdiag ile RID Manager Test

```cmd
dcdiag /s:dc02 /test:ridmanager /v
```

Çıktı:
```
Testing server: Default-First-Site-Name\DC02
Starting test: RidManager
   rIDNextRID: 10499
   rIDPreviousAllocationPool: 9500 to 9999
   rIDAllocationPool: 10000 to 10499
   rIDUsedPool: 0
   rIDAvailablePool: 10000 to 10499
   ............................. DC02 passed test RidManager
```

DC02 hâlâ pool'da numara var (10000-10499, sadece 10499'a kadar kullanmış).

Hakan'ın kullandığı DC **DC03**:
```cmd
dcdiag /s:dc03 /test:ridmanager /v
```

Çıktı:
```
rIDAllocationPool: 8000 to 8499  ← Kullanmış
rIDNextRID: 8499                 ← Kalan 0!
Unable to request new pool from RID Master.
...
Failed test RidManager
```

**DC03'ün RID pool'u tükenmiş ve yeni pool alamıyor**.

## 10:15 — Neden Alamıyor?

Replication sağlıklıysa ve RID Master online ise neden DC03 yeni pool alamıyor?

Olası sebepler:

### Sebep 1: Network Bloğu

DC03 → DC01 arasında özel bir port block. Ping OK ama RPC dynamic range kapalı.

```powershell
# DC03'ten DC01'e yüksek port test
Test-NetConnection DC01.corp.firma.com.tr -Port 50001
```

Fail ediyorsa dynamic RPC problem. [Önceki rehberimiz](/blog/ad-rpc-server-unavailable-1722) adım adım çözer.

### Sebep 2: Time Skew

Kerberos 5 dakika tolere eder. DC03 saati 10 dakika öndeyse RID Master'la auth başarısız:
```powershell
# DC03'te
w32tm /query /status
w32tm /query /source

# Karşılaştır:
Invoke-Command -ComputerName DC01 { Get-Date }
Get-Date
```

Fark büyükse:
```powershell
w32tm /resync /force
```

### Sebep 3: RID Master'ın AD Servisleri Sorunlu

RID Master erişilebilir ama **NTDS service** içinde olağandışı bir sorun:
```powershell
# DC01'de
Get-Service NTDS, KDC, Netlogon | Select Name, Status
```

Hepsi Running değilse → restart.

### Sebep 4: RID Master Role Seize Edilmeli

Olağanüstü durumda: DC01 bozuk, RID Master role **DC02**'ye zorla transfer.

⚠️ **Uyarı**: Seize sadece DC01 gerçekten kurtarılamıyorsa. Seize sonrası DC01 tekrar online olursa **tekrar domain'e katılmamalı** (aynı role iki DC'de → chaos).

```cmd
ntdsutil
roles
connections
connect to server DC02.corp.firma.com.tr
quit
seize rid master
```

Prompt: "Do you want to seize the RID FSMO? [Y/N]" → Y

Transfer tamamlandı. DC02 artık RID Master. DC03 yeni pool request'ini DC02'den alır.

## 10:20 — Hakan'ın Vakası

Hakan kontrol ettikten sonra: **DC01 ↔ DC03 arasında firewall sorunu**. Yeni site-to-site VPN geçen hafta değiştirilmiş, dynamic RPC portları atlanmış.

FortiGate firewall kuralı güncellendi (dynamic RPC range açıldı). 5 dakika sonra DC03 yeni pool aldı.

```cmd
dcdiag /s:dc03 /test:ridmanager /v
```

Artık:
```
rIDAllocationPool: 10500 to 10999  ← Yeni pool!
rIDNextRID: 10500                  ← Kullanmaya başladı
............................. DC03 passed test RidManager
```

Hakan yeni kullanıcıyı oluşturdu. Başarılı.

## RID Pool Size Değiştirme

Default 500 küçük olabilir (çok user creation var ise, 100K+ kullanıcılı domain). Artırma:

```cmd
dcdiag /test:ridmanager /v
```

RID pool size bilgisi. Artırmak için:

```
ntdsutil
security account management
connect to server DC01
connect
quit
current rid master
```

Direct ADSI edit ile `rIDPreviousAllocationPool` ve `rIDAllocationPool` attribute'ları değiştirilebilir ama **risk yüksek** — Microsoft desteği ile yapılmalı.

Alternative: ilk kurulumda registry:
```
HKLM\SYSTEM\CurrentControlSet\Services\NTDS\RID Values
```

Advanced configuration, production'da değiştirmeyin.

## Global RID Limiti

AD **2^30 = yaklaşık 1 milyar** RID desteler. Küçük şirket için imkansız ama:
- 20 yıllık domain + sürekli user create/delete
- 1000 kullanıcı × 365 gün × 20 yıl = 7.3 milyon işlem
- Milyara yaklaşmak için daha radikal senaryo gerekli

Ama **dikkat**: Silinmiş user'lar RID'i iade etmez. 1 milyon user silip 1 milyon oluştursanız 2 milyon RID kullanılmış olur.

Yaklaşık limit alarm:
```powershell
# Mevcut RID ilerlemesi
$riddomain = Get-ADDomain | Select -ExpandProperty RIDMaster
Invoke-Command -ComputerName $riddomain {
    $obj = Get-ADObject "CN=RID Manager$,CN=System,$(Get-ADDomain | Select -ExpandProperty DistinguishedName)" -Properties rIDAvailablePool
    $pool = $obj.rIDAvailablePool
    $total = ($pool -shr 32)
    $used = ($pool -band 0xFFFFFFFF)
    $pct = ($used / $total) * 100
    [PSCustomObject]@{Total=$total; Used=$used; Remaining=($total - $used); PercentUsed=[math]::Round($pct, 2)}
}
```

Output: kullanılan / toplam / kalan.

`%90+` ise planlama başlasın — zamanında Microsoft support.

## Önleyici Bakım

1. **Aylık dcdiag raporu**: `dcdiag /v /e /f:ad-health.log` — RID manager dahil tüm testler
2. **FSMO role health monitoring**: PRTG/Zabbix ile
3. **Replication monitoring**: delta > 1 saat alarm
4. **DC firewall kurallarında change management** — yeni kural eklenirken AD'yi bozma riski

## İlgili Rehberler

- [AD replication error 8524](/blog/active-directory-replication-error-8524)
- [RPC server unavailable 1722](/blog/ad-rpc-server-unavailable-1722)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)
- [FSMO roles transfer](/blog/ad-fsmo-roles-transfer-dc1-dc2)

---

**AD health, FSMO management ve enterprise domain troubleshooting için uzman destek?** Kozyatağı Bilişim AD infrastructure support. [Teknik görüşme.](/#contact)
