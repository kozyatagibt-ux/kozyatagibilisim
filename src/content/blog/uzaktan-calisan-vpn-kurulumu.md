---
slug: uzaktan-calisan-vpn-kurulumu
title: "Uzaktan Çalışan Ekipler İçin Güvenli VPN Kurulumu"
type: cluster
pillar: 4
url: "/blog/uzaktan-calisan-vpn-kurulumu"
hedef_anahtar_kelime: "vpn kurulumu uzaktan çalışan"
meta_description: "Uzaktan çalışan ekipler için güvenli VPN nasıl kurulur? Protokoller, çözümler, MFA entegrasyonu ve ZTNA alternatifi. Pratik rehber."
kelime_sayisi: "~2000"
pillar_linki: "/kurumsal-network-kurulumu, /kobi-siber-guvenlik"
---

## Pandemi Sonrası Türkiye'de Uzaktan Çalışma

2020 öncesinde Türkiye'de uzaktan çalışma istisnaydı. Pandemiyle birlikte zorunluluk oldu, ardından kalıcı bir trend haline geldi. Bugün pek çok KOBİ hibrit modelde çalışıyor — haftanın bazı günleri ofis, bazı günleri ev.

Bazı şirketler tamamen uzaktan ekiplere geçti, hatta yurtdışından çalışan ekipler işe aldılar. Bu güzel ama bir güvenlik sorununu beraberinde getirdi: çalışanlar şirket ağına dışarıdan nasıl güvenli bağlanacak? Cevap çoğu firmada VPN'dir.

Ama VPN kurulumu yanlış yapıldığında işi zorlaştırıp güvenliği sözde sağlar. VPN Nedir, Nasıl Çalışır? VPN (Virtual Private Network), iki nokta arasında şifreli bir tünel oluşturur.

Çalışanın laptopu evde, internet üzerinden şirket ağına bağlanır; arada veriler şifrelenir, üçüncü şahıslar göremez. Bağlantı kurulduktan sonra çalışanın laptopu sanki ofiste fiziksel olarak ağdaymış gibi davranır — yerel sunuculara, paylaşımlara, yazıcılara erişebilir.

## Site-to-Site VPN

İki şubenizin (örneğin İstanbul ve Ankara ofisleriniz) ağlarını birleştirir. Her şubenin firewall'u arasında kalıcı bir tünel kurulur. Çalışanlar açısından şeffaftır — sanki tek ağmış gibi davranır.

Remote Access VPN (Client-to-Site) Tek tek çalışanlar kendi cihazlarından şirket ağına bağlanır. Bu yazının asıl odağı budur — uzaktan çalışan ekipler için ihtiyaç duyulan budur. VPN Protokolleri Protokol Güvenlik Hız Notlar OpenVPN Yüksek İyi Açık kaynak, esnek, en yaygın IPSec / IKEv2 Yüksek İyi Mobilde stabil, yerleşik destek WireGuard Yüksek Çok yüksek Modern, hızlı, kod tabanı küçük ve denetlenebilir SSL VPN Yüksek Orta Tarayıcı tabanlı çalışabilir, kurulum kolay PPTP Düşük Yüksek Kullanmayın.

Kırılmış. L2TP/IPSec Orta Düşük Eski, tercih edilmemeli Modern bir kurulumda WireGuard veya IPSec/IKEv2 tercih edilmelidir. WireGuard özellikle son yıllarda hızla yayılıyor — basit, hızlı ve güvenli.

Popüler VPN Çözümleri Firewall'unuzun VPN'i Eğer Fortinet, SonicWall, Sophos, pfSense gibi NGFW'unuz varsa, zaten VPN sunucusu özelliği vardır. Genellikle ek lisans almadan kullanabilirsiniz. En yaygın seçimdir.

## OpenVPN Access Server

Kendi OpenVPN sunucunuzu kurmak için hazır paket. Ücretsiz katman 2 kullanıcıya kadar, sonrası lisans. WireGuard Kendi sunucunuza yüklenir.

Tamamen ücretsiz, açık kaynak. Yapılandırması diğerlerine göre daha basittir ama bir Linux sunucu gerektirir. Cloudflare WARP / Cloudflare Zero Trust Bulut tabanlı modern bir alternatif.

Ücretsiz katmanı bile küçük ekipler için yeterli. Tailscale / ZeroTier Mesh VPN çözümleri. Geleneksel VPN'in bazı dertlerini ortadan kaldırır.

