import { Suspense } from "react";
import ParisPage from "../share/ParisPage";
import AnimatedCTA from "./AnimatedCTA";

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
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
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