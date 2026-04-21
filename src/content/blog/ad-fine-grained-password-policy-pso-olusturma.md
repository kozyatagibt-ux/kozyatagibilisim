---
slug: ad-fine-grained-password-policy-pso-olusturma
title: "AD Fine-grained Password Policy (PSO) — Yöneticiler için 20 Karakter Zorunlu"
type: cluster
pillar: 2
url: "/blog/ad-fine-grained-password-policy-pso-olusturma"
hedef_anahtar_kelime: "fine-grained password policy pso"
meta_description: "Active Directory'de Fine-grained Password Policy (PSO) ile domain admin ve yönetici hesaplarına özel güçlü şifre kuralları. Ekran görüntülü adım adım."
kelime_sayisi: "~1700"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "PSO Configuration"
product_family: "Windows Server & Active Directory"
---

## Denetimden Çıkan Bulgu

ISO 27001 sertifikasyon iç denetiminde danışman BT sorumlusu Selin'e net söyledi:

> "Şirketinizde **Domain Admins** grubundakiler diğer kullanıcılarla aynı 8 karakter şifreyle çalışıyor. Yönetici hesapları yüksek riskli — **minimum 20 karakter, 90 gün yenileme** olmalı. Domain seviyesi policy'yi 20'ye çekerseniz 200 kullanıcı işini yapamaz. Bu yüzden **Fine-grained Password Policy (PSO)** kullanmanız gerek."

Selin bu feature'ı daha önce duymuştu ama hiç yapmamıştı. Bu yazı Selin'in o öğleden sonra yaptığı işlemleri anlatıyor.

## Hızlı Çözüm (TL;DR)

