import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Privee World</title>
        <meta name="description" content="Check out this amazing movie.." />
        <meta property="og:title" content="Check out this amazing movie." />
        <meta
          property="og:description"
          content="Check out this amazing movie."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/3syf0cx/Privee.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
