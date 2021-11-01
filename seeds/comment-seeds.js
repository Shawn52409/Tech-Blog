const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 4,
        comment_text: "It lets work with only the keys of an object"
    },
    {
        user_id: 2,
        post_id: 4,
        comment_text: "I believe React seems to be the sought after skill"
    }
]
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;