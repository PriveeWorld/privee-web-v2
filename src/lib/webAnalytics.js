// First-party usage tracking — reports to the Privee Go backend.
// Complements (does not replace) the Google Analytics helpers in analytics.js.
//
// Endpoint: POST {NEXT_PUBLIC_TRACKING_API_URL}/api/v1/public/web-events
// Events are fire-and-forget: they never block the UI and never throw.

const API_BASE =
  process.env.NEXT_PUBLIC_TRACKING_API_URL || "https://api.privee.world";

const EVENTS_URL = `${API_BASE}/api/v1/public/web-events`;

const SESSION_STORAGE_KEY = "pv_session";

// Guard against React strict-mode double effects re-reporting the same path.
let lastTrackedPath = null;

export const getOrCreateSessionId = () => {
  if (typeof window === "undefined") return "";

  try {
    let sessionId = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = window.crypto.randomUUID();
      window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
  } catch {
    // localStorage or crypto unavailable (private mode, old browser) — still
    // report the event, just without a stable session id.
    return "";
  }
};

const getUTMParams = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
    };
  } catch {
    return { utmSource: "", utmMedium: "", utmCampaign: "" };
  }
};

const sendEvent = (event) => {
  if (typeof window === "undefined") return;

  try {
    const json = JSON.stringify({
      ...event,
      referrer: document.referrer || "",
      sessionId: getOrCreateSessionId(),
      ...getUTMParams(),
    });

    // sendBeacon with text/plain avoids a CORS preflight; the backend parses
    // the raw body regardless of content type.
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(EVENTS_URL, new Blob([json], { type: "text/plain" }));
      return;
    }

    fetch(EVENTS_URL, {
      method: "POST",
      body: json,
      keepalive: true,
      headers: { "Content-Type": "text/plain" },
    }).catch(() => {});
  } catch {
    // Fire-and-forget: tracking must never break the page.
  }
};

export const trackPageView = (path) => {
  if (typeof window === "undefined" || !path) return;
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;

  sendEvent({ eventType: "PAGE_VIEW", path });
};

export const trackClick = (label, path) => {
  if (typeof window === "undefined" || !label) return;

  sendEvent({
    eventType: "CLICK",
    path: path || window.location.pathname,
    label,
  });
};
