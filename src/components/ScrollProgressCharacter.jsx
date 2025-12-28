/**
 * @fileoverview Animated Minecraft character that walks based on scroll progress.
 * 
 * Features a Steve character that moves horizontally across the viewport
 * based on scroll position, with walking animation and direction changes.
 * 
 * @see DOCS.md#scroll-linked-animations for scroll tracking
 * @component
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import steveImage from "../assets/steve_character.webp";

/**
 * Walking Minecraft character as scroll progress indicator.
 * 
 * @returns {JSX.Element} Fixed-position animated character
 * 
 * @behavior
 * - Walks left-to-right based on scroll progress (0-100%)
 * - Faces right when scrolling down, left when scrolling up
 * - Stays above footer when footer enters viewport
 * - Desktop-only (hidden below md: breakpoint 768px)
 * 
 * @state scrollProgress - Current scroll percentage 0-100
 * @state isWalking - Whether character is actively being scrolled
 * @state direction - 1 = facing right, -1 = facing left
 * @state footerHeight - Visible footer height to avoid overlap
 */
const ScrollProgressCharacter = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isWalking, setIsWalking] = useState(false);
    const [direction, setDirection] = useState(1);  // 1 = right, -1 = left
    const [footerHeight, setFooterHeight] = useState(0);

    // Track previous scroll position for direction detection
    const lastScrollY = useRef(0);
    const walkingTimeout = useRef(null);

    // Character dimensions in pixels
    const characterWidth = 56;
    const characterHeight = 72;

    /**
     * Scroll event handler.
     * 
     * Calculates:
     * 1. Scroll progress as percentage
     * 2. Scroll direction (up/down)
     * 3. Footer visibility for positioning
     * 
     * @algorithm
     * - progress = (scrollY / maxScroll) × 100
     * - direction = sign(scrollY - lastScrollY)
     * - footerHeight = max(0, viewportHeight - footerTop)
     */
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max((scrollY / maxScroll) * 100, 0), 100);

        // Detect scroll direction
        const scrollDelta = scrollY - lastScrollY.current;
        if (Math.abs(scrollDelta) > 1) {
            setDirection(scrollDelta > 0 ? 1 : -1);
            setIsWalking(true);

            // Stop walking animation after scroll stops
            clearTimeout(walkingTimeout.current);
            walkingTimeout.current = setTimeout(() => {
                setIsWalking(false);
            }, 100);
        }

        lastScrollY.current = scrollY;
        setScrollProgress(progress);

        // Calculate visible footer height
        const footer = document.querySelector("footer");
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            const visibleFooterHeight = Math.max(0, window.innerHeight - footerRect.top);
            setFooterHeight(visibleFooterHeight);
        }
    }, []);

    // Set up scroll and resize listeners
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        handleScroll();  // Initial calculation

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            clearTimeout(walkingTimeout.current);
        };
    }, [handleScroll]);

    /**
     * Calculate horizontal position based on scroll progress.
     * 
     * @returns {string} CSS left value in pixels
     * @formula left = (progress / 100) × (viewportWidth - characterWidth)
     */
    const getHorizontalPosition = () => {
        const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
        const maxLeft = viewportWidth - characterWidth;
        const leftPx = (scrollProgress / 100) * maxLeft;
        return `${leftPx}px`;
    };

    /**
     * Calculate bottom position, staying above footer.
     * 
     * @returns {string} CSS bottom value in pixels
     */
    const getBottomPosition = () => {
        if (footerHeight > 0) {
            return `${footerHeight}px`;  // Rise above footer
        }
        return "0px";  // Touch viewport bottom
    };

    return (
        <motion.div
            className="fixed z-[9999] hidden md:block pointer-events-none select-none"
            style={{
                left: getHorizontalPosition(),
                bottom: getBottomPosition(),
                width: characterWidth,
                height: characterHeight,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        >
            {/* 
             * Walking Animation Container
             * 
             * @animation While walking:
             *   - y: Bobbing motion [0, -3, 0, -2, 0]
             *   - rotate: Subtle sway [0, -2°, 0, 2°, 0]
             *   - duration: 0.3s per cycle, infinite loop
             */}
            <motion.div
                className="w-full h-full relative"
                animate={{
                    y: isWalking ? [0, -3, 0, -2, 0] : 0,
                    rotate: isWalking ? [0, -2, 0, 2, 0] : 0,
                }}
                transition={{
                    duration: 0.3,
                    repeat: isWalking ? Infinity : 0,
                    ease: "easeInOut",
                }}
            >
                {/* 
                 * Character Sprite
                 * 
                 * @flip scaleX(-1) to face left when scrolling up
                 * @render pixelated to preserve pixel art quality
                 */}
                <img
                    src={steveImage}
                    alt="Minecraft Steve"
                    className="w-full h-full object-contain"
                    style={{
                        imageRendering: "pixelated",
                        transform: `scaleX(${direction})`,
                        filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.3))",
                        transition: "transform 0.15s ease-out",
                    }}
                />

                {/* 
                 * Walking Dust Particles
                 * 
                 * Fading, expanding particle effect beneath character
                 * while actively scrolling.
                 */}
                {isWalking && (
                    <motion.div
                        className="absolute bottom-0 left-1/2 w-8 h-3"
                        style={{ transform: "translateX(-50%)" }}
                        initial={{ opacity: 0.4, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 1.2, y: 5 }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    >
                        <div className="w-full h-full bg-gradient-to-t from-gray-400/30 to-transparent rounded-full blur-sm" />
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ScrollProgressCharacter;
