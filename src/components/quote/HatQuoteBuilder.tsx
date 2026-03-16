import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check, Upload, X, DollarSign, Star } from "lucide-react";
import { submitQuoteRequest } from "@/lib/submitQuote";
import OptionCard from "./OptionCard";
import ArtworkRightsCheckbox from "./ArtworkRightsCheckbox";

// ── Pricing ────────────────────────────────────────────
const HAT_PRICE_TIERS = [
  { min: 100, price: 19 },
  { min: 72, price: 21 },
  { min: 48, price: 23, popular: true },
  { min: 24, price: 26 },
  { min: 12, price: 27 },
];

// Per-hat upcharge vs Richardson 112 baseline ($6.75 blank)
const HAT_BLANK_PRICES: Record<string, number> = {
  "richardson-112": 0,       // baseline
  "richardson-110": 1.25,    // $8.00 - $6.75
  "richardson-112pfp": 1.50, // $8.25 - $6.75
  "yp-classics-6606": 1.05,  // $7.80 - $6.75
  "legacy-ofa": 2.00,        // $8.75 - $6.75
};

const EMBROIDERY_DIGITIZING_FEE = 45;
const MIN_QTY = 12;

function getPerHatPrice(qty: number): number | null {
  if (qty < MIN_QTY) return null;
  for (const tier of HAT_PRICE_TIERS) {
    if (qty >= tier.min) return tier.price;
  }
  return null;
}

const EMBROIDERED_PATCH_MIN = 60;

function calcEstimate(patchType: string, hatStyle: string, qty: number) {
  if (patchType === "embroidered-patch" && qty < EMBROIDERED_PATCH_MIN) return null;
  const perHat = getPerHatPrice(qty);
  if (!perHat || qty < MIN_QTY) return null;
  const blankUpcharge = HAT_BLANK_PRICES[hatStyle] ?? 0;
  const perHatTotal = perHat + blankUpcharge;
  const subtotal = perHatTotal * qty;
  const digitizing = patchType === "direct-embroidery" ? EMBROIDERY_DIGITIZING_FEE : 0;
  return { perHat: perHatTotal, basePrice: perHat, blankUpcharge, subtotal, digitizing, total: subtotal + digitizing, qty };
}

