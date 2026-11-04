import { useState } from "react"
import { MessageCircle, ShoppingBag, Wheat, HeartPulse, Sparkles, CheckCircle2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products, type Product, type ProductCategory } from "@/data/products"
import { cn } from "@/lib/utils"

export type CategoryFilter = "semua" | ProductCategory;

export interface ProductShowcaseProps {
  whatsappNumber?: string;
  className?: string;
  initialCategory?: CategoryFilter;
}

interface CategoryOption {
  value: CategoryFilter;
  label: string;
  icon: typeof ShoppingBag;
}

const CATEGORIES: readonly CategoryOption[] = [
  { value: "semua", label: "Semua Produk", icon: Sparkles },
  { value: "sembako", label: "Sembako Murah", icon: ShoppingBag },
  { value: "kesehatan", label: "Apotek & Obat", icon: HeartPulse },
  { value: "pertanian", label: "Sarana Pertanian", icon: Wheat },
] as const;

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getCategoryIcon(cat: ProductCategory) {
  switch (cat) {
    case "sembako":
      return <ShoppingBag className="size-10 text-brand-red/60" />;
    case "kesehatan":
      return <HeartPulse className="size-10 text-emerald-600/60" />;
    case "pertanian":
      return <Wheat className="size-10 text-amber-600/60" />;
    default:
      return <ShoppingBag className="size-10 text-muted/60" />;
  }
}

export function ProductShowcase({
  whatsappNumber = "6281234567890",
  className,
  initialCategory = "semua",
}: ProductShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(initialCategory);

  const getFilteredProducts = (category: CategoryFilter): Product[] => {
    if (category === "semua") {
      return products;
    }

    return products.filter((p) => p.category === category);
  };

  const isCategoryFilter = (val: string): val is CategoryFilter => {
    return val === "semua" || val === "sembako" || val === "kesehatan" || val === "pertanian";
  };

  const handleValueChange = (val: string) => {
    if (isCategoryFilter(val)) {
      setSelectedCategory(val);
    }
  };

  return (
    <section className={cn("w-full py-2", className)} aria-label="Katalog Produk Koperasi">
      <Tabs
        value={selectedCategory}
        onValueChange={handleValueChange}
        className="w-full flex flex-col gap-8"
      >
        <div className="flex justify-center overflow-x-auto pb-2 scrollbar-none">
          <TabsList className="inline-flex h-auto flex-wrap items-center justify-center gap-2 rounded-2xl bg-muted/80 p-1.5 shadow-xs">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;

              const count =
                cat.value === "semua"
                  ? products.length
                  : products.filter((p) => p.category === cat.value).length;

              return (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all data-active:bg-brand-red data-active:text-white data-active:shadow-sm"
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{cat.label}</span>
                  <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs">
                    {count}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {CATEGORIES.map((cat) => {
          const filtered = getFilteredProducts(cat.value);

          return (
            <TabsContent key={cat.value} value={cat.value} className="outline-none">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => {
                  const messageText = `Halo Pengurus Koperasi Merah Putih, saya ingin pesan ${product.name}`;

                  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    messageText
                  )}`;

                  return (
                    <Card
                      key={product.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-md"
                    >
                      {/* Product Header / Visual Preview */}
                      <div>
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-b from-surface to-muted/40 p-6 flex flex-col items-center justify-center border-b border-border/60">
                          <div className="flex flex-col items-center justify-center gap-2 text-center transition-transform duration-200 group-hover:scale-105">
                            {getCategoryIcon(product.category)}
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                              {product.origin || `Produk Desa Makmur`}
                            </span>
                          </div>

                          {/* Promotional or Status Badge */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                            {product.badge && (
                              <Badge
                                variant="default"
                                className="bg-brand-red px-2.5 py-1 text-[11px] font-bold text-white shadow-xs"
                              >
                                {product.badge}
                              </Badge>
                            )}
                          </div>

                          {/* Stock status indicator */}
                          <div className="absolute top-3 right-3">
                            {product.inStock ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/30">
                                <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                Stok Siap
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 ring-1 ring-zinc-500/20">
                                <span className="size-1.5 rounded-full bg-zinc-400" />
                                Habis
                              </span>
                            )}
                          </div>
                        </div>

                        <CardHeader className="space-y-1 px-5 pt-4 pb-2">
                          <CardTitle className="line-clamp-1 font-heading text-base font-bold text-ink group-hover:text-brand-red transition-colors">
                            {product.name}
                          </CardTitle>
                          {product.description && (
                            <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted">
                              {product.description}
                            </CardDescription>
                          )}
                        </CardHeader>

                        <CardContent className="px-5 pt-0 pb-3">
                          <div className="flex items-baseline gap-1.5 pt-1">
                            <span className="font-heading text-xl font-bold tracking-tight text-brand-red">
                              {formatRupiah(product.price)}
                            </span>
                            <span className="text-xs font-medium text-muted">
                              / {product.unit}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
                            <CheckCircle2 className="size-3.5 text-brand-red shrink-0" />
                            <span>Harga resmi & subsidi anggota terdaftar</span>
                          </div>
                        </CardContent>
                      </div>

                      <CardFooter className="border-t border-border/60 bg-surface/50 p-4">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-brand-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 active:scale-[0.99]"
                          aria-label={`Pesan ${product.name} via WhatsApp`}
                        >
                          <MessageCircle className="size-4 shrink-0" />
                          <span>Pesan via WhatsApp</span>
                        </a>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}

export default ProductShowcase;
