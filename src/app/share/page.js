// src/app/share/page.js

import { Suspense } from "react";
import ParisPage from "./ParisPage";
import EmbedCode from "./EmbedCode";

// 1) SERVER function to fetch video data with caching
//    Points at the new Go backend. The endpoint accepts either a movieId or a
//    visualId in the path segment and returns the parent movie with its visuals.
//    We then pick the target visual (matching the shared videoId) and reshape
//    the response into the legacy { visual, movie, ownerOfMovie, userWhoShare }
//    form that ParisPage / generateMetadata already consume.
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
      // Legacy endpoint returned userWhoShare separately; the new endpoint
      // doesn't include it. ParisPage only uses it for a display name which
      // is non-essential, so leave null.
      userWhoShare: null,
    };
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
}

/**
 * 2) generateMetadata – sets our SEO/OG tags
 *    - Use movieName for the title
 *    - "Watch this visual from John Doe" for description
 */
export async function generateMetadata({ searchParams }) {
  const domain = "https://p.privee.world"; // Your domain
  const { videoId, userId: userWhoShareId } = searchParams;
  let videoData = await getVideoData(videoId, userWhoShareId);

  // If no data, fallback
  if (!videoData) {
    return {
      title: "Privee - Shared Video",
      description: "Check out this video on Privee!",
      openGraph: {
        title: "Privee - Shared Video",
        description: "Check out this video on Privee!",
        url: `${domain}/share`,
        images: [`${domain}/images/priveelogo.png`],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Privee - Shared Video",
        description: "Check out this video on Privee!",
        images: [`${domain}/images/priveelogo.png`],
      },
    };
  }

  // Extract data
  const {
    visual: {
      captionText,
      thumbnailImagePath,
      duration,
    } = {},
    movie: { name: movieName } = {},
    ownerOfMovie: { firstName, lastName, profilePicture } = {},
  } = videoData;

  // Title uses the movie name
  const metaTitle = movieName ? `Privee World - ${movieName}` : "Privee - Shared Video";

  // Description: "Watch this visual from John Doe"
  const userFullName = [firstName, lastName].filter(Boolean).join(" ");

  const metaDesc = userFullName
    ? `Watch more from ${userFullName} on Privee!`
    : "Check out this video on Privee!";

  // Image fallback
  const metaImage = thumbnailImagePath
    ? thumbnailImagePath
    : `${domain}/images/priveelogo.png`;
    
  // Full URL for "og:url"
  const fullUrl = videoId && userWhoShareId
    ? `${domain}/share?videoId=${videoId}&userId=${userWhoShareId}`
    : `${domain}/share`;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: fullUrl,
      type: "video.other",
      images: [metaImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
    },
  };
}

// 3) Default export (Server Component)
export default async function ParisPageWrapper({ searchParams }) {
  const { videoId, userId: userWhoShareId } = searchParams;
  let videoData = null;

  try {
    videoData = await getVideoData(videoId, userWhoShareId);
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      }>
        <ParisPage videoData={videoData} />
      </Suspense>
      
   
    </>
  );
}
