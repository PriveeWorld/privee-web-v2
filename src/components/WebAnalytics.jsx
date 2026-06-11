"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "../lib/webAnalytics";

// Reports a first-party PAGE_VIEW to the Privee backend on mount and on every
// route change. Mounted once in the root layout, alongside PageAnalytics (GA).
export default function WebAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
