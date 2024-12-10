"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CustomSlideTwo = () => {
  const [displayedText, setDisplayedText] = useState("");
  const typingText = "Join Privee and start your cinematic journey!";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < typingText.length) {
        setDisplayedText(typingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
  };

  return (
    <div className="custom-slide flex w-full flex-col items-start justify-center gap-4 px-4 md:w-3/4 lg:w-1/2">
      {/* Responsive Typing Text */}
      <h1 className="mt-8 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-semibold leading-tight text-transparent sm:text-[40px] md:text-[48px] md:leading-none lg:text-[60px]">
        {displayedText}
      </h1>

      {/* Subtitle */}
      <motion.h2
        className="font-roboto text-[16px] font-medium text-gray-600 sm:text-[18px] md:text-[20px]"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Welcome to Privee World – An Exclusive, Invitation-Only Platform!
      </motion.h2>

      {/* Description Paragraphs */}
      <motion.p
        className="font-roboto text-[16px] font-light text-gray-600 sm:text-[16px] md:text-[18px]"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Register for free and activate your account with an invitation code. If
        you don’t have one, explore codes from our partners to find one that
        suits your interests.
      </motion.p>
      <motion.p
        className="font-roboto text-[16px] font-light text-gray-600 sm:text-[16px] md:text-[18px]"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        Invite friends and dive into a cinematic world of storytelling, sharing,
        and discovery.
      </motion.p>
      <motion.p
        className="font-roboto text-[16px] font-light text-gray-600 sm:text-[16px] md:text-[18px]"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        Download the app and start your free adventure today!
      </motion.p>

      {/* App Store and Play Store Buttons */}
      <motion.div
        className="mt-6 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Link
          href="https://priveee.onelink.me/AMM3"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/appstore.svg"
            alt="Download on the App Store"
            width={140}
            height={45}
            className="sm:w-[150px] md:w-[160px] lg:w-[180px]"
          />
        </Link>
        <Link
          href="https://priveee.onelink.me/AMM3"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/playstore.svg"
            alt="Get it on Google Play"
            width={140}
            height={45}
            className="sm:w-[150px] md:w-[160px] lg:w-[180px]"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default CustomSlideTwo;
