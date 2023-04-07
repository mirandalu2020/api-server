'use strict';

const server = require('./../server');
const supertest = require('supertest');
const request = supertest(server.app);
const { sequelize } = require('../models');

beforeAll(async() => {
  await sequelize.sync();
});
afterAll(async() => {
  await sequelize.drop();
});

describe('Testing the request stataus', () => {

  test('Should post 404 on a bad route', async () => {
    const response = await request.get('/bad-route');
    expect(response.status).toEqual(404);
  });

  test('Should post 404 on a bad method', async () => {
    const response = await request.patch('/food');
    expect(response.status).toEqual(404);
  });

  test('Should post 200 if read a list of records using GET', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(200);
  });

  test('Should post 200 if read a single item using GET', async () => {
    const response = await request.get('/clothes/1');
    expect(response.status).toEqual(200);
  });


  test('Should post 200 if read a list of records using POST', async () => {
    const response = await request
      .post('/clothes')
      .send({
        'brand': 'Uniqlo',
        'style': 'comfy',
        'isVintage': false,
      });
    console.log(response.body);
    expect(response.status).toEqual(200);
  });


  test('Should post 200 if read a list of records using PUT', async () => {
    const res = await request.get('/clothes');
    console.log(res.body);
    const response = await request
      .put(`/clothes/${res.body[0].id}`)
      .send({
        'brand': 'lab-strawberry',
        'style': 'sweet',
        'isVintage': false,
      });
    // const response = await request.put('/food');
    expect(response.status).toEqual(200);
  });


  test('Should post 200 if read a list of records using DELETE', async () => {
    const res = await request.get('/clothes');
    const response = await request
      .delete(`/clothes/${res.body[0].id}`);
    expect(response.status).toEqual(200);
  });
});
