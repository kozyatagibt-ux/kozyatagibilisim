---
slug: vmware-proxmox-gecis-broadcom-sonrasi
title: "VMware'den Proxmox'a Geçiş: Broadcom Satın Alması Sonrası KOBİ Kararı"
type: cluster
pillar: 1
url: "/blog/vmware-proxmox-gecis-broadcom-sonrasi"
hedef_anahtar_kelime: "vmware proxmox geçiş"
meta_description: "Broadcom'un VMware satın alması sonrası lisans zammı karşısında Proxmox'a geçiş gerçekten mantıklı mı? KOBİ ve orta ölçek için gerçek migration deneyimi, maliyet ve risk analizi."
kelime_sayisi: "~2200"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## 2023 Sonunda Ne Oldu?

Kasım 2023'te Broadcom, VMware'i 61 milyar dolara satın aldı. İlk altı ay içinde "basitleştirilmiş lisanslama" adı altında yaptığı değişiklikler orta ölçek müşterileri için bir fatura şokuna dönüştü:

- **Perpetual license sonlandı** — artık sadece subscription
- **vSphere Standalone satışı durdu** — vSphere Foundation veya VMware Cloud Foundation paketi zorunlu
- **CPU lisansı → çekirdek (core) bazlı lisansa geçti** — aynı sunucu için 2-3 kat fiyat
- Türkiye'deki müşterilerin çoğunda yenileme tekliflerinin eski fiyatın **%150-300 üstü** geldi

Bu yazıda, Broadcom sonrası gerçekten Proxmox'a geçmek mantıklı mı, geçmeli miysek nasıl yapmalı — gerçek deploy deneyimlerimden aktarıyorum.

## Proxmox Nedir, VMware Eşdeğeri Mi?

Proxmox VE (Virtual Environment) açık kaynak bir sanallaştırma platformu. KVM + LXC konteyner + ZFS + Ceph entegrasyonu ile gelen hazır bir stack.

**VMware eşdeğerliği:**

| VMware özelliği | Proxmox karşılığı | Durum |
|---|---|---|
| vSphere + ESXi | Proxmox VE | Benzer, Proxmox web UI hafif daha kaba |
| vCenter | Proxmox cluster + Datacenter Manager | Çok node'lu ortamda olgun |
| vMotion (canlı migration) | Proxmox Live Migration | Çalışır, KVM tabanlı |
| DRS (otomatik yük dengeleme) | Yok (manuel veya script) | **En büyük eksik** |
| HA (high availability) | Proxmox HA | Çalışır, olgun |
| vSAN | Ceph veya ZFS replikasyon | Ceph kuvvetli ama öğrenme eğrisi var |
| NSX-T (mikro segmentasyon) | SDN + firewall | Sınırlı — kurumsal ihtiyaçlara yetmeyebilir |
| Site Recovery Manager | PBS + manuel failover | Scripted DR mümkün ama "tek tıkla" yok |

### Kısa Gerçek

Proxmox VMware'in **%80'ini karşılar**, ama o eksik %20 bazen kritik olabilir. Karar bu %20'nin size gerekip gerekmediğine bağlı.

## 50-150 Kişilik Şirket İçin Maliyet Karşılaştırması

Gerçek bir müşteri örneği: 3 x Dell R750, toplam 64 fiziksel core, 512 GB RAM, 10 TB storage, 60 VM.

### VMware (2024 Yeni Lisans)

- vSphere Foundation = ~$135 / core / yıl (list price, distribütör sonrası ~%20 düşer)
- 64 core × $110 (post-discount) = **~$7.040 / yıl** = **~260.000 TL / yıl (2024 kur ortalaması)**
- 5 yılda **~1.3 milyon TL** sadece lisans

### Proxmox

