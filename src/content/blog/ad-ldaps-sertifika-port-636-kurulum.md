---
slug: ad-ldaps-sertifika-port-636-kurulum
title: "LDAPS Kurulum — Port 636 + Sertifika Import Adım Adım"
type: cluster
pillar: 2
url: "/blog/ad-ldaps-sertifika-port-636-kurulum"
hedef_anahtar_kelime: "ldaps kurulum sertifika port 636"
meta_description: "Active Directory'de LDAPS (LDAP over SSL) kurulum — iç CA'dan sertifika, DC'ye import, port 636 test. Clear-text LDAP'ten güvenli geçiş."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "LDAPS Setup"
product_family: "Windows Server & Active Directory"
---

## "LDAP'ten LDAPS'e Geçiş Yapacağız"

ISO 27001 hazırlığı: LDAP traffic clear-text. Yazıcı, monitoring aracı, intranet uygulaması hepsi plain-text şifre gönderiyor. **LDAPS** (port 636, TLS) zorunlu.

BT uzmanı Selin sürece şöyle yaklaştı:
1. İç CA'dan DC için sertifika
2. DC'ye import
3. LDAPS test (port 636)
4. Client'ları LDAPS'e geçir
5. Clear-text LDAP (port 389) monitoring

Bu yazı adımları anlatıyor.

## Hızlı Çözüm (TL;DR)

1. DC'de built-in "Domain Controller" certificate template'inden sertifika request
2. Local Machine > Personal > Certificates'a import
3. LDAPS otomatik aktif (Windows NTDS her 8 saatte tarayıp yeni sertifika bulur)
4. Test: `ldp.exe` > Connect > Port 636 > SSL ✓
5. Client'larda LDAPS URL: `ldaps://dc01.corp.firma.com.tr:636`

---

## Neden LDAPS?

| | LDAP (389) | LDAPS (636) |
|---|---|---|
| Encryption | Yok | TLS 1.2+ |
| Credential | Clear-text | Encrypted |
| Eavesdrop riski | Yüksek | Yok |
| KVKK/ISO uyum | Zayıf | Şart |

Yerleşik hale geldi — 2024 itibarıyla LDAPS yeni kurumsal standart.

## 10:00 — Sertifika Gereksinimleri

### LDAPS Sertifikası İçin Şartlar

- Subject/CN: DC'nin FQDN'i (ör. `dc01.corp.firma.com.tr`)
- Subject Alternative Names (SAN): DC FQDN + NetBIOS name
- Enhanced Key Usage: **Server Authentication** (1.3.6.1.5.5.7.3.1)
- Public key algoritması: RSA 2048-bit+ (ya da ECDSA)
- Private key exportable değil (güvenlik)

**Seçenekler**:
- **Enterprise CA** (Windows Server ADCS): Built-in "Domain Controller" template otomatik tüm gereksinimleri karşılar
- **Public CA** (DigiCert, Sectigo): Mümkün ama pahalı, genelde iç CA tercih
- **Self-signed**: Son çare, client'lar güvenmeyebilir

## 10:10 — Enterprise CA Kurulumu (CA Yoksa)

Firmada iç CA yoksa kur:

### Adım 1: AD CS Role Install (bir server'da)

```powershell
# CA server'da (DC olmayan ayrı server tercih edilir)
Install-WindowsFeature AD-Certificate, ADCS-Cert-Authority -IncludeManagementTools
```

### Adım 2: CA Configure

```powershell
Install-AdcsCertificationAuthority `
    -CAType EnterpriseRootCa `
    -CryptoProviderName "RSA#Microsoft Software Key Storage Provider" `
    -KeyLength 2048 `
    -HashAlgorithmName SHA256 `
    -ValidityPeriod Years `
    -ValidityPeriodUnits 10 `
    -Confirm:$false
