---
slug: hikaye-yazici-domain-controller-dize-getirdi
title: "Bir Yazıcı, 800 Kişilik Ofisin Domain Controller'ını Nasıl Dize Getirdi"
type: hikaye
pillar: 7
url: "/blog/hikaye-yazici-domain-controller-dize-getirdi"
hedef_anahtar_kelime: "yazıcı dns flood domain controller"
meta_description: "Bir Konica Minolta yazıcının domain controller'ları DDoS'layıp şirketi dize getirdiği gerçek vaka. DNS flood, firmware bug, network trace ile teşhis hikayesi."
kelime_sayisi: "~2300"
pillar_linki: "/hizmetler/network-altyapi"
hikaye: true
---

## Salı Öğleden Sonra — "Sistem Yavaşladı"

Büyük bir holding şirketinin BT ekibi, salı öğleden sonra 14:30'da ilk yavaşlık şikayetlerini almaya başladı.

İlk çağrı — muhasebe:
> "Logo çok yavaş. Açılıyor ama işlem yapınca takılıyor."

İkinci çağrı — İK:
> "Outlook 'bağlantı deneniyor' diyor. 2 dakika sonra geliyor ama sonra yine kesiliyor."

Üçüncü çağrı — satış departmanı:
> "Paylaşılan klasörlere ulaşamıyorum. 'Network path not found' diyor."

Servis masası sorumlusu Kerem, çağrıları gruplamaya başladı. Farklı semptomlar ama ortak bir paydası vardı: **yavaşlık**, **intermittent bağlantı kesintisi**.

Ağ mühendisi Burak'ı aradı:

> "Burak, bir şeyler oluyor. Network monitor'a baktın mı?"

## 14:50 — Grafikler Konuşuyor

Burak PRTG'yi açtı. Core switch'ten domain controller'lara giden trafik grafiğinde dikkat çeken bir şey:

- **Domain Controller 01 (DC01)**: 800 Mbps trafik, oysa normalde 40 Mbps
- **Domain Controller 02 (DC02)**: 720 Mbps
- **DC03**: 670 Mbps

Üç DC'de aynı anda 15-20 kat artmış trafik. Normal değildi.

PRTG'nin "packet composition" grafiğine baktı:
- UDP 53 (DNS) — **%94**
- Diğer — %6

DNS trafiği patlamış. Ama kim bu kadar DNS sorgusu atıyor?

## 15:10 — Packet Capture Başladı

Burak DC01'de Wireshark başlattı, 30 saniyelik bir capture aldı. Sonuç şaşırtıcıydı:

```
Source IP              Destination     Protocol  Info
192.168.4.127          192.168.1.10    DNS       Standard query 0x8234 A google.com
192.168.4.127          192.168.1.10    DNS       Standard query 0x8235 A google.com
192.168.4.127          192.168.1.10    DNS       Standard query 0x8236 A google.com
...
```

**192.168.4.127** tek bir IP, saniyede **3.400 DNS sorgusu** atıyor. Hepsi `google.com` için. 30 saniyede **102.000 sorgu**.

Üç DC'ye birden gidiyordu çünkü Windows DC'ler birden fazla DNS server kullanıyor — failover için her sorguyu paralel atıyor.

IP'yi DHCP lease tablosundan sorguladı:

```
192.168.4.127 → KonicaMinolta-C308-Floor4-Corner
```

**4. katın köşesindeki Konica Minolta fotokopi makinesi.**

## 15:15 — Yazıcıyı İncele

Burak ve Kerem 4. kata çıktılar. Konica Minolta C308 — büyük şirket fotokopi makinesi. Fotokopi ekranı normal görünüyordu. Kullanıcılar fotokopi almaya geliyor, makine çalışıyor.

Makineye giriş yaptılar — **Administrator** panelini açtılar:
- Makineye son firmware update: **3 hafta önce**, otomatik
- Network: Static IP, 192.168.4.127
- DNS: 192.168.1.10, 192.168.1.11 (DC'lerin IP'si — doğru)

Dış taraf normal. Ama ne olmuş olabilirdi? **Service Log**'u aç:

```
[Error] Cloud Service Connection Failed — Retrying...
[Error] Firmware Update Check: Connection timeout
[Error] ScanToCloud not configured — retrying DNS resolution
```

