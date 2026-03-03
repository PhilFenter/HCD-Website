import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import FAQJsonLd from "@/components/FAQJsonLd";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface LocalLandingPageProps {
  service: string;
  serviceSlug: string;
  city: string;
  state: string;
  canonicalPath: string;
  title: string;
  description: string;
  intro: string;
  mainServiceLink: string;
  faqs: { question: string; answer: string }[];
}

const LocalLandingPage = ({
  service,
  serviceSlug,
  city,
  state,
  canonicalPath,
  title,
  description,
  intro,
  mainServiceLink,
  faqs,
}: LocalLandingPageProps) => {
  return (
    <Layout>
      <SEOHead title={title} description={description} canonicalPath={canonicalPath} />
      <ServiceJsonLd
        name={`${service} in ${city}, ${state}`}
        description={description}
        url={`https://hcd-web-new.lovable.app${canonicalPath}`}
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-heading text-sm font-medium tracking-[0.2em] text-primary">
              LC VALLEY LOCAL
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
              {service.toUpperCase()} IN {city.toUpperCase()}, {state.toUpperCase()}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="font-heading tracking-wide">
                <Link to="/quote">
                  Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-heading tracking-wide">
                <Link to={mainServiceLink}>Learn More About {service}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="border-t border-border bg-secondary/30 py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              WHO WE SERVE IN THE LC VALLEY
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Local Businesses", desc: "Branded uniforms, company merch, and promotional gear for businesses across Lewiston and Clarkston." },
                { title: "Schools & Teams", desc: "Spirit wear, team jerseys, and staff apparel for LC Valley schools, clubs, and athletic programs." },
                { title: "Contractors & Trades", desc: "Hi-vis workwear, company polos, and hard hat stickers for construction crews and trade businesses." },
                { title: "Events & Organizations", desc: "Fundraiser merch, event shirts, and custom apparel for community organizations throughout the LC Valley." },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                { quote: "Hells Canyon Designs knocked it out of the park. Fast turnaround, great quality, and they're right here in the valley.", name: "Local Business Owner", location: "Lewiston, ID" },
                { quote: "We've been ordering from HCD for years. They always deliver on time and the quality is consistently excellent.", name: "School Athletic Director", location: "Clarkston, WA" },
              ].map((t, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-6 text-left">
                  <p className="text-sm italic leading-relaxed text-muted-foreground">"{t.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/30 py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="mt-10 space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-heading text-base font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              READY TO GET STARTED?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Get a free quote in minutes. We're a local LC Valley shop — your order gets personal attention from start to finish.
            </p>
            <Button size="lg" asChild className="mt-8 font-heading tracking-wide">
              <Link to="/quote">
                Request Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LocalLandingPage;
