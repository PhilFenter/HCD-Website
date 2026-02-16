import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomHats from "./pages/CustomHats";
import Embroidery from "./pages/Embroidery";
import ScreenPrinting from "./pages/ScreenPrinting";
import DTFTransfers from "./pages/DTFTransfers";
import About from "./pages/About";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/custom-hats" element={<CustomHats />} />
          <Route path="/embroidery" element={<Embroidery />} />
          <Route path="/screen-printing" element={<ScreenPrinting />} />
          <Route path="/dtf-transfers" element={<DTFTransfers />} />
          <Route path="/about" element={<About />} />
          <Route path="/quote" element={<Quote />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
