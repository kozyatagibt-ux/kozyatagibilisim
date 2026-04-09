import { ArrowRight, Phone } from 'lucide-react';

const InlineCTA = ({
    title = 'Ücretsiz IT Sağlık Kontrolü',
    desc = 'Şirketinizin mevcut IT altyapısını ücretsiz değerlendirelim. 30 dakikalık ön görüşmede ihtiyaçlarınızı dinler, somut öneriler sunarız.',
    primaryLabel = 'Ücretsiz Keşif Talep Et',
    primaryHref = '/#contact',
    showPhone = true,
}) => (
    <div className="my-10 rounded-3xl bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-cyan-700/40 p-8 md:p-10 shadow-xl shadow-cyan-900/10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 mb-6 leading-relaxed">{desc}</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
            >
                {primaryLabel} <ArrowRight size={18} />
            </a>
            {showPhone && (
                <span className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold border border-slate-700 whitespace-nowrap">
                    <Phone size={18} /> 0541 636 77 75
                </span>
            )}
        </div>
    </div>
);

export default InlineCTA;
