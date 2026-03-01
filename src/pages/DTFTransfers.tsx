import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryDtfMadHatter from "@/assets/gallery-dtf-madhatter.jpg";

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
                DTF TRANSFERS
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
                src={galleryDtfMadHatter}
                alt="Mad Hatter Grand Prix DTF transfer on t-shirt"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gang Sheet Builder */}
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
              Build your own gang sheets with our easy online tool. Upload your designs, arrange them on a sheet, and order — no minimums.
            </p>
            <ul className="mt-6 inline-flex flex-wrap justify-center gap-x-6 gap-y-2">
              {["Build your own layouts", "No minimum order", "You press them yourself"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button size="lg" className="gap-2" asChild>
                <a href="https://www.hellscanyondesigns.com" target="_blank" rel="noopener noreferrer">
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
