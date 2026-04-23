import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, X, Phone, ShieldCheck, ChevronDown, Plus,
    Server, Users, Database, Shield, Mail, Network, BookOpen, ArrowRight,
    Headphones, Stethoscope,
    Sparkles, Calculator, HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// No react-router-dom — use plain <a> tags and window.location

// Müşteri niyeti odaklı sıralama (alfabetik değil)
const SERVICES_MENU = [
    { slug: 'ag-guvenligi-firewall', icon: Shield, name: 'Ağ Güvenliği & Firewall', desc: 'IPS/IDS, VPN, uçtan uca koruma' },
    { slug: 'felaket-kurtarma-yedekleme', icon: ShieldCheck, name: 'Felaket Kurtarma & Yedekleme', desc: '3-2-1 yedek, bulut ve DR planı' },
    { slug: 'son-kullanici-destek', icon: Headphones, name: 'Son Kullanıcı Destek Hattı', desc: '7/24 helpdesk, SLA garantili' },
    { slug: 'sunucu-sanallastirma', icon: Server, name: 'Sunucu & Sanallaştırma', desc: 'Yedekli ve ölçeklenebilir altyapı' },
    { slug: 'kurumsal-eposta', icon: Mail, name: 'Kurumsal E-Posta', desc: 'Kurulum, taşıma, phishing koruması' },
    { slug: 'network-altyapi', icon: Network, name: 'Network & Altyapı', desc: 'Kablolama, switch, Wi-Fi, segmentasyon' },
    { slug: 'kimlik-yonetimi', icon: Users, name: 'Merkezi Kimlik Yönetimi', desc: 'SSO, MFA, yetki kontrolü' },
    { slug: 'dosya-paylasim', icon: Database, name: 'Dosya Paylaşım Çözümleri', desc: 'KVKK uyumlu güvenli paylaşım' },
    { slug: 'it-saglik-kontrolu-denetim', icon: Stethoscope, name: 'IT Sağlık Kontrolü & Denetim', desc: 'Tek seferlik IT değerlendirmesi' },
];

