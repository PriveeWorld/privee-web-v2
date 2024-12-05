"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ParisPage() {
  const navLinks = [
    { title: "Discover Privee", href: "/" },
    { title: "Privee Story", href: "/priveestory" },
    { title: "Privacy Policy", href: "/privacypolicy" },
    { title: "Contact Us", href: "/contact" },
  ];

  const shareIconParentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const shareIconChildVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-r from-[#17111F] to-[#0E0914] lg:bg-white lg:bg-none">
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
                className="relative z-10 block w-full border-b border-gray-300 px-4 py-6 font-clash text-lg font-medium text-gray-800 transition-colors duration-300 group-hover:text-white"
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
          className="relative h-[calc(100vh)] w-full max-w-[500px] overflow-hidden rounded-xl bg-gradient-to-r from-[#17111F] to-[#0E0914] shadow-lg lg:max-h-[850]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <video
            src="/images/priveeweb.mp4"
            autoPlay
            muted
            loop
            className="absolute inset-0 top-[74] z-[1] h-full w-full rounded-tl-2xl rounded-tr-2xl object-cover"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-4 text-gray-800">
            <div className="absolute left-0 top-0 z-[1] h-20 w-full bg-gradient-to-r from-[#17111F] to-[#0E0914]"></div>
            <div>
              <div className="relative z-10 flex items-center gap-2">
                <motion.div
                  className="h-10 w-10 overflow-hidden rounded-full bg-gray-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src="/shareicons/priveeicon.svg"
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                </motion.div>
                <div>
                  <p className="text-md font-clash font-semibold text-white">
                    Traveling
                  </p>
                  <p className="text-xs text-white">Manuel Santos</p>
                </div>
              </div>

              <div className="relative z-50 mt-8 rounded-lg">
                <h2 className="text-lg font-bold text-white">
                  Montmartre mon amour!
                </h2>
                {/* <p className="text-xs text-white">
                  02 Aug 2022 &nbsp;&bull;&nbsp; 980 views
                </p> */}
              </div>
            </div>

            <div className="relative z-50 mb-4 flex flex-col justify-center gap-4">
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="rounded-full bg-black/90 px-6 py-3 text-sm font-semibold text-white shadow-md">
                  I love Paris!
                </p>
              </motion.div>

              <motion.div
                className="mb-4 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full">
                  <Image
                    src="/shareicons/priveeicon.svg"
                    alt="Profile"
                    width={120}
                    height={120}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute right-4 top-24 z-50 flex flex-col gap-2 rounded-full bg-[#161616]/25 px-2 py-2 backdrop-blur-[3px]"
            variants={shareIconParentVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: 7 }, (_, i) => (
              <motion.button
                key={i}
                className="rounded-full p-2"
                variants={shareIconChildVariants}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={`/shareicons/${i + 1}.svg`}
                  alt={`Share Icon ${i + 1}`}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
