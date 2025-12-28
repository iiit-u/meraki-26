/**
 * @fileoverview Contact page with Minecraft-styled form and EmailJS integration.
 * 
 * Features a contact form with react-hook-form validation, EmailJS for email
 * sending, and localStorage backup. Includes an embedded Google Maps iframe.
 * 
 * @see DOCS.md#animation-system for slide animations
 * @component
 */

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { externalLinks } from "../constants";
import { slideIn, staggerContainer } from "../utils/motion";

import pageBackground from "../assets/faq_section_bg.webp";
import avatarPixel from "../assets/hero.webp";

/**
 * Contact page component with form and location info.
 * 
 * @returns {JSX.Element} Contact page with form and sidebar
 * 
 * @form Fields: name, email, subject, message
 * @validation Uses react-hook-form with onTouched mode
 * @submission Sends via EmailJS and stores in localStorage
 * 
 * @layout
 * - Desktop: Two-column (form left, sidebar right)
 * - Mobile: Stacked vertically
 */
export default function ContactMinecraft() {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  /**
   * React Hook Form configuration.
   * 
   * @mode "onTouched" - Validates on first blur, then on every change
   * @register Provides input props for validation
   * @handleSubmit Triggers onSubmit with validated data
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  // Success state for UI feedback
  const [isSent, setIsSent] = useState(false);

  /**
   * EmailJS credentials from environment variables.
   * @see https://www.emailjs.com/docs/
   */
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  /**
   * Form submission handler.
   * 
   * @param {Object} data - Validated form data
   * @param {string} data.name - User's name
   * @param {string} data.email - User's email
   * @param {string} data.subject - Message subject
   * @param {string} data.message - Message body
   * 
   * @process
   * 1. Validate all fields present
   * 2. Set success UI state
   * 3. Send via EmailJS (if credentials available)
   * 4. Store in localStorage as backup
   * 5. Reset form after delay
   */
  const onSubmit = async (data) => {
    if (!data.name || !data.email || !data.subject || !data.message) return;

    setIsSent(true);
    try {
      // EmailJS integration
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS: missing env vars. Skipping sendForm.");
      } else {
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          formRef.current,
          PUBLIC_KEY
        );
      }

      // LocalStorage backup
      const existing = JSON.parse(localStorage.getItem("contacts") || "[]");
      existing.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem("contacts", JSON.stringify(existing));

      // Simulated processing delay for UX
      await new Promise((r) => setTimeout(r, 700));
      reset();
    } catch (e) {
      console.error(e);
      alert("Failed to send — check console.");
    } finally {
      // Reset success state after feedback shown
      setTimeout(() => setIsSent(false), 1100);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden text-white pb-8 sm:pb-0"
    >
      {/* 
       * Fixed Background Layer
       * 
       * Uses Minecraft-themed background with subtle filters
       * for visual consistency with other pages.
       * 
       * @filter grayscale(20%) - Slight desaturation
       * @filter brightness(0.90) - Darker for text contrast
       * @filter contrast(1.05) - Enhanced definition
       */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-30"
        style={{
          backgroundImage: `url(${pageBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "grayscale(20%) brightness(0.90) contrast(1.05)",
        }}
      />

      {/* Radial gradient vignette overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-28 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Content Container with stagger animation */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-40 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto flex flex-col"
      >
        {/* Page Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative arrows */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400"></div>
            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              GET IN TOUCH
            </h2>
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400"></div>
          </div>

          {/* Main title with text shadow */}
          <h1
            className="font-minecraft text-3xl sm:text-5xl md:text-7xl text-white mb-3 sm:mb-4 tracking-wider"
            style={{
              textShadow:
                "3px 3px 0px #000, 2px 2px 0px rgba(6, 182, 212, 0.5)",
            }}
          >
            CONTACT US
          </h1>

          {/* Decorative divider */}
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Two-column layout */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          {/* 
           * Form Card
           * 
           * Slides in from left with tween animation.
           * Minecraft-styled with layered borders.
           */}
          <motion.div
            variants={slideIn("left", "tween", 0.2, 0.6)}
            className="w-full lg:flex-1 rounded"
            style={{ boxShadow: "0 12px 28px rgba(0,0,0,0.28)" }}
          >
            <div
              className="bg-black/80 backdrop-blur-sm border-4 border-gray-600 rounded p-2"
              style={{
                boxShadow:
                  "0 0 0 2px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)",
              }}
            >
              <div className="bg-black/60 p-5 md:p-6 rounded border border-gray-700">
                <h2 className="text-[#e6e6e6] font-minecraft text-lg mb-4">
                  Write to Admin
                </h2>

                {/* Contact Form */}
                <form
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-3"
                  noValidate
                >
                  {/* Hidden timestamp for email template */}
                  <input
                    type="hidden"
                    name="time"
                    value={new Date().toLocaleString()}
                  />

                  {/* Name and Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {/* Name Field */}
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-minecraft text-[#ccc] mb-1">
                        Username
                      </label>
                      <input
                        {...register("name", {
                          required: "Name is required",
                          minLength: { value: 2, message: "Too short" },
                        })}
                        placeholder="Steve"
                        className="w-full p-2 sm:p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-gray-600 rounded text-white outline-none text-sm transition-all duration-300 hover:border-cyan-500/50 focus:border-cyan-400 focus:bg-[rgba(0,0,0,0.8)] min-h-[44px]"
                        name="name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-[11px] mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-minecraft text-[#ccc] mb-1">
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email",
                          },
                        })}
                        placeholder="steve@minecraft.net"
                        className="w-full p-2 sm:p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-gray-600 rounded text-white outline-none text-sm transition-all duration-300 hover:border-cyan-500/50 focus:border-cyan-400 focus:bg-[rgba(0,0,0,0.8)] min-h-[44px]"
                        name="email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-[11px] mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-minecraft text-[#ccc] mb-1">
                      Subject
                    </label>
                    <input
                      {...register("subject", {
                        required: "Subject is required",
                        minLength: { value: 3, message: "Too short" },
                      })}
                      placeholder="Collab Request"
                      className="w-full p-2 sm:p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-gray-600 rounded text-white outline-none text-sm transition-all duration-300 hover:border-cyan-500/50 focus:border-cyan-400 focus:bg-[rgba(0,0,0,0.8)] min-h-[44px]"
                      name="subject"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-[11px] mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-minecraft text-[#ccc] mb-1">
                      Message
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 8, message: "Too short" },
                      })}
                      rows={4}
                      placeholder="Type your message here..."
                      className="w-full p-2 sm:p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-gray-600 rounded text-white outline-none text-sm transition-all duration-300 hover:border-cyan-500/50 focus:border-cyan-400 focus:bg-[rgba(0,0,0,0.8)] resize-none"
                      name="message"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-[11px] mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <p className="text-[rgba(255,255,255,0.6)] text-[9px] sm:text-[10px] font-minecraft w-full sm:max-w-[55%] text-center sm:text-left hidden sm:block">
                      *All fields required
                    </p>
                    <div className="w-full sm:w-auto">
                      <button
                        type="submit"
                        disabled={isSubmitting || isSent}
                        className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded font-minecraft text-xs sm:text-sm transition-all duration-300 min-h-[48px] ${isSent
                          ? "bg-green-600"
                          : "bg-gradient-to-b from-gray-500 to-gray-700 hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-800 border-2 border-gray-800 hover:border-cyan-500"
                          } text-white disabled:opacity-70 disabled:cursor-not-allowed`}
                      >
                        {isSent ? "✓ Sent!" : "▶ Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* 
           * Sidebar
           * 
           * Contains Google Maps embed and contact info.
           * Slides in from right.
           */}
          <motion.aside
            variants={slideIn("right", "tween", 0.08, 1)}
            className="w-full lg:w-80 flex flex-col gap-4"
          >
            {/* Map Card */}
            <div
              className="bg-black/40 backdrop-blur-sm border-4 border-gray-600 p-2 rounded"
              style={{
                boxShadow:
                  "0 0 0 2px rgba(0,0,0,0.6), 0 8px 18px rgba(0,0,0,0.45)",
              }}
            >
              <div className="bg-black/30 p-3 rounded border border-gray-700">
                <p className="text-xs font-minecraft text-[rgba(255,255,255,0.85)] mb-1">
                  VISIT: IIIT UNA
                </p>

                {/* Google Maps embed */}
                <div className="w-full aspect-[4/3] overflow-hidden rounded">
                  <iframe
                    title="IIIT Una Map"
                    src="https://www.google.com/maps?q=IIIT%20Una%20Saloh%20Himachal%20Pradesh&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ minHeight: 140 }}
                  />
                </div>

                <div className="mt-1 text-xs font-minecraft text-[rgba(255,255,255,0.85)]">
                  <a
                    href={externalLinks.googleMapsLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div
              className="bg-black/40 backdrop-blur-sm border-4 border-gray-600 p-2 rounded"
              style={{
                boxShadow:
                  "0 0 0 2px rgba(0,0,0,0.6), 0 8px 18px rgba(0,0,0,0.45)",
              }}
            >
              <div className="bg-black/30 p-4 rounded border border-gray-700">
                <ul className="text-xs font-minecraft text-gray-300 space-y-2">
                  <li className="flex items-start gap-2 p-2 rounded bg-[rgba(0,0,0,0.2)]">
                    <span className="text-green-400">📍</span>
                    <span>IIIT Una, Saloh, Una, H.P. 177209</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 rounded bg-[rgba(0,0,0,0.2)]">
                    <span className="text-purple-400">✉️</span>
                    <span>meraki@iiitu.ac.in</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      {/* Font override for Minecraft styling */}
      <style>{`
  .font-minecraft {
  font-family: 'Press Start 2P', 'VT323', monospace;
  letter-spacing: 0.02em;
}
`}</style>
    </section>
  );
}
