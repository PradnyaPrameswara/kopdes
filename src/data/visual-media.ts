/** Published documentary photos of named cooperatives. External URLs are temporary: clear reuse rights before release. */
export interface DocumentaryPhoto {
  title: string;
  caption: string;
  image: string;
  alt: string;
  credit: string;
  source: string;
  objectPosition?: string;
}

export const storefrontHero: DocumentaryPhoto = {
  title: 'Gerai Koperasi Merah Putih Bentangan',
  caption: 'KDMP Bentangan, Wonosari, Klaten',
  image: 'https://cdn25.metrotvnews.com/dynamic/content/2025/12/22/kpLCQA9j/t_6949607385203.jpg?w=720',
  alt: 'Bangunan gerai Koperasi Desa Merah Putih Bentangan dengan papan nama merah-putih',
  credit: 'Metro TV News',
  objectPosition: 'center 45%',
  source: 'https://www.metrotvnews.com/read/kpLCQA9j-koperasi-merah-putih-perkuat-tulang-punggung-ekonomi-indonesia',
};

export const cooperativeGallery: DocumentaryPhoto[] = [
  {
    title: 'Gerai Kebutuhan Pokok',
    caption: 'Koperasi Merah Putih Bentangan, Klaten',
    image: 'https://api.kemenpar.go.id/storage/app/resources/image_artikel/FOTO%202%20Koperasi%20Merah%20Putih%20Klaten.jpeg',
    alt: 'Rak beras, minyak, dan produk pangan di dalam gerai Kopdes Bentangan',
    credit: 'Kementerian Pariwisata',
    objectPosition: 'center 52%',
    source: 'https://kemenpar.go.id/berita/siaran-pers-menteri-pariwisata-koperasi-desa-merah-putih-perkuat-pengelolaan-pariwisata',
  },
  {
    title: 'Gerai Sembako & Layanan',
    caption: 'Koperasi Kelurahan Merah Putih Banyuanyar, Surakarta',
    image: 'https://foto.kontan.co.id/P49LsButPA1ah64Ne-PqWXRTQBQ%3D/smart/2025/08/22/1269434997.jpg',
    alt: 'Gerai Koperasi Kelurahan Merah Putih Banyuanyar dengan rak sembako serta papan klinik dan apotek',
    credit: 'Kontan',
    objectPosition: 'center 47%',
    source: 'https://insight.kontan.co.id/news/koperasi-merah-putih-belum-bisa-mengakses-pembiayaan',
  },
  {
    title: 'Bangunan Gerai Desa',
    caption: 'Koperasi Desa Merah Putih Ranjeng, Kabupaten Serang',
    image: 'https://cdn-jpr.jawapos.com/images/22/2026/02/10/image_berita-aa9bfc03-c088-4393-abd2-3fa7ad6d0bb0-1740038381.jpg',
    alt: 'Fasad gerai Koperasi Desa Merah Putih Ranjeng dengan spanduk koperasi',
    credit: 'Bali Express / Jawa Pos',
    objectPosition: 'center center',
    source: 'https://baliexpress.jawapos.com/kolom/677177378/koperasi-desa-merah-putih-jadi-instrumen-strategis-pengentasan-kemiskinan-berkelanjutan',
  },
  {
    title: 'Aktivitas Gerai',
    caption: 'Koperasi Merah Putih Melawai, Jakarta',
    image: 'https://cdn1.katadata.co.id/media/images/2025/10/17/Koperasi_Merah_Putih_Melawai_Foto_KatadataFauza-2025_10_17-14_30_51_13ddca90c056985546a487f8795240b3.jpg',
    alt: 'Petugas sedang menata produk pangan di rak gerai Koperasi Merah Putih Melawai',
    credit: 'Katadata',
    source: 'https://katadata.co.id/foto/68f1f1c18dd5e/foto-koperasi-merah-putih-melawai-hadirkan-sembako-dengan-harga-terjangkau',
  },
];

// Keep the feature image coupled to its real location, publisher and original
// caption. PR #10 places this in the reference-sized central media panel.
export const featuredDocumentary: DocumentaryPhoto = cooperativeGallery[0];
