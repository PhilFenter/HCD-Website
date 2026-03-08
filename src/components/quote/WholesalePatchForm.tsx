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
  { value: "uv-printed", label: "UV Printed", desc: "Full-color prints directly on leather or leatherette — photos, gradients, unlimited colors." },
  { value: "embroidered", label: "Embroidered Patch", desc: "Traditional thread-stitched patches — vibrant, textured, classic look." },
  { value: "other", label: "Other / Not Sure", desc: "We'll help you pick the best option." },
];

const PATCH_SHAPES = [
  { value: "rectangle", label: "Rectangle" },
  { value: "rounded-rectangle", label: "Rounded Rectangle" },
  { value: "circle", label: "Circle" },
  { value: "oval", label: "Oval" },
  { value: "diamond", label: "Diamond" },
  { value: "custom", label: "Custom Die-Cut Shape" },
  { value: "other", label: "Other / Not Sure" },
];

const PATCH_SIZES = [
  { value: "2x3", label: '2" × 3"' },
  { value: "2.5x3.5", label: '2.5" × 3.5"' },
  { value: "3x3", label: '3" × 3"' },
  { value: "3x4", label: '3" × 4"' },
  { value: "custom", label: "Custom Size" },
];

const LEATHER_COLORS = [
  { value: "natural", label: "Natural (Tan)" },
  { value: "dark-brown", label: "Dark Brown" },
  { value: "black", label: "Black" },
  { value: "gray", label: "Gray" },
  { value: "other", label: "Other" },
];

// ── Pricing (placeholder — user will provide exact tiers) ──
const MIN_QTY = 25;

// Rough wholesale patch pricing tiers per piece
const PATCH_PRICE_TIERS: Record<string, { min: number; price: number }[]> = {
  leather: [
    { min: 500, price: 3.50 },
    { min: 250, price: 4.00 },
    { min: 100, price: 5.00 },
    { min: 50, price: 6.00 },
    { min: 25, price: 7.50 },
  ],
  leatherette: [
    { min: 500, price: 2.50 },
    { min: 250, price: 3.00 },
    { min: 100, price: 3.75 },
    { min: 50, price: 4.50 },
    { min: 25, price: 5.50 },
  ],
  "uv-printed": [
    { min: 500, price: 4.00 },
    { min: 250, price: 4.75 },
    { min: 100, price: 5.50 },
    { min: 50, price: 6.50 },
    { min: 25, price: 8.00 },
  ],
  embroidered: [
    { min: 500, price: 3.00 },
    { min: 250, price: 3.50 },
    { min: 100, price: 4.25 },
    { min: 50, price: 5.25 },
    { min: 25, price: 6.50 },
  ],
};

function getPatchPrice(patchType: string, qty: number): number | null {
  const tiers = PATCH_PRICE_TIERS[patchType];
  if (!tiers || qty < MIN_QTY) return null;
  for (const tier of tiers) {
    if (qty >= tier.min) return tier.price;
  }
  return null;
}

function calcPatchEstimate(patchType: string, qty: number) {
  const perPatch = getPatchPrice(patchType, qty);
  if (!perPatch) return null;
  return { perPatch, subtotal: perPatch * qty, qty };
}

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
  const estimate = useMemo(() => calcPatchEstimate(patchType, qty), [patchType, qty]);

  // Get tiers for the selected patch type (for clickable buttons)
  const currentTiers = PATCH_PRICE_TIERS[patchType] || [];

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
        estimate: estimate ? { low: estimate.subtotal, high: estimate.subtotal } : null,
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
            <Label className="text-foreground">Patch Size</Label>
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

        {/* Clickable pricing tiers */}
        {currentTiers.length > 0 && (
          <div className="mt-5 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Volume Pricing — click a tier or enter a custom quantity
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {currentTiers.slice().reverse().map((tier) => {
                const isActive =
                  qty >= tier.min &&
                  currentTiers.find((t) => qty >= t.min)?.min === tier.min;
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
                    <span className="block text-xs">{tier.min}+</span>
                    <span className="block text-sm font-bold">${tier.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Prices shown per patch. Final price confirmed within 1 business day.
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
              ${estimate.perPatch.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground">/patch</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {estimate.qty} patches × ${estimate.perPatch.toFixed(2)} ={" "}
              <span className="font-semibold text-foreground">
                ${estimate.subtotal.toFixed(2)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Final price confirmed within 1 business day.
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
            ? `Submit Quote Request — Est. $${estimate.subtotal.toFixed(2)}`
            : "Submit Quote Request"}
      </Button>
    </form>
  );
};

export default WholesalePatchForm;
