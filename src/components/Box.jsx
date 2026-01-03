/**
 * @fileoverview FAQ flip card component with CSS 3D transforms.
 * 
 * Implements a card that flips on hover to reveal answer content.
 * Uses CSS 3D perspective and transform properties for the flip effect.
 * 
 * @see DOCS.md#3d-css-transforms for perspective and backface-visibility
 * @see DOCS.md#minecraft-bevel-borders for border styling
 * @component
 */

import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Interactive flip card for FAQ display.
 * 
 * @param {Object} props
 * @param {string} props.question - Front face content (question text)
 * @param {string} props.answer - Back face content (answer text)
 * @returns {JSX.Element} Flippable card with question/answer
 * 
 * @interaction
 * - mouseEnter: Triggers 180° Y-axis rotation to show back
 * - mouseLeave: Returns to front face (0° rotation)
 * 
 * @css
 * - perspective: 1000px on container for 3D depth
 * - transform-style: preserve-3d for child 3D context
 * - backface-visibility: hidden to hide reversed face
 */
export default function Box({ question, answer }) {
  // Track flip state for controlled animation
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full cursor-pointer self-start group"
      style={{
        /**
         * CSS Perspective
         * 
         * Sets the distance between z=0 plane and viewer.
         * Lower values = more dramatic 3D effect.
         * 1000px provides subtle depth without distortion.
         */
        perspective: "1000px"
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"  // Smooth acceleration/deceleration
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        style={{
          /**
           * transform-style: preserve-3d
           * 
           * Enables 3D space for child elements.
           * Without this, children would be flattened
           * and backface-visibility wouldn't work.
           */
          transformStyle: "preserve-3d"
        }}
      >
        {/* 
         * Front Face - Question
         * 
         * @border Minecraft bevel: light top-left, dark bottom-right
         * @visibility Hidden when rotated past 90° (facing away)
         */}
        <div
          className="w-full bg-[#474747] transition-all duration-300"
          style={{
            backfaceVisibility: "hidden",
            /**
             * Minecraft-style 3D bevel border
             * 
             * Asymmetric colors simulate light source from top-left:
             * - Top: #888888 (highlight)
             * - Right: #1a1a1a (shadow)  
             * - Bottom: #1a1a1a (shadow)
             * - Left: #666666 (mid-highlight)
             */
            border: "3px solid",
            borderColor: "#888888 #1a1a1a #1a1a1a #666666",
            minHeight: "120px",
          }}
        >
          {/* 
           * Inner frame with inverted bevel
           * Creates inset/recessed appearance
           */}
          <div
            className="bg-[#3a3a3a] p-5 md:p-6 h-full flex items-center justify-center"
            style={{
              border: "2px solid",
              borderColor: "#2a2a2a #555555 #555555 #2a2a2a",
              minHeight: "120px",
            }}
          >
            <p className="font-minecraft text-sm md:text-base text-white leading-relaxed tracking-wide text-center">
              {question}
            </p>
          </div>
        </div>

        {/* 
         * Back Face - Answer
         * 
         * Pre-rotated 180° so it faces correctly when card is flipped.
         * Uses cyan accent border to indicate revealed state.
         */}
        <div
          className="w-full bg-[#474747] absolute top-0 left-0 h-full"
          style={{
            backfaceVisibility: "hidden",
            /**
             * Pre-rotation
             * 
             * Back face is rotated 180° by default.
             * When parent rotates 180°, this results in
             * 180 + 180 = 360° (facing forward).
             */
            transform: "rotateY(180deg)",
            // Cyan-accented border for answer state
            border: "3px solid",
            borderColor: "#22d3ee #0e4a4a #0e4a4a #06b6d4",
            minHeight: "120px",
          }}
        >
          <div
            className="bg-[#3a3a3a] p-5 md:p-6 h-full flex items-center justify-center"
            style={{
              border: "2px solid",
              borderColor: "#2a2a2a #555555 #555555 #2a2a2a",
              minHeight: "120px",
            }}
          >
            <p className="font-terminal text-sm md:text-base text-gray-50 leading-relaxed text-center">
              {answer}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
