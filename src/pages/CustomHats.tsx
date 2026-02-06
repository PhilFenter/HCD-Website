import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import serviceHats from "@/assets/service-hats.jpg";

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
                stock.
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
                src={serviceHats}
                alt="Custom leather patch hat close-up"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote form placeholder */}
      <section id="quote" className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              REQUEST A QUOTE
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your project and we'll get back to you with a custom
              quote within one business day.
            </p>
            <div className="mt-8 rounded-lg border border-border bg-card p-8 text-left">
              <p className="text-center text-muted-foreground">
                Guided quote builder coming soon — multi-step form for patch type,
                hat style, quantities, artwork upload, and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CustomHats;
