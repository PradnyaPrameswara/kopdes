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

export const siteConfig: SiteConfig = {
  name: 'Koperasi Merah Putih',
  shortName: 'Koperasi Merah Putih',
  legalName: 'Koperasi Konsumen Desa/Kelurahan Merah Putih',
  tagline: 'Membangun Kemandirian Ekonomi Desa untuk Kesejahteraan Bersama',
  description: 'Pusat ekosistem ekonomi desa terpadu: gerai sembako murah, apotek & klinik desa, cold storage hasil tani, serta pembiayaan usaha anggota koperasi.',
  address: {
    street: 'Jl. Raya Merah Putih No. 45',
    village: 'Desa Makmur',
    district: 'Kecamatan Sentosa',
    regency: 'Kabupaten Nusantara',
    province: 'Jawa Barat',
    postalCode: '40123',
    mapsUrl: 'https://maps.google.com/?q=Koperasi+Desa+Merah+Putih',
  },
  phone: '+62 812-3456-7890',
  whatsappNumber: '6281234567890',
  email: 'halo@koperasimerahputih.id',
  operatingHours: {
    days: 'Senin - Jumat',
    hours: '08:00 - 17:00 WIB',
    weekend: 'Sabtu: 08:00 - 14:00 WIB (Klinik 24 Jam)',
  },
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://instagram.com/koperasimerahputih',
      label: 'Instagram @koperasimerahputih',
    },
    {
      platform: 'facebook',
      url: 'https://facebook.com/koperasimerahputih',
      label: 'Facebook Koperasi Merah Putih',
    },
    {
      platform: 'tiktok',
      url: 'https://tiktok.com/@koperasimerahputih',
      label: 'TikTok @koperasimerahputih',
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@koperasimerahputih',
      label: 'YouTube Koperasi Merah Putih TV',
    },
  ],
  impactStats: [
    {
      id: 'members',
      value: '1.200+',
      label: 'Anggota Aktif',
      description: 'Warga desa terdaftar sebagai pemilik sekaligus penerima manfaat koperasi.',
    },
    {
      id: 'products',
      value: '450+',
      label: 'Komoditas Pangan',
      description: 'Pasokan komoditas beras, minyak goreng, gula, dan sarana pertanian warga.',
    },
    {
      id: 'outlets',
      value: '5',
      label: 'Unit Layanan Aktif',
      description: 'Titik operasional fisik yang melayani kebutuhan warga setiap hari.',
    },
    {
      id: 'savings',
      value: 'Rp 2,4 M',
      label: 'Dana Terdistribusi',
      description: 'Akumulasi perputaran simpan pinjam dan bagi hasil SHU bagi anggota.',
    },
  ],
  meta: {
    siteUrl: 'https://koperasimerahputih.id',
    author: 'Pengurus Koperasi Merah Putih',
    themeColor: '#CE1126',
    locale: 'id_ID',
  },
};
