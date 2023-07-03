const { DataTypes } = require('sequelize')
const db = require('../database/conn')

const Course = db.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  studentsAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})
  
module.exports = Course