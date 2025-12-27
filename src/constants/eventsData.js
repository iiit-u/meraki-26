/**
 * @fileoverview Event data for Elite Events section and Event Details pages.
 * 
 * Contains two exports:
 * - events: Array for Elite Events tab navigation
 * - eventDetailsData: Object map for individual Event Details pages
 * 
 * @module constants/eventsData
 */

import minecraftimg from "../assets/minecraft_dungeons_placeholder.webp";
import skyCircuitImg from "../assets/SkyCircuit.png";
import roboDriveImg from "../assets/itsRoboDrive.png";
import hackTheThroneImg from "../assets/Hack The Throne.png";
import arenaXImg from "../assets/Esports.jpeg";

/**
 * Elite events array for homepage tabs.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {number} id - Unique event identifier
 * @property {string} title - Display title (uppercase)
 * @property {string} slug - URL-friendly identifier for routing
 * @property {string} image - Event thumbnail image path
 * @property {string} description - Short description for preview
 * @property {boolean} isElite - Whether to show in Elite Events section
 */
export const events = [
    {
        id: 1,
        title: "SKYCIRCUIT",
        slug: "skycircuit",
        image: skyCircuitImg,
        description: "SkyCircuit Showcase is a high-energy drone and aeromodelling showcase featuring cutting-edge UAVs, aerobatic RC aircraft, and live flight demonstrations.",
        isElite: true,
    },
    {
        id: 2,
        title: "ROBODRIVE",
        slug: "robodrive",
        image: roboDriveImg,
        description: "RoboDrive is an action-packed robotics showcase featuring autonomous and remote-controlled vehicles demonstrating speed, control, and intelligent navigation.",
        isElite: true,
    },
    {
        id: 3,
        title: "HACK-THE-THRONE",
        slug: "hack-the-throne",
        image: hackTheThroneImg,
        description: "24-hour high-intensity hackathon where innovators, coders, and problem-solvers collaborate to build impactful tech solutions.",
        isElite: true,
    },
    {
        id: 4,
        title: "ARENAX",
        slug: "arenax",
        image: arenaXImg,
        description: "ArenaX Game Carnival is a high-energy esports event featuring competitive battles in BGMI, Clash Royale, and Valorant.",
        isElite: true,
    },
];

/**
 * Detailed event information keyed by slug.
 * Used by EventDetails page component.
 * 
 * @constant
 * @type {Object<string, Object>}
 * 
 * @property {string} title - Full event title
 * @property {string} price - Prize pool or entry fee
 * @property {string[]} tags - Category labels
 * @property {string} badge - Event type badge (e.g., "FLAGSHIP EVENT")
 * @property {string} description - Short teaser text
 * @property {string} fullDescription - Complete event description
 * @property {string} eventDate - Event date(s)
 * @property {string} teamSize - Team composition requirements
 * @property {string} venue - Physical location
 * @property {string} contact - Contact email
 * @property {string} registerLink - Registration URL
 */
export const eventDetailsData = {
    'robodrive': {
        title: 'ROBODRIVE',
        price: '₹19000/-',
        tags: ['Robotics', 'Engineering', 'Competition', 'Innovation'],
        badge: 'FLAGSHIP EVENT',
        description: 'RoboDrive is an action-packed robotics showcase featuring autonomous and remote-controlled vehicles...',
        fullDescription: 'RoboDrive is an action-packed robotics showcase featuring autonomous and remote-controlled vehicles demonstrating speed, control, and intelligent navigation. The event highlights innovation in robotics, mobility systems, and real-world engineering through thrilling live runs and demos.',
        eventDate: 'February 15-17, 2026',
        teamSize: '2-4 Members',
        venue: 'IIIT Una Campus',
        contact: 'events@meraki.com',
        registerLink: '#'
    },
    'skycircuit': {
        title: 'SKYCIRCUIT',
        price: '₹15000/-',
        tags: ['Drones', 'Aerospace', 'Aeromodelling', 'Technology'],
        badge: 'POPULAR EVENT',
        description: 'SkyCircuit Showcase is a high-energy drone and aeromodelling showcase...',
        fullDescription: 'SkyCircuit Showcase is a high-energy drone and aeromodelling showcase featuring cutting-edge UAVs, aerobatic RC aircraft, and live flight demonstrations. The showcase brings together innovation, pilot skill, and next-gen aerial technology in an exciting display of precision and performance.',
        eventDate: 'February 16, 2026',
        teamSize: '1-3 Members',
        venue: 'Open Ground, IIIT Una',
        contact: 'drones@meraki.com',
        registerLink: '#'
    },
    'hack-the-throne': {
        title: 'HACK-THE-THRONE',
        price: '₹10000/-',
        tags: ['Coding', 'Hackathon', 'Innovation', 'Tech'],
        badge: 'COMPETITIVE',
        description: '24-hour high-intensity hackathon where innovators, coders, and problem-solvers collaborate...',
        fullDescription: '24-hour high-intensity hackathon where innovators, coders, and problem-solvers collaborate to build impactful tech solutions. Participants compete against time to ideate, design, and prototype bold ideas that challenge the status quo and claim the throne.',
        eventDate: 'February 17, 2026',
        teamSize: '1-2 Members',
        venue: 'Computer Lab, IIIT Una',
        contact: 'tech@meraki.com',
        registerLink: '#'
    },
    'arenax': {
        title: 'ARENAX',
        price: '₹12000/-',
        tags: ['Esports', 'Gaming', 'BGMI', 'Valorant'],
        badge: 'SPECIAL EVENT',
        description: 'ArenaX Game Carnival is a high-energy esports event featuring competitive battles...',
        fullDescription: 'ArenaX Game Carnival is a high-energy esports event featuring competitive battles in BGMI, Clash Royale, and Valorant. Gamers compete across mobile and PC arenas, showcasing strategy, reflexes, and teamwork in an intense, action-packed tournament environment.',
        eventDate: 'February 15-17, 2026',
        teamSize: '2-5 Members',
        venue: 'Auditorium, IIIT Una',
        contact: 'innovation@meraki.com',
        registerLink: '#'
    }
};
