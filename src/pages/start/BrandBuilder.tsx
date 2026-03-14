import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import seekinsHat from "@/assets/gallery-seekins-two-hats.jpg";
import serviceHats from "@/assets/service-hats.jpg";
import serviceEmbroidery from "@/assets/service-embroidery.jpg";
import heroLeatherPatches from "@/assets/hero-leather-patches.jpg";
import uvPatchLcstate from "@/assets/gallery-uv-patch-lcstate.jpg";
import BrandIntakeForm from "@/components/brand/BrandIntakeForm";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const products = [
  {
    title: "Leather Patch Hats",
    description:
      "Laser engraved or UV printed patches on premium hat brands. The most requested item for brands building identity.",
    image: heroLeatherPatches,
    link: "/custom-hats",
  },
  {
    title: "UV Printed Patch Hats",
    description:
      "Full color, photo-quality patches. Perfect for complex logos and artwork.",
    image: uvPatchLcstate,
    link: "/custom-hats",
  },
  {
    title: "Custom Apparel",
    description:
      "Shirts, hoodies, and workwear decorated to match your brand.",
    image: serviceEmbroidery,
    link: "/embroidery",
  },
];

const BrandBuilder = () => {
  return (
    <Layout>
      <SEOHead
        title="Brand Builder — Custom Hats & Apparel for Your Brand | Hells Canyon Designs"
        description="We help brands build identity through custom hats, leather patches, and decorated apparel. From first order to full product line."
        canonicalPath="/start/brand-builder"
      />

      {/* Section 1 — Opening Statement */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <motion.p
            {...fadeUp}
            className="font-heading text-xs font-medium tracking-[0.25em] text-primary mb-6"
          >
            FOR BRAND BUILDERS
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            BRAND BUILDERS ARE OUR FAVORITE PROJECTS.
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            You have a vision for how your brand should look and feel. We have
            spent years helping brands like yours get it right — from the first
            hat to a full product line.
          </motion.p>
        </div>
      </section>

      {/* Section 2 — Brand Intake Form */}
      <BrandIntakeForm />

      {/* Section 3 — Where Most Brands Start */}
      <section className="py-20 md:py-24">
        <div className="container max-w-5xl">
          <motion.h2
            {...fadeUp}
            className="text-center font-heading text-xs font-medium tracking-[0.25em] text-primary mb-16"
          >
            WHERE MOST BRANDS START
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

      {/* Section 4 — Partner Story Callout */}
      <section className="py-10 md:py-16">
        <div className="container max-w-4xl">
          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-xl border border-primary/20 bg-card/80"
          >
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2">
                <img
                  src={seekinsHat}
                  alt="Seekins Precision custom hats"
                  className="h-full w-full object-cover aspect-[4/3] md:aspect-auto"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:col-span-3 md:p-10 flex flex-col justify-center">
                <p className="font-heading text-xs font-medium tracking-[0.25em] text-primary mb-4">
                  PARTNER STORY
                </p>
                <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                  A precision manufacturer needed 600 hats by Friday. It was
                  Monday morning.
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We said sure — just come pick a color. That was years ago.
                  Now they text us and we send an invoice.
                </p>
                <Link
                  to="/stories/seekins"
                  className="mt-6 inline-flex items-center gap-1 font-heading text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Read the full story <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="border-t border-primary/30 bg-secondary py-20">
        <div className="container max-w-2xl text-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-xs font-medium tracking-[0.25em] text-primary mb-6">
              READY TO START?
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Tell us about your brand and what you are building.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We'll point you in the right direction.
            </p>
            <Button asChild variant="cta" size="lg" className="mt-10">
              <Link to="/quote?situation=Building+a+brand">
                Start Your Brand Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BrandBuilder;
