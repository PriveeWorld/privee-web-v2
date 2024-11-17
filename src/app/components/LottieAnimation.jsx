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
      className="w-3/4 h-3/4 fixed bottom-0 -right-40 transform z-10 pointer-events-none"
    />
  );
}
