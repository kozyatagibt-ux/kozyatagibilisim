// Yerel landing page verisi — İstanbul ilçe bazlı SEO sayfaları (Bölüm 1)
// Her sayfa benzersiz içerikle oluşturulmuştur; tüm marka ve ürünler her sayfada yer alır.
export const localLandings = [
    // ── İSTANBUL GENEL ──
    {
        slug: 'istanbul-yonetilen-it-hizmetleri',
        title: 'İstanbul Yönetilen IT Hizmetleri',
        h1: 'İstanbul Genelinde Yönetilen IT Hizmetleri',
        area: 'İstanbul',
        geo: { lat: 41.0082, lng: 28.9784 },
        meta: 'İstanbul genelinde sunucu yönetimi, firewall kurulumu, network altyapısı, veri yedekleme, kurumsal e-posta ve 7/24 IT outsource hizmeti. Quick Tower Ataşehir merkezli.',
        intro: 'İstanbul, 16 milyonu aşkın nüfusu ve yüz binlerce aktif işletmesiyle Türkiye\'nin tartışmasız ticaret başkentidir. Boğazın iki yakasında faaliyet gösteren şirketler, dijital dönüşüm sürecinde güvenilir bir teknoloji ortağına her zamankinden fazla ihtiyaç duyuyor. Quick Tower İçerenköy\'deki merkezimizden koordine ettiğimiz saha ekiplerimiz, Anadolu ve Avrupa yakasındaki tüm ilçelere planlı bakım ve acil müdahale hizmeti sağlıyor. Sunucu odasından son kullanıcı bilgisayarına kadar tüm teknoloji katmanlarını tek sözleşmeyle yönetiyor, aylık sabit ücret modeliyle öngörülemeyen IT harcamalarınızı kontrol altına alıyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve yönetim',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall kurulumu; ESET, Kaspersky, Bitdefender uç nokta güvenliği',
            'Cat6A ve fiber optik yapısal kablolama, Wi-Fi 6 kurumsal kablosuz ağ, VLAN, mesh ve PoE switch altyapısı',
            'Veeam, Acronis ve Nakivo ile 3-2-1 kuralına uygun yedekleme; NAS ve bulut replikasyon',
            'Microsoft 365 ve Google Workspace kurumsal e-posta yönetimi',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli uzaktan erişim (VPN)',
            'Tam kapsamlı IT outsource — Active Directory ve Azure AD ile merkezi kimlik yönetimi',
            '7/24 helpdesk, SIEM entegrasyonu ve merkezi loglama altyapısı',
            'KVKK uyumlu veri saklama, erişim kontrolü ve denetim izi kaydı',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'İstanbul gibi 7/24 yaşayan bir metropolde sunucu kesintisinin maliyeti dakikalarla ölçülür. VMware vSphere platformuyla kurumsal düzeyde yüksek erişilebilirlik (HA) kümeleri kuruyor, vMotion ile sanal makinelerinizi sıfır kesinti ile bakım yapılacak sunucudan taşıyoruz. Bütçe odaklı projeler için Proxmox VE tercih ediyor, lisans maliyeti olmadan KVM sanallaştırma ve LXC konteyner desteği sağlıyoruz. Windows Server ağırlıklı ortamlarda Hyper-V failover cluster yapılandırmasıyla bir düğüm devre dışı kalsa bile iş yüklerinin otomatik aktarılmasını garanti ediyoruz. İstanbul genelinde 200\'den fazla sunucuyu proaktif izleme panelimiz üzerinden 7/24 takip ediyor, CPU, RAM ve disk doluluk eşiklerinde anlık alarm üretiyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'İstanbul\'un yoğun dijital trafiği siber saldırganlar için cazip bir hedef oluşturuyor. Kurumsal ağlarınızı Fortinet FortiGate next-gen firewall ile katmanlı güvenlik mimarisiyle korurken, Sophos XGS serisiyle synchronized security yaklaşımını uç nokta korumasıyla birleştiriyoruz. Bütçe dostu çözüm arayan işletmelere pfSense açık kaynak firewall ile ticari ürünlere denk IDS/IPS ve VPN kapasitesi sunuyoruz. Uç nokta güvenliğinde ESET PROTECT ile merkezi yönetim, Kaspersky Endpoint Security ile gelişmiş tehdit koruması ve Bitdefender GravityZone ile makine öğrenme tabanlı zararlı yazılım tespiti sağlıyoruz. Yıllık penetrasyon testi ve üç aylık güvenlik denetimi ile açıkları kapatıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'İstanbul\'un tarihi hanlarından modern plazalarına kadar her yapı farklı kablolama mühendisliği gerektirir. Cat6A yapısal kablolama ile 10 Gbps destekli geleceğe hazır altyapı kuruyor, bina kampüsleri arasında fiber optik omurga bağlantısı sağlıyoruz. Kablosuz tarafta Wi-Fi 6 (802.11ax) erişim noktalarıyla kalabalık ofislerde bile yüksek kapasite elde ediyoruz. VLAN segmentasyonu ile departman ve misafir ağlarını izole ediyor, mesh topoloji ile büyük alanlarda kesintisiz dolaşım sağlıyoruz. PoE switch altyapısıyla erişim noktaları ve IP telefonlara ayrıca güç kablosu çekme zorunluluğunu ortadan kaldırıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Bir fidye yazılımı, disk arızası ya da basit bir insan hatası — veri kaybının sebebi ne olursa olsun sonucu aynıdır: iş durur. 3-2-1 yedekleme kuralını temel alıyoruz: üç kopya, iki farklı ortam, bir tanesi şehir dışı. Veeam Backup & Replication ile sanal makine düzeyinde artımlı yedek alıyor, SureBackup ile yedeklerin kurtarılabilirliğini otomatik test ediyoruz. Acronis Cyber Protect platformuyla fiziksel ve sanal sunucuları tek panelden yedekliyor, bare-metal restore imkanı sağlıyoruz. Nakivo Backup & Replication ile VMware ve Hyper-V ortamlarında maliyet etkin replikasyon gerçekleştiriyoruz. Yerel NAS cihazına saatlik, buluta günlük yedek göndererek RTO ve RPO hedeflerinizi tutturuyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Kurumsal e-posta, şirketinizin dijital kimliğidir ve güvenliği taviz kabul etmez. Microsoft 365 Business Premium ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor; SPF, DKIM ve DMARC kayıtlarını yapılandırarak e-posta sahteciliğini engelliyoruz. Google Workspace Business Plus tercih eden müşterilerimize Gmail, Drive ve Meet ekosistemini yapılandırıyor, iki platform arasında karşılaştırmalı danışmanlık sunuyoruz. Uzaktan erişimde WireGuard ile düşük gecikmeli modern VPN tünelleri, OpenVPN Access Server ile kullanıcı bazlı erişim kontrolü ve IPsec site-to-site tünelleriyle şubeler arası kalıcı şifreli bağlantı kuruyoruz. Tüm VPN bağlantıları iki faktörlü kimlik doğrulama ile korunur.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Tam zamanlı IT departmanı kurmak küçük ve orta ölçekli işletmeler için ciddi bir maliyet kalemidir. IT outsource modelimizde aylık sabit ücretle sistem yöneticisi, network uzmanı ve helpdesk operatörü hizmeti alırsınız. Active Directory ile şirket içi kimlik yönetimini, Azure AD ile bulut kimlik doğrulamasını merkezi politikalarla yönetiyoruz. Helpdesk portalımız üzerinden açılan çağrılar ortalama 22 dakikada ilk yanıtı alır. KVKK kapsamında veri envanteri çıkarıyor, erişim kontrol politikalarını oluşturuyor ve SIEM altyapısıyla merkezi loglama kurarak denetim izlenebilirliği sağlıyoruz. Yıllık uyum denetim raporunu hazırlayıp Kurul\'a sunulacak belgeleri düzenliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'İstanbul\'un her iki yakasına da aynı gün saha desteği veriyor musunuz?',
                a: 'Anadolu Yakası\'nda aynı gün müdahale standart hizmetimizdir. Avrupa Yakası\'nda planlı randevu ile saha desteği sağlıyoruz; acil durumlarda aynı gün müdahale de mümkündür.',
            },
            {
                q: 'VMware, Proxmox ve Hyper-V arasında nasıl seçim yapmalıyız?',
                a: 'VMware vSphere geniş ekosistemi ve kurumsal desteğiyle büyük yapılar için idealdir. Proxmox VE lisans ücretsiz olup KOBİ\'ler için maliyet avantajı sağlar. Hyper-V ise Windows Server ortamlarına doğal entegre olur. Mevcut altyapınızı değerlendirip en uygun platformu öneriyoruz.',
            },
            {
                q: 'Firewall olarak hangi markayı tercih etmeliyiz?',
                a: 'Fortinet FortiGate yüksek throughput ve SD-WAN avantajıyla çok şubeli yapılara uygundur. Sophos XGS synchronized security ile uç nokta entegrasyonunda öne çıkar. pfSense ise lisans maliyeti olmadan kurumsal düzey güvenlik sunar. Ağ büyüklüğünüze ve bütçenize göre öneriyoruz.',
            },
            {
                q: 'KVKK uyum sürecinde teknik olarak hangi adımları atıyorsunuz?',
                a: 'Veri envanteri çıkarma, Active Directory ve Azure AD üzerinden erişim kontrol politikaları oluşturma, SIEM ile merkezi loglama altyapısı kurma, çalışan farkındalık eğitimi ve yıllık uyum denetim raporu hazırlama adımlarını kapsıyoruz.',
            },
            {
                q: 'Aylık IT outsource ücreti nasıl belirleniyor?',
                a: 'Fiyatlandırma cihaz sayısı, sunucu adedi ve destek seviyesine göre şekillenir. Ücretsiz keşif ziyaretinde mevcut altyapınızı inceleyip size özel teklif hazırlıyoruz. Gizli maliyet yoktur; tüm hizmetler tek faturada birleşir.',
            },
        ],
    },

    // ── ANADOLU YAKASI ──
    {
        slug: 'anadolu-yakasi-kurumsal-bilisim',
        title: 'Anadolu Yakası Kurumsal Bilişim Hizmetleri',
        h1: 'Anadolu Yakası\'nda Kurumsal Bilişim Çözümleri',
        area: 'Anadolu Yakası',
        geo: { lat: 40.9800, lng: 29.0600 },
        meta: 'Anadolu Yakası\'nda kurumsal bilişim: sunucu bakımı, ağ güvenliği, network altyapısı, yedekleme, e-posta yönetimi ve IT dış kaynak hizmetleri. Ataşehir merkezli hızlı destek.',
        intro: 'Anadolu Yakası, E-5 ve TEM otoyolları boyunca sıralanan iş merkezleri ve sanayi bölgeleriyle İstanbul\'un en hareketli ticaret coğrafyasıdır. Kadıköy\'deki butik ajanlardan Tuzla\'daki üretim tesislerine, Ümraniye\'deki lojistik depolardan Beykoz\'daki teknoloji girişimlerine kadar çok çeşitli sektörler bu topraklarda faaliyet gösteriyor. Quick Tower İçerenköy\'deki ofisimiz Anadolu Yakası\'nın coğrafi merkezinde konumlanıyor; E-5 ve TEM erişimiyle saha ekiplerimiz trafiğe takılmadan hızla ulaşır.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V platformlarında sunucu sanallaştırma',
            'Fortinet FortiGate, Sophos XGS, pfSense firewall; ESET, Kaspersky ve Bitdefender endpoint koruması',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 tasarımı, VLAN segmentasyonu, mesh kablosuz ve PoE switch',
            'Veeam, Acronis, Nakivo yedekleme çözümleri; 3-2-1 kuralı ve NAS tabanlı yerel depolama',
            'Microsoft 365 ve Google Workspace kurumsal e-posta kurulumu ve göçü',
            'WireGuard, OpenVPN ve IPsec VPN ile güvenli uzaktan erişim',
            'IT dış kaynak — Active Directory ve Azure AD ile merkezi kullanıcı yönetimi',
            'Helpdesk çağrı sistemi, SIEM entegrasyonu ve merkezi loglama',
            'KVKK veri sınıflandırma, erişim denetimi ve uyum raporlaması',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Anadolu Yakası\'ndaki iş merkezlerinde sunucu odası standartları binadan binaya büyük farklılık gösterir. Fiziksel ortam değerlendirmesini yaptıktan sonra iş yükünüze en uygun sanallaştırma platformunu belirliyoruz. VMware vSphere ile kurumsal HA kümesi kuruyor, DRS ile iş yüklerini sunucular arasında otomatik dengeliyoruz. Proxmox VE tercih eden müşterilerimize ZFS tabanlı veri bütünlüğü ve anlık snapshot imkanı sunuyoruz. Windows ağırlıklı yapılarda Hyper-V ile failover cluster yapılandırarak donanım arızasında bile kesintisiz çalışmayı garantiliyoruz. Haftalık kapasite raporlarıyla büyüme trendlerinizi önceden görüyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Anadolu Yakası\'nda fidye yazılımı ve oltalama saldırıları her ölçekteki işletmeyi hedef alıyor. Fortinet FortiGate ile SD-WAN destekli, birden fazla internet hattını akıllı yönlendiren next-gen güvenlik duvarı kuruyoruz. Sophos XGS serisinin synchronized security özelliğiyle firewall ve uç nokta koruması tek panelde konuşur; bir tehdidi tespit eden bileşen diğerini anında bilgilendirir. Açık kaynak çözüm arayan yapılar için pfSense ile Snort IDS/IPS entegrasyonu sağlıyoruz. Uç noktalarda ESET PROTECT merkezi yönetim, Kaspersky Endpoint Security gelişmiş davranış analizi ve Bitdefender GravityZone makine öğrenme tabanlı tespit sunar.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Anadolu Yakası\'nın geniş ofis parklarında yüzlerce kullanıcının eş zamanlı bağlandığı ağlarda performans darboğazı sık yaşanan bir sorundur. Omurga seviyesinde fiber optik kablolama ile binalar arası yüksek hızlı bağlantı sağlıyor, yatay dağıtımda Cat6A ile 10 Gbps destekli altyapı kuruyoruz. Wi-Fi 6 erişim noktalarıyla OFDMA ve MU-MIMO teknolojileri sayesinde kalabalık ortamlarda bile her cihaza adil bant genişliği dağıtılır. VLAN yapılandırmasıyla departman trafiğini izole ediyor, mesh topolojiyle kat geçişlerinde bağlantı kopmasını önlüyoruz. PoE switch altyapısıyla erişim noktaları ve IP kameralara tek kablo üzerinden hem veri hem güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Anadolu Yakası\'nda beklenmedik bir elektrik kesintisi veya donanım arızası, UPS\'i zayıf olan sunucu odalarında veri kaybına yol açabilir. Bu riskleri 3-2-1 kuralıyla minimize ediyoruz: üç kopya, iki farklı ortam, biri şehir dışı. Veeam Backup ile VMware ve Hyper-V ortamlarında artımlı yedek alıyor, Instant VM Recovery ile dakikalar içinde sanal makineyi yedekten ayağa kaldırabiliyoruz. Acronis Cyber Protect ile fiziksel sunucularda bare-metal restore desteği sağlıyoruz. Nakivo ile maliyet optimize edilmiş replikasyon ve yedekleme politikaları oluşturuyoruz. Yerel NAS cihazına saatlik, buluta günlük yedek göndererek hem hız hem güvenlik dengesini koruyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Anadolu Yakası\'ndaki çalışanlar saha, ev ve ofis arasında sürekli hareket halinde; her noktadan kurumsal verilere güvenli erişim zorunlu. Microsoft 365 ile Exchange Online, Teams, SharePoint ve OneDrive\'ı entegre kurarak üretkenlik paketini tek lisansla sunuyoruz. Google Workspace tercih eden işletmelere Gmail, Drive ve Meet ekosistemini yapılandırıp alan adı doğrulama ve veri göçünü gerçekleştiriyoruz. VPN altyapısında WireGuard ile modern ve düşük gecikmeli tüneller, OpenVPN Access Server ile detaylı kullanıcı bazlı politika yönetimi ve IPsec ile şubeler arası kalıcı site-to-site bağlantı kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Anadolu Yakası\'nda büyüyen bir işletmeyseniz her yeni çalışan ek bir bilgisayar, hesap ve yetki tanımı gerektirir. IT outsource modelimiz bu süreçleri Active Directory group policy\'leri ve Azure AD conditional access ile standartlaştırır: işe giriş ve çıkış BT prosedürleri, envanter takibi, lisans yönetimi tek merkezden yürür. Helpdesk ekibimiz telefon, e-posta ve uzaktan bağlantıyla destek verirken tüm olaylar SIEM platformuna otomatik aktarılır. Merkezi loglama altyapısıyla erişim kayıtlarını saklıyor, KVKK kapsamında kişisel veri işleme envanterini hazırlıyor ve teknik tedbirleri raporluyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Anadolu Yakası\'nda saha müdahalesi için ortalama varış süreniz nedir?',
                a: 'Ofisimiz İçerenköy\'de olduğundan Anadolu Yakası\'nın büyük bölümüne 30-60 dakikada ulaşıyoruz. Kadıköy, Ataşehir ve Maltepe gibi yakın ilçelerde 20 dakikaya kadar düşebilir.',
            },
            {
                q: 'Mevcut IT altyapımızı değiştirmeden hizmetinize geçebilir miyiz?',
                a: 'Evet. Keşif ziyaretinde mevcut donanım, yazılım ve sanallaştırma platformunuzu değerlendiriyoruz. Çalışan sistemleri bozmadan devralır, eksikleri kademeli tamamlarız.',
            },
            {
                q: 'Endpoint güvenliğinde ESET, Kaspersky ve Bitdefender arasında nasıl seçim yapılır?',
                a: 'ESET düşük sistem kaynağı tüketimiyle öne çıkar, Kaspersky gelişmiş tehdit istihbaratı sunar, Bitdefender makine öğrenme tabanlı tespitte güçlüdür. Cihaz sayınıza ve yönetim ihtiyacınıza göre öneriyoruz.',
            },
            {
                q: 'Yedekleme verilerimiz nerede saklanıyor?',
                a: 'Yerel NAS ve Türkiye merkezli bulut veri merkezlerinde tutuyoruz. KVKK gereği kişisel veriler yurt içinde saklanır. 3-2-1 kuralı kapsamında şehir dışı replikasyon da standart hizmetimize dahildir.',
            },
            {
                q: 'Kaç kişilik şirketler IT outsource hizmeti alıyor?',
                a: '10 ile 250 çalışan arasındaki işletmeler en sık tercih eden segmentimiz. Active Directory ve Azure AD üzerinden merkezi yönetim sağladığımız için çalışan sayısı arttıkça verimlilik de artar.',
            },
        ],
    },

    // ── ATAŞEHİR ──
    {
        slug: 'atasehir-it-destegi',
        title: 'Ataşehir IT Destek ve Yönetilen BT Hizmetleri',
        h1: 'Ataşehir\'de Profesyonel IT Destek Hizmetleri',
        area: 'Ataşehir',
        geo: { lat: 40.9923, lng: 29.1244 },
        meta: 'Ataşehir\'de yerinde IT destek: sunucu sanallaştırma, siber güvenlik, ağ altyapısı, yedekleme, kurumsal e-posta ve KVKK uyumlu IT outsource. Quick Tower\'dan dakikalar içinde.',
        intro: 'Ataşehir, İstanbul Finans Merkezi projesiyle birlikte Türkiye\'nin yeni finans üssü olma yolunda hızla ilerliyor. Ataşehir Bulvarı boyunca yükselen iş kuleleri, teknoloji şirketleri ve finans kurumlarına ev sahipliği yapıyor. Quick Tower İçerenköy\'deki ofisimiz bu ekosistemin tam kalbinde yer alıyor — müşterilerimize yürüme mesafesinde, ortalama 15 dakika içinde yerinde müdahale sağlıyoruz. Finans sektörünün sıkı regülasyonlarından startup\'ların çevik altyapı taleplerinde kadar her ihtiyaca yanıt veriyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve HA kümeleri',
            'Fortinet FortiGate, Sophos XGS ve pfSense güvenlik duvarı; ESET, Kaspersky, Bitdefender endpoint güvenliği',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 planlama, VLAN izolasyonu, mesh kablosuz ve PoE switch',
            'Veeam, Acronis ve Nakivo yedekleme; 3-2-1 kuralı ve NAS tabanlı hızlı geri dönüş',
            'Microsoft 365 ve Google Workspace kurumsal e-posta, dosya paylaşımı ve iş birliği',
            'WireGuard, OpenVPN ve IPsec VPN ile şifreli uzaktan erişim altyapısı',
            'IT outsource — Active Directory ve Azure AD ile merkezi kimlik ve cihaz yönetimi',
            'Anlık uzaktan destek, yerinde servis, SIEM entegrasyonu ve merkezi loglama',
            'KVKK veri ihlali müdahale planı, teknik tedbirler ve uyum denetimi',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Ataşehir\'deki iş kulelerinin sunucu odalarında yaz aylarında sıcaklık kritik seviyelere çıkabiliyor; sıcaklık ve nem sensörlerini izleme panelimize entegre ederek eşik aşıldığında anında alarm üretiyoruz. VMware vSphere Enterprise Plus ile vSAN destekli hiperkonverge altyapı kurarak ayrı bir depolama ünitesi ihtiyacını ortadan kaldırıyoruz. Startup\'lar ve KOBİ\'ler için Proxmox VE ile lisans maliyeti sıfır, ZFS snapshot destekli sanallaştırma ortamı sunuyoruz. Windows tabanlı iş uygulamaları yoğun olan finans sektörü müşterilerimize Hyper-V failover cluster ile donanım arızasında otomatik yük devri sağlıyoruz. Quick Tower\'dan yürüme mesafesindeki lokasyonlarda acil donanım değişimi bile aynı saat içinde tamamlanır.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Finans Merkezi\'nin yoğun dijital trafiği Ataşehir\'deki işletmeleri siber saldırganların radarına sokuyor. Fortinet FortiGate ile application control, IPS ve SSL inspection modüllerini aktif ederek şifreli trafik içindeki tehditleri bile tespit ediyoruz. Sophos XGS firewall\'un heartbeat özelliğiyle uç nokta ve ağ güvenliği senkronize çalışır; enfekte cihaz otomatik karantinaya alınır. Maliyet duyarlı projeler için pfSense ile Suricata IDS/IPS entegrasyonu kuruyoruz. Uç noktalarda ESET PROTECT platformu ile merkezi zararlı yazılım yönetimi, Kaspersky Endpoint Security ile exploit önleme ve Bitdefender GravityZone ile sandbox analizi sağlıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Ataşehir\'deki çok katlı ofis binalarında kat bazında tutarlı kablosuz performans sağlamak uzmanlık gerektirir. Profesyonel site survey ile duvar yapısı, metal elemanlar ve kat yüksekliğini analiz edip Wi-Fi 6 erişim noktalarının ideal konumlarını belirliyoruz. Cat6A yapısal kablolama ile her çalışma noktasına gigabit hız garanti ederken, bina kampüsleri arasında fiber optik omurga çekiyoruz. VLAN segmentasyonuyla finans, operasyon ve misafir ağlarını birbirinden izole ediyor, mesh topolojiyle geniş alanlarda kesintisiz dolaşım sağlıyoruz. PoE switch\'ler sayesinde erişim noktalarına ve IP telefonlara ayrıca güç kablosu çekilmesine gerek kalmaz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Ataşehir\'deki finans ve hukuk sektörü müşterilerimiz için veri kaybı sadece operasyonel değil, regülatif bir risk taşır. 3-2-1 kuralını temel alarak yerel NAS üzerinde saatlik artımlı yedek, bulutta günlük replikasyon ve şehir dışı veri merkezinde haftalık tam yedek saklıyoruz. Veeam Backup & Replication ile SureBackup özelliğini kullanarak yedeklerin gerçekten kurtarılabilir olduğunu otomatik test ediyoruz. Acronis Cyber Protect ile bare-metal restore desteği sunarak farklı bir donanıma bile tam sistem kurtarma yapabiliyoruz. Nakivo ile VMware ve Hyper-V ortamlarında uygun maliyetli replikasyon politikaları oluşturuyor, RTO hedefini 1 saatin altına çekiyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Ataşehir\'deki birçok şirket hibrit çalışma modeline geçti; çalışanlar ofis, ev ve saha arasında kesintisiz iletişime ihtiyaç duyuyor. Microsoft 365 E3 paketi ile Exchange Online, Teams, SharePoint ve Intune\'u tek lisansla sunuyor, Intune ile şirket cihazlarını uzaktan yönetip güvenlik politikalarını merkezi uyguluyoruz. Google Workspace Business tercih eden müşterilerimize Gmail, Drive ve Meet kurulumu ile birlikte veri göçü hizmeti veriyoruz. VPN altyapısında WireGuard ile mobil cihazlarda pil dostu ve düşük gecikmeli bağlantı, OpenVPN ile detaylı erişim loglaması ve IPsec ile şubeler arası site-to-site kalıcı tünel kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Ataşehir\'in hızla büyüyen iş ekosisteminde yeni ofis açılışları, şirket birleşmeleri ve departman genişlemeleri sık yaşanır. IT outsource hizmetimiz bu dinamik süreçlerde Active Directory group policy ile standart cihaz konfigürasyonu, Azure AD conditional access ile konum ve cihaz bazlı erişim kontrolü sağlar. Helpdesk ekibimiz 08:00-22:00 arası telefon ve uzaktan bağlantıyla, kritik sistemlerde 7/24 destek verir. Tüm olaylar SIEM platformuna aktarılır, merkezi loglama altyapısıyla erişim kayıtları 2 yıl boyunca saklanır. KVKK kapsamında veri ihlali müdahale planınızı hazırlıyor, 72 saatlik bildirim sürecini yönetiyor ve Kurul\'a sunulacak raporları oluşturuyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Quick Tower\'dan Ataşehir\'in farklı noktalarına kaç dakikada ulaşıyorsunuz?',
                a: 'Ataşehir Bulvarı, Kayışdağı ve Barbaros bölgelerine 10-15 dakika, Finans Merkezi çevresine 5-10 dakika içinde ulaşıyoruz. Acil durumlarda en yakın saha teknisyeni yönlendirilir.',
            },
            {
                q: 'Finans sektörü için özel güvenlik gereksinimleri karşılıyor musunuz?',
                a: 'Evet. BDDK ve SPK düzenlemelerine uygun log saklama, şifreli iletişim ve erişim kontrol politikaları uyguluyoruz. Fortinet FortiGate ve Sophos XGS cihazlarıyla katmanlı güvenlik mimarisi kuruyoruz.',
            },
            {
                q: 'Sunucu odamız yok, tamamen bulut çözüm önerir misiniz?',
                a: 'Kesinlikle. Azure veya yerli bulut sağlayıcılarda VMware veya Hyper-V tabanlı sanal sunucu kuruyoruz. Hibrit model de uygulanabilir — kritik uygulamalar yerelde, yedekler bulutta çalışır.',
            },
            {
                q: 'Veeam, Acronis ve Nakivo arasında hangisini seçmeliyiz?',
                a: 'Veeam kapsamlı VM yedekleme ve anında kurtarma ile öne çıkar, Acronis fiziksel sunucularda bare-metal restore gücüyle ayrılır, Nakivo maliyet etkin çözüm sunar. İhtiyacınıza göre veya kombinasyon halinde öneriyoruz.',
            },
            {
                q: 'IT outsource sözleşme süresi ne kadar?',
                a: 'Minimum 12 ay öneriyoruz ancak 6 aylık başlangıç paketimiz de mevcut. İlk ayda memnun kalmazsanız cayma bedeli olmadan çıkış hakkınız bulunuyor.',
            },
        ],
    },

    // ── KADIKÖY ──
    {
        slug: 'kadikoy-it-destegi',
        title: 'Kadıköy IT Destek ve Bilişim Hizmetleri',
        h1: 'Kadıköy\'de Güvenilir IT Destek Hizmetleri',
        area: 'Kadıköy',
        geo: { lat: 40.9927, lng: 29.0230 },
        meta: 'Kadıköy\'de kurumsal IT destek: sunucu bakımı, firewall, Wi-Fi 6 ağ kurulumu, bulut yedekleme, kurumsal e-posta ve helpdesk. Ataşehir\'den 15 dk mesafede.',
        intro: 'Kadıköy, Marmaray ve metro hatlarının kesiştiği İstanbul\'un en önemli ulaşım düğümlerinden biri olmasının yanı sıra, Bağdat Caddesi\'nden Kozyatağı\'na uzanan canlı ticaret aksıyla binlerce işletmeye ev sahipliği yapıyor. Dijital ajanslar, hukuk büroları, muhasebe ofisleri ve perakende zincirleri bu bölgede yoğunlaşmış durumda. Quick Tower İçerenköy\'den E-5 üzerinden Kadıköy merkeze 15 dakikada ulaşıyoruz. Kadıköy\'ün dinamik iş dünyasına sunucu yönetiminden KVKK uyumuna kadar eksiksiz BT desteği sağlıyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V sanallaştırma platformlarında uzman yönetim',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall çözümleri; ESET, Kaspersky ve Bitdefender uç nokta koruması',
            'Cat6A ve fiber optik altyapı, Wi-Fi 6 erişim noktaları, VLAN izolasyonu, mesh ağ ve PoE switch',
            'Veeam, Acronis ve Nakivo ile 3-2-1 yedekleme stratejisi; NAS ve bulut hibrit depolama',
            'Microsoft 365 ve Google Workspace kurulumu, göçü ve yönetimi',
            'WireGuard, OpenVPN ve IPsec ile düşük gecikmeli güvenli VPN tünelleri',
            'Aylık sabit ücretli IT outsource — Active Directory ve Azure AD entegrasyonu',
            'Çok kanallı helpdesk, SIEM ile tehdit izleme ve merkezi loglama',
            'KVKK aydınlatma metni, açık rıza yönetimi ve teknik tedbirler',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Kadıköy\'deki pek çok işletme hala 5-7 yıllık fiziksel sunucular üzerinde çalışıyor ve bu sunucularda arıza riski her geçen gün yükseliyor. Sanallaştırma projelerimizde önce mevcut iş yüklerini, lisans yapılarını ve performans gereksinimlerini analiz ediyoruz. VMware vSphere ile kurumsal düzey HA ve vMotion özelliklerini sunarken, Proxmox VE ile lisans maliyetini sıfırlayıp KVM ve LXC esnekliği sağlıyoruz. Windows Server ağırlıklı ortamlar için Hyper-V ile native entegrasyon ve failover cluster yapılandırıyoruz. Göç planını hafta sonu uygulayarak Pazartesi sabahı kesintisiz bir başlangıç garanti ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Kadıköy\'ün yoğun ticari ortamında bir müşteri toplantısı sırasında yaşanan güvenlik ihlali itibar kaybına yol açar. Fortinet FortiGate serisiyle web filtreleme, uygulama kontrolü ve IPS modüllerini tek cihazda birleştiriyoruz. Sophos XGS ile deep packet inspection ve synchronized security entegrasyonu sağlıyor, uç noktadaki tehdidin ağa yayılmasını saniyeler içinde önlüyoruz. pfSense açık kaynak firewall ile bütçe dostu ama kurumsal düzey Snort/Suricata IDS/IPS koruması kuruyoruz. Endpoint güvenliğinde ESET ile hafif kaynak tüketimi, Kaspersky ile gelişmiş exploit koruması ve Bitdefender ile yapay zeka destekli zararlı yazılım tespiti sunuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Kadıköy\'ün dar sokaklarındaki tarihi yapılarda kablolama güzergahı bulmak özel mühendislik gerektirir. Bina yapısına uygun kablo kanalları ve patch panel yerleşimi planlayarak Cat6A ile her noktaya gigabit bağlantı ulaştırıyoruz. Binalar arası bağlantıda fiber optik omurga tercih ediyoruz. Wi-Fi 6 (802.11ax) erişim noktalarıyla OFDMA teknolojisi sayesinde kalabalık ofislerde bile yüksek performans elde ediliyor. VLAN yapısıyla departman, misafir ve IoT ağlarını izole ederken, mesh kablosuz mimariyle geniş alanlarda kesintisiz bağlantı sunuyoruz. PoE switch altyapısıyla kablolama karmaşıklığını minimuma indiriyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Kadıköy\'deki bir işletmeniz fidye yazılımına maruz kalırsa ilk soru şudur: en son yedek ne zaman alındı? Bizimle çalışıyorsanız yanıt "15 dakika önce"dir çünkü 3-2-1 kuralını titizlikle uyguluyoruz. Veeam Backup ile sanal makine düzeyinde artımlı yedek alıyor, Instant VM Recovery ile dakikalar içinde ayağa kaldırıyoruz. Acronis Cyber Protect ile fiziksel sunucularda disk imajı yedekliyor, bare-metal restore desteği sağlıyoruz. Nakivo Backup ile VMware ve Hyper-V ortamlarında uygun maliyetli yedekleme politikaları oluşturuyoruz. Yerel NAS üzerinde hızlı geri dönüş, bulutta uzun süreli arşivleme yaparak her senaryoya hazır oluyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Kadıköy\'deki dijital ajanslar ve hukuk büroları yoğun e-posta trafiği yönetiyor; spam filtreleme ve güvenlik hayati önem taşır. Microsoft 365 ile Exchange Online\'ın gelişmiş tehdit korumasını (ATP) aktif ederek oltalama saldırılarını filtreler, zararlı ekleri sandbox\'ta açarız. Google Workspace tercih eden müşterilerimize Gmail\'in güçlü spam altyapısı ve Drive\'ın esnek depolama yapısını kuruyoruz. Her iki platformda da SPF, DKIM ve DMARC yapılandırmasını eksiksiz gerçekleştiriyoruz. Uzaktan erişimde WireGuard ile mobil cihazlarda pil dostu bağlantı, OpenVPN ile detaylı log kaydı ve IPsec ile şubeler arası kalıcı tünel sunuyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Kadıköy\'deki işletmelerin çoğu 15-50 çalışan bandında olup tam zamanlı BT ekibi kurmak yerine dış kaynak modelini tercih ediyor. IT outsource paketlerimizde Active Directory ile şirket içi kimlik yönetimi, Azure AD ile bulut tabanlı koşullu erişim politikalarını tek çatı altında yönetiyoruz. Helpdesk çağrıları telefon, e-posta ve web portal üzerinden açılır; tüm olaylar SIEM platformuna aktarılarak merkezi loglama ile denetim izlenebilirliği sağlanır. KVKK kapsamında aydınlatma metinlerinizi, açık rıza formlarınızı hazırlıyor, veri sorumlusu başvuru sürecinizi oluşturuyor ve yıllık uyum denetimini raporluyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Kadıköy\'deki ofisimize ne kadar sürede geliyorsunuz?',
                a: 'E-5 üzerinden Kadıköy merkeze ortalama 15 dakikada, Bağdat Caddesi ve Kozyatağı bölgesine 10 dakikanın altında ulaşıyoruz.',
            },
            {
                q: 'pfSense neden ticari firewall\'lara alternatif olarak öneriliyor?',
                a: 'pfSense Community Edition açık kaynak ve ücretsizdir; Snort/Suricata IDS/IPS, VPN ve trafik şekillendirme gibi kurumsal özellikler sunar. Bütçe dostu çözüm arayan işletmelere Fortinet ve Sophos ile birlikte karşılaştırmalı değerlendirme yapıyoruz.',
            },
            {
                q: 'Microsoft 365 ile Google Workspace arasında geçiş yapabilir misiniz?',
                a: 'Evet, her iki yöne de tam göç hizmeti veriyoruz. E-postalar, takvim, kişiler ve dosyalar eksiksiz aktarılır. Geçiş genellikle hafta sonu planlanır ve Pazartesi sabahı yeni sistem kullanıma hazır olur.',
            },
            {
                q: 'WireGuard VPN\'in avantajı nedir?',
                a: 'WireGuard modern kriptografi kullanarak OpenVPN ve IPsec\'e kıyasla çok daha düşük gecikme ve yüksek verimlilik sağlar. Mobil cihazlarda pil tüketimi minimumdur. Kurulum ve bakımı da daha basittir.',
            },
            {
                q: 'Hafta sonu ve tatil günlerinde destek var mı?',
                a: 'Kritik sistemler için 7/24 destek sağlıyoruz, hafta sonu ve resmi tatiller dahil. Standart helpdesk haftaiçi 08:00-20:00 arasında aktiftir. Acil durum hattımız her zaman açıktır.',
            },
        ],
    },

    // ── MALTEPE ──
    {
        slug: 'maltepe-it-destegi',
        title: 'Maltepe IT Destek ve Kurumsal Bilişim',
        h1: 'Maltepe\'de Kurumsal IT Destek Çözümleri',
        area: 'Maltepe',
        geo: { lat: 40.9346, lng: 29.1308 },
        meta: 'Maltepe\'de IT destek hizmeti: sunucu yönetimi, güvenlik duvarı, yapısal kablolama, yedekleme, kurumsal e-posta ve IT outsource. E-5 aksında hızlı erişim.',
        intro: 'Maltepe, E-5 karayolunun Anadolu Yakası\'ndaki en uzun kesimlerinden birine sahiptir ve bu aks boyunca Cevizli, Küçükyalı ve Dragos\'ta iş merkezleri, ofis blokları ve ticaret alanları sıralanır. Sanayi kuruluşlarından yazılım firmalarına, lojistik şirketlerinden sağlık merkezlerine kadar farklı sektörlerden işletmeler Maltepe\'de faaliyet gösteriyor. Quick Tower\'dan E-5 üzerinden Maltepe\'ye ulaşım oldukça hızlıdır; saha ekibimiz çoğu lokasyona 15 dakika içinde varır.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V sanallaştırma ile sunucu konsolidasyonu',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall; ESET, Kaspersky, Bitdefender uç nokta güvenliği',
            'Cat6A ve fiber optik yapısal kablolama, Wi-Fi 6 kablosuz ağ, VLAN, mesh topoloji ve PoE switch',
            'Veeam, Acronis, Nakivo yedekleme platformları; 3-2-1 kuralı, NAS ve bulut depolama',
            'Microsoft 365 ve Google Workspace kurumsal e-posta ve iş birliği çözümleri',
            'WireGuard, OpenVPN ve IPsec VPN ile şubeler arası ve uzaktan erişim altyapısı',
            'IT outsource — Active Directory ve Azure AD ile merkezi hesap ve politika yönetimi',
            'Helpdesk çağrı takibi, SLA raporlaması, SIEM ve merkezi loglama',
            'KVKK uyumlu log yönetimi, veri sınıflandırma ve denetim izi kaydı',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Maltepe\'deki bir müşterimizin eski sunucusu Cuma akşamı arızalandığında, Cumartesi sabahı yeni donanıma sanal makine yedeklerinden tüm sistemi restore ettik — bu hız ancak doğru planlanmış bir sanallaştırma altyapısıyla mümkündür. VMware vSphere ile DRS ve HA özellikleriyle iş yüklerini otomatik dengeleyen kurumsal kümeler kurarken, Proxmox VE ile lisans maliyetsiz KVM sanallaştırma ve Ceph depolama entegrasyonu sunuyoruz. Windows Server ortamlarında Hyper-V ile native failover cluster yapılandırmasıyla bir düğüm çökse bile iş sürekliliğini garanti ediyoruz. Kapasite planlaması raporlarıyla büyümenize paralel ölçeklendirme önerisi yapıyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'E-5 aksındaki Maltepe ofislerinde dışa açık servisler ve uzak masaüstü bağlantılarının güvenliği birinci öncelik olmalıdır. Fortinet FortiGate cihazlarla SSL inspection ve IPS modüllerini aktif ederek şifreli trafik içindeki tehditleri tespit ediyoruz. Sophos XGS ile Intercept X EDR entegrasyonu sayesinde uç noktalardaki şüpheli davranışlar anında firewall\'a bildirilir ve enfekte cihaz ağdan izole edilir. pfSense ile maliyet bilincine sahip işletmelere açık kaynak güvenlik platformu kuruyoruz. ESET PROTECT ile merkezi zararlı yazılım yönetimi, Kaspersky ile gelişmiş davranış analizi ve Bitdefender GravityZone ile makine öğrenme tabanlı tespit katmanları oluşturuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Maltepe\'nin E-5 boyunca uzanan iş merkezlerinde çok kiracılı yapılar yaygındır ve diğer kiracıların ağ trafiğinden izolasyon kritik önem taşır. VLAN segmentasyonu ve firewall kurallarıyla her kiracıyı kendi ağ adasında tutuyoruz. Cat6A kablolama ile 10 Gbps destekli geleceğe hazır altyapı kurarken, bina grupları arasında fiber optik omurga bağlantısı sağlıyoruz. Wi-Fi 6 erişim noktalarıyla WPA3 şifreleme standardını aktif ediyor, mesh topolojiyle geniş depo ve ofis alanlarında kesintisiz kapsama elde ediyoruz. PoE switch altyapısıyla erişim noktaları, IP kameralar ve IP telefonlara tek kablo ile güç ve veri iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Maltepe\'de altyapı kaynaklı sorunlar — su baskını, elektrik dalgalanması, klima arızası — sunucu odasını doğrudan tehdit eder. 3-2-1 kuralını uygulayarak üç kopya, iki ortam ve bir şehir dışı yedek prensibini hayata geçiriyoruz. Veeam Backup ile VM düzeyinde artımlı yedek alıyor, Instant VM Recovery ile dakikalar içinde ayağa kaldırıyoruz. Acronis Cyber Protect ile tüm disk imajını buluta yedekliyor, bare-metal restore ile tamamen farklı donanıma bile kurtarma yapabiliyoruz. Nakivo ile VMware ve Hyper-V ortamlarında maliyet optimize edilmiş yedekleme politikaları oluşturuyoruz. Yerel NAS cihazına saatlik yedek göndererek hızlı geri dönüş, buluta günlük replikasyonla uzun süreli arşivleme sağlıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Maltepe\'deki işletmeler için Microsoft 365 Business Standard paketini sıklıkla öneriyoruz: masaüstü Office uygulamaları, 50 GB posta kutusu ve 1 TB OneDrive dahildir. Gelişmiş tehdit koruması (ATP) ile oltalama saldırılarını filtreler, zararlı ekleri sandbox ortamında açarız. Google Workspace tercih eden müşterilerimize Gmail\'in güçlü güvenlik altyapısını ve Drive\'ın esnek paylaşım özelliklerini yapılandırıyoruz. Her iki platformda SPF, DKIM, DMARC kayıtları standart olarak ayarlanır. Şubeleriniz varsa IPsec site-to-site VPN ile kalıcı şifreli bağlantı, çalışanlar için WireGuard ile mobil uyumlu erişim ve OpenVPN ile detaylı kullanıcı bazlı politika yönetimi kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Maltepe\'deki müşterilerimize IT outsource hizmetini tek elden sunuyoruz: donanım tedariki, yazılım lisanslama, kurulum, bakım ve destek bir arada yürür. Active Directory ile şirket içi kullanıcı ve grup yönetimini, Azure AD ile bulut uygulamalarına koşullu erişim politikalarını merkezi olarak kontrol ediyoruz. Helpdesk sistemimizde her çağrı numaralandırılır, SLA\'ya göre takip edilir ve aylık performans raporu sunulur. SIEM entegrasyonuyla güvenlik olayları merkezi panelde izlenir, loglama altyapısıyla erişim kayıtları 2 yıl saklanır. KVKK kapsamında veri sınıflandırma, log yönetimi ve denetim izi kaydı hizmetleri sağlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Maltepe\'ye Quick Tower\'dan ne kadar sürede ulaşıyorsunuz?',
                a: 'E-5 üzerinden Maltepe merkezine 10-15 dakika, Cevizli ve Küçükyalı bölgesine 15-20 dakika içinde ulaşıyoruz. Dragos tarafı da 20 dakika civarındadır.',
            },
            {
                q: 'Sunucu odası için çevresel izleme hizmeti var mı?',
                a: 'Evet. Sıcaklık, nem ve su sensörlerini izleme panelimize entegre ediyoruz. Eşik aşıldığında SMS ve e-posta ile anlık alarm alırsınız. UPS ve klima durumu da uzaktan izlenebilir.',
            },
            {
                q: 'Veeam, Acronis ve Nakivo arasında maliyet karşılaştırması yapabilir misiniz?',
                a: 'Veeam kapsamlı özellikleriyle orta-büyük yapılara uygundur, Acronis fiziksel ve sanal ortamları tek platformda birleştirir, Nakivo daha uygun fiyatlı bir alternatif sunar. Sanal makine sayınıza göre karşılaştırmalı teklif hazırlıyoruz.',
            },
            {
                q: 'IT outsource paketinize donanım tedariki dahil mi?',
                a: 'Temel pakette mevcut donanımınız kullanılır. İsteğe bağlı donanım kiralama veya satın alma hizmeti ekleyebilirsiniz. Kiralama modelinde 3-4 yıllık yenileme döngüsü uygulanır.',
            },
            {
                q: 'KVKK log saklama süresi ne kadar olmalı?',
                a: 'KVKK mevzuatı ve sektörel düzenlemelere göre log saklama süresi değişir; genel uygulama en az 2 yıldır. SIEM ve merkezi loglama altyapımızla bu süreyi karşılıyoruz.',
            },
        ],
    },

    // ── ÜMRANİYE ──
    {
        slug: 'umraniye-it-destegi',
        title: 'Ümraniye IT Destek ve Yönetilen Bilişim',
        h1: 'Ümraniye\'de Yönetilen IT Destek Hizmetleri',
        area: 'Ümraniye',
        geo: { lat: 41.0166, lng: 29.1166 },
        meta: 'Ümraniye\'de yönetilen IT hizmetleri: sunucu sanallaştırma, güvenlik duvarı, fiber ağ kurulumu, hibrit yedekleme, e-posta ve KVKK uyumlu IT outsource.',
        intro: 'Ümraniye, TEM otoyoluna doğrudan erişim avantajıyla lojistik ve ticaret sektörlerinin gözde adresi haline geldi. Çakmak, Şerifali ve Atatürk Mahallesi çevresinde yükselen modern ofis binaları bölgenin hızlı dönüşümünü yansıtıyor. Organize sanayi bölgesi ve teknoloji firmaları bu büyümenin itici gücü. Quick Tower\'dan TEM veya bağlantı yollarıyla Ümraniye\'ye ortalama 20-25 dakikada ulaşıyor, altyapı tasarımından günlük operasyona kadar tüm BT ihtiyaçlarını karşılıyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V platformlarında sanallaştırma ve konteyner yönetimi',
            'Fortinet FortiGate, Sophos XGS, pfSense güvenlik duvarı; ESET, Kaspersky ve Bitdefender endpoint koruması',
            'Cat6A ve fiber optik omurga, Wi-Fi 6, VLAN segmentasyonu, mesh kablosuz ve PoE switch altyapısı',
            'Veeam, Acronis ve Nakivo ile 3-2-1 kuralına uygun hibrit yedekleme; NAS ve coğrafi bulut kopyası',
            'Microsoft 365 ve Google Workspace karşılaştırmalı danışmanlık ve kurulum',
            'WireGuard, OpenVPN ve IPsec VPN ile merkezi uzaktan erişim yönetimi',
            'Yönetilen IT hizmetleri — Active Directory ve Azure AD ile kimlik ve erişim kontrolü',
            'Çok kanallı helpdesk (telefon, e-posta, portal, chat), SIEM entegrasyonu ve loglama',
            'KVKK veri envanteri, anonimleştirme çözümleri ve uyum denetimi',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Ümraniye\'deki işletmeler genellikle hızlı büyüme sürecinde ve mevcut sunucu kapasitesi yetersiz kalarak performans sorunlarına yol açıyor. VMware vSphere ile DRS ve HA özelliklerini kullanarak iş yüklerini otomatik dengeliyor, bir sunucu arızalansa bile sıfır kesinti sağlıyoruz. Proxmox VE tercih eden müşterilerimize lisans maliyeti olmadan KVM sanallaştırma, LXC konteyner ve ZFS snapshot desteği sunuyoruz. Windows Server odaklı yapılar için Hyper-V ile native failover cluster kurarak kaynakları verimli kullanıyoruz. Ceph entegrasyonuyla birden fazla sunucuyu tek bir depolama havuzunda birleştiriyor, ölçeklenebilir bir altyapı inşa ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Ümraniye\'de çoklu şube yapısına sahip lojistik ve üretim firmaları için ağ güvenliği karmaşık ama kritik bir ihtiyaçtır. Fortinet FortiGate SD-WAN çözümüyle birden fazla internet hattını akıllı yönlendirmeyle birleştirip hem hız hem yedeklilik sağlıyoruz. Sophos XGS firewall ile synchronized security yaklaşımını uygulayarak uç nokta ve ağ korumasını tek panelde yönetiyoruz. pfSense ile bütçe dostu bir alternatif olarak IDS/IPS ve VPN kapasitesi sunuyoruz. Uç nokta güvenliğinde ESET PROTECT ile merkezi yönetim, Kaspersky Endpoint Security ile exploit önleme katmanı ve Bitdefender GravityZone ile yapay zeka destekli tehdit algılama sağlıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Ümraniye\'nin büyük ofis parklarında depo, ofis ve toplantı salonu gibi farklı fonksiyonlu alanlar tek çatı altında bulunabiliyor ve her birinin ağ ihtiyacı farklıdır. Depoda dayanıklı endüstriyel switch, ofiste Cat6A ile gigabit masaüstü bağlantısı, toplantı salonunda yüksek kapasiteli Wi-Fi 6 erişim noktaları konumlandırıyoruz. Binalar arası bağlantıyı fiber optik omurga ile sağlarken VLAN ile departman, misafir ve IoT trafiğini birbirinden izole ediyoruz. Mesh topoloji ile geniş alanlarda kesintisiz dolaşım sağlıyor, PoE switch altyapısıyla erişim noktalarına ve IP telefonlara tek kablo üzerinden güç ve veri iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Ümraniye\'deki bir müşterimiz paylaşılan klasördeki kritik dosyaları yanlışlıkla sildiğinde, dosya düzeyinde kurtarma ile 5 dakikada geri getirdik — bu, doğru yapılandırılmış bir yedekleme altyapısının pratik değerini gösterir. 3-2-1 kuralı kapsamında yerel NAS üzerinde saatlik artımlı yedek, coğrafi olarak farklı bir veri merkezine günlük replikasyon yapıyoruz. Veeam ile VM snapshot\'larını düzenli aralıklarla buluta gönderiyor, SureBackup ile kurtarılabilirliği test ediyoruz. Acronis Cyber Protect ile fiziksel sunucularda bare-metal restore, Nakivo ile maliyet optimize edilmiş replikasyon politikaları sağlıyoruz. Yedekleme durumu günlük e-posta raporuyla tarafınıza iletilir.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Ümraniye\'deki işletmelere hem Microsoft 365 hem Google Workspace konusunda karşılaştırmalı danışmanlık sunuyoruz; çalışan profili, mevcut araç seti ve bütçenize göre en uygun platformu birlikte belirliyoruz. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre kurarken, Google Workspace ile Gmail, Drive ve Meet ekosistemini yapılandırıyoruz. Her iki platformda SPF, DKIM ve DMARC kayıtlarını eksiksiz ayarlıyoruz. Uzaktan erişimde WireGuard ile modern ve hızlı bağlantı, OpenVPN Access Server ile kullanıcı bazlı detaylı erişim kontrolü ve IPsec ile şubeler arası site-to-site kalıcı tünel kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Ümraniye\'de tam zamanlı sistem yöneticisi bulmak ve elde tutmak özellikle küçük işletmeler için güçtür. IT outsource modelimizde Active Directory ile şirket içi kullanıcı ve bilgisayar yönetimini, Azure AD ile bulut uygulamalarına koşullu erişim politikalarını tek merkezden kontrol ediyoruz. Helpdesk portalımız telefon, e-posta, web ve canlı chat kanallarını tek noktada toplar; tüm olaylar SIEM platformuna aktarılarak merkezi loglama ile güvenlik izlenebilirliği sağlanır. KVKK kapsamında veri envanterini çıkarıyor, gerektiğinde kişisel veri anonimleştirme araçlarını devreye alıyor ve yıllık uyum denetim raporunu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Ümraniye\'ye hangi güzergahtan geliyorsunuz?',
                a: 'İçerenköy\'den TEM bağlantı yolu veya Alemdağ Caddesi üzerinden ulaşıyoruz. Normal trafik koşullarında 20-25 dakikada sahadayız.',
            },
            {
                q: 'VMware vSphere, Proxmox VE ve Hyper-V arasında bize hangisi uygun?',
                a: 'VMware vSphere geniş ekosistemi ile büyük yapılara idealdir. Proxmox VE lisans ücretsiz olup 50\'den az VM için en maliyet etkin tercihtir. Hyper-V ise Windows Server ortamlarına doğal entegre olur. Mevcut yapınıza göre öneriyoruz.',
            },
            {
                q: 'SD-WAN ile çoklu internet hattı birleştirme nasıl çalışır?',
                a: 'Fortinet FortiGate SD-WAN birden fazla hattı (fiber, xDSL, 4G) akıllıca birleştirerek hem hız hem yedeklilik sağlar. Bir hat kesilse diğeri otomatik devralır. Uygulama bazlı yönlendirmeyle kritik trafiğe öncelik verilir.',
            },
            {
                q: 'KVKK veri envanteri çıkarmak ne kadar sürer?',
                a: 'Şirket büyüklüğüne göre 2-4 hafta sürer. Tüm departmanlarla görüşme yapılır, kişisel veri akış haritası çıkarılır, teknik ve idari tedbirler raporlanır.',
            },
            {
                q: 'Helpdesk desteğini hangi kanallardan alabiliriz?',
                a: 'Telefon, e-posta, web portal ve canlı chat olmak üzere dört kanaldan destek sunuyoruz. Tüm kanallar aynı SIEM entegreli çağrı takip sistemine bağlıdır.',
            },
        ],
    },

    // ── Part 2: Üsküdar, Kartal, Pendik, Tuzla, Çekmeköy, Sancaktepe ──
    // ── ÜSKÜDAR ──
    {
        slug: 'uskudar-it-destegi',
        title: 'Üsküdar IT Destek ve Bilişim Çözümleri',
        h1: 'Üsküdar\'da Kurumsal IT Destek Hizmetleri',
        area: 'Üsküdar',
        geo: { lat: 41.0234, lng: 29.0153 },
        meta: 'Üsküdar\'da kurumsal IT destek: sunucu yönetimi, güvenlik duvarı, ağ altyapısı, yedekleme, e-posta ve IT outsource. Ataşehir merkezinden hızlı ulaşım.',
        intro: 'Üsküdar, tarihi dokusuyla modern iş yaşamını buluşturan İstanbul\'un en köklü ilçelerinden biridir. Boğaz kıyısındaki ofis binaları, Ünalan ve Acıbadem çevresindeki iş merkezleri ile hızla dijitalleşen bir ticaret ağına ev sahipliği yapıyor. Quick Tower İçerenköy ofisimizden Üsküdar\'ın ana iş bölgelerine 25-30 dakikada ulaşıyoruz. Tarihi yapıların modern altyapı gereksinimleriyle harmanlandığı bu ilçede, deneyimli ekibimiz sunucu odasından çalışan masasına kadar tüm BT katmanlarını yönetiyor.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall yapılandırması',
            'Cat6A ve fiber optik kablolama ile yüksek hızlı ağ kurulumu',
            'Veeam, Acronis ve Nakivo ile çok katmanlı veri yedekleme',
            'Microsoft 365 ve Google Workspace kurumsal e-posta yönetimi',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli VPN çözümleri',
            'ESET, Kaspersky ve Bitdefender uç nokta koruma lisanslama',
            'Helpdesk çağrı yönetimi ve 7/24 uzaktan bilgisayar desteği',
            'KVKK uyumlu Active Directory ve Azure AD erişim kontrol politikaları',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Üsküdar\'ın tarihi binalarında sunucu odası kurmak özel mühendislik gerektirir — nem kontrolü, soğutma ve elektrik hatları dikkatle planlanmalıdır. VMware vSphere Enterprise ile sanal makine kümelerini yüksek erişilebilirlik modunda yapılandırıyoruz; bir düğüm arızalandığında iş yükü otomatik olarak sağlam düğüme geçer. Bütçesi daha esnek işletmelere Proxmox VE ile açık kaynak sanallaştırma sunuyoruz — lisans maliyeti sıfıra iner. Windows Server ortamlarında Hyper-V tercih eden müşterilerimize Live Migration ile kesintisiz bakım penceresi sağlıyoruz. Üsküdar genelinde 60\'ın üzerinde sunucuyu proaktif izleme panelimizden anlık takip ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Boğaz kıyısındaki ofislerden sahil restoranlarına kadar Üsküdar\'da her sektörden işletme siber tehditle karşı karşıya. Fortinet FortiGate cihazlarıyla katmanlı güvenlik duvarı kuruyor, IPS ve web filtreleme modüllerini etkinleştiriyoruz. Daha kompakt ofisler için Sophos XGS serisi ile merkezi bulut yönetimli güvenlik sağlıyoruz; pfSense ise bütçe odaklı işletmelere açık kaynak esneklik sunuyor. Uç nokta tarafında ESET Endpoint Security, Kaspersky Endpoint Detection ve Bitdefender GravityZone ile çalışan bilgisayarlarını fidye yazılımına karşı koruyoruz. Üç ayda bir penetrasyon testi ile güvenlik durumunuzu raporluyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Üsküdar\'ın kalın taş duvarlı tarihi binalarında kablosuz sinyal yayılımı ciddi zorluk oluşturur. Profesyonel site survey ile erişim noktası konumlarını belirliyor, Cat6A yapısal kablolama ve fiber optik omurga ile gigabit hızlara ulaştırıyoruz. Wi-Fi 6 erişim noktaları yoğun kullanıcı ortamlarında bile düşük gecikme sunar. VLAN segmentasyonu ile departman trafiğini izole ediyor, mesh topoloji ile kat geçişlerinde kesinti olmuyor. PoE switch altyapısıyla erişim noktalarına ayrı güç hattı çekme zorunluluğunu ortadan kaldırıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Üsküdar\'daki müşterilerimizin çoğu muhasebe ve hukuk sektöründen — veri kaybı bu sektörlerde doğrudan yasal sorumluluk doğurur. 3-2-1 yedekleme kuralını esas alıyoruz: üç kopya, iki farklı ortam, bir tanesi tesis dışı. Veeam Backup ile sanal makine düzeyinde artımlı yedek alırken, Acronis Cyber Protect fiziksel sunucularda tam disk imajı oluşturur. Nakivo Backup & Replication ise multi-tenant yapılarda hızlı kurtarma sağlıyor. Yerel NAS cihazına saatlik, buluta günlük yedek göndererek veri kaybı penceresini minimuma indiriyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Üsküdar\'dan Avrupa yakasına günlük geçiş yapan çalışanlar için uzaktan erişim kritik önem taşır. Microsoft 365 Business Premium ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor; SPF, DKIM ve DMARC kayıtlarıyla e-posta güvenliğini sağlıyoruz. Google Workspace tercih eden işletmelere Gmail ve Drive yapılandırması sunuyoruz. WireGuard ile yüksek performanslı VPN tünelleri kurarken, OpenVPN uyumluluk gerektiren ortamlarda devreye giriyor. IPsec site-to-site bağlantı ile çoklu ofisleri tek ağda birleştiriyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Üsküdar\'da faaliyet gösteren küçük ve orta ölçekli işletmelerin çoğu tam zamanlı IT personeli istihdam etmek yerine dış kaynak modelini tercih ediyor. Active Directory ile kullanıcı hesaplarını merkezi yönetiyor, Azure AD entegrasyonuyla bulut uygulamalarına tek oturum açma (SSO) sağlıyoruz. Helpdesk portalımız üzerinden açılan çağrılar ortalama 20 dakikada ilk yanıtı alır. KVKK kapsamında veri envanteri çıkarıyor, SIEM altyapısıyla güvenlik olaylarını merkezi loglama sistemiyle izliyor ve yıllık uyum denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Üsküdar\'daki ofisimize saha desteği için ne kadar sürede ulaşırsınız?',
                a: 'İçerenköy ofisimizden Üsküdar\'ın Ünalan, Acıbadem ve Altunizade gibi iş bölgelerine 25-30 dakikada ulaşıyoruz. Acil durumlarda uzaktan bağlantıyla ortalama 10 dakikada müdahale ediyoruz.',
            },
            {
                q: 'Tarihi binamızda ağ altyapısı kurulabilir mi?',
                a: 'Evet. Tarihi yapılarda yıkıcı müdahaleden kaçınarak kablo kanalları ve kablosuz çözümler kullanıyoruz. Duvar içi geçiş mümkün olmayan yerlerde dekoratif kablo kanalları ve mesh Wi-Fi ile kesintisiz kapsama sağlıyoruz.',
            },
            {
                q: 'Küçük bir şirketiz, IT outsource bize uygun mu?',
                a: '10 çalışandan itibaren IT outsource ekonomik hale gelir. Aylık sabit ücretle sistem yönetimi, helpdesk ve güvenlik izleme dahil tüm hizmetleri alırsınız. Büyüdükçe paketi genişletmek mümkün.',
            },
            {
                q: 'Hangi yedekleme çözümünü önerirsiniz?',
                a: 'Sanal makine ağırlıklı ortamlar için Veeam, fiziksel sunucu ve iş istasyonları için Acronis, çoklu kiracı yapılar için Nakivo öneriyoruz. İhtiyacınıza göre hibrit yapılandırma da kuruyoruz.',
            },
            {
                q: 'KVKK uyum sürecinde neleri kapsıyorsunuz?',
                a: 'Veri envanteri, erişim kontrol politikaları, loglama altyapısı kurulumu, çalışan farkındalık eğitimi ve yıllık uyum denetim raporu hazırlığını kapsıyoruz. VERBİS kaydı sürecinde de destek veriyoruz.',
            },
        ],
    },

    // ── KARTAL ──
    {
        slug: 'kartal-it-destegi',
        title: 'Kartal IT Destek ve Yönetilen BT Hizmetleri',
        h1: 'Kartal\'da Profesyonel IT Destek Hizmetleri',
        area: 'Kartal',
        geo: { lat: 40.8898, lng: 29.1872 },
        meta: 'Kartal\'da profesyonel IT destek: sunucu bakımı, siber güvenlik, network kurulumu, veri yedekleme, e-posta ve IT dış kaynak. E-5 üzerinde kolay erişim.',
        intro: 'Kartal, E-5 karayolu üzerindeki iş merkezleri ve Dragos tepelerindeki ofis parkları ile Anadolu Yakası\'nın önemli ticaret merkezlerinden biridir. Kartal-Kadıköy metro hattı bölgeye ulaşımı kolaylaştırırken, sahil boyunca dönüşen kentsel yapı modern iş alanları ortaya çıkarmıştır. Quick Tower İçerenköy ofisimizden Kartal\'ın merkezi iş bölgelerine 15-20 dakikada erişiyoruz. E-5 bağlantısı sayesinde saha ekiplerimiz güzergah üzerinde hızla konuşlanarak teknik müdahaleyi aynı gün tamamlıyor.',
        bullets: [
            'VMware vSphere, Hyper-V ve Proxmox VE sunucu sanallaştırma uzmanları',
            'Sophos XGS, FortiGate ve pfSense güvenlik duvarı çözümleri',
            'Fiber optik ve Cat6A yapısal kablolama, Wi-Fi 6 kablosuz ağ',
            'Acronis, Veeam ve Nakivo ile 3-2-1 yedekleme stratejisi',
            'Google Workspace ve Microsoft 365 e-posta kurulumu ve yönetimi',
            'OpenVPN, WireGuard ve IPsec VPN altyapısı kurulumu',
            'Kaspersky, ESET ve Bitdefender endpoint güvenlik yönetimi',
            'Yerinde ve uzaktan helpdesk hizmetiyle hızlı çağrı çözümleme',
            'Active Directory, Azure AD yönetimi ve KVKK uyumlu loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Kartal\'daki E-5 koridorunda yer alan işletmelerin büyük çoğunluğu kendi sunucu odasını işletiyor ve enerji maliyetleri ciddi kalem oluşturuyor. VMware vSphere ile fiziksel sunucu sayınızı konsolide ederek elektrik ve soğutma giderlerini yüzde kırka kadar düşürüyoruz. Açık kaynak sanallaştırma tercih eden müşterilerimize Proxmox VE kurulumu yapıyor, ZFS depolama ile veri bütünlüğünü garanti altına alıyoruz. Hyper-V Replica sayesinde Dragos\'taki ikincil lokasyona gerçek zamanlı çoğaltma kurarak iş sürekliliğinizi koruyoruz. Haftalık sunucu sağlık raporu ve kapasite planlama önerileri standart hizmetimize dahildir.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Kartal\'ın yoğun ticari yapısında perakende, lojistik ve üretim firmaları farklı güvenlik ihtiyaçlarına sahiptir. Sophos XGS serisi firewall ile merkezi bulut yönetimli güvenlik duvarı kuruyor, Synchronized Security özelliğiyle uç nokta ve ağ güvenliğini entegre ediyoruz. Yüksek bant genişliği gerektiren lokasyonlarda Fortinet FortiGate cihazlarıyla hat hızında trafik denetimi sağlıyoruz. Bütçe hassasiyeti olan müşterilerimize pfSense ile kurumsal düzeyde açık kaynak firewall çözümü sunuyoruz. Uç nokta korumasında Kaspersky Endpoint Security, ESET PROTECT ve Bitdefender GravityZone ile merkezi antivirüs yönetimi gerçekleştiriyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Kartal sahilindeki dönüşüm projeleriyle yeni açılan ofislerin ağ altyapısını sıfırdan tasarlıyoruz. Cat6A bakır kablolama ile 10 Gbps\'e kadar destekleyen yapısal kablolama kurarken, binalar arası bağlantıları fiber optik hatlarla sağlıyoruz. Wi-Fi 6 erişim noktaları ile açık ofislerde yüzlerce cihaz aynı anda sorunsuz bağlanır. VLAN yapılandırmasıyla departman trafiğini segmente ediyor, mesh topoloji ile kat arası dolaşımda bağlantı kopmasını önlüyoruz. PoE switch altyapısı sayesinde IP telefon ve kameralara tek kablo üzerinden hem veri hem güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Kartal\'da hizmet verdiğimiz ticaret firmalarının sipariş veritabanları ve müşteri kayıtları kritik iş varlığı niteliğindedir. Acronis Cyber Protect ile fiziksel ve sanal sunucuların tam disk imajını alıyor, ransomware koruması modülüyle yedeklerin şifrelenmesini engelliyoruz. Veeam Backup ile sanal makine anlık görüntülerini 15 dakikalık aralıklarla buluta gönderiyor, Nakivo ile çoklu lokasyon replikasyonu kuruyoruz. 3-2-1 kuralı çerçevesinde yerel NAS cihazına, ikincil sunucuya ve tesis dışı bulut depolamaya yedek alarak veri kaybı riskini ortadan kaldırıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Kartal\'daki lojistik firmalarının saha çalışanları gün boyu hareket halinde olduğundan mobil uyumlu e-posta ve uzaktan erişim olmazsa olmazdır. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor; DLP politikalarıyla hassas verilerin e-posta ile sızmasını önlüyoruz. Google Workspace tercih eden ekiplere Gmail, Calendar ve Drive yapılandırması sağlıyoruz. OpenVPN ile platformlar arası uyumlu uzaktan erişim tüneli kurarken, WireGuard ile düşük gecikme isteyenlere modern VPN çözümü sunuyoruz. IPsec tunnel ile şubeler arası kalıcı bağlantı kurarak merkez-şube veri akışını şifreli kanaldan geçiriyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Kartal\'daki orta ölçekli işletmelerin çoğu büyüme sürecinde IT yatırımlarını kontrol altında tutmak istiyor. IT outsource modelimizle aylık sabit bütçeyle tam zamanlı sistem yöneticisi, ağ uzmanı ve helpdesk operatörü hizmeti sunuyoruz. Active Directory üzerinden kullanıcı ve grup politikalarını yönetiyor, Azure AD ile bulut kimlik doğrulamayı entegre ediyoruz. Helpdesk portalımızdan açılan çağrılar ortalama 18 dakikada ilk yanıtı alır. KVKK uyumu kapsamında SIEM çözümleriyle güvenlik olaylarını merkezi loglama platformunda topluyoruz ve yıllık uyum denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Kartal\'daki ofisimize ulaşım süreniz ne kadar?',
                a: 'İçerenköy\'den E-5 üzerinden Kartal merkeze ortalama 15-20 dakikada ulaşıyoruz. Dragos ve sahil bölgesine de aynı güzergah üzerinden hızla erişim sağlıyoruz.',
            },
            {
                q: 'E-5 üzerindeki ofisimizde fiber altyapı kurabilir misiniz?',
                a: 'Evet. Bina içi fiber optik kablolama ve ISP bağlantı koordinasyonunu birlikte yürütüyoruz. Mevcut bakır altyapıyı fiber\'e dönüştürme projeleri genellikle 1-2 hafta içinde tamamlanır.',
            },
            {
                q: 'Proxmox mu VMware mı tercih etmeliyiz?',
                a: 'Proxmox lisans maliyeti olmadan kurumsal sanallaştırma sunar, küçük-orta yapılar için idealdir. VMware ise büyük ölçekli, yüksek erişilebilirlik gerektiren ortamlarda endüstri standardıdır. İhtiyacınıza göre öneriyoruz.',
            },
            {
                q: 'Mevcut firewall cihazımızı değiştirmeden destek verebilir misiniz?',
                a: 'Evet. Sophos, FortiGate ve pfSense başta olmak üzere pek çok marka ve modelde deneyimli ekibimizle mevcut cihazınızın kural setini gözden geçirir ve optimize ederiz.',
            },
            {
                q: 'Helpdesk desteği hangi saatlerde aktif?',
                a: 'Standart paketimizde 08:00-20:00 arası telefon ve uzaktan destek sunuyoruz. Premium paketlerde 7/24 helpdesk ve kritik sistemler için anlık müdahale garantisi mevcuttur.',
            },
        ],
    },

    // ── PENDİK ──
    {
        slug: 'pendik-it-destegi',
        title: 'Pendik IT Destek ve Kurumsal Bilişim',
        h1: 'Pendik\'te Kurumsal IT Destek Hizmetleri',
        area: 'Pendik',
        geo: { lat: 40.8778, lng: 29.2333 },
        meta: 'Pendik\'te kurumsal IT destek: sunucu sanallaştırma, güvenlik, ağ kurulumu, yedekleme, e-posta yönetimi ve IT outsource. Sabiha Gökçen çevresinde hızlı hizmet.',
        intro: 'Pendik, Sabiha Gökçen Havalimanı\'nın kapısında konumlanan stratejik bir ilçedir. Havalimanı çevresindeki serbest bölgeler, lojistik merkezleri ve iş parkları bölgeyi İstanbul\'un en hareketli ticaret alanlarından biri haline getirmiştir. Kurtköy ve Yenişehir mahallelerindeki modern ofis binaları sürekli büyüyen bir işletme ekosistemi barındırıyor. Quick Tower İçerenköy\'den Pendik\'in iş bölgelerine E-5 ve TEM üzerinden ortalama 20-25 dakikada ulaşıyoruz. Havalimanı lojistiğinden sanayi üretimine kadar geniş sektör yelpazesine BT desteği sunuyoruz.',
        bullets: [
            'Proxmox VE, VMware vSphere ve Hyper-V sunucu sanallaştırma hizmetleri',
            'pfSense, Fortinet FortiGate ve Sophos XGS güvenlik duvarı kurulumu',
            'Wi-Fi 6, VLAN, mesh ve PoE switch ile kurumsal ağ tasarımı',
            'Nakivo, Veeam ve Acronis ile kapsamlı yedekleme ve kurtarma',
            'Microsoft 365 ve Google Workspace e-posta ve iş birliği araçları',
            'IPsec, WireGuard ve OpenVPN ile güvenli uzaktan erişim',
            'Bitdefender, ESET ve Kaspersky endpoint koruma çözümleri',
            'Yerinde saha desteği ve uzaktan helpdesk çağrı yönetimi',
            'KVKK uyumlu SIEM, loglama ve Active Directory erişim denetimi',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Pendik\'teki lojistik firmaları ve üretim tesisleri yüksek veri işleme kapasitesine sahip sunuculara ihtiyaç duyar. Proxmox VE ile Ceph depolama entegrasyonu kurarak dağıtık yapılarda yüksek performanslı sanallaştırma sağlıyoruz. Havalimanı çevresindeki 7/24 operasyon yürüten işletmelere VMware vSphere ile sıfır kesinti hedefli altyapı sunuyoruz — vMotion ile bakım sırasında bile iş yükleri çalışmaya devam eder. Windows tabanlı uygulama sunucularında Hyper-V failover cluster yapısıyla anlık yük devretme kuruyoruz. Pendik genelinde yönettiğimiz sunucu sayısı her çeyrekte artıyor.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Serbest bölge ve lojistik merkezlerinde dış dünyaya açık ağ bağlantıları siber saldırı yüzeyini genişletir. pfSense ile maliyet etkin ancak kurumsal düzeyde güvenlik duvarı kuruyor, çoklu WAN desteğiyle hat yedekliliği sağlıyoruz. Büyük ölçekli operasyonlarda Fortinet FortiGate ile hat hızında derin paket denetimi yapıyoruz. Sophos XGS Synchronized Security ile ağ ve uç nokta güvenliğini tek platformda birleştiriyoruz. Çalışan cihazlarını Bitdefender GravityZone, ESET PROTECT Platform ve Kaspersky Endpoint Detection ile merkezi olarak yönetip sıfır gün tehditlerine karşı koruyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Pendik\'teki geniş depo alanları ve çok katlı ofisler farklı ağ topolojileri gerektirir. Depo ve üretim tesislerinde endüstriyel ortama dayanıklı Cat6A kablolama ile güvenilir bağlantı kurarken, uzun mesafe bağlantılarında fiber optik altyapı tercih ediyoruz. Wi-Fi 6 erişim noktaları ile yüksek tavanlı depo alanlarında bile stabil kapsama sağlıyoruz. VLAN ile üretim ağı, ofis ağı ve misafir ağını birbirinden izole ederek güvenliği artırıyoruz. Mesh kablosuz mimari ile geniş alanlarda dolaşırken bağlantı kesintisi yaşanmaz, PoE switch altyapısıyla kamera ve erişim noktalarına tek kablo üzerinden güç veriyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Havalimanı lojistiğinde bir dakikalık veri kaybı bile sevkiyat zincirini aksatabilir. Nakivo Backup & Replication ile sanal makine yedeklerini anlık görüntü tabanlı olarak alıyor, farklı bir siteye hızlı kurtarma için replikasyon kuruyoruz. Veeam SureBackup ile yedeklerin kurtarılabilirliğini otomatik test ediyor, sorunları proaktif olarak tespit ediyoruz. Acronis ile fiziksel iş istasyonlarının tam disk imajını buluta göndererek çalışan kaybı senaryosuna dakikalar içinde yanıt veriyoruz. 3-2-1 kuralı kapsamında yerel NAS, ikincil sunucu ve bulut depolama katmanlarını birlikte yapılandırıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Pendik\'teki firmalar genellikle birden fazla lokasyonda faaliyet gösterir — havalimanı yakını, Kurtköy ofisi ve şehir içi şube. Microsoft 365 ile Exchange Online üzerinden tüm lokasyonlarda tutarlı e-posta deneyimi sunuyor, Teams ile anlık iletişim ve dosya paylaşımı kuruyoruz. Google Workspace kullanan müşterilerimize alan adı doğrulaması ve DNS yapılandırması dahil tam kurulum sağlıyoruz. IPsec site-to-site VPN ile lokasyonlar arası kalıcı şifreli bağlantı oluşturuyoruz. Saha çalışanları WireGuard ile mobil cihazlardan güvenle bağlanırken, eski sistemlerle uyumluluk gerektiren ortamlarda OpenVPN tercih ediyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Pendik\'teki üretim ve lojistik firmalarında IT personel devir hızı yüksektir; bu da süreklilik riskine yol açar. IT outsource modelimiz bu riski ortadan kaldırır — kurumsal hafıza bizde kalır, personel değişse bile hizmet kesintisiz devam eder. Active Directory ile kullanıcı yaşam döngüsünü yönetiyor, Azure AD Conditional Access ile konum ve cihaz bazlı erişim kontrolü uyguluyoruz. Helpdesk ekibimiz çağrıları öncelik sırasına göre yönlendirir; kritik üretim sistemleri her zaman önceliklidir. KVKK kapsamında SIEM entegrasyonuyla güvenlik olaylarını merkezi loglama sisteminde kaydediyor ve üç ayda bir uyum değerlendirme raporu sunuyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Pendik ve Kurtköy bölgesine saha desteği sağlıyor musunuz?',
                a: 'Evet. İçerenköy ofisimizden Pendik merkez ve Kurtköy\'e E-5 veya TEM üzerinden 20-25 dakikada ulaşıyoruz. Sabiha Gökçen çevresi düzenli servis güzergahımızdadır.',
            },
            {
                q: 'Depo alanlarımızda kablosuz ağ kurulabilir mi?',
                a: 'Evet. Yüksek tavanlı depo ve üretim alanlarında endüstriyel erişim noktaları ile Wi-Fi 6 kapsama sağlıyoruz. Metal raf yapılarına rağmen uygun konumlandırmayla stabil bağlantı elde ediliyor.',
            },
            {
                q: 'Birden fazla şubemizi tek ağda birleştirebilir misiniz?',
                a: 'Kesinlikle. IPsec site-to-site VPN ile şubelerinizi merkez ofise güvenli tünelle bağlıyoruz. Tüm lokasyonlar aynı dosya sunucusuna, yazıcıya ve uygulamaya erişebilir.',
            },
            {
                q: 'Serbest bölgedeki firmamız için özel güvenlik önlemleri var mı?',
                a: 'Serbest bölge firmaları için katmanlı firewall, IPS ve segmentasyon uyguluyor, dış bağlantıları izole ediyoruz. Gümrük yazılımlarına erişim VPN üzerinden kontrollü şekilde sağlanır.',
            },
            {
                q: 'Yedekleme verilerimiz nerede tutuluyor?',
                a: 'Yerel NAS ve Türkiye merkezli bulut veri merkezlerinde saklıyoruz. KVKK gereği kişisel veriler yurt içinde tutulur. Felaket kurtarma senaryosuna göre ikincil site replikasyonu da eklenebilir.',
            },
        ],
    },

    // ── TUZLA ──
    {
        slug: 'tuzla-it-destegi',
        title: 'Tuzla IT Destek ve Bilişim Hizmetleri',
        h1: 'Tuzla\'da Güvenilir IT Destek Hizmetleri',
        area: 'Tuzla',
        geo: { lat: 40.8195, lng: 29.2939 },
        meta: 'Tuzla\'da IT destek hizmeti: sunucu yönetimi, firewall, endüstriyel ağ kurulumu, yedekleme, e-posta ve IT outsource. Organize sanayi bölgesine yakın.',
        intro: 'Tuzla, organize sanayi bölgeleri, tersaneler ve üretim tesisleriyle İstanbul\'un en yoğun endüstriyel ilçesidir. Kimyadan otomotive, gıdadan savunma sanayine kadar geniş bir üretim yelpazesi bu bölgede faaliyet gösteriyor. Quick Tower İçerenköy ofisimizden Tuzla\'ya E-5 güzergahıyla ortalama 30-35 dakikada ulaşıyoruz; düzenli servis rotamız sayesinde bölgedeki müşterilerimize planlı ziyaretler gerçekleştiriyoruz. Endüstriyel ortamların zorlu koşullarına uygun BT altyapı çözümleri sunuyoruz.',
        bullets: [
            'Hyper-V, VMware vSphere ve Proxmox VE ile endüstriyel sunucu sanallaştırma',
            'Fortinet FortiGate, pfSense ve Sophos XGS ile endüstriyel ağ güvenliği',
            'Cat6A, fiber optik kablolama ve Wi-Fi 6 ile fabrika ağ altyapısı',
            'Veeam, Nakivo ve Acronis ile endüstriyel veri yedekleme ve NAS çözümleri',
            'Microsoft 365 ve Google Workspace kurumsal iletişim altyapısı',
            'WireGuard, IPsec ve OpenVPN ile tesis arası güvenli bağlantı',
            'ESET, Bitdefender ve Kaspersky ile üretim ortamı endpoint koruması',
            'Saha mühendisi desteği ve endüstriyel helpdesk hizmeti',
            'KVKK ve sektörel uyum — Active Directory, Azure AD, SIEM ve loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Tuzla\'daki üretim tesislerinde ERP, MES ve kalite kontrol yazılımları kesintisiz çalışmalıdır — bir dakikalık durma bile üretim hattını etkiler. Hyper-V failover cluster ile aktif-pasif sunucu yapısı kurarak anlık yük devretme sağlıyoruz. Büyük ölçekli tesislerde VMware vSphere DRS (Distributed Resource Scheduler) ile iş yüklerini otomatik dengeliyor, kaynak israfını önlüyoruz. Maliyet odaklı KOBİ\'ler için Proxmox VE ile lisans ücreti ödemeden kurumsal sanallaştırma sunuyoruz. Tesis içi sunucu odalarında toz ve sıcaklık yönetimine özel dikkat göstererek donanım ömrünü uzatıyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Organize sanayi bölgesindeki fabrikaların SCADA ve IoT cihazları ağa bağlıyken güvenlik açıkları büyük risk oluşturur. Fortinet FortiGate ile OT (operasyonel teknoloji) ve IT ağlarını segmente ediyor, endüstriyel protokol denetimi yapıyoruz. pfSense ile çoklu WAN bağlantısı ve hat yedekliliği kurarken maliyet avantajı sağlıyoruz. Sophos XGS serisinin sandboxing özelliğiyle şüpheli dosyaları izole ortamda çalıştırıp zararlı aktiviteyi tespit ediyoruz. Uç nokta korumasında ESET Endpoint Security ile üretim bilgisayarlarını, Bitdefender GravityZone ile ofis cihazlarını, Kaspersky Endpoint Detection ile yönetici iş istasyonlarını merkezi konsoldan yönetiyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Tuzla\'daki fabrika ve depolarda elektromanyetik parazit, toz ve titreşim ağ bileşenlerini olumsuz etkiler. Endüstriyel ortama uygun Cat6A korumalı kablolama ile güvenilir veri iletimi sağlarken, tesisler arası uzun mesafe bağlantılarda fiber optik altyapı kuruyoruz. Wi-Fi 6 erişim noktalarını endüstriyel muhafazalar içinde konumlandırarak zorlu koşullarda bile kapsama sunuyoruz. VLAN ile üretim ağı, ofis ağı ve SCADA ağını kesin sınırlarla ayırıyoruz. Mesh kablosuz topoloji geniş tesis alanlarında kesintisiz dolaşım sağlarken, PoE switch altyapısıyla IP kamera ve erişim noktalarını tek kablo üzerinden besliyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Tuzla\'daki üretim firmalarının kalite kontrol kayıtları, üretim logları ve müşteri siparişleri yasal olarak yıllarca saklanmalıdır. Veeam Backup ile sanal makinelerin artımlı yedeklerini her saat alıyor, SureBackup ile kurtarılabilirlik testini otomatik çalıştırıyoruz. Nakivo ile çoklu tesis arasında yedek replikasyonu kurarak bir tesisteki felaket senaryosunda diğerinden kurtarma yapabiliyoruz. Acronis Cyber Protect ile fiziksel iş istasyonlarının disk imajını buluta göndererek donanım arızasında dakikalar içinde yeni cihazda geri yüklüyoruz. 3-2-1 kuralı doğrultusunda yerel NAS, tesis dışı sunucu ve bulut katmanlarını birlikte kullanıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Tuzla\'daki tersane ve sanayi firmalarının sahada, ofiste ve uzak lokasyonlardaki ekipleri arasında koordinasyon kritik öneme sahiptir. Microsoft 365 ile Exchange Online e-posta, Teams ile anlık iletişim ve SharePoint ile doküman yönetimini entegre kuruyoruz. Google Workspace kullanan işletmelere alan adı doğrulaması dahil kurulum ve eğitim hizmeti veriyoruz. WireGuard protokolüyle yüksek performanslı VPN tünelleri kurarak saha mühendislerinin merkeze güvenle bağlanmasını sağlıyoruz. IPsec ile tesisler arası kalıcı site-to-site bağlantı kurarken, OpenVPN ile farklı platform ve işletim sistemlerinden erişim uyumluluğu sunuyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Tuzla OSB\'deki firmalar genellikle üretim odaklıdır ve IT departmanı kurmak yerine dış kaynak tercih eder. IT outsource hizmetimizle aylık sabit ücret karşılığında tam kapsamlı BT yönetimi sunuyor; envanter, lisans ve kullanıcı hesap yönetimini üstleniyoruz. Active Directory ile merkezi kimlik yönetimi kuruyor, Azure AD ile bulut uygulamalarına güvenli erişim sağlıyoruz. Helpdesk ekibimiz üretim ortamına özel önceliklendirme ile çağrıları yönetir — hat duruşuna neden olacak sorunlar anında eskalasyon alır. KVKK ve sektörel regülasyonlara uyum için SIEM altyapısıyla güvenlik olaylarını merkezi loglama sisteminde topluyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Tuzla OSB\'deki tesisimize düzenli servis sağlıyor musunuz?',
                a: 'Evet. Tuzla düzenli servis güzergahımızdadır. Haftalık planlı ziyaretlerle bakım yapıyor, acil durumlarda da E-5 üzerinden 30-35 dakikada ulaşıyoruz.',
            },
            {
                q: 'Fabrikamızdaki SCADA ağını koruyabilir misiniz?',
                a: 'Kesinlikle. SCADA ve OT ağlarını IT ağından segmente ediyor, endüstriyel firewall kurallarıyla izole erişim sağlıyoruz. IDS/IPS ile anormal trafik tespit edilerek alarm üretilir.',
            },
            {
                q: 'Endüstriyel ortamda Wi-Fi performansı nasıl sağlanıyor?',
                a: 'Endüstriyel muhafazalı erişim noktaları, yönlü antenler ve profesyonel site survey ile metalik ortamlarda bile güvenilir kablosuz kapsama sağlıyoruz. Frekans planlaması paraziti minimize eder.',
            },
            {
                q: 'Üretim verilerimizi ne kadar sıklıkla yedekliyorsunuz?',
                a: 'Kritik üretim verileri için saatlik artımlı yedekleme, diğer sistemler için günlük tam yedekleme standartımızdır. İhtiyacınıza göre 15 dakikalık aralıklara kadar sıklaştırabiliyoruz.',
            },
            {
                q: 'IT outsource ile kendi IT ekibimiz arasındaki farklar nelerdir?',
                a: 'IT outsource ile tek kişiye bağımlılık riskini ortadan kaldırır, çoklu uzmanlık alanına erişirsiniz. Aylık sabit maliyet sayesinde bütçe planlaması kolaylaşır ve tatil-hastalık gibi kesintiler olmaz.',
            },
        ],
    },

    // ── ÇEKMEKÖY ──
    {
        slug: 'cekmekoy-it-destegi',
        title: 'Çekmeköy IT Destek ve Yönetilen Bilişim',
        h1: 'Çekmeköy\'de Yönetilen IT Destek Hizmetleri',
        area: 'Çekmeköy',
        geo: { lat: 41.0400, lng: 29.1800 },
        meta: 'Çekmeköy\'de yönetilen IT hizmetleri: sunucu bakımı, güvenlik, network altyapısı, yedekleme, e-posta ve KVKK uyumlu IT outsource.',
        intro: 'Çekmeköy, Şile yolu koridoru boyunca hızla büyüyen bir ilçe olarak İstanbul\'un yeni iş merkezlerinden birine dönüşüyor. Merkez Mahallesi ve Alemdar çevresindeki ticari alanlar, yeni açılan ofis binaları ve AVM\'ler bölgenin ticari potansiyelini gün geçtikçe artırıyor. Quick Tower İçerenköy ofisimizden Çekmeköy\'ün iş bölgelerine ortalama 25 dakikada ulaşıyoruz. Büyüme sürecindeki işletmelere ölçeklenebilir IT altyapısı kurarak teknolojinin ayak bağı değil rekabet avantajı olmasını sağlıyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V sanallaştırma çözümleri',
            'Sophos XGS, pfSense ve Fortinet FortiGate firewall hizmetleri',
            'Fiber optik, Cat6A kablolama ve Wi-Fi 6 kurumsal kablosuz ağ',
            'Acronis, Nakivo ve Veeam ile 3-2-1 kuralına uygun yedekleme',
            'Google Workspace ve Microsoft 365 kurumsal e-posta çözümleri',
            'OpenVPN, IPsec ve WireGuard güvenli uzaktan erişim',
            'ESET, Kaspersky ve Bitdefender uç nokta güvenlik yönetimi',
            'Uzaktan ve yerinde helpdesk — hızlı çağrı çözümleme',
            'Azure AD, Active Directory yönetimi ve KVKK uyumlu SIEM loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Çekmeköy\'deki yeni açılan iş merkezlerinde sunucu altyapısını sıfırdan kurma fırsatı, doğru teknolojiyi en baştan seçme avantajı sunar. VMware vSphere ile büyük ölçekli sanallaştırma ortamları kurarken, HA (High Availability) cluster yapısıyla donanım arızasında bile hizmet sürekliliği garanti altında olur. Başlangıç aşamasındaki KOBİ\'ler için Proxmox VE ideal bir giriş noktasıdır — açık kaynak, topluluk destekli ve kurumsal özellikler sunar. Windows ekosistemiyle yoğun çalışan işletmelere Hyper-V ile entegre sanallaştırma sağlıyoruz. Çekmeköy\'deki müşterilerimize aylık kapasite raporları göndererek büyüme öncesi darboğazları önceden tespit ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Çekmeköy\'de yeni kurulan işletmeler sıklıkla güvenlik altyapısını erteliyor — bu da saldırganlar için kolay hedef demek. Sophos XGS firewall ile merkezi bulut yönetimli güvenlik kuruyor, XDR (Extended Detection and Response) ile tehditleri uç noktadan ağa kadar izliyoruz. Bütçe dostu alternatif arayan müşterilerimize pfSense ile kurumsal özellikli açık kaynak güvenlik duvarı sunuyoruz. Yoğun trafik ve çoklu şube yapılarında Fortinet FortiGate SD-WAN ile hem güvenlik hem hat optimizasyonu tek cihazda birleşir. Uç noktalarda ESET Endpoint Protection, Kaspersky Endpoint Security ve Bitdefender GravityZone ile çalışan cihazlarını merkezi konsoldan yönetiyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Çekmeköy\'ün yeni inşa edilen ofis binalarında altyapıyı temelden planlama şansı vardır. Fiber optik omurga hatları ile bina içi yüksek hızlı bağlantı kuruyor, her kata Cat6A yapısal kablolama çekiyoruz. Wi-Fi 6 erişim noktaları ile yoğun kullanıcı ortamlarında düşük gecikmeli kablosuz bağlantı sağlıyoruz. VLAN segmentasyonu ile yönetim, operasyon ve misafir trafiğini ayrı ağlarda tutarak güvenlik ve performans dengesini kuruyoruz. Mesh mimari ile büyük açık ofislerde kesintisiz dolaşım mümkün olurken, PoE switch altyapısı erişim noktası ve IP telefonlara tek kablo üzerinden güç ve veri iletir.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Çekmeköy\'deki büyüme aşamasındaki firmalar genellikle yedeklemeyi "sonra yaparız" diye erteler — biz bu hatayı önlüyoruz. Acronis Cyber Protect ile hem sunucu hem iş istasyonu düzeyinde yedekleme kurarak fidye yazılımına karşı koruma modülünü aktif ediyoruz. Nakivo Backup & Replication ile sanal makine anlık görüntülerini farklı bir lokasyona replike ediyoruz — ana site kullanılamaz hale gelse bile dakikalar içinde kurtarma mümkün. Veeam ile VM düzeyinde granüler kurtarma yaparak tek bir dosyayı bile yedekten çıkarabiliyoruz. 3-2-1 kuralı kapsamında yerel NAS ve bulut depolamayı birlikte yapılandırıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Çekmeköy\'den şehir merkezine uzun mesafe nedeniyle pek çok çalışan hibrit ya da uzaktan çalışma modelini benimsiyor. Google Workspace ile Gmail, Drive ve Meet\'i kurarak ekiplerin lokasyondan bağımsız iş birliği yapmasını sağlıyoruz. Daha kapsamlı yönetim araçları gereken işletmelere Microsoft 365 E3 ile Exchange Online, Teams, SharePoint ve Intune kurulumu yapıyoruz. OpenVPN ile geniş platform desteğine sahip VPN tünelleri kurarken, IPsec site-to-site bağlantıyla şubeler arası kalıcı güvenli hat oluşturuyoruz. WireGuard ile modern, hızlı ve hafif VPN deneyimi sunarak mobil çalışanların performansını artırıyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Çekmeköy\'de hızla büyüyen işletmeler için her yeni çalışan ek BT iş yükü demektir — hesap açma, cihaz kurulumu, yetkilendirme. IT outsource modelimiz bu süreçleri standart prosedürlerle yönetir. Azure AD ile bulut kimlik yönetimi ve koşullu erişim politikaları uyguluyoruz; Active Directory ile şirket içi kaynakları merkezi olarak kontrol ediyoruz. Helpdesk portalımız üzerinden çağrı açan kullanıcılar ortalama 25 dakikada ilk yanıtı alır ve çözüm oranımız yüzde doksanın üzerindedir. KVKK kapsamında SIEM çözümüyle güvenlik olaylarını merkezi loglama sistemine aktarıyor, veri envanteri ve erişim kontrol raporlarını düzenli olarak güncelliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Çekmeköy\'e saha desteği için ulaşım süreniz nedir?',
                a: 'İçerenköy ofisimizden Çekmeköy merkeze ortalama 25 dakikada ulaşıyoruz. Şile yolu üzerindeki lokasyonlara da aynı güzergahtan hızla erişim sağlıyoruz.',
            },
            {
                q: 'Yeni açılan ofisimizin IT altyapısını sıfırdan kurabilir misiniz?',
                a: 'Evet. Ağ tasarımından sunucu kurulumuna, güvenlik yapılandırmasından e-posta geçişine kadar tüm altyapıyı tek elden planlayıp kuruyoruz. Anahtar teslim IT altyapı projelerimiz genellikle 2-4 hafta içinde tamamlanır.',
            },
            {
                q: 'Küçük bir ekibiz, sanallaştırmaya ihtiyacımız var mı?',
                a: '5-10 çalışanlı firmalarda bile sanallaştırma fayda sağlar. Tek fiziksel sunucuda birden fazla sanal makine çalıştırarak donanım maliyetini düşürür, yedekleme ve kurtarmayı kolaylaştırırsınız.',
            },
            {
                q: 'Google Workspace mı Microsoft 365 mi önerirsiniz?',
                a: 'Her iki platform da kurumsal düzeyde hizmet sunar. Google Workspace daha basit arayüz ve bulut odaklı çalışma sunarken, Microsoft 365 daha geniş uygulama seti ve Active Directory entegrasyonu sağlar.',
            },
            {
                q: 'KVKK uyum sürecinde hangi teknik tedbirleri alıyorsunuz?',
                a: 'Erişim kontrol politikaları, loglama altyapısı, şifreleme, veri envanteri çıkarma, düzenli güvenlik taraması ve çalışan farkındalık eğitimi gibi teknik tedbirleri kapsıyoruz.',
            },
        ],
    },

    // ── SANCAKTEPE ──
    {
        slug: 'sancaktepe-it-destegi',
        title: 'Sancaktepe IT Destek ve Kurumsal Bilişim',
        h1: 'Sancaktepe\'de Kurumsal IT Destek Çözümleri',
        area: 'Sancaktepe',
        geo: { lat: 41.0027, lng: 29.2310 },
        meta: 'Sancaktepe\'de kurumsal IT destek: sunucu yönetimi, güvenlik duvarı, ağ kurulumu, yedekleme, e-posta ve IT outsource hizmeti.',
        intro: 'Sancaktepe, TEM otoyolu bağlantısıyla hızla gelişen ve KOBİ yoğunluğu yüksek bir ilçedir. Samandıra, Sarıgazi ve Yenidoğan mahallelerindeki sanayi siteleri ile ticaret merkezleri her ölçekten işletmeye ev sahipliği yapıyor. Quick Tower İçerenköy ofisimizden Sancaktepe\'nin ana iş bölgelerine 20-25 dakikada erişiyoruz. Hızla büyüyen bu ilçedeki işletmelere ölçeklenebilir, güvenli ve maliyet etkin BT çözümleri sunarak dijital dönüşüm süreçlerine eşlik ediyoruz.',
        bullets: [
            'Hyper-V, Proxmox VE ve VMware vSphere sunucu sanallaştırma hizmeti',
            'pfSense, Sophos XGS ve FortiGate güvenlik duvarı kurulum ve yönetimi',
            'Cat6A, fiber optik, Wi-Fi 6, VLAN, mesh ve PoE switch ağ çözümleri',
            'Veeam, Acronis ve Nakivo ile NAS destekli 3-2-1 yedekleme',
            'Microsoft 365 ve Google Workspace e-posta ve iş birliği yönetimi',
            'WireGuard, OpenVPN ve IPsec VPN tünelleri ile uzaktan erişim',
            'Kaspersky, Bitdefender ve ESET uç nokta güvenlik çözümleri',
            'Hızlı yanıt süreli helpdesk ve yerinde teknik destek',
            'KVKK uyumu — Active Directory, Azure AD, SIEM ve merkezi loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Sancaktepe\'deki KOBİ\'lerin büyük bölümü tek sunucuyla başlayıp zamanla birden fazla fiziksel makineye yayılır — bu da yönetim karmaşıklığını artırır. Hyper-V ile Windows Server ortamlarında sanallaştırma kurarak birden fazla iş yükünü tek fiziksel sunucuda birleştiriyoruz. Proxmox VE lisans gerektirmeyen açık kaynak yapısıyla maliyet bilincindeki işletmelere hitap ederken, Linux container desteğiyle hafif iş yüklerinde kaynak tasarrufu sağlıyoruz. VMware vSphere ile kurumsal ölçekte DRS ve HA özelliklerini devreye alarak büyüme döneminde kesintisiz performans sunuyoruz. Sancaktepe\'deki müşterilerimize proaktif izleme ve aylık kapasite raporlaması standart hizmet olarak dahildir.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Sancaktepe\'deki ticari sitelerde farklı işletmeler ortak internet altyapısı kullanır — bu da güvenlik risklerini katlayarak artırır. pfSense ile maliyet avantajlı ancak kurumsal özellikli güvenlik duvarı kuruyor, çoklu WAN ve fail-over yapılandırmasıyla hat sürekliliği sağlıyoruz. Sophos XGS serisiyle merkezi bulut yönetimli güvenlik sunarak çoklu lokasyonu tek panelden kontrol ediyoruz. Yüksek throughput gerektiren işletmelerde Fortinet FortiGate ile derin paket denetimi ve SD-WAN entegrasyonu kuruyoruz. Çalışan cihazlarında Kaspersky Endpoint Security, Bitdefender GravityZone Elite ve ESET PROTECT Advanced ile merkezi antivirüs ve EDR yönetimi gerçekleştiriyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Sancaktepe\'nin hızla büyüyen ticaret alanlarında ağ altyapısı genellikle perakende ihtiyaçlara göre kurulmuştur ve kurumsal performans için yetersiz kalır. Cat6A yapısal kablolama ile tüm uç noktaları 10 Gbps kapasiteli altyapıya bağlıyor, omurga hatlarında fiber optik ile darboğazları ortadan kaldırıyoruz. Wi-Fi 6 erişim noktaları ile yüksek yoğunluklu ortamlarda bile stabil kablosuz bağlantı sunuyoruz. VLAN segmentasyonuyla satış, yönetim ve misafir ağlarını birbirinden ayırarak güvenlik seviyesini yükseltiyoruz. Mesh topoloji geniş mağaza ve ofis alanlarında kesintisiz dolaşım sağlarken, PoE switch altyapısıyla erişim noktaları ve IP telefonlara ayrı güç hattı ihtiyacını ortadan kaldırıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Sancaktepe\'deki ticaret firmaları için stok yönetim verileri, müşteri bilgileri ve muhasebe kayıtları vazgeçilmez iş varlıklarıdır. Veeam Backup & Replication ile sanal makine düzeyinde artımlı yedek alıyor, Instant VM Recovery özelliğiyle arıza anında saniyeler içinde yedekten sanal makine başlatıyoruz. Acronis Cyber Protect ile fiziksel sunucu ve bilgisayarlara tam disk imajı oluşturuyor, yerleşik fidye yazılımı korumasıyla yedeklerin şifrelenmesini engelliyoruz. Nakivo ile çoklu site replikasyonu kurarak tesis dışı kurtarma noktası oluşturuyoruz. 3-2-1 kuralı çerçevesinde yerel NAS cihazı, ikincil lokasyon ve bulut depolamayı birlikte yapılandırıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Sancaktepe\'deki KOBİ\'lerin büyük kısmı sahada çalışan ekiplere sahiptir ve ofis dışından güvenli erişim zorunludur. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre kuruyor; Data Loss Prevention (DLP) ile hassas verilerin e-posta yoluyla sızmasını engelliyoruz. Google Workspace tercih eden işletmelere Gmail, Drive ve Calendar yapılandırması yaparak alternatif sunum sağlıyoruz. WireGuard ile modern ve hızlı VPN deneyimi sunarken, OpenVPN ile eski işletim sistemi ve cihaz uyumluluğu gerektiren ortamlarda çözüm üretiyoruz. IPsec VPN tünelleriyle şubeler arası kalıcı bağlantı kurarak dosya sunucusu ve yazıcı paylaşımını merkezi hale getiriyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Sancaktepe\'nin KOBİ ağırlıklı yapısında tam zamanlı IT personeli yerine dış kaynak modeli hem ekonomik hem pratik bir tercihtir. IT outsource hizmetimizle işe giriş-çıkış BT prosedürlerinden envanter takibine, lisans yönetiminden güvenlik güncellemelerine kadar tüm operasyonu üstleniyoruz. Active Directory ile şirket içi kullanıcı hesaplarını ve grup politikalarını yönetiyor, Azure AD ile bulut kaynaklarına koşullu erişim politikaları uyguluyoruz. Helpdesk çağrı portalımız üzerinden açılan talepler öncelik sırasına göre atanır ve ortalama 22 dakikada ilk yanıt verilir. KVKK uyumu kapsamında SIEM altyapısıyla güvenlik olaylarını merkezi loglama platformunda topluyoruz ve düzenli uyum denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Sancaktepe\'ye saha desteği için ne kadar sürede ulaşırsınız?',
                a: 'İçerenköy ofisimizden Sancaktepe merkeze TEM bağlantısıyla 20-25 dakikada ulaşıyoruz. Samandıra ve Sarıgazi bölgelerine de aynı güzergahtan hızla erişim sağlıyoruz.',
            },
            {
                q: 'Mevcut IT altyapımızı değiştirmeden hizmetinize geçebilir miyiz?',
                a: 'Evet. Keşif ziyaretinde mevcut donanım ve yazılımlarınızı değerlendiriyoruz. Çalışan sistemleri bozmadan devralır, eksikleri kademeli olarak tamamlarız. Geçiş genellikle 1-2 hafta sürer.',
            },
            {
                q: 'Ticari sitelerdeki paylaşımlı internet ortamında güvenliğimiz nasıl sağlanır?',
                a: 'Kendi firewall cihazınızı kurarak paylaşımlı internet hattında dahi izole ve güvenli bir ağ oluşturuyoruz. VLAN ve erişim kontrolleriyle ağınız diğer kiracılardan tamamen ayrılır.',
            },
            {
                q: 'IT outsource paketlerinize neler dahil?',
                a: 'Sunucu ve ağ izleme, güvenlik yönetimi, yedekleme takibi, helpdesk desteği, kullanıcı hesap yönetimi ve aylık raporlama standart paketimize dahildir. İhtiyaca göre özelleştirme yapıyoruz.',
            },
            {
                q: 'Acil durumlarda mesai dışı destek alabilir miyiz?',
                a: 'Premium paketlerimizde 7/24 destek mevcuttur. Standart paketlerde mesai dışı acil müdahale ek ücretle sağlanır. Kritik sistemler için SLA ile garanti veriyoruz.',
            },
        ],
    },

    // ── Part 3: Sultanbeyli, Beykoz, Kozyatağı, Kavacık, İçerenköy ──
    // ── SULTANBEYLİ ──
    {
        slug: 'sultanbeyli-it-destegi',
        title: 'Sultanbeyli IT Destek ve Bilişim Hizmetleri',
        h1: 'Sultanbeyli\'de Güvenilir IT Destek Hizmetleri',
        area: 'Sultanbeyli',
        geo: { lat: 40.9600, lng: 29.2600 },
        meta: 'Sultanbeyli\'de IT destek: sunucu yönetimi, güvenlik duvarı, ağ kurulumu, yedekleme, e-posta yönetimi ve uygun fiyatlı IT outsource.',
        intro: 'Sultanbeyli, son on yılda hızla sanayileşen ve KOBİ sayısının katlanarak arttığı bir ilçe. Organize sanayi alanlarından Yavuz Selim Bulvarı üzerindeki ticaret merkezlerine kadar yüzlerce işletme dijital dönüşüm sürecinde uygun maliyetli IT çözümleri arıyor. Quick Tower İçerenköy ofisimizden Sultanbeyli\'ye TEM bağlantısıyla 25-30 dakikada ulaşıyoruz. Bütçe dostu aylık sabit ücretli paketlerimiz, büyüme aşamasındaki Sultanbeyli firmalarının BT yatırımını öngörülebilir kılıyor.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall çözümleri',
            'Cat6A yapısal kablolama, fiber optik ve Wi-Fi 6 ağ altyapısı',
            'Veeam, Acronis ve Nakivo ile 3-2-1 kuralına uygun yedekleme',
            'Microsoft 365 ve Google Workspace kurumsal e-posta yönetimi',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli VPN erişimi',
            'Uygun fiyatlı IT outsource ve tam kapsamlı BT yönetimi',
            'ESET, Kaspersky ve Bitdefender uç nokta güvenlik paketleri',
            'Active Directory, Azure AD, KVKK uyumu ve SIEM loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Sultanbeyli\'deki üretim ve ticaret firmalarının çoğu tek bir fiziksel sunucu üzerinde tüm iş yükünü taşıyor — bu durum hem performans hem de güvenilirlik açısından ciddi risk oluşturuyor. VMware vSphere ile iş yüklerinizi izole sanal makinelere bölerek bir uygulamadaki çökmenin diğerlerini etkilemesini engelliyoruz. Bütçesi kısıtlı işletmeler için Proxmox VE açık kaynak platformunu öneriyoruz; lisans maliyeti sıfır ancak kurumsal özellikler eksiksiz. Windows tabanlı altyapılarda ise Hyper-V failover cluster kurulumu yaparak donanım arızalarında otomatik geçiş sağlıyoruz. Sultanbeyli\'deki müşterilerimizin sunucularını 7/24 uzaktan izliyor, kritik eşik uyarılarını anında alıyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Sultanbeyli\'nin büyüyen sanayi ağı, siber tehditlere karşı profesyonel koruma gerektiriyor. Fortinet FortiGate cihazlarıyla katmanlı ağ güvenliği kurarken, Sophos XGS serisiyle web filtreleme ve uygulama kontrolü ekliyoruz. Açık kaynak çözüm tercih eden müşterilerimiz için pfSense tabanlı güvenlik duvarı yapılandırıyoruz. Uç nokta tarafında ise çalışan bilgisayarlarına ESET, Kaspersky veya Bitdefender kurumsal antivirüs çözümlerinden bütçenize en uygun olanını kuruyoruz. Sultanbeyli\'deki her müşterimiz için üç ayda bir sızma testi gerçekleştirip rapor sunuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Sultanbeyli\'deki imalat atölyelerinden ofis katlarına kadar farklı mekanlar farklı ağ topolojileri gerektiriyor. Cat6A yapısal kablolama ile 10 Gbps\'e kadar destekleyen bakır altyapı kurarken, binalar arası bağlantılarda fiber optik hat çekiyoruz. Üretim sahasında toz ve neme dayanıklı Wi-Fi 6 erişim noktaları konumlandırıyoruz. VLAN segmentasyonu ile üretim ağı, ofis ağı ve misafir ağını birbirinden izole ediyor, mesh topoloji sayesinde geniş alanlarda kesintisiz kapsama sağlıyoruz. PoE switch altyapısıyla kamera ve erişim noktalarına tek kablo üzerinden hem veri hem enerji taşıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Sultanbeyli\'de sıkça yaşanan elektrik dalgalanmaları sunucu donanımına zarar verebilir; verilerinizi korumanın tek yolu düzenli ve test edilmiş yedeklemedir. 3-2-1 kuralını temel alıyoruz: üç kopya, iki farklı ortam, bir tanesi tesis dışında. Veeam Backup ile sanal makine düzeyinde artımlı yedek alırken, Acronis Cyber Protect ile fiziksel iş istasyonlarını da kapsama dahil ediyoruz. Nakivo Backup ile küçük ölçekli ortamlarda maliyet etkin replikasyon yapıyoruz. Yerel NAS cihazına saatlik, bulut depolamaya günlük yedek gönderiliyor ve her çeyrekte kurtarma tatbikatı gerçekleştiriyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Sultanbeyli\'deki işletmeler sıklıkla sahada çalışan personele güvenli uzaktan erişim sağlamak istiyor. Microsoft 365 Business ile Exchange Online, Teams ve OneDrive\'ı entegre kurarak her yerden erişilebilir bir iş ortamı oluşturuyoruz. Google Workspace tercih eden firmalar için Gmail ve Drive kurulumunu alan adınıza özel yapılandırıyoruz. Uzaktan erişimde WireGuard protokolüyle yüksek hızlı tünel, OpenVPN ile geniş cihaz uyumluluğu, IPsec ile şubeler arası kalıcı bağlantı kuruyoruz. Tüm VPN oturumları merkezi log sunucusunda kayıt altına alınıyor.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Sultanbeyli\'deki KOBİ\'ler için ayrı bir IT departmanı kurmak çoğu zaman bütçeyi zorlayan bir yatırım. IT outsource modelimizde Active Directory ile merkezi kullanıcı yönetimi kuruyor, Azure AD entegrasyonuyla bulut uygulamalarını tek oturum açma (SSO) ile birleştiriyoruz. Helpdesk portalımızdan açılan çağrılar öncelik sırasına göre işleniyor; ortalama ilk yanıt süresi 18 dakika. KVKK kapsamında kişisel veri envanterinizi çıkarıyor, SIEM tabanlı loglama altyapısı kurarak erişim ve değişiklik kayıtlarını denetlenebilir biçimde saklıyoruz. Yıllık uyum raporu ve çalışan eğitimi hizmetimize dahildir.',
            },
        ],
        faqs: [
            {
                q: 'Sultanbeyli\'ye ofisten ne kadar sürede ulaşıyorsunuz?',
                a: 'TEM otoyolu bağlantısıyla Sultanbeyli\'ye ortalama 25-30 dakikada ulaşıyoruz. Acil durumlarda önce uzaktan bağlantıyla müdahale ediyor, gerekirse aynı gün saha desteği sağlıyoruz.',
            },
            {
                q: 'Küçük bütçeli firmalar için uygun paketiniz var mı?',
                a: 'Evet. 5-15 bilgisayarlık işletmeler için özel başlangıç paketimiz mevcut. Temel izleme, yedekleme ve helpdesk hizmetini aylık sabit ücretle sunuyoruz. Gizli maliyet yok.',
            },
            {
                q: 'Üretim tesislerinde ağ kurulumu yapıyor musunuz?',
                a: 'Evet. Toz, nem ve sıcaklık gibi zorlu koşullara uygun endüstriyel sınıf switch, kablolama ve Wi-Fi çözümleri kuruyoruz. Sultanbeyli\'deki birçok imalat atölyesinde deneyimimiz var.',
            },
            {
                q: 'Mevcut antivirüs yazılımımızı değiştirmek zorunda mıyız?',
                a: 'Hayır. Mevcut çözümünüzü değerlendirir, yeterli bulursak yapılandırmasını optimize ederiz. Yetersizse ESET, Kaspersky veya Bitdefender kurumsal sürümlerinden birini öneriyoruz.',
            },
            {
                q: 'KVKK uyum süreci ne kadar zaman alıyor?',
                a: 'Veri envanteri çıkarma ve teknik tedbirlerin uygulanması ortalama 3-4 hafta sürer. Firma büyüklüğüne ve veri çeşitliliğine göre bu süre değişebilir. Süreç boyunca adım adım bilgilendirme yapıyoruz.',
            },
        ],
    },

    // ── BEYKOZ ──
    {
        slug: 'beykoz-it-destegi',
        title: 'Beykoz IT Destek ve Kurumsal Bilişim',
        h1: 'Beykoz\'da Kurumsal IT Destek Hizmetleri',
        area: 'Beykoz',
        geo: { lat: 41.1166, lng: 29.0833 },
        meta: 'Beykoz\'da kurumsal IT destek: sunucu bakımı, güvenlik, ağ altyapısı, yedekleme, e-posta ve yönetilen IT hizmetleri.',
        intro: 'Beykoz, Boğaz\'ın doğal güzelliğiyle kurumsal prestiji bir arada sunan İstanbul\'un en özel ilçelerinden biri. Kavacık iş merkezlerinden Beykoz Kundura\'nın yaratıcı ofislerine, Anadolu Hisarı\'ndaki butik işletmelerden Çubuklu\'daki teknoloji firmalarına kadar geniş bir iş yelpazesi bulunuyor. İçerenköy ofisimizden Beykoz\'a FSM köprüsü çıkışıyla 30-35 dakikada ulaşıyoruz. Doğayla iç içe çalışırken kurumsal düzeyde BT altyapısından ödün vermek zorunda değilsiniz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V sunucu sanallaştırma uzmanları',
            'Fortinet FortiGate, Sophos XGS ve pfSense ile çok katmanlı güvenlik',
            'Cat6A kablolama, fiber optik hatlar ve Wi-Fi 6 mesh ağ çözümleri',
            'Veeam, Acronis ve Nakivo yedekleme — 3-2-1 kuralı ve NAS depolama',
            'Microsoft 365 ve Google Workspace e-posta ve iş birliği platformları',
            'WireGuard, OpenVPN ve IPsec VPN ile şifreli uzaktan erişim',
            'Butik işletmelere özel esnek IT outsource paketleri',
            'ESET, Kaspersky ve Bitdefender endpoint koruma çözümleri',
            'Active Directory, Azure AD yönetimi, KVKK uyumu ve SIEM loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Beykoz\'daki butik ofis yapıları genellikle sınırlı sunucu odası alanına sahip; bu nedenle sanallaştırma burada adeta bir zorunluluk. VMware vSphere ile tek bir güçlü sunucu üzerinde birden fazla sanal makine çalıştırarak alan ve enerji tasarrufu sağlıyoruz. Yaratıcı sektördeki Beykoz müşterilerimiz için Proxmox VE tercih ediyoruz — açık kaynak esnekliği ile grafik yoğun iş yüklerini bile sorunsuz taşıyor. Karma ortamlarda Hyper-V ile Windows Server entegrasyonunu sorunsuz kuruyoruz. Her hafta otomatik sağlık raporu gönderiliyor ve firmware güncellemeleri planlanıyor.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Beykoz\'un sakin atmosferi siber tehditleri durdurmaz — özellikle butik otel ve restoran ağları kredi kartı verisi nedeniyle hedef oluyor. Fortinet FortiGate ile PCI DSS uyumlu ağ segmentasyonu kuruyor, Sophos XGS serisiyle gelişmiş tehdit koruması sağlıyoruz. Düşük bütçeli girişimler için pfSense tabanlı açık kaynak firewall yapılandırıyoruz. Tüm uç noktalarda ESET, Kaspersky veya Bitdefender kurumsal endpoint çözümlerinden birini konuşlandırıyor, merkezi yönetim konsoluyla tehdit haritasını canlı izliyoruz. Beykoz\'daki müşterilerimize aylık siber güvenlik durum raporu sunuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Beykoz\'un tarihi ve doğal dokusu içindeki yapılarda kablolama ciddi mühendislik bilgisi gerektirir. Cat6A yapısal kablolama ile eski binaların kalın duvarlarını aşıyor, uzun mesafelerde fiber optik ile kayıpsız veri iletimi sağlıyoruz. Wi-Fi 6 erişim noktalarını bahçeli ofis kampüslerinde mesh topolojisiyle konumlandırarak açık alanlarda bile güçlü sinyal sunuyoruz. VLAN yapılandırmasıyla misafir ağını kurumsal ağdan kesin biçimde ayırıyoruz. PoE switch ile güç ve veri iletimini tek kablodan sağlayarak kablo karmaşasını ortadan kaldırıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Beykoz\'un ormanlık bölgelerinde elektrik kesintileri diğer ilçelere kıyasla daha sık yaşanabiliyor; bu da sunucu donanımı için ek risk demek. 3-2-1 kuralına göre verilerinizin üç kopyasını iki farklı ortamda tutuyor, birini tesis dışına çıkarıyoruz. Veeam ile sanal sunucu yedeklerini artımlı olarak alırken, Acronis Cyber Protect ile çalışan dizüstü bilgisayarlarını da yedekleme kapsamına dahil ediyoruz. Nakivo ile küçük ve orta ölçekli ortamlarda maliyet verimli replikasyon sağlıyoruz. Yerel NAS cihazı üzerinde saatlik snapshot tutarak anlık geri dönüş imkanı sunuyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Beykoz\'da çalışan birçok firma hibrit model kullanıyor; çalışanlar haftanın birkaç günü evden veya farklı lokasyonlardan bağlanıyor. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre yapılandırıyor, Google Workspace tercih eden müşterilerimize Gmail ve Google Drive kurulumu yapıyoruz. Uzaktan erişim altyapısında WireGuard ile ultra düşük gecikme süresi sunarken, OpenVPN ile geniş platform desteği sağlıyoruz. Şubeler arası kalıcı bağlantılarda IPsec tünelleri kullanıyoruz. Tüm VPN bağlantıları iki faktörlü kimlik doğrulama ile korunuyor.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Beykoz\'daki küçük ve orta ölçekli firmalar genellikle yarı zamanlı IT desteğiyle idare etmeye çalışıyor, ta ki ciddi bir arıza yaşanana kadar. IT outsource hizmetimizle Active Directory üzerinden merkezi kullanıcı ve grup yönetimi kuruyor, Azure AD ile bulut uygulamalarına tek oturum açma entegrasyonu sağlıyoruz. Helpdesk portalımız üzerinden çağrı açılır, önceliklendirilir ve çözüm takibi yapılır. KVKK kapsamında kişisel veri envanteri çıkarıyor, SIEM çözümüyle erişim loglarını merkezi olarak toplayıp denetlenebilir loglama altyapısı oluşturuyoruz. Yıllık uyum denetimi hizmetimize dahildir.',
            },
        ],
        faqs: [
            {
                q: 'Beykoz\'a ulaşım süreniz ne kadar?',
                a: 'İçerenköy ofisimizden FSM köprüsü çıkışı üzerinden Beykoz\'a ortalama 30-35 dakikada ulaşıyoruz. Acil durumlarda önce uzaktan müdahale ediyoruz; çoğu sorun yerinde ziyaret gerekmeden çözülüyor.',
            },
            {
                q: 'Tarihi binalarda kablolama yapabiliyor musunuz?',
                a: 'Evet. Beykoz\'daki restore edilmiş yapılarda estetik ve yapısal bütünlüğü koruyarak kanallar içinden kablolama yapıyoruz. Gerekirse kablosuz mesh çözümüyle kablo ihtiyacını minimuma indiriyoruz.',
            },
            {
                q: 'Butik otel ve restoranlar için özel paketiniz var mı?',
                a: 'Evet. Misafir Wi-Fi yönetimi, POS sistem entegrasyonu ve PCI DSS uyumlu ağ segmentasyonunu içeren konaklama ve yeme-içme sektörüne özel paketimiz mevcut.',
            },
            {
                q: 'Beykoz\'da kaç müşteriniz var?',
                a: 'Beykoz ve çevresinde 15\'in üzerinde aktif müşterimiz bulunuyor. Kavacık iş merkezleri ve Beykoz merkez olmak üzere geniş bir bölgede hizmet veriyoruz.',
            },
            {
                q: 'Sunucu bakım sözleşmesi neleri kapsıyor?',
                a: 'Donanım sağlık kontrolü, işletim sistemi ve firmware güncellemeleri, yedekleme doğrulama, performans raporlama ve 7/24 uzaktan izleme dahildir. Yedek parça maliyeti ayrı faturalandırılır.',
            },
        ],
    },

    // ── KOZYATAĞI ──
    {
        slug: 'kozyatagi-it-destegi',
        title: 'Kozyatağı IT Destek ve Bilişim Çözümleri',
        h1: 'Kozyatağı\'nda Profesyonel IT Destek Hizmetleri',
        area: 'Kozyatağı',
        geo: { lat: 40.9780, lng: 29.0690 },
        meta: 'Kozyatağı\'nda IT destek: sunucu yönetimi, siber güvenlik, network kurulumu, yedekleme, e-posta ve IT outsource. Komşunuz Kozyatağı Bilişim.',
        intro: 'Kozyatağı — adımızın geldiği semt, kökümüzün olduğu mahalle. Kozyatağı Bilişim olarak bu bölgedeki işletmeleri yıllardır tanıyor, ihtiyaçlarını birebir anlıyoruz. E-5 üzerindeki iş merkezlerinden Kozyatağı Mahallesi\'ndeki ticari ofislere kadar yürüme mesafesindeyiz. Bir telefon açmanız yeterli — komşunuz olarak dakikalar içinde kapınızdayız. Sunucu odasından çalışan masasına kadar tüm teknoloji katmanlarını tek elden yönetiyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V — kapınızdaki sanallaştırma uzmanları',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall kurulum ve yönetimi',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6, VLAN ve PoE switch altyapısı',
            'Veeam, Acronis ve Nakivo yedekleme; NAS depolama ve 3-2-1 stratejisi',
            'Microsoft 365 ve Google Workspace kurumsal e-posta ve iş birliği',
            'WireGuard, OpenVPN ve IPsec tabanlı VPN — güvenli uzaktan çalışma',
            'Kozyatağı\'nın IT komşusu — en hızlı yanıt süreleri',
            'ESET, Kaspersky ve Bitdefender ile uç nokta güvenliği',
            'Active Directory, Azure AD, KVKK uyumu, helpdesk ve SIEM loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Kozyatağı\'ndaki komşu ofislerinize sunucu desteği vermek bizim için yürüyüş mesafesi. VMware vSphere ile kurumsal düzeyde sanallaştırma kuruyor, iş yüklerinizi izole sanal makinelerde çalıştırıyoruz. Maliyet optimizasyonu arayan Kozyatağı firmaları için Proxmox VE açık kaynak platformunu devreye alıyoruz — lisans ücreti olmadan tam özellikli sanallaştırma. Windows Server ortamlarında Hyper-V cluster yapısıyla yüksek erişilebilirlik sağlıyoruz. Kozyatağı\'nda acil bir donanım arızası mı var? Yedek parça stoğumuzla aynı saat içinde müdahale ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Kozyatağı\'ndaki yoğun iş trafiğinde güvenlik açığı bırakmak, siber saldırganlar için davetiye çıkarmak demek. Fortinet FortiGate next-gen firewall ile ağ trafiğinizi uygulama katmanında analiz ediyoruz. Sophos XGS serisiyle synchronized security özelliğini kullanarak firewall ile endpoint arasında anlık tehdit paylaşımı sağlıyoruz. Bütçe dostu projeler için pfSense ile ücretsiz ancak güçlü firewall çözümleri sunuyoruz. Çalışan bilgisayarlarında ESET, Kaspersky ve Bitdefender kurumsal endpoint korumalarını yönetim konsoluyla merkezi olarak dağıtıyoruz. Kozyatağı\'ndaki komşu firmalarımızın güvenlik duvarı bakımını aylık düzenli ziyaretlerle gerçekleştiriyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Kozyatağı\'ndaki iş merkezlerinde zemin kattan en üst kata kadar tutarlı ağ performansı istiyorsanız profesyonel altyapı şart. Cat6A yapısal kablolama ile her katta gigabit bağlantı sunuyor, binalar arası bağlantıda fiber optik kullanıyoruz. Wi-Fi 6 erişim noktalarını mesh konfigürasyonuyla kurarak kat geçişlerinde bağlantı kopmasını önlüyoruz. VLAN segmentasyonu ile departmanlar arası ağ trafiğini izole ediyor, PoE switch kullanarak erişim noktalarına ayrı güç hattı çekme zorunluluğunu ortadan kaldırıyoruz. Kozyatağı\'na yakınlığımız sayesinde ağ kesintilerinde dakikalar içinde yerindeyiz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Kozyatağı\'ndaki müşterilerimizin verilerini korumak bizim için kişisel sorumluluk — onlar sadece müşterimiz değil, komşumuz. 3-2-1 kuralı çerçevesinde verilerinizin üç kopyasını alıyor, iki farklı ortamda saklıyor, birini coğrafi olarak uzak bir noktaya gönderiyoruz. Veeam ile sanal makine düzeyinde artımlı yedekleme yaparken, Acronis ile tüm iş istasyonlarını disk imajı olarak korumaya alıyoruz. Nakivo ile VMware ve Hyper-V ortamlarında çapraz platform replikasyonu gerçekleştiriyoruz. Yerel NAS cihazına saatlik yedek, buluta günlük senkronizasyon — kurtarma testlerini her çeyrekte birlikte yapıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Kozyatağı\'ndaki firmalar artık sadece ofisten değil, evden, sahadan ve yoldan da çalışıyor. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı tek lisansta birleştiriyoruz; SPF, DKIM ve DMARC yapılandırmasıyla e-posta sahteciliğini engelliyoruz. Google Workspace kullanan müşterilerimize Gmail, Calendar ve Drive entegrasyonu yapıyoruz. VPN tarafında WireGuard ile düşük gecikmeli bağlantı, OpenVPN ile geniş cihaz desteği, IPsec ile şubeler arası güvenli kanal kuruyoruz. Komşumuz olmanız sayesinde VPN yapılandırma değişikliklerini ofise uğrayarak bile halledebilirsiniz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Kozyatağı\'nda ofis açmış firmalar genellikle 10-50 kişilik yapılardır ve tam zamanlı IT personeli istihdam etmek kârlı olmayabilir. IT outsource hizmetimizle Active Directory üzerinden kullanıcı, grup ve politika yönetimini üstleniyor, Azure AD ile Microsoft 365 ve diğer SaaS uygulamalarına tek oturum açma (SSO) entegrasyonu kuruyoruz. Helpdesk kanalımız üzerinden açılan çağrıları ortalama 15 dakikada yanıtlıyoruz — komşu avantajı. KVKK uyum sürecinde veri envanteri, erişim kontrolleri ve SIEM tabanlı loglama altyapısı kuruyoruz. Kozyatağı\'nda IT\'niz bizim sorumluluğumuzda.',
            },
        ],
        faqs: [
            {
                q: 'Kozyatağı\'na gerçekten yürüyerek mi geliyorsunuz?',
                a: 'Evet. Ofisimiz İçerenköy Quick Tower\'da ve Kozyatağı yürüme mesafemizde. Acil durumlarda ekibimiz 5-10 dakika içinde kapınızda olabiliyor. Bu kadar hızlı yanıt süresi başka hiçbir ilçede mümkün değil.',
            },
            {
                q: 'Şirket adınız neden Kozyatağı Bilişim?',
                a: 'Kozyatağı bizim kökümüz — burada başladık, burada büyüdük. Semte ve buradaki işletmelere olan bağımızı yansıtmak istedik. Şimdi Anadolu Yakası genelinde hizmet versek de kalbimiz Kozyatağı\'nda.',
            },
            {
                q: 'Kozyatağı\'ndaki müşterilerinize özel avantaj var mı?',
                a: 'Kozyatağı müşterilerimize ücretsiz ilk keşif ziyaretine ek olarak saha müdahale süresinde öncelik veriyoruz. Ayrıca yüz yüze toplantı ve eğitim seanslarını ofisimizde ücretsiz düzenliyoruz.',
            },
            {
                q: 'Hafta sonu destek veriyor musunuz?',
                a: 'Evet. Kritik sistemler için 7/24 destek hattımız açık. Planlı bakım çalışmalarını müşterilerimizin tercihi doğrultusunda hafta sonu veya mesai dışı saatlerde gerçekleştiriyoruz.',
            },
            {
                q: 'Kozyatağı\'ndaki iş merkezlerinde deneyiminiz var mı?',
                a: 'Evet. E-5 üzerindeki iş merkezleri ve Kozyatağı Mahallesi\'ndeki ticari yapılarda onlarca kurulum gerçekleştirdik. Plaza yönetimleriyle koordineli çalışma konusunda geniş deneyimimiz var.',
            },
        ],
    },

    // ── KAVACIK ──
    {
        slug: 'kavacik-it-destegi',
        title: 'Kavacık IT Destek ve Yönetilen BT Hizmetleri',
        h1: 'Kavacık\'ta Yönetilen IT Destek Hizmetleri',
        area: 'Kavacık',
        geo: { lat: 41.1072, lng: 29.0681 },
        meta: 'Kavacık\'ta yönetilen IT hizmetleri: sunucu bakımı, güvenlik duvarı, ağ kurulumu, yedekleme, e-posta ve IT outsource. FSM köprüsü çıkışında hızlı erişim.',
        intro: 'Kavacık, FSM köprüsü çıkışında konumlanan ve büyük kurumsal genel merkezlere ev sahipliği yapan İstanbul\'un en prestijli iş bölgelerinden biri. Uluslararası şirketlerin Türkiye ofisleri, finans kuruluşları ve teknoloji firmaları Kavacık\'ın modern iş merkezlerinde faaliyet gösteriyor. İçerenköy ofisimizden FSM köprüsü üzerinden 25-30 dakikada ulaşıyoruz. Kavacık\'taki kurumsal müşterilerimize SLA garantili yönetilen IT hizmetleri sunuyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile kurumsal sanallaştırma',
            'Fortinet FortiGate, Sophos XGS ve pfSense — kurumsal ağ güvenliği',
            'Cat6A ve fiber optik altyapı, Wi-Fi 6, VLAN ve mesh ağ tasarımı',
            'Veeam, Acronis ve Nakivo ile NAS destekli 3-2-1 yedekleme',
            'Microsoft 365 ve Google Workspace e-posta ve bulut iş birliği',
            'WireGuard, OpenVPN ve IPsec — çoklu ofis VPN bağlantısı',
            'SLA garantili IT outsource ve özel IT danışmanı ataması',
            'ESET, Kaspersky ve Bitdefender uç nokta güvenlik yönetimi',
            'Active Directory, Azure AD, KVKK, helpdesk ve SIEM loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Kavacık\'taki kurumsal genel merkezler genellikle yüzlerce kullanıcıya hizmet veren karmaşık sunucu altyapılarına sahip. VMware vSphere Enterprise ile vMotion, DRS ve HA özelliklerini etkinleştirerek sıfır kesinti hedefiyle sunucu yönetimi sağlıyoruz. Hibrit bulut stratejisi benimseyen firmalar için Proxmox VE ile yerinde sanallaştırmayı bulut ile entegre ediyoruz. Active Directory ve Exchange gibi kritik servisleri Hyper-V cluster üzerinde yüksek erişilebilirlik modunda çalıştırıyoruz. Kavacık\'taki müşterilerimizin sunucu performansını haftalık raporlarla izleyerek kapasite darboğazlarını proaktif olarak tespit ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Kavacık\'taki uluslararası şirketler, global standartlarda siber güvenlik altyapısı gerektiriyor. Fortinet FortiGate serisiyle SD-WAN entegreli güvenlik duvarı kuruyor, çoklu WAN bağlantısını akıllı yönlendirmeyle birleştiriyoruz. Sophos XGS ile Intercept X endpoint korumasını senkronize ederek zero-trust mimarisi oluşturuyoruz. Maliyet optimizasyonu gereken lokasyonlarda pfSense ile yüksek performanslı açık kaynak çözüm sunuyoruz. Tüm uç noktalarda ESET, Kaspersky veya Bitdefender kurumsal endpoint çözümleri konuşlandırılıyor ve merkezi yönetim konsolundan gerçek zamanlı tehdit izleme yapılıyor.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Kavacık\'ın modern iş merkezlerinde yüzlerce çalışanın eş zamanlı bağlantı ihtiyacı yüksek kapasiteli ağ altyapısını zorunlu kılıyor. Cat6A yapısal kablolama ile omurga hattını oluştururken, kat içi ve binalar arası bağlantılarda fiber optik kullanıyoruz. Wi-Fi 6 erişim noktalarını konferans salonları ve ortak alanlarda yoğunluk yönetimi yapacak şekilde yapılandırıyoruz. VLAN ile departmanlar ve misafir ağını izole ediyor, mesh topolojisiyle geniş ofis kampüslerinde kesintisiz dolaşım sağlıyoruz. PoE switch altyapısıyla IP kamera ve erişim noktalarına ayrı güç kablosu ihtiyacını ortadan kaldırıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Kavacık\'taki kurumsal firmalar için veri kaybı sadece teknik bir sorun değil, regülasyon ihlali ve itibar kaybı demek. 3-2-1 kuralı çerçevesinde verilerinizi üç kopya halinde saklıyor, birini rackmount NAS üzerinde yerelde, diğerini bulut veri merkezinde muhafaza ediyoruz. Veeam Backup ile VM düzeyinde artımlı yedekleme ve anında kurtarma sağlıyoruz. Acronis Cyber Protect ile fiziksel sunucu ve iş istasyonlarını da korumaya alıyoruz. Nakivo ile çoklu hypervisor desteğiyle farklı platformlardaki tüm iş yüklerini tek panelden yedekliyoruz. Yılda iki kez felaket kurtarma tatbikatı yaparak RTO ve RPO hedeflerinizi doğruluyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Kavacık\'taki multinasyonel firmalar genellikle global merkez ile sürekli iletişim halinde ve farklı zaman dilimlerinde çalışıyor. Microsoft 365 E5 lisansıyla Exchange Online, Teams, SharePoint ve gelişmiş güvenlik özelliklerini entegre sunuyoruz. Google Workspace Enterprise kullanan müşterilerimize Vault ile e-keşif ve uyumluluk araçları kuruyoruz. Uzaktan erişimde WireGuard ile yüksek hızlı şifreli tünel, OpenVPN ile çoklu platform uyumu, IPsec ile global ofisler arası kalıcı VPN bağlantısı kuruyoruz. Her VPN oturumu çok faktörlü kimlik doğrulama ile güvence altında.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Kavacık\'taki büyük ölçekli firmalar bile IT operasyonlarının bir kısmını dış kaynağa devretmeyi tercih ediyor — çünkü uzman bulma ve elde tutma zorlaşıyor. IT outsource modelimizde Active Directory ile karmaşık organizasyon yapılarını yönetiyor, Azure AD ile hibrit kimlik doğrulama ve koşullu erişim politikaları uyguluyoruz. Helpdesk ekibimiz SLA taahhüdüyle 7/24 destek veriyor; kritik çağrılara 10 dakika içinde ilk müdahale garantisi sunuyoruz. KVKK kapsamında veri işleme envanteri, erişim denetimleri ve SIEM tabanlı loglama altyapısı kurarak yıllık uyum denetimini gerçekleştiriyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Kavacık\'a ulaşım süreniz ne kadar?',
                a: 'İçerenköy ofisimizden FSM köprüsü üzerinden Kavacık\'a ortalama 25-30 dakikada ulaşıyoruz. Acil olmayan konularda uzaktan bağlantıyla anında müdahale ediyoruz.',
            },
            {
                q: 'SLA garantili hizmet modeliniz nasıl işliyor?',
                a: 'Sözleşmemizde yanıt süreleri, çözüm süreleri ve uptime hedefleri yazılı olarak taahhüt edilir. Kritik çağrılarda 10 dakika ilk yanıt, 2 saat çözüm hedefi belirliyoruz. SLA ihlallerinde cezai şart uygulanır.',
            },
            {
                q: 'Uluslararası firmalar için çoklu dil desteğiniz var mı?',
                a: 'Evet. İngilizce ve Türkçe dillerinde helpdesk desteği veriyoruz. Teknik dokümantasyon ve raporlarımızı da her iki dilde hazırlayabiliyoruz.',
            },
            {
                q: 'Kavacık\'taki iş merkezlerinde altyapı deneyiminiz var mı?',
                a: 'Evet. Kavacık\'taki birçok A sınıfı iş merkezinde sunucu odası tasarımı, kablolama ve ağ kurulumu gerçekleştirdik. Plaza yönetimleri ve kiracılarla koordineli çalışma deneyimimiz geniş.',
            },
            {
                q: 'Mevcut IT ekibimizle birlikte çalışabilir misiniz?',
                a: 'Elbette. Co-managed IT modeli sunuyoruz. Sizin ekibiniz günlük operasyonları yürütürken biz uzmanlık gerektiren alanlarda — siber güvenlik, sanallaştırma, yedekleme — destek veriyoruz.',
            },
        ],
    },

    // ── İÇERENKÖY ──
    {
        slug: 'icerenkoy-it-destegi',
        title: 'İçerenköy IT Destek ve Bilişim Hizmetleri',
        h1: 'İçerenköy\'de Hızlı IT Destek Hizmetleri',
        area: 'İçerenköy',
        geo: { lat: 40.9840, lng: 29.0970 },
        meta: 'İçerenköy\'de IT destek: sunucu yönetimi, siber güvenlik, network kurulumu, yedekleme, e-posta ve IT outsource. Quick Tower\'da ofisimiz var — anında müdahale.',
        intro: 'İçerenköy, Kozyatağı Bilişim\'in merkez ofisinin bulunduğu semt — Quick Tower\'daki ofisimizden kelimesi kelimesine sıfır mesafe. İçerenköy\'deki işletmeler için biz sadece IT sağlayıcısı değil, aynı binadaki veya yan sokaktaki komşuyuz. Asansörle inip sunucu odanıza ulaşabilecek kadar yakınız. E-5 ve bağlantı yollarının kavşağındaki İçerenköy, aynı zamanda tüm Anadolu Yakası operasyonlarımızın merkezi. Burada olmak, en hızlı yanıt süresini garanti ediyor.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V sanallaştırma — sıfır mesafe destek',
            'Fortinet FortiGate, Sophos XGS ve pfSense güvenlik duvarı kurulumu',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6, VLAN, mesh ve PoE switch',
            'Veeam, Acronis ve Nakivo yedekleme; NAS ve 3-2-1 kuralıyla tam koruma',
            'Microsoft 365 ve Google Workspace e-posta kurulumu ve yönetimi',
            'WireGuard, OpenVPN ve IPsec ile kurumsal VPN çözümleri',
            'IT outsource — Quick Tower\'daki komşunuzdan tam BT yönetimi',
            'ESET, Kaspersky ve Bitdefender endpoint güvenliği',
            'Active Directory, Azure AD, KVKK uyumu, helpdesk ve SIEM loglama',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'İçerenköy\'deki ofisimiz Quick Tower\'da olduğu için semt müşterilerimize anında fiziksel müdahale imkanımız var — sunucu odasına ulaşmak bazen asansöre binmek kadar basit. VMware vSphere ile kritik iş yüklerinizi yüksek erişilebilirlik modunda çalıştırıyoruz; vMotion sayesinde bakım için bile kesinti yaşanmaz. Proxmox VE ile lisans maliyetini sıfıra indirip kurumsal sanallaştırma kalitesini korumak isteyen İçerenköy firmalarına hizmet veriyoruz. Windows Server altyapılarında Hyper-V ile failover cluster kurarak tek nokta arızasını ortadan kaldırıyoruz. Sunucu sağlık raporları her hafta otomatik olarak e-postanıza ulaşıyor.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'İçerenköy\'de E-5 aksında yoğun bir ticari faaliyet var ve bu durum siber saldırganların da ilgisini çekiyor. Fortinet FortiGate ile next-gen firewall koruması kuruyor, IPS ve web filtreleme modülleriyle tehditleri ağa girmeden engelliyoruz. Sophos XGS cihazlarıyla sandboxing ve gelişmiş tehdit koruması sunarak fidye yazılımı riskini minimize ediyoruz. Daha esnek ve maliyet etkin bir çözüm arayan İçerenköy müşterilerimiz için pfSense yapılandırıyoruz. Uç noktalarda ESET, Kaspersky ve Bitdefender kurumsal endpoint çözümlerini merkezi konsoldan yöneterek tüm cihazları tek noktadan izliyoruz. İçerenköy\'de olmanın avantajı: firewall güncellemesi bile fiziksel ziyaretle anında yapılabiliyor.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'İçerenköy\'deki Quick Tower ve çevresindeki iş merkezlerinde onlarca ağ projesi tamamladık; bu semtin altyapı zorluklarını ve fırsatlarını iyi biliyoruz. Cat6A yapısal kablolama ile gigabit ağ omurgası kuruyor, yeni binalarda fiber optik altyapıyı standart olarak döşüyoruz. Wi-Fi 6 erişim noktalarını açık ofis planlarına uygun mesh topolojisiyle konumlandırarak her köşede güçlü sinyal sağlıyoruz. VLAN ile üretim, yönetim ve misafir ağlarını birbirinden ayırıyoruz. PoE switch kullanarak IP telefon, kamera ve kablosuz erişim noktalarına tek kablo üzerinden veri ve güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'İçerenköy\'deki komşu firmalarımız için veri güvenliği en büyük önceliğimiz — bir arıza anında yan ofisten yardıma koşabilecek tek IT sağlayıcısıyız. 3-2-1 kuralını titizlikle uyguluyoruz: verilerinizin üç kopyası alınıyor, biri yerel NAS üzerinde, diğeri bulut veri merkezinde saklanıyor. Veeam ile sanal makine yedeklerini 15 dakikada bir artımlı olarak gönderiyoruz. Acronis Cyber Protect ile dizüstü bilgisayarlar ve iş istasyonları dahil tüm uç noktaları korumaya alıyoruz. Nakivo ile küçük VMware ve Hyper-V ortamlarında lisans dostu yedekleme ve replikasyon yapıyoruz. İçerenköy\'de olmanın en büyük avantajı: kurtarma işlemini fiziksel olarak başında durarak yönetebilmemiz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'İçerenköy\'deki firmalar için kurumsal e-posta ve uzaktan erişim kurulumunu aynı gün içinde tamamlayabiliyoruz — başka hiçbir semt için bu kadar hızlı teslim veremeyiz. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre kuruyor; anti-spam ve anti-phishing politikalarını aktifleştiriyoruz. Google Workspace tercih eden müşterilerimize Gmail, Calendar ve Google Meet yapılandırması yapıyoruz. VPN altyapısında WireGuard ile ultra hızlı şifreli bağlantı, OpenVPN ile eski cihaz uyumu, IPsec ile şubeler arası site-to-site tünel kuruyoruz. Quick Tower\'daki ofisimizde VPN kurulumunun canlı demosunu görebilirsiniz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'İçerenköy\'de IT outsource hizmeti almak istiyorsanız, BT ekibiniz tam anlamıyla kapı komşunuz oluyor. Active Directory ile kullanıcı hesapları ve erişim yetkilerini merkezi olarak yönetiyor, Azure AD ile bulut kimlik doğrulamasını entegre ediyoruz. Helpdesk çağrılarınıza ortalama 12 dakikada yanıt veriyoruz — acil durumlarda fiziksel müdahale süresi 5 dakikanın altında. KVKK kapsamında veri envanterinizi çıkarıyor, kişisel veri işleme politikalarınızı yazıyor, SIEM tabanlı loglama ve denetim altyapısını kuruyoruz. İçerenköy\'deki müşterilerimiz için yüz yüze eğitim seanslarını Quick Tower toplantı odamızda düzenliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Ofisten İçerenköy\'deki müşteriye ne kadar sürede ulaşıyorsunuz?',
                a: 'Zaten İçerenköy\'deyiz! Quick Tower\'daki ofisimizden İçerenköy sınırları içindeki herhangi bir noktaya 5-10 dakikada, bazen daha kısa sürede ulaşıyoruz. Aynı bina içindeki müşterilerimize anında müdahale ediyoruz.',
            },
            {
                q: 'Quick Tower\'da ofis katınızı ziyaret edebilir miyiz?',
                a: 'Elbette. Randevu alarak veya mesai saatlerinde doğrudan gelerek ofisimizi ziyaret edebilirsiniz. Demo ortamımızda sunucu sanallaştırma, firewall yönetimi ve yedekleme çözümlerini canlı olarak gösterebiliyoruz.',
            },
            {
                q: 'İçerenköy\'de kaç müşteriniz var?',
                a: 'İçerenköy ve yakın çevresinde 30\'un üzerinde aktif müşterimiz bulunuyor. Quick Tower başta olmak üzere E-5 aksındaki birçok iş merkezinde hizmet veriyoruz.',
            },
            {
                q: 'Aynı gün kurulum mümkün mü?',
                a: 'İçerenköy müşterilerimiz için evet. Basit kurulumlar — antivirüs yükleme, VPN yapılandırma, e-posta hesabı açma gibi işlemler — aynı gün tamamlanıyor. Kapsamlı projeler için detaylı planlama yapıyoruz.',
            },
            {
                q: 'Acil durumda mesai dışı destek alabilir miyiz?',
                a: '7/24 acil destek hattımız aktiftir. İçerenköy müşterilerimiz için fiziksel müdahale bile mesai dışında mümkün — ofis yolumuza düşüyor çünkü zaten buradayız.',
            },
        ],
    },
];

export function getLocal(slug) {
    return localLandings.find((l) => l.slug === slug);
}

export function getAllLocals() {
    return localLandings;
}
