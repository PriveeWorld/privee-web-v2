import { Suspense } from "react";
import ParisPage from "../share/ParisPage";

// Reuse the same data fetching logic with caching.
// Mirrors share/page.js getVideoData — calls the new Go backend and reshapes
// the movie+visuals response into the legacy { visual, movie, ownerOfMovie,
// userWhoShare } shape ParisPage consumes.
async function getVideoData(videoId, userWhoShareId) {
  if (!videoId) return null;
  if (!userWhoShareId) return null;

  const apiUrl = `https://api.privee.world/api/v1/shared-video/${userWhoShareId}/${videoId}`;

  try {
    const response = await fetch(apiUrl, {
      next: {
        revalidate: 60 // Cache for 60 seconds
      }
    });

    if (!response.ok) return null;

    const result = await response.json();
    const movie = result?.data;
    if (!movie) return null;

    const visuals = Array.isArray(movie.visuals) ? movie.visuals : [];
    const targetVisual =
      visuals.find((v) => v.id === videoId) || visuals[0] || null;
    if (!targetVisual) return null;

    const creator = movie.creator || {};

    return {
      visual: {
        userId: targetVisual.createdById,
        title: targetVisual.title || null,
        titleStyle: targetVisual.titleStyleJson || null,
        videoPath: targetVisual.path || null,
        captionText: targetVisual.captionText || null,
        captionStyle: targetVisual.captionStyleJson || null,
        thumbnailImagePath: targetVisual.thumbnailPath || null,
        duration: targetVisual.mediaDuration ?? targetVisual.duration ?? null,
      },
      movie: {
        name: movie.title || null,
        id: movie.id,
      },
      ownerOfMovie: {
        firstName: creator.firstName || null,
        lastName: creator.lastName || null,
        profilePicture: creator.picture || null,
        networkCode: creator.networkCode || null,
      },
      userWhoShare: null,
    };
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
}



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