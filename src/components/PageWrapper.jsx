/**
 * @fileoverview Page wrapper component with enter/exit animations.
 * 
 * Wraps page content to provide consistent entrance and exit transitions
 * when navigating between routes. Works with AnimatePresence in AnimatedRoutes.
 * Includes Suspense boundary for lazy-loaded route components.
 * 
 * @see DOCS.md#animation-system for animation timing
 * @component
 */

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { PageLoader } from "./MinecraftLoader";

/**
 * Page transition animation variants.
 * 
 * @constant
 * @type {Object}
 * 
 * @animation
 * - initial: Page enters from below (y: 20px), slightly scaled down
 * - animate: Moves to natural position, full scale, full opacity
 * - exit: Moves upward (y: -20px), scales down, fades out
 * 
 * @timing
 * - Enter: 0.6s with easeOut
 * - Exit: 0.4s with easeIn (faster for snappier navigation feel)
 */
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: {
            duration: 0.4,
            ease: "easeIn",
        },
    },
};

/**
 * Page transition wrapper component.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to wrap
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {boolean} [props.suspense=true] - Whether to wrap in Suspense
 * @returns {JSX.Element} Motion-wrapped page content
 * 
 * @example
 * <PageWrapper>
 *   <HomePage />
 * </PageWrapper>
 */
const PageWrapper = ({ children, className = "", suspense = true }) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`w-full min-h-screen ${className}`}
        >
            {suspense ? (
                <Suspense fallback={<PageLoader />}>
                    {children}
                </Suspense>
            ) : (
                children
            )}
        </motion.div>
    );
};

export default PageWrapper;
