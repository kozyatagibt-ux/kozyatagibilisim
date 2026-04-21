---
slug: ai-security-policy-chatgpt-claude-kurumsal
title: "AI Kullanım Politikası — ChatGPT, Claude Kurumsal Güvenlik Rehberi"
type: cluster
pillar: 6
url: "/blog/ai-security-policy-chatgpt-claude-kurumsal"
hedef_anahtar_kelime: "chatgpt kurumsal guvenlik politikasi"
meta_description: "Kurumsal AI kullanım politikası — ChatGPT Team/Enterprise, Claude for Work, Gemini Business. Veri sızıntısı riski, KVKK, çalışan eğitimi."
kelime_sayisi: "~1100"
pillar_linki: "/hizmetler/kobi-siber-guvenlik"
---

## "Samsung Mühendisi ChatGPT'ye Kaynak Kodu Yapıştırdı"

2023 Samsung vakası — mühendis internal source code ChatGPT'ye özetletmek için yapıştırdı. OpenAI modelinde training data oldu. Samsung tüm AI kullanımını yasakladı.

Siz: "Bizim çalışanlar ne yapıyor ChatGPT'de?"

## Hızlı Çözüm (TL;DR)

1. **Yasak değil, yönet** — AI zaten kullanılıyor, engelle diye kapanmaz
2. **Kurumsal tier'a geç** — ChatGPT Team/Enterprise, Claude for Work (data training için kullanılmaz)
3. **Policy yaz** — hangi veri AI'ya girilebilir, hangisi giremez
4. **Shadow AI keşfet** — Defender for Cloud Apps ile discover
5. **Eğitim** — AI literacy + güvenli prompting

---

## Riskler

### 1. Veri Sızıntısı

Ücretsiz ChatGPT (chat.openai.com):
- Default: prompt + response OpenAI training'e kullanılabilir
- Chat history başka session'a leak riski (2023 bug)
- Kurumsal sırrı prompt'a yazan çalışan → public domain

### 2. Hallucination

AI yanlış bilgi üretir güvenle:
- "ABC kanun maddesi 5651 Article 7..." — uydurma
- Çalışan doğrulamadan raporda kullanır
- Legal/financial karar kötü çıkar

### 3. Telif Hakkı

AI output kimindir?
- OpenAI: "user owns output" — ama training'deki copyrighted material risk
- Stable Diffusion (Getty davası): AI generated image copyright belirsiz

### 4. Bias + Etik

AI eski training data ile önyargı:
- İK: CV değerlendirme AI cinsiyet bias gösterebilir (Amazon vakası 2018)
- Kredi scoring AI zenci müşteriyi dezavantajlı scorelar (çeşitli davalar)

## Kurumsal AI Platformları

### ChatGPT Team ($25/user/month)

- **Training için kullanılmaz** (data privacy contractual)
- GPT-4, DALL-E, web browse
- Admin console: user management
- SOC 2 Type 2, GDPR

### ChatGPT Enterprise (custom pricing)

- Team özellikleri +
- SSO (SAML)
- Audit log API
- Unlimited GPT-4
- Custom data retention
- Enterprise SLA

### Claude for Work / Claude Team ($25-30/user/month)

- Claude Sonnet 4.5 / Opus
- 200K context (dev için ideal)
- Anthropic Constitutional AI — safer
- Data not used for training

### Microsoft 365 Copilot ($30/user)

- M365 data entegre
- Tenant isolation
- [Ayrı rehber](/blog/microsoft-copilot-for-business-deployment-kobi)

### Google Gemini for Workspace

- Google Workspace dahil
- Docs, Gmail entegre
- Workspace data isolation

## 10:00 — AI Kullanım Policy Şablonu

### İzin Verilen

- **Genel araştırma**: public konu, trending, öğrenme
- **Taslak yazma**: mail, doküman, sunum taslağı
- **Kod yardımı**: non-sensitive code review, syntax
- **Özet**: public dokümanları özetletme
- **Çeviri**: hassas olmayan metinler

### YASAK

- ❌ Müşteri verisi (isim, TC, iletişim, finans)
- ❌ Çalışan verisi (bordro, İK)
- ❌ Kaynak kodu (proprietary)
- ❌ Finansal rapor (ham)
- ❌ Hukuki doküman (contract detail)
- ❌ Şifre, API key, credential

### Şartlı

- Firma logosu ile sunum: OK kurumsal tier'da
- İç policy özetleme: OK kurumsal tier'da
- E-mail taslak: kişisel veri redact edilirse OK

