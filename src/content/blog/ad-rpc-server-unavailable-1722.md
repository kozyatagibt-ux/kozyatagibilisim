---
slug: ad-rpc-server-unavailable-1722
title: "AD 'The RPC Server is Unavailable' (1722) — DC Bağlantı Sorunu Çözümü"
type: cluster
pillar: 2
url: "/blog/ad-rpc-server-unavailable-1722"
hedef_anahtar_kelime: "rpc server unavailable 1722 domain controller"
meta_description: "Active Directory 'The RPC server is unavailable' (Error 1722) hatası — DC'ler arası RPC bağlantı sorunu. Port 135, dynamic RPC range, firewall çözümleri."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "1722 / RPC Server Unavailable"
product_family: "Windows Server & Active Directory"
---

## "Yeni DC'yi Kurduk, Replike Etmiyor"

Branch office açılışı. BT uzmanı Burak yeni DC'yi Ankara'da promote etti. Ancak ilk replication denemesinde:

```
repadmin /replsummary

Source DSA     largest delta    fails/total %% error
DC01-IST             :0m:12s       0 /   5    0
DC02-ANK             >24h:00m       5 /   5 100   (1722) The RPC server is unavailable.
```

Event Viewer > Directory Service:
```
Event ID: 1865 (NTDS Replication)
The replication operation encountered a network error.

Error Value: 1722
Error Description: The RPC server is unavailable.
```

Burak ilk defa bu hatayla karşılaştı. 25 dakika sürdü — sebep **kurumsal firewall dynamic RPC range bloklamak**. Bu yazı çözümü anlatıyor.

## Hızlı Çözüm (TL;DR)

1. Test: `Test-NetConnection DC01.corp -Port 135` — port 135 açık mı?
2. Açıksa: RPC dynamic ports (TCP 49152-65535) bloklanmış olabilir
3. **Çözüm A**: Firewall'da dynamic range aç (49152-65535)
4. **Çözüm B**: AD'yi **static RPC port**'a sabitle (tek port açmak için)
5. DNS çözümleme doğru mu kontrol

---

## Error 1722 Ne Anlama Geliyor?

**1722** = `RPC_S_SERVER_UNAVAILABLE`. Windows RPC (Remote Procedure Call) ile hedef server'a bağlanamıyor. AD için kritik çünkü:
- Replication RPC tabanlı
- GPO apply RPC
- Computer account check RPC
- AD management tools RPC

Hata 3 katmandan gelebilir:
1. **Network**: Paket hedef'e ulaşmıyor (firewall, routing)
2. **RPC endpoint**: Port 135 açık ama dynamic port kapalı
3. **Service**: RPC service target'ta çalışmıyor (çöktü)

## 09:00 — Burak Tanı Başlatıyor

### Adım 1: Ping Test

```cmd
ping dc01.corp.firma.com.tr
```

Cevap geliyor → Layer 3 OK.

### Adım 2: Port 135 Test

Port 135 **RPC Endpoint Mapper** — RPC bağlantısı önce buna gelir, sonra dynamic bir porta yönlendirilir.

```powershell
Test-NetConnection dc01.corp.firma.com.tr -Port 135
```

Çıktı:
```
ComputerName     : dc01.corp.firma.com.tr
RemoteAddress    : 10.10.20.10
RemotePort       : 135
InterfaceAlias   : Ethernet
SourceAddress    : 10.20.20.5
TcpTestSucceeded : True
```

**True** → 135 açık. Ama bu yetmiyor — dynamic port da açılmalı.

### Adım 3: Diğer AD Portları Test

```powershell
@(135, 389, 636, 88, 3268, 3269, 445) | ForEach-Object {
    $result = Test-NetConnection dc01.corp.firma.com.tr -Port $_ -InformationLevel Quiet
    [PSCustomObject]@{Port=$_; Open=$result}
}
```

Çıktı:
```
Port   Open
----   ----
 135   True
 389   True
 636   True
  88   True
3268   True
3269   True
 445   True
```

