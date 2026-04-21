---
slug: bddk-bilgi-sistemleri-denetimi-it-hazirlik
title: "BDDK Bilgi Sistemleri Denetimi — IT Manager Hazırlık Rehberi"
type: cluster
pillar: 2
url: "/blog/bddk-bilgi-sistemleri-denetimi-it-hazirlik"
hedef_anahtar_kelime: "bddk bilgi sistemleri denetimi"
meta_description: "BDDK tebliğ gereği bilgi sistemleri yönetimi ve denetimi — finans sektörü IT Manager için hazırlık rehberi. Kontrol listesi, belgeler, yaygın bulgular."
kelime_sayisi: "~1300"
pillar_linki: "/hizmetler/it-saglik-kontrolu-denetim"
---

## "BDDK Müfettişi Önümüzdeki Ay Geliyor"

Orta ölçekli bir finans şirketinde BT müdürü Zeynep:
> "BDDK'dan denetim bildirimi geldi. 'Bilgi Sistemleri Yönetimi ve Denetimi Tebliği' kapsamında inceleme. Hazırlık için ne yapmalıyım?"

Finans, sigorta, ödeme kuruluşları, e-para kuruluşları — BDDK kapsamında. ISO 27001 gönüllü; BDDK **mecburidir**.

## BDDK Tebliğleri

1. **Bankaların Bilgi Sistemleri ve Elektronik Bankacılık Hizmetleri Hakkında Yönetmelik** — Bankalar için
2. **Bilgi Sistemleri Yönetimi Tebliği** — Finansal kuruluşlar
3. **COBIT 2019** framework alanlar için referans

## Hızlı Çözüm (TL;DR)

10 kritik alan:
1. Yönetişim + Organizasyon
2. Risk yönetimi
3. BT Yönetimi + SLA
4. Değişiklik Yönetimi
5. Erişim Kontrolü + Kimlik Yönetimi
6. Ağ Güvenliği
7. Veri Güvenliği + Şifreleme
8. İş Sürekliliği + DR
9. Bağımsız Güvence + Denetim İzi
10. Olay Yönetimi

---

## 10:00 — Hazırlık Belgeleri Checklist

### Yönetişim Belgeler
- [ ] Bilgi Güvenliği Politikası (üst yönetim onaylı)
- [ ] BT Yönetim Sistemi Prosedürleri (10+ prosedür)
- [ ] Organizasyon şeması — BT ekip + raporlama
- [ ] Job description — her BT rol
- [ ] Yetki matrisi (RACI)

### Risk Yönetimi
- [ ] BT Varlık envanteri (tüm sunucular, network, cihazlar, yazılımlar)
- [ ] Risk Değerlendirme Metodolojisi
- [ ] Risk Register (tehdit × zafiyet × varlık)
- [ ] Risk Treatment Plan + timeline
- [ ] Yıllık risk review tutanağı

### Değişiklik Yönetimi
- [ ] Change Management Prosedürü
- [ ] Change Advisory Board (CAB) tutanakları
- [ ] Son 6 ay tüm change ticket'ları (yazılı kanıt)
- [ ] Production deployment log

### Erişim Kontrolü
- [ ] Access Control Policy
- [ ] Kullanıcı yetki matrisi (role-based)
- [ ] Çeyreklik Access Review kayıtları
- [ ] Privileged Account Management (PAM)
- [ ] MFA tüm hesaplarda (özellikle admin)
- [ ] İşe giriş/ayrılış IT check-list

### Ağ Güvenliği
- [ ] Network diyagramı (güncel)
- [ ] Firewall rule base (review kaydı)
- [ ] IPS/WAF log ve aksiyon kayıtları
- [ ] VPN kullanımı + auth method
- [ ] Wi-Fi güvenlik (WPA2-Enterprise + certificate)

### Veri Güvenliği
- [ ] Veri sınıflandırma (Public, Internal, Confidential, Restricted)
- [ ] Encryption at-rest (disk, veritabanı)
- [ ] Encryption in-transit (TLS)
- [ ] KVKK veri envanteri
- [ ] Müşteri verisi işleme kayıtları

### İş Sürekliliği
- [ ] İş Sürekliliği Planı (BCP)
- [ ] Felaket Kurtarma Planı (DRP)
- [ ] Yıllık BCP tatbikatı tutanağı
- [ ] RPO/RTO tanımları
- [ ] Yedekleme prosedürü + restore test
- [ ] Alternate site (DR) dokümantasyonu

