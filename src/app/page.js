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

const SECTION_HEADINGS = ["People", "Emotions", "Movies", "Your life, your story"];
const SECTIONS_COUNT = 7;

/** 
 * Define segments for the first 4 sections (0 -> 3).
 * Adjust these ranges to match your actual Lottie JSON frames.
 * Example:
 *   Section 0 => frames [0, 20]
 *   Section 1 => frames [20, 40]
 *   Section 2 => frames [40, 60]
 *   Section 3 => frames [60, 80]
 */
const FORWARD_SEGMENTS = {
  0: [0, 20],
  1: [20, 40],
  2: [40, 60],
  3: [60, 80],
};

/**
 * Helper to get the correct [startFrame, endFrame] for Lottie 
 * based on the current section and the next section. If we're
 * moving forward (e.g., 0 -> 1), we use the segment for the
 * current section. If moving backward (e.g., 1 -> 0), we flip 
 * that segment to play in reverse.
 */
function getSegmentRange(currentSection, nextSection) {
  // We only have explicit segments for sections 0..3 in this example
  // If nextSection is >= 4, we typically won't animate (or we handle differently).
  if (nextSection < 0 || nextSection > 3 || currentSection < 0 || currentSection > 3) {
    return null;
  }

  // Are we scrolling forward or backward?
  const goingForward = nextSection > currentSection;

  // Retrieve the segment from the perspective of whichever direction you're going
  // (Often you use the segment that belongs to the *section you're leaving*, but
  //  you can also define each segment as belonging to the *target* section. 
  //  This is purely a matter of preference.)
  let [start, end] = FORWARD_SEGMENTS[goingForward ? currentSection : nextSection];

  // If going backward, flip it
  if (!goingForward) {
    [start, end] = [end, start];
  }
  return [start, end];
}

