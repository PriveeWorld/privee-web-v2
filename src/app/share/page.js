// src/app/share/page.js

import { Suspense } from "react";
import ParisPage from "./ParisPage";

/**
 * Helper to fetch the video data from your API.
 * This runs on the server during SSR.
 */
async function getVideoData(videoId) {
  if (!videoId) return null;

  const apiUrl = `https://38wzs9wt1a.execute-api.eu-central-1.amazonaws.com/shared-video/${videoId}`;
  const response = await fetch(apiUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch video data");

  const result = await response.json();
  return result?.data?.video || null;
}

/**
 * generateMetadata: Next.js 13+ API for dynamic SEO/OG tags in the App Router.
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata({ searchParams }) {
  const videoId = searchParams?.videoId;
  const videoData = await getVideoData(videoId);

  const domain = "https://p.privee.world"; // Your production domain

  // Fallback metadata if no video data
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

  // Extract metadata from the API response
  const {
    visual: { title, captionText } = {},
    movie: { name: movieName } = {},
    user: { firstName, lastName, profilePicture } = {},
  } = videoData;

  const metaTitle = title || "Privee - Shared Video";
  const metaDesc = captionText || "Check out this video on Privee!";
  const metaImage = profilePicture
    ? profilePicture
    : `${domain}/images/priveelogo.png`;
  const fullUrl = videoId
    ? `${domain}/share?videoId=${videoId}`
    : `${domain}/share`;

  return {
    // Basic SEO
    title: metaTitle,
    description: metaDesc,

    // Open Graph
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: fullUrl,
      type: "video.other",
      images: [metaImage],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
    },
  };
}

/**
 * The default export is your "Page" component (Server Component),
 * which fetches data on the server and renders a Suspense boundary
 * for your Client Component.
 */
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
