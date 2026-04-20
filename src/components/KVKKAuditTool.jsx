import { useState, useMemo } from 'react';

/**
 * KVKK Uyum Öz-Denetim Aracı
 * KVKK kapsamındaki 25 kritik kontrol noktasına checkbox ile kullanıcı cevap verir.
 * Tamamlanmayan madde sayısına göre uyum yüzdesi + aksiyon listesi + cezai risk tahmini.
 */

const SECTIONS = [
  {
    title: 'Veri Envanteri ve Kayıt',
    items: [
      { q: 'Şirketimiz VERBİS\'e (Veri Sorumluları Sicili) kayıtlı', required: true },
      { q: 'İşlenen kişisel veri kategorileri yazılı bir envanterde listelendi (müşteri, çalışan, tedarikçi)', required: true },
      { q: 'Her veri kategorisi için **işleme amacı** ve **hukuki sebep** belgelendi', required: true },
      { q: 'Veri saklama süreleri tanımlandı ve imha politikası var', required: true },
    ],
  },
  {
    title: 'Aydınlatma ve Rıza',
    items: [
      { q: 'Web sitesinde **aydınlatma metni** yayınlandı', required: true },
      { q: 'Çalışanlara **aydınlatma metni** imzalatıldı veya tebliğ edildi', required: true },
      { q: 'İletişim formları, CRM kayıtlarında açık rıza onay kutusu var', required: true },
      { q: 'Pazarlama e-postaları için ayrı açık rıza toplanıyor', required: false },
    ],
  },
  {
    title: 'Teknik Tedbirler',
    items: [
      { q: 'Kişisel veri içeren sistemlere **erişim yetkileri** tanımlı ve denetleniyor', required: true },
      { q: 'Veri içeren sunucu/NAS\'larda **şifreli yedekleme** yapılıyor', required: true },
      { q: 'Laptop\'larda **disk şifreleme** (BitLocker / FileVault) aktif', required: true },
      { q: 'E-posta trafiğinde **TLS / şifreli iletim** sağlanıyor', required: false },
      { q: 'Veri tabanlarında kişisel veri **encrypted at rest**', required: false },
      { q: '**Firewall + antivirus/EDR** tüm endpoint\'lerde aktif', required: true },
    ],
  },
  {
    title: 'İdari Tedbirler',
    items: [
      { q: 'Kişisel veri gizlilik taahhütnamesi çalışanlara imzalatılmış', required: true },
      { q: 'Yılda en az 1 kez KVKK farkındalık eğitimi veriliyor', required: true },
      { q: 'Tedarikçi/iş ortağı sözleşmelerinde **veri işleyen** maddesi var', required: true },
      { q: 'Yurt dışı veri aktarımı için tam uygun (taahhütname, açık rıza veya yeterlilik kararı)', required: false },
    ],
  },
  {
    title: 'Haklar ve Süreçler',
    items: [
      { q: 'İlgili kişi başvuru formu hazırlandı (web sitesinde erişilebilir)', required: true },
      { q: 'Başvurulara **30 gün içinde yanıt** verme süreci tanımlı', required: true },
      { q: 'Veri ihlali (sızıntı) durumunda **72 saat içinde KDK** bildirimi için süreç var', required: true },
      { q: 'Silme/anonimleştirme/imha kayıtları tutuluyor', required: false },
    ],
  },
  {
    title: 'Özel Nitelikli Veriler',
    items: [
      { q: 'Özel nitelikli veri (sağlık, biyometrik, ceza) işleniyorsa ek güvenlik tedbirleri alındı', required: false },
      { q: 'Özel nitelikli veri işleme için açık rıza ayrıca toplanıyor', required: false },
      { q: 'Özel nitelikli veri 2 faktörlü erişim korumalı', required: false },
    ],
  },
];

const TOTAL_ITEMS = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
const REQUIRED_ITEMS = SECTIONS.reduce((sum, s) => sum + s.items.filter(i => i.required).length, 0);

