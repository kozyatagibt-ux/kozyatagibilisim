import { useState, useMemo } from 'react';

/**
 * Ransomware Risk Değerlendirme Testi
 * 15 soruluk, şirket BT hijyeninin ransomware saldırısına karşı ne kadar savunmasız olduğunu skorlayan interaktif araç.
 * Skor: 0-100. 0-40 kritik, 41-70 orta, 71-100 iyi.
 */

const QUESTIONS = [
  {
    category: 'Yedekleme',
    q: 'Şirket verileriniz **3-2-1 kuralına** göre yedekleniyor mu? (3 kopya, 2 farklı medya, 1 offsite)',
    options: [
      { text: 'Evet, offsite dahil düzenli testli', score: 8 },
      { text: 'Yedek var ama offsite yok', score: 3 },
      { text: 'Sadece aynı sunucuda RAID var', score: 0 },
      { text: 'Emin değilim', score: 0 },
    ],
  },
  {
    category: 'Yedekleme',
    q: 'Yedekleriniz **immutable** (değiştirilemez) bir storage\'da mı saklanıyor? (S3 Object Lock, Azure Immutable Blob, tape)',
    options: [
      { text: 'Evet, immutable + air-gap tape', score: 8 },
      { text: 'Immutable cloud var', score: 6 },
      { text: 'Sadece standart bulut yedek', score: 2 },
      { text: 'Sadece lokal disk', score: 0 },
    ],
  },
  {
    category: 'Yedekleme',
    q: 'Restore test\'i ne sıklıkta yapılıyor?',
    options: [
      { text: 'Aylık, otomatik + rapor', score: 8 },
      { text: 'Çeyreklik manuel', score: 5 },
      { text: 'Yılda 1 kez ya da olayda', score: 2 },
      { text: 'Hiç yapılmadı', score: 0 },
    ],
  },
  {
    category: 'Kimlik Yönetimi',
    q: 'Yönetici (admin) hesapları **MFA** ile korunuyor mu?',
    options: [
      { text: 'Evet, FIDO2 anahtar + MFA', score: 8 },
      { text: 'Tüm admin MFA\'lı', score: 6 },
      { text: 'Bazı kullanıcılarda MFA', score: 2 },
      { text: 'MFA kullanmıyoruz', score: 0 },
    ],
  },
  {
    category: 'Kimlik Yönetimi',
    q: 'Günlük kullanılan kullanıcı hesabı **ayrı** bir admin hesabıyla mı erişim sağlıyor?',
    options: [
      { text: 'Evet, tier model uygulanmış', score: 6 },
      { text: 'IT personeli için ayrı', score: 4 },
      { text: 'Tek hesap her şeyde', score: 0 },
    ],
  },
  {
    category: 'Ağ Güvenliği',
    q: 'RDP (uzak masaüstü) internet\'e doğrudan açık mı?',
    options: [
      { text: 'Hayır, sadece VPN+MFA arkasında', score: 10 },
      { text: 'Kapalı ama iç ağda açık', score: 7 },
      { text: 'VPN\'siz ama IP kısıtlı', score: 2 },
      { text: 'Evet, doğrudan açık', score: -5 },
    ],
  },
  {
    category: 'Ağ Güvenliği',
    q: 'Kurumsal firewall\'unuz hangi seviyede?',
    options: [
      { text: 'NGFW (Fortinet/Sophos/PAN) + IPS aktif', score: 8 },
      { text: 'Firewall var ama IPS lisansı yok', score: 4 },
      { text: 'Sadece router NAT\'ı', score: 0 },
      { text: 'Emin değilim', score: 0 },
    ],
  },
  {
    category: 'Ağ Güvenliği',
    q: 'Ağ **segmentasyonu** var mı? (kullanıcı/sunucu/misafir ayrı VLAN)',
    options: [
      { text: 'Evet, micro-segmentation', score: 6 },
      { text: 'VLAN\'larla ayrı', score: 4 },
      { text: 'Tek flat network', score: 0 },
    ],
  },
  {
    category: 'Endpoint',
    q: 'Endpoint\'lerinizde ne kurulu?',
    options: [
      { text: 'EDR (CrowdStrike/SentinelOne/Defender Endpoint)', score: 8 },
      { text: 'Kurumsal antivirus (Bitdefender/Kaspersky)', score: 4 },
      { text: 'Windows Defender', score: 2 },
      { text: 'Hiçbir şey veya eski AV', score: 0 },
    ],
  },
  {
    category: 'Endpoint',
    q: 'Windows güncellemeleri nasıl yönetiliyor?',
    options: [
      { text: 'WSUS/Intune + patch compliance raporu', score: 6 },
      { text: 'Otomatik update aktif (herkes bireysel)', score: 3 },
      { text: 'Elle, karışık, bazı cihazlar geri kalmış', score: 1 },
      { text: 'Kapalı / bilmiyoruz', score: 0 },
    ],
  },
  {
    category: 'E-posta',
    q: 'E-posta koruması ne seviyede?',
    options: [
      { text: 'Defender for O365 + DMARC reject', score: 8 },
      { text: 'M365 standart + DMARC none', score: 4 },
      { text: 'Temel spam filter', score: 2 },
      { text: 'Kendimiz yönetmiyoruz', score: 1 },
    ],
  },
  {
    category: 'İnsan Faktörü',
    q: 'Çalışanlara **düzenli phishing farkındalık eğitimi** veriyor musunuz?',
    options: [
      { text: 'Aylık simülasyon + eğitim', score: 6 },
      { text: 'Yıllık bir kez', score: 3 },
      { text: 'İşe başlarken tek sefer', score: 1 },
      { text: 'Hiç', score: 0 },
    ],
  },
  {
    category: 'İnsan Faktörü',
    q: 'Ayrılan çalışanın hesabı ne zaman iptal ediliyor?',
    options: [
      { text: 'Aynı gün, otomatik', score: 6 },
      { text: 'Birkaç gün içinde', score: 3 },
      { text: '1-2 hafta sürüyor', score: 1 },
      { text: 'Bazen unutuyoruz', score: -2 },
    ],
  },
  {
    category: 'Olay Müdahale',
    q: 'Siber olay olursa ne yapacağınızı bilen yazılı bir **runbook** var mı?',
    options: [
      { text: 'Evet, yazılı + tabletop exercise yapıldı', score: 6 },
      { text: 'Yazılı var ama test edilmedi', score: 3 },
      { text: 'IT personeli "bilir" ama yazılı değil', score: 1 },
      { text: 'Yok', score: 0 },
    ],
  },
  {
    category: 'Sigorta & Partner',
    q: 'Siber sigorta poliçeniz var mı?',
    options: [
      { text: 'Evet, IR + iş kaybı kapsamlı', score: 4 },
      { text: 'Sadece temel poliçe', score: 2 },
      { text: 'Yok', score: 0 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);

function getRiskLevel(percent) {
  if (percent >= 80) return { label: 'Düşük Risk', color: 'emerald', description: 'Güçlü bir IT hijyeniniz var. Saldırıya uğrarsanız bile hasar minimum olacaktır.' };
  if (percent >= 60) return { label: 'Orta Risk', color: 'amber', description: 'Temel koruma mevcut ama önemli boşluklar var. Kritik alanları güçlendirmezseniz saldırı durumunda ciddi kayıp yaşanabilir.' };
  if (percent >= 40) return { label: 'Yüksek Risk', color: 'orange', description: 'Ransomware saldırısı durumunda veri kaybı ve uzun iş kesintisi olasılığı yüksek. Acil iyileştirme gerekli.' };
  return { label: 'Kritik Risk', color: 'red', description: 'Saldırı durumunda şirket iflas riskiyle karşılaşabilir. Bu profil saldırganlar için "kolay hedef" işaretidir.' };
}

export default function RansomwareRiskQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  }, [answers]);

  const percent = Math.max(0, Math.round((score / MAX_SCORE) * 100));
  const risk = getRiskLevel(percent);
  const answered = Object.keys(answers).length;

  function handleAnswer(qIdx, optIdx, score) {
    setAnswers({ ...answers, [qIdx]: score });
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  if (submitted) {
    const colorMap = {
      emerald: 'from-emerald-900/40 to-teal-900/30 border-emerald-700/60 text-emerald-400',
      amber: 'from-amber-900/40 to-orange-900/30 border-amber-700/60 text-amber-400',
      orange: 'from-orange-900/40 to-red-900/30 border-orange-700/60 text-orange-400',
      red: 'from-red-900/40 to-red-950/50 border-red-700/60 text-red-400',
    };

    // Weakest categories identify
    const categoryScores = {};
    QUESTIONS.forEach((q, idx) => {
      if (!categoryScores[q.category]) categoryScores[q.category] = { score: 0, max: 0 };
      categoryScores[q.category].max += Math.max(...q.options.map(o => o.score));
      categoryScores[q.category].score += answers[idx] || 0;
    });
    const weakCats = Object.entries(categoryScores)
      .map(([cat, s]) => ({ cat, percent: Math.max(0, Math.round((s.score / s.max) * 100)) }))
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 3);

    return (
      <div className="max-w-3xl mx-auto">
        <div className={`p-8 rounded-3xl bg-gradient-to-br ${colorMap[risk.color]} border`}>
          <div className="text-center mb-6">
            <div className="text-sm uppercase tracking-wide mb-2">Ransomware Risk Skorunuz</div>
            <div className="text-6xl md:text-7xl font-bold mb-2">{percent}<span className="text-3xl">/100</span></div>
            <div className="text-2xl font-bold mb-3">{risk.label}</div>
            <p className="text-slate-300 max-w-md mx-auto leading-relaxed">{risk.description}</p>
          </div>

          <div className="bg-slate-950/40 rounded-2xl p-5 mb-5">
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">En Zayıf 3 Alanınız</h3>
            <div className="space-y-3">
              {weakCats.map((c) => (
                <div key={c.cat} className="flex items-center justify-between gap-3">
                  <span className="text-white font-medium">{c.cat}</span>
                  <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${c.percent < 40 ? 'bg-red-500' : c.percent < 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${c.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-400 w-10 text-right">{c.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-3">
            <a
              href="/#contact"
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all"
            >
              Zayıf Alanlarınızı Düzeltmek İçin Ücretsiz Görüşme
            </a>
            <button
              onClick={reset}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Testi baştan al
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-400">İlerleme</div>
            <div className="text-lg font-bold text-white">{answered} / {QUESTIONS.length} soru</div>
          </div>
          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all" style={{ width: `${(answered / QUESTIONS.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="space-y-8">
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-6 last:border-0">
              <div className="mb-3">
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">{q.category}</span>
                <h3 className="text-white font-semibold mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: q.q.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}></h3>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <label
                    key={optIdx}
                    className={`block p-3 rounded-xl border cursor-pointer transition-all ${answers[idx] === opt.score ? 'border-cyan-500 bg-cyan-900/20' : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'}`}
                  >
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      className="hidden"
                      checked={answers[idx] === opt.score}
                      onChange={() => handleAnswer(idx, optIdx, opt.score)}
                    />
                    <span className="text-sm text-slate-200">{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {answered === QUESTIONS.length && (
          <button
            onClick={() => setSubmitted(true)}
            className="mt-8 w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl transition-all text-lg"
          >
            Risk Skorumu Göster →
          </button>
        )}
      </div>
    </div>
  );
}
