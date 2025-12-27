import { Suspense } from "react";
import CinemaViewer from "./CinemaViewer";

export const metadata = {
  title: "Cinema - Privee World",
  description: "Watch amazing movies and visuals on Privee Cinema",
  openGraph: {
    title: "Cinema - Privee World",
    description: "Watch amazing movies and visuals on Privee Cinema",
    url: "https://privee.world/cinema",
    type: "website",
  },
};

export default function CinemaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#17111F] to-[#0E0914]">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
              <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#CD1A70] animate-spin absolute top-0 left-0"></div>
            </div>
            <div className="text-transparent bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-xl font-clash font-medium animate-pulse">
              Loading Cinema...
            </div>
          </div>
        </div>
      }
    >
      <CinemaViewer />
    </Suspense>
  );
}

