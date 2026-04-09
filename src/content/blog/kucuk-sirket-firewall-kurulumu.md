---
slug: kucuk-sirket-firewall-kurulumu
title: "Küçük Şirket İçin Firewall Kurulumu: Pratik Rehber"
type: cluster
pillar: 4
url: "/blog/kucuk-sirket-firewall-kurulumu"
hedef_anahtar_kelime: "firewall kurulumu küçük şirket"
meta_description: "Küçük şirket için firewall kurulumu nasıl yapılır? Donanım seçimi, kural setleri, IPS/IDS, içerik filtreleme. KOBİ'ler için pratik rehber."
kelime_sayisi: "~2000"
pillar_linki: "/kurumsal-network-kurulumu, /kobi-siber-guvenlik"
---

## Modemin Üzerindeki "Firewall" Düğmesi Yetmez

Çoğu KOBİ sahibi şu cevabı verir: "Bizim modemde firewall var, açık." Ev tipi modemlerin firewall özelliği temel paket filtreleme yapar — basit gelen trafik kontrolü, bilinen kötü adresleri bloklama. Bu 2005 yılı için yeterliydi.

2026 yılında değil. Modern firewall, sadece "geçer/geçmez" kararı veren bir cihaz değildir. İçeriği inceleyen, davranışı analiz eden, bilinen tehditleri tanıyan, kullanıcı bazlı politikalar uygulayan, raporlayan karmaşık bir güvenlik platformudur.

Bu yazıda küçük bir şirket için doğru firewall kurulumunun ne demek olduğunu anlatıyoruz.

### 1. Paket Filtreleme Firewall'ları

En eski tür. Gelen ve giden paketlerin başlıklarına bakar: kaynak IP, hedef IP, port. Kurallara göre geçer veya bloklar. Hızlıdır ama içeriği bilmez. Ev modemlerinin firewall'u bu seviyededir.

### 2. Stateful Firewall'lar

Bağlantıların durumunu takip eder. Bir bağlantı meşru bir şekilde içeriden başlatıldıysa, o bağlantıya ait gelen trafik otomatik kabul edilir. Kurumsal seviyenin başlangıcıdır.

3. Next-Generation Firewall (NGFW) Modern KOBİ'ler için gerçek seçenek. Stateful firewall'a ek olarak: Application awareness: Hangi uygulamanın trafiği olduğunu tanır (Facebook, BitTorrent, Dropbox vs.)

Intrusion Prevention (IPS): Bilinen saldırı imzalarını tespit eder ve engeller Antivirus / Anti-malware: Trafikteki dosyaları gerçek zamanlı tarar Web filtering: Kategori bazlı web sitesi engelleme SSL inspection: Şifreli trafiği bile inceleyebilir (gizlilik tartışması ayrı) VPN: Site-to-site ve client-to-site VPN Sandbox: Şüpheli dosyaları izole ortamda çalıştırarak test eder Popüler Markalar ve Modeller Marka Tipik Model (KOBİ) Güçlü Yanı Fortinet FortiGate 60F, 80F Performans, fiyat/performans, geniş özellik seti SonicWall TZ370, TZ470 KOBİ odaklı, kolay yönetim Sophos XGS 116, XGS 126 Sezgisel arayüz, sandbox güçlü WatchGuard Firebox T25, T45 Güçlü raporlama pfSense / OPNsense Açık kaynak (kendi donanımınız) Lisans bedeli yok, esnek ama uzmanlık ister Palo Alto PA-410, PA-440 Premium, en güçlü tehdit istihbaratı 10-50 kullanıcılı bir KOBİ için Fortinet 60F, SonicWall TZ370 veya Sophos XGS 116 sınıfı bir cihaz uygundur. Donanım maliyeti 25-60 bin TL arası, yıllık güvenlik servis lisansları 10-25 bin TL arası. Doğru Yapılandırma: Sadece Cihazı Almak Yetmez Firewall'un asıl değeri yapılandırmasıdır.

Yanlış yapılandırılmış bir Fortinet, doğru yapılandırılmış bir pfSense'ten kötüdür.

### Adım 1

Default Şifreleri Değiştirin Tüm cihazlar fabrika şifresiyle gelir. Bunlar internette herkese açıktır. İlk iş şifreleri değiştirmek.

