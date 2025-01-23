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

// Helpers to detect file types
function isImageFile(url = "") {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}
function isHlsFile(url = "") {
  return /\.m3u8$/i.test(url);
}
function isMp4File(url = "") {
  return /\.(mp4|m4v|mov)$/i.test(url);
}

/**
 * Your ParisPage component
 */
export default function ParisPage({ videoData }) {
  // 1) Ensure height fix
  useViewportHeightFix();

  // 2) If no data
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

  // 3) Extract from videoData
  const videoPath = videoData?.visual?.videoPath || null;
  const videoTitle = videoData?.visual?.title || null;
  const captionName = videoData?.visual?.captionText || null;
  const movieName = videoData?.movie?.name || null;
  const firstName = videoData?.ownerOfMovie?.firstName || null;
  const lastName = videoData?.ownerOfMovie?.lastName || null;
  const profilePicture = videoData?.ownerOfMovie?.profilePicture || null;
  const userName =
    firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
  const userWhoShare = videoData?.userWhoShare;
  const userWhoShareName = userWhoShare
    ? [userWhoShare.firstName, userWhoShare.lastName].filter(Boolean).join(" ")
    : "";

  // 4) Local states
  const [isImage, setIsImage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true); // for overlay button
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // New state for progress

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const hideControlsTimeout = useRef(null);

  // 5) Check file type (image vs video)
  useEffect(() => {
    if (!videoPath) return;
    if (isImageFile(videoPath)) {
      setIsImage(true);
    }
  }, [videoPath]);

  // 6) Initialize video if NOT an image
  useEffect(() => {
    if (!videoPath || isImage) return;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Attach play/pause listeners so our icon state is always correct
    const handlePlay = () => {
      setIsPlaying(true);
      // Hide controls after 2s if playing
      hideControlsAfterDelay();
    };
    const handlePause = () => {
      setIsPlaying(false);
      // If paused, show controls
      setShowControls(true);
      clearTimeout(hideControlsTimeout.current);
    };
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);

    // If HLS
    if (isHlsFile(videoPath) && Hls.isSupported()) {
      const hls = new Hls({ startLevel: 0 });
      hls.loadSource(videoPath);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsVideoLoaded(true);
        // We DO NOT auto-play here. Start paused on load.
        // If you wanted to auto-play, you could call videoElement.play() here.
      });
      hlsRef.current = hls;
    }
    // If Safari and can handle HLS natively
    else if (
      isHlsFile(videoPath) &&
      videoElement.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoElement.src = videoPath;
      videoElement.addEventListener("loadedmetadata", () => {
        setIsVideoLoaded(true);
      });
    }
    // If .mp4
    else if (isMp4File(videoPath)) {
      videoElement.src = videoPath;
      videoElement.addEventListener("loadedmetadata", () => {
        setIsVideoLoaded(true);
      });
    }
    // Otherwise fallback
    else {
      videoElement.src = "/images/priveeweb.mp4";
      videoElement.addEventListener("loadedmetadata", () => {
        setIsVideoLoaded(true);
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
    };
  }, [videoPath, isImage]);

  // Add event listener for updating progress
  useEffect(() => {
    if (!videoRef.current && !isImage) return;

    if (isImage) {
      // For images, set a fixed duration of 6 seconds
      const duration = 6;
      let startTime = Date.now();

      const updateProgress = () => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const newProgress = (elapsedTime / duration) * 100;
        setProgress(newProgress);

        if (elapsedTime < duration) {
          requestAnimationFrame(updateProgress);
        } else {
          setProgress(100);
        }
      };

      updateProgress();
    } else {
      const videoElement = videoRef.current;

      const handleLoadedMetadata = () => {
        // Initialize progress
        setProgress((videoElement.currentTime / videoElement.duration) * 100);
      };

      const handleTimeUpdate = () => {
        if (videoElement.duration) {
          setProgress((videoElement.currentTime / videoElement.duration) * 100);
        }
      };

      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [isImage]);

  // 7) Hide controls after 2s of playing
  const hideControlsAfterDelay = () => {
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  // 8) Toggle play/pause
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => console.warn("Autoplay blocked"));
    }
  };

  // 9) On mouse move or click, show controls if it's playing
  const handleUserActivity = () => {
    // if we're in the middle of something (like we just hovered), show them again
    if (isPlaying) {
      setShowControls(true);
      hideControlsAfterDelay();
    }
  };

  // Listen for mouse/touch events to show controls again
  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
    };
  }, [isPlaying]);

  // Small skeleton loader
  const SkeletonLoader = ({ width, height, className }) => (
    <div
      className={`animate-pulse rounded bg-gray-300 ${className}`}
      style={{ width, height }}
    />
  );

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

      {/* MAIN CONTENT (Video or Image) */}
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="relative h-[calc(100vh)] w-full max-w-[500px] overflow-hidden rounded-xl bg-gradient-to-r from-[#17111F] to-[#0E0914] shadow-lg lg:max-h-[850px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* LOADING SPINNER (only for video while loading) */}
          {!isImage && !isVideoLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
              <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-gray-200"></div>
            </div>
          )}

          {/* --- IF IMAGE, SHOW IMAGE --- */}
          {isImage && videoPath && (
            <img
              src={videoPath}
              alt="Shared Visual"
              className="absolute inset-0 z-[0] mt-[80px] h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
              onLoad={() => setIsVideoLoaded(true)}
            />
          )}

          {/* --- IF NOT IMAGE, SHOW VIDEO --- */}
          {!isImage && (
            <video
              ref={videoRef}
              crossOrigin="anonymous"
              preload="auto"
              playsInline
              className="absolute inset-0 z-[0] mt-[80px] h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
            />
          )}

          {/* Play/Pause overlay button (show only when showControls = true) */}
          {!isImage && showControls && (
            <button
              onClick={togglePlayPause}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              {isPlaying ? (
                <FaPause size={50} color="white" />
              ) : (
                <FaPlay size={50} color="white" />
              )}
            </button>
          )}

          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-gray-800 pointer-events-none">
            <div className="absolute left-0 top-0 z-[1] h-20 w-full bg-gradient-to-r from-[#17111F] to-[#0E0914]" />

            {/* User & Title info */}
            <div className="pointer-events-auto">
              <div className="relative z-10 flex items-center gap-2">
                {/* Remove the Privee Logo */}
                {/* 
                <Image
                  className="absolute right-4 lg:hidden"
                  src="/images/priveewhite.png"
                  width={120}
                  height={100}
                  alt=""
                />
                */}

                {/* Insert Smaller Vertical Progress Bar */}
                <div className="absolute right-4 w-1.5 h-10 bg-[#B6B4B8] rounded-full flex flex-col-reverse shadow-lg">
                  <div
                    className="bg-white w-full rounded-full transition-height duration-500"
                    style={{ height: `${progress}%` }}
                  ></div>
                </div>

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

              {/* Title */}
              <div className="relative z-50 mt-10 rounded-lg">
                <div className="flex flex-col items-start gap-1">
                  <Image
                    src="/images/priveewhite.png"
                    alt="Privee Logo"
                    width={80}
                    height={80}
                  />
                  {videoTitle && (
                    <h2 className="text-lg text-white">{videoTitle}</h2>
                  )}
                </div>
              </div>
              
            </div>

            {/* Caption / CTA */}
            <div className="flex flex-col gap-4 pointer-events-auto">
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

          {/* Right side share icons (always show them) */}
          <motion.div
            className="absolute right-4 top-24 z-50 flex flex-col gap-1 rounded-[20px] bg-[#161616]/25 px-2 py-4 backdrop-blur-[3px] pointer-events-auto"
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



      {/* Bottom banner */}
      <div className="absolute bottom-0 left-0 w-full bg-black/50 p-4 text-center text-white z-50 font-clash pointer-events-none">
        <p>{userWhoShareName || "Someone"} invited you to watch this movie.</p>
        <p>
          Step into Privee World -{" "}
          <span
            className="underline cursor-pointer pointer-events-auto"
            onClick={() =>
              (window.location.href = "https://priveee.onelink.me/AMM3")
            }
          >
            Download now for free!
          </span>
        </p>
      </div>
    </div>
  );
}
