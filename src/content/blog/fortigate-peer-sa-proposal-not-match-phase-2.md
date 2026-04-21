---
slug: fortigate-peer-sa-proposal-not-match-phase-2
title: "FortiGate 'Peer SA proposal not match local policy' — IPsec Phase 2 Mismatch"
type: cluster
pillar: 4
url: "/blog/fortigate-peer-sa-proposal-not-match-phase-2"
hedef_anahtar_kelime: "peer sa proposal not match local policy"
meta_description: "FortiGate IPsec VPN'de 'Peer SA proposal not match local policy' hatası. Phase 2 parameter uyumsuzluk çözüm rehberi — debug log analizi ile adım adım."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Peer SA proposal not match"
product_family: "Fortinet & Firewall"
---

## "Müşterinin Cisco ASA'sıyla Tunnel Kuramıyorum"

Yeni bir müşteriyle site-to-site VPN kurulumu yapması gereken BT uzmanı Kerem, iki gün sonra hâlâ çözememişti. Problemi:

> "Müşteri tarafı Cisco ASA. Biz FortiGate'iz. Phase 1 UP oluyor, Phase 2 DOWN. Debug log'u şu:

```
2024-05-12 14:32:18 ike 0: RECV 192.0.2.10:500 -> 203.0.113.20:500 IKE_AUTH 
2024-05-12 14:32:18 ike 0: comes 192.0.2.10:500->203.0.113.20:500,ifindex=5...
2024-05-12 14:32:18 ike 0:VPN-Customer: negotiation result
2024-05-12 14:32:18 ike 0:VPN-Customer: proposal id = 1:
2024-05-12 14:32:18 ike 0:VPN-Customer:   protocol = ESP:
2024-05-12 14:32:18 ike 0:VPN-Customer:      encapsulation = TUNNEL
2024-05-12 14:32:18 ike 0:VPN-Customer:         type=ENCR, val=AES_CBC (key_len=256)
2024-05-12 14:32:18 ike 0:VPN-Customer:         type=AUTH, val=SHA1
2024-05-12 14:32:18 ike 0:VPN-Customer: PFS DH group = 2
2024-05-12 14:32:18 ike 0:VPN-Customer: peer SA proposal not match local policy
2024-05-12 14:32:18 ike 0:VPN-Customer: no matching proposal found
```

**"peer SA proposal not match local policy"** — Cisco ASA "ben şöyle konuşmak istiyorum" der, FortiGate "ben öyle anlamıyorum" der, kapanır."

Bu yazı Kerem'in 20 dakikada çözdüğü sistematik yaklaşım — **debug log okuma + parametre eşleme**.

## Hızlı Çözüm (TL;DR)

1. `diagnose debug enable; diagnose debug application ike -1` aktif et
2. Tunnel'ı restart et, IKE_AUTH mesajlarını oku
3. Karşı taraf (Cisco/Juniper/başka FortiGate) ne proposal gönderiyor? Log'da görürsün
4. FortiGate'teki Phase 2 proposal'ı bu değerle eşle (encryption, auth, DH group)
5. Özellikle **DH Group** (PFS) ve **Lifetime** eşleşmesi kritik

---

## Problemi Anlama — IKE Negotiation

IPsec tunnel iki aşamada kurulur:

**Phase 1 (IKE)** — iki gateway birbirini tanır, encrypted management kanalı kurar.

**Phase 2 (IPsec)** — gerçek veri trafiği için SA (Security Association) oluşturulur. Her iki tarafın **aynı cryptography parameters** kabul etmesi şart:
- Encryption algorithm (AES256, AES128, 3DES, DES)
- Authentication (SHA256, SHA384, SHA1, MD5)
- DH Group / PFS (14, 19, 5, 2)
- Lifetime (seconds, kilobytes)
- Protocol (ESP, AH)

Tek bir fark = proposal mismatch = tunnel DOWN.

## 14:00 — Debug Başlat

Kerem CLI açtı:

```bash
# Debug seviyesi artır
diagnose debug enable
diagnose debug console timestamp enable
diagnose debug application ike -1
```

Sonra tunnel'ı zorla reconnect yap:
```bash
diagnose vpn ike gateway flush name VPN-Customer
```

Debug çıktıları otomatik akmaya başlar.

## 14:02 — Log Okuma

Önemli satırlar:

```
ike 0:VPN-Customer: proposal id = 1:
ike 0:VPN-Customer:   protocol = ESP:
ike 0:VPN-Customer:      encapsulation = TUNNEL
ike 0:VPN-Customer:         type=ENCR, val=AES_CBC (key_len=256)   ← Cisco: AES256
ike 0:VPN-Customer:         type=AUTH, val=SHA1                    ← Cisco: SHA1
ike 0:VPN-Customer: PFS DH group = 2                               ← Cisco: DH2
ike 0:VPN-Customer: peer SA proposal not match local policy
```

**Cisco'nun gönderdiği proposal:**
- Encryption: AES256
- Auth: **SHA1** (zayıf, ama Cisco eski versiyon varsayılan)
- DH Group: **2** (1024-bit, eski)

