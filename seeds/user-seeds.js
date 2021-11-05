const { User } = require('../models');

const userData = [
    {
        username: 'shawn',
        password: 'password1'
    },
    {
        username: 'user2',
        password: 'password2'
    },
    {
        username: 'user3',
        password: 'password3'
    },
    {
        username: 'user4',
        password: 'password4'
    },
    {
        username: 'user5',
        password: 'password5'
    },
]

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});


module.exports = seedUsers;