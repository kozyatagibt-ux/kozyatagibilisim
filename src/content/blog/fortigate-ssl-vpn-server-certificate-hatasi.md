---
slug: fortigate-ssl-vpn-server-certificate-hatasi
title: "FortiGate SSL-VPN 'Server Certificate Cannot Be Verified' Hatası"
type: cluster
pillar: 2
url: "/blog/fortigate-ssl-vpn-server-certificate-hatasi"
hedef_anahtar_kelime: "fortigate ssl-vpn certificate hatası"
meta_description: "FortiGate SSL-VPN bağlanırken 'server certificate cannot be verified' veya sertifika uyarı hatası. Let's Encrypt, self-signed CA ve FortiClient trust store çözümü."
kelime_sayisi: "~1600"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "SSL Certificate Error"
product_family: "Fortinet & Firewall"
---

## Semptom

FortiClient veya web SSL-VPN portal açılırken:

- **"Server certificate cannot be verified"**
- **"SSL_ERROR_BAD_CERT_DOMAIN"** (tarayıcıda)
- **"The security certificate presented by this website was issued for a different website's address"**
- **"Unknown certificate authority"**
- FortiClient: "Unable to establish the VPN connection. The VPN server may be unreachable."

Kullanıcı "devam et" / "yine de bağlan" dediğinde bağlantı kuruluyor ama her seferinde uyarı çıkıyor. Bu **normal** değil — gerçek güvenlik sorunu sinyali olabileceği gibi yanlış yapılandırma da olabilir.

## Hızlı Çözüm (TL;DR)

1. FortiGate'in SSL-VPN'de varsayılan self-signed sertifika kullanıp kullanmadığını kontrol et (çoğu zaman bu)
2. Doğru çözüm: **Let's Encrypt** veya ticari CA sertifikası yükle (domain-based FQDN için)
3. FortiClient'ta "Do not warn about invalid server certificate" geçici olarak işaretlenebilir
4. Kurumsal iç kullanımda internal CA sertifikası kullanılıp CA certificate user'lara push edilebilir

## Neden Oluyor?

FortiGate cihazı fabrika çıkışında **self-signed** bir SSL sertifikası kullanır. Bu sertifika:
- Public CA tarafından imzalanmamış
- Domain ismi yerine cihazın IP'sini veya hostname'ini kullanıyor
- Browser/FortiClient "bilmiyorum bu sertifikayı, güvensizdir" der

Düzgün bir SSL-VPN deployment'ında sertifika:
- Public domain (örn. `vpn.firma.com.tr`)
- Geçerli CA tarafından imzalanmış (Let's Encrypt, DigiCert, GlobalSign)
- Expire olmamış
- CN (Common Name) veya SAN (Subject Alternative Name) ile domain eşleşiyor

## 4 Yaygın Sebep

### Sebep 1: Fabrika self-signed sertifika
FortiGate kurulumunda kimse sertifika değiştirmemiş. İlk kurulum sonrası bu en sık hata.

### Sebep 2: Sertifika süresi dolmuş
1-2 yıl önceki Let's Encrypt veya ticari sertifika yenilenmemiş.

### Sebep 3: Domain name mismatch
Sertifika `vpn.firma.com` için ama kullanıcılar `123.45.67.89` IP ile bağlanıyor → SAN listesinde IP yok.

### Sebep 4: CA chain eksik
Public CA'nın intermediate sertifikası yüklü değil — browser/client "chain of trust" kuramıyor.

## Adım Adım Çözüm

### Adım 1: Mevcut Sertifikayı İncele

FortiGate CLI:
```
show full-configuration vpn ssl settings | grep servercert
```

Çıktı:
```
set servercert Fortinet_Factory
```

"Fortinet_Factory" = fabrika self-signed. Değiştirilmeli.

### Adım 2: Public FQDN Hazırlığı

SSL-VPN için public bir DNS adı olmalı (IP değil):
- DNS'te `vpn.firmaniz.com.tr` A kaydı → FortiGate WAN IP'sine
- Bu DNS kaydı **dış DNS** sağlayıcınızda (GoDaddy, isimtescil, vs.)

```powershell
# Doğrulama
nslookup vpn.firmaniz.com.tr 8.8.8.8
```

### Adım 3: Let's Encrypt Sertifikası (Ücretsiz)

FortiGate 7.0+ **built-in Let's Encrypt** destekliyor. CLI:

```
config vpn certificate setting
    set acme-email admin@firmaniz.com.tr
    set acme-ca-url https://acme-v02.api.letsencrypt.org/directory
end

config vpn certificate local
    edit "vpn-letsencrypt"
        set acme-domain "vpn.firmaniz.com.tr"
        set enroll-protocol acme2
    next
end

execute vpn certificate local generate-acme "vpn-letsencrypt"
```

**Kritik gereksinim**: ACME validation için FortiGate'in public IP'sine **port 80 (HTTP)** geçici olarak açık olmalı. Let's Encrypt'ten `http-01 challenge` ile doğrulama yapılıyor.

Firewall policy:
```
config firewall policy
    edit 99
        set name "LetsEncrypt-Validation"
        set srcintf "wan1"
        set dstintf "any"
        set action accept
        set service "HTTP"
        set comments "ACME HTTP-01 challenge"
    next
end
```

Sertifika 90 günde bir otomatik yenilenir (FortiGate arka planda).

### Adım 4: Sertifikayı SSL-VPN'e Ata

```
config vpn ssl settings
    set servercert "vpn-letsencrypt"
end
```

FortiClient/web portal yeniden açıldığında sertifika uyarısı **gitmeli**.

### Adım 5: Ticari CA Sertifikası (Let's Encrypt Yerine)

DigiCert, GlobalSign, Sectigo gibi ticari CA kullanıyorsanız:

1. **CSR (Certificate Signing Request) oluştur**:
```
config vpn certificate local
    edit "vpn-commercial"
        set private-key <secret>
        set certificate <CSR output>
    next
end
```

Ya da GUI'den: System > Certificates > Create/Import > Generate CSR.

2. CSR'ı CA'ya gönder, sertifika al (.crt dosyası + intermediate chain).

3. FortiGate'e yükle:
```
config vpn certificate local
    edit "vpn-commercial"
        set certificate "<certificate content>"
    next
end
```

4. Intermediate CA'yı ayrıca yükle:
```
config vpn certificate ca
    edit "IntermediateCA"
        set ca "<intermediate cert content>"
    next
end
```

### Adım 6: FortiClient Tarafı Kontrolü

FortiClient'ın güvendiği CA listesinde public CA'lar zaten var. Ama kurumsal ortamda:
- İç CA (Active Directory Certificate Services) kullanılıyorsa
- CA sertifikası **client makinelerine GPO ile push** edilmeli

GPO: Computer Configuration > Policies > Windows Settings > Security Settings > Public Key Policies > Trusted Root CAs

### Adım 7: Geçici Workaround (Sadece Test İçin)

Üretimde **asla** kullanma ama acil test için:

FortiClient:
```
Settings > Disable "Warn when server certificate cannot be verified"
```

Ya da cihaz kısıtlı ortamdaysa tarayıcıda istisna kaydı yap.

**Önerilmez** — bu "bizi uyarma" demek, gerçek MITM attack'ını da görmezden geleceksin demek.

## Sık Özel Senaryolar

### Senaryo A: Let's Encrypt renewal fail

ACME validation için port 80 kapalıysa renewal başarısız olur. Event log:
```
acme renewal failed: connection timeout on port 80
```

Port 80'i sadece ACME için aç (firewall policy'de action=accept for service HTTP), diğer trafiği block.

