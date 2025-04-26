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
    <div className="mt-12 w-full rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm p-4 text-center font-medium md:p-6 lg:w-[600px]">
      <div className="relative mb-4 flex justify-around text-gray-700">
        {TABS.map((tab, index) => (
          <motion.button
            key={tab.title}
            className={classNames(
              "relative flex-grow text-[16px] font-medium transition-colors duration-300 md:text-[20px] lg:text-[24px]",
              {
                "text-black": activeTab === index,
                "text-gray-500": activeTab !== index,
              },
            )}
            style={{ textAlign: "center", minWidth: "80px" }}
            onClick={() => setActiveTab(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.title}
            {activeTab === index && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#3A1772] to-[#CD1A70]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={springTransition}
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
          className="mt-4 text-sm text-gray-600 md:text-base"
        >
          <strong className="bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent">
            {TABS[activeTab].title}:
          </strong>{" "}
          {TABS[activeTab].description}
        </motion.div>
      </AnimatePresence>
    </div>
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
              className="text-[24px] mt-6 w-full lg:w-fit text-center lg:text-left font-roboto font-light text-gray-600"
            >
              {SECTION_SUBHEADINGS[section]}
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              custom={2}
              className="text-[50px] w-full lg:w-fit text-center lg:text-left md:text-[90px] font-clash font-semibold bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent leading-tight md:leading-none"
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
                    className="mt-4 text-[16px] font-light text-gray-700 md:mt-6 md:text-[20px] lg:text-[24px]"
                  >
                    Turn your most Precious Moments into Cinematic Experiences
                  </motion.div>
                  <motion.div 
                    variants={fadeUpVariants}
                    custom={6}
                    className="flex w-full px-4"
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
