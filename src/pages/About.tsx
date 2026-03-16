import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const About = () => {
  return (
    <Layout>
      <SEOHead
        title="About Hells Canyon Designs | Our Story"
        description="Hells Canyon Designs started with curiosity — not a business plan. Learn how a Maui glass artist became the LC Valley's most trusted custom apparel shop."
        canonicalPath="/about"
      />

      {/* Hero */}
      <section className="py-28 md:py-40">
        <div className="container">
          <motion.div {...fade} className="text-center">
            <h1 className="font-heading text-5xl font-bold text-foreground md:text-7xl">
              BUILT ON CURIOSITY.
            </h1>
            <p className="mt-6 font-heading text-sm tracking-[0.25em] text-primary">
              CRAFTED IN IDAHO · SHIPPED NATIONWIDE
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-28 md:pb-40">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-16">

            {/* Built on Curiosity */}
            <motion.div {...fade} className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                BUILT ON CURIOSITY.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Hells Canyon Designs didn't start with a business plan. It started with curiosity. We have always been drawn to the moment when an idea becomes something real — something someone holds in their hands and reacts to. A piece of Koa wood furniture. An illuminated glass panel in a Bubinga base. A tumbler engraved for a new big brother. That moment of reaction is why we do what we do. That instinct runs deep. A father who spent his life teaching, building stained glass windows, and hand-carving wooden wagons into his eighties. A mother who is a gifted quilter. A family that has always made things. The lesson that came with all of it: it doesn't have to be perfect to have an impact. It just has to be honest.
              </p>
            </motion.div>

            {/* From Maui to the LC Valley */}
            <motion.div {...fade} className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                FROM MAUI TO THE LC VALLEY.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                It started on a plywood workbench on a garbage can outside a little place in Maui. An art glass business built from a couple of tools and a lot of trial and error. Humpback whale sun catchers, custom glass work, sandblasting detail that hadn't been seen before — beautifully illuminated with neon light.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Then life took a turn. Twenty years as a helicopter pilot — a career built on precision, discipline, and showing up when it matters.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                In 2018 the artist came back. A sandblasting cabinet. Art pieces again. Pint glasses for fire crews. Then a laser engraver, pushed to new limits with a wildlife series that still holds up today. Then leather patch hats — and when the patches looked better sewn on, a post bed sewing machine and the work of teaching himself how to sew.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                To make the product better: an embroidery machine. Then a screen printing press. Then a bigger one.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                What started in a bedroom became a storefront in 2020. Then COVID hit. Most shops pulled back. We doubled down — on leather patch hats, on the craft, on figuring out how to serve customers when everyone else was scrambling.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Two years later we moved across the parking lot into a 3,000 square foot space. The Barudan embroidery machine arrived. Then the ROQ P14XL automatic press. In May 2024 we moved into our current home — 904 D Street in downtown Lewiston. A full production facility. The right equipment for just about anything you bring through the door.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Each step followed the same pattern: find the next process, learn it completely, make mistakes, figure it out, get good at it.
              </p>
            </motion.div>

            {/* A Different Kind of Shop */}
            <motion.div {...fade} className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                A DIFFERENT KIND OF SHOP.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                When we started HCD in the LC Valley we saw something missing. Not just better equipment or more options — though we have those. What was missing was a shop that had people's backs. A more consistent process. Real customer service. A place that when something goes wrong doesn't hide or divert blame — just takes care of it.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We have dropped the ball. We have made mistakes. Every shop does. The difference is what you do next. We have always believed that how you handle the hard moments is what defines the relationship — not the easy ones.
              </p>
            </motion.div>

            {/* Building Something That Lasts */}
            <motion.div {...fade} className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                BUILDING SOMETHING THAT LASTS.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We have been building HCD almost behind the scenes. Investing in the right equipment. Growing the right relationships. Teaching people the process and earning their trust one order at a time.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The goal now is bigger than any one order or any one person. We are building a system — a standard of care — that can outlast any single team member. Something that runs on values, not just personalities. Something that may outlive the person who started it.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We have the best equipment in the region. We have the right people. We have a book of business built on relationships that go deep.
              </p>
              <p className="text-xl italic leading-relaxed text-primary md:text-2xl">
                If you know, you know.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-card py-20 md:py-28">
        <div className="container">
          <motion.div {...fade} className="text-center">
            <p className="mx-auto max-w-xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Ready to work with a shop that operates this way?
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/#situation-finder">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
