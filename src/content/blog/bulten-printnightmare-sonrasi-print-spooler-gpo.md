---
slug: bulten-printnightmare-sonrasi-print-spooler-gpo
title: "PrintNightmare Sonrası Print Spooler GPO Kısıtları — Kurumsal Uyum Gereksinimi"
type: bulten
pillar: 2
url: "/blog/bulten-printnightmare-sonrasi-print-spooler-gpo"
hedef_anahtar_kelime: "printnightmare gpo point and print"
meta_description: "Microsoft PrintNightmare (CVE-2021-34527) sonrası Print Spooler GPO kısıtlamaları. Kurumsal ortamda yazıcı deployment sorunları ve doğru yapılandırma."
kelime_sayisi: "~850"
pillar_linki: "/kobi-siber-guvenlik"
bulten: true
date: 2021-09-01
last_updated: 2025-10-12
status: gecici_cozum
severity: yuksek
product_family: "Windows Server & Active Directory"
affected_versions: "Windows 10, Windows 11, Windows Server 2016/2019/2022 — yamalanmış tüm sistemler"
fixed_version: "Yapılandırma gerekiyor — GPO ile özelleştirilmeli"
vendor_advisory: "Microsoft KB5005652, CVE-2021-34527"
workaround_available: true
---

## Özet

**PrintNightmare** olarak bilinen CVE-2021-34527 zafiyeti 2021 yazında yayınlandı. Microsoft güvenlik yamasını (KB5005652) yayınlarken **Point and Print davranışını varsayılan olarak kısıtladı**: artık standart kullanıcılar yazıcı sürücüsü yükleyemez, sadece admin veya preauthorized driver'lar kabul edilir.

**Bu değişiklik 2025'e kadar hâlâ kurumsal ortamlarda yazıcı deployment sorununa yol açıyor** — özellikle çoklu şubeli ortamlarda print server tabanlı yazıcı ekleme başarısız oluyor.

## Etki

- Kullanıcı mevcut print server'dan yeni yazıcı ekleyemiyor (UAC prompt istiyor ama admin yetkisi yok)
- GPO ile dağıtılan yazıcılar yüklenemiyor
- Yeni laptop kurulumlarında standart "yazıcı ekle" akışı bozuk
- IT helpdesk çağrıları artmış (2022-2025 dönemi boyunca)

## Semptom

Kullanıcı tarafında:
```
\\print-server\HP-LaserJet-Floor3 yazıcısına bağlanılıyor...
"Yazıcı yüklemek için bir yönetici tarafından yetkilendirilmiş olmalısınız"
```

Event log:
```
Event ID 316 (PrintService)
The driver installation is blocked due to Administrator policy.
```

## Kurumsal Doğru Yapılandırma

Tamamen disable etmek güvenlik riski — doğru denge GPO ile sağlanır.

### Seçenek A: Trusted Print Server Whitelist

En çok önerilen yaklaşım:

```
GPO: Computer Configuration > Administrative Templates > 
Printers > Package Point and print - Approved servers

Enabled
Approved servers: 
  print-srv01.corp.firma.com
  print-srv02.corp.firma.com
```

Bu sunuculara bağlantı için admin prompt sorulmaz — kullanıcı normal flow ile yazıcı ekleyebilir.

Ek olarak:
```
GPO: Computer Configuration > Administrative Templates > 
Printers > Point and Print Restrictions

Enabled
- Users can only point and print to these servers:
  print-srv01.corp.firma.com
  print-srv02.corp.firma.com

- When installing drivers for a new connection:
  "Do not show warning or elevation prompt"
```

### Seçenek B: Sürücü İmzalama

Advanced:

```powershell
# Driver'ı signed ve approved olarak ekle
Set-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\Print" `
    -Name "RestrictDriverInstallationToAdministrators" `
    -Value 0
```

⚠️ Bu tüm kullanıcılara driver install izni verir — güvenlik riskini değerlendirin.

### Seçenek C: Universal Print Adoption

Microsoft'un tavsiye ettiği modern yaklaşım: **Universal Print** — on-prem print server yok, bulut tabanlı.

Avantajları:
- PrintNightmare kısıtlamalarından etkilenmez
- Zero-touch yazıcı deployment
- Azure AD ile auth

Dezavantajı: Lisans maliyeti (kullanıcı başı aylık).

## Bilinen Yan Sorunlar

### Konica Minolta sürücüleri sık fail

Bazı enterprise MFP sürücüleri (KONICA MINOLTA Universal PCL) PrintNightmare'den önce yazıldı, imzalama veya Point and Print uyumu yok. En son versiyonlara upgrade şart.

### Xerox PS sürücüleri

Xerox Print Driver bazı sürümlerde "unsigned driver" uyarısı. Üreticinin GPO template'ini indirip deploy et.

### HP Universal Print Driver

HP UPD 7.x öncesi bazı sürümlerde 0x00000a5 hatası. 7.0+ versiyon kullanılmalı.

## Migration Önerisi

2025+ için:

1. **Yazıcı envanteri çıkar** (mevcut print server + direct IP yazıcılar)
2. **Universal Print fizibilite**: Lisans maliyeti + kullanım sıklığı hesabı
3. **Geçiş planı**:
   - Uygun fiyat: Universal Print
   - Yerinde tercih: Hardened print server + GPO whitelist
4. **Kullanıcı eğitimi**: Yeni yazıcı ekleme akışı

## Etki Seviyesi

- **Hâlâ risk mi?** Sorun geçmedi — Microsoft bu davranışı kalıcı yaptı.
- **Alternatifler**: Yaz 2021'den beri Universal Print, Pure hybrid cloud print çözümleri olgunlaştı.
- **GPO'suz ortam**: Küçük ofislerde manuel admin intervention gerekebilir.

## İlgili Kaynaklar

- Microsoft KB5005652 "Manage new Point and Print default driver installation behavior"
- CVE-2021-34527 — PrintNightmare
- Microsoft Universal Print documentation

---

**Kurumsal yazıcı altyapısı modernizasyonu — Universal Print geçişi ya da hardened print server kurulumu?** Kozyatağı Bilişim'in Microsoft Partner ekibi sizin için migration ve policy yapılandırması sunar. [Teknik görüşme talep edin.](/#contact)
