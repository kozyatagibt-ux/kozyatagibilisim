import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { homeFaqs as faqs } from '../data/faqs';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-24 bg-slate-950 text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-900/30 text-cyan-400 text-sm font-semibold mb-4 border border-cyan-800">
                        <HelpCircle size={16} />
                        SIK SORULAN SORULAR
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Aklınıza Takılan Her Şey
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Yönetilen IT hizmetleri, fiyatlandırma, geçiş süreci ve teknik detaylar hakkında en sık aldığımız soruların yanıtları.
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 1, y: 0 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: Math.min(index * 0.05, 0.4) }}
                                className={`rounded-2xl border transition-all duration-300 ${isOpen
                                    ? 'bg-slate-900/80 border-cyan-500/30 shadow-[0_0_30px_-10px_rgba(8,145,178,0.3)]'
                                    : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                                    aria-expanded={isOpen}
                                >
                                    <h3 className={`text-base md:text-lg font-semibold transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-200 group-hover:text-white'
                                        }`}>
                                        {faq.q}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'
                                            }`}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-400 mb-4">Fiyatlandırma, KVKK, geçiş süreci ve daha fazlası için</p>
                    <a
                        href="/sss"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25"
                    >
                        Tüm Soruları Kategori Bazlı Gör →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
