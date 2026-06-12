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

// Sade ve ağırbaşlı: tek vurgu rengi, düz kartlar, süs yok.
// Kartın tamamı detay sayfasına link; tüm hizmetler ilk ekranda.
const Services = () => {
    const ordered = ORDER.map((slug) => servicesData.find((s) => s.slug === slug)).filter(Boolean);

    return (
        <section id="services" className="py-10 md:py-14 bg-slate-950 text-white">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Kurumsal IT Hizmetleri</h1>
                    {/* SEO: ana arama terimleri — görünür metni pazarlama diline çevirmeden */}
                    <p className="sr-only">
                        Kozyatağı Bilişim — İstanbul genelinde yönetilen IT hizmetleri ve kurumsal IT desteği: sunucu, network, firewall, kurumsal e-posta, yedekleme.
                    </p>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                        Şirketlerin sunucu, ağ, güvenlik, e-posta ve yedekleme altyapısını kurar;
                        bakımını ve gündelik desteğini üstleniriz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {ordered.map((service) => {
                        const Icon = ICONS[service.icon] || Server;
                        return (
                            <a
                                key={service.slug}
                                href={`/hizmetler/${service.slug}`}
                                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors"
                            >
                                <div className="flex items-center gap-2.5 mb-1.5">
                                    <Icon className="w-[18px] h-[18px] text-cyan-400 flex-shrink-0" />
                                    <h3 className="text-base font-semibold">
                                        {service.shortTitle || service.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {service.tagline}
                                </p>
                            </a>
                        );
                    })}
                </div>

                <p className="text-center text-sm text-slate-500 mt-8 md:mt-10">
                    Microsoft, Fortinet, Cisco, Veeam ve ESET çözümleriyle çalışıyoruz.
                </p>
            </div>
        </section>
    );
};

export default Services;
