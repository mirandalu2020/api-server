'use strict';

const express = require('express');
const router = express.Router();
const { Food } = require('./../models/food');

router.get('/', readFood);
router.get('/:id', readOneFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

// Function to get all the data from Food model
async function readFood(req, res, next) {
  let data  = await Food.findAll();
  res.json(data);
}

async function readOneFood(req, res, next) {
  const foodId = req.params.id;
  let data  = await Food.findOne({ foodId  });
  res.json(data);
}

async function createFood(req, res, next) {
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
  const toBeUpdated = await Food.findOne({ foodId });
  await toBeUpdated.update(foodItem);
  const result = await Food.findAll();
  res.json(result);
}

async function deleteFood(req, res, next) {
  const foodItem = {
    id: req.body.id,
    name: req.body.name,
    taste: req.body.taste,
    isVegan: req.body.isVegan,
  };
  const deletedFoodItem = await Food.findOne(foodItem);
  await deletedFoodItem.destroy();
  const result = await Food.findAll();
  res.json(result);
}

module.exports = router;
