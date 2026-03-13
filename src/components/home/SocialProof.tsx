import { motion } from "framer-motion";

const companies = [
  "Clearwater Paper",
  "Seekins Precision",
  "Glacier Supply",
  "Tri-State Health",
  "Idaho Forest Products",
  "Hat Creek Training",
  "Hillcrest Aircraft",
];

const SocialProof = () => {
  return (
    <section className="border-y border-border bg-secondary/30 py-8 md:py-10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Trusted by companies across the region
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm md:text-base font-medium text-primary/70">
            {companies.map((name, i) => (
              <span key={name} className="flex items-center gap-2">
                {name}
                {i < companies.length - 1 && (
                  <span className="text-primary/30">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
