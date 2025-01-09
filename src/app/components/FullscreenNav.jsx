"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FullscreenNav({ isOpen, onClose }) {
  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "100vh", opacity: 1, transition: { duration: 0.5 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const navLinks = [
    { title: "Discover Privee", href: "/" },
    { title: "Privee Story", href: "/about-us" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Contact Us", href: "/contact-us" },
    { title: "Nagradna Igra", href: "/nagradnaigra" },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white bg-opacity-90 flex flex-col items-center p-10 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="w-full relative flex flex-col items-center justify-center max-w-[1600px]">
              <button
                onClick={onClose}
                className="absolute -top-4 right-2 text-2xl"
                aria-label="Close menu"
              >
                ✕
              </button>

              <div className="mb-10">
                <Link href="/">
                  <Image
                    src="/images/priveelogo.png"
                    alt="Privee Logo"
                    width={200}
                    height={100}
                  />
                </Link>
              </div>

              <div className="flex flex-col items-center space-y-6 mb-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    className="relative text-center"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 * index }}
                    whileHover="hover"
                  >
                    <motion.div
                      className="absolute inset-0 z-0"
                      style={{
                        width: "0%",
                        height: "100%",
                        backgroundImage:
                          "linear-gradient(260.91deg, #3A1772 -2.61%, #CD1A70 105.99%)",
                      }}
                      variants={{
                        hover: { width: "100%" },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />

                    <Link href={link.href} passHref>
                      <motion.a
                        onClick={onClose}
                        className="relative z-10 text-center border-b-[#e1e1e1] border-b-[1px] text-[20px] lg:text-[40px] font-medium font-clash"
                        style={{ padding: "0.2em 0.5em" }}
                        initial={{ color: "#1f2937" }}
                        whileHover={{ color: "#ffffff" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        {link.title}
                      </motion.a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
