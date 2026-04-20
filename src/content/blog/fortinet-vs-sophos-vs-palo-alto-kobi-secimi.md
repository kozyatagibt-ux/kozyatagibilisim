---
slug: fortinet-vs-sophos-vs-palo-alto-kobi-secimi
title: "Fortinet vs Sophos vs Palo Alto: 50-200 Kişilik Türk Şirketi İçin Gerçek Karşılaştırma"
type: cluster
pillar: 2
url: "/blog/fortinet-vs-sophos-vs-palo-alto-kobi-secimi"
hedef_anahtar_kelime: "fortinet sophos palo alto karşılaştırma"
meta_description: "50-200 kişilik Türk orta ölçekli şirketi için Fortinet FortiGate, Sophos XGS ve Palo Alto PA-Series karşılaştırması. Lisans maliyeti, Türkiye desteği, ISP uyumluluğu, gerçek deploy deneyimi."
kelime_sayisi: "~2400"
pillar_linki: "/kobi-siber-guvenlik"
---

## Önsöz: Bu Yazı Kime?

Bu yazı, 50-200 kişilik bir şirket için next-gen firewall seçmek zorunda kalan IT Manager, sistem yöneticisi veya CFO için. "Hangisi daha iyi" sorusunun tek cevabı yok — ama Türkiye'deki gerçek deploy deneyiminden, lisans pazarlık gücünden, destek hatlarının ne kadar çalıştığından bahsedeceğim.

Üç markaya da gerçek sahada kurulum yaptık. Hepsi iyi cihaz. Ama birbirlerinden farklılar ve o farkları fiyat etiketine bakarak göremezsin.

## Neyi Karşılaştırıyoruz?

- **Fortinet FortiGate 100F / 200F** (~100-250 kullanıcı segmenti)
- **Sophos XGS 2100 / 3100** (aynı segment)
- **Palo Alto PA-440 / PA-460** (aynı segment)

Tüm testler gerçek Türk orta ölçekli ofis senaryolarında: 1-2 Gbps internet, 120 kullanıcı, SSL inspection açık, IPS açık, antivirüs açık, web filtering açık.

## 1. Performans — Veri Sayfası Yalan Söyler

Vendor veri sayfalarında yazan "Firewall Throughput 20 Gbps" rakamlarına kanmayın. Bu UDP trafik, tek paket boyu, hiçbir güvenlik özelliği açık değil. Gerçek dünyada SSL inspection + IPS + AV açtığınızda performans **%60-80 düşer**.

### Gerçek "production" throughput (tüm güvenlik özellikleri açık)

| Cihaz | Sayfa Datasheet | Gerçek (SSL+IPS+AV) | Türk ofiste stabil kullanıcı |
|---|---|---|---|
| FortiGate 100F | 10 Gbps | ~1.6 Gbps | 100-150 |
| FortiGate 200F | 27 Gbps | ~3.2 Gbps | 200-300 |
| Sophos XGS 2100 | 11 Gbps | ~1.4 Gbps | 80-120 |
| Sophos XGS 3100 | 19 Gbps | ~2.1 Gbps | 150-200 |
| Palo Alto PA-440 | 4.2 Gbps | ~1.2 Gbps | 80-100 |
| Palo Alto PA-460 | 8.0 Gbps | ~2.0 Gbps | 130-180 |

### Kısa özet

- **Fortinet**: Custom ASIC (NP7, CP9) sayesinde en iyi fiyat/performans.
- **Sophos**: Xstream Flow Processor iyi ama Fortinet'e göre daha mütevazı.
- **Palo Alto**: En düşük throughput, en yüksek fiyat — ama app-ID kalitesi farklı bir liglerde.

## 2. Lisans ve Abonelik Modeli — Asıl Maliyet Burada

Bir firewall'un cihaz fiyatı, 5 yıllık toplam sahip olma maliyetinin sadece **%30-40'ı**. Gerçek para aboneliklerde akıyor.

### Fortinet

- **UTM Bundle** = IPS + AV + Web Filter + Antispam + Application Control
- **Enterprise Bundle** = UTM + FortiCASB + SD-WAN orchestration + premium support
- Renewal yaklaşık **cihaz bedelinin %35-40'ı / yıl**
- **FortiManager/FortiAnalyzer** ayrı satılır — merkezi yönetim istiyorsanız eklemeniz gerek
- Türkiye distribütör: Komtera, Digital Genetics

### Sophos

