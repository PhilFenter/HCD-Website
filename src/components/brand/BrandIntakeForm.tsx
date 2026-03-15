import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OptionCard from "@/components/quote/OptionCard";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { submitQuoteRequest } from "@/lib/submitQuote";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const artworkOptions = [
  { value: "ready", label: "Yes, artwork is ready" },
  { value: "working", label: "I have something to work from" },
  { value: "scratch", label: "Starting from scratch" },
];

const timelineOptions = [
  { value: "hard-date", label: "I have a hard date" },
  { value: "30-days", label: "Within 30 days" },
  { value: "flexible", label: "Flexible timing" },
];

const BrandIntakeForm = () => {
  // Brand questions
  const [brandDoes, setBrandDoes] = useState("");
  const [success, setSuccess] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [orderedBefore, setOrderedBefore] = useState(false);
  const [priorExperience, setPriorExperience] = useState("");
  const [artworkStatus, setArtworkStatus] = useState("");
  const [timeline, setTimeline] = useState("");

  // Contact fields
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const noteLines = [
      "Brand Builder Intake — Hats and Branded Gear",
      "",
      `What does your brand do: ${brandDoes}`,
      `What does success look like: ${success}`,
      `Years in business: ${yearsInBusiness}`,
      `Team size: ${teamSize}`,
      `Ordered before: ${orderedBefore ? "Yes" : "No"}`,
      orderedBefore && priorExperience ? `Prior experience: ${priorExperience}` : null,
      `Artwork status: ${artworkStatus}`,
      `Timeline: ${timeline}`,
    ].filter(Boolean).join("\n");

    const details = {
      situation: "Hats and branded gear",
      brand_does: brandDoes,
      success_looks_like: success,
      years_in_business: yearsInBusiness,
      team_size: teamSize,
      ordered_before: orderedBefore ? "yes" : "no",
      ...(orderedBefore && priorExperience ? { prior_experience: priorExperience } : {}),
      artwork_status: artworkStatus,
      timeline: timeline,
    };

    try {
      await submitQuoteRequest({
        serviceType: "other",
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        company: customerCompany,
        notes: noteLines,
        details,
      });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or call us at 208-748-6242.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-24">
      <div className="container max-w-2xl">
        <motion.div {...fadeUp}>
          <div className="rounded-xl border border-primary/20 bg-card/80 p-8 md:p-12">
            <p className="font-heading text-xs font-medium tracking-[0.25em] text-primary mb-4">
              TELL US ABOUT YOUR BRAND.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-12">
              A few quick questions help us point you in the right direction and
              make sure we are set up to do our best work for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Contact Fields */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Your name *
                </Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  required
                  className="border-border/60 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Email address *
                </Label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="border-border/60 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Phone number
                </Label>
                <Input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(208) 555-1234"
                  className="border-border/60 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Company name
                </Label>
                <Input
                  value={customerCompany}
                  onChange={(e) => setCustomerCompany(e.target.value)}
                  placeholder="Optional"
                  className="border-border/60 bg-background/50"
                />
              </div>

              {/* Q1 */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  What does your brand do?
                </Label>
                <Input
                  value={brandDoes}
                  onChange={(e) => setBrandDoes(e.target.value)}
                  placeholder="Tell us in a sentence or two"
                  maxLength={200}
                  className="border-border/60 bg-background/50"
                />
              </div>

              {/* Q2 */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  What does success look like for this project?
                </Label>
                <Textarea
                  value={success}
                  onChange={(e) => setSuccess(e.target.value)}
                  placeholder="What would make you walk away happy?"
                  maxLength={500}
                  className="border-border/60 bg-background/50 min-h-[100px]"
                />
              </div>

              {/* Q3 */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  How long have you been in business?
                </Label>
                <Select value={yearsInBusiness} onValueChange={setYearsInBusiness}>
                  <SelectTrigger className="border-border/60 bg-background/50">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="just-starting">Just starting out</SelectItem>
                    <SelectItem value="1-3-years">1 to 3 years</SelectItem>
                    <SelectItem value="3-plus-years">3 or more years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Q4 */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  How many people are on your team?
                </Label>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger className="border-border/60 bg-background/50">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="just-me">Just me</SelectItem>
                    <SelectItem value="2-10">2 to 10</SelectItem>
                    <SelectItem value="11-50">11 to 50</SelectItem>
                    <SelectItem value="50-plus">50 or more</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Q5 */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Have you ordered branded gear before?
                </Label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={orderedBefore}
                    onCheckedChange={setOrderedBefore}
                  />
                  <span className="text-sm text-muted-foreground">
                    {orderedBefore ? "Yes" : "No"}
                  </span>
                </div>
                {orderedBefore && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-2"
                  >
                    <Input
                      value={priorExperience}
                      onChange={(e) => setPriorExperience(e.target.value)}
                      placeholder="How was that experience?"
                      maxLength={300}
                      className="border-border/60 bg-background/50"
                    />
                  </motion.div>
                )}
              </div>

              {/* Q6 */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  Do you have artwork ready?
                </Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {artworkOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      selected={artworkStatus === opt.value}
                      onClick={() => setArtworkStatus(opt.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Q7 */}
              <div className="space-y-3">
                <Label className="font-heading text-sm font-semibold text-foreground">
                  When do you need it?
                </Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {timelineOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      selected={timeline === opt.value}
                      onClick={() => setTimeline(opt.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Submit / Thank You */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg border border-primary/20 bg-card p-8 text-center"
                >
                  <CheckCircle className="mx-auto h-10 w-10 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    We got your project details.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Expect to hear from us within one business day.
                  </p>
                </motion.div>
              ) : (
                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Start My Brand Project
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandIntakeForm;
