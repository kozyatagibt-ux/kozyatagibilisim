---
slug: event-id-4625-brute-force-tespit-onlem
title: "Event ID 4625 'Account Logon Failed' — Brute Force Tespit ve Önlem"
type: cluster
pillar: 2
url: "/blog/event-id-4625-brute-force-tespit-onlem"
hedef_anahtar_kelime: "event id 4625 brute force"
meta_description: "Windows Security Event ID 4625 başarısız oturum denemelerini analiz etme. Brute force attack tespit, kaynak IP lokasyonu ve otomatik ban stratejisi."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/it-saglik-kontrolu-denetim"
troubleshoot: true
error_code: "Event 4625 / Logon Failed"
product_family: "Windows Server & Active Directory"
---

## Semptom

Domain Controller veya public-facing Windows Server'ın güvenlik log'unda **sürekli, yoğun** Event 4625 kayıtları:

```
Event ID: 4625
An account failed to log on.

Subject:
    Security ID: NULL SID
    Account Name: -
    
Account For Which Logon Failed:
    Security ID: NULL SID
    Account Name: administrator
    Account Domain: CORP
    
Failure Information:
    Failure Reason: Unknown user name or bad password.
    Status: 0xC000006D
    Sub Status: 0xC0000064
    
Network Information:
    Workstation Name: -
    Source Network Address: 185.143.223.47
    Source Port: 52834
    
Logon Process: NtLmSsp
```

Bu event'lerin **dakikada 10+, saatte 500+, günde binlerce** olması brute force saldırısı sinyalidir. Saldırgan internet üzerinden sunucunuzun RDP, SMB, RPC veya başka bir portuna şifre deniyor.

## Hızlı Çözüm (TL;DR)

1. Public internet'e açık RDP (3389) varsa **hemen kapat** veya VPN arkasına al
2. Account lockout policy aktif mi kontrol et (5 yanlış → 15 dk kilit)
3. **Fail2Ban** / **RDPGuard** gibi otomatik IP ban aracı kur
4. Sub Status koduna göre tanı yap:
   - `0xC0000064` — kullanıcı yok
   - `0xC000006A` — şifre yanlış
   - `0xC0000234` — hesap kilitli
5. Saldırgan IP'sini firewall'da ban

## Sub Status Kodları

Event 4625'in "Sub Status" alanı saldırının ne tip olduğunu söyler:

| Sub Status | Anlam | Çıkarım |
|---|---|---|
| 0xC0000064 | Kullanıcı adı yok | Saldırgan **user enumeration** yapıyor |
| 0xC000006A | Şifre yanlış | **Password spray** (bilinen kullanıcı, denenen şifre) |
| 0xC0000234 | Hesap kilitli | Lockout policy devreye girmiş (iyi!) |
| 0xC0000072 | Hesap disabled | Eski hesap deniyor |
| 0xC0000193 | Hesap expire | Eski hesap deniyor |
| 0xC0000071 | Şifre expire | Muhtemelen meşru kullanıcı |
| 0xC000006F | Giriş saatleri dışı | Logon hours policy işledi |

## Adım Adım Tanı ve Müdahale

### Adım 1: Event 4625 Analizi (Toplu)

Son 24 saatin failed logon'larını kaynak IP bazında grup:
```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625; StartTime=(Get-Date).AddDays(-1)} |
    ForEach-Object {
        $xml = [xml]$_.ToXml()
        [PSCustomObject]@{
            Time = $_.TimeCreated
            TargetUser = $xml.Event.EventData.Data | Where {$_.Name -eq 'TargetUserName'} | Select -ExpandProperty '#text'
            SourceIP = $xml.Event.EventData.Data | Where {$_.Name -eq 'IpAddress'} | Select -ExpandProperty '#text'
            SubStatus = $xml.Event.EventData.Data | Where {$_.Name -eq 'SubStatus'} | Select -ExpandProperty '#text'
        }
    } | Group-Object SourceIP | Sort Count -Descending | 
    Select Count, Name -First 20
```

Çıktı:
```
Count Name (SourceIP)
----- ----
 4823 185.143.223.47    ← Saldırgan (Rusya)
  127 194.233.77.14     ← Saldırgan (Çin)
   89 83.222.190.117    ← Saldırgan (Bulgaristan)
    3 192.168.1.45      ← Meşru kullanıcı yanlış girişler
```

### Adım 2: Port Açık mı?

Sunucunun internet'e açık olan portlarını kontrol:
```cmd
netstat -an | find "LISTENING"
```

Veya dışarıdan:
```
# Shodan.io veya nmap ile sunucu IP'sini tara
nmap -p 3389,445,22,5985 <sunucu_public_ip>
```

Açık portlar:
- **3389 (RDP)** — en yaygın saldırı vektörü. Kapatılmalı veya **VPN arkasına** alınmalı
- **445 (SMB)** — dışarıdan asla açık olmamalı
- **22 (SSH)** — Linux için, asla şifre-only olmamalı (key-based + fail2ban)
- **5985/5986 (WinRM)** — WinRM internet'e açık olmamalı

### Adım 3: Firewall'da Saldırgan IP'leri Ban

**Windows Firewall (tek tek):**
```powershell
New-NetFirewallRule -DisplayName "Block Attacker 185.143.223.47" `
    -Direction Inbound `
    -RemoteAddress 185.143.223.47 `
    -Action Block
```

**PowerShell script — top 20 saldırgan IP'yi otomatik ban:**
```powershell
$topAttackers = Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625; StartTime=(Get-Date).AddHours(-6)} |
    ForEach-Object {
        $xml = [xml]$_.ToXml()
        $xml.Event.EventData.Data | Where {$_.Name -eq 'IpAddress'} | Select -ExpandProperty '#text'
    } | Group-Object | Where Count -gt 20 | Sort Count -Descending |
    Select -ExpandProperty Name

