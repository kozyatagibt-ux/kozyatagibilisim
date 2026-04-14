---
slug: "it-altyapi-kontrol-listesi"
title: "Şirket IT Altyapı Kontrol Listesi: 50 Maddelik Denetim Rehberi"
type: "cluster"
pillar: 1
url: "/blog/it-altyapi-kontrol-listesi"
hedef_anahtar_kelime: "IT altyapı kontrol listesi"
meta_description: "50 maddelik IT altyapı kontrol listesi: sunucu, network, güvenlik, yedekleme, kullanıcı yönetimi ve KVKK denetimi. Yazdırılabilir checklist ile altyapınızı denetleyin."
kelime_sayisi: "1800"
pillar_linki: "/yonetilen-it-hizmetleri"
---

## Neden IT Altyapı Denetimi Yapmalısınız?

Şirketlerin IT altyapısı genellikle "çalıştığı sürece dokunma" mantığıyla yönetilir. Bu yaklaşım, sorunlar büyüyene kadar fark edilmemesine neden olur. Sunucu bir gün çöker, yedeklemenin aslında çalışmadığı ortaya çıkar, güvenlik açığı tespit edildiğinde iş işten geçmiş olur.

Düzenli IT denetimi yapan şirketler, yapamayanlara göre yılda ortalama %40 daha az plansız kesinti yaşar. Bu kontrol listesi, IT altyapınızı sistematik olarak gözden geçirmenizi sağlar.

Listeyi yazdırın, ilgili kişiyle birlikte madde madde kontrol edin. Her madde için "Evet", "Hayır" veya "Kontrol Edilmeli" olarak işaretleyin.

## A. Sunucu ve Altyapı (10 Madde)

1. Tüm sunucuların işletim sistemi güncel mi? (Windows Server güncellemeleri uygulanmış mı?)
2. Sunucu donanımı garanti kapsamında mı? Garanti bitiş tarihleri kayıtlı mı?
3. Sunucu odasında yeterli soğutma var mı? (Oda sıcaklığı 18-24 C arasında mı?)
4. UPS mevcut mu ve düzgün çalışıyor mu? Son test tarihi nedir?
5. UPS bataryaları son 3 yılda değiştirildi mi?
6. Sunucu disklerinde SMART hataları var mı? Disk sağlığı izleniyor mu?
7. RAID yapılandırması uygulanmış mı? Hangi RAID seviyesi kullanılıyor?
8. Sunucu kaynak kullanımı izleniyor mu? (CPU, RAM, disk doluluğu)
9. Sunucu odasına fiziksel erişim kontrollü mü? (Kilit, kart okuyucu, kamera)
10. Sanallaştırma kullanılıyorsa lisanslar güncel mi? (Hyper-V, VMware)

## B. Network ve Bağlantı (10 Madde)

11. Ağ topolojisi belgelenmiş mi? (Hangi cihaz nerede, hangi porta bağlı)
12. Switch'ler yönetilebilir (managed) mi? VLAN yapılandırması var mı?
13. Kablolama standart mı? (Cat6 veya üzeri, etiketli, düzenli)
14. Wi-Fi erişim noktaları kurumsal sınıf mı? (Ubiquiti, Cisco, Aruba)
15. Misafir Wi-Fi ağı, şirket ağından izole mi?
16. İnternet bağlantısı yedekli mi? (İki farklı ISP veya 4G yedek)
17. DNS ve DHCP servisleri düzgün yapılandırılmış mı?
18. Ağ performansı düzenli olarak ölçülüyor mu? (Hız testleri, gecikme)
19. Ağdaki tüm cihazlar envanterlenmiş mi? (IP adresi, MAC, lokasyon)
20. [Network altyapısı](/blog/network-altyapi-maliyet-rehberi) son 5 yılda gözden geçirildi mi?

## C. Güvenlik (10 Madde)

21. Tüm bilgisayarlarda kurumsal antivirüs/EDR çözümü var mı?
22. Firewall aktif mi ve kuralları son 6 ayda gözden geçirildi mi?
23. Tüm kullanıcı parolaları karmaşık ve düzenli aralıklarla değiştiriliyor mu?
24. Çok faktörlü kimlik doğrulama (MFA) etkin mi? (En azından e-posta ve VPN için)
25. [Siber güvenlik kontrol listesi](/blog/siber-guvenlik-kontrol-listesi) düzenli olarak uygulanıyor mu?
26. Güvenlik duvarı logları izleniyor mu? Anormallikler raporlanıyor mu?
27. USB portları politikayla kontrol ediliyor mu?
28. E-posta güvenliği yapılandırılmış mı? ([SPF, DKIM, DMARC](/blog/spf-dkim-dmarc-rehberi))
29. Son 1 yılda güvenlik farkındalık eğitimi verildi mi?
30. Eski/kullanılmayan hesaplar devre dışı bırakılmış mı?

## D. Yedekleme ve Felaket Kurtarma (10 Madde)

