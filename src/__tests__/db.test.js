'use strict';

const { sequelize, Food, Clothes } = require('./../models');

beforeAll(async() => {
  await sequelize.sync();
});
afterAll(async() => {
  await sequelize.drop();
});

let clothesId = null;
let foodId = null;

describe('testing our data models', () => {

  test('Can create a clothes', async () => {
    let newClothes = await Clothes.create({
      brand: 'Uniqlo',
      style: 'comfy',
      isVintage: false,
    });

    clothesId = newClothes.id;
    expect(newClothes.brand).toEqual('Uniqlo');
    expect(newClothes.id).toBeTruthy();
  });

  test('Can create a food item', async () => {
    let foodItem = await Food.create({
      name: 'lab strawberry',
      taste: 'sweet',
      isVegan: true,
      dressCode: clothesId,
    });

    foodId = foodItem.id;
    expect(foodItem.name).toEqual('lab strawberry');
    expect(foodItem.id).toEqual(foodId);
  });

  xtest('Can fetch a food and clothes', async () => {
    let food = await Food.read(foodId, {
      include: Clothes.model,
    });

    console.log('FOOD WITH DRESSCODE', food);
    expect(food.name).toEqual('lab strawberry');
    expect(food.Clothes.model.brand).toEqual('Uniqlo');
  },
  );
});