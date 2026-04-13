---
slug: ag-yazicisi-kurulumu
title: "Ağ Yazıcısı Nasıl Kurulur? Ofiste Yazıcı Paylaşma Rehberi"
type: cluster
pillar: 6
url: "/blog/ag-yazicisi-kurulumu"
hedef_anahtar_kelime: "ağ yazıcısı kurulumu"
meta_title: "Ağ Yazıcısı Nasıl Kurulur? Ofiste Yazıcı Paylaşma Rehberi | Kozyatağı Bilişim"
meta_description: "Ofiste bir yazıcıyı tüm bilgisayarlardan kullanmak mı istiyorsunuz? Ağ yazıcısı kurulumu ve paylaşım ayarları adım adım."
kelime_sayisi: "~1700"
pillar_linki: "/kurumsal-network-kurulumu"
---

Ofiste 5 bilgisayar var ama yazıcı bir tane. Yazıcı muhasebecinin bilgisayarına USB kablosuyla bağlı. Satıştan birisi bir şey yazdırmak istediğinde dosyayı USB belleğe kopyalayıp muhasebecinin bilgisayarına gidiyor. Ya da dosyayı e-posta ile gönderiyor. Bu sahne size tanıdık geliyorsa, ofisinizdeki yazıcıyı ağ yazıcısı haline getirmenin zamanı gelmiş demektir. Ağ yazıcısı sayesinde ofisteki her bilgisayardan doğrudan yazdırma yapabilirsiniz — dosya kopyalamaya, USB belleğe, başkasının bilgisayarına gitmeye gerek kalmaz.

Bu rehberde yazıcınızı ağ yazıcısına nasıl dönüştüreceğinizi ve tüm bilgisayarlardan nasıl yazdıracağınızı adım adım anlatacağız.

## İki Farklı Yöntem Var

Yazıcıyı ofisteki herkesin kullanabilmesi için iki temel yöntem vardır:

### Yöntem 1: USB Yazıcıyı Paylaşma

Yazıcınız USB ile bir bilgisayara bağlıysa, o bilgisayar üzerinden yazıcıyı "paylaşıma açarsınız." Diğer bilgisayarlar ağ üzerinden o bilgisayara bağlanarak yazıcıyı kullanır.

**Avantajı:** Ek donanım gerektirmez, mevcut yazıcınızla yapabilirsiniz.

**Dezavantajı:** Yazıcının bağlı olduğu bilgisayar kapalıysa kimse yazdıramaz. O bilgisayar her zaman açık olmalıdır.

### Yöntem 2: Ağ Yazıcısı (Doğrudan Ağa Bağlı)

Yazıcınızda Ethernet (ağ kablosu) girişi veya Wi-Fi özelliği varsa, yazıcıyı doğrudan ağa bağlarsınız. Hiçbir bilgisayara USB ile bağlamaya gerek kalmaz. Yazıcı bağımsız bir ağ cihazı olarak çalışır.

**Avantajı:** Hiçbir bilgisayara bağımlı değildir. Yazıcı açık olduğu sürece herkes yazdırabilir.

**Dezavantajı:** Yazıcınızın ağ özelliğinin olması gerekir (çoğu modern ofis yazıcısında vardır).

## Yöntem 1: USB Yazıcıyı Ağda Paylaşma

### Yazıcının Bağlı Olduğu Bilgisayarda Yapılacaklar

1. **Yazıcının çalıştığından emin olun.** Önce o bilgisayardan bir test sayfası yazdırın. Yazıcı düzgün çalışmıyorsa paylaşmanın da bir anlamı yok.

2. **Paylaşım ayarlarını açın:**
   - Başlat > Ayarlar > Bluetooth ve cihazlar > Yazıcılar ve tarayıcılar bölümüne gidin
   - Paylaşmak istediğiniz yazıcıya tıklayın
   - "Yazıcı özellikleri" seçeneğine tıklayın
   - "Paylaşım" sekmesine geçin
   - "Bu yazıcıyı paylaştır" kutucuğunu işaretleyin
   - Paylaşım adını basit ve anlaşılır tutun (boşluk ve Türkçe karakter kullanmamaya çalışın), örneğin: "MUHASEBE-YAZICI"
   - "Tamam" düğmesine tıklayın

3. **Ağ paylaşımının açık olduğundan emin olun:** Denetim Masası > Ağ ve Paylaşım Merkezi > Gelişmiş paylaşım ayarlarını değiştirin. "Dosya ve yazıcı paylaşımı" seçeneğinin açık olduğunu kontrol edin. Paylaşılan klasör erişimi konusunda sorun yaşıyorsanız [paylaşılan klasör rehberimize](/blog/paylasilan-klasore-erisilemiyor) bakabilirsiniz.

### Diğer Bilgisayarlardan Yazıcıya Bağlanma

