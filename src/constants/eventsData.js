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
import teamShaktiLogo from "../assets/team_shakti.webp";

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
        description: "Robo Drive is a robotics competition where teams design and manually control a robot car to complete a predefined track in the shortest possible time.",
        isElite: true,
        comingSoon: false,
    },
    {
        id: 3,
        title: "HACK-THE-THRONE",
        slug: "hack-the-throne",
        image: hackTheThroneImg,
        description: "24-hour high-intensity hackathon where innovators, coders, and problem-solvers collaborate to build impactful tech solutions.",
        isElite: true,
        comingSoon: false,
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
        price: '₹20000/-',
        tags: ['Robotics', 'Engineering', 'Competition', 'Innovation'],
        badge: 'FLAGSHIP EVENT',
        description: 'Robo Drive is a robotics competition where teams design and manually control a robot car to complete a predefined track in the shortest possible time...',
        fullDescription: 'Robo Drive is a robotics competition where teams design and manually control a robot car to complete a predefined track in the shortest possible time. The track includes sharp turns, obstacles, and checkpoints that must be navigated strictly according to the event rules. Evaluation is purely time-based, and final rankings are decided solely by the total time taken, including any applicable penalties. Serious rule violations may result in immediate disqualification. The event emphasizes practical application of robot design, motor control, basic Arduino usage, and real-time driving decisions under competitive conditions.',
        eventDate: 'February 7, 2026',
        teamSize: '2-4 Members',
        venue: 'IIIT Una Campus',
        contact: 'meraki@iiitu.ac.in | +91 6283746751',
        brochureLink: '/brochures/Event Brochure - Robo Drive.pdf',
        registerLink: 'https://unstop.com/p/robodrive-meraki-2026-indian-institute-of-information-technology-iiit-una-1617278'
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
        price: '₹48000/-',
        tags: ['Coding', 'Hackathon', 'Innovation', 'Tech'],
        badge: 'COMPETITIVE',
        description: 'Hack-The-Throne is a national-level inter-college hackathon organized under Meraki 2026, the Annual Tech Fest...',
        fullDescription: 'Hack-The-Throne is a national-level inter-college hackathon organized under Meraki 2026, the Annual Tech Fest. It is exclusively designed for students who want to move beyond theoretical learning and apply their technical knowledge to solve real-world problems. The hackathon provides a structured and competitive environment where teams ideate, pitch, and build practical solutions under strict time and evaluation constraints, closely simulating real industry hackathons and startup ecosystems. Participants experience the complete innovation lifecycle, from problem identification and proposal submission to rapid prototyping and final evaluation.\n\nHackathon Themes:\n\n• Sustainability & Green Technology: Solutions focused on climate change mitigation, renewable energy, waste management, pollution control, and sustainable resource utilization.\n\n• FinTech & Digital Innovation: Innovations in digital payments, financial inclusion, fraud detection, blockchain applications, and modern banking systems.\n\n• Health Technology: Technology-driven healthcare solutions including telemedicine, digital diagnostics, mental health tools, and patient monitoring systems.\n\n• Smart Automation: Software-driven automation using AI, machine learning, data pipelines, APIs, and intelligent systems to streamline workflows, optimize decision-making, and reduce manual effort across digital platforms.\n\n• Digital Security Systems: Cybersecurity-focused solutions covering authentication, secure data handling, threat detection, and privacy protection.',
        eventDate: 'February 5-6, 2026',
        teamSize: '2-4 Members',
        venue: 'Computer Lab, IIIT Una',
        contact: 'meraki@iiitu.ac.in | +91 9721234663',
        brochureLink: '/brochures/hackathone.pdf',
        registerLink: 'https://hack-the-throne.devfolio.co/overview'
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
