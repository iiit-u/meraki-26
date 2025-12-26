/**
 * @fileoverview Photo gallery page with collection-based organization.
 * 
 * Displays photo collections in a responsive grid with modal viewer.
 * Uses Vite's import.meta.glob for dynamic image loading.
 * 
 * @see DOCS.md#animation-system for staggered grid animations
 * @page /gallery
 */

import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import galleryBg from "../assets/gallery.webp";
import openingPlaceholder from "../assets/gallery/opening/IMG_1212-2.webp";
import workshopPlaceholder from "../assets/gallery/workshop/IMG_0039.webp";
import softwarePlaceholder from "../assets/gallery/software/IMG_2418.webp";
import eliteEventsPlaceholder from "../assets/gallery/elite_events/DSC01962.webp";
import roboticsPlaceholder from "../assets/gallery/robotics/DSC01465.webp";
import { galleryCollections } from "../constants";

/**
 * Gallery page component with photo collections.
 * 
 * @returns {JSX.Element} Gallery page with collection grid and modal
 * 
 * @state selectedCollection - Currently open collection (null = grid view)
 * 
 * @features
 * - Dynamic image loading via import.meta.glob
 * - Modal lightbox for collection viewing
 * - Responsive grid (1→2→3 columns)
 * - Scroll-linked content animations
 */
const Gallery = () => {
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCollection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCollection]);

  /**
   * Dynamically load and organize images by folder.
   * 
   * @algorithm
   * 1. Use Vite's import.meta.glob to find all images
   * 2. Parse paths to extract folder names
   * 3. Group images by folder
   * 4. Merge with galleryCollections metadata
   * 
   * @memoized Expensive glob operation cached until collections change
   */
  const populatedCollections = useMemo(() => {
    // Glob all images from gallery subdirectories
    const glob = import.meta.glob('../assets/gallery/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });
    const imagesByFolder = {};

    // Parse paths and group by folder
    for (const path in glob) {
      const parts = path.split('/');
      // Expected: ../assets/gallery/<folder>/<image>
      const folder = parts[parts.length - 2];
      const imgUrl = glob[path].default;

      if (!imagesByFolder[folder]) {
        imagesByFolder[folder] = [];
      }
      imagesByFolder[folder].push(imgUrl);
    }

    // Merge with collection metadata
    return galleryCollections.map(col => ({
      ...col,
      images: imagesByFolder[col.folder] || [],
      count: (imagesByFolder[col.folder] || []).length
    }));
  }, []);

  /**
   * Animation variants for staggered grid entrance.
   * @physics Spring-based with reduced stiffness for smooth animation
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 25
      }
    }
  };

  // Scroll-based animations
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative text-white pt-20 sm:pt-24 pb-12 sm:pb-16"
      style={{
        backgroundImage: `url(${galleryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",  // Fixed for mobile performance
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Page Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400"></div>
            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              EVENT MEMORIES
            </h2>
            <div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400"></div>
          </div>
          <h1
            className="font-minecraft text-3xl sm:text-5xl md:text-7xl text-white mb-3 sm:mb-4 tracking-wider"
            style={{
              textShadow:
                "3px 3px 0px #000, 2px 2px 0px rgba(6, 182, 212, 0.5)",
            }}
          >
            GALLERY
          </h1>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.div>

        {/* 
         * Gallery Grid Container
         * 
         * Two-section layout:
         * - Left: Opening section (vertical, full height)
         * - Right: 4 other sections in a 2x2 grid
         */}
        <motion.div
          className="border-4 sm:border-8 border-black border-dotted p-4 sm:p-6 md:p-8 bg-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex flex-col md:flex-row gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Left Section - Opening (vertical) */}
            {populatedCollections
              .filter(collection => collection.id === 'opening')
              .map((collection) => (
                <motion.div
                  key={collection.id}
                  variants={itemVariants}
                  onClick={() => setSelectedCollection(collection)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-3 sm:border-4 border-black bg-gray-100 cursor-pointer 
                    hover:bg-gray-200 active:bg-gray-300 transition-colors
                    flex flex-col items-center justify-end p-4 sm:p-6 overflow-hidden relative
                    min-h-[200px] md:min-h-[600px] md:w-1/3"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={openingPlaceholder} 
                      alt={collection.title}
                      className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="relative z-10 bg-black/50 backdrop-blur-sm px-4 py-3 w-full text-center">
                    <h3 className="font-pixel text-base sm:text-lg md:text-xl text-white mb-1 sm:mb-2">
                      {collection.title}
                    </h3>
                    <p className="font-terminal text-xs sm:text-sm text-gray-200">
                      {collection.count} images
                    </p>
                  </div>
                </motion.div>
              ))}

            {/* Right Section - Other 4 sections in 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
              {populatedCollections
                .filter(collection => collection.id !== 'opening')
                .map((collection) => (
                  <motion.div
                    key={collection.id}
                    variants={itemVariants}
                    onClick={() => setSelectedCollection(collection)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-3 sm:border-4 border-black bg-gray-100 cursor-pointer 
                      hover:bg-gray-200 active:bg-gray-300 transition-colors
                      flex flex-col items-center justify-end p-4 sm:p-6 overflow-hidden relative
                      min-h-[160px] sm:min-h-[180px] md:min-h-[280px]"
                  >
                    {(collection.images.length > 0 || collection.id === 'workshop' || collection.id === 'software' || collection.id === 'elite_events' || collection.id === 'robotics') && (
                      <div className="absolute inset-0 w-full h-full">
                        <img 
                          src={
                            collection.id === 'workshop' ? workshopPlaceholder :
                            collection.id === 'software' ? softwarePlaceholder :
                            collection.id === 'elite_events' ? eliteEventsPlaceholder :
                            collection.id === 'robotics' ? roboticsPlaceholder :
                            collection.images[0]
                          } 
                          alt={collection.title}
                          className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>
                    )}
                    <div className="relative z-10 bg-black/50 backdrop-blur-sm px-4 py-2 w-full text-center">
                      <h3 className="font-pixel text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-2">
                        {collection.title}
                      </h3>
                      <p className="font-terminal text-xs sm:text-sm text-gray-200">
                        {collection.count} images
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 
       * Collection Modal
       * 
       * Full-screen overlay with image grid.
       * Uses AnimatePresence for enter/exit transitions.
       */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
            onClick={() => setSelectedCollection(null)}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white border-4 sm:border-8 border-black w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 md:p-8 gap-3 sm:gap-4 border-b-2 sm:border-b-4 border-black flex-shrink-0">
                <div className="w-full sm:w-auto">
                  <h2 className="font-minecraft text-xl sm:text-2xl md:text-3xl text-black">
                    {selectedCollection.title}
                  </h2>
                  <p className="font-terminal text-xs sm:text-sm text-gray-600 mt-1">
                    {selectedCollection.count} images in this collection
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="bg-red-600 text-white font-pixel px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base border-2 sm:border-4 border-red-800 hover:bg-red-700 active:bg-red-800 transition-all w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2"
                >
                  <span className="text-base sm:text-lg">✕</span> CLOSE
                </button>
              </div>

              {/* Scrollable Image Grid Container */}
              <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
                {/* Image Grid with staggered entrance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {selectedCollection.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      className="border-2 sm:border-4 border-black bg-gray-100 overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${selectedCollection.title} - Image ${index + 1}`}
                        className="w-full h-48 sm:h-56 md:h-64 object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
