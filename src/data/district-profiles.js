/**
 * 30 ilçe profili — her biri unique iş ekosistemi, bina tipi, sektör ağırlığı.
 * Cross sayfalarda ilçeye özel giriş paragrafı üretmek için kullanılır.
 *
 * category: FINANS | TICARET | SANAYI | GELISEN | YAKIN
 */

export const DISTRICT_CATEGORIES = {
  FINANS: 'finans',
  TICARET: 'ticaret',
  SANAYI: 'sanayi',
  GELISEN: 'gelisen',
  YAKIN: 'yakin',
};

// slug prefix → ilçe adı eşlemesi (cross-pages.js'deki slug'larla eşleşir)
export const districtProfiles = {
  // ══════════════════════════════════════════
  // FİNANS KATEGORİSİ
  // ══════════════════════════════════════════

  atasehir: {
    area: 'Ataşehir',
    category: 'finans',
    businessLandscape: 'Ataşehir, İstanbul Finans Merkezi\'nin (İFM) kalbinde yer alır. Palladium, Metropol İstanbul ve Varyap Meridian gibi A-sınıfı plazalarda bankacılık, sigorta, fintech ve uluslararası danışmanlık firmaları faaliyet gösterir. Bölgedeki şirketlerin çoğunluğu 50-300 çalışan arasındadır ve BDDK, SPK veya KVKK denetimlerine tabidir.',
    typicalClient: 'Finans sektöründe orta ölçekli bir yatırım şirketi veya bağımsız denetim firması — yüksek güvenlik, kesintisiz erişim ve uyum raporlaması gerektiren yapılar.',
    proximity: 'Merkezimiz Ataşehir İçerenköy\'de bulunuyor; bölgedeki işletmelere 10-15 dakikada yerinde müdahale ediyoruz.',
    localChallenge: 'Plaza binalarında kat bazlı ağ segmentasyonu, yüksek yoğunluklu Wi-Fi talebi ve kiracı değişimlerinde hızlı onboarding/offboarding en sık karşılaşılan IT zorlukları.',
    industries: ['bankacılık', 'fintech', 'denetim', 'sigorta', 'danışmanlık'],
  },

  levent: {
    area: 'Levent',
    category: 'finans',
    businessLandscape: 'Levent, İstanbul\'un en prestijli iş bölgesidir. Kanyon, Özdilek Park, Sabancı Center ve Yapı Kredi Plaza gibi kulelerde Türkiye\'nin en büyük holdinglari, çok uluslu şirketlerin Türkiye ofisleri ve private equity fonları bulunur. Çalışan yoğunluğu yüksek, IT altyapı beklentisi kurumsal seviyedir.',
    typicalClient: 'Uluslararası bir danışmanlık firmasının 80 kişilik Türkiye ofisi — global IT standartlarına uyum, merkezi yönetim ve lokal destek gereksinimi bir arada.',
    proximity: 'Anadolu Yakası merkezimizden Levent\'e köprü trafiğine bağlı olarak 35-50 dakikada ulaşıyoruz; kritik müdahalelerde uzaktan destek ile ilk 15 dakikada devreye giriyoruz.',
    localChallenge: 'Çok katlı plaza binalarında fiber backbone yönetimi, yüksek bant genişliği ihtiyacı, misafir ağı izolasyonu ve uluslararası compliance standartları (SOC 2, ISO 27001).',
    industries: ['holding', 'çok uluslu şirket', 'private equity', 'hukuk', 'reklam'],
  },

  maslak: {
    area: 'Maslak',
    category: 'finans',
    businessLandscape: 'Maslak, Ağaoğlu My Office, Maslak 1453, Sun Plaza ve Nurol Tower gibi modern iş kulelerinin yoğunlaştığı İstanbul\'un teknoloji ve finans koridorudur. Yazılım şirketleri, dijital ajanslar ve finans kuruluşlarının yanı sıra co-working alanlarıyla startup ekosistemi de canlıdır.',
    typicalClient: '120 kişilik bir SaaS şirketi — bulut-öncelikli altyapı, DevOps pipeline güvenliği ve çalışan cihaz yönetimi (MDM) gerektiren hızlı büyüyen bir yapı.',
    proximity: 'Maslak\'a Anadolu Yakası\'ndan ortalama 40-55 dakikada ulaşıyoruz; 7/24 uzaktan izleme altyapımız ile anlık müdahale sağlıyoruz.',
    localChallenge: 'Hızla büyüyen ekiplerde IT onboarding hızı, BYOD politikası, SaaS uygulama güvenliği ve co-working alanlarda paylaşılan ağ güvenliği.',
    industries: ['yazılım', 'SaaS', 'dijital ajans', 'fintech', 'startup'],
  },

  sisli: {
    area: 'Şişli',
    category: 'finans',
    businessLandscape: 'Şişli, Osmanbey\'den Halaskargazi\'ye uzanan ticaret aksında muhasebe büroları, hukuk ofisleri, özel sağlık kuruluşları ve lojistik yönetim merkezlerinin yoğun olduğu köklü bir iş bölgesidir. Hem modern plazalar hem de dönüştürülmüş tarihi binalarda ofisler bulunur.',
    typicalClient: '30-50 kişilik bir muhasebe bürosu — e-fatura entegrasyonu, müşteri verisi güvenliği, KVKK uyumu ve çoklu şube erişimi gerektiren yapı.',
    proximity: 'Şişli\'ye Anadolu Yakası merkezimizden 30-45 dakikada erişiyoruz; uzaktan bağlantı ile anlık müdahale kapasitemiz mevcut.',
    localChallenge: 'Eski binaların sınırlı kablolama altyapısı, çok kiracılı yapılarda ağ izolasyonu, serbest meslek ofislerinde KVKK uyumu ve e-fatura/e-defter sistemi entegrasyonları.',
    industries: ['muhasebe', 'hukuk', 'özel sağlık', 'lojistik', 'eğitim'],
  },

  mecidiyekoy: {
    area: 'Mecidiyeköy',
    category: 'finans',
    businessLandscape: 'Mecidiyeköy, Şişli\'nin metro-metrobüs kesişim noktasında konumlanan yoğun bir iş merkezidir. Trump Towers, Profilo AVM iş kuleleri ve Mecidiyeköy Meydanı çevresinde insan kaynakları firmaları, sigorta acenteleri, yazılım geliştirme şirketleri ve perakende zinciri merkez ofisleri bulunur.',
    typicalClient: '60 kişilik bir insan kaynakları firması — aday veritabanı güvenliği, çoklu ofis arası VPN, uzaktan mülakatlar için stabil video altyapısı gerektiren yapı.',
    proximity: 'Mecidiyeköy\'e Anadolu Yakası\'ndan 30-40 dakikada ulaşıyoruz; yoğun saatlerde uzaktan destek ile anlık müdahale sağlıyoruz.',
    localChallenge: 'Yoğun metro/metrobüs trafiğinden kaynaklanan personel hareketliliği, sık kiracı değişimi, paylaşılan bina altyapısında bant genişliği rekabeti.',
    industries: ['insan kaynakları', 'sigorta', 'yazılım', 'perakende merkez', 'eğitim teknolojisi'],
  },

  kagithane: {
    area: 'Kağıthane',
    category: 'finans',
    businessLandscape: 'Kağıthane, son 10 yılda sanayi bölgesinden modern iş merkezine dönüşen İstanbul\'un en hızlı yükselen ticaret alanıdır. Skyland, Polat Tower, Kağıthane Ofispark ve yeni nesil karma projeler; reklam ajansları, yazılım firmaları, sağlık teknolojisi şirketleri ve e-ticaret operasyon merkezlerini çekmiştir.',
    typicalClient: '45 kişilik bir dijital reklam ajansı — yüksek bant genişliği, büyük dosya transferi (video prodüksiyon), çoklu ekran ve render farm IT altyapısı gerektiren yaratıcı sektör.',
    proximity: 'Kağıthane\'ye Anadolu Yakası merkezimizden 35-50 dakikada erişim sağlıyoruz; uzaktan yönetim ve izleme altyapımız ile hız kaybetmeden destek veriyoruz.',
    localChallenge: 'Yeni binaların fiber altyapısı güçlü ancak bina yönetiminin ISP kısıtlamaları, ofis taşınmalarında hızlı kurulum ihtiyacı ve prodüksiyon ekipmanı ile standart ofis ağının segmentasyonu.',
    industries: ['reklam ajansı', 'e-ticaret', 'sağlık teknolojisi', 'yazılım', 'prodüksiyon'],
  },

  // ══════════════════════════════════════════
  // TİCARET KATEGORİSİ
  // ══════════════════════════════════════════

  kadikoy: {
    area: 'Kadıköy',
    category: 'ticaret',
    businessLandscape: 'Kadıköy, Anadolu Yakası\'nın ticaret ve kültür merkezidir. Bağdat Caddesi\'nden Altıyol\'a, Moda\'dan Hasanpaşa\'ya kadar geniş bir alanda butik mağazalar, muhasebe büroları, avukatlık ofisleri, özel klinikler ve teknoloji girişimleri iç içe faaliyet gösterir.',
    typicalClient: '15-30 kişilik bir avukatlık bürosu — müvekkil verileri KVKK uyumlu saklanmalı, şube ofisler arası güvenli iletişim sağlanmalı ve yasal belge arşivi dijitalleştirilmeli.',
    proximity: 'Kadıköy merkezine ofisimizden 15-20 dakikada ulaşıyoruz; aynı gün yerinde müdahale standart hizmetimiz.',
    localChallenge: 'Tarihi binaların kısıtlı kablo yolları, dar ofis alanlarında kompakt ağ donanımı ihtiyacı, çok katlı binalarda Wi-Fi kapsama sorunu ve mevsimsel turist trafiğinin internet bant genişliğine etkisi.',
    industries: ['hukuk', 'muhasebe', 'özel klinik', 'butik mağaza', 'girişim'],
  },

  besiktas: {
    area: 'Beşiktaş',
    category: 'ticaret',
    businessLandscape: 'Beşiktaş, Akaretler\'den Ortaköy\'e uzanan hatta medya kuruluşları, reklam ajansları, üniversite spin-off\'ları ve turizm firmalarının yoğunlaştığı canlı bir ticaret bölgesidir. Boğaz\'ın iki yakasını bağlayan konumu nedeniyle ulaşım ve network bağlantı noktası olarak stratejik öneme sahiptir.',
    typicalClient: '25 kişilik bir medya prodüksiyon şirketi — büyük video dosyaları için NAS depolama, hızlı internet yedeklemesi, sahadan canlı yayın altyapısı ve müşteri içeriklerinin güvenli arşivlenmesi.',
    proximity: 'Beşiktaş\'a Anadolu Yakası merkezimizden 25-40 dakikada erişim sağlıyoruz; acil durumlarda önce uzaktan bağlanarak müdahaleyi hızlandırıyoruz.',
    localChallenge: 'Üniversite kampüsü yakınlığı nedeniyle bölgedeki ağ yoğunluğu, deniz kenarı konumunda tuzlu hava koşullarının donanıma etkisi ve tarihi yapılardaki altyapı kısıtlamaları.',
    industries: ['medya', 'reklam', 'turizm', 'üniversite spin-off', 'gastronomi'],
  },

  beyoglu: {
    area: 'Beyoğlu',
    category: 'ticaret',
    businessLandscape: 'Beyoğlu, İstiklal Caddesi ve çevresinde kreatif ajanslar, butik oteller, sanat galerileri, uluslararası STK ofisleri ve co-working alanlarının bir arada bulunduğu İstanbul\'un en kozmopolit iş bölgesidir. Tarihi Perşembe Pazarı tarafında ise ticaret ve toptan satış firmaları yoğunlaşır.',
    typicalClient: '20 kişilik bir kreatif ajans — Adobe Creative Cloud lisans yönetimi, büyük dosya senkronizasyonu, freelancer erişim kontrolü ve misafir sanatçılar için geçici ağ erişimi.',
    proximity: 'Beyoğlu\'na Anadolu Yakası\'ndan 30-45 dakikada ulaşıyoruz; uzaktan masaüstü yönetimi ile anında destek sağlıyoruz.',
    localChallenge: 'Tarihi binaların asansör ve kablo kanalı kısıtlamaları, dar sokak erişimi nedeniyle donanım teslimatında zorluklar, otopark sorunu nedeniyle yerinde müdahalede planlama gerekliliği.',
    industries: ['kreatif ajans', 'otelcilik', 'STK', 'sanat galerisi', 'toptan ticaret'],
  },

  bakirkoy: {
    area: 'Bakırköy',
    category: 'ticaret',
    businessLandscape: 'Bakırköy, İstanbul\'un batı yakasında adliye çevresi hukuk ofisleri, Ataköy-Bakırköy sahil hattı otel ve kongre merkezleri, Capacity AVM ofis katları ve E-5 üzeri ticaret bölgesiyle çok katmanlı bir iş ekosistemi barındırır.',
    typicalClient: '40 kişilik bir hukuk bürosu — dava dosyaları için güvenli arşivleme, adliye ile VPN bağlantısı, çoklu ofis yönetimi ve müvekkil iletişim güvenliği gerektiren yapı.',
    proximity: 'Bakırköy\'e Anadolu Yakası merkezimizden 40-55 dakikada erişim sağlıyoruz; uzaktan izleme ve yönetim altyapımız ile mesafeyi kompanse ediyoruz.',
    localChallenge: 'Sahil kesiminde nem ve tuzlu havanın network donanımına etkisi, E-5 üzeri binalarda trafik gürültüsünden kaynaklanan UPS ve klima gereksinimi, Ataköy plazalarında çok kiracılı ağ yönetimi.',
    industries: ['hukuk', 'otelcilik', 'kongre', 'perakende', 'sağlık'],
  },

  bahcelievler: {
    area: 'Bahçelievler',
    category: 'ticaret',
    businessLandscape: 'Bahçelievler, E-5 ve Basın Ekspres Yolu\'nun kesişiminde yer alan, sanayi dönüşümüyle modern ofis alanlarına kavuşan bir ticaret bölgesidir. Kuyumcukent, tekstil showroom\'ları, lojistik firmaları ve yeni nesil ofis projeleri birarada bulunur.',
    typicalClient: '35 kişilik bir tekstil ihracat firması — ERP sistemi, dış ticaret yazılımı, yurt dışı müşteri video konferansları ve showroom güvenlik kamerası altyapısı gerektiren yapı.',
    proximity: 'Bahçelievler\'e Anadolu Yakası\'ndan 40-50 dakikada ulaşıyoruz; Basın Ekspres bağlantısı sayesinde Avrupa Yakası müdahalelerimizi bu bölgeden koordine ediyoruz.',
    localChallenge: 'Eski sanayi binalarının ofise dönüşümünde yetersiz kablolama altyapısı, çok katlı showroom binalarında kablosuz kapsama, Kuyumcukent gibi özel güvenlik bölgelerinde IT erişim prosedürleri.',
    industries: ['tekstil', 'kuyumculuk', 'lojistik', 'dış ticaret', 'showroom'],
  },

  uskudar: {
    area: 'Üsküdar',
    category: 'ticaret',
    businessLandscape: 'Üsküdar, Bağlarbaşı ve Altunizade ekseninde devlet kurumları, vakıf üniversiteleri, özel hastaneler ve orta ölçekli ticaret firmalarının yoğunlaştığı köklü bir Anadolu Yakası ilçesidir. Marmaray bağlantısı bölgenin erişilebilirliğini artırmıştır.',
    typicalClient: '50 kişilik bir vakıf üniversitesi idari birimi — kampüs ağı yönetimi, öğrenci/personel kimlik doğrulama, sınav sistemi güvenliği ve KVKK uyumlu öğrenci veri saklama.',
    proximity: 'Üsküdar\'a ofisimizden 20-30 dakikada ulaşıyoruz; Anadolu Yakası\'ndaki en hızlı müdahale edebildiğimiz ilçelerden biri.',
    localChallenge: 'Tarihi yapıların kablo kısıtlamaları, devlet kurumları yakınında güvenlik protokolleri, yoğun Marmaray trafiğinin internet servis sağlayıcılarına yansıması.',
    industries: ['eğitim', 'sağlık', 'kamu', 'vakıf', 'perakende'],
  },

  sariyer: {
    area: 'Sarıyer',
    category: 'ticaret',
    businessLandscape: 'Sarıyer, Maslak iş kuleleri dışında İstinye, Tarabya ve Büyükdere boyunca butik ofisler, turizm işletmeleri, uluslararası okul kampüsleri ve Boğaz manzaralı konut ofislerin (home office) yaygın olduğu bir bölgedir.',
    typicalClient: '15 kişilik bir butik otel zinciri yönetim ofisi — 3 lokasyonun tek merkezden yönetimi, online booking altyapısı, müşteri verisi güvenliği ve hızlı internet yedeklemesi.',
    proximity: 'Sarıyer\'e Anadolu Yakası merkezimizden 45-60 dakikada erişim sağlıyoruz; uzaktan yönetim kapasitemiz ile günlük operasyonları mesafe hissetmeden yürütüyoruz.',
    localChallenge: 'Boğaz hattında fiber altyapı kısıtlamaları, villaların home office dönüşümünde kurumsal ağ ihtiyacı, mevsimsel turizm yoğunluğunun internet performansına etkisi.',
    industries: ['otelcilik', 'uluslararası eğitim', 'turizm', 'home office', 'mimarlık'],
  },

  // ══════════════════════════════════════════
  // SANAYİ KATEGORİSİ
  // ══════════════════════════════════════════

  umraniye: {
    area: 'Ümraniye',
    category: 'sanayi',
    businessLandscape: 'Ümraniye, Dudullu ve Yukarı Dudullu Organize Sanayi Bölgeleri ile İstanbul\'un en büyük üretim merkezlerinden biridir. Plastik, metal işleme, gıda üretimi ve ambalaj fabrikalarının yanı sıra Çakmak ve Şerifali bölgelerinde lojistik depoları ve dağıtım merkezleri bulunur.',
    typicalClient: '80 kişilik bir plastik ambalaj fabrikası — üretim hattı SCADA/PLC kontrolleri ile ofis ağının izolasyonu, 7/24 çalışan vardiya sisteminde kesintisiz IT ve ERP sunucu yönetimi.',
    proximity: 'Ümraniye\'ye ofisimizden 20-25 dakikada ulaşıyoruz; OSB bölgesindeki müşterilerimize düzenli haftalık yerinde bakım ziyareti yapıyoruz.',
    localChallenge: 'Sanayi tesislerinde toz ve sıcaklığın donanıma etkisi, OT (operasyonel teknoloji) ve IT ağlarının güvenli segmentasyonu, vardiyalı çalışma düzeninde 7/24 destek ihtiyacı.',
    industries: ['plastik', 'metal işleme', 'gıda üretimi', 'lojistik', 'ambalaj'],
  },

  tuzla: {
    area: 'Tuzla',
    category: 'sanayi',
    businessLandscape: 'Tuzla, İstanbul\'un en büyük sanayi bölgelerinden birini barındırır. Tuzla OSB, kimya fabrikaları, tersane bölgesi, otomotiv yan sanayi ve lojistik merkezleriyle ağır sanayinin kalbindedir. Ayrıca Sabiha Gökçen Havalimanı\'na yakınlığı lojistik avantaj sağlar.',
    typicalClient: '120 kişilik bir kimya firması — tehlikeli madde saklama alanlarında ex-proof donanım, ISO 14001/9001 uyumlu IT altyapısı, laboratuvar veri yönetimi ve acil durum iletişim sistemi.',
    proximity: 'Tuzla\'ya merkezimizden 30-40 dakikada ulaşıyoruz; TEM ve E-5 bağlantısı ile OSB bölgesine hızlı erişim sağlıyoruz.',
    localChallenge: 'Geniş tesis alanlarında endüstriyel Wi-Fi kapsama, korozif ortamlarda donanım koruma, üretim verileri ile ofis verisinin fiziksel olarak ayrılması, ISO denetimlerine uyumlu IT dokümantasyonu.',
    industries: ['kimya', 'tersane', 'otomotiv yan sanayi', 'lojistik', 'depolama'],
  },

  pendik: {
    area: 'Pendik',
    category: 'sanayi',
    businessLandscape: 'Pendik, Sabiha Gökçen Havalimanı\'nın konuşlandığı ilçe olarak havacılık, lojistik ve kargo sektörlerinin yanı sıra Kurtköy\'de yeni gelişen iş merkezleri ve Pendik Tersanesi çevresiyle çeşitlenmiş bir ekonomiye sahiptir.',
    typicalClient: '60 kişilik bir kargo/lojistik firması — araç takip sistemi, depo barkod/RFID altyapısı, merkez-şube arası VPN ve 7/24 operasyon odası IT yönetimi.',
    proximity: 'Pendik\'e merkezimizden 25-35 dakikada ulaşıyoruz; Kurtköy ve havalimanı bölgesine TEM üzerinden hızlı erişim sağlıyoruz.',
    localChallenge: 'Havalimanı güvenlik bölgesine yakınlıktan kaynaklanan frekans kısıtlamaları, geniş depo alanlarında Wi-Fi kapsama, kargo operasyonlarında kesintisiz barkod/tarayıcı altyapısı, VoIP telefon sistemi yoğunluğu.',
    industries: ['havacılık', 'kargo', 'lojistik', 'tersane', 'depolama'],
  },

  bagcilar: {
    area: 'Bağcılar',
    category: 'sanayi',
    businessLandscape: 'Bağcılar, İstanbul\'un en kalabalık ilçelerinden biri olup Mahmutbey ve Güneşli sanayi bölgelerine komşu konumuyla tekstil atölyeleri, matbaa/baskı firmaları, küçük ölçekli üretim tesisleri ve toptan ticaret depolarının yoğunlaştığı bir bölgedir.',
    typicalClient: '25 kişilik bir matbaa/baskı firması — büyük dosya transferi için hızlı NAS, baskı makinesi kontrol bilgisayarlarının ağ yönetimi, müşteri tasarım dosyalarının güvenli arşivlenmesi.',
    proximity: 'Bağcılar\'a Anadolu Yakası merkezimizden 40-50 dakikada ulaşıyoruz; uzaktan izleme ile günlük operasyonları kesintisiz yönetiyoruz.',
    localChallenge: 'Eski sanayi binalarında yetersiz elektrik ve ağ altyapısı, toz ve sıcaklığın donanıma etkisi, küçük atölyelerde bütçe kısıtlaması altında maksimum IT verimi.',
    industries: ['tekstil', 'matbaa', 'toptan ticaret', 'küçük üretim', 'ambalaj'],
  },

  gunesli: {
    area: 'Güneşli',
    category: 'sanayi',
    businessLandscape: 'Güneşli, Basın Ekspres Yolu üzerinde Türkiye\'nin en büyük medya kuruluşlarının ve sanayi tesislerinin bir arada bulunduğu stratejik bir konumdadır. TV kanalları, gazete merkezleri, büyük ölçekli depolama tesisleri ve e-ticaret fulfillment merkezleri Güneşli\'nin iş profilini şekillendirir.',
    typicalClient: '90 kişilik bir e-ticaret fulfillment merkezi — yüzlerce sipariş/dakika işleyen WMS yazılımı, barkod tarayıcı ağı, CCTV sistemi ve peak dönemlerde ölçeklenebilir IT altyapısı.',
    proximity: 'Güneşli\'ye Basın Ekspres bağlantısı ile Anadolu Yakası\'ndan 35-45 dakikada erişim sağlıyoruz.',
    localChallenge: 'Medya kuruluşlarının yüksek bant genişliği talebi, e-ticaret operasyonlarında Black Friday gibi peak dönem ölçeklendirmesi, 7/24 operasyonlarda sıfır kesinti toleransı.',
    industries: ['medya', 'e-ticaret', 'fulfillment', 'depolama', 'yayıncılık'],
  },

  esenyurt: {
    area: 'Esenyurt',
    category: 'sanayi',
    businessLandscape: 'Esenyurt, İstanbul\'un en kalabalık ilçesidir ve Kıraç sanayi bölgesi, Esenyurt Sanayi Sitesi, beyaz eşya-mobilya toptan piyasaları ile hızla gelişen konut-ticaret karma alanlarını bir arada barındırır. Uygun maliyetli ofis alanları girişimciler için çekim merkezi oluşturur.',
    typicalClient: '20 kişilik bir beyaz eşya toptan satış firması — stok takip yazılımı, satış noktası (POS) entegrasyonu, güvenlik kamerası ve fatura/e-irsaliye altyapısı.',
    proximity: 'Esenyurt\'a Anadolu Yakası\'ndan 50-65 dakikada ulaşıyoruz; uzaktan yönetim ve proaktif izleme ile fiziksel mesafeyi minimize ediyoruz.',
    localChallenge: 'Alt yapısı yeni gelişen sokaklarda internet bağlantı kalitesi sorunu, hızlı büyüyen firmalarda ölçeklenemeyen başlangıç altyapısı, maliyet-performans dengesi.',
    industries: ['toptan ticaret', 'beyaz eşya', 'mobilya', 'inşaat', 'perakende'],
  },

  sancaktepe: {
    area: 'Sancaktepe',
    category: 'sanayi',
    businessLandscape: 'Sancaktepe, Samandıra Sanayi Bölgesi ve Yenidoğan ticaret aksıyla sanayi-ticaret geçiş bölgesidir. Küçük ve orta ölçekli üretim firmaları, oto sanayi, gıda işleme tesisleri ve lojistik depoları bölgenin ekonomik omurgasını oluşturur.',
    typicalClient: '30 kişilik bir gıda işleme tesisi — soğuk zincir izleme sensörleri ile IT ağı entegrasyonu, HACCP uyumlu kayıt sistemi, üretim veri raporlama.',
    proximity: 'Sancaktepe\'ye merkezimizden 20-30 dakikada ulaşıyoruz; Samandıra OSB bölgesine düzenli periyodik bakım ziyaretleri yapıyoruz.',
    localChallenge: 'Sanayi sitelerinde paylaşılan internet altyapısı kalitesi, soğuk depo ortamlarında ağ donanımı koruması, küçük işletmelerin sınırlı IT bütçesiyle maksimum koruma ihtiyacı.',
    industries: ['gıda işleme', 'oto sanayi', 'küçük üretim', 'lojistik', 'depo'],
  },

  sultanbeyli: {
    area: 'Sultanbeyli',
    category: 'sanayi',
    businessLandscape: 'Sultanbeyli, küçük ölçekli üretim atölyeleri, mobilya imalathaneleri, inşaat malzemesi firmaları ve yerel ticaret merkezleriyle İstanbul\'un gelişmekte olan sanayi-ticaret bölgesidir. TEM otoyolu bağlantısı ile Pendik ve Tuzla sanayi bölgelerine yakındır.',
    typicalClient: '15 kişilik bir mobilya imalat atölyesi — CNC makinesi kontrol bilgisayarı, sipariş takip sistemi, müşteri veritabanı ve temel internet güvenliği ihtiyacı.',
    proximity: 'Sultanbeyli\'ye merkezimizden 25-35 dakikada erişim sağlıyoruz.',
    localChallenge: 'Kısıtlı fiber altyapı, bütçe öncelikli IT kararları, teknik personel bulmakta zorluk nedeniyle tam dış kaynak ihtiyacı.',
    industries: ['mobilya imalat', 'inşaat malzemesi', 'yerel ticaret', 'atölye', 'taşımacılık'],
  },

  // ══════════════════════════════════════════
  // GELİŞEN BÖLGE KATEGORİSİ
  // ══════════════════════════════════════════

  maltepe: {
    area: 'Maltepe',
    category: 'gelisen',
    businessLandscape: 'Maltepe, sahil dolgu alanlarıyla genişleyen ve Yalı Mahallesi\'nden Cevizli\'ye uzanan yeni iş alanlarıyla hızla dönüşen bir ilçedir. Haldızlar İş Merkezi, Maltepe Ticaret Merkezi ve E-5 üzeri ofis blokları; sağlık, eğitim ve perakende sektörlerinin yoğunlaştığı bölgelerdir.',
    typicalClient: '25 kişilik bir özel eğitim kurumu — öğrenci bilgi sistemi, sınıf içi interaktif ekranlar için ağ altyapısı, veli portali güvenliği ve KVKK uyumlu veri saklama.',
    proximity: 'Maltepe\'ye merkezimizden 15-20 dakikada ulaşıyoruz; bölgenin en hızlı müdahale edebildiğimiz ilçelerinden biri.',
    localChallenge: 'Yeni dönüşüm projelerinde henüz oturmamış altyapı, sahil dolgu alanlarında fiber erişim gecikmesi, küçük iş merkezlerinde paylaşılan ISP bağlantısı.',
    industries: ['eğitim', 'sağlık', 'perakende', 'gayrimenkul', 'muhasebe'],
  },

  kartal: {
    area: 'Kartal',
    category: 'gelisen',
    businessLandscape: 'Kartal, E-5 ve sahil arasında uzanan ticaret aksında hastaneler, Kartal Anadolu Adalet Sarayı çevresinde hukuk büroları, Soğanlık sanayi dönüşüm bölgesinde yeni ofis projeleri ve perakende merkezleriyle çeşitlenmiş bir iş profiline sahiptir.',
    typicalClient: '40 kişilik özel bir hastane — HBYS (hastane bilgi yönetim sistemi), tıbbi cihaz ağ entegrasyonu, hasta kayıt güvenliği ve 7/24 kesintisiz sistem gerekliliği.',
    proximity: 'Kartal\'a merkezimizden 20-25 dakikada ulaşıyoruz; acil sağlık sistemi arızalarında öncelikli müdahale sağlıyoruz.',
    localChallenge: 'Sağlık kuruluşlarında HBYS ve tıbbi cihaz ağı izolasyonu, adliye çevresinde yoğun trafik ve park sorunu nedeniyle planlı yerinde müdahale, eski sanayi binalarının ofis dönüşümünde altyapı yenileme.',
    industries: ['sağlık', 'hukuk', 'perakende', 'gayrimenkul', 'otomotiv'],
  },

  cekmekoy: {
    area: 'Çekmeköy',
    category: 'gelisen',
    businessLandscape: 'Çekmeköy, İstanbul\'un yeşil kuşağında konumlanan, son yıllarda konut ve iş alanlarıyla hızla büyüyen bir ilçedir. Teknoloji vadisi projeleri, Alemdağ Caddesi\'nde gelişen ticaret aksı ve yeni AVM\'lerin ofis katlarıyla genç girişimcileri çekmektedir.',
    typicalClient: '10-20 kişilik bir yazılım geliştirme girişimi — bulut tabanlı geliştirme ortamı, CI/CD pipeline güvenliği, uzaktan çalışan VPN altyapısı ve müşteri demo ortamları.',
    proximity: 'Çekmeköy\'e merkezimizden 25-35 dakikada ulaşıyoruz; Şile Otoyolu bağlantısı ile akıcı erişim sağlıyoruz.',
    localChallenge: 'Yeni yerleşim alanlarında fiber altyapının henüz her noktaya ulaşmaması, düşük nüfus yoğunluğu nedeniyle ISP seçenek azlığı, home office çalışanlar için kurumsal VPN performansı.',
    industries: ['yazılım', 'girişim', 'perakende', 'eğitim', 'sağlık'],
  },

  beykoz: {
    area: 'Beykoz',
    category: 'gelisen',
    businessLandscape: 'Beykoz, Kavacık iş bölgesi, Beykoz Kundura gibi dönüşüm projeleri, Boğaz hattındaki butik işletmeler ve Anadolu Hisarı çevresindeki turizm girişimleriyle niş ama kaliteli bir iş ekosistemi barındırır. Riva ve Polonezköy çevresinde kırsal turizm tesisleri de bulunur.',
    typicalClient: '12 kişilik bir butik otel — online booking motoru, misafir Wi-Fi yönetimi, POS entegrasyonu ve güvenlik kamera sistemi.',
    proximity: 'Beykoz Kavacık bölgesine merkezimizden 25-30 dakikada, kuzey Beykoz\'a 40-50 dakikada ulaşıyoruz.',
    localChallenge: 'Orman ve kırsal alanlarda zayıf internet altyapısı, mevsimsel turizm tesislerinde esnek ölçeklendirme ihtiyacı, tarihi yapılarda kablolama kısıtlamaları.',
    industries: ['turizm', 'otelcilik', 'gastronomi', 'kreatif endüstri', 'kırsal girişim'],
  },

  beylikduzu: {
    area: 'Beylikdüzü',
    category: 'gelisen',
    businessLandscape: 'Beylikdüzü, E-5 boyunca AVM\'ler, Beylikdüzü OSB, TÜYAP Fuar Merkezi ve yeni gelişen iş merkezleriyle İstanbul\'un batısında hızla büyüyen bir ticaret-sanayi bölgesidir. Uygun fiyatlı ofis alanları özellikle genç girişimcileri ve KOBİ\'leri çekmektedir.',
    typicalClient: '30 kişilik bir fuar/etkinlik organizasyon firması — geçici network kurulumu, TÜYAP fuarlarında stand bağlantıları, büyük dosya paylaşımı ve sezonluk kapasite yönetimi.',
    proximity: 'Beylikdüzü\'ne Anadolu Yakası\'ndan 55-70 dakikada ulaşıyoruz; uzaktan izleme ve yönetim altyapımız ile bu mesafeyi hissettirmiyoruz.',
    localChallenge: 'E-5 trafiği nedeniyle yerinde müdahale süresinin öngörülememesi, yeni OSB\'de henüz oturmamış fiber altyapı, TÜYAP fuarlarında geçici yüksek kapasite talebi.',
    industries: ['fuar/etkinlik', 'perakende', 'küçük sanayi', 'e-ticaret', 'mobilya'],
  },

  avcilar: {
    area: 'Avcılar',
    category: 'gelisen',
    businessLandscape: 'Avcılar, İstanbul Üniversitesi-Cerrahpaşa ve Marmara Üniversitesi kampüslerinin yakınındaki akademik çevre, Ambarlı Limanı\'nın beslediği lojistik firmaları ve Firuzköy sanayi bölgesiyle eğitim-lojistik-üretim üçgeninde konumlanan bir ilçedir.',
    typicalClient: '45 kişilik bir lojistik firması — liman operasyonları ile merkez ofis arasında VPN bağlantısı, konteyner takip sistemi, gümrük yazılımı sunucu yönetimi ve 7/24 operasyon IT desteği.',
    proximity: 'Avcılar\'a Anadolu Yakası\'ndan 55-65 dakikada erişim sağlıyoruz; uzaktan yönetim kapasitemiz bu bölgedeki müşterilerimiz için kritik öneme sahip.',
    localChallenge: 'Liman bölgesinde ağır araç trafiğinin internet altyapısına etkisi, üniversite çevresinde yüksek ağ yoğunluğu, lojistik operasyonlarda saha cihazları ile merkez arası güvenli iletişim.',
    industries: ['lojistik', 'gümrük', 'eğitim', 'üretim', 'nakliye'],
  },

  // ══════════════════════════════════════════
  // YAKIN BÖLGE KATEGORİSİ
  // ══════════════════════════════════════════

  kozyatagi: {
    area: 'Kozyatağı',
    category: 'yakin',
    businessLandscape: 'Kozyatağı, Kozyatağı Bilişim\'in merkez ofisinin bulunduğu bölgedir. E-5 Yanyolu üzerinde Quick Tower, Nidakule, Ataşehir Bulvarı ofisleri ve çevredeki iş hanlarıyla orta ve büyük ölçekli şirketlerin tercih ettiği prestijli bir iş bölgesidir.',
    typicalClient: '70 kişilik bir sigorta şirketi bölge müdürlüğü — acente bağlantıları, poliçe veritabanı güvenliği, SEGEM uyumlu altyapı ve kesintisiz müşteri hizmetleri telefon sistemi.',
    proximity: 'Kozyatağı ofisimize yürüme mesafesindeki işletmelere 5-10 dakika içinde yerinde müdahale ediyoruz. Kapı komşusu avantajımız burada en güçlü.',
    localChallenge: 'Plaza binalarında kiracı değişim hızı ve bunun yarattığı ağ konfigürasyon ihtiyacı, E-5 gürültüsü nedeniyle UPS ve klima bakımı, yoğun iş bölgesinde park sorunu nedeniyle planlı bakım zorunluluğu.',
    industries: ['sigorta', 'danışmanlık', 'finans', 'gayrimenkul', 'yazılım'],
  },

  icerenkoy: {
    area: 'İçerenköy',
    category: 'yakin',
    businessLandscape: 'İçerenköy, Kozyatağı Bilişim\'in merkez ofisinin (Quick Tower) bulunduğu mahalledir. E-5 Yanyolu boyunca iş merkezleri, Ataşehir sınırında ticaret alanları ve çevredeki küçük ofis blokları ile yoğun bir iş bölgesidir.',
    typicalClient: '20 kişilik bir dijital pazarlama ajansı — Google Ads/Meta kampanya yönetimi için stabil internet, büyük medya dosyaları için yerel depolama, müşteri hesap güvenliği ve ekip cihaz yönetimi.',
    proximity: 'İçerenköy, kelimenin tam anlamıyla kapımızın önüdür. 5 dakika içinde müdahale — İstanbul\'da hiçbir IT firması bu kadar hızlı erişim sunamaz.',
    localChallenge: 'E-5 kenarında titreşim ve toz nedeniyle sunucu odası bakımı, küçük ofislerde alan kısıtlamasında kompakt rack çözümü, ara sokaklarda fiber erişim kalitesi değişkenliği.',
    industries: ['dijital pazarlama', 'e-ticaret', 'muhasebe', 'danışmanlık', 'küçük ofis'],
  },

  kavacik: {
    area: 'Kavacık',
    category: 'yakin',
    businessLandscape: 'Kavacık, FSM Köprüsü çıkışında konumlanan ve İstanbul\'un her iki yakasına hızlı erişim sunan stratejik bir iş bölgesidir. DAP Royal Center, Veko Giz Plaza ve çevredeki ofis yapılarında ilaç firmaları, sağlık teknolojisi şirketleri ve uluslararası ticaret firmaları faaliyet gösterir.',
    typicalClient: '50 kişilik bir ilaç dağıtım firması — ITS (ilaç takip sistemi) sunucu yönetimi, soğuk zincir izleme, Sağlık Bakanlığı entegrasyonu ve GMP uyumlu IT altyapısı.',
    proximity: 'Kavacık\'a merkezimizden 20-25 dakikada ulaşıyoruz; FSM bağlantısıyla Avrupa Yakası müşterilerimize de bu noktadan koordinasyon sağlıyoruz.',
    localChallenge: 'Köprü trafiğinin internet ISP yönlendirmelerine etkisi, ilaç sektörünün katı regülasyon gereksinimleri, yüksek güvenlikli binalarda IT erişim prosedürleri.',
    industries: ['ilaç', 'sağlık teknolojisi', 'uluslararası ticaret', 'lojistik', 'danışmanlık'],
  },
};

/**
 * İlçe slug prefix'inden profil çeker.
 * cross-pages.js'deki slug: "atasehir-sunucu-kurulumu" → prefix: "atasehir"
 */
export function getDistrictProfile(slugPrefix) {
  return districtProfiles[slugPrefix] || null;
}

/**
 * İlçe slug prefix'inden kategori çeker.
 */
export function getDistrictCategory(slugPrefix) {
  const profile = districtProfiles[slugPrefix];
  return profile ? profile.category : null;
}