WireGuard tabanlı. Güvenli VPN Kurulumunun 8 Şartı 1. Multi-Factor Authentication (MFA) Sadece kullanıcı adı ve şifre yeter mi?

Hayır. VPN şifresi çalınırsa şirket ağına erişim açılır. MFA şart.

Çalışan şifresini girer + telefonuna gelen kodu girer veya authenticator app onaylar. Bu olmadan VPN kurulmamalı.

### 2. Sertifika Tabanlı Kimlik Doğrulama

İdeal olan: kullanıcı adı/şifre + cihaz sertifikası + MFA. Cihaz sertifikası çalınamaz çünkü çalışanın laptopuna kuruludur. Sadece o cihazdan bağlantı yapılabilir.

3. Active Directory veya RADIUS Entegrasyonu VPN'in ayrı bir kullanıcı veritabanı tutmaması, AD/LDAP/RADIUS ile entegre olması şart. Bu sayede çalışan ayrıldığında tek hesap kapatılır, tüm erişimleri otomatik kesilir.

Detay için [çalışan ayrıldığında IT süreci] yazımız. 4. Split Tunnel mü Full Tunnel mü?

Full tunnel: Tüm trafik VPN'den geçer. Daha güvenli ama yavaş, internet trafiği bile şirket ağından çıkar. Split tunnel: Sadece şirket kaynaklarına giden trafik VPN'den geçer, diğeri normal internetten gider.

Daha hızlı ama biraz daha az kontrol. KOBİ için genelde split tunnel daha pragmatiktir. Hassas sektörlerde full tunnel.

5. Az Yetki Prensibi VPN bağlanan kullanıcı şirket ağında her şeye erişmemeli. Sadece görevi gereği erişmesi gereken kaynaklar açık olmalı.

Firewall kuralları VPN trafiğini de filtrelemelidir.

## 6. Logging

Kim ne zaman bağlandı, ne kadar süre kaldı, hangi IP'den geldi, ne kadar veri aktardı — hepsi loglanmalı. KVKK ve 5651 bağlamında zorunludur.

### 7. Endpoint Güvenliği

Çalışanın evdeki cihazı virüs kapmışsa, VPN kurulduğu anda bu virüs şirket ağına da erişmiş olur. VPN'e bağlanacak her cihazda güncel antivirüs/EDR olması zorunlu hale getirilmelidir. Modern VPN çözümleri bunu kontrol edebilir (NAC — Network Access Control).

### 8. Kill Switch

VPN bağlantısı koptuğunda cihazın internet erişimini de kesen özellik. Böylece çalışan farkında olmadan VPN'siz şirket kaynağına erişmeye çalışmaz.

## VPN'in Sonu mu? ZTNA Alternatifi

Klasik VPN modelinin temel sorunu: VPN'e bir kez bağlanan kullanıcı tüm iç ağa "güvenilir" sayılır. Bu yıllar önce mantıklıydı, bugün değil. "Zero Trust" yaklaşımına göre ağ konumuna göre güven verilmemeli — her erişim, her kaynağa, her seferinde doğrulanmalıdır.

ZTNA (Zero Trust Network Access) çözümleri bu mantıkla çalışır. Çalışan VPN'e bağlanmaz; her uygulamaya erişirken kimliğini ve cihazının uyumluluğunu doğrular. Erişim sadece gerekli uygulamaya verilir, ağın geri kalanı tamamen görünmez.

Popüler ZTNA çözümleri: Cloudflare Access, Zscaler ZPA, Twingate, NetFoundry. Çoğu KOBİ için hâlâ erken olabilir ama farkında olmakta fayda var — gelecek bu yöne gidiyor. Uzaktan Çalışma İçin Güvenli VPN Kurulumu Şirketinizin yapısına uygun VPN çözümünü kuruyor, MFA ve AD entegrasyonu yapıyor, çalışan eğitimi veriyoruz.

ZTNA dahil modern alternatifleri de değerlendiriyoruz.

## Sonuç

VPN, uzaktan çalışmanın güvenlik temelidir. Ama "VPN kurduk, güvendeyiz" demek yetmez — yapılandırma şeklini, MFA'sını, AD entegrasyonunu, endpoint güvenliğini, loglamayı doğru yapmak gerekir. Aksi halde VPN bir koruma yanılsamasından ibaret kalır.

Doğru kurulduğunda ise çalışanlarınız nereden bağlanırsa bağlansın güvenli ve verimli çalışabilir.
