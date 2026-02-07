import { motion } from "framer-motion";
import galleryEmbroideryMachine from "@/assets/gallery-embroidery-machine.jpg";
import galleryEmbroideredHat from "@/assets/gallery-embroidered-hat.jpg";
import galleryEmbroideredPatch from "@/assets/gallery-embroidered-patch.jpg";
import galleryHotshotsEmbroidery from "@/assets/gallery-hotshots-embroidery.jpg";
import galleryEmbroideredBaseballHat from "@/assets/gallery-embroidered-baseball-hat.jpg";
import galleryEmbroideredHillcrest from "@/assets/gallery-embroidered-hillcrest.jpg";

const galleryItems = [
  { src: galleryEmbroideryMachine, alt: "Barudan multi-head embroidery machine in production", span: "md:col-span-2" },
  { src: galleryEmbroideredHat, alt: "Custom 3D puff embroidered hat with flag detail", span: "" },
  { src: galleryEmbroideredPatch, alt: "Custom embroidered crest patch in gold and black", span: "" },
  { src: galleryEmbroideredBaseballHat, alt: "LC Baseball embroidered Richardson 112 trucker hat", span: "" },
  { src: galleryHotshotsEmbroidery, alt: "Hot Shots embroidered logo on red jacket", span: "md:col-span-2" },
  { src: galleryEmbroideredHillcrest, alt: "Hillcrest Aircraft embroidered rope hat", span: "" },
];

const EmbroideryGallery = () => {
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
            RECENT PROJECTS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From intricate patches to puff embroidery on hats, see the quality of our work.
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

export default EmbroideryGallery;
