const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Childs = sequelize.define('Childs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Parents', 
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  timestamps: true,
});

Childs.associate = (models) => {
  Childs.belongsTo(models.Parent, {
    foreignKey: 'parentId'
    
  });
};


module.exports = Childs;
