import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import seekinsHat from "@/assets/gallery-seekins-two-hats.jpg";

const Seekins = () => {
  const scrollToSituationFinder = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/#situation-finder";
  };

  return (
    <Layout>
      <SEOHead
        title="Seekins Precision — 600 Hats by Friday | Hells Canyon Designs"
        description="How a single text turned into 600 embroidered hats delivered in four days — and a lasting partnership with Seekins Precision."
        canonicalPath="/stories/seekins"
      />
      <ArticleJsonLd
        title="Seekins Precision — 600 Hats by Friday"
        description="How a single text turned into 600 embroidered hats delivered in four days — and a lasting partnership with Seekins Precision."
        path="/stories/seekins"
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
            Sure. Just Come Pick A Color.
          </motion.h1>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 overflow-hidden rounded-lg border border-border"
          >
            <img
              src={seekinsHat}
              alt="Custom embroidered hats for Seekins Precision"
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
            <p>
              We had been watching Seekins Precision for a while — wanting to work with them but never quite making the move. Then one day Katie from their marketing team called, and we started building a relationship. Small orders at first. Leather patch hats. Then more frequent.
            </p>

            <p>
              We had just moved into a new 3,000 square foot building. During COVID, when most shops could not get hats at all, we had been buying by the case — Richardson and YP Classics, back-ordered through a supplier in Texas who would call when they came in, get the last four digits of a card, and ship. We built up a stash of 4,000 plus hats. We had just taken delivery of a brand new six-head Barudan embroidery machine we called Beky.
            </p>

            <p>
              On a Monday morning around 8 or 9am, Katie texted. She said she had a big ask and that if it was crazy, just say so.
            </p>

            <p>I said what do you need.</p>

            <p>
              Very quietly, she said: 600 hats by Friday?
            </p>
          </motion.div>

          {/* Pullquote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-12 border-l-4 border-primary py-4 pl-8"
          >
            <p className="font-heading text-2xl italic text-primary md:text-3xl">
              600 hats by Friday? Sure thing. Come pick a color.
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
              She was in the shop within 30 minutes. Pulled two hat colors. We cranked up Beky and got to work. It was pretty fun to load those hats in the truck and deliver them Thursday around noon.
            </p>

            <p>
              That relationship has kept growing as Seekins has grown. Katie eventually left to start a family and handed things off to Justin. These days a text or a PO comes in and we send an invoice and take care of the rest.
            </p>

            <p className="font-semibold text-foreground">It is just that easy.</p>
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

export default Seekins;
