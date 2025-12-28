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
        role: "Fullstack Lead",
        photo: vanshImg,
    },
    {
        name: "Pranav Garg",
        role: "UI/UX Designer and Fullstack Lead",
        photo: pranavImg,
    },
    {
        name: "Yuvraj Singh Chauhan",
        role: "Fullstack Developer",
        photo: yuvrajImg,
    },
    {
        name: "Deep Shekhar Singh",
        role: "Fullstack Developer",
        photo: deepImg,
    },
    {
        name: "Aryan Sheoran",
        role: "Fullstack Developer",
        photo: aryanImg,
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
