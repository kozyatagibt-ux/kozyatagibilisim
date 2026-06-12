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

// İlk ekran her şeyi anlatır: solda NE yaptığımız (9 hizmet), sağda NASIL
// yaptığımız (3 adım + keşif CTA'sı). Büyük başlık bloğu bilinçli olarak yok.
const LandingMain = () => {
    const ordered = ORDER.map((slug) => servicesData.find((s) => s.slug === slug)).filter(Boolean);

    return (
        <section id="services" className="py-8 md:py-10 bg-slate-950 text-white">
            <div className="container mx-auto px-6">
                {/* SEO: görünür dev başlık istenmedi; ana terimler erişilebilir h1'de */}
                <h1 className="sr-only">
                    Kurumsal IT Hizmetleri İstanbul — Yönetilen IT, Sunucu, Network, Siber Güvenlik | Kozyatağı Bilişim
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_370px] gap-10 lg:gap-12 items-start">
                    {/* SOL — Ne yapıyoruz */}
                    <div>
                        <div className="text-xs font-semibold tracking-[0.25em] text-cyan-400 mb-4">
                            NE YAPIYORUZ
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {ordered.map((service) => {
                                const Icon = ICONS[service.icon] || Server;
                                return (
                                    <a
                                        key={service.slug}
                                        href={`/hizmetler/${service.slug}`}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                                    >
                                        <Icon className="w-[18px] h-[18px] text-cyan-400 mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <h3 className="text-[15px] font-semibold leading-snug">
                                                {service.shortTitle || service.title}
                                            </h3>
                                            <p className="text-[13px] text-slate-400 mt-1 leading-snug line-clamp-2">
                                                {service.tagline}
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* SAĞ — Nasıl çalışıyoruz */}
                    <aside className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-7">
                        <div className="text-xs font-semibold tracking-[0.25em] text-cyan-400 mb-6">
                            NASIL ÇALIŞIYORUZ
                        </div>

                        <ol className="space-y-7 mb-8">
                            {STEPS.map((step, i) => (
                                <li key={step.title} className="relative pl-12">
                                    <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-sm font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    {i < STEPS.length - 1 && (
                                        <span aria-hidden="true" className="absolute left-4 top-9 -bottom-7 w-px bg-slate-800" />
                                    )}
                                    <h3 className="font-semibold leading-snug">{step.title}</h3>
                                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                                </li>
                            ))}
                        </ol>

                        <a
                            href="#contact"
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                        >
                            Ücretsiz Keşif Planla <ArrowRight size={17} />
                        </a>
                        <a
                            href="tel:+905416367775"
                            className="mt-3 flex items-center justify-center gap-2 w-full px-6 py-3 bg-transparent hover:bg-slate-800/60 text-slate-200 rounded-xl font-semibold border border-slate-700 transition-colors"
                        >
                            <Phone size={16} className="text-cyan-400" /> 0541 636 77 75
                        </a>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default LandingMain;
