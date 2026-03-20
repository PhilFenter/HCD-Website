import { motion } from "framer-motion";
import { MessageSquare, FileText, Package } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Tell Us Where You Are Going",
    description:
      "We start with your situation, not a product menu. A few smart questions help us point you in the right direction and make sure nothing gets missed before we start.",
  },
  {
    icon: FileText,
    title: "We Build The Right Solution",
    description:
      "Our team puts together a quote based on what you actually need, with options where it makes sense. You will hear back within one business day.",
  },
  {
    icon: Package,
    title: "We Handle It. Start To Finish",
    description:
      "Once you approve, we handle production, quality check, and delivery. If anything comes up along the way, we catch it and we handle it — before you have to ask.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#F9F5EF' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
           <h2 className="font-heading text-3xl font-bold md:text-4xl" style={{ color: '#1a1a1a' }}>
            HOW IT WORKS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: '#4a4a4a' }}>
            We built our process around one idea: no surprises. Here is what working with us looks like.
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
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 md:block" style={{ backgroundColor: '#d4cdc4' }} />
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
