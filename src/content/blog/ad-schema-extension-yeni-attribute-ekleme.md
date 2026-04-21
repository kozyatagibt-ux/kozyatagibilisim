---
slug: ad-schema-extension-yeni-attribute-ekleme
title: "AD Schema Extension — Yeni Attribute Ekleme (Bordro ID Örneği)"
type: cluster
pillar: 2
url: "/blog/ad-schema-extension-yeni-attribute-ekleme"
hedef_anahtar_kelime: "active directory schema extension"
meta_description: "Active Directory schema'ya yeni custom attribute ekleme — OID alma, ldifde import, ADSI Edit. İK entegrasyonu için bordroID örneği adım adım."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "AD Schema"
product_family: "Windows Server & Active Directory"
---

## "İK Sistemindeki Bordro ID'yi AD'de Tutalım"

İK müdürü: "Her çalışanın Paycheck sistemindeki **8 haneli Bordro ID** var. Mail, telefon bilgileri AD'de tutuluyor. Bordro ID'si neden yok?"

BT müdürü Osman: "AD'de out-of-box böyle bir attribute yok. **Schema extension** ile eklenebilir."

Bu yazı AD schema'ya `bordroID` adında yeni bir attribute eklemeyi anlatıyor — OID, syntax, ldifde.

## ⚠️ Kritik Uyarı

Schema değişiklikleri **forest-wide**, **geri alınamaz** (attribute deaktive edilebilir ama silinemez). Production'da yapmadan önce:

1. **Test lab'da** dene
2. **Backup al** — System state tüm DC'lerde
3. **Geri dönüş planı yaz** — deactive olarak geçici devre dışı
4. **Domain Admin yetkisi** yetmez — **Schema Admins** grubu üyeliği gerekli

## Hızlı Çözüm (TL;DR)

```
1. Microsoft'tan OID (Object Identifier) al (ücretsiz online)
2. ldifde ile schema import
3. ADUC'tan attribute'ı test user'a yaz
4. Application code/script ile read/write
```

---

## OID Nedir, Nereden Alınır?

Her AD attribute'un **unique OID** numarası var. Microsoft standart:
```
1.2.840.113556.1.4.8          ← samAccountName
1.2.840.113556.1.4.96         ← userPrincipalName
```

Custom attribute için:
- Kendi firma OID'nizi alabilirsiniz (IANA'dan): ücretsiz, 1-2 iş günü
- Microsoft'un "custom" OID scriptini kullanabilirsiniz: anında

### Microsoft OID Generator Script

```vbscript
' Microsoft oid gen script (Microsoft documentation'da)
' Çıktı örneği: 1.2.840.113556.1.8000.2554.46173.64866.25706.9017.43879.8972543.6731641
```

Her çalıştırmada unique OID üretir. Bu OID'yi **sonsuza kadar** kullanırsın.

Veya **PENS registration** (Private Enterprise Number) — IANA:
- https://pen.iana.org
- Başvuru: 1-2 iş günü, ücretsiz
- Aldığınızda: `1.3.6.1.4.1.[firmaniz_PEN].X.Y` formatında attribute OID'leri

## 10:00 — Test Lab'da Deneme

**Öncelikle test ortamı.** Production'a dokunmadan tam aynı ortam test edin.

### Adım 1: OID Üret

```vbscript
' oid_gen.vbs
Dim strOID
Dim oGuid
Set oGuid = CreateObject("Scriptlet.TypeLib")
' Generate GUID, convert to OID
' ... (full script Microsoft docs)
WScript.Echo strOID
```

Çıktı: `1.2.840.113556.1.8000.2554.12345`

Attribute için alt OID:
- `1.2.840.113556.1.8000.2554.12345.1` — attribute: bordroID

## Schema Extension Yöntemleri

### Yöntem A: Schema MMC (GUI)

Schema snap-in'i register et:
```cmd
regsvr32 schmmgmt.dll
```

