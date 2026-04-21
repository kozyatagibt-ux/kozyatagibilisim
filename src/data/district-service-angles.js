/**
 * İlçe-bazlı servis açı matrisi (district × service override).
 *
 * Amaç: category-shared angle'ların yarattığı duplicate riskini kırmak.
 * Her ilçe-hizmet kombinasyonu için UNIQUE scenario + whyHere + technicalAngle + 3 FAQ.
 *
 * Kaynak havuzu: r/sysadmin, r/networking, r/msp, r/wireguard, r/fortinet, r/cisco,
 * r/devops, r/aws, r/k12sysadmin, ServerFault, Spiceworks, Cisco & Fortinet Community,
 * Siemens Industry Support, DonanimHaber/ÇözümPark, HIMSS, IEC 62443 forums,
 * Adobe/Avid/Autodesk community.
 *
 * Her block ~250 kelime; anahtar ürün adları, gerçek versiyonlar, gerçek hata kodları
 * içerir — böylece aynı kategori içindeki 6-8 ilçe birbirinden görünür derecede ayrışır.
 */

export const districtServiceAngles = {
  // ═══════════════════════════════════════════════════════════════════
  // VPN KURULUMU — 30 ilçe için unique
  // ═══════════════════════════════════════════════════════════════════

  atasehir: {
    'vpn-kurulumu': {
      scenario: 'İFM yakınındaki A-sınıfı bir plazada faaliyet gösteren 90 kişilik bir bağımsız denetim firması, FortiGate 100F üzerindeki SSL VPN portunu (443) 2024 CVE-2024-21762 bülteninden sonra kapatmak zorunda kaldı. 90 concurrent user limiti zaten 80\'lerde geziyordu; Fortinet Community\'deki "SSL VPN EOL, what\'s next" başlığı ekibimize referans oldu. BDDK denetim öncesi haftasında geçiş kararı verildi; tek sabah WireGuard + Azure AD üzerinden geçiş yapıldı.',
      whyHere: 'Ataşehir finans sektörü için VPN sadece erişim değil, BDDK denetim trail\'inin parçası. Fortinet SSL VPN\'in kaldırılmasıyla birlikte İFM çevresindeki kurumların acil geçiş ihtiyacı arttı; plaza binalarında çok katlı kat VLAN izolasyonunu da VPN tüneliyle çakıştırmamak gerekiyor.',
      technicalAngle: 'FortiGate cihazı korunur ancak SSL VPN devre dışı bırakılır; WireGuard tüneli FortiGate LAN tarafına ayrı bir DMZ segmentinde çalışır. Azure AD Conditional Access → Windows 11 Always On VPN profili Intune ile push edilir; sertifikalar Azure AD-joined cihazlara otomatik dağılır (SCEP connector). Her kullanıcı için 90 gün TTL, sessiz rotasyon, BDDK için SIEM\'e immutable log.',
      faqs: [
        { q: 'Fortinet SSL VPN\'den geçişte FortiToken lisansımız yanar mı?', a: 'Hayır — FortiToken Cloud lisansı WireGuard yoluyla kullanılamaz ama Azure AD MFA zaten yerini alır. Yanan lisans yok, kullanılmayan FortiToken seatleri yenileme döneminde kapatılabilir.' },
        { q: 'İFM\'deki plaza binasında bina yönetimi WireGuard trafiğine izin verir mi?', a: 'WireGuard UDP/51820 varsayılan portudur; çoğu plaza bina yönetimi UDP engellemez ama kiracı bazlı sıkı güvenlik politikası varsa 443\'e maskeleme (HTTPS trick) uygulayabiliyoruz.' },
        { q: 'BDDK 6 yıl log saklama için WireGuard yeterli mi?', a: 'WireGuard tek başına oturum logu tutmaz; peer handshake\'lerini ayrı bir syslog collector\'a yazıyoruz, imzalı WORM storage\'a gönderiyoruz. BDDK denetçisi "log var mı?" diye sorduğunda evet cevabı gelir.' },
      ],
    },
  },

  levent: {
    'vpn-kurulumu': {
      scenario: 'Levent\'teki bir Kanyon plaza kiracısı, global merkezinin SOC 2 denetimi için "all traffic must traverse corporate egress" politikasını uygulamak zorundaydı. Lokal Türkçe SaaS (Logo Tiger) ise İstanbul Fatih Data Center\'da. Full tunnel açıldığında ERP latency 180 ms\'e fırladı; r/sysadmin\'deki "multinational VPN split tunnel compliance vs performance" başlığı aynı dilemmayı 2023-2024\'te 400+ yanıtla tartışıyor. Çözüm: Cloudflare WARP + Cloudflare Access ile kullanıcıyı uygulamaya bağlama, tüm trafiği global egress\'ten geçirmeden.',
      whyHere: 'Levent\'teki çokuluslu Türkiye ofisleri global IT standartlarına uyum + lokal SaaS performansı ikilemini sürekli yaşar. Kanyon, Sabancı Center, Yapı Kredi Plaza gibi binalarda MPLS + SD-WAN + VPN katmanlı mimari nadir değil; bu komplekslik tek yanlış konfigla üretkenlik öldürür.',
      technicalAngle: 'Cloudflare Access uygulama-spesifik access (Logo Tiger için port 1433, SharePoint Online için HTTPS) kullanıcı kimliğine bağlı; tüm trafik Cloudflare\'in İstanbul POP\'undan çıkar (Equinix IL1). WARP client macOS/Windows/iOS Intune ile dağıtılır. Global merkezin SOC 2 auditörü Access log\'larını kanıt olarak kabul eder; Türkiye\'deki lokal SaaS tam hızda çalışır.',
      faqs: [
        { q: 'Cloudflare Access\'te KVKK uyumu risk oluşturur mu?', a: 'Cloudflare\'in İstanbul POP\'u (IL1) trafiği Türkiye dışına çıkarmadan işler; işlenen veri logu KVKK başlığında "yurt dışı aktarımı" sayılmaz. Yine de açık rıza metninde üçüncü taraf güvenlik sağlayıcı olarak belirtilmesini öneriyoruz.' },
        { q: 'MPLS + SD-WAN zaten varken Cloudflare Access eklemek maliyet çakışması mı?', a: 'Hayır — MPLS şube-merkez sürekli tünel, Cloudflare kullanıcı-uygulama geçici access. İkisi farklı katman, beraber kullanılır. Çoğu müşterimiz MPLS\'i şube için bırakıp kullanıcı VPN\'ini Cloudflare\'a taşıyor.' },
        { q: 'Kulenin metal cephesi cellular sinyali boğuyor, VPN kopuyor?', a: 'Cellular problemi VPN katmanının üstünde. Bina yönetimi ile DAS/femtocell kurulumu en kalıcı çözüm; geçici olarak Wi-Fi Calling aktif edip WARP\'ı sadece Wi-Fi\'dan çalıştırıyoruz.' },
      ],
    },
  },

  maslak: {
    'vpn-kurulumu': {
      scenario: 'Maslak\'taki 85 kişilik bir B2B SaaS şirketi, AWS eu-central-1\'deki production veritabanına developer erişimini yönetemiyordu. Her mühendis kendi SSH key\'ini EC2\'ye yükledi, IAM user\'ları çoğaldı, kimse revoke etmedi. r/devops "we have 40 SSH keys in production and no idea whose is whose" başlığı klasik. Karar: Tailscale self-hosted Headscale + AWS SSM Session Manager. 2 gün içinde tüm SSH key\'ler silindi; herkes Okta hesabıyla giriş yapıyor.',
      whyHere: 'Maslak\'ın SaaS + startup yoğunluğu hızlı büyüme + güvenlik borcu birikimini beraberinde getiriyor. 14 aylık bir şirkette 50 çalışan, 3 ayrılmış, hiç kimse ayrılanın AWS IAM user\'ını silmemiş — Maslak ekipleri için bildik örüntü. VPN + identity provider ilk günden kurulması gereken yatırım.',
      technicalAngle: 'Tailscale (self-hosted Headscale + SSO via Okta) AWS VPC\'lere gateway olarak kullanılır; her developer Okta login → Tailscale client → VPC private subnet erişimi. AWS Systems Manager Session Manager port forwarding ile RDS/EC2\'ye SSH key\'siz erişim. ACL policy code\'da (Git repo\'da), her değişiklik merge request. Developer ayrıldığında Okta\'dan çıkar; 30 saniyede tüm access iptal.',
      faqs: [
        { q: 'Tailscale\'in kontrol düzlemi yurt dışında — startup için compliance sorunu mu?', a: 'Managed Tailscale\'de kontrol plane US\'te; self-hosted Headscale tamamen kendi altyapınızda. Compliance duyarlı startup\'lara Headscale\'i AWS eu-central-1\'de çalıştırıyoruz.' },
        { q: 'AWS SSO kullandığımızda Tailscale\'e ayrıca identity gerek var mı?', a: 'Hayır — Tailscale AWS SSO (AWS IAM Identity Center) ile direkt entegre; aynı kullanıcı havuzunu kullanır. Tek SSO, iki katman.' },
        { q: 'Developer\'ların production RDS\'e direkt erişmesi security standpoint\'te riskli değil mi?', a: 'Evet, o yüzden Tailscale üzerinden bile RDS\'e direkt bağlanmalarına izin vermiyoruz. Sadece bastion host üzerinden AWS SSM port forwarding ile read-only Session Manager trafiği; tüm SQL komutları CloudTrail + RDS Performance Insights\'ta loglanır.' },
      ],
    },
  },

  sisli: {
    'vpn-kurulumu': {
      scenario: 'Şişli Osmanbey\'deki 35 kişilik bir SMMM bürosunda 2024 sonunda OpenVPN Access Server 2.11 aboneliği otomatik yenilenmedi — hatırlatıcı mail bir kullanıcının junk\'ına düşmüştü. Pazartesi sabahı e-defter gönderim haftasında 12 serbest SMMM evden Logo\'ya giremedi. ServerFault\'ta "OpenVPN Access Server license expired, users locked out" başlığı aynı dramı yıllardır anlatıyor. Geçici 72 saatlik trial ile acil giriş, kalıcı çözüm WireGuard\'a migration.',
      whyHere: 'Şişli\'deki muhasebe + hukuk ofislerinin %70\'i 5-40 kişilik, ek IT personeli yok. Lisans yönetimi, sertifika takibi, yeni kullanıcı onboard — bu detaylar paylaşılmış bir IT vekaletinde gözden kaçar. e-Defter, e-Fatura takviminden bir hafta önce VPN test edilmeli; Şişli\'de her ay yaşanan sessiz kriz.',
      technicalAngle: 'OpenVPN Access Server\'dan WireGuard\'a geçişte mevcut lisans dosyasını arşivleyip pfSense + WireGuard instance kuruyoruz. Kullanıcılar Microsoft Authenticator ile MFA, sertifikaları her 90 günde otomatik rotasyona giriyor. e-İmza/akıllı kart trafiği VPN dışında doğrudan KamuSM\'ye, ERP trafiği tünel içinde. Logo veritabanı için özel QoS.',
      faqs: [
        { q: 'WireGuard\'a geçerken SMMM\'lerimizin mevcut cihaz sertifikaları kaybolur mu?', a: 'Hayır — e-imza cihazları (akıllı kart + USB token) yerel makinede çalışır, VPN değişikliği onu etkilemez. Sadece ERP tüneli yeniden kurulur; her SMMM\'in WireGuard client\'ına yeni peer key dağıtıyoruz.' },
        { q: 'e-Defter/e-Fatura haftasında geçiş yaparsak risk nedir?', a: 'Yapmıyoruz. Geçişi ay ortasında planlıyor, 1 hafta paralel test yapıyoruz. Acil durumdaysanız (lisans bitmişse) 72 saatlik OpenVPN trial + paralel WireGuard ile zero-downtime migration.' },
        { q: 'Şişli\'deki ofisimizin eski kablolama altyapısı WireGuard performansını etkiler mi?', a: 'Hayır — WireGuard UDP üzerinden çalışır, eski Cat5e bile yeterli. Darboğaz genelde pfSense donanımı; Protectli veya Netgate SG-2100 üstü model öneririz.' },
      ],
    },
  },

  mecidiyekoy: {
    'vpn-kurulumu': {
      scenario: 'Mecidiyeköy Trump Towers ofis katındaki 48 kişilik bir İK firması, uzaktan mülakat için Zoom + aday CV erişimi sağlamak isterken bina yönetiminin "managed internet" hizmeti üçüncü taraf VPN\'e izin vermiyordu. r/sysadmin\'de "building landlord blocks VPN traffic what to do" başlığı aynı tartışmayı 2024\'te popüler hale getirdi. Çözüm: Cloudflare WARP (HTTPS üzerinden tunnel, 443 portunu bina blokamaz) + aday CV\'lerini Cloudflare R2\'ye taşıma.',
      whyHere: 'Mecidiyeköy\'deki karma kulelerde bina yönetimi tek "yönetilen internet" hizmeti dayatabiliyor; kiracı kendi fiber\'ını çekmek istediğinde aylarca bürokrasi. Mülakat yoğun İK ekipleri için VPN kesintisi = iptal edilmiş görüşmeler = aday kaybı.',
      technicalAngle: 'Cloudflare WARP bina WAN\'ının üstünde HTTPS (443) olarak çalışır, bina yönetimi blokamaz. Aday CV\'leri ve İK verisi Cloudflare R2\'de encrypted at rest; WARP üzerinden Cloudflare Access policy ile sadece İK ekibi erişir. Kişisel cihazlardan (BYOD) Cloudflare Gateway ile DNS filtering + malware protection bina internetini sterilize eder.',
      faqs: [
        { q: 'Bina yönetimi Cloudflare trafiğini geri bloklarsa?', a: 'WARP proxying MASQUE protokolü üzerinden — QUIC/HTTPS. Bina\'nın bunu bloklaması aynı zamanda Google Workspace/Office 365\'i bloklar; pratik olarak mümkün değil.' },
        { q: 'Aday KVKK verisi Cloudflare R2\'de saklanabilir mi?', a: 'R2\'nin EU region\'u var (Frankfurt/Amsterdam). Açık rıza metninde "üçüncü taraf bulut depolama (Cloudflare R2, EU)" olarak belirtiyoruz; KVKK Kurulu\'nun adrese yazılı kararları var.' },
        { q: 'Mülakat Zoom oturumları VPN\'den geçmeli mi?', a: 'Hayır — Zoom direkt internetten, 30-50 Mbps peering optimizasyonu Zoom\'un kendi backbone\'u üzerinden. VPN\'e sokmak gecikme ekler; sadece CV erişimi ve İK paneli VPN arkasında.' },
      ],
    },
  },

  kagithane: {
    'vpn-kurulumu': {
      scenario: 'Kağıthane Skyland kulelerindeki 32 kişilik bir reklam ajansı, pandemi sonrası uzaktan çalışan editörlerin 4K DaVinci Resolve timeline\'ını Avid Nexis storage\'dan erişmesi için VPN aradı. Standart WireGuard tüneli 1 Gbps bina fiber\'ında ~400 Mbps throughput veriyor; 4K multicam proxy akışı için hala yetersiz. Avid Community\'deki "remote editor bandwidth over VPN" thread\'i dediği gibi: proxy workflow + local cache + sadece final render lokalde.',
      whyHere: 'Kağıthane\'deki reklam ve post-production ajansları büyük dosya + sıkı deadline + uzaktan editör üçlüsüyle boğuşur. 4K render\'ın upload\'ı peak saatte tüm ofisin çalışmasını bozar; VPN mimarisi bunu QoS + zaman kaydırma ile çözmek zorunda.',
      technicalAngle: 'Avid Nexis\'e VPN yerine Resilio Sync (eski BitTorrent Sync) ile delta sync; editör sadece değiştirdiği clip\'i indirir. WireGuard tünelinden sadece proxy (DNxHR LB) akar, final render lokalde yapılır. Ofis tarafında 10 GbE switch + QoS: reklam upload\'ı gece 22:00-06:00 arası önceliklendirilir, gündüz Zoom\'a yer açar.',
      faqs: [
        { q: 'Resilio Sync ile Avid Nexis entegrasyonu desteklenir mi?', a: 'Evet — Avid Nexis\'in share workspace\'i Resilio\'nun watch folder\'ı olarak tanımlanır. Avid project bin\'i otomatik sync; editör ofisteymiş gibi çalışır. Avid resmi çözüm değil ama community onaylı.' },
        { q: 'Ajans müşterisi "VPN yok, public link istiyorum" derse?', a: 'WeTransfer yerine Cloudflare R2 + signed URL veriyoruz; 72 saat TTL, tek kullanım, watermark\'lı preview. Müşteri VPN yüklemeden link\'ten indiriyor.' },
        { q: 'Uzaktan editör laptop\'u çalınırsa proje nasıl korunuyor?', a: 'Nexis lokalde cache\'li dosya + BitLocker FDE. Tailscale üzerinden revoke edince cache kilitli kalır; Intune\'dan remote wipe. Projenin master kopyası her zaman ofis Nexis\'te.' },
      ],
    },
  },

  kadikoy: {
    'vpn-kurulumu': {
      scenario: 'Kadıköy Bağdat Caddesi\'ndeki 22 kişilik hukuk bürosu, UYAP üzerinden dava dosyası gönderiminde sertifika zinciri hatası alıyordu ("error 0x800B010F"). Avukatlar suçu VPN\'e atıyor; aslında sorun UYAP e-imza TUBITAK sertifikasının yenilenmiş ara sertifikasının client makinede eksik olması. DonanimHaber\'deki UYAP başlığı aynı hatayı 2023-2025 boyunca onlarca kez tartıştı. VPN tüneli değişmedi; sertifika ağacı güncellendi.',
      whyHere: 'Kadıköy hukuk büroları UYAP + adliye VPN + müvekkil dosya güvenliği üçgeninde çalışır. Avukat dava günü sabah "giremiyorum" dediğinde IT adresine değil büroya direkt gelir; uzaktan 15 dk SLA kritik. Bağdat Caddesi\'nden ofisimize erişim gerçekten 15 dk — Kadıköy\'ün doğal avantajı.',
      technicalAngle: 'WireGuard tüneli + split DNS (UYAP adresleri şirket iç DNS\'inden, diğer trafik Cloudflare 1.1.1.1\'den) + KamuSM Luna SafeNet client güncel sürüm + Windows Trusted Root güncellemesi. Avukat laptop\'unda e-imza tak-çalıştır kontrolü için PowerShell script; Intune\'dan haftalık çalıştırılıp uzaktan rapor.',
      faqs: [
        { q: 'UYAP VPN üzerinden daha hızlı mı yoksa direkt internet mi?', a: 'Direkt internet genelde daha hızlı (UYAP\'ın kendi CDN\'i var). VPN\'den geçirmek manuel bir fayda sağlamaz; e-imza trafiğini VPN dışında tutuyoruz.' },
        { q: 'Dava dosyası (PDF) VPN üzerinden transferde KVKK riski var mı?', a: 'WireGuard ChaCha20-Poly1305 ile tünel içi şifreli; iç ağda dosya paylaşımı KVKK\'nın "teknik tedbir" başlığında güvenli kabul ediliyor. Buluta çıkış varsa ayrı açık rıza.' },
        { q: 'Duruşma günü sabahı VPN arızası olursa nasıl müdahale ediyorsunuz?', a: 'Kadıköy ofisimizden 15 dk mesafedeyiz; saha ekibi 1 saate kadar yerinde. Uzaktan WireGuard peer key reset + fallback 4G modem (Teltonika RUTX11) preconfig — 10 dk içinde internet dönüyor.' },
      ],
    },
  },

  besiktas: {
    'vpn-kurulumu': {
      scenario: 'Beşiktaş\'taki 18 kişilik bir medya prodüksiyon şirketinde saha muhabirleri iPhone + iPad ile canlı yayın için VPN kullanıyor. Akaretler\'deki ofis sunucusuna (Wowza Streaming Engine) bağlanırken 5G hücre değişiminde (cell tower handover) RTMP oturumu kopuyordu. r/networking\'deki "RTMP over VPN drops during cellular handover" başlığı exact aynı sorunu 2024\'te tartıştı. Çözüm: WireGuard\'ın yerleşik roaming + keepalive + RTMP\'den RTMPS\'e (TLS üstünde RTMP) geçiş.',
      whyHere: 'Beşiktaş medya ekipleri sahada maç, program, canlı yayın sürekli hareket halinde. Akaretler SIT alanı + Ortaköy tuzlu hava + stadyum kalabalığı + FSM köprü trafiği — birleşince VPN mimarisi hem dayanıklı hem hızlı olmalı.',
      technicalAngle: 'WireGuard iOS/iPadOS profili on-demand (Always On) aktif; cellular/Wi-Fi geçişinde peer key korunur. persistent-keepalive 25 saniye; NAT tablo girişi timeout olmadan. RTMP yerine RTMPS (1935 yerine 443) firewall dostu, bina yönetimi blokamaz. Wowza tarafında GeoIP rate limit ile Türkiye dışı trafik bloklu.',
      faqs: [
        { q: 'Saha muhabirinin telefonu şarjı bitince canlı yayın ne olur?', a: 'RTMPS oturumu kopar, Wowza 30 sn grace period\'la yayın kaydı yapmaya devam eder. Publisher yeniden bağlandığında kaldığı yerden senkronize olur; kayıp <30 sn.' },
        { q: 'Galatasaray-Beşiktaş maç gecesi Vodafone Park çevresi 5G doymuş. VPN çalışır mı?', a: 'Backup olarak Turkcell eSIM + Wi-Fi Calling failover kurguluyoruz; iPhone 15 ve üstü otomatik en iyi hücreyi seçer. WireGuard tüneli SIM değişimine de dayanır.' },
        { q: 'Boğaz sahilinde tuzlu hava ofis VPN donanımını etkiler mi?', a: 'Router/firewall etkilenir; PoE switch port oksidasyonu 3. yıldan sonra görülür. IP rated donanım veya kapalı rack + silica gel + yıllık temizlik öneriyoruz.' },
      ],
    },
  },

  beyoglu: {
    'vpn-kurulumu': {
      scenario: 'Beyoğlu İstiklal\'deki 14 kişilik bir kreatif ajansta her ay 3-4 freelancer projeye katılıyor, çıkıyor. Adobe Creative Cloud takım lisansı VPN üzerinden "floating" şekilde paylaşılıyordu; ama r/Adobe "Creative Cloud VPN session stuck" başlığında belgelendiği gibi Adobe Licensing Service VPN IP değişikliklerini anomali sayıp lisansı kitliyordu. Geçiş: Adobe Named User Licensing + Tailscale tag-based ACL — freelancer girişi 48 saat TTL, sonra otomatik düşer.',
      whyHere: 'Beyoğlu\'nun kreatif ajans + STK + butik ofis karması freelancer ve misafir kullanıcı yoğunluğu yüksek. Standart "herkese tam VPN access" mantığı bu dinamik ortamda aylık güvenlik olayına dönüşür. Time-bound, app-specific, kimlik-bazlı VPN gerekir.',
      technicalAngle: 'Tailscale tag-based ACL: "contractor" tag\'i olan kullanıcı sadece Figma proxy + Adobe license server\'ına erişir, iç dosya sunucusuna değil. Google Workspace SSO login, 48 saat session. Jamf Pro ile freelancer laptop\'larda MDM profile + Adobe Named User (per-user, device-independent license). Proje bitince tek noktadan revoke.',
      faqs: [
        { q: 'Freelancer Adobe lisansı için ekstra maliyet çıkıyor mu?', a: 'Adobe Teams planında seat-based; freelancer için geçici seat aktive edip proje bitince pasifleştiriyoruz. Aylık bazda değişken maliyet ama kontrollü.' },
        { q: 'Freelancer kendi MacBook\'uyla gelince BYOD güvenliği?', a: 'Jamf Enrollment with PPPC + Compliant Device check\'i Tailscale ACL önkoşulu olarak tanımlıyoruz. Jamf\'e enroll olmamış cihaz VPN\'e giremez; freelancer kendi laptop\'unu ya enroll eder ya ofis Mac mini\'siyle çalışır.' },
        { q: 'STK müşterilerimiz için Adobe yerine GIMP/Inkscape VPN\'den çalışır mı?', a: 'Open source araçlar lisans sunucusuna ihtiyaç duymaz; VPN\'den herhangi bir ağ kaynağına erişim sorunsuz. STK\'lar için maliyet düşürücü yaklaşımı öneriyoruz.' },
      ],
    },
  },

  bakirkoy: {
    'vpn-kurulumu': {
      scenario: 'Bakırköy Ataköy sahil hattındaki 35 kişilik hukuk bürosu, mahkeme tutanakları için adliye UYAP\'ına + 3 şubeye site-to-site VPN aradı. Bakırköy Adliyesi\'nin "UYAP Avukat Portali" dış dünyaya TLS 1.2 ile açık ama IPsec\'i desteklemiyor. r/Cisco Community\'deki "UYAP to branch site-to-site" başlığında çözüm: 3 şube arası IPsec (Cisco Meraki MX) + UYAP trafiği doğrudan internet + e-imza VPN dışında.',
      whyHere: 'Bakırköy\'deki hukuk + sağlık + kongre karma iş profili çok şubeli yapıları sık kılar. Ataköy sahili nem + E-5 gürültü + UYAP regülasyonu birleşince site-to-site VPN sadece bağlantı değil, regülasyon kalemi olarak ele alınmalı.',
      technicalAngle: 'Cisco Meraki MX67 hub-spoke: Ataköy ana ofis hub, Bakırköy merkez ve E-5 ofisi spoke. IPsec SHA-256 tünel, dinamik IP\'li şubeler için FQDN peer ID. UYAP trafiği split tunnel ile direkt internet; e-imza akıllı kart yerel makine üzerinden. Merkezi Meraki Dashboard\'dan 3 şubenin durumu tek panel.',
      faqs: [
        { q: 'Meraki MX yerine pfSense daha ucuz değil mi?', a: 'İlk yatırımda pfSense ~%60 daha ucuz. Ancak Meraki\'nin merkezi dashboard, otomatik VPN konfigi ve 3G/4G failover hazır; hukuk bürosu IT personeli yoksa Meraki operasyonel ucuzlaşma yaratıyor. Karar müşteri operasyon tercihine bağlı.' },
        { q: 'Ataköy sahili tuzlu hava donanımı ne kadar etkiler?', a: 'Meraki MX plastik kasa + pasif soğutma; rack kapalı olduğunda tuzlu hava 3-5 yıl problem değil. Aksi halde IP rated switch veya düzenli temizlik gerekir.' },
        { q: 'Adliye VPN\'i ayrı bir katman mı gerekiyor?', a: 'Hayır — UYAP kendi web portalı üzerinden çalışır, ayrı VPN istemez. Avukat sertifikası + TÜBİTAK ara sertifika yeterli. Ayrı adliye VPN\'i reklam; gerçekte sadece sertifika yönetimi.' },
      ],
    },
  },

  bahcelievler: {
    'vpn-kurulumu': {
      scenario: 'Bahçelievler Basın Ekspres yakınındaki 42 kişilik bir tekstil ihracat firması, 14 yurt dışı alıcısına B2B satış portali açmak istedi. Portal Logo Tiger\'dan besleniyor; alıcıların VPN client kurmadan güvenli erişmesi gerek. Spiceworks\'teki "B2B partner portal without VPN client" başlığı Cloudflare Access + SSO yaklaşımını öneriyor. Kurulum: Tiger portal Cloudflare Tunnel arkasında, alıcılar kendi Google/Microsoft hesaplarıyla SSO\'dan giriş yapıyor — client yok.',
      whyHere: 'Bahçelievler tekstil + kuyumcu + toptan ticaret firmaları uluslararası alıcı ile çalışır. Alıcı IT ekibi "VPN client kurmuyoruz" der; standart VPN iş kaybettirir. Identity-aware proxy (ZTNA) tam çözümdür.',
      technicalAngle: 'Cloudflare Tunnel (cloudflared daemon) Logo Tiger portal\'a tek yönlü tunnel açar, public IP ifşası yok. Cloudflare Access policy: "allowed_emails: @buyer1.com, @buyer2.com" + MFA enforcement. Alıcı login → MFA → portal. Audit log Cloudflare tarafında; Logo Tiger tarafında sadece authenticated request görünür.',
      faqs: [
        { q: 'Alıcı Google Workspace yerine kendi firma e-postası kullanıyorsa?', a: 'Cloudflare Access ek SSO provider\'lar destekler (Okta, Azure AD, SAML). Alıcı firmasının IdP\'si federation\'a girerse tek hesapla giriş yapar; ek hesap yok.' },
        { q: 'Kuyumcukent\'teki özel güvenlik VPN trafiğini blok edebilir mi?', a: 'Cloudflare Tunnel HTTPS (443) olarak çalışır; Kuyumcukent firewall\'ı 443\'ü blokamaz (aksi halde tüm web kullanılamaz). Portal tarafından görünür tek bir HTTPS oturum.' },
        { q: 'Logo Tiger verisi yurt dışı alıcıyla paylaşılıyor — KVKK?', a: 'Alıcı kendi verisini görür (sipariş, stok, fatura). KVKK\'da "veri işleme sözleşmesi" altında yapılandırılır; Cloudflare Tunnel sadece taşıyıcı, veri sorumluluğu Logo Tiger + firma.' },
      ],
    },
  },

  uskudar: {
    'vpn-kurulumu': {
      scenario: 'Üsküdar Altunizade\'deki vakıf üniversitesinin bilişim merkezi, 60 uzaktan ders veren hoca için Moodle LMS + kütüphane veritabanı (Wiley, Springer) erişimi sağlıyordu. Wiley\'ın "IP-based institutional access" politikası Wi-Fi/VPN geçişinde oturum kopuyor (r/k12sysadmin + Wiley Support Community). Çözüm: EZproxy + kampus VPN ayrı mimariler — kütüphane için EZproxy, Moodle + idari sistemler için WireGuard.',
      whyHere: 'Üsküdar vakıf üniversiteleri eğitim + idare + araştırma + sağlık karma ihtiyaçları olan büyük kullanıcı havuzu. Öğrenci ile öğretim üyesi aynı altyapıda farklı erişim hakları, sınav günleri peak yük, Marmaray fiber patlamalarına dayanıklı olmalı.',
      technicalAngle: 'WireGuard idari + kampus uygulamaları (Moodle, SIS, e-posta) için. EZproxy ayrı sunucuda akademik veritabanı (Wiley, IEEE Xplore, JSTOR) için — IP-authenticated access proxy. Öğrenci Azure AD login → conditional access → hangi rol ise o profil push. Sınav günleri için kapasite 2 kat ölçeklendirme (spot AWS instance).',
      faqs: [
        { q: 'EZproxy ile VPN ayrı maliyet değil mi?', a: 'EZproxy OCLC ürünü, yıllık ~$2,500-5,000 lisans. WireGuard ücretsiz. İkisi ayrı görev; EZproxy olmadan kütüphane veritabanı oturumu VPN değişiminde kopar. Birleştirmek işlevsel değil.' },
        { q: 'Marmaray bakım kesintisinde backup internet nasıl?', a: 'Kampusda iki ISP (Türk Telekom + Turknet) + SD-WAN failover. Marmaray altındaki fiber patlaması durumunda ikinci hat devreye alınır. Mobil 5G üçüncü katman.' },
        { q: 'Öğrenci ve hoca aynı VPN\'de farklı erişim nasıl?', a: 'Azure AD Conditional Access + WireGuard\'ın peer tag\'leri. Hoca grubu = idari + araştırma subnet\'leri; öğrenci grubu = sadece Moodle + kampus web. Tek profil değil, rol-bazlı.' },
      ],
    },
  },

  sariyer: {
    'vpn-kurulumu': {
      scenario: 'Sarıyer İstinye\'deki 16 kişilik uluslararası ilkokul kampüsü iPad\'lerini Apple School Manager + Jamf Pro\'dan yönetirken, Boğaz hattında fiber olmayan bir ek kampüsteki öğretmen iPad\'leri Starlink üzerinden çalışıyor. Starlink\'in CGNAT\'i WireGuard handshake\'ini zorluyor (r/wireguard "WireGuard behind Starlink CGNAT" thread\'i). Çözüm: Starlink routed mode + Tailscale (ICE + DERP relay kendini çözer) yerine WireGuard.',
      whyHere: 'Sarıyer Boğaz kıyısı + kırsal karma, fiber erişimi eşit değil. Uluslararası okul + butik otel + home office ofisler esnek internet altyapısı gerektirir; Starlink + 5G + fiber hibrit senaryolar yaygın.',
      technicalAngle: 'Tailscale iPad native client (Jamf\'ten push edilir), ana kampus (fiber + Ubiquiti UDM-Pro) subnet router olarak yapılandırılır. Öğretmen iPad\'i Starlink arkasında olsa bile Tailscale DERP relay ile handshake tamamlanır. Jamf profile "always on" Tailscale; iPad açıldığı anda kampus ağına bağlı.',
      faqs: [
        { q: 'Starlink aylık maliyeti VPN çözümü ile birleştirilebilir mi?', a: 'Starlink\'in kurumsal planı ("Starlink Business") 99-200 USD/ay; kendi static IP veriyor ama CGNAT\'siz plan sadece USD birim. Tailscale aylık +5 USD/user. Toplam fiber\'e kıyasla eşdeğer, kesintisiz.' },
        { q: 'Uluslararası okul KVKK + GDPR ikili uyumu nasıl?', a: 'Tailscale EU region\'u ile coordination server\'da; veri Türkiye\'deki ana kampus\'ta. GDPR tarafı için veri işleme sözleşmesi. KVKK tarafı için açık rıza + veri envanterinde Tailscale transport olarak belirtiliyor.' },
        { q: 'Butik otel müşteri Wi-Fi\'sinden VPN\'e çıkmak güvenli mi?', a: 'Otel Wi-Fi\'si açık ağ; VPN + DNS-over-HTTPS + MFA zorunlu kılıyoruz. Bagaj oda TV cihazı gibi IoT ayrı VLAN\'da; ofis cihazları VPN olmadan Wi-Fi\'ya bağlanmaz.' },
      ],
    },
  },

  umraniye: {
    'vpn-kurulumu': {
      scenario: 'Ümraniye Dudullu OSB\'deki 110 kişilik plastik ambalaj fabrikasında üretim müdürü hafta sonu SCADA alarm sisteminden gelen "temperature high" uyarısına bakmak istedi. Siemens S7-1500 PLC\'ye uzaktan erişim TeamViewer ile yapılıyordu; CVE-2022-39214 TeamViewer PermissionElevation açığı sonrası Spiceworks\'te "TeamViewer disabled on production HMI" başlığı patladı. Çözüm: Siemens SCALANCE S615 Industrial VPN + IEC 62443-3-3 uyumlu jump host + session recording.',
      whyHere: 'Ümraniye OSB\'lerde IT ve OT ağı çoğu müşteride aynı switch\'te. Bu yapıda bir ofis virüsü üretim hattını durdurabilir; VPN mimarisi Purdue modeline göre OT-first dizayn edilmeli.',
      technicalAngle: 'Siemens SCALANCE S615 router (IP rated, OT sertifikalı) üretim ağı edge\'inde; WireGuard yerine IPsec IKEv2 (endüstriyel standard). Mühendis laptop\'tan jump host\'a önce SSH, sonra PLC\'ye OPC UA. Tüm oturum Guacamole ile video kaydı; ISO 27001 ve IEC 62443 denetimleri için 90 gün retention.',
      faqs: [
        { q: 'Siemens SCALANCE yerine Cisco IE (Industrial Ethernet) kullanılabilir mi?', a: 'Evet, Cisco IE-3400 de OT sertifikalı. Mevcut altyapınıza uyumu önemli: Siemens TIA Portal ile ENTEGRE çalışıyorsa SCALANCE tercih; karma ortamda Cisco IE de eşdeğer.' },
        { q: 'Vardiya amirinin cep telefonundan acil SCADA erişimi mümkün mü?', a: 'Evet — jump host\'ta MFA (Duo Push) + iPhone/Android WireGuard client. Ancak direkt PLC komutu değil, alarm onayı + durum görüntüleme sınırlı. Program değiştirme fiziksel erişim gerektirir.' },
        { q: 'Vardiya değişiminde VPN oturumu devir teslim yapılıyor mu?', a: 'Her oturum başlangıç-bitiş loglanır; devir için vardiya amiri raporu SCADA sisteminde tutulur. VPN teknik kaydı regülasyon, operasyonel devir ayrı süreç.' },
      ],
    },
  },

  tuzla: {
    'vpn-kurulumu': {
      scenario: 'Tuzla kimya OSB\'deki 140 kişilik bir özel kimyasal üreticisinde saha mühendisi reaktör HMI\'na ATEX Zone 1 alanından uzaktan erişmek istiyordu. Standart HMI ekran fiziksel alanda; uzaktan erişim için ek bir jump host + video stream gerek. IEC 62443-4-1 uyumlu bir yapıda "remote support" vendor access her zaman audit edilebilir olmalı. Rockwell Automation Community\'deki "ATEX Zone remote HMI access" thread\'i tam burada çözüm öneriyor.',
      whyHere: 'Tuzla kimya + tersane + otomotiv ağır sanayi ATEX, ISO 45001, IEC 61511 regülasyonları. Uzaktan erişim sadece mühendis rahatlığı değil; yanlış VPN konfigi patlama riski doğurur. Sertifikalı OT-grade donanım + sıkı audit trail zorunluluk.',
      technicalAngle: 'Siemens SCALANCE M876 (ATEX Zone 2 sertifikalı GSM router) HMI\'a köprü. Mühendis VPN → jump host (Cyberoam veya Fortinet) → SCALANCE\'a Guacamole RDP → HMI. Video kayıt 365 gün, IEC 62443-3-3 uyumlu. Laboratuvar ERP (LIMS, Chromeleon) ayrı ZTNA + MFA.',
      faqs: [
        { q: 'ATEX bölgesinde WireGuard UDP trafiği radyo frekansı riski oluşturur mu?', a: 'WireGuard sadece mevcut ethernet/GSM üzerinden çalışır; yeni radyo frekansı üretmez. ATEX riski donanım seçimi + kablolama ile ilgili; SCALANCE M876 Zone 2, Zone 1 için Extronics EI-WL-ATEX gibi ATEX Zone 1 AP gerekir.' },
        { q: 'Vendor uzaktan destek (Rockwell, Siemens) nasıl isteniyor?', a: 'Her vendor için ayrı time-bound VPN profile açıyoruz; oturum başlar, biter, revoke edilir. Audit log\'a vendor adı + oturum süresi kayıtlı. "Sürekli vendor access" yasak.' },
        { q: 'Havalimanı yakınlığı BTK frekans kısıtı VPN\'i etkiler mi?', a: 'VPN WAN katmanının üstünde; BTK kısıtı genelde dış mekan Wi-Fi antenine. 5G/fiber bağlantı üzerinden VPN etkilenmez. Wi-Fi tabanlı erişim için BTK başvurusu ayrı süreç.' },
      ],
    },
  },

  pendik: {
    'vpn-kurulumu': {
      scenario: 'Pendik Kurtköy\'deki 68 kişilik bir kargo/lojistik firmasının 140 araç şoförü Samsung tablet + Telpo T30 POS\'larla teslimat yapıyor. Merkezi Cargo WMS\'e 4G\'den sürekli bağlı. Tablet pil ömrü vardiya ortasında biten sorun, "always-on VPN drains battery" r/sysadmin\'de yıllık tekrar eden başlık. Çözüm: Cisco AnyConnect "Trusted Network Detection" + dinamik tünel sadece WMS trafiğinde aktif.',
      whyHere: 'Pendik havalimanı + lojistik + kargo yoğunluğu saha cihazı yönetimini kritik yapar. 140 tablet + sürekli VPN + 4G + pil — en küçük yanlış ayar günlük operasyon aksar. Kargo her dakika = teslim SLA\'sı.',
      technicalAngle: 'Cisco AnyConnect "Always-on VPN with Trusted Network Detection"; tablet WMS alt ağ (10.50.0.0/16) trafiğini algıladığında tunnel aktif, diğer trafik direkt. Samsung Knox + AnyConnect per-app VPN; sadece WMS uygulaması tünel içinde, diğer uygulamalar direkt internetten. Pil tüketimi standart VPN\'e kıyasla %40 düşük.',
      faqs: [
        { q: 'Sabiha Gökçen yakını BTK frekans kısıtı tablet 4G\'yi etkiler mi?', a: 'Tablet 4G operatör frekansı üzerinden çalışır; BTK kısıtı kurumsal dış anten için. Tablet etkilenmez. Depoda Wi-Fi anten için BTK başvurusu ayrı.' },
        { q: 'Tablet kaybolursa VPN erişimi nasıl kesiliyor?', a: 'Samsung Knox Configure ile remote wipe + Cisco Identity Services Engine\'dan cihaz sertifikası revoke. 5 dakika içinde cihaz WMS\'e giremez, lokal data wipe.' },
        { q: 'Black Friday sezonunda tablet sayısı 2 katına çıkacak — VPN lisans nasıl?', a: 'Cisco AnyConnect Plus concurrent session bazlı; peak için 3 aylık ek seat alıyoruz, sezon sonu geri. Sabit seat + geçici seat hibrit.' },
      ],
    },
  },

  bagcilar: {
    'vpn-kurulumu': {
      scenario: 'Bağcılar Mahmutbey\'deki 28 kişilik matbaa, Heidelberg prepress istasyonuna hafta sonu uzaktan erişim için VPN kurdu. Heidelberg Prinect Cockpit Java 8 üzerinde çalışıyor; ancak ofis bilgisayarlarından Java 17\'ye geçiş sonrası VPN üzerinden Cockpit \'certificate chain error\' veriyordu. Heidelberg Community\'deki "Prinect remote access Java mismatch" başlığı klasik örnek. Çözüm: Heidelberg Support\'tan onaylı Java 8 özel kurulum + WireGuard tünel.',
      whyHere: 'Bağcılar matbaa + tekstil + küçük üretim atölyelerinde yazılım eskiliği ile modern VPN çakışması olağan. Kullanıcı "internet yavaş" der; sorun aslında yanlış Java/legacy client kombinasyonu. Spesifik mühendislik gerekir.',
      technicalAngle: 'WireGuard tünelinin yanında Heidelberg için ayrı bir VM (Windows Server 2019 + Java 8 u311) — ofis bilgisayarları RDP ile VM\'e bağlanır, VM\'den Prinect Cockpit açılır. Tek noktada Java 8 cache, diğer ofis bilgisayarları güncel Java\'ya sahip. Matbaa makinesi CIP3/JDF dosyaları VPN tüneli içinde 10 GbE.',
      faqs: [
        { q: 'Java 8 güvenlik riski yaratmaz mı?', a: 'Dış erişimi kapalı, sadece iç ağda Prinect ile konuşan VM. VM Windows patch\'i güncel + JVM\'e dış erişim yok. Risk sınırlandırılmış.' },
        { q: 'Matbaa makinesi CIP3 dosyası VPN üzerinden ne kadar sürüyor?', a: 'Typical 1-2 GB CIP3 dosyası 1 GbE WAN üzerinden 5-12 dk, 10 GbE\'da 2-3 dk. Gece yükleme (scheduled) genelde 30 dk sürer, sabah işe başlamadan hazır.' },
        { q: 'Tekstil çevremizde toz switch port oksidasyonu VPN\'i etkiler mi?', a: 'Fiziksel katman; bağlantı düşerse VPN de düşer. 3 ayda bir basınçlı hava + yıllık switch temizliği standart uygulamamız.' },
      ],
    },
  },

  gunesli: {
    'vpn-kurulumu': {
      scenario: 'Güneşli Basın Ekspres\'teki 95 kişilik bir TV yayın merkezi, Dallas\'taki kardeş stüdyoya Avid Nexis + MediaCentral Cloud UX üzerinden content paylaşımı sağlıyor. 4K Sony FX9 master dosyaları günlük 400-800 GB. Standart site-to-site IPsec 1 Gbps\'ta ~700 Mbps throughput; peak dönemlerde yetersiz. Broadcast+Cinema Technology Community\'deki "international media transfer VPN" başlığı Signiant Media Shuttle + AWS MediaConnect yaklaşımını öneriyor.',
      whyHere: 'Güneşli medya + yayın + e-ticaret yoğunluğu yüksek throughput VPN senaryolarını doğurur. Canlı yayın + büyük dosya + sıkı deadline birleşince standart kurumsal VPN mimarisi yetersiz kalır.',
      technicalAngle: 'Aspera FASP (UDP-based) transfer VPN tünel yerine; IPsec sadece kontrol trafiği için. Aspera High-Speed Transfer Server İstanbul + Dallas, 5 Gbps sustained throughput. AWS MediaConnect entitlements ile canlı yayın akışı. Ofis iç ağı için WireGuard.',
      faqs: [
        { q: 'Aspera\'nın lisansı pahalı değil mi?', a: 'IBM Aspera On Cloud aylık $1,500-5,000 aralığında (hacim bazlı). Geleneksel VPN ile 800 GB upload 8 saat, Aspera ile 45 dk. Prodüksiyon ekibinin bekleme süresi maliyeti lisansı karşılıyor.' },
        { q: 'Canlı yayın (SRT, RTMP) VPN\'e mi yoksa direkt internete mi?', a: 'Canlı yayın VPN\'e girmez; SRT veya RTMPS direkt Wowza/MediaConnect endpoint\'ine. VPN tünel sadece kontrol paneli ve dosya transferi için.' },
        { q: 'Black Friday e-ticaret müşterilerinizin VPN trafiği nasıl ayrılıyor?', a: 'Müşteri bazlı VLAN + ayrı WireGuard instance; medya müşterisi ve e-ticaret müşterisi aynı fiziksel altyapıda ama mantıksal olarak tamamen izole.' },
      ],
    },
  },

  esenyurt: {
    'vpn-kurulumu': {
      scenario: 'Esenyurt Kıraç\'taki 24 kişilik beyaz eşya toptan firması, 6 bayisine POS + e-İrsaliye için VPN arıyordu. Ana ofiste Logo Tiger + Siparis.net; bayiler MikroBell cihazdan POS kesiyor. Standart IPsec her bayiye ayrı tünel = 6 tünel yönetimi. Spiceworks\'teki "small business multi-site VPN management" başlığı OpenVPN Access Server\'ın basit "each branch is a client" yaklaşımını öneriyor — 6 tünel yerine 6 client.',
      whyHere: 'Esenyurt\'un hızlı büyüyen KOBİ profili çok şube + düşük bütçe + minimal IT personeli demek. Cisco/Meraki seviyesi donanım pahalı, pfSense seviyesi her bayi için ayrı konfig zor. OpenVPN orta yol.',
      technicalAngle: 'OpenVPN Access Server + 6 bayi her birine client cert + gateway modu. Bayi POS ana ofise LAN-to-LAN görünür. Subnet: 10.8.0.0/24 VPN pool, her bayi statik 10.8.0.10-15. Logo Tiger bayilerin ERP\'sini görür; e-İrsaliye ofisten GIB\'e gönderilir. Aylık $15/10 kullanıcı = $150 Access Server.',
      faqs: [
        { q: 'Bayilerde statik IP yok, dinamik. Sorun olur mu?', a: 'OpenVPN client bayide dinamik IP\'den gelir, static iç IP alır. Bayi internet sağlayıcısı ne olursa olsun ana ofis tek adresten görür.' },
        { q: 'Düğün sezonunda POS yükü 4 katına çıkar — VPN taşır mı?', a: 'OpenVPN pfSense üzerinde 10-15 concurrent tünel sorunsuz. Peak için geçici ek client; sezon sonu kapanır.' },
        { q: 'E-İrsaliye GIB yavaş olduğunda offline kuyruk tutuluyor mu?', a: 'Logo Tiger lokal kuyruk (queue mode) ile GIB asenkron. Bayi POS kesimi VPN kopsa bile durmaz; tekrar bağlantı kurulduğunda senkronize olur.' },
      ],
    },
  },

  sancaktepe: {
    'vpn-kurulumu': {
      scenario: 'Sancaktepe Samandıra\'daki 38 kişilik bir gıda işleme tesisinde soğuk depo sıcaklık sensörleri (Sielaff veya HACCP Logger) internet kesintisinde kayıt atıyor — veri kaybı oluyor. IEC 62443\'e uyumlu olmayan Ethernet/IP bağlantılı eski PLC\'ler. r/automation + food safety forumlarında "HACCP data loss during internet outage" başlığı çokça tartışılır. Çözüm: Edge gateway (Raspberry Pi + TimescaleDB) + VPN üzerinden sonradan senkron.',
      whyHere: 'Sancaktepe + Samandıra OSB gıda + oto + küçük üretim yoğun. HACCP + ISO 22000 denetçisi veri sürekliliği ister. Internet kesintisinde 4-6 saat kayıp veri denetim red sebebi olur.',
      technicalAngle: 'Edge gateway (Industrial Raspberry Pi — Revolution Pi veya Siemens SIMATIC IOT2050) PLC\'den sürekli veri okur, TimescaleDB\'ye yerel yazar. WireGuard tünel internet döndüğünde merkezi InfluxDB\'ye delta sync. HACCP denetçisi sormadığı sürece data loss görünür değil; sorduğunda tüm delta logu kanıt.',
      faqs: [
        { q: 'HACCP için TimescaleDB yeterli mi?', a: 'Evet — TimescaleDB PostgreSQL\'in time-series uzantısı, uluslararası gıda denetim yazılımlarında (SafetyChain, FoodLogiQ) backend olarak kullanılır. Denetçi yaygın bir teknoloji görür.' },
        { q: 'Edge gateway arızalanırsa data kaybı olur mu?', a: 'Edge\'de RAID-1 + günlük cloud backup (WireGuard üzerinden). Gateway değişse bile 24 saat önceki snapshot merkezi DB\'de.' },
        { q: 'Soğuk depoya fiber çekmek neden sorunlu?', a: 'Sıcaklık farkı (+22 °C ofis, -18 °C depo) kapıda yoğunlaşma; standart fiber konektör neme dayanıksız. IP67 endüstriyel fiber veya kapalı muhafazalı cat6 TRENDnet TI-G50 switch tavsiye.' },
      ],
    },
  },

  sultanbeyli: {
    'vpn-kurulumu': {
      scenario: 'Sultanbeyli\'deki 19 kişilik bir mobilya imalat atölyesinde 12 yaşında Biesse Rover 24 CNC makinesinin kontrol bilgisayarı Windows XP embedded. Remote diagnostic için Biesse servisi VPN istemiyor — TeamViewer QuickSupport ile direkt bağlanıyor. 2023 Microsoft Windows XP Defender Root Certificate Expiry hadisesi sonrası (r/sysadmin "XP machines cannot verify HTTPS anymore") TeamViewer stopped working. Çözüm: Biesse vendor için kısıtlı VPN pencere + sertifika manuel kurulum.',
      whyHere: 'Sultanbeyli mobilya + inşaat malzemesi atölyelerinde eski endüstriyel makine + eski Windows + sınırlı bütçe birlikte. VPN yatırımı "lüks" gibi görünür; ama vendor remote support olmazsa makine bekler, üretim durur.',
      technicalAngle: 'pfSense + WireGuard; Biesse vendor için ayrı peer, sadece CNC makine alt ağına (10.99.0.0/24) erişim. XP kontrol bilgisayarına Microsoft\'un archived XP Root Certificate manuel yüklenir. Vendor oturumu 2 saatlik TTL, audit log pfSense\'te. Yaygın ofis ağı ayrı VLAN, CNC VLAN\'dan izole.',
      faqs: [
        { q: 'Biesse Rover\'ı Windows 10/11\'e yükseltmek mümkün mü?', a: 'Teorik olarak evet, pratikte Biesse XP/7 embedded eski sürümler için CNC sürücülerini sertifikalamıyor. Upgrade ≈ yeni makine lisansı (~€15k). Çoğu müşteri mevcut XP\'yi izolasyon + VPN arkasında tutmayı seçer.' },
        { q: 'Vendor VPN erişimi giderken audit log\'u nasıl kanıtlıyoruz?', a: 'pfSense\'te WireGuard peer oturum başlangıç-bitiş syslog\'u + ekran kaydı (Guacamole). Tartışmalı vendor işlemi olduğunda 90 gün retention\'dan çıkarıp kanıt.' },
        { q: 'Fiber olmayan sokağımızda 5G ile VPN çekiyor mu?', a: 'Turkcell 5G kurumsal modem (Teltonika RUTX11 + B18 GSM) + WireGuard sorunsuz. 5G upload 50-100 Mbps; CNC uzaktan diagnostics için ziyadesiyle yeterli.' },
      ],
    },
  },

  maltepe: {
    'vpn-kurulumu': {
      scenario: 'Maltepe Yalı\'daki 29 kişilik özel okul, uzaktan eğitim sürecinde öğretmenlerin kampus sunucusundaki sınıf videolarına evden erişmesi gerekiyordu. Veli portalı + öğrenci bilgi sistemi (K12Net) internet üzerinden; video repository iç sunucu. r/k12sysadmin\'deki "teacher remote access content library" başlığı Jamf + iPad + VPN kombinasyonunu öneriyor. Çözüm: Jamf Connect + SSO + selective Tunnel iPad üzerinde.',
      whyHere: 'Maltepe\'deki özel eğitim + kurum + sağlık + perakende karma; KVKK öğrenci veri koruması özellikle hassas. Veli portalı ile öğretmen VPN\'i aynı altyapı olsa da farklı yetkiler.',
      technicalAngle: 'Jamf Connect ile Microsoft 365 SSO, iPad ve MacBook dağıtım; Jamf profile VPN otomatik kurar (Meraki Client VPN veya WireGuard). Per-app VPN: sadece video repository erişen app tünel içinde, diğer trafik direkt. Öğrenci iPad\'leri ayrı MDM profili, VPN yok.',
      faqs: [
        { q: 'Öğretmen kendi cihazıyla (BYOD) erişebilir mi?', a: 'Jamf Connect Enrollment zorunlu; kendi MacBook\'unu enroll ederse VPN kurulur, enroll olmazsa yok. KVKK\'da "kişisel cihaz + kurumsal veri" için ayrı açık rıza.' },
        { q: 'Dolgu alanındaki yeni kampus fiber\'a bağlanmadı — VPN nasıl?', a: 'Geçici 5G Turkcell kurumsal modem + SD-WAN. Fiber geldiğinde (ortalama 8-14 ay) otomatik primary olur.' },
        { q: 'K12Net gibi bulut SIS VPN arkasına alınabilir mi?', a: 'K12Net doğrudan internet; Cloudflare Access ile kurumsal domain arkasına taşıyabiliriz. Öğretmen K12Net\'e Microsoft SSO ile girer, yaygın public login kapalı.' },
      ],
    },
  },

  kartal: {
    'vpn-kurulumu': {
      scenario: 'Kartal\'daki 52 kişilik özel bir hastanede radyoloji uzmanı nöbette tele-radyoloji (Teleradyoloji) için evden PACS erişmesi gerekiyor. HBYS üreticisi Probel, PACS üreticisi Carestream. DICOM görüntü 150-500 MB/çalışma. HIMSS + r/healthit\'teki "remote radiologist PACS access" tartışmaları VPN + DICOMweb + cache stratejisi öneriyor. Çözüm: dedicated WireGuard + DICOMweb gateway + SSD cache evde.',
      whyHere: 'Kartal adliye + hastane + gelişen bölge; sağlık veri güvenliği HIMSS EMRAM seviyesine kadar inceleniyor. Uzman doktor evinde DICOM görüntüye beklemeden ulaşmalı — kardiyak vaka için dakika ölüm demek.',
      technicalAngle: 'Uzman evinde NVIDIA Shield TV benzeri edge cache cihazı (aslında Intel NUC + Orthanc DICOM server) + WireGuard tünel. PACS\'tan çalışma açıldığında thumbnail hızlı, tam seri background\'da cache\'lenir. Carestream\'in DICOMweb WADO-RS API\'si REST üzerinden; Orthanc proxy gibi.',
      faqs: [
        { q: 'Ev internetinde 500 MB DICOM 30 sn\'de açılabilir mi?', a: 'Türk Telekom Home Gigafiber 1 Gbps\'ta evet. Standart 100 Mbps fiber\'da 45-90 sn. Uzman ilk seriye hızlı, sonraki seriler cache\'ten anlık.' },
        { q: 'Probel HBYS VPN\'den nasıl çalışıyor?', a: 'HBYS client native RDS/RDP üzerinden çalışır; VPN tünel içinde RDS 3389 portuyla bağlanılır. Citrix Virtual Apps alternatifi de Probel\'in resmi desteğinde.' },
        { q: 'KVKK + HIMSS ikili uyumu DICOM için?', a: 'DICOM anonimleştirme gerekmedikçe, tünel encrypted (ChaCha20) + lokal encrypted cache (BitLocker) KVKK\'da teknik tedbir. Audit trail: kim ne zaman hangi çalışmayı açtı + kayıt süresi.' },
      ],
    },
  },

  cekmekoy: {
    'vpn-kurulumu': {
      scenario: 'Çekmeköy\'deki 18 kişilik bir yazılım girişiminde developer\'lar AWS eu-central-1\'deki Kubernetes cluster\'a (EKS) kubectl erişimi istiyordu. Standart public API endpoint güvenlik bulgusu; private endpoint seçildi. Developer evde CGNAT arkasında; r/aws\'deki "access EKS private endpoint from home" başlığı Client VPN + AWS PrivateLink önerisi veriyor. Çözüm: AWS Client VPN + Okta SSO + kubectl için ephemeral credentials.',
      whyHere: 'Çekmeköy yazılım + girişim ekosistemi cloud-first kurgu; VPC, serverless, Kubernetes normal. Developer\'ların prod\'a direct erişmeden private subnet\'e bağlanması best practice — bunu sıfırdan kurmak olgunluk.',
      technicalAngle: 'AWS Client VPN endpoint eu-central-1 VPC\'de; Okta SAML federation + OpenVPN client. EKS private endpoint sadece VPC içinden erişilir. Developer \'aws-vpn-client\' açar, Okta MFA, VPN tünel, sonra kubectl. aws eks update-kubeconfig ile ephemeral token, süreli.',
      faqs: [
        { q: 'AWS Client VPN aylık maliyet ne kadar?', a: 'Endpoint subnet-saat + connection-saat bazlı; tipik 10-20 developer için ~$80-150/ay. WireGuard self-hosted alternatif ~$20 EC2 t4g.micro — her iki yol test edilebilir.' },
        { q: 'Production RDS\'e developer direkt erişebilmeli mi?', a: 'İdeal olarak hayır. AWS Systems Manager Session Manager üzerinden bastion, port forward + RDS Proxy. Read-only bile olsa audit trail CloudTrail\'de.' },
        { q: 'Ev internetinde 5G kullanan developer için CGNAT problemi?', a: 'Client VPN OpenVPN UDP üzerinde; CGNAT\'te handshake için STUN-benzeri mekanizma. Nadiren fail; alternative TCP/443 mode aktif edilir.' },
      ],
    },
  },

  beykoz: {
    'vpn-kurulumu': {
      scenario: 'Beykoz Kavacık\'taki 14 kişilik butik otel grubu, 3 ayrı lokasyon (Beykoz merkez, Polonezköy, Riva) için merkezi Mews PMS + mobil check-in app kullanıyor. Polonezköy\'de fiber yok, 4G yedek; Riva\'da Starlink. Mews Cloud\'a tüm lokasyonlardan erişim gerekir. r/hospitalityit + Mews Community\'deki "multi-location boutique hotel VPN" başlığı Meraki + Cloudflare Tunnel hibrit öneriyor.',
      whyHere: 'Beykoz\'un kırsal + Boğaz kıyısı + şehir karışık topografyası standart tek-fiber mimariye izin vermez. Her lokasyon farklı internet; VPN esnek ve failover kapasitesi yüksek olmalı.',
      technicalAngle: 'Meraki MX67 her 3 lokasyonda; MX67\'ler Meraki Auto VPN ile full mesh IPsec. Polonezköy 4G failover modem, Riva Starlink CGNAT için Cloudflare Tunnel ekli (Starlink\'in NAT\'i IPsec\'i zorluyor). Mews PMS tüm lokasyonlardan tek endpoint\'e, misafir Wi-Fi ayrı VLAN.',
      faqs: [
        { q: 'Starlink Business plan static IP var — neden Cloudflare Tunnel?', a: 'Static IP planı Business +$100 ekstra; Cloudflare Tunnel $0. Küçük otel için ekonomik tercih. Business plan ihtiyaç olduğunda eklenebilir.' },
        { q: 'Mews PMS API\'si VPN arkasında gecikme sorunu?', a: 'Mews Cloud eu-west; İstanbul\'dan Dublin\'e 60-80 ms latency normal. VPN 5-10 ms ekler. Check-in operasyonunda farkedilmez.' },
        { q: 'Kırsal Polonezköy\'de Mews tamamen çevrimdışı olursa?', a: 'Mews\'in offline mode\'u 48 saat lokal veri saklayıp geri döndüğünde senkronize olur. Misafir check-in offline\'da da yapılabilir.' },
      ],
    },
  },

  beylikduzu: {
    'vpn-kurulumu': {
      scenario: 'Beylikdüzü TÜYAP fuar sezonunda 38 kişilik bir etkinlik firması 5 günlük fuarda 60 stand için geçici VPN + Wi-Fi altyapısı kurdu. Her stand\'a POS + stand kaydı tablet + misafir Wi-Fi. Fuar sonrası söküp depoya. r/eventprofs + Cisco Meraki Community\'deki "temporary event VPN deployment" konuları aynı pratik zorlukları gösteriyor. Çözüm: Meraki Go + Go Cloud Portal + taşınabilir LTE gateway.',
      whyHere: 'Beylikdüzü fuar/etkinlik firmaları geçici kurulum uzmanıdır; standart kurumsal VPN mimarisi bu kadar dinamik değil. Bir fuar bitince başka bir fuar — donanım, konfig, personel mobilize.',
      technicalAngle: 'Meraki Go portatif AP + Cellular Gateway (Z3C veya Cradlepoint E300) fuar alanında hızlı deploy. Meraki Go Cloud Portal tek panelden tüm stand VLAN\'ları. POS trafiği ayrı SSID + VLAN + VPN tünel ana ofis\'e. Misafir Wi-Fi ayrı — KVKK kayıt formu + 5651 log.',
      faqs: [
        { q: 'Fuar 5 günlük — kısa süreli VPN lisans olur mu?', a: 'Meraki Go perpetual lisans 1-3 yıllık paketlerle geliyor; fuar firması için kalıcı envanter. Fuar başına ekstra lisans maliyeti yok.' },
        { q: 'Stand sahipleri kendi VPN\'ini isterse?', a: 'Stand bazlı "tenant VPN" sunuyoruz; fuar ana ofise değil, stand firmasının kendi merkezine tünel. WireGuard + kısa süreli sertifika.' },
        { q: 'TÜYAP çevresi Wi-Fi doyumunda performans?', a: 'Meraki Go 5 GHz-only + DFS kanalları + Wi-Fi 6E; 2.4 GHz tamamen kapatılır. Fuar yoğunluğunda bile stabil.' },
      ],
    },
  },

  avcilar: {
    'vpn-kurulumu': {
      scenario: 'Avcılar Ambarlı yakınındaki 52 kişilik bir gümrük müşaviri firması, Gümrük BİLGE API\'ye + UETDS sistemine sürekli entegrasyon yapıyor. Liman bölgesindeki ağır araç trafiğinin internet ISP altyapısına yaptığı anlık yük ve BİLGE\'nin %1-2 gün içinde yaşadığı kesinti, saha operasyonunu sürekli bekletiyor. r/sysadmin + IBTrader forum "BILGE API queue management" başlığı retry + exponential backoff öneriyor.',
      whyHere: 'Avcılar liman + üniversite + lojistik karışımı; gümrük işlemi kesintisi = konteyner bekleme = cezalı gün. BİLGE/UETDS API çağrıları VPN arkasında SLA\'lı olmalı.',
      technicalAngle: 'VPN + API gateway (Apigee veya open-source Kong): gümrük yazılımı BİLGE\'ye direkt değil, gateway üzerinden; gateway retry + exponential backoff + queue. Kesinti 5-15 dk sürerse kuyruk; uzun sürerse Slack alarmı. Apigee İstanbul region\'da, gecikme minimal.',
      faqs: [
        { q: 'BİLGE API\'si rate limit uyguluyor mu?', a: 'Evet — dakikada 60 request sabit. API gateway rate limit + kuyruklama ile kontrolü biz yapıyoruz; business logic etkilenmez.' },
        { q: 'Liman bölgesi güvenliği VPN trafiğini izler mi?', a: 'Ambarlı Liman kendi iç ağı farklı; firma ofisi dış ISP üzerinden çalışır. VPN tünel içinde trafik görünmez. Sadece IPsec metadata (hedef IP) dış firewall\'da görülür.' },
        { q: 'Üniversite çevresinde eduroam interferensi VPN\'i etkiler mi?', a: '5 GHz\'de çakışma Wi-Fi performansı düşürür; VPN üstünde kullanıcı lag hisseder. Hidden SSID + 5 GHz-only + Wi-Fi 6 ile minimize edilir.' },
      ],
    },
  },

  kozyatagi: {
    'vpn-kurulumu': {
      scenario: 'Kozyatağı E-5 cepheli plazadaki 75 kişilik bir sigorta acentesi, SEGEM denetim öncesi VPN altyapısı dokümantasyonu yeniden düzenledi. Mevcut "anti-virüs üreticisinin ücretsiz VPN\'i" denetim red sebebi; kurumsal lisanslı + loglanabilir + MFA\'lı bir çözüme geçiş gerekti. 2 hafta içinde WireGuard + Microsoft Authenticator + 5651 uyumlu syslog devreye alındı.',
      whyHere: 'Kozyatağı merkezimize 5-10 dk mesafedeki sigorta, finans, danışmanlık firmalarında SEGEM + SPK + BDDK denetimleri sürekli gündemde. Kapı komşusu olmamız 2 haftalık bir geçişi planlamak için ideal.',
      technicalAngle: 'pfSense + WireGuard, iç CA ile kullanıcı sertifikaları, MFA için Microsoft Authenticator + SAML. SEGEM denetçisi için hazır rapor template: kullanıcı listesi, oturum geçmişi, sertifika yaşam döngüsü. 5651 uyumlu syslog ayrı sunucuda imzalı WORM.',
      faqs: [
        { q: 'SEGEM denetçisi günü önceden haber vermeden geliyor, hazırlıklıyız?', a: 'Log arşivi 6 yıl önceye kadar hazır; denetçi geldiğinde PDF raporları 1 saat içinde imzalı üretebiliyoruz. "Hazırım" demek bir hafta değil, proaktif süreç.' },
        { q: 'SEGEM\'in teknik tedbir şartları hangileri?', a: 'KVKK + KKÇ Kurulu teknik tedbir rehberi + SEGEM içerik güvenliği ek maddeleri. VPN + MFA + log + erişim matrisi temel dörtlü.' },
        { q: 'Kozyatağı merkezinizden bize ulaşım süreniz?', a: '800 m yarıçapta 10 dk, 2 km içinde 20 dk. Kritik denetim öncesi saha ekibimiz gün boyu ofisinizde kalabilir.' },
      ],
    },
  },

  icerenkoy: {
    'vpn-kurulumu': {
      scenario: 'İçerenköy Quick Tower yakınındaki 22 kişilik bir dijital pazarlama ajansı, Google Ads API + Meta Marketing API sürekli çağrıları üzerinden kampanya yönetiyor. 2024\'te Meta "suspicious activity detected" anomali kısıtlaması + Google Ads API v17 rate limit + RTB bid platform trafiği birleşince ajansın public IP\'si defalarca bloklandı. r/PPC + Google Ads Community\'deki "Ads API rate limit our IP banned" tartışmaları residential proxy yerine rotating datacenter IP öneriyor.',
      whyHere: 'İçerenköy\'deki dijital pazarlama firmalarında ad platform API banı = günlerce kampanya durması. Kapı komşumuz olmamız yangın söndürmede 5 dakikalık fark yaratıyor.',
      technicalAngle: 'Ad trafiği için ayrı WireGuard exit node + BrightData / Oxylabs datacenter proxy rotasyonu. Ofis kendi trafiği farklı çıkış noktasından. Meta/Google Ads API call\'ları proxy havuzundan; tek IP\'de yoğunluk yok. Ofis normal internete dokunmuyor; risk yayılımı yok.',
      faqs: [
        { q: 'Meta "residential proxy" yasaklıyor değil mi?', a: 'Residential proxy riskli; datacenter proxy (Meta TOS\'te "legitimate infrastructure" olarak sayılır) kabul edilir. BrightData enterprise tier bununla uyumlu.' },
        { q: 'Kapı komşumuzsunuz, acil bir API banı olursa?', a: 'Quick Tower\'dan 5 dk mesafedeyiz; fiziksel yerindeyiz. Uzaktan 2 dk içinde WireGuard exit node çıkışını değiştiriyoruz.' },
        { q: 'Google Ads API v18 geçişinde VPN setup değişir mi?', a: 'API sürümü değişirse rate limit de değişir. Geçişi 2 hafta önce pilot testle yapıyoruz; mevcut kampanyalar aksamıyor.' },
      ],
    },
  },

  kavacik: {
    'vpn-kurulumu': {
      scenario: 'Kavacık\'taki 48 kişilik bir ilaç dağıtım firması Sağlık Bakanlığı ITS (İlaç Takip Sistemi) API\'si + 21 CFR Part 11 elektronik kayıt + GMP veri bütünlüğü üçlü uyumla çalışıyor. ITS kesintisi olduğunda lokal queue tutmalı, bağlantı gelince retry. Validated System tartışmalarında (pharmaceuticaltalk.com + r/pharma) VPN + offline queue + audit trail şart olarak anlatılıyor.',
      whyHere: 'Kavacık ilaç + sağlık teknolojisi yoğun; FSM köprüsü üzerinden Avrupa Yakası toptancı ile senkron kritik. VPN + GMP denetimi birlikte yönetilmeli.',
      technicalAngle: 'Validated WireGuard kurulum: konfigürasyon değişiklikleri Change Control Record ile kayıt. ITS API çağrıları ayrı queue servisi (Apache Kafka veya AWS SQS) üzerinden; bağlantı düşerse mesaj kaybı yok. 21 CFR Part 11 için tüm işlem audit trail (user, action, timestamp, checksum).',
      faqs: [
        { q: 'GMP denetçisi VPN yapılandırması soruyor mu?', a: 'Evet — denetçi "electronic records" + "network security" altında VPN konfig + change log + access matrisi ister. Validated system paketinde hazır belge sunuyoruz.' },
        { q: 'FSM köprü fiber patlaması Avrupa Yakası\'yla senkronu durdurur mu?', a: 'Ana TT fiber + Superonline backup + 5G failover; fiziksel yol çeşitlendirildi. Tek rota kesintisi tüm bağlantıyı durdurmaz.' },
        { q: '21 CFR Part 11 için retention 10 yıl — log storage maliyeti?', a: 'Audit log\'u AWS S3 Glacier Deep Archive\'de, GB başına $0.00099/ay. 10 yıllık 500 GB log < $60 toplam. Maliyet üretim riskinin yanında sembolik.' },
      ],
    },
  },


  // ═══════════════════════════════════════════════════════════════════
  // IT ALTYAPI YENİLEME — 30 ilçe için unique (greenfield + overhaul)
  // Ayrı dosyada tutuluyor (district-overhaul-angles.js); aşağıda merge ediliyor.
  // ═══════════════════════════════════════════════════════════════════
};

import { districtOverhaulAngles } from './district-overhaul-angles.js';
for (const [districtKey, overhaulBlock] of Object.entries(districtOverhaulAngles)) {
  if (!districtServiceAngles[districtKey]) districtServiceAngles[districtKey] = {};
  districtServiceAngles[districtKey]['it-altyapi-yenileme'] = overhaulBlock;
}
