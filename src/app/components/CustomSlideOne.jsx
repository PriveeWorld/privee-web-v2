"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const CustomSlideOne = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Autoplay failed:", error);
      }
    };

    playVideo();
  }, []);

  const videoVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    initial: {
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    },
    hover: {
      scale: 1.2,
      boxShadow: "0 0 30px rgba(255, 255, 255, 0.9)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-0">
      <motion.video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/priveeweb.mp4"
        autoPlay
        loop
        playsInline
        variants={videoVariants}
        initial="hidden"
        animate="visible"
        controls
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        onClick={() => window.open("https://www.youtube.com", "_blank")}
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
    </div>
  );
};

export default CustomSlideOne;
