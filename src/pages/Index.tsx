import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import ServiceCards from "@/components/home/ServiceCards";
import SocialProof from "@/components/home/SocialProof";
import HowItWorks from "@/components/home/HowItWorks";
import PortfolioGallery from "@/components/home/PortfolioGallery";
import FAQ from "@/components/home/FAQ";

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Custom Screen Printing, Embroidery & Hats in the LC Valley | Hells Canyon Designs"
        description="Hells Canyon Designs serves Lewiston, ID and Clarkston, WA (the LC Valley) with screen printing, embroidery, custom hats, and DTF transfers for businesses, schools, and contractors."
        canonicalPath="/"
      />
      <HeroSection />
      <ServiceCards />
      <SocialProof />
      <HowItWorks />
      <PortfolioGallery />
      <FAQ />
    </Layout>
  );
};

export default Index;