MMC aç, Add/Remove Snap-in > **Active Directory Schema** ekle.

> 📸 **Ekran 1** — Schema Management  
> Sol ağaç:  
> - Active Directory Schema  
>   - Classes  
>   - Attributes  
> **Attributes** sağ tık > Create Attribute...

**İlk defa** schema değişikliği yapılıyorsa uyarı:
> "Schema modifications cannot be undone. It is strongly recommended that you perform a full system state backup before proceeding."

Onay → create attribute dialog:

> 📸 **Ekran 2** — Create New Attribute  
> Common Name: **bordroID**  
> LDAP Display Name: bordroID  
> Unique X500 Object ID: **1.2.840.113556.1.8000.2554.12345.1**  
> Description: Bordro System Employee ID  
> Syntax: Unicode String  
> Minimum: 8  
> Maximum: 8  
> ☑ Multi-Valued: HAYIR (single value)  
> OK

Attribute oluştu.

### Yöntem B: LDIF Import (PowerShell Automation)

`schema-extension.ldf` dosyası:

```ldif
dn: CN=bordroID,CN=Schema,CN=Configuration,DC=corp,DC=firma,DC=com,DC=tr
changetype: add
objectClass: top
objectClass: attributeSchema
cn: bordroID
attributeID: 1.2.840.113556.1.8000.2554.12345.1
attributeSyntax: 2.5.5.12
oMSyntax: 64
isSingleValued: TRUE
rangeLower: 8
rangeUpper: 8
searchFlags: 1
adminDisplayName: Bordro ID
adminDescription: Bordro System Employee ID
lDAPDisplayName: bordroID
objectCategory: CN=Attribute-Schema,CN=Schema,CN=Configuration,DC=corp,DC=firma,DC=com,DC=tr

dn:
changetype: modify
add: schemaUpdateNow
schemaUpdateNow: 1
-
```

Import:
```cmd
ldifde -i -f schema-extension.ldf
```

Çıktı:
```
Connecting to "DC01.corp.firma.com.tr"
Logging in as current user using SSPI
Importing directory from file "schema-extension.ldf"
Loading entries...
2 entries modified successfully.
The command has completed successfully
```

## 10:15 — Attribute'u User Class'a Ekle

Yeni attribute default olarak hiçbir class'a (user, computer vs.) eklenmedi. Bağlantı:

### Schema MMC ile

Schema Management > Classes > **user** sağ tık > Properties:

> 📸 **Ekran 3** — user class Properties  
> Tabs: General, Relationship, **Attributes**, Default Security  
> Attributes tab seçili:  
> Optional: listesi  
>   - accountExpires  
>   - badPasswordTime  
>   - ...  
> **Add...** butonu  
> Yeni dialog: Attribute seç → **bordroID**  
> OK  
> Apply

Artık `bordroID` user class'ın optional attribute'ı.

### LDIF ile

`add-to-user.ldf`:
```ldif
dn: CN=User,CN=Schema,CN=Configuration,DC=corp,DC=firma,DC=com,DC=tr
changetype: modify
add: mayContain
mayContain: bordroID
-
```

```cmd
ldifde -i -f add-to-user.ldf
```

## 10:20 — Replication + Doğrulama

Schema değişiklikleri **schema master** üzerinden tüm DC'lere replike olur. 15 dakika - 2 saat.

Manual replicate:
```cmd
repadmin /syncall /AdeP
```

Doğrulama — attribute gerçekten ekli mi?:

```powershell
Get-ADObject -SearchBase (Get-ADRootDSE).schemaNamingContext `
    -Filter {name -eq "bordroID"} -Properties *
