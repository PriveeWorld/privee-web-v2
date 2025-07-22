"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation"; // Import usePathname hook

export default function CustomCursor() {
  const pathname = usePathname(); // Get the current pathname
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (pathname === "/share" || pathname.startsWith('/embed')) {
      // Restore default cursor for /share and /embed routes
      document.body.style.cursor = "auto";
      return;
    }

    // Custom cursor logic for other routes
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Check if hovering over interactive elements
      const target = e.target;
      const isButton = target.tagName === 'BUTTON' || target.closest('button');
      const isLink = target.tagName === 'A' || target.closest('a');
      
      setIsHoveringButton(isButton);
      setIsHoveringLink(isLink && !isButton);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (typeof document !== 'undefined') {
        document.body.style.cursor = "auto"; // Restore default cursor on unmount
      }
    };
  }, [cursorX, cursorY, pathname]);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  useEffect(() => {
    if (pathname === "/share" || pathname.startsWith('/embed')) return;

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pathname]);

  // Do not render the custom cursor if the current pathname is /share or starts with /embed
  if (pathname === "/share" || pathname.startsWith('/embed')) {
    return null;
  }

  const getSize = () => {
    if (isClicking) return { outer: 70, inner: 18 };
    if (isHoveringButton) return { outer: 60, inner: 15 };
    if (isHoveringLink) return { outer: 45, inner: 12 };
    return { outer: 40, inner: 8 };
  };

  const size = getSize();

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className={`pointer-events-none fixed z-[9999] rounded-full border-2 transition-all duration-200 ease-out ${
          isHoveringButton || isHoveringLink
            ? "border-[#CD1A70] border-opacity-80"
            : "border-[#3A1772] border-opacity-60"
        }`}
        style={{
          left: springX,
          top: springY,
          width: size.outer,
          height: size.outer,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          opacity: isClicking ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner cursor dot */}
      <motion.div
        className={`pointer-events-none fixed z-[9999] rounded-full transition-all duration-150 ease-out ${
          isHoveringButton
            ? "bg-gradient-to-r from-[#3A1772] to-[#CD1A70]"
            : isHoveringLink
            ? "bg-[#CD1A70]"
            : "bg-[#3A1772]"
        }`}
        style={{
          left: springX,
          top: springY,
          width: size.inner,
          height: size.inner,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isClicking ? 1.2 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Hover effect glow */}
      {(isHoveringButton || isHoveringLink) && (
        <motion.div
          className="pointer-events-none fixed z-[9998] rounded-full bg-gradient-to-r from-[#3A1772]/20 to-[#CD1A70]/20 blur-sm"
          style={{
            left: springX,
            top: springY,
            width: size.outer + 20,
            height: size.outer + 20,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
}