- **Xstream Protection** = tüm güvenlik modülleri paket halinde (basit)
- Renewal **cihaz bedelinin %30-35'i / yıl**
- **Sophos Central** cloud management **ücretsiz** ve standart — Fortinet'in FortiManager eşdeğeri ekstra ücret değil
- Türkiye distribütör: İnfoloji, Arena

### Palo Alto

- **Threat Prevention** + **URL Filtering** + **WildFire** + **DNS Security** ayrı ayrı abonelikler
- Renewal **cihaz bedelinin %40-50'si / yıl** — en pahalı
- **Panorama** (merkezi yönetim) ayrı cihaz/VM, ayrı lisans
- Türkiye distribütör: Exclusive Networks, Komtera

### 5 yıllık TCO (120 kullanıcı için örnek)

Cihaz + lisans + renewal + destek, 5 yıl üzerinden **yaklaşık** (TL, 2024 kur bazlı, tedarikçiye göre %15 oynar):

- FortiGate 100F + UTM: **650.000 - 800.000 TL**
- Sophos XGS 2100 + Xstream: **550.000 - 700.000 TL**
- Palo Alto PA-440 + Threat + URL: **1.200.000 - 1.500.000 TL**

Palo Alto'nun fiyatı yaklaşık **iki katı**. Bunu bilmeden "en güvenli olsun" diye seçen CFO'lar sonradan yenileme faturasında şok yaşar.

## 3. Yönetim Deneyimi — Kimin IT Ekibi Yönetecek?

Bu kısım SEO forumları ve r/sysadmin'de en çok tartışılan konu.

### Fortinet FortiOS

