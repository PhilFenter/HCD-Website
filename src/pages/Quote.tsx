import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeatherPatchHatForm from "@/components/quote/LeatherPatchHatForm";
import WholesalePatchForm from "@/components/quote/WholesalePatchForm";
import CustomApparelForm from "@/components/quote/CustomApparelForm";

import serviceHats from "@/assets/hero-sewing-patch.jpg";
import servicePatches from "@/assets/gallery-leather-patch-flag.jpg";
import serviceGarments from "@/assets/quote-garments.jpg";

type ProductKey = "hats" | "apparel";

const products: {
  key: ProductKey;
  title: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
}[] = [
  {
    key: "hats",
    title: "Custom Headwear",
    subtitle: "Leather patch hats, embroidered caps, and UV printed designs on premium hat brands.",
    image: serviceHats,
  },
  {
    key: "apparel",
    title: "Custom Apparel",
    subtitle: "T-shirts, hoodies, work & team wear, and outerwear.",
    image: serviceGarments,
    imagePosition: "object-top",
  },
];

const formMap: Record<ProductKey, React.ReactNode> = {
  hats: <LeatherPatchHatForm />,
  apparel: <CustomApparelForm />,
};

const validKeys: ProductKey[] = ["hats", "apparel"];

const Quote = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<ProductKey | null>(null);

  // Read ?product= on mount
  useEffect(() => {
    const param = searchParams.get("product") as ProductKey | null;
    if (param && validKeys.includes(param)) {
      setSelected(param);
    }
  }, []);

  const handleSelect = (key: ProductKey) => {
    setSelected(key);
    setSearchParams({ product: key });
  };

  const handleBack = () => {
    setSelected(null);
    setSearchParams({});
  };

  return (
    <Layout>
      <SEOHead
        title="Build Your Order — Hats, Patches & Apparel | HCD"
        description="Pick a product and build your order. Custom leather patch hats, wholesale patches, or decorated apparel — crafted in Idaho."
        canonicalPath="/quote"
      />
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
                    BUILD YOUR ORDER
                  </h1>
                  <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Pick a product and fill out the details — we'll get to work.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product, i) => (
                    <motion.button
                      key={product.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => handleSelect(product.key)}
                      className="group relative overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${product.imagePosition || ""}`}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {product.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {product.subtitle}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to products
                </Button>

                <div className="mb-10 text-center">
                  <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                    {products.find((p) => p.key === selected)?.title.toUpperCase()}
                  </h2>
                </div>

                {formMap[selected]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Quote;
