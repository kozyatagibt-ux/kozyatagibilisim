import { MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
            {/* Main footer */}
            <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                {/* Brand — 4 columns */}
                <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tighter">
                            KOZYATAĞI <span className="text-cyan-400">BİLİŞİM</span>
                        </span>
                    </div>
                    <p className="leading-relaxed max-w-sm mx-auto md:mx-0">
                        İstanbul merkezli, KOBİ ve orta ölçekli işletmelere yönetilen IT hizmetleri sunan kurumsal teknoloji ortağınız. Tek muhatap, öngörülebilir bütçe, kesintisiz altyapı.
                    </p>
                    <a
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Ücretsiz Keşif Planla →
                    </a>
                </div>

                {/* Hizmetler — 2.5 columns */}
                <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-3">
                    <h3 className="text-white font-semibold text-base mb-1">Hizmetler</h3>
                    <ul className="flex flex-col items-center md:items-start space-y-2 w-full">
                        <li><a href="/hizmetler/ag-guvenligi-firewall" className="hover:text-cyan-400 transition-colors">Ağ Güvenliği & Firewall</a></li>
                        <li><a href="/hizmetler/felaket-kurtarma-yedekleme" className="hover:text-cyan-400 transition-colors">Felaket Kurtarma & Yedekleme</a></li>
                        <li><a href="/hizmetler/son-kullanici-destek" className="hover:text-cyan-400 transition-colors">Son Kullanıcı Destek</a></li>
                        <li><a href="/hizmetler/sunucu-sanallastirma" className="hover:text-cyan-400 transition-colors">Sunucu & Sanallaştırma</a></li>
                        <li><a href="/hizmetler/kurumsal-eposta" className="hover:text-cyan-400 transition-colors">Kurumsal E-Posta</a></li>
                        <li><a href="/hizmetler/network-altyapi" className="hover:text-cyan-400 transition-colors">Network & Altyapı</a></li>
                        <li><a href="/hizmetler/kimlik-yonetimi" className="hover:text-cyan-400 transition-colors">Merkezi Kimlik Yönetimi</a></li>
                        <li><a href="/hizmetler" className="text-cyan-400 hover:text-cyan-300 font-medium mt-1">Tüm hizmetler →</a></li>
                    </ul>
                </div>

                {/* Şirket & Rehberler — 2 columns */}
                <div className="md:col-span-2 flex flex-col items-center md:items-start space-y-3">
                    <h3 className="text-white font-semibold text-base mb-1">Şirket</h3>
                    <ul className="flex flex-col items-center md:items-start space-y-2 w-full">
                        <li><a href="/hakkimizda" className="hover:text-cyan-400 transition-colors">Hakkımızda</a></li>
                        <li><a href="/sss" className="hover:text-cyan-400 transition-colors">Sıkça Sorulan Sorular</a></li>
                        <li><a href="/blog" className="hover:text-cyan-400 transition-colors">Rehberler & Blog</a></li>
                        <li><a href="/#contact" className="hover:text-cyan-400 transition-colors">İletişim</a></li>
                    </ul>

                    <h3 className="text-white font-semibold text-base mt-4 mb-1">Rehberler</h3>
                    <ul className="flex flex-col items-center md:items-start space-y-2 w-full">
                        <li><a href="/yonetilen-it-hizmetleri" className="hover:text-cyan-400 transition-colors">Yönetilen IT Hizmetleri</a></li>
                        <li><a href="/kobi-siber-guvenlik" className="hover:text-cyan-400 transition-colors">KOBİ Siber Güvenlik</a></li>
                        <li><a href="/sirket-veri-yedekleme" className="hover:text-cyan-400 transition-colors">Şirket Veri Yedekleme</a></li>
                        <li><a href="/kurumsal-network-kurulumu" className="hover:text-cyan-400 transition-colors">Kurumsal Network</a></li>
                    </ul>
                </div>

                {/* İletişim — 3 columns */}
                <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-3">
                    <h3 className="text-white font-semibold text-base mb-1">İletişim</h3>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-start justify-center md:justify-start gap-3 group">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/10 transition-colors flex-shrink-0">
                                <MapPin className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="leading-relaxed text-center md:text-left">Quick Tower, İçerenköy E-5 Yanyolu,<br />Umut Sk. No:8, 34752 Ataşehir/İstanbul</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3 group">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/10 transition-colors flex-shrink-0">
                                <Mail className="w-4 h-4 text-blue-500" />
                            </div>
                            <a href="mailto:destek@kozyatagibilisim.com" className="hover:text-white transition-colors">destek@kozyatagibilisim.com</a>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3 group">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/10 transition-colors flex-shrink-0">
                                <Phone className="w-4 h-4 text-blue-500" />
                            </div>
                            <a href="tel:+905416367775" className="hover:text-white transition-colors tracking-wide">0541 636 77 75</a>
                        </div>
                    </div>

                    {/* Yasal */}
                    <div className="pt-4 border-t border-slate-800/50 w-full mt-2">
                        <ul className="flex flex-col items-center md:items-start space-y-1.5 text-xs text-slate-500">
                            <li><a href="/kvkk-aydinlatma-metni.html" className="hover:text-slate-300 transition-colors">KVKK Aydınlatma Metni</a></li>
                            <li><a href="/gizlilik-politikasi.html" className="hover:text-slate-300 transition-colors">Gizlilik Politikası</a></li>
                            <li><a href="/cerez-politikasi.html" className="hover:text-slate-300 transition-colors">Çerez Politikası</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Hizmet Bölgeleri — SEO internal links */}
            <div className="border-t border-slate-900/60">
                <div className="container mx-auto px-6 py-6">
                    <p className="text-xs text-slate-600 mb-3 text-center font-medium">Hizmet Bölgelerimiz</p>
                    <div className="flex flex-wrap justify-center gap-x-1 gap-y-1 text-[11px] text-slate-600">
                        {[
                            { name: 'Ataşehir', slug: 'atasehir-it-destegi' },
                            { name: 'Kadıköy', slug: 'kadikoy-it-destegi' },
                            { name: 'Maltepe', slug: 'maltepe-it-destegi' },
                            { name: 'Ümraniye', slug: 'umraniye-it-destegi' },
                            { name: 'Üsküdar', slug: 'uskudar-it-destegi' },
                            { name: 'Kartal', slug: 'kartal-it-destegi' },
                            { name: 'Pendik', slug: 'pendik-it-destegi' },
                            { name: 'Tuzla', slug: 'tuzla-it-destegi' },
                            { name: 'Çekmeköy', slug: 'cekmekoy-it-destegi' },
                            { name: 'Sancaktepe', slug: 'sancaktepe-it-destegi' },
                            { name: 'Beykoz', slug: 'beykoz-it-destegi' },
                            { name: 'Kozyatağı', slug: 'kozyatagi-it-destegi' },
                            { name: 'Kavacık', slug: 'kavacik-it-destegi' },
                            { name: 'İçerenköy', slug: 'icerenkoy-it-destegi' },
                            { name: 'Levent', slug: 'levent-it-destegi' },
                            { name: 'Maslak', slug: 'maslak-it-destegi' },
                            { name: 'Şişli', slug: 'sisli-it-destegi' },
                            { name: 'Mecidiyeköy', slug: 'mecidiyekoy-it-destegi' },
                            { name: 'Beşiktaş', slug: 'besiktas-it-destegi' },
                            { name: 'Beyoğlu', slug: 'beyoglu-it-destegi' },
                            { name: 'Kağıthane', slug: 'kagithane-it-destegi' },
                            { name: 'Sarıyer', slug: 'sariyer-it-destegi' },
                            { name: 'Bakırköy', slug: 'bakirkoy-it-destegi' },
                            { name: 'Bahçelievler', slug: 'bahcelievler-it-destegi' },
                            { name: 'Bağcılar', slug: 'bagcilar-it-destegi' },
                            { name: 'Güneşli', slug: 'gunesli-it-destegi' },
                            { name: 'Beylikdüzü', slug: 'beylikduzu-it-destegi' },
                            { name: 'Esenyurt', slug: 'esenyurt-it-destegi' },
                            { name: 'Avcılar', slug: 'avcilar-it-destegi' },
                        ].map((loc, i, arr) => (
                            <span key={loc.slug}>
                                <a href={`/${loc.slug}`} className="hover:text-cyan-400 transition-colors">{loc.name}</a>
                                {i < arr.length - 1 && <span className="text-slate-800 mx-0.5">·</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-900">
                <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} Kozyatağı Bilişim. Tüm hakları saklıdır.
                    </p>
                    <p className="text-xs text-slate-700">
                        İstanbul KOBİ'leri için yönetilen IT hizmetleri
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
