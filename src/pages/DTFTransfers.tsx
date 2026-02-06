import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import DTFQuoteBuilder from "@/components/quote/DTFQuoteBuilder";
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
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              TWO WAYS TO ORDER
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Need finished garments or just the transfer sheets? We've got both options covered.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
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
              <ul className="mt-4 space-y-2">
                {["We source the garments", "Full-color photo quality", "Ready to wear / sell"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6" asChild>
                <a href="#quote">Request a Quote</a>
              </Button>
            </motion.div>

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
              <ul className="mt-4 space-y-2">
                {["Build your own layouts", "No minimum order", "You press them yourself"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
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
              REQUEST A DTF QUOTE
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Walk through a few quick steps and we'll send you a custom DTF quote within one business day.
            </p>
          </motion.div>

          <DTFQuoteBuilder />
        </div>
      </section>
    </Layout>
  );
};

export default DTFTransfers;
