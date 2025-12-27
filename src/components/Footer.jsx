/**
 * @fileoverview Site footer with coordinators, links, and social media.
 * 
 * Features a Minecraft-styled footer with two-tone background, coordinator
 * contact info, institutional logos, and navigation links. Includes
 * configurable decorative block squares.
 * 
 * @see DOCS.md#animation-system for fadeIn and zoomIn animations
 * @component
 */

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import iiituLogo from "../assets/iiitu_logo.webp";
import merakiLogo from "../assets/meraki_minecraft.webp";
import {
  footerSocialLinks as socialLinks,
  otherFests,
  footerQuickLinks as quickLinks,
  footerCoordinators as coordinators,
} from "../constants";
import { fadeIn, staggerContainer, zoomIn } from "../utils/motion";

/**
 * Site footer component.
 * 
 * @returns {JSX.Element} Footer with coordinators, logos, and links
 * 
 * @layout
 * - Coordinators section (top)
 * - Logo section with IIIT Una and Meraki logos
 * - Three-column grid: Other Fests | Social Links | Quick Links
 * - Credits row (bottom)
 * 
 * @background Two-tone with configurable decorative blocks
 */
const Footer = () => {
  /**
   * Base block size for decorative squares.
   * @constant {number}
   */
  const blockSize = 17;
  
  /**
   * Size for the custom decorative triangular squares.
   * Responsive: 35px on mobile, 40px on tablet, 50px on desktop
   * @constant {number}
   */
  const customSquareSize = 35; // Base size for mobile

  /**
   * Decorative colored squares for footer background.
   * 
   * @type {Array<{x: number, y: number, color: string}>}
   * 
   * HOW TO ADD COLORED SQUARES:
   * 
   * @property {number} x - Horizontal position (0-40 scale, where 40 = 100% width)
   *   - x: 5 places at ~12.5% from left
   *   - x: 20 places at center (50%)
   *   - x: 35 places at ~87.5% from left
   * 
   * @property {number} y - Vertical position (blocks from 38% line)
   *   - Each unit = 25px (blockSize)
   *   - y: 0 = at color transition
   *   - y: 4 = 100px below transition
   * 
   * @property {string} color - CSS color value
   *   - "#C4A962" (gold)
   *   - "rgba(255, 255, 255, 0.3)" (transparent)
   * 
   * @example
   * const fixedSquares = [
   *   { x: 5, y: 2, color: "#C4A962" },
   *   { x: 20, y: 4, color: "#FF5733" },
   * ];
   */
  const fixedSquares = [
    // Upper section triangles (in #303030 lighter section - negative y values)
    // Left triangle pattern - with gap on mobile
    { x: 6, y: -1, color: "#242424", xMobile: 0, xDesktop: 6 },
    { x: 7, y: -2, color: "#242424", xMobile: 3, xDesktop: 7 },
    { x: 8, y: -1, color: "#242424", xMobile: 6, xDesktop: 8 },
    
    // Right triangle pattern - with gap on mobile
    { x: 30, y: -1, color: "#242424", xMobile: 32, xDesktop: 30.5 },
    { x: 32, y: -2, color: "#242424", xMobile: 35, xDesktop: 32 },
    { x: 33, y: -1, color: "#242424", xMobile: 38, xDesktop: 33 },
    
    // Two #303030 colored squares (responsive size with gap on mobile)
    // Square 1 - More spacing on mobile screens
    { x: 7, y: 0, color: "#303030", size: 35, xMobile: 9, xDesktop: 10 },
    // Square 2 - More spacing on mobile screens  
    { x: 33, y: 0, color: "#303030", size: 35, xMobile: 29, xDesktop: 29.5 },
  ];

  // Top border squares - creating a line of squares with gaps
  // Small: fewer squares with larger gaps, Medium: 40 squares, Large: 80 squares
  const topBorderSquaresSmall = [];
  const topBorderSquaresMedium = [];
  const topBorderSquaresLarge = [];
  
  // For small screens, use larger increment (3) to create bigger gaps
  for (let i = 0; i <= 30; i += 3) {
    topBorderSquaresSmall.push({ x: i, max: 30 });
  }
  for (let i = 0; i <= 40; i += 2) {
    topBorderSquaresMedium.push({ x: i, max: 40 });
  }
  for (let i = 0; i <= 80; i += 2) {
    topBorderSquaresLarge.push({ x: i, max: 80 });
  }

  return (
    <footer
      className="relative w-full overflow-visible"
      style={{ fontFamily: "'Press Start 2P', cursive" }}
    >
      {/* 
       * Top Border Squares - Small screens
       * 
       * Creates a line of squares at the top with gaps between them
       * Positioned so half the square is above the footer
       */}
      <div className="absolute top-[-12.5px] left-0 right-0 h-[25px] pointer-events-none z-10 overflow-hidden sm:hidden">
        {topBorderSquaresSmall.map((square, idx) => (
          <div
            key={`top-sm-${idx}`}
            className="absolute"
            style={{
              width: `${blockSize}px`,
              height: `${blockSize}px`,
              left: `calc(${(square.x / square.max) * 100}%)`,
              top: 0,
              backgroundColor: "#808080",
              boxShadow: "none",
            }}
          />
        ))}
      </div>

      {/* Top Border Squares - Medium screens */}
      <div className="absolute top-[-12.5px] left-0 right-0 h-[25px] pointer-events-none z-10 overflow-hidden hidden sm:block lg:hidden">
        {topBorderSquaresMedium.map((square, idx) => (
          <div
            key={`top-md-${idx}`}
            className="absolute"
            style={{
              width: `${blockSize}px`,
              height: `${blockSize}px`,
              left: `calc(${(square.x / square.max) * 100}%)`,
              top: 0,
              backgroundColor: "#808080",
              boxShadow: "none",
            }}
          />
        ))}
      </div>

      {/* Top Border Squares - Large screens */}
      <div className="absolute top-[-12.5px] left-0 right-0 h-[25px] pointer-events-none z-10 overflow-hidden hidden lg:block">
        {topBorderSquaresLarge.map((square, idx) => (
          <div
            key={`top-lg-${idx}`}
            className="absolute"
            style={{
              width: `${blockSize}px`,
              height: `${blockSize}px`,
              left: `calc(${(square.x / square.max) * 100}%)`,
              top: 0,
              backgroundColor: "#808080",
              boxShadow: "none",
            }}
          />
        ))}
      </div>

      {/* 
       * Background Layers
       * 
       * Two-tone split: lighter gray (38% top), darker gray (62% bottom)
       * Mimics Minecraft block transition effect.
       */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top section - lighter gray - 45% on mobile, 38% on desktop */}
        <div
          className="absolute top-0 left-0 right-0 lg:hidden"
          style={{
            height: "45%",
            backgroundColor: "#303030",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 hidden lg:block"
          style={{
            height: "38%",
            backgroundColor: "#303030",
          }}
        />
        {/* Bottom section - darker gray - 55% on mobile, 62% on desktop */}
        <div
          className="absolute bottom-0 left-0 right-0 lg:hidden"
          style={{
            height: "55%",
            backgroundColor: "#242424",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 hidden lg:block"
          style={{
            height: "62%",
            backgroundColor: "#242424",
          }}
        />

        {/* 
         * Decorative Block Rendering
         * 
         * Positions each square based on x (percentage) and y (pixels).
         * Squares appear in the dark bottom section.
         * Responsive sizing: 35px (mobile), 40px (tablet), 50px (desktop)
         */}
        {fixedSquares.map((square, idx) => {
          const baseSize = square.size || customSquareSize;
          // Calculate responsive sizes
          const smSize = baseSize + 5;  // 40px for tablets
          const lgSize = baseSize + 15; // 50px for desktop
          
          // Use different x positions for mobile vs desktop if specified
          const xMobile = square.xMobile !== undefined ? square.xMobile : square.x;
          const xDesktop = square.xDesktop !== undefined ? square.xDesktop : square.x;
          
          return (
            <React.Fragment key={idx}>
              {/* Mobile view - 35px with 45% split */}
              <div
                className="absolute sm:hidden"
                style={{
                  width: `${baseSize}px`,
                  height: `${baseSize}px`,
                  left: `calc(${(xMobile / 40) * 100}%)`,
                  top: `calc(45% + ${square.y * baseSize}px)`,
                  backgroundColor: square.color,
                }}
              />
              {/* Tablet view - 40px with 45% split */}
              <div
                className="absolute hidden sm:block lg:hidden"
                style={{
                  width: `${smSize}px`,
                  height: `${smSize}px`,
                  left: `calc(${(xMobile / 40) * 100}%)`,
                  top: `calc(45% + ${square.y * smSize}px)`,
                  backgroundColor: square.color,
                }}
              />
              {/* Desktop view - 50px with 38% split (unchanged) */}
              <div
                className="absolute hidden lg:block"
                style={{
                  width: `${lgSize}px`,
                  height: `${lgSize}px`,
                  left: `calc(${(xDesktop / 40) * 100}%)`,
                  top: `calc(38% + ${square.y * lgSize}px)`,
                  backgroundColor: square.color,
                }}
              />
            </React.Fragment>
          );
        })}
      </div>

      {/* Content Container with stagger animation */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 px-4 sm:px-8 md:px-16 pt-8 md:pt-10 pb-6 md:pb-9"
      >
        {/* 
         * Coordinators Section
         * 
         * Displays event coordinator contact information.
         * Animations: fadeIn("down") with staggered delays.
         */}
        <motion.div
          variants={fadeIn("down", "tween", 0.2, 0.6)}
          className="text-center mb-6 lg:mb-2 md:mb-3"
        >
          <h2
            className="text-white text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 tracking-[0.2em] sm:tracking-[0.3em]"
            style={{ letterSpacing: "0.3em" }}
          >
            COORDINATORS
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-8 sm:gap-16 md:gap-32">
            {coordinators.map((coordinator, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                variants={fadeIn("down", "spring", idx * 0.2 + 0.3, 0.75)}
              >
                <h3
                  className="text-white text-sm sm:text-base md:text-lg mb-2"
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: "clamp(28px, 5vw, 32px)",
                  }}
                >
                  {coordinator.name}
                </h3>
                <p
                  className="text-white text-[8px] sm:text-[10px] md:text-xs mb-1"
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: "clamp(20px, 3vw, 18px)",
                  }}
                >
                  {coordinator.email}
                </p>
                <p
                  className="text-white text-[8px] sm:text-[10px] md:text-xs mb-1"
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: "clamp(20px, 3vw, 18px)",
                  }}
                >
                  {coordinator.phone}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 
         * Logo Section
         * 
         * Displays IIIT Una and Meraki logos with zoomIn animation.
         */}
        <motion.div
          variants={zoomIn(0.4, 0.6)}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-3 md:mt-4 mb-3 md:mb-4 py-2 md:py-3"
        >
          {/* IIIT Una Logo + Text */}
          <div className="flex items-center justify-center gap-3 md:gap-4 w-56 sm:w-64">
            <div className="text-right">
              <p
                className="text-white text-[8px] sm:text-[10px] md:text-xs leading-tight"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                Indian Institute of
              </p>
              <p
                className="text-white text-[8px] sm:text-[10px] md:text-xs leading-tight"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                Information
              </p>
              <p
                className="text-white text-[8px] sm:text-[10px] md:text-xs leading-tight"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                Technology Una
              </p>
            </div>
            <img
              src={iiituLogo}
              alt="IIIT Una Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
            />
          </div>

          {/* Vertical dashed divider (desktop only) */}
          <div
            className="hidden sm:block h-16 md:h-20 mx-4 md:mx-8"
            style={{
              borderLeft: "2px dashed rgba(255, 255, 255, 0.3)",
            }}
          />

          {/* Meraki Logo */}
          <div className="flex items-center justify-center w-56 sm:w-64">
            <img
              src={merakiLogo}
              alt="Meraki Logo"
              className="h-12 sm:h-16 md:h-20 object-contain mx-auto"
            />
          </div>
        </motion.div>

        {/* Horizontal divider */}
        <div className="w-full max-w-4xl mx-auto h-px bg-gray-500/60 mb-3 md:mb-4" />

        {/* 
         * Three-Column Navigation Grid
         * 
         * Other Fests | Connect With Us | Quick Links
         * Responsive: stacked on mobile, grid on sm+
         */}
        <motion.div
          variants={fadeIn("up", "tween", 0.5, 0.5)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-4 md:mb-6 text-center"
        >
          {/* Other Fests Column */}
          <div>
            <h4
              className="text-white text-xs sm:text-sm mb-3 md:mb-4 tracking-wider"
              style={{ letterSpacing: "0.15em" }}
            >
              OTHER FESTS
            </h4>
            <ul className="space-y-1 md:space-y-2">
              {otherFests.map((fest, idx) => (
                <li key={idx}>
                  <a
                    href={fest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-[8px] sm:text-[10px] hover:text-[#C4A962] transition-colors duration-300"
                    style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: "clamp(14px, 2.5vw, 18px)",
                    }}
                  >
                    {fest.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div>
            <h4
              className="text-white text-xs sm:text-sm mb-3 md:mb-4 tracking-wider"
              style={{ letterSpacing: "0.15em" }}
            >
              CONNECT WITH US
            </h4>
            <div className="flex justify-center gap-3 md:gap-4">
              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C4A962] transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C4A962] transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C4A962] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4
              className="text-white text-xs sm:text-sm mb-3 md:mb-4 tracking-wider"
              style={{ letterSpacing: "0.15em" }}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-1 md:space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  {link.external ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-[8px] sm:text-[10px] hover:text-[#C4A962] transition-colors duration-300"
                      style={{
                        fontFamily: "'VT323', monospace",
                        fontSize: "clamp(14px, 2.5vw, 18px)",
                      }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.url}
                      className="text-gray-400 text-[8px] sm:text-[10px] hover:text-[#C4A962] transition-colors duration-300"
                      style={{
                        fontFamily: "'VT323', monospace",
                        fontSize: "clamp(14px, 2.5vw, 18px)",
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Credits Row */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center pt-2 md:pt-3 pb-1 border-t border-gray-700/50 gap-2 sm:gap-0"
          variants={fadeIn("up", "tween", 0.6, 0.5)}
        >
          <p
            className="text-gray-400 text-[8px] sm:text-[10px] order-2 sm:order-1"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(10px, 2vw, 14px)",
            }}
          >
            ©2026 MERAKI - TechFest IIIT UNA
          </p>
          <p
            className="text-gray-400 text-[8px] sm:text-[10px] order-1 sm:order-2"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(10px, 2vw, 14px)",
            }}
          >
            Developed by{" "}
            <Link
              to="/devteam"
              className="text-[#C4A962] hover:text-cyan-400 transition-colors duration-300"
            >
              DEVTEAM
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