export default function Home() {
  const [section, setSection] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isTransitioning = useRef(false);
  const scrollDirection = useRef("down");
  const lottieRef = useRef(null);
  const animationInstance = useRef(null);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(Date.now());

  // We read the window height safely if we're in the browser
  const SECTION_HEIGHT = 
    typeof window !== "undefined" ? window.innerHeight : 0;

  // Prevent default scroll behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const preventDefault = (e) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    window.addEventListener('wheel', preventDefault, { passive: false });
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', preventDefault);
    };
  }, []);

  /**
   * 1) Load the Lottie animation if we're in sections 0..3.
   *    Destroy it if we leave those sections.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (section < 4) {
      // Initialize or re-initialize the animation
      animationInstance.current = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "canvas",
        loop: false,
        autoplay: false,
        animationData,
      });

      // Go to first frame to ensure visibility
      animationInstance.current.goToAndStop(0, true);
      
      // Add debug logging
      console.log('Lottie animation initialized:', {
        container: lottieRef.current,
        instance: animationInstance.current
      });
    }

    return () => {
      // Clean up old instance to avoid memory leaks
      animationInstance.current?.destroy();
      animationInstance.current = null;
    };
  }, [section]);

  /**
   * 2) Function to animate specific frames, forward or backward,
   *    using a manual stepping approach or Lottie's built-in 
   *    playSegments. We'll use a manual stepping approach here 
   *    (like your original code).
   */
  const animateLottieFrames = useCallback((startFrame, endFrame, reverse = false) => {
    if (!animationInstance.current) return;

    let currentFrame = startFrame;
    // Adjust increment for forward vs. reverse
    const frameIncrement = reverse ? -0.25 : 0.25;

    const step = () => {
      if (
        (!reverse && currentFrame < endFrame) ||
        (reverse && currentFrame > endFrame)
      ) {
        currentFrame += frameIncrement;
        animationInstance.current.goToAndStop(currentFrame, true);
        requestAnimationFrame(step);
      } else {
        // Make sure we end exactly on the endFrame
        animationInstance.current.goToAndStop(endFrame, true);
        isTransitioning.current = false;
      }
    };

    step();
  }, []);

  /**
   * Handle section change with debounce and validation
   */
  const handleSectionChange = useCallback((nextSection) => {
    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTime.current;
    
    // Debounce section changes
    if (timeSinceLastScroll < 800) {
      return;
    }

    // Validate section change
    if (
      nextSection < 0 ||
      nextSection >= SECTIONS_COUNT ||
      nextSection === section ||
      isTransitioning.current ||
      Math.abs(nextSection - section) > 1
    ) {
      return;
    }

    lastScrollTime.current = now;
    isTransitioning.current = true;
    scrollDirection.current = nextSection > section ? "down" : "up";
    
    // Update section state
    setSection(nextSection);

    // Handle Lottie animations for sections 0-3
    if (nextSection < 4 || section < 4) {
      const segment = getSegmentRange(section, nextSection);
      if (segment) {
        const [startFrame, endFrame] = segment;
        const reverse = nextSection < section;
        animateLottieFrames(startFrame, endFrame, reverse);
      } else {
        isTransitioning.current = false;
      }
    }

    // Smooth scroll with dynamic timing
    const scrollOptions = {
      top: SECTION_HEIGHT * nextSection,
      behavior: 'smooth'
    };
    window.scrollTo(scrollOptions);

    // Clear transition state after animation
    const transitionDelay = (section < 4 || nextSection < 4) ? 1200 : 800;
    setTimeout(() => {
      isTransitioning.current = false;
    }, transitionDelay);
  }, [section, animateLottieFrames]);

  /**
   * Handle wheel events with improved threshold and debounce
   */
  const handleWheel = useCallback((event) => {
    if (isTransitioning.current) {
      event.preventDefault();
      return;
    }

    const threshold = 50;
    if (Math.abs(event.deltaY) < threshold) {
      return;
    }

    event.preventDefault();

    if (event.deltaY > 0 && section < SECTIONS_COUNT - 1) {
      handleSectionChange(section + 1);
    } else if (event.deltaY < 0 && section > 0) {
      handleSectionChange(section - 1);
    }
  }, [section, handleSectionChange]);

  // Attach wheel handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Update keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          if (section < SECTIONS_COUNT - 1) {
            handleSectionChange(section + 1);
          }
          break;
        case "ArrowUp":
        case "ArrowLeft":
          if (section > 0) {
            handleSectionChange(section - 1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [section, handleSectionChange]);

  // Update drag handler
  const bind = useDrag(
    ({ last, direction: [, dy], cancel }) => {
      if (isTransitioning.current) {
        cancel?.();
        return;
      }

      if (last) {
        if (dy < 0 && section < SECTIONS_COUNT - 1) {
          handleSectionChange(section + 1);
        } else if (dy > 0 && section > 0) {
          handleSectionChange(section - 1);
        }
      }
    },
    { axis: "y", filterTaps: true }
  );

  return (
    <div
      {...bind()}
      ref={containerRef}
      className="flex h-screen w-screen lg:touch-none items-center justify-center overflow-hidden"
    >
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          handleSectionChange(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav onMenuClick={() => setIsNavOpen(true)} section={section} />

      <div className="relative mt-20 flex h-screen w-full max-w-[1600px] flex-col items-center justify-start px-4 pt-16 lg:h-fit lg:items-start lg:px-16 lg:pt-0">
        <AnimatePresence mode="wait">
          <SectionContent
            section={section}
            scrollDirection={scrollDirection.current}
          />
        </AnimatePresence>

        {/** 
         *  Render Lottie container only for sections 0..3 
         *  (or adjust to your needs).
         */}
        {section < 4 && (
          <div
            ref={lottieRef}
            className={`
              pointer-events-none fixed 
              bottom-0 right-0
              z-0 
              w-full h-[42%]
              md:w-[60%] md:h-[60%]
              lg:w-[50%] lg:h-[70%]
              xl:w-[45%] xl:h-[75%]
              2xl:w-[40%] 2xl:h-[80%]
              transform 
              translate-x-0
              md:translate-x-[10%]
              lg:translate-x-[5%]
              xl:translate-x-0
              opacity-50 md:opacity-75 lg:opacity-100
              ${section === 3 ? "hidden-on-mobile" : ""}
            `}
          />
        )}

        <SectionIndicator
          section={section}
          onScrollToSection={handleSectionChange}
          sectionsCount={SECTIONS_COUNT}
        />

        <NavigationButtons
          section={section}
          sectionsCount={SECTIONS_COUNT}
          onScrollToSection={handleSectionChange}
        />
      </div>
    </div>
  );
}