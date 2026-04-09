---
slug: windows-mavi-ekran
title: "Windows Mavi Ekran Hatası: Sebepler ve Çözüm Yolları"
type: cluster
pillar: 8
url: "/blog/windows-mavi-ekran"
hedef_anahtar_kelime: "windows mavi ekran"
meta_title: "Windows Mavi Ekran Hatası — Sebepler ve Çözüm Yolları | Kozyatağı Bilişim"
meta_description: "Bilgisayarınız mavi ekran hatası mı veriyor? Sebepleri, hata kodları ve adım adım çözüm yöntemleri. Donanım ve yazılım sorunları için tam rehber."
kelime_sayisi: "~1700"
pillar_linki: "/yonetilen-it-hizmetleri"
---

Bilgisayarınızla rahatça çalışıyordunuz, sonra birden ekran maviye döndü, üzünç bir yüz ifadesi belirdi ve "Bilgisayarınız bir sorunla karşılaştı, yeniden başlatılıyor" yazdı. İngilizcesi BSOD (Blue Screen of Death — Mavi Ölüm Ekranı). Adı bile korkutucu. Bir daha mı olur, ne anlama gelir, bilgisayarımı kaybettim mi? Bu yazıda mavi ekran hatalarının ne anlama geldiğini, sebeplerini ve çözüm adımlarını ele alacağız.

## Mavi Ekran Tam Olarak Nedir?

Mavi ekran, Windows'un kendi kendine "ben artık güvenli çalışamıyorum" dediği andır. Bir hata ile karşılaştığında, daha fazla zarar vermemek için sistemi kapatır. Bu aslında bir koruma mekanizmasıdır — bilgisayar kapanmazsa donanıma veya verilere zarar verebilir.

## Mavi ekranlar iki kategoriye ayrılır:

Tek seferlik: Bir kez gördünüz, bir daha olmadı. Genelde geçici bir uyumsuzluk veya küçük bir hatadır. Endişelenmeye gerek yok. Tekrarlayan: Sürekli oluyor — günde birkaç kez veya belirli durumlarda. Bu ciddi bir sorundur ve mutlaka çözülmelidir.

## Hata Kodunu Not Edin

Mavi ekran çıktığında küçük yazıyla bir "stop kodu" gösterir. Şuna benzer:

## MEMORY_MANAGEMENT

IRQL_NOT_LESS_OR_EQUAL DPC_WATCHDOG_VIOLATION SYSTEM_THREAD_EXCEPTION_NOT_HANDLED PAGE_FAULT_IN_NONPAGED_AREA Bu kodlar size sorun hakkında ipucu verir. Telefonla ekranın fotoğrafını çekin veya kodu not edin — çözüm ararken çok işe yarar.

## Mavi Ekranın 8 Yaygın Sebebi

1. RAM Sorunu

RAM çubuğunuzdan biri arızalı veya gevşek olabilir. RAM sorunları çok yaygın bir mavi ekran sebebidir.

## Belirti kodları: MEMORY_MANAGEMENT, PAGE_FAULT_IN_NONPAGED_AREA

Çözüm: Windows'un kendi RAM testini çalıştırın:

1. Başlat menüsüne "Windows Bellek Tanılaması" yazın

2. "Şimdi yeniden başlat ve sorunları denetle" seçin

3. Bilgisayar yeniden başlar ve RAM testi yapar (15-30 dakika)

4. Test bittikten sonra Windows açılır ve sonuçları gösterir

Eğer RAM hatası bulunduysa, RAM çubuğunu fiziksel olarak değiştirmeniz gerekir. Birden fazla çubuğunuz varsa hangisinin bozuk olduğunu test ederek bulun (her seferinde bir tanesi takılı şekilde test).

2. Ekran Kartı Sürücüsü Sorunu

Ekran kartı sürücüsü mavi ekranların en yaygın yazılım sebebidir. Eski sürücü, yeni Windows ile uyumsuz sürücü veya bozuk sürücü. Belirti kodları: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED, VIDEO_TDR_FAILURE Çözüm: Ekran kartı üreticinizin sitesinden (NVIDIA, AMD, Intel) son sürücüyü indirip kurun. Eğer son sürücü zaten kurulmuşsa, eski bir sürüme dönmeyi deneyin (bazen yeni sürücüde hata olabilir).

3. Disk Sorunu

Sabit diskinizde (HDD veya SSD) bozulma var. Bu en kötü sebeplerden biridir çünkü veri kaybı tehlikesi taşır.

## Belirti kodları: NTFS_FILE_SYSTEM, KERNEL_DATA_INPAGE_ERROR

