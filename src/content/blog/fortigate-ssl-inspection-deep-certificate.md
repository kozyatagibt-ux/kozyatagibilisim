---
slug: fortigate-ssl-inspection-deep-certificate
title: "FortiGate SSL Inspection — Deep vs Certificate-Only Mode"
type: cluster
pillar: 4
url: "/blog/fortigate-ssl-inspection-deep-certificate"
hedef_anahtar_kelime: "fortigate ssl inspection deep"
meta_description: "FortiGate SSL inspection — Deep inspection (full decrypt) vs Certificate-only inspection. Performans, CA certificate push ve uyum tartışması."
kelime_sayisi: "~1000"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "SSL Inspection"
product_family: "Fortinet & Firewall"
---

## "HTTPS Trafikte Virüs Nasıl Tespit Edilir?"

İnternet trafiğinin **%95'i HTTPS**. Şifreli trafikte firewall:
- Antivirus scan YAPAMAZ
- URL kategori GÖREMEZ (sadece domain SNI'dan)
- Data leak GÖREMEZ
- Phishing site YAKALAYAMAZ (path bilinmiyor)

**SSL Inspection** çözüm — firewall trafiği decrypt, inspect, re-encrypt eder.

Ama privacy + performance trade-off. Bu yazı detayları anlatıyor.

## 2 SSL Inspection Modu

### Certificate-Only Inspection
- Sadece **server sertifikasını** inceler
- "Bu site zararlı mı?" karar verir (sertifika CN, issuer, validity)
- Decrypt YAPMAZ
- Hafif performance impact
- CA cert push GEREKMEZ
- Data scanning limited

### Deep Inspection (Full Decrypt)
- Trafiği **tamamen decrypt** eder
- Content scan: virus, DLP, URL filter
- Full control
- **Performance: %50-70 throughput düşer**
- Client'larda FortiGate CA cert **trust** edilmeli (certificate push)
- Privacy + compliance uyarıları

## Hızlı Çözüm (TL;DR)

Çoğu orta ölçek firma için:
- **Certificate-only** default (genel trafik)
- **Deep inspection** sadece internal user policy (IT kontrol altında)
- **No inspection** banking, sağlık, HR siteleri için (whitelist)

---

## 10:00 — CA Certificate Hazırlığı

Deep inspection için FortiGate kendi CA sertifikası ile **man-in-the-middle** yapar. Kullanıcılar gerçek site sertifikası değil, FortiGate-signed görecekler.

Client'lar FortiGate CA'yı trust etmezse "Untrusted certificate" hatası.

### FortiGate Default CA

System > Certificates > Local CA Certificates:
- **Fortinet_CA_SSL** — default CA

Export et:
```
Download "Fortinet_CA_SSL" certificate (public key)
```

### GPO ile Client'lara Trust Push

Windows Domain'de:
```
GPO > Computer Config > Policies > Windows Settings > 
Security Settings > Public Key Policies > **Trusted Root Certification Authorities**
Import: Fortinet_CA_SSL.cer
```

Tüm domain bilgisayarları FortiGate CA'yı trust eder.

### Non-Domain (Mac, Linux, Mobile)

Manuel trust — bazı cihazlarda imkansız. Bu yüzden Deep inspection domain-joined Windows + Mac'te pratik, IoT + misafir Wi-Fi'de değil.

## 10:15 — Deep Inspection Profile

```
Security Profiles > SSL/SSH Inspection > + Create New:

Name: "Deep-Inspection-Corp"
Comments: "Full decrypt for corporate users"

SSL Inspection Options:
● Multiple Clients Connecting to Multiple Servers  
   CA Certificate: Fortinet_CA_SSL
   Untrusted SSL Certificates: Block
   Enable SSL Anomalies Log: On
   
Inspection Method:
○ SSL Certificate Inspection  
● Full SSL Inspection (deep)

Inspect All Ports: ✓
Enable SNI check: ✓
```

Apply.

## 10:25 — Exempt Categories (Whitelist)

Bazı kategoriler **asla inspect edilmemeli** (yasal/etik):
- Banking + Financial Services
- Health and Medicine
- Personal Privacy
- Government

```
SSL Inspection Profile > Exempt from SSL Inspection:
☑ Banking and Financial Services
☑ Personal Privacy
☑ Health and Medicine
☑ Government
☑ Web-based Email (Gmail, Outlook.com için bazı kurum)
☑ Kids category
```

Bu kategorilere giden trafik decrypt YAPILMAZ. Privacy korundu.

## 10:35 — Policy'ye Apply

```
Policy & Objects > Firewall Policy > Edit existing:

Security Profiles:
  Web Filter: default
  Application Control: default
  Antivirus: default
  IPS: default
  **SSL Inspection: Deep-Inspection-Corp**  ← buraya attach

Log Allowed Traffic: All Sessions
```

Apply.

## 10:45 — Test

Deep inspection aktif, user Gmail'e gidiyor:
- Browser'da certificate inspect
- Issued by: **Fortinet_CA_SSL** (Gmail değil!)
- İlk set-up'ta trust edilmediyse uyarı

Trust edildiyse kullanıcı fark etmez — her şey normal, ama firewall içeriği görüyor.

## Performance Impact

FortiGate 100F:
- No inspection: 10 Gbps
- Certificate-only: ~6-7 Gbps
- Deep inspection: ~2-3 Gbps

200F ile daha rahat. Downscale olan FortiGate'te deep inspection overload eder (CPU %100). [CPU sorunu rehberimiz](/blog/fortigate-cpu-yuksek-100-kullanim-cozum).

## Legal / HR Uyarısı

Deep inspection user trafik izler. **Yasal olarak:**
- Aydınlatma metni şart (şirket politikası)
- Çalışanla written agreement
- KVKK kapsamı dahilinde

Bilgilendirmeden implement **ihlal**. İK + Hukuk danışmanlığı ile prosedür.

## Yaygın Hatalar

### "ERR_CERT_AUTHORITY_INVALID" Chrome'da

CA trust push edilmedi. GPO apply ve `gpupdate /force`.

### "Handshake Failure" Specific Site

Site client cert authentication istiyor veya TLS protocol uyumsuz. **SSL Exemption** ekle — bu site için decrypt yapma.

### Performance %100 Düştü

Deep inspection CPU'ya zor geliyor. Özel site'leri exempt ederek kurtar. Veya daha büyük FortiGate modeli.

### Banking Sitede "Site not secure"

Banking kategori exempt edilmedi. Yukarıdaki exempt list'e ekle.

## İlgili Rehberler

- [FortiGate CPU yüksek kullanım](/blog/fortigate-cpu-yuksek-100-kullanim-cozum)
- [FortiGate SSL-VPN Certificate](/blog/fortigate-ssl-vpn-server-certificate-hatasi)

---

**FortiGate tuning + SSL inspection deployment için uzman destek?** [Teknik görüşme.](/#contact)
