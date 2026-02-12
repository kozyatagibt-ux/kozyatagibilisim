import React from 'react';
import { motion } from 'framer-motion';
import { Search, Hammer, Activity, ArrowRight } from 'lucide-react';

const Process = () => {
    const steps = [
        {
            icon: <Search className="w-12 h-12 text-blue-400" />,
            title: "1. Keşif & Risk Analizi",
            desc: "Önce mevcut durumu netleştiriyoruz: nerede sorun var, nerede risk var, ne öncelikli? Çıktı: “IT Sağlık Raporu” + önceliklendirilmiş aksiyon listesi",
            detail: "Envanter • Güvenlik kontrolü • Performans/darboğaz tespiti"
        },
        {
            icon: <Hammer className="w-12 h-12 text-cyan-400" />,
            title: "2. Kurulum / Toparlama & Standardizasyon",
            desc: "Gereksiz karmaşayı temizliyoruz. Altyapıyı ihtiyaca göre ya sıfırdan kuruyor ya da mevcut sistemi düzene sokuyoruz: güvenlik, yedek, ağ ve kullanıcı yönetimi. Çıktı: Standart mimari + dokümantasyon + devreye alma planı",
            detail: "Network & kablolama • Sunucu/AD • Mail güvenliği • Yedekleme • Firewall"
        },
        {
            icon: <Activity className="w-12 h-12 text-emerald-400" />,
            title: "3. Proaktif Yönetim & Sürekli Destek",
            desc: "Sorun çıkmasını beklemiyoruz. Sistemleri izliyor, güncellemeleri yönetiyor, riskleri kapatıyor ve kullanıcı desteği veriyoruz. Çıktı: SLA’lı destek + düzenli raporlama + sürekli iyileştirme",
            detail: "Uzaktan izleme • Hızlı müdahale • Aylık yönetici raporu"
        }
    ];

    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        <span className="block mb-3">Karmaşık IT Süreçlerinden</span>
                        <span className="block text-blue-500">Sürdürülebilir ve Yönetilebilir Sisteme</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        Mevcut altyapınızın durumu ne olursa olsun, dönüşüm sürecini 3 aşamalı şeffaf bir metodoloji ile yönetiyoruz.
                        Kapsam, zamanlama ve maliyetlerin net olduğu, sürprizlere yer bırakmayan profesyonel bir yol haritası sunuyoruz.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 via-cyan-900 to-emerald-900 -z-10"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-slate-950 border border-slate-800 p-8 rounded-2xl relative h-full flex flex-col"
                        >
                            <div className="bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border-4 border-slate-950 -mt-16 mx-auto shadow-lg shadow-black/50 shrink-0">
                                {step.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-center min-h-[3.5rem] flex items-center justify-center">{step.title}</h3>
                            <p className="text-slate-400 text-center mb-6 flex-grow">{step.desc}</p>

                            <div className="pt-6 border-t border-slate-900 mt-auto">
                                <p className="text-xs font-mono text-cyan-500 text-center tracking-wider">{step.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
