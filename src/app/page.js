"use client";
import dynamic from "next/dynamic";

// Import the actual home component with SSR disabled
const HomeComponent = dynamic(() => import("./HomeComponent"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          {/* Animated loading spinner */}
          <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#3A1772] animate-spin absolute top-0 left-0"></div>
        </div>
        
        {/* Loading text with gradient */}
        <div className="text-transparent bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-xl font-clash font-medium animate-pulse">
          Loading Privee World...
        </div>
        
        {/* Animated dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[#3A1772] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#CD1A70] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-[#3A1772] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  )
});

export default function Home() {
  return <HomeComponent />;
}