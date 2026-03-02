import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  X,
  DollarSign,
  AlertTriangle,
  Info,
} from "lucide-react";
import OptionCard from "./OptionCard";
import ArtworkRightsCheckbox from "./ArtworkRightsCheckbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// ── Pricing ────────────────────────────────────────────
const MIN_QTY = 12;
const SCREEN_PRINT_MIN_QTY = 72;

// Brand tier structure used by all tiered garments
interface BrandTier {
  value: string;
  label: string;
  desc: string;
  priceLow: number;
  priceHigh: number;
}

// Per-garment tier definitions (all-in per-piece prices including decoration for polos)
// Quantity-tiered pricing for t-shirts (all-in per piece: garment + decoration)
interface QtyTierPrice {
  minQty: number;
  maxQty: number | null;
  priceLow: number;
  priceHigh: number;
}

const TSHIRT_QTY_TIERS: Record<string, QtyTierPrice[]> = {
  budget: [
    { minQty: 144, maxQty: null, priceLow: 9, priceHigh: 13 },
    { minQty: 72, maxQty: 143, priceLow: 12, priceHigh: 16 },
    { minQty: 24, maxQty: 71, priceLow: 15, priceHigh: 19 },
    { minQty: 12, maxQty: 23, priceLow: 18, priceHigh: 22 },
  ],
  "mid-range": [
    { minQty: 144, maxQty: null, priceLow: 13, priceHigh: 18 },
    { minQty: 72, maxQty: 143, priceLow: 16, priceHigh: 22 },
    { minQty: 24, maxQty: 71, priceLow: 19, priceHigh: 25 },
    { minQty: 12, maxQty: 23, priceLow: 22, priceHigh: 28 },
  ],
  premium: [
    { minQty: 144, maxQty: null, priceLow: 18, priceHigh: 24 },
    { minQty: 72, maxQty: 143, priceLow: 22, priceHigh: 28 },
    { minQty: 24, maxQty: 71, priceLow: 25, priceHigh: 32 },
    { minQty: 12, maxQty: 23, priceLow: 28, priceHigh: 35 },
  ],
};

function getTshirtPrice(brandTier: string, qty: number): { low: number; high: number } | null {
  const tiers = TSHIRT_QTY_TIERS[brandTier];
  if (!tiers) return null;
  for (const tier of tiers) {
    if (qty >= tier.minQty) return { low: tier.priceLow, high: tier.priceHigh };
  }
  return null;
}

// Brand tier labels for t-shirt selection cards (prices shown dynamically)
const TSHIRT_BRAND_TIERS: BrandTier[] = [
  { value: "budget", label: "Budget", desc: "Gildan G5000, Jerzees 29M — everyday basics.", priceLow: 9, priceHigh: 22 },
  { value: "mid-range", label: "Mid-Range", desc: "Next Level 6210, Bella Canvas 3001 — softer, modern fit.", priceLow: 13, priceHigh: 28 },
  { value: "premium", label: "Premium", desc: "Next Level 6010, District Perfect Tri, Comfort Colors — premium feel.", priceLow: 18, priceHigh: 35 },
];

const GARMENT_TIERS: Record<string, BrandTier[]> = {
  tshirt: TSHIRT_BRAND_TIERS,
  hoodie: [
    { value: "budget", label: "Budget", desc: "Gildan, Jerzees — reliable, affordable.", priceLow: 28, priceHigh: 34 },
    { value: "mid-range", label: "Mid-Range", desc: "Bella Canvas, Next Level — softer, modern cut.", priceLow: 35, priceHigh: 38 },
    { value: "premium", label: "Premium", desc: "Comfort Colors, Independent Trading — heavyweight, premium.", priceLow: 39, priceHigh: 48 },
  ],
  polo: [
    { value: "standard", label: "Standard", desc: "Port Authority, Sport-Tek — reliable, moisture-wicking polos.", priceLow: 33, priceHigh: 52 },
    { value: "premium", label: "Premium", desc: "Nike Dri-FIT — top-tier brand recognition & performance.", priceLow: 90, priceHigh: 99 },
  ],
  jacket: [
    { value: "budget", label: "Budget", desc: "Port Authority, Harriton — solid workwear staples.", priceLow: 45, priceHigh: 65 },
    { value: "mid-range", label: "Mid-Range", desc: "Eddie Bauer, The North Face — modern, professional.", priceLow: 65, priceHigh: 85 },
    { value: "premium", label: "Premium", desc: "Patagonia, Arc'teryx — top-tier outdoor brands.", priceLow: 85, priceHigh: 125 },
  ],
};

