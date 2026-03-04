import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

import galleryDtfIdaho from "@/assets/gallery-dtf-idaho.jpg";
import galleryEmbroideredHat from "@/assets/gallery-embroidered-hat.jpg";
import galleryScreenprintBaseball from "@/assets/gallery-screenprint-baseball.jpg";
import galleryLeatherPatchFlag from "@/assets/gallery-leather-patch-flag.jpg";
import galleryHotshotsEmbroidery from "@/assets/gallery-hotshots-embroidery.jpg";
import galleryScreenprintThunder from "@/assets/gallery-screenprint-thunder.jpg";
import galleryEmbroideredPatch from "@/assets/gallery-embroidered-patch.jpg";
import galleryDtfPrimal from "@/assets/gallery-dtf-primal.jpg";

const photos = [
  { src: galleryDtfIdaho, alt: "DTF printed Idaho design" },
  { src: galleryEmbroideredHat, alt: "Custom embroidered hat" },
  { src: galleryScreenprintBaseball, alt: "Screen printed baseball jerseys" },
  { src: galleryLeatherPatchFlag, alt: "Leather patch with flag design" },
  { src: galleryHotshotsEmbroidery, alt: "Hotshots embroidered gear" },
  { src: galleryScreenprintThunder, alt: "Screen printed Thunder design" },
  { src: galleryEmbroideredPatch, alt: "Embroidered patch detail" },
  { src: galleryDtfPrimal, alt: "DTF printed Primal design" },
];

const INSTAGRAM_URL = "https://www.instagram.com/hellscanyon.designs/";

const InstagramFeed = () => {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <Instagram className="h-5 w-5 text-primary" />
            <span className="font-heading text-sm font-semibold uppercase tracking-widest text-primary">
              @hellscanyon.designs
            </span>
          </div>
          <h2 className="font-brand text-3xl tracking-wide text-foreground md:text-4xl">
            Follow Our Work
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            See the latest projects rolling off our presses, machines, and laser.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-md"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 font-heading text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Instagram className="h-4 w-4" />
            Follow Us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