Tüm standart portlar açık. Sorun **dynamic RPC**.

### Adım 4: Dynamic RPC Test

```powershell
# Random high port test
Test-NetConnection dc01.corp.firma.com.tr -Port 50000
Test-NetConnection dc01.corp.firma.com.tr -Port 60000
```

Çıktılar: **TcpTestSucceeded: False**. Firewall 49152-65535 range'ini bloklamış.

## 09:15 — Kurumsal Firewall İncelemesi

Burak FortiGate'e baktı. Ankara ↔ İstanbul site-to-site VPN policy'sinde:
```
Source: 10.20.20.0/24 (Ankara DC)
Destination: 10.10.20.0/24 (İstanbul DC)
Service: RPC, LDAP, DNS, Kerberos, SMB  ← Özel service group
Action: Accept
```

"RPC" service grubunda:
- TCP 135
- UDP 135
- **Dynamic RPC** yok!

FortiGate'in default "RPC" servisi dynamic range içermiyor. Eklenmesi gerek.

## 09:20 — Çözüm A: Firewall'da Dynamic RPC Range Aç

### FortiGate Örneği

> 📸 **Ekran 1** — FortiGate > Services  
> Policy & Objects > Services > +Create New  
> Name: "AD-Dynamic-RPC"  
> Type: Firewall  
> Protocol Type: TCP/UDP/SCTP  
> Destination Port: 49152-65535  
> Protocol: TCP

Sonra service group:

> 📸 **Ekran 2** — Service Group AD-Services  
> Members:  
> - DCE-RPC (135)  
> - **AD-Dynamic-RPC** (yeni) ← eklendi  
> - DNS (53)  
> - LDAP (389)  
> - LDAPS (636)  
> - Kerberos (88)  
> - SMB (445)  
> - Global Catalog (3268, 3269)

Policy'yi bu grupla update → Apply.

### Cisco ASA / FTD Örneği

```cisco
access-list AD_TRAFFIC extended permit tcp host 10.20.20.5 host 10.10.20.10 range 49152 65535
```

### pfSense / OPNsense

```
Firewall > Rules > LAN > +Add
Source: 10.20.20.0/24
Destination: 10.10.20.0/24
Protocol: TCP
Destination port range: 49152 - 65535
```

## 09:25 — Replication Test

Ankara DC'de:
```powershell
repadmin /showrepl
```

Önce hâlâ:
```
Last attempt @ 2024-05-12 09:14:33 failed, result 1722 (0x6ba)
```

Manual replicate zorla:
```powershell
repadmin /syncall /AeP
```

Bu sefer:
```
Connecting to DC01.corp.firma.com.tr...
Syncing all NC's held on DC01.
...
SUCCESS
```

Replication restored.

## Çözüm B: Dynamic RPC Yerine Static Port (Paranoyak Firewall için)

Bazı kurumsal ortamda "49152-65535 bir range" açmak güvenlik politikasına aykırı. Çözüm: AD'yi **tek bir static port**a sabitle.

### NTDS için Static RPC Port

Registry Editor'da (her DC'de):

```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NTDS\Parameters
```

Yeni DWORD:
- Name: `TCP/IP Port`
- Value: `50000` (örn. seçtin port)

Restart NTDS:
```powershell
Restart-Service NTDS -Force
```

NTDS replication artık sadece 50000 kullanır. Firewall'da sadece **TCP 50000** açılır.

### Netlogon için Static RPC Port

```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters
```

Yeni DWORD:
- Name: `DCTcpipPort`
- Value: `50001`

```powershell
Restart-Service Netlogon -Force
```

### FRS/DFSR için

