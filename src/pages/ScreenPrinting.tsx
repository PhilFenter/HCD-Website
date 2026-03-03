import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import { motion } from "framer-motion";
import ScreenPrintQuoteBuilder from "@/components/quote/ScreenPrintQuoteBuilder";
import ScreenPrintingGallery from "@/components/screen-printing/ScreenPrintingGallery";
import galleryScreenprintPress from "@/assets/gallery-screenprint-press.jpg";

const ScreenPrinting = () => {
  return (
    <Layout>
      <SEOHead
        title="Screen Printing in Lewiston & Clarkston (LC Valley) | HCD"
        description="Fast turnaround screen printing for LC Valley businesses, teams, and events. In-house production and consistent quality."
        canonicalPath="/screen-printing"
      />
      <ServiceJsonLd
        name="Screen Printing"
        description="Custom screen printing services for businesses, teams, and events in Lewiston, ID and Clarkston, WA."
        url="https://hcd-web-new.lovable.app/screen-printing"
      />
      <section className="relative py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 items-center md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading text-sm font-medium tracking-[0.2em] text-primary">
                INDUSTRIAL GRADE
              </p>
              <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
                SCREEN PRINTING
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Powered by our ROQ P-14XL automatic press with CTS (Computer to
                Screen) technology for precision and consistency. From simple
                one-color prints to complex multi-color designs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["T-Shirts", "Hoodies", "Tank Tops", "Long Sleeves", "Multi-Color"].map(
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
                src={galleryScreenprintPress}
                alt="ROQ automatic screen printing press in production"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment / Technology */}
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              OUR TECHNOLOGY
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We've invested in top-tier equipment so every print is sharp, consistent, and built to last.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "ROQ P-14XL Press",
                desc: "Automatic screen printing press with 14 plattens and 10 print heads. Features two Stampinators for exceptionally soft-hand prints and matte finishes.",
                features: ["Up to 10 colors", "Precise registration", "Two Stampinators"],
              },
              {
                title: "CTS Technology",
                desc: "Computer to Screen technology eliminates film positives. Direct digital exposure for sharper detail and faster setup.",
                features: ["Sharper detail", "Faster setup", "Digital precision"],
              },
              {
                title: "Quality Inks",
                desc: "Premium plastisol and water-based inks for vibrant, durable prints that hold up wash after wash.",
                features: ["Vibrant colors", "Wash-durable", "Eco-friendly options"],
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">{tech.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tech.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {tech.features.map((f) => (
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
      <ScreenPrintingGallery />

      {/* Quote Builder */}
      <section id="quote" className="border-t border-border py-20 md:py-28 scroll-mt-24">
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
              Walk through a few quick steps and we'll send you a custom screen printing quote within one business day.
            </p>
          </motion.div>

          <ScreenPrintQuoteBuilder />
        </div>
      </section>
    </Layout>
  );
};

export default ScreenPrinting;
