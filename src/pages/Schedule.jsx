/**
 * @fileoverview Event schedule page with day-based tabs.
 * 
 * Displays event schedule organized by day with interactive tabs.
 * Features a "Coming Soon" skeleton UI when schedule is not yet available.
 * 
 * @see DOCS.md#animation-system for tab transitions
 * @page /schedule
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import dashboardBg from "../assets/dashboard.webp";
import avatarImg from "../assets/avatar_pixel.webp";
import minecraftSignComingSoon from "../assets/minecraft_sign_coming_soon.webp";
import { scheduleData, showSchedule } from "../constants";

/**
 * Schedule page component with day tabs.
 * 
 * @returns {JSX.Element} Schedule page with events or skeleton
 * 
 * @state activeDay - Currently selected day (1, 2, or 3)
 * 
 * @conditional
 * - showSchedule=false: Displays wireframe skeleton with "Coming Soon"
 * - showSchedule=true: Displays full interactive schedule
 */
const Schedule = () => {
  const [activeDay, setActiveDay] = useState(1);

  /**
   * Animation variants for event list items.
   * @physics Spring-based slide-in from left
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Scroll-based animations
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

  /**
   * Skeleton block for loading/placeholder UI.
   * @param {Object} props
   * @param {string} props.className - Additional Tailwind classes
   */
  const SkeletonBlock = ({ className }) => (
    <div className={`bg-gray-700/50 animate-pulse ${className}`} />
  );

  /**
   * Skeleton card mimicking event list item structure.
   * Used in "Coming Soon" skeleton UI.
   */
  const SkeletonCard = () => (
    <div className="bg-gray-800/50 border-2 border-gray-700/50 p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
      <SkeletonBlock className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0" />
      <SkeletonBlock className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
      </div>
      <SkeletonBlock className="h-6 w-16 shrink-0" />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative text-white pt-20 sm:pt-24 pb-12 sm:pb-16"
      style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Page Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400"></div>
            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              EVENT TIMELINE
            </h2>
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400"></div>
          </div>
          <h1
            className="font-minecraft text-3xl sm:text-5xl md:text-7xl text-white mb-3 sm:mb-4 tracking-wider"
            style={{
              textShadow: "3px 3px 0px #000",
            }}
          >
            SCHEDULE
          </h1>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* 
         * Conditional Rendering
         * 
         * showSchedule=false: Skeleton wireframe with "Coming Soon" badge
         * showSchedule=true: Full schedule with day tabs and event list
         */}
        {!showSchedule ? (
          /* Coming Soon Skeleton UI */
          <div className="relative min-h-[50vh]">
            {/* Floating "Coming Soon" Badge */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
              <div className="relative w-[400px] sm:w-[500px] md:w-[600px] aspect-[4/3] flex items-center justify-center transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={minecraftSignComingSoon} alt="Coming Soon" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl opacity-100" />
              </div>
            </div>

            {/* Skeleton Background Content */}
            <motion.div
              className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8 opacity-30 pointer-events-none select-none filter blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {/* Skeleton Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1 space-y-4">
                <div className="bg-gray-800/50 border-2 border-gray-700/50 p-4 sm:p-6">
                  <div className="flex lg:flex-col items-center gap-4 lg:gap-0">
                    <SkeletonBlock className="w-20 h-20 sm:w-24 sm:h-24 lg:w-full lg:aspect-square shrink-0" />
                    <div className="flex-1 lg:w-full lg:mt-4 space-y-2">
                      <SkeletonBlock className="h-20 w-full" />
                      <SkeletonBlock className="h-4 w-1/2 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skeleton Schedule */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {[1, 2, 3].map(i => (
                    <SkeletonBlock key={i} className="h-10 sm:h-12 w-24 sm:w-32" />
                  ))}
                </div>
                <SkeletonBlock className="h-8 w-40 mb-4 sm:mb-6" />
                <div className="space-y-2 sm:space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        ) : (
          /* Full Schedule Content */
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Server Info Sidebar */}
            <motion.div
              className="lg:col-span-1 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm border-2 sm:border-4 border-gray-700 p-4 sm:p-6 font-terminal">
                <div className="border-b-2 border-gray-700 pb-3 mb-4 flex justify-between items-center">
                  <span className="text-cyan-400 text-xs sm:text-sm tracking-widest">[ SERVER INFO ]</span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-500 group-hover:text-gray-400 transition-colors">HOST</span>
                    <span className="text-white">IIIT UNA</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-500 group-hover:text-gray-400 transition-colors">REALM</span>
                    <span className="text-cyan-400">MERAKI</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-500 group-hover:text-gray-400 transition-colors">REGION</span>
                    <span className="text-white">INDIA_HP</span>
                  </div>

                  <div className="border-t border-gray-700/50 my-2"></div>

                  <div className="flex justify-between items-center bg-gray-900/50 p-2 sm:p-3 rounded border border-gray-700/50">
                    <span className="text-gray-400">STATUS</span>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-400 font-bold tracking-wider">ONLINE</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-900/50 p-2 sm:p-3 rounded border border-gray-700/50">
                    <span className="text-gray-400">PING</span>
                    <span className="text-emerald-400 font-bold tracking-wider">12ms</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-gray-700 text-[10px] sm:text-xs text-center text-gray-500">
                  // READY TO CONNECT...
                </div>
              </div>
            </motion.div>

            {/* Schedule Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* 
               * Day Selector Tabs
               * 
               * Horizontal scrollable on mobile.
               * Uses layoutId for animated underline.
               */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
              >
                {[1, 2, 3].map((day) => (
                  <motion.button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`font-pixel px-5 sm:px-6 md:px-8 py-3 sm:py-4 text-xs sm:text-sm border-2 sm:border-4 transition-all relative whitespace-nowrap snap-start shrink-0 min-w-[100px] sm:min-w-[120px] ${activeDay === day
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-gray-900/80 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white active:bg-gray-800"
                      }`}
                  >
                    <span className="relative z-10">Day {day}</span>
                    {activeDay === day && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400"
                        layoutId="activeDay"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Active Day Label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 sm:mb-6"
                >
                  <div className="bg-cyan-400 text-black font-pixel py-2 sm:py-3 px-4 sm:px-6 inline-block border-2 sm:border-4 border-cyan-600 shadow-lg text-xs sm:text-sm">
                    &gt; DAY {activeDay} SCHEDULE
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Event List with staggered entrance */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`schedule-${activeDay}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-2 sm:space-y-3"
                >
                  {scheduleData[activeDay]?.map((item, index) => (
                    <Link
                      key={index}
                      to={`/event/${item.slug}`}
                      className="block"
                    >
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        className="bg-gray-800/90 backdrop-blur-sm border-2 border-gray-700 hover:border-cyan-400 transition-all p-3 sm:p-4 flex items-center gap-3 sm:gap-4 group cursor-pointer"
                      >
                        {/* Event Thumbnail */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-700 overflow-hidden border-2 border-gray-600 shrink-0 group-hover:border-cyan-400 transition-colors">
                          <img
                            src={item.image}
                            alt={item.event}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Icon Badge */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400 flex items-center justify-center text-lg sm:text-xl border-2 border-cyan-600 shrink-0 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>

                        {/* Event Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-pixel text-xs sm:text-sm md:text-base text-white mb-0.5 sm:mb-1 truncate group-hover:text-cyan-400 transition-colors">
                            {item.event}
                          </p>
                          <p className="font-terminal text-[10px] sm:text-xs text-gray-400">
                            Event ID: {item.eventId}
                          </p>
                        </div>

                        {/* Time Badge */}
                        <div className="font-terminal text-[10px] sm:text-xs md:text-sm text-cyan-400 bg-gray-900 px-2 sm:px-3 md:px-4 py-1 sm:py-2 border border-gray-700 shrink-0">
                          {item.time}
                        </div>

                        <div className="text-gray-500 group-hover:text-cyan-400 transition-colors hidden sm:block">
                          →
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Schedule;
