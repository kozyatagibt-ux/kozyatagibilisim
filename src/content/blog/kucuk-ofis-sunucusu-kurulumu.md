---
slug: kucuk-ofis-sunucusu-kurulumu
title: "Küçük Ofis Sunucusu Kurulumu: Adım Adım Rehber"
type: cluster
pillar: 4
url: "/blog/kucuk-ofis-sunucusu-kurulumu"
hedef_anahtar_kelime: "küçük ofis sunucusu kurulumu"
meta_description: "Küçük ofis için sunucu kurulumu nasıl yapılır? Donanım seçimi, OS seçimi, AD, dosya paylaşımı, yedekleme. KOBİ'ler için pratik rehber."
kelime_sayisi: "~2100"
pillar_linki: "/kurumsal-network-kurulumu, /yonetilen-it-hizmetleri"
---

"Bize Sunucu Lazım mı?" Sorusu 10-30 kişilik bir ofiste sıkça duyulan bir tartışma: "Bize sunucu lazım mı, yoksa bulutla idare ederiz mi?" Cevap "duruma göre"dir, ama çoğu KOBİ'nin sandığından daha fazla sunucu ihtiyacı vardır.

Hangi durumlarda? Ortak dosya paylaşımı yoğunsa Çalışan sayısı 10'u geçtiyse Merkezi kullanıcı yönetimi gerekiyorsa (Active Directory) İnternet bağlantısı hassassa (sunucular bulutta olursa internet kesilince iş durur) Büyük dosyalarla çalışılıyorsa (mimar, mühendis, video) KVKK gereği veriler yerelde tutulması gerekiyorsa Özel bir uygulama (ERP, muhasebe, üretim takip) çalıştırılıyorsa Bu listede 2-3 madde işaretlendiyse büyük ihtimalle bir sunucu yatırımı doğru karardır. Bu yazıda sıfırdan küçük bir ofis sunucusu kurulumunun adımlarını anlatıyoruz.

### Adım 1

İhtiyaç Analizi Sunucuyu hangi amaçla kullanacağınızı net belirlemek ilk iştir. Tipik kullanımlar: Dosya sunucusu: Ortak dosya paylaşımı, izin yönetimi, sürüm kontrolü Domain controller: Active Directory, kullanıcı yönetimi, grup politikaları Yazıcı sunucusu: Merkezi yazıcı yönetimi Yedekleme sunucusu: Tüm cihazların yedeklerinin toplandığı yer Uygulama sunucusu: Şirket uygulamasının (ERP, CRM, muhasebe) çalıştığı yer Database sunucusu: Veritabanı sistemleri Sanallaştırma host'u: Birden fazla sanal makineyi tek fiziksel sunucuda çalıştırma Çoğu KOBİ tek sunucuda birden fazla rol çalıştırır — bu pratik ve maliyet etkindir, ama tek sunucunun arızası tüm şirketi etkiler. Bu yüzden 30+ kişilik şirketlerde minimum iki sunucu önerilir.

### Adım 2

Donanım Seçimi Sunucu Tipi: Tower vs Rack Ev tipi PC kasasına benzeyen "tower" sunucular küçük ofisler için pratiktir — özel bir oda gerektirmez, sıradan bir prizden çalışır. "Rack" sunucular sistem odası gerektirir. 10-30 kişilik bir ofis için tower sunucu (örneğin Dell PowerEdge T350, HPE ProLiant ML30) yeterlidir.

