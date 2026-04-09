import { extractHeadings } from './MarkdownRenderer';

const TableOfContents = ({ content }) => {
    const headings = extractHeadings(content).filter((h) => h.level === 2);
    if (!headings.length) return null;
    return (
        <nav className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-10 sticky top-24">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">İçindekiler</h3>
            <ul className="space-y-2">
                {headings.map((h) => (
                    <li key={h.id}>
                        <a
                            href={`#${h.id}`}
                            className="text-slate-300 hover:text-cyan-300 text-sm leading-snug block transition-colors"
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
