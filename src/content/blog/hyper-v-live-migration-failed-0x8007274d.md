---
slug: hyper-v-live-migration-failed-0x8007274d
title: "Hyper-V Live Migration Failed 0x8007274D — 'Cannot connect to host' Çözümü"
type: cluster
pillar: 1
url: "/blog/hyper-v-live-migration-failed-0x8007274d"
hedef_anahtar_kelime: "hyper-v live migration failed 0x8007274d"
meta_description: "Hyper-V Live Migration 0x8007274D 'Cannot connect to host' hatası. Kerberos constrained delegation, CredSSP, firewall ve cluster konfigürasyon çözüm rehberi."
kelime_sayisi: "~1800"
pillar_linki: "/hizmetler/sunucu-sanallastirma"
troubleshoot: true
error_code: "0x8007274D / 0x80090322"
product_family: "Windows Server & Active Directory"
---

## Semptom

Hyper-V Manager'dan veya Failover Cluster Manager'dan VM'i Live Migration ile başka node'a taşımaya çalıştığınızda:

```
Live migration of 'Virtual Machine VM01' failed.
Virtual machine migration operation failed at migration source.
Failed to establish a connection with host 'HyperVNode02': 
No connection could be made because the target machine actively refused it. 
(0x8007274D)
```

Veya benzer alternatifler:
```
0x80090322 — "The target principal name is incorrect"
0x8009030C — "The logon attempt failed"
0x80092002 — "An unknown Credential Manager error has occurred"
```

VM kapatılmış halde migrate etme (Quick Migration / Storage Migration) çalışıyor ama **canlı** migration (VM çalışırken) her seferinde başarısız.

## Hızlı Çözüm (TL;DR)

1. Hyper-V host'lar arası **Kerberos Constrained Delegation** yapılandırılmış mı kontrol et
2. AD'de her Hyper-V bilgisayar hesabı için "cifs" ve "Microsoft Virtual System Migration Service" SPN delegation'ı tanımlı olmalı
3. Veya alternatif: **CredSSP** authentication'a geç (daha az güvenli ama hızlı çözüm)
4. Live Migration için TCP 6600 ve SMB (445) portları host'lar arası açık olmalı

## Hata Neden Oluyor?

0x8007274D = `WSAECONNREFUSED` — TCP bağlantı kurulurken hedef port reject ediyor. Ama Hyper-V ortamında bu doğrudan network problemi olmayabilir — **authentication sırasında Kerberos ticket verilemediğinde** de aynı hata kodu görünür.

### 3 Ana Sebep

#### Sebep 1: Kerberos Constrained Delegation Yapılandırılmamış (En Yaygın)

Live Migration "double-hop" authentication gerektirir:
1. Admin kullanıcısı → Hyper-V Node A
2. Node A → Node B (VM kaynakları)

İkinci hop için Node A'nın "kullanıcı adına Node B'ye konuşma" yetkisi olmalı — bu **Constrained Delegation**.

AD'de her Hyper-V host bilgisayar hesabında:
```
Properties > Delegation > 
"Trust this computer for delegation to specified services only"
"Use Kerberos only"
```

Altında diğer host'lara `cifs` ve `Microsoft Virtual System Migration Service` eklenmiş olmalı.

Yeni node eklendiğinde bu delegation sık unutulur.

#### Sebep 2: Yanlış Authentication Protocol

