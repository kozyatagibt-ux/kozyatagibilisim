---
slug: fortigate-fortianalyzer-log-forwarding
title: "FortiGate FortiAnalyzer Log Forwarding — SIEM Integration"
type: cluster
pillar: 4
url: "/blog/fortigate-fortianalyzer-log-forwarding"
hedef_anahtar_kelime: "fortigate fortianalyzer log"
meta_description: "FortiGate → FortiAnalyzer + SIEM log forwarding — sentralize log collection, retention, reporting. Syslog ve CEF format export."
kelime_sayisi: "~800"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Log Forwarding"
product_family: "Fortinet & Firewall"
---

## "Log'lar Cihazda Kalıyor, Ransomware Sonrası Forensic Yapamıyoruz"

Incident response sonrası:
> "Attack 3 gün önce başladı, cihazda log sadece 48 saat tutuluyor. Attack kaynağını teşhis edemedik."

Çözüm: **FortiAnalyzer** veya **3rd party SIEM** log forwarding.

## Hızlı Çözüm (TL;DR)

### FortiAnalyzer
```
config log fortianalyzer setting
    set status enable
    set server 10.10.20.100      ← FortiAnalyzer IP
    set upload-option realtime
end
```

### 3rd Party (Wazuh, Splunk, Graylog)
```
config log syslogd setting
    set status enable
    set server 10.10.20.200
    set port 514
    set format default        (veya cef)
end
```

---

## 10:00 — FortiAnalyzer Deployment

FortiAnalyzer = Fortinet'in native log collector. Virtual appliance veya hardware:

- VM download: Fortinet Support
- Resource: 8 GB RAM, 200 GB disk
- Retention: Disk boyutuna göre 90-365 gün

Register:
```
FortiGate > Log & Report > Log Settings > FortiAnalyzer:
IP: 10.10.20.100
Upload option: Realtime
```

FortiAnalyzer GUI > Device Manager > "Register FortiGate" — confirm.

## 10:10 — FortiAnalyzer Dashboard

> 📸 **Ekran 1** — FortiAnalyzer FortiView  
> Dashboard:  
> - Top Threats (last 24h)  
> - Top Attackers (source IP)  
> - Top Applications  
> - Top Blocked Countries  
> - Bandwidth Usage  

Real-time + historical.

## 10:20 — SIEM Integration (Wazuh Örneği)

FortiAnalyzer opsiyonel. 3rd party SIEM tercih edilirse:

```
config log syslogd setting
    set status enable
    set server 10.10.20.200    ← Wazuh IP
    set port 514                ← UDP syslog
    set facility local7
    set format default
end
```

CEF format daha yaygın SIEM'ler için:
```
config log syslogd setting
    set format cef
end
```

## Log Filtering

Her şey yollamaya gerek yok. Noise reduction:

```
config log syslogd filter
    set forward-traffic enable
    set local-traffic disable     ← management trafik loglama
    set multicast-traffic disable
    set sniffer-traffic disable
    set severity warning          ← warning + error only
    set traffic enable
    set event enable
    set anomaly enable
    set voip enable
end
```

Sadece kritik log'lar. Disk + network tasarrufu.

## 10:40 — Reports Automation

FortiAnalyzer > Reports > + Create New:

> 📸 **Ekran 2** — Report Generator  
> Report: "Weekly Threat Summary"  
> Layout: "FortiGate Threat Report"  
> Data filter:  
> - Time: Last 7 days  
> - Devices: All  
> Schedule: Every Monday 09:00  
> Recipients: ciso@firma.com.tr, sec-team@firma.com.tr  
> Format: PDF

Her Pazartesi otomatik mail geliyor.

## Log Retention Policy

FortiAnalyzer disk dolu:
```
Admin > System Settings > Log Settings:
Database size: 500 GB
Archive: 14 months
Auto-purge: older than 14 months
```

Eski log'lar compressed archive'da. 14 ay KVKK için yeterli (Vergi 10 yıl istiyorsa external backup'a gönder).

## Threat Hunting

SIEM'deki log'larda arama:

**Brute force attacker IP tespit**:
```
# FortiAnalyzer query
Event ID: 00013 (firewall deny)
Source IP: any
Count > 100 in 1 hour
```

Top attacker IP'ler listelendi → firewall'da block.

**Data exfiltration**:
```
Outbound traffic > 1 GB from single internal IP in 1 hour
Application: Cloud.Storage or Unknown
```

Suspicious — investigate.

## İlgili Rehberler

- [Event 4625 brute force](/blog/event-id-4625-brute-force-tespit-onlem)
- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)

---

**SIEM + Log Analytics deployment için uzman destek?** [Teknik görüşme.](/#contact)
