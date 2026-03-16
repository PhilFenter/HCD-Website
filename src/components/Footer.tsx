import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">

      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <h4 className="font-heading text-lg font-bold text-primary">
              HELLS CANYON DESIGNS
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Custom leather patch hats, embroidery, screen printing, and DTF
              transfers — crafted with care in Idaho, shipped nationwide.
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
              <a href="tel:+12087486242" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                (208) 748-6242
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

          {/* Service Areas */}
          <div>
            <h5 className="font-heading text-sm font-semibold tracking-wider text-foreground">
              SERVICE AREAS
            </h5>
            <nav className="mt-3 flex flex-col gap-2">
              <Link to="/screen-printing-lewiston-id" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Screen Printing – Lewiston, ID
              </Link>
              <Link to="/screen-printing-clarkston-wa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Screen Printing – Clarkston, WA
              </Link>
              <Link to="/embroidery-lewiston-id" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Embroidery – Lewiston, ID
              </Link>
              <Link to="/embroidery-clarkston-wa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Embroidery – Clarkston, WA
              </Link>
              <Link to="/custom-hats-lc-valley" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Custom Hats – LC Valley
              </Link>
            </nav>
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
