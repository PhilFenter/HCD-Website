import { motion } from "framer-motion";
import { MessageSquare, FileText, Package } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Tell Us What You Need",
    description:
      "Fill out a quick guided quote form — choose your service, quantities, artwork, and timeline.",
  },
  {
    icon: FileText,
    title: "Get Your Custom Quote",
    description:
      "We'll review your request and send you a detailed quote within one business day.",
  },
  {
    icon: Package,
    title: "We Make It Happen",
    description:
      "Approve your quote and we get to work — premium craftsmanship, fast turnaround, delivered to your door.",
  },
];

const HowItWorks = () => {
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
            HOW IT WORKS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Getting custom gear shouldn't be complicated. Three simple steps and
            you're on your way.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line on desktop */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-border md:block" />
              )}

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-secondary">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
