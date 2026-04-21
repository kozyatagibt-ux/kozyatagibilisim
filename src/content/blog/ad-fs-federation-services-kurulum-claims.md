---
slug: ad-fs-federation-services-kurulum-claims
title: "AD FS (Federation Services) Kurulum — SaaS için SSO + Claim Rules"
type: cluster
pillar: 2
url: "/blog/ad-fs-federation-services-kurulum-claims"
hedef_anahtar_kelime: "ad fs kurulum federation services"
meta_description: "Active Directory Federation Services (AD FS) kurulum — SaaS uygulamalara SSO, claim rules, relying party trust. Salesforce örneği ile adım adım."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "AD FS Setup"
product_family: "Windows Server & Active Directory"
---

## "5 SaaS Aboneliğimiz Var, Hepsi Ayrı Şifre"

BT müdürü kullanıcı şikayetlerini biriktirdi:
- Salesforce ayrı şifre
- DocuSign ayrı
- Zendesk ayrı
- Jira ayrı
- Concur ayrı

Kullanıcılar aynı şifreyi her yere yazıyor → güvenlik sıfır. Çözüm: **AD FS + SAML SSO**. Tek AD şifresiyle hepsi.

Bu yazı AD FS kurulumunu + Salesforce relying party örneğini anlatıyor.

## Hızlı Çözüm (TL;DR)

