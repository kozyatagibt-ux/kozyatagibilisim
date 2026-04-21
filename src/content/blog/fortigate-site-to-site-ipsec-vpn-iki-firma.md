---
slug: fortigate-site-to-site-ipsec-vpn-iki-firma
title: "FortiGate Site-to-Site IPsec VPN — İstanbul ve Ankara Ofis Arasında"
type: cluster
pillar: 4
url: "/blog/fortigate-site-to-site-ipsec-vpn-iki-firma"
hedef_anahtar_kelime: "fortigate site to site ipsec vpn"
meta_description: "İki FortiGate arasında Site-to-Site IPsec VPN tünel kurulumu — İstanbul-Ankara ofis senaryosunda tam yapılandırma, parametreler ve troubleshoot."
kelime_sayisi: "~1600"
pillar_linki: "/hizmetler/network-altyapi"
troubleshoot: true
error_code: "IPsec Site-to-Site"
product_family: "Fortinet & Firewall"
---

## "Ankara Şubemizi Açtık, Network'ler Birbirini Görmeli"

Bir tasarım firmasının İstanbul ofisindeki BT sorumlusu Deniz, CFO'dan talep aldı:

> "Ankara'da yeni bir şube açtık. 8 kişilik küçük ekip. İstanbul'daki dosya sunucusu ve Logo ERP'ye Ankara'dan direkt erişim istiyorlar. VPN client tek tek kurmak yerine **ofise gelen herkesin otomatik erişmesini** istiyoruz. İki FortiGate var — İstanbul 100F, Ankara 40F. Birbirine bağla."

Deniz bu talebi "site-to-site VPN" ile çözdü — 45 dakikada. İki ofis arası **şifreli tünel**, kullanıcı müdahalesi olmadan otomatik.

## Hızlı Çözüm (TL;DR) — Her İki FortiGate'te

**İstanbul FortiGate 100F** (master tarafı):
1. VPN > IPsec Wizard > Site-to-Site > Custom
2. Remote Gateway: Ankara FortiGate public IP
3. Pre-shared key: `[güçlü rastgele 32 karakter]`
4. Phase 1: IKE v2, AES256-SHA256, DH Group 14
5. Phase 2: aynı proposals, local subnet `10.10.0.0/16`, remote subnet `10.20.0.0/16`
6. Firewall policy: `wan1 → ipsec_tunnel` ve `ipsec_tunnel → internal`
7. Static route: `10.20.0.0/16` → ipsec_tunnel interface

**Ankara FortiGate 40F** (slave tarafı):
- Aynı parametreler ters yönlü: local 10.20.0.0/16, remote 10.10.0.0/16

Tunnel up → ping test → production'a hazır.

---

## Ön Hazırlık — Network Planı

Deniz önce iki ofisin **IP plan uyumsuzluğunu** kontrol etti. Eğer iki şubede aynı subnet (örn. her ikisi 192.168.1.0/24) varsa VPN çalışmaz — overlap. Çözüm: biri değişmek zorunda.

Şanslıydı:
- **İstanbul**: 10.10.0.0/16 (LAN: 10.10.10.0/24, Sunucu: 10.10.20.0/24)
- **Ankara**: 10.20.0.0/16 (LAN: 10.20.10.0/24)

Çakışma yok, devam.

## Ön Hazırlık — Parametre Tablosu

Kurulumdan önce **her iki tarafta aynı olması gereken** parametreleri yazıya döktü:

| Parametre | Değer |
|---|---|
| IKE Version | IKEv2 (daha güvenli, modern) |
| Phase 1 Encryption | AES256 |
| Phase 1 Authentication | SHA256 |
| Phase 1 DH Group | 14 (2048-bit) |
| Phase 1 Key Lifetime | 28800 saniye (8 saat) |
| Phase 2 Encryption | AES256 |
| Phase 2 Authentication | SHA256 |
| Phase 2 Key Lifetime | 3600 saniye (1 saat) |
| PFS (Perfect Forward Secrecy) | Enable, DH Group 14 |
| Pre-shared Key | [32 karakter rastgele] |

## 10:00 — İstanbul FortiGate Yapılandırma

### Adım 1: FortiGate'e Login

Deniz `https://10.10.10.1` ile İstanbul FortiGate'e bağlandı:

> 📸 **Ekran 1** — FortiGate login ekranı  
> Tarayıcıda: FortiGate 100F login sayfası  
> Input: Username, Password  
> Logo: Fortinet kırmızı amblemi  
> Altında firmware versiyonu görünür

### Adım 2: VPN Wizard