// Garments that use tier selection
const TIERED_GARMENTS = new Set(Object.keys(GARMENT_TIERS));

// Fallback base costs for non-tiered garments
const GARMENT_BASE_COSTS: Record<string, number> = {
  safety: 15,
  "not-sure": 10,
};

const GARMENT_MARKUP = 2; // 200% = cost × 2

// Quantity discount tiers — 8% off at each break, cumulative
const QTY_DISCOUNT_BREAKS = [24, 36, 48, 72];
function getQtyDiscount(qty: number): number {
  let discount = 0;
  for (const brk of QTY_DISCOUNT_BREAKS) {
    if (qty >= brk) discount += 0.08;
  }
  return discount; // e.g. 0.08, 0.16, 0.24, 0.32
}

// DTF decoration per piece (left chest 4×4 + back 11×14)
const DTF_TIERS = [
  { min: 100, price: 6.0 },
  { min: 50, price: 7.1 },
  { min: 15, price: 8.2 },
  { min: 1, price: 9.5 },
];

// Embroidery per piece (1 location, range)
const EMBROIDERY_RANGE = { low: 12, high: 15 };
const EMBROIDERY_DIGITIZING_FEE = 45;

// Screen print per piece (2-color front + 2-color back)
const SCREEN_PRINT_TIERS = [
  { min: 144, price: 3.0 },
  { min: 72, price: 5.64 },
];

// Screen print location options
const SCREEN_PRINT_LOCATIONS = [
  "Front",
  "Full Back",
  "Upper Back",
  "Left Chest",
  "Right Chest",
  "Left Sleeve",
  "Right Sleeve",
];

// Embroidery location options (up to 5)
const EMBROIDERY_LOCATIONS = [
  "Left Chest",
  "Right Chest",
  "Left Sleeve",
  "Right Sleeve",
  "Back Neck",
  "Full Back",
];

function getDtfPrice(qty: number): number {
  for (const tier of DTF_TIERS) {
    if (qty >= tier.min) return tier.price;
  }
  return DTF_TIERS[DTF_TIERS.length - 1].price;
}

function getScreenPrintPrice(qty: number): number | null {
  for (const tier of SCREEN_PRINT_TIERS) {
    if (qty >= tier.min) return tier.price;
  }
  return null;
}

type DecorationMethod = "dtf" | "screen-print" | "screen-print-or-dtf" | "embroidery" | "";

// Determine if a garment+tier combo is embroidery-only
function isEmbroideryOnly(garmentType: string, brandTier: string): boolean {
  if (garmentType === "polo") return true;
  if (garmentType === "jacket") return true;
  if (garmentType === "hoodie" && brandTier === "premium") return true;
  return false;
}

// Auto-determine decoration recommendation based on garment type, tier + qty
function getRecommendedDecoration(garmentType: string, brandTier: string, qty: number): DecorationMethod {
  if (isEmbroideryOnly(garmentType, brandTier)) return "embroidery";
  if (qty < SCREEN_PRINT_MIN_QTY) return "dtf";
  if (qty >= SCREEN_PRINT_MIN_QTY) return "screen-print-or-dtf";
  return "dtf";
}

interface PriceEstimate {
  garmentPrice: number;
  decorationLow: number;
  decorationHigh: number;
  perPieceLow: number;
  perPieceHigh: number;
  totalLow: number;
  totalHigh: number;
  recommendedDecoration: DecorationMethod;
  qty: number;
  showEmbroideryNote: boolean;
}

