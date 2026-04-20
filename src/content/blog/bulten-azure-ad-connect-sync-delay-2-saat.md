---
slug: bulten-azure-ad-connect-sync-delay-2-saat
title: "Azure AD Connect (Entra Connect) — Senkronizasyon Gecikmeleri ve Monitoring"
type: bulten
pillar: 6
url: "/blog/bulten-azure-ad-connect-sync-delay-2-saat"
hedef_anahtar_kelime: "azure ad connect sync delay"
meta_description: "Entra Connect / Azure AD Connect 30 dakikadan daha uzun sync gecikmesi. Staging mode, sync rule sorunu, bağlantı sorunu ve monitoring kurulumu."
kelime_sayisi: "~850"
pillar_linki: "/hizmetler/kimlik-yonetimi"
bulten: true
date: 2024-09-10
last_updated: 2026-01-30
status: gecici_cozum
severity: orta
product_family: "Microsoft 365 & Outlook"
affected_versions: "Azure AD Connect / Entra Connect tüm sürümleri (sık yaşanan)"
fixed_version: "Kalıcı çözüm yok — monitoring ve proaktif maintenance"
vendor_advisory: "Microsoft Sync Connector documentation"
workaround_available: true
---

## Özet

**Azure AD Connect** (yeniden adlandırılan: **Entra Connect**) on-prem AD ile Azure AD arasında kullanıcı, grup, device senkronizasyonu yapıyor. Varsayılan sync döngüsü **30 dakika**. Ama kurumsal ortamlarda periyodik olarak sync **saatler / günler** gecikiyor — fark edilmiyorsa:

- Yeni kullanıcı işe başlayınca Office 365 lisansı atanmıyor
- Şifre değişikliği tüm sistemlere yayılmıyor
- AD'den disable edilen hesap Azure AD'de hâlâ aktif (güvenlik açığı)
- Intune policy updates gecikmiş
- Teams / SharePoint permissions yanlış gidiyor

## Semptom

### 1. Sync Monitoring Dashboard'da:
```
Azure Portal > Microsoft Entra ID > Entra Connect > 
Last sync: 2 hours ago (uyarı kırmızı)
```

### 2. Sync Service Manager (on-prem):
```
Connectors > "contoso.onmicrosoft.com - AAD"
Last Run Profile: Delta Synchronization
Last Run Status: completed-stopped-error
```

### 3. Event Log (on-prem):
```
Event ID 6803 (Directory Synchronization)
The sync engine has encountered an error.
Error: stopped-extension-dll-exception
```

## Sık Karşılaşılan Sebepler

### Sebep 1: Sync Account Şifre Expire

Azure AD Connect kurulumunda otomatik oluşan **MSOL_ hesabı** (on-prem AD) periyodik olarak şifre değişimi ister. Eğer o hesap **Password Never Expires** ayarı yapılmamışsa 90 gün sonra şifresi expire oluyor.

**Tespit**:
```powershell
# On-prem AD'de
Get-ADUser MSOL_* -Properties PasswordExpired | 
    Select SamAccountName, PasswordExpired
```

**Çözüm**:
```powershell
# Şifreyi reset + never expire
$msolUser = Get-ADUser MSOL_xxxx
Set-ADUser $msolUser -PasswordNeverExpires $true
Set-ADAccountPassword $msolUser -Reset -NewPassword (ConvertTo-SecureString "StrongRandomPass" -AsPlainText -Force)

# Sonra Azure AD Connect Wizard'dan credential güncelle
```

### Sebep 2: Staging Mode'da Kalmış

Bazı ortamlarda test için Staging mode aktifleştirilir, sonra kapatılması unutulur. Staging mode'da sync yapılır ama Azure AD'ye push EDİLMEZ.

**Tespit**:
```powershell
# Azure AD Connect sunucusunda
Get-ADSyncScheduler | Select StagingModeEnabled
```

