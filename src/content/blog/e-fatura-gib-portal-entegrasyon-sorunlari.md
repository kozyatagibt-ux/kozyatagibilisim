---
slug: e-fatura-gib-portal-entegrasyon-sorunlari
title: "e-Fatura GİB Portal Entegrasyon Sorunları — IT Altyapı Tarafı"
type: cluster
pillar: 6
url: "/blog/e-fatura-gib-portal-entegrasyon-sorunlari"
hedef_anahtar_kelime: "e-fatura gib portal sorunu"
meta_description: "e-Fatura GİB portal bağlantı hataları: SSL/TLS, sertifika, yetki, portal downtime. Logo, Mikro, Netsis ERP entegrasyonu IT tarafı."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
troubleshoot: true
error_code: "e-Fatura Integration"
product_family: "SQL Server & Veritabanı"
---

## "Fatura Kesilmiyor, Muhasebe Panik"

Ay sonu muhasebeci:
> "Logo'da 50 fatura kesmek lazım, GİB portal bağlanmıyor. Hata: 'SSL handshake failed'. Denetçiler bekliyor!"

Her ERP (Logo, Mikro, Netsis, Uyumsoft) farklı ama temel IT sorunları ortak.

## e-Fatura Sistemleri

- **GİB Portal Entegrasyonu** — Direct API
- **Özel Entegratör** (Logo eTransform, Uyumsoft, GittiGidiyor, EDMBilişim) — Middle-man, daha basit
- **Mükellef Portal** — Manuel (küçük firma)

Orta ölçek genelde **Özel Entegratör** kullanır — IT yükü az.

## Hızlı Çözüm (TL;DR)

**SSL Handshake Hatası**:
1. Windows sertifika store'da **GİB Root CA** eksik → indir + yükle
2. TLS 1.2/1.3 destek: Windows Update + .NET Framework güncel
3. Firewall outbound 443 portal IP'leri açık

