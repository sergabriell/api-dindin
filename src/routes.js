const express = require('express');
const route = express();

const users = require('./controllers/users');
const login = require('./controllers/login');
const verifyUserLogin = require('./middlewares/verifyUserLogin');
const listCategories = require('./controllers/categories');
const transactions = require('./controllers/transactions');

route.post('/usuario', users.registerUser);
route.post('/login', login);

route.use(verifyUserLogin);
route.get('/usuario', users.detailUser);
route.put('/usuario', users.updateUser);

route.get('/categoria', listCategories);

route.post('/transacao', transactions.registerTransaction);
route.get('/transacao', transactions.listAllTransactions);
route.get('/transacao/:id', transactions.listATransaction);
route.put('/transacao/:id', transactions.updateTransaction);
route.delete('/transacao/:id', transactions.deleteTransaction);

module.exports = route;