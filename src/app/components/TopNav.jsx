"use client";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";

function TopNav({ onMenuClick, section }) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 20, delay: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3 },
    }),
  };

  const isTransparent = section === 4;
  const iconColor = isTransparent ? "text-white" : "text-gray-700";

  return (
    <motion.nav
      className={`fixed left-0 top-0 z-30 flex w-full items-center justify-center px-4 py-4 ${
        isTransparent
          ? "border-none bg-transparent"
          : "border-b border-[#e4e4e4] bg-white"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex w-full max-w-[1600px] justify-between items-center self-center px-3 sm:px-4 lg:px-16">
        <motion.div
          className="flex items-center cursor-pointer"
          variants={itemVariants}
          custom={0}
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="transition-all duration-300 hover:drop-shadow-lg"
            whileHover={{ y: -2 }}
          >
            <Image
              src={
                section === 4
                  ? "/images/priveewhite.png"
                  : "/images/priveelogo.png"
              }
              alt="Privee World - Logo"
              width={120}
              height={40}
              className="object-contain sm:w-[150px] sm:h-[50px]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className={`flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-lg sm:text-xl ${iconColor}`}
          variants={itemVariants}
          custom={1}
        >
          <motion.a
            href="https://www.facebook.com/people/PriveeWorld/61570117093621/?mibextid=wwXIfr&rdid=D8EwJQ7LJdxco6wf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1YxVGXv7h8%2F%3Fmibextid%3DwwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            variants={itemVariants}
            custom={1.5}
            className={`relative overflow-hidden rounded-full border p-1.5 sm:p-2 transition-all duration-300 ${
              isTransparent
                ? "border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-lg"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: isTransparent ? 0.1 : 0.05 }}
            />
            <FaFacebook className="relative z-10" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/company/priveeworld/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Linkedin"
            variants={itemVariants}
            custom={2.0}
            className={`relative overflow-hidden rounded-full border p-1.5 sm:p-2 transition-all duration-300 ${
              isTransparent
                ? "border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-lg"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: isTransparent ? 0.1 : 0.05 }}
            />
            <FaLinkedin className="relative z-10" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/privee.world/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            variants={itemVariants}
            custom={2.5}
            className={`relative overflow-hidden rounded-full border p-1.5 sm:p-2 transition-all duration-300 ${
              isTransparent
                ? "border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-lg"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: isTransparent ? 0.1 : 0.05 }}
            />
            <FaInstagram className="relative z-10" />
          </motion.a>
        </motion.div>

        <motion.button
          onClick={onMenuClick}
          className={`relative overflow-hidden rounded-full border p-1.5 sm:p-2 text-xl sm:text-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3A1772] focus:ring-opacity-50 ${
            isTransparent
              ? "border-white/30 text-white hover:border-white/60 hover:bg-white/10 hover:shadow-lg"
              : "border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md"
          }`}
          aria-label="Open Menu"
          variants={itemVariants}
          custom={3}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] opacity-0 transition-opacity duration-300"
            whileHover={{ opacity: isTransparent ? 0.1 : 0.05 }}
          />
          <HiMenu className="relative z-10" />
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default TopNav;
