---
slug: exchange-on-prem-to-m365-migration-batch
title: "Exchange On-Prem → M365 Mailbox Migration Batch — Cutover + Staged"
type: cluster
pillar: 6
url: "/blog/exchange-on-prem-to-m365-migration-batch"
hedef_anahtar_kelime: "exchange on prem to m365 migration"
meta_description: "On-prem Exchange'den M365'e mailbox migration — Cutover, Staged, Hybrid batch migration strategy. CSV-based bulk move adım adım."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/kurumsal-eposta"
troubleshoot: true
error_code: "Mailbox Migration"
product_family: "Microsoft 365 & Outlook"
---

## "100 Mailbox'ı M365'e Taşıyoruz"

On-prem Exchange 2016 → M365. 100 kullanıcı. Hangi migration tipi?

## Migration Tipleri

| Tip | User Count | Co-existence | Downtime |
|---|---|---|---|
| **Cutover** | < 150 | Yok (tek seferde hepsi) | Saat-gün |
| **Staged** | 150-2000 | Evet (on-prem + M365 paralel) | Kullanıcı bazında dk |
| **Hybrid** | 2000+ | Evet, tam | Kullanıcı bazında dk |
| **IMAP** | Any | Yok (3rd party mail sağlayıcı) | Var (mail flow) |

100 user için: **Cutover** uygun ama **staged** daha kontrollü.

## Hızlı Çözüm (TL;DR) — Staged Batch

1. Exchange Admin Center (M365) > Migration > + Migrate
2. Migration endpoint: on-prem Exchange bilgileri
3. CSV ile mailbox listesi
4. Target delivery domain: firma.mail.onmicrosoft.com
5. Start batch → delta sync
6. Complete migration (her user) → MX cutover per user

---

## Ön Koşullar

- Entra Connect sync aktif (user objects M365'te)
- Lisans atandı (M365 Business Standard+)
- Autodiscover public DNS: autodiscover.firma.com.tr → on-prem Exchange
- TLS cert: public CA + doğru SAN
- Network: on-prem → M365 outbound TCP 443, 80 açık

## 10:00 — Migration Endpoint

M365 EAC > Migration > **Endpoints**:

> 📸 **Ekran 1** — New Endpoint  
> "+ Add migration endpoint"  
> Select migration type: **Outlook Anywhere** (on-prem Exchange)  
> Next  
>   
> Exchange server FQDN: mail.firma.com.tr  
> Proxy server (opsiyonel): (boş)  
> Port: 443  
> Authentication: NTLM  
>   
> Test: "Test connection" → green

Save.

## 10:10 — Migration Batch

EAC Migration > **+ Add Migration Batch**:

> 📸 **Ekran 2** — New batch  
> Name: "Staged-Batch-1"  
> Migration type: **Remote move** (hybrid) veya **Cutover**  
>   
> Select Users: CSV Upload  
>   EmailAddress,Password  
>   user1@firma.com.tr,OldPassword123  
>   user2@firma.com.tr,OldPassword456  
>   ...  
>   
> (Password kolonu staged migration için — on-prem'den credential ile mailbox okunur)  
>   
> Target delivery domain: firma.mail.onmicrosoft.com  
>   
> Advanced:  
>   Bad item limit: 10  
>   Large item limit: 0  
>   
> Start the migration batch automatically: ✓

Save. 15 dk içinde delta sync başlar.

## 10:30 — Progress İzleme

EAC Migration dashboard:

> 📸 **Ekran 3** — Batch progress  
> Batch: "Staged-Batch-1"  
> Status: **Syncing** (6/100 completed)  
> Progress per user:  
>   user1@firma.com.tr — Synced 78%  
>   user2@firma.com.tr — Synced 45%  
>   ...  
>   
> Average sync time: 15-45 min per mailbox (5-10 GB)

Delta sync periodic — mail-in-flight her 30 dk refresh.

## 11:00 — User Cutover (Complete Migration)

Her user için, batch'ten **complete**:

> 📸 **Ekran 4** — Complete migration  
> user1@firma.com.tr sağ tık > "Complete"  
> Warning: "This user's on-prem mailbox will be disabled. Outlook will connect to M365."  
> Confirm

Post-complete:
- On-prem mailbox disabled (read-only)
- User Outlook restart → M365'e redirect (autodiscover)
- M365'te tam data var
- Mail flow: external mail → MX → on-prem Exchange → forward to M365 (hybrid mail flow)

## Cutover Migration (Tek Seferde)

150 user altı için daha hızlı:

```
Migration Type: Cutover Exchange migration
```

- On-prem Exchange'in tüm mailbox'larını M365'e kopyalar
- MX record M365'e değiştirilir
- On-prem decommission

**Downtime**: MX record TTL propagation süresi (~1-24 saat).

## MX Record Cutover

Staged/Hybrid bittikten sonra MX M365'e çevrilir:

```
Old:
mail.firma.com.tr. MX 10 mail.firma.com.tr.

New:
mail.firma.com.tr. MX 10 firma-com-tr.mail.protection.outlook.com.
```

DNS propagation 1-24 saat. Bu süre içinde mail'ler hem on-prem hem M365'e düşebilir — hybrid routing.

## Post-Migration Cleanup

Tüm user M365'te:
```powershell
# On-prem Exchange'de mailbox'ı tamamen delete
Get-Mailbox -ResultSize Unlimited | Disable-Mailbox
```

AD kullanıcı hesabı **silme** — sadece mailbox disable. User remote mailbox olarak AD'de kalır.

## Yaygın Hatalar

### "The connection to the mailbox failed"

Endpoint bilgileri yanlış. Test Connection rerun. Autodiscover public erişilebilir mi?

### "Bad item limit exceeded"

Bozuk mail öğesi (corrupt PST item). Limit artır:
```
Bad item limit: 50
```

Veya source'ta temizle.

### Outlook Client M365'e Yönlenmiyor

Autodiscover DNS hâlâ on-prem'e. Hybrid'te:
- Her user'ın targetAddress attribute'u `user@firma.mail.onmicrosoft.com`
- Autodiscover on-prem → redirect M365

Entra Connect attribute sync doğru mu?

## İlgili Rehberler

- [Exchange Hybrid Configuration Wizard](/blog/exchange-hybrid-configuration-wizard-hcw)
- [Azure AD Connect sync](/blog/ad-azure-ad-connect-sync-kurulum-filtering)

---

**Exchange migration projesi için uzman destek?** [Teknik görüşme.](/#contact)
