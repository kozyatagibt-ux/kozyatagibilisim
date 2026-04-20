---
slug: hikaye-domain-admin-sifresi-whiteboardda
title: "Müdürümün Yaptığı En Büyük Hata: Domain Admin Şifresini Whiteboard'a Yazmak"
type: hikaye
pillar: 7
url: "/blog/hikaye-domain-admin-sifresi-whiteboardda"
hedef_anahtar_kelime: "kurumsal güvenlik felaketleri"
meta_description: "Bir BT müdürünün domain admin şifresini sunucu odasındaki beyaz tahtaya yazması — temizlikçi fotoğrafı, LinkedIn paylaşım kazası ve sonuçları. Kurumsal güvenlik hikayesi."
kelime_sayisi: "~2100"
pillar_linki: "/kobi-siber-guvenlik"
hikaye: true
---

## İlk Görüş — 2022 Yazı

Ben yeni işe başlamış BT uzmanıyım. 70 kişilik bir reklam ajansına sistem yöneticisi olarak alındım. İlk gün ofis turu — patronlar, ekipler, molalar için mutfak, açık mimari. Sunucu odası en son.

Sunucu odasına girdiğimde ilk gördüğüm şey:
- Rack'lerde 6 server, düzenli
- UPS, düzgün yerleştirilmiş
- Network switch'leri, label'lı kabloları
- Ve... köşede bir whiteboard.

Whiteboard'da elle yazılmış notlar:
```
DC01 IP: 192.168.1.10
DC02 IP: 192.168.1.11

Admin şifre: KaranfilGelincikPembe2022!

Microsoft license key: XXXX-YYYY-ZZZZ...
Cisco console password: NetworkOK123
```

BT müdürü Özgür Bey arkamda duruyordu, açıklıyor:
> "Burada çok işlem yapıyoruz, her şeyi akılda tutmak zor. Bu oda kilitli zaten, sadece benim ve senin kartın var. Merak etme."

O an "tamam" dedim. İçimde alarm çaldı.

## İlk Hafta — Bir Akşam Geç

Özgür Bey 19:00'da çıktı. Ben biraz geç kaldım — yeni sistemleri tanımaya çalışıyordum. Sunucu odası dahil. Kart geçiş sistemi log'uma bakarak farkına vardım:

- **19:15 — Ben giriş**
- **19:45 — Benim çıkış**
- **20:30 — "Temizlik personeli" (Nermin Hanım) — kartıyla giriş**

Nermin Hanım her gece sunucu odasına giriyordu. Yerleri siliyor, çöpleri alıyor. Kart sahibi temizlik şirketi tarafından verilmiş.

Nermin Hanım'ın ne kadar iyi niyetli olduğunu bilmiyordum. Ama **whiteboard görüyordu.** Temizleyip silecek değildi (yazılı olduğu için) ama yanında durmuş 5 dakikalık bir fotoğraf çekebilir, eve götürebilir, ailesinden birine gösterebilirdi.

Ya da fotoğrafını çekip "bakın nerede çalışıyorum" diye sosyal medyada paylaşabilirdi. Başkaları görebilirdi.

## İkinci Hafta — Bir Kriz

Bir öğlen, pazarlama müdürü panikle geldi:
> "Instagram hesabım hacklendi. Şirket sayfası değil, kendi hesabım. Çok garip çünkü şifrem güçlüydü."

İncelemek için telefonunu aldım. Instagram login history:
- **Türkiye** (normal girişleri)
- **Rusya, 2 gün önce** (bilinmeyen)

Bir saat sonra bir başka çalışan (muhasebeci Ayşe) şikayetiyle geldi:
> "Mail'e giremiyorum, şifrem yanlış diyor. Ama değiştirmedim ki."

M365 Admin Center'a baktım:
- Ayşe Hanım'ın hesabından 4 saat önce **ABD'den giriş**
- Ve tüm klasör yapısı değişmiş — spam filter kaldırılmış, bazı mail forwarding kuralları eklenmiş

İki ayrı kullanıcı, iki ayrı platformda, aynı hafta. Bir şey vardı.

## Akıl Yürütme — Kaynak Ne?

İki kullanıcının ortak noktası hangi sistemdi? AD + M365 (bizim domain). Hem Instagram hem M365 hesaplarının şifrelerinin aynı/benzer olabileceğini düşündüm. Kullanıcılar genelde her yerde aynı şifre kullanır.

Ayşe'yi çağırdım:
> "Ayşe Hanım, şirket mailinize olan şifreniz ile Instagram şifreniz aynı mıydı?"

"Evet, neredeyse aynı. Sonuna yıl ekliyorum."

Yani biri Ayşe'nin şirket mailini elde etmiş, aynı şifreyi Instagram'da denemiş, çalışmış.

