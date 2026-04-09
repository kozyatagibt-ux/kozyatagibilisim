import { Check, X, ShieldAlert, BadgeCheck } from 'lucide-react';

const Comparison = () => {
    const features = [
        { name: "Bakım Yaklaşımı", traditional: "Arıza çıkınca müdahale", kozyatagi: "Proaktif (Arıza çıkmadan önleme)" },
        { name: "Sorumluluk", traditional: "Suçu başkasına atma (ISP/Hosting)", kozyatagi: "Tek Muhatap (Uçtan uca çözüm)" },
        { name: "Maliyet", traditional: "Sürpriz ek faturalar", kozyatagi: "Net ve öngörülebilir bütçe" },
        { name: "Güvenlik", traditional: "Sadece antivirüs kurulumu", kozyatagi: "Firewall + Loglama + Erişim Kontrolü" },
        { name: "Yedekleme", traditional: "Manuel / Unutulan yedekler", kozyatagi: "Otomatik + Test edilen geri dönüş" },
        { name: "Raporlama", traditional: "Yok veya anlamsız", kozyatagi: "Aylık detaylı yönetim raporu" },
    ];

    return (
        <section className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Neden <span className="text-blue-500">Kozyatağı Bilişim?</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Geleneksel "bilgisayarcı" mantığı ile profesyonel "yönetilen hizmetler" arasındaki fark,
                        şirketinizin geleceğini belirler.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Traditional Card */}
                    <div
                        className="bg-slate-950/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    >
                        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                                <ShieldAlert size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-400">Geleneksel IT Desteği</h3>
                                <p className="text-sm text-slate-600">Reaktif Modeli</p>
                            </div>
                        </div>

                        <ul className="space-y-6">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 text-red-500">
                                        <X size={14} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-600 mb-1 uppercase font-semibold">{feature.name}</div>
                                        <div className="text-slate-400 font-medium">{feature.traditional}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kozyatagi Card */}
                    <div
                        className="bg-slate-800/30 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_-20px_rgba(59,130,246,0.2)]"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>

                        <div className="flex items-center gap-4 mb-8 border-b border-blue-500/20 pb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                                <BadgeCheck size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Kozyatağı Bilişim</h3>
                                <p className="text-sm text-blue-400">Yönetilen Hizmet Modeli</p>
                            </div>
                        </div>

                        <ul className="space-y-6">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-blue-400/60 mb-1 uppercase font-semibold">{feature.name}</div>
                                        <div className="text-white font-bold text-lg">{feature.kozyatagi}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
