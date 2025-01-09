// src/app/share/ParisPage.js
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { FaPlay, FaPause } from "react-icons/fa";

/**
 * Hook to fix 100vh on mobile (your existing code).
 */
function useViewportHeightFix() {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => {
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);
}

/**
 * Your existing UI, but now we receive `videoData` as props
 * from the server. We do NOT fetch again in the client.
 */
export default function ParisPage({ videoData }) {
  // Ensure height fix
  useViewportHeightFix();

  // If no video data is passed (e.g., not found)
  if (!videoData) {
    return (
      <div className="relative flex h-screen w-full">
        {/* Shimmer background */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />
        {/* Message overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 text-white">
          <p className="text-xl font-semibold px-4">
            This link is expired or invalid. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Extract from videoData
  const videoPath = videoData?.visual?.videoPath || null;
  const videoTitle = videoData?.visual?.title || null;
  const captionName = videoData?.visual?.captionText || null;
  const movieName = videoData?.movie?.name || null;
  const firstName = videoData?.ownerOfMovie?.firstName || null;
  const lastName = videoData?.ownerOfMovie?.lastName || null;
  const profilePicture = videoData?.ownerOfMovie?.profilePicture || null;
  const userName =
    firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName);
  const userWhoShare = videoData?.userWhoShare;
  const userWhoShareName = userWhoShare
    ? [userWhoShare.firstName, userWhoShare.lastName].filter(Boolean).join(" ")
    : "";

  // State
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  // Initialize video (HLS or fallback .mp4)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // If no HLS path, fallback
    if (!videoPath) {
      videoElement.src = "/images/priveeweb.mp4";
      videoElement.addEventListener("loadedmetadata", () => {
        setIsVideoLoaded(true);
        videoElement.play().catch(() => console.warn("Autoplay failed."));
      });
      return;
    }

    // HLS supported
    if (Hls.isSupported()) {
      const hls = new Hls({ startLevel: 0 });
      hls.loadSource(videoPath);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsVideoLoaded(true);
        videoElement.play().catch(() => console.warn("Autoplay failed."));
      });
      hlsRef.current = hls;
    }
    // Safari fallback
    else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = videoPath;
      videoElement.addEventListener("loadedmetadata", () => {
        setIsVideoLoaded(true);
        videoElement.play().catch(() => console.warn("Autoplay failed."));
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoPath]);

  // Play/pause
  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  // A small skeleton loader component (unchanged)
  const SkeletonLoader = ({ width, height, className }) => (
    <div
      className={`animate-pulse rounded bg-gray-300 ${className}`}
      style={{ width, height }}
    />
  );

  // -----------------------------
  // Render your existing UI below
  // -----------------------------
  return (
    <div className="relative flex min-h-[calc(var(--vh)_*100)] bg-gradient-to-r from-[#17111F] to-[#0E0914] lg:bg-white lg:bg-none">
      {/* LEFT SIDE NAV (only on lg) */}
      <motion.aside
        className="hidden h-full w-[300px] flex-col items-start border-r bg-white lg:flex"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div
          className="my-10 flex w-full items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Link href="/">
            <Image
              src="/images/priveelogo.png"
              alt="Privee Logo"
              width={150}
              height={75}
              className="transition-opacity hover:opacity-80"
            />
          </Link>
        </motion.div>

        <motion.div className="flex w-full flex-col">
          {[
            { title: "Discover Privee", href: "/" },
            { title: "Privee Story", href: "/about-us" },
            { title: "Privacy Policy", href: "/privacy" },
            { title: "Contact Us", href: "/contact-us" },
            { title: "Nagradna Igra", href: "/nagradnaigra" },
          ].map((link, index) => (
            <motion.div
              key={index}
              className="group relative w-full text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2 + 0.5,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <div className="absolute inset-0 z-0 h-full w-0 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] transition-all duration-300 ease-in-out group-hover:w-full"></div>

              <Link
                className="font-regular relative z-10 block w-full border-b border-gray-300 px-4 py-6 font-clash text-lg text-gray-800 transition-colors duration-300 group-hover:text-white"
                href={link.href}
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.aside>

      {/* VIDEO CONTENT */}
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="relative h-[calc(100vh)] w-full max-w-[500px] overflow-hidden rounded-xl bg-gradient-to-r from-[#17111F] to-[#0E0914] shadow-lg lg:max-h-[850px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {!isVideoLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
              <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-gray-200"></div>
            </div>
          )}

          {/* Video element */}
          <video
            ref={videoRef}
            crossOrigin="anonymous"
            preload="auto"
            playsInline
            className="absolute inset-0 z-[0] mt-[80px] h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
          />

          {/* Play/Pause overlay button */}
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            {isPlaying ? (
              <FaPause size={40} color="white" />
            ) : (
              <FaPlay size={40} color="white" />
            )}
          </button>

          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-gray-800">
            <div className="absolute left-0 top-0 z-[1] h-20 w-full bg-gradient-to-r from-[#17111F] to-[#0E0914]"></div>

            {/* User & Title info */}
            <div>
              <div className="relative z-10 flex items-center gap-2">
                <Image
                  className="absolute right-4 lg:hidden"
                  src="/images/priveewhite.png"
                  width={120}
                  height={100}
                  alt=""
                />
                <motion.div
                  className="relative z-[99999] h-10 w-10 overflow-hidden rounded-full bg-gray-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                  onClick={() => {
                    window.location.href = "https://priveee.onelink.me/AMM3";
                  }}
                >
                  <Image
                    src={profilePicture || "/shareicons/priveeicon.svg"}
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                </motion.div>
                <div
                  className="flex flex-col"
                  onClick={() => {
                    window.location.href = "https://priveee.onelink.me/AMM3";
                  }}
                >
                  {/* Movie Name */}
                  {movieName ? (
                    <p className="text-md font-clash font-medium text-white">
                      {movieName}
                    </p>
                  ) : (
                    <SkeletonLoader width="100px" height="16px" />
                  )}
                  {/* User Name */}
                  {userName ? (
                    <p className="text-xs text-white">{userName}</p>
                  ) : (
                    <SkeletonLoader width="120px" height="8px" />
                  )}
                </div>
              </div>

              {/* Video Title */}
              <div className="relative z-50 mt-10 rounded-lg">
                {videoTitle && (
                  <h2 className="text-lg font-bold text-white">{videoTitle}</h2>
                )}
              </div>
            </div>

            {/* Caption / CTA */}
            <div className="flex flex-col gap-4">
              {captionName && (
                <div className="relative z-50 mb-4 flex flex-col justify-center gap-4">
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <p className="rounded-0 bg-black/90 px-1 py-1 text-lg font-semibold text-white shadow-md">
                      {captionName}
                    </p>
                  </motion.div>
                </div>
              )}

              <motion.div
                className="mb-20 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                onClick={() => {
                  window.location.href = "https://priveee.onelink.me/AMM3";
                }}
              >
                <div className="z-50 flex h-24 w-24 items-center justify-center rounded-full">
                  <Image
                    src="/shareicons/priveeicon.svg"
                    alt="Center Icon"
                    width={120}
                    height={120}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right side share icons */}
          <motion.div
            className="absolute right-4 top-24 z-50 flex flex-col gap-1 rounded-[20px] bg-[#161616]/25 px-2 py-4 backdrop-blur-[3px]"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.4 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <motion.button
                key={i}
                className="rounded-full p-2"
                onClick={() => {
                  window.location.href = "https://priveee.onelink.me/AMM3";
                }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={`/shareicons/${i + 1}.svg`}
                  alt={`Share Icon ${i + 1}`}
                  width={26}
                  height={26}
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-black/50 p-4 text-center text-white z-50 font-clash">
        <p>{userWhoShareName || "Someone"} invited you to watch this movie.</p>
        <p>
          Step into Privee World -{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => (window.location.href = "https://priveee.onelink.me/AMM3")}
          >
            Download now for free!
          </span>
        </p>
      </div>
    </div>
  );
}