1. `adsiedit.msc` veya `Active Directory Administrative Center` aç
2. **Password Settings Container** → Yeni **Password Settings** oluştur
3. Minimum Password Length: 20
4. Precedence: 1 (domain policy'den yüksek)
5. "Applies To" → Domain Admins grubu seç
6. Kullanıcıya sonraki girişte şifre değiştirme zorunlu yap

---

## Neden PSO?

Default Domain Policy tek bir şifre kuralı dayatır — tüm domain kullanıcılarına. Ama gerçek ihtiyaç:

| Kullanıcı tipi | Şifre gereksinimi |
|---|---|
| Standart çalışan | 8 karakter, 90 gün |
| Yönetici (manager) | 12 karakter, 60 gün |
| Domain Admin | 20 karakter, 60 gün + MFA |
| Service Account | 32 karakter rastgele, değişmez |

Fine-grained Password Policy tam bu çoklu kuralları tek domain'de uygulamayı sağlar. Windows Server 2008+ feature. Domain Functional Level en az Windows Server 2008 olmalı.

## 14:00 — Ön Kontrol: Functional Level

PowerShell DC'de admin olarak:

```powershell
Get-ADDomain | Select DomainMode
```

Çıktı:
```
DomainMode
----------
Windows2016Domain
```

PSO için minimum `Windows2008Domain` yeterli. 2016+ sınırlamasız.

## 14:05 — Active Directory Administrative Center'ı Aç

Selin Start'a "Active Directory Administrative Center" yazdı:

> 📸 **Ekran 1** — Active Directory Administrative Center (ADAC)  
> Pencere başlığı: "Active Directory Administrative Center"  
> Üst menü: Manage, Help  
> Sol panel: Domain adı (corp (local)), Users, Computers, System, Tree ayrımı  
> Sağ panel: Tasks ve Welcome ekranı  
> Bu ADAC, eski ADUC'tan farklı — daha modern arayüz.

Sol panelde **corp (local) → System → Password Settings Container** bul:

```
corp (local)
  └─ System
     └─ Password Settings Container ← Burası
```

> 📸 **Ekran 2** — Password Settings Container  
> Sol ağaçta "System" altında "Password Settings Container" seçili  
> Sağ panel: "Tasks" başlığında butonlar:  
> - "New > Password Settings"  
> - "Filter"  
> Şu an container boş — henüz PSO yok.

## 14:10 — Yeni PSO Oluştur

Sağ panelde "Tasks → New → Password Settings" tıklandı:

> 📸 **Ekran 3** — Create Password Settings dialog  
> Pencere başlığı: "Create Password Settings"  
> Alanlar:  
> - Name: (boş)  
> - Precedence: (boş, number)  
> - Minimum password length: (default 7)  
> - Password history: (default 24)  
> - Minimum password age (days): (1)  
> - Maximum password age (days): (42)  
> - "Password must meet complexity requirements" checkbox  
> - "Store password using reversible encryption" checkbox  
> - "Protect from accidental deletion" checkbox  
> - Account lockout bölümü  
> - "Directly Applies To" bölümü  

Selin doldurdu:

```
Name: PSO-DomainAdmins
Precedence: 1
Minimum password length: 20
Password history: 24
Minimum password age: 1
Maximum password age: 60
Password must meet complexity requirements: ✓
Protect from accidental deletion: ✓

Account lockout:
- Number of failed logon attempts allowed: 3
- Reset failed logon attempts count after: 15 minutes
- Account will be locked out: 30 minutes
```

### Precedence Açıklaması

PSO'lar kullanıcıya birden fazla uygulanırsa **en düşük precedence** kazanır:
- Precedence 1 → en güçlü
- Precedence 10 → daha zayıf

Domain Admins PSO'su 1 olmalı. Normal kullanıcı PSO'su 10 olmalı (böyle bir policy varsa).

### "Applies Directly To" — Grup veya Kullanıcı

Bu PSO kime uygulanacak? **Domain Admins** grubuna bağla:

> 📸 **Ekran 4** — Directly Applies To bölümü  
> Ekranın alt yarısında "Directly Applies To" başlıklı list box  
> Sağda "Add..." butonu tıklanıyor.  
> Yeni dialog: "Select Users or Groups"  
> Input: "Domain Admins" yazılıyor → "Check Names" tıkla → bold altı çizgili  
> OK basılıyor.  
> Liste kutusuna "Domain Admins" eklendi.

**Kritik not**: "Applies To" sadece **güvenlik grupları** kabul eder (distribution list değil) VE grup **global veya universal** olmalı. Domain local ise çalışmaz.

### Kaydet

Pencere altında "OK" butonu. PSO kaydedildi.

## 14:20 — Doğrulama

### Test 1: PSO Container'da Görünüyor Mu?

ADAC → Password Settings Container:

> 📸 **Ekran 5** — Password Settings Container (yeni PSO ile)  
> Sağ panelde "PSO-DomainAdmins" listeleniyor  
> Sütunlar: Name, Precedence, Applies To, Min Password Length  
> Değer: "PSO-DomainAdmins", "1", "Domain Admins", "20"

### Test 2: Kullanıcıya Uygulanıyor Mu?

```powershell
# Selin'in kendi admin hesabı için PSO uygulanıp uygulanmadığını kontrol
Get-ADUserResultantPasswordPolicy -Identity "selin.kara.admin"
```

Çıktı:
```
AppliesTo                    : {CN=PSO-DomainAdmins,CN=Password Settings Container,...}
ComplexityEnabled            : True
DistinguishedName            : CN=PSO-DomainAdmins,CN=Password Settings Container,...
LockoutDuration              : 00:30:00
LockoutObservationWindow     : 00:15:00
LockoutThreshold             : 3
MaxPasswordAge               : 60.00:00:00
MinPasswordAge               : 1.00:00:00
MinPasswordLength            : 20
Name                         : PSO-DomainAdmins
ObjectClass                  : msDS-PasswordSettings
Precedence                   : 1
PasswordHistoryCount         : 24
ReversibleEncryptionEnabled  : False
```

**MinPasswordLength: 20** — PSO aktif.

Eğer PSO **uygulanmıyorsa** cevap:
```
Name                         : Default Domain Policy
...
MinPasswordLength            : 8
```

Bu durumda grup üyeliğini kontrol et:
```powershell
Get-ADUser -Identity "selin.kara.admin" -Properties MemberOf | 
    Select -ExpandProperty MemberOf
```

Domain Admins listede olmalı.

## 14:30 — Kullanıcıları Bilgilendirme

Selin Domain Admins'te toplam 5 kişi. Her birine özel e-mail:

```
Konu: Domain admin hesabınız için şifre politikası değişikliği

Merhaba,

ISO 27001 denetimi doğrultusunda Domain Admin hesaplarının şifre
politikası güncellendi:

• Minimum 20 karakter (önceki: 8)
• 60 günde bir yenileme (önceki: 90)
• 3 hatalı deneme sonrası 30 dk lock
• Son 24 şifrenin tekrarı yasak

BT Admin hesabınız: selin.kara.admin
Değişiklik: [Tarih 14:30] itibariyle geçerli
Sonraki giriş: Şifrenizi değiştirmeniz istenecek

Password manager (Bitwarden) kullanıyorsanız generator ile
20+ karakter + 4 karakter tipi (büyük/küçük/sayı/özel) üretin.

Sorularınız için: ...
```

## 14:45 — Zorunlu Değişim

Kullanıcıların bir sonraki girişte şifre değiştirmeleri için:

```powershell
# Domain Admins grubundaki tüm hesaplara "must change password at next logon"
$domainAdmins = Get-ADGroupMember -Identity "Domain Admins"
foreach ($user in $domainAdmins) {
    Set-ADUser -Identity $user -ChangePasswordAtLogon $true
}
```

Sonraki logon'da kullanıcı şifresini değiştirmek zorunda. 8 karakter şifreyle giremez — yeni şifre PSO'nun gereksinimlerini (20 karakter, complexity) karşılamalı.

## 14:50 — Multiple PSO Örnekleri

Selin tek PSO oluşturmakla bitmedi. İki daha ekledi:

### PSO-Managers (orta seviye yöneticiler)

```
Name: PSO-Managers
Precedence: 5
MinPasswordLength: 14
MaxPasswordAge: 60 gün
PasswordHistory: 12
Applies To: "Managers" security group
```

### PSO-ServiceAccounts (servis hesapları)

```
Name: PSO-ServiceAccounts
Precedence: 2
MinPasswordLength: 32
MaxPasswordAge: 0 (never)  ← Service account şifresi manuel yönetim
PasswordHistory: 1 (önemsiz, değişmeyecek)
ComplexityEnabled: True
Applies To: "Service Accounts" security group
```

PasswordLastSet kontrol scheduled task ile yapılmalı — service account şifresi **yılda bir** manuel rotate.

## Precedence Çakışması Örnek

Bir kullanıcı **hem Domain Admins hem Managers** grubunda ise:
- PSO-DomainAdmins (precedence 1) → 20 karakter, 60 gün
- PSO-Managers (precedence 5) → 14 karakter, 60 gün

**Uygulanan: PSO-DomainAdmins** (precedence 1 < 5 daha güçlü).

Doğrulama:
```powershell
Get-ADUserResultantPasswordPolicy -Identity "userx"
```

## Yaygın Hatalar

### "Applies To" Grubu Kabul Etmiyor

Sebep: Grup **Domain Local** türünde. PSO sadece **Global veya Universal** gruplarla çalışır.

Çözüm:
```powershell
# Grubu Universal'a dönüştür
Get-ADGroup -Identity "MyGroup" | Set-ADGroup -GroupScope Universal
```

### PSO Kaydedildi Ama Etkisi Yok

Kontrol listesi:
- Domain Functional Level ≥ 2008 mi? → `Get-ADDomain | Select DomainMode`
- Kullanıcı hedef gruba üye mi? → `Get-ADUser ... -Properties MemberOf`
- PSO enabled durumunda mı? → ADAC'ta PSO görünüyor mu
- Get-ADUserResultantPasswordPolicy hangi policy'yi döndürüyor?

### PSO Kullanıcının Önceki Şifresi Yeni Kurallara Uymuyor

Doğru — **mevcut şifre** PSO aktif olmadan önce konmuş, kurallara uymayabilir. PSO sadece **yeni şifre** koyarken kontrol eder. Eski şifre:
- Uzun değilse (örn. 8 karakter), şifre expire olunca yenisi 20 karakter olur
- Ama bir süre eski şifre geçerli

**Çözüm**: Forced password change (Set-ADUser -ChangePasswordAtLogon $true).

### Service Account Şifresi Expire Oluyor

Service account hesabının PSO'sunda MaxPasswordAge = 0 (never). Ya da hesap properties'te "Password never expires" işaretli olmalı.

## İleri Seviye

### PSO + Azure AD Password Protection

Hybrid ortamda Azure AD Password Protection ile birlikte çalıştır:
- On-prem PSO: 20 karakter zorunlu
- Azure AD: Common passwords (123456, Password123 vs.) engeller
- Her ikisi aktif → güçlü katmanlı koruma

### LAPS ile Local Admin

PSO sadece domain hesapları. Local admin (her bilgisayarda ayrı) için **LAPS**:
- Her bilgisayar farklı 20+ karakter şifre
- 30 günde bir rotate
- AD'de confidential attribute olarak şifreli

### Auditing

PSO değişikliklerini audit logla:
```powershell
# Security Auditing: Policy Change subcategory aktif
auditpol /set /subcategory:"Authentication Policy Change" /success:enable /failure:enable
```

Event ID 4716, 4717, 4718 — PSO creation/modification/deletion.

## İlgili Rehberler

- [Kerberos KRB_AP_ERR_MODIFIED / Event 4771](/blog/kerberos-krb-ap-err-modified-event-4771)
- [Event ID 4625 Brute Force Detection](/blog/event-id-4625-brute-force-tespit-onlem)
- [LAPS deployment](/blog/hikaye-domain-admin-sifresi-whiteboardda)
- [ISO 27001 90 Günlük Yol Haritası](/blog/iso-27001-kobi-90-gun-yol-haritasi)

---

**AD hardening, PSO, LAPS ve ISO 27001 hazırlık için uzman destek?** Kozyatağı Bilişim olarak AD security paketi. [Teknik görüşme talep edin.](/#contact)
