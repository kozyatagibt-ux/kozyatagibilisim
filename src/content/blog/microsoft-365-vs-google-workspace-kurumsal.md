---
slug: microsoft-365-vs-google-workspace-kurumsal
title: "Microsoft 365 mi Google Workspace mi? 50-200 Kişilik Şirket için Gerçek Karar Matrisi"
type: cluster
pillar: 1
url: "/blog/microsoft-365-vs-google-workspace-kurumsal"
hedef_anahtar_kelime: "microsoft 365 google workspace karşılaştırma"
meta_description: "Microsoft 365 ve Google Workspace arasında seçim yapacak 50-200 kişilik Türk şirketi için gerçek karşılaştırma: lisans maliyeti, Outlook alışkanlığı, dosya ekosistemi, KVKK, Office uyumu, güvenlik."
kelime_sayisi: "~2000"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## "İkisi de iyi" Cevabından Kaçının

Bu konuda blog yazılarının %80'i şöyle biter: "İkisi de iyi, ihtiyaçlarınıza göre seçin." Bu işe yaramaz bir cevap. Gerçek hayatta seçim kesin olmalı, çünkü her iki platform arasında geçiş **ciddi bir iş**.

Bu yazıda 50-200 kişilik Türk şirketlerinde bu karara yardım ederken gördüğümüz gerçek ayrım noktalarını anlatıyorum. Reddit r/msp'de bu tartışma haftalık tekrar eder; aşağıda Türkiye gerçeğini ekleyerek özetledim.

## İki Platform da Neyi Sunar?

**Ortak:**
- Kurumsal mail (Exchange / Gmail)
- Bulut dosya depolama (OneDrive / Drive)
- Ofis yazılımları (Word/Excel/PPT — Docs/Sheets/Slides)
- Mesajlaşma + video (Teams / Meet)
- Kalendır, kontakt, AD benzeri kimlik
- Yönetim paneli, MDM, güvenlik

**Dolayısıyla seçim "hangisinde X var?" değil — "X'i nasıl yapıyor, sizin iş akışınıza uyuyor mu?" sorusudur.

## 1. Lisans ve Maliyet (2024-2025 fiyatları)

### Microsoft 365

| Plan | TL/kullanıcı/ay (2024 ort.) | Önemli içerik |
|---|---|---|
| Business Basic | ~110 TL | Mail + OneDrive 1TB + Teams (sadece web Office) |
| Business Standard | ~230 TL | + Desktop Office (Word/Excel/PPT yerel kurulum) |
| Business Premium | ~410 TL | + Intune (MDM) + Defender for Business + Entra ID P1 |
| E3 (Enterprise) | ~770 TL | Tam kurumsal, sınırsız OneDrive, daha geniş compliance |
| E5 (Enterprise) | ~1300 TL | + Defender full stack + Purview compliance |

### Google Workspace

| Plan | TL/kullanıcı/ay (2024 ort.) | Önemli içerik |
|---|---|---|
| Business Starter | ~180 TL | Mail + 30GB Drive + Meet (100 kişi) |
| Business Standard | ~370 TL | + 2TB Drive + Meet (150 kişi) + Noting |
| Business Plus | ~560 TL | + 5TB Drive + Vault + Advanced MDM |
| Enterprise Standard | ~950 TL+ | Sınırsız Drive + Cloud Identity Premium |

### Kısa okunuş

- Düşük segmentte (Basic): **Microsoft 365 daha ucuz** (110 vs 180)
- Orta segmentte (Standard): **Microsoft 365 daha ucuz** (230 vs 370)
- Yüksek segmentte (Premium): **Microsoft 365 hala ucuz** (410 vs 560)

Türkiye'de Microsoft, Mart 2024'ten itibaren TL fiyatlandırmaya geçti — dolar kur riskini üstlendi. Google hâlâ USD bazlı, kur yükseldiğinde fatura artıyor.

**Pure maliyet kriteri tek başına seçim yapmaz** — ama Microsoft Türkiye'de şu an %20-40 daha ucuz.

## 2. Outlook / Mail Deneyimi

Bu konu Türkiye'de **en çok belirleyici** faktör.

### Microsoft Outlook

- Türk iş dünyasında varsayılan mail istemcisi (20+ yıllık alışkanlık)
- Offline mail çalışma deneyimi Gmail'den çok daha olgun
- Regex filtreleme, kurallar, kategoriler — güç kullanıcıları için derinlik var
- Dezavantaj: Eski Outlook (Win32) yavaş, yeni Outlook (2024) hala bazı özellikleri eksik

