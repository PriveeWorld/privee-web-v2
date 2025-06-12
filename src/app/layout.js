import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Privee World",
  description: "Check out this amazing movie..",
  openGraph: {
    title: "Privee World",
    description: "Check out this amazing movie.",
    url: "https://privee.world",
    images: [
      {
        url: "https://i.ibb.co/3syf0cx/Privee.png",
        width: 800,
        height: 600,
        alt: "Privee World",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
