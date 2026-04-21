---
slug: mikrotik-routeros-ilk-kurulum-factory-production
title: "MikroTik RouterOS İlk Kurulum — Factory Reset'ten Production'a"
type: cluster
pillar: 4
url: "/blog/mikrotik-routeros-ilk-kurulum-factory-production"
hedef_anahtar_kelime: "mikrotik ilk kurulum"
meta_description: "MikroTik RouterOS ilk kurulum — factory reset, Winbox bağlantı, WAN/LAN interface, NAT masquerade, firewall default filter, DHCP, basic hardening."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "MikroTik Setup"
product_family: "Network & Altyapı"
---

## "MikroTik CCR2004 Geldi, Nereden Başlamalı?"

Şube ofisi için yeni MikroTik. Türkiye'de bu marka en yaygın KOBİ router — Fortinet kadar değil ama fiyat/performans açısından muazzam. Winbox ile yönetim + CLI gücü.

Bu yazı 0'dan production-ready kuruluma kadar tüm adımlar.

## Hızlı Çözüm (TL;DR)

1. Ethernet cable → ether1 (veya LAN port)
2. Winbox indir + MAC mode ile bağlan
3. Reset configuration (clean slate)
4. WAN (ether1) — DHCP veya static
5. LAN (bridge) — 10.10.10.1/24
6. NAT masquerade out-interface
7. Firewall filter default rules
8. DHCP server on bridge
9. Admin şifresi + hardening
10. Backup

---

## Ön Hazırlık

### Winbox İndir

MikroTik resmi: `https://mikrotik.com/download` → Winbox.

Winbox = MikroTik'in yönetim aracı. GUI üstünde CLI terminal'i de var. Windows only — Mac/Linux için Winbox-4 (Java based) veya browser WebFig.

### İlk Bağlantı

- Laptop'tan ethernet → MikroTik **ether1** veya **ether2** (modele göre default LAN port)
- Laptop IP: DHCP veya statik 192.168.88.100

MikroTik default LAN: 192.168.88.0/24, gateway 192.168.88.1.

### Winbox Connect

