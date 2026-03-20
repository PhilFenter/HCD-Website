import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
}

const BASE_URL = "https://hellscanyondesigns.com";

const SEOHead = ({ title, description, canonicalPath }: SEOHeadProps) => {
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEOHead;
