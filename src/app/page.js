"use client";
import dynamic from "next/dynamic";

// Import the actual home component with SSR disabled
const HomeComponent = dynamic(() => import("./HomeComponent"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  )
});

export default function Home() {
  return <HomeComponent />;
}