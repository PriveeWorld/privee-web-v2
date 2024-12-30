"use client";
import { motion } from "framer-motion";
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

  const renderTabs = () => (
    <div className="mt-12 w-full rounded-lg border border-gray-300 p-4 text-center font-medium md:p-6 lg:w-[600px]">
      <div
        className="relative mb-4 flex justify-around text-gray-700"
        style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
      >
        {TABS.map((tab, index) => (
          <button
            key={tab.title}
            className={classNames(
              "relative flex-grow text-[16px] font-medium transition-colors duration-300 md:text-[20px] lg:text-[24px]",
              {
                "text-black": activeTab === index,
                "text-gray-500": activeTab !== index,
              },
            )}
            style={{
              textAlign: "center",
              minWidth: "80px",
            }}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
            {activeTab === index && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="mt-4 text-sm text-gray-600 md:text-base"
      >
        <strong>{TABS[activeTab].title}:</strong> {TABS[activeTab].description}
      </motion.div>
    </div>
  );

  const sharedSubheadingStyles =
    "text-[24px] mt-12 w-full lg:w-fit text-center lg:text-left font-roboto font-light text-gray-600";
  const sharedHeadingStyles =
    "text-[50px] w-full lg:w-fit text-center lg:text-left md:text-[90px] font-clash font-semibold bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent leading-tight md:leading-none";

  const containerClasses = classNames(
    "flex min-h-[300px] flex-col items-start justify-center",
    { "-mt-[100px]": section === 0 },
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
        <div className={containerClasses}>
          <motion.div
            key={`subheading-${section}`}
            initial={{ opacity: 0, x: scrollDirection === "down" ? -20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: scrollDirection === "down" ? 20 : -20 }}
            transition={{ duration: 0.5 }}
            className={`${sharedSubheadingStyles}`}
          >
            {SECTION_SUBHEADINGS[section]}
          </motion.div>

          <motion.div
            key={`heading-${section}`}
            initial={{ opacity: 0, x: scrollDirection === "down" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: scrollDirection === "down" ? 20 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${sharedHeadingStyles}`}
          >
            {section === 3 ? (
              <>
                <div className="flex flex-col">
                  <span>Your life,</span>
                  <span>Your story</span>
                </div>
                <div className="mt-4 text-[16px] font-light text-gray-700 md:mt-6 md:text-[20px] lg:text-[24px]">
                  Turn your most Precious Moments into Cinematic Experiences
                </div>
                <div className="flex w-full px-4">{renderTabs()}</div>
              </>
            ) : (
              SECTION_HEADINGS[section]
            )}
          </motion.div>
        </div>
      );
  }
};

export default SectionContent;
