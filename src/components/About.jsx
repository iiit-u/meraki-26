/**
 * @fileoverview About section with dual-card layout and draggable characters.
 * 
 * Displays information about IIIT Una and Meraki in side-by-side cards
 * (on desktop) with decorative Minecraft character illustrations.
 * Characters are interactive and can be dragged within constraints.
 * 
 * @see DOCS.md#scroll-linked-animations for parallax transforms
 * @see DOCS.md#animation-system for spring physics on drag
 * @component
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import aboutImage from "../assets/about_underground_bg.webp";
import aboutImage1 from "../assets/about_image1.webp";
import aboutImage2 from "../assets/about_image2.webp";
import merakiLogo from "../assets/meraki_minecraft.webp";
import iiitunaLogo from "../assets/iiitunaLogo.webp";
import { ABOUT_IIIT_UNA, ABOUT_MERAKI } from "../constants/aboutData";
import { appleSlideUp, sectionTransition } from "../utils/motion";

/**
 * About section with scroll-linked animations and draggable characters.
 * 
 * @returns {JSX.Element} About section with two info cards
 * 
 * @layout
 * - Desktop (xl:): Two cards side-by-side (50/50)
 * - Mobile: Stacked vertically
 * 
 * @scrollAnimation
 * - Cards slide in from left/right (±40px)
 * - Content opacity fades in/out at section boundaries
 */
