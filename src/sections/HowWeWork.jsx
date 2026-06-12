// Nasıl çalışıyoruz — 3 adım. Landing'in dönüşüm köprüsü: hizmetler → süreç → form.
// Statik render (client JS yok); sade tasarım diline uygun: düz paneller, tek vurgu rengi.
const STEPS = [
    {
        no: '1',
        title: 'İhtiyacınızı yerinde dinliyoruz',
        desc: 'Ofisinize gelir; ihtiyacınızı ve mevcut altyapınızı yerinde inceleriz. Keşif ücretsizdir.',
    },
    {
        no: '2',
        title: 'Teklif ve aksiyon planı sunuyoruz',
        desc: 'Size özel teklifi ve adım adım aksiyon planını hazırlayıp önünüze koyarız.',
    },
    {
        no: '3',
        title: 'Kurup çalışır halde teslim ediyoruz',
        desc: 'Kurulumu uçtan uca üstleniriz; sistemi test edilmiş ve çalışır halde devralırsınız.',
    },
];

const HowWeWork = () => (
    <section className="py-12 md:py-16 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
                Nasıl çalışıyoruz?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
                {STEPS.map((step) => (
                    <div key={step.no} className="flex md:flex-col items-start gap-4">
                        <div className="w-9 h-9 rounded-full border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold flex-shrink-0">
                            {step.no}
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1.5">{step.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8 md:mt-12">
                <a
                    href="#contact"
                    className="inline-block px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                >
                    Ücretsiz Keşif Planla
                </a>
            </div>
        </div>
    </section>
);

export default HowWeWork;
