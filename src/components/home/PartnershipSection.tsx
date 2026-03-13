import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stories = [
  {
    headline: "Sure. Just Come Pick A Color.",
    story:
      "A precision manufacturer had been growing their brand and needed 600 embroidered hats by Friday. It was Monday morning. We had the inventory, the equipment, and the answer ready. We delivered 600 hats Thursday at noon.",
    outcome:
      "Years later, they send a text. We send an invoice. No back and forth. Just trust.",
  },
  {
    headline: "We Caught It First.",
    story:
      "A large regional employer dropped off a jacket for embroidery. When we pulled it out we noticed it already had embroidery on it — the wrong order from another supplier. We texted a photo, sourced a replacement overnight, and had the right jacket ready the next day.",
    outcome: "That is what we mean when we say we got you.",
  },
  {
    headline: "A Store They Actually Use.",
    story:
      "A regional health company needed a company store that worked. The old one took four months to fulfill an order — employees had stopped using it entirely. We rebuilt the experience. Now it runs itself.",
    outcome: "When the system works, everyone wins.",
  },
];

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

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-lg border border-border bg-card p-8 shadow-sm flex flex-col"
            >
              <h3 className="font-heading text-xl font-bold text-foreground">
                {story.headline}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1">
                {story.story}
              </p>
              <p className="mt-6 text-sm font-semibold italic text-accent">
                {story.outcome}
              </p>
            </motion.div>
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
