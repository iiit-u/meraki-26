/**
 * @fileoverview Elite Events section with tabbed interface.
 * 
 * Features a tab-based UI where event titles appear as selectable tabs on the left
 * (desktop) or top (mobile), with event details displayed in a connected panel.
 * Uses Minecraft-style bevel borders and spring animations.
 * 
 * @see DOCS.md#minecraft-bevel-borders for border styling
 * @see DOCS.md#animation-system for spring physics
 * @component
 */

import React, { useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import eliteBg from "../assets/elite_minecraft_bg.webp";
import { events } from "../constants";
import { appleSlideUp, appleScaleIn, sectionTransition } from "../utils/motion";

/**
 * Elite Events tabbed section component.
 * 
 * @returns {JSX.Element} Events section with tab navigation and detail panel
 * 
 * @state activeTab - Currently selected event ID
 * @animation AnimatePresence - Handles enter/exit transitions when switching tabs
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
   * @contentOpacity Fade in/out curve at section boundaries
   * @contentY Slide up effect on enter
   * @contentScale Subtle scale for depth
   */
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
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
            className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-0 overflow-visible"
            variants={sectionTransition}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* 
             * Tab Navigation
             * 
             * Desktop: Vertical stack on left (w-1/3)
             * Mobile: Horizontal scroll on top
             * 
             * @layout
             * - flex-row on mobile with horizontal overflow
             * - flex-col on desktop (md:flex-col)
             * - snap-x for mobile touch scrolling
             */}
            <motion.div
              className="w-full md:w-1/3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible z-30 gap-2 md:gap-0 pb-2 md:pb-0 scrollbar-hide snap-x snap-mandatory"
              variants={appleSlideUp(0.1)}
            >
              {eliteEvents.map((event, index) => {
                const isActive = activeTab === event.id;
                return (
                  <motion.button
                    key={event.id}
                    onClick={() => setActiveTab(event.id)}
                    whileHover={!isActive ? { scale: 1.02, x: 5 } : {}}
                    whileTap={{ scale: 0.98 }}
                    style={{ zIndex: isActive ? 40 : 10 }}
                    className={`
                    relative group text-left transition-all duration-300
                    shrink-0 md:shrink w-[200px] sm:w-[240px] md:w-full snap-start
                    bg-[#474747] border-[3px] border-solid
                    ${isActive
                        /**
                         * Active Tab Border Style
                         * 
                         * Removes right border on desktop to "connect" with panel.
                         * Uses negative margin to overlap with panel border.
                         * 
                         * @css border-r-0 on desktop creates seamless connection
                         */
                        ? "border-t-[#888888] border-l-[#666666] border-r-[#888888] md:border-r-0 border-b-0 md:border-b-[#1a1a1a] " +
                        "md:w-[calc(100%+3px)] " +  // Extend width to overlap panel border
                        "mb-[-3px] md:mb-0"          // Overlap bottom tab
                        : "border-t-[#888888] border-r-[#1a1a1a] border-b-[#1a1a1a] border-l-[#666666] hover:bg-[#575757]"
                      }
                  `}
                  >
                    {/* Inner content with inverted bevel */}
                    <div
                      className={`
                    flex items-center gap-3 md:gap-4 p-3 md:p-4
                    bg-[#3a3a3a] border-[2px] border-solid w-full h-full
                    ${isActive
                          ? "border-t-[#2a2a2a] border-l-[#2a2a2a] border-r-[#555555] md:border-r-0 border-b-0 md:border-b-[#555555]"
                          : "border-t-[#2a2a2a] border-r-[#555555] border-b-[#555555] border-l-[#2a2a2a]"
                        }
                  `}
                    >
                      {/* Event thumbnail */}
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      {/* Event title */}
                      <span
                        className={`font-minecraft text-xs sm:text-sm md:text-base transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
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
             * Event Details Panel
             * 
             * Uses AnimatePresence for smooth enter/exit transitions
             * when switching between tabs.
             * 
             * @animation
             * - Enter: opacity 0→1, x: 20→0, scale: 0.98→1
             * - Exit: opacity 1→0, x: 0→-20, scale: 1→0.98
             * - Spring physics: stiffness=80, damping=20
             */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                className="relative z-20 w-full md:w-2/3
                bg-[#474747] border-[3px] border-solid border-t-[#888888] border-r-[#1a1a1a] border-b-[#1a1a1a] border-l-[#888888]"
              >
                <div className="bg-[#3a3a3a] border-[2px] border-solid border-t-[#2a2a2a] border-r-[#555555] border-b-[#555555] border-l-[#2a2a2a] p-4 sm:p-6 md:p-8 flex flex-col gap-4 md:gap-6 items-center w-full h-full">
                  {/* Event Image with hover zoom */}
                  <div className="w-full relative group rounded-lg aspect-video overflow-hidden">
                    <motion.img
                      src={activeEvent.image}
                      alt={activeEvent.title}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Description and CTA */}
                  <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="lg:w-2/3">
                      <p className="font-minecraft text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {activeEvent.description}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/event/${activeEvent.slug}`)}
                      className="self-start lg:self-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#D79928] to-[#C57135] border-2 border-white text-black font-minecraft text-xs sm:text-sm hover:from-[#E5A935] hover:to-[#D17E42] transition-all duration-300 rounded-sm cursor-pointer"
                    >
                      VIEW DETAILS →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Elite;
