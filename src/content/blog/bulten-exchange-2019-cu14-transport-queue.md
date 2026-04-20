---
slug: bulten-exchange-2019-cu14-transport-queue
title: "Exchange Server 2019 CU14 — Transport Queue Büyümeye Devam Ediyor"
type: bulten
pillar: 6
url: "/blog/bulten-exchange-2019-cu14-transport-queue"
hedef_anahtar_kelime: "exchange 2019 cu14 transport queue"
meta_description: "Exchange Server 2019 Cumulative Update 14 yükledikten sonra transport queue sürekli büyüyor. Geçici çözüm: mesaj işleme sınırlarını artırma."
kelime_sayisi: "~850"
pillar_linki: "/hizmetler/kurumsal-eposta"
bulten: true
date: 2024-02-15
last_updated: 2024-05-22
status: cozuldu
severity: yuksek
product_family: "Microsoft 365 & Outlook"
affected_versions: "Exchange Server 2019 CU14 (Build 15.2.1544.4)"
fixed_version: "Exchange 2019 CU14 Mart 2024 Security Update (SU)"
vendor_advisory: "Microsoft Exchange Team Blog, Şubat 2024"
workaround_available: true
---

## Özet

Exchange Server 2019 Cumulative Update 14 (Şubat 2024) yükledikten sonra bazı kurumsal ortamlarda **transport queue'ların sürekli büyüdüğü** rapor edildi. Mesajlar submit oluyor ama teslim edilmiyor, saatler geçtikçe queue 10.000+ mesaja ulaşıyor.

**Durum**: Microsoft Exchange Team Mart 2024 SU'da düzeltti. Yamadan önce geçici çözümler geçerliydi.

## Semptom

- On-prem Exchange'te iç mail akışı normal görünüyor
- Dış gönderim (external delivery queue) büyüyor
- Queue Viewer'da:
  ```
  Queue: contoso.com
  Status: Retry
  Messages: 8234 (and growing)
  Last Error: "451 4.7.500 Server busy, try again later"
  ```

- Event log'da:
```
Event ID 1023 (MSExchangeTransport)
Source Server is throttling messages from the recipient 
domain due to rate limiting.
```

## Kök Sebep

CU14'te **Transport rate limiting** parametrelerinin default değerleri değiştirildi. Büyük mail hacmi olan kurumlarda (5.000+ kullanıcı) throttling tetikleniyordu. Microsoft bu değişikliği CU14 release notes'ta belirtmemişti, topluluk 48 saat içinde fark etti.

## Geçici Çözüm

Exchange Management Shell:

```powershell
# Mevcut değerleri gör
Get-TransportService | Select Name, MaxConcurrentMailboxDeliveries, MaxConcurrentMailboxSubmissions

# Default 20'yi 40'a yükselt
Set-TransportService -Identity "EXCHANGE-SRV" `
    -MaxConcurrentMailboxDeliveries 40 `
    -MaxConcurrentMailboxSubmissions 40

# Servis restart
Restart-Service MSExchangeTransport
```

Ek olarak throttling policy'yi gevşet:

```powershell
# Internal delivery için rate limit kaldır
Set-ThrottlingPolicy "GlobalThrottlingPolicy_*" `
    -MessageRateLimit $null `
    -RecipientRateLimit $null
```

## Kalıcı Çözüm

Mart 2024 SU ile:
- Default rate limiting değerleri kurumsal ortamlar için revize edildi
- Rate limiting tetiklendiğinde daha informatif log mesajları

Upgrade:
1. Exchange Admin Center > Servers > Updates
2. Veya manuel: Microsoft Download Center'dan Mart 2024 SU indir
3. Exchange server'da yükleme (tek sunucu bile olsa maintenance mode önerilir)

## Hybrid Ortamlarda Ek Dikkat

Exchange on-prem + M365 hybrid kullanıyorsanız:
- Send Connector (Office 365 → Internet) üzerinde ayrı throttling olabilir
- Message header inceleme ile nerede takıldığını bulun: `Get-MessageTrackingLog`

## Etki Seviyesi

- **Bugün hâlâ risk mi?** Hayır, kalıcı fix var.
- **CU14 kurup SU yüklemedim — ne olur?** Mart 2024 SU uygulaması önerilir. Güvenlik + transport fix içeriyor.
- **CU15 (2024 sonu)'e geçebilir miyim?** Evet. CU15 bu bug'ın revize edilmiş değerleri içerir + yeni güvenlik özellikleri.

## İlgili Kaynaklar

- Microsoft Exchange Team Blog, February 2024 Update
- Exchange 2019 Release Notes — Updates

---

**On-prem Exchange yönetimi, hybrid M365 deployment ve update planlama konularında uzman destek?** Kozyatağı Bilişim Exchange MCSE sertifikalı ekibimizle kurumsal mail altyapısı. [Teknik görüşme talep edin.](/#contact)
