"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import classNames from "classnames";
import CustomSlideOne from "./CustomSlideOne";
import CustomSlideTwo from "./CustomSlideTwo";
import CustomSlideThree from "./CustomSlideThree";

const SECTION_HEADINGS = [
  "People",
  "Emotions",
  "Movies",
  "Your life, your story",
];
const SECTION_SUBHEADINGS = [
  "This is a story about",
  "This is a story about",
  "This is a story about",
  "This is a story about",
];

const TABS = [
  {
    title: "Watch",
    description:
      "Choose to watch your life's precious moments as a cinematic experience, reliving your story in the most compelling way.",
  },
  {
    title: "Create",
    description:
      "Get creative and customize how your story is told. Shape your moments into a masterpiece.",
  },
  {
    title: "Share",
    description:
      "Share your life's story with the world or keep it private – the choice is yours to make.",
  },
];

const SectionContent = ({ section, scrollDirection }) => {
  const [activeTab, setActiveTab] = useState(0);

  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.5
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...springTransition,
        delay: i * 0.1,
      }
    }),
    exit: { 
      opacity: 0,
      y: -30,
      transition: { duration: 0.3 }
    }
  };

  const renderTabs = () => (
    <motion.div 
      className="mt-8 sm:mt-10 md:mt-12 w-full max-w-[320px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[650px] rounded-xl border border-gray-200 bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 text-center font-medium shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="relative mb-4 sm:mb-6 flex justify-around text-gray-700 gap-2">
        {TABS.map((tab, index) => (
          <motion.button
            key={tab.title}
            className={classNames(
              "relative flex-grow text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-semibold transition-all duration-300 px-1 sm:px-2 py-1 rounded-lg",
              {
                "text-black": activeTab === index,
                "text-gray-500 hover:text-gray-700": activeTab !== index,
              },
            )}
            style={{ textAlign: "center", minWidth: "60px" }}
            onClick={() => setActiveTab(index)}
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="block">{tab.title}</span>
            {activeTab === index && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-4px] left-0 right-0 h-[2px] sm:h-[3px] bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={springTransition}
              />
            )}
            {activeTab !== index && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#3A1772]/10 to-[#CD1A70]/10 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed px-2"
        >
          <motion.strong 
            className="bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent text-sm sm:text-base md:text-lg font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {TABS[activeTab].title}:
          </motion.strong>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {TABS[activeTab].description}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  const containerClasses = classNames(
    "flex min-h-[300px] flex-col items-start justify-center relative"
  );

  switch (section) {
    case 4:
      return <CustomSlideOne />;
    case 5:
      return <CustomSlideTwo />;
    case 6:
      return <CustomSlideThree />;
    default:
      return (
        <motion.div 
          className={containerClasses}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            key={`content-${section}`}
            variants={fadeUpVariants}
            custom={0}
            className="relative z-10"
          >
            <motion.div
              variants={fadeUpVariants}
              custom={1}
              className="text-[20px] sm:text-[24px] mt-4 md:mt-6 w-full lg:w-fit text-center lg:text-left font-roboto font-light text-gray-600 px-4 lg:px-0"
            >
              {SECTION_SUBHEADINGS[section]}
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              custom={2}
              className="text-[40px] sm:text-[50px] md:text-[70px] lg:text-[90px] w-full lg:w-fit text-center lg:text-left font-clash font-semibold bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent leading-tight px-4 lg:px-0"
            >
              {section === 3 ? (
                <>
                  <div className="flex flex-col">
                    <motion.span variants={fadeUpVariants} custom={3}>Your life,</motion.span>
                    <motion.span variants={fadeUpVariants} custom={4}>Your story</motion.span>
                  </div>
                  <motion.div 
                    variants={fadeUpVariants}
                    custom={5}
                    className="mt-3 md:mt-4 lg:mt-6 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] font-light text-gray-700 leading-relaxed"
                  >
                    Turn your most Precious Moments into Cinematic Experiences
                  </motion.div>
                  <motion.div 
                    variants={fadeUpVariants}
                    custom={6}
                    className="flex w-full justify-center lg:justify-start px-2 sm:px-4"
                  >
                    {renderTabs()}
                  </motion.div>
                </>
              ) : (
                SECTION_HEADINGS[section]
              )}
            </motion.div>
          </motion.div>
          
          {/* Add subtle gradient background effect */}
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-radial from-white via-white/80 to-transparent opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      );
  }
};

export default SectionContent;
