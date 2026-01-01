/**
 * @fileoverview Event data for Elite Events section and Event Details pages.
 * 
 * Contains two exports:
 * - events: Array for Elite Events tab navigation
 * - eventDetailsData: Object map for individual Event Details pages
 * 
 * @module constants/eventsData
 */

import skyCircuitImg from "../assets/sky_circuit.webp";
import roboDriveImg from "../assets/robo_drive.webp";
import hackTheThroneImg from "../assets/hack_the_throne.webp";
import arenaXImg from "../assets/arena_x.webp";
import cairLogo from "../assets/sponsors/iitlogo.webp";
import aerostarLogo from "../assets/sponsors/aerostar.webp";
import agastyaLogo from "../assets/agastya.jpg";
import teamShaktiLogo from "../assets/team_shakti.png";

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
        comingSoon: false,
    },
    {
        id: 2,
        title: "ROBODRIVE",
        slug: "robodrive",
        image: roboDriveImg,
        description: "RoboDrive is an action-packed robotics showcase featuring autonomous and remote-controlled vehicles demonstrating speed, control, and intelligent navigation.",
        isElite: true,
        comingSoon: true,
    },
    {
        id: 3,
        title: "HACK-THE-THRONE",
        slug: "hack-the-throne",
        image: hackTheThroneImg,
        description: "24-hour high-intensity hackathon where innovators, coders, and problem-solvers collaborate to build impactful tech solutions.",
        isElite: true,
        comingSoon: true,
    },
    {
        id: 4,
        title: "ARENAX",
        slug: "arenax",
        image: arenaXImg,
        description: "ArenaX Game Carnival is a high-energy esports event featuring competitive battles in BGMI, Clash Royale, and Valorant.",
        isElite: true,
        comingSoon: true,
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
        price: '',
        tags: ['Aeromodelling', 'Drones', 'Aircrafts', 'FPVs'],
        badge: 'POPULAR EVENT',
        description: 'SkyCircuit is a high-impact technical exhibition designed to bring together institute drone teams, research groups, and drone technology startups on a single platform...',
        fullDescription: 'SkyCircuit is a high-impact technical exhibition designed to bring together institute drone teams, research groups, and drone technology startups on a single platform. The event aims to highlight the rapid advancements in UAV technology, foster knowledge exchange between academia and industry, and inspire students through real-world applications of drones. Participating institute drone teams will present their indigenously developed drones and aircrafts , covering areas such as autonomous navigation, swarm technology, computer vision, payload delivery, surveillance, and disaster management. Drone tech startups will showcase cutting-edge products, R&D breakthroughs, and commercial use cases in sectors like defense, agriculture, mapping, logistics, and smart infrastructure. Beyond static displays, the showcase emphasizes live pilot skill demonstrations, where expert pilots and student teams execute precision maneuvers . The event also features experience-sharing sessions, allowing participants to gain insights into drone design, regulations, startup journeys, challenges in field deployment, and future trends in UAV ecosystems.',
        eventDate: '5th February 2026',
        teamSize: 'Open',
        venue: 'Open Ground, IIIT Una',
        contact: 'meraki@iiitu.ac.in | +91 7017488532',
        registerLink: 'mailto:meraki@iiitu.ac.in?subject=Sky Circuit Registration&body=Hello, I would like to showcase something cool at Sky Circuit event',
        buttonText: 'JOIN US',
        sponsors: [
            { name: "CAIR", institution: "IIT Mandi", logo: cairLogo, type: "Title Sponsor" },
            { name: "AEROSTAR", logo: aerostarLogo, type: "Co-Sponsor" },
            { name: "Agastya Club", institution: "NIT Jalandhar", logo: agastyaLogo, type: "Event Patron" },
            { name: "Team Shakti", institution: "Chitkara University", logo: teamShaktiLogo, type: "Event Patron" }
        ]
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