const PILLARS_MENU = [
    { slug: 'yonetilen-it-hizmetleri', name: 'Yönetilen IT Hizmetleri', desc: 'KOBİ için kapsamlı IT yönetimi rehberi' },
    { slug: 'kobi-siber-guvenlik', name: 'KOBİ Siber Güvenlik', desc: 'Tehditlerden korunma ve yanıt' },
    { slug: 'sirket-veri-yedekleme', name: 'Şirket Veri Yedekleme', desc: '3-2-1 kuralı, felaket kurtarma' },
    { slug: 'kurumsal-network-kurulumu', name: 'Kurumsal Network Kurulumu', desc: 'Ofis ağ tasarımı ve segmentasyonu' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // 'hizmetler' | 'rehberler' | null
    const [mobileAcc, setMobileAcc] = useState(null);
    const closeTimer = useRef(null);
    const [pathname, setPathname] = useState('/');
    const [onHome, setOnHome] = useState(false);

    useEffect(() => {
        setPathname(window.location.pathname);
        setOnHome(window.location.pathname === '/');

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Route değiştiğinde menüleri kapat
    useEffect(() => {
        if (typeof window === 'undefined') return;
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        setMobileAcc(null);
    }, [pathname]);

    const homeHash = (anchor) => (onHome ? `#${anchor}` : `/#${anchor}`);
    // Process/About/Comparison/PainPoints artık /hakkimizda sayfasında
    const aboutHash = (anchor) => `/hakkimizda#${anchor}`;

    const openMenu = (key) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenDropdown(key);
    };
    const scheduleClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
    };

    const baseLink = 'text-slate-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide';

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled || !onHome ? 'bg-slate-950 border-slate-800 py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="text-xl md:text-2xl font-bold tracking-tighter text-white">
                        KOZYATAĞI <span className="text-cyan-400">BİLİŞİM</span>
                    </div>
                </a>

                <div className="hidden md:flex items-center gap-7">
                    {/* HİZMETLER — mega menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => openMenu('hizmetler')}
                        onMouseLeave={scheduleClose}
                    >
                        <a href="/hizmetler" className={`${baseLink} flex items-center gap-1`}>
                            Hizmetler
                            <ChevronDown size={14} className={`transition-transform ${openDropdown === 'hizmetler' ? 'rotate-180' : ''}`} />
                        </a>
                        <AnimatePresence>
                            {openDropdown === 'hizmetler' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-0 top-full pt-2 w-[min(980px,calc(100vw-3rem))]"
                                >
                                    <div className="bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                                        <div className="grid grid-cols-12 gap-0">
                                            {/* SOL: Açıklama */}
                                            <div className="col-span-3 p-6 bg-gradient-to-br from-cyan-950/40 to-slate-950 border-r border-slate-800">
                                                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-4">
                                                    <Sparkles className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <div className="text-base font-bold text-white normal-case tracking-normal mb-2">
                                                    Yönetilen IT Hizmetleri
                                                </div>
                                                <div className="text-xs text-slate-400 normal-case tracking-normal leading-relaxed">
                                                    KOBİ ve orta ölçekli işletmeler için sunucudan ağa, güvenlikten e-postaya uçtan uca kurumsal IT yönetimi.
                                                </div>
                                            </div>

                                            {/* ORTA: Hizmet listesi */}
                                            <div className="col-span-6 p-4 border-r border-slate-800">
                                                <div className="px-2 pb-2 text-[10px] font-bold tracking-widest text-slate-500">
                                                    İHTİYACINIZA GÖRE
                                                </div>
                                                <div className="grid grid-cols-2 gap-1">
                                                    {SERVICES_MENU.map((s) => {
                                                        const Icon = s.icon;
                                                        return (
                                                            <a
                                                                key={s.slug}
                                                                href={`/hizmetler/${s.slug}`}
                                                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors group"
                                                            >
                                                                <div className="w-8 h-8 rounded-lg bg-cyan-900/30 border border-cyan-800/60 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/60 transition-colors">
                                                                    <Icon className="w-4 h-4 text-cyan-400" />
                                                                </div>
                                                                <span className="text-sm font-medium text-slate-200 group-hover:text-white normal-case tracking-normal">
                                                                    {s.name}
                                                                </span>
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* SAĞ: CTA kart */}
                                            <div className="col-span-3 p-6 bg-gradient-to-br from-blue-950/40 to-slate-950 flex flex-col justify-between">
                                                <div>
                                                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-3">
                                                        <Calculator className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                    <div className="text-sm font-bold text-white normal-case tracking-normal mb-1">
                                                        Ücretsiz IT Keşfi
                                                    </div>
                                                    <div className="text-xs text-slate-400 normal-case tracking-normal leading-relaxed">
                                                        30 dakikalık ön görüşmede mevcut altyapınızı analiz edelim.
                                                    </div>
                                                </div>
                                                <a
                                                    href={homeHash('contact')}
                                                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 normal-case tracking-normal"
                                                >
                                                    Keşfi Başlat <ArrowRight size={12} />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Alt çubuk */}
                                        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/60">
                                            <a
                                                href="/hizmetler"
                                                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs font-semibold normal-case tracking-normal"
                                            >
                                                Tüm hizmetleri gör <ArrowRight size={12} />
                                            </a>
                                            <span
                                                className="inline-flex items-center gap-2 text-xs text-slate-400 normal-case tracking-normal cursor-text"
                                            >
                                                <Phone size={12} /> 0541 636 77 75
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* REHBERLER — mega menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => openMenu('rehberler')}
                        onMouseLeave={scheduleClose}
                    >
                        <a href="/blog" className={`${baseLink} flex items-center gap-1`}>
                            Rehberler
                            <ChevronDown size={14} className={`transition-transform ${openDropdown === 'rehberler' ? 'rotate-180' : ''}`} />
                        </a>
                        <AnimatePresence>
                            {openDropdown === 'rehberler' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-0 top-full pt-2 w-[880px]"
                                >
                                    <div className="bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                                        <div className="grid grid-cols-12 gap-0">
                                            {/* SOL */}
                                            <div className="col-span-3 p-6 bg-gradient-to-br from-blue-950/40 to-slate-950 border-r border-slate-800">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-4">
                                                    <BookOpen className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div className="text-base font-bold text-white normal-case tracking-normal mb-2">
                                                    Bilgi Merkezi
                                                </div>
                                                <div className="text-xs text-slate-400 normal-case tracking-normal leading-relaxed">
                                                    KOBİ'ler için pratik IT rehberleri, vaka analizleri ve uzman içerikleri.
                                                </div>
                                            </div>

                                            {/* ORTA */}
                                            <div className="col-span-6 p-4 border-r border-slate-800">
                                                <div className="px-2 pb-2 text-[10px] font-bold tracking-widest text-slate-500">
                                                    KAPSAMLI REHBERLER
                                                </div>
                                                <div className="grid grid-cols-1 gap-1">
                                                    {PILLARS_MENU.map((p) => (
                                                        <a
                                                            key={p.slug}
                                                            href={`/${p.slug}`}
                                                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors group"
                                                        >
                                                            <div className="w-8 h-8 rounded-lg bg-blue-900/30 border border-blue-800/60 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/60 transition-colors">
                                                                <BookOpen className="w-4 h-4 text-blue-400" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="text-sm font-semibold text-white normal-case tracking-normal">{p.name}</div>
                                                                <div className="text-xs text-slate-500 normal-case tracking-normal">{p.desc}</div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* SAĞ */}
                                            <div className="col-span-3 p-6 bg-gradient-to-br from-cyan-950/40 to-slate-950 flex flex-col justify-between">
                                                <div>
                                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-3">
                                                        <HelpCircle className="w-5 h-5 text-cyan-400" />
                                                    </div>
                                                    <div className="text-sm font-bold text-white normal-case tracking-normal mb-1">
                                                        Sıkça Sorulanlar
                                                    </div>
                                                    <div className="text-xs text-slate-400 normal-case tracking-normal leading-relaxed">
                                                        Fiyatlandırma, geçiş, KVKK uyumu ve daha fazlası.
                                                    </div>
                                                </div>
                                                <a
                                                    href="/sss"
                                                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 normal-case tracking-normal"
                                                >
                                                    SSS Sayfası <ArrowRight size={12} />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/60">
                                            <a
                                                href="/blog"
                                                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs font-semibold normal-case tracking-normal"
                                            >
                                                Tüm rehberler & blog yazıları <ArrowRight size={12} />
                                            </a>
                                            <a
                                                href="/hakkimizda"
                                                className="text-xs text-slate-400 hover:text-white normal-case tracking-normal"
                                            >
                                                Hakkımızda →
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <a href={aboutHash('process')} className={baseLink}>Süreç</a>
                    <a href={aboutHash('about')} className={baseLink}>Neden Biz?</a>
                    <a href="/sss" className={baseLink}>SSS</a>
                    <a href={homeHash('contact')} className={baseLink}>İletişim</a>

                    <span
                        className="flex items-center gap-2 text-slate-300 font-medium text-sm cursor-text"
                    >
                        <Phone size={16} />
                        <span className="hidden lg:inline">+90 541 636 77 75</span>
                    </span>
                    <a
                        href={homeHash('contact')}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                    >
                        Ücretsiz Keşif
                    </a>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label="Menü"
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBİL MENÜ */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
                            {/* Hizmetler accordion */}
                            <div className="border-b border-slate-800/50">
                                <div className="flex items-center justify-between py-3">
                                    <a
                                        href="/hizmetler"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-medium text-slate-200 hover:text-white flex-1"
                                    >
                                        Hizmetler
                                    </a>
                                    <button
                                        onClick={() => setMobileAcc(mobileAcc === 'hizmetler' ? null : 'hizmetler')}
                                        className="p-2 -mr-2 text-slate-400"
                                        aria-label="Hizmetler alt menü"
                                    >
                                        <Plus size={20} className={`transition-transform ${mobileAcc === 'hizmetler' ? 'rotate-45' : ''}`} />
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {mobileAcc === 'hizmetler' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-3 pl-2 flex flex-col gap-1">
                                                {SERVICES_MENU.map((s) => {
                                                    const Icon = s.icon;
                                                    return (
                                                        <a
                                                            key={s.slug}
                                                            href={`/hizmetler/${s.slug}`}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/60 text-slate-300"
                                                        >
                                                            <Icon size={16} className="text-cyan-400" />
                                                            <span className="text-sm">{s.name}</span>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Rehberler accordion */}
                            <div className="border-b border-slate-800/50">
                                <div className="flex items-center justify-between py-3">
                                    <a
                                        href="/blog"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-medium text-slate-200 hover:text-white flex-1"
                                    >
                                        Rehberler
                                    </a>
                                    <button
                                        onClick={() => setMobileAcc(mobileAcc === 'rehberler' ? null : 'rehberler')}
                                        className="p-2 -mr-2 text-slate-400"
                                        aria-label="Rehberler alt menü"
                                    >
                                        <Plus size={20} className={`transition-transform ${mobileAcc === 'rehberler' ? 'rotate-45' : ''}`} />
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {mobileAcc === 'rehberler' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-3 pl-2 flex flex-col gap-1">
                                                {PILLARS_MENU.map((p) => (
                                                    <a
                                                        key={p.slug}
                                                        href={`/${p.slug}`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/60 text-slate-300"
                                                    >
                                                        <BookOpen size={16} className="text-blue-400" />
                                                        <span className="text-sm">{p.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <a
                                href={aboutHash('process')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-slate-300 hover:text-white py-3 border-b border-slate-800/50"
                            >
                                Süreç
                            </a>
                            <a
                                href={aboutHash('about')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-slate-300 hover:text-white py-3 border-b border-slate-800/50"
                            >
                                Neden Biz?
                            </a>
                            <a
                                href="/sss"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-slate-300 hover:text-white py-3 border-b border-slate-800/50"
                            >
                                SSS
                            </a>
                            <a
                                href={homeHash('contact')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-slate-300 hover:text-white py-3 border-b border-slate-800/50"
                            >
                                İletişim
                            </a>

                            <a
                                href={homeHash('contact')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-4 w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
                            >
                                Ücretsiz Keşif Al
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
