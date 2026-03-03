import { Helmet } from "react-helmet-async";

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
}

const ServiceJsonLd = ({ name, description, url }: ServiceJsonLdProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: "Hells Canyon Designs",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lewiston",
        addressRegion: "ID",
        addressCountry: "US",
      },
    },
    areaServed: [
      { "@type": "City", name: "Lewiston" },
      { "@type": "City", name: "Clarkston" },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default ServiceJsonLd;
