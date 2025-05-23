const sequelize = require('../config/database')
const DataTypes = require('sequelize')

const Profile = sequelize.define('profiles', {
  bio: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Parents',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
})
Profile.associate = (model) => {
  Profile.belongsTo(model.Parent, {
    foreignKey: 'parentId',
    as: 'parent'
  })
}



module.exports = Profile