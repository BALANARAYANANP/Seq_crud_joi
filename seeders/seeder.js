// seeders/seedUsers.js
const User = require('../models/user');

async function seedUsers() {
  await User.bulkCreate([
    { name: 'Paul', email: 'abc.doe@example.com' },
    { name: 'Bala', email: 'xyz.smith@example.com' },
    { name: 'Vijay', email: '123.cooper@example.com' }
  ]);
  console.log(' Users seeded.');
}

// 👇 Export the function
module.exports = seedUsers;



