---
slug: ubl-2-1-xml-format-e-fatura-validation
title: "UBL 2.1 XML Format — e-Fatura Yapısı + Validation Hataları"
type: cluster
pillar: 6
url: "/blog/ubl-2-1-xml-format-e-fatura-validation"
hedef_anahtar_kelime: "ubl 2.1 xml format e-fatura"
meta_description: "UBL 2.1 XML format e-Fatura standart — yapısı, zorunlu alanlar, imza (XAdES), validation hataları ve çözüm. GİB uyum."
kelime_sayisi: "~900"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
---

## "e-Fatura Reddedildi — XML Validation Error"

ERP fatura kesmeye çalıştı, GİB reddetti:
```
Error: "Invalid UBL format — Element 'cac:PartyTaxScheme' missing"
```

UBL 2.1 XML standardı karmaşık. Hatalar zahmetli.

## UBL Nedir?

**Universal Business Language** 2.1 — OASIS standart, XML-based electronic document format.

GİB uzantısı: **UBL-TR** (Türkiye için custom namespace).

## Temel Yapı

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
         xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2">
  <ext:UBLExtensions>
    <!-- Digital signature (XAdES-BES) -->
  </ext:UBLExtensions>

  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>TR1.2</cbc:CustomizationID>
  <cbc:ProfileID>TEMELFATURA</cbc:ProfileID>
  <cbc:ID>ABC2024000001</cbc:ID>
  <cbc:UUID>12345678-1234-1234-1234-123456789012</cbc:UUID>
  <cbc:IssueDate>2024-05-12</cbc:IssueDate>
  <cbc:IssueTime>14:30:00</cbc:IssueTime>
  <cbc:InvoiceTypeCode>SATIS</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>TRY</cbc:DocumentCurrencyCode>

  <!-- Satıcı -->
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:WebsiteURI>www.firma.com.tr</cbc:WebsiteURI>
      <cac:PartyIdentification>
        <cbc:ID schemeID="VKN">1234567890</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>Firma A.Ş.</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>...</cbc:StreetName>
        <cbc:CitySubdivisionName>Ataşehir</cbc:CitySubdivisionName>
        <cbc:CityName>İstanbul</cbc:CityName>
        <cbc:PostalZone>34752</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>TR</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cac:TaxScheme>
          <cbc:Name>Ataşehir</cbc:Name>  <!-- Vergi dairesi -->
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:Contact>
        <cbc:Telephone>+90 216 xxx xxxx</cbc:Telephone>
        <cbc:ElectronicMail>info@firma.com.tr</cbc:ElectronicMail>
      </cac:Contact>
    </cac:Party>
  </cac:AccountingSupplierParty>

  <!-- Alıcı — benzer yapı -->
  <cac:AccountingCustomerParty>...</cac:AccountingCustomerParty>

  <!-- Satırlar -->
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="C62">10</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="TRY">1000.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>Ürün A</cbc:Name>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="TRY">100.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>

  <!-- Vergi toplamı + genel toplam -->
  <cac:TaxTotal>...</cac:TaxTotal>
  <cac:LegalMonetaryTotal>...</cac:LegalMonetaryTotal>
</Invoice>
```

## Yaygın Validation Hataları

### 1. "Element 'cac:PartyTaxScheme' missing"

Satıcı/alıcı vergi dairesi bilgisi eksik. Her Party:
```xml
<cac:PartyTaxScheme>
  <cac:TaxScheme>
    <cbc:Name>Ataşehir</cbc:Name>
  </cac:TaxScheme>
</cac:PartyTaxScheme>
```

Vergi dairesi adı tam olmalı (resmi).

### 2. "Invalid VKN / TCKN Format"

Satıcı VKN (10 haneli) veya alıcı TCKN (11 haneli) format kontrol:
- VKN: 10 digit, Kontrol hanesi GİB algoritması
- TCKN: 11 digit, Kontrol algoritması

ERP genelde doğrular. Manual XML gönderiminde dikkat.

### 3. "UUID Already Used"

Her fatura **unique UUID** (RFC 4122 format). Aynı UUID iki kez gönderilemez.

ERP `uuidgen()` kullanır. Test senaryosunda aynı UUID tekrar kullanılırsa reject.

### 4. "Signature Invalid"

XAdES-BES (Advanced Digital Signature with Basic Electronic Signature) zorunlu:
```xml
<ext:UBLExtension>
  <ext:ExtensionContent>
    <sig:UBLDocumentSignatures>
      <sac:SignatureInformation>
        <cbc:ID>mali-muhur</cbc:ID>
        <ds:Signature>
          <!-- RSA-SHA256 signature -->
        </ds:Signature>
      </sac:SignatureInformation>
    </sig:UBLDocumentSignatures>
  </ext:ExtensionContent>
