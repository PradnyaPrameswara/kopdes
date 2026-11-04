export interface FAQItem {
  question: string;
  answer: string;
  category?: 'keanggotaan' | 'belanja' | 'pertanian' | 'shu' | 'kesehatan';
}

export const faqList: FAQItem[] = [
  {
    question: 'Bagaimana cara mendaftar menjadi anggota Koperasi Desa Merah Putih?',
    answer: 'Pendaftaran sangat mudah. Warga desa cukup membawa KTP dan KK asli ke Kantor Koperasi atau mendaftar via WhatsApp pengurus. Anda hanya perlu menyetorkan simpanan pokok (dibayar sekali) sebesar Rp 50.000 dan simpanan wajib Rp 15.000 per bulan yang dapat ditarik kembali bila berhenti.',
    category: 'keanggotaan',
  },
  {
    question: 'Apakah warga non-anggota boleh berbelanja di Gerai Sembako & Apotek Koperasi Merah Putih?',
    answer: 'Boleh sekali! Seluruh gerai dan unit usaha Koperasi Merah Putih terbuka untuk masyarakat umum. Namun, anggota terdaftar berhak mendapatkan potongan harga khusus anggota, poin belanja tahunan, prioritas alokasi barang bersubsidi, dan bagi hasil laba usaha (SHU).',
    category: 'belanja',
  },
  {
    question: 'Bagaimana mekanisme petani menjual hasil panen ke Koperasi Merah Putih & Cold Storage?',
    answer: 'Petani anggota cukup menghubungi tim logistik desa atau membawa hasil panen ke gudang cold storage. Koperasi akan melakukan uji grading kualitas transparan dan membeli dengan harga acuan yang adil tanpa potongan tengkulak. Pembayaran ditransfer langsung atau tunai di hari yang sama.',
    category: 'pertanian',
  },
  {
    question: 'Kapan dan bagaimana pembagian Sisa Hasil Usaha (SHU) dibagikan?',
    answer: 'SHU dihitung dari total keuntungan seluruh unit usaha koperasi dalam satu tahun buku. Pembagian diputuskan pada Rapat Anggota Tahunan (RAT) setiap awal tahun (biasanya Maret). Besaran SHU yang diterima anggota proporsional berdasarkan keaktifan simpanan dan frekuensi transaksi belanja di koperasi.',
    category: 'shu',
  },
  {
    question: 'Layanan kesehatan apa saja yang tersedia di Klinik Desa dan berapa biayanya?',
    answer: 'Klinik Desa melayani pemeriksaan umum oleh dokter, cek tensi darah gratis, cek laboratorium dasar (gula darah, kolesterol, asam urat), dan penanganan pertama darurat ringan 24 jam. Biaya konsultasi sangat terjangkau bagi warga, dan gratis bagi anggota pemegang kartu manfaat desa.',
    category: 'kesehatan',
  },
  {
    question: 'Apakah Koperasi Desa Merah Putih melayani pengiriman sembako ke rumah?',
    answer: 'Ya, armada Logistik Desa siap mengantar pesanan sembako dan kebutuhan pokok langsung ke depan pintu rumah Anda di seluruh pelosok desa. Pesanan dapat dikirimkan melalui layanan pesan WhatsApp koperasi dengan ketentuan gratis ongkir untuk anggota minimal belanja Rp 50.000.',
    category: 'belanja',
  },
];
