import { Truck, Clock } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary/10 border-b border-primary/20">
      <div className="container flex items-center justify-center gap-4 py-2 text-xs sm:gap-6 sm:text-sm">
        <span className="flex items-center gap-1.5 font-medium text-primary">
          <Truck className="h-3.5 w-3.5" />
          Free Nationwide Shipping
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
  );
};

export default AnnouncementBar;
