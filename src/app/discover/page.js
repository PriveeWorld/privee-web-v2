"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import Footer from "../components/Footer";

const SECTION_HEADINGS = ["Discover Privee"];

const DiscoverPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto flex flex-col">
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
      <div className="flex flex-1">
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

            <div className="mb-8">
              <p className="font-inter font-semibold text-gray-700 tracking-[0.18px] text-[18px] leading-[24px] text-center lg:text-left">
                <Link href="https://priveee.onelink.me/AMM3/VEDATOR" target="_blank" className="text-[#CD1B70] hover:text-[#3B1872] transition-colors duration-300 cursor-pointer underline">
                  Download now
                </Link>
                , invite your friends, and experience the magic of{" "}
                <Link href="https://priveee.onelink.me/AMM3/VEDATOR" target="_blank" className="text-[#CD1B70] hover:text-[#3B1872] transition-colors duration-300 cursor-pointer underline">
                  Privee World
                </Link>
                !
              </p>
            </div>

            {/* Video Section */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative max-w-md w-full"
              >
                <video
                  ref={(video) => {
                    if (video) {
                      video.addEventListener('play', () => setIsVideoPlaying(true));
                      video.addEventListener('pause', () => setIsVideoPlaying(false));
                      video.addEventListener('ended', () => setIsVideoPlaying(false));
                    }
                  }}
                  className="w-full rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  controls
                  preload="metadata"
                  poster="/images/privee_tut_thumbnail.jpg"
                  onClick={(e) => {
                    if (e.target.requestFullscreen) {
                      e.target.requestFullscreen();
                    } else if (e.target.webkitRequestFullscreen) {
                      e.target.webkitRequestFullscreen();
                    } else if (e.target.msRequestFullscreen) {
                      e.target.msRequestFullscreen();
                    }
                  }}
                >
                  <source src="/videos/privee_tut.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play Button Overlay - only show when video is not playing */}
                {!isVideoPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const video = e.currentTarget.parentElement.querySelector('video');
                      if (video) {
                        video.play();
                        setIsVideoPlaying(true);
                      }
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-black/30 rounded-full p-4 hover:bg-black/40 transition-colors duration-300"
                    >
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Learn More Section */}
            <div className="mb-12">
              <p className="mb-4 font-inter font-semibold text-gray-700 tracking-[0.01em] leading-[20px] text-center">
                Learn more about Privee World:
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <Link href="/newsroom">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold tracking-[0.01em] leading-[20px]"
                  >
                    Newsroom
                  </motion.div>
                </Link>
                
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
          <div className="absolute inset-0 -left-[35%] w-[135%] h-full">
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DiscoverPage;
