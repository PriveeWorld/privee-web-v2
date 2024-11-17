"use client";
import { motion } from "framer-motion";

const CustomSlideThree = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
  };

  return (
    <section className="custom-slide flex flex-col items-start justify-center w-full px-4 md:w-3/4 lg:w-1/2 gap-4">
      {/* Title */}
      <motion.h1
        className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] w-full text-left mt-6 md:mt-12 font-clash font-semibold bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-transparent leading-tight md:leading-none"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={0}
      >
        B2B Opportunities
      </motion.h1>

      {/* Paragraph 1 */}
      <motion.p
        className="font-roboto text-[14px] sm:text-[16px] md:text-[18px] font-light text-gray-600"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={1}
      >
        Reach your audience with cinematic storytelling. Privee helps brands
        extend their content’s lifecycle, engage continuously, and build
        connections that last.
      </motion.p>

      {/* Paragraph 2 */}
      <motion.p
        className="font-roboto text-[14px] sm:text-[16px] md:text-[18px] font-light text-gray-600"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={2}
      >
        If you’re interested in B2B partnerships and have unique content to
        share, Privee offers the perfect platform to build your own community
        and showcase your brand/business.
      </motion.p>

      {/* Paragraph 3 */}
      <motion.p
        className="font-roboto text-[14px] sm:text-[16px] md:text-[18px] font-light text-gray-600"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={3}
      >
        We also welcome businesses exploring innovative business models.
      </motion.p>

      {/* Paragraph 4 with Link */}
      <motion.p
        className="font-roboto text-[14px] sm:text-[16px] md:text-[18px] font-light text-gray-600"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={4}
      >
        For more information, please{" "}
        <a
          href="/contact"
          className="text-purple-300 underline hover:text-purple-200 transition-colors"
        >
          contact us
        </a>
        .
      </motion.p>
    </section>
  );
};

export default CustomSlideThree;
