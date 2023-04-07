'use strict';

const express = require('express');
const router = express.Router();
const { Clothes } = require('./../models');

router.get('/', readClothes);
router.get('/:id', readOneClothes);
router.post('/', createClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);


async function readClothes(req, res, next) {
  let data  = await Clothes.read();
  res.json(data);
}

async function readOneClothes(req, res, next) {
  const data = await Clothes.read(req.params.id);
  res.json(data);
}

async function createClothes(req, res, next) {
  const createClothesItem = await Clothes.create(req.body);
  res.json(createClothesItem);
}

async function updateClothes(req, res, next) {
  const clothesId = req.params.id;
  const clothesItem = {
    brand: req.body.name,
    style: req.body.taste,
    isVintage: req.body.isVegan,
  };
  // const toBeUpdated = await Clothes.findOne({ clothesId });
  // const result = await toBeUpdated.update(clothesItem);
  const result = await Clothes.update(clothesId, clothesItem);
  res.json(result);
}

async function deleteClothes(req, res, next) {
  // const clothesItem = {
  //   id: req.body.id,
  //   brand: req.body.name,
  //   style: req.body.taste,
  //   isVintage: req.body.isVegan,
  // };
  // const deletedClothesItem = await Clothes.findOne(clothesItem);
  // await deletedClothesItem.destroy();
  const deletedClothesItem = Clothes.delete(req.params.id);
  res.json(deletedClothesItem);
}

module.exports = router;
