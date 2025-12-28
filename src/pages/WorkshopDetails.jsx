/**
 * @fileoverview Individual workshop details page.
 * @see DOCS.md#animation-system for scroll animations
 * @page /workshop/:workshopSlug
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useParams } from "react-router-dom";
import workshopDetailBg from "../assets/event_detail.webp";
import { workshopDetailsData, workshops } from "../constants";

/**
 * Workshop details page component.
 * @param workshopSlug - URL parameter matching workshop slug
 * @state showMore - Toggles between short and full description
 */
const WorkshopDetails = () => {
  const { workshopSlug } = useParams();
  const [showMore, setShowMore] = useState(false);

  // Workshop data lookup with fallback
  const workshopData = workshopDetailsData[workshopSlug] || {
    title: "Workshop Not Found",
    description: "Workshop details not available.",
    fullDescription: "Workshop details not available.",
    instructor: "TBA",
    duration: "TBA",
    prerequisites: [],
    learningOutcomes: [],
    venue: "TBA",
    registrationLink: "#",
  };

  const workshopInfo = workshops.find(w => w.slug === workshopSlug);
  const workshopImage = workshopInfo?.image;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

  return (
    <div ref={containerRef} className="min-h-screen relative text-white pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Background with filters */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `url(${workshopDetailBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(20%) brightness(0.90) contrast(1.05)",
      }} />
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10" style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}>
        {/* Header */}
        <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0 }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400"></div>
            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">WORKSHOP INFORMATION</h2>
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400"></div>
          </div>
          <h1 className="font-minecraft text-2xl sm:text-4xl md:text-6xl text-white mb-3 sm:mb-4 tracking-wider" style={{ textShadow: "3px 3px 0px #000, 2px 2px 0px rgba(6, 182, 212, 0.5)" }}>{workshopData.title}</h1>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Content Grid */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.2 }}>
          {/* Image */}
          <div className="border-3 sm:border-4 border-white bg-gray-800 order-1 overflow-hidden">
            {workshopImage ? <img src={workshopImage} alt={workshopData.title} className="w-full aspect-video object-cover" /> : <div className="aspect-video bg-gradient-to-br from-cyan-900 via-blue-800 to-indigo-900 flex items-center justify-center"><span className="text-5xl sm:text-6xl md:text-8xl">📚</span></div>}
          </div>

          {/* Info */}
          <div className="space-y-4 sm:space-y-6 order-2">
            <h1 className="font-minecraft text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">{workshopData.title}</h1>
            <div className="inline-block bg-cyan-600/20 border-2 border-cyan-500 px-4 py-2 mt-2"><span className="font-pixel text-cyan-400 text-sm sm:text-base tracking-wider flex items-center gap-2"><span className="animate-pulse">⚡</span> WORKSHOP</span></div>
            <div className="flex items-center gap-2 sm:gap-3"><span className="text-2xl sm:text-3xl md:text-4xl">⏱️</span><span className="font-pixel text-xl sm:text-2xl md:text-3xl text-cyan-400">{workshopData.duration}</span></div>
            <div className="flex items-center gap-2 sm:gap-3"><span className="text-2xl sm:text-3xl md:text-4xl">👨‍🏫</span><span className="font-pixel text-sm sm:text-base md:text-lg text-gray-300">{workshopData.instructor}</span></div>
            <motion.a href={workshopData.registrationLink || "#"} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-cyan-500 text-black font-pixel text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400 hover:from-cyan-500 hover:to-cyan-400 transition-all min-h-[48px] text-center">REGISTER NOW!</motion.a>
          </div>
        </motion.div>

        {/* Details Panel */}
        <motion.div className="bg-gray-800/80 border-2 border-gray-600 p-4 sm:p-6 md:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.4 }}>
          <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-6">DETAILS</h2>
          
          {/* Description */}
          <div className="mb-4 sm:mb-6">
            <h3 className="font-pixel text-sm sm:text-base text-cyan-400 mb-2 sm:mb-3">DESCRIPTION</h3>
            <AnimatePresence mode="wait"><motion.p key={showMore ? "full" : "short"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-terminal text-sm sm:text-base text-gray-300 leading-relaxed mb-2 sm:mb-3">{showMore ? workshopData.fullDescription : workshopData.description}</motion.p></AnimatePresence>
            <button onClick={() => setShowMore(!showMore)} className="font-terminal text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2 min-h-[44px]">{showMore ? "Show less ▲" : "Show more ▼"}</button>
          </div>

          {/* Grid Layout - Duration and Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 mb-6 sm:mb-8">
            <div className="border-l-3 sm:border-l-4 border-cyan-400 pl-3 sm:pl-4 py-1"><h4 className="font-pixel text-sm sm:text-base text-white mb-1 sm:mb-2">DURATION</h4><p className="font-terminal text-sm sm:text-base text-gray-400">{workshopData.duration}</p></div>
            <div className="border-l-3 sm:border-l-4 border-cyan-400 pl-3 sm:pl-4 py-1"><h4 className="font-pixel text-sm sm:text-base text-white mb-1 sm:mb-2">VENUE</h4><p className="font-terminal text-sm sm:text-base text-gray-400">{workshopData.venue}</p></div>
          </div>

          {/* Prerequisites */}
          {workshopData.prerequisites && workshopData.prerequisites.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="font-pixel text-sm sm:text-base text-cyan-400 mb-3 sm:mb-4">PREREQUISITES</h3>
              <ul className="space-y-2">
                {workshopData.prerequisites.map((prereq, index) => (
                  <li key={index} className="font-terminal text-sm sm:text-base text-gray-300 flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▶</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Learning Outcomes */}
          {workshopData.learningOutcomes && workshopData.learningOutcomes.length > 0 && (
            <div>
              <h3 className="font-pixel text-sm sm:text-base text-cyan-400 mb-3 sm:mb-4">LEARNING OUTCOMES</h3>
              <ul className="space-y-2">
                {workshopData.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="font-terminal text-sm sm:text-base text-gray-300 flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WorkshopDetails;
