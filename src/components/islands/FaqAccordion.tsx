import { useState } from "react"
import { HelpCircle, MessageCircle, Sparkles } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { faqList, type FAQItem } from "@/data/faq"
import { cn } from "@/lib/utils"

export interface FaqAccordionProps {
  items?: FAQItem[];
  whatsappNumber?: string;
  className?: string;
}

type FaqCategory = "semua" | "keanggotaan" | "belanja" | "pertanian" | "shu" | "kesehatan";

interface CategoryFilterItem {
  id: FaqCategory;
  label: string;
}

const CATEGORY_FILTERS: readonly CategoryFilterItem[] = [
  { id: "semua", label: "Semua Pertanyaan" },
  { id: "keanggotaan", label: "Keanggotaan" },
  { id: "belanja", label: "Gerai & Belanja" },
  { id: "pertanian", label: "Hasil Panen" },
  { id: "shu", label: "Bagi Hasil (SHU)" },
  { id: "kesehatan", label: "Klinik Desa" },
] as const;

function getCategoryBadgeLabel(category?: string): string {
  switch (category) {
    case "keanggotaan":
      return "Keanggotaan";
    case "belanja":
      return "Belanja & Gerai";
    case "pertanian":
      return "Hasil Tani";
    case "shu":
      return "SHU & Dividen";
    case "kesehatan":
      return "Klinik & Obat";
    default:
      return "Umum";
  }
}

export function FaqAccordion({
  items = faqList,
  whatsappNumber = "6281234567890",
  className,
}: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("semua");

  const filteredItems =
    activeCategory === "semua"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const initialExpanded = filteredItems.length > 0 ? [filteredItems[0].question] : [];

  const whatsappInquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Pengurus Koperasi Merah Putih, saya ingin menanyakan informasi lebih lanjut seputar layanan koperasi."
  )}`;

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-8", className)}>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Kategori Pertanyaan">
        {CATEGORY_FILTERS.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red",
                isSelected
                  ? "bg-brand-red text-white shadow-xs"
                  : "bg-surface text-ink hover:bg-muted border border-border/80"
              )}
            >
              {cat.id === "semua" && <Sparkles className="mr-1.5 size-3.5" />}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordion Component */}
      <div className="rounded-2xl border border-border/80 bg-background p-2 sm:p-4 shadow-xs">
        <Accordion
          defaultValue={initialExpanded}
          className="w-full divide-y divide-border/60"
        >
          {filteredItems.map((item, index) => {
            const itemValue = item.question;
            const badgeLabel = getCategoryBadgeLabel(item.category);

            return (
              <AccordionItem
                key={itemValue}
                value={itemValue}
                className="border-none py-1 first:pt-0 last:pb-0"
              >
                <AccordionTrigger className="group flex min-h-[44px] w-full items-center justify-between rounded-xl px-4 py-4 text-left font-heading text-sm sm:text-base font-semibold text-ink transition-colors hover:bg-surface hover:text-brand-red hover:no-underline focus-visible:ring-2 focus-visible:ring-brand-red">
                  <div className="flex items-start gap-3 pr-4">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red mt-0.5">
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="leading-snug text-ink group-hover:text-brand-red transition-colors">
                        {item.question}
                      </span>
                      {item.category && (
                        <span className="text-[11px] font-medium text-muted">
                          Kategori: {badgeLabel}
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pt-1 pb-4 text-sm leading-relaxed text-muted">
                  <div className="rounded-xl border border-border/50 bg-surface/60 p-4 pl-5 border-l-4 border-l-brand-red text-ink/90">
                    <p className="leading-relaxed">{item.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-muted">
            <HelpCircle className="mx-auto size-8 text-muted/60 mb-2" />
            <p className="text-sm font-medium">Belum ada pertanyaan pada kategori ini.</p>
          </div>
        )}
      </div>

      {/* WhatsApp Help CTA Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-red/20 bg-linear-to-r from-surface via-background to-surface p-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-heading text-base font-bold text-ink">
            Masih Punya Pertanyaan Lain?
          </h4>
          <p className="text-xs sm:text-sm text-muted">
            Pengurus dan staf pelayanan Koperasi Merah Putih siap membantu Anda setiap hari kerja.
          </p>
        </div>

        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-brand-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red active:scale-[0.99]"
        >
          <MessageCircle className="size-4 shrink-0" />
          <span>Tanya via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default FaqAccordion;
