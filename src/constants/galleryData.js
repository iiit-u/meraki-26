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
        id: 'highlights',
        title: 'Event Highlights',
        folder: 'highlights',
    },
    {
        id: 'competitions',
        title: 'Competitions',
        folder: 'competitions',
    },
    {
        id: 'workshops',
        title: 'Workshops',
        folder: 'workshops',
    },
    {
        id: 'team_fun',
        title: 'Team Fun',
        folder: 'team_fun',
    },
];
