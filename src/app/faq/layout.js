import faqData from "../data/faq.json";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Privee - how to create Visuals, build Movies from videos and photos, use Cinema, publish and share your content.",
  openGraph: {
    title: "FAQ",
    description: "Frequently asked questions about Privee - how to create Visuals, build Movies from videos and photos, use Cinema, publish and share your content.",
    url: "https://www.privee.world/faq",
    type: "website",
  },
};

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
