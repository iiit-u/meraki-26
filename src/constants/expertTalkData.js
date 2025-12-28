/**
 * @fileoverview Expert Talk data for speaker cards section.
 * 
 * Contains speaker information for the homepage Expert Talk section.
 * Each speaker features a name, title, photo, and highlight points
 * that display on hover.
 * 
 * @module constants/expertTalkData
 */

import colSubhajeetImg from "../assets/experts/ColSubhajeetNahaRetd.jpg";
import drAmitShuklaImg from "../assets/experts/DrAmitShukla.jpg";
import skPandeyImg from "../assets/experts/ShShyamKrishnaPandey.jpg";

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
        name: "Col. Subhajeet Naha (Retd)",
        title: "Founder & CTO, Protecte Technologies",
        image: colSubhajeetImg,
        highlights: [
            "Indian Army (26+ years)",
            "Anti-Drone Warfare Expert",
            "Electronic Warfare Expert",
            "Blockchain, AI & Cybersecurity"
        ]
    },
    {
        id: 2,
        name: "Dr. Amit Shukla",
        title: "Chairperson, CAIR, IIT Mandi",
        image: drAmitShuklaImg,
        highlights: [
            "Roboticist, AI Expert, Entrepreneur",
            "Robotics & Drone Technology",
            "AI & ML",
            "Cyber Security & Electric Vehicles",
        ]
    },
    {
        id: 3,
        name: "Shri SK Pandey",
        title: "Scientist/Engineer - SG, ISTRAC ISRO",
        image: skPandeyImg,
        highlights: [
            "Satcom",
            "TTC Ground Stations",
            "Control Engineering"
        ]
    },
];
