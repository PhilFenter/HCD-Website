import LocalLandingPage from "@/components/LocalLandingPage";

const EmbroideryClarkston = () => (
  <LocalLandingPage
    service="Embroidery"
    serviceSlug="embroidery"
    city="Clarkston"
    state="WA"
    canonicalPath="/embroidery-clarkston-wa"
    title="Embroidery in Clarkston, WA (LC Valley) | Hells Canyon Designs"
    description="Custom embroidery for Clarkston, WA businesses and teams. Hells Canyon Designs serves the LC Valley with professional embroidery on hats, uniforms, jackets, and workwear."
    intro="Need embroidery in Clarkston, Washington? Hells Canyon Designs is your LC Valley embroidery shop — located just across the bridge in Lewiston, Idaho. We run industrial Barudan machines for consistent, production-quality embroidery on hats, polos, jackets, and workwear."
    mainServiceLink="/embroidery"
    faqs={[
      { question: "Where can I get embroidery done near me in Clarkston, WA?", answer: "Hells Canyon Designs is in Lewiston, ID — just minutes from Clarkston. We're the LC Valley's go-to embroidery shop for businesses, schools, and organizations." },
      { question: "What's the turnaround time?", answer: "Standard embroidery turnaround is 2–3 weeks. Rush production is available for time-sensitive orders." },
      { question: "Do you have order minimums?", answer: "Yes, 12 pieces minimum for embroidery orders. Digitization of your logo is included." },
      { question: "Can you embroider hats?", answer: "Yes! Hat embroidery is one of our specialties. We use specialty hoops designed for curved hat panels to ensure clean, consistent results." },
    ]}
  />
);

export default EmbroideryClarkston;
