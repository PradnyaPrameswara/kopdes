export type ProductCategory = 'sembako' | 'kesehatan' | 'pertanian';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  badge?: string;
  inStock: boolean;
  image: string;
  description?: string;
  origin?: string;
}

export const products: Product[] = [
  {
    id: 'beras-merah-putih-5kg',
    name: 'Beras Merah Putih 5kg',
    category: 'sembako',
    price: 68000,
    unit: 'karung (5 kg)',
    badge: 'Terlaris',
    inStock: true,
    image: '/images/products/beras-5kg.webp',
    description: 'Beras premium hasil panen petani binaan desa dengan bulir utuh, pulen alami tanpa pemutih kimiawi.',
    origin: 'Lumbung Tani Desa Makmur',
  },
  {
    id: 'minyak-goreng-kita-2l',
    name: 'Minyak Goreng Kita 2L',
    category: 'sembako',
    price: 31000,
    unit: 'pouch (2 Liter)',
    badge: 'Harga Subsidi',
    inStock: true,
    image: '/images/products/minyak-2l.webp',
    description: 'Minyak goreng kelapa sawit higienis jernih, difortifikasi Vitamin A untuk olahan makanan sehat keluarga.',
    origin: 'Kemitraan Distribusi BUMN Pangan',
  },
  {
    id: 'gula-pasir-1kg',
    name: 'Gula Pasir Kristal Putih 1kg',
    category: 'sembako',
    price: 16500,
    unit: 'kemasan (1 kg)',
    badge: 'Promo',
    inStock: true,
    image: '/images/products/gula-1kg.webp',
    description: 'Gula tebu murni kristal putih manis alami bersertifikat SNI dan halal MUI.',
    origin: 'Pabrik Gula Koperasi',
  },
  {
    id: 'telur-ayam-1kg',
    name: 'Telur Ayam Negeri Segar 1kg',
    category: 'sembako',
    price: 27000,
    unit: 'kg (~16 butir)',
    badge: 'Fresh Tiap Pagi',
    inStock: true,
    image: '/images/products/telur-1kg.webp',
    description: 'Telur ayam ras segar dipanen langsung dari peternak kandang binaan desa setiap subuh.',
    origin: 'Peternakan Rakyat Binaan',
  },
  {
    id: 'gas-lpg-3kg',
    name: 'Gas LPG 3kg Melon (Isi Ulang)',
    category: 'sembako',
    price: 19000,
    unit: 'tabung (tukar kosong)',
    badge: 'Pangkalan Resmi',
    inStock: true,
    image: '/images/products/gas-3kg.webp',
    description: 'Penyaluran resmi pangkalan LPG 3kg bersubsidi untuk warga desa terdata dengan jaminan isi pas.',
    origin: 'Sub-Penyalur Pertamina Koperasi Merah Putih',
  },
  {
    id: 'pupuk-npk-5kg',
    name: 'Pupuk NPK Phonska Plus 5kg',
    category: 'pertanian',
    price: 45000,
    unit: 'zak (5 kg)',
    badge: 'Tani Unggul',
    inStock: true,
    image: '/images/products/pupuk-npk.webp',
    description: 'Formula seimbang Nitrogen, Fosfat, Kalium plus Zink untuk percepatan masa tanam padi dan sayuran.',
    origin: 'Gerai Saprotan Koperasi',
  },
  {
    id: 'bibit-padi-unggul',
    name: 'Bibit Padi Inpari 32 Unggul 5kg',
    category: 'pertanian',
    price: 65000,
    unit: 'kantong (5 kg)',
    badge: 'Sertifikasi BPSB',
    inStock: true,
    image: '/images/products/bibit-padi.webp',
    description: 'Benih padi varietas Inpari 32 berlabel biru dengan daya kecambah >85% tahan terhadap serangan wereng.',
    origin: 'Kelompok Penangkar Benih Desa',
  },
  {
    id: 'vitamin-obat-bebas',
    name: 'Paket Vitamin C 500mg & Multivitamin',
    category: 'kesehatan',
    price: 22000,
    unit: 'strip (10 kaplet)',
    badge: 'Apotek Resmi',
    inStock: true,
    image: '/images/products/vitamin-c.webp',
    description: 'Suplemen imun tubuh harian untuk pekerja kebun dan keluarga dengan vitamin C dosis terukur aman lambung.',
    origin: 'Apotek Desa Merah Putih',
  },
  {
    id: 'minyak-kayu-putih',
    name: 'Minyak Kayu Putih Murni 60ml',
    category: 'kesehatan',
    price: 24500,
    unit: 'botol (60 ml)',
    badge: 'Alami',
    inStock: true,
    image: '/images/products/kayu-putih.webp',
    description: 'Minyak kayu putih asli penyulingan daun alami untuk meredakan masuk angin dan gatal gigitan serangga.',
    origin: 'Distribusi Farmasi Desa',
  },
];