`True` ise staging mode aktif — değişiklikler Azure'a gitmiyor.

**Çözüm**: Azure AD Connect Wizard > Configure > Staging Mode → Disable.

### Sebep 3: Sync Rule Bozuk / Yanlış

Özel attribute flow yaparken yanlış bir sync rule eklenince tüm sync çöker.

**Tespit**:
```
Synchronization Rules Editor (on-prem aracı)
```

Enable olanları gözden geçir. 2023 sonrası modified olanlar özellikle.

**Çözüm**: Bozuk rule'ı disable et, sync tetikle, doğru şekilde yeniden oluştur.

### Sebep 4: Password Hash Sync Crash

PHS (Password Hash Sync) service crash olabiliyor, özellikle büyük directory'lerde (10,000+ user):
```
Event ID 611: "Failed to send hash for user X"
```

**Çözüm**:
```
Synchronization Service Manager > 
"Full Password Synchronization" tetikle
```

Güvenli olsun diye weekend runlanmalı — saatler sürebilir.

### Sebep 5: Network / Firewall Bloğu

Azure AD Connect sunucusu `*.microsoftonline.com` ve `*.windows.net` endpoint'lerine TCP 443 erişebilmeli. Yeni firewall kuralı / proxy değişikliği sonrası engellenebilir.

**Test**:
```powershell
Test-NetConnection login.microsoftonline.com -Port 443
Test-NetConnection adminwebservice.microsoftonline.com -Port 443
```

Başarısızsa firewall/proxy düzenlenmeli.

## Monitoring Kurulumu

Microsoft resmi monitoring araçları:

### Entra ID Connect Health

```
Azure Portal > Entra ID > Entra Connect > Entra Connect Health
```

Ücretsiz Azure AD Premium P1/P2 kullanıcılarına dahildir. Sync lag alarmları otomatik.

### PowerShell ile özel monitoring

```powershell
# Son başarılı sync zamanı
$lastSync = Get-ADSyncScheduler | Select LastSyncCycleStartTimeInUTC

$delay = (Get-Date).ToUniversalTime() - $lastSync.LastSyncCycleStartTimeInUTC

if ($delay.TotalMinutes -gt 60) {
    # Alert email gönder
    Send-MailMessage -To it@firma.com -Subject "Entra Connect Sync Delay: $($delay.TotalMinutes) minutes"
}
```

Scheduled task olarak çalıştırılır.

## Geçici Çözümler (Sync Takıldığında)

### Manual Sync Tetikleme

```powershell
# Delta sync (hızlı)
Start-ADSyncSyncCycle -PolicyType Delta

# Full sync (her şeyi yeniden çeker — 1+ saat sürer)
Start-ADSyncSyncCycle -PolicyType Initial
```

### Connector Log Temizleme

Sync'in takıldığı connector:
```
Synchronization Service Manager > 
Connectors > Running = Sıfırla
```

### Servis Restart

```powershell
Restart-Service ADSync
Restart-Service AzureADConnectHealthSyncInsights
Restart-Service AzureADConnectHealthSyncMonitor
```

## Etki Seviyesi

- **Bugün hâlâ risk mi?** Hybrid identity kullanıyorsanız kesinlikle. Her ortamda eninde sonunda yaşanır.
- **Cloud-only (Azure AD only) ortam**: Etkilenmezsiniz.
- **Yeni kullanıcı problemleri**: Bu sorunun en belirgin etkisi.

## İlgili Kaynaklar

- Microsoft Entra Connect documentation
- Entra Connect Health monitoring
- CIS benchmarks for Azure AD Connect

---

**Entra Connect / Azure AD hibrit kimlik yönetimi için proaktif monitoring ve troubleshooting?** Kozyatağı Bilişim sertifikalı ekibimizle sizin için monitoring kurulum ve olay müdahalesi. [Teknik görüşme talep edin.](/#contact)
