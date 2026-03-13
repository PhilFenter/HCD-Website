import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

import galleryHatsGrace from "@/assets/gallery-hats-grace-hardrock.jpg";
import galleryEmbroideredPatch from "@/assets/gallery-embroidered-patch.jpg";
import galleryScreenprintSquad from "@/assets/gallery-screenprint-squad.jpg";

const stories = [
  {
    headline: "Sure. Just Come Pick A Color.",
    story:
      "A precision manufacturer had been growing their brand and needed 600 embroidered hats by Friday. It was Monday morning. We had the inventory, the equipment, and the answer ready. We delivered 600 hats Thursday at noon.",
    outcome:
      "Years later, they send a text. We send an invoice. No back and forth. Just trust.",
    image: galleryHatsGrace,
  },
  {
    headline: "We Caught It First.",
    story:
      "A large regional employer dropped off a jacket for embroidery. When we pulled it out we noticed it already had embroidery on it — the wrong order from another supplier. We texted a photo, sourced a replacement overnight, and had the right jacket ready the next day.",
    outcome: "That is what we mean when we say we got you.",
    image: galleryEmbroideredPatch,
  },
  {
    headline: "A Store They Actually Use.",
    story:
      "A regional health company needed a company store that worked. The old one took four months to fulfill an order — employees had stopped using it entirely. We rebuilt the experience. Now it runs itself.",
    outcome: "When the system works, everyone wins.",
    image: galleryScreenprintSquad,
  },
];

const StoryCard = ({
  story,
  index,
  isMobile,
}: {
  story: (typeof stories)[0];
  index: number;
  isMobile: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative rounded-lg border border-border bg-card shadow-sm overflow-hidden cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={isMobile ? () => setExpanded(!expanded) : undefined}
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={story.image}
          alt={story.headline}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
      </div>

      {/* Front content — always visible */}
      <div className="p-8 pt-4">
        <h3 className="font-heading text-xl font-bold text-foreground">
          {story.headline}
        </h3>
        <p className="mt-4 text-sm font-semibold italic text-accent">
          {story.outcome}
        </p>

        {/* Mobile hint */}
        {isMobile && (
          <p className="mt-3 text-xs text-muted-foreground">
            {expanded ? "Tap to close" : "Tap to read the story"}
          </p>
        )}
      </div>

      {/* Reveal overlay — hover on desktop, tap on mobile */}
      <div
        className={`absolute inset-0 flex flex-col justify-center bg-card/95 backdrop-blur-sm p-8 transition-all duration-500 ${
          isMobile
            ? expanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
            : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
        }`}
      >
        <h3 className="font-heading text-xl font-bold text-foreground">
          {story.headline}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {story.story}
        </p>
        <p className="mt-6 text-sm font-semibold italic text-accent">
          {story.outcome}
        </p>
      </div>
    </motion.div>
  );
};

const PartnershipSection = () => {
  const isMobile = useIsMobile();

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
            WHAT PARTNERSHIP LOOKS LIKE
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              story={story}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground italic">
            These are not exceptions. This is how we operate.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/quote">See If We Are The Right Fit</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
