"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import Link from "next/link";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Privacy Policy",
  "Contact Us",
  "Nagradna Igra"
];

const PriveeStory = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(1);
  const SECTIONS_COUNT = SECTION_HEADINGS.length;

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <div className="relative mb-20 flex min-h-screen w-screen items-center justify-center overflow-auto">
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

      <div className="relative mb-[100px] mt-[250px] flex min-h-screen w-full max-w-[1600px] flex-col items-start justify-center overflow-y-auto px-4 py-8 sm:px-8 sm:py-16 lg:mb-[0px] lg:mt-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <h1 className="mb-4 mt-12 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-semibold leading-tight tracking-tight text-transparent sm:text-[40px] md:text-[50px] lg:text-[60px]">
              Crafting Moments, Sharing Stories
            </h1>
            <p className="text-md mx-auto mb-8 max-w-3xl font-light text-gray-700 sm:mb-12 sm:text-base md:text-lg lg:text-xl">
              Privee is all about creating moments and sharing stories through
              visual storytelling. We are dedicated to empowering individuals to
              create immersive cinematic narratives.{" "}
              <strong className="text-gray-800">
                Our goal is for memories, whether deeply personal or intended
                for sharing, to come alive in unforgettable ways that inspire
                introspection and community engagement.
              </strong>
            </p>
            <div className="mb-12 flex justify-center sm:mb-16">
              <Image
                src="/images/priveecolor.png"
                alt="Privee Logo"
                width={160}
                height={80}
                className="h-auto w-[120px] sm:w-[160px] md:w-[200px]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="rounded-lg border border-gray-200 p-6 transition sm:p-8"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="mb-2 font-clash text-lg font-semibold sm:mb-4 sm:text-xl md:text-2xl">
              Innovation in Storytelling
            </h3>
            <p className="text-sm font-light text-gray-600 sm:text-base md:text-lg">
              Seamlessly merge images and clips to create captivating narratives
              that surpass conventional norms.
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg border border-gray-200 p-6 transition sm:p-8"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="mb-2 font-clash text-lg font-semibold sm:mb-4 sm:text-xl md:text-2xl">
              Your Tale, Your Authority
            </h3>
            <p className="text-sm font-light text-gray-600 sm:text-base md:text-lg">
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
