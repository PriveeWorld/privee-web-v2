"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Privacy Policy",
  "Contact Us",
];

const PriveeStory = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(1);
  const SECTIONS_COUNT = SECTION_HEADINGS.length;

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen overflow-hidden relative">
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          scrollToSection(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section={SECTION_HEADINGS[section]}
      />

      <div className="flex relative flex-col w-full max-w-[1600px] items-start justify-center px-4 sm:px-8 py-8 sm:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full"
          >
            <h1 className="text-[32px] mt-12 sm:text-[40px] md:text-[50px] lg:text-[60px] font-clash font-semibold bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent tracking-tight mb-4 leading-tight">
              Crafting Moments, Sharing Stories
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-12">
              Privee is all about creating moments and sharing stories through
              visual storytelling. We are dedicated to empowering individuals to
              create immersive cinematic narratives.{" "}
              <strong className="text-gray-800">
                Our goal is for memories, whether deeply personal or intended
                for sharing, to come alive in unforgettable ways that inspire
                introspection and community engagement.
              </strong>
            </p>
            <div className="flex justify-center mb-12 sm:mb-16">
              <Image
                src="/images/priveecolor.png"
                alt="Privee Logo"
                width={160}
                height={80}
                className="w-[120px] sm:w-[160px] md:w-[200px] h-auto"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="p-6 sm:p-8 border border-gray-200 rounded-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-clash font-semibold mb-2 sm:mb-4">
              Innovation in Storytelling
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-light text-gray-600">
              Seamlessly merge images and clips to create captivating narratives
              that surpass conventional norms.
            </p>
          </motion.div>

          <motion.div
            className="p-6 sm:p-8 border border-gray-200 rounded-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-clash font-semibold mb-2 sm:mb-4">
              Your Tale, Your Authority
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-light text-gray-600">
              {
                "Empower yourself to be the narrator of your life's cinematic moments while preserving privacy and authenticity."
              }
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PriveeStory;