```

CA 10 yıl geçerli. Reboot.

## 10:20 — DC'ye Sertifika Dağıtımı

### Otomatik Dağıtım (Auto-Enrollment)

Enterprise CA + GPO ile **tüm DC'lere otomatik** sertifika dağıtımı:

#### GPO Ayarı

```
Computer Configuration > Policies > Windows Settings > 
Security Settings > Public Key Policies > 
Certificate Services Client - Auto-Enrollment: Enabled
```

Alt seçenekler:
- ☑ Renew expired certificates, update pending certificates, and remove revoked certificates
- ☑ Update certificates that use certificate templates

GPO'yu Domain Controllers OU'suna link.

#### Certificate Template Izin

CA MMC (certsrv.msc):
> 📸 **Ekran 1** — Certificate Templates  
> Sol panel: CA > Certificate Templates sağ tık > Manage  
> Templates listesi:  
> - Computer  
> - Domain Controller  
> - Domain Controller Authentication  
> - Kerberos Authentication  
>   
> "Domain Controller Authentication" sağ tık > Properties  
> **Security** tab:  
> - Domain Controllers group: Read + Enroll + **Autoenroll** işaretli  
> Apply

### Adım 3: DC'de Zorla Enrollment

DC01'de:
```powershell
certutil -pulse
```

Auto-enroll çalışır, yeni sertifika CA'dan alır + Local Machine > Personal > Certificates'e koyar.

### Manuel Enrollment (Auto-Enroll Çalışmıyorsa)

```
Run → certlm.msc (Certificates - Local Computer)
```

> 📸 **Ekran 2** — certlm.msc  
> Sol ağaç: Certificates - Local Computer > Personal > Certificates  
> Sağ tık "Certificates" klasörü  
> All Tasks > Request New Certificate...  
>   
> Wizard:  
> Select Certificate Enrollment Policy: Active Directory Enrollment Policy (default)  
> Next  
>   
> Templates listesi:  
> ☑ Domain Controller Authentication  
> Enroll

Sertifika alındı, DC'nin cert store'unda.

## 10:30 — Sertifikayı Doğrulama

```powershell
Get-ChildItem Cert:\LocalMachine\My | 
    Where {$_.Subject -match "DC01"} |
    Select Subject, NotAfter, @{N='EKU';E={$_.Extensions | Where {$_.Oid.Value -eq "2.5.29.37"} | Select -ExpandProperty Format}}
```

Çıktı:
```
Subject  : CN=DC01.corp.firma.com.tr
NotAfter : 5/11/2025 10:30:45 AM
EKU      : Server Authentication (1.3.6.1.5.5.7.3.1), Client Authentication (1.3.6.1.5.5.7.3.2)
```

Server Authentication EKU var → LDAPS için geçerli.

## 10:35 — LDAPS Test

### NTDS Service LDAPS Bind

Windows otomatik olarak NTDS'nin LDAPS için yeni sertifikayı aktive eder. Ama manuel tetikleme:

```cmd
# LDAPS binding'i force refresh
dsquery *
```

Veya NTDS restart:
```powershell
Restart-Service NTDS -Force
```

### ldp.exe ile Interactive Test

Built-in Microsoft tool:

> 📸 **Ekran 3** — ldp.exe Connect  
> Run → ldp  
> Menu: Connection > Connect  
> Dialog:  
> - Server: dc01.corp.firma.com.tr  
> - Port: **636**  
> - ☑ **SSL**  
> OK

Başarılı çıktı:
```
ld = ldap_sslinit("dc01.corp.firma.com.tr", 636, 1);
Established connection to dc01.corp.firma.com.tr.
Retrieving base DSA information...
Getting 1 entries:
Dn: (RootDSE)
currentTime: 5/12/2024 10:36:22 AM ...
...
```

"**Established connection**" = LDAPS çalışıyor.

Sonra bind test:
```
Connection > Bind
User: admin@corp.firma.com.tr
Password: ●●●●
Bind type: Simple bind
```

`Authenticated as: CORP\admin` → başarılı.

### PowerShell LDAPS Test

```powershell
$cred = Get-Credential
$ldap = New-Object System.DirectoryServices.DirectoryEntry `
    "LDAP://dc01.corp.firma.com.tr:636", `
    $cred.UserName, `
    $cred.GetNetworkCredential().Password, `
    ([System.DirectoryServices.AuthenticationTypes]::SecureSocketsLayer)

