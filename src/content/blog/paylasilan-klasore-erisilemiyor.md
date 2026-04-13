---
slug: paylasilan-klasore-erisilemiyor
title: "Paylaşılan Klasöre Erişilemiyor: Ağ Paylaşımı Sorun Çözüm Rehberi"
type: cluster
pillar: 9
url: "/blog/paylasilan-klasore-erisilemiyor"
hedef_anahtar_kelime: "paylaşılan klasöre erişilemiyor"
meta_title: "Paylaşılan Klasöre Erişilemiyor: Ağ Paylaşımı Sorun Çözüm Rehberi | Kozyatağı Bilişim"
meta_description: "Ofiste paylaşılan klasöre erişemiyor musunuz? 'Ağ yoluna erişilemiyor' hatası mı alıyorsunuz? Adım adım çözüm rehberi."
kelime_sayisi: "~1700"
pillar_linki: "/kurumsal-network-kurulumu"
---

Ofiste çalışıyorsunuz ve muhasebedeki arkadaşınızın paylaştığı klasörü açmaya çalışıyorsunuz. Tıklıyorsunuz ama "Windows bu ağ konumuna erişemiyor" veya "Erişim engellendi" hatası alıyorsunuz. Dün çalışıyordu, bugün çalışmıyor. Ya da yeni bir çalışan geldi ve diğer herkes erişebilirken o erişemiyor. Bu durum ofislerde neredeyse her hafta yaşanır ve çoğu zaman çözümü basittir — neye bakacağınızı bilmeniz yeter.

Bu rehberde paylaşılan klasöre erişememe sorununu tüm yaygın sebepleriyle birlikte adım adım çözeceğiz.

## Paylaşılan Klasör Nasıl Çalışır?

