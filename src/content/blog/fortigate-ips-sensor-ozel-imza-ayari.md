---
slug: fortigate-ips-sensor-ozel-imza-ayari
title: "FortiGate IPS Sensor — Özel İmza + Ayarlar (Performans + Güvenlik Dengesi)"
type: cluster
pillar: 4
url: "/blog/fortigate-ips-sensor-ozel-imza-ayari"
hedef_anahtar_kelime: "fortigate ips sensor custom"
meta_description: "FortiGate IPS (Intrusion Prevention) sensor — custom signature, severity filtering, performance tuning. 1000+ signature'dan gerçekten kritik olanlar."
kelime_sayisi: "~800"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "IPS Sensor"
product_family: "Fortinet & Firewall"
---

## "IPS Açık Ama CPU %100, Kapatayım mı?"

IT'de yanlış algı: "IPS performance öldürüyor, kapatayım." 

Doğru: **IPS tune edilir**. Default sensor tüm 18,000+ signature aktif → CPU zor. Kritik olanlar + özel ihtiyaç = denge.

## Hızlı Çözüm (TL;DR)

1. Security Profiles > IPS Sensor > + Create
2. Filter: Severity = Critical + High
3. Category: Specific (Server: SQL injection, XSS, RCE)
4. Client-side attacks: Browser-based (Java, Flash CVEs)
5. Performance: Scan timeout reasonable, packet loss acceptable
6. Policy attach

---

## 10:00 — Default Sensor Analiz

Default IPS sensor:
- Tüm 18K+ signature aktif
- Her severity (info → critical)
- Tüm category
- Her paket inspect

**Etkisi**: CPU %50-70, latency +15ms, memory yüksek.

Çoğu signature irrelevant — info-level, noise, old/disabled software.

## 10:10 — Custom Sensor

Security Profiles > IPS Sensor > + Create:

> 📸 **Ekran 1** — IPS Sensor  
> Name: "Corp-IPS-Tuned"  
>   
> IPS Signatures and Filters:  
>   + Add Filter:  
>     **Severity**: Critical, High  
>     Target: Server (server-protecting signatures)  
>     OS: Windows, Linux  
>     Protocol: HTTP, HTTPS, SMB, RDP  
>     Action: **Block**  
>     
>   + Add Filter:  
>     Severity: Critical  
>     Target: Client (client-side browser exploits)  
>     Action: Block  
>     
>   + Add Filter (selective):  
>     Application: specific (MSSQL, Apache, WordPress)  
>     Action: Block

Bu tune ile aktif signature ~3000. Performance delta minimal.

## 10:25 — Signature Override

Specific signature enable/disable:

> 📸 **Ekran 2** — Signature  
> Search: "Log4j"  
> Multiple CVE-2021-44228 signature listed  
> Select all → **Action: Block** (Log4Shell — kritik)

Veya false positive:
- Signature: "Apache.HTTP.Server.Directory.Traversal"  
- İç Apache server false positive veriyor  
- Override: **Disable** (bu signature için)

## 10:40 — Rate-Based Thresholds

Brute force / DDoS için:
```
config ips sensor
    edit "Corp-IPS-Tuned"
        config entries
            edit 1
                set severity critical high
                set rate-threshold 100
                set rate-duration 60
                set rate-mode periodical
                set rate-track src-ip
            next
        end
    next
end
```

100 attempt / 60 saniye → source IP track + block.

## Monitoring

Security Fabric > IPS:
- Daily events: ~200-500 normal
- Critical blocks: <10
- Top source IPs (tekrar eden attacker)
- Top signatures triggered

Anomali detection:
```
Signature triggered > 10,000 times/day from single IP
→ Active attack, immediate block
```

## Performance Metrics

```
diagnose ips stats show
```

Output:
- Packets processed
- Drops due to full buffer
- Average latency added

Kabul edilebilir:
- Latency +5-15 ms
- Throughput %-10-20

Bundan fazlaysa:
- Daha az signature
- Daha güçlü FortiGate model
- Offload (ASIC-based where available)

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [SSL Inspection](/blog/fortigate-ssl-inspection-deep-certificate)

---

**IPS deployment + threat hunting için uzman destek?** [Teknik görüşme.](/#contact)
