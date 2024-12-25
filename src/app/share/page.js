// src/app/share/page.js

import { Suspense } from "react";
import ParisPage from "./ParisPage";

// 1) SERVER function to fetch video data
async function getVideoData(videoId) {
  if (!videoId) return null;

  const apiUrl = `https://38wzs9wt1a.execute-api.eu-central-1.amazonaws.com/shared-video/${videoId}`;
  const response = await fetch(apiUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch video data");

  const result = await response.json();
  return result?.data?.video || null;
}

/**
 * 2) generateMetadata – sets our SEO/OG tags
 *    - Use movieName for the title
 *    - "Watch this visual from John Doe" for description
 */
export async function generateMetadata({ searchParams }) {
  const domain = "https://p.privee.world"; // Your domain
  const videoId = searchParams?.videoId;
  const videoData = await getVideoData(videoId);

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
    visual: { captionText } = {},
    movie: { name: movieName } = {},
    user: { firstName, lastName, profilePicture } = {},
  } = videoData;

  // Title uses the movie name
  const metaTitle = movieName ? `Privee World - ${movieName}` : "Privee - Shared Video";

  // Description: "Watch this visual from John Doe"
  const userFullName = [firstName, lastName].filter(Boolean).join(" ");
  const metaDesc = userFullName
    ? `Watch more from ${userFullName}`
    : "Check out this video on Privee!";

  // Image fallback
  const metaImage = profilePicture
    ? profilePicture
    : `${domain}/images/priveelogo.png`;
    
  // Full URL for "og:url"
  const fullUrl = videoId
    ? `${domain}/share?videoId=${videoId}`
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
      card: [metaImage],
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
    },
  };
}

// 3) Default export (Server Component)
export default async function ParisPageWrapper({ searchParams }) {
  const videoId = searchParams?.videoId;
  let videoData = null;

  try {
    videoData = await getVideoData(videoId);
  } catch (err) {
    console.error(err);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ParisPage videoData={videoData} />
    </Suspense>
  );
}
