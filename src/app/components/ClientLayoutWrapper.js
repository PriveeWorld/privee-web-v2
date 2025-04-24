"use client";

import { usePathname } from "next/navigation";
import ClientLayout from "./ClientLayout";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  return (
    <div data-route={pathname}>
      <ClientLayout>
        {children}
      </ClientLayout>
    </div>
  );
} 