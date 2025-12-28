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
import { coordinators, coreCoordinators, dayCoordinators, departmentHeads } from "../constants";

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
        {/* Responsive Coordinators Grid */}
        <motion.div
          className="mb-12 sm:mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Mobile View: Director first, then others */}
          <div className="md:hidden">
            <motion.div
              className="flex flex-col items-center gap-6 sm:gap-8"
              variants={containerVariants}
            >
              {coordinators.map((coord, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-center cursor-pointer w-full"
                >
                  {/* 
                   * Coordinator Avatar
                   * 
                   * @badge Director gets gold border and "DIRECTOR" badge
                   * @hover Border color changes to cyan
                   */}
                  <div
                    className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full mx-auto mb-3 sm:mb-4 border-3 sm:border-4 flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:border-cyan-400 ${coord.isDirector ? "border-amber-300" : "border-gray-300"
                      }`}
                  >
                    <img
                      src={coord.image || avatarImg}
                      alt={coord.name}
                      className="w-full h-full object-cover"
                    />
                    {coord.isDirector && (
                      <span className="absolute bottom-1 sm:bottom-2 bg-amber-500 text-white font-pixel text-[8px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 z-10">
                        DIRECTOR
                      </span>
                    )}
                  </div>
                  <h3 className="font-pixel text-sm sm:text-base text-white">{coord.name}</h3>
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
          </div>

          {/* Desktop View: Director in center (3 cols with center positioning) */}
          <div className="hidden md:block">
            <motion.div
              className="grid grid-cols-3 gap-8 md:gap-12 items-start"
              variants={containerVariants}
            >
              {/* Left: First non-director coordinator */}
              <div className="col-span-1 pt-12">
                {coordinators
                  .filter(coord => !coord.isDirector)
                  .slice(0, 1)
                  .map((coord, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center cursor-pointer"
                    >
                      <div
                        className="w-48 h-48 rounded-full mx-auto mb-4 border-4 flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:border-cyan-400 border-gray-300"
                      >
                        <img
                          src={coord.image || avatarImg}
                          alt={coord.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-pixel text-lg text-white">{coord.name}</h3>
                      <p className="font-terminal text-sm text-gray-300">
                        {coord.role}
                      </p>
                      {coord.subtitle && (
                        <p className="font-terminal text-xs text-gray-400">
                          {coord.subtitle}
                        </p>
                      )}
                    </motion.div>
                  ))}
              </div>

              {/* Center: Director */}
              <div className="col-span-1">
                {coordinators
                  .filter(coord => coord.isDirector)
                  .map((coord, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center cursor-pointer"
                    >
                      <div
                        className="w-64 h-64 rounded-full mx-auto mb-4 border-4 border-amber-300 flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:border-cyan-400"
                      >
                        <img
                          src={coord.image || avatarImg}
                          alt={coord.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 bg-amber-500 text-white font-pixel text-xs px-3 py-1 z-10">
                          DIRECTOR
                        </span>
                      </div>
                      <h3 className="font-pixel text-lg text-white">{coord.name}</h3>
                      <p className="font-terminal text-sm text-gray-300">
                        {coord.role}
                      </p>
                      {coord.subtitle && (
                        <p className="font-terminal text-xs text-gray-400">
                          {coord.subtitle}
                        </p>
                      )}
                    </motion.div>
                  ))}
              </div>

              {/* Right: Remaining non-director coordinators */}
              <div className="col-span-1 pt-12">
                {coordinators
                  .filter(coord => !coord.isDirector)
                  .slice(1)
                  .map((coord, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center cursor-pointer"
                    >
                      <div
                        className="w-48 h-48 rounded-full mx-auto mb-4 border-4 flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:border-cyan-400 border-gray-300"
                      >
                        <img
                          src={coord.image || avatarImg}
                          alt={coord.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-pixel text-lg text-white">{coord.name}</h3>
                      <p className="font-terminal text-sm text-gray-300">
                        {coord.role}
                      </p>
                      {coord.subtitle && (
                        <p className="font-terminal text-xs text-gray-400">
                          {coord.subtitle}
                        </p>
                      )}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
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
            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {coreCoordinators.map((coord, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="text-center cursor-pointer"
              >
                <div className="w-[125px] h-[125px] sm:w-32 sm:h-32 md:w-52 md:h-52 lg:w-52 lg:h-52 rounded-full border-3 sm:border-4 border-gray-300 hover:border-cyan-400 transition-all overflow-hidden mx-auto mb-2 sm:mb-3">
                  <img
                    src={coord.image || avatarImg}
                    alt={coord.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-pixel text-xs sm:text-sm md:text-base text-white">{coord.name}</h4>
                <p className="font-terminal text-[10px] sm:text-xs text-gray-300">{coord.role}</p>
                {coord.phone && (
                  <p className="font-terminal text-[9px] sm:text-[10px] text-cyan-400 mt-1">{coord.phone}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Day Coordinators Section */}
        <motion.div
          className="mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="font-pixel text-lg sm:text-xl md:text-2xl text-white text-center mb-6 sm:mb-8">
            DAY COORDINATORS
          </h3>
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {dayCoordinators.map((coord, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="text-center cursor-pointer"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-3 sm:border-4 border-gray-300 hover:border-cyan-400 transition-all overflow-hidden mx-auto mb-2 sm:mb-3">
                  <img
                    src={coord.image || avatarImg}
                    alt={coord.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-pixel text-xs sm:text-sm text-white">{coord.name}</h4>
                <p className="font-terminal text-[10px] sm:text-xs text-gray-300">{coord.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Department Heads Section */}
        <motion.div
          className="mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-pixel text-lg sm:text-xl md:text-2xl text-white text-center mb-6 sm:mb-8">
            DEPARTMENT HEADS
          </h3>
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {departmentHeads.map((head, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="text-center cursor-pointer"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-3 sm:border-4 border-gray-300 hover:border-cyan-400 transition-all overflow-hidden mx-auto mb-2 sm:mb-3">
                  <img
                    src={head.image || avatarImg}
                    alt={head.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-pixel text-xs sm:text-sm text-white">{head.name}</h4>
                <p className="font-terminal text-[10px] sm:text-xs text-gray-300">{head.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