</ext:UBLExtension>
```

Signature:
- **Mali Mühür** (firma için) — elektronik mühür
- **e-İmza** (gerçek kişi için)

Private key ERP'de yüklü olmalı. Expired ise signature invalid.

### 5. "Amount Mismatch"

```
LineExtensionAmount (satır toplamı) × VAT% + ... = TaxInclusiveAmount
```

Rounding hataları + XML total ile satır toplamı uyuşmazlığı. ERP hesaplar ama custom script'te manual integer/decimal karışıklığı.

**ERP'de currency exchange date uyumsuz**:
```xml
<cbc:LineExtensionAmount currencyID="USD">100</cbc:LineExtensionAmount>
<!-- Ama sonra -->
<cbc:TaxInclusiveAmount currencyID="TRY">3000</cbc:TaxInclusiveAmount>
```

TRY/USD dönüşümü dokümanda `cac:PricingExchangeRate` ile tanımlanmalı.

### 6. "Customization ID Invalid"

GİB UBL-TR 1.2 bekliyor:
```xml
<cbc:CustomizationID>TR1.2</cbc:CustomizationID>
<cbc:ProfileID>TEMELFATURA</cbc:ProfileID>  <!-- or TICARIFATURA, IHRACATIT -->
```

Profile'lar:
- `TEMELFATURA` — Temel fatura (B2C, e-arşiv)
- `TICARIFATURA` — B2B mükellefler arası
- `IHRACATIT` — İhracat

Yanlış profile → reject.

## Validation Tools

### Online
- https://www.gib.gov.tr/e-fatura-kontrol — GİB official
- https://efatura.test.gibtest.com.tr — Test ortamı

### Local Tool
- **e-Fatura Validator** (açık kaynak JAR): https://github.com/gibportal/e-fatura-validator
- XML üret → validator'a yapıştır → error/success

### ERP İçi Test
Logo/Mikro/Netsis'te "GİB Test Ortamı" modu. Production yerine GİB test endpoint'e gönder — fatura gerçek sisteme yazmaz ama validation sonucu gelir.

## Özel Durumlar

### İndirim (Allowance)

```xml
<cac:AllowanceCharge>
  <cbc:ChargeIndicator>false</cbc:ChargeIndicator>  <!-- false = indirim -->
  <cbc:AllowanceChargeReason>Loyalty discount</cbc:AllowanceChargeReason>
  <cbc:Amount currencyID="TRY">50</cbc:Amount>
</cac:AllowanceCharge>
```

### Stopaj

```xml
<cac:TaxTotal>
  <cbc:TaxAmount currencyID="TRY">0</cbc:TaxAmount>
  <cac:TaxSubtotal>
    <cbc:TaxAmount currencyID="TRY">20</cbc:TaxAmount>
    <cac:TaxCategory>
      <cac:TaxScheme>
        <cbc:TaxTypeCode>9015</cbc:TaxTypeCode>  <!-- Stopaj -->
      </cac:TaxScheme>
    </cac:TaxCategory>
  </cac:TaxSubtotal>
</cac:TaxTotal>
```

### KDV İstisnalı

```xml
<cac:TaxCategory>
  <cbc:TaxExemptionReasonCode>201</cbc:TaxExemptionReasonCode>
  <cbc:TaxExemptionReason>Ar-Ge faaliyetleri</cbc:TaxExemptionReason>
  <cac:TaxScheme>...</cac:TaxScheme>
</cac:TaxCategory>
```

GİB istisna kod listesi: https://gib.gov.tr resmi dokümanlar.

## İlgili Rehberler

- [e-Fatura GİB Portal entegrasyon](/blog/e-fatura-gib-portal-entegrasyon-sorunlari)
- [Logo Tiger SQL bağlantı sorunları](/blog/logo-tiger-sql-server-baglanti-sorunlari)

---

**e-Fatura + ERP entegrasyon danışmanlık için destek?** [Teknik görüşme.](/#contact)
