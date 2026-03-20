import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

// Screen Printing
import spThunder from "@/assets/gallery-screenprint-thunder.jpg";
import spPress from "@/assets/gallery-screenprint-press.jpg";
import spDetail from "@/assets/gallery-screenprint-detail.jpg";
import spLcstate from "@/assets/gallery-screenprint-lcstate.jpg";
import spHelitack from "@/assets/gallery-screenprint-helitack.jpg";
import spBaseball from "@/assets/gallery-screenprint-baseball.jpg";
import spHotshots from "@/assets/gallery-screenprint-hotshots.jpg";
import spBlastedbaked from "@/assets/gallery-screenprint-blastedbaked.jpg";
import spTristate from "@/assets/gallery-screenprint-tristate.jpg";
import spSquad from "@/assets/gallery-screenprint-squad.jpg";
import spRiverportBack from "@/assets/gallery-screenprint-riverport-back.jpg";
import spRiverportFront from "@/assets/gallery-screenprint-riverport-front.jpg";
import spShirt from "@/assets/gallery-screenprint-shirt.jpg";

// Embroidery
import embMachine from "@/assets/gallery-embroidery-machine.jpg";
import embHat from "@/assets/gallery-embroidered-hat.jpg";
import embPatch from "@/assets/gallery-embroidered-patch.jpg";
import embHotshots from "@/assets/gallery-hotshots-embroidery.jpg";
import embBaseball from "@/assets/gallery-embroidered-baseball-hat.jpg";
import embHillcrest from "@/assets/gallery-embroidered-hillcrest.jpg";
import embWHat from "@/assets/gallery-embroidered-w-hat.jpg";
import embColorado from "@/assets/gallery-embroidered-colorado-parks.jpg";
import embNorthern from "@/assets/gallery-embroidered-northern-rockies.jpg";
import embHops from "@/assets/gallery-embroidery-hops.jpg";

// Custom Hats
import hatFlag from "@/assets/gallery-flag-hat.jpg";
import hatLeatherFlag from "@/assets/gallery-leather-patch-flag.jpg";
import hatGraceBuilders from "@/assets/gallery-hat-grace-builders.jpg";
import hatLcstateDuo from "@/assets/gallery-hat-lcstate-duo.jpg";
import hatLcstatePatch from "@/assets/gallery-hat-lcstate-patch.jpg";
import hatGraceHardrock from "@/assets/gallery-hats-grace-hardrock.jpg";
import hatSeekins from "@/assets/gallery-seekins-hat.jpg";
import hatSeekins2 from "@/assets/gallery-seekins-two-hats.jpg";
import hatPatches from "@/assets/gallery-patches-clarkston-selway.jpg";
import hatUvPatch from "@/assets/gallery-uv-patch-lcstate.jpg";
import hatGrace from "@/assets/gallery-grace-builders-hat.jpg";
import hatGraceHr from "@/assets/gallery-grace-hardrock-hats.jpg";

// DTF Transfers
import dtfIdaho from "@/assets/gallery-dtf-idaho.jpg";
import dtfMadHatter from "@/assets/gallery-dtf-madhatter.jpg";
import dtfPrimal from "@/assets/gallery-dtf-primal.jpg";

interface GalleryItem {
  src: string;
  alt: string;
  span?: string;
}

interface ProcessSection {
  id: string;
  title: string;
  description: string;
  items: GalleryItem[];
  link: string;
  linkLabel: string;
}

