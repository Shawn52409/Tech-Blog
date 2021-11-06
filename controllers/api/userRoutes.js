// Dependencies
const router = require('express').Router();
const { User, Posting, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Add a new user (/api/users)
router.post('/', (req, res) => {
  console.log('Im here')
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then (userData => {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json(userData);
      console.log(userData);
    })
  }).catch (err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// add new user with async (/api/users)
// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.username = userData.username;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// Login an existing user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect user name or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout user
router.post('/logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
