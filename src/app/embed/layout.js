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
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          #embed-container {
            height: -webkit-fill-available;
          }
        }
      `}</style>
      <div id="embed-container">
        {children}
      </div>
    </>
  );
}