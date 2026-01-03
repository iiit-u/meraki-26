/**
 * @fileoverview Development team credits page with floating particles.
 * @see DOCS.md#animation-system for entrance animations
 * @page /devteam
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { devTeamMembers, devTeamConfig } from "../constants";
import avatarImg from "../assets/avatar_pixel.webp";

/**
 * Floating ore particle with infinite animation.
 * @param {Object} props - delay, duration, startX, color
 */
const FloatingParticle = ({ delay, duration, startX, color }) => (
    <motion.div
        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm opacity-60"
        style={{ background: color, left: `${startX}%`, bottom: "-20px", boxShadow: `0 0 6px ${color}` }}
        animate={{ y: [0, -800], x: [0, Math.random() * 40 - 20], opacity: [0, 0.8, 0.8, 0], rotate: [0, 180] }}
        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
);

/**
 * Team member card with Minecraft 3D border styling.
 * @param {Object} props.member - name, role, photo
 * @param {number} props.index - Index for staggered animation
 */
const TeamMemberCard = ({ member, index }) => (
    <motion.div
        className="relative group h-full"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, delay: Math.min(index * 0.15, 0.8), ease: [0.25, 0.46, 0.45, 0.94] }}
    >
        <motion.div
            className="relative bg-[#3a3a3a] overflow-hidden h-full flex flex-col"
            style={{ border: "3px solid", borderColor: "#888888 #1a1a1a #1a1a1a #666666" }}
            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="p-0.5 sm:p-1 flex flex-col h-full" style={{ border: "2px solid", borderColor: "#2a2a2a #555555 #555555 #2a2a2a" }}>
                <div className="relative aspect-square overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                    <motion.img src={member.photo || avatarImg} alt={member.name} className="w-full h-full object-cover" style={{ imageRendering: "pixelated" }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                </div>
                <div className="p-3 sm:p-4 bg-[#474747] flex-grow flex flex-col justify-center min-h-[60px] sm:min-h-[80px]">
                    <h3 className="font-minecraft text-xs sm:text-sm md:text-base text-white mb-0.5 sm:mb-1 tracking-wide break-words text-center leading-tight" style={{ textShadow: "2px 2px 0px #000" }}>{member.name}</h3>
                    {member.role && <p className="font-pixel text-[10px] sm:text-xs text-cyan-400 tracking-wide truncate">{member.role}</p>}
                </div>
            </div>
        </motion.div>
        <motion.div className="absolute -inset-1 bg-cyan-500/20 rounded-sm -z-10 blur-xl" initial={{ opacity: 0 }} whileHover={{ opacity: 0.6 }} transition={{ duration: 0.3 }} />
    </motion.div>
);

/**
 * DevTeam page with floating particles and developer cards.
 */
const DevTeam = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

    const particleColors = ["#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i, delay: Math.random() * 10, duration: 12 + Math.random() * 8, startX: Math.random() * 100,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    return (
        <div ref={containerRef} className="min-h-screen relative text-white overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)" }}>
            {/* Background layers */}
            <motion.div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 40%)` }} />
            <motion.div className="absolute inset-0 opacity-20" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px)` }} />

            {/* Particles - desktop only */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                {particles.map((p) => <FloatingParticle key={p.id} {...p} />)}
            </div>

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div className="text-center mb-10 sm:mb-12 md:mb-16" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <motion.div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-l-[8px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-cyan-400" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
                            <h2 className="font-terminal text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase">{devTeamConfig.pageSubtitle}</h2>
                            <motion.div className="w-0 h-0 border-t-[6px] sm:border-t-[10px] border-b-[6px] sm:border-b-[10px] border-r-[8px] sm:border-r-[14px] border-t-transparent border-b-transparent border-r-cyan-400" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
                        </div>
                        <motion.h1 className="font-minecraft text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-3 sm:mb-4 tracking-wider" style={{ textShadow: "3px 3px 0px #000, 2px 2px 0px rgba(6, 182, 212, 0.5)" }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>{devTeamConfig.pageTitle}</motion.h1>
                        <motion.div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-4 sm:mb-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.6 }} />
                        <motion.p className="font-terminal text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>{devTeamConfig.sectionDescription}</motion.p>
                    </motion.div>

                    {/* Team Grid */}
                    {/* Team Grid */}
                    <div className="space-y-12 sm:space-y-16">
                        {/* Tier 1: Coordinator (100% Size) */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {devTeamMembers.filter(m => m.tier === 1).map((member, index) => (
                                <div key={index} className="w-full max-w-[280px]">
                                    <TeamMemberCard member={member} index={index} />
                                </div>
                            ))}
                        </div>

                        {/* Tier 2: Core Team (90% Size) */}
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            {devTeamMembers.filter(m => m.tier === 2).map((member, index) => (
                                <div key={index} className="w-[calc(50%-1rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[250px]">
                                    <TeamMemberCard member={member} index={index + 1} />
                                </div>
                            ))}
                        </div>

                        {/* Tier 3: Contributors (75% Size, More Dense) */}
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            {devTeamMembers.filter(m => m.tier === 3).map((member, index) => (
                                <div key={index} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] max-w-[200px]">
                                    <TeamMemberCard member={member} index={index + 4} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <motion.div className="mt-12 sm:mt-16 md:mt-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                            <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-gray-600" />
                            <span className="font-pixel text-[10px] sm:text-xs text-gray-500 tracking-wider">{devTeamConfig.sectionFooterText}</span>
                            <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-gray-600" />
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#242424] to-transparent pointer-events-none" />
        </div>
    );
};

export default DevTeam;
