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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

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

      {/* Hero Section with Image */}
      <div className="flex flex-1 min-h-[60vh] lg:min-h-[70vh]">
        {/* Left Content */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center px-6 pt-24 pb-12 sm:px-12 lg:px-16 lg:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#3A1772]/10 to-[#CD1A70]/10 text-[#3A1772] font-medium text-sm mb-4">
              Discover Privee
            </span>

            <h1 className="mb-6 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent font-clash text-[32px] leading-tight sm:text-[40px] md:text-[48px] font-bold">
              What is Privee World & How to turn your life stories to Privee movies
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full mb-6" />

         
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

      {/* Main Content Sections */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-16">

        {/* Section 1: Turn Your Day Into Memory */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 border border-purple-100 shadow-sm"
            whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">✨</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-semibold text-gray-800">
                Turn Your Day Into a Memory That Lives Forever
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 font-inter font-light leading-relaxed text-lg">
              <p>
                At the end of the day, you scroll through your phone gallery. So many photos. So many videos. And then you pause… <span className="font-semibold text-[#CD1A70]">What actually mattered today?</span>
              </p>
              <p>
                With <span className="font-semibold text-[#3A1772]">Privee</span>, you don't just store moments — you <span className="font-semibold text-[#CD1A70]">feel them again</span>.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 2: Choose What Truly Matters */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 border border-blue-100 shadow-sm"
            whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">📱</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-semibold text-gray-800">
                Choose What Truly Matters
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 font-inter font-light leading-relaxed text-lg">
              <p>
                Select one video from your phone gallery to upload. Even better, select <span className="font-semibold text-blue-600">two or three videos</span> and <span className="font-semibold text-blue-600">a few photos</span> from your gallery.
              </p>
              <p>
                Use <span className="font-semibold text-[#3A1772]">Privee Video Editor</span> to shape them easily into something meaningful — not everything, only what counts.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 3: Capture the Feeling */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 border border-green-100 shadow-sm"
            whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">💭</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-semibold text-gray-800">
                Capture the Feeling
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 font-inter font-light leading-relaxed text-lg">
              <p>
                Once you got nice video mix. Think! What did this moment mean to you today? Joy. Pride. Calm. Love. Chaos. Write it down.
              </p>
              <p>
                Use a <span className="font-semibold text-green-600">Caption</span> to express the emotion — not for likes, not for others — but as a message to your <span className="font-semibold text-green-600">future self</span>.
              </p>
              <p>
                Add a <span className="font-semibold text-[#3A1772]">Title</span>. One simple line that connects you forever to that feeling.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 4: Vision of the Moment */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 p-6 sm:p-8 border border-orange-100 shadow-sm"
            whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">🎬</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-semibold text-gray-800">
                Vision of the Moment — The Visual
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 font-inter font-light leading-relaxed text-lg">
              <p>
                When you tap <span className="font-semibold text-orange-600">DONE</span>, your video—blended with your captions and emotions—becomes a <span className="font-semibold text-[#CD1A70]">Visual</span>.
              </p>
              <p>
                In Privee World, a Visual is your personal interpretation of a moment in your life, captured and ready to be stored.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 5: Save It Where It Belongs */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 p-6 sm:p-8 border border-cyan-100 shadow-sm"
            whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">📁</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-semibold text-gray-800">
                Save It Where It Belongs
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 font-inter font-light leading-relaxed text-lg">
              <p>
                When you tap <span className="font-semibold text-cyan-600">DONE</span>, your story — now a <span className="font-semibold text-[#3A1772]">Visual</span> in Privee World — is ready to be saved to your <span className="font-semibold text-cyan-600">private Movie folder</span>.
              </p>
              <p>
                It is visible only to you: <span className="font-semibold text-[#CD1A70]">safe, organized, and timeless</span>.
              </p>
              <p>
                Choose a meaningful name for your Movie folder and define its theme — <span className="font-semibold text-cyan-600">Family, Friends, Travel, Events</span>, or any moment you want to preserve.
              </p>
              <p>
                When you capture a new moment and create another Visual, you can simply add it to the same Private Movie folder. Or, create a new one with a different theme and continue building your story there.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 6: And That's Just the Beginning */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 border border-purple-100 shadow-sm"
            whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">🎭</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-semibold text-gray-800">
                And That's Just the Beginning
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 font-inter font-light leading-relaxed text-lg">
              <p>
                Life is full of themes worth remembering. Every folder becomes a <span className="font-semibold text-[#3A1772]">Movie</span>. Every Movie becomes a <span className="font-semibold text-[#CD1A70]">memory you can relive</span>.
              </p>
              <div className="my-6 p-4 rounded-xl bg-white/70 border-l-4 border-[#CD1A70]">
                <p className="text-xl font-semibold text-gray-800">
                  Privee isn't about sharing your life. It's about <span className="text-[#CD1A70]">keeping it</span>.
                </p>
              </div>
              <p className="text-center text-2xl">
                Welcome to your private cinema. 🎬
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              className="rounded-xl bg-white p-6 shadow-md border border-gray-100"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-4 text-3xl">🎮</div>
              <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                You're in Control
              </h3>
              <p className="text-gray-600 font-inter font-light leading-relaxed">
                You can publish your Visuals, invite friends to create <span className="font-semibold text-[#3A1772]">Group Movies</span>, explore other Movies, or delete and edit any <span className="font-semibold text-[#CD1A70]">Private or Public Visuals</span> at any time.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl bg-white p-6 shadow-md border border-gray-100"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-4 text-3xl">🚀</div>
              <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                Start Your Journey
              </h3>
              <p className="text-gray-600 font-inter font-light leading-relaxed">
                Start your journey with <span className="font-semibold text-[#3A1772]">Privee World</span> now and experience something truly different.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Lifetime Upgrade Section - Special Gradient */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-r from-[#3A1772] to-[#CD1A70] p-8 sm:p-10 shadow-xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">🚀</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-bold text-white mb-2">
                Privee lifetime upgrade for your life
              </h2>
            </div>
            <div className="space-y-4 text-white/90 font-inter font-light leading-relaxed text-lg text-center max-w-3xl mx-auto">
              <p>
                We've all spent hours on social media watching other people's lives. Now, there's an opportunity to experience something entirely new.
              </p>
              <p>
                <span className="font-semibold text-white">Privee World</span> is free to download. Create and upload up to 33 videos per month, with unlimited free viewing.
              </p>
              <p className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <span className="font-semibold text-yellow-200">Limited offer:</span> To celebrate the holiday season, everyone who downloads and registers now receives a <span className="font-bold text-white">lifetime upgrade</span> (no limit in video upload).
              </p>
            </div>
            <div className="text-center mt-8">
              <p className="text-xl font-bold text-white mb-4">
                Your Life Deserves a Lifetime Upgrade.
              </p>
              <Link href="https://priveee.onelink.me/AMM3/VEDATOR" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-[#3A1772] font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg"
                >
                  Download Privee World Today
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Video Section */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 border border-gray-200 shadow-sm"
            whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
          >
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">📺</span>
              <h3 className="font-clash text-xl font-semibold text-gray-800">
                See Privee in Action
              </h3>
              <p className="text-gray-600 font-inter font-light">Watch how easy it is to create your movie</p>
            </div>

            <div className="flex justify-center">
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
                  className="w-full rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
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

                {/* Play Button Overlay */}
                {!isVideoPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-xl"
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
                      className="bg-black/40 rounded-full p-5 hover:bg-black/50 transition-colors duration-300 backdrop-blur-sm"
                    >
                      <svg
                        className="w-12 h-12 text-white ml-1"
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
          </motion.div>
        </motion.section>

        {/* B2B Opportunities Section */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg border border-gray-200"
            whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">💼</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-semibold text-gray-800">
                B2B Opportunities
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 font-inter font-light leading-relaxed text-lg">
              <p>
                <span className="font-semibold text-[#3A1772]">Privee World</span> offers a wide range of opportunities for <span className="font-semibold text-gray-800">media companies, brands, and storytellers</span> with existing communities to build, engage, and truly own their audience on the platform.
              </p>
              <p>
                For professional storytelling partnerships, brand collaborations, or media integrations, please contact{" "}
                <Link href="mailto:info@privee.world" className="text-[#CD1A70] hover:text-[#3A1772] transition-colors duration-300 underline font-semibold">
                  info@privee.world
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Learn More Section */}
        <motion.div
          className="text-center py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="mb-6 font-inter font-semibold text-gray-700 tracking-[0.01em] leading-[20px]">
            Learn more about Privee World:
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/privee-story">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold"
              >
                Privee Story
              </motion.div>
            </Link>

            <Link href="/support">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold"
              >
                Help Center
              </motion.div>
            </Link>

            <Link href="/faq">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold"
              >
                FAQ
              </motion.div>
            </Link>

            <Link href="/about-us">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold"
              >
                About Us
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DiscoverPage;
