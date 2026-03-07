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

const CustomApparelForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [garmentType, setGarmentType] = useState("");
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

  const toggleLocation = (loc: string) => {
    setPrintLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const isValid =
    !!garmentType &&
    !!quantity &&
    Number(quantity) >= 1 &&
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
        details: {
          garmentType,
          garmentBrandStyle,
          decorationMethod,
          printLocations,
          numColors,
        },
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
            <Select value={garmentType} onValueChange={setGarmentType}>
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
              Brand / Style (optional)
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
        <div className="mt-4 max-w-[200px]">
          <Label htmlFor="qty" className="text-foreground">
            Quantity *
          </Label>
          <Input
            id="qty"
            type="number"
            min={1}
            placeholder="e.g. 72"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1.5 text-lg"
          />
        </div>
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
        {submitting ? "Submitting..." : "Submit Quote Request"}
      </Button>
    </form>
  );
};

export default CustomApparelForm;
