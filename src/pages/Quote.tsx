import { useState } from "react";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import HatQuoteBuilder from "@/components/quote/HatQuoteBuilder";
import DTFQuoteBuilder from "@/components/quote/DTFQuoteBuilder";
import GarmentQuoteBuilder from "@/components/quote/GarmentQuoteBuilder";

import serviceHats from "@/assets/hero-sewing-patch.jpg";
import serviceDtf from "@/assets/gallery-dtf-primal.jpg";
import serviceGarments from "@/assets/gallery-screenprint-thunder.jpg";

type ServiceKey = "hats" | "dtf" | "garments";

const services: {
  key: ServiceKey;
  title: string;
  subtitle: string;
  image: string;
  minimum: string;
}[] = [
  {
    key: "hats",
    title: "Custom Leather Patch Hats",
    subtitle: "Laser engraved, UV printed & embroidered patches",
    image: serviceHats,
    minimum: "12 piece minimum",
  },
  {
    key: "garments",
    title: "Custom Apparel & Garments",
    subtitle: "T-shirts, hoodies, polos, jackets & safety gear — screen print, DTF, or embroidery",
    image: serviceGarments,
    minimum: "12 piece minimum",
  },
  {
    key: "dtf",
    title: "DTF Transfers",
    subtitle: "Full-color photo-quality transfers on any fabric",
    image: serviceDtf,
    minimum: "No minimum on sheets",
  },
];

const builderMap: Record<ServiceKey, React.ReactNode> = {
  hats: <HatQuoteBuilder />,
  dtf: <DTFQuoteBuilder />,
  garments: <GarmentQuoteBuilder />,
};

const Quote = () => {
  const [selected, setSelected] = useState<ServiceKey | null>(null);

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-12 text-center">
                  <p className="font-heading text-sm font-medium tracking-[0.2em] text-primary">
                    GET STARTED
                  </p>
                  <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
                    REQUEST A FREE QUOTE
                  </h1>
                  <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Select a service below and walk through a few quick steps.
                    We'll send you a custom quote within one business day.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((svc, i) => (
                    <motion.button
                      key={svc.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setSelected(svc.key)}
                      className="group relative overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {svc.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {svc.subtitle}
                        </p>
                        <span className="mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                          {svc.minimum}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="builder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelected(null)}
                  className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to services
                </Button>

                <div className="mb-10 text-center">
                  <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                    {services.find((s) => s.key === selected)?.title.toUpperCase()}
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Walk through a few quick steps and we'll send you a custom
                    quote within one business day.
                  </p>
                </div>

                {builderMap[selected]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Quote;
