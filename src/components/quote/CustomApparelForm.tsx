import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Upload, X, DollarSign } from "lucide-react";
import { submitQuoteRequest } from "@/lib/submitQuote";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Garment Types ──────────────────────────────────────
const GARMENT_TYPES = [
  { value: "tshirts", label: "T-Shirts" },
  { value: "hoodies", label: "Hoodies / Sweatshirts" },
  { value: "longsleeves", label: "Long Sleeve Tees" },
  { value: "tanks", label: "Tank Tops" },
  { value: "polos", label: "Polos / Work Shirts" },
  { value: "jackets", label: "Jackets / Outerwear" },
  { value: "safety", label: "Safety Vests / Hi-Vis" },
  { value: "other", label: "Other / Multiple" },
];

// ── Brand Tiers ────────────────────────────────────────
interface BrandTier {
  value: string;
  label: string;
  desc: string;
  priceLow: number;
  priceHigh: number;
}

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

const TSHIRT_BRAND_TIERS: BrandTier[] = [
  { value: "budget", label: "Budget", desc: "Gildan G5000, Jerzees 29M — everyday basics.", priceLow: 9, priceHigh: 22 },
  { value: "mid-range", label: "Mid-Range", desc: "Next Level 6210, Bella Canvas 3001 — softer, modern fit.", priceLow: 13, priceHigh: 28 },
  { value: "premium", label: "Premium", desc: "Comfort Colors, District Perfect Tri — premium feel.", priceLow: 18, priceHigh: 35 },
];

const GARMENT_TIERS: Record<string, BrandTier[]> = {
  tshirts: TSHIRT_BRAND_TIERS,
  longsleeves: TSHIRT_BRAND_TIERS,
  tanks: TSHIRT_BRAND_TIERS,
  hoodies: [
    { value: "budget", label: "Budget", desc: "Gildan, Jerzees — reliable, affordable.", priceLow: 28, priceHigh: 34 },
    { value: "mid-range", label: "Mid-Range", desc: "Bella Canvas, Next Level — softer, modern cut.", priceLow: 35, priceHigh: 38 },
    { value: "premium", label: "Premium", desc: "Comfort Colors, Independent Trading — heavyweight.", priceLow: 39, priceHigh: 48 },
  ],
  polos: [
    { value: "standard", label: "Standard", desc: "Port Authority, Sport-Tek — moisture-wicking polos.", priceLow: 33, priceHigh: 52 },
    { value: "premium", label: "Premium", desc: "Nike Dri-FIT — top-tier brand & performance.", priceLow: 90, priceHigh: 99 },
  ],
  jackets: [
    { value: "budget", label: "Budget", desc: "Port Authority, Harriton — solid workwear.", priceLow: 45, priceHigh: 65 },
    { value: "mid-range", label: "Mid-Range", desc: "Eddie Bauer, The North Face — modern, professional.", priceLow: 65, priceHigh: 85 },
    { value: "premium", label: "Premium", desc: "Patagonia, Arc'teryx — top-tier outdoor brands.", priceLow: 85, priceHigh: 125 },
  ],
};

const TIERED_GARMENTS = new Set(Object.keys(GARMENT_TIERS));

function getTshirtPrice(brandTier: string, qty: number): { low: number; high: number } | null {
  const tiers = TSHIRT_QTY_TIERS[brandTier];
  if (!tiers) return null;
  for (const tier of tiers) {
    if (qty >= tier.minQty) return { low: tier.priceLow, high: tier.priceHigh };
  }
  return null;
}

// For non-tshirt tiered garments, return the tier's price range
function getTieredPrice(garmentType: string, brandTier: string): { low: number; high: number } | null {
  const tiers = GARMENT_TIERS[garmentType];
  if (!tiers) return null;
  const tier = tiers.find((t) => t.value === brandTier);
  if (!tier) return null;
  return { low: tier.priceLow, high: tier.priceHigh };
}

const MIN_QTY = 12;

function calcApparelEstimate(garmentType: string, brandTier: string, qty: number) {
  if (qty < MIN_QTY) return null;

  // T-shirts (and long sleeves / tanks) use qty-tiered all-in pricing
  if (garmentType === "tshirts" || garmentType === "longsleeves" || garmentType === "tanks") {
    const price = getTshirtPrice(brandTier, qty);
    if (!price) return null;
    return {
      perPieceLow: price.low,
      perPieceHigh: price.high,
      totalLow: price.low * qty,
      totalHigh: price.high * qty,
      qty,
      isRange: true,
    };
  }

  // Other tiered garments
  const price = getTieredPrice(garmentType, brandTier);
  if (!price) return null;
  return {
    perPieceLow: price.low,
    perPieceHigh: price.high,
    totalLow: price.low * qty,
    totalHigh: price.high * qty,
    qty,
    isRange: true,
  };
}

