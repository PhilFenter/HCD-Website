import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check, Upload, X } from "lucide-react";
import OptionCard from "./OptionCard";
import { submitQuoteRequest } from "@/lib/submitQuote";

interface ScreenPrintQuoteData {
  garmentType: string;
  printColors: string;
  locations: string[];
  quantity: string;
  artworkFile: File | null;
  artworkNotes: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

const initialData: ScreenPrintQuoteData = {
  garmentType: "",
  printColors: "",
  locations: [],
  quantity: "",
  artworkFile: null,
  artworkNotes: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
};

const STEPS = ["Garment", "Colors", "Locations", "Quantity", "Artwork", "Timeline", "Contact"];

const LOCATION_OPTIONS = ["Front", "Full Back", "Upper Back", "Left Chest", "Right Chest", "Left Sleeve", "Right Sleeve", "Other"];

const ScreenPrintQuoteBuilder = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ScreenPrintQuoteData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const update = (fields: Partial<ScreenPrintQuoteData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const toggleLocation = (loc: string) => {
    setData((prev) => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter((l) => l !== loc)
        : [...prev.locations, loc],
    }));
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return !!data.garmentType;
      case 1: return !!data.printColors;
      case 2: return data.locations.length > 0;
      case 3: return !!data.quantity;
      case 4: return true;
      case 5: return !!data.timeline;
      case 6: return !!data.name && !!data.email && !!data.phone;
      default: return false;
    }
  };

  const next = () => { if (step < STEPS.length - 1) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "screen_print",
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        notes: data.notes,
        timeline: data.timeline,
        quantity: data.quantity,
        artworkNotes: data.artworkNotes,
        details: {
          garmentType: data.garmentType,
          printColors: data.printColors,
          locations: data.locations,
        },
      });
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your screen printing request and get back to you within one business day.",
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
        <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">QUOTE REQUEST RECEIVED!</h3>
        <p className="mt-3 text-muted-foreground">
          Thanks, {data.name}! We'll review your screen printing request and send you a detailed quote within one business day.
        </p>
        <Button className="mt-8" variant="outline" onClick={() => { setSubmitted(false); setStep(0); setData(initialData); }}>
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
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${i < step ? "bg-primary text-primary-foreground" : i === step ? "border-2 border-primary bg-primary/20 text-primary" : "border border-border bg-secondary text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`mt-1.5 hidden text-[10px] font-medium sm:block ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

            {step === 0 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">WHAT ARE WE PRINTING ON?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Select the type of garment for your screen printing order.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "tshirts", label: "T-Shirts", desc: "Classic crew neck tees — the staple of screen printing." },
                    { value: "hoodies", label: "Hoodies / Sweatshirts", desc: "Pullover and zip-up hoodies, crewneck sweatshirts." },
                    { value: "tanks", label: "Tank Tops", desc: "Perfect for events, gyms, and summer merch." },
                    { value: "longsleeves", label: "Long Sleeve Tees", desc: "Long sleeve crew necks and performance shirts." },
                    { value: "polos", label: "Polos / Work Shirts", desc: "Professional polos and button-downs." },
                    { value: "other", label: "Other / Multiple", desc: "Something else? Tell us in the notes." },
                  ].map((opt) => (
                    <OptionCard key={opt.value} label={opt.label} description={opt.desc} selected={data.garmentType === opt.value} onClick={() => update({ garmentType: opt.value })} />
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">HOW MANY PRINT COLORS?</h3>
                <p className="mt-2 text-sm text-muted-foreground">More colors = more detail, but affects pricing. We'll help optimize.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "1-color", label: "1 Color", desc: "Simple, bold, cost-effective. Great for logos and text." },
                    { value: "2-color", label: "2 Colors", desc: "Add dimension with a second color." },
                    { value: "3-color", label: "3 Colors", desc: "More detail and visual impact." },
                    { value: "4-plus", label: "4+ Colors", desc: "Full creative freedom — complex artwork and gradients." },
                    { value: "not-sure", label: "Not Sure", desc: "We'll look at your artwork and recommend the best approach." },
                  ].map((opt) => (
                    <OptionCard key={opt.value} label={opt.label} description={opt.desc} selected={data.printColors === opt.value} onClick={() => update({ printColors: opt.value })} />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">PRINT LOCATIONS</h3>
                <p className="mt-2 text-sm text-muted-foreground">Select all locations where you'd like printing. Choose as many as needed.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {LOCATION_OPTIONS.map((loc) => (
                    <OptionCard key={loc} label={loc} selected={data.locations.includes(loc)} onClick={() => toggleLocation(loc)} />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">HOW MANY PIECES?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Select a quantity range. Larger orders get better per-piece pricing.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "24-48", label: "24 – 48 Pieces", desc: "Minimum order — small team or event." },
                    { value: "48-96", label: "48 – 96 Pieces", desc: "Mid-range — better pricing." },
                    { value: "96-200", label: "96 – 200 Pieces", desc: "Large order — volume pricing kicks in." },
                    { value: "200-500", label: "200 – 500 Pieces", desc: "Bulk — great per-piece value." },
                    { value: "500+", label: "500+ Pieces", desc: "Enterprise volume — best pricing." },
                    { value: "not-sure", label: "Not Sure Yet", desc: "We'll help you figure it out." },
                  ].map((opt) => (
                    <OptionCard key={opt.value} label={opt.label} description={opt.desc} selected={data.quantity === opt.value} onClick={() => update({ quantity: opt.value })} />
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">UPLOAD YOUR ARTWORK</h3>
                <p className="mt-2 text-sm text-muted-foreground">Upload your design file. Vector formats (AI, EPS, SVG) work best for screen printing.</p>
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
                      <input type="file" className="hidden" accept=".ai,.eps,.svg,.pdf,.png,.jpg,.jpeg" onChange={(e) => update({ artworkFile: e.target.files?.[0] || null })} />
                    </label>
                  )}
                </div>
                <div className="mt-6">
                  <Label htmlFor="artwork-notes" className="text-foreground">Artwork Notes (optional)</Label>
                  <Textarea id="artwork-notes" placeholder="Describe your design, ink colors (PMS), or any special instructions..." value={data.artworkNotes} onChange={(e) => update({ artworkNotes: e.target.value })} className="mt-2" rows={3} />
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">WHEN DO YOU NEED THEM?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Select a timeline for your screen printing order.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard label="Standard (2–3 Weeks)" description="Our normal production timeline. Best pricing." selected={data.timeline === "standard"} onClick={() => update({ timeline: "standard" })} />
                  <OptionCard label="Rush (1–2 Weeks)" description="Expedited production. Rush fee applies." selected={data.timeline === "rush"} onClick={() => update({ timeline: "rush" })} />
                  <OptionCard label="No Rush — Flexible" description="No firm deadline. We'll fit you in." selected={data.timeline === "flexible"} onClick={() => update({ timeline: "flexible" })} />
                  <OptionCard label="Need It ASAP!" description="The boss wanted them yesterday. Let's talk." selected={data.timeline === "asap"} onClick={() => update({ timeline: "asap" })} />
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">YOUR CONTACT INFO</h3>
                <p className="mt-2 text-sm text-muted-foreground">Almost done! Tell us how to reach you.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                    <Input id="name" placeholder="John Smith" value={data.name} onChange={(e) => update({ name: e.target.value })} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input id="email" type="email" placeholder="john@company.com" value={data.email} onChange={(e) => update({ email: e.target.value })} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="(208) 555-1234" value={data.phone} onChange={(e) => update({ phone: e.target.value })} className="mt-2" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="company" className="text-foreground">Company / Organization</Label>
                    <Input id="company" placeholder="Your business name (optional)" value={data.company} onChange={(e) => update({ company: e.target.value })} className="mt-2" />
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

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button variant="ghost" onClick={prev} disabled={step === 0} className="font-heading tracking-wide">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} disabled={!canAdvance()} className="font-heading tracking-wide">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canAdvance()} className="font-heading tracking-wide">Submit Quote Request <Check className="ml-2 h-4 w-4" /></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenPrintQuoteBuilder;
