"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useSearchParams } from "next/navigation";
import { FaPlay, FaPause } from "react-icons/fa";

function useViewportHeightFix() {
  useEffect(() => {
    const setViewportHeight = () => {
      // Calculate the viewport height in pixels
      const vh = window.innerHeight * 0.01;
      // Set it as a CSS variable
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Initial calculation
    setViewportHeight();

    // Update on resize
    window.addEventListener("resize", setViewportHeight);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);
}

export default function ParisPage() {
  useViewportHeightFix();

  const navLinks = [
    { title: "Discover Privee", href: "/" },
    { title: "Privee Story", href: "/priveestory" },
    { title: "Privacy Policy", href: "/privacypolicy" },
    { title: "Contact Us", href: "/contact" },
  ];

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const searchParams = useSearchParams();

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoPath, setVideoPath] = useState(null);
  const [useFallback, setUseFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // State for play/pause
  const [userName, setUserName] = useState(null);
  const [movieName, setMovieName] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const [captionName, setCaptionName] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      const videoId = searchParams.get("videoId");
      if (!videoId) {
        setUseFallback(true);
        return;
      }

      const apiUrl = `https://38wzs9wt1a.execute-api.eu-central-1.amazonaws.com/shared-video/${videoId}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch video data");

        const result = await response.json();
        const videoData = result?.data?.video;

        const path = videoData?.visual?.videoPath;
        const title = videoData?.visual?.title || null;
        const movie = videoData?.movie?.name || null;
        const firstName = videoData?.user?.firstName || null;
        const lastName = videoData?.user?.lastName || null;
        const captionText = videoData?.visual?.captionText || null;
        const profilePic = videoData?.user?.profilePicture || null;

        if (path) setVideoPath(path);
        setVideoTitle(title);
        setMovieName(movie);
        setUserName(firstName && lastName ? `${firstName} ${lastName}` : null);
        setCaptionName(captionText);
        setProfilePicture(profilePic);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setUseFallback(true);
      }
    };

    fetchVideoData();
  }, [searchParams]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (useFallback) {
      videoElement.src = "/images/priveeweb.mp4";
      videoElement.addEventListener("loadedmetadata", () => {
        setIsVideoLoaded(true);
        videoElement.play().catch(() => console.warn("Autoplay failed."));
      });
      return;
    }

    if (videoPath) {
      if (Hls.isSupported()) {
        const hls = new Hls({ startLevel: 0 });
        hls.loadSource(videoPath);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsVideoLoaded(true);
          videoElement.play().catch(() => console.warn("Autoplay failed."));
        });
        hlsRef.current = hls;
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoPath;
        videoElement.addEventListener("loadedmetadata", () => {
          setIsVideoLoaded(true);
          videoElement.play().catch(() => console.warn("Autoplay failed."));
        });
      }
    }

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [videoPath, useFallback]);

  const SkeletonLoader = ({ width, height, className }) => (
    <div
      className={`animate-pulse rounded bg-gray-300 ${className}`}
      style={{ width, height }}
    />
  );

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

  return (
    <div className="relative flex min-h-[calc(var(--vh)_*100)] bg-gradient-to-r from-[#17111F] to-[#0E0914] lg:bg-white lg:bg-none">
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
          {navLinks.map((link, index) => (
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

          <video
            ref={videoRef}
            crossOrigin="anonymous"
            preload="auto"
            playsInline
            className="absolute inset-0 z-[0] mt-[80px] h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
          />

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

          <div className="absolute inset-0 flex flex-col justify-between p-4 text-gray-800">
            <div className="absolute left-0 top-0 z-[1] h-20 w-full bg-gradient-to-r from-[#17111F] to-[#0E0914]"></div>
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
                  onClick={() => {
                    window.location.href = "https://priveee.onelink.me/AMM3";
                  }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={profilePicture || "/shareicons/priveeicon.svg"}
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                </motion.div>
                <div
                  onClick={() => {
                    window.location.href = "https://priveee.onelink.me/AMM3";
                  }}
                  className="flex flex-col"
                >
                  {movieName ? (
                    <p className="text-md font-clash font-medium text-white">
                      {movieName}
                    </p>
                  ) : (
                    <SkeletonLoader
                      className="mb-1"
                      width="100px"
                      height="16px"
                    />
                  )}
                  {userName ? (
                    <p className="text-xs text-white">{userName}</p>
                  ) : (
                    <SkeletonLoader width="120px" height="8px" />
                  )}
                </div>
              </div>

              <div className="relative z-50 mt-10 rounded-lg">
                {videoTitle && (
                  <h2 className="text-lg font-bold text-white">{videoTitle}</h2>
                )}
              </div>
            </div>

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
                onClick={() => {
                  window.location.href = "https://priveee.onelink.me/AMM3";
                }}
                key={i}
                className="rounded-full p-2"
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
    </div>
  );
}
