import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import FAQJsonLd from "@/components/FAQJsonLd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// Each section has a stable id so emails and the QR care card can link
// straight to it, e.g. /care#embroidery. Keep ids unchanged once printed.
const careSections = [
  {
    id: "screen-print",
    title: "SCREEN-PRINTED SHIRTS & HOODIES",
    steps: [
      "Turn inside out and wash cold on gentle.",
      "Tumble dry low or hang dry.",
      "No bleach, and skip fabric softener.",
      "Don't iron directly on the print.",
      "No dry cleaning.",
    ],
  },
  {
    id: "dtf",
    title: "DTF PRINTS",
    steps: [
      "Wait 24 hours before the first wash.",
      "Turn inside out and wash cold or warm.",
      "No bleach or fabric softener.",
      "Tumble dry low or hang dry.",
      "Don't iron directly on the print. If needed, iron inside out.",
    ],
  },
  {
    id: "embroidery",
    title: "EMBROIDERED POLOS, JACKETS & HOODIES",
    steps: [
      "Turn inside out and wash cold on gentle.",
      "No bleach.",
      "Tumble dry low or lay flat to dry.",
      "Iron from the back side with a cloth between the iron and the stitching.",
      "Snip a loose thread instead of pulling it.",
    ],
  },
  {
    id: "hats",
    title: "HATS (EMBROIDERED, PATCH & UV-PRINTED PATCH)",
    steps: [
      "Spot clean only, with a damp cloth and mild soap.",
      "No washing machine or dishwasher.",
      "Air dry on a rounded form (a rolled towel works) so it keeps its shape.",
      "UV-printed patches: wipe gently, with no harsh cleaners or scrubbing.",
    ],
  },
  {
    id: "leather-patch",
    title: "LEATHER PATCH HATS",
    steps: [
      "Keep the patch as dry as possible; wipe it with a barely damp cloth.",
      "Let it air dry away from heat.",
      "An occasional light leather conditioner keeps the patch from drying out.",
    ],
  },
  {
    id: "beanies",
    title: "BEANIES",
    steps: [
      "Hand wash cold, or machine wash cold on gentle inside a laundry bag.",
      "Lay flat to dry. Don't wring or hang.",
    ],
  },
];

const faqs = careSections.map((s) => ({
  question: `How do I wash ${s.title.toLowerCase()}?`,
  answer: s.steps.join(" "),
}));

const Care = () => {
  return (
    <Layout>
      <SEOHead
        title="Care Instructions | Hells Canyon Designs"
        description="How to wash and care for screen-printed shirts, DTF prints, embroidery, patch hats, leather patch hats, and beanies from Hells Canyon Designs."
        canonicalPath="/care"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div {...fade} className="text-center">
            <h1 className="font-heading text-5xl font-bold text-foreground md:text-7xl">
              MADE TO LAST.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A few simple steps keep your gear looking like the day you picked it up. Find your item below.
            </p>
          </motion.div>

          {/* Jump links */}
          <nav aria-label="Care sections" className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {careSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-md border border-border px-4 py-2 font-heading text-xs tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s.title.split(" (")[0]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-12">
            {careSections.map((s) => (
              <motion.div
                key={s.id}
                id={s.id}
                {...fade}
                className="scroll-mt-28 rounded-lg border border-border bg-card p-6 md:p-8"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  {s.title}
                </h2>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-lg leading-relaxed text-muted-foreground marker:text-primary">
                  {s.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.p {...fade} className="text-center text-lg leading-relaxed text-muted-foreground">
              Something not holding up the way it should? Call us at{" "}
              <a href="tel:+12087486242" className="text-primary hover:underline">(208) 748-6242</a> or email{" "}
              <a href="mailto:info@hellscanyondesigns.com" className="text-primary hover:underline">info@hellscanyondesigns.com</a>
              . We'll make it right.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-card py-20 md:py-28">
        <div className="container">
          <motion.div {...fade} className="text-center">
            <p className="mx-auto max-w-xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Ready for your next order? Your art is already on file.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/quote">
                Start a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Care;
