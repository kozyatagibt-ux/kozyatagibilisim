---
slug: calisan-ayrildiginda-it-sureci
title: "Çalışan Ayrıldığında IT Süreci: Adım Adım Checklist"
type: cluster
pillar: 1
url: "/blog/calisan-ayrildiginda-it-sureci"
hedef_anahtar_kelime: "çalışan ayrıldığında it süreci"
meta_description: "Bir çalışan ayrıldığında IT açısından yapılması gerekenler. Hesap kapatma, yetki iptali, veri devri için adım adım checklist."
kelime_sayisi: "~1900"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Çoğu KOBİ'nin Atladığı Görünmez Risk

Bir çalışan istifa eder veya işten ayrılır. İK süreçleri tamamlanır, son maaş ödenir, vedalaşılır. Ama IT tarafında ne olur?

Çoğu KOBİ'de cevap üzücü: hiçbir şey, ya da sadece e-posta hesabı kapatılır. Aradan aylar geçer, eski çalışan hâlâ şirket Dropbox'ına erişebiliyor, hâlâ CRM'e giriş yapabiliyor, hâlâ paylaşılan klasörlerdeki dosyaları görebiliyordur. Bu güvenlik açığı bilinmeden büyür.

Aşağıdaki checklist bir çalışan ayrıldığında IT tarafında yapılması gereken her şeyi içerir. Hiçbir madde atlanmamalıdır.

## Ayrılış Günü

Active Directory hesabı devre dışı: Silinmez, devre dışı bırakılır (sonradan dosya erişimi gerekebilir) E-posta hesabı: Şifresi değiştirilir, dış erişimi kapatılır, gelen e-postalar otomatik yanıt + yönlendirme VPN erişimi iptali: Uzak çalışıyorsa VPN ve uzaktan masaüstü iptal edilir Bulut servislerinden çıkış: Office 365, Google Workspace, Dropbox, Slack, vb.

## Bunu Sistemli Yapmak

30 maddenin her birini her ayrılışta hatırlamak imkansızdır. İK ve IT arasında bir checklist paylaşımı şarttır. İdeal olan, bu sürecin yarı otomatik hale gelmesidir — Active Directory'de bir hesap devre dışı bırakıldığında bağlı tüm SaaS hesaplarının otomatik kapatılması (SCIM provisioning), VPN erişiminin otomatik iptali, MDM'in cihazı uzaktan silmesi.

Yönetilen IT modelinde bu süreç standart hale gelir. [Active Directory KOBİ rehberi] yazımızda merkezi kullanıcı yönetiminin nasıl çalıştığını anlattık.

## Çalışan Giriş/Çıkış Otomasyonu

Şirketinize özel onboarding ve offboarding süreçleri kuruyoruz. Tek tıkla yeni çalışanın tüm hesapları açılıyor, ayrılan çalışanın tüm erişimleri otomatik kesiliyor. Görüşme talep edin.

## Sonuç

Çalışan ayrılışı duygusal bir süreçtir ve IT detayları arka planda kalır. Ama bu detaylar atlandığında ortaya çıkan riskler ciddidir: veri sızıntısı, müşteri kaybı, güvenlik açığı, KVKK ihlali. İyi bir checklist ve disiplinli uygulama bu riskleri sıfırlar.

Yapması zor değil, sadece sistemli olmak gerekir.