function calcEstimate(
  garmentType: string,
  qty: number,
  brandTier: string,
  embroideryLocationCount: number = 1,
  printLocationCount: number = 1
): PriceEstimate | null {
  if (!garmentType || qty < MIN_QTY) return null;
  const isTiered = TIERED_GARMENTS.has(garmentType);
  if (isTiered && !brandTier) return null;

  const qtyDiscount = getQtyDiscount(qty);
  const multiplier = 1 - qtyDiscount;
  const embOnly = isEmbroideryOnly(garmentType, brandTier);

  let garmentPriceLow: number;
  let garmentPriceHigh: number;

  if (isTiered) {
    const tiers = GARMENT_TIERS[garmentType];
    const tier = tiers?.find((t) => t.value === brandTier);
    const baseLow = tier?.priceLow ?? 10;
    const baseHigh = tier?.priceHigh ?? 20;

    if (garmentType === "tshirt") {
      // T-shirts use quantity-tiered all-in pricing (garment + decoration included)
      const tshirtPrice = getTshirtPrice(brandTier, qty);
      if (!tshirtPrice) return null;
      const rec = getRecommendedDecoration(garmentType, brandTier, qty);
      return {
        garmentPrice: tshirtPrice.low,
        decorationLow: 0,
        decorationHigh: 0,
        perPieceLow: tshirtPrice.low,
        perPieceHigh: tshirtPrice.high,
        totalLow: tshirtPrice.low * qty,
        totalHigh: tshirtPrice.high * qty,
        recommendedDecoration: rec,
        qty,
        showEmbroideryNote: false,
      };
    } else if (garmentType === "polo") {
      // Polo tiers are all-in (garment + 1 location embroidery)
      const extraLocs = Math.max(0, embroideryLocationCount - 1);
      const extraCostLow = extraLocs * EMBROIDERY_RANGE.low;
      const extraCostHigh = extraLocs * EMBROIDERY_RANGE.high;
      garmentPriceLow = (baseLow + extraCostLow) * multiplier;
      garmentPriceHigh = (baseHigh + extraCostHigh) * multiplier;
    } else {
      garmentPriceLow = baseLow * multiplier;
      garmentPriceHigh = baseHigh * multiplier;
    }
  } else {
    const baseCost = GARMENT_BASE_COSTS[garmentType] ?? 10;
    const garmentBase = baseCost * GARMENT_MARKUP;
    garmentPriceLow = garmentBase * multiplier;
    garmentPriceHigh = garmentBase * multiplier;
  }

  const rec = getRecommendedDecoration(garmentType, brandTier, qty);

  let decorationLow: number;
  let decorationHigh: number;

  if (garmentType === "polo") {
    decorationLow = 0;
    decorationHigh = 0;
  } else if (embOnly) {
    const locCount = Math.max(1, embroideryLocationCount);
    decorationLow = EMBROIDERY_RANGE.low * locCount * multiplier;
    decorationHigh = EMBROIDERY_RANGE.high * locCount * multiplier;
  } else if (rec === "screen-print-or-dtf") {
    const sp = getScreenPrintPrice(qty);
    const dtf = getDtfPrice(qty);
    decorationLow = Math.min(sp ?? dtf, dtf);
    decorationHigh = Math.max(sp ?? dtf, dtf);
  } else {
    const dtf = getDtfPrice(qty);
    decorationLow = dtf;
    decorationHigh = dtf;
  }

  const perPieceLow = garmentPriceLow + decorationLow;
  const perPieceHigh = garmentPriceHigh + decorationHigh;

  return {
    garmentPrice: garmentPriceLow,
    decorationLow,
    decorationHigh,
    perPieceLow,
    perPieceHigh,
    totalLow: perPieceLow * qty,
    totalHigh: perPieceHigh * qty,
    recommendedDecoration: rec,
    qty,
    showEmbroideryNote: embOnly,
  };
}

