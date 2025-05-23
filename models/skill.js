const sequelize = require('../config/database')
const {DataTypes} = require('sequelize')

const Skill = sequelize.define('Skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  Skill.associate = (models) => {
    Skill.belongsToMany(models.Parent,{
      through : "ParentSkill"
    })
  }

  module.exports = Skill