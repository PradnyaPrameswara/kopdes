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

export const outlets: Outlet[] = [
  {
    id: 'gerai-sembako',
    name: 'Gerai Sembako',
    description: 'Menyediakan kebutuhan pokok harian seperti beras premium, minyak goreng, gula pasir, dan telur dengan harga stabil di bawah pasar eceran.',
    status: 'active',
    icon: 'shopping-bag',
    tag: 'Kebutuhan Pokok',
    operatingHours: 'Setiap Hari: 07:00 - 21:00 WIB',
    highlights: ['Subsidi Anggota', 'Jaminan Pasokan', 'Harga Stabil'],
  },
  {
    id: 'apotek-desa',
    name: 'Apotek Desa',
    description: 'Penyediaan obat-obatan generik resmi, vitamin daya tahan tubuh, dan alat kesehatan dasar berizin edar BPOM untuk seluruh keluarga desa.',
    status: 'active',
    icon: 'pill',
    tag: 'Kesehatan Farmasi',
    operatingHours: 'Senin - Sabtu: 08:00 - 21:00 WIB',
    highlights: ['Apoteker Standby', 'Obat Resep & Bebas', 'Diskon Anggota'],
  },
  {
    id: 'klinik-desa',
    name: 'Klinik Desa',
    description: 'Layanan konsultasi kesehatan pertama, pemeriksaan tensi/gula darah rutin, dan tanggap darurat ringan dengan tenaga medis berpengalaman.',
    status: 'active',
    icon: 'stethoscope',
    tag: 'Layanan Medis',
    operatingHours: 'Siaga 24 Jam (IGD Ringan)',
    highlights: ['Dokter Jaga', 'Fasilitas Cek Darah', 'BPJS Kesehatan Siaga'],
  },
  {
    id: 'cold-storage-gudang',
    name: 'Cold Storage & Gudang',
    description: 'Fasilitas pendingin berkapasitas 50 ton untuk menjaga kesegaran hasil panen hortikultura, daging, dan ikan agar daya jual petani terlindungi.',
    status: 'active',
    icon: 'snowflake',
    tag: 'Rantai Dingin',
    operatingHours: 'Senin - Minggu: 06:00 - 18:00 WIB',
    highlights: ['Kapasitas 50 Ton', 'Suhu -20°C s.d +4°C', 'Mencegah Pembusukan'],
  },
  {
    id: 'logistik-desa',
    name: 'Logistik Desa',
    description: 'Armada distribusi dan antar jemput hasil tani desa ke pasar induk regional serta layanan antar belanja sembako langsung ke rumah warga.',
    status: 'active',
    icon: 'truck',
    tag: 'Distribusi & Antar',
    operatingHours: 'Senin - Sabtu: 06:00 - 17:00 WIB',
    highlights: ['3 Unit Pickup Pendingin', 'Antar Gratis Anggota', 'Koneksi Pasar Induk'],
  },
  {
    id: 'kantor-koperasi',
    name: 'Kantor Koperasi',
    description: 'Pusat pelayanan administrasi keanggotaan, simpanan sukarela/wajib, pembiayaan modal kerja mikro syariah, dan penghitungan SHU tahunan.',
    status: 'active',
    icon: 'building',
    tag: 'Layanan Finansial',
    operatingHours: 'Senin - Jumat: 08:00 - 16:00 WIB',
    highlights: ['Simpan Pinjam Bunga Ringan', 'Konsultasi Finansial', 'Pencairan Cepat'],
  },
  {
    id: 'gerai-pupuk-tani',
    name: 'Gerai Pupuk & Tani',
    description: 'Pusat saprotan resmi penyalur pupuk organik dan NPK subsidi, pestisida ramah lingkungan, benih bersertifikat, dan penyewaan alsintan modern.',
    status: 'coming-soon',
    icon: 'sprout',
    tag: 'Sarana Pertanian',
    operatingHours: 'Segera Hadir Kuartal 3 2026',
    highlights: ['Penyalur Resmi Subsidi', 'Benih Sertifikasi', 'Sewa Traktor Tani'],
  },
];
