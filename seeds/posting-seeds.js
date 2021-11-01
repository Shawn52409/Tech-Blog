const Posting = require('../models');

const postingData = [
    {
        post_title: "handlebars!",
        post_content: "I really need some help on handlebars.  Anyone recommend any good sites that can help me understand it better?",
        user_id: 1
    },
    {
        post_title: "Web languages",
        post_content: "What is the computer language that most employers are looking for these days?",
        user_id: 2
    },
    {
        post_title: "React",
        post_content: "What is the best book to help me learn React?",
        user_id: 3
    },
    {
        post_title: "...",
        post_content: "What does ... mean in JS?",
        user_id: 4
    },
    {
        post_title: "Front end style question",
        post_content: "What is a jass.css file refer too?",
        user_id: 5
    },
]
const seedPostings = () => Posting.bulkCreate(postingData);

module.exports = seedPostings;