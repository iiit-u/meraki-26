/**
 * @fileoverview Hero section component with parallax scroll and staggered animations.
 * 
 * Renders the landing section with background parallax effect, animated title sequence,
 * and navigation to subsequent sections. Also composes the main page layout by
 * rendering child sections (About, FlagshipEvent, Workshops, Sponsors, FAQ).
 * 
 * @see DOCS.md#animation-system for heroSequence timing
 * @see DOCS.md#scroll-linked-animations for parallax implementation
 * @component
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "../assets/hero.webp";
import About from "./About";
import Faq from "./Faq";
import FlagshipEvent from "./FlagshipEvent";
import ExpertTalk from "./ExpertTalk";
import Sponsors from "./Sponsors";

import ScrollProgressBar from "./ScrollProgressBar";
import { scrollToSection } from "../utils/scrollToSection";
import { heroSequence } from "../utils/motion";

import ScrollModelContainer from "./ScrollModel"

/**
 * Hero section with full-viewport landing and scroll-linked opacity.
 * 
 * @returns {JSX.Element} Hero section with child sections
 * 
 * @animation heroSequence - Coordinated entrance for background, title, subtitle, button, footer
 * @parallax Uses scroll progress to fade out hero content as user scrolls
 */
const Hero = () => {
  // Reference for scroll tracking
  const heroRef = useRef(null);

  /**
   * Scroll progress tracking for parallax effect.
   * 
   * @offset ["start start", "end start"]
   * - Tracking begins when hero top aligns with viewport top
   * - Tracking ends when hero bottom passes viewport top
   */
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /**
   * Parallax opacity transform.
   * 
   * @interpolation [0, 0.8] → [1, 0]
   * Hero content fades to 0% opacity by 80% scroll progress,
   * creating smooth transition to About section.
   */
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Hero Section - Full viewport height */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">

        {/* Background Layer - Static with entrance animation */}
        <motion.div className="absolute inset-0 z-0">
          <motion.div
            variants={heroSequence.background}
            initial="hidden"
            animate="show"
            className="w-full h-full"
          >
            {/* 
             * Background Image with Scale Animation
             * 
             * @transform scale(1.3) → scale(1) over 1.5s
             * @easing cubic-bezier(0.25, 0.1, 0.25, 1) - Apple-style curve
             * 
             * Creates cinematic zoom-out effect on page load.
             */}
            <motion.div
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="w-full h-full bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          </motion.div>

          {/* 
           * Gradient Overlay - Section Blending
           * 
           * Three-stop gradient creates vignette effect and
           * smooth transition to About section's background.
           * 
           * @gradient from-black/30 (top) → transparent (middle) → to-black/90 (bottom)
           */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
        </motion.div>

        {/* 
         * Hero Content Container
         * 
         * Flexbox centered layout with scroll-linked opacity.
         * Content fades out as user scrolls down.
         */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
          style={{ opacity: heroOpacity }}
        >
          {/* 
           * Title - Primary heading with blur entrance
           * @see heroSequence.title in DOCS.md
           * @delay 0.3s after page load
           */}
          <motion.h1
            variants={heroSequence.title}
            initial="hidden"
            animate="show"
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-minecraft text-white mb-6 md:mb-8 leading-tight tracking-wide"
          >
            Meraki
          </motion.h1>

          {/* 
           * Subtitle - Secondary text following title
           * @delay 0.5s after page load
           */}
          <motion.p
            variants={heroSequence.subtitle}
            initial="hidden"
            animate="show"
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-terminal text-accent-300 tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-12 md:mb-16 max-w-lg sm:max-w-2xl mx-auto"
          >
            Techfest 2026
          </motion.p>

          {/* 
           * CTA Button - Call to action
           * @delay 0.7s after page load
           * 
           * @interaction
           * - whileHover: scale(1.05), cyan border glow, subtle background
           * - whileTap: scale(0.98) for press feedback
           * - onClick: Triggers slow scroll (20s) to footer via Lenis
           */}
          <motion.div
            variants={heroSequence.button}
            initial="hidden"
            animate="show"
            className="mb-20 md:mb-24"
          >
            <motion.button
              onClick={() => {
                // Use Lenis for smooth slow scroll if available
                if (window.lenis) {
                  window.lenis.scrollTo('bottom', { duration: 20 });
                } else {
                  scrollToSection("about");
                }
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(34, 211, 238, 0.8)",
                backgroundColor: "rgba(34, 211, 238, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-6 sm:px-10 py-3 sm:py-4 border-2 border-cyan-400/40 bg-black/30 backdrop-blur-sm text-white text-sm sm:text-lg md:text-xl font-pixel tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              ▶ DIVE DEEPER
            </motion.button>
          </motion.div>

          {/* 
           * Footer Info - Event details
           * @delay 0.9s after page load
           * 
           * Positioned absolutely at bottom with space-between layout.
           */}
          <motion.div
            variants={heroSequence.footer}
            initial="hidden"
            animate="show"
            className="absolute bottom-8 sm:bottom-12 w-full flex justify-between items-center px-6 sm:px-12 md:px-20 text-white/80 font-pixel text-[10px] sm:text-sm md:text-lg tracking-wide"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent-400">&gt;</span>
              <span>Feb 5-7, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span>IIIT Una</span>
              <span className="text-accent-400 animate-pulse">_</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 
       * Child Sections
       * 
       * Each section handles its own scroll-linked animations.
       * Order determines scroll sequence: About → Workshops → FlagshipEvent → Sponsors → FAQ
       */}
      <About />
      <ExpertTalk />
      <FlagshipEvent />
      <Sponsors />
      <Faq />

      {/* Scroll progress indicator for desktop */}
      <ScrollModelContainer />
      <ScrollProgressBar />
    </>
  );
};

export default Hero;
