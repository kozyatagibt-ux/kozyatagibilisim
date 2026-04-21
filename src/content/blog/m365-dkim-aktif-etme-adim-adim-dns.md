---
slug: m365-dkim-aktif-etme-adim-adim-dns
title: "Microsoft 365 DKIM Aktif Etme — 'Spam'a Düşen Mail'lerin Çözümü"
type: cluster
pillar: 6
url: "/blog/m365-dkim-aktif-etme-adim-adim-dns"
hedef_anahtar_kelime: "microsoft 365 dkim aktif etme"
meta_description: "Microsoft 365'te DKIM imzalama nasıl aktif edilir — CNAME DNS kayıtları, Defender portal yapılandırma, test. Mail spam'a düşmesi nasıl önlenir."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "DKIM Signing"
product_family: "Microsoft 365 & Outlook"
---

## "Müşteri Mail'lerimiz Spam'a Düşüyor"

Satış müdürü şikayet:

> "Gönderdiğim teklif mail'leri müşterilerin spam klasörüne düşüyor. Müşteri aramayınca bulmuş ama 'Junk'tan çekmek zorunda kaldım diyor. Böyle devam edemez, imaj sorunu."

BT uzmanı Merve kontrol etti. Başka göstergeler:
- **mail-tester.com**'da skor **6.5/10** (standart olarak 9+ olması lazım)
- Google Postmaster Tools'ta "DKIM failure rate: 87%"
- Outlook'tan Gmail'e gönderilen test mail'i "Cannot verify sender" uyarısıyla geliyor

Sorun: **DKIM (DomainKeys Identified Mail) M365 tenant'ında aktif değil.**

Merve 20 dakikada çözdü — bu yazı her adımı anlatıyor.

## DKIM Nedir ve Neden Önemli?

DKIM, mail'lerinizi **kriptografik imza** ile imzalayan standart. Alıcı sunucu imzayı kontrol eder:
- İmza doğru → mail gerçekten sizden
- İmza yok veya yanlış → **muhtemelen spoofing**

Modern mail filtrelerinin (Gmail, Outlook, Apple) karar verirken baktığı 3 temel:
1. **SPF** — hangi sunucu IP'ler senin adına mail gönderebilir
2. **DKIM** — kriptografik içerik imzası
3. **DMARC** — SPF ve DKIM başarısız olursa ne yapılacak

DKIM yoksa spam filtresi "güvensiz sender" olarak skor düşürür. Özellikle Gmail 2024 Şubat'tan beri **DKIM şart** — toplu gönderimde 5000+ mail/gün için hesaplar kapatılabilir.

## Hızlı Çözüm (TL;DR)

1. **Defender admin center** → Email & collaboration → Policies & rules → Threat policies → **DKIM**
2. Domain seç → **"Enable"** butonuna tıkla
3. 2 CNAME kaydı üret: `selector1._domainkey` ve `selector2._domainkey`
4. DNS sağlayıcına (GoDaddy, isimtescil, Cloudflare) bu 2 CNAME'i ekle
5. 1-24 saat DNS propagation bekle
6. Defender'a dön → "Enable" tekrar tıkla → bu kez **aktif** olur
7. mail-tester.com ile doğrula

---

## 09:15 — Microsoft 365 Defender Portal

Merve `security.microsoft.com` açtı:

> 📸 **Ekran 1** — Microsoft 365 Defender portal  
> Sol navigation: Home, Incidents & alerts, Actions & submissions, Threat intelligence, **Email & collaboration**, Cloud apps, Assets, Identities...  
> Email & collaboration expanded → alt menüler:  
> - Investigations, Explorer, Review, **Policies & rules**, Attack simulation training...  
> **Policies & rules** tıklandı

> 📸 **Ekran 2** — Policies & rules page  
> Sağ panelde kartlar:  
> - Threat policies  
> - Alert policies  
> - Activity alerts  
> **Threat policies** tıklandı

