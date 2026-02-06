import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      {/* CTA banner */}
      <div className="bg-primary/10 border-b border-border">
        <div className="container flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Ready to Bring Your Brand to Life?
            </h3>
            <p className="mt-1 text-muted-foreground">
              Get a custom quote in minutes — no obligation, no hassle.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link to="/custom-hats#quote">Get a Free Quote</Link>
          </Button>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h4 className="font-heading text-lg font-bold text-primary">
              HELLS CANYON DESIGNS
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Custom leather patch hats, embroidery, screen printing, and DTF
              transfers — crafted with care in Lewiston, Idaho.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-heading text-sm font-semibold tracking-wider text-foreground">
              SERVICES
            </h5>
            <nav className="mt-3 flex flex-col gap-2">
              <Link to="/custom-hats" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Custom Leather Patch Hats
              </Link>
              <Link to="/embroidery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Embroidery
              </Link>
              <Link to="/screen-printing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Screen Printing
              </Link>
              <Link to="/dtf-transfers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                DTF Transfers & Garments
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-heading text-sm font-semibold tracking-wider text-foreground">
              CONTACT
            </h5>
            <div className="mt-3 flex flex-col gap-3">
              <a href="tel:+12083057498" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                (208) 305-7498
              </a>
              <a href="mailto:info@hellscanyondesigns.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                info@hellscanyondesigns.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Lewiston, Idaho
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h5 className="font-heading text-sm font-semibold tracking-wider text-foreground">
              FOLLOW US
            </h5>
            <div className="mt-3 flex flex-col gap-2">
              <a href="https://www.instagram.com/hellscanyondesigns/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="https://www.facebook.com/hellscanyondesigns/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="https://www.tiktok.com/@hellscanyondesigns" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                TikTok
              </a>
              <a href="https://www.youtube.com/@HellsCanyonDesigns" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hells Canyon Designs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
