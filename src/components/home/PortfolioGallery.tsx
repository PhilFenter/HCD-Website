import { motion } from "framer-motion";
import galleryFlagHat from "@/assets/gallery-flag-hat.jpg";
import galleryEmbroideryMachine from "@/assets/gallery-embroidery-machine.jpg";
import galleryEmbroideredHat from "@/assets/gallery-embroidered-hat.jpg";
import galleryScreenprintShirt from "@/assets/gallery-screenprint-shirt.jpg";
import galleryScreenprintDetail from "@/assets/gallery-screenprint-detail.jpg";
import galleryEmbroideredPatch from "@/assets/gallery-embroidered-patch.jpg";
import galleryHotshotsEmbroidery from "@/assets/gallery-hotshots-embroidery.jpg";
import galleryDtfIdaho from "@/assets/gallery-dtf-idaho.jpg";
import galleryLeatherPatchFlag from "@/assets/gallery-leather-patch-flag.jpg";
import galleryScreenprintLcstate from "@/assets/gallery-screenprint-lcstate.jpg";
import galleryScreenprintBaseball from "@/assets/gallery-screenprint-baseball.jpg";
import galleryEmbroideredBaseballHat from "@/assets/gallery-embroidered-baseball-hat.jpg";
import galleryScreenprintHelitack from "@/assets/gallery-screenprint-helitack.jpg";
import galleryEmbroideredHillcrest from "@/assets/gallery-embroidered-hillcrest.jpg";
import galleryScreenprintSquad from "@/assets/gallery-screenprint-squad.jpg";
import galleryScreenprintThunder from "@/assets/gallery-screenprint-thunder.jpg";
import galleryScreenprintPress from "@/assets/gallery-screenprint-press.jpg";

const galleryItems = [
  { src: galleryFlagHat, alt: "Leather patch American flag on camo trucker hat", span: "md:col-span-2" },
  { src: galleryEmbroideredPatch, alt: "Custom embroidered crest patch in gold and black", span: "" },
  { src: galleryLeatherPatchFlag, alt: "Richardson 112 trucker hat with UV printed American flag leather patch", span: "" },
  { src: galleryScreenprintBaseball, alt: "NAIA World Series volunteer screen printed t-shirt", span: "md:col-span-2" },
  { src: galleryEmbroideredBaseballHat, alt: "LC Baseball embroidered Richardson 112 trucker hat", span: "" },
  { src: galleryScreenprintHelitack, alt: "Grangeville Helitack screen printed t-shirt design", span: "" },
  { src: galleryEmbroideredHillcrest, alt: "Hillcrest Aircraft embroidered rope hat", span: "" },
  { src: galleryHotshotsEmbroidery, alt: "Hot Shots embroidered logo on red jacket", span: "" },
  { src: galleryDtfIdaho, alt: "Idaho Dept of Lands DTF transfer on sweatshirt", span: "" },
  { src: galleryScreenprintSquad, alt: "Volunteer Squad screen printed t-shirt", span: "" },
  { src: galleryEmbroideryMachine, alt: "Barudan multi-head embroidery machine in production", span: "" },
  { src: galleryEmbroideredHat, alt: "Custom 3D puff embroidered hat with flag detail", span: "md:col-span-2" },
  { src: galleryScreenprintShirt, alt: "Custom screen printed t-shirt design", span: "" },
  { src: galleryScreenprintDetail, alt: "Seekins Precision screen printed shirt detail", span: "" },
  { src: galleryScreenprintLcstate, alt: "LC State Hall of Fame screen printed t-shirt", span: "" },
  { src: galleryScreenprintThunder, alt: "Thunder on the Snake 2025 screen printed event shirt", span: "md:col-span-2" },
  { src: galleryScreenprintPress, alt: "ROQ automatic screen printing press in action", span: "" },
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
