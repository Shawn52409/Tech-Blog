const router = require('express').Router();
const { Comment, User, Posting } = require('../models');
const withAuth = require('../utils/auth');

// Render home page
router.get('/', async (req, res) => {
  try {
    // Get all postings and JOIN with user data
    const postingData = await Posting.findAll({
      attributes: [
        'id',
        'post_title',
        'post_content',
        'post_timestamp',
      ],      
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'user_id', 'post_id', 'comment_text', 'comment_timestamp'],
          include: {
            model: User,
            attributes: ['username']
          }

        }
      ],
    });

    // Serialize data so the template can read it
    const postings = postingData.map((posting) => posting.get({ plain: true }));
    console.log(postings);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      postings, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render single post
router.get('/post/:id', async (req, res) => {
  try {
    const postingData = await Posting.findByPk(req.params.id, {
      attributes: [
        'id',
        'post_title',
        'post_content',
        'post_timestamp',
      ],      
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'user_id', 'post_id', 'comment_text', 'comment_timestamp'],
          include: {
            model: User,
            attributes: ['username']
          }

        }
      ],
    });

    const posting = postingData.get({ plain: true });
    console.log(posting);
    res.render('single-posting', {
      posting,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login and sign up page
router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
      return;
    }  
    res.render('login');
  });

module.exports = router;