import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Slug üreticisi (heading id'leri için)
export function slugify(text) {
    return String(text)
        .toLowerCase()
        .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
        .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// Markdown içeriğindeki heading'leri toplar (TOC için)
export function extractHeadings(markdown) {
    const lines = markdown.split('\n');
    const headings = [];
    for (const line of lines) {
        const m = line.match(/^(#{2,3})\s+(.+)$/);
        if (m) {
            const level = m[1].length;
            const text = m[2].trim();
            headings.push({ level, text, id: slugify(text) });
        }
    }
    return headings;
}

const components = {
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-12">{children}</h1>,
    h2: ({ children }) => {
        const text = String(children);
        return <h2 id={slugify(text)} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 scroll-mt-24 border-l-4 border-cyan-500 pl-4">{children}</h2>;
    },
    h3: ({ children }) => {
        const text = String(children);
        return <h3 id={slugify(text)} className="text-xl md:text-2xl font-semibold text-cyan-300 mt-8 mb-3 scroll-mt-24">{children}</h3>;
    },
    h4: ({ children }) => <h4 className="text-lg font-semibold text-slate-200 mt-6 mb-2">{children}</h4>,
    p: ({ children }) => <p className="text-slate-300 leading-relaxed mb-4 text-base md:text-lg">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-slate-300">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-slate-300">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-cyan-300">{children}</em>,
    a: ({ href, children }) => {
        const isExternal = href && !href.startsWith('/');
        return (
            <a
                href={href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
                {children}
            </a>
        );
    },
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-cyan-500 bg-slate-800/50 pl-6 pr-4 py-4 my-6 italic text-slate-300 rounded-r-lg">{children}</blockquote>
    ),
    code: ({ inline, children }) => inline
        ? <code className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded text-sm">{children}</code>
        : <code className="block bg-slate-900 border border-slate-700 text-slate-200 p-4 rounded-lg overflow-x-auto text-sm my-4">{children}</code>,
    table: ({ children }) => (
        <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-slate-700 rounded-lg">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-800">{children}</thead>,
    th: ({ children }) => <th className="border border-slate-700 px-4 py-2 text-left text-white font-semibold">{children}</th>,
    td: ({ children }) => <td className="border border-slate-700 px-4 py-2 text-slate-300">{children}</td>,
    hr: () => <hr className="border-slate-700 my-8" />,
};

const MarkdownRenderer = ({ content }) => (
    <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
        </ReactMarkdown>
    </div>
);

export default MarkdownRenderer;
