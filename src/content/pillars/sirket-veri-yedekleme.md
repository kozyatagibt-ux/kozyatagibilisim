---
slug: sirket-veri-yedekleme
title: "Şirket Veri Yedekleme Rehberi: Hiçbir Şey Kaybetmeden Çalışmak"
type: pillar
pillar: 3
url: "/sirket-veri-yedekleme"
hedef_anahtar_kelime: "şirket veri yedekleme"
ikincil_kelimeler: "kurumsal yedekleme çözümleri, otomatik yedekleme şirket"
meta_description: "Şirket verilerinizi nasıl yedeklemeli, hangi stratejiyi seçmelisiniz? Yerel, bulut ve hibrit yedekleme çözümlerinin 2026 rehberi. Felaket kurtarma planı dahil."
kelime_sayisi: "~4200"
ic_linkler: "/blog/3-2-1-yedekleme-kurali, /blog/nas-mi-bulut-depolama-mi, /blog/sunucu-cokmesi-acil- mudahale, /blog/fidye-yazilimi-saldirisi-yapilacaklar"
---

Giriş: 12 Yıllık Şirket, 12 Saatte Yok Oldu İstanbul'da bir mobilya üretim firması düşünün. Sahibi 12 yıl boyunca tüm müşteri verilerini, üretim çizimlerini, finansal kayıtları, tedarikçi sözleşmelerini ofisindeki bir sunucuda biriktirdi. Yedek alıyor muydu?

Aldığını sanıyordu — sunucuya bir harici disk bağlanmıştı, "bilgisayarcı kurmuştu", her gün bir şeyler kopyalanıyordu sandı. Bir sabah sunucuda fidye yazılımı tespit edildi. Tüm dosyalar şifrelenmişti.

000 TL fidye istedi. Bilgisayarcı çağrıldı. Yedeklerden geri dönülecekti — sunucudaki harici disk takılı, içinde de yedekler vardı.

Ama ne yazık ki harici disk de sunucuya bağlıydı, onun da içindekiler şifrelenmişti. "Bulutta yedek var mı?" sorusunun cevabı yoktu çünkü hiç yapılmamıştı.

Şirket sahibi fidyeyi ödedi — ödediği halde dosyaların çoğu geri gelmedi. 12 yıllık iş hayatı yarıya indi. Bazı eski müşterilerin bilgileri sonsuza dek kayboldu.

Bazı sözleşmelerin orijinalleri kayboldu. Toparlanması bir yıldan fazla sürdü ve bazı şeyler asla geri gelmedi. Bu hikaye uydurma değil.

Türkiye'de her yıl onlarca KOBİ aynı senaryoyu yaşıyor. Ortak noktaları: yedek aldıklarını sanıyorlardı ama yedekleri ya yoktu, ya bozuktu, ya saldırıdan etkilenmişti. Bu yazı tam olarak bu hikayenin sizin başınıza gelmemesi için var.

Veri Kaybının Gerçek Maliyeti "Bizim önemli bir verimiz yok" cümlesini sıkça duyarız. Ama soruyu yeniden sorduğunuzda fotoğraf değişir. Müşteri listeniz olmadan satış yapabilir misiniz?

Geçmiş 5 yılın faturaları olmadan vergi denetimi geldiğinde ne olur? Tasarımlarınız veya formülleriniz olmadan üretime devam edebilir misiniz? E-posta arşiviniz olmadan eski iletişimleri nasıl bulursunuz?

Cevaplar genelde "yapamayız" yönünde çıkar. Dünya çapında istatistikler veri kaybı yaşayan KOBİ'lerin önemli bir kısmının 6 ay içinde kapandığını gösteriyor. Sebep sadece veri kaybı değil — operasyonel kesintinin maliyeti, müşteri güveninin sarsılması, çalışan moralinin düşmesi, tedarikçilerle ilişkilerin bozulması.

Bir veri kaybı olayı bir KOBİ için çoğu zaman onarılması en zor zarardır. Veri Kaybına Yol Açan Yaygın Senaryolar Donanım arızası: Disk çöker, sunucu yanar, RAID bozulur İnsan hatası: Yanlışlıkla silme, yanlış üzerine yazma, format atma Fidye yazılımı: Tüm dosyaların şifrelenmesi Hırsızlık: Laptop çalınması, sunucu çalınması Doğal afet: Yangın, sel, deprem Yazılım hataları: Veritabanı bozulması, güncelleme felaketi İçeriden tehdit: Mutsuz çalışanın kasıtlı silme Tedarikçi sorunu: Bulut sağlayıcıda kesinti veya iflas Bu senaryoların hiçbiri "bana olmaz" denilebilecek türden değildir. Çünkü hepsi birden çok KOBİ'de gerçekleşmiştir ve gerçekleşecektir.

