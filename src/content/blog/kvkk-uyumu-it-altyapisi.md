---
slug: kvkk-uyumu-it-altyapisi
title: "KVKK Uyumu İçin Hangi IT Altyapısı Gerekir?"
type: cluster
pillar: 2
url: "/blog/kvkk-uyumu-it-altyapisi"
hedef_anahtar_kelime: "kvkk uyumu için it altyapısı"
meta_description: "KVKK uyumu için şirket IT altyapınızda neler olmalı? Teknik ve idari tedbirler için pratik KOBİ rehberi."
kelime_sayisi: "~1900"
pillar_linki: "/kobi-siber-guvenlik"
---

## KVKK Sadece Hukuki Bir Mesele Değil

Çoğu KOBİ KVKK'yı bir hukuki süreç olarak görür: aydınlatma metni hazırla, açık rıza al, VERBİS'e kayıt ol, bitti. Bu yanılgıdır. KVKK aslında en az hukuk kadar IT altyapısıyla ilgilidir.

Çünkü kanun "kişisel veriler uygun teknik ve idari tedbirlerle korunmalıdır" der ve bu tedbirlerin önemli bir kısmı IT alanındadır. KVKK Kurumu çeşitli rehberlerde gerekli teknik tedbirleri listelemiştir. Bu yazıda KOBİ ölçeğinde her birinin ne anlama geldiğini ve nasıl uygulandığını anlatıyoruz.

### 1. Yetki Matrisi ve Erişim Yönetimi

"Kim hangi veriye erişebiliyor" sorusu yazılı olarak belgelenmiş ve uygulanıyor olmalıdır. Pratik anlamı: Her çalışanın görevi gereği erişmesi gereken verilerin tanımlanması Görev gerekmediği halde erişim verilmemesi Yetkilerin bir matriste belgelenmesi

## Görev değişikliği veya ayrılış halinde yetkilerin güncellenmesi

Bu süreç [Active Directory KOBİ rehberi] yazımızda anlattığımız grup tabanlı yetkilendirmeyle çok daha kolay olur. 2. Loglama "Kim ne zaman hangi veriye eriştiği" kayıtlarının tutulması zorunludur.

### 3. Güvenlik Duvarı

Profesyonel bir firewall kurulmuş ve düzgün yapılandırılmış olmalıdır. Sadece var olması değil, etkili çalışıyor olması gerekir. [Küçük şirket firewall kurulumu] yazımızda detayları var.

### 4. Anti-virüs / EDR Sistemleri

Tüm endpoint'lerde merkezi yönetilen bir güvenlik ürünü olmalı. Detaylı [şirket için en iyi antivirüs] yazımızı okuyun. 5.

Şifreleme Hassas veriler şifreli olarak saklanmalıdır. Pratik anlamı: Disk şifreleme (BitLocker, FileVault) tüm laptoplarda Veritabanlarında hassas alan şifreleme Yedeklerin şifreli olması İletim halindeki verinin şifreli olması (TLS, VPN) E-postada hassas veri gönderilirken şifreleme 6. Veri Sızıntısı Koruma (DLP) Hassas verilerin yetkisiz kanallardan dışarı çıkmasını engelleyen sistemler.

Örneğin müşteri TC kimlik numaralarının e-postayla dışarı gitmesini engelleme, USB'ye kopyalanmasını yasaklama gibi.

## 7. Yedekleme

Düzenli, doğrulanmış, güvenli yedekleme. Veri kaybı da bir KVKK ihlali sayılır. [3-2-1 yedekleme kuralı] yazımıza bakın.

### 8. Ağ Güvenliği

Kurumsal ağ segmentlere ayrılmış, hassas verileri barındıran sistemler ayrı VLAN'da, gereksiz portlar kapalı, kablosuz ağlar şifreli olmalıdır.

### 9. Penetration Test

Yılda en az bir kez uzman bir firma tarafından sızma testi yapılması önerilir. Bulunan açıklar kapatılır. 10. İhlal Bildirim Süreci Bir ihlal yaşandığında 72 saat içinde KVKK Kurumu'na bildirim yapılması zorunludur. Bu sürecin nasıl işleyeceği önceden planlanmalı, sorumlular belirlenmelidir.

### 11. Veri Silme ve İmha

Saklanması gereken süre dolan veriler silinmelidir. Bu süreç belgelenmelidir. "Verilerimi silin" talebi gelen kişilerin verisinin silindiği gösterilebilmelidir.

## 12. Eğitim

Çalışanların KVKK ve veri güvenliği eğitimi alması zorunludur. Yılda en az bir kez yapılır, kayıtları tutulur. İdari Tedbirler IT'nin yanında idari tedbirler de gerekir: Veri envanteri ve VERBİS kaydı Aydınlatma metinleri (web sitesi, sözleşmeler, formlar) Açık rıza süreçleri Çalışan KVKK sözleşmeleri Tedarikçi sözleşmelerine KVKK maddeleri Veri sahibi başvuru süreci Politika dokümanları KVKK Cezaları KVKK Kurumu cezaları ciddidir.

Bildirim yapmama, veri güvenliği yükümlülüğünü ihlal, aydınlatma yükümlülüğünü ihlal her biri ayrı ayrı yüksek tutarlarda cezalandırılabilir. Bir tek ihlal milyon liraları aşan toplam ceza üretebilir. Önlem almak ceza ödemekten her zaman daha ucuzdur.

KVKK Uyum Denetimi İçin Ücretsiz Görüşme Mevcut IT altyapınızın KVKK gerekliliklerini karşılayıp karşılamadığını ücretsiz değerlendiriyoruz. Açıkları tespit ediyor, uyum yol haritası çıkarıyoruz.

## Sonuç

KVKK uyumu bir hukuki süreç gibi başlasa da işin önemli kısmı IT'dedir. Sadece avukata danışıp aydınlatma metni hazırlamak yetmez — arkasında doğru teknik altyapı olmalıdır. İyi haber şu: bu teknik altyapı zaten iyi bir siber güvenlik altyapısıdır.

KVKK için yapacağınız yatırımlar aynı zamanda şirketinizi siber tehditlere karşı koruyacaktır. İki kuş tek taşla.
