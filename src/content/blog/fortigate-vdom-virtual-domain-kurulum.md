---
slug: fortigate-vdom-virtual-domain-kurulum
title: "FortiGate VDOM (Virtual Domain) Kurulum — Tek Cihazda 2 Müşteri"
type: cluster
pillar: 4
url: "/blog/fortigate-vdom-virtual-domain-kurulum"
hedef_anahtar_kelime: "fortigate vdom virtual domain"
meta_description: "FortiGate VDOM kurulum — tek cihazda izole 2+ firewall domain (MSP senaryosu). Admin assignment, inter-VDOM link, traffic shaping."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "VDOM Setup"
product_family: "Fortinet & Firewall"
---

## "Bir FortiGate İki Şirket Hizmetine"

MSP olarak 2 küçük müşterimiz aynı co-location'da. Her birine ayrı FortiGate pahalı — tek FortiGate 200F içinde **VDOM (Virtual Domain)** ile iki izole firewall yaratırız.

## VDOM Özellikleri

- Her VDOM ayrı policy, route, interface, admin
- VDOM'lar birbirinden tamamen izole
- Resource paylaşımı yok (CPU/RAM paylaşılır ama policy level izole)
- Tek license, tek cihaz — maliyet

## Hızlı Çözüm (TL;DR)

```
CLI:
config system global
    set vdom-mode multi-vdom
end

# Confirm reboot required
```

Sonra GUI'den VDOM oluştur, interface ata, admin oluştur.

---

## 10:00 — VDOM Mode Enable

CLI:
```
config system global
    set vdom-mode multi-vdom
end
```

Confirm. FortiGate reboot **gerekmez** (2020+ versiyonlarda anlık).

GUI Navigator'da "Global" + "VDOM" menüsü görünür.

## 10:05 — VDOM Oluşturma

Global > System > VDOM:

> 📸 **Ekran 1** — VDOMs  
> Mevcut: **root** (default)  
> "+ Create New":  
>   Name: "VDOM-CustomerA"  
>   NGFW mode: Profile-based  
>   Inspection mode: Flow-based  
>   
>   Next VDOM: "VDOM-CustomerB"

## 10:10 — Interface Assignment

Her VDOM'a interface:

```
Global > Network > Interfaces
```

wan1 interface'ini Customer A'ya ata:
- Virtual domain: VDOM-CustomerA

wan2 interface'ini Customer B'ye:
- Virtual domain: VDOM-CustomerB

İç interfaceler:
- port3 → VDOM-CustomerA (LAN A)
- port4 → VDOM-CustomerB (LAN B)

## 10:20 — Admin Accounts per VDOM

Her müşteri kendi VDOM'una admin:

```
Global > System > Administrators > + Create New:
Name: admin_customerA
Password: ...
Profile: prof_admin (standard)
**Virtual domains: VDOM-CustomerA** (sadece bu VDOM'u yönetir)
```

Customer A admin login yapınca sadece kendi VDOM config'ini görür.

## 10:30 — Her VDOM İçinde Konfigürasyon

VDOM'a geç:
```
VDOM dropdown (üst sağ) > VDOM-CustomerA
```

Artık firewall policy, route, VPN — VDOM-specific.

Her VDOM **ayrı firewall** gibi:
- Policy'ler izole
- Route tabloları ayrı
- NAT ayrı
- Logs ayrı

## Inter-VDOM Routing

Bazen VDOM'lar iletişim kurması gerek (shared service, management):

```
config global
    config system interface
        edit "vdomlink-a-b"
            set type vdom-link
            set vdom "VDOM-CustomerA"
        next
    end
```

Ya da GUI:
Network > Interfaces > + Create New > **VDOM Link**:
- VDOM1: CustomerA
- VDOM2: CustomerB (karşı taraf)
- IP assign her iki tarafa

Sonra firewall policy her iki VDOM'da izin vermeli.

## Resource Limits per VDOM

Bir VDOM diğerini CPU yerlerse sorun. Limit:

```
Global > System > VDOM > VDOM-CustomerA:
Resources:
- Max sessions: 100,000
- Max policies: 500
- Max users: 50
- Max IPsec tunnels: 10
```

Fair share.

## License Considerations

FortiGate modelleri VDOM **count limit**:
- 60F: 10 VDOM
- 100F: 10 VDOM
- 200F: 10 VDOM
- 400F+: 10 VDOM
- Extra license ile 500'e kadar

MSP büyük müşteri portföyü için yüksek model + license upgrade.

## Yaygın Hatalar

### "Command fail, fgt is in vdom mode"

Single VDOM komut yapıyorsun ama multi-VDOM mode. `config global` prefix ekle.

### VDOM Arası Trafik Gitmiyor

- VDOM link var mı?
- Firewall policy her iki VDOM'da izin veriyor mu?
- Route doğru mu?

### Customer A Admin Başka VDOM Görüyor

Admin profile'de virtual-domain assignment yanlış. Tek VDOM seçmeli.

## İlgili Rehberler

- [FortiGate CPU yüksek](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)

---

**MSP multi-tenant FortiGate deployment için uzman destek?** [Teknik görüşme.](/#contact)