**Timeout / Slow**:
1. Portal downtime kontrol (https://status.gib.gov.tr benzeri 3rd party)
2. DNS çözümleme: `nslookup efatura.gib.gov.tr`
3. ISP routing TR'de kısıtlı mı

---

## 10:00 — GİB Portal Adresleri

Entegrasyon noktaları:
- `efatura.gib.gov.tr` — e-Fatura
- `earsiv.gib.gov.tr` — e-Arşiv Fatura
- `eirsaliye.gib.gov.tr` — e-İrsaliye
- `eserbestmeslekmakbuzu.gib.gov.tr` — e-SMM

Her biri SOAP web service + sertifika tabanlı auth.

## 10:10 — SSL Handshake Failed

En yaygın hata. Sebepler:

### 1. GİB Root CA Sertifikası Eksik

GİB **kendi kök CA'sı** var. Windows/Server default trust store'da yok.

**Çözüm**:
```
1. GİB sertifikalarını indir: https://yeniesim.tckk.gov.tr (Kamu SM sitesi)
2. "Kamu SM Kök Sertifikası" + "Kamu SM SSL Kök Sertifikası" download
3. Windows: certmgr.msc > Trusted Root Certification Authorities > Import
4. Sunucuda: certlm.msc (Local Machine store) + Import
```

Apply restart (IIS, ERP service).

### 2. TLS Version Mismatch

GİB TLS 1.2+ zorunlu (TLS 1.0 deprecated).

**Kontrol**:
```powershell
# Windows Server TLS 1.2 enabled mi?
[Net.ServicePointManager]::SecurityProtocol
```

Eğer `Ssl3, Tls` → eski. `Tls12, Tls13` olmalı.

**Enable**:
```powershell
# Registry
$path = "HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319"
Set-ItemProperty -Path $path -Name "SystemDefaultTlsVersions" -Value 1
Set-ItemProperty -Path $path -Name "SchUseStrongCrypto" -Value 1

# Reboot
```

### 3. .NET Framework Eski

ERP .NET kullanıyorsa eski framework TLS 1.2 desteklemez:
```powershell
Get-WmiObject -Class Win32_Product | Where Name -like "*.NET*" | Select Name, Version
```

Min 4.6.2+. Eski ise update.

## 10:20 — Logo Tiger Spesifik

### "GİB Portal Bağlantısı Kurulamıyor"

Logo config:
```
Tools > System Operator > GİB Entegrasyon
- Entegratör: GİB Portal / Uyumsoft / Logo eTransform
- URL: https://earsiv.gib.gov.tr/portal-api/...
- Kullanıcı adı: [kullanıcı]
- Şifre: [şifre]
- Sertifika: Seçili
```

Test butonu → "Bağlantı OK" bekleniyor.

### Sertifika Problem

Logo kullanıcı sertifikası kullanır (e-İmza veya mali mühür):
- `Logo_Certificate_Issuer` Windows store'da var mı?
- Sertifika expired mi?
- Private key accessible mi?

Test: certlm.msc > Personal > Certificates > GİB sertifika > çift tık → "You have a private key..." görünmeli.

## 10:30 — Timeout / Slow Response

### GİB Portal Downtime

GİB'in kendi uptime:
- https://efatura.gib.gov.tr (ping + 443)
- https://status.gib.gov.tr/ (bazen yayımlanıyor)
- 3rd party monitor: Downdetector TR

Ay sonu (özellikle ayın son 3 günü) **portal yüklenir** — downtime + yavaşlık normal. Ay başı kritik fatura hep ay sonu yerine. Öneri: Tüm ayı yaymak.

### Local Network

Firewall outbound:
```powershell
Test-NetConnection efatura.gib.gov.tr -Port 443
Test-NetConnection earsiv.gib.gov.tr -Port 443
```

`True` olmalı.

ISP CGNAT bazen sorun. Static IP gerek (GİB IP whitelist değil ama routing stability için).

## 10:45 — e-Arşiv Fatura Göndermiyor

Scenario:
- e-Fatura normal müşteriye (firma): GİB Portal
- e-Arşiv normal müşteriye (kişi): GİB e-Arşiv veya entegratör

Kavram karışıklık — **müşteri türüne göre**:
- Mükellef (VKN) → e-Fatura
- Tüketici (TC Kimlik) → e-Arşiv

ERP bu ayrımı otomatik yapar. Config yanlışsa yanlış sisteme gönderir, reddedilir.

## 11:00 — Entegratör vs GİB Portal

### Direct GİB Portal
- Ücretsiz
- Karmaşık (SOAP + certificate + error handling)
- Manuel retry
- IT yükü yüksek

### Özel Entegratör (Logo eTransform, Uyumsoft, GittiGidiyor, EDMBilişim)
- Ücretli (~500-2000 TL/ay)
- Basit API (REST JSON)
- Retry + error handling built-in
- Dashboard monitoring

Orta ölçek için **entegratör** tavsiye ediyorum. IT ekip GİB portal direkt için 1 FTE harcamak yerine, entegratöre 500 TL/ay daha ucuz.

## UBL 2.1 XML Format

e-Fatura XML standart **UBL 2.1** (Universal Business Language). Her dokuman:
- Invoice header (satıcı, alıcı bilgileri)
- Line items
- Tax totals
- Signature (XAdES — XML digital signature)

ERP bunu otomatik üretir. Ama özel durumlarda XML validation hatası:
- "ParticipantID yanlış format" → VKN girişi incele
- "UUID missing" → sistem clock time sync
- "Signature invalid" → sertifika sorun

UBL validation tool: https://www.gib.gov.tr/fatura-kontrol.

## Logo / Mikro / Netsis Özel

| ERP | GİB Sistem | Özel Detay |
|---|---|---|
| **Logo Tiger SQL** | eTransform (kendi entegratörü) | SQL Server 2016+, stored proc kullanır |
| **Mikro Fly** | Uyumsoft, EDM | XML-RPC API |
| **Netsis ERP** | Foriba, Izibiz | SOAP web service |
| **Eta** | ETA eDönüşüm | Kendi entegratör |
| **Paraşüt** | Paraşüt kendi | Cloud-native, IT zorluk minimum |

## Önleyici

1. **Fatura kesim günü kısıtla** — ay sonu flood değil
2. **Retry queue** — ERP'de otomatik retry aktif
3. **Monitoring** — GİB up/down alarm
4. **Entegratör** — IT yükü offload

## İlgili Rehberler

- [Logo Tiger SQL Server bağlantı sorunları](/blog/logo-tiger-sql-server-baglanti-sorunlari)
- [Mikro ERP kullanıcı yetki](/blog/mikro-erp-kullanici-yetki-yonetimi)

---

**ERP + e-Fatura + IT altyapı entegrasyon için destek?** [Teknik görüşme.](/#contact)
