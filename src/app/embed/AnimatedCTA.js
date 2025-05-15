"use client";

// Animated Call to Action Banner component
export default function AnimatedCTA() {
  const handleClick = () => {
    // Check if running in mobile browser
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, try to use the direct link
      window.location.href = "https://priveee.onelink.me/AMM3/VEDATOR";
      
      // Fallback - if after 2 seconds the page hasn't changed, 
      // we'll assume the deep link failed and open in new tab
      setTimeout(() => {
        window.open("https://priveee.onelink.me/AMM3/VEDATOR", "_blank");
      }, 2000);
    } else {
      // For desktop, always open in new tab
      window.open("https://priveee.onelink.me/AMM3/VEDATOR", "_blank");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] w-full">
      <div 
        onClick={handleClick}
        className="block w-full bg-gradient-to-r from-black/80 via-black/60 to-black/80 py-2 px-3 cursor-pointer group overflow-hidden relative touch-manipulation"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <div className="animate-marquee whitespace-nowrap flex items-center justify-center gap-4 text-sm">
          <span className="text-white font-medium flex items-center gap-1">
            Watch Now on Privee
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
          <span className="text-white/70">•</span>
          <span className="text-white/90">Experience the Future of Cinematic Storytelling</span>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-4 py-1.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
} 