---
slug: fortigate-conserve-mode-memory-yuksek-cozum
title: "FortiGate 'Conserve Mode' / High Memory Usage — Çözüm"
type: cluster
pillar: 4
url: "/blog/fortigate-conserve-mode-memory-yuksek-cozum"
hedef_anahtar_kelime: "fortigate conserve mode memory"
meta_description: "FortiGate 'System is in conserve mode' uyarısı — yüksek memory. Sebep tespit, session temizleme, memory-heavy features disable, RAM upgrade."
kelime_sayisi: "~700"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Conserve Mode"
product_family: "Fortinet & Firewall"
---

## "FortiGate'im Yavaş, CPU Normal Ama..."

Dashboard:
```
⚠ System is in conserve mode
Memory usage: 88% (threshold 80%)
```

Memory tükenmiş. FortiGate "conserve mode"a geçti — bazı özellikler devre dışı kalıyor.

## Conserve Mode Nedir?

RAM %80 aşınca FortiGate kendini korumaya alır:
- **AV scanning disable** (memory yoğun)
- **IPS pattern matching limit**
- **Web filter cache flush**
- **Session table reduction**

Amaç: Cihaz crash olmadan self-preservation. Ama **güvenlik etkisi**: AV pass-through, threats kaçar.

## Hızlı Çözüm (TL;DR)

1. `diagnose sys top` — hangi process memory yiyor
2. `diagnose sys top-memory` — memory sıralı
3. Session table full? `diagnose sys session stat`
4. Reduce: AV protocol-match disable, SSL inspection optimize
5. Restart specific service
6. Son çare: reboot

---

## 10:00 — Memory Durumu

```
get system performance status
```

Output:
```
Memory: 87% used
CPU: 45%
Sessions: 234,567
```

```
diagnose sys top-memory
```

Top memory consumers:
```
Process          PID   Memory (%)
ipsengine       4523    18.2
scanunitd       4124    15.1
wad             3891    12.5
miglogd         2341     8.3
iked            2103     6.2
```

ipsengine + scanunitd = IPS + AV. Normalde birlikte %15-20, şimdi %33. AV patterns güncel olabilir (2024 signature explosion).

## 10:10 — Session Table

```
diagnose sys session stat
```

```
session table: max=6029312, count=5,800,000 (%96!)
```

**6M session max** ama 5.8M kullanılmış. Normal KOBİ 100-500K. Birileri flood ediyor.

Top session source:
```
diagnose sys session list | head -100
```

Tek IP'den 500K+ session → probably botnet infected machine.

## 10:15 — Acil İşlem

### Session Flush

```
diagnose sys session clear
```

Tüm session table temizlenir, user'lar yeniden bağlanır.

### Specific Source Block

Malicious source IP (ör. 10.10.10.150):
```
config firewall address
    edit "Suspect-10.10.10.150"
        set subnet 10.10.10.150/32
    next
end

config firewall policy
    edit 0   (yeni policy at top)
        set srcaddr "Suspect-10.10.10.150"
        set action deny
        set status enable
    next
end
move 0 before 1
```

## 10:25 — Memory-Heavy Features Optimize

### AV Protocol Scanning

Her protokol ayrı scan pahalı. Sadece kritik:
```
config antivirus profile
    edit default
        config http
            set av-scan enable
        end
        config ftp
            set av-scan disable    ← FTP zaten nadir, skip
        end
        config smtp
            set av-scan enable
        end
    next
end
```

### IPS Signature Count

[IPS sensor rehberi](/blog/fortigate-ips-sensor-ozel-imza-ayari) — signature count reduce.

### Log Accumulation

Disk dolu:
```
execute log delete
execute log filter category 0
```

## 10:40 — RAM Upgrade

Üst 3 adım yetmezse donanım:
- FortiGate 60F: 4 GB RAM default, not upgradable
- FortiGate 100F: 8 GB, not upgradable
- FortiGate 200F: 16 GB, not upgradable

FortiGate RAM not upgradable. Model büyütme gerek.

Eğer 60F memory sürekli yüksek:
- Firm çok büyümüş, kapasite aşılmış
- 100F veya 200F'ye upgrade

## Preventive

Aylık monitoring:
```
diagnose sys top-memory
```

%70 aşarsa tune. %80'e ulaşırsa önlem planı. Reactive değil proactive.

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [IPS sensor custom](/blog/fortigate-ips-sensor-ozel-imza-ayari)

---

**FortiGate performance + capacity planning için?** [Teknik görüşme.](/#contact)