### Adım 2

Yönetim Arayüzünü Sınırlayın Firewall yönetim arayüzü internetten erişilebilir olmamalıdır. Yalnızca iç ağdan erişilebilir olmalıdır. Eğer dışarıdan erişim gerekiyorsa VPN üzerinden yapılır.

### Adım 3

Kural Setlerini Yazılı Bir Politikaya Göre Yapın "Bu portu açın bir şey çalışmıyor" mantığıyla rastgele kural eklemek en yaygın hatadır. Önce yazılı bir politika: "hangi servisler dışarı çıkabilir, hangi servisler içeri girebilir, kim kime erişebilir". Sonra bu politikayı kurallara çevirin.

6 ay sonra "bu kural neden var" dediğinizde cevabını bilebilirsiniz.

### Adım 4

Implicit Deny Tüm kuralların en altında "hepsini reddet" kuralı olmalı. Açıkça izin verilmeyen her şey reddedilir. "Hepsine izin ver, sonra istediklerimi blokla" yaklaşımı yanlıştır.

### Adım 5

IPS/IDS ve Antivirus'ü Aktif Edin NGFW'ın değer kattığı ana özellikler bunlardır. Lisans alınmış ama aktif edilmemiş olduğunu görmek nadir değildir. Aktif edin, performans etkisini değerlendirin, gerekirse sadece kritik trafikte uygulayın.

### Adım 6

Web Filtering Kategori bazlı engelleme — mesai saatlerinde sosyal medya, oyun, yetişkin içerikli, malware kategorileri engellenir. Bu hem güvenlik hem üretkenlik aracıdır.

### Adım 7

Logging Tüm önemli olaylar loglanmalı, loglar dışarıda bir noktada saklanmalı (firewall'un kendisi düşerse logu da gider). KVKK ve 5651 bağlamında bu zorunluluktur. [KVKK uyumu IT altyapısı] yazımıza bakın.

### Adım 8

VPN Yapılandırması Uzaktan çalışanlar için client VPN, başka şubelerle bağlantı için site-to-site VPN. Modern tercih: SSL VPN veya IPSec. Detaylar için [uzaktan çalışan VPN kurulumu] yazımıza bakın.

### Adım 9

İmza ve Firmware Güncellemeleri IPS imzaları ve antivirüs tanımları otomatik güncellenmelidir. Firmware güncellemeleri de düzenli yapılmalıdır. Eski firmware bilinen güvenlik açıklarına sahiptir.

### Adım 10

Yedekleme Firewall yapılandırmasının yedeği alınmalıdır. Cihaz arızalandığında yapılandırmayı sıfırdan kurmak günler alabilir. Sıkça Yapılan Hatalar Performans için güvenliği kapatmak: "IPS yavaşlatıyor, kapattık" — saldırıya açıksınız.

Kural setini hiç temizlememek: Yıllar geçtikçe yüzlerce eski kural birikir, çakışır, açıklar oluşur. Lisans bittiği halde kullanmaya devam etmek: Lisans bittiğinde imza güncellemeleri durur, yeni tehditlere karşı korumasız kalırsınız. Sadece dışarıdan içeriye düşünmek: İçeriden dışarıya çıkış kontrolü de en az o kadar önemlidir.

Bir cihaz infekte olmuşsa, dışarıdaki C&C sunucusuyla iletişimi engellemek kritik.

## Firewall Kurulum ve Yönetim Hizmeti

KOBİ'nizin ihtiyaçlarına göre doğru firewall'u seçiyor, kuruyor, yapılandırıyor ve yönetiyoruz. Sadece kurulumu değil, sürekli güncelleme, izleme ve raporlamayı da üstleniyoruz.

## Sonuç

Firewall, şirket ağınızın dış dünyayla arasındaki tek ciddi bariyerdir. Yanlış cihaz, yanlış yapılandırma ya da güncellenmeyen bir kurulum koruma değil, koruma yanılsamasıdır. Doğru yapıldığında ise hem siber tehditlere karşı koruma sağlar, hem KVKK ve 5651 yükümlülüklerini karşılar, hem üretkenlik ve raporlama aracı olur.

Cihaz seçimi önemli ama yapılandırma daha önemli — bu yüzden firewall genellikle uzman desteğiyle kurulmalı ve yönetilmelidir.
