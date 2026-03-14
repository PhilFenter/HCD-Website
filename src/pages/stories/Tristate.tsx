import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/gallery-tristate-store.png";

const Tristate = () => {
  return (
    <Layout>
      <SEOHead
        title="Tristate Health — 650 Gift Cards in 45 Days | Hells Canyon Designs"
        description="How 650 employee gift cards nearly broke our fulfillment — and how we turned it into a system that works for everyone."
        canonicalPath="/stories/tristate"
      />

      <article className="py-16 md:py-24">
        <div className="container max-w-3xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={() => window.history.back()}
              className="inline-block text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              ← Back to Our Work
            </button>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            650 Gift Cards. 45 Days. Here Is What We Learned.
          </motion.h1>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 overflow-hidden rounded-lg border border-border"
          >
            <img
              src={heroImage}
              alt="Tristate Health online employee store"
              className="w-full h-auto object-cover aspect-video"
            />
          </motion.div>

          {/* Story body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            <p>It started with a local realtor who needed some hats and knew everyone in town.</p>

            <p>
              She knew a graphic designer looking for a change and thought HCD might be a good fit. That designer came to work with us for a while — and through her we were introduced to someone in the marketing department at Tristate Health, one of the region's largest employers.
            </p>

            <p>
              She had ordered a few things and the relationship started to grow. We were just beginning to offer online stores at the time and Tristate was one of our earliest. The timing was good — the hospital was going through a full rebrand and their existing vendor-run store was a disaster. Orders took forever. Employees had stopped using it entirely. They asked if we would be interested in setting up a new store and taking over fulfillment.
            </p>

            <p>We said of course. We would love to grow the partnership.</p>

            <p>
              We worked with the hospital's marketing team and their graphic designer to get the store built and stocked. Then marketing asked a question that seemed simple at the time.
            </p>

            <p>Could we do gift cards or coupons for the store?</p>

            <p>We said yes we can.</p>

            <p>
              They said that was great — with the rebrand they would love to give every employee a $30 gift card to spend in the store.
            </p>

            <p>We said that sounds wonderful. How many employees do you have?</p>
          </motion.div>

          {/* Pullquote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-12 border-l-4 border-primary py-4 pl-8"
          >
            <p className="font-heading text-2xl italic text-primary md:text-3xl">
              How many employees do you have? Then we heard the number. Six hundred and fifty.
            </p>
          </motion.blockquote>

          {/* Story body continued */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              We sent the invoice for 650 gift cards and all hell broke loose. Not everyone used their cards right away but we ended up processing 620 to 630 individual orders in a 45 day period. It nearly killed us. Duplicate orders. Double shipments. Clothing ordered twice. It was a mess.
            </p>

            <p>
              We doubled down. We figured out the fulfillment software. Found out how to track finished jobs, streamline ordering, and turn what nearly broke us into a long term system that works for everyone.
            </p>

            <p>
              Today Tristate Health is one of our strongest ongoing partnerships. Orders fulfill in about a week. We use the store strategically — when we need to hit a supplier shipping minimum there are usually a few store orders ready to go. It keeps costs down for us and keeps products moving for them.
            </p>

            <p className="font-semibold text-foreground">When the system works, everyone wins.</p>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-b border-primary/30 bg-secondary py-16"
        >
          <div className="container text-center">
            <p className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Ready for a shop that operates this way?
            </p>
            <Button asChild size="lg" className="mt-8">
              <a
                href="/#situation-finder"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/#situation-finder";
                }}
              >
                Start Your Project
              </a>
            </Button>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
};

export default Tristate;
