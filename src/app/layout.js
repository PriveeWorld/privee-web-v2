import "./globals.css";
import CustomCursor from "./components/CustomCursor";

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
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
