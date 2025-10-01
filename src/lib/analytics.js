// Google Analytics Event Tracking Utilities

const GA_MEASUREMENT_ID = "G-ZW8TJZZ4ZZ";

export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
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
  event({
    action: 'share',
    category: 'Blog',
    label: `${platform} - ${postSlug}`,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: 'blog_post',
      item_id: postSlug,
      content_name: postTitle,
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
  event({
    action: 'app_download_click',
    category: 'Conversion',
    label: `${appStore} - ${source}`,
    value: 1,
  });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'app_download_click', {
      app_store: appStore,
      source: source,
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
