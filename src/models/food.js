'use strict';

// require('dotenv').config();
const { DataTypes } = require('sequelize');
// const { sequelize } = require('./index.js');

// const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';
// const sequelize = new Sequelize(SQL_URL);

const Food = (sequelize) => sequelize.define('Food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taste:{
    type:DataTypes.ENUM('sweet', 'savory', 'spicy', 'salty', 'bland', 'tart', 'bitter'),
    allowNull: false,
  },
  isVegan: {
    type:DataTypes.BOOLEAN,
    allowNull:true,
  },
  dressCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Food;