Bu hata satırları **dakikada 200+ kere** tekrarlanıyordu.

## 15:30 — Kök Sebep Bulundu

Konica Minolta firmware güncellemesi sonrası **yeni bir "Scan to Cloud" özelliği** aktive olmuştu. Makine `onbase.konica.com` adresine bağlanmaya çalışıyor, `onbase.konica.com` bu şirketin local DNS'te yok (public domain). DC'ye soruyor, DC dışarıya forward ediyor, ama shirketin firewall'ı **Konica'nın cloud domain'ini bloklamıştı** (IT security policy).

Makine response alamıyor → retry → yine sor → retry → **saniyede 3400 kez**.

3 hafta boyunca bu böyle gidiyordu. Ama neden bugün fark edildi?

Çünkü **bugün öğlen saatinde yazıcı yoğun kullanıldı**. Her fotokopi/scan aksiyonunda cloud check daha agresif retry yapıyor — asit asit büyüyen log döngüsü. Yavaş yavaş 500 Mbps DNS trafiğinden 800 Mbps'e çıkmıştı.

## 15:45 — Yangın Söndürme

Hızlı çözüm: **Cloud service'i disable et.**

```
Konica Admin Console > Network > Cloud Services > 
"OnBase Scan to Cloud" → Disabled
```

Makineyi yeniden başlattılar. 2 dakika içinde:

- DC01 trafik: 800 Mbps → 45 Mbps
- Outlook bağlantı kesintileri bitti
- Logo, paylaşılan klasörler normale döndü

Muhasebe müdürü Kerem'i aradı:
> "Birdenbire her şey normale döndü. Ne yaptınız?"

Kerem: "Yazıcı sorundu."

Muhasebe müdürü sessizliği:
> "...yazıcı?"

## 16:20 — Rapor

Burak ve Kerem, yaşananı CTO'ya özetlediler:

- **Vaka**: 4. kat Konica Minolta, yazılım güncellemesi sonrası cloud service failure
- **Etki**: 800 kullanıcı, ~90 dakika yavaşlık / kesinti
- **Kök sebep**: Konica firmware cloud check DNS flood + firewall bloğu kombinasyonu
- **Çözüm**: Yazıcıda cloud service disable
- **Kalıcı önlem gerekli**

CTO sordu: "Bu tek bir yazıcı. Ya başka yazıcılarda da olursa?"

Kerem durdu. Sonra: "Haklısınız. Envanter çıkarmam lazım."

## Ertesi Gün — Geniş Analiz

Kerem bütün katlarda yazıcı envanteri çıkardı:

- **Konica Minolta C308**: 12 adet
- **HP LaserJet**: 34 adet
- **Xerox WorkCentre**: 8 adet

Aynı Konica firmware update'ini alan 12 yazıcının hepsinde **aynı cloud retry loop** aktifti. Ama sadece 4. kattaki en yoğun kullanılanı "alarm seviyesine" çıkmıştı. Diğerleri sessiz sessiz dakikada 50-100 DNS sorgusu atıyordu — fark edilmeyecek seviyede, ama yine de gereksiz yük.

Kerem tüm Konica'larda cloud service'i disable etti, script yazdı:

```python
# konica_disable_cloud.py
import requests
printers = [
    '192.168.4.127', '192.168.5.89', '192.168.2.134',
    # ... 12 yazıcı
]
for ip in printers:
    response = requests.put(
        f'http://{ip}/web_mib/cloud_service',
        auth=('admin', 'admin_password'),
        json={'enabled': False}
    )
    print(f"{ip}: {response.status_code}")
```

## Bir Hafta Sonra — Post-Mortem

CTO'nun ekip toplantısı. Konu: "Yazıcı olayı."

### Ne İyi Yapıldı?

1. **Monitoring aktifti** — PRTG grafikleri olmasa "DC'lerde sorun" teşhisi için saatler kaybederdik
2. **Packet capture hızlı yapıldı** — Wireshark trafik kaynağını 10 dakikada tespit etti
3. **Fiziksel erişim mümkündü** — makineye bizzat gidip inceleme

### Ne Eksikti?

