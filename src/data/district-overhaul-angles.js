/**
 * İlçe-bazlı IT Altyapı Kurulumu & Yenileme (greenfield / overhaul) angle'ları.
 *
 * Kaynak: r/sysadmin, r/msp, Spiceworks greenfield/acquisition tartışmaları,
 * ServerFault, Cisco/Fortinet Community, Microsoft Q&A, Reddit r/smallbusiness,
 * r/devops, HIMSS, Pharmaceutical IT forums.
 */

export const districtOverhaulAngles = {
  atasehir: {
    scenario: 'İFM\'de yeni açılan 28 kişilik bir yatırım danışmanlığı firması "cloud first" kurgusuyla MacBook + Google Workspace + kişisel Drive başlangıcı yaptı. 6. ayda ISO 27001 sertifikalı bir müşteri onboarding\'inde "merkezi kimlik, DLP, audit trail?" sorusuna cevap yok. Spiceworks\'teki "boutique finance firm inherited no IT, suddenly needs enterprise controls" 2024 başlığı tam bu. 4 haftada Azure AD + Intune + M365 E5 + WORM log infrastructure greenfield kuruldu.',
    whyHere: 'Ataşehir İFM\'deki finans firmaları "lean cloud first" başlar ama kurumsal müşteri denetimleri merkezi identity ve immutable log ister. Sıfırdan doğru tasarım, 6 ay sonra retrofit\'ten çok daha az emek. BDDK/SPK kontrolleri ilk günden mimariye gömülmeli.',
    technicalAngle: 'Azure AD (Entra ID) primary + on-prem AD DS optional (Logo Tiger için) + Intune endpoint management + M365 E5 (Defender + DLP + Sentinel) + Fortinet FortiGate 100F + Veeam + Azure Blob immutable storage. 4-6 haftalık faz: kimlik+cihaz, e-posta+dosya, firewall+VPN+yedek. Denetçiye "kontroller mevcut" yanıtı hazır.',
    faqs: [
      { q: 'MacBook ağırlıklı finans ekibi için Windows Server gerekmez mi?', a: 'Pure Azure AD + Jamf Pro ile Windows Server\'sız enterprise kontrol. Logo Tiger gibi Windows-only ERP varsa küçük bir Azure VM yeterli; fiziksel sunucu gerekmiyor.' },
      { q: 'M365 E5 Business Premium\'dan ne kadar pahalı?', a: 'E5 lisans başı ~$57/ay vs. Business Premium ~$22. Ancak E5\'te Defender for Identity + Sentinel dahil; ayrı alırsanız $35 ekler. Finans regülasyonu varsa E5 ekonomik.' },
      { q: 'BDDK/SPK denetçisi Azure\'u "yurt dışı veri" sayar mı?', a: 'M365 Multi-Geo veya EU data region seçimi ile veri Türkiye + EU region\'da. BDDK "yurt dışına aktarım ve saklama" kontrollü; Microsoft\'un data residency belgeleri kabul görüyor.' },
    ],
  },

  levent: {
    scenario: 'Levent Kanyon yakınındaki bir çok uluslu private equity fonu Türkiye ofisi 22 kişiyle açıldı. Global HQ Londra; Türkiye IT\'sinin global standartlara uyumlu olması gerekiyor (SOC 2 + UK Data Protection Act). Hollanda ofisine SharePoint migration, Londra merkeze AD Trust. r/sysadmin\'de "Turkey subsidiary setup with global IT standards" konusu aynı dengesizlikleri gösteriyor. 6 haftalık plan: Azure AD Connect + Global MPLS + lokal Logo + merkezi SIEM.',
    whyHere: 'Levent çok uluslu Türkiye ofislerinin yoğunluğunda global IT + lokal Türkçe regülasyon ikilemi. Her yapıtaşı (DC, DLP, CASB, SIEM) merkezden standart; bizim işimiz bunları Türkiye KVKK ile uyumlu enjekte etmek.',
    technicalAngle: 'Azure AD Connect hibrit kimlik (merkez AD + lokal AD replikası); Microsoft 365 E5 tenant share edilir. MPLS + SD-WAN İstanbul-Londra; Fortinet FortiGate global policy template. Logo Tiger lokalde, veri AWS eu-west-2\'ye günlük snapshot. Merkezi Sentinel SIEM; Türkiye logu filtreli merkeze akar.',
    faqs: [
      { q: 'Global HQ\'nun AD ormanına dahil olmak KVKK için risk mi?', a: 'AD Trust metadata transfer (kullanıcı adı, sertifika hash) teknik konrol olarak KVKK uyumlu. Asıl kişisel veri (CV, bordro) Türkiye tenant\'ında. Açık rıza metninde global IT altyapısı olarak bildirilir.' },
      { q: 'SOC 2 Type II için Türkiye ofisinin ayrı denetimi mi?', a: 'Global SOC 2 kapsamına Türkiye dahil edilir; in-scope olduğunda aynı kontroller denetçi tarafından test edilir. Biz Türkiye tarafında evidence (log, policy, access review) sağlıyoruz.' },
      { q: 'Londra ile İstanbul arası MPLS maliyeti ne?', a: 'Tanzip/NTT/Tata gibi Tier-1 sağlayıcılarda aylık $3,000-8,000 (bandwidth\'e göre). SD-WAN + internet alternatifi $500-1,500 aylık. Finans/compliance ihtiyacı olmazsa SD-WAN yeterli.' },
    ],
  },

  maslak: {
    scenario: 'Maslak Sun Plaza\'daki 32 kişilik bir SaaS girişimi 14 aylık hızlı büyüme sonrası "ortak bir IT mimarimiz yok" tespiti yaptı. Her developer kendi AWS account\'unu açtı; üretim + staging + dev karışmış, IAM user sayısı 187, kimse envanterin sahibi değil. r/devops\'taki "startup grew too fast, IT security debt" başlığı birebir örtüşüyor. Greenfield refactor: AWS Organizations + Control Tower + Okta SSO + tek billing account — 8 haftada yeniden kurulum.',
    whyHere: 'Maslak\'ın SaaS ekosistemi 14 ayda 5\'ten 50\'ye çıkan ekipler standart. "IT borcu" 30. kişide fark edilir, 100\'de kriz olur. Greenfield refactor sadece temizlik değil, yatırım turuna SOC 2 hazırlığıdır.',
    technicalAngle: 'AWS Organizations + Control Tower ile multi-account structure: prod + staging + dev + sandbox ayrı account. Okta SSO tüm AWS\'e SAML; IAM user yerine role-assumption. GitHub Enterprise + GitOps (Flux/ArgoCD) ile infrastructure as code. SOC 2 control evidence collection ilk günden (Vanta veya Drata).',
    faqs: [
      { q: 'Mevcut AWS altyapısını durdurmadan nasıl refactor?', a: 'Strangler fig pattern: yeni account\'ları paralel kur, yeni servisleri yeniye alma, eskileri yavaşça migrate et. 3-4 ay paralel çalışma. Kritik prod\'u en son taşırız.' },
        { q: 'AWS Control Tower pahalı bir overhead değil mi?', a: 'Kendisi ücretsiz (sadece kullandığın kaynak ücreti). Audit + guardrails + SSO federation handikapını tek kutuya çözüyor. Startup\'ta bu değerleri ayrı kurmak 2 haftalık sysadmin emeği.' },
      { q: 'Developer hiyerarşisinde production access kim alacak?', a: 'Principle of least privilege: prod deployment access sadece 2-3 kişi (CTO, Lead SRE). Diğerleri emergency break-glass role ile audit trail bırakarak 15 dk erişim alır. Vanta/Drata evidence olarak kaydediliyor.' },
    ],
  },

  sisli: {
    scenario: 'Şişli Osmanbey\'deki 29 kişilik bir SMMM bürosu 2024 yaz aylarında ransomware saldırısı geçirdi — Logo Tiger veritabanı şifrelendi, "yedek var ama açılamıyor". 6 aylık kayıtların kaybı. r/sysadmin\'deki "accounting firm ransomware aftermath" 2024 başlığı aynı senaryoyu anlatıyor. Yeniden inşa greenfield: temiz Windows Server 2022 + AD + 3-2-1 yedek + immutable bulut + endpoint protection; iki haftalık geçiş.',
    whyHere: 'Şişli muhasebe + hukuk bürolarında "bize bir şey olmaz" algısı ransomware\'i besliyor. Saldırı sonrası yeniden kurulum hem acil hem dönüşüm fırsatı. Eski yapıyı kopyalayıp yamamak yerine sıfırdan doğru kuruluyor.',
    technicalAngle: 'Saldırı sonrası forensic: eski altyapıda ne kaldı. Temiz hardware: Dell PowerEdge T550 + Windows Server 2022 + AD DS + Logo Tiger yeni kurulum. Veeam + immutable Wasabi S3 bucket + ESET PROTECT + FortiGate 60F. Eski backup\'tan sadece "temiz" finansal veriler manuel seçimle yeni ortama alınır.',
    faqs: [
      { q: 'Ransomware sonrası Logo Tiger\'a kayıtları nereden geri alıyoruz?', a: 'Temiz son yedekten (ya da yayıncıdan alınan tarayıcı erişimli arşiv). Ransomware 3-4 hafta önce enfekte olmuş olabilir; o döneme dair yedek "temiz" mi titizlikle incelenir. Sigorta poliçesi varsa forensic ekibiyle birlikte.' },
      { q: 'Geçiş süresi boyunca büro çalışabilir mi?', a: 'Geçici SMMM\'ler Excel + manuel kayıt; 2-3 hafta. Yeni sistem hazır olduktan sonra aralıkta tutulan işlemler katalog olarak girilir. e-Fatura/e-Defter timeline\'ı önce gelir.' },
      { q: 'Aylık maliyet ne kadar artar?', a: 'Eski altyapıda "yedek var ama test edilmemiş" ücretsizdi — aslında sigortasız. Yeni yapıda 3-2-1 + immutable + managed ~₺3,000-5,000/ay. Sigorta primi gibi düşünün; saldırı geri dönüşü bu maliyeti 50 kat aştırır.' },
    ],
  },

  mecidiyekoy: {
    scenario: 'Mecidiyeköy Trump Towers ofis katındaki 41 kişilik bir İK firması 3 farklı sağlayıcıdan IT hizmeti alıyordu: e-posta bir firmada, Logo muhasebede, firewall bambaşka birinde. Bir sorun olduğunda üçü birbirine mesaj atıyor. Spiceworks\'teki "small business with 3 IT vendors, everyone blames the other" klasik dilemma. 6 haftalık "tek çatı" konsolidasyonu: tüm sözleşmeler tek sağlayıcıda, tek panel, tek sorumlu.',
    whyHere: 'Mecidiyeköy\'deki İK + sigorta + yazılım KOBİ\'lerinde 3-4 sağlayıcılı "çoklu sessizlik" model yaygın. Her sağlayıcı kendi siloda, ofis IT sorumlusu yorgun. Sıfırdan tek-çatı kurulum operasyonel sadelik yaratıyor.',
    technicalAngle: 'Envanter: mevcut e-posta, Logo, firewall, AV, backup, telefon — hepsi listelenir. Tek sağlayıcı altında yeniden kurulum: M365 Business Premium (e-posta + OneDrive + Intune + Defender), FortiGate 60F + FortiAnalyzer, Veeam, Logo Tiger upgrade. Eski sözleşmeler yenileme tarihinde kapanır; geçiş 6-8 hafta paralel.',
    faqs: [
      { q: 'Mevcut sağlayıcılarla sözleşmeler cezasız biter mi?', a: 'Çoğu yıllık otomatik yenileyen; 30-60 gün önceden feshi ile cezasız kapatılır. Biz müşteri adına fesih mektuplarını hazırlıyoruz. Aktif kalan son 2-3 ayda geçiş yapılır.' },
      { q: 'Trump Towers bina yönetimi kendi IT hizmeti teklif ediyor — dahil etmek gerek mi?', a: 'Hayır. Bina ISP\'si "yönetilen internet" genelde basic; kiracının kurumsal ihtiyacını karşılamaz. Kiracı olarak ayrı fiber ya da SD-WAN ile bina WAN\'ını backup\'a düşüren mimari.' },
      { q: 'Aylık sabit ücret 3 sağlayıcıdan daha mı ucuz?', a: 'Çoğu durumda evet, %15-25 tasarruf. Ama en büyük kazanç "kimin sorumluluğu?" belirsizliğinin bitmesi. Bir sorun olduğunda tek numara: biz.' },
    ],
  },

  kagithane: {
    scenario: 'Kağıthane Skyland\'deki 26 kişilik reklam/video prodüksiyon ajansı, 6 yıldır büyümüş kablolama labirentine dönüşmüş bir ofise sahip. 4K proje dosyaları NAS\'a 1 GbE ile yazıyor; render farklarının yarısı network kaynaklı gecikme. Avid Community\'deki "post production network overhaul" 2024 tartışmaları 10 GbE + NVMe NAS kombosunu standart gösteriyor. Taşınma bahanesiyle sıfırdan yapılandırma: tüm ofis Cat6A + 10 GbE + Synology FS3410 + Wi-Fi 6E.',
    whyHere: 'Kağıthane reklam ajans + prodüksiyon yoğunluğu network kapasitesini kritik yapar. 1 GbE ile 4K multicam akışı darboğaz; 10 GbE + NVMe\'ye geçiş üretkenliği 3-4 kat artırır.',
    technicalAngle: 'Cat6A yapısal kablolama + Ubiquiti UDM-Pro + Pro Max 24 PoE (10 GbE uplink) + Pro Max 48 PoE switch. NAS: Synology FS3410 all-flash + 10 GbE dedicated link, editörlere direkt. Wi-Fi 6E (Pro Max 6 AP) 160 MHz channel. Adobe Creative Cloud + Frame.io review workflow. Ajans editörü bulut değil lokal hızda çalışır.',
    faqs: [
      { q: 'Kablolama yenilemek için ofis ne kadar kapalı?', a: 'Aşamalı geçiş: hafta sonları 2 masa, sonra 4 masa. 20 kişilik ofis 3-4 hafta sonu işini bitiriyor. Üretim devam ediyor, sadece bölümsel kesintiler.' },
      { q: 'Synology FS3410 aşırı değil mi 30 kişi için?', a: 'Video prodüksiyon iş yükünde normal. 4K multicam 300-500 Mbps sürekli akış; HDD NAS bunu 20 eş zamanlı stream\'de tutmaz. FS3410 SSD pool bunu 50+ stream\'de bile karşılar.' },
      { q: 'Yeni kurulum sonrası AWS/buluta ihtiyaç olur mu?', a: 'Ajans arşivi (bitmiş projeler) için AWS S3 Glacier; aktif projeler lokalde. Hibrit mimari en ekonomik; %80 aktif proje trafik lokalde, %20 offsite.' },
    ],
  },

  kadikoy: {
    scenario: 'Kadıköy Bağdat Caddesi\'ndeki 34 kişilik hukuk bürosu, büroyu kuran ortaklardan birinin beklenmedik vefatı sonrası IT sisteminin ne olduğunu kimse bilmiyordu — şifreler, lisanslar, yedekleme prosedürü yok. r/sysadmin\'deki "small law firm lost their IT guy, now what" 2023 başlığı aynı acıyı anlatıyor. Hiç dokümantasyon olmadan sıfırdan yeniden yapılandırma: keşif → envanter → yeni kurulum, 8 haftalık proje.',
    whyHere: 'Kadıköy\'deki hukuk + muhasebe + muayenehane tipi meslek büroları "tek sorumlu" modelinde çalışır; o kişi ayrıldığında bilgi kaybı %80. Proaktif dokümantasyon + yönetilen hizmet bu riski eleyor.',
    technicalAngle: 'Forensic keşif: mevcut donanım, dosyalar, lisanslar (aktif anahtarları bulunabilenler). Paralel kurulum: Windows Server 2022 + AD + e-posta (M365 Business Premium) + UYAP entegrasyonu + FortiGate 60F + Veeam. Eski yedek diskleri okunup temiz veri yeni ortama. Tüm şifreler 1Password Business\'ta; multiple emergency kit holder.',
    faqs: [
      { q: 'Eski IT\'nin şifresi olmadan sistem açılamıyor, ne yapıyoruz?', a: 'Offline Windows password reset tool + AD restore + lisans yeniden aktivasyon (Microsoft Customer Support ile). Ağır olanlar DPAPI şifreli Outlook PST; bunlar forensik firmasıyla birlikte.' },
      { q: 'KVKK denetimi öncesi boşluk doldurmak mümkün mü?', a: 'Dokümantasyon + teknik tedbir matrisi + veri envanteri yazılı olarak oluşturuluyor. Geçmiş süreç mumu için "düzeltici aksiyon planı" ve denetçiye şeffaf iletişim tercih edilir.' },
      { q: 'Yeni sistem dokümantasyonu kaç kişi bilsin?', a: 'En az 2 ortak + yönetilen IT hizmetimiz. Emergency kit kasada, şifreler 1Password\'de. Bir kişi ayrılınca sistem durmuyor.' },
    ],
  },

  besiktas: {
    scenario: 'Beşiktaş Akaretler\'deki 19 kişilik bir medya prodüksiyon şirketi, SIT alanında yer aldığı için kablolama izinleri Kültür Bakanlığı\'ndan sınırlı. 4K prodüksiyon için uygun altyapı yokluğu sunucu yerleştirme sorunu yaratıyor. r/sysadmin\'deki "heritage building IT infrastructure challenges" başlığı MoCA + kablosuz backhaul tercihlerini işliyor. Sıfırdan plan: MoCA 2.5 (koaksiyel üstünden ethernet) + Wi-Fi 6E + lokal düşük yoğunluklu NAS.',
    whyHere: 'Beşiktaş SIT alanı restorasyonları kablolama iznini bazen 6 ay geciktirir. Medya prodüksiyon bekleyemez; alternatif altyapı ile ofis açılmalı. MoCA + kablosuz + fiberless çözümler bölgenin uzmanlığı.',
    technicalAngle: 'MoCA 2.5 Bondix BB-200 üzerinden mevcut TV koaksiyel kabloları ethernet taşıyor (2.5 Gbps). Wi-Fi 6E Ubiquiti U7 Pro Max AP\'ler her odada. NAS merkezi değil, Synology BeeStation gibi küçük dağıtık. Bulut hibrit: proje arşivi Backblaze B2, aktif NAS lokalde. Bakanlık onayı beklenmeden altyapı çalışır.',
    faqs: [
      { q: 'MoCA koaksiyel kablodan ethernet çekmek güvenlik bakımından?', a: 'MoCA WPA2 benzeri şifreleme ile; iç ağ trafiği tamamen şifreli. Apartman ortak koaksiyelinden geldiğinden izole bir şebeke için MoCA privacy mode aktif olmalı.' },
      { q: 'SIT alanında deniz tuzu antenler ve switch\'leri etkiler mi?', a: 'Evet — pasif donanım 3-5 yıl sonra oksidasyon. IP54+ açık hava AP\'ler veya kapalı rack + silica gel tavsiye. Boğaz cepheli binalarda bu rutin bakım.' },
      { q: 'Kültür Bakanlığı\'na IT altyapı için ayrı onay gerekir mi?', a: 'Dış cephede kablo görünmedikçe iç kablolamada izin gerekmez. MoCA koaksiyel + kablosuz iç AP\'ler fiziksel değişiklik yapmaz; bakanlık onayı genelde aranmıyor.' },
    ],
  },

  beyoglu: {
    scenario: 'Beyoğlu İstiklal\'deki 17 kişilik kreatif ajans, şirket yapısı bir İngiliz grup tarafından satın alındığı için UK Data Protection Act + KVKK uyumu gerekti. Mevcut "ortak MacBook\'lar, herkes admin" senaryosu global denetimi geçmiyor. r/msp "creative agency acquired by enterprise, needs IT maturity" tartışması aynı dönüşümü. Tek çatı kurulum: Jamf Pro + JumpCloud + Google Workspace Business Plus + Lulu Endpoint Protection.',
    whyHere: 'Beyoğlu kreatif + STK + co-working karması satın alma + franchise ikinci kuşak senaryolarını doğuruyor. IT olgunluğu satın alanın istediği standartta olmalı; greenfield refactor bunu hızlandırır.',
    technicalAngle: 'Jamf Pro MDM Mac filosunu yönetir; JumpCloud ana directory (AD alternatifi, cross-platform). Google Workspace SSO her şeyin önünde. Lulu Endpoint Protection + Santa (binary allowlisting) malware/ransomware koruma. Proje dosyaları Google Shared Drives + Frame.io; bulut-first ama audit trail var.',
    faqs: [
      { q: 'JumpCloud vs. Azure AD kreatif ajans için hangisi?', a: 'JumpCloud Mac ağırlıklı ortamda kazanır (Mac için native, cross-platform). Azure AD Microsoft stack\'e daha iyi entegre. Kreatif ajans için JumpCloud genelde daha uyumlu.' },
      { q: 'Freelancer hesapları uyumlulukta nasıl yönetiliyor?', a: 'JumpCloud "contractor" groups + Google Guest access + Jamf Pro smart groups. 30-60 gün TTL, otomatik expire. Denetçi "access review" istediğinde log + policy hazır.' },
      { q: 'Mac Studio vs. MacBook Pro kreatif ajans için?', a: 'Editör/yönetici MacBook Pro (mobilite); 3D + motion graphics uzmanı Mac Studio (güç). Karma kullanım normal; Jamf her ikisini de aynı politikayla yönetir.' },
    ],
  },

  bakirkoy: {
    scenario: 'Bakırköy Ataköy\'deki 48 kişilik bir otel zinciri merkez ofisi, 3 otel lokasyonunun PMS + muhasebe + kamera altyapısını konsolide etti. Her otel farklı PMS (Mews, Protel, Fidelio) kullanıyordu; tek grup raporlaması imkansız. Spiceworks\'teki "hotel chain PMS consolidation migration" 2024 başlığı Mews\'e geçiş önerdi — iki yıllık projenin başlangıcı. IT tarafında: tüm lokasyonlar için tek Mews + Meraki network + PCI-DSS uyum.',
    whyHere: 'Bakırköy otel/kongre + hukuk + sahil hizmetleri karması, çoklu lokasyon konsolidasyon projelerinin tipik olduğu bölge. Sıfırdan kurulum grup standardını belirliyor.',
    technicalAngle: 'Mews PMS 3 otelde paralel deployment + eski sistemlerden veri import. Merkezi muhasebe (Logo Tiger merkez ofiste). Meraki MX67 her otelde + full-mesh VPN. PCI-DSS SAQ-B için POS ayrı VLAN. CCTV Hikvision ANPR kapıda + merkezi NVR merkez ofiste.',
    faqs: [
      { q: 'PMS migrasyonunda rezervasyon kaybı olabilir mi?', a: 'Hayır — eski PMS\'ten Mews\'e API üzerinden canlı sync 1-2 hafta paralel çalışır. Cutover gecesinde rezervasyonlar donuyor sonra aktarılıyor. Müşteri etkisi sıfır.' },
      { q: 'PCI-DSS uyum için POS ayrıştırması ne kadar sürer?', a: 'POS cihazlarının ayrı VLAN\'a taşınması + segmentation validation 2-3 gün teknik iş. Asıl iş SAQ-B dokümantasyonu (8-10 sayfa); biz yazıp otel imzalıyor.' },
      { q: '3 otelin kamera kayıtlarını merkezden izlemek bant genişliği yoracak mı?', a: 'Canlı izleme değil, olay üzerine. Kayıt lokalde (her otel NVR) + merkeze sadece search indexi + önemli olay clip\'leri replike. Günlük bant genişliği ~2-5 GB, manageable.' },
    ],
  },

  bahcelievler: {
    scenario: 'Bahçelievler Basın Ekspres\'teki 56 kişilik bir tekstil ihracat firması, 40 yaşında aile şirketi; ikinci kuşak dijitalleşme kararı verdi. Halihazırda: Excel sipariş takibi, WhatsApp kataloglar, kişisel Gmail. Spiceworks\'teki "small exporter going digital, full stack" 2024 başlığı ERP + B2B portal + EDI entegrasyonu adımlarını gösteriyor. Proje: Logo Tiger + Mikro Fly + B2B Cloudflare portal + DHL/Aras EDI entegrasyonu — 8 hafta.',
    whyHere: 'Bahçelievler tekstil + kuyumcu + toptan ihracat yoğunluğu dijitalleşme geçişi yaşayan firmaları barındırır. Geçiş planı ihracat operasyonlarını aksatmamalı; paralel çalışma şart.',
    technicalAngle: 'Logo Tiger Enterprise ERP + Mikro Fly Cloud muhasebe + Logo Tiger üzerinden Cloudflare Access ile B2B müşteri portalı. DHL/Aras EDI API entegrasyonu sipariş→fatura→konşimento otomatik akış. Yabancı müşterilere Cloudflare Tunnel üzerinden Türkçe/İngilizce portal. Showroom Wi-Fi + POS ayrı VLAN.',
    faqs: [
      { q: 'Aile şirketi Excel\'den geçiş direnç gösteriyor — eğitim nasıl?', a: 'Paralel 3 ay: Excel devam ederken yeni sistemde giriş. Her hafta 2 saatlik eğitim; yaşlı personel için "yeni sistem Excel benzeri görünüyor" temasını vurguluyor.' },
      { q: 'İhracat müşteri yabancıysa ERP Türkçe olmalı mı?', a: 'Logo Tiger multi-language; müşteri portalı müşteri dili, iç ekrana Türkçe. Türkçe-İngilizce-Arapça tek tenant\'ta.' },
      { q: 'DHL/Aras EDI API değişikliklerini biz mi takip ediyoruz?', a: 'Evet — API değişikliğinde entegrasyon güncellemesi yönetilen hizmet kapsamında. Müşteri operasyon sürekli, arkaplan development görünmüyor.' },
    ],
  },

  uskudar: {
    scenario: 'Üsküdar Bağlarbaşı\'daki 140 kişilik bir vakıf üniversitesi, ayrılan IT direktörünün ardından altyapı durumu belirsiz. Active Directory 2008 R2, ESX 5.5, backup test edilmemiş yıllardır. r/sysadmin "university inherited 10-year-old infrastructure, full modernization" 2024 tartışması. 6 aylık planlı yenileme: Azure AD hybrid + vSphere 8 upgrade + Veeam + FortiGate.',
    whyHere: 'Üsküdar vakıf üniversiteleri + devlet kurumu + özel hastane karması, eski altyapı + çok kullanıcı + sıkı bütçe. Yenileme dönem sonu + yaz tatili + düşük kullanım pencerelerinde aşamalı yapılmalı.',
    technicalAngle: 'Faz 1 (yaz tatili): vSphere 5.5 → 8.0 upgrade, AD 2008 → 2022. Faz 2 (dönem başı): Azure AD Connect + M365 A5 (eğitim lisans). Faz 3: FortiGate 600F + kampus Wi-Fi (Aruba CX 6200F). Faz 4: Veeam + Azure Blob + immutable. 6 ay sonunda modern, audit-ready altyapı.',
    faqs: [
      { q: '140 kullanıcı dönem başında aynı anda yeni sisteme nasıl geçer?', a: 'Aşamalı: önce 20-30 admin personel (yaz tatili). Öğretim üyeleri Eylül\'de. Öğrenciler Ekim. Hiçbir hafta 100+ kullanıcı geçişi yok; troubleshoot sürdürülebilir.' },
      { q: 'YÖK dijital onay sistemleri eski AD ile çalışıyor — geçişte bozulur mu?', a: 'YÖK, MEB entegrasyonları SAML üzerinden; AD versiyonu değil SAML IDP kritik. Azure AD SAML 2.0 desteği tam; YÖK raporlamasında kesinti yok.' },
      { q: '6 ay boyunca hibrit bir ortam — güvenlik?', a: 'Eski + yeni birlikte; Fortinet segmentation ile eski sistemi izolasyonlu. Saldırı yüzeyi risk olarak kabul; aşamayı mümkün olduğunca hızlandırıyoruz.' },
    ],
  },

  sariyer: {
    scenario: 'Sarıyer İstinye\'deki 11 kişilik bir butik otel grubu 2 yeni lokasyon ekledi. Mevcut tek otel PMS\'i (Cloudbeds) grup için yetersiz. r/hospitalityit "boutique to group transition IT" tartışmaları centralized vs. decentralized PMS tercihi gösteriyor. Grup kurulum: Mews Group Tools + merkezi muhasebe + her otelin lokal cihazları.',
    whyHere: 'Sarıyer butik otel + home office + uluslararası okul karışımı lüks niş iş profili. Her otel küçük ama grup standardı korunmalı; centralized fakat esnek bir mimari gerekir.',
    technicalAngle: 'Mews Group tenant; her otel sub-tenant. Merkez ofiste Logo Tiger + grup muhasebesi. Her otelde Meraki MX67 + Ubiquiti APs (güç: 5GE uplink). Starlink + fiber hibrit (Boğaz hattı fiber değişken). Revenue management tool (IDeaS, Duetto) grup verisine bakıyor. Merkez pazarlama channel manager SiteMinder üzerinden Booking/Expedia/Agoda.',
    faqs: [
      { q: 'Cloudbeds\'ten Mews\'e rezervasyon geçmişi taşır mı?', a: 'Cloudbeds export + Mews import API\'si. Geçmiş veri (fatura, müşteri profili, rezervasyon) 95%+ taşınır. Kalan manuel düzeltme 1-2 gün iş.' },
      { q: 'Yeni otelde fiber yok — açılışa yetişir mi?', a: 'Geçici Starlink Business (7-14 gün kurulum) + 5G failover. Fiber gelene kadar (3-8 ay) kesintisiz çalışır. Ofis öncesi kurulum mümkün.' },
      { q: 'Revenue management toolları küçük otel için gereksiz mi?', a: 'IDeaS enterprise pahalı; Duetto Scholar/Lite küçük bütiklere özel. Grup düzeyinde +%15-25 gelir artışı yaygın; yatırım kısa sürede kendini amorti ediyor.' },
    ],
  },

  umraniye: {
    scenario: 'Ümraniye Dudullu OSB\'deki 85 kişilik bir plastik enjeksiyon fabrikası 32 yaşında; ERP Netsis 3 + Windows XP embedded CNC kontrolcüleri + ofis tarafında workgroup. Üretim ikinci kuşak "Endüstri 4.0 bütçesi" ile tüm IT + OT\'yi yeniledi. r/sysadmin "manufacturing company full overhaul including OT" 2024 tartışması 4-6 aylık iki katmanlı geçiş işaret eder. Proje: IT 6 hafta, OT 3-4 ay.',
    whyHere: 'Ümraniye OSB\'lerde ana dijital dönüşüm dalgası 2024-2025\'te. Eski Netsis + XP + workgroup kombosu artık sürdürülebilir değil; tek parça değişim üretimi durdurur, aşamalı düşünmek gerekir.',
    technicalAngle: 'IT: Windows Server 2022 + AD + M365 Business Premium + FortiGate 100F + Veeam. Netsis 3 → Netsis 9 upgrade. OT: Siemens SCALANCE endüstriyel switch + OT/IT DMZ + OPC UA server + MES (Autopilot veya IBase) yeni kurulum. Vardiya bölünerek cutover; üretim hiç durmaz.',
    faqs: [
      { q: 'Netsis 3\'ten 9\'a upgrade verileri kaybeder mi?', a: 'Netsis resmi migration path\'i; test ortamda 2-3 hafta kontrollü geçiş. Eski raporlar, stok, fatura arşivi 100% taşınır. Yeni modüller (e-İrsaliye, e-SMM) açılır.' },
      { q: 'OT/IT entegrasyonu IEC 62443 sertifikasyonu şart mı?', a: 'Otomotiv/enerji tedarikçisi değilseniz sertifikasyon isteğe bağlı. Ancak kontrolleri uygulamak (Purdue model, data diode, audit trail) iyi uygulama. Tedarikçi denetiminde soruluyor.' },
      { q: 'Üretim vardiyası 7/24 — bakım penceresi hiç yok, nasıl yapıyoruz?', a: 'Vardiya değişim saatlerinde (07:00, 15:00, 23:00) 15-20 dk mikro-pencere. Cutover\'ı bu pencerelere bölüyoruz; tek seferde değil 4-5 mini operasyon.' },
    ],
  },

  tuzla: {
    scenario: 'Tuzla kimya OSB\'deki 165 kişilik bir özel kimya üreticisi 2024\'te ISO 27001 + IEC 62443-4-2 ikili sertifikasyon kararı aldı. Mevcut IT altyapısı standart KOBİ seviyesi, OT tarafı eski Siemens S7-300 + PCS7 + Windows 2003. ISA Secure + pharmaceuticaltalk tartışmaları 12-18 aylık "IT+OT+Sertifika" projesini gösteriyor. Sıfırdan greenfield: 12 aylık plan.',
    whyHere: 'Tuzla kimya + tersane + ağır sanayi IEC 62443 + ATEX + ISO uyumu denetimli işletme gereklilikleri. Yenileme sertifikasyonla birlikte planlanır; tek başına IT modernizasyonu regülatör gözünde yetersiz.',
    technicalAngle: 'IT: 3 aylık — Windows Server 2022 + AD + M365 E5 + Fortinet FortiGate + Azure Sentinel SIEM. OT: 6 aylık — Siemens SCALANCE + PCS 7 V9.1 + data diode + OPC UA + Historian (AVEVA). Sertifikasyon: 3 aylık audit + evidence collection. 12 ay toplam. Sertifikasyon organ (DNV/SGS/Bureau Veritas) ile paralel çalışma.',
    faqs: [
      { q: 'PCS7 V9.1 upgrade kontrol noktalarını sıfırlar mı?', a: 'Siemens resmi migration path; PLC programları import edilir, HMI ekranları revize. Üretim formülleri (batch) + reçeteler tek seferde taşınır, 2-3 gün paralel test.' },
      { q: 'IEC 62443-4-2 için component level sertifikasyon gerekli mi?', a: 'System level 3-3 çoğu durumda yeterli; component level (4-2) vendor\'ın sorumluluğu (Siemens, Rockwell). Firma olarak sistem level uyum belgeli olunca yeterli.' },
      { q: '12 aylık proje maliyeti kabaca ne?', a: 'Donanım + lisans (Fortinet, M365 E5, PCS7, Sentinel) ₺2.5-4M, işçilik ₺800k-1.5M, sertifikasyon organ ₺300-500k. Toplam ₺3.5-6M; orta ölçek kimya için 2-3 yıl amortizasyon.' },
    ],
  },

  pendik: {
    scenario: 'Pendik Kurtköy\'deki 95 kişilik kargo şirketi 15 yıl önce kurulmuş; WMS (Warehouse Management) custom VB6 uygulaması, 120 el terminali Windows Mobile 6.5 CE. Microsoft 2020\'de Windows Mobile desteğini bitirdi, donanım sağlayıcı Zebra yedek parça üretmeyi durdurdu. r/sysadmin "legacy WMS + Windows Mobile end of life" başlığı Android migration yolunu gösteriyor. 4 aylık projede tüm WMS + terminal yenileme.',
    whyHere: 'Pendik havalimanı + kargo yoğunluğunda legacy donanım ömrü sektörü zorluyor. Windows Mobile gibi EOL teknoloji peak dönemde arıza = çöken operasyon. Planlı yenileme sezon dışı önem.',
    technicalAngle: 'WMS: custom VB6 → SAP EWM veya LogiPro (bulut). Terminal: Zebra TC26 Android 11 (Android enterprise). WMS → Android migration için intermediate API layer + kullanıcı eğitimi 2 hafta. FortiGate + WireGuard tablet VPN + Intune/Samsung Knox MDM. Black Friday öncesi tam stabil.',
    faqs: [
      { q: 'Custom VB6 WMS\'imizdeki özelleştirmeler kaybolur mu?', a: 'SAP EWM\'de standart modüller çoğunu karşılar; custom business logic ABAP\'a taşınır. Ortalama %70 standart, %30 custom. Custom kısım 2-3 aylık development.' },
      { q: 'Windows Mobile terminaller geçişte 2-3 hafta paralel çalışabilir mi?', a: 'Evet — iki WMS paralel; yeni terminal Android, eski Windows Mobile. Depoda bölümlü çalışma. Cutover gecesinde final senkron, eski terminaller emeklilik.' },
      { q: 'Peak dönem öncesi 4 ay yeterli mi?', a: 'Mayıs-Eylül greenfield ideal. Ekim\'de stabil, Kasım Black Friday\'e rodaj tamamlanır. Daha sıkı takvim (3 ay) Nisan\'a çekilmeli.' },
    ],
  },

  bagcilar: {
    scenario: 'Bağcılar Mahmutbey\'deki 32 kişilik bir matbaa, 28 yıllık aile şirketi; prepress Heidelberg Prinect CS 4 + baskı makinesi Komori + Xerox dijital. Prepress istasyonu Windows 7 hala; Heidelberg 2024\'te CS 6 upgrade zorunluluğu getirdi. Graphic Arts Tech Foundation forumlarındaki "Prinect major version upgrade" tartışmaları altyapı yenilemeyi zorunlu kılıyor. 3 aylık proje.',
    whyHere: 'Bağcılar matbaa + tekstil + küçük üretim, legacy endüstriyel yazılım ömrü nedeniyle periyodik yenileme ihtiyacı. Heidelberg gibi vendor zorlaması olduğunda hızlı reaksiyon kritik.',
    technicalAngle: 'Heidelberg Prinect CS 4 → CS 6 upgrade (Windows Server 2019 zorunlu). Prepress hardware yenileme (HP Z6 G5 workstation). Baskı makinesi JDF/CIP3 workflow Meraki switch + 10 GbE. Xerox dijital için ayrı VLAN. Tekstil tarafında ERP Logo Tiger ile entegrasyon.',
    faqs: [
      { q: 'CS 6 upgrade müşteri dosyalarını kabul etmeye devam eder mi?', a: 'Heidelberg 100% geriye dönük uyumluluk; CS 4 jobları CS 6\'da açılır. Müşteri PDF/X-4 dosyaları değişmez.' },
      { q: '10 GbE kablolama + switch maliyeti ne kadar?', a: 'Cat6A (zaten gerekir) + Meraki MS355-48X (10 GbE access) ~₺280-400k. Ajans tarafına göre matbaa için gerekli; 4K preview + büyük PDF transferi bunu gerekli kılıyor.' },
      { q: 'Toz ortamında yeni donanım ömrü?', a: '3 ayda bir basınçlı hava temizliği + IP30 üstü switch kasası. Matbaa ortamında HP Z6 aktif soğutmalı filtre değişimi 6 ayda bir.' },
    ],
  },

  gunesli: {
    scenario: 'Güneşli Basın Ekspres\'teki 82 kişilik TV yayın merkezi ("regional broadcaster") 2024\'te IP-based production (SMPTE ST 2110) geçişi aldı. Mevcut SDI routing matrix 12 yaşında; baseband kablolama. Broadcasting forums + Broadcast Bridge\'deki "SDI to ST 2110 transition broadcaster" tartışmaları 18-24 aylık projeler gösteriyor. İlk 6 ay: IT + network altyapı greenfield.',
    whyHere: 'Güneşli TV yayın + e-ticaret fulfillment karması yüksek bant genişliği + PTP precision time + 7/24 kesintisiz altyapı gerektirir. IP-based production geçişi bölge için sektörel dönüşüm.',
    technicalAngle: 'Arista 7060X3 100GbE spine-leaf + PTP boundary clock. Signal routing: Imagine Magellan + DashBoard. Production asset: Avid MediaCentral + Nexis. Üç paralel network: production (ST 2110), office (standart), misafir (Wi-Fi). ISL lisanslama PTP için kritik.',
    faqs: [
      { q: 'SDI → ST 2110 geçişinde canlı yayın kesintisi?', a: 'Paralel işletim 6-8 ay. Yeni proje ST 2110\'da, arşiv/eski SDI\'da. Canlı yayın standart günden ilk gün ST 2110; kesinti sıfır.' },
      { q: '100GbE maliyeti ne kadar?', a: 'Arista 7060X3 leaf switch ~₺200-300k/adet; 4-6 switch gerekli. Fiber modüller + kablolama ₺150-250k. Toplam ₺1-2M altyapı; 10 yıllık amortizasyon.' },
      { q: 'PTP master clock arızalanırsa?', a: 'PTP yedekli (iki master); birincisi fail olunca failover 1 frame altında. Grandmaster clock GPS receiver + holdover oscillator; tek master yıllar sonra arıza verir.' },
    ],
  },

  esenyurt: {
    scenario: 'Esenyurt Kıraç\'taki 38 kişilik bir beyaz eşya toptan satış firması, ikinci kuşak devrinde aile şirketinden "kurumsal" yapıya geçiş. 4 bayi + merkez + Excel\'siz çalışmak istedi. Spiceworks "family business formalization IT" başlığı Logo Tiger + mobil saha + B2B portal kombosunu öneriyor. 6 hafta greenfield.',
    whyHere: 'Esenyurt hızlı büyüyen KOBİ profili, aile şirketi→kurumsal geçiş yoğunluğunu besler. Greenfield kurulum büyüme trendine cevap; 20 kişiden 60\'a çıkarken IT ayak uydurmalı.',
    technicalAngle: 'Logo Tiger Enterprise + Logo Mobil Saha + Logo B2B Cloud Portal. FortiGate 60F + Cat6A kablolama + Ubiquiti network. M365 Business Premium + OneDrive. Bayiler Meraki Z3 (kablosuz VPN gateway) + tablet POS. 6 haftada tam ekosistem.',
    faqs: [
      { q: 'Kıraç sanayi sitesi paylaşımlı internet yeterli mi?', a: 'Hayır — ikinci kurumsal fiber (TT veya Turknet) şart. Paylaşımlı hat düğün sezonunda yavaşlıyor; B2B portal için müşteri kaybı riski.' },
      { q: 'Mobil saha uygulaması teknisyen internet yoksa nasıl?', a: 'Logo Mobil Saha offline mode; teknisyen çalışmaya devam eder, network gelince senkron. Saha ziyareti kayboluşu mümkün değil.' },
      { q: 'Aile şirketi genç nesil + yaşlı nesil uyum?', a: 'Aşamalı eğitim; yaşlı nesil Excel + Logo paralel 3 ay, sonra sadece Logo. Genç nesil ilk günden direkt. Direnç normal, yönetim desteğiyle 6 ayda stabil.' },
    ],
  },

  sancaktepe: {
    scenario: 'Sancaktepe Samandıra\'daki 41 kişilik gıda işleme tesisi FSSC 22000 + HACCP sertifikalı; mevcut kayıt sistemi kağıt + Excel. Denetçi "dijital geriye dönüşümsüz kayıt" talep etti. Food safety tech forums "HACCP paperless transformation" tartışmaları Validated digital system kurulumunu işliyor. 3 aylık greenfield + 2 aylık uyum.',
    whyHere: 'Sancaktepe gıda işleme + oto sanayi karması, sertifikasyonlu işletmeler. Kağıt→dijital geçiş regülatör baskısıyla; greenfield kurulum sertifikasyon yenilemesiyle birlikte planlanmalı.',
    technicalAngle: 'SafetyChain FoodLogiQ veya TraceGains HACCP digital platform + lokal edge gateway (Siemens IOT2050). Validated system: change control + audit trail + e-signature. M365 + SharePoint HACCP dökümanları. Fortinet + FortiGate + immutable log.',
    faqs: [
      { q: 'SafetyChain aylık maliyeti ne kadar?', a: 'Kullanıcı/ay ~$50-80; 40 kişilik tesis ~$2k/ay. HACCP kağıt üzerinde denetim hatası olursa bir defa bile buna denk gelir.' },
      { q: 'Soğuk depo sensörleri SafetyChain\'e nasıl bağlanıyor?', a: 'Siemens IOT2050 edge gateway HACCP Logger\'dan veri çekip SafetyChain API\'ye gönderir. Kesintide lokal queue + senkron. Denetçi sürekli veri görür.' },
      { q: 'FSSC 22000 yeniden denetimi ne zaman?', a: 'Yıllık gözetim + 3 yıllık yeniden sertifikasyon. Geçiş projesini 2-4 ay önceden bitirip denetime hazır olmalı. Acil mod denetçi gözünde red sebebi.' },
    ],
  },

  sultanbeyli: {
    scenario: 'Sultanbeyli\'deki 22 kişilik mobilya imalat atölyesi, Biesse CNC + siparişe özel üretim; siparişler kağıtla alınıyor, CNC operatör manuel program seçiyor. 2024\'te büyük bir perakende zinciri ("IKEA benzeri") B2B tedarikçi olmak isteyince EDI + tam dijital takip zorunluluğu. r/cnc + Spiceworks "small cnc shop to EDI integration" başlıkları 4-6 ay projeler gösteriyor.',
    whyHere: 'Sultanbeyli mobilya + inşaat atölyelerinde büyük B2B müşteriyle anlaşma dijitalleşmeyi tetikler. Greenfield kurulum bu fırsatı kaçırmadan.',
    technicalAngle: 'Logo Tiger Enterprise + custom Biesse CNC entegrasyonu (CSV/XML transfer). EDI için GS1 EDI hub (Elemica veya SPS Commerce). Üretim takip tablet (Android + WebApp). FortiGate 40F + Cat6 kablolama + Ubiquiti. Dönem dönem 3D tasarım için NVIDIA workstation + TeamViewer Tensor uzaktan destek.',
    faqs: [
      { q: 'Biesse\'e XML nasıl gönderiliyor?', a: 'Biesse Works yazılımı XML import destekler; biz Logo\'dan XML üreten export script\'i yazıyoruz. Her sipariş sonrası CNC\'ye otomatik düşüyor, operatör kontrol edip çalıştırıyor.' },
      { q: 'IKEA gibi müşteri EDI\'si standart mı?', a: 'Her büyük retailer farklı EDI standartı (EDIFACT, ANSI X12). SPS Commerce veya Elemica gibi hub\'lar çevirici rol oynar; tek entegrasyon, çoklu retailer.' },
      { q: 'Eski XP CNC makineler ağa alınabilir mi?', a: 'XP\'yi internete açmıyoruz; izole VLAN + sadece Logo ERP ile konuşacak firewall kuralı. XP\'nin güvenlik riski sınırlı.' },
    ],
  },

  maltepe: {
    scenario: 'Maltepe Altıntepe\'deki 33 kişilik özel eğitim kurumu, K12 öğretim + kreş + yabancı dil kursu karma yapı. Mevcut: her birim ayrı web sitesi, ayrı CRM, müşteri iletişimi WhatsApp. Spiceworks "education group IT consolidation" 2024 tartışmaları single SIS + marketing automation kombinasyonunu öneriyor. 8 haftalık kurulum.',
    whyHere: 'Maltepe eğitim + sağlık + perakende karması, çoklu birim konsolidasyon projelerinin tipik olduğu bölge. Single source of truth + KVKK veri envanteri greenfield\'da ilk günden doğru kurulabilir.',
    technicalAngle: 'K12Net Education (SIS) + HubSpot Marketing Hub + tek birleşik web (WordPress + Elementor). Veli portalı K12Net ile entegre; Zoom/Google Meet canlı ders. Google Workspace Education Plus + ChromeOS Management öğrenci cihazları. Backup: Synology C2 + immutable.',
    faqs: [
      { q: 'K12Net neden başka SIS değil?', a: 'Türkiye pazarında K12Net en yaygın; MEB entegrasyonları kullanıma hazır. Uluslararası SIS (PowerSchool) Türkiye özel ihtiyaçlar için adapt gerektiriyor.' },
      { q: 'Veli WhatsApp iletişimini tamamen kapatabilir miyiz?', a: 'Kapatmıyoruz; mevcut alışkanlık. Ama resmi bildirimler (notlar, faturalama) K12Net veli portalı + e-posta. WhatsApp günlük iletişim için kalıyor.' },
      { q: 'KVKK öğrenci velisi açık rızası nasıl alınıyor?', a: 'K12Net\'te açık rıza modülü + imzalı PDF. Kurslara kayıt anında; kayıt form + rıza form aynı süreç. Veri envanteri ve silme politikası danışmanlıkla birlikte.' },
    ],
  },

  kartal: {
    scenario: 'Kartal Soğanlık\'taki 76 kişilik özel hastane HIMSS EMRAM Stage 5\'e çıkmak istedi. Mevcut HBYS Probel; ancak tıbbi cihaz (MRI, CT, USG) DICOM entegrasyonu eksik, laboratuvar LIS yok. HIMSS + r/healthit tartışmaları Stage 5\'e çıkmanın altyapı gereksinimini anlatıyor. 9 aylık proje: HBYS modernizasyon + LIS + PACS + DICOM ağı.',
    whyHere: 'Kartal hastane + sağlık karması HIMSS + JCI gibi uluslararası sertifikalarla ölçülüyor. Greenfield kurulum akreditasyon hedefinde; teknoloji + süreç birlikte dönüşür.',
    technicalAngle: 'Probel HBYS yeni sürüm + LIS (Roche cobas, Abbott Alinity) + PACS (Carestream, Philips IntelliSpace). Tıbbi cihaz için HL7 + DICOM integration engine (Mirth Connect). FortiGate 600F + 10 GbE omurga + cihaz VLAN\'ları. M365 E5 + Intune Healthcare compliance.',
    faqs: [
      { q: 'HIMSS Stage 5 için EMR doluluk %80 nasıl ölçülüyor?', a: 'Elektronik order entry + clinical documentation + medication administration %80+ digital. Hekim tablet/PC + kağıt minimum. Süreç değişikliği + hekim eğitimi 6 ay sürer.' },
      { q: 'MRI/CT cihazları eski; DICOM protokolü destekler mi?', a: 'DICOM 3.0 standartı 1993\'te kabul edildi; cihaz 25 yaşında bile destekler. DICOM gateway eski cihazları modern PACS\'a köprüler. Cihaz değişikliği çoğunda gereksiz.' },
      { q: 'KVKK hasta verisi + HIMSS uyumu çelişir mi?', a: 'KVKK veri koruma, HIMSS clinical digital maturity; farklı eksenler. Birleştirmek: role-based access + audit trail + anonymization. İki framework paralel uygulanabilir.' },
    ],
  },

  cekmekoy: {
    scenario: 'Çekmeköy Alemdağ\'daki 19 kişilik yazılım girişimi 2024\'te A serisi yatırım aldı; yatırımcı SOC 2 Type I hazırlığını 6 ay içinde istedi. Kurucu CTO kod yazarken IT\'yi kendi kurmuştu: home router, Google Drive ortak klasör, AWS root account herkese open. r/devops + r/startup "post-funding SOC 2 greenfield" klasik senaryo.',
    whyHere: 'Çekmeköy yazılım girişim ekosistemi yatırım sonrası hızlı kurumsallaşma evresinde. SOC 2 6 ayda hazırlamak agresif; altyapı ilk günden doğru kurulmalı.',
    technicalAngle: 'Google Workspace Enterprise + JumpCloud IdP + Jamf/Intune MDM + AWS Organizations + Control Tower + Vanta SOC 2 evidence collection. SentinelOne endpoint + AWS GuardDuty. GitHub Enterprise + Dependabot + SAST (Snyk). Drata alternatif Vanta\'dan ucuz; seçim müşteriye bağlı.',
    faqs: [
      { q: 'Vanta ya da Drata maliyeti ne?', a: 'Vanta aylık $4k-8k (çalışan sayısına göre), Drata $3k-6k. SOC 2 audit\'i external + Vanta kombinasyonu ~$50k toplam yıllık. Funding aldıktan sonra zorunlu maliyet.' },
      { q: 'Developer\'ların AWS root erişimi var — güvenli yöntem nasıl?', a: 'Root account sadece billing; tüm çalışmalar IAM Identity Center (SSO) üzerinden. Geçiş 2 hafta; root şifre sealed envelope + 2 kişi gözetiminde vault\'a.' },
      { q: 'SOC 2 Type I 6 ayda bitirilebilir mi?', a: 'Greenfield\'sa ve agresif ilerlersek evet. Kontrolleri ilk günden implementasyonlu kurup 90-120 gün evidence window + audit 60 gün. Mevcut sistemden retrofit ise 9-12 ay.' },
    ],
  },

  beykoz: {
    scenario: 'Beykoz Kavacık\'taki 24 kişilik ilaç dağıtım firması, Sağlık Bakanlığı ITS + GMP + 21 CFR Part 11 uyumluluk denetimi öncesi mevcut "Excel + manual" altyapısıyla kalamayacağını anladı. Pharmaceutical IT forums + pharmaceuticaltalk "small pharma distributor validated system" 12-18 aylık projeler gösteriyor. Hızlandırılmış 6 aylık greenfield.',
    whyHere: 'Beykoz Kavacık ilaç + sağlık teknolojisi yoğun; validated system zorunluluk. Küçük firma için bile bu framework\'ü kurmak gerekli; greenfield altyapı denetim hazırlığının yarısı.',
    technicalAngle: 'SAP Business One + GxP compliance add-on (veya Logo Tiger + validated custom extension). Validation Master Plan + IQ/OQ/PQ protokolleri. FortiGate + WireGuard + audit trail. M365 E5 + SharePoint GxP dökümantasyon. Elektronik imza (DocuSign Part 11 compliant mode).',
    faqs: [
      { q: 'Validated system greenfield\'da dokümantasyon çok mu ağır?', a: 'User requirements + design spec + installation qualification + operational qualification + performance qualification — her adım yazılı. 6 aylık projede dokümantasyon payı %30-40 emek.' },
      { q: 'FSM köprü uzaktalık ilaç firması için problem mi?', a: 'Avrupa Yakası müşteri ziyareti düzenli; saha ekibi günlük olarak FSM\'i kullanır. Uzaktan 7/24 destek + ayda 2 saha ziyareti standart.' },
      { q: 'SAP Business One yerine Logo Tiger yeterli değil mi?', a: 'Logo Tiger GxP custom extension gerektirir (~₺300-500k development). SAP Business One Pharma edition hazır; orta ölçek ilaç için direkt uygun. ROI SAP lehine.' },
    ],
  },

  beylikduzu: {
    scenario: 'Beylikdüzü TÜYAP yakınındaki 31 kişilik fuar organizasyon firması, 2025\'te ilk uluslararası fuar düzenlemeyi üstlendi (Alman Messe Frankfurt ile ortak). Alman ortağı kurumsal IT standardı isiyor: SOC 2 hazırlığı, GDPR uyumu, multi-language portal. Event Technology forums + r/eventprofs "international partnership IT requirements" benzer dönüşüm anlatır. 4 aylık greenfield.',
    whyHere: 'Beylikdüzü fuar + etkinlik firmaları TÜYAP aksında uluslararası iş fırsatları. Kurumsal yabancı ortaklık IT standartlarını yukarı çeker; greenfield hazırlık kritik.',
    technicalAngle: 'M365 Business Premium + SharePoint multi-language + Dynamics 365 Event Management. FortiGate 80F + Meraki portable AP (fuar alanı). Registration portal: Microsoft Bookings + Power Automate. GDPR uyumu: data mapping + consent management platform (OneTrust). SOC 2 Type I için Vanta.',
    faqs: [
      { q: 'Messe Frankfurt\'un IT auditi bizi kapsar mı?', a: 'Ortak venture\'da evet — vendor risk management\'ın parçası. SOC 2 Type I veya ISO 27001 sertifikası talep edilir. İlk ortaklıkta SOC 2 Type I yeterli, ikinci yıl Type II.' },
      { q: 'Dynamics 365 Event Management vs Cvent?', a: 'Cvent enterprise event management industry standardı; Dynamics 365 Microsoft stack\'e entegre. Beylikdüzü ölçeğinde Dynamics daha ekonomik. Cvent uluslararası taraf istiyor mu, kontrol edilir.' },
      { q: 'TÜYAP fuar alanında geçici IT kurulumu nasıl?', a: 'Meraki Go portatif + cellular gateway; 5 gün boyunca tek portalda stand+registration+catering. Fuar sonrası sökülür; donanım firma envanterine kalır.' },
    ],
  },

  avcilar: {
    scenario: 'Avcılar Ambarlı yakınındaki 62 kişilik bir gümrük müşaviri firması, 2024\'te yeni bir liman açıldı (konteyner kapasitesi 2 katı). Firma dijital altyapısı ağır yük için yetersiz; BİLGE entegrasyonu manuel, saha ekip kağıtla. r/logistics + IBTrader forum "customs broker digitalization" 6-9 ay projeler. Greenfield: hızlandırılmış 4 aylık plan.',
    whyHere: 'Avcılar liman + lojistik yoğunluğu hacim artışıyla dijital altyapı zorunluluğu. Gümrük müşaviri geleneksel kağıt iş akışından EDI + API\'e geçmeli; rekabet avantajı.',
    technicalAngle: 'Gümrük yazılımı: BİLGE yerel entegrasyonu + UETDS API + KGF finansman + CargoLogic. ERP: Logo Tiger veya Netsis. Saha ekibi için mobil (iPad + Logo Mobile + BILGE app). FortiGate 100F (yüksek throughput liman trafiği) + 10 GbE. S3 long-term arşiv (gümrük evrağı 10 yıl saklanmalı).',
    faqs: [
      { q: 'BİLGE API rate limit ile yüksek hacim nasıl?', a: 'API gateway + queue + exponential backoff zorunlu. 60 request/dk limit enterprise müşteride darboğaz; biz kuyruk yönetimi + priority scheduling kuruyoruz.' },
      { q: 'Liman bölgesi güvenliği BİLGE kablolamasına etki ediyor mu?', a: 'Liman iç ağı farklı; gümrük firması dış ISP\'den BİLGE\'ye. Firewall kuralları BİLGE endpoint\'e özel. Liman ağına direkt bağlantı yok.' },
      { q: 'Saha mühendisi iPad + 4G ile BILGE çalışır mı?', a: 'iPad Safari + BILGE web portal + e-imza akıllı kart adaptörü. 4G\'de de yeterli performans; offline mode yok ama kesintisiz çalışma sağlar.' },
    ],
  },

  kozyatagi: {
    scenario: 'Kozyatağı E-5 cepheli plazadaki 47 kişilik bir sigorta acentesi, SEGEM denetim öncesi 15 yıllık altyapıyı yenilemek istedi. Mevcut: Windows Server 2012 R2 (EOL), Active Directory karışık, yedek test edilmemiş. Merkezimize yürüyüş mesafesinde olması 2 hafta yoğun kurulum imkanı. Ekim 2024 SEGEM denetimi deadline\'ı.',
    whyHere: 'Kozyatağı\'nda sigorta + finans + danışmanlık firmaları denetimli sektörlerde yoğun. Kapı komşusu olmamız 2 haftalık yoğun kurulumu mümkün kılıyor; saha ekibi sabah 08:00\'den akşam 20:00\'a kadar yanıbaşlarında.',
    technicalAngle: 'Dell PowerEdge T550 + Windows Server 2022 + AD DS + Logo SegSigorta. FortiGate 60F + 5651 uyumlu log sunucu. M365 Business Premium + Intune. Veeam + NAS + Wasabi S3 (immutable). SEGEM denetçi için hazır raporlama + erişim matrisi + audit trail.',
    faqs: [
      { q: 'Logo SegSigorta migration ne kadar risk?', a: 'SEGEM uyumlu standart sigorta ERP; migration path\'i belli. 1 hafta paralel test + cutover hafta sonu. Poliçe geçmişi 100% taşınır.' },
      { q: 'SEGEM denetçisi sorularına hazır cevap nasıl?', a: 'Teknik tedbir matrisi + erişim raporu + yedek test tarihleri + son güncelleme takvimi — hepsi tek PDF\'te hazır. Denetçi geldiğinde 10 dk içinde sunabiliyoruz.' },
      { q: '2 haftada 15 yıllık altyapı yenilemek aşırı hızlı değil mi?', a: 'Genel olarak 4-6 hafta. Ama merkezimiz yakınsa ve müşteri destekleyerek mesai dışı çalışma onayı veriyorsa 2 haftada mümkün. Agresif takvim, ama sık yapıyoruz.' },
    ],
  },

  icerenkoy: {
    scenario: 'İçerenköy Quick Tower yakınındaki 18 kişilik bir dijital pazarlama ajansı, 3 yıl içinde 5\'ten 18 kişiye çıkmış; IT yerine "neyse çalışıyor" kültürü. 2024\'te Google Partner Premier statüsü için ajans Google\'dan SOC 2 veya ISO 27001 belgesi istedi. r/PPC + Google Ads forum "Partner Premier IT audit" tartışmaları greenfield upgrade\'i işliyor.',
    whyHere: 'İçerenköy dijital pazarlama firmaları kapı komşumuz; Google Partner/Meta Business Partner statüsü için teknik yenileme sık. Greenfield + sertifikasyon ikili hedefle yürütülür.',
    technicalAngle: 'Google Workspace Enterprise + JumpCloud IdP + Jamf (MacBook ajans filosu) + Vanta SOC 2. Ad platform integrations: BigQuery + Looker + Python automation. FortiGate 40F + office network. Immutable backup (Backblaze B2).',
    faqs: [
      { q: 'Google Partner için SOC 2 Type I yeterli mi?', a: 'Evet — Google Partner Premier için Type I yeterli. Advanced Partner seviyesinde Type II istenir. İlk yıl Type I, ikinci yıl observation window + Type II.' },
      { q: 'Meta Business Partner ayrı denetim?', a: 'Meta kendi Partner requirements\'ı var; SOC 2 veya eşdeğer security framework kabul ediliyor. Google ile paralel.' },
      { q: 'Kapı komşumuz olmanız sertifikasyon sürecinde avantaj mı?', a: 'Evet — Vanta setup + evidence collection sırasında 2-3 günde bir gelip "şu sistemi şöyle kuralım" pratik iteration. Uzaktan ajans için 2-3 haftalık süreç bizim için 2-3 gün.' },
    ],
  },

  kavacik: {
    scenario: 'Kavacık Veko Giz Plaza\'daki 67 kişilik ilaç firması, 2024\'te EU MDR (Medical Device Regulation) uyumu gerektiren yeni ürün lansmanı yaptı. Mevcut ERP (Microsoft Dynamics AX 2012) EU MDR UDI entegrasyonu desteklemiyor. Pharmaceutical IT + HIMSS "Dynamics AX to D365 migration pharma" 12 aylık projeler gösteriyor. Bizimki hızlandırılmış 7 ay.',
    whyHere: 'Kavacık ilaç + sağlık teknolojisi firmaları uluslararası regülasyonla yoğun; EU MDR, FDA, TGA gibi çoklu rejim. Greenfield migration sertifikasyonun önkoşulu.',
    technicalAngle: 'Microsoft Dynamics 365 Finance & Operations + Life Sciences industry module + UDI integration. EDI hub Generix. FortiGate + M365 E5 + Intune compliance (GxP). UDI database: GS1 + EUDAMED (EU), FDA UDI (US), Sağlık Bakanlığı ITS (TR).',
    faqs: [
      { q: 'Dynamics AX 2012 veri migration ne kadar risk?', a: 'Microsoft migration tool var; tablo-tablo mapping. 3-4 ay test + UAT. Ürün master + partner + sipariş historisi 100% taşınır. Özelleştirmeler (custom X++) rewrite gerektiriyor.' },
      { q: 'EU MDR UDI için Dynamics 365 yeterli mi?', a: 'Life Sciences module UDI field + EUDAMED entegrasyonu native; ekstra geliştirme yok. Türkiye ITS entegrasyonu custom (Turkish pharma partner).' },
      { q: '7 ay hızlandırılmış takvim gerçekçi mi?', a: 'Standart 12-18 ay; 7 ay için paralel çalışma + weekend cutover + 24/7 destek gerekiyor. Maliyet %30-40 daha yüksek ama sertifikasyon deadline\'ına yetişmek için tek yol.' },
    ],
  },
};
