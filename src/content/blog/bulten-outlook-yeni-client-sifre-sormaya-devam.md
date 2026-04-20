---
slug: bulten-outlook-yeni-client-sifre-sormaya-devam
title: "Outlook for Windows (Yeni) — Sürekli Şifre İstemesi Döngüsü"
type: bulten
pillar: 6
url: "/blog/bulten-outlook-yeni-client-sifre-sormaya-devam"
hedef_anahtar_kelime: "outlook yeni client şifre istiyor"
meta_description: "Yeni Outlook for Windows istemcisi sürekli şifre soruyor — MSA-only ortamlarda Modern Auth / Entra ID hibrit sorunu. Bilinen hata ve kalıcı çözüm."
kelime_sayisi: "~750"
pillar_linki: "/hizmetler/kurumsal-eposta"
bulten: true
date: 2025-03-05
last_updated: 2026-04-12
status: aktif
severity: orta
product_family: "Microsoft 365 & Outlook"
affected_versions: "Outlook for Windows (new, Teams gibi) — 1.2024.x öncesi sürümler"
fixed_version: "Kısmi — yapılandırma + bazı senaryolarda Outlook Classic geri dönüş"
vendor_advisory: "MC712456 (Outlook for Windows known issues)"
workaround_available: true
---

## Özet

Microsoft'un yeni Outlook for Windows istemcisi (Mail app'in yerine geçen) bazı kurumsal ortamlarda **sürekli şifre soran döngüye giriyor**:

1. Şifre gir → "Success"
2. 30 saniye sonra → "Password required"
3. Tekrar gir → tekrar başarılı → tekrar prompt

Bu döngü özellikle **hybrid identity** (on-prem AD + Entra ID), **şifre değişikliği olan kullanıcılar** veya **MFA yenileme gerekmiş hesaplarda** sık görünüyor.

Microsoft hâlâ aktif olarak çözüm üzerinde çalışıyor, ancak 2026 Nisan itibarıyla **kalıcı kurumsal çözüm yok** — bazı ortamlarda Outlook Classic'e geçici geri dönüş öneriliyor.

## Semptom

- Outlook for Windows açıldığında credential popup
- Kullanıcı doğru şifreyi giriyor + MFA onaylıyor
- Kısa süreyle mail yükleniyor
- 20-60 saniye sonra yine "Password required"
- Döngü devam ediyor — kullanıcı iş yapamıyor

## Kök Sebepler

### Sebep 1: OAuth Token Cache Bozulması

Yeni Outlook, cache'ini AppContainer içinde tutuyor. Bu konteyner bozulunca token yenileme başarısız — kullanıcıya tekrar sorulur.

### Sebep 2: Conditional Access Policy Değişiklikleri

Yeni bir CA policy (örneğin "Require compliant device") eklenince mevcut oturumlar invalidate ediliyor ama yeni Outlook bu durumu doğru işleyemiyor.

### Sebep 3: Hybrid Modern Auth Misconfiguration

On-prem Exchange + Cloud mailbox ortamında Outlook hangi endpoint'e gideceğini karıştırıyor — Autodiscover hatalı yönlendirme.

## Geçici Çözümler

### Çözüm A: Outlook Classic'e Geçiş (En Hızlı)

Yeni Outlook'ta sağ üstte "Try the new Outlook" toggle'ı var. **Kapat** — Outlook Classic'e döner.

Classic Outlook şu an Mayıs 2029'a kadar desteklenecek (Microsoft açıkladı).

### Çözüm B: Token Cache Temizliği

```cmd
# Outlook tamamen kapat
taskkill /F /IM olk.exe
taskkill /F /IM outlook.exe

# Cache temizle
rd /s /q "%localappdata%\Packages\Microsoft.OutlookForWindows_8wekyb3d8bbwe\LocalCache\"
rd /s /q "%localappdata%\Microsoft\OLK\"

# Kullanıcı credential store temizle
# Control Panel > Credential Manager > Windows Credentials
# "microsoft_outlook_", "msa_", "mso_" ile başlayanları sil
```

Outlook'u tekrar aç, ilk login sonrası cache yeniden oluşur.

### Çözüm C: Conditional Access Exception

IT admin olarak, sorunlu kullanıcılar için **Conditional Access Policy**'ye geçici exception ekle:

```
Entra ID > Security > Conditional Access > 
[Problem Policy] > Users or workload identities > 
Exclude: "Outlook New Pilot" group
```

Test için küçük grup, sonra politika revize.

### Çözüm D: Outlook for Windows Reset (Komple)

```powershell
# Uygulama paketi reset
Get-AppxPackage Microsoft.OutlookForWindows | Reset-AppxPackage
```

Bu komut uygulamayı fabrika ayarlarına döndürür. İlk login sonrası baştan kurulur.

## Uzun Vadeli Durum

Microsoft "New Outlook"u Classic'in yerine geçirmek istiyor ama kurumsal müşterilerin bu tip sorunları nedeniyle Classic'i **2029'a kadar uzattı**. Yeni Outlook olgunlaşana kadar:

**Önerimiz**:
- Şu an kurumsal dağıtımlarda **Outlook Classic** kalmaya devam etsin
- Yeni Outlook'u **pilot grup** (10-20 kişi) ile 2027'ye kadar test et
- 2028'de yeni Outlook production'a, 2029'da tam geçiş

## Etki Seviyesi

- **Tüm kullanıcılar mı?** Hayır, specific senaryolar (hybrid identity + CA + Cache corruption).
- **Ölçek?** 100 kullanıcıdan 5-15'i etkilenebiliyor, sürekli değişken.
- **Acil mi?** Kullanıcı bazında evet (iş yapamıyor), kurumsal strateji bazında orta.

## Bilgi Notu

Bu sorun Outlook Classic'te yaşanmıyor. Bir kullanıcının "şifre istiyor" şikayetinde ilk soru: "Yeni Outlook mu Classic mi kullanıyorsunuz?" Yenisindeyse Classic'e geçiş 5 saniye + sorun çözülür.

## İlgili Kaynaklar

- Microsoft MC712456
- Outlook for Windows known issues page
- Office 365 service health

---

**Outlook / M365 client management sorunlarında uzman destek?** Kozyatağı Bilişim olarak kullanıcı seviyesi troubleshoot + kurumsal deployment yönetimi. [Teknik görüşme talep edin.](/#contact)
