const express = require('express');
const rota = require('./routes');
const app = express();

app.use(express.json());
app.use(route);

module.exports = app;