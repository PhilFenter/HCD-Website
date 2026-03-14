import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/gallery-embroidered-patch.jpg";

const Clearwater = () => {
  return (
    <Layout>
      <SEOHead
        title="Clearwater Paper — 685 Jackets by Thanksgiving | Hells Canyon Designs"
        description="How two pallets of KUHL jackets became 685 custom-embroidered gifts — delivered early — and what happened when the last one showed up wrong."
        canonicalPath="/stories/clearwater"
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
            We Got You. Before You Even Knew You Needed It.
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
              alt="Custom embroidered jackets for Clearwater Paper"
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
            <p>It started with hats.</p>

            <p>
              Clearwater Paper came to us needing something special — leather patch hats to give out to employees who were doing exceptional work. Not standard issue. Something worth earning. After some good lively back and forth we got them right and they came out great.
            </p>

            <p>
              That led to a conversation with Dane, their general manager, about something bigger.
            </p>

            <p>
              He wanted to do something special for all their employees — high end KUHL jackets embroidered with the Clearwater Paper logo. But not just the standard logo. He wanted it redesigned in the shape of Idaho. We said sure. How many jackets?
            </p>

            <p>He said they had about 750 employees. He'd like to get each of them one.</p>

            <p>We said that would be just fine.</p>

            <p>
              What we didn't quite expect was two pallets of boxes showing up with a couple three guys to help offload them into our staging area. Late October. Dane said if we could have them ready by January that would be great.
            </p>

            <p>We had them done by Thanksgiving.</p>
          </motion.div>

          {/* Pullquote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-12 border-l-4 border-primary py-4 pl-8"
          >
            <p className="font-heading text-2xl italic text-primary md:text-3xl">
              Two pallets of jackets. Done by Thanksgiving. And when one last jacket showed up wrong — we already had a replacement on the way.
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
              There were some sizing issues after delivery so they dropped off another 75 or 80 jackets to be done. We handled those too. There was one last jacket — Cindy had been telling us it was coming, it was coming, it was on its way. It finally arrived two days ago.
            </p>

            <p>
              Just before they came to pick up that last batch we pulled out the jacket Cindy had been waiting on. It already had a logo on it. Wrong order from another supplier.
            </p>

            <p>
              We took a picture and texted it to her right away. Is this supposed to have a logo on it?
            </p>

            <p>
              She said oh my god no. I can't believe it. I waited so long for that jacket.
            </p>

            <p>
              We had already jumped on our supplier before we even sent that text. Black, 2XL, women's, same model, shipping from Seattle. Two days out.
            </p>

            <p>We told her — we have one coming. Don't worry about it.</p>

            <p>She said — you can actually get that jacket in that size and model?</p>

            <p>Of course. And next time, call us first.</p>

            <p className="font-semibold text-foreground">We got you.</p>
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

export default Clearwater;
