/** Real gerai photographs from Wikimedia Commons with documented reuse licenses.
 *  Locations are source locations, not verified branches of this website.
 */
export interface DocumentaryPhoto {
  title: string;
  caption: string;
  image: string;
  sourceImage: string;
  alt: string;
  credit: string;
  source: string;
  author: string;
  license: string;
  licenseUrl: string;
  objectPosition?: string;
}

export const storefrontHero: DocumentaryPhoto = {
  title: 'Koperasi Desa Merah Putih Bentangan',
  caption: 'Bangunan Koperasi Desa Merah Putih Bentangan, Wonosari, Klaten',
  image: '/images/documentary/bentangan.webp',
  sourceImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Kopdes_Merah_Putih_Bentangan_Klaten.jpg/1280px-Kopdes_Merah_Putih_Bentangan_Klaten.jpg',
  alt: 'Foto bangunan Koperasi Desa Merah Putih Bentangan di Klaten dengan papan nama merah putih dan deretan pintu gerai',
  credit: 'BiographyWriter45 / Wikimedia Commons',
  author: 'BiographyWriter45',
  license: 'CC0 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  source: 'https://commons.wikimedia.org/wiki/File:Kopdes_Merah_Putih_Bentangan_Klaten.jpg',
  objectPosition: 'center 43%',
};

export const cooperativeGallery: DocumentaryPhoto[] = [
  {
    title: 'Koperasi Desa Watualang',
    caption: 'Bangunan Koperasi Desa Merah Putih Watualang',
    image: '/images/documentary/watualang.webp',
    sourceImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Koperasi_Desa_Merah_Putih_Watualang.jpg/1280px-Koperasi_Desa_Merah_Putih_Watualang.jpg',
    alt: 'Fasad Koperasi Merah Putih Watualang dengan pintu merah dan identitas koperasi di dinding kanan',
    credit: 'YT Arty / Wikimedia Commons',
    author: 'YT Arty',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Koperasi_Desa_Merah_Putih_Watualang.jpg',
    objectPosition: 'center 47%',
  },
  {
    title: 'Koperasi Merah Putih Mandirancan',
    caption: 'Bangunan Koperasi Merah Putih Desa Mandirancan, Kebasen, Banyumas',
    image: '/images/documentary/mandirancan.webp',
    sourceImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Koperasi_Merah_Putih_Desa_Mandirancan_Kebasen_Banyumas.jpg/1280px-Koperasi_Merah_Putih_Desa_Mandirancan_Kebasen_Banyumas.jpg',
    alt: 'Bangunan gerai koperasi di Mandirancan, Banyumas, dengan deretan pintu dan halaman terbuka',
    credit: 'TyoAriSetiadi / Wikimedia Commons',
    author: 'TyoAriSetiadi',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Koperasi_Merah_Putih_Desa_Mandirancan_Kebasen_Banyumas.jpg',
    objectPosition: 'center 56%',
  },
  {
    title: 'Koperasi Desa Tambakboyo',
    caption: 'Bangunan Koperasi Desa Merah Putih Tambakboyo, Pedan, Klaten',
    image: '/images/documentary/tambakboyo.webp',
    sourceImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Koperasi_Desa_Merah_Putih_Tambakboyo%2C_Pedan%2C_Klaten_%28difoto_sore_25_Oktober_2026%29.jpg/1280px-Koperasi_Desa_Merah_Putih_Tambakboyo%2C_Pedan%2C_Klaten_%28difoto_sore_25_Oktober_2026%29.jpg',
    alt: 'Foto bangunan Koperasi Merah Putih Tambakboyo di Pedan dengan papan nama pada fasad',
    credit: 'Dani Safa Adi Nugraha / Wikimedia Commons',
    author: 'Dani Safa Adi Nugraha',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Koperasi_Desa_Merah_Putih_Tambakboyo,_Pedan,_Klaten_(difoto_sore_25_Oktober_2026).jpg',
    objectPosition: 'center 47%',
  },
  {
    title: 'Koperasi Desa Kwarasan',
    caption: 'Bangunan Koperasi Desa Merah Putih Kwarasan, Juwiring, Klaten',
    image: '/images/documentary/kwarasan.webp',
    sourceImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Koperasi_Desa_Merah_Putih_Kwarasan%2C_Juwiring%2C_Klaten_%28difoto_jam_17.01_tanggal_31_Oktober_2026%29.jpg/1280px-Koperasi_Desa_Merah_Putih_Kwarasan%2C_Juwiring%2C_Klaten_%28difoto_jam_17.01_tanggal_31_Oktober_2026%29.jpg',
    alt: 'Bangunan Koperasi Desa Merah Putih Kwarasan di tengah area pertanian dengan langit sore',
    credit: 'Dani Safa Adi Nugraha / Wikimedia Commons',
    author: 'Dani Safa Adi Nugraha',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Koperasi_Desa_Merah_Putih_Kwarasan,_Juwiring,_Klaten_(difoto_jam_17.01_tanggal_31_Oktober_2026).jpg',
    objectPosition: 'center 51%',
  },
];

export const featuredDocumentary: DocumentaryPhoto = cooperativeGallery[0];

/** Browsers download a smaller self-hosted rendition on narrow screens. */
export function documentarySrcSet(image: string): string {
  return `${image.replace(/\.webp$/, '-640.webp')} 640w, ${image} 1280w`;
}
