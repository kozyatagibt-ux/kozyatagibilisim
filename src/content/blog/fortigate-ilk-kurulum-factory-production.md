---
slug: fortigate-ilk-kurulum-factory-production
title: "FortiGate İlk Kurulum — Fabrika Ayarından Production'a"
type: cluster
pillar: 4
url: "/blog/fortigate-ilk-kurulum-factory-production"
hedef_anahtar_kelime: "fortigate ilk kurulum"
meta_description: "FortiGate sıfırdan kurulum — factory reset, initial config, interface setup, firewall policy, internet access, management access."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Initial Setup"
product_family: "Fortinet & Firewall"
---

## "Yeni FortiGate Geldi, Nereden Başlamalı?"

Kutudan yeni 100F çıktı. İlk kurulum adımları — factory'den production'a.

## Hızlı Çözüm (TL;DR)

1. İlk erişim: `https://192.168.1.99` (default), username: admin, no password
2. Admin şifre değiştir
3. WAN interface IP (statik veya DHCP)
4. LAN interface IP
5. Static route default gateway
6. Firewall policy internal → wan
7. NAT aktif
8. Admin access restrict (trusted hosts)
9. Firmware güncel
10. Backup

---

## 10:00 — Fiziksel Erişim

### Laptop'a

- Ethernet cable: laptop port → FortiGate **internal** veya **port1**
- Laptop IP: 192.168.1.100 (static)
- Browser: `https://192.168.1.99`

Uyarı "sertifika invalid" (factory self-signed) → proceed.

### Default Credentials

- Username: `admin`
- Password: (boş)

İlk login forced password change.

## 10:05 — Initial Config Wizard

Bazı modellerde wizard açılır:

> 📸 **Ekran 1** — Initial Config Wizard  
> Admin password: [güçlü]  
> Confirm: [aynı]  
>   
> Internet Connection:  
>   Interface: wan1  
>   Connection: DHCP / Static  
>   - Static: IP, Mask, Gateway, DNS  
>   
> LAN:  
>   Interface: internal (or port2-4)  
>   IP: 10.10.10.1/24  
>   DHCP Server: enable (10.10.10.100-10.10.10.200)  
>   
> DNS:  
>   Primary: 8.8.8.8  
>   Secondary: 1.1.1.1  
>   
> NTP:  
>   Primary: tr.pool.ntp.org

Apply. 30 saniye restart.

## 10:15 — Interface Yapılandırma (Manuel)

Wizard yoksa manuel:

Network > Interfaces > **wan1** edit:

> 📸 **Ekran 2** — Interface Edit  
> Role: WAN  
> Address mode: **Manual** (or DHCP)  
> IP/Netmask: 203.0.113.10/24  
> Default gateway: 203.0.113.1  
> DNS: 8.8.8.8, 1.1.1.1  
>   
> Administrative Access:  
>   ☐ HTTPS (disable — güvenlik, admin external'dan erişmesin)  
>   ☐ PING (disable)  
>   ☐ SSH (disable)  
> (Sadece LAN'dan admin erişim)

**internal** edit:
```
Role: LAN
IP: 10.10.10.1/24
DHCP Server: enable
Admin Access: HTTPS + SSH + PING (iç yönetim)
```

## 10:25 — Static Route (Default Gateway)

Network > Static Routes > + Create:
```
Destination: 0.0.0.0/0
Gateway: 203.0.113.1
Interface: wan1
Distance: 10
```

## 10:30 — Firewall Policy (Internet Access)

Policy & Objects > Firewall Policy > + Create:

> 📸 **Ekran 3** — Basic Policy  
> Name: "LAN-to-Internet"  
> Incoming: internal  
> Outgoing: wan1  
> Source: all  
> Destination: all  
> Service: ALL  
> Action: Accept  
> **NAT: Enable** (use Destination Interface Address)  
> Log: All Sessions

Apply.

## 10:40 — Test

LAN'daki laptop'tan:
```
ping 8.8.8.8
nslookup google.com
curl https://google.com
```

Internet çalışıyor.

## 10:45 — Security Hardening

### Admin Trusted Hosts

```
config system admin
    edit admin
        set trusthost1 10.10.10.0/24      ← sadece LAN'dan admin erişim
        set trusthost2 10.20.0.0/16       ← VPN subnet
    next
end
```

Diğer tüm IP'lerden admin **reddedilir**.

### Default Admin Rename

```
config system admin
    rename admin to firmadmin
end
```

"admin" yerine custom isim — brute force hedefi azalır.

### Disable Unused Admin Access

```
config system interface
    edit wan1
        set allowaccess (boş — nothing)
    next
end
```

### Firmware Update

```
System > Fabric Management > Firmware:
Current: 7.2.4
Available: 7.2.8 (stable)
→ Upgrade
```

## 10:55 — Security Profiles (Başlangıç)

Security Profiles > Antivirus > default aktif.
Security Profiles > Web Filter > Corp-WebFilter-Standard.
Security Profiles > IPS > default.
SSL Inspection > certificate-inspection.

Policy'ye attach.

## 11:00 — Backup

```
System > Configuration > Backup
Encrypted: Yes, password: [güçlü]
Download: FGT100F-initial.conf
```

Bitwarden'a şifreyle yükle.

## 11:10 — Monitoring

- PRTG/Zabbix SNMP enable
- FortiAnalyzer log forwarding
- Email alert (critical events)

## Checklist

- [ ] Admin password güçlü + Bitwarden'da
- [ ] WAN + LAN IP config
- [ ] Default gateway + DNS
- [ ] Firewall policy internet access
- [ ] NAT aktif
- [ ] Trusted hosts admin restrict
- [ ] WAN admin access disabled
- [ ] Firmware current stable
- [ ] Antivirus + IPS + Web Filter
- [ ] SSL inspection (certificate min)
- [ ] Log forwarding
- [ ] Monitoring SNMP
- [ ] Encrypted config backup

Tam kurulum ~1 saat.

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)
- [SSL-VPN + MFA](/blog/fortigate-ssl-vpn-tunnel-forticlient-mfa-kurulum)

---

**FortiGate kurulum + kurumsal konfigürasyon için?** [Teknik görüşme.](/#contact)
