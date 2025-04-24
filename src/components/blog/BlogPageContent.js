"use client";

import { useState } from "react";
import BlogGrid from './BlogGrid';
import TopNav from "../../app/components/TopNav";
import FullscreenNav from "../../app/components/FullscreenNav";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import BlogCard from './BlogCard';

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Blog",
  "Privacy Policy",
  "Contact Us",
];

export default function BlogPageContent({ posts, currentTag }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(3); // Blog index in SECTION_HEADINGS

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <main className="relative w-screen bg-white">
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

      <div className="relative mt-[80px] w-full max-w-[1600px] mx-auto px-6 py-6 sm:px-8 lg:mt-[100px] min-h-screen overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <h1 className="mb-4 mt-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-semibold leading-tight tracking-tight text-transparent sm:text-[40px] md:text-[50px] lg:text-[60px]">
              Privee Blog
            </h1>
            <p className="text-md mx-auto mb-6 max-w-3xl font-light text-gray-700 sm:text-base md:text-lg lg:text-xl">
              Discover stories, insights, and updates from the Privee community. Stay informed about the latest trends, features, and success stories.
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mb-12"></div>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-gray-900 mb-4">
            {currentTag ? `Posts tagged with #${currentTag}` : 'Latest Blog Posts'}
          </h1>
          {currentTag && (
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-[#CD1A70] hover:text-[#3A1772] transition-colors duration-300"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear tag filter
            </Link>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <BlogGrid>
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </BlogGrid>
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found {currentTag && `with tag #${currentTag}`}</p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
} 