> 📸 **Ekran 3** — Threat policies page  
> Grid layout:  
> - Anti-phishing  
> - Anti-spam  
> - Anti-malware  
> - Safe Attachments  
> - Safe Links  
> - **Email authentication settings** ← Bu  
> - Submission policy

**Email authentication settings** > **DKIM** tab:

> 📸 **Ekran 4** — DKIM page  
> Üst açıklama: "DKIM allows you to add a digital signature to email messages..."  
> Tablo:  
> Domain | Status | Sign messages for this domain with DKIM signatures | Last checked  
> - firma.com.tr | **Not signing DKIM signatures** | Off | -  
> - onmicrosoft.com default | Signing | On | -

Kendi custom domain'iniz (`firma.com.tr`) **Not signing** durumunda. Onmicrosoft.com default domain zaten imzalanıyor (Microsoft otomatik) ama gerçek domain'iniz değil.

## 09:20 — CNAME Kayıtlarını Al

`firma.com.tr`'ye tıkla → detay panel:

> 📸 **Ekran 5** — DKIM domain detail  
> Panel başlığı: "firma.com.tr"  
> Alanlar:  
> - Status: Not signing DKIM signatures  
> - "Sign messages for this domain with DKIM signatures": toggle  
> - **CNAME records to create:**  
>   ```  
>   Host: selector1._domainkey  
>   Points to: selector1-firma-com-tr._domainkey.firma.onmicrosoft.com  
>      
>   Host: selector2._domainkey  
>   Points to: selector2-firma-com-tr._domainkey.firma.onmicrosoft.com  
>   ```

Merve bu 2 CNAME kaydını kopyaladı.

Toggle'ı **"Enable"** pozisyonuna çevirdi — ama Microsoft uyardı:

> ⚠ "DKIM cannot be enabled until both CNAME records are in DNS. Please create the records first."

Yani önce DNS'e ekle → sonra enable et.

## 09:25 — DNS'e CNAME Kayıtları Ekle

Firma DNS sağlayıcısı **isimtescil**. Merve login oldu:

> 📸 **Ekran 6** — isimtescil DNS yönetimi  
> Domain: firma.com.tr > DNS Yönetimi  
> Mevcut kayıtlar listesi: A, MX, TXT (SPF), CNAME  
> "Yeni Kayıt Ekle" butonu

Yeni CNAME 1:
```
Tip: CNAME
İsim: selector1._domainkey
Hedef: selector1-firma-com-tr._domainkey.firma.onmicrosoft.com.
TTL: 3600
```

Kaydet.

Yeni CNAME 2:
```
Tip: CNAME
İsim: selector2._domainkey
Hedef: selector2-firma-com-tr._domainkey.firma.onmicrosoft.com.
TTL: 3600
```

Kaydet.

### DNS Sağlayıcısına Göre Farklılıklar

| Sağlayıcı | "Host/İsim" alanına | Özel not |
|---|---|---|
| **isimtescil, Natro** | `selector1._domainkey` | Domain kısmı otomatik eklenir |
| **GoDaddy** | `selector1._domainkey` | Benzer |
| **Cloudflare** | `selector1._domainkey` | "Proxy status: DNS only" olmalı (cloud icon off) |
| **Route 53 (AWS)** | `selector1._domainkey.firma.com.tr.` | Full FQDN gerekli |

**Cloudflare kullananlar için kritik**: CNAME proxy açık (turuncu bulut) olmamalı. M365 bunu göremez. "DNS only" (gri bulut) olmalı.

## 09:35 — Propagation Test

Merve 10 dakika bekledi. Sonra kontrol:

```bash
# Windows/Mac/Linux her yerde çalışır
nslookup -type=cname selector1._domainkey.firma.com.tr

# Beklenen çıktı:
# selector1._domainkey.firma.com.tr
#     canonical name = selector1-firma-com-tr._domainkey.firma.onmicrosoft.com
```

