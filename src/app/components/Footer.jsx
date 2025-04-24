"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-16">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* App Store Badges */}
          <div className="flex flex-col items-center">
            <p className="text-gray-700 font-medium mb-2">Get Privee Now:</p>
            <div className="flex flex-row flex-wrap items-center gap-4">
              {/* App Store Badge */}
              <Link 
                href="https://apps.apple.com/pl/app/privee-world/id1629866639"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/images/appstore.svg"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                    className="h-auto"
                  />
                </motion.div>
              </Link>
              
              {/* Google Play Badge */}
              <Link 
                href="https://play.google.com/store/apps/details?id=com.privee.privee_mobile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/images/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={135}
                    height={40}
                    className="h-auto"
                  />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Copyright Text */}
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} Privee World. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}