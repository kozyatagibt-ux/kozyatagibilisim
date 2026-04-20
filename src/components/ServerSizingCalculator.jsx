import { useState, useMemo } from 'react';

/**
 * Sunucu Boyutlandırma Hesaplayıcı
 * Kullanıcı sayısı + uygulama tipi + veri boyutu + iş yükü profili girdilerinden
 * CPU / RAM / disk / NIC önerileri üretir.
 */

const APP_PROFILES = {
  file_only: {
    label: 'Sadece Dosya Paylaşımı',
    cpuPerUser: 0.04, ramPerUser: 0.15, iopsPerUser: 4,
    baseRAM: 8, baseCPU: 2,
  },
  ad_files: {
    label: 'Dosya + Active Directory + Yazdırma',
    cpuPerUser: 0.06, ramPerUser: 0.2, iopsPerUser: 6,
    baseRAM: 12, baseCPU: 4,
  },
  erp_sql: {
    label: 'ERP / MSSQL (Logo, Mikro, Netsis)',
    cpuPerUser: 0.15, ramPerUser: 0.5, iopsPerUser: 25,
    baseRAM: 32, baseCPU: 8,
  },
  remote_desktop: {
    label: 'Uzak Masaüstü / Terminal Server',
    cpuPerUser: 0.25, ramPerUser: 2.0, iopsPerUser: 15,
    baseRAM: 16, baseCPU: 8,
  },
  cad_design: {
    label: 'CAD / Tasarım / Render Paylaşımı',
    cpuPerUser: 0.3, ramPerUser: 1.0, iopsPerUser: 40,
    baseRAM: 32, baseCPU: 8,
  },
  virtualization_lab: {
    label: 'Sanallaştırma Host (çoklu VM)',
    cpuPerUser: 0.5, ramPerUser: 3.0, iopsPerUser: 30,
    baseRAM: 64, baseCPU: 16,
  },
};

function roundUp(n, step) {
  return Math.ceil(n / step) * step;
}

function formatTL(n) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

