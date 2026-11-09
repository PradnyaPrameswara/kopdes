export type OutletStatus = 'active' | 'coming-soon' | 'unavailable';

export interface Outlet {
  id: string;
  name: string;
  description: string;
  status: OutletStatus;
  icon: string;
  tag: string;
  operatingHours?: string;
  highlights?: string[];
}

// Service TYPES, not a directory of verified operating branches.
export const outlets: Outlet[] = [
  { id: 'gerai-sembako', name: 'Gerai Sembako', description: 'Contoh unit penyedia kebutuhan pokok harian. Stok, harga, dan ketersediaannya ditentukan koperasi masing-masing.', status: 'unavailable', icon: 'shopping-bag', tag: 'Pangan' },
  { id: 'apotek-desa', name: 'Apotek Desa', description: 'Contoh layanan farmasi yang memerlukan tenaga dan perizinan sesuai ketentuan. Tidak semua koperasi memilikinya.', status: 'unavailable', icon: 'pill', tag: 'Kesehatan' },
  { id: 'klinik-desa', name: 'Klinik Desa', description: 'Contoh layanan kesehatan yang bergantung pada fasilitas, izin, dan tenaga medis setempat.', status: 'unavailable', icon: 'stethoscope', tag: 'Kesehatan' },
  { id: 'cold-storage-gudang', name: 'Gudang & Penyimpanan', description: 'Potensi fasilitas penyimpanan hasil usaha atau pertanian sesuai kebutuhan wilayah dan kemampuan pengelola.', status: 'unavailable', icon: 'snowflake', tag: 'Distribusi' },
  { id: 'logistik-desa', name: 'Logistik Desa', description: 'Contoh dukungan pengangkutan dan distribusi barang, jika tersedia pada koperasi setempat.', status: 'unavailable', icon: 'truck', tag: 'Distribusi' },
  { id: 'kantor-koperasi', name: 'Administrasi Keanggotaan', description: 'Pengelolaan keanggotaan, simpanan, dan informasi rapat anggota mengikuti aturan koperasi masing-masing.', status: 'unavailable', icon: 'building', tag: 'Keanggotaan' },
  { id: 'gerai-pupuk-tani', name: 'Sarana Pertanian', description: 'Contoh gerai benih dan sarana produksi pertanian; penyaluran barang bersubsidi membutuhkan penetapan resmi.', status: 'unavailable', icon: 'sprout', tag: 'Pertanian' },
];
