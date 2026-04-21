---
slug: microsoft-copilot-for-business-deployment-kobi
title: "Microsoft Copilot for Business — KOBİ Deployment Stratejisi"
type: cluster
pillar: 6
url: "/blog/microsoft-copilot-for-business-deployment-kobi"
hedef_anahtar_kelime: "microsoft copilot business kobi"
meta_description: "Microsoft 365 Copilot for Business (Business Chat) deployment — lisans, data privacy, veri envanteri, pilot grup, governance. KOBİ için rehber."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/kurumsal-eposta"
---

## "Copilot Almalı mıyız?"

Genel Müdür 2024'te haberden duydu:
> "ChatGPT gibi bir şey Microsoft'tan var — Copilot. Çalışanlarımız kullansın, verimli olsun. Alalım mı?"

BT sorumlusu bilmiyor. Nedir, nasıl deploy edilir, data güvenli mi?

## Copilot Ne?

**Microsoft 365 Copilot** — Microsoft'un GPT-4 bazlı AI assistant:
- Outlook: mail özetleme, taslak yazma
- Word: doküman yazma, özetleme
- Excel: formül, analiz, grafik
- PowerPoint: sunum üretimi
- Teams: toplantı özetleme, chat taslak
- Business Chat: tenant-wide AI arama

**Copilot for Microsoft 365** vs **Copilot Chat**:
- **Copilot Chat** (ücretsiz, tenant wide) — Bing Chat Enterprise benzeri, sadece web
- **Copilot for M365** (ücretli, ~420 TL/user/month) — app integration + tenant data access

## Hızlı Çözüm (TL;DR)

1. **Veri envanteri** — SharePoint + OneDrive + Teams temiz mi?
2. Access control audit — hassas verisini yanlış kişi görür mü?
3. **Pilot grup** — 5-10 kullanıcı (farklı departman)
4. Copilot lisans ata (Microsoft 365 E3/E5 + Copilot add-on)
5. Training — kullanıcıya "nasıl etkili prompt yazılır"
6. 30 gün kullanım + feedback
7. Success metrics ile rollout kararı

---

## Ön Koşul: Data Governance

**Copilot tenant'taki TÜM veriye erişebilir**. Kullanıcı "Geçen sene maliyet rapor özeti" diye sorduğunda Copilot tüm dosyalardan yanıt oluşturur.

**Problem**: Kullanıcıya yasal olarak erişim olmaması gereken dosyaya Copilot erişirse (misconfigured SharePoint permission), AI bu bilgiyi cevapta kullanır.

### Ön Temizlik (Mandatory)

1. **SharePoint site audit**: Her site'ın permission review
2. **OneDrive paylaşım**: Departman dosyaları yanlış paylaşılmış mı?
3. **Sensitive data labels** (Purview): Confidential, Restricted labeling
4. **DLP policies** aktif

Hazırlıksız Copilot deploy = data leak riski.

## 10:00 — Lisans

Copilot add-on:
- **M365 Business Standard + Copilot**: ~$30/user/month
- **M365 E3 + Copilot**: ~$30/user/month
- **M365 E5 + Copilot**: Best (Purview E5 data classification dahil)

Minimum 300 user → "Enterprise" discount olur. Daha az → full price.

**Per-user**: 30 kişi × $30 = $900/ay = ~30K TL/ay.

ROI analiz şart. Her user'a verim için yıllık ~360K TL yatırım.

## 10:15 — Pilot Grup

Önce 10 kullanıcı:
- CEO / Genel Müdür (executive briefing)
- 1 Finans (Excel heavy)
- 2 Satış (mail + teklif)
- 2 Marketing (content creation)
- 1 İK (policy writing)
- 2 Geliştirici (code review)
- 1 Operasyon

30 gün trial. Kullanım patterns + satisfaction.

## 10:30 — Training

Copilot etkili kullanım:
- **Kötü prompt**: "Özet yap" → çıktı kalitesiz
- **İyi prompt**: "Bu toplantının 3 kritik kararını madde madde Türkçe özetle. Aksiyon maddeleri ayrı yaz."

KnowBe4 benzeri AI literacy eğitim — 1 saatlik:
- Effective prompting
- Verification (AI hallucination kontrolü)
- Privacy — hassas veriyi prompt'a yazma

## 10:45 — Data Privacy Concerns

### "Veri Microsoft'a gidiyor mu?"

Microsoft resmi policy:
- Tenant data Copilot için **kullanılır** (inference)
- Microsoft **training için kullanmaz** (tenant isolation)
- Veri Microsoft data center'da (EU region seçilirse AB'de)

KVKK açısından:
- **Veri işleyen (processor)**: Microsoft
- **Veri sorumlusu (controller)**: Firma
- Aydınlatma metninde belirt

### Hassas Veri Kısıtlama

```
Purview > Sensitivity Labels:
- "Confidential — Do Not Share with AI"
Apply to sensitive Docs

Copilot bu label'lı dosyalara erişmez.
```

## 11:00 — Governance Policy

Yazılı company policy:
- Kullanıcı Copilot ile üretilen içeriği kontrol eder (AI halüsinasyon)
- Hassas veri Copilot'a yazılmaz
- Copilot output'u attribute edilir ("bu content AI ile üretildi")
- Copilot logs audit edilir (Purview)

## 11:15 — Kullanım Metrikleri

M365 Admin Center > Usage > Copilot:
- Active users (lisanslı kaç kullandı)
- Queries per user
- Top apps (Excel %, Outlook %)
- Satisfaction survey

30 gün sonra:
- Heavy users — %80+ kullanım
- Light users — %10 altında
- Light kullanıcılardan lisans kaldır, maliyet optimize

## Alternatives

Copilot pahalı. KOBİ için alternatif:
- **ChatGPT Team** — $25/user/month, data privacy OK
- **Claude for Work** — similar, Anthropic
- **Perplexity Enterprise** — web search + AI

Microsoft ecosystem zaten kullanıyorsa Copilot entegrasyon best. Değilse ChatGPT Team ucuza aynı değer.

## Risk Senaryoları

### 1. Halüsinasyon

Copilot "5 yıldır müşteriniz olan X Firması..." derse, doğruluk kontrolü user'ın sorumluluğu.

### 2. Data Leak

Misconfigured SharePoint → Copilot yanlış kişiye rapor üretir. **Ön temizlik şart**.

### 3. Over-reliance

Çalışan her şey için Copilot → eleştirel düşünce azalır. Training'de vurgula.

## İlgili Rehberler

- [DLP KVKK](/blog/m365-dlp-kvkk-kisisel-veri-sizma-koruma)
- [Retention Policy](/blog/m365-retention-policy-10-yil-saklama)
- [Conditional Access](/blog/m365-conditional-access-require-mfa-admins)

---

**M365 Copilot deployment + AI governance için destek?** [Teknik görüşme.](/#contact)
