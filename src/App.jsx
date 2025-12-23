/**
 * @fileoverview Application root component with Lenis smooth scroll.
 * 
 * Sets up React Router, smooth scrolling via Lenis library, hash navigation
 * handling, and the main application layout (Navbar, Routes, Footer).
 * 
 * @see DOCS.md#design-patterns for scroll behavior
 * @module App
 */

import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
import { handleHashNavigation } from "./utils/scrollToSection";

/**
 * Hash navigation handler component.
 * 
 * Listens for route changes and scrolls to hash target if present,
 * otherwise scrolls to top. Handles delayed scroll for animated transitions.
 * 
 * @returns {null} Renders nothing, side-effect only
 */
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Has hash target, use retry-based scroll
      handleHashNavigation();
    } else {
      // No hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

import Lenis from 'lenis';

/**
 * Root application component.
 * 
 * @returns {JSX.Element} Application with router and smooth scroll
 * 
 * @libraries
 * - Lenis: Smooth scroll library with inertia
 * - React Router: Client-side routing
 * 
 * @layout
 * - Navbar (fixed, z-50)
 * - AnimatedRoutes (main content)
 * - Footer
 */
function App() {
  /**
   * Lenis smooth scroll initialization.
   * 
   * Lenis provides smooth, inertia-based scrolling that enhances
   * the native scroll experience. It's exposed globally for use
   * in components (e.g., Hero button smooth scroll).
   * 
   * @see https://github.com/studio-freight/lenis
   */
  useEffect(() => {
    const lenis = new Lenis();

    // Expose for global access (used in Hero CTA button)
    window.lenis = lenis;

    /**
     * Animation frame loop for Lenis.
     * Lenis requires continuous RAF updates to process scroll.
     */
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <ScrollToHash />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
