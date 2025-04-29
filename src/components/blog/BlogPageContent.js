"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import TopNav from "../../app/components/TopNav";
import FullscreenNav from "../../app/components/FullscreenNav";
import Image from "next/image";
import Link from 'next/link';

// Lazy load components
const BlogGrid = dynamic(() => import('./BlogGrid'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 w-full rounded-lg"></div>
});

const BlogCard = dynamic(() => import('./BlogCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>
});

const SECTION_HEADINGS = [
  "Newsroom",
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Newsroom",
  "Privacy Policy",
  "Contact Us",
];

export default function BlogPageContent({ posts, currentTag }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(3); // Blog index in SECTION_HEADINGS

  // Optimize animations by reducing complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen w-screen overflow-x-hidden bg-white pt-24"
    >
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={gridVariants}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <h1 className="mb-4 mt-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-semibold leading-tight tracking-tight text-transparent sm:text-[40px] md:text-[50px] lg:text-[60px]">
              Privee Newsroom
            </h1>
            <p className="text-md mx-auto mb-6 max-w-3xl font-light text-gray-700 sm:text-base md:text-lg lg:text-xl">
              Discover stories, insights, and updates from the Privee community. Stay informed about the latest trends, features, and success stories.
            </p>
          </motion.div>
          <div className="mb-12"></div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-clash font-bold text-gray-900 mb-4">
              {currentTag ? `Posts tagged with #${currentTag}` : 'Latest news'}
            </h1>
            {currentTag && (
              <Link
                href="/newsroom"
                className="inline-flex items-center text-sm font-medium text-[#CD1A70] hover:text-[#3A1772] transition-colors duration-300"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear tag filter
              </Link>
            )}
          </div>

          <BlogGrid>
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </BlogGrid>
          
          {posts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-600">
                No posts found {currentTag && `with tag #${currentTag}`}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
} 