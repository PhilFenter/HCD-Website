import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServiceCards from "@/components/home/ServiceCards";
import SocialProof from "@/components/home/SocialProof";
import HowItWorks from "@/components/home/HowItWorks";
import PortfolioGallery from "@/components/home/PortfolioGallery";
import FAQ from "@/components/home/FAQ";

const Index = () => {
  return (
    <Layout>
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
