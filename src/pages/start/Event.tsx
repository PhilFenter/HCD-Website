import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EventIntakeForm from "@/components/event/EventIntakeForm";
import serviceHats from "@/assets/service-hats.jpg";
import galleryScreenprintShirt from "@/assets/gallery-screenprint-shirt.jpg";
import embroideryHops from "@/assets/gallery-embroidery-hops.jpg";
import graceBuildersHat from "@/assets/gallery-grace-builders-hat.jpg";
import embroideryHops from "@/assets/gallery-embroidery-hops.jpg";
import graceBuildersHat from "@/assets/gallery-grace-builders-hat.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const products = [
  {
    title: "Event T-Shirts",
    description:
      "Screen printed shirts for car shows, fundraisers, and corporate events. Fast turnarounds when your date is locked in.",
    image: galleryScreenprintShirt,
    link: "/screen-printing",
  },
  {
    title: "Event Hats",
    description:
      "Custom hats with leather patches, embroidery, or UV prints — perfect for giveaways, merch tables, and VIP swag.",
    image: serviceHats,
    link: "/custom-hats",
  },
  {
    title: "Hoodies & Layers",
    description:
      "Branded hoodies, quarter zips, and polos for staff, volunteers, or attendees.",
    image: embroideryHops,
    link: "/embroidery",
  },
];

const Event = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <SEOHead
        title="Event & Promotion Apparel | Hells Canyon Designs"
        description="Custom t-shirts, hats, and branded apparel for events, promotions, and fundraisers. Fast turnarounds when your date is locked in."
        canonicalPath="/start/event"
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <motion.p
            {...fadeUp}
            className="mb-6 font-heading text-xs font-medium tracking-[0.25em] text-primary"
          >
            FOR EVENTS & PROMOTIONS
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            TELL US ABOUT YOUR EVENT.
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Whether it&apos;s a car show, a fundraiser, or a company meeting — we
            help you show up ready.
          </motion.p>
        </div>
      </section>

      <EventIntakeForm onSubmitted={() => setSubmitted(true)} />

      {!submitted && (
        <>

      <section className="py-20 md:py-24">
        <div className="container max-w-5xl">
          <motion.h2
            {...fadeUp}
            className="mb-16 text-center font-heading text-xs font-medium tracking-[0.25em] text-primary"
          >
            POPULAR FOR EVENTS
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  to={product.link}
                  className="group block overflow-hidden rounded-xl border border-border/60 bg-card/60 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-primary/80">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container max-w-4xl">
          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-xl border border-primary/20 bg-card/80"
          >
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2">
                <img
                  src={graceBuildersHat}
                  alt="Grace Builders custom team hats"
                  className="aspect-[4/3] h-full w-full object-cover md:aspect-auto"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-10">
                <p className="mb-4 font-heading text-xs font-medium tracking-[0.25em] text-primary">
                  PARTNER STORY
                </p>
                <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                  Just grab what you think and make them cool.
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  That&apos;s what Grace Builders told us — and it turned into a
                  long-term, trust-based relationship built on making their crew
                  look right.
                </p>
                <Link
                  to="/stories/make-them-cool"
                  className="mt-6 inline-flex items-center gap-1 font-heading text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Read the full story <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Event;
