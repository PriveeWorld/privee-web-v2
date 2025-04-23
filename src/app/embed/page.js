import { Suspense } from "react";
import ParisPage from "../share/ParisPage";

// Animated Call to Action Banner component
function AnimatedCTA() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <a 
        href="https://priveee.onelink.me/AMM3/VEDATOR"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-black/80 via-black/60 to-black/80 py-2 px-3 cursor-pointer group overflow-hidden"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <div className="animate-marquee whitespace-nowrap flex items-center justify-center gap-4 text-sm">
          <span className="text-white font-medium flex items-center gap-1">
            Watch Now on Privee
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
          <span className="text-white/70">•</span>
          <span className="text-white/90">Experience the Future of Cinematic Storytelling</span>
        </div>
      </a>
    </div>
  );
}

// Reuse the same data fetching logic
async function getVideoData(videoId, userWhoShareId) {
  if (!videoId) return null;
  if (!userWhoShareId) return null;
  const apiUrl = `https://38wzs9wt1a.execute-api.eu-central-1.amazonaws.com/shared-video/${userWhoShareId}/${videoId}`;
  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) return null;

    const result = await response.json();
    return result?.data?.video || null;
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
}

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Metadata for embeds
export async function generateMetadata({ searchParams: { videoId, userId } }) {
  const domain = "https://p.privee.world";
  let videoData = await getVideoData(videoId, userId);
  
  if (!videoData) {
    return {
      title: "Privee - Embedded Video",
    };
  }

  const {
    movie: { name: movieName } = {},
    ownerOfMovie: { firstName, lastName } = {},
  } = videoData;

  const metaTitle = movieName ? `Privee World - ${movieName}` : "Privee - Embedded Video";
  
  return {
    title: metaTitle,
  };
}

// Headers to allow embedding
export const headers = {
  'X-Frame-Options': 'ALLOWALL',
  'Content-Security-Policy': "frame-ancestors *;",
}

export default async function EmbedPageWrapper({ searchParams: { videoId, userId } }) {
  let videoData = null;

  try {
    videoData = await getVideoData(videoId, userId);
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="w-full h-full relative" style={{ 
      aspectRatio: '16/9',
      maxWidth: '100%',
      maxHeight: '100%',
      background: '#000'
    }}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-gray-200"></div>
        </div>
      }>
        <ParisPage videoData={videoData} isEmbedded={true} />
      </Suspense>
      <AnimatedCTA />
    </div>
  );
}