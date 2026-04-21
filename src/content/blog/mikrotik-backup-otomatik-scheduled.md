---
slug: mikrotik-backup-otomatik-scheduled
title: "MikroTik Otomatik Backup + Scheduled Export"
type: cluster
pillar: 4
url: "/blog/mikrotik-backup-otomatik-scheduled"
hedef_anahtar_kelime: "mikrotik otomatik backup"
meta_description: "MikroTik RouterOS otomatik haftalık backup + email/FTP export. System scheduler ile güvenli saklama, encryption ve disaster recovery."
kelime_sayisi: "~700"
pillar_linki: "/hizmetler/felaket-kurtarma-yedekleme"
troubleshoot: true
error_code: "Backup Schedule"
product_family: "Network & Altyapı"
---

## "Router Arızalanırsa Config Nasıl Kurtarılır?"

5 şubeli firma. Her şubede MikroTik. Backup manuel alınıyor mu? Herkes unutuyor. Arıza günü config baştan yazmak... saatler.

Çözüm: **Haftalık otomatik backup + FTP export**.

## Hızlı Çözüm (TL;DR)

```
# Scheduled script
/system scheduler add name=weekly-backup \
    start-date=jan/01/2026 start-time=03:00 \
    interval=1w \
    on-event=backup-script

# Backup script
/system script add name=backup-script source={
    /system backup save name="backup-\$[/system identity get name]-\$[/system clock get date]"
    # Export readable
    /export compact file="export-\$[/system identity get name]-\$[/system clock get date]"
    # FTP upload (opsiyonel)
    # ...
}
```

Her Pazar 03:00'te otomatik backup.

---

## 10:00 — Scheduler Setup

```
/system scheduler add name=weekly-backup \
    start-time=03:00 \
    start-date=jan/01/2026 \
    interval=1w \
    on-event=":global dt [/system clock get date]; /system backup save name=\"backup-\$dt\""
```

Her hafta backup.

## Script ile Daha Kapsamlı

```
/system script add name=full-backup source={
    :local dt [/system clock get date]
    :local id [/system identity get name]
    :local filename "$id-$dt"
    
    # Binary backup
    /system backup save name="$filename"
    
    # Readable export (restore kolay)
    /export compact file="$filename"
    
    # Log
    :log info "Backup complete: $filename"
}

/system scheduler add name=weekly-backup-full \
    start-time=03:00 \
    interval=1w \
    on-event="/system script run full-backup"
```

## 10:15 — Email Ile Gönder (SMTP)

Backup'ı dışa gönder:
```
/tool e-mail set smtp-server=smtp.office365.com smtp-port=587 \
    user="backup@firma.com.tr" password="..." \
    from="backup@firma.com.tr"

/system script add name=backup-email source={
    :local dt [/system clock get date]
    :local id [/system identity get name]
    :local filename "$id-$dt.backup"
    
    /system backup save name=$filename
    
    # Wait for file
    :delay 5s
    
    # Email gönder
    /tool e-mail send to="backup-archive@firma.com.tr" \
        subject="MikroTik Backup — $id — $dt" \
        body="Weekly backup attached" \
        file=$filename
    
    # File sil (storage temizle)
    /file remove [find name=$filename]
}
```

Her hafta 5 router'dan ayrı mail → merkezi backup mailbox.

## 10:30 — FTP / SFTP Upload

```
/system script add name=backup-ftp source={
    :local dt [/system clock get date]
    :local id [/system identity get name]
    :local filename "$id-$dt.backup"
    
    /system backup save name=$filename
    :delay 5s
    
    /tool fetch url="sftp://backup-server.firma.com.tr/backups/$filename" \
        user="mikrotik-backup" password="..." \
        upload=yes src-path="$filename"
    
    /file remove [find name=$filename]
}
```

SFTP merkezi backup server. Tüm router'lardan otomatik toplanır.

## 10:45 — Retention

Local storage dolmasın, eski backup'lar sil:
```
/system script add name=cleanup-old-backups source={
    :foreach f in=[/file find] do={
        :local created [/file get $f creation-time]
        :local age ((:now - $created) / 86400)  # gün
        
        :if ($age > 30 && [$f]->"name" ~ "backup-") do={
            /file remove $f
        }
    }
}

/system scheduler add name=monthly-cleanup \
    interval=30d \
    on-event="/system script run cleanup-old-backups"
```

30 günden eski backup'lar silinir. 30 günlük retention local.

## Recovery

Bir şubede router arıza. Yeni cihaz:

```
# Netinstall + factory defaults sonrası
/system backup load name=backup-RTR-Branch1-2024-05-05
```

Config restore + reboot → 5 dakikada production'a dönüş.

## Güvenlik

### Encrypted Backup

```
/system backup save name=backup-$(date) password="EncryptPassword"
```

Backup file şifrelenir. Password lost = restore imkansız → Bitwarden'a kaydet.

### Export Dosyasında Şifre Görünür Mi?

```
/export compact file=...
```

Readable file'da **password ENC xxxxx** şifrelenmiş görünür. Güvenli paylaşım OK.

Ama `/export` (compact olmadan) verbose, daha fazla detay — sadece IT eline düşsün.

## Multi-Router Centralized Backup

10+ router için bir **central backup server** (Linux + rsync):

```bash
# Cron job — her router'dan pull
#!/bin/bash
for router in rtr-hq rtr-branch1 rtr-branch2; do
    rsync -av user@$router:/flash/*.backup /backups/$router/
done
```

Her gün pull. 1 yıl retention. Offsite second copy.

## İlgili Rehberler

- [MikroTik ilk kurulum](/blog/mikrotik-routeros-ilk-kurulum-factory-production)
- [MikroTik Winbox bağlanamıyor](/blog/mikrotik-winbox-baglanmiyor-mac-mode)
- [MikroTik RouterOS upgrade + Netinstall](/blog/mikrotik-routeros-upgrade-netinstall-recovery)

---

**MikroTik fleet management için destek?** [Teknik görüşme.](/#contact)