Önce kısaca nasıl çalıştığını anlatalım. Ofiste bir bilgisayardaki veya sunucudaki klasörü "paylaşıma açarsınız." Diğer bilgisayarlar aynı ağda (aynı modem/switch'e bağlı) olduğu sürece bu klasörü görebilir ve erişebilir. Bu işlem arka planda SMB (Server Message Block) adlı bir protokolle yapılır — bunu bilmeniz gerekmez ama bazı sorunlar bu protokolle ilgili olduğu için adını geçireceğiz.

## Adım 1: Temel Kontroller

Karmaşık ayarlara geçmeden önce basit kontrolleri yapın:

### Her İki Bilgisayar da Açık mı?

Kulağa komik gelecek ama paylaşılan klasörün bulunduğu bilgisayar kapalıysa veya uyku modundaysa o klasöre erişemezsiniz. Klasörü paylaşan bilgisayarın açık ve uyanık olduğundan emin olun.

### Aynı Ağda mısınız?

Her iki bilgisayar da aynı modem veya switch'e bağlı olmalı. Biri kablolu, biri Wi-Fi olabilir — sorun değil, ikisi de aynı modemin ağındaysa çalışır. Ancak biri misafir Wi-Fi'a, diğeri ana ağa bağlıysa erişim olmaz.

Kontrol etmek için: Her iki bilgisayarda da komut istemini açın (Windows + R, "cmd" yazıp Enter) ve `ipconfig` yazın. "IPv4 Address" satırına bakın. İki bilgisayarın IP adresleri benzer olmalı — örneğin biri 192.168.1.15, diğeri 192.168.1.22 gibi. İlk üç grup (192.168.1) aynıysa aynı ağdasınız demektir.

### Klasör Yolunu Doğru mu Yazıyorsunuz?

Dosya Gezgini'nin adres çubuğuna `\\bilgisayar-adi\paylasim-adi` şeklinde yazmanız gerekir. İki ters eğik çizgi (\\) ile başlamalı. Bilgisayar adı yerine IP adresi de yazabilirsiniz: `\\192.168.1.15\paylasim-adi`

## Adım 2: Ağ Bulma Ayarlarını Kontrol Edin

Windows'ta "Ağ Bulma" özelliği kapalıysa, bilgisayarınız ağdaki diğer cihazları göremez ve onlar da sizi göremez. Bu ayarı açmanız gerekir:

1. Başlat menüsüne "Denetim Masası" yazıp açın
2. "Ağ ve Paylaşım Merkezi" bölümüne girin
3. Sol taraftaki "Gelişmiş paylaşım ayarlarını değiştirin" seçeneğine tıklayın
4. Aktif ağ profiliniz altında (genelde "Özel" olarak işaretli) şu ayarları yapın:
   - **Ağ bulma:** Aç
   - **Dosya ve yazıcı paylaşımı:** Aç
5. "Tüm Ağlar" bölümünü genişletin ve şu ayarları yapın:
   - **Ortak klasör paylaşımı:** Aç
   - **Parola korumalı paylaşım:** Bu ayarı durumunuza göre belirleyin. Açıksa, bağlanan kişinin kullanıcı adı ve şifre girmesi gerekir. Kapalıysa herkes erişebilir.
6. "Değişiklikleri Kaydet" düğmesine tıklayın

**Önemli:** Bu ayarları hem paylaşan hem de erişmeye çalışan bilgisayarda yapmanız gerekir.

## Adım 3: SMB Protokolünü Kontrol Edin

Windows 10 ve 11'in bazı sürümlerinde eski SMB protokolü (SMBv1) kapalı gelir. Eğer ağınızda eski bir cihaz (eski NAS, eski yazıcı, Windows XP bilgisayar) varsa ve bu cihaz sadece SMBv1 kullanıyorsa erişim sorunu yaşarsınız.

SMBv1'i kontrol etmek ve açmak için:

1. Başlat menüsüne "Windows özelliklerini aç veya kapat" yazın
2. Açılan listede "SMB 1.0/CIFS Dosya Paylaşım Desteği" satırını bulun
3. İşareti yoksa işaretleyin ve "Tamam" deyin
4. Bilgisayarı yeniden başlatın

**Güvenlik notu:** SMBv1 eski ve güvenlik açığı olan bir protokoldür. Mümkünse ağınızdaki tüm cihazları SMBv2 veya SMBv3 destekleyen sürümlere güncelleyin. SMBv1'i sadece zorunluysa açın.

## Adım 4: Güvenlik Duvarı Ayarları

Windows Güvenlik Duvarı bazen dosya paylaşımını engelleyebilir. Kontrol etmek için:

1. Başlat menüsüne "Windows Güvenlik Duvarı" yazın
2. "Bir uygulamaya Windows Güvenlik Duvarı üzerinden izin ver" seçeneğine tıklayın
3. Listede "Dosya ve Yazıcı Paylaşımı" satırını bulun
4. Hem "Özel" hem "Genel" sütunlarında işaretli olduğundan emin olun
5. İşaretli değilse "Ayarları değiştir" düğmesine tıklayıp işaretleyin

Ayrıca şirketinizde üçüncü parti antivirüs veya güvenlik yazılımı varsa (Kaspersky, ESET, Bitdefender gibi), bunların kendi güvenlik duvarları da dosya paylaşımını engelliyor olabilir. Bu yazılımların ayarlarında dosya paylaşımına izin vermeniz gerekebilir.

## Adım 5: Kimlik Bilgisi (Credential) Sorunu

Windows bağlandığınız ağ paylaşımları için kullanıcı adı ve şifre bilgilerini saklar. Eğer şifreniz değiştiyse veya eski bilgiler kayıtlıysa, erişim reddedilebilir. Kayıtlı kimlik bilgilerini temizlemek için:

1. Başlat menüsüne "Kimlik Bilgileri Yöneticisi" yazın ve açın
2. "Windows Kimlik Bilgileri" sekmesine geçin
3. Erişmeye çalıştığınız bilgisayarın adını veya IP adresini listede bulun
4. Yanındaki oku tıklayıp "Kaldır" deyin
5. Şimdi tekrar paylaşılan klasöre erişmeyi deneyin — kullanıcı adı ve şifre soracaktır
6. Güncel şifreyi girin

Bu adım özellikle "dün çalışıyordu bugün çalışmıyor" durumlarında en sık çözüm olan adımdır.

## Adım 6: Çalışma Grubu ve Etki Alanı (Domain) Kontrolü

Ofisteki bilgisayarlar iki şekilde organize olabilir:

### Çalışma Grubu (Workgroup)

Küçük ofislerde bilgisayarlar genelde aynı çalışma grubundadır. Varsayılan çalışma grubu adı "WORKGROUP"tur. Tüm bilgisayarların aynı çalışma grubunda olduğundan emin olun:

1. Windows + Pause tuşlarına basın veya Başlat > Ayarlar > Sistem > Hakkında bölümüne gidin
2. "Bilgisayar adı, etki alanı ve çalışma grubu ayarları" altında çalışma grubu adını görün
3. Farklıysa "Ayarları değiştir" diyerek aynı çalışma grubu adını girin

### Etki Alanı (Domain)

Büyük ofislerde Active Directory etki alanı kullanılır. Bir bilgisayar etki alanına katılmamışsa veya etki alanı bağlantısı kopmamışsa, paylaşılan klasörlere erişemez. Bu durumda IT ekibinize başvurmanız gerekir.

## Adım 7: Paylaşım İzinleri

Klasörü paylaşan bilgisayarda izinlerin doğru ayarlanmış olması gerekir. İki ayrı izin katmanı vardır:

### Paylaşım İzinleri

1. Paylaşılan klasöre sağ tıklayın > Özellikler > Paylaşım sekmesi
2. "Gelişmiş Paylaşım" düğmesine tıklayın
3. "İzinler" düğmesine tıklayın
4. "Herkes" (Everyone) kullanıcısının listede olduğundan ve en azından "Oku" izninin verildiğinden emin olun

### NTFS İzinleri

1. Aynı klasöre sağ tıklayın > Özellikler > Güvenlik sekmesi
2. Erişmesi gereken kullanıcı veya grubun listede olduğunu kontrol edin
3. Yoksa "Düzenle" > "Ekle" diyerek kullanıcıyı ekleyin

Her iki izin katmanı da doğru olmalıdır. Paylaşım izni "Tam Kontrol" olsa bile NTFS izni "Oku" değilse, dosya okunamaz.

## NAS Cihazına Erişim Sorunu

Ofiste NAS (Network Attached Storage — ağa bağlı depolama) cihazı kullanıyorsanız ve erişemiyorsanız:

1. NAS cihazının açık ve ağa bağlı olduğundan emin olun
2. NAS'ın IP adresini öğrenin (genelde NAS'ın yönetim panelinden bakılır)
3. `\\NAS-IP-adresi` şeklinde erişmeyi deneyin
4. NAS'ın SMB servisinin aktif olduğunu kontrol edin (NAS yönetim panelinden)
5. NAS üzerindeki kullanıcı hesabınızın ve izinlerinizin doğru olduğunu kontrol edin