// ── Decoration ─────────────────────────────────────────
const DECORATION_METHODS = [
  { value: "screen-print", label: "Screen Printing" },
  { value: "dtf", label: "DTF (Direct to Film)" },
  { value: "embroidery", label: "Embroidery" },
  { value: "not-sure", label: "Not Sure — Recommend for Me" },
];

const PRINT_LOCATIONS = [
  "Front",
  "Full Back",
  "Upper Back",
  "Left Chest",
  "Right Chest",
  "Left Sleeve",
  "Right Sleeve",
];

const COLOR_COUNTS = [
  { value: "1", label: "1 Color" },
  { value: "2", label: "2 Colors" },
  { value: "3", label: "3 Colors" },
  { value: "4+", label: "4+ Colors / Full Color" },
  { value: "not-sure", label: "Not Sure" },
];

// ── Component ──────────────────────────────────────────
import type { BrandContext } from "@/lib/submitQuote";

interface CustomApparelFormProps {
  brandContext?: BrandContext;
}

const CustomApparelForm = ({ brandContext }: CustomApparelFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [garmentType, setGarmentType] = useState("");
  const [brandTier, setBrandTier] = useState("");
  const [garmentBrandStyle, setGarmentBrandStyle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [decorationMethod, setDecorationMethod] = useState("");
  const [printLocations, setPrintLocations] = useState<string[]>([]);
  const [numColors, setNumColors] = useState("");
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const qty = Number(quantity) || 0;
  const tiers = GARMENT_TIERS[garmentType] || [];
  const hasTiers = TIERED_GARMENTS.has(garmentType);
  const estimate = useMemo(
    () => calcApparelEstimate(garmentType, brandTier, qty),
    [garmentType, brandTier, qty]
  );

  // T-shirt qty tier buttons
  const isTshirtType = garmentType === "tshirts" || garmentType === "longsleeves" || garmentType === "tanks";
  const qtyTiers = isTshirtType && brandTier ? TSHIRT_QTY_TIERS[brandTier] : null;

  const toggleLocation = (loc: string) => {
    setPrintLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  // Reset brand tier when garment type changes
  const handleGarmentTypeChange = (val: string) => {
    setGarmentType(val);
    setBrandTier("");
  };

  const isValid =
    !!garmentType &&
    qty >= MIN_QTY &&
    !!name &&
    !!email &&
    !!phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "custom_apparel",
        name,
        email,
        phone,
        company,
        notes,
        quantity,
        estimate: estimate
          ? { low: estimate.totalLow, high: estimate.totalHigh }
          : null,
        details: {
          garmentType,
          brandTier,
          garmentBrandStyle,
          decorationMethod,
          printLocations,
          numColors,
        },
        artworkFile,
      });
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description:
          "We'll review your custom apparel request and get back to you within one business day.",
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

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
          QUOTE REQUEST RECEIVED!
        </h3>
        <p className="mt-3 text-muted-foreground">
          Thanks, {name}! We'll review your custom apparel request and send you a
          detailed quote within one business day.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setGarmentType("");
            setBrandTier("");
            setGarmentBrandStyle("");
            setQuantity("");
            setDecorationMethod("");
            setPrintLocations([]);
            setNumColors("");
            setArtworkFile(null);
            setNotes("");
            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {/* Garment Details */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          GARMENT DETAILS
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-foreground">Garment Type *</Label>
            <Select value={garmentType} onValueChange={handleGarmentTypeChange}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                {GARMENT_TYPES.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="brand-style" className="text-foreground">
              Specific Brand / Style (optional)
            </Label>
            <Input
              id="brand-style"
              placeholder="e.g. Bella Canvas 3001, Gildan G5000..."
              value={garmentBrandStyle}
              onChange={(e) => setGarmentBrandStyle(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Brand Tier Selection */}
        {hasTiers && tiers.length > 0 && (
          <div className="mt-6">
            <Label className="text-foreground">Brand Tier</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Pick a tier to see estimated pricing. All-in price includes garment + decoration.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {tiers.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => setBrandTier(tier.value)}
                  className={`rounded-lg border p-4 text-left transition-all ${
                    brandTier === tier.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <span className="text-sm font-semibold text-foreground">{tier.label}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{tier.desc}</p>
                  <p className="mt-2 text-sm font-bold text-primary">
                    ${tier.priceLow}–${tier.priceHigh}
                    <span className="font-normal text-muted-foreground"> /piece</span>
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quantity & Pricing */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          QUANTITY & PRICING
        </h3>
        <div className="mt-4">
          <Label htmlFor="qty" className="text-foreground">
            How many pieces? * (minimum {MIN_QTY})
          </Label>
          <Input
            id="qty"
            type="number"
            min={MIN_QTY}
            placeholder="e.g. 72"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1.5 max-w-[200px] text-lg"
          />
          {qty > 0 && qty < MIN_QTY && (
            <p className="mt-2 text-sm text-destructive">
              Minimum order is {MIN_QTY} pieces.
            </p>
          )}
        </div>

        {/* Clickable qty tiers for t-shirts */}
        {qtyTiers && (
          <div className="mt-5 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Volume Pricing — click a tier or enter a custom quantity
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {qtyTiers.slice().reverse().map((tier) => {
                const isActive =
                  qty >= tier.minQty &&
                  qtyTiers.find((t) => qty >= t.minQty)?.minQty === tier.minQty;
                return (
                  <button
                    key={tier.minQty}
                    type="button"
                    onClick={() => setQuantity(String(tier.minQty))}
                    className={`rounded-md border px-3 py-2 text-center transition-colors cursor-pointer hover:border-primary/60 ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <span className="block text-xs">{tier.minQty}+</span>
                    <span className="block text-sm font-bold">
                      ${tier.priceLow}–${tier.priceHigh}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              All-in per piece: garment + decoration + free shipping. Size upcharges: +$2 (2XL), +$4 (3XL), +$6 (4XL+).
            </p>
          </div>
        )}

        {/* Live estimate */}
        {estimate && (
          <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <DollarSign className="h-4 w-4" />
              ESTIMATED PRICING
            </div>
            <div className="mt-3 flex items-baseline gap-1 text-2xl font-bold text-foreground">
              ${estimate.perPieceLow}–${estimate.perPieceHigh}
              <span className="text-sm font-normal text-muted-foreground">/piece</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {estimate.qty} pieces → estimated total{" "}
              <span className="font-semibold text-foreground">
                ${estimate.totalLow.toLocaleString()}–${estimate.totalHigh.toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              All-in pricing includes garment + decoration. Final price confirmed within 1 business day.
            </p>
          </div>
        )}
      </div>

      {/* Decoration */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          DECORATION
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-foreground">Decoration Method</Label>
            <Select value={decorationMethod} onValueChange={setDecorationMethod}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select method..." />
              </SelectTrigger>
              <SelectContent>
                {DECORATION_METHODS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Number of Colors</Label>
            <Select value={numColors} onValueChange={setNumColors}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {COLOR_COUNTS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Print Locations */}
        <div className="mt-6">
          <Label className="text-foreground">Print / Decoration Locations</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRINT_LOCATIONS.map((loc) => {
              const selected = printLocations.includes(loc);
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-muted-foreground/50"
                  }`}
                >
                  {selected && <Check className="mr-1 inline h-3 w-3" />}
                  {loc}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Artwork */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          ARTWORK
        </h3>
        <div className="mt-4">
          {artworkFile ? (
            <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <Upload className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {artworkFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(artworkFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setArtworkFile(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 transition-colors hover:border-primary/50 hover:bg-secondary/50">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="mt-3 text-sm font-medium text-foreground">
                Click to upload artwork
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                AI, EPS, SVG, PDF, PNG, or JPG (max 20MB)
              </span>
              <input
                type="file"
                className="hidden"
                accept=".ai,.eps,.svg,.pdf,.png,.jpg,.jpeg"
                onChange={(e) => setArtworkFile(e.target.files?.[0] || null)}
              />
            </label>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          NOTES
        </h3>
        <div className="mt-4">
          <Textarea
            placeholder="Size breakdowns, multiple designs, special requests, ink colors (PMS)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          CONTACT INFO
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-foreground">
              Phone *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(208) 555-1234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="company" className="text-foreground">
              Company / Organization
            </Label>
            <Input
              id="company"
              placeholder="Your business name (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={!isValid || submitting}
        className="w-full font-heading text-base tracking-wide"
      >
        {submitting
          ? "Submitting..."
          : estimate
            ? `Submit Quote Request — Est. $${estimate.totalLow.toLocaleString()}–$${estimate.totalHigh.toLocaleString()}`
            : "Submit Quote Request"}
      </Button>
    </form>
  );
};

export default CustomApparelForm;
