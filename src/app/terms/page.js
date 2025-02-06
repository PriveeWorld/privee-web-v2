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
  "Contact Us"
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
      <h1 className="text-4xl mt-24 font-bold mb-4">Terms and Conditions</h1>
      <p className="text-lg mb-4">"Privee World GmbH"</p>
      <p className="text-lg mb-4">Effective as of May 24, 2024.</p>
      <Section>
        <p>
          The following are the &quot;Terms and Conditions&quot; which govern your access and use of our mobile app
          through which we may provide you with specific services as described below (&quot;Privee&quot;).
          Privee is an invite-only social media platform that enables you to create and share short-form videos
          with a global community. Privee cultivates a vibrant space for originality, innovation, trends,
          emotions, and social connections. We foster creativity and diversity by allowing you to express your
          perspectives and showcase your talents through captivating videos.
          <br/><br/>
          Privee is operated by:
          <br/>• Privee World GmbH
          <br/>• Address: Robert-Hamerling-Gasse 14/2D, 1150 Wien
          <br/><br/>
          The Terms and Conditions constitute a legally binding agreement between you and us. Please take the
          time to read the Terms and Conditions carefully.
          By accessing and using Privee you affirm that you have read these Terms and Conditions, that you
          understand, agree to, and acknowledge all the terms contained in them.
          When the terms &quot;we&quot;, &quot;us&quot;, &quot;our&quot; or similar are used in these Terms and Conditions, they refer to
          the company that owns and operates Privee.
        </p>
        <h2 className="text-xl font-semibold mt-4">1. Privee Services</h2>
        <p>
          Privee is a mobile app that may be used to create and share short-form videos with a global
          community.
          Privee allows users to create and edit short-form videos with a variety of creative tools. Privee
          facilitates social interaction, permitting users to engage in activities such as following accounts or
          expressing appreciation through likes, providing comments, and sharing videos.
          (&quot;Privee Services&quot;)
          The Privee Services may be accessed through the Privee interface.
          Privee may create special permissions or features for different types of users which will be indicated
          through Privee. Some of the Privee Services will only be available to some types of users.
        </p>
        <h2 className="text-xl font-semibold mt-4">2. Content</h2>
        <p>
          Our service lets you create, upload, post, send, receive, and store content.
          You can upload content in the Private section for your use only, or you can share the Content with
          chosen users or all users of Privee.
          This Terms and Conditions apply only to the Content that you share with other users.
          <br/><br/>
          When you do that, you retain whatever ownership rights in that content you had to begin with, but you
          grant us a license to use that content.
          User Content includes (without limitations) any videos, photographs, text, music, and sound
          recordings that users are permitted to upload, post, or otherwise make public through the use of
          Privee. Users own the User Content, and they are responsible for such content.
          User Content must not breach national and international laws and regulations, nor the Terms and
          Conditions. User Content must not infringe on any third parties&#39; intellectual property rights.
          Users may share all or any portion of User Content created by another user.
          For all User content you submit, you grant Us a worldwide, royalty-free, sublicensable, and
          transferable license to host, store, cache, use, display, reproduce, modify, adapt, edit, publish, analyse,
          transmit, and distribute that content. This license is for the purpose of operating, developing,
          providing, promoting, and improving the Privee Services and researching and developing new ones.
          This license includes a right for us to make your content available to, and pass these rights along to,
          service providers with whom we have contractual relationships related to the provision of the
          Services, solely for the purpose of providing such Services.
          We may access, review, screen, and delete your content at any time and for any reason. You alone, are
          responsible for the content you create, upload, post, send, or store through the Services.
        </p>
        <h3 className="text-lg font-semibold mt-2">2.1 Prohibited Content:</h3>
        <p>
          As a user of Privee, you are strictly prohibited from posting, uploading, sharing, or otherwise making
          available any content that:
          <br/>• Violates Laws and Regulations
          <br/>• Infringes Intellectual Property Rights
          <br/>• Promotes Violence or Harm
          <br/>• Harassment and Bullying
          <br/>• Hate Speech
          <br/>• Sexually Explicit Content
          <br/>• Misleading Information
          <br/>• Malicious Software
          <br/>• Unauthorized Commercial Activities
          <br/>• Graphic Violence
          <br/>• Self-Harm and Suicide
          <br/>• Spam and Phishing
          <br/><br/>
          Privee reserves the right to remove any content that violates these prohibitions and to take appropriate
          action against the responsible accounts, including suspension or termination of access. Users are
          encouraged to report any content that they believe violates these guidelines.
          By adhering to these standards, we aim to create a positive, respectful, and safe community for all
          users.
          <br/><br/>
          <strong>Content Removal and Account Suspension:</strong> &quot;We reserve the right to remove any user content or
          suspend accounts that violate these Terms and Conditions or applicable laws. The process includes:
          <br/>• Review and Notice
          <br/>• Immediate Action
          <br/>• Appeals
          <br/>• Final Decision
          <br/><br/>
          Note that you will have no access to your user content after the content is removed or account is
          blocked. We advise you to store your content outside of Privee to secure access in these cases. You
          will only have a right to access your personal data submitted in the registration process, in accordance
          with the Privacy Policy.
          <br/><br/>
          You understand, agree, and acknowledge that Privee may generate revenues, increase goodwill or
          otherwise increase the value from your use of Privee Services, including (without limitation), through
          the advertising, sponsorships, promotions and subscription. Unless expressly permitted in the Terms
          and Conditions or stipulated by specific agreement executed with Privee, you do not have the right to
          participate in any such revenue, goodwill or value. Exceptionally, Privee may offer opportunities for
          users to monetize their content through advertising, sponsorships, or other means. Our policies
          include:
          <br/>• <strong>Eligibility</strong>: Users must meet certain criteria to be eligible for monetization.
          <br/>• <strong>Revenue Sharing</strong>: Any revenue generated from user content will be shared according to
            specific agreements.
          <br/>• <strong>Transparency</strong>: We will provide transparent reporting on revenue generated.
          <br/>• <strong>Compliance</strong>: Users must comply with all monetization guidelines and terms.
        </p>
        <h2 className="text-xl font-semibold mt-4">3. Access</h2>
        <p>
          To access and use Privee, you must create an account with us.
          Account registration can be done through e mail, Google or Apple accounts.
          You guarantee that all the information provided in the registration process is true, complete, and
          accurate. If any of them changes, you should update them in a timely manner...
          <br/><br/>
          <strong>3.1 User Responsibilities and Code of Conduct:</strong>
          <br/>• Accurate Information
          <br/>• Account Security
          <br/>• Prohibited Content
          <br/>• Respectful Interaction
          <br/>• Compliance
        </p>
        <h2 className="text-xl font-semibold mt-4">4. Privacy</h2>
        <p>
          Protecting your privacy is of utmost importance to us. Our Privacy Policy, incorporated by reference
          into these Terms and Conditions, provides detailed information about how we collect, use, and share
          your personal information...
        </p>
        <h2 className="text-xl font-semibold mt-4">5. Intellectual Property Rights</h2>
        <p>
          Users are the sole owners of the intellectual property rights for the User Content posted on Privee...
        </p>
        <h2 className="text-xl font-semibold mt-4">6. Limitation of Liability</h2>
        <p>
          You hereby release us and agree to hold us harmless from any and all causes of action and claims of
          any nature resulting from Privee in general...
        </p>
        <h2 className="text-xl font-semibold mt-4">7. Modifications and Interruptions</h2>
        <p>
          You understand, agree, and acknowledge that we may modify, suspend, disrupt, or discontinue Privee,
          any part of Privee or the use of Privee, whether to all clients or to you specifically...
        </p>
        <h2 className="text-xl font-semibold mt-4">8. Notices and Requests</h2>
        <p>
          We may provide notices or other communications to you regarding any aspect of Privee, by email
          to the email address that we have on record, by regular mail or by posting it online...
        </p>
        <h2 className="text-xl font-semibold mt-4">9. Severability</h2>
        <p>
          If any provision of these Terms and Conditions is held by a court of competent jurisdiction to be
          illegal, invalid, unenforceable, or otherwise contrary to law, the remaining provisions...
        </p>
        <h2 className="text-xl font-semibold mt-4">10. Governing Law and Jurisdiction</h2>
        <p>
          These Terms and Conditions and our relationship with you shall both be interpreted solely in
          accordance with the laws of Bosnia and Herzegovina...
        </p>
        <h2 className="text-xl font-semibold mt-4">11. Amendments</h2>
        <p>
          We may update these Terms and Conditions at our sole discretion...
          The date of the last revision appears at the beginning of this page.
        </p>
      </Section>
    </div>
  );
};

export default TermsOfService; 