1. Ayrı Windows Server'a **AD FS role** install
2. Sertifika al (public CA'dan, vpn.firma.com.tr gibi)
3. AD FS service account (gMSA) hazırla
4. **AD FS Farm** setup: `Install-AdfsFarm`
5. Public DNS: `adfs.firma.com.tr` → AD FS server IP
6. WAP (Web Application Proxy) — public internet için
7. Relying party trust (SAML app için) ekle — Salesforce, DocuSign...
8. Claim rules yaz

---

## Mimari

```
İç user (mehmet.yilmaz)
    ↓ AD kimlik
AD FS server (sts.firma.com.tr)
    ↓ SAML token
Salesforce / Zendesk / DocuSign
    ↑ access
```

AD FS:
- SAML 2.0 veya WS-Federation ile SaaS'a token üretir
- Token içinde **claims** (email, department, role)
- SaaS bu token'a güvenir, kullanıcıyı içeri alır

## 10:00 — AD FS Server Hazırlığı

### Ön Koşullar

- **Ayrı server** (DC'de değil). Windows Server 2016/2019/2022
- **Statik IP**, domain-joined
- **Public CA sertifikası** — Subject: `adfs.firma.com.tr`

### Adım 1: Sertifika

Public CA'dan (DigiCert, GlobalSign, Let's Encrypt):
- Common Name: `adfs.firma.com.tr`
- SAN: `adfs.firma.com.tr`, `enterpriseregistration.firma.com.tr`
- Key: 2048-bit RSA

PFX formatında indir. Local Machine > Personal store'a import.

### Adım 2: DNS

Public DNS:
```
adfs.firma.com.tr → public IP (WAP veya direkt AD FS)
enterpriseregistration.firma.com.tr → same
```

İç DNS (iç kullanıcılar için):
```
adfs.firma.com.tr → iç AD FS IP (10.10.20.50)
```

Split DNS.

### Adım 3: gMSA for AD FS

```powershell
# KDS Root Key (yoksa)
Add-KdsRootKey -EffectiveImmediately

# gMSA
New-ADServiceAccount -Name "gmsa_adfs" `
    -DNSHostName "adfs.firma.com.tr" `
    -PrincipalsAllowedToRetrieveManagedPassword "ADFS-Servers"

# ADFS-Servers grup (hedef sunucular)
New-ADGroup -Name "ADFS-Servers" -GroupScope Global -GroupCategory Security
Add-ADGroupMember -Identity "ADFS-Servers" -Members "ADFS-01$"

# Sunucuda install
Install-ADServiceAccount -Identity gmsa_adfs
```

## 10:15 — AD FS Role Install

```powershell
Install-WindowsFeature ADFS-Federation -IncludeManagementTools
```

5 dakika. Reboot gerekmez.

## 10:20 — AD FS Farm Setup

```powershell
Install-AdfsFarm `
    -CertificateThumbprint "abc123..." `
    -FederationServiceName "adfs.firma.com.tr" `
    -GroupServiceAccountIdentifier "corp\gmsa_adfs$"
```

- **CertificateThumbprint**: Local Machine > Personal'da import edilen sertifikanın thumbprint
- **FederationServiceName**: Public DNS'teki adres
- **GroupServiceAccountIdentifier**: gMSA

5 dakika. AD FS servisi başlar.

### Verification

```powershell
Get-AdfsProperties | Select HostName, Identifier
```

Çıktı:
```
HostName    : adfs.firma.com.tr
Identifier  : http://adfs.firma.com.tr/adfs/services/trust
```

Browser'dan:
```
https://adfs.firma.com.tr/adfs/ls/IdpInitiatedSignon.aspx
```

AD FS login sayfası açılır. Sign in → domain credentials → "You are signed in."

Bu "IdP-initiated" sign-on sayfası AD FS kendini test için.

## 10:30 — Web Application Proxy (Public Internet için)

AD FS'yi direkt public internet'e açmak güvenlik riski. **WAP** reverse proxy:

DMZ'de ayrı server:
```powershell
Install-WindowsFeature Web-Application-Proxy -IncludeManagementTools

Install-WebApplicationProxy `
    -FederationServiceName "adfs.firma.com.tr" `
    -CertificateThumbprint "abc123..." `
    -FederationServiceTrustCredential (Get-Credential)
```

Public internet → WAP (DMZ) → AD FS (iç network).

## 10:45 — Salesforce için Relying Party Trust

### Salesforce Tarafı (Metadata)

Salesforce Setup > Single Sign-On Settings:
- Edit → SAML Enabled
- Issuer: https://adfs.firma.com.tr/adfs/services/trust
- Entity Id: https://saml.salesforce.com
- Identity Provider Certificate: AD FS public sertifika
- Identity Provider Login URL: https://adfs.firma.com.tr/adfs/ls
- SAML Identity Type: Email Address

Salesforce **metadata URL'i** verir: `https://firma-dev-ed.my.salesforce.com/services/saml2/metadata`

### AD FS Tarafı

AD FS Management > Relying Party Trusts > Add Relying Party Trust:

> 📸 **Ekran 1** — Add RPT Wizard  
> Data Source:  
>   ● Import data about the relying party from a file (metadata URL)  
>   URL: https://firma-dev-ed.my.salesforce.com/services/saml2/metadata  
> Next  
>   
> Display Name: "Salesforce"  
>   
> Access Control Policy: **Permit everyone** (başlangıç için)  
>   
> Finish  
> ☑ "Configure claims issuance policy for this application" → Close

### Claim Rules

Rule 1 — Send Email as NameID:

> 📸 **Ekran 2** — Claim Rule  
> Rule Template: Send LDAP Attributes as Claims  
> Name: "Send Email"  
> Attribute Store: Active Directory  
> Mapping:  
>   LDAP Attribute: E-Mail-Addresses  
>   → Outgoing Claim Type: E-Mail Address  

Rule 2 — Transform Email to NameID:

> 📸 **Ekran 3** — Transform Rule  
> Rule Template: Transform an Incoming Claim  
> Name: "Email as NameID"  
> Incoming: E-Mail Address  
> Outgoing: Name ID  
> Outgoing name ID format: **Email**  

Rule 3 (opsiyonel) — Department claim:
```
LDAP Attribute: department → Outgoing: http://schemas.salesforce.com/department
```

## 11:00 — Test

Kullanıcı Salesforce'a git:
- `https://firma.my.salesforce.com`
- "Log in with SSO"
- Redirect: `https://adfs.firma.com.tr/adfs/ls`
- Credentials (AD) gir
- Redirect: Salesforce'a SAML token ile
- Giriş yapıldı ✓

**Şifre Salesforce'ta yok** — AD değişince SSO'da otomatik güncel.

## Monitoring

AD FS Event Log:
```
Windows Logs > Applications and Services Logs > AD FS > Admin
```

Event ID:
- 100 — Successful auth
- 364 — Auth failed (detay reason kodlarıyla)
- 342 — Token issued

Failed auth pattern varsa brute force alarm.

## İkinci Factor Auth — MFA

AD FS MFA entegrasyonu:
```
AD FS Management > Authentication Methods > Multi-factor
Providers: Windows Authentication, Certificate, ...
```

Azure MFA adapter yükleyince:
```powershell
# Azure AD PowerShell ile tenant ayarı
Set-MsolDomainAuthentication -DomainName firma.com.tr -Authentication Federated
```

Salesforce'a giriş yaparken AD FS MFA adımı — push, SMS, authenticator.

## Yaygın Hatalar

### "An error occurred" Salesforce'tan döndüğünde

AD FS tarafında Claim Rule yanlış. Inspector browser extension (SAML Tracer) ile SAML response analiz.

### AD FS Certificate Expired

Yıllık yenileme. Event 356:
```
Service certificate for this federation server has expired
```

Yeni sertifika + binding yenile:
```powershell
Set-AdfsSslCertificate -Thumbprint "new_thumbprint"
Restart-Service adfssrv
```

### MFA Loop

Conditional Access ile AD FS MFA çakışabilir. Tek yerden MFA (ya CA ya AD FS).

### Metadata Outdated

Salesforce federation değişikliklerinde metadata değişir. RPT yenile:
```powershell
Update-AdfsRelyingPartyTrust -TargetName "Salesforce"
```

## Modern Alternative — Azure AD

AD FS 2016+ sonrası Microsoft **Azure AD (Entra ID)** tercihini öneriyor. Azure AD Connect ile hybrid → SaaS'lar Azure AD ile SSO. AD FS daha az gerekli.

Karar:
- **AD FS**: Tamamen on-prem istiyorsan, tam kontrol, bulut riski istemiyorsan
- **Azure AD**: Modern, maintenance'sız, hızlı deploy — çoğu kurumsal için öneri

## İlgili Rehberler

- [Azure AD Connect sync](/blog/ad-azure-ad-connect-sync-kurulum-filtering)
- [FortiGate SSL-VPN Server Certificate](/blog/fortigate-ssl-vpn-server-certificate-hatasi)

---

**AD FS deployment, SAML SSO, federation yönetimi için uzman destek?** Kozyatağı Bilişim identity paketimiz. [Teknik görüşme.](/#contact)