Çözüm: Hemen önemli verilerinizi yedekleyin. Sonra disk sağlığını kontrol edin:

1. Komut İstemini yönetici olarak açın

2. Şu komutu yazın: chkdsk C: /f /r

3. Yeniden başlatma istenirse "Y" deyin

4. Bilgisayarı yeniden başlatın, disk taraması başlar (1-3 saat)

Eğer hata bulunursa ve devam ediyorsa, disk yenilemesi gerekir. Veri kurtarma için profesyonel yardım alın.

4. Sürücü (Driver) Çakışması

Yeni bir donanım eklediniz, yeni bir sürücü kurdunuz, sistemde mavi ekranlar başladı. Klasik sürücü çakışması. Çözüm: Son yüklediğiniz donanımı/sürücüyü kaldırın. Eğer mavi ekranlar duruyorsa sebep bulundu demektir. Üreticiden farklı bir sürücü sürümü deneyin.

5. Aşırı Isınma

İşlemci veya ekran kartı çok ısınıyorsa, sistem kendi kendini korumak için kapanır ve mavi ekran verir. Özellikle yaz aylarında yaşanır. Belirti: Bilgisayar uzun süre çalıştıktan veya ağır iş yaptıktan sonra mavi ekran. Vantilatör sesi yüksek. Çözüm: Bilgisayarın iç temizliğini yaptırın (özellikle masaüstü). Termal macun değişimi etkilidir. Hwmonitor gibi ücretsiz programla sıcaklıkları kontrol edin (CPU 80°C'nin altında olmalı).

6. Güç Kaynağı Yetersiz veya Bozuk

Masaüstü bilgisayarlarda PSU (güç kaynağı) bozukluğu nadir ama olası bir sebeptir. Yetersiz güçle çalışan bileşenler beklenmedik davranışlar gösterir. Çözüm: Bu durum profesyonel teşhis gerektirir. Bir tamirciye götürmek en mantıklısı.

7. Windows Sistem Dosyaları Bozuk

Windows'un kendi dosyaları bozulmuş olabilir.

## Çözüm: Sistem Dosyası Denetleyicisi'ni çalıştırın:

1. Komut İstemini yönetici olarak açın

2. Şu komutu yazın: sfc /scannow

3. Tarama 15-30 dakika sürer, bittiğinde sonuçları gösterir

4. Eğer hatalar bulunup düzeltilemezse: DISM /Online /Cleanup-Image /RestoreHealth

komutunu çalıştırın

8. Virüs veya Zararlı Yazılım

Bazı zararlı yazılımlar sistem dosyalarına müdahale ederek mavi ekranlara sebep olur. Bilgisayara virüs bulaştı yazımız bu konuda rehber sunar. Çözüm: Tam virüs taraması yapın. Windows Defender ile başlayın, sonra Malwarebytes ile ikinci tarama yapın.

## Tekrarlayan Mavi Ekranlar İçin Adım Adım Yaklaşım

Mavi ekran sürekli oluyorsa şu sırayla ilerleyin:

## Adım 1: Hata Kodunu Not Edin

Birkaç mavi ekran sırasında hata kodlarına bakın. Hep aynı kod mu çıkıyor, farklılar mı? Aynıysa sorun spesifik bir şey, farklıysa donanım sorunu olma ihtimali yüksek.

## Adım 2: Son Değişikliği Hatırlayın

Mavi ekranlar başlamadan önce ne değişti? Yeni bir donanım, yeni bir program, yeni bir Windows güncellemesi? Son değişikliği geri alarak deneyin.

## Adım 3: Sistem Geri Yükleme

Windows otomatik olarak "sistem geri yükleme noktaları" oluşturur. Bilgisayarı bir hafta önceki haline döndürebilirsiniz (kişisel dosyalarınız etkilenmez, sadece sistem ayarları).

1. Başlat > "Sistem Geri Yükleme" yazın

2. "Sistem Geri Yükleme Oluştur" seçeneğini açın

3. "Sistem Geri Yükleme..." butonuna basın

4. Mavi ekranlar başlamadan önceki bir tarihi seçin

Adım 4: Donanım Testleri RAM testi (yukarıda anlatıldı), disk sağlığı (CrystalDiskInfo), CPU/GPU sıcaklık testi (HWMonitor) — hepsini sırayla yapın.

## Adım 5: Temiz Önyükleme

Windows'u sadece minimum servislerle başlatın. Sorun çözülürse üçüncü parti bir yazılımdadır.

1. Windows + R, "msconfig" yazın

2. "Hizmetler" sekmesi

3. "Tüm Microsoft hizmetlerini gizle" işaretleyin

4. "Tümünü Devre Dışı Bırak" deyin

5. Yeniden başlatın

Adım 6: Windows'u Yeniden Yükle Tüm denemelere rağmen sorun devam ediyorsa, son çare temiz Windows kurulumudur. Verilerinizi yedeklemeyi unutmayın.

## Mavi Ekran Olduğunda Ne Yapmamak Lazım?

Panik yapmayın. Tek bir mavi ekran genelde sorun değildir. Hemen format atmayın. Bu son çaredir, önce sebebi anlayın. Bilinmeyen "tamir" araçlarına güvenmeyin. "Bilgisayarınızı düzeltir" diyen şüpheli sitelerden program indirmeyin — kendileri zararlı yazılım olabilir. Donanımları gelişigüzel sökmeyin. Uzman değilseniz fiziksel müdahale daha kötüsünü yapabilir.

## Şirket Bilgisayarınızda Mavi Ekran Çıkıyorsa

Mavi ekran şirket bilgisayarında çok kritiktir çünkü o anki çalıştığınız iş kaybolabilir. Eğer şirket bilgisayarınızda mavi ekran sıkça oluyorsa derhal IT'ye bildirin. Tek seferlik bile olsa not alınmalıdır çünkü tekrar olabilir. Birden fazla çalışanın bilgisayarında mavi ekran çıkıyorsa, durum daha vahimdir — donanım partisi sorunu, ortak yazılım sorunu veya virüs ihtimali var. Profesyonel bir destek bu sorunları sistematik olarak çözer ve veri kaybını önler. Düzenli yedekleme ile birlikte mavi ekran sorunları çok daha az stres yaratır.

## Sıkça Sorulan Sorular

Mavi ekrandan dolayı verilerimi kaybeder miyim? Çoğu zaman hayır. Mavi ekran sırasında açık olan dosyalar kaybedilebilir (kaydedilmemişler). Ama disk içindeki kayıtlı dosyalarınız etkilenmez, sürece bağlı bir ifadedir. Eğer disk sorunu varsa veri kaybı olabilir — bu yüzden mavi ekranın sebebini bilmek önemli.

## Yeni aldığım bilgisayarda mavi ekran çıkıyor, garanti?

Evet, yeni bir bilgisayarda mavi ekran çıkması üreticinin sorunudur. Hemen satıcıya götürün, donanım testi isteyin. Yeni bilgisayarlarda mavi ekran sürücü uyumsuzluğundan da olabilir, ama her halükarda satıcıyla konuşun.

## Mavi ekran kodlarını nereden araştırabilirim?

Hata kodunu Microsoft Learn sitesinde aratabilirsiniz, resmi açıklaması var. Üçüncü parti site BlueScreenView de kodları analiz eder. Ama uzman değilseniz, kodu IT'nize iletmek ve çözümü onlardan beklemek daha güvenli.

## Sürücüleri otomatik güncelleyen programlara güvenmeli miyim?

Genelde hayır. "Driver Booster" gibi ücretsiz programlar bazen yanlış veya zararlı sürücüler kurar. Sürücüyü her zaman donanım üreticisinin kendi sitesinden indirin (NVIDIA için nvidia.com gibi).

## Şirketinizdeki Mavi Ekran ve Donanım Sorunlarına Profesyonel Yaklaşım

Eğer şirketinizdeki bilgisayarlarda mavi ekran veya donanım sorunları sıkça yaşanıyorsa, derinlemesine bir incelemeye ihtiyacınız var demektir. Ücretsiz keşif görüşmesinde durumu birlikte değerlendirelim.

## Ücretsiz Keşif Planla →

## Sonuç

Mavi ekran hataları korkutucu görünür ama çoğu zaman çözülebilir. Önemli olan paniklemek değil, sistemli yaklaşmaktır. Hata kodunu not edin, yaygın sebepleri kontrol edin, donanım testleri yapın. Tek seferlik mavi ekranlar genelde önemsizdir, tekrarlayanlar ise mutlaka çözülmelidir. Şirket ortamında mavi ekran sorunları profesyonel müdahaleyle çok daha hızlı çözülür. Bilgisayar çok yavaş yazımız da donanım sağlığı konusunda yararlı olabilir. Profesyonel destek için Son Kullanıcı Destek Hattı hizmetimiz mevcut.

## VERİ KAYBI

13. Yanlışlıkla Sildiğim Dosyaları Geri Getirme Yolları
