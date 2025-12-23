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
        title: "DRONE EVENT",
        slug: "drone-event",
        image: minecraftimg,
        description: "Capture the Tower by night, and in a whole new light, with these times.",
        isElite: true,
    },
    {
        id: 2,
        title: "ROBO DRIVE",
        slug: "robo-drive",
        image: minecraftimg,
        description: "Experience the ultimate robotics competition with cutting-edge technology.",
        isElite: true,
    },
    {
        id: 3,
        title: "TECH CHALLENGE",
        slug: "tech-challenge",
        image: minecraftimg,
        description: "Test your technical skills in this exciting challenge event.",
        isElite: true,
    },
    {
        id: 4,
        title: "INNOVATION QUEST",
        slug: "innovation-quest",
        image: minecraftimg,
        description: "Showcase your innovative ideas and compete for the grand prize.",
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
    'robo-drive': {
        title: 'ROBO DRIVE',
        price: '₹19000/-',
        tags: ['Robotics', 'Engineering', 'Competition', 'Innovation'],
        badge: 'FLAGSHIP EVENT',
        description: 'Experience the world of Hermitcraft, Season 10 with this Free map. This world was made by a remarkable group of talented people over...',
        fullDescription: 'Experience the world of Hermitcraft, Season 10 with this Free map. This world was made by a remarkable group of talented people over several months. Join us for an amazing robotics competition where teams compete to build and program the most efficient robots. This event challenges your engineering skills, programming knowledge, and creativity.',
        eventDate: 'February 15-17, 2026',
        teamSize: '2-4 Members',
        venue: 'IIIT Una Campus',
        contact: 'events@meraki.com',
        registerLink: '#'
    },
    'drone-event': {
        title: 'DRONE EVENT',
        price: '₹15000/-',
        tags: ['Drones', 'Aerospace', 'Competition', 'Technology'],
        badge: 'POPULAR EVENT',
        description: 'Master the skies with our drone racing competition...',
        fullDescription: 'Master the skies with our drone racing competition. Build, customize, and fly your drones through challenging obstacle courses.',
        eventDate: 'February 16, 2026',
        teamSize: '1-3 Members',
        venue: 'Open Ground, IIIT Una',
        contact: 'drones@meraki.com',
        registerLink: '#'
    },
    'tech-challenge': {
        title: 'TECH CHALLENGE',
        price: '₹10000/-',
        tags: ['Coding', 'Problem Solving', 'Competition', 'Tech'],
        badge: 'COMPETITIVE',
        description: 'Put your coding skills to the ultimate test...',
        fullDescription: 'Put your coding skills to the ultimate test in this intensive programming competition with real-world challenges.',
        eventDate: 'February 17, 2026',
        teamSize: '1-2 Members',
        venue: 'Computer Lab, IIIT Una',
        contact: 'tech@meraki.com',
        registerLink: '#'
    },
    'innovation-quest': {
        title: 'INNOVATION QUEST',
        price: '₹12000/-',
        tags: ['Innovation', 'Entrepreneurship', 'Pitch', 'Startup'],
        badge: 'SPECIAL EVENT',
        description: 'Showcase your innovative startup ideas...',
        fullDescription: 'Showcase your innovative startup ideas to industry experts and investors. Win funding and mentorship for your ventures.',
        eventDate: 'February 15-17, 2026',
        teamSize: '2-5 Members',
        venue: 'Auditorium, IIIT Una',
        contact: 'innovation@meraki.com',
        registerLink: '#'
    }
};