const sections: ProcessSection[] = [
  {
    id: "screen-printing",
    title: "SCREEN PRINTING",
    description: "Sharp details, vibrant colors, and industrial-grade consistency on every run.",
    link: "/screen-printing",
    linkLabel: "Learn about screen printing",
    items: [
      { src: spThunder, alt: "Thunder on the Snake 2025 screen printed event shirt", span: "md:col-span-2" },
      { src: spPress, alt: "ROQ automatic screen printing press in action" },
      { src: spDetail, alt: "Seekins Precision screen printed shirt detail" },
      { src: spLcstate, alt: "LC State Hall of Fame screen printed t-shirt" },
      { src: spHelitack, alt: "Grangeville Helitack screen printed t-shirt design" },
      { src: spBaseball, alt: "NAIA World Series volunteer screen printed t-shirt", span: "md:col-span-2" },
      { src: spHotshots, alt: "Hot Shots screen printed hoodie" },
      { src: spBlastedbaked, alt: "Blasted and Baked Inc screen printed hoodie" },
      { src: spRiverportBack, alt: "Riverport Brews screen printed hoodie back design" },
      { src: spRiverportFront, alt: "Riverport Brews screen printed hoodie front chest logo" },
      { src: spTristate, alt: "TriState Health Tough Enough to Wear Pink screen printed shirt" },
      { src: spSquad, alt: "Volunteer Squad screen printed t-shirt" },
      { src: spShirt, alt: "Custom screen printed t-shirt design", span: "md:col-span-2" },
    ],
  },
  {
    id: "embroidery",
    title: "EMBROIDERY",
    description: "From intricate patches to 3D puff on hats — precision stitching on every piece.",
    link: "/embroidery",
    linkLabel: "Learn about embroidery",
    items: [
      { src: embMachine, alt: "Barudan multi-head embroidery machine in production", span: "md:col-span-2" },
      { src: embWHat, alt: "Custom embroidered W logo on Richardson 112 trucker hat" },
      { src: embHat, alt: "Custom 3D puff embroidered hat with flag detail" },
      { src: embColorado, alt: "Colorado Parks & Wildlife embroidered patch on Richardson 112 hat" },
      { src: embBaseball, alt: "LC Baseball embroidered Richardson 112 trucker hat" },
      { src: embHotshots, alt: "Hot Shots embroidered logo on red jacket", span: "md:col-span-2" },
      { src: embNorthern, alt: "Northern Rockies Incident Management Team 3 embroidered hat" },
      { src: embPatch, alt: "Custom embroidered crest patch in gold and black" },
      { src: embHillcrest, alt: "Hillcrest Aircraft embroidered rope hat" },
      { src: embHops, alt: "Custom embroidered hops design" },
    ],
  },
  {
    id: "custom-hats",
    title: "CUSTOM HATS",
    description: "Leather patches, UV prints, embroidery — hats built the way you want them.",
    link: "/custom-hats",
    linkLabel: "Learn about custom hats",
    items: [
      { src: hatFlag, alt: "Leather patch American flag on camo trucker hat", span: "md:col-span-2" },
      { src: hatLeatherFlag, alt: "Richardson 112 trucker hat with UV printed American flag leather patch" },
      { src: hatGraceBuilders, alt: "Grace Builders LLC UV printed leather patch on black Richardson 112 trucker hat" },
      { src: hatLcstateDuo, alt: "LC State Warriors UV printed leather patch and flexfit hats", span: "md:col-span-2" },
      { src: hatLcstatePatch, alt: "LC State Warriors UV printed leather patch closeup on white hat" },
      { src: hatSeekins, alt: "Seekins Precision custom leather patch hat" },
      { src: hatSeekins2, alt: "Seekins Precision two-tone leather patch hats" },
      { src: hatGraceHardrock, alt: "Grace Builders and Hardrock Hammers UV printed leather patch hats on Mimaki printer", span: "md:col-span-2" },
      { src: hatPatches, alt: "Clarkston Wrestling and Selway Construction UV printed leather patches with hat" },
      { src: hatUvPatch, alt: "LC State Warriors UV printed leather patch closeup" },
      { src: hatGrace, alt: "Grace Builders custom hat" },
      { src: hatGraceHr, alt: "Grace Builders and Hardrock Hammers custom hats" },
    ],
  },
  {
    id: "dtf-transfers",
    title: "DTF TRANSFERS",
    description: "Full-color, photo-quality prints on demand — no minimums, no screen setup.",
    link: "/dtf-transfers",
    linkLabel: "Learn about DTF transfers",
    items: [
      { src: dtfIdaho, alt: "Idaho Dept of Lands DTF transfer on sweatshirt", span: "md:col-span-2" },
      { src: dtfMadHatter, alt: "Mad Hatter Grand Prix DTF transfer design" },
      { src: dtfPrimal, alt: "Primal Fitness custom DTF printed t-shirt" },
    ],
  },
];

const Portfolio = () => {
  return (
    <Layout>
      <SEOHead
        title="Our Work | Screen Printing, Embroidery & Custom Hats | Hells Canyon Designs"
        description="See real examples of screen printing, embroidery, custom hats, and DTF transfers from Hells Canyon Designs. Crafted in Idaho, shipped nationwide."
        canonicalPath="/portfolio"
      />

      {/* Hero */}
      <section className="bg-secondary/30 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              OUR WORK
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Real projects for real businesses. Every piece shown here was designed,
              produced, and quality-checked by our team.
            </p>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border border-border bg-card px-5 py-2 font-heading text-sm font-medium tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process sections */}
      {sections.map((section, sectionIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-20 md:py-28 ${sectionIdx % 2 === 0 ? "" : "bg-secondary/30"}`}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                  {section.title}
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {section.description}
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-4 gap-2 font-heading tracking-wide md:mt-0"
              >
                <Link to={section.link}>
                  {section.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {section.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className={`group relative overflow-hidden rounded-lg ${item.span || ""} ${
                    item.span ? "aspect-[2/1]" : "aspect-square"
                  }`}
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
      ))}

      {/* CTA */}
      <section className="border-t border-border bg-card py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              YOUR PROJECT COULD BE NEXT
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tell us what you need and we will put together a plan.
            </p>
            <Button asChild size="lg" className="mt-8 gap-2 font-heading tracking-wide">
              <a
                href="/#situation-finder"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/#situation-finder";
                }}
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
