import { motion } from "framer-motion";

const SectionIndicator = ({ section, onScrollToSection, sectionsCount }) => (
  <div className="fixed top-1/2 right-10 transform -translate-y-1/2 z-20 flex flex-col items-center space-y-4">
    {Array.from({ length: sectionsCount }).map((_, index) => (
      <motion.div
        key={index}
        onClick={() => onScrollToSection(index)}
        className="cursor-pointer w-3 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          height: index === section ? "2.5rem" : "0.75rem",
          backgroundColor: index === section ? "#000000" : "#d1d5db",
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.2 }}
      />
    ))}
  </div>
);

export default SectionIndicator;
