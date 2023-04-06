'use strict';

//entry point of the server where the server starts

require('dotenv').config();
const server = require('./src/server');
const PORT = process.env.PORT;

server.start(PORT);