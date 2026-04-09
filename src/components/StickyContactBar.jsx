// Mobil için sticky alt bar: telefon + WhatsApp. Sadece mobilde (md altı) görünür.
// WhatsAppButton zaten ayrı sağ-alt FAB olarak duruyor; bu bar daha belirgin olarak telefonu öne çıkarır.
import { Phone, MessageCircle } from 'lucide-react';

const StickyContactBar = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-2 shadow-2xl">
        <a
            href="tel:+905416367775"
            className="flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm bg-blue-600 active:bg-blue-700 transition-colors"
            aria-label="Bizi arayın"
        >
            <Phone size={18} /> Hemen Ara
        </a>
        <a
            href="https://wa.me/905416367775?text=Merhaba%2C%20IT%20alt%C4%B1yap%C4%B1m%C4%B1z%20i%C3%A7in%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm bg-[#25D366] active:bg-[#1da851] transition-colors"
            aria-label="WhatsApp ile yazın"
        >
            <MessageCircle size={18} /> WhatsApp
        </a>
    </div>
);

export default StickyContactBar;
