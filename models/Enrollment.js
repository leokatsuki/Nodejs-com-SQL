const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/conn')

const User = require('./User')
const Course = require('./Course')

const Enrollment = db.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cancelationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
})

Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });


module.exports = Enrollment