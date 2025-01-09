"use client";
import { motion } from "framer-motion";
import Link from "next/link";

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
    <section className="custom-slide flex w-full flex-col items-start justify-center gap-4 px-4 md:w-3/4 lg:w-1/2">
      {/* Title */}
      <motion.h1
        className="mt-10 w-full bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-left font-clash text-[32px] font-semibold leading-tight text-transparent sm:text-[40px] md:mt-12 md:text-[48px] md:leading-none lg:text-[60px]"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={0}
      >
        B2B Opportunities
      </motion.h1>

      {/* Paragraph 1 */}
      <motion.p
        className="font-roboto text-[16px] font-light text-gray-600 sm:text-[16px] md:text-[18px]"
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
        className="font-roboto text-[16px] font-light text-gray-600 sm:text-[16px] md:text-[18px]"
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
        className="font-roboto text-[16px] font-light text-gray-600 sm:text-[16px] md:text-[18px]"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={3}
      >
        We also welcome businesses exploring innovative business models.
      </motion.p>

      {/* Paragraph 4 with Link */}
      <motion.p
        className="font-roboto text-[16px] font-light text-gray-600 sm:text-[16px] md:text-[18px]"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={4}
      >
        For more information, please{" "}
        <Link
          href="/contact-us"
          className="text-purple-300 underline transition-colors hover:text-purple-200"
        >
          contact us
        </Link>
        .
      </motion.p>
    </section>
  );
};

export default CustomSlideThree;
