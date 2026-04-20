---
slug: veeam-failed-to-connect-host-access-denied
title: "Veeam 'Failed to Connect to Host. Access is Denied' — Çözüm Rehberi"
type: cluster
pillar: 3
url: "/blog/veeam-failed-to-connect-host-access-denied"
hedef_anahtar_kelime: "veeam access is denied failed to connect"
meta_description: "Veeam Backup & Replication 'Failed to connect to host. Access is denied' hatası. Credential, WMI, firewall ve service account izin çözümleri."
kelime_sayisi: "~1500"
pillar_linki: "/hizmetler/felaket-kurtarma-yedekleme"
troubleshoot: true
error_code: "Access is denied"
product_family: "Veeam & Yedekleme"
---

## Semptom

Veeam Backup & Replication job log'unda:

```
Processing [VM_name] Error: 
Failed to connect to host. Access is denied.
(Code: 5)

Unable to retrieve configuration information for the Hyper-V host.
```

Veya:
```
Cannot open the server for the hypervisor access.
Host unreachable or access denied.
```

Manuel job run da aynı hata. Bu hata mesajı **5 farklı kök sebepten** kaynaklanabiliyor — çözüm için hangisi olduğunu tanımak şart.

## Hızlı Çözüm (TL;DR)

1. Veeam Console'dan host credential kontrol et — güncel mi?
2. Host Windows Firewall'da WMI portları (TCP 135, 445) açık mı?
3. Local Administrator grup üyeliği: Veeam servis hesabı host'ta admin mi?
4. UAC Remote Restrictions ("LocalAccountTokenFilterPolicy") registry ayarı
5. Hyper-V için "Virtual Machine Management Service" çalışıyor mu?

## Neden Oluyor?

Veeam, backup yapacağı host'lara **yüksek yetkili bağlantı** kurar:
- **WMI** (Windows Management Instrumentation)
- **RPC / DCOM**
- **SMB** (dosya erişimi)
- **Hyper-V PowerShell cmdlets** (Hyper-V host için)
- **vSphere API** (VMware host için)

Bu bağlantılarda kullanılan kullanıcı hesabı **host'ta Administrator yetkisi** gerektirir. Access denied → izin sorunu.

## 5 Yaygın Sebep

### Sebep 1: Credential Expire / Şifre Değişti
Veeam Console'a tanımlı "host@domain" hesabı şifresi değişmiş. Veeam hâlâ eski şifreyi kullanıyor.

### Sebep 2: Hesap Admin Grubundan Çıkarılmış
IT housekeeping sırasında "gereksiz admin" temizliği yapılmış, Veeam servis hesabı host'un local Administrators grubundan kaldırılmış.

