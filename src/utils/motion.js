/**
 * @fileoverview Framer Motion animation variants for coordinated UI animations.
 * 
 * This module exports reusable animation variant objects compatible with
 * Framer Motion's `variants` prop. Each variant defines `hidden` and `show`
 * states for enter/exit animations.
 * 
 * @see DOCS.md#animation-system for physics parameters and easing curves
 * @module utils/motion
 */

/**
 * Text entrance animation with vertical slide and spring physics.
 * 
 * @param {number} delay - Delay before animation starts (seconds)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @example
 * <motion.h1 variants={textVariant(0.2)} initial="hidden" animate="show">
 * 
 * @animation
 * - Transform: translateY(-50px) → translateY(0)
 * - Opacity: 0 → 1
 * - Easing: spring with 0.8s duration
 */
export const textVariant = (delay) => {
    return {
        hidden: {
            y: -50,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.8,
                delay: delay,
            },
        },
    };
};

/**
 * Directional fade-in with configurable slide direction.
 * 
 * @param {"left"|"right"|"up"|"down"} direction - Slide origin direction
 * @param {"spring"|"tween"} type - Animation interpolation type
 * @param {number} delay - Delay before animation starts (seconds)
 * @param {number} duration - Animation duration (seconds, for tween type)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @example
 * <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
 * 
 * @animation
 * - Transform: translate ±100px based on direction → translate(0, 0)
 * - Opacity: 0 → 1
 * - Easing: easeOut curve
 */
export const fadeIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

/**
 * Scale-based entrance animation from zero.
 * 
 * @param {number} delay - Delay before animation starts (seconds)
 * @param {number} duration - Animation duration (seconds)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @animation
 * - Transform: scale(0) → scale(1)
 * - Opacity: 0 → 1
 * - Easing: easeOut tween
 */
export const zoomIn = (delay, duration) => {
    return {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        show: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "tween",
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

/**
 * Full-width slide entrance from off-screen.
 * 
 * @param {"left"|"right"|"up"|"down"} direction - Slide origin direction
 * @param {"spring"|"tween"} type - Animation interpolation type
 * @param {number} delay - Delay before animation starts (seconds)
 * @param {number} duration - Animation duration (seconds)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @animation
 * - Transform: translate(±100%) → translate(0)
 * - Uses percentage-based offset for responsive layouts
 */
export const slideIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
        },
        show: {
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

/**
 * Container variant for orchestrating staggered child animations.
 * 
 * @param {number} staggerChildren - Delay between each child's animation (seconds)
 * @param {number} [delayChildren=0] - Initial delay before first child animates
 * @returns {Object} Framer Motion variant for parent containers
 * 
 * @example
 * <motion.ul variants={staggerContainer(0.1, 0.2)}>
 *   <motion.li variants={fadeIn("up", "tween", 0, 0.3)}>Item 1</motion.li>
 *   <motion.li variants={fadeIn("up", "tween", 0, 0.3)}>Item 2</motion.li>
 * </motion.ul>
 * 
 * @orchestration Child elements animate sequentially with staggerChildren gap
 */
export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren || 0,
            },
        },
    };
};

/* ============================================
 * Apple-Style Animation Variants
 * 
 * Refined, subtle animations inspired by Apple's design language.
 * Uses slower spring physics for premium feel.
 * 
 * @see DOCS.md#animation-variants
 * ============================================ */

/**
 * Apple-style slide up with gentle spring physics.
 * Optimized for text and card entrances with refined motion.
 * 
 * @param {number} [delay=0] - Delay before animation starts (seconds)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @animation
 * - Transform: translateY(60px) → translateY(0)
 * - Opacity: 0 → 1
 * - Physics: stiffness=100, damping=20 (snappy, fast spring)
 */
export const appleSlideUp = (delay = 0) => ({
    hidden: {
        y: 60,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,  // Higher stiffness = faster animation
            damping: 20,    // Lower damping = quicker settle
            delay,
        },
    },
});

/**
 * Apple-style scale entrance from near-full size.
 * Subtle scale change creates depth without dramatic zoom.
 * 
 * @param {number} [delay=0] - Delay before animation starts (seconds)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @animation
 * - Transform: scale(0.95) → scale(1)
 * - Opacity: 0 → 1
 * - Physics: stiffness=120, damping=20
 */
export const appleScaleIn = (delay = 0) => ({
    hidden: {
        scale: 0.95,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay,
        },
    },
});

/**
 * Fade-in with CSS filter blur transition.
 * Creates depth-of-field effect during entrance.
 * 
 * @param {number} [delay=0] - Delay before animation starts (seconds)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @animation
 * - Filter: blur(10px) → blur(0px)
 * - Opacity: 0 → 1
 * - Easing: cubic-bezier(0.25, 0.1, 0.25, 1) - Apple's signature curve
 * - Duration: 0.6s
 * 
 * @performance Uses GPU-accelerated filter property
 */
export const appleFadeBlur = (delay = 0) => ({
    hidden: {
        opacity: 0,
        filter: "blur(10px)",
    },
    show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],  // Apple-style easing
            delay,
        },
    },
});

/**
 * Section-level orchestration variant.
 * Apply to parent container to coordinate child animations.
 * 
 * @constant
 * @type {Object}
 * 
 * @orchestration
 * - staggerChildren: 0.08s between each child
 * - delayChildren: 0.1s before first child starts
 */
export const sectionTransition = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

/**
 * Coordinated hero section animation sequence.
 * Each property targets a specific hero element with timed entrances.
 * 
 * @constant
 * @type {Object}
 * 
 * @property {Object} background - Background image scale-down (1.5s)
 * @property {Object} title - Main heading with blur entrance (delay: 0.3s)
 * @property {Object} subtitle - Secondary text (delay: 0.5s)
 * @property {Object} button - CTA button scale-in (delay: 0.7s)
 * @property {Object} footer - Bottom info fade (delay: 0.9s)
 * 
 * @timeline
 * 0.0s: Background starts scaling
 * 0.3s: Title begins entrance
 * 0.5s: Subtitle follows
 * 0.7s: Button appears
 * 0.9s: Footer info fades in
 */
export const heroSequence = {
    background: {
        hidden: { scale: 1.3, opacity: 0 },
        show: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    },
    title: {
        hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
        show: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3,
            },
        },
    },
    subtitle: {
        hidden: { y: 30, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.5,
            },
        },
    },
    button: {
        hidden: { scale: 0.9, opacity: 0 },
        show: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15,
                delay: 0.7,
            },
        },
    },
    footer: {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.9,
            },
        },
    },
};

/**
 * Scroll-triggered reveal animation with directional entrance.
 * Designed for use with `whileInView` trigger.
 * 
 * @param {"up"|"down"|"left"|"right"} [direction="up"] - Entrance direction
 * @param {number} [delay=0] - Delay before animation starts (seconds)
 * @returns {Object} Framer Motion variant with hidden/show states
 * 
 * @example
 * <motion.div
 *   variants={scrollReveal("up", 0.2)}
 *   initial="hidden"
 *   whileInView="show"
 *   viewport={{ once: true, amount: 0.3 }}
 * >
 * 
 * @animation
 * - Transform: translate(±80px) → translate(0)
 * - Opacity: 0 → 1
 * - Physics: stiffness=100, damping=20 (snappy, responsive)
 */
export const scrollReveal = (direction = "up", delay = 0) => {
    const directions = {
        up: { y: 80 },
        down: { y: -80 },
        left: { x: 80 },
        right: { x: -80 },
    };

    return {
        hidden: {
            ...directions[direction],
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay,
            },
        },
    };
};
