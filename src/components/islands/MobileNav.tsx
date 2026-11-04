import { useState } from "react"
import { Menu, X, ArrowRight, UserPlus, PhoneCall, Clock, MapPin } from "lucide-react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface MobileNavProps {
  whatsappNumber?: string;
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  badge?: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/tujuan", label: "Tujuan Utama", badge: "Pilar" },
  { href: "/gerai", label: "Gerai Usaha", badge: "7 Unit" },
  { href: "/keanggotaan", label: "Keanggotaan & SHU" },
  { href: "/tentang", label: "Tentang Koperasi" },
  { href: "/lokasi", label: "Lokasi & Jam Buka" },
  { href: "/faq", label: "Tanya Jawab (FAQ)" },
];

export function MobileNav({
  className,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);


  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleRegisterClick = () => {
    setIsOpen(false);

    if (typeof window !== "undefined") {
      window.location.href = "/daftar";
    }
  };

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-11 min-h-[44px] min-w-[44px] rounded-lg border border-border/80 bg-background/90 text-ink shadow-xs hover:bg-muted hover:text-brand-red focus-visible:ring-2 focus-visible:ring-brand-red"
              aria-label={isOpen ? "Tutup navigasi mobile" : "Buka navigasi mobile"}
            >
              {isOpen ? (
                <X className="size-6 text-brand-red" />
              ) : (
                <Menu className="size-6 text-ink" />
              )}
            </Button>
          }
        />
        <SheetContent
          side="right"
          className="flex h-full w-[85vw] max-w-sm flex-col justify-between overflow-y-auto bg-surface p-6 shadow-xl"
        >
          <div className="flex flex-col gap-5">
            <SheetHeader className="border-b border-border/70 pb-4 text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-red font-heading text-sm font-bold text-white shadow-xs">
                  KM
                </div>
                <div>
                  <SheetTitle className="font-heading text-base font-bold text-ink">
                    Koperasi Merah Putih
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted">
                    Maju Bersama, Berdaya Mandiri
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <nav className="flex flex-col gap-1" aria-label="Navigasi Menu Mobile">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="group flex min-h-[44px] items-center justify-between rounded-lg px-3.5 py-3 text-sm font-medium text-ink transition-colors hover:bg-brand-red/10 hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[11px] font-semibold text-brand-red">
                        {item.badge}
                      </span>
                    )}
                    <ArrowRight className="size-4 opacity-40 transition-opacity group-hover:opacity-100 group-hover:text-brand-red" />
                  </div>
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-border/70 pt-5">
            <Button
              variant="default"
              size="lg"
              className="min-h-[44px] w-full bg-brand-red text-white hover:bg-brand-red-dark font-semibold shadow-xs"
              onClick={handleRegisterClick}
            >
              <UserPlus className="size-4 shrink-0" />
              <span>Daftar Anggota</span>
            </Button>

            <div className="rounded-xl border border-border/60 bg-background/80 p-3.5 text-xs text-muted">
              <div className="flex items-center gap-2 text-ink font-medium">
                <Clock className="size-3.5 text-brand-red" />
                <span>Buka: 07.30 - 20.00 WIB</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-ink">
                <PhoneCall className="size-3.5 text-brand-red" />
                <span>WA Layanan: 0812-3456-7890</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <MapPin className="size-3.5 text-brand-red" />
                <span>Balai Desa Makmur, Jawa Barat</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
