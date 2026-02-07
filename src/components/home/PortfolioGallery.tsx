import { motion } from "framer-motion";
import serviceHats from "@/assets/service-hats.jpg";
import serviceEmbroidery from "@/assets/service-embroidery.jpg";
import serviceScreenprint from "@/assets/service-screenprint.jpg";
import serviceDtf from "@/assets/service-dtf.jpg";
import heroHats from "@/assets/hero-hats.jpg";
import galleryFlagHat from "@/assets/gallery-flag-hat.jpg";
import galleryEmbroideryMachine from "@/assets/gallery-embroidery-machine.jpg";
import galleryEmbroideredHat from "@/assets/gallery-embroidered-hat.jpg";
import galleryScreenprintShirt from "@/assets/gallery-screenprint-shirt.jpg";
import galleryScreenprintDetail from "@/assets/gallery-screenprint-detail.jpg";

const galleryItems = [
  { src: galleryFlagHat, alt: "Leather patch American flag on camo trucker hat", span: "md:col-span-2" },
  { src: serviceHats, alt: "Laser engraved leather patch close-up", span: "" },
  { src: galleryEmbroideryMachine, alt: "Barudan multi-head embroidery machine in production", span: "" },
  { src: galleryEmbroideredHat, alt: "Custom 3D puff embroidered hat with flag detail", span: "md:col-span-2" },
  { src: serviceEmbroidery, alt: "Custom embroidery on polo", span: "" },
  { src: galleryScreenprintShirt, alt: "Custom screen printed t-shirt design", span: "" },
  { src: galleryScreenprintDetail, alt: "Seekins Precision screen printed shirt detail", span: "" },
  { src: serviceScreenprint, alt: "Screen printing production line", span: "" },
  { src: serviceDtf, alt: "DTF transfer on garment", span: "" },
  { src: heroHats, alt: "Custom leather patch hats collection", span: "" },
];

const PortfolioGallery = () => {
  return (
    <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            OUR WORK
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A sample of custom projects we've crafted for businesses across the
            Northwest. Your brand could be next.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative aspect-square overflow-hidden rounded-lg ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
