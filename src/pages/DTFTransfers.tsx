import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ExternalLink, Zap, Palette, Shield, Clock, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryDtfMadHatter from "@/assets/gallery-dtf-madhatter.jpg";
import galleryDtfIdaho from "@/assets/gallery-dtf-idaho.jpg";
import galleryDtfPrimal from "@/assets/gallery-dtf-primal.jpg";

const DTFTransfers = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 items-center md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-primary/20 border border-primary/30 px-3 py-1 font-heading text-xs font-semibold tracking-wider text-primary">
                EXPANDED GAMUT TECHNOLOGY
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
                DTF TRANSFERS
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Photo-quality, full-color transfers on virtually any fabric.
                Powered by our Super Gamut Hydra — a 9-color, 6-head expanded
                gamut machine delivering brand-accurate colors that standard CMYK
                printers simply can't match.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "9-Color Expanded Gamut",
                  "22\" Wide Sheets",
                  "9-Sec Instant Peel",
                  "Any Fabric",
                  "No Minimums",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={galleryDtfMadHatter}
                alt="Mad Hatter Grand Prix DTF transfer on t-shirt"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Evolution */}
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              4+ YEARS OF DTF INNOVATION
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We didn't just buy a DTF printer — we've lived and breathed this
              technology from the early days, upgrading relentlessly to stay at
              the bleeding edge.
            </p>
          </motion.div>

          <div className="relative mt-14">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  year: "2021",
                  title: "Epson F2100",
                  desc: "Started our DTF journey with the industry's go-to entry machine. Learned the craft, dialed in our processes, and began serving local businesses.",
                  status: "Where it started",
                },
                {
                  year: "2023",
                  title: "Mimaki TXF-150",
                  desc: "Upgraded to industrial-grade Mimaki quality for faster speeds, sharper detail, and the reliability to take on bigger orders.",
                  status: "Leveled up",
                },
                {
                  year: "2025",
                  title: "Super Gamut Hydra",
                  desc: "Our flagship — 9 colors, 6 print heads, expanded gamut technology with a matching production dryer. 22-inch wide gang sheets with colors no standard printer can touch.",
                  status: "Where we are now",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative rounded-lg border border-border bg-card p-6 text-center"
                >
                  <span className="inline-block rounded-full bg-primary/20 px-3 py-1 font-heading text-xs font-bold tracking-wider text-primary">
                    {step.year}
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
                    {step.status}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Advantage */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              WHY OUR DTF IS DIFFERENT
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The Hydra's expanded gamut technology uses 9 ink channels to hit
              colors that standard 4-color CMYK machines can only dream about.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Palette,
                title: "Brand-Accurate Color",
                desc: "9-color expanded gamut hits exact Pantone and brand colors. Your logo looks right — not 'close enough.'",
              },
              {
                icon: Zap,
                title: "9-Second Instant Peel",
                desc: "Press, peel, done. Lightning-fast 9-second instant peel with a 4-second post press means faster production and faster turnarounds.",
              },
              {
                icon: Shield,
                title: "Built to Last",
                desc: "OEKO-TEX safe inks that stretch and flex with the fabric without cracking, peeling, or fading. Wear it, wash it, repeat.",
              },
              {
                icon: Shirt,
                title: "Any Fabric, Any Color",
                desc: "Cotton, polyester, blends, nylon — light or dark garments. DTF works where other methods can't.",
              },
              {
                icon: Clock,
                title: "22\" Wide Gang Sheets",
                desc: "Our wide-format sheets let you maximize layouts and minimize cost per transfer. No minimums on transfer sheet orders.",
              },
              {
                icon: ExternalLink,
                title: "Photo-Quality Detail",
                desc: "Gradients, fine text, photo-realistic imagery — the Hydra reproduces detail that screen printing and vinyl can't touch.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <item.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              PERFECT FOR
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              DTF transfers are the most versatile decoration method we offer — ideal for just about anyone who needs custom prints.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Small Brands & Startups",
                desc: "Full-color prints with no minimums. Launch your brand without breaking the bank on setup fees.",
              },
              {
                title: "Sports Teams & Events",
                desc: "Jerseys, tournament shirts, event gear — vibrant, durable prints that hold up through every game.",
              },
              {
                title: "Businesses & Workwear",
                desc: "Company logos on polos, hi-vis vests, uniforms. Professional results on any fabric type.",
              },
              {
                title: "Promotional & Merch",
                desc: "Concert merch, fundraisers, giveaways — small runs or large orders with the same stunning quality.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              OUR DTF WORK
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: galleryDtfMadHatter, alt: "Mad Hatter Grand Prix DTF print" },
              { src: galleryDtfIdaho, alt: "Idaho themed DTF transfer" },
              { src: galleryDtfPrimal, alt: "Primal Instinct DTF print on apparel" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gang Sheet CTA */}
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              ORDER TRANSFER SHEETS
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Build your own gang sheets with our easy online tool. Upload your
              designs, arrange them on a 22" wide sheet, and order — no minimums.
            </p>
            <ul className="mt-6 inline-flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                "Build your own layouts",
                "No minimum order",
                "You press them yourself",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button size="lg" className="gap-2" asChild>
                <a
                  href="https://www.hellscanyondesigns.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Build Your Gang Sheet
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default DTFTransfers;
