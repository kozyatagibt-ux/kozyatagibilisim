import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    // Updated phone number
    const phoneNumber = "905383812073";
    const message = "Merhaba, IT altyapımız için bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 3000); // Show after 3 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-end"
        >
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute right-[70px] bg-white text-slate-800 p-4 rounded-xl shadow-2xl w-64 border border-slate-100 origin-right"
                    >
                        {/* Triangle Pointer */}
                        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r border-t border-slate-100"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Online</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowTooltip(false);
                                    }}
                                    className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                            <p className="text-sm font-semibold text-slate-800 leading-snug">
                                Bizimle şu anda canlı iletişime geçip soru sorabilirsiniz. 👋
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] relative z-20"
            >
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>

                <MessageCircle className="text-white w-8 h-8 fill-current" />
            </motion.div>
        </a>
    );
};

export default WhatsAppButton;
