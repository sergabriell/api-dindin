const express = require('express');
const rota = require('./routes');
const app = express();

app.use(express.json());
app.use(rota);

module.exports = app;