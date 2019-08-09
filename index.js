
const express = require('express');

const server = express();
const choresRouter = require('./chores/choresRouter.js');
server.use(express.json());

server.use('/api/chores', choresRouter);

const port = process.env.PORT ||8000;

server.listen(port, () => console.log('\nAPI running\n'));