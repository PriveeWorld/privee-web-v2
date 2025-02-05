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
      <p className="text-lg mb-8">Privacy Policy</p>
      <p className="text-lg mb-8">Last updated: November 16, 2023</p>
      <Section>
        <p>
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of 
          Your information when You use the Service and tells You about Your privacy rights and how the law 
          protects You. We use Your Personal data to provide and improve the Service. By ticking a box when 
          registering to the Application, You consent to the collection and use of information in 
          accordance with this Privacy Policy.‍ You are not obligated to provide Your personal data in 
          accordance with law. Your personal data is collected, used and disclosed in accordance with 
          this Privacy Policy on the basis of your consent. If you do not consent to this Privacy Policy 
          we may not be able to provide you the Service.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Interpretation and Definitions</h2>
        <h3 className="text-xl font-semibold mt-4">Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings defined under the following 
          conditions. The following definitions shall have the same meaning regardless of whether they 
          appear in singular or in plural.
        </p>
        <h3 className="text-xl font-semibold mt-4">Definitions</h3>
        <p>
          For the purposes of this Privacy Policy:
          <br/>• Account means a unique account created for You to access our Service or parts of our Service.
          <br/>• Affiliate means an entity that controls, is controlled by or is under common control with 
          a party, where "control" means ownership of 50% or more of the shares, equity interest or other 
          securities entitled to vote for election of directors or other managing authority.
          <br/>• Application refers to Privee Mobile App, the software program provided by the Company.
          <br/>• Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers 
          to Privee World GmbH, Robert-Hamerling-Gasse 14/2D, 1150 Wien, which is operator of the platform 
          and is a controller of personal data in accordance with this Privacy Policy.
          <br/>• Country refers to: Bosnia &amp; Herzegovina
          <br/>• Device means any device that can access the Service such as a computer, a cell phone or 
          a digital tablet.
          <br/>• Personal Data is any information that relates to an identified or identifiable individual.
          <br/>• Service refers to the Application.
          <br/>• Service Provider means any natural or legal person who processes the data on behalf of 
          the Company. It refers to third-party companies or individuals employed by the Company to 
          facilitate the Service, to provide the Service on behalf of the Company, to perform services 
          related to the Service or to assist the Company in analyzing how the Service is used.
          <br/>• Third-party Social Media Service refers to any website or any social network website 
          through which a User can log in or create an account to use the Service.
          <br/>• Usage Data refers to data collected automatically, either generated by the use of the 
          Service or from the Service infrastructure itself (for example, the duration of a page visit).
          <br/>• You means the individual accessing or using the Service, or the company, or other legal 
          entity on behalf of which such individual is accessing or using the Service, as applicable.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Collecting and Using Your Personal Data</h2>
        <h3 className="text-xl font-semibold mt-4">Types of Data Collected</h3>
        <p>
          <strong>Personal Data</strong><br/>
          While using Our Service, We may ask You to provide Us with certain personally identifiable 
          information that can be used to contact or identify You. Personally identifiable information 
          may include, but is not limited to: Email address, First name and last name, Usage Data
        </p>
        <p>
          <strong>Usage Data</strong><br/>
          Usage Data is collected automatically when using the Service. Usage Data may include information 
          such as Your Device's IP address, browser type, the pages of our Service that You visit, the 
          time and date of Your visit, and other diagnostic data. When You access the Service by or 
          through a mobile device, We may collect certain information automatically. We may also collect 
          information that Your browser sends whenever You visit our Service.
        </p>
        <h3 className="text-xl font-semibold mt-4">Information from Third-Party Social Media Services</h3>
        <p>
          The Company allows You to create an account and log in through Google, Apple, Facebook, Instagram, 
          Twitter, LinkedIn. If You decide to register through or otherwise grant us access to a Third-Party 
          Social Media Service, We may collect Personal data that is already associated with Your account, 
          such as Your name, Your email address, Your activities or Your contact list. You are giving the 
          Company permission to use, share, and store it in a manner consistent with this Privacy Policy.
        </p>
        <p>
          <strong>Information Collected while Using the Application</strong><br/>
          While using Our Application, in order to provide features of Our Application, We may collect, with 
          Your prior permission, pictures and other information from your Device's camera and photo library. 
          You can enable or disable access to this information at any time, through Your Device settings.
        </p>
        <h3 className="text-xl font-semibold mt-4">Use of Your Personal Data</h3>
        <p>
          The Company may use Personal Data for the following purposes:  
          To provide and maintain our Service; to manage Your Account; for the performance of a contract; 
          to contact You; to provide You with news, special offers and general information; to manage Your 
          requests; for business transfers; for other purposes such as data analysis, identifying usage 
          trends, and improving our Service.
        </p>
        <p>
          We may share Your personal information in the following situations: With Service Providers, for 
          business transfers, with Affiliates, with business partners, with other users, or with Your 
          consent.
        </p>
        <h3 className="text-xl font-semibold mt-4">Retention of Your Personal Data</h3>
        <p>
          The Company will retain Your Personal Data only for as long as is necessary for the purposes set 
          out in this Privacy Policy and to comply with legal obligations. Usage Data is generally retained 
          for a shorter period, except when used to strengthen security or improve Our Service.
        </p>
        <h3 className="text-xl font-semibold mt-4">Transfer of Your Personal Data</h3>
        <p>
          Your information may be transferred to computers located outside of Your jurisdiction where the 
          data protection laws may differ. The Company will take all steps reasonably necessary to ensure 
          that Your data is treated securely and in accordance with this Privacy Policy.
        </p>
        <h3 className="text-xl font-semibold mt-4">Delete Your Personal Data</h3>
        <p>
          You have the right to delete or request that We assist in deleting the Personal Data. You may 
          update, amend, or delete Your information at any time by signing in to Your Account. We may need 
          to retain certain information when We have a legal obligation or lawful basis to do so.
        </p>
        <h3 className="text-xl font-semibold mt-4">Disclosure of Your Personal Data</h3>
        <p>
          In a business transaction, if the Company is involved in a merger, acquisition or asset sale, Your 
          Personal Data may be transferred. The Company may disclose Your Personal Data under certain 
          circumstances to comply with legal obligations or protect our rights or the safety of our users 
          and the public.
        </p>
        <h3 className="text-xl font-semibold mt-4">Security of Your Personal Data</h3>
        <p>
          We strive to use commercially acceptable means to protect Your Personal Data, but no method of 
          transmission over the Internet or method of electronic storage is 100% secure.
        </p>
        <h3 className="text-xl font-semibold mt-4">Children's Privacy</h3>
        <p>
          Our Service does not address anyone under the age of 18. If We become aware that We have collected 
          Personal Data from anyone under the age of 18 without verification of parental consent, We take 
          steps to remove that information from Our servers.
        </p>
        <h3 className="text-xl font-semibold mt-4">Links to Other Websites</h3>
        <p>
          Our Service may contain links to other websites that are not operated by Us. We strongly advise 
          You to review the Privacy Policy of every site You visit, as We assume no responsibility for the 
          content or practices of these third parties.
        </p>
        <h3 className="text-xl font-semibold mt-4">Changes to this Privacy Policy</h3>
        <p>
          We may update Our Privacy Policy from time to time. We will let You know via email and/or a 
          prominent notice on Our Service, prior to the change becoming effective and update the "Last 
          updated" date at the top of this Privacy Policy. If no objection occurs within the specified 
          period, the updated Privacy Policy will be deemed accepted.
        </p>
        <h3 className="text-xl font-semibold mt-4">Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, You can contact us by email: info@privee.world
        </p>
      </Section>
    </div>
  );
};

export default PrivacyPolicy;
