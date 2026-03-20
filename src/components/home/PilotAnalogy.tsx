import { motion } from "framer-motion";

const PilotAnalogy = () => {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            After twenty years flying helicopters, I can plan a flight to almost anywhere in minutes — best route, weather considerations, terrain, fuel stops, which side of the mountains to avoid turbulence. But to do any of that, I need one thing first: a destination. Give me a spot on the map and everything else falls into place.
          </p>
          <p className="mt-6 text-xl font-bold text-primary md:text-2xl">
            That's how we work here too. Tell us where you're trying to go and we'll handle the rest.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PilotAnalogy;