Yedekleme Türleri: Full, Incremental, Differential Yedekleme stratejisinin temel kavramlarını anlamadan iyi bir karar veremezsiniz. Üç temel yedekleme türü vardır. Full Backup (Tam Yedek) Tüm verilerin baştan sona kopyalanmasıdır.

Avantajı: geri yükleme hızlıdır, tek bir kaynaktan tüm verileri alabilirsiniz. Dezavantajı: çok yer kaplar ve uzun sürer. Her gün full backup almak çoğu KOBİ için pratik değildir.

Incremental Backup (Artırımlı Yedek) Sadece son yedeklemeden bu yana değişen dosyaları yedekler. Çok daha az yer kaplar ve hızlıdır. Dezavantajı: geri yükleme için son full backup + ondan sonraki tüm incremental'lar gereklidir.

Yani 1 hafta önceki bir full + her günkü incremental zincirini geri yüklemeniz gerekir. Differential Backup (Farklılık Yedeği) Son full backup'tan bu yana değişen tüm dosyaları yedekler. Incremental'dan farkı: her gün biriken farkları içerir.

Geri yükleme için sadece full + son differential gerekir, daha kolay. Ama incremental'dan daha çok yer kaplar.

## Tipik Bir KOBİ Stratejisi

Pratikte uygulanan strateji genellikle şöyledir: Pazar günü gece full backup alınır, hafta içi her gün incremental veya differential alınır. Bu sayede minimum disk kullanımı ile her günün durumuna geri dönülebilir. 3-2-1 Kuralı: Yedekleme Dünyasının Altın Kuralı Bu kural 80'lerden beri yedekleme dünyasında standart kabul edilir ve hâlâ geçerliliğini korur.

Şöyle der: 3 kopyada veriniz olsun. 2 farklı medya tipinde saklansın. 1 tanesi farklı bir lokasyonda olsun.

Bu kuralın detaylı açıklaması, neden bu sayılar olduğu ve pratik uygulama örnekleri için [3-2-1 yedekleme kuralı] yazımıza bakabilirsiniz. Ama özet olarak: tek bir yedek yedek değildir. Tek bir lokasyondaki yedekler felakete karşı korumasızdır.

Tek bir medya tipindeki yedekler o medyanın özel açıklarına karşı savunmasızdır. Yerel Yedekleme: NAS, Harici Disk, Sunucu Yerel yedekleme, verilerin sizin fiziksel kontrolünüzde olduğu yedekleme türüdür. En yaygın yöntemler şunlardır.

## Harici Disk

En basit ve en ucuz yöntem. USB'yle takılan bir harici diske yedek alınır. Çok küçük şirketler için kabul edilebilir bir başlangıç olabilir ama ciddi bir KOBİ stratejisi olarak yetersizdir.

Sebepleri: Disk bilgisayara takılı kaldığında fidye yazılımı bunu da etkileyebilir. Disklerin manuel takılıp çıkarılması unutulur. Disk arızası tek noktada hata oluşturur.

Yangın veya su gibi felaketlerde yedek de kaybolur. NAS (Network Attached Storage) Ağa bağlı depolama cihazıdır. Synology, QNAP, Netgear gibi markalar yaygındır.

Şirket ağındaki bilgisayarlar ve sunucular otomatik olarak NAS'a yedeklenir. Avantajları: merkezi yönetim, RAID ile disk arıza koruması, otomatik zamanlanmış yedekleme, kolay paylaşım, snapshot özelliği. Dezavantajları: yerel olduğu için aynı binadaki felakete karşı savunmasız, profesyonel kurulum gerektirir.

Sunucu Tabanlı Yedekleme Eğer şirketinizde bir sunucu varsa, o sunucu üzerinde özel yedekleme yazılımları (Veeam, Acronis, Macrium) kurulur ve diğer cihazların yedeklerini bu sunucu tutar. Daha gelişmiş senaryolar için (sanallaştırma, snapshot, deduplication) idealdir. Bulut Yedekleme: Off-Site Koruma Bulut yedekleme, verilerin internet üzerinden uzak veri merkezlerine yedeklenmesidir.

3-2-1 kuralının "1 farklı lokasyon" şartını kolayca karşılar. Bulut Yedekleme Türleri Hyperscale buluta direkt: Azure, AWS, Google Cloud gibi platformlara yedekleme. Esnek ve ölçeklenebilir ama yapılandırma karmaşıktır.

Dedicated backup servisleri: Backblaze, Acronis, Datto gibi yedeklemeye özel hizmetler. Daha kullanıcı dostudur, KOBİ için ideal. Yerel sağlayıcılar: Türkiye'de bulutlu yedekleme sunan firmalar.

