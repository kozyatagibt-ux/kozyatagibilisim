// Arka planda yavaşça dönen saha fotoğrafları (sunucu kabineti, network kablolama, disk).
// Saf CSS cross-fade; JS yok. `dim` = üstündeki siyah karartmanın opaklığı (0–1);
// yükseldikçe fotoğraf soluklaşır, yazılar öne çıkar.
const IMAGES = [
    '/images/sunucu-kabinet.jpg',
    '/images/network-kablolama.jpg',
    '/images/disk-yedekleme.jpg',
];

const RotatingPhotoBg = ({ dim = 0.84 }) => (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {IMAGES.map((src, i) => (
            <img
                key={src}
                src={src}
                alt=""
                fetchPriority="low"
                decoding="async"
                className="rpb-img absolute inset-0 w-full h-full object-cover"
                style={{ animationDelay: `${i * 7}s` }}
            />
        ))}
        {/* Eşit karartma — okunabilirlik */}
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(2,6,23,${dim})` }}></div>
        {/* Kenar geçişi — komşu siyah bölümlere yumuşak bağlanma */}
        <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #020617 0%, transparent 16%, transparent 84%, #020617 100%)' }}
        ></div>

        <style>{`
            .rpb-img { opacity: 0; animation: rpbFade 21s linear infinite; }
            @keyframes rpbFade {
                0% { opacity: 0; }
                5% { opacity: 1; }
                33.3% { opacity: 1; }
                38.3% { opacity: 0; }
                100% { opacity: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
                .rpb-img { animation: none; }
                .rpb-img:first-of-type { opacity: 1; }
            }
        `}</style>
    </div>
);

export default RotatingPhotoBg;