NAS ve bulut depolama karşılaştırması için [NAS mı Bulut Depolama mı? rehberimize](/blog/nas-mi-bulut-depolama-mi) bakabilirsiniz.

## Hala Çözülmediyse

Tüm adımları denediyseniz ve hala erişemiyorsanız, sorun daha derin olabilir:

- Ağ donanımında (switch, kablo) fiziksel bir arıza olabilir
- Grup ilkesi (Group Policy) erişimi engelliyor olabilir
- DNS çözümleme sorunu olabilir
- Virüs veya zararlı yazılım ağ ayarlarını bozmuş olabilir

Bu durumda profesyonel destek almanız gerekir.

## Profesyonel Çözüm

Ağ paylaşımı sorunları basit görünür ama bazen altında karmaşık ağ yapılandırma sorunları yatar. Özellikle birden fazla bilgisayarın etkilendiği, sürekli tekrarlayan veya yeni kurulan ağlarda ortaya çıkan sorunlarda profesyonel destek zaman kazandırır.

**Kozyatağı Bilişim** olarak ofis ağ altyapınızı doğru şekilde kuruyor, paylaşım izinlerini düzenliyor ve sorunları hızla çözüyoruz. Düzgün kurulmuş bir ağda bu tür sorunlar neredeyse hiç yaşanmaz.

Ağ paylaşım sorunlarınız için bize ulaşın: **0541 636 77 75** | [kozyatagibilisim.com](https://kozyatagibilisim.com)

---

## Bu Rehberi de Okuyun:

- [NAS mı Bulut Depolama mı? Hangisi Size Uygun?](/blog/nas-mi-bulut-depolama-mi)
- [Ofiste İnternet Yavaş mı? Çözüm Rehberi](/blog/ofiste-internet-yavas)
- [Ağ Yazıcısı Nasıl Kurulur? Ofiste Yazıcı Paylaşma Rehberi](/blog/ag-yazicisi-kurulumu)
