import { Server, Shield, Network, Mail, Database, Users, Headphones, ShieldCheck, Stethoscope } from 'lucide-react';
import { services as servicesData } from '../data/services.js';

const ICONS = { Server, Shield, Network, Mail, Database, Users, Headphones, ShieldCheck, Stethoscope };

// Müşteri niyet sırası
const ORDER = [
    'ag-guvenligi-firewall',
    'felaket-kurtarma-yedekleme',
    'son-kullanici-destek',
    'sunucu-sanallastirma',
    'kurumsal-eposta',
    'network-altyapi',
    'kimlik-yonetimi',
    'dosya-paylasim',
    'it-saglik-kontrolu-denetim',
];

const COLOR_CLASS = {
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    orange: 'text-orange-400',
};

// Sade ve kompakt: tüm hizmetler ilk ekranda görünsün diye kartlar yatay/dar,
// büyük slogan ve pazarlama blokları yok. Kartın tamamı detay sayfasına link.
const Services = () => {
    const ordered = ORDER.map((slug) => servicesData.find((s) => s.slug === slug)).filter(Boolean);

    return (
        <section id="services" className="py-10 md:py-14 bg-slate-950 text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Kurumsal IT Hizmetleri</h1>
                    {/* SEO: ana arama terimleri — görünür metni pazarlama diline çevirmeden */}
                    <p className="sr-only">
                        Kozyatağı Bilişim — İstanbul genelinde yönetilen IT hizmetleri ve kurumsal IT desteği: sunucu, network, firewall, kurumsal e-posta, yedekleme.
                    </p>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                        Sunucudan ağ güvenliğine, e-postadan yedeklemeye — şirketinizin ihtiyaç duyduğu IT hizmetlerini kuruyor ve yönetiyoruz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {ordered.map((service) => {
                        const Icon = ICONS[service.icon] || Server;
                        const colorClass = COLOR_CLASS[service.color] || 'text-cyan-400';
                        return (
                            <a
                                key={service.slug}
                                href={`/hizmetler/${service.slug}`}
                                className="group p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-300 flex items-start gap-4"
                            >
                                <div className="bg-slate-800/50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-700/50 group-hover:border-cyan-500/30 transition-colors">
                                    <Icon className={`w-6 h-6 ${colorClass}`} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base md:text-lg font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                                        {service.shortTitle || service.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {service.tagline}
                                    </p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