### Senaryo B: Let's Encrypt rate limit

Bir sertifika için haftada max 5 deneme. Test ortamında çok deneme yaparsanız:
```
Error: too many certificates already issued
```

Çözüm: 7 gün bekle veya `staging-v02.api.letsencrypt.org` (test endpoint) kullan.

### Senaryo C: Wildcard sertifika

`*.firma.com.tr` ile tüm subdomain'leri kapsa. Let's Encrypt wildcard ancak **DNS-01 challenge** destekliyor — bu FortiGate ACME integration'ında karmaşık. Genelde ticari CA ile yapılır.

### Senaryo D: SAN eksikliği

Sertifika `vpn.firma.com.tr` için ama bazı kullanıcılar `https://vpn.firma.com.tr` (internal Split-DNS) ile bağlanıyor. SAN'a her iki domain de eklenmeli.

### Senaryo E: Chain eksikliği

iOS/Android mobil FortiClient daha katı — sertifika chain'in tam olması gerekiyor. Intermediate CA'yı yüklemezsen mobil cihazlar bağlanmaz.

## Önleyici Bakım

### 1. Sertifika expire monitoring

FortiGate'de built-in reminder yok ama external monitoring ile:
```python
# Basit Python script
import ssl, socket
from datetime import datetime

host = "vpn.firmaniz.com.tr"
port = 443

ctx = ssl.create_default_context()
with socket.create_connection((host, port), timeout=10) as sock:
    with ctx.wrap_socket(sock, server_hostname=host) as ssock:
        cert = ssock.getpeercert()
        expiry = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
        days_left = (expiry - datetime.utcnow()).days
        print(f"Certificate expires in {days_left} days")
        if days_left < 30:
            # Send alert
            pass
```

Scheduled task olarak haftada bir.

### 2. Yenileme testi

Let's Encrypt yenileme manuel test edilmelidir:
```
execute vpn certificate local generate-acme-test "vpn-letsencrypt"
```

### 3. Dokümantasyon

- Sertifika hangi CA'dan?
- Yenileme mekanizması ne?
- Kim sorumlu (kişi / rol)?

Bu runbook IT el kitabında olmalı.

## Sık Sorulan Sorular

### Let's Encrypt güvenilir mi kurumsal ortamda?

Evet, milyonlarca site kullanıyor — dünyanın en büyük CA'sı. Ücretsiz ama güvenilirlik açısından DigiCert ile aynı seviyede. Sadece **90 günlük yenileme** gerektiği için otomatik renewal kurmak şart.

### FortiGate versiyonum eski, ACME desteklemiyor

6.4'ten önceki sürümlerde manuel Let's Encrypt kurmak lazım (certbot container veya external script). 7.0'a upgrade daha kolay.

### Multi-factor (FortiToken) aktif, sertifika hatası değişir mi?

Hayır, MFA ve sertifika bağımsız katmanlar. Sertifika hatası MFA'ya bile gelmez; ilk handshake'te fail olur.

### FortiClient EMS kullanıyoruz, özel durum var mı?

EMS (Enterprise Management Server) ile FortiClient'ları merkezi yönetirsiniz. EMS sunucusunun kendi sertifikasını da doğru yapılandırın; yoksa client'lar connect olmaz.

---

**FortiGate firewall kurulum, SSL-VPN deployment ve sertifika yönetimi için uzman destek?** Kozyatağı Bilişim Fortinet sertifikalı ekibimizle managed firewall hizmeti. [Teknik görüşme talep edin.](/#contact)
