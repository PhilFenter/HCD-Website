import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import HatQuoteBuilder from "@/components/quote/HatQuoteBuilder";
import heroHats from "@/assets/hero-sewing-patch.jpg";

const CustomHats = () => {
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
              <p className="font-heading text-sm font-medium tracking-[0.2em] text-primary">
                OUR SIGNATURE SERVICE
              </p>
              <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
                CUSTOM LEATHER PATCH HATS
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                From laser-engraved leather to UV printed and embroidered patches —
                we craft premium custom hats that make your brand stand out. Choose
                from Richardson, YP Classics, and more, with over 4,000 hats in
                stock. 12 piece minimum order.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Laser Engraved Leather", "UV Printed", "Embroidered Patches", "Richardson 112", "YP Classics"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={heroHats}
                alt="Sewing a laser engraved leather patch onto a camo trucker hat"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patch types showcase */}
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              PATCH TYPES
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We offer multiple patch styles to match your brand's look and feel.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Laser Engraved Leather",
                desc: "Our most popular option. Genuine leather patches precision-engraved with your logo for a rugged, premium look that lasts.",
                features: ["Genuine leather", "Incredible detail", "Classic & durable"],
              },
              {
                title: "UV Printed Patches",
                desc: "Full-color UV printing directly on leather or leatherette. Perfect for detailed logos, gradients, and photo-realistic designs.",
                features: ["Full color", "Photo quality", "Vibrant detail"],
              },
              {
                title: "Embroidered Patches",
                desc: "Traditional embroidered patches sewn onto your hats. Vibrant thread colors and a classic textile look.",
                features: ["Vibrant colors", "Classic look", "Sewn-on"],
              },
            ].map((patch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {patch.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {patch.desc}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {patch.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust callout */}
      <section className="border-t border-border py-12">
        <div className="container flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-12">
          {[
            { value: "4,000+", label: "Hats in Stock" },
            { value: "100+", label: "Five-Star Reviews" },
            { value: "1 Day", label: "Quote Turnaround" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="font-heading text-2xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Builder */}
      <section id="quote" className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              REQUEST A QUOTE
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Walk through a few quick steps and we'll send you a custom quote
              within one business day. No obligation.
            </p>
          </motion.div>

          <HatQuoteBuilder />
        </div>
      </section>
    </Layout>
  );
};

export default CustomHats;
