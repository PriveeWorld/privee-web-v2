"use client";

import CustomCursor from "./CustomCursor";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const showFooter = !pathname?.startsWith('/embed');

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      {children}
      {showFooter && <Footer />}
    </div>
  );
} 