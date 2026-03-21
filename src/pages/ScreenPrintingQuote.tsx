import { Helmet } from "react-helmet-async";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScreenPrintQuoteBuilder from "@/components/quote/ScreenPrintQuoteBuilder";

const trustBadges = [
  { icon: "⭐", label: "5-Star Rated" },
  { icon: "📍", label: "Lewiston, Idaho" },
  { icon: "🏭", label: "ROQ P14XL Press" },
  { icon: "⚡", label: "Quote in 24 Hours" },
];

const ScreenPrintingQuote = () => {
  return (
    <>
      <Helmet>
        <title>Custom Screen Printing Quote | Hells Canyon Designs</title>
        <meta
          name="description"
          content="Get a free screen printing quote from Hells Canyon Designs in Lewiston, Idaho. Fast turnaround, commercial equipment, quote in one business day."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        {/* Top bar with phone */}
        <div className="flex items-center justify-end px-4 py-3 sm:px-8">
          <a
            href="tel:2087486242"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Phone className="h-4 w-4" />
            (208) 748-6242
          </a>
        </div>

        {/* Hero */}
        <section className="px-4 pb-6 pt-4 text-center sm:px-8 sm:pt-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Custom Screen Printing for LC Valley Businesses
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Fast turnaround. Commercial equipment. Quote in one business day.
          </p>

          <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {trustBadges.map((badge) => (
              <Badge
                key={badge.label}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium"
              >
                <span>{badge.icon}</span>
                {badge.label}
              </Badge>
            ))}
          </div>
        </section>

        {/* Quote Builder */}
        <section className="px-4 pb-16 sm:px-8">
          <ScreenPrintQuoteBuilder source="google-ads" />
        </section>
      </div>
    </>
  );
};

export default ScreenPrintingQuote;
