---
slug: bulten-teams-classic-eol-temmuz-2025
title: "Microsoft Teams Classic Desteği Sonlandı — Yeni Teams Geçiş Zorunluluğu"
type: bulten
pillar: 6
url: "/blog/bulten-teams-classic-eol-temmuz-2025"
hedef_anahtar_kelime: "teams classic end of life"
meta_description: "Microsoft Teams Classic (1.x) uygulaması desteği Temmuz 2025'te sonlandı. Yeni Teams 2.0'a zorunlu geçiş ve bilinen uyum sorunları."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/kurumsal-eposta"
bulten: true
date: 2024-08-05
last_updated: 2025-07-02
status: cozuldu
severity: orta
product_family: "Microsoft 365 & Outlook"
affected_versions: "Microsoft Teams Classic (1.6.x ve önceki)"
fixed_version: "Microsoft Teams 2.0 (new Teams)"
vendor_advisory: "MC712234 / Roadmap ID 189917"
workaround_available: false
---

## Özet

Microsoft Teams Classic (1.x sürüm serisi) resmi olarak **1 Temmuz 2025** itibarıyla desteklenmeyi bıraktı ve **iç ağ içi dahi açılmıyor** — force redirect ile "New Teams" yüklemeye yönlendiriliyor.

Microsoft bu geçişi 2023'ten beri kademeli olarak duyuruyordu ama pek çok kurum New Teams'e geçişte tereddüt etti (eklenti uyumsuzlukları, UI farklılıkları). **Temmuz 2025 sonrası zorunluluk** haline geldi.

## Etki

- Teams Classic **açılmıyor** — "This version is no longer supported" mesajı
- Taşınmamış policies, custom app'ler, third-party integration'lar çalışmıyor olabilir
- MSI/GPO ile dağıtılmış eski Teams paketleri silinmesi gerekiyor

## Bilinen Uyum Sorunları

New Teams'e geçişte sık karşılaşılan 6 sorun:

### 1. Lync/Skype for Business Co-existence

Classic Teams eski Lync'le "islands mode" yapabiliyordu. New Teams bu özelliği sınırladı. SfB Online zaten EOL (2021) ama SfB Server 2019 on-prem kullanan kurumlar etkilendi.

**Çözüm**: SfB Server 2019'dan Teams-only mode'a tam migration.

### 2. Third-Party Eklentiler

- **Webex Teams Meeting Connector** — New Teams'te yeni API gerektiriyor
- **Polycom / Poly** video konferans room entegrasyonu — firmware update gerekli
- **Crestron** meeting room controller — bazı modellerde Teams Classic destekli

**Çözüm**: Her eklenti için üreticiyle birlikte uyum planlaması.

### 3. PowerShell Script'ler

Eski `MicrosoftTeams` PowerShell modülünde bazı cmdlet davranışları değişti:
```powershell
# Eski (çalışmaz)
Get-CsTenantPublicProvider

# Yeni
Get-CsTenantFederationConfiguration
```

Scripted automation'lar review edilmeli.

### 4. Linux Masaüstü İstemcisi

Microsoft Teams Linux **Aralık 2022'de resmi olarak EOL oldu**. New Teams Linux için yayınlanmadı. Linux kullanıcıları **web versiyonuna** yönlendiriliyor (teams.microsoft.com).

### 5. macOS Uyumsuzluğu

New Teams macOS **Intel** ve **Apple Silicon (M1/M2/M3)** için ayrı build'ler. Eski "Universal" installer sonlandı. Cihaz mimarisine göre doğru installer gerekli.

### 6. Custom Backgrounds / Branding

Kurum-özel branding (logo, arkaplan görselleri) Classic'ten New'e otomatik taşınmıyor. IT admin **manuel** olarak Admin Center > Teams apps > Customize apps'te yeniden yükleme yapmalı.

## Geçiş Adımları

### Kullanıcı seviyesinde

Kullanıcıların çoğunda geçiş **otomatik** yapıldı — Teams başlığının yanındaki toggle "Try the new Teams" zaten on default oldu. Ama bazı kullanıcılar:

1. Başlat menüsü > Microsoft Teams Classic > Uninstall
2. Microsoft Store'dan "Microsoft Teams" (new Teams) indir
3. İlk girişte kurum hesabıyla login
4. Profile settings transfer otomatik

### IT yönetimi seviyesinde

GPO / Intune ile:

```
# Intune Configuration Profile
Setting: Administrative Templates > Microsoft Office > Teams
- "UseNewTeamsClient" = Enabled
- "IsNewTeamsDefaultToPolicy" = True

# GPO (AD)
Computer Configuration > Administrative Templates > 
Office 2016 > Updates > Microsoft Teams installation
```

Deployment:
- MSIX installer (yeni format)
- Winget ile manage: `winget install Microsoft.Teams`
- SCCM package: Microsoft'un resmi MSIX dağıtım paketi

### Advanced: Registry ayarları

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Teams\AllowNewTeams
Value: 1 (REG_DWORD)
```

## Bilinen Bug'lar (New Teams)

### Persistent "Loading..." on join

Bazı toplantı join işlemlerinde 30+ saniye "Loading..." ekranı. Çözüm:
- Teams cache temizliği: `%localappdata%\Packages\MSTeams_8wekyb3d8bbwe\LocalCache\`
- GPU hardware acceleration disable

### Notifications çift geliyor

Classic kaldırıldı ama notifications için registry key kaldı. Düzeltme:
```
HKEY_CURRENT_USER\SOFTWARE\Microsoft\Office\Teams\
```
Altında "Notification" key'leri temizle.

### External meeting join issues

Federasyonsuz external kullanıcı link'i tıkladığında "Need permission" hatası. Teams Admin Center'da:
- Meetings policy > Allow anonymous join = enabled

## Etki Seviyesi

- **Acil mi?** Artık "geçti" — Temmuz 2025 deadline sonrası zorunlu.
- **Geçmemiş olanlar**: Kullanıcılar Teams açamıyor, iletişim kesintisi riski.
- **Eski script/automation**: Review + test şart.

## İlgili Kaynaklar

- Microsoft MC712234 — "New Teams is now the default"
- Microsoft 365 Roadmap ID 189917
- Teams deployment documentation

---

**Microsoft 365 migration, Teams deployment ve eski sistem geçişlerinde profesyonel destek?** Kozyatağı Bilişim M365 sertifikalı ekibimizle sizin için migration planlama ve yürütme. [Teknik görüşme talep edin.](/#contact)
