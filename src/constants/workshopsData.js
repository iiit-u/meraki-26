/**
 * @fileoverview Workshop data for Workshops section and Workshop Details pages.
 * 
 * Contains workshop information for the homepage Workshops section.
 * Each workshop features a title, description, and detailed information.
 * 
 * @module constants/workshopsData
 */

import minecraftimg from "../assets/minecraft_dungeons_placeholder.webp";

/**
 * Workshops array for homepage cards.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {number} id - Unique workshop identifier
 * @property {string} title - Display title (uppercase)
 * @property {string} slug - URL-friendly identifier for routing
 * @property {string} image - Workshop thumbnail image path
 * @property {string} description - Short description for preview
 */
export const workshops = [
    {
        id: 1,
        title: "WEB DEVELOPMENT",
        slug: "web-development",
        image: minecraftimg,
        description: "Master modern web development with React, JavaScript, and responsive design principles.",
    },
    {
        id: 2,
        title: "AI & MACHINE LEARNING",
        slug: "ai-machine-learning",
        image: minecraftimg,
        description: "Explore cutting-edge AI and ML concepts with hands-on Python projects and neural networks.",
    },
    {
        id: 3,
        title: "GAME DEVELOPMENT",
        slug: "game-development",
        image: minecraftimg,
        description: "Create interactive 2D and 3D games using Unity and Unreal Engine from scratch.",
    },
    {
        id: 4,
        title: "CLOUD & DevOps",
        slug: "cloud-devops",
        image: minecraftimg,
        description: "Learn cloud deployment, containerization with Docker, and CI/CD pipelines for modern applications.",
    },
];

/**
 * Detailed workshop information keyed by slug.
 * Used for individual workshop detail pages.
 * 
 * @constant
 * @type {Object<string, Object>}
 * 
 * @property {string} title - Full workshop title
 * @property {string} description - Short teaser text
 * @property {string} fullDescription - Complete workshop description
 * @property {string} instructor - Workshop instructor name
 * @property {string} duration - Total duration with format
 * @property {string[]} prerequisites - Required knowledge/skills
 * @property {string[]} learningOutcomes - What participants will learn
 * @property {string} venue - Physical location
 * @property {string} registrationLink - Workshop registration URL
 */
export const workshopDetailsData = {
    'web-development': {
        title: 'WEB DEVELOPMENT',
        description: 'Master modern web development with React, JavaScript, and responsive design principles.',
        fullDescription: 'This comprehensive workshop covers modern web development practices. Learn how to build responsive, dynamic web applications using React, JavaScript ES6+, and CSS3. Topics include state management, component architecture, API integration, and deployment best practices.',
        instructor: 'Expert Web Developer',
        duration: '3 Hours',
        prerequisites: ['Basic JavaScript', 'HTML/CSS Fundamentals'],
        learningOutcomes: ['Build React components', 'Manage state with hooks', 'Create responsive layouts', 'Connect to APIs'],
        venue: 'Computer Lab 1, IIIT Una',
        registrationLink: '#'
    },
    'ai-machine-learning': {
        title: 'AI & MACHINE LEARNING',
        description: 'Explore cutting-edge AI and ML concepts with hands-on Python projects and neural networks.',
        fullDescription: 'Dive deep into artificial intelligence and machine learning. This workshop covers supervised and unsupervised learning, neural networks, deep learning frameworks like TensorFlow and PyTorch, and real-world applications. Hands-on projects include image classification and natural language processing.',
        instructor: 'ML Research Specialist',
        duration: '4 Hours',
        prerequisites: ['Python Programming', 'Linear Algebra Basics', 'Statistics'],
        learningOutcomes: ['Understand ML algorithms', 'Build neural networks', 'Work with TensorFlow', 'Deploy ML models'],
        venue: 'Research Lab, IIIT Una',
        registrationLink: '#'
    },
    'game-development': {
        title: 'GAME DEVELOPMENT',
        description: 'Create interactive 2D and 3D games using Unity and Unreal Engine from scratch.',
        fullDescription: 'Learn game development fundamentals using industry-standard engines. This workshop covers game design principles, 2D and 3D development, physics engines, audio integration, and publishing. Build your own game prototype from concept to playable demo.',
        instructor: 'Game Dev Professional',
        duration: '3 Hours',
        prerequisites: ['C# or C++', 'Basic Computer Graphics'],
        learningOutcomes: ['Design game mechanics', 'Build with Unity/Unreal', 'Implement physics', 'Publish games'],
        venue: 'Game Dev Lab, IIIT Una',
        registrationLink: '#'
    },
    'cloud-devops': {
        title: 'CLOUD & DevOps',
        description: 'Learn cloud deployment, containerization with Docker, and CI/CD pipelines for modern applications.',
        fullDescription: 'Master cloud infrastructure and DevOps practices. Topics include Docker containerization, Kubernetes orchestration, AWS/Azure cloud services, continuous integration and deployment, infrastructure as code, and monitoring. Set up a complete CI/CD pipeline from scratch.',
        instructor: 'DevOps Engineer',
        duration: '3 Hours',
        prerequisites: ['Linux Command Line', 'Git/Version Control'],
        learningOutcomes: ['Use Docker and Kubernetes', 'Deploy to cloud', 'Build CI/CD pipelines', 'Monitor applications'],
        venue: 'Server Room, IIIT Una',
        registrationLink: '#'
    }
};