> 📸 **Ekran 1** — Winbox login  
> Open Winbox → "Neighbors" tab  
> Discovered devices liste:  
>   - MAC: aa:bb:cc:dd:ee:ff  
>   - IP: 192.168.88.1 (veya boş)  
>   - Identity: MikroTik  
>   - Version: 7.14.3  
>   
> **MAC address'e tıkla** (IP henüz yoksa MAC mode ile bağlan)  
> Username: admin  
> Password: (boş veya "letmein" — son firmware'de password empty)  
> Connect

**MAC mode** = Ethernet broadcast ile Layer 2 bağlantı — IP gerekmez. İlk kurulumda kritik.

## 10:00 — Factory Reset (Clean Slate)

Used MikroTik veya default config karmaşık — temiz başla:

```
/system reset-configuration no-defaults=yes
```

Confirm: yes.

MikroTik reboot (30 saniye). Sonra tamamen boş. Default LAN yok, IP yok.

Winbox MAC mode ile tekrar bağlan.

**Alternative**: "no-defaults=no" → basic default config kalır (bazı firmware'de bridge + NAT otomatik).

Yeni başlayan için **no-defaults=yes** (tam kontrol, clean config).

## 10:05 — Identity + Time

```
/system identity set name=RTR-IST-HQ
/system clock set time-zone-name=Europe/Istanbul

# NTP client
/system ntp client set enabled=yes servers=time.google.com,pool.ntp.org
```

## 10:10 — Interface Planning

CCR2004 10 ether port:
- **ether1**: WAN (ISP bağlantı)
- **ether2-ether10**: LAN (bridge grubuna eklenecek)
- SFP/SFP+ ports: opsiyonel (10G LAN veya WAN)

Comment:
```
/interface ethernet set ether1 comment="WAN - TurkTelekom Fiber"
/interface ethernet set ether2 comment="LAN - HQ"
/interface ethernet set ether3 comment="LAN - HQ"
...
```

## 10:15 — WAN — ether1

### Static IP (ISP verdi)
```
/ip address add address=203.0.113.10/24 interface=ether1
/ip route add dst-address=0.0.0.0/0 gateway=203.0.113.1

/ip dns set servers=8.8.8.8,1.1.1.1 allow-remote-requests=no
```

### DHCP (ISP DHCP)
```
/ip dhcp-client add interface=ether1 disabled=no use-peer-dns=yes
```

5-10 saniye içinde public IP alır.

Test:
```
/ping 8.8.8.8
```

Reply varsa WAN çalışıyor.

## 10:25 — LAN Bridge

```
/interface bridge add name=bridge-lan comment="HQ LAN bridge"

# Port'ları bridge'e ekle
/interface bridge port add bridge=bridge-lan interface=ether2
/interface bridge port add bridge=bridge-lan interface=ether3
/interface bridge port add bridge=bridge-lan interface=ether4
/interface bridge port add bridge=bridge-lan interface=ether5
/interface bridge port add bridge=bridge-lan interface=ether6
/interface bridge port add bridge=bridge-lan interface=ether7
/interface bridge port add bridge=bridge-lan interface=ether8
/interface bridge port add bridge=bridge-lan interface=ether9
/interface bridge port add bridge=bridge-lan interface=ether10

# Bridge IP
/ip address add address=10.10.10.1/24 interface=bridge-lan comment="LAN gateway"
```

## 10:35 — DHCP Server

LAN'daki cihazlar otomatik IP alsın:

```
/ip pool add name=dhcp-pool-lan ranges=10.10.10.100-10.10.10.200

/ip dhcp-server add name=dhcp-lan interface=bridge-lan address-pool=dhcp-pool-lan lease-time=1d disabled=no

/ip dhcp-server network add address=10.10.10.0/24 gateway=10.10.10.1 dns-server=10.10.10.1 comment="HQ DHCP scope"
```

## 10:45 — NAT Masquerade

LAN internet'e çıkabilsin:

```
/ip firewall nat add chain=srcnat action=masquerade out-interface=ether1 comment="NAT for LAN"
```

Test: LAN'daki laptop → `ping google.com` → çalışır.

## 10:55 — Firewall Filter (Kritik)

Default MikroTik'te **hiç firewall rule yok**. Yani her yerden her yere açık — internet'e WAN interface'i exposed. Kesinlikle firewall gerekir:

```
# Established + Related (mevcut bağlantıları allow)
/ip firewall filter add chain=input action=accept connection-state=established,related comment="Accept established"

# ICMP (ping) kabul
/ip firewall filter add chain=input action=accept protocol=icmp comment="Accept ICMP"

# LAN'dan router'a yönetim
/ip firewall filter add chain=input action=accept in-interface=bridge-lan comment="Allow LAN management"

# Drop invalid
/ip firewall filter add chain=input action=drop connection-state=invalid comment="Drop invalid"

# Drop all other input (WAN'dan gelen her şey)
/ip firewall filter add chain=input action=drop comment="Drop everything else"

# Forward chain (LAN ↔ WAN)
/ip firewall filter add chain=forward action=accept connection-state=established,related comment="Accept forward established"
/ip firewall filter add chain=forward action=accept in-interface=bridge-lan out-interface=ether1 comment="LAN to WAN"
/ip firewall filter add chain=forward action=drop connection-state=invalid comment="Drop invalid"
/ip firewall filter add chain=forward action=drop comment="Drop all other forward"
```

**Sonuç**:
- LAN → internet: ✓
- Internet → LAN: ✗ (port açmayanlar girmez)
- Internet → router: ✗ (sadece ICMP)

## 11:10 — Admin Hardening

### Şifre

```
/user set 0 password="GucluSifreCookPaketV2024"
```

### "admin" username değiştir

```
/user set 0 name="firmadmin"
```

Brute force hedef olan "admin" ismini değiştir.

### Service disable

```
/ip service disable telnet,ftp,www,api,api-ssl
/ip service set ssh port=2200 address=10.10.10.0/24
/ip service set winbox address=10.10.10.0/24
```

SSH custom port (2200), winbox sadece LAN'dan. WAN'dan yönetim kapalı.

## 11:20 — Backup

```
/system backup save name=HQ-Production-$(date +%Y%m%d)
```

Backup file `/file` altında. Winbox **Files** menüsünden indir.

Bitwarden'a koy. Future recovery için kritik.

## 11:25 — Identity + Logging

```
/system logging action add name=syslog target=remote remote=10.10.20.100
/system logging add topics=info,warning,error action=syslog
```

Syslog server varsa log export.

## Yaygın Hatalar

### Winbox "Could not connect"

- Cable doğru port mu (ether2)?
- Firewall block? Factory reset sonrası rule yok
- MAC mode try (IP henüz yok)

### Internet Çalışmıyor

- `/ip route print` → default route var mı?
- `/ip address print` → WAN IP var mı?
- `/ping 8.8.8.8` → WAN erişim?
- `/ping google.com` → DNS çalışıyor?

### LAN Client IP Almıyor

- DHCP server aktif mi?
- DHCP network config doğru subnet
- Bridge up mu? `/interface bridge print`

### Connection Timed Out WAN'dan

Firewall filter tek direction mu? Forward chain'de established+related allow var mı?

## Production Checklist

- [ ] Admin şifre + username değişti
- [ ] WAN static/DHCP config doğru
- [ ] LAN bridge + DHCP aktif
- [ ] NAT masquerade
- [ ] Firewall filter input + forward + drop
- [ ] SSH custom port + LAN-only
- [ ] Winbox LAN-only
- [ ] Gereksiz services disable (telnet, ftp, api)
- [ ] NTP client aktif
- [ ] Backup alındı + Bitwarden
- [ ] Syslog export

## İlgili Rehberler

- [MikroTik Winbox "Could not connect"](/blog/mikrotik-winbox-baglanmiyor-mac-mode)
- [MikroTik Site-to-Site IPsec VPN](/blog/mikrotik-site-to-site-ipsec-vpn)
- [MikroTik QoS Queue Tree](/blog/mikrotik-qos-queue-tree-bandwidth)

---

**MikroTik enterprise deployment için uzman destek?** Kozyatağı Bilişim network altyapı paketimiz. [Teknik görüşme.](/#contact)
