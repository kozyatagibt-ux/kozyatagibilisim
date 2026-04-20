---
slug: fortigate-cpu-yuksek-100-kullanim-cozum
title: "FortiGate CPU %100 — Hangi Process, Nasıl Düşürürüz?"
type: cluster
pillar: 2
url: "/blog/fortigate-cpu-yuksek-100-kullanim-cozum"
hedef_anahtar_kelime: "fortigate cpu yüksek"
meta_description: "FortiGate firewall CPU kullanımı %80+ çıktığında hangi process tüketiyor nasıl tespit edersiniz, kalıcı çözüm adımları. IPS/IPS Engine, UTM, session çözümleri."
kelime_sayisi: "~2300"
pillar_linki: "/hizmetler/ag-guvenligi-firewall"
troubleshoot: true
error_code: "High CPU Usage"
product_family: "Fortinet & Firewall"
---

## Semptom

FortiGate yönetim paneli ana ekranında CPU gauge %80+ sarı/kırmızı. Ya da:

- Monitoring > System Resources grafiğinde CPU baselines 40%'ken birden 95%'e fırlamış
- İnternet yavaşlamış, kullanıcılar şikayet ediyor ama bant genişliği dolu değil
- FortiGate web arayüzü açılırken 5-10 saniye bekletiyor
- SSH bağlantısı yavaş cevap veriyor, komutlar 2-3 saniye gecikmeli
- System Events'te `CPU usage high` alarmları
- Modele göre 100 Mbps trafikte bile 100F CPU %100, oysa 10 Gbps kapasiteli

Bu sorun Türk KOBİ'lerinde en sık görülen FortiGate şikayetidir. Kök sebepler farklı, ama teşhis disiplinli yapılırsa çözüm genelde **30 dakika içinde mümkün**.

## Hızlı Çözüm (TL;DR)

1. CLI'dan `diagnose sys top` çalıştır, hangi process CPU yediğini gör
2. En sık suçlular: **scanunitd** (antivirüs), **ipsengine** (IPS), **miglogd** (logging), **newcli** (SSH oturumları)
3. Session sayısını kontrol et: `diagnose sys session stat` — 90% full ise session timeout'lar düşürülmeli
4. Log disk dolu mu? `get sys status` — dolu ise log rotate et

Genel olarak: Eğer CPU sürekli >80% ise cihaz undersize'dır (yetersiz model). Geçici optimizasyon işler ama kalıcı çözüm model upgrade'dir.

## Hata Neden Oluyor? (Sebepler)

FortiGate'te CPU yüksek kullanımı birkaç katmandan gelir:

### Sebep 1: Yetersiz Donanım (Undersize)

FortiGate data sheet'lerdeki "10 Gbps throughput" rakamı **saf firewall trafiği + hiçbir güvenlik özelliği olmadan**. Gerçek kullanımda:

- **SSL inspection açık**: Throughput %40-60 düşer
- **IPS açık**: Ek %20-30 düşer
- **Application Control açık**: Ek %10-15 düşer
- **Antivirus açık**: Ek %15-20 düşer

Örnek: FortiGate 100F veri sayfasında 10 Gbps yazar. Tüm UTM açık, SSL inspection ile gerçek kapasite **~1.6-2 Gbps**. 120 kullanıcılı ofis 1 Gbps pick yaparsa cihaz **kapasitesinin %60-80'inde** çalışır — CPU yüksek.

### Sebep 2: ASIC Offload Kullanılmıyor

FortiGate'lerin özelliği **custom ASIC** (NP7, CP9 vs.) — paketleri donanımda işler. Ama bazı trafik tipleri CPU'ya düşer:

- **IPsec VPN trafiği** bazı durumlarda NP offload dışında
- **Fragmented paketler** ASIC atlayıp CPU'ya gelir
- **Kompleks firewall kurallarıyla işaretlenen trafik**

### Sebep 3: Session Table Dolu

Her TCP/UDP bağlantı bir session. FortiGate max session limiti var (modelle değişir). Dolu olunca yeni bağlantı kurulamaz, CPU delikli delikli çalışır.

FortiGate 100F max ~6 milyon session. 120 kullanıcılı ofisin normal session sayısı 50-100K. Eğer 4M+ görünüyorsa **SYN flood, P2P, torrent, veya bot trafik** var.

### Sebep 4: Log Disk Problemi

**FortiGate dahili disk logları** açıksa ve disk %95+ dolu ise logging process CPU'yu yer.

```
config log disk setting
    set status enable
end
```

Bu aktifse ve RE/30M veya kompakt modelde disk 60-100 GB ise sürekli doluluğa yakın oluyor.

### Sebep 5: Bilinen Bug / Firmware Sorunu

FortiOS versiyonunda bilinen CPU bug'ı olabilir. Fortinet düzenli bültenler yayınlar:

