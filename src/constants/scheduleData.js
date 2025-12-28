/**
 * @fileoverview Event schedule data organized by day.
 * 
 * Contains the multi-day event schedule with timing, event names,
 * and links to event detail pages.
 * 
 * @module constants/scheduleData
 */

import minecraftimg from "../assets/minecraft_dungeons_placeholder.webp";

/**
 * Feature flag to show/hide schedule.
 * Set to true when schedule data is finalized and ready for display.
 * When false, Schedule page shows "Coming Soon" message.
 * 
 * @constant
 * @type {boolean}
 */
export const showSchedule = false;

/**
 * Event schedule organized by day number.
 * Keys are day numbers (1, 2, 3), values are arrays of scheduled events.
 * 
 * @constant
 * @type {Object<number, Array<Object>>}
 * 
 * @property {string} time - Event start time (e.g., "10:00 AM")
 * @property {string} event - Event display name
 * @property {string} icon - Emoji icon for visual identification
 * @property {string} slug - URL-friendly identifier for event details link
 * @property {string} eventId - Unique event instance ID
 * @property {string} image - Event thumbnail image path
 * 
 * @example
 * // Day 1 first event
 * scheduleData[1][0]
 * // { time: '10:00 AM', event: 'DRONE EVENT', slug: 'drone-event', ... }
 */
export const scheduleData = {
    1: [
        { time: '10:00 AM', event: 'DRONE EVENT', icon: '🚁', slug: 'drone-event', eventId: 'EVT-101', image: minecraftimg },
        { time: '11:30 AM', event: 'ROBO DRIVE', icon: '🤖', slug: 'robo-drive', eventId: 'EVT-102', image: minecraftimg },
        { time: '2:00 PM', event: 'TECH CHALLENGE', icon: '💻', slug: 'tech-challenge', eventId: 'EVT-103', image: minecraftimg },
        { time: '4:00 PM', event: 'INNOVATION QUEST', icon: '💡', slug: 'innovation-quest', eventId: 'EVT-104', image: minecraftimg },
    ],
    2: [
        { time: '9:00 AM', event: 'ROBO DRIVE', icon: '🤖', slug: 'robo-drive', eventId: 'EVT-201', image: minecraftimg },
        { time: '11:00 AM', event: 'TECH CHALLENGE', icon: '💻', slug: 'tech-challenge', eventId: 'EVT-202', image: minecraftimg },
        { time: '2:00 PM', event: 'DRONE EVENT', icon: '🚁', slug: 'drone-event', eventId: 'EVT-203', image: minecraftimg },
        { time: '4:30 PM', event: 'INNOVATION QUEST', icon: '💡', slug: 'innovation-quest', eventId: 'EVT-204', image: minecraftimg },
    ],
    3: [
        { time: '10:00 AM', event: 'DRONE EVENT', icon: '🚁', slug: 'drone-event', eventId: 'EVT-301', image: minecraftimg },
        { time: '1:00 PM', event: 'ROBO DRIVE', icon: '🤖', slug: 'robo-drive', eventId: 'EVT-302', image: minecraftimg },
        { time: '3:00 PM', event: 'TECH CHALLENGE', icon: '💻', slug: 'tech-challenge', eventId: 'EVT-303', image: minecraftimg },
    ]
};
