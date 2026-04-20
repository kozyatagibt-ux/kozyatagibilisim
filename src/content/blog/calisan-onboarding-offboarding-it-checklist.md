---
slug: calisan-onboarding-offboarding-it-checklist
title: "Çalışan İşe Giriş ve Ayrılma IT Checklist — KVKK Uyumlu"
type: cluster
pillar: 2
url: "/blog/calisan-onboarding-offboarding-it-checklist"
hedef_anahtar_kelime: "çalışan onboarding offboarding it checklist"
meta_description: "Yeni çalışan IT onboarding + ayrılan çalışan offboarding için komple checklist. AD hesap, M365 lisans, cihaz, VPN, parola reset, KVKK uyumu."
kelime_sayisi: "~2200"
pillar_linki: "/hizmetler/kimlik-yonetimi"
---

## Neden Bu Checklist Kritik?

Bir KOBİ'de tipik olarak:
- Yılda 15-30 çalışan işe başlar
- Yılda 10-20 çalışan ayrılır
- İK ile BT arasında bilgi alışverişi **manuel ve dağınık**

Sonuç:
- Yeni çalışan ilk haftasını "bekliyorum" modunda geçiriyor (üretkenlik kaybı)
- Ayrılan çalışanın hesabı aylarca aktif (KVKK ihlali, güvenlik açığı)
- Cihazı geri alınmadı, lisansı ödenmeye devam ediyor (maliyet)

Aşağıdaki iki kapsamlı checklist bu kaosu biter.

---

# BÖLÜM A: ONBOARDING CHECKLIST (Yeni Çalışan İşe Giriş)

## İşe Başlama Tarihinden -3 Gün Önce (İK → BT)

### ☐ 1. İK Talep Formu

İK'dan BT'ye form iletilir:
- Ad soyad, unvan, departman
- Amir (manager)
- Başlangıç tarihi
- Cihaz ihtiyacı (laptop tipi, monitor, telefon)
- Özel yetkiler (finans ise ek muhasebe erişimi, vs.)
- E-mail alias formatı (`ad.soyad@` veya `adsoyad@`)

Bu form olmadan süreç başlamamalı.

### ☐ 2. Kurumsal E-posta Hesabı

M365 / Google Workspace admin konsolunda:
- Yeni kullanıcı hesabı oluştur
- Lisans ata (M365 Business Premium / Standard)
- Mail alias belirle
- Departman grubuna ekle
- Paylaşılan mailbox erişim tanımla (varsa)

### ☐ 3. Active Directory Hesabı

On-prem veya Entra ID:
- Kullanıcı hesabı oluştur (standard naming convention)
- Doğru OU (Organizational Unit) içine yerleştir
- Departman + rol grup üyeliklerine ekle
- İlk giriş şifresi (teslimde değiştirmek zorunda)
- Expire date = sözleşmeye göre veya sonsuz

### ☐ 4. Microsoft 365 Grup Erişimleri

