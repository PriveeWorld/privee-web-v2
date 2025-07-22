"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import Link from "next/link";

const CustomSlideOne = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/images/priveeweb.mp4");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
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

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setIsVideoError(false);
  };

  const handleVideoError = () => {
    setIsVideoError(true);
    setIsVideoLoaded(false);
  };

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen">
      {!isVideoLoaded && !isVideoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white animate-spin rounded-full mx-auto" />
            <p className="text-white/80 font-medium">Loading video...</p>
          </div>
        </div>
      )}
      
      {isVideoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-white/80 font-medium">Unable to load video</p>
            <button
              onClick={() => {
                setIsVideoError(false);
                setIsVideoLoaded(false);
                const video = videoRef.current;
                if (video) video.load();
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <motion.video
        ref={videoRef}
        className="absolute left-0 top-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        playsInline
        muted
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
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

      <motion.div 
        className="absolute bottom-8 left-8 z-20 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={togglePlayPause}
          className="rounded-full bg-white/90 backdrop-blur-sm p-3 shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isVideoLoaded}
        >
          {isPlaying ? (
            <FaPause className="text-lg text-black" />
          ) : (
            <FaPlay className="text-lg text-black ml-0.5" />
          )}
        </motion.button>
      </motion.div>

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
