// Yerel landing page verisi — İstanbul Avrupa Yakası ilçe bazlı SEO sayfaları (Bölüm 1)
// Her sayfa benzersiz içerikle oluşturulmuştur; tüm marka ve ürünler her sayfada yer alır.
export const avrupaLocals1 = [
    // ── LEVENT ──
    {
        slug: 'levent-it-destegi',
        title: 'Levent IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Levent IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Levent',
        geo: { lat: 41.0812, lng: 29.0134 },
        meta: 'Levent IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek. Büyükdere Caddesi yakını.',
        intro: 'Levent, Büyükdere Caddesi üzerinde yükselen Kanyon, Metrocity ve Sapphire gibi iş kulelerinde yüzlerce finans kuruluşu, sigorta şirketi ve çok uluslu firmanın genel merkezine ev sahipliği yapıyor. İstanbul\'un en yoğun beyaz yaka nüfusuna sahip bu bölgede tek saatlik bir sistem kesintisi bile ciddi mali kayıplara yol açabiliyor. Büyükdere aksındaki ofislerin çoğu 7/24 çalışan sunucu odaları barındırıyor ve bu altyapıların proaktif yönetimi zorunlu hale geliyor. Kozyatağı Bilişim olarak Levent\'teki iş ortaklarımıza sunucu odasından son kullanıcıya kadar eksiksiz yönetilen IT hizmeti sunuyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve yüksek erişilebilirlik kümeleri',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall kurulumu; ESET, Kaspersky, Bitdefender uç nokta güvenliği',
            'Cat6A ve fiber optik yapısal kablolama, Wi-Fi 6 kurumsal kablosuz ağ, VLAN, mesh ve PoE switch altyapısı',
            'Veeam, Acronis ve Nakivo ile 3-2-1 kuralına uygun yedekleme; NAS ve bulut replikasyon',
            'Microsoft 365 ve Google Workspace kurumsal e-posta yönetimi ve göçü',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli uzaktan erişim (VPN)',
            'Tam kapsamlı IT outsource — Active Directory ve Azure AD ile merkezi kimlik yönetimi',
            '7/24 helpdesk, SIEM entegrasyonu ve merkezi loglama altyapısı',
            'KVKK uyumlu veri saklama, erişim kontrolü ve denetim izi kaydı',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Büyükdere Caddesi\'ndeki iş kulelerinde sunucu odaları genellikle binanın bodrum katlarında yer alıyor ve soğutma kapasitesi sınırlı. Fiziksel sunucu sayısını azaltmak hem enerji maliyetini düşürür hem de yönetim karmaşıklığını ortadan kaldırır. VMware vSphere Enterprise ile vSAN destekli hiperkonverge altyapı kurarak Levent\'teki finans müşterilerimize milisaniye düzeyinde disk tepki süresi sağlıyoruz. Proxmox VE ile lisans maliyeti olmadan KVM sanallaştırma ve ZFS tabanlı veri bütünlüğü sunarken, Windows Server ağırlıklı ortamlarda Hyper-V failover cluster ile donanım arızasında otomatik yük devri gerçekleştiriyoruz. Kanyon ve Metrocity\'deki müşterilerimizin sunucularını uzaktan izleme panelimiz üzerinden 7/24 takip ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Levent\'teki holding merkezleri ve finans kurumları hedefli siber saldırılar için birincil adres konumunda. Fortinet FortiGate next-gen firewall ile SSL inspection, application control ve IPS modüllerini aktif ederek şifreli trafik içindeki tehditleri bile yakalıyoruz. Sophos XGS serisinin synchronized security özelliğiyle ağ ve uç nokta güvenliği senkronize çalışır; enfekte bir cihaz otomatik karantinaya alınır. Bütçe odaklı KOBİ\'lere pfSense ile Suricata IDS/IPS entegrasyonu sunuyoruz. Uç nokta korumasında ESET PROTECT merkezi yönetim konsolu, Kaspersky Endpoint Security gelişmiş tehdit istihbaratı ve Bitdefender GravityZone makine öğrenme tabanlı zararlı yazılım tespiti sağlıyor.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Levent\'teki çok katlı iş kulelerinde yüzlerce çalışanın eş zamanlı bağlandığı ağlarda performans darboğazı sık rastlanan bir sorun. Büyükdere aksındaki binalarda fiber optik omurga kablolama ile katlar arası 10 Gbps bağlantı sağlıyor, yatay dağıtımda Cat6A ile her çalışma noktasına gigabit hız garanti ediyoruz. Wi-Fi 6 erişim noktalarıyla OFDMA ve MU-MIMO teknolojileri sayesinde toplantı salonları ve ortak alanlar dahil her noktada yüksek kapasite elde ediyoruz. VLAN segmentasyonuyla departman, misafir ve IoT ağlarını izole ediyor, mesh topolojiyle kat geçişlerinde bağlantı kopmasını önlüyoruz. PoE switch altyapısıyla erişim noktaları ve IP telefonlara ayrı güç kablosu çekme zorunluluğunu ortadan kaldırıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Levent\'teki finans ve sigorta sektörü müşterilerimiz için bir saatlik veri kaybının maliyeti yüz binlerce lirayı bulabiliyor. 3-2-1 kuralını uyguluyoruz: üç kopya, iki farklı ortam, biri şehir dışı veri merkezinde. Veeam Backup & Replication ile VMware ve Hyper-V ortamlarında artımlı yedek alıyor, SureBackup özelliğiyle yedeklerin kurtarılabilirliğini düzenli test ediyoruz. Acronis Cyber Protect ile fiziksel sunucularda bare-metal restore imkanı sunarak farklı bir donanıma bile tam sistem kurtarma sağlıyoruz. Nakivo Backup ile maliyet optimize edilmiş replikasyon politikaları oluşturuyor, yerel NAS cihazına saatlik ve buluta günlük yedek göndererek RTO hedefini 1 saatin altına çekiyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Sapphire ve Kanyon kulelerindeki şirketlerin büyük bölümü hibrit çalışma modeline geçti; Levent ofisindeki çalışanlar hafta içi saha ve ev arasında kesintisiz iletişime ihtiyaç duyuyor. Microsoft 365 Business Premium ile Exchange Online, Teams, SharePoint ve OneDrive\'ı entegre kurarak SPF, DKIM ve DMARC yapılandırmasıyla e-posta sahteciliğini önlüyoruz. Google Workspace tercih eden müşterilerimize Gmail, Drive ve Meet ekosistemini yapılandırıp alan adı doğrulama ve veri göçünü gerçekleştiriyoruz. VPN altyapısında WireGuard ile düşük gecikmeli modern tüneller, OpenVPN Access Server ile kullanıcı bazlı erişim politikaları ve IPsec ile şubeler arası kalıcı site-to-site bağlantı kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Levent\'teki çok uluslu firmaların Türkiye ofisleri genellikle merkezi IT ekibinden bağımsız, yerel destek ortağına ihtiyaç duyar. IT outsource modelimizde Active Directory group policy ile standart cihaz konfigürasyonu, Azure AD conditional access ile konum ve cihaz bazlı erişim kontrolü sağlıyoruz. Helpdesk portalımız üzerinden açılan çağrılar ortalama 20 dakikada ilk yanıtı alır; kritik sistemlerde 7/24 destek sunuyoruz. SIEM platformuyla tüm olaylar merkezi loglanır ve erişim kayıtları 2 yıl boyunca saklanır. KVKK kapsamında veri envanteri çıkarıyor, kişisel veri işleme politikalarını oluşturuyor ve yıllık uyum denetim raporunu hazırlayıp Kurul\'a sunulacak belgeleri düzenliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Levent\'teki ofisimize saha desteği için ne kadar sürede geliyorsunuz?',
                a: 'Anadolu Yakası merkezimizden Levent\'e planlı randevuyla ortalama 40-50 dakikada ulaşıyoruz. Acil durumlarda Avrupa Yakası saha ekibimiz Büyükdere aksına 20-30 dakikada müdahale edebiliyor.',
            },
            {
                q: 'Finans sektörü için özel güvenlik gereksinimleri karşılıyor musunuz?',
                a: 'Evet. BDDK ve SPK düzenlemelerine uygun log saklama, şifreli iletişim ve erişim kontrol politikaları uyguluyoruz. Fortinet FortiGate ve Sophos XGS ile katmanlı güvenlik mimarisi kuruyor, SIEM ile merkezi loglama sağlıyoruz.',
            },
            {
                q: 'İş kulesindeki sunucu odamızın bakımını da üstleniyor musunuz?',
                a: 'Evet. UPS durumu, soğutma sistemi, sıcaklık/nem takibi ve kablolama düzeni dahil sunucu odası yönetimini komple üstleniyoruz. VMware, Proxmox veya Hyper-V fark etmeksizin tüm platformları destekliyoruz.',
            },
            {
                q: 'Microsoft 365 ile Google Workspace arasında hangisini önerirsiniz?',
                a: 'Microsoft 365, Teams ve SharePoint entegrasyonuyla büyük ekipler için idealdir. Google Workspace, sade arayüzü ve hızlı iş birliği araçlarıyla küçük-orta ekiplere uygundur. Mevcut altyapınıza göre karşılaştırmalı danışmanlık sunuyoruz.',
            },
            {
                q: 'KVKK uyumu için teknik altyapı yeterli mi, hukuki danışmanlık da veriyor musunuz?',
                a: 'Teknik tedbirleri biz uyguluyoruz: Active Directory erişim kontrolü, SIEM loglaması, veri envanteri ve şifreleme. Hukuki süreç için anlaşmalı avukatlarımız aracılığıyla aydınlatma metni ve politika hazırlığı desteği de sağlıyoruz.',
            },
        ],
    },

    // ── MASLAK ──
    {
        slug: 'maslak-it-destegi',
        title: 'Maslak IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Maslak IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Maslak',
        geo: { lat: 41.1086, lng: 29.0200 },
        meta: 'Maslak IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek. İş kuleleri bölgesi.',
        intro: 'Maslak, Maslak 1453, Orjin Maslak ve Spring Giz Plaza gibi modern iş merkezlerinin yanı sıra İTÜ Teknokent ile İstanbul\'un teknoloji üretim üssü konumunda. Yazılım şirketleri, IT danışmanlık firmaları ve fintech startup\'ları bu bölgede yoğunlaşmış durumda. Teknoloji sektörünün hızlı döngüleri, esnek ancak güvenli altyapı talep ediyor. Kozyatağı Bilişim olarak Maslak\'taki teknoloji firmalarına sanallaştırma, siber güvenlik ve 7/24 helpdesk hizmetleri sunarak dijital operasyonlarının kesintisiz devam etmesini sağlıyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve yüksek erişilebilirlik',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall; ESET, Kaspersky ve Bitdefender endpoint güvenliği',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 planlama, VLAN segmentasyonu, mesh kablosuz ve PoE switch',
            'Veeam, Acronis ve Nakivo yedekleme çözümleri; 3-2-1 kuralı, NAS ve bulut hibrit depolama',
            'Microsoft 365 ve Google Workspace kurumsal e-posta kurulumu ve yönetimi',
            'WireGuard, OpenVPN ve IPsec VPN ile şifreli uzaktan erişim altyapısı',
            'IT outsource — Active Directory ve Azure AD ile merkezi kimlik ve cihaz yönetimi',
            'Çok kanallı helpdesk, SIEM entegrasyonu ve merkezi loglama',
            'KVKK uyumlu veri sınıflandırma, erişim denetimi ve uyum raporlaması',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Maslak\'taki yazılım şirketleri ve fintech firmaları geliştirme, test ve üretim ortamlarını hızlıca oluşturup kaldırabilecek esnek bir sanallaştırma platformuna ihtiyaç duyuyor. VMware vSphere ile vMotion ve DRS özelliklerini kullanarak iş yüklerini sunucular arasında sıfır kesintili aktarıyoruz. İTÜ Teknokent çevresindeki startup\'lara Proxmox VE ile lisans maliyeti sıfır, KVM tabanlı sanallaştırma ve LXC konteyner desteği sunuyoruz. Windows Server altyapısı kullanan kurumsal müşterilerimize Hyper-V failover cluster ile donanım arızasında otomatik yük devri sağlıyoruz. Maslak 1453 ve Spring Giz\'deki sunucu odalarını uzaktan izleme panelimizle 7/24 takip ediyor, kapasite planlamasını proaktif yürütüyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Maslak\'taki teknoloji firmalarının geliştirme sunucuları ve müşteri verileri siber saldırganlar için yüksek değerli hedefler oluşturuyor. Fortinet FortiGate ile application control ve SSL deep inspection modüllerini aktif ederek API trafiğindeki anormallikleri tespit ediyoruz. Sophos XGS firewall\'un heartbeat özelliğiyle uç nokta ve ağ güvenliği senkronize çalışıyor; enfekte bir geliştirici makinesi otomatik karantinaya alınıyor. Açık kaynak çözüm tercih eden firmalar için pfSense ile Suricata IDS/IPS koruması kuruyoruz. ESET PROTECT ile merkezi zararlı yazılım yönetimi, Kaspersky Endpoint Security ile exploit koruması ve Bitdefender GravityZone ile sandbox analizi sunarak katmanlı savunma oluşturuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Maslak\'taki modern iş merkezlerinde açık ofis düzeni yaygın ve yüzlerce cihazın aynı anda bağlandığı ortamlarda ağ tasarımı kritik önem taşıyor. Profesyonel site survey ile beton duvarlar, cam bölmeler ve kat yüksekliğini analiz ederek Wi-Fi 6 erişim noktalarının ideal konumlarını belirliyoruz. Cat6A yapısal kablolama ile her çalışma noktasına gigabit hız sağlarken, bina kampüslerinde fiber optik omurga çekiyoruz. VLAN yapılandırmasıyla geliştirme, operasyon ve misafir ağlarını birbirinden izole ediyor, mesh topolojiyle ortak çalışma alanlarında kesintisiz dolaşım sunuyoruz. PoE switch\'ler sayesinde erişim noktalarına ve IP telefonlara ayrıca güç kablosu gerekmez.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Maslak\'taki yazılım firmalarının kaynak kodu, müşteri veritabanları ve konfigürasyon dosyaları iş sürekliliğinin temelidir. 3-2-1 yedekleme kuralını uyguluyoruz: yerel NAS\'a saatlik artımlı yedek, buluta günlük replikasyon ve şehir dışı veri merkezine haftalık tam kopya. Veeam Backup & Replication ile VMware ve Hyper-V ortamlarında Instant VM Recovery sayesinde dakikalar içinde sistemi yedekten ayağa kaldırabiliyoruz. Acronis Cyber Protect ile fiziksel ve sanal sunucularda bare-metal restore desteği sağlıyoruz. Nakivo ile maliyet etkin replikasyon politikaları oluşturarak özellikle Orjin Maslak\'taki müşterilerimizin RPO ve RTO hedeflerini tutturmasına yardımcı oluyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Maslak\'taki teknoloji şirketlerinin dağıtık ekipleri farklı şehirlerden ve ülkelerden çalışıyor; güvenli uzaktan erişim altyapısı bu firmalar için hayati önem taşıyor. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre kuruyor; SPF, DKIM ve DMARC kayıtlarıyla e-posta güvenliğini sağlıyoruz. Google Workspace tercih eden müşterilerimize Gmail, Drive ve Meet ekosistemini yapılandırarak veri göçü hizmeti veriyoruz. VPN altyapısında WireGuard ile uzak geliştirici ekiplerine düşük gecikmeli tüneller, OpenVPN Access Server ile kullanıcı bazlı granüler erişim kontrolü ve IPsec ile şubeler arası kalıcı site-to-site bağlantı sağlıyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Maslak\'taki hızlı büyüyen teknoloji firmalarında her hafta yeni çalışan katılımı, yeni cihaz provizyon ve yetkilendirme süreçleri yoğun tempoda ilerliyor. IT outsource modelimizle Active Directory group policy ile standart laptop konfigürasyonu, Azure AD conditional access ile MFA ve konum bazlı erişim kontrolü sağlıyoruz. Helpdesk ekibimiz geliştirici ortamlarına özel destek vererek IDE, VPN ve erişim sorunlarını hızla çözüyor. SIEM platformuyla tüm erişim ve değişiklik logları merkezi olarak toplanır ve analiz edilir. KVKK kapsamında İTÜ Teknokent çevresindeki firmalar dahil veri envanteri çıkarıyor, erişim kontrol politikalarını oluşturuyor ve denetim izlenebilirliğini sağlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Maslak\'taki ofisimize ne kadar sürede ulaşıyorsunuz?',
                a: 'Planlı randevularla Maslak\'a ortalama 45-55 dakikada ulaşıyoruz. Avrupa Yakası saha ekibimiz Maslak bölgesinde 20-25 dakikada yerinde olabiliyor; acil durumlarda öncelikli yönlendirme yapıyoruz.',
            },
            {
                q: 'Yazılım geliştirme ekibimiz için özel altyapı çözümleri sunuyor musunuz?',
                a: 'Evet. Proxmox VE veya VMware üzerinde dev/test/prod ortamları kuruyoruz. CI/CD pipeline altyapısı, konteyner ortamları ve geliştirici VPN erişimi gibi ihtiyaçlara yönelik özel çözümler sunuyoruz.',
            },
            {
                q: 'Teknokent\'teki firmalar için KVKK uyum sürecinde ne yapıyorsunuz?',
                a: 'Veri envanteri çıkarma, Active Directory ve Azure AD erişim kontrolleri, SIEM ile merkezi loglama, çalışan farkındalık eğitimi ve yıllık uyum denetim raporu hazırlama dahil tüm teknik tedbirleri kapsıyoruz.',
            },
            {
                q: 'Hibrit bulut altyapı kurabiliyor musunuz?',
                a: 'Kesinlikle. Kritik uygulamalarınız Maslak\'taki sunucu odanızda, yedekler ve DR ortamı bulutta çalışabilir. Veeam veya Nakivo ile otomatik replikasyon kurarak felaket kurtarma süresini minimize ediyoruz.',
            },
            {
                q: 'Endpoint güvenliğinde hangi markayı tercih etmeliyiz?',
                a: 'ESET düşük kaynak tüketimiyle geliştirici makinelerine uygundur. Kaspersky gelişmiş tehdit analizi sunar. Bitdefender makine öğrenme tabanlı tespitte güçlüdür. Cihaz profilinize göre en uygun çözümü öneriyoruz.',
            },
        ],
    },

    // ── ŞİŞLİ ──
    {
        slug: 'sisli-it-destegi',
        title: 'Şişli IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Şişli IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Şişli',
        geo: { lat: 41.0602, lng: 28.9877 },
        meta: 'Şişli IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Şişli, Halaskargazi Caddesi\'nden Osmanbey\'e, Pangaltı\'dan Nişantaşı sınırına kadar uzanan geniş ticaret ağıyla İstanbul\'un en çeşitli iş dokusuna sahip ilçelerinden biri. Tekstil ihracatçıları, dış ticaret firmaları, muhasebe büroları ve sağlık klinikleri bu bölgede yan yana faaliyet gösteriyor. Şişli\'deki iş hanlarının ve ticaret merkezlerinin çoğu eski binalarda yer alıyor; bu da altyapı modernizasyonunu kritik bir ihtiyaç haline getiriyor. Kozyatağı Bilişim olarak Şişli\'deki KOBİ\'lere sunucu sanallaştırmadan KVKK uyumuna kadar kapsamlı BT desteği sağlıyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve yönetim',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall kurulumu; ESET, Kaspersky, Bitdefender uç nokta koruması',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 kablosuz ağ tasarımı, VLAN, mesh ve PoE switch altyapısı',
            'Veeam, Acronis ve Nakivo ile 3-2-1 kuralına uygun yedekleme; NAS ve bulut hibrit depolama',
            'Microsoft 365 ve Google Workspace kurumsal e-posta kurulumu ve göçü',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli uzaktan erişim (VPN)',
            'IT outsource — Active Directory ve Azure AD ile merkezi kullanıcı ve cihaz yönetimi',
            'Helpdesk çağrı sistemi, SIEM entegrasyonu ve merkezi loglama',
            'KVKK veri envanteri, erişim kontrolü ve teknik tedbir raporlaması',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Şişli\'deki ticaret merkezlerinde sunucu odası koşulları genellikle idealden uzak; yetersiz soğutma ve eski elektrik tesisatı yaygın sorunlar arasında. Sanallaştırma ile fiziksel sunucu sayısını minimuma indirip enerji ve bakım maliyetlerini düşürüyoruz. VMware vSphere ile kurumsal düzey HA kümeleri kurarken, Halaskargazi Caddesi çevresindeki bütçe odaklı KOBİ\'lere Proxmox VE ile lisans ücretsiz KVM sanallaştırma ve LXC konteyner desteği sunuyoruz. Windows tabanlı ERP ve muhasebe yazılımları kullanan tekstil firmalarına Hyper-V failover cluster ile kesintisiz çalışma ortamı sağlıyoruz. Haftalık kapasite raporlarıyla sunucu kaynaklarının büyüme trendini önceden görüyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Şişli\'deki dış ticaret ve tekstil firmalarının müşteri verileri, fiyat listeleri ve ihracat belgeleri rekabet açısından kritik varlıklardır. Fortinet FortiGate ile web filtreleme, uygulama kontrolü ve anti-bot modüllerini aktif ederek zararlı trafik girişini engelliyoruz. Sophos XGS serisiyle deep packet inspection ve synchronized security sayesinde bir uç noktadaki tehdit ağa yayılmadan izole ediliyor. Osmanbey çevresindeki küçük ofislere pfSense ile uygun maliyetli ama kurumsal düzey Snort IDS/IPS koruması kuruyoruz. Uç noktalarda ESET PROTECT ile merkezi yönetim, Kaspersky ile davranışsal analiz ve Bitdefender GravityZone ile yapay zeka destekli zararlı yazılım tespiti sağlıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Şişli\'deki eski iş hanlarında kablolama altyapısı onlarca yıl önce döşenmiş olabiliyor ve mevcut ağ hızları günümüz ihtiyaçlarını karşılamıyor. Cat6A yapısal kablolama ile 10 Gbps destekli modern altyapıya geçiş sağlıyor, katlar arası fiber optik omurga bağlantısı kuruyoruz. Wi-Fi 6 erişim noktalarıyla kalın duvarlara rağmen her noktada tutarlı kablosuz performans elde ediyoruz. VLAN segmentasyonuyla muhasebe, satış ve misafir ağlarını birbirinden izole ediyor, mesh topolojiyle çok katlı binalarda kesintisiz kablosuz dolaşım sağlıyoruz. PoE switch altyapısıyla erişim noktaları ve güvenlik kameralarına tek kablo üzerinden hem veri hem güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Şişli\'deki muhasebe büroları ve dış ticaret firmalarının fatura, e-fatura arşivi ve müşteri kayıtları yasal saklama yükümlülüğüne tabi. 3-2-1 kuralıyla bu verilerin güvenliğini garanti ediyoruz: yerel NAS\'a saatlik artımlı yedek, buluta günlük replikasyon ve şehir dışı veri merkezine haftalık tam kopya. Veeam Backup ile sanal makine düzeyinde anında kurtarma (Instant VM Recovery) imkanı sunarken, Acronis Cyber Protect ile fiziksel sunucularda bare-metal restore desteği sağlıyoruz. Nakivo ile VMware ve Hyper-V ortamlarında maliyet etkin yedekleme politikaları oluşturarak Pangaltı ve Halaskargazi bölgesindeki müşterilerimizin RTO ve RPO hedeflerini tutturuyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Şişli\'deki ihracat firmaları uluslararası müşteri ve tedarikçileriyle yoğun e-posta trafiği yürütüyor; e-posta güvenliği ve sürekliliği doğrudan iş sürecini etkiliyor. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor; SPF, DKIM ve DMARC yapılandırmasıyla e-posta sahteciliğini engelliyoruz. Google Workspace tercih eden KOBİ\'lere Gmail, Drive ve Meet kurulumu ile eski sistemlerden veri göçü gerçekleştiriyoruz. VPN altyapısında WireGuard ile mobil çalışanlara düşük gecikmeli bağlantı, OpenVPN ile kullanıcı bazlı detaylı erişim loglaması ve IPsec ile farklı şehirlerdeki şubeler arası kalıcı site-to-site tünel kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Şişli\'deki birçok KOBİ tam zamanlı IT personeli istihdam etmek yerine dış kaynak modelini tercih ediyor; bu hem maliyet avantajı hem de uzmanlık garantisi sağlıyor. Active Directory ile şirket içi kullanıcı ve bilgisayar yönetimini merkezi politikalarla standartlaştırırken, Azure AD conditional access ile bulut uygulamalarına konum ve cihaz bazlı erişim kontrolü uyguluyoruz. Helpdesk portalımız üzerinden açılan çağrılar SLA\'ya uygun sürelerde çözülür; tüm olaylar SIEM platformuna otomatik aktarılır. KVKK kapsamında veri envanteri çıkarıyor, erişim kontrol politikalarını oluşturuyor, merkezi loglama altyapısıyla denetim izlenebilirliği sağlıyor ve yıllık uyum raporunu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Şişli\'deki eski binalarda network altyapısını yenileyebilir misiniz?',
                a: 'Evet. Eski binaların kablo kanallarını değerlendirip Cat6A yapısal kablolama ve fiber optik omurga ile modern altyapıya geçiş sağlıyoruz. Wi-Fi 6 erişim noktalarıyla kalın duvarlara rağmen tutarlı kapsama sunuyoruz.',
            },
            {
                q: 'Tekstil sektörüne özel IT çözümleriniz var mı?',
                a: 'Evet. ERP ve muhasebe yazılımlarının sunucu gereksinimleri, sipariş yönetim sistemleri ve e-fatura entegrasyonu için özelleştirilmiş altyapı kuruyoruz. VMware veya Hyper-V üzerinde yüksek erişilebilirlik sağlıyoruz.',
            },
            {
                q: 'Kaç kişilik şirketler IT outsource hizmeti alabiliyor?',
                a: '5 ile 200 çalışan arasındaki işletmeler en sık tercih eden segmentimiz. Active Directory ve Azure AD ile merkezi yönetim kurduğumuz için çalışan sayısı arttıkça birim maliyet düşer ve verimlilik artar.',
            },
            {
                q: 'Veeam, Acronis ve Nakivo arasında hangisini seçmeliyiz?',
                a: 'Veeam kapsamlı VM yedekleme ve anında kurtarma ile öne çıkar. Acronis fiziksel sunucularda bare-metal restore gücüyle ayrılır. Nakivo uygun maliyetli replikasyon sunar. İhtiyacınıza göre tek veya kombinasyon halinde öneriyoruz.',
            },
            {
                q: 'Sophos ve Fortinet arasındaki fark nedir?',
                a: 'Fortinet FortiGate yüksek throughput ve SD-WAN ile çok şubeli yapılarda öne çıkar. Sophos XGS synchronized security ile uç nokta entegrasyonunda güçlüdür. Ağ büyüklüğünüze ve entegrasyon ihtiyacınıza göre öneriyoruz.',
            },
        ],
    },

    // ── MECİDİYEKÖY ──
    {
        slug: 'mecidiyekoy-it-destegi',
        title: 'Mecidiyeköy IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Mecidiyeköy IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Mecidiyeköy',
        geo: { lat: 41.0669, lng: 28.9938 },
        meta: 'Mecidiyeköy IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek.',
        intro: 'Mecidiyeköy, İstanbul\'un ulaşım ağının en kritik kavşak noktalarından biri olarak metro, metrobüs ve otobüs hatlarının kesiştiği yerde konumlanıyor. Trump Towers, Torun Center ve Profilo AVM çevresinde reklam ajansları, medya şirketleri ve dijital pazarlama firmaları yoğunlaşmış durumda. Büyükdere Caddesi\'nin güney ucundaki bu yoğun iş bölgesinde ofis alanları sürekli el değiştiriyor ve her yeni kiracı farklı bir IT altyapısına ihtiyaç duyuyor. Kozyatağı Bilişim olarak Mecidiyeköy\'deki dinamik iş ortamına hızlı kurulum ve kesintisiz yönetilen BT hizmetleri sunuyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve HA yapılandırması',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall; ESET, Kaspersky ve Bitdefender uç nokta güvenliği',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 tasarımı, VLAN izolasyonu, mesh ağ ve PoE switch',
            'Veeam, Acronis ve Nakivo ile 3-2-1 yedekleme stratejisi; NAS ve bulut replikasyon',
            'Microsoft 365 ve Google Workspace kurumsal e-posta, dosya paylaşımı ve iş birliği',
            'WireGuard, OpenVPN ve IPsec VPN ile güvenli uzaktan erişim',
            'IT outsource — Active Directory ve Azure AD ile merkezi kimlik yönetimi',
            'Anlık helpdesk desteği, SIEM entegrasyonu ve merkezi loglama altyapısı',
            'KVKK uyumlu veri sınıflandırma, erişim denetimi ve teknik tedbir raporlaması',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Mecidiyeköy\'deki ofisler sık kiracı değişikliği yaşıyor ve her yeni firma farklı bir sunucu konfigürasyonuna ihtiyaç duyuyor. Bu dinamik ortamda hızlı provizyon yapabilen sanallaştırma platformları büyük avantaj sağlıyor. VMware vSphere ile yeni sanal makineleri şablondan dakikalar içinde dağıtıyor, vMotion ile bakım sırasında iş yüklerini taşıyoruz. Reklam ajansları ve medya firmalarına Proxmox VE ile lisans maliyetsiz, ZFS snapshot destekli esnek ortam sunuyoruz. Trump Towers ve Torun Center\'daki Windows Server ağırlıklı yapılarda Hyper-V failover cluster ile kesintisiz çalışma garantisi veriyoruz. Tüm ortamları merkezi izleme panelimizden proaktif takip ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Mecidiyeköy\'deki reklam ve medya ajanslarının müşteri kampanya verileri, kreatif dosyaları ve stratejik planları rakipler tarafından hedef alınabilecek değerli varlıklar. Fortinet FortiGate ile application control ve web filtreleme modülleriyle sosyal medya ve bulut uygulama trafiğini güvenli yönetiyoruz. Sophos XGS firewall\'un synchronized security özelliğiyle bir uç noktadaki tehdit anında ağ seviyesinde bloklanıyor. pfSense ile küçük ofislere uygun maliyetli ama kurumsal düzey Snort IDS/IPS koruması sağlıyoruz. Endpoint katmanında ESET PROTECT ile merkezi yönetim, Kaspersky Endpoint Security ile gelişmiş exploit önleme ve Bitdefender GravityZone ile makine öğrenme tabanlı tespit sunuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Mecidiyeköy Meydanı çevresindeki iş merkezlerinde video konferans, büyük dosya transferi ve bulut tabanlı uygulamalar yüksek bant genişliği talep ediyor. Cat6A yapısal kablolama ile her çalışma noktasına 10 Gbps destekli bağlantı sağlıyor, katlar arası fiber optik omurga ile gecikmeyi minimuma indiriyoruz. Açık ofis düzenindeki reklam ajanslarında Wi-Fi 6 erişim noktalarıyla OFDMA teknolojisi sayesinde onlarca cihazın eş zamanlı yüksek performansla çalışmasını garanti ediyoruz. VLAN segmentasyonuyla kreatif ekip, finans ve misafir ağlarını izole ediyor, mesh topolojiyle toplantı odaları dahil her noktada kesintisiz bağlantı sunuyoruz. PoE switch\'lerle erişim noktalarına ayrı güç kablosu ihtiyacını ortadan kaldırıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Mecidiyeköy\'deki ajansların kampanya dosyaları, müşteri sunumları ve tasarım arşivleri yılların birikimini temsil ediyor; kaybolmaları telafisi güç zararlara yol açar. 3-2-1 kuralıyla üç kopya, iki farklı ortam ve bir şehir dışı yedekleme noktası oluşturuyoruz. Veeam Backup & Replication ile sanal makine düzeyinde artımlı yedek alıyor, SureBackup ile yedeklerin kurtarılabilirliğini otomatik doğruluyoruz. Acronis Cyber Protect ile fiziksel ve sanal sunucularda bare-metal restore desteği sunuyoruz. Nakivo ile VMware ve Hyper-V ortamlarında uygun maliyetli replikasyon politikaları oluşturuyor, NAS cihazına saatlik ve buluta günlük yedek göndererek iş sürekliliğini garanti ediyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Mecidiyeköy\'deki medya profesyonelleri müşteri toplantıları, stüdyo çekimleri ve ev ofisi arasında sürekli hareket halinde; her noktadan kurumsal sistemlere güvenli erişim şart. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor, Profilo AVM çevresindeki müşterilerimize SPF, DKIM ve DMARC ile e-posta güvenliği sağlıyoruz. Google Workspace tercih eden dijital ajanlara Gmail, Drive ve Meet ekosistemini yapılandırıp veri göçünü gerçekleştiriyoruz. VPN altyapısında WireGuard ile mobil cihazlarda pil dostu bağlantı, OpenVPN ile detaylı erişim loglaması ve IPsec ile farklı lokasyonlardaki ofisler arası kalıcı tünel kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Mecidiyeköy\'deki reklam ajansları ve medya firmalarının çoğu 10-50 kişilik ekiplerden oluşuyor ve tam zamanlı IT uzmanı istihdam etmek bütçe açısından zorlu. IT outsource modelimizde Active Directory ile kullanıcı hesapları ve grup politikalarını merkezi yönetirken, Azure AD ile bulut uygulamalarına MFA ve conditional access uyguluyoruz. Helpdesk ekibimiz kreatif yazılımlardan ağ sorunlarına kadar geniş yelpazede destek veriyor; tüm olaylar SIEM platformuna aktarılır. Merkezi loglama altyapısıyla erişim kayıtları saklanır ve raporlanır. KVKK kapsamında müşteri verilerinin korunması için veri envanteri, erişim kontrol politikaları ve yıllık uyum denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Mecidiyeköy\'deki ofisimize acil müdahale süreniz ne kadar?',
                a: 'Avrupa Yakası saha ekibimiz Mecidiyeköy bölgesine 15-25 dakikada ulaşabiliyor. Planlı bakım ziyaretleri için haftalık veya aylık programlar oluşturuyoruz.',
            },
            {
                q: 'Reklam ajansları için özel IT çözümleriniz var mı?',
                a: 'Evet. Büyük dosya transferi için yüksek hızlı ağ altyapısı, kreatif yazılımlar için güçlü iş istasyonu yönetimi ve bulut tabanlı iş birliği araçları kuruyoruz. Microsoft 365 veya Google Workspace entegrasyonu ile ekip verimliliğini artırıyoruz.',
            },
            {
                q: 'Küçük ofisler için uygun maliyetli firewall çözümü var mı?',
                a: 'pfSense açık kaynak firewall ile lisans maliyeti olmadan kurumsal düzey IDS/IPS koruması sağlıyoruz. 10-30 kişilik ofisler için ideal bir çözümdür. İhtiyaç büyürse Fortinet veya Sophos\'a geçiş desteği de veriyoruz.',
            },
            {
                q: 'Ofis taşınması sırasında IT altyapısını yönetiyor musunuz?',
                a: 'Evet. Sunucu, switch, firewall ve kablolama dahil tüm altyapının sökümü, taşınması ve yeni ofiste kurulumunu planlıyoruz. VMware veya Hyper-V sanal makinelerini minimum kesintiyle taşıyoruz.',
            },
            {
                q: 'VPN çözümlerinde WireGuard ile OpenVPN arasındaki fark nedir?',
                a: 'WireGuard modern, hafif ve düşük gecikmeli bir protokoldür; mobil cihazlarda pil ömrüne katkı sağlar. OpenVPN daha olgun bir ekosisteme sahip olup granüler erişim politikaları ve detaylı loglama sunar. İhtiyacınıza göre öneriyoruz.',
            },
        ],
    },

    // ── BEŞİKTAŞ ──
    {
        slug: 'besiktas-it-destegi',
        title: 'Beşiktaş IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Beşiktaş IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Beşiktaş',
        geo: { lat: 41.0430, lng: 29.0053 },
        meta: 'Beşiktaş IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Beşiktaş, Boğaziçi Üniversitesi ve Yıldız Teknik Üniversitesi\'nin çevresinde oluşan startup ekosistemiyle İstanbul\'un en dinamik girişimcilik bölgelerinden biri. Akaretler, Etiler ve Ortaköy sınırları dahilindeki kreatif ajanslar, yazılım girişimleri ve tasarım stüdyoları bu bölgenin iş profilini şekillendiriyor. Beşiktaş Çarşı\'daki küçük ofislerden Barbaros Bulvarı\'ndaki iş merkezlerine kadar farklı ölçeklerde şirket faaliyet gösteriyor. Kozyatağı Bilişim olarak Beşiktaş\'taki girişimci ruhlu firmalara çevik, ölçeklenebilir ve güvenli IT altyapısı sağlıyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile esnek sunucu sanallaştırma ve küme yönetimi',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall; ESET, Kaspersky, Bitdefender endpoint koruması',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 kablosuz ağ, VLAN izolasyonu, mesh ve PoE switch altyapısı',
            'Veeam, Acronis ve Nakivo ile 3-2-1 yedekleme; NAS ve bulut hibrit depolama',
            'Microsoft 365 ve Google Workspace kurumsal e-posta ve iş birliği araçları',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli VPN tünelleri',
            'IT outsource — Active Directory ve Azure AD ile merkezi kimlik ve erişim yönetimi',
            'Helpdesk, SIEM entegrasyonu ve merkezi loglama altyapısı',
            'KVKK uyumlu veri saklama, erişim kontrolü ve denetim izi kaydı',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Beşiktaş\'taki startup\'lar hızlı büyüme dönemlerinde sunucu kapasitesini esnek şekilde artırabilecek bir altyapıya ihtiyaç duyuyor. VMware vSphere ile kaynak havuzu oluşturarak iş yüklerinin ihtiyacına göre CPU ve RAM\'i dinamik atıyoruz. Boğaziçi Üniversitesi Teknopark çevresindeki genç firmalara Proxmox VE ile lisans maliyeti olmadan KVM sanallaştırma ve hızlı snapshot alma imkanı sunuyoruz. Etiler ve Akaretler\'deki Windows Server ağırlıklı müşterilerimize Hyper-V failover cluster ile tek düğüm arızasında bile otomatik yük devri sağlıyoruz. Tüm sanallaştırma ortamlarını merkezi izleme panelimizden proaktif yönetiyor, kapasite darboğazlarını önceden tespit ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Beşiktaş\'taki yazılım girişimleri ve tasarım stüdyoları müşteri projelerini, kaynak kodlarını ve fikri mülkiyet varlıklarını koruma altına almalı. Fortinet FortiGate ile application control ve IPS modülleri üzerinden geliştirme araçları trafiğini güvenli yönetirken, SD-WAN özelliğiyle birden fazla internet hattını akıllıca dengeliyoruz. Sophos XGS firewall ile deep packet inspection ve heartbeat özelliği sayesinde uç noktadaki tehdit ağa yayılmadan engellenliyor. Küçük ekipler için pfSense ile bütçe dostu Suricata IDS/IPS koruması kuruyoruz. ESET PROTECT ile merkezi zararlı yazılım yönetimi, Kaspersky ile exploit koruması ve Bitdefender GravityZone ile makine öğrenme tabanlı tespit katmanlı güvenlik sağlıyor.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Beşiktaş\'taki coworking alanlarında ve kreatif ofislerde onlarca farklı cihazın — dizüstü bilgisayar, tablet, akıllı telefon ve IoT cihazları — eş zamanlı bağlandığı ortamlarda ağ tasarımı uzmanlık gerektirir. Cat6A yapısal kablolama ile her çalışma noktasına gigabit bağlantı sağlıyor, Barbaros Bulvarı çevresindeki binalarda fiber optik omurga kuruyoruz. Wi-Fi 6 erişim noktalarıyla BSS Coloring teknolojisi sayesinde komşu ağlardan kaynaklanan paraziti minimize ediyoruz. VLAN segmentasyonuyla startup ekipleri, yönetim ve misafir ağlarını birbirinden ayırıyor, mesh topolojiyle açık plan ofislerde roaming desteği sağlıyoruz. PoE switch\'lerle erişim noktaları ve IP telefonlara tek kablo üzerinden güç ve veri iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Beşiktaş\'taki startup\'lar için kaynak kodu, prototip verileri ve müşteri bilgileri şirketin en değerli varlıkları; bir fidye yazılımı saldırısı tüm yatırımı riske atabilir. 3-2-1 kuralıyla yerel NAS\'a saatlik artımlı yedek, buluta günlük replikasyon ve şehir dışı veri merkezine haftalık tam kopya gönderiyoruz. Veeam Backup ile Instant VM Recovery sayesinde dakikalar içinde sanal makineyi yedekten başlatabiliyoruz. Acronis Cyber Protect ile fiziksel sunucularda ve iş istasyonlarında bare-metal restore imkanı sunuyoruz. Nakivo ile Proxmox ve Hyper-V ortamlarında maliyet etkin replikasyon politikaları oluşturarak Akaretler\'deki küçük firmaların bile kurumsal düzey felaket kurtarma kapasitesine sahip olmasını sağlıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Beşiktaş\'taki startup ekipleri genellikle uzaktan ve hibrit modelde çalışıyor; ofis, ev ve kafe arasında kesintisiz iletişim ve güvenli dosya erişimi zorunlu. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı kuruyor; iki faktörlü kimlik doğrulama ve veri kaybı önleme politikalarını aktif ediyoruz. Google Workspace tercih eden dijital ajanlara Gmail, Drive ve Meet ekosistemini yapılandırıp özel alan adı entegrasyonunu tamamlıyoruz. VPN altyapısında WireGuard ile mobil cihazlarda pil dostu ve hızlı bağlantı, OpenVPN ile detaylı kullanıcı bazlı erişim loglaması ve IPsec ile Ortaköy-Etiler aksındaki farklı ofisler arası kalıcı site-to-site tünel sağlıyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Beşiktaş\'taki 5-30 kişilik startup\'lar tam zamanlı sistem yöneticisi istihdam etmek yerine IT outsource modeliyle hem maliyetten tasarruf ediyor hem de uzman desteğine erişiyor. Active Directory ile kullanıcı hesapları ve grup politikalarını merkezi yönetirken, Azure AD ile SaaS uygulamalarına conditional access ve MFA uyguluyoruz. Helpdesk portalımız üzerinden geliştirici ortamı sorunlarından ağ erişim taleplerine kadar her çağrı SLA\'ya uygun sürede çözülür. SIEM platformuyla tüm erişim logları merkezi olarak toplanır ve anomali tespiti yapılır. KVKK kapsamında müşteri ve kullanıcı verilerinin korunması için veri envanteri, erişim kontrol politikaları ve denetim izi kaydı sağlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Startup\'lar için uygun fiyatlı IT outsource paketi var mı?',
                a: 'Evet. 5-15 kişilik ekipler için özel başlangıç paketimiz mevcut. Active Directory, Azure AD, endpoint güvenliği ve helpdesk dahil temel hizmetleri aylık sabit ücretle sunuyoruz. Büyüdükçe paketi genişletebilirsiniz.',
            },
            {
                q: 'Coworking ofiste kendi ağımızı kurabilir miyiz?',
                a: 'Evet. VLAN segmentasyonu ile coworking alanının paylaşımlı ağından izole, güvenli bir kurumsal ağ oluşturuyoruz. Wi-Fi 6 erişim noktası ve pfSense firewall ile küçük ama kurumsal düzey altyapı kuruyoruz.',
            },
            {
                q: 'Proxmox ile VMware arasında startup için hangisi daha uygun?',
                a: 'Proxmox VE lisans maliyeti olmadan KVM sanallaştırma ve konteyner desteği sunar; bütçe odaklı startup\'lar için idealdir. VMware vSphere kurumsal düzey HA ve geniş ekosistemiyle büyüme planı olan firmalar için uygundur.',
            },
            {
                q: 'Uzaktan çalışan ekibimiz için VPN çözümü kurabilir misiniz?',
                a: 'Kesinlikle. WireGuard ile düşük gecikmeli modern VPN, OpenVPN ile detaylı erişim kontrolü veya IPsec ile site-to-site bağlantı kuruyoruz. İki faktörlü kimlik doğrulama ile güvenliği artırıyoruz.',
            },
            {
                q: 'Beşiktaş\'taki ofisimize ne kadar sürede geliyorsunuz?',
                a: 'Avrupa Yakası saha ekibimiz Beşiktaş bölgesine 15-25 dakikada ulaşabiliyor. Planlı bakım için haftalık program oluşturuyoruz; acil durumlarda öncelikli müdahale sağlıyoruz.',
            },
        ],
    },

    // ── BEYOĞLU ──
    {
        slug: 'beyoglu-it-destegi',
        title: 'Beyoğlu IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Beyoğlu IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Beyoğlu',
        geo: { lat: 41.0370, lng: 28.9770 },
        meta: 'Beyoğlu IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Beyoğlu, İstiklal Caddesi\'nden Galata Kulesi\'ne, Karaköy\'den Taksim Meydanı\'na kadar uzanan tarihi dokusuyla İstanbul\'un kültürel ve ticari kalbi. Otel zincirleri, butik restoranlar, sanat galerileri ve turizm acenteleri bu bölgenin iş profilini oluştururken, Karaköy ve Galata\'daki dönüştürülmüş atölye ofislerinde teknoloji firmaları ve kreatif ajanslar da hızla yaygınlaşıyor. Tarihi binaların altyapı kısıtlamaları modern IT çözümlerini zorlu ama bir o kadar gerekli kılıyor. Kozyatağı Bilişim olarak Beyoğlu\'nun benzersiz yapısına uygun, esnek ve güvenli BT hizmetleri sunuyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve yönetim',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall kurulumu; ESET, Kaspersky, Bitdefender uç nokta güvenliği',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 kablosuz ağ, VLAN, mesh ve PoE switch altyapısı',
            'Veeam, Acronis ve Nakivo ile 3-2-1 yedekleme kuralı; NAS ve bulut replikasyon',
            'Microsoft 365 ve Google Workspace kurumsal e-posta yönetimi ve göçü',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli uzaktan erişim (VPN)',
            'Tam kapsamlı IT outsource — Active Directory ve Azure AD ile merkezi kimlik yönetimi',
            '7/24 helpdesk, SIEM entegrasyonu ve merkezi loglama',
            'KVKK uyumlu veri saklama, erişim kontrolü ve denetim izi kaydı',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Beyoğlu\'ndaki tarihi binalarda sunucu odası kurmak alan kısıtlamaları nedeniyle zorlu olabiliyor; sanallaştırma ile minimum donanımla maksimum verim elde ediyoruz. VMware vSphere ile tek bir güçlü sunucu üzerinde onlarca sanal makine çalıştırarak fiziksel alan ihtiyacını minimize ediyoruz. Karaköy\'deki dönüştürülmüş atölye ofislerindeki firmalara Proxmox VE ile lisans maliyetsiz KVM sanallaştırma ve LXC konteyner desteği sunuyoruz. Galata bölgesindeki otel ve restoran zincirlerine Windows tabanlı POS ve rezervasyon sistemleri için Hyper-V failover cluster ile kesintisiz çalışma ortamı sağlıyoruz. Tüm sunucuları uzaktan izleme panelimizden proaktif takip ediyor, arıza öncesi müdahale ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Beyoğlu\'ndaki otel, restoran ve perakende işletmeleri POS terminalleri ve misafir Wi-Fi ağları üzerinden siber saldırılara açık hale gelebiliyor. Fortinet FortiGate ile PCI DSS uyumlu segmentasyon kuruyor, kredi kartı verilerinin işlendiği ağı tamamen izole ediyoruz. Sophos XGS ile synchronized security sayesinde bir uç noktadaki tehdit anında ağ seviyesinde bloklanıyor. Küçük butik oteller ve kafeler için pfSense ile uygun maliyetli Snort IDS/IPS koruması sunuyoruz. Uç nokta güvenliğinde ESET PROTECT ile merkezi yönetim konsolu, Kaspersky Endpoint Security ile gelişmiş tehdit istihbaratı ve Bitdefender GravityZone ile sandbox analizi kurarak İstiklal Caddesi çevresindeki işletmeleri çok katmanlı koruma altına alıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Beyoğlu\'nun tarihi yapılarında kalın taş duvarlar kablosuz sinyal yayılımını ciddi şekilde etkiliyor; standart çözümler genellikle yetersiz kalıyor. Profesyonel site survey ile duvar malzemesi ve kat planını analiz edip Wi-Fi 6 erişim noktalarının optimal konumlarını belirliyoruz. Cat6A yapısal kablolama ile mevcut kablo kanallarını değerlendirerek bina bütünlüğünü bozmadan modern altyapı kuruyoruz. VLAN segmentasyonuyla otel müşteri ağını, POS ağını ve yönetim ağını birbirinden izole ediyor, mesh topolojiyle çok katlı tarihi yapılarda kesintisiz kablosuz dolaşım sağlıyoruz. PoE switch altyapısıyla erişim noktalarına ve IP kameralara tek kablo üzerinden güç ve veri iletiyoruz. Fiber optik omurga ile binalar arası yüksek hızlı bağlantı kuruyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Beyoğlu\'ndaki otel ve restoranların rezervasyon sistemleri, müşteri veritabanları ve muhasebe kayıtları gün boyu aktif olarak güncelleniyor; veri kaybı doğrudan gelir kaybı demek. 3-2-1 kuralını uygulayarak yerel NAS\'a saatlik artımlı yedek, buluta günlük replikasyon ve şehir dışı veri merkezine haftalık tam kopya gönderiyoruz. Veeam Backup ile sanal makine düzeyinde SureBackup testi yaparak yedeklerin her zaman kurtarılabilir olduğunu doğruluyoruz. Acronis Cyber Protect ile POS sunucularında bare-metal restore imkanı sunarak farklı donanıma bile dakikalar içinde tam sistem kurtarma sağlıyoruz. Nakivo ile VMware ve Hyper-V ortamlarında maliyet etkin replikasyon yaparak Taksim ve Galata bölgesindeki müşterilerimizin iş sürekliliğini garanti ediyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Beyoğlu\'ndaki turizm acenteleri ve otel zincirleri uluslararası müşterilerle yoğun e-posta ve mesajlaşma trafiği yürütüyor; profesyonel e-posta altyapısı güvenilirlik ve kurumsal imaj açısından kritik. Microsoft 365 ile Exchange Online, Teams ve SharePoint kurulumu yaparak SPF, DKIM ve DMARC kayıtlarıyla e-posta sahteciliğini önlüyoruz. Google Workspace tercih eden işletmelere Gmail, Drive ve Meet ekosistemini yapılandırıp alan adı doğrulamasını tamamlıyoruz. VPN altyapısında WireGuard ile saha personelinin mobil cihazlarından güvenli erişim, OpenVPN ile kullanıcı bazlı politika yönetimi ve IPsec ile farklı şubelerdeki POS ve yönetim ağları arası kalıcı site-to-site tünel kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Beyoğlu\'ndaki otel ve restoran işletmecileri BT\'yi ana faaliyet alanları olarak görmez; bu nedenle IT outsource modeli bu sektör için biçilmiş kaftan. Active Directory ile tüm personel hesaplarını merkezi yönetirken, Azure AD ile bulut uygulamalarına conditional access ve MFA uyguluyoruz. Helpdesk ekibimiz POS arızalarından Wi-Fi sorunlarına kadar geniş yelpazede destek verir; tüm olaylar SIEM platformuna aktarılır ve merkezi loglanır. KVKK kapsamında otel müşteri verilerinin korunması özel hassasiyet taşır; veri envanteri çıkarıyor, erişim kontrol politikalarını oluşturuyor ve yıllık uyum denetim raporunu hazırlayarak Kurul\'a sunulacak belgeleri düzenliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Tarihi binadaki ofisimize kablolama yapabilir misiniz?',
                a: 'Evet. Koruma altındaki binalarda mevcut kablo kanallarını değerlendirip bina bütünlüğünü bozmadan Cat6A kablolama ve Wi-Fi 6 erişim noktaları kuruyoruz. Gerekli izinler konusunda da yönlendirme yapıyoruz.',
            },
            {
                q: 'Otel ve restoranlar için POS sistemi güvenliğini sağlıyor musunuz?',
                a: 'Evet. Fortinet FortiGate veya pfSense ile PCI DSS uyumlu ağ segmentasyonu kuruyor, POS trafiğini izole ediyoruz. ESET, Kaspersky veya Bitdefender ile POS terminallerinde uç nokta koruması sağlıyoruz.',
            },
            {
                q: 'Turizm sezonu yoğunluğuna göre esnek destek paketi var mı?',
                a: 'Evet. Yaz aylarında artırılmış destek saatleri ve ek saha ziyaretleri içeren sezonluk paketlerimiz mevcut. IT outsource sözleşmemiz kapsamında ihtiyaca göre esnek düzenleme yapıyoruz.',
            },
            {
                q: 'Misafir Wi-Fi ağını kurumsal ağdan nasıl ayırıyorsunuz?',
                a: 'VLAN segmentasyonu ile misafir ağını tamamen izole ediyoruz. Ayrı SSID, bant genişliği sınırlama ve captive portal ile misafir erişimini kontrol altında tutuyoruz. Fortinet veya Sophos firewall üzerinden politika uyguluyoruz.',
            },
            {
                q: 'KVKK kapsamında otel müşteri verileri için ne yapıyorsunuz?',
                a: 'Konaklama kayıtları, pasaport bilgileri ve ödeme verilerini kapsayan veri envanteri çıkarıyoruz. Active Directory ve Azure AD ile erişim kontrolü, SIEM ile merkezi loglama kurarak denetim izlenebilirliği sağlıyoruz.',
            },
        ],
    },

    // ── KAĞITHANE ──
    {
        slug: 'kagithane-it-destegi',
        title: 'Kağıthane IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Kağıthane IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Kağıthane',
        geo: { lat: 41.0819, lng: 28.9718 },
        meta: 'Kağıthane IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Kağıthane, son yıllarda Hamidiye, Çağlayan ve Seyrantepe bölgelerinde yükselen yeni nesil ofis parkları ve iş merkezleriyle İstanbul\'un en hızlı dönüşen ilçelerinden biri haline geldi. Eski sanayi alanlarının modern ofis komplekslerine dönüşmesiyle birlikte lojistik firmaları, e-ticaret şirketleri ve hafif sanayi kuruluşları bu bölgede yoğunlaşıyor. Kağıthane\'nin Levent ve Maslak\'a yakınlığı bölgeyi uygun maliyetli ofis arayışındaki firmalar için cazip kılıyor. Kozyatağı Bilişim olarak Kağıthane\'nin büyüyen iş ekosistemine güvenilir ve ölçeklenebilir IT altyapı hizmetleri sunuyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve yönetim',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall; ESET, Kaspersky ve Bitdefender endpoint güvenliği',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 kurumsal kablosuz ağ, VLAN, mesh ve PoE switch',
            'Veeam, Acronis ve Nakivo ile 3-2-1 yedekleme; NAS ve bulut hibrit depolama',
            'Microsoft 365 ve Google Workspace kurumsal e-posta kurulumu ve yönetimi',
            'WireGuard, OpenVPN ve IPsec VPN ile şifreli uzaktan erişim',
            'IT outsource — Active Directory ve Azure AD ile merkezi kimlik ve cihaz yönetimi',
            'Çok kanallı helpdesk, SIEM entegrasyonu ve merkezi loglama',
            'KVKK veri sınıflandırma, erişim denetimi ve uyum raporlaması',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Kağıthane\'deki yeni ofis parklarında sunucu odaları genellikle sıfırdan tasarlanıyor; bu da doğru sanallaştırma platformuyla başlamanın önemini artırıyor. VMware vSphere ile kurumsal düzey HA kümeleri kuruyor, DRS ile iş yüklerini otomatik dengeliyoruz. Çağlayan ve Hamidiye bölgesindeki KOBİ\'lere Proxmox VE ile lisans ücretsiz KVM sanallaştırma ve ZFS tabanlı veri bütünlüğü sunuyoruz. E-ticaret ve lojistik firmalarının yoğun veritabanı operasyonları için Hyper-V failover cluster ile donanım arızasında kesintisiz devam eden bir ortam sağlıyoruz. Haftalık kapasite raporlarıyla disk, CPU ve RAM kullanım trendlerini izliyor, darboğaz oluşmadan önce proaktif aksiyon alıyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Kağıthane\'deki e-ticaret firmaları ve lojistik şirketleri online ödeme verileri ve müşteri bilgileri nedeniyle siber saldırganların hedefinde. Fortinet FortiGate ile web application firewall ve anti-bot modülleri kurarak e-ticaret platformlarını DDoS ve SQL injection saldırılarından koruyoruz. Sophos XGS firewall\'un synchronized security özelliğiyle uç nokta ve ağ güvenliğini senkronize yönetiyor, bir tehdidi tespit eden bileşen diğerini anında bilgilendiriyor. Seyrantepe\'deki küçük sanayi firmalarına pfSense ile bütçe dostu Suricata IDS/IPS koruması sağlıyoruz. ESET PROTECT merkezi yönetim, Kaspersky gelişmiş davranış analizi ve Bitdefender makine öğrenme tabanlı tespit ile katmanlı endpoint güvenliği oluşturuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Kağıthane\'deki depo ve lojistik tesislerinde geniş alanları kapsayan kablosuz ağ tasarımı özellikli mühendislik gerektirir. Metal raflar ve yüksek tavanlı depolar sinyal yayılımını etkiler; profesyonel site survey ile bu engelleri analiz edip Wi-Fi 6 erişim noktalarının ideal pozisyonlarını belirliyoruz. Cat6A yapısal kablolama ile ofis alanlarına gigabit bağlantı, fiber optik omurga ile depo ve ofis binaları arası yüksek hızlı bağlantı kuruyoruz. VLAN segmentasyonuyla depo, ofis ve misafir ağlarını izole ediyor, mesh topolojiyle geniş alanlarda kesintisiz dolaşım sağlıyoruz. PoE switch altyapısıyla erişim noktaları, IP kameralar ve barkod tarayıcılara tek kablo üzerinden güç ve veri iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Kağıthane\'deki e-ticaret firmalarının sipariş veritabanları, stok bilgileri ve müşteri kayıtları 7/24 güncellendiğinden her dakika kaybedilen veri doğrudan ciro kaybıdır. 3-2-1 kuralını uyguluyoruz: yerel NAS\'a saatlik artımlı yedek, buluta günlük replikasyon ve şehir dışına haftalık tam kopya. Veeam Backup & Replication ile VMware ve Hyper-V ortamlarında Instant VM Recovery sayesinde dakikalar içinde sistemi yedekten ayağa kaldırıyoruz. Acronis Cyber Protect ile fiziksel ve sanal sunucularda bare-metal restore desteği sağlıyoruz. Nakivo ile maliyet etkin replikasyon politikaları oluşturarak Hamidiye ve Çağlayan\'daki müşterilerimizin RPO hedeflerini tutturuyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Kağıthane\'deki lojistik firmaları saha, depo ve merkez ofis arasında sürekli bilgi akışı yönetiyor; güvenli iletişim altyapısı operasyonun temelini oluşturuyor. Microsoft 365 ile Exchange Online, Teams ve SharePoint kurarak saha ekiplerinin mobil cihazlarından anlık iletişim ve dosya paylaşımını sağlıyoruz. Google Workspace tercih eden müşterilerimize Gmail, Drive ve Meet ekosistemini yapılandırıp SPF, DKIM ve DMARC ile e-posta güvenliğini garanti ediyoruz. VPN altyapısında WireGuard ile depo personelinin el terminallerinden güvenli bağlantı, OpenVPN ile kullanıcı bazlı erişim kontrolü ve IPsec ile şubeler arası kalıcı site-to-site tünel kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Kağıthane\'deki hızla büyüyen firmalar her yeni depo veya şube açılışında ek cihaz provizyon, ağ genişletme ve yetkilendirme süreçleriyle karşılaşıyor. IT outsource modelimizle Active Directory group policy ile standart cihaz konfigürasyonu, Azure AD conditional access ile lokasyon ve cihaz bazlı erişim kontrolü sağlıyoruz. Helpdesk ekibimiz depo el terminali sorunlarından ERP erişim taleplerine kadar geniş yelpazede destek veriyor; tüm olaylar SIEM platformuna aktarılır. Merkezi loglama altyapısıyla erişim kayıtları toplanır ve raporlanır. KVKK kapsamında e-ticaret müşteri verilerinin korunması için veri envanteri, erişim kontrol politikaları ve yıllık uyum denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Kağıthane\'deki depomuzda Wi-Fi kapsama alanını genişletebilir misiniz?',
                a: 'Evet. Profesyonel site survey ile depo düzeninizi analiz edip Wi-Fi 6 erişim noktalarını metal raflar ve yüksek tavanları dikkate alarak konumlandırıyoruz. Mesh topoloji ile geniş alanlarda kesintisiz kapsama sağlıyoruz.',
            },
            {
                q: 'E-ticaret sitemiz için özel güvenlik çözümü sunuyor musunuz?',
                a: 'Evet. Fortinet FortiGate ile web application firewall, anti-bot ve DDoS koruması kuruyor, PCI DSS uyumlu ağ segmentasyonu sağlıyoruz. ESET, Kaspersky veya Bitdefender ile sunucu ve endpoint koruması ekliyoruz.',
            },
            {
                q: 'Lojistik firmalar için saha cihazlarına VPN nasıl kuruyorsunuz?',
                a: 'WireGuard ile el terminalleri ve mobil cihazlarda düşük gecikmeli, pil dostu VPN tünelleri kuruyoruz. OpenVPN ile kullanıcı bazlı erişim politikaları uygulayarak sadece yetkili personelin merkezi sistemlere erişmesini sağlıyoruz.',
            },
            {
                q: 'Yeni ofis parkına taşınıyoruz, altyapıyı sıfırdan kurabilir misiniz?',
                a: 'Kesinlikle. Sunucu odası tasarımı, Cat6A kablolama, fiber optik omurga, Wi-Fi 6 planlama, firewall kurulumu ve sanallaştırma dahil tüm altyapıyı anahtar teslim kuruyoruz.',
            },
            {
                q: 'IT outsource sözleşmesinde nelere dikkat etmeliyiz?',
                a: 'SLA süreleri, kapsam dahilindeki hizmetler, ek maliyet olup olmadığı ve çıkış koşulları en önemli maddeler. Biz gizli maliyet uygulamıyor, tüm hizmetleri tek faturada sunuyor ve esnek çıkış koşulları sağlıyoruz.',
            },
        ],
    },

    // ── SARIYER ──
    {
        slug: 'sariyer-it-destegi',
        title: 'Sarıyer IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Sarıyer IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Sarıyer',
        geo: { lat: 41.1668, lng: 29.0500 },
        meta: 'Sarıyer IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek. Maslak-Sarıyer hattı.',
        intro: 'Sarıyer, İstinye Park AVM\'nin çevresinde oluşan ticari ekosistem, Tarabya ve Yeniköy\'deki butik işletmeler ve Maslak sınırındaki ofis bölgeleriyle çeşitli bir iş dokusuna sahip. Boğaz kıyısındaki lüks otel ve restoranlardan İstinye\'deki ticaret merkezlerine, Bahçeköy\'deki eğitim kurumlarından Ayazağa sınırındaki teknoloji firmalarına kadar geniş bir sektör yelpazesi bu ilçede faaliyet gösteriyor. Kozyatağı Bilişim olarak Sarıyer genelindeki işletmelere sunucu yönetiminden KVKK uyumuna kadar kapsamlı yönetilen IT hizmetleri sunuyoruz.',
        bullets: [
            'VMware vSphere, Proxmox VE ve Hyper-V ile sunucu sanallaştırma ve yüksek erişilebilirlik',
            'Fortinet FortiGate, Sophos XGS ve pfSense firewall kurulumu; ESET, Kaspersky, Bitdefender endpoint güvenliği',
            'Cat6A ve fiber optik kablolama, Wi-Fi 6 kablosuz ağ tasarımı, VLAN, mesh ve PoE switch',
            'Veeam, Acronis ve Nakivo ile 3-2-1 kuralına uygun yedekleme; NAS ve bulut hibrit depolama',
            'Microsoft 365 ve Google Workspace kurumsal e-posta ve iş birliği araçları',
            'WireGuard, OpenVPN ve IPsec tabanlı güvenli uzaktan erişim (VPN)',
            'IT outsource — Active Directory ve Azure AD ile merkezi kullanıcı ve cihaz yönetimi',
            'Helpdesk çağrı sistemi, SIEM entegrasyonu ve merkezi loglama',
            'KVKK veri envanteri, erişim kontrolü ve teknik tedbir raporlaması',
        ],
        sections: [
            {
                title: 'Sunucu Yönetimi ve Sanallaştırma',
                text: 'Sarıyer\'in geniş coğrafyasında İstinye\'deki ticaret merkezlerinden Bahçeköy\'deki eğitim kurumlarına kadar farklı sektörlerin sunucu ihtiyaçları birbirinden ayrışıyor. VMware vSphere ile kurumsal düzey HA kümeleri kuruyor, vMotion ile bakım sırasında iş yüklerini kesintisiz taşıyoruz. İstinye Park çevresindeki perakende ve hizmet sektörü müşterilerimize Proxmox VE ile lisans maliyetsiz sanallaştırma ve LXC konteyner desteği sunuyoruz. Tarabya ve Yeniköy\'deki otel ve restoranların POS ve rezervasyon sistemleri için Hyper-V failover cluster ile donanım arızasına karşı otomatik yük devri sağlıyoruz. Tüm ortamları uzaktan izleme panelimizden 7/24 takip edip proaktif bakım gerçekleştiriyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Sarıyer\'deki otel, restoran ve perakende işletmeleri online rezervasyon sistemleri ve POS terminalleri üzerinden siber tehditlere maruz kalabiliyor. Fortinet FortiGate ile web filtreleme, IPS ve anti-bot modülleri kurarak özellikle İstinye bölgesindeki ticari işletmeleri koruma altına alıyoruz. Sophos XGS firewall\'un heartbeat özelliğiyle uç noktadaki zararlı yazılım ağa yayılmadan izole ediliyor. Yeniköy ve Tarabya\'daki küçük butik işletmelere pfSense ile uygun maliyetli Snort IDS/IPS koruması sağlıyoruz. ESET PROTECT ile merkezi endpoint yönetimi, Kaspersky ile exploit önleme ve Bitdefender GravityZone ile makine öğrenme tabanlı zararlı yazılım tespiti sunarak katmanlı güvenlik oluşturuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Sarıyer\'in Boğaz kıyısındaki tarihi yapılardan modern iş merkezlerine kadar her bina farklı kablolama mühendisliği gerektiriyor. Cat6A yapısal kablolama ile ofis alanlarına 10 Gbps destekli altyapı kurarken, binalar arası fiber optik omurga bağlantısı sağlıyoruz. İstinye Park çevresindeki otellerde ve restoranlarda Wi-Fi 6 erişim noktalarıyla yoğun misafir trafiğine rağmen tutarlı performans elde ediyoruz. VLAN segmentasyonuyla kurumsal, misafir ve POS ağlarını birbirinden izole ediyor, mesh topolojiyle geniş alanlarda ve çok katlı yapılarda kesintisiz dolaşım sağlıyoruz. PoE switch altyapısıyla erişim noktaları ve güvenlik kameralarına tek kablo üzerinden hem veri hem güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Sarıyer\'deki eğitim kurumlarının öğrenci kayıtları, otel ve restoranların müşteri verileri ve ticaret merkezlerindeki satış kayıtları düzenli yedekleme gerektiren kritik varlıklar. 3-2-1 kuralıyla yerel NAS\'a saatlik artımlı yedek, buluta günlük replikasyon ve şehir dışı veri merkezine haftalık tam kopya gönderiyoruz. Veeam Backup ile VMware ve Hyper-V ortamlarında artımlı yedek alıyor, SureBackup ile kurtarılabilirliği otomatik test ediyoruz. Acronis Cyber Protect ile fiziksel sunucularda bare-metal restore desteği sağlıyoruz. Nakivo ile maliyet etkin replikasyon yaparak Bahçeköy\'deki eğitim kurumlarından İstinye\'deki ticari işletmelere kadar tüm müşterilerimizin iş sürekliliğini garanti ediyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Sarıyer\'in geniş coğrafyasında İstinye\'den Bahçeköy\'e, Tarabya\'dan Maslak sınırına kadar dağınık lokasyonlardaki ekiplerin merkezi sistemlere güvenli erişimi kritik. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı entegre kurarak SPF, DKIM ve DMARC yapılandırmasıyla e-posta güvenliğini sağlıyoruz. Google Workspace tercih eden işletmelere Gmail, Drive ve Meet ekosistemini yapılandırıp veri göçü hizmeti veriyoruz. VPN altyapısında WireGuard ile Boğaz kıyısındaki otellerin saha personeline düşük gecikmeli bağlantı, OpenVPN ile kullanıcı bazlı detaylı erişim loglaması ve IPsec ile farklı lokasyonlar arası kalıcı site-to-site tünel kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Sarıyer\'deki birçok işletme mevsimsel yoğunluk farklılıkları yaşıyor; yaz aylarında turizm sektörü pik yaparken eğitim kurumları tatile giriyor. IT outsource modelimiz bu değişken ihtiyaçlara uyum sağlar: Active Directory ile kullanıcı yönetimini merkezi politikalarla standartlaştırırken, Azure AD conditional access ile konum ve cihaz bazlı erişim kontrolü uyguluyoruz. Helpdesk portalımız üzerinden açılan çağrılar SLA sürelerine uygun çözülür; tüm olaylar SIEM platformuna aktarılarak merkezi loglanır. KVKK kapsamında özellikle otel ve eğitim sektörünün hassas verilerini korumak için veri envanteri çıkarıyor, erişim kontrol politikalarını oluşturuyor ve yıllık uyum denetim raporunu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Sarıyer\'in uzak bölgelerine saha desteği veriyor musunuz?',
                a: 'Evet. İstinye, Tarabya, Yeniköy ve Bahçeköy dahil Sarıyer geneline planlı bakım ziyaretleri düzenliyoruz. Avrupa Yakası saha ekibimiz İstinye bölgesine 20-30 dakikada ulaşabiliyor.',
            },
            {
                q: 'Otel ve restoran sektörü için mevsimsel destek paketiniz var mı?',
                a: 'Evet. Yaz aylarında artırılmış destek saatleri ve ek saha müdahalesi içeren sezonluk paketler sunuyoruz. IT outsource sözleşmemiz kapsamında mevsimsel ihtiyaçlara göre esnek düzenleme yapıyoruz.',
            },
            {
                q: 'Eğitim kurumları için özel IT çözümleriniz var mı?',
                a: 'Evet. Öğrenci ve personel ağlarını VLAN ile izole ediyor, Active Directory ile merkezi hesap yönetimi sağlıyoruz. Microsoft 365 Education veya Google Workspace for Education kurulumu ve yönetimi yapıyoruz.',
            },
            {
                q: 'İstinye Park çevresindeki mağazamız için POS güvenliği nasıl sağlanır?',
                a: 'Fortinet FortiGate veya pfSense ile POS ağını VLAN segmentasyonuyla izole ediyor, PCI DSS uyumlu altyapı kuruyoruz. ESET veya Bitdefender ile POS terminallerinde endpoint koruması sağlıyoruz.',
            },
            {
                q: 'Sunucu odamız yok, tamamen bulut çözüm önerir misiniz?',
                a: 'Kesinlikle. Azure veya yerli bulut sağlayıcılarda VMware veya Hyper-V tabanlı sanal sunucu kuruyor, Veeam veya Nakivo ile otomatik yedekleme yapıyoruz. Hibrit model de uygulanabilir.',
            },
        ],
    },
];
