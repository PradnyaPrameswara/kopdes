import { useState } from "react"
import {
  Store,
  HeartPulse,
  Snowflake,
  Wheat,
  Users,
  Truck,
  ShoppingBag,
  Sparkles,
  MapPin,
  Calendar,
  ZoomIn,
  CheckCircle2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  location: string;
  schedule: string;
  badge: string;
  icon: "store" | "heart" | "snowflake" | "wheat" | "users" | "truck" | "bag" | "sparkles";
  gradient: string;
  image?: string;
}

const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: "gerai-sembako",
    title: "Gerai Sembako Murah Warga",
    category: "Distribusi Pangan",
    description: "Penyaluran beras stabilisasi pangan, minyak goreng, dan gula pasir langsung ke warga desa dengan harga subsidi resmi.",
    details: "Dilengkapi sistem kasir digital terpadu dan timbangan bersertifikasi metrologi desa untuk transparansi transaksi belanja seluruh warga.",
    location: "Kompleks Balai Desa Unit 1",
    schedule: "Setiap Hari (07.30 - 20.00 WIB)",
    badge: "Unit Utama",
    icon: "store",
    gradient: "from-red-600/90 to-brand-red",
    image: "/images/photos/gerai-sembako.jpg",
  },
  {
    id: "klinik-desa",
    title: "Apotek & Klinik Desa Sehat",
    category: "Layanan Kesehatan",
    description: "Pemeriksaan tensi darah gratis, konsultasi dokter berkala, dan penyediaan obat generik berizin BPOM untuk keluarga desa.",
    details: "Menyediakan pemeriksaan gula darah, kolesterol, asam urat, serta penanganan pertolongan pertama 24 jam bagi warga lansia dan anak.",
    location: "Gedung Sehat Desa No. 12",
    schedule: "Senin - Sabtu (08.00 - 21.00 WIB)",
    badge: "Layanan Medis",
    icon: "heart",
    gradient: "from-emerald-700 to-teal-800",
    image: "/images/photos/apotek-klinik-desa.jpg",
  },
  {
    id: "cold-storage",
    title: "Fasilitas Cold Storage & Gudang",
    category: "Pasca-Panen",
    description: "Ruang pendingin berkapasitas 50 ton untuk menjaga kesegaran cabai, bawang merah, dan sayuran petani desa dari kebusukan.",
    details: "Menggunakan pengatur suhu presisi dan sistem rak higienis yang mengurangi susut panen petani lokal hingga lebih dari 80%.",
    location: "Sentra Agribisnis Dusun Timur",
    schedule: "Operasional Gudang 24 Jam",
    badge: "Teknologi Tani",
    icon: "snowflake",
    gradient: "from-blue-700 to-cyan-800",
    image: "/images/photos/cold-storage.jpg",
  },
  {
    id: "pupuk-tani",
    title: "Sentra Pupuk & Sarana Produksi",
    category: "Kemitraan Tani",
    description: "Penyaluran pupuk NPK bersubsidi tepat sasaran dan benih padi varietas unggul bagi 12 kelompok tani binaan koperasi.",
    details: "Didampingi petugas penyuluh pertanian lapangan (PPL) yang memberikan bimbingan pemupukan berimbang untuk memangkas biaya tanam.",
    location: "Gudang Logistik Pertanian",
    schedule: "Senin - Jumat (08.00 - 16.00 WIB)",
    badge: "Subsidi Pupuk",
    icon: "wheat",
    gradient: "from-amber-600 to-yellow-700",
    image: "/images/photos/hero-toko-kopdes.jpg",
  },
  {
    id: "rat-tahunan",
    title: "Rapat Anggota Tahunan (RAT)",
    category: "Tata Kelola Transparan",
    description: "Musyawarah pertanggungjawaban pengelolaan dana koperasi dan pembagian Sisa Hasil Usaha (SHU) secara adil bagi setiap anggota.",
    details: "Diikuti lebih dari 1.200 anggota dengan audit keuangan independen serta pembagian dividen belanja langsung secara tunai.",
    location: "Aula Serbaguna Merah Putih",
    schedule: "Tahun Buku 2025/2026",
    badge: "Transparansi",
    icon: "users",
    gradient: "from-rose-700 to-red-900",
    image: "/images/photos/petani-panen.jpg",
  },
  {
    id: "logistik-desa",
    title: "Armada Logistik Desa Merah Putih",
    category: "Transportasi & Antar",
    description: "Armada roda tiga dan minibus khusus yang mengantar sembako dan kebutuhan harian warga ke pelosok dusun secara gratis.",
    details: "Melayani pesanan online via WhatsApp dengan jangkauan antar hingga 15 km, menjamin pasokan sembako merata di seluruh RW.",
    location: "Pool Kendaraan Sentral Koperasi Merah Putih",
    schedule: "Pengantaran: 08.30 - 17.00 WIB",
    badge: "Gratis Ongkir",
    icon: "truck",
    gradient: "from-indigo-700 to-slate-800",
    image: "/images/photos/logistik-desa.jpg",
  },
  {
    id: "bazaar-umkm",
    title: "Bazaar Produk UMKM & Kerajinan",
    category: "Pemberdayaan Warga",
    description: "Etalase pemasaran makanan olahan tradisional, madu hutan murni, dan anyaman bambu karya kelompok wanita tani (KWT).",
    details: "Seluruh produk difasilitasi uji kelayakan pangan P-IRT dan sertifikasi halal gratis untuk menembus pasar ritel modern.",
    location: "Pelataran Gerai Utama Koperasi Merah Putih",
    schedule: "Setiap Minggu Pagi (06.30 - 11.00 WIB)",
    badge: "Karya Desa",
    icon: "bag",
    gradient: "from-orange-600 to-red-700",
    image: "/images/photos/gerai-sembako.jpg",
  },
  {
    id: "panen-raya",
    title: "Serapan Panen Raya Gabah Petani",
    category: "Kedaulatan Pangan",
    description: "Pembelian gabah langsung di pematang sawah dengan harga acuan pemerintah (HAP), tanpa potongan tengkulak berbelit.",
    details: "Telah menyerap lebih dari 120 ton gabah basah yang diproses menjadi Beras Merah Putih kemasan 5 kg untuk pasokan desa.",
    location: "Hamparan Sawah Blok C",
    schedule: "Musim Panen Raya",
    badge: "Harga Adil",
    icon: "sparkles",
    gradient: "from-emerald-800 to-green-900",
    image: "/images/photos/petani-panen.jpg",
  },
] as const;

