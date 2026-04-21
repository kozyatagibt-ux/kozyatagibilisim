---
slug: ad-event-2887-simple-bind-clear-text-ldap
title: "Event 2887 'Clear Text LDAP Binding Attempts' — LDAPS'e Geçiş Zamanı"
type: cluster
pillar: 2
url: "/blog/ad-event-2887-simple-bind-clear-text-ldap"
hedef_anahtar_kelime: "event 2887 ldap simple bind"
meta_description: "AD Event 2887 simple bind clear-text — LDAP authentication plain-text gidiyor. LDAPS'e geçiş için sertifika + port 636 yapılandırma."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "Event 2887"
product_family: "Windows Server & Active Directory"
---

## Denetim Öncesi Event Log İncelemesi

BT müdürü Selim ISO 27001 denetimi öncesi DC'lerin Directory Service log'unu inceliyor. Her gün 500+:

```
Event ID: 2887
Level: Warning
Source: ActiveDirectory_DomainService

During the previous 24 hour period, some clients attempted to 
perform LDAP binds that were:
(1) Unsigned over SSL/TLS/LDAPS connections.
   Number of simple binds performed without SSL/TLS: 847
(2) Simple bind over a cleartext (non-SSL/TLS-encrypted) LDAP 
    connection.
   Number of Negotiate/Kerberos/NTLM/Digest binds performed 
   over cleartext: 423
```

Denetçi görürse sertifika güvenlik uyarısı kesin. Selim 2 hafta önceden **LDAPS geçişini** yaptı. Bu yazı o süreci anlatıyor.

## Hızlı Çözüm (TL;DR)

1. Event 2887 hangi client IP'lerden geliyor? Loglarda tespit et
2. Her client'ın LDAPS (port 636) geçişine hazırlık
3. DC'de geçerli sertifika var mı kontrol
4. Uygulamaları LDAP → LDAPS config değişimi
5. Event 2887 azaldıkça "LDAP binding requirement" GPO ile enforcement

---

## Event 2887 Nedir?

Active Directory 24 saatte bir **özet rapor** yayınlar:
- **Sub-event 1**: LDAP connection signed değil (SASL sign/seal yok)
- **Sub-event 2**: Simple bind + clear-text parola

Her ikisi güvenlik riski. 2020'de Microsoft "LDAP signing enforcement" özelliği eklendi. 2024 itibarıyla pek çok kurum zorunlu hale getirdi.

## 10:00 — Selim Hangi Client'ları Tespit Ediyor

Event 2887 sadece **count** veriyor, hangi client bilgisi yok. Detay için:

### Event 1644 (LDAP Query logging)

DC'de registry:
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NTDS\Diagnostics
16 LDAP Interface Events = 2
```

Restart NTDS:
```powershell
Restart-Service NTDS -Force
```

Artık Event 1644 her LDAP query için log atılır. 24 saat sonra:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Directory Service'; Id=1644} -MaxEvents 500 |
    ForEach-Object {
        $xml = [xml]$_.ToXml()
        [PSCustomObject]@{
            Time = $_.TimeCreated
            Client = $xml.Event.EventData.Data | Where {$_.Name -eq 'Client'} | Select -ExpandProperty '#text'
            Operation = $xml.Event.EventData.Data | Where {$_.Name -eq 'Operation'} | Select -ExpandProperty '#text'
        }
    } | Group-Object Client | Sort Count -Descending | Select Count, Name -First 20
```

Çıktı:
```
Count Name (Client IP)
----- ----------------
 234  10.10.20.50  ← printer-kat2 (Konica)
 187  10.10.40.12  ← intranet-app-server
 102  10.10.10.7   ← monitoring-prtg
  45  10.10.20.51  ← printer-kat3
  ...
```

**Top 5 client** LDAP clear-text kullanıyor. Bu cihazları LDAPS'e çevirmek gerek.

## 10:15 — Her Cihaz için Migration

### Client 1: Konica Minolta Yazıcı

Web admin panel:
> Configuration > External Authentication > LDAP

| Eski ayar | Yeni ayar |
|---|---|
| Server: dc01.corp.firma.com.tr | Same |
| Port: **389** | **636** |
| Protocol: LDAP | **LDAPS** |
| Authentication: Simple bind (plain) | **Simple bind over SSL** |
| Certificate validation: Off | **On** (CA sertifika yüklemek gerekir) |

**Sertifika yüklemek**: Yazıcı config'ine iç CA sertifikası import ediliyor:
- Konica admin panel > Certificate Management > Trusted CA > Import
- İç CA'nın Root certificate (.cer veya .crt)

Test: Yazıcıdan "LDAP test user lookup" → başarılı.

### Client 2: Intranet Uygulaması

Uygulamanın config dosyası (örn. `web.config`, `app.properties`):

```xml
<!-- Önce -->
<ldap server="ldap://dc01.corp.firma.com.tr:389" 
      bind-dn="cn=svc_intranet,..." 
      bind-password="..." />

<!-- Sonra -->
<ldap server="ldaps://dc01.corp.firma.com.tr:636" 
      bind-dn="cn=svc_intranet,..." 
      bind-password="..." 
      ssl-validate="true"
      ssl-trust-ca="/etc/ssl/corp-ca.crt" />
```

Uygulama restart → yeni auth. Event 1644 log'larında bu IP artık **port 636** kullanır.

### Client 3: Monitoring PRTG