foreach ($ip in $topAttackers) {
    if ($ip -ne "-" -and $ip -ne "::1" -and $ip -notlike "192.168.*") {
        New-NetFirewallRule -DisplayName "Auto-Block $ip" `
            -Direction Inbound -RemoteAddress $ip -Action Block `
            -ErrorAction SilentlyContinue
    }
}
```

Scheduled task olarak saatlik çalıştırılabilir.

### Adım 4: Account Lockout Policy

GPO ile:
```
Computer Config > Policies > Windows Settings > Security Settings > 
Account Policies > Account Lockout Policy
```

Öneri:
- **Account lockout threshold**: 5 invalid logons
- **Account lockout duration**: 15 minutes
- **Reset account lockout counter after**: 15 minutes

Bu ayarla saldırgan 5. denemede hesabı kilitler, 15 dk bekler. Deneme sayısı drastik düşer.

⚠️ **Dikkat**: Çok agresif lockout (2 deneme) meşru kullanıcıları da kilitler. 5 iyi denge.

### Adım 5: Geo-IP Filtreleme (Firewall)

Türk işletmesi iseniz Rusya, Çin, Kuzey Kore gibi ülkelerden gelen trafiği tamamen block edebilirsiniz:

**FortiGate / Sophos / Palo Alto:**
```
Firewall Policy > Source = Country: Turkey (whitelist)
Tüm diğer ülkeler → deny
```

**Windows Firewall ile yapılabilir ama manuel IP range'ler eklemek gerek** — network firewall'da daha pratik.

### Adım 6: Account Lockout Olaylarını İzle

Event 4740 (account locked):
```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4740; StartTime=(Get-Date).AddDays(-7)}
```

Hangi hesaplar sık kilitleniyor? Bunlar genelde:
- Yöneticiler (özellikle "administrator" adı kullanıyorsa — saldırıların %80 hedefi)
- Common username (admin, user, guest, test)

**Koruma**: Default "Administrator" hesabının adını **değiştirin**:
```powershell
Rename-LocalUser -Name "Administrator" -NewName "sysadm_xyz123"
```

### Adım 7: MFA (Çok Faktörlü Doğrulama)

Kesin çözüm — brute force şifre tahmini yapsa bile MFA gerekli:
- **Entra ID P1** + Conditional Access
- **DUO Security** (on-prem AD için)
- **Microsoft Authenticator** / FIDO2

RDP için MFA:
- **Azure MFA NPS Extension**
- **Duo Authentication Proxy**
- **Remote Desktop Gateway** + MFA policy

### Adım 8: RDP Alternatifleri

RDP'yi internete açmak 2024+ artık unacceptable:
- **VPN + RDP** (klassik güvenli)
- **Remote Desktop Gateway** (HTTPS tünel, MFA uyumlu)
- **Azure Bastion** (cloud VM için)
- **Cloudflare Zero Trust / Access** (modern ZTNA)
- **Teleport** (open source)

## Kurumsal İzleme

### SIEM'de 4625 Analytics

Wazuh, Splunk, Azure Sentinel gibi SIEM'lerde:
```
Search: EventID=4625 AND Count > 50 in 5 minutes
Alert: Brute force attack detected from SourceIP
Action: Auto-block via firewall API
```

### Honeypot

Saldırganları bilerek "balıklama" — `user` veya `admin` hesapları sahte kurup, bu hesaplara gelen denemeler otomatik ban tetikler.

### Canary Tokens

AD'de sahte bir "vipadmin" hesabı oluşturun, kimse kullanmasın. O hesaba logon denemesi görürseniz **kesin saldırgan** — gerçek kullanıcı o hesabı bilmiyor olmalı.

## Önleyici Bakım

1. **RDP internete kapalı** — pazarlık dışı. VPN+MFA veya ZTNA.
2. **Account lockout** 5/15 dakika ayarı
3. **Default admin hesaplarını rename**
4. **Event 4625 dashboard** SIEM/Log Analytics'te
5. **Saatlik IP ban automation** scheduled task
6. **Geo-IP block** (Türkiye dışı trafiği firewall seviyesinde filtre)
7. **MFA tüm admin'lerde** zorunlu

## Sık Sorulan Sorular

### Normal ofiste de 4625 oluyor — panik edeyim mi?

Hayır. Günlük 10-20 meşru hatalı giriş (yanlış şifre, Caps Lock açık) normal. **Kaynak IP dış ise ve sayı yüksek ise** alarm.

### RDP olmadan uzaktan nasıl yöneteceğim?

VPN + RDP klassik. Ya da **Remote Desktop Web Access** (RD Gateway) — HTTPS üzerinden güvenli RDP. Ayrıca MFA ile sarmalanmış.

### Lockout policy'im ayarlı ama yine de Event 4625 patlıyor

Lockout hesap bazlı — saldırgan farklı user adları deniyorsa her denemede yeni hesap lock olur, saldırgan devam eder. **Firewall IP ban** ek olarak gerekli.

### SMB 445 kapatsam dosya paylaşımı gider mi?

İç ağda 445 gerekli. Sorun **internet'e açık 445** — dışa kapalı, içeride aktif olabilir.

### Event 4625 tüm domain boyunca nasıl toplarım?

Windows Event Forwarding (WEF) ile tüm DC'lerin + critical server'ların log'ları merkezi bir "collector"a akıtılır. Oradan SIEM'e veya PowerShell ile analiz.

---

**Kurumsal güvenlik denetimi, brute force koruma ve SIEM kurulum için uzman destek?** Kozyatağı Bilişim IT sağlık kontrolü + penetration test + 24/7 SOC izleme. [Teknik görüşme talep edin.](/#contact)
