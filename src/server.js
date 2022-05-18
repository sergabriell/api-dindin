const express = require('express');
const route = require('./routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(route);

module.exports = app;