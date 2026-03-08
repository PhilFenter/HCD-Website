import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Upload, X, DollarSign } from "lucide-react";
import { submitQuoteRequest } from "@/lib/submitQuote";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Patch Types ────────────────────────────────────────
const PATCH_TYPES = [
  { value: "leather", label: "Genuine Leather", desc: "Laser engraved on real leather — classic, premium feel." },
  { value: "leatherette", label: "Leatherette", desc: "Synthetic leather with a similar look — more color options, budget-friendly." },
  { value: "uv-printed", label: "UV Printed", desc: "Full-color prints on leather or leatherette — photos, gradients, unlimited colors." },
  
];

// ── Patch Shapes ───────────────────────────────────────
const PATCH_SHAPES = [
  { value: "rectangle", label: "Rectangle" },
  { value: "rounded-rectangle", label: "Rounded Rectangle" },
  { value: "circle", label: "Circle" },
  { value: "oval", label: "Oval" },
  { value: "diamond", label: "Diamond" },
  { value: "custom", label: "Custom Die-Cut Shape" },
  { value: "other", label: "Other / Not Sure" },
];

// ── Patch Sizes (based on supplier Size = (L+W)/2 ) ───
const PATCH_SIZES = [
  { value: "up-to-1.5", label: 'Up to 1.5"' },
  { value: "1.51-2.0", label: '1.51"–2.0"' },
  { value: "2.01-2.5", label: '2.01"–2.5"' },
  { value: "2.51-3.0", label: '2.51"–3.0"' },
  { value: "3.01-3.5", label: '3.01"–3.5"' },
  { value: "3.51-4.0", label: '3.51"–4.0"' },
  { value: "custom", label: "Custom / Not Sure" },
];

const LEATHER_COLORS = [
  { value: "natural", label: "Natural (Tan)" },
  { value: "dark-brown", label: "Dark Brown" },
  { value: "black", label: "Black" },
  { value: "gray", label: "Gray" },
  { value: "other", label: "Other" },
];

// ── Leather Patch Pricing Matrix (size × quantity) ─────
// Size = (Length + Width) / 2
// Columns: up-to-1.5, 1.51-2.0, 2.01-2.5, 2.51-3.0, 3.01-3.5, 3.51-4.0
const LEATHER_QTY_TIERS = [
  { min: 10000, max: 24999, label: "10,000+" },
  { min: 5000, max: 9999, label: "5,000+" },
  { min: 2500, max: 4999, label: "2,500+" },
  { min: 1000, max: 2499, label: "1,000+" },
  { min: 500, max: 999, label: "500+" },
  { min: 250, max: 499, label: "250+" },
  { min: 100, max: 249, label: "100+" },
  { min: 50, max: 99, label: "50+" },
  { min: 25, max: 49, label: "25+" },
  { min: 12, max: 24, label: "12+" },
];

// prices[qtyTierIndex][sizeIndex]
const LEATHER_PRICES: number[][] = [
  // 10000+
  [1.10, 1.61, 1.65, 1.75, 1.86, 2.11],
  // 5000+
  [1.18, 1.68, 1.75, 1.82, 1.97, 2.24],
  // 2500+
  [1.22, 1.79, 1.82, 1.92, 2.04, 2.35],
  // 1000+
  [1.29, 1.82, 2.04, 2.21, 2.35, 2.65],
  // 500+
  [1.36, 1.90, 2.27, 2.43, 2.54, 2.97],
  // 250+
  [1.50, 2.04, 2.89, 3.08, 3.24, 3.64],
  // 100+
  [1.97, 2.50, 3.34, 3.88, 4.02, 4.31],
  // 50+
  [2.72, 3.27, 3.91, 4.81, 5.41, 5.69],
  // 25+
  [4.31, 4.81, 5.41, 5.98, 6.47, 7.06],
  // 12+
  [5.17, 5.77, 6.49, 7.18, 7.76, 8.47],
];

const ART_SETUP_FEE = 30;
const MIN_QTY = 12;