Veri lokalitesi ve KVKK açısından avantajlı olabilir. SaaS yedekleme: Office 365 veya Google Workspace verilerinin yedeklenmesi. Bu ayrı bir kategoridir çünkü Microsoft ve Google kendi servislerinin yedeklerini sınırlı tutar — uzun vadeli arşiv için ek bir yedekleme gerekir.

Bulut Yedeklemenin Avantajları Coğrafi olarak ayrı, felakete karşı koruma Otomatik, manuel müdahale gerektirmez Donanım yatırımı yok, abonelik bazlı Şifreleme standart Versiyonlama ve uzun dönem saklama Bulut Yedeklemenin Zorlukları İnternet bağlantısı bağımlılığı Büyük verilerin yedeklenmesi yavaş olabilir Geri yükleme süresi internet hızına bağlıdır Aylık abonelik maliyeti zaman içinde birikir Veri sahipliği ve bağımlılık endişeleri Hibrit Yedekleme: En İyi Seçenek Modern yedekleme stratejisi neredeyse her zaman hibrit modeldir: hem yerel hem bulut. Yerel yedek hız sağlar (büyük dosyaların hızlıca geri yüklenmesi), bulut yedek felaket koruması sağlar. İkisi birlikte 3-2-1 kuralının her parçasını karşılar.

Tipik bir hibrit senaryo şöyledir: günlük yedekler şirket içindeki NAS'a alınır (hızlı erişim), haftalık yedekler buluta gönderilir (felaket koruması), aylık arşivler ayrı bir bulut katmanında uzun süre saklanır (uyum gereksinimleri). NAS mı bulut mu seçimi ile ilgili daha detaylı konuştuğumuz [NAS mı bulut depolama mı] yazımıza bakabilirsiniz. Yedek Doğrulama: En Çok Atlanan Adım Yedek var ama açılıyor mu?

Bu sorunun cevabı çoğu KOBİ'de ne yazık ki "bilmiyoruz"dur. Yedeklemenin en temel kuralı şudur: test edilmemiş yedek yedek değildir. Yedeklerin doğrulanması üç katmanda yapılır: Otomatik doğrulama: Yedekleme yazılımı her yedeği aldığında dosya bütünlüğünü kontrol eder (checksum) Manuel test: Aylık olarak rastgele bir dosyayı yedekten geri yükleyip içeriğini kontrol etmek Tam tatbikat: Yılda en az bir kez bir sunucuyu sıfırdan yedekten geri yükleme tatbikatı Bu testler yapılmadan, yedeklerinize güvenmeniz için hiçbir gerçek sebebiniz yoktur.

Çoğu felaket hikayesi "yedek aldığımızı sanıyorduk" cümlesiyle başlar. Felaket Kurtarma Planı (DRP) Disaster Recovery Plan, bir felaket durumunda şirketin nasıl toparlanacağını adım adım anlatan dokümandır. Kriz anında düşünmek yerine yazılı plana uymak çok daha hızlı ve etkilidir.

İyi bir DRP şu soruları cevaplar: Hangi sistemler kritiktir, hangileri ikinci derecede önemlidir? Her sistem için kabul edilebilir maksimum kesinti süresi nedir? (RTO) Her sistem için kabul edilebilir maksimum veri kaybı nedir?

(RPO) Bir felaket durumunda kim aranır, hangi sırayla? Geçici çalışma ortamı nasıl kurulur? Müşterilere nasıl iletişim yapılır?

Tedarikçilere nasıl bilgi verilir?

## RTO ve RPO Kavramları

Bu iki kısaltma yedekleme kararlarınızın temelini oluşturur. Anlamadan iyi bir strateji oluşturamazsınız. RTO: Recovery Time Objective "Kabul edilebilir maksimum kesinti süresi" demektir.

Bir felaket olduktan sonra sistemin tekrar çalışır hale gelmesi için ne kadar süre tolere edebilirsiniz? Bir e-ticaret sitesi için RTO 1 saat olmalıdır — daha fazla durmak felaket. Bir muhasebe sunucusu için RTO 24 saat olabilir.

Bir arşiv sistemi için RTO 1 hafta bile kabul edilebilir. RTO ne kadar düşükse altyapı maliyeti o kadar yüksek olur. Çünkü 1 saatte geri dönmek için sıcak yedek (hot backup), failover sistemleri, replikasyon gerekir.

24 saatte geri dönmek için standart yedekleme yeterlidir. RPO: Recovery Point Objective "Kabul edilebilir maksimum veri kaybı süresi" demektir. Bir felaket olduğunda en son hangi dakikaya kadar veriniz olmalı?

Bir bankanın RPO'su sıfırdır — hiç veri kaybına tahammülü yoktur. Bir ofisin RPO'su 1 gün olabilir. Yani "dün gece yarısına kadar olan veriler bizde olsun yeter."