**Kritik soru**: Ayşe'nin şirket şifresi nereden sızdı?

## Araştırma — Bir Sabah

Pazar sabahı ofise geldim. Firewall log'larına daldım. Son 30 günün outbound trafiğini SIEM'den çektim (Graylog kullanıyorduk):

**Anormallik**:
- 3 hafta önce, Salı 11:40 — iç ağdan `mailbomb.com` (spam/pentest/doxing servisi) adresine 47 MB trafik
- Kaynak IP: 192.168.1.205 — pazarlama müdürü laptop'u

Laptop'ı inceledim. Browser history sıfırlanmış ama Defender tarama log'u var:
- **3 hafta önce, Salı**: "İnfostealer" malware tespit edildi, quarantine
- Malware adı: **RedLine Stealer** — çok bilinen bir credential stealer

RedLine:
- Tarayıcıda kayıtlı tüm şifreleri toplar
- System info çalar (IP, MAC, AD domain info)
- Telegram/Discord kanalına gönderir
- Saldırgan satar veya kullanır

Pazarlama müdürü laptop'undaki **tüm** kayıtlı şifreler sızmış olabilirdi. Chrome'da kaç şifre kayıtlı? Tipik kullanıcıda 50-100.

Ama **domain admin şifresi** Chrome'da kayıtlı değildi. Nereden sızabilirdi?

## Whiteboard — Fark Etme Anı

Dondum kaldım. Sunucu odasındaki whiteboard. Domain admin şifresi orada yazılı. Nermin Hanım giriyor. Başka kimler girebilir?

Kart geçiş log'unu 6 aylık çektim:

- Özgür Bey — her gün
- Ben (son 2 hafta)
- Nermin Hanım (temizlik) — her gece
- Ahmet Bey (IT destek — dışarıdan aylık ziyaret) — ayda 1-2

**Ama** bir not vardı: Bir Cumartesi 14:00'te "Misafir-003" kartıyla sunucu odasına giriş. Ve 10 dakika sonra çıkış.

Misafir-003 kartı kime verilmişti? HR'a sordum:
- "Elektrikçi. Periyodik UPS kontrol için geliyor. Elektrik şirketi gönderiyor."

Elektrikçi. UPS kontrolü 10 dakika alır. Oysa 30-45 dakikalık bir iş olmalı. 10 dakikada ne yapılır? **Bir fotoğraf çekebilir.**

## Kesin Kanıt Yok, Ama...

Elektrikçinin fotoğraf çektiğini ispatlayamam — ama yeterli şüphe var. Şimdi acil eylem:

### Adım 1: Tüm şifreler reset, acil.

```powershell
# Domain admin hesap şifreleri
Get-ADUser -Filter {MemberOf -like "*Domain Admins*"} | 
    ForEach-Object {
        Set-ADAccountPassword $_ -Reset -NewPassword (GeneratePassword)
    }

# Tüm kullanıcılara "sonraki girişte şifre değiştir"
Get-ADUser -Filter * | Set-ADUser -ChangePasswordAtLogon $true
```

Bu aksiyon 2 saat içinde uygulandı.

### Adım 2: Domain admin hesabını **ayrı** yap.

Daha önce Özgür Bey'in kendi günlük kullanıcı hesabı **aynı zamanda domain admin'di**. Klasik hata. Yeni model:

- `ozgur.demir` — günlük kullanım (mail, Outlook, dokümanlar)
- `ozgur.demir.admin` — sadece DC'ye giriş için

Ve ilki Chrome'da kayıtlı olabilir (düşük risk), ama ikincisi asla. Sadece BitWarden kasasında.

### Adım 3: LAPS (Local Administrator Password Solution).

Her bilgisayarın local admin şifresi farklı + 30 günde bir otomatik değişen + merkezi olarak AD'de kayıtlı. Artık "bir admin şifresi hepsi için" yok.

### Adım 4: Whiteboard'u çıkar.

Fiziksel olarak sunucu odasındaki whiteboard'u söktüm. Yerine "No passwords on walls" afişi astım. Şaka gibi ama bence ciddi bir mesaj.

### Adım 5: Şifre yönetimi — BitWarden Business.

Şirket için Bitwarden Business açıldı. Herkese lisans. Tüm IT şifreleri kasada. Whiteboard gerekliyse bile — orada "Kasada ara" yazar sadece.

## Ayrı Bir Mesele — Pazarlama Müdürü Laptop

Malware enfekte olmuş laptop'u temizlemek yerine **format + yeniden kur** yaptık. Cache'de başka credential'lar varsa bile gitti.

