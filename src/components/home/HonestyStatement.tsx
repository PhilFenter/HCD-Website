import { motion } from "framer-motion";

const HonestyStatement = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl border-t border-b border-primary/40 py-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            WE SHOULD BE HONEST WITH YOU.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
            We are not the cheapest option, and we are not set up for single-item
            orders. If that is what you need, we will gladly point you somewhere
            that is a better fit.
          </p>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-foreground md:text-xl">
            If you are building something real and want a shop that treats your
            brand like their own — you are in the right place.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HonestyStatement;
