/**
 * @fileoverview Team member data for Team page.
 * 
 * Contains faculty coordinators, core team members, and department heads
 * displayed on the Team page.
 * 
 * @module constants/teamData
 */

// Import coordinator photos
import pranavImg from '../assets/coordinators/pranav.webp';
import rishavImg from '../assets/coordinators/Rishav.webp';
import tanishqImg from '../assets/coordinators/Tanishq.webp';
import avadhImg from '../assets/coordinators/Avadh.webp';
import sheenaImg from '../assets/coordinators/sheena.webp';
import adityaImg from '../assets/coordinators/AdityaPandey.webp';
import aryanImg from '../assets/coordinators/Aryan.webp';
import jayaniImg from '../assets/coordinators/Jayni.webp';
import ridhamImg from '../assets/coordinators/Ridham.webp';
import purusharthImg from '../assets/coordinators/Purusharth Rana.webp';
import vinitImg from '../assets/coordinators/Vinit.webp';
import DeepuImg from '../assets/coordinators/Deepu.webp';

// Import faculty coordinator photos
import directorImg from '../assets/coordinators/Director-iiitu.webp';
import tanuImg from '../assets/coordinators/tanu.webp';
import madanImg from '../assets/coordinators/madan.webp';

/**
 * Faculty coordinators (COORDINATORS section)
 * Displayed prominently at the top of the Team page.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {string} name - Full name
 * @property {string} role - Position/title
 * @property {string} [subtitle] - Additional descriptor
 * @property {boolean} [isDirector] - If true, styled as Director card
 * @property {string} [image] - Path to coordinator photo
 */
export const coordinators = [
    {
        name: 'Prof. Manish Gaur',
        role: 'Director',
        subtitle: 'IIIT UNA',
        isDirector: true,
        image: directorImg
    },
    {
        name: 'Dr. Tanu Wadhera',
        role: 'Technical Coordinator',
        subtitle: 'IIIT UNA',
        image: tanuImg
    },
    {
        name: 'Dr. Madan Verma',
        role: 'Technical Coordinator',
        subtitle: 'IIIT UNA',
        image: madanImg
    }
];

/**
 * Overall Core Coordinators (CONVENORS section)
 * Top-level student coordinators with contact information.
 * 
 * @constant
 * @type {Array<{name: string, role: string, phone?: string, image?: string}>}
 */
export const coreCoordinators = [
    { name: 'Pranav Garg', role: 'Overall Coordinator', phone: '+91 76968 97912', image: pranavImg },
    { name: 'Rishav Raj', role: 'Overall Coordinator', phone: '+91 85950 55375', image: rishavImg },
    { name: 'Tanishq Singh', role: 'Overall Coordinator', phone: '+91 70174 88532', image: tanishqImg },
];

/**
 * Day-wise coordinators.
 * Coordinators assigned to each day of the fest.
 * 
 * @constant
 * @type {Array<{name: string, role: string, image?: string}>}
 */
export const dayCoordinators = [
    { name: 'Avadh Agarwal', role: 'Co-Coordinator', image: avadhImg },
    { name: 'Sheena', role: 'Co-Coordinator', image: sheenaImg },
    { name: 'Aditya Pandey', role: 'Co-Coordinator', image: adityaImg },
    { name: 'Aryan Raj', role: 'Co-Coordinator', image: aryanImg },
    { name: 'Jayani Srivastava', role: 'Co-Coordinator', image: jayaniImg },
    { name: 'Ridham', role: 'Co-Coordinator', image: ridhamImg },
    { name: 'Purusharth Rana', role: 'Co-Coordinator', image: purusharthImg },
];

/**
 * Department/team leads.
 * Heads of various departments for the fest.
 * 
 * @constant
 * @type {Array<{name: string, role: string, image?: string}>}
 */
export const departmentHeads = [
    { name: 'Deepu', role: 'Decorations Head', image: DeepuImg },
    { name: 'Vinit', role: 'Design Head', image: vinitImg },
];
