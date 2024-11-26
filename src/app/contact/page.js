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
    <div className="w-screen max-w-4xl overflow-y-auto h-screen">
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

      <div className="flex mt-12 overflow-y-auto h-screen flex-col md:flex-row">
        <div className="flex-1 flex items-center px-6 justify-center bg-gray-100 p-0 md:p-8">
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-[24px] font-clash mt-12 sm:text-[32px] md:text-[40px] lg:text-[48px] font-semibold mb-4">
              Contact Us
            </h1>
            <p className="text-[14px] font-light sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-700">
              {
                "Thank you for reaching out to Privee! We're here to assist you with any questions, concerns, or feedback you may have. Your input is valuable to us as we strive to provide the best experience for our users."
              }
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <form
            className="space-y-6 sm:space-y-8 w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <motion.div className="relative border-b-2">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className="w-full py-2 sm:py-3 text-sm sm:text-base md:text-lg border-none outline-none bg-transparent placeholder-gray-400 focus:ring-0"
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
                className="w-full py-2 sm:py-3 text-sm sm:text-base md:text-lg border-none outline-none bg-transparent placeholder-gray-400 focus:ring-0"
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
                className="w-full py-2 sm:py-3 text-sm sm:text-base md:text-lg border-none outline-none bg-transparent placeholder-gray-400 focus:ring-0"
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
              className="w-full py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm">
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
