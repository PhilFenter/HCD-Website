import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What are your minimum order quantities?",
    a: "For custom leather patch hats, our minimum is typically 12 pieces. Screen printing minimums vary by the number of colors but generally start at 24 pieces. Embroidery can be done for as few as 6 items. DTF transfers have no minimums for gang sheet orders!",
  },
  {
    q: "How long does a typical order take?",
    a: "Standard turnaround is 2-3 weeks from artwork approval. Rush orders are available for most services — just let us know your deadline when you request your quote and we'll do our best to accommodate.",
  },
  {
    q: "What artwork formats do you accept?",
    a: "We prefer vector files (AI, EPS, SVG, PDF). High-resolution PNG or JPEG files (300 DPI minimum) also work well. Don't have a clean version of your logo? We offer artwork cleanup and digitization services.",
  },
  {
    q: "Do you offer samples or mock-ups?",
    a: "Yes! We provide digital mock-ups with every quote so you can see exactly what your finished product will look like before you approve. Physical samples are available for larger orders.",
  },
  {
    q: "What hat brands do you carry?",
    a: "We stock Richardson, YP Classics (Yupoong), Pacific Headwear, and more — over 4,000 hats in our inventory. If you have a specific brand or style in mind, just ask!",
  },
  {
    q: "Can you ship orders nationwide?",
    a: "Absolutely! While we're based in Lewiston, Idaho, we ship completed orders anywhere in the United States. Shipping costs are included in your quote.",
  },
];

const FAQ = () => {
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
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Got questions? We've got answers. If you don't see yours here, reach
            out — we're happy to help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="font-heading text-left text-base font-medium tracking-wide text-foreground hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
