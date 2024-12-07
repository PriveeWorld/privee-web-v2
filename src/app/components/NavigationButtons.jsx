"use client";
import ScrollButton from "./ScrollButton";

const NavigationButtons = ({ section, sectionsCount, onScrollToSection }) => (
  <div className="fixed bottom-10 left-1/2 z-20 flex -translate-x-1/2 transform space-x-4">
    <ScrollButton
      direction="up"
      isDisabled={section === 0}
      onClick={() => onScrollToSection(section - 1)}
    />
    <ScrollButton
      direction="down"
      isDisabled={section === sectionsCount - 1}
      onClick={() => onScrollToSection(section + 1)}
    />
  </div>
);

export default NavigationButtons;
