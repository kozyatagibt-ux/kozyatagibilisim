---
slug: fortigate-diagnose-sniffer-packet-troubleshoot
title: "FortiGate 'diagnose sniffer packet' — Packet Capture ile Troubleshoot"
type: cluster
pillar: 4
url: "/blog/fortigate-diagnose-sniffer-packet-troubleshoot"
hedef_anahtar_kelime: "fortigate diagnose sniffer packet"
meta_description: "FortiGate diagnose sniffer packet — iç packet capture. VPN, VoIP, firewall policy, NAT troubleshoot için gerçek senaryolar."
kelime_sayisi: "~950"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Packet Capture"
product_family: "Fortinet & Firewall"
---

## "Pingle Ulaşıyor, Ama Uygulama Bağlanmıyor"

Server 10.10.20.50'ye user 10.10.10.45 bağlanmıyor:
- Ping OK
- Telnet port 443 OK
- Ama uygulama "Connection timed out"

Firewall'da bir şey olmalı — nerede drop ediyor? `diagnose sniffer packet` ile bul.

## Hızlı Çözüm (TL;DR)

```
# Source 10.10.10.45 → dest 10.10.20.50
diagnose sniffer packet any "host 10.10.10.45 and host 10.10.20.50" 4 0 l
```

Parametreler:
- `any` — tüm interface'ler
- `filter` — BPF syntax
- `verbose` (0-6, 4 önerilen): 4 = packet summary + header info
- `count` (0 = sınırsız)
- `timestamp format` (l = ISO)

CTRL+C stop.

---

## 10:00 — Capture Başlat

```
# User → Server tüm trafik
diagnose sniffer packet any "host 10.10.10.45 and host 10.10.20.50" 4 0 l
```

Çıktı örneği:
```
2024-05-12 10:05:23.123456 wan1 in 10.10.10.45.54678 -> 10.10.20.50.8080: syn 12345
2024-05-12 10:05:23.123478 wan1 out 10.10.10.45.54678 -> 10.10.20.50.8080: syn 12345
2024-05-12 10:05:23.124567 internal out 10.10.20.50.8080 -> 10.10.10.45.54678: syn ack 54321
2024-05-12 10:05:23.124589 wan1 in 10.10.20.50.8080 -> 10.10.10.45.54678: syn ack 54321
2024-05-12 10:05:23.124612 wan1 out 10.10.20.50.8080 -> 10.10.10.45.54678: syn ack 54321
```

**Yorumlama**:
- `wan1 in` = user'dan FortiGate'e geldi
- `wan1 out` = FortiGate'ten içeri çıktı (policy geçti)
- `internal out` = iç interface'ten server'a gitti
- Server `syn ack` cevabı → server'dan geldi
- FortiGate `wan1 out` dönüş paketi user'a

**Problem**: SYN gittiği gibi SYN+ACK dönmüyorsa server paketi alıyor ama cevap vermiyor. Server application issue.

Eğer SYN `wan1 in` görünür ama `internal out` yok → firewall policy drop.

## Verbose Seviyeleri

| Level | Info |
|---|---|
| 1 | Packet header only |
| 2 | 1 + IP header detayı |
| 3 | 2 + timestamp |
| **4** | 3 + interface info (en yaygın) |
| 5 | 4 + protocol ek bilgisi |
| 6 | Hex dump (çok detay) |

## BPF Filter Örnekleri

### Spesifik Source
```
diagnose sniffer packet any "src host 10.10.10.45" 4 0 l
```

### Spesifik Port
```
diagnose sniffer packet any "port 443" 4 0 l
```

### ICMP Only
```
diagnose sniffer packet any "icmp" 4 0 l
```

### SYN Only (bağlantı başlangıcı)
```
diagnose sniffer packet any "tcp[13] & 2 != 0" 4 0 l
```

### Interface Spesifik
```
diagnose sniffer packet wan1 "host 10.10.10.45" 4 0 l
```

## Packet Trace to File

Uzun süreli capture:
```
diagnose sniffer packet any "host 10.10.10.45" 3 0 l > /tmp/capture.log
```

TFTP'ye kaydet:
```
execute tftp put /tmp/capture.log 10.10.20.100
```

Sonra Wireshark'ta aç.

## FortiGate Debug Flow (Policy Detayı)

Daha fazla detay — hangi policy, NAT, route?

```
diagnose debug enable
diagnose debug flow filter saddr 10.10.10.45
diagnose debug flow filter daddr 10.10.20.50
diagnose debug flow filter proto 6
diagnose debug flow show function-name enable
diagnose debug flow show iprope enable
diagnose debug flow trace start 100
```

Şimdi user connection denesin. Çıktı:
```
id=20085 trace_id=1 func=print_pkt_detail line=5723 msg="vd-root:0 received a packet(proto=6, 10.10.10.45:54678->10.10.20.50:8080)"
id=20085 trace_id=1 func=init_ip_session_common line=5914 msg="allocate a new session-00123456"
id=20085 trace_id=1 func=iprope_dnat_check line=536 msg="in-[wan1],out-[]"
id=20085 trace_id=1 func=iprope_dnat_tree_check line=824 msg="len=0"
id=20085 trace_id=1 func=fw_pre_route_handler line=183 msg="VIP-10.10.10.45:54678, outdev-unknown"
id=20085 trace_id=1 func=__iprope_check line=2286 msg="gnum-100004 check result: ret-matched, act-accept, flag-00000000, flag2-00000000"
id=20085 trace_id=1 func=__iprope_user_identity_check line=1766 msg="ret-matched"
id=20085 trace_id=1 func=__iprope_check line=2286 msg="gnum-4e20 check result: ret-no-match, act-accept, flag-00000000, flag2-00000000"
...
msg="Denied by forward policy check (policy 0)"  ← HERE! No policy match
```

**Policy 0 = implicit deny**. Policy listede matching bir policy yok. Firewall policy oluştur veya düzelt.

### Debug Durdurma

```
diagnose debug disable
diagnose debug reset
```

Debug açık kalırsa CPU yer.

## Real-World Kullanım

### VPN Tunnel Debug
```
diagnose sniffer packet any "port 500 or port 4500" 4 0 l
# IKE + NAT-T paketleri
```

### VoIP Call Problem
```
diagnose sniffer packet any "port 5060 or (udp and portrange 10000-20000)" 4 0 l
# SIP + RTP media
```

### DNS Query
```
diagnose sniffer packet any "port 53" 4 0 l
```

### Specific Firewall Policy Hit
```
diagnose debug enable
diagnose debug flow filter policy-id 42
diagnose debug flow trace start 50
```

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [Peer SA proposal not match (IPsec)](/blog/fortigate-peer-sa-proposal-not-match-phase-2)

---

**FortiGate advanced troubleshoot + network diagnostics için uzman destek?** [Teknik görüşme.](/#contact)
