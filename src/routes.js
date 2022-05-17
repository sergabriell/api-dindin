const express = require('express');
const route = express();

const users = require('./controllers/users');

route.post('/usuario', users.registerUser);


module.exports = route;