import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import galleryHatsGrace from "@/assets/gallery-hats-grace-hardrock.jpg";
import galleryEmbroideredPatch from "@/assets/gallery-embroidered-patch.jpg";
import galleryScreenprintSquad from "@/assets/gallery-screenprint-squad.jpg";

const stories = [
  {
    headline: "Sure. Just Come Pick A Color.",
    teaser:
      "A precision manufacturer needed 600 embroidered hats by Friday. It was Monday morning.",
    outcome:
      "Years later, they send a text. We send an invoice. No back and forth. Just trust.",
    image: galleryHatsGrace,
    url: "/stories/seekins",
  },
  {
    headline: "We Caught It First.",
    teaser:
      "A large employer dropped off a jacket for embroidery — it already had the wrong order from another supplier.",
    outcome: "That is what we mean when we say we got you.",
    image: galleryEmbroideredPatch,
    url: "/stories/clearwater",
  },
  {
    headline: "A Store They Actually Use.",
    teaser:
      "A regional health company's old store took four months to fulfill. Employees stopped using it entirely.",
    outcome: "When the system works, everyone wins.",
    image: galleryScreenprintSquad,
    url: "/stories/tristate",
  },
  {
    headline: "Days, Not Months.",
    teaser:
      "They came in flustered and upset — their old supplier had been sitting on their order for weeks. We had their merch ready in days, not months.",
    outcome: "Now they are family.",
    image: galleryHatsGrace,
    url: "/stories/wrong-building",
  },
];

const StoryCard = ({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) => (
  <Link
    to={story.url}
    className="group rounded-lg border border-border bg-card shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] hover:border-primary/30"
  >
    {/* Image */}
    <div className="h-48 overflow-hidden">
      <img
        src={story.image}
        alt={story.headline}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="font-heading text-xl font-bold text-foreground">
        {story.headline}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {story.teaser}
      </p>
      <p className="mt-4 text-sm font-semibold italic text-accent">
        {story.outcome}
      </p>
      <span className="mt-4 inline-block text-sm font-semibold text-primary">
        Read the full story →
      </span>
    </div>
  </Link>
);

const PartnershipSection = () => {
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

        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2">
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            These are not exceptions. This is how we operate.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/quote">See If We Are The Right Fit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
