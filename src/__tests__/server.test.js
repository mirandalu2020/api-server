'use strict';

const server = require('./../server');
const supertest = require('supertest');
const request = supertest(server.app);

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
    const response = await request.get('/food/1');
    expect(response.status).toEqual(200);
  });


  test('Should post 200 if read a list of records using POST', async () => {
    const response = await request
      .post('/food')
      .send({
        'name': 'lab-strawberry',
        'taste': 'sweet',
        'isVegan': false,
      })
    ;
    expect(response.status).toEqual(200);
  });


  test('Should post 200 if read a list of records using PUT', async () => {
    const res = await request.get('/food');
    console.log(res.body);
    const response = await request
      .put(`/food/${res.body[0].id}`)
      .send({
        'name': 'lab-strawberry',
        'taste': 'bitter',
        'isVegan': false,
      });
    // const response = await request.put('/food');
    expect(response.status).toEqual(200);
  });


  test('Should post 200 if read a list of records using DELETE', async () => {
    const response = await request.delete('/food/1');
    expect(response.status).toEqual(200);
  });
});
