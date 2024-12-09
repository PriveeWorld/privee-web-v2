"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDrag } from "@use-gesture/react";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";
import animationData from "../../public/priveeanimation.json";
import FullscreenNav from "./components/FullscreenNav";
import TopNav from "./components/TopNav";
import SectionIndicator from "./components/SectionIndicator";
import NavigationButtons from "./components/NavigationButtons";
import SectionContent from "./components/SectionContent";
import Link from "next/link";

const SECTION_HEADINGS = [
  "People",
  "Emotions",
  "Movies",
  "Your life, your story",
];

export default function Home() {
  const [section, setSection] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isTransitioning = useRef(false); // Block additional transitions
  const scrollDirection = useRef("down");
  const lottieRef = useRef(null);
  const animationInstance = useRef(null);
  const containerRef = useRef(null);
  const SECTIONS_COUNT = 7;
  const SECTION_HEIGHT = typeof window !== "undefined" ? window.innerHeight : 0;

  useEffect(() => {
    const preloadLottieAnimation = async () => {
      if (section < 4) {
        animationInstance.current = lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "canvas",
          loop: false,
          autoplay: false,
          animationData,
        });
      }
    };

    preloadLottieAnimation();

    return () => animationInstance.current?.destroy();
  }, [section]);

  const animateLottieFrames = useCallback(
    (startFrame, endFrame, reverse = false) => {
      let currentFrame = startFrame;
      const frameIncrement = reverse ? -0.25 : 0.25;

      const step = () => {
        if (
          (!reverse && currentFrame < endFrame) ||
          (reverse && currentFrame > endFrame)
        ) {
          currentFrame += frameIncrement;
          animationInstance.current?.goToAndStop(currentFrame, true);
          requestAnimationFrame(step);
        } else {
          animationInstance.current?.goToAndStop(endFrame, true);
          isTransitioning.current = false;
        }
      };

      step();
    },
    [],
  );

  const scrollToSection = useCallback(
    (index) => {
      if (
        isTransitioning.current ||
        index === section ||
        index < 0 ||
        index >= SECTIONS_COUNT
      )
        return;

      isTransitioning.current = true; // Block new transitions
      scrollDirection.current = index > section ? "down" : "up";
      setSection(index);

      if (index < 4) {
        const totalFrames = animationInstance.current?.totalFrames || 0;
        const framesPerSection = totalFrames / 4;
        const startFrame = framesPerSection * section;
        const endFrame = framesPerSection * index;
        const reverse = index < section;

        animateLottieFrames(startFrame, endFrame, reverse);
      }

      // Smooth scroll to the next section
      window.scrollTo({
        top: SECTION_HEIGHT * index,
        behavior: "smooth",
      });

      // Allow new transitions after a delay
      setTimeout(() => {
        isTransitioning.current = false;
      }, 1200); // Match this to your animation duration
    },
    [section, animateLottieFrames],
  );

  const handleWheel = useCallback(
    (event) => {
      if (isTransitioning.current) return; // Ignore additional scrolls during transition

      // Threshold to prevent excessive sensitivity
      const threshold = 50; // Adjust based on desired sensitivity
      if (Math.abs(event.deltaY) < threshold) return;

      if (event.deltaY > 0 && section < SECTIONS_COUNT - 1) {
        scrollToSection(section + 1); // Scroll down
      } else if (event.deltaY < 0 && section > 0) {
        scrollToSection(section - 1); // Scroll up
      }
    },
    [section, scrollToSection],
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isTransitioning.current) return;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          if (section < SECTIONS_COUNT - 1) {
            scrollToSection(section + 1);
          }
          break;
        case "ArrowLeft":
        case "ArrowUp":
          if (section > 0) {
            scrollToSection(section - 1);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [section, scrollToSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Use the useDrag hook for swipe gesture handling
  const bind = useDrag(
    ({ last, movement: [, my], direction: [, dy], cancel }) => {
      if (isTransitioning.current) {
        cancel && cancel();
        return;
      }

      if (last) {
        if (dy > 0 && section > 0) {
          scrollToSection(section - 1); // Swipe down
        } else if (dy < 0 && section < SECTIONS_COUNT - 1) {
          scrollToSection(section + 1); // Swipe up
        }
      }
    },
    { axis: "y", filterTaps: true },
  );

  return (
    <div
      {...bind()} // Attach gesture handling
      ref={containerRef} // Attach ref for handling wheel events
      className="flex h-screen w-screen touch-none items-center justify-center overflow-hidden"
    >
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          scrollToSection(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav onMenuClick={() => setIsNavOpen(true)} section={section} />

      <div className="relative mt-20 flex h-screen w-full max-w-[1600px] flex-col items-center justify-start px-4 pt-32 lg:h-fit lg:items-start lg:px-16 lg:pt-0">
        <AnimatePresence mode="wait">
          <SectionContent
            section={section}
            scrollDirection={scrollDirection.current}
          />
        </AnimatePresence>

        {section < 4 && (
          <div
            ref={lottieRef}
            className={`pointer-events-none fixed -bottom-[120px] right-10 -z-50 h-3/4 w-3/4 transform lg:-right-40 lg:bottom-0 ${
              section === 3 ? "hidden-on-mobile" : ""
            }`}
          />
        )}

        <SectionIndicator
          section={section}
          onScrollToSection={scrollToSection}
          sectionsCount={SECTIONS_COUNT}
        />
        <NavigationButtons
          section={section}
          sectionsCount={SECTIONS_COUNT}
          onScrollToSection={scrollToSection}
        />
      </div>
    </div>
  );
}
