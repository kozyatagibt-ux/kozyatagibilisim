---
slug: fortigate-dhcp-server-ip-reservation
title: "FortiGate DHCP Server + IP Reservation — Yazıcı ve Sunucu Sabit IP"
type: cluster
pillar: 4
url: "/blog/fortigate-dhcp-server-ip-reservation"
hedef_anahtar_kelime: "fortigate dhcp server ip reservation"
meta_description: "FortiGate DHCP server kurulum + MAC bazlı IP reservation. Yazıcılara + sunuculara sabit IP atama, DHCP scope, DNS override."
kelime_sayisi: "~700"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "DHCP Setup"
product_family: "Fortinet & Firewall"
---

## "Yazıcılar DHCP'den IP Alıyor, Ama Değişirse Sorun"

Küçük ofis. Windows Server yok, DC yok. FortiGate DHCP yapıyor. Her yazıcı/scanner sabit IP gerek ama static IP yapmak istemiyorlar.

Çözüm: **DHCP Reservation** (MAC → IP eşleme).

## Hızlı Çözüm (TL;DR)

1. Network > Interfaces > internal > DHCP Server enable
2. IP range: 10.10.10.100-10.10.10.200
3. Additional reservations:
   - Printer-Floor3: MAC aa:bb:cc:dd:ee:ff → 10.10.10.50
   - Scanner-Reception: MAC ... → 10.10.10.51

---

## 10:00 — DHCP Server Enable

Network > Interfaces > internal edit:

> 📸 **Ekran 1** — Interface DHCP  
> DHCP Server: ☑ Enable  
>   
> Address Range: 10.10.10.100 — 10.10.10.200  
> Netmask: 255.255.255.0  
> Default Gateway: 10.10.10.1 (FortiGate)  
> DNS Server: FortiGate itself (10.10.10.1)  
> Domain: corp.firma.com.tr  
> Lease Time: 7 days  
>   
> ☑ DHCP Options — custom (Option 43 Autoadopting UniFi için, etc.)

Save.

## 10:05 — IP Reservation

Network > Interfaces > internal > **Address Reservation**:

> 📸 **Ekran 2** — Reservation  
> + Add:  
>   Type: **MAC reservation**  
>   MAC: aa:bb:cc:dd:ee:ff (yazıcı MAC)  
>   IP: 10.10.10.50  
>   Description: "Printer-Floor3-Canon"  
>   
>   + Add:  
>   MAC: 11:22:33:44:55:66  
>   IP: 10.10.10.51  
>   Description: "Scanner-Reception"

Kaydet.

## Advanced — Outside DHCP Range Reservation

Dikkat: Reservation IP'si genelde **DHCP range dışında**. Böylece reserved IP'yi başka cihaz almaz.

```
DHCP range: 10.10.10.100-10.10.10.200
Reservations: 10.10.10.50, 51, 52 (range dışı, özel)
Static infrastructure: 10.10.10.1-10.10.10.49 (FortiGate + manuel)
```

## MAC Adresi Nereden Bulunur?

### Yazıcı / Scanner

Printer admin panel > Network > MAC address.

### Windows

```cmd
ipconfig /all
```

Physical Address field.

### Linux / Mac

```bash
ifconfig | grep ether
```

### Yakın Zamanda Bağlandıysa FortiGate'ten

Monitor > DHCP:
- Active leases listesi
- MAC + currently assigned IP
- Kopyala → reservation yap

## Multiple Subnets

VLAN başına ayrı DHCP:

```
internal (VLAN 10 - Users): 10.10.10.0/24
server (VLAN 20 - Servers): 10.10.20.0/24 — DHCP disabled, manual static
voip (VLAN 30 - Phones): 10.10.30.0/24 — DHCP with specific options
```

VoIP için Option 66 (TFTP server):
```
Custom DHCP options:
Option 66 (TFTP): 10.10.30.10  ← IP Phone provisioning server
```

## Monitoring

Monitor > DHCP:
> 📸 **Ekran 3** — DHCP Monitor  
> Active Leases: 45 / 100 (range %45)  
> Table: IP, MAC, Hostname, Lease expiry

Her reservation "Reserved" olarak işaretli.

## Yaygın Hatalar

### Reservation Çalışmıyor

- MAC format yanlış (aa-bb-cc formatı)? aa:bb:cc olmalı
- Cihaz DHCP'den değil static IP'den bağlı mı? 
- DHCP range içinde reserved IP — aynı IP conflict

### Lease Expire Kısa

Default 7 gün iyi. Laptop bilgisayarlar için:
```
Lease: 1 day
```

Ofise girip çıkmalarda IP refresh.

### IP Exhaustion

```
Range: 100-200 = 100 IP
Cihaz: 150+ (exhaust)
```

Range genişlet veya yeni subnet.

## İlgili Rehberler

- [FortiGate ilk kurulum](/blog/fortigate-ilk-kurulum-factory-production)
- [Site-to-Site VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)

---

**Network services FortiGate yönetimi için?** [Teknik görüşme.](/#contact)