const SIZE_INDEX: Record<string, number> = {
  "up-to-1.5": 0,
  "1.51-2.0": 1,
  "2.01-2.5": 2,
  "2.51-3.0": 3,
  "3.01-3.5": 4,
  "3.51-4.0": 5,
};

// Multipliers relative to leather base pricing
const PATCH_TYPE_MULTIPLIERS: Record<string, number> = {
  leather: 1.0,
  leatherette: 0.88,  // 12% less
  "uv-printed": 1.10, // 10% more
};

function getPatchPrice(patchType: string, size: string, qty: number): number | null {
  const sizeIdx = SIZE_INDEX[size];
  const multiplier = PATCH_TYPE_MULTIPLIERS[patchType];
  if (sizeIdx === undefined || multiplier === undefined || qty < MIN_QTY) return null;
  for (let i = 0; i < LEATHER_QTY_TIERS.length; i++) {
    if (qty >= LEATHER_QTY_TIERS[i].min) {
      return Math.round(LEATHER_PRICES[i][sizeIdx] * multiplier * 100) / 100;
    }
  }
  return null;
}

function calcPatchEstimate(patchType: string, size: string, qty: number) {
  if (!PATCH_TYPE_MULTIPLIERS[patchType]) return null;
  const perPatch = getPatchPrice(patchType, size, qty);
  if (!perPatch) return null;
  const subtotal = perPatch * qty;
  return { perPatch, subtotal, setupFee: ART_SETUP_FEE, total: subtotal + ART_SETUP_FEE, qty };
}

// Get tier prices for a given size + patch type (for clickable tier buttons)
function getTierPricesForSize(patchType: string, size: string): { min: number; label: string; price: number }[] {
  const sizeIdx = SIZE_INDEX[size];
  const multiplier = PATCH_TYPE_MULTIPLIERS[patchType];
  if (sizeIdx === undefined || multiplier === undefined) return [];
  return LEATHER_QTY_TIERS.map((tier, i) => ({
    min: tier.min,
    label: tier.label,
    price: Math.round(LEATHER_PRICES[i][sizeIdx] * multiplier * 100) / 100,
  }));
}

