export const metadata = {
  title: "Arena Sport Universe",
  description:
    "Arena Sport Universe je dio Privee World multiverse platforme — mobile-first video serijala nove generacije. Za potpuni doživljaj Mundijala, ekskluzivne video materijale i praćenje svih dešavanja oko Zmajeva, pozivamo vas da uđete u novi Universe.",
  alternates: {
    canonical: "https://www.privee.world/arena",
  },
  openGraph: {
    title: "Arena Sport Universe",
    description:
      "Arena Sport Universe je dio Privee World multiverse platforme — mobile-first video serijala nove generacije.",
    url: "https://www.privee.world/arena",
    siteName: "Privee World",
    type: "website",
    locale: "bs_BA",
    images: [
      {
        url: "/images/arena/og-arena.png",
        width: 1200,
        height: 630,
        alt: "Arena Sport Universe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena Sport Universe",
    description:
      "Arena Sport Universe je dio Privee World multiverse platforme — mobile-first video serijala nove generacije.",
    images: ["/images/arena/og-arena.png"],
  },
};

export default function Layout({ children }) {
  return children;
}
