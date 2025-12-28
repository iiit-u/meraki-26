/**
 * @fileoverview Centralized links and URLs for the Meraki website.
 * 
 * Contains all external URLs, social media links, and navigation data
 * used throughout the site. Update values here to change links globally.
 * 
 * @module constants/linksData
 */

/**
 * Social media links for Footer.
 * 
 * @constant
 * @type {Object}
 * @property {string} instagram - Instagram profile URL
 * @property {string} twitter - Twitter/X profile URL
 * @property {string} linkedin - LinkedIn page URL
 */
export const footerSocialLinks = {
    instagram: "https://www.instagram.com/meraki_iiitu/",
    twitter: "https://x.com/iiituna",
    linkedin: "https://www.linkedin.com/school/iiituna/",
};

/**
 * Links to other IIIT Una fests for Footer.
 * 
 * @constant
 * @type {Array<{name: string, url: string}>}
 */
export const otherFests = [
    { name: "MRIDANG", url: "https://mridang.iiitu.ac.in" },
    { name: "ESUMMIT", url: "https://esummit.iiitu.ac.in" },
];

/**
 * Quick navigation links for Footer.
 * Supports both internal routes and external URLs.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {string} name - Display text
 * @property {string} url - Route path or full URL
 * @property {boolean} external - If true, opens in new tab with rel="noopener"
 */
export const footerQuickLinks = [
    { name: "HOW TO REACH", url: "https://iiitu.ac.in/howtoreach", external: true },
    { name: "COORDINATING TEAM", url: "/team", external: false },
];

/**
 * External site links used across components.
 * 
 * @constant
 * @type {Object}
 * @property {string} iiituWebsite - IIIT Una official website
 * @property {string} googleMapsLocation - Google Maps search URL
 */
export const externalLinks = {
    iiituWebsite: "https://iiitu.ac.in",
    googleMapsLocation: "https://www.google.com/maps/search/?api=1&query=IIIT+Una+Saloh+Himachal+Pradesh",
};

/**
 * Event coordinator contact information for Footer.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {string} name - Coordinator's full name
 * @property {string} email - Institutional email
 * @property {string} phone - Contact phone number
 */
export const footerCoordinators = [
    {
        name: "Pranav Garg",
        email: "23346@iiitu.ac.in",
        phone: "+91 7696897912",
    },
    {
        name: "Tanishq Singh",
        email: "23362@iiitu.ac.in",
        phone: "+91 7017488532",
    },
    {
        name: "Rishav Raj",
        email: "23241@iiitu.ac.in",
        phone: "+91 8595055375",
    },
];
