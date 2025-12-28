/**
 * @fileoverview Gallery collection configuration for Gallery page.
 * 
 * Defines photo collection categories with associated folder names
 * for dynamic image loading from assets.
 * 
 * @module constants/galleryData
 */

/**
 * Gallery photo collection categories.
 * Each collection represents a tab/section in the Gallery page.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {string} id - Unique collection identifier for routing/state
 * @property {string} title - Display title for tab/heading
 * @property {string} folder - Subfolder name in assets/gallery/
 */
export const galleryCollections = [
    {
        id: 'elite_events',
        title: 'Flagship Events',
        folder: 'elite_events',
    },
    {
        id: 'software',
        title: 'Software',
        folder: 'software',
    },
    {
        id: 'workshop',
        title: 'Workshop',
        folder: 'workshop',
    },
    {
        id: 'opening',
        title: 'Inauguration',
        folder: 'opening',
    },
    {
        id: 'robotics',
        title: 'Robotics',
        folder: 'robotics',
    },
];
