/**
 * Service × District-Category açı matrisi.
 * 9 hizmet × 5 kategori = 45 unique içerik bloğu.
 *
 * Her blok cross sayfalarda şu bölümleri besler:
 *  - scenario       : O kategorideki işletme için gerçekçi senaryo (~4-5 cümle)
 *  - whyHere        : Neden bu hizmet bu bölge tipinde kritik (~3-4 cümle)
 *  - technicalAngle : Teknik yaklaşım, ürün/yöntem önerileri (~4-5 cümle)
 *  - faqs           : 3 adet (bölge+hizmet özel) soru-cevap
 */

export const serviceAngles = {
  // ══════════════════════════════════════════════════════════════════
  // 1) SUNUCU KURULUMU & SANALLAŞTIRMA
  // ══════════════════════════════════════════════════════════════════
  'sunucu-sanallastirma': {
    finans: {
      scenario: 'Bir yatırım danışmanlığı firmasında işe başlayan yeni analist, müşteri portföy dosyalarına erişmek istediğinde Excel dosyası 40 saniye açılıyor. CFO\'nun raporu sunucuya kaydetmeye çalıştığı anda başka bir kullanıcının aynı klasörü taraması sunucuyu 1 dakika kilitliyor. Disk I/O darboğazı, tek sunucuda VM yoğunluğu ve yanlış yapılandırılmış RAID yüzünden kaybedilen dakikalar faturalanabilir zamandan çıkıyor.',
      whyHere: 'Finans bölgesinde her dakika para demektir; sunucunun yavaş olması sadece konfor değil, BDDK/SPK raporlama takvimlerini ve müşteri SLA\'larını doğrudan etkiler. Plaza katındaki 50+ kişinin aynı anda CRM, e-posta ve dosya sunucusuna yüklendiği ortamda, tek fiziksel sunucu yerine kümelenmiş sanallaştırma şarttır.',
      technicalAngle: 'Tercihimiz çoğunlukla 2-node VMware vSAN veya Proxmox HA kümesi üzerine NVMe tabanlı all-flash storage. Finans uygulamaları için VM başına CPU reservation, MS SQL workload\'larına özel latency-sensitive profil ve UPS/jenerator uyumlu graceful shutdown script\'leri yapılandırıyoruz. Snapshot\'ları her 15 dakikada alıp offsite bir Veeam repo\'ya replike ediyor, RPO\'yu 15 dakikaya çekiyoruz.',
      faqs: [
        {
          q: 'Finans firmamızın BDDK/SPK denetimleri için sunucu log kayıtları ne kadar süreyle saklanmalı, siz bunu otomatik yönetiyor musunuz?',
          a: 'Sektör regülasyonuna göre 5-10 yıl saklama gerekir. Sunucu log\'larını WORM (write-once) uyumlu bir repo\'ya hash\'leyerek arşivliyor, retention policy\'yi denetim takvimine göre yapılandırıyoruz.'
        },
        {
          q: 'Plazamızda elektrik kesintisi olursa trading/işlem uygulamalarımız zarar görür mü?',
          a: 'Çift UPS + jeneratör uyumlu bir graceful shutdown hiyerarşisi kurgularız; kritik DB sunucuları son kapanan, ilk açılan olur. Hot standby node varsa failover 30 saniye altındadır.'
        },
        {
          q: 'Mevcut fiziksel sunucumuzu sanallaştırma ortamına kesintisiz taşıyabilir misiniz?',
          a: 'Evet, VMware Converter veya Veeam Agent ile P2V (physical-to-virtual) migration\'ı hafta sonu bakım penceresinde 2-6 saat arasında tamamlıyor, geri dönüş için fallback görüntüsünü saklıyoruz.'
        },
      ],
    },
    ticaret: {
      scenario: 'Bir e-ticaret şirketinde her Pazartesi 09:30\'da ERP sunucusuna 40 kişi aynı anda bağlanıyor; sunucu CPU %98\'e tırmanıyor, satın alma siparişleri onaylanamıyor. Aynı sunucuda hem MSSQL hem de dosya paylaşımı hem de domain controller döndüğü için kaynaklar çakışıyor. Donanım 5 yaşında, garantisi bitmiş; bir disk arızasında verinin ne kadarının kurtarılacağı belirsiz.',
      whyHere: 'Ticaret/perakende bölgelerinde iş saat kavramı esnektir; kampanya günleri, ay sonu kapanışları ve stok aktarımları sunucuyu zirve yüküne iter. ERP+muhasebe+dosya tek makinede dönerken, büyüme anında sistem kırılgan hale gelir.',
      technicalAngle: 'Role ayrımı (DC, DB, File, App) yapıp her birini ayrı VM\'e çekiyor, genellikle 2x Xeon / 256GB RAM / NVMe mirror bir host üzerine Proxmox veya Hyper-V kuruyoruz. ERP veritabanı için dedicated disk kanalı ve haftalık integrity check, dosya sunucusuna shadow copy (VSS) ile self-service geri yükleme açıyoruz. Lisanslamayı Windows Server Datacenter ile VM başına maliyet düşürerek kuruyoruz.',
      faqs: [
        {
          q: 'Logo/Mikro/Netsis gibi ERP\'miz sanal sunucuda çalışır mı, performans düşer mi?',
          a: 'Doğru yapılandırmada performans genellikle fiziksele göre %5-10 daha iyi olur. Veritabanı VM\'ine CPU/RAM reservation ve paravirtual SCSI/VirtIO sürücüleri vererek I/O gecikmesini düşürüyoruz.'
        },
        {
          q: 'Yıl sonu envanter dönemi gibi pik zamanlarda sunucu yavaşlarsa anlık kaynak artırabilir miyiz?',
          a: 'Evet, sanallaştırmanın en büyük avantajı bu. Sunucu kapalı değilken bile CPU/RAM\'i hot-add ile artırabiliyor, kampanya bittikten sonra geri çekebiliyoruz.'
        },
        {
          q: 'E-ticaret sitemizin veritabanı mağazadaki sunucuda mı olsun, bulut mu?',
          a: 'Genellikle hibrit öneririz: işlem DB\'si lokalde düşük latency için, yedek ve analitik replikası bulutta. Bu hem e-ticaret çalışma saatleri dışında iş sürekliliği sağlar hem de offsite yedekleme kuralını karşılar.'
        },
      ],
    },
    sanayi: {
      scenario: 'Bir OSB\'deki üretim tesisinde MES (Manufacturing Execution System) sunucusu üretim hattındaki PLC\'lerden veri topluyor. Sunucu odası klima arızalanınca sıcaklık 42°C\'ye çıktı; disk alarm verdi, vardiya amiri fark edene kadar üretim verisi 3 saat kayıp. Fabrika ofisindeki "sunucu odası" aslında malzeme deposunun köşesinde toz içinde duran bir kabindi.',
      whyHere: 'Sanayi bölgelerinde sunucu sadece ofis değil, üretim hattının bir parçasıdır. Sunucu saatte 1 dakika dursa bir hat birkaç bin TL üretimden çıkar. Toz, titreşim, sıcaklık, elektrik dalgalanması — kurumsal plazadaki sunucunun görmeyeceği saldırı vektörleri vardır.',
      technicalAngle: 'Endüstriyel ortamlara tozsuzlaştırılmış, kilitli rack kabinet + ayrı klima + sıcaklık/nem/kapı sensörlü bir sunucu odası kuruyoruz. MES/SCADA verisi için OT/IT segmentasyonlu network üzerinden alınır; sunucu VM\'leri üretim ve ofis olmak üzere ayrı VLAN\'lara bağlanır. Haftalık otomatik patching ama üretim bakım penceresi dışında zamanlanır — üretim sırasında asla reboot olmaz.',
      faqs: [
        {
          q: 'Fabrikamızın ofis binasında IP67 uyumlu rack var mı, olmayan yere sunucu kurar mısınız?',
          a: 'Toz/nem yoğun ortamda IP54+ kabinet, filtre fanı ve pozitif hava basıncı öneririz. Mevcut alan uygun değilse küçük bir prefabrik "server kiti" kurulumu da yapıyoruz (5-8 m² yeterli).'
        },
        {
          q: 'Üretim sunucumuz (MES/SCADA) ofis sunucusundan ayrı mı dursun?',
          a: 'Evet, Purdue modeli gereği OT ve IT katmanları ayrılmalı. Üretim ağındaki sunucu ofis internetine doğrudan çıkmaz; sadece DMZ üzerinden veri gönderir.'
        },
        {
          q: 'Vardiya 7/24 sürüyor, bakım için sunucu ne zaman kapatılabilir?',
          a: 'Bakım penceresini genellikle Pazar 06:00-10:00 vardiya devri arasında yapıyor, kritik işler için failover cluster kurarak sıfır kesinti hedefiyle çalışıyoruz.'
        },
      ],
    },
    gelisen: {
      scenario: 'Yeni taşındığı modern iş merkezinde 30 kişilik bir mimarlık ofisi, eski ofisten getirdiği tower sunucuyu bir dolabın içine koymuş. 3D render dosyaları 80GB\'ı geçtiği için paylaşım klasörü haftada bir doluyor; mimar bilgisayarından ekleme yaparken sunucu down oluyor. Sunucu odası yok, klima yok, yedekleme "harici diske kopyalama" şeklinde.',
      whyHere: 'Gelişen iş bölgelerinde firmalar hızlı büyüyor ama altyapı büyüme hızına yetişmiyor. Ofis güzel ama sunucu mutfak yanındaki dolapta. Bu tip bölgelerde "doğru zamanda doğru boyda" sunucu çözümü — ne fazla yatırım ne darboğaz — kritik.',
      technicalAngle: 'Kullanıcı sayısı 15-40 aralığındaysa genelde tek bir 2U rack server üzerinde Hyper-V veya Proxmox kurup 4-5 VM sığdırıyoruz. Render/CAD dosya yükü varsa NVMe tiered storage + 10GbE iç ağ öneriyoruz. Depolamayı ileride hibrit buluta genişletmek için Azure File Sync veya Synology Hybrid Share ile başlangıç yapıyoruz.',
      faqs: [
        {
          q: 'Şirketimiz hızla büyüyor, 6 ay sonra çalışan sayımız ikiye katlanabilir. Sunucuyu şimdi nasıl ölçeklendirelim?',
          a: 'Başlangıçta ihtiyacınızın 1.5 katı CPU/RAM olan ama boş disk slot\'ları kalan bir şasi seçiyoruz. RAM/disk later-add ile 2 yıl içinde sunucu değiştirmeden büyüyebilirsiniz.'
        },
        {
          q: 'Yeni taşındığımız ofiste sunucu odası yok, sunucuyu kablolu dolapta tutabilir miyiz?',
          a: 'Küçük ofislerde "sessiz" 2U sunucu + ses izolasyonlu mini rack + bağımsız split klima ile küçük bir server alanı oluşturabiliyoruz. Alan çok kısıtlıysa kiralık colocation bir seçenek.'
        },
        {
          q: 'Mimarlık/reklam ajansı gibi büyük dosyalarla çalışıyoruz, sunucu yerine sadece NAS yeter mi?',
          a: 'Sadece dosya paylaşımı yetiyorsa NAS ucuzdur. Ama Active Directory, uygulama sunucusu veya merkezi yedekleme eklenecekse sunucu + NAS kombinasyonu daha sürdürülebilir.'
        },
      ],
    },
    yakin: {
      scenario: 'Kozyatağı Bilişim\'in 10 dakika mesafedeki bir müşterisi, ofisinde 5 yaşındaki sunucunun ses çıkarmaya başladığını bildirdi. Aynı gün öğleden sonra sunucu odasında disk değişimi yapıyor, hot-spare ile RAID rebuild\'i başlatıyor, kullanıcılar hiçbir şey hissetmeden çalışmaya devam ediyor. Bu yakın ilçe avantajının somut karşılığı: koruyucu bakımın ertelenmediği bir sunucu yaşam döngüsü.',
      whyHere: 'Kozyatağı, İçerenköy, Kavacık gibi merkeze yakın bölgelerde müşterilerimiz "sunucuya sabah bakarız" dediğimizde bunun gerçekten sabah olduğunu biliyor. Proaktif bakım, disk değişimi, ısıl görüntüleme, firmware güncelleme gibi işler sadece yakın bölgede bu sıklıkta mümkün.',
      technicalAngle: 'Yakın müşterilerde genellikle çeyrek bazlı fiziki ziyaret + sürekli uzaktan izleme hibritini kuruyoruz. Sunucu sağlık raporu (disk SMART, fan RPM, sıcaklık log\'u, ECC hata sayacı) her 30 günde bir otomatik üretilir ve kritik eşik aşılırsa aynı gün yerinde müdahale planlanır.',
      faqs: [
        {
          q: 'Merkezinize çok yakınız, sunucu arızasında ne kadar sürede gelirsiniz?',
          a: 'Kozyatağı ve çevresindeki müşterilerimize ortalama 15-25 dakika içinde ulaşıyoruz. Planlı ziyaretleri ise aynı gün içinde esneklikle yapabiliyoruz.'
        },
        {
          q: 'Küçük ofisimize gerçekten sunucu lazım mı, bir NAS + bulut yetmez mi?',
          a: '10 kişi altı ve sadece dosya paylaşımı varsa NAS+bulut çoğu zaman yeter. Muhasebe programı, AD, domain ortamı varsa küçük bir sunucu daha sürdürülebilir.'
        },
        {
          q: 'Sunucumuzun garantisi bitti, yenisini alana kadar ne yapabiliriz?',
          a: 'Köprü çözüm olarak disk replikasyonu kurup yedek sunucuda VM olarak tutabilir, arıza halinde 30 dakika içinde devreye alabiliyoruz. Bu süreçte yeni donanımı planlayabiliriz.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 2) KİMLİK YÖNETİMİ (Active Directory / Azure AD)
  // ══════════════════════════════════════════════════════════════════
  'kimlik-yonetimi': {
    finans: {
      scenario: 'Bir denetim firmasında ayrılan kıdemli denetçi, çıkış görüşmesinden 2 hafta sonra hâlâ şirket VPN\'ine bağlanıyor, eski müşteri dosyalarına erişebiliyor. Çünkü kullanıcı 11 farklı sistemde (AD, mail, DMS, Office 365, VPN, muhasebe...) ayrı hesapla tanımlıydı ve IT sadece AD\'yi kapatmış. Bu, KVKK\'nın "yetkisiz erişim" maddesinin açık ihlali.',
      whyHere: 'Finans/denetim firmalarında personel devir hızı yüksek ve işten ayrılma sonrası erişim iptali dakikalar içinde tamamlanmalı. Her hesabın manuel kapatılması hem hata riskli hem denetim bulgusuna açık; merkezi kimlik yönetimi regülasyon gereği.',
      technicalAngle: 'Azure AD / Entra ID\'yi on-prem AD ile hibrit kurup SSO\'yu Office 365, muhasebe, CRM ve DMS uygulamalarına bağlıyoruz. Conditional Access ile "sadece şirket cihazından + Türkiye\'den + MFA ile" erişim şartı, PIM ile yöneticilere just-in-time yetki veriyoruz. Offboarding için otomatik bir runbook: kullanıcı AD\'de devre dışı bırakılınca tüm bağlı uygulamalar 5 dakika içinde kapanır.',
      faqs: [
        {
          q: 'KVKK denetimi için kullanıcı yetkilerini kim neye erişti raporu isteniyor, sağlayabilir misiniz?',
          a: 'Azure AD Sign-in Logs + Unified Audit Log üzerinden son 180 günlük erişim raporu alınabilir. Uzun vadeli arşiv için Log Analytics Workspace\'e akıtıp 1 yıl retention yapılandırıyoruz.'
        },
        {
          q: 'Yurt dışı müşterimizin SOC 2 denetiminde MFA ve access review talebi var, nasıl karşılarız?',
          a: 'Conditional Access ile tüm kullanıcılara MFA zorunlu, üst yöneticilere FIDO2 anahtarı öneriyoruz. Access Review\'ı Entra ID Governance ile 3 ayda bir otomatik başlatıp yöneticilere onay akışı kuruyoruz.'
        },
        {
          q: 'Denetçilerimiz müşteri ofisinden şirket sistemlerine erişiyor, güvenli mi?',
          a: 'Conditional Access\'te "compliant device + MFA" zorunlu kılınır, mümkünse ayrı bir "field worker" grup ile sadece belirli uygulamalara kısıtlı erişim verilir.'
        },
      ],
    },
    ticaret: {
      scenario: 'Perakende firmasında 4 şube var, her şubede satış-kasa-depo-muhasebe kullanıcıları farklı bilgisayarlarda yerel hesap olarak tanımlı. Şube müdürü değişiminde, yeni müdürün eski şubedeki dosyalara erişimini kapatmak günlerce sürüyor. Dosya paylaşım şifreleri bir Excel\'de duruyor, herkes kullanıyor.',
      whyHere: 'Çok şubeli/çok lokasyonlu ticaret yapılarında merkezi kimlik olmadığında, her şube bir ada gibi çalışır. Rotasyon, geçici görevlendirmeler, sezonluk personel — AD/Azure AD olmadan yönetilemez.',
      technicalAngle: 'Merkezde bir Domain Controller + şubelerde read-only DC (RODC) veya Azure AD Join ile bulut-tabanlı kimlik kuruyoruz. OU yapısı şube/departman bazlı; GPO ile USB kilidi, ekran kilidi, masaüstü politikaları uygulanıyor. Şube müdürü kendi personeline şifre reset yapabilsin diye SSPR (self-service password reset) + helpdesk delegation yapılandırıyoruz.',
      faqs: [
        {
          q: 'Şubelerimiz arası internet bağlantısı yavaş, AD bunu kaldırır mı?',
          a: 'Şubelerde RODC + site-aware authentication ile yerel giriş mümkün. İnternet kesilse bile şube içi kullanıcılar oturum açabilir, merkeze erişim gerektiren işlemler tekrar bağlandığında senkronize olur.'
        },
        {
          q: 'Sezonluk personel alıyoruz, hesap açma/kapama otomatikleşir mi?',
          a: 'İK sisteminden HR feed ile Azure AD\'ye entegrasyon kurulabilir; işe giriş gününde hesap otomatik açılır, çıkış tarihi gelince otomatik kapanır.'
        },
        {
          q: 'Şube bilgisayarlarında yerel admin hesabı var, bunu nasıl güvenli hale getiririz?',
          a: 'LAPS (Local Admin Password Solution) ile her bilgisayara benzersiz, 30 günde bir değişen şifre atıyor, merkezi olarak yetkili IT kişisi görebiliyor.'
        },
      ],
    },
    sanayi: {
      scenario: 'Bir üretim tesisinde vardiya değişiminde operatör, kendi hesabıyla CNC kontrol yazılımına giremiyor; "ustabaşı\'nın şifresini" kullanıyor. Bu, üretim hatasında kimin sorumlu olduğunun belirlenememesi demek. Ayrıca BT\'nin hiç haberi olmayan 40+ yerel hesap makinelerde dolaşıyor.',
      whyHere: 'Sanayide IT ve OT (operasyonel teknoloji) ayrıldığı için kimlik yönetimi her iki katmanda da gerekli. Vardiya kullanıcıları, yetki devir-teslimi, üretim hatalarında accountability için AD kritik.',
      technicalAngle: 'Ofis katmanı için klasik AD, üretim katmanı için ayrı bir domain ya da workgroup mode + RBAC uygulama düzeyinde. Shared-shift user yerine "vardiya-mavi-ustabasi" gibi rol bazlı hesaplar ve oturum kaydı (user activity recording) kuruyoruz. HMI/SCADA\'ya giriş sadece vardiya saatlerinde açılır, vardiya bitince otomatik kilitlenir.',
      faqs: [
        {
          q: 'Vardiyalı çalıştığımız için bir bilgisayarı 3 kişi kullanıyor, AD nasıl çalışır?',
          a: 'Hızlı kullanıcı değişimi (fast user switching) veya shared workstation mode ile aynı makinede 3 ayrı profil açılır; vardiya başında kim giriş yaptığı log\'lanır.'
        },
        {
          q: 'Üretim sunucumuz (SCADA) AD ile entegre edilmeli mi?',
          a: 'Kritik SCADA/HMI sistemleri güvenlik için ofis AD\'sinden izole tutulmalı. Üretim için ayrı bir AD ormanı veya yerel kimlik havuzu öneriyoruz.'
        },
        {
          q: 'ISO 27001 denetiminde kullanıcı yetki matrisi soruluyor, nasıl hazırlarız?',
          a: 'AD\'deki OU/Group yapısından otomatik rapor üretilir; her departman/rol için erişim yetkileri tablolaştırılır ve 6 ayda bir erişim gözden geçirme (access review) kaydı tutulur.'
        },
      ],
    },
    gelisen: {
      scenario: 'Startup\'ın 12 kişilik ekibi her çalışan kendi Gmail\'i ile Slack\'e, Notion\'a, Figma\'ya giriyor. Üç ay sonra kimin neye erişimi olduğunun haritası yok. Kurucu ortaklarından biri ayrılınca — şirket maili, kod deposu, müşteri panelini sırayla kapatmak günler sürüyor ve en az birinde gözden kaçıyor.',
      whyHere: 'Gelişen bölgelerdeki startup/SaaS firmaları bulut-öncelikli doğdukları için "sunucu gerekmeyeceği" mitiyle kimlik yönetimine geç kalıyor. Ama 10+ çalışanda SaaS hesap patlaması (ortalama 30+ uygulama) başlayınca kontrol kaybediliyor.',
      technicalAngle: 'Cloud-first ekipler için Azure AD / Google Workspace merkezli, SAML/OIDC ile 15-30 uygulamaya SSO entegrasyonu kuruyoruz. JumpCloud veya Okta Starter gibi hafif çözümler 50 kullanıcı altında ekonomik. Slack, GitHub, AWS, Notion gibi kritik uygulamaları provisioning/deprovisioning akışına bağlıyoruz.',
      faqs: [
        {
          q: 'Bulut tabanlı çalışıyoruz, sunucumuz yok — yine de AD kurabilir miyiz?',
          a: 'Kesinlikle. Azure AD / Entra ID tamamen buluttadır; fiziksel sunucuya ihtiyaç yok. Kullandığınız SaaS uygulamaları SSO ile buna bağlanır.'
        },
        {
          q: 'Hızlı büyüyoruz, 30\'dan 100 kişiye çıkacağız — şimdi kurmak erken mi?',
          a: 'Tam tersi, doğru zamandır. 15-30 kullanıcı aralığında kurmak, 100 kişide birden kaos çözmekten çok daha kolaydır.'
        },
        {
          q: 'Ekip uzaktan çalışıyor, merkez ofisimiz yok. Farkeder mi?',
          a: 'Hayır, hatta bu durumda bulut tabanlı kimlik yönetimi daha da kritiktir; Conditional Access ile her yerden güvenli erişim sağlarız.'
        },
      ],
    },
    yakin: {
      scenario: 'Merkeze 10 dakika mesafedeki müşterimizde yeni işe başlayan 3 çalışan için salı sabahı 09:00\'da saha ziyareti planlandı: bilgisayarlar hazırlanır, AD hesapları açılır, e-postalar kurulur, telefonlara Teams/Outlook yüklenir. 11:30\'da ekip tam üretimde. Yakın mesafe olunca onboarding günlere değil saatlere sığıyor.',
      whyHere: 'Yakın müşterilerde kimlik yönetimi sadece teknoloji değil, deneyim. İşe başlayan çalışanın ilk gününde her şeyin hazır olması, IT\'nin ofiste olabilmesiyle mümkün.',
      technicalAngle: 'Standart onboarding paketi hazırlıyoruz: AD hesabı, Office 365 lisansı, e-posta grupları, MDM ile cihaz kaydı, VPN profili, departman klasörlerine erişim — checklist üzerinden 30-45 dakikada tamamlanır. Offboarding için de aynı şekilde tek tıkla otomasyon.',
      faqs: [
        {
          q: 'Yeni personel için AD kurulumu ne kadar sürer?',
          a: 'Standart bir kullanıcı onboarding ortalama 30-45 dakika; yerinde geldiğimizde aynı gün içinde tamamlanır.'
        },
        {
          q: 'Şifre sıfırlama talebi olduğunda ne kadar sürede çözülür?',
          a: 'Uzaktan ortalama 5 dakika; gerekirse yakın olduğumuz için yerinde yarım saat içinde halledebiliriz.'
        },
        {
          q: 'Yöneticilerimizin MFA cihazı kaybolursa ne yaparız?',
          a: 'Backup kod + FIDO2 yedek anahtarı uygulaması standartımızdır; kaybolursa yerinde ziyaretle yeni MFA cihazı hemen aktifleştiriliyor.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 3) DOSYA PAYLAŞIMI & NAS
  // ══════════════════════════════════════════════════════════════════
  'dosya-paylasim': {
    finans: {
      scenario: 'Bağımsız denetim firmasının kıdemli denetçisi müşteri dosyasını kişisel Gmail\'ine atıp eve götürüyor; sabah müşteri ofisine oradan erişsin diye. Bu KVKK ve SOX açısından felaket; müşteri verisi firmanın güvenlik çemberinden çıktı. Ayrıca dosya versiyonları karışıyor, "son hali hangi?" kavgası başlıyor.',
      whyHere: 'Finans ve denetim firmalarında her dosya bir müşteri sırrı. Paylaşım izinsiz kanallardan akmaya başladığında regülatör denetiminde ciddi yaptırım gelir. Merkezi, izlenen, izinli bir dosya altyapısı zorunludur.',
      technicalAngle: 'Client klasörü başına bir tim ve confidentiality seviyesi olan bir DMS + versiyon kontrollü paylaşım kuruyoruz. SharePoint Online veya Egnyte gibi KVKK uyumlu çözümler, external sharing link\'leri DLP ile taranır. Watermark + görüntüleme kısıtı + indirme kilidi kritik müşteri dosyalarında aktive edilir.',
      faqs: [
        {
          q: 'Müşterimizle dosya paylaşırken e-posta eki güvenli değil — alternatif nedir?',
          a: 'SharePoint veya Egnyte üzerinden "şifre + süre sınırlı link" ile paylaşım yaparız; indirme sayısı ve erişen IP\'ler loglanır.'
        },
        {
          q: 'KVKK için paylaşım kayıtları ne kadar saklanıyor?',
          a: 'Varsayılan 90 gün olan audit log retention\'ı kurumsal plan ile 10 yıla kadar uzatıyor, önemli dosya erişimlerini ayrı Log Analytics\'e akıtıyoruz.'
        },
        {
          q: 'Denetçi müşterinin ofisinde dosyaya erişirken internetsiz kalırsa?',
          a: 'OneDrive Known Folder Move + offline cache ile ihtiyaç dosyaları yerelde şifreli tutulur; online olunca senkronize olur.'
        },
      ],
    },
    ticaret: {
      scenario: 'Perakende zincirinde ürün kataloğu 400GB görsel içeriyor. Fotoğrafçı yeni çekimleri WeTransfer ile atıyor, pazarlama USB bellekle alıyor, mağaza e-posta ekiyle istiyor. Aynı ürünün 5 farklı versiyonu 5 farklı yerde. Kampanya günü yanlış fotoğraf canlıya çıkıyor.',
      whyHere: 'Ticaret/perakende tarafında görsel ve ürün dokümanları merkezi değilse operasyonel kaos kaçınılmaz. Herkes aynı klasöre bakıyor olmalı, tek gerçek kaynak (single source of truth) olmalı.',
      technicalAngle: 'Genellikle Synology/QNAP NAS + SMB3 paylaşım ya da bulut tercih edilirse SharePoint/Google Drive Business. Ürün bazlı klasör yapısı, DAM (digital asset management) metadata\'sı, otomatik versiyon yedekleme. 10GbE iç ağla mağaza fotoğrafçılığı ekibinin büyük dosyalara doğrudan erişimi sağlanır.',
      faqs: [
        {
          q: 'Bayi/franchise ağımızla hangi dosyaları paylaşabiliriz?',
          a: 'Read-only bayi portalı kurulur; ürün katalog, fiyat listesi, pazarlama materyalleri bir klasörde, her bayi sadece kendi klasörüne erişir.'
        },
        {
          q: 'Kampanya döneminde 20 kişi aynı dosyaya bakınca NAS yavaşlar mı?',
          a: '10GbE SFP+ bağlantı + SSD cache\'li NAS yapılandırmasıyla 50+ kullanıcı darboğaz yaşamadan çalışabilir.'
        },
        {
          q: 'Görseller ve ürün dosyalarını buluta taşıyalım mı?',
          a: 'Sıcak (sık kullanılan) veriyi yerel NAS\'ta, arşivi buluta taşıyan hibrit tiered storage en ekonomik çözüm olur.'
        },
      ],
    },
    sanayi: {
      scenario: 'Makine imalatçısı firma teknik çizimleri (CAD dosyaları 200-500MB) mühendisler arası USB ve e-posta ile dolaşıyor. Son revizyon hangisi belirsiz, üretim yanlış rev\'e göre parça kesiyor, 3 günlük üretim çöpe. Ayrıca çizim dosyaları yedeklenmiyor, bilgisayar formatlanınca 2 aylık iş kayboldu.',
      whyHere: 'Sanayide CAD/PDM dosyaları kurumsal hafızadır; bir versiyonun yanlış kullanımı üretim kaybı demek. Revizyon kontrolü, check-in/check-out kilitleme, yedekli depolama şart.',
      technicalAngle: 'SolidWorks PDM, Autodesk Vault gibi PDM sistemleri yoksa en azından versiyon kontrollü dosya sunucusu (SMB + ShadowCopy + otomatik versiyonlama) kuruyoruz. Üretim ağından dosyalara read-only erişim, mühendislerden full. Her gece CAD klasörü farklı fiziksel NAS\'a replike edilir.',
      faqs: [
        {
          q: 'Mühendislik CAD sunucusu üretim ağıyla paylaşılmalı mı?',
          a: 'Üretim sadece okuma erişimi alır, mühendisler yazma. Bu sayede yanlış revizyon üretime girmez, yetkisiz değişiklik olmaz.'
        },
        {
          q: 'Dosya revizyonu için PDM yazılımı şart mı?',
          a: 'Büyük ekip (15+ mühendis) için evet. Küçük ekipler için klasör bazlı versiyonlama + shadow copy yeterli olabilir.'
        },
        {
          q: 'Üretim tarihi geçen projelerin çizimleri ne kadar saklanmalı?',
          a: 'Makine imalatında genellikle 10 yıl servis yükümlülüğü için saklanır; soğuk arşiv (cold storage) bulut ile düşük maliyetle yönetiriz.'
        },
      ],
    },
    gelisen: {
      scenario: 'Reklam ajansı 25 kişiye ulaşmış; video dosyaları Dropbox\'ta, hesap sahibi kurucu ortak. Ayrılan bir kıdemli tasarımcı kendi Dropbox\'ından müşteri dosyalarını silmemiş ama erişimi kapatılamıyor. Aylık 2TB Dropbox faturası ama kimin neyi kullandığı belirsiz.',
      whyHere: 'Gelişen ofislerde "herkes ayrı SaaS" yaklaşımı çığ gibi büyür. Merkezileştirme şart ama teknik borç birikmeden yapmak lazım.',
      technicalAngle: 'Ajans/yaratıcı ekipler için Google Workspace + Shared Drives veya SharePoint + OneDrive. 10GbE iç ağlı Synology NAS video editörler için. Külü proje arşivi Backblaze B2/Wasabi gibi düşük maliyetli cold storage\'a taşınır.',
      faqs: [
        {
          q: 'Kurucu ortağın Dropbox hesabındaki şirket dosyalarını nasıl kurtarırız?',
          a: 'Dropbox admin console üzerinden kontrol devri mümkün; sonrasında Shared Drives\'a veya kurumsal bir depolama çözümüne göç ediyoruz.'
        },
        {
          q: 'Video/tasarım ekibimiz için en hızlı paylaşım çözümü nedir?',
          a: '10GbE bağlantılı NAS üzerinde direct-attached paylaşım ve proxy workflow; 4K video bile smooth scrub edilebilir.'
        },
        {
          q: 'Hızlı büyüyoruz, ileride buluta geçmek zorunda kalırsak zor olur mu?',
          a: 'NAS\'ı bulut sync uyumlu seçersek (Synology Hybrid Share, Azure File Sync), ileride minimum kesintiyle buluta hibrit geçiş mümkündür.'
        },
      ],
    },
    yakin: {
      scenario: 'Müşterimizde NAS diski kırmızı LED\'e döndüğünde, aynı gün öğleden sonra yedek disk elimizde yerinde değişim yapıyoruz, RAID rebuild sırasında ekip çalışmaya devam ediyor. Yakın olduğumuz için disk stoğumuzda aynı modelden hazır var — 48 saat kargo beklemeye gerek kalmıyor.',
      whyHere: 'Yakın müşterilerde donanım sağlığı proaktif yönetiliyor. Disk S.M.A.R.T. alarmları otomatik bildiriliyor, aynı gün değişim mümkün.',
      technicalAngle: 'Standart NAS müşterilerimiz için disk stoklarımızı hazır tutuyor, firmware uyumluluğunu test ediyoruz. 3-2-1 yedekleme kuralı: NAS\'ta primary, ikinci NAS\'ta replica, offsite buluta 3. kopya.',
      faqs: [
        {
          q: 'NAS diskimiz arızalanırsa aynı gün değiştirebilir misiniz?',
          a: 'Yakın olduğumuz için ve stok tutarak çalıştığımız için çoğu arızada aynı gün yerinde değişim sağlıyoruz.'
        },
        {
          q: 'Küçük ofis için 2-bay mı 4-bay NAS mı?',
          a: '5-15 kişi arası ve dosya boyutu yüksek değilse 2-bay RAID 1 yeter. Büyüme potansiyeli varsa 4-bay ile RAID 5/6 önerilir.'
        },
        {
          q: 'Dosyalarımızın bir kopyasını ofiste tutalım mı, yalnızca bulut mu?',
          a: 'Yerel + bulut hibrit her zaman en güvenli ve en hızlıdır; yerelde hız, bulutta felaket kurtarma sağlar.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 4) FIREWALL / AĞ GÜVENLİĞİ
  // ══════════════════════════════════════════════════════════════════
  'ag-guvenligi-firewall': {
    finans: {
      scenario: 'Bir fintech firmasına phishing ile sızan saldırgan, ağda lateral movement yaparak MSSQL sunucusuna ulaşıyor. Firewall sadece internet girişini süzüyor, iç trafik izlenmiyor. Fark edildiğinde 48 saat geçmiş, müşteri verisi sızmış. BDDK\'ya bildirim ve cezai süreç başlıyor.',
      whyHere: 'Finans bölgesinde perimeter firewall yetmez; zero-trust segmentasyon, iç trafik izleme (NDR), IPS/IDS, SSL inspection ve her VLAN\'a izole politika gerekir. Regülatör yıllık sızma testi zorunluluğu getirebilir.',
      technicalAngle: 'Fortinet FortiGate, Sophos XGS, Palo Alto gibi NGFW\'ler + FortiAnalyzer ile log korelasyonu. Micro-segmentation ile sunucu VLAN\'ı, kullanıcı VLAN\'ı, misafir Wi-Fi tamamen izole. SSL inspection ile şifreli trafik içi tehditler görülür. SIEM entegrasyonu ile 24/7 SOC izleme.',
      faqs: [
        {
          q: 'Yıllık sızma testi raporu hazırlayabiliyor musunuz?',
          a: 'Bağımsız pentest firmaları ile iş ortaklığımız var; raporu regülatöre sunmaya hazır formatta teslim ediyoruz.'
        },
        {
          q: 'BDDK düzenlemesi gereği log\'ları ne kadar saklamalıyız?',
          a: 'BDDK için 10 yıla kadar saklama gerekebilir. Log\'ları sıcak + soğuk depoya ayırıp maliyeti optimize ediyoruz.'
        },
        {
          q: 'VPN yerine ZTNA (Zero Trust Network Access) önerir misiniz?',
          a: 'Evet, özellikle uzaktan çalışan finans ekipleri için ZTNA (Cloudflare Access, Zscaler, FortiZTNA) klasik VPN\'den çok daha güvenli.'
        },
      ],
    },
    ticaret: {
      scenario: 'E-ticaret şirketinin sipariş kabul sunucusu bir sabah yanıt vermiyor; ransomware ekranı açılmış. Phishing\'le açılan bir mail\'den başlayan saldırı, yetersiz firewall ve açık RDP portundan yayılmış. 4 günlük sipariş kaybı ve sistem restore süreci.',
      whyHere: 'Ticaret işletmelerinin internete açık POS, e-ticaret, stok uygulamaları saldırı yüzeyini büyütür. Güvenli uzaktan erişim, geo-IP filtreleme, IPS kritik.',
      technicalAngle: 'WAF + NGFW kombinasyonu; e-ticaret sunucusunun önüne Cloudflare veya FortiWeb, arkada FortiGate. RDP/SMB açık portlar kapatılır, VPN+MFA zorunlu. Sandbox (sandboxing) ile şüpheli ek analizi. DNS filtreleme ile phishing domainleri engellenir.',
      faqs: [
        {
          q: 'Mağazalarımızdaki POS\'lar internete açık, bunları nasıl korumalıyız?',
          a: 'POS\'lar ayrı bir VLAN\'da izole edilir, sadece ödeme gateway\'lerine çıkış izni verilir. PCI-DSS kuralları gereği gereksiz portlar kapalı tutulur.'
        },
        {
          q: 'Kampanya döneminde sitemiz DDoS altına düşmüştü; nasıl engelleyelim?',
          a: 'Cloudflare / AWS Shield gibi CDN seviyesi DDoS koruması + origin IP gizleme ile 99% saldırı filtrelenir.'
        },
        {
          q: 'Müşteri destek ekibimiz bilgisayarlarına şüpheli link tıklıyor; ne yapalım?',
          a: 'DNS filtreleme (Cisco Umbrella / DNSFilter) ile bilinen kötü domainler kullanıcı tıklasa bile açılmaz; güvenlik farkındalık eğitimi de kritik.'
        },
      ],
    },
    sanayi: {
      scenario: 'Bir üretim tesisinde bir mühendis USB ile virüs bulaştırıyor; virüs ofis ağından üretim ağına sıçrıyor, SCADA sistem kilitleniyor, üretim 12 saat duruyor. Milyon TL zarar. Çünkü OT ve IT ağları tek switch üzerinde birleşmişti.',
      whyHere: 'Sanayide siber saldırı ofis kaybı değil, üretim kaybıdır. OT/IT segmentasyonu, USB kontrolü, endüstriyel protokol (Modbus, Profinet) farkındalığı olan firewall şart.',
      technicalAngle: 'Purdue modeli: Level 0-3 OT, Level 4-5 IT. Aralarında DMZ + endüstriyel-aware firewall (Fortinet OT, Claroty, TXOne). USB kilidi GPO veya endpoint DLP ile zorunlu. Üretim ağına internet erişimi kapalı; güncellemeler WSUS gibi iç kaynaktan.',
      faqs: [
        {
          q: 'Makine bakımı yapan yabancı mühendis PLC\'ye nasıl bağlansın?',
          a: 'Jump server + kısıtlı VPN + oturum kaydı ile gözetimli erişim. Doğrudan PLC\'ye dış bağlantı asla açılmaz.'
        },
        {
          q: 'USB\'ler yüzünden virüs bulaşıyor, nasıl kontrol ederiz?',
          a: 'USB port kilidi + onaylı USB whitelist + data diode kiosk ile dosya aktarımı. Dosyalar önce taranır, sonra üretim ağına alınır.'
        },
        {
          q: 'Üretim ağındaki alarm ve kontrol trafiğini firewall bozar mı?',
          a: 'Endüstriyel firewall\'lar Modbus/DNP3/Profinet protokollerini tanır ve deep inspection\'ı latency eklemeden yapar.'
        },
      ],
    },
    gelisen: {
      scenario: 'Hızla büyüyen SaaS startup\'ı ofiste tek bir consumer router kullanıyor. Geliştirici makineleri, kurucu laptop\'ı, ofis yazıcısı hepsi aynı ağda. Bir geliştirici tarayıcı eklentisi üzerinden credential stealer yüklenince tüm ofis credential\'ları sızıyor.',
      whyHere: 'Startup\'lar hızlı büyürken "sonra hallederiz" deyip ağ güvenliğini ertelerler. Ama müşteri verisi hareket etmeye başladığında tek bir ihlal şirket değerini siler.',
      technicalAngle: 'Küçük ofisler için UniFi Dream Machine Pro veya Firewalla Gold Plus gibi prosumer NGFW\'ler ekonomik. Misafir Wi-Fi ayrı VLAN, IoT ayrı VLAN, sunucu/server ayrı. SaaS çalışanları için Tailscale / WireGuard ile ZTNA.',
      faqs: [
        {
          q: 'Küçük ekibiz, enterprise firewall pahalı gelir mi?',
          a: 'UniFi, Firewalla, Sophos XGS 107 gibi SMB modelleri 15-40 kişilik ofisleri rahatça kaldırır, maliyet kurumsal seviyenin çok altında kalır.'
        },
        {
          q: 'Geliştirici makineleri AWS/GCP\'ye bağlanıyor, özel bir firewall kuralı gerekli mi?',
          a: 'Evet, cloud workload\'a sadece izinli IP\'lerden çıkış; AWS Security Group ile ofis VPN IP\'si whitelist yapılır.'
        },
        {
          q: 'SOC 2 hazırlığı yapıyoruz, firewall için neler gerekli?',
          a: 'Log retention, change management, intrusion detection, yıllık policy review. NGFW + SIEM ile tüm kontroller karşılanır.'
        },
      ],
    },
    yakin: {
      scenario: 'Müşterimizden gelen "internet yavaş" şikayeti sonrası aynı gün yerinde inceleyince FortiGate\'te aktif bir brute-force attack görüyoruz. Kaynak IP\'yi hemen ban\'lıyor, RDP\'yi VPN arkasına alıyoruz. Yakın olunca reaktif değil proaktif müdahale mümkün.',
      whyHere: 'Yakın bölgede firewall logları düzenli gözden geçirilir, konfigürasyon optimizasyonu periyodik yapılır. Bir sorun çıkmadan yakalanır.',
      technicalAngle: 'Aylık/çeyreklik firewall sağlık raporu: kural kullanım analizi, expired kurallar, şüpheli trafik paternleri, firmware güncellemeleri. Koruyucu bakım planı.',
      faqs: [
        {
          q: 'Firewall log\'larını kim takip ediyor?',
          a: 'Biz — yönetilen IT müşterilerimizde log\'lar SIEM\'e akıtılır, şüpheli aktivite tespitinde 24 saat içinde müdahale.'
        },
        {
          q: 'Küçük ofis için Fortinet mi pfSense mi?',
          a: 'Yönetilmeyecekse pfSense/OPNsense, biz yöneteceksek kurumsal destek avantajı için Fortinet veya Sophos öneriyoruz.'
        },
        {
          q: 'Firmware güncellemeleri üretimi keser mi?',
          a: 'Bakım penceresinde (gece 01:00-05:00) yapıyoruz, downtime 3-5 dakika, HA cluster varsa sıfır.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 5) KURUMSAL E-POSTA
  // ══════════════════════════════════════════════════════════════════
  'kurumsal-eposta': {
    finans: {
      scenario: 'Denetim firmasının müşterisi, "muhasebe@firma.com.tr" diye gelen maile 82 bin TL havale yapmış. Ama mail aslında lookalike domain\'den gelmiş (firrna.com.tr). SPF/DKIM/DMARC yapılandırılmamıştı, müşteri gerçek domain\'le sahte olanı ayırt edemedi.',
      whyHere: 'Finans/muhasebe firmalarında e-posta sahtekarlığı (BEC — Business Email Compromise) tek bir vakada onlarca bin TL kaybettirir. SPF/DKIM/DMARC + impersonation protection şart.',
      technicalAngle: 'Microsoft 365 E3/E5 + Defender for Office 365 veya Google Workspace + Security Center. SPF -all, DKIM 2048-bit, DMARC p=reject policy. Mimecast / Proofpoint gibi ileri düzey koruma üst katmanda. Outlook\'a "External" banner.',
      faqs: [
        {
          q: 'Müşterilere şifreli mail gönderebilir miyiz?',
          a: 'Microsoft Purview Message Encryption veya S/MIME ile şifreli e-posta standart. Müşteri okumak için tek seferlik kod alır.'
        },
        {
          q: 'E-posta arşivimiz ne kadar saklanmalı?',
          a: 'Vergi Usul Kanunu ve KVKK gereği 10 yıl. M365 E3 ile in-place hold, E5 ile Records Management ile WORM compliance.'
        },
        {
          q: 'Yurt dışı ortağımız maillerimizi "junk"\'a atıyor, neden?',
          a: 'Genellikle DMARC/DKIM yanlış. Reverse DNS + PTR + SPF alignment kontrolü sonrası 48 saat içinde düzelir.'
        },
      ],
    },
    ticaret: {
      scenario: 'Perakende firmasında 60 çalışan; tedarikçi "IBAN değişti" maili alıyor ama aslında sahte. Muhasebe ödeme yapıyor, para geri gelmiyor. Aynı zamanda mevcut e-posta 5 yaşındaki POP3 bir server\'da, mobilde çalışmıyor, mağazalar şikayet ediyor.',
      whyHere: 'Ticaret firmalarında "IBAN değiştim" dolandırıcılığı çok yaygın; kurumsal mail modernizasyonu hem güvenlik hem operasyon için gerekli.',
      technicalAngle: 'Microsoft 365 Business Standard / Premium veya Google Workspace Business Standard. Mobil cihaz yönetimi (Intune veya Google MDM) ile telefon kaybında mail silinir. Shared mailbox\'lar (satis@, siparis@, destek@) için role-based erişim.',
      faqs: [
        {
          q: 'Mağaza/satış ekibi için paylaşımlı mail kutusu nasıl yönetilir?',
          a: 'Shared mailbox + delegate access + kategorilendirme. Her mail kimin tarafından yanıtlandığı loglanır, devir-teslim kolaylaşır.'
        },
        {
          q: 'Eski maillerimizi yeni sisteme taşıyabilir misiniz?',
          a: 'IMAP üzerinden migrasyon + PST import ile 10+ yıllık mail arşivi korunur, kullanıcı hiçbir şey kaybetmez.'
        },
        {
          q: 'Tedarikçi maillerinde IBAN sahtekarlığı nasıl önlenir?',
          a: 'DMARC reject + impersonation protection + payment-request maillerinde 2. kanal doğrulaması (telefon) zorunlu hale getirilir.'
        },
      ],
    },
    sanayi: {
      scenario: 'Üretim firmasında mühendisler büyük CAD dosyalarını maille gönderiyor; bir kısmı 40MB limitini aşıyor geri dönüyor. IT destek "dosyayı Drive\'a koy" diyor ama mühendis yapmıyor, iş tıkanıyor. Ayrıca fabrikada fiziksel mail sunucusu bozulmuş, ofise gelen maillerin tamamı 6 saat geç geldi.',
      whyHere: 'Sanayide e-posta çoğu zaman on-prem Exchange\'te kalmış eskimiş altyapı üzerinde. Bulut geçişi + büyük dosya çözümü gerek.',
      technicalAngle: 'Exchange hybrid migration veya full cutover to M365 / Google. Büyük dosya için OneDrive/Drive entegrasyonu; 40MB yerine 100GB+ link paylaşımı. Fabrika ofisi için internet yedekliliği, 4G failover.',
      faqs: [
        {
          q: 'Fabrikamızda internet kesildiğinde maillere ulaşamıyoruz, çözüm?',
          a: 'Mail bulutta olunca 4G/LTE failover router ile sorunsuz çalışır. On-prem\'de ise ikinci ISP hattı gerekir.'
        },
        {
          q: 'CAD dosyaları mail eki sınırını aşıyor, nasıl paylaşalım?',
          a: 'M365 + OneDrive ile 250GB\'a kadar link paylaşımı; alıcı dosyayı indirmek yerine tarayıcıda açıp görebilir.'
        },
        {
          q: 'Eski Exchange sunucumuz yok edilmeli mi?',
          a: 'Migration sonrası bir 30 gün paralel tutup sonra decommission ediyoruz; veri kaybı sıfır.'
        },
      ],
    },
    gelisen: {
      scenario: 'Yeni büyüyen bir startup henüz domain bile almamış, kurucular Gmail\'den (mehmet.yilmaz.startup@gmail.com) iş yazışıyor. Müşteriler kurumsal bulmuyor, yatırımcı toplantılarında garip duruyor. Ayrıca ayrılan geliştiricinin Gmail\'inde şirket mailleri kalmış.',
      whyHere: 'Gelişen şirketler "profesyonel görünüm" ve "sahiplik" için kurumsal mail kritik. Domain sahipliği şirkette kalmalı; çalışan ayrıldığında mail\'le birlikte müşteri ilişkisi kaybolmamalı.',
      technicalAngle: 'Google Workspace Business Starter veya M365 Business Basic ile hızlı kurulum (4 saat içinde). Domain sahipliği kurumda, tüm maillerin kopyası merkezi arşivde. Kurucudan ayrılma senaryolarında mail transferi tek tıkla.',
      faqs: [
        {
          q: 'Domain aldık, mail kurulumu ne kadar sürer?',
          a: 'MX, SPF, DKIM, DMARC yapılandırması + kullanıcı hesapları: ortalama 1 iş günü.'
        },
        {
          q: 'Google Workspace mı Microsoft 365 mi?',
          a: 'Teknoloji odaklı ekipler için Google, Office yoğun kullanıcılar için M365. Karar için 30 dakikalık görüşme yeterli.'
        },
        {
          q: 'Çalışan ayrıldığında maillerini nasıl saklarız?',
          a: 'Mail kutusu shared mailbox\'a çevrilir veya lisans düşürülüp archive olarak korunur; müşteri yazışmaları kaybolmaz.'
        },
      ],
    },
    yakin: {
      scenario: 'Müşterimizde 08:45\'te "mail çalışmıyor" uyarısı geliyor. 09:00\'da uzaktan inceleme, MX kayıt değişikliği fark ediliyor — bir kullanıcı domain panelinde yanlış tıklama. 09:15\'te düzeltildi, gelen mailler kuyrukta 15 dakika geciktikten sonra düştü. Yakınlık = hızlı reaksiyon.',
      whyHere: 'Yakın müşterilerde mail altyapısı genellikle yıllardır aynı kalır, biliriz. Sorun çıkınca "önce ne kontrol ederiz" önceden planlıdır.',
      technicalAngle: 'Tüm mail müşterilerimiz için DNS + MX + SPF/DKIM/DMARC + lisans envanteri aylık kontrol. DNS değişikliklerine change management ile erişim.',
      faqs: [
        {
          q: 'Mail sunucumuz kurulumunu yapar mısınız?',
          a: 'M365/Google Workspace geçişi dahil olmak üzere tüm kurumsal mail kurulumu yakın müşterilerimizde 1-2 gün içinde tamamlanır.'
        },
        {
          q: 'E-posta sorunlarında telefon desteği var mı?',
          a: 'Evet, yönetilen IT müşterilerimiz için 7/24 telefon + uzaktan destek standart.'
        },
        {
          q: 'Spam şikayetlerini nasıl çözüyorsunuz?',
          a: 'Defender/Gmail spam filtre kurallarını periyodik gözden geçirip allowlist/blocklist\'i güncel tutuyoruz.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 6) NETWORK & ALTYAPI
  // ══════════════════════════════════════════════════════════════════
  'network-altyapi': {
    finans: {
      scenario: 'Yatırım firması yeni plaza katına taşındı, 1200m² alan var. İnşaatçı sadece temel RJ45 prizleri bırakmış, ana kabinet tamamen dağınık. Dealer masalarında 2 monitor + IP telefon + VoIP + sıkışık trafikte gecikme kritik. Toplantı odasında Wi-Fi kabul edilebilir seviyede değil.',
      whyHere: 'Finans kat taşınmalarında network düşük latency + yüksek güvenilirlik + TSE/BDDK kablolama standardı şart.',
      technicalAngle: 'Cat6A kablolama, 10GbE backbone, Cisco/HP Aruba yönetilebilir switch, PoE+ ile IP telefon ve Wi-Fi 6 AP. Kabinet düzenleme, etiketleme, patch paneli, UPS besleme. Dual ISP + BGP ile failover.',
      faqs: [
        {
          q: 'Dealing desk için özel ağ gerekiyor mu?',
          a: 'Düşük latency (< 1ms), dedicated VLAN ve QoS ile işlem trafiği önceliklendirilir.'
        },
        {
          q: 'Wi-Fi yeterli mi yoksa kablolu şart mı?',
          a: 'Dealing masaları mutlaka kablolu, toplantı/hareket noktaları Wi-Fi 6/6E ile çözülür.'
        },
        {
          q: 'Plaza binası omurgaya nasıl bağlanıyor?',
          a: 'Genellikle plazaya fiber ISP\'ler mevcut; en az 2 farklı ISP ile yedekli hat + BGP öneririz.'
        },
      ],
    },
    ticaret: {
      scenario: 'Mağaza zinciri yeni şubesini açtı; POS çalışmıyor, depo barkod okuyucuları bağlanamıyor. Elektrikçi network kabloları çekmiş ama patch paneli yok, her şey direk switch\'e. Bir kablo arızasında kimse nereye gittiğini bilmiyor.',
      whyHere: 'Ticaret/perakende noktalarında network = kasa açma süresi. Hızlı, standart, çok şubede tekrarlanabilir altyapı.',
      technicalAngle: 'Şube standardı: Cat6 kablolama + 24/48-port PoE switch + firewall + site-to-site VPN + 4G failover. Şubeler arası MPLS veya SD-WAN. Her şube aynı konfig template\'iyle kurulur.',
      faqs: [
        {
          q: 'Yeni şube kurulumu ne kadar sürer?',
          a: 'Kablolama + cihaz kurulumu + test: 2-3 iş günü. Template sayesinde 10. şube 2. gün çalışır.'
        },
        {
          q: 'İnternet kesilince POS çalışmaya devam eder mi?',
          a: 'Offline mode destekli POS + 4G failover ile kasa hiç durmaz; bağlantı gelince senkronize olur.'
        },
        {
          q: 'Kamera sistemi ile ağ aynı mı?',
          a: 'Kameralar ayrı VLAN, PoE+ switch, yeterli NVR depolama. Trafik ofis ağını etkilemez.'
        },
      ],
    },
    sanayi: {
      scenario: 'Üretim tesisinde ofis internet hızlı ama üretim hattındaki otomasyon PLC\'leri intermittent bağlantı kopması yaşıyor. Çünkü fabrika ortamında endüstriyel switch yerine ofis switch\'i kullanılmış, toz/sıcaklık/EMI nedeniyle portlar bozulmuş.',
      whyHere: 'Sanayi ağında ofis ve OT ayrı dünyalar. Endüstriyel switch, IP67 kabinet, fiber uzaklık çözümleri, redundant ring topology şart.',
      technicalAngle: 'OT tarafı için Moxa, Hirschmann, Siemens Scalance gibi endüstriyel switch. Ofis tarafı standart kurumsal. Aralarında NGFW + DMZ. Ring topology (ERPS/MRP) ile kablo kopsa bile üretim durmaz.',
      faqs: [
        {
          q: 'Üretim ağı internete çıkmalı mı?',
          a: 'Minimum seviyede, sadece gerekli cloud servislere. İdeali: üretim ağı tamamen izole, veri aktarımı DMZ üzerinden.'
        },
        {
          q: 'Fabrikaya fiber çekilebilir mi?',
          a: 'Evet, multimode/singlemode fiber EMI\'ye duyarsız, uzun mesafede (>100m) tercih edilir.'
        },
        {
          q: 'Üretim hattı switch\'i bozulunca durur mu?',
          a: 'Redundant ring + hot-swap modül + stok yedekle sıfır kesinti hedefleriz.'
        },
      ],
    },
    gelisen: {
      scenario: 'Tech startup yeni ofise taşındı, 40 geliştirici + 20 tasarımcı + 10 yönetici. Wi-Fi ilk hafta çalıştı, ekip büyüyünce Zoom toplantılarında donma başladı. Tek AP, hepsi 2.4GHz, backhaul 100Mbps.',
      whyHere: 'Gelişen şirketler hızlı büyüdükçe ilk kurulum yetmez hale gelir. Modüler, Wi-Fi 6/6E, çok AP\'li, SDN tabanlı yapı şart.',
      technicalAngle: 'UniFi, Aruba Instant, Meraki gibi bulut yönetimli Wi-Fi. 1 AP / 25 kullanıcı oranı. 2.5GbE veya 10GbE backhaul. Misafir Wi-Fi ayrı, IoT ayrı, çalışan ayrı SSID.',
      faqs: [
        {
          q: 'Ofiste Wi-Fi\'yi geliştiricilerimiz için sabit tutmak mümkün mü?',
          a: 'Masa başı kritik işler için kablolu öneriyoruz, mobilite için Wi-Fi 6E optimum performans verir.'
        },
        {
          q: '60\'tan 150 kişiye çıkarsak altyapı değişmeli mi?',
          a: 'Modüler seçtiğimiz switch/AP\'leri kapasite artışıyla eklemek yeterli; sıfırdan kurulum gerekmez.'
        },
        {
          q: 'Bulut yönetimli mi, on-prem mi?',
          a: 'Küçük/orta ölçekli çevik ekipler için bulut (UniFi/Meraki). Kompleks ihtiyaçlar için on-prem kontrolcü.'
        },
      ],
    },
    yakin: {
      scenario: 'Müşterimizde bir kat yenileme sonrası 24 saat içinde tüm kablolama, patch paneli, switch konfigürasyonu ve Wi-Fi optimizasyonu tamamlandı. Yakın olduğumuz için malzeme stoku, test cihazları ve ekip aynı gün mobilize.',
      whyHere: 'Yakın bölge network kurulumlarını single-visit yapıyoruz: kablo çekimi, switch kurulum, Wi-Fi site survey, belgelendirme tek organizasyonda tamamlanır.',
      technicalAngle: 'Fluke DSX kablo test raporu, Ekahau Wi-Fi site survey, etiketleme + belgelendirme standardımız var. Her müşterinin network diyagramı CMDB\'de tutulur.',
      faqs: [
        {
          q: 'Ofisimizi küçük bir alana taşıyoruz, network kurulumu bir günde biter mi?',
          a: '50 portluk bir alan için evet, bir iş gününde temel altyapı + test + teslim.'
        },
        {
          q: 'Patch paneli gerçekten şart mı?',
          a: 'Evet — onsuz kablolar doğrudan switch\'e gider, arıza izi sürmek imkansız hale gelir, uzun vadede maliyet artar.'
        },
        {
          q: 'Wi-Fi ölçümünü nasıl yapıyorsunuz?',
          a: 'Ekahau/NetSpot ile profesyonel heat map çıkarıyor, ölü noktaları raporluyor, AP yerleşimini optimize ediyoruz.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 7) SON KULLANICI / HELPDESK
  // ══════════════════════════════════════════════════════════════════
  'son-kullanici-destek': {
    finans: {
      scenario: 'Kıdemli portföy yöneticisi 10:30 rapor toplantısı öncesi Excel\'de makro çalışmıyor diye panik. IT destek bulamadığı için kendi kendine VBA ayarlarını değiştiriyor, dosya bozuluyor. Toplantıya eksik veriyle giriyor, müşteriye mahçup oluyor.',
      whyHere: 'Finansta kullanıcı deneyimi bankacılık değil, "sorumlu üretkenlik" — IT desteğin 5 dakikada ulaşması gerekir.',
      technicalAngle: 'SLA: P1 (kritik) 15 dakika, P2 (yüksek) 2 saat. Ticketing: Jira Service Management, Freshservice. Uzaktan destek: TeamViewer Tensor, ScreenConnect. Saha desteği için çağrı grubu.',
      faqs: [
        {
          q: 'Kritik dönemlerde (ay sonu, denetim haftası) ek destek alabilir miyiz?',
          a: 'Dedicated on-site engineer haftalık/aylık paketle kiralanabilir; kritik dönemde fiziki IT\'miz ofisinizdedir.'
        },
        {
          q: 'Özel finansal yazılımlarımız (Reuters, Bloomberg, Logo Tiger) için destek verir misiniz?',
          a: 'Kullanıcı seviyesi (kullanıcı hatası, konfigürasyon) her zaman. Yazılım üreticisinin teknik destek eskalasyonunu da biz yönetiriz.'
        },
        {
          q: 'Yöneticilerimiz için VIP destek var mı?',
          a: 'Executive IT support paketi: özel WhatsApp hattı, 5 dakika SLA, VIP cihaz stoku.'
        },
      ],
    },
    ticaret: {
      scenario: 'Mağaza müdürü "POS donuyor" diyor, IT destek 3 gün beklese kasa açılmıyor, gün gün ciro kaybı. Başka sorun: yeni işe başlayan 5 çalışanın bilgisayarı gelmemiş, ilk haftası kayıp.',
      whyHere: 'Ticarette IT destek = ciro. Her saat arıza somut para kaybı. Hızlı, şube bazlı destek kritik.',
      technicalAngle: 'Şube bazlı rotasyonlu on-site + 7/24 telefon + uzaktan. Spare POS stoku tutulur; arıza = swap then repair. Merkezi ticketing + mağaza müdürü self-service portal.',
      faqs: [
        {
          q: 'Mağaza müdürlerimize nasıl destek veriyorsunuz?',
          a: 'Dedicated WhatsApp/telefon hattı, self-service portal (şifre sıfırlama, tonic reboot rehberi), saha ekibinin mağaza rotası.'
        },
        {
          q: 'Her mağaza için ayrı IT sözleşmesi mi?',
          a: 'Hayır, tek sözleşme altında tüm şubeler; ticket bazlı ya da sabit aylık paket olarak fiyatlandırılır.'
        },
        {
          q: 'Donanım arızasında kasa ne kadar kapalı kalır?',
          a: 'Spare POS stoku ile ortalama 30-45 dakika swap; eski cihaz atölyeye gider, tamir edilip stoğa döner.'
        },
      ],
    },
    sanayi: {
      scenario: 'Üretim ofisinde satın alma uzmanı faks cihazı arızalı diye siparişleri verememiş (bazı tedarikçiler hala faks istiyor); ofis mühendisi CAD lisansı yenilenmemiş, çizim açılmıyor. İki sorunda üretim planını etkiliyor.',
      whyHere: 'Sanayide ofis + üretim katları destek kapsamı geniş; hem klasik ofis hem endüstriyel cihaz desteği.',
      technicalAngle: 'Ofis destek + HMI/SCADA operatör eğitimi + yazılım lisans yönetimi. Shop-floor tablet/terminal cihazları MDM ile yönetilir. Vardiya sonlarında 24/7 hatta destek.',
      faqs: [
        {
          q: 'Üretim hattındaki operatörler için nasıl destek veriyorsunuz?',
          a: 'Vardiya operatörleri için basit kullanım rehberi + sesli telefon desteği. Kritik HMI için uzaktan + yerinde 30 dk.'
        },
        {
          q: 'Özel üretim yazılımlarımız için destek?',
          a: 'Kullanıcı tarafını biz, üretici teknik destek koordinasyonunu da biz yürütürüz.'
        },
        {
          q: 'Vardiya dışı (gece/hafta sonu) arıza olursa?',
          a: 'Yönetilen IT paketinde 7/24 on-call ücretsiz; saat bazlı olanlarda ek ücretlendirme.'
        },
      ],
    },
    gelisen: {
      scenario: 'Hızla büyüyen startup 30 kişi oldu, kurucu CTO kod yazmaktan IT ticket\'larla uğraşmaya başladı. "MacBook\'um update istiyor", "Office login\'e girmiyor", "Slack yavaş" — kurucunun günü bu tür sorularla geçiyor.',
      whyHere: 'Gelişen şirketlerde ilk 30 kişide IT destek kurucu üzerinden yürüyor ama 30+ sürdürülemez. Dış kaynak helpdesk devreye almanın tam zamanı.',
      technicalAngle: 'Fractional IT: haftalık sabit saat + ticket bazlı. Slack bot entegrasyonu ile soru > ticket > çözüm. MDM ile cihaz self-healing.',
      faqs: [
        {
          q: 'Küçüğüz, tam zamanlı IT kişiye ihtiyacımız var mı?',
          a: 'Hayır, fractional model ideal. 30 kişi için haftada 1-2 gün yerinde + ticket bazlı uzaktan yeter.'
        },
        {
          q: 'Mac ve Windows karışık ekibiz, ikisini de destekler misiniz?',
          a: 'Her ikisini de sertifikalı destek; MDM tek panelden iki platformu yönetiyor.'
        },
        {
          q: 'Büyüdükçe destek seviyesi artar mı?',
          a: 'Modüler; 30 > 60 > 120 kişi için sabit aylık paket yükseltilir, aynı ekip sürdürür.'
        },
      ],
    },
    yakin: {
      scenario: 'Müşterimizden 11:20\'de "yazıcı çalışmıyor, saat 12\'de ihale dosyası yazdırılacak" çağrısı. 11:35\'te yerinde, 11:45\'te sorun çözülmüş (kağıt sıkışması + sürücü güncellemesi). Yakın olmanın değeri somut zaman.',
      whyHere: 'Yakın bölgede helpdesk = fiziksel helpdesk. 15 dakika içinde elinde teknisyenle müşteri ofisindeyiz.',
      technicalAngle: 'Yakın müşteriler için saha + uzaktan hibrit. Haftalık 1 yerinde ziyaret + sürekli uzaktan + acil çağrı. Ticket SLA P1 için < 30 dakika yerinde.',
      faqs: [
        {
          q: 'Aynı gün içinde birden fazla çağrıda ne kadar gelirsiniz?',
          a: 'Yakın olduğumuz için günde 3-4 farklı ziyaret rahat; randevu sistemli çalışıyoruz.'
        },
        {
          q: 'Ofisimizde IT için yer ayırmalı mıyız?',
          a: 'Gerekmiyor; ancak yönetilen IT müşterilerimiz için bir IT dolabı + yedek parça stoku faydalı olabilir.'
        },
        {
          q: 'Ay sonunda kullanıcı şikayetleri artıyor, destek kapasitesi yeter mi?',
          a: 'Ay sonu yoğun dönemlere ek saha desteği ayırıyor, preventive bakım önceliklendiriyoruz.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 8) YEDEKLEME & FELAKET KURTARMA
  // ══════════════════════════════════════════════════════════════════
  'felaket-kurtarma-yedekleme': {
    finans: {
      scenario: 'Yatırım şirketinde ransomware bulaştı; tüm sunucuların dosyaları şifrelendi. Yedekleri var — ama yedek aynı ağda, aynı zamanda şifrelendi. Offsite kopya 6 ay önceki. Kurtarılabilen veri 6 ay eski, SPK bildirimi başlıyor.',
      whyHere: 'Finansta RPO (recovery point objective) saatler değil dakikalar olmalı. Immutable (değişmez) yedekleme + offsite + düzenli restore testi regülasyon gereği.',
      technicalAngle: 'Veeam + Object Lock (S3 immutable) + iki farklı bulut replica. RPO 15 dakika, RTO 1 saat. Aylık restore testi, dokümante. Air-gapped tape backup kritik hesaplar için opsiyonel.',
      faqs: [
        {
          q: 'Ransomware yedeklerimizi de şifrelerse?',
          a: 'Object Lock + air-gap ile yedekler write-once; ransomware silemez, değiştiremez.'
        },
        {
          q: 'BDDK yedekleme denetimi için rapor isteyebilir mi?',
          a: 'Aylık backup success/failure raporu + restore test kayıtları denetime hazır sunulur.'
        },
        {
          q: 'Kritik DB\'ler için RPO sıfır mümkün mü?',
          a: 'Senkron replica (ör. SQL Always-On) ile yakın sıfır; asenkron replica ile 1-5 dakika.'
        },
      ],
    },
    ticaret: {
      scenario: 'Perakende ERP sunucusunda disk çöktü, yedekleme yazılımı 18 gün önceki gecede son başarılı yedeği almış. Arada rezerv siparişler, stok hareketleri, müşteri verileri var — hepsi kayıp.',
      whyHere: 'Ticarette yedeklemenin sadece var olması yetmez; düzenli, test edilmiş, kısa RPO\'lu olması gerekir.',
      technicalAngle: 'Veeam Backup + Synology/QNAP hedef + bulut replica. Günlük + saatlik incremental + haftalık full. Otomatik restore testi sandbox\'ta her ay.',
      faqs: [
        {
          q: 'ERP verimiz kaybolursa ne kadar sürede geri gelir?',
          a: 'RTO tipik 2-4 saat; felaket planı test edilmiş müşterilerde 1 saat altı.'
        },
        {
          q: 'E-ticaret veritabanı için sürekli yedek nasıl olur?',
          a: 'Transaction log shipping + snapshot ile 5-15 dakika RPO; canlı sistemi etkilemez.'
        },
        {
          q: 'Yedekleme kontrolü nasıl yapılıyor?',
          a: 'Haftalık otomatik restore testi + aylık yönetilen rapor; herhangi bir hata bildirimde bize düşer.'
        },
      ],
    },
    sanayi: {
      scenario: 'Üretim firmasında MES sunucusu yangın nedeniyle tamamen tahrip oldu. Yedekleri yine aynı binada, yangında kayıp. 5 yıllık üretim verisi, kalite kayıtları, ISO dökümanları gitti. ISO 9001 sertifikası askıya alındı.',
      whyHere: 'Sanayide yedekleme = iş sürekliliği + sertifikasyon. Fiziksel felaketlere karşı offsite zorunlu.',
      technicalAngle: 'Lokalde birincil, ikinci binada/şehirde replica, bulutta immutable 3. kopya. MES/SCADA için application-aware backup, restart sonrası tutarlı.',
      faqs: [
        {
          q: 'MES/SCADA yedekleme hattı durdurur mu?',
          a: 'Hot backup ile durmadan; snapshot + log shipping yöntemi.'
        },
        {
          q: 'Yangın/sel felaketinde kurtarma süresi?',
          a: 'Offsite replica ile RTO 4-8 saat; DRaaS ile 1-2 saat.'
        },
        {
          q: 'ISO denetimde yedekleme kanıtı nasıl sunulur?',
          a: 'Aylık yedekleme + restore test kayıtları standart dokümantasyonla sunulur.'
        },
      ],
    },
    gelisen: {
      scenario: 'SaaS startup\'ın tüm kodu GitHub\'da, veriler AWS RDS\'de. "Bulut yedekliyor zaten" diyorlar. Ama bir Friday deployment\'ta DBA yanlış script çalıştırdı, 3 saatlik veri silindi. AWS varsayılan yedek sadece gecelik; kayıp kesin.',
      whyHere: 'Bulut-öncelikli gelişen şirketler "bulut = yedek" yanılgısına düşer. AWS/GCP responsibility model gereği veri müşterinin; yedeklemeyi müşteri kurar.',
      technicalAngle: 'AWS RDS PITR (point-in-time recovery) + S3 cross-region + EBS snapshot schedule. GitHub için ayrıca Snyk/Backhub ile repo backup. SaaS uygulamaları (Salesforce, Notion, GitHub) için SaaS backup.',
      faqs: [
        {
          q: 'AWS backup yeterli mi?',
          a: 'Varsayılan değil. PITR + cross-region + cross-account backup ile gerçek DR sağlanır.'
        },
        {
          q: 'SaaS uygulamalardaki verilerimizi kim yedekliyor?',
          a: 'Biz: Salesforce, Notion, GitHub, Slack için 3. parti backup çözümü kuruyoruz.'
        },
        {
          q: 'Startup\'ız, DR maliyeti yüksek mi?',
          a: 'Hayır — cloud-native çözümlerle aylık 50-300 USD arası çoğu startup için yeterli.'
        },
      ],
    },
    yakin: {
      scenario: 'Müşterimizde sabah 07:30\'da yedek alarm: "Last backup failed". 08:00\'da yerinde, disk space full; temizlendi ve gecelik yedek retry tetiklendi. Kullanıcılar iş başı yapmadan önce sorun çözüldü.',
      whyHere: 'Yakın müşterilerde yedekleme başarısızlığı fark edilir edilmez fiziksel müdahale yapılıyor; iş kaybı yaşanmıyor.',
      technicalAngle: 'Her müşteri için yedekleme sağlık kontrol paneli + otomatik alarm + aylık restore testi. Ortalama uptime %99.9+.',
      faqs: [
        {
          q: 'Yedekleme başarısız olunca haberimiz olur mu?',
          a: 'Önce biz tespit ediyor, müdahale ediyor, sonra size durum raporu veriyoruz; size düşen iş yok.'
        },
        {
          q: 'Restore testi gerçekten yapılıyor mu?',
          a: 'Evet, aylık standart — sandbox\'ta restore edip dosya açma test sonucu raporlanır.'
        },
        {
          q: 'Yedek diski/bantı nerede saklanıyor?',
          a: 'Fiziksel yedek gerekirse müşteri sitesinden farklı konumda kilitli kasa; bulut yedek ise coğrafi olarak farklı region.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 9) IT SAĞLIK KONTROLÜ & DENETİM
  // ══════════════════════════════════════════════════════════════════
  'it-saglik-kontrolu-denetim': {
    finans: {
      scenario: 'Finans firması yıllık bağımsız denetimde BT kontrolleri maddesinden bulgu aldı: access review yapılmamış, patching gecikmiş, DR test kaydı yok. Bu bulgular SPK/BDDK denetiminde büyütülebilir, yönetim için ciddi bir risk.',
      whyHere: 'Finansta IT denetim bir zorunluluk. SOC 2, ISO 27001, COBIT kontrolleri + yerel regülasyon (BDDK, SPK, KVKK) aynı anda geçerli.',
      technicalAngle: 'Checklist: access review, patch status, backup verification, DR test, endpoint compliance, change management, incident response playbook. SIEM log\'larından ISO/NIST kontrolü otomatik raporu.',
      faqs: [
        {
          q: 'Yıllık denetim için hazırlık süresi ne?',
          a: 'Yönetilen IT müşterilerimiz için denetim hazır; sürekli dokümantasyon tutuluyor. İlk defa ise 6-8 haftalık hazırlık.'
        },
        {
          q: 'ISO 27001 sertifikası için danışmanlık?',
          a: 'Evet — gap analysis + policy set + implementasyon + ön-denetim eşlik + denetim günü destek.'
        },
        {
          q: 'KVKK veri envanteri çıkarmamız gerekiyor, yardım eder misiniz?',
          a: 'Veri akış haritası, işleme amaçları, aktarım kayıtları, ilgili kişi taleplerine süreç dokümanı hazırlıyoruz.'
        },
      ],
    },
    ticaret: {
      scenario: 'Perakende firması e-ticaret PCI-DSS uyumu için denetim alacak; mevcut altyapıda PCI gereği WAF yok, kart verisi encryption eksik, log saklama yetersiz. Denetimden geçememe riski.',
      whyHere: 'Ticarette PCI-DSS, KVKK ve marka güven denetimi yaygın. Periyodik IT denetim + remediation gerek.',
      technicalAngle: 'PCI-DSS checklist: ağ segmentasyonu, encryption in transit/rest, access control, log management, quarterly vulnerability scan, yearly pentest. KVKK veri akış haritası + imha politikası.',
      faqs: [
        {
          q: 'PCI-DSS sertifikası için neler gerekli?',
          a: '12 kontrolün tamamı; genellikle 3-6 aylık hazırlık + QSA denetimi. Biz teknik kontrolleri hazırlıyoruz.'
        },
        {
          q: 'Kart verisini gerçekten işliyor muyuz kontrol etmek istiyoruz?',
          a: 'Cardholder data flow analizi yapıyoruz; gereksiz işleme varsa elimine ediyoruz (scope reduction).'
        },
        {
          q: 'E-ticaret sitesi için vulnerability scan zorunlu mu?',
          a: 'PCI kapsamındaysa çeyreklik ASV scan zorunlu; değilse öneriyoruz ama zorunlu değil.'
        },
      ],
    },
    sanayi: {
      scenario: 'Üretim firması ISO 27001 sertifikası almak istiyor; fabrikada 10+ yaşında sunucu, patch olmayan PLC\'ler, dokümantasyonsuz ağ. Denetim öncesi gap büyük.',
      whyHere: 'Sanayide büyük müşteriler (havacılık, otomotiv, savunma) tedarikçilerine ISO 27001 ve/veya IEC 62443 dayatıyor. İhalesini kaybetmemek için denetim hazırlığı kritik.',
      technicalAngle: 'ISO 27001 + IEC 62443 (OT güvenlik) hibrit denetim. OT asset envanteri, risk değerlendirmesi, patch management for PLCs, segregation kontrolü, incident response.',
      faqs: [
        {
          q: 'ISO 27001 + IEC 62443 birlikte nasıl yönetilir?',
          a: 'Tek SGM (security governance model) altında, IT ve OT kontrolleri paralel. Biz integrasyonlu template sunuyoruz.'
        },
        {
          q: 'OT cihazları için patch management mümkün mü?',
          a: 'Risk bazlı; üretici onaylı patch\'ler kontrollü bakım penceresinde. Patch uygulanamıyorsa compensating control.'
        },
        {
          q: 'TSE sertifikası için IT gereği var mı?',
          a: 'Doğrudan değil, ama marka kontrolü kapsamında veri/süreç güvenliği istenebilir; hazırlık destekliyoruz.'
        },
      ],
    },
    gelisen: {
      scenario: 'Startup yurt dışı müşterisinden SOC 2 Type II denetimi talep aldı; 6 ay önce hiçbir kontrol yokken, denetime 3 ay kaldı. Dokümantasyon, access control, backup, incident response — hepsi sıfırdan.',
      whyHere: 'Gelişen SaaS şirketleri uluslararası müşteri için SOC 2 / ISO 27001 zorunlu buluyor. Zaman kısa, remediation hızlı olmalı.',
      technicalAngle: 'Vanta/Drata gibi compliance automation + SOC 2 readiness gap analysis + remediation sprint\'leri. 90 günde SOC 2 Type I, 6 ayda Type II hedefi.',
      faqs: [
        {
          q: 'SOC 2 hızlı alınabilir mi?',
          a: 'Type I: 90 gün, Type II: 6+ ay (observation period gerekli). Vanta/Drata ile hızlanırız.'
        },
        {
          q: 'Hangisi önce: SOC 2 mi ISO 27001 mi?',
          a: 'Müşterinizin talebine göre. US müşteri → SOC 2, EU müşteri → ISO 27001. Aynı anda ikisini almak da mümkün (ortak control set %70).'
        },
        {
          q: 'Denetim maliyeti nedir?',
          a: 'Remediation hariç denetim firması ücreti 10-30K USD. Bizim hazırlık paketimiz boyuta göre 3-10K USD.'
        },
      ],
    },
    yakin: {
      scenario: 'Müşterimizde 3 ayda bir standart IT sağlık kontrolü; donanım envanteri, yazılım lisansı, yedekleme durumu, güvenlik patch\'leri, kullanıcı yetkileri gözden geçiriliyor. 15 sayfalık rapor + aksiyon listesi. Yakın müşteri avantajı: 3 aylık ritim.',
      whyHere: 'Yakın müşterilerde IT sağlık kontrolü süreklilik kazanıyor; tek seferlik denetim değil yaşayan bir yönetim döngüsü.',
      technicalAngle: 'Çeyreklik sağlık raporu: donanım (SMART, firmware), yazılım (patch level, lisans), güvenlik (AV, firewall kuralı review), yedekleme (success rate, restore testi), kullanıcı (inactive account, excessive privilege).',
      faqs: [
        {
          q: 'IT sağlık kontrolü ne sıklıkta?',
          a: 'Standartımız çeyreklik; kritik müşterilerde aylık.'
        },
        {
          q: 'Raporu kime veriyorsunuz?',
          a: 'Yönetime + BT sorumlusuna; ayrıca aksiyon listesi ile düzenli gözden geçirme toplantısı.'
        },
        {
          q: 'IT bütçesi planlama için sağlık raporu yardımcı mı?',
          a: 'Evet — donanım yaş, lisans yenileme, kapasite artışı gibi bilgiler bütçe planlaması için birincil input.'
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 10) VPN KURULUMU & UZAKTAN ERİŞİM
  // Kaynak: r/sysadmin, r/networking, ServerFault, Spiceworks (2024-2025 tartışmaları)
  // ══════════════════════════════════════════════════════════════════
  'vpn-kurulumu': {
    finans: {
      scenario: 'Bir yatırım danışmanlığının 18 çalışanı pazar gecesi tek bir e-postaya uyandı: "AnyConnect sertifikanız yarın 09:00\'da bitiyor." Cuma günü çıkışta kimse fark etmemişti; pazartesi sabahı BDDK raporlamasına son 48 saat. ServerFault\'ta aynı sorun "Cisco AnyConnect cert expired, entire remote workforce locked out" başlığıyla binlerce kez tartışılmış. IT dış kaynağı ekibinin ertelediği sertifika yenilemesi artık aciliyet.',
      whyHere: 'Finans bölgesinde VPN sadece uzaktan erişim değil; BDDK/SPK denetim takvimlerinin kritik yolundaki bir bileşen. Sertifika, MFA, loglama üçlüsündeki en küçük zayıflık regülasyon cezasıyla sonuçlanabilir. Plaza katındaki "çalışan evde unutup gelmiş" senaryosunun hiç olmadığı gibi, VPN\'in de hiç kopmaması beklenir.',
      technicalAngle: 'Fortinet SSL VPN\'in 2024 EOL kararı sonrası WireGuard + Duo MFA + iç CA mimarisine geçişi finans müşterilerinde standart hale getirdik. Sertifikaları 90 günlük otomatik rotasyona aldık, 30/14/7 gün kala Slack/e-posta uyarısı; FortiGate veya pfSense üzerinde IKEv2 yedek tünel ile fallback. Loglar 5651 + BDDK uyumlu olarak WORM repo\'ya imzalı aktarılır.',
      faqs: [
        { q: 'BDDK denetiminde VPN logu ne kadar süreyle saklanmalı?', a: 'BDDK 6 yıl, 5651 ise 2 yıl minimum ister — çakışmada uzun olan geçerli. Oturum başlangıç/bitiş, iç-dış IP eşleşmesi ve kullanıcı kimliği imzalı tutulmalı; bunu SIEM\'e bağlı bir syslog repo\'da yapıyoruz.' },
        { q: 'FortiClient yerine WireGuard\'a geçersek denetim yeniden başlar mı?', a: 'Hayır, teknik kontrolün değişmesi denetim scope\'u değil, yapılanma dokümanı güncellemesi gerektirir. MFA + loglama + sertifika yönetimi korunduğu sürece uyum devam eder; geçişi yazılı değişiklik yönetimiyle belgeleyip uyum raporuna ekliyoruz.' },
        { q: 'Çalışan mobil cihazdan kurumsal uygulamaya bağlanırken DNS leak yaşanıyor. Finans verisi risk altında mı?', a: 'Evet, DNS sorguları ISP\'ye düştüğünde kimin hangi bankacılık uygulamasını kullandığı görünür. Full tunnel + tunnel-only DNS + kill switch üçlüsü olmadan finans ortamında VPN tamamlanmış sayılmaz.' },
      ],
    },
    ticaret: {
      scenario: 'Bir 45 kişilik muhasebe bürosu e-defter gönderim haftasında evden çalışan 12 SMMM\'si için OpenVPN Access Server kullanıyordu. Yıllık lisans yenilenmedi — sessiz kesinti. r/sysadmin\'de "OpenVPN AS license expired overnight" başlığı aynı şikayeti paylaşıyor: uyarı maili spam\'e düşmüş, Pazartesi sabahı tam e-defter deadline\'ında kimse bağlanamıyor. Manuel uzatma mümkün ama saatler kaybediliyor.',
      whyHere: 'Ticaret/hizmet sektöründe VPN, çalışanın saat 07:00\'da Logo\'ya erişmesi demek — gecikme direkt müşteriye yansır. Genelde bir "IT\'den sorumlu kişi" var ama derinlikli VPN yönetimi onun işi değil; dolayısıyla lisans, sertifika, yeni çalışan onboarding hep aksar.',
      technicalAngle: 'Ticaret müşterilerinde Tailscale veya self-hosted Headscale\'i WireGuard üzerine koyup yönetim yükünü azaltıyoruz. Kullanıcı Google Workspace/M365 ile login eder, cihaz otomatik onboard olur, ayrılınca tek tıkla revoke. Split tunnel ile Logo/Mikro\'ya sadece ERP alt ağ üzerinden erişim; YouTube ve kişisel trafik direkt internete gider, bant genişliği israfı olmaz.',
      faqs: [
        { q: 'Küçük bürom için Tailscale yeterli mi yoksa FortiGate SSL VPN mi?', a: '20-30 kişinin altında Tailscale yönetim kolaylığı ve Google/M365 entegrasyonuyla kazanır. FortiGate zaten varsa ve sözleşme aktifse SSL VPN üzerinden gitmek ek maliyet gerektirmez; ama yeni alımda Tailscale 2-3 kat daha az yönetim saati demek.' },
        { q: 'SMMM e-imzası (akıllı kart) VPN üzerinden çalışır mı?', a: 'Evet; akıllı kart USB\'de yerel cihazda çalışır, sertifika sadece KamuSM portalıyla konuşur. VPN sadece Logo/Mikro veritabanına erişimi güvenlikli tünelden geçirir; e-imza trafiği bu tüneli kullanmaz.' },
        { q: 'Yeni işe başlayan personel için VPN açmak ne kadar sürer?', a: 'Self-onboarding kurduğumuz yapıda <10 dakika: kullanıcı M365 hesabıyla Tailscale/WireGuard client\'a giriş yapar, cihaz admin portalında manuel onaylanır veya GroupPolicy otomatik onboard eder.' },
      ],
    },
    sanayi: {
      scenario: 'Bir OSB fabrikasında üretim müdürü hafta sonu SCADA alarmına uzaktan bakmak istiyor. TeamViewer\'ı kötü amaçlı aktörler bulmuş; geçen ay Spiceworks\'te "TeamViewer unauthorized access to our HMI" başlığı dikkat çekmişti. Üretim ağına doğrudan port forward riskli, ofis VPN\'ine ise SCADA ağı dahil değil. Yanlış mimari nedeniyle sahada görünürlük yok, saldırı yüzeyi açık.',
      whyHere: 'Sanayi ortamında VPN\'in iki ayrı rolü var: (1) ofis çalışanı için ERP/e-posta erişimi, (2) mühendislik için OT ağına kontrollü erişim. Bunları tek tünele karıştırmak Purdue modeline karşıdır; lateral movement ile ransomware üretim hattına sıçrayabilir.',
      technicalAngle: 'Sanayi müşterilerinde çift katmanlı VPN kuruyoruz: IT tarafında WireGuard (ofis kaynakları), OT tarafında ayrı bir jump host + ZTNA (Zscaler Private Access veya Cloudflare Access) ile session recording. Mühendis SCADA\'ya bağlanırken bağlantı video olarak kaydedilir, audit trail ISO 27001 ve IEC 62443 denetimlerine hazır. Port forward yasak; tüm erişim policy bazlı.',
      faqs: [
        { q: 'SCADA PLC\'lere uzaktan erişim PLC üreticisinin garantisini bozar mı?', a: 'Siemens, Rockwell ve Mitsubishi kendi uzaktan erişim çözümlerini öneriyor ama üçüncü taraf VPN kullanımı garantiyi bozmaz. Önemli olan PLC yazılımının yetkisiz değiştirilmemesi; bunu ZTNA session recording ve MFA ile kontrol altında tutuyoruz.' },
        { q: 'Üretim hattında kesinti olmadan VPN nasıl kuruluyor?', a: 'Ağ ekipmanı üzerine VPN gateway eklemek downtime gerektirmez. VLAN ve firewall kurallarını bakım penceresinde değiştiriyor, ilk önce ofis kullanıcılarını pilot olarak geçiriyor, sonra mühendislere aşamalı açıyoruz. Üretim vardiya değişiminde cutover yapıyoruz.' },
        { q: 'IEC 62443 uyumu için VPN logu ne içermeli?', a: 'Her oturum: kullanıcı, zaman damgası, bağlanan alt ağ, açılan port, session duration. PLC üzerinde değişiklik yapıldıysa bunu PLC programlama yazılımı logu ile korelasyon kurulabilir olmalı — biz syslog\'u SIEM\'de bunu otomatik eşleştiriyoruz.' },
      ],
    },
    gelisen: {
      scenario: 'Gelişmekte olan bir yazılım girişimi 14 uzaktan çalışanla başladı, iki yılda 45 kişi oldu. Herkes kendi DigitalOcean droplet\'ına SSH key kaydetmiş, AWS\'e IAM user\'larıyla giriyor, staging veritabanı public. r/sysadmin "startup with no VPN, everyone VPNs into random servers" klasik başlığı. Yeni güvenlik yöneticisi geldiğinde "bizim VPN\'imiz yok ki" cevabıyla karşılaştı.',
      whyHere: 'Gelişen bölgelerdeki startup ve dijital ajanslar hızla büyürken güvenlik borcu biriktirir. Her yeni çalışan önceki ayarları kopyalar, kimse envanter tutmaz; ayrıldığında access iptal tam yapılmaz. VPN + merkezi kimlik ilk günden kurulsa 45. kişide 6 aylık temizlik projesi doğmaz.',
      technicalAngle: 'Bu profildeki müşterilere Tailscale + Google Workspace/Okta SSO + AWS SSO kombinasyonu öneriyoruz. Her developer tek identity ile tüm AWS VPC\'lerine, staging/production veritabanlarına, iç GitLab\'a erişir; IP allowlist yerine identity-based policy. Çalışan ayrıldığında tek noktadan revoke; 5 dakikada tüm access kapalı.',
      faqs: [
        { q: 'AWS\'e VPN\'den mi bağlanmalıyım yoksa IAM user yeter mi?', a: 'İkisi farklı katmanlar. IAM identity\'dir; VPN ise private resource\'lara (RDS, EC2 private subnet, iç Kubernetes API) erişim verir. Production RDS\'in public endpoint\'inin olması security bulgusu; VPN zorunlu.' },
        { q: 'Tailscale SOC 2 uyumu getirir mi?', a: 'Tailscale kendisi SOC 2 Type II sertifikalı. Sizin SOC 2 denetiminizde VPN kontrolleri için "Tailscale ACL + MFA + audit log" yapınızı kanıt olarak sunabiliyoruz. Son 12 ayın denetimlerinde kabul gördü.' },
        { q: 'Freelancer geçici erişimi nasıl yönetiyoruz?', a: 'Tailscale Tags + ACL ile 48 saatlik oturumlar açıyoruz; freelancer Google hesabıyla giriş yapar, sadece tanımlı repo/veritabanına erişir, süre dolunca otomatik düşer. Manuel iptal gereksiz.' },
      ],
    },
    yakin: {
      scenario: 'Kozyatağı\'ndaki 25 kişilik bir sigorta acentesi, çevre ofisten bir çalışanın "evde pandemi\'de çalışırken VPN\'siz Excel\'i e-posta ile geri gönderdiği" bir olay sonrası paniğe kapıldı. SEGEM veri sınıflandırma denetimi geliyor. Mevcut VPN\'leri bir anti-virüs firmasının free ürününden geliyor — kişisel kullanım için. Kurumsal lisans yok, log yok, sertifika rotasyonu yok.',
      whyHere: 'Yakın bölge KOBİ\'lerinde "VPN = ev için" algısı hala yaygın. Oysa sigorta, danışmanlık, muhasebe gibi sektörler KVKK + sektörel regülasyonla yüklü. Kurumsal bir VPN kurmak bu müşteriler için 2 haftalık bir projeyle sonsuza kadar temizlenen bir risk kalemi.',
      technicalAngle: 'Merkez ofisimize 5-10 dakika mesafedeki müşterilerde WireGuard + iç CA + Microsoft Authenticator MFA kurulumunu tipik 2-3 gün içinde kapatıyoruz. Fortinet FortiGate 40F veya pfSense + OPNsense seçeneğini bütçeye göre öneriyoruz. Log 5651 uyumlu, tunnel-only DNS, kill switch aktif — müşteri denetime "teknik tedbirler" başlığı altında hazır giriyor.',
      faqs: [
        { q: 'Sadece 5-6 uzaktan çalışanımız var, kurumsal VPN\'e değer mi?', a: 'Sigorta/danışmanlık/hukuk sektörlerinde 1 çalışan bile yeterli — regülasyon kullanıcı sayısına bakmaz. Maliyet aylık 500-1500 TL arası FortiGate/pfSense ile sabitlenebilir; uyum cezasından çok daha düşük.' },
        { q: 'Kozyatağı ofisimizden uzakta bir yöneticim yurt dışına uçtuğunda bağlantı kopuyor. Neden?', a: 'Büyük ihtimalle split tunnel yanlış yapılandırılmış; tüm trafik Türkiye\'deki gateway üzerinden dönüyor, Wi-Fi sertifika doğrulama başarısız oluyor. Roaming modunu aktif edip persistent tunnel kuruyoruz; sorun kaybolur.' },
        { q: 'MFA için çalışanın telefonu yanında olmak zorunda mı?', a: 'İdeal çalışma senaryosu: MFA uygulama + yedek FIDO2 anahtarı. Telefon kaybolsa da USB anahtarı ile giriş sağlanır. Uygulama + SMS fallback en kötü kombinasyon; SMS hedeflenebilir.' },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 11) IT ALTYAPI KURULUMU & YENİLEME (greenfield / full-stack overhaul)
  // Kaynak: r/sysadmin greenfield threads, Spiceworks migration, ServerFault
  // ══════════════════════════════════════════════════════════════════
  'it-altyapi-yenileme': {
    finans: {
      scenario: 'Yeni kurulmuş bir bağımsız denetim firması İFM yakınlarında 24 kişiyle açıldı. Kurucu ortak "IT\'yi şimdilik cloud first yaparız" dedi; herkese MacBook + Google Workspace verildi, dosyalar Drive\'da, VPN yok. İlk müşteri ISO 27001 sertifikalı; onboarding\'de soru: "Merkezi kimlik yönetiminiz var mı, audit log\'larınız hangi sistemde?" Spiceworks\'te "accounting firm passed audit with pure Google Workspace" tartışması bu boşluğu gösteriyor — kısa vadede iş alır, orta vadede uyum çalışmaz.',
      whyHere: 'Finans sektöründe "lean cloud first" kurgu genç firmaya 18 ay yeter; ancak kurumsal müşteri denetimlerinde merkezi identity, endpoint yönetimi, immutable log ve role separation zorunludur. Sıfırdan kurulumun tam buraya denk gelmesi tasarımı temiz yapar; sonradan retrofit 3-4 kat emek.',
      technicalAngle: 'Finans greenfield\'da tercihimiz: Azure AD (Entra ID) primary + on-prem AD DS optional + Intune endpoint management + Microsoft 365 E5 (audit + DLP + Defender) + Fortinet FortiGate + Veeam + WORM log repo. 4-6 haftalık proje; ilk 2 hafta kimlik+cihaz, sonra e-posta+dosya, sonra firewall+VPN+yedek. BDDK/SPK müşterisi geldiğinde denetçi "evet, kontroller var" deyip geçer.',
      faqs: [
        { q: 'MacBook ağırlıklı ekibim için Windows Server\'a ihtiyaç var mı?', a: 'Hayır. Pure Azure AD + Jamf Pro (macOS MDM) + M365 E5 ile Windows Server olmadan enterprise kontrol kurulabilir. Ancak Logo/Mikro gibi Windows-only ERP varsa küçük bir Windows VM kaçınılmaz.' },
        { q: 'Cloud-only kurulum KVKK\'ya uygun mu?', a: 'Evet — veri lokasyonu (M365 EU-Türkiye bölgesi), kim-erişir-kontrol (Conditional Access), silme politikaları (retention) doğru yapılandırıldığında uygun. KVKK Kurulu "fiziksel sunucu Türkiye\'de olsun" demiyor; veri transferi yasal çerçevede olsun diyor.' },
        { q: 'SOC 2 / ISO 27001 sertifikasyon hazırlığına nasıl katkı sağlıyorsunuz?', a: 'Temel kontrolleri (access, change, backup, incident) teknik olarak uygulayıp belgeliyoruz; politika metinleri için sertifikasyon danışmanıyla birlikte çalışıyoruz. Ortalama bir sertifikasyon projesinin %60 teknik kısmı biz tarafımızda bitiyor.' },
      ],
    },
    ticaret: {
      scenario: 'Bir aile şirketi ikinci kuşağa geçti; 32 yıldır kullanılan "Osman Bey\'in muhasebe odasındaki sunucu" artık yetersiz. E-posta @hotmail, dosyalar herkesin masaüstünde, yedek dediği şey ayda bir USB. r/sysadmin\'de "family business finally decided to modernize" başlığı tam bu — tarih kurulmuş bir şirketin 2020\'lere taşınması projesi. Hiçbir envanter yok, lisans yok, şifreler Osman Bey\'in defterinde.',
      whyHere: 'Ticaret KOBİ\'lerinde "modernizasyon" genelde yangın söndürme modunda başlar: ya ransomware yediler, ya KVKK cezası geldi, ya e-fatura zorunluluğu zor duruma soktu. Sıfırdan kurulumun anlamı: kaostan çıkışla birlikte temiz başlangıç, bir daha batmamacasına.',
      technicalAngle: 'Ticaret greenfield\'ımızda 6 aşamalı geçiş: (1) Envanter + veri kurtarma: eski sunucudaki dosyalar forensik kopyalanır. (2) Microsoft 365 Business Premium tenant kurulumu + kurumsal domain. (3) Windows Server 2022 + AD DS + file sharing. (4) FortiGate 60F + kurumsal Wi-Fi + VLAN. (5) Veeam + NAS + bulut yedek. (6) Çalışan cihazları Intune ile standartlaştırma. 4-8 hafta, paralel çalışma, eski sistem 2-3 ay read-only.',
      faqs: [
        { q: 'Logo/Mikro ERP\'mi taşırsak verilerim kaybolur mu?', a: 'Hayır. Logo ve Mikro resmi migration araçlarını sağlıyor; yeni SQL Server\'a veritabanı aktarılır, son kapanan günün yedeğinden 2-3 saatte cutover edilir. Paralel test 1 hafta, sonra canlıya geçiş hafta sonu.' },
        { q: 'Eski @hotmail adreslerimi müşterilerim yıllardır biliyor, değiştiremem. Ne yapacağız?', a: 'Domain-based kurumsal e-posta kurarken eski adreslere forwarder kurup 6-12 ay paralel tutuyoruz. Müşterilere yavaş yavaş yeni adresi tanıtıyorsunuz, eskiler ölmüyor. Bu geçiş dönemi standart planımızın parçası.' },
        { q: 'Aile şirketi bütçesi sınırlı, hepsini aynı anda yapmak zorunda mıyız?', a: 'Hayır. Aşamalı plan: önce Mikrosoft 365 + domain (acil regülasyon), sonra firewall + yedek (güvenlik), sonra sunucu + AD (orta vade). 6-9 aya yayılan bütçe planı yapılabilir; kritik açığı kapatıp sonra olgunlaştırıyoruz.' },
      ],
    },
    sanayi: {
      scenario: 'OSB\'deki bir ambalaj fabrikası 1998\'de kurulmuş, ofis tarafında Server 2003 hala döndüğü bir DC var. ERP (eski Netsis) Windows XP bir makinede çalışıyor. Üretim tarafı henüz hiç IT ile konuşmadı; PLC\'ler ve MES olmadan kağıt-kalem. Satın alma kararı: "bu yıl dijital dönüşüm bütçesi var, her şeyi yeniden kurun." r/sysadmin\'de "manufacturing company asks for complete IT overhaul, OT included" senaryosu.',
      whyHere: 'Sanayi greenfield projeleri iki dünyayı (IT + OT) aynı anda kurmayı gerektirir — farklı tedarikçiler, farklı standartlar, farklı risk profili. Genç KOBİ greenfield\'dan daha zorludur; genelde 4-8 ay süren bir yol haritasıdır.',
      technicalAngle: 'Sanayi kurulumlarımızda IT katmanı (Windows Server 2022 + AD + M365 + FortiGate + yedek) 6-8 haftada; OT katmanı (endüstriyel switch, SCADA ağı, MES sunucusu, OT/IT segmentasyonu, Purdue model, IEC 62443 uyumlu) 3-4 ay. İki katman arasında tek yönlü data diode veya OPC UA gateway ile controlled information flow. Üretim hiç durdurulmadan, vardiya değişiminde cutover.',
      faqs: [
        { q: 'Üretim duramaz. Nasıl cutover yapıyorsunuz?', a: 'Paralel kurulum ve vardiya değişiminde geçiş. Yeni sistem test modunda 2-4 hafta canlı sisteme paralel çalışır; gerçek production trafiği sadece son cutover günü akar. Hafta sonu veya planlı bakım penceresinde 2-4 saatlik switch, fallback planı hazır.' },
        { q: 'Eski Netsis / Windows XP makineden nasıl kaçacağız?', a: 'İki yol: (1) Netsis\'i güncel sürüme upgrade, Windows Server 2022 + MSSQL\'e migration. (2) Yeni ERP\'ye tam geçiş (SAP Business One, Netsis, Logo Tiger Enterprise); bu 6-12 aylık ayrı proje. İlkini biz, ikincisini ERP danışmanıyla birlikte yönetiyoruz.' },
        { q: 'OT/IT birleştirme için IEC 62443 sertifikasyon zorunlu mu?', a: 'Üretim kritik altyapıysa (enerji, su, ilaç) zorunluluk; ambalaj/tekstil/gıdada best practice. Denetim gelmese bile sigortacı ve büyük B2B müşterisi (Unilever, P&G, vb. tedarik zinciri denetimi) soruyor. Sertifikasyon olmadan kontrolleri belgeliyor olmak orta yol.' },
      ],
    },
    gelisen: {
      scenario: 'Yeni taşındığı Çekmeköy\'deki ofise 8 kişiyle girdi, 18 ayda 42 kişi oldu — yazılım firması. Kurucu CTO kod yazarken IT\'yi kendi kurmuştu: home router, Google Workspace free tier, herkesin MacBook\'unda admin. Yeni HR direktörü gelince sormuş: "ayrılan developer\'ın Git erişimi kapandı mı?" Cevap: kimse bilmiyor. Spiceworks\'te "scaling startup loses track of access" sürekli tekrarlanan bir örüntü.',
      whyHere: 'Hızlı büyüyen firmalarda her yeni çalışan bir öncekinin ayarlarını kopyalar, envanter yoktur. 30 kişiyi geçince kaos; 50\'yi geçince güvenlik olayı kaçınılmaz. Greenfield\'ı hızlı büyüme anında yapmak temel disipline dönüş demek.',
      technicalAngle: 'Startup greenfield: Okta veya Microsoft Entra ID primary identity + JumpCloud opsiyonu + Jamf/Intune (Mac/Windows mix) + GitHub Enterprise + AWS SSO tek identity pool. M365 Business Premium veya Google Workspace Business Plus; CI/CD için self-hosted GitLab veya GitHub Actions. Tailscale/Cloudflare Access ile her servisin önünde identity gate. İşe başlayış: 10 dk, ayrılış: 5 dk — dokümanlı runbook ile HR yapıyor.',
      faqs: [
        { q: 'AWS\'deki kaynakları kim yönetecek? Developer\'lar kendi mi?', a: 'Önerimiz: IaC (Terraform) + SSO + least privilege. Developer üretim ortamına direkt yazma erişimi yok; tüm değişiklik merge request + CI pipeline ile. Sıfırdan kurarken bu disiplini ilk günden koymak sonradan eklemekten çok daha kolay.' },
        { q: 'Yatırımcıya SOC 2 sunabilmek için ne kadar vakit var?', a: 'Greenfield\'da kontrolleri ilk günden SOC 2 uyumlu tasarlarsak Type I için 3-4 ay, Type II için ek 6 ay observation window gerekir. Retrofit yapılırsa aynı projeler 9-18 ay alır. Yatırım turu varsa greenfield kararı yatırımcının hızlı oluyor.' },
        { q: 'Freelancer ve staj öğrencisi erişimini nasıl yönetiyorsunuz?', a: 'Identity provider\'da "contractor" ve "intern" kullanıcı grupları; erişim süresi 30-90 gün, otomatik expire. Geri uzatma için manager onayı. Çıkışta tüm access revoke < 10 dk.' },
      ],
    },
    yakin: {
      scenario: 'Ataşehir\'de 36 yaşındaki bir muhasebe/mali müşavirlik ofisi 3 kuşaklı aile şirketi; 28 çalışan. Son sorunu: "bilgisayarlar çok yavaş, Osman Bey öldükten sonra şifreler kayıp, e-defter günü sistem kilitlendi." Kozyatağı\'ndaki merkezimize telefon: "Her şeyi baştan kurun, kardeşim. Ben artık IT ile uğraşmak istemiyorum." Spiceworks\'te "small professional services firm wants turn-key IT" başlığı direkt bu vakaya uyuyor.',
      whyHere: 'Yakın bölge KOBİ\'lerinde sıfırdan kurulum projelerimizin %60\'ı "mevcut IT sorumlusu gitti / işi bırakamadı / hiç olmadı" nedeniyle geliyor. Bu müşteriler için greenfield + uzun vadeli yönetilen hizmet ikilisi tek sorumlu modelidir; müşteri IT düşünmez, biz her şeyi yürütürüz.',
      technicalAngle: 'Yakın bölge KOBİ greenfield\'ımız 4-6 hafta: Windows Server 2022 + AD DS + file share (Logo/Mikro ERP için Windows zorunlu) + Microsoft 365 Business Premium + FortiGate 60F + kurumsal Wi-Fi + Veeam + NAS + bulut yedek + Intune ile standart Windows laptop imajı. Müşteri tarafında ihtiyaç duyulan tek sorumlu biziz; haftada 2 yerinde ziyaret + uzaktan 7/24 izleme. Aynı sene içinde 3-4 yakın müşteri bu modele geçti.',
      faqs: [
        { q: 'Tüm projeyi tek fiyatla sabit yapıyor musunuz?', a: 'Evet — envanter sonrası sabit teklif. İçinde donanım + lisans + işçilik + eğitim + 30 gün stabilizasyon destek. Beklenmedik ek işlerde (örneğin mevcut verinin bozuk olduğu keşfedilirse) yazılı change request ile fiyat ayarlanır; sürpriz ek fatura çıkarmıyoruz.' },
        { q: 'Sunucu merkeze mi yoksa ofisimize mi gelecek?', a: 'Tercih size ait. KOBİ ölçeğinde çoğunlukla kendi ofisinizde (veya yakın bir data center\'da) bir tek fiziksel host + sanal sunucular tercih ediyoruz; çünkü Logo/Mikro ERP + dosya sunucusu + Active Directory lokalde daha hızlı. Bulut için dedike ihtiyaç varsa Azure/AWS VPC üzerinde hybrid mimari kuruyoruz.' },
        { q: 'Proje bitince bizi terk mi edeceksiniz?', a: 'Hayır — aksine. Greenfield projelerimizin %90\'ı proje sonrası aylık yönetilen hizmete geçiyor. Aylık sabit ücretle sisteminizi yürütüyor, küçük değişiklikleri dahil ediyor, yıllık planlama yapıyoruz. "Kurup git" modelinde değiliz.' },
      ],
    },
  },
};

import { districtServiceAngles } from './district-service-angles.js';

/**
 * Service slug + kategori → içerik bloğu.
 * İlçe-bazlı override varsa onu döner (duplicate content riskini azaltır);
 * yoksa kategori-shared fallback döner.
 */
export function getServiceAngle(serviceSlug, category, districtKey) {
  if (districtKey) {
    const districtOverride = districtServiceAngles[districtKey]?.[serviceSlug];
    if (districtOverride) return districtOverride;
  }
  const svc = serviceAngles[serviceSlug];
  if (!svc) return null;
  return svc[category] || null;
}
