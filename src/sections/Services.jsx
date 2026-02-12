import React from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, Network, Mail, Database, Users } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Server className="w-10 h-10 text-cyan-400" />,
            title: "Sunucu & Sanallaştırma",
            desc: "İşinize uygun altyapıyı baştan tasarlıyor; yüksek performanslı, güvenli ve büyümeye hazır sunucu sistemleri kuruyoruz.",
            features: ["Yedekli mimari (HA)", "Otomatik yedekleme planı", "7/24 izleme & uyarı"]
        },
        {
            icon: <Users className="w-10 h-10 text-blue-400" />,
            title: "Merkezi Kimlik Yönetimi",
            desc: "Kullanıcıları, cihazları ve erişim yetkilerini tek merkezden yönetin. Kim, neye, ne zaman erişir siz belirleyin.",
            features: ["Tek şifre / SSO", "Yetki & rol yönetimi", "Güvenli giriş (MFA)"]
        },
        {
            icon: <Database className="w-10 h-10 text-indigo-400" />,
            title: "Dosya Paylaşım Çözümleri",
            desc: "Dosyalarınız şirket içinde kalsın. Bulut veya yerel fark etmez; güvenli paylaşım ve ortak çalışma altyapısını kuruyoruz.",
            features: ["KVKK uyumlu yapı", "Mobil erişim", "Yetkili paylaşım & gizlilik"]
        },
        {
            icon: <Shield className="w-10 h-10 text-emerald-400" />,
            title: "Ağ Güvenliği & Firewall",
            desc: "Dış tehditleri, izinsiz erişimi ve riskli trafiği kontrol altına alın. Güvenlik duvarı kurulumunu ve politikaları uçtan uca yönetiyoruz.",
            features: ["Saldırı önleme (IPS/IDS)", "Güvenli VPN erişimi", "İçerik filtreleme & kural setleri"]
        },
        {
            icon: <Mail className="w-10 h-10 text-violet-400" />,
            title: "Kurumsal E-Posta",
            desc: "Spam ve güvenlik sorunlarıyla uğraşmadan kurumsal e-postanızı güvenle kullanın. Kurulum, taşıma ve güvenlik ayarlarını biz üstleniyoruz.",
            features: ["Antispam/antiphishing koruması", "SPF / DKIM / DMARC", "Kesintisiz iletişim"]
        },
        {
            icon: <Network className="w-10 h-10 text-orange-400" />,
            title: "Network & Altyapı",
            desc: "Kablolama dahil ofis ağınızı profesyonelce kuruyoruz. Kesintisiz Wi-Fi, stabil internet ve doğru yapılandırılmış altyapı ile sorunsuz çalışın.",
            features: ["Kablolama & rack düzeni", "Misafir ağı & segmentasyon", "Kopmayan Wi-Fi & hız yönetimi"]
        }
    ];

    return (
        <section className="py-24 bg-slate-950 text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 text-sm font-semibold mb-4 border border-cyan-800">
                        UÇTAN UCA ÇÖZÜMLER
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Tek Çatı Altında <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Kurumsal IT Altyapısı
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Network’ten sunucuya, e-postadan güvenliğe ve yedeklemeye kadar şirketinizin ihtiyaç duyduğu tüm IT bileşenlerini birbirine entegre, ölçeklenebilir ve güvenli şekilde kuruyoruz. Siz işinize odaklanın; altyapınızı biz yönetelim.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:bg-slate-800/60 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-10px_rgba(8,145,178,0.3)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-500">
                                {React.cloneElement(service.icon, { className: "w-24 h-24" })}
                            </div>

                            <div className="bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-900/20 border border-slate-700/50 group-hover:border-cyan-500/30">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {service.desc}
                            </p>

                            <ul className="space-y-2">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
