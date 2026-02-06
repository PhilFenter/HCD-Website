import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceDtf from "@/assets/service-dtf.jpg";

const DTFTransfers = () => {
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
              <span className="inline-block rounded-full bg-primary/20 border border-primary/30 px-3 py-1 font-heading text-xs font-semibold tracking-wider text-primary">
                NEW SERVICE
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
                DTF TRANSFERS & GARMENTS
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Direct-to-Film transfers deliver photo-quality, full-color prints
                on virtually any fabric. No color limits, no minimums on transfer
                sheets, incredible detail — perfect for brands that want to stand
                out.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Full Color", "Photo Quality", "Any Fabric", "No Color Limits", "Gang Sheets"].map(
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
                src={serviceDtf}
                alt="DTF transfer on garment"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Custom garments path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-card p-8"
            >
              <h3 className="font-heading text-2xl font-bold text-foreground">
                CUSTOM DTF GARMENTS
              </h3>
              <p className="mt-3 text-muted-foreground">
                We print it for you. Choose your garment, upload your design, and
                we handle the rest — from printing the transfer to pressing it on
                your garments.
              </p>
              <Button className="mt-6" asChild>
                <a href="#quote">Request a Quote</a>
              </Button>
            </motion.div>

            {/* Gang sheet builder path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-primary/30 bg-primary/5 p-8"
            >
              <h3 className="font-heading text-2xl font-bold text-foreground">
                GANG SHEET BUILDER
              </h3>
              <p className="mt-3 text-muted-foreground">
                Order DTF transfer sheets directly — build your own gang sheets
                with our easy online tool. Upload your designs, arrange them on a
                sheet, and order.
              </p>
              <Button variant="outline" className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                <a href="https://www.hellscanyondesigns.com" target="_blank" rel="noopener noreferrer">
                  Build Your Gang Sheet
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="quote" className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              REQUEST A DTF QUOTE
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your DTF project and get a custom quote.
            </p>
            <div className="mt-8 rounded-lg border border-border bg-card p-8 text-left">
              <p className="text-center text-muted-foreground">
                Guided quote builder coming soon — choose between finished garments
                or loose transfers, garment type, quantities, artwork, and
                timeline.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DTFTransfers;
