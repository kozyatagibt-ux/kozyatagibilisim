import { Fragment } from 'react';
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

const COLOR_CLASS = {
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    orange: 'text-orange-400',
};

const Services = () => {
    const ordered = ORDER.map((slug) => servicesData.find((s) => s.slug === slug)).filter(Boolean);

    return (
        <section id="services" className="py-24 bg-slate-950 text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    {/* Ana arama terimi burada — ziyaretçi teklifin ne olduğunu anladıktan sonra kategori etiketi olarak */}
                    <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 text-sm font-semibold mb-4 border border-cyan-800">
                        YÖNETİLEN IT HİZMETLERİ
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Tek Çatı Altında <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Kurumsal IT Altyapısı
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Network'ten sunucuya, e-postadan güvenliğe ve yedeklemeye kadar şirketinizin ihtiyaç duyduğu tüm IT bileşenlerini birbirine entegre, ölçeklenebilir ve güvenli şekilde kuruyoruz. Siz işinize odaklanın; altyapınızı biz yönetelim.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ordered.map((service, index) => {
                        const Icon = ICONS[service.icon] || Server;
                        const colorClass = COLOR_CLASS[service.color] || 'text-cyan-400';
                        const features = (service.features || []).slice(0, 3).map((f) => f.title);
                        return (
                            <Fragment key={service.slug}>
                            <div
                                className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:bg-slate-800/60 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-10px_rgba(8,145,178,0.3)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-500">
                                    <Icon className={`w-24 h-24 ${colorClass}`} />
                                </div>

                                <div className="bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-900/20 border border-slate-700/50 group-hover:border-cyan-500/30">
                                    <Icon className={`w-10 h-10 ${colorClass}`} />
                                </div>

                                {/* Kart başlığında SEO title'ı değil insan-okur kısa isim kullanılır */}
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                                    {service.shortTitle || service.title}
                                </h3>

                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    {service.tagline}
                                </p>

                                <ul className="space-y-2 mb-6">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={`/hizmetler/${service.slug}`}
                                    className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    Detaylar →
                                </a>
                            </div>

                            {/* 5. karttan sonra kaydırma ritmini kıran ara CTA — kararsız ziyaretçiyi forma taşır */}
                            {index === 4 && (
                                <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-gradient-to-r from-blue-900/40 to-cyan-900/30 border border-cyan-700/40 p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                            Hangi hizmete ihtiyacınız var, emin değil misiniz?
                                        </h3>
                                        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                            Altyapınızı kısaca anlatın; size doğru çözümü ve net bir yol haritasını ücretsiz çıkaralım.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full lg:w-auto">
                                        <a
                                            href="#contact"
                                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                                        >
                                            Ücretsiz Keşif Planla <ArrowRight size={18} />
                                        </a>
                                        <a
                                            href="tel:+905416367775"
                                            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold border border-slate-700 whitespace-nowrap transition-colors"
                                        >
                                            <Phone size={18} className="text-cyan-400" /> 0541 636 77 75
                                        </a>
                                    </div>
                                </div>
                            )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
