/**
 * @fileoverview Team page displaying coordinators and committee members.
 * 
 * Shows faculty coordinators, core coordinators, and department heads
 * with profile cards and staggered animations.
 * 
 * @see DOCS.md#animation-system for grid animations
 * @page /team
 */

import React from "react";
import { motion } from "framer-motion";
import coordinatorsBg from "../assets/coordinators.webp";
import avatarImg from "../assets/avatar_pixel.webp";
import { coordinators, coreCoordinators, departmentHeads } from "../constants";

/**
 * Animation variants for staggered grid entrance.
 * @physics Spring-based with slight scale effect
 */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

/**
 * Team page component with coordinator sections.
 * 
 * @returns {JSX.Element} Team page with multiple sections
 * 
 * @sections
 * - Coordinators: Faculty leads with detailed cards
 * - Core Coordinators: Student core team (avatar grid)
 * - Department Heads: Team leads (avatar grid)
 * 
 * @layout
 * - Coordinators: 1→2→3 column responsive grid
 * - Others: Flexbox wrap with circular avatars
 */
const Team = () => {
  return (
    <div
      className="min-h-screen relative text-white pt-20 sm:pt-24 pb-12 sm:pb-16"
      style={{
        backgroundImage: `url(${coordinatorsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* 
         * Coordinators Section
         * 
         * Faculty and lead coordinators displayed prominently
         * with names, roles, and optional badges (HOD).
         */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400"></div>
            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              LEADERSHIP & GUIDANCE
            </h2>
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400"></div>
          </div>
          <h1
            className="font-minecraft text-3xl sm:text-5xl md:text-7xl text-white mb-3 sm:mb-4 tracking-wider"
            style={{
              textShadow:
                "3px 3px 0px #000, 2px 2px 0px rgba(6, 182, 212, 0.5)",
            }}
          >
            COORDINATORS
          </h1>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Faculty Coordinators Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {coordinators.map((coord, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="text-center cursor-pointer"
            >
              {/* 
               * Coordinator Avatar
               * 
               * @badge HOD coordinators get gold border and "HOD CSE" badge
               * @hover Border color changes to cyan
               */}
              <div
                className={`w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full mx-auto mb-3 sm:mb-4 border-3 sm:border-4 flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:border-cyan-400 ${coord.isHOD ? "border-amber-300" : "border-gray-300"
                  }`}
              >
                <img
                  src={avatarImg}
                  alt={coord.name}
                  className="w-full h-full object-cover"
                />
                {coord.isHOD && (
                  <span className="absolute bottom-1 sm:bottom-2 bg-red-600 text-white font-pixel text-[8px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 z-10">
                    HOD CSE
                  </span>
                )}
              </div>
              <h3 className="font-pixel text-sm sm:text-base md:text-lg text-white">{coord.name}</h3>
              <p className="font-terminal text-xs sm:text-sm text-gray-300">
                {coord.role}
              </p>
              {coord.subtitle && (
                <p className="font-terminal text-[10px] sm:text-xs text-gray-400">
                  {coord.subtitle}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* 
         * Convenors Section
         * 
         * Student organizing committee with simpler avatar displays.
         */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400"></div>
            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              THE EXECUTING TEAM
            </h2>
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400"></div>
          </div>
          <h1
            className="font-minecraft text-3xl sm:text-5xl md:text-7xl text-white mb-3 sm:mb-4 tracking-wider"
            style={{
              textShadow:
                "3px 3px 0px #000, 2px 2px 0px rgba(6, 182, 212, 0.5)",
            }}
          >
            CONVENORS
          </h1>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Core Coordinators Avatar Row */}
        <motion.div
          className="mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-pixel text-lg sm:text-xl md:text-2xl text-white text-center mb-6 sm:mb-8">
            CORE COORDINATORS
          </h3>
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {coreCoordinators.map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-3 sm:border-4 border-gray-300 hover:border-cyan-400 transition-all cursor-pointer overflow-hidden"
              >
                <img
                  src={avatarImg}
                  alt="Core Coordinator"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Department Heads Avatar Row */}
        <motion.div
          className="mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="font-pixel text-lg sm:text-xl md:text-2xl text-white text-center mb-6 sm:mb-8">
            DEPARTMENT HEADS
          </h3>
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {departmentHeads.map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-3 sm:border-4 border-gray-300 hover:border-cyan-400 transition-all cursor-pointer overflow-hidden"
              >
                <img
                  src={avatarImg}
                  alt="Department Head"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
