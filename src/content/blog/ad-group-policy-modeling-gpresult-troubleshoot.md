---
slug: ad-group-policy-modeling-gpresult-troubleshoot
title: "Group Policy Modeling + gpresult Analizi — GPO Neden Uygulanmıyor?"
type: cluster
pillar: 2
url: "/blog/ad-group-policy-modeling-gpresult-troubleshoot"
hedef_anahtar_kelime: "group policy modeling gpresult"
meta_description: "AD GPO troubleshoot — gpresult analizi, GPO Modeling, RSoP. Inheritance, enforced, block inheritance, WMI filter ve security filtering senaryoları."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/kimlik-yonetimi"
troubleshoot: true
error_code: "GPO Not Applying"
product_family: "Windows Server & Active Directory"
---

## "Yeni GPO Uygulanmıyor"

BT uzmanı Cem "USB-Block" GPO oluşturdu, Marketing OU'suna link etti. Test kullanıcısı 1 saat sonra USB takabiliyor.

> "GPO uygulanıyor mu?"

Bu yazı `gpresult`, `rsop.msc` ve Group Policy Modeling ile neden uygulanmadığını tespit etmeyi anlatıyor.

## Hızlı Çözüm (TL;DR)

1. `gpresult /h c:\gp.html` — kullanıcı tarafında full rapor
2. HTML'de "Applied GPOs" + "Denied GPOs" bölümlerine bak
3. Denied sebebi: Filtering (Empty), Security, WMI, Block Inheritance
4. GPMC > Group Policy Modeling Wizard — test simülasyonu
5. `gpupdate /force` ile trigger

---

## gpresult — Detaylı Rapor

### Basit Output

```cmd
gpresult /r
```

Özet. Hangi GPO'lar uygulandı/uygulanmadı.

### HTML Rapor

```cmd
gpresult /h c:\gp.html
start c:\gp.html
```

Browser açılır. Tam detay:

> 📸 **Ekran 1** — gpresult HTML rapor  
> Başlık: "Group Policy Results"  
> Sections:  
> - Summary (computer + user info, last GP application)  
> - **Computer Details**  
>   - Applied GPOs  
>   - Denied GPOs (sebep ile birlikte)  
> - **User Details** — aynı yapı  
> Her GPO linkine tıklayınca detay: hangi setting, nereden geldi, link durumu

### Başka Kullanıcı İçin

Admin yetkisi ile:
```cmd
gpresult /user mehmet.yilmaz /h c:\gp-mehmet.html /s remote-pc-01
```

Remote PC'den remote kullanıcının GP sonucunu çıkar.

## Denied Sebepleri

HTML raporda her denied GPO yanında sebep:

### "Denied (Empty)"
GPO'nun içinde setting yok. Silmek doğru olur ya da bir setting ekle.

### "Denied (Filtering: Denied)"
Security filtering engel. GPO Properties > Delegation > Advanced:
- "Apply group policy" permission kullanıcıya verilmemiş
- Veya explicitly "Deny" atanmış

### "Denied (Filtering: Empty)"
Security Filtering listesi boş (hiç kimse atanmamış).

### "Denied (Inaccessible)"
DC'ye ulaşılamıyor — network sorunu.

### "Denied (Disabled Link)"
OU'daki GPO link disabled. GPMC > OU > Linked GPOs > GPO sağ tık > **Link Enabled** (check)

### "Denied (WMI Filter)"
WMI filter eval false dönüyor.

## 10:00 — Cem'in Vakası

```cmd
gpresult /h c:\gp.html
```

Marketing kullanıcısı HTML'de "Applied GPOs" altında:
- Default Domain Policy ✓
- Marketing-Printer-Policy ✓

"Denied" altında:
- **USB-Block** — Denied (Filtering: Not Applied (Empty))

Cem hemen anladı — GPO'yu yeni oluşturdu ama **içine hiçbir setting eklememiş**. Boş GPO "empty" deniyor, uygulanmıyor.

GPMC'de USB-Block edit → Computer Config > Admin Templates > System > Device Installation > Device Installation Restrictions > "Prevent installation of devices..." → enable.

Kullanıcı tarafında:
```cmd
gpupdate /force
```

Sonra tekrar `gpresult` → USB-Block applied ✓.

## Group Policy Modeling Wizard

"Production'a uygulamadan önce simüle et" için:

> 📸 **Ekran 2** — GPMC > Group Policy Modeling Wizard  
> Sol panel: "Group Policy Modeling" sağ tık  
> Menu: "Group Policy Modeling Wizard..."  
> Wizard başlar  
> Select Domain Controller: herhangi bir DC  
> **User and Computer Selection**:  
>   - Simulated user: CORP\mehmet.yilmaz (veya container)  
>   - Simulated computer: MARKETING-PC-01  
> Advanced Simulation Options:  
>   - Loopback processing (eğer gerekliyse)  
>   - Slow network connection  
>   - Site: Default-First-Site-Name  
> **Alternate location** for User or Computer (test için yer değiştirebilirsin):  
>   - User yeni OU'da: "OU=Interns,OU=Users,..."  
> **Security groups** — kullanıcıyı yeni bir grupta simülate:  
>   - Domain Users  
>   - Marketing-Team  
>   - + Test-Group (yeni)  
> **WMI Filters**  
> Finish  
> Rapor otomatik açılır

Rapor gerçek gpresult'a benzer — ama gerçek bir cihaza apply etmez. Test lab gerekmeden simülasyon.

## Resultant Set of Policy (RSoP)

Eski isim, aynı işlev:
```cmd
rsop.msc
```