- Departman Teams kanalı
- Paylaşılan SharePoint/OneDrive klasörleri
- Distribution Lists (DL'ler): `satis@firma.com`, `muhasebe@firma.com`
- Dinamik grup varsa otomatik atanır (Entra ID dynamic groups)

### ☐ 5. Cihaz Hazırlığı

- Laptop fabrika imajından temiz kurulum (Autopilot ile otomatik veya manuel)
- Windows 11 Pro + domain join
- Intune / MDM enroll
- Antivirus / EDR yüklü
- Standart yazılımlar: Office, Outlook, Teams, Chrome, PDF reader
- BitLocker aktif, şifre kurtarma anahtarı AD'ye kaydedilmiş
- Department-specific yazılımlar (Logo, Adobe, vs.)

### ☐ 6. Peripherals Hazırlığı

- Monitor, klavye, mouse, headset
- USB-C dock
- HDMI/DisplayPort kabloları
- Kartvizit (varsa)
- Access kartı (kapı, asansör)

---

## İşe Başlama Günü

### ☐ 7. Oryantasyon — IT Kısmı (30-45 dk)

Yeni çalışanla birlikte:
- İlk giriş — AD şifresi değiştir
- MFA kurulumu (Microsoft Authenticator, FIDO2 anahtar)
- Outlook ilk kurulum, mail imzası
- Teams tanıtımı, kanal üyelikleri
- OneDrive senkronizasyon başlat
- SharePoint / dosya paylaşım yerleri
- Kurumsal password manager (Bitwarden) hesap oluştur
- **Güvenlik farkındalık brief'i** (phishing, şifre, KVKK, cihaz kaybı)
- IT helpdesk kanalı (Freshservice, Slack, telefon)

### ☐ 8. Yazıcı ve Özel Erişimler

- Kat yazıcısı driver kurulum / follow-me print aktif
- ERP / CRM uygulamalarına giriş
- VPN (uzaktan erişim) kurulum + test
- IP telefon (fiziksel veya Teams Phone)

### ☐ 9. İlk Gün Dokümantasyonu

Yeni çalışana yazılı olarak:
- IT kurumsal politika özeti (1-2 sayfa)
- Kullanıcı el kitabı (ağ path'leri, ortak araçlar)
- Helpdesk iletişim bilgileri
- Cihaz teslim tutanağı imzalat (envanter için)

---

## İşe Başlamadan 1 Hafta Sonra

### ☐ 10. Takip Görüşmesi

İK veya BT sorumlusu yeni çalışanla:
- Bir şey çalışmıyor mu?
- Ek yazılım/erişim ihtiyacı var mı?
- Phishing simülasyonuna kayıt

### ☐ 11. Probation Period IT Ayarları

- Limited access — sadece gerekli sistemlere
- 3 ay sonra full permission review

---

# BÖLÜM B: OFFBOARDING CHECKLIST (Ayrılan Çalışan)

## Ayrılış Bildiriminden Hemen Sonra (İK → BT)

### ☐ 12. Ayrılma Bilgilendirmesi

İK'dan BT'ye:
- Kullanıcı bilgisi
- Son çalışma günü tarihi ve saati
- Ayrılma türü: istifa / karşılıklı fesih / performans feshi
- **Risk seviyesi**: standart / yüksek (çekişmeli ayrılık, hassas veri erişimi)

### ☐ 13. Planlama

Yüksek risk ise:
- Son çalışma günü sabahı erişim kesme (çalışan haberi olmadan)
- Cihaz tesliminde BT mutlaka nezaret etmeli
- Legal hold (hukuki muhafaza) — mail ve dosyalar silinmesin

Standart ayrılıkta:
- Son gün öğleden sonra erişim kesme
- Dosya devir planlaması manager ile

---

## Son Çalışma Günü

### ☐ 14. Aktif Sistem Erişimlerinin Kesilmesi

Son gün saat X'te eş zamanlı:
- **Active Directory hesabı**: Disable (silme değil, revoke erişim yeterli — audit için tutulmalı)
- **M365 lisansı**: Lisansı kaldır (hesap 30 gün grace period'a geçer)
- **MFA cihazları**: sıfırla
- **VPN**: disconnect
- **Kurumsal Wi-Fi certificate**: revoke
- **Building access card**: deaktive

PowerShell script ile tek komutla:
```powershell
# Örnek
$user = "ahmet.yilmaz"
Disable-ADAccount -Identity $user
Set-AzureADUser -ObjectId "$user@firma.com" -AccountEnabled $false
Remove-MgUserLicense -UserId "$user@firma.com"
```

### ☐ 15. SaaS Uygulama Erişimleri

Tenant-based SaaS'lar:
- **Slack**: Deactivate
- **Notion**: Remove from workspace
- **Jira/Confluence**: Disable
- **Salesforce**: Deactivate
- **GitHub / GitLab**: Remove (veya sahip olduğu repo transfer)
- **AWS/Azure** if applicable: IAM user deactive
- **Figma, Adobe CC**: Seat'i sil
- **Grammarly, Canva**: Remove

Kurumda kullanılan SaaS listesi CMDB'de olmalı. Yoksa **Shadow IT** araştırması yapılmalı.

### ☐ 16. E-mail Yönlendirme

Müşteri iletişimi kaybolmasın:
- Mailbox'tan 30-60 gün boyunca manager'a forward
- Out of office reply: "X Hanım/Bey şirketimizden ayrılmıştır. Yerine [yedek kişi] ile iletişime geçebilirsiniz: email@firma.com"
- Dış müşteriye sessiz sessiz yönlendirme değil — **açık bilgilendirme** KVKK açısından önemli

### ☐ 17. Mailbox Dönüşümü

Genel uygulama: **Shared Mailbox'a çevir**
- Lisans ekstra tutulmaz
- Manager içeriğe erişebilir
- Tarihsel veri korunur (Legal hold + compliance)

```powershell
Set-Mailbox -Identity $user -Type Shared
```

### ☐ 18. OneDrive / SharePoint Veri Devri

- Ayrılan kullanıcının OneDrive'ı **manager'a 30 gün erişim izni**
- Kritik dosyalar ortak SharePoint'e taşınır
- 90 gün sonra OneDrive silinir (KVKK saklama sürelerine uygun)

### ☐ 19. Cihaz Teslim Alma

Fiziksel olarak:
- Laptop + şarjı + çanta
- Monitor / aksesuar (varsa evdeki)
- Telefon (varsa kurumsal)
- Access kartı + park kartı
- Kurumsal SIM kart
- **Teslim tutanağı imzalat** (İK'nın performans değerlendirmesine de gider)

### ☐ 20. Cihaz Wipe ve Yeniden Kullanım

- **BitLocker** ile şifreli disk — wipe sonrası sıfırdan kurulum gerekli
- MDM'den "wipe" komutu veya fiziksel olarak format
- Envantere geri ekle, yeni çalışana atanmak üzere

---

## Son Günden 30 Gün Sonra

### ☐ 21. Komple Cleanup

- Mailbox silinir (veya kurumsal arşive taşınır)
- OneDrive silinir
- AD hesabı "Disabled" → ayrı bir "Former Employees" OU'ya taşı
- SaaS hesapları tamamen silinir (30 gün önce deactivate idi)
- Kullanıcı adı rezerve (gelecekte aynı isimde çalışan gelirse karışıklık olmasın)

### ☐ 22. Erişim Audit

PowerShell ile eski kullanıcının SID'iyle kaldığı paylaşımlar:
```powershell
# Dosya paylaşımlarında orphan SID bul
Get-ChildItem -Path \\server\share -Recurse | 
    Get-Acl | Where {$_.Owner -eq "S-1-5-21-..."}
```

Eski SID'li paylaşımları temizle.

### ☐ 23. Lisans ve Maliyet Optimizasyonu

- M365 lisansı iptal edildi mi?
- Adobe CC seat boşaltıldı mı?
- Özel yazılım lisansları?
- VPN client license?

**Tasarruf**: Yılda 15 çalışan ayrılan bir şirkette eski lisansların temizlenmemesi ~25-50 bin TL kayıp.

---

## Yüksek Risk Ayrılıklar İçin Ek Adımlar

### ☐ 24. Legal Hold

- Mail ve dosyalar **silinmeyecek** şekilde tag'lenir
- Hukuki süreç (iş davası, dava tehdidi) olunca avukat talimatı ile
- M365'te "Litigation Hold" aktif

### ☐ 25. Audit Log İzleme

Son 90 günde bu kullanıcının:
- Hangi dosyaları indirdi? (unusual activity var mı?)
- Kaç dosya paylaştı?
- Mailbox'tan toplu export yaptı mı?

Entra ID Sign-in Logs + Unified Audit Log'u incele.

### ☐ 26. Veri Sızıntısı Kontrolü

Özellikle satış, pazarlama, Ar-Ge personeli:
- Müşteri listesi download'u
- USB'ye dosya kopyalama (DLP ile izlenir)
- Kişisel mail'e yönlendirme

---

## Otomasyon Öneri

Büyük şirketlerde (100+ çalışan) bu süreç manuel sürdürülemez. Çözüm:

### HR Connector
- **BambooHR**, **Personio**, **Humanforce** gibi İK yazılımından
- Otomatik olarak M365/Entra ID'ye kullanıcı push
- Ayrılık tarihi girildiğinde otomatik deactivate

### Identity Provisioning
- **Okta Lifecycle Management**
- **Azure AD / Entra ID Provisioning**
- SaaS uygulamalar için SCIM protokolü

### Scripted Runbook
- PowerShell veya Python ile tek komutla "new user" ve "offboard user"
- Onaya bağlı ama hızlandırılmış süreç

---

## KVKK ve Yasal Dikkat

### Saklama Süreleri

- **Mail arşivi**: Vergi + ticaret kanunu — 10 yıl
- **Dosya yedekleri**: Yine 10 yıl
- **Personel özlük dosyası**: İK'da 50 yıla kadar
- **Audit log**: KVKK için 10 yıl (ideal)

### Sil / Anonimleştir / Sakla Kuralı

Kullanıcı "silinme hakkını" kullanırsa (KVKK madde 11):
- **Mail ve dosyalar**: Yasal saklama süresince tutulur (vergi/ticaret)
- **Kişisel iletişim bilgileri**: Anonimleştirilebilir (örn. CV)
- **İş performans kayıtları**: Hukuki uyuşmazlık süresi geçince silinir

### İlgili Kişi Başvurusu

Ayrılan çalışan KVKK kapsamında "veri silme" talep edebilir. 30 gün içinde yanıt zorunlu.

---

## Şablon Dokümanlar

Aşağıdakiler elinizde hazır olmalı (PDF/Word):

1. **IT Teslim Tutanağı** (cihaz listesi + imza)
2. **IT Bilgi Güvenliği Taahhütnamesi** (çalışan imzalı)
3. **Onboarding Checklist** (İK + BT ortak kullanır)
4. **Offboarding Checklist** (yine ortak)
5. **Sistemlerden Hesap Silme Prosedürü** (IT iç doc)

---

## Sık Sorulan Sorular

### İşe giriş haftasında kullanıcıya tam admin yetki vermek normal mi?

**Kesinlikle hayır**. "Least privilege" prensibi — sadece işini yapmak için gerekli yetki. 3 ay probation sonrası review ile artır.

### Ayrılan çalışanın mail'lerini manager okuyabilir mi?

KVKK açısından çalışanların iş maillerine "meşru amaç" (iş sürekliliği) çerçevesinde manager erişebilir. Ama kişisel mail'ler incelenemez. Aydınlatma metninde bu açıkça belirtilmeli.

### 50 kişilik şirketiz, bu kadar detay abartı değil mi?

Büyük vakalar 50 kişilik şirketlerde yaşanıyor. Offboarding gevşekliği → veri sızıntısı → KVKK cezası. 1 vaka maliyeti (3-5 milyon TL) bu disiplinin yıllık maliyetinin 10 katı.

### IK yazılımımız yok, bu süreci Excel'de takip edebilir miyim?

Evet ama manuel süreç insan hatasına açık. En azından SharePoint list veya Notion database ile status tracking öneririz.

---

**Onboarding/offboarding süreç optimizasyonu ve otomasyon projesi?** Kozyatağı Bilişim olarak İK-IT entegrasyonu, Identity provisioning ve güvenli ayrılık yönetimi sunuyoruz. [Teknik görüşme talep edin.](/#contact)
