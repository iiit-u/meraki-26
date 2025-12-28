/**
 * @fileoverview Workshops section with animated card grid.
 * 
 * Displays workshops in a responsive card grid with Minecraft-themed styling.
 * Cards feature smooth entrance animations, hover effects, and navigation to
 * workshop detail pages.
 * 
 * @see DOCS.md#animation-system for motion variants
 * @see DOCS.md#responsive-breakpoints for layout
 * @component
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import workshopsBg from "../assets/elite_minecraft_bg.webp";
import { workshops } from "../constants";
import { appleSlideUp, sectionTransition } from "../utils/motion";

/**
 * Workshops section component with card grid layout.
 * 
 * @returns {JSX.Element} Workshops section with animated cards
 * 
 * @animation
 * - Scroll-linked entrance from bottom
 * - Staggered card animations on view
 * - Smooth hover state transitions
 */
function Workshops() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  /**
   * Scroll-based animation tracking.
   * 
   * @offset ["start end", "end start"]
   * Animation begins when section enters viewport from bottom,
   * ends when section exits viewport from top.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /**
   * Scroll-linked transforms for content animations.
   * 
   * @contentY Slide up effect on enter
   * @contentScale Subtle scale for depth
   */
  const contentY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

  /**
   * Workshop card component with hover animations.
   * 
   * @param {Object} workshop - Workshop data object
   * @param {number} index - Card index for stagger timing
   * @returns {JSX.Element} Animated workshop card
   */
  const WorkshopCard = ({ workshop, index }) => {
    return (
      <motion.div
        variants={appleSlideUp(index * 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="group relative cursor-pointer h-full"
        onClick={() => navigate(`/workshop/${workshop.slug}`)}
      >
        {/* Card Container */}
        <div className="relative w-full h-full bg-[#1a1a1a] border-2 border-[#3a3a3a] rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/10 flex flex-col">
          
          {/* Image Section - Smaller, more proportional */}
          <div className="relative w-full h-28 sm:h-32 md:h-36 overflow-hidden bg-[#0a0a0a] flex-shrink-0">
            <img
              src={workshop.image}
              alt={workshop.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Content Section - Optimized spacing */}
          <div className="p-3 sm:p-4 md:p-4 flex flex-col gap-3 flex-grow">
            
            {/* Title */}
            <h3 className="font-minecraft text-white text-xs sm:text-sm md:text-base tracking-wider uppercase line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
              {workshop.title}
            </h3>

            {/* Description - Limited to sensible length */}
            <p className="font-minecraft text-gray-400 text-[10px] sm:text-xs md:text-xs leading-snug flex-grow">
              {workshop.description}
            </p>

            {/* Learn More Button - Sticks to bottom */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/workshop/${workshop.slug}`);
              }}
              className="w-full px-3 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-minecraft text-xs uppercase tracking-wider rounded transition-all duration-300 shadow-lg shadow-cyan-500/20 flex-shrink-0"
            >
              Learn More →
            </motion.button>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-cyan-500/5 pointer-events-none transition-all duration-500" />
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="workshops"
      ref={sectionRef}
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col"
      style={{ paddingTop: "var(--navbar-height, 5rem)" }}
    >
      {/* Background Layer */}
      <motion.div className="absolute inset-0 z-0">
        <img
          src={workshopsBg}
          alt="Background"
          className="w-full h-full object-cover object-top"
        />
        {/* 
         * Gradient Blending - Section Transitions
         * 
         * Top gradient blends from the previous About section (#080808)
         * Bottom gradient blends to the next FlagshipEvent section (#080808)
         * 
         * @see DOCS.md#gradient-blending
         */}
        <div
          className="absolute top-0 left-0 right-0 h-[30vh] z-[1]"
          style={{
            background: "linear-gradient(to bottom, #080808, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[30vh] z-[1]"
          style={{
            background: "linear-gradient(to top, #080808, transparent)",
          }}
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30 z-[0]" />
      </motion.div>

      {/* Content Container with scroll-linked transforms */}
      <motion.div
        style={{ y: contentY, scale: contentScale }}
        className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 py-8 justify-center"
      >
        {/* Section Header */}
        <motion.div
          className="w-full max-w-7xl mx-auto mb-8 md:mb-12 flex justify-start"
          variants={appleSlideUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-cyan-400 text-xl sm:text-2xl md:text-3xl">
              ▶
            </span>
            <h2 className="font-minecraft text-white text-xl sm:text-2xl md:text-4xl tracking-widest uppercase">
              WORKSHOPS
            </h2>
          </div>
        </motion.div>

        {/* Workshops Grid Container */}
        <div className="flex justify-center items-center w-full">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl mx-auto gap-4 md:gap-6 auto-rows-fr"
            variants={sectionTransition}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            {workshops.map((workshop, index) => (
              <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative grid pattern - optional subtle background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </section>
  );
}

export default Workshops;
