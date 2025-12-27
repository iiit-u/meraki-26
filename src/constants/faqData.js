/**
 * @fileoverview FAQ content data for FAQ section flip cards.
 * 
 * Contains question and answer pairs displayed in the FAQ section.
 * Each item renders as a flippable card using the Box component.
 * 
 * @module constants/faqData
 */

/**
 * FAQ data array for homepage FAQ section.
 * 
 * @constant
 * @type {Array<Object>}
 * 
 * @property {number} id - Unique FAQ identifier
 * @property {string} question - Question text (displayed on front of card)
 * @property {string} answer - Answer text (revealed on hover/flip)
 */
export const faqData = [
    {
        id: 1,
        question: "When is Meraki held?",
        answer: "Usually in the spring semester (March–April), though dates vary each year."
    },
    {
        id: 2,
        question: "When is MERAKI 2026?",
        answer: "MERAKI 2026 will be held from February 5-7, 2026 at IIIT Una's Saloh campus."
    },
    {
        id: 3,
        question: "How do I register for events?",
        answer: "You can register for events through our website by clicking on the 'Register Now' button for your desired event."
    },
    {
        id: 4,
        question: "Are workshops part of Meraki?",
        answer: "Yes, sessions on AI, coding, robotics, and entrepreneurship are often conducted."
    },
    {
        id: 5,
        question: "Is it open to other colleges?",
        answer: "Yes, students from nearby and national institutes can participate."
    },
    {
        id: 6,
        question: "Is there a registration fee?",
        answer: "Major events are free, while others require a small fee for inter-college participants."
    },
    {
        id: 7,
        question: "How does Meraki impact the community?",
        answer: "Meraki provides a platform for students to showcase their technical skills, learn new technologies, and connect with like-minded individuals. It also helps in building a community of technical enthusiasts."
    },
    {
        id: 8,
        question: "What are the flagship events?",
        answer: "Skycircuit showcase, Hack-the-throne, Robo-drive, Robo-Trace are some major attractions."
    },
    {
        id: 9,
        question: "How do I reach IIIT Una campus?",
        answer: "IIIT Una is located in Saloh, Himachal Pradesh. The nearest railway station is Una Himachal and there is good connectivity by road from Chandigarh. For Details please check Contact us page."
    },
    {
        id: 10,
        question: "Is food provided during the fest?",
        answer: "Yes, food stalls and Cafeteria will be operational throughout the event."
    },
    {
        id: 11,
        question: "How does it impact the community?",
        answer: "It promotes local culture, tourism, and industry–academia collaboration."
    },
    {
        id: 12,
        question: "Are prizes given?",
        answer: "Yes, cash, certificates, goodies."
    }
];