- **FortiOS 7.2.4** — IPS engine memory leak (7.2.5'te düzeltildi)
- **FortiOS 7.0.12** — SSL-VPN session tracking CPU high
- **FortiOS 6.4.x** eski sürümlerde genel performance sorunları

### Sebep 6: Brute Force / DDoS Altındaki Public IP

İnternet tarafındaki WAN IP'sine sürekli SSH, RDP, HTTPS brute force geliyorsa FortiGate her paketi inceliyor — CPU tükenir.

## Adım Adım Çözüm

### Adım 1: CLI'dan "diagnose sys top"

Bu en kritik komut. SSH bağlanın veya GUI CLI console açın:

```
diagnose sys top
```

Örnek çıktı:
```
Run Time:  12 days, 3 hours and 24 minutes
0U, 0S, 87I; 3892T, 1204F, 134KF

          scanunitd    2834      R      78.5    2.3
          ipsengine    1205      R      12.3    1.8
          miglogd       934      S       3.1    0.8
          newcli        812      S       1.2    0.3
```

Sütunlar:
- **Process name**
- **PID**
- **State** (R=running, S=sleeping)
- **CPU%** — en kritik
- **Memory%**

**Yorumlama:**
- **scanunitd** yüksekse: **Antivirus** yoğun çalışıyor (trafik çok ya da büyük dosya scan'i var)
- **ipsengine** yüksekse: **IPS** signature matching yoğun
- **miglogd** yüksekse: **Log yazımı** sorunlu (disk veya FortiAnalyzer bağlantısı)
- **newcli** yüksekse: Çok SSH session açılmış, bazen saldırı olabilir
- **sshd** yüksekse: SSH brute force altındasın
- **wad** yüksekse: Web filtering/proxy

`q` ile çıkılır.

### Adım 2: Session Table Analizi

```
diagnose sys session stat
```

Örnek:
```
session table: table_size=6029312 max_depth=4 avg_depth=1
session count: 234156
expired session count: 14923
```

Max session'a yakınsa ve 200K+ session normal değilse **anormal trafik var**.

En çok session üreten IP'leri bul:
```
diagnose sys session list | grep proto=6
# Ya da grafik için:
diagnose ip proto-stat
```

Çok fazla session açan iç IP bulursan (örn. bir workstation'dan 50K+ session):
- Workstation virüslü olabilir (bot, miner, worm)
- Torrent/P2P yapıyor olabilir
- Kötü yapılandırılmış bir uygulama (sürekli new connection açıyor)

### Adım 3: Hangi Trafik Tipi Baskın?

```
diagnose sys proto-stats
```

Bu protokol dağılımı verir. UDP özellikle yüksekse DNS amplification, NTP amplification veya IoT trafiği olabilir.

### Adım 4: Bilinen Bug Kontrolü

Firmware versiyonunuzu kontrol:
```
get sys status | grep Version
```

Örn. `v7.2.4 build1396` çıktıysa, Fortinet release notes'ta 7.2.4'ün bilinen CPU bug'larına bak:
https://docs.fortinet.com/document/fortigate/7.2.8/fortios-release-notes

Sonraki stable sürüm varsa upgrade değerlendirilmeli — ama yama notlarını dikkatli oku, production'da test önemli.

### Adım 5: SSL Inspection Kapsamını Daralt

SSL inspection en ağır işlem. Tüm trafiği inceleyip tamamen deep inspect ediyorsanız CPU fazla tüketir. Optimize:

```
config firewall ssl-ssh-profile
    edit "custom_ssl_profile"
        config https
            set ports 443
            set status certificate-inspection  # deep-inspection yerine
        end
    next
end
```

**Certificate inspection**: Sadece sertifikayı inceler, içerik decrypt etmez. CPU tüketimi %90 düşer.

**Deep inspection**: Trafiği decrypt, inspect, re-encrypt. Çok CPU tüketir.

Hybrid yaklaşım: Hassas kategorilerde (finans, sağlık) deep, diğerlerinde certificate. Policy bazında seçilir.

### Adım 6: IPS Sensor'ü Optimize Et

IPS binlerce signature ile her paketi tarar. Optimizasyon:

```
config ips sensor
    edit "default"
        config entries
            # Sadece critical + high severity
            edit 1
                set severity critical high
            next
        end
    next
end
```

Az kritik signature'ları disable etmek CPU'yu %20-30 düşürür — ama güvenlik trade-off'u var, kararla yap.

### Adım 7: Log Disk Temizliği

Dahili disk dolu mu:
```
get sys status
# "log disk usage" satırına bak
```

%90+ doluysa:
```
execute log filter category 0
execute log delete-filter field date @2024-01-01
execute log delete-filter status 0
execute log delete
```

Alternatif: External **FortiAnalyzer** veya syslog server'a log gönder, dahili diski kullanma.

### Adım 8: Brute Force / DDoS Kontrol

WAN interface'inde syslog'a bak:
```
diagnose sys firewall-stats list
```

Yüksek block sayıları varsa IPS veya firewall policy brute force'u engelliyor — ama hâlâ her paketi inceliyor, CPU tüketiliyor.

**Geo-IP block** en etkili çözüm:
```
config firewall address
    edit "Turkey_IPs"
        set country TR
    next
end

config firewall policy
    edit 1
        set srcintf "wan1"
        set dstintf "internal"
        set srcaddr "Turkey_IPs"  # Sadece TR'den gelenleri kabul et
        set action accept
    next
    edit 2
        set srcintf "wan1"
        set dstintf "internal"
        set srcaddr "all"
        set action deny
        set logtraffic disable  # Log basma, CPU yemesin
    next
end
```

Yabancı ülkelerden gelen trafiği doğrudan block eder, IPS'e hiç uğratmaz — CPU düşer.

### Adım 9: ASIC Offload'ı Doğrula

NP (Network Processor) offload çalışıyor mu:

```
diagnose npu np6 session list
# NP7 için:
diagnose sys npu-session list
```

Hardware'e offload edilmeyen session'ları gör. Neden offload edilmediği genelde:
- IPsec VPN (eski FortiOS'ta full offload yoktu)
- Traffic shaping policy
- Fragmented traffic
- Application Control bazı kategorilerde

```
config firewall policy
    edit 1
        set auto-asic-offload enable  # Standart
    next
end
```

### Adım 10: Model Yükseltmeyi Değerlendir

Yukarıdakiler geçici çözüm. Eğer:
- Kullanıcı sayısı 2 kat büyüdü
- Trafik volümü 3 kat arttı
- Yeni güvenlik özellikleri (EDR trafiği, Zero Trust) eklendi

Cihaz kapasitesi geçilmiş olabilir. Tipik model büyütme:
- FortiGate 60F → FortiGate 100F (küçük ofisten orta ölçeğe)
- FortiGate 100F → FortiGate 200F (orta ölçekten büyüğe)
- FortiGate 200F → FortiGate 400F (büyük kurumsal)

**Ticaret firmasında örnek**: 80 kullanıcıdan 180'e büyüyen bir firma FortiGate 60F kullanıyordu. CPU sürekli 85%+. Upgrade kararı 200F. Kurulum sonrası CPU %15-20'ye düştü, aynı güvenlik özellikleri tam aktif.

## Monitoring Öneri

Kalıcı çözüm **proaktif monitoring**. FortiManager/FortiAnalyzer varsa:
- CPU alarm threshold 70% (erken uyarı)
- Session count alarm 70% of max
- Memory alarm 80%

Olmayan ortamlarda SNMP ile PRTG, Zabbix, Nagios alarm kur.

## Sık Sorulan Sorular

### diagnose sys top komutu her CPU yüksek olunca aynı process gösteriyor, ne yapmalı?

Process baskın ise onun config'ini optimize et (yukarıdaki adımlar). İpsengine sürekli yüksekse IPS sensor daralt. Scanunitd yüksekse AV protocol-match'i azalt.

### Yeni firmware sonrası CPU yüksek, eski versiyona dönsem mi?

Önce Release Notes ve Known Issues'u oku. Downgrade çoğunlukla desteklenir ama yeni config feature varsa (örn. 7.2'den 7.0'a) uyumsuzluk olabilir. Çok yeni versiyona geçmiş ve sorun yaşıyorsan minor version düşürmeyi düşün (7.2.5 → 7.2.4 gibi).

### HA cluster'da sadece active node'da CPU yüksek

Normal — pasif node traffic işlemiyor. Ama active node sürekli high ise yine yük yüksek. Active/active cluster'a geçmek bazen yardım eder ama config karmaşıklığı artar.

### Log gönderirken miglogd yüksek çıkıyor

FortiAnalyzer ile bağlantı yavaş veya ağ kesintili olabilir. FortiAnalyzer disk'inde yer varsa gayet rahat alır. Log rate (eventler/sn) düşürmek için `config log syslogd filter` ile bazı event'leri filtrele.

### Ekibimde Fortinet uzmanı yok, ne yapmalı?

Fortinet Türkiye distribütörleri (Komtera, Digital Genetics) destek sözleşmesi sunar. Küçük işletmeler için MSP ile managed FortiGate hizmeti daha ekonomik — biz dahil.

---

**FortiGate yönetimi / performance / security tuning için uzmanlık mı arıyorsunuz?** Kozyatağı Bilişim FortiGate sertifikalı ekibimizle managed firewall hizmeti sunuyoruz: proaktif monitoring, aylık tuning, firmware upgrade, bug tracking. [Teknik görüşme talep edin.](/#contact)
