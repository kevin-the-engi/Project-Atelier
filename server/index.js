const express = require('express');
const routes = require('./routes');
// const server = require('./server.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', routes);

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting server');
  }

  console.log(`Listening at http://localhost:${PORT}`)
});

module.exports = app;