// ── Component ──────────────────────────────────────────
const WholesalePatchForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [patchType, setPatchType] = useState("");
  const [patchShape, setPatchShape] = useState("");
  const [patchSize, setPatchSize] = useState("");
  const [leatherColor, setLeatherColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sewingChannel, setSewingChannel] = useState(false);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const qty = Number(quantity) || 0;
  const estimate = useMemo(() => calcPatchEstimate(patchType, patchSize, qty), [patchType, patchSize, qty]);
  const tierPrices = useMemo(
    () => (PATCH_TYPE_MULTIPLIERS[patchType] ? getTierPricesForSize(patchType, patchSize) : []),
    [patchType, patchSize]
  );

  const hasLivePricing = !!PATCH_TYPE_MULTIPLIERS[patchType] && patchSize && patchSize !== "custom";

  const isValid =
    !!patchType && !!patchShape && qty >= MIN_QTY && !!name && !!email && !!phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "wholesale_patches",
        name,
        email,
        phone,
        company,
        notes,
        quantity,
        estimate: estimate ? { low: estimate.total, high: estimate.total } : null,
        details: {
          patchType,
          patchShape,
          patchSize,
          leatherColor,
          sewingChannel,
        },
      });
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description:
          "We'll review your wholesale patch request and get back to you within one business day.",
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
          Thanks, {name}! We'll review your wholesale patch request and send you
          a detailed quote within one business day.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setPatchType("");
            setPatchShape("");
            setPatchSize("");
            setLeatherColor("");
            setQuantity("");
            setSewingChannel(false);
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
      {/* Patch Type */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          PATCH TYPE *
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PATCH_TYPES.map((pt) => (
            <button
              key={pt.value}
              type="button"
              onClick={() => setPatchType(pt.value)}
              className={`rounded-lg border p-4 text-left transition-all ${
                patchType === pt.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <span className="text-sm font-semibold text-foreground">{pt.label}</span>
              <p className="mt-1 text-xs text-muted-foreground">{pt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Patch Details */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          PATCH DETAILS
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <Label className="text-foreground">Patch Shape *</Label>
            <Select value={patchShape} onValueChange={setPatchShape}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select shape..." />
              </SelectTrigger>
              <SelectContent>
                {PATCH_SHAPES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Patch Size *</Label>
            <Select value={patchSize} onValueChange={setPatchSize}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select size..." />
              </SelectTrigger>
              <SelectContent>
                {PATCH_SIZES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {patchType === "leather" && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Size = (Length + Width) ÷ 2
              </p>
            )}
          </div>
          <div>
            <Label className="text-foreground">Color</Label>
            <Select value={leatherColor} onValueChange={setLeatherColor}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select color..." />
              </SelectTrigger>
              <SelectContent>
                {LEATHER_COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Switch
            id="sewing-channel"
            checked={sewingChannel}
            onCheckedChange={setSewingChannel}
          />
          <Label htmlFor="sewing-channel" className="cursor-pointer text-foreground">
            Include sewing channel (heat-seal border for easy application)
          </Label>
        </div>
      </div>

      {/* Quantity & Pricing */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          QUANTITY & PRICING
        </h3>
        <div className="mt-4">
          <Label htmlFor="qty" className="text-foreground">
            How many patches? * (minimum {MIN_QTY})
          </Label>
          <Input
            id="qty"
            type="number"
            min={MIN_QTY}
            placeholder="e.g. 100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1.5 max-w-[200px] text-lg"
          />
          {qty > 0 && qty < MIN_QTY && (
            <p className="mt-2 text-sm text-destructive">
              Minimum order is {MIN_QTY} patches.
            </p>
          )}
        </div>

        {/* Clickable pricing tiers (leather only, when size is selected) */}
        {hasLivePricing && tierPrices.length > 0 && (
          <div className="mt-5 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Volume Pricing — click a tier or enter a custom quantity
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {tierPrices.slice().reverse().slice(0, 8).map((tier) => {
                const isActive =
                  qty >= tier.min &&
                  tierPrices.find((t) => qty >= t.min)?.min === tier.min;
                return (
                  <button
                    key={tier.min}
                    type="button"
                    onClick={() => setQuantity(String(tier.min))}
                    className={`rounded-md border px-3 py-2 text-center transition-colors cursor-pointer hover:border-primary/60 ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <span className="block text-xs">{tier.label}</span>
                    <span className="block text-sm font-bold">${tier.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Prices per patch. Includes heat-applied or pressure-sensitive backing. $30 art setup fee applies.
            </p>
          </div>
        )}

        {/* "Request quote" note for non-leather types */}
        {patchType && patchType !== "leather" && patchType !== "other" && (
          <div className="mt-5 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              Pricing for <span className="font-medium text-foreground">{PATCH_TYPES.find(p => p.value === patchType)?.label}</span> patches
              varies by design complexity. We'll include a detailed quote within one business day.
            </p>
          </div>
        )}

        {/* Live estimate (leather only) */}
        {estimate && (
          <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <DollarSign className="h-4 w-4" />
              ESTIMATED PRICING
            </div>
            <div className="mt-3 flex items-baseline gap-1 text-2xl font-bold text-foreground">
              ${estimate.perPatch.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground">/patch</span>
            </div>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div>
                {estimate.qty} patches × ${estimate.perPatch.toFixed(2)} ={" "}
                <span className="font-semibold text-foreground">
                  ${estimate.subtotal.toFixed(2)}
                </span>
              </div>
              <div>
                Art setup fee:{" "}
                <span className="font-semibold text-foreground">
                  ${estimate.setupFee.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-border pt-1 text-base font-bold text-foreground">
                Estimated Total: ${estimate.total.toFixed(2)}
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Includes backing + digital pre-production sample. Final price confirmed within 1 business day.
            </p>
          </div>
        )}
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
            placeholder="Special requests, custom sizes, multiple designs..."
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
            ? `Submit Quote Request — Est. $${estimate.total.toFixed(2)}`
            : "Submit Quote Request"}
      </Button>
    </form>
  );
};

export default WholesalePatchForm;