## 10:15 — Discovery (Shadow AI)

### Defender for Cloud Apps

```
Cloud Discovery > Reports > New snapshot report
Upload: Proxy/Firewall log (last 30 days)
```

AI app usage:
- ChatGPT visits
- Claude visits
- Perplexity, Gemini, Copilot
- Image gen (Midjourney, DALL-E direct)
- Code AI (Cursor, Copilot CLI)

Risk rating + user count.

### Fortigate / Palo Alto App-ID

```
App signature: AI-Tools kategorisi
Policy: "AI-Tools" → Log + alert
```

Kullanım verisi → yönetime raporla.

## 10:30 — Block vs Allow Strategy

### Naive Block

"ChatGPT'yi Fortigate'te bloklayalım" — 
- User VPN ile erişir
- Mobile 4G ile erişir  
- Proxy ile erişir

Block çalışmaz, visibility gider.

### Managed Allow

- Kurumsal ChatGPT Team deploy
- Public ChatGPT (chat.openai.com) block
- User'ları kurumsal versiyona yönlendir
- DLP: kurumsal ChatGPT'de bile hassas veri gönderimi log

## 10:45 — DLP + AI

### M365 Purview

Endpoint DLP:
- Chrome/Edge extension browser-level
- Kural: "chat.openai.com/claude.ai URL'ine sensitive content paste = block"

```
Rule: Block uploads to public AI services
- Activity: Paste to cloud app
- Domain: *.openai.com, *.anthropic.com, gemini.google.com
- Content contains: TC Kimlik pattern, Credit card, "Confidential" label
- Action: Block + Notify user
```

### Browser Extension

Kurumsal Chrome/Edge:
- GPO push browser extension (DLP)
- Paste monitoring
- Screenshot blocking (sensitive label)

## 11:00 — Çalışan Eğitimi

### 1 Saatlik AI Literacy Session

1. AI nedir, nasıl çalışır (basic ML concept)
2. Hallucination + verification
3. Data privacy — prompt'ta ne yazma
4. Good vs bad prompt örnekleri
5. Kurumsal tool demo (ChatGPT Team)
6. Kime soracağın (IT helpdesk AI policy)

### Prompt Guide

**KÖTÜ**:
```
"Müşterimiz Ahmet Yılmaz, TC 12345678901, 
kredi skorumuzu 650 gösteriyor, rapor yaz"
```

**İYİ**:
```
"Genel olarak 650 kredi skorlu müşteri için 
değerlendirme raporu nasıl yazılır, taslak ver"
```

## 11:15 — Özel Case: Developer

### Code AI Tools

- **GitHub Copilot Business** — enterprise SSO, no training on code, SOC 2
- **Cursor** — BYO key (kendi OpenAI API)
- **Claude Code** — Anthropic enterprise

Policy:
- ✅ Public repo code
- ✅ Library/framework soru
- ❌ Proprietary algorithm
- ❌ Customer data in code

### Self-Hosted LLM

Hassas veri için:
- **Ollama + Llama 3.3** on-prem GPU
- **Azure OpenAI** (tenant isolated, EU region)
- Hukuki/finansal AI için ideal

## Governance Template

```
AI Usage Policy
Effective: 2026-01-01
Scope: Tüm çalışanlar + kontratlı

1. Yalnız onaylı AI tools (ChatGPT Team, Claude for Work, Copilot)
2. Kişisel ChatGPT account iş için yasak
3. Hassas veri girilmez (listed)
4. AI output user sorumluluğu — doğrula
5. AI generated content disclose et (report, legal doc)
6. Violation: warning → suspension → termination
```

## KVKK Perspektif

KVKK açısından AI:
- **Veri sorumlusu**: firma
- **Veri işleyen**: OpenAI/Anthropic (kurumsal contract ile)
- Aydınlatma metni: "AI ile işleme" ekle
- Yurt dışı veri aktarımı: açık rıza veya uygunluk

## İlgili Rehberler

- [Microsoft Copilot Deployment](/blog/microsoft-copilot-for-business-deployment-kobi)
- [DLP KVKK](/blog/m365-dlp-kvkk-kisisel-veri-sizma-koruma)
- [Zero Trust KOBİ](/blog/zero-trust-architecture-kobi-rehberi)

---

**AI policy + kurumsal AI deployment için destek?** [Teknik görüşme.](/#contact)