1. Başlat > Ayarlar > Bluetooth ve cihazlar > Yazıcılar ve tarayıcılar bölümüne gidin
2. "Cihaz ekle" düğmesine tıklayın
3. Windows ağdaki yazıcıları arayacak. Paylaşılan yazıcı listede görünürse tıklayın ve ekleyin.
4. Listede görünmezse "El ile ekle" veya "İstediğim yazıcı listelenmiyor" seçeneğini tıklayın
5. "Ada göre paylaşılan yazıcı seç" seçeneğini işaretleyin
6. Alana yazıcının ağ yolunu yazın: `\\BILGISAYAR-ADI\MUHASEBE-YAZICI`
7. "İleri" düğmesine tıklayın
8. Sürücü (driver) yüklemesi gerekebilir — Windows otomatik olarak yükleyecektir, "Yükle" diyerek devam edin
9. Test sayfası yazdırarak bağlantıyı doğrulayın

Bu işlemi ofisteki her bilgisayarda tekrarlamanız gerekir.

## Yöntem 2: Yazıcıyı Doğrudan Ağa Bağlama

### Ethernet (Kablolu) Bağlantı

1. **Yazıcıyı ağa bağlayın:** Yazıcının arkasındaki Ethernet (RJ45) girişine bir ağ kablosu takın. Kablonun diğer ucunu ofisteki switch veya modem'e takın.

2. **Yazıcının IP adresini öğrenin:** Çoğu yazıcı ağa bağlandığında otomatik olarak IP adresi alır. IP adresini öğrenmek için:
   - Yazıcının kontrol panelinden: Ayarlar > Ağ Ayarları > IP Adresi bölümüne bakın (yazıcıya göre değişir)
   - Veya yazıcının üzerindeki bilgi/rapor düğmesine basarak bir yapılandırma sayfası yazdırın — bu sayfada IP adresi yazar
   - Örnek: 192.168.1.100

3. **IP adresini sabitlemek iyi bir fikirdir.** Yazıcının IP adresi değişirse tüm bilgisayarlarda bağlantı kopar. Yazıcının kendi menüsünden veya modem/router'ın yönetim panelinden IP adresini sabitleyebilirsiniz (DHCP rezervasyon).

### Wi-Fi Bağlantı

1. Yazıcının kontrol panelinden Wi-Fi ayarlarına girin
2. Ofis Wi-Fi ağınızı seçin ve şifresini girin
3. Bağlantı kurulduktan sonra IP adresini öğrenin (yukarıdaki adımlarla)

**Tavsiye:** Mümkünse kablolu bağlantı tercih edin. Wi-Fi bağlantıda yazıcı zaman zaman ağdan düşebilir, sinyal zayıfsa yazdırma işleri beklemede kalabilir. [Wi-Fi sinyal sorunları için bu rehbere bakabilirsiniz](/blog/wifi-sinyali-zayif).

### Bilgisayarlardan Ağ Yazıcısına Bağlanma

1. Başlat > Ayarlar > Bluetooth ve cihazlar > Yazıcılar ve tarayıcılar > "Cihaz ekle"
2. Windows ağdaki yazıcıyı otomatik bulabilir — listede görünürse tıklayıp ekleyin
3. Bulamazsa "İstediğim yazıcı listelenmiyor" seçeneğini tıklayın
4. "TCP/IP adresi veya ana bilgisayar adı kullanarak yazıcı ekle" seçeneğini işaretleyin
5. "Ana bilgisayar adı veya IP adresi" alanına yazıcının IP adresini yazın (örneğin 192.168.1.100)
6. "İleri" düğmesine tıklayın
7. Windows yazıcının sürücüsünü otomatik bulabilir. Bulamazsa yazıcının markası ve modelini seçmeniz veya üreticinin web sitesinden sürücü indirmeniz gerekir.
8. Kurulum tamamlanınca test sayfası yazdırın

## Sürücü (Driver) Kurulumu

Yazıcı sürücüsü, bilgisayarın yazıcıyla "konuşmasını" sağlayan yazılımdır. Sürücü olmadan bilgisayar yazıcıya ne yapacağını söyleyemez. Sürücü sorunları en sık yaşanan yazıcı problemlerindendir:

### Windows Otomatik Sürücü Bulamazsa

1. Yazıcınızın markasını ve tam modelini öğrenin (genelde yazıcının üzerinde yazar)
2. Üreticinin web sitesine gidin (hp.com, canon.com.tr, epson.com.tr, brother.com gibi)
3. "Destek" veya "Sürücüler" bölümüne gidin
4. Yazıcı modelinizi arayın
5. Windows sürümünüze uygun sürücüyü indirin (Windows 10 64-bit, Windows 11 64-bit gibi)
6. İndirilen dosyayı çalıştırıp kurulumu tamamlayın
7. Kurulumdan sonra yazıcıyı tekrar eklemeyi deneyin

### Eski Yazıcılarda Sürücü Sorunu

Çok eski yazıcılar için Windows 10/11 sürücüsü bulunmayabilir. Bu durumda "uyumlu sürücü" deneyebilirsiniz — Windows'un kendi sürücü listesinde aynı seriden bir model seçmek bazen işe yarar. Ancak tüm özellikler çalışmayabilir.

## Tarama (Scan) Ayarları

Çok fonksiyonlu yazıcılarda (yazdırma + tarama + fotokopi) tarama özelliği de ağ üzerinden kullanılabilir:

