import { useState, useEffect } from 'react';

// NOT: Bu bileşen önceden CookieBanner.jsx adındaydı. AdBlocker'lar dosya adında "Cookie"
// geçen modülleri otomatik blokluyor (ERR_BLOCKED_BY_CLIENT) ve site komple çöküyordu.
// Bu yüzden tarafsız bir isimle (ConsentNotice) yeniden adlandırıldı.
const ConsentNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('kb_consent')) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = (value) => {
    try { localStorage.setItem('kb_consent', value); } catch { /* private mode */ }
    setVisible(false);
    if (value === 'all' && window.dataLayer) {
      window.dataLayer.push({ event: 'consent_granted' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 p-4 md:p-5 shadow-2xl">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <p className="text-sm text-slate-300 max-w-3xl">
          Web sitemizde, deneyiminizi iyileştirmek ve ziyaretleri analiz etmek için çerezler kullanıyoruz.
          Detaylar için <a href="/cerez-politikasi.html" className="text-cyan-400 underline">Çerez Politikası</a>'nı inceleyebilirsiniz.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => accept('essential')} className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors">
            Sadece Zorunlu
          </button>
          <button onClick={() => accept('all')} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors">
            Tümünü Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentNotice;