1. **Yazıcı envanteri güncel değildi** — 12 Konica'nın hepsini bilmiyorduk, DHCP'den tek tek çıkardık
2. **Yazıcı firmware güncellemeleri denetimsizdi** — otomatik açıktı, IT haberdar değildi
3. **Endpoint monitoring yazıcılarda yoktu** — yazıcılar "sessiz" cihazlar olarak görülüyordu, SIEM'de log yok
4. **DNS rate limiting yoktu** — bir kaynak dakikada 3400 query atsa bile DC kabul ediyordu

### Aksiyon Maddeleri

Kerem ve ekibi:

1. **Yazıcı envanteri CMDB'ye girildi** (ServiceNow). Her yazıcı için marka/model/IP/firmware sürümü takibi.

2. **Yazıcılara VLAN izolasyonu**. Yazıcılar artık ayrı bir VLAN'da. Internet erişimi var ama DC DNS'e sadece zorunlu sorgular.

3. **Firmware update policy**. Yazıcılar artık otomatik update yapmıyor. Aylık IT review + staged rollout.

4. **DC'de DNS rate limit**. Aynı IP'den saniyede 50'den fazla query atılırsa drop. Microsoft bunu DNS Policy ile destekliyor:
```powershell
Add-DnsServerResponseRateLimitingExceptionlist -Name "InternalClients" `
    -ClientSubnet "EQ,192.168.0.0/16"
Set-DnsServerResponseRateLimiting -ResponsesPerSec 10
```

5. **Yazıcı security audit** third-party firma ile. Sonuçta 3 yazıcıda telnet açık, 5'inde default admin şifresi, 2'sinde eski SMB1 enabled. Düzeltildi.

## Altı Ay Sonra

Benzer şekilde bir olay yaşandı — ama bu sefer **20 saniye içinde** tespit edildi:

- PRTG alarmı DNS spike için otomatik tetiklendi
- SIEM'deki DNS rate anomalisi event'i IT'ye mail attı
- Kerem telefonu açmadan önce zaten hangi IP'den geldiğini biliyordu
- VLAN izolasyonu sayesinde etki DC'lere ulaşmadı
- 15 dakikada çözüldü, **kimse fark etmedi**

Kerem o gün o sessiz başarıyı hesaplamadı. Kimse bir şey anlamadı. Ama sistem ilk kez olduğu gibi işledi.

## Çıkarılan Dersler

Bu hikayeden kurumsal ortam için 6 somut ders:

### 1. Yazıcı = Bilgisayar

Modern enterprise yazıcılar aslında gizli Linux server'lar. 512MB RAM, 2GB SSD, HTTP/SNMP/LDAP desteği var. Güvenlik ve monitoring gerektirir — "yazıcı" diye kenara atmak hata.

### 2. VLAN segmentasyonu her şeyi çözer

"Flat network" (tek VLAN) küçük ofiste idare eder ama büyüdükçe felaket. Yazıcı, IoT, misafir Wi-Fi, sunucu, kullanıcı — hepsi ayrı VLAN.

### 3. DNS rate limiting

DC'leriniz kendini koruyabilmeli. Tek bir aygıttan DDoS'a dayanıklı olmalı. Microsoft'un DNS Response Rate Limiting (RRL) özelliği ücretsiz ve kolay.

### 4. Yazıcı firmware = change management

Otomatik update = kontrol dışı. Yazıcı üreticileri sık sık "cloud service" gibi özellik ekliyor — sizin firewall veya policy'niz bundan haberdar değil. Staged rollout + IT awareness şart.

### 5. Monitoring "sessiz cihazlara" da

SNMP ile yazıcıları PRTG/Zabbix'e ekleyin. Sadece toner seviyesi değil — network traffic, error count, API calls. "Yazıcı DDoS" gibi sürpriz senaryolar öncesi fark edilir.

### 6. Packet capture araçlarınız hazır olsun

Wireshark + tcpdump komutlarını düzenli pratik edin. Kriz anında "Wireshark ne?" demek zaman kaybı.

---

*Bu hikaye, gerçek bir vakadan esinlenilmiştir. Teknik detaylar, araçlar ve komutlar gerçektir. Şirket ve kişi isimleri anonimleştirilmiştir.*

**Network monitoring, segmentasyon ve güvenlik denetimi konularında destek?** Kozyatağı Bilişim kurumsal network güvenlik paketimizle proaktif monitoring + VLAN tasarımı + incident response. [Ücretsiz keşif görüşmesi.](/#contact)
