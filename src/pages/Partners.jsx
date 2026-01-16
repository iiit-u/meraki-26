/**
 * @fileoverview Partners page highlighting sponsors and collaborators in a hierarchy.
 * 
 * Displays partners categorized into Gold, Merchandise, Platform, Silver, and Other tiers.
 * Features a Minecraft-themed aesthetic with tier-specific frame materials and
 * interactive 3D particle effects.
 */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import wallBg from "../assets/sponsors_minecraft_bg.webp";
import { appleSlideUp, appleScaleIn } from "../utils/motion";

// Import logos
import iiituLogo from '../assets/sponsors/iiitu_logo.webp';
import interviewBuddyLogo from '../assets/sponsors/interview_buddy.webp';
import unstopLogo from '../assets/sponsors/unstop_logo.svg';
import aerostarLogo from '../assets/sponsors/aerostar.webp';
import devfolioLogo from '../assets/sponsors/devfolio_logo.webp';
import whosNextLogo from '../assets/sponsors/whosnext.webp';
import mioartaiLogo from '../assets/mioartai.jpg';
import dopamineStoreLogo from '../assets/dopamine_store.avif';
import ethindiaLogo from '../assets/ethindia.svg';

// Placeholder for missing logos
const placeholderLogo = iiituLogo;
const doonLogo = "/doonmerch.webp";
const gfgLogo = "/gfg-gg-logo.svg";
const codechefLogo = "/codechef.jpeg";

// Partner Data with Categories

// PLATINUM PARTNERS - Commented out as requested
// const platinumPartners = [
//     { name: "Platinum 1", firm: "Platinum Firm", designation: "Title Sponsor", logo: placeholderLogo, url: "#" }
// ];

const abhibusLogo = "/abhibus.png";
const plutoDronesLogo = "/pluto drones.webp";

const goldPartners = [
    { name: "Pluto Drones", firm: "Pluto Drones", designation: "Gold Sponsor", logo: plutoDronesLogo, url: "https://www.plutodrones.com/", whiteBg: true }
];

const travelPartners = [
    { name: "Abhibus", firm: "Abhibus", designation: "Travel Partner", logo: abhibusLogo, url: "https://www.abhibus.com/" }
];

const merchLifestylePartners = [
    { name: "Dopamine Store", firm: "Dopamine Store", designation: "Merchandise Partner", logo: dopamineStoreLogo, url: "https://thedopaminestore.in" },
    { name: "Doon Merchandise", firm: "Doon Merchandise", designation: "Merchandise Partner", logo: doonLogo, url: "/merchandise", whiteBg: true }
];

const platformPartners = [
    { name: "Unstop", firm: "Unstop", designation: "Platform Partner", logo: unstopLogo, url: "https://unstop.com" },
    { name: "GeeksforGeeks", firm: "GeeksforGeeks", designation: "Platform Partner", logo: gfgLogo, url: "https://www.geeksforgeeks.org/" },
    { name: "CodeChef", firm: "CodeChef", designation: "Platform Partner", logo: codechefLogo, url: "https://www.codechef.com/" },
    { name: "Devfolio", firm: "Devfolio", designation: "Platform Partner", logo: devfolioLogo, url: "https://devfolio.co" }
];

const silverPartners = [
    { name: "InterviewBuddy", firm: "InterviewBuddy", designation: "Silver Sponsor", logo: interviewBuddyLogo, url: "https://interviewbuddy.net" },
    { name: "ETHindia", firm: "ETHindia", designation: "Silver Sponsor", logo: ethindiaLogo, url: "https://www.instagram.com/ethindiaco/" }
];

const otherPartners = [
    { name: "mioArtAI", firm: "mioArtAI", designation: "Theme Partner", logo: mioartaiLogo, url: "https://www.instagram.com/mioartai/" },
    { name: "AEROSTAR", firm: "AEROSTAR", designation: "Technology Partner", logo: aerostarLogo, url: "https://www.instagram.com/aerostar007/" }
];

/**
 * Floating Particles Effect
 */
