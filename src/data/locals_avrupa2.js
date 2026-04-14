// Yerel landing page verisi — İstanbul Avrupa Yakası ilçe bazlı SEO sayfaları (Bölüm 2)
// Her sayfa benzersiz içerikle oluşturulmuştur; tüm marka ve ürünler her sayfada yer alır.
export const avrupaLocals2 = [
    // ── BAKIRKÖY ──
    {
        slug: 'bakirkoy-it-destegi',
        title: 'Bakırköy IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Bakırköy IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Bakırköy',
        geo: { lat: 40.9819, lng: 28.8719 },
        meta: 'Bakırköy IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Bakırköy, İstanbul Avrupa Yakası\'nın en köklü ticaret merkezlerinden biridir. Sahil şeridindeki oteller, Carousel AVM çevresindeki perakende zincirleri, İncirli ve Osmaniye\'deki sağlık kuruluşları ve Ataköy\'deki profesyonel hizmet ofisleri yoğun bir dijital altyapı ihtiyacı yaratır. Bölgedeki hastane grupları ve poliklinikler hasta veri güvenliğini ön planda tutarken, ticari işletmeler kesintisiz POS ve ERP sistemleri talep ediyor. Kozyatağı Bilişim olarak Bakırköy\'deki müşterilerimize planlı bakım ve acil müdahale hizmeti sunuyor, İncirli Caddesi\'nden Ataköy Marina\'ya kadar tüm bölgeyi kapsıyoruz.',
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
                text: 'Bakırköy\'deki hastane grupları ve poliklinikler hasta bilgi sistemi (HBYS) sunucularının 7/24 çalışmasını zorunlu kılar; beş dakikalık bir kesinti bile randevu akışını durdurur. VMware vSphere HA kümeleriyle sunucu arızasında iş yüklerini otomatik devralıyor, vMotion ile bakım pencerelerinde sıfır kesinti sağlıyoruz. Carousel AVM çevresindeki perakende zincirleri için Proxmox VE üzerinde POS sunucularını konteyner bazlı çalıştırıyor, lisans maliyetini minimumda tutuyoruz. Ataköy\'deki hukuk büroları ve muhasebe ofislerinde Windows Server ağırlıklı ortamlar yaygın olduğundan Hyper-V failover cluster yapılandırmasıyla yedeklilik sağlıyoruz. İncirli Caddesi\'ndeki ticari plazalarda sunucu odası sıcaklık ve nem değerlerini uzaktan izliyor, eşik aşımlarında anında müdahale ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Bakırköy\'deki sağlık kuruluşları hasta verilerini KVKK kapsamında korumak zorundadır ve siber güvenlik ihmal edilemez. Fortinet FortiGate next-gen firewall ile hastane ağlarını segmente ediyor, medikal cihaz trafiğini izole ediyoruz. Sophos XGS synchronized security yaklaşımıyla Ataköy\'deki ofis bloklarında firewall ile uç nokta korumasını tek panelden yönetiyoruz. Bütçe odaklı Osmaniye\'deki küçük işletmelere pfSense ile ticari seviyede IDS/IPS koruması sunuyoruz. Uç nokta güvenliğinde ESET PROTECT merkezi konsol, Kaspersky Endpoint Security gelişmiş davranış analizi ve Bitdefender GravityZone makine öğrenme tabanlı tespit katmanlarını birlikte devreye alıyoruz. Üç ayda bir sızma testi yaparak Bakırköy\'deki müşterilerimizin güvenlik duruşunu sürekli iyileştiriyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Bakırköy\'ün eski yapı stoku kablolama mühendisliğinde özel çözümler gerektirir; İncirli\'deki tarihi binalarda kablo kanalları sınırlıdır. Cat6A yapısal kablolama ile 10 Gbps destekli altyapı kuruyor, Ataköy Towers gibi çok katlı yapılarda fiber optik omurga bağlantısı sağlıyoruz. Wi-Fi 6 erişim noktalarıyla Carousel AVM çevresindeki yoğun ofis katlarında yüksek kapasiteli kablosuz ağ oluşturuyoruz. VLAN segmentasyonu ile sağlık kuruluşlarında hasta verileri ve misafir ağlarını izole ediyor, mesh topoloji ile büyük ofis alanlarında kesintisiz dolaşım sağlıyoruz. PoE switch altyapısıyla IP kameralar ve kablosuz erişim noktalarına tek kablo üzerinden güç ve veri iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Bakırköy\'deki sağlık sektörü müşterilerimiz için hasta kayıtlarının kaybı hem hukuki hem operasyonel felakettir. 3-2-1 yedekleme kuralını temel alarak üç kopya, iki farklı ortam ve bir şehir dışı kopyayla veri güvenliğini garanti ediyoruz. Veeam Backup & Replication ile HBYS sunucularının artımlı yedeklerini alıyor, SureBackup ile kurtarılabilirliği otomatik test ediyoruz. Acronis Cyber Protect platformuyla Ataköy\'deki ofislerde fiziksel ve sanal sunucuları tek panelden yedekliyor, bare-metal restore imkanı sunuyoruz. Nakivo Backup ile Carousel AVM bölgesindeki perakende müşterilerimizin POS verilerini maliyet etkin şekilde replike ediyoruz. Yerel NAS cihazına saatlik, buluta günlük yedek göndererek RTO ve RPO hedeflerini tutturuyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Bakırköy\'deki profesyonel hizmet firmaları müvekkil bilgilerini e-posta ile sıkça paylaşır; bu iletişimin şifreli ve güvenli olması şarttır. Microsoft 365 Business Premium ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor, SPF, DKIM ve DMARC kayıtlarıyla sahtecilik girişimlerini engelliyoruz. Google Workspace tercih eden Osmaniye\'deki ticaret firmalarına Gmail, Drive ve Meet ekosistemini yapılandırıyoruz. Uzaktan erişimde WireGuard ile düşük gecikmeli VPN tünelleri kuruyor, OpenVPN Access Server ile kullanıcı bazlı erişim politikaları yönetiyoruz. Ataköy\'deki şirketlerin şubeleriyle IPsec site-to-site tünelleriyle kalıcı şifreli bağlantı oluşturuyoruz. Tüm VPN bağlantıları iki faktörlü kimlik doğrulama ile korunur.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Bakırköy\'deki orta ölçekli sağlık kuruluşları ve hukuk büroları için tam zamanlı IT ekibi kurmak ağır bir maliyet kalemidir. IT outsource modelimizde aylık sabit ücretle sistem yöneticisi, network uzmanı ve helpdesk operatörü hizmeti alırsınız. Active Directory group policy\'leriyle İncirli\'deki ofislerde kullanıcı yetkilendirmesini standartlaştırıyor, Azure AD conditional access ile bulut uygulamalarına koşullu erişim sağlıyoruz. Helpdesk portalımız üzerinden açılan çağrılar ortalama 20 dakikada ilk yanıtı alır. KVKK kapsamında veri envanteri çıkarıyor, erişim kontrol politikalarını oluşturuyor ve SIEM altyapısıyla tüm erişim loglarını merkezi olarak saklıyoruz. Bakırköy\'deki sağlık müşterilerimize yıllık uyum denetim raporu hazırlayıp Kurul\'a sunulacak belgeleri düzenliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Bakırköy\'deki hastanelere özel IT destek paketiniz var mı?',
                a: 'Evet, sağlık sektörüne özel HBYS sunucu yönetimi, KVKK uyumlu hasta verisi yedekleme ve medikal cihaz ağ segmentasyonu içeren paketlerimiz mevcuttur.',
            },
            {
                q: 'Carousel AVM bölgesindeki mağazalara POS sistemi desteği veriyor musunuz?',
                a: 'Evet, POS sunucularını Proxmox VE veya Hyper-V üzerinde sanallaştırıyor, Veeam ile saatlik yedekleme yapıyor ve arıza anında dakikalar içinde kurtarma sağlıyoruz.',
            },
            {
                q: 'Bakırköy\'deki eski binalarda network altyapısı kurulumu mümkün mü?',
                a: 'Eski yapı stokunda kablo kanalları sınırlı olsa da Cat6A kablolama ve Wi-Fi 6 mesh çözümlerle profesyonel ağ altyapısı kuruyoruz. Gerektiğinde fiber optik takviyesi yapıyoruz.',
            },
            {
                q: 'Firewall seçiminde Bakırköy\'deki işletmelere ne öneriyorsunuz?',
                a: 'Çok şubeli yapılar için Fortinet FortiGate SD-WAN, tek lokasyonlu ofisler için Sophos XGS, bütçe odaklı işletmeler için pfSense öneriyoruz. Ağ büyüklüğünüze göre ücretsiz keşif ziyareti yapıyoruz.',
            },
            {
                q: 'Bakırköy\'e saha desteği ne kadar sürede ulaşır?',
                a: 'Planlı bakım randevuları önceden belirlenir. Acil arızalarda Bakırköy\'e ortalama 45 dakika içinde saha ekibi gönderiyoruz; uzaktan bağlantı ile anında müdahale de mümkündür.',
            },
        ],
    },

    // ── BAHÇELİEVLER ──
    {
        slug: 'bahcelievler-it-destegi',
        title: 'Bahçelievler IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Bahçelievler IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Bahçelievler',
        geo: { lat: 41.0002, lng: 28.8594 },
        meta: 'Bahçelievler IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek.',
        intro: 'Bahçelievler, E-5 otoyolu boyunca uzanan yoğun bir KOBİ havzasıdır. Yenibosna\'daki iş merkezleri, Şirinevler\'deki ticaret ofisleri, Kocasinan\'daki küçük üretim atölyeleri ve Bahçelievler Caddesi\'ndeki perakende mağazaları bölgenin ekonomik dinamizmini yansıtır. Havalimanına yakınlığı nedeniyle lojistik ve dış ticaret firmaları burada yoğunlaşmıştır. Kozyatağı Bilişim olarak Bahçelievler\'deki işletmelere sunucu odasından son kullanıcı bilgisayarına kadar tüm teknoloji katmanlarını tek sözleşmeyle yönetiyoruz.',
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
                text: 'Bahçelievler\'deki KOBİ\'lerin büyük çoğunluğu muhasebe, ERP ve CRM uygulamalarını yerel sunucularda barındırır; bu sunucuların sürekliliği doğrudan gelir kaybını etkiler. VMware vSphere ile Yenibosna\'daki iş merkezlerinde HA kümesi kuruyor, DRS ile iş yüklerini sunucular arasında otomatik dengeliyoruz. Şirinevler\'deki küçük ofisler için Proxmox VE tercih ederek lisans maliyetini sıfıra indirip KVM tabanlı sanallaştırma ve LXC konteyner desteği sunuyoruz. Kocasinan\'daki üretim firmalarında Windows Server ağırlıklı yapılarda Hyper-V failover cluster yapılandırıyoruz. Tüm sunucuları proaktif izleme panelimizden 7/24 takip ediyor, CPU ve disk doluluk eşiklerinde anlık alarm üretiyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Bahçelievler\'in yoğun ticari trafiği siber saldırganlar için cazip bir hedef oluşturuyor; özellikle Yenibosna\'daki dış ticaret firmalarının e-posta güvenliği kritik önemdedir. Fortinet FortiGate ile next-gen firewall kurarak gelişmiş tehdit koruması ve SSL denetimi sağlıyoruz. Sophos XGS serisinin synchronized security özelliğiyle Şirinevler\'deki çok katlı ofis bloklarında merkezi güvenlik yönetimi sunuyoruz. Bütçe odaklı müşterilerimize pfSense ile Snort tabanlı IDS/IPS koruması kuruyoruz. Uç nokta güvenliğinde ESET PROTECT ile merkezi konsol yönetimi, Kaspersky Endpoint Security ile gelişmiş fidye yazılımı koruması ve Bitdefender GravityZone ile makine öğrenme tabanlı zararlı tespit katmanını devreye alıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Bahçelievler\'deki iş merkezlerinde onlarca firma aynı binayı paylaşır ve ağ çakışmaları sıkça yaşanır. Cat6A yapısal kablolama ile her ofisin bağımsız 10 Gbps destekli altyapıya sahip olmasını sağlıyoruz. Yenibosna\'daki büyük ofis parklarında binalar arası fiber optik omurga bağlantısı kurarak yüksek hızlı iletişim sağlıyoruz. Wi-Fi 6 erişim noktalarıyla Şirinevler\'deki kalabalık ofis katlarında OFDMA teknolojisi sayesinde her cihaza adil bant genişliği dağıtıyoruz. VLAN segmentasyonu ile departman ve misafir ağlarını izole ediyor, mesh topoloji ile kat geçişlerinde bağlantı kopmasını önlüyoruz. PoE switch altyapısıyla erişim noktaları ve IP telefonlara tek kablo üzerinden güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Bahçelievler\'deki dış ticaret firmalarında gümrük belgeleri ve fatura arşivleri hayati önem taşır; veri kaybı ciddi cezai yaptırımlara yol açabilir. 3-2-1 kuralını uygulayarak üç kopya, iki farklı ortam ve bir şehir dışı kopyayla maksimum koruma sağlıyoruz. Veeam Backup & Replication ile Yenibosna\'daki müşterilerimizin ERP sunucularını artımlı yedekliyor, SureBackup ile yedek bütünlüğünü otomatik doğruluyoruz. Acronis Cyber Protect platformuyla Kocasinan\'daki üretim firmalarının fiziksel sunucularına bare-metal restore desteği veriyoruz. Nakivo Backup ile Hyper-V ortamlarında maliyet optimize replikasyon yapıyoruz. Yerel NAS ve bulut hibrit yedekleme stratejisiyle hem hız hem güvenlik dengesini koruyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Bahçelievler\'deki dış ticaret ofislerinde yurt dışı müşterilerle güvenli ve kesintisiz e-posta iletişimi vazgeçilmezdir. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor, SPF, DKIM ve DMARC yapılandırmasıyla e-posta sahteciliğini önlüyoruz. Google Workspace tercih eden Şirinevler\'deki ajanslar ve reklam firmalarına Gmail, Drive ve Meet ekosistemini yapılandırıyoruz. Uzaktan erişimde WireGuard ile modern VPN tünelleri kuruyor, OpenVPN Access Server ile kullanıcı bazlı erişim kontrolü sağlıyoruz. Yenibosna\'daki çok şubeli firmaların lokasyonları arasında IPsec site-to-site tünelleriyle kalıcı şifreli bağlantı oluşturuyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Bahçelievler\'deki KOBİ\'ler büyüdükçe her yeni çalışan ek bilgisayar, hesap ve yetki tanımı gerektirir. IT outsource modelimizde Active Directory group policy\'leriyle Yenibosna\'daki ofislerde kullanıcı yetkilendirmesini standartlaştırıyor, Azure AD conditional access ile bulut uygulamalarına güvenli erişim sağlıyoruz. Helpdesk ekibimiz telefon, e-posta ve uzaktan bağlantıyla destek verirken tüm olaylar SIEM platformuna otomatik aktarılır. Kocasinan\'daki üretim firmalarında KVKK kapsamında kişisel veri işleme envanteri hazırlıyor, erişim kontrol politikalarını oluşturuyoruz. Merkezi loglama altyapısıyla tüm erişim kayıtlarını saklıyor ve yıllık uyum denetim raporu düzenliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Bahçelievler\'deki dış ticaret firmalarına özel çözümleriniz var mı?',
                a: 'Evet, gümrük ve fatura arşivleme, çok dilli e-posta yapılandırması, şubeler arası IPsec VPN ve KVKK uyumlu veri saklama çözümlerimiz dış ticaret firmalarına özel tasarlanmıştır.',
            },
            {
                q: 'Yenibosna\'daki iş merkezlerinde network altyapısı kurulumu yapıyor musunuz?',
                a: 'Evet, Yenibosna\'daki plazalarda Cat6A kablolama, fiber optik omurga ve Wi-Fi 6 kurumsal kablosuz ağ kurulumu gerçekleştiriyoruz. VLAN ile firma ağlarını izole ediyoruz.',
            },
            {
                q: 'Bahçelievler\'de hangi firewall markasını öneriyorsunuz?',
                a: 'Dış ticaret ve lojistik firmaları için Fortinet FortiGate SD-WAN, orta ölçekli ofisler için Sophos XGS, küçük işletmeler için pfSense öneriyoruz. Ücretsiz keşif ziyareti ile ihtiyacınızı belirliyoruz.',
            },
            {
                q: 'Bahçelievler\'e acil saha desteği ne kadar sürede ulaşır?',
                a: 'Acil arızalarda Bahçelievler\'e ortalama 50 dakikada saha ekibi gönderiyoruz. Uzaktan bağlantı ile birçok sorunu anında çözebiliyoruz; planlı bakımlar önceden takvime alınır.',
            },
            {
                q: 'Küçük üretim atölyelerine de IT desteği sağlıyor musunuz?',
                a: 'Evet, Kocasinan ve çevresindeki üretim atölyelerine sunucu yönetimi, yedekleme, endpoint güvenliği ve KVKK uyum hizmeti veriyoruz. Ölçeğe uygun esnek paketlerimiz mevcuttur.',
            },
        ],
    },

    // ── BAĞCILAR ──
    {
        slug: 'bagcilar-it-destegi',
        title: 'Bağcılar IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Bağcılar IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Bağcılar',
        geo: { lat: 41.0370, lng: 28.8394 },
        meta: 'Bağcılar IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Bağcılar, İstanbul\'un sanayiden ticarete geçiş sürecini en yoğun yaşayan ilçelerinden biridir. Mahmutbey sanayi bölgesindeki üretim tesisleri, Kirazlı\'daki ticaret merkezleri, Yıldıztepe\'deki KOBİ ofisleri ve Demirkapı\'daki lojistik depoları bölgenin çok katmanlı ekonomik yapısını oluşturur. Tekstilden gıdaya, plastikten elektroniğe çeşitli sektörlerde faaliyet gösteren binlerce işletme dijital dönüşüm sürecinde güvenilir bir BT ortağına ihtiyaç duyuyor. Kozyatağı Bilişim olarak Bağcılar\'daki firmalar için uygun maliyetli ve ölçeklenebilir IT çözümleri sunuyoruz.',
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
                text: 'Bağcılar\'daki üretim tesisleri ve ticaret ofisleri MRP, ERP ve muhasebe yazılımlarını yerel sunucularda çalıştırır; bir saatlik kesinti bile üretim hattını durdurabilir. VMware vSphere ile Mahmutbey sanayi bölgesindeki büyük üretim firmalarında HA kümeleri kuruyor, DRS ile yük dengeleme sağlıyoruz. Kirazlı\'daki ticaret merkezlerindeki KOBİ\'ler için Proxmox VE ile lisans maliyetsiz sanallaştırma sunuyor, ZFS ile veri bütünlüğünü garanti ediyoruz. Yıldıztepe\'deki Windows ağırlıklı ofislerde Hyper-V failover cluster ile donanım arızasında otomatik yük devri sağlıyoruz. Tüm sunucuları izleme panelimizden takip ederek disk doluluk ve CPU kullanım eşiklerinde proaktif müdahale ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Bağcılar\'da sanayiden ticarete geçiş sürecinde birçok firma ilk kez kurumsal ağ güvenliği ile tanışıyor. Fortinet FortiGate next-gen firewall ile Mahmutbey\'deki üretim tesislerinde OT ve IT ağlarını segmente ediyor, endüstriyel kontrol sistemlerini izole ediyoruz. Sophos XGS synchronized security ile Kirazlı\'daki çok kiracılı ofis bloklarında merkezi güvenlik yönetimi sağlıyoruz. Demirkapı\'daki küçük depolar ve atölyeler için pfSense ile bütçe dostu ama kurumsal düzey IDS/IPS koruması kuruyoruz. Uç noktalarda ESET PROTECT merkezi yönetim, Kaspersky Endpoint Security ransomware koruması ve Bitdefender GravityZone yapay zeka tabanlı tehdit tespiti ile çok katmanlı savunma oluşturuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Bağcılar\'ın sanayi yapılarında geniş üretim alanları, yüksek tavanlar ve metal raflar kablosuz sinyal yayılımını zorlaştırır. Cat6A yapısal kablolama ile fabrika zeminlerinde 10 Gbps destekli altyapı kuruyor, üretim alanı ile ofis bloğu arasında fiber optik omurga çekiyoruz. Wi-Fi 6 erişim noktalarıyla Mahmutbey\'deki depo alanlarında el terminalleri ve barkod okuyucular için stabil kablosuz bağlantı sağlıyoruz. VLAN segmentasyonu ile üretim ağı, ofis ağı ve misafir ağını tamamen izole ediyoruz. Mesh topoloji ile Yıldıztepe\'deki çok katlı ofislerde kesintisiz dolaşım, PoE switch altyapısıyla IP kamera ve erişim noktalarına tek kablo üzerinden güç sağlıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Bağcılar\'daki üretim firmalarında kalite kontrol verileri, müşteri siparişleri ve muhasebe kayıtları kaybedildiğinde üretim durur ve cezai yaptırımlar başlar. 3-2-1 kuralıyla üç kopya, iki farklı ortam ve bir şehir dışı kopyayla tam koruma sağlıyoruz. Veeam Backup ile Mahmutbey\'deki fabrikaların ERP sunucularını artımlı yedekliyor, Instant VM Recovery ile dakikalar içinde geri dönüş sağlıyoruz. Acronis Cyber Protect ile Kirazlı\'daki ofislerde fiziksel sunuculara bare-metal restore desteği sunuyoruz. Nakivo Backup ile VMware ve Hyper-V ortamlarında maliyet etkin replikasyon gerçekleştiriyoruz. NAS cihazına saatlik, buluta günlük yedek göndererek veri kaybı riskini minimuma indiriyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Bağcılar\'daki tekstil ve gıda firmalarında tedarikçi iletişimi büyük ölçüde e-posta üzerinden yürür; güvenilir bir e-posta altyapısı sipariş akışını doğrudan etkiler. Microsoft 365 ile Exchange Online kurulumu yapıyor, SPF, DKIM ve DMARC kayıtlarıyla sahte e-posta girişimlerini engelliyoruz. Google Workspace tercih eden Yıldıztepe\'deki teknoloji firmalarına Gmail ve Drive ekosistemini yapılandırıyoruz. Uzaktan erişimde WireGuard ile düşük gecikmeli modern VPN, OpenVPN Access Server ile kullanıcı bazlı politika yönetimi sağlıyoruz. Mahmutbey\'deki çok lokasyonlu üretim firmalarının tesisleri arasında IPsec site-to-site tünelleriyle güvenli kalıcı bağlantı kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Bağcılar\'daki üretim ve ticaret firmalarının çoğu BT departmanı olmadan faaliyet gösterir; teknik sorunlar üretimi doğrudan etkiler. IT outsource modelimizle aylık sabit ücretle sistem yöneticisi ve helpdesk desteği sağlıyoruz. Active Directory ile Mahmutbey\'deki fabrikalarda vardiyalı personelin erişim haklarını merkezi yönetiyor, Azure AD ile bulut uygulamalarına koşullu erişim kuruyoruz. SIEM entegrasyonuyla tüm ağ olaylarını merkezi platformda toplayıp analiz ediyoruz. KVKK kapsamında Bağcılar\'daki müşterilerimiz için kişisel veri envanteri çıkarıyor, erişim kontrol politikaları oluşturuyor ve yıllık denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Bağcılar\'daki üretim tesislerine endüstriyel ağ kurulumu yapıyor musunuz?',
                a: 'Evet, Mahmutbey sanayi bölgesindeki fabrikalarda OT/IT ağ segmentasyonu, endüstriyel switch kurulumu ve SCADA güvenliği dahil çözümler sunuyoruz.',
            },
            {
                q: 'Bağcılar\'da küçük bir atölyeyiz, IT outsource bütçemize uygun mu?',
                a: 'Küçük işletmeler için ölçeğe uygun esnek paketlerimiz var. Proxmox VE ve pfSense gibi lisans maliyetsiz çözümlerle profesyonel altyapıyı uygun fiyata sunuyoruz.',
            },
            {
                q: 'Tekstil sektörüne özel IT çözümleriniz var mı?',
                a: 'Evet, tekstil ERP entegrasyonu, barkod ve el terminali kablosuz altyapısı, tedarikçi VPN bağlantıları ve sipariş veritabanı yedekleme çözümlerimiz sektöre özeldir.',
            },
            {
                q: 'Bağcılar\'a saha desteği ne kadar sürede gelir?',
                a: 'Acil durumlarda Bağcılar\'a ortalama 50 dakikada saha ekibi ulaştırıyoruz. Uzaktan bağlantı ile birçok sorunu dakikalar içinde çözebiliyoruz.',
            },
            {
                q: 'KVKK uyumu için teknik olarak neler yapıyorsunuz?',
                a: 'Veri envanteri çıkarma, Active Directory ve Azure AD ile erişim kontrol politikaları, SIEM ile merkezi loglama, çalışan eğitimi ve yıllık uyum denetim raporu hazırlıyoruz.',
            },
        ],
    },

    // ── GÜNEŞLİ ──
    {
        slug: 'gunesli-it-destegi',
        title: 'Güneşli IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Güneşli IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Güneşli',
        geo: { lat: 41.0180, lng: 28.8800 },
        meta: 'Güneşli IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek. Sanayi bölgesi yakını.',
        intro: 'Güneşli, İstanbul\'un en önemli sanayi ve ticaret merkezlerinden biridir. Güneşli Organize Sanayi Bölgesi\'ndeki üretim tesisleri, Kuyumcukent\'teki kuyumculuk firmaları, Basın Ekspres yolu üzerindeki lojistik depoları ve modern ofis plazaları bölgenin ekonomik çeşitliliğini yansıtır. Metrobüs hattına yakınlığı ve E-5 erişimi sayesinde ulaşım kolaylığı sunan Güneşli, teknoloji yatırımlarında hızla büyüyen bir bölgedir. Kozyatağı Bilişim olarak Güneşli\'deki müşterilerimize organize sanayi bölgesinden modern plazalara kadar geniş bir yelpazede IT hizmeti sağlıyoruz.',
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
                text: 'Güneşli Organize Sanayi Bölgesi\'ndeki firmalar üretim planlama ve stok takip yazılımlarını yerel sunucularda çalıştırır; sunucu kesintisi üretim bandını durdurur. VMware vSphere ile organize sanayi bölgesindeki büyük tesislerde HA kümeleri kuruyor, vMotion ile bakım sırasında sıfır kesinti sağlıyoruz. Kuyumcukent\'teki kuyumculuk firmalarının tasarım ve stok yönetim sunucularını Proxmox VE üzerinde lisans maliyetsiz çalıştırıyoruz. Basın Ekspres\'teki modern ofis plazalarında Windows Server ağırlıklı yapılarda Hyper-V failover cluster ile yedeklilik oluşturuyoruz. Tüm sunucuları proaktif izleme panelimizle takip ediyor, CPU, RAM ve disk eşik uyarılarını anlık raporluyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Güneşli\'deki kuyumculuk firmalarında müşteri verileri ve tasarım dosyaları yüksek değerli hedeflerdir; siber güvenlik ihmali büyük maddi kayba yol açar. Fortinet FortiGate ile Kuyumcukent\'teki firmalarda next-gen firewall kuruyor, application control ile yetkisiz uygulamaları engelliyor, SSL denetimi yapıyoruz. Sophos XGS synchronized security ile organize sanayi bölgesindeki tesislerde OT ve IT ağlarını birbirine bağlı koruyoruz. Basın Ekspres\'teki küçük ofisler için pfSense ile bütçe dostu ama etkin IDS/IPS çözümü sunuyoruz. Uç noktalarda ESET PROTECT merkezi yönetim, Kaspersky Endpoint Security gelişmiş tehdit analizi ve Bitdefender GravityZone makine öğrenme tabanlı tespit ile katmanlı savunma kuruyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Güneşli Organize Sanayi Bölgesi\'ndeki geniş tesislerde üretim alanı, depo ve ofis arasında kesintisiz ağ bağlantısı kritik önemdedir. Cat6A yapısal kablolama ile tesis genelinde 10 Gbps destekli altyapı kuruyor, binalar arası fiber optik omurga çekiyoruz. Wi-Fi 6 erişim noktalarıyla depo alanlarında el terminalleri ve tablet bilgisayarlar için stabil bağlantı sağlıyoruz. VLAN segmentasyonu ile Kuyumcukent\'teki firmalarda güvenlik kameraları, POS ve ofis ağlarını izole ediyoruz. Mesh topoloji ile Basın Ekspres\'teki çok katlı plazalarda kesintisiz dolaşım sağlıyor, PoE switch ile erişim noktalarına ayrı güç kablosu çekmeden altyapı kuruyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Güneşli\'deki kuyumculuk firmalarında tasarım arşivleri ve müşteri portföyleri yılların birikimini temsil eder; veri kaybı telafisi zor bir kayıptır. 3-2-1 kuralıyla üç kopya, iki farklı ortam, bir şehir dışı kopyayla koruma sağlıyoruz. Veeam Backup & Replication ile organize sanayi bölgesindeki ERP sunucularını artımlı yedekliyor, SureBackup ile kurtarılabilirliği otomatik doğruluyoruz. Acronis Cyber Protect platformuyla Kuyumcukent\'teki firmaların tasarım dosyalarını ve müşteri verilerini bare-metal restore destekli yedekliyoruz. Nakivo Backup ile Basın Ekspres\'teki ofislerde VMware ve Hyper-V ortamlarında maliyet etkin replikasyon sunuyoruz. NAS ve bulut hibrit stratejisiyle saatlik ve günlük yedek politikaları uyguluyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Güneşli\'deki lojistik firmaları ve kuyumcular yoğun e-posta trafiğiyle çalışır; sipariş onayları ve teslimat takibi anlık iletişim gerektirir. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre kuruyor, SPF, DKIM ve DMARC ile e-posta güvenliğini sağlıyoruz. Google Workspace tercih eden organize sanayi bölgesindeki teknoloji firmalarına Gmail ve Drive ekosistemini yapılandırıyoruz. Uzaktan erişimde WireGuard ile modern VPN tünelleri kuruyor, OpenVPN Access Server ile departman bazlı erişim politikaları yönetiyoruz. Kuyumcukent\'ten depo lokasyonlarına IPsec site-to-site tünelleriyle güvenli kalıcı bağlantı kuruyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Güneşli\'deki organize sanayi bölgesinde faaliyet gösteren firmalar genellikle yarı zamanlı IT personeline güvenir; bu yaklaşım büyük arızalarda yetersiz kalır. IT outsource modelimizle tam zamanlı IT departmanı fonksiyonunu aylık sabit ücretle sağlıyoruz. Active Directory ile vardiya bazlı erişim hakları yönetiyor, Azure AD ile bulut uygulamalarına koşullu erişim kuruyoruz. Helpdesk ekibimiz telefon ve uzaktan bağlantıyla destek sağlarken SIEM platformuyla tüm güvenlik olaylarını merkezi logluyor. Kuyumcukent\'teki müşterilerimiz için KVKK kapsamında müşteri veri envanteri çıkarıyor, erişim kontrol politikaları oluşturuyor ve yıllık uyum raporları hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Güneşli Organize Sanayi Bölgesi\'ndeki tesislere hizmet veriyor musunuz?',
                a: 'Evet, organize sanayi bölgesindeki üretim tesislerine sunucu yönetimi, endüstriyel ağ kurulumu, OT/IT segmentasyonu ve 7/24 teknik destek sağlıyoruz.',
            },
            {
                q: 'Kuyumcukent\'teki firmalara özel güvenlik çözümleriniz var mı?',
                a: 'Evet, kuyumculuk sektörü için tasarım dosyası yedekleme, güvenlik kamerası ağ altyapısı, Fortinet FortiGate ile gelişmiş tehdit koruması ve KVKK uyumlu müşteri veri yönetimi sunuyoruz.',
            },
            {
                q: 'Basın Ekspres\'teki ofis plazalarına network kurulumu yapıyor musunuz?',
                a: 'Evet, Basın Ekspres üzerindeki modern plazalarda Cat6A kablolama, fiber optik omurga, Wi-Fi 6 ve VLAN segmentasyonu ile profesyonel ağ altyapısı kuruyoruz.',
            },
            {
                q: 'Güneşli\'ye saha desteği ne kadar sürede ulaşır?',
                a: 'Güneşli\'ye E-5 ve metrobüs aksı üzerinden hızla ulaşıyoruz; acil arızalarda ortalama 45 dakikada saha ekibi gönderiyoruz. Uzaktan destek ile anında müdahale mümkündür.',
            },
            {
                q: 'Lojistik firmalarına depo IT altyapısı kurulumu yapıyor musunuz?',
                a: 'Evet, depo Wi-Fi 6 kapsama, barkod okuyucu kablosuz altyapısı, WMS sunucu yönetimi ve Veeam ile stok verisi yedekleme çözümlerimiz mevcuttur.',
            },
        ],
    },

    // ── BEYLİKDÜZÜ ──
    {
        slug: 'beylikduzu-it-destegi',
        title: 'Beylikdüzü IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Beylikdüzü IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Beylikdüzü',
        geo: { lat: 41.0050, lng: 28.6406 },
        meta: 'Beylikdüzü IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Beylikdüzü, İstanbul\'un en hızlı büyüyen iş bölgelerinden biridir. Beylikdüzü Organize Sanayi Bölgesi\'ndeki üretim tesisleri, Büyükçekmece Gölü yakınındaki modern ofis plazaları, Marmara Park AVM çevresindeki ticaret merkezleri ve sahil şeridindeki startup ofisleri bölgenin dinamik ekonomisini yansıtır. Yeni yapılaşmanın getirdiği modern altyapı avantajı, bölgeyi teknoloji yatırımları için cazip kılıyor. Kozyatağı Bilişim olarak Beylikdüzü\'ndeki genç ve büyüyen işletmelere ölçeklenebilir IT çözümleri sunuyoruz.',
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
                text: 'Beylikdüzü\'ndeki hızla büyüyen startup\'lar ve KOBİ\'ler esnek ve ölçeklenebilir sunucu altyapısına ihtiyaç duyar. VMware vSphere ile Beylikdüzü OSB\'deki üretim firmalarında HA kümeleri kuruyor, DRS ile dinamik iş yükü dengeleme sağlıyoruz. Sahil şeridindeki teknoloji startup\'ları için Proxmox VE ile lisans maliyetsiz sanallaştırma sunuyor, LXC konteynerlerle mikroservis mimarilerini destekliyoruz. Kavakl\'daki ticaret ofislerinde Windows Server ortamlarında Hyper-V failover cluster yapılandırıyoruz. Beylikdüzü\'nün yeni bina stoku sayesinde sunucu odası standartları genellikle yüksek; bu avantajı proaktif izleme ve kapasite planlamasıyla tamamlıyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Beylikdüzü\'ndeki genç teknoloji firmaları bulut tabanlı çalışsa da ağ güvenliği ihmal edilemez; özellikle SaaS uygulamalarına erişim kontrolleri kritiktir. Fortinet FortiGate ile OSB\'deki üretim tesislerinde application control ve SSL inspection sağlıyor, tehditleri ağ girişinde durduruyor. Sophos XGS synchronized security ile modern plazalardaki ofislerde firewall ve endpoint korumasını tek panelden yönetiyoruz. Marmara Park çevresindeki bütçe odaklı işletmelere pfSense ile kurumsal seviye güvenlik sunuyoruz. ESET PROTECT ile merkezi endpoint yönetimi, Kaspersky Endpoint Security ile fidye yazılımı koruması ve Bitdefender GravityZone ile yapay zeka destekli tehdit tespiti sağlıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Beylikdüzü\'nün yeni yapılaşması modern kablolama altyapısına olanak tanır; bu avantajı en iyi şekilde değerlendiriyoruz. Cat6A yapısal kablolama ile OSB\'deki tesislerde 10 Gbps destekli omurga kuruyor, binalar arası fiber optik bağlantı sağlıyoruz. Wi-Fi 6 erişim noktalarıyla modern plazalardaki açık ofis alanlarında OFDMA ve MU-MIMO teknolojileriyle yüksek kapasiteli kablosuz ağ oluşturuyoruz. VLAN segmentasyonu ile startup\'ların co-working alanlarında firma bazlı trafik izolasyonu sağlıyoruz. Mesh topoloji ile Kavakl\'daki geniş ofis kampüslerinde kesintisiz dolaşım, PoE switch ile erişim noktalarına ve IP kameralara tek kablo üzerinden güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Beylikdüzü\'ndeki startup\'lar için müşteri verileri ve yazılım kaynak kodları en değerli varlıklardır; kaybedildiğinde yılların emeği sıfırlanır. 3-2-1 kuralıyla üç kopya, iki farklı ortam, bir şehir dışı kopyayla tam koruma sağlıyoruz. Veeam Backup & Replication ile OSB\'deki üretim firmalarının ERP ve MRP sunucularını artımlı yedekliyor, SureBackup ile kurtarılabilirliği test ediyoruz. Acronis Cyber Protect platformuyla sahil şeridindeki ofislerde fiziksel ve sanal sunucuları bare-metal restore destekli yedekliyoruz. Nakivo Backup ile Hyper-V ortamlarında hızlı ve maliyet etkin replikasyon sağlıyoruz. Bulut yedekleme ile coğrafi yedeklilik oluşturarak deprem riskine karşı hazırlıklı oluyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Beylikdüzü\'ndeki startup ekipleri genellikle hibrit çalışma modelini benimser; evden, ofisten ve sahadan güvenli erişim zorunludur. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre kuruyor, SPF, DKIM ve DMARC ile e-posta güvenliğini sağlıyoruz. Google Workspace tercih eden teknoloji firmalarına Gmail, Drive ve Meet ekosistemini yapılandırıp alan adı doğrulama ve veri göçünü gerçekleştiriyoruz. WireGuard ile düşük gecikmeli modern VPN tünelleri kuruyor, OpenVPN Access Server ile proje bazlı erişim politikaları yönetiyoruz. OSB\'deki ana tesis ile şehir içi ofis arasında IPsec site-to-site tünellerle kalıcı güvenli bağlantı sağlıyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Beylikdüzü\'ndeki genç firmalar hızlı büyürken IT altyapısının bu tempoya ayak uydurması gerekir. IT outsource modelimizle her yeni çalışan için hesap açma, cihaz yapılandırma ve yetkilendirme süreçlerini Active Directory group policy\'leri ile standartlaştırıyoruz. Azure AD conditional access ile bulut uygulamalarına konum ve cihaz bazlı erişim kontrolü sağlıyoruz. Helpdesk portalımız üzerinden açılan çağrılar ortalama 18 dakikada ilk yanıtı alır. SIEM altyapısıyla tüm güvenlik olaylarını merkezi logluyor ve analiz ediyoruz. KVKK kapsamında startup müşterilerimiz için kişisel veri envanteri çıkarıyor, teknik tedbirleri belgeliyor ve denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Beylikdüzü\'ndeki startup\'lara özel IT paketleriniz var mı?',
                a: 'Evet, startup\'lar için ölçeklenebilir bulut altyapısı, Proxmox VE tabanlı maliyet etkin sanallaştırma, Google Workspace kurulumu ve büyümeye paralel genişleyen IT outsource paketlerimiz mevcuttur.',
            },
            {
                q: 'Beylikdüzü OSB\'deki tesislere endüstriyel IT hizmeti veriyor musunuz?',
                a: 'Evet, OSB\'deki üretim tesislerinde sunucu yönetimi, OT/IT ağ segmentasyonu, endüstriyel Wi-Fi kurulumu ve Fortinet FortiGate ile fabrika güvenliği sağlıyoruz.',
            },
            {
                q: 'Beylikdüzü\'ne saha desteği ne kadar sürede ulaşır?',
                a: 'Beylikdüzü mesafe olarak uzak olsa da planlı bakım randevuları önceden ayarlanır. Acil arızalarda E-5 üzerinden ortalama 60 dakikada saha ekibi gönderiyoruz; uzaktan destek ile anında müdahale mümkündür.',
            },
            {
                q: 'Yeni ofis taşınmasında IT altyapısını sıfırdan kurabilir misiniz?',
                a: 'Evet, Beylikdüzü\'ndeki yeni binalarda Cat6A kablolama, sunucu odası tasarımı, Wi-Fi 6 kurulumu, firewall yapılandırması ve tüm kullanıcı hesap göçünü anahtar teslim yapıyoruz.',
            },
            {
                q: 'Hibrit çalışma modeli için hangi VPN çözümünü öneriyorsunuz?',
                a: 'Günlük kullanım için WireGuard performans avantajıyla öne çıkar. Detaylı erişim kontrolü gereken ortamlarda OpenVPN Access Server, şubeler arası kalıcı bağlantıda IPsec öneriyoruz.',
            },
        ],
    },

    // ── ESENYURT ──
    {
        slug: 'esenyurt-it-destegi',
        title: 'Esenyurt IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Esenyurt IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Esenyurt',
        geo: { lat: 41.0289, lng: 28.6725 },
        meta: 'Esenyurt IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Esenyurt, 1 milyonu aşkın nüfusuyla Türkiye\'nin en kalabalık ilçesidir ve bu devasa nüfus büyük bir KOBİ ekosistemi barındırır. Esenyurt Sanayi Sitesi\'ndeki üretim atölyeleri, Haramidere\'deki ticaret merkezleri, Kıraç\'taki lojistik depoları ve Esenyurt Meydanı çevresindeki perakende işletmeleri yoğun bir IT hizmeti talebi yaratır. Hızlı kentleşme ve ticari büyüme, bölgedeki işletmelerin profesyonel IT altyapısına olan ihtiyacını artırıyor. Kozyatağı Bilişim olarak Esenyurt\'un yoğun KOBİ dokusuna ölçeklenebilir ve uygun maliyetli IT çözümleri sunuyoruz.',
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
                text: 'Esenyurt\'un yoğun KOBİ ekosisteminde yüzlerce firma muhasebe, stok takip ve sipariş yönetim yazılımlarını yerel sunucularda barındırır. VMware vSphere ile Haramidere\'deki büyük ticaret firmalarında HA kümeleri kuruyor, vMotion ile bakım pencerelerinde kesintisiz çalışma sağlıyoruz. Esenyurt Sanayi Sitesi\'ndeki atölyeler için Proxmox VE ile lisans maliyetsiz KVM sanallaştırma ve anlık snapshot desteği sunuyoruz. Kıraç\'taki lojistik firmaları için Windows Server ortamında Hyper-V failover cluster yapılandırarak WMS sunucularının sürekliliğini garantiliyoruz. Proaktif izleme panelimizle tüm sunucuları 7/24 takip ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Esenyurt\'taki binlerce KOBİ\'nin büyük çoğunluğu henüz profesyonel ağ güvenliği altyapısına sahip değildir; bu durum fidye yazılımı saldırılarına açık kapı bırakır. Fortinet FortiGate ile Haramidere\'deki ticaret merkezlerinde next-gen firewall kuruyor, IPS ve application control ile tehditleri önlüyoruz. Sophos XGS synchronized security yaklaşımıyla Esenyurt Meydanı çevresindeki perakende zincirleri için POS ağı güvenliğini sağlıyoruz. Sanayi sitesindeki bütçe odaklı atölyelere pfSense ile kurumsal düzey güvenlik sunuyoruz. ESET PROTECT merkezi konsol, Kaspersky Endpoint Security gelişmiş koruma ve Bitdefender GravityZone makine öğrenme tabanlı tespit ile çok katmanlı savunma oluşturuyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Esenyurt\'un hızlı büyüyen ticaret alanlarında altyapı ihtiyacı her geçen gün artıyor. Cat6A yapısal kablolama ile Haramidere\'deki yeni iş merkezlerinde 10 Gbps destekli profesyonel altyapı kuruyor, kat dağıtım panolarını standartlara uygun konumlandırıyoruz. Fiber optik omurga ile bina kampüsleri arasında yüksek hızlı bağlantı sağlıyoruz. Wi-Fi 6 erişim noktalarıyla Kıraç\'taki depo alanlarında el terminalleri ve barkod okuyucular için stabil kablosuz ağ oluşturuyoruz. VLAN segmentasyonu ile departman ve misafir trafiğini izole ediyor, mesh topoloji ile geniş mağaza alanlarında kesintisiz kapsama sağlıyoruz. PoE switch altyapısıyla kablo karmaşasını azaltıyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Esenyurt\'taki ticaret firmalarında sipariş kayıtları, müşteri verileri ve mali belgeler kaybedildiğinde hem gelir hem itibar kaybı yaşanır. 3-2-1 kuralıyla üç kopya, iki farklı ortam ve bir şehir dışı kopyayla kapsamlı koruma sağlıyoruz. Veeam Backup & Replication ile Haramidere\'deki müşterilerimizin ERP sunucularını artımlı yedekliyor, Instant VM Recovery ile hızlı geri dönüş sağlıyoruz. Acronis Cyber Protect ile Esenyurt Sanayi Sitesi\'ndeki atölyelerin fiziksel sunucularını bare-metal restore destekli yedekliyoruz. Nakivo Backup ile Kıraç\'taki lojistik firmalarının WMS verilerini maliyet etkin şekilde replike ediyoruz. NAS cihazına saatlik, buluta günlük yedek göndererek RTO hedeflerini karşılıyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Esenyurt\'taki KOBİ\'lerin önemli bir kısmı hâlâ ücretsiz e-posta servisleri kullanır; bu durum profesyonel iletişimde güven kaybına ve güvenlik açıklarına neden olur. Microsoft 365 ile Exchange Online, Teams ve OneDrive\'ı entegre kuruyor, kurumsal alan adıyla profesyonel e-posta yapılandırıyoruz. Google Workspace tercih eden işletmelere Gmail, Drive ve Meet ekosistemini kuruyor, SPF, DKIM ve DMARC kayıtlarıyla e-posta güvenliğini sağlıyoruz. WireGuard ile saha personeli için düşük gecikmeli VPN, OpenVPN Access Server ile kullanıcı bazlı erişim kontrolü kuruyoruz. Kıraç\'taki depo ile merkez ofis arasında IPsec site-to-site VPN ile kalıcı güvenli bağlantı sağlıyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Esenyurt\'un devasa KOBİ havzasında işletmelerin büyük çoğunluğu BT departmanı bulundurmaz; teknik sorunlar iş süreçlerini doğrudan kesintiye uğratır. IT outsource modelimizle aylık sabit ücretle tam kapsamlı BT yönetimi sağlıyoruz. Active Directory ile Haramidere\'deki firmalarda merkezi kullanıcı yönetimi, Azure AD ile bulut uygulamalarına koşullu erişim yapılandırıyoruz. Helpdesk ekibimiz telefon ve uzaktan bağlantıyla hızlı destek verirken SIEM platformuyla güvenlik olaylarını merkezi logluyor. KVKK kapsamında Esenyurt\'taki müşterilerimiz için veri envanteri çıkarıyor, erişim kontrol politikaları oluşturuyor ve yıllık uyum denetim raporu hazırlıyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Esenyurt\'taki küçük işletmelere uygun fiyatlı IT paketi var mı?',
                a: 'Evet, Esenyurt\'un KOBİ yapısına uygun esnek paketlerimiz mevcuttur. Proxmox VE ve pfSense gibi lisans maliyetsiz çözümlerle profesyonel altyapıyı bütçe dostu fiyatlarla sunuyoruz.',
            },
            {
                q: 'Esenyurt Sanayi Sitesi\'ndeki atölyelere hizmet veriyor musunuz?',
                a: 'Evet, sanayi sitesindeki üretim atölyelerine sunucu yönetimi, endpoint güvenliği, yedekleme ve KVKK uyum hizmeti veriyoruz. Ölçeğe göre özelleştirilmiş paketlerimiz mevcuttur.',
            },
            {
                q: 'Esenyurt\'a saha desteği ne kadar sürede ulaşır?',
                a: 'Planlı bakımlar önceden randevuyla yapılır. Acil arızalarda E-5 üzerinden ortalama 55 dakikada saha ekibi gönderiyoruz; uzaktan bağlantı ile birçok sorunu anında çözüyoruz.',
            },
            {
                q: 'Ücretsiz e-postadan kurumsal e-postaya geçiş yapabilir misiniz?',
                a: 'Evet, mevcut e-postalarınızı Microsoft 365 veya Google Workspace\'e taşıyor, alan adınızla kurumsal e-posta kuruyoruz. Geçmiş e-postalar ve kişiler göç sırasında korunur.',
            },
            {
                q: 'Lojistik firmalarına depo IT çözümleri sunuyor musunuz?',
                a: 'Evet, Kıraç\'taki depolarda Wi-Fi 6 kapsama, el terminali kablosuz altyapısı, WMS sunucu yönetimi, IPsec VPN ve Veeam ile yedekleme çözümleri sağlıyoruz.',
            },
        ],
    },

    // ── AVCILAR ──
    {
        slug: 'avcilar-it-destegi',
        title: 'Avcılar IT Destek | Bilişim Firması & Bilgi İşlem Hizmetleri',
        h1: 'Avcılar IT Destek, Bilişim ve Bilgi İşlem Hizmetleri',
        area: 'Avcılar',
        geo: { lat: 40.9794, lng: 28.7217 },
        meta: 'Avcılar IT destek ve bilişim firması: sunucu yönetimi, network kurulumu, firewall, server bakım, bilgi işlem dış kaynak ve kurumsal bilgisayar destek hizmetleri.',
        intro: 'Avcılar, İstanbul Üniversitesi-Cerrahpaşa kampüsü sayesinde teknoloji odaklı genç bir iş ekosistemi barındırır. Kampüs çevresindeki teknoloji firmaları, Ambarlı Limanı\'na yakın lojistik şirketleri, E-5 boyunca sıralanan ticaret ofisleri ve Marmara sahil şeridindeki perakende işletmeleri bölgenin ekonomik çeşitliliğini oluşturur. Üniversite-sanayi iş birliğinden doğan AR-GE firmaları bölgeye dinamizm katarken, liman lojistiği ve sahil ticareti geleneksel iş kollarını temsil eder. Kozyatağı Bilişim olarak Avcılar\'daki teknoloji odaklı işletmelerden geleneksel ticaret firmalarına kadar geniş bir yelpazede IT hizmeti sunuyoruz.',
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
                text: 'Avcılar\'daki üniversite kampüsü çevresindeki teknoloji firmaları yoğun hesaplama gücü gerektiren AR-GE projeleri yürütür; sunucu performansı ve sürekliliği kritik önemdedir. VMware vSphere ile kampüs yakınındaki yazılım firmalarında HA kümeleri kuruyor, DRS ile iş yüklerini dinamik dengeliyoruz. E-5 üzerindeki ticaret ofisleri için Proxmox VE ile lisans maliyetsiz sanallaştırma sunuyor, ZFS ile veri bütünlüğü sağlıyoruz. Ambarlı Limanı bölgesindeki lojistik firmalarında Windows Server ağırlıklı ortamlarda Hyper-V failover cluster yapılandırmasıyla WMS ve TMS sunucularının kesintisiz çalışmasını garanti ediyoruz. Tüm sunucuları 7/24 proaktif izleme panelimizle takip ediyoruz.',
            },
            {
                title: 'Firewall Kurulumu ve Siber Güvenlik',
                text: 'Avcılar\'daki teknoloji firmaları fikri mülkiyet ve kaynak kod güvenliğine özel önem verir; bir veri sızıntısı rekabet avantajını ortadan kaldırır. Fortinet FortiGate ile kampüs çevresindeki yazılım şirketlerinde next-gen firewall kuruyor, DLP politikalarıyla veri sızıntısını önlüyoruz. Sophos XGS synchronized security ile sahil şeridindeki ticaret firmalarında firewall ve endpoint korumasını entegre yönetiyoruz. Ambarlı bölgesindeki bütçe odaklı lojistik firmalarına pfSense ile Suricata tabanlı IDS/IPS koruması kuruyoruz. ESET PROTECT merkezi yönetim, Kaspersky Endpoint Security gelişmiş tehdit koruması ve Bitdefender GravityZone yapay zeka destekli zararlı tespiti ile çok katmanlı güvenlik sağlıyoruz.',
            },
            {
                title: 'Network Kurulumu ve Kurumsal Wi-Fi',
                text: 'Avcılar\'ın sahil şeridindeki ofis yapıları deniz nemine maruz kalır; bu durum ağ ekipmanlarının seçiminde ve montajında dikkat gerektirir. Cat6A yapısal kablolama ile E-5 üzerindeki iş merkezlerinde 10 Gbps destekli altyapı kuruyor, endüstriyel sınıf konnektörler kullanıyoruz. Kampüs çevresindeki teknoloji parklarında binalar arası fiber optik omurga çekerek yüksek hızlı iletişim sağlıyoruz. Wi-Fi 6 erişim noktalarıyla Ambarlı bölgesindeki depo ve ofis alanlarında stabil kablosuz ağ oluşturuyoruz. VLAN segmentasyonu ile AR-GE, satış ve misafir ağlarını izole ediyor, mesh topoloji ile geniş ofis alanlarında dolaşım sağlıyoruz. PoE switch altyapısıyla IP kamera ve erişim noktalarına tek kablo ile güç iletiyoruz.',
            },
            {
                title: 'Veri Yedekleme ve Felaket Kurtarma',
                text: 'Avcılar\'daki AR-GE firmalarında yılların birikimi olan kaynak kodlar ve proje dosyaları kaybedildiğinde telafisi imkansızdır. 3-2-1 kuralıyla üç kopya, iki farklı ortam ve bir şehir dışı kopyayla maksimum koruma sağlıyoruz. Veeam Backup & Replication ile kampüs çevresindeki teknoloji firmalarının geliştirme sunucularını artımlı yedekliyor, SureBackup ile kurtarılabilirliği test ediyoruz. Acronis Cyber Protect platformuyla Ambarlı\'daki lojistik firmaların sunucularını bare-metal restore destekli yedekliyoruz. Nakivo Backup ile E-5 üzerindeki ofislerde VMware ve Hyper-V ortamlarında maliyet optimize replikasyon sağlıyoruz. NAS ve bulut hibrit stratejisiyle hem yerel hız hem coğrafi yedeklilik sunuyoruz.',
            },
            {
                title: 'Kurumsal E-Posta ve Uzaktan Erişim (VPN)',
                text: 'Avcılar\'daki teknoloji firmalarında yazılım ekipleri sıklıkla uzaktan çalışır; güvenli erişim ve kesintisiz iş birliği araçları zorunludur. Microsoft 365 ile Exchange Online, Teams ve SharePoint\'i entegre kuruyor, SPF, DKIM ve DMARC yapılandırmasıyla e-posta güvenliğini sağlıyoruz. Google Workspace tercih eden AR-GE firmalarına Gmail, Drive ve Meet ekosistemini yapılandırarak iş birliği altyapısını güçlendiriyoruz. WireGuard ile yazılımcılar için düşük gecikmeli VPN tünelleri kuruyor, OpenVPN Access Server ile proje bazlı erişim grupları oluşturuyoruz. Ambarlı\'daki depo ile merkez ofis arasında IPsec site-to-site tünellerle kalıcı şifreli bağlantı sağlıyoruz.',
            },
            {
                title: 'IT Outsource, Helpdesk ve KVKK Uyumu',
                text: 'Avcılar\'daki küçük teknoloji firmaları geliştirme süreçlerine odaklanmak ister; IT operasyonlarını dış kaynak kullanarak bize devreder. IT outsource modelimizle Active Directory ile geliştirici ve operasyon ekiplerinin erişim haklarını ayrı yönetiyor, Azure AD ile bulut geliştirme ortamlarına koşullu erişim sağlıyoruz. Helpdesk portalımız üzerinden açılan çağrılar ortalama 20 dakikada ilk yanıtı alır. SIEM entegrasyonuyla tüm güvenlik olaylarını merkezi platformda topluyoruz. KVKK kapsamında Avcılar\'daki müşterilerimiz için kişisel veri işleme envanteri hazırlıyor, erişim kontrol politikaları oluşturuyor ve yıllık denetim raporlarını düzenliyoruz.',
            },
        ],
        faqs: [
            {
                q: 'Avcılar\'daki üniversite çevresindeki teknoloji firmalarına özel hizmetiniz var mı?',
                a: 'Evet, AR-GE firmaları için geliştirme sunucusu yönetimi, kaynak kod yedekleme, Proxmox VE ile maliyet etkin sanallaştırma ve Google Workspace entegrasyonu gibi özel çözümlerimiz mevcuttur.',
            },
            {
                q: 'Ambarlı bölgesindeki lojistik firmalarına IT desteği sağlıyor musunuz?',
                a: 'Evet, lojistik sektörüne WMS ve TMS sunucu yönetimi, depo Wi-Fi 6 kapsama, IPsec VPN ile merkez ofis bağlantısı ve Veeam ile yedekleme çözümleri sunuyoruz.',
            },
            {
                q: 'Avcılar\'a saha desteği ne kadar sürede gelir?',
                a: 'Planlı bakımlar randevulu yapılır. Acil arızalarda E-5 üzerinden ortalama 55 dakikada saha ekibi gönderiyoruz; uzaktan bağlantı ile birçok sorunu anında çözüyoruz.',
            },
            {
                q: 'Uzaktan çalışan yazılım ekipleri için hangi VPN çözümünü önerirsiniz?',
                a: 'Yazılım geliştirme ekipleri için WireGuard düşük gecikme ve yüksek performans avantajıyla öne çıkar. Proje bazlı erişim kontrolü gerektiğinde OpenVPN Access Server öneriyoruz.',
            },
            {
                q: 'Avcılar\'daki sahil ofislerinde ağ ekipmanları nemden etkilenir mi?',
                a: 'Deniz nemine karşı endüstriyel sınıf ağ ekipmanları ve konnektörler kullanıyoruz. Cat6A kablolama ve Wi-Fi 6 erişim noktalarını uygun montaj koşullarıyla kurarak uzun ömürlü altyapı sağlıyoruz.',
            },
        ],
    },
];
