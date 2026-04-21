---
slug: mikro-erp-kullanici-yetki-yonetimi
title: "Mikro ERP Kullanıcı + Yetki Yönetimi — Departman Bazlı Rol Kurulumu"
type: cluster
pillar: 2
url: "/blog/mikro-erp-kullanici-yetki-yonetimi"
hedef_anahtar_kelime: "mikro erp kullanici yetki"
meta_description: "Mikro Fly ERP kullanıcı + rol yönetimi. Muhasebe, satış, üretim departmanlarına özel yetki matrisi. Stored procedure + audit log."
kelime_sayisi: "~800"
pillar_linki: "/hizmetler/kimlik-yonetimi"
---

## "Muhasebe Kullanıcısı Maaş Bordrosunu Gördü — Sorun!"

Mikro ERP'de tek "admin" kullanıcı + departman şifre — klassik yaklaşım. Sonuç: Muhasebe kullanıcısı maaş verisine, satış stok maliyetine erişebiliyor.

Çözüm: **Rol-bazlı yetki matrisi**.

## Hızlı Çözüm (TL;DR)

1. Mikro'da her departman için ayrı rol
2. Her rolün kendi menü + ekran erişimi
3. Her kullanıcı bir role bağlı
4. Audit log aktif

---

## Mikro Fly Yetki Sistemi

Mikro Fly ERP:
- **Modül bazlı** (Muhasebe, Stok, Satış, CRM, Üretim, İK)
- **Ekran bazlı** (her modülde onlarca ekran)
- **İşlem bazlı** (Yeni, Değiştir, Sil, Liste, Rapor)
- **Belge türü** (fatura, irsaliye, sipariş)

## 10:00 — Rol Tanımları

Örnek orta ölçekli firma:

| Rol | Modüller | Özel yetki |
|---|---|---|
| **Genel Müdür** | Hepsi | Full control, rapor |
| **Mali Müşavir** | Muhasebe, Finans | Full, diğer modüller read |
| **Muhasebeci** | Muhasebe | Fatura kes, yevmiye kayıt |
| **Satış Yöneticisi** | Satış, CRM, Stok (read) | Sipariş, fatura, müşteri |
| **Satış Elemanı** | Satış (limited), Stok (read) | Sadece kendi müşterileri |
| **Depo Sorumlusu** | Stok, Üretim (transfer) | Mal giriş/çıkış |
| **İK Uzmanı** | İK | Bordro, özlük |
| **Finans Uzmanı** | Finans | Çek, senet, tahsilat |
| **IT Admin** | Sistem | Kullanıcı ekle, backup |

## 10:15 — Rol Oluşturma (Mikro)

Mikro Fly > **Sistem** > **Kullanıcı/Yetki**:

> 📸 **Ekran 1** — Kullanıcı Yetki Tanımlama  
> Üst menü: Yeni Rol  
> Rol adı: "Muhasebeci"  
> Açıklama: "Muhasebe modülü standart"  
> Modüller checklist:  
>   ☑ Muhasebe (Full)  
>   ☐ Stok  
>   ☐ Satış  
>   ☐ CRM  
>   ☐ İK  
>   ☐ Finans

Her modül expand edince alt **ekranlar** + **işlemler**:
- Fatura Kes: ✓
- Yevmiye Kayıt: ✓
- Stok Maliyeti Görme: ✗
- Fatura Sil: ✗ (tehlikeli, silme yetkisi yönetici)

Save.

## 10:30 — Kullanıcı Oluşturma + Rol Atama

```
Sistem > Kullanıcı Tanımla > Yeni:
  Kullanıcı adı: muhasebe.ayse
  Şifre: geçici (ilk girişte zorla değiştir)
  Ad Soyad: Ayşe Yılmaz
  Departman: Muhasebe
  Rol: Muhasebeci  ← rol atama
  IP Sınırlaması: 10.10.20.0/24 (sadece iç network'ten giriş)
  Session timeout: 2 saat
```

## 10:45 — Yetki Matrisi (Dokümantasyon)

Excel'de şablon:

| Kullanıcı | Rol | Muhasebe | Stok | Satış | CRM | İK | Finans |
|---|---|---|---|---|---|---|---|
| Ayşe Yılmaz | Muhasebeci | Full | - | - | - | - | - |
| Can Kara | Satış Mdr | Read | Read | Full | Full | - | - |
| Mehmet Yıl | Satış Elm | - | Read | Limited | Read | - | - |

Her çeyrekte review — hâlâ doğru mu? Yeni çalışan + ayrılan update.

## 11:00 — Audit Log

Mikro audit:
```
Sistem > Audit > Log Ayarları
- User login/logout: ✓
- Fatura silme: ✓
- Yetki değişikliği: ✓
- Şifre değişikliği: ✓
- Database export: ✓
```

Log tablosunda saklanır, aylık export + retention 10 yıl.

## Belge Silme Kısıtı

Muhasebeci yanlış fatura kesti — düzeltmek için silmek yerine:
- **İptal** (reverse entry)
- Audit trail korunur

"Sil" yetkisi yalnız IT admin / Genel Müdür. Kayıt tutarlılığı kritik.

## AD Integration (Single Sign-On)

Mikro Fly Windows authentication destekler:
```
Sistem > Lisans > AD Entegrasyon
- SSO: ✓
- AD Group → Mikro Rol eşleme:
  * AD "Muhasebe-Team" → Mikro Rol "Muhasebeci"
  * AD "Satış-Team" → Mikro Rol "Satış Elemanı"
```

Kullanıcı Windows login ile Mikro'ya geçer — ayrı şifre yok. AD'den ayrılan otomatik Mikro erişim kaybeder.

## Yaygın Hatalar

### Admin Şifresi Herkeste

Klassik Türk SMB: "sa/sa" veya "admin/admin" herkes biliyor. Paylaşım = audit trail yok.

Çözüm: Her çalışana kendi user. Admin sadece IT.

### Rol Değil, İzolasyon

"Muhasebeci rolü" ile 10 muhasebeci aynı yetkiye sahip → Ayşe Hanım müşteri A'nın faturasını değiştiremese de, **Ali Bey müşteri A'nın faturasını silebilir** (rol aynı).

Bu da kabul edilebilir — hiyerarşi değil, **Maker-Checker prensibi**:
- Ayşe kesim → Ali onay → iki imza

## İlgili Rehberler

- [Logo Tiger SQL sorunları](/blog/logo-tiger-sql-server-baglanti-sorunlari)
- [AD Password Reset Delegation](/blog/ad-password-reset-delegation-helpdesk-grup)
- [Active Directory kullanıcı yönetimi](/blog/active-directory-kobi-rehberi)

---

**ERP + AD integration + kurumsal yetki yönetimi için destek?** [Teknik görüşme.](/#contact)
