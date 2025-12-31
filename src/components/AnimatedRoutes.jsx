/**
 * @fileoverview Animated route configuration with page transitions.
 * 
 * Uses React Router with Framer Motion AnimatePresence for coordinated
 * page enter/exit animations. Each route is wrapped in PageWrapper
 * for consistent transition behavior.
 * 
 * Code-splitting is implemented using React.lazy() for route-based chunks.
 * Suspense boundaries are handled by PageWrapper for consistency.
 * 
 * @see DOCS.md#animation-system for AnimatePresence behavior
 * @module components/AnimatedRoutes
 */

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import PageWrapper from "./PageWrapper";

// Lazy-loaded page components for code-splitting
const Contact = React.lazy(() => import("./Contact"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const Schedule = React.lazy(() => import("../pages/Schedule"));
const Team = React.lazy(() => import("../pages/Team"));
const DevTeam = React.lazy(() => import("../pages/DevTeam"));
const EventDetails = React.lazy(() => import("../pages/EventDetails"));
const WorkshopDetails = React.lazy(() => import("../pages/WorkshopDetails"));

/**
 * Animated route switcher with page transitions.
 * 
 * @returns {JSX.Element} Routes wrapped in AnimatePresence
 * 
 * @animation
 * - mode="wait": New page waits for current page exit animation
 * - key={location.pathname}: Triggers AnimatePresence on route change
 * 
 * @routes
 * - / → Hero (home page with sections)
 * - /contact → Contact form
 * - /gallery → Photo gallery
 * - /schedule → Event schedule
 * - /team → Team members
 * - /devteam → Development team credits
 * - /event/:eventId → Dynamic event details
 * - /workshop/:workshopSlug → Dynamic workshop details
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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper suspense={false}><Hero /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/schedule" element={<PageWrapper><Schedule /></PageWrapper>} />
        <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
        <Route path="/devteam" element={<PageWrapper><DevTeam /></PageWrapper>} />
        <Route path="/event/:eventId" element={<PageWrapper><EventDetails /></PageWrapper>} />
        <Route path="/workshop/:workshopSlug" element={<PageWrapper><WorkshopDetails /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
