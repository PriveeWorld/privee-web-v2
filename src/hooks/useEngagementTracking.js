"use client";

import { useEffect, useRef } from 'react';
import {
  trackTimeOnPage,
  trackScrollTime,
  trackPageExit,
  trackActiveTime,
  trackUserEngagement,
} from '../lib/analytics';

export function useEngagementTracking(pagePath, contentTitle) {
  const startTimeRef = useRef(null);
  const activeTimeRef = useRef(0);
  const idleTimeRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const isActiveRef = useRef(true);
  const maxScrollDepthRef = useRef(0);
  const scrollTimesRef = useRef({});

  useEffect(() => {
    startTimeRef.current = Date.now();
    let activityCheckInterval;

    // Track user activity (mouse move, scroll, clicks, keyboard)
    const handleActivity = () => {
      const now = Date.now();
      if (!isActiveRef.current) {
        // User became active again
        idleTimeRef.current += (now - lastActivityRef.current) / 1000;
        isActiveRef.current = true;
      }
      lastActivityRef.current = now;
    };

    // Check if user is idle (no activity for 30 seconds)
    const checkActivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = (now - lastActivityRef.current) / 1000;

      if (timeSinceLastActivity > 30 && isActiveRef.current) {
        // User went idle
        isActiveRef.current = false;
      }

      if (isActiveRef.current) {
        activeTimeRef.current = (now - startTimeRef.current) / 1000 - idleTimeRef.current;
      }
    };

    // Track scroll depth with time
    const handleScroll = () => {
      handleActivity();

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      if (scrollPercent > maxScrollDepthRef.current) {
        maxScrollDepthRef.current = scrollPercent;
      }

      // Track time to reach specific scroll milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollTimesRef.current[milestone]) {
          const timeToReach = (Date.now() - startTimeRef.current) / 1000;
          scrollTimesRef.current[milestone] = timeToReach;
          trackScrollTime(milestone, timeToReach);
        }
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Start activity check interval
    activityCheckInterval = setInterval(checkActivity, 5000); // Check every 5 seconds

    // Send engagement data every 30 seconds
    const engagementInterval = setInterval(() => {
      if (startTimeRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000;
        trackUserEngagement('periodic_update', timeSpent, {
          active_time: activeTimeRef.current,
          idle_time: idleTimeRef.current,
          max_scroll_depth: maxScrollDepthRef.current,
          page_path: pagePath,
        });
      }
    }, 30000); // Every 30 seconds

    // Track on page unload
    const handleBeforeUnload = () => {
      if (startTimeRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000;

        // Track total time on page
        trackTimeOnPage(pagePath, timeSpent);

        // Track active vs idle time
        trackActiveTime(activeTimeRef.current, idleTimeRef.current);

        // Track page exit with engagement metrics
        trackPageExit(pagePath, timeSpent, maxScrollDepthRef.current);

        // Track read time for blog content
        if (contentTitle) {
          trackUserEngagement('content_read', timeSpent, {
            content_title: contentTitle,
            active_reading_time: activeTimeRef.current,
            max_scroll_depth: maxScrollDepthRef.current,
          });
        }
      }
    };

    // Also track on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden && startTimeRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000;
        trackUserEngagement('tab_hidden', timeSpent, {
          active_time: activeTimeRef.current,
          idle_time: idleTimeRef.current,
          max_scroll_depth: maxScrollDepthRef.current,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(activityCheckInterval);
      clearInterval(engagementInterval);

      // Final tracking on unmount
      handleBeforeUnload();
    };
  }, [pagePath, contentTitle]);

  return {
    getTimeSpent: () => startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0,
    getActiveTime: () => activeTimeRef.current,
    getIdleTime: () => idleTimeRef.current,
    getMaxScrollDepth: () => maxScrollDepthRef.current,
  };
}
