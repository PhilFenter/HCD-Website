import { motion } from "framer-motion";

const HonestyStatement = () => {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#F9F5EF' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl border-t border-b py-16 text-center" style={{ borderColor: '#d4cdc4' }}
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl" style={{ color: '#1a1a1a' }}>
            A QUICK NOTE ON FIT.
          </h2>
          <p className="mt-8 text-lg leading-relaxed md:text-xl" style={{ color: '#555555' }}>
            Our shop minimum is $75. We have invested in the best equipment and
            the right people to use it. Good work takes real time and real skill
            — and we take both seriously.
          </p>
          <p className="mt-6 text-lg font-semibold leading-relaxed md:text-xl" style={{ color: '#1a1a1a' }}>
            If your project is a fit, we are ready to get started.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HonestyStatement;