FortiGate tarafındaki Kerem'in Phase 2 config'ini kontrol:

> 📸 **Ekran 1** — Phase 2 proposal edit  
> VPN > IPsec Tunnels > VPN-Customer > Edit > Phase 2  
> Proposals listesi:  
> Encryption: **AES256**  
> Authentication: **SHA256** ← FortiGate istiyor  
> Enable PFS: ✓  
> DH Groups: **14** ← FortiGate istiyor  
> Key Lifetime: 3600

Mismatch:
- AUTH: Cisco SHA1 ↔ FortiGate SHA256 ❌
- DH Group: Cisco 2 ↔ FortiGate 14 ❌

## 14:05 — Karar: "Kim Uyum Sağlasın?"

2 seçenek:

**Seçenek A: FortiGate Cisco'ya uyum sağlasın (zayıflat)**
- FortiGate Phase 2'yi SHA1 + DH2'ye değiştir
- **Sakınca**: SHA1 deprecated (2020+), DH2 (1024-bit) günümüzde brute-force'a açık

**Seçenek B: Cisco FortiGate'e uyum sağlasın (güçlendir)**
- Müşteriye telefon et, Cisco'yu SHA256 + DH14'e güncellemesini iste
- **Sakınca**: Müşterinin Cisco eski olabilir, desteklemiyor olabilir

Kerem **Seçenek B'yi denedi**, müşteriye arayıp:

> "Merhaba, VPN tunnel'ını kurarken güvenlik ayarları konusunda bir uyumsuzluk var. SHA1 ve DH Group 2 kullanıyorsunuz — bunlar 2020'den beri deprecated. SHA256 + DH14 önerilen standart. ASA versiyonunuz bunu destekliyor mu kontrol eder misiniz?"

Müşteri BT sorumlusu kontrol etti: ASA 9.6+ SHA256 + DH14 destekliyor. Onlar da güncelledi:

```cisco
! Cisco ASA config değişikliği
crypto ipsec ikev2 ipsec-proposal AES256-SHA256
  protocol esp encryption aes-256
  protocol esp integrity sha-256

crypto map OUTSIDE-MAP 10 set ikev2 ipsec-proposal AES256-SHA256
crypto map OUTSIDE-MAP 10 set pfs group14
```

## 14:20 — Tunnel Restart

```bash
# FortiGate tarafında
diagnose vpn ike gateway flush name VPN-Customer
```

Debug log:
```
ike 0:VPN-Customer: proposal id = 1:
ike 0:VPN-Customer:   protocol = ESP:
ike 0:VPN-Customer:         type=ENCR, val=AES_CBC (key_len=256)
ike 0:VPN-Customer:         type=AUTH, val=SHA256   ← Match!
ike 0:VPN-Customer: PFS DH group = 14                ← Match!
ike 0:VPN-Customer: SA matches proposal
ike 0:VPN-Customer: IPsec SA established
```

**Match!** Tunnel UP.

```bash
# Debug kapat
diagnose debug disable
```

## Yaygın Phase 2 Mismatch Sebepleri

### 1. Encryption Algoritması Farklı

En yaygın:
- FortiGate AES256 önerir
- Eski Cisco/Juniper AES128 veya 3DES konfigürasyonunda

Çözüm: FortiGate'te **birden fazla proposal** tanımla. Karşı taraf hangisini seçerse.

```
Phase 2 Proposals (en güvenlisinden en zayıfına):
1. AES256 + SHA256
2. AES256 + SHA1
3. AES128 + SHA256
4. AES128 + SHA1
```

FortiGate tüm proposals'ı sunar, karşı taraf match eden ilki alır.

### 2. DH Group Uyumsuzluğu

DH Group seçimi kritik:
- **DH 1**: 768-bit, kırılabilir — ASLA kullanma
- **DH 2**: 1024-bit, 2024 itibarıyla zayıf — sadece legacy
- **DH 5**: 1536-bit, orta — eski ortamlarda hala kullanılıyor
- **DH 14**: 2048-bit — standart, önerilen minimum
- **DH 15**: 3072-bit — güçlü
- **DH 19, 20, 21**: ECC-based, daha modern

### 3. Lifetime Farkı

Cisco default lifetime 28800s (8 saat), FortiGate default 43200s (12 saat). Genelde mismatch değildir ama **bazen re-keying problemleri** yaratır:

```cisco
crypto ipsec security-association lifetime seconds 3600
```

```
FortiGate:
Phase 2 Key Lifetime: 3600
```

İki tarafta aynı. En kısa lifetime iki tarafta kazanır normalde.

### 4. Subnet Selector Mismatch

Phase 2 local/remote subnet uyumsuzluğu farklı hata mesajı verir (`TS_UNACCEPTABLE`) ama kimi zaman "peer SA proposal not match" hatası verebilir.

FortiGate: local 10.10.0.0/16, remote 10.20.0.0/16  
Cisco: interesting traffic `access-list VPN-ACL permit ip 10.10.0.0 0.0.255.255 10.20.0.0 0.0.255.255`