İki CNAME de dönüyordu → DNS propagate olmuş.

Alternative online tool: `https://mxtoolbox.com/dkim.aspx` → domain + selector → lookup.

## 09:40 — DKIM'i Aktive Et

Defender portal'a dön → firma.com.tr > toggle **Enable**:

> 📸 **Ekran 7** — DKIM enable success  
> Dialog: "DKIM is now enabled for firma.com.tr"  
> Statüsünde yeşil: "Signing DKIM signatures"

Enable sonrası Microsoft M365 ortalama **4-24 saat** içinde mail'leri imzalamaya başlar.

## 10:00 — Test

Merve kendi test Gmail hesabına mail gönderdi → Gmail'de "Show original" ile header'ı inceledi:

> 📸 **Ekran 8** — Gmail Show Original  
> Mail > 3-nokta menü > "Show original"  
> Ayrı sekme açılır — full SMTP headers + authentication summary  
> Üst kısımda yeşil:  
> **DKIM: 'PASS' with domain firma.com.tr**  
> SPF: 'PASS'  
> DMARC: 'PASS'  
> Encryption: TLS

**DKIM PASS** — başarılı.

### mail-tester.com ile Detaylı Test

https://www.mail-tester.com aç:

> 📸 **Ekran 9** — mail-tester.com  
> Sayfa: "Test your newsletters and transactional emails..."  
> Random test adresi gösteriliyor: `test-abc123@mail-tester.com`  
> Talimat: "Send an email to this address"

Merve test mail'i bu adrese gönderdi → mail-tester otomatik analiz etti:

```
Score: 9.8/10 (yeşil)

✓ Your message passed the SPF test
✓ Your message passed the DKIM test  ← Eskiden ✗ idi
✓ Your message passed the DMARC test
✓ Your server is not blacklisted
✓ You have a valid MX record
✗ You do not have a DMARC record with policy: p=reject (minor, -0.2 points)
```

6.5 → 9.8. **3.3 puan artış** sadece DKIM'den.

## 10:30 — DMARC'a Yükselme (Opsiyonel İleri Adım)

DKIM aktifken DMARC policy güçlendirilebilir:

DNS'e yeni TXT kaydı:
```
Host: _dmarc
Value: v=DMARC1; p=reject; rua=mailto:dmarc@firma.com.tr; ruf=mailto:dmarc@firma.com.tr; fo=1
```

- `p=reject` = sahte gönderimleri **tamamen reddet**
- `rua` = haftalık özet rapor mail adresi
- `ruf` = forensic rapor (opsiyonel)

**Önemli**: DMARC `p=reject`'e doğrudan geçmeyin. Önce `p=none` ile haftalık rapor al, sahte gönderim var mı kontrol et, sonra `p=quarantine` → `p=reject`.

## Yaygın Sorunlar

### "DKIM cannot be enabled. Please check your CNAME records."

