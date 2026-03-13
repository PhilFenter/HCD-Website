import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "The quality of the leather patches is incredible. Our team hats look absolutely premium. Will be ordering more!",
    author: "Mike R.",
    role: "Business Owner",
  },
  {
    text: "Fast turnaround, great communication, and the embroidery work exceeded our expectations. Highly recommend!",
    author: "Sarah T.",
    role: "Marketing Director",
  },
  {
    text: "We've tried several shops for our company hats. Hells Canyon Designs is hands down the best. The boss wanted them yesterday — and they nearly delivered!",
    author: "Jason K.",
    role: "Operations Manager",
  },
];

const SocialProof = () => {
  return (
    <section className="border-y border-border bg-secondary/30 py-12 md:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-primary text-primary" />
            ))}
          </div>
          <p className="mt-3 font-heading text-lg font-semibold text-foreground">
            100+ Five-Star Reviews
          </p>
          <p className="text-sm text-muted-foreground">
            Trusted by businesses across the country
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                "{t.text}"
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
