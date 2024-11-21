"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const CustomSlideOne = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player("youtube-player", {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    return () => {
      // Clean up
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      disableSeekingForDuration(10); // Disable seeking for 10 seconds
    }
  };

  const disableSeekingForDuration = (duration) => {
    const player = playerRef.current;
    if (!player) return;

    const startTime = player.getCurrentTime();
    const interval = setInterval(() => {
      const currentTime = player.getCurrentTime();
      if (currentTime > startTime + duration) {
        clearInterval(interval);
      } else if (currentTime !== startTime) {
        player.seekTo(startTime);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-0">
      <motion.video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/priveeweb.mp4"
        autoPlay
        loop
        playsInline
        controls
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