$ldap.Name
$ldap.Path
```

Hata vermezse LDAPS OK.

### openssl ile Sertifika İncele

```bash
openssl s_client -connect dc01.corp.firma.com.tr:636 -showcerts
```

Output'ta:
```
subject=/CN=dc01.corp.firma.com.tr
issuer=/CN=Corp Firma CA/...
```

Subject ve issuer bilgileri — sertifika doğru DC için mi.

## 11:00 — Client Tarafı Güncellemeler

Her LDAP kullanıcısı config'i LDAPS'e çevir.

### Yazıcı

Web admin panel > Authentication > LDAP:
```
Server URL: ldaps://dc01.corp.firma.com.tr:636  (önce: ldap://...:389)
SSL: ON
Certificate validation: ON (veya OFF başta, sonra güvenli CA import sonrası ON)
```

### Uygulama (web.config veya benzer)

```xml
<!-- Önce -->
<ldap url="ldap://dc01.corp.firma.com.tr:389" />

<!-- Sonra -->
<ldap url="ldaps://dc01.corp.firma.com.tr:636" validate-cert="true" />
```

### Linux / openldap

```
# /etc/openldap/ldap.conf
URI ldaps://dc01.corp.firma.com.tr:636
TLS_CACERT /etc/ssl/corp-ca.crt
TLS_REQCERT demand
```

### Client CA Trust

Client'lar **iç CA'ya güvenmeli**. Windows domain-joined client'lar otomatik trust eder (GPO ile). Non-domain veya Linux:

Windows:
```powershell
Import-Certificate -FilePath "C:\Temp\CorpFirmaCA.cer" -CertStoreLocation Cert:\LocalMachine\Root
```

Linux:
```bash
cp corp-firma-ca.crt /etc/pki/ca-trust/source/anchors/
update-ca-trust
```

## Monitoring — Clear Text LDAP Azalıyor mu?

LDAPS'e geçiş sonrası Event 2887 azalmalı:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Directory Service'; Id=2887; StartTime=(Get-Date).AddDays(-7)} |
    Select TimeCreated, Message
```

Her gün count azalıyorsa → doğru yolda.

[Event 2887 detayı](/blog/ad-event-2887-simple-bind-clear-text-ldap).

## Yaygın Hatalar

### "LDAP server certificate verification failed"

Client iç CA'ya güvenmiyor. CA sertifikasını client trust store'a import et.

### ldp.exe "Cannot open connection" port 636

- DC'de sertifika yüklü mü? `Get-ChildItem Cert:\LocalMachine\My | Where {$_.EnhancedKeyUsageList -match "Server Authentication"}`
- NTDS service çalışıyor mu?
- Firewall port 636 açık mı?

### Sertifika Expire Oldu, LDAPS Kesildi

Sertifikalar 1 yıl (auto-enroll) genelde. Yenileme 60 gün önceden otomatik — ama monitoring gerekli:

```powershell
# Günlük scheduled task
$cert = Get-ChildItem Cert:\LocalMachine\My | Where {$_.EnhancedKeyUsageList -match "Server Authentication"} | 
    Sort NotAfter | Select -First 1

if ($cert.NotAfter -lt (Get-Date).AddDays(30)) {
    Send-MailMessage -Subject "DC01 Certificate expires soon" ...
}
```

### LDAPS Çalışıyor ama Yavaş

İlk bağlantıda TLS handshake ~100-200ms ekler. Normal. Yineleyen bağlantılarda connection pooling — uygulamanın performance için kritik.

## Enforcement — Clear-Text LDAP'i Tamamen Kapa

Tüm client'lar LDAPS'e geçtikten sonra:

```
GPO: Computer Config > Policies > Windows Settings > 
Security Settings > Local Policies > Security Options >
Domain controller: LDAP server signing requirements

Value: Require signing
```

Client ayarı:
```
Network security: LDAP client signing requirements
Value: Require signing
```

Clear-text LDAP tamamen reddedilir. Event 2887 = 0.

## İlgili Rehberler

- [Event 2887 Simple bind clear-text LDAP](/blog/ad-event-2887-simple-bind-clear-text-ldap)
- [LDAP Error 49 Invalid Credentials](/blog/ad-ldap-error-49-invalid-credentials)
- [FortiGate SSL-VPN Server Certificate](/blog/fortigate-ssl-vpn-server-certificate-hatasi)

---

**LDAPS deployment, PKI infrastructure ve kurumsal sertifika yönetimi için uzman destek?** Kozyatağı Bilişim AD hardening + PKI paketimiz. [Teknik görüşme.](/#contact)
