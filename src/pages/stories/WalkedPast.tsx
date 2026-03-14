import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/gallery-clearwater-jackets.jpg";

const WalkedPast = () => {
  return (
    <Layout>
      <SEOHead
        title="She Came In Looking For Someone Else | Hells Canyon Designs"
        description="She walked in with jackets meant for another shop. She walked out with a partner who actually picks up the phone."
        canonicalPath="/stories/walked-past"
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
            She Came In Looking For Someone Else.
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
              alt="Custom embroidered jackets at Hells Canyon Designs"
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
              It was a Monday. We were just doing our thing when a woman came through the door carrying some jackets.
            </p>

            <p>She said — okay, these are the jackets we talked about.</p>

            <p>We had no idea what she was talking about.</p>

            <p>
              We get this sometimes. We're in a small town and there's another local company with a very similar name. When it happens we're honest about it — we tell people we offer the same services, give them directions, and send them on their way.
            </p>

            <p>
              But this one was different. She wasn't looking for our neighbor down the street. She was looking for another local shop. She said they had told her they moved in with us. We had heard that rumor but weren't aware of any such arrangement.
            </p>

            <p>
              She was frustrated. Clearly upset. She said she had been trying to reach them for a month and a half. They had finally answered the phone that morning and she had rushed right down with the jackets.
            </p>

            <p>Then she told us why it mattered so much.</p>

            <p>
              The jackets were for her son. He was one of the most important people in her life. She was headed to British Columbia the first week of April and she just had to have them. She also needed 24 hats to take with her.
            </p>

            <p>We told her the other shop was just a few stoplights down.</p>

            <p>She looked around for a moment.</p>
          </motion.div>

          {/* Pullquote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-12 border-l-4 border-primary py-4 pl-8"
          >
            <p className="font-heading text-2xl italic text-primary md:text-3xl">
              Maybe I can just have you do this? We said we certainly have the capability. And a very different approach to customer service.
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
              We talked for a while. She was a small business owner herself and couldn't understand how a shop could go weeks without answering phones, miss deadlines, and still survive. We told her we do it different. Our business is being built on what customer service used to be like.
            </p>

            <p>She got noticeably calmer as we talked.</p>

            <p>
              We gave her a shop tour. She was impressed with the equipment, the operation, the way things were organized. We got her into the system, sorted the artwork, sent it in for digitizing. Every time she asked if the items would be ready before her trip we said the same thing.
            </p>

            <p className="font-semibold text-foreground">We got you.</p>

            <p>
              We delivered the finished order to her shop on Friday. Spent a few minutes there. Got a tour of her business, learned about what she does, what she's building.
            </p>

            <p>
              Just two small business owners in a small town, taking care of each other.
            </p>

            <p className="font-semibold text-foreground">She knew she could trust us.</p>
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

export default WalkedPast;
