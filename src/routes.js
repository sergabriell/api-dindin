const express = require('express');
const route = express();

const users = require('./controllers/users');
const login = require('./controllers/login');
const verifyUserLogin = require('./middlewares/verifyUserLogin');

route.post('/usuario', users.registerUser);
route.post('/login', login);

route.use(verifyUserLogin);


module.exports = route;