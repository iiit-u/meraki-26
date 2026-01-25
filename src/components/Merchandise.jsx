/**
 * @fileoverview Merchandise section showcasing official Meraki merch stores.
 * 
 * Displays two merchandise options (Doon Merchandise & Dopamine Store) with
 * hoodie images and central promotional text. Features Minecraft-themed styling
 * with scroll-linked animations.
 * 
 * @see DOCS.md#scroll-linked-animations for parallax transforms
 * @see DOCS.md#animation-system for motion variants
 * @component
 */

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { appleSlideUp, sectionTransition } from "../utils/motion";
import { STORE_ASSETS, STORE_LINKS } from "../constants/merchandiseData";

/**
 * Merchandise section with scroll-linked animations.
 * 
 * @returns {JSX.Element} Merchandise section with two store options
 * 
 * @layout
 * - Desktop (lg:): Three columns - Left hoodie, center text, right hoodie
 * - Mobile: Stacked vertically
 * 
 * @scrollAnimation
 * - Content opacity fades in/out at section boundaries
 * - Content slides up on entrance
 */
const Merchandise = () => {
    const sectionRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    /**
     * Scroll progress tracking for parallax effects.
     * @offset ["start end", "end start"] - Full viewport traversal
     */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    /**
     * Scroll-linked transform values.
     * 
     * @contentOpacity - Fade curve: 0→1 (enter) → 1 (visible) → 1→0 (exit)
     * @contentY - Slide up: 60px → 0 on enter
     */
    const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.25], [60, 0]);

    return (
        <section
            id="merchandise"
            ref={sectionRef}
            className="relative w-full overflow-hidden py-16 md:py-24"
        >
            {/* 
             * Background Layer - Solid Black
             */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* Content with scroll-linked transforms */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-10 flex flex-col px-4 md:px-8 lg:px-16"
            >
                {/* Section Header */}
                <motion.div
                    variants={sectionTransition}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mb-6 md:mb-8"
                >
                    <motion.div
                        variants={appleSlideUp(0.1)}
                        className="flex items-center gap-3"
                    >
                        <span className="text-cyan-400 text-xl md:text-2xl">▶</span>
                        <h2 className="font-minecraft text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider uppercase">
                            Merchandise
                        </h2>
                    </motion.div>
                </motion.div>

                {/* Main Content Area */}
                <motion.div
                    variants={sectionTransition}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative"
                >
                    {/* Content Grid */}
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 max-w-7xl mx-auto w-full">

                        {/* Left Card - Doon Merchandise */}
                        <motion.div
                            variants={appleSlideUp(0.2)}
                            className="w-full lg:w-[30%] flex flex-col items-center"
                        >
                            {/* Store Header */}
                            <div className="flex flex-col items-center gap-2 mb-4 bg-transparent">
                                <motion.div
                                    className="w-16 h-16 md:w-20 md:h-20 mb-2 rounded-lg overflow-hidden bg-white p-2"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={STORE_ASSETS.doon.logo}
                                        alt="Doon Merchandise Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <h3 className="font-minecraft text-white text-base sm:text-lg md:text-xl tracking-wide uppercase text-center leading-tight drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                                    Doon Merchandise
                                </h3>
                            </div>

                            {/* Hoodie Image - Links to internal merchandise page */}
                            <Link to="/merchandise" state={{ brand: "doon" }} className="w-full flex justify-center">
                                <motion.div
                                    className="relative w-full max-w-[420px] aspect-square md:max-w-[500px] mb-6 cursor-pointer group flex items-center justify-center lg:-translate-x-16"
                                >
                                    <img
                                        src={STORE_ASSETS.doon.hoodie}
                                        alt="Doon Merchandise Hoodie"
                                        className="w-full h-full object-contain"
                                        style={{
                                            filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.5))"
                                        }}
                                    />
                                    {/* Floating Explore Button */}
                                    <a
                                        href={STORE_LINKS.doon}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-cyan-400/60 text-cyan-400 font-minecraft text-xs uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cyan-400/20 hover:scale-105 z-10"
                                    >
                                        Explore Store
                                    </a>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* Center Card - Promo Text */}
                        <motion.div
                            variants={appleSlideUp(0.3)}
                            className="w-full lg:w-[40%] flex justify-center my-4 lg:my-0"
                        >
                            <div
                                className="bg-neutral-700/95 backdrop-blur-sm p-6 md:p-8 lg:p-10 text-center w-full max-w-[400px]"
                                style={{
                                    boxShadow: "inset 0 0 0 3px rgba(80,80,80,0.5), 0 8px 32px rgba(0,0,0,0.5)",
                                }}
                            >
                                <p className="font-minecraft text-white text-lg md:text-xl lg:text-2xl tracking-wide mb-3">
                                    The official
                                </p>
                                <h3 className="font-minecraft text-white text-3xl md:text-4xl lg:text-5xl tracking-wide mb-3">
                                    MERCH
                                </h3>
                                <p className="font-minecraft text-white text-lg md:text-xl tracking-wide mb-2">
                                    for
                                </p>
                                <p className="font-minecraft text-white text-2xl md:text-3xl lg:text-4xl tracking-wide mb-2">
                                    MERAKI
                                </p>
                                <p className="font-minecraft text-white text-lg md:text-xl tracking-wide mb-6">
                                    is out
                                </p>

                                <div className="pt-4">
                                    <p className="font-minecraft text-white text-base md:text-lg tracking-wide mb-1">
                                        From
                                    </p>
                                    <p className="font-minecraft text-red-500 text-xl md:text-2xl tracking-wide mb-1">
                                        Pixels
                                    </p>
                                    <p className="font-minecraft text-white text-base md:text-lg tracking-wide mb-1">
                                        to
                                    </p>
                                    <p className="font-minecraft text-red-500 text-xl md:text-2xl tracking-wide mb-3">
                                        Reality
                                    </p>
                                    <p className="font-minecraft text-yellow-400 text-lg md:text-xl tracking-wider mb-6">
                                        Spawn Your Style
                                    </p>
                                </div>

                                {/* Explore Button - Opens popup to choose store */}
                                <motion.div
                                    onClick={() => setShowPopup(true)}
                                    whileHover={{
                                        scale: 1.05,
                                        borderColor: "rgba(34, 211, 238, 0.8)",
                                        backgroundColor: "rgba(34, 211, 238, 0.1)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-block px-8 py-3 border-2 border-cyan-400/40 bg-black/30 backdrop-blur-sm text-white text-base md:text-lg font-minecraft tracking-widest uppercase transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-400/20"
                                >
                                    ▶ Explore Merch
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Card - Dopamine Store */}
                        <motion.div
                            variants={appleSlideUp(0.4)}
                            className="w-full lg:w-[30%] flex flex-col items-center"
                        >
                            {/* Store Header */}
                            <div className="flex flex-col items-center gap-2 mb-4 bg-transparent">
                                <motion.img
                                    src={STORE_ASSETS.dopamine.icon}
                                    alt="Skull Icon"
                                    className="w-16 h-16 md:w-20 md:h-20 mb-2"
                                    style={{ imageRendering: "pixelated" }}
                                    whileHover={{ rotate: -360 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <h3 className="font-minecraft text-white text-base sm:text-lg md:text-xl tracking-wide uppercase text-center leading-tight drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                                    Dopamine Store
                                </h3>
                            </div>

                            {/* Hoodie Image - Links to internal merchandise page */}
                            <Link to="/merchandise" state={{ brand: "dopamine" }} className="w-full flex justify-center">
                                <motion.div
                                    className="relative w-full max-w-[420px] aspect-square md:max-w-[500px] mb-6 cursor-pointer group flex items-center justify-center"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <img
                                        src={STORE_ASSETS.dopamine.hoodie}
                                        alt="Dopamine Store Hoodie"
                                        className="w-full h-full object-contain"
                                        style={{
                                            filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.5))"
                                        }}
                                    />
                                    {/* Floating Explore Button */}
                                    <a
                                        href={STORE_LINKS.dopamine}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-red-500/60 text-red-500 font-minecraft text-xs uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/20 hover:scale-105 z-10"
                                    >
                                        Explore Store
                                    </a>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Store Selection Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                        onClick={() => setShowPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-neutral-900 border border-white/10 p-8 rounded-lg max-w-md w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="font-minecraft text-white text-xl text-center mb-6">Choose Store</h3>
                            <div className="flex flex-col gap-4">
                                <a
                                    href={STORE_LINKS.doon}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 border border-cyan-400/40 bg-black/50 hover:bg-cyan-400/10 transition-colors rounded-lg"
                                >
                                    <div className="w-12 h-12 bg-white rounded-lg p-1 flex-shrink-0">
                                        <img src={STORE_ASSETS.doon.logo} alt="Doon" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-minecraft text-cyan-400 text-sm">Doon Merchandise</p>
                                        <p className="font-terminal text-white/60 text-xs">Official Meraki Tees</p>
                                    </div>
                                    <span className="ml-auto text-cyan-400">↗</span>
                                </a>
                                <a
                                    href={STORE_LINKS.dopamine}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 border border-red-500/40 bg-black/50 hover:bg-red-500/10 transition-colors rounded-lg"
                                >
                                    <div className="w-12 h-12 flex-shrink-0">
                                        <img src={STORE_ASSETS.dopamine.icon} alt="Dopamine" className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} />
                                    </div>
                                    <div>
                                        <p className="font-minecraft text-red-500 text-sm">Dopamine Store</p>
                                        <p className="font-terminal text-white/60 text-xs">Premium Hoodies</p>
                                    </div>
                                    <span className="ml-auto text-red-500">↗</span>
                                </a>
                            </div>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="mt-6 w-full py-2 border border-white/20 text-white/60 font-minecraft text-sm hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Merchandise;