MMC açılır, kullanıcı + bilgisayar bağlamında uygulanan GPO'ları + tüm effective settings gösterir.

> 📸 **Ekran 3** — rsop.msc  
> Pencere başlığı: "Resultant Set of Policy"  
> Sol ağaç: Computer Configuration, User Configuration  
> Her setting için:  
>   - Current value  
>   - Winning GPO (hangi GPO'dan geldi)

## Inheritance, Block, Enforce

GPO precedence order (aşağı doğru overriding):
1. Local Policy
2. Site-level GPO
3. Domain-level GPO
4. OU-level GPO (en yakın OU wins — "LSDOU" order)

### Block Inheritance

OU'da "Block Inheritance" set edersen yukarıdaki GPO'lar apply olmaz (sadece o OU).

> 📸 **Ekran 4** — OU > Block Inheritance  
> Sağ tık OU > "Block Inheritance" toggle  
> OU'nun yanında mavi ünlem (!) işareti görünür

**Dikkat**: Domain Default Policy dahil her şey bloklanır. Password policy, audit policy bile.

### Enforced (No Override)

GPO "Enforced" ise Block Inheritance'ı da aşar. Critical security GPO'ları için:

> 📸 **Ekran 5** — GPO Link > Enforced  
> GPMC > OU > GPO Link sağ tık > "Enforced" işareti  
> Link'in yanında kilit simgesi

Enforcement order:
- Enforced GPO'lar → apply
- Block inheritance → normal GPO'ları bloklar
- Enforced GPO'ları bloklayamaz

## Security Filtering

GPO apply olmak için kullanıcı/grup/computer **"Apply group policy"** permission almalı:

> 📸 **Ekran 6** — GPO > Scope tab > Security Filtering  
> Varsayılan: "Authenticated Users" (tüm domain)  
> Add... butonu → sadece belirli grup (Marketing-Team)  
> Remove: Authenticated Users  
>   
> Şimdi GPO sadece Marketing-Team üyelerine apply  

**Dikkat 2016+**: Authenticated Users'ı kaldırırsan computer account'lar GPO'yu **okuyamaz**. Delegation tab'da Authenticated Users'a "Read" yetkisi ekle (yeni, read only).

## WMI Filtering

GPO sadece belirli OS/hardware'de uygulansın:

> 📸 **Ekran 7** — WMI Filter create  
> GPMC > WMI Filters > New  
> Name: "Windows 11 Only"  
> Query:  
>   Namespace: root\CIMv2  
>   Query: `SELECT * FROM Win32_OperatingSystem WHERE Version LIKE "10.0.22%"`  
>   (10.0.22000 = Windows 11)

Sonra GPO'nun "Scope" tab > WMI Filter: "Windows 11 Only" seç.

Sadece Windows 11 cihazlarda GPO apply.

## Loopback Processing

Bilgisayar bazlı user setting uygulama (Terminal Server, kiosk):

```
Computer Configuration > Administrative Templates > System > 
Group Policy > Configure user Group Policy loopback processing mode

Replace mode: Sadece bu computer'da geçerli user settings
Merge mode: User'ın kendi GPO'larına ek bu computer'ın user settings
```

Kiosk makinelerde "replace" + restricted shell GPO.

## Replication Gecikmesi

GPO yeni oluşturulunca:
1. DC'ye yazılır
2. SYSVOL replikasyon (DFSR)
3. Tüm DC'lere ulaşır (5-30 dk)

Client:
```cmd
gpupdate /force
```

SYSVOL'den GPO çekmez eğer local DC'de yoksa.

Kontrol:
```cmd
# SYSVOL'de GPO klasörü var mı?
dir \\corp.firma.com.tr\SYSVOL\corp.firma.com.tr\Policies\{GPO_GUID}
```

Yoksa SYSVOL replication fail. [DFSR backlog rehberi](/blog/dfsr-replication-backlog-stuck-sysvol).

## Yaygın Hatalar

### "The processing of Group Policy failed" (Event 1058)

SYSVOL erişim sorunu. Client DC'ye ulaşamıyor veya SYSVOL share bozuk.

### "Windows cannot find the Group Policy" (Event 1030)

Benzer — GPT.INI file erişim sorunu.

### Computer GPO OK, User GPO Hiç Uygulanmıyor

User kısmında "Authenticated Users" permission kontrolü. 2016+ enforcement ile Authenticated Users "Apply" yetkisi gerek.

### "GPO appears to be applied but setting not active"

Tempo: GPO setting'i `gpupdate` sonrası hemen değil, **bazı settings reboot gerektiriyor**:
- Startup/Shutdown scripts → reboot
- Computer Software Installation → reboot
- Some User settings → log off + log on

## Troubleshoot Sırası

1. **gpupdate /force** — refresh
2. **gpresult /h** — HTML rapor, Denied sebebi
3. **rsop.msc** — etki şeması
4. **GPO link durumu** — Disabled mı?
5. **Security filtering** — kullanıcı scope'ta mı?
6. **WMI filter** — bu computer eşleşiyor mu?
7. **Inheritance** — block var mı? Enforced mı?
8. **SYSVOL replication** — DFSR backlog var mı?
9. **DC accessibility** — AD connection var mı?

## İlgili Rehberler

- [GPO USB Storage engelleme](/blog/ad-gpo-usb-storage-engelleme-adim-adim)
- [Logon server not available](/blog/ad-logon-server-not-available-no-available-servers)
- [DFSR replication backlog](/blog/dfsr-replication-backlog-stuck-sysvol)

---

**GPO design, troubleshoot ve enterprise AD management için uzman destek?** Kozyatağı Bilişim AD management paketimiz. [Teknik görüşme.](/#contact)
