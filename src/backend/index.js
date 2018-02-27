import express from 'express';
const path     = require('path');
const mongoose = require('mongoose');
const config   = require('./config');

let database;

// Mongoose DB ----------------------------------------------------------------------

if (config.MONGO_URI) {
  mongoose.connect(config.MONGO_URI);
  const database = mongoose.connection;
  database.on('error', console.error.bind(console, 'connection error:'));
  database.once('open', function () {
    console.log('mongo database connected')
  });
}

// Setup ----------------------------------------------------------------------


const app = express();

app.use(express.static(path.join(__dirname, '../..', 'frontend/build')));
console.log(__dirname);

// Routing ----------------------------------------------------------------------

app.get('/api/foo', (req, res) => {
  res.send('Foo has been sent')
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend/build/index.html'));
});

// Init ----------------------------------------------------------------------

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`app listening on ${port}`);
