import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, WifiOff, ServerCrash, Unlock, EyeOff } from 'lucide-react';

const PainPoints = () => {
    const problems = [
        {
            icon: <WifiOff className="w-8 h-8 text-red-400" />,
            title: "Dağınık Network / Kopan Bağlantılar",
            desc: "Wi-Fi bir köşede çekmez, VPN bazen çalışır bazen çalışmaz, internet “yavaş” diye herkes birbirini suçlar.",
            solution: "Çözüm: Ofisinize uygun network planı, doğru kablolama, switch/router/Wi-Fi kurulumları ve misafir ağı dahil stabil bağlantı."
        },
        {
            icon: <ServerCrash className="w-8 h-8 text-orange-400" />,
            title: "Sahipsiz Sunucular / “Biri Bakıyordur” Sorunu",
            desc: "Sunucu var ama kimse takip etmiyor; disk doluyor, servis duruyor, güncellemeler birikiyor. Sorun çıkınca ancak fark ediliyor.",
            solution: "Çözüm: Proaktif izleme, düzenli bakım ve kritik servislerin yönetimiyle problemleri iş durmadan önce yakalıyoruz."
        },
        {
            icon: <Unlock className="w-8 h-8 text-yellow-400" />,
            title: "Eksik Güvenlik / Herkeste Her Yetki",
            desc: "Ayrılan çalışanın erişimi kapanmaz, herkes her şeye erişir, mail güvenliği eksik kalır. En büyük açıklar genelde “basit ayarlar”dır.",
            solution: "Çözüm: Yetki düzeni, MFA, mail güvenliği (SPF/DKIM/DMARC) ve firewall politikalarıyla sistemi standartlara uygun hale getiriyoruz."
        },
        {
            icon: <EyeOff className="w-8 h-8 text-purple-400" />,
            title: "“Yedek Var” Sanılır / Geri Dönüş Yoktur",
            desc: "Yedek alınıyor olabilir ama geri yükleme hiç denenmemiştir. Kriz gününde asıl sorun o zaman başlar.",
            solution: "Çözüm: Otomatik yedekleme + versiyonlama + düzenli restore testleri ile gerçek geri dönüş garantisini kuruyoruz."
        }
    ];

    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        <span className="block mb-2 text-white">Teknolojiniz Sizi Yavaşlatmasın</span>
                        <span className="block text-red-500">İşinize Hız Katsın</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-4xl mx-auto leading-relaxed">
                        KOBİ ve orta ölçekli işletmelerde IT altyapısı, genellikle zaman içinde plansız büyüyerek karmaşıklaşır
                        veya geçici çözümlerle standartlardan uzaklaşır. Bu yapısal düzensizlik; erişim sorunlarına, güvenlik zafiyetlerine ve iş sürekliliğini tehdit eden veri kayıplarına yol açar.
                        <br /><br />
                        <span className="text-slate-300 font-medium">
                            Biz önce mevcut durumu analiz eder, sonra altyapınızı sıfırdan planlayıp adım adım düzenli, güvenli ve yönetilebilir hale getiririz — büyük yatırımlar gerektirmeden.
                        </span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-red-500/30 hover:shadow-[0_0_20px_-10px_rgba(239,68,68,0.3)] transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="mb-4 bg-slate-900/60 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-700/50 group-hover:border-red-500/30">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-200">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                {item.desc}
                            </p>
                            <div className="pt-4 border-t border-slate-700/50">
                                <p className="text-sm text-cyan-400 font-medium leading-relaxed">
                                    {item.solution}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-xl max-w-2xl">
                        <p className="text-lg text-slate-300 font-medium">
                            İster sıfırdan kurulum, ister mevcut altyapınızı standartlara uygun şekilde iyileştiririz.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
