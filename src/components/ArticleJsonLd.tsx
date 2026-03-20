import { Helmet } from "react-helmet-async";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  imageAlt?: string;
}

const BASE_URL = "https://hellscanyondesigns.com";

const ArticleJsonLd = ({ title, description, path, imageUrl, imageAlt }: ArticleJsonLdProps) => {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${path}`,
    author: {
      "@type": "Organization",
      name: "Hells Canyon Designs",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Hells Canyon Designs",
      url: BASE_URL,
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        ...(imageAlt && { description: imageAlt }),
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${path}`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(articleData)}</script>
    </Helmet>
  );
};

export default ArticleJsonLd;
