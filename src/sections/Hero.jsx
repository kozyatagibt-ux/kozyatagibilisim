import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Hero = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Particle Background */}
            <div className="absolute inset-0 z-0">
                <Particles
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
                                    mode: "grab",
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
                            },
                        },
                        particles: {
                            color: {
                                value: "#0ea5e9", // Sky blue agent color
                            },
                            links: {
                                color: "#0ea5e9",
                                distance: 150,
                                enable: true,
                                opacity: 0.2,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 80,
                            },
                            opacity: {
                                value: 0.3,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 3 },
                            },
                        },
                        detectRetina: true,
                    }}
                    className="absolute inset-0"
                />
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

                    {/* Main Headline with Glow */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                        <span className="block mb-4 text-white">Profesyonel IT Altyapısı İçin</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] leading-tight pb-2">
                            Servet Ödemenize Gerek Yok
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                        Teknolojinin karmaşası ve yatırım maliyetleri büyümenize engel olmasın. İşletmenizi modern, güvenli ve hızlı bir yapıya;
                        <span className="text-white font-medium"> gereksiz harcamalar olmadan, en verimli şekilde </span>
                        taşıyoruz.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                        <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.6)] hover:-translate-y-1 flex items-center gap-2 group">
                            Ücretsiz Keşif Planla
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-10 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-xl font-medium text-lg border border-slate-700 hover:border-slate-500 transition-all backdrop-blur-sm shadow-lg flex items-center gap-2">
                            Neler Yapıyoruz?
                        </button>
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