export default function KVKKAuditTool() {
  const [checked, setChecked] = useState({});

  const { totalChecked, requiredChecked, complianceScore, requiredMissing } = useMemo(() => {
    let totalChecked = 0;
    let requiredChecked = 0;
    const requiredMissing = [];

    SECTIONS.forEach((section) => {
      section.items.forEach((item, idx) => {
        const key = `${section.title}-${idx}`;
        if (checked[key]) {
          totalChecked++;
          if (item.required) requiredChecked++;
        } else if (item.required) {
          requiredMissing.push({ section: section.title, question: item.q });
        }
      });
    });

    const score = Math.round((requiredChecked / REQUIRED_ITEMS) * 100);
    return { totalChecked, requiredChecked, complianceScore: score, requiredMissing };
  }, [checked]);

  function toggle(section, idx) {
    const key = `${section}-${idx}`;
    setChecked({ ...checked, [key]: !checked[key] });
  }

  function getRiskEstimate() {
    if (complianceScore >= 90) return { label: 'Düşük Risk', color: 'emerald', note: 'KVKK denetiminde minor bulgular beklenir. Cezai risk düşük, ama 1-2 eksiği kapatın.' };
    if (complianceScore >= 70) return { label: 'Orta Risk', color: 'amber', note: 'Temel uyum var ama major eksikler mevcut. Bir şikayet/denetim durumunda 500 bin - 2 milyon TL arası idari para cezası riski.' };
    if (complianceScore >= 50) return { label: 'Yüksek Risk', color: 'orange', note: 'Ciddi uyumsuzluklar var. Denetim halinde 2-5 milyon TL idari para cezası + veri ihlalinde ek yaptırım.' };
    return { label: 'Kritik Risk', color: 'red', note: 'Temel KVKK yükümlülükleri karşılanmamış. Veri ihlali veya şikayet durumunda ciddi mali ve itibar kaybı kaçınılmaz.' };
  }

  const risk = getRiskEstimate();
  const colorMap = {
    emerald: 'from-emerald-900/40 to-teal-900/30 border-emerald-700/60 text-emerald-400',
    amber: 'from-amber-900/40 to-orange-900/30 border-amber-700/60 text-amber-400',
    orange: 'from-orange-900/40 to-red-900/30 border-orange-700/60 text-orange-400',
    red: 'from-red-900/40 to-red-950/50 border-red-700/60 text-red-400',
  };

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
      {/* Checklist */}
      <div className="md:col-span-2">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-slate-800">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item, idx) => {
                  const key = `${section.title}-${idx}`;
                  const isChecked = !!checked[key];
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${isChecked ? 'bg-emerald-950/30 border border-emerald-800/60' : 'bg-slate-800/40 border border-slate-700 hover:border-slate-600'}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(section.title, idx)}
                        className="mt-1 w-5 h-5 accent-emerald-500 shrink-0"
                      />
                      <div className="flex-1">
                        <span
                          className={`text-sm ${isChecked ? 'text-slate-300 line-through' : 'text-slate-100'}`}
                          dangerouslySetInnerHTML={{ __html: item.q.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                        ></span>
                        {item.required && <span className="ml-2 text-xs text-red-400 font-semibold">ZORUNLU</span>}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Score */}
      <div>
        <div className="sticky top-24 space-y-4">
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${colorMap[risk.color]} border`}>
            <div className="text-sm uppercase tracking-wide mb-2">Uyum Skoru</div>
            <div className="text-5xl font-bold mb-2">{complianceScore}<span className="text-2xl">/100</span></div>
            <div className="text-lg font-bold mb-3">{risk.label}</div>
            <p className="text-sm text-slate-300 leading-relaxed">{risk.note}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-sm text-slate-400 mb-2">İlerleme</div>
            <div className="text-white font-bold mb-1">{totalChecked} / {TOTAL_ITEMS} madde</div>
            <div className="text-xs text-slate-500 mb-3">Zorunlu: {requiredChecked} / {REQUIRED_ITEMS}</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all" style={{ width: `${(totalChecked / TOTAL_ITEMS) * 100}%` }}></div>
            </div>
          </div>

          {requiredMissing.length > 0 && (
            <div className="p-5 rounded-2xl bg-red-950/30 border border-red-800/60">
              <div className="text-sm font-bold text-red-300 mb-2">Tamamlanmamış Zorunlu Maddeler ({requiredMissing.length})</div>
              <ul className="space-y-1 text-xs text-red-200">
                {requiredMissing.slice(0, 5).map((m, i) => (
                  <li key={i}>• {m.question.replace(/\*\*(.+?)\*\*/g, '$1').substring(0, 70)}...</li>
                ))}
                {requiredMissing.length > 5 && <li className="text-red-400 italic">+ {requiredMissing.length - 5} daha</li>}
              </ul>
            </div>
          )}

          <a
            href="/#contact"
            className="block w-full text-center px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all text-sm"
          >
            Eksikleri Kapatmak İçin Danışmanlık
          </a>
        </div>
      </div>
    </div>
  );
}
