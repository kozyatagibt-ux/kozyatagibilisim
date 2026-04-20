---
slug: bulten-windows-kb5034439-winre-recovery
title: "Windows Server 2022 KB5034439 — Recovery Partition Güncellemesi Başarısız Oluyor"
type: bulten
pillar: 8
url: "/blog/bulten-windows-kb5034439-winre-recovery"
hedef_anahtar_kelime: "kb5034439 hata başarısız"
meta_description: "KB5034439 güvenlik güncellemesi Windows Server 2022 ve Windows 10/11'de 0x80070643 ERROR_INSTALL_FAILURE hatasıyla başarısız oluyor. WinRE partition boyutu çözümü."
kelime_sayisi: "~1200"
pillar_linki: "/hizmetler/son-kullanici-destek"
bulten: true
date: 2024-01-10
last_updated: 2026-04-18
status: gecici_cozum
severity: orta
product_family: "Windows Server & Active Directory"
affected_versions: "Windows 10 22H2, Windows 11 21H2/22H2/23H2, Windows Server 2022"
fixed_version: "Herhangi bir kalıcı fix yok; manuel WinRE genişletme gerekiyor"
vendor_advisory: "Microsoft KB5034957 — WinRE güncelleme rehberi"
workaround_available: true
---

## Özet

Microsoft, Ocak 2024 aylık kümülatif güncellemesi olarak **KB5034439 (Windows Server 2022)** ve **KB5034441 (Windows 10 22H2)** yayınladı. Bu güncelleme BitLocker ve WinRE (Windows Recovery Environment) için önemli bir güvenlik yaması içeriyordu (CVE-2024-20666). Ancak **yükleme hatasıyla (0x80070643) başarısız oluyor** — sebebi yeterli boş alan olmayan Recovery Partition.

**Etkilenme durumu**: 2026 Nisan itibarıyla hâlâ binlerce kurumsal cihazda manuel müdahale gerektiriyor. Microsoft otomatik fix yayınlamadı, yönetici komutlarıyla çözülüyor.

## Semptomlar

Windows Update geçmişinde:

```
Security Update for Windows Server 2022 (KB5034439)
Status: Failed to install on 2/1/2026 — 0x80070643
```

Ya da event log:
```
Event ID 20
Installation Failure: Windows failed to install the following update 
with error 0x80070643: Security Update for Windows (KB5034439).
```

WSUS sunucusunda onaylanan ama 50-200 cihazda "failed" durumunda kalan güncelleme — toplu raporlarda açıkça görülür.

## Kök Sebep

Güncellemenin gerektirdiği **minimum 250 MB boş alan** recovery partition'ında yok. Eski cihazlarda (2019-2022'den önce kurulum) Recovery Partition 500-550 MB arasında, ve hemen hemen tamamı dolu.

KB5034439 yeni WinRE image'ını bu partition'a yazmaya çalışıyor, yer olmadığı için geri dönüyor.

## Geçici Çözüm (Manuel — Microsoft Onaylı)

### Adım 1: Recovery Partition boyutunu kontrol

```cmd
reagentc /info
```

Çıktı örneği:
```
Windows RE location:       \\?\GLOBALROOT\device\harddisk0\partition4\Recovery\WindowsRE
Boot Configuration Data (BCD) identifier: {xxx}
Recovery image location:
Recovery image index:      0
```

Bulunan partition index'i not et (yukarıda partition4).

### Adım 2: WinRE'yi devre dışı bırak

```cmd
reagentc /disable
```

### Adım 3: Diskpart ile partition boyutunu büyüt

```cmd
diskpart
```

```
list disk
select disk 0
list partition
select partition 3     # Recovery'den ÖNCEKİ partition (genelde C:)
shrink desired=250 minimum=250
select partition 4     # Recovery partition
extend
```

⚠️ **Uyarı**: Bu işlem sürücü değişikliği yapar. Önce **tam yedek** alınmalı.

### Adım 4: WinRE'yi tekrar aktif et

```cmd
reagentc /enable
reagentc /info
```

### Adım 5: KB5034439'u tekrar yükle

Windows Update'te "Retry" veya Microsoft Update Catalog'dan manuel indirip kurun.

## Kurumsal Ortamda Toplu Çözüm

50+ cihazlı ortamda manuel imkansız. Microsoft'un yayımladığı PowerShell script'ini GPO ile uygulamak mümkün:

- Microsoft script: [KB5034957 WinRE update script](https://support.microsoft.com/kb/5034957)
- SCCM / Intune compliance policy ile prepopulate edilebilir

Bizim önerimiz:
1. Cihaz envanteri çıkar (hangi Recovery Partition kaç MB)
2. Etkilenen cihazlara uzak script gönderimi (PSRemoting veya RMM)
3. Non-business hours'ta otomatik shrink + extend + KB yükleme

## Risk ve Dikkat Noktaları

- **BitLocker aktifse** recovery partition genişletme öncesi BitLocker **suspend** edilmeli:
  ```cmd
  manage-bde -protectors -disable C:
  ```
  İşlem sonrası resume:
  ```cmd
  manage-bde -protectors -enable C:
  ```

- **Partition düzenleme başarısız olursa** boot problem çıkabilir. WinRE ISO hazır bulundurun.

- **Virtual machine'lerde** Hyper-V veya VMware snapshot önerilir (geri dönüş için).

## Etki Seviyesi

- **Acil mi?** Hayır — güvenlik yaması önemli ama CVE-2024-20666 **local attack vector**, remote exploit yok.
- **Ne zamana kadar uygulanmalı?** 6 ay içinde hedefleniyorsa makul. Compliance (ISO 27001, SOC 2) denetimlerinde "outstanding security patches" soruluyor.
- **Atlanabilir mi?** Uzun vadeli önerilmez — WinRE işlev dışı olduğu için recovery/restore senaryolarında sorun çıkarır.

## İlgili Kaynaklar

- Microsoft KB5034957 — [Updating WinRE partition size](https://support.microsoft.com/en-us/topic/kb5034957-updating-the-winre-partition-on-deployed-devices-to-address-security-vulnerabilities-in-cve-2024-20666-0190331b-1ca3-42d8-8a55-7fc406910c10)
- CVE-2024-20666 — BitLocker Security Feature Bypass
- Windows Server 2022 Update History

## Bizim Ekipten Not

Bu sorun 2024 başından beri kurumsal ortamlarda yaşanıyor ve Microsoft otomatik düzeltme yayınlamadı. Benzer büyüklükte bir kurumda (150 kullanıcı) toplu çözüm yaklaşık **2-3 gün ekip çalışması** gerektirdi: envanter, planlama, staged rollout, doğrulama.

Sonraki KB5036892 (Haziran 2024) aynı Recovery Partition'a yazmıyor ama WinRE güncellemesi geleceği için bu gap kapatılmalı.

---

**WSUS/Intune ortamınızda KB5034439 failure cihazları mı var?** Kurumsal patch management hizmetimizle bu tür toplu remediation sorunlarını sizin için yönetiyoruz. [Teknik görüşme talep edin.](/#contact)
