---
slug: ad-ldap-error-49-invalid-credentials
title: "LDAP Error 49 'Invalid Credentials' — Uygulama AD'ye Bağlanamıyor"
type: cluster
pillar: 2
url: "/blog/ad-ldap-error-49-invalid-credentials"
hedef_anahtar_kelime: "ldap error 49 invalid credentials"
meta_description: "Uygulama LDAP ile AD'ye bağlanamıyor: 'Error 49 — Invalid Credentials'. sub-error kodları (52e, 533, 773, 775), Service Account kontrolü ve çözüm."
kelime_sayisi: "~1400"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "LDAP Error 49"
product_family: "Windows Server & Active Directory"
---

## "Yeni Uygulamamız AD'ye Bağlanamıyor"

Geliştirme ekibi yeni bir intranet portalı canlıya aldı. LDAP authentication ile AD üzerinden login olmalı. Ama test kullanıcıları:

```
Application Error:
LDAP authentication failed.
[LDAP: error code 49 - 80090308: LdapErr: DSID-0C0903C8, 
comment: AcceptSecurityContext error, data 52e, v1db1]
```

Geliştirici BT'ye sordu:
> "Service account doğru yazdık, şifresi doğru. Ama LDAP Error 49 alıyoruz. 'data 52e' de var. Ne anlama geliyor?"

BT uzmanı Selin bu hatayı tanıdı. **Sub-status kodlarını** okuyarak 5 dakikada çözdü.

## Hızlı Çözüm (TL;DR)

LDAP Error 49 genel "Invalid Credentials". Asıl sorun **sub-status**:

| Data Code | Anlam | Çözüm |
|---|---|---|
| **52e** | Kullanıcı adı veya şifre yanlış | Credential kontrol |
| **525** | Kullanıcı bulunamadı | User DN yanlış veya silinmiş |
| **530** | Giriş saati dışı | Logon hours kısıtı |
| **531** | Workstation kısıtı | "Log On To" spesifik PC'lere kısıtlı |
| **532** | Şifre expired | Kullanıcı şifresini değiştirmeli |
| **533** | Account disabled | Hesap disabled durumunda |
| **701** | Account expired | Hesap expiration date geçmiş |
| **773** | Şifre must change on next logon | İlk girişte şifre değiştirme zorunluluğu |
| **775** | Account locked out | Çok hatalı deneme sonrası lock |

---

## Error 49 Genel Yapısı

```
LDAP: error code 49 - 80090308: LdapErr: DSID-0C0903C8, 
comment: AcceptSecurityContext error, data XXX, v1db1
```

Kritik kısım: **`data XXX`** — yukarıdaki tabloya bakın.

## 10:00 — Selin'in Analizi

Error: `data 52e`

**52e** = hex kodu, decimal **1326** = `ERROR_LOGON_FAILURE`. "Bu kullanıcı + bu şifre uyuşmuyor."

### İlk Test: Credential Manuel Kontrol

Service account: `svc_intranet@corp.firma.com.tr`

```powershell
# PowerShell ile LDAP bind test
$cred = Get-Credential svc_intranet
$user = [ADSI]("LDAP://DC01/CN=svc_intranet,OU=Service Accounts,DC=corp,DC=firma,DC=com,DC=tr")
$user.RefreshCache()
```

Credential sordu. Selin uygulamanın kullandığı şifreyi girdi. Hata:
```
Exception calling "RefreshCache" with "0" argument(s): 
"The user name or password is incorrect."
```

Şifre gerçekten yanlış! Geliştirici "doğru" demişti ama şifrede yazım hatası olmalı.

## 10:05 — Gerçek Sebep

Selin PowerShell ile bind testi yaparken şifreyi yazıp doğruladı. Sonra geliştiriciyle konuşuldu — uygulamanın config'inde **şifrenin sonunda fazla bir karakter** bırakılmıştı (`%`). Copy-paste hatası.

Config düzeltildi:
```
before: password="SvcPass!2024%"
after:  password="SvcPass!2024"
```

Uygulama restart → LDAP login çalıştı.

## Her Data Code İçin Detaylı Çözüm

### data 52e — Username/Password Mismatch

