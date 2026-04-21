---
slug: "network-altyapi-maliyet-rehberi"
title: "Şirket Network Altyapısı Kurulum Maliyeti: 2026 Fiyat Rehberi"
type: "cluster"
pillar: 4
url: "/blog/network-altyapi-maliyet-rehberi"
hedef_anahtar_kelime: "network kurulum maliyeti"
meta_description: "2026 şirket network kurulum maliyeti: kablolama, switch, access point, firewall, rack dolap fiyatları. 10, 30 ve 100 kişilik ofis senaryoları."
kelime_sayisi: "1800"
pillar_linki: "/kurumsal-network-kurulumu"
---

# Şirket Network Altyapısı Kurulum Maliyeti: 2026 Fiyat Rehberi

"Network kurulumu ne kadar tutar?" sorusu, yeni ofis açan veya mevcut altyapısını yenileyen her şirketin ilk sorduğu soru. Cevap maalesef "duruma göre değişir" ama bu yazıda durumu somutlaştırıyoruz: 10, 30 ve 100 kişilik ofis senaryoları için gerçekçi 2026 Türkiye fiyatlarıyla bütçenizi planlamanıza yardımcı oluyoruz.

Fiyatlar Nisan 2026 itibarıyla Türkiye piyasasındaki ortalama perakende ve entegratör fiyatlarını yansıtmaktadır. Döviz kuru dalgalanmaları nedeniyle gerçek fiyatlar farklılık gösterebilir.

## Network Altyapısının Temel Bileşenleri

Bir şirket ağı kurulumunda maliyet kalemleri şu ana başlıklar altında toplanır:

### 1. Yapısal Kablolama (Structured Cabling)

Network altyapısının omurgası. Bugün Cat6A standartta kablolama yapmak, gelecek 10 yılı garantilemek anlamına geliyor. Cat5e hala çalışır ama 10 Gbps desteklemez; yeni kurulumda Cat6A tercih edin.

**Kablolama maliyet kalemleri (nokta başına):**

| Kalem | Fiyat Aralığı |
|---|---|
| Cat6A kablo (metraj dahil) | 400-600 TL/nokta |
| RJ45 keystone jack + patch panel | 150-250 TL/nokta |
| Kablo kanalı/tava | 100-200 TL/nokta |
| İşçilik (çekme, sonlandırma, test) | 300-500 TL/nokta |
| **Toplam (nokta başı)** | **950-1.550 TL** |

Bir çalışan için genellikle 2 network noktası hesaplanır (bilgisayar + IP telefon veya yedek). Ortak alanlar, toplantı odaları ve yazıcı noktaları da eklenmelidir.

### 2. Ağ Anahtarları (Switch)

Tüm cihazların bağlandığı merkezi ekipman. PoE (Power over Ethernet) destekli switch tercih etmek, IP telefon ve access point beslemesi için ayrı güç kaynağı ihtiyacını ortadan kaldırır.

| Marka/Model | Port | PoE | Yönetilebilir | Fiyat |
|---|---|---|---|---|
| Ubiquiti USW-Lite-8-PoE | 8 | Evet (52W) | Evet | 4.500-5.500 TL |
| MikroTik CRS328-24P-4S+ | 24 | Evet (500W) | Evet | 12.000-15.000 TL |
| Ubiquiti USW-Pro-24-PoE | 24 | Evet (400W) | Evet | 16.000-19.000 TL |
| Cisco CBS250-24P-4G | 24 | Evet (195W) | Evet | 18.000-22.000 TL |
| Cisco CBS350-48P-4G | 48 | Evet (370W) | Evet | 35.000-42.000 TL |
| MikroTik CRS354-48P-4S+2Q+ | 48 | Evet (750W) | Evet | 28.000-33.000 TL |

Küçük ofisler için Ubiquiti veya MikroTik, uygun fiyat/performans oranı sunuyor. Kurumsal ortamlarda Cisco'nun destek ve güvenilirlik avantajı var ama maliyeti de buna paralel.