**Ayna olmalı** — fark ACL vs subnet notation değil, **gerçek range** aynı olmalı.

### 5. PFS (Perfect Forward Secrecy) Ayarı

- FortiGate PFS enabled + DH14
- Cisco PFS disabled

Bu durumda negotiation başarısız. Her iki tarafta aynı olmalı:
- PFS enabled + aynı DH group → güvenli
- Her ikisi disable → zayıf (lifetime sonrası key yenilenmeden eski key ile kalır)

En iyisi her iki tarafta PFS enabled + DH14.

### 6. Encapsulation: Tunnel vs Transport

Standart VPN **Tunnel mode**. Bazı özel use case'ler (L2TP over IPsec) Transport mode. Bir taraf Tunnel, diğer Transport ise mismatch.

## Sistematik Debug Yaklaşımı

### Adım 1: Debug'ı Aç ve Tunnel Flush

```bash
diagnose debug enable
diagnose debug console timestamp enable
diagnose debug application ike 255
diagnose debug application ipsec 255
diagnose vpn ike gateway flush name [tunnel_name]
```

### Adım 2: Proposal Satırlarını Bul

```
peer SA proposal:
type=ENCR, val=... (encryption)
type=AUTH, val=... (auth)
PFS DH group = ...
```

### Adım 3: FortiGate Local Policy ile Karşılaştır

```bash
show vpn ipsec phase2-interface [tunnel_name]
```

Çıktı:
```
edit "VPN-Customer-P2"
    set phase1name "VPN-Customer"
    set proposal aes256-sha256
    set pfs enable
    set dhgrp 14
    set keylifeseconds 3600
    ...
```

Compare: peer'ın söylediği vs local policy.

### Adım 4: Eşleştirmeyi Yap veya Müzakere Et

Teknik karar: Kim güncelleyecek? Her iki taraf da güncelleyebiliyorsa ikisi de daha güvenliye geçsin.

## Çoklu Proposal ile Esnek Tünel

Karşı taraf farklı ortamlarda farklı parameters kullanıyorsa (örn. bir müşteride SHA256, başkasında SHA1) — FortiGate'te çoklu proposal tanımla:

```bash
config vpn ipsec phase2-interface
    edit "VPN-Customer-P2"
        set phase1name "VPN-Customer"
        set proposal aes256-sha256 aes256-sha1 aes128-sha256 aes128-sha1
        set pfs enable
        set dhgrp 14 5 2
        set keylifeseconds 3600
    next
end
```

FortiGate tüm 4 proposal + 3 DH group'u sunar. Karşı taraf en güçlüsünü seçer (normalde).

**Uyarı**: Zayıf proposal'ları (SHA1, DH2) eklemek güvenlik riskidir. Sadece eski cihazla zorunluluk varsa yapılmalı.

## IKE v1 vs IKE v2 Farkı

Phase 2 mismatch logu benzer ama **IKE version mismatch** daha önce başarısız olur (Phase 1'de):

```
ike 0: ignoring unauthenticated notify payload INVALID_SPI
```

Çözüm: Her iki tarafta **aynı IKE version**. Modern deployment için **IKE v2** tercih edilir.

```bash
config vpn ipsec phase1-interface
    edit "VPN-Customer"
        set ike-version 2
    next
end
```

## Debug Dikkat Notları

Debug **yoğun log üretir**. Production'da uzun süre açık tutmayın:
```bash
diagnose debug reset
diagnose debug disable
```

Debug'ı otomatik timeout ile başlatmak için:
```bash
diagnose debug duration 300  # 5 dakika sonra otomatik kapanır
```

## Tunnel UP Ama Trafik Akmıyor Senaryosu

Phase 2 match oldu, SA kuruldu, tunnel "UP" gösteriyor ama iki LAN birbirini ping'leyemiyor:

1. **Firewall policy eksik**: `internal → tunnel` ve `tunnel → internal` her iki yönde
2. **Static route eksik**: `10.20.0.0/16 → tunnel interface`
3. **NAT aktif**: VPN trafiğinde NAT disable olmalı
4. **MTU sorunu**: Büyük paketler drop — TCP MSS clamping ekle

Ping test sürecinde:
```bash
# FortiGate'te tunnel interface'den capture
diagnose sniffer packet VPN-Customer 'icmp' 4
```

Paket görünüyor ama cevap yok → karşı tarafta firewall veya route sorunu.

## İlgili Rehberler

- [FortiGate Site-to-Site IPsec VPN](/blog/fortigate-site-to-site-ipsec-vpn-iki-firma)
- [FortiGate SSL-VPN Tunnel + FortiClient MFA](/blog/fortigate-ssl-vpn-tunnel-forticlient-mfa-kurulum)
- [FortiGate CPU yüksek kullanım](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [FortiGate SSL-VPN Server Certificate](/blog/fortigate-ssl-vpn-server-certificate-hatasi)

---

**FortiGate IPsec VPN troubleshooting, multi-vendor tunnel kurulum ve managed firewall için uzman destek?** Kozyatağı Bilişim Fortinet NSE sertifikalı ekibimiz. [Teknik görüşme talep edin.](/#contact)