**En yaygın.** Sebepler:
- Typo
- Şifre değiştirilmiş ama uygulama config güncellenmedi
- Özel karakter encoding problemi (şifrede `$`, `&`, `<` gibi)
- Kullanıcı adı format yanlış: `username` vs `username@domain` vs `domain\username`

**Test**:
```powershell
# Actual LDAP bind
Import-Module ActiveDirectory
$credential = Get-Credential
Get-ADUser -Filter {SamAccountName -eq 'svc_intranet'} -Credential $credential
```

### data 525 — User Not Found

LDAP search ile kullanıcı bulunamadı:

**Çözüm**: User DN doğrula:
```powershell
Get-ADUser svc_intranet -Properties DistinguishedName | 
    Select DistinguishedName
```

Output:
```
DistinguishedName
-----------------
CN=svc_intranet,OU=Service Accounts,OU=IT,DC=corp,DC=firma,DC=com,DC=tr
```

Uygulamanın kullandığı DN **exact** bu olmalı. **Office2013** veya eski OU'da arıyorsa bulamaz.

### data 530 — Logon Hours Restriction

Kullanıcının giriş saati kısıtı:
> 📸 **Ekran 1** — ADUC > User > Account tab > Logon Hours  
> Matrix: 7 gün x 24 saat  
> Yeşil: Login allowed  
> Mavi: Login denied  
> Eğer user sadece 09-18 arası login yapabilirse ve uygulama gece 02'de bağlanıyorsa → 530

**Çözüm**: Service account'a "always allowed":
```powershell
Set-ADUser svc_intranet -LogonHours @(0xFF) * 21  # 24/7 active
```

### data 531 — Workstation Restriction

ADUC > User > Account tab > "Log On To..." butonu:
> 📸 **Ekran 2** — Logon Workstations dialog  
> Radio: "The following computers"  
> List: "DC01", "APP-SERVER-01" ← kısıtlı  
> Uygulama "APP-SERVER-02"den bağlanıyorsa → 531

**Çözüm**: "All computers" seç veya APP-SERVER-02'yi listeye ekle.

### data 532 — Password Expired

Şifre expire olmuş, yenilenmeli. Service account için bu genelde yanlış konfigürasyon:
```powershell
# Expiration kontrolü
Get-ADUser svc_intranet -Properties PasswordLastSet, PasswordExpired, PasswordNeverExpires | 
    Select Name, PasswordLastSet, PasswordExpired, PasswordNeverExpires

# Service account için "never expire"
Set-ADUser svc_intranet -PasswordNeverExpires $true
```

Bu "güvenlik açısından zayıf" bir ayar. Alternative: **gMSA** (Group Managed Service Account) — Windows kendisi otomatik rotate eder.

### data 533 — Account Disabled

Hesap disabled. Sebebi kontrol:
```powershell
Get-ADUser svc_intranet -Properties Enabled | Select Enabled
```

`False` ise:
```powershell
Enable-ADAccount -Identity svc_intranet
```

**Ama önce sebebi anlamalısın**. Belki disabled olma sebebi var (güvenlik, personel ayrıldı vs.).

### data 701 — Account Expired

Hesap "Account expires" tarihinde bitti:
```powershell
Get-ADUser svc_intranet -Properties AccountExpirationDate
```

Expiration kaldır:
```powershell
Clear-ADAccountExpiration -Identity svc_intranet
```

### data 773 — Must Change Password

İlk girişte şifre değiştirme zorunlu. Service account için:
```powershell
Set-ADUser svc_intranet -ChangePasswordAtLogon $false
```

### data 775 — Account Locked Out

Çok hatalı şifre denemesi sonrası kilit:
```powershell
Get-ADUser svc_intranet -Properties LockedOut | Select LockedOut
```

Unlock:
```powershell
Unlock-ADAccount -Identity svc_intranet
```

Sonra **kök sebebi araştır**: Kim yanlış şifreyle deniyordu? Eski config? Brute force attack?

## LDAP Query Tracing

Uygulamanın LDAP trafiğini görmek için **ldp.exe** (Microsoft tool):

1. Start → "ldp" yaz
2. Connection > Connect → Server: dc01.corp.firma.com.tr, Port 389 → OK
3. Connection > Bind → Credential
4. Browse veya search → uygulamanın yaptığını simüle et

