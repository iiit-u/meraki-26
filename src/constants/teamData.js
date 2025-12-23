/**
 * @fileoverview Team member data for Team page.
 * 
 * Contains faculty coordinators, core team members, and department heads
 * displayed on the Team page.
 * 
 * @module constants/teamData
 */

/**
 * Faculty and lead coordinators.
 * Displayed prominently at the top of the Team page.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {string} name - Full name
 * @property {string} role - Position/title
 * @property {string} [subtitle] - Additional descriptor
 * @property {boolean} [isHOD] - If true, styled as HOD card
 */
export const coordinators = [
    {
        name: 'Dr. Madan Verma',
        role: 'Faculty Coordinator',
        subtitle: 'DR. MADAN - IIIT UNA'
    },
    {
        name: 'Prof. Manish Gaur',
        role: 'HOD CSE',
        isHOD: true
    },
    {
        name: 'Dr. Madan Verma',
        role: 'Faculty Coordinator'
    }
];

/**
 * Core student coordinators.
 * Secondary section on Team page.
 * 
 * @constant
 * @type {Array<{name: string, role: string}>}
 */
export const coreCoordinators = [
    { name: 'Core Member 1', role: 'Coordinator' },
    { name: 'Core Member 2', role: 'Coordinator' },
    { name: 'Core Member 3', role: 'Coordinator' },
    { name: 'Core Member 4', role: 'Coordinator' },
    { name: 'Core Member 5', role: 'Coordinator' },
];

/**
 * Department/team leads.
 * Tertiary section on Team page.
 * 
 * @constant
 * @type {Array<{name: string, role: string}>}
 */
export const departmentHeads = [
    { name: 'Department Head 1', role: 'Lead' },
    { name: 'Department Head 2', role: 'Lead' },
    { name: 'Department Head 3', role: 'Lead' },
];
