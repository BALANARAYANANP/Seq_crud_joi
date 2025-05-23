const sequelize = require('../config/db'); // make sure this returns only sequelize
const User = require('./user.model');
const Profile = require('./profile.model');
const Parents = require('./parent');
const Childss = require('./chilld');



const db = {
  sequelize,
  User,
  Profile,
  Parents,
  Childss
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

