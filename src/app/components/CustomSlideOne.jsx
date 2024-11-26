"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

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
    <div className="fixed inset-0 w-screen h-screen z-0">
      <motion.video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        playsInline
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.button
          className="p-12 bg-white rounded-full flex items-center justify-center relative"
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
          className="bg-white p-0 rounded-full shadow hover:scale-110 transition"
        >
          {isPlaying ? (
            <FaPause className="text-black text-lg" />
          ) : (
            <FaPlay className="text-black text-lg" />
          )}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[99999] flex items-center justify-center">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
            <iframe
              id="youtube-player"
              className="w-full h-[250px] lg:h-[500px]"
              src="https://www.youtube.com/embed/Z6Wq0z3zrNI?enablejsapi=1&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-gray-800 p-2 rounded-full hover:bg-gray-700"
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