PRTG Auto-Discovery kullanıyorsa LDAP config:
- Settings > System Administration > User Accounts > Active Directory Integration
- Server URL: `ldaps://dc01.corp.firma.com.tr:636`

## 10:30 — DC'de Sertifika Kontrolü

LDAPS için DC'de **computer certificate** gerekli:
- Subject: DC'nin FQDN (`dc01.corp.firma.com.tr`)
- Enhanced Key Usage: Server Authentication (1.3.6.1.5.5.7.3.1)
- Key: 2048-bit RSA minimum

### Sertifika Var Mı Kontrol

```powershell
Get-ChildItem Cert:\LocalMachine\My | 
    Where {$_.Subject -match "CN=$env:COMPUTERNAME"} |
    Select Subject, NotAfter, EnhancedKeyUsageList
```

Liste boşsa → sertifika yok, LDAPS çalışmıyor.

### İç CA'dan Sertifika Alma

Firmanın iç Certificate Authority varsa (Windows Server CA):
```
Run > certlm.msc (Certificate Local Machine)
> Personal > Certificates
> Sağ tık > All Tasks > Request New Certificate
> Next > Domain Controller template seç > Enroll
```

Otomatik bir sertifika oluşturulur.

### LDAPS Test

```powershell
# Port 636 dinliyor mu?
Test-NetConnection dc01.corp.firma.com.tr -Port 636

# Daha detaylı LDAPS test
$cert = Get-ChildItem Cert:\LocalMachine\My | Where {$_.Subject -match "DC01"}
$cert.HasPrivateKey
```

Ayrıca **ldp.exe** ile interactive test:
1. Run > ldp
2. Connection > Connect
3. Server: dc01.corp.firma.com.tr, Port: **636**, SSL: ✓
4. Sonuç: Connected with details.

## 10:45 — 2 Hafta Sonra — Enforcement

2 hafta boyunca:
- Event 2887 count: 1270 → 320 → 45 → 8

Kalan 8 daha kimliği bilinmiyor, incele:
- IP 10.10.25.99 → VM'de bir dashboard script
- Script güncellendi

Şimdi Event 2887 = 0. Zorla enforcement zamanı.

### LDAP Signing Requirement

```
Computer Configuration > Policies > Windows Settings > 
Security Settings > Local Policies > Security Options >
"Domain controller: LDAP server signing requirements"

Value: Require signing  ← default "None"
```

Veya registry (LDAPServerIntegrity):
```powershell
# DC'de
Set-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Services\NTDS\Parameters" `
    -Name LDAPServerIntegrity -Value 2
```

Değerler:
- 0: None (default eski)
- 1: Negotiate signing
- **2: Require signing** (production)

Restart NTDS.

**Sonuç**: Signing olmayan/clear-text LDAP bind deneyen client **reddedilir** — hata döner.

### Client Tarafı da

Client'lar da imzalı bind istesin:
```
Network Security: LDAP client signing requirements
Value: Require signing
```

## Yaygın Hatalar

### "LDAP server certificate expired"

DC sertifikası yenilenmemiş. Aylık monitoring:
```powershell
Get-ChildItem Cert:\LocalMachine\My | 
    Where {$_.NotAfter -lt (Get-Date).AddDays(30)} |
    Select Subject, NotAfter
```

### Self-signed Sertifika Reddediliyor

Bazı client'lar (özellikle Linux openldap) self-signed kabul etmez. Çözüm:
- İç CA'dan sertifika al (Windows Server CA kur)
- Veya public CA (DigiCert, Sectigo) — pahalı ama herkes güvenir

### LDAPS Test Ediyor Ama Yavaş

İlk bağlantıda TLS handshake var — 100-200ms ekstra. Uygulama "bu yavaş" derse aslında normal. Yineleyen bağlantılarda connection pooling kullanmak.

### Sertifika CN Yanlış

Client `dc01.corp.firma.com.tr` bağlanıyor ama sertifikada CN farklı veya eksik. Test:
```powershell
# openssl test
openssl s_client -connect dc01.corp.firma.com.tr:636
```

Output içinde "subject=/CN=..." kısmı client'ın beklediğiyle eşleşmeli.

## Önleyici Strateji

### 1. Modern Auth Zorunlu

Yeni uygulamalar **LDAPS-only** kurulmalı. LDAP (389) internal bile olsa plain-text değer vermiyor.

### 2. Event 2887 Monitoring

Aylık kontrol:
```powershell
Get-WinEvent -FilterHashtable @{LogName='Directory Service'; Id=2887; StartTime=(Get-Date).AddDays(-7)}
```

Count artıyorsa yeni clear-text client var.

### 3. Sertifika Otomasyon

Active Directory Certificate Services (AD CS) ile auto-enrollment:
- DC sertifikaları otomatik yenilenir
- Group Policy ile
- 60 gün öncesinden yenileme

### 4. Dokümantasyon

Tüm LDAPS client'ları (yazıcılar, uygulamalar, monitoring araçları) listede:
- IP
- Hangi sertifika trust ediliyor
- Son test tarihi

## İlgili Rehberler

- [LDAP Error 49 Invalid Credentials](/blog/ad-ldap-error-49-invalid-credentials)
- [LDAPS sertifika + port 636 kurulumu](/blog/ad-ldaps-sertifika-port-636-kurulum)

---

**LDAP to LDAPS migration + sertifika yönetimi + audit hazırlığı için uzman destek?** Kozyatağı Bilişim AD hardening paketi. [Teknik görüşme.](/#contact)
