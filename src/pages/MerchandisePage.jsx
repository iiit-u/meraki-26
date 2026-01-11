/**
 * @fileoverview Merchandise store page with brand selection popup.
 * 
 * Displays a merchandise catalog with featured product display and product grid.
 * On initial load, shows a popup for users to choose between Doon Merchandise
 * and Dopamine Store brands.
 * 
 * @see DOCS.md#animation-system for motion variants
 * @component
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { appleSlideUp, sectionTransition } from "../utils/motion";

// Merchandise images from public folder
const doonHoodie = "/merchendise/doon.webp";
const dopamineHoodie = "/merchendise/dopamine.webp";
const skullIcon = "/merchendise/skull.png";

// Doon product images from public/merchendise/doon/
const blackHoodieImg = "/merchendise/doon/Meraki Official Black Hoodie.webp";
const whiteHoodieImg = "/merchendise/doon/Meraki Official White Hoodie.webp";
const blackTeeImg = "/merchendise/doon/Meraki Official Black T-Shirt.webp";
const whiteTeeImg = "/merchendise/doon/Meraki Official White T-Shirt.webp";
const oversizedTeeImg = "/merchendise/doon/404 Not Found Oversized T-Shirt.webp";

// Product data for Doon Merchandise - All hoodies and t-shirts from doonmerch.odoo.com
const doonProducts = [
    { id: 1, name: "Meraki Official Black Hoodie", type: "PREMIUM HOODIE", price: "₹1,299", image: blackHoodieImg, featured: true, buyLink: "https://doonmerch.odoo.com/shop/meraki-iiit-una-17/meraki-official-black-hoodie-132" },
    { id: 2, name: "Meraki Official White Hoodie", type: "PREMIUM HOODIE", price: "₹1,299", image: whiteHoodieImg, buyLink: "https://doonmerch.odoo.com/shop/meraki-iiit-una-17/meraki-official-white-hoodie-133" },
    { id: 3, name: "Meraki Official Black T-Shirt", type: "PREMIUM TEE", price: "₹549", image: blackTeeImg, buyLink: "https://doonmerch.odoo.com/shop/meraki-iiit-una-17/meraki-official-black-t-shirt-111" },
    { id: 4, name: "Meraki Official White T-Shirt", type: "PREMIUM TEE", price: "₹549", image: whiteTeeImg, buyLink: "https://doonmerch.odoo.com/shop/meraki-iiit-una-17/meraki-official-white-t-shirt-130" },
    { id: 5, name: "404 Not Found Oversized T-Shirt", type: "OVERSIZED TEE", price: "₹649", image: oversizedTeeImg, buyLink: "https://doonmerch.odoo.com/shop/meraki-iiit-una-17/404-not-found-oversized-t-shirt-134" },
];

// Dopamine product images from public/merchendise/dopamine/
const isItOverHoodieImg = "/merchendise/dopamine/it-is-over-hoodie.webp";
const gridHoodieImg = "/merchendise/dopamine/meraki-grid.webp";
const gameIsOnHoodieImg = "/merchendise/dopamine/gameison-hoodiestogo.webp";
const beezyBeeCopyImg = "/merchendise/dopamine/beezy-bee-210-gsm-copy.webp";
const beezyBeeImg = "/merchendise/dopamine/beezy-bee.webp";
const gameIsOnTeeImg = "/merchendise/dopamine/gameison-240gsm.webp";

// Product data for Dopamine Store - All products from thedopaminestore.in/collections/iiit-una
const dopamineProducts = [
    { id: 1, name: "MERAKI - IS IT OVER - Hoodie", type: "HOODIES TO GO", image: isItOverHoodieImg, featured: true, buyLink: "https://thedopaminestore.in/products/iiit-una-meraki-grid-hoodies-to-go-copy" },
    { id: 2, name: "MERAKI - GRID - Hoodie", type: "HOODIES TO GO", image: gridHoodieImg, buyLink: "https://thedopaminestore.in/products/iiit-una-meraki-game-is-on-hoodies-to-go-copy" },
    { id: 3, name: "MERAKI - GAME IS ON - Hoodie", type: "HOODIES TO GO", image: gameIsOnHoodieImg, buyLink: "https://thedopaminestore.in/products/iiit-una-meraki-game-is-on-240-gsm-copy" },
    { id: 4, name: "MERAKI - BEEZY BEE", type: "240 GSM (Copy)", image: beezyBeeCopyImg, buyLink: "https://thedopaminestore.in/products/iiit-una-meraki-beezy-bee-240-gsm-copy" },
    { id: 5, name: "MERAKI - BEEZY BEE", type: "240 GSM", image: beezyBeeImg, buyLink: "https://thedopaminestore.in/products/iiit-una-meraki-game-is-on-240-gsm" },
    { id: 6, name: "MERAKI - GAME IS ON", type: "240 GSM", image: gameIsOnTeeImg, buyLink: "https://thedopaminestore.in/products/iiit-una-meraki-240-gsm" },
];

/**
 * Brand Selection Popup Component
 */
