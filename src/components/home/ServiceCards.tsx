import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import serviceHats from "@/assets/gallery-leather-patch-flag.jpg";
import serviceEmbroidery from "@/assets/gallery-embroidered-patch.jpg";
import serviceScreenprint from "@/assets/gallery-screenprint-thunder.jpg";
import serviceDtf from "@/assets/gallery-dtf-madhatter.jpg";

const services = [
  {
    title: "Custom Leather Patch Hats",
    description: "Laser engraved, UV printed & embroidered patches on premium hat brands.",
    image: serviceHats,
    path: "/custom-hats",
    badge: "Most Popular",
  },
  {
    title: "Embroidery",
    description: "Professional embroidery on hats, jackets, polos, and workwear.",
    image: serviceEmbroidery,
    path: "/embroidery",
  },
  {
    title: "Screen Printing",
    description: "High-quality screen printing with our ROQ P-14XL automatic press.",
    image: serviceScreenprint,
    path: "/screen-printing",
  },
  {
    title: "DTF Transfers & Garments",
    description: "Full-color DTF transfers and finished garments — photo quality on any fabric.",
    image: serviceDtf,
    path: "/dtf-transfers",
    badge: "New!",
  },
];

const ServiceCards = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            WHAT WE DO
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From a single custom hat to thousands of branded garments — we've got
            the equipment, expertise, and passion to make it happen.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={service.path}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  {service.badge && (
                    <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 font-heading text-xs font-semibold text-primary-foreground">
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;