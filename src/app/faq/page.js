"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import faqData from "../data/faq.json";

const SECTION_HEADINGS = ["FAQ"];

export default function Page() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(SECTION_HEADINGS.indexOf("FAQ"));
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="relative min-h-screen w-screen overflow-auto bg-white">
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          setSection(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section={SECTION_HEADINGS[section]}
      />
      <div className="mx-auto mt-[100px] max-w-[800px] px-4 py-8 sm:px-8 sm:py-16">
        <h1 className="mb-12 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-center font-clash text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-md border border-gray-200 bg-gray-100"
            >
              <button
                onClick={() => toggleExpand(idx)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-200"
              >
                <span className="font-inter">{item.question}</span>
                <span className="text-2xl text-gray-500">
                  {expanded[idx] ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {expanded[idx] && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="whitespace-pre-line px-6 pb-4 font-inter text-sm text-gray-700">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
