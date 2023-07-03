const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database/conn');

const RevokedToken = db.define('RevokedToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = RevokedToken;