Pazarlama müdürüne de şunları söyledim:
- Artık Chrome şifre kayıt fonksiyonu disable (GPO)
- Tüm browser password'ları silinecek
- BitWarden yüklü, iş şifreleri oraya
- **Bireysel** şifreler de BitWarden Personal'a — 10$/ay kişisel plan

### Ayrıca — Özgür Bey ile Konuşma

Yeni hafta, Özgür Bey ile oturdum. Sakince ama net anlatım:

> "Özgür Bey, olanlar birbirinden ayrı olaylar gibi görünüyor — biri malware, biri muhtemelen whiteboard. Ama ikisi de aynı kültürden geliyor: 'Biz güvendeyiz, risk düşük.' 70 kişilik bir ajansız, müşteri datası işliyoruz, reklam verisi kritik. KVKK denetimi gelse bu olayları açıklamamız çok zor."

Özgür Bey dinledi. "Haklısın. Whiteboard'u bilerek yazmıştım çünkü ben unutuyorum. Ama bu dava değil, değişmek lazım."

Birlikte 6 aylık "security hygiene" planı yaptık:
- MFA tüm hesaplarda (M365, AD, VPN)
- LAPS deploy
- BitWarden Business
- Conditional Access policy
- Quarterly phishing simulation + farkındalık eğitimi

6 ay sonra bu şirket audit-ready hale geldi.

## Altı Ay Sonra — Küçük Bir Sürpriz

Özgür Bey bir gün bana geldi:
> "Sana bir şey göstereceğim. Bugün LinkedIn'de bir şey gördüm, çok hoşuma gitti."

Telefonu çıkardı. Bizim şirketin eski temizlik firması (Nermin Hanım'ın çalıştığı) başka bir müşteride sosyal medya paylaşımı yapmış:

> "Temizliğin en özel alanı: sunucu odaları. #temizlik #bakım #kurumsaltemizlik"

Fotoğraf: başka bir şirketin sunucu odası. Whiteboard görünüyordu. Üzerinde:

```
Admin şifre: MartıDalgaFırtına2024!
```

Özgür Bey: "Biz o şirket değiliz. Ama düşünsene — eğer biz olsaydık?"

Dondum. "Bu fotoğrafı kaç kişi gördü?"

Özgür: "LinkedIn paylaşımı 2000 beğeni, 300 yorum. Yani binlerce kişi."

O an kesin biliyorum: bir şirket şu anda — o fotoğraftan — kırılıyor. Biliyor mu bilmiyor mu bilmiyorum. Ama uyanmadan zor.

## Çıkarılan Dersler

### 1. "Bize bir şey olmaz" mazereti en büyük güvenlik açığı

"Kimseye söylemedim", "benim ofisim kilitli", "hepsi güvenilir" — bunlar risk yönetimi değil, duygu. Somut kontroller: MFA, LAPS, vault, access logs.

### 2. Şifre hiçbir yere yazılmaz — kasa dışında

Post-it, whiteboard, Excel, paylaşılan Word dokümanı — hepsi yasak. **Password manager** (BitWarden, 1Password, LastPass) kullanılır. Cloud-synced + encrypted + MFA protected.

### 3. Fiziksel erişim mantığı dijital erişim kadar önemli

Temizlik personeli, elektrikçi, servis mühendisi — sunucu odasına girebilen herkes potansiyel risk. Ya fiziksel erişim kısıtla, ya da her hassas bilgiyi görünmez yap.

### 4. Günlük kullanıcı ≠ admin hesabı

Tek hesapla hem mail kontrol edip hem domain yönetmek güvenlik açığı. Tier model: Tier 0 (DC), Tier 1 (server admin), Tier 2 (user) ayrımı.

### 5. Kullanıcı credential hijacking → şirket credential hijacking

Kullanıcının LinkedIn şifresi çalınırsa, aynı şifrenin varyasyonuyla şirket sistemine denenir. MFA bu zinciri kırar. Ayrıca GPO ile "browser password save" disable etmek standart.

### 6. Sosyal medya = fotoğraf riski

Çalışanlar bilmeden işteki fotoğrafları paylaşıyor. Arka planda beyaz tahta, Monitor, sticky note — hepsi bilgi sızdırabilir. "Sosyal medya fotoğraf politikası" gerekli.

---

*Bu hikaye, birden fazla gerçek vakadan derlenen kurgusal bir anlatıdır. Teknik detaylar, kullanılan araçlar (RedLine, BitWarden, LAPS) gerçektir. Şirket ve kişi isimleri anonimleştirilmiştir.*

**Kurumsal güvenlik hijyeni, şifre yönetimi, MFA deployment ve access control için profesyonel destek?** Kozyatağı Bilişim olarak password manager implementation, Zero Trust migration ve güvenlik farkındalık eğitimleri sunuyoruz. [Ücretsiz keşif görüşmesi.](/#contact)