Sol menü:
```
VPN > IPsec Wizard
```

> 📸 **Ekran 2** — IPsec VPN Wizard  
> Sol menü: "VPN" expanded, "IPsec Wizard" seçili  
> Sağ panel: Wizard başlığı  
> Template seçimi:  
> ○ Remote Access (kullanıcılar için)  
> ● **Site-to-Site**  
> ○ Hub and Spoke  
> Dialer  
> Authentication: Pre-shared Key

**Template**: **Custom** (ileride manuel düzenleme gerekirse daha esnek) yerine **Site-to-Site** seçebilirsin. Deniz **Custom** seçti.

### Adım 3: Phase 1 Yapılandırma

Phase 1 = iki FortiGate'in birbirini **ilk tanıması**. Şifreli kanal kurulur.

> 📸 **Ekran 3** — Phase 1 settings  
> Form alanları:  
> - **Name**: "S2S-Ankara" (anlamlı isim)  
> - **Interface**: wan1 (internet çıkışı olan)  
> - **Remote Gateway**: Static IP Address  
> - **IP Address**: [Ankara FortiGate public IP] — örneğin 203.0.113.50  
> - **Local Gateway**: Disable  
> - **Mode**: Main  
> - **Authentication Method**: Pre-shared Key  
> - **Pre-shared Key**: [32 karakter güçlü random]  
> - **IKE Version**: 2  
> - **Peer Options**: Accept any peer ID

**Pre-shared Key üretimi**:
```bash
# Linux/Mac/WSL
openssl rand -base64 32
# Çıktı örneği: 4Tl9HzQxmK2eOaGfRn8BbdYvXp6U5cLwAtrJeiWj73M=
```

Deniz bu key'i Bitwarden'da "S2S-Ankara-PSK" adıyla sakladı.

Ankara'dakine WhatsApp'tan şifreli mesaj (veya şifreli mail) ile iletti.

### Adım 4: Phase 1 Proposal (Encryption)

> 📸 **Ekran 4** — Phase 1 Proposal  
> "Phase 1 Proposal" bölümü açık  
> Encryption seçici: AES256, AES192, AES128, 3DES, DES...  
> Authentication: SHA256, SHA384, SHA512, SHA1, MD5...  
> Diffie-Hellman Groups: 14 (önerilen), 15, 16, 19, 20, 21, 5, 2, 1  
> **Deniz'in seçimi**:  
> - Encryption: AES256  
> - Authentication: SHA256  
> - DH Groups: **14** işaretli (diğerleri değil)

Key Lifetime: 28800 (default).

**NOT**: DH Group 1, 2, 5 eski — kullanmayın. DH Group 14 (2048-bit) şu an standart. 19, 20, 21 daha güçlü ama her cihaz desteklemiyor.

### Adım 5: Phase 2 Yapılandırma

Phase 2 = gerçek trafiğin tünelden geçmesi.

> 📸 **Ekran 5** — Phase 2 settings  
> "Phase 2 Selectors" bölümü  
> "+Create New" butonu  
> Name: "S2S-Ankara-P2"  
> Local Address:  
>   ○ Named Address (FortiGate object kullan)  
>   ● **Subnet**  
>   Subnet: **10.10.0.0/16** ← İstanbul LAN  
> Remote Address:  
>   ● **Subnet**  
>   Subnet: **10.20.0.0/16** ← Ankara LAN  
> Proposals: AES256, SHA256  
> Enable PFS: ✓ (DH Group 14)  
> Auto-negotiate: ✓  
> Key Lifetime: 3600

OK → Phase 2 kaydedildi.

### Adım 6: Tunnel Interface Görünümü

FortiGate tunnel için otomatik bir **virtual interface** oluşturur.

