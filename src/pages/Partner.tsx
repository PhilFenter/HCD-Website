import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Store, HardHat, Shirt, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitQuoteRequest } from "@/lib/submitQuote";
import { useToast } from "@/hooks/use-toast";

const fade = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const stagger = (i: number) => ({
  ...fade,
  transition: { ...fade.transition, delay: 0.08 * i },
});

const proofCards = [
  {
    headline: "Text Us. We Handle It.",
    body: "A precision manufacturer sends a text when they need hats. We send an invoice and get to work. No back and forth, no delays. That is what a mature partnership looks like.",
  },
  {
    headline: "We Caught It Before You Knew.",
    body: "When a jacket arrived with the wrong embroidery we caught it, sourced a replacement overnight, and had it ready the next day. Proactive problem catching is part of what we do.",
  },
  {
    headline: "A Store That Runs Itself.",
    body: "A regional health system needed a company store their employees would actually use. We built it. Now it fulfills orders in days and runs without anyone chasing it.",
  },
];

const howItWorks = [
  "You approve the products and pricing",
  "We build and manage the store",
  "Employees order on their own schedule",
  "We fulfill and ship directly",
];

const qualificationQuestions = [
  "How many employees will have access to the store?",
  "What is your expected monthly order volume?",
  "Do you have a per-employee budget or gift card allowance in mind?",
  "What is your fulfillment timeline expectation?",
];

const programs = [
  {
    icon: HardHat,
    title: "Hat Programs",
    desc: "Your preferred styles, colors, and patches on file. Reorder fast.",
  },
  {
    icon: Shirt,
    title: "Uniform Programs",
    desc: "Consistent decorated apparel for your whole team, season after season.",
  },
  {
    icon: Scissors,
    title: "Embroidery Programs",
    desc: "Polos, jackets, and workwear with your logo. Consistent results every time.",
  },
];

const Partner = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    situation: "",
  });

  const canSubmit =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.situation.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      await submitQuoteRequest({
        serviceType: "other",
        source: "website-partner",
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.organization,
        notes: form.situation,
        details: {
          organization: form.organization,
          situation: form.situation,
        },
      });
      setSubmitted(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description:
          "Please try again or call us at 208-748-6242.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <Layout>
      <SEOHead
        title="Partner With Us | Company Stores & Ongoing Programs | Hells Canyon Designs"
        description="HCD runs company stores, hat programs, and uniform programs for regional businesses. Built for the long term. Let us handle the details."
        canonicalPath="/partner"
      />

      {/* ── Hero ── */}
      <section className="py-28 md:py-40">
        <div className="container">
          <motion.div {...fade} className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl lg:text-7xl" style={{ lineHeight: 1.05 }}>
              BUILT FOR THE LONG TERM.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Some of our best relationships started with a single order. Here is what they look like a few years in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Proof Points ── */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {proofCards.map((card, i) => (
              <motion.div
                key={card.headline}
                {...stagger(i)}
                className="rounded-lg border border-border bg-card p-8 shadow-md shadow-black/20"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-primary" />
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {card.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Stores ── */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="container">
          <motion.div {...fade} className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              COMPANY STORES.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We set it up. Your employees order on their own. You never chase down sizes again. We have run stores for regional healthcare systems, industrial suppliers, and corporate teams. The first ones taught us hard lessons about volume and fulfillment timelines. Now we ask the right questions upfront — because a store that works for your employees is only valuable if it actually works.
            </p>
          </motion.div>

          {/* How it works grid */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item}
                {...stagger(i)}
                className="flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Qualification questions */}
          <motion.div {...fade} className="mx-auto mt-16 max-w-3xl">
            <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
              WHAT WE NEED TO GET STARTED
            </h3>
            <ul className="mt-6 space-y-3">
              {qualificationQuestions.map((q) => (
                <li key={q} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-base">{q}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base italic text-primary">
              We ask these questions because we learned what happens when we skip them. You benefit from that education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Ongoing Programs ── */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="container">
          <motion.div {...fade} className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              ONGOING PROGRAMS.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Beyond company stores we run hat programs, uniform programs, and embroidery programs for businesses that order regularly. We remember your specs. We keep your preferred styles in mind. You never start from scratch. When you are ready to reorder, reach out and we get to work.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.title}
                {...stagger(i)}
                className="rounded-lg border border-border bg-card p-6 text-center shadow-md shadow-black/20"
              >
                <prog.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {prog.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {prog.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tristate Story Callout ── */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="container">
          <motion.div
            {...fade}
            className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 shadow-lg shadow-black/20 md:p-12"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              From Near Disaster to a Store That Runs Itself.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A regional health system gave every employee a $30 gift card for their new company store. We processed over 600 individual orders in 45 days. It nearly broke us. What we learned became the foundation for every store we have run since.
            </p>
            <Link
              to="/stories/tristate"
              className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Read the full story <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA + Form ── */}
      <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
        <div className="container">
          <motion.div {...fade} className="mx-auto max-w-2xl">
            <h2 className="text-center font-heading text-3xl font-bold text-foreground md:text-4xl" style={{ lineHeight: 1.1 }}>
              LET US TALK ABOUT A LONG TERM RELATIONSHIP.
            </h2>
            <p className="mt-4 text-center text-base text-muted-foreground">
              Tell us about your organization and what you are looking for. This is a conversation, not a form.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 rounded-lg border border-primary/30 bg-card p-8 text-center"
              >
                <Check className="mx-auto h-10 w-10 text-primary" />
                <p className="mt-4 text-lg font-medium text-foreground">
                  We got your message.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Expect to hear from us within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-12 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="partner-name">Name *</Label>
                    <Input
                      id="partner-name"
                      value={form.name}
                      onChange={update("name")}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-email">Email *</Label>
                    <Input
                      id="partner-email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="partner-phone">Phone</Label>
                    <Input
                      id="partner-phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="(208) 555-0100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-org">Organization</Label>
                    <Input
                      id="partner-org"
                      value={form.organization}
                      onChange={update("organization")}
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner-situation">Tell us about your situation *</Label>
                  <Textarea
                    id="partner-situation"
                    value={form.situation}
                    onChange={update("situation")}
                    required
                    rows={5}
                    placeholder="What are you looking for? Company store, ongoing program, something else?"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!canSubmit || submitting}
                  className="w-full sm:w-auto"
                >
                  {submitting ? "Sending…" : "Start The Conversation →"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Partner;
