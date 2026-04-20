import { useState, useMemo } from 'react';

/**
 * IT Maliyet Hesaplayıcı
 * 50-250 kişilik orta ölçekli Türk şirketleri için tahmini yıllık IT bütçesi.
 * Gerçek piyasa fiyatlarına (2024-2025) göre kalibre edilmiştir — pazarlık + tedarikçi farklarıyla ±%20 oynar.
 */

const SERVICE_PRICES = {
  // Aylık TL / kullanıcı başı bazlı lisanslar
  m365_basic: 110,
  m365_standard: 230,
  m365_premium: 410,
  gworkspace_standard: 370,
  // Yıllık sabit bileşenler (TL)
  firewall_fortigate_100f_5y_avg_yearly: 140000,
  firewall_sophos_xgs_2100_5y_avg_yearly: 120000,
  firewall_palo_pa440_5y_avg_yearly: 280000,
  // Sunucu maliyeti (donanım + Windows Server + CAL, 5 yıl amortize)
  server_small_yearly: 80000, // 1 host, 20-40 VM
  server_medium_yearly: 180000, // 2-3 host cluster
  server_large_yearly: 320000, // 3+ host HA + shared storage
  // Yedekleme (Veeam + donanım + bulut)
  backup_basic_yearly: 60000,
  backup_enterprise_yearly: 180000,
  // MSP yönetilen IT paketleri (aylık TL)
  msp_light_per_user_monthly: 300, // sadece helpdesk
  msp_standard_per_user_monthly: 550, // tam managed
  msp_premium_per_user_monthly: 850, // + SOC, compliance
  // Endpoint güvenlik (EDR)
  edr_per_user_monthly: 120,
  // Network altyapı (switch, AP, kablolama) — 5 yıl amortize
  network_per_user_yearly: 2500,
};

const SCENARIOS = {
  minimal: {
    label: 'Minimal (Sadece lisans + temel destek)',
    desc: 'Mail + temel güvenlik + arada sırada destek',
  },
  standard: {
    label: 'Standart (Önerilen)',
    desc: 'Yönetilen IT + firewall + yedekleme + EDR',
  },
  enterprise: {
    label: 'Yüksek güvenlik (ISO 27001 / KVKK yolu)',
    desc: 'Full kapsama + compliance + SOC izleme',
  },
};

