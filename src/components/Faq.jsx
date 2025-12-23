/**
 * @fileoverview FAQ section with responsive masonry grid of flip cards.
 * 
 * Dynamically adjusts column count based on viewport width and distributes
 * FAQ items across columns for a balanced masonry layout. Each FAQ item
 * renders as a flip card using the Box component.
 * 
 * @see DOCS.md#responsive-breakpoints for column breakpoints
 * @see Box.jsx for flip card implementation
 * @component
 */

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import faq from "../assets/faq_minecraft_bg.webp";
import Box from "./Box";
import { appleSlideUp, sectionTransition } from "../utils/motion";
import { faqData } from "../constants";

/**
 * Transform FAQ data into indexed question objects.
 * @constant
 * @type {Array<{id: number, q: string, a: string}>}
 */
const questions = faqData.map((item, i) => ({
  id: i,
  q: item.question,
  a: item.answer,
}));

/**
 * FAQ section with masonry layout and scroll animations.
 * 
 * @returns {JSX.Element} FAQ section with flip cards
 * 
 * @state cols - Number of columns (1, 2, or 3 based on viewport)
 * @layout Masonry-style distribution: items distributed round-robin across columns
 */
export default function Faq() {
  /**
   * Responsive column count.
   * 
   * @breakpoints
   * - ≥1024px (lg): 3 columns
   * - ≥640px (sm): 2 columns
   * - <640px: 1 column
   */
  const [cols, setCols] = useState(() => {
    if (typeof window === "undefined") return 1;  // SSR fallback
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  });

  const sectionRef = useRef(null);

  /**
   * Scroll progress for section animations.
   * @offset Full viewport traversal
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /**
   * Scroll-linked transforms.
   * @contentOpacity Fade in/out at boundaries
   * @contentY Slide up on enter
   * @contentScale Subtle scale for depth
   */
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

  /**
   * Resize listener for responsive column count.
   * Updates layout when viewport crosses breakpoints.
   */
  useEffect(() => {
    function onResize() {
      const w = window.innerWidth;
      if (w >= 1024) setCols(3);
      else if (w >= 640) setCols(2);
      else setCols(1);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /**
   * Masonry distribution algorithm.
   * 
   * Distributes items round-robin across columns:
   * - Item 0 → Column 0
   * - Item 1 → Column 1
   * - Item 2 → Column 2
   * - Item 3 → Column 0 (wrap)
   * 
   * This creates a balanced masonry layout without calculating heights.
   */
  const columns = useMemo(() => {
    const arr = Array.from({ length: cols }, () => []);
    questions.forEach((item, idx) => {
      arr[idx % cols].push({ ...item, index: idx });
    });
    return arr;
  }, [cols]);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden"
      style={{
        paddingTop: "var(--navbar-height, 5rem)",
      }}
    >
      {/* Background Layer */}
      <motion.div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${faq})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* 
         * Top Gradient Blend
         * Transitions from Sponsors section (#0a0a0a)
         */}
        <div
          className="absolute top-0 left-0 right-0 h-[30vh] z-[1]"
          style={{
            background: "linear-gradient(to bottom, #0a0a0a, transparent)",
          }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30 z-[0]" />
      </motion.div>

      {/* Content with scroll-linked transforms */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col py-8 px-4 sm:px-6"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-3 md:gap-4 ml-2 sm:ml-4 md:ml-6 mb-8 md:mb-12"
          variants={appleSlideUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <span className="text-cyan-400 text-xl sm:text-2xl md:text-3xl">▶</span>
          <h2 className="font-minecraft text-white text-xl sm:text-2xl md:text-4xl tracking-widest uppercase">
            FAQs
          </h2>
        </motion.div>

        {/* 
         * Masonry FAQ Grid
         * 
         * Uses flexbox columns rather than CSS Grid for true masonry.
         * Each column is a flex-col, items stack vertically.
         */}
        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-6xl">
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              variants={sectionTransition}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {columns.map((colItems, colIdx) => (
                <motion.div
                  key={colIdx}
                  className="flex-1 flex flex-col gap-4 sm:gap-6"
                  variants={appleSlideUp(colIdx * 0.1)}  // Stagger by column
                >
                  {colItems.map((item) => (
                    <motion.div
                      key={item.index}
                      variants={appleSlideUp(0.05)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-30px" }}
                    >
                      <Box
                        question={item.q}
                        answer={item.a}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
