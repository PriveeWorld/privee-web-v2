// Google Analytics Event Tracking Utilities

const GA_MEASUREMENT_ID = "G-ZW8TJZZ4ZZ";

// Traffic Source Tracking - Where are users coming from?
export const getTrafficSource = () => {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer;

  // Get UTM parameters
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const utmTerm = urlParams.get('utm_term');
  const utmContent = urlParams.get('utm_content');

  let source = 'direct'; // Default: typed URL or bookmark
  let medium = 'none';
  let category = 'Direct Traffic';

  // Check UTM parameters first (most accurate)
  if (utmSource) {
    source = utmSource;
    medium = utmMedium || 'unknown';
    category = 'Campaign Traffic';
  }
  // Check referrer
  else if (referrer) {
    const referrerDomain = new URL(referrer).hostname;

    // Social Media
    if (referrerDomain.includes('facebook.com')) {
      source = 'facebook';
      medium = 'social';
      category = 'Social Media';
    } else if (referrerDomain.includes('instagram.com')) {
      source = 'instagram';
      medium = 'social';
      category = 'Social Media';
    } else if (referrerDomain.includes('twitter.com') || referrerDomain.includes('t.co')) {
      source = 'twitter';
      medium = 'social';
      category = 'Social Media';
    } else if (referrerDomain.includes('linkedin.com')) {
      source = 'linkedin';
      medium = 'social';
      category = 'Social Media';
    } else if (referrerDomain.includes('tiktok.com')) {
      source = 'tiktok';
      medium = 'social';
      category = 'Social Media';
    } else if (referrerDomain.includes('youtube.com')) {
      source = 'youtube';
      medium = 'social';
      category = 'Social Media';
    }
    // Search Engines
    else if (referrerDomain.includes('google.')) {
      source = 'google';
      medium = 'organic';
      category = 'Search Engine';
    } else if (referrerDomain.includes('bing.')) {
      source = 'bing';
      medium = 'organic';
      category = 'Search Engine';
    } else if (referrerDomain.includes('yahoo.')) {
      source = 'yahoo';
      medium = 'organic';
      category = 'Search Engine';
    }
    // Other websites
    else {
      source = referrerDomain;
      medium = 'referral';
      category = 'Referral Traffic';
    }
  }

  return {
    source,
    medium,
    category,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    referrer,
  };
};

export const trackTrafficSource = (pagePath) => {
  const trafficSource = getTrafficSource();

  if (typeof window !== 'undefined' && window.gtag && trafficSource) {
    window.gtag('event', 'traffic_source', {
      event_category: 'Traffic',
      event_label: trafficSource.source,
      traffic_category: trafficSource.category,
      source: trafficSource.source,
      medium: trafficSource.medium,
      campaign: trafficSource.utmCampaign || 'none',
      referrer: trafficSource.referrer || 'none',
      page_path: pagePath,
    });
  }

  return trafficSource;
};

export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const trafficSource = getTrafficSource();

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      ...(trafficSource && {
        campaign_source: trafficSource.source,
        campaign_medium: trafficSource.medium,
        campaign_name: trafficSource.utmCampaign,
      }),
    });
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Blog-specific events
export const trackBlogView = (postTitle, postSlug, category) => {
  event({
    action: 'view_blog_post',
    category: 'Blog',
    label: `${postSlug} - ${postTitle}`,
    value: 1,
  });

  // Track individual post
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: postTitle,
      page_location: window.location.href,
      page_path: window.location.pathname,
      content_type: 'blog_post',
      content_category: category || 'News',
    });
  }
};

export const trackBlogShare = (platform, postTitle, postSlug) => {
  const trafficSource = getTrafficSource();

  event({
    action: 'share',
    category: 'Blog',
    label: `${platform} - ${postSlug}`,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      event_category: 'Engagement',
      method: platform,
      content_type: 'blog_post',
      item_id: postSlug,
      content_name: postTitle,
      // Track where the sharer came from originally
      original_source: trafficSource?.source || 'unknown',
      came_from_campaign: trafficSource?.utmCampaign || 'none',
    });
  }
};

