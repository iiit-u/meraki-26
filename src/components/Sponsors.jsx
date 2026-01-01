/**
 * @fileoverview Sponsors section with poster-frame styled logo cards.
 * 
 * Displays sponsor logos in decorative wooden picture frames, styled to
 * appear as posters hanging on a Minecraft wall. Includes a draggable
 * character decoration and staggered entrance animations.
 * 
 * @see DOCS.md#minecraft-bevel-borders for frame styling
 * @see DOCS.md#animation-system for staggered animations
 * @component
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import wallBg from "../assets/sponsors_minecraft_bg.webp";
import charArt from "../assets/sponsors_character_art.webp";
import { appleSlideUp, appleScaleIn, sectionTransition } from "../utils/motion";

import iiituLogo from '../assets/sponsors/iiitu_logo.webp';
import interviewBuddyLogo from '../assets/sponsors/interview_buddy.webp';
import unstopLogo from '../assets/sponsors/unstop_logo.svg';
import aerostarLogo from '../assets/sponsors/aerostar.webp';
import devfolioLogo from '../assets/sponsors/devfolio_logo.webp';
import whosNextLogo from '../assets/sponsors/whosnext.webp';
import mioartaiLogo from '../assets/mioartai.jpg';
import dopamineStoreLogo from '../assets/dopamine_store.avif';
import ethindiaLogo from '../assets/ethindia.svg';

/**
 * Partner data array.
 * @constant
 * @type {Array<{name: string, firm: string, designation: string, logo: string, url?: string}>}
 */
const partners = [
  { name: "mioArtAI", firm: "mioArtAI", designation: "Theme Partner", logo: mioartaiLogo, url: "https://www.instagram.com/mioartai/" },
  { name: "Dopamine Store", firm: "Dopamine Store", designation: "Merchandise and Lifestyle Partner", logo: dopamineStoreLogo, url: "https://thedopaminestore.in" },
  { name: "ETHindia", firm: "ETHindia", designation: "Silver Sponsor", logo: ethindiaLogo, url: "https://www.instagram.com/ethindiaco/" },
  { name: "Devfolio", firm: "Devfolio", designation: "Platform Partner", logo: devfolioLogo, url: "https://devfolio.co" },
  { name: "Unstop", firm: "Unstop", designation: "Platform Partner", logo: unstopLogo, url: "https://unstop.com" },
  { name: "AEROSTAR", firm: "AEROSTAR", designation: "Technology and Innovation Partner", logo: aerostarLogo, url: "https://www.instagram.com/aerostar007/" },
  { name: "InterviewBuddy", firm: "InterviewBuddy", designation: "Silver Sponsor", logo: interviewBuddyLogo, url: "https://interviewbuddy.net" },
  { name: "Who's Next?", firm: "YOU?", designation: "JOIN US!", logo: whosNextLogo, url: "mailto:meraki@iiitu.ac.in" }
];

/**
 * Poster frame component styled as wooden picture frame.
 * 
 * @param {Object} props
 * @param {Object} props.partner - Partner data with name, firm, designation, logo, url
 * @param {number} props.index - Index for staggered animation delay
 * @returns {JSX.Element} Framed partner logo with details
 * 
 * @styling
 * - Wooden frame: Multi-tone brown gradient with bevel borders
 * - Canvas paper: Beige gradient for poster appearance
 * - Nail detail: Radial gradient metallic pin at top
 * - Shadow: Blurred offset shadow for wall depth
 * 
 * @animation
 * - Entry: appleScaleIn with index-based delay
 * - Hover: scale(1.05), y(-8px) with spring physics
 */