### Gmail

- Web-first — masaüstü istemci isteyenler için yetersiz (var ama sınırlı)
- Label + search mantığı Outlook klasör mantığından farklı, geçiş alışkanlık değişimi ister
- Arama kalitesi Outlook'tan üstün — Google'ın arama motoru bu
- Dezavantaj: Dış mail domain'leri "spam" damgalaması bazen agresif (Türk e-posta domainlerinin itibarı düşük olduğundan)

### Pratik gerçek

- IT Manager eski Microsoft 365'ten Google'a geçişlerde **mail alışkanlığı değişimi en çok şikayet edilen konu**. 50 kişilik ekipte bile 10-15 kişi 2-3 ay sürekli "Outlook geri gelsin" deyip durur.
- Tam tersi geçiş (Google → Microsoft) daha kolay — çünkü çalışanların %70'i zaten eski ofiste Outlook kullanmıştır.

**Sonuç**: Türkiye'de, özellikle 35+ yaş çalışanları yoğun şirketlerde, **Microsoft 365 mail tarafında psikolojik avantajlıdır**.

## 3. Dosya ve Ofis Ekosistemi

Burada **Google Workspace'in gerçek üstünlüğü var** — ama herkese uymuyor.

### Google Docs / Sheets / Slides

- Real-time collaboration standart, kusursuz
- 15 kişi aynı dokümanda aynı anda edit edebiliyor
- **"Cevap" yorumları**, öneri modu, version history olağanüstü
- Dezavantaj: Word/Excel'in ileri düzey özellikleri (makro, ileri VBA, kompleks pivot) eksik

### Microsoft 365 (Word / Excel / PPT)

- Desktop Office kesin — formüller, makrolar, ileri düzey formatlamada sınır yok
- Co-authoring (eş zamanlı çalışma) iyileşti ama Google'daki akıcılıkta değil
- Excel makro tabanlı büyük iş akışları Google Sheets'te **çalışmaz** — App Script'e rewrite lazım
- Dezavantaj: Web Office versiyonu hala desktop'tan zayıf

### Karar matrisi

- **Çok Excel ağırlıklı şirket** (finans, muhasebe, yatırım): **Microsoft 365** — Excel makroları ve Power Query hâlâ dünya lideri
- **Real-time collaboration odaklı ekip** (ajans, startup, yaratıcı ofis): **Google Workspace** — Docs ve Sheets co-authoring akıcılığı farklı
- **Karma** (50-50): **Microsoft 365** + Google Docs kullanıcılarına ekstra Business Starter = hibrit mümkün

## 4. Teams vs Meet

### Microsoft Teams

- Mesajlaşma + video + dosya + kanal entegrasyonu en olgunu
- Şirket içi kanal yapıları, projeler, ekipler için standart hale geldi
- **Problem**: Yavaş ve kaynak aç. 32 GB RAM'li ofis bilgisayarında bile Teams sık sık takılır
- **Türkçe destek**: Tam

### Google Meet

- Sade, hızlı, güvenilir video call
- Mesajlaşma Teams'ten zayıf — Google Chat yeni ve Teams ekosistemi kadar derin değil
- **Problem**: Şirket içi mesajlaşma kanalları için yetersiz — Slack eklemek gerekebilir
- **Türkçe destek**: Var ama Teams kadar derin değil

### Gerçek

Türkiye'de 2022'den sonra **Teams de facto standart oldu**. Müşteriler, tedarikçiler, devlet kurumları Teams'te toplantı kuruyor. Google Meet'e geçerseniz "link gönderme" problemi sürekli karşınıza çıkar — müşteri Google hesabı olmayınca "guest" katılım bazen sorunlu.

## 5. Güvenlik ve Uyum

### Microsoft 365

