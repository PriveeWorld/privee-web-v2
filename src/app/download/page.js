"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const [networkCode, setNetworkCode] = useState('VEDATOR');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkCode = async () => {
      const videoId = searchParams.get('videoId');
      const userWhoShareId = searchParams.get('userId');
      
      console.log('URL Parameters:', { videoId, userWhoShareId });

      if (videoId && userWhoShareId) {
        try {
          const url = `https://38wzs9wt1a.execute-api.eu-central-1.amazonaws.com/shared-video/${userWhoShareId}/${videoId}`;
          console.log('Fetching from URL:', url);
          
          const response = await fetch(url);
          console.log('Response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Full API Response:', data);
            const userNetworkCode = data?.data?.video?.userWhoShare?.networkCode;
            console.log('Extracted Network Code:', userNetworkCode);
            
            if (userNetworkCode) {
              console.log('Setting Network Code to:', userNetworkCode);
              setNetworkCode(userNetworkCode);
            } else {
              console.log('No network code found in response');
            }
          }
        } catch (error) {
          console.error("Error fetching network code:", error);
        }
      } else {
        console.log('Missing videoId or userId parameters');
      }
      setIsLoading(false);
    };

    fetchNetworkCode();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3A1772] to-[#CD1A70]">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
      </div>
    );
  }

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