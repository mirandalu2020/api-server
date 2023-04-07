'use strict';

const express = require('express');
const router = express.Router();
const { Food } = require('./../models');

router.get('/', readFood);
router.get('/:id', readOneFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);


async function readFood(req, res, next) {
  let data  = await Food.read();
  res.json(data);
}

async function readOneFood(req, res, next) {
  const foodId = req.params.id;
  // console.log(foodId);
  console.log(Food.model);
  // .findOne() is a sequelize method
  let data  = await Food.read(foodId);
  res.json(data);
}

async function createFood(req, res, next) {
  // .create() is a sequelize method
  const createFoodItem = await Food.create(req.body);
  res.json(createFoodItem);
}

async function updateFood(req, res, next) {
  const foodId = req.params.id;
  const foodItem = {
    // id: req.body.id,
    name: req.body.name,
    taste: req.body.taste,
    isVegan: req.body.isVegan,
  };

  // const toBeUpdated = await Food.findOne({ foodId });
  // await toBeUpdated.update(foodItem);
  // const result = await Food.findAll();
  const result = Food.update(foodId, foodItem);
  res.json(result);
}

async function deleteFood(req, res, next) {
  // const foodItem = {
  //   id: req.body.id,
  //   name: req.body.name,
  //   taste: req.body.taste,
  //   isVegan: req.body.isVegan,
  // };
  // const deletedFoodItem = await Food.findOne(foodItem);
  // await deletedFoodItem.destroy();
  await Food.delete(req.params.id);
  const result = await Food.read();
  res.json(result);
}

module.exports = router;
