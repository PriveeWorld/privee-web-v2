import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/router";

function TopNav({ onMenuClick, section }) {
  let router;

  try {
    router = useRouter(); // Use try-catch to safely access useRouter
  } catch (error) {
    router = null; // Fallback for non-router contexts
  }

  const handleLogoClick = () => {
    if (router) {
      router.reload("/");
    } else {
      window.location.href = "/"; // Fallback for cases where router is unavailable
    }
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
      <div className="flex w-full max-w-[1600px] justify-between self-center px-4 lg:px-16">
        <motion.div
          className="flex items-center"
          variants={itemVariants}
          custom={0}
          onClick={handleLogoClick}
        >
          <Image
            src={
              section === 4
                ? "/images/priveewhite.png"
                : "/images/priveelogo.png"
            }
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </motion.div>

        <motion.div
          className={`flex items-center space-x-1 text-xl md:space-x-4 ${iconColor}`}
          variants={itemVariants}
          custom={1}
        >
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            variants={itemVariants}
            custom={1.5}
            className={`rounded-full border p-2 transition duration-300 hover:bg-gray-100 ${
              isTransparent
                ? "border-white/30 hover:bg-white/10"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <FaFacebook />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            variants={itemVariants}
            custom={2.0}
            className={`rounded-full border p-2 transition duration-300 hover:bg-gray-100 ${
              isTransparent
                ? "border-white/30 hover:bg-white/10"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            variants={itemVariants}
            custom={2.5}
            className={`rounded-full border p-2 transition duration-300 hover:bg-gray-100 ${
              isTransparent
                ? "border-white/30 hover:bg-white/10"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <FaInstagram />
          </motion.a>
        </motion.div>

        <motion.button
          onClick={onMenuClick}
          className={`rounded-full border p-2 text-2xl transition duration-300 focus:outline-none ${
            isTransparent
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-gray-300 text-gray-800 hover:bg-gray-100"
          }`}
          aria-label="Open Menu"
          variants={itemVariants}
          custom={3}
          whileHover={{ scale: 1.1 }}
        >
          <HiMenu />
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default TopNav;
