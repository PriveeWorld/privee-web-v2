"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const CustomSlideOne = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* Background Video */}
      <motion.video
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

      {/* Play Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
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

      {/* Fullscreen Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[99999] flex items-center justify-center">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
            <iframe
              className="w-full h-[calc(100vw * 9 / 16)] md:h-[calc(75vw * 9 / 16)] lg:h-[calc(50vw * 9 / 16)]"
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
