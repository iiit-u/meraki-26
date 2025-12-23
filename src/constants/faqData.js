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
        question: "What is MERAKI?",
        answer: "MERAKI is the annual technical festival of IIIT Una, showcasing innovation, technology, and creativity through various events, workshops, and competitions."
    },
    {
        id: 2,
        question: "When is MERAKI 2026?",
        answer: "MERAKI 2026 will be held from February 5-7, 2026 at IIIT Una's Salohcampus."
    },
    {
        id: 3,
        question: "How do I register for events?",
        answer: "You can register for events through our website by clicking on the 'Register Now' button for your desired event."
    },
    {
        id: 4,
        question: "Is accommodation provided?",
        answer: "Yes, accommodation facilities will be provided for outstation participants. Please mention your requirement during registration."
    },
    {
        id: 5,
        question: "What is the team size for events?",
        answer: "Team size varies by event. Most events allow teams of 2-4 members. Check individual event details for specific requirements."
    },
    {
        id: 6,
        question: "Are there any workshops?",
        answer: "Yes, we conduct multiple technical and non-technical workshops throughout the fest. Workshop details will be updated on the schedule page."
    },
    {
        id: 7,
        question: "How does Meraki impact the community?",
        answer: "Meraki provides a platform for students to showcase their technical skills, learn new technologies, and connect with like-minded individuals. It also helps in building a community of technical enthusiasts."
    },
    {
        id: 8,
        question: "Can students from other colleges participate?",
        answer: "Absolutely! MERAKI welcomes students from all colleges and universities across India. Registration is open to everyone."
    },
    {
        id: 9,
        question: "How do I reach IIIT Una campus?",
        answer: "IIIT Una is located in Saloh, Himachal Pradesh. The nearest railway station is Una Himachal and there is good connectivity by road from Chandigarh."
    },
    {
        id: 10,
        question: "Is food provided during the fest?",
        answer: "Yes, food stalls and a festival canteen will be operational throughout the event."
    },
    {
        id: 11,
        question: "Can I participate in multiple events?",
        answer: "Yes, you can participate in multiple events as long as their schedules don't overlap. Check the schedule page to plan your participation accordingly."
    },
    {
        id: 12,
        question: "Who can I contact for sponsorship inquiries?",
        answer: "For sponsorship and partnership opportunities, please reach out to our sponsorship team at sponsors@meraki.iiitu.ac.in or fill out the contact form on our website."
    }
];
