---
slug: fortigate-traffic-shaping-qos-bandwidth
title: "FortiGate Traffic Shaping / QoS — Zoom Toplantısı Yavaş Değil"
type: cluster
pillar: 4
url: "/blog/fortigate-traffic-shaping-qos-bandwidth"
hedef_anahtar_kelime: "fortigate traffic shaping qos"
meta_description: "FortiGate traffic shaper ile QoS — Zoom, Teams toplantıya öncelik, backup trafiği sınırla, YouTube kısıtla. Shared ve per-IP shapers."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Traffic Shaping"
product_family: "Fortinet & Firewall"
---

## "Zoom Call'da Sürekli Donuyor — Sebep: Backup Gecekondusu"

IT müdürü fark etti: Gündüz backup job 10 Gbps link'in 8 Gbps'ini yiyor. Zoom meeting'ler donuyor, kullanıcı şikayet ediyor.

Çözüm: **Traffic Shaping / QoS** — kritik trafiğe öncelik, backup'ı sınırla.

## Hızlı Çözüm (TL;DR)

1. Shared Shaper oluştur: "Priority-VoIP-Video" (max 200 Mbps, priority high)
2. Shared Shaper oluştur: "Limit-Backup" (max 500 Mbps)
3. Firewall policy'de trafik tipine shaper at
4. Apply → Zoom/Teams öncelikli

---

## 10:00 — Shaper Types

FortiGate 3 shaper tipi:

### Shared Shaper
Birden fazla policy/trafik birlikte paylaşır. Örnek: "Backup trafiği toplam 500 Mbps geçemesin."

### Per-IP Shaper
Her IP için ayrı limit. Örnek: "Her kullanıcı max 10 Mbps download."

### Policy Shaper
Spesifik policy'ye bound.

## 10:05 — Backup Trafiği Sınırlama

Policy & Objects > Traffic Shapers > Shared Shaper > + Create New:

> 📸 **Ekran 1** — New Shared Shaper  
> Name: "Limit-Backup-500M"  
> Bandwidth priority: Low  
> Max bandwidth: 500 Mbps  
> Guaranteed bandwidth: 0 Mbps  
> Per policy: OFF (shared across policies)

## 10:10 — Kritik Trafik Guarantee

Zoom/Teams için **guarantee + priority high**:

> 📸 **Ekran 2** — Priority Shaper  
> Name: "Priority-Video-Call"  
> Bandwidth priority: **High**  
> Max bandwidth: 0 (unlimited)  
> **Guaranteed bandwidth: 200 Mbps** (her durumda bu kadar alsın)  
> DSCP: 46 (EF — Expedited Forwarding)  

## 10:15 — Policy'ye Bağlama

Policy & Objects > Firewall Policy:

### Backup Policy (Veeam → NAS)
```
Source: Veeam-Server
Destination: NAS
Service: SMB
Traffic Shaper: **Limit-Backup-500M**   ← burada
Reverse Shaper: Limit-Backup-500M
```

Backup max 500 Mbps. 8 Gbps ediyordu, artık kontrollü.

### Teams / Zoom Policy
Application Control ile "video call" kategorisi tanımla:
```
Source: Internal
Destination: All (Internet)
Application: Microsoft.Teams + Zoom.Meetings
Traffic Shaper: **Priority-Video-Call**
```

Zoom trafiği otomatik yüksek öncelik, garanti 200 Mbps.

## 10:25 — YouTube Kısıtlama

Mesai saatlerinde sosyal medya bant genişliği yeme:
```
Policy: Internal → Internet
Application: YouTube + Facebook + Instagram
Traffic Shaper: Per-IP Shaper "YouTube-Limit-2M"
```

Per-IP Shaper create:
```
Name: "YouTube-Limit-2M"
Max Bandwidth: 2 Mbps
Max Concurrent Connections: 10
```

Her kullanıcı YouTube için max 2 Mbps. 4K stream imkansız, 720p çalışır.

Mesai dışı (17:00-09:00): shaper'ı disable et (schedule ile) veya farklı policy.

## 10:35 — VoIP için DSCP Marking

Zoom DSCP-EF (46) işaretli paketler gönderir. FortiGate bu marking'i tanıyıp öncelikli işler:

```
config firewall shaper traffic-shaper
    edit "Priority-Video-Call"
        set priority high
        set guaranteed-bandwidth 200
    next
end

config firewall policy
    edit 5
        set diffserv-forward enable
        set diffserv-reverse enable
        set diffservcode-forward 101110
        set diffservcode-reverse 101110
    next
end
```

DSCP 101110 = 46 = EF. FortiGate bu paketleri yukarıdaki shaper'a yönlendirir.

## 11:00 — Real-Time Monitoring

```
FortiView > Traffic > Bandwidth
```

> 📸 **Ekran 3** — FortiView Bandwidth  
> Real-time graph:  
> - Total WAN: 7.5 Gbps  
> - Veeam Backup: 495 Mbps (limit)  
> - Zoom Meetings: 180 Mbps (guarantee 200'den az)  
> - YouTube: 18 Mbps (9 user × 2 Mbps)  
> - Other: 6.8 Gbps  

Backup kontrol altında. Zoom rahat.

## Yaygın Hatalar

### Shaper Apply Ama Etki Yok

- Policy'de shaper assign doğru interface direction'da mı? (Forward = client → internet, Reverse = internet → client)
- Application Control active değil — Zoom trafiği "generic HTTPS" olarak görünüyor
- DSCP marking FortiGate'e ulaşmıyor — ISP stripped olabilir

### Backup Gündüz Hâlâ Yavaşlatıyor

Shaper 500 Mbps çok yüksek. 100 Mbps gündüz, 5 Gbps gece:
```
Schedule: "Business Hours" 09-17 Mon-Fri
Policy: Backup + Schedule Business Hours + Shaper 100 Mbps
Policy: Backup + Schedule Off-Hours + Shaper 5000 Mbps
```

### "Some traffic still exceeds shaper"

Shaper hard limit. Exceeded packets **drop edilir**. Uygulama retry yapar. TCP'de normal.

## İlgili Rehberler

- [FortiGate SD-WAN (ilgili konu)](/blog/fortigate-sd-wan-coklu-isp-load-balance)
- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)

---

**Enterprise QoS + WAN optimization için uzman destek?** [Teknik görüşme.](/#contact)
