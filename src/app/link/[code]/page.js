// src/app/link/[code]/page.js
//
// Short-link entry point for pr.privee.world/link/:code.
//
// Serves full OG metadata in the initial HTML so social crawlers (Facebook,
// LinkedIn, X, Slack, WhatsApp, etc.) render a rich preview for the exact
// pasted URL. Humans are redirected client-side to the full /share page.

const SHORT_LINK_ORIGIN = "https://pr.privee.world";
const SHARE_ORIGIN = "https://p.privee.world";
const API_ORIGIN = "https://api.privee.world";
const FALLBACK_IMAGE = `${SHARE_ORIGIN}/images/priveelogo.png`;

async function resolveShortLink(code) {
  if (!code) return null;
  try {
    const res = await fetch(
      `${SHORT_LINK_ORIGIN}/link/${encodeURIComponent(code)}`,
      { redirect: "manual", next: { revalidate: 300 } }
    );
    const location = res.headers.get("location");
    if (!location) return null;
    const url = new URL(location, SHARE_ORIGIN);
    const videoId = url.searchParams.get("videoId");
    const userId = url.searchParams.get("userId");
    if (!videoId || !userId) return null;
    return { videoId, userId, destination: url.toString() };
  } catch {
    return null;
  }
}

async function getVideoData(videoId, userId) {
  try {
    const res = await fetch(
      `${API_ORIGIN}/api/v1/shared-video/${userId}/${videoId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const movie = json?.data;
    if (!movie) return null;
    const visuals = Array.isArray(movie.visuals) ? movie.visuals : [];
    const target = visuals.find((v) => v.id === videoId) || visuals[0] || null;
    if (!target) return null;
    const creator = movie.creator || {};
    return {
      movieName: movie.title || null,
      thumbnail: target.thumbnailPath || null,
      firstName: creator.firstName || null,
      lastName: creator.lastName || null,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { code } = await params;
  const shortUrl = `${SHORT_LINK_ORIGIN}/link/${code}`;

  const resolved = await resolveShortLink(code);
  const data = resolved
    ? await getVideoData(resolved.videoId, resolved.userId)
    : null;

  const movieName = data?.movieName;
  const userFullName = [data?.firstName, data?.lastName]
    .filter(Boolean)
    .join(" ");
  const title = movieName
    ? `Privee World - ${movieName}`
    : "Privee - Shared Video";
  const description = userFullName
    ? `Watch more from ${userFullName} on Privee!`
    : "Check out this video on Privee!";
  const image = data?.thumbnail || FALLBACK_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: shortUrl },
    openGraph: {
      title,
      description,
      url: shortUrl,
      siteName: "Privee World",
      type: data ? "video.other" : "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function LinkRedirectPage({ params }) {
  const { code } = await params;
  const resolved = await resolveShortLink(code);
  const destination = resolved?.destination || SHARE_ORIGIN;
  const safeDestination = JSON.stringify(destination);

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${safeDestination});`,
        }}
      />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#333",
        }}
      >
        <noscript>
          <a href={destination}>Continue to Privee</a>
        </noscript>
      </div>
    </>
  );
}
