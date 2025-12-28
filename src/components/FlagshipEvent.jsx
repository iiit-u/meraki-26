/**
 * @fileoverview Flagship Event section with tabbed interface.
 * 
 * Features a tab-based UI where event titles appear as selectable tabs on the left
 * (desktop) or top (mobile), with event details displayed in a connected panel.
 * Uses clean Minecraft-inspired pixel borders with instant tab switching.
 * 
 * @see DOCS.md#minecraft-bevel-borders for border styling
 * @see DOCS.md#animation-system for spring physics
 * @component
 */

import React, { useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import flagshipBg from "../assets/elite_minecraft_bg.webp";
import { events } from "../constants";
import { appleSlideUp, sectionTransition } from "../utils/motion";

/**
 * Flagship Event tabbed section component.
 * 
 * @returns {JSX.Element} Events section with tab navigation and detail panel
 * 
 * @state activeTab - Currently selected event ID
 */
function FlagshipEvent() {
  // Filter to show only flagship events based on the isElite flag
  const flagshipEvents = useMemo(() => events.filter(event => event.isElite), []);

  const [activeTab, setActiveTab] = useState(flagshipEvents[0]?.id || null);
  const navigate = useNavigate();
  const activeEvent = flagshipEvents.find((event) => event.id === activeTab);
  const sectionRef = useRef(null);

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

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full min-h-[125vh] text-white overflow-hidden flex flex-col"
      style={{ paddingTop: "var(--navbar-height, 5rem)" }}
    >
      {/* Background Layer */}
      <motion.div className="absolute inset-0 z-0">
        <img
          src={flagshipBg}
          alt="Background"
          className="w-full h-full object-cover object-top"
        />
        {/* 
         * Gradient Blending - Section Transitions
         * 
         * Top gradient blends from About section (#080808)
         * Bottom gradient blends to Sponsors section (#080808)
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
        className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-8 pb-24"
      >
        {/* Section Header */}
        <motion.div
          className="w-full max-w-6xl mx-auto mb-3 md:mb-4 flex justify-start"
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
              FLAGSHIP EVENT
            </h2>
          </div>
        </motion.div>

        {/* Events UI Container */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="flex flex-col md:flex-row w-full max-w-6xl mx-auto overflow-visible min-h-[60vh]"
            variants={sectionTransition}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* 
             * Tab Navigation - Clean Minecraft Style
             * 
             * Desktop: Vertical stack on left (w-1/3)
             * Mobile: Horizontal scroll on top
             */}
            <motion.div
              className="w-full md:w-1/3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible z-30 gap-0 pb-0 scrollbar-hide snap-x snap-mandatory"
              variants={appleSlideUp(0.1)}
            >
              {flagshipEvents.map((event, index) => {
                const isActive = activeTab === event.id;
                const isFirst = index === 0;
                const isLast = index === flagshipEvents.length - 1;

                return (
                  <motion.button
                    key={event.id}
                    onClick={() => setActiveTab(event.id)}
                    whileHover={!isActive ? { x: 4 } : {}}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative group text-left transition-all duration-200
                      shrink-0 md:shrink w-[200px] sm:w-[240px] md:w-full snap-start
                      ${isActive
                        ? "bg-[#2a2a2a] z-20"
                        : "bg-[#1a1a1a] hover:bg-[#252525] z-10"
                      }
                      ${isFirst ? "rounded-t-lg md:rounded-tl-lg md:rounded-tr-none" : ""}
                      ${isLast && !isActive ? "rounded-b-lg md:rounded-bl-lg md:rounded-br-none" : ""}
                      border-2 border-[#3a3a3a]
                      ${isActive
                        ? "border-r-[#3a3a3a] md:border-r-[#2a2a2a] border-l-cyan-500/50"
                        : "border-l-transparent hover:border-l-cyan-500/30"
                      }
                      ${!isFirst ? "-mt-[2px] md:-mt-0" : ""}
                    `}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-l" />
                    )}

                    {/* Inner content */}
                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
                      {/* Event thumbnail */}
                      <div className={`
                        w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center shrink-0 overflow-hidden 
                        transition-all duration-300 group-hover:scale-105
                        ${isActive
                          ? "ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/20"
                          : "ring-1 ring-white/10"
                        }
                      `}>
                        <img
                          src={event.image}
                          alt={event.title}
                          className={`w-full h-full object-cover transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"}`}
                        />
                      </div>
                      {/* Event title */}
                      <span
                        className={`font-minecraft text-xs sm:text-sm md:text-base transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis ${isActive
                          ? "text-cyan-400"
                          : "text-gray-400 group-hover:text-gray-200"
                          }`}
                      >
                        {event.title}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* 
             * Event Details Panel - Instant Switching
             * 
             * No fade animation - content switches immediately for snappy feel
             */}
            <div
              className="relative z-20 w-full md:w-2/3 bg-[#2a2a2a] border-2 border-[#3a3a3a] rounded-lg md:rounded-l-none md:rounded-r-lg md:-ml-[2px] overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/event/${activeEvent.slug}`)}
            >
              {/* Full Enclosing Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Base Overlay - Always visible for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  {/* Title - Always visible */}
                  <h3 className="font-minecraft text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-2 drop-shadow-lg transform transition-all duration-300 group-hover:-translate-y-2">
                    {activeEvent.title}
                  </h3>

                  {/* Description - Appears on Hover */}
                  <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="font-minecraft text-gray-200 text-sm sm:text-base leading-relaxed drop-shadow-md border-l-2 border-cyan-500 pl-3 mb-4">
                      {activeEvent.description}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default FlagshipEvent;