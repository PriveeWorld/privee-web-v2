"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Privacy Policy",
  "Contact Us",
   "Nagradna Igra"
];

const Section = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="my-8"
    >
      {children}
    </motion.div>
  );
};

const PrivacyPolicy = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 overflow-y-auto h-screen">
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section={SECTION_HEADINGS[4]}
      />

      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          console.log(`Scroll to section ${SECTION_HEADINGS[index]}`);
          setIsNavOpen(false);
        }}
      />
      <h1 className="text-4xl mt-24 font-bold mb-4">
        Privacy Policy for Privee World
      </h1>
      <p className="text-lg mb-8">Last updated: November 16, 2023</p>

      {/* Content Sections */}
      <Section>
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use, and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You. We use Your Personal Data to provide and improve the
          Service. By ticking a box when registering for the Application, You
          consent to the collection and use of information in accordance with
          this Privacy Policy.
        </p>
        <p>
          You are not obligated to provide Your personal data under the law.
          Your personal data is collected, used, and disclosed in accordance
          with this Privacy Policy based on Your consent. If You do not consent
          to this Privacy Policy, We may not be able to provide You with the
          Service.
        </p>
      </Section>
      {/* Other sections follow */}
    </div>
  );
};

export default PrivacyPolicy;
