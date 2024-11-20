"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";
import animationData from "../../public/priveeanimation.json";
import FullscreenNav from "./components/FullscreenNav";
import TopNav from "./components/TopNav";
import SectionIndicator from "./components/SectionIndicator";
import NavigationButtons from "./components/NavigationButtons";
import SectionContent from "./components/SectionContent";

const SECTION_HEADINGS = [
  "People",
  "Emotions",
  "Movies",
  "Your life, your story",
];

export default function Home() {
  const [section, setSection] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isTransitioning = useRef(false);
  const scrollDirection = useRef("down");
  const lottieRef = useRef(null);
  const animationInstance = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
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
    []
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

      isTransitioning.current = true;
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

      window.scrollTo({
        top: SECTION_HEIGHT * index,
        behavior: "smooth",
      });

      setTimeout(() => {
        isTransitioning.current = false;
      }, 1200);
    },
    [section, animateLottieFrames]
  );

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const handleWheel = throttle(
    useCallback(
      (event) => {
        if (isTransitioning.current) return;
        if (event.deltaY > 0 && section < SECTIONS_COUNT - 1) {
          scrollToSection(section + 1);
        } else if (event.deltaY < 0 && section > 0) {
          scrollToSection(section - 1);
        }
      },
      [section, scrollToSection]
    ),
    1200
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (isTransitioning.current) return;
      if (
        (event.key === "ArrowDown" || event.key === "ArrowRight") &&
        section < SECTIONS_COUNT - 1
      ) {
        scrollToSection(section + 1);
      } else if (
        (event.key === "ArrowUp" || event.key === "ArrowLeft") &&
        section > 0
      ) {
        scrollToSection(section - 1);
      }
    },
    [section, scrollToSection]
  );

  const handleTouchStart = useCallback((event) => {
    touchStartY.current = event.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((event) => {
    touchEndY.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isTransitioning.current) return;

    const swipeDistance = touchStartY.current - touchEndY.current;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold && section < SECTIONS_COUNT - 1) {
      scrollToSection(section + 1);
    } else if (swipeDistance < -swipeThreshold && section > 0) {
      scrollToSection(section - 1);
    }
  }, [section, scrollToSection]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    handleWheel,
    handleKeyDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div className="w-screen overflow-hidden px-0 lg:px-12 flex items-center justify-center max-h-screen lg:min-h-screen relative">
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

      <div className="flex relative flex-col w-full px-4 max-w-[1600px] pt-32 h-screen lg:h-fit items-center lg:items-start justify-start">
        <AnimatePresence mode="wait">
          <SectionContent
            section={section}
            scrollDirection={scrollDirection.current}
          />
        </AnimatePresence>

        {section < 4 && (
          <div
            ref={lottieRef}
            className="fixed -bottom-[120px] lg:bottom-0 -z-50 right-10 lg:-right-40 transform pointer-events-none w-3/4 h-3/4"
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
