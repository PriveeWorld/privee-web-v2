"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import Link from "next/link";

const SECTION_HEADINGS = [
  "Newsroom",
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Help Center",
  "FAQ",
  "Privacy Policy",
  "Contact Us"
];

const PriveeStory = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(1);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDistance, setLastPinchDistance] = useState(0);
  const SECTIONS_COUNT = SECTION_HEADINGS.length;

  const scrollToSection = (index) => {
    setSection(index);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setIsDragging(false);
    setLastPinchDistance(0);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(Math.max(imageScale + delta, 0.5), 3);
    setImageScale(newScale);
    
    if (newScale === 1) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (imageScale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && imageScale > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (imageScale === 1) {
      setImageScale(2);
    } else {
      setImageScale(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const getDistance = (touches) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setLastPinchDistance(getDistance(e.touches));
    } else if (e.touches.length === 1 && imageScale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - imagePosition.x,
        y: e.touches[0].clientY - imagePosition.y
      });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      const currentDistance = getDistance(e.touches);
      if (lastPinchDistance > 0) {
        const scale = currentDistance / lastPinchDistance;
        const newScale = Math.min(Math.max(imageScale * scale, 0.5), 3);
        setImageScale(newScale);
        
        if (newScale === 1) {
          setImagePosition({ x: 0, y: 0 });
        }
      }
      setLastPinchDistance(currentDistance);
    } else if (e.touches.length === 1 && isDragging && imageScale > 1) {
      setImagePosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastPinchDistance(0);
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

      <div className="relative mb-4 mt-[80px] flex min-h-screen w-full max-w-[1600px] flex-col items-start justify-center overflow-y-auto px-4 py-4 sm:px-8 sm:py-16 lg:mb-[0px] lg:mt-[100px]">
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
            <div className="text-center mb-8">
              <h1 className="mb-6 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[28px] font-bold leading-tight tracking-tight text-transparent sm:text-[36px] md:text-[44px] lg:text-[52px]">
                How to use Privee World
            </h1>
              <div className="mb-4 text-lg font-medium text-gray-600 sm:text-xl">
                (without freaking out)
              </div>
              <p className="mx-auto max-w-2xl text-base text-gray-500 sm:text-lg">
                aka: You downloaded it… now what?
              </p>
            </div>

            {/* Welcome Card */}
            <motion.div 
              className="mx-auto mb-8 max-w-4xl rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg border border-purple-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <div className="mb-4 text-4xl">🌟</div>
                <h2 className="mb-4 font-clash text-2xl font-semibold text-gray-800">
                  Hey, welcome to Privee World!
                </h2>
                 <p className="mx-auto max-w-2xl text-lg font-inter font-light tracking-[0.01em] leading-[20px] text-gray-700">
                   This isn't just another social media app. This is <span className="font-semibold text-[#3A1772]">your life, turned into a movie</span>. But
                   before you go uploading your dog eating spaghetti or your cousin doing backflips at
                   a wedding, let's <span className="font-semibold">break it down. Step by step</span>.
                 </p>
              </div>
            </motion.div>

            {/* What is Privee Section */}
            <div className="mx-auto mb-12 max-w-5xl">
              <motion.div 
                className="mb-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                  What even is Privee?
                </h2>
                <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                <motion.div 
                  className="rounded-xl bg-white p-8 shadow-md border border-gray-100"
                  whileHover={{ scale: 1.02, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">🎬</div>
                  <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                    Netflix for Your Life
                  </h3>
                    <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                      Privee World is <span className="font-semibold text-[#CD1A70]">THE place</span> where your life gets organized like a <span className="font-semibold">Netflix series</span>.
                      You create <span className="font-semibold text-[#3A1772]">"movies"</span> – basically folders – and each video or photo you upload goes
                      into one of them.
                    </p>
          </motion.div>

        <motion.div
                  className="rounded-xl bg-white p-8 shadow-md border border-gray-100"
                  whileHover={{ scale: 1.02, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">🔒</div>
                  <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
                    Private by Default
                  </h3>
                    <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                      The cool part? It's <span className="font-semibold text-[#CD1A70]">private by default</span>. Just for your eyes. Until you say, <span className="font-semibold">"Okay, world,
                      check this out."</span>
                    </p>
                </motion.div>
              </div>
            </div>

            {/* App Sections */}
            <div className="mx-auto mb-12 max-w-5xl">
              <motion.div 
                className="mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                  Your app has 3 main sections
                </h2>
                <p className="text-lg text-gray-600">Here's the deal:</p>
                <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
              </motion.div>
              
              {/* 3 Main Sections Image */}
              <div className="mb-12 flex justify-center">
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <Image
                    src="/images/3_main_sections.jpg"
                    alt="Privee World - 3 Main Sections: Cinema, Private, and Camera"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-lg object-cover max-w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay with expand icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                  {/* Mobile tap indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full md:hidden">
                    Tap for full image
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <motion.div 
                  className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">🎭</div>
                  <h3 className="mb-2 font-clash text-xl font-semibold text-gray-800">
                    1. Cinema
                  </h3>
                    <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                      Watch <span className="font-semibold text-blue-600">public stories</span> from other users.
                    </p>
                </motion.div>

          <motion.div
                  className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
          >
                  <div className="mb-4 text-3xl">🏠</div>
                  <h3 className="mb-2 font-clash text-xl font-semibold text-gray-800">
                    2. Private
            </h3>
                    <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                      <span className="font-semibold text-green-600">Your world. Your story.</span> No one sees it but you.
            </p>
          </motion.div>

          <motion.div
                  className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-6 border border-orange-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-3xl">📸</div>
                  <h3 className="mb-2 font-clash text-xl font-semibold text-gray-800">
                    3. Camera
                  </h3>
                    <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                      Upload visuals from your gallery or record fresh content. Everything lands in <span className="font-semibold text-orange-600">Private first</span>. <span className="font-semibold">Boom.</span>
                    </p>
                </motion.div>
              </div>
            </div>

            {/* User Stories Section */}
            <div className="mx-auto mb-12 max-w-5xl">
              <motion.div 
                className="mb-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                  How to organize your life
                </h2>
                <p className="text-lg text-gray-600">(without losing your mind)</p>
                <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
              </motion.div>

              {/* Maja's Story */}
              <motion.div 
                className="mb-12 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 border border-purple-100"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 flex items-center">
                  <div className="mr-4 text-4xl">💼</div>
                  <div>
                    <h3 className="font-clash text-2xl font-bold text-gray-800">
                      Meet Maja
                    </h3>
                    <p className="text-purple-600 font-medium">The Beauty Boss</p>
                  </div>
                </div>
                
                <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  Maja's a <span className="font-semibold text-[#CD1A70]">boss</span>. Like, <span className="font-semibold">literal boss</span>. She runs <span className="font-semibold">global beauty events</span>. She's got a folder
                  called <span className="font-semibold text-purple-700">Events</span>.
                </p>
                <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  After each event, she uploads a couple of videos, adds a <span className="font-semibold">title</span> (like <span className="font-semibold text-[#3A1772]">"NYC Pop-Up 💄"</span>)
                  and writes a <span className="font-semibold">short caption</span> like:
                </p>
                
                <div className="mb-6 rounded-lg bg-white/70 p-4 border-l-4 border-pink-400">
                  <p className="italic text-gray-700">
                    "Makeup launch was fire. Reminder: never book the 10AM slot for setup again 😅"
                  </p>
                </div>
                
                <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  Now, when she plays her Events movie from the beginning, she gets a <span className="font-semibold text-[#CD1A70]">cinematic
                  timeline</span> of her whole journey.
                </p>
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  It's <span className="font-semibold text-green-600">private</span> – just for her. But when she feels like <span className="font-semibold">sharing a moment</span> with the world,
                  she selects one video, tweaks the caption for the public, and <span className="font-bold text-[#CD1A70]">BOOM</span> – it's live on her
                  public Privee profile.
                </p>

                {/* Maja video embed */}
                <div className="mt-8 flex justify-center">
                  <iframe 
                    src="https://p.privee.world/embed?videoId=12a9ffda-37cb-4280-a21e-58f0f4814a1b&userId=4b8579d9-0dc4-4fb0-b24f-8829eeb54d0d"
                    style={{width: '100%', height: '700px', maxWidth: '550px'}}
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>

              {/* Ana's Story */}
              <motion.div 
                className="mb-12 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 border border-blue-100"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 flex items-center">
                  <div className="mr-4 text-4xl">🎓</div>
                  <div className="text-left">
                    <h3 className="font-clash text-2xl font-bold text-gray-800 text-left">
                      Enter: Ana the Student
                    </h3>
                    <p className="text-blue-600 font-medium text-left">College Life Master</p>
                  </div>
                </div>
                
                <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  Ana's got the <span className="font-semibold text-[#3A1772]">college life locked down</span>. She's got a <span className="font-semibold text-blue-700">Campus</span> movie for <span className="font-semibold">unforgettable
                  uni moments</span>.
                </p>
                <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  She's got another one called <span className="font-semibold text-blue-700">Friends</span>, because, duh.
                </p>
                <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  Every time she captures something that screams <span className="font-semibold text-[#CD1A70]">"this was a vibe"</span>, she uploads it to
                  the <span className="font-semibold">right movie folder</span>.
                </p>
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
                  Now, in 2 years when she's sobbing at graduation, she'll have a <span className="font-semibold text-[#3A1772]">full movie</span> of her
                  <span className="font-semibold text-[#CD1A70]">best memories</span>.
                </p>

                {/* Ana video embed */}
                <div className="mt-8 flex justify-center">
                  <iframe 
                    src="https://p.privee.world/embed?videoId=8ecce508-b4eb-402f-bbd8-e4fd616cafbb&userId=be1575c7-a00e-4b92-bc29-2ff9381e4584"
                    style={{width: '100%', height: '700px', maxWidth: '550px'}}
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>

              {/* Pro Tips */}
              <motion.div 
                className="rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8 border border-yellow-100"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 text-center">
                  <div className="mb-4 text-4xl">💡</div>
                  <h3 className="font-clash text-2xl font-bold text-gray-800">
                    Pro tips for Privee masters
                  </h3>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-white/70 p-4">
                    <div className="mb-2 text-2xl">🏷️</div>
                    <h4 className="mb-2 font-semibold text-gray-800">Name Smart</h4>
                    <p className="text-sm text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">Think "Adventures 2024" or "Baby Noa's First Year" – something future you will recognize.</p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-4">
                    <div className="mb-2 text-2xl">💭</div>
                    <h4 className="mb-2 font-semibold text-gray-800">Memory Triggers</h4>
                    <p className="text-sm text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">Use captions as memory triggers. Write what you felt in that moment.</p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-4">
                    <div className="mb-2 text-2xl">🎬</div>
                    <h4 className="mb-2 font-semibold text-gray-800">You're the Director</h4>
                    <p className="text-sm text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">Share only what you want. One clip, the whole movie, or none.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features & Users Section */}
            <div className="mx-auto mb-12 max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* What you get */}
                <motion.div 
                  className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6 text-center">
                    <div className="mb-4 text-4xl">🆓</div>
                    <h3 className="font-clash text-2xl font-bold text-gray-800">
                      What you get (for free)
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-2 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                      <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Watch <span className="font-semibold text-[#3A1772]">unlimited hi quality video content</span>.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Upload <span className="font-semibold text-[#CD1A70]">33 videos every month</span>. Length of the video is up to <span className="font-semibold">12 seconds</span>. If you feel to upload more it is easy to <span className="font-semibold text-[#3A1772]">upgrade for unlimited uploads</span> and the lenght up to <span className="font-semibold text-[#CD1A70]">1 full minute</span>.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Who uses Privee */}
                <motion.div 
                  className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
            whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6 text-center">
                    <div className="mb-4 text-4xl">👥</div>
                    <h3 className="font-clash text-2xl font-bold text-gray-800">
                      So, who uses Privee?
            </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="mr-3 mt-0.5 text-lg flex-shrink-0">👶</span>
                      <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Parents making baby documentaries</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 mt-0.5 text-lg flex-shrink-0">🏃</span>
                      <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Athletes creating training timelines</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 mt-0.5 text-lg flex-shrink-0">✈️</span>
                      <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Travelers making a movie for every country</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 mt-0.5 text-lg flex-shrink-0">🎓</span>
                      <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Students archiving their college chaos</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 mt-0.5 text-lg flex-shrink-0">🎨</span>
                      <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Creatives logging their behind-the-scenes process</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-3 mt-0.5 text-lg flex-shrink-0">✨</span>
                      <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Regular folks documenting life, but in a meaningful, beautiful, own-it kind of way</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Final CTA Section */}
            <motion.div 
              className="mx-auto mb-2 max-w-4xl text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 sm:p-12 shadow-lg">
                <div className="text-center mb-8">
                  <div className="mb-4 text-4xl">🎬</div>
                  <h2 className="mb-6 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
                    Let's wrap it up
                  </h2>
                </div>
                
                <p className="mb-6 text-lg font-inter font-light tracking-[0.01em] leading-[20px] text-gray-700 text-center max-w-3xl mx-auto">
                  You don't need to be a content creator to tell a story. You just need to live – and
                  capture it.
                </p>
                <p className="mb-8 text-lg font-inter font-light tracking-[0.01em] leading-[20px] text-gray-700 text-center max-w-3xl mx-auto">
                  So go ahead. Make your movies. Keep them private. Or share them with the world.
                  Just don't let your memories disappear into your gallery forever.
                </p>
                
                <div className="mb-8 text-center">
                  <div className="inline-block rounded-full bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-4 py-3 sm:px-8">
                    <div className="text-base font-bold text-white sm:text-xl whitespace-nowrap">
                      You live it. Privee remembers it.
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6 sm:p-8 shadow-sm">
                  <div className="text-center mb-6">
                    <div className="mb-3 text-3xl">📺</div>
                    <h3 className="font-clash text-lg font-semibold text-gray-800 sm:text-xl">
                      Still not clear?
                    </h3>
                    <p className="text-gray-600 mt-2">Watch some videos we've prepared for you</p>
                  </div>
                  
                  {/* Video embed placeholder */}
                  <div className="flex min-h-[200px] sm:min-h-[250px] items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-white/70">
                    <div className="text-center">
                      <div className="mb-3 text-3xl sm:text-4xl">🎬</div>
                      <p className="font-medium text-blue-700 text-sm sm:text-base">Video tutorials coming soon</p>
                      <p className="text-blue-500 text-xs sm:text-sm mt-1">Step-by-step guides from the app</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
            onClick={handleImageModalClose}
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Close button - Top right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImageModalClose();
              }}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors z-20"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Instructions - Top center */}
            <div 
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="hidden md:inline">Scroll to zoom • Double-click to reset • Drag to move</span>
              <span className="md:hidden">Pinch to zoom • Drag to move</span>
            </div>

            {/* Zoom controls - Bottom center, moved up more */}
            <div 
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newScale = Math.max(imageScale - 0.3, 0.5);
                  setImageScale(newScale);
                  if (newScale === 1) setImagePosition({ x: 0, y: 0 });
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageScale(1);
                  setImagePosition({ x: 0, y: 0 });
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 transition-colors"
              >
                <span className="text-white text-sm font-medium">Reset</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageScale(Math.min(imageScale + 0.3, 3));
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-full max-h-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ cursor: isDragging ? 'grabbing' : imageScale > 1 ? 'grab' : 'default' }}
            >
              <motion.div
                style={{
                  scale: imageScale,
                  x: imagePosition.x,
                  y: imagePosition.y,
                }}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="select-none"
              >
                <Image
                  src="/images/3_main_sections.jpg"
                  alt="Privee World - 3 Main Sections: Cinema, Private, and Camera"
                  width={1200}
                  height={900}
                  className="rounded-lg object-contain max-w-full max-h-[90vh]"
                  priority
                  draggable={false}
                />
              </motion.div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriveeStory;
