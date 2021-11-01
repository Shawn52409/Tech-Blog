const Posting = require('../models');

const postingData = [
    {
        post_title: "handlebars!",
        post_content: "I really need some help on handlebars.  Anyone recommend any good sites that can help me understand it better?",
        user_id: 1
    }
]
const seedPosts = () => Posting.bulkCreate(postingData);

module.exports = seedPosts;