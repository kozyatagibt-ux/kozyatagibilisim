---
slug: windows-sifre-unuttum-hesap-kilitlendi
title: "Windows Şifremi Unuttum / Hesabım Kilitlendi: Şirket Bilgisayarında Çözüm"
type: cluster
pillar: 8
url: "/blog/windows-sifre-unuttum-hesap-kilitlendi"
hedef_anahtar_kelime: "windows şifre unuttum şirket bilgisayar"
meta_title: "Windows Şifre Unuttum / Hesap Kilitlendi — Çözüm Rehberi 2026 | Kozyatağı Bilişim"
meta_description: "Şirket bilgisayarınızda Windows şifrenizi mi unuttunuz? Hesabınız kilitlendi mi? Domain ve yerel hesap için şifre sıfırlama yöntemleri."
kelime_sayisi: "~1500"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Pazartesi sabahı ofise geldiniz, bilgisayarı açtınız, şifrenizi girdiniz ve ekranda "Parola yanlış" uyarısı çıktı. Tekrar denediniz, yine olmadı. Üçüncü denemede hesabınız kilitlendi. Artık hiçbir şifre girmenize izin verilmiyor. Toplantınız 15 dakika sonra başlıyor, sunumunuz bilgisayarın içinde ve siz giriş ekranında takılı kaldınız. Bu sahne dünya genelinde IT destek ekiplerinin aldığı bir numaralı çağrıdır. Araştırmalar, tüm helpdesk taleplerinin yüzde 51'inin şifre sıfırlama ve hesap kilitleme sorunlarından oluştuğunu gösteriyor. Yani bu başınıza geldiyse yalnız değilsiniz; her gün milyonlarca çalışan aynı durumu yaşıyor.

## Önce Şunu Anlayın: Hangi Tür Hesap Kullanıyorsunuz?

Şirket bilgisayarında iki farklı hesap türü olabilir ve çözüm yolu ikisi için tamamen farklıdır. Doğru yöntemi uygulamak için önce hesap türünüzü belirlemeniz gerekiyor.

### Yerel (Local) Hesap

Bilgisayarınız bir şirket ağına (domain) bağlı değilse, kullandığınız hesap büyük ihtimalle yerel hesaptır. Giriş ekranında sadece kullanıcı adınız yazar, altında bir şirket adı veya domain bilgisi bulunmaz. Küçük ofislerde, ev ofislerinde veya bağımsız çalışan bilgisayarlarda bu tür hesap yaygındır.

### Domain (Active Directory) Hesabı

Bilgisayarınız şirketin Active Directory sunucusuna bağlıysa, giriş ekranında genellikle "SIRKETADI\kullaniciadi" formatında veya "kullaniciadi@sirketadi.com" formatında bir bilgi görürsünüz. Bu durumda şifreniz bilgisayarınızda değil, merkezi bir sunucuda tutulur. Kurumsal şirketlerde, 10 ve üzeri çalışanı olan ofislerde bu yapı standart olarak kullanılır.

Eğer hangisini kullandığınızdan emin değilseniz, giriş ekranındaki bilgilere bakın. "Oturum açma hedefi" ifadesinin yanında bir sunucu adı görüyorsanız domain hesabındasınız demektir.

## Domain Hesabında Şifre Sıfırlama

Domain hesabınızın şifresini unuttuysanız veya hesabınız kilitlendiyse, çözüm basittir ama siz kendiniz yapamazsınız: IT yöneticinizi veya sistem yöneticinizi aramanız gerekiyor. Şifreniz merkezi bir sunucuda (Active Directory) tutulduğu için, sadece o sunucuya erişimi olan yetkili kişi şifrenizi sıfırlayabilir.

IT yöneticiniz Active Directory Users and Computers aracını açar, hesabınızı bulur, "Hesap kilidi kaldır" seçeneğini işaretler ve size yeni bir geçici şifre verir. Siz de ilk girişte bu geçici şifreyi değiştirirsiniz. Bu işlem IT tarafında 2 dakika sürer.

Peki ya IT ekibinize ulaşamıyorsanız? IT yöneticiniz izindeyse veya ulaşılamıyorsa, işler karmaşıklaşır. Bu nedenle ileride bahsedeceğimiz Self-Service Password Reset (SSPR) çözümü büyük önem taşıyor.

Active Directory yapılandırması hakkında detaylı bilgi için [Active Directory KOBİ rehberimizi](/blog/active-directory-kobi-rehberi) inceleyebilirsiniz.

## Yerel Hesapta Şifre Sıfırlama Yöntemleri

