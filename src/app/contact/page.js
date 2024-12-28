"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Privacy Policy",
  "Contact Us",
];

const ContactForm = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFocus = (fieldName) => setActiveField(fieldName);
  const handleBlur = () => setActiveField(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen max-w-4xl overflow-y-auto pb-[50px]">
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

      <div className="mt-12 flex h-screen flex-col overflow-y-auto md:flex-row">
        <div className="flex flex-1 items-center justify-center bg-gray-100 p-0 px-6 md:p-8">
          <div className="max-w-md text-center md:text-left">
            <h1 className="mb-4 mt-12 font-clash text-[24px] font-semibold sm:text-[32px] md:text-[40px] lg:text-[48px]">
              Contact Us
            </h1>
            <p className="text-[14px] font-light text-gray-700 sm:text-[16px] md:text-[18px] lg:text-[20px]">
              {
                "Thank you for reaching out to Privee! We're here to assist you with any questions, concerns, or feedback you may have. Your input is valuable to us as we strive to provide the best experience for our users."
              }
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-6 md:p-8">
          <form
            className="w-full max-w-lg space-y-6 sm:space-y-8"
            onSubmit={handleSubmit}
          >
            <motion.div className="relative border-b-2">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className="w-full border-none bg-transparent py-2 text-sm placeholder-gray-400 outline-none focus:ring-0 sm:py-3 sm:text-base md:text-lg"
                value={formData.name}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] w-full ${
                  activeField === "name" ? "bg-blue-500" : "bg-gray-300"
                }`}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: activeField === "name" ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>

            <motion.div className="relative border-b-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className="w-full border-none bg-transparent py-2 text-sm placeholder-gray-400 outline-none focus:ring-0 sm:py-3 sm:text-base md:text-lg"
                value={formData.email}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] w-full ${
                  activeField === "email" ? "bg-blue-500" : "bg-gray-300"
                }`}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: activeField === "email" ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>

            <motion.div className="relative border-b-2">
              <textarea
                name="message"
                id="message"
                rows={4}
                placeholder="Your Message"
                className="w-full border-none bg-transparent py-2 text-sm placeholder-gray-400 outline-none focus:ring-0 sm:py-3 sm:text-base md:text-lg"
                value={formData.message}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] w-full ${
                  activeField === "message" ? "bg-blue-500" : "bg-gray-300"
                }`}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: activeField === "message" ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 sm:py-3 sm:text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && (
              <p className="text-sm text-green-500">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
