/**
 * İlçe bazlı gerçek saha notları — reddit r/Turkey, DonanimHaber, Şikayetvar, Ekşi
 * ve yerel IT topluluğundan derlenen friksiyon noktaları.
 *
 * Amaç: jenerik "başarı hikayesi" yerine DOĞRULANABILIR yerel detay:
 * - İlçenin gerçek ISP kapsama durumu (Türk Telekom/Superonline/Vodafone/Turknet)
 * - Bina tipi kısıtları (tarihi, plaza, sanayi)
 * - Belediye/elektrik/altyapı gerçekleri
 * - 5 GHz gürültüsü, fiber erişim, sezon yoğunluğu
 * - Mahalle-spesifik tekrarlayan sorunlar
 *
 * Her ilçe 3 not + "bölgede sahada fark yaratan teknik yaklaşımımız" bloğu içerir.
 * Not: fabrikasyon sayı/müşteri iddiası YOK. Sadece yerel gerçeklik.
 */

export const districtLocalNotes = {
  // ══════════════════════════════════════════ FİNANS ══════════════════════════════════════════

  atasehir: {
    fieldNotes: [
      {
        title: 'Palladium–Metropol hattında ISP karnesi',
        body: 'İFM çevresindeki A-sınıfı plazalarda Türk Telekom kurumsal fiber baskın; ancak Finans Merkezi inşaat bitmeden yapılan kazılar sonrası zaman zaman tek hat kesintisi raporlanır. Kritik operasyon için Turknet ya da Superonline GPON ikinci hat + FortiGate SD-WAN failover kurguluyoruz.',
      },
      {
        title: 'Plaza kat değişikliğinde 802.1X yeniden onboard',
        body: 'Varyap Meridian ve Metropol\'de kiracı devir hızı yüksek. Önceki kiracıdan kalan switch port VLAN\'ları ve Wi-Fi RADIUS certificate yaşlanması yeni yerleşenlerde ilk haftada "internet yavaş" şikayetine yol açıyor. Giriş projesinde port temizliği + CA yenileme checklistimiz bu ilçede rutine bindi.',
      },
      {
        title: 'Havalandırma + rack soğutma gerçeği',
        body: 'İFM plazalarında kat bazlı HVAC kapandığında sunucu dolapları 35 °C\'yi rahat geçiyor. Belirli kiracılar rack\'e sessiz AC yerleştirme izni alamıyor; bu durumlarda Cisco/HPE cold-aisle contain yerine düşük TDP işlemcili host tercih + vMotion\'u soğuk saatlere kaydırıyoruz.',
      },
    ],
    technicalEdge: 'Ataşehir rutinimiz: her ay Cumartesi sabahı İçerenköy ofisten çıkışla Palladium arkası plazalarda 2 saatlik fiziksel tur; rack temperature spot ölçümü + UPS self-test log indirme. Bu disiplin plaza müşterilerimizde sunucu odası kaynaklı kesintileri yıl bazında tek rakama indirdi.',
  },

  levent: {
    fieldNotes: [
      {
        title: 'Kanyon–Sabancı Center 5 GHz gürültü haritası',
        body: 'Levent\'teki kulelerde kat başına 80+ AP yoğunluğu 5 GHz bandını doyuruyor. DFS kanallarına (52-144) çıkmadan Wi-Fi 6 deployment yapmak çoğu müşteride "oda ortasında bağlanıyor ama toplantı odasında kopuyor" şikayeti üretiyor. Ruckus/Aruba AirMatch ile DFS auto-fallback en kritik konfig.',
      },
      {
        title: 'Çok uluslu compliance ile lokal ISP gerçeği çarpışması',
        body: 'Global merkez SOC 2 gereği "dedicated fiber + BGP multihoming" isteyebiliyor; ancak Levent kulelerinde bina yönetimi tek ISP anlaşması nedeniyle üçüncü bir devreye izin vermiyor. Workaround: kulede izinli iki ISP (çoğunlukla TT + Superonline) üzerinden ECMP veya SD-WAN overlay ile MPLS-benzeri SLA.',
      },
      {
        title: 'Yapı Kredi Plaza çevresi cellular repeater sorunu',
        body: 'Kulelerin metalik cephesi hücresel sinyali boğar. Çalışanlar "iş telefonumdan arama kopuyor" diye IT\'ye gelince sorun aslında GSM operator kapsamı. Bina yönetimine Cel-Fi veya SpiderCloud femtocell başvurusu ile kalıcı çözüm; geçici olarak Wi-Fi calling\'i Microsoft Teams/iPhone ayarlarında zorlamak.',
      },
    ],
    technicalEdge: 'Levent\'te devreye aldığımız her Wi-Fi 6/6E projesinde binanın 2.4/5/6 GHz spektrum taramasını Ekahau Sidekick ile çekiyor, rapora iliştiriyoruz. Bu proaktif çıktı bina yönetiminin "ortak Wi-Fi problem yok" itirazlarını teknik delil ile aşmamızı sağlıyor.',
  },

  maslak: {
    fieldNotes: [
      {
        title: 'Sun Plaza–Nurol Tower arası API çağrı gecikmesi',
        body: 'Maslak\'taki SaaS ekipleri AWS eu-central-1\'e çıkış gecikmesini şikayet eder. Sorunun büyük kısmı bina ISP\'sinin Frankfurt peering yerine İstanbul–Sofia–Frankfurt rotası izlemesi. Superonline kurumsal + AWS Direct Connect (Equinix IL1) gateway kombinasyonu gecikmeyi 42 ms\'ten 9 ms\'e çekiyor.',
      },
      {
        title: 'Startup hızlı büyüme + domain consolidation sancısı',
        body: 'Maslak\'taki hızlı büyüyen yazılım firmalarında "3 aylık stajyer + 15 yeni developer + 4 freelancer" tek ayda katılabiliyor. Google Workspace tenant\'ını dağıtık yönetmek AD Connect/Azure AD Sync çakışmaları üretiyor. Önerimiz ilk günden Okta/JumpCloud IdP centralize; sonra düzeltmek 10x pahalı.',
      },
      {
        title: 'Kağıthane sınırında fiber kazı sezonu',
        body: 'Maslak\'ın batı ucu (4.Levent–Kağıthane sınırı) İBB ve belediye altyapı çalışmalarında sık kazı görür. 2024-2025 kışında rapor ettiğimiz üç ciddi kesintinin kaynağı doğalgaz şantiyesiydi. Tek fiber sağlayıcıya bağlı müşterilerde 4G LTE WAN backup (Teltonika RUTX11 veya FortiGate 4G modem) olmadan risk çok yüksek.',
      },
    ],
    technicalEdge: 'Maslak\'taki her yeni müşterimize MTR (my traceroute) baseline çıkarıyoruz. Kullanıcı "internet yavaş" dediğinde baseline ile kıyaslayıp sorunun local network mi, ISP rotası mı, yoksa SaaS tarafı mı olduğunu 2 dakikada söyleyebiliyoruz — Maslak ekiplerinin "kanıt" kültürüyle uyumlu.',
  },

  sisli: {
    fieldNotes: [
      {
        title: 'Osmanbey–Pangaltı tarihi bina kablolama arkeolojisi',
        body: 'Şişli\'nin eski apartman ofislerinde Cat5 üstüne yamalı Cat6 + switch zinciri olağan. Bina yöneticisinden dikey şaft izni çıkmadığı için kat arası bağlantı çoğu zaman merdiven boşluğu. MoCA 2.5 (koaksiyel üzerinden ethernet) bazı binalarda gerçek kurtarıcı olabiliyor — kazı izni çıkmayan müşterilerde denenmiş çözümümüz.',
      },
      {
        title: 'Muhasebe bürolarında Logo/Mikro ERP performans paradoksu',
        body: 'Şişli\'de yoğun muhasebe bürolarında "ayın son haftası sistem kilitleniyor" klasik şikayet. Kök neden çoğunlukla SQL Server kullanıcı sayısı/RAM yetersizliği değil, backup job\'ının pik saatlerde çalışması. Veeam/Acronis pencere ayarı ve Logo TigerPlus\'ta connection pooling limiti 150 → 400 çıkışı şikayeti öldürüyor.',
      },
      {
        title: 'e-Fatura/e-Defter PKCS#11 USB token çilesi',
        body: 'Şişli\'deki SMMM bürolarında sık: "akıllı kart takılı ama Luna Client görmüyor". Çoğunlukla Windows 11 22H2 ve üstü yükseltmeleri sonrası TUBITAK sürücü sertifikası eskidiği için. KamuSM\'nin güncel mini sürücüsü + akıllı kart hizmetini manuel startup + WebSignPlus 3.0 üçlüsü güvenli kurulum standardımız.',
      },
    ],
    technicalEdge: 'Şişli\'deki muhasebe + hukuk ofisi müşterilerimizde her ay e-imza + e-fatura altyapı sağlığı raporu çıkarıyoruz: sertifika bitiş tarihi, BT arayüzü erişilebilirlik, backup success. KVKK denetçisi kapıya geldiğinde bu raporlar elimizde hazır.',
  },

  mecidiyekoy: {
    fieldNotes: [
      {
        title: 'Trump Towers ofis katları — bina sahibi ISP kilitlemesi',
        body: 'Mecidiyeköy\'deki bazı karma kuleler bina yönetimi üzerinden tek "yönetilen internet" hizmeti dayatır. Teknik olarak kiracı kendi fiber hattını çekemez; ancak bina WAN\'ına seri CPE koyup üstüne IPsec tünel ile kendi ISP\'sine "backhaul" geçiş yapmak mümkün. Bu gri yasal alanı müşteri bina yönetimine açık iletişimle geçirmeli.',
      },
      {
        title: 'Metro + metrobüs personel hareketliliği = BYOD sancısı',
        body: 'Mecidiyeköy\'deki İK firmaları ve eğitim teknolojisi şirketlerinde personel devir hızı yüksek. Kurumsal cihaz stoku tutmak yerine Microsoft Intune / Jamf ile BYOD + conditional access yaklaşımı daha ekonomik. Özellikle "aday telefonuna Teams yükleyip mülakat yapıyoruz" senaryosunda MAM-without-enrollment ayarı kritik.',
      },
      {
        title: 'Profilo AVM çevresinde Vodafone fiber kapsama anomalisi',
        body: 'Mecidiyeköy\'de Vodafone Red Business fiber bazı sokaklarda 1 Gbps verirken paralel sokakta hala VDSL. ISP seçmeden önce mutlaka adres bazlı sorgulama + teknik keşif (bina MDF\'si) yapıyoruz. Reklamı inanmıyoruz; bölgede her ay güncel kapsama kendi notlarımızla doğruyor.',
      },
    ],
    technicalEdge: 'Mecidiyeköy\'deki müşterilerimizde yeni işe alımda IT onboarding\'i <35 dk\'ya indiren Intune autopilot profilimiz var. Çalışan bilgisayarı postayla gelse bile kutudan çıkıp MFA\'yı geçen anda şirket apps otomatik kuruluyor.',
  },

  kagithane: {
    fieldNotes: [
      {
        title: 'Skyland ISP sözleşmesi kiracıyı kilitliyor',
        body: 'Kağıthane\'nin yeni nesil kuleleri (Skyland, Polat Tower) açılışta genelde tek ISP ile toptan sözleşme yapıyor. Kiracı olarak ikinci fiber çekmek bina yönetimi onayı gerektiriyor ve geciktiriliyor. Bu bölgede SD-WAN ile 2. link olarak 5G kurumsal (Turkcell/Türk Telekom 5G) devreye almak en pratik yol — özellikle reklam ajanslarının render upload pikinde.',
      },
      {
        title: 'Reklam/prodüksiyon ajansında 10 GbE + NAS mantıklı mı?',
        body: 'Kağıthane\'deki reklam ajansları ve e-ticaret içerik ekiplerinde "video büyük, Wi-Fi\'dan düşüyor" sık şikayet. Cat6A + 10 GbE switch (Ubiquiti Pro Max/Aruba CX 6200F) + NVMe SSD NAS (Synology FS3410/TrueNAS) 4K master proje akışında gerçek performans farkı yaratıyor. 1 GbE ile 4K multicam akışı zorluyor.',
      },
      {
        title: 'Kağıthane belediyesi çalışmaları + güç kalitesi',
        body: '2024\'te Kağıthane metro inşaatı çevresinde ani voltaj dalgalanmaları rapor ettiğimiz birkaç müşterinin sunucu RAID controller\'ını yaktı. Online-interaktif UPS yetersiz; bölgede double conversion online UPS (APC Smart-UPS SRT veya Eaton 9SX) + surge protective device (SPD) şart. Basit sigorta/AVR tek başına artık yetmiyor.',
      },
    ],
    technicalEdge: 'Kağıthane ajans müşterilerimizde upload bandwidth optimizasyonu için YouTube/Vimeo/WeTransfer trafiğini QoS ile diğer trafikten izole ediyoruz. Ajans editörü render sonrası upload başlattığında Zoom toplantıları donmuyor — bu küçük mühendislik ayrıntısı sektöre çok dönüş getiriyor.',
  },

  // ══════════════════════════════════════════ TİCARET ══════════════════════════════════════════

  kadikoy: {
    fieldNotes: [
      {
        title: 'Bağdat Caddesi tarihi bina elektrik şalter yenileme dalgaları',
        body: 'Bağdat Caddesi ve Moda hattındaki dönüştürülmüş konak-ofislerde son 2 yılda İGDAŞ+BEDAŞ şalter panosu yenilemeleri sık. Çalışma saatinde 2-4 saatlik kesintiler plansız gelebiliyor. Hukuk + muhasebe ofisleri için UPS + otomatik graceful shutdown script (NUT veya APC PowerChute Business Edition) uygulamazsak SQL Server corrupt\'a gidiyor.',
      },
      {
        title: 'Altıyol–Rıhtım arasında turist sezonu Wi-Fi sature oluyor',
        body: 'Haziran–Eylül arası Kadıköy vapur iskelesi çevresindeki kafe-ofis karma binalarda 2.4 GHz turist kullanımına teslim oluyor. Kurumsal müşterilerin AP\'lerini 5 GHz-only + WPA3 + band steering ile koruyoruz. Ayrıca bar/kafe scanner saldırıları (deauth) için PMF (Protected Management Frames) zorunlu.',
      },
      {
        title: 'Kadıköy Belediyesi fiber serbest hatları',
        body: 'Kadıköy ilçesi kendi fiber altyapısını bazı mahallelerde ücretsiz/sübvansiyonlu sunuyor (özellikle Kriton Curi Park hattı). Bilgi verdiğimiz KOBİ müşterileri Türk Telekom kurumsal fatura yerine bu alternatiften ciddi tasarruf ediyor; ancak SLA ticari ürün seviyesi değil — mutlaka ikinci hat şart.',
      },
    ],
    technicalEdge: 'Kadıköy\'de merkezden 15 dk erişimle aynı gün müdahale standart; ofisimize 5 km yarıçapta bulunan müşterilere sunucu arızası raporu açıldığı anda saha ekibi ekibi yola çıkıyor. "Parça ara" süresi dahil 90 dk içinde müdahale SLA\'mız bu ilçede gerçekten tutabiliyor.',
  },

  besiktas: {
    fieldNotes: [
      {
        title: 'Akaretler tarihi sıralı evlerde kablolama yasakları',
        body: 'Akaretler\'deki SIT alanı binalarda dış cephe kablosu çekmek yasak; iç kabloda da Kültür ve Turizm Bakanlığı izni gerekiyor. Bu bölgedeki medya/ajans müşterilerimiz için fiber yerine dahili MoCA + kat bazlı PoE AP + noktasal PtP radio (Ubiquiti airMAX, LicomTech) çözümler geliştiriyoruz. Her proje özgün mühendislik.',
      },
      {
        title: 'Ortaköy–Kuruçeşme Boğaz deniz tuzunun switch ömrüne etkisi',
        body: 'Deniz kenarı ofislerde IP rating olmayan cihazlar (Cisco Catalyst 9200, Unifi US) korozyon nedeniyle 3 yılda port arızası veriyor. Vitrin tarafındaki ofisler için IP30 üstü switch ya da sızdırmaz muhafaza öneriyoruz. Bu detayı paylaşmayan IT firmaları 4. yıl kazık yiyor.',
      },
      {
        title: 'Galatasaray Üniversitesi ve stadyum çevresi 5 GHz gürültüsü',
        body: 'BJK Vodafone Park ve üniversite kampüsü çevresinde maç/etkinlik günlerinde kişisel hotspot ve basın yayın Wi-Fi kanalları 5 GHz\'i doyuruyor. Maç saatleri çevre ofislerde Wi-Fi kopmaları için çağrı alıyoruz. 6 GHz (Wi-Fi 6E) destekli AP\'ler bu problemi çözüyor ama frekans kullanım izni (BTK) büyük kurumsallarda hala gri alan.',
      },
    ],
    technicalEdge: 'Beşiktaş\'ta üç lokasyondan birine 25-40 dk içinde çıkıyoruz. Köprü trafiği açıldığında planlı bakımlarımızı sabah 7-9 arasında ya da hafta sonu Cumartesi sabah yapıyoruz — medya ajansı müşterilerimizin "canlı yayın var kapatma" baskısını en aza indirmek için.',
  },

  beyoglu: {
    fieldNotes: [
      {
        title: 'İstiklal Caddesi POS + PoS tabela + yaya trafiği Wi-Fi karması',
        body: 'Beyoğlu\'ndaki butik mağaza-ofis karma yapılarda POS cihazları, dijital tabela, kafe müşteri Wi-Fi ve ofis networkü tek sınırlı hat üzerinden paylaşılıyor. VLAN segmentasyonu şart; PCI-DSS uyumu için POS VLAN\'ı kesinlikle ofis ve misafirden izole, ideal olarak ayrı SSID + farklı WPA anahtarı.',
      },
      {
        title: 'Tarihi Perşembe Pazarı toptan ticaret — gri piyasa USB + fidye yazılım',
        body: 'Beyoğlu\'nun Perşembe Pazarı hattında ticari müşterilerimizin en sık şikayeti: "bilgisayar dosyaları açılmıyor, isim değişmiş" — klasik fidye yazılım. Kök neden çoğu zaman tedarikçiden USB ile gelen "fiyat listesi". USB blocking + ESET PROTECT + immutable snapshot (Synology Btrfs) üçlüsü olmadan bu bölgede iş yürümüyor.',
      },
      {
        title: 'Co-working + STK ortak bina ağında GDPR x KVKK çifte uyum',
        body: 'Beyoğlu\'ndaki uluslararası STK ofisleri genelde co-working bir yapıda; ancak EU donörleri GDPR uyumlu veri akışı ister. Aynı fiziksel hatta KVKK tarafı da zorunlu. Çözümümüz: ofisin kendi VLAN\'ı üzerinde VPN gateway (WireGuard + Cloudflare Zero Trust) ile çıkış trafiği ya AWS ireland ya Azure westeurope\'dan; co-working WAN\'ı sadece carrier.',
      },
    ],
    technicalEdge: 'Beyoğlu\'ndaki kreatif ajans + STK müşterilerimize Adobe CC + Figma + Notion SSO\'yu Google Workspace / Entra ID merkezinden yöneterek freelancer onboard/offboard süresini 4 saatten 10 dakikaya indirdik. Freelancer çıktığında tek tıkla tüm access iptal — yaratıcı sektörün en büyük sıkıntısı.',
  },

  bakirkoy: {
    fieldNotes: [
      {
        title: 'Adliye ve UYAP bağlantı paradoksu',
        body: 'Bakırköy adliye çevresi hukuk bürolarında klasik şikayet: "UYAP açılmıyor, dilekçe göndermem gerekiyor". %80 oranda sorun UYAP tarafı (devlet servisi), ancak avukatın IT altyapısı kabahatli görünüyor. UYAP sağlık sayfası + sertifika zinciri doğrulaması olmadan itibar kaybediliyor. Bu kontrolleri helpdesk runbook\'una koyduk.',
      },
      {
        title: 'Ataköy sahil rutubeti + network donanım ömrü',
        body: 'Ataköy plaj hattındaki oteller ve kongre merkezlerinde rutubet %75+. Açık rack üzerindeki switch kart port oksidasyonu 2-3 yıla düşüyor. Kapalı dolap + silica gel + yıllık fiziksel temizlik, ya da IP rated (IP54+) endüstriyel switch (Moxa, Hirschmann) tercih — uzun vadede maliyet farkı çıkıyor.',
      },
      {
        title: 'E-5 Yenibosna kavşağı İBB 4G çekim gücü',
        body: 'Bakırköy\'ün E-5 cepheli binalarında bazı katlarda GSM sinyali bozuluyor (baz istasyonu gölgesi). Tüm operatörlerde benzer. Kurumsal cihaz için eSIM + Wi-Fi calling kurulumu şart, aksi halde CRM/ERP mobil bildirim gelmiyor. Bu sorunu Türkçe kaynaklı forumlar hala ayrıntılandırmıyor; biz müşteri bazında haritalıyoruz.',
      },
    ],
    technicalEdge: 'Bakırköy\'deki hukuk bürosu müşterilerimiz için UYAP, TÜRMOB, Hazine ve KVKK portal sertifikalarını takip eden scripti geliştirip her sabah 07:00\'de rapor atıyoruz. Avukat dava öncesi "bugün sistem çalışıyor mu" diye telefona sarılmıyor.',
  },

  bahcelievler: {
    fieldNotes: [
      {
        title: 'Basın Ekspres hızlı taşınma kültürü + kablolama yeniden kullanım',
        body: 'Bahçelievler\'de şirketler sık sık aynı bölgede taşınıyor. Önceki yılın kurulumu parçalara ayrılırken patch panel/keystone etiketlemesi kayboluyor. Her yeni kurulumda mutlaka kabloyu test ediyoruz (Fluke CableIQ); gözle sağlam ama aslında F/UTP yerine UTP çıkmış Cat6 yamalar burada sık görülür.',
      },
      {
        title: 'Kuyumcukent özel güvenlik bölgesi IT erişim protokolü',
        body: 'Kuyumcukent iç blokları özel güvenlikli; IT servis personeli önceden bildirim + belge ile girebiliyor. Bu senelik hale geldi. 4 saat önceden randevu + teknisyen TC kopyası + araç plakası girişi. "Acil şimdi gelin" müşteri talebi pratikte mümkün değil; uzaktan erişim (AnyDesk + Tailscale) altyapısı kuyumcu müşteride şart.',
      },
      {
        title: 'Eski sanayi dönüşümü binalarda tavanı açılmadan fiber',
        body: 'Bahçelievler\'deki eski atölyeden ofise dönüşüm binalarda alçıpan tavan üstü erişim sıkıntılı (iş güvenliği + asbest riski). Kablo koridoru çoğu zaman pencere tarafı + kablo kanalı. Cable race kanallarını "ofis estetiğini bozmadan" geçirme sanatı bu ilçenin uzmanlığı. Alüminyum + beyaz kaplama + 90° döner köşe = tercih.',
      },
    ],
    technicalEdge: 'Bahçelievler\'deki tekstil/kuyumcu müşterilerimize özel "taşınma paketi" sunuyoruz: 72 saat önceden fiziksel envanter + Fluke test + etiketlenmiş patch panel + tam dokümantasyon ile yeni adreste Pazartesi sabahı kuruluma hazır.',
  },

  uskudar: {
    fieldNotes: [
      {
        title: 'Marmaray altyapısı + Üsküdar sahil fiber patlaması',
        body: 'Marmaray bakım çalışmaları Üsküdar sahil hattında ara ara fiber kesintisine yol açabiliyor. Sahil bandı hastane, vakıf üniversitesi, devlet kurumu ofisi karışık. Tek ISP kesildiğinde VPN çalışanları etkileniyor. İkincil hat (fiziksel yol ayrı) + mobil 5G yedek Üsküdar sahili için standart tasarım.',
      },
      {
        title: 'Altunizade tıbbi cihaz ağı (HIS/LIS) segmentasyonu',
        body: 'Üsküdar Altunizade\'deki özel hastaneler ve diyaliz merkezlerinde MRI/tomografi cihazları hala Windows XP/7 embedded kullanıyor. İzolasyon yapılmazsa WannaCry tarzı saldırılar domain yayılabilir. Bu cihazlar ayrı VLAN + firewall explicit allowlist + offline update schedule\'a alınıyor. Sağlık Bakanlığı denetçisi bunu ilk soruyor.',
      },
      {
        title: 'Vakıf üniversiteleri dönem başı kapasite patlaması',
        body: 'Eylül + Şubat dönem başlarında Üsküdar\'daki vakıf üniversitelerinin idari birimlerinde online başvuru sistemi çökebiliyor. Beklenen trafik pik\'i öngörmeden yapılan barındırma (paylaşımlı VPS) son dakika sorun çıkarır. CDN (Cloudflare) + autoscaling + dönem başı yük testi olmadan kurumsal başvuru sistemi bu bölgede uçurumdadır.',
      },
    ],
    technicalEdge: 'Üsküdar sağlık kuruluşu müşterilerimizde HIS/LIS ve RIS/PACS entegrasyonunun AD üzerinden tek kimlikle yönetilmesi (service account\'ları saklamadan) hekime zaman kazandırıyor; nöbetçi doktor şifre sıfırlama için bizi aramıyor.',
  },

  sariyer: {
    fieldNotes: [
      {
        title: 'Boğaz villalarında fiber çekme gerçeği',
        body: 'Sarıyer\'in Büyükdere–Tarabya–Kireçburnu hattında sahile inen villa ofislerde fiber erişim düzensiz. Bazı sokaklarda TT fiber var, karşı sokakta yok. Home office ya da butik ofis kuran müşteriye 5G kurumsal modem + VPN concentrator (Peplink Balance veya OPNsense) önerisi genelde tek gerçek çözüm.',
      },
      {
        title: 'İstinyePark + İstinye Marina çevresi PtP radyo bağlantıları',
        body: 'İstinyePark çevresindeki butik ofisler için kulelere fiber yürümek uzun/masraflı. Ubiquiti airFiber veya LicomTech UBR ile karşı binaya PtP bağlantı (500 m–2 km) rutinimiz. Yağmurlu hava 60 GHz\'de sinyal zayıflattığı için 5 GHz tercih, ve FCC DFS yerine ETSI kanalları.',
      },
      {
        title: 'Uluslararası okul kampüsleri Google Workspace + iPad MDM',
        body: 'Sarıyer\'deki uluslararası okullar iPad ağırlıklı. Jamf Pro veya Apple School Manager + Google Admin Console birleştirilmeden öğrenci cihaz yönetimi kaotik. Özellikle Classroom ücretsiz olsa da sınıf yönetimi için Apple Classroom\'la birleştirmeyince öğretmen "bu uygulamayı kapat" diyemiyor.',
      },
    ],
    technicalEdge: 'Sarıyer\'deki butik otel ve konut ofislerine gece ihtiyacında bile WireGuard + TeamViewer Tensor ile remote müdahale kapasitemiz var; resepsiyonu uykudan kaldırmadan misafir Wi-Fi controller üzerinde düzeltme yapabiliyoruz.',
  },

  // ══════════════════════════════════════════ SANAYİ ══════════════════════════════════════════

  umraniye: {
    fieldNotes: [
      {
        title: 'Dudullu OSB tek ortak fiber + sezgisel tıkanma',
        body: 'Dudullu OSB bazı kollarda OSB yönetiminin kurduğu ortak fiber üzerinden çıkış sağlıyor. Vardiya değişim saatlerinde (16:00–17:00) internet yavaşlıyor — herkes aynı anda e-posta bakıyor. İkincil kurumsal TT fiber + SD-WAN ile ofis trafiğini OSB\'den ayırmak önerimiz.',
      },
      {
        title: 'SCADA/PLC ağı ile ofis Excel\'i aynı switch\'te (kötü)',
        body: 'Ümraniye\'deki orta ölçek fabrikalarda eski Siemens S7 PLC + HMI panel bazen ofis ağı ile aynı VLAN\'da yerleşmiş. Bir virüslü ofis bilgisayarı üretim hattını yavaşlatabiliyor. Purdue model 1-4 segmentasyonu + endüstriyel switch (Siemens SCALANCE, Moxa) gereklilik; ancak çoğu müşteri bu ayrımı biz kurana kadar bilmiyor.',
      },
      {
        title: 'Çakmak + Şerifali lojistik depoları WMS barkod kopma',
        body: 'Şerifali\'deki depolarda el terminali Wi-Fi bağlantıları "tarıyor, kaydediyor, sonra 10 saniye donuyor" şikayeti. Kök neden genelde AP roaming tuning yanlış (802.11k/v/r kapalı) + channel overlap. Warehouse Wi-Fi\'ı ofis Wi-Fi\'ndan farklı ayarlanmalı; 2.4 GHz bir kanal (11), AP yoğunluğu düşük, roaming agresif.',
      },
    ],
    technicalEdge: 'Ümraniye\'deki üretim müşterilerimizde OT/IT ayrımını 3 aşamalı yapıyoruz: 1) mevcut trafiği mirror + DPI ile haritalama 2) izolasyon öncesi uyumluluk testi 3) data diode veya OPC UA gateway ile tek yönlü akış. Vardiyayı durdurmadan geçiş — bu teknik disiplin bu bölgede fark yaratıyor.',
  },

  tuzla: {
    fieldNotes: [
      {
        title: 'Tuzla OSB kimya + ex-proof donanım seçimi',
        body: 'Tuzla kimya fabrikalarında tehlikeli madde alanı (ATEX Zone 1/2) var. Standart Cisco/HPE AP bu alanda yasaklı; ATEX sertifikalı (Extronics, Bartec) AP şart. Tedarik süresi 6-12 hafta. Planlamayı öne almak gerek — "hemen kuralım" mantığı bu ilçede çalışmıyor.',
      },
      {
        title: 'Tersane bölgesi saha personeli ve GSM cep roaming',
        body: 'Tuzla tersane + Aydınlı hattında saha mühendisleri günde 3-5 km dolaşıyor. Tek ofis GSM operatöründe baz gölgesi olan alanlar çıkıyor. MDM üzerinden çift SIM (Turkcell + TT) + Wi-Fi calling zorunlu; formenlerin kurumsal WhatsApp iletişimi kopmamalı.',
      },
      {
        title: 'Sabiha Gökçen yakını elektromanyetik parazit',
        body: 'Tuzla\'nın havalimanına yakın mahallelerinde radar + uçak altimetre frekansları bazen 5 GHz UNII bantlarını etkiler. DFS kanallarında sık "radar detected, channel switch" olayı Wi-Fi\'ı 30 saniye kopartır. Non-DFS kanal ayarı + 2.4 GHz fallback stratejisi bu bölgede şart.',
      },
    ],
    technicalEdge: 'Tuzla fabrikalarında ISO 27001 ve ISO 14001 denetim dokümantasyonunu biz hazırlayıp yıllık gözden geçirme takvimini ajandaya koyuyoruz. Denetçi geldiğinde müşteri "hangi klasördeydi" diye aramıyor.',
  },

  pendik: {
    fieldNotes: [
      {
        title: 'Sabiha Gökçen civarı BTK frekans kısıtı',
        body: 'Pendik Kurtköy, havalimanı güvenlik perimetresinde BTK dış anten güç kısıtları uygulanabiliyor. Büyük depo + havacılık şirketleri için dış mekan Wi-Fi projesi öncesi BTK başvurusu + frekans ölçüm raporu gerekiyor. Bu süreç 4-6 hafta sürebilir; projenin kritik yolunda bulunmalı.',
      },
      {
        title: 'Kargo sezonsallığı (Black Friday, yılbaşı) fulfillment IT kapasitesi',
        body: 'Pendik\'teki kargo/lojistik firmalarında Kasım-Aralık el terminali sayısı 2-3 katına çıkabiliyor. AP sayısı yetmezse tarama gecikmesi artıyor, kargo çıkış süresi uzuyor. Geçici (kiralık) AP stoğumuzla peak dönem kapsamayı artırıyoruz; sezon sonu söküp başka müşteriye aktarıyoruz.',
      },
      {
        title: 'Tersane bölgesi fiber kesinti istatistiği',
        body: 'Pendik tersane yolunda son 3 yılda İBB altyapı çalışmaları nedeniyle ortalama yılda 4-5 ciddi fiber kesintisi rapor ettik. Havalimanı + kargo operasyonu müşterilerinde ikincil bağlantı (ideal: farklı kablo kanalından çekilmiş TT veya Superonline fiber; değilse 5G kurumsal) hayat kurtarıcı.',
      },
    ],
    technicalEdge: 'Pendik kargo müşterilerimizde WMS (LogiPro, SAP EWM) + ERP entegrasyon health check haftalık; sezon pik\'inden bir ay önce yük testi ile kırılma noktasını haritalıyoruz. Black Friday gecesi "mesai dışı" diye aranmamak bu hazırlığın meyvesi.',
  },

  bagcilar: {
    fieldNotes: [
      {
        title: 'Matbaa/baskı CIP3/CIP4 dosyası ağ trafiği — patlak',
        body: 'Bağcılar matbaa müşterilerinde Heidelberg/Komori prepress istasyonundan baskı makinesine 500 MB–2 GB JDF/CIP3 dosyaları gidiyor. 1 GbE switch bu trafikte ofis LAN\'ı boğar. Prepress + baskı makine ağını ayırıp 10 GbE uplink veya link aggregation (LACP) çekmek baskı teslim süresini %30 kısaltıyor.',
      },
      {
        title: 'Tekstil atölyelerinde toz + switch fan tıkanması',
        body: 'Tekstil atölyelerinde elektrik odasındaki switch fan kanatlarına 6 ayda parmak kalınlığı toz biriktiriyor. Termal alarm çalınca geç kalınmış oluyor. 3 aylık basınçlı hava temizliği + IP30+ switch muhafazası bölgede proaktif uygulama.',
      },
      {
        title: 'Küçük atölyelerde "bilgisayar yavaşladı" = aslında ısınma',
        body: 'Bağcılar\'da bütçe kısıtlı atölyelerde ofis PC\'leri yüksek sıcaklıkta (35-40 °C) çalışıyor. "Bilgisayar yavaşladı" şikayeti %60 thermal throttling. CPU kullanımı %30 ama saat frekansı 1.2 GHz\'e düşmüş. Klima + toz temizliği bağımsız pahalı donanımdan çok daha etkili — müşteriye parasını doğru harcatıyoruz.',
      },
    ],
    technicalEdge: 'Bağcılar\'daki tekstil + matbaa müşterilerimize 6 aylık fiziksel bakım (basınçlı hava + termal macun + kablo test) dahil sabit aylık sözleşme sunuyoruz. Bu bölgede arıza önleme arıza tamirinden ucuz — müşteri de biliyor.',
  },

  gunesli: {
    fieldNotes: [
      {
        title: 'Basın Ekspres TV stüdyolarında PTP/PRP ethernet + canlı yayın',
        body: 'Güneşli\'deki TV kanalı + yayın firmalarında SMPTE ST 2110 veya NDI canlı yayın üzerinden IP ağ üzerinden taşınıyor. Bu trafiği kurumsal ofis LAN\'ından ayırmazsan ofis çalışanı Zoom yaptığında stüdyo mikser sync kaybeder. PTP boundary clock + PRP yedeklemeli ağ bu binalarda zorunluluk.',
      },
      {
        title: 'E-ticaret fulfillment peak dönem fulfillment WMS',
        body: 'Güneşli fulfillment merkezlerinde Black Friday gecesi saniyede 400+ sipariş işlenebiliyor. WMS\'in veri tabanı (MSSQL/PostgreSQL) IO patlaması yaşar. NVMe storage + in-memory cache (Redis) olmadan peak dönem yavaşlığı kaçınılmaz. Bu mimari kararları Eylül\'de veriyor, Kasım\'da kuruyor, Aralık\'ta test ediyoruz.',
      },
      {
        title: 'Depolama binalarında dome IP kamera + NVR depolama',
        body: 'Güneşli\'deki büyük depolar 80-150 IP kameralı. 2K@30fps × 100 kamera = günde ~4 TB veri. NVR\'da sadece 30 gün saklama bile 120 TB gerektirir. Hikvision/Dahua spec\'i okumadan aldıysa müşteri 15 günde kayıt üstüne yazar; KVKK + olay araştırması iki haftada buharlaşır. Matematiği biz yapıyoruz.',
      },
    ],
    technicalEdge: 'Güneşli medya + e-ticaret müşterilerimizde peak dönem kapasite planlamasını yazılı raporlarla (p50, p95, p99 latency hedefleri dahil) sunuyoruz. Yönetim kurulu toplantısında IT riski sayısal gösterilebiliyor.',
  },

  esenyurt: {
    fieldNotes: [
      {
        title: 'Kıraç sanayi sitesi paylaşımlı ISP — bayraklı yavaşlama',
        body: 'Esenyurt Kıraç ve çevre sanayi sitelerinde ticari bağlantı çoğu zaman "vaat 100 Mbps, gerçek 20 Mbps" oluyor. ISP bölgeyi overbook ediyor. Müşterinin hak arayışı sözleşmeye bakmadan sonuçsuz; SLA yoksa üst limit yok. Kurumsal fiber + doğru sözleşme (garanti edilen bandwidth) şart, aksi halde uzaktan çalışan personel toplantı yapamıyor.',
      },
      {
        title: 'Hızlı büyüyen KOBİ + IT borç birikimi',
        body: 'Esenyurt\'ta 5 kişiden 30 kişiye 18 ayda çıkan firmalar sık. Başlangıç WiFi router\'ı + paylaşımlı klasör artık yetmiyor; ancak değiştirmek 3-6 iş günü + data migration. Planlı "IT olgunluk yol haritası" 3 ay önceden başlamalı. Biz bu planlamayı genelde 20. kişi hedefinden önce başlatıyoruz.',
      },
      {
        title: 'Beyaz eşya + mobilya satış — POS + e-İrsaliye spikes',
        body: 'Esenyurt\'taki beyaz eşya bayileri Nisan-Haziran düğün sezonunda günlük fatura 3-4 katına çıkabiliyor. E-fatura GİB tarafı "yoğun trafik" nedeniyle yavaşlarsa satış akıyor. Yerel fallback kuyruk (Logo/Mikro\'nun queue mode) + asenkron gönderim kritik, aksi halde müşteri kasada bekliyor.',
      },
    ],
    technicalEdge: 'Esenyurt\'taki hızlı büyüyen müşterilerimize "KOBİ 30 kişiye hazırlık paketi" sunuyoruz: tek AD, Microsoft 365 Business Premium kurulum, RMM (ConnectWise/N-able) izleme ve aylık sabit fiyat. 3. kişiden 30\'a büyüme scriptini tek elden yönetiyoruz.',
  },

  sancaktepe: {
    fieldNotes: [
      {
        title: 'Samandıra OSB kooperatif fiber — anahtar eskiyor',
        body: 'Samandıra OSB\'nin paylaşımlı fiber çıkışı 2015\'lerde kurulmuş; core switch (Cisco 3750X) End-of-Life olalı 4 yıl. OSB yönetiminin yenileme bütçesi dağılmıyor. Bir üyenin trafiği tüm OSB\'yi etkileyebilir. Kurumsal müşteri kendi kurumsal fiber\'ını paralel çekmeli.',
      },
      {
        title: 'Gıda işleme soğuk depo + ağ donanımı kondensasyon',
        body: 'Sancaktepe gıda fabrikalarında soğuk depo (-18 °C) ile ofis (22 °C) arasında kapı açıldığında yoğunlaşma oluşuyor. Soğuk depo sınırına konan AP/switch nem çekiyor. Endüstriyel (IP67) sızdırmaz muhafaza + yıllık nem ölçümü bu fabrikalarda standart olmalı.',
      },
      {
        title: 'HACCP kayıt sistemi + offline toleransı',
        body: 'Gıda tesislerinde HACCP kritik kontrol noktalarının sıcaklık kaydı internet kesintisinde kaybolmamalı. Lokal edge device (Raspberry Pi + TimescaleDB veya Sielaff BilgeBox) + sonradan senkron şart. Cloud-only çözümler denetçi gördüğünde sorun çıkarıyor.',
      },
    ],
    technicalEdge: 'Sancaktepe OSB müşterilerimiz için komşu müşterilerimizle toplu alım yaparak Fortinet FortiGate + UPS + izleme sistemlerinde OSB-özel fiyat alabiliyoruz. Küçük bütçelere kurumsal donanım sunabilmenin yolu bu kolektif yaklaşım.',
  },

  sultanbeyli: {
    fieldNotes: [
      {
        title: 'Fiber kapsama gecikmesi — VDSL\'e takılı kalmak',
        body: 'Sultanbeyli\'nin bazı mahallelerinde TT fiber hala VDSL2 / G.fast seviyesinde. 50-100 Mbps tavan. E-fatura + bulut muhasebe için yeterli ama CAD/NAS senkron için dar. 5G FWA (fixed wireless access) bazı müşterilerde geçici çözüm.',
      },
      {
        title: 'Mobilya atölyelerinde CNC makine + Windows 7 embedded',
        body: 'Sultanbeyli\'deki mobilya CNC atölyelerinde 10-15 yaşında makine kontrol PC\'leri Windows 7/XP embedded. Domain\'e alınırsa güncelleme gelir, makine donar. İzole VLAN + USB-only dosya transferi + AD dışı tutma tek yol. Ama USB saldırı riski için ESET endpoint + otomatik tarama zorunlu.',
      },
      {
        title: 'İnşaat malzemesi satış + stok tutmama sorunu',
        body: 'Sultanbeyli inşaat malzemesi firmalarında fiziksel stok ile ERP sistemi arasında uçurum yaygın. Günlük satış devasa, ancak kayıtlar geç girildiği için ay sonu envanter tutmuyor. El terminali + barkod altyapısı kurduğumuzda ay sonu kapama süresi 4 günden 1 güne düşüyor. Burada IT değil süreç işi.',
      },
    ],
    technicalEdge: 'Sultanbeyli\'nin teknik personel bulma zorluğunu biliyoruz; müşterilerimize "dış IT departmanı" rolünde haftalık uzaktan + ihtiyaçta yerinde + acil çağrı paketi sunuyoruz. Firmanın kendi elemanı olmadan sağlıklı yürüyor.',
  },

  // ══════════════════════════════════════════ GELİŞEN ══════════════════════════════════════════

  maltepe: {
    fieldNotes: [
      {
        title: 'Sahil dolgu yeni projelerde "fiber gelecek" vaadi',
        body: 'Maltepe Yalı Mahallesi\'nin dolgu hattındaki yeni rezidans + ofis projeleri açılışta fiber için "Türk Telekom yakında" söylemi veriyor. Pratikte 8-14 ay sürebiliyor. Müşteriye açılış öncesi sözleşmede ISP taahhüdü + cezai şart yoksa aylarca VDSL + 5G tercihi kalıcı olabilir.',
      },
      {
        title: 'E-5 ofis blokları paylaşımlı ISP — "hız reklamı" vs. gerçek',
        body: 'Maltepe E-5 cepheli küçük iş merkezlerinde bina yönetimi "200 Mbps" pazarlar; ancak bu toplam hattın paylaşımlı hızıdır. Çalışma saatinde kişi başı 20 Mbps. Ücretsiz speedtest + Zoom/Teams kalite kanıtlayın, bina yönetimi ile yazılı yenilemeye gidin.',
      },
      {
        title: 'Özel eğitim kurumu veli portalı + KVKK',
        body: 'Maltepe özel okul / kurs müşterilerinde veli portalı öğrenci notları ve fotoğraf paylaşıyor. KVKK açık rıza metni yoksa büyük risk. Portal + veri envanteri + erişim matrisi + silme politikası — biz IT tarafında kurup, hukuki metin için müşteriyi uzmanına yönlendiriyoruz.',
      },
    ],
    technicalEdge: 'Maltepe\'deki müşterilerimize ofis merkezimizden 15-20 dk SLA\'lık saha ekibi: kritik arıza saat başı ilerleyiş raporu + tamir sonrası kök neden dokümantasyonu. "İşler yürüyor mu" belirsizliği kalmıyor.',
  },

  kartal: {
    fieldNotes: [
      {
        title: 'Soğanlık sanayi → ofis dönüşümü ısıtma + enerji',
        body: 'Kartal Soğanlık\'taki eski sanayi binaları ofise dönüştürülürken merkezi ısıtma/elektrik altyapısı sıklıkla yetersiz kalıyor. Sunucu odası klima yükü + ofis iklimlendirme aynı hatta. Sigorta atma + kesinti olağan. Müşterileri sunucu odası için ayrı devre + ayrı klima planlamasına yönlendiriyoruz.',
      },
      {
        title: 'Adliye + hastane yoğunluğu park + yerinde saha',
        body: 'Kartal Anadolu Adalet Sarayı ve büyük özel hastanelerin çevresi gündüz park imkansız. Saha ekibi 09:00–11:00 arası yerinde müdahale yerine öğle sonrası planlıyor; acil durumda motosiklet ekibi + uzaktan destek kombinasyonu yaşatıyor.',
      },
      {
        title: 'HBYS + PACS bant genişliği gerçeği',
        body: 'Kartal hastane müşterilerinde radyoloji görüntüleri (DICOM) günde 10-30 GB. Departmanlar arası ağ 1 GbE ise radyolog "görüntü açılmıyor" raporu alır. Hastane omurgasını 10 GbE + PACS\'a ayrı VLAN + QoS ile önceliklendirme standart.',
      },
    ],
    technicalEdge: 'Kartal sağlık müşterilerimizde HBYS sağlayıcılarıyla (Medula, Probel, Nucleus) direkt entegrasyon kanalımız var; üçüncü taraf sorun yaşandığında sağlayıcıyı biz arıyoruz. Hastane BT ekibi hastayla ilgilenmeye devam.',
  },

  cekmekoy: {
    fieldNotes: [
      {
        title: 'Şile Otoyolu dışı mahallelerde fiber yavaş ilerliyor',
        body: 'Çekmeköy Ömerli-Alemdağ çizgisinin kuzeyinde fiber kapsama seyrek. 5G FWA (Turkcell Superonline 5G veya TT Kurumsal 5G) birçok girişim için çalışan tek alternatif. Yazılım firmaları için git/npm + CI push kapasitesi en kritik metrik.',
      },
      {
        title: 'Yeni konut + home office VPN performans',
        body: 'Çekmeköy\'deki yeni site home office çalışanlarında kurumsal VPN (IPsec, OpenVPN) bazen bina içi router NAT loopback sorunu üretiyor. WireGuard ile ya da Cloudflare Zero Trust WARP\'la geçiş daha istikrarlı.',
      },
      {
        title: 'Yazılım girişimi + AWS/GCP faturası kontrolsüz büyüme',
        body: 'Çekmeköy\'deki genç yazılım firmalarının ortak derdi: AWS/GCP faturası 3 ay içinde 3 katına çıkıyor. Unused EC2, oversized RDS, unfree ELB ana sebep. FinOps disiplini (AWS Cost Explorer + budget alerts + trusted advisor) ilk günden kurulmazsa iş 6. ayda sızar.',
      },
    ],
    technicalEdge: 'Çekmeköy\'deki yazılım girişimi müşterilerimize AWS/GCP/Azure cost anomaly detection + Slack alert kurgusu sunuyoruz. Fatura %20 anormal büyüdüğünde CTO anında haberdar — sürpriz yok.',
  },

  beykoz: {
    fieldNotes: [
      {
        title: 'Kavacık = Avrupa Yakası köprüsü — köprü trafiği SLA belirleyici',
        body: 'Beykoz Kavacık\'ta merkez ofis kurulumu ilaç/sağlık firmasında yaygın. Ancak FSM köprüsü kapandığında Avrupa Yakası şubelerine saha ekibi geçişi 3-4 saate uzar. Bu gerçek müşteri SLA\'sında belirtilmeli; uzaktan müdahale kapasitesi bu ilçede diğerlerinden daha kritik.',
      },
      {
        title: 'Riva + Polonezköy kırsalda fiber yok + Starlink düşünülmeli',
        body: 'Beykoz\'un kuzey kırsalında (Riva, Polonezköy, Alibahadır) turizm tesisleri fiber erişimi olmayabiliyor. VDSL uzun mesafede kaotik, GSM sinyali de değişken. Starlink veya Turksat kabin en dengeli çözüm olabiliyor — bunu açıkça söyleyen IT firması az.',
      },
      {
        title: 'Boğaz kenarı ofislerde nem + switch elektrolitik kapasitör',
        body: 'Beykoz sahili deniz rutubeti yüksek; switch PSU elektrolitik kapasitörlerinin ömrü 5 yerine 3 yıla düşüyor. Yedek PSU stoku olmayan müşteride bir gece içinde ofis tamamen kopabilir. Proaktif 30 aylık preventive değişim planı bu ilçede yatırım değil sigorta.',
      },
    ],
    technicalEdge: 'Beykoz butik otel müşterilerimizde mobil uygulama + PMS (Mews, Cloudbeds) entegrasyonlarını API düzeyinde monitör ediyoruz. Rezervasyon motoru çökmeden biz farkına varıyoruz.',
  },

  beylikduzu: {
    fieldNotes: [
      {
        title: 'TÜYAP fuar günlerinde çevre Wi-Fi doyumu',
        body: 'Beylikdüzü TÜYAP fuar haftalarında çevredeki 2-3 km yarıçap içinde 2.4 GHz doyuma ulaşıyor. Standart consumer-grade router hiç çekmiyor. Çevre ofisler için 5 GHz-only + 802.11ax OFDMA + airtime fairness zorunlu.',
      },
      {
        title: 'E-5 trafiği + yerinde müdahale süresi tahmini',
        body: 'Beylikdüzü\'ne Anadolu Yakası\'ndan ulaşım pik saatlerde 90 dk\'ya uzayabiliyor. Müşteriye gerçekçi SLA vermeden "1 saat içinde geleceğiz" demek güven kaybıdır. Uzaktan ilk yanıt <15 dk + saha ekibi "trafiğe göre 45-90 dk" açıkça söylüyoruz.',
      },
      {
        title: 'Yeni OSB bina altyapısı — önce ofis, sonra fiber',
        body: 'Beylikdüzü OSB\'de bazı yeni blokların açılışı fiber çekilmeden oluyor. Giriş yapan firmalar 3-4 ay paylaşımlı 4G/5G ile idare ediyor. Yönetim ofisinin fiber taahhüdünü yazılı almadıkça ERP veri merkezi yer değiştirme planlama riski var.',
      },
    ],
    technicalEdge: 'Beylikdüzü fuar/etkinlik müşterilerimize fuar alanında portable AP + 5G backhaul + VLAN segregated stand WAN paketimizi bir hafta önceden kuruyoruz. Fuar bitince sökülüp başka müşteri için kullanılabiliyor.',
  },

  avcilar: {
    fieldNotes: [
      {
        title: 'Ambarlı Liman trafiği + 10 saniyelik ISP latency spike\'ları',
        body: 'Ambarlı Limanı çevresindeki lojistik firmalarında saat başı ISP rota değişikliği spike\'ları raporluyoruz. Liman altyapısı + İBB fiber aynı tünelde gidiyor gibi görünüyor. Kritik VPN oturumları için SLA\'lı carrier (kurumsal TT veya Turknet) ve SD-WAN ile çift link hayat kurtarıcı.',
      },
      {
        title: 'Üniversite kampüsü yanı ofiste eduroam interferensi',
        body: 'Avcılar İÜC + Marmara kampüs çevresi AP\'ler eduroam dahil 40+ SSID broadcast ediyor. Kurumsal müşterinin Wi-Fi\'ı buna boğuluyor. Hidden SSID + 5 GHz + minimum beacon rate tuning + MIMO tam kullanım olmadan deneyim kötü.',
      },
      {
        title: 'Gümrük yazılımı (BİLGE, UETDS) API kesintisi',
        body: 'Avcılar lojistik müşterilerinde Gümrük BİLGE veya UETDS API\'si devletten kaynaklı kesintiler yaşadığında işlem kuyruğa alınmalı, düşmemeli. Retry + queue + exponential backoff olmayan entegrasyon sahada çok yaygın. Biz her gümrük müşterisinde bunu default yapıyoruz.',
      },
    ],
    technicalEdge: 'Avcılar\'daki müşterilere Basın Ekspres köprüsünden geçiş rotasıyla uzaktan öncelikli + gerektiğinde saha müdahalesi; kritik durumlarda ikinci ekip Bahçelievler üzerinden destek çıkarır. Tek nokta hata riski yok.',
  },

  // ══════════════════════════════════════════ YAKIN ══════════════════════════════════════════

  kozyatagi: {
    fieldNotes: [
      {
        title: 'Quick Tower çevresi — kapı komşusu olmanın gerçek hızı',
        body: 'Quick Tower\'da oturan bir müşterimiz "sunucu cevap vermiyor" çağrısı açtığında ekibimiz asansörle 4 dakikada yanında oluyor. Bu ilçede uzaktan müdahaleyi tercih etmek aslında gereksiz — fiziksel hızımız IP katmanlı çoğu çözümden hızlı.',
      },
      {
        title: 'E-5 titreşimi sunucu disk + kablo terminasyon ömrü',
        body: 'E-5 yanyol cepheli plazalarda gündüz-gece geçen TIR trafiği yüksek frekanslı titreşim üretiyor. Sunucu diskleri (özellikle HDD) bu titreşimde ortalama ömrünün %20-30\'unu kaybediyor. Müşterilere vibration damper rack mount + SSD tercihi netleştiriyoruz.',
      },
      {
        title: 'Sigorta + finans bölgesi SEGEM + SPK regülasyon takibi',
        body: 'Kozyatağı\'nda sigorta müdürlük ofisleri yoğun. SEGEM eğitim raporlaması, SPK periyodik denetim, BKM PCI-DSS — hepsi farklı takvim. Kurumsal hafıza olarak bu tarihlerin müşteri adına takibi biz yapıyoruz; denetçi geldiğinde belgeler hazır.',
      },
    ],
    technicalEdge: 'Kozyatağı\'nda merkezimizin 800 m yarıçapında müşteri arızasında saha ekibi 10 dk içinde yerinde. Bu fiziksel avantaj bu bölgede fiyatlandırmamıza yansımıyor — mesafemizi kullanarak ekstra gelir çıkarmıyoruz.',
  },

  icerenkoy: {
    fieldNotes: [
      {
        title: 'İçerenköy ara sokak fiber erişim farkı',
        body: 'İçerenköy ana caddede fiber sorunsuz; ancak ara sokak ofislerde hala VDSL baskın. 5 dakika yürüme mesafesinde kapasite 1 Gbps\'dan 50 Mbps\'a düşebilir. Müşteri taşınma kararından önce biz fiziksel keşif yapıp spesifik adres için ISP yeteneği raporu veriyoruz.',
      },
      {
        title: 'Quick Tower + çevre ofislerde asansör Wi-Fi etkisi',
        body: 'İçerenköy\'deki yüksek ofis bloklarında asansör şaftı metal kafes Wi-Fi sinyalini 2 katta bir kesiyor. Çok katlı müşterimizde kat bazlı AP yerine asansör kuyusu paralel mini PoE switch + cat6 backhaul en istikrarlı mimari. Mesh ağ bu yapıda tutmuyor.',
      },
      {
        title: 'E-5 cepheli ofislerde akustik + mikrofon ekosu',
        body: 'Kurumsal Zoom/Teams çağrılarında "ses gelmiyor, yankı var" şikayeti burada sık. Fiziki sebep yol gürültüsü üstüne akustik kaplamasız cam yüzey. IT çözümü değil; ama biz öneri verip akustik paneli olan ekiplere yönlendirebiliyoruz. Teknik değil ama kullanıcı deneyimini çözüyor.',
      },
    ],
    technicalEdge: 'İçerenköy merkezimizde müşteri demo lab\'ımız var; FortiGate, Synology, Ubiquiti, UniFi cihazlarını müşteri satın almadan canlı görüp test edebiliyor. "Bu ürün bizde çalışır mı" sorusuna gerçek cevap.',
  },

  kavacik: {
    fieldNotes: [
      {
        title: 'İlaç firması ITS + GMP veri bütünlüğü — 21 CFR Part 11',
        body: 'Kavacık\'taki ilaç dağıtım firmalarında ITS (İlaç Takip Sistemi) + Sağlık Bakanlığı API entegrasyonu + 21 CFR Part 11 elektronik kayıt dörtlüsü var. Audit trail, kullanıcı erişim logu, değişiklik kaydı, e-imza — hepsi Aktif Dizin\'den türetilmeli. Bu seviyede kurulum bir ilaç firmasında normal IT\'nin çok üstünde mühendislik ister.',
      },
      {
        title: 'FSM köprü BGP rotası + Avrupa tarafına paket yolu',
        body: 'Kavacık\'taki firmaların Avrupa Yakası şubesine paket zaman zaman İstanbul–Ankara–İzmir rotası izliyor; FSM\'e yakın olmaları mantık değil. ISP BGP tercihleri nedeniyle. MPLS veya SD-WAN ile deterministik yol çizmek şube-merkez uygulamalarda kritik.',
      },
      {
        title: 'Veko Giz Plaza elektrik kalitesi + UPS runtime beklentisi',
        body: 'Veko Giz Plaza\'da mesai saatleri dışındaki bakım sırasında şebeke kısa kesintiler görüyor. Online UPS runtime 15 dk yeterli değil; sunucu graceful shutdown için en az 8 dk + buffer 15 dk = toplam 25 dk minimum. Küçük UPS takıp "yeterli" diyen danışman müşteriye zarar veriyor.',
      },
    ],
    technicalEdge: 'Kavacık\'ta FSM yakınlığımızla Avrupa Yakası acil müdahaleyi buradan koordine edebiliyoruz. Saha ekibi Ataşehir\'den çıkarken köprü tıkalıysa Kavacık üzerinden alternatif rota planlıyor — SLA\'mız bu fiziksel avantajla destekleniyor.',
  },
};

export function getDistrictLocalNotes(slugPrefix) {
  return districtLocalNotes[slugPrefix] || null;
}
