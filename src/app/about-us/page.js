"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import Link from "next/link";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Help Center",
  "FAQ",
  "Privacy Policy",
  "Contact Us",
  "About Us"
];

const AboutUs = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(7);

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <div className="relative mb-4 flex min-h-screen w-screen items-center justify-center overflow-auto sm:mb-20">
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

      <div className="relative mb-4 mt-[100px] flex min-h-screen w-full max-w-[1600px] flex-col items-start justify-center overflow-y-auto px-4 py-4 sm:px-8 sm:py-16 lg:mb-[0px] lg:mt-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-5xl"
              >

              </motion.div>
              <h1 className="mb-6 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-bold leading-tight tracking-tight text-transparent sm:text-[42px] md:text-[52px] lg:text-[62px]">
                Welcome to Privee World
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl font-inter font-light tracking-[0.01em] leading-relaxed">
                A next-gen media-tech company operating on a B2B2C model that empowers both media partners and individual users.
              </p>
            </div>

            {/* For People Section */}
            <div className="mx-auto mb-16 max-w-5xl">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                  For People
                </h2>
                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
              </motion.div>

              <motion.div
                className="mb-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg border border-purple-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="text-center mb-6">
                  <div className="mb-4 text-4xl">
                    <span role="img" aria-label="person">👤</span>
                  </div>
                  <p className="text-xl font-inter font-light tracking-[0.01em] leading-relaxed text-gray-700">
                    Watch <span className="font-semibold text-[#3A1772]">high-quality, curated stories</span>. Capture your life moments.
                    Turn them into <span className="font-semibold text-[#CD1A70]">personal movies</span>.
                  </p>
                </div>
              </motion.div>

              {/* The Problem */}
              <motion.div
                className="mb-8 rounded-2xl bg-white p-8 shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-relaxed text-lg text-center">
                  People don't feel in control of their content and are <span className="font-semibold text-[#CD1A70]">exploited rather than valued</span> by existing social platforms. No real privacy control or ownership over their digital stories. Public pressure from visible engagement metrics.
                </p>
                <p className="mt-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-relaxed text-lg text-center">
                  <span className="font-semibold text-[#3A1772]">Privee World</span> is offering a different experience and <span className="font-semibold text-[#3A1772]">private first approach</span>.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                <motion.div
                  className="rounded-xl bg-white p-6 shadow-md border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">
                    <span role="img" aria-label="lock">🔒</span>
                  </div>
                  <h3 className="mb-3 font-clash text-lg font-semibold text-gray-800">
                    Privacy Control
                  </h3>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px] text-sm">
                    Real privacy control and ownership over your digital stories.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-xl bg-white p-6 shadow-md border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">
                    <span role="img" aria-label="hidden">🙈</span>
                  </div>
                  <h3 className="mb-3 font-clash text-lg font-semibold text-gray-800">
                    No Public Pressure
                  </h3>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px] text-sm">
                    No visible engagement metrics. No public pressure.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-xl bg-white p-6 shadow-md border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">
                    <span role="img" aria-label="sparkle">✨</span>
                  </div>
                  <h3 className="mb-3 font-clash text-lg font-semibold text-gray-800">
                    Private First
                  </h3>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px] text-sm">
                    A different experience with a private-first approach.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* For Businesses Section */}
            <div className="mx-auto mb-16 max-w-5xl">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                  For Businesses
                </h2>
                <p className="text-lg text-gray-600">A new era for professional media</p>
                <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
              </motion.div>

              <motion.div
                className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg border border-blue-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="text-center mb-6">
                  <div className="mb-4 text-4xl">
                    <span role="img" aria-label="building">🏢</span>
                  </div>
                  <p className="text-xl font-inter font-light tracking-[0.01em] leading-relaxed text-gray-700">
                    Privee offers professional media, brands, sport clubs, and creators a fresh way to
                    <span className="font-semibold text-[#3A1772]"> reclaim influence</span> — by building and owning their own
                    <span className="font-semibold text-[#CD1A70]"> digital communities</span>.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 border border-green-100"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="mr-4 text-4xl">
                    <span role="img" aria-label="handshake">🤝</span>
                  </div>
                  <h3 className="font-clash text-2xl font-bold text-gray-800">
                    Building Together, Growing Together
                  </h3>
                </div>
                <p className="text-center text-gray-700 font-inter font-light tracking-[0.01em] leading-relaxed text-lg">
                  Through joint efforts with partners, Privee reaches everyday users — delivering
                  <span className="font-semibold text-green-700"> inspiring content</span>,
                  <span className="font-semibold text-green-700"> authentic engagement</span>, and
                  <span className="font-semibold text-green-700"> new ways to connect</span>.
                </p>
              </motion.div>
            </div>

            {/* For Professional Media Section */}
            <div className="mx-auto mb-16 max-w-5xl">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                  For Professional Media & Creators
                </h2>
                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
              </motion.div>

              {/* Current Reality */}
              <motion.div
                className="mb-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-8 shadow-md border border-red-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <div className="mb-4 text-3xl text-center">
                  <span role="img" aria-label="megaphone">📢</span>
                </div>
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-relaxed text-lg text-center mb-4">
                  Pro Media already ("free") promote social platforms. Every day, they publish <span className="font-semibold">10+ articles</span> featuring influencers, Instagram, TikTok, YouTube...
                </p>
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-relaxed text-lg text-center">
                  Current platforms <span className="font-semibold text-[#CD1A70]">don't offer true partnerships</span> - they extract value without giving ownership or control back.
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  className="rounded-xl bg-white p-8 shadow-md border border-gray-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">
                    <span role="img" aria-label="warning">⚠️</span>
                  </div>
                  <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                    The Challenge
                  </h3>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                    Professional media, brands, sport clubs, and creators struggle to reclaim influence while being dependent on platforms they don't control.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-md border border-purple-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">
                    <span role="img" aria-label="trophy">🏆</span>
                  </div>
                  <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                    The Solution
                  </h3>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                    Privee World offers a totally new <span className="font-semibold text-[#CD1A70]">win-win-win approach</span> — true partnerships with ownership and control.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* B2B Opportunities Section */}
            <div className="mx-auto mb-16 max-w-5xl">
              <motion.div
                className="rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8 border border-yellow-100"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 text-center">
                  <div className="mb-4 text-4xl">
                    <span role="img" aria-label="rocket">🚀</span>
                  </div>
                  <h3 className="font-clash text-2xl font-bold text-gray-800">
                    B2B Opportunities
                  </h3>
                </div>

                <p className="text-center text-gray-700 font-inter font-light tracking-[0.01em] leading-relaxed text-lg mb-6">
                  Privee World offers a wide range of opportunities for media companies, brands, and storytellers with existing communities to
                  <span className="font-semibold text-orange-700"> build</span>,
                  <span className="font-semibold text-orange-700"> engage</span>, and
                  <span className="font-semibold text-orange-700"> truly own</span> their audience on the platform.
                </p>

                <div className="text-center">
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                    For professional storytelling partnerships, brand collaborations, or media integrations:
                  </p>
                  <a
                    href="mailto:info@privee.world"
                    className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
                  >
                    Contact info@privee.world
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Media Tech Company Section */}
            <div className="mx-auto mb-16 max-w-5xl">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                  Media Tech Company
                </h2>
                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  className="rounded-xl bg-white p-8 shadow-lg border border-gray-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">
                    <span role="img" aria-label="office">🏛️</span>
                  </div>
                  <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                    Privee World GmbH
                  </h3>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px] mb-4">
                    Registered in <span className="font-semibold text-[#3A1772]">Vienna, Austria</span>.
                  </p>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                    The team behind the project brings over a century of combined experience across leading global companies in
                    <span className="font-semibold"> marketing</span>,
                    <span className="font-semibold"> communications</span>,
                    <span className="font-semibold"> sports</span>, and
                    <span className="font-semibold"> culture</span>.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-xl bg-white p-8 shadow-lg border border-gray-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">
                    <span role="img" aria-label="tech">💻</span>
                  </div>
                  <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                    Technology Teams
                  </h3>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px] mb-4">
                    Highly experienced teams based in <span className="font-semibold text-[#3A1772]">Sarajevo</span> and <span className="font-semibold text-[#3A1772]">Zagreb</span>.
                  </p>
                  <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                    Leveraging <span className="font-semibold text-[#CD1A70]">Amazon Web Services (AWS)</span> to ensure the highest level of security for uploaded content. The platform is built using <span className="font-semibold text-[#CD1A70]">Google-originated technologies</span>, delivering a reliable, scalable, and seamless experience for Privee World users.
                  </p>
                </motion.div>
              </div>

              {/* For more info */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
              >
                <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-relaxed">
                  For more info contact us: <a href="mailto:info@privee.world" className="font-semibold text-[#3A1772] hover:text-[#CD1A70] transition-colors">info@privee.world</a>
                </p>
              </motion.div>
            </div>

            {/* Contact CTA */}
            <motion.div
              className="mx-auto mb-2 max-w-4xl text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 sm:p-12 shadow-lg">
                <div className="text-center mb-6">
                  <div className="mb-4 text-4xl">
                    <span role="img" aria-label="mail">📬</span>
                  </div>
                  <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                    Get in Touch
                  </h2>
                </div>

                <p className="mb-8 text-lg font-inter font-light tracking-[0.01em] leading-relaxed text-gray-700 text-center max-w-2xl mx-auto">
                  Ready to join the Privee World? We'd love to hear from you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:info@privee.world"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
                  >
                    info@privee.world
                  </a>
                  <Link
                    href="/contact-us"
                    className="inline-block px-8 py-4 border-2 border-[#3A1772] text-[#3A1772] font-semibold rounded-full hover:bg-[#3A1772]/5 transition-colors"
                  >
                    Contact Form
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Learn More Section */}
        <div className="mb-12 mt-16 w-full">
          <div className="flex flex-col items-center">
            <p className="mb-4 font-inter font-semibold text-gray-700 tracking-[0.01em] leading-[20px] text-center">
              Learn more about Privee World:
            </p>

            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <Link href="/discover">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="border border-[#6f2c91]/30 rounded-full px-6 py-2 text-[#6f2c91] hover:bg-[#6f2c91]/5 transition-colors font-inter font-semibold tracking-[0.01em] leading-[20px]"
                >
                  Discover Privee
                </motion.div>
              </Link>

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
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
