"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-t from-gray-50 to-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* App Store Badges */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-gray-800 font-semibold text-lg mb-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent">
              Get Privee Now:
            </h3>
            <div className="flex flex-row flex-wrap items-center gap-6">
              {/* App Store Badge */}
              <Link 
                href="https://apps.apple.com/pl/app/privee-world/id1629866639"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="transition-all duration-300 hover:drop-shadow-lg"
                >
                  <Image
                    src="/images/appstore.svg"
                    alt="Download on the App Store"
                    width={130}
                    height={44}
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
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="transition-all duration-300 hover:drop-shadow-lg"
                >
                  <Image
                    src="/images/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={145}
                    height={44}
                    className="h-auto"
                  />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Copyright Text */}
          <motion.p 
            className="text-gray-600 text-sm text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            © {new Date().getFullYear()} Privee World. All rights reserved.
          </motion.p>
          
          {/* Decorative element */}
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </div>
    </footer>
  );
}