CNAME kayıtları yanlış.
- Typo var mı? `selector1` değil `selector` yazılmış olabilir
- Hedef sonunda nokta var mı? (`.firma.onmicrosoft.com.` — bazı DNS'ler istiyor)
- TTL çok yüksek (86400+) — DNS propagation uzun sürüyor
- Cloudflare proxy açık (turuncu bulut) olmamalı

### DKIM Aktif Ama Mail Yine Spam'a Düşüyor

DKIM tek başına yetmeyebilir:
- **SPF kaydı** var mı ve doğru mu?
- **Reverse DNS (PTR)** kaydı var mı? Public IP → hostname
- Mail içeriği spammy mi? (büyük harfler, "BEDAVA!!!", ücretsiz linkler)
- **IP reputation**: `mxtoolbox.com/blacklists.aspx` → IP'niz blocklist'te mi?

### Subdomain (örn. `newsletter.firma.com.tr`) için Ayrı DKIM

Her subdomain için ayrı DKIM gerekir. Örn. newsletter bouncer servisi (SendGrid, Mailgun) kullanıyorsan:
```
selector1._domainkey.newsletter.firma.com.tr  →  CNAME servis sağlayıcıya
```

SendGrid, Mailgun gibi servisler kendi selector'larını verir.

### DKIM İmzalama Çalışıyor Ama Header'da "DKIM: NEUTRAL"

**PASS** yerine **NEUTRAL** görünürse:
- DKIM header yok (imzalama çalışmıyor)
- Veya canonicalization algoritması uyumsuz

Re-enable (disable → bekle → enable).

### 3. Parti Mail Servisi + M365 Karışıklık

Bazı şirketlerde:
- Günlük mail'ler M365'ten
- Bulk newsletter SendGrid veya ConstantContact'ten
- Her servis için **ayrı selector** + CNAME

DKIM herhangi biri doğrulanırsa mail "PASS" olur. Önemli olan **her gönderen sistem için** imzalanmış olması.

## İleri Seviye — BIMI

DKIM + DMARC `p=reject` + bir de BIMI (Brand Indicators for Message Identification):
- Markanızın logo'su Gmail ve Yahoo'da mail header'ında görünür
- Tüketici güveni artar
- Gereksinimler: DMARC reject + VMC (Verified Mark Certificate) ~1500 USD/yıl

DNS kaydı:
```
Host: default._bimi
Value: v=BIMI1; l=https://firma.com.tr/bimi-logo.svg; a=https://firma.com.tr/bimi-cert.pem
```

Büyük markalar için yapıyor (Bank of America, Apple). Kurumsal imaj yatırımı.

## Önleyici Bakım

### Aylık DKIM Sağlık Kontrolü

```powershell
# Defender admin PowerShell
Connect-ExchangeOnline
Get-DkimSigningConfig | Select Domain, Enabled, Status, LastChecked

# Beklenen:
# Domain           Enabled  Status   LastChecked
# firma.com.tr     True     Enabled  [son tarih]
```

### Selector Rotation (2 Yıl Sonra)

DKIM key'leri 2 yıl sonra yenilenmeli (güvenlik best practice). Microsoft built-in otomatik rotate eder:
```powershell
Rotate-DkimSigningConfig -Identity firma.com.tr
```

Ama sonra **yeni CNAME'leri DNS'e güncellemek** gerekir. Önceden planla.

### DMARC Aggregate Report İzleme

`rua` adresine gelen XML raporlar:
- Haftalık ~100-500 rapor (büyük domain'lerde binlerce)
- XML parse + analiz için: **DMARC Analyzer, Valimail, Dmarcian**
- Ücretsiz analiz: **Postmark DMARC Digests**

Rapor sayesinde:
- Kim sizin domain'inizi spoofluyor
- Hangi ISP'den saldırı geliyor
- SPF/DKIM uyumsuzluk pattern'ları

## Exchange On-Prem için DKIM

M365 değil on-prem Exchange kullanıyorsanız DKIM:
- Exchange yerleşik DKIM yok
- **3. parti tool** gerekli: ExchangeMail Gateway, Spam Filter Plus
- Veya smart host olarak M365/SendGrid kullanmak
- Linux tarafı: **OpenDKIM** (Postfix ile)

## İlgili Rehberler

- [Microsoft 365 vs Google Workspace karşılaştırması](/blog/microsoft-365-vs-google-workspace-kurumsal)
- [550 5.7.1 Unable to relay çözümü](/blog/exchange-550-5-7-1-unable-to-relay-cozumu)
- [Exchange 2019 CU14 transport queue bülteni](/blog/bulten-exchange-2019-cu14-transport-queue)

---

**M365 mail security hardening — SPF/DKIM/DMARC/BIMI tam paket kurulum ve izleme?** Kozyatağı Bilişim olarak kurumsal mail authentication projesi. [Teknik görüşme talep edin.](/#contact)
