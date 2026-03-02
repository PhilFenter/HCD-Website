import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check, Upload, X } from "lucide-react";
import OptionCard from "./OptionCard";
import ArtworkRightsCheckbox from "./ArtworkRightsCheckbox";
import { submitQuoteRequest } from "@/lib/submitQuote";

interface DTFQuoteData {
  orderType: string;
  garmentType: string;
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

const initialData: DTFQuoteData = {
  orderType: "",
  garmentType: "",
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

const STEPS = ["Order Type", "Garment", "Quantity", "Artwork", "Timeline", "Contact"];

const DTFQuoteBuilder = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DTFQuoteData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const update = (fields: Partial<DTFQuoteData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return !!data.orderType;
      case 1: return !!data.garmentType;
      case 2: return !!data.quantity;
      case 3: return true;
      case 4: return !!data.timeline;
      case 5: return !!data.name && !!data.email && !!data.phone;
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
        serviceType: "dtf",
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        notes: data.notes,
        timeline: data.timeline,
        quantity: data.quantity,
        artworkNotes: data.artworkNotes,
        details: {
          orderType: data.orderType,
          garmentType: data.garmentType,
        },
      });
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your DTF request and get back to you within one business day.",
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
          Thanks, {data.name}! We'll review your DTF request and send you a detailed quote within one business day.
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
                <h3 className="font-heading text-xl font-bold text-foreground">WHAT DO YOU NEED?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Choose between finished garments or loose transfer sheets.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard label="Finished Garments" description="We source the garments and apply the DTF transfers for you. Ready to wear." selected={data.orderType === "garments"} onClick={() => update({ orderType: "garments" })} />
                  <OptionCard label="Loose DTF Transfers" description="We print the transfer sheets — you press them yourself. Great for custom orders." selected={data.orderType === "transfers"} onClick={() => update({ orderType: "transfers" })} />
                  <OptionCard label="Both" description="Need some finished garments and some loose transfers? We can do both." selected={data.orderType === "both"} onClick={() => update({ orderType: "both" })} />
                  <OptionCard label="Not Sure" description="Not sure which option is right? We'll help you decide." selected={data.orderType === "not-sure"} onClick={() => update({ orderType: "not-sure" })} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {data.orderType === "transfers" ? "WHAT WILL YOU PRESS ONTO?" : "WHAT GARMENTS?"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {data.orderType === "transfers"
                    ? "Let us know what you'll be pressing onto so we can optimize the transfers."
                    : "Select the type of garment you'd like us to source and print."}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "tshirts", label: "T-Shirts", desc: "Crew necks, V-necks, and performance tees." },
                    { value: "hoodies", label: "Hoodies / Sweatshirts", desc: "Pullover and zip-up hoodies." },
                    { value: "tanks", label: "Tank Tops", desc: "Tanks and sleeveless shirts." },
                    { value: "hats", label: "Hats", desc: "DTF transfers applied to hats." },
                    { value: "bags", label: "Bags / Totes", desc: "Canvas bags, totes, and backpacks." },
                    { value: "other", label: "Other / Various", desc: "Tell us what you need in the notes." },
                  ].map((opt) => (
                    <OptionCard key={opt.value} label={opt.label} description={opt.desc} selected={data.garmentType === opt.value} onClick={() => update({ garmentType: opt.value })} />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">HOW MANY?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {data.orderType === "transfers"
                    ? "How many transfer sheets do you need?"
                    : "How many finished garments do you need?"}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "1-12", label: "1 – 12 Pieces", desc: "Small batch — samples or personal use." },
                    { value: "12-24", label: "12 – 24 Pieces", desc: "Small order — events or small teams." },
                    { value: "24-48", label: "24 – 48 Pieces", desc: "Mid-range — better pricing." },
                    { value: "48-96", label: "48 – 96 Pieces", desc: "Large order — volume discounts." },
                    { value: "96+", label: "96+ Pieces", desc: "Bulk — best pricing available." },
                    { value: "not-sure", label: "Not Sure Yet", desc: "We'll help you figure it out." },
                  ].map((opt) => (
                    <OptionCard key={opt.value} label={opt.label} description={opt.desc} selected={data.quantity === opt.value} onClick={() => update({ quantity: opt.value })} />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">UPLOAD YOUR ARTWORK</h3>
                <p className="mt-2 text-sm text-muted-foreground">DTF handles full-color artwork beautifully. Upload any format — PNG with transparency works best.</p>
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
                      <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, PDF, AI, EPS, or SVG (max 20MB)</span>
                      <input type="file" className="hidden" accept=".ai,.eps,.svg,.pdf,.png,.jpg,.jpeg" onChange={(e) => update({ artworkFile: e.target.files?.[0] || null })} />
                    </label>
                  )}
                </div>
                <ArtworkRightsCheckbox checked={data.artworkRights} onCheckedChange={(val) => update({ artworkRights: val })} />
                <div className="mt-6">
                  <Label htmlFor="artwork-notes" className="text-foreground">Artwork Notes (optional)</Label>
                  <Textarea id="artwork-notes" placeholder="Describe your design, sizes needed, placement, or any special instructions..." value={data.artworkNotes} onChange={(e) => update({ artworkNotes: e.target.value })} className="mt-2" rows={3} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">WHEN DO YOU NEED THEM?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Select a timeline for your DTF order.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <OptionCard label="Standard (2–3 Weeks)" description="Our normal production timeline. Best pricing." selected={data.timeline === "standard"} onClick={() => update({ timeline: "standard" })} />
                  <OptionCard label="Rush (1–2 Weeks)" description="Expedited production. Rush fee applies." selected={data.timeline === "rush"} onClick={() => update({ timeline: "rush" })} />
                  <OptionCard label="No Rush — Flexible" description="No firm deadline. We'll fit you in." selected={data.timeline === "flexible"} onClick={() => update({ timeline: "flexible" })} />
                  <OptionCard label="Need It ASAP!" description="The boss wanted them yesterday. Let's talk." selected={data.timeline === "asap"} onClick={() => update({ timeline: "asap" })} />
                </div>
              </div>
            )}

            {step === 5 && (
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

export default DTFQuoteBuilder;