const BrandSelectionPopup = ({ onSelectBrand, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-neutral-900 border-4 border-neutral-700 p-8 md:p-12 max-w-3xl w-full mx-4"
                style={{
                    boxShadow: "0 0 0 2px rgba(0,0,0,0.8), 0 20px 60px rgba(0,0,0,0.8)",
                }}
            >
                {/* Popup Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-cyan-400 text-2xl">▶</span>
                        <h2 className="font-minecraft text-white text-2xl md:text-3xl tracking-wider uppercase">
                            Choose Your Store
                        </h2>
                    </div>
                    <p className="font-playball text-white/70 text-lg md:text-xl italic">
                        Select a merchandise brand to explore
                    </p>
                </div>

                {/* Brand Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Doon Merchandise Option */}
                    <motion.button
                        onClick={() => onSelectBrand("doon")}
                        whileHover={{ scale: 1.03, borderColor: "rgba(34, 211, 238, 0.8)" }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-neutral-800 border-2 border-neutral-600 p-6 text-center transition-all duration-300 hover:bg-neutral-700/50 cursor-pointer group"
                    >
                        <img
                            src={doonHoodie}
                            alt="Doon Merchandise"
                            className="w-full h-48 object-contain mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <h3 className="font-minecraft text-white text-lg tracking-wide uppercase">
                                Doon Merchandise
                            </h3>
                        </div>
                        <p className="font-playball text-cyan-400 text-base italic">
                            Explore Collection →
                        </p>
                    </motion.button>

                    {/* Dopamine Store Option */}
                    <motion.button
                        onClick={() => onSelectBrand("dopamine")}
                        whileHover={{ scale: 1.03, borderColor: "rgba(34, 211, 238, 0.8)" }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-neutral-800 border-2 border-neutral-600 p-6 text-center transition-all duration-300 hover:bg-neutral-700/50 cursor-pointer group"
                    >
                        <img
                            src={dopamineHoodie}
                            alt="Dopamine Store"
                            className="w-full h-48 object-contain mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <h3 className="font-minecraft text-white text-lg tracking-wide uppercase">
                                Dopamine Store
                            </h3>
                        </div>
                        <p className="font-playball text-red-400 text-base italic">
                            Explore Collection →
                        </p>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

/**
 * Product Card Component
 */
const ProductCard = ({ product, brandColor }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-neutral-800/50 border border-neutral-700 overflow-hidden group cursor-pointer"
        >
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="font-terminal text-xs text-white/60 uppercase tracking-wider">
                        {product.type}
                    </span>
                </div>
            </div>
            <div className="p-5 border-t border-neutral-700">
                <h4 className="font-minecraft text-white text-lg tracking-wide uppercase truncate">
                    {product.name}
                </h4>
            </div>
        </motion.div>
    );
};

/**
 * Merchandise Page Component
 */
const MerchandisePage = () => {
    const location = useLocation();
    const [showPopup, setShowPopup] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [featuredProduct, setFeaturedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (location.state?.brand) {
            handleSelectBrand(location.state.brand);
        }
    }, [location.state]);

    const handleSelectBrand = (brand) => {
        setSelectedBrand(brand);
        setShowPopup(false);

        if (brand === "doon") {
            setProducts(doonProducts);
            setFeaturedProduct(doonProducts.find(p => p.featured));
        } else {
            setProducts(dopamineProducts);
            setFeaturedProduct(dopamineProducts.find(p => p.featured));
        }
    };

    const brandColor = selectedBrand === "doon" ? "text-cyan-400" : "text-red-400";
    const brandName = selectedBrand === "doon" ? "Doon Merchandise" : "Dopamine Store";

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Base dark background with subtle white tones */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 30% 20%, rgba(40, 40, 50, 0.4) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(30, 30, 40, 0.3) 0%, transparent 50%),
                        linear-gradient(135deg, #0a0a0a 0%, #050505 25%, #0d0d0d 50%, #000000 75%, #080808 100%)
                    `,
                }}
            />

            {/* White smoke/marble streaks */}
            <div className="absolute inset-0 opacity-[0.08]">
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
                    }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(200, 200, 220, 0.3) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(180, 180, 200, 0.25) 0%, transparent 65%)',
                    }}
                />
            </div>

            {/* Animated gradient orbs with white tints */}
            <div className="absolute inset-0 opacity-15">
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, rgba(100, 100, 120, 0.3) 0%, transparent 70%)',
                        animation: 'pulse 8s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(80, 80, 100, 0.25) 0%, transparent 70%)',
                        animation: 'pulse 10s ease-in-out infinite 2s',
                    }}
                />
            </div>

            {/* Marble texture with white veins */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 35%, transparent 35%),
                        linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.04) 35%, transparent 35%),
                        linear-gradient(90deg, transparent 45%, rgba(200,200,200,0.03) 45%, rgba(200,200,200,0.03) 55%, transparent 55%)
                    `,
                    backgroundSize: '100px 100px, 100px 100px, 80px 80px',
                    backgroundPosition: '0 0, 50px 50px, 0 0',
                }}
            />

            {/* Subtle white noise texture */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ffffff' /%3E%3C/svg%3E")`,
                }}
            />

            {/* Diagonal grid pattern with white lines */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 40px,
                            rgba(255,255,255,0.04) 40px,
                            rgba(255,255,255,0.04) 41px
                        ),
                        repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 40px,
                            rgba(255,255,255,0.04) 40px,
                            rgba(255,255,255,0.04) 41px
                        )
                    `,
                }}
            />

            {/* White light streaks */}
            <div className="absolute inset-0 opacity-[0.05]">
                <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    }}
                />
                <div
                    className="absolute bottom-0 right-0 w-full h-1"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    }}
                />
            </div>

            {/* Top gradient fade with white tint */}
            <div
                className="absolute top-0 left-0 right-0 h-32 z-[1]"
                style={{
                    background: 'linear-gradient(to bottom, rgba(10,10,15,0.95), transparent)',
                }}
            />

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 z-[1]"
                style={{
                    background: 'linear-gradient(to top, rgba(5,5,10,0.9), transparent)',
                }}
            />

            {/* Decorative corner accents with white highlights */}
            <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        background: 'linear-gradient(135deg, rgba(180, 180, 200, 0.3) 0%, transparent 70%)',
                    }}
                />
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
                <div
                    className="absolute bottom-0 right-0 w-full h-full"
                    style={{
                        background: 'linear-gradient(-45deg, rgba(160, 160, 180, 0.25) 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* Subtle white glow around edges */}
            <div className="absolute inset-0 opacity-[0.06]">
                <div
                    className="absolute top-0 left-0 right-0 h-2"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 right-0 h-2"
                    style={{
                        background: 'linear-gradient(to top, rgba(255,255,255,0.15), transparent)',
                    }}
                />
                <div
                    className="absolute top-0 left-0 bottom-0 w-2"
                    style={{
                        background: 'linear-gradient(to right, rgba(255,255,255,0.15), transparent)',
                    }}
                />
                <div
                    className="absolute top-0 right-0 bottom-0 w-2"
                    style={{
                        background: 'linear-gradient(to left, rgba(255,255,255,0.15), transparent)',
                    }}
                />
            </div>

            {/* Brand Selection Popup */}
            <AnimatePresence>
                {showPopup && (
                    <BrandSelectionPopup
                        onSelectBrand={handleSelectBrand}
                        onClose={() => setShowPopup(false)}
                    />
                )}
            </AnimatePresence>

            {/* Main Content - Only show after brand selection */}
            {selectedBrand && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 pt-20 pb-16 px-4 md:px-8 lg:px-16"
                >
                    {/* Header */}
                    <div className="max-w-7xl mx-auto mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <motion.div
                                variants={appleSlideUp(0.1)}
                                initial="hidden"
                                animate="show"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-cyan-400 text-xl">▶</span>
                                    <h1 className="font-minecraft text-white text-2xl md:text-4xl tracking-wider uppercase">
                                        Merchandise
                                    </h1>
                                </div>
                                <p className={`font-playball ${brandColor} text-xl md:text-2xl italic`}>
                                    {brandName}
                                </p>
                            </motion.div>


                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Left - Featured Product */}
                            <motion.div
                                variants={appleSlideUp(0.2)}
                                initial="hidden"
                                animate="show"
                                className="relative"
                            >
                                {/* Decorative elements */}
                                <div className="absolute -left-4 top-1/4 font-terminal text-white/20 text-sm tracking-widest transform -rotate-90 origin-left">
                                    できる
                                </div>

                                {/* Featured Product Display */}
                                <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                                    {featuredProduct && (
                                        <>
                                            <motion.img
                                                key={featuredProduct.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                                src={featuredProduct.image}
                                                alt={featuredProduct.name}
                                                className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
                                            />

                                            {/* Product Info Bar */}
                                            <div className="mt-8 w-full max-w-md">
                                                <div className="flex items-end justify-between mb-4">
                                                    <div>
                                                        <p className="font-terminal text-white/60 text-sm uppercase tracking-wider mb-1">
                                                            {featuredProduct.type}
                                                        </p>
                                                        <h2 className="font-minecraft text-white text-xl md:text-2xl tracking-wide uppercase">
                                                            {featuredProduct.name}
                                                        </h2>
                                                    </div>
                                                </div>

                                                {/* Buy Button */}
                                                <motion.button
                                                    onClick={() => {
                                                        if (featuredProduct.buyLink) {
                                                            window.open(featuredProduct.buyLink, '_blank', 'noopener,noreferrer');
                                                        }
                                                    }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`block w-full py-3 text-center font-minecraft text-white tracking-widest uppercase cursor-pointer ${selectedBrand === "doon"
                                                        ? "bg-cyan-600 hover:bg-cyan-500"
                                                        : "bg-red-700 hover:bg-red-600"
                                                        } transition-colors duration-300`}
                                                >
                                                    BUY
                                                </motion.button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>

                            {/* Right - Product Grid */}
                            <motion.div
                                variants={sectionTransition}
                                initial="hidden"
                                animate="show"
                            >
                                <div className="grid grid-cols-2 gap-16">
                                    {products.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            variants={appleSlideUp(0.1 * index)}
                                            onClick={() => setFeaturedProduct(product)}
                                        >
                                            <ProductCard product={product} brandColor={brandColor} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MerchandisePage;
