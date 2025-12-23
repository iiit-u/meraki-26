/**
 * @fileoverview Utility functions for programmatic scrolling and hash navigation.
 * 
 * Handles smooth scrolling to page sections and URL hash-based navigation
 * with support for animated page transitions.
 * 
 * @see DOCS.md#design-patterns
 * @module utils/scrollToSection
 */

/**
 * Scrolls the viewport to a target section element.
 * Uses native smooth scrolling behavior.
 * 
 * @param {string} sectionId - DOM id attribute of target section (without #)
 * @returns {void}
 * 
 * @example
 * scrollToSection("about");  // Scrolls to <section id="about">
 * 
 * @behavior
 * - Uses `Element.scrollIntoView()` with smooth behavior
 * - Aligns section top with viewport top (`block: 'start'`)
 * - No-op if element doesn't exist
 */
export const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

/**
 * Handles URL hash navigation with retry logic for animated transitions.
 * 
 * When navigating from another route (e.g., /gallery → /#about), the target
 * element may not exist immediately due to page transition animations.
 * This function retries finding the element with exponential backoff.
 * 
 * @returns {void}
 * 
 * @example
 * // In useEffect after route change:
 * if (location.hash) {
 *   handleHashNavigation();
 * }
 * 
 * @algorithm
 * 1. Extract section ID from URL hash
 * 2. Wait 100ms for exit animation to start
 * 3. Attempt to find and scroll to element
 * 4. If not found, retry up to 10 times (100ms intervals = 1s max wait)
 * 
 * @timing
 * - Initial delay: 100ms (allows exit animation to begin)
 * - Retry interval: 100ms
 * - Max attempts: 10 (1 second total)
 */
export const handleHashNavigation = () => {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);  // Remove leading #

        /**
         * Recursive scroll attempt with retry counter.
         * @param {number} attempts - Current attempt count
         */
        const attemptScroll = (attempts = 0) => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (attempts < 10) {
                // Element not yet in DOM, retry after 100ms
                setTimeout(() => attemptScroll(attempts + 1), 100);
            }
            // After 10 attempts (1s), give up silently
        };

        // Initial delay allows AnimatePresence exit to begin
        setTimeout(() => attemptScroll(), 100);
    }
};
