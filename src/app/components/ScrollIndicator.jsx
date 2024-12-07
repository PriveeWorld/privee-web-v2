"use client";
import { motion } from "framer-motion";

export default function SectionIndicator({
  section,
  onScrollToSection,
  sectionsCount,
}) {
  return (
    <div className="fixed right-10 top-1/2 z-20 flex -translate-y-1/2 transform flex-col items-center space-y-4">
      {Array.from({ length: sectionsCount }).map((_, index) => (
        <motion.div
          key={index}
          onClick={() => onScrollToSection(index)}
          className={`w-3 cursor-pointer rounded-full ${
            index === section ? "h-10 bg-black" : "h-3 bg-gray-300"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </div>
  );
}
