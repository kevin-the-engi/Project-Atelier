const express = require('express');
const routes = require('./routes');
const db = require('../database');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/products', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})