### Sebep 3: UAC Remote Restrictions
Windows built-in UAC local admin hesaplarından uzak bağlantıyı kısıtlıyor (Pass the Hash'e karşı önlem). Bu restriction aktifse Veeam local admin hesabıyla bağlanamaz.

### Sebep 4: Firewall WMI Portları Bloklanmış
Yakın zamanda Windows Firewall değiştirilmiş, WMI için gerekli portlar (135, 49152-65535) kapalı.

### Sebep 5: Hyper-V Service Durmuş
`vmms.exe` (Virtual Machine Management Service) servisi crashlenmiş veya durmuş.

## Adım Adım Çözüm

### Adım 1: Veeam Credential Kontrolü

Veeam Console'da:
```
Home > Managed Servers > [problem host] > Properties > 
Credentials > ...
```

Hangi kullanıcı tanımlı? Bu kullanıcının şifresi güncel mi? 

Test:
```
Host'a RDP ile bu credential'la bağlan
```

Bağlanabiliyorsan kimlik doğru. Bağlanamıyorsan şifre değişmiş — yeni şifre ile güncelle.

### Adım 2: Local Administrator Grup Üyeliği

Host'ta (RDP ile):
```powershell
# Yerel Administrators grup üyeliğini listele
Get-LocalGroupMember -Group "Administrators"
```

Veeam servis hesabı listede olmalı. Yoksa:
```powershell
Add-LocalGroupMember -Group "Administrators" -Member "CORP\veeam_service"
```

Domain hesabı (service account) kullanıyorsan, domain hesabının host'a admin yetkisi olmalı — AD'de group policy ile de set edilebilir.

### Adım 3: UAC Remote Restrictions Kontrol

```
Registry: HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
```

Key: `LocalAccountTokenFilterPolicy`  
Type: REG_DWORD  
Value: 1 (disable UAC token filtering for remote)

PowerShell:
```powershell
Set-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" `
    -Name LocalAccountTokenFilterPolicy `
    -Value 1 `
    -Type DWord
```

Sonra `Restart-Computer` (veya en azından explorer.exe restart).

⚠️ **Güvenlik trade-off**: Bu ayarı açmak Pass-the-Hash saldırılarına karşı bir kalkanı indirir. Domain service account kullanıyorsanız bu ayar gerekli olmayabilir — domain hesap "network logon" token'i zaten filter dışıdır. Local hesap (hostname\user) kullanırken gerekir.

### Adım 4: WMI Test

Veeam server'dan host'a WMI bağlantı test:
```powershell
Get-WmiObject -ComputerName [host_name] -Class Win32_OperatingSystem -Credential (Get-Credential)
```

Credential istendiğinde Veeam'de tanımlı hesabı gir.

**"Access Denied"** → izin veya UAC sorunu  
**"RPC Server Unavailable"** → firewall sorunu  
**"Invalid namespace"** → WMI Namespace bozuk, rebuild gerekli

WMI rebuild (son çare):
```cmd
winmgmt /salvagerepository
winmgmt /resyncperf
# Başarısız olursa:
net stop Winmgmt
cd %windir%\system32\wbem
rd /S /Q repository
winmgmt /resetrepository
```

### Adım 5: Firewall Port Açılması

Host'ta Windows Firewall:
```powershell
# WMI ile ilgili kuralları aktive et
Enable-NetFirewallRule -DisplayGroup "Windows Management Instrumentation (WMI)"

# Remote Administration
Enable-NetFirewallRule -DisplayGroup "Remote Administration"

# Remote Service Management
Enable-NetFirewallRule -DisplayGroup "Remote Service Management"
```

Gerekli portlar:
- **TCP 135** — RPC Endpoint Mapper
- **TCP 445** — SMB
- **TCP 49152-65535** — RPC Dynamic Ports

Kurumsal firewall (FortiGate, PAN, Cisco ASA) Veeam server ↔ host arasında da izin vermeli.

### Adım 6: Hyper-V Service Kontrolü

Hyper-V host'unda:
```powershell
Get-Service vmms, hvhost, nmagent | Select Name, Status
```

Hepsi "Running" olmalı. Değilse:
```powershell
Start-Service vmms
Set-Service vmms -StartupType Automatic
```

`vmms` crash loop yaşıyorsa Event Viewer > Applications and Services Logs > Microsoft > Windows > Hyper-V-VMMS log'unu incele.

### Adım 7: VMware ESXi için Özel

VMware ortamında "Access is denied" farklı sebepler:

**ESXi API credential**:
- `root` hesabı kilitlenmiş olabilir (çok hatalı deneme sonrası)
- Kilit açma: ESXi shell (SSH): `pam_tally2 --user=root --reset`

**Permission rolü**:
- Veeam kullanıcısı vCenter'da yeterli rolle atanmamış
- Doğru rol: "Administrator" veya özel Veeam rolü (Veeam dokümantasyonunda)

**TLS sürüm uyumsuzluğu**:
- Eski ESXi 6.0/6.5 + yeni Veeam V12 TLS 1.0 deprecated
- Veeam "Enable compatibility mode" ayarı var

### Adım 8: Veeam Service Account Permissions Audit

Veeam'in kendi servisi (on Veeam server):
```powershell
# Veeam backup service kimle çalışıyor?
Get-CimInstance Win32_Service -Filter "Name='VeeamBackupSvc'" | 
    Select Name, StartName
```

Bu hesap **"Log on as a service"** rights'ına sahip olmalı (Local Security Policy > User Rights Assignment).

## Özel Senaryolar

### Domain-joined Host + Domain Account

En temiz kurulum:
- Domain service account (örn. `svc_veeam`)
- Bu account tüm Hyper-V/ESXi host'ların local Administrators grubuna GPO ile eklenir
- Şifre politikası: Never expire + karmaşık + password manager'da

### Workgroup Host

Host domain'de değilse (küçük ofis, DMZ'de bir server):
- Local admin hesabı kullanılır
- UAC Remote Restrictions disable edilmesi gerekir (Adım 3)
- Veeam credential: `.\localadmin` formatında (hostname yerine nokta)

### Standalone ESXi (vCenter Yok)

- ESXi root credentials
- Port 443 ESXi'ye erişim
- "Advanced Settings > Security.PasswordQualityControl" TR'de dikkat

## Önleyici Bakım

1. **Service account şifre rotation** — Şifre değişikliklerinde Veeam credential güncelle
2. **Monitoring** — Veeam backup success rate %99.5 altına düşerse alarm
3. **Backup sağlık check** — haftalık restore test ile gerçekten çalışıp çalışmadığını doğrula
4. **Credential vault** — Veeam credential'ları ayrı bir password manager'da (HashiCorp Vault, Bitwarden Enterprise)

## Sık Sorulan Sorular

### "Access is denied" ama RDP ile bağlanabiliyorum?

RDP "interactive logon" kullanır. WMI "network logon" kullanır. UAC Remote Restrictions bu ikisini farklı handle eder — genelde bu sebep.

### Host restart sonrası her seferinde aynı hata

Muhtemelen host'ta firewall GPO "domain profile" yerine "public profile"da — yeniden boot ile sıfırlanıyor. Network location "Domain"e sabitle:
```powershell
Set-NetConnectionProfile -NetworkCategory DomainAuthenticated
```

### Veeam V11'den V12'ye upgrade sonrası hata

V12 TLS requirements sıkı. Eski ESXi 6.5 / Windows Server 2012 uyumluluk sorunu çıkabilir. Veeam KB4422 kontrol.

### Scheduled task ile backup manual OK

Manuel çalıştırdığınızda kendi kullanıcı context'iniz (yetkili). Scheduled task Veeam servis hesabıyla çalışıyor (belki yetersiz). Scheduled task settings'te "Run with highest privileges" kontrol.

---

**Veeam backup altyapı kurulum, yönetim ve troubleshooting için uzman destek?** Kozyatağı Bilişim olarak managed backup-as-a-service sunuyoruz. [Teknik görüşme talep edin.](/#contact)
