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

const PriveeHub = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(2);
  const SECTIONS_COUNT = SECTION_HEADINGS.length;

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen overflow-hidden relative bg-gradient-to-b from-[#0d1b2a] to-[#1b263b] text-white">
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          scrollToSection(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav onMenuClick={() => setIsNavOpen(true)} section={4} />

      <div className="flex relative flex-col w-full max-w-[1600px] items-start justify-center px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row w-full"
          >
            {/* Text Section */}
            <div className="flex-1 text-left">
              <h1 className="text-[50px] font-clash font-semibold tracking-tight mb-8">
                Privee Hub
              </h1>
              <p className="text-[20px] leading-relaxed mb-6">
                At <strong>Privee Hub</strong>, our mission is to empower and
                celebrate the diverse voices and talents within the Privee{" "}
                <strong>community</strong>, showcasing them in the{" "}
                <strong>Inspiration Alley</strong>.
              </p>
              <p className="text-[16px] font-light leading-relaxed mb-6">
                We believe in the power of cinematic storytelling and creativity
                to inspire, educate, and entertain. Through our platform, we aim
                to showcase the remarkable journeys and successes of Privee
                creators, from individuals and small businesses to influencers
                and celebrities.
              </p>
              <p className="text-[16px] font-light leading-relaxed mb-6">
                By shining a spotlight on their achievements, we foster a
                culture of collaboration, growth, and mutual support. We are
                dedicated to providing a space where creators can share their
                stories, connect with others, and inspire the next generation of
                Privee creators —
              </p>
              <p className="text-[16px] font-semibold leading-relaxed mb-6">
                After all, memories are just movies inside your head. Let’s
                create them in real life!
              </p>
              <p className="text-[16px] font-bold">STAY TUNED</p>
            </div>

            {/* Image Section */}
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/priveecolor.png"
                alt="Cinematic Reel"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PriveeHub;