### 3. Kablosuz Erişim Noktaları (Access Point)

Günümüzde Wi-Fi 6 (802.11ax) standardında AP kullanmak doğru tercih. Wi-Fi 6E veya 7 destekli modeller de piyasada ancak cihaz desteği henüz yaygınlaşmadı.

| Marka/Model | Standart | Kapsama | Fiyat |
|---|---|---|---|
| Ubiquiti U6+ | Wi-Fi 6 | ~120 m2 | 3.500-4.500 TL |
| Ubiquiti U6 Pro | Wi-Fi 6 | ~150 m2 | 5.500-7.000 TL |
| TP-Link EAP670 | Wi-Fi 6 | ~130 m2 | 5.000-6.000 TL |
| Cisco CBW240AC | Wi-Fi 6 | ~130 m2 | 8.000-10.000 TL |
| Aruba Instant On AP25 | Wi-Fi 6 | ~140 m2 | 7.000-9.000 TL |

Genel kural: Her 80-100 m2 alan ve her 25-30 aktif kullanıcı için bir AP hesaplayın. Duvar yapısı, kat planı ve cihaz yoğunluğu bunu değiştirebilir. Profesyonel bir site survey ile kesin AP sayısını belirlemek en doğrusu.

Wi-Fi güvenliği hakkında detaylı bilgi için [Şirket Wi-Fi Güvenliği](/blog/sirket-wifi-guvenligi) yazımıza göz atabilirsiniz.

### 4. Güvenlik Duvarı (Firewall)

KOBİ ölçeğinde bile firewall şart. "Modemde firewall var" yaklaşımı ciddi güvenlik açıkları bırakır. Donanımsal bir firewall, ağ trafiğini denetler, VPN erişimi sağlar ve tehditleri engeller.

| Marka/Model | Kullanıcı Kapasitesi | Özellikler | Fiyat |
|---|---|---|---|
| pfSense (DIY mini PC) | 10-30 | Açık kaynak, esnek | 6.000-10.000 TL |
| Fortinet FortiGate 40F | 10-25 | UTM, VPN, IPS | 18.000-22.000 TL |
| Fortinet FortiGate 60F | 25-50 | UTM, SD-WAN, VPN | 28.000-35.000 TL |
| Fortinet FortiGate 80F | 50-100 | UTM, SD-WAN, HA | 45.000-55.000 TL |
| Sophos XGS 107 | 10-30 | UTM, VPN, sandbox | 15.000-20.000 TL |
| Sophos XGS 126 | 30-75 | UTM, SD-WAN, sandbox | 30.000-38.000 TL |

Fortinet lisans maliyetleri yıllık olarak eklenir (FortiGuard Bundle): 40F için yıllık ~10.000-15.000 TL, 60F için ~15.000-20.000 TL. pfSense lisans maliyeti yoktur ama yapılandırma ve bakım için teknik bilgi gerektirir.

Firewall kurulumu hakkında detaylı rehber için [Küçük Şirket Firewall Kurulumu](/blog/kucuk-sirket-firewall-kurulumu) yazımıza bakabilirsiniz.

### 5. Rack Dolap ve Aksesuarlar

Tüm aktif ekipmanın düzenli ve güvenli bir şekilde yerleştirilmesi için rack dolap gereklidir.

| Ekipman | Fiyat Aralığı |
|---|---|
| 12U duvar tipi rack dolap | 3.500-5.000 TL |
| 22U yer tipi rack dolap | 6.000-9.000 TL |
| 42U yer tipi rack dolap | 10.000-16.000 TL |
| Patch panel (24 port, Cat6A) | 1.500-2.500 TL |
| UPS (1500VA, line interactive) | 5.000-8.000 TL |
| UPS (3000VA, online) | 12.000-18.000 TL |
| Kablo düzenleyici (1U) | 300-500 TL |
| Raf tipi PDU | 1.500-2.500 TL |

