"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import Link from "next/link";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Privacy Policy",
  "Contact Us",
  "Nagradna Igra"
];

const ChildSafetyStandards = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(1);

  const scrollToSection = (index) => {
    setSection(index);
  };

  return (
    <div className="relative mb-20 flex min-h-screen w-screen items-center justify-center overflow-auto">
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          scrollToSection(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section={SECTION_HEADINGS[section]}
      />

      {/* Main Content Container */}
      <div className="relative mb-[100px] mt-[250px] flex min-h-screen w-full max-w-[1600px] flex-col items-start justify-center overflow-y-auto px-4 py-8 sm:px-8 sm:py-16 lg:mb-0 lg:mt-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            {/* Page Heading */}
            <h1 className="mb-4 mt-12 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-semibold leading-tight tracking-tight text-transparent sm:text-[40px] md:text-[50px] lg:text-[60px]">
              Privee World Child Safety Standards
            </h1>

            {/* Effective Date */}
            <p className="text-md mx-auto mb-8 max-w-3xl font-light text-gray-700 sm:mb-12 sm:text-base md:text-lg lg:text-xl">
              <strong>Effective Date: January 23, 2025</strong>
            </p>

            {/* Logo (Keeping the same design structure) */}
            <div className="mb-12 flex justify-center sm:mb-16">
              <Image
                src="/images/priveecolor.png"
                alt="Privee Logo"
                width={160}
                height={80}
                className="h-auto w-[120px] sm:w-[160px] md:w-[200px]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Child Safety Standards Content */}
        <motion.div
          className="w-full space-y-6 text-gray-700 sm:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Introduction */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              Introduction
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              At Privee World, we prioritize the safety and well-being of all
              our users, especially children. We are committed to creating a
              secure environment that protects minors from any form of sexual
              abuse and exploitation. This document outlines our policies,
              procedures, and commitments to uphold child safety within our
              platform.
            </p>
          </div>

          {/* 1. Prohibition of CSAE */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              1. Prohibition of Child Sexual Abuse and Exploitation (CSAE)
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              Privee World strictly prohibits any content or behavior that
              sexually exploits or endangers children. This includes, but is not
              limited to:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm font-light sm:text-base md:text-lg">
              <li>
                <strong>Child Sexual Abuse Material (CSAM):</strong> Any visual
                depiction of sexually explicit conduct involving minors.
              </li>
              <li>
                <strong>Child Grooming:</strong> Actions undertaken to befriend
                and establish an emotional connection with a child to lower
                their inhibitions for exploitation.
              </li>
              <li>
                <strong>Sexualization of Minors:</strong> Any content that
                depicts, encourages, or promotes the sexual abuse or exploitation
                of children.
              </li>
            </ul>
          </div>

          {/* 2. In-App Reporting Mechanism */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              2. In-App Reporting Mechanism
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              We have implemented an in-app reporting feature that allows users
              to report any content or behavior they believe violates our child
              safety standards. Reports are reviewed promptly, and appropriate
              action is taken, including content removal and account suspension
              or termination.
            </p>
          </div>

          {/* 3. Addressing CSAM */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              3. Addressing CSAM
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              Upon receiving actual knowledge of any CSAM on our platform, we
              will:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm font-light sm:text-base md:text-lg">
              <li>Remove the content immediately.</li>
              <li>
                Report the incident to the appropriate authorities, including
                the National Center for Missing &amp; Exploited Children (NCMEC)
                or relevant regional bodies.
              </li>
            </ul>
          </div>

          {/* 4. Compliance with Child Safety Laws */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              4. Compliance with Child Safety Laws
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              Privee World complies with all applicable child safety laws and
              regulations. We are committed to:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm font-light sm:text-base md:text-lg">
              <li>
                Regularly reviewing and updating our policies to ensure
                alignment with legal requirements and best practices.
              </li>
              <li>
                Collaborating with law enforcement agencies and child protection
                organizations to address and prevent child exploitation.
              </li>
            </ul>
          </div>

          {/* 5. Designated Child Safety Contact */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              5. Designated Child Safety Contact
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              For any inquiries or concerns regarding our child safety
              practices, please contact:
            </p>
            <ul className="mt-2 list-inside list-none space-y-2 text-sm font-light sm:text-base md:text-lg">
              <li>
                <strong>Name:</strong> [Dino Colakovic]
              </li>
              <li>
                <strong>Email:</strong> [dino@privee.world]
              </li>
            </ul>
            <p className="mt-2 text-sm font-light sm:text-base md:text-lg">
              This individual is equipped to discuss our CSAE prevention
              measures and ensure compliance with relevant policies and laws.
            </p>
          </div>

          {/* 6. User Education and Awareness */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              6. User Education and Awareness
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              We are dedicated to educating our community about child safety by:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm font-light sm:text-base md:text-lg">
              <li>
                Providing resources and guidelines on recognizing and reporting
                CSAE.
              </li>
              <li>
                Promoting awareness campaigns within the app to foster a
                vigilant and informed user base.
              </li>
            </ul>
          </div>

          {/* 7. Continuous Improvement */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              7. Continuous Improvement
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              Privee World is committed to continuously enhancing our child
              safety measures by:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm font-light sm:text-base md:text-lg">
              <li>
                Regularly updating our technologies to detect and prevent CSAE.
              </li>
              <li>
                Training our staff to handle reports and incidents related to
                child safety effectively.
              </li>
            </ul>
          </div>

          {/* Conclusion */}
          <div>
            <h2 className="mb-2 font-semibold sm:mb-4 sm:text-lg md:text-xl">
              Conclusion
            </h2>
            <p className="text-sm font-light sm:text-base md:text-lg">
              The protection of children is a fundamental responsibility we
              uphold at Privee World. We encourage our users to participate
              actively in maintaining a safe environment and to report any
              concerns promptly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChildSafetyStandards;
