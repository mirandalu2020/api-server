'use strict';


const { DataTypes } = require('sequelize');
const { sequelize } = require('./index.js');

const Clothes = sequelize.define('Clothes', {
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  style: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVintage: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = {
  // sequelize,
  Clothes,
};
