---
slug: yeni-calisan-it-onboarding
title: "Yeni Çalışan Geldi, IT Tarafında Ne Yapılmalı? Onboarding Checklist"
type: cluster
pillar: 1
url: "/blog/yeni-calisan-it-onboarding"
hedef_anahtar_kelime: "yeni çalışan IT onboarding"
meta_description: "Şirkete yeni biri mi başlıyor? Bilgisayar, e-posta, erişim yetkileri, yazıcı ve güvenlik ayarları için eksiksiz IT onboarding checklist."
kelime_sayisi: "~1700"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## İlk Gün Kaosa Dönmesin

Yeni çalışanınız pazartesi başlıyor. Cuma günü İK bunu size bildirdi. Pazartesi sabahı çalışan geldi, masasına oturdu ve sordu: "Bilgisayarım hangisi?"

Bilgisayar henüz hazırlanmamış. E-posta hesabı açılmamış. Yazıcı tanıtılmamış. VPN erişimi yok. Office lisansı atanmamış. Çalışan ilk gününü koltuğunda oturup telefonuna bakarak geçirdi.

Bu senaryo Türkiye'deki KOBİ'lerin %70'inde yaşanıyor. Çünkü IT onboarding süreci tanımlı değil. Her seferinde "bir şeyler yapılıyor" ama standart bir checklist yok.

Sonuç: çalışan ilk haftasında verimsiz kalıyor, IT ekibi acil modda çalışıyor, güvenlik adımları atlanıyor ve 6 ay sonra ayrılan çalışanın hesapları hala açık kalıyor.

Bu rehberde, yeni bir çalışanın ilk gününden itibaren sorunsuz çalışabilmesi için gerekli IT onboarding checklist'ini ve bir çalışan ayrıldığında yapılması gerekenleri paylaşıyoruz.

## İlk Günden Önce: Hazırlık (En Az 3 İş Günü Öncesinden)

İK departmanı yeni çalışan bilgisini IT'ye en az 3 iş günü öncesinden iletmelidir. Bu süre içinde yapılacaklar:

### Bilgisayar Hazırlığı

- **Bilgisayar tedarik veya tahsis:** Yeni mi alınacak, mevcut stoktan mı verilecek? Eğer yeni alınacaksa tedarik süresi 3-7 gün olabilir — erken planlayın.
- **İşletim sistemi kurulumu:** Windows 11 Pro, en son güncellemeler yüklü.
- **Temel yazılımlar:** Office 365 (veya Google Workspace uygulamaları), şirket muhasebe yazılımı, tarayıcı, PDF okuyucu, şirketin kullandığı diğer uygulamalar.
- **Antivirüs kurulumu:** Şirket standart antivirüs yazılımı yüklü ve güncel.
- **Bilgisayar adı:** Şirket standartına uygun isimlendirilmiş (ör: KOZ-SATIS-05).
- **Disk şifreleme:** BitLocker aktif (özellikle dizüstü bilgisayarlar için şart — kaybolma/çalınma riskine karşı).

### Hesap ve Erişim Oluşturma

- **Active Directory hesabı:** Kullanıcı adı ve geçici parola oluşturun. İlk girişte parola değiştirme zorunlu olsun. [Active Directory rehberimiz](/blog/active-directory-kobi-rehberi) bu konuda detaylı bilgi veriyor.
- **E-posta hesabı:** Microsoft 365 veya [Google Workspace](/blog/office-365-vs-google-workspace) üzerinde hesap açın. Gerekli dağıtım listelerine ekleyin (ör: satis@sirket.com, tum-personel@sirket.com).
- **Lisans ataması:** Office 365 lisansı, varsa diğer yazılım lisansları (ERP, CRM, tasarım yazılımı vb.) atayın.
- **Erişim yetkileri:** Çalışanın departmanına göre dosya sunucusu klasör erişimlerini tanımlayın. En az yetki ilkesini uygulayın — herkesin her şeye erişimi olmamalı.
- **VPN hesabı:** Uzaktan çalışma yapacaksa VPN erişimi oluşturun ve test edin.

### Fiziksel Çalışma Alanı

- **Monitör, klavye, fare:** Masada hazır olsun. İkinci monitör ihtiyacı varsa (muhasebe, tasarım gibi departmanlar için standart) tedarik edin.
- **Telefon:** Sabit telefon veya IP telefon yapılandırması. Dahili numara ataması.
- **Kulaklık/mikrofon:** Video toplantılar için (Teams, Zoom kullanılıyorsa).
- **Erişim kartı/anahtarı:** Ofis giriş sistemi varsa kayıt.

