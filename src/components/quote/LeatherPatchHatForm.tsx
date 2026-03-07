import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Upload, X } from "lucide-react";
import { submitQuoteRequest } from "@/lib/submitQuote";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HAT_BRANDS = [
  { value: "richardson", label: "Richardson" },
  { value: "yp-classics", label: "YP Classics (Yupoong)" },
  { value: "legacy", label: "Legacy" },
  { value: "pacific-headwear", label: "Pacific Headwear" },
  { value: "outdoor-cap", label: "Outdoor Cap" },
  { value: "other", label: "Other / Not Sure" },
];

const HAT_MODELS = [
  { value: "112", label: "Richardson 112 (Trucker Snapback)" },
  { value: "112pfp", label: "Richardson 112PFP (Five Panel)" },
  { value: "110", label: "Richardson 110 (R-Flex Fitted)" },
  { value: "115", label: "Richardson 115 (Low Pro Trucker)" },
  { value: "6606", label: "YP Classics 6606 (Retro Trucker)" },
  { value: "ofa", label: "Legacy OFA (Unstructured)" },
  { value: "other", label: "Other / Not Sure" },
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

const LeatherPatchHatForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [hatBrand, setHatBrand] = useState("");
  const [hatModel, setHatModel] = useState("");
  const [hatColor, setHatColor] = useState("");
  const [patchShape, setPatchShape] = useState("");
  const [patchSize, setPatchSize] = useState("");
  const [leatherColor, setLeatherColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const isValid =
    !!patchShape && !!quantity && Number(quantity) >= 1 && !!name && !!email && !!phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "leather_patch_hats",
        name,
        email,
        phone,
        company,
        notes,
        quantity,
        details: {
          hatBrand,
          hatModel,
          hatColor,
          patchShape,
          patchSize,
          leatherColor,
        },
      });
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description:
          "We'll review your leather patch hat request and get back to you within one business day.",
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
          Thanks, {name}! We'll review your leather patch hat request and send
          you a detailed quote within one business day.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setHatBrand("");
            setHatModel("");
            setHatColor("");
            setPatchShape("");
            setPatchSize("");
            setLeatherColor("");
            setQuantity("");
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
      {/* Product Details */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          HAT DETAILS
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-foreground">Hat Brand</Label>
            <Select value={hatBrand} onValueChange={setHatBrand}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select brand..." />
              </SelectTrigger>
              <SelectContent>
                {HAT_BRANDS.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Hat Model</Label>
            <Select value={hatModel} onValueChange={setHatModel}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select model..." />
              </SelectTrigger>
              <SelectContent>
                {HAT_MODELS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="hat-color" className="text-foreground">
              Hat Color(s)
            </Label>
            <Input
              id="hat-color"
              placeholder="e.g. Black/White, Charcoal/Black, Camo/Tan..."
              value={hatColor}
              onChange={(e) => setHatColor(e.target.value)}
              className="mt-1.5"
            />
          </div>
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
            <Label className="text-foreground">Leather Color</Label>
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
      </div>

      {/* Quantity */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          QUANTITY
        </h3>
        <div className="mt-4 max-w-[200px]">
          <Label htmlFor="qty" className="text-foreground">
            How many hats? *
          </Label>
          <Input
            id="qty"
            type="number"
            min={1}
            placeholder="e.g. 48"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1.5 text-lg"
          />
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
            placeholder="Special requests, questions, multiple designs, size breakdowns..."
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
        {submitting ? "Submitting..." : "Submit Quote Request"}
      </Button>
    </form>
  );
};

export default LeatherPatchHatForm;