// ── Types ──────────────────────────────────────────────
interface HatQuoteData {
  patchType: string;
  hatStyle: string;
  hatColors: string;
  quantity: string;
  artworkFile: File | null;
  artworkNotes: string;
  artworkRights: boolean;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

const initialData: HatQuoteData = {
  patchType: "",
  hatStyle: "",
  hatColors: "",
  quantity: "",
  artworkFile: null,
  artworkNotes: "",
  artworkRights: false,
  timeline: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
};

const STEPS = [
  "Patch Type",
  "Hat Style",
  "Quantity",
  "Artwork",
  "Timeline",
  "Contact",
];


// ── Component ──────────────────────────────────────────
const HatQuoteBuilder = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<HatQuoteData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const update = (fields: Partial<HatQuoteData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const qty = Number(data.quantity) || 0;
  const estimate = useMemo(
    () => calcEstimate(data.patchType, data.hatStyle, qty),
    [data.patchType, data.hatStyle, qty]
  );

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return !!data.patchType;
      case 1:
        return !!data.hatStyle;
      case 2:
        return !!data.quantity && qty >= MIN_QTY && (data.patchType !== "embroidered-patch" || qty >= EMBROIDERED_PATCH_MIN);
      case 3:
        return true; // artwork is optional
      case 4:
        return !!data.timeline;
      case 5:
        return !!data.name && !!data.email && !!data.phone;
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

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const est = estimate;
      await submitQuoteRequest({
        serviceType: "custom_hats",
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        notes: data.notes,
        timeline: data.timeline,
        quantity: data.quantity,
        artworkNotes: data.artworkNotes,
        details: {
          patchType: data.patchType,
          hatStyle: data.hatStyle,
          hatColors: data.hatColors,
        },
        estimate: est ? { low: Math.round(est.total), high: Math.round(est.total) } : null,
        artworkFile: data.artworkFile,
      });
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
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-primary/30 bg-primary/5 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
          QUOTE REQUEST RECEIVED!
        </h3>
        <p className="mt-3 text-muted-foreground">
          Thanks, {data.name}! We'll review your custom hat request and send you
          a detailed quote within one business day.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setStep(0);
            setData(initialData);
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
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
              <span
                className={`mt-1.5 hidden text-[10px] font-medium sm:block ${
                  i <= step ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step 0: Patch Type */}
            {step === 0 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  CHOOSE YOUR PATCH TYPE
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select the type of patch you'd like on your custom hats.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard
                    label="Laser Engraved Leather"
                    description="Our signature look — precision laser engraving on genuine leather. Classic, rugged, and premium."
                    selected={data.patchType === "laser-leather"}
                    onClick={() => update({ patchType: "laser-leather" })}
                  />
                  <OptionCard
                    label="UV Printed Patch"
                    description="Full-color UV printing on leather or leatherette. Perfect for detailed logos and photos."
                    selected={data.patchType === "uv-printed"}
                    onClick={() => update({ patchType: "uv-printed" })}
                  />
                  <OptionCard
                    label="Direct Embroidery"
                    description="Stitched directly onto the hat — vibrant, durable, and classic. Includes a one-time $45 digitizing fee."
                    selected={data.patchType === "direct-embroidery"}
                    onClick={() => update({ patchType: "direct-embroidery" })}
                  />
                  <OptionCard
                    label="Embroidered Patch"
                    description="Custom embroidered patch sewn onto the hat. Available on orders of 60+ hats."
                    selected={data.patchType === "embroidered-patch"}
                    onClick={() => update({ patchType: "embroidered-patch" })}
                  />
                  <OptionCard
                    label="Not Sure / Other"
                    description="Not sure what patch type is right? No worries — we'll help you pick the best option."
                    selected={data.patchType === "other"}
                    onClick={() => update({ patchType: "other" })}
                  />
                </div>
              </div>
            )}

            {/* Step 1: Hat Style */}
            {step === 1 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  CHOOSE YOUR HAT STYLE
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pick a hat brand and style. We stock 4,000+ hats — if you
                  don't see yours, just let us know!
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard
                    label="Richardson 112"
                    description="The industry standard trucker hat. Structured mid-profile with a snapback closure. (Included in base price)"
                    selected={data.hatStyle === "richardson-112"}
                    onClick={() => update({ hatStyle: "richardson-112" })}
                  />
                  <OptionCard
                    label="Richardson 112PFP"
                    description="Five-panel trucker with a pre-curved visor. Clean, modern look. (+$1.50/hat)"
                    selected={data.hatStyle === "richardson-112pfp"}
                    onClick={() => update({ hatStyle: "richardson-112pfp" })}
                  />
                  <OptionCard
                    label="Richardson 110"
                    description="Structured R-Flex fitted hat. Professional, low-key look. (+$1.25/hat)"
                    selected={data.hatStyle === "richardson-110"}
                    onClick={() => update({ hatStyle: "richardson-110" })}
                  />
                  <OptionCard
                    label="YP Classics 6606 (Yupoong)"
                    description="Classic-style trucker caps. Retro look with mesh back. (+$1.05/hat)"
                    selected={data.hatStyle === "yp-classics-6606"}
                    onClick={() => update({ hatStyle: "yp-classics-6606" })}
                  />
                  <OptionCard
                    label="Legacy OFA"
                    description="Classic unstructured hat with an old-school relaxed fit. (+$2.00/hat)"
                    selected={data.hatStyle === "legacy-ofa"}
                    onClick={() => update({ hatStyle: "legacy-ofa" })}
                  />
                  <OptionCard
                    label="Other / Not Sure"
                    description="Have a specific hat in mind? Let us know in the notes."
                    selected={data.hatStyle === "other"}
                    onClick={() => update({ hatStyle: "other" })}
                  />
                </div>

                <div className="mt-6">
                  <Label htmlFor="hat-colors" className="text-foreground">
                    Preferred Hat Colors
                  </Label>
                  <Input
                    id="hat-colors"
                    placeholder="e.g. Black/White, Charcoal/Black, Camo/Tan..."
                    value={data.hatColors}
                    onChange={(e) => update({ hatColors: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Quantity */}
            {step === 2 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  HOW MANY HATS?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your quantity (12 piece minimum). Pricing includes your
                  chosen patch on Richardson 112 hats with free shipping.
                </p>
                <div className="mt-6">
                  <Label htmlFor="hat-qty" className="text-foreground">
                    Quantity
                  </Label>
                  <Input
                    id="hat-qty"
                    type="number"
                    min={MIN_QTY}
                    placeholder="e.g. 48"
                    value={data.quantity}
                    onChange={(e) => update({ quantity: e.target.value })}
                    className="mt-2 max-w-[180px] text-lg"
                  />
                  {data.quantity && Number(data.quantity) > 0 && Number(data.quantity) < MIN_QTY && (
                    <p className="mt-2 text-sm text-destructive">
                      Minimum order is {MIN_QTY} hats.
                    </p>
                  )}
                </div>

                {/* Clickable pricing tiers */}
                <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Volume Pricing — click a tier or enter a custom quantity
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {HAT_PRICE_TIERS.slice().reverse().map((tier) => {
                      const isActive = qty >= tier.min &&
                        (HAT_PRICE_TIERS.find(t => qty >= t.min)?.min === tier.min);
                      return (
                        <button
                          key={tier.min}
                          type="button"
                          onClick={() => update({ quantity: String(tier.min) })}
                          className={`rounded-md border px-3 py-2 text-center transition-colors cursor-pointer hover:border-primary/60 ${
                            isActive
                              ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          <span className="block text-xs">{tier.min}+</span>
                          <span className="block text-sm font-bold">${tier.price}</span>
                        </button>
                      );
                    })}
                  </div>
                  {data.patchType === "direct-embroidery" && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      + ${EMBROIDERY_DIGITIZING_FEE} one-time digitizing fee for direct embroidery
                    </p>
                  )}
                  {data.patchType === "embroidered-patch" && (
                    <p className="mt-3 text-xs text-primary">
                      Embroidered patches available on orders of {EMBROIDERED_PATCH_MIN}+ hats.
                      {qty > 0 && qty < EMBROIDERED_PATCH_MIN && (
                        <span className="block mt-1 text-destructive">
                          Please enter at least {EMBROIDERED_PATCH_MIN} to continue.
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Artwork */}
            {step === 3 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  UPLOAD YOUR ARTWORK
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Have your logo ready? Upload it here. We accept AI, EPS, SVG,
                  PDF, PNG, or JPG. Don't have a clean file? No worries — just
                  describe it below.
                </p>

                <div className="mt-6">
                  {data.artworkFile ? (
                    <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {data.artworkFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(data.artworkFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => update({ artworkFile: null })}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 p-10 transition-colors hover:border-primary/50 hover:bg-secondary/50">
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
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          update({ artworkFile: file });
                        }}
                      />
                    </label>
                  )}
                </div>

                <ArtworkRightsCheckbox checked={data.artworkRights} onCheckedChange={(val) => update({ artworkRights: val })} />

                <div className="mt-6">
                  <Label htmlFor="artwork-notes" className="text-foreground">
                    Artwork Notes (optional)
                  </Label>
                  <Textarea
                    id="artwork-notes"
                    placeholder="Describe your design, colors, text, or any special instructions..."
                    value={data.artworkNotes}
                    onChange={(e) => update({ artworkNotes: e.target.value })}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Timeline */}
            {step === 4 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  WHEN DO YOU NEED THEM?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a timeline for your order. Rush orders are available for
                  an additional fee.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard
                    label="Standard (2–3 Weeks)"
                    description="Our normal production timeline from artwork approval. Best pricing."
                    selected={data.timeline === "standard"}
                    onClick={() => update({ timeline: "standard" })}
                  />
                  <OptionCard
                    label="Rush (1–2 Weeks)"
                    description="Expedited production for time-sensitive orders. Rush fee applies."
                    selected={data.timeline === "rush"}
                    onClick={() => update({ timeline: "rush" })}
                  />
                  <OptionCard
                    label="No Rush — Flexible"
                    description="No firm deadline. We'll work you into the production schedule."
                    selected={data.timeline === "flexible"}
                    onClick={() => update({ timeline: "flexible" })}
                  />
                  <OptionCard
                    label="Need It ASAP!"
                    description="The boss wanted them yesterday. Let's talk about what's possible."
                    selected={data.timeline === "asap"}
                    onClick={() => update({ timeline: "asap" })}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Contact */}
            {step === 5 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  YOUR CONTACT INFO
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Almost done! Tell us how to reach you and we'll send your
                  custom quote.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={data.name}
                      onChange={(e) => update({ name: e.target.value })}
                      className="mt-2"
                      required
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
                      value={data.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className="mt-2"
                      required
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
                      value={data.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="company" className="text-foreground">
                      Company / Organization
                    </Label>
                    <Input
                      id="company"
                      placeholder="Your business name (optional)"
                      value={data.company}
                      onChange={(e) => update({ company: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes" className="text-foreground">
                      Anything Else?
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Special requests, questions, or anything we should know..."
                      value={data.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Estimated Price */}
        {estimate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="font-heading text-sm font-semibold tracking-wider text-primary">
                ESTIMATED PRICE
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <div>
                <span className="text-2xl font-bold text-foreground">${estimate.perHat.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground"> /hat</span>
                {estimate.blankUpcharge > 0 && (
                  <span className="ml-2 text-xs text-muted-foreground">(base ${estimate.basePrice} + ${estimate.blankUpcharge.toFixed(2)} hat upcharge)</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {estimate.qty} hats × ${estimate.perHat.toFixed(2)} = ${estimate.subtotal.toFixed(2)}
                {estimate.digitizing > 0 && (
                  <span> + ${estimate.digitizing} digitizing</span>
                )}
              </div>
              <div className="font-heading text-lg font-bold text-primary">
                Total: ${estimate.total.toFixed(2)}
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Includes patch + hat + free shipping. Final price confirmed within 1 business day.
            </p>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="ghost"
            onClick={prev}
            disabled={step === 0}
            className="font-heading tracking-wide"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={next}
              disabled={!canAdvance()}
              className="font-heading tracking-wide"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canAdvance()}
              className="font-heading tracking-wide"
            >
              Submit Quote Request
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HatQuoteBuilder;
