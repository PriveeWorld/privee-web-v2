import { Inter } from 'next/font/google'
import "./globals.css";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageAnalytics from "@/components/PageAnalytics";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL("https://privee.world"),
  title: {
    default: "Privee World",
    template: "%s | Privee World",
  },
  description: "Create Movies from your videos and photos. Turn everyday moments into cinematic stories. Watch curated content on Cinema. Your personal movie maker - private first.",
  keywords: ["privee", "privee world", "create movies from videos", "video collage maker", "photo video story", "private video diary", "video memories", "cinematic video stories", "personal movie maker", "video journal app", "create video collage", "turn photos into movies", "private social media", "video story creator"],
  openGraph: {
    title: "Privee World",
    description: "Create Movies from your videos and photos. Turn everyday moments into cinematic stories. Your personal movie maker - private first.",
    url: "https://privee.world",
    siteName: "Privee World",
    images: [
      {
        url: "/images/priveelogo.png",
        width: 800,
        height: 600,
        alt: "Privee World",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privee World",
    description: "Create Movies from your videos and photos. Turn everyday moments into cinematic stories. Your personal movie maker - private first.",
    images: ["/images/priveelogo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"Privee World","alternateName":"Privee World GmbH","url":"https://privee.world","logo":"https://privee.world/images/priveelogo.png","description":"A media-tech company empowering users to create cinematic video stories and Movies from their everyday moments. Private first.","address":{"@type":"PostalAddress","addressLocality":"Vienna","addressCountry":"AT"}},{"@type":"WebSite","name":"Privee World","url":"https://privee.world"},{"@type":"SoftwareApplication","name":"Privee World","operatingSystem":"iOS, Android","applicationCategory":"MultimediaApplication","description":"Create Movies from your videos and photos. Turn everyday moments into cinematic stories. Watch curated content on Cinema.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}]}`
          }}
        />
      </head>
      <body>
        <PageAnalytics />
        <div id="root">
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </div>
      </body>
    </html>
  );
}
