---
slug: fortigate-config-backup-restore-otomasyon
title: "FortiGate Config Backup + Restore — Otomasyon ve Disaster Recovery"
type: cluster
pillar: 4
url: "/blog/fortigate-config-backup-restore-otomasyon"
hedef_anahtar_kelime: "fortigate config backup restore"
meta_description: "FortiGate config backup + restore — encrypted, auto upload to TFTP/FortiManager, scheduled backups, disaster recovery prosedürü."
kelime_sayisi: "~700"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "Config Backup"
product_family: "Fortinet & Firewall"
---

## "FortiGate Arızalandı, Config Backup Yok"

Bir FortiGate 60F 3 yaşında. Panel arızası, boot olmuyor. Yedek cihaz elde ama **config yoktu**. 3 saatlik sıfırdan config + Policy 50+ ile baştan yaz.

Önleme: **Scheduled + encrypted backup**.

## Hızlı Çözüm (TL;DR)

### Manuel backup (GUI)
```
System > Configuration > Backup
- Format: Full config
- Encryption: Enable + password
- Download
```

### Scheduled backup (CLI)
```
config system auto-script
    edit "backup-daily"
        set interval 86400    ← 24 saat
        set script "execute backup config tftp daily-config-$(date).conf 10.10.20.100"
    next
end
```

---

## 10:00 — GUI Backup

System > Configuration > **Backup**:

> 📸 **Ekran 1** — Backup dialog  
> Backup to: Local PC / USB / FortiManager / FTP / TFTP  
>   
> Scope:  
> ● **Full Config** (tüm ayarlar)  
> ○ VDOM Config (sadece belirli VDOM)  
> ○ Configuration part (specific sections)  
>   
> ☑ Encryption: ENABLED  
> Password: [güçlü encryption şifresi]  
> Confirm password: [aynı]  
>   
> Backup

Dosya: `FGT60F_2024-05-12_09-30.conf` download.

**Encrypted**. Şifreyi Bitwarden'a kaydet — olmazsa restore imkansız.

## 10:05 — TFTP Scheduled Backup

```
config system auto-script
    edit "Daily-Backup-TFTP"
        set interval 86400
        set repeat 0
        set start auto
        set script "execute backup config tftp fgt-config-$daydate.conf 10.10.20.100 [password]"
    next
end
```

TFTP server'da her gün yeni dosya:
```
fgt-config-20240512.conf
fgt-config-20240513.conf
...
```

30 gün retention, scheduled cleanup.

## 10:10 — FortiManager Integration

Multi-device environment — FortiManager central config management:
- Real-time sync
- Config version history
- Rollback 1-click
- Bulk deployment

```
System > Settings > Central Management:
Type: FortiManager
IP: 10.10.20.50
```

FortiManager'da "Revision History" → her değişiklik kayıtlı.

## 10:20 — Restore Prosedürü

### Yeni FortiGate (replacement)

1. Fabrika reset
2. Boot aç, factory defaults
3. Serial console veya temp LAN IP
4. System > Configuration > **Restore**:
   - Upload backup file
   - Password (encryption için)
5. FortiGate reboot, yeni config aktif

Yeni cihaz eskisinin tam yedeği gibi çalışır.

### Partial Restore (Sadece Policy)

```
execute backup policy partial-policy.conf tftp 10.10.20.100
execute restore policy partial-policy.conf tftp 10.10.20.100
```

Sadece firewall policies restore — diğer config (interface, routing) değişmez.

## Backup Best Practices

1. **Daily** scheduled
2. **Encrypted** with strong password
3. **Off-device** storage (TFTP / S3 / FortiManager)
4. **Retention**: 30 daily + 12 monthly
5. **Test restore** yılda en az 1 kez
6. **Change management**: Büyük değişiklik öncesi manuel backup

## Disaster Recovery Time

FortiGate tam arıza senaryosu:
- Replacement cihaz stok: 1 saat
- Rack + cable: 30 dk
- Config restore: 10 dk
- Test + production: 20 dk
- **Total: 2 saat**

Backup yok ise:
- Replacement: 1 saat
- Sıfırdan config: 4-8 saat
- **Total: 9 saat**

Backup = 7 saat zaman tasarrufu = 7 saat production kesintisi.

## İlgili Rehberler

- [FortiGate HA Active-Passive](/blog/fortigate-ha-active-passive-cluster)
- [FortiGate admin password recovery](/blog/fortigate-admin-lockout-recovery-root-password)

---

**FortiGate DR + centralized management?** [Teknik görüşme.](/#contact)
