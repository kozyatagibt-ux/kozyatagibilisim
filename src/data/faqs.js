// Sıkça sorulan sorular.
// `home: true` olanlar Anasayfa FAQ bölümünde gösterilir (kısa teaser).
// Tamamı /sss sayfasında kategori bazlı listelenir.
export const FAQ_CATEGORIES = [
    { id: 'genel', label: 'Genel & Hizmet Kapsamı' },
    { id: 'fiyat', label: 'Fiyatlandırma & Sözleşme' },
    { id: 'teknik', label: 'Teknik & Altyapı' },
    { id: 'guvenlik', label: 'Güvenlik & KVKK' },
    { id: 'gecis', label: 'Geçiş & Onboarding' },
];

export const faqs = [
    // ---------- GENEL ----------
    {
        category: 'genel',
        home: true,
        q: "Yönetilen IT (Managed IT) hizmeti nedir ve KOBİ'ler için neden önemlidir?",
        a: "Yönetilen IT hizmeti; sunucu, ağ, güvenlik, e-posta ve yedekleme gibi tüm IT altyapınızın profesyonel bir ekip tarafından sürekli izlenmesi, bakımı ve yönetilmesidir. KOBİ ve orta ölçekli işletmeler için tam zamanlı IT personeli istihdam etmenin maliyetinin çok altında, uzman ekip desteği sağlar. Sorunlar siz fark etmeden tespit edilir, bütçeniz öngörülebilir hale gelir ve iş sürekliliğiniz garanti altına alınır."
    },
    {
        category: 'genel',
        home: true,
        q: "Kozyatağı Bilişim hangi şehirlerde ve bölgelerde hizmet veriyor?",
        a: "Merkezimiz İstanbul Kadıköy Kozyatağı'nda bulunmaktadır. Anadolu Yakası (Kadıköy, Ataşehir, Maltepe, Ümraniye, Üsküdar) ve Avrupa Yakası dahil İstanbul'un tamamına yerinde destek sunuyoruz. Uzaktan yönetim altyapımız sayesinde Türkiye genelindeki tüm illere remote IT desteği sağlayabiliyoruz."
    },
    {
        category: 'genel',
        q: "Outsource IT mi yoksa kendi iç IT departmanımı kurmalı mıyım?",
        a: "100 kişinin altındaki şirketler için outsource IT genellikle %40-60 daha ekonomiktir. Tam zamanlı bir sistem yöneticisi maaş + SGK + ekipman + eğitim ile aylık 50-80 bin TL maliyet çıkartır ve tek kişiye bağımlılık yaratır. Outsource modelde uzman bir ekip, çoklu uzmanlık alanı ve kesintisiz hizmet alırsınız. 100+ kişilik işletmeler için hibrit model (junior in-house + outsource danışmanlık) idealdir."
    },
    {
        category: 'genel',
        q: "Kaç çalışanlı şirketlere hizmet veriyorsunuz?",
        a: "10 ile 250 çalışan arasındaki KOBİ ve orta ölçekli işletmeler asıl uzmanlık alanımızdır. Daha küçük (5-10 kişi) ofisler için de uygun fiyatlı paketlerimiz mevcut. 250+ çalışanlı kurumlarda ise mevcut iç IT ekibinize danışmanlık + sunucu/network yönetimi modelinde destek sağlıyoruz."
    },

    // ---------- FİYATLANDIRMA ----------
    {
        category: 'fiyat',
        home: true,
        q: "Aylık IT desteği fiyatları nasıl belirleniyor?",
        a: "Fiyatlandırma; çalışan sayısı, kullanılan sunucu/cihaz sayısı, hizmet kapsamı (sadece destek mi, yoksa sunucu/firewall yönetimi de dahil mi) ve SLA seviyesi (yanıt süresi garantisi) gibi faktörlere göre belirlenir. Ücretsiz keşif görüşmesi sonrası size özel, sabit aylık paket teklifi sunuyoruz. Sürpriz ek faturalarla karşılaşmazsınız."
    },
    {
        category: 'fiyat',
        q: "Sözleşme süresi ne kadar ve istediğimiz zaman çıkabilir miyiz?",
        a: "Standart sözleşmelerimiz 12 ay üzerinden yapılır ancak 30 günlük yazılı bildirimle çıkış hakkı tanırız. Cayma cezası uygulamayız. Sizden talep edilen tek şey, geçiş sürecinde altyapınızın belge ve şifrelerinin sorunsuz aktarımıdır. Dokümantasyonu güncel tutmak işimizin standart bir parçasıdır."
    },
    {
        category: 'fiyat',
        q: "Saatlik mi yoksa paket mi daha avantajlı?",
        a: "Yılda 20 saatten az IT işi çıkan çok küçük ofisler için saatlik model uygun olabilir. Bunun üzerindeki tüm şirketler için sabit aylık paket hem maliyet öngörülebilirliği hem de proaktif izleme avantajı nedeniyle çok daha avantajlıdır — çünkü saatlik modelde yalnızca yangın söndürürüz, paket modelde yangın çıkmasını engelleriz."
    },

    // ---------- TEKNİK ----------
    {
        category: 'teknik',
        home: true,
        q: "Acil bir IT sorununda yanıt süreniz ne kadar?",
        a: "SLA seviyenize bağlı olarak kritik problemlerde 15 dakika ile 1 saat arasında ilk müdahaleyi başlatıyoruz. Standart sözleşmelerimizde mesai saatlerinde 30 dakika içinde uzman bir teknisyen sorununuzla ilgilenmeye başlar. 7/24 destek paketi ile mesai dışı ve hafta sonu kritik müdahaleler de kapsam altındadır."
    },
    {
        category: 'teknik',
        q: "Sunucu yönetimi hizmeti hangi sistemleri kapsıyor?",
        a: "Windows Server, Linux (Ubuntu, Debian, CentOS, Rocky Linux), VMware ESXi ve Proxmox sanallaştırma platformları, Microsoft Active Directory, Exchange/Microsoft 365, dosya sunucuları, web sunucuları ve veritabanı sunucuları (MSSQL, PostgreSQL, MySQL) yönetimini kapsar. Uzaktan izleme, otomatik bakım, güvenlik yamaları ve performans optimizasyonu hizmetin standart parçalarıdır."
    },
    {
        category: 'teknik',
        q: "Bulut (cloud) çözümleri sunuyor musunuz? AWS, Azure ve Microsoft 365 kurulumu yapıyor musunuz?",
        a: "Evet. Microsoft 365 (Exchange Online, SharePoint, Teams, OneDrive), Google Workspace, Microsoft Azure ve AWS üzerinde kurulum, göç (migration), yedekleme ve güvenlik yapılandırması hizmetleri sunuyoruz. Hibrit (yerel + bulut) mimariler de tasarlıyoruz. İhtiyacınıza en uygun model için ücretsiz keşif sırasında detaylı analiz yapıyoruz."
    },
    {
        category: 'teknik',
        q: "Firewall (güvenlik duvarı) kurulumu ne kadar sürer ve hangi markaları kullanıyorsunuz?",
        a: "Standart bir KOBİ firewall kurulumu (cihaz teslimi, konfigürasyon, kural setleri, VPN ve raporlama) genellikle 1-3 iş günü içinde tamamlanır. Sophos, Fortinet, FortiGate ve Mikrotik başta olmak üzere kurumsal düzeyde kanıtlanmış markalarla çalışıyoruz. Şirketinizin büyüklüğüne, trafik hacmine ve bütçenize göre en uygun çözümü ücretsiz keşif sırasında öneriyoruz."
    },

    // ---------- GÜVENLİK & KVKK ----------
    {
        category: 'guvenlik',
        q: "KVKK uyumlu yedekleme ve veri saklama nasıl sağlanır?",
        a: "KVKK gereği kişisel veriler için: (1) erişim yetkisi kontrol altında tutulmalı, (2) veriler şifreli saklanmalı, (3) yedeklemeler düzenli yapılıp test edilmeli, (4) yurt dışı aktarım kuralları gözetilmelidir. Biz tüm yedeklemelerinizi şifreli olarak Türkiye'de bulunan veri merkezlerinde tutar, erişim loglarını kayıt altına alır ve KVKK denetimlerinde sunulabilecek raporlar üretiriz."
    },
    {
        category: 'guvenlik',
        q: "Siber saldırıya uğradık, acil yardım alabilir miyiz? Müşteriniz olmasak da?",
        a: "Evet. Acil siber olay müdahale (Incident Response) hizmetimiz mevcut müşterilerimize öncelikli, dış taleplere ise müsaitlik durumuna göre verilir. Fidye yazılımı, veri sızıntısı veya yetkisiz erişim şüphesinde 0541 636 77 75 numarasından bize ulaşabilirsiniz. İlk değerlendirme ücretsizdir; müdahale kapsamı netleştikten sonra şeffaf bir teklif sunulur."
    },
    {
        category: 'guvenlik',
        q: "5651 sayılı yasa kapsamında log tutma yükümlülüğümüzü siz mi karşılıyorsunuz?",
        a: "Evet. Ofisinizdeki internet erişim loglarının 2 yıl boyunca zaman damgalı ve değiştirilemez şekilde saklanması yasal zorunluluktur. Firewall veya hotspot çözümümüz üzerinden 5651 uyumlu log toplama, imzalama ve arşivleme hizmetini standart olarak sunuyoruz. Talep halinde resmi makamlara sunabileceğiniz formatta dışa aktarım yapıyoruz."
    },

    // ---------- GEÇİŞ ----------
    {
        category: 'gecis',
        q: "Mevcut altyapımızı bozmadan geçiş yapabilir miyiz?",
        a: "Evet. Tüm geçişlerimiz kademeli ve sıfır kesinti hedefiyle planlanır. Önce mevcut sisteminizi detaylı analiz ederiz, dokümante ederiz, kritik servislerin yedeklerini alırız. Geçiş genellikle mesai dışı saatlerde yapılır ve öncelikle test ortamında doğrulanır. İlk hafta paralel takip yaparak güvenli geçişi garanti altına alırız."
    },
    {
        category: 'gecis',
        q: "Onboarding süreci ne kadar sürer?",
        a: "Tipik bir 30-50 çalışanlı şirket için onboarding 1-2 hafta sürer: 1. hafta envanter çıkarma, dokümantasyon, izleme ajanlarının kurulumu; 2. hafta erişim devri, kritik sistemlere yedekleme entegrasyonu, ekibinize tanıtım. Bu süreçte çalışanlarınızın işine devam etmesi etkilenmez."
    },
];

// Anasayfa için kısa teaser (4 soru)
export const homeFaqs = faqs.filter((f) => f.home);
