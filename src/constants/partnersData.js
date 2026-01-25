/**
 * @fileoverview Shared partner data and assets for Sponsors and Partners components.
 */

// Import logos
import iiituLogo from '../assets/sponsors/iiitu_logo.webp';
import interviewBuddyLogo from '../assets/sponsors/interview_buddy.webp';
import unstopLogo from '../assets/sponsors/unstop_logo.svg';
import aerostarLogo from '../assets/sponsors/aerostar.webp';
import devfolioLogo from '../assets/sponsors/devfolio_logo.webp';
import whosNextLogo from '../assets/sponsors/whosnext.webp';
import mioartaiLogo from '../assets/mioartai.jpg';
import dopamineStoreLogo from '../assets/dopamine_store.avif';
import ethindiaLogo from '../assets/ethindia.svg';
import sjvnLogo from '../assets/sponsors/sjvn.webp';

// Placeholder for missing logos
const placeholderLogo = iiituLogo;
const doonLogo = "/doonmerch.webp";
const gfgLogo = "/gfg-gg-logo.svg";
const codechefLogo = "/codechef.jpeg";

// Partner Data with Categories

// PLATINUM PARTNERS - Commented out as requested
// export const platinumPartners = [
//     { name: "Platinum 1", firm: "Platinum Firm", designation: "Title Sponsor", logo: placeholderLogo, url: "#" }
// ];

const abhibusLogo = "/abhibus.png";
const plutoDronesLogo = "/pluto drones.webp";

export const goldPartners = [
    { name: "SJVN", firm: "SJVN", designation: "Gold Sponsor", logo: sjvnLogo, url: "https://sjvn.nic.in" }
    // Removed: Pluto Drones
];

export const travelPartners = [
    { name: "Abhibus", firm: "Abhibus", designation: "Travel Partner", logo: abhibusLogo, url: "https://www.abhibus.com/" }
];

export const merchLifestylePartners = [
    { name: "Dopamine Store", firm: "Dopamine Store", designation: "Merchandise Partner", logo: dopamineStoreLogo, url: "https://thedopaminestore.in" },
    { name: "Doon Merchandise", firm: "Doon Merchandise", designation: "Merchandise Partner", logo: doonLogo, url: "/merchandise", whiteBg: true }
];

export const platformPartners = [
    { name: "Unstop", firm: "Unstop", designation: "Platform Partner", logo: unstopLogo, url: "https://unstop.com" },
    { name: "GeeksforGeeks", firm: "GeeksforGeeks", designation: "Platform Partner", logo: gfgLogo, url: "https://www.geeksforgeeks.org/" },
    { name: "CodeChef", firm: "CodeChef", designation: "Platform Partner", logo: codechefLogo, url: "https://www.codechef.com/" },
    { name: "Devfolio", firm: "Devfolio", designation: "Platform Partner", logo: devfolioLogo, url: "https://devfolio.co" }
];

export const silverPartners = [
    { name: "InterviewBuddy", firm: "InterviewBuddy", designation: "Silver Sponsor", logo: interviewBuddyLogo, url: "https://interviewbuddy.net" },
    { name: "ETHindia", firm: "ETHindia", designation: "Silver Sponsor", logo: ethindiaLogo, url: "https://www.instagram.com/ethindiaco/" }
];

export const otherPartners = [
    { name: "mioArtAI", firm: "mioArtAI", designation: "Theme Partner", logo: mioartaiLogo, url: "https://www.instagram.com/mioartai/" },
    { name: "AEROSTAR", firm: "AEROSTAR", designation: "Technology Partner", logo: aerostarLogo, url: "https://www.instagram.com/aerostar007/" }
];
