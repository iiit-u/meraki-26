/**
 * @fileoverview Optimized image component with lazy loading and smooth transitions.
 * 
 * Provides a reusable image component that:
 * - Uses native lazy loading for below-the-fold images
 * - Shows a solid-color placeholder during load
 * - Fades in smoothly when loaded
 * - Supports aspect ratio containers
 * 
 * @module components/OptimizedImage
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * Optimized image component with lazy loading and fade-in effect.
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.priority=false] - If true, loads eagerly (for above-the-fold images)
 * @param {string} [props.aspectRatio] - Optional aspect ratio (e.g., "16/9", "4/3", "1/1")
 * @param {string} [props.objectFit="cover"] - CSS object-fit value
 * @param {string} [props.placeholderColor="#1A1A1A"] - Background color while loading
 * @returns {JSX.Element} Optimized image with lazy loading
 * 
 * @example
 * // Basic usage
 * <OptimizedImage src={heroImage} alt="Hero background" priority />
 * 
 * // With aspect ratio container
 * <OptimizedImage src={galleryItem} alt="Gallery photo" aspectRatio="4/3" />
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    priority = false,
    aspectRatio,
    objectFit = 'cover',
    placeholderColor = '#1A1A1A',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const handleError = useCallback(() => {
        setHasError(true);
        setIsLoaded(true); // Still mark as loaded to stop showing loading state
    }, []);

    // Container styles for aspect ratio
    const containerStyle = aspectRatio
        ? { aspectRatio, position: 'relative', overflow: 'hidden' }
        : {};

    // Image wrapper for overlay effects
    const imageWrapperClass = `relative overflow-hidden ${aspectRatio ? 'absolute inset-0' : ''}`;

    return (
        <div style={containerStyle} className={className}>
            <div className={imageWrapperClass}>
                {/* Placeholder background */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        backgroundColor: placeholderColor,
                        opacity: isLoaded ? 0 : 1,
                    }}
                />

                {/* Actual image with fade-in */}
                <motion.img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={handleLoad}
                    onError={handleError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded && !hasError ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`w-full h-full ${aspectRatio ? 'absolute inset-0' : ''}`}
                    style={{ objectFit }}
                    {...props}
                />

                {/* Error fallback */}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-dark-100">
                        <span className="text-dark-300 font-pixel text-xs">Failed to load</span>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * Background image variant optimized for full-section backgrounds.
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.children] - Content to render over the background
 * @returns {JSX.Element} Full-cover background image container
 */
export const OptimizedBackground = ({
    src,
    className = '',
    children,
    priority = false,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`} {...props}>
            {/* Background image */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${src})` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            {/* Hidden image to track loading */}
            <img
                src={src}
                alt=""
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setIsLoaded(true)}
                className="sr-only"
                aria-hidden="true"
            />

            {/* Content overlay */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default OptimizedImage;