- **Microsoft Defender for Business** (Premium'dan itibaren) = güçlü
- **Intune** = MDM (mobil cihaz yönetimi) pazarın en olgunu
- **Purview** = DLP, compliance, data governance — enterprise seviye
- **Entra ID (Azure AD)** = kimlik yönetimi standardı
- **KVKK/KVK**: Microsoft Dublin (EU) ve Amsterdam veri merkezi kullanılabilir

### Google Workspace

- **Context-Aware Access** = zero-trust yaklaşımı
- **Vault** = e-discovery ve retention (Business Plus+)
- **Advanced Protection Program** = yüksek riskli kullanıcılar için güçlendirilmiş güvenlik
- **BeyondCorp** = zero-trust framework (Enterprise'da)
- **KVKK/KVK**: Belçika ve Hollanda veri merkezi seçenekleri

### Karar

- **SOC 2 / ISO 27001 denetim hazırlığı**: **Microsoft 365** — Purview'un denetim dokümantasyonu zengin
- **KVKK için aydınlatma + DPA**: İki taraf da destekliyor
- **Zero-trust proaktif güvenlik**: **Google Workspace** (yaklaşımı daha olgun)

## 6. Yönetim ve IT Operasyon

### Microsoft 365 Admin

- **Çoklu admin konsolu** (M365, Exchange, Intune, Entra ID, Defender, Purview) — karmaşık
- PowerShell ile güçlü otomasyon
- IT personeli öğrenme eğrisi dik ama ekosistem derin

### Google Workspace Admin

- **Tek admin konsolu** — sade
- Delegation ve granular permission iyi
- IT personeli öğrenme eğrisi düşük
- PowerShell eşdeğeri olarak GAM (Python tabanlı CLI) mevcut

### Pratik gözlem

- 2 kişilik IT ekibiyse: **Google Workspace** yönetim açısından kolay
- 5+ kişilik IT ekibi + compliance ağırlığı varsa: **Microsoft 365** derinliği değerlendirilir

## 7. Ne Zaman Hangisini?

### Microsoft 365 tercih edilmeli:

- Geleneksel Türk iş dünyası — finans, denetim, hukuk, muhasebe
- Excel makroları yoğun kullanımda
- Desktop Office'e bağımlı ekip
- Zaten Active Directory / on-prem Exchange geçmişi var
- SOC 2 / ISO 27001 yoldaysa
- Müşteri ve tedarikçi Teams kullanıyor

### Google Workspace tercih edilmeli:

- Startup, tech, yaratıcı ajans
- Gerçek zamanlı collaboration (Docs) kritik
- Web/Chrome tabanlı iş akışı
- Mobil-öncelikli ekip
- IT ekibi minimal
- Tarihte Gmail/Google Apps zaten kullanılıyor

### Kararsız kalınırsa

Türkiye'de orta ölçekli kurumsal şirketler için varsayılan önerim **Microsoft 365 Business Premium**:

1. Lisans ucuz (410 TL/kul/ay)
2. Teams + Defender + Intune paket içinde
3. Müşteri/tedarikçi ekosistemi Microsoft'a yaslanıyor
4. Excel makrolar ve desktop Office ihtiyacı kaçınılmaz
5. IT migration zorluğunda M365'e geçiş Google'dan daha sık istenir

## Geçiş Maliyeti — Hangisinden Hangisine?

### M365 → Google Workspace

- Mail migration: 50 kişi ~1-2 hafta (IMAP-based, Google Workspace Migrate tool)
- Drive migration: Office dosyaları Google formatına dönüştürme kalitesi %85-95
- Teams → Chat: Tam eşdeğer yok, 2-4 aylık kullanıcı adaptasyonu
- **Toplam tahmini maliyet**: 150-400 bin TL (50-150 kullanıcı)

### Google Workspace → M365

- Mail migration: Google Workspace Migration for Microsoft Exchange aracı ile 1-2 hafta
- Drive → OneDrive: Doğrudan aktarım, Office dosyaları zaten uyumlu
- Meet → Teams: Kullanıcılar rahat adapte oluyor
- **Toplam tahmini maliyet**: 120-300 bin TL (daha kolay yön)

## Özet

- **Türk orta ölçekli şirket için varsayılan**: Microsoft 365 Business Premium
- **Yaratıcı/startup için**: Google Workspace Business Standard
- **İki yanlış yaklaşım**:
  - "Excel'i ucuza almak için Google alıyorum" — Google Sheets makro desteklemeyeceği için pişman olursun
  - "Prestij için Microsoft, kimse Google kullanmaz" — ajans/startup'larda Google Workspace iyi çalışır, Microsoft Teams ve OneDrive gereksiz overhead

---

**Microsoft 365 mi Google Workspace mi sizin şirketinize uyar?** 30 dakikalık ücretsiz keşif görüşmesinde mevcut iş akışınızı inceleyip net öneri sunuyoruz. Lisans kurulumu, e-mail migration, kullanıcı eğitimi — Kozyatağı Bilişim olarak her iki platformda da sertifikalı ekibimizle migration süreçlerini yönetiyoruz.
