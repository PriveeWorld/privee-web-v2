"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { trackDownload, trackTrafficSource } from '../../lib/analytics';

function DownloadPageContent() {
  const searchParams = useSearchParams();
  const [networkCode, setNetworkCode] = useState('VEDATOR');

  useEffect(() => {
    // Track traffic source
    trackTrafficSource(window.location.pathname);

    const fetchNetworkCode = async () => {
      const videoId = searchParams.get('videoId');
      const userWhoShareId = searchParams.get('userId');

      if (!videoId || !userWhoShareId) return;

      try {
        // The new backend's /shared-video endpoint does not expose the
        // sharer's networkCode (the legacy endpoint loaded it from a second
        // DynamoDB lookup). Fall back to the movie creator's networkCode —
        // for self-shared content the sharer and creator are the same user,
        // which is the common case. Otherwise the VEDATOR default applies.
        const url = `https://api.privee.world/api/v1/shared-video/${userWhoShareId}/${videoId}`;
        const response = await fetch(url);
        if (!response.ok) return;

        const data = await response.json();
        const code = data?.data?.creator?.networkCode;
        if (code) setNetworkCode(code);
      } catch (error) {
        console.error("Error fetching network code:", error);
      }
    };

    fetchNetworkCode();
  }, [searchParams]);

  const baseUrl = "https://priveee.onelink.me/AMM3/";
  const downloadUrl = `${baseUrl}${networkCode}`;
  console.log('Final Download URL:', downloadUrl);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3A1772] to-[#CD1A70] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-clash font-bold mb-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] inline-block text-transparent bg-clip-text">Download Privee</h1>
          <p className="text-gray-600 font-clash font-medium">Enjoy movies created by various content creators</p>
        </div>
        
        <div className="space-y-4">
          {/* App Store Button */}
          <Link
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
            onClick={() => trackDownload('App Store', 'Download Page')}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center"
            >
              <Image
                src="/images/appstore.svg"
                alt="Download on the App Store"
                width={200}
                height={60}
                className="h-auto"
              />
            </motion.div>
          </Link>

          {/* Google Play Button */}
          <Link
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
            onClick={() => trackDownload('Google Play', 'Download Page')}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center"
            >
              <Image
                src="/images/google-play-badge.png"
                alt="Get it on Google Play"
                width={220}
                height={60}
                className="h-auto"
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DownloadPageContent />
    </Suspense>
  );
}