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
      <div className="flex flex-col flex-1">
        {/* Hero Section */}
        <div className="w-full flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="w-full lg:w-3/5 flex flex-col justify-center px-8 pt-20 pb-12 sm:px-12 sm:pt-24 lg:px-16 lg:py-20 relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="text-gray-700 font-medium">Discover Privee</span>
              <h1 className="mt-4 sm:mt-2 mb-6 bg-gradient-to-tr from-[#CD1B70] to-[#3B1872] bg-clip-text text-transparent font-clash text-[32px] leading-tight sm:text-[40px] md:text-[44px] relative z-20">
                <span className="font-bold">What is Privee World</span> <span className="font-normal">&</span> <span className="font-bold">How to turn your life stories to Privee movies</span>
              </h1>

              {/* Section: Turn Your Day Into a Memory */}
              <h2 className="mt-8 mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                Turn Your Day Into a Memory That Lives Forever
              </h2>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                At the end of the day, you scroll through your phone gallery. So many photos. So many videos. And then you pause… <span className="font-semibold">What actually mattered today?</span>
              </p>
              <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                With <span className="font-semibold">Privee</span>, you don't just store moments — you <span className="font-semibold">feel them again</span>.
              </p>

              {/* Section: Choose What Truly Matters */}
              <h2 className="mt-8 mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                Choose What Truly Matters
              </h2>
              <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Select one video from your phone gallery to upload. Even better, select <span className="font-semibold">two or three videos</span> and <span className="font-semibold">a few photos</span> from your gallery. Use <span className="font-semibold">Privee Video Editor</span> to shape them easily into something meaningful — not everything, only what counts.
              </p>

              {/* Section: Capture the Feeling */}
              <h2 className="mt-8 mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                Capture the Feeling
              </h2>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Once you got nice video mix. Think! What did this moment mean to you today? Joy. Pride. Calm. Love. Chaos. Write it down.
              </p>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Use a <span className="font-semibold">Caption</span> to express the emotion — not for likes, not for others — but as a message to your <span className="font-semibold">future self</span>.
              </p>
              <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Add a <span className="font-semibold">Title</span>. One simple line that connects you forever to that feeling.
              </p>

              {/* Section: Vision of the Moment */}
              <h2 className="mt-8 mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                Vision of the Moment — The Visual
              </h2>
              <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                When you tap <span className="font-semibold">DONE</span>, your video—blended with your captions and emotions—becomes a <span className="font-semibold">Visual</span>. In Privee World, a Visual is your personal interpretation of a moment in your life, captured and ready to be stored.
              </p>

              {/* Section: Save It Where It Belongs */}
              <h2 className="mt-8 mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                Save It Where It Belongs
              </h2>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                When you tap <span className="font-semibold">DONE</span>, your story — now a <span className="font-semibold">Visual</span> in Privee World — is ready to be saved to your <span className="font-semibold">private Movie folder</span>. It is visible only to you: <span className="font-semibold">safe, organized, and timeless</span>.
              </p>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Choose a meaningful name for your Movie folder and define its theme — <span className="font-semibold">Family, Friends, Travel, Events</span>, or any moment you want to preserve.
              </p>
              <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                When you capture a new moment and create another Visual, you can simply add it to the same Private Movie folder. Or, create a new with a different theme and continue building your story there.
              </p>

              {/* Section: And That's Just the Beginning */}
              <h2 className="mt-8 mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                And That's Just the Beginning
              </h2>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Life is full of themes worth remembering. Every folder becomes a <span className="font-semibold">Movie</span>. Every Movie becomes a <span className="font-semibold">memory you can relive</span>.
              </p>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                <span className="font-semibold">Privee isn't about sharing your life.</span> It's about <span className="font-semibold">keeping it</span>.
              </p>
              <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Welcome to your private cinema. 🎬
              </p>

              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                You're in control of every moment. You can publish your Visuals, invite friends to create <span className="font-semibold">Group Movies</span>, explore other Movies, or delete and edit any <span className="font-semibold">Private or Public Visuals</span> at any time.
              </p>
              <p className="mb-8 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Start your journey with <span className="font-semibold">Privee World</span> now and experience something truly different.
              </p>

              {/* Section: Lifetime Upgrade */}
              <h2 className="mt-8 mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                Privee life time upgrade for your life
              </h2>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                We've all spent hours on social media watching other people's lives. Now, there's an opportunity to experience something entirely new.
              </p>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                <span className="font-semibold">Privee World</span> is free to download. Create and upload up to 33 videos per month, with unlimited free viewing.
              </p>
              <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                Limited offer: To celebrate the holiday season, everyone who downloads and registers now receives a lifetime upgrade (no limit in video upload).
              </p>
              <p className="mb-4 text-gray-700 font-inter font-semibold tracking-[0.01em] leading-[24px]">
                Your Life Deserves a Lifetime Upgrade.
              </p>
              <p className="mb-8 text-gray-700 font-inter font-semibold tracking-[0.01em] leading-[24px]">
                <Link href="https://priveee.onelink.me/AMM3/VEDATOR" target="_blank" className="text-[#CD1B70] hover:text-[#3B1872] transition-colors duration-300 cursor-pointer underline">
                  Download Privee World today.
                </Link>
              </p>

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

              {/* B2B Opportunities Section */}
              <div className="mt-12 mb-8 p-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border border-gray-200">
                <h2 className="mb-4 text-gray-800 font-clash font-semibold text-[24px] sm:text-[28px] leading-tight">
                  B2B Opportunities
                </h2>
                <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                  <span className="font-semibold">Privee World</span> offers a wide range of opportunities for <span className="font-semibold">media companies, brands, and storytellers</span> with existing communities to build, engage, and truly own their audience on the platform.
                </p>
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[24px]">
                  For professional storytelling partnerships, brand collaborations, or media integrations, please contact{" "}
                  <Link href="mailto:info@privee.world" className="text-[#CD1B70] hover:text-[#3B1872] transition-colors duration-300 cursor-pointer underline font-semibold">
                    info@privee.world
                  </Link>
                </p>
              </div>

              {/* Learn More Section */}
              <div className="mb-12">
                <p className="mb-4 font-inter font-semibold text-gray-700 tracking-[0.01em] leading-[20px] text-center">
                  Learn more about Privee World:
                </p>

                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                  <Link href="/privee-story">
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
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DiscoverPage;