const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const particleCount = 20;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 10 + 5,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white/5 border border-white/10"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
                        rotate: [0, 90, 180]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

/**
 * Tier-Specific Frame Styling
 */
const getFrameStyles = (tier) => {
    switch (tier) {
        case 'platinum':
            return {
                border: "linear-gradient(135deg, #b9f2ff 0%, #4facfe 50%, #00f2fe 100%)",
                shadow: "0 0 30px rgba(79, 172, 254, 0.4)",
                innerBorder: "#00f2fe",
                pinGradient: "radial-gradient(circle at 30% 30%, #fff 0%, #4facfe 100%)",
                bgColor: "rgba(0, 242, 254, 0.05)"
            };
        case 'gold':
            return {
                border: "linear-gradient(135deg, #fff3b0 0%, #e6ce6a 50%, #b88a00 100%)",
                shadow: "0 0 30px rgba(255, 215, 0, 0.3)",
                innerBorder: "#FFD700",
                pinGradient: "radial-gradient(circle at 30% 30%, #fff 0%, #ffd700 100%)",
                bgColor: "rgba(255, 215, 0, 0.05)"
            };
        case 'silver':
            return {
                border: "linear-gradient(135deg, #e0e0e0 0%, #9e9e9e 100%)",
                shadow: "0 0 25px rgba(255, 255, 255, 0.2)",
                innerBorder: "#C0C0C0",
                pinGradient: "radial-gradient(circle at 30% 30%, #fff 0%, #999 100%)",
                bgColor: "rgba(255, 255, 255, 0.05)"
            };
        case 'merch':
            return {
                border: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #feada6 100%)",
                shadow: "0 0 25px rgba(255, 100, 100, 0.3)",
                innerBorder: "#ff4d4d",
                pinGradient: "radial-gradient(circle at 30% 30%, #fff 0%, #ff4d4d 100%)",
                bgColor: "rgba(255, 0, 0, 0.05)"
            };
        case 'platform':
            return {
                border: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
                shadow: "0 0 25px rgba(75, 108, 183, 0.3)",
                innerBorder: "#4b6cb7",
                pinGradient: "radial-gradient(circle at 30% 30%, #fff 0%, #182848 100%)",
                bgColor: "rgba(75, 108, 183, 0.05)"
            };
        case 'other':
            return {
                border: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                shadow: "0 0 25px rgba(56, 239, 125, 0.3)",
                innerBorder: "#11998e",
                pinGradient: "radial-gradient(circle at 30% 30%, #fff 0%, #11998e 100%)",
                bgColor: "rgba(17, 153, 142, 0.05)"
            };
        case 'travel':
            return {
                border: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
                shadow: "0 0 25px rgba(255, 126, 95, 0.3)",
                innerBorder: "#ff7e5f",
                pinGradient: "radial-gradient(circle at 30% 30%, #fff 0%, #ff7e5f 100%)",
                bgColor: "rgba(255, 126, 95, 0.05)"
            };
        default:
            return {
                border: "linear-gradient(145deg, #8B6914 0%, #654321 50%, #3D2914 100%)",
                shadow: "0 10px 25px rgba(0,0,0,0.6)",
                innerBorder: "#8B6914",
                pinGradient: "radial-gradient(circle at 30% 30%, #AAA 0%, #333 100%)",
                bgColor: "transparent"
            };
    }
};

/**
 * Minecraft-styled Poster Frame Component with 3D Tilt
 */
