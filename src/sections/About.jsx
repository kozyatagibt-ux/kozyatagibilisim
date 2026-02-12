import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
    const innovations = [
        "Sabit ve öngörülebilir bütçe (Paket / SLA)",
        "Gereksiz lisans ve donanım maliyetlerini azaltma",
        "Tek muhatap, uçtan uca sahiplik (network–sunucu–mail–güvenlik–yedekleme)",
        "Proaktif izleme + SLA’lı hızlı müdahale (sorun çıkmadan uyarı/müdahale)",
        "Test edilmiş yedekleme & geri dönüş planı",
        "Aylık yönetim raporu (durum • risk • aksiyon planı)"
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6 border border-blue-500/20">
                        NEDEN BİZ?
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                        <span className="block mb-2">Yönetilen IT ile</span>
                        <span className="block mb-2">Büyümeye Hazır Altyapı</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            Öngörülebilir Bütçe
                        </span>
                    </h2>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                        Kozyatağı Bilişim olarak hedefimiz; işletmenizin IT’sini ölçülebilir, denetlenebilir ve sürdürülebilir bir standarda taşımak. Network, sunucu, kimlik yönetimi, e-posta güvenliği, firewall, yedekleme ve operasyon süreçlerini uçtan uca tek çatı altında yönetir; düzenli raporlama ve planlama ile iş sürekliliğini güvence altına alırız.
                    </p>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        KOBİ ve orta ölçekli şirketlerin en çok zorlandığı konu “sürpriz masraflar”dır: arıza çıkınca acil cihaz alımı, plansız lisans yenilemeleri, yanlış kurulumların tekrar maliyeti. Biz bu tabloyu öngörülebilir bütçeye çeviririz. İhtiyacınızı önce netleştirir, gereksiz donanım/lisans harcatmadan doğru mimariyi kurar; sonrasında paket/SLA modeliyle aylık maliyeti şeffaflaştırırız. Böylece IT, sürekli “beklenmedik gider” çıkaran bir alan değil, işinizi büyüten kontrollü bir operasyon olur.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        {innovations.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:w-1/2 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 blur-2xl rounded-3xl"></div>
                    <div className="relative bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                        {/* Abstract visualization or stats */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-6 border-b border-slate-800">
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">Bütçe Yapısı</div>
                                    <div className="text-2xl font-bold text-emerald-400">Sürpriz Fatura Yok</div>
                                </div>
                                <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
                                    <Activity className="text-emerald-500 w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center pb-6 border-b border-slate-800">
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">Destek Modeli</div>
                                    <div className="text-2xl font-bold text-blue-400">Direkt Uzman Erişimi</div>
                                </div>
                                <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                                    <Shield className="text-blue-500 w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">Şeffaf Raporlama</div>
                                    <div className="text-2xl font-bold text-indigo-400">Aylık Yönetici Özeti</div>
                                </div>
                                <div className="h-10 w-10 bg-indigo-500/10 rounded-full flex items-center justify-center">
                                    <FileText className="text-indigo-500 w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
import { Activity, Shield, FileText } from 'lucide-react';

export default About;
