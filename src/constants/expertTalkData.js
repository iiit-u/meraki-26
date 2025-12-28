/**
 * @fileoverview Expert Talk data for speaker cards section.
 * 
 * Contains speaker information for the homepage Expert Talk section.
 * Each speaker features a name, title, photo, and highlight points
 * that display on hover.
 * 
 * @module constants/expertTalkData
 */

import speakerPlaceholder from "../assets/minecraft_dungeons_placeholder.webp";

/**
 * Expert talks array for speaker cards.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {number} id - Unique speaker identifier
 * @property {string} name - Speaker's full name
 * @property {string} title - Position or short description
 * @property {string} image - Speaker photo path
 * @property {string[]} highlights - Bullet points shown on hover
 */
export const expertTalks = [
    {
        id: 1,
        name: "Col. Subhajeet Naha Retd.",
        title: "26+ years in army",
        image: speakerPlaceholder,
        highlights: [
            "Founder @Protecte",
            "Anti-Drone Warfare",
            "Electronic warfare",
            "AI/ML expert",
            "Cybersecurity expert"
        ]
    },
    {
        id: 2,
        name: "Dr. Ananya Sharma",
        title: "AI Research Lead",
        image: speakerPlaceholder,
        highlights: [
            "PhD in Machine Learning",
            "Google AI Research",
            "NLP & Vision expert",
            "50+ publications",
            "Stanford alumnus"
        ]
    },
    {
        id: 3,
        name: "Vikram Reddy",
        title: "Blockchain Pioneer",
        image: speakerPlaceholder,
        highlights: [
            "Founder @ChainTech",
            "Web3 architect",
            "DeFi specialist",
            "IIT Bombay alumnus",
            "TEDx speaker"
        ]
    },
    {
        id: 4,
        name: "Priya Mathur",
        title: "Cybersecurity Expert",
        image: speakerPlaceholder,
        highlights: [
            "CISSP certified",
            "Bug bounty hunter",
            "Ethical hacking",
            "15+ years experience",
            "Security consultant"
        ]
    },
];
