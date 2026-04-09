import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => (
    <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-slate-400">
            <li>
                <a href="/" className="hover:text-cyan-400 transition-colors">Anasayfa</a>
            </li>
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-1">
                    <ChevronRight size={14} className="text-slate-600" />
                    {item.href ? (
                        <a href={item.href} className="hover:text-cyan-400 transition-colors">{item.label}</a>
                    ) : (
                        <span className="text-slate-300">{item.label}</span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);

export default Breadcrumb;
