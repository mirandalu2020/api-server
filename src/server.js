'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

// const logger = require('./middleware/logger');
// app.use(logger);

// const validator = require('./middleware/validator');
const userErr = require('./error-handlers/404');
const serverErr = require('./error-handlers/500');


app.use('/food', foodRouter);
app.use('/clothes', clothesRouter);

app.use(userErr);
app.use(serverErr);

module.exports = {
  app,
  start: (port) => app.listen(port, ()=> {
    console.log(`Listening on PORT ${port}`);
  }),
};
