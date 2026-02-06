import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Award } from "lucide-react";
import heroHats from "@/assets/hero-hats.jpg";

const stats = [
  { icon: MapPin, label: "Based in", value: "Lewiston, Idaho" },
  { icon: Users, label: "Happy Customers", value: "500+" },
  { icon: Award, label: "Five-Star Reviews", value: "100+" },
];

const About = () => {
  return (
    <Layout>
      <section className="relative py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 items-center md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading text-sm font-medium tracking-[0.2em] text-primary">
                OUR STORY
              </p>
              <h1 className="mt-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
                CRAFTED IN THE HEART OF IDAHO
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Hells Canyon Designs started with a simple idea: businesses
                deserve custom gear that's as premium as the brands they've
                built. From our shop in Lewiston, Idaho, we combine cutting-edge
                equipment with old-school craftsmanship to deliver work that
                makes your brand unforgettable.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Whether it's laser-engraved leather patches, precision
                embroidery, screen printing, or our newest DTF transfer
                capabilities — every order gets the same white-glove treatment.
                Because your brand deserves it.
              </p>
              <Button asChild className="mt-8">
                <Link to="/custom-hats#quote">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img
                src={heroHats}
                alt="Hells Canyon Designs workshop"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              OUR CAPABILITIES
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We've invested in the best equipment so you get the best results.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Laser Engraving",
                desc: "Precision laser engraving for leather patches with incredible detail.",
              },
              {
                title: "Multi-Head Embroidery",
                desc: "High-speed multi-head machines for consistent, production-quality embroidery.",
              },
              {
                title: "ROQ P-14XL Press",
                desc: "14-color automatic screen printing with CTS technology for precision.",
              },
              {
                title: "DTF Printing",
                desc: "Full-color direct-to-film transfers for photo-quality garment decoration.",
              },
            ].map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