const About = () => {
    const sectionRef = useRef(null);

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
     * @leftCardX - Left card slides from -40px → 0
     * @rightCardX - Right card slides from +40px → 0
     */
    const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.25], [60, 0]);
    const leftCardX = useTransform(scrollYProgress, [0, 0.3], [-40, 0]);
    const rightCardX = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-hidden"
            style={{ paddingTop: "var(--navbar-height, 5rem)" }}
        >
            {/* 
             * Background Layer
             * 
             * Underground/cave themed background with gradient overlays
             * for section blending.
             */}
            <motion.div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${aboutImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                {/* 
                 * Top Gradient Blend
                 * 
                 * Creates seamless transition from Hero section.
                 * Uses rgba black for soft edge.
                 * 
                 * @gradient rgba(0,0,0,0.9) → transparent
                 */}
                <div
                    className="absolute top-0 left-0 right-0 h-[20vh] z-[1]"
                    style={{
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
                    }}
                />
                {/* 
                 * Bottom Gradient Blend
                 * 
                 * Transitions to Flagship Event section background color.
                 * @color #080808 matches --bg-flagship
                 */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[30vh] z-[1]"
                    style={{
                        background: "linear-gradient(to top, #080808, transparent)",
                    }}
                />
                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-black/40 z-[0]" />
            </motion.div>

            {/* Content with scroll-linked transforms */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-10 min-h-screen flex flex-col justify-center py-8 px-4 md:px-8 lg:px-16"
            >
                <motion.div
                    variants={sectionTransition}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex flex-col xl:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto w-full items-stretch"
                >
                    {/* 
                     * IIIT UNA Card
                     * 
                     * Slides in from left (-40px → 0)
                     * Contains draggable Steve character at top-left
                     */}
                    <motion.div
                        className="w-full xl:w-1/2 flex"
                        style={{ x: leftCardX }}
                    >
                        <motion.div
                            variants={appleSlideUp(0.1)}
                            className="bg-black/80 backdrop-blur-sm border-4 border-gray-600 shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 relative h-full flex flex-col group hover:border-cyan-400/60 transition-all duration-500"
                            style={{
                                /**
                                 * Multi-layer box shadow
                                 * 
                                 * Inner: 2px solid black border simulation
                                 * Outer: Large soft shadow for depth
                                 */
                                boxShadow: "0 0 0 2px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.6)",
                            }}
                        >
                            {/* 
                             * Draggable Character - Steve
                             * 
                             * @drag Enabled with elastic constraints
                             * @dragConstraints ±50px in all directions
                             * @dragElastic 0.1 - Low elasticity for controlled feel
                             * 
                             * @hover scale(1.1) with rotation keyframes [0, -5°, 5°, 0]
                             * @tap scale(0.9) for press feedback
                             */}
                            <motion.div
                                drag
                                dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
                                dragElastic={0.1}
                                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                                whileTap={{ scale: 0.9, cursor: "grabbing" }}
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
                                className="absolute -top-16 -left-2 sm:-top-20 sm:-left-4 md:-top-24 md:-left-8 w-20 h-28 sm:w-28 sm:h-36 md:w-36 md:h-48 z-30 cursor-grab"
                            >
                                <img
                                    src={aboutImage1}
                                    alt="Minecraft Steve"
                                    className="w-full h-full object-contain pointer-events-none"
                                    style={{
                                        /**
                                         * Pixelated rendering for Minecraft aesthetic.
                                         * Prevents browser smoothing of pixel art.
                                         */
                                        imageRendering: "pixelated",
                                        filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.8))",
                                    }}
                                />
                            </motion.div>

                            {/* Card Title */}
                            <motion.h2
                                variants={appleSlideUp(0.2)}
                                className="font-terminal text-white tracking-wider uppercase text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 mt-8 sm:mt-0 relative z-20"
                            >
                                ABOUT
                            </motion.h2>

                            {/* IIIT Una Logo */}
                            <motion.div
                                variants={appleSlideUp(0.25)}
                                className="flex justify-center mb-6 relative z-20"
                            >
                                <img
                                    src={iiitunaLogo}
                                    alt="IIIT UNA"
                                    className="h-12 sm:h-16 md:h-20 lg:h-24 object-contain drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </motion.div>

                            {/* Card Content */}
                            <motion.div
                                variants={appleSlideUp(0.3)}
                                className="mt-auto flex-1 flex flex-col justify-center"
                            >
                                <p className="text-white font-terminal leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl text-justify opacity-90">
                                    {ABOUT_IIIT_UNA}
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* 
                     * Meraki Card
                     * 
                     * Slides in from right (+40px → 0)
                     * Contains Meraki logo and draggable character at top-right
                     */}
                    <motion.div
                        className="w-full xl:w-1/2 flex"
                        style={{ x: rightCardX }}
                    >
                        <motion.div
                            variants={appleSlideUp(0.2)}
                            className="bg-black/80 backdrop-blur-sm border-4 border-gray-600 shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 relative h-full flex flex-col group hover:border-cyan-400/60 transition-all duration-500"
                            style={{
                                boxShadow: "0 0 0 2px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.6)",
                            }}
                        >
                            {/* 
                             * Draggable Character - Right side
                             * 
                             * Same drag configuration as left character.
                             * Uses scale-x-[-1] to flip horizontally.
                             */}
                            <motion.div
                                drag
                                dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
                                dragElastic={0.1}
                                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                                whileTap={{ scale: 0.9, cursor: "grabbing" }}
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
                                className="absolute -top-16 -right-2 sm:-top-20 sm:-right-4 md:-top-24 md:-right-8 w-20 h-28 sm:w-28 sm:h-36 md:w-36 md:h-48 z-30 cursor-grab"
                            >
                                <img
                                    src={aboutImage2}
                                    alt="Minecraft Creeper"
                                    className="w-full h-full object-contain transform scale-x-[-1] pointer-events-none"
                                    style={{
                                        imageRendering: "pixelated",
                                        filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.8))",
                                    }}
                                />
                            </motion.div>

                            {/* Card Title */}
                            <motion.h2
                                variants={appleSlideUp(0.3)}
                                className="font-terminal text-white tracking-wider uppercase text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 mt-8 sm:mt-0 relative z-20"
                            >
                                ABOUT
                            </motion.h2>

                            {/* Meraki Logo */}
                            <motion.div
                                variants={appleSlideUp(0.35)}
                                className="flex justify-center mb-6 relative z-20"
                            >
                                <img
                                    src={merakiLogo}
                                    alt="MERAKI"
                                    className="h-12 sm:h-16 md:h-20 lg:h-24 object-contain drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </motion.div>

                            {/* Card Content */}
                            <motion.div
                                variants={appleSlideUp(0.4)}
                                className="mt-auto flex-1 flex flex-col justify-center"
                            >
                                <p className="text-white font-terminal leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl text-justify opacity-90">
                                    {ABOUT_MERAKI}
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
