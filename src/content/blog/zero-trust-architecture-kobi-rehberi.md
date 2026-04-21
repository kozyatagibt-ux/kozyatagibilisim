---
slug: zero-trust-architecture-kobi-rehberi
title: "Zero Trust Architecture — KOBİ için Pratik Uygulama Rehberi"
type: cluster
pillar: 6
url: "/blog/zero-trust-architecture-kobi-rehberi"
hedef_anahtar_kelime: "zero trust kobi"
meta_description: "Zero Trust Architecture KOBİ için — identity, device, network, application, data 5 pillar. Microsoft 365 + Entra ID + Intune ile pratik kurulum."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/kobi-siber-guvenlik"
---

## "Firewall Var, Güvendeyiz" Dönemi Bitti

2015'te IT Manager: "Fortigate'imiz var, iç ağ güvenli". 2026'da gerçek:
- Çalışanlar evden, kafede, otelden bağlanıyor
- SaaS (M365, Salesforce) — trafik asla iç ağa girmiyor
- Phishing ile ele geçen user → tüm ağa açık kapı
- Ransomware içerden başlıyor (lateral movement)

**Zero Trust** = "Never trust, always verify". İç ağ güvenli değil, her erişim doğrulanır.

## Hızlı Çözüm (TL;DR)

5 pillar:
1. **Identity** — MFA zorunlu (Conditional Access)
2. **Device** — Intune compliance (patched, encrypted)
3. **Network** — Segmentation (VLAN, micro-seg)
4. **Application** — App-level access control
5. **Data** — Classification + DLP

KOBİ için giriş: M365 E3 + Entra ID P1 + Intune yeterli.

---

## Zero Trust Ne Değil

**Yanlış anlayışlar**:
- "Tek ürün" — değil. Prensip + mimari.
- "VPN'i kaldır" — değil. VPN hâlâ olur, ama sadece VPN yetmez.
- "Pahalı" — başlangıç seti M365 lisansıyla dahil.

## 1. Identity Pillar

### MFA Zorunlu

Entra ID Conditional Access:
```
Policy: "Require MFA for all users"
- Users: All users (exclude break-glass account)
- Cloud apps: All
- Conditions: Any
- Grant: Require MFA
```

### Risk-Based Access

Entra ID P2 (Identity Protection):
- **User risk**: leaked credentials, password spray
- **Sign-in risk**: unusual location, anonymous IP, impossible travel
- High risk → block veya force password reset

### Privileged Access

Admin accounts ayrı:
- `admin.islam@domain.com` (sadece yönetim)
- `islam@domain.com` (günlük iş)
- Admin account PIM (Privileged Identity Management) ile just-in-time

## 2. Device Pillar

### Compliance Policy

Intune > Devices > Compliance policies:
- Encryption: BitLocker required
- Antivirus: Defender ON + up-to-date
- OS version: Windows 11 22H2+
- Firewall: ON
- Password: 12+ chars, complexity

Non-compliant device → Conditional Access block.

### Device-Based Conditional Access

```
Policy: "M365 access requires compliant device"
- Cloud apps: Exchange, SharePoint
- Conditions: Device platform = Windows/macOS/iOS/Android
- Grant: Require device to be marked as compliant
```

Kişisel laptop (unmanaged) → M365 erişimi yok. Firma laptop → ok.

## 3. Network Pillar

### Micro-Segmentation

Eski: Flat network, tüm cihazlar birbirini görür.
Zero Trust: VLAN + firewall segment.

- VLAN 10: User PCs
- VLAN 20: Servers
- VLAN 30: IoT (printer, IP camera)
- VLAN 40: Guest
- **Inter-VLAN traffic firewall'dan geçer** — whitelist only

### VPN → ZTNA Geçiş

Klassik VPN: "Auth OK → tüm iç ağa erişim"
ZTNA (Zero Trust Network Access): "Auth OK → sadece ihtiyacın olan app"

