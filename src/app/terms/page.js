
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

const TermsOfService = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 overflow-y-auto h-screen">
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section="Terms of Service"
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
      <h1 className="text-4xl mt-24 font-bold mb-4">Terms of Service</h1>
      <p className="text-lg mb-4">Effective Date: November 16, 2023</p>
      <p className="text-lg mb-8">Last Updated: November 16, 2023</p>
      <Section>
        <p>
          Welcome to Privee World, a platform provided by Privee GmbH ("Company," "we," "us," or "our").
          By accessing or using our services, you agree to comply with and be bound by these Terms of
          Service ("Terms"). If you do not agree, please do not use our platform.
        </p>
        <h2 className="text-xl font-semibold mt-4">1. ACCEPTANCE OF TERMS</h2>
        <p>
          By registering for an account, accessing, or using Privee World, you acknowledge that you have
          read, understood, and agreed to these Terms and our Privacy Policy.
        </p>
        <h2 className="text-xl font-semibold mt-4">2. ELIGIBILITY</h2>
        <p>
          You must be at least 13 years old (or the minimum legal age in your country) to use Privee World.
          If you are under 18, you represent that your parent or guardian has reviewed and agreed to these
          Terms on your behalf.
        </p>
        <h2 className="text-xl font-semibold mt-4">3. ACCOUNT REGISTRATION</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials.
          You must not share your login information or allow others to access your account.
          We reserve the right to suspend or terminate accounts that violate these Terms.
        </p>
        <h2 className="text-xl font-semibold mt-4">4. ACCEPTABLE USE</h2>
        <p>
          By using Privee World, you agree to:
          <br/>• Comply with all applicable laws and regulations.
          <br/>• Respect other users and not engage in harassment, hate speech, or abusive behavior.
          <br/>• Not use Privee World for illegal, fraudulent, or malicious activities.
          <br/>• Not attempt to hack, disrupt, or interfere with our platform or services.
        </p>
        <h2 className="text-xl font-semibold mt-4">5. CONTENT OWNERSHIP & LICENSE</h2>
        <p>
          You retain ownership of any content you upload or share on Privee World.
          By posting content, you grant us a non-exclusive, royalty-free, worldwide license to display,
          distribute, and promote your content within our platform.
          You confirm that your content does not infringe on any third-party rights.
        </p>
        <h2 className="text-xl font-semibold mt-4">6. TERMINATION</h2>
        <p>
          We may suspend or terminate your account if you:
          <br/>• Violate these Terms.
          <br/>• Engage in fraudulent or abusive activities.
          <br/>• Create risks or legal exposure for Privee GmbH.
        </p>
        <h2 className="text-xl font-semibold mt-4">7. DISCLAIMERS & LIMITATION OF LIABILITY</h2>
        <p>
          Privee World is provided on an "as-is" and "as-available" basis without warranties of any kind.
          We are not responsible for any loss, damage, or harm resulting from your use of the platform.
          To the maximum extent permitted by law, Privee GmbH disclaims all liability related to the use
          of our services.
        </p>
        <h2 className="text-xl font-semibold mt-4">8. GOVERNING LAW</h2>
        <p>
          These Terms are governed by the laws of Austria, without regard to its conflict of law principles.
        </p>
        <h2 className="text-xl font-semibold mt-4">9. CHANGES TO THESE TERMS</h2>
        <p>
          We may update these Terms from time to time. Continued use of Privee World after modifications
          means you accept the revised Terms.
        </p>
        <h2 className="text-xl font-semibold mt-4">10. CONTACT INFORMATION</h2>
        <p>
          For questions or concerns, contact us at:
          <br/>Email: info@privee.world
          <br/>Address: Robert-Hamerling-Gasse 14/2D, 1150 Wien
          <br/>By using Privee World, you acknowledge and agree to these Terms of Service.
        </p>
      </Section>
    </div>
  );
};

export default TermsOfService;