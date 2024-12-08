"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation"; // Import usePathname hook

export default function CustomCursor() {
  const pathname = usePathname(); // Get the current pathname
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (pathname === "/share") {
      // Restore default cursor for /share route
      document.body.style.cursor = "auto";
      return;
    }

    // Custom cursor logic for other routes
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto"; // Restore default cursor on unmount
    };
  }, [cursorX, cursorY, pathname]);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  useEffect(() => {
    if (pathname === "/share") return;

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pathname]);

  // Do not render the custom cursor if the current pathname is /share
  if (pathname === "/share") {
    return null;
  }

  return (
    <>
      <motion.div
        className={`pointer-events-none fixed z-[9999] rounded-full border transition-all duration-150 ease-out ${
          isHoveringButton ? "#3A1772 z-[9999]" : "#3A1772"
        }`}
        style={{
          left: springX,
          top: springY,
          width: isClicking ? "60px" : "50px",
          height: isClicking ? "60px" : "50px",
          transform: "translate(-50%, -50%)",
        }}
      ></motion.div>

      <motion.div
        className={`pointer-events-none fixed z-[9999] rounded-full bg-[#CD1A70] transition-all duration-100 ease-out`}
        style={{
          left: springX,
          top: springY,
          width: isClicking ? "15px" : "10px",
          height: isClicking ? "15px" : "10px",
          transform: "translate(-50%, -50%)",
        }}
      ></motion.div>
    </>
  );
}