Hyper-V ayarlarında Live Migration:
- **Kerberos** (default, Constrained Delegation gerekir)
- **CredSSP** (basit, double-hop'u pass-through yapar)

Eğer Constrained Delegation yapılandırılmamışsa Kerberos seçilmiş olacak → her migration fail.

#### Sebep 3: Firewall / Network Port Bloğu

Live Migration için:
- **TCP 6600** — Live Migration transport
- **TCP 445** — SMB (VM dosyaları için)
- **TCP 135** — RPC endpoint mapper

Host firewall'larında veya cluster inter-subnet'te bu portlar bloklanmış olabilir.

#### Sebep 4: Time Sync

Kerberos tolerate 5 dakika time skew. Cluster node'ları arası time drift 5 dk'yı geçerse Kerberos fail eder.

## Adım Adım Çözüm

### Adım 1: Tanı — Hangi Authentication?

Hyper-V Manager veya PowerShell'de:

```powershell
Get-VMHost | Select Name, VirtualMachineMigrationAuthenticationType
```

Çıktı:
```
Name           VirtualMachineMigrationAuthenticationType
----           -----------------------------------------
HyperVNode01   Kerberos
```

Kerberos ise Delegation yapılandırması gerekli.

### Adım 2: Constrained Delegation Yapılandırma

**AD'de her Hyper-V host için:**

```powershell
# Active Directory Users and Computers
# Veya PowerShell (Domain Controller'da):

# Node01 → Node02'ye delegation
Get-ADComputer "HyperVNode01" | 
    Set-ADAccountControl -TrustedToAuthForDelegation $true

Set-ADComputer "HyperVNode01" `
    -ServicePrincipalNames @{Add="Microsoft Virtual System Migration Service/HyperVNode02.corp.firma.com", "cifs/HyperVNode02.corp.firma.com"} `
    -Replace @{"msDS-AllowedToDelegateTo"=@(
        "Microsoft Virtual System Migration Service/HyperVNode02.corp.firma.com",
        "Microsoft Virtual System Migration Service/HyperVNode02",
        "cifs/HyperVNode02.corp.firma.com",
        "cifs/HyperVNode02"
    )}

# Node02 → Node01'e delegation (çift yönlü)
# Yukarıdaki komutu tersine çevirip çalıştır
```

**Daha kolay yöntem — GUI:**

1. Domain Controller'da `dsa.msc` (Active Directory Users and Computers) aç
2. "View > Advanced Features" aktif et
3. Computers OU'suna git, **HyperVNode01** bilgisayar hesabını aç
4. **Delegation** sekmesine git
5. "Trust this computer for delegation to specified services only" + "Use Kerberos only" seç
6. **Add** tıkla → Service Type: **cifs**, Computer: **HyperVNode02** seç → OK
7. Tekrar Add → Service Type: **Microsoft Virtual System Migration Service**, Computer: **HyperVNode02**
8. Aynı işlemi HyperVNode02 için de yap (Node01'e delegation)

**Değişiklik sonrası cluster node'larını restart ederek Kerberos ticket cache temizle:**
```powershell
# Her node'da
klist purge -li 0x3e7
```

### Adım 3: Alternatif — CredSSP'ye Geç

Eğer Delegation yapılandırma mümkün değilse (test ortamı, AD erişimi yok):

```powershell
# Her Hyper-V host'unda
Set-VMHost -VirtualMachineMigrationAuthenticationType CredSSP
```

**Not**: CredSSP Live Migration başlatırken **konsoldan yapmak** gerektirir — uzak PowerShell session'dan başlatmak fail edebilir. RDP ile node'a bağlan, oradan migrate.

### Adım 4: Firewall / Port Kontrolü

```powershell
# Her node'da
Get-NetFirewallProfile | Select Name, Enabled
Get-NetFirewallRule -DisplayGroup "Hyper-V*" | Select DisplayName, Enabled

# Manuel test
Test-NetConnection HyperVNode02 -Port 6600
Test-NetConnection HyperVNode02 -Port 445
Test-NetConnection HyperVNode02 -Port 135
```

Bloklanmış olanlar için:
```powershell
Enable-NetFirewallRule -DisplayGroup "Hyper-V"
Enable-NetFirewallRule -DisplayGroup "Hyper-V Management Clients"
```

Ve kurumsal firewall/VLAN arasında cluster node'ları varsa network ekibi ile portlar açılmalı.

### Adım 5: Time Sync Doğrulama

```powershell
# Her node'da
w32tm /query /status
w32tm /query /source

# Kıyasla
(Get-Date).ToUniversalTime()
Invoke-Command -ComputerName HyperVNode02 { (Get-Date).ToUniversalTime() }
```

Fark 30 saniyeden fazla ise:
```powershell
w32tm /resync /force
```

PDC Emulator'a sync yapar.

### Adım 6: Migration Network Doğrulama

Live Migration ayrı network interface'de olabilir (best practice):

```powershell
Get-VMMigrationNetwork
```

Çıktı:
```
Priority Subnet
-------- ------
1        10.10.0.0/24
```

Migration network 10Gbps dedicated NIC'te ise VM trafiği bozulmaz. Ayrı değilse oluşturabilirsiniz:

```powershell
Add-VMMigrationNetwork -Subnet "10.10.0.0/24"
Set-VMHost -MaximumVirtualMachineMigrations 4
Set-VMHost -MaximumStorageMigrations 2
```

### Adım 7: Cluster Validation

Failover Cluster ise:
```powershell
Test-Cluster -Node HyperVNode01, HyperVNode02 -Include "Hyper-V Configuration","System Configuration","Network"
```

Bu tam bir validation raporu çıkarır — migration için uyumluluk sorunları bulur.

## Özel Senaryolar

### Senaryo A: Azure Stack HCI / Windows Server 2022

Azure Stack HCI kümelerinde Live Migration SMB Direct (RDMA) kullanıyorsa ek konfigürasyon:
```powershell
Get-NetAdapterRdma
Enable-NetAdapterRdma "Ethernet"
```

### Senaryo B: Hybrid Cloud — VM Farklı Subnet'te

VM'in IP subnet'i cluster node'larından farklıysa "L2 extension" (stretched VLAN) gerekli. Aksi halde VM migrate olsa da client'lar VM'e ulaşamaz.

### Senaryo C: Nested Virtualization

Nested Hyper-V (VM içinde Hyper-V) host'ta Live Migration bazı edge case'lerde fail eder — özellikle Intel EPT tabanlı CPU'larda. Processor compatibility mode aktif et:
```powershell
Set-VMProcessor "VM_name" -CompatibilityForMigrationEnabled $true
```

## Önleyici Bakım

1. **Cluster Validation her 3 ayda bir çalıştırın** — konfigürasyon drift'i erken yakalar
2. **Yeni node eklenirken checklist**:
   - Time sync doğru
   - Delegation tanımlı (iki yönlü)
   - Firewall rules aktif
   - Management + Migration + Cluster networkleri ayrı
3. **Monitoring**: SCOM veya PRTG ile Live Migration başarı oranı dashboard'u. %95+ normal.

## Sık Sorulan Sorular

### VM kapalıyken migrate ediyor, açıkken fail. Neden?

Kapalı VM = Quick Migration (SMB ile sadece dosya kopyası). Açık VM = Live Migration (memory + state transfer, authentication gerektirir). İkisinin protokol akışı tamamen farklı.

### "0x80090322" hatası alıyorum

"Target principal name is incorrect" — SPN yanlış. AD'de bilgisayar hesabının SPN'ini kontrol et:
```powershell
setspn -L HyperVNode02$
```

`HOST/HyperVNode02` ve `HOST/HyperVNode02.corp.firma.com` olmalı. Yoksa ekle.

### Windows Server 2016 node'dan 2022 node'a migration fail

Processor Compatibility sorunu olabilir. VM ayarlarında:
```
VM > Processor > Compatibility > 
"Migrate to a physical computer with a different processor version" ✓
```

Performans biraz düşer ama migration çalışır.

### Cluster-aware update sonrası migration bozuldu

CAU (Cluster-Aware Updating) node restart sonrası Kerberos ticket'ları expire olur. Her node'da `klist purge` ve time sync sonrası migration test et.

---

**Hyper-V cluster yönetimi, migration troubleshoot ve monitoring için uzman destek?** Kozyatağı Bilişim Microsoft sertifikalı ekibimizle Hyper-V infrastructure kurulum + yönetim. [Teknik görüşme talep edin.](/#contact)
