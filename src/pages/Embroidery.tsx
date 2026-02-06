import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import serviceEmbroidery from "@/assets/service-embroidery.jpg";

const Embroidery = () => {
  return (
    <Layout>
      <section className="relative py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 items-center md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading text-sm font-medium tracking-[0.2em] text-primary">
                PROFESSIONAL QUALITY
              </p>
              <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
                CUSTOM EMBROIDERY
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Professional embroidery on hats, jackets, polos, and workwear.
                Multi-head machines ensure consistent, high-quality results for
                orders of any size.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Hats", "Jackets", "Polos", "Workwear", "Bags"].map((tag) => (
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
                src={serviceEmbroidery}
                alt="Embroidery machine stitching logo"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="quote" className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              REQUEST A QUOTE
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your embroidery project and get a custom quote.
            </p>
            <div className="mt-8 rounded-lg border border-border bg-card p-8 text-left">
              <p className="text-center text-muted-foreground">
                Guided quote builder coming soon — multi-step form for item type,
                quantities, embroidery locations, artwork, and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Embroidery;