FRS (eski):
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NTFrs\Parameters
Name: RPC TCP/IP Port Assignment
Value: 50002
```

DFSR (modern):
```powershell
dfsrdiag StaticRPC /Port:50003
Restart-Service DFSR
```

### Firewall Sadece Bu Portları Açar

| Servis | Port |
|---|---|
| NTDS RPC | 50000 |
| Netlogon RPC | 50001 |
| DFSR RPC | 50003 |
| RPC Endpoint Mapper | 135 |
| LDAP | 389 |
| LDAPS | 636 |
| Kerberos | 88 |
| SMB | 445 |
| Global Catalog | 3268, 3269 |

Toplam ~10 port açık. Dynamic range (16K port) kapalı.

**Not**: Static port ayarı her DC'de **aynı** olmalı. Yoksa DC'ler birbirine bağlanamaz.

## Yaygın Hatalar

### "The RPC server is unavailable" Sadece Bir Yönlü

`DC02 → DC01` OK ama `DC01 → DC02` fail. Firewall asymmetric:
- İstanbul → Ankara allow
- Ankara → İstanbul deny veya restricted

İki yönlü firewall kurallarını kontrol et.

### Test-NetConnection 135 OK Ama repadmin Fail

Port 135 açık, RPC endpoint mapper responding, ama dynamic port negotiation başarısız. Dynamic port test:
```powershell
# PortQry kullan (daha detaylı RPC discovery)
portqry -n dc01.corp.firma.com.tr -e 135 -p tcp
```

Çıktı RPC endpoint'leri listeler:
```
Querying target system called: dc01
Attempting to resolve name to IP address...
RPC over HTTP: 53248 (ncacn_http), 
NTDS: 49664 (ncacn_ip_tcp)
...
```

Bu portları test et. Bir tanesi fail ediyorsa firewall problem.

### DNS Çözümlemesi Yanlış

```powershell
nslookup dc01.corp.firma.com.tr
# Yanlış IP dönüyor mu?

nslookup -type=SRV _ldap._tcp.dc._msdcs.corp.firma.com.tr
# DC SRV kayıtları doğru mu?
```

Yanlış DNS = RPC yanlış IP'ye gidiyor = fail.

### Reverse DNS Eksik

AD bazen reverse lookup yapar:
```powershell
# Ankara DC'nin IP'si 10.20.20.5, reverse kayıt var mı?
nslookup 10.20.20.5
```

Yoksa Reverse Lookup Zone'da PTR ekle.

## Tanı Komutları Cheatsheet

```powershell
# 1. Basic connectivity
Test-NetConnection dc01.corp.firma.com.tr -Port 135

# 2. Detaylı RPC discovery (portqry tool)
portqry -n dc01.corp.firma.com.tr -e 135 -p tcp

# 3. Replication durumu
repadmin /replsummary
repadmin /showrepl

# 4. Zorla replication
repadmin /syncall /AeP

# 5. DC discovery
nltest /dsgetdc:corp.firma.com.tr

# 6. Comprehensive AD health
dcdiag /v /s:dc01.corp.firma.com.tr
```

## Önleyici Strateji

### 1. Firewall Change Management

DC'ler arası firewall kurallarında değişiklik:
- Yazılı change request
- Test ortamında doğrulama
- Production'a rollout + rollback plan

### 2. Monitoring

Replication delay > 1 saat → alarm:
```powershell
# Scheduled task
$delta = (repadmin /replsummary | Select-String "DC01" -Context 0,1) -join " "
if ($delta -match "(\d+)m") {
    $minutes = [int]$Matches[1]
    if ($minutes -gt 60) {
        Send-MailMessage -Subject "AD Replication Delay" ...
    }
}
```

### 3. Site-Aware Firewall Design

Her site için DC'lerin IP'si whitelisted. Yeni DC eklenince firewall kuralı güncelleniyor.

## İlgili Rehberler

- [AD replication error 8524](/blog/active-directory-replication-error-8524)
- [Event 1311 KCC topology](/blog/ad-event-1311-kcc-could-not-calculate-topology)
- [Kerberos KRB_AP_ERR_MODIFIED](/blog/kerberos-krb-ap-err-modified-event-4771)

---

**AD infrastructure deployment + multi-site firewall hardening için uzman destek?** Kozyatağı Bilişim AD + network security paketimiz. [Teknik görüşme.](/#contact)