31. Düzenli yedekleme yapılıyor mu? Sıklığı nedir? (Günlük, haftalık)
32. [3-2-1 yedekleme kuralı](/blog/3-2-1-yedekleme-kurali) uygulanıyor mu?
33. Yedekler farklı fiziksel lokasyonda da saklanıyor mu? (Offsite veya bulut)
34. Yedeklemeden geri yükleme (restore) testi en son ne zaman yapıldı?
35. [RTO ve RPO](/blog/rto-rpo-nedir-kobi) hedefleri belirlenmiş mi?
36. [İş sürekliliği planı](/blog/is-surekliligi-plani-rehberi) yazılı olarak mevcut mu?
37. Yedekleme başarısız olduğunda bildirim alınıyor mu?
38. Kritik verilerin neler olduğu tanımlanmış mı? (Veritabanı, e-posta, dosyalar)
39. Yedekleme medyaları (disk, tape) sağlıklı mı? Son kontrol tarihi?
40. Fidye yazılımı saldırısına karşı yedekleme izole mi? (Air-gapped veya immutable)

## E. Kullanıcı Yönetimi (5 Madde)

41. Active Directory veya merkezi kimlik yönetimi kullanılıyor mu?
42. [Çalışan ayrıldığında IT süreci](/blog/calisan-ayrildiginda-it-sureci) tanımlanmış mı?
43. [Yeni çalışan IT onboarding](/blog/yeni-calisan-it-onboarding) süreci standart mı?
44. Kullanıcı yetkileri "en az yetki" prensibiyle mi verilmiş? (Herkes admin mi?)
45. Yazılım lisansları yeterli sayıda mı? Lisans envanteri tutulmuş mu?

## F. KVKK ve Yasal Uyum (5 Madde)

46. [KVKK uyumu](/blog/kvkk-icin-nereden-baslamali) için teknik tedbirler alınmış mı?
47. Kişisel veri envanteri çıkarılmış mı?
48. Veri işleme faaliyetleri kayıt altına alınmış mı? (VERBİS kaydı)
49. Veri ihlali durumunda bildirim prosedürü tanımlanmış mı?
50. Çalışanlara KVKK farkındalık eğitimi verilmiş mi?

## Puanlama ve Değerlendirme

Kontrol listesini tamamladıktan sonra "Evet" yanıtlarınızı sayın:

| Puan Aralığı | Değerlendirme | Aksiyon |
|-------------|---------------|---------|
| 45-50 Evet | Mükemmel | Mevcut düzeyi koruyun, yıllık denetimi sürdürün |
| 35-44 Evet | İyi | Eksik maddeleri 3 ay içinde tamamlayın |
| 25-34 Evet | Orta | Acil iyileştirme planı yapın, profesyonel destek alın |
| 15-24 Evet | Zayıf | Ciddi risk altındasınız, hemen harekete geçin |
| 0-14 Evet | Kritik | IT altyapınız acil müdahale gerektiriyor |

## Denetim Sıklığı Önerileri

- **Aylık**: Yedekleme testleri, güvenlik güncellemeleri, disk sağlığı kontrolü
- **Üç aylık**: Kullanıcı hesap denetimi, firewall kural gözden geçirme, performans analizi
- **Altı aylık**: Tam altyapı denetimi (bu listenin tamamı)
- **Yıllık**: Stratejik IT planlaması, bütçe gözden geçirme, donanım yenileme planı

## Denetim Sonrası Ne Yapmalı?

### Kısa Vadeli (0-30 Gün)

Kritik güvenlik açıklarını kapatın:
- Güncellenmeyen sistemleri hemen güncelleyin
- MFA etkin değilse derhal aktifleştirin
- Çalışmayan yedeklemeleri düzeltin
- Eski kullanıcı hesaplarını devre dışı bırakın

### Orta Vadeli (1-3 Ay)

Altyapıyı güçlendirin:
- Eksik dokümantasyonu tamamlayın
- Network segmentasyonunu uygulayın
- Yedekleme stratejisini gözden geçirin
- Güvenlik farkındalık eğitimi planlayın

### Uzun Vadeli (3-12 Ay)

Stratejik iyileştirmeler yapın:
- Eski donanımları yenileyin
- [Bulut geçişi](/blog/kobi-bulut-gecis-rehberi) değerlendirin
- İş sürekliliği planı hazırlayın
- IT bütçesini optimize edin

## Yaygın Hatalar

Bu denetimi yaparken şirketlerin en sık düştüğü hatalar:

- **"Yedekleme çalışıyor" varsayımı**: Geri yükleme testi yapmadan yedeklemenin çalıştığına güvenmek
- **Güvenlik güncellemelerini ertelemek**: "Bir şey bozulur" korkusuyla güncellemeleri yapmamak
- **Dokümantasyon eksikliği**: Parolalar, IP adresleri, konfigürasyonlar sadece bir kişinin kafasında
- **"Bize bir şey olmaz" düşüncesi**: [Fidye yazılımı saldırıları](/blog/fidye-yazilimi-kobi-korunma) küçük şirketleri de hedef alır
- **Lisans takibi yapmamak**: Denetimlerde telif ihlali cezalarıyla karşılaşma riski

## Sonuç

Bu 50 maddelik kontrol listesi, IT altyapınızın genel sağlığını ölçmenin en pratik yoludur. Ancak denetim yapmak, tespit edilen sorunları çözmekle anlam kazanır.

Birçok şirket denetimi kendi başına yapabilir; ancak tespit edilen sorunların çözümü, önceliklendirmesi ve stratejik planlama için profesyonel destek büyük fark yaratır. Kozyatagı Bilişim olarak kapsamlı IT altyapı denetimi hizmeti sunuyor, sonuçları detaylı raporla paylaşıyor ve çözüm yol haritası oluşturuyoruz. Ücretsiz ön değerlendirme için bize ulaşabilirsiniz.
