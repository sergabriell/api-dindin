const express = require('express');
const route = express();

const users = require('./controllers/users');
const login = require('./controllers/login');

route.post('/usuario', users.registerUser);
route.post('/login', login);


module.exports = route;