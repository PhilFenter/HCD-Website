import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CustomHats from "./pages/CustomHats";
import Embroidery from "./pages/Embroidery";
import ScreenPrinting from "./pages/ScreenPrinting";
import DTFTransfers from "./pages/DTFTransfers";
import About from "./pages/About";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import ScreenPrintingLewiston from "./pages/ScreenPrintingLewiston";
import ScreenPrintingClarkston from "./pages/ScreenPrintingClarkston";
import EmbroideryLewiston from "./pages/EmbroideryLewiston";
import EmbroideryClarkston from "./pages/EmbroideryClarkston";
import CustomHatsLCValley from "./pages/CustomHatsLCValley";
import Seekins from "./pages/stories/Seekins";
import Clearwater from "./pages/stories/Clearwater";
import Tristate from "./pages/stories/Tristate";
import GraceBuilders from "./pages/stories/GraceBuilders";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/custom-hats" element={<CustomHats />} />
            <Route path="/embroidery" element={<Embroidery />} />
            <Route path="/screen-printing" element={<ScreenPrinting />} />
            <Route path="/dtf-transfers" element={<DTFTransfers />} />
            <Route path="/about" element={<About />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/screen-printing-lewiston-id" element={<ScreenPrintingLewiston />} />
            <Route path="/screen-printing-clarkston-wa" element={<ScreenPrintingClarkston />} />
            <Route path="/embroidery-lewiston-id" element={<EmbroideryLewiston />} />
            <Route path="/embroidery-clarkston-wa" element={<EmbroideryClarkston />} />
            <Route path="/custom-hats-lc-valley" element={<CustomHatsLCValley />} />
            <Route path="/stories/seekins" element={<Seekins />} />
            <Route path="/stories/clearwater" element={<Clearwater />} />
            <Route path="/stories/tristate" element={<Tristate />} />
            <Route path="/stories/make-them-cool" element={<GraceBuilders />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
