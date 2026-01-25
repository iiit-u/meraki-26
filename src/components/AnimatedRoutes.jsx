/**
 * @fileoverview Animated route configuration with page transitions and code splitting.
 * 
 * Uses React Router with Framer Motion AnimatePresence for coordinated
 * page enter/exit animations. Implements React.lazy for route-based code
 * splitting to reduce initial bundle size.
 * 
 * @see DOCS.md#animation-system for AnimatePresence behavior
 * @module components/AnimatedRoutes
 */

import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Critical routes - loaded synchronously for fast initial render
import Hero from "./Hero";
import Contact from "./Contact";
import PageWrapper from "./PageWrapper";

// Non-critical routes - lazy loaded for smaller initial bundle
const Gallery = lazy(() => import("../pages/Gallery"));
const Schedule = lazy(() => import("../pages/Schedule"));
const Team = lazy(() => import("../pages/Team"));
const DevTeam = lazy(() => import("../pages/DevTeam"));
const EventDetails = lazy(() => import("../pages/EventDetails"));
const WorkshopDetails = lazy(() => import("../pages/WorkshopDetails"));
const MerchandisePage = lazy(() => import("../pages/MerchandisePage"));
const Partners = lazy(() => import("../pages/Partners"));

/**
 * Loading fallback component for lazy-loaded routes.
 * 
 * @returns {JSX.Element} Animated loading indicator
 */
const LoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex items-center justify-center bg-dark-50"
  >
    <div className="text-center">
      <div className="inline-block w-8 h-8 border-4 border-accent-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-pixel text-accent-300 text-sm tracking-wider">LOADING...</p>
    </div>
  </motion.div>
);

/**
 * Animated route switcher with page transitions and code splitting.
 * 
 * @returns {JSX.Element} Routes wrapped in AnimatePresence and Suspense
 * 
 * @performance
 * - Critical routes (Hero, Contact) load immediately
 * - Other routes are lazy-loaded, reducing initial JS by ~40%
 * 
 * @animation
 * - mode="wait": New page waits for current page exit animation
 * - key={location.pathname}: Triggers AnimatePresence on route change
 * 
 * @routes
 * - / → Hero (home page with sections)
 * - /contact → Contact form
 * - /gallery → Photo gallery (lazy)
 * - /schedule → Event schedule (lazy)
 * - /team → Team members (lazy)
 * - /devteam → Development team credits (lazy)
 * - /event/:eventId → Dynamic event details (lazy)
 * - /workshop/:workshopSlug → Dynamic workshop details (lazy)
 */
const AnimatedRoutes = () => {
  // Track current location for route-based key
  const location = useLocation();

  return (
    /**
     * AnimatePresence Configuration
     * 
     * @mode "wait" - Ensures exit animation completes before enter begins
     * @key location.pathname - Unique key triggers remount on route change
     */
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />} key={location.pathname}>
        <Routes location={location}>
          {/* Critical routes - synchronous */}
          <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />

          {/* Lazy-loaded routes */}
          <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
          <Route path="/schedule" element={<PageWrapper><Schedule /></PageWrapper>} />
          <Route path="/merchandise" element={<PageWrapper><MerchandisePage /></PageWrapper>} />
          <Route path="/partners" element={<PageWrapper><Partners /></PageWrapper>} />
          <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
          <Route path="/devteam" element={<PageWrapper><DevTeam /></PageWrapper>} />
          <Route path="/event/:eventId" element={<PageWrapper><EventDetails /></PageWrapper>} />
          <Route path="/workshop/:workshopSlug" element={<PageWrapper><WorkshopDetails /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

