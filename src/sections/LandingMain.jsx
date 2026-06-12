import { Server, Shield, Network, Mail, Database, Users, Headphones, ShieldCheck, Stethoscope, ArrowRight, Phone } from 'lucide-react';
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

const STEPS = [
    {
        title: 'İhtiyacınızı yerinde dinliyoruz',
        desc: 'Ofisinize gelir; ihtiyacınızı ve mevcut altyapınızı yerinde inceleriz. Keşif ücretsizdir.',
    },
    {
        title: 'Teklif ve aksiyon planı sunuyoruz',
        desc: 'Size özel teklifi ve adım adım aksiyon planını hazırlayıp önünüze koyarız.',
    },
    {
        title: 'Kurup çalışır halde teslim ediyoruz',
        desc: 'Kurulumu uçtan uca üstleniriz; sistemi test edilmiş ve çalışır halde devralırsınız.',
    },
];

// Webflow tarzı açılış: solda büyük başlık + CTA, sağda hizmet listesi.
// Hemen altında yatay 3 adımlık süreç şeridi. Statik render, client JS yok.
const LandingMain = () => {
    const ordered = ORDER.map((slug) => servicesData.find((s) => s.slug === slug)).filter(Boolean);

    return (
        <>
            <section id="services" className="bg-slate-950 text-white">
                <div className="container mx-auto px-6 pt-8 md:pt-14 pb-10 md:pb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        {/* SOL — büyük başlık + CTA */}
                        <div className="lg:pt-6">
                            {/* br'ler sadece md+ — mobilde doğal sarması daha derli duruyor */}
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                                IT altyapınızı kuruyor,
                                <br className="hidden md:block" />
                                {' '}yönetiyor ve ayakta
                                <br className="hidden md:block" />
                                {' '}tutuyoruz.
                            </h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                                Sunucu, network, siber güvenlik, kurumsal e-posta ve yedekleme —
                                İstanbul genelinde keşiften kuruluma ve günlük desteğe kadar tek muhatap.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                                >
                                    Ücretsiz Keşif Planla <ArrowRight size={17} />
                                </a>
                                <a
                                    href="tel:+905416367775"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent hover:bg-slate-900 text-slate-200 rounded-xl font-semibold border border-slate-700 transition-colors"
                                >
                                    <Phone size={16} className="text-cyan-400" /> 0541 636 77 75
                                </a>
                            </div>
                        </div>

                        {/* SAĞ — hizmet listesi */}
                        <div>
                            <div className="text-xs font-semibold tracking-[0.25em] text-cyan-400 mb-3">
                                HİZMETLERİMİZ
                            </div>
                            <div className="divide-y divide-slate-800/70 border-y border-slate-800/70">
                                {ordered.map((service) => {
                                    const Icon = ICONS[service.icon] || Server;
                                    return (
                                        <a
                                            key={service.slug}
                                            href={`/hizmetler/${service.slug}`}
                                            className="flex items-center gap-3.5 py-3 px-2 -mx-2 hover:bg-slate-900 transition-colors group"
                                        >
                                            <Icon className="w-[18px] h-[18px] text-cyan-400 flex-shrink-0" />
                                            <span className="text-[15px] font-medium flex-1 leading-snug">
                                                {service.shortTitle || service.title}
                                            </span>
                                            <ArrowRight
                                                size={16}
                                                className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Süreç şeridi — başlığın hemen altında, ilk kaydırmada görünür */}
            <section className="bg-slate-950 text-white border-t border-slate-900">
                <div className="container mx-auto px-6 py-10 md:py-12">
                    <div className="text-xs font-semibold tracking-[0.25em] text-cyan-400 mb-7">
                        NASIL ÇALIŞIYORUZ
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-10">
                        {STEPS.map((step, i) => (
                            <div key={step.title} className="flex items-start gap-4">
                                <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-sm font-bold flex items-center justify-center flex-shrink-0">
                                    {i + 1}
                                </span>
                                <div>
                                    <h3 className="font-semibold leading-snug mb-1">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingMain;
