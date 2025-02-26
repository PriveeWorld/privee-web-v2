
import { Suspense } from "react";
import ParisPage from "../share/ParisPage";

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

// Metadata for embeds
export async function generateMetadata({ searchParams }) {
  const domain = "https://p.privee.world";
  const videoId = searchParams?.videoId;
  const userWhoShareId = searchParams?.userId;
  let videoData = await getVideoData(videoId, userWhoShareId);
  
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

export default async function EmbedPageWrapper({ searchParams }) {
  const videoId = searchParams?.videoId;
  const userWhoShareId = searchParams?.userId;
  let videoData = null;

  try {
    videoData = await getVideoData(videoId, userWhoShareId);
  } catch (err) {
    console.error(err);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ParisPage videoData={videoData} isEmbedded={true} />
    </Suspense>
  );
}