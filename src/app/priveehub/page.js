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

const PriveeHub = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(2);
  const SECTIONS_COUNT = SECTION_HEADINGS.length;

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <div className="max-w-screen mx-auto flex h-screen w-full items-center justify-center overflow-y-auto bg-gradient-to-b from-[#0d1b2a] to-[#1b263b] p-0 text-white lg:p-8">
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

      <div className="relative mt-24 flex w-full max-w-[1400px] flex-col items-start justify-center px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex w-full flex-col md:flex-row"
          >
            {/* Text Section */}
            <div className="mt-[320px] flex-1 text-left lg:mt-0">
              <h1 className="mb-8 font-clash text-[50px] font-semibold tracking-tight">
                Privee Hub
              </h1>
              <p className="mb-6 text-[20px] leading-relaxed">
                At <strong>Privee Hub</strong>, our mission is to empower and
                celebrate the diverse voices and talents within the Privee{" "}
                <strong>community</strong>, showcasing them in the{" "}
                <strong>Inspiration Alley</strong>.
              </p>
              <p className="mb-6 text-[16px] font-light leading-relaxed">
                We believe in the power of cinematic storytelling and creativity
                to inspire, educate, and entertain. Through our platform, we aim
                to showcase the remarkable journeys and successes of Privee
                creators, from individuals and small businesses to influencers
                and celebrities.
              </p>
              <p className="mb-6 text-[16px] font-light leading-relaxed">
                By shining a spotlight on their achievements, we foster a
                culture of collaboration, growth, and mutual support. We are
                dedicated to providing a space where creators can share their
                stories, connect with others, and inspire the next generation of
                Privee creators —
              </p>
              <p className="mb-6 text-[16px] font-semibold leading-relaxed">
                After all, memories are just movies inside your head. Let’s
                create them in real life!
              </p>
              <p className="text-[16px] font-bold">STAY TUNED</p>
            </div>

            {/* Image Section */}
            <div className="flex flex-1 items-center justify-center">
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
