'use strict';

const server = require('./../server');
const supertest = require('supertest');
const request = supertest(server.app);

xdescribe('Testing the output JSON is valid', () => {
  test('Given an name in the query string, the output object is correct', async () => {
    const response = await request.get('/person?name=Miranda');
    expect(response.body).toEqual(
      {
        'name': 'Miranda',
      },
    );
  },
  );
});
