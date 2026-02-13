import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 text-sm">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                {/* Brand & Copyright - Spans 5 columns */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                    <div>
                        <div className="text-2xl font-bold text-white tracking-tighter mb-4">KOZYATAĞI BİLİŞİM</div>
                        <p className="leading-relaxed max-w-sm mx-auto md:mx-0">
                            İşletmenizin ihtiyaçlarına özel, güvenli ve sürdürülebilir IT altyapı çözümleri. Dijital dönüşüm yolculuğunuzda güvenilir teknoloji ortağınız.
                        </p>
                    </div>
                    <p className="opacity-50 text-xs">© {new Date().getFullYear()} Kozyatağı Bilişim. Tüm hakları saklıdır.</p>
                </div>

                {/* Quick Links - Spans 3 columns */}
                <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-white font-semibold text-base mb-2">Hızlı Erişim</h3>
                    <ul className="flex flex-col items-center md:items-start space-y-2.5 w-full">
                        <li><a href="#services" className="hover:text-blue-400 transition-colors block py-1">Hizmetler</a></li>
                        <li><a href="#process" className="hover:text-blue-400 transition-colors block py-1">Süreç</a></li>
                        <li><a href="#about" className="hover:text-blue-400 transition-colors block py-1">Neden Biz?</a></li>
                        <li><a href="#contact" className="hover:text-blue-400 transition-colors block py-1">İletişim</a></li>
                        <li>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        // Find the hidden KVKK text/trigger logic if accessible, 
                                        // or just scroll to contact where the modal trigger is.
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="hover:text-blue-400 transition-colors text-left py-1"
                            >
                                KVKK Aydınlatma Metni
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Contact Info - Spans 4 columns */}
                <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-white font-semibold text-base mb-2">İletişim Bilgileri</h3>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-start justify-center md:justify-start gap-4 group">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                                <MapPin className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="leading-relaxed max-w-[200px] text-center md:text-left">Quick Plaza, Kozyatağı, İstanbul</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4 group">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                                <Mail className="w-5 h-5 text-blue-500" />
                            </div>
                            <a href="mailto:destek@kozyatagibilisim.com" className="hover:text-white transition-colors">destek@kozyatagibilisim.com</a>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4 group">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                                <Phone className="w-5 h-5 text-blue-500" />
                            </div>
                            <a href="tel:+905383812073" className="hover:text-white transition-colors tracking-wide">0538 381 20 73</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
