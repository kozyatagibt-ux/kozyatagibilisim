import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ items }) => {
    const [open, setOpen] = useState(null);
    return (
        <div className="space-y-3">
            {items.map((item, i) => (
                <div key={i} className="border border-slate-800 rounded-xl bg-slate-900/40 overflow-hidden">
                    <button
                        onClick={() => setOpen(open === i ? null : i)}
                        className="w-full flex items-center justify-between text-left p-5 hover:bg-slate-800/40 transition-colors"
                    >
                        <span className="text-white font-semibold text-base md:text-lg pr-4">{item.q}</span>
                        <ChevronDown
                            size={20}
                            className={`text-cyan-400 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {open === i && (
                        <div className="px-5 pb-5 text-slate-300 leading-relaxed">{item.a}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQAccordion;
