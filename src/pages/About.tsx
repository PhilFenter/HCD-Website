import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Award, Flame, Crosshair, Cpu, Printer, Sparkles } from "lucide-react";
import heroHats from "@/assets/hero-hats.jpg";

const stats = [
  { icon: MapPin, label: "Based in", value: "Lewiston, Idaho" },
  { icon: Users, label: "Happy Customers", value: "500+" },
  { icon: Award, label: "Five-Star Reviews", value: "100+" },
];

const milestones = [
  {
    year: "2017",
    icon: Flame,
    title: "Laser Engraving",
    desc: "We started with a laser and a vision — crafting precision-engraved leather patches from day one. Over 8 years later, it's still the foundation of everything we do.",
  },
  {
    year: "2020",
    icon: Crosshair,
    title: "Embroidery",
    desc: "Added our 6-head Barudan embroidery machine — industrial-grade, production-speed embroidery with the precision and consistency that cheaper machines can't touch.",
  },
  {
    year: "2022",
    icon: Printer,
    title: "Screen Printing",
    desc: "Installed our ROQ P-14XL — a 10-color, 14-platen automatic press. Combined with dual Stampinators, we deliver matte and soft-hand finishes that feel as good as they look.",
  },
  {
    year: "2023",
    icon: Sparkles,
    title: "DTF Begins — Epson F2100",
    desc: "Started our DTF journey with the Epson F2100. Learned the craft, dialed in our processes, and began serving local businesses with full-color transfers.",
  },
  {
    year: "2024",
    icon: Sparkles,
    title: "Mimaki TXF-150",
    desc: "Upgraded to the Mimaki TXF-150 in August — industrial-grade DTF quality with faster speeds, sharper detail, and the reliability to take on bigger orders.",
  },
  {
    year: "2025",
    icon: Cpu,
    title: "UV Flatbed Printing",
    desc: "Brought in the Mimaki UJF-6042 MkII e — a UV flatbed printer that lets us print directly on rigid materials, patches, and specialty items with photographic detail.",
  },
  {
    year: "2025",
    icon: Sparkles,
    title: "Super Gamut Hydra",
    desc: "Our flagship DTF machine — a 6-head, 9-color expanded gamut printer. Brand-accurate color on any fabric, with 24–48 hour turnaround. The culmination of our DTF evolution.",
  },
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
                Hells Canyon Designs started over 8 years ago with a laser
                engraver and a simple belief: businesses deserve custom gear
                that's as premium as the brands they've built. From our shop in
                Lewiston, Idaho, we've grown from leather patches into a
                full-service custom production house — adding capabilities every
                year to serve you better.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Today we run a 6-head Barudan embroidery machine, a ROQ 10-color
                automatic screen press, a Mimaki UV flatbed printer, and the
                Hydra expanded gamut DTF system. Every piece of equipment was
                chosen because it's the best at what it does — and every order
                gets the same white-glove treatment. Because your brand deserves
                it.
              </p>
              <Button asChild className="mt-8">
                <Link to="/quote">
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

      {/* Timeline / Our Journey */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              HOW WE GOT HERE
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Every year we've added new capabilities — always chasing the best equipment and the best results for our customers.
            </p>
          </motion.div>

          <div className="relative mt-14">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:-translate-x-1/2 md:block" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className="rounded-lg border border-border bg-card p-6">
                      <span className="inline-block rounded-full bg-primary/20 border border-primary/30 px-3 py-1 font-heading text-xs font-bold tracking-wider text-primary">
                        {m.year}
                      </span>
                      <h3 className="mt-3 font-heading text-xl font-bold text-foreground">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {m.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="absolute left-0 top-6 z-10 hidden h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-card md:relative md:left-auto md:top-auto md:flex md:shrink-0">
                    <m.icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
