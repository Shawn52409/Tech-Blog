// Dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get a single comment
router.get('/:id', (req, res) => {
    Comment.findAll({
       where: {
          post_id: req.params.id
       }
    })
       .then(commentData => res.json(commentData))
       .catch(err => {
          console.log(err);
          res.status(400).json(err);
       });
 });

//  Post a new comment
router.post('/', withAuth, (req, res) => {    
    // check the session
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        // Using the id from the session
        user_id: req.session.user_id
      })
        .then(commentData => res.json(commentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    };
  });

module.exports = router;