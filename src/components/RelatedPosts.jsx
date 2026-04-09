import { ArrowRight } from 'lucide-react';

const RelatedPosts = ({ posts }) => {
    if (!posts?.length) return null;
    return (
        <section className="my-12">
            <h3 className="text-2xl font-bold text-white mb-6">İlgili Yazılar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((p) => (
                    <a
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="group block p-6 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all"
                    >
                        <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 mb-2 line-clamp-2">{p.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-3">{p.meta_description}</p>
                        <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium">
                            Devamını oku <ArrowRight size={14} />
                        </span>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;