const PartnerCard = ({ partner, index, size = "default", tier = "wood" }) => {
    // Removed 3D tilt/wobble logic (useMotionValue, useSpring, useTransform, onMouseMove, etc.)

    const handleClick = () => {
        if (partner.url) {
            window.open(partner.url, '_blank', 'noopener,noreferrer');
        }
    };

    const styles = getFrameStyles(tier);
    const sizeClasses = {
        default: "w-44 h-44 sm:w-52 sm:h-52"
    };

    return (
        <motion.div
            className="relative cursor-pointer group"
            variants={appleScaleIn(index * 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Glow Effect */}
            <div
                className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                style={{ background: styles.innerBorder }}
            />

            {/* Frame Structure */}
            <div
                className={`relative ${sizeClasses[size]} overflow-hidden`}
                style={{
                    boxShadow: styles.shadow,
                }}
            >
                {/* Frame Border Material */}
                <div className="absolute inset-0 z-10"
                    style={{
                        background: styles.border,
                        maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                        maskSize: '100% 100%, calc(100% - 16px) calc(100% - 16px)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        padding: '8px'
                    }}
                />

                {/* Inner Border Color */}
                <div className="absolute inset-[8px] z-10 border-4 opacity-50"
                    style={{ borderColor: styles.innerBorder }}
                />

                {/* Canvas Background */}
                <div
                    className="absolute inset-[16px] flex items-center justify-center overflow-hidden"
                    style={{
                        boxShadow: partner.whiteBg ? "inset 0 0 20px rgba(0,0,0,0.1)" : "inset 0 0 30px rgba(0,0,0,0.8)",
                        background: partner.whiteBg
                            ? '#ffffff'
                            : `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://www.transparenttextures.com/patterns/cubes.png')`,
                        backgroundColor: partner.whiteBg ? '#ffffff' : '#151515'
                    }}
                >
                    {/* Tier Tint Overlay */}
                    {!partner.whiteBg && <div className="absolute inset-0 opacity-20" style={{ background: styles.bgColor }} />}

                    {/* Logo */}
                    <div
                        className="w-[75%] h-[75%] flex items-center justify-center relative z-20 transition-transform duration-500 group-hover:scale-110"
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                        />
                    </div>
                </div>

                {/* Interactive Glint/Sheen - Simplified */}
                <div
                    className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `radial-gradient(
                            circle at center, 
                            rgba(255,255,255,0.3) 0%, 
                            transparent 60%
                        )`,
                        mixBlendMode: "overlay"
                    }}
                />
            </div>

            {/* Pin/Nail Detail */}
            <div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-40"
                style={{
                    background: styles.pinGradient,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.8)",
                    border: '1px solid rgba(255,255,255,0.2)',
                }}
            />
        </motion.div>
    );
};

