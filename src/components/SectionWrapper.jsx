/**
 * @fileoverview Reusable section wrapper with scroll animations and gradient blending.
 * 
 * Provides consistent section structure with background handling, gradient
 * transitions between sections, and scroll-linked content animations.
 * 
 * @see DOCS.md#gradient-blending for section transitions
 * @see DOCS.md#scroll-linked-animations for transform animations
 * @component
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Section wrapper with scroll-linked animations and gradient blending.
 * 
 * @param {Object} props
 * @param {string} props.id - Section DOM ID for navigation
 * @param {React.ReactNode} props.children - Section content
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.backgroundImage] - Background image URL
 * @param {string} [props.backgroundColor="#0a0a0a"] - Fallback background color
 * @param {string} [props.gradientFrom="transparent"] - Top gradient color
 * @param {string} [props.gradientTo="transparent"] - Bottom gradient color
 * @param {number} [props.overlayOpacity=0.4] - Dark overlay opacity (0-1)
 * @param {string} [props.minHeight="100vh"] - Minimum section height
 * @param {string} [props.paddingTop="5rem"] - Top padding (navbar offset)
 * @param {"up"|"down"|"left"|"right"} [props.animationDirection="up"] - Content slide direction
 * @returns {JSX.Element} Animated section wrapper
 * 
 * @example
 * <SectionWrapper
 *   id="about"
 *   backgroundImage={bgImage}
 *   gradientFrom="#050505"
 *   gradientTo="#0a0a0a"
 *   animationDirection="up"
 * >
 *   <AboutContent />
 * </SectionWrapper>
 */
const SectionWrapper = ({
    id,
    children,
    className = "",
    backgroundImage,
    backgroundColor = "#0a0a0a",
    gradientFrom = "transparent",
    gradientTo = "transparent",
    overlayOpacity = 0.4,
    minHeight = "100vh",
    paddingTop = "5rem",
    animationDirection = "up",
}) => {
    const sectionRef = useRef(null);

    /**
     * Scroll progress tracking for this section.
     * @offset Full traversal: enters when bottom reaches viewport, exits when top leaves
     */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    /**
     * Spring physics for smoother animation values.
     * Reduces jitter from rapid scroll events.
     */
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    /**
     * Gradient blend opacity transforms.
     * 
     * @blendTopOpacity - Fades out as section enters (0% → 15% scroll)
     * @blendBottomOpacity - Fades in as section exits (85% → 100% scroll)
     * 
     * Creates seamless visual transitions between adjacent sections.
     */
    const blendTopOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const blendBottomOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

    /**
     * Content entrance/exit transforms.
     * 
     * @interpolation
     * - Enter: 0→20% scroll progress
     * - Visible: 20→80% scroll progress
     * - Exit: 80→100% scroll progress
     * 
     * @directions Based on animationDirection prop:
     * - "up": translateY(80px → 0 → -80px)
     * - "down": translateY(-80px → 0 → 80px)
     * - "left": translateX(80px → 0 → -80px)
     * - "right": translateX(-80px → 0 → 80px)
     */
    const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const contentY = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        animationDirection === "up" ? [80, 0, 0, -80] : animationDirection === "down" ? [-80, 0, 0, 80] : [0, 0, 0, 0]
    );
    const contentX = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        animationDirection === "left" ? [80, 0, 0, -80] : animationDirection === "right" ? [-80, 0, 0, 80] : [0, 0, 0, 0]
    );
    const contentScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`relative w-full overflow-hidden ${className}`}
            style={{
                minHeight,
                paddingTop,
                backgroundColor,
            }}
        >
            {/* Background Image Layer */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )}

            {/* Dark overlay for text contrast */}
            <div
                className="absolute inset-0 z-[1]"
                style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
            />

            {/* 
             * Top Gradient Blend
             * 
             * Fades from previous section's color.
             * Opacity decreases as section enters viewport.
             */}
            <motion.div
                className="absolute top-0 left-0 right-0 z-[2] pointer-events-none"
                style={{
                    height: "25vh",
                    background: `linear-gradient(to bottom, ${gradientFrom}, transparent)`,
                    opacity: blendTopOpacity,
                }}
            />

            {/* 
             * Bottom Gradient Blend
             * 
             * Fades to next section's color.
             * Opacity increases as section exits viewport.
             */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
                style={{
                    height: "25vh",
                    background: `linear-gradient(to top, ${gradientTo}, transparent)`,
                    opacity: blendBottomOpacity,
                }}
            />

            {/* Content with scroll-linked transforms */}
            <motion.div
                className="relative z-10 h-full"
                style={{
                    opacity: contentOpacity,
                    y: contentY,
                    x: contentX,
                    scale: contentScale,
                }}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default SectionWrapper;
