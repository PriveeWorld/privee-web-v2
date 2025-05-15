"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DownloadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3A1772] to-[#CD1A70] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-clash font-bold mb-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] inline-block text-transparent bg-clip-text">Download  Privee</h1>
          <p className="text-gray-600 font-clash font-medium">Enjoy movies created by various content creators</p>
        </div>
        
        <div className="space-y-4">
          {/* App Store Button */}
          <Link 
            href="https://apps.apple.com/pl/app/privee-world/id1629866639"
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
            href="https://play.google.com/store/apps/details?id=com.privee.privee_mobile"
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