// ── Types ──────────────────────────────────────────────
interface GarmentQuoteData {
  intent: string;
  garmentType: string;
  poloTier: string;
  quantity: string;
  printColors: string;
  printLocations: string[];
  embroideryLocations: string[];
  timeline: string;
  eventDate: string;
  artworkFile: File | null;
  artworkNotes: string;
  artworkRights: boolean;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

const initialData: GarmentQuoteData = {
  intent: "",
  garmentType: "",
  poloTier: "",
  quantity: "",
  printColors: "",
  printLocations: [],
  embroideryLocations: [],
  timeline: "",
  eventDate: "",
  artworkFile: null,
  artworkNotes: "",
  artworkRights: false,
  name: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
};

const GARMENT_LABELS: Record<string, string> = {
  tshirt: "T-Shirt",
  hoodie: "Hoodie / Sweatshirt",
  polo: "Polo",
  jacket: "Jacket / Soft Shell",
  safety: "Safety Vest / Hi-Vis",
  "not-sure": "Apparel",
};

// ── Component ──────────────────────────────────────────
const GarmentQuoteBuilder = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<GarmentQuoteData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const update = (fields: Partial<GarmentQuoteData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const qty = Number(data.quantity) || 0;
  const isPolo = data.garmentType === "polo";
  const embLocCount = data.embroideryLocations.length;
  const printLocCount = data.printLocations.length;
  const embOnly = isEmbroideryOnly(data.garmentType, data.poloTier);
  const estimate = useMemo(
    () => calcEstimate(data.garmentType, qty, data.poloTier, embLocCount, printLocCount),
    [data.garmentType, qty, data.poloTier, embLocCount, printLocCount]
  );

  // Auto-determine if screen print details step should appear
  // Embroidery-only garments never show print details
  const showScreenPrintDetails = !embOnly && qty >= SCREEN_PRINT_MIN_QTY;
  // Embroidery/print locations are now embedded in the Garment step
  const showEmbroideryDetails = false;

  // Build dynamic steps array
  const STEPS = useMemo(() => {
    const steps = ["Intent", "Garment"];
    if (showScreenPrintDetails) steps.push("Print Details");
    if (showEmbroideryDetails) steps.push("Embroidery");
    steps.push("Deadline", "Artwork", "Contact");
    return steps;
  }, [showScreenPrintDetails, showEmbroideryDetails]);

  const getStepKey = (s: number): string => STEPS[s] ?? "";

  const togglePrintLocation = (loc: string) => {
    setData((prev) => ({
      ...prev,
      printLocations: prev.printLocations.includes(loc)
        ? prev.printLocations.filter((l) => l !== loc)
        : [...prev.printLocations, loc],
    }));
  };

  const toggleEmbroideryLocation = (loc: string) => {
    setData((prev) => {
      const already = prev.embroideryLocations.includes(loc);
      if (already) {
        return { ...prev, embroideryLocations: prev.embroideryLocations.filter((l) => l !== loc) };
      }
      if (prev.embroideryLocations.length >= 5) return prev;
      return { ...prev, embroideryLocations: [...prev.embroideryLocations, loc] };
    });
  };

  const hasFullBackEmbroidery = data.embroideryLocations.includes("Full Back");

  const canAdvance = (): boolean => {
    const key = getStepKey(step);
    switch (key) {
      case "Intent":
        return !!data.intent;
      case "Garment": {
        const needsTier = TIERED_GARMENTS.has(data.garmentType);
        const tierOk = !needsTier || !!data.poloTier;
        const locOk = embOnly
          ? data.embroideryLocations.length > 0
          : data.printLocations.length > 0;
        return !!data.garmentType && tierOk && !!data.quantity && qty >= MIN_QTY && locOk;
      }
      case "Print Details":
        // Optional — user can skip if they want DTF instead
        return true;
      case "Embroidery":
        // Required for polos (embroidery-only), optional for other garments
        if (isPolo) return data.embroideryLocations.length > 0;
        return true;
      case "Deadline":
        return !!data.timeline;
      case "Artwork":
        return true;
      case "Contact": {
        const base = !!data.name && !!data.email && !!data.phone;
        if (data.intent === "brand") return base && !!data.company;
        return base;
      }
      default:
        return false;
    }
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        intent: data.intent,
        garmentType: data.garmentType,
        poloTier: data.poloTier,
        quantity: qty,
        printColors: data.printColors,
        printLocations: data.printLocations,
        embroideryLocations: data.embroideryLocations,
        timeline: data.timeline,
        eventDate: data.eventDate,
        artworkNotes: data.artworkNotes,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        notes: data.notes,
        estimatedTotal: estimate
          ? { low: Math.round(estimate.totalLow), high: Math.round(estimate.totalHigh) }
          : null,
        recommendedDecoration: estimate?.recommendedDecoration ?? "",
      };
      console.log("Garment quote request:", payload);

      // TODO: uncomment when edge function is deployed
      // const { data: response, error } = await supabase.functions.invoke("create-quote-action-item", { body: payload });
      // if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your request and get back to you within one business day.",
      });
    } catch (err) {
      console.error("Quote submission error:", err);
      toast({
        title: "Something went wrong",
        description: "Please email us at info@hellscanyondesigns.com",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success State ──
  if (submitted) {
    const garmentLabel = GARMENT_LABELS[data.garmentType] ?? "apparel";
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">QUOTE REQUEST RECEIVED!</h3>
        <p className="mt-3 text-muted-foreground">
          Thanks, {data.name}! We'll review your {garmentLabel} request and send you a detailed quote within one business day.
        </p>
        <Button className="mt-8" variant="outline" onClick={() => { setSubmitted(false); setStep(0); setData(initialData); }}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  const stepKey = getStepKey(step);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                    ? "border-2 border-primary bg-primary/20 text-primary"
                    : "border border-border bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`mt-1.5 hidden text-[10px] font-medium sm:block ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

            {/* Step: Intent */}
            {stepKey === "Intent" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">WHAT ARE THESE FOR?</h3>
                <p className="mt-2 text-sm text-muted-foreground">This helps us recommend the right decoration and garment for your needs.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard label="Work & Crew Gear" description="Uniforms, jobsite shirts, company polos — durable, professional, and reorderable." selected={data.intent === "work"} onClick={() => update({ intent: "work" })} />
                  <OptionCard label="Team & Club" description="Sports teams, school groups, clubs — matching gear for the whole group." selected={data.intent === "team"} onClick={() => update({ intent: "team" })} />
                  <OptionCard label="Event & Celebration" description="Races, reunions, tournaments — commemorating something that matters." selected={data.intent === "event"} onClick={() => update({ intent: "event" })} />
                  <OptionCard label="Brand & Promo" description="Representing your business, client gifts, trade show swag." selected={data.intent === "brand"} onClick={() => update({ intent: "brand" })} />
                </div>
              </div>
            )}

            {/* Step: Garment Type & Quantity */}
            {stepKey === "Garment" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">WHAT ARE WE DECORATING?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Choose your garment and quantity. Pricing updates live as you adjust.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard label="T-Shirt" description="Choose your brand tier below." selected={data.garmentType === "tshirt"} onClick={() => update({ garmentType: "tshirt", poloTier: "", embroideryLocations: [], printLocations: [] })} />
                  <OptionCard label="Hoodie / Sweatshirt" description="Choose your brand tier below." selected={data.garmentType === "hoodie"} onClick={() => update({ garmentType: "hoodie", poloTier: "", embroideryLocations: [], printLocations: [] })} />
                  <OptionCard label="Polo" description="Embroidery only — choose your brand tier below." selected={data.garmentType === "polo"} onClick={() => update({ garmentType: "polo", poloTier: "", embroideryLocations: [], printLocations: [] })} />
                  <OptionCard label="Jacket / Soft Shell" description="Embroidery only — choose your brand tier below." selected={data.garmentType === "jacket"} onClick={() => update({ garmentType: "jacket", poloTier: "", embroideryLocations: [], printLocations: [] })} />
                  <OptionCard label="Safety Vest / Hi-Vis" selected={data.garmentType === "safety"} onClick={() => update({ garmentType: "safety", poloTier: "", embroideryLocations: [], printLocations: [] })} />
                  <OptionCard label="Not Sure Yet" selected={data.garmentType === "not-sure"} onClick={() => update({ garmentType: "not-sure", poloTier: "", embroideryLocations: [], printLocations: [] })} />
                </div>

                {/* Brand Tier Selector — for all tiered garments */}
                {TIERED_GARMENTS.has(data.garmentType) && (
                  <div className="mt-6">
                    <Label className="text-foreground font-heading text-sm font-semibold tracking-wider">BRAND TIER</Label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isPolo ? "Price includes the polo + embroidery decoration." 
                        : data.garmentType === "jacket" ? "Embroidery only. Decoration costs are added on top."
                        : data.garmentType === "hoodie" ? "Budget & Mid-Range: DTF/screen print. Premium: embroidery only (DWR-coated fabrics)."
                        : "Choose your garment quality level. Decoration costs are added on top."}
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {(GARMENT_TIERS[data.garmentType] ?? []).map((tier) => (
                        <OptionCard
                          key={tier.value}
                          label={`${tier.label} — $${tier.priceLow}–$${tier.priceHigh}`}
                          description={tier.desc}
                          selected={data.poloTier === tier.value}
                          onClick={() => update({ poloTier: tier.value, embroideryLocations: [], printLocations: [] })}
                        />
                      ))}
                    </div>
                    {isEmbroideryOnly(data.garmentType, data.poloTier) && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        One-time ${EMBROIDERY_DIGITIZING_FEE} digitizing fee applies for new embroidery logos.
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <Label htmlFor="garment-qty" className="text-foreground">Quantity</Label>
                  <Input id="garment-qty" type="number" min={MIN_QTY} placeholder="e.g. 48" value={data.quantity} onChange={(e) => update({ quantity: e.target.value })} className="mt-2 max-w-[180px] text-lg" />
                  {data.quantity && qty > 0 && qty < MIN_QTY && (
                    <p className="mt-2 text-sm text-destructive">Our minimum order is {MIN_QTY} pieces.</p>
                  )}
                </div>

                {/* Decoration Locations — embroidery or print depending on garment/tier */}
                {qty >= MIN_QTY && data.poloTier && embOnly && (
                  <div className="mt-6">
                    <Label className="text-foreground font-heading text-sm font-semibold tracking-wider">EMBROIDERY LOCATIONS</Label>
                    <p className="mt-1 text-xs text-muted-foreground">Select where you'd like embroidery. Each location affects per-piece pricing.</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {EMBROIDERY_LOCATIONS.map((loc) => (
                        <OptionCard
                          key={loc}
                          label={loc}
                          description={loc === "Full Back" ? "Large back piece — requires custom pricing" : undefined}
                          selected={data.embroideryLocations.includes(loc)}
                          onClick={() => toggleEmbroideryLocation(loc)}
                        />
                      ))}
                    </div>
                    {data.embroideryLocations.length > 0 && (
                      <p className="mt-3 text-sm text-muted-foreground">{data.embroideryLocations.length} of 5 locations selected</p>
                    )}
                    {hasFullBackEmbroidery && (
                      <div className="mt-3 flex items-start gap-2 rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          Full back embroidery is a large-format piece that requires custom pricing. We'll include a detailed quote for this location.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {qty >= MIN_QTY && !embOnly && (
                  <div className="mt-6">
                    <Label className="text-foreground font-heading text-sm font-semibold tracking-wider">DECORATION LOCATIONS</Label>
                    <p className="mt-1 text-xs text-muted-foreground">Select where you'd like your design printed (DTF or screen print).</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {SCREEN_PRINT_LOCATIONS.map((loc) => (
                        <OptionCard
                          key={loc}
                          label={loc}
                          selected={data.printLocations.includes(loc)}
                          onClick={() => togglePrintLocation(loc)}
                        />
                      ))}
                    </div>
                    {data.printLocations.length > 0 && (
                      <p className="mt-3 text-sm text-muted-foreground">{data.printLocations.length} location{data.printLocations.length !== 1 ? "s" : ""} selected</p>
                    )}
                  </div>
                )}

                {/* Live Price Estimate + Recommendation */}
                {estimate && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="font-heading text-sm font-semibold tracking-wider text-primary">ESTIMATED PRICE</span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          ${estimate.perPieceLow.toFixed(2)}{estimate.perPieceLow !== estimate.perPieceHigh && `–$${estimate.perPieceHigh.toFixed(2)}`}
                        </span>
                        <span className="text-sm text-muted-foreground"> /piece</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {estimate.qty} pieces × ${estimate.perPieceLow.toFixed(2)}{estimate.perPieceLow !== estimate.perPieceHigh && `–$${estimate.perPieceHigh.toFixed(2)}`} = ${Math.round(estimate.totalLow).toLocaleString()}{estimate.totalLow !== estimate.totalHigh && `–$${Math.round(estimate.totalHigh).toLocaleString()}`} estimated
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Includes garment + decoration. Final price confirmed within 1 business day.
                      {getQtyDiscount(qty) > 0 && ` (${Math.round(getQtyDiscount(qty) * 100)}% volume discount applied)`}
                    </p>

                    {/* Decoration recommendations */}
                    <div className="mt-4 space-y-2 border-t border-primary/20 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Our recommendation</p>

                        {estimate.recommendedDecoration === "embroidery" && (
                        <div className="flex items-start gap-2">
                          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">Embroidery</span> — {embLocCount} location{embLocCount !== 1 ? "s" : ""}.
                            {isPolo ? " Price includes garment + embroidery." : ` $${EMBROIDERY_RANGE.low}–$${EMBROIDERY_RANGE.high}/ea per location on top of garment cost.`}
                            {getQtyDiscount(qty) > 0 && ` ${Math.round(getQtyDiscount(qty) * 100)}% quantity discount applied.`}
                          </p>
                        </div>
                      )}

                      {estimate.recommendedDecoration === "dtf" && (
                        <div className="flex items-start gap-2">
                          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">DTF Printing</span> — Full color, photo-quality prints on any fabric. Great for complex logos, gradients, and smaller runs.
                          </p>
                        </div>
                      )}

                      {estimate.recommendedDecoration === "screen-print-or-dtf" && (
                        <>
                          <div className="flex items-start gap-2">
                            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <p className="text-xs text-muted-foreground">
                              <span className="font-semibold text-foreground">Screen Printing</span> — Bold, durable ink — best value for 72+ pieces of the same design. We'll ask about colors and locations next.
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <p className="text-xs text-muted-foreground">
                              <span className="font-semibold text-foreground">DTF Printing</span> — Also a great option if your design has gradients or many colors.
                            </p>
                          </div>
                        </>
                      )}

                      {estimate.showEmbroideryNote && estimate.recommendedDecoration !== "embroidery" && (
                        <div className="flex items-start gap-2">
                          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">Embroidery</span> — Classic, premium look for polos, jackets, and workwear. One-time ${EMBROIDERY_DIGITIZING_FEE} digitizing fee applies for new logos.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Extended size upcharge note */}
                    <div className="mt-4 flex items-start gap-2 rounded-md bg-secondary/50 px-3 py-2">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Extended sizes:</span> 2XL and above carry an upcharge (+$2 for 2XL, +$4 for 3XL, +$6 for 4XL+). We'll confirm exact pricing in your quote.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step: Screen Print Details (auto-shown when qty >= 72) */}
            {stepKey === "Print Details" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">SCREEN PRINT DETAILS</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Since you're ordering {qty}+ pieces, screen printing may be your best value. Fill in the details below — or skip this step if you'd prefer DTF.
                </p>

                <div className="mt-6">
                  <Label className="text-foreground font-heading text-sm font-semibold tracking-wider">PRINT COLORS</Label>
                  <p className="mt-1 text-xs text-muted-foreground">More colors = more detail, but affects pricing. We'll help optimize.</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "1-color", label: "1 Color", desc: "Simple, bold, cost-effective." },
                      { value: "2-color", label: "2 Colors", desc: "Add dimension with a second color." },
                      { value: "3-color", label: "3 Colors", desc: "More detail and visual impact." },
                      { value: "4-plus", label: "4+ Colors", desc: "Full creative freedom." },
                      { value: "not-sure", label: "Not Sure", desc: "We'll recommend based on your artwork." },
                    ].map((opt) => (
                      <OptionCard key={opt.value} label={opt.label} description={opt.desc} selected={data.printColors === opt.value} onClick={() => update({ printColors: opt.value })} />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Label className="text-foreground font-heading text-sm font-semibold tracking-wider">PRINT LOCATIONS</Label>
                  <p className="mt-1 text-xs text-muted-foreground">Select all locations where you'd like printing.</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {SCREEN_PRINT_LOCATIONS.map((loc) => (
                      <OptionCard key={loc} label={loc} selected={data.printLocations.includes(loc)} onClick={() => togglePrintLocation(loc)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step: Embroidery Details (auto-shown for work/brand intents) */}
            {stepKey === "Embroidery" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">EMBROIDERY LOCATIONS</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isPolo
                    ? "Select where you'd like embroidery on your polos. Up to 5 locations available."
                    : "Embroidery is a premium option for your order. Select locations if you'd like embroidery — or skip this step if you prefer print."}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {EMBROIDERY_LOCATIONS.map((loc) => (
                    <OptionCard
                      key={loc}
                      label={loc}
                      description={loc === "Full Back" ? "Large back piece — requires custom pricing" : undefined}
                      selected={data.embroideryLocations.includes(loc)}
                      onClick={() => toggleEmbroideryLocation(loc)}
                    />
                  ))}
                </div>
                {data.embroideryLocations.length > 0 && (
                  <p className="mt-3 text-sm text-muted-foreground">{data.embroideryLocations.length} of 5 locations selected</p>
                )}
                {hasFullBackEmbroidery && (
                  <div className="mt-3 flex items-start gap-2 rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Full back embroidery is a large-format piece that requires custom pricing. We'll include a detailed quote for this location.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step: Deadline */}
            {stepKey === "Deadline" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">DO YOU HAVE A HARD DEADLINE?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Rush orders are available — we just want to make sure we can deliver on time.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard label="Yes, I have a date" description="I need these by a specific date." selected={data.timeline === "specific-date"} onClick={() => update({ timeline: "specific-date" })} />
                  <OptionCard label="No firm deadline — flexible" description="No rush, work me into the schedule." selected={data.timeline === "flexible"} onClick={() => update({ timeline: "flexible" })} />
                  <OptionCard label="Standard (2–3 Weeks)" description="Normal production from artwork approval." selected={data.timeline === "standard"} onClick={() => update({ timeline: "standard" })} />
                  <OptionCard label="Rush (1–2 Weeks)" description="Expedited production, rush fee applies." selected={data.timeline === "rush"} onClick={() => update({ timeline: "rush" })} />
                </div>
                {data.timeline === "specific-date" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 overflow-hidden"
                  >
                    <Label className="text-foreground">Event / Need-by Date</Label>
                    <div className="mt-2 inline-block rounded-lg border border-border bg-card">
                      <Calendar
                        mode="single"
                        selected={data.eventDate ? new Date(data.eventDate + "T00:00:00") : undefined}
                        onSelect={(date) => update({ eventDate: date ? format(date, "yyyy-MM-dd") : "" })}
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    </div>
                    {data.eventDate && (
                      <p className="mt-2 text-sm font-medium text-primary">
                        Selected: {format(new Date(data.eventDate + "T00:00:00"), "MMMM d, yyyy")}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* Step: Artwork */}
            {stepKey === "Artwork" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">UPLOAD YOUR ARTWORK</h3>
                <p className="mt-2 text-sm text-muted-foreground">Have your logo ready? Upload it here. We accept AI, EPS, SVG, PDF, PNG, or JPG.</p>
                <div className="mt-6">
                  {data.artworkFile ? (
                    <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{data.artworkFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(data.artworkFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => update({ artworkFile: null })} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 p-10 transition-colors hover:border-primary/50 hover:bg-secondary/50">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="mt-3 text-sm font-medium text-foreground">Click to upload artwork</span>
                      <span className="mt-1 text-xs text-muted-foreground">AI, EPS, SVG, PDF, PNG, or JPG (max 20MB)</span>
                      <input type="file" className="hidden" accept=".ai,.eps,.svg,.pdf,.png,.jpg,.jpeg" onChange={(e) => { const file = e.target.files?.[0] || null; update({ artworkFile: file }); }} />
                    </label>
                  )}
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    <span className="font-semibold">A note on artwork:</span> AI-generated images and low-resolution files often require cleanup or recreation. We'll let you know if an art preparation fee applies before we start — no surprises.
                  </p>
                </div>
                <ArtworkRightsCheckbox checked={data.artworkRights} onCheckedChange={(val) => update({ artworkRights: val })} />
                <div className="mt-6">
                  <Label htmlFor="artwork-notes" className="text-foreground">Artwork Notes (optional)</Label>
                  <Textarea id="artwork-notes" placeholder="Describe your design, colors, text, or any special instructions..." value={data.artworkNotes} onChange={(e) => update({ artworkNotes: e.target.value })} className="mt-2" rows={3} />
                </div>
              </div>
            )}

            {/* Step: Contact */}
            {stepKey === "Contact" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">YOUR CONTACT INFO</h3>
                <p className="mt-2 text-sm text-muted-foreground">Almost done! Tell us how to reach you and we'll send your custom quote.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                    <Input id="name" placeholder="John Smith" value={data.name} onChange={(e) => update({ name: e.target.value })} className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input id="email" type="email" placeholder="john@company.com" value={data.email} onChange={(e) => update({ email: e.target.value })} className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="(208) 555-1234" value={data.phone} onChange={(e) => update({ phone: e.target.value })} className="mt-2" required />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="company" className="text-foreground">
                      Company / Organization
                      {data.intent === "brand" && <span className="ml-1 text-xs text-primary">* (required for business orders)</span>}
                    </Label>
                    <Input id="company" placeholder={data.intent === "brand" ? "Your business name" : "Your business name (optional)"} value={data.company} onChange={(e) => update({ company: e.target.value })} className="mt-2" required={data.intent === "brand"} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes" className="text-foreground">Anything Else?</Label>
                    <Textarea id="notes" placeholder="Special requests, questions, or anything we should know..." value={data.notes} onChange={(e) => update({ notes: e.target.value })} className="mt-2" rows={3} />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button variant="ghost" onClick={prev} disabled={step === 0} className="font-heading tracking-wide">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} disabled={!canAdvance()} className="font-heading tracking-wide">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canAdvance() || submitting} className="font-heading tracking-wide">
              {submitting ? "Submitting..." : "Submit Quote Request"}
              {!submitting && <Check className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GarmentQuoteBuilder;
