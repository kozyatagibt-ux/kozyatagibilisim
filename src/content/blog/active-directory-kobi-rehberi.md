---
slug: active-directory-kobi-rehberi
title: "Active Directory Nedir? KOBİ'ler İçin Sade Anlatım"
type: cluster
pillar: 1
url: "/blog/active-directory-kobi-rehberi"
hedef_anahtar_kelime: "active directory nedir kobi"
meta_description: "Active Directory nedir, KOBİ'ler için neden gereklidir? Kurumsal kullanıcı yönetiminin temel kavramları sade dilde anlatılıyor."
kelime_sayisi: "~1900"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Bir Şirketin Dijital Kimlik Sistemi

10 kişilik bir şirket düşünün. Her çalışanın bilgisayarı var, e-postası var, paylaşılan klasörlere erişimi var, yazıcılar var, belki bir muhasebe yazılımı var. Şimdi soru: bütün bu hesaplar ve şifreler nerede yönetiliyor?

Çoğu küçük şirkette cevap ürkütücüdür: "Her çalışanın bilgisayarı kendi başına, her yazılımın kendi şifresi var, kim neye erişiyor kimse tam bilmiyor." Active Directory (kısaca AD), tam bu kaosu çözmek için var. AD bir Microsoft teknolojisidir ve şirketinizin tüm dijital kimliklerini merkezi bir yerden yönetmenizi sağlar.

Bir çalışanın tek bir kullanıcı adı ve şifresi olur, bu kullanıcı adıyla bilgisayarına giriş yapar, e-postasına bağlanır, paylaşılan dosyalara erişir, yazıcıyı kullanır, yetkili olduğu uygulamalara girer. Tek bir kayıt, çoklu erişim. Active Directory Ne İşe Yarar?

AD'nin sunduğu temel hizmetler şunlardır: Tek oturum açma (Single Sign-On): Çalışan bir kez oturum açar, bağlı sistemlere otomatik girer Merkezi kullanıcı yönetimi: Yeni çalışan eklemek tek yerden yapılır, ayrılış da tek yerden iptal edilir Grup tabanlı yetkilendirme: "Muhasebe grubu" gibi gruplar tanımlanır, dosya ve uygulama erişimleri grup bazlı verilir Group Policy: Tüm bilgisayarlarda merkezi politika dayatma (örn. ekran kilidi, USB yasakları) Yazılım dağıtımı: Bir yazılım merkezi olarak tüm bilgisayarlara kurulabilir Güvenlik politikaları: Şifre karmaşıklığı, hesap kilitleme kuralları Audit logları: Kim ne zaman nereye giriş yaptı kaydı Neden 10+ Kişilik Şirketlerde Şart? Şirket küçükken (5 kişi gibi) AD aşırı görünür.

Herkes herkesi tanır, şifre sıfırlamak kolaydır, dosya paylaşımı manuel halledilir. Ama 10 kişiyi geçtiğinde manuel yönetim çatlamaya başlar. 30 kişiye geldiğinde imkansızlaşır.

Sebepleri: Her bilgisayarda farklı şifre, farklı yetki, farklı politika — kontrolsüz ve güvensiz Çalışan ayrıldığında onlarca yerde manuel hesap kapatma Yeni çalışan başladığında her şeyi tek tek kurma "Şifremi unuttum" çağrılarının her biri ayrı uğraş Hassas dosyaların kimin görebileceği belirsiz Audit/denetim talep edildiğinde belge yok AD Kurulumu İçin Neler Gerekir? Sunucu donanımı: Fiziksel veya sanal bir Windows Server. KOBİ için orta seviye bir sunucu yeterlidir.

Windows Server lisansı: Standart Edition KOBİ için uygun CAL lisansları: Her kullanıcı veya cihaz için Client Access License Yedek sunucu (önerilir): AD çökerse şirket çöker — yedek bir Domain Controller önerilir Zaman senkronizasyonu: Tüm bilgisayarların aynı saatte olması DNS yapılandırması: AD'nin çalışması için doğru DNS gereklidir Alternatifler Geleneksel on-premise AD tek seçenek değildir. Modern alternatifler: Microsoft Entra ID (eski Azure AD): Tam bulut, on-prem sunucu gerektirmez. Office 365 ile gelir.

JumpCloud: Bağımsız bulut directory hizmeti Google Workspace Directory: Google ekosistemi için Hibrit modeller: On-prem AD + Entra ID Connect ile bulut entegrasyonu Çoğu modern KOBİ artık tam bulut Entra ID'yi tercih ediyor çünkü sunucu maliyetinden kurtarıyor ve uzak çalışmayla daha uyumlu.

## Maliyet Tahmini

000 TL Entra ID tercih edilirse Office 365 lisansları içinde gelir, ek donanım maliyeti olmaz. Şirketinize AD Kurulumu İçin Ücretsiz Teklif Mevcut altyapınızı inceliyor, ihtiyaçlarınıza uygun (on-prem AD veya Entra ID) çözümü öneriyoruz. Detaylı maliyet ve zaman planı için iletişime geçin.

## Sonuç

Active Directory veya modern eşdeğeri, belirli bir büyüklüğün üzerindeki her şirketin temel altyapısıdır. "Bizim için lüks" değil, "düzenli çalışmamız için gerekli" kategorisindedir. Kurulduktan sonra fark edilmez ama olmadığında her gün sıkıntı yaşatır.

Yönetilen IT hizmetinin omurgasıdır ve modern bir KOBİ'nin profesyonel görünmesinin teknik temelidir.
