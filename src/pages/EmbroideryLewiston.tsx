import LocalLandingPage from "@/components/LocalLandingPage";

const EmbroideryLewiston = () => (
  <LocalLandingPage
    service="Embroidery"
    serviceSlug="embroidery"
    city="Lewiston"
    state="ID"
    canonicalPath="/embroidery-lewiston-id"
    title="Embroidery in Lewiston, ID (LC Valley) | Hells Canyon Designs"
    description="Professional embroidery services in Lewiston, Idaho. Custom embroidery for uniforms, hats, jackets, and workwear — serving the LC Valley with fast turnaround and clean stitching."
    intro="Looking for embroidery in Lewiston, Idaho? Hells Canyon Designs runs multi-head Barudan embroidery machines for production-speed output with the precision and consistency your brand deserves. From left-chest logos to full jacket backs, we handle it all in-house right here in the LC Valley."
    mainServiceLink="/embroidery"
    faqs={[
      { question: "Where can I get embroidery done near me in the LC Valley?", answer: "Hells Canyon Designs is based in Lewiston, Idaho, serving the entire LC Valley including Clarkston, WA. We offer professional embroidery on hats, polos, jackets, workwear, and more." },
      { question: "What's the typical turnaround time for embroidery?", answer: "Most embroidery orders are completed within 2–3 weeks. Rush production is available — contact us to discuss your timeline." },
      { question: "Do you have minimums?", answer: "Yes, our embroidery minimum is 12 pieces. This includes digitization of your logo for embroidery-ready stitch files." },
      { question: "Can you help with art and mockups?", answer: "Absolutely. We digitize your logo for embroidery and provide a digital proof before stitching. If you need design work, we offer that too." },
      { question: "What can you embroider on?", answer: "Hats, polos, jackets, hoodies, workwear, bags, beanies — if it can go under our hoop, we can embroider it." },
    ]}
  />
);

export default EmbroideryLewiston;
