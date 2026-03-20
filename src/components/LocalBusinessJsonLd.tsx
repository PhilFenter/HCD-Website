import { Helmet } from "react-helmet-async";

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hells Canyon Designs",
  description:
    "Custom screen printing, embroidery, leather patch hats, and DTF transfers serving the LC Valley — Lewiston, ID and Clarkston, WA.",
  url: "https://hellscanyondesigns.com",
  telephone: "+1-208-748-6242",
  email: "info@hellscanyondesigns.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "904 D St",
    addressLocality: "Lewiston",
    addressRegion: "ID",
    postalCode: "83501",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.4165,
    longitude: -117.0177,
  },
  areaServed: [
    { "@type": "City", name: "Lewiston", containedInPlace: { "@type": "State", name: "Idaho" } },
    { "@type": "City", name: "Clarkston", containedInPlace: { "@type": "State", name: "Washington" } },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/hellscanyondesigns/",
    "https://www.facebook.com/hellscanyondesigns/",
    "https://www.tiktok.com/@hellscanyondesigns",
    "https://www.youtube.com/@HellsCanyonDesigns",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Custom Apparel Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Screen Printing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Embroidery" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Leather Patch Hats" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DTF Transfers" } },
    ],
  },
};

const LocalBusinessJsonLd = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(localBusinessData)}</script>
  </Helmet>
);

export default LocalBusinessJsonLd;
