import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/gallery-grace-builders-hat.jpg";

const GraceBuilders = () => {
  return (
    <Layout>
      <SEOHead
        title="Grace Builders — Just Make Them Look Cool | Hells Canyon Designs"
        description="How trust replaced revision rounds — and why Pete lets us pick the gear, the colors, and the style for his entire crew."
        canonicalPath="/stories/make-them-cool"
      />
      <ArticleJsonLd
        title="Grace Builders — Just Make Them Look Cool"
        description="How trust replaced revision rounds — and why Pete lets us pick the gear, the colors, and the style for his entire crew."
        path="/stories/make-them-cool"
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
            Just Make Them Look Cool.
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
              alt="Custom hat for Grace Builders"
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
              Pete had been in the year before. His company, Grace Builders, designs and builds homes that bring peace and serenity to the people who live in them. You can feel that intention when you talk to him. We aligned well from the start.
            </p>

            <p>
              He came back this year and said he loved what we made him last time. He needed new gear for his crew — shirts, some other pieces — and asked for our recommendations. We had what he needed on display. Picked some colors, talked through sizes, made some decisions together.
            </p>

            <p>Then we got to hats.</p>

            <p>
              We walked back to the hat area and Pete looked around and said he needed about 100. Then he said something we don't hear every day.
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
              I know you guys are the experts. Just grab what you think and make them cool.
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
              We put together a selection — UV printed patches on some, leather with embroidery on others. Sent him photos as we went.
            </p>

            <p>Every reply was a thumbs up or a love it.</p>

            <p>No revisions. No second guessing. Just trust.</p>

            <p className="font-semibold text-foreground">
              Pete wears the gear we made him in the YouTube video on his website. That says everything.
            </p>
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

export default GraceBuilders;
