import { motion } from "framer-motion";
import galleryScreenprintPress from "@/assets/gallery-screenprint-press.jpg";
import galleryScreenprintThunder from "@/assets/gallery-screenprint-thunder.jpg";
import galleryScreenprintLcstate from "@/assets/gallery-screenprint-lcstate.jpg";
import galleryScreenprintDetail from "@/assets/gallery-screenprint-detail.jpg";
import galleryScreenprintBaseball from "@/assets/gallery-screenprint-baseball.jpg";
import galleryScreenprintHelitack from "@/assets/gallery-screenprint-helitack.jpg";
import galleryScreenprintSquad from "@/assets/gallery-screenprint-squad.jpg";
import galleryScreenprintHotshots from "@/assets/gallery-screenprint-hotshots.jpg";
import galleryScreenprintBlastedbaked from "@/assets/gallery-screenprint-blastedbaked.jpg";
import galleryScreenprintTristate from "@/assets/gallery-screenprint-tristate.jpg";

const galleryItems = [
  { src: galleryScreenprintThunder, alt: "Thunder on the Snake 2025 screen printed event shirt", span: "md:col-span-2", aspect: "aspect-[2/1]" },
  { src: galleryScreenprintPress, alt: "ROQ automatic screen printing press in action", span: "", aspect: "aspect-[4/3]" },
  { src: galleryScreenprintDetail, alt: "Seekins Precision screen printed shirt detail", span: "", aspect: "aspect-[4/3]" },
  { src: galleryScreenprintLcstate, alt: "LC State Hall of Fame screen printed t-shirt", span: "", aspect: "aspect-[4/3]" },
  { src: galleryScreenprintHelitack, alt: "Grangeville Helitack screen printed t-shirt design", span: "", aspect: "aspect-[4/3]" },
  { src: galleryScreenprintBaseball, alt: "NAIA World Series volunteer screen printed t-shirt", span: "md:col-span-2", aspect: "aspect-[2/1]" },
  { src: galleryScreenprintHotshots, alt: "Hot Shots screen printed hoodie", span: "", aspect: "aspect-[4/3]" },
  { src: galleryScreenprintBlastedbaked, alt: "Blasted and Baked Inc screen printed hoodie", span: "", aspect: "aspect-[4/3]" },
  { src: galleryScreenprintTristate, alt: "TriState Health Tough Enough to Wear Pink screen printed shirt", span: "", aspect: "aspect-[4/3]" },
  { src: galleryScreenprintSquad, alt: "Volunteer Squad screen printed t-shirt", span: "", aspect: "aspect-[4/3]" },
];

const ScreenPrintingGallery = () => {
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
            RECENT PRINTS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Sharp details, vibrant colors, and industrial-grade consistency.
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
              className={`group relative overflow-hidden rounded-lg ${item.span} ${item.aspect}`}
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

export default ScreenPrintingGallery;
