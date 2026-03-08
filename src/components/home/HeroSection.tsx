import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-leather-patches.jpg";
import serviceHats from "@/assets/hero-sewing-patch.jpg";
import servicePatches from "@/assets/gallery-leather-patch-flag.jpg";
import serviceGarments from "@/assets/quote-garments.jpg";

const products = [
  {
    key: "hats",
    title: "Leather Patch Hats",
    subtitle: "Custom leather patches on premium hat brands.",
    image: serviceHats,
  },
  {
    key: "patches",
    title: "Wholesale Patches",
    subtitle: "Loose patches for hat makers, retailers & brands.",
    image: servicePatches,
  },
  {
    key: "apparel",
    title: "Custom Apparel",
    subtitle: "Screen print, DTF, or embroidery on any garment.",
    image: serviceGarments,
    imagePosition: "object-top",
  },
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Collection of custom laser engraved leather patches"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-bold text-primary sm:text-4xl md:text-6xl lg:text-7xl"
          >
            HELLS CANYON DESIGNS
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 font-heading text-base font-medium tracking-[0.2em] text-muted-foreground sm:text-lg md:text-xl"
          >
            CRAFTED IN IDAHO · SHIPPED NATIONWIDE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl"
          >
            BUILD YOUR ORDER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Pick a product, fill out the details, and we'll get to work.
          </motion.p>

          {/* Product cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 grid w-full max-w-4xl gap-5 sm:grid-cols-3"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
              >
                <Link
                  to={`/quote?product=${product.key}`}
                  className="group block overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur-sm text-left transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${product.imagePosition || ""}`}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {product.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