function renderItemIcon(icon: GalleryItem["icon"]) {
  switch (icon) {
    case "store":
      return <Store className="size-8" />;
    case "heart":
      return <HeartPulse className="size-8" />;
    case "snowflake":
      return <Snowflake className="size-8" />;
    case "wheat":
      return <Wheat className="size-8" />;
    case "users":
      return <Users className="size-8" />;
    case "truck":
      return <Truck className="size-8" />;
    case "bag":
      return <ShoppingBag className="size-8" />;
    case "sparkles":
      return <Sparkles className="size-8" />;
    default:
      return <Store className="size-8" />;
  }
}

export interface GalleryLightboxProps {
  className?: string;
}

export function GalleryLightbox({ className }: GalleryLightboxProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const handleOpenDialog = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  return (
    <section className={cn("w-full py-4", className)} aria-label="Galeri Kegiatan dan Unit Usaha">
      {/* Grid of gallery cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GALLERY_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleOpenDialog(item)}
            className="group relative flex min-h-[44px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-background text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            aria-label={`Buka rincian ${item.title}`}
          >
            {/* Visual Thumbnail */}
            {/* Visual Thumbnail with Photo */}
            <div
              className={cn(
                "relative aspect-16/10 w-full overflow-hidden bg-linear-to-br p-6 text-white flex flex-col justify-between",
                item.gradient
              )}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />

              <div className="relative z-10 flex items-center justify-between">
                <Badge className="bg-white/20 text-white backdrop-blur-xs font-semibold text-[11px] border-white/20">
                  {item.badge}
                </Badge>
                <div className="flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-xs transition-transform duration-200 group-hover:scale-110">
                  <ZoomIn className="size-4 text-white" />
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white">
                  {renderItemIcon(item.icon)}
                </div>
                <div>
                  <span className="text-[11px] font-medium tracking-wide uppercase text-white/80 block">
                    {item.category}
                  </span>
                  <p className="font-heading text-sm font-bold text-white line-clamp-1">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Content Summary */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <p className="line-clamp-2 text-xs leading-relaxed text-muted">
                {item.description}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted">
                <span className="flex items-center gap-1.5 font-medium text-ink">
                  <MapPin className="size-3 text-brand-red shrink-0" />
                  <span className="line-clamp-1">{item.location}</span>
                </span>
                <span className="font-semibold text-brand-red group-hover:underline shrink-0">
                  Lihat Detail →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedItem !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog();
          }
        }}
      >
        <DialogContent className="max-w-xl overflow-hidden p-0 sm:max-w-2xl rounded-2xl">
          {selectedItem && (
            <div className="flex flex-col">
              {/* Enlarge preview visual header with Photo */}
              <div
                className={cn(
                  "relative flex min-h-[220px] sm:min-h-[260px] flex-col justify-end p-6 sm:p-8 text-white bg-linear-to-br overflow-hidden",
                  selectedItem.gradient
                )}
              >
                {selectedItem.image && (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-xs border-white/20 text-xs font-semibold">
                    {selectedItem.category}
                  </Badge>
                  <span className="text-xs font-medium bg-black/40 px-3 py-1 rounded-full text-white/90 backdrop-blur-xs">
                    {selectedItem.badge}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xs text-white shadow-xs">
                    {renderItemIcon(selectedItem.icon)}
                  </div>
                  <div>
                    <DialogTitle className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                      {selectedItem.title}
                    </DialogTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/90">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {selectedItem.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {selectedItem.schedule}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dialog Body */}
              <div className="flex flex-col gap-4 p-6 sm:p-8 bg-background">
                <DialogDescription className="text-sm leading-relaxed text-ink font-medium">
                  {selectedItem.description}
                </DialogDescription>

                <div className="rounded-xl border border-border/80 bg-surface p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-red flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="size-4 text-brand-red" />
                    Manfaat Nyata untuk Warga Desa
                  </h4>
                  <p className="text-xs leading-relaxed text-muted">
                    {selectedItem.details}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-muted">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <span className="block font-semibold text-ink">Akses Layanan</span>
                    <span>Terbuka untuk seluruh warga desa & anggota koperasi.</span>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <span className="block font-semibold text-ink">Standar Kualitas</span>
                    <span>Transparan, tertib audit, dan berorientasi kesejahteraan.</span>
                  </div>
                </div>

                <DialogFooter className="mt-4 flex flex-row justify-end gap-3 border-t border-border/60 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-[44px] px-6 text-sm font-semibold"
                    onClick={handleCloseDialog}
                  >
                    Tutup
                  </Button>
                </DialogFooter>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default GalleryLightbox;
