import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import galleryHatsGrace from "@/assets/gallery-grace-builders-hat.jpg";
import seekinsHat from "@/assets/gallery-seekins-two-hats.jpg";
import galleryEmbroideredPatch from "@/assets/gallery-embroidered-patch.jpg";
import galleryClearwaterJackets from "@/assets/gallery-clearwater-jackets.jpg";
import galleryScreenprintSquad from "@/assets/gallery-tristate-store.png";

const stories = [
  {
    headline: "Just Make Them Look Cool.",
    teaser:
      "A local contractor handed us their brand and said those four words. No micromanaging. No endless revisions. Just trust.",
    outcome:
      "That is the kind of relationship we are built for.",
    image: galleryHatsGrace,
    url: "/stories/make-them-cool",
  },
  {
    headline: "Sure. Just Come Pick A Color.",
    teaser:
      "A precision manufacturer needed 600 embroidered hats by Friday. It was Monday morning.",
    outcome:
      "Years later, they send a text. We send an invoice. No back and forth. Just trust.",
    image: seekinsHat,
    url: "/stories/seekins",
  },
  {
    headline: "We Caught It First.",
    teaser:
      "A large employer dropped off a jacket for embroidery — it already had the wrong order from another supplier.",
    outcome: "That is what we mean when we say we got you.",
    image: galleryClearwaterJackets,
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
    headline: "She Almost Walked Right Past Us.",
    teaser:
      "She almost walked right past us — then stopped, came in, and everything changed.",
    outcome: "Sometimes the best partnerships start by accident.",
    image: galleryEmbroideredPatch,
    url: "/stories/walked-past",
  },
  {
    headline: "The Right Story Is Coming.",
    teaser: "Check back soon.",
    outcome: "",
    image: galleryScreenprintSquad,
    url: "",
    placeholder: true,
  },
];

const StoryCard = ({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) => {
  const content = (
    <>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={story.image}
          alt={story.headline}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-foreground">
          {story.headline}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {story.teaser}
        </p>
        {story.outcome && (
          <p className="mt-4 text-sm font-semibold italic text-accent">
            {story.outcome}
          </p>
        )}
        {!story.placeholder && (
          <span className="mt-4 inline-block text-sm font-semibold text-primary">
            Read the full story →
          </span>
        )}
      </div>
    </>
  );

  if (story.placeholder) {
    return (
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden opacity-75">
        {content}
      </div>
    );
  }

  return (
    <Link
      to={story.url}
      className="group rounded-lg border border-border bg-card shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] hover:border-primary/30"
    >
      {content}
    </Link>
  );
};

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