```

Bulunmalı. Schema'ya eklendi.

## 10:30 — Test: Bir User'a Bordro ID Yaz

### ADUC'ta Görünür mü?

Default ADUC'ta custom attribute'lar görünmez. İki seçenek:

**A. ADSI Edit**
```cmd
adsiedit.msc
```

> User sağ tık > Properties > Attribute Editor tab
> Scroll down → bordroID attribute listede
> Edit butonu > 8 haneli ID gir (ör: `12345678`) > OK

**B. PowerShell (Direkt)**

```powershell
Set-ADUser -Identity "mehmet.yilmaz" -Replace @{bordroID="12345678"}
```

Okuma:
```powershell
Get-ADUser -Identity "mehmet.yilmaz" -Properties bordroID | 
    Select Name, bordroID
```

Çıktı:
```
Name            bordroID
----            --------
Mehmet Yılmaz   12345678
```

### ADUC Advanced View

ADUC'ta bile Advanced Features aktif olunca attribute editor tab görünür. Properties > Attribute Editor > bordroID.

## 10:45 — Bulk Import (İK CSV'den)

İK'dan gelen CSV:
```csv
SamAccountName,BordroID
mehmet.yilmaz,12345678
ayse.demir,87654321
can.kara,11223344
```

PowerShell:
```powershell
Import-Csv .\ik-bordroid.csv | ForEach-Object {
    Set-ADUser -Identity $_.SamAccountName -Replace @{bordroID=$_.BordroID}
}
```

200 kullanıcı için 10 saniye.

## Schema Attribute Deactivate (Geri Alma)

Gerçekten silinemez ama **deactivate** edilebilir:

Schema MMC > Attributes > bordroID > Properties:
> 📸 **Ekran 4** — Attribute Properties  
> ☑ **Attribute is active** — uncheck

Apply. Attribute artık **kullanılmaz** ama **var**. Gerekirse tekrar aktive:
```powershell
Set-ADObject -Identity "CN=bordroID,CN=Schema,CN=Configuration,..." `
    -Replace @{isDefunct=$FALSE}
```

## Yaygın Hatalar

### "Insufficient access rights to perform the operation"

Current user **Schema Admins** grubunda değil. Tek istemle:
```powershell
Add-ADGroupMember -Identity "Schema Admins" -Members "bt.admin"
# Log off + log on (token refresh)
```

### "Schema update is disabled on this server"

Schema master üzerinde değilsiniz. Hangi DC schema master?
```cmd
netdom query fsmo
```

Bu DC'de schema değişiklik yap. Veya schema update'i aç:
```
Registry: HKLM\SYSTEM\CurrentControlSet\Services\NTDS\Parameters
"Schema Update Allowed" = 1 (DWORD)
```

### LDIF Import "Illegal syntax value"

Attribute syntax yanlış. Microsoft attribute syntax:
- `2.5.5.12` = Unicode String
- `2.5.5.9` = Integer
- `2.5.5.11` = Generalized Time
- `2.5.5.7` = DN

Yanlış syntax seçildiyse schema bozuk ekler.

### Replication Sonrası Bazı DC'lerde Yok

```cmd
repadmin /replsummary
```

Schema partition fail varsa özellikle odaklan. Manual force:
```cmd
repadmin /syncall /AdeP DC=corp,DC=firma,DC=com,DC=tr
```

## Production Geçiş Prosedürü

Test lab'da başarılı → production:

1. Maintenance window planla
2. System state backup tüm DC'lerde
3. LDIF import schema master'da
4. Replication monitoring (`repadmin /syncall`)
5. 24 saat bekle (full replication)
6. Pilot grup user'lara write test
7. Gerçek İK CSV import
8. Uygulama/script integration

## İlgili Rehberler

- [FSMO roles transfer](/blog/ad-fsmo-roles-transfer-dc1-dc2)
- [AD Recycle Bin + restore](/blog/ad-recycle-bin-enable-silinmis-user-restore)

---

**AD schema extension, custom attribute design ve İK-AD integration için uzman destek?** Kozyatağı Bilişim AD migration paketimiz. [Teknik görüşme.](/#contact)
