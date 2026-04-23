import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WA_CLOSED_KEY = 'wa_tooltip_closed';

const WhatsAppButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const phoneNumber = "905416367775";
    const message = "Merhaba, IT altyapımız için bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        // sessionStorage'da kapatıldıysa tekrar gösterme
        if (sessionStorage.getItem(WA_CLOSED_KEY)) return;

        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 30000); // 30 saniye
        return () => clearTimeout(timer);
    }, []);

    const handleClose = (e) => {
        e.stopPropagation();
        setShowTooltip(false);
        sessionStorage.setItem(WA_CLOSED_KEY, '1');
    };

    // Mobilde (md altı) sadece buton, popup yok
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div className="fixed bottom-10 right-6 z-50 hidden md:flex flex-col items-end gap-2">
            {/* Tooltip — sadece desktop */}
            <AnimatePresence>
                {showTooltip && !isMobile && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-white text-slate-800 p-4 rounded-xl shadow-2xl w-64 border border-slate-100 relative mb-2"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Kapat"
                        >
                            <X size={14} />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Destek</span>
                        </div>

                        <p className="text-sm font-semibold text-slate-800 leading-snug">
                            WhatsApp üzerinden bizimle anında iletişime geçebilirsiniz.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="WhatsApp ile iletişime geç"
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] relative z-20"
                >
                    <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </motion.div>
            </a>
        </div>
    );
};

export default WhatsAppButton;
