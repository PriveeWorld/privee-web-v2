import { Suspense } from "react";
import ParisPage from "../share/ParisPage";

// Reuse the same data fetching logic with caching
async function getVideoData(videoId, userWhoShareId) {
  if (!videoId) return null;
  if (!userWhoShareId) return null;
  
  const apiUrl = `https://38wzs9wt1a.execute-api.eu-central-1.amazonaws.com/shared-video/${userWhoShareId}/${videoId}`;
  
  try {
    const response = await fetch(apiUrl, {
      next: {
        revalidate: 60 // Cache for 60 seconds
      }
    });
    
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
    <div className="relative h-full w-full" style={{ 
      aspectRatio: '16/9',
      maxWidth: '100%',
      maxHeight: '100%',
      background: '#000'
    }}>
      <Suspense fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      }>
        <ParisPage videoData={videoData} isEmbedded={true} />
      </Suspense>
    </div>
  );
}