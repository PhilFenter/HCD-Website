import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import EmbroideryQuoteBuilder from "@/components/quote/EmbroideryQuoteBuilder";
import EmbroideryGallery from "@/components/embroidery/EmbroideryGallery";
import galleryEmbroideryMachine from "@/assets/gallery-embroidery-machine.jpg";

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
                src={galleryEmbroideryMachine}
                alt="Barudan multi-head embroidery machine in production"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              CAPABILITIES
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our multi-head embroidery machines handle everything from simple logos to complex multi-color designs.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Multi-Head Production",
                desc: "High-speed multi-head machines run multiple garments simultaneously for consistent results and fast turnarounds.",
                features: ["Consistent quality", "Fast production", "High volume capable"],
              },
              {
                title: "Wide Format Range",
                desc: "From small left-chest logos to large jacket backs. Specialty hoops for hats, bags, and awkward placements.",
                features: ["Hat embroidery", "Large back designs", "Specialty hoops"],
              },
              {
                title: "Digitization Services",
                desc: "Don't have an embroidery-ready file? We'll digitize your artwork for optimal stitch quality.",
                features: ["Logo cleanup", "Stitch optimization", "Color matching"],
              },
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {cap.features.map((f) => (
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

      {/* Gallery */}
      <EmbroideryGallery />

      {/* Quote Builder */}
      <section id="quote" className="border-t border-border py-20 md:py-28">
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
              Walk through a few quick steps and we'll send you a custom embroidery quote within one business day.
            </p>
          </motion.div>

          <EmbroideryQuoteBuilder />
        </div>
      </section>
    </Layout>
  );
};

export default Embroidery;
