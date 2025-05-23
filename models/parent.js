const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Parent = sequelize.define('Parent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
});

Parent.associate = (models) => {
  Parent.hasMany(models.Childs, {
    foreignKey: 'parentId',
    unique : true,
    
  })
  Parent.associate = (models) => {
  Parent.hasOne(models.Profile, {
    foreignKey: 'parentId',
    as: 'profile',
    unique: true,
  })}
  
  Parent.belongsToMany(models.Skill ,{through : "ParentSkill"});
};

module.exports = Parent;