> 📸 **Ekran 6** — Network > Interfaces  
> Sol menü: Network > Interfaces  
> Liste: wan1, internal, dmz, **S2S-Ankara** (yeni)  
> S2S-Ankara satırında:  
> - Type: Tunnel  
> - IP/Netmask: 0.0.0.0/0.0.0.0 (IPsec genelde unnumbered)  
> - Status: Up? / Down? (henüz tunnel yukarı gelmedi, karşı taraf da config'lenmeli)

Bu interface'e **firewall policy**'de atıf yapılacak.

### Adım 7: Firewall Policy — 2 Yön

IPsec tunnel trafiği **firewall policy** olmadan geçmez. 2 policy gerekli (iki yönlü akış için):

#### Policy 1: İstanbul → Ankara

> 📸 **Ekran 7** — Policy & Objects > Firewall Policy  
> "+Create New"  
> Name: "LAN-to-S2S-Ankara"  
> Incoming Interface: **internal** (LAN)  
> Outgoing Interface: **S2S-Ankara** (tunnel)  
> Source: **all** (veya specific subnet)  
> Destination: **all**  
> Service: **ALL**  
> Schedule: always  
> Action: **ACCEPT**  
> NAT: **OFF** (VPN'de NAT yok)  
> Log: All Sessions

#### Policy 2: Ankara → İstanbul

Aynı policy'nin tersi:
- Incoming: **S2S-Ankara**
- Outgoing: **internal**
- Action: ACCEPT
- NAT: OFF

### Adım 8: Static Route

Ankara'ya yönlendirme ekle:

> 📸 **Ekran 8** — Network > Static Routes  
> "+Create New"  
> Destination: Subnet = **10.20.0.0/16**  
> Device: **S2S-Ankara** (tunnel interface)  
> Administrative Distance: 10 (default)  
> Priority: 0  

Bu route olmazsa İstanbul LAN → Ankara LAN trafiği tunnel yerine WAN'a (default gateway) gider → reach edilemez.

## 10:45 — Ankara FortiGate Yapılandırma (Ayna)

Deniz aynı adımları Ankara FortiGate'te yaptı, ama **lokasyonları ters** çevirdi:

| Alan | Ankara Config |
|---|---|
| Remote Gateway | **[İstanbul FortiGate public IP]** |
| Pre-shared Key | **Aynı** (her iki tarafta identical olmalı) |
| Phase 2 Local | 10.20.0.0/16 |
| Phase 2 Remote | 10.10.0.0/16 |
| Static Route | 10.10.0.0/16 → tunnel interface |

Her iki tarafta Phase 1 ve Phase 2 parameters **exact olarak aynı** olmalı. En küçük fark (MD5 vs SHA256) mismatch → tunnel up olmaz.

## 11:15 — Tunnel Kontrolü

İstanbul tarafında:

> 📸 **Ekran 9** — VPN > IPsec Tunnels  
> Sol menü: VPN > IPsec Tunnels  
> Liste: S2S-Ankara  
> Status ikonu: **yeşil yukarı ok** (tunnel up)  
> Bytes in/out: 0 (henüz trafik yok)

CLI ile tunnel detayı:

```bash
diagnose vpn tunnel list name S2S-Ankara
```

Çıktı (kısaltılmış):
```
list all ipsec tunnel in vd 0
------------------------------------------------------
name=S2S-Ankara ver=2 serial=1 10.10.0.1:0->203.0.113.50:0
...
proxyid_num=1 child_num=0 refcnt=7 ilast=0 olast=0 ad=/0
stat: rxp=0 txp=0 rxb=0 txb=0
dpd: mode=on-demand on=1 idle=20000ms retry=3 count=0 seqno=0
...
proxyid=S2S-Ankara-P2 proto=0 sa=1 ref=2 serial=1 auto-negotiate
  src: 0:10.10.0.0/16:0
  dst: 0:10.20.0.0/16:0
  SA:  ref=6 options=1a3 type=00 soft=0 mtu=1438 expire=3541/0B replaywin=2048 ...
  life: type=01 bytes=0/0 timeout=3567/3600
  dec: spi=b7a2c91f ...
  enc: spi=a82f3e4d ...
  ...
```

**Phase 1 UP** + **Phase 2 UP** + SA active. Tunnel çalışıyor.

## 11:20 — Ping Testi

İstanbul'daki bir iş istasyonundan:
```bash
ping 10.20.10.5  # Ankara'daki bir bilgisayar
```

```
Pinging 10.20.10.5 with 32 bytes of data:
Reply from 10.20.10.5: bytes=32 time=42ms TTL=63
Reply from 10.20.10.5: bytes=32 time=41ms TTL=63
Reply from 10.20.10.5: bytes=38ms time=40ms TTL=63
```

**Reply!** İstanbul-Ankara arası RTT ~40ms (fiber altyapısı ortalaması). Production'a hazır.

## 11:30 — Son Test: File Server Erişimi

Ankara'daki Deniz'in kurduğu test laptop'ından:
```
Windows Explorer > \\10.10.20.50\muhasebe
```

Dosya sunucusuna bağlandı. Logo açıldı, müşteri kayıtları listelendi. Sanki Ankara ofisi İstanbul'un LAN'ındaymış gibi çalışıyor.

---

## Yaygın Hatalar

### Phase 1 UP ama Phase 2 DOWN

Phase 1 parametreler eşleşti ama Phase 2 subnet/proposal fark var.

Kontrol:
```bash
diagnose debug enable
diagnose debug application ike -1
```

Sonra tunnel'ı kick:
```bash
diagnose vpn ike gateway flush name S2S-Ankara
```

Debug output'ta "SA_INIT" ve "IKE_AUTH" mesajları. Hata mesajı Phase 2 seçim uyumsuzluğunu gösterir.

En yaygın: Local/Remote subnet yanlış. Her iki tarafta ayna olmalı.

### "Peer SA proposal not match local policy"

Ayrı bir yazımızda detay var: [Peer SA proposal not match çözümü](/blog/fortigate-peer-sa-proposal-not-match-phase-2)

### Tunnel UP Ama Ping Çalışmıyor

Check 1: Firewall policy kuralı var mı (iki yönlü)?
Check 2: Static route tunnel interface'ini gösteriyor mu?
Check 3: Karşı tarafta NAT aktif olabilir — VPN trafiğini NAT etmemeli.

Wireshark ile tunnel arayüzünden capture alın:
```bash
diagnose sniffer packet S2S-Ankara 'icmp' 4
```

Gelen request görünüyor mu? Reply gidiyor mu?

### MTU Sorunları

VPN paketleri IPsec header ekler → paket büyür → fragmentation sorunları.

Standart MTU: 1500. IPsec sonrası genelde **1438** veya **1420**. Büyük paketler drop olabilir.

Çözüm:
```bash
config system interface
    edit S2S-Ankara
        set mtu 1400
        set mtu-override enable
    next
end
```

Veya TCP MSS clamping:
```bash
config firewall policy
    edit [policy_id]
        set tcp-mss-sender 1360
        set tcp-mss-receiver 1360
    next
end
```

### IKE v1 vs IKE v2 Mismatch

IKE v1 ile FortiGate IKE v2 arasında tunnel kurulmaz. Her iki tarafta aynı version.

IKE v2 modern + güvenli — her iki cihaz destekliyorsa mutlaka v2 kullan.

### Dead Peer Detection (DPD) Ayarları

Tunnel up görünüyor ama karşı taraf offline → FortiGate hâlâ "UP" sayıyor. DPD aktif olursa karşı taraf kontrol edilir, cevap yoksa tunnel DOWN.

```
VPN > IPsec Tunnels > S2S-Ankara > Edit > Phase 1 Proposal
Dead Peer Detection: On Demand
Dead Peer Detection Retry Interval: 20
Dead Peer Detection Retry Count: 3
```

## Güvenlik Best Practices

### 1. Pre-shared Key 32+ Karakter

Kısa PSK brute-force saldırısına açık. Minimum 32 karakter, random, complex.

### 2. Yıllık PSK Rotation

Yılda bir key yenile. Planlı bakımda:
- Yeni PSK üret
- Her iki FortiGate'te güncelle
- Tunnel reset (flush)

### 3. Sadece Gerekli Subnet'ler

Phase 2 selector'da "all → all" yerine spesifik subnet'ler. Böylece saldırgan bir taraftan bile nüfuz etse diğer tarafın tümüne erişemez.

### 4. Firewall Policy'de Servis Kısıtlama

"any → any → all services" yerine:
- İstanbul → Ankara: SMB (445), RDP (3389), Logo (spesifik port)
- Ankara → İstanbul: Aynı

Gereksiz protokollere tunnel izin verilmez.

### 5. Log Forwarding

Tunnel up/down eventleri FortiAnalyzer veya SIEM'e akıt. Ani tunnel drop saldırı sinyali olabilir.

## İleri Seviye — Redundant VPN

Tek tunnel'a güvenmek risk. Redundancy için:

**Option A**: İki farklı ISP üzerinden iki VPN tunnel (SD-WAN ile load balance veya failover)

**Option B**: Partner + üreticiden alternatif cihaz — FortiGate HA cluster (aktif-pasif)

## Related

- [FortiGate CPU yüksek kullanım çözümü](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [FortiGate SSL-VPN Server Certificate](/blog/fortigate-ssl-vpn-server-certificate-hatasi)
- [Peer SA proposal not match (Phase 2 mismatch)](/blog/fortigate-peer-sa-proposal-not-match-phase-2)

---

**Çok şubeli FortiGate deployment, SD-WAN, HA cluster ve VPN yönetimi için uzman destek?** Kozyatağı Bilişim Fortinet NSE sertifikalı ekibimizle managed firewall hizmeti. [Teknik görüşme talep edin.](/#contact)
