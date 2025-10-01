"use client";

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackTrafficSource, pageview } from '../lib/analytics';

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track traffic source on initial page load
    const trafficSource = trackTrafficSource(pathname);

    // Track page view
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);

    // Log for debugging (remove in production if needed)
    console.log('📊 Analytics:', {
      page: pathname,
      source: trafficSource?.source,
      medium: trafficSource?.medium,
      campaign: trafficSource?.utmCampaign,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function PageAnalytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