### Denetim ve Log
- [ ] Merkezi log yönetimi (SIEM)
- [ ] Log retention 10 yıl
- [ ] Audit trail (hangi admin ne yaptı)
- [ ] Düzenli log review tutanakları

### Olay Yönetimi
- [ ] Incident Response Plan
- [ ] Son yıl yaşanan olayların kaydı
- [ ] Post-mortem analiz belgeleri
- [ ] KDK (KVKK) veri ihlali bildirim örneği

## 10:30 — Yaygın Denetim Bulguları

BDDK denetçilerinin en sık yazdığı bulgular:

### 1. "Privileged Account Review Eksik"
- Domain Admin grubunda 8 kişi, yılda 1 kez bile review yapılmamış
- **Çözüm**: Çeyreklik access review, tutanak

### 2. "MFA Tüm Admin'de Aktif Değil"
- 2 admin MFA'sız
- **Çözüm**: Conditional Access "Require MFA for Admins"

### 3. "Log Retention < 10 Yıl"
- SIEM 1 yıllık, arşiv yok
- **Çözüm**: Log export + cold storage (10 yıl)

### 4. "BCP Tatbikat Yapılmamış"
- Plan var ama hiç çalıştırılmamış (test edilmemiş)
- **Çözüm**: Yıllık tabletop + restore test kayıt

### 5. "Change Management Kayıt Dışı"
- Acil değişiklikler "sonra yazarız" → yazılmamış
- **Çözüm**: Emergency change retroactive documentation 24h içinde

### 6. "Firewall Rule Base Review Eksik"
- 500 firewall rule — hiçbiri review edilmemiş
- **Çözüm**: 6 aylık firewall rule audit + cleanup

### 7. "Üçüncü Taraf İzleme Yetersiz"
- MSP / cloud provider için security assessment yok
- **Çözüm**: Yıllık vendor audit + SLA review

## 10:45 — Denetim Öncesi 30-Day Sprint

### Hafta 1
- Dokümantasyon review — güncel mi?
- Eksikleri listele
- CISO / BT müdürü öncelik sıralaması

### Hafta 2
- Technical gap remediation
  - MFA gap'leri
  - Log retention genişletme
  - Privileged account cleanup

### Hafta 3
- Simulated audit (internal)
- Denetçi bakış açısıyla dokümantasyonları gözden geçir
- Teknik personeli "sorgu" için hazırla

### Hafta 4
- Fine-tuning
- Kritik belgeler hazır paketleme
- Denetim günü logistics

## Denetim Günü

### Saha Ziyareti Akış
1. Opening meeting (30 dk) — kapsam + gündem
2. Dokümantasyon review (2-4 saat)
3. Teknik sistemlere örnek kontrol (2-4 saat)
4. Personel mülakatları (BT Manager, SOC, DBA, CISO)
5. Closing meeting — preliminary findings

### Önemli İpuçları
- **Dürüst ol** — bilmediğini "bilmiyorum, X kişisine soruyorum" de
- **Speculate etme** — bulgu için "yaklaşık yüzde sekse yakın" deme; doğrusu: "Son rapor %78, önceki quarter'da %82"
- **Belgeli cevapla** — sözde "evet yapıyoruz" yerine "şu dokümantta, sayfa X'te tanımlıdır"

## BDDK Bulgularını Kapatma

Rapor sonrası:
- **Major**: 3-6 ay içinde kapatılmalı, yoksa ceza
- **Minor**: 12 ay
- **Observation**: Tavsiye, zorunlu değil

Her bulgu için action plan + responsible person + deadline + evidence (kapanış kanıtı).

## Sürekli İyileştirme

Denetim 2 yılda bir (genelde). Aradaki sürede:
- Quarterly internal audit
- Continuous compliance monitoring
- Yeni BDDK tebliğleri takibi (düzenli değişir)

## İlgili Rehberler

- [ISO 27001 90 gün yol haritası](/blog/iso-27001-kobi-90-gun-yol-haritasi)
- [KVKK öz-denetim aracı](/kvkk-oz-denetim)
- [Event 4625 Brute force](/blog/event-id-4625-brute-force-tespit-onlem)

---

**BDDK + ISO 27001 hazırlık danışmanlığı için destek?** Kozyatağı Bilişim compliance paketimiz. [Teknik görüşme.](/#contact)
