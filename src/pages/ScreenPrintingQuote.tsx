import { Helmet } from "react-helmet-async";
import { Phone, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import ScreenPrintQuoteBuilder from "@/components/quote/ScreenPrintQuoteBuilder";
import pressImage from "@/assets/gallery-screenprint-press.jpg";

import { Badge } from "@/components/ui/badge";


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

      <div
        className="relative min-h-screen text-foreground"
        style={{
          backgroundImage: `url(${pressImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Full-page dark overlay */}
        <div className="absolute inset-0 bg-background/90" />
        <div className="relative z-10">
        {/* Announcement bar */}
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="container flex items-center justify-center gap-4 py-2 text-xs sm:gap-6 sm:text-sm">
            <span className="flex items-center gap-1.5 font-medium text-primary">
              <Users className="h-3.5 w-3.5" />
              Built for Teams & Businesses
            </span>
            <span className="h-3 w-px bg-primary/30" />
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Quotes in 1 Business Day
            </span>
            <span className="hidden h-3 w-px bg-primary/30 sm:block" />
            <span className="hidden text-muted-foreground sm:block">
              Crafted in Idaho · Shipped Nationwide
            </span>
          </div>
        </div>

        {/* Header — no CTA button */}
        <header className="border-b border-border bg-background/95">
          <div className="container flex h-16 items-center justify-between md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-brand text-xl tracking-wider text-primary md:text-2xl">
                HELLS CANYON DESIGNS
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 font-heading text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              href="tel:+12087486242"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              (208) 748-6242
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="px-4 pb-8 pt-6 text-center sm:px-8 sm:pt-10">

          <div className="relative z-10">
            <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Custom Screen Printing for LC Valley Businesses
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
              Fast turnaround. Commercial equipment. Quote in one business day.
            </p>

            <p className="mx-auto mt-3 text-sm text-primary/80 font-medium tracking-wide">
              Trusted by businesses and teams in the Pacific Northwest since 2018
            </p>

            <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {trustBadges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant="outline"
                  className="gap-1.5 rounded-full border-primary/40 px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground hover:border-primary/60 transition-colors"
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="px-4 sm:px-8">
          <Separator className="bg-primary/40" />
        </div>

        {/* Quote Builder */}
        <section className="px-4 pb-16 pt-8 sm:px-8">
          <ScreenPrintQuoteBuilder source="google-ads" />
        </section>
        </div>
      </div>
    </>
  );
};

export default ScreenPrintingQuote;