İşlemci, RAM, Disk Bileşen Minimum Önerilen İşlemci Intel Xeon E (4 çekirdek) Xeon Silver (8+ çekirdek) RAM 16 GB ECC 32-64 GB ECC Disk 2x 1 TB SAS, RAID 1 4x 2 TB SAS RAID 10 + SSD cache Network 1 Gbps NIC 2x 1 Gbps (teaming) Güç Tek PSU Çift PSU (yedekli) Önemli not: Sunucu donanımı normal PC donanımından farklıdır. ECC RAM (hatalı bit'leri düzeltir), enterprise sınıf diskler (24/7 çalışmaya uygun), donanım RAID controller, IPMI/iDRAC (uzaktan yönetim), yedek güç kaynağı gibi özelliklere sahiptir. Maliyeti normal PC'den fazladır ama sunucu güvenilirliği bu farkla gelir.

Ucuz bir gaming PC'yi sunucu olarak kullanmak felaket reçetesidir. UPS (Kesintisiz Güç Kaynağı) Sunucu UPS'siz olmaz. Ani elektrik kesintileri donanımı bozabilir, dosya sistemi bozulabilir, veri kaybına yol açabilir.

Sunucunuzun gücüne uygun (örneğin APC Smart-UPS 1500VA), 15-30 dakika otonomi veren bir UPS şarttır. UPS'in sunucuya USB veya seri kablo ile bağlanması, elektrik kesildiğinde sunucunun düzgün kapanmasını sağlar. Yerleştirme Sunucu serin, havalandırılan, tozsuz, kilitlenebilir bir alanda durmalıdır.

Mutfak yanı, güneş alan pencere kenarı, masaüstüne koyulmuş açık bir köşe sunucu için doğru yer değildir. İdealde ufak bir sistem odası ya da ayrılmış bir dolap.

### Adım 3

İşletim Sistemi Seçimi

## Windows Server

KOBİ'lerin büyük çoğunluğu için doğal seçimdir. Özellikle Active Directory, dosya paylaşımı, çalışanların aşinalığı, Microsoft 365 entegrasyonu açısından öne çıkar. Aktif kullanıcı sayısına göre lisanslama (CAL — Client Access License) gereklidir.

2026 itibariyle güncel sürüm Windows Server 2025'tir. KOBİ için Standard Edition genelde yeterlidir. Linux (Ubuntu Server, Rocky Linux, Debian) Maliyet: lisans bedeli yok.

Performans: çok iyi. Stabilite: efsanevi. Eksiklik: Windows kullanıcılarına aşina değil, AD karşılığı (Samba, FreeIPA) biraz daha ek çaba ister.

Çalışanların bilgisayarları Mac veya Linux'sa, ya da uygulamalarınız Linux uyumluysa harika seçenektir. Geleneksel Windows merkezli bir KOBİ'de daha fazla uzmanlık gerektirir. Karma Yaklaşım Sanallaştırma kullanarak tek fiziksel sunucuda hem Windows Server hem Linux çalıştırabilirsiniz.

Hypervisor (Proxmox, VMware ESXi, Hyper-V) üzerine sanal makineler kurulur. Esneklik için en ideal yaklaşımdır.

### Adım 4

Temel Roller Kurulumu Active Directory Domain Services İlk büyük adım. Domain controller olarak Windows Server kurulur, kullanıcılar oluşturulur, gruplar tanımlanır, çalışanların bilgisayarları domain'e dahil edilir. Detaylı anlatım için [Active Directory KOBİ rehberi] yazımız.

## File Server / Dosya Paylaşımı

Ortak klasörler oluşturulur, NTFS izinleri ayarlanır, kim hangi klasöre erişebilir belirlenir. Volume Shadow Copy (VSS) aktif edilir — bu sayede çalışan yanlışlıkla dosya sildiğinde son birkaç günden geri yüklenebilir.

## Print Server

Yazıcı sürücüleri merkezi olarak yüklenir, çalışanların bilgisayarlarına kolay yazıcı dağıtımı sağlanır. Group Policy Çalışanların bilgisayarlarındaki ayarları merkezi yönetmek için. Şifre politikası, ekran kilidi, USB engelleme, masaüstü duvar kağıdı, yazılım dağıtımı — hepsi GP ile yapılabilir.

### Adım 5

Yedekleme Sunucu kurulumu yedekleme olmadan tamamlanmış sayılmaz. Sunucudaki veriler için 3-2-1 stratejisi uygulanmalıdır. Yedekleme yazılımı seçilir, otomatik günlük yedek alınır, en az bir kopya offsite tutulur.

Detay için [3-2-1 yedekleme kuralı] ve [şirket veri yedekleme rehberi] yazılarımıza bakın.

### Adım 6

Güvenlik Sunucu işletim sistemi güncel tutulmalı (otomatik güncelleme aktif) Sunucuda antivirüs/EDR çalışıyor olmalı Sunucu yönetici şifreleri karmaşık ve uzun Sunucuya doğrudan internetten erişim olmamalı (firewall arkasında) RDP (uzak masaüstü) sadece iç ağdan veya VPN üzerinden açık olmalı Loglama aktif Bilinmeyen yazılım kurulumu yasak

### Adım 7

İzleme Sunucunun durumunu sürekli izleyen bir sistem kurulmalı. CPU, RAM, disk doluluğu, sıcaklık, RAID durumu, yedekleme durumu, servis durumları. Bir şey ters giderse anında uyarı gelmeli (e-posta, SMS).

PRTG, Zabbix, Nagios gibi izleme araçları kullanılır. Yaygın Hatalar Normal PC'yi sunucu yapmak: Donanım sunucu sınıfı olmalı. UPS'siz çalıştırmak: Bir kerelik elektrik kesintisi tüm yatırımı sıfırlayabilir.

Yedeklemeyi sonraya bırakmak: Yedek olmadan kullanıma alınmamalıdır. Belgelendirmemek: Kim ne yaptı, hangi şifre nerede, hangi ayar nasıl — yazılı olmalı. Tek sunucuya tüm yumurtaları koymak: 30+ kişi varsa redundant ikinci sunucu gerekli.

Sunucu Kurulum Hizmeti İhtiyaç analizinden donanım önerisine, kurulumdan yapılandırmaya, yedekleme stratejisinden sürekli yönetime kadar tüm sunucu yatırımınızı tek elden çözüyoruz. KOBİ'ye uygun ölçekli, doğru maliyetli, sürdürülebilir kurulumlar.

## Sonuç

Küçük ofis sunucusu kurulumu, ilk bakışta sadece bir donanım yatırımı gibi görünse de aslında şirketin çalışma biçimini şekillendiren stratejik bir karardır. Doğru donanım, doğru işletim sistemi, doğru roller, sağlam yedekleme ve titiz güvenlik — bunların hepsi bir araya geldiğinde sunucu yıllarca güvenilir bir omurga olur. Yanlış kurulum ise her gün baş ağrısı, beklenmedik kesintiler ve veri kaybı riski demektir.

Bu yüzden ya iyi yapılır ya hiç yapılmaz.