RPO sıkı oldukça yedekleme sıklığı artmak zorundadır. Saatlik yedek, sürekli replikasyon gibi yöntemler düşük RPO'lar için gereklidir. Her sistem için RTO ve RPO farklı olmalıdır.

Hepsini sıfır yapmaya çalışmak gereksiz pahalıdır; hepsini 1 hafta yapmak da güvensizdir. Doğru karar iş etkisine göre yapılır. KVKK ve Yedekleme İlişkisi KVKK perspektifinden yedekleme iki yönlüdür.

Birinci yön: kişisel verilerin uygun teknik tedbirlerle korunması zorunludur, bu yedeklemeyi kapsar. Yedeği olmayan bir sistemin ihlali daha ciddi sonuçlar doğurur. İkinci yön daha az bilinir ama önemlidir: kişi "verilerimi silin" hakkı kullandığında, yedeklerden de silmeniz gerekir mi?

Cevap: tamamen değil ama belgelenmesi şarttır. Yedeklerden direkt silme genelde teknik olarak imkansızdır (özellikle band kayıtlardan). Ama belirli süreler sonunda yedeklerin döngüye girip silinmesi ve bu sürecin belgelenmesi gerekir.

Yedekleme politikanızda bu süreler net olmalıdır.

## Sıkça Sorulan Sorular

Yedeklemenin ne kadar maliyeti olur? Çok değişken. 000 TL aralığındadır.

Ama bu maliyet bir felaket anında milyonlarca lira tasarruf sağlar. Office 365 verilerimi de yedeklemeli miyim? Evet, mutlaka.

Microsoft Office 365 verilerinin sınırlı bir koruma süresi vardır (genelde 30 gün). Eğer 6 ay önce silinmiş bir e-postaya ihtiyacınız olursa, ek yedekleme olmadan bulamazsınız. Veeam, AvePoint, Acronis gibi çözümler Office 365 yedekleme sunar.

Cloud yedek yeterli değil mi? Tek başına yeterli değildir. 3-2-1 kuralı en az iki farklı lokasyon gerektirir.

Cloud + yerel iyi bir kombinasyondur. Yedeklerimi şifrelemem gerekir mi? Mutlaka.

Şifrelenmemiş yedek, çalındığında kişisel verilerin sızması anlamına gelir ve KVKK ihlali oluşturur. Modern yedekleme yazılımları AES-256 şifreleme sunar. Tape (band) yedekleme hâlâ mantıklı mı?

Çok büyük veri hacimleri (terabaytlar üstü) ve uzun süreli arşivleme için band hâlâ ekonomiktir. KOBİ'ler için disk ve bulut bazlı çözümler daha pratiktir. Sunucularımı kendim yedekleyebilir miyim?

Teknik olarak mümkün ama önerilmez. Yedekleme detay isteyen bir alandır — bir hata fark edilmeden aylarca devam edebilir ve felaket anında ortaya çıkar. Profesyonel destek almak değerinden çok katma değer sağlar.

## Yedekleme Altyapınızı Ücretsiz Değerlendirin

Mevcut yedekleme stratejinizi inceliyor, açıklarınızı ve risklerinizi raporluyoruz. 3-2-1 kuralına uyum, RTO/RPO uygunluğu, doğrulama süreçleri — hepsi kontrol edilir. Görüşme talep etmek için iletişim formunu kullanın.

## Sonuç

Yedekleme görünmez bir sigortadır. Hiç olmadığında fark etmezsiniz, var olduğunda ise hayatınızı kurtarır. KOBİ sahiplerinin en çok pişmanlık duyduğu IT kararı genellikle "yedeklemeye yeterince yatırım yapmamış olmak"tır.

Bu karar tipik olarak bir veri kaybı yaşandıktan sonra verilir — yani çok geç. İyi haber şu: yedekleme artık karmaşık değil. Doğru araçlarla, doğru stratejiyle, doğru disiplinle bir KOBİ'nin verilerini koruma altına almak haftalar içinde mümkün.

Kötü haber şu: bu işi profesyonel yapmazsanız, yapmıyormuşsunuz gibidir. Yarım yamalak yedekleme, hiç yedek olmamasından bile tehlikeli olabilir çünkü sahte güven verir. Eğer bu yazıyı okuduktan sonra "bizim yedekleme durumumuz nedir, gerçekten test edildi mi" diye bir soru aklınıza geldiyse, doğru yere baktınız demektir.

Cevabını öğrenmek için kendi başınıza saatlerce uğraşmak yerine, bir uzman 1 saatte size net bir resim çıkarabilir. Sonrası ise sizin tercihiniz: olduğu gibi devam edersiniz veya iyileştirirsiniz. Ama en azından kör değil, gözünüz açık karar vermiş olursunuz.
