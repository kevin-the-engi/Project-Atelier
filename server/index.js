const express = require('express');
const routes = require('./routes');
const relic = require('newrelic');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', routes);

app.use('/loaderio-23175e7a39397cbdad1603ba4f8c4046/', (req, res) => {
  res.status(200).send('loaderio-23175e7a39397cbdad1603ba4f8c4046');
});


app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting server');
  }

  console.log(`Listening at http://localhost:${PORT}`)
});

module.exports = app;