### 6. İşçilik ve Proje Yönetimi

Ekipman maliyeti toplam bütçenin sadece bir kısmı. Kurulum, yapılandırma ve proje yönetimi maliyetleri de hesaba katılmalı.

- **Network tasarım ve planlama:** 3.000-8.000 TL
- **Kurulum işçiliği:** Ekipman maliyetinin %15-25'i
- **Yapılandırma ve test:** 5.000-15.000 TL (ölçeğe göre)
- **Dokümantasyon:** 2.000-5.000 TL

## Senaryo 1: 10 Kişilik Ofis (Tahmini: 30.000-50.000 TL)

Tipik profil: Hukuk bürosu, muhasebe ofisi, küçük yazılım ekibi. 60-80 m2 alan.

| Kalem | Detay | Maliyet |
|---|---|---|
| Kablolama | 20 nokta x 1.100 TL | 22.000 TL |
| Switch | Ubiquiti USW-Lite-8-PoE x 1 | 5.000 TL |
| Access Point | Ubiquiti U6+ x 1 | 4.000 TL |
| Firewall | pfSense (mini PC) | 8.000 TL |
| Rack dolap | 12U duvar tipi | 4.000 TL |
| UPS | 1500VA line interactive | 6.000 TL |
| Patch panel + aksesuarlar | -- | 3.000 TL |
| İşçilik + yapılandırma | -- | 8.000 TL |
| **Toplam** | | **~60.000 TL** |

Bütçeyi 30.000-35.000 TL'ye çekmek mümkün: kablo noktasını azaltıp Wi-Fi'a ağırlık vererek, kullanılmış veya refurbished ekipman tercih ederek, pfSense yerine modem üzerindeki firewall ile başlayarak. Ancak bu tavizlerin güvenlik ve performans açısından riskleri var.

Maliyet aralığı: **30.000-50.000 TL** (tercih edilen ekipman kalitesine göre)

## Senaryo 2: 30 Kişilik Ofis (Tahmini: 80.000-150.000 TL)

Tipik profil: Orta ölçekli ticaret firması, dijital ajans, mühendislik ofisi. 200-300 m2 alan.

| Kalem | Detay | Maliyet |
|---|---|---|
| Kablolama | 70 nokta x 1.200 TL | 84.000 TL |
| Switch | MikroTik CRS328-24P x 2 | 28.000 TL |
| Access Point | Ubiquiti U6 Pro x 3 | 19.000 TL |
| Firewall | Fortinet FortiGate 60F | 32.000 TL |
| FortiGuard lisans (1 yıl) | -- | 17.000 TL |
| Rack dolap | 22U yer tipi | 7.500 TL |
| UPS | 3000VA online | 15.000 TL |
| Patch panel + aksesuarlar | 3x24 port | 7.000 TL |
| İşçilik + yapılandırma | -- | 20.000 TL |
| **Toplam (ilk yıl)** | | **~229.500 TL** |

Bütçe optimizasyonu ile 80.000-100.000 TL bandına çekilebilir: kablo noktalarını optimize ederek, MikroTik veya Ubiquiti firewall alternatiflerine yönelerek, tek switch ile başlayarak.

Maliyet aralığı: **80.000-150.000 TL**

## Senaryo 3: 100 Kişilik Ofis (Tahmini: 250.000-500.000 TL)

Tipik profil: Üretim şirketi genel merkezi, lojistik firması, çağrı merkezi. 500-1000 m2 alan, muhtemelen çoklu kat.

