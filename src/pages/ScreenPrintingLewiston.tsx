import LocalLandingPage from "@/components/LocalLandingPage";

const ScreenPrintingLewiston = () => (
  <LocalLandingPage
    service="Screen Printing"
    serviceSlug="screen-printing"
    city="Lewiston"
    state="ID"
    canonicalPath="/screen-printing-lewiston-id"
    title="Screen Printing in Lewiston, ID (LC Valley) | Hells Canyon Designs"
    description="Custom screen printing in Lewiston, Idaho. Hells Canyon Designs offers fast turnaround, in-house production, and consistent quality for LC Valley businesses, teams, and events."
    intro="Looking for screen printing in Lewiston, Idaho? Hells Canyon Designs is your local LC Valley screen printing shop. We handle everything in-house — from art prep to finished product — so you get consistent quality and fast turnaround without the runaround. Whether it's team jerseys, company uniforms, or event shirts, we've got you covered."
    mainServiceLink="/screen-printing"
    faqs={[
      { question: "Where can I get screen printing done near me in Lewiston, ID?", answer: "Hells Canyon Designs is based right here in Lewiston, Idaho. We serve the entire LC Valley including Clarkston, WA and surrounding areas with professional screen printing services." },
      { question: "What's the typical turnaround time for screen printing?", answer: "Standard turnaround is 2–3 weeks from art approval. Rush orders (1–2 weeks) are available for an additional fee. Need it faster? Call us and we'll see what we can do." },
      { question: "Do you have minimum order requirements?", answer: "Yes, our minimum for screen printing is 24 pieces. This keeps per-piece pricing affordable since screen printing requires custom screens for each color." },
      { question: "Can you help with art and mockups?", answer: "Absolutely. Send us your logo or idea and we'll create a digital mockup for your approval before we print. We also offer full art design services." },
      { question: "What kind of garments can you screen print on?", answer: "T-shirts, hoodies, tank tops, long sleeves, polos, and more. We source from trusted brands like Bella+Canvas, Gildan, Next Level, and others." },
    ]}
  />
);

export default ScreenPrintingLewiston;
