/**
 * @fileoverview Elite Events section with tabbed interface.
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
import eliteBg from "../assets/elite_minecraft_bg.webp";
import { events } from "../constants";
import { appleSlideUp, sectionTransition } from "../utils/motion";

/**
 * Elite Events tabbed section component.
 * 
 * @returns {JSX.Element} Events section with tab navigation and detail panel
 * 
 * @state activeTab - Currently selected event ID
 */
function Elite() {
  // Filter to show only elite (featured) events
  const eliteEvents = useMemo(() => events.filter(event => event.isElite), []);

  const [activeTab, setActiveTab] = useState(eliteEvents[0]?.id || null);
  const navigate = useNavigate();
  const activeEvent = eliteEvents.find((event) => event.id === activeTab);
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
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col"
      style={{ paddingTop: "var(--navbar-height, 5rem)" }}
    >
      {/* Background Layer */}
      <motion.div className="absolute inset-0 z-0">
        <img
          src={eliteBg}
          alt="Background"
          className="w-full h-full object-cover object-top"
        />
        {/* 
         * Gradient Blending - Section Transitions
         * 
         * Top gradient blends from About section (#080808)
         * Bottom gradient blends to Sponsors section (#0c0c0c)
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
            background: "linear-gradient(to top, #0c0c0c, transparent)",
          }}
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30 z-[0]" />
      </motion.div>

      {/* Content Container with scroll-linked transforms */}
      <motion.div
        style={{ y: contentY, scale: contentScale }}
        className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 py-8"
      >
        {/* Section Header */}
        <motion.div
          className="w-full max-w-6xl mx-auto mb-6 md:mb-8 flex justify-start"
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
              ELITE EVENTS
            </h2>
          </div>
        </motion.div>

        {/* Events UI Container */}
        <div className="flex-1 flex justify-center items-center w-full">
          <motion.div
            className="flex flex-col md:flex-row w-full max-w-6xl mx-auto overflow-visible"
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
              {eliteEvents.map((event, index) => {
                const isActive = activeTab === event.id;
                const isFirst = index === 0;
                const isLast = index === eliteEvents.length - 1;

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
                          className={`w-full h-full object-cover object-top transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"}`}
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
              className="relative z-20 w-full md:w-2/3 bg-[#2a2a2a] border-2 border-[#3a3a3a] rounded-lg md:rounded-l-none md:rounded-r-lg md:-ml-[2px]"
            >
              <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 md:gap-6 items-center w-full h-full">
                {/* Event Image with hover zoom */}
                <div className="w-full relative group rounded-lg aspect-video overflow-hidden ring-1 ring-white/10">
                  <img
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Title overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="font-minecraft text-white text-lg sm:text-xl md:text-2xl tracking-wide">
                      {activeEvent.title}
                    </h3>
                  </div>
                </div>

                {/* Description and CTA */}
                <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="lg:w-2/3">
                    <p className="font-minecraft text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {activeEvent.description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(215, 153, 40, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/event/${activeEvent.slug}`)}
                    className="self-start lg:self-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#D79928] to-[#C57135] border-2 border-[#E5A935] text-black font-minecraft text-xs sm:text-sm hover:from-[#E5A935] hover:to-[#D17E42] transition-all duration-300 rounded cursor-pointer shadow-lg shadow-orange-500/20"
                  >
                    VIEW DETAILS →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Elite;
