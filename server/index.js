const express = require('express');
const routes = require('./routes');
const relic = require('newrelic');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', routes);

app.use('/loaderio-99c49da8a94b9cc738d8ae83b7959498', (req, res) => {
  res.status(200).send('loaderio-99c49da8a94b9cc738d8ae83b7959498');
});


app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting server');
  }

  console.log(`Listening at http://localhost:${PORT}`)
});

module.exports = app;