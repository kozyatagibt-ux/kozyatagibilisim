// IT bilmeyen son kullanıcının Google'da aratacağı günlük sorunlar.
// Yerel sayfalarda "Sık Karşılaşılan IT Sorunları" bloğu olarak render edilir.
// Her öğe ilgili blog yazısına internal link verir → SEO juice.

export const commonProblems = [
    {
        title: 'Bilgisayarım çok yavaş',
        desc: 'Açılış uzun sürüyor, programlar geç yanıt veriyor, her şey ağır çekimde.',
        blog: '/blog/bilgisayar-cok-yavas-ne-yapmali',
    },
    {
        title: 'Bilgisayar açılmıyor',
        desc: 'Güç düğmesine basıyorum ama ekrana görüntü gelmiyor veya siyah ekranda kalıyor.',
        blog: '/blog/bilgisayar-acilmiyor',
    },
    {
        title: 'Bilgisayar sürekli donuyor',
        desc: 'Çalışırken ekran donuyor, fare hareket etmiyor, Ctrl+Alt+Del bile yanıt vermiyor.',
        blog: '/blog/bilgisayar-surekli-donuyor',
    },
    {
        title: 'Ofiste internet yavaş',
        desc: 'Sabah herkes gelince internet ağırlaşıyor, video toplantılar takılıyor.',
        blog: '/blog/ofiste-internet-yavas',
    },
    {
        title: 'WiFi çekmiyor veya kopuyor',
        desc: 'Kablosuz ağ bazı odalarda zayıf, sürekli bağlantı kopuyor.',
        blog: '/blog/wifi-sinyali-zayif',
    },
    {
        title: 'E-postalar gelmiyor veya gönderilmiyor',
        desc: 'Müşteri mailim ulaşmadı diyor, gelen kutum boş, mailler spam\'e düşüyor.',
        blog: '/blog/eposta-gelmiyor-gonderilmiyor',
    },
    {
        title: 'E-posta hesabım hacklendi',
        desc: 'Hesabımdan habersiz mailler gönderilmiş, şüpheli giriş uyarısı aldım.',
        blog: '/blog/eposta-hesabim-hacklendi',
    },
    {
        title: 'Bilgisayara virüs bulaştı',
        desc: 'Garip pencereler açılıyor, arka planda bilinmeyen programlar çalışıyor.',
        blog: '/blog/bilgisayara-virus-bulasti',
    },
    {
        title: 'Dosyalarım şifrelendi — fidye yazılımı',
        desc: 'Dosyalar açılmıyor, uzantılar değişmiş, fidye notu çıkıyor.',
        blog: '/blog/ransomware-ilk-72-saat-vaka-analizi',
    },
    {
        title: 'Silinen dosyaları geri getirme',
        desc: 'Yanlışlıkla önemli bir dosyayı sildim, çöp kutusunda da yok.',
        blog: '/blog/silinen-dosyalari-geri-getirme',
    },
    {
        title: 'Outlook açılmıyor',
        desc: 'Outlook hata veriyor, profil yüklenemiyor veya sürekli şifre soruyor.',
        blog: '/blog/outlook-acilmiyor',
    },
    {
        title: 'Excel donuyor veya kapanıyor',
        desc: 'Büyük dosyalarda Excel yanıt vermiyor, kaydetmeden kapanıyor.',
        blog: '/blog/excel-donuyor-cozum',
    },
    {
        title: 'Windows mavi ekran hatası',
        desc: 'Bilgisayar aniden mavi ekranla yeniden başlıyor, veri kaybı oluyor.',
        blog: '/blog/windows-mavi-ekran',
    },
    {
        title: 'Yazıcı çalışmıyor veya paylaşılamıyor',
        desc: 'Yazıcı yazdırmıyor, ağdaki diğer bilgisayarlar yazıcıyı görmüyor.',
        blog: '/blog/yazici-paylasamiyorum',
    },
    {
        title: 'VPN bağlanmıyor',
        desc: 'Evden şirket ağına VPN ile bağlanamıyorum, bağlantı zaman aşımına uğruyor.',
        blog: '/blog/vpn-baglanmiyor',
    },
    {
        title: 'USB bellek veya disk tanınmıyor',
        desc: 'USB takıyorum ama bilgisayar algılamıyor, "aygıt tanınmadı" hatası veriyor.',
        blog: '/blog/usb-taninmiyor',
    },
    {
        title: 'Disk alanı dolu, C diski dolmuş',
        desc: 'Bilgisayar disk dolu uyarısı veriyor, dosya kaydedemiyorum.',
        blog: '/blog/disk-alani-dolu',
    },
    {
        title: 'Teams/Zoom\'da ses veya kamera çalışmıyor',
        desc: 'Toplantıya giriyorum ama karşı taraf sesimi duymuyor veya kameramı görmüyor.',
        blog: '/blog/teams-toplanti-sorunlari',
    },
    {
        title: 'Şirket mail adresi nasıl alınır',
        desc: 'info@sirketim.com gibi profesyonel mail adresi istiyorum, nereden başlamalıyım.',
        blog: '/blog/sirket-mail-adresi-nasil-alinir',
    },
    {
        title: 'Ofis taşınması — bilgisayarlar ne olacak',
        desc: 'Yeni ofise taşınıyoruz, sunucu, network ve bilgisayarları nasıl taşıyacağız.',
        blog: '/blog/ofis-tasima-it-rehberi',
    },
    {
        title: 'Şüpheli bir linke tıkladım',
        desc: 'Gelen maildeki linke tıkladım, şimdi bilgisayarıma bir şey oldu mu bilmiyorum.',
        blog: '/blog/supheli-linke-tikladim',
    },
    {
        title: 'Windows şifremi unuttum, hesabım kilitlendi',
        desc: 'Bilgisayarımı açamıyorum, şifremi hatırlamıyorum veya hesap kilitlendi diyor.',
        blog: '/blog/windows-sifre-unuttum-hesap-kilitlendi',
    },
    {
        title: 'Office lisans sorunu',
        desc: 'Word veya Excel "Lisansınız doğrulanamadı" hatası veriyor, belgeler açılmıyor.',
        blog: '/blog/office-lisans-sorunu-cozum',
    },
    {
        title: 'Şirket interneti sürekli kopuyor',
        desc: 'İnternet gün içinde birkaç kez kesiliyor, çalışanlar iş yapamıyor.',
        blog: '/blog/sirket-interneti-surekli-kopuyor',
    },
    {
        title: 'Bilgisayardan garip sesler geliyor',
        desc: 'Fan çok gürültülü, tıkırtı sesi var veya anormal vızıltı duyuyorum.',
        blog: '/blog/bilgisayardan-garip-ses-geliyor',
    },
    {
        title: 'Ekran titriyor veya çizgiler var',
        desc: 'Monitörde titreme, renkli çizgiler veya görüntü bozulması oluyor.',
        blog: '/blog/ekran-titriyor-cizgiler-var',
    },
    {
        title: 'Sunucu çöktü, sisteme erişilmiyor',
        desc: 'Şirketin sunucusu durdu, paylaşılan dosyalara ve programlara erişilemiyor.',
        blog: '/blog/sunucu-coktu-ne-yapilmali',
    },
    {
        title: 'Şirketimiz hacklendi ne yapmalıyız',
        desc: 'Sistemlere izinsiz giriş yapılmış, veriler çalınmış olabilir, ne yapacağımızı bilmiyoruz.',
        blog: '/blog/sirket-hacklendi-ne-yapilmali',
    },
    {
        title: 'Windows güncelleme sorunu',
        desc: 'Windows Update takılıyor, güncelleme başarısız oluyor veya güncelleme sonrası sorun çıkıyor.',
        blog: '/blog/windows-guncelleme-sorunu',
    },
];
