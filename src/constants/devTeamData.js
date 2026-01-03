/**
 * @fileoverview Development team data for DevTeam credits page.
 * 
 * Contains website developer information and page configuration
 * for the DevTeam.jsx page component.
 * 
 * @module constants/devTeamData
 */

import vanshImg from '../assets/devteam/vansh.webp';
import pranavImg from '../assets/coordinators/pranav.webp';
import yuvrajImg from '../assets/devteam/yuvraj.webp';
import deepImg from '../assets/devteam/deep.webp';
import aryanImg from '../assets/devteam/aryan.webp';
import adityaImg from '../assets/devteam/aditya.webp';
import nikhilImg from '../assets/devteam/nikhil.webp';
import pulkitImg from '../assets/devteam/pulkit.webp';
import sundaramImg from '../assets/devteam/sundaram.webp';
import ayushImg from '../assets/devteam/ayush.webp';

/**
 * Development team members array.
 * Displayed as profile cards on the DevTeam page.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {string} name - Developer's full name
 * @property {string} role - Technical role/specialty
 * @property {string} photo - Imported image module path
 */
export const devTeamMembers = [
    {
        name: "Vansh Verma",
        role: "Website Coordinator",
        photo: vanshImg,
        tier: 1,
    },
    {
        name: "Pranav Garg",
        role: "Website Coordinator",
        photo: pranavImg,
        tier: 1,
    },
    {
        name: "Yuvraj Singh Chauhan",
        role: "Fullstack Developer",
        photo: yuvrajImg,
        tier: 2,
    },
    {
        name: "Deep Shekhar Singh",
        role: "Fullstack Developer",
        photo: deepImg,
        tier: 2,
    },
    {
        name: "Aryan Sheoran",
        role: "Fullstack Developer",
        photo: aryanImg,
        tier: 2,
    },
    {
        name: "Aditya Raman",
        photo: adityaImg,
        tier: 3,
    },
    {
        name: "Nikhil Mishra",
        photo: nikhilImg,
        tier: 3,
    },
    {
        name: "Pulkit Sujaan",
        photo: pulkitImg,
        tier: 3,
    },
    {
        name: "Sundaram Gupta",
        photo: sundaramImg,
        tier: 3,
    },
    {
        name: "Ayush Arya",
        photo: ayushImg,
        tier: 3,
    },
];

/**
 * DevTeam page configuration.
 * Contains all text content for the page header and footer.
 * 
 * @constant
 * @type {Object}
 * 
 * @property {string} pageTitle - Main heading text
 * @property {string} pageSubtitle - Secondary heading
 * @property {string} sectionDescription - Introductory paragraph
 * @property {string} sectionFooterText - Footer message
 */
export const devTeamConfig = {
    pageTitle: "THE BUILDERS",
    pageSubtitle: "ARCHITECTS OF THIS REALM",
    sectionDescription: "Meet the craftsmen who mined ideas and built this digital world, block by block.",
    sectionFooterText: ""
};
