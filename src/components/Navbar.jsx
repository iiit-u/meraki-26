/**
 * @fileoverview Responsive navigation bar with scroll-aware styling.
 * 
 * Features a fixed navbar that changes appearance based on scroll position,
 * with a slide-in mobile menu. Uses glassmorphism (backdrop-filter) for
 * modern visual effects.
 * 
 * @see DOCS.md#glassmorphism for backdrop-filter usage
 * @see DOCS.md#responsive-breakpoints for mobile/desktop behavior
 * @component
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { scrollToSection } from "../utils/scrollToSection";
import { externalLinks } from "../constants";
import { useNavbarScroll } from "../hooks/useScrollSection";

/**
 * Fixed navigation bar component.
 * 
 * @returns {JSX.Element} Navbar with desktop links and mobile hamburger menu
 * 
 * @state isOpen - Mobile menu visibility toggle
 * @hook useNavbarScroll - Tracks scroll position for dynamic styling
 * 
 * @behavior
 * - Desktop (≥1024px): Horizontal navigation links
 * - Mobile (<1024px): Hamburger button with slide-in panel
 * - Scroll-aware background: Transparent at top, glassmorphism when scrolled
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  /**
   * Body scroll lock when mobile menu is open.
   * Prevents background scrolling while navigating menu.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Scroll state from custom hook
  const { isScrolled, isAtHero } = useNavbarScroll(50);

  /**
   * Dynamic background class based on scroll state.
   * 
   * @returns {string} Tailwind classes for navbar background
   * 
   * @states
   * - Menu open: Solid dark with blur (bg-black/95 backdrop-blur-md)
   * - At hero: Gradient fade (from-black/60 via-black/30 to-transparent)
   * - Scrolled: Glassmorphism with bottom border
   * - Default: Subtle gradient
   */
  const getNavBackground = () => {
    if (isOpen) return "bg-black/95 backdrop-blur-md";
    if (isAtHero) return "bg-gradient-to-b from-black/60 via-black/30 to-transparent";
    if (isScrolled) return "bg-black/90 backdrop-blur-xl border-b border-white/10";
    return "bg-gradient-to-b from-black/50 to-transparent";
  };

  /**
   * Navigate to hash section, handling cross-page navigation.
   * 
   * @param {string} sectionId - Target section DOM ID
   */
  const handleNavigation = (sectionId) => {
    if (window.location.pathname !== "/") {
      // Navigate to home then scroll to section
      navigate(`/#${sectionId}`);
    } else {
      scrollToSection(sectionId);
    }
    if (isOpen) toggleMenu();
  };

  // Navigation items configuration
  const navItems = [
    { type: "link", to: "/", label: "HOME" },
    { type: "button", action: () => handleNavigation("about"), label: "ABOUT" },
    { type: "link", to: "/schedule", label: "SCHEDULE" },
    { type: "link", to: "/gallery", label: "GALLERY" },
    { type: "link", to: "/team", label: "TEAM" },
    { type: "button", action: () => handleNavigation("partners"), label: "PARTNERS" },
    { type: "link", to: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      {/* 
       * Main Navbar Bar
       * 
       * @position fixed, z-50 for overlay above content
       * @animation Slide down on mount (y: -20 → 0)
       */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavBackground()}`}
      >
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-[72px] px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
          {/* Logo/Brand */}
          <Link
            to="/"
            onClick={() => isOpen && toggleMenu()}
            className="text-white font-minecraft text-base sm:text-lg lg:text-xl tracking-wider flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300 z-50"
          >
            <span className="text-cyan-400 text-[10px] sm:text-xs animate-pulse">►</span>
            <span>Meraki</span>
          </Link>

          {/* 
           * Desktop Navigation (lg: ≥1024px)
           * 
           * Horizontal link layout with hover underline effect.
           */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-5 xl:gap-6 font-pixel text-white/80 text-[11px] xl:text-xs tracking-widest">
              {navItems.map((item, index) => (
                item.type === "link" ? (
                  <Link
                    key={index}
                    to={item.to}
                    className="hover:text-white cursor-pointer hover:underline decoration-cyan-400 underline-offset-4 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.action}
                    className="hover:text-white cursor-pointer hover:underline decoration-cyan-400 underline-offset-4 transition-all duration-200"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
            {/* External IIIT Una link */}
            <div className="text-white/80 font-terminal text-sm xl:text-base tracking-wide border-l border-cyan-500/50 pl-5 ml-1">
              <a
                href={externalLinks.iiituWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                IIIT Una
              </a>
            </div>
          </div>

          {/* 
           * Mobile Hamburger Button
           * 
           * @animation 90° rotation on open/close
           * @accessibility aria-label for screen readers
           */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-50 w-10 h-10 flex items-center justify-center text-white focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* 
       * Mobile Menu Overlay System
       * 
       * Uses AnimatePresence for coordinated enter/exit animations.
       * Consists of:
       * 1. Backdrop - Semi-transparent blur overlay
       * 2. Panel - Slide-in menu from right
       */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 
             * Backdrop Overlay
             * 
             * @animation Fade in/out (opacity 0 → 1)
             * @interaction Click dismisses menu
             */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* 
             * Slide-in Menu Panel
             * 
             * @animation Slide from right (x: 100% → 0)
             * @border Gradient left border for visual accent
             */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#1a1a1a] z-40 lg:hidden shadow-2xl"
              style={{
                borderLeft: "3px solid",
                /* Cyan-to-purple gradient border */
                borderImage: "linear-gradient(180deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%) 1",
              }}
            >
              {/* Menu Header */}
              <div className="h-14 sm:h-16 flex items-center px-5 border-b border-white/10">
                <span className="font-minecraft text-cyan-400 text-sm tracking-wider">MENU</span>
              </div>

              {/* 
               * Menu Items with Staggered Animation
               * 
               * Each item animates in sequence with increasing delay.
               * @animation opacity: 0→1, x: 20→0
               * @delay 0.05s + (index × 0.04s)
               */}
              <div className="flex flex-col py-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                  >
                    {item.type === "link" ? (
                      <Link
                        to={item.to}
                        onClick={toggleMenu}
                        className="flex items-center px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/5 font-pixel text-sm tracking-wider transition-all border-l-2 border-transparent hover:border-cyan-400"
                      >
                        <span className="text-cyan-400/60 mr-3 text-xs">▸</span>
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="flex items-center w-full px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/5 font-pixel text-sm tracking-wider transition-all border-l-2 border-transparent hover:border-cyan-400 text-left"
                      >
                        <span className="text-cyan-400/60 mr-3 text-xs">▸</span>
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}

                {/* Gradient Divider */}
                <div className="my-3 mx-5 h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

                {/* External Link */}
                <motion.a
                  href={externalLinks.iiituWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center px-5 py-3.5 text-white/60 hover:text-cyan-400 font-terminal text-sm tracking-wide transition-all"
                >
                  <span className="mr-3">↗</span>
                  IIIT Una Website
                </motion.a>
              </div>

              {/* Footer Branding */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-center">
                  <span className="font-pixel text-[10px] text-white/30 tracking-wider">
                    MERAKI 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
