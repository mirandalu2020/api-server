'use strict';

const express = require('express');
const router = express.Router();
const { Clothes } = require('./../models/clothes');

//CRUD for /clothes with functions
router.get('/', readClothes);
router.post('/', createClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);

//function for /get

async function readClothes(req, res, next) {
  let data  = await Clothes.findAll();
  res.json(data);
}

//function for /post
async function createClothes(req, res, next) {
  const createClothesItem = await Clothes.create(req.body);
  res.json(createClothesItem);
}

//Function for /put
async function updateClothes(req, res, next) {
  const clothesId = req.params.id;
  const clothesItem = {
    // id: req.body.id,
    brand: req.body.name,
    style: req.body.taste,
    isVintage: req.body.isVegan,
  };
  const toBeUpdated = await Clothes.findOne({ clothesId });
  const result = await toBeUpdated.update(clothesItem);
  res.json(result);
}

async function deleteClothes(req, res, next) {
  const clothesItem = {
    id: req.body.id,
    brand: req.body.name,
    style: req.body.taste,
    isVintage: req.body.isVegan,
  };
  const deletedClothesItem = await Clothes.findOne(clothesItem);
  await deletedClothesItem.destroy();
  res.json(deletedClothesItem);
}

module.exports = router;
