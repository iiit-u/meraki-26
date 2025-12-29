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
            background: "linear-gradient(to bottom, var(--bg-elite), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[30vh] z-[1]"
          style={{
            background: "linear-gradient(to top, var(--bg-elite), transparent)",
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
            className="flex flex-col-reverse md:flex-row w-full max-w-6xl mx-auto overflow-visible min-h-[60vh]"
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
              className="w-full md:w-1/3 grid grid-cols-2 md:flex md:flex-col gap-0 z-30"
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
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative group text-left transition-all duration-200 touch-manipulation
                      w-full min-h-[56px] md:min-h-0
                      ${isActive
                        ? "bg-dark-200 z-20"
                        : "bg-dark-100 hover:bg-dark-200 z-10"
                      }
                      ${isFirst ? "rounded-bl-lg md:rounded-tl-lg md:rounded-bl-none" : ""}
                      ${index === 1 ? "rounded-br-lg md:rounded-none" : ""}
                      ${isLast && !isActive ? "md:rounded-bl-lg" : ""}
                      border-2 border-dark-300
                      ${isActive
                        ? "md:border-r-dark-200 border-t-cyan-500/50 md:border-t-dark-300 md:border-l-cyan-500/50"
                        : "border-t-transparent md:border-l-transparent hover:border-t-cyan-500/30 md:hover:border-l-cyan-500/30"
                      }
                      ${index % 2 === 1 ? "-ml-[2px]" : ""}
                      ${index >= 2 ? "-mt-[2px]" : ""}
                      ${index >= 2 ? "md:-mt-[2px]" : "md:-mt-0"}
                      md:-ml-0
                    `}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <>
                        <div className="absolute left-0 top-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 md:hidden" />
                        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-l" />
                      </>
                    )}

                    {/* Inner content */}
                    <div className="flex items-center gap-2 xs:gap-3 md:gap-4 p-2.5 xs:p-3 md:p-4">
                      {/* Event thumbnail */}
                      <div className={`
                        w-9 h-9 xs:w-10 xs:h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center shrink-0 overflow-hidden 
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
                        className={`font-minecraft text-[10px] xs:text-xs sm:text-sm md:text-base transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis ${isActive
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
              className="relative z-20 w-full md:w-2/3 bg-dark-200 border-2 border-dark-300 rounded-t-lg rounded-b-none md:rounded-l-none md:rounded-r-lg md:rounded-tl-lg mb-0 md:mt-0 md:-ml-[2px] overflow-hidden group cursor-pointer min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[450px]"
              onClick={() => navigate(`/event/${activeEvent.slug}`)}
            >
              {/* Full Enclosing Image */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-dark-100">
                <img
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Base Overlay - Always visible for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 md:via-black/40 md:from-black/90" />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 xs:p-5 sm:p-6 md:p-8">
                  {/* Title - Always visible */}
                  <h3 className="font-minecraft text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide drop-shadow-lg transform transition-all duration-300 md:group-hover:-translate-y-2">
                    {activeEvent.title}
                  </h3>

                  {/* Description - Hidden on mobile, appears on hover on desktop */}
                  <div className="hidden md:block overflow-hidden transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
                    <p className="font-minecraft text-gray-200 text-xs xs:text-sm sm:text-base leading-relaxed drop-shadow-md border-l-2 border-cyan-500 pl-2 xs:pl-3 mt-2">
                      {activeEvent.description}
                    </p>
                  </div>

                  {/* Tap to view hint - Mobile only */}
                  <div className="md:hidden flex items-center gap-2 text-cyan-400 text-xs xs:text-sm font-minecraft mt-3">
                    <span>Tap to view details</span>
                    <span className="animate-pulse">→</span>
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