Yerel hesap kullanıyorsanız birkaç farklı yöntem deneyebilirsiniz.

### Microsoft Hesabıyla Sıfırlama

Windows 10 ve 11'de bilgisayarınızı bir Microsoft hesabıyla (Outlook, Hotmail gibi) ilişkilendirdiyseniz, giriş ekranında "Parolamı unuttum" bağlantısına tıklayarak şifrenizi sıfırlayabilirsiniz. Telefonunuzdan account.live.com adresine giderek de aynı işlemi yapabilirsiniz. Microsoft size e-posta veya SMS ile doğrulama kodu gönderir, yeni şifre belirlersiniz ve bilgisayarınıza bu yeni şifreyle giriş yaparsınız. Bu yöntem çalışması için bilgisayarın internete bağlı olması gerekir.

### Güvenlik Soruları

Windows 10 sürüm 1803 ve sonrasında yerel hesap oluştururken güvenlik soruları belirlemiş olabilirsiniz. Giriş ekranında yanlış şifre girdikten sonra "Parolayı sıfırla" seçeneği çıkar. Güvenlik sorularını doğru yanıtlarsanız yeni şifre belirleyebilirsiniz.

### Parola Sıfırlama Diski

Daha önce bir USB belleğe parola sıfırlama diski oluşturduysanız, giriş ekranında bu USB'yi takarak şifrenizi sıfırlayabilirsiniz. Ancak bu diski sorun yaşanmadan önce oluşturmuş olmanız gerekir. Çoğu kullanıcı bunu yapmadığı için pratikte en az kullanılan yöntemdir.

### Safe Mode ile Gizli Administrator Hesabı

Windows kurulumunda varsayılan olarak devre dışı bırakılmış bir Administrator hesabı bulunur. Teknik bilginiz varsa, bilgisayarı Güvenli Mod'da başlatarak bu hesaba erişmeyi deneyebilirsiniz. Ancak bu yöntem her zaman çalışmaz ve yanlış uygulandığında sisteme zarar verebilir. Emin değilseniz profesyonel destek almanızı öneririz.

## Hesap Neden Kilitlenir? Gerçek Sebepler

Birçok kişi "Ben yanlış şifre girmedim ama hesabım kilitleniyor" diye şikayet eder. Haklı olabilirler, çünkü hesap kilitlemenin en sinsi sebepleri arka planda çalışan eski şifrelerdir.

### Eski Şifreler Cihazlarda Kayıtlı Kalır

Şifrenizi değiştirdiniz ama telefonunuzdaki e-posta uygulaması hala eski şifreyle bağlanmaya çalışıyor. Her deneme başarısız oluyor ve Active Directory bunu "yanlış şifre girişimi" olarak sayıyor. 3-5 başarısız denemeden sonra hesabınız otomatik olarak kilitleniyor.

Bu soruna sebep olan kaynaklar genellikle şunlardır:

- Telefondaki Outlook veya Mail uygulaması
- Tarayıcıda kayıtlı eski şifreler
- VPN istemcisi eski şifreyle bağlanmaya çalışıyor
- Ağ sürücüleri (mapped drives) eski kimlik bilgileriyle bağlanıyor
- Paylaşılan yazıcılar eski şifre kullanıyor
- Zamanlanmış görevler (scheduled tasks) eski hesap bilgileriyle çalışıyor

### Kilitlenme Politikası Çok Katı Ayarlanmış

Bazı şirketlerde güvenlik politikası 3 yanlış girişten sonra hesabı kilitlemeye ayarlanmıştır. Bu sayı çok düşükse, normal kullanımda bile yanlışlıkla kilitlenme ihtimali artar. Güvenlik ve kullanılabilirlik arasında denge kurulmalıdır. Genelde 5 yanlış giriş ve 15-30 dakika otomatik kilit açma süresi makul bir dengededir.

### Şifre Süresi Dolmuş Ama Kullanıcı Fark Etmemiş

Domain ortamlarında şifreler genellikle 60-90 günde bir değiştirilmek zorundadır. Şifre süresinin dolacağını bildiren uyarılar genellikle 14 gün önceden çıkmaya başlar ama çoğu kullanıcı bu uyarıyı "sonra yaparım" diye kapatır. Şifre süresi dolduktan sonra giriş yapamazsınız.

## Self-Service Password Reset: Kalıcı Çözüm

Her şifre sıfırlama talebi IT ekibinin iş yükünü artırır ve çalışanın verimliliğini düşürür. Microsoft 365 Business Premium veya Azure AD P1 lisansı kullanan şirketler, Self-Service Password Reset (SSPR) özelliğini aktif edebilir.

