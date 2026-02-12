import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <div className="text-xl font-bold text-white mb-2 tracking-tighter">KOZYATAĞI BİLİŞİM</div>
                    <p>© {new Date().getFullYear()} Kozyatağı Bilişim. Tüm hakları saklıdır.</p>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Hizmetler</a>
                    <a href="#" className="hover:text-white transition-colors">Hakkımızda</a>
                    <a href="#" className="hover:text-white transition-colors">İletişim</a>
                    <a href="#" className="hover:text-white transition-colors">KVKK</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