## İlk Gün: Kurulum ve Tanıtım

Çalışanın ilk günü IT tarafında yapılacaklar:

### Giriş Bilgilerinin Teslimi

- Kullanıcı adı ve geçici parolayı güvenli şekilde iletin (e-posta ile değil, yüz yüze veya şifreli kanal üzerinden).
- İlk girişte parola değiştirmesini sağlayın.
- Parola politikasını anlatın: minimum 12 karakter, büyük-küçük harf, rakam, özel karakter.
- MFA (çok faktörlü doğrulama) kurulumunu birlikte yapın — telefona Authenticator uygulaması yükleyin.

### E-Posta ve Takvim

- Bilgisayarda Outlook veya Gmail kurulumunu yapın.
- Telefona e-posta kurulumunu yapın (şirket politikasına uygun şekilde — MDM varsa cihaz kaydı).
- Takvim paylaşımlarını ve toplantı odası rezervasyon sistemini gösterin.
- E-posta imzasını şirket standartına göre ayarlayın.

### Yazıcı ve Tarayıcı

- Ofis yazıcısını bilgisayara tanıtın. Ağ yazıcısı kurulumu genellikle 5 dakika sürer ama yapılmazsa çalışan günlerce "yazıcıyı göremiyorum" diye uğraşır.
- Tarayıcı varsa taranan belgelerin nereye kaydedileceğini gösterin.

### İletişim Araçları

- Microsoft Teams, Slack veya şirketin kullandığı iletişim aracını kurun.
- İlgili kanallara/gruplara ekleyin.
- Temel kullanımı gösterin (mesaj, dosya paylaşımı, toplantı başlatma).

### Güvenlik Briefing (15 Dakika)

Bu adım genellikle atlanır ama en önemli adımlardan biridir:

- **Phishing farkındalığı:** Şüpheli e-postaları nasıl tanıyacağını ve ne yapacağını anlatın. Şirket saldırılarının %90'ı bir çalışanın yanlış linke tıklamasıyla başlar.
- **Parola güvenliği:** Parolayı kimseyle paylaşmaması, yapışkan nota yazmaması, her sistem için farklı parola kullanması.
- **USB kullanımı:** Kaynağı bilinmeyen USB bellekleri bilgisayara takmaması.
- **Kilit ekranı:** Masadan kalkarken bilgisayarı kilitlemesi (Windows + L).
- **Veri sınıflandırması:** Hangi verilerin gizli olduğu, nerede saklanacağı, kiminle paylaşılabileceği.

## İlk Hafta: Doğrulama ve Eğitim

### Sistem Kontrolü

- Tüm yazılımlar düzgün çalışıyor mu?
- E-posta gönderme/alma sorunsuz mu?
- Yazıcıya baskı yapabiliyor mu?
- Paylaşılan klasörlere erişebiliyor mu?
- VPN bağlantısı çalışıyor mu (uzaktan çalışma varsa)?
- ERP/muhasebe/CRM yazılımına giriş yapabiliyor mu?

### Şirket Araçları Eğitimi

- Kullanılan yazılımların temel eğitimi (muhasebe, CRM, proje yönetimi vb.)
- Dosya paylaşım ve saklama kuralları (hangi klasörlere ne kaydedilir)
- Yedekleme politikası (kişisel dosyalar nereye kaydedilmeli)
- IT destek talebi nasıl açılır (e-posta, telefon, ticket sistemi)

## Checklist Özet Tablosu

| Zaman | Görev | Sorumlu |
|-------|-------|---------|
| -3 gün | Bilgisayar hazırlığı | IT |
| -3 gün | AD/e-posta hesabı oluşturma | IT |
| -3 gün | Lisans ataması | IT |
| -3 gün | Erişim yetkileri tanımlama | IT + Yönetici |
| -1 gün | Masa düzeni (monitör, klavye, fare) | IT + İK |
| 1. gün | Giriş bilgileri teslimi + MFA kurulumu | IT |
| 1. gün | E-posta + telefon kurulumu | IT |
| 1. gün | Yazıcı kurulumu | IT |
| 1. gün | Teams/Slack kurulumu | IT |
| 1. gün | Güvenlik briefing | IT |
| 1. hafta | Tüm sistemlerin kontrolü | IT |
| 1. hafta | Yazılım eğitimi | IT + Departman |

