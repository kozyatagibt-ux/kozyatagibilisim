import { useCallback, useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

// Particles ağır bir bağımlılık (~200 KB). Dynamic import ile main bundle'dan çıkarıyoruz.
// Sadece masaüstünde ve reduced-motion kapalıyken yükleniyor.
const Particles = lazy(() => import("react-tsparticles"));

const Hero = () => {
    const [enableParticles, setEnableParticles] = useState(false);

    useEffect(() => {
        // Mobil ve reduced-motion kullanıcılarında particles'i hiç yükleme — performans için kritik
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isMobile && !reduced) {
            // Initial paint'i bloklamamak için bir tick beklet
            const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
            idle(() => setEnableParticles(true));
        }
    }, []);

    const particlesInit = useCallback(async engine => {
        // tsparticles-slim de dynamic — ana bundle'dan çıkar
        const { loadSlim } = await import("tsparticles-slim");
        await loadSlim(engine);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Particle Background */}
            <div className="absolute inset-0 z-0">
                {/* Static gradient fallback for mobile/reduced-motion */}
                {!enableParticles && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0ea5e933_0%,_transparent_60%)]" />
                )}
                {enableParticles && <Suspense fallback={null}><Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        background: {
                            color: {
                                value: "transparent",
                            },
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: ["grab", "bubble"],
                                },
                                resize: true,
                            },
                            modes: {
                                grab: {
                                    distance: 140,
                                    links: {
                                        opacity: 0.5,
                                    },
                                },
                                bubble: {
                                    distance: 200,
                                    size: 6,
                                    duration: 2,
                                    opacity: 0.8,
                                    mix: false
                                },
                            },
                        },
                        particles: {
                            color: { value: "#0ea5e9" },
                            links: {
                                color: "#0ea5e9",
                                distance: 150,
                                enable: true,
                                opacity: 0.15,
                                width: 1,
                            },
                            move: {
                                enable: true,
                                speed: 0.6,
                                direction: "none",
                                random: false,
                                straight: false,
                                outModes: "out",
                            },
                            number: {
                                density: { enable: true, area: 800 },
                                value: 80,
                            },
                            opacity: {
                                value: 0.5,
                                random: true,
                                anim: {
                                    enable: true,
                                    speed: 1,
                                    opacity_min: 0.1,
                                    sync: false
                                }
                            },
                            shape: { type: "circle" },
                            size: {
                                value: { min: 1, max: 4 },
                                random: true,
                            },
                        },
                        detectRetina: true,
                    }}
                    className="absolute inset-0"
                /></Suspense>}
                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/60 to-slate-900 z-0 pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-cyan-500/30 text-cyan-400 mb-8 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(14,165,233,0.3)]"
                    >
                        <ShieldCheck size={16} />
                        <span className="text-sm font-semibold tracking-wide">Kozyatağı Bilişim: İşletmenizin Dijital Kalesi</span>
                    </motion.div>

                    {/* Main Headline with Glow — SEO odaklı: ana keyword + lokasyon + marka */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                        <span className="block mb-4 text-white">İstanbul Kurumsal IT Desteği ve</span>
                        <span className="block text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] leading-tight pb-2">
                            Yönetilen IT Hizmetleri
                        </span>
                    </h1>

                    {/* SEO subtitle — Kozyatağı + sektör + ana hizmet listesi */}
                    <p className="sr-only">
                        Kozyatağı Bilişim — İstanbul Kadıköy merkezli kurumsal IT desteği, sunucu yönetimi, network kurulumu, firewall, siber güvenlik, KVKK uyumlu yedekleme ve Microsoft 365 hizmetleri.
                    </p>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                        Sunucudan firewall'a, e-postadan yedeklemeye — <strong className="text-white font-semibold">KOBİ ve orta ölçekli işletmeler</strong> için tek muhatap.
                        Tam zamanlı personele yatırım yapmadan, profesyonel ve öngörülebilir bütçeli IT desteği alın.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                        <a href="#contact" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.6)] hover:-translate-y-1 flex items-center gap-2 group">
                            Ücretsiz Keşif Planla
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#services" className="px-10 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-xl font-medium text-lg border border-slate-700 hover:border-slate-500 transition-all backdrop-blur-sm shadow-lg flex items-center gap-2">
                            Neler Yapıyoruz?
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500/80"
            >
                <div className="w-6 h-10 border-2 border-slate-500/50 rounded-full flex justify-center p-2 box-border">
                    <div className="w-1 h-2 bg-slate-400 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
