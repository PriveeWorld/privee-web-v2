import { metadata } from './metadata';
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";
import "./globals.css";

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