## Çalışan Ayrıldığında Ne Yapılmalı? (Offboarding)

IT onboarding kadar kritik olan bir süreç daha var: offboarding. Bir çalışan ayrıldığında ilk 1 saat içinde yapılması gerekenler:

### Hemen (İlk 1 Saat İçinde)

- **Tüm hesapları devre dışı bırakın:** Active Directory, e-posta, VPN, ERP, CRM — hepsi. Sadece parolayı değiştirmek yetmez, hesabı disable edin.
- **E-posta yönlendirmesi:** Gerekiyorsa gelen e-postaları yöneticisine veya yerine gelen kişiye yönlendirin.
- **Uzak erişimi kapatın:** VPN, uzak masaüstü, bulut erişimi — hepsi iptal.
- **Paylaşılan parolaları değiştirin:** Wi-Fi parolası, ortak hesaplar (sosyal medya, tedarikçi portalleri vb.) gibi ayrılan kişinin bildiği tüm paylaşılan parolalar değiştirilmeli.

### İlk Gün İçinde

- **Donanım teslim alımı:** Dizüstü bilgisayar, telefon, monitör, erişim kartı, USB bellek — tümünü teslim alın ve listeyi kontrol edin.
- **Lisans iptali:** Microsoft 365, Adobe, ERP ve diğer yazılım lisanslarını serbest bırakın (gereksiz aylık ödeme yapmayın).
- **Veri yedekleme:** Çalışanın dosyalarını arşivleyin — ileride lazım olabilir.
- **Mobil cihaz silme:** Şirket verisi olan kişisel telefonu MDM üzerinden temizleyin (sadece şirket verileri silinir).

Detaylı offboarding rehberimiz için: [Çalışan Ayrıldığında IT Tarafında Yapılacaklar](/blog/calisan-ayrildiginda-it-sureci)

### Neden 1 Saat Bu Kadar Kritik?

Türkiye'de yaşanan veri ihlallerinin önemli bir kısmı ayrılan çalışanların hala aktif olan hesapları üzerinden gerçekleşiyor. Kötü niyetli olmasa bile, eski çalışanın erişimi açık kaldığında:
- Müşteri verilerine erişilebilir
- E-posta hesabı üzerinden şirket adına yazışma yapılabilir
- Rekabetçi bilgiler sızdırılabilir
- KVKK kapsamında ihlal oluşur

## IT Onboarding Sürecini Otomatize Etmek

Her yeni çalışanda bu listeyi sıfırdan düşünmek yerine, standart bir süreç oluşturun:

1. **Checklist şablonu:** Departmana göre önceden hazırlanmış checklist'ler (satış, muhasebe, tasarım vb.)
2. **İK-IT iletişim prosedürü:** Yeni işe alım onaylandığında IT'ye otomatik bildirim
3. **Standart bilgisayar imajı:** Her seferinde sıfırdan kurmak yerine, şirket standart yazılımlarını içeren hazır bir disk imajı
4. **Offboarding tetikleyici:** İK'da işten çıkış işlemi başladığında IT'ye anında bildirim

## Bu Süreci Profesyonelce Yönetin

5-50 kişilik bir şirkette IT onboarding ve offboarding süreçlerini düzenli ve güvenli şekilde yürütmek, deneyimli bir IT partner gerektirir. Kozyatagi Bilisim olarak Anadolu Yakasi'ndaki KOBİ'lere bu sürecleri uçtan uca yönetiyoruz:

- Standart onboarding/offboarding prosedürleri oluşturma
- Bilgisayar tedarik, kurulum ve yapılandırma
- Active Directory ve e-posta yönetimi
- Güvenlik politikaları ve çalışan eğitimi
- Ayrılan çalışan hesaplarının anında kapatılması

IT onboarding sürecinizi profesyonelleştirmek için bizi arayın: **0541 636 77 75** veya [kozyatagibilisim.com](https://kozyatagibilisim.com) uzerinden ulasin.

---

**Bu rehberleri de okuyun:**

- [Çalışan Ayrıldığında IT Tarafında Yapılacaklar](/blog/calisan-ayrildiginda-it-sureci)
- [Active Directory Nedir? KOBİ'ler İçin Rehber](/blog/active-directory-kobi-rehberi)
- [Microsoft 365 vs Google Workspace: Hangisini Seçmeli?](/blog/office-365-vs-google-workspace)