| Kalem | Detay | Maliyet |
|---|---|---|
| Kablolama | 220 nokta x 1.300 TL | 286.000 TL |
| Core switch | Cisco CBS350-48P x 1 | 38.000 TL |
| Access switch | MikroTik CRS328-24P x 6 | 84.000 TL |
| Access Point | Ubiquiti U6 Pro x 10 | 65.000 TL |
| Wireless controller/yazılım | -- | 10.000 TL |
| Firewall | Fortinet FortiGate 80F | 50.000 TL |
| FortiGuard lisans (1 yıl) | -- | 25.000 TL |
| Rack dolap | 42U yer tipi x 2 | 28.000 TL |
| UPS | 3000VA online x 2 | 30.000 TL |
| Patch panel + aksesuarlar | 10x24 port | 20.000 TL |
| Fiber omurga (katlar arası) | -- | 25.000 TL |
| İşçilik + yapılandırma | -- | 50.000 TL |
| Proje yönetimi + dokümantasyon | -- | 15.000 TL |
| **Toplam (ilk yıl)** | | **~726.000 TL** |

Bu senaryoda toplam maliyet yüksek görünse de, ekipmanların ömrü 7-10 yıl ve kablolama 15-20 yıl. Yıllık maliyete böldüğünüzde kişi başı yıllık network altyapı maliyeti 7.000-10.000 TL civarına düşüyor.

Bütçe optimizasyonu ile 250.000-350.000 TL aralığına getirmek mümkün: switch ve AP markalarında tasarruf ederek, kablo noktalarını azaltarak, firewall'da pfSense tercih ederek.

Maliyet aralığı: **250.000-500.000 TL**

## Gizli Maliyetleri Unutmayın

Bütçe planlarken sıklıkla gözden kaçan kalemler:

- **Internet hattı:** Fiber bağlantı kurulum ve aylık ücretler. Yedek hat (backup ISP) maliyeti.
- **Lisans yenilemeleri:** Firewall, yönetim yazılımları yıllık lisans bedelleri.
- **Bakım ve destek:** Garanti dışı onarımlar, konfigürasyon değişiklikleri.
- **Genişleme payı:** Switch portlarında ve kablolama kapasitesinde %20-30 yedek bırakın.
- **Eğitim:** IT personeli veya yöneticiler için temel ağ yönetimi eğitimi.
- **Elektrik maliyeti:** Aktif ekipmanların (switch, AP, firewall, UPS) aylık elektrik tüketimi.

## Tasarruf İpuçları

1. **Aşamalı kurulum yapın:** Tüm bütçeyi ilk gün harcamak zorunda değilsiniz. Önce kablolama ve temel network, ardından güvenlik ve kablosuz genişleme.
2. **Doğru markayı seçin:** Her zaman en pahalı marka en iyisi değil. Ubiquiti ve MikroTik, KOBİ segmentinde Cisco ile karşılaştırılabilir performans sunuyor.
3. **Kablolama'dan tasarruf etmeyin:** En uzun ömürlü bileşen kablolama. Ucuz kablo veya kötü sonlandırma yıllar sonra başınızı ağrıtır.
4. **Profesyonel kurulum yaptırın:** Amatör kurulum kısa vadede tasarruf gibi görünse de uzun vadede arıza ve performans sorunlarına yol açar.

Yeni ofis kurulumuyla ilgili kapsamlı rehberimiz olan [Yeni Ofis IT Kurulum Rehberi](/blog/yeni-ofis-it-kurulum-checklist-50-madde) yazımızda network dışındaki IT bileşenlerini de ele alıyoruz.

## Sonuç

Network altyapısı, şirketinizin dijital omurgasıdır. Doğru planlanmış bir altyapı 10-15 yıl sorunsuz hizmet verir; yanlış tasarlanmış bir altyapı ise 2-3 yıl içinde baştan yapılmak zorunda kalır. Bütçeniz ne olursa olsun, önce kablolama ve temel ağ güvenliğinden başlayın, ardından ihtiyaca göre genişletin.

Kozyatağı Bilişim olarak İstanbul'daki şirketlere network altyapı tasarımı, kurulumu ve bakımı konusunda uçtan uca hizmet veriyoruz. Ofisinize özel ücretsiz keşif ve fiyat teklifi almak için bizimle iletişime geçebilirsiniz.
