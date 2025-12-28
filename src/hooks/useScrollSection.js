/**
 * @fileoverview Custom React hooks for scroll-aware behaviors.
 * 
 * Provides scroll tracking, intersection observation, and scroll-linked
 * animation utilities using Framer Motion primitives.
 * 
 * @see DOCS.md#scroll-linked-animations
 * @module hooks/useScrollSection
 */

import { useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/**
 * Hook for scroll-linked section animations with pre-computed transforms.
 * 
 * Tracks scroll progress relative to a target element and provides
 * smoothed animation values for Apple-style transitions.
 * 
 * @param {React.RefObject} sectionRef - Ref to the tracked section element
 * @param {Object} [options] - Configuration options
 * @param {string[]} [options.offset] - Scroll trigger points ["start end", "end start"]
 * @param {Object} [options.springConfig] - Spring physics for smooth progress
 * 
 * @returns {Object} Scroll-linked animation values
 * @returns {MotionValue<number>} scrollYProgress - Raw 0-1 progress
 * @returns {MotionValue<number>} smoothProgress - Spring-smoothed progress
 * @returns {MotionValue<number>} opacity - Fade curve (0 → 1 → 1 → 0)
 * @returns {MotionValue<number>} y - Vertical parallax offset
 * @returns {MotionValue<number>} scale - Size multiplier curve
 * @returns {MotionValue<number>} blur - Filter blur value in pixels
 * 
 * @example
 * const sectionRef = useRef(null);
 * const { opacity, y, scale } = useScrollSection(sectionRef);
 * 
 * return (
 *   <motion.section ref={sectionRef} style={{ opacity, y, scale }}>
 *     Content
 *   </motion.section>
 * );
 * 
 * @interpolation
 * - opacity: [0, 0.2] → 0→1, [0.2, 0.8] → 1, [0.8, 1] → 1→0
 * - y: [0, 0.3] → 100→0, [0.7, 1] → 0→-100 (parallax slide)
 * - scale: [0, 0.2] → 0.95→1, [0.8, 1] → 1→0.95
 * - blur: [0, 0.2] → 10→0, [0.8, 1] → 0→10
 */
export const useScrollSection = (sectionRef, options = {}) => {
    const {
        offset = ["start end", "end start"],
        springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
    } = options;

    // Track scroll progress relative to target element
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: offset,
    });

    // Apply spring physics for smoother interpolation
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Pre-computed transform curves for common animation patterns
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
    const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10]);

    return {
        scrollYProgress,
        smoothProgress,
        opacity,
        y,
        scale,
        blur,
    };
};

/**
 * Hook to track which section is currently visible in viewport.
 * Uses Intersection Observer API for efficient scroll tracking.
 * 
 * @param {string[]} sectionIds - Array of section DOM IDs to track
 * @returns {string|null} ID of the currently active (most visible) section
 * 
 * @example
 * const activeSection = useActiveSection(["hero", "about", "events"]);
 * // Returns "about" when About section is ≥30% visible
 * 
 * @algorithm
 * - Creates IntersectionObserver for each section ID
 * - Updates active section when intersection ratio exceeds 30%
 * - Multiple thresholds [0.3, 0.5, 0.7] allow progressive tracking
 * 
 * @performance Observers are disconnected on unmount to prevent memory leaks
 */
export const useActiveSection = (sectionIds) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || null);

    useEffect(() => {
        const observers = [];

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    // Update active section when sufficiently visible
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        setActiveSection(id);
                    }
                },
                {
                    threshold: [0.3, 0.5, 0.7]  // Fire callback at multiple visibility levels
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        // Cleanup: disconnect all observers on unmount
        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sectionIds]);

    return activeSection;
};

/**
 * Hook for navbar scroll-aware state management.
 * Tracks whether user has scrolled and if hero section is visible.
 * 
 * @param {number} [threshold=50] - Scroll distance (px) to trigger "scrolled" state
 * @returns {Object} Scroll state object
 * @returns {boolean} isScrolled - True when scrollY exceeds threshold
 * @returns {boolean} isAtHero - True when in top 50% of viewport height
 * 
 * @example
 * const { isScrolled, isAtHero } = useNavbarScroll(50);
 * 
 * const bgClass = isAtHero
 *   ? "bg-transparent"
 *   : isScrolled
 *     ? "bg-black/90 backdrop-blur-xl"
 *     : "bg-gradient-to-b from-black/50 to-transparent";
 * 
 * @usage
 * - isScrolled: Toggle between transparent and solid navbar background
 * - isAtHero: Apply special styling when hero section is prominent
 * 
 * @performance Uses passive event listener for better scroll performance
 */
export const useNavbarScroll = (threshold = 50) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAtHero, setIsAtHero] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > threshold);
            setIsAtHero(scrollY < window.innerHeight * 0.5);
        };

        // Passive listener improves scroll performance
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();  // Set initial state

        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return { isScrolled, isAtHero };
};

export default useScrollSection;