function formatTL(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

export default function ITCostCalculator() {
  const [users, setUsers] = useState(80);
  const [servers, setServers] = useState('medium'); // small / medium / large / none
  const [scenario, setScenario] = useState('standard');
  const [emailPlan, setEmailPlan] = useState('m365_standard');
  const [firewall, setFirewall] = useState('fortigate');
  const [includeCompliance, setIncludeCompliance] = useState(false);

  const result = useMemo(() => {
    let monthly = 0;
    let yearly = 0;
    const breakdown = [];

    // 1) E-posta lisansı
    const emailMonthly = SERVICE_PRICES[emailPlan] * users;
    monthly += emailMonthly;
    breakdown.push({
      label: emailPlan.includes('m365') ? 'Microsoft 365' : 'Google Workspace',
      detail: `${users} kullanıcı × ${SERVICE_PRICES[emailPlan]} TL/ay`,
      monthlyTL: emailMonthly,
    });

    // 2) Firewall (5 yıl amortize)
    let fwYearly = 0;
    if (firewall === 'fortigate') fwYearly = SERVICE_PRICES.firewall_fortigate_100f_5y_avg_yearly;
    if (firewall === 'sophos') fwYearly = SERVICE_PRICES.firewall_sophos_xgs_2100_5y_avg_yearly;
    if (firewall === 'palo') fwYearly = SERVICE_PRICES.firewall_palo_pa440_5y_avg_yearly;
    yearly += fwYearly;
    breakdown.push({
      label: `Firewall (${firewall === 'fortigate' ? 'FortiGate 100F' : firewall === 'sophos' ? 'Sophos XGS 2100' : 'Palo Alto PA-440'})`,
      detail: '5 yıl amortize + lisans yenileme ortalama',
      yearlyTL: fwYearly,
    });

    // 3) Sunucu
    if (servers !== 'none') {
      const serverKey = `server_${servers}_yearly`;
      yearly += SERVICE_PRICES[serverKey];
      breakdown.push({
        label: `Sunucu Altyapısı (${servers === 'small' ? '1 host' : servers === 'medium' ? '2-3 host cluster' : '3+ host HA'})`,
        detail: 'Donanım + Windows Server + CAL, 5 yıl amortize',
        yearlyTL: SERVICE_PRICES[serverKey],
      });
    }

    // 4) Yedekleme
    const backupYearly = scenario === 'enterprise' ? SERVICE_PRICES.backup_enterprise_yearly : SERVICE_PRICES.backup_basic_yearly;
    yearly += backupYearly;
    breakdown.push({
      label: 'Yedekleme (Veeam + bulut replica)',
      detail: scenario === 'enterprise' ? 'Immutable storage + offsite DR' : 'Günlük backup + haftalık test',
      yearlyTL: backupYearly,
    });

    // 5) Endpoint güvenlik (EDR) — scenario standard/enterprise'da var
    if (scenario !== 'minimal') {
      const edrMonthly = SERVICE_PRICES.edr_per_user_monthly * users;
      monthly += edrMonthly;
      breakdown.push({
        label: 'Endpoint Güvenlik (EDR)',
        detail: `${users} cihaz × ${SERVICE_PRICES.edr_per_user_monthly} TL/ay`,
        monthlyTL: edrMonthly,
      });
    }

    // 6) Yönetilen IT (MSP)
    let mspPerUser = 0;
    if (scenario === 'minimal') mspPerUser = SERVICE_PRICES.msp_light_per_user_monthly;
    if (scenario === 'standard') mspPerUser = SERVICE_PRICES.msp_standard_per_user_monthly;
    if (scenario === 'enterprise') mspPerUser = SERVICE_PRICES.msp_premium_per_user_monthly;
    const mspMonthly = mspPerUser * users;
    monthly += mspMonthly;
    breakdown.push({
      label: 'Yönetilen IT Hizmeti',
      detail: `${users} kullanıcı × ${mspPerUser} TL/ay (${scenario === 'minimal' ? 'Light — helpdesk' : scenario === 'standard' ? 'Standard — full managed' : 'Premium — SOC + compliance'})`,
      monthlyTL: mspMonthly,
    });

    // 7) Network altyapı
    const networkYearly = SERVICE_PRICES.network_per_user_yearly * users;
    yearly += networkYearly;
    breakdown.push({
      label: 'Network Altyapı (switch, AP, kablolama)',
      detail: `${users} kullanıcı × ${SERVICE_PRICES.network_per_user_yearly} TL/yıl (5 yıl amortize)`,
      yearlyTL: networkYearly,
    });

    // 8) ISO/compliance opsiyonel
    if (includeCompliance) {
      const complianceYearly = 400000; // danışmanlık + denetim + araçlar ilk yıl
      yearly += complianceYearly;
      breakdown.push({
        label: 'ISO 27001 / KVKK uyum (ilk yıl)',
        detail: 'Danışmanlık + sertifikasyon + araç maliyetleri',
        yearlyTL: complianceYearly,
      });
    }

    const totalYearly = monthly * 12 + yearly;
    const totalMonthly = totalYearly / 12;
    const perUserMonthly = totalMonthly / users;

    return { monthly, yearly, totalYearly, totalMonthly, perUserMonthly, breakdown };
  }, [users, servers, scenario, emailPlan, firewall, includeCompliance]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Şirket Profilinizi Girin</h3>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Çalışan sayısı: <span className="text-cyan-400 font-bold">{users} kişi</span>
              </label>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={users}
                onChange={(e) => setUsers(parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>20</span>
                <span>150</span>
                <span>300</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Senaryo</label>
              <div className="space-y-2">
                {Object.entries(SCENARIOS).map(([key, val]) => (
                  <label key={key} className={`block p-3 rounded-xl border cursor-pointer transition-all ${scenario === key ? 'border-cyan-500 bg-cyan-900/20' : 'border-slate-700 hover:border-slate-600'}`}>
                    <input
                      type="radio"
                      name="scenario"
                      value={key}
                      checked={scenario === key}
                      onChange={(e) => setScenario(e.target.value)}
                      className="hidden"
                    />
                    <div className="text-sm font-semibold text-white">{val.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{val.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">E-posta platformu</label>
              <select
                value={emailPlan}
                onChange={(e) => setEmailPlan(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="m365_basic">Microsoft 365 Business Basic (~110 TL/kul/ay)</option>
                <option value="m365_standard">Microsoft 365 Business Standard (~230 TL/kul/ay)</option>
                <option value="m365_premium">Microsoft 365 Business Premium (~410 TL/kul/ay)</option>
                <option value="gworkspace_standard">Google Workspace Business Standard (~370 TL/kul/ay)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Firewall markası</label>
              <select
                value={firewall}
                onChange={(e) => setFirewall(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="fortigate">FortiGate 100F (Fortinet)</option>
                <option value="sophos">Sophos XGS 2100</option>
                <option value="palo">Palo Alto PA-440</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Sunucu altyapısı</label>
              <select
                value={servers}
                onChange={(e) => setServers(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="none">Sunucu yok (tam bulut)</option>
                <option value="small">Küçük (1 sunucu, 20-40 VM)</option>
                <option value="medium">Orta (2-3 host cluster)</option>
                <option value="large">Büyük (3+ host HA + storage)</option>
              </select>
            </div>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
              <input
                type="checkbox"
                checked={includeCompliance}
                onChange={(e) => setIncludeCompliance(e.target.checked)}
                className="w-4 h-4 accent-cyan-500"
              />
              <div>
                <div className="text-sm font-semibold text-white">ISO 27001 / KVKK uyum hazırlığı</div>
                <div className="text-xs text-slate-400">Danışmanlık + sertifikasyon (ilk yıl)</div>
              </div>
            </label>
          </div>

          {/* Results */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white mb-4">Tahmini Yıllık IT Bütçeniz</h3>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/40 to-blue-900/30 border border-cyan-700/40">
              <div className="text-sm text-cyan-300 mb-1">Yıllık Toplam Maliyet</div>
              <div className="text-3xl md:text-4xl font-bold text-white">{formatTL(result.totalYearly)}</div>
              <div className="text-sm text-slate-300 mt-2">
                Aylık ortalama: <strong className="text-white">{formatTL(result.totalMonthly)}</strong>
              </div>
              <div className="text-sm text-slate-300">
                Kullanıcı başına aylık: <strong className="text-white">{formatTL(result.perUserMonthly)}</strong>
              </div>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2">
              <div className="text-sm font-semibold text-slate-300 mb-2">Detaylı Kalemler:</div>
              {result.breakdown.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.detail}</div>
                    </div>
                    <div className="text-sm font-bold text-cyan-400 whitespace-nowrap">
                      {item.monthlyTL !== undefined
                        ? `${formatTL(item.monthlyTL)}/ay`
                        : `${formatTL(item.yearlyTL)}/yıl`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-800/40 text-xs text-amber-200 leading-relaxed">
              <strong>Not:</strong> Bu hesaplayıcı 2024-2025 piyasa ortalamalarına göre tahmin üretir. Gerçek teklif, tedarikçi pazarlığı, mevcut lisans/donanım envanteri ve özel ihtiyaçlara göre ±%20 değişebilir. Detaylı teklif için ücretsiz keşif görüşmesi talep edin.
            </div>

            <a
              href="/#contact"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl transition-all"
            >
              Ücretsiz Detaylı Teklif İste
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
