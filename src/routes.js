const express = require('express');
const route = express();

const users = require('./controllers/users');
const login = require('./controllers/login');
const verifyUserLogin = require('./middlewares/verifyUserLogin');
const listCategories = require('./controllers/categories');

route.post('/usuario', users.registerUser);
route.post('/login', login);

route.use(verifyUserLogin);
route.get('/usuario', users.detailUser);
route.put('/usuario', users.updateUser);

route.get('/categoria', listCategories);


module.exports = route;