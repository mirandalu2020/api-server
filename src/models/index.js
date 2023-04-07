'use strict';

require('dotenv').config();
const { Sequelize } = require('sequelize');
const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';
const sequelize = new Sequelize(SQL_URL);

const createFood = require('./food');
const createClothes = require('./clothes');
const Collection = require('../lib/Collection');

//inject sequelize into the models
const FoodModel = createFood(sequelize);
const ClothesModel = createClothes(sequelize);

//what styles of clothes go with what type of food
ClothesModel.hasMany( FoodModel, { foreignKey: 'dressCode' });
FoodModel.belongsTo(ClothesModel);


module.exports = {
  //short-hand eq of sequelize: sequelize
  sequelize,
  Clothes: new Collection(ClothesModel),
  Food: new Collection(FoodModel),
};
