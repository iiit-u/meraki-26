/**
 * @fileoverview Animated route configuration with page transitions.
 * 
 * Uses React Router with Framer Motion AnimatePresence for coordinated
 * page enter/exit animations. Each route is wrapped in PageWrapper
 * for consistent transition behavior.
 * 
 * @see DOCS.md#animation-system for AnimatePresence behavior
 * @module components/AnimatedRoutes
 */

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import Contact from "./Contact";
import Gallery from "../pages/Gallery";
import Schedule from "../pages/Schedule";
import Team from "../pages/Team";
import DevTeam from "../pages/DevTeam";
import EventDetails from "../pages/EventDetails";
import WorkshopDetails from "../pages/WorkshopDetails";
import MerchandisePage from "../pages/MerchandisePage";
import Partners from "../pages/Partners";
import PageWrapper from "./PageWrapper";

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
        <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/schedule" element={<PageWrapper><Schedule /></PageWrapper>} />
        <Route path="/merchandise" element={<PageWrapper><MerchandisePage /></PageWrapper>} />
        <Route path="/partners" element={<PageWrapper><Partners /></PageWrapper>} />
        <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
        <Route path="/devteam" element={<PageWrapper><DevTeam /></PageWrapper>} />
        <Route path="/event/:eventId" element={<PageWrapper><EventDetails /></PageWrapper>} />
        <Route path="/workshop/:workshopSlug" element={<PageWrapper><WorkshopDetails /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
