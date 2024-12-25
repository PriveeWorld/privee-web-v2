"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import Link from "next/link";

const CustomSlideOne = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/images/priveeweb.mp4");
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setVideoSrc("/images/privee.mp4");
      } else {
        setVideoSrc("/images/priveeweb.mp4");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen">
      <motion.video
        ref={videoRef}
        className="absolute left-0 top-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        playsInline
      />

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.button
          className="relative flex items-center justify-center rounded-full bg-white p-12"
          style={{
            background: "radial-gradient(circle, #ffffff, #cccccc)",
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaPlay className="text-4xl text-black" />
          </motion.div>
        </motion.button>
      </motion.div>

      <div className="absolute bottom-8 left-8 z-20 flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          className="rounded-full bg-white p-0 shadow transition hover:scale-110"
        >
          {isPlaying ? (
            <FaPause className="text-lg text-black" />
          ) : (
            <FaPlay className="text-lg text-black" />
          )}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
            <iframe
              id="youtube-player"
              className="h-[250px] w-full lg:h-[500px]"
              src="https://www.youtube.com/embed/Z6Wq0z3zrNI?enablejsapi=1&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button
              className="absolute right-4 top-1 rounded-full bg-gray-800 p-2 text-2xl text-white hover:bg-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSlideOne;
