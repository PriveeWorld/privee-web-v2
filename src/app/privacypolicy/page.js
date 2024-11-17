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
    <div className="w-full max-w-4xl mx-auto p-8">
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

      <Section>
        <h2 className="text-2xl font-semibold">
          Interpretation and Definitions
        </h2>
        <h3 className="text-xl font-medium mt-4">Interpretation</h3>
        <p>
          The words with their initial letters capitalized have meanings defined
          under the following conditions. These definitions shall have the same
          meaning regardless of whether they appear in singular or plural.
        </p>

        <h3 className="text-xl font-medium mt-4">Definitions</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Account:</strong> A unique account created for You to access
            our Service or parts of our Service.
          </li>
          <li>
            <strong>Affiliate:</strong> An entity that controls, is controlled
            by, or is under common control with a party.
          </li>
          <li>
            <strong>Application:</strong> Refers to Privee Mobile App, the
            software provided by the Company.
          </li>
          <li>
            <strong>Company:</strong> Refers to Privee World GmbH,
            Robert-Hamerling-Gasse 14/2D, 1150 Wien.
          </li>
          <li>
            <strong>Country:</strong> Refers to Bosnia & Herzegovina.
          </li>
          <li>
            <strong>Device:</strong> Any device that can access the Service,
            such as a computer, a cellphone, or a digital tablet.
          </li>
          <li>
            <strong>Personal Data:</strong> Any information that relates to an
            identified or identifiable individual.
          </li>
          <li>
            <strong>Service:</strong> Refers to the Application.
          </li>
          <li>
            <strong>Service Provider:</strong> Any natural or legal person who
            processes data on behalf of the Company.
          </li>
          <li>
            <strong>Third-party Social Media Service:</strong> Any social
            network or website allowing login or account creation to use the
            Service.
          </li>
          <li>
            <strong>Usage Data:</strong> Data collected automatically when using
            the Service.
          </li>
          <li>
            <strong>You:</strong> The individual accessing or using the Service,
            or a legal entity on behalf of which such individual is accessing or
            using the Service.
          </li>
        </ul>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">
          Collecting and Using Your Personal Data
        </h2>
        <h3 className="text-xl font-medium mt-4">Types of Data Collected</h3>
        <p>
          <strong>Personal Data:</strong> While using Our Service, We may ask
          You to provide certain personally identifiable information, including
          but not limited to:
        </p>
        <ul className="list-disc list-inside">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Usage Data</li>
        </ul>
        <p className="mt-4">
          <strong>Usage Data:</strong> Usage Data is collected automatically
          when using the Service. This includes:
        </p>
        <ul className="list-disc list-inside">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device type, unique device identifiers, and operating system</li>
          <li>Pages visited, time spent on pages, and diagnostic data</li>
        </ul>
        <p>
          <strong>Information from Third-party Social Media Services:</strong>{" "}
          If You log in through Google, Apple, Facebook, Instagram, Twitter, or
          LinkedIn, We may collect:
        </p>
        <ul className="list-disc list-inside">
          <li>Name and email address associated with the account</li>
          <li>
            Additional information You allow us to access from Your account
          </li>
        </ul>
        <p>
          <strong>Information Collected via the Application:</strong> With Your
          permission, We may access photos and media files or use Your device’s
          camera for specific features.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">
          Retention of Your Personal Data
        </h2>
        <p>
          We will retain Your Personal Data only for as long as necessary to
          fulfill purposes outlined in this policy. Usage Data may be retained
          longer for internal analysis, security, or functionality improvements.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">
          Disclosure of Your Personal Data
        </h2>
        <p>
          We may disclose Your data:
          <ul className="list-disc list-inside">
            <li>To comply with legal requirements</li>
            <li>To protect the rights or property of the Company</li>
            <li>For law enforcement purposes</li>
            <li>To prevent misuse of the Service</li>
          </ul>
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">
          Security of Your Personal Data
        </h2>
        <p>
          While We take reasonable measures to secure Your data, no method of
          electronic transmission is entirely secure. Therefore, We cannot
          guarantee absolute security.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">{"Children's Privacy"}</h2>
        <p>
          Our Service does not knowingly collect Personal Data from anyone under
          the age of 18. If You are a parent or guardian aware of Your child
          providing Personal Data, please contact Us.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, You can contact
          Us at:
        </p>
        <ul className="list-disc list-inside">
          <li>Email: info@privee.world</li>
        </ul>
      </Section>
    </div>
  );
};

export default PrivacyPolicy;
