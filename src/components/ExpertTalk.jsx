/**
 * @fileoverview Expert Talk section with Minecraft-themed speaker cards.
 * 
 * Displays expert speakers in a responsive card grid with Minecraft-themed styling.
 * Cards feature speaker photos with expanding hover overlays that reveal
 * detailed speaker highlights.
 * 
 * @see DOCS.md#animation-system for motion variants
 * @see DOCS.md#responsive-breakpoints for layout
 * @component
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import workshopsBg from "../assets/elite_minecraft_bg.webp";
import { expertTalks } from "../constants";
import { appleSlideUp, sectionTransition } from "../utils/motion";

/**
 * Expert Talk section component with speaker card grid.
 * 
 * @returns {JSX.Element} Expert Talk section with animated speaker cards
 * 
 * @animation
 * - Scroll-linked entrance from bottom
 * - Staggered card animations on view
 * - Smooth hover state transitions with expanding overlay
 */
function ExpertTalk() {
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

    /**
     * Speaker card component with Minecraft-themed frame and expanding hover overlay.
     * 
     * @param {Object} speaker - Speaker data object
     * @param {number} index - Card index for stagger timing
     * @returns {JSX.Element} Animated speaker card
     */
    const SpeakerCard = ({ speaker, index }) => {
        return (
            <motion.div
                variants={appleSlideUp(index * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group relative cursor-pointer"
            >
                {/* Minecraft-style Card Container - FAQ Box style */}
                <div
                    className="relative w-full aspect-[3/4] bg-[#474747] transition-all duration-300"
                    style={{
                        /* 
                         * Minecraft-style 3D bevel border (outer)
                         * Asymmetric colors simulate light source from top-left
                         */
                        border: "3px solid",
                        borderColor: "#888888 #1a1a1a #1a1a1a #666666",
                    }}
                >
                    {/* Inner frame with inverted bevel - creates inset appearance */}
                    <div
                        className="relative w-full h-full bg-[#3a3a3a] overflow-hidden"
                        style={{
                            border: "2px solid",
                            borderColor: "#2a2a2a #555555 #555555 #2a2a2a",
                        }}
                    >
                        {/* Speaker Photo - Full card background */}
                        <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        {/* 
                         * Default Bottom Bar - Shows name and title
                         * Fades OUT on hover
                         */}
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-black/85 backdrop-blur-sm p-3 sm:p-4 transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
                        >
                            {/* Speaker Name */}
                            <h3 className="font-minecraft text-white text-xs sm:text-sm md:text-base leading-tight tracking-wider uppercase line-clamp-2">
                                {speaker.name}
                            </h3>

                            {/* Speaker Title */}
                            <p className="font-minecraft text-cyan-400 text-[10px] sm:text-xs md:text-sm tracking-wide mt-1">
                                {"{" + speaker.title + "}"}
                            </p>
                        </div>

                        {/* 
                     * Full Overlay - Shows name, title, and highlights
                     * Fades IN on hover
                     */}
                        <div
                            className="absolute inset-0 bg-black/85 backdrop-blur-sm p-3 sm:p-4 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 flex flex-col justify-start"
                        >
                            {/* Speaker Name */}
                            <h3 className="font-minecraft text-white text-xs sm:text-sm md:text-base leading-tight tracking-wider uppercase">
                                {speaker.name}
                            </h3>

                            {/* Speaker Title */}
                            <p className="font-minecraft text-cyan-400 text-[10px] sm:text-xs md:text-sm tracking-wide mt-1">
                                {"{" + speaker.title + "}"}
                            </p>

                            {/* Highlight Points */}
                            <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
                                {speaker.highlights.map((highlight, idx) => (
                                    <li
                                        key={idx}
                                        className="font-minecraft text-gray-300 text-[10px] sm:text-xs md:text-sm flex items-start gap-1.5 sm:gap-2 leading-tight"
                                    >
                                        <span className="text-cyan-400 flex-shrink-0">•</span>
                                        <span className="break-words">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pixelated corner accents for Minecraft frame feel */}
                        <div className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 bg-[#5a5a5a] pointer-events-none z-20" />
                        <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-[#5a5a5a] pointer-events-none z-20" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3 bg-[#1a1a1a] pointer-events-none z-20" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-[#1a1a1a] pointer-events-none z-20" />
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section
            id="expert-talk"
            ref={sectionRef}
            className="relative w-full min-h-screen text-white overflow-hidden flex flex-col"
            style={{ paddingTop: "var(--navbar-height, 5rem)" }}
        >
            {/* Background Layer */}
            <motion.div className="absolute inset-0 z-0">
                <img
                    src={workshopsBg}
                    alt="Background"
                    className="w-full h-full object-cover object-top"
                />
                {/* 
         * Gradient Blending - Section Transitions
         * 
         * Top gradient blends from the previous About section (#080808)
         * Bottom gradient blends to the next FlagshipEvent section (#080808)
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
                className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 py-8 justify-center"
            >
                {/* Section Header */}
                <motion.div
                    className="w-full max-w-7xl mx-auto mb-8 md:mb-12 flex justify-start"
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
                            EXPERT TALKS
                        </h2>
                    </div>
                </motion.div>

                {/* Speaker Cards Grid Container */}
                <div className="flex justify-center items-center w-full">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center w-full max-w-7xl mx-auto gap-6 md:gap-8"
                        variants={sectionTransition}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.05 }}
                    >
                        {expertTalks.map((speaker, index) => (
                            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Decorative grid pattern - optional subtle background effect */}
            <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)",
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>
        </section>
    );
}

export default ExpertTalk;
