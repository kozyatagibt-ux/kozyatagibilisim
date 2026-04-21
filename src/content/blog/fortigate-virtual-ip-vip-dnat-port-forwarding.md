---
slug: fortigate-virtual-ip-vip-dnat-port-forwarding
title: "FortiGate Virtual IP (VIP) / DNAT — Web Server Dışarı Açma"
type: cluster
pillar: 4
url: "/blog/fortigate-virtual-ip-vip-dnat-port-forwarding"
hedef_anahtar_kelime: "fortigate virtual ip vip dnat"
meta_description: "FortiGate Virtual IP (VIP) ile DNAT — public IP'den iç sunucuya port forwarding. Web server, RDP (careful!), custom port mapping."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "VIP DNAT"
product_family: "Fortinet & Firewall"
---

## "E-Ticaret Sitesini Dışarıdan Erişilebilir Yap"

DevOps ekibi yeni e-ticaret server kurdu:
- İç IP: 10.10.20.50
- Port 443 HTTPS

İnternet kullanıcısı `https://shop.firma.com.tr` yazdığında FortiGate bu bağlantıyı iç server'a yönlendirmeli.

Çözüm: **Virtual IP (VIP) + Firewall Policy**.

## Hızlı Çözüm (TL;DR)

```
1. VIP oluştur: public_IP:443 → internal 10.10.20.50:443
2. Firewall Policy: wan1 → internal, Destination = VIP, Service HTTPS, Action Accept
```

DNS public IP'yi çözer, FortiGate paketi iç server'a yönlendirir.

---

## 10:00 — VIP Create

Policy & Objects > Virtual IPs > + Create New:

> 📸 **Ekran 1** — New VIP  
> VIP Type: **IPv4**  
> Name: "VIP-WebShop-443"  
> Comments: "HTTPS external access to shop server"  
>   
> Interface: wan1  
>   
> Type: **Static NAT**  
>   (alternative: Load Balance (multiple backend), FQDN, vs.)  
>   
> External IP Address/Range:  
>   **203.0.113.10** (firmanın public IP'si)  
> Mapped IPv4 Address/Range:  
>   **10.10.20.50** (iç server)  
>   
> Port Forwarding: **Enable**  
>   Protocol: TCP  
>   External Service Port: **443**  
>   Map to IPv4 Port: **443**

Save.

### Complex VIP — Port Translation

Public 8080'e gelen trafiği iç 80'e yönlendir:
```
External Port: 8080
Map to Port: 80
```

## 10:10 — Firewall Policy

VIP sadece NAT mapping. **Trafik geçirmek için policy gerekir**.

Policy & Objects > Firewall Policy > + Create New:

> 📸 **Ekran 2** — Firewall Policy  
> Name: "WebShop-External-Access"  
>   
> Incoming Interface: wan1  
> Outgoing Interface: internal  
>   
> Source: all  
> Destination: **VIP-WebShop-443**  ← VIP object  
> Service: HTTPS (veya TCP_443 custom)  
>   
> Action: Accept  
>   
> **NAT**: OFF (VIP zaten NAT yapıyor; policy NAT bozar)  
> Security Profiles:  
>   Web Filter: default (outbound için değil ama ayar)  
>   IPS: default (web app attack koruması)  
>   AntiVirus: default

Save.

## 10:20 — DNS Yapılandırma

Public DNS'te A record:
```
shop.firma.com.tr → 203.0.113.10
```

Kullanıcı `https://shop.firma.com.tr` → DNS → 203.0.113.10 → FortiGate wan1 → VIP DNAT → 10.10.20.50:443 → web server response.

## 10:25 — Test

Dışarıdan:
```
curl -v https://shop.firma.com.tr
```

Response 200 OK — web server'dan geldi. Success.

## Multiple VIP — Same Public IP

Tek public IP'den birden fazla service:

### VIP1: HTTP
```
External: 203.0.113.10:80 → Internal: 10.10.20.50:80
```

### VIP2: HTTPS
```
External: 203.0.113.10:443 → Internal: 10.10.20.50:443
```

### VIP3: SMTP (iç mail server)
```
External: 203.0.113.10:25 → Internal: 10.10.20.10:25
```

Her port için ayrı VIP. FortiGate port bazlı route.

## VIP Groups (Load Balance)

2 arka-uç server (redundant):

```
Type: Load Balance
External: 203.0.113.10:443
Real Server Pool:
  - 10.10.20.50:443 (weight 1)
  - 10.10.20.51:443 (weight 1)
Health Check: TCP 443 every 5s
Load Balance Algorithm: Round-Robin
```

Trafik iki server arası paylaştırılır. Biri down olursa otomatik diğerine.

## Security Considerations

### ⚠️ RDP External Açma — ASLA

Yaygın hata:
```
VIP: External 3389 → Internal RDP server
```

Brute force attack vectör #1. [Event 4625 rehberi](/blog/event-id-4625-brute-force-tespit-onlem). **RDP'yi** internet'e **açma**. VPN + MFA arkasında tut.

### IPS Profile Aktif

External accessible web server → IPS profile zorunlu:
- OWASP Top 10 coverage
- SQL injection detection
- XSS filtering

### WAF (Web Application Firewall)

Basic IPS yetmez. Yüksek trafik / kritik e-commerce için:
- FortiWeb (dedicated WAF)
- Cloudflare
- Azure Front Door + WAF

IPS OSI layer 4 + basic L7. WAF full L7 app-aware.

### Rate Limiting

DDoS protection:
```
config firewall DoS-policy
    edit 1
        set interface "wan1"
        set srcaddr "all"
        set dstaddr "VIP-WebShop-443"
        set service "HTTPS"
        config anomaly
            edit "tcp_syn_flood"
                set status enable
                set threshold 5000
                set action block
            next
        end
    next
end
```

SYN flood threshold > 5000/sec → IP block.

## Yaygın Hatalar

### VIP Policy Yok — Hâlâ Çalışıyor?

Evet, bazı kaynaklarda "sadece VIP yeter" düşünülür. **Hayır** — policy **zorunlu**. Trafik policy olmadan drop.

### Return Traffic Drop

Client A public IP'den 443 erişti, FortiGate DNAT yaptı, server cevap verdi. Dönüş:
- Server → FortiGate (10.10.20.50 → 203.0.113.0 range)
- FortiGate source NAT geri yapar (default NAT + NAT)

Eğer dönüş kaybolursa — **policy asymmetric**. Source NAT toggle:
```
Policy > NAT: Enable (static or dynamic)
```

### SSL Certificate Mismatch

Client `shop.firma.com.tr` bekliyor. Server sertifikası `shop.internal` için. SSL handshake fail.

Server sertifikası doğru FQDN ile olmalı. Let's Encrypt otomatik.

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [Web Filter + App Control](/blog/fortigate-web-filter-application-control)

---

**Web server publishing + WAF + DDoS protection için uzman destek?** [Teknik görüşme.](/#contact)
