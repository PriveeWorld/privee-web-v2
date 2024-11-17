import "./globals.css";
import CustomCursor from "./components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