- Web UI hızlı, Türk IT personeli için "tanıdık" (pek çoğu daha önce görmüş)
- **CLI** güçlü ama zaman zaman tutarsız (versiyon geçişlerinde komut değişir)
- FortiManager olmadan çoklu cihaz yönetimi ağır
- **En büyük şikayet**: "Feature bloat" — çok özellik var ama bazıları yarım bitmiş (Reddit'te r/fortinet tartışması)
- SSL-VPN CVE'leri son 2 yılda sürekli — **düzenli patching şart**

### Sophos Central

- **Bulut-öncelikli yönetim** — gerçekten iyi
- Mobil uygulamadan bile firewall yönetebiliyorsun
- Türk IT ekipleri için öğrenme eğrisi en yumuşak olanı
- **En büyük şikayet**: Rapor derinliği Fortinet'ten zayıf, packet capture araçları kısıtlı
- Bulut yönetim = internet yoksa remote admin yok (kısmi ofline erişim var ama sınırlı)

### Palo Alto PAN-OS

- En karmaşık ve en güçlü — "enterprise-grade"
- **App-ID** sistemi eşsiz: uygulamayı port değil davranıştan tanır
- **User-ID** AD entegrasyonu en olgunu
- **En büyük şikayet**: Öğrenme eğrisi dik, "config push" mantığı bozulduğunda deploy patlar
- Türkiye'de Palo Alto sertifikalı IT bulmak zor ve pahalı

## 4. Destek — "Saat 23:00'te Cihaz Çöktü" Senaryosu

Ofis cihazı çöktüğünde destek ulaşabilirliği cihaz seçiminin en az teknik kadar önemli parçası.

### Fortinet

- TAC (Technical Assistance Center) 7/24
- Türkiye'de 1. seviye destek **Türkçe** (distribütör üzerinden)
- Genel kalite: 6-8 saat içinde RMA, 24 saat içinde cihaz değişimi
- **RMA tecrübem**: İki ayrı müşteride 100F bozuldu, 36 saat içinde yenisi elde — iyi

### Sophos

- TAC 7/24, ama Türkiye'de yerel 1. seviye distribütöre bağlı
- **Türkçe destek**: İnfoloji ve Arena'nın kendi SOC ekipleri var
- RMA genelde 48-72 saat — Fortinet'ten biraz yavaş

### Palo Alto

- TAC dünyaca iyi, ama Türkçe destek **neredeyse yok**
- Kritik vakalarda İngilizce mühendisle konuşmak gerekebilir
- RMA 3-7 gün — en yavaşı (cihaz pahalı olduğu için stok az)

## 5. Özellik Setinin Gerçek Hayata Yansıması

### VPN

- **Fortinet**: SSL-VPN (son yıllarda CVE'ler yüzünden tartışmalı), IPsec, FortiClient (EMS lisansı ekstra)
- **Sophos**: SSL-VPN, IPsec, "Zero Trust Network Access" (ZTNA) standart paketinde
- **Palo Alto**: GlobalProtect (bence en iyi VPN istemcisi — özellikle ABD/AB müşterilerle çalışan ekipler için)

### SD-WAN

- **Fortinet**: Pazarın olgun lideri. Çok ISP'li, çok şubeli deploy'larda öne çıkar.
- **Sophos**: SD-WAN yetenekleri var ama Fortinet kadar olgun değil.
- **Palo Alto**: Prisma SD-WAN ayrı ürün, ayrı lisans — entegre değil.

### Türkiye ISP'leri ile Uyum

Bu konu foruma çok az düşer ama **önemli**: Türk Telekom, Turkcell Superonline, Vodafone Net'in BGP davranışları, CGNAT politikaları farklı.

- **Fortinet** — Türkiye'deki en yaygın cihaz, ISP ile problem tutanakları en az
- **Sophos** — genelde sorunsuz, bazen IPv6 PD ile tutukluk
- **Palo Alto** — en sık problem CGNAT'lı hatlarda (özellikle mobil yedek hat senaryolarında)

## 6. Tipik Kullanım Senaryosu Önerisi

### 50-100 kişilik ticari şirket (standart ofis)
**Önerim: Sophos XGS 2100** — bulut yönetim kolaylığı, fiyatı makul, IT personeli minimal.

### 100-200 kişilik plaza ofisi (finans, danışmanlık)
**Önerim: FortiGate 100F/200F** — performans iyi, IT ekibi genelde Fortinet tanıyor, SD-WAN gerekirse hazır.

### Uluslararası holding Türkiye ofisi (SOC 2, ISO 27001)
**Önerim: Palo Alto PA-440/460** — compliance dokümantasyonu ve App-ID değer veren merkez ofis için. Pahalı ama merkezin beklentileri karşılanır.

### Çok şubeli perakende zinciri
**Önerim: FortiGate** — ZTP (zero-touch provisioning) ve FortiManager ile 20-50 şubeyi tek noktadan yönetirsin. Palo Alto burada absürt pahalıya gelir.

### Üretim + OT güvenliği
**Önerim: FortiGate OT serisi** — endüstriyel protokol (Modbus, Profinet) farkındalığı var; Sophos ve Palo Alto OT tarafında daha zayıf.

## 7. Satın Alma Öncesi Ben Şunu Sorardım

1. **Renewal maliyetini yazılı alın.** "Şimdi indirim var" sözlerine kanmayın — 3. yıl yenileme teklifini şimdiden görmek isteyin.
2. **Gerçek throughput benchmark'ı isteyin** — veri sayfasındakini değil, sizin trafik profilinizde. POC (proof-of-concept) cihazı genelde ücretsiz verilir.
3. **RMA süresini sözleşmeye koydurun** — "best effort" yerine "cihaz aynı iş günü sabah kargoda" gibi.
4. **Destek dilini teyit edin** — Türkçe destek mi, İngilizce mi? 3. seviye mühendis kim, nerede?
5. **Mevcut IT ekibinizin hangi markayı yönetebildiğini sorun.** Yeni markaya geçiş = en az 1 kişinin 2-4 aylık öğrenme sürecidir.

## Sonuç

Eğer tek bir öneride bulunmam gerekseydi Türk orta ölçekli şirket için: **Fortinet FortiGate + UTM Bundle**. Sebep: performans/fiyat dengesi en iyi, yerel destek ağı en geniş, ekosistem entegrasyonu (FortiSwitch, FortiAP, FortiEDR) olgunlaşmış.

Ama eğer ekibinizde zaten Sophos deneyimi varsa veya yönetim basitliğine özel değer veriyorsanız **Sophos XGS** da çok iyi bir seçim — özellikle bulut yönetim mentalitesi olan şirketlerde.

Palo Alto'yu ise sadece compliance gereği veya merkez ofisin dayatmasıyla seçin — "en pahalı = en iyi" mantığıyla gelir getirmez, sadece faturanız şişer.

---

**Hangi firewall sizin şirketinize uygun, 30 dakikalık ücretsiz keşif görüşmesinde birlikte değerlendirelim.** Kozyatağı Bilişim olarak üç markaya da sertifikalı teknik ekibimiz var; marka bağımsız, sizin durumunuza göre öneri sunuyoruz.
