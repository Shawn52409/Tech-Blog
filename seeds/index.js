const seedUsers = require('./user-seeds');
const seedPostings = require('./posting-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\nDATABASE SYNCED\n');
  
  await seedUsers();
    console.log('\nUSERS SEEDED\n');
  
  await seedPostings();
    console.log('\nPOSTINGS SEEDED\n');

  await seedComments();
    console.log('\nCOMMENTS SEEDED\n');

  process.exit(0);
};

seedAll();