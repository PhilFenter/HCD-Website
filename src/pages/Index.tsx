import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import SituationFinder from "@/components/home/SituationFinder";
import SocialProof from "@/components/home/SocialProof";
import HowItWorks from "@/components/home/HowItWorks";
import PartnershipSection from "@/components/home/PartnershipSection";
import HonestyStatement from "@/components/home/HonestyStatement";
import PortfolioGallery from "@/components/home/PortfolioGallery";
import InstagramFeed from "@/components/home/InstagramFeed";
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
      <SituationFinder />
      <HonestyStatement />
      <SocialProof />
      <HowItWorks />
      <PartnershipSection />
      <PortfolioGallery />
      <InstagramFeed />
      <FAQ />
    </Layout>
  );
};

export default Index;
