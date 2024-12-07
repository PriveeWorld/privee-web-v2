"use client";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";

export default function LottieAnimation({ animationData }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    const animationInstance = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData,
    });

    return () => animationInstance.destroy();
  }, [animationData]);

  return (
    <div
      ref={lottieRef}
      className="pointer-events-none fixed -right-40 bottom-0 z-10 h-3/4 w-3/4 transform"
    />
  );
}
