export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok';
  url: string;
  label: string;
}

export interface ImpactStat {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
    mapsUrl: string;
  };
  phone: string;
  whatsappNumber: string;
  email: string;
  operatingHours: {
    days: string;
    hours: string;
    weekend: string;
  };
  socialLinks: SocialLink[];
  impactStats: ImpactStat[];
  meta: {
    siteUrl: string;
    author: string;
    themeColor: string;
    locale: string;
  };
}

// This is an independent informational concept, not an individual licensed
// cooperative. Contact details, opening hours, performance figures and outlet
// addresses cannot be published until an authorized operator verifies them.
export const siteConfig: SiteConfig = {
  name: 'Koperasi Desa/Kelurahan Merah Putih',
  shortName: 'Koperasi Merah Putih',
  legalName: 'Koperasi Desa/Kelurahan Merah Putih (program)',
  tagline: 'Mengenal Gotong Royong dan Ekonomi Desa',
  description: 'Informasi pengenalan program Koperasi Desa/Kelurahan Merah Putih, contoh unit usaha, prinsip keanggotaan dan sumber regulasi pemerintah.',
  address: {
    street: '',
    village: '',
    district: '',
    regency: '',
    province: '',
    postalCode: '',
    mapsUrl: '',
  },
  phone: '',
  whatsappNumber: '',
  email: '',
  operatingHours: {
    days: '',
    hours: '',
    weekend: '',
  },
  socialLinks: [],
  impactStats: [],
  meta: {
    siteUrl: 'https://kopdesmerahputih.id',
    author: 'KOPDES — proyek informasi independen',
    themeColor: '#B91C1C',
    locale: 'id_ID',
  },
};