Ldap.exe hata mesajlarını **daha detaylı** döndürür — hangi aşamada fail?

## Wireshark Capture

Daha derin tanı:
```
Filter: ldap
```

LDAP mesajları:
- **BindRequest** + **BindResponse** → login
- **SearchRequest** + **SearchResultEntry** → user lookup

BindResponse `resultCode` alanında:
- 0 = success
- 49 = invalidCredentials

Error 49'un hangi search/bind'te geldiği kritik.

## Önleyici Strateji

### 1. Service Account'u gMSA'ya Çevir

Geleneksel user account yerine **Group Managed Service Account**:
```powershell
# KDS Root Key (domain-wide, bir kez)
Add-KdsRootKey -EffectiveImmediately

# gMSA oluştur
New-ADServiceAccount -Name gmsa_intranet `
    -DNSHostName intranet.corp.firma.com.tr `
    -PrincipalsAllowedToRetrieveManagedPassword "IIS-Intranet-Group"

# Kullanıcı tarafı install
# Web server'da:
Install-ADServiceAccount -Identity gmsa_intranet
```

Avantaj:
- Şifre **her 30 günde otomatik rotate**
- IT manuel şifre değişikliği yapmaz — unutma riski yok
- "Password expired" hatası asla gelmez

### 2. Password Manager Entegrasyonu

Service account şifreleri **Bitwarden / HashiCorp Vault**'ta:
- Şifre değiştirildiğinde uygulama config otomatik güncellenir
- IT ekibi "şifre nerede?" demez
- Audit log: Kim ne zaman şifreyi çıkardı

### 3. Monitoring — Failed Binds

LDAP fail attempts:
```powershell
# Security log Event 4771 (Kerberos) veya uygulama log'ları
Get-WinEvent -FilterHashtable @{LogName='Directory Service'; Id=2887} -MaxEvents 100
```

2887 = "clear-text LDAP binds" (başka rehberde detay) ve bağlanma başarısızlıkları.

### 4. LDAPS Geçişi

LDAP (port 389) plain-text. **LDAPS (port 636)** TLS şifreli. 2024 itibarıyla modern standart:
```
Application config:
  Server: dc01.corp.firma.com.tr
  Port: 636
  SSL: Yes
  Certificate Validation: Yes
```

## Uygulama Bazlı Dikkat Noktaları

### Apache / Nginx LDAP Module

config örneği:
```nginx
auth_ldap_bind_dn "CN=svc_intranet,OU=Service Accounts,DC=corp,DC=firma,DC=com,DC=tr";
auth_ldap_bind_password "[password]";
auth_ldap_url "ldaps://dc01.corp.firma.com.tr:636/DC=corp,DC=firma,DC=com,DC=tr?sAMAccountName?sub?(objectClass=user)";
```

### Python (python-ldap)

```python
import ldap

conn = ldap.initialize("ldaps://dc01.corp.firma.com.tr:636")
try:
    conn.simple_bind_s("svc_intranet@corp.firma.com.tr", "password")
except ldap.INVALID_CREDENTIALS as e:
    print(f"Error 49: {e}")
    # e.args[0]["info"] içinde data code var
```

### Java (LDAP)

```java
Hashtable<String, Object> env = new Hashtable<>();
env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
env.put(Context.PROVIDER_URL, "ldaps://dc01.corp.firma.com.tr:636");
env.put(Context.SECURITY_PRINCIPAL, "svc_intranet@corp.firma.com.tr");
env.put(Context.SECURITY_CREDENTIALS, "password");
```

## İlgili Rehberler

- [LDAPS sertifika + port 636 kurulumu](/blog/ad-ldaps-sertifika-port-636-kurulum)
- [gMSA Group Managed Service Account](/blog/ad-gmsa-group-managed-service-account-sql)
- [Kerberos KRB_AP_ERR_MODIFIED](/blog/kerberos-krb-ap-err-modified-event-4771)

---

**AD integration + service account yönetimi + LDAP hardening için uzman destek?** Kozyatağı Bilişim AD infrastructure paketimiz. [Teknik görüşme.](/#contact)
