export interface FAQItem {
  question: string;
  answer: string;
  category?: 'keanggotaan' | 'belanja' | 'pertanian' | 'shu' | 'kesehatan';
}

export const faqList: FAQItem[] = [
  {
    question: 'Bagaimana cara mengetahui persyaratan menjadi anggota?',
    answer: 'Hubungi pengurus koperasi di desa atau kelurahan terkait melalui kanal yang telah diverifikasi. Syarat domisili, dokumen, simpanan, dan tahapan pendaftaran mengikuti anggaran dasar serta kebijakan koperasi masing-masing. Website konsep ini tidak menerima data KTP atau NIK.',
    category: 'keanggotaan',
  },
  {
    question: 'Apakah semua gerai Koperasi Merah Putih sudah beroperasi?',
    answer: 'Tidak dapat disimpulkan dari situs ini. Jenis unit usaha yang ditampilkan merupakan contoh model layanan program. Pastikan alamat, status beroperasi, produk dan jam buka langsung kepada koperasi yang bersangkutan.',
    category: 'belanja',
  },
  {
    question: 'Apakah koperasi dapat membantu pemasaran hasil panen?',
    answer: 'Pemasaran hasil pertanian dapat menjadi salah satu bidang usaha koperasi sesuai keputusan anggota dan kemampuan operasional setempat. Mekanisme pembelian, standar mutu, jadwal, dan harga harus disepakati secara resmi; tidak ada jaminan pembelian pada situs ini.',
    category: 'pertanian',
  },
  {
    question: 'Bagaimana mekanisme Sisa Hasil Usaha (SHU)?',
    answer: 'Perhitungan dan pembagian SHU mengikuti aturan perkoperasian serta keputusan rapat anggota, berdasarkan kondisi usaha dan ketentuan koperasi. Situs ini tidak menetapkan jumlah, tanggal pencairan, atau imbal hasil.',
    category: 'shu',
  },
  {
    question: 'Apakah semua koperasi memiliki apotek atau klinik 24 jam?',
    answer: 'Tidak. Layanan kesehatan hanya tersedia di lokasi yang benar-benar menyediakan fasilitas, izin, dan tenaga sesuai ketentuan. Untuk kondisi darurat, gunakan fasilitas layanan kesehatan resmi di wilayah Anda.',
    category: 'kesehatan',
  },
  {
    question: 'Di mana menemukan informasi resmi program?',
    answer: 'Untuk regulasi pembentukan, periksa JDIH Kementerian Koperasi. Untuk informasi layanan sistem koperasi, kunjungi simkopdes.go.id. Verifikasi kontak pengurus melalui pemerintah desa atau kelurahan masing-masing.',
    category: 'keanggotaan',
  },
];