const SectionHeading = ({ title, color = "text-yellow-400", icon = "◆" }) => (
    <motion.div
        variants={appleSlideUp(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 mb-16 justify-center relative z-10"
    >
        <div className="flex items-center gap-4">
            <span className={`text-2xl ${color} animate-pulse`}>{icon}</span>
            <div className={`h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-${color.split('-')[1]}-500/50`} />
            <h2 className={`font-minecraft ${color} text-2xl sm:text-3xl md:text-5xl tracking-[0.15em] uppercase drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] text-center`}>
                {title}
            </h2>
            <div className={`h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-${color.split('-')[1]}-500/50`} />
            <span className={`text-2xl ${color} animate-pulse`}>{icon}</span>
        </div>
    </motion.div>
);

const Partners = () => {
    return (
        <div className="min-h-screen bg-[#050505] relative overflow-x-hidden pt-24 pb-20 selection:bg-cyan-500/30">
            {/* Background Texture */}
            <div
                className="absolute inset-0 z-0 opacity-20 fixed"
                style={{
                    backgroundImage: `url(${wallBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Ambient Particles */}
            <FloatingParticles />

            {/* Dark Gradient Overlay for Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] z-0 pointer-events-none" />

            {/* Moving Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-28 relative">
                    <motion.div
                        variants={appleScaleIn(0)}
                        initial="hidden"
                        animate="show"
                        className="inline-block relative"
                    >
                        <h1 className="font-minecraft text-white text-5xl sm:text-7xl md:text-8xl mb-4 tracking-widest text-shadow-xl relative z-10">
                            PARTNERS
                        </h1>
                        {/* Glitch/Shadow Layers */}
                        <div className="absolute top-0 left-1 text-cyan-500/30 font-minecraft text-5xl sm:text-7xl md:text-8xl w-full h-full -z-10 blur-sm">PARTNERS</div>
                        <div className="absolute top-0 -left-1 text-red-500/30 font-minecraft text-5xl sm:text-7xl md:text-8xl w-full h-full -z-10 blur-sm">PARTNERS</div>
                    </motion.div>

                    <motion.p
                        variants={appleSlideUp(0.2)}
                        initial="hidden"
                        animate="show"
                        className="font-terminal text-gray-400 text-sm sm:text-lg tracking-[0.2em] max-w-2xl mx-auto uppercase mt-4"
                    >
                        &lt; Building The Future Block By Block /&gt;
                    </motion.p>
                </div>

                {/* PLATINUM TIER - COMMENTED OUT AS REQUESTED
                <div className="mb-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <SectionHeading title="Platinum Partners" color="text-cyan-300" icon="❖" />
                    <div className="flex flex-wrap justify-center gap-16 sm:gap-24 relative z-10">
                        {platinumPartners.map((p, i) => (
                            <PartnerCard key={i} partner={p} index={i} size="default" tier="platinum" />
                        ))}
                    </div>
                </div>
                */}

                {/* Gold Tier - Pluto Drones */}
                <div className="mb-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />

                    <SectionHeading title="Gold Sponsors" color="text-yellow-400" icon="◈" />
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-20 relative z-10">
                        {goldPartners.map((p, i) => (
                            <PartnerCard key={i} partner={p} index={i} size="default" tier="gold" />
                        ))}
                    </div>
                </div>

                {/* Travel Partner - Abhibus */}
                <div className="mb-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

                    <SectionHeading title="Travel Partner" color="text-orange-400" icon="✈" />
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-20 relative z-10">
                        {travelPartners.map((p, i) => (
                            <PartnerCard key={i} partner={p} index={i} size="default" tier="travel" />
                        ))}
                    </div>
                </div>

                {/* Merchandise & Lifestyle - Dopamine, Doon Merchandise */}
                <div className="mb-32 relative">
                    <div className="absolute inset-0 bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />
                    <SectionHeading title="Merchandise & Lifestyle" color="text-red-400" icon="⚡" />
                    <div className="flex flex-wrap justify-center gap-16 relative z-10">
                        {merchLifestylePartners.map((p, i) => (
                            <PartnerCard key={i} partner={p} index={i} size="default" tier="merch" />
                        ))}
                    </div>
                </div>

                {/* Platform Partners - Unstop, GFG, CodeChef, Devfolio */}
                <div className="mb-32 relative">
                    <div className="absolute inset-0 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
                    <SectionHeading title="Platform Partners" color="text-blue-400" icon="⌬" />
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-16 relative z-10">
                        {platformPartners.map((p, i) => (
                            <PartnerCard key={i} partner={p} index={i} size="default" tier="platform" />
                        ))}
                    </div>
                </div>

                {/* Silver Sponsors - Interview Buddy, ETHindia */}
                <div className="mb-32">
                    <SectionHeading title="Silver Sponsors" color="text-slate-300" icon="◇" />
                    <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
                        {silverPartners.map((p, i) => (
                            <PartnerCard key={i} partner={p} index={i} size="default" tier="silver" />
                        ))}
                    </div>
                </div>

                {/* Other Partners - mioART, AEROSTAR */}
                <div className="mb-32">
                    <SectionHeading title="Other Partners" color="text-emerald-400" icon="✳" />
                    <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
                        {otherPartners.map((p, i) => (
                            <PartnerCard key={i} partner={p} index={i} size="default" tier="other" />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative max-w-4xl mx-auto text-center p-1"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl blur opacity-20" />
                    <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-10 sm:p-14 overflow-hidden">
                        {/* Decorative Corner lines */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500/30 rounded-br-xl" />

                        <h3 className="font-minecraft text-2xl sm:text-3xl text-white mb-6">
                            WANT TO <span className="text-cyan-400">SPONSOR?</span>
                        </h3>
                        <p className="font-terminal text-gray-400 mb-8 max-w-xl mx-auto">
                            Join us in crafting the ultimate tech experience. Let's build something extraordinary together.
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-minecraft tracking-widest uppercase rounded-sm border border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300"
                            >
                                Become a Partner
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Partners;
