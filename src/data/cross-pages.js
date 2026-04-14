// Hizmet x Lokasyon çapraz sayfalar — otomatik üretim
// 9 hizmet x 32 lokasyon = 288 sayfa
import { localLandings } from './locals';
import { services } from './services';

// Hizmet bazlı kısa slug ve Türkçe isimler
const SERVICE_MAP = {
  'sunucu-sanallastirma': {
    shortSlug: 'sunucu-kurulumu',
    label: 'Sunucu Kurulumu',
    labelAlt: 'Server Kurulumu ve Sanallaştırma',
    desc: (area) => `${area} sunucu kurulumu, sanallaştırma ve server bakım hizmetleri. VMware, Hyper-V, Proxmox ile kurumsal IT destek.`,
  },
  'kimlik-yonetimi': {
    shortSlug: 'active-directory-kurulumu',
    label: 'Active Directory Kurulumu',
    labelAlt: 'Merkezi Kimlik Yönetimi',
    desc: (area) => `${area} Active Directory, Azure AD kurulumu ve merkezi kimlik yönetimi. SSO, MFA ve bilgi işlem destek hizmetleri.`,
  },
  'dosya-paylasim': {
    shortSlug: 'dosya-paylasim-nas',
    label: 'Dosya Paylaşım & NAS',
    labelAlt: 'NAS Kurulumu ve Bulut Depolama',
    desc: (area) => `${area} NAS kurulumu, dosya paylaşım sunucusu ve bulut depolama çözümleri. KVKK uyumlu kurumsal bilişim hizmeti.`,
  },
  'ag-guvenligi-firewall': {
    shortSlug: 'firewall-kurulumu',
    label: 'Firewall Kurulumu',
    labelAlt: 'Firewall ve Siber Güvenlik',
    desc: (area) => `${area} firewall kurulumu, siber güvenlik ve ağ güvenliği hizmetleri. Fortinet, Sophos, pfSense ile kurumsal IT destek.`,
  },
  'kurumsal-eposta': {
    shortSlug: 'kurumsal-eposta',
    label: 'Kurumsal E-Posta',
    labelAlt: 'Microsoft 365 ve Google Workspace',
    desc: (area) => `${area} kurumsal e-posta kurulumu. Microsoft 365, Google Workspace, Exchange taşıma ve SPF/DKIM/DMARC yapılandırması.`,
  },
  'network-altyapi': {
    shortSlug: 'network-kurulumu',
    label: 'Network Kurulumu',
    labelAlt: 'Network Altyapı ve Kablolama',
    desc: (area) => `${area} network kurulumu, internet kablolama, kabinet düzenleme, Wi-Fi ve switch altyapısı. Kurumsal bilişim firması.`,
  },
  'son-kullanici-destek': {
    shortSlug: 'bilgisayar-destek',
    label: 'Bilgisayar Destek',
    labelAlt: 'IT Destek Hattı ve Helpdesk',
    desc: (area) => `${area} bilgisayar teknik destek ve helpdesk hizmeti. Yerinde ve uzaktan IT destek, 7/24 bilgi işlem desteği.`,
  },
  'felaket-kurtarma-yedekleme': {
    shortSlug: 'veri-yedekleme',
    label: 'Veri Yedekleme',
    labelAlt: 'Yedekleme ve Felaket Kurtarma',
    desc: (area) => `${area} veri yedekleme, bulut backup ve felaket kurtarma hizmetleri. Ransomware ve veri kaybına karşı kurumsal koruma.`,
  },
  'it-saglik-kontrolu-denetim': {
    shortSlug: 'it-denetim',
    label: 'IT Denetim',
    labelAlt: 'IT Sağlık Kontrolü ve Denetim',
    desc: (area) => `${area} IT altyapı denetimi ve sağlık kontrolü. Güvenlik, yedekleme, ağ analizi ve KVKK uyumu. Bilişim firması güvencesiyle.`,
  },
};

// Genel lokasyon sayfalarını (İstanbul genel, Anadolu Yakası) çapraz sayfadan hariç tut
const EXCLUDED_SLUGS = ['istanbul-yonetilen-it-hizmetleri', 'anadolu-yakasi-kurumsal-bilisim'];

// Lokasyondan area (ilçe adı) çıkar
function getAreaName(local) {
  return local.area || local.title.replace(/ IT.*$/, '').replace(/ Yönetilen.*$/, '');
}

export function generateCrossPages() {
  const pages = [];
  const filteredLocals = localLandings.filter(l => !EXCLUDED_SLUGS.includes(l.slug));

  for (const local of filteredLocals) {
    const area = getAreaName(local);
    for (const service of services) {
      const svcMeta = SERVICE_MAP[service.slug];
      if (!svcMeta) continue;

      const slug = `${local.slug.replace(/-it-destegi$/, '')}-${svcMeta.shortSlug}`;

      pages.push({
        slug,
        area,
        localSlug: local.slug,
        serviceSlug: service.slug,
        title: `${area} ${svcMeta.label} | ${svcMeta.labelAlt}`,
        h1: `${area} ${svcMeta.labelAlt} Hizmetleri`,
        meta: svcMeta.desc(area),
        serviceName: svcMeta.label,
        serviceTitle: service.title,
        serviceTagline: service.tagline,
        serviceFeatures: service.features || [],
        localGeo: local.geo,
        localIntro: local.intro,
        faqs: [
          {
            q: `${area}'da ${svcMeta.label.toLowerCase()} hizmeti veriyor musunuz?`,
            a: `Evet, ${area} ve çevresinde ${svcMeta.label.toLowerCase()} dahil tüm kurumsal IT hizmetlerini yerinde sunuyoruz. Ataşehir merkezimizden hızlı erişim sağlıyoruz.`,
          },
          {
            q: `${area}'da ${svcMeta.label.toLowerCase()} maliyeti ne kadar?`,
            a: `Maliyet, şirketinizin büyüklüğüne ve ihtiyaçlarına göre değişir. Ücretsiz keşif görüşmesinde detaylı analiz ve fiyat teklifi sunuyoruz.`,
          },
          {
            q: `${svcMeta.label} hizmeti için ne kadar sürede gelirsiniz?`,
            a: `${area} bölgesine genellikle aynı gün müdahale ediyoruz. Acil durumlarda 2-4 saat içinde yerinde destek sağlıyoruz.`,
          },
        ],
      });
    }
  }

  return pages;
}

export const crossPages = generateCrossPages();