- **Community Edition ücretsiz** (production'da kullanılabilir)
- **Subscription (destek)** = €115 / soket / yıl (Basic) veya €515 / soket / yıl (Premium)
- 2 socket × 3 sunucu × €115 = **€690 / yıl** = **~25.000 TL / yıl**
- 5 yılda **~125.000 TL**

**Lisans maliyetinde farkı: ~1.2 milyon TL kazanç / 5 yıl**

### Ama "Free" Pahalıdır — Gerçek TCO

Proxmox lisans ücretsiz ama geçiş + operasyonel yüke maliyet ekleyin:

- **Migration işçiliği**: 60 VM, ortalama 200-400 saat profesyonel iş = **150.000-300.000 TL**
- **Eğitim**: IT personelinin 2-4 haftalık öğrenme (iç maliyet) = ~50.000 TL eşdeğeri
- **Monitoring/backup stack yeniden kurulumu**: Veeam yerine Proxmox Backup Server (PBS) — lisans yok ama depolama/kurulum maliyeti var
- **Risk**: Production kesintileri, yanlış geçiş = değişken

Net 5 yıl tasarrufu: **yaklaşık 600-900 bin TL**. Önemli para ama "ücretsiz" değil.

## Kimler Proxmox'a Geçmeli?

### ✅ Uygun profiller

- **40-150 VM'li orta ölçekli şirket** — ekip büyüklüğü fazla ihtisas gerektirmiyor
- **Tek site deploy** — çok site DR çok karmaşık
- **Linux deneyimli IT personeli** — CLI kullanmaya alışkın ekip
- **Subscription maliyeti yönetimi kuralı olan firmalar** — "her yıl lisans zammı kabul etmeyiz" politikası
- **Test/dev ortamlarında zaten Proxmox/KVM kullananlar** — öğrenme eğrisi düşmüş

### ❌ Geçmemeli olanlar

- **NSX-T mikro segmentasyon kullananlar** — Proxmox'ta eşdeğer yok
- **VMware Horizon VDI kullanıcıları** — VDI ekosistemi farklı bir hikaye
- **Site Recovery Manager ile otomasyonlu DR'ı olan şirketler** — Proxmox'ta manuel eforla yapılır
- **Sertifikasyon gereksinimi olan finans/sağlık** — bazı denetçi/auditörler hala VMware bekliyor
- **Küçük IT ekipleri olan firmalar (< 2 kişi)** — community forum destekli yaşamak için en az bir Linux-bilen teknik kişi şart

## Gerçek Migration Süreci — Adım Adım

Geçtiğimiz yıl 3 şirkette VMware → Proxmox geçişi yaptık. Tipik senaryo (120 VM, 3 host) şöyle:

### Hafta 1-2: Hazırlık

- Envanter çıkarma: VM listesi, boyutları, bağımlılıklar
- Proxmox test kümesi kurulum (yedek donanımda veya eski ESXi host'u boşaltıp Proxmox yükleyerek)
- Backup stratejisi: Veeam lisansı varsa bitene kadar tutulur, paralel PBS kurulumu
- IT personeli için hafta sonu Proxmox eğitimi — 12-16 saat pratik

### Hafta 3-4: Pilot Migration

- Non-critical 5-10 VM ile başlangıç (test, dev, staging)
- **clonezilla** veya **Proxmox built-in import**: OVF import → Proxmox (30-60 dakika/VM, VM boyutuna göre)
- Her VM migrate sonrası: Backup, NIC driver (VirtIO), performans test
- 2 hafta boyunca pilot VM'ler production'da stabilite gözlemi

### Hafta 5-8: Ana Migration

- Üretim VM'leri "düşük etki" sırasıyla taşınır
- Her hafta sonu 10-15 VM (bakım penceresinde)
- DB sunucuları son haftaya kalır — en hassas
- Rollback planı: VMware host'u ilk 2 hafta boyunca aktif tutulur, geri dönüş mümkün

### Hafta 9-10: Decommission

- VMware lisansı yenilenmemiş — sadece read-only mode
- Son 30 günlük log/metrik incelemesi
- Dokümantasyon güncellemesi, runbook yazımı

**Toplam süre: 8-10 hafta. Dış kaynak maliyeti: 150-300 bin TL.**

## En Sık Karşılaşılan Sorunlar

### 1. VirtIO driver eksikliği (Windows VM'ler)

Windows VM'lerini Proxmox'a aktardıktan sonra **VirtIO SCSI driver** manuel kurulmazsa disk I/O rezalet. Migration öncesi VirtIO ISO hazır olmalı, her Windows VM'de VirtIO disk + network sürücüleri yüklenmeli.

### 2. vCenter'ın "tek tık" rahatlığı kayıp

IT ekibiniz vCenter tıklamaya alışkınsa, Proxmox'ta bazı işler CLI gerektirir. Örneğin cluster disaster recovery bazen `pvecm` komutlarını yazmak lazım. Hazırlıklı olun.

### 3. Proxmox Backup Server disk planlaması

PBS çok iyi ama dedup oranlarını abartmayın. **1.5-2x dedup gerçek** oran; vendor pazarlamasındaki "10x" rakamları idealize.

### 4. Ceph öğrenme eğrisi

3+ node'lu kümede hiperkonverje depolama istiyorsanız Ceph gerek — ama Ceph tuning ayrı bir ihtisas. Küçük kümelerde ZFS replikasyon daha sade.

### 5. Destek forum kalitesi değişken

Proxmox community forum çok aktif ama "benim spesifik sorunum" çözümüne ulaşmak bazen saatler sürüyor. Kritik ortamlarda **Premium Subscription (€515/soket/yıl)** — hala VMware'in altında — öneriyoruz.

## Ne Zaman Geçmemek Lazım?

"Her şey yolunda gidiyor, VMware süresi dolmadan önce geçiş yapmam lazım mı?" diye soranlar oluyor.

**Cevabım**: Mevcut VMware yenileme teklifi %50+ üzerinde zam geliyorsa, ekibiniz Linux rahat ise — evet değerlendirin. Aksi halde:

- VMware'de kalıp yenileme fiyatını distribütörle pazarlık edin — Broadcom'un indirim kapasitesi var ama istemezseniz vermiyor
- Alternatif olarak **Nutanix AHV** veya **Microsoft Hyper-V** de değerlendirin — Hyper-V 2022 uzun zamandır unutulmuş ama vMotion-style canlı migration olgun

## Özet Tavsiye

**Orta ölçekli Türk şirketleri için 2024-2025 sanallaştırma stratejisi:**

1. **Mevcut VMware 2026'ya kadar destekli**: Acele etmeyin. Distribütörden yenileme teklifi alıp pazarlık edin.
2. **Yenileme zamı > %80 geliyorsa**: 6 aylık geçiş planı başlatın. Pilot Proxmox kümesi kurun, IT personelini eğitin.
3. **Kritik production'ı son hafta geçirin**: DB, ERP, domain controller — pilot başarıyla stabil olduktan sonra.
4. **Backup çift kat tutun geçiş sürecinde**: Veeam + PBS paralel çalışsın ilk 60 gün.
5. **Community Edition production'da kullanılabilir** ama destek kritikse Proxmox Basic Subscription alın (yıllık €115/soket — çok ucuz).

---

**VMware yenileme maliyetiniz geldi, Proxmox'a geçiş mantıklı mı analizi yapabilir miyiz?** 30 dakikalık ücretsiz keşifte mevcut envanteri değerlendirip 5 yıllık TCO karşılaştırması çıkarıyoruz. Kozyatağı Bilişim olarak Proxmox ve VMware her iki tarafta da gerçek migration deneyimine sahip ekibimiz var.
