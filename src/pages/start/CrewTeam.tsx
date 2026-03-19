import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CrewTeamIntakeForm from "@/components/crew/CrewTeamIntakeForm";
import serviceHats from "@/assets/service-hats.jpg";
import embroideryHops from "@/assets/gallery-embroidery-hops.jpg";
import galleryScreenprintShirt from "@/assets/gallery-screenprint-shirt.jpg";
import graceBuildersHat from "@/assets/gallery-grace-builders-hat.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const products = [
  {
    title: "Crew Shirts",
    description:
      "Screen printed and decorated shirts that keep crews looking consistent on the job, at events, and in the field.",
    image: galleryScreenprintShirt,
    link: "/screen-printing",
  },
  {
    title: "Team Hats",
    description:
      "Structured caps, leather patches, and embroidered hats that make your crew look sharp without feeling uniform-store generic.",
    image: serviceHats,
    link: "/custom-hats",
  },
  {
    title: "Outerwear & Layers",
    description:
      "Quarter zips, polos, hoodies, and jackets for teams that need to stay polished across seasons and job sites.",
    image: embroideryHops,
    link: "/embroidery",
  },
];

const CrewTeam = () => {
  return (
    <Layout>
      <SEOHead
        title="Crew Team Apparel | Hells Canyon Designs"
        description="Custom shirts, hats, and branded apparel for crews and teams that need to look consistent, professional, and ready to work."
        canonicalPath="/start/crew-team"
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <motion.p
            {...fadeUp}
            className="mb-6 font-heading text-xs font-medium tracking-[0.25em] text-primary"
          >
            FOR CREWS & TEAMS
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            LET&apos;S GET YOUR CREW LOOKING RIGHT.
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Whether it&apos;s ten people or two hundred, we help teams show up looking
            consistent, professional, and proud of what they represent.
          </motion.p>
        </div>
      </section>

      <CrewTeamIntakeForm />

      <section className="py-20 md:py-24">
        <div className="container max-w-5xl">
          <motion.h2
            {...fadeUp}
            className="mb-16 text-center font-heading text-xs font-medium tracking-[0.25em] text-primary"
          >
            WHERE MOST CREWS START
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
                  That&apos;s what Grace Builders told us — and it turned into a long-term,
                  trust-based relationship built on making their crew look right.
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

export default CrewTeam;
