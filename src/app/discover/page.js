"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";

const SECTION_HEADINGS = ["Discover Privee"];

const DiscoverPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          setSection(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section={SECTION_HEADINGS[section]}
      />

      {/* Main Content */}
      <div className="flex min-h-screen lg:h-screen">
        {/* Left Content */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center px-8 pt-20 pb-20 sm:px-12 sm:pt-24 lg:px-16 lg:py-20 relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-gray-700 font-medium">Discover Privee</span>
            <h1 className="mt-4 sm:mt-2 mb-6 bg-gradient-to-tr from-[#CD1B70] to-[#3B1872] bg-clip-text text-transparent font-clash text-[40px] leading-tight sm:text-[48px] md:text-[52px] sm:whitespace-nowrap relative z-20">
              <span className="font-normal">Welcome to </span><span className="font-bold">Privee World!</span>
            </h1>

            <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
              Step into a <span className="font-semibold">new era</span> of <span className="font-semibold">visual storytelling</span>
            </p>
            <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
              Privee isn't just another social network—it's where your private moments become cinematic stories.
            </p>

            <ul className="space-y-5 mb-8 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px] text-left">
              <li className="flex items-start gap-3">
                <span className="text-gray-500 mt-1 font-semibold">•</span>
                <div>
                  <p className="font-inter font-light tracking-[0.01em] leading-[20px]">
                    Upload videos privately and organize them into themed folders—watch them transform into <span className="font-semibold">stunning personal movies</span>.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-500 mt-1 font-semibold">•</span>
                <div>
                  <p className="font-inter font-light tracking-[0.01em] leading-[20px]">
                    Likes, comments, and views? <span className="font-semibold">100% private</span> — shared only between you and the person engaging.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-500 mt-1 font-semibold">•</span>
                <div>
                  <p className="font-inter font-light tracking-[0.01em] leading-[20px]">
                     <span className="font-semibold">Dive into Cinema</span>, our main feed, for thrilling video news, sports, and lifestyle content. Swipe in any direction, tap right-left on the screen to explore more of the Privee World.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mb-20">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <p className="font-inter font-semibold text-gray-700 tracking-[0.18px] text-[18px] leading-[24px] lg:mb-0">
                  Download now, invite your friends, and experience the magic of Privee World!
                </p>

                <div className="flex gap-4">
                  <Link href="https://apps.apple.com/pl/app/privee-world/id1629866639" target="_blank">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center hover:shadow-sm transition-all duration-300"
                    >
                      <Image 
                        src="/App_Store.svg" 
                        alt="Download on the App Store" 
                        width={250} 
                        height={60} 
                        className="h-auto"
                      />
                    </motion.div>
                  </Link>
                  
                  <Link href="https://play.google.com/store/apps/details?id=com.privee.privee_mobile" target="_blank">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center hover:shadow-sm transition-all duration-300"
                    >
                      <Image 
                        src="/Google_Play.svg" 
                        alt="Get it on Google Play" 
                        width={250} 
                        height={60} 
                        className="h-auto"
                      />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Learn More Section */}
            <div>
              <p className="mb-4 font-inter font-semibold text-gray-700 tracking-[0.01em] leading-[20px] text-center">
                Learn more about Privee World:
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <Link href="/about-us">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold tracking-[0.01em] leading-[20px]"
                  >
                    Privee Story
                  </motion.div>
                </Link>
                
                <Link href="/support">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold tracking-[0.01em] leading-[20px]"
                  >
                    Help Center
                  </motion.div>
                </Link>
                
                <Link href="/faq">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold tracking-[0.01em] leading-[20px]"
                  >
                    FAQ
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right Image */}
        <div className="hidden lg:block w-2/5 relative z-0">
          <div className="absolute inset-0 -left-[15%] w-[115%] h-full">
            <Image
              src="/images/woman.png"
              alt="Privee World Visual"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