1. **Yazıcının web arayüzüne girin:** Tarayıcıya yazıcının IP adresini yazın (örneğin http://192.168.1.100). Yazıcının yönetim paneli açılacak.

2. **Tarama hedeflerini ayarlayın:** Çoğu ağ yazıcısında "Scan to Folder" (Klasöre Tara) veya "Scan to Email" (E-postaya Tara) seçenekleri vardır.
   - **Klasöre tarama:** Bilgisayarınızda paylaşılan bir klasör oluşturup, yazıcının taradığı belgeleri otomatik olarak o klasöre kaydetmesini sağlarsınız.
   - **E-postaya tarama:** Yazıcı taradığı belgeyi doğrudan e-posta adresinize gönderir (SMTP ayarları gerektirir).

3. **Bilgisayardan tarama:** Yazıcının sürücüsüyle birlikte gelen tarama yazılımını kurun. Bu yazılım üzerinden "Tara" düğmesine bastığınızda yazıcı belgeyi tarar ve bilgisayarınıza gönderir.

## Sık Karşılaşılan Yazıcı Sorunları

### "Yazıcı çevrimdışı" Hatası

Yazıcı açık ve bağlı olduğu halde "çevrimdışı" görünüyorsa:

1. Ayarlar > Yazıcılar bölümünde yazıcıya sağ tıklayın
2. "Yazdırma kuyruğunu aç" seçin
3. Üst menüden "Yazıcı" menüsüne tıklayın
4. "Yazıcıyı Çevrimdışı Kullan" seçeneğinin işaretli olmadığından emin olun
5. İşaretliyse tıklayarak kaldırın

### Yazdırma İşleri Kuyrukta Bekliyor

Bazen yazdırma işleri kuyrukta takılır ve yeni işler de birikir:

1. Ayarlar > Yazıcılar bölümünde yazıcıya sağ tıklayın
2. "Yazdırma kuyruğunu aç" seçin
3. Bekleyen tüm işleri seçip silin
4. Tekrar yazdırmayı deneyin

Kuyruktaki işler silinmiyorsa: Başlat menüsüne "Hizmetler" yazıp açın, "Yazdırma Biriktiricisi" (Print Spooler) hizmetini bulun, sağ tıklayıp "Yeniden başlat" seçin.

### Yazıcı Bulunamıyor

Ağ yazıcısını eklemeye çalışıyorsunuz ama Windows bulamıyor:

- Yazıcının ağa bağlı olduğunu doğrulayın (Ethernet kablosu takılı mı, Wi-Fi bağlı mı)
- Yazıcının IP adresini ping ile test edin: Komut isteminde `ping 192.168.1.100` yazın. Yanıt geliyorsa yazıcı ağda görünüyor demektir.
- Güvenlik duvarının yazıcı bağlantısını engellemediğini kontrol edin
- IP adresini doğrudan yazarak eklemeyi deneyin (yukarıdaki TCP/IP yöntemi)

## Print Server (Yazdırma Sunucusu) Nedir?

Büyük ofislerde birden fazla yazıcı varsa ve onlarca bilgisayardan yazdırılıyorsa, "yazdırma sunucusu" kullanılır. Bu, basitçe söylemek gerekirse, tüm yazdırma işlerini yöneten merkezi bir bilgisayar veya cihazdır. Avantajları:

- Tüm yazıcılar tek bir yerden yönetilir
- Yeni bir bilgisayar eklendiğinde yazıcıları tek tek kurmak yerine otomatik dağıtılır
- Kim ne kadar yazdırmış takip edilebilir
- Sorun olduğunda tek bir yerden müdahale edilir

Küçük ofisler (5-10 bilgisayar) için genelde print server'a gerek yoktur. 15-20 bilgisayardan fazlaysa düşünmeye değer.

## Profesyonel Kurulum

Bir-iki bilgisayar için yazıcı paylaşımını kendiniz yapabilirsiniz. Ancak ofis genelinde düzgün çalışan, sorunsuz bir yazıcı altyapısı kurmak için doğru ağ yapılandırması, sürücü yönetimi ve güvenlik ayarları gerekir.

**Kozyatağı Bilişim** olarak ofisinizdeki yazıcıları ağa bağlıyor, tüm bilgisayarlardan erişimi yapılandırıyor ve tarama ayarlarını kuruyoruz. Yazıcı sorunlarınız için de uzaktan veya yerinde destek veriyoruz.

Yazıcı kurulumu ve ofis ağ altyapısı için bize ulaşın: **0541 636 77 75** | [kozyatagibilisim.com](https://kozyatagibilisim.com)

---

## Bu Rehberi de Okuyun:

- [Paylaşılan Klasöre Erişilemiyor: Çözüm Rehberi](/blog/paylasilan-klasore-erisilemiyor)
- [Ofiste İnternet Yavaş mı? Çözüm Rehberi](/blog/ofiste-internet-yavas)
- [Wi-Fi Sinyali Zayıf mı? Çözüm Rehberi](/blog/wifi-sinyali-zayif)
