// Dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posting, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// route to render dashboard page (only if user is logged in)
router.get('/', withAuth, (req, res) => {
    // Find all Posts user posts from db
    Posting.findAll({
        where: {
            user_id: req.session.user_id            
        },
        attributes: [
            'id',
            'post_title',
            'post_content',
            'comment_timestamp',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'posting_id', 'user_id', 'comment_timestamp'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }    
        ]
    }).then(postingData => {
        const postings = postingData.map(posting => posting.get({ plain: true }));
        // Render the dashboard handlebars
        res.render('dashboard', { postings, logged_in: true});
    }).catch (err => {
        console.log(err)
        res.status(500).json(err);
    });

})

// route to edit a post
router.get('/edit/:id', withAuth, (req, res) => {
    Posting.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_title',
            'post_content',
            'comment_timestamp',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'posting_id', 'user_id', 'comment_timestamp'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postingData => {
        if (!postingData){
            res.status(404).json({ message: 'There is no post with that id'});
            return;
        }

        const posting = postingData.get({ plain:true })
        res.render('edit_post', {posting, logged_in: true });
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;