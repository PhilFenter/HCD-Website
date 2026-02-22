import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-leather-patches.jpg";

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
            className="mt-8 font-heading text-4xl font-bold leading-tight text-foreground md:text-6xl"
          >
            YOUR BRAND,
            <br />
            <span className="text-gradient-gold">OUR CRAFT</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Custom leather patch hats, embroidery, screen printing & DTF
            transfers — crafted in Idaho, shipped to your door anywhere in the U.S.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" asChild className="text-base font-heading tracking-wide">
              <Link to="/quote">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base font-heading tracking-wide">
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
