// Separate layout for embed that excludes footer
export default function EmbedLayout({ children }) {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }

        #embed-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <div id="embed-container">
        {children}
      </div>
    </>
  );
}