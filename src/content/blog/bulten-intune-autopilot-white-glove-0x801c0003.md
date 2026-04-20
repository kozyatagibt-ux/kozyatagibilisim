---
slug: bulten-intune-autopilot-white-glove-0x801c0003
title: "Intune Autopilot White Glove Hata 0x801c0003 — Azure AD Device Registration"
type: bulten
pillar: 6
url: "/blog/bulten-intune-autopilot-white-glove-0x801c0003"
hedef_anahtar_kelime: "intune autopilot 0x801c0003"
meta_description: "Intune Autopilot White Glove preprovisioning sırasında 0x801c0003 hatası. Azure AD device registration gecikmesi, hash upload ve geçici çözüm."
kelime_sayisi: "~850"
pillar_linki: "/hizmetler/kimlik-yonetimi"
bulten: true
date: 2025-01-08
last_updated: 2026-04-15
status: aktif
severity: orta
product_family: "Microsoft 365 & Outlook"
affected_versions: "Intune Autopilot (sürekli güncelleme), Windows 10/11 Enterprise"
fixed_version: "Aktif — resmi kalıcı fix yok, geçici çözümler uygulanıyor"
vendor_advisory: "Microsoft MC945682 (ve sonraki bültenler)"
workaround_available: true
---

## Özet

Microsoft Intune Autopilot ile cihaz provisioning sürecinde **0x801c0003 (ERROR_NOT_ACCEPTED)** veya **0x800705b4 (ERROR_TIMEOUT)** hataları sık karşılaşılıyor. Özellikle:

- **White Glove preprovisioning** denemesinde
- Yeni kullanıcıya **Self-deploying mode** ile teslim edilirken
- Azure AD join sırasında 10-15 dakika içinde timeout

Microsoft bu sorunu 2024 başından beri biliyor, periyodik olarak iyileştirmeler yapıyor ama **tam çözüm yok**. Kurumsal müşteriler Intune + on-prem AD hybrid senaryolarında daha çok etkileniyor.

## Semptom

White Glove sürecinde:
1. Cihaz açılıyor, hash üzerinden profil alıyor
2. "Getting ready for first use..." ekranı
3. **~10 dakika sonra**: "Something went wrong. Error code: 0x801c0003"

Event log:
```
Event ID 301 (WorkplaceJoin)
Automatic device join pre-check failed. Error: 0x801c0003
```

Intune konsolunda cihaz "enrollment failed" durumunda.

## Kök Sebepler (Birden Fazla)

### Sebep 1: Autopilot Hash Senkronizasyonu

Yeni cihaz bilgisi (hardware hash) Intune'a yüklendikten sonra Azure AD Device Registration Service'e aktarılması **20-45 dakika** alabiliyor. Bu süre içinde setup denenirse 0x801c0003.

### Sebep 2: Conditional Access Engellemesi

Conditional Access policy:
- "Require compliant device"
- "Block non-corporate network"

Enrollment sürecindeki cihaz henüz compliant değil — policy onu engelliyor.

### Sebep 3: Azure AD Connect Delay (Hybrid)

On-prem AD + Azure AD senkronizasyonu 30 dakika delay. Autopilot profile user attribute'larını çekmeye çalışıyor — user henüz sync olmamış.

### Sebep 4: MFA Prompt Gecikmesi

"Company portal" uygulaması MFA istiyor, kullanıcı hazır değil veya numara değişmiş. MFA timeout = enrollment fail.

### Sebep 5: Lisans Ataması

Intune lisansı kullanıcıya atanmamış — enrollment izin verilmiyor.

## Teşhis

### Autopilot Diagnostic Page

Windows 11'de Autopilot hata ekranında **Autopilot Diagnostics Page** gösteriliyor. Log kopyala:

```
Settings > Accounts > Access work or school > 
"Export your management log files"
```

### Azure AD Sign-in Log

Enrollment kullanıcısıyla yapılan sign-in denemelerini kontrol:
```
Azure AD > Sign-ins > Filter: User=enrollment_user, Time=last 1h
```

Failed sign-in'lerin "Failure reason" kolonu.

### Intune Enrollment Status Page

```
Intune Admin Center > Devices > Enrollment > 
Monitor > Enrollment Status Page
```

Hangi kullanıcıda hangi hata?

## Geçici Çözümler

### Çözüm A: Wait + Retry

Kabul edilmiş pratik — 30-60 dakika beklemek. Azure AD sync + Intune propagation tamamlanır.

```
Kullanıcı deneyimi olarak: cihaz açılışından 30 dk sonra reset yapıp 
Autopilot yeniden tetikle
```

### Çözüm B: Conditional Access'te "Enrolling Device" Exclusion

Azure AD > Conditional Access > Policy > Conditions > Device platforms:

```
Exclude: "Azure AD registered" state
Include: "Azure AD joined" state only
```

Bu, enrollment sürecindeki cihazları CA'dan muaf tutar.

### Çözüm C: Enrollment Status Page Ayarı

```
Intune Admin Center > Devices > Enrollment > 
Enrollment Status Page > Default

Setting:
- Only show page to devices provisioned by out-of-box experience (OOBE)
- Allow users to collect logs about installation errors
- Show error when installation takes longer than N minutes = 120 (daha uzun)
```

Default 60 dakika — 120'ye çıkarmak sabırlı enrollment'a izin verir.

### Çözüm D: Hybrid Azure AD Join'den Azure AD Join'e Geçiş

Uzun vadeli çözüm: Hybrid (on-prem AD + Azure AD) yerine **Azure AD join only** (cloud-native).

Gereksinimler:
- Kullanıcı hesapları Azure AD'de (Azure AD Connect ile sync tamamsa)
- Group Policy yerine Intune policy
- Network share'ler için Azure Files + Azure AD auth

Geçiş 3-6 ay planlama, ama Autopilot 0x801c0003 tipi sorunları bitirir.

## Microsoft'un Yaklaşımı

Microsoft periyodik Intune release'lerde iyileştirmeler yayınlıyor:
- **Temmuz 2024**: Hash propagation 20 dakikadan 5 dakikaya düşürüldü (bazı bölgelerde)
- **Ocak 2025**: ESP timeout default 60→90 dk
- **Devam eden**: Autopilot → Entra ID device registration API lag iyileştirme

Ama **kalıcı çözüm yok** — arka planda distributed system mimarisi zaman alıyor.

## Önleyici Yaklaşım

### Autopilot hash upload'ı önceden yapın

Cihaz müşteriye gönderilmeden **48 saat önce** hash upload → propagation tam.

### Pilot grup ile test

Yeni profile değişikliği yaptıktan sonra 2-3 pilot cihazda deneyin, büyük rollout'tan önce.

### Kullanıcı eğitimi

Bu hatayı alırlarsa: "Bekle 30 dakika, cihazı resetle, yeniden dene" — kullanıcı rehberi hazır olmalı.

## Etki Seviyesi

- **Hâlâ risk mi?** Evet, aktif.
- **Ölçek etkisi?** 50+ cihazlı aynı gün rollout'larda %10-20 fail oranı tipik.
- **Acil mi?** Hayır, çözümler mevcut ama frustrating.

## İlgili Kaynaklar

- Microsoft MC945682 (Intune message center)
- Intune Autopilot troubleshooting documentation
- Azure AD device registration logs

---

**Intune deployment, Autopilot white glove provisioning ve Azure AD hybrid join konularında danışmanlık?** Kozyatağı Bilişim Microsoft Partner statüsüyle kurumsal modern workplace projelerinde yanınızdayız. [Teknik görüşme talep edin.](/#contact)