const PosterFrame = ({ partner, index }) => {
  const handleClick = () => {
    if (partner.url) {
      window.open(partner.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer group"
      variants={appleScaleIn(index * 0.08)}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }}
      style={{ perspective: "1000px" }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* 
       * Drop Shadow
       * 
       * Offset blurred shadow creates illusion of poster
       * lifted from wall surface.
       */}
      <div
        className="absolute -inset-2 bg-black/30 blur-md transform translate-y-2 translate-x-1"
        style={{ borderRadius: "4px" }}
      />

      {/* 
       * Outer Wooden Frame
       * 
       * @gradient Diagonal brown gradient (145°) simulates wood grain
       * @border Asymmetric colors for 3D bevel effect
       * @boxShadow Inset highlights/shadows + outer shadow
       */}
      <div
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52"
        style={{
          background: "linear-gradient(145deg, #8B6914 0%, #654321 50%, #3D2914 100%)",
          border: "6px solid",
          borderColor: "#A67C00 #3D2914 #2D1F0A #8B6914",  // top right bottom left
          boxShadow: "inset 3px 3px 0 #C4A76C, inset -3px -3px 0 #2D1F0A, 0 8px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Inner bevel - inverted colors for depth */}
        <div
          className="absolute inset-[6px] sm:inset-[8px]"
          style={{
            border: "4px solid",
            borderColor: "#2D1F0A #8B6914 #8B6914 #2D1F0A",
          }}
        />

        {/* 
         * Canvas/Paper Background
         * 
         * Beige gradient simulates aged paper or canvas material.
         * Inset shadow adds subtle depth within frame.
         */}
        <div
          className="absolute inset-[14px] sm:inset-[18px] flex items-center justify-center transition-all duration-300 group-hover:brightness-110"
          style={{
            background: "linear-gradient(180deg, #F5F5DC 0%, #E8E4C9 50%, #DDD8BE 100%)",
            boxShadow: "inset 0 0 15px rgba(0,0,0,0.1)",
          }}
        >
          {/* Sponsor Logo */}
          <div className="w-[85%] h-[85%] flex items-center justify-center p-2">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
        </div>

        {/* Hover highlight overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.15) 0%, transparent 50%, rgba(255,215,0,0.1) 100%)",
          }}
        />
      </div>

      {/* 
       * Nail/Pin Detail
       * 
       * Metallic circular pin at top center.
       * @radial-gradient Creates 3D spherical appearance
       */}
      <div
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #888 0%, #333 100%)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.3)",
        }}
      />

      {/* Partner Details Plaque */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center w-64 z-20">
        <p className="font-terminal text-lg sm:text-2xl text-gray-300 mt-1">
          {partner.firm}
        </p>
        <p className="font-terminal text-sm sm:text-lg text-cyan-400">
          {partner.designation}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * Sponsors section component.
 * 
 * @returns {JSX.Element} Sponsors section with poster grid
 * 
 * @layout CSS Grid: 2 columns on mobile, 3 columns on desktop
 */
export default function Sponsors() {
  const sectionRef = useRef(null);

  /**
   * Scroll progress for section animations.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col relative overflow-hidden"
      style={{ paddingTop: "var(--navbar-height, 5rem)" }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${wallBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 
       * Gradient Blending Layers
       * 
       * Top: Blend from Workshops section (#080808)
       * Bottom: Blend to FAQ section (#0a0a0a)
       */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute top-0 left-0 right-0 h-[30vh]"
          style={{
            background: "linear-gradient(to bottom, #0c0c0c, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[30vh]"
          style={{
            background: "linear-gradient(to top, #0a0a0a, transparent)",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[0]" />

      {/* Content with scroll-linked transforms */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 py-8"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Section Header with Decorative Character */}
        <div className="flex items-center gap-3 ml-2 sm:ml-4 md:ml-6 relative mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-3 md:gap-4"
            variants={appleSlideUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <span className="text-cyan-400 text-xl sm:text-2xl md:text-3xl">
              ▶
            </span>
            <h2 className="font-minecraft text-white text-xl sm:text-2xl md:text-4xl tracking-widest uppercase drop-shadow-lg">
              PARTNERS
            </h2>
          </motion.div>

          {/* 
           * Decorative Draggable Character
           * 
           * @drag Enabled with constraints
           * @animation Fade-in with rotation on view
           */}
          <motion.div
            className="absolute hidden sm:block -top-12 md:-top-16 right-4 sm:right-10 w-20 h-28 sm:w-28 sm:h-36 md:w-40 md:h-56 z-30 cursor-grab"
            initial={{ opacity: 0, y: -30, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            drag
            dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
            dragElastic={0.1}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}
          >
            <img
              src={charArt}
              alt="Minecraft Character"
              className="w-full h-full object-contain pointer-events-none"
              style={{ filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.5))" }}
            />
          </motion.div>
        </div>

        {/* 
         * Sponsor Poster Grid
         * 
         * @layout grid-cols-2 (mobile) → grid-cols-3 (lg)
         * @animation sectionTransition orchestrates staggered children
         */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            variants={sectionTransition}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 max-w-5xl mx-auto px-4"
          >
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-center mb-12" // Added margin bottom for text
                variants={appleScaleIn(idx * 0.08)}
              >
                <PosterFrame partner={partner} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
