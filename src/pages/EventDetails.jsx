/**
 * @fileoverview Individual event details page.
 * @see DOCS.md#animation-system for scroll animations
 * @page /event/:eventId
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useParams } from "react-router-dom";
import eventDetailBg from "../assets/event_detail.webp";
import minecraftSignComingSoon from "../assets/minecraft_sign_coming_soon.webp";
import { eventDetailsData, events } from "../constants";

/**
 * Event details page component.
 * @params eventId - URL parameter matching event slug
 * @state showMore - Toggles between short and full description
 */
const EventDetails = () => {
  const { eventId } = useParams();
  const [showMore, setShowMore] = useState(false);

  // Event data lookup with fallback
  const eventData = eventDetailsData[eventId] || {
    title: "Event Not Found",
    price: "₹0/-",
    tags: [],
    badge: "EVENT",
    description: "Event details not available.",
    fullDescription: "Event details not available.",
    eventDate: "TBA",
    teamSize: "TBA",
    venue: "TBA",
    contact: "events@meraki.com",
    registerLink: "#",
  };

  const eventInfo = events.find(e => e.slug === eventId);
  const eventImage = eventInfo?.image;

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
    <div ref={containerRef} className="min-h-screen relative text-white pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Background with filters */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `url(${eventDetailBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(20%) brightness(0.90) contrast(1.05)",
      }} />
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10" style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}>

        {/* Header - Always Visible */}
        <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0 }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400"></div>
            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">EVENT INFORMATION</h2>
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400"></div>
          </div>
          <h1 className="font-minecraft text-2xl sm:text-4xl md:text-6xl text-white mb-3 sm:mb-4 tracking-wider" style={{ textShadow: "3px 3px 0px #000, 2px 2px 0px rgba(6, 182, 212, 0.5)" }}>{eventData.title}</h1>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* Conditional Content: Coming Soon Wireframe vs Real Content */}
        {eventInfo?.comingSoon ? (
          /* Coming Soon Skeleton UI */
          <div className="relative min-h-[50vh]">
            {/* Floating "Coming Soon" Badge */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
              <div className="relative w-[300px] sm:w-[400px] md:w-[500px] aspect-[4/3] flex items-center justify-center transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={minecraftSignComingSoon} alt="Coming Soon" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl opacity-100" />
              </div>
            </div>

            {/* Skeleton Background Content */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-30 pointer-events-none select-none filter blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {/* Skeleton Image Area */}
              <div className="border-3 sm:border-4 border-gray-700 bg-gray-800/50 aspect-video flex items-center justify-center">
                <SkeletonBlock className="w-20 h-20" />
              </div>

              {/* Skeleton Info Area */}
              <div className="space-y-6">
                <SkeletonBlock className="h-8 w-1/3" />
                <SkeletonBlock className="h-6 w-1/4" />
                <div className="flex gap-2">
                  <SkeletonBlock className="h-8 w-20" />
                  <SkeletonBlock className="h-8 w-24" />
                  <SkeletonBlock className="h-8 w-16" />
                </div>
                <SkeletonBlock className="h-12 w-full sm:w-1/2" />
              </div>

              {/* Skeleton Details Panel */}
              <div className="lg:col-span-2 bg-dark-100/50 border-2 border-dark-300/50 p-8 mt-8">
                <SkeletonBlock className="h-8 w-32 mb-6" />
                <div className="space-y-3">
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-2/3" />
                </div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <SkeletonBlock className="h-16 w-full" />
                  <SkeletonBlock className="h-16 w-full" />
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Real Content */
          <>
            {/* Content Grid */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.2 }}>
              {/* Image */}
              <div className="border-3 sm:border-4 border-white bg-dark-100 order-1 overflow-hidden">
                {eventImage ? <img src={eventImage} alt={eventData.title} className="w-full aspect-video object-cover object-top" /> : <div className="aspect-video bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900 flex items-center justify-center"><span className="text-5xl sm:text-6xl md:text-8xl">🎮</span></div>}
              </div>

              {/* Info */}
              <div className="space-y-4 sm:space-y-6 order-2">
                {eventInfo?.isElite && <div className="inline-block bg-blue-600/20 border-2 border-blue-500 px-4 py-2 mt-2"><span className="font-pixel text-blue-400 text-sm sm:text-base tracking-wider flex items-center gap-2"><span className="animate-pulse">★</span> FLAGSHIP EVENT</span></div>}
                {eventData.price && <div className="flex items-center gap-2 sm:gap-3"><span className="text-2xl sm:text-3xl md:text-4xl">💰</span><span className="font-pixel text-xl sm:text-2xl md:text-3xl text-yellow-400">{eventData.price}</span></div>}
                <div className="flex flex-wrap gap-2 sm:gap-3">{eventData.tags.map((tag, index) => <span key={index} className="bg-gray-800 border border-gray-600 text-white font-terminal text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">{tag}</span>)}</div>
                <motion.a href={eventData.registerLink || "#"} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-500 text-white font-pixel text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-orange-800 hover:from-orange-500 hover:to-orange-400 transition-all min-h-[48px] text-center">{eventData.buttonText || 'REGISTER NOW!'}</motion.a>
              </div>
            </motion.div>

            {/* Sponsors Section */}
            {eventData.sponsors && (
              <motion.div
                className="mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 opacity-30"></div>
                  <div className="relative">

                    <h2 className="relative font-minecraft text-xl sm:text-2xl md:text-3xl text-yellow-400 text-center tracking-widest drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                      EVENT PATRONS
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 opacity-30"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-8 sm:gap-12 pb-8">
                  {eventData.sponsors.map((sponsor, index) => (
                    <div key={index} className="group relative">
                      {/* Item Frame Background */}
                      <div className="absolute -inset-3 bg-[#5c3a21] rounded-sm transform rotate-3 transition-transform duration-300 group-hover:rotate-6"></div>
                      <div className="absolute -inset-3 bg-[#8b5e34] border-t-4 border-l-4 border-[#a67c52] border-b-4 border-r-4 border-[#3d2616] shadow-xl"></div>

                      {/* Inner Content Area */}
                      <div className="relative bg-[#201c1c] p-6 w-[240px] sm:w-[280px] h-[280px] sm:h-[320px] flex flex-col items-center gap-4 border-4 border-[#1a1616] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                        {/* Leather Background Texture Overlay */}
                        <div className="absolute inset-0 bg-[#3d2616] opacity-10 pointer-events-none"></div>

                        {/* Logo Box */}
                        <div className="relative w-full h-32 sm:h-40 bg-white border-2 border-[#3d2616] flex items-center justify-center p-4 rounded-sm overflow-hidden group-hover:border-[#a67c52] transition-colors">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-w-full max-h-full object-contain filter drop-shadow-md transition-all duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Text Info */}
                        <div className="text-center relative z-10 flex-1 flex flex-col justify-center">
                          <p className="font-pixel text-yellow-400 text-lg sm:text-xl md:text-2xl mb-1 drop-shadow-md">{sponsor.name}</p>
                          {sponsor.institution && sponsor.institution.trim() && (
                            <p className="font-terminal text-cyan-400 text-sm sm:text-base">{sponsor.institution}</p>
                          )}
                        </div>
                      </div>

                      {/* Item Frame Corners (Nails) */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#2a1d15] shadow-sm z-20"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#2a1d15] shadow-sm z-20"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#2a1d15] shadow-sm z-20"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#2a1d15] shadow-sm z-20"></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Details Panel */}
            <motion.div className="bg-dark-100/80 border-2 border-dark-300 p-4 sm:p-6 md:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.6 }}>
              <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-6">DETAILS</h2>
              <div className="mb-4 sm:mb-6">
                <h3 className="font-pixel text-sm sm:text-base text-cyan-400 mb-2 sm:mb-3">DESCRIPTION</h3>
                <AnimatePresence mode="wait"><motion.p key={showMore ? "full" : "short"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-terminal text-sm sm:text-base text-gray-300 leading-relaxed mb-2 sm:mb-3">{showMore ? eventData.fullDescription : eventData.description}</motion.p></AnimatePresence>
                <button onClick={() => setShowMore(!showMore)} className="font-terminal text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2 min-h-[44px]">{showMore ? "Show less ▲" : "Show more ▼"}</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="border-l-3 sm:border-l-4 border-cyan-400 pl-3 sm:pl-4 py-1"><h4 className="font-pixel text-sm sm:text-base text-white mb-1 sm:mb-2">EVENT DATE</h4><p className="font-terminal text-sm sm:text-base text-gray-400">{eventData.eventDate}</p></div>
                <div className="border-l-3 sm:border-l-4 border-cyan-400 pl-3 sm:pl-4 py-1"><h4 className="font-pixel text-sm sm:text-base text-white mb-1 sm:mb-2">TEAM SIZE</h4><p className="font-terminal text-sm sm:text-base text-gray-400">{eventData.teamSize}</p></div>
                <div className="border-l-3 sm:border-l-4 border-cyan-400 pl-3 sm:pl-4 py-1"><h4 className="font-pixel text-sm sm:text-base text-white mb-1 sm:mb-2">VENUE</h4><p className="font-terminal text-sm sm:text-base text-gray-400">{eventData.venue}</p></div>
                <div className="border-l-3 sm:border-l-4 border-cyan-400 pl-3 sm:pl-4 py-1"><h4 className="font-pixel text-sm sm:text-base text-white mb-1 sm:mb-2">CONTACT</h4><p className="font-terminal text-sm sm:text-base text-gray-400 break-all">{eventData.contact}</p></div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default EventDetails;