SSPR ile çalışanlar, IT ekibini aramadan kendi şifrelerini sıfırlayabilir. Giriş ekranında "Parolamı unuttum" bağlantısına tıklarlar, daha önce kayıt ettikleri telefon numarasına veya alternatif e-posta adresine doğrulama kodu gönderilir ve yeni şifre belirlerler. Bu işlem 2 dakikada tamamlanır ve IT ekibini meşgul etmez.

SSPR kurulumu için yapmanız gerekenler:

1. Azure AD portalından SSPR özelliğini etkinleştirin
2. Tüm çalışanların kimlik doğrulama yöntemlerini (telefon, alternatif e-posta) kaydetmelerini sağlayın
3. Çalışanlara SSPR kullanımını gösteren kısa bir eğitim verin
4. İlk 1-2 hafta IT ekibinin de hazır bulunmasını sağlayın

## Şifre Sorunlarını Önlemek İçin 5 Pratik İpucu

Şifre sorunlarını tamamen ortadan kaldıramazsınız ama sıklığını büyük ölçüde azaltabilirsiniz.

### Şifre Yöneticisi Kullanın

Her sisteme farklı şifre belirlemek yerine, bir şifre yöneticisi uygulaması kullanın. Tek bir ana şifre hatırlarsınız, diğer şifreleri uygulama güvenli şekilde saklar.

### Şifre Değişikliğinde Tüm Cihazları Güncelleyin

Şifrenizi değiştirdiğinizde mutlaka telefonunuzdaki e-posta uygulamasını, VPN istemcisini ve tarayıcıda kayıtlı şifreleri de güncelleyin. Aksi takdirde eski şifrelerle bağlanmaya çalışan cihazlar hesabınızı kilitler.

### Şifre Süreleri Hakkında Hatırlatma Kurun

IT yöneticinizden şifre süresi dolmadan 14 gün önce e-posta hatırlatması ayarlamasını isteyin. Takvime de not düşebilirsiniz.

### Güvenlik Sorularını ve Kurtarma Bilgilerini Güncel Tutun

Microsoft hesabınıza bağlı telefon numaranızı ve alternatif e-posta adresinizi güncel tutun. Telefon değiştirdiğinizde bu bilgileri güncellemeyi unutmayın.

### PIN ve Biyometrik Giriş Kullanın

Windows Hello ile parmak izi, yüz tanıma veya PIN kullanarak giriş yapabilirsiniz. PIN yerel olarak cihazda tutulur ve Active Directory şifresinden bağımsızdır. Bu sayede şifreniz kilitlense bile PIN ile giriş yapabilirsiniz.

## Çalışan Ayrıldığında Şifre Yönetimi

Bir çalışan şirketten ayrıldığında hesabının devre dışı bırakılması güvenlik açısından kritiktir. Ayrılan çalışanın şifresi bilinse bile hesap devre dışı bırakılmalı, paylaşılan şifreler değiştirilmeli ve erişim yetkileri kaldırılmalıdır. Bu süreç hakkında [çalışan ayrıldığında IT süreci rehberimizi](/blog/calisan-ayrildiginda-it-sureci) okumanızı tavsiye ederiz.

## Profesyonel Destek Ne Zaman Gerekli?

Eğer yerel hesap yöntemlerinin hiçbiri işe yaramıyorsa, bilgisayarınızda şifreleme (BitLocker) aktifse veya birden fazla çalışanın hesabı aynı anda kilitleniyorsa, profesyonel IT desteği almanız gerekir. BitLocker aktif olan bir bilgisayarda şifre sıfırlamayı yanlış yapmak, tüm verilerinizi kaybetmenize neden olabilir.

Kozyatağı Bilişim olarak şirketinizin Active Directory yapılandırmasını, SSPR kurulumunu ve şifre politikalarını profesyonel şekilde yönetiyoruz. Şifre sorunları yüzünden kaybedilen saatleri sıfıra indirmek için bize ulaşın.

**Hemen arayın: [0541 636 77 75](tel:05416367775)**
**Web: [kozyatagibilisim.com](https://kozyatagibilisim.com)**

---

Bu rehberi de okuyun:

- [Active Directory Nedir? KOBİ Rehberi](/blog/active-directory-kobi-rehberi)
- [Çalışan Ayrıldığında IT Süreci](/blog/calisan-ayrildiginda-it-sureci)
- [KOBİ IT Helpdesk Rehberi](/blog/kobi-it-helpdesk-rehberi)
