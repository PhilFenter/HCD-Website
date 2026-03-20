import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { submitQuoteRequest } from "@/lib/submitQuote";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const SomethingElse = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const canSubmit = name.trim() && email.trim() && message.trim() && status !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    try {
      await submitQuoteRequest({
        serviceType: "other",
        name,
        email,
        phone,
        company,
        source: "website-something-else",
        notes: message,
        details: { message },
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Not Sure Where to Start? | High Country Drygoodz"
        description="Tell us what you need and we'll figure out the right path together."
        canonicalPath="/start/something-else"
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container" ref={topRef}>
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              NOT SURE WHERE TO START?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              That is completely fine. Tell us what you are thinking and we'll figure out the right path together.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mx-auto mt-12 max-w-lg"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                <p className="text-lg font-semibold text-foreground">We got your message.</p>
                <p className="text-muted-foreground">Expect to hear from us within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
                    Company or organization
                  </label>
                  <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                    Tell us what you need <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Describe what you are looking for. Don't worry about getting it perfect — we will ask the right questions from here."
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please try again or call us at 208-748-6242.
                  </div>
                )}

                <Button type="submit" size="lg" disabled={!canSubmit} className="w-full gap-2 font-heading tracking-wide">
                  {status === "submitting" ? "Sending…" : "Start The Conversation"}
                  {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SomethingElse;