Çözümler:
- **Cloudflare Access** — per-app policy
- **Zscaler Private Access**
- **Microsoft Entra Private Access**

## 4. Application Pillar

### SaaS App Inventory

Shadow IT problem: çalışan Dropbox, Google Drive kullanıyor firma bilmiyor.

**Defender for Cloud Apps** (MCAS):
- Discover — proxy log analiz, hangi SaaS kullanılıyor
- Assess — risk skoru
- Control — block riskli app

### App Conditional Access

Her kritik app için policy:
- **Finance app**: require MFA + compliant device + trusted location
- **Salesforce**: require MFA
- **Genel SaaS**: require MFA

## 5. Data Pillar

### Classification

Purview Information Protection:
- **Public** — website content
- **Internal** — şirket dahili dokümantasyon
- **Confidential** — finans, İK, hukuki
- **Restricted** — KVKK kişisel veri, API keys

### Auto-Labeling

Regex + trainable classifiers:
- TC Kimlik No pattern → Confidential
- Credit card pattern → Restricted
- Customer database dump → Restricted

### DLP

Data Loss Prevention:
- Confidential dosya external email ile gönderilemez
- Restricted data USB'ye kopyalanamaz (Intune policy)
- Label'lı doküman print edilemez (veya watermark ile)

## 10:00 — Pilot Roadmap (90 Gün)

### Hafta 1-2: Assessment

- Kullanıcı sayısı, device count, M365 lisans envanteri
- Mevcut MFA oranı (Entra Admin > Sign-in logs)
- Shadow IT keşfi (Defender for Cloud Apps trial)

### Hafta 3-4: Identity

- Legacy auth block (Exchange basic auth off)
- MFA all users (Conditional Access)
- Break-glass account oluştur (FIDO2 key ile)

### Hafta 5-6: Device

- Intune enrollment
- Compliance policy deploy
- BitLocker zorunlu

### Hafta 7-8: Conditional Access Mature

- Require compliant device
- Risk-based policies
- Named locations (office IP, trusted countries)

### Hafta 9-10: Data

- Sensitivity label taxonomy
- Auto-labeling pilot
- DLP basic policies

### Hafta 11-12: Review + Scale

- Sign-in logs review
- False positive fine-tune
- Full rollout

## Monitoring

### Entra ID Sign-in Logs

Dashboard:
- Success vs failure oranı
- MFA challenge geçme oranı
- Risky sign-in count

### Microsoft Secure Score

M365 Defender > Secure Score:
- Identity score
- Device score
- Data score
- Apps score

Target: 70%+ (default ~40%).

## Yaygın Hatalar

### "MFA Var, Zero Trust Tamam"

MFA başlangıç. Device compliance, data classification yoksa sadece identity pillar.

### Break-Glass Yok

Tüm admin MFA → MFA provider down → locked out. Break-glass account (no MFA, sadece FIDO2 key, vault'ta şifresi) şart.

### Çok Sıkı Policy

Kullanıcı her erişimde MFA → prompt fatigue → onay verirler (MFA fatigue attack). Number matching + sign-in frequency tune.

## ROI

Zero Trust deployment maliyeti:
- M365 E3 + Entra P1: ~$30/user/month (zaten lisans varsa incremental $6)
- Intune: E3 dahil
- Consultancy: 3-6 ay, ~200-500K TL KOBİ için

Karşılığında:
- Ransomware riski %70+ azalır (Microsoft 2024 study)
- Phishing başarılı olsa bile lateral movement engelli
- Cyber insurance premium indirim (MFA + EDR = %20-30 indirim)

## İlgili Rehberler

- [Conditional Access MFA](/blog/m365-conditional-access-require-mfa-admins)
- [Intune Autopilot](/blog/intune-autopilot-windows-11-ilk-kurulum)
- [DLP KVKK](/blog/m365-dlp-kvkk-kisisel-veri-sizma-koruma)

---

**Zero Trust deployment + M365 security posture için destek?** [Teknik görüşme.](/#contact)
