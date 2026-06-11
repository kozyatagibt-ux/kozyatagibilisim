import { ArrowRight, Phone, MapPin, Wallet, Headphones, UserCheck } from 'lucide-react';

// Kompakt giriş: h1 + değer önerisi + çift CTA + 3 fayda.
// Bilinçli olarak statik (client directive yok) — ilk ekranda JS/animasyon yükü sıfır.
const BENEFITS = [
    {
        icon: UserCheck,
        title: 'Tek Muhatap',
        desc: 'Yazıcıdan sunucuya, tüm IT sorunlarınız için tek numara',
    },
    {
        icon: Wallet,
        title: 'Sabit Aylık Ücret',
        desc: 'Sürpriz fatura yok; IT bütçeniz baştan belli',
    },
    {
        icon: Headphones,
        title: 'Hızlı Müdahale',
        desc: 'Garantili yanıt süresi: uzaktan dakikalar içinde, yerinde aynı gün',
    },
];

const LandingIntro = () => (
    <section className="relative overflow-hidden">
        {/* Üstten yumuşak cyan parlama */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0ea5e926_0%,_transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-6 pt-10 pb-14 md:pt-16 md:pb-16 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
                {/* Lokasyon rozeti — yerel olmak bu işte güven demek */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-cyan-500/30 text-cyan-400 mb-6 backdrop-blur-sm">
                    <MapPin size={14} />
                    <span className="text-xs md:text-sm font-semibold tracking-wide">
                        Kozyatağı merkezli · İstanbul geneli yerinde &amp; uzaktan destek
                    </span>
                </div>

                {/* Düz Türkçe başlık — sektör jargonu ("yönetilen IT") ve hedef kitle etiketi bilinçli olarak yok */}
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                    <span className="block text-white mb-2">IT'yle Siz Uğraşmayın</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight pb-1">
                        Şirketinizin IT Departmanı Biziz
                    </span>
                </h1>

                {/* SEO: ana arama terimi görünür başlıktan çıkarıldı; ekran okuyucu/arama motoru için kısa tanım */}
                <p className="sr-only">
                    Kozyatağı Bilişim — İstanbul genelinde yönetilen IT hizmetleri ve kurumsal IT desteği: sunucu, network, firewall, kurumsal e-posta, yedekleme.
                </p>

                <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Bilgisayarlar, sunucu, internet, e-posta, güvenlik, yedekleme… Kurulumundan arızasına{' '}
                    <strong className="text-white font-semibold">şirketinizin tüm teknoloji işlerini biz üstleniyoruz</strong>.
                    Bordroya IT personeli eklemeden, sabit aylık ücretle.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <a
                        href="#contact"
                        className="w-full sm:w-auto justify-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-base md:text-lg transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 inline-flex items-center gap-2 group"
                    >
                        Ücretsiz Keşif Planla
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="tel:+905416367775"
                        className="w-full sm:w-auto justify-center px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-xl font-semibold text-base md:text-lg border border-slate-700 hover:border-slate-500 transition-all inline-flex items-center gap-2"
                    >
                        <Phone size={18} className="text-cyan-400" />
                        0541 636 77 75
                    </a>
                </div>

                {/* 3 satış argümanı — kart değil, hafif satır */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                    {BENEFITS.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex sm:flex-col items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80"
                        >
                            <div className="w-9 h-9 rounded-lg bg-cyan-900/30 border border-cyan-800/60 flex items-center justify-center flex-shrink-0">
                                <Icon size={18} className="text-cyan-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white mb-0.5">{title}</div>
                                <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default LandingIntro;
