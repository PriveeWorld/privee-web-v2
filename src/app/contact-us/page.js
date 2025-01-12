"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Privacy Policy",
  "Contact Us",
  "Nagradna Igra",
];

const ContactUs = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Assuming "Contact Us" is index 4 in SECTION_HEADINGS
  const [section, setSection] = useState(4);

  const scrollToSection = (index) => {
    setSection(index);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Success message
  const [successMessage, setSuccessMessage] = useState("");

  // Check if form is valid
  const isFormValid = formData.name && formData.email && formData.message;

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare email fields
    const subject = `New Contact Form Submission from ${formData.name}`;
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const html = `
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `;

    try {
      // POST data to your /api/contact endpoint
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, html }),
      });

      if (!response.ok) {
        throw new Error("There was a problem sending the email.");
      }

      // Clear the form and set success message
      setFormData({ name: "", email: "", message: "" });
      setSuccessMessage("Thank you for contacting us! We will respond within 24 hours.");

    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage(""); // Clear any existing success message
      alert("Sorry, there was an issue sending your message.");
    }
  };

  return (
    <div className="relative mb-20 flex min-h-screen w-screen items-center justify-center overflow-auto">
      {/* Fullscreen Navigation */}
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          scrollToSection(index);
          setIsNavOpen(false);
        }}
      />

      {/* Top Navigation */}
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section={SECTION_HEADINGS[section]}
      />

      {/* Main Content */}
      <div className="relative mb-[100px] mt-[250px] flex min-h-screen w-full max-w-[1600px] flex-col items-start justify-center overflow-y-auto px-4 py-8 sm:px-8 sm:py-16 lg:mb-[0px] lg:mt-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <h1 className="mb-4 mt-12 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-semibold leading-tight tracking-tight text-transparent sm:text-[40px] md:text-[50px] lg:text-[60px]">
              Contact Us
            </h1>
            <p className="text-md mx-auto mb-8 max-w-3xl font-light text-gray-700 sm:mb-12 sm:text-base md:text-lg lg:text-xl">
              We value your feedback and inquiries. Please fill out the form
              below, and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Contact Form */}
        <motion.div
          className="mx-auto w-full sm:w-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1 block font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:border-[#CD1A70] focus:outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:border-[#CD1A70] focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-1 block font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={6}
                className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:border-[#CD1A70] focus:outline-none"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="rounded bg-gradient-to-r from-[#3A1772] to-[#CD1A70] py-2 px-4 font-semibold text-white transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 rounded border border-green-300 bg-green-100 p-4 text-green-700">
              {successMessage}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