export default function ServerSizingCalculator() {
  const [users, setUsers] = useState(50);
  const [appType, setAppType] = useState('erp_sql');
  const [dataSize, setDataSize] = useState(2); // TB
  const [peakLoad, setPeakLoad] = useState(1.5); // multiplier
  const [ha, setHa] = useState(false);

  const spec = useMemo(() => {
    const profile = APP_PROFILES[appType];
    const rawCPU = profile.baseCPU + (users * profile.cpuPerUser);
    const rawRAM = profile.baseRAM + (users * profile.ramPerUser);
    const rawIOPS = users * profile.iopsPerUser;

    // Peak load multiplier
    const cpuCores = roundUp(rawCPU * peakLoad, 2);
    const ramGB = roundUp(rawRAM * peakLoad, 8);

    // Disk — user data + OS + SQL log buffer + 50% free headroom
    const osDisk = 200; // GB SSD
    const dataDisk = Math.max(500, dataSize * 1024 * 1.5); // GB, 50% headroom
    const totalDisk = osDisk + dataDisk;

    // IOPS = peak olmadan önce SSD veya NVMe gerekli mi?
    const storageType = rawIOPS > 5000 ? 'NVMe (10K+ IOPS)' : rawIOPS > 1500 ? 'SSD SATA (5K IOPS)' : 'SSD SATA veya SAS HDD (RAID10)';

    // NIC
    const nicSpeed = users > 100 || rawIOPS > 3000 ? '10GbE (SFP+)' : users > 30 ? '2.5GbE veya 2x 1GbE LACP' : '1GbE';

    // Donanım platform önerisi
    let platform;
    if (cpuCores <= 8 && ramGB <= 32) platform = 'Tower Sunucu — Dell PowerEdge T150, HPE ML30 veya Lenovo ST250';
    else if (cpuCores <= 16 && ramGB <= 128) platform = 'Rack 1U/2U — Dell R250/R350, HPE DL20/DL325, Lenovo SR250';
    else platform = 'Rack 2U+ — Dell R650/R750, HPE DL380, Lenovo SR650';

    // Tahmini maliyet TL (2025 pazar ortalaması, kur farkına göre %15 oynar)
    let cost = 25000; // base
    cost += (cpuCores - 2) * 2500; // core başına
    cost += (ramGB - 8) * 350; // GB başına
    cost += (dataDisk > 500 ? (dataDisk - 500) * 15 : 0); // GB başına (SSD)
    if (ha) cost = cost * 2 + 60000; // HA için cluster + shared storage

    // Windows Server lisans
    const winLicense = 35000 + (users > 50 ? (users - 50) * 600 : 0);

    return {
      cpu: cpuCores,
      ram: ramGB,
      diskOs: osDisk,
      diskData: Math.round(dataDisk),
      storageType,
      nic: nicSpeed,
      iops: Math.round(rawIOPS * peakLoad),
      platform,
      hwCost: Math.round(cost),
      winLicense: Math.round(winLicense),
      totalCost: Math.round(cost + winLicense),
      ha,
    };
  }, [users, appType, dataSize, peakLoad, ha]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-white mb-5">İş Yükü Profili</h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Kullanıcı sayısı: <span className="text-cyan-400 font-bold">{users}</span>
                </label>
                <input
                  type="range" min="5" max="300" step="5"
                  value={users}
                  onChange={(e) => setUsers(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>5</span><span>150</span><span>300</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Uygulama tipi</label>
                <select
                  value={appType}
                  onChange={(e) => setAppType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {Object.entries(APP_PROFILES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Toplam veri (TB): <span className="text-cyan-400 font-bold">{dataSize}</span>
                </label>
                <input
                  type="range" min="0.5" max="20" step="0.5"
                  value={dataSize}
                  onChange={(e) => setDataSize(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0.5 TB</span><span>10 TB</span><span>20 TB</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Pik yük çarpanı: <span className="text-cyan-400 font-bold">{peakLoad}x</span>
                </label>
                <input
                  type="range" min="1" max="3" step="0.1"
                  value={peakLoad}
                  onChange={(e) => setPeakLoad(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1x (sabit)</span><span>2x (dönem sonu)</span><span>3x (yoğun)</span>
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={ha}
                  onChange={(e) => setHa(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500"
                />
                <div>
                  <div className="text-sm font-semibold text-white">High Availability (HA)</div>
                  <div className="text-xs text-slate-400">2 node cluster + shared storage</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-3">
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-700/40 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-5">Önerilen Sunucu Konfigürasyonu</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-950/40 rounded-xl">
                <div className="text-xs text-slate-400 uppercase tracking-wide">CPU Çekirdek</div>
                <div className="text-2xl font-bold text-white mt-1">{spec.cpu}</div>
              </div>
              <div className="p-4 bg-slate-950/40 rounded-xl">
                <div className="text-xs text-slate-400 uppercase tracking-wide">RAM</div>
                <div className="text-2xl font-bold text-white mt-1">{spec.ram} GB</div>
              </div>
              <div className="p-4 bg-slate-950/40 rounded-xl">
                <div className="text-xs text-slate-400 uppercase tracking-wide">OS Disk</div>
                <div className="text-2xl font-bold text-white mt-1">{spec.diskOs} GB</div>
              </div>
              <div className="p-4 bg-slate-950/40 rounded-xl">
                <div className="text-xs text-slate-400 uppercase tracking-wide">Data Disk</div>
                <div className="text-2xl font-bold text-white mt-1">{spec.diskData} GB</div>
              </div>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Storage tipi</span>
                <span className="text-white font-semibold text-right">{spec.storageType}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Tahmini IOPS (pik)</span>
                <span className="text-white font-semibold">{spec.iops.toLocaleString('tr-TR')}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Network NIC</span>
                <span className="text-white font-semibold text-right">{spec.nic}</span>
              </div>
              <div className="flex justify-between gap-2 pt-2 border-t border-slate-800">
                <span className="text-slate-400">Donanım platformu</span>
                <span className="text-white font-semibold text-right text-xs">{spec.platform}</span>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-slate-950/40 rounded-xl text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Donanım {spec.ha && '(2x HA)'}</span>
                <span className="text-white">{formatTL(spec.hwCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Windows Server + CAL</span>
                <span className="text-white">{formatTL(spec.winLicense)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="text-cyan-300 font-semibold">Tahmini toplam yatırım</span>
                <span className="text-cyan-400 font-bold">{formatTL(spec.totalCost)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-900/20 border border-amber-800/40 rounded-xl text-xs text-amber-200 leading-relaxed">
            <strong>Not:</strong> Fiyatlar 2025 ortalaması; ürün tedarikçisine, anlaşmaya, döviz kuruna göre ±%15-20 değişir. Linux/Windows lisans seçimi, yedekleme yazılımı, antivirüs/EDR ve kurulum/montaj maliyeti dahil değildir.
          </div>

          <a
            href="/#contact"
            className="mt-4 block w-full text-center px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all"
          >
            Size Özel Detaylı Teklif İste
          </a>
        </div>
      </div>
    </div>
  );
}