export const trackLinkClick = (destination, label) => {
  event({
    action: 'click',
    category: 'Link',
    label: label || destination,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      link_destination: destination,
      link_label: label,
    });
  }
};

export const trackDownload = (appStore, source) => {
  const trafficSource = getTrafficSource();

  event({
    action: 'app_download_click',
    category: 'Conversion',
    label: `${appStore} - ${source}`,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'app_download_click', {
      event_category: 'Conversion',
      app_store: appStore,
      source: source,
      // Include traffic source to see which campaigns drive downloads
      came_from: trafficSource?.source || 'unknown',
      traffic_medium: trafficSource?.medium || 'unknown',
      campaign: trafficSource?.utmCampaign || 'none',
    });
  }
};

export const trackFormSubmit = (formName) => {
  event({
    action: 'form_submit',
    category: 'Form',
    label: formName,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_name: formName,
    });
  }
};

export const trackScrollDepth = (percentage, page) => {
  event({
    action: 'scroll',
    category: 'Engagement',
    label: `${page} - ${percentage}%`,
    value: percentage,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      percent_scrolled: percentage,
      page_path: page,
    });
  }
};

export const trackVideoPlay = (videoTitle, videoUrl) => {
  event({
    action: 'video_play',
    category: 'Video',
    label: videoTitle || videoUrl,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_start', {
      video_title: videoTitle,
      video_url: videoUrl,
    });
  }
};

export const trackNavigation = (section, from) => {
  event({
    action: 'navigate',
    category: 'Navigation',
    label: `${from} -> ${section}`,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'navigate', {
      from_section: from,
      to_section: section,
    });
  }
};

// Time tracking utilities
export const trackTimeOnPage = (pagePath, timeSpentSeconds) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_on_page', {
      event_category: 'Engagement',
      event_label: pagePath,
      value: Math.round(timeSpentSeconds),
      time_spent_seconds: Math.round(timeSpentSeconds),
      page_path: pagePath,
    });
  }
};

export const trackScrollTime = (scrollDepth, timeToScroll) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_time', {
      event_category: 'Engagement',
      event_label: `${scrollDepth}% reached`,
      value: Math.round(timeToScroll),
      scroll_depth: scrollDepth,
      time_to_scroll_seconds: Math.round(timeToScroll),
      page_path: window.location.pathname,
    });
  }
};

export const trackReadTime = (contentTitle, readTimeSeconds) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'content_read_time', {
      event_category: 'Engagement',
      event_label: contentTitle,
      value: Math.round(readTimeSeconds),
      read_time_seconds: Math.round(readTimeSeconds),
      content_title: contentTitle,
    });
  }
};

export const trackUserEngagement = (engagementType, duration, details = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_engagement', {
      event_category: 'Engagement',
      event_label: engagementType,
      value: Math.round(duration),
      engagement_time_msec: Math.round(duration * 1000),
      engagement_type: engagementType,
      ...details,
    });
  }
};

export const trackPageExit = (pagePath, timeSpent, scrollDepth) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_exit', {
      event_category: 'Engagement',
      event_label: pagePath,
      value: Math.round(timeSpent),
      time_on_page: Math.round(timeSpent),
      max_scroll_depth: scrollDepth,
      page_path: pagePath,
    });
  }
};

// Session tracking
export const trackSessionStart = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'session_start', {
      event_category: 'Session',
      session_start_time: new Date().toISOString(),
    });
  }
};

export const trackActiveTime = (activeSeconds, idleSeconds) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'active_time', {
      event_category: 'Engagement',
      event_label: 'User Activity',
      value: Math.round(activeSeconds),
      active_time_seconds: Math.round(activeSeconds),
      idle_time_seconds: Math.round(idleSeconds),
      page_path: window.location.pathname,
